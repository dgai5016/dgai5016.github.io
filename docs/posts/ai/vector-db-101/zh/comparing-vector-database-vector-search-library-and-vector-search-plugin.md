# 理解向量数据库：向量数据库、向量搜索库与向量搜索插件对比

嘿，欢迎回到《Vector Database 101》！

[ChatGPT](https://zilliz.com/learn/ChatGPT-Vector-Database-Prompt-as-code) 等大语言模型（LLM）的爆火，带动了向量搜索技术的增长：既有 [Milvus](https://zilliz.com/what-is-milvus)、[Zilliz Cloud](https://zilliz.com/cloud) 这样的专用向量数据库，也有 [FAISS](https://zilliz.com/blog/set-up-with-facebook-ai-similarity-search-faiss) 这类向量搜索库，还有传统数据库内置的向量搜索插件。

在[上一篇](https://zilliz.com/learn/what-is-vector-database)中，我们深入讲了向量数据库的基础知识。本文将进一步理解向量数据库，继续探索纷繁复杂的向量搜索领域，对比向量数据库、向量搜索插件和向量搜索库。

## 什么是向量搜索？

[向量搜索](https://zilliz.com/learn/vector-similarity-search)又称向量相似度搜索，是一种从海量稠密向量数据中检索出与给定查询向量最相似或语义最相关的 top-k 结果的技术。在做相似度搜索之前，我们先用神经网络把文本、图片、视频、音频等[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)转换成高维数值向量，也就是嵌入向量（embedding vector）。生成嵌入向量之后，向量搜索引擎会比较输入查询向量与向量存储中各向量之间的空间距离——在空间中离得越近，就越相似。

市面上有多种向量搜索技术可选：Python NumPy 这类机器学习库、FAISS 这类向量搜索库、构建在传统数据库上的向量搜索插件，以及 Milvus 和 Zilliz Cloud 这样的专用向量数据库。

## 向量数据库 vs. 向量搜索库

[专用向量数据库](https://zilliz.com/blog/what-is-a-real-vector-database)并不是做相似度搜索的唯一技术栈。在向量数据库出现之前，FAISS、ScaNN、HNSW 等许多向量搜索库就被用于向量检索。

向量搜索库能帮你快速搭出一个高性能的向量搜索系统原型。以 FAISS 为例，它由 Meta 开发并开源，用于高效相似度搜索和稠密向量聚类。FAISS 可以处理任意规模的向量集合，哪怕是装不进内存的超大集合。此外，FAISS 还提供了用于评估和参数调优的工具。它虽然用 C++ 编写，但提供了 Python/NumPy 接口。

然而，向量搜索库只是轻量级的 ANN 库，而不是托管式方案，功能也有限。如果你的数据集小而有限，这些库足以支撑非结构化数据处理，甚至跑在生产环境的系统也没问题。但随着数据集变大、用户增多，扩展问题会越来越难解。更麻烦的是，它们不允许修改已建好的索引数据，导入数据期间也无法提供查询。

相比之下，向量数据库是存储和检索非结构化数据更优的方案。它能一边存储和查询数百万甚至数十亿条向量，一边提供实时响应；它还能高度扩展，满足用户不断增长的业务需求。

此外，Milvus 这样的向量数据库针对结构化/半结构化数据提供了丰富得多的用户友好特性：云原生、多租户、可扩展性等。随着本教程的深入，这些特性会一一清晰起来。

两者运作的抽象层级也完全不同——向量数据库是功能完备的服务，而 ANN 库是要被集成进你正在开发的应用里的组件。从这个意义上说，ANN 库是向量数据库赖以构建的众多组件之一，就像 Elasticsearch 构建在 Apache Lucene 之上一样。

举个例子说明这种抽象为什么重要：往向量数据库里插入一条新的非结构化数据。这在 Milvus 里超级简单：

```
from pymilvus import Collectioncollection = Collection('book')mr = collection.insert(data)
```

就是这么简单——3 行代码。可惜用 FAISS 或 ScaNN 这类库，没法轻松做到这一点，只能在某些检查点手动重建整个索引。就算能做到，向量搜索库依然缺可扩展性和多租户——这两项恰恰是向量数据库最重要的特性。

## 向量数据库 vs. 传统数据库的向量搜索插件

很好，既然已经弄清了向量搜索库和向量数据库的区别，再来看看向量数据库与**向量搜索插件**有何不同。

越来越多的传统关系数据库和搜索系统（如 Clickhouse、[Elasticsearch](https://zilliz.com/learn/elasticsearch-cloud-vs-zilliz)）开始内置向量搜索插件。以 Elasticsearch 8.0 为例，它包含向量插入和 ANN 搜索功能，可以通过 restful API 端点调用。向量搜索插件的问题一目了然——**这些方案没有从全栈角度对待嵌入管理和向量搜索**。它们只是现有架构之上的增强，因此能力受限、未做优化。在传统数据库上开发非结构化数据应用，就像往燃油车的车架里塞锂电池和电动机——不是个好主意！

为了说明原因，我们回到（第一部分列出的）向量数据库应实现的特性清单。向量搜索插件缺了其中两项：可调优性和用户友好的 API/SDK。我继续拿 Elasticsearch 的 ANN 引擎举例；其他向量搜索插件的玩法大同小异，就不再展开。Elasticsearch 通过 `dense_vector` 数据字段类型支持向量存储，并允许通过 `knnsearch endpoint` 查询：

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

Elasticsearch 的 ANN 插件只支持一种索引算法：层级可导航小世界（Hierarchical Navigable Small Worlds，HNSW）——我个人喜欢认为，它的创造者在普及「多元宇宙」这件事上抢在了漫威前面。不仅如此，它还只支持 L2/欧几里得距离这一种距离度量。作为起步这还算凑合，但拿它跟功能完备的向量数据库 Milvus 比一比。用 `pymilvus`：

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

[Elasticsearch 和 Milvus](https://zilliz.com/comparison/milvus-vs-elastic) 都能创建索引、插入嵌入向量并执行最近邻搜索，但从这些示例可以清楚地看到：Milvus 的向量搜索 API 更直观（面向用户的 API 更好用），对向量索引 + 距离度量的支持也更广（可调优性更好）。Milvus 还计划在未来支持更多向量索引，并允许通过类 SQL 语句查询，进一步提升可调优性和易用性。

这一节信息量不小。平心而论它确实偏长，给只扫了一眼的朋友来个太长不看版（tl;dr）：Milvus 优于向量搜索插件，因为 Milvus 从零开始就是按向量数据库设计的，特性更丰富，架构也更贴合非结构化数据。

## 如何在不同的向量搜索技术中做选择？

不是所有向量数据库都生而平等；每一种都有各自的独特之处，分别适配特定的应用场景。向量搜索库和插件用起来友好，适合处理百万级向量的小规模生产环境。如果你的数据量小、只需要基础的向量搜索功能，这些技术就足以满足你的业务。

但对于要处理数亿级向量、要求实时响应的数据密集型业务，专用向量数据库才是首选。以 Milvus 为例，它轻松管理数十亿向量，查询速度闪电般快，功能丰富。更进一步，Zilliz 这样的全托管方案优势更明显——把你从运维难题中解放出来，让你得以专注于核心业务。
