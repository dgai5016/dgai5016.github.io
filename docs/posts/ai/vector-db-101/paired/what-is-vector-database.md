<BiRow>
<template #en>

A vector database indexes and stores vector embeddings for fast retrieval and similarity search, with capabilities like CRUD operations, metadata filtering, and horizontal scaling designed specifically for AI applications.

</template>
<template #zh>

向量数据库负责对嵌入向量（embedding）进行索引和存储，以实现快速检索与相似性搜索，并专为 AI 应用提供了 CRUD 操作、元数据过滤、水平扩展等能力。

</template>
</BiRow>

<BiRow>
<template #en>

## Introduction: The Rise of Vector Databases in the AI Era

</template>
<template #zh>

## 引言：AI 时代向量数据库的崛起

</template>
</BiRow>

<BiRow>
<template #en>

In the early days of ImageNet, it took 25,000 human curators to manually label the dataset. This staggering number highlights a fundamental challenge in AI: manually categorizing unstructured data simply doesn’t scale. With billions of images, videos, documents, and audio files generated daily, a paradigm shift was needed in how computers understand and interact with content.

</template>
<template #zh>

在 ImageNet 的早期，光是给数据集打标签就动用了 25,000 名人工标注员。这个数字令人咂舌，也点出了 AI 的一个根本难题：靠人工给非结构化数据分类，根本没法规模化。每天产生的图片、视频、文档和音频数以十亿计，计算机理解和处理内容的方式必须来一场范式转变。

</template>
</BiRow>

<BiRow>
<template #en>

[Traditional relational database](https://zilliz.com/blog/relational-databases-vs-vector-databases) systems excel at managing structured data with predefined formats and executing precise search operations. In contrast, vector databases specialize in storing and retrieving [unstructured data ](https://zilliz.com/learn/introduction-to-unstructured-data)types, such as images, audio, videos, and textual content, through high-dimensional numerical representations known as vector embeddings. Vector databases support [large language models](https://zilliz.com/glossary/large-language-models-(llms)) by providing efficient data retrieval and management. Modern vector databases outperform traditional systems by 2-10x through hardware-aware optimization (AVX512, SIMD, GPUs, NVMe SSDs), highly optimized search algorithms (HNSW, IVF, DiskANN), and column-oriented storage design. Their cloud-native, decoupled architecture enables independent scaling of search, data insertion, and indexing components, allowing systems to efficiently handle billions of vectors while maintaining performance for enterprise AI applications at companies like Salesforce, PayPal, eBay, and NVIDIA.

</template>
<template #zh>

[传统关系型数据库](https://zilliz.com/blog/relational-databases-vs-vector-databases)擅长管理格式预定义的结构化数据、执行精确的查询操作。向量数据库则另辟蹊径：它把图像、音频、视频、文本这类[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)转换成称为嵌入向量的高维数值表示，专精于它们的存储与检索。向量数据库通过高效的数据检索和管理能力，为[大语言模型](https://zilliz.com/glossary/large-language-models-(llms))提供支撑。得益于硬件感知优化（AVX512、SIMD、GPU、NVMe SSD）、高度优化的搜索算法（层级可导航小世界图 HNSW、倒排文件索引 IVF、磁盘近似最近邻 DiskANN），以及列式存储设计，现代向量数据库的性能可达传统系统的 2-10 倍。其云原生的解耦架构让搜索、数据写入和索引组件可以独立扩展，使系统能够高效处理数十亿级向量，同时在 Salesforce、PayPal、eBay、NVIDIA 这类企业的 AI 应用中保持稳定性能。

</template>
</BiRow>

<BiRow>
<template #en>

This represents what experts call a “semantic gap”—traditional databases operate on exact matches and predefined relationships, while human understanding of content is nuanced, contextual, and multidimensional. This gap becomes increasingly problematic as AI applications demand:

</template>
<template #zh>

这就是专家所说的「语义鸿沟」——传统数据库靠精确匹配和预定义关系运作，而人类对内容的理解是细腻的、依赖上下文的、多维度的。随着 AI 应用不断提出下面这些需求，这道鸿沟正变得越来越碍事：

</template>
</BiRow>

<BiRow>
<template #en>

- Finding conceptual similarities rather than exact matches
- Understanding contextual relationships between different pieces of content
- Capturing the semantic essence of information beyond keywords
- Processing multimodal data within a unified framework

</template>
<template #zh>

- 找到概念上的相似，而不只是精确匹配
- 理解不同内容之间的上下文关联
- 超越关键词，捕捉信息的语义本质
- 在统一框架内处理多模态数据

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases have emerged as the critical technology to bridge this gap, becoming an essential component in the modern AI infrastructure. They enhance the performance of machine learning models by facilitating tasks like clustering and classification.

</template>
<template #zh>

向量数据库正是为弥合这道鸿沟而生的关键技术，如今已成为现代 AI 基础设施中不可或缺的一环。它通过支撑聚类、分类等任务，让机器学习模型的表现更上一层楼。

</template>
</BiRow>

<BiRow>
<template #en>

## Understanding Vector Embeddings: The Foundation

</template>
<template #zh>

## 理解嵌入向量：一切的基石

</template>
</BiRow>

<BiRow>
<template #en>

[Vector embeddings](https://zilliz.com/glossary/vector-embeddings) serve as the critical bridge across the semantic gap. These high-dimensional numerical representations capture the semantic essence of unstructured data in a form computers can efficiently process. Modern embedding models transform raw content—whether text, images, or audio—into dense vectors where similar concepts cluster together in the vector space, regardless of surface-level differences.

</template>
<template #zh>

[嵌入向量](https://zilliz.com/glossary/vector-embeddings)就是横跨语义鸿沟的关键桥梁。这种高维数值表示把非结构化数据的语义本质，转化为计算机能高效处理的形式。现代嵌入模型可以把原始内容——文本、图像、音频都行——转换成稠密向量，让相似的概念在向量空间中聚在一起，哪怕表面形式截然不同。

</template>
</BiRow>

<BiRow>
<template #en>

For example, properly constructed embeddings would position concepts like “automobile,” “car,” and “vehicle” in proximity within the vector space, despite having different lexical forms. This property enables [semantic search](https://zilliz.com/glossary/semantic-search), [recommendation systems](https://zilliz.com/vector-database-use-cases/recommender-system), and AI applications to understand content beyond simple pattern matching.

</template>
<template #zh>

举个例子，构建得当的嵌入向量会把 "automobile"、"car"、"vehicle" 这几个词放在向量空间中彼此邻近的位置，尽管它们的字面形式各不相同。正是这一特性，让[语义搜索](https://zilliz.com/glossary/semantic-search)、[推荐系统](https://zilliz.com/vector-database-use-cases/recommender-system)和各类 AI 应用能够超越简单的模式匹配去理解内容。

</template>
</BiRow>

<BiRow>
<template #en>

The power of embeddings extends across modalities. Advanced vector databases support various unstructured data types—text, images, audio—in a unified system, enabling cross-modal searches and relationships that were previously impossible to model efficiently. These vector database capabilities are crucial for AI-driven technologies such as chatbots and image recognition systems, supporting advanced applications like semantic search and recommendation systems.

</template>
<template #zh>

嵌入向量的威力还能跨越模态。先进的向量数据库可以在统一系统里支持多种非结构化数据——文本、图像、音频——实现以前难以高效建模的跨模态搜索与关联。这些能力对聊天机器人、图像识别系统这类 AI 驱动的技术至关重要，支撑着语义搜索、推荐系统等高级应用。

</template>
</BiRow>

<BiRow>
<template #en>

However, storing, indexing, and retrieving embeddings at scale presents unique computational challenges that traditional databases weren’t built to address.

</template>
<template #zh>

不过，要对海量嵌入向量进行存储、索引和检索，会带来一类独特的计算挑战——这恰恰是传统数据库从未被设计去解决的问题。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector Databases: Core Concepts

</template>
<template #zh>

## 向量数据库：核心概念

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases represent a paradigm shift in how we store and query unstructured data. Unlike traditional relational database systems that excel at managing structured data with predefined formats, vector databases specialize in handling unstructured data through numerical vector representations.

</template>
<template #zh>

向量数据库代表着我们存储和查询非结构化数据方式的一场范式转变。与擅长管理预定义格式结构化数据的传统关系型数据库不同，向量数据库专注于通过数值向量表示来处理非结构化数据。

</template>
</BiRow>

<BiRow>
<template #en>

At their core, vector databases are designed to solve a fundamental problem: enabling efficient similarity searches across massive datasets of unstructured data. They accomplish this through three key components:

</template>
<template #zh>

说到底，向量数据库要解决的是一个根本问题：如何在海量非结构化数据集上实现高效的相似性搜索。它靠三个关键组件达成目标：

</template>
</BiRow>

<BiRow>
<template #en>

**Vector Embeddings**: High-dimensional numerical representations that capture semantic meaning of unstructured data (text, images, audio, etc.)

</template>
<template #zh>

**嵌入向量**：捕捉非结构化数据（文本、图像、音频等）语义含义的高维数值表示

</template>
</BiRow>

<BiRow>
<template #en>

**Specialized Indexing**: Algorithms optimized for high-dimensional vector spaces that enable fast approximate searches. Vector database indexes vectors to enhance the speed and efficiency of similarity searches, utilizing various ML algorithms to create indexes on vector embeddings.

</template>
<template #zh>

**专用索引**：针对高维向量空间优化的算法，支持快速近似搜索。向量数据库会对向量建索引来提升相似性搜索的速度与效率，利用多种机器学习算法在嵌入向量上构建索引。

</template>
</BiRow>

<BiRow>
<template #en>

[**Distance Metrics**](https://zilliz.com/blog/similarity-metrics-for-vector-search): Mathematical functions that quantify similarity between vectors

</template>
<template #zh>

[**距离度量**](https://zilliz.com/blog/similarity-metrics-for-vector-search)：量化向量之间相似程度的数学函数

</template>
</BiRow>

<BiRow>
<template #en>

The primary operation in a vector database is the [k-nearest neighbors](https://zilliz.com/blog/k-nearest-neighbor-algorithm-for-machine-learning) (KNN) query, which finds the k vectors most similar to a given query vector. For large-scale applications, these databases typically implement [approximate nearest neighbor](https://zilliz.com/glossary/anns) (ANN) algorithms, trading a small amount of accuracy for significant gains in search speed.

</template>
<template #zh>

向量数据库最主要的操作是 [k 近邻](https://zilliz.com/blog/k-nearest-neighbor-algorithm-for-machine-learning)（KNN）查询——找出与给定查询向量最相似的 k 个向量。在大规模应用中，这类数据库通常采用[近似最近邻](https://zilliz.com/glossary/anns)（ANN）算法，用一点点精度换取搜索速度的大幅提升。

</template>
</BiRow>

<BiRow>
<template #en>

### Mathematical Foundations of Vector Similarity

</template>
<template #zh>

### 向量相似性的数学基础

</template>
</BiRow>

<BiRow>
<template #en>

Understanding vector databases requires grasping the mathematical principles behind vector similarity. Here are the foundational concepts:

</template>
<template #zh>

要理解向量数据库，就得先弄懂向量相似性背后的数学原理。下面是几个基础概念：

</template>
</BiRow>

<BiRow>
<template #en>

### Vector Spaces and Embeddings

</template>
<template #zh>

### 向量空间与嵌入向量

</template>
</BiRow>

<BiRow>
<template #en>

A [vector embedding](https://zilliz.com/learn/everything-you-should-know-about-vector-embeddings) is a fixed-length array of floating-point numbers (they can range from 100-32,768 dimensions!) that represents unstructured data in a numerical format. These embeddings position similar items closer together in a high-dimensional vector space.

</template>
<template #zh>

[嵌入向量](https://zilliz.com/learn/everything-you-should-know-about-vector-embeddings)是一个固定长度的浮点数数组（维度可以从 100 维一路飙到 32,768 维！），用数值形式表示非结构化数据。这些嵌入会把相似的条目放到高维向量空间中更近的位置。

</template>
</BiRow>

<BiRow>
<template #en>

For example, the words "king" and "queen" would have vector representations that are closer to each other than either is to "automobile" in a well-trained word embedding space.

</template>
<template #zh>

举个例子，在一个训练有素的词嵌入空间里，"king" 和 "queen" 的向量表示会彼此靠近，而它们与 "automobile" 的距离都远得多。

</template>
</BiRow>

<BiRow>
<template #en>

### Distance Metrics

</template>
<template #zh>

### 距离度量

</template>
</BiRow>

<BiRow>
<template #en>

The choice of distance metric fundamentally affects how similarity is calculated. Common distance metrics include:

</template>
<template #zh>

距离度量的选择从根本上决定了相似性的计算方式。常见的距离度量包括：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Euclidean Distance**: The straight-line distance between two points in Euclidean space.
2. **Cosine Similarity**: Measures the cosine of the angle between two vectors, focusing on orientation rather than magnitude
3. **Dot Product**: For normalized vectors, represents how aligned two vectors are.
4. **Manhattan Distance (L1 Norm)**: Sum of absolute differences between coordinates.

</template>
<template #zh>

1. **欧氏距离（Euclidean Distance）**：欧氏空间中两点之间的直线距离。
2. **余弦相似度（Cosine Similarity）**：衡量两个向量夹角的余弦值，关注方向而非大小
3. **点积（Dot Product）**：对归一化向量而言，表示两个向量的对齐程度。
4. **曼哈顿距离（Manhattan Distance，L1 范数）**：各坐标差值的绝对值之和。

</template>
</BiRow>

<BiRow>
<template #en>

Different use cases may require different distance metrics. For example, cosine similarity often works well for text embeddings, while Euclidean distance may be better suited for certain types of [image embeddings](https://zilliz.com/learn/image-embeddings-for-enhanced-image-search).

</template>
<template #zh>

不同场景可能需要不同的距离度量。比如余弦相似度通常很适合文本嵌入，而欧氏距离可能更契合某些类型的[图像嵌入](https://zilliz.com/learn/image-embeddings-for-enhanced-image-search)。

</template>
</BiRow>

<BiRow>
<template #en>

[Semantic similarity](https://zilliz.com/glossary/semantic-similarity) between vectors in a vector space

</template>
<template #zh>

向量空间中向量之间的[语义相似性](https://zilliz.com/glossary/semantic-similarity)

</template>
</BiRow>

<BiRow>
<template #en>

![Semantic similarity between vectors in a vector space](/vector-db-images/what-is-vector-database-01.png)
Semantic similarity between vectors in a vector space

</template>
<template #zh>

![Semantic similarity between vectors in a vector space](/vector-db-images/what-is-vector-database-01.png)
向量空间中向量之间的语义相似性

</template>
</BiRow>

<BiRow>
<template #en>

Understanding these mathematical foundations leads to an important question about implementation: So just add a vector index to any database, right?

</template>
<template #zh>

理解了这些数学基础，自然会引出一个关于实现的重要问题：那随便给哪个数据库加个向量索引不就行了？

</template>
</BiRow>

<BiRow>
<template #en>

Simply adding a vector index to a relational database isn't sufficient, nor is using a standalone [vector index library](https://zilliz.com/learn/comparing-vector-database-vector-search-library-and-vector-search-plugin). While vector indices provide the critical ability to find similar vectors efficiently, they lack the infrastructure needed for production applications:

</template>
<template #zh>

只给关系型数据库加个向量索引并不够，用一个独立的[向量索引库](https://zilliz.com/learn/comparing-vector-database-vector-search-library-and-vector-search-plugin)也不行。向量索引虽然提供了高效查找相似向量这一关键能力，却缺少生产应用所需的基础设施：

</template>
</BiRow>

<BiRow>
<template #en>

- They don't provide CRUD operations for managing vector data
- They lack metadata storage and filtering capabilities
- They offer no built-in scaling, replication, or fault tolerance
- They require custom infrastructure for data persistence and management

</template>
<template #zh>

- 它们不提供用于管理向量数据的 CRUD 操作
- 它们缺少元数据存储与过滤能力
- 它们没有内置的扩展、复制或容错机制
- 它们需要自建基础设施来做数据持久化和管理

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases emerged to address these limitations, providing complete data management capabilities designed specifically for vector embeddings. They combine the semantic power of vector search with the operational capabilities of database systems.

</template>
<template #zh>

向量数据库正是为解决这些短板而生：它提供专为嵌入向量设计的完整数据管理能力，把向量搜索的语义威力与数据库系统的运维能力合二为一。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike traditional databases that operate on exact matches, vector databases focus on semantic search—finding vectors that are "most similar" to a query vector according to specific distance metrics. This fundamental difference drives the unique architecture and algorithms that power these specialized systems.

</template>
<template #zh>

传统数据库靠精确匹配运作，向量数据库则专注于语义搜索——按照特定距离度量找出与查询向量「最相似」的向量。正是这一根本差异，驱动了这类专用系统独特的架构与算法。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector Database Architecture: A Technical Framework

</template>
<template #zh>

## 向量数据库架构：技术框架

</template>
</BiRow>

<BiRow>
<template #en>

Modern vector databases implement a sophisticated multi-layered architecture that separates concerns, enables scalability, and ensures maintainability. This technical framework goes far beyond simple search indices to create systems capable of handling production AI workloads. Vector databases work by processing and retrieving information for AI and ML applications, utilizing algorithms for approximate nearest neighbor searches, converting various types of raw data into vectors, and efficiently managing diverse data types through semantic searches.

</template>
<template #zh>

现代向量数据库采用精细的多层架构：关注点分离、可扩展、易维护。这套技术框架远不止简单的搜索索引，它打造的是能扛住生产级 AI 负载的系统。向量数据库的工作方式是：为 AI 和机器学习应用处理与检索信息，利用近似最近邻搜索算法，把各类原始数据转换成向量，并通过语义搜索高效管理多样化数据。

</template>
</BiRow>

<BiRow>
<template #en>

### Four-Tier Architecture

</template>
<template #zh>

### 四层架构

</template>
</BiRow>

<BiRow>
<template #en>

A production vector database typically consists of four primary architectural layers:

</template>
<template #zh>

一个生产级向量数据库通常由四个主要架构层组成：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Storage Layer**: Manages persistent storage of vector data and metadata, implements specialized encoding and compression strategies, and optimizes I/O patterns for vector-specific access.
2. **Index Layer**: Maintains multiple indexing algorithms, manages their creation and updates, and implements hardware-specific optimizations for performance.
3. **Query Layer**: Processes incoming queries, determines execution strategies, handles result processing, and implements caching for repeated queries.
4. **Service Layer**: Manages client connections, handles request routing, provides monitoring and logging, and implements security and multi-tenancy.

</template>
<template #zh>

1. **存储层**：管理向量数据与元数据的持久化存储，实现专门的编码与压缩策略，并针对向量特有的访问模式优化 I/O。
2. **索引层**：维护多种索引算法，管理它们的创建与更新，并实现面向特定硬件的性能优化。
3. **查询层**：处理传入查询，决定执行策略，负责结果处理，并为重复查询实现缓存。
4. **服务层**：管理客户端连接，处理请求路由，提供监控与日志，并实现安全与多租户。

</template>
</BiRow>

<BiRow>
<template #en>

### Vector Search Workflow

</template>
<template #zh>

### 向量搜索工作流程

</template>
</BiRow>

<BiRow>
<template #en>

![Complete workflow of a vector search operation.png](/vector-db-images/what-is-vector-database-02.png)
Complete workflow of a vector search operation.png

</template>
<template #zh>

![Complete workflow of a vector search operation.png](/vector-db-images/what-is-vector-database-02.png)
向量搜索操作的完整工作流程.png

</template>
</BiRow>

<BiRow>
<template #en>

A typical vector database implementation follows this workflow:

</template>
<template #zh>

一个典型的向量数据库实现遵循这样的工作流程：

</template>
</BiRow>

<BiRow>
<template #en>

1. A machine learning model transforms unstructured data (text, images, audio) into vector embeddings
2. These vector embeddings are stored in the database along with relevant metadata
3. When a user performs a query, it is converted into a vector embedding using the *same* model
4. The database compares the query vector to stored vectors using an approximate nearest neighbor algorithm
5. The system returns the top-K most relevant results based on vector similarity
6. Optional post-processing may apply additional filters or reranking

</template>
<template #zh>

1. 机器学习模型把非结构化数据（文本、图像、音频）转换成嵌入向量
2. 这些嵌入向量连同相关元数据一起存入数据库
3. 用户发起查询时，查询会被用*同一个*模型转换成嵌入向量
4. 数据库用近似最近邻算法把查询向量与已存储的向量进行比对
5. 系统按向量相似度返回最相关的 top-K 结果
6. 可选的后处理可以再叠加过滤或重排序

</template>
</BiRow>

<BiRow>
<template #en>

This pipeline enables efficient semantic search across massive collections of unstructured data that would be impossible with traditional database approaches.

</template>
<template #zh>

这条流水线让海量非结构化数据集上的高效语义搜索成为可能——用传统数据库的方法根本做不到。

</template>
</BiRow>

<BiRow>
<template #en>

#### Consistency in Vector Databases

</template>
<template #zh>

#### 向量数据库中的一致性

</template>
</BiRow>

<BiRow>
<template #en>

Ensuring consistency in distributed vector databases is a challenge due to the trade-off between performance and correctness. While eventual consistency is common in large-scale systems, strong consistency models are required for mission-critical applications like fraud detection and real-time recommendations. Techniques like quorum-based writes and distributed consensus (e.g., [Raft](https://zilliz.com/learn/raft-or-not), Paxos) ensure data integrity without excessive performance trade-offs.

</template>
<template #zh>

在分布式向量数据库里保证一致性是个难题，因为性能和正确性之间要权衡。大规模系统常用最终一致性，但欺诈检测、实时推荐这类关键任务应用需要强一致性模型。基于仲裁的写入和分布式共识（如 [Raft](https://zilliz.com/learn/raft-or-not)、Paxos）等技术，可以在不过度牺牲性能的前提下确保数据完整性。

</template>
</BiRow>

<BiRow>
<template #en>

Production implementations adopt a shared-storage architecture featuring storage and computing disaggregation. This separation follows the principle of data plane and control plane disaggregation, with each layer being independently scalable for optimal resource utilization.

</template>
<template #zh>

生产级实现采用共享存储架构，主打存算分离。这种分离遵循数据面与控制面解耦的原则，每一层都可以独立扩展，实现资源利用最优化。

</template>
</BiRow>

<BiRow>
<template #en>

### Managing Connections, Security, and Multitenancy

</template>
<template #zh>

### 管理连接、安全与多租户

</template>
</BiRow>

<BiRow>
<template #en>

As these databases are used in multi-user and multi-tenant environments, securing data and managing access control are critical for maintaining confidentiality.

</template>
<template #zh>

这类数据库运行在多用户、多租户环境中，保护数据安全、管好访问控制，对守住机密性至关重要。

</template>
</BiRow>

<BiRow>
<template #en>

Security measures like encryption (both at rest and in transit) protect sensitive data, such as embeddings and metadata. Authentication and authorization ensure only authorized users can access the system, with fine-grained permissions for managing access to specific data.

</template>
<template #zh>

加密（无论静态存储还是传输过程中）等安全措施保护着嵌入向量、元数据这类敏感数据。认证与授权确保只有获准的用户才能访问系统，并通过细粒度权限管理对特定数据的访问。

</template>
</BiRow>

<BiRow>
<template #en>

Access control defines roles and permissions to restrict data access. This is particularly important for databases storing sensitive information like customer data or proprietary AI models.

</template>
<template #zh>

访问控制通过定义角色和权限来限制数据访问。对于存储客户数据、自研 AI 模型等敏感信息的数据库来说，这一点尤其重要。

</template>
</BiRow>

<BiRow>
<template #en>

Multitenancy involves isolating each tenant's data to prevent unauthorized access while enabling resource sharing. This is achieved through sharding, partitioning, or row-level security to ensure scalable and secure access for different teams or clients.

</template>
<template #zh>

多租户要做的是隔离每个租户的数据以防越权访问，同时允许资源共享。具体靠分片、分区或行级安全来实现，确保不同团队或客户既能扩展又安全地访问。

</template>
</BiRow>

<BiRow>
<template #en>

External identity and access management (IAM) systems integrate with vector databases to enforce security policies and ensure compliance with industry standards.

</template>
<template #zh>

外部身份与访问管理（IAM）系统可与向量数据库集成，强制执行安全策略，确保符合行业标准。

</template>
</BiRow>

<BiRow>
<template #en>

## Advantages of Vector Databases

</template>
<template #zh>

## 向量数据库的优势

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases offer several advantages over traditional databases, making them an ideal choice for handling vector data. Here are some of the key benefits:

</template>
<template #zh>

相比传统数据库，向量数据库有若干优势，是处理向量数据的理想选择。下面是几个关键好处：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Efficient Similarity Search**: One of the standout features of vector databases is their ability to perform efficient semantic searches. Unlike traditional databases that rely on exact matches, vector databases excel at finding data points that are similar to a given query vector. This capability is crucial for applications like recommendation systems, where finding items similar to a user’s past interactions can significantly enhance user experience.
2. **Handling High-Dimensional Data**: Vector databases are specifically designed to manage high-dimensional data efficiently. This makes them particularly suitable for applications in natural language processing, [computer vision](https://zilliz.com/learn/what-is-computer-vision), and genomics, where data often exists in high-dimensional spaces. By leveraging advanced indexing and search algorithms, vector databases can quickly retrieve relevant data points, even in complex, vector embedding datasets.
3. **Scalability**: Scalability is a critical requirement for modern AI applications, and vector databases are built to scale efficiently. Whether dealing with millions or billions of vectors, vector databases can handle the growing demands of AI applications through horizontal scaling. This ensures that performance remains consistent even as data volumes increase.
4. **Flexibility**: Vector databases offer remarkable flexibility in terms of data representation. They can store and manage various types of data, including numerical features, embeddings from text or images, and even complex data like molecular structures. This versatility makes vector databases a powerful tool for a wide range of applications, from text analysis to scientific research.
5. **Real-time Applications**: Many vector databases are optimized for real-time or near-real-time querying. This is particularly important for applications that require quick responses, such as fraud detection, real-time recommendations, and interactive AI systems. The ability to perform rapid similarity searches ensures that these applications can deliver timely and relevant results.

</template>
<template #zh>

1. **高效的相似性搜索**：向量数据库最亮眼的能力之一就是高效执行语义搜索。不同于依赖精确匹配的传统数据库，向量数据库最擅长找出与给定查询向量相似的数据点。这项能力对推荐系统这类应用至关重要——找到与用户历史行为相似的物品，能显著提升用户体验。
2. **处理高维数据**：向量数据库专为高效管理高维数据而设计。这让它特别适合自然语言处理、[计算机视觉](https://zilliz.com/learn/what-is-computer-vision)和基因组学等数据常驻高维空间的应用。借助先进的索引与搜索算法，即便在复杂的嵌入向量数据集里，向量数据库也能快速检索出相关数据点。
3. **可扩展性**：可扩展性是现代 AI 应用的硬需求，而向量数据库天生为高效扩展而建。无论是百万级还是十亿级向量，向量数据库都能通过水平扩展应对 AI 应用不断增长的需求，确保数据量上涨时性能依然稳定。
4. **灵活性**：向量数据库在数据表示上相当灵活。它能存储和管理多种类型的数据——数值特征、来自文本或图像的嵌入向量，甚至分子结构这类复杂数据。这种多面手特质让向量数据库成为从文本分析到科学研究等众多应用的强大工具。
5. **实时应用**：许多向量数据库针对实时或近实时查询做了优化。这对需要快速响应的应用尤其重要，比如欺诈检测、实时推荐和交互式 AI 系统。快速相似性搜索的能力，确保这些应用能交出及时又相关的结果。

</template>
</BiRow>

<BiRow>
<template #en>

## Use Cases for Vector Databases

</template>
<template #zh>

## 向量数据库的用例

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases have a wide range of applications across various industries, demonstrating their versatility and power. Here are some notable use cases:

</template>
<template #zh>

向量数据库在各行各业都有广泛用途，充分展现了它的多面性和实力。下面是一些典型用例：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Natural Language Processing**: In the realm of natural language processing (NLP), vector databases play a crucial role. They are used for tasks such as text classification, sentiment analysis, and language translation. By converting text into high-dimensional vector embeddings, vector databases enable efficient similarity searches and semantic understanding, enhancing the performance of [NLP models](https://zilliz.com/learn/7-nlp-models).
2. **Computer Vision**: Vector databases are also widely used in computer vision applications. Tasks like image recognition, [object detection](https://zilliz.com/learn/what-is-object-detection), and image segmentation benefit from the ability of vector databases to handle high-dimensional image embeddings. This allows for quick and accurate retrieval of visually similar images, making vector databases indispensable in fields like autonomous driving, medical imaging, and digital asset management.
3. **Genomics**: In genomics, vector databases are used to store and analyze genetic sequences, protein structures, and other molecular data. The high-dimensional nature of this data makes vector databases an ideal choice for managing and querying large genomic datasets. Researchers can perform vector searches to find genetic sequences with similar patterns, aiding in the discovery of genetic markers and the understanding of complex biological processes.
4. **Recommendation Systems**: Vector databases are a cornerstone of modern recommendation systems. By storing user interactions and item features as vector embeddings, these databases can quickly identify items that are similar to those a user has previously interacted with. This capability enhances the accuracy and relevance of recommendations, improving user satisfaction and engagement.
5. **Chatbots and Virtual Assistants**: Vector databases are used in chatbots and virtual assistants to provide real-time contextual answers to user queries. By converting user inputs into vector embeddings, these systems can perform similarity searches to find the most relevant responses. This enables chatbots and virtual assistants to deliver more accurate and contextually appropriate answers, enhancing the overall user experience.

</template>
<template #zh>

1. **自然语言处理**：在自然语言处理（NLP）领域，向量数据库扮演着关键角色。它被用于文本分类、情感分析、机器翻译等任务。通过把文本转换成高维嵌入向量，向量数据库实现了高效的相似性搜索与语义理解，让 [NLP 模型](https://zilliz.com/learn/7-nlp-models)表现更佳。
2. **计算机视觉**：向量数据库在计算机视觉应用中同样广受欢迎。图像识别、[目标检测](https://zilliz.com/learn/what-is-object-detection)和图像分割等任务，都受益于向量数据库处理高维图像嵌入的能力。由此可以快速而精准地检索视觉相似的图片，让向量数据库在自动驾驶、医学影像、数字资产管理等领域不可或缺。
3. **基因组学**：在基因组学中，向量数据库用来存储和分析基因序列、蛋白质结构等分子数据。这类数据的高维特性让向量数据库成为管理和查询大型基因组数据集的理想选择。研究者可以通过向量搜索找出模式相似的基因序列，助力遗传标记的发现和复杂生物过程的理解。
4. **推荐系统**：向量数据库是现代推荐系统的基石。把用户交互和物品特征存为嵌入向量后，数据库就能快速找出与用户此前互动过的物品相似的对象。这一能力提升了推荐的准确度和相关性，让用户更满意、更愿意参与。
5. **聊天机器人与虚拟助手**：向量数据库用于聊天机器人和虚拟助手，为用户查询提供实时的上下文相关回答。把用户输入转换成嵌入向量后，这些系统可以执行相似性搜索，找出最相关的回复。这让聊天机器人和虚拟助手给出更准确、更贴合语境的回答，整体用户体验随之提升。

</template>
</BiRow>

<BiRow>
<template #en>

By leveraging the unique capabilities of vector databases, organizations across various industries can build more intelligent, responsive, and scalable AI applications.

</template>
<template #zh>

借助向量数据库的独特能力，各行各业的组织都能构建更智能、更敏捷、更可扩展的 AI 应用。

</template>
</BiRow>

<BiRow>
<template #en>

## Vector Search Algorithms: From Theory to Practice

</template>
<template #zh>

## 向量搜索算法：从理论到实践

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases require specialized indexing [algorithms](https://zilliz.com/learn/vector-index) to enable efficient similarity search in high-dimensional spaces. The algorithm selection directly impacts accuracy, speed, memory usage, and scalability.

</template>
<template #zh>

向量数据库需要专门的索引[算法](https://zilliz.com/learn/vector-index)，才能在高维空间中实现高效相似性搜索。算法选择直接影响准确率、速度、内存占用和可扩展性。

</template>
</BiRow>

<BiRow>
<template #en>

### Graph-Based Approaches

</template>
<template #zh>

### 基于图的方法

</template>
</BiRow>

<BiRow>
<template #en>

**HNSW (**[**Hierarchical Navigable Small World**](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)**)** creates navigable structures by connecting similar vectors, enabling efficient traversal during search. HNSW limits maximum connections per node and search scope to balance performance and accuracy, making it one of the most widely used algorithms for vector similarity search.

</template>
<template #zh>

**HNSW（**[**层级可导航小世界图**](https://zilliz.com/learn/hierarchical-navigable-small-worlds-HNSW)**）**通过连接相似的向量来构建可导航结构，让搜索过程中的遍历高效进行。HNSW 会限制每个节点的最大连接数和搜索范围，以平衡性能与准确率，这让它成为向量相似性搜索中应用最广的算法之一。

</template>
</BiRow>

<BiRow>
<template #en>

**Cagra** is a graph-based index optimized specifically for GPU acceleration. It constructs navigable graph structures that align with GPU processing patterns, enabling massively parallel vector comparisons. What makes Cagra particularly effective is its ability to balance recall and performance through configurable parameters like graph degree and search width. Using inference-grade GPUs with Cagra can be more cost-effective than expensive training-grade hardware while still delivering high throughput, especially for large-scale vector collections. However, it's worth noting that GPU indexes like Cagra may not necessarily reduce latency compared to CPU indexes unless operating under high query pressure.

</template>
<template #zh>

**Cagra** 是专门为 GPU 加速优化的图索引。它构建的可导航图结构与 GPU 的处理模式高度契合，能实现大规模并行的向量比对。Cagra 特别有效的一点在于，可以通过图度数、搜索宽度等可配置参数，在召回率与性能之间取得平衡。用推理级 GPU 跑 Cagra，往往比昂贵的训练级硬件更划算，同时还能保持高吞吐量——对大规模向量集合尤其如此。不过要注意，除非在高查询压力下运行，Cagra 这类 GPU 索引相比 CPU 索引未必能降低延迟。

</template>
</BiRow>

<BiRow>
<template #en>

### Quantization Techniques

</template>
<template #zh>

### 量化技术

</template>
</BiRow>

<BiRow>
<template #en>

[**Product Quantization (PQ)**](https://zilliz.com/learn/scalar-quantization-and-product-quantization) decomposes high-dimensional vectors into smaller subvectors, quantizing each separately. This significantly reduces storage needs (often by 90%+) but introduces some accuracy loss.

</template>
<template #zh>

[**乘积量化（Product Quantization，PQ）**](https://zilliz.com/learn/scalar-quantization-and-product-quantization)把高维向量分解成更小的子向量，再分别量化。这能显著降低存储需求（通常能省 90% 以上），但会带来一些精度损失。

</template>
</BiRow>

<BiRow>
<template #en>

**Scalar Quantization (SQ)** converts 32-bit floats to 8-bit integers, reducing memory usage by 75% with minimal accuracy impact.

</template>
<template #zh>

**标量量化（Scalar Quantization，SQ）**把 32 位浮点数转换成 8 位整数，内存占用直降 75%，精度影响微乎其微。

</template>
</BiRow>

<BiRow>
<template #en>

### On-Disk Indexing: Cost-Effective Scaling

</template>
<template #zh>

### 磁盘索引：更省钱的扩展方式

</template>
</BiRow>

<BiRow>
<template #en>

For large-scale vector collections (100M+ vectors), in-memory indexes become prohibitively expensive. For example, 100 million 1024-dimensional vectors would require approximately 400GB of RAM. This is where on-disk indexing algorithms like DiskANN provide significant cost benefits.

</template>
<template #zh>

对大规模向量集合（1 亿条以上）来说，纯内存索引的成本会高得离谱。举个例子：1 亿条 1024 维向量大约需要 400GB 内存。这正是 DiskANN 这类磁盘索引算法发挥成本优势的地方。

</template>
</BiRow>

<BiRow>
<template #en>

[DiskANN](https://zilliz.com/learn/DiskANN-and-the-Vamana-Algorithm), based on the Vamana graph algorithm, enables efficient disk-based vector search while storing most of the index on NVMe SSDs rather than RAM. This approach offers several cost advantages:

</template>
<template #zh>

[DiskANN](https://zilliz.com/learn/DiskANN-and-the-Vamana-Algorithm) 基于 Vamana 图算法，把索引的大部分存放在 NVMe SSD 而非内存中，实现了高效的磁盘向量搜索。这种方式带来多重成本优势：

</template>
</BiRow>

<BiRow>
<template #en>

- **Reduced hardware costs**: Organizations can deploy vector search at scale using commodity hardware with modest RAM configurations
- **Lower operational expenses**: Less RAM means lower power consumption and cooling costs in data centers
- **Linear cost scaling**: Memory costs scale linearly with data volume, while performance remains relatively stable
- **Optimized I/O patterns**: DiskANN's specialized design minimizes disk reads through careful graph traversal strategies

</template>
<template #zh>

- **硬件成本更低**：企业用内存配置适中的通用服务器，就能大规模部署向量搜索
- **运营开销更小**：内存少了，数据中心的耗电和散热成本随之下降
- **成本线性增长**：内存成本随数据量线性增长，性能却保持相对稳定
- **优化的 I/O 模式**：DiskANN 的专门设计通过精细的图遍历策略，把磁盘读取压到最少

</template>
</BiRow>

<BiRow>
<template #en>

The trade-off is typically a modest increase in query latency (often just 2-3ms) compared to purely in-memory approaches, which is acceptable for many production use cases.

</template>
<template #zh>

代价通常是查询延迟略有增加（与纯内存方案相比往往只多 2-3ms），对许多生产场景来说完全可以接受。

</template>
</BiRow>

<BiRow>
<template #en>

### Specialized Index Types

</template>
<template #zh>

### 专用索引类型

</template>
</BiRow>

<BiRow>
<template #en>

**Binary Embedding Indexes** are specialized for computer vision, image fingerprinting, and recommendation systems where data can be represented as binary features. These indexes serve different application needs. For image deduplication, digital watermarking, and copyright detection where exact matching is critical, optimized binary indexes provide precise similarity detection. For high-throughput recommendation systems, content-based image retrieval, and large-scale feature matching where speed is prioritized over perfect recall, binary indexes offer exceptional performance advantages.

</template>
<template #zh>

**二进制嵌入索引**专为计算机视觉、图像指纹和推荐系统等数据可表示为二进制特征的场景打造。这类索引服务于不同的应用需求：在图像去重、数字水印和版权检测这类精确匹配至关重要的场景，优化过的二进制索引能提供精准的相似性检测；在高吞吐推荐系统、基于内容的图像检索和大规模特征匹配这类速度优先于完美召回率的场景，二进制索引则展现出非凡的性能优势。

</template>
</BiRow>

<BiRow>
<template #en>

**Sparse Vector Indexes** are optimized for vectors where most elements are zero, with only a few non-zero values. Unlike dense vectors (where most or all dimensions contain meaningful values), sparse vectors efficiently represent data with many dimensions but few active features. This representation is particularly common in text processing where a document might use only a small subset of all possible words in a vocabulary. Sparse Vector Indexes excel in natural language processing tasks like semantic document search, full-text querying, and topic modeling. These indexes are particularly valuable for enterprise search across large document collections, legal document discovery where specific terms and concepts must be efficiently located, and academic research platforms indexing millions of papers with specialized terminology.

</template>
<template #zh>

**稀疏向量索引**针对大部分元素为零、只有少数非零值的向量做了优化。与稠密向量（大部分或全部维度都有有意义的值）不同，稀疏向量能高效表示「维度很多、有效特征很少」的数据。这种表示在文本处理中尤其常见：一篇文档可能只用到词表中全部词汇的一小部分。稀疏向量索引在语义文档搜索、全文查询、主题建模等自然语言处理任务中表现出色；在大型文档库的企业搜索、需要高效定位特定术语与概念的法律文档发现，以及索引数百万篇专业术语论文的学术研究平台等场景中，价值尤高。

</template>
</BiRow>

<BiRow>
<template #en>

## Advanced Query Capabilities

</template>
<template #zh>

## 高级查询能力

</template>
</BiRow>

<BiRow>
<template #en>

At the core of vector databases lies their ability to perform efficient semantic searches. Vector search capabilities range from basic similarity matching to advanced techniques for improving relevance and diversity.

</template>
<template #zh>

向量数据库的核心，在于高效执行语义搜索的能力。向量搜索的能力谱系很宽，从基础的相似性匹配，到提升相关性与多样性的高级技术都有覆盖。

</template>
</BiRow>

<BiRow>
<template #en>

### Basic ANN Search

</template>
<template #zh>

### 基础 ANN 搜索

</template>
</BiRow>

<BiRow>
<template #en>

Approximate Nearest Neighbor (ANN) search is the foundational search method in vector databases. Unlike exact k-Nearest Neighbors (kNN) search, which compares a query vector against every vector in the database, ANN search uses indexing structures to quickly identify a subset of vectors likely to be most similar, dramatically improving performance.

</template>
<template #zh>

近似最近邻（ANN）搜索是向量数据库的基础搜索方法。精确的 k 近邻（kNN）搜索要把查询向量与库中每一个向量逐一比对，而 ANN 搜索利用索引结构快速锁定一小部分最可能相似的候选向量，性能提升立竿见影。

</template>
</BiRow>

<BiRow>
<template #en>

The key components of ANN search include:

</template>
<template #zh>

ANN 搜索的关键组成部分包括：

</template>
</BiRow>

<BiRow>
<template #en>

- **Query vectors**: The vector representation of what you're searching for
- **Index structures**: Pre-built data structures that organize vectors for efficient retrieval
- **Metric types**: Mathematical functions like Euclidean (L2), Cosine, or Inner Product that measure similarity between vectors
- **Top-K results**: The specified number of most similar vectors to return

</template>
<template #zh>

- **查询向量**：你要找的东西的向量表示
- **索引结构**：预先构建的数据结构，把向量组织起来以便高效检索
- **度量类型**：欧氏（L2）、余弦或内积等衡量向量相似度的数学函数
- **Top-K 结果**：指定返回的最相似向量数量

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases provide optimizations to improve search efficiency:

</template>
<template #zh>

向量数据库提供了一系列提升搜索效率的优化手段：

</template>
</BiRow>

<BiRow>
<template #en>

- **Bulk vector search**: Searching with multiple query vectors in parallel
- **Partitioned search**: Limiting search to specific data partitions
- **Pagination**: Using limit and offset parameters for retrieving large result sets
- **Output field selection**: Controlling which entity fields are returned with results

</template>
<template #zh>

- **批量向量搜索**：用多个查询向量并行搜索
- **分区搜索**：把搜索范围限定在特定数据分区内
- **分页**：用 limit 和 offset 参数分批获取大结果集
- **输出字段选择**：控制结果中返回哪些实体字段

</template>
</BiRow>

<BiRow>
<template #en>

### Advanced Search Techniques

</template>
<template #zh>

### 高级搜索技术

</template>
</BiRow>

<BiRow>
<template #en>

#### Range Search

</template>
<template #zh>

#### 范围搜索

</template>
</BiRow>

<BiRow>
<template #en>

Range search improves result relevancy by restricting results to vectors with similarity scores falling within a specific range. Unlike standard ANN search which returns the top-K most similar vectors, range search defines an "annular region" using:

</template>
<template #zh>

范围搜索通过把结果限定在相似度得分落在特定范围内的向量上，来提升结果相关性。标准 ANN 搜索返回 top-K 个最相似的向量，范围搜索则借助下面两个参数定义一个「环形区域」：

</template>
</BiRow>

<BiRow>
<template #en>

- An outer boundary (radius) that sets the maximum allowable distance
- An inner boundary (range_filter) that can exclude vectors that are too similar

</template>
<template #zh>

- 外边界（radius）：设定允许的最大距离
- 内边界（range_filter）：可以排除那些过于相似的向量

</template>
</BiRow>

<BiRow>
<template #en>

This approach is particularly useful when you want to find "similar but not identical" items, such as product recommendations that are related but not exact duplicates of what a user has already viewed.

</template>
<template #zh>

当你想找「相似但不雷同」的条目时，这种方法特别好用——比如推荐与用户已看过的商品相关、但又不是原样复制品的商品。

</template>
</BiRow>

<BiRow>
<template #en>

#### Filtered Search

</template>
<template #zh>

#### 过滤搜索

</template>
</BiRow>

<BiRow>
<template #en>

Filtered search combines vector similarity with metadata constraints to narrow results to vectors that match specific criteria. For example, in a product catalog, you could find visually similar items but restrict results to a specific brand or price range.

</template>
<template #zh>

过滤搜索把向量相似性与元数据约束结合起来，把结果收窄到满足特定条件的向量。比如在商品目录中，你可以找视觉上相似的商品，同时把结果限定在特定品牌或价格区间内。

</template>
</BiRow>

<BiRow>
<template #en>

Highly Scalable vector databases support two filtering approaches:

</template>
<template #zh>

扩展能力强的向量数据库支持两种过滤方式：

</template>
</BiRow>

<BiRow>
<template #en>

- **Standard filtering**: Applies metadata filters before vector search, significantly reducing the candidate pool
- **Iterative filtering**: Performs vector search first, then applies filters to each result until reaching the desired number of matches

</template>
<template #zh>

- **标准过滤**：在向量搜索之前应用元数据过滤，大幅缩小候选池
- **迭代过滤**：先做向量搜索，再对每个结果应用过滤条件，直到凑够想要的匹配数量

</template>
</BiRow>

<BiRow>
<template #en>

#### Text Match

</template>
<template #zh>

#### 文本匹配

</template>
</BiRow>

<BiRow>
<template #en>

Text match enables precise document retrieval based on specific terms, complementing vector similarity search with exact text matching capabilities. Unlike semantic search, which finds conceptually similar content, text match focuses on finding exact occurrences of query terms.

</template>
<template #zh>

文本匹配支持基于特定词语的精准文档检索，用精确的文本匹配能力补足向量相似性搜索。语义搜索找的是概念上相似的内容，文本匹配则专注于找出查询词的精确出现位置。

</template>
</BiRow>

<BiRow>
<template #en>

For example, a product search might combine text match to find products that explicitly mention "waterproof" with vector similarity to find visually similar products, ensuring both semantic relevance and specific feature requirements are met.

</template>
<template #zh>

举个例子：商品搜索可以把文本匹配和向量相似性结合起来——前者找出明确标注 "waterproof"（防水）的商品，后者找出视觉上相似的商品，确保语义相关性和特定功能要求同时得到满足。

</template>
</BiRow>

<BiRow>
<template #en>

#### Grouping Search

</template>
<template #zh>

#### 分组搜索

</template>
</BiRow>

<BiRow>
<template #en>

Grouping search aggregates results by a specified field to improve result diversity. For example, in a document collection where each paragraph is a separate vector, grouping ensures results come from different documents rather than multiple paragraphs from the same document.

</template>
<template #zh>

分组搜索按指定字段聚合结果，以提升结果多样性。比如在一个每段都存为独立向量的文档集合里，分组能确保结果来自不同文档，而不是同一篇文档的好几段。

</template>
</BiRow>

<BiRow>
<template #en>

This technique is valuable for:

</template>
<template #zh>

这项技术在以下场景很有价值：

</template>
</BiRow>

<BiRow>
<template #en>

- Document retrieval systems where you want representation from different sources
- Recommendation systems that need to present diverse options
- Search systems where result diversity is as important as similarity

</template>
<template #zh>

- 希望结果覆盖不同来源的文档检索系统
- 需要呈现多样化选项的推荐系统
- 结果多样性与相似度同等重要的搜索系统

</template>
</BiRow>

<BiRow>
<template #en>

#### Hybrid Search

</template>
<template #zh>

#### 混合搜索

</template>
</BiRow>

<BiRow>
<template #en>

Hybrid search combines results from multiple vector fields, each potentially representing different aspects of the data or using different embedding models. This enables:

</template>
<template #zh>

混合搜索合并来自多个向量字段的结果，每个字段可能代表数据的不同侧面，或者使用不同的嵌入模型。这使得：

</template>
</BiRow>

<BiRow>
<template #en>

- **Sparse-dense vector combinations**: Combining semantic understanding (dense vectors) with keyword matching (sparse vectors) for more comprehensive text search
- **Multimodal search**: Finding matches across different data types, such as searching for products using both image and text inputs

</template>
<template #zh>

- **稀疏-稠密向量组合**：把语义理解（稠密向量）与关键词匹配（稀疏向量）结合起来，实现更全面的文本搜索
- **多模态搜索**：跨不同数据类型查找匹配，比如同时用图片和文字输入来搜商品

</template>
</BiRow>

<BiRow>
<template #en>

Hybrid search implementations use sophisticated reranking strategies to combine results:

</template>
<template #zh>

混合搜索的实现会用讲究的重排序策略来合并结果：

</template>
</BiRow>

<BiRow>
<template #en>

- **Weighted ranking**: Prioritizes results from specific vector fields
- **Reciprocal Rank Fusion**: Balances results across all vector fields without specific emphasis

</template>
<template #zh>

- **加权排序**：优先展示来自特定向量字段的结果
- **倒数排名融合（Reciprocal Rank Fusion）**：在所有向量字段之间均衡结果，不特别偏重谁

</template>
</BiRow>

<BiRow>
<template #en>

#### Full-Text Search

</template>
<template #zh>

#### 全文搜索

</template>
</BiRow>

<BiRow>
<template #en>

Full-text search capabilities in modern vector databases bridge the gap between traditional text search and vector similarity. These systems:

</template>
<template #zh>

现代向量数据库的全文搜索能力，在传统文本搜索与向量相似性之间架起桥梁。这类系统会：

</template>
</BiRow>

<BiRow>
<template #en>

- Automatically convert raw text queries into sparse embeddings
- Retrieve documents containing specific terms or phrases
- Rank results based on both term relevance and semantic similarity
- Complement vector search by catching exact matches that semantic search might miss

</template>
<template #zh>

- 自动把原始文本查询转换成稀疏嵌入
- 检索包含特定词语或短语的文档
- 同时基于词语相关性和语义相似度对结果排序
- 捕捉语义搜索可能漏掉的精确匹配，为向量搜索查漏补缺

</template>
</BiRow>

<BiRow>
<template #en>

This hybrid approach is particularly valuable for comprehensive [information retrieval](https://zilliz.com/learn/what-is-information-retrieval) systems that need both precise term matching and semantic understanding.

</template>
<template #zh>

对既需要精准词语匹配、又需要语义理解的综合性[信息检索](https://zilliz.com/learn/what-is-information-retrieval)系统来说，这种混合方式价值尤其突出。

</template>
</BiRow>

<BiRow>
<template #en>

## Performance Engineering: Metrics That Matter

</template>
<template #zh>

## 性能工程：真正重要的指标

</template>
</BiRow>

<BiRow>
<template #en>

Performance optimization in vector databases requires understanding key metrics and their tradeoffs.

</template>
<template #zh>

优化向量数据库的性能，先得理解关键指标及其相互之间的权衡。

</template>
</BiRow>

<BiRow>
<template #en>

### The Recall-Throughput Tradeoff

</template>
<template #zh>

### 召回率与吞吐量的权衡

</template>
</BiRow>

<BiRow>
<template #en>

Recall measures the proportion of true nearest neighbors found among returned results. Higher recall requires more extensive search, reducing throughput (queries per second). Production systems balance these metrics based on application requirements, typically targeting 80-99% recall depending on use case.

</template>
<template #zh>

召回率衡量的是返回结果中找到了多少真正的最近邻。召回率越高，搜索范围就得越大，吞吐量（每秒查询数）随之下降。生产系统会根据应用需求在两者间取得平衡，通常视场景把召回率目标定在 80-99%。

</template>
</BiRow>

<BiRow>
<template #en>

When evaluating vector database performance, standardized benchmarking environments like ANN-Benchmarks provide valuable comparative data. These tools measure critical metrics including:

</template>
<template #zh>

评估向量数据库性能时，ANN-Benchmarks 这类标准化基准测试环境能提供宝贵的对比数据。这些工具衡量的关键指标包括：

</template>
</BiRow>

<BiRow>
<template #en>

- Search recall: The proportion of queries for which true nearest neighbors are found among returned results
- Queries per second (QPS): The rate at which the database processes queries under standardized conditions
- Performance across different dataset sizes and dimensions

</template>
<template #zh>

- 搜索召回率：真实最近邻出现在返回结果中的查询占比
- 每秒查询数（QPS）：数据库在标准化条件下处理查询的速率
- 在不同数据集规模和维度下的性能表现

</template>
</BiRow>

<BiRow>
<template #en>

An alternative is an open source benchmark system called [VDB Bench](https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud%2CMilvus%2CElasticCloud%2CPgVector%2CPinecone%2CQdrantCloud%2CWeaviateCloud&dataset=medium&filter=none%2Clow%2Chigh&tab=1). VectorDBBench is an [open-source benchmarking tool](https://github.com/zilliztech/VectorDBBench) designed to evaluate and compare the performance of mainstream vector databases such as Milvus and Zilliz Cloud using their own datasets. It also helps developers choose the most suitable vector database for their use cases.

</template>
<template #zh>

另一个选择是名为 [VDB Bench](https://zilliz.com/vector-database-benchmark-tool?database=ZillizCloud%2CMilvus%2CElasticCloud%2CPgVector%2CPinecone%2CQdrantCloud%2CWeaviateCloud&dataset=medium&filter=none%2Clow%2Chigh&tab=1) 的开源基准测试系统。VectorDBBench 是一款[开源基准测试工具](https://github.com/zilliztech/VectorDBBench)，旨在用自带数据集评估和对比 Milvus、Zilliz Cloud 等主流向量数据库的性能。它也能帮开发者为自己的场景挑到最合适的向量数据库。

</template>
</BiRow>

<BiRow>
<template #en>

These benchmarks allow organizations to identify the most suitable vector database implementation for their specific requirements, considering the balance between accuracy, speed, and scalability.

</template>
<template #zh>

有了这些基准测试，组织就能在准确率、速度和可扩展性之间权衡，为自己特定的需求找到最合适的向量数据库实现。

</template>
</BiRow>

<BiRow>
<template #en>

### Memory Management

</template>
<template #zh>

### 内存管理

</template>
</BiRow>

<BiRow>
<template #en>

Efficient memory management enables vector databases to scale to billions of vectors while maintaining performance:

</template>
<template #zh>

高效的内存管理让向量数据库能扩展到数十亿级向量，同时保住性能：

</template>
</BiRow>

<BiRow>
<template #en>

- **Dynamic allocation** adjusts memory usage based on workload characteristics
- **Caching policies** retain frequently accessed vectors in memory
- **Vector compression techniques** significantly reduce memory requirements

</template>
<template #zh>

- **动态分配**根据负载特征调整内存用量
- **缓存策略**把频繁访问的向量留在内存里
- **向量压缩技术**大幅削减内存需求

</template>
</BiRow>

<BiRow>
<template #en>

For datasets that exceed memory capacity, disk-based vector search solutions provide a crucial capability. These algorithms optimize I/O patterns for NVMe SSDs through techniques like beam search and graph-based navigation.

</template>
<template #zh>

对超出内存容量的数据集，基于磁盘的向量搜索方案提供了一项关键能力。这些算法通过束搜索、基于图的导航等技术，为 NVMe SSD 优化 I/O 模式。

</template>
</BiRow>

<BiRow>
<template #en>

### Advanced Filtering and Hybrid Search

</template>
<template #zh>

### 高级过滤与混合搜索

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases combine semantic similarity with traditional filtering to create powerful query capabilities:

</template>
<template #zh>

向量数据库把语义相似性与传统过滤相结合，打造出强大的查询能力：

</template>
</BiRow>

<BiRow>
<template #en>

- **Pre-filtering** applies metadata constraints before vector search, reducing the candidate set for similarity comparison
- **Post-filtering** executes vector search first, then applies filters to results
- **Metadata indexing** improves filtering performance through specialized indexes for different data types

</template>
<template #zh>

- **预过滤**在向量搜索前应用元数据约束，缩小相似性比对的候选集
- **后过滤**先执行向量搜索，再对结果应用过滤条件
- **元数据索引**通过面向不同数据类型的专用索引提升过滤性能

</template>
</BiRow>

<BiRow>
<template #en>

Performant vector databases support complex query patterns combining multiple vector fields with scalar constraints. Multi-vector queries find entities similar to multiple reference points simultaneously, while negative vector queries exclude vectors similar to specified examples.

</template>
<template #zh>

性能出色的向量数据库支持把多个向量字段与标量约束组合起来的复杂查询模式。多向量查询可以同时找出与多个参考点相似的实体，负向量查询则用于排除与指定样本相似的向量。

</template>
</BiRow>

<BiRow>
<template #en>

## Scaling Vector Databases in Production

</template>
<template #zh>

## 在生产环境中扩展向量数据库

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases require thoughtful deployment strategies to ensure optimal performance at different scales:

</template>
<template #zh>

向量数据库需要周全的部署策略，才能在不同规模下都跑出最佳性能：

</template>
</BiRow>

<BiRow>
<template #en>

- **Small-scale deployments** (millions of vectors) can operate effectively on a single machine with sufficient memory
- **Mid-scale deployments** (tens to hundreds of millions) benefit from vertical scaling with high-memory instances and SSD storage
- **Billion-scale deployments** require horizontal scaling across multiple nodes with specialized roles

</template>
<template #zh>

- **小规模部署**（百万级向量）：一台内存充足的机器就能有效运转
- **中等规模部署**（数千万到数亿级）：受益于高内存实例加 SSD 存储的垂直扩展
- **十亿级部署**：需要跨多个承担专门角色的节点做水平扩展

</template>
</BiRow>

<BiRow>
<template #en>

Sharding and replication form the foundation of scalable vector database architecture:

</template>
<template #zh>

分片与复制构成了可扩展向量数据库架构的基石：

</template>
</BiRow>

<BiRow>
<template #en>

- **Horizontal sharding** divides collections across multiple nodes
- **Replication** creates redundant copies of data, improving both fault tolerance and query throughput

</template>
<template #zh>

- **水平分片**把集合切分到多个节点上
- **复制**为数据创建冗余副本，容错能力和查询吞吐量双双提升

</template>
</BiRow>

<BiRow>
<template #en>

Modern systems adjust replication factors dynamically based on query patterns and reliability requirements.

</template>
<template #zh>

现代系统会根据查询模式和可靠性要求动态调整复制因子。

</template>
</BiRow>

<BiRow>
<template #en>

## Real-World Impact

</template>
<template #zh>

## 现实世界的影响

</template>
</BiRow>

<BiRow>
<template #en>

The flexibility of high performant vector databases is evident in their deployment options. Systems can run across a spectrum of environments, from lightweight installations on laptops for prototyping to massive distributed clusters managing tens of billions of vectors. This scalability has enabled organizations to move from concept to production without changing database technologies.

</template>
<template #zh>

高性能向量数据库的灵活性，在部署选项上体现得淋漓尽致。系统可以跑在各种环境里——从笔记本上做原型的轻量安装，到管理数百亿向量的巨型分布式集群。这种可扩展性让组织从概念一路走到生产，都不用换数据库技术。

</template>
</BiRow>

<BiRow>
<template #en>

Companies like Salesforce, PayPal, eBay, NVIDIA, IBM, and Airbnb now rely on vector databases like open source [Milvus](https://milvus.io/) to power large-scale AI applications. These implementations span diverse use cases—from sophisticated product recommendation systems to content moderation, fraud detection, and customer support automation—all built on the foundation of vector search.

</template>
<template #zh>

Salesforce、PayPal、eBay、NVIDIA、IBM、Airbnb 等公司如今都依靠 [Milvus](https://milvus.io/) 这样的开源向量数据库，来驱动大规模 AI 应用。这些实践覆盖了形形色色的用例——从精巧的商品推荐系统，到内容审核、欺诈检测、客服自动化——全都建立在向量搜索这块地基上。

</template>
</BiRow>

<BiRow>
<template #en>

In recent years, vector databases became vital in addressing the hallucination issues common in LLMs by providing domain-specific, up-to-date, or confidential data. For example, [Zilliz Cloud](https://zilliz.com/cloud) stores specialized data as vector embeddings. When a user asks a question, it transforms the query into vectors, performs ANN searches for the most relevant results, and combines these with the original question to create a comprehensive context for the large language models. This framework serves as the foundation for developing reliable LLM-powered applications that produce more accurate and contextually relevant responses.

</template>
<template #zh>

近年来，向量数据库在治理大语言模型常见的幻觉问题上变得至关重要，办法是为模型提供领域专属、最新或机密的数据。比如 [Zilliz Cloud](https://zilliz.com/cloud) 会把专业数据存成嵌入向量：用户提问时，它把查询转换成向量，执行 ANN 搜索找出最相关的结果，再把这些结果与原始问题拼在一起，为大语言模型构建完整的上下文。这套框架是开发可靠 LLM 应用的地基，让应用的回答更准确、更贴合语境。

</template>
</BiRow>

<BiRow>
<template #en>

## Conclusion

</template>
<template #zh>

## 结语

</template>
</BiRow>

<BiRow>
<template #en>

The rise of vector databases represents more than just a new technology—it signifies a fundamental shift in how we approach data management for AI applications. By bridging the gap between unstructured data and computational systems, vector databases have become an essential component of the modern AI infrastructure, enabling applications that understand and process information in increasingly human-like ways.

</template>
<template #zh>

向量数据库的崛起不只是多了一门新技术——它标志着我们管理 AI 应用数据的方式发生了根本转变。通过在非结构化数据与计算系统之间架起桥梁，向量数据库已成为现代 AI 基础设施不可或缺的组成部分，让应用能以越来越像人的方式理解和处理信息。

</template>
</BiRow>

<BiRow>
<template #en>

The key advantages of vector databases over traditional database systems include:

</template>
<template #zh>

相比传统数据库系统，向量数据库的关键优势包括：

</template>
</BiRow>

<BiRow>
<template #en>

- High-dimensional search: Efficient similarity searches on high-dimensional vectors used in machine learning and Generative AI applications
- Scalability: Horizontal scaling for efficient storage and retrieval of large vector collections
- Flexibility with hybrid search: Handling various vector data types, including sparse and dense vectors
- Performance: Significantly faster vector similarity searches compared to traditional databases
- Customizable indexing: Support for custom indexing schemes optimized for specific use cases and data types

</template>
<template #zh>

- 高维搜索：对机器学习和生成式 AI 应用所用的高维向量做高效相似性搜索
- 可扩展性：通过水平扩展高效存储和检索大型向量集合
- 混合搜索带来的灵活性：处理包括稀疏向量与稠密向量在内的多种向量数据类型
- 性能：向量相似性搜索比传统数据库快得多
- 可定制索引：支持针对特定场景和数据类型优化的自定义索引方案

</template>
</BiRow>

<BiRow>
<template #en>

As AI applications become increasingly sophisticated, the demands on vector databases continue to evolve. Modern systems must balance performance, accuracy, scaling, and cost-effectiveness while integrating seamlessly with the broader AI ecosystem. For organizations looking to implement AI at scale, understanding vector database technology isn't just a technical consideration—it's a strategic imperative.

</template>
<template #zh>

随着 AI 应用日益精深，对向量数据库的要求也在不断演进。现代系统必须在性能、准确率、扩展性和成本效益之间求得平衡，同时与更广泛的 AI 生态无缝集成。对想要大规模落地 AI 的组织来说，理解向量数据库技术已不只是一个技术考量——而是一项战略必修课。

</template>
</BiRow>
