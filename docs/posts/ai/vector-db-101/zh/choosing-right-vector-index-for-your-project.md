# 为你的项目选择合适的向量索引

## 快速回顾

在[《Vector Database 101》系列](https://zilliz.com/blog?tag=39&page=1)中，我们已经了解到：[向量数据库](https://zilliz.com/learn/what-is-vector-database)是专门构建的数据库，用于在高维向量的大型数据集（通常超过 96 维，有时超过 1 万维）上执行[近似最近邻搜索（ANN）](https://zilliz.com/glossary/anns)。这些向量用来表示[非结构化数据](https://zilliz.com/glossary/unstructured-data)的语义，也就是那些无法装进传统数据库——比如关系数据库、宽列存储或文档数据库——的数据。

要高效地执行[相似性搜索](https://zilliz.com/learn/vector-similarity-search)，需要一种称为向量索引的数据结构。这类索引让我们能够高效地遍历整个数据库，而不必对每个向量都做暴力搜索。在你的向量搜索之旅上，有不少内存向量搜索算法和索引策略可供选用。下面快速逐一介绍：

### 暴力搜索（`FLAT`）

暴力搜索，也叫 Flat 索引，是一种把查询向量与数据库中其他所有向量逐一比较的方法。它看起来也许朴素又低效，但对小型数据集来说，Flat 索引的效果出奇地好，尤其是在用 GPU 或 FPGA 等加速器做并行化之后。

![Flat visualized](/vector-db-images/choosing-right-vector-index-for-your-project-01.png)
Flat 索引可视化

### 倒排文件索引（`IVF`）

[IVF](https://zilliz.com/learn/vector-index) 是一种基于分区的索引策略，它把数据库中的所有向量分配到质心最近的那个分区。聚类质心通过无监督聚类（通常是 k-means）来确定。有了质心和分配结果，我们就可以创建一个[倒排索引](https://zilliz.com/glossary/inverted-index)，把每个质心与它所在聚类中的向量列表关联起来。对于中小型数据集，IVF 通常是个稳妥的选择。

![A two-dimensional Voronoi diagram. Image by Balu Ertl](/vector-db-images/choosing-right-vector-index-for-your-project-02.png)
二维 Voronoi 图。图片：Balu Ertl

### 标量量化（`SQ`）

[标量量化](https://zilliz.com/learn/scalar-quantization-and-product-quantization)通过把每个维度划分成若干桶，把浮点向量（通常是 `float32` 或 `float64`）转换为整型向量。这个过程包括：

- 确定每个维度的最大值和最小值。
- 计算起始值和步长。
- 通过减去起始值再除以步长来执行量化。

量化后的数据集通常使用 8 位无符号整数，但更低的位数（5 位、4 位甚至 2 位）也很常见。

### 乘积量化（`PQ`）

标量量化忽略了向量各维度上的分布情况，可能导致某些桶没有被充分利用。[乘积量化](https://zilliz.com/learn/scalar-quantization-and-product-quantization)（PQ）是一种更强大的替代方案，能同时完成压缩和降维：把高维向量映射为低维量化向量，将原始向量中固定长度的分块对应到一个单独的量化值。`PQ` 的典型流程是切分向量、对所有切分块应用 k-means 聚类，再转换成质心索引。

![PQ, visualized](/vector-db-images/choosing-right-vector-index-for-your-project-03.png)
PQ 可视化

### 分层可导航小世界（`HNSW`）

[HNSW](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW) 是当今最常用的向量索引策略。它结合了两个概念：跳表和可导航小世界（NSW）。跳表本质上是一种分层链表，能加快随机访问（跳表为 `O(log n)`，链表为 `O(n)`）。在 HNSW 中，我们构建一个由 NSW 组成的分层图。搜索时，从最顶层出发，在每一层向最近的邻居移动，直到找到最接近的匹配。插入的原理则是先找到最近的邻居，再添加连接。

![HNSW, visualized. Credit: Yu. A. Malkov & D. A. Yashunin](/vector-db-images/choosing-right-vector-index-for-your-project-04.png)
HNSW 可视化。图片来源：Yu. A. Malkov & D. A. Yashunin

### 近似最近邻哦耶（`Annoy`）

[Annoy](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY) 是一种基于树的索引，以二叉搜索树为核心数据结构。它递归地划分向量空间来构建二叉树，每个节点都被一个超平面切分，该超平面与两个随机选取的子节点向量等距。切分过程不断持续，直到叶节点中的元素少于预设的数量。查询则是沿树迭代下行，判断查询向量落在超平面的哪一侧。

![Annoy, visualized](/vector-db-images/choosing-right-vector-index-for-your-project-05.png)
Annoy 可视化

如果这些小结让你觉得有点晦涩，别担心。向量搜索算法可能相当复杂，但配上可视化和一点代码，往往就容易解释多了。

## 挑选向量索引

那么，到底该如何选择合适的向量索引呢？这是个相当开放的问题，但有一条关键原则要记住：合适的索引取决于你的应用需求。比如：你主要在意查询速度（数据库相对静态），还是你的应用会频繁插入和删除数据？你的机器类型有没有什么限制，比如内存或 CPU 有限？又或者，你要插入的数据所属的领域会随时间变化？所有这些因素都会影响到最优索引类型的选择。

下面这些参考指南，可以帮你为项目选择合适的索引类型：

100% 召回率：这一条相当简单——如果你需要 100% 的准确率，就用 `FLAT` 搜索。所有高效的向量搜索数据结构执行的都是*近似*最近邻搜索，这意味着一旦索引规模超过某个阈值，召回率就必然有所损失。

`index_size` < 10MB：如果你的索引总规模很小（少于 5k 个 512 维 `float32` 向量），直接用 `FLAT` 搜索就好。对于这么小的数据集，索引构建、维护和查询带来的开销根本不值当。

**10MB < `index_size` < 2GB**：如果你的索引总规模较小（少于 100 万个 512 维 `float32` 向量），我的建议是使用标准的倒排文件索引（例如 `IVF`）。倒排文件索引能把搜索范围缩小大约一个数量级，同时还能保持相当高的召回率。

**2GB < `index_size` < 20GB**：到了中等规模的索引（少于 1000 万个 512 维 `float32` 向量），你就该开始考虑 `PQ` 和 `HNSW` 这类索引类型了。两者都能提供合理的查询速度和吞吐量，不过 `PQ` 让你以明显更低的召回率为代价换取显著更少的内存，而 `HNSW` 常常能给你 95% 以上的召回率，代价是高内存占用——大约是索引总大小的 1.5 倍。对于这个规模区间的数据集，复合 `IVF` 索引（`IVF_SQ`、`IVF_PQ`）也能有不错的表现，但我只会在计算资源有限的情况下才使用它们。

**20GB < `index_size` < 200GB**：对于大型数据集（少于 1 亿个 512 维 `float32` 向量），我推荐使用*复合索引*：内存受限的应用用 `IVF_PQ`，需要高召回率的应用用 `HNSW_SQ`。复合索引是一种把多种向量搜索策略组合进单个索引的索引技术。这种技术能有效地兼具两种索引的优点；比如 `HNSW_SQ`，既保留了 `HNSW` 大部分的基础查询速度和吞吐量，又大幅缩小了索引规模。复合索引这里就不深入展开了，感兴趣的读者可以看看 [FAISS 的文档](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes-(composite)，其中有很棒的概览。

关于 Annoy 最后补一句——我们不推荐使用它。因为它和 HNSW 属于类似的类别，而总体来说，它的性能要差一些。不过 Annoy 是名字起得最别具一格的索引，光凭这一点就可以给它加分了。

## 关于磁盘索引的几句话

这篇博文里还没有明确深入探讨过的另一类选择，是基于磁盘的索引。简而言之，基于磁盘的索引利用了 NVMe 磁盘的架构特点，把各个搜索子空间分别放进它们自己的 NVMe 页。再加上零寻道延迟，这种方式可以高效地存储基于图和基于树的向量索引。

这类索引正变得越来越流行，因为它们能在单台机器上存储并检索数十亿个向量，同时保持合理的性能水平。基于磁盘的索引的缺点也很明显：磁盘读取比内存读取慢得多，所以这类索引的查询延迟常常会增加，有时甚至会超过 10 倍！如果你愿意牺牲延迟和吞吐量，换取以最低成本存储数十亿个向量的能力，那基于磁盘的索引就是正解。反过来，如果你的应用需要高性能（往往要以更高的计算成本为代价），那就继续用 `IVF_PQ` 或 `HNSW_SQ` 吧。

## 结语

在这篇文章里，我们介绍了目前可用的一些向量索引策略。结合你的数据规模和算力限制，我们提供了一个简单的流程图来帮助确定最优策略。请注意，这个流程图只是一份通用指南，不是铁律。归根结底，你需要理解每种索引选项的优缺点，以及复合索引能否帮你压榨出应用所需的那最后一丝性能。所有这些索引类型在 Milvus 中都可以免费使用，你尽可以按自己的想法去实验。放手去试吧！
