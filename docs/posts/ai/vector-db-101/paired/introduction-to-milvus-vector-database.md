<BiRow>
<template #en>

Hey there - welcome back to Vector Database 101!

</template>
<template #zh>

嗨，欢迎回到《Vector Database 101》！

</template>
</BiRow>

<BiRow>
<template #en>

In the previous tutorial, we took a quick tour of [vector databases](https://zilliz.com/learn/what-is-vector-database) and listed the features an ideal vector database should implement. We then compared vector databases to vector search libraries<sup>1</sup> and vector search plugins<sup>2</sup>. Through example code, we found that neither vector search libraries nor vector search plugins fulfill all of the features required to store, index, and search across large datasets of [unstructured data](https://zilliz.com/learn/introduction-to-unstructured-data). This prompted us to go over some of the technical challenges vector database developers face.

</template>
<template #zh>

在上一篇教程里，我们快速浏览了[向量数据库](https://zilliz.com/learn/what-is-vector-database)，并列出了一个理想向量数据库应当实现的功能清单。接着我们把向量数据库与向量搜索库<sup>1</sup>、向量搜索插件<sup>2</sup>分别做了对比。通过示例代码我们发现：无论是向量搜索库还是向量搜索插件，都无法独自满足在海量[非结构化数据](https://zilliz.com/learn/introduction-to-unstructured-data)上进行存储、索引和搜索所需的全部功能。这促使我们进一步梳理了向量数据库开发者要面对的一些技术挑战。

</template>
</BiRow>

<BiRow>
<template #en>

## Milvus history

</template>
<template #zh>

## Milvus 发展历史

</template>
</BiRow>

<BiRow>
<template #en>

Milvus development began in 2018 at [*Zilliz*](https://zilliz.com), making it the world's first open-source vector database. Milvus' initial conception was infrastructure which could be used to build and scale search applications; as such, Milvus was initially intended to be a [Google/Bing for unstructured data](https://milvus.io/). Although [vector indexes](https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing) and search strategies were prevalent at that time, vector databases were still a relatively unknown concept. During this process, the Milvus community discovered that Milvus had the potential to be significantly more than what we originally intended it to be.

</template>
<template #zh>

Milvus 的开发始于 2018 年，出自 [*Zilliz*](https://zilliz.com) 之手，是世界上第一个开源向量数据库。Milvus 最初的想法是做一套用来构建和扩展搜索应用的基础设施；因此，Milvus 起初的定位是[面向非结构化数据的 Google/Bing](https://milvus.io/)。虽然在那个年代[向量索引](https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing)和搜索策略已经相当普遍，但「向量数据库」仍是一个鲜为人知的概念。在这个过程中，Milvus 社区发现 Milvus 的潜力远远超出了我们最初的设想。

</template>
</BiRow>

<BiRow>
<template #en>

As we developed Milvus, we refined the concept as a combination of search, storage, and indexing, making it a full-fledged managed database. In November of 2019, we open-sourced Milvus under the Apache 2.0 license and released to the general public as the first widely available vector database solution. Milvus during its v0.6 release was mostly single-instance and supported only a handful of indexes.

</template>
<template #zh>

在持续开发 Milvus 的过程中，我们把它的概念逐步打磨成搜索、存储与索引三者的结合体，让它成长为一个功能完备的托管型数据库。2019 年 11 月，我们在 Apache 2.0 许可证下将 Milvus 开源，并作为首个广泛可用的向量数据库解决方案向公众发布。v0.6 版本的 Milvus 基本还是单实例形态，支持的索引类型也屈指可数。

</template>
</BiRow>

<BiRow>
<template #en>

In March 2020, Milvus joined the LF AI & Data Foundation, a nonprofit organization under the broader Linux Foundation umbrella. With help from the LF AI & Data Foundation, the Milvus community has been able to reposition itself as a *database for the AI era*, while also helping engage with the broader open-source community. While with LF AI & Data, Milvus continues to receive constant updates from both Zilliz as well as the broader open-source community.

</template>
<template #zh>

2020 年 3 月，Milvus 加入 LF AI & Data 基金会——一个隶属于 Linux 基金会体系的非营利组织。在 LF AI & Data 基金会的帮助下，Milvus 社区得以将自己重新定位为*面向 AI 时代的数据库*，同时也与更广泛的开源社区建立了联系。在加入 LF AI & Data 之后，Milvus 持续不断地收到来自 Zilliz 以及整个开源社区的更新。

</template>
</BiRow>

<BiRow>
<template #en>

That same year, our first [full-length academic paper](https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf) was accepted into ACM SIGMOD 2021 - one of the world's premier database conferences. We also began working on a fully distributed, cloud-native version of Milvus, aptly named *Milvus 2.0*. We'll dive deeper into Milvus 2.0 in the next section.

</template>
<template #zh>

同一年，我们的第一篇[完整长度的学术论文](https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf)被 ACM SIGMOD 2021 接收——这是全球顶级的数据库会议之一。我们还开始打造一个完全分布式、云原生版本的 Milvus，并给它起了个贴切的名字：*Milvus 2.0*。下一节我们会深入聊聊 Milvus 2.0。

</template>
</BiRow>

<BiRow>
<template #en>

*Milvus* is one of the first and foremost vector databases most developers think of when discussing vector databases. A big reason for this is Milvus' rich history - a continuously evolving history that we hope you will one day be a part of!

</template>
<template #zh>

*Milvus* 是开发者聊起向量数据库时最先想到、也是最主流的向量数据库之一。这很大程度上要归功于 Milvus 深厚的历史——一段持续演进的历史，也希望有一天你也能成为其中的一员！

</template>
</BiRow>

<BiRow>
<template #en>

## Milvus 2.x

</template>
<template #zh>

## Milvus 2.x

</template>
</BiRow>

<BiRow>
<template #en>

We'll continue the topic of Milvus history by discussing Milvus 1.0 (1.x) and 2.0 (2.x) along with the major differences between them.

</template>
<template #zh>

我们接着聊 Milvus 的历史，来看看 Milvus 1.0（1.x）和 2.0（2.x），以及两者之间的主要区别。

</template>
</BiRow>

<BiRow>
<template #en>

Milvus 1.0 was released in March 2021 as the first major Milvus release. This version was built atop the previous releases, and supported a number of similarity metrics (Euclidean/L2 distance, Hamming distance, Jaccard similarity, etc) along with multiple ANN indexes (FAISS, HNSW, ANNOY, and standard inverted indicies). Horizontal scaling was accomplished through a feature called *Mishards*, and storage was achieved through either local storage or NFS. Milvus 1.0 also supported fast indexing and querying through general purpose computing processors used by machine learning engineers, including NVidia GPUs and Xilinx FPGAs.

</template>
<template #zh>

Milvus 1.0 发布于 2021 年 3 月，是 Milvus 的首个大版本。它构建在以往版本之上，支持多种相似度度量方式（欧氏距离/L2、汉明距离、Jaccard 相似度等），以及多种 ANN 索引（FAISS、HNSW、ANNOY 和标准倒排索引）。水平扩展通过一个叫 *Mishards* 的功能实现，存储则依赖本地存储或 NFS。Milvus 1.0 还支持借助机器学习工程师常用的通用计算处理器（包括 NVidia GPU 和 Xilinx FPGA）来加速索引和查询。

</template>
</BiRow>

<BiRow>
<template #en>

The first version of Milvus 2.0 was released in June 2021, the same month that Milvus became a graduate of the LF AI & Data Foundation. Unlike Milvus 1.x, Milvus 2.x's architecture is a *fully cloud-native* architecture, scalable to hundreds of individual nodes with a target availability/uptime of 99.9%. Also in contrast with Milvus 1.x, Milvus 2.x incorporates multiple *[levels of data consistency](https://milvus.io/blog/understanding-consistency-levels-in-the-milvus-vector-database.md)*, enabling maximum flexibility when it comes to application development. Milvus 2.x also supports a number of other advanced features, such as multi-cloud integration, an administrative console (via Zilliz's [Attu](https://zilliz.com/attu)), and a feature called *time travel* (no, Milvus is not a [time machine](https://milvus.io/docs/timetravel.md)). These accomplishments along with the community's impact in the field of machine learning and vector databases was recognized in VLDB 2022, another of the field's top-tier academic conferences. You can read our [VLDB 2022 paper](https://zilliz.com/resources/whitepaper/milvus-performance-benchmark).

</template>
<template #zh>

Milvus 2.0 的第一个版本发布于 2021 年 6 月，同月 Milvus 从 LF AI & Data 基金会正式毕业。与 Milvus 1.x 不同，Milvus 2.x 采用*完全云原生*的架构，可扩展至上百个独立节点，目标可用性（正常运行时间）为 99.9%。同样与 1.x 形成对比的是，Milvus 2.x 引入了多种[数据一致性级别](https://milvus.io/blog/understanding-consistency-levels-in-the-milvus-vector-database.md)，为应用开发提供了最大的灵活性。Milvus 2.x 还支持一系列其他高级特性，比如多云集成、管理控制台（通过 Zilliz 的 [Attu](https://zilliz.com/attu)），以及一个叫*时间旅行（time travel）*的功能（不，Milvus 并不是[时光机](https://milvus.io/docs/timetravel.md)）。这些成果，连同社区在机器学习和向量数据库领域的影响力，获得了 VLDB 2022——另一个领域顶级学术会议——的认可。你可以阅读我们的 [VLDB 2022 论文](https://zilliz.com/resources/whitepaper/milvus-performance-benchmark)。

</template>
</BiRow>

<BiRow>
<template #en>

If you're looking for a vector database to use for your application, we strongly recommend Milvus 2.x. Milvus 2.x is a completely novel vector database system/solution (when compared with Milvus 1.x) - it is highly available, scalable, and distributed. Due to these architectural advancements, Milvus 1.x has been officially deprecated.

</template>
<template #zh>

如果你正在为自己的应用挑选向量数据库，我们强烈推荐 Milvus 2.x。与 Milvus 1.x 相比，Milvus 2.x 是一套全新的向量数据库系统/解决方案——高可用、可扩展、分布式。正是由于这些架构上的进步，Milvus 1.x 已被正式弃用。

</template>
</BiRow>

<BiRow>
<template #en>

## Touring Milvus's architecture

</template>
<template #zh>

## 逛一逛 Milvus 的架构

</template>
</BiRow>

<BiRow>
<template #en>

Now that we've covered Milvus' history as well as how Milvus 2.x differs from Milvus 1.x, let's take some time to go over Milvus 2.x's architecture. Just as a quick refresher, here are the key features a vector database should implement<sup>3</sup>:

</template>
<template #zh>

介绍完 Milvus 的历史以及 Milvus 2.x 与 1.x 的区别之后，我们花点时间来看看 Milvus 2.x 的架构。先快速复习一下，一个向量数据库应该实现这些关键功能<sup>3</sup>：

</template>
</BiRow>

<BiRow>
<template #en>

- Scalability and tunability
- Multi-tenancy and data isolation
- A complete suite of APIs
- An intuitive user interface/administrative console

</template>
<template #zh>

- 可扩展性与可调优性
- 多租户与数据隔离
- 一套完整的 API
- 直观的用户界面/管理控制台

</template>
</BiRow>

<BiRow>
<template #en>

As we move through each of the individual components within Milvus 2.0 (see the diagram below), we'll see how these design choices are enable Milvus to implement each of these key features.

</template>
<template #zh>

接下来我们会逐一走过 Milvus 2.0 的各个组件（见下图），看看这些设计选择是如何让 Milvus 实现上述每一项关键功能的。

</template>
</BiRow>

<BiRow>
<template #en>

![Milvus architecture.](/vector-db-images/introduction-to-milvus-vector-database-01.png)
Milvus architecture.

</template>
<template #zh>

![Milvus architecture.](/vector-db-images/introduction-to-milvus-vector-database-01.png)
Milvus 架构图。

</template>
</BiRow>

<BiRow>
<template #en>

We're going to get fairly technical here, so fasten your seat belts and let's dive right in.

</template>
<template #zh>

接下来的内容会比较硬核，系好安全带，我们这就出发。

</template>
</BiRow>

<BiRow>
<template #en>

**Access layer**

</template>
<template #zh>

**接入层（Access Layer）**

</template>
</BiRow>

<BiRow>
<template #en>

As the name suggests, the access layer is responsible for communication with the outside world, helping implement the "a complete suite of APIs" feature. When Milvus receives a request, it first gets forwarded to the access layer, where a proxy within the layer is tapped to process client connections and carry out static verification + dynamic checks before forwarding the request to the appropriate service. Once the downstream service completes execution, it returns relevant data back to the access layer; the access layer then forwards the returned content back to the end user.

</template>
<template #zh>

顾名思义，接入层负责与外部世界通信，帮 Milvus 实现「一套完整的 API」这一特性。当 Milvus 收到请求时，请求首先被转发到接入层，由层内的 proxy 接管：处理客户端连接、执行静态校验 + 动态检查，然后把请求转发给相应的服务。下游服务执行完毕后，会把相关数据返回给接入层；接入层再把返回内容转发给最终用户。

</template>
</BiRow>

<BiRow>
<template #en>

Within the access layer, proxies are essentially stateless containers which provide a unified front to the outside world through load-balanced components (Nginx, Kubernetes Ingress, NodePort, and LVS). Milvus uses a massive parallel processing (MPP) architecture, where proxies return results gathered from worker nodes after global aggregation and post-processing.

</template>
<template #zh>

在接入层内部，proxy 本质上是无状态容器，通过负载均衡组件（Nginx、Kubernetes Ingress、NodePort 和 LVS）对外提供统一入口。Milvus 采用大规模并行处理（MPP）架构，proxy 会把从各工作节点收集到的结果做完全局聚合与后处理之后再返回。

</template>
</BiRow>

<BiRow>
<template #en>

**Coordinator service**

</template>
<template #zh>

**协调服务（Coordinator Service）**

</template>
</BiRow>

<BiRow>
<template #en>

The coordinator service acts as Milvus's central command center, and is responsible for everything from load balancing to data management. The service itself is composed of four coordinators - the root coordinator, query coordinator, data coordinator, and index coordinator. We'll briefly describe each coordinator here - if you're interested in learning more, please check out the [Milvus documentatation](https://milvus.io/docs).

</template>
<template #zh>

协调服务是 Milvus 的中央指挥中心，负责从负载均衡到数据管理的一切事务。该服务由四个协调器组成——root 协调器、query 协调器、data 协调器和 index 协调器。这里我们只简要介绍每个协调器，如果你想深入了解，请查阅 [Milvus 文档](https://milvus.io/docs)。

</template>
</BiRow>

<BiRow>
<template #en>

- The root coordinator handles data-related requests such as collection, partition, and index creation/deletion requests. The root coordinator also manages global timestamps - all requests are assigned a timestamp the moment the root coordinator receives the request.
- The query coordinator administers all query nodes within Milvus. As the name suggests, query nodes are responsible for performing searches using index and delta files.
- The data coordinator manages all data nodes within Milvus, maintains metadata, and triggers flush, compact, and other background data operations. More on these operations in a future tutorial.
- The index coordinator maintains the index nodes and index metadata, automatically instructing each node to load raw embedding vectors and build/rebuild vector indices when necessary.

</template>
<template #zh>

- root 协调器处理与数据相关的请求，例如 collection、partition 以及索引的创建/删除请求。root 协调器还管理全局时间戳——所有请求在 root 协调器收到的那一刻就会被分配一个时间戳。
- query 协调器管理 Milvus 内所有 query 节点。顾名思义，query 节点负责使用索引文件和增量文件执行搜索。
- data 协调器管理 Milvus 内所有 data 节点，维护元数据，并触发 flush、compact 等后台数据操作。这些操作会在以后的教程中详细讲。
- index 协调器维护 index 节点和索引元数据，必要时会自动指示各节点加载原始嵌入向量（embedding vector）并构建/重建向量索引。

</template>
</BiRow>

<BiRow>
<template #en>

**Worker nodes**

</template>
<template #zh>

**工作节点（Worker Nodes）**

</template>
</BiRow>

<BiRow>
<template #en>

Within Milvus, worker nodes are responsible for execution. Worker nodes are horizontally scalable pods which execute commands from the corresponding coordinator service<sup>4</sup>, akin to data nodes in Hadoop. A query request into Milvus, for example, goes first through a proxy in the access layer before reaching the query coordinator. Given the state of the query cluster, the coordinator will then send an appropriate set of control/command signals to the query cluster in order to successfully execute the request.

</template>
<template #zh>

在 Milvus 内部，工作节点负责执行。工作节点是可水平扩展的 pod，执行来自对应协调服务的命令<sup>4</sup>，类似于 Hadoop 中的数据节点。举例来说，进入 Milvus 的查询请求会先经过接入层的 proxy，再到达 query 协调器；协调器随后根据查询集群的状态，向查询集群发送一组合适的控制/命令信号，以成功执行该请求。

</template>
</BiRow>

<BiRow>
<template #en>

The coordinators and their corresponding worker nodes together help fullfill the "scalability and tunability" plus "multi-tenancy and data isolation" features for vector databases. Scalability is obvious - as the amount of data, queries, or indexing requirements grows and shrinks, the individual worker node clusters are able to grow and shrink horizontally with system load. By segregating querying from indexing from storage, Milvus has been architected to be highly tunable and can support applications that require varying query/write speeds in addition to varying levels of consistency.

</template>
<template #zh>

各协调器与对应的工作节点共同实现了向量数据库的「可扩展性与可调优性」以及「多租户与数据隔离」特性。可扩展性不言自明——随着数据量、查询量或索引需求的增减，各个工作节点集群都能随系统负载水平地扩缩。通过把查询、索引、存储三者分离，Milvus 被设计得高度可调，能够支持对查询/写入速度以及一致性级别有不同要求的各种应用。

</template>
</BiRow>

<BiRow>
<template #en>

**Object storage**

</template>
<template #zh>

**对象存储（Object Storage）**

</template>
</BiRow>

<BiRow>
<template #en>

The object storage layer helps put the "database" in Milvus, and is responsible for general data persistence. The storage layer is divided into three separate components:

</template>
<template #zh>

对象存储层帮 Milvus 撑起了「数据库」这个名号，负责通用的数据持久化。存储层分为三个独立的组件：

</template>
</BiRow>

<BiRow>
<template #en>

- Meta store: Responsible for storing snapshots of meta data such as collection schema, node status, message consumption checkpoints, etc. Milvus relies on `etcd`, a distributed key-value store, for this functionality. `etcd` also helps preform service registration and health checks.
- Log broker: The log broker is a pub/sub system that supports playback and is responsible for streaming data persistence, reliable asynchronous query execution, event notifications, and returning query results. When nodes are performing downtime recovery, the log broker ensures the integrity of incremental data through a feature called a log broker playback. Milvus uses Pulsar as its log broker when running in distrubuted mode and RocksDB as its log broker when running in standalone mode. Streaming storage services such as Kafka and Pravega can also be used as log brokers.
- Object storage: The object storage layer stores log snapshots, index files, and intermediate query processing results. Milvus supports both AWS S3 and Azure Blob Storage, in addition to MinIO, a lightweight, open-source object storage service. Due to the high access latency and billing per query of object storage services, Milvus will soon support memory/SSD-based cache pools and hot/cold data separation to improve performance and reduce costs.

</template>
<template #zh>

- 元数据存储（Meta store）：负责存储元数据快照，例如 collection 的 schema、节点状态、消息消费检查点等。Milvus 依赖 `etcd`——一个分布式键值存储——来实现这一功能。`etcd` 还协助完成服务注册和健康检查。
- 日志代理器（Log broker）：日志代理器是一个支持回放的发布/订阅（pub/sub）系统，负责流式数据持久化、可靠的异步查询执行、事件通知以及返回查询结果。当节点进行宕机恢复时，日志代理器通过「日志代理器回放（log broker playback）」功能确保增量数据的完整性。Milvus 在分布式模式下使用 Pulsar 作为日志代理器，在单机模式下使用 RocksDB。Kafka、Pravega 等流式存储服务也可以用作日志代理器。
- 对象存储：对象存储层存储日志快照、索引文件和查询处理的中间结果。除 MinIO（一个轻量级开源对象存储服务）之外，Milvus 同时支持 AWS S3 和 Azure Blob Storage。由于对象存储服务访问延迟高、按请求计费，Milvus 很快将支持基于内存/SSD 的缓存池以及冷热数据分离，以提升性能、降低成本。

</template>
</BiRow>

<BiRow>
<template #en>

## Future roadmap (endgame/long-term vision)

</template>
<template #zh>

## 未来路线图（终极目标/长期愿景）

</template>
</BiRow>

<BiRow>
<template #en>

Milvus has already been tested and trusted by thousands of corporations for use in production systems at scale. By Github statistics, Milvus is by and large the world's most popular open-source vector database, and arguably the world's most advanced as well. As mentioned in the previous sections, our accomplishments in the field of unstructured data processing has already been recognized in the industry's top-tier academic conferences ([SIGMOD 2021](https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf) and [VLDB 2022](https://zilliz.com/resources/whitepaper/milvus-performance-benchmark)).

</template>
<template #zh>

Milvus 已经被成千上万的公司测试并信任，用于大规模生产系统。从 GitHub 数据看，Milvus 基本上是世界上最受欢迎的开源向量数据库，而且可以说是最先进的。正如前几节提到的，我们在非结构化数据处理领域的成果已经获得业界顶级学术会议（[SIGMOD 2021](https://www.cs.purdue.edu/homes/csjgwang/pubs/SIGMOD21_Milvus.pdf) 和 [VLDB 2022](https://zilliz.com/resources/whitepaper/milvus-performance-benchmark)）的认可。

</template>
</BiRow>

<BiRow>
<template #en>

We're a community of technologists at heart. By paying extra attention to components that impact scalability and performance, we architected Milvus to be superior to other vector database solutions<sup>5</sup>. With a number of advanced features (different types of indexes, time travel, multi-cloud object storage), choosing Milvus for your next unstructured data application is a no-brainer. [A fully managed solution](https://zilliz.com/cloud) - the last "missing piece" - has been launched as well, courtesy of [Zilliz](https://zilliz.com).

</template>
<template #zh>

我们骨子里是一群技术人。通过对影响可扩展性和性能的组件格外用心，我们把 Milvus 架构得比其他向量数据库解决方案更胜一筹<sup>5</sup>。凭借一系列高级特性（多种索引类型、时间旅行、多云对象存储），为你的下一个非结构化数据应用选择 Milvus 根本不需要犹豫。[全托管方案](https://zilliz.com/cloud)——最后一块「缺失的拼图」——也已经上线，这要多亏 [Zilliz](https://zilliz.com)。

</template>
</BiRow>

<BiRow>
<template #en>

Our endgame vision for Milvus is to be a *complete* database for unstructured data processing. While Milvus 2.x is already a highly scalable and flexible architecture for querying, indexing, and storage, further improvements can be made to create a complete vector database ecosystem. This includes 1) integrating [unstructured data ETL](https://towhee.io/), 2) extending support for Microsoft Azure and Google Cloud Platform, and 3) support for traditional metadata types such as lists and JSON objects. In the upcoming years, the broader Milvus community will continue to improve Milvus' features and functionality. We won't rest until Milvus is *the premier* platform for all things related to unstructured data.

</template>
<template #zh>

我们对 Milvus 的终极愿景，是成为一个非结构化数据处理的*完备*数据库。Milvus 2.x 虽然已经是一套高度可扩展、灵活的查询/索引/存储架构，但要构建一个完整的向量数据库生态，仍有进一步改进的空间。这包括：1) 集成[非结构化数据 ETL](https://towhee.io/)，2) 扩展对 Microsoft Azure 和 Google Cloud Platform 的支持，以及 3) 支持列表和 JSON 对象等传统元数据类型。在未来几年，整个 Milvus 社区将继续完善 Milvus 的功能与特性。不把 Milvus 做成非结构化数据领域*首屈一指*的平台，我们绝不罢休。

</template>
</BiRow>

<BiRow>
<template #en>

There is no doubt that Milvus has helped revolutionize unstructured data processing, and will continue to do so in the years to come.

</template>
<template #zh>

毫无疑问，Milvus 已经改变了非结构化数据处理的格局，并且在未来几年会继续如此。

</template>
</BiRow>

<BiRow>
<template #en>

## Wrapping up

</template>
<template #zh>

## 收尾

</template>
</BiRow>

<BiRow>
<template #en>

In this tutorial, we provided a brief introduction to Milvus, Milvus' history, as well as the primary differences between Milvus 1.x and Milvus 2.x. We also took a quick tour of the architecture of Milvus 2.x and helped shine some light on how Milvus' architecture allows it to implement all of the required features of vector databases.

</template>
<template #zh>

在本篇教程中，我们简要介绍了 Milvus 和它的历史，以及 Milvus 1.x 与 2.x 的主要区别。我们还快速逛了一圈 Milvus 2.x 的架构，并阐明了 Milvus 的架构如何让它实现向量数据库所需的全部功能。

</template>
</BiRow>

<BiRow>
<template #en>

In the next several tutorials, we'll provide a series of *Milvus quickstarts*, designed to help you spin up and use a Milvus instance in just a couple of minutes:

</template>
<template #zh>

在接下来的几篇教程中，我们将提供一系列 *Milvus 快速上手指南*，帮你几分钟内就启动并使用一个 Milvus 实例：

</template>
</BiRow>

<BiRow>
<template #en>

- In the first tutorial, we'll provide a *Milvus standalone quickstart*, designed to help you get Milvus up and running on a local x86 or ARM/M1 instance.
- In the second tutorial, we'll emulate a cluster on a local machine in order to demonstrate how to boot up a *Milvus distributed cluster*.
- In the third tutorial, we'll show how to deploy an *on-premise version of Milvus*.

</template>
<template #zh>

- 第一篇教程提供 *Milvus standalone（单机版）快速上手指南*，帮你在本地 x86 或 ARM/M1 机器上把 Milvus 跑起来。
- 第二篇教程会在本地机器上模拟一个集群，演示如何启动 *Milvus 分布式集群*。
- 第三篇教程会展示如何部署*本地私有化（on-premise）版本的 Milvus*。

</template>
</BiRow>

<BiRow>
<template #en>

Lastly, we at the Milvus community have provided [a short video](https://www.youtube.com/watch?v=nQkmgCtVz5k) introducing Milvus in 150 seconds, narrated by yours truly. Grab a cup of coffee and enjoy a front-row seat for the video!

</template>
<template #zh>

最后，我们 Milvus 社区还准备了一段[短视频](https://www.youtube.com/watch?v=nQkmgCtVz5k)，用 150 秒介绍 Milvus，由我本人倾情解说。端上一杯咖啡，前排就座，好好欣赏吧！

</template>
</BiRow>
