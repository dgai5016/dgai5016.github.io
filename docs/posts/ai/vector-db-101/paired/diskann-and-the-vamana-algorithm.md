<BiRow>
<template #en>

## Introduction to DiskANN and the Vamana Algorithm

</template>
<template #zh>

## DiskANN 与 Vamana 算法简介

</template>
</BiRow>

<BiRow>
<template #en>

Hey there - welcome back to [Milvus tutorials](https://codelabs.milvus.io/). In the previous tutorial, we did a deep dive into [Approximate Nearest Neighbors Oh Yeah](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY), or Annoy for short. Annoy is a tree-based indexing algorithm that uses random projections to iteratively split the hyperspace of vectors, with the final split resulting in a binary tree. Annoy uses two tricks to improve accuracy/recall - 1) traversing down both halves of a split if the query point lies close to the dividing hyperplane, and 2) creating a forest of binary trees. Although Annoy isn't commonly used as an indexing algorithm in production environments today (`HNSW` and `IVF_PQ` are far more popular), Annoy still sets a strong baseline for tree-based vector indexes.

</template>
<template #zh>

嘿，你好——欢迎回到 [Milvus 教程](https://codelabs.milvus.io/)。上一篇教程中，我们深入剖析了[近似最近邻哦耶](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)，简称 Annoy。Annoy 是一种基于树的索引算法，利用随机投影迭代地切分向量超空间，最终的切分结果就是一棵二叉树。Annoy 用两个技巧来提升准确率/召回率——1) 当查询点靠近切分超平面时，沿切分的两半同时向下遍历；2) 创建一个由二叉树组成的森林。尽管如今的生产环境中已不常用 Annoy 作为索引算法（`HNSW` 和 `IVF_PQ` 要流行得多），它仍然是基于树的向量索引的一个强力基线。

</template>
</BiRow>

<BiRow>
<template #en>

At its core, Annoy is still an *in-memory index*. We've only looked at in-memory indexes - vector indexes that reside entirely in RAM. On commodity machines, in-memory indexes are excellent for smaller datasets (up to around 10 million 1024-dimensional vectors). Still, once we move past 100M vectors, in-memory indexes can be prohibitively expensive. For example, 100M vectors alone will require approximately 400GB of RAM.

</template>
<template #zh>

说到底，Annoy 仍是一种*内存索引*。到目前为止，我们看过的全都是内存索引——完全驻留在 RAM 中的向量索引。在普通商用机器上，内存索引对较小的数据集（最多约 1000 万个 1024 维向量）表现出色；可一旦规模超过 1 亿个向量，内存索引的成本就可能高得离谱。举个例子：光是 1 亿个向量，就需要大约 400GB 的 RAM。

</template>
</BiRow>

<BiRow>
<template #en>

Here's where an *on-disk index* - a vector index that utilizes both RAM and hard disk - would be helpful. In this tutorial, we'll dive into *DiskANN*, a graph-based vector index that enables large-scale storage, indexing, and search of vectors by persisting the bulk of the index on NVMe hard disks. We'll first cover *Vamana*, the core data structure behind DiskANN, before discussing how the on-disk portion of DiskANN utilizes a Vamana graph to perform queries efficiently. Like previous tutorials, we'll also develop our implementation of the Vamana algorithm in Python.

</template>
<template #zh>

这时候，*磁盘索引*——一种同时利用 RAM 和硬盘的向量索引——就派上用场了。在本篇教程中，我们将深入 *DiskANN*——一种基于图的向量索引，它把索引的主体持久化在 NVMe 硬盘上，从而实现向量的海量存储、索引与搜索。我们会先讲 *Vamana*（DiskANN 背后的核心数据结构），再讨论 DiskANN 的磁盘部分如何利用 Vamana 图高效地执行查询。和之前的教程一样，我们也会用 Python 实现一版自己的 Vamana 算法。

</template>
</BiRow>

<BiRow>
<template #en>

## The Vamana algorithm

</template>
<template #zh>

## Vamana 算法

</template>
</BiRow>

<BiRow>
<template #en>

Vamana's key concept is the *relative neighborhood graph* (RNG). Formally, edges in an RNG for a single point are constructed iteratively so long as a new edge is not closer to any existing neighbor. If this is difficult to wrap your head around, no worries - the key concept is that RNGs are constructed so that only a subset of the most relevant nearest edges are added for any single point in the graph. As with HNSW, nearby vectors are determined by the distance metric that's being used in the vector database, e.g., cosine or L2.

</template>
<template #zh>

Vamana 的核心概念是*相对邻域图*（RNG）。形式化地说，单个点的 RNG 边是迭代构建的，前提是新增的边不能比任何已有邻居更近。如果这不太好理解，也别担心——关键概念是：RNG 的构建方式保证了图中任何一点都只加入与它最相关的那一小部分近邻边。和 HNSW 一样，哪些向量算「附近」由向量数据库所使用的距离度量决定，比如余弦或 L2。

</template>
</BiRow>

<BiRow>
<template #en>

There are two main problems with RNGs that make them still too inefficient for vector search. The first is that constructing an RNG is prohibitively expensive: $$O(n^2)$$ for a dataset with size $$n$$. The second is that setting the *diameter* of an RNG is difficult. High-diameter RNGs are too dense, while RNGs with low diameters make graph traversal (querying the index) lengthy and inefficient. Despite this, RNGs remain a good starting point and form the basis for the Vamana algorithm.

</template>
<template #zh>

RNG 存在两个主要问题，使它对向量搜索来说仍然太低效。第一，构建一个 RNG 的代价高得离谱：对规模为 $$n$$ 的数据集，开销是 $$O(n^2)$$。第二，RNG 的*直径*不好设定。高直径的 RNG 过于稠密，而低直径的 RNG 又会让图遍历（查询索引）变得冗长低效。尽管如此，RNG 仍然是一个不错的起点，也构成了 Vamana 算法的基础。

</template>
</BiRow>

<BiRow>
<template #en>

![The relative neighborhood graph of 100 random points in a unit square](/vector-db-images/diskann-and-the-vamana-algorithm-01.png)
The relative neighborhood graph of 100 random points in a unit square

</template>
<template #zh>

![The relative neighborhood graph of 100 random points in a unit square](/vector-db-images/diskann-and-the-vamana-algorithm-01.png)
单位正方形中 100 个随机点的相对邻域图

</template>
</BiRow>

<BiRow>
<template #en>

Image source: [Wikepedia-Relative neighborhood graph](https://en.wikipedia.org/wiki/Relative_neighborhood_graph). Note how any point is only connected to a subset of its closest neighbors.

</template>
<template #zh>

图片来源：[Wikipedia：相对邻域图](https://en.wikipedia.org/wiki/Relative_neighborhood_graph)。注意，任何一点都只与它最近邻居中的一个子集相连。

</template>
</BiRow>

<BiRow>
<template #en>

In broad terms, the Vamana algorithm solves both of these problems by making use of two clever heuristics: the greedy search procedure and the robust prune procedure. Let's walk through both of these, along with an implementation, to see how these work together to create an optimized graph for vector search.

</template>
<template #zh>

笼统地说，Vamana 算法靠两个巧妙的启发式方法同时解决了这两个问题：贪心搜索过程和鲁棒剪枝过程。下面我们逐一讲解，并配上实现，看看它们如何协同构建出一个面向向量搜索的优化图。

</template>
</BiRow>

<BiRow>
<template #en>

As the name implies, the greedy search algorithm iteratively searches for the closest neighbors to a specified point (vector) in the graph `p`. Loosely speaking, we maintain two sets: a set of nearest neighbors `nns` and a set of visited nodes `visit`.

</template>
<template #zh>

顾名思义，贪心搜索算法会迭代地搜索图中离指定点（向量）`p` 最近的邻居。粗略地说，我们维护两个集合：最近邻集合 `nns` 和已访问节点集合 `visit`。

</template>
</BiRow>

<BiRow>
<template #en>

```python
def _greedy_search(graph, start, query, nq: int, L: int):

    best = (np.linalg.norm(graph[start][0] - query), entry)

    nns = [start]
    visit = set()  # set of visited nodes
    nns = heapify(nns)

    # find top-k nearest neighbors
    while nns - visit:
        nn = nns[0]
        for idx in nn[1]:
            d = np.linalg.norm(graph[idx][0] - query)
            heappush(nns, (d, nn))
            visit.add((d, nn))

        # retain up to search list size elements
        while len(nns) > L:
            heappop(nns)

    return (nns[:nq], visit)
```

</template>
<template #zh>

```python
def _greedy_search(graph, start, query, nq: int, L: int):

    best = (np.linalg.norm(graph[start][0] - query), entry)

    nns = [start]
    visit = set()  # set of visited nodes
    nns = heapify(nns)

    # find top-k nearest neighbors
    while nns - visit:
        nn = nns[0]
        for idx in nn[1]:
            d = np.linalg.norm(graph[idx][0] - query)
            heappush(nns, (d, nn))
            visit.add((d, nn))

        # retain up to search list size elements
        while len(nns) > L:
            heappop(nns)

    return (nns[:nq], visit)
```

</template>
</BiRow>

<BiRow>
<template #en>

`nns` is initialized with the starting node, and at each iteration, we take up to `L` steps in the direction closest to our query point. This continues until all nodes in `nns` have been visited.

</template>
<template #zh>

`nns` 用起始节点初始化；每次迭代中，我们朝着最接近查询点的方向最多走 `L` 步。这个过程一直持续，直到 `nns` 中的所有节点都被访问过为止。

</template>
</BiRow>

<BiRow>
<template #en>

Robust prune, on the other hand, is a bit more involved. This heuristic is designed to ensure that the distance between consecutive searched nodes in the greedy search procedure decreases exponentially. Formally, robust prune, when called on a single node, will ensure that the outbound edges are modified such that there are at most `R` edges, with a new edge pointing to a node at least `a` times distant from any existing neighbor.

</template>
<template #zh>

相比之下，鲁棒剪枝要更复杂一些。这个启发式的设计目标是：确保贪心搜索过程中相邻两个被搜索节点之间的距离呈指数级下降。形式化地说，对单个节点调用鲁棒剪枝，会保证把出边修改成最多 `R` 条，且新边指向的节点，距离至少是任一已有邻居的 `a` 倍。

</template>
</BiRow>

<BiRow>
<template #en>

```python
def _robust_prune(graph, node: Tuple[np.ndarray, Set[int]], candid: Set[int], R: int):
    
    candid.update(node[1])
    node[1].clear()

    while candid:
        (min_d, nn) = (float("inf"), None)

        # find the closest element/vector to input node
        for k in candid:
            p = graph[k]
            d = np.linalg.norm(node[0] - p[0])
            if d < min_d:
                (min_d, nn) = (d, p)
        node[1].add(nn)

        # set at most R out-neighbors for the selected node
        if len(node[1]) == R:
            break

        # future iterations must obey distance threshold
        for p in candid:
            if a * min_d <= np.linalg.norm(node[0] - p[0]):
                candid.remove(p)
```

</template>
<template #zh>

```python
def _robust_prune(graph, node: Tuple[np.ndarray, Set[int]], candid: Set[int], R: int):
    
    candid.update(node[1])
    node[1].clear()

    while candid:
        (min_d, nn) = (float("inf"), None)

        # find the closest element/vector to input node
        for k in candid:
            p = graph[k]
            d = np.linalg.norm(node[0] - p[0])
            if d < min_d:
                (min_d, nn) = (d, p)
        node[1].add(nn)

        # set at most R out-neighbors for the selected node
        if len(node[1]) == R:
            break

        # future iterations must obey distance threshold
        for p in candid:
            if a * min_d <= np.linalg.norm(node[0] - p[0]):
                candid.remove(p)
```

</template>
</BiRow>

<BiRow>
<template #en>

With these two heuristics, we can now focus on the full Vamana algorithm. A Vamana graph is first initialized so each node has `R` random outbound edges. The algorithm then iteratively calls `_greedy_search` and `_robust_prune` for all nodes within the graph.

</template>
<template #zh>

有了这两个启发式，我们现在可以聚焦完整的 Vamana 算法了。Vamana 图先做初始化，让每个节点拥有 `R` 条随机出边；随后，算法对图中的所有节点迭代地调用 `_greedy_search` 和 `_robust_prune`。

</template>
</BiRow>

<BiRow>
<template #en>

As we've done for all of our previous tutorials on vector indexes, let's now put it all together into a single script:

</template>
<template #zh>

按照之前所有向量索引教程的做法，现在把全部内容整合成一个完整的脚本：

</template>
</BiRow>

<BiRow>
<template #en>

```python
class VamanaIndex(_BaseIndex):
    """Vamana graph algorithm implementation. Every element in each graph is a
    2-tuple containing the vector and a list of unidirectional connections
    within the graph.
    """

    def __init__(self, L: int = 10, a: float = 1.5, R: int = 10):
        super().__init__()
        self._L = L
        self._a = a
        self._R = R
        self._start = None  # index of starting vector
        self._index = []

    def create(self, dataset):

        self._R = min(self._R, len(dataset))

        # intialize graph with dataset
        # set starting location as medoid vector
        dist = float("inf")
        medoid = np.median(dataset, axis=0)
        for (n, vec) in enumerate(dataset):
            d = np.linalg.norm(medoid - vec)
            if d < dist:
                dist = d
                self._start = n
            self._index.append((vec, set()))

        # randomize out-connections for each node
        for (n, node) in enumerate(self._index):
            idxs = np.random.choice(len(self._index) - 1, replace=False, size=(self._R,))
            idxs[idxs >= n] += 1  # ensure no node points to itself
            node[1].update(idxs)

        # random permutation + sequential graph update
        for (n, node) in enumerate(self._index):
            (_, V) = self.search(node, nq=1)
            self._robust_prune(node, V)
            for inb in node[1]:
                nbr = self._index[inb]
                if len(nbrs[1]) > self._R:
                    self._robust_prune(nbr, nbr[1].union(n))
                else:
                    nbr[1].add(n)

    def insert(self, vector):
        raise NotImplementedError("Vamana indexes are static")

    def search(query, nq: int = 10):
        """Greedy search.
        """

        best = (np.linalg.norm(self._index[self._start][0] - query), entry)

        nns = [start]
        visit = set()  # set of visited nodes
        nns = heapify(nns)

        # find top-k nearest neighbors
        while nns - visit:
            nn = nns[0]
            for idx in nn[1]:
                d = np.linalg.norm(self._index[idx][0] - query)
                heappush(nns, (d, nn))
                visit.add((d, nn))

            # retain up to search list size elements
            while len(nns) > self._L:
                heappop(nns)

        return (nns[:nq], visit)

    def _robust_prune(node: Tuple[np.ndarray, Set[int]], candid: Set[int]):
        
        candid.update(node[1])
        node[1].clear()

        while candid:
            (min_d, nn) = (float("inf"), None)

            # find the closest element/vector to input node
            for k in candid:
                p = self._index[k]
                d = np.linalg.norm(node[0] - p[0])
                if d < min_d:
                    (min_d, nn) = (d, p)
            node[1].add(nn)

            # set at most R out-neighbors for the selected node
            if len(node[1]) == R:
                break

            # future iterations must obey distance threshold
            for p in candid:
                if a * min_d <= np.linalg.norm(node[0] - p[0]):
                    candid.remove(p)
```

</template>
<template #zh>

```python
class VamanaIndex(_BaseIndex):
    """Vamana graph algorithm implementation. Every element in each graph is a
    2-tuple containing the vector and a list of unidirectional connections
    within the graph.
    """

    def __init__(self, L: int = 10, a: float = 1.5, R: int = 10):
        super().__init__()
        self._L = L
        self._a = a
        self._R = R
        self._start = None  # index of starting vector
        self._index = []

    def create(self, dataset):

        self._R = min(self._R, len(dataset))

        # intialize graph with dataset
        # set starting location as medoid vector
        dist = float("inf")
        medoid = np.median(dataset, axis=0)
        for (n, vec) in enumerate(dataset):
            d = np.linalg.norm(medoid - vec)
            if d < dist:
                dist = d
                self._start = n
            self._index.append((vec, set()))

        # randomize out-connections for each node
        for (n, node) in enumerate(self._index):
            idxs = np.random.choice(len(self._index) - 1, replace=False, size=(self._R,))
            idxs[idxs >= n] += 1  # ensure no node points to itself
            node[1].update(idxs)

        # random permutation + sequential graph update
        for (n, node) in enumerate(self._index):
            (_, V) = self.search(node, nq=1)
            self._robust_prune(node, V)
            for inb in node[1]:
                nbr = self._index[inb]
                if len(nbrs[1]) > self._R:
                    self._robust_prune(nbr, nbr[1].union(n))
                else:
                    nbr[1].add(n)

    def insert(self, vector):
        raise NotImplementedError("Vamana indexes are static")

    def search(query, nq: int = 10):
        """Greedy search.
        """

        best = (np.linalg.norm(self._index[self._start][0] - query), entry)

        nns = [start]
        visit = set()  # set of visited nodes
        nns = heapify(nns)

        # find top-k nearest neighbors
        while nns - visit:
            nn = nns[0]
            for idx in nn[1]:
                d = np.linalg.norm(self._index[idx][0] - query)
                heappush(nns, (d, nn))
                visit.add((d, nn))

            # retain up to search list size elements
            while len(nns) > self._L:
                heappop(nns)

        return (nns[:nq], visit)

    def _robust_prune(node: Tuple[np.ndarray, Set[int]], candid: Set[int]):
        
        candid.update(node[1])
        node[1].clear()

        while candid:
            (min_d, nn) = (float("inf"), None)

            # find the closest element/vector to input node
            for k in candid:
                p = self._index[k]
                d = np.linalg.norm(node[0] - p[0])
                if d < min_d:
                    (min_d, nn) = (d, p)
            node[1].add(nn)

            # set at most R out-neighbors for the selected node
            if len(node[1]) == R:
                break

            # future iterations must obey distance threshold
            for p in candid:
                if a * min_d <= np.linalg.norm(node[0] - p[0]):
                    candid.remove(p)
```

</template>
</BiRow>

<BiRow>
<template #en>

That's it for Vamana!

</template>
<template #zh>

Vamana 就讲到这里！

</template>
</BiRow>

<BiRow>
<template #en>

## Wrapping up

</template>
<template #zh>

## 结语

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we did a deep dive into DiskANN, a graph-based indexing strategy that is our first foray into on-disk indexes. Like HNSW, DiskANN avoids the problem of figuring out how and where to partition a high-dimensional input space and instead relies on building a directed graph to the relationship between nearby vectors. As the volume of unstructured data continues to grow in the upcoming decade, the need for on-disk indexes will likely rise, as will research around this area.

</template>
<template #zh>

本篇教程深入剖析了 DiskANN——一种基于图的索引策略，也是我们第一次涉足磁盘索引。和 HNSW 一样，DiskANN 避开了「如何切分、在哪里切分高维输入空间」的难题，转而依靠构建有向图来刻画邻近向量之间的关系。随着未来十年非结构化数据的体量持续增长，对磁盘索引的需求很可能水涨船高，相关领域的研究也会随之升温。

</template>
</BiRow>

<BiRow>
<template #en>

All code for this tutorial is freely available at [https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search).

</template>
<template #zh>

本教程的所有代码均可在 [https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search) 免费获取。

</template>
</BiRow>
