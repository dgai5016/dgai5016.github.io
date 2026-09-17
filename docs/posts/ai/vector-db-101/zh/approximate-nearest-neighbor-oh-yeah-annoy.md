# 近似最近邻哦耶（Annoy）

## 简介

欢迎回到[《Vector Database 101》](https://zilliz.com/blog?tag=39&page=1)。

上一篇教程里，我们深入剖析了[分层可导航小世界（HNSW）](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)。HNSW 是一种基于图的索引算法，如今已是[向量数据库](https://zilliz.com/learn/what-is-vector-database)中最流行的索引策略之一。

在本篇[教程](https://codelabs.milvus.io/)中，我们换个话题，来聊聊基于树的向量索引。具体来说，我们要讲的是 **近似最近邻哦耶（Annoy）**——一种用一片树组成的「森林」来做最近邻搜索的算法。如果你熟悉随机森林或者梯度提升决策树，Annoy 看起来就像是这些算法的自然延伸，只不过它服务的是最近邻搜索，而不是机器学习。和 HNSW 那篇一样，我们会先从宏观层面讲清 Annoy 的工作原理，再动手写一个我们自己的简单 Python 实现。

## Annoy 基础

HNSW 的根基是连通图和跳表，而 Annoy 用二叉搜索树作为核心数据结构。Annoy（以及其他基于树的索引）的核心思想是：反复划分向量空间，然后只在其中一部分分区里搜索最近邻。如果这听起来很像倒排文件索引（IVF），那你想得没错——思路是一样的，只是执行方式略有不同。

![Annoy, visualized](https://raw.github.com/spotify/annoy/master/ann.png)
Annoy 可视化

理解 Annoy 的最好方式，就是把单棵树的构建过程可视化。不过要记住，从直觉上看，高维超空间和二维/三维欧几里得空间完全是两码事，所以下面的图仅供参考。

先从建索引说起。对 Annoy 来说，这是一个递归过程，调用栈的最大深度就是树的深度。第一轮迭代中，随机选取两个数据集向量 **a** 和 **b**，然后沿一个与 **a**、**b** 等距的超平面把整个超空间切开。接着，位于超空间「左半边」的向量被分到树的左半边，位于子空间「右半边」的向量则归入树的右半边。注意，这一步不需要真的把超平面算出来——对每个数据集向量，我们只需判断它离 **a**（左）还是 **b**（右）更近。

![](/vector-db-images/approximate-nearest-neighbor-oh-yeah-annoy-01.png)

分别为第一轮、第二轮和第 N 轮迭代之后的结果。[来源](https://sds-aau.github.io/M3Port19/portfolio/ann/)。

第二轮迭代会对第一轮生成的左右两棵子树重复上述过程，得到一棵深度为二、拥有四个叶节点的树。第三轮、第四轮以及后续迭代不断重复，直到某个叶节点的元素数少于预设的数量 K。在 [Annoy 的原始实现](https://github.com/spotify/annoy/blob/master/src/annoylib.h#L892)中，`K` 是一个用户可以自行设置的变量。

索引建好之后，就可以开始查询了。给定一个查询向量 **q**，我们可以沿树遍历来搜索。每个中间节点都被一个超平面分开，只要计算查询向量到左右两个向量的距离，就能判断它落在超平面的哪一侧。不断重复这个过程，直到抵达一个叶节点——它包含一个最多 `K` 个向量的数组。然后我们把这些向量排序，返回给用户。

## 实现 Annoy

现在我们已经知道 Annoy 是怎么工作的了，接下来动手实现。照例，先创建一个（128 维）向量数据集：

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

先定义一个包含左右子树的 `Node` 类：

```python
class Node(object):
    """Initialize with a set of vectors, then call `split()`.
    """

    def __init__(self, ref: np.ndarray, vecs: List[np.ndarray]):
        self._ref = ref
        self._vecs = vecs
        self._left = None
        self._right = None

    @property
    def ref(self) -> Optional[np.ndarray]:
        """Reference point in n-d hyperspace. Evaluates to `False` if root node.
        """
        return self._ref

    @property
    def vecs(self) -> List[np.ndarray]:
        """Vectors for this leaf node. Evaluates to `False` if not a leaf.
        """
        return self._vecs

    @property
    def left(self) -> Optional[object]:
        """Left node.
        """
        return self._left

    @property
    def right(self) -> Optional[object]:
        """Right node.
        """
        return self._right
```

`vecs` 变量保存着节点内所有向量组成的列表。如果这个列表的长度小于某个值 `K`，这些向量就原样保留；否则，它们会被传给 `left` 和 `right`，而 `vecs[0]` 和 `vecs[1]` 则作为两个随机选出的向量留下来，用于切分超平面。

接下来看索引构建。首先回顾一下：树中每个节点都被一个超平面切分，该超平面垂直于两个随机选取的数据集向量之间的连线。很方便的是，只要计算距离，就能判断查询向量位于超平面的哪一侧。照例，这里我们使用 NumPy 的向量化数学运算：

```python
def _is_query_in_left_half(q, node):
   # returns `True` if query vector resides in left half
   dist_l = np.linalg.norm(q - node.vecs[0])
   dist_r = np.linalg.norm(q - node.vecs[1])
   return dist_l < dist_r
```

现在来构建真正的树。

```python
import random

def split_node(node, K: int, imb: float) -> bool:

    # stopping condition: maximum # of vectors for a leaf node
    if len(node._vecs) <= K:
        return False

    # continue for a maximum of 5 iterations
    for n in range(5):
        left_vecs = []
        right_vecs = []

        # take two random indexes and set as left and right halves
        left_ref = node._vecs.pop(np.random.randint(len(node._vecs)))
        right_ref = node._vecs.pop(np.random.randint(len(node._vecs)))

        # split vectors into halves
        for vec in node._vecs:
            dist_l = np.linalg.norm(vec - left_ref)
            dist_r = np.linalg.norm(vec - right_ref)
            if dist_l < dist_r:
                left_vecs.append(vec)
            else:
                right_vecs.append(vec)

        # check to make sure that the tree is mostly balanced
        r = len(left_vecs) / len(node._vecs)
        if r < imb and r > (1 - imb):
            node._left = Node(left_ref, left_vecs)
            node._right = Node(right_ref, right_vecs)
            return True

        # redo tree build process if imbalance is high
        node._vecs.append(left_ref)
        node._vecs.append(right_ref)

    return False

def _build_tree(node, K: int, imb: float):
    """Recurses on left and right halves to build a tree.
    """
    node.split(K=K, imb=imb)
    if node.left:
        _build_tree(node.left, K=K, imb=imb)
    if node.right:
        _build_tree(node.right, K=K, imb=imb)

def build_forest(vecs: List[np.ndarray], N: int = 32, K: int = 64, imb: float = 0.95) -> List[Node]:
    """Builds a forest of `N` trees.
    """
    forest = []
    for _ in range(N):
        root = Node(None, vecs)
        _build_tree(root, K, imb)
        forest.append(root)
    return forest
```

这段代码信息量有点大，我们一步步过。首先，给定一个已初始化的 `Node`，随机选出两个向量，把数据集分成左右两半。然后用前面定义的函数判断各个子向量属于哪一半。注意，我们加了一个 `imb` 参数来维持树的平衡——如果树的一侧包含了超过 95% 的子向量，就重做切分过程。

节点切分就绪后，`build_tree` 函数会在所有节点上递归调用自己。叶节点定义为包含少于 `K` 个子向量的节点。

很好，我们建好了一棵二叉树，它能大幅缩小搜索范围。接下来把查询也实现了。查询相当直白：沿树遍历，不断走左分支或右分支，直到抵达我们感兴趣的那个节点：

```python
def _query_linear(vecs: List[np.ndarray], q: np.ndarray, k: int) -> List[np.ndarray]:
    return sorted(vecs, key=lambda v: np.linalg.norm(q-v))[:k]

def query_tree(root: Node, q: np.ndarray, k: int) -> List[np.ndarray]:
    """Queries a single tree.
    """

    while root.left and root.right:
        dist_l = np.linalg.norm(q - node.left.ref)
        dist_r = np.linalg.norm(q - node.right.ref)
        root = root.left if dist_l < dist_r else root.right

    # brute-force search the nearest neighbors
    return _query_linear(root.vecs, q, k)
```

这段代码会贪心地遍历树，只返回一个最近邻（`nq = 1`）。但别忘了，我们常常要找的是多个最近邻。而且，多个最近邻也可能分布在其他叶节点里。那这些问题该怎么解决呢？

## 跑吧，森林，跑吧

（是的，我确实知道在这部[美国经典电影](https://en.wikipedia.org/wiki/Forrest_Gump)里，主人公的名字拼写是「Forrest」而不是「forest」。）

回顾[上一篇关于 IVF 的教程](https://zilliz.com/learn/vector-index)，我们经常把搜索范围扩展到离查询向量最近的 Voronoi 单元之外。原因在于*单元边缘*——如果查询向量靠近某个单元的边缘，它的一些最近邻很可能位于相邻单元中。这类「边缘」在高维空间里要常见得多，所以在需要高召回率时，`nprobe` 通常要设得大一些。

基于树的索引也面临同样的问题——一些最近邻可能落在最近的叶节点/多边形之外。Annoy 的解决办法是：1) 允许在切分的两侧同时搜索；2) 创建一个由树组成的*森林*。

我们先扩展上一节的实现，让它能够搜索切分的两侧：

```python
def _select_nearby(node: Node, q: np.ndarray, thresh: int = 0):
    """Functions identically to _is_query_in_left_half, but can return both.
    """
    if not node.left or not node.right:
        return ()
    dist_l = np.linalg.norm(q - node.left.ref)
    dist_r = np.linalg.norm(q - node.right.ref)
    if np.abs(dist_l - dist_r) < thresh:
        return (node.left, node.right)
    if dist_l < dist_r:
        return (node.left,)
    return (node.right,)

def _query_tree(root: Node, q: np.ndarray, k: int) -> List[np.ndarray]:
    """This replaces the `query_tree` function above.
    """

    pq = [root]
    nns = []
    while pq:
        node = pq.pop(0)
        nearby = _select_nearby(node, q, thresh=0.05)

        # if `_select_nearby` does not return either node, then we are at a leaf
        if nearby:
            pq.extend(nearby)
        else:
            nns.extend(node.vecs)

    # brute-force search the nearest neighbors
    return _query_linear(nns, q, k)

def query_forest(forest: List[Node], q, k: int = 10):
    nns = set()
    for root in forest:
        # merge `nns` with query result
        res = _query_tree(root, q, k)
        nns.update(res)
    return _query_linear(nns, q, k)
```

接下来，我们再加一个函数，把完整索引构建成一片树的森林：

```python
def build_forest(vecs: List[np.ndarray], N: int = 32, K: int = 64, imb: float = 0.95) -> List[Node]:
    """Builds a forest of `N` trees.
    """
    forest = []
    for _ in range(N):
        root = Node(None, vecs)
        _build_tree(root, K, imb)
        forest.append(root)
    return forest
```

所有部件都齐了，现在像之前处理 IVF、SQ、PQ 和 HNSW 那样，把它们整合到一起：

```python
from typing import List, Optional
import random

import numpy as np

class Node(object):
    """Initialize with a set of vectors, then call `split()`.
    """

    def __init__(self, ref: np.ndarray, vecs: List[np.ndarray]):
        self._ref = ref
        self._vecs = vecs
        self._left = None
        self._right = None

    @property
    def ref(self) -> Optional[np.ndarray]:
        """Reference point in n-d hyperspace. Evaluates to `False` if root node.
        """
        return self._ref

    @property
    def vecs(self) -> List[np.ndarray]:
        """Vectors for this leaf node. Evaluates to `False` if not a leaf.
        """
        return self._vecs

    @property
    def left(self) -> Optional[object]:
        """Left node.
        """
        return self._left

    @property
    def right(self) -> Optional[object]:
        """Right node.
        """
        return self._right

    def split(self, K: int, imb: float) -> bool:

        # stopping condition: maximum # of vectors for a leaf node
        if len(self._vecs) <= K:
            return False

        # continue for a maximum of 5 iterations
        for n in range(5):
            left_vecs = []
            right_vecs = []

            # take two random indexes and set as left and right halves
            left_ref = self._vecs.pop(np.random.randint(len(self._vecs)))
            right_ref = self._vecs.pop(np.random.randint(len(self._vecs)))

            # split vectors into halves
            for vec in self._vecs:
                dist_l = np.linalg.norm(vec - left_ref)
                dist_r = np.linalg.norm(vec - right_ref)
                if dist_l < dist_r:
                    left_vecs.append(vec)
                else:
                    right_vecs.append(vec)

            # check to make sure that the tree is mostly balanced
            r = len(left_vecs) / len(self._vecs)
            if r < imb and r > (1 - imb):
                self._left = Node(left_ref, left_vecs)
                self._right = Node(right_ref, right_vecs)
                return True

            # redo tree build process if imbalance is high
            self._vecs.append(left_ref)
            self._vecs.append(right_ref)

        return False

def _select_nearby(node: Node, q: np.ndarray, thresh: int = 0):
    """Functions identically to _is_query_in_left_half, but can return both.
    """
    if not node.left or not node.right:
        return ()
    dist_l = np.linalg.norm(q - node.left.ref)
    dist_r = np.linalg.norm(q - node.right.ref)
    if np.abs(dist_l - dist_r) < thresh:
        return (node.left, node.right)
    if dist_l < dist_r:
        return (node.left,)
    return (node.right,)

def _build_tree(node, K: int, imb: float):
    """Recurses on left and right halves to build a tree.
    """
    node.split(K=K, imb=imb)
    if node.left:
        _build_tree(node.left, K=K, imb=imb)
    if node.right:
        _build_tree(node.right, K=K, imb=imb)

def build_forest(vecs: List[np.ndarray], N: int = 32, K: int = 64, imb: float = 0.95) -> List[Node]:
    """Builds a forest of `N` trees.
    """
    forest = []
    for _ in range(N):
        root = Node(None, vecs)
        _build_tree(root, K, imb)
        forest.append(root)
    return forest

def _query_linear(vecs: List[np.ndarray], q: np.ndarray, k: int) -> List[np.ndarray]:
    return sorted(vecs, key=lambda v: np.linalg.norm(q-v))[:k]

def _query_tree(root: Node, q: np.ndarray, k: int) -> List[np.ndarray]:
    """Queries a single tree.
    """

    pq = [root]
    nns = []
    while pq:
        node = pq.pop(0)
        nearby = _select_nearby(node, q, thresh=0.05)

        # if `_select_nearby` does not return either node, then we are at a leaf
        if nearby:
            pq.extend(nearby)
        else:
            nns.extend(node.vecs)

    # brute-force search the nearest neighbors
    return _query_linear(nns, q, k)

def query_forest(forest: List[Node], q, k: int = 10):
    nns = set()
    for root in forest:
        # merge `nns` with query result
        res = _query_tree(root, q, k)
        nns.update(res)
    return _query_linear(nns, q, k)
```

Annoy 就讲到这里！

## 结语

本篇教程深入剖析了 Annoy——一种名字很俏皮的基于树的索引策略。由于解释器开销，比起 Python，有些语言更适合实现向量搜索数据结构；尽管如此，我们还是尽可能多地使用了基于 numpy 的数组运算。要避免内存在各处来回拷贝，还有不少优化可做，但这些就留给读者作为练习了。

下一篇教程，我们将继续深入索引策略，讲一讲 Vamana 算法——它更广为人知的名字是 *DiskANN*——一种独特的基于图的索引算法，专门为直接从固态硬盘查询而设计。

本教程的所有代码均可在[我的 GitHub](https://github.com/fzliu/vector-search)上免费获取。
