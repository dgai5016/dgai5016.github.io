<BiRow>
<template #en>

In the previous tutorial, we went over a quick word [embedding](https://zilliz.com/learn/what-are-binary-vector-embedding) example to better understand the [power of embeddings](https://zilliz.com/learn/vector-similarity-search) along with how they are stored and indexed in a [vector database](https://zilliz.com/learn/what-is-vector-database). This led to a brief overview of [nearest neighbor search](https://zilliz.com/glossary/anns) algorithms, a computing problem that involves finding the closest vector(s) to a query vector based on a selected distance metric.

</template>
<template #zh>

在上一篇教程中，我们通过一个快速的词[嵌入](https://zilliz.com/learn/what-are-binary-vector-embedding)示例，更好地理解了[嵌入向量的威力](https://zilliz.com/learn/vector-similarity-search)，以及它们在[向量数据库](https://zilliz.com/learn/what-is-vector-database)中如何存储和索引。由此，我们还简要概览了[最近邻搜索](https://zilliz.com/glossary/anns)算法——这是一个计算问题，目标是基于选定的距离度量，找出离查询向量最近的向量。

</template>
</BiRow>

<BiRow>
<template #en>

[Vector indexing](https://zilliz.com/learn/how-to-pick-a-vector-index-in-milvus-visual-guide) involves mapping queries to a smaller subset of the vector space to enhance search efficiency. We then briefly discussed a couple of well-known methods for vector search: Vector search is a critical component of vector databases, but only as it relates to computation; vector databases are complex beasts that involve numerous moving components and layers of abstraction.

</template>
<template #zh>

[向量索引](https://zilliz.com/learn/how-to-pick-a-vector-index-in-milvus-visual-guide)的做法是把查询映射到向量空间的一个更小子集，从而提升搜索效率。随后我们简要讨论了几种知名的向量搜索方法：向量搜索是向量数据库的关键组件，但仅就计算层面而言；向量数据库是复杂的庞然大物，涉及大量相互配合的组件和层层抽象。

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we’ll analyze the components of a modern indexer before going over two of the simplest and most basic indexing strategies - flat indexing and inverted file indexes (IVF). Knowledge of these two indexing types will be critical as we progress into the next couple of tutorials.

</template>
<template #zh>

在本篇教程中，我们会先剖析现代索引器的组成，再学习两种最简单、最基础的索引策略——Flat（暴力）索引与倒排文件索引（IVF）。在接下来的几篇教程中，这两种索引类型的知识将至关重要。

</template>
</BiRow>

<BiRow>
<template #en>

## Introduction

</template>
<template #zh>

## 简介

</template>
</BiRow>

<BiRow>
<template #en>

Vector indexing is a crucial component of vector databases, enabling efficient [similarity searches](https://zilliz.com/blog/similarity-metrics-for-vector-search) in high-dimension datasets. With the increasing demand for fast and accurate search capabilities, understanding vector indexing and its various methods is essential for developers and data scientists. In this article, we will delve into the world of vector indexing, exploring its definition, importance, and common indexing methods.

</template>
<template #zh>

向量索引是向量数据库的关键组件，让我们能在高维数据集中高效地进行[相似度搜索](https://zilliz.com/blog/similarity-metrics-for-vector-search)。随着对快速、精准搜索能力的需求与日俱增，理解向量索引及其各种方法，对开发者和数据科学家来说必不可少。在本文中，我们将深入向量索引的世界，探究它的定义、重要性以及常见的索引方法。

</template>
</BiRow>

<BiRow>
<template #en>

## What is Vector Indexing?

</template>
<template #zh>

## 什么是向量索引？

</template>
</BiRow>

<BiRow>
<template #en>

### Definition of Vector Indexing

</template>
<template #zh>

### 向量索引的定义

</template>
</BiRow>

<BiRow>
<template #en>

Vector indexing is a technique used to organize and store vector data in a way that enables fast and efficient similarity searches. It involves creating a data structure that maps vectors to their nearest neighbors, allowing for quick retrieval of similar vectors. Vector indexing is a critical component of vector databases, which are designed to handle high-dimensional data and provide fast query performance.

</template>
<template #zh>

向量索引是一种用于组织和存储向量数据的技术，目的是实现快速、高效的相似度搜索。它需要构建一种数据结构，把向量映射到它们的最近邻，从而快速检索出相似的向量。向量索引是向量数据库的关键组件，而向量数据库正是为处理高维数据、提供快速查询性能而设计的。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector indexing and Milvus

</template>
<template #zh>

## 向量索引与 Milvus

</template>
</BiRow>

<BiRow>
<template #en>

Milvus uses [Facebook AI Similarity Search (FAISS)](https://github.com/facebookresearch/faiss) as one of the key indexing-building libraries, along with [Hnswlib](https://github.com/nmslib/hnswlib)[Annoy](https://github.com/spotify/annoy). As mentioned in the previous tutorial, Milvus builds on top of these libraries to provide a full-fledged database, complete with all the usual database features and a consistent user-level API. It is a good place to practice using a c++ vector index, as opposed to an R vector index, because [FAISS](https://zilliz.com/learn/faiss) is a library written in c++ with a Python interface.

</template>
<template #zh>

Milvus 把 [Facebook AI Similarity Search（FAISS）](https://github.com/facebookresearch/faiss) 作为核心的索引构建库之一，同时还使用 [Hnswlib](https://github.com/nmslib/hnswlib)[Annoy](https://github.com/spotify/annoy)。正如上一篇教程所说，Milvus 在这些库之上构建出了一个功能完备的数据库，既有常规数据库应有尽有的功能，又提供一致的用户级 API。这里也是练手 C++ 向量索引（而非 R 向量索引）的好地方，因为 [FAISS](https://zilliz.com/learn/faiss) 是一个用 C++ 编写、带 Python 接口的库。

</template>
</BiRow>

<BiRow>
<template #en>

If you’re already familiar with FAISS, many of the concepts introduced here and in the next couple of tutorials may already be familiar to you.

</template>
<template #zh>

如果你已经熟悉 FAISS，那么本篇以及接下来几篇教程中介绍的许多概念，你可能早就知道了。

</template>
</BiRow>

<BiRow>
<template #en>

You may have noticed this after going through the previous tutorial, but there are, broadly speaking, four different types of [vector search algorithms](https://zilliz.com/learn/popular-machine-learning-algorithms-behind-vector-search):

</template>
<template #zh>

学完上一篇教程后你可能已经注意到了：大体而言，[向量搜索算法](https://zilliz.com/learn/popular-machine-learning-algorithms-behind-vector-search)有四种不同的类型：

</template>
</BiRow>

<BiRow>
<template #en>

- *hash-based indexing* (e.g. [locality-sensitive hashing](https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide)),
- *tree-based indexing* (e.g. ANNOY),
- *cluster-based or cluster indexing* (e.g. product quantization), and
- *graph-based indexing* (e.g. Hierarchical navigable small world or HNSW, CAGRA).

</template>
<template #zh>

- *基于哈希的索引*（例如[局部敏感哈希](https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide)）、
- *基于树的索引*（例如 ANNOY）、
- *基于聚类或簇的索引*（例如乘积量化），以及
- *基于图的索引*（例如分层可导航小世界，即 HNSW、CAGRA）。

</template>
</BiRow>

<BiRow>
<template #en>

Different types of algorithms work better for large datasets and varying types of vector data, but all of them help speed up the vector search process at the cost of a bit of accuracy/recall.

</template>
<template #zh>

不同类型的算法各自更适合大规模数据集和不同类型的向量数据，但它们无一例外都能加速向量搜索过程，代价是损失一点准确性/召回率。

</template>
</BiRow>

<BiRow>
<template #en>

One key detail that often goes overlooked with [vector search](https://zilliz.com/learn/vector-similarity-search) is the capability to combine many vector search algorithms together. Within a vector database, a full vector index is generally composed of three distinct components:

</template>
<template #zh>

[向量搜索](https://zilliz.com/learn/vector-similarity-search)中一个常被忽视的关键细节是：多种向量搜索算法是可以组合使用的。在向量数据库中，一个完整的向量索引通常由三个独立组件构成：

</template>
</BiRow>

<BiRow>
<template #en>

1. an optional **pre-processing** step where vectors may be reduced or optimized prior to indexing,
2. a required **primary** step which is the core algorithm used for indexing, and
3. an optional **secondary** step where vectors may be quantized or hashed to further improve search speeds.

</template>
<template #zh>

1. 可选的**预处理（pre-processing）**步骤：向量在索引之前可能被降维或优化、
2. 必需的**主（primary）**步骤：用于索引的核心算法，以及
3. 可选的**次级（secondary）**步骤：向量可能被量化或哈希，以进一步提升搜索速度。

</template>
</BiRow>

<BiRow>
<template #en>

The first step simply prepares the vectors for indexing and search without actually building any data structure. The algorithm used here often depends on the application and the upstream vector generation method, but some commonly used ones include L2 normalization, [dimensionality reduction](https://zilliz.com/glossary/dimensionality-reduction), and zero padding. Most vector databases skip this step and leave pre-processing entirely up to the user in the application layer.

</template>
<template #zh>

第一步只是为索引和搜索准备好向量，并不会实际构建任何数据结构。这一步用哪种算法通常取决于应用和上游的向量生成方式，常见的有 L2 归一化、[降维](https://zilliz.com/glossary/dimensionality-reduction)和零填充（zero padding）。大多数向量数据库会跳过这一步，把预处理完全留给用户在应用层完成。

</template>
</BiRow>

<BiRow>
<template #en>

The primary algorithm is the only mandatory component and forms the crux of the vector index. The output of this step should be a data structure which holds all information necessary to conduct an efficient vector search. Tree-based and graph-based data structures are commonly used here, but a quantization algorithm or a hash based vector index such as product quantization or locality-sensitive hashing works as well. During this step, index creation is crucial, and selecting appropriate distance calculation methods ensures effective performance during query operations. Additionally, key parameters such as 'lists', 'probes', 'efConstruction', and 'efSearch' play significant roles in enhancing performance while managing memory usage. The representation and organization of data points are also essential to efficiently perform operations like [k-nearest neighbor](https://zilliz.com/blog/k-nearest-neighbor-algorithm-for-machine-learning) searches.

</template>
<template #zh>

主算法是唯一必需的组件，构成了向量索引的核心。这一步的输出应该是一个数据结构，保存着高效执行向量搜索所需的全部信息。这里常用基于树和基于图的数据结构，但量化算法或基于哈希的向量索引（例如乘积量化或局部敏感哈希）同样可行。在这一步中，索引的创建至关重要，选择合适的距离计算方法才能保证查询操作的性能。此外，'lists'、'probes'、'efConstruction'、'efSearch' 等关键参数在提升性能、控制内存占用方面作用显著。数据点的表示与组织，对于高效执行[k 近邻](https://zilliz.com/blog/k-nearest-neighbor-algorithm-for-machine-learning)搜索之类的操作同样不可或缺。

</template>
</BiRow>

<BiRow>
<template #en>

The secondary step reduces the total size of the index by mapping all floating point values in the dataset into lower-precision integer values, i.e. `float64` -> `int8` or `float32` -> `int8`. This modification can both reduce the index size as well as improve search speeds, but generally at the cost of some precision. There are a couple different ways this can be done; we'll dive deeper into quantization and hashing in future tutorials.

</template>
<template #zh>

次级步骤通过把数据集中所有浮点值映射为低精度整数值（即 `float64` -> `int8` 或 `float32` -> `int8`）来缩减索引的总大小。这种修改既能缩小索引体积，又能提升搜索速度，但通常要付出一些精度的代价。具体做法有好几种；我们会在后续教程中深入量化与哈希。

</template>
</BiRow>

<BiRow>
<template #en>

Before diving too deep into more complex vector search algorithms, it pays take a brief look at *linear search*, also known as "flat" indexing.

</template>
<template #zh>

在一头扎进更复杂的向量搜索算法之前，值得先花点时间看看*线性搜索*——它也被称为"Flat（暴力）"索引。

</template>
</BiRow>

<BiRow>
<template #en>

A flat index is by and large the most basic indexing strategy, but arguably also the most overlooked. With flat indexing, we compare a query vector with every other vector in our database. In code, this would look something like this:

</template>
<template #zh>

Flat 索引基本上是最基础的索引策略，但恐怕也是最被忽视的一种。使用 Flat 索引时，我们把查询向量与数据库中所有其他向量逐一比较。写成代码大概是这样：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> query = np.random.normal(size=(128,))
>>> dataset = np.random.normal(size=(1000, 128))
>>> nearest = np.argmin(np.linalg.norm(dataset - query, axis=1))
>>> nearest
333
```

</template>
<template #zh>

```python
>>> query = np.random.normal(size=(128,))
>>> dataset = np.random.normal(size=(1000, 128))
>>> nearest = np.argmin(np.linalg.norm(dataset - query, axis=1))
>>> nearest
333
```

</template>
</BiRow>

<BiRow>
<template #en>

Note how the index is simply a flat data structure which is exactly the size of the dataset - no more and no less.

</template>
<template #zh>

注意，这里的索引就是一个扁平的数据结构，大小恰好等于数据集——不多也不少。

</template>
</BiRow>

<BiRow>
<template #en>

The first two lines of code creates a random query vector in addition to a 1000-element dataset of vectors. The third line then computes the distance (via **np.linalg.norm**) between all elements in the dataset and the nearest neighbors of the query vector before extracting the index of the minimum distance (via **np.argmin**). This gives us the array index of the nearest neighbor to the query vector, which we can then extract using **dataset[nearest,:]**.

</template>
<template #zh>

头两行代码创建了一个随机查询向量，外加一个包含 1000 个向量的数据集。第三行接着计算数据集中所有元素与查询向量之间的距离（通过 **np.linalg.norm**），再提取距离最小值的索引（通过 **np.argmin**）。这样就得到了查询向量最近邻的数组索引，之后可以用 **dataset[nearest,:]** 把它取出来。

</template>
</BiRow>

<BiRow>
<template #en>

This is obviously the most naïve way to perform vector search, but it can work surprisingly well for small datasets, especially if you have an accelerator such as a GPU or FPGA to parallelize the search process on. The loop above, for example, runs in less than 0.5 milliseconds on an Intel i7-9750H CPU, which means that we can achieve a QPS of over 2000 with flat indexing on a six-core laptop CPU!

</template>
<template #zh>

这显然是最朴素的向量搜索方式，但在小数据集上效果出奇地好，尤其是当你有 GPU 或 FPGA 之类的加速器可以并行化搜索过程时。比如上面那段循环，在 Intel i7-9750H CPU 上运行耗时不到 0.5 毫秒——这意味着在一颗六核笔记本 CPU 上用 Flat 索引就能做到超过 2000 的 QPS（每秒查询数）！

</template>
</BiRow>

<BiRow>
<template #en>

Our QPS drops to around 160 with 10k vectors and 16 with 100k vectors, with the >10x factor drop from 1000 vectors to 10k vectors likely being due to CPU cache size limitations. These numbers are still pretty good though. With all the talk nowadays about runtime complexity and horizontal scaling, remember the [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) for small applications and/or prototyping: Keep It Simple, Stupid.

</template>
<template #zh>

当向量数达到 1 万时，QPS 降到约 160；达到 10 万时，只剩 16——从 1000 到 1 万向量 QPS 下降超过 10 倍，很可能是受 CPU 缓存大小的限制。不过这些数字仍然相当不错。如今满世界都在谈运行时复杂度和水平扩展，但对于小应用和/或原型开发，别忘了[KISS 原则](https://en.wikipedia.org/wiki/KISS_principle)：Keep It Simple, Stupid（保持简单，别把事情搞复杂）。

</template>
</BiRow>

<BiRow>
<template #en>

Flat indexing is great, but it obviously doesn't scale. This is where data structures for vector search come into play. By trading off a bit of accuracy/recall for improved runtime, we can significantly improve both query speed and throughput. There are a ***lot*** of indexing strategies out there today, but one of the most commonly used ones is ***inverted file index*** (IVF).

</template>
<template #zh>

Flat 索引固然好用，但显然没法扩展。这时，面向向量搜索的数据结构就派上用场了。用一点准确性/召回率换取更优的运行时间，我们就能显著提升查询速度和吞吐量。如今市面上的索引策略***多得很***，但最常用的之一是***倒排文件索引***（IVF）。

</template>
</BiRow>

<BiRow>
<template #en>

Fancy name aside, IVF is actually fairly simple. An inverted file index reduces the overall search scope by arranging the entire dataset into partitions. All partitions are associated with a *centroid*, and every vector in the dataset is assigned to a partition that corresponds to its nearest centroid. The algorithm attempts to locate the nearest vectors within the same region as a query vector.

</template>
<template #zh>

名字听着高大上，IVF 其实相当简单。倒排文件索引通过把整个数据集划分成多个分区来缩小总体搜索范围。所有分区都与一个*质心*相关联，数据集中的每个向量都会被分配到与其最近质心对应的分区。算法会尝试在查询向量所处的同一区域内定位最近的向量。

</template>
</BiRow>

<BiRow>
<template #en>

![A two-dimensional Voronoi diagram. Image by Balu Ertl, CC BY-SA 4.0.](/vector-db-images/vector-index-01.png)
A two-dimensional Voronoi diagram. Image by Balu Ertl, CC BY-SA 4.0.

</template>
<template #zh>

![A two-dimensional Voronoi diagram. Image by Balu Ertl, CC BY-SA 4.0.](/vector-db-images/vector-index-01.png)
二维 Voronoi 图。图片作者：Balu Ertl，CC BY-SA 4.0。

</template>
</BiRow>

<BiRow>
<template #en>

If you're familiar with [FAISS](https://github.com/facebookresearch/faiss), the above diagram might be familiar to you; it's called a *Voronoi diagram* and visually illustrates this cluster index assignment, albeit in only two dimensions. There are a total of 20 cells (clusters), with the centroid for each cluster displayed as a black dot. All points in a dataset will fall into one of these 20 regions.

</template>
<template #zh>

如果你熟悉 [FAISS](https://github.com/facebookresearch/faiss)，上面这张图你可能见过；它叫*Voronoi 图*，直观地展示了这种聚类索引的分配方式，只不过只画了两个维度。图中共有 20 个单元（簇），每个簇的质心用黑点标出。数据集中的所有点都会落入这 20 个区域之一。

</template>
</BiRow>

<BiRow>
<template #en>

Cluster centroids are usually determined with a clustering algorithm called *k-means*. K-means is an interative algorithm that works by first randomly selecting a set of `K` points as clusters. At every iteration, all points in the dataset of vectors are assigned to its nearest centroid, and all centroids are then updated to the mean of each cluster. This process then continues until convergence - a process known as expectation-maximazation for folks familiar with statistics.

</template>
<template #zh>

簇的质心通常用一个叫*k 均值（k-means）*的聚类算法来确定。k-means 是一种迭代算法：先随机选取一组 `K` 个点作为簇；在每次迭代中，把向量数据集中的所有点分配给其最近的质心，然后所有质心更新为各簇的均值。如此往复直到收敛——熟悉统计学的朋友会认出来，这就是期望最大化（expectation-maximization）过程。

</template>
</BiRow>

<BiRow>
<template #en>

Armed with this knowledge, let's use k-means to "automagically" determine centroids for IVF. For this, we'll use scipy's `kmeans2` implementation:

</template>
<template #zh>

有了这些知识，我们就可以用 k-means 来"自动施魔法"般地为 IVF 确定质心。这里我们使用 scipy 的 `kmeans2` 实现：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> import numpy as np
>>> from scipy.cluster.vq import kmeans2
>>> num_part = 16  # number of IVF partitions
>>> dataset = np.random.normal(size=(1000, 128))
>>> (centroids, assignments) = kmeans2(dataset, num_part, iter=32)
>>> centroids.shape
(16, 128)
>>> indexes.shape
(1000,)
```

</template>
<template #zh>

```python
>>> import numpy as np
>>> from scipy.cluster.vq import kmeans2
>>> num_part = 16  # number of IVF partitions
>>> dataset = np.random.normal(size=(1000, 128))
>>> (centroids, assignments) = kmeans2(dataset, num_part, iter=32)
>>> centroids.shape
(16, 128)
>>> indexes.shape
(1000,)
```

</template>
</BiRow>

<BiRow>
<template #en>

`centroids` now contains all `num_part` (in FAISS, this parameter is called `nlist`) centroids for our dataset, while `assignments` contains ID of the centroid/cluster that is closest to each vector. We can verify this as follows:

</template>
<template #zh>

现在，`centroids` 包含了数据集的全部 `num_part` 个质心（在 FAISS 中，这个参数叫 `nlist`），而 `assignments` 包含每个向量最近的质心/簇的 ID。我们可以这样验证：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> test = [np.argmin(np.linalg.norm(vec - centroids, axis=1)) for vec in dataset]
>>> np.all(test == assignments)
True
```

</template>
<template #zh>

```python
>>> test = [np.argmin(np.linalg.norm(vec - centroids, axis=1)) for vec in dataset]
>>> np.all(test == assignments)
True
```

</template>
</BiRow>

<BiRow>
<template #en>

We'll now need to create the inverted file index by correlating each centroid with a list of vectors within the cluster:

</template>
<template #zh>

接下来需要构建倒排文件索引：把每个质心与簇内向量列表关联起来：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> index = [[] for _ in range(num_part)]
>>> for n, k in enumerate(assignments):
...     index[k].append(n)  # the nth vector gets added to the kth cluster
...
```

</template>
<template #zh>

```python
>>> index = [[] for _ in range(num_part)]
>>> for n, k in enumerate(assignments):
...     index[k].append(n)  # the nth vector gets added to the kth cluster
...
```

</template>
</BiRow>

<BiRow>
<template #en>

The code above first creates a list of lists, with the outermost layer corresponding to the number of inverted file index partitions. The for loop then loops through all assignments (i.e. which partition each vector belongs to) and populates the index.

</template>
<template #zh>

上面这段代码先创建了一个"列表的列表"，最外层对应倒排文件索引的分区数。然后 for 循环遍历所有分配结果（即每个向量属于哪个分区），把索引填充完整。

</template>
</BiRow>

<BiRow>
<template #en>

With the index in place, we can now restrict the overall search space by searching only the nearest cluster:

</template>
<template #zh>

索引建好之后，我们就可以只搜索最近的簇，从而缩小总体搜索范围：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> query = np.random.normal(size=(128,))
>>> c = np.argmin(np.linalg.norm(centroids - query, axis=1))  # find the nearest partition
>>> nearest = np.argmin(np.linalg.norm(dataset[index[c]] - query, axis=1))  # find nearest neighbor
>>> nearest
333
```

</template>
<template #zh>

```python
>>> query = np.random.normal(size=(128,))
>>> c = np.argmin(np.linalg.norm(centroids - query, axis=1))  # find the nearest partition
>>> nearest = np.argmin(np.linalg.norm(dataset[index[c]] - query, axis=1))  # find nearest neighbor
>>> nearest
333
```

</template>
</BiRow>

<BiRow>
<template #en>

With an `num_part` value of 16 and a dataset size of 100k, we get around 150 QPS using the same hardware as before (Intel i7-9750H CPU). Bumping `num_part` to 64 nets us a whopping 650 QPS.

</template>
<template #zh>

在 `num_part` 为 16、数据集大小为 10 万的情况下，用与之前相同的硬件（Intel i7-9750H CPU）可以得到约 150 QPS；把 `num_part` 提到 64，更是能拿到高达 650 QPS。

</template>
</BiRow>

<BiRow>
<template #en>

Note that it’s often pragmatic to extend our search beyond just the nearest cluster, especially for high-dimensional data (for those familiar with FAISS, this corresponds to the `nprobe` parameter when creating an inverted file index). This is largely due to the [*curse of dimensionality*](https://zilliz.com/glossary/curse-of-dimensionality-in-machine-learning), where each partition has a significantly larger number of edges when compared with similar data in two or three dimensions. There’s no good rule of thumb for a good value of `nprobe` to use - rather, it’s helpful to first experiment with your data to see the speed versus accuracy/recall tradeoffs.

</template>
<template #zh>

注意，把搜索范围扩展到最近的簇之外往往更实用，对高维数据尤其如此（熟悉 FAISS 的话会知道，这对应创建倒排文件索引时的 `nprobe` 参数）。这很大程度上要归因于[*维度灾难*](https://zilliz.com/glossary/curse-of-dimensionality-in-machine-learning)：与二维或三维中的类似数据相比，高维数据里每个分区的边数要多得多。`nprobe` 取多少合适并没有好的经验法则——不如先拿自己的数据做实验，看看速度与准确性/召回率之间的取舍。

</template>
</BiRow>

<BiRow>
<template #en>

And that’s it for the inverted file index! Not too bad, right?

</template>
<template #zh>

倒排文件索引就讲到这里！还不赖，对吧？

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we looked at the three individual components of a vector index along with two of the most commonly used methods - flat indexing and the inverted file index. These are two of the most basic strategies, and we’ll use them as a launchpad for further deep dives into more complex vector indices.

</template>
<template #zh>

在本篇教程中，我们分析了向量索引的三个组件，以及两种最常用的方法——Flat 索引和倒排文件索引。这是两种最基础的策略，我们将以它们为跳板，进一步深入更复杂的向量索引。

</template>
</BiRow>

<BiRow>
<template #en>

In the next tutorial, we’ll continue our deep dive into indexing strategies with scalar quantization (SQ) and product quantization (PQ) - two popular quantization strategies available to [Milvus](https://zilliz.com/what-is-milvus) users. See you in the next tutorial!

</template>
<template #zh>

在下一篇教程中，我们将继续深入索引策略，讲解标量量化（SQ）与乘积量化（PQ）——两种深受 [Milvus](https://zilliz.com/what-is-milvus) 用户欢迎的量化策略。下篇教程见！

</template>
</BiRow>

<BiRow>
<template #en>

All code for this tutorial is freely available on Github: [https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search).

</template>
<template #zh>

本教程的全部代码都在 Github 上免费开放：[https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search)。

</template>
</BiRow>

<BiRow>
<template #en>

1. [Introduction to Unstructured Data](https://zilliz.com/learn/introduction-to-unstructured-data)
2. [What is a Vector Database?](https://zilliz.com/learn/what-is-vector-database)
3. [Comparing Vector Databases, Vector Search Libraries, and Vector Search Plugins](https://zilliz.com/learn/comparing-vector-database-vector-search-library-and-vector-search-plugin)
4. [Introduction to Milvus](https://zilliz.com/learn/introduction-to-milvus-vector-database)
5. [Milvus Quickstart](https://zilliz.com/learn/milvus-vector-database-quickstart)
6. [Introduction to Vector Similarity Search](https://zilliz.com/learn/vector-similarity-search)
7. [Vector Index Basics and the Inverted File Index](https://zilliz.com/learn/vector-index)
8. [Scalar Quantization and Product Quantization](https://zilliz.com/learn/scalar-quantization-and-product-quantization)
9. [Hierarchical Navigable Small Worlds (HNSW)](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)
10. [Approximate Nearest Neighbors Oh Yeah (ANNOY)](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)
11. [Choosing the Right Vector Index for Your Project](https://zilliz.com/learn/choosing-right-vector-index-for-your-project)
12. [DiskANN and the Vamana Algorithm](https://zilliz.com/learn/DiskANN-and-the-Vamana-Algorithm)

</template>
<template #zh>

1. [非结构化数据介绍](https://zilliz.com/learn/introduction-to-unstructured-data)
2. [什么是向量数据库？](https://zilliz.com/learn/what-is-vector-database)
3. [向量数据库、向量搜索库与向量搜索插件对比](https://zilliz.com/learn/comparing-vector-database-vector-search-library-and-vector-search-plugin)
4. [Milvus 介绍](https://zilliz.com/learn/introduction-to-milvus-vector-database)
5. [Milvus 快速上手](https://zilliz.com/learn/milvus-vector-database-quickstart)
6. [向量相似度搜索入门](https://zilliz.com/learn/vector-similarity-search)
7. [向量索引基础与倒排文件索引](https://zilliz.com/learn/vector-index)
8. [标量量化与乘积量化](https://zilliz.com/learn/scalar-quantization-and-product-quantization)
9. [分层可导航小世界（HNSW）](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)
10. [近似最近邻，噢耶（ANNOY）](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)
11. [为你的项目选择合适的向量索引](https://zilliz.com/learn/choosing-right-vector-index-for-your-project)
12. [DiskANN 与 Vamana 算法](https://zilliz.com/learn/DiskANN-and-the-Vamana-Algorithm)

</template>
</BiRow>

<BiRow>
<template #en>

## Common Indexing Methods

</template>
<template #zh>

## 常见索引方法

</template>
</BiRow>

<BiRow>
<template #en>

### Flat Indexing

</template>
<template #zh>

### Flat 索引

</template>
</BiRow>

<BiRow>
<template #en>

Flat indexing is a simple and straightforward indexing method that stores vectors as is, without any modifications. It is the most basic indexing strategy, but also the most overlooked. Flat indexing provides perfect accuracy but is slow, making it suitable for small datasets where search speed is reasonable. However, as the dataset size increases, flat indexing becomes impractical due to its slow search speed.

</template>
<template #zh>

Flat 索引是一种简单直接的索引方法：向量原样存储，不做任何修改。它是最基础的索引策略，也是最常被忽视的一种。Flat 索引能提供完美的准确性，但速度慢，适合搜索速度尚可接受的小数据集。然而，随着数据集规模增大，Flat 索引会因搜索速度慢而变得不切实际。

</template>
</BiRow>

<BiRow>
<template #en>

In the next section, we will explore other common indexing methods, including Locality Sensitive Hashing (LSH), Inverted File (IVF), and Hierarchical Navigable Small Worlds (HNSW). These methods offer a trade-off between search speed and accuracy, making them suitable for different use cases and dataset sizes.

</template>
<template #zh>

在下一节中，我们将探索其他常见索引方法，包括局部敏感哈希（LSH）、倒排文件（IVF）和分层可导航小世界（HNSW）。这些方法在搜索速度与准确性之间做出权衡，适用于不同的使用场景和数据集规模。

</template>
</BiRow>
