<BiRow>
<template #en>

***Latest Update: July 26***

</template>
<template #zh>

***最后更新：7 月 26 日***

</template>
</BiRow>

<BiRow>
<template #en>

In the previous tutorial, we looked at [scalar quantization and product quantization](https://zilliz.com/learn/scalar-quantization-and-product-quantization), two vector indexing strategies that reduce the overall size of the database without reducing the scope of our search. To better illustrate how scalar quantization and product quantization work, we also implemented our own versions in Python.

</template>
<template #zh>

在上一篇教程中，我们学习了[标量量化与乘积量化](https://zilliz.com/learn/scalar-quantization-and-product-quantization)——这两种向量索引策略能在不缩小搜索范围的前提下降低数据库的总大小。为了更好地展示标量量化和乘积量化是如何工作的，我们还用 Python 实现了自己的版本。

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we'll build on that knowledge by looking at today's most commonly used primary algorithm: Hierarchical Navigable Small Worlds (HNSW).  Hierarchical Navigable Small World (HNSW) is a graph-based algorithm that performs approximate nearest neighbor searches  ([ANN](https://zilliz.com/glossary/anns)) in [vector databases](https://zilliz.com/learn/what-is-vector-database). **The HNSW algorithm performs ANN search very well in terms of speed and accuracy, making it an incredibly robust vector search algorithm.** Unfortunately, despite being popular, understanding the HNSW algorithm can be tricky, but don't fret - in the next couple of sections, we'll break down HNSW into its steps, developing our own simple implementation along the way.

</template>
<template #zh>

在本篇教程中，我们将在此基础上学习当今最常用的主流算法：分层可导航小世界（Hierarchical Navigable Small Worlds，HNSW）。HNSW 是一种基于图的算法，可在[向量数据库](https://zilliz.com/learn/what-is-vector-database)中执行近似最近邻搜索（[ANN](https://zilliz.com/glossary/anns)）。**HNSW 算法在速度和精度两方面都能非常出色地完成 ANN 搜索，这使它成为一款极其稳健的向量搜索算法。**遗憾的是，虽然 HNSW 很流行，理解起来却不太容易。不过别慌——在接下来的几节里，我们会把 HNSW 拆解成一步步的操作，并顺手写出我们自己的简单实现。

</template>
</BiRow>

<BiRow>
<template #en>

## HNSW basics

</template>
<template #zh>

## HNSW 基础

</template>
</BiRow>

<BiRow>
<template #en>

Recall from a previous tutorial that there are four types of [vector search indexes](https://zilliz.com/learn/index-overview-part-2): hash-based, tree-based, cluster-based, and graph-based. HNSW fits firmly into the latter category: the graph index algorithm. It combines two core concepts—the probability skip list and Navigable Small World (NSW) graphs. Let's first dive into these two concepts individually before discussing the HNSW algorithm.

</template>
<template #zh>

回忆一下之前教程里讲过的四类[向量搜索索引](https://zilliz.com/learn/index-overview-part-2)：基于哈希的、基于树的、基于聚类的和基于图的。HNSW 稳稳地属于最后一类——图索引算法。它融合了两个核心概念：概率跳表（probability skip list）和可导航小世界（Navigable Small World，NSW）图。在正式讨论 HNSW 算法之前，我们先分别深入这两个概念。

</template>
</BiRow>

<BiRow>
<template #en>

### What are the probability skip lists?

</template>
<template #zh>

### 什么是概率跳表？

</template>
</BiRow>

<BiRow>
<template #en>

First up:  probability skip list. Recall the venerable linked list - a well-known data structure where each element maintains a pointer for the next element. Although linked lists work great for implementing LIFO and FIFO data structures such as stacks and queues, a major downside is their time complexity regarding random access: `O(n)`. Skip lists aim to solve this problem by introducing additional layers, allowing for `O(log n)` random access time complexity by incurring extra memory (`O(n log n)` space complexity as opposed to `O(n)` for a normal linked list) and a bit of runtime overhead for inserts and deletes.

</template>
<template #zh>

先说概率跳表。回忆一下老牌经典的链表——一种众所周知的数据结构，其中每个元素都维护着一个指向下一个元素的指针。虽然链表非常适合实现栈和队列这类后进先出（LIFO）、先进先出（FIFO）的数据结构，但它有个重大缺点：随机访问的时间复杂度是 `O(n)`。跳表通过引入额外的层来解决这个问题，从而把随机访问的时间复杂度降到 `O(log n)`，代价是占用更多内存（空间复杂度从普通链表的 `O(n)` 变成 `O(n log n)`），插入和删除也会带来一点运行时开销。

</template>
</BiRow>

<BiRow>
<template #en>

**A  probability skip list is a multi-level linked list where the upper levels maintain long connections.** As we move down the layers, the connections become shorter and shorter, with the bottom layer being the "original" linked list containing all of the elements. The image below illustrates this probability skip list structure:

</template>
<template #zh>

**概率跳表是一种多层链表，上层维护着较长的连接。**随着逐层向下，连接变得越来越短，最底层就是包含所有元素的「原始」链表。下图展示了这种概率跳表结构：

</template>
</BiRow>

<BiRow>
<template #en>

![skip list structure](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-01.png)
skip list structure

</template>
<template #zh>

![skip list structure](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-01.png)
跳表结构

</template>
</BiRow>

<BiRow>
<template #en>

<sub>The skip list structure, illustrated. Higher layers have fewer elements.</sub>

</template>
<template #zh>

<sub>跳表示意图。层数越高，元素越少。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

We start at the highest layer to reach element `i` in a skip list. Once we find a node corresponding to an element in the list greater than `i`, we backtrack to the previous node and move to the layer below. This continues until we've found the element we're looking for. Note that skip lists only work for sorted lists, as we need a way to compare the magnitude of two objects directly.

</template>
<template #zh>

在跳表中查找元素 `i` 时，我们从最高层出发。一旦发现某个节点对应的列表元素大于 `i`，就退回上一个节点，并下移一层。如此往复，直到找到目标元素。注意，跳表只适用于有序列表，因为我们需要一种能直接比较两个对象大小的方式。

</template>
</BiRow>

<BiRow>
<template #en>

Inserts work probabilistically. For any new element, we first need to figure out the layer with which the element appears first. The uppermost layer has the lowest probability, increasing probability as we move down in layers. The general rule is that any element in a layer will appear in layer above it with some pre-defined probability `p`. Therefore, if an element first appears in some layer `l`, it will also get added to layers `l-1`, `l-2`, and so on.

</template>
<template #zh>

插入则是概率性地进行的。对任何新元素，我们首先要确定它最先出现在哪一层。最顶层出现的概率最低，越往下概率越高。一般规则是：某一层中的任何元素，都会以预先定义的概率 `p` 出现在它的上一层。因此，如果某个元素最先出现在第 `l` 层，那么它也会被加进第 `l-1` 层、第 `l-2` 层，依此类推。

</template>
</BiRow>

<BiRow>
<template #en>

Note that, while it is possible to have a balanced skip list that performs no better than a standard linked list, the probability of this happening is incredibly low.

</template>
<template #zh>

注意，虽然确实有可能得到一个性能并不比普通链表好多少的「坏」跳表，但这种情况发生的概率低到可以忽略。

</template>
</BiRow>

<BiRow>
<template #en>

### What is a Navigable Small World (NSW)?

</template>
<template #zh>

### 什么是可导航小世界（NSW）？

</template>
</BiRow>

<BiRow>
<template #en>

Now that we've gotten skip lists out of the way, let's take some time to talk about Navigable Small Worlds (NSW). NSW is a graph-based algorithm that finds approximate nearest neighbors in a dataset. The general idea here is first to imagine many nodes in a network. Each node will have short-, medium-, and long-range connections to other nodes. When performing a vector search, we'll begin at some pre-defined entry point. From there, we'll evaluate connections to other nodes and jump to the one closest to the one we hope to find. This process repeats until we've found our nearest neighbor.

</template>
<template #zh>

讲完跳表，我们花点时间聊聊可导航小世界（NSW）。NSW 是一种基于图的算法，用于在数据集中寻找近似最近邻。整体思路是：先想象网络中的许多节点，每个节点与其他节点之间都有短程、中程和远程连接。执行向量搜索时，我们从某个预先定义的入口点出发，从中评估通往其他节点的连接，跳到离我们想找的目标最近的那个节点。不断重复这个过程，直到找到最近邻为止。

</template>
</BiRow>

<BiRow>
<template #en>

This type of search is called *greedy search*. This algorithm works for small NSWs in the hundreds or thousands of nodes, but it tends to break down for much larger NSWs. We can fix this by increasing the average number of short-, medium-, and long-range connections for each node, but this increases the overall complexity of the network and results in longer search times. In the absolute "worst" case, where each node is connected to every other node in our dataset, NSW is no better than naïve (linear) search.

</template>
<template #zh>

这种搜索叫做*贪心搜索*（greedy search）。对于只有几百或几千个节点的小型 NSW，这个算法工作得不错，但当 NSW 大得多时它就容易撑不住了。我们可以通过增加每个节点平均拥有的短程、中程和远程连接数来解决这个问题，但这会提高网络的整体复杂度，导致搜索时间变长。而在最极端的「最坏」情况下——每个节点都和数据集中其他所有节点相连——NSW 就退化得和朴素（线性）搜索没什么两样了。

</template>
</BiRow>

<BiRow>
<template #en>

NSWs are cool, but how does this relate to [vector search](https://zilliz.com/learn/vector-similarity-search)? The idea here is to imagine all vectors in our dataset as points in an NSW, with long-range connections defined by vectors dissimilar from one another and the opposite for short-range connections. Recall that vector similarity scores are measured with a similarity metric - typically L2 distance (also called Euclidean distance) or inner product (IP)  for floating point vectors and Jaccard or Hamming distance for [binary vectors](https://zilliz.com/learn/what-are-binary-vector-embedding).

</template>
<template #zh>

NSW 很酷，但它和[向量搜索](https://zilliz.com/learn/vector-similarity-search)有什么关系？思路是这样的：把数据集中的所有向量想象成 NSW 中的点，远程连接由彼此不相似的向量定义，短程连接则正相反。回忆一下，向量相似度得分要用相似度度量来衡量——浮点向量通常用 L2 距离（也叫欧氏距离）或内积（IP），[二进制向量](https://zilliz.com/learn/what-are-binary-vector-embedding)则用 Jaccard 距离或汉明距离。

</template>
</BiRow>

<BiRow>
<template #en>

By constructing a navigable small world graph (NSW graph) with dataset vectors as vertices, we can effectively perform nearest neighbor search by greedily traversing the NSW towards vertices closer and closer to our query vector.

</template>
<template #zh>

用数据集向量作为顶点构建出可导航小世界图（NSW 图）之后，我们就能沿 NSW 贪心地遍历、一步步逼近查询向量，从而高效地完成最近邻搜索。

</template>
</BiRow>

<BiRow>
<template #en>

## What is HNSW (Hierarchical Navigable Small Worlds)?

</template>
<template #zh>

## 什么是 HNSW（分层可导航小世界）？

</template>
</BiRow>

<BiRow>
<template #en>

When it comes to vector search or vector similarity search, we often have dataset sizes of hundreds of millions or even billions of vectors. Plain NSWs are less effective at this scale, so we'll need a better graph structure.

</template>
<template #zh>

说到向量搜索或向量相似度搜索，我们面对的数据集往往有几亿甚至几十亿个向量。普通的 NSW 在这种规模下效果不佳，所以我们需要一种更好的图结构。

</template>
</BiRow>

<BiRow>
<template #en>

![better_graph.png](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-02.png)
better_graph.png

</template>
<template #zh>

![better_graph.png](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-02.png)
更好的图结构

</template>
</BiRow>

<BiRow>
<template #en>

<sub>Enter HNSW.</sub>

</template>
<template #zh>

<sub>HNSW 登场。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

HNSW extends NSW by borrowing from the concept of skip lists. Like the skip list, HNSW maintains multiple layers (hence the term *Hierarchical* Navigable Small World), only of NSWs instead of linked lists. The uppermost layer of an HNSW graph has few nodes and the longest links, while the bottommost layer has all nodes and the shortest links. During the search process, we enter a pre-defined point in the uppermost layer and greedily route ourselves toward the nearest neighbor to our query vector. Once we reach the nearest node, we repeat this process to the second layer of the HNSW graph. This continues until we've reached our nearest neighbor.

</template>
<template #zh>

HNSW 借鉴了跳表的概念来扩展 NSW。和跳表一样，HNSW 也维护多个层（所以才叫「分层」可导航小世界），只不过层里装的不是链表，而是一个个 NSW。HNSW 图的最顶层节点最少、链接最长；最底层则包含所有节点、链接最短。搜索时，我们从最顶层的某个预定义入口点进入，贪心地朝查询向量的最近邻方向前进。到达最近的节点后，再在 HNSW 图的第二层重复这个过程。如此继续，直到找到最近邻为止。

</template>
</BiRow>

<BiRow>
<template #en>

![hnsw_visualized_hnsw graph.jpg](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-03.jpg)
hnsw_visualized_hnsw graph.jpg

</template>
<template #zh>

![hnsw_visualized_hnsw graph.jpg](/vector-db-images/hierarchical-navigable-small-worlds-hnsw-03.jpg)
HNSW 图可视化

</template>
</BiRow>

<BiRow>
<template #en>

<sub>A diagram from the HNSW paper which visualizes the layered graph concept. From https://arxiv.org/abs/1603.09320.</sub>

</template>
<template #zh>

<sub>来自 HNSW 论文的一张图，展示了分层图的概念。引自 https://arxiv.org/abs/1603.09320。</sub>

</template>
</BiRow>

<BiRow>
<template #en>

Inserts work similarly to the skip list. For some vector **`v`**, We first traverse the first layer of the graph, finding its nearest neighbor before moving to the layer below it. Then, we traverse the graph again to find its nearest neighbor in the second layer. This process until we've reached the nearest neighbor in the bottommost graph.

</template>
<template #zh>

插入的操作和跳表类似。对于某个向量 **`v`**，我们先从图的最顶层开始遍历，找到它的最近邻，然后移到下一层。接着再次遍历图，在第二层中找它的最近邻。如此往复，直到在最底层的图中找到最近邻。

</template>
</BiRow>

<BiRow>
<template #en>

We must determine which links (connections between vertices) to create from here. Again, we have a pre-defined parameter `M` which determines the maximum number of bidirectional links we can add. These links are usually set as the nearest neighbors to **`v`**, but other heuristics can also be used. The same process repeats for the upper layers, assuming the vector appears.

</template>
<template #zh>

接下来要决定创建哪些链接（顶点之间的连接）。同样，我们有一个预定义参数 `M`，它决定了可以添加的双向链接的最大数量。这些链接通常被设为 **`v`** 的最近邻，但也可以使用其他启发式方法。如果向量出现在更上面的层，那么上面的层也会重复同样的过程。

</template>
</BiRow>

<BiRow>
<template #en>

As with the skip list, the query vector will appear in upper layers with exponentially decreasing probability. Specifically, the HNSW paper uses the equation `floor(-ln(rand(0, 1)))`, where `rand(0, 1)` is a random number sampled from a uniform distribution between (0, 1]. Note how this does not constrain the minimum distance between any two vertices/vectors in a particular layer - we may end up with a poorly constructed graph. Still, the probability of this happening is incredibly low, especially as we scale up the number of vectors in the HNSW index.

</template>
<template #zh>

和跳表一样，查询向量出现在上层的概率呈指数级递减。具体来说，HNSW 论文使用的公式是 `floor(-ln(rand(0, 1)))`，其中 `rand(0, 1)` 是从 (0, 1] 上的均匀分布中采样出的随机数。注意，这并不会约束某一层中任意两个顶点/向量之间的最小距离——我们有可能得到一个构造得很差的图。不过，这种情况发生的概率依然极低，尤其是当 HNSW 索引中的向量数量扩大之后。

</template>
</BiRow>

<BiRow>
<template #en>

## How to Implement HNSW

</template>
<template #zh>

## 如何实现 HNSW

</template>
</BiRow>

<BiRow>
<template #en>

HNSW is not trivial, so we'll implement only a basic version here. As usual, let's start with creating a dataset of (128 dimensional) vectors:

</template>
<template #zh>

实现 HNSW 并非易事，所以这里我们只写一个基础版本。照例，先创建一个（128 维）向量数据集：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
<template #zh>

```python
>>> import numpy as np
>>> dataset = np.random.normal(size=(1000, 128))
```

</template>
</BiRow>

<BiRow>
<template #en>

The first step is to build the HNSW index. We'll need to add each vector to our dataset to do so. So let's first create a data structure to hold our index. In this basic example, we'll use a list of lists to represent the index, with the inner lists corresponding to each layer/graph:

</template>
<template #zh>

第一步是构建 HNSW 索引，这需要把每个向量都加进我们的数据集。所以我们先创建一个存放索引的数据结构。在这个基础示例中，我们用「列表的列表」来表示索引，内层列表对应每一层/每个图：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> L = 5  # 5-layer HNSW
>>> index = [[] for _ in range(L)]
```

</template>
<template #zh>

```python
>>> L = 5  # 5-layer HNSW
>>> index = [[] for _ in range(L)]
```

</template>
</BiRow>

<BiRow>
<template #en>

Every element in each graph is a 3-tuple containing the vector, a list of indexes the vector links to within the graph, and the index for the corresponding node in the layer below it. For the bottommost layer, the third element of the 3-tuple will be set to `None`.

</template>
<template #zh>

每个图中的元素都是一个三元组，包含：向量本身、该向量在图内链接到的索引列表、以及下一层中对应节点的索引。对于最底层，三元组的第三个元素会被设为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

Since every insert first requires a search for the nearest neighbor in graph, let's implement that first. We can traverse any of the subgraphs in the index as so:

</template>
<template #zh>

由于每次插入都要先在图中搜索最近邻，我们先来实现这个搜索。可以像下面这样遍历索引中的任意一个子图：

</template>
</BiRow>

<BiRow>
<template #en>

```python
def _search_layer(graph, entry, query, ef=1):

    best = (np.linalg.norm(graph[entry][0] - query), entry)

    nns = [best]
    visit = set(best)  # set of visited nodes
    candid = [best]  # candidate nodes to insert into nearest neighbors
    heapify(candid)

    # find top-k nearest neighbors
    while candid:
        cv = heappop(candid)

        if nns[-1][0] < cv[0]:
            break

        # loop through all nearest neighbors to the candidate vector
        for e in graph[cv[1]][1]:
            d = np.linalg.norm(graph[e][0] - query)
            if (d, e) not in visit:
                visit.add((d, e))

                # push only "better" vectors into candidate heap
                if d < nns[-1][0] or len(nns) < ef:
                    heappush(candid, (d, e))
                    insort(nns, (d, e))
                    if len(nns) > ef:
                        nns.pop()

    return nns
```

</template>
<template #zh>

```python
def _search_layer(graph, entry, query, ef=1):

    best = (np.linalg.norm(graph[entry][0] - query), entry)

    nns = [best]
    visit = set(best)  # set of visited nodes
    candid = [best]  # candidate nodes to insert into nearest neighbors
    heapify(candid)

    # find top-k nearest neighbors
    while candid:
        cv = heappop(candid)

        if nns[-1][0] < cv[0]:
            break

        # loop through all nearest neighbors to the candidate vector
        for e in graph[cv[1]][1]:
            d = np.linalg.norm(graph[e][0] - query)
            if (d, e) not in visit:
                visit.add((d, e))

                # push only "better" vectors into candidate heap
                if d < nns[-1][0] or len(nns) < ef:
                    heappush(candid, (d, e))
                    insort(nns, (d, e))
                    if len(nns) > ef:
                        nns.pop()

    return nns
```

</template>
</BiRow>

<BiRow>
<template #en>

This code snippet is more involved, but it's much easier to understand with some explanation. Here, we use a heap to implement a priority queue, which we use to order nearest neighbor vectors in the graph. Like all of the previous examples, I'm using L2 distance (Euclidean Distance) here, but this code can also be extended to other [distance metrics](https://zilliz.com/blog/similarity-metrics-for-vector-search). We first populate the heap with the entry point.

</template>
<template #zh>

这段代码要复杂一些，但配上解释就好懂多了。这里我们用堆来实现一个优先队列，再用它来给图中的最近邻向量排序。和之前所有例子一样，我这里用的是 L2 距离（欧氏距离），但这段代码也可以扩展到其他[距离度量](https://zilliz.com/blog/similarity-metrics-for-vector-search)。我们先把入口点放进堆里。

</template>
</BiRow>

<BiRow>
<template #en>

Here, all we're doing is implementing *greedy* search. At every iteration, we aim to update two variables: `nns`, our output list of nearest neighbors, and `candid`, a heap of candidate points. So, first, we evaluate all nearest neighbors to the "best" vector in `candid`, adding better (better means closer to the query vector) vectors to the output list of nearest neighbors and the heap of candidate points for evaluation on the next iteration. This repeats until one of two stopping conditions is reached: we either run out of candidate points to evaluate, or we've determined that we can no longer do any better than we already have.

</template>
<template #zh>

这里我们实现的正是*贪心*搜索。每次迭代的目标是更新两个变量：`nns`（最近邻的输出列表）和 `candid`（候选点的堆）。具体来说，我们先评估 `candid` 中「最优」向量的所有最近邻，把更好的向量（更好指离查询向量更近）同时加进最近邻输出列表和候选点堆，供下一次迭代评估。不断重复，直到满足两个停止条件之一：要么候选点评估完了，要么我们确定已经无法比现有的结果做得更好。

</template>
</BiRow>

<BiRow>
<template #en>

With top-k graph search out of the way, we can now implement the top-level `search` function for searching the entire HNSW index:

</template>
<template #zh>

搞定了 top-k 图搜索之后，现在我们可以实现搜索整个 HNSW 索引的顶层 `search` 函数了：

</template>
</BiRow>

<BiRow>
<template #en>

```python
def search(index, query, ef=1):

    # if the index is empty, return an empty list
    if not index[0]:
        return []

    best_v = 0  # set the initial best vertex to the entry point
    for graph in index:
        best_d, best_v = _search_layer(graph, best_v, query, ef=1)[0]
        if graph[best_v][2]:
            best_v = graph[best_v][2]
        else:
            return _search_layer(graph, best_v, query, ef=ef)
```

</template>
<template #zh>

```python
def search(index, query, ef=1):

    # if the index is empty, return an empty list
    if not index[0]:
        return []

    best_v = 0  # set the initial best vertex to the entry point
    for graph in index:
        best_d, best_v = _search_layer(graph, best_v, query, ef=1)[0]
        if graph[best_v][2]:
            best_v = graph[best_v][2]
        else:
            return _search_layer(graph, best_v, query, ef=ef)
```

</template>
</BiRow>

<BiRow>
<template #en>

We first start at the entry point (zeroth element in the uppermost graph), and search for the nearest neighbor in each index layer until we reach the bottommost layer. Recall that the final element of the 3-tuple will resolve to `None` if we are at the bottommost layer - this is what the final `if` statement is for. Once we reach the lowermost layer, we search the graph using `best_v` as the entry point.

</template>
<template #zh>

我们从入口点（最顶层图的第 0 个元素）出发，在索引的每一层中搜索最近邻，直到抵达最底层。回忆一下，如果当前处于最底层，三元组的最后一个元素会是 `None`——最后那个 `if` 语句就是干这个的。到达最底层后，我们以 `best_v` 为入口点搜索该层图。

</template>
</BiRow>

<BiRow>
<template #en>

Let's go back go the HNSW insert. We'll first need to figure out which layer to insert our new vector into. This is fairly straightforward:

</template>
<template #zh>

回到 HNSW 的插入。我们首先得确定新向量要插入哪一层，这相当简单：

</template>
</BiRow>

<BiRow>
<template #en>

```python
def _get_insert_layer(L, mL):
    # ml is a multiplicative factor used to normalized the distribution
    l = -int(np.log(np.random.random()) * mL)
    return min(l, L)
```

</template>
<template #zh>

```python
def _get_insert_layer(L, mL):
    # ml is a multiplicative factor used to normalized the distribution
    l = -int(np.log(np.random.random()) * mL)
    return min(l, L)
```

</template>
</BiRow>

<BiRow>
<template #en>

With everything in place, we can now implement the insertion function.

</template>
<template #zh>

万事俱备，现在可以实现插入函数了。

</template>
</BiRow>

<BiRow>
<template #en>

```python
def insert(self, vec, efc=10):

    # if the index is empty, insert the vector into all layers and return
    if not index[0]:
        i = None
        for graph in index[::-1]:
            graph.append((vec, [], i))
            i = 0
        return

    l = _get_insert_layer(1/np.log(L))

    start_v = 0
    for n, graph in enumerate(index):

        # perform insertion for layers [l, L) only
        if n < l:
            _, start_v = _search_layer(graph, start_v, vec, ef=1)[0]
        else:
            node = (vec, [], len(_index[n+1]) if n < L-1 else None)
            nns = _search_layer(graph, start_v, vec, ef=efc)
            for nn in nns:
                node[1].append(nn[1])  # outbound connections to NNs
                graph[nn[1]][1].append(len(graph))  # inbound connections to node
            graph.append(node)

        # set the starting vertex to the nearest neighbor in the next layer
        start_v = graph[start_v][2]
```

</template>
<template #zh>

```python
def insert(self, vec, efc=10):

    # if the index is empty, insert the vector into all layers and return
    if not index[0]:
        i = None
        for graph in index[::-1]:
            graph.append((vec, [], i))
            i = 0
        return

    l = _get_insert_layer(1/np.log(L))

    start_v = 0
    for n, graph in enumerate(index):

        # perform insertion for layers [l, L) only
        if n < l:
            _, start_v = _search_layer(graph, start_v, vec, ef=1)[0]
        else:
            node = (vec, [], len(_index[n+1]) if n < L-1 else None)
            nns = _search_layer(graph, start_v, vec, ef=efc)
            for nn in nns:
                node[1].append(nn[1])  # outbound connections to NNs
                graph[nn[1]][1].append(len(graph))  # inbound connections to node
            graph.append(node)

        # set the starting vertex to the nearest neighbor in the next layer
        start_v = graph[start_v][2]
```

</template>
</BiRow>

<BiRow>
<template #en>

If the index is empty, we'll insert `vec` into all layers and return immediately. This serves to initialize the index and allow for successful insertions later. If the index has already been populated, we begin insertion by first computing the insertion layer via the `get_insert_layer` function we implemented in the previous step. From there, we find the nearest neighbor to the vector in the uppermost graph. This process continues for the layers below it until we reach layer `l`, the insertion layer.

</template>
<template #zh>

如果索引是空的，我们就把 `vec` 插入所有层然后立即返回。这一步的作用是初始化索引，让后续的插入能够成功进行。如果索引已经有数据了，插入就先用我们在上一步实现的 `get_insert_layer` 函数算出插入层。然后，在最顶层的图中找到离该向量最近的邻居。这个过程在下面的各层继续，直到到达插入层 `l`。

</template>
</BiRow>

<BiRow>
<template #en>

For layer `l` and all those below it, we first find the nearest neighbors to `vec` up to a pre-determined number `ef`. We then create connections from the node to its nearest neighbors and vice versa. Note that a proper implementation should also have a pruning technique to prevent early vectors from being connected to too many others - I'll leave that as an exercise for the reader :sunny:.

</template>
<template #zh>

对于第 `l` 层及其下所有层，我们先找出 `vec` 的最近邻，最多取预先设定的 `ef` 个。然后建立从该节点到这些最近邻的连接，反过来也一样。注意，一个完善的实现还应该带有剪枝技术，防止早期插入的向量连接到太多其他向量——这个就留给读者当练习了 :sunny:。

</template>
</BiRow>

<BiRow>
<template #en>

We now have both search (query) and insert functionality complete. Let's combine everything in a class:

</template>
<template #zh>

现在，搜索（查询）和插入功能都完成了。我们把它们整合进一个类：

</template>
</BiRow>

<BiRow>
<template #en>

```python
from bisect import insort
from heapq import heapify, heappop, heappush

import numpy as np

from ._base import _BaseIndex

class HNSW(_BaseIndex):

    def __init__(self, L=5, mL=0.62, efc=10):
        self._L = L
        self._mL = mL
        self._efc = efc
        self._index = [[] for _ in range(L)]

    @staticmethod
    def _search_layer(graph, entry, query, ef=1):

        best = (np.linalg.norm(graph[entry][0] - query), entry)

        nns = [best]
        visit = set(best)  # set of visited nodes
        candid = [best]  # candidate nodes to insert into nearest neighbors
        heapify(candid)

        # find top-k nearest neighbors
        while candid:
            cv = heappop(candid)

            if nns[-1][0] > cv[0]:
                break

            # loop through all nearest neighbors to the candidate vector
            for e in graph[cv[1]][1]:
                d = np.linalg.norm(graph[e][0] - query)
                if (d, e) not in visit:
                    visit.add((d, e))

                    # push only "better" vectors into candidate heap
                    if d < nns[-1][0] or len(nns) < ef:
                        heappush(candid, (d, e))
                        insort(nns, (d, e))
                        if len(nns) > ef:
                            nns.pop()

        return nns

    def create(self, dataset):
        for v in dataset:
            self.insert(v)

    def search(self, query, ef=1):

        # if the index is empty, return an empty list
        if not self._index[0]:
            return []

        best_v = 0  # set the initial best vertex to the entry point
        for graph in self._index:
            best_d, best_v = HNSW._search_layer(graph, best_v, query, ef=1)[0]
            if graph[best_v][2]:
                best_v = graph[best_v][2]
            else:
                return HNSW._search_layer(graph, best_v, query, ef=ef)

    def _get_insert_layer(self):
        # ml is a multiplicative factor used to normalize the distribution
        l = -int(np.log(np.random.random()) * self._mL)
        return min(l, self._L-1)

    def insert(self, vec, efc=10):

        # if the index is empty, insert the vector into all layers and return
        if not self._index[0]:
            i = None
            for graph in self._index[::-1]:
                graph.append((vec, [], i))
                i = 0
            return

        l = self._get_insert_layer()

        start_v = 0
        for n, graph in enumerate(self._index):

            # perform insertion for layers [l, L) only
            if n < l:
                _, start_v = self._search_layer(graph, start_v, vec, ef=1)[0]
            else:
                node = (vec, [], len(self._index[n+1]) if n < self._L-1 else None)
                nns = self._search_layer(graph, start_v, vec, ef=efc)
                for nn in nns:
                    node[1].append(nn[1])  # outbound connections to NNs
                    graph[nn[1]][1].append(len(graph))  # inbound connections to node
                graph.append(node)

            # set the starting vertex to the nearest neighbor in the next layer
            start_v = graph[start_v][2]
```

</template>
<template #zh>

```python
from bisect import insort
from heapq import heapify, heappop, heappush

import numpy as np

from ._base import _BaseIndex

class HNSW(_BaseIndex):

    def __init__(self, L=5, mL=0.62, efc=10):
        self._L = L
        self._mL = mL
        self._efc = efc
        self._index = [[] for _ in range(L)]

    @staticmethod
    def _search_layer(graph, entry, query, ef=1):

        best = (np.linalg.norm(graph[entry][0] - query), entry)

        nns = [best]
        visit = set(best)  # set of visited nodes
        candid = [best]  # candidate nodes to insert into nearest neighbors
        heapify(candid)

        # find top-k nearest neighbors
        while candid:
            cv = heappop(candid)

            if nns[-1][0] > cv[0]:
                break

            # loop through all nearest neighbors to the candidate vector
            for e in graph[cv[1]][1]:
                d = np.linalg.norm(graph[e][0] - query)
                if (d, e) not in visit:
                    visit.add((d, e))

                    # push only "better" vectors into candidate heap
                    if d < nns[-1][0] or len(nns) < ef:
                        heappush(candid, (d, e))
                        insort(nns, (d, e))
                        if len(nns) > ef:
                            nns.pop()

        return nns

    def create(self, dataset):
        for v in dataset:
            self.insert(v)

    def search(self, query, ef=1):

        # if the index is empty, return an empty list
        if not self._index[0]:
            return []

        best_v = 0  # set the initial best vertex to the entry point
        for graph in self._index:
            best_d, best_v = HNSW._search_layer(graph, best_v, query, ef=1)[0]
            if graph[best_v][2]:
                best_v = graph[best_v][2]
            else:
                return HNSW._search_layer(graph, best_v, query, ef=ef)

    def _get_insert_layer(self):
        # ml is a multiplicative factor used to normalize the distribution
        l = -int(np.log(np.random.random()) * self._mL)
        return min(l, self._L-1)

    def insert(self, vec, efc=10):

        # if the index is empty, insert the vector into all layers and return
        if not self._index[0]:
            i = None
            for graph in self._index[::-1]:
                graph.append((vec, [], i))
                i = 0
            return

        l = self._get_insert_layer()

        start_v = 0
        for n, graph in enumerate(self._index):

            # perform insertion for layers [l, L) only
            if n < l:
                _, start_v = self._search_layer(graph, start_v, vec, ef=1)[0]
            else:
                node = (vec, [], len(self._index[n+1]) if n < self._L-1 else None)
                nns = self._search_layer(graph, start_v, vec, ef=efc)
                for nn in nns:
                    node[1].append(nn[1])  # outbound connections to NNs
                    graph[nn[1]][1].append(len(graph))  # inbound connections to node
                graph.append(node)

            # set the starting vertex to the nearest neighbor in the next layer
            start_v = graph[start_v][2]
```

</template>
</BiRow>

<BiRow>
<template #en>

Boom, done!

</template>
<template #zh>

搞定，收工！

</template>
</BiRow>

<BiRow>
<template #en>

## A Summary of HNSW

</template>
<template #zh>

## HNSW 小结

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we explored Hierarchical Navigable Small Worlds (HNSW), a powerful graph-based vector similarity search strategy that involves multiple layers of connected graphs. This HNSW algorithm is often the go-to choice for Milvus users looking for maximum query performance.

</template>
<template #zh>

在本篇教程中，我们探索了分层可导航小世界（HNSW）——一种强大的基于图的向量相似度搜索策略，它由多层相互连接的图组成。对于追求极致查询性能的 Milvus 用户来说，HNSW 算法往往是首选。

</template>
</BiRow>

<BiRow>
<template #en>

In the next tutorial, we'll continue our deep dive into indexing strategies with Approximate Nearest Neighbor Oh Yeah (ANNOY) - a tree-based indexing algorithm that I particularly enjoy because of its playful name.

</template>
<template #zh>

在下一篇教程中，我们将继续深入索引策略，主角是「近似最近邻噢耶」（Approximate Nearest Neighbor Oh Yeah，ANNOY）——一种基于树的索引算法，我尤其喜欢它那俏皮的名字。

</template>
</BiRow>
