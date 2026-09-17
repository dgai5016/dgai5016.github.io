<BiRow>
<template #en>

In the previous tutorials, we took a look at [unstructured data](https://zilliz.com/learn/introduction-to-unstructured-data), [vector databases](https://zilliz.com/learn/what-is-vector-database), and [Milvus](https://zilliz.com/learn/introduction-to-milvus-vector-database) - the world's most popular [open-source vector database](https://milvus.io/) used for similarity search. We also briefly touched upon the idea of ***embeddings***, high-dimensional vectors which serve as awesome semantic representations of [unstructured data](https://zilliz.com/glossary/unstructured-data). One key note to remember - embeddings and vector representations which are "close" to one another represent semantically similar pieces of data.

</template>
<template #zh>

在前几篇教程中，我们介绍了[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)、[向量数据库](https://zilliz.com/learn/what-is-vector-database)和 [Milvus](https://zilliz.com/learn/introduction-to-milvus-vector-database)——世界上最流行的、用于相似度搜索的[开源向量数据库](https://milvus.io/)。我们还简单提到了***嵌入向量***（embedding）这个概念：一种高维向量，可以充当[非结构化数据](https://zilliz.com/glossary/unstructured-data)极其出色的语义表示。有一个关键点要记住——彼此"接近"的嵌入向量与向量表示，代表的是语义上相似的数据。

</template>
</BiRow>

<BiRow>
<template #en>

In this introduction to vector search (aka similarity search), we'll define what it is, and answer some fundamental questions about it. Then, we will build on that knowledge by going over a word embedding example and seeing how semantically similar pieces of unstructured data are "near" one another while dissimilar pieces of unstructured data are "far" from one another. This will lead into a high-level overview of [***nearest neighbor search***](https://zilliz.com/glossary/anns), a computing problem that involves finding the closest vector(s) to a query vector based on a unified ***distance metric***. We'll go over some well-known methods (vector similarity search algorithms) for nearest neighbor search (including my favorite - [ANNOY](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)) in addition to commonly used ***distance metrics***.

</template>
<template #zh>

在这篇向量搜索（又称相似度搜索）的入门介绍中，我们会先定义它是什么，并回答一些相关的基本问题。然后，我们会通过一个词嵌入示例在此基础上继续深入，看看语义相似的非结构化数据如何彼此"靠近"，而语义不相似的数据又如何彼此"远离"。由此，我们将自然过渡到对[***最近邻搜索***](https://zilliz.com/glossary/anns)的整体概览——这是一个计算问题，目标是基于统一的***距离度量***，找出离查询向量最近的那些向量。除了常用的***距离度量***，我们还会介绍几种知名的最近邻搜索方法（即向量相似度搜索算法），其中包括我的心头好——[ANNOY](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)。

</template>
</BiRow>

<BiRow>
<template #en>

Let's dive in.

</template>
<template #zh>

我们开始吧。

</template>
</BiRow>

<BiRow>
<template #en>

## What is Vector Search or Vector Similarity Search?

</template>
<template #zh>

## 什么是向量搜索或向量相似度搜索？

</template>
</BiRow>

<BiRow>
<template #en>

Vector search, also known as vector similarity search or nearest neighbor search or [semantic search](https://zilliz.com/glossary/semantic-search), is a technique used in data retrieval and information retrieval systems to find items or data points that are similar or closely related to a given query vector. Unlike traditional keyword search which matches exact words or phrases, semantic search understands the intent and contextual meaning behind a query, allowing it to return more relevant results even when the exact keywords are not present in the content. In vector search, we represent data points, such as images, texts, and audio, as vectors in a high-dimensional space. The goal of vector search is to efficiently search and retrieve the most relevant vectors that are similar or nearest to a query vector.

</template>
<template #zh>

向量搜索（vector search），也称向量相似度搜索、最近邻搜索或[语义搜索](https://zilliz.com/glossary/semantic-search)，是数据检索与信息检索系统中使用的一种技术，用于找出与给定查询向量相似或密切相关的条目或数据点。传统的关键词搜索只能匹配完全一致的字词或短语，而语义搜索能理解查询背后的意图和上下文含义，因此即使内容中并未出现确切的关键词，它也能返回更相关的结果。在向量搜索中，我们把图像、文本、音频等数据点表示为高维空间中的向量。向量搜索的目标，就是高效地搜索并检索出与查询向量最相似、最接近的向量。

</template>
</BiRow>

<BiRow>
<template #en>

Typically, distance metrics such as Euclidean distance or [cosine similarity](https://zilliz.com/blog/similarity-metrics-for-vector-search) measure the similarity between vectors. The vector's proximity in the vector space determines how similar it is. To efficiently organize and show search results for vectors, vector search algorithms use indexing structures such as tree-based structures or hashing techniques.

</template>
<template #zh>

通常，我们会用欧氏距离、[余弦相似度](https://zilliz.com/blog/similarity-metrics-for-vector-search)等距离度量来衡量向量之间的相似程度。向量在向量空间中越接近，就越相似。为了高效地组织并呈现向量的搜索结果，向量搜索算法会使用树形结构或哈希技术等索引结构。

</template>
</BiRow>

<BiRow>
<template #en>

Vector search is central to vector databases and has various applications, including recommendation systems, image and video retrieval, natural language processing, anomaly detection, and question and answer chatbots. Using semantic search makes it possible to find relevant items, patterns, or relationships within high-dimensional data, enabling more accurate and efficient information retrieval.

</template>
<template #zh>

向量搜索是向量数据库的核心，应用十分广泛，包括推荐系统、图像与视频检索、自然语言处理、异常检测以及问答聊天机器人。借助语义搜索，我们可以在高维数据中找到相关的条目、模式或关系，从而实现更准确、更高效的信息检索。

</template>
</BiRow>

<BiRow>
<template #en>

Vector search is a powerful method for analyzing and retrieving information from high-dimensional spaces. It enables users to find similar or closely related items to a given query, making it crucial in various domains. Here are the benefits of vector search:

</template>
<template #zh>

向量搜索是从高维空间中分析和检索信息的强大方法。它让用户能够找到与给定查询相似或密切相关的条目，因此在诸多领域都至关重要。向量搜索的好处如下：

</template>
</BiRow>

<BiRow>
<template #en>

- **Similarity-based Retrieval**— Semantic search allows for similarity-based Retrieval, enabling users to find similar or closely related items to a given query. Similarity-based Retrieval is crucial in various domains, such as recommendation systems, where users expect personalized recommendations based on their preferences or similarities to other users.
- **High-dimensional Data Analysis** — With the increasing availability of high-dimensional data, such as images, audio, and textual data, traditional search methods become less effective. Vector search provides a powerful way to analyze and retrieve information from high-dimensional spaces, allowing for more accurate and efficient data exploration.
- **Nearest-Neighbor Search** — Efficient nearest-neighbor search algorithms find the nearest neighbors to a given query vector. Nearest-neighbor search is handy for critical tasks such as an image or document similarity search, content-based Retrieval, or anomaly detection that require finding the closest matches or similar items.
- **Improved User Experience**— By leveraging semantic search, applications can provide users with more relevant and personalized results. Whether delivering relevant recommendations, retrieving visually similar images, or finding documents with similar content, vector search enhances the overall user experience by providing more targeted and meaningful results.
- **Scalability** — Vector search algorithms and indexing structures handle large-scale datasets and high-dimensional spaces efficiently. They enable fast search and retrieval operations, making it feasible to perform similarity-based queries in real-time, even on massive datasets.

</template>
<template #zh>

- **基于相似度的检索**——语义搜索支持基于相似度的检索，让用户能够找到与给定查询相似或密切相关的条目。这种能力在诸多领域至关重要，比如推荐系统——用户期望获得基于自身偏好或与其他用户相似度的个性化推荐。
- **高维数据分析**——随着图像、音频、文本等高维数据越来越容易获取，传统搜索方法的效果越来越力不从心。向量搜索为分析和检索高维空间中的信息提供了一条强大路径，让数据探索更准确、更高效。
- **最近邻搜索**——高效的最近邻搜索算法能找出离给定查询向量最近的邻居。最近邻搜索在图像或文档相似度搜索、基于内容的检索、异常检测等关键任务中非常实用，因为这些任务都需要找到最接近的匹配或相似的条目。
- **更好的用户体验**——借助语义搜索，应用可以给用户提供更相关、更个性化的结果。无论是推送相关推荐、检索视觉上相似的图片，还是查找内容相近的文档，向量搜索都能凭借更精准、更有意义的结果提升整体用户体验。
- **可扩展性**——向量搜索算法与索引结构能高效应对大规模数据集和高维空间，实现快速的搜索与检索操作，即使面对海量数据集，也能实时执行基于相似度的查询。

</template>
</BiRow>

<BiRow>
<template #en>

## How Does a Vector Search Engine Work?

</template>
<template #zh>

## 向量搜索引擎是如何工作的？

</template>
</BiRow>

<BiRow>
<template #en>

With the popularity of AI and LLMs, every developer tool, search engine, and database is adding vector search capabilities to their feature set, and due to this, the term vector engine and Vector Search Engines are often used interchangeably with Vector Databases. Vector Search Engines will conduct a Vector [semantic ](https://zilliz.com/glossary/semantic-similarity)search (sometimes referred to as Vector Search). Vector search is a technique for finding similar items or data points in a dataset based on their representation as vectors in a high-dimensional space. Each item is mapped to a point in this space, with each vector dimension representing a specific feature. The vector search process involves indexing, querying, ranking, and retrieval.

</template>
<template #zh>

随着 AI 和大语言模型（LLM）的走红，各类开发者工具、搜索引擎和数据库都在给自己的功能清单加上向量搜索能力。也正因如此，"向量引擎""向量搜索引擎"这些说法经常与"向量数据库"混用。向量搜索引擎执行的是向量[语义 ](https://zilliz.com/glossary/semantic-similarity)搜索（有时就称作向量搜索）。向量搜索是这样一种技术：把数据集中的条目或数据点表示为高维空间中的向量，再据此找出相似的条目或数据点。每个条目都被映射为该空间中的一个点，向量的每个维度代表一个特定特征。向量搜索的过程包括索引、查询、排序和检索。

</template>
</BiRow>

<BiRow>
<template #en>

To perform vector search, you first represent your data items as vectors, using techniques like Word2Vec or for text data. An index data structure efficiently stores these vectors for quick retrieval, using methods like KD-trees or hash tables. When a user submits a query item, it's converted into a vector representation, compared to the indexed vectors using similarity metrics like cosine similarity or Euclidean distance, and the most similar items are retrieved and ranked.

</template>
<template #zh>

要执行向量搜索，首先要把数据条目表示成向量，例如对文本数据使用 Word2Vec 之类的技术。随后用索引数据结构高效地存储这些向量以便快速检索，可采用 KD 树或哈希表等方法。当用户提交查询条目时，系统会把它转换成向量表示，用余弦相似度或欧氏距离等相似度度量与已索引的向量进行比较，最后检索出最相似的条目并排序。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector Search Use Cases

</template>
<template #zh>

## 向量搜索的使用场景

</template>
</BiRow>

<BiRow>
<template #en>

- Image, video, audio similarity search
- AI drug discovery
- Semantic search engine
- DNA sequence classification
- Question answering system
- Recommender system
- Anomaly detection
- Retrieval Augmented Generation (RAG)

</template>
<template #zh>

- 图像、视频、音频相似度搜索
- AI 药物发现
- 语义搜索引擎
- DNA 序列分类
- 问答系统
- 推荐系统
- 异常检测
- 检索增强生成（RAG）

</template>
</BiRow>

<BiRow>
<template #en>

Now that we have covered the basics of vector search, let’s look into the more technical details by looking at a word embedding example and finish with a high-level overview of nearest neighbor search.

</template>
<template #zh>

向量搜索的基础讲完了，接下来我们通过一个词嵌入示例深入技术细节，最后以最近邻搜索的整体概览收尾。

</template>
</BiRow>

<BiRow>
<template #en>

## Comparing embeddings

</template>
<template #zh>

## 比较嵌入向量

</template>
</BiRow>

<BiRow>
<template #en>

Once users decide they want to embark on building Vector search in their solution, the next question they often ask is “What Machine Learning Model should I use to create [Vector Embeddings](https://zilliz.com/glossary/vector-embeddings).” Before you can choose a model, it is important to understand vector embeddings by comparing a few examples. Let's go through a couple of word embedding examples. For the sake of simplicity, we'll use **word2vec**, an old model which uses a training methodology based on ***skipgrams***. BERT and other modern transformer-based models will be able to provide you with more contextualized word embeddings, but we'll stick with **word2vec** for simplicity. Jay Alammar provides a [great tutorial on **word2vec**](https://jalammar.github.io/illustrated-word2vec/), if you're interested in using machine learning models a bit more.

</template>
<template #zh>

一旦用户决定在自己的解决方案中构建向量搜索，下一个常问的问题就是"我该用什么机器学习模型来创建[向量嵌入](https://zilliz.com/glossary/vector-embeddings)？"在选择模型之前，先通过几个示例来理解嵌入向量非常重要。我们来看两个词嵌入示例。为了简单起见，我们使用 **word2vec**——一个有点年头、训练方法基于***跳元语法（skip-gram）***的模型。BERT 及其他基于 Transformer 的现代模型能提供上下文更丰富的词嵌入，但为了简便，我们还是用 **word2vec**。如果你想再多玩玩机器学习模型，Jay Alammar 写过一篇[很棒的 **word2vec** 教程](https://jalammar.github.io/illustrated-word2vec/)。

</template>
</BiRow>

<BiRow>
<template #en>

### Some prep work

</template>
<template #zh>

### 一些准备工作

</template>
</BiRow>

<BiRow>
<template #en>

Before beginning, we'll need to install the `gensim` library and load a `word2vec` model.

</template>
<template #zh>

开始之前，我们需要安装 `gensim` 库并加载一个 `word2vec` 模型。

</template>
</BiRow>

<BiRow>
<template #en>

```shell
% pip install gensim --disable-pip-version-check
% wget https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz
% gunzip GoogleNews-vectors-negative300.bin
```

</template>
<template #zh>

```shell
% pip install gensim --disable-pip-version-check
% wget https://s3.amazonaws.com/dl4j-distribution/GoogleNews-vectors-negative300.bin.gz
% gunzip GoogleNews-vectors-negative300.bin
```

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Now that we've done all the prep work required to generate word-to-vector embeddings, let's load the trained `word2vec` model.

</template>
<template #zh>

生成词向量嵌入所需的准备工作至此就绪，接下来加载训练好的 `word2vec` 模型。

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> from gensim.models import KeyedVectors
>>> model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
```

</template>
<template #zh>

```python
>>> from gensim.models import KeyedVectors
>>> model = KeyedVectors.load_word2vec_format('GoogleNews-vectors-negative300.bin', binary=True)
```

</template>
</BiRow>

<BiRow>
<template #en>

### Example 0: Marlon Brando

</template>
<template #zh>

### 示例 0：马龙·白兰度（Marlon Brando）

</template>
</BiRow>

<BiRow>
<template #en>

Let's take a look at how `word2vec` interprets the famous actor Marlon Brando.

</template>
<template #zh>

来看看 `word2vec` 是如何理解著名演员马龙·白兰度的。

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> print(model.most_similar(positive=['Marlon_Brando']))
```

</template>
<template #zh>

```python
>>> print(model.most_similar(positive=['Marlon_Brando']))
```

</template>
</BiRow>

<BiRow>
<template #en>

```
[('Brando', 0.757453978061676), ('Humphrey_Bogart', 0.6143958568572998), ('actor_Marlon_Brando', 0.6016287207603455), ('Al_Pacino', 0.5675410032272339), ('Elia_Kazan', 0.5594002604484558), ('Steve_McQueen', 0.5539456605911255), ('Marilyn_Monroe', 0.5512186884880066), ('Jack_Nicholson', 0.5440199375152588), ('Shelley_Winters', 0.5432392954826355), ('Apocalypse_Now', 0.5306933522224426)]
```

</template>
<template #zh>

```
[('Brando', 0.757453978061676), ('Humphrey_Bogart', 0.6143958568572998), ('actor_Marlon_Brando', 0.6016287207603455), ('Al_Pacino', 0.5675410032272339), ('Elia_Kazan', 0.5594002604484558), ('Steve_McQueen', 0.5539456605911255), ('Marilyn_Monroe', 0.5512186884880066), ('Jack_Nicholson', 0.5440199375152588), ('Shelley_Winters', 0.5432392954826355), ('Apocalypse_Now', 0.5306933522224426)]
```

</template>
</BiRow>

<BiRow>
<template #en>

Marlon Brando worked with Al Pacino in The Godfather and Elia Kazan in A Streetcar Named Desire. He also starred in Apocalypse Now.

</template>
<template #zh>

马龙·白兰度与阿尔·帕西诺合作过《教父》，与伊利亚·卡赞合作过《欲望号街车》，他还主演了《现代启示录》。

</template>
</BiRow>

<BiRow>
<template #en>

### Example 1: If all of the kings had their queens on the throne

</template>
<template #zh>

### 示例 1：如果所有国王的王后都坐上王位

</template>
</BiRow>

<BiRow>
<template #en>

Vectors can be added and subtracted from each other to demo underlying semantic changes.

</template>
<template #zh>

向量之间可以相加减，以此展示底层的语义变化。

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> print(model.most_similar(positive=['king', 'woman'], negative=['man'], topn=1))
```

</template>
<template #zh>

```python
>>> print(model.most_similar(positive=['king', 'woman'], negative=['man'], topn=1))
```

</template>
</BiRow>

<BiRow>
<template #en>

```
[('queen', 0.7118193507194519)]
```

</template>
<template #zh>

```
[('queen', 0.7118193507194519)]
```

</template>
</BiRow>

<BiRow>
<template #en>

Who says engineers can't enjoy a bit of dance-pop now and then?

</template>
<template #zh>

谁说工程师就不能偶尔听听流行舞曲？

</template>
</BiRow>

<BiRow>
<template #en>

### Example 2: Apple, the company, the fruit, ... or both?

</template>
<template #zh>

### 示例 2：Apple，公司、水果……还是两者皆是？

</template>
</BiRow>

<BiRow>
<template #en>

The word "apple" can refer to both the company as well as the delicious red fruit. In this example, we can see that Word2Vec retains both meanings.

</template>
<template #zh>

"apple" 这个词既可以指那家公司，也可以指那种可口的红色水果。在这个示例中，我们可以看到 Word2Vec 把两层含义都保留了下来。

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> print(model.most_similar(positive=['samsung', 'iphone'], negative=['apple'], topn=1))
>>> print(model.most_similar(positive=['fruit'], topn=10)[9:])
```

</template>
<template #zh>

```python
>>> print(model.most_similar(positive=['samsung', 'iphone'], negative=['apple'], topn=1))
>>> print(model.most_similar(positive=['fruit'], topn=10)[9:])
```

</template>
</BiRow>

<BiRow>
<template #en>

```
[('droid_x', 0.6324754953384399)]
[('apple', 0.6410146951675415)]
```

</template>
<template #zh>

```
[('droid_x', 0.6324754953384399)]
[('apple', 0.6410146951675415)]
```

</template>
</BiRow>

<BiRow>
<template #en>

"Droid" refers to Samsung's first 4G LTE smartphone ("Samsung" + "iPhone" - "Apple" = "Droid"), while "apple" is the 10th closest word to "fruit".

</template>
<template #zh>

"Droid" 指三星的首款 4G LTE 智能手机（"Samsung" + "iPhone" - "Apple" = "Droid"），而 "apple" 是距离 "fruit" 第 10 近的词。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector search strategies

</template>
<template #zh>

## 向量搜索策略

</template>
</BiRow>

<BiRow>
<template #en>

Now that we've seen the power of vector embeddings, let's briefly take a look at some of the ways we can conduct nearest neighbor search. This is not a comprehensive list; we'll just briefly go over some common methods in order to provide a high-level overview of how vector search is conducted at scale. Note that some of these methods are not exclusive to each other - it's possible, for example, to use quantization in conjunction with space partitioning.

</template>
<template #zh>

见识了嵌入向量的威力之后，我们来简单看几种执行最近邻搜索的方式。这份清单并不求全；我们只会快速过一遍几种常见方法，让大家对大规模场景下向量搜索如何进行有个整体认识。注意，这些方法并不互斥——例如，完全可以将量化与空间划分结合使用。

</template>
</BiRow>

<BiRow>
<template #en>

(We'll also be going over each of these methods in detail in future tutorials, so stay tuned for more.)

</template>
<template #zh>

（后续教程也会逐一深入讲解这些方法，敬请期待。）

</template>
</BiRow>

<BiRow>
<template #en>

### Linear search

</template>
<template #zh>

### 线性搜索

</template>
</BiRow>

<BiRow>
<template #en>

The simplest but most naïve nearest neighbor search algorithm is good old linear search: computing the distance from a query vector to all other vectors in the [vector database](https://zilliz.com/learn/beginner-guide-to-implementing-vector-databases).

</template>
<template #zh>

最简单但也最朴素的最近邻搜索算法，当属经典的线性搜索：把查询向量到[向量数据库](https://zilliz.com/learn/beginner-guide-to-implementing-vector-databases)中所有其他向量的距离都算一遍。

</template>
</BiRow>

<BiRow>
<template #en>

For obvious reasons, naïve search does not work when trying to scale our vector database to tens or hundreds of millions of vectors. But when the total number of elements in the database is small, this can actually be the most efficient way to perform vector search since a separate data structure for the index is not required, while inserts and deletes can be implemented fairly easily.

</template>
<template #zh>

出于显而易见的原因，当向量数据库要扩展到数千万乃至数亿向量时，朴素搜索就行不通了。但如果数据库中的元素总数不多，它反而可能是执行向量搜索最高效的方式——既不需要为索引单独构建数据结构，插入和删除的实现也相当容易。

</template>
</BiRow>

<BiRow>
<template #en>

Due to the lack of space complexity as well as constant space overhead associated with naïve search, this method can often outperform space partitioning even when querying across a moderate number of vectors.

</template>
<template #zh>

由于朴素搜索没有额外的空间复杂度、也不会带来恒定的空间开销，即使在中等规模的向量集上查询，它的表现也常常胜过空间划分。

</template>
</BiRow>

<BiRow>
<template #en>

### Space partitioning

</template>
<template #zh>

### 空间划分

</template>
</BiRow>

<BiRow>
<template #en>

Space partitioning is not a single algorithm, but rather a family of algorithms that all use the same concept.

</template>
<template #zh>

空间划分不是单一的算法，而是一族算法，它们都基于同一个思想。

</template>
</BiRow>

<BiRow>
<template #en>

K-dimensional trees (kd-trees) are perhaps the most well-known in this family, and work by continuously bisecting the search space (splitting the vectors into “left” and “right” buckets) in a manner similar to binary search trees.

</template>
<template #zh>

K 维树（kd-tree）也许是这一族中最有名的，其工作方式类似二叉搜索树：不断地将搜索空间一分为二（把向量分进"左""右"两个桶）。

</template>
</BiRow>

<BiRow>
<template #en>

Inverted file index (IVF) is also a form of space partitioning, and works by assigning each vector to its nearest centroid - searches are then conducted by first determining the query vector's closest centroid and conducting the search around there, significantly reducing the total number of vectors that need to be searched. IVF is a fairly popular indexing strategy and is commonly combined with other indexing algorithms to improve performance.

</template>
<template #zh>

倒排文件索引（IVF）也是空间划分的一种形式，其做法是把每个向量分配给离它最近的质心——搜索时先确定查询向量最近的质心，再在该质心附近展开搜索，从而大幅减少需要搜索的向量总数。IVF 是相当流行的索引策略，常与其他索引算法组合使用以提升性能。

</template>
</BiRow>

<BiRow>
<template #en>

### Quantization

</template>
<template #zh>

### 量化

</template>
</BiRow>

<BiRow>
<template #en>

Quantization is a technique for reducing the total size of the database by reducing the precision of the vectors.

</template>
<template #zh>

量化是一类通过降低向量精度来缩减数据库总大小的技术。

</template>
</BiRow>

<BiRow>
<template #en>

Scalar quantization (SQ), for example, works by multiplying high-precision floating point vectors with a scalar value, then casting the elements of the resultant vector to their nearest integers. This not only reduces the effective size of the entire database (e.g. by a factor of eight for conversion from **float64_t** to **int8_t**), but also has the positive side-effect of speeding up vector-to-[vector distance](https://zilliz.com/glossary/vector-distance) computations.

</template>
<template #zh>

例如，标量量化（SQ）的做法是：将高精度浮点向量乘以一个标量值，再把结果向量的各元素转换为最接近的整数。这不仅能缩小整个数据库的有效体积（例如从 **float64_t** 转换为 **int8_t**，体积可缩小为原来的 1/8），还附带一个正面效应——[向量间距离](https://zilliz.com/glossary/vector-distance)的计算速度也会随之加快。

</template>
</BiRow>

<BiRow>
<template #en>

Product quantization (PQ) is another quantization technique that works similar to dictionary compression. In PQ, all vectors are split into equally-sized subvectors, and each subvector is then replaced with a centroid.

</template>
<template #zh>

乘积量化（PQ）是另一种量化技术，原理类似字典压缩。在 PQ 中，所有向量都会被切分成大小相同的子向量，然后每个子向量都用一个质心来替换。

</template>
</BiRow>

<BiRow>
<template #en>

### Hierarchical Navigable Small Worlds (HNSW)

</template>
<template #zh>

### 分层可导航小世界（HNSW）

</template>
</BiRow>

<BiRow>
<template #en>

Hierarchical Navigable Small Worlds is a graph-based indexing and retrieval algorithm.

</template>
<template #zh>

分层可导航小世界（HNSW）是一种基于图的索引与检索算法。

</template>
</BiRow>

<BiRow>
<template #en>

This works differently from product quantization: instead of improving the searchability of the database by reducing its effective size, HNSW creates a multi-layer graph from the original data. Upper layers contain only "long connections" while lower layers contain only "short connections" between vectors in the database (see the next section for an overview of vector distance metrics). Individual graph connections are created a-la skip lists.

</template>
<template #zh>

它的工作方式与乘积量化不同：HNSW 不是通过缩小数据库的有效体积来提升可搜索性，而是从原始数据构建一个多层图。上层只包含"长连接"，下层只包含数据库中向量之间的"短连接"（向量距离度量的概览见下一节）。图中单条连接的建立方式则神似跳表（skip list）。

</template>
</BiRow>

<BiRow>
<template #en>

With this architecture in place, searching becomes fairly straightforward – we greedily traverse the uppermost graph (the one with the longest inter-vector connections) for the vector closest to our query vector. We then do the same for the second layer, using the result of the first layer search as the starting point. This continues until we complete the search at the bottommost layer, the result of which becomes the nearest neighbor of the query vector.

</template>
<template #zh>

有了这样的架构，搜索就变得相当直白——我们先在最顶层图（向量间连接最长的那一层）上贪心地做图遍历，寻找离查询向量最近的向量；然后在第二层如法炮制，把第一层搜索的结果作为起点。如此往复，直到在最底层完成搜索，其结果便是查询向量的最近邻。

</template>
</BiRow>

<BiRow>
<template #en>

![HNSW, visualized. Image source: https://arxiv.org/abs/1603.09320](/vector-db-images/vector-similarity-search-01.png)
HNSW, visualized. Image source: https://arxiv.org/abs/1603.09320

</template>
<template #zh>

![HNSW, visualized. Image source: https://arxiv.org/abs/1603.09320](/vector-db-images/vector-similarity-search-01.png)
HNSW 可视化。图片来源：https://arxiv.org/abs/1603.09320

</template>
</BiRow>

<BiRow>
<template #en>

### [Approximate Nearest Neighbors Oh Yeah](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)

</template>
<template #zh>

### [近似最近邻，噢耶（Approximate Nearest Neighbors Oh Yeah）](https://zilliz.com/learn/approximate-nearest-neighbor-oh-yeah-ANNOY)

</template>
</BiRow>

<BiRow>
<template #en>

This is probably my favorite ANN algorithm simply due to its playful and unintunitive name. [Approximate Nearest Neighbors Oh Yeah](https://github.com/spotify/annoy) (ANNOY) is a tree-based algorithm popularized by Spotify (it’s used in their music recommendation system). Despite the strange name, the underlying concept behind ANNOY is actually fairly simple – binary trees.

</template>
<template #zh>

这大概是我最喜欢的 ANN 算法了，纯粹因为这个名字既俏皮又不按常理出牌。[Approximate Nearest Neighbors Oh Yeah](https://github.com/spotify/annoy)（ANNOY）是一种基于树的算法，由 Spotify 发扬光大（用在它们的音乐推荐系统里）。名字虽然古怪，ANNOY 背后的概念其实相当简单——二叉树。

</template>
</BiRow>

<BiRow>
<template #en>

ANNOY works by first randomly selecting two vectors in the database and bisecting the search space along the hyperplane separating those two vectors. This is done iteratively until there are fewer than some predefined parameter **NUM_MAX_ELEMS** per node. Since the resulting index is essentially a binary tree, this allows us to do our search on O(log n) complexity.

</template>
<template #zh>

ANNOY 的做法是：先从数据库中随机选出两个向量，沿着分隔这两个向量的超平面把搜索空间一分为二；如此迭代，直到每个节点中的元素少于预定义参数 **NUM_MAX_ELEMS**。由于最终得到的索引本质上就是一棵二叉树，我们可以用 O(log n) 的复杂度完成搜索。

</template>
</BiRow>

<BiRow>
<template #en>

![ANNOY, visualized. Image source: https://github.com/spotify/annoy](/vector-db-images/vector-similarity-search-02.png)
ANNOY, visualized. Image source: https://github.com/spotify/annoy

</template>
<template #zh>

![ANNOY, visualized. Image source: https://github.com/spotify/annoy](/vector-db-images/vector-similarity-search-02.png)
ANNOY 可视化。图片来源：https://github.com/spotify/annoy

</template>
</BiRow>

<BiRow>
<template #en>

## Commonly used similarity metrics

</template>
<template #zh>

## 常用的相似度度量

</template>
</BiRow>

<BiRow>
<template #en>

The [very best vector databases](https://zilliz.com/) are useless without similarity metrics – methods for computing the distance between two vectors. Numerous metrics exist, so we will discuss only the most commonly used subset here.

</template>
<template #zh>

再棒的[向量数据库](https://zilliz.com/)，离开相似度度量也无用武之地——相似度度量是计算两个向量之间距离的方法。度量方式数不胜数，这里我们只讨论最常用的那一部分。

</template>
</BiRow>

<BiRow>
<template #en>

### Floating point vector similarity metrics

</template>
<template #zh>

### 浮点向量相似度度量

</template>
</BiRow>

<BiRow>
<template #en>

The most common floating point vector similarity metrics are, in no particular order, *L1 distance*, *L2 distance*, and *cosine similarity*. The first two values are *distance metrics* (lower values imply more similarity while higher values imply lower similarity), while cosine similarity is a *similarity metric* (higher values imply more simlarity).

</template>
<template #zh>

最常见的浮点向量相似度度量（排名不分先后）是 *L1 距离*、*L2 距离*和*余弦相似度*。前两者是*距离度量*（值越小越相似，值越大越不相似），而余弦相似度是*相似度度量*（值越大越相似）。

</template>
</BiRow>

<BiRow>
<template #en>

1. $$d_{l1}(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}|\mathbf{a}_i-\mathbf{b}_i|$$
2. $$d_{l2}(\mathbf{a},\mathbf{b})=\sqrt{\sum_{i=1}^{N}(\mathbf{a}_i-\mathbf{b}_i)^2}$$
3. $$d_{cos}(\mathbf{a},\mathbf{b})=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$$

</template>
<template #zh>

1. $$d_{l1}(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}|\mathbf{a}_i-\mathbf{b}_i|$$
2. $$d_{l2}(\mathbf{a},\mathbf{b})=\sqrt{\sum_{i=1}^{N}(\mathbf{a}_i-\mathbf{b}_i)^2}$$
3. $$d_{cos}(\mathbf{a},\mathbf{b})=\frac{\mathbf{a}\cdot\mathbf{b}}{|\mathbf{a}||\mathbf{b}|}$$

</template>
</BiRow>

<BiRow>
<template #en>

L1 distance is also commonly referred to as Manhattan distance, aptly named after the fact that getting from point A to point B in Manhattan requires moving along one of two perpendicular directions. The second equation, L2 distance, is simply the distance between two vectors in Euclidean space. The third and final equation is cosine distance, equivalent to the cosine of the angle between two vectors. Note the equation for cosine similarity works out to be the dot product between normalized versions of input vectors **a** and **b**.

</template>
<template #zh>

L1 距离也常被称为曼哈顿距离，这个名字起得很贴切：在曼哈顿，从 A 点到 B 点只能沿着两个互相垂直的方向移动。第二个公式是 L2 距离，就是两个向量在欧氏空间中的距离。第三个也是最后一个公式是余弦距离，等于两个向量夹角的余弦值。注意，余弦相似度的公式展开后，恰好是输入向量 **a** 与 **b** 归一化后的点积。

</template>
</BiRow>

<BiRow>
<template #en>

With a bit of math, we can also show that L2 distance and cosine similarity are effectively equivalent when it comes to similarity ranking for unit norm vectors:

</template>
<template #zh>

稍作推导，我们还能证明：在对单位范数向量做相似度排序时，L2 距离和余弦相似度实际上是等价的：

</template>
</BiRow>

<BiRow>
<template #en>

$$d_{l2}(\mathbf{a},\mathbf{b})=(\mathbf{a}-\mathbf{b})^T(\mathbf{a}-\mathbf{b})$$
$$=\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$

</template>
<template #zh>

$$d_{l2}(\mathbf{a},\mathbf{b})=(\mathbf{a}-\mathbf{b})^T(\mathbf{a}-\mathbf{b})$$
$$=\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$

</template>
</BiRow>

<BiRow>
<template #en>

Recall that unit norm vectors have a magnitude of 1:

</template>
<template #zh>

回想一下，单位范数向量的模长为 1：

</template>
</BiRow>

<BiRow>
<template #en>

$$\mathbf{a}^T\mathbf{a}=1$$

</template>
<template #zh>

$$\mathbf{a}^T\mathbf{a}=1$$

</template>
</BiRow>

<BiRow>
<template #en>

With this, we get:

</template>
<template #zh>

由此可得：

</template>
</BiRow>

<BiRow>
<template #en>

$$\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$
$$=2-2\mathbf{a}^T\mathbf{b}$$

</template>
<template #zh>

$$\mathbf{a}^T\mathbf{a}-2\mathbf{a}^T\mathbf{b}+\mathbf{b}^T\mathbf{b}$$
$$=2-2\mathbf{a}^T\mathbf{b}$$

</template>
</BiRow>

<BiRow>
<template #en>

Since we have unit norm vectors, cosine distance works out to be the dot product between **a** and **b** (the denominator in equation 3 above works out to be 1):

</template>
<template #zh>

既然是单位范数向量，余弦距离就等于 **a** 与 **b** 的点积（上面公式 3 的分母恰好为 1）：

</template>
</BiRow>

<BiRow>
<template #en>

$$2-2\mathbf{a}^T\mathbf{b}$$
$$=2(1-d_{cos}(\mathbf{a},\mathbf{b}))$$

</template>
<template #zh>

$$2-2\mathbf{a}^T\mathbf{b}$$
$$=2(1-d_{cos}(\mathbf{a},\mathbf{b}))$$

</template>
</BiRow>

<BiRow>
<template #en>

Essentially, for unit norm vectors, L2 distance and cosine similarity are functionally equivalent! Always remember to normalize your embeddings.

</template>
<template #zh>

本质上，对于单位范数向量，L2 距离与余弦相似度在功能上是等价的！所以，永远记得对你的嵌入向量做归一化。

</template>
</BiRow>

<BiRow>
<template #en>

### Binary vector similarity metrics

</template>
<template #zh>

### 二进制向量相似度度量

</template>
</BiRow>

<BiRow>
<template #en>

Binary vectors, as their name suggest, do not have metrics based in arithmetics a-la floating point vectors. Similarity metrics for binary vectors instead rely on either set mathematics, bit manipulation, or a combination of both (it's okay, I also hate discrete math). Here are the formulas for two commonly used binary vector similarity metrics:

</template>
<template #zh>

顾名思义，二进制向量并没有浮点向量那样基于算术的度量。二进制向量的相似度度量依赖的是集合数学、位操作，或两者的组合（没关系，我也讨厌离散数学）。下面是两个常用二进制向量相似度度量的公式：

</template>
</BiRow>

<BiRow>
<template #en>

1. $$d_J(\mathbf{a},\mathbf{b})=1-\frac{\mathbf{a}\cdot\mathbf{b}}{|a|^2+|b|^2-\mathbf{a}\cdot\mathbf{b}}$$
2. $$d_J(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}\mathbf{a}_i\oplus\mathbf{b}_i$$

</template>
<template #zh>

1. $$d_J(\mathbf{a},\mathbf{b})=1-\frac{\mathbf{a}\cdot\mathbf{b}}{|a|^2+|b|^2-\mathbf{a}\cdot\mathbf{b}}$$
2. $$d_J(\mathbf{a},\mathbf{b})=\sum_{i=1}^{N}\mathbf{a}_i\oplus\mathbf{b}_i$$

</template>
</BiRow>

<BiRow>
<template #en>

The first equation is called Tanimoto/Jaccard distance, and is essentially a measure of the amount of overlap between two binary vectors. The second equation is Hamming distance, and is a count of the number of vector elements in a and b which differ from each other.

</template>
<template #zh>

第一个公式叫 Tanimoto/Jaccard 距离，本质上衡量的是两个二进制向量之间的重叠程度。第二个公式是汉明距离（Hamming distance），统计的是 a 与 b 中彼此不同的向量元素的个数。

</template>
</BiRow>

<BiRow>
<template #en>

You can most likely safely ignore these similarity metrics, since the majority of applications use cosine similarity over floating point embeddings.

</template>
<template #zh>

这两个相似度度量你大概率可以放心忽略，因为大多数应用都是在浮点嵌入向量上使用余弦相似度。

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

In this tutorial, we took a look at vector search, along with some common vector search algorithms and distance metrics. Here are some key takeaways:

</template>
<template #zh>

在本篇教程中，我们了解了向量搜索，以及一些常见的向量搜索算法和距离度量。关键要点如下：

</template>
</BiRow>

<BiRow>
<template #en>

- Embedding vectors are powerful representations, both in terms of distance between the vectors and in terms of vector arithmetic. By applying a liberal quantity of vector algebra to embeddings, we can perform scalable semantic analysis using just basic mathematical operators.
- [Semantic Vector search](https://zilliz.com/vector-database-use-cases/semantic-search) overcomes the limitation of keyword search by enabling you to search based on the meaning of your query. It enables quick retrieval of answers by performing vector search.
- There are a wide variety of approximate nearest neighbor search algorithms and/or index types to choose from. The most commonly one used today is HNSW, but a different indexing algorithm may work better for your particular application, depending on the total number of vector embeddings you have in addition to the length of each individual vector.
- The two primary distance metrics used today are L2/Euclidean distance and cosine distance. These two metrics, when used on normalized embeddings, are functionally equivalent.

</template>
<template #zh>

- 嵌入向量是非常强大的表示方式，这既体现在向量之间的距离上，也体现在向量运算上。只要对嵌入向量大胆施展向量代数，我们仅凭基本的数学运算符就能完成可扩展的语义分析。
- [语义向量搜索](https://zilliz.com/vector-database-use-cases/semantic-search)让你能够基于查询的含义进行搜索，从而克服了关键词搜索的局限。它通过执行向量搜索，实现答案的快速检索。
- 近似最近邻搜索算法和索引类型的选择非常丰富。如今最常用的是 HNSW，但就你的特定应用而言，别的索引算法可能效果更好——这取决于你拥有的嵌入向量总数，以及每个向量的长度。
- 当今两大主流距离度量是 L2/欧氏距离和余弦距离。这两种度量用在归一化的嵌入向量上时，功能上是等价的。

</template>
</BiRow>

<BiRow>
<template #en>

Thanks for joining us for this tutorial! Vector search is a core part of [Milvus](https://zilliz.com/what-is-milvus), and it will continue to be. In future tutorials, we'll be doing some deeper dives into the most commonly used ANNS algorithms - HNSW and ScaNN.

</template>
<template #zh>

感谢你学完本篇教程！向量搜索是 [Milvus](https://zilliz.com/what-is-milvus) 的核心，未来也将一直是。在后续教程中，我们将深入探讨最常用的 ANNS 算法——HNSW 和 ScaNN。

</template>
</BiRow>
