# 更新日志（第 5 部分）

## v0.9.0

发布于 2024 年 8 月 6 日。

### 新特性

- 支持将 GraphRAG 作为一种分块方法。
- 引入 Agent 组件 **Keyword** 与搜索工具，包括 **Baidu**、**DuckDuckGo**、**PubMed**、**Wikipedia**、**Bing** 和 **Google**。
- 支持对音频文件进行语音转文字识别。
- 支持模型厂商 **Gemini** 和 **Groq**。
- 支持推理框架、引擎与服务，包括 **LM studio**、**OpenRouter**、**LocalAI** 和 **Nvidia API**。
- 支持在 Xinference 中使用重排序模型。

## v0.8.0

发布于 2024 年 7 月 8 日。

### 新特性

- 支持 Agentic RAG，可为 RAG 与 Agent 构建基于图的工作流。
- 支持模型厂商 **Mistral**、**MiniMax**、**Bedrock** 和 **Azure OpenAI**。
- 支持在 MANUAL 分块方法中处理 DOCX 文件。
- 支持在 Q&A 分块方法中处理 DOCX、MD 和 PDF 文件。

## v0.7.0

发布于 2024 年 5 月 31 日。

### 新特性

- 支持使用重排序模型。
- 集成重排序模型与嵌入模型：[BCE](https://github.com/netease-youdao/BCEmbedding)、[BGE](https://github.com/FlagOpen/FlagEmbedding) 和 [Jina](https://jina.ai/embeddings/)。
- 支持大模型 Baichuan 和 VolcanoArk。
- 实现 [RAPTOR](https://arxiv.org/html/2401.18059v1) 以改进文本检索。
- 支持在 GENERAL 分块方法中处理 HTML 文件。
- 提供按 ID 删除文档的 HTTP 与 Python API。
- 支持 ARM64 平台。

:::danger 重要
虽然我们也在 ARM64 平台上测试 RAGFlow，但我们不维护 ARM 架构的 RAGFlow Docker 镜像。

如果你使用 ARM 平台，请按照[本指南](https://ragflow.io/docs/develop/build_docker_image)构建 RAGFlow Docker 镜像。
:::

### API 变更

#### HTTP API

- [删除文档](https://ragflow.io/docs/dev/http_api_reference#delete-documents)

#### Python API

- [删除文档](https://ragflow.io/docs/dev/python_api_reference#delete-documents)

## v0.6.0

发布于 2024 年 5 月 21 日。

### 新特性

- 支持流式输出。
- 提供检索文档分块的 HTTP 与 Python API。
- 支持监控系统组件，包括 Elasticsearch、MySQL、Redis 和 MinIO。
- 支持在 GENERAL 分块方法中禁用 **Layout Recognition**，以缩短文件分块时间。

### API 变更

#### HTTP API

- [检索分块](https://ragflow.io/docs/dev/http_api_reference#retrieve-chunks)

#### Python API

- [检索分块](https://ragflow.io/docs/dev/python_api_reference#retrieve-chunks)

## v0.5.0

发布于 2024 年 5 月 8 日。

### 新特性

- 支持大模型 DeepSeek。
