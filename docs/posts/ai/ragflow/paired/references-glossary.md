<BiRow>
<template #en>

Definitions of key terms and basic concepts related to RAGFlow.

</template>
<template #zh>

RAGFlow 相关关键术语与基础概念的定义。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### **A**

</template>
<template #zh>

### **A**

</template>
</BiRow>

<BiRow>
<template #en>

**Agent**

</template>
<template #zh>

**Agent**

</template>
</BiRow>

<BiRow>
<template #en>

An Agent is an AI application that combines large language models, knowledge bases, tools, and workflows to perform tasks.

</template>
<template #zh>

Agent 是一种 AI 应用，它把大语言模型、知识库、工具和工作流组合起来，用于完成各类任务。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, users can visually build Agents and combine capabilities such as retrieval, model invocation, conditional logic, loops, variables, code execution, and HTTP requests to implement complex task-processing workflows.

</template>
<template #zh>

在 RAGFlow 中，用户可以通过可视化方式构建 Agent，组合检索、模型调用、条件逻辑、循环、变量、代码执行、HTTP 请求等能力，实现复杂的任务处理工作流。

</template>
</BiRow>

<BiRow>
<template #en>

**Agentic Retrieval**

</template>
<template #zh>

**Agentic Retrieval**

</template>
</BiRow>

<BiRow>
<template #en>

Agentic Retrieval is a retrieval approach designed for complex questions.

</template>
<template #zh>

Agentic Retrieval（代理式检索）是一种面向复杂问题的检索方式。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike one-time retrieval, it incorporates model reasoning to analyze user queries and, when necessary, perform steps such as question decomposition, retrieval, and evidence checking to obtain more comprehensive context for answer generation.

</template>
<template #zh>

与一次性检索不同，它会引入模型推理来分析用户查询，必要时执行问题分解、检索、证据核查等步骤，为答案生成获取更全面的上下文。

</template>
</BiRow>

<BiRow>
<template #en>

In Chat, different Thinking levels can be used to control the processing depth of Agentic Retrieval.

</template>
<template #zh>

在 Chat 中，可以使用不同的 Thinking 档位来控制 Agentic Retrieval 的处理深度。

</template>
</BiRow>

<BiRow>
<template #en>

**Auto keyword**

</template>
<template #zh>

**Auto keyword**

</template>
</BiRow>

<BiRow>
<template #en>

Auto keyword uses a model to automatically generate keywords for text chunks during document processing.

</template>
<template #zh>

自动关键词（Auto keyword）会在文档处理过程中利用模型为文本分块自动生成关键词。

</template>
</BiRow>

<BiRow>
<template #en>

The generated keywords can be added as supplementary information to chunks to enrich their content representation and improve subsequent retrieval.

</template>
<template #zh>

生成的关键词可以作为补充信息添加到分块中，丰富分块的内容表示，并改善后续检索效果。

</template>
</BiRow>

<BiRow>
<template #en>

**ASR**

</template>
<template #zh>

**ASR**

</template>
</BiRow>

<BiRow>
<template #en>

ASR (Automatic Speech Recognition) is a model capability that converts speech into text.

</template>
<template #zh>

ASR（Automatic Speech Recognition，自动语音识别）是一种把语音转换成文本的模型能力。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, ASR can be used to recognize spoken content in audio and convert it into text for subsequent processing.

</template>
<template #zh>

在 RAGFlow 中，ASR 可用于识别音频中的口述内容并转换成文本，以便后续处理。

</template>
</BiRow>

<BiRow>
<template #en>

**Auto question**

</template>
<template #zh>

**Auto question**

</template>
</BiRow>

<BiRow>
<template #en>

Auto question automatically generates relevant questions based on the content of text chunks.

</template>
<template #zh>

自动问题（Auto question）会基于文本分块的内容自动生成相关问题。

</template>
</BiRow>

<BiRow>
<template #en>

The generated questions help expand the semantic representation of chunks, making it easier for different forms of queries to match relevant knowledge.

</template>
<template #zh>

生成的问题有助于扩展分块的语义表示，让不同形式的查询更容易匹配到相关知识。

</template>
</BiRow>

<BiRow>
<template #en>

### **B**

</template>
<template #zh>

### **B**

</template>
</BiRow>

<BiRow>
<template #en>

**Blueprint**

</template>
<template #zh>

**Blueprint**

</template>
</BiRow>

<BiRow>
<template #en>

Blueprint is an intermediate artifact used by RAGFlow to plan the content structure of a Wiki during knowledge compilation. Based on the knowledge contained in source documents, it defines the overall Wiki framework, including the topics and pages to be generated and their organizational relationships, providing a structural foundation for subsequent Wiki page generation.

</template>
<template #zh>

蓝图（Blueprint）是 RAGFlow 在知识编译过程中规划 Wiki 内容结构时使用的一种中间产物。它基于源文档所包含的知识，定义 Wiki 的整体框架——包括要生成的主题、页面及其组织关系——为后续 Wiki 页面生成奠定结构基础。

</template>
</BiRow>

<BiRow>
<template #en>

**BM25**

</template>
<template #zh>

**BM25**

</template>
</BiRow>

<BiRow>
<template #en>

BM25 (Best Matching 25) is a commonly used relevance scoring algorithm in full-text search for measuring keyword matching between a query and text. It calculates relevance scores by considering factors such as term frequency, term rarity, and document length, and uses these scores to rank retrieval results.

</template>
<template #zh>

BM25（Best Matching 25）是全文搜索中常用的相关性评分算法，用于衡量查询与文本之间的关键词匹配程度。它综合考虑词频、词语稀有度、文档长度等因素计算相关性得分，并依据这些得分对检索结果排序。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, BM25 is used for relevance scoring in full-text search and can be combined with vector similarity to account for both keyword matching and semantic relevance.

</template>
<template #zh>

在 RAGFlow 中，BM25 用于全文搜索的相关性评分，并可以与向量相似度结合，同时兼顾关键词匹配与语义相关性。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### **C**

</template>
<template #zh>

### **C**

</template>
</BiRow>

<BiRow>
<template #en>

**Chat**

</template>
<template #zh>

**Chat**

</template>
</BiRow>

<BiRow>
<template #en>

Chat is a knowledge question-answering application provided by RAGFlow that enables conversations based on one or more knowledge bases and large language models. Chat can combine knowledge retrieval, Agentic Retrieval, and web search to obtain relevant information and generate answers based on the retrieved results.

</template>
<template #zh>

Chat 是 RAGFlow 提供的知识问答应用，可以基于一个或多个知识库与大语言模型进行对话。Chat 可以结合知识检索、Agentic Retrieval 和网络搜索获取相关信息，并基于检索结果生成回答。

</template>
</BiRow>

<BiRow>
<template #en>

**Chunk**

</template>
<template #zh>

**Chunk**

</template>
</BiRow>

<BiRow>
<template #en>

A chunk is a basic knowledge unit created after a document is parsed and split. It is also the primary object used by RAGFlow for indexing, retrieval, and citation.

</template>
<template #zh>

分块（chunk）是文档经过解析和切分后形成的基本知识单元，也是 RAGFlow 进行索引、检索和引用的主要对象。

</template>
</BiRow>

<BiRow>
<template #en>

A chunk typically contains the main text along with information such as its source document, location, and metadata.

</template>
<template #zh>

一个分块通常包含正文内容，以及来源文档、位置、元数据等信息。

</template>
</BiRow>

<BiRow>
<template #en>

**Chunk size**

</template>
<template #zh>

**Chunk size**

</template>
</BiRow>

<BiRow>
<template #en>

Chunk size controls the approximate length of each chunk during document chunking.

</template>
<template #zh>

分块大小（Chunk size）控制文档分块时每个分块的大致长度。

</template>
</BiRow>

<BiRow>
<template #en>

Larger chunks preserve more context but provide coarser retrieval granularity, while smaller chunks provide finer retrieval granularity but may split contextual information across chunks.

</template>
<template #zh>

较大的分块能保留更多上下文，但检索粒度较粗；较小的分块检索粒度更细，但可能把上下文信息切散到多个分块中。

</template>
</BiRow>

<BiRow>
<template #en>

**Chunking**

</template>
<template #zh>

**Chunking**

</template>
</BiRow>

<BiRow>
<template #en>

Chunking is the process of dividing parsed document content into chunks.

</template>
<template #zh>

分块（Chunking）是把解析后的文档内容切分为分块的过程。

</template>
</BiRow>

<BiRow>
<template #en>

An appropriate chunking strategy helps preserve document structure and semantic context and directly affects subsequent retrieval and question-answering performance. RAGFlow provides multiple built-in chunking methods and also supports custom document processing workflows through Ingestion Pipeline.

</template>
<template #zh>

合适的分块策略有助于保留文档结构和语义上下文，并直接影响后续检索和问答的效果。RAGFlow 内置了多种分块方法，还支持通过摄取管道（Ingestion Pipeline）自定义文档处理工作流。

</template>
</BiRow>

<BiRow>
<template #en>

**Citation**

</template>
<template #zh>

**Citation**

</template>
</BiRow>

<BiRow>
<template #en>

Citations show the knowledge sources on which an answer is based.

</template>
<template #zh>

引用（Citation）展示回答所依据的知识来源。

</template>
</BiRow>

<BiRow>
<template #en>

When citations are enabled, users can trace generated answers back to the relevant chunks or source documents to verify the supporting information.

</template>
<template #zh>

启用引用后，用户可以把生成的回答追溯至相关分块或源文档，核实其支撑信息。

</template>
</BiRow>

<BiRow>
<template #en>

**Context**

</template>
<template #zh>

**Context**

</template>
</BiRow>

<BiRow>
<template #en>

Context is the information available to a large language model when processing the current request, including user input, conversation history, retrieved knowledge, and system prompts. In RAG, relevant retrieved knowledge is provided to the model as context, enabling it to generate answers based on external knowledge.

</template>
<template #zh>

上下文（Context）是大语言模型在处理当前请求时可用的信息，包括用户输入、对话历史、检索到的知识和系统提示词。在 RAG 中，检索到的相关知识会作为上下文提供给模型，使其能够基于外部知识生成回答。

</template>
</BiRow>

<BiRow>
<template #en>

**Cross-language search**

</template>
<template #zh>

**Cross-language search**

</template>
</BiRow>

<BiRow>
<template #en>

Cross-language search allows users to submit a query in one language and retrieve relevant content written in other languages. For example, an English query can be used to retrieve Chinese documents.

</template>
<template #zh>

跨语言搜索（Cross-language search）允许用户以一种语言提交查询，检索以其他语言撰写的相关内容。例如，用英文查询检索中文文档。

</template>
</BiRow>

<BiRow>
<template #en>

This capability reduces retrieval limitations caused by differences between the query language and the language of the knowledge base content.

</template>
<template #zh>

这一能力可以减少查询语言与知识库内容语言不一致带来的检索限制。

</template>
</BiRow>

<BiRow>
<template #en>

**Creativity**

</template>
<template #zh>

**Creativity**

</template>
</BiRow>

<BiRow>
<template #en>

Creativity controls the randomness and diversity of model-generated answers. Lower values generally produce more stable and deterministic responses that adhere more closely to existing information, while higher values usually produce more flexible and diverse responses but may increase the likelihood of deviating from the context or generating inaccurate information.

</template>
<template #zh>

Creativity 控制模型生成回答的随机性与多样性。取值较低时，回答通常更稳定、更确定，也更贴近已有信息；取值较高时，回答通常更灵活、更多样，但偏离上下文或生成不准确信息的可能性也会增大。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### **D**

</template>
<template #zh>

### **D**

</template>
</BiRow>

<BiRow>
<template #en>

**Dataset**

</template>
<template #zh>

**Dataset**

</template>
</BiRow>

<BiRow>
<template #en>

A Dataset is the basic unit used in RAGFlow to organize and manage knowledge.

</template>
<template #zh>

数据集（Dataset）是 RAGFlow 组织和管理知识的基本单元。

</template>
</BiRow>

<BiRow>
<template #en>

A dataset can contain multiple documents. After documents are parsed, chunked, and indexed, they can be used for retrieval and knowledge applications such as Chat and Search.

</template>
<template #zh>

一个数据集可以包含多个文档。文档经过解析、分块和索引后，即可用于检索以及 Chat、Search 等知识应用。

</template>
</BiRow>

<BiRow>
<template #en>

**DeepDoc**

</template>
<template #zh>

**DeepDoc**

</template>
</BiRow>

<BiRow>
<template #en>

DeepDoc is RAGFlow's deep document understanding capability for processing complex documents such as PDFs and scanned files.

</template>
<template #zh>

DeepDoc 是 RAGFlow 的深度文档理解能力，用于处理 PDF、扫描件等复杂文档。

</template>
</BiRow>

<BiRow>
<template #en>

It combines capabilities such as OCR, Table Structure Recognition (TSR), and Document Layout Recognition (DLR) to extract text, tables, and layout information from documents, providing structured content for subsequent chunking, indexing, and retrieval.

</template>
<template #zh>

它综合运用 OCR、表格结构识别（TSR）、文档版面识别（DLR）等能力，从文档中提取文本、表格和版面信息，为后续分块、索引和检索提供结构化内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Delimiter**

</template>
<template #zh>

**Delimiter**

</template>
</BiRow>

<BiRow>
<template #en>

A delimiter specifies the characters used to identify content boundaries during document chunking.

</template>
<template #zh>

分隔符（Delimiter）指定文档分块时用于识别内容边界的字符。

</template>
</BiRow>

<BiRow>
<template #en>

Proper delimiter settings help the system split content according to paragraphs, sentences, or other structural boundaries, reducing inappropriate breaks in semantically related content.

</template>
<template #zh>

合理设置分隔符，有助于系统按段落、句子或其他结构边界切分内容，减少语义相关内容被不当截断的情况。

</template>
</BiRow>

<BiRow>
<template #en>

### **E**

</template>
<template #zh>

### **E**

</template>
</BiRow>

<BiRow>
<template #en>

**Embedding**

</template>
<template #zh>

**Embedding**

</template>
</BiRow>

<BiRow>
<template #en>

Embedding is the process of converting text or other content into numerical vectors (Vectors), and the term is also commonly used to refer to the resulting vector representations. Semantically similar content generally has similar vector representations. In RAG, embeddings are primarily used for vector search, where relevant content is retrieved by calculating the similarity between query vectors and chunk vectors.

</template>
<template #zh>

嵌入（Embedding）是把文本或其他内容转换成数值向量（Vectors）的过程，该词也常用来指代转换得到的向量表示。语义相近的内容通常具有相似的向量表示。在 RAG 中，嵌入主要用于向量搜索：通过计算查询向量与分块向量之间的相似度来检索相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Embedding model**

</template>
<template #zh>

**Embedding model**

</template>
</BiRow>

<BiRow>
<template #en>

An embedding model converts text into vector representations, enabling the system to perform retrieval based on semantic similarity.

</template>
<template #zh>

嵌入模型（Embedding model）把文本转换成向量表示，使系统能够基于语义相似度进行检索。

</template>
</BiRow>

<BiRow>
<template #en>

Chunks in a knowledge base and user queries can be converted into vectors through an embedding model to support capabilities such as vector search.

</template>
<template #zh>

知识库中的分块和用户查询都可以通过嵌入模型转换成向量，以支持向量搜索等能力。

</template>
</BiRow>

<BiRow>
<template #en>

**Empty response**

</template>
<template #zh>

**Empty response**

</template>
</BiRow>

<BiRow>
<template #en>

An empty response is predefined content returned when no knowledge satisfying the retrieval conditions is found.

</template>
<template #zh>

Empty response 是未检索到满足条件的内容时返回的预设内容。

</template>
</BiRow>

<BiRow>
<template #en>

Configuring an empty response can prevent the model from continuing to generate answers unrelated to the knowledge base when valid supporting knowledge is unavailable.

</template>
<template #zh>

配置 Empty response 后，在没有可用支撑知识的情况下，可以避免模型继续生成与知识库无关的回答。

</template>
</BiRow>

<BiRow>
<template #en>

**Entity**

</template>
<template #zh>

**Entity**

</template>
</BiRow>

<BiRow>
<template #en>

An entity is an independently meaningful object that can be identified and described in text, such as a person, organization, location, product, or event. In a knowledge graph, entities are typically represented as nodes and connected to other entities through relationships to represent and organize knowledge.

</template>
<template #zh>

实体（Entity）是文本中可识别、可描述的具有独立意义的对象，例如人物、组织、地点、产品或事件。在知识图谱中，实体通常表示为节点，并通过关系与其他实体相连，用以表示和组织知识。

</template>
</BiRow>

<BiRow>
<template #en>

**Entity Extraction**

</template>
<template #zh>

**Entity Extraction**

</template>
</BiRow>

<BiRow>
<template #en>

Entity Extraction is the process of identifying and extracting meaningful entities from text, such as people, organizations, locations, products, or events. Extracted entities can be used to build knowledge graphs, establish relationships between entities, and support subsequent knowledge retrieval and analysis.

</template>
<template #zh>

实体抽取（Entity Extraction）是从文本中识别并提取有意义实体的过程，例如人物、组织、地点、产品或事件。抽取出的实体可用于构建知识图谱、建立实体之间的关系，并支持后续的知识检索与分析。

</template>
</BiRow>

<BiRow>
<template #en>

### **F**

</template>
<template #zh>

### **F**

</template>
</BiRow>

<BiRow>
<template #en>

**Full-text search**

</template>
<template #zh>

**Full-text search**

</template>
</BiRow>

<BiRow>
<template #en>

Full-text search retrieves relevant content based on lexical matches between query terms and knowledge base content.

</template>
<template #zh>

全文搜索（Full-text search）基于查询词与知识库内容之间的词法匹配来检索相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

Compared with vector search, which primarily focuses on semantic similarity, full-text search is generally better suited for retrieving proper nouns, identifiers, keywords, and other content requiring exact lexical matching.

</template>
<template #zh>

与主要关注语义相似度的向量搜索相比，全文搜索通常更适合检索专有名词、标识符、关键词等需要精确词法匹配的内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Fusion**

</template>
<template #zh>

**Fusion**

</template>
</BiRow>

<BiRow>
<template #en>

Fusion is the process of combining and reranking results from different retrieval methods or queries. In RAG, Fusion is commonly used to integrate results from multiple retrieval methods, such as full-text search and vector search, to obtain more comprehensive and relevant retrieval results.

</template>
<template #zh>

融合（Fusion）是对来自不同检索方法或不同查询的结果进行合并和重排序的过程。在 RAG 中，融合常用于整合全文搜索、向量搜索等多种检索方法的结果，以获得更全面、更相关的检索结果。

</template>
</BiRow>

<BiRow>
<template #en>

### **G**

</template>
<template #zh>

### **G**

</template>
</BiRow>

<BiRow>
<template #en>

**Graph**

</template>
<template #zh>

**Graph**

</template>
</BiRow>

<BiRow>
<template #en>

Graph is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

Graph 是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It extracts entities and their relationships from existing content and organizes knowledge in a graph structure, helping users understand the connections among different entities, concepts, and information.

</template>
<template #zh>

它从已有内容中抽取实体及其关系，以图结构组织知识，帮助用户理解不同实体、概念和信息之间的关联。

</template>
</BiRow>

<BiRow>
<template #en>

**GraphRAG**

</template>
<template #zh>

**GraphRAG**

</template>
</BiRow>

<BiRow>
<template #en>

GraphRAG (Graph Retrieval-Augmented Generation) is a technique that combines knowledge graphs with Retrieval-Augmented Generation (RAG). It builds a knowledge graph by extracting entities and their relationships from documents and uses the graph structure to assist knowledge retrieval and answer generation.

</template>
<template #zh>

GraphRAG（Graph Retrieval-Augmented Generation，图检索增强生成）是一种把知识图谱与检索增强生成（RAG）相结合的技术。它通过从文档中抽取实体及其关系来构建知识图谱，并利用图结构辅助知识检索和答案生成。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, GraphRAG was a knowledge graph-related feature available before v0.27.0. Starting from v0.27.0, the related knowledge organization and generation capabilities have been restructured and are no longer provided as a standalone GraphRAG feature.

</template>
<template #zh>

在 RAGFlow 中，GraphRAG 是 v0.27.0 之前提供的知识图谱相关功能。自 v0.27.0 起，相关的知识组织和生成能力已被重构，不再作为独立的 GraphRAG 功能提供。

</template>
</BiRow>

<BiRow>
<template #en>

### **H**

</template>
<template #zh>

### **H**

</template>
</BiRow>

<BiRow>
<template #en>

**Hallucination**

</template>
<template #zh>

**Hallucination**

</template>
</BiRow>

<BiRow>
<template #en>

In large language models (LLMs), hallucination refers to generated content that appears plausible but is inaccurate, unsupported by facts, or inconsistent with the provided context. In RAG systems, retrieving relevant knowledge and providing it to the model as context can help reduce hallucinations.

</template>
<template #zh>

在大语言模型（LLM）中，幻觉（hallucination）指生成内容看似合理，实则不准确、缺乏事实依据或与给定上下文不一致的现象。在 RAG 系统中，检索相关知识并作为上下文提供给模型，有助于减少幻觉。

</template>
</BiRow>

<BiRow>
<template #en>

**Hybrid search**

</template>
<template #zh>

**Hybrid search**

</template>
</BiRow>

<BiRow>
<template #en>

Hybrid search combines vector search and full-text search, taking both semantic similarity and keyword matching into account.

</template>
<template #zh>

混合搜索（Hybrid search）结合向量搜索与全文搜索，同时兼顾语义相似度和关键词匹配。

</template>
</BiRow>

<BiRow>
<template #en>

This approach balances semantic understanding with exact lexical matching and can improve retrieval performance across different types of queries.

</template>
<template #zh>

这种方式在语义理解与精确词法匹配之间取得平衡，能够提升不同类型查询下的检索表现。

</template>
</BiRow>

<BiRow>
<template #en>

### **I**

</template>
<template #zh>

### **I**

</template>
</BiRow>

<BiRow>
<template #en>

**Index**

</template>
<template #zh>

**Index**

</template>
</BiRow>

<BiRow>
<template #en>

An index is a data structure built to improve data retrieval efficiency. In RAGFlow, indexes are used to organize document chunks, vectors, and associated metadata, supporting full-text search, vector search, and hybrid search.

</template>
<template #zh>

索引（Index）是为提升数据检索效率而构建的数据结构。在 RAGFlow 中，索引用于组织文档分块、向量及相关元数据，支持全文搜索、向量搜索和混合搜索。

</template>
</BiRow>

<BiRow>
<template #en>

**Ingestion Pipeline**

</template>
<template #zh>

**Ingestion Pipeline**

</template>
</BiRow>

<BiRow>
<template #en>

Ingestion Pipeline defines how documents are processed after they enter a knowledge base.

</template>
<template #zh>

摄取管道（Ingestion Pipeline）定义文档进入知识库后的处理方式。

</template>
</BiRow>

<BiRow>
<template #en>

Users can customize document parsing, content processing, chunking, and other processing steps through a Pipeline to accommodate different data types and business requirements.

</template>
<template #zh>

用户可以通过管道自定义文档解析、内容处理、分块等处理步骤，以适应不同的数据类型和业务需求。

</template>
</BiRow>

<BiRow>
<template #en>

### **K**

</template>
<template #zh>

### **K**

</template>
</BiRow>

<BiRow>
<template #en>

**Keyword**

</template>
<template #zh>

**Keyword**

</template>
</BiRow>

<BiRow>
<template #en>

A Keyword is a word or phrase used to represent the core content, topic, or important concepts of a piece of text.

</template>
<template #zh>

关键词（Keyword）是用于表示一段文本核心内容、主题或重要概念的词或短语。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, keywords can be used to enrich the content representation of chunks and assist knowledge retrieval and matching.

</template>
<template #zh>

在 RAGFlow 中，关键词可用于丰富分块的内容表示，并辅助知识检索与匹配。

</template>
</BiRow>

<BiRow>
<template #en>

**Keyword analysis**

</template>
<template #zh>

**Keyword analysis**

</template>
</BiRow>

<BiRow>
<template #en>

Keyword analysis is the process of analyzing a user query and extracting its key concepts, topics, or important terms.

</template>
<template #zh>

关键词分析（Keyword analysis）是对用户查询进行分析并提取其关键概念、主题或重要词语的过程。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, keyword analysis is used to enrich query representation, helping the system identify retrieval intent more accurately and improve the recall of relevant knowledge.

</template>
<template #zh>

在 RAGFlow 中，关键词分析用于丰富查询表示，帮助系统更准确地识别检索意图，提升相关知识的召回效果。

</template>
</BiRow>

<BiRow>
<template #en>

**Knowledge artifact**

</template>
<template #zh>

**Knowledge artifact**

</template>
</BiRow>

<BiRow>
<template #en>

A knowledge artifact is a structured representation of knowledge generated from documents or knowledge base content through Knowledge Compilation.

</template>
<template #zh>

知识工件（knowledge artifact）是通过知识编译（Knowledge Compilation）从文档或知识库内容生成的结构化知识表示。

</template>
</BiRow>

<BiRow>
<template #en>

Depending on the Knowledge Compilation template used, different forms of knowledge artifacts can be generated, including Wiki, Graph, Tree, PageIndex, Mind Map, Timeline, and Skills.

</template>
<template #zh>

根据所使用的知识编译模板，可以生成不同形态的知识工件，包括 Wiki、Graph、Tree、PageIndex、思维导图（Mind Map）、时间线（Timeline）和 Skills。

</template>
</BiRow>

<BiRow>
<template #en>

These artifacts reorganize existing knowledge into different structures and can be used for knowledge browsing, understanding, and subsequent applications.

</template>
<template #zh>

这些工件把已有知识重新组织成不同的结构，可用于知识浏览、理解以及后续应用。

</template>
</BiRow>

<BiRow>
<template #en>

**Knowledge Compilation**

</template>
<template #zh>

**Knowledge Compilation**

</template>
</BiRow>

<BiRow>
<template #en>

Knowledge Compilation further refines, organizes, and structures existing document or knowledge base content.

</template>
<template #zh>

知识编译（Knowledge Compilation）对已有的文档或知识库内容做进一步的提炼、组织和结构化。

</template>
</BiRow>

<BiRow>
<template #en>

Knowledge Compilation can be performed on an individual document or an entire knowledge base. By selecting different compilation templates, raw content can be transformed into knowledge artifacts such as Wiki, Graph, Tree, PageIndex, Mind Map, Timeline, or Skills.

</template>
<template #zh>

知识编译既可以针对单个文档执行，也可以针对整个知识库执行。通过选择不同的编译模板，原始内容可以被转化为 Wiki、Graph、Tree、PageIndex、思维导图、时间线、Skills 等知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

**Knowledge Compilation Template**

</template>
<template #zh>

**Knowledge Compilation Template**

</template>
</BiRow>

<BiRow>
<template #en>

A Knowledge Compilation Template is a predefined template that determines how knowledge is compiled and how the resulting artifact is structured.

</template>
<template #zh>

知识编译模板（Knowledge Compilation Template）是预定义的模板，决定了知识如何被编译以及生成的工件具有怎样的结构。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, different templates can compile source documents or knowledge base content into specific forms of knowledge artifacts, such as Wiki, Graph, Tree, Page Index, Mind Map, Timeline, and Skills, to support different knowledge organization and usage scenarios.

</template>
<template #zh>

在 RAGFlow 中，不同模板可以把源文档或知识库内容编译成特定形态的知识工件，例如 Wiki、Graph、Tree、PageIndex、思维导图、时间线和 Skills，以支持不同的知识组织与使用场景。

</template>
</BiRow>

<BiRow>
<template #en>

### **L**

</template>
<template #zh>

### **L**

</template>
</BiRow>

<BiRow>
<template #en>

**LLM**

</template>
<template #zh>

**LLM**

</template>
</BiRow>

<BiRow>
<template #en>

LLM (Large Language Model) is a model designed to understand and generate natural language content.

</template>
<template #zh>

LLM（Large Language Model，大语言模型）是为理解和生成自然语言内容而设计的模型。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, LLMs are primarily used for answer generation, content understanding, information extraction, reasoning, and Agent task execution.

</template>
<template #zh>

在 RAGFlow 中，LLM 主要用于回答生成、内容理解、信息抽取、推理以及 Agent 任务执行。

</template>
</BiRow>

<BiRow>
<template #en>

### **M**

</template>
<template #zh>

### **M**

</template>
</BiRow>

<BiRow>
<template #en>

**Max tokens**

</template>
<template #zh>

**Max tokens**

</template>
</BiRow>

<BiRow>
<template #en>

Max tokens limits the maximum number of tokens a model can generate in a single response.

</template>
<template #zh>

Max tokens 限制模型单次回答中可生成的最大 token 数量。

</template>
</BiRow>

<BiRow>
<template #en>

A larger value allows the model to generate longer responses but may also increase model invocation time and token consumption.

</template>
<template #zh>

取值越大，模型可以生成越长的回答，但也会增加模型调用时间和 token 消耗。

</template>
</BiRow>

<BiRow>
<template #en>

**MCP**

</template>
<template #zh>

**MCP**

</template>
</BiRow>

<BiRow>
<template #en>

MCP (Model Context Protocol) is an open protocol for connecting large language models with external tools, data sources, and services.

</template>
<template #zh>

MCP（Model Context Protocol，模型上下文协议）是一个开放协议，用于连接大语言模型与外部工具、数据源和服务。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, MCP can be used to integrate external tools and services, enabling Agents to invoke these capabilities for data queries, content processing, and other tasks.

</template>
<template #zh>

在 RAGFlow 中，MCP 可用于集成外部工具和服务，让 Agent 调用这些能力完成数据查询、内容处理等任务。

</template>
</BiRow>

<BiRow>
<template #en>

**Metadata**

</template>
<template #zh>

**Metadata**

</template>
</BiRow>

<BiRow>
<template #en>

Metadata is additional information associated with a document or chunk, such as its source, category, tags, or other business attributes.

</template>
<template #zh>

元数据（Metadata）是与文档或分块相关联的附加信息，例如来源、类别、标签或其他业务属性。

</template>
</BiRow>

<BiRow>
<template #en>

Metadata can be used to describe and organize knowledge and can also serve as retrieval filtering criteria.

</template>
<template #zh>

元数据可用于描述和组织知识，也可以作为检索过滤条件。

</template>
</BiRow>

<BiRow>
<template #en>

**Metadata filter**

</template>
<template #zh>

**Metadata filter**

</template>
</BiRow>

<BiRow>
<template #en>

Metadata filtering restricts the retrieval scope based on document or chunk metadata.

</template>
<template #zh>

元数据过滤（Metadata filter）基于文档或分块的元数据来限定检索范围。

</template>
</BiRow>

<BiRow>
<template #en>

For example, retrieval can be limited to content that matches a specified category, source, or other business attribute, making retrieval results more targeted.

</template>
<template #zh>

例如，可以把检索限定在与指定类别、来源或其他业务属性相匹配的内容上，使检索结果更有针对性。

</template>
</BiRow>

<BiRow>
<template #en>

**Mind Map**

</template>
<template #zh>

**Mind Map**

</template>
</BiRow>

<BiRow>
<template #en>

Mind Map is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

思维导图（Mind Map）是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It organizes the main topics and subtopics in the content into a hierarchical mind map, helping users quickly understand the knowledge structure and relationships among different topics.

</template>
<template #zh>

它把内容中的主题与子主题组织成层级化的思维导图，帮助用户快速了解知识结构以及不同主题之间的关系。

</template>
</BiRow>

<BiRow>
<template #en>

**Model Provider**

</template>
<template #zh>

**Model Provider**

</template>
</BiRow>

<BiRow>
<template #en>

A Model Provider is a platform or service provider that provides large language models, embedding models, reranking models, and other AI model services.

</template>
<template #zh>

模型提供商（Model Provider）是提供大语言模型、嵌入模型、重排序模型等 AI 模型服务的平台或服务商。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, users can configure different model providers and use their models for tasks such as conversation generation, embedding, reranking, and speech processing.

</template>
<template #zh>

在 RAGFlow 中，用户可以配置不同的模型提供商，并使用它们的模型完成对话生成、嵌入、重排序、语音处理等任务。

</template>
</BiRow>

<BiRow>
<template #en>

### **O**

</template>
<template #zh>

### **O**

</template>
</BiRow>

<BiRow>
<template #en>

**OCR**

</template>
<template #zh>

**OCR**

</template>
</BiRow>

<BiRow>
<template #en>

OCR (Optical Character Recognition) is used to recognize text in images, scanned documents, or PDF pages and convert it into machine-processable text. In RAGFlow, OCR can be used during document parsing to extract text that cannot be read directly from images, providing textual content for subsequent chunking, indexing, and retrieval.

</template>
<template #zh>

OCR（Optical Character Recognition，光学字符识别）用于识别图像、扫描文档或 PDF 页面中的文字，并将其转换为机器可处理的文本。在 RAGFlow 中，OCR 可在文档解析阶段用于提取无法从图像中直接读取的文字，为后续分块、索引和检索提供文本内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Overlapped percent**

</template>
<template #zh>

**Overlapped percent**

</template>
</BiRow>

<BiRow>
<template #en>

Overlapped percent controls the proportion of duplicated content between adjacent chunks.

</template>
<template #zh>

重叠比例（Overlapped percent）控制相邻分块之间重复内容的比例。

</template>
</BiRow>

<BiRow>
<template #en>

An appropriate amount of overlap can reduce context loss caused by chunk boundaries and better preserve information spanning multiple chunks. However, an excessively high overlap percentage can also increase duplicated content.

</template>
<template #zh>

适量的重叠可以减少分块边界造成的上下文丢失，更好地保留跨越多个分块的信息；但重叠比例过高也会增加重复内容。

</template>
</BiRow>

<BiRow>
<template #en>

### **P**

</template>
<template #zh>

### **P**

</template>
</BiRow>

<BiRow>
<template #en>

**PageIndex**

</template>
<template #zh>

**PageIndex**

</template>
</BiRow>

<BiRow>
<template #en>

PageIndex is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

PageIndex 是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It generates a hierarchical index based on document content and structure, helping the system and users quickly locate content related to specific topics. It is particularly suitable for long documents with clear chapters and hierarchical structures.

</template>
<template #zh>

它基于文档内容和结构生成层级化索引，帮助系统和用户快速定位与特定主题相关的内容，尤其适合章节结构清晰、层次分明的长文档。

</template>
</BiRow>

<BiRow>
<template #en>

**Parser**

</template>
<template #zh>

**Parser**

</template>
</BiRow>

<BiRow>
<template #en>

A parser is a component used to read and process document content and convert it into data that can be processed by the system.

</template>
<template #zh>

解析器（Parser）是用于读取和处理文档内容、并将其转换为系统可处理数据的组件。

</template>
</BiRow>

<BiRow>
<template #en>

In a RAG system, parsers extract text, tables, images, and other content from files in formats such as PDF, Word, and Excel, providing the foundation for subsequent chunking, indexing, and retrieval.

</template>
<template #zh>

在 RAG 系统中，解析器从 PDF、Word、Excel 等格式的文件中提取文本、表格、图像等内容，为后续分块、索引和检索奠定基础。

</template>
</BiRow>

<BiRow>
<template #en>

**Prompt**

</template>
<template #zh>

**Prompt**

</template>
</BiRow>

<BiRow>
<template #en>

A prompt is an instruction or context provided to a large language model to guide it in understanding a task and generating the desired output.

</template>
<template #zh>

提示词（Prompt）是提供给大语言模型的指令或上下文，用于引导模型理解任务并生成期望的输出。

</template>
</BiRow>

<BiRow>
<template #en>

In a RAG system, a prompt can include task instructions, role definitions, retrieved knowledge context, and output requirements to control the content and format of model responses.

</template>
<template #zh>

在 RAG 系统中，提示词可以包含任务指令、角色定义、检索到的知识上下文和输出要求，用来控制模型回答的内容与格式。

</template>
</BiRow>

<BiRow>
<template #en>

### **Q**

</template>
<template #zh>

### **Q**

</template>
</BiRow>

<BiRow>
<template #en>

**Query**

</template>
<template #zh>

**Query**

</template>
</BiRow>

<BiRow>
<template #en>

A query is a retrieval request submitted by a user to express the information they want to find or the question they want answered.

</template>
<template #zh>

查询（Query）是用户提交的检索请求，表达想要查找的信息或希望解答的问题。

</template>
</BiRow>

<BiRow>
<template #en>

In a RAG system, queries are used to retrieve relevant content from knowledge bases or other data sources and provide context for subsequent answer generation.

</template>
<template #zh>

在 RAG 系统中，查询用于从知识库或其他数据源中检索相关内容，并为后续的答案生成提供上下文。

</template>
</BiRow>

<BiRow>
<template #en>

**Query Expansion**

</template>
<template #zh>

**Query Expansion**

</template>
</BiRow>

<BiRow>
<template #en>

Query Expansion is the process of generating one or more expanded queries by adding terms, expressions, or semantic information related to the original query.

</template>
<template #zh>

查询扩展（Query Expansion）是通过添加与原始查询相关的词语、表达或语义信息，生成一个或多个扩展查询的过程。

</template>
</BiRow>

<BiRow>
<template #en>

In a RAG system, query expansion enriches the semantic representation of a query, helping the retrieval system recall more relevant content and improve retrieval performance.

</template>
<template #zh>

在 RAG 系统中，查询扩展丰富了查询的语义表示，帮助检索系统召回更多相关内容，提升检索表现。

</template>
</BiRow>

<BiRow>
<template #en>

**Question**

</template>
<template #zh>

**Question**

</template>
</BiRow>

<BiRow>
<template #en>

A question is an information request submitted by a user with the expectation of receiving an answer.

</template>
<template #zh>

问题（Question）是用户提交的、期望获得回答的信息请求。

</template>
</BiRow>

<BiRow>
<template #en>

In a RAG system, a question typically serves as input to the retrieval and generation process. The system retrieves relevant knowledge based on the question and generates an answer using the retrieved results.

</template>
<template #zh>

在 RAG 系统中，问题通常作为检索与生成过程的输入：系统基于问题检索相关知识，并利用检索结果生成回答。

</template>
</BiRow>

<BiRow>
<template #en>

### **R**

</template>
<template #zh>

### **R**

</template>
</BiRow>

<BiRow>
<template #en>

**RAG**

</template>
<template #zh>

**RAG**

</template>
</BiRow>

<BiRow>
<template #en>

RAG (Retrieval-Augmented Generation) is an approach that combines information retrieval with large language model generation.

</template>
<template #zh>

RAG（Retrieval-Augmented Generation，检索增强生成）是把信息检索与大语言模型生成相结合的一种方法。

</template>
</BiRow>

<BiRow>
<template #en>

The system first retrieves content relevant to a question from a knowledge base or other data sources and then provides the retrieved results to a large language model as context for answer generation, improving consistency with existing knowledge and answer traceability.

</template>
<template #zh>

系统先从知识库或其他数据源中检索与问题相关的内容，再把检索结果作为上下文提供给大语言模型生成回答，从而提高回答与既有知识的一致性，并让回答可追溯。

</template>
</BiRow>

<BiRow>
<template #en>

**Recall**

</template>
<template #zh>

**Recall**

</template>
</BiRow>

<BiRow>
<template #en>

Recall refers to the process of retrieving relevant content from a knowledge base based on a user query. In RAGFlow, recall is typically performed through vector search, full-text search, or hybrid search. The recalled content can then be reranked or provided to the model as context for answer generation.

</template>
<template #zh>

召回（Recall）指基于用户查询从知识库中检索出相关内容的过程。在 RAGFlow 中，召回通常通过向量搜索、全文搜索或混合搜索完成。召回的内容可以进一步重排序，或作为上下文提供给模型生成回答。

</template>
</BiRow>

<BiRow>
<template #en>

**Reranker**

</template>
<template #zh>

**Reranker**

</template>
</BiRow>

<BiRow>
<template #en>

A reranker further evaluates the relevance of candidate results obtained from initial retrieval and rearranges their order.

</template>
<template #zh>

重排序器（Reranker）会对初始检索得到的候选结果做进一步的相关性评估，并重新排列其顺序。

</template>
</BiRow>

<BiRow>
<template #en>

Reranking allows content that is more relevant to the user's question to be prioritized in subsequent processing.

</template>
<template #zh>

经过重排序，与用户问题更相关的内容可以在后续处理中被优先采用。

</template>
</BiRow>

<BiRow>
<template #en>

**Retrieval**

</template>
<template #zh>

**Retrieval**

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval is the process of finding relevant content in a knowledge base based on a user query.

</template>
<template #zh>

检索（Retrieval）是基于用户查询在知识库中查找相关内容的过程。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow supports vector search, full-text search, and hybrid search, and can further optimize retrieval results using mechanisms such as reranking and metadata filtering.

</template>
<template #zh>

RAGFlow 支持向量搜索、全文搜索和混合搜索，并可通过重排序、元数据过滤等机制进一步优化检索结果。

</template>
</BiRow>

<BiRow>
<template #en>

**Retrieval enhancement**

</template>
<template #zh>

**Retrieval enhancement**

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval enhancement refers to a set of capabilities that further process queries, the retrieval process, or retrieval results beyond basic retrieval.

</template>
<template #zh>

检索增强（Retrieval enhancement）指在基础检索之外，对查询、检索过程或检索结果做进一步处理的一组能力。

</template>
</BiRow>

<BiRow>
<template #en>

Depending on the configuration, the system can perform keyword analysis, semantic expansion, question splitting and merging, and evidence checking to improve retrieval performance for complex questions.

</template>
<template #zh>

依据配置的不同，系统可以执行关键词分析、语义扩展、问题拆分与合并、证据核查等操作，提升复杂问题下的检索表现。

</template>
</BiRow>

<BiRow>
<template #en>

**Retrieval test**

</template>
<template #zh>

**Retrieval test**

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval test is used to evaluate the retrieval performance of a knowledge base.

</template>
<template #zh>

检索测试（Retrieval test）用于评估知识库的检索效果。

</template>
</BiRow>

<BiRow>
<template #en>

Users can enter test queries and inspect the recalled chunks and related information to evaluate and adjust retrieval methods, similarity thresholds, reranking, and other configurations.

</template>
<template #zh>

用户可以输入测试查询，查看召回的分块及相关信息，进而评估和调整检索方法、相似度阈值、重排序等配置。

</template>
</BiRow>

<BiRow>
<template #en>

**RRF**

</template>
<template #zh>

**RRF**

</template>
</BiRow>

<BiRow>
<template #en>

RRF (Reciprocal Rank Fusion) is a ranking algorithm used to fuse results from multiple retrieval methods.

</template>
<template #zh>

RRF（Reciprocal Rank Fusion，倒数排名融合）是一种用于融合多种检索方法结果的排序算法。

</template>
</BiRow>

<BiRow>
<template #en>

It calculates a fusion score based on the ranking position of a document in different retrieval result lists and reranks the results without requiring the original scores from different retrieval methods to use the same scale. It is commonly used to combine results from vector search, full-text search, and other retrieval methods to improve overall relevance.

</template>
<template #zh>

它根据文档在不同检索结果列表中的排名位置计算融合得分并重新排序，不要求不同检索方法的原始得分处于同一量纲。它常用于合并向量搜索、全文搜索等多种检索方法的结果，以提升整体相关性。

</template>
</BiRow>

<BiRow>
<template #en>

**RAPTOR**

</template>
<template #zh>

**RAPTOR**

</template>
</BiRow>

<BiRow>
<template #en>

RAPTOR (Recursive Abstractive Processing for Tree-Organized Retrieval) is a retrieval method that constructs a hierarchical semantic structure through recursive clustering and summarization.

</template>
<template #zh>

RAPTOR（Recursive Abstractive Processing for Tree-Organized Retrieval）是一种通过递归聚类与摘要来构建层级语义结构的检索方法。

</template>
</BiRow>

<BiRow>
<template #en>

Before RAGFlow v0.27.0, RAPTOR could be used to cluster and summarize document chunks, forming a hierarchical index ranging from lower-level original chunks to higher-level summaries to support retrieval at different levels of granularity. Starting from RAGFlow v0.27.0, RAPTOR has been replaced by Knowledge Compilation-related capabilities.

</template>
<template #zh>

在 RAGFlow v0.27.0 之前，RAPTOR 可用于对文档分块进行聚类和摘要，形成从底层原始分块到上层摘要的层级索引，以支持不同粒度的检索。自 RAGFlow v0.27.0 起，RAPTOR 已被知识编译相关能力取代。

</template>
</BiRow>

<BiRow>
<template #en>

**Recommended chunk size**

</template>
<template #zh>

**Recommended chunk size**

</template>
</BiRow>

<BiRow>
<template #en>

Recommended chunk size refers to the recommended number of tokens contained in a single chunk during document parsing and chunking.

</template>
<template #zh>

推荐分块大小（Recommended chunk size）指文档解析和分块时，单个分块建议包含的 token 数量。

</template>
</BiRow>

<BiRow>
<template #en>

This parameter controls the target size of generated chunks. Smaller chunks generally contain more localized information, while larger chunks preserve more context. The actual generated chunk size is also affected by factors such as document structure, delimiters, and parsing strategies, so it may not exactly match the configured value.

</template>
<template #zh>

该参数控制生成分块的目标大小。较小的分块通常包含更局部化的信息，较大的分块则保留更多上下文。实际生成的分块大小还会受文档结构、分隔符和解析策略等因素影响，因此未必与配置值完全一致。

</template>
</BiRow>

<BiRow>
<template #en>

### **S**

</template>
<template #zh>

### **S**

</template>
</BiRow>

<BiRow>
<template #en>

**Search**

</template>
<template #zh>

**Search**

</template>
</BiRow>

<BiRow>
<template #en>

Search is one of the knowledge applications provided by RAGFlow. It searches knowledge base content and returns relevant results.

</template>
<template #zh>

Search 是 RAGFlow 提供的知识应用之一，用于搜索知识库内容并返回相关结果。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike Chat, which generates answers in a conversational format, Search focuses more on knowledge retrieval and the presentation of search results.

</template>
<template #zh>

与以对话形式生成回答的 Chat 不同，Search 更侧重知识检索本身以及搜索结果的呈现。

</template>
</BiRow>

<BiRow>
<template #en>

**Semantic Search**

</template>
<template #zh>

**Semantic Search**

</template>
</BiRow>

<BiRow>
<template #en>

Semantic Search retrieves relevant information based on semantic similarity between a query and content rather than relying solely on exact keyword matching.

</template>
<template #zh>

语义搜索（Semantic Search）基于查询与内容之间的语义相似度来检索相关信息，而不单纯依赖精确的关键词匹配。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, Semantic Search uses an Embedding model to convert queries and document chunks into vectors and retrieves relevant chunks based on vector similarity. It can be used independently or combined with full-text search for hybrid search.

</template>
<template #zh>

在 RAGFlow 中，语义搜索使用嵌入模型把查询和文档分块转换成向量，并基于向量相似度检索相关分块。它既可以独立使用，也可以与全文搜索结合用于混合搜索。

</template>
</BiRow>

<BiRow>
<template #en>

**Similarity threshold**

</template>
<template #zh>

**Similarity threshold**

</template>
</BiRow>

<BiRow>
<template #en>

Similarity threshold defines the minimum relevance requirement that retrieval results must meet.

</template>
<template #zh>

相似度阈值（Similarity threshold）定义检索结果必须满足的最低相关性要求。

</template>
</BiRow>

<BiRow>
<template #en>

Candidate chunks with relevance scores below this threshold are filtered out. Increasing the threshold generally reduces low-relevance results, but setting it too high may also prevent useful content from being recalled.

</template>
<template #zh>

相关性得分低于该阈值的候选分块会被过滤掉。调高阈值通常能减少低相关结果，但设置得过高也可能导致有用内容无法被召回。

</template>
</BiRow>

<BiRow>
<template #en>

**Skills**

</template>
<template #zh>

**Skills**

</template>
</BiRow>

<BiRow>
<template #en>

Skills are a knowledge organization mechanism that precompiles knowledge from a knowledge base into a navigable hierarchical directory.

</template>
<template #zh>

Skills 是一种知识组织机制，它把知识库中的知识预编译成一个可导航的层级目录。

</template>
</BiRow>

<BiRow>
<template #en>

They organize knowledge into a hierarchical structure based on thematic and semantic relationships, with directory summaries describing the knowledge contained at each level and its child branches. During retrieval, an Agent reads these summaries based on the user query, selects relevant branches, and progressively navigates down the hierarchy to locate and retrieve the relevant source documents or evidence.

</template>
<template #zh>

Skills 基于主题和语义关系把知识组织成层级结构，各级目录的摘要描述了该层级及其子分支所包含的知识。检索时，Agent 会基于用户查询读取这些摘要，选择相关分支，并沿层级逐级向下导航，定位并检索相关的源文档或证据。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike traditional retrieval methods that recall Top-K text chunks based on similarity scores, Skills transform retrieval into a process of navigation and localization over a hierarchical knowledge structure. This enables the Agent to actively explore the knowledge base and progressively narrow the retrieval scope.

</template>
<template #zh>

与基于相似度得分召回 Top-K 文本分块的传统检索方式不同，Skills 把检索变成在层级化知识结构上的导航与定位过程，使 Agent 能够主动探索知识库并逐步收窄检索范围。

</template>
</BiRow>

<BiRow>
<template #en>

**System prompt**

</template>
<template #zh>

**System prompt**

</template>
</BiRow>

<BiRow>
<template #en>

A system prompt defines the model's role, behavior, and answer requirements in Chat.

</template>
<template #zh>

系统提示词（System prompt）定义了模型在 Chat 中的角色、行为和回答要求。

</template>
</BiRow>

<BiRow>
<template #en>

Users can use the system prompt to specify response style, task rules, how knowledge should be used, and other instructions that the model should follow.

</template>
<template #zh>

用户可以通过系统提示词指定回答风格、任务规则、知识使用方式等要求模型遵循的指令。

</template>
</BiRow>

<BiRow>
<template #en>

### **T**

</template>
<template #zh>

### **T**

</template>
</BiRow>

<BiRow>
<template #en>

**Tag**

</template>
<template #zh>

**Tag**

</template>
</BiRow>

<BiRow>
<template #en>

A tag is an attribute used to label and categorize documents or content and can describe their category, topic, or other characteristics.

</template>
<template #zh>

标签（Tag）是用于标注和归类文档或内容的属性，可以描述其类别、主题或其他特征。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, tags can be used to classify and manage documents in a knowledge base and can also serve as retrieval criteria to help the system filter and locate relevant content.

</template>
<template #zh>

在 RAGFlow 中，标签可用于对知识库中的文档进行分类和管理，也可以作为检索条件，帮助系统筛选和定位相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Temperature**

</template>
<template #zh>

**Temperature**

</template>
</BiRow>

<BiRow>
<template #en>

Temperature is a parameter that controls randomness in model generation.

</template>
<template #zh>

Temperature 是控制模型生成随机性的参数。

</template>
</BiRow>

<BiRow>
<template #en>

Lower values generally make outputs more stable and deterministic, while higher values increase diversity and randomness. The exact effect depends on the model being used.

</template>
<template #zh>

取值较低时，输出通常更稳定、更确定；取值较高时，多样性和随机性会增加。具体效果取决于所使用的模型。

</template>
</BiRow>

<BiRow>
<template #en>

**Thinking level**

</template>
<template #zh>

**Thinking level**

</template>
</BiRow>

<BiRow>
<template #en>

Thinking level controls the depth of retrieval and reasoning used by Chat when processing a question.

</template>
<template #zh>

Thinking 档位控制 Chat 处理问题时所用的检索与推理深度。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow provides different Thinking levels. Higher levels can perform deeper question analysis and retrieval processing and are suitable for complex questions that require multi-step analysis or more comprehensive supporting evidence, but they generally require more processing time and model invocations.

</template>
<template #zh>

RAGFlow 提供了不同的 Thinking 档位。较高的档位可以进行更深入的问题分析和检索处理，适合需要多步分析或更全面支撑证据的复杂问题，但通常需要更多处理时间和模型调用。

</template>
</BiRow>

<BiRow>
<template #en>

**Timeline**

</template>
<template #zh>

**Timeline**

</template>
</BiRow>

<BiRow>
<template #en>

Timeline is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

时间线（Timeline）是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It identifies times, events, and related information in the content and organizes knowledge chronologically, making it suitable for understanding how events develop and their temporal relationships.

</template>
<template #zh>

它识别内容中的时间、事件及相关信息，并按时间先后组织知识，适合理解事件的发展脉络及其时间关系。

</template>
</BiRow>

<BiRow>
<template #en>

**Token**

</template>
<template #zh>

**Token**

</template>
</BiRow>

<BiRow>
<template #en>

A Token is a basic text unit processed by a large language model. It can be a character, a word, part of a word, punctuation, or another textual unit.

</template>
<template #zh>

Token 是大语言模型处理的基本文本单位，可以是一个字符、一个词、词的一部分、标点或其他文本单元。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, token counts can be used to measure the length of document chunks, queries, prompts, and model context, and they affect document chunking, context organization, and the length of model inputs and outputs.

</template>
<template #zh>

在 RAGFlow 中，token 数量可用于衡量文档分块、查询、提示词和模型上下文的长度，并会影响文档分块、上下文组织以及模型输入输出的长度。

</template>
</BiRow>

<BiRow>
<template #en>

**Top N**

</template>
<template #zh>

**Top N**

</template>
</BiRow>

<BiRow>
<template #en>

Top N controls the number of candidate chunks retained during retrieval.

</template>
<template #zh>

Top N 控制检索过程中保留的候选分块数量。

</template>
</BiRow>

<BiRow>
<template #en>

A larger Top N provides more candidate knowledge but may introduce less relevant content, while a smaller Top N keeps results more focused but may omit some useful information.

</template>
<template #zh>

Top N 越大，可用的候选知识越多，但可能引入相关性较低的内容；Top N 越小，结果越聚焦，但也可能遗漏部分有用信息。

</template>
</BiRow>

<BiRow>
<template #en>

**Top P**

</template>
<template #zh>

**Top P**

</template>
</BiRow>

<BiRow>
<template #en>

Top P is a parameter that controls the sampling range during model generation.

</template>
<template #zh>

Top P 是控制模型生成时采样范围的参数。

</template>
</BiRow>

<BiRow>
<template #en>

The model samples from candidate tokens whose cumulative probability falls within the specified range. Lower values generally make generation more focused, while higher values allow more candidate content to participate in generation. The exact behavior depends on the model being used.

</template>
<template #zh>

模型从累计概率落在指定范围内的候选 token 中采样。取值较低时，生成通常更聚焦；取值较高时，允许更多候选内容参与生成。具体行为取决于所使用的模型。

</template>
</BiRow>

<BiRow>
<template #en>

**Tree**

</template>
<template #zh>

**Tree**

</template>
</BiRow>

<BiRow>
<template #en>

Tree is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

Tree 是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It organizes content into a tree structure based on topics and their hierarchical relationships, helping users understand the hierarchy of knowledge from an overall view down to specific details.

</template>
<template #zh>

它基于主题及其层级关系把内容组织成树结构，帮助用户从整体轮廓到具体细节逐层理解知识的层次。

</template>
</BiRow>

<BiRow>
<template #en>

**TTS**

</template>
<template #zh>

**TTS**

</template>
</BiRow>

<BiRow>
<template #en>

TTS (Text-to-Speech) is a model capability that converts text into speech.

</template>
<template #zh>

TTS（Text-to-Speech，语音合成）是一种把文本转换成语音的模型能力。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, TTS can be used to convert text answers generated by a model into speech output.

</template>
<template #zh>

在 RAGFlow 中，TTS 可用于把模型生成的文本回答转换成语音输出。

</template>
</BiRow>

<BiRow>
<template #en>

### **V**

</template>
<template #zh>

### **V**

</template>
</BiRow>

<BiRow>
<template #en>

**Vector**

</template>
<template #zh>

**Vector**

</template>
</BiRow>

<BiRow>
<template #en>

A vector is a data representation consisting of a set of numerical values. In RAG, text and other content are represented as vectors after being processed by an Embedding model, and semantically similar content generally has similar vector representations. Vector search finds semantically relevant content by calculating the similarity between query vectors and chunk vectors.

</template>
<template #zh>

向量（Vector）是由一组数值构成的数据表示。在 RAG 中，文本等内容经嵌入模型处理后表示为向量，语义相近的内容通常具有相似的向量表示。向量搜索通过计算查询向量与分块向量之间的相似度，找到语义相关的内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Vector search**

</template>
<template #zh>

**Vector search**

</template>
</BiRow>

<BiRow>
<template #en>

Vector search retrieves relevant content by comparing the similarity between query vectors and vectors representing knowledge base content.

</template>
<template #zh>

向量搜索（Vector search）通过比较查询向量与知识库内容向量之间的相似度来检索相关内容。

</template>
</BiRow>

<BiRow>
<template #en>

Unlike full-text search, which relies on lexical matching, vector search primarily focuses on semantic similarity between texts, allowing it to retrieve content with different wording but similar meanings.

</template>
<template #zh>

与依赖词法匹配的全文搜索不同，向量搜索主要关注文本之间的语义相似度，因而能够检索出措辞不同但含义相近的内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Vector similarity weight**

</template>
<template #zh>

**Vector similarity weight**

</template>
</BiRow>

<BiRow>
<template #en>

Vector similarity weight controls the influence of vector similarity on the final relevance score in hybrid search.

</template>
<template #zh>

向量相似度权重（Vector similarity weight）控制混合搜索中向量相似度对最终相关性得分的影响。

</template>
</BiRow>

<BiRow>
<template #en>

Increasing this weight makes retrieval focus more on semantic similarity, while decreasing it relatively increases the influence of keyword matching on the final result.

</template>
<template #zh>

调大该权重会让检索更侧重语义相似度；调小则相对提升关键词匹配对最终结果的影响。

</template>
</BiRow>

<BiRow>
<template #en>

**Vision**

</template>
<template #zh>

**Vision**

</template>
</BiRow>

<BiRow>
<template #en>

Vision refers to models designed to understand and process visual content such as images.

</template>
<template #zh>

Vision 指为理解和处理图像等视觉内容而设计的模型。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, Vision models can be used to analyze visual information such as images and charts and combine it with textual content for multimodal understanding.

</template>
<template #zh>

在 RAGFlow 中，Vision 模型可用于分析图像、图表等视觉信息，并结合文本内容实现多模态理解。

</template>
</BiRow>

<BiRow>
<template #en>

**VLM**

</template>
<template #zh>

**VLM**

</template>
</BiRow>

<BiRow>
<template #en>

VLM (Vision-Language Model) is a multimodal model capable of understanding both visual information and natural language. In RAGFlow, VLMs can be used to parse and understand images, charts, and other visual content in documents and combine them with textual information for content extraction and understanding.

</template>
<template #zh>

VLM（Vision-Language Model，视觉语言模型）是一种能同时理解视觉信息与自然语言的多模态模型。在 RAGFlow 中，VLM 可用于解析和理解文档中的图像、图表等视觉内容，并结合文本信息进行内容抽取与理解。

</template>
</BiRow>

<BiRow>
<template #en>

### **W**

</template>
<template #zh>

### **W**

</template>
</BiRow>

<BiRow>
<template #en>

**Wiki**

</template>
<template #zh>

**Wiki**

</template>
</BiRow>

<BiRow>
<template #en>

Wiki is a knowledge artifact supported by Knowledge Compilation.

</template>
<template #zh>

Wiki 是知识编译支持的一种知识工件。

</template>
</BiRow>

<BiRow>
<template #en>

It reorganizes source content into Wiki content with topics and hierarchical structures, transforming scattered information into a knowledge system that is easier to read, browse, and understand.

</template>
<template #zh>

它把源内容重新组织为具有主题和层级结构的 Wiki 内容，把零散的信息转化为更易阅读、浏览和理解的知识体系。

</template>
</BiRow>

<BiRow>
<template #en>

**Workflow**

</template>
<template #zh>

**Workflow**

</template>
</BiRow>

<BiRow>
<template #en>

A workflow is an execution process consisting of multiple interconnected steps that complete a specific task according to predefined logic.

</template>
<template #zh>

工作流（Workflow）是由多个相互关联的步骤组成、按预定义逻辑完成特定任务的执行过程。

</template>
</BiRow>

<BiRow>
<template #en>

In RAGFlow, workflows use a visual canvas to connect different components and orchestrate operations such as retrieval, model invocation, conditional logic, variable processing, and tool invocation to build and execute complex AI application workflows.

</template>
<template #zh>

在 RAGFlow 中，工作流通过可视化画布连接不同组件，编排检索、模型调用、条件逻辑、变量处理、工具调用等操作，以构建和执行复杂的 AI 应用工作流。

</template>
</BiRow>
