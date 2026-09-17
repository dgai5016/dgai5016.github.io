# 向量相似度搜索入门

在前几篇教程中，我们介绍了[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)、[向量数据库](https://zilliz.com/learn/what-is-vector-database)和 [Milvus](https://zilliz.com/learn/introduction-to-milvus-vector-database)——世界上最流行的、用于相似度搜索的[开源向量数据库](https://milvus.io/)。我们还简单提到了***嵌入向量***（embedding）这个概念：一种高维向量，可以充当[非结构化数据](https://zilliz.com/glossary/unstructured-data)极其出色的语义表示。有一个关键点要记住——彼此"接近"的嵌入向量与向量表示，代表的是语义上相似的数据。

在这篇向量搜索（又称相似度搜索）的入门介绍中，我们会先定义它是什么，并回答一些相关的基本问题。然后，我们会通过一个词嵌入示例在此基础上继续深入，看看语义相似的非结构化数据如何彼此"靠近"，而语义不相似的数据又如何彼此"远离"。由此，我们将自然过渡到对[***最近邻搜索***](https://zilliz.com/glossary/anns)的整体概览——这是一个计算问题，目标是基于统一的***距离度量***，找出离查询向量最近的那些向量。除了常用的***距离度量***，我们还会介绍几种知名的最近邻搜索方法（即向量相似度搜索算法），其中包括我的心头好——[ANNOY](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)。

我们开始吧。

## 什么是向量搜索或向量相似度搜索？

向量搜索（vector search），也称向量相似度搜索、最近邻搜索或[语义搜索](https://zilliz.com/glossary/semantic-search)，是数据检索与信息检索系统中使用的一种技术，用于找出与给定查询向量相似或密切相关的条目或数据点。传统的关键词搜索只能匹配完全一致的字词或短语，而语义搜索能理解查询背后的意图和上下文含义，因此即使内容中并未出现确切的关键词，它也能返回更相关的结果。在向量搜索中，我们把图像、文本、音频等数据点表示为高维空间中的向量。向量搜索的目标，就是高效地搜索并检索出与查询向量最相似、最接近的向量。

通常，我们会用欧氏距离、[余弦相似度](https://zilliz.com/blog/similarity-metrics-for-vector-search)等距离度量来衡量向量之间的相似程度。向量在向量空间中越接近，就越相似。为了高效地组织并呈现向量的搜索结果，向量搜索算法会使用树形结构或哈希技术等索引结构。

向量搜索是向量数据库的核心，应用十分广泛，包括推荐系统、图像与视频检索、自然语言处理、异常检测以及问答聊天机器人。借助语义搜索，我们可以在高维数据中找到相关的条目、模式或关系，从而实现更准确、更高效的信息检索。

向量搜索是从高维空间中分析和检索信息的强大方法。它让用户能够找到与给定查询相似或密切相关的条目，因此在诸多领域都至关重要。向量搜索的好处如下：

- **基于相似度的检索**——语义搜索支持基于相似度的检索，让用户能够找到与给定查询相似或密切相关的条目。这种能力在诸多领域至关重要，比如推荐系统——用户期望获得基于自身偏好或与其他用户相似度的个性化推荐。
- **高维数据分析**——随着图像、音频、文本等高维数据越来越容易获取，传统搜索方法的效果越来越力不从心。向量搜索为分析和检索高维空间中的信息提供了一条强大路径，让数据探索更准确、更高效。
- **最近邻搜索**——高效的最近邻搜索算法能找出离给定查询向量最近的邻居。最近邻搜索在图像或文档相似度搜索、基于内容的检索、异常检测等关键任务中非常实用，因为这些任务都需要找到最接近的匹配或相似的条目。
- **更好的用户体验**——借助语义搜索，应用可以给用户提供更相关、更个性化的结果。无论是推送相关推荐、检索视觉上相似的图片，还是查找内容相近的文档，向量搜索都能凭借更精准、更有意义的结果提升整体用户体验。
- **可扩展性**——向量搜索算法与索引结构能高效应对大规模数据集和高维空间，实现快速的搜索与检索操作，即使面对海量数据集，也能实时执行基于相似度的查询。

## 向量搜索引擎是如何工作的？

随着 AI 和大语言模型（LLM）的走红，各类开发者工具、搜索引擎和数据库都在给自己的功能清单加上向量搜索能力。也正因如此，"向量引擎""向量搜索引擎"这些说法经常与"向量数据库"混用。向量搜索引擎执行的是向量[语义 ](https://zilliz.com/glossary/semantic-similarity)搜索（有时就称作向量搜索）。向量搜索是这样一种技术：把数据集中的条目或数据点表示为高维空间中的向量，再据此找出相似的条目或数据点。每个条目都被映射为该空间中的一个点，向量的每个维度代表一个特定特征。向量搜索的过程包括索引、查询、排序和检索。

要执行向量搜索，首先要把数据条目表示成向量，例如对文本数据使用 Word2Vec 之类的技术。随后用索引数据结构高效地存储这些向量以便快速检索，可采用 KD 树或哈希表等方法。当用户提交查询条目时，系统会把它转换成向量表示，用余弦相似度或欧氏距离等相似度度量与已索引的向量进行比较，最后检索出最相似的条目并排序。

## 向量搜索的使用场景

- 图像、视频、音频相似度搜索
- AI 药物发现
- 语义搜索引擎
- DNA 序列分类
- 问答系统
- 推荐系统
- 异常检测
- 检索增强生成（RAG）

向量搜索的基础讲完了，接下来我们通过一个词嵌入示例深入技术细节，最后以最近邻搜索的整体概览收尾。

## 比较嵌入向量

一旦用户决定在自己的解决方案中构建向量搜索，下一个常问的问题就是"我该用什么机器学习模型来创建[向量嵌入](https://zilliz.com/glossary/vector-embeddings)？"在选择模型之前，先通过几个示例来理解嵌入向量非常重要。我们来看两个词嵌入示例。为了简单起见，我们使用 **word2vec**——一个有点年头、训练方法基于***跳元语法（skip-gram）***的模型。BERT 及其他基于 Transformer 的现代模型能提供上下文更丰富的词嵌入，但为了简便，我们还是用 **word2vec**。如果你想再多玩玩机器学习模型，Jay Alammar 写过一篇[很棒的 **word2vec** 教程](https://jalammar.github.io/illustrated-word2vec/)。

### 一些准备工作

开始之前，我们需要安装 `gensim` 库并加载一个 `word2vec` 模型。

```shell
% pip install gensim --disable-pip-version-check
% wget https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz
% gunzip GoogleNews-vectors-negative300.bin
```

```
Requirement already satisfied: gensim in /Users/fzliu/.pyenv/lib/python3.8/site-packages (4.1.2)
Requirement already satisfied: smart-open>=1.8.1 in /Users/fzliu/.pyenv/lib/python3.8/site-packages (from gensim) (5.2.1)
Requirement already satisfied: numpy>=1.17.0 in /Users/fzliu/.pyenv/lib/python3.8/site-packages (from gensim) (1.19.5)
Requirement already satisfied: scipy>=0.18.1 in /Users/fzliu/.pyenv/lib/python3.8/site-packages (from gensim) (1.7.3)
--2022-02-22 00:30:34--  https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz
Resolving s3.amazonaws.com (s3.amazonaws.com)... 52.216.20.165
Connecting to s3.amazonaws.com (s3.amazonaws.com)|52.216.20.165|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 1647046227 (1.5G) [application/x-gzip]
Saving to: GoogleNews-vectors-negative300.bin.gz

GoogleNews-vectors- 100%[===================>]   1.53G  2.66MB/s    in 11m 23s

2022-02-22 00:41:57 (2.30 MB/s) - GoogleNews-vectors-negative300.bin.gz saved [1647046227/1647046227]

gunzip: GoogleNews-vectors-negative300.bin: unknown suffix -- ignored
```

生成词向量嵌入所需的准备工作至此就绪，接下来加载训练好的 `word2vec` 模型。

```python
>>> from gensim.models import KeyedVectors
>>> model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
```

### 示例 0：马龙·白兰度（Marlon Brando）

来看看 `word2vec` 是如何理解著名演员马龙·白兰度的。

```python
>>> print(model.most_similar(positive=['Marlon_Brando']))
```

```
[('Brando', 0.757453978061676), ('Humphrey_Bogart', 0.6143958568572998), ('actor_Marlon_Brando', 0.6016287207603455), ('Al_Pacino', 0.5675410032272339), ('Elia_Kazan', 0.5594002604484558), ('Steve_McQueen', 0.5539456605911255), ('Marilyn_Monroe', 0.5512186884880066), ('Jack_Nicholson', 0.5440199375152588), ('Shelley_Winters', 0.5432392954826355), ('Apocalypse_Now', 0.5306933522224426)]
```

马龙·白兰度与阿尔·帕西诺合作过《教父》，与伊利亚·卡赞合作过《欲望号街车》，他还主演了《现代启示录》。

### 示例 1：如果所有国王的王后都坐上王位

向量之间可以相加减，以此展示底层的语义变化。

```python
>>> print(model.most_similar(positive=['king', 'woman'], negative=['man'], topn=1))
```

```
[('queen', 0.7118193507194519)]
```

谁说工程师就不能偶尔听听流行舞曲？

### 示例 2：Apple，公司、水果……还是两者皆是？

"apple" 这个词既可以指那家公司，也可以指那种可口的红色水果。在这个示例中，我们可以看到 Word2Vec 把两层含义都保留了下来。

```python
>>> print(model.most_similar(positive=['samsung', 'iphone'], negative=['apple'], topn=1))
>>> print(model.most_similar(positive=['fruit'], topn=10)[9:])
```

```
[('droid_x', 0.6324754953384399)]
[('apple', 0.6410146951675415)]
```

"Droid" 指三星的首款 4G LTE 智能手机（"Samsung" + "iPhone" - "Apple" = "Droid"），而 "apple" 是距离 "fruit" 第 10 近的词。

## 向量搜索策略

见识了嵌入向量的威力之后，我们来简单看几种执行最近邻搜索的方式。这份清单并不求全；我们只会快速过一遍几种常见方法，让大家对大规模场景下向量搜索如何进行有个整体认识。注意，这些方法并不互斥——例如，完全可以将量化与空间划分结合使用。

（后续教程也会逐一深入讲解这些方法，敬请期待。）

### 线性搜索

最简单但也最朴素的最近邻搜索算法，当属经典的线性搜索：把查询向量到[向量数据库](https://zilliz.com/learn/beginner-guide-to-implementing-vector-databases)中所有其他向量的距离都算一遍。

出于显而易见的原因，当向量数据库要扩展到数千万乃至数亿向量时，朴素搜索就行不通了。但如果数据库中的元素总数不多，它反而可能是执行向量搜索最高效的方式——既不需要为索引单独构建数据结构，插入和删除的实现也相当容易。

由于朴素搜索没有额外的空间复杂度、也不会带来恒定的空间开销，即使在中等规模的向量集上查询，它的表现也常常胜过空间划分。

### 空间划分

空间划分不是单一的算法，而是一族算法，它们都基于同一个思想。

K 维树（kd-tree）也许是这一族中最有名的，其工作方式类似二叉搜索树：不断地将搜索空间一分为二（把向量分进"左""右"两个桶）。

倒排文件索引（IVF）也是空间划分的一种形式，其做法是把每个向量分配给离它最近的质心——搜索时先确定查询向量最近的质心，再在该质心附近展开搜索，从而大幅减少需要搜索的向量总数。IVF 是相当流行的索引策略，常与其他索引算法组合使用以提升性能。

### 量化

量化是一类通过降低向量精度来缩减数据库总大小的技术。

例如，标量量化（SQ）的做法是：将高精度浮点向量乘以一个标量值，再把结果向量的各元素转换为最接近的整数。这不仅能缩小整个数据库的有效体积（例如从 **float64_t** 转换为 **int8_t**，体积可缩小为原来的 1/8），还附带一个正面效应——[向量间距离](https://zilliz.com/glossary/vector-distance)的计算速度也会随之加快。

乘积量化（PQ）是另一种量化技术，原理类似字典压缩。在 PQ 中，所有向量都会被切分成大小相同的子向量，然后每个子向量都用一个质心来替换。

### 分层可导航小世界（HNSW）

分层可导航小世界（HNSW）是一种基于图的索引与检索算法。

它的工作方式与乘积量化不同：HNSW 不是通过缩小数据库的有效体积来提升可搜索性，而是从原始数据构建一个多层图。上层只包含"长连接"，下层只包含数据库中向量之间的"短连接"（向量距离度量的概览见下一节）。图中单条连接的建立方式则神似跳表（skip list）。

有了这样的架构，搜索就变得相当直白——我们先在最顶层图（向量间连接最长的那一层）上贪心地做图遍历，寻找离查询向量最近的向量；然后在第二层如法炮制，把第一层搜索的结果作为起点。如此往复，直到在最底层完成搜索，其结果便是查询向量的最近邻。

![HNSW, visualized. Image source: https://arxiv.org/abs/1603.09320](/vector-db-images/vector-similarity-search-01.png)
HNSW 可视化。图片来源：https://arxiv.org/abs/1603.09320

### [近似最近邻，噢耶（Approximate Nearest Neighbors Oh Yeah）](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)

这大概是我最喜欢的 ANN 算法了，纯粹因为这个名字既俏皮又不按常理出牌。[Approximate Nearest Neighbors Oh Yeah](https://github.com/spotify/annoy)（ANNOY）是一种基于树的算法，由 Spotify 发扬光大（用在它们的音乐推荐系统里）。名字虽然古怪，ANNOY 背后的概念其实相当简单——二叉树。

ANNOY 的做法是：先从数据库中随机选出两个向量，沿着分隔这两个向量的超平面把搜索空间一分为二；如此迭代，直到每个节点中的元素少于预定义参数 **NUM_MAX_ELEMS**。由于最终得到的索引本质上就是一棵二叉树，我们可以用 O(log n) 的复杂度完成搜索。

![ANNOY, visualized. Image source: https://github.com/spotify/annoy](/vector-db-images/vector-similarity-search-02.png)
ANNOY 可视化。图片来源：https://github.com/spotify/annoy

## 常用的相似度度量

再棒的[向量数据库](https://zilliz.com/)，离开相似度度量也无用武之地——相似度度量是计算两个向量之间距离的方法。度量方式数不胜数，这里我们只讨论最常用的那一部分。

### 浮点向量相似度度量

最常见的浮点向量相似度度量（排名不分先后）是 *L1 距离*、*L2 距离*和*余弦相似度*。前两者是*距离度量*（值越小越相似，值越大越不相似），而余弦相似度是*相似度度量*（值越大越相似）。

1. $$d_{l1}(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}|\mathbf{a}_i-\mathbf{b}_i|$$
2. $$d_{l2}(\mathbf{a},\mathbf{b})=\sqrt{\sum_{i=1}^{N}(\mathbf{a}_i-\mathbf{b}_i)^2}$$
3. $$d_{cos}(\mathbf{a},\mathbf{b})=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$$

L1 距离也常被称为曼哈顿距离，这个名字起得很贴切：在曼哈顿，从 A 点到 B 点只能沿着两个互相垂直的方向移动。第二个公式是 L2 距离，就是两个向量在欧氏空间中的距离。第三个也是最后一个公式是余弦距离，等于两个向量夹角的余弦值。注意，余弦相似度的公式展开后，恰好是输入向量 **a** 与 **b** 归一化后的点积。

稍作推导，我们还能证明：在对单位范数向量做相似度排序时，L2 距离和余弦相似度实际上是等价的：

$$d_{l2}(\mathbf{a},\mathbf{b})=(\mathbf{a}-\mathbf{b})^T(\mathbf{a}-\mathbf{b})$$
$$=\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$

回想一下，单位范数向量的模长为 1：

$$\mathbf{a}^T\mathbf{a}=1$$

由此可得：

$$\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$
$$=2-2\mathbf{a}^T\mathbf{b}$$

既然是单位范数向量，余弦距离就等于 **a** 与 **b** 的点积（上面公式 3 的分母恰好为 1）：

$$2-2\mathbf{a}^T\mathbf{b}$$
$$=2(1-d_{cos}(\mathbf{a},\mathbf{b}))$$

本质上，对于单位范数向量，L2 距离与余弦相似度在功能上是等价的！所以，永远记得对你的嵌入向量做归一化。

### 二进制向量相似度度量

顾名思义，二进制向量并没有浮点向量那样基于算术的度量。二进制向量的相似度度量依赖的是集合数学、位操作，或两者的组合（没关系，我也讨厌离散数学）。下面是两个常用二进制向量相似度度量的公式：

1. $$d_J(\mathbf{a},\mathbf{b})=1-\frac{\mathbf{a}\cdot\mathbf{b}}{|a|^2+|b|^2-\mathbf{a}\cdot\mathbf{b}}$$
2. $$d_J(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}\mathbf{a}_i\oplus\mathbf{b}_i$$

第一个公式叫 Tanimoto/Jaccard 距离，本质上衡量的是两个二进制向量之间的重叠程度。第二个公式是汉明距离（Hamming distance），统计的是 a 与 b 中彼此不同的向量元素的个数。

这两个相似度度量你大概率可以放心忽略，因为大多数应用都是在浮点嵌入向量上使用余弦相似度。

## 结语

在本篇教程中，我们了解了向量搜索，以及一些常见的向量搜索算法和距离度量。关键要点如下：

- 嵌入向量是非常强大的表示方式，这既体现在向量之间的距离上，也体现在向量运算上。只要对嵌入向量大胆施展向量代数，我们仅凭基本的数学运算符就能完成可扩展的语义分析。
- [语义向量搜索](https://zilliz.com/vector-database-use-cases/semantic-search)让你能够基于查询的含义进行搜索，从而克服了关键词搜索的局限。它通过执行向量搜索，实现答案的快速检索。
- 近似最近邻搜索算法和索引类型的选择非常丰富。如今最常用的是 HNSW，但就你的特定应用而言，别的索引算法可能效果更好——这取决于你拥有的嵌入向量总数，以及每个向量的长度。
- 当今两大主流距离度量是 L2/欧氏距离和余弦距离。这两种度量用在归一化的嵌入向量上时，功能上是等价的。

感谢你学完本篇教程！向量搜索是 [Milvus](https://zilliz.com/what-is-milvus) 的核心，未来也将一直是。在后续教程中，我们将深入探讨最常用的 ANNS 算法——HNSW 和 ScaNN。
