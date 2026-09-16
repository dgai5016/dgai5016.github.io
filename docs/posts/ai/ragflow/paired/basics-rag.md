<BiRow>
<template #en>

Since large language models (LLMs) became the focus of technology, their ability to handle general knowledge has been astonishing. However, when questions shift to internal corporate documents, proprietary knowledge bases, or real-time data, the limitations of LLMs become glaringly apparent: they cannot access private information outside their training data. Retrieval-Augmented Generation (RAG) was born precisely to address this core need. Before an LLM generates an answer, it first retrieves the most relevant context from an external knowledge base and inputs it as "reference material" to the LLM, thereby guiding it to produce accurate answers. In short, RAG elevates LLMs from "relying on memory" to "having evidence to rely on," significantly improving their accuracy and trustworthiness in specialized fields and real-time information queries.

</template>
<template #zh>

自大语言模型（LLM）成为技术焦点以来，其处理通用知识的能力令人惊叹。然而，当问题转向企业内部文档、专有知识库或实时数据时，LLM 的局限便暴露无遗：它们无法访问训练数据之外的私有信息。检索增强生成（RAG）正是为解决这一核心需求而生。在 LLM 生成回答之前，先从外部知识库检索出最相关的上下文，作为“参考资料”输入给 LLM，从而引导它给出准确的回答。简而言之，RAG 让 LLM 从“凭记忆作答”升级为“有据可依”，显著提升了它在专业领域与实时信息查询中的准确性与可信度。

</template>
</BiRow>

<BiRow>
<template #en>

## Why Is RAG Important?

</template>
<template #zh>

## 为什么 RAG 很重要？

</template>
</BiRow>

<BiRow>
<template #en>

Although LLMs excel in language understanding and generation, they have inherent limitations:

</template>
<template #zh>

虽然 LLM 在语言理解与生成方面表现出色，但它们存在固有的局限：

</template>
</BiRow>

<BiRow>
<template #en>

- Static Knowledge: The model's knowledge is based on a data snapshot from its training time and cannot be automatically updated, making it difficult to perceive the latest information.
- Blind Spot to External Data: They cannot directly access corporate private documents, real-time information streams, or domain-specific content.
- Hallucination Risk: When lacking accurate evidence, they may still fabricate plausible-sounding but false answers to maintain conversational fluency.

</template>
<template #zh>

- 静态知识：模型的知识基于训练时点的数据快照，无法自动更新，难以感知最新信息。
- 外部数据盲区：无法直接访问企业私有文档、实时信息流或特定领域内容。
- 幻觉风险：在缺乏准确依据时，它们仍可能为保持对话流畅而编造听起来合理、实则错误的回答。

</template>
</BiRow>

<BiRow>
<template #en>

The introduction of RAG provides LLMs with real-time, credible "factual grounding." Its core mechanism is divided into two stages:

</template>
<template #zh>

RAG 的引入为 LLM 提供了实时、可信的“事实依据”。其核心机制分为两个阶段：

</template>
</BiRow>

<BiRow>
<template #en>

- Retrieval Stage: Based on the user's question, quickly retrieve the most relevant documents or data fragments from an external knowledge base.
- Generation Stage: The LLM organizes and generates the final answer by incorporating the retrieved information as context, combined with its own linguistic capabilities.

</template>
<template #zh>

- 检索阶段：根据用户的问题，从外部知识库中快速检索出最相关的文档或数据片段。
- 生成阶段：LLM 将检索到的信息作为上下文，结合自身的语言能力，组织并生成最终回答。

</template>
</BiRow>

<BiRow>
<template #en>

This upgrades LLMs from "speaking from memory" to "speaking with documentation," significantly enhancing reliability in professional and enterprise-level applications.

</template>
<template #zh>

这让 LLM 从“凭记忆说话”升级为“照着文档说话”，显著增强了其在专业与企业级应用中的可靠性。

</template>
</BiRow>

<BiRow>
<template #en>

## How Does RAG Work?

</template>
<template #zh>

## RAG 是如何工作的？

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval-Augmented Generation enables LLMs to generate higher-quality responses by leveraging real-time, external, or private data sources through the introduction of an information retrieval mechanism. Its workflow can be divided into following key steps:

</template>
<template #zh>

检索增强生成通过引入信息检索机制，让 LLM 能够利用实时、外部或私有的数据源生成更高质量的回答。其工作流程可以分为以下几个关键步骤：

</template>
</BiRow>

<BiRow>
<template #en>

### Data Processing and Vectorization

</template>
<template #zh>

### 数据处理与向量化

</template>
</BiRow>

<BiRow>
<template #en>

The knowledge required by RAG comes from unstructured data in various formats, such as documents, database records, or API return content. This data typically needs to be chunked, then transformed into vectors via an embedding model, and stored in a vector database.

</template>
<template #zh>

RAG 所需的知识来自各种格式的非结构化数据，例如文档、数据库记录或 API 返回内容。这些数据通常需要先分块，再经嵌入模型转换成向量，然后存入向量数据库。

</template>
</BiRow>

<BiRow>
<template #en>

Why is Chunking Needed? Indexing entire documents directly faces the following problems:

</template>
<template #zh>

为什么需要分块？直接对整篇文档建索引会面临以下问题：

</template>
</BiRow>

<BiRow>
<template #en>

- Decreased Retrieval Precision: Vectorizing long documents leads to semantic "averaging," losing details.
- Context Length Limitation: LLMs have a finite context window, requiring filtering of the most relevant parts for input.
- Cost and Efficiency: Embedding computation and retrieval costs are higher for long texts.

</template>
<template #zh>

- 检索精度下降：对长文档做向量化会带来语义上的“平均化”，丢失细节。
- 上下文长度限制：LLM 的上下文窗口有限，需要筛出最相关的部分输入。
- 成本与效率：长文本的嵌入计算与检索成本更高。

</template>
</BiRow>

<BiRow>
<template #en>

Therefore, an intelligent chunking strategy is key to balancing information integrity, retrieval granularity, and computational efficiency.

</template>
<template #zh>

因此，智能的分块策略是平衡信息完整性、检索粒度与计算效率的关键。

</template>
</BiRow>

<BiRow>
<template #en>

### Retrieve Relevant Information

</template>
<template #zh>

### 检索相关信息

</template>
</BiRow>

<BiRow>
<template #en>

The user's query is also converted into a vector to perform semantic relevance searches (e.g., calculating cosine similarity) in the vector database, matching and recalling the most relevant text fragments.

</template>
<template #zh>

用户的查询同样会被转换成向量，在向量数据库中执行语义相关性搜索（如计算余弦相似度），匹配并召回最相关的文本片段。

</template>
</BiRow>

<BiRow>
<template #en>

### Context Construction and Answer Generation

</template>
<template #zh>

### 上下文构建与回答生成

</template>
</BiRow>

<BiRow>
<template #en>

The retrieved relevant content is added to the LLM's context as factual grounding, and the LLM finally generates the answer. Therefore, RAG can be seen as Context Engineering 1.0 for automated context construction.

</template>
<template #zh>

检索到的相关内容会作为事实依据加入 LLM 的上下文，最终由 LLM 生成回答。因此，可以把 RAG 视为自动构建上下文的“上下文工程（Context Engineering）1.0”。

</template>
</BiRow>

<BiRow>
<template #en>

## Deep Dive into Existing RAG Architecture: Beyond Vector Retrieval

</template>
<template #zh>

## 深入现有 RAG 架构：超越向量检索

</template>
</BiRow>

<BiRow>
<template #en>

An industrial-grade RAG system is far from being as simple as "vector search + LLM"; its complexity and challenges are primarily embedded in the retrieval process.

</template>
<template #zh>

工业级 RAG 系统远非“向量搜索 + LLM”那么简单，其复杂度与挑战主要蕴含在检索过程之中。

</template>
</BiRow>

<BiRow>
<template #en>

### Data Complexity: Multimodal Document Processing

</template>
<template #zh>

### 数据复杂性：多模态文档处理

</template>
</BiRow>

<BiRow>
<template #en>

Core Challenge: Corporate knowledge mostly exists in the form of multimodal documents containing text, charts, tables, and formulas. Simple OCR extraction loses a large amount of semantic information.

</template>
<template #zh>

核心挑战：企业知识大多以包含文本、图表、表格和公式的多模态文档形式存在。简单的 OCR 抽取会丢失大量语义信息。

</template>
</BiRow>

<BiRow>
<template #en>

Advanced Practice: Leading solutions, such as RAGFlow, tend to use Visual Language Models (VLM) or specialized parsing models like DeepDoc to "translate" multimodal documents into unimodal text rich in structural and semantic information. Converting multimodal information into high-quality unimodal text has become standard practice for advanced RAG.

</template>
<template #zh>

进阶实践：以 RAGFlow 为代表的领先方案倾向于使用视觉语言模型（VLM）或 DeepDoc 这类专用解析模型，把多模态文档“翻译”成富含结构与语义信息的单模态文本。将多模态信息转化为高质量的单模态文本，已成为高级 RAG 的标准做法。

</template>
</BiRow>

<BiRow>
<template #en>

### The Complexity of Chunking: The Trade-Off Between Precision and Context

</template>
<template #zh>

### 分块的复杂性：精度与上下文的权衡

</template>
</BiRow>

<BiRow>
<template #en>

A simple "chunk-embed-retrieve" pipeline has an inherent contradiction:
- Semantic Matching requires small text chunks to ensure clear semantic focus.
- Context Understanding requires large text chunks to ensure complete and coherent information.

</template>
<template #zh>

简单的“分块—嵌入—检索”流水线存在一对固有矛盾：
- 语义匹配要求文本块足够小，以保证语义聚焦清晰。
- 上下文理解要求文本块足够大，以保证信息完整连贯。

</template>
</BiRow>

<BiRow>
<template #en>

This forces system design into a difficult trade-off between "precise but fragmented" and "complete but vague."

</template>
<template #zh>

这迫使系统设计在“精确但零碎”与“完整但含糊”之间做出艰难取舍。

</template>
</BiRow>

<BiRow>
<template #en>

Advanced Practice: Leading solutions, such as RAGFlow, employ semantic enhancement techniques like constructing semantic tables of contents and knowledge graphs. These not only address semantic fragmentation caused by physical chunking but also enable the discovery of relevant content across documents based on entity-relationship networks.

</template>
<template #zh>

进阶实践：以 RAGFlow 为代表的领先方案采用构建语义目录、知识图谱等语义增强技术。这不仅能解决物理分块造成的语义割裂，还能基于实体关系网络发现跨文档的相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

### Why Is a Vector Database Insufficient for Serving RAG?

</template>
<template #zh>

### 为什么向量数据库不足以支撑 RAG？

</template>
</BiRow>

<BiRow>
<template #en>

Vector databases excel at semantic similarity search, but RAG requires precise and reliable answers, demanding more capabilities from the retrieval system:
- Hybrid Search: Relying solely on vector retrieval may miss exact keyword matches (e.g., product codes, regulation numbers). Hybrid search, combining vector retrieval with keyword retrieval (BM25), ensures both semantic breadth and keyword precision.
- Tensor or Multi-Vector Representation: To support cross-modal data, employing tensor or multi-vector representation has become an important trend.
- Metadata Filtering: Filtering based on attributes like date, department, and type is a rigid requirement in business scenarios.

</template>
<template #zh>

向量数据库擅长语义相似度搜索，但 RAG 要求精确、可靠的回答，这对检索系统提出了更多能力要求：
- 混合搜索：仅依赖向量检索可能错过精确的关键词匹配（如产品编号、法规编号）。将向量检索与关键词检索（BM25）相结合的混合搜索，可兼顾语义广度与关键词精度。
- 张量或多向量表示：为支撑跨模态数据，采用张量或多向量表示已成为重要趋势。
- 元数据过滤：基于日期、部门、类型等属性的过滤，是业务场景中的刚性需求。

</template>
</BiRow>

<BiRow>
<template #en>

Therefore, the retrieval layer of RAG is a composite system based on vector search but must integrate capabilities like full-text search, re-ranking, and metadata filtering.

</template>
<template #zh>

因此，RAG 的检索层是以向量搜索为基础、但必须整合全文搜索、重排序与元数据过滤等能力的复合系统。

</template>
</BiRow>

<BiRow>
<template #en>

## RAG and Memory: Retrieval from the Same Source but Different Streams

</template>
<template #zh>

## RAG 与记忆：同源异流的检索

</template>
</BiRow>

<BiRow>
<template #en>

Within the agent framework, the essence of the memory mechanism is the same as RAG: both retrieve relevant information from storage based on current needs. The key difference lies in the data source:
- RAG: Targets pre-existing static or dynamic private data provided by the user in advance (e.g., documents, databases).
- Memory: Targets dynamic data generated or perceived by the agent in real-time during interaction (e.g., conversation history, environmental state, tool execution results).
They are highly consistent at the technical base (e.g., vector retrieval, keyword matching) and can be seen as the same retrieval capability applied in different scenarios ("existing knowledge" vs. "interaction memory"). A complete agent system often includes both an RAG module for inherent knowledge and a Memory module for interaction history.

</template>
<template #zh>

在 Agent 框架中，记忆机制的本质与 RAG 相同：都是根据当前需求从存储中检索相关信息。关键区别在于数据来源：
- RAG：面向用户预先提供的既有静态或动态私有数据（如文档、数据库）。
- 记忆：面向 Agent 在交互过程中实时生成或感知的动态数据（如对话历史、环境状态、工具执行结果）。
两者在技术底座上高度一致（如向量检索、关键词匹配），可以看作同一种检索能力应用于不同场景（“既有知识”与“交互记忆”）。一个完整的 Agent 系统往往既包含承载固有知识的 RAG 模块，也包含承载交互历史的记忆模块。

</template>
</BiRow>

<BiRow>
<template #en>

## RAG Applications

</template>
<template #zh>

## RAG 的应用

</template>
</BiRow>

<BiRow>
<template #en>

RAG has demonstrated clear value in several typical scenarios:

</template>
<template #zh>

RAG 已在多个典型场景中展现出明确价值：

</template>
</BiRow>

<BiRow>
<template #en>

1. Enterprise Knowledge Q&A and Internal Search
   By vectorizing corporate private data and combining it with an LLM, RAG can directly return natural language answers based on authoritative sources, rather than document lists. While meeting intelligent Q&A needs, it inherently aligns with corporate requirements for data security, access control, and compliance.
2. Complex Document Understanding and Professional Q&A
   For structurally complex documents like contracts and regulations, the value of RAG lies in its ability to generate accurate, verifiable answers while maintaining context integrity. Its system accuracy largely depends on text chunking and semantic understanding strategies.
3. Dynamic Knowledge Fusion and Decision Support
   In business scenarios requiring the synthesis of information from multiple sources, RAG evolves into a knowledge orchestration and reasoning support system for business decisions. Through a multi-path recall mechanism, it fuses knowledge from different systems and formats, maintaining factual consistency and logical controllability during the generation phase.

</template>
<template #zh>

1. 企业知识问答与内部搜索
   通过将企业私有数据向量化并与 LLM 结合，RAG 能够基于权威来源直接返回自然语言回答，而非文档列表。在满足智能问答需求的同时，它天然契合企业对数据安全、访问控制与合规的要求。
2. 复杂文档理解与专业问答
   对于合同、法规这类结构复杂的文档，RAG 的价值在于既能保持上下文完整，又能生成准确、可验证的回答。其系统准确性在很大程度上取决于文本分块与语义理解策略。
3. 动态知识融合与决策支持
   在需要综合多个来源信息的业务场景中，RAG 演进为面向业务决策的知识编排与推理支持系统。它通过多路召回机制融合来自不同系统、不同格式的知识，并在生成阶段保持事实一致性与逻辑可控性。

</template>
</BiRow>

<BiRow>
<template #en>

## The Future of RAG

</template>
<template #zh>

## RAG 的未来

</template>
</BiRow>

<BiRow>
<template #en>

The evolution of RAG is unfolding along several clear paths:

</template>
<template #zh>

RAG 的演进正沿着几条清晰的路径展开：

</template>
</BiRow>

<BiRow>
<template #en>

1. RAG as the data foundation for Agents
   RAG and agents have an architecture vs. scenario relationship. For agents to achieve autonomous and reliable decision-making and execution, they must rely on accurate and timely knowledge. RAG provides them with a standardized capability to access private domain knowledge and is an inevitable choice for building knowledge-aware agents.
2. Advanced RAG: Using LLMs to optimize retrieval itself
   The core feature of next-generation RAG is fully utilizing the reasoning capabilities of LLMs to optimize the retrieval process, such as rewriting queries, summarizing or fusing results, or implementing intelligent routing. Empowering every aspect of retrieval with LLMs is key to breaking through current performance bottlenecks.
3. Towards context engineering 2.0
   Current RAG can be viewed as Context Engineering 1.0, whose core is assembling static knowledge context for single Q&A tasks. The forthcoming Context Engineering 2.0 will extend with RAG technology at its core, becoming a system that automatically and dynamically assembles comprehensive context for agents. The context fused by this system will come not only from documents but also include interaction memory, available tools/skills, and real-time environmental information. This marks the transition of agent development from a "handicraft workshop" model to the industrial starting point of automated context engineering.

</template>
<template #zh>

1. RAG 作为 Agent 的数据底座
   RAG 与 Agent 是架构与场景的关系。Agent 要实现自主、可靠的决策与执行，必须依赖准确而及时的知识。RAG 为其提供了访问私有领域知识的标准化能力，是构建具备知识感知能力的 Agent 的必然选择。
2. 高级 RAG：用 LLM 优化检索本身
   下一代 RAG 的核心特征是充分利用 LLM 的推理能力来优化检索过程，例如改写查询、汇总或融合结果、实现智能路由。用 LLM 赋能检索的每个环节，是突破当前性能瓶颈的关键。
3. 迈向上下文工程 2.0
   当前的 RAG 可以视为上下文工程 1.0，其核心是为单次问答任务组装静态知识上下文。即将到来的上下文工程 2.0 将以 RAG 技术为核心进行扩展，成为一个为 Agent 自动、动态组装全面上下文的系统。该系统融合的上下文不仅来自文档，还将包括交互记忆、可用的工具/技能以及实时环境信息。这标志着 Agent 开发从“手工作坊”模式走向自动化上下文工程的工业化起点。

</template>
</BiRow>

<BiRow>
<template #en>

The essence of RAG is to build a dedicated, efficient, and trustworthy external data interface for large language models; its core is Retrieval, not Generation. Starting from the practical need to solve private data access, its technical depth is reflected in the optimization of retrieval for complex unstructured data. With its deep integration into agent architectures and its development towards automated context engineering, RAG is evolving from a technology that improves Q&A quality into the core infrastructure for building the next generation of trustworthy, controllable, and scalable intelligent applications.

</template>
<template #zh>

RAG 的本质是为大语言模型构建专用、高效、可信赖的外部数据接口；其核心在检索，而非生成。它从解决私有数据访问的实际需求出发，技术深度体现在对复杂非结构化数据的检索优化上。随着 RAG 与 Agent 架构深度融合并向自动化上下文工程演进，RAG 正从一项提升问答质量的技术，成长为构建下一代可信、可控、可扩展智能应用的核心基础设施。

</template>
</BiRow>
