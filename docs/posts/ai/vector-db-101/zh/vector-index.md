# 关于向量索引基础，你需要知道的一切

在上一篇教程中，我们通过一个快速的词[嵌入](https://zilliz.com/learn/what-are-binary-vector-embedding)示例，更好地理解了[嵌入向量的威力](https://zilliz.com/learn/vector-similarity-search)，以及它们在[向量数据库](https://zilliz.com/learn/what-is-vector-database)中如何存储和索引。由此，我们还简要概览了[最近邻搜索](https://zilliz.com/glossary/anns)算法——这是一个计算问题，目标是基于选定的距离度量，找出离查询向量最近的向量。

[向量索引](https://zilliz.com/learn/how-to-pick-a-vector-index-in-milvus-visual-guide)的做法是把查询映射到向量空间的一个更小子集，从而提升搜索效率。随后我们简要讨论了几种知名的向量搜索方法：向量搜索是向量数据库的关键组件，但仅就计算层面而言；向量数据库是复杂的庞然大物，涉及大量相互配合的组件和层层抽象。

在本篇教程中，我们会先剖析现代索引器的组成，再学习两种最简单、最基础的索引策略——Flat（暴力）索引与倒排文件索引（IVF）。在接下来的几篇教程中，这两种索引类型的知识将至关重要。

## 简介

向量索引是向量数据库的关键组件，让我们能在高维数据集中高效地进行[相似度搜索](https://zilliz.com/blog/similarity-metrics-for-vector-search)。随着对快速、精准搜索能力的需求与日俱增，理解向量索引及其各种方法，对开发者和数据科学家来说必不可少。在本文中，我们将深入向量索引的世界，探究它的定义、重要性以及常见的索引方法。

## 什么是向量索引？

### 向量索引的定义

向量索引是一种用于组织和存储向量数据的技术，目的是实现快速、高效的相似度搜索。它需要构建一种数据结构，把向量映射到它们的最近邻，从而快速检索出相似的向量。向量索引是向量数据库的关键组件，而向量数据库正是为处理高维数据、提供快速查询性能而设计的。

## 向量索引与 Milvus

Milvus 把 [Facebook AI Similarity Search（FAISS）](https://github.com/facebookresearch/faiss) 作为核心的索引构建库之一，同时还使用 [Hnswlib](https://github.com/nmslib/hnswlib)[Annoy](https://github.com/spotify/annoy)。正如上一篇教程所说，Milvus 在这些库之上构建出了一个功能完备的数据库，既有常规数据库应有尽有的功能，又提供一致的用户级 API。这里也是练手 C++ 向量索引（而非 R 向量索引）的好地方，因为 [FAISS](https://zilliz.com/learn/faiss) 是一个用 C++ 编写、带 Python 接口的库。

如果你已经熟悉 FAISS，那么本篇以及接下来几篇教程中介绍的许多概念，你可能早就知道了。

学完上一篇教程后你可能已经注意到了：大体而言，[向量搜索算法](https://zilliz.com/learn/popular-machine-learning-algorithms-behind-vector-search)有四种不同的类型：

- *基于哈希的索引*（例如[局部敏感哈希](https://zilliz.com/learn/Local-Sensitivity-Hashing-A-Comprehensive-Guide)）、
- *基于树的索引*（例如 ANNOY）、
- *基于聚类或簇的索引*（例如乘积量化），以及
- *基于图的索引*（例如分层可导航小世界，即 HNSW、CAGRA）。

不同类型的算法各自更适合大规模数据集和不同类型的向量数据，但它们无一例外都能加速向量搜索过程，代价是损失一点准确性/召回率。

[向量搜索](https://zilliz.com/learn/vector-similarity-search)中一个常被忽视的关键细节是：多种向量搜索算法是可以组合使用的。在向量数据库中，一个完整的向量索引通常由三个独立组件构成：

1. 可选的**预处理（pre-processing）**步骤：向量在索引之前可能被降维或优化、
2. 必需的**主（primary）**步骤：用于索引的核心算法，以及
3. 可选的**次级（secondary）**步骤：向量可能被量化或哈希，以进一步提升搜索速度。

第一步只是为索引和搜索准备好向量，并不会实际构建任何数据结构。这一步用哪种算法通常取决于应用和上游的向量生成方式，常见的有 L2 归一化、[降维](https://zilliz.com/glossary/dimensionality-reduction)和零填充（zero padding）。大多数向量数据库会跳过这一步，把预处理完全留给用户在应用层完成。

主算法是唯一必需的组件，构成了向量索引的核心。这一步的输出应该是一个数据结构，保存着高效执行向量搜索所需的全部信息。这里常用基于树和基于图的数据结构，但量化算法或基于哈希的向量索引（例如乘积量化或局部敏感哈希）同样可行。在这一步中，索引的创建至关重要，选择合适的距离计算方法才能保证查询操作的性能。此外，'lists'、'probes'、'efConstruction'、'efSearch' 等关键参数在提升性能、控制内存占用方面作用显著。数据点的表示与组织，对于高效执行[k 近邻](https://zilliz.com/blog/k-nearest-neighbor-algorithm-for-machine-learning)搜索之类的操作同样不可或缺。

次级步骤通过把数据集中所有浮点值映射为低精度整数值（即 `float64` -> `int8` 或 `float32` -> `int8`）来缩减索引的总大小。这种修改既能缩小索引体积，又能提升搜索速度，但通常要付出一些精度的代价。具体做法有好几种；我们会在后续教程中深入量化与哈希。

在一头扎进更复杂的向量搜索算法之前，值得先花点时间看看*线性搜索*——它也被称为"Flat（暴力）"索引。

Flat 索引基本上是最基础的索引策略，但恐怕也是最被忽视的一种。使用 Flat 索引时，我们把查询向量与数据库中所有其他向量逐一比较。写成代码大概是这样：

```python
>>> query = np.random.normal(size=(128,))
>>> dataset = np.random.normal(size=(1000, 128))
>>> nearest = np.argmin(np.linalg.norm(dataset - query, axis=1))
>>> nearest
333
```

注意，这里的索引就是一个扁平的数据结构，大小恰好等于数据集——不多也不少。

头两行代码创建了一个随机查询向量，外加一个包含 1000 个向量的数据集。第三行接着计算数据集中所有元素与查询向量之间的距离（通过 **np.linalg.norm**），再提取距离最小值的索引（通过 **np.argmin**）。这样就得到了查询向量最近邻的数组索引，之后可以用 **dataset[nearest,:]** 把它取出来。

这显然是最朴素的向量搜索方式，但在小数据集上效果出奇地好，尤其是当你有 GPU 或 FPGA 之类的加速器可以并行化搜索过程时。比如上面那段循环，在 Intel i7-9750H CPU 上运行耗时不到 0.5 毫秒——这意味着在一颗六核笔记本 CPU 上用 Flat 索引就能做到超过 2000 的 QPS（每秒查询数）！

当向量数达到 1 万时，QPS 降到约 160；达到 10 万时，只剩 16——从 1000 到 1 万向量 QPS 下降超过 10 倍，很可能是受 CPU 缓存大小的限制。不过这些数字仍然相当不错。如今满世界都在谈运行时复杂度和水平扩展，但对于小应用和/或原型开发，别忘了[KISS 原则](https://en.wikipedia.org/wiki/KISS_principle)：Keep It Simple, Stupid（保持简单，别把事情搞复杂）。

Flat 索引固然好用，但显然没法扩展。这时，面向向量搜索的数据结构就派上用场了。用一点准确性/召回率换取更优的运行时间，我们就能显著提升查询速度和吞吐量。如今市面上的索引策略***多得很***，但最常用的之一是***倒排文件索引***（IVF）。

名字听着高大上，IVF 其实相当简单。倒排文件索引通过把整个数据集划分成多个分区来缩小总体搜索范围。所有分区都与一个*质心*相关联，数据集中的每个向量都会被分配到与其最近质心对应的分区。算法会尝试在查询向量所处的同一区域内定位最近的向量。

![A two-dimensional Voronoi diagram. Image by Balu Ertl, CC BY-SA 4.0.](/vector-db-images/vector-index-01.png)
二维 Voronoi 图。图片作者：Balu Ertl，CC BY-SA 4.0。

如果你熟悉 [FAISS](https://github.com/facebookresearch/faiss)，上面这张图你可能见过；它叫*Voronoi 图*，直观地展示了这种聚类索引的分配方式，只不过只画了两个维度。图中共有 20 个单元（簇），每个簇的质心用黑点标出。数据集中的所有点都会落入这 20 个区域之一。

簇的质心通常用一个叫*k 均值（k-means）*的聚类算法来确定。k-means 是一种迭代算法：先随机选取一组 `K` 个点作为簇；在每次迭代中，把向量数据集中的所有点分配给其最近的质心，然后所有质心更新为各簇的均值。如此往复直到收敛——熟悉统计学的朋友会认出来，这就是期望最大化（expectation-maximization）过程。

有了这些知识，我们就可以用 k-means 来"自动施魔法"般地为 IVF 确定质心。这里我们使用 scipy 的 `kmeans2` 实现：

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

现在，`centroids` 包含了数据集的全部 `num_part` 个质心（在 FAISS 中，这个参数叫 `nlist`），而 `assignments` 包含每个向量最近的质心/簇的 ID。我们可以这样验证：

```python
>>> test = [np.argmin(np.linalg.norm(vec - centroids, axis=1)) for vec in dataset]
>>> np.all(test == assignments)
True
```

接下来需要构建倒排文件索引：把每个质心与簇内向量列表关联起来：

```python
>>> index = [[] for _ in range(num_part)]
>>> for n, k in enumerate(assignments):
...     index[k].append(n)  # the nth vector gets added to the kth cluster
...
```

上面这段代码先创建了一个"列表的列表"，最外层对应倒排文件索引的分区数。然后 for 循环遍历所有分配结果（即每个向量属于哪个分区），把索引填充完整。

索引建好之后，我们就可以只搜索最近的簇，从而缩小总体搜索范围：

```python
>>> query = np.random.normal(size=(128,))
>>> c = np.argmin(np.linalg.norm(centroids - query, axis=1))  # find the nearest partition
>>> nearest = np.argmin(np.linalg.norm(dataset[index[c]] - query, axis=1))  # find nearest neighbor
>>> nearest
333
```

在 `num_part` 为 16、数据集大小为 10 万的情况下，用与之前相同的硬件（Intel i7-9750H CPU）可以得到约 150 QPS；把 `num_part` 提到 64，更是能拿到高达 650 QPS。

注意，把搜索范围扩展到最近的簇之外往往更实用，对高维数据尤其如此（熟悉 FAISS 的话会知道，这对应创建倒排文件索引时的 `nprobe` 参数）。这很大程度上要归因于[*维度灾难*](https://zilliz.com/glossary/curse-of-dimensionality-in-machine-learning)：与二维或三维中的类似数据相比，高维数据里每个分区的边数要多得多。`nprobe` 取多少合适并没有好的经验法则——不如先拿自己的数据做实验，看看速度与准确性/召回率之间的取舍。

倒排文件索引就讲到这里！还不赖，对吧？

在本篇教程中，我们分析了向量索引的三个组件，以及两种最常用的方法——Flat 索引和倒排文件索引。这是两种最基础的策略，我们将以它们为跳板，进一步深入更复杂的向量索引。

在下一篇教程中，我们将继续深入索引策略，讲解标量量化（SQ）与乘积量化（PQ）——两种深受 [Milvus](https://zilliz.com/what-is-milvus) 用户欢迎的量化策略。下篇教程见！

本教程的全部代码都在 Github 上免费开放：[https://github.com/fzliu/vector-search](https://github.com/fzliu/vector-search)。

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

## 常见索引方法

### Flat 索引

Flat 索引是一种简单直接的索引方法：向量原样存储，不做任何修改。它是最基础的索引策略，也是最常被忽视的一种。Flat 索引能提供完美的准确性，但速度慢，适合搜索速度尚可接受的小数据集。然而，随着数据集规模增大，Flat 索引会因搜索速度慢而变得不切实际。

在下一节中，我们将探索其他常见索引方法，包括局部敏感哈希（LSH）、倒排文件（IVF）和分层可导航小世界（HNSW）。这些方法在搜索速度与准确性之间做出权衡，适用于不同的使用场景和数据集规模。
