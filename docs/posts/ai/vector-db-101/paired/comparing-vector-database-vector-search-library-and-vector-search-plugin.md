<BiRow>
<template #en>

Hey there - welcome back to Vector Database 101!

</template>
<template #zh>

嘿，欢迎回到《Vector Database 101》！

</template>
</BiRow>

<BiRow>
<template #en>

The surge in [ChatGPT](https://zilliz.com/learn/ChatGPT-Vector-Database-Prompt-as-code) and other large language models (LLMs) has driven the growth of vector search technologies, featuring specialized vector databases like [Milvus](https://zilliz.com/what-is-milvus) and [Zilliz Cloud](https://zilliz.com/cloud) alongside libraries such as [FAISS](https://zilliz.com/blog/set-up-with-facebook-ai-similarity-search-faiss) and integrated vector search plugins within conventional databases.

</template>
<template #zh>

[ChatGPT](https://zilliz.com/learn/ChatGPT-Vector-Database-Prompt-as-code) 等大语言模型（LLM）的爆火，带动了向量搜索技术的增长：既有 [Milvus](https://zilliz.com/what-is-milvus)、[Zilliz Cloud](https://zilliz.com/cloud) 这样的专用向量数据库，也有 [FAISS](https://zilliz.com/blog/set-up-with-facebook-ai-similarity-search-faiss) 这类向量搜索库，还有传统数据库内置的向量搜索插件。

</template>
</BiRow>

<BiRow>
<template #en>

In our [previous series post](https://zilliz.com/learn/what-is-vector-database), we delved into the fundamentals of vector databases.n this post, we dive further into understanding vector databases and continue to explore the intricate realm of vector search, comparing vector databases, vector search plugins, and vector search libraries.

</template>
<template #zh>

在[上一篇](https://zilliz.com/learn/what-is-vector-database)中，我们深入讲了向量数据库的基础知识。本文将进一步理解向量数据库，继续探索纷繁复杂的向量搜索领域，对比向量数据库、向量搜索插件和向量搜索库。

</template>
</BiRow>

<BiRow>
<template #en>

## What is vector search?

</template>
<template #zh>

## 什么是向量搜索？

</template>
</BiRow>

<BiRow>
<template #en>

[Vector search](https://zilliz.com/learn/vector-similarity-search), also known as vector similarity search, is a technique for retrieving the top-k results that are most similar or semantically related to a given query vector among an extensive collection of dense vector data. Before conducting similarity searches, we leverage neural networks to transform [unstructured data](https://zilliz.com/learn/introduction-to-unstructured-data), such as text, images, videos, and audio, into high-dimensional numerical vectors called embedding vectors. After generating embedding vectors, vector search engines compare the spatial distance between the input query vector and the vectors in the vector stores. The closer they are in space, the more similar they are.

</template>
<template #zh>

[向量搜索](https://zilliz.com/learn/vector-similarity-search)又称向量相似度搜索，是一种从海量稠密向量数据中检索出与给定查询向量最相似或语义最相关的 top-k 结果的技术。在做相似度搜索之前，我们先用神经网络把文本、图片、视频、音频等[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)转换成高维数值向量，也就是嵌入向量（embedding vector）。生成嵌入向量之后，向量搜索引擎会比较输入查询向量与向量存储中各向量之间的空间距离——在空间中离得越近，就越相似。

</template>
</BiRow>

<BiRow>
<template #en>

Multiple vector search technologies are available in the market, including machine learning libraries like Python's NumPy, vector search libraries like FAISS, vector search plugins built on traditional databases, and specialized vector databases like Milvus and Zilliz Cloud.

</template>
<template #zh>

市面上有多种向量搜索技术可选：Python NumPy 这类机器学习库、FAISS 这类向量搜索库、构建在传统数据库上的向量搜索插件，以及 Milvus 和 Zilliz Cloud 这样的专用向量数据库。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector databases vs. vector search libraries

</template>
<template #zh>

## 向量数据库 vs. 向量搜索库

</template>
</BiRow>

<BiRow>
<template #en>

[Specialized vector databases](https://zilliz.com/blog/what-is-a-real-vector-database) are not the only stack for similarity searches. Before the advent of vector databases, many vector searching libraries, such as FAISS, ScaNN, and HNSW, were used for vector retrieval.

</template>
<template #zh>

[专用向量数据库](https://zilliz.com/blog/what-is-a-real-vector-database)并不是做相似度搜索的唯一技术栈。在向量数据库出现之前，FAISS、ScaNN、HNSW 等许多向量搜索库就被用于向量检索。

</template>
</BiRow>

<BiRow>
<template #en>

Vector search libraries can help you quickly build a high-performance prototype vector search system. Taking FAISS as an example, it is open-source and developed by Meta for efficient similarity search and dense vector clustering. FAISS can handle vector collections of any size, even those that cannot be fully loaded into memory. Additionally, FAISS offers tools for evaluation and parameter tuning. Even though written in C++, FAISS provides a Python/NumPy interface.

</template>
<template #zh>

向量搜索库能帮你快速搭出一个高性能的向量搜索系统原型。以 FAISS 为例，它由 Meta 开发并开源，用于高效相似度搜索和稠密向量聚类。FAISS 可以处理任意规模的向量集合，哪怕是装不进内存的超大集合。此外，FAISS 还提供了用于评估和参数调优的工具。它虽然用 C++ 编写，但提供了 Python/NumPy 接口。

</template>
</BiRow>

<BiRow>
<template #en>

However, vector search libraries are merely lightweight ANN libraries rather than managed solutions, and they have limited functionality. If your dataset is small and limited, these libraries can be sufficient for unstructured data processing, even for systems running in production. However, as dataset sizes increase and more users are onboarded, the scale problem becomes increasingly difficult to solve. Moreover, they don’t allow any modifications to their index data and cannot be queried during data import.

</template>
<template #zh>

然而，向量搜索库只是轻量级的 ANN 库，而不是托管式方案，功能也有限。如果你的数据集小而有限，这些库足以支撑非结构化数据处理，甚至跑在生产环境的系统也没问题。但随着数据集变大、用户增多，扩展问题会越来越难解。更麻烦的是，它们不允许修改已建好的索引数据，导入数据期间也无法提供查询。

</template>
</BiRow>

<BiRow>
<template #en>

By contrast, vector databases are a more optimal solution for unstructured data storage and retrieval. They can store and query millions or even billions of vectors while providing real-time responses simultaneously; they’re highly scalable to meet users’ growing business needs.

</template>
<template #zh>

相比之下，向量数据库是存储和检索非结构化数据更优的方案。它能一边存储和查询数百万甚至数十亿条向量，一边提供实时响应；它还能高度扩展，满足用户不断增长的业务需求。

</template>
</BiRow>

<BiRow>
<template #en>

In addition, vector databases like Milvus have much more user-friendly features for structured/semi-structured data:  cloud-nativity, multi-tenancy, scalability, etc. These features will become clear as we dive deeper into this tutorial.

</template>
<template #zh>

此外，Milvus 这样的向量数据库针对结构化/半结构化数据提供了丰富得多的用户友好特性：云原生、多租户、可扩展性等。随着本教程的深入，这些特性会一一清晰起来。

</template>
</BiRow>

<BiRow>
<template #en>

They also operate in a totally different layer of abstraction from vector search libraries - vector databases are full-fledged services, while ANN libraries are meant to be integrated into the application that you’re developing. In this sense, ANN libraries are one of the many components that vector databases are built on top of, similar to how Elasticsearch is built on top of Apache Lucene.

</template>
<template #zh>

两者运作的抽象层级也完全不同——向量数据库是功能完备的服务，而 ANN 库是要被集成进你正在开发的应用里的组件。从这个意义上说，ANN 库是向量数据库赖以构建的众多组件之一，就像 Elasticsearch 构建在 Apache Lucene 之上一样。

</template>
</BiRow>

<BiRow>
<template #en>

To give an example of why this abstraction is so important, let’s look at inserting a new unstructured data element into a vector database. This is super easy in Milvus:

</template>
<template #zh>

举个例子说明这种抽象为什么重要：往向量数据库里插入一条新的非结构化数据。这在 Milvus 里超级简单：

</template>
</BiRow>

<BiRow>
<template #en>

```
from pymilvus import Collectioncollection = Collection('book')mr = collection.insert(data)
```

</template>
<template #zh>

```
from pymilvus import Collectioncollection = Collection('book')mr = collection.insert(data)
```

</template>
</BiRow>

<BiRow>
<template #en>

It’s really as easy as that - 3 lines of code. With a library such as FAISS or ScaNN, there is, unfortunately, no easy way of doing this without manually re-creating the entire index at certain checkpoints. Even if you could, vector search libraries still lack scalability and multi-tenancy, two of the most important vector database features.

</template>
<template #zh>

就是这么简单——3 行代码。可惜用 FAISS 或 ScaNN 这类库，没法轻松做到这一点，只能在某些检查点手动重建整个索引。就算能做到，向量搜索库依然缺可扩展性和多租户——这两项恰恰是向量数据库最重要的特性。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector databases vs. vector search plugins for traditional databases

</template>
<template #zh>

## 向量数据库 vs. 传统数据库的向量搜索插件

</template>
</BiRow>

<BiRow>
<template #en>

Great, now that we’ve established the difference between vector search libraries and vector databases, let’s take a look at how vector databases differ from **vector search plugins**.

</template>
<template #zh>

很好，既然已经弄清了向量搜索库和向量数据库的区别，再来看看向量数据库与**向量搜索插件**有何不同。

</template>
</BiRow>

<BiRow>
<template #en>

An increasing number of traditional relational databases, and search systems such as Clickhouse and [Elasticsearch](https://zilliz.com/learn/elasticsearch-cloud-vs-zilliz) are including built-in vector search plugins. Elasticsearch 8.0, for example, includes vector insertion and ANN search functionality that can be called via restful API endpoints. The problem with vector search plugins should be clear as night and day - **these solutions do not take a full-stack approach to embedding management and vector search**. Instead, these plugins are meant to be enhancements on top of existing architectures, thereby making them limited and unoptimized. Developing an unstructured data application atop a traditional database would be like trying to fit lithium batteries and electric motors inside the frame of a gas-powered car - not a great idea!

</template>
<template #zh>

越来越多的传统关系数据库和搜索系统（如 Clickhouse、[Elasticsearch](https://zilliz.com/learn/elasticsearch-cloud-vs-zilliz)）开始内置向量搜索插件。以 Elasticsearch 8.0 为例，它包含向量插入和 ANN 搜索功能，可以通过 restful API 端点调用。向量搜索插件的问题一目了然——**这些方案没有从全栈角度对待嵌入管理和向量搜索**。它们只是现有架构之上的增强，因此能力受限、未做优化。在传统数据库上开发非结构化数据应用，就像往燃油车的车架里塞锂电池和电动机——不是个好主意！

</template>
</BiRow>

<BiRow>
<template #en>

To illustrate why this is, let’s go back to the list of features that a vector database should implement (from the first section). Vector search plugins are missing two of these features - tunability and user-friendly APIs/SDKs. I’ll continue to use Elasticsearch’s ANN engine as an example; other vector search plugins operate very similarly so I won’t go too much further into detail. Elasticsearch supports vector storage via the `dense_vector` data field type and allows for querying via the `knnsearch endpoint`:

</template>
<template #zh>

为了说明原因，我们回到（第一部分列出的）向量数据库应实现的特性清单。向量搜索插件缺了其中两项：可调优性和用户友好的 API/SDK。我继续拿 Elasticsearch 的 ANN 引擎举例；其他向量搜索插件的玩法大同小异，就不再展开。Elasticsearch 通过 `dense_vector` 数据字段类型支持向量存储，并允许通过 `knnsearch endpoint` 查询：

</template>
</BiRow>

<BiRow>
<template #en>

```json
PUT index
{
 "mappings": {
   "properties": {
     "image-vector": {
       "type": "dense_vector",
       "dims": 128,
       "index": true,
       "similarity": "l2_norm"
     }
   }
 }
}

PUT index/_doc
{
 "image-vector": [0.12, 1.34, ...]
}
```

</template>
<template #zh>

```json
PUT index
{
 "mappings": {
   "properties": {
     "image-vector": {
       "type": "dense_vector",
       "dims": 128,
       "index": true,
       "similarity": "l2_norm"
     }
   }
 }
}

PUT index/_doc
{
 "image-vector": [0.12, 1.34, ...]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

```json
GET index/_knn_search
{
 "knn": {
   "field": "image-vector",
   "query_vector": [-0.5, 9.4, ...],
   "k": 10,
   "num_candidates": 100
 }
}
```

</template>
<template #zh>

```json
GET index/_knn_search
{
 "knn": {
   "field": "image-vector",
   "query_vector": [-0.5, 9.4, ...],
   "k": 10,
   "num_candidates": 100
 }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Elasticsearch's ANN plugin supports only one indexing algorithm: Hierarchical Navigable Small Worlds, also known as HNSW (I like to think that the creator was ahead of Marvel when it came to popularizing the multiverse). On top of that, only L2/Euclidean distance is supported as a distance metric. This is an okay start, but let's compare it to Milvus, a full-fledged vector database. Using `pymilvus`:

</template>
<template #zh>

Elasticsearch 的 ANN 插件只支持一种索引算法：层级可导航小世界（Hierarchical Navigable Small Worlds，HNSW）——我个人喜欢认为，它的创造者在普及「多元宇宙」这件事上抢在了漫威前面。不仅如此，它还只支持 L2/欧几里得距离这一种距离度量。作为起步这还算凑合，但拿它跟功能完备的向量数据库 Milvus 比一比。用 `pymilvus`：

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> field1 = FieldSchema(name='id', dtype=DataType.INT64, description='int64', is_primary=True)
>>> field2 = FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='embedding', dim=128, is_primary=False)
>>> schema = CollectionSchema(fields=[field1, field2], description='hello world collection')
>>> collection = Collection(name='my_collection', data=None, schema=schema)
>>> index_params = {
        'index_type': 'IVF_FLAT',
        'params': {'nlist': 1024},
        "metric_type": 'L2'}
>>> collection.create_index('embedding', index_params)
```

</template>
<template #zh>

```python
>>> field1 = FieldSchema(name='id', dtype=DataType.INT64, description='int64', is_primary=True)
>>> field2 = FieldSchema(name='embedding', dtype=DataType.FLOAT_VECTOR, description='embedding', dim=128, is_primary=False)
>>> schema = CollectionSchema(fields=[field1, field2], description='hello world collection')
>>> collection = Collection(name='my_collection', data=None, schema=schema)
>>> index_params = {
        'index_type': 'IVF_FLAT',
        'params': {'nlist': 1024},
        "metric_type": 'L2'}
>>> collection.create_index('embedding', index_params)
```

</template>
</BiRow>

<BiRow>
<template #en>

```python
>>> search_param = {
        'data': vector,
        'anns_field': 'embedding',
        'param': {'metric_type': 'L2', 'params': {'nprobe': 16}},
        'limit': 10,
        'expr': 'id_field > 0'
    }
>>> results = collection.search(**search_param)
```

</template>
<template #zh>

```python
>>> search_param = {
        'data': vector,
        'anns_field': 'embedding',
        'param': {'metric_type': 'L2', 'params': {'nprobe': 16}},
        'limit': 10,
        'expr': 'id_field > 0'
    }
>>> results = collection.search(**search_param)
```

</template>
</BiRow>

<BiRow>
<template #en>

While both [Elasticsearch and Milvus](https://zilliz.com/comparison/milvus-vs-elastic) have methods for creating indexes, inserting embedding vectors, and performing nearest neighbor search, it’s clear from these examples that Milvus has a more intuitive vector search API (better user-facing API) and broader vector index + distance metric support (better tunability). Milvus also plans to support more vector indices and allow for querying via SQL-like statements in the future, further improving both tunability and usability.

</template>
<template #zh>

[Elasticsearch 和 Milvus](https://zilliz.com/comparison/milvus-vs-elastic) 都能创建索引、插入嵌入向量并执行最近邻搜索，但从这些示例可以清楚地看到：Milvus 的向量搜索 API 更直观（面向用户的 API 更好用），对向量索引 + 距离度量的支持也更广（可调优性更好）。Milvus 还计划在未来支持更多向量索引，并允许通过类 SQL 语句查询，进一步提升可调优性和易用性。

</template>
</BiRow>

<BiRow>
<template #en>

We just blew through quite a bit of content. This section was admittedly fairly long, so for those of you who skimmed it, here’s a quick tl;dr: Milvus is better than vector search plugins because Milvus was built from the ground-up as a vector database, allowing for a richer set of features and an architecture more suited towards unstructured data.

</template>
<template #zh>

这一节信息量不小。平心而论它确实偏长，给只扫了一眼的朋友来个太长不看版（tl;dr）：Milvus 优于向量搜索插件，因为 Milvus 从零开始就是按向量数据库设计的，特性更丰富，架构也更贴合非结构化数据。

</template>
</BiRow>

<BiRow>
<template #en>

## How to choose from different vector search technologies?

</template>
<template #zh>

## 如何在不同的向量搜索技术中做选择？

</template>
</BiRow>

<BiRow>
<template #en>

Not all vector databases are created equal; each possesses unique traits that cater to specific applications. Vector search libraries and plugins are user-friendly and ideal for handling small-scale production environments with millions of vectors. If your data size is small and you just require basic vector search functionality, these technologies are sufficient for your business.

</template>
<template #zh>

不是所有向量数据库都生而平等；每一种都有各自的独特之处，分别适配特定的应用场景。向量搜索库和插件用起来友好，适合处理百万级向量的小规模生产环境。如果你的数据量小、只需要基础的向量搜索功能，这些技术就足以满足你的业务。

</template>
</BiRow>

<BiRow>
<template #en>

However, a specialized vector database should be your top choice for data-intensive businesses dealing with hundreds of millions of vectors and demanding real-time responses. Milvus, for instance, effortlessly manages billions of vectors, offering lightning-fast query speeds and rich functionality. Moreover, fully managed solutions like Zilliz prove even more advantageous, liberating you from operational challenges and enabling an exclusive focus on your core business activities.

</template>
<template #zh>

但对于要处理数亿级向量、要求实时响应的数据密集型业务，专用向量数据库才是首选。以 Milvus 为例，它轻松管理数十亿向量，查询速度闪电般快，功能丰富。更进一步，Zilliz 这样的全托管方案优势更明显——把你从运维难题中解放出来，让你得以专注于核心业务。

</template>
</BiRow>
