<BiRow>
<template #en>

## v0.9.0

</template>
<template #zh>

## v0.9.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on August 6, 2024.

</template>
<template #zh>

发布于 2024 年 8 月 6 日。

</template>
</BiRow>

<BiRow>
<template #en>

### New features

</template>
<template #zh>

### 新特性

</template>
</BiRow>

<BiRow>
<template #en>

- Supports GraphRAG as a chunking method.
- Introduces Agent component **Keyword** and search tools, including **Baidu**, **DuckDuckGo**, **PubMed**, **Wikipedia**, **Bing**, and **Google**.
- Supports speech-to-text recognition for audio files.
- Supports model vendors **Gemini** and **Groq**.
- Supports inference frameworks, engines, and services including **LM studio**, **OpenRouter**, **LocalAI**, and **Nvidia API**.
- Supports using reranker models in Xinference.

</template>
<template #zh>

- 支持将 GraphRAG 作为一种分块方法。
- 引入 Agent 组件 **Keyword** 与搜索工具，包括 **Baidu**、**DuckDuckGo**、**PubMed**、**Wikipedia**、**Bing** 和 **Google**。
- 支持对音频文件进行语音转文字识别。
- 支持模型厂商 **Gemini** 和 **Groq**。
- 支持推理框架、引擎与服务，包括 **LM studio**、**OpenRouter**、**LocalAI** 和 **Nvidia API**。
- 支持在 Xinference 中使用重排序模型。

</template>
</BiRow>

<BiRow>
<template #en>

## v0.8.0

</template>
<template #zh>

## v0.8.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on July 8, 2024.

</template>
<template #zh>

发布于 2024 年 7 月 8 日。

</template>
</BiRow>

<BiRow>
<template #en>

### New features

</template>
<template #zh>

### 新特性

</template>
</BiRow>

<BiRow>
<template #en>

- Supports Agentic RAG, enabling graph-based workflow construction for RAG and agents.
- Supports model vendors **Mistral**, **MiniMax**, **Bedrock**, and **Azure OpenAI**.
- Supports DOCX files in the MANUAL chunking method.
- Supports DOCX, MD, and PDF files in the Q&A chunking method.

</template>
<template #zh>

- 支持 Agentic RAG，可为 RAG 与 Agent 构建基于图的工作流。
- 支持模型厂商 **Mistral**、**MiniMax**、**Bedrock** 和 **Azure OpenAI**。
- 支持在 MANUAL 分块方法中处理 DOCX 文件。
- 支持在 Q&A 分块方法中处理 DOCX、MD 和 PDF 文件。

</template>
</BiRow>

<BiRow>
<template #en>

## v0.7.0

</template>
<template #zh>

## v0.7.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 31, 2024.

</template>
<template #zh>

发布于 2024 年 5 月 31 日。

</template>
</BiRow>

<BiRow>
<template #en>

### New features

</template>
<template #zh>

### 新特性

</template>
</BiRow>

<BiRow>
<template #en>

- Supports the use of reranker models.
- Integrates reranker and embedding models: [BCE](https://github.com/netease-youdao/BCEmbedding), [BGE](https://github.com/FlagOpen/FlagEmbedding), and [Jina](https://jina.ai/embeddings/).
- Supports LLMs Baichuan and VolcanoArk.
- Implements [RAPTOR](https://arxiv.org/html/2401.18059v1) for improved text retrieval.
- Supports HTML files in the GENERAL chunking method.
- Provides HTTP and Python APIs for deleting documents by ID.
- Supports ARM64 platforms.

</template>
<template #zh>

- 支持使用重排序模型。
- 集成重排序模型与嵌入模型：[BCE](https://github.com/netease-youdao/BCEmbedding)、[BGE](https://github.com/FlagOpen/FlagEmbedding) 和 [Jina](https://jina.ai/embeddings/)。
- 支持大模型 Baichuan 和 VolcanoArk。
- 实现 [RAPTOR](https://arxiv.org/html/2401.18059v1) 以改进文本检索。
- 支持在 GENERAL 分块方法中处理 HTML 文件。
- 提供按 ID 删除文档的 HTTP 与 Python API。
- 支持 ARM64 平台。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
While we also test RAGFlow on ARM64 platforms, we do not maintain RAGFlow Docker images for ARM.

If you are on an ARM platform, follow [this guide](https://ragflow.io/docs/develop/build_docker_image) to build a RAGFlow Docker image.
:::

</template>
<template #zh>

:::danger 重要
虽然我们也在 ARM64 平台上测试 RAGFlow，但我们不维护 ARM 架构的 RAGFlow Docker 镜像。

如果你使用 ARM 平台，请按照[本指南](https://ragflow.io/docs/develop/build_docker_image)构建 RAGFlow Docker 镜像。
:::

</template>
</BiRow>

<BiRow>
<template #en>

### API changes

</template>
<template #zh>

### API 变更

</template>
</BiRow>

<BiRow>
<template #en>

#### HTTP API

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

- [Delete documents](https://ragflow.io/docs/dev/http_api_reference#delete-documents)

</template>
<template #zh>

- [删除文档](https://ragflow.io/docs/dev/http_api_reference#delete-documents)

</template>
</BiRow>

<BiRow>
<template #en>

#### Python API

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

- [Delete documents](https://ragflow.io/docs/dev/python_api_reference#delete-documents)

</template>
<template #zh>

- [删除文档](https://ragflow.io/docs/dev/python_api_reference#delete-documents)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.6.0

</template>
<template #zh>

## v0.6.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 21, 2024.

</template>
<template #zh>

发布于 2024 年 5 月 21 日。

</template>
</BiRow>

<BiRow>
<template #en>

### New features

</template>
<template #zh>

### 新特性

</template>
</BiRow>

<BiRow>
<template #en>

- Supports streaming output.
- Provides HTTP and Python APIs for retrieving document chunks.
- Supports monitoring of system components, including Elasticsearch, MySQL, Redis, and MinIO.
- Supports disabling **Layout Recognition** in the GENERAL chunking method to reduce file chunking time.

</template>
<template #zh>

- 支持流式输出。
- 提供检索文档分块的 HTTP 与 Python API。
- 支持监控系统组件，包括 Elasticsearch、MySQL、Redis 和 MinIO。
- 支持在 GENERAL 分块方法中禁用 **Layout Recognition**，以缩短文件分块时间。

</template>
</BiRow>

<BiRow>
<template #en>

### API changes

</template>
<template #zh>

### API 变更

</template>
</BiRow>

<BiRow>
<template #en>

#### HTTP API

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

- [Retrieve chunks](https://ragflow.io/docs/dev/http_api_reference#retrieve-chunks)

</template>
<template #zh>

- [检索分块](https://ragflow.io/docs/dev/http_api_reference#retrieve-chunks)

</template>
</BiRow>

<BiRow>
<template #en>

#### Python API

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

- [Retrieve chunks](https://ragflow.io/docs/dev/python_api_reference#retrieve-chunks)

</template>
<template #zh>

- [检索分块](https://ragflow.io/docs/dev/python_api_reference#retrieve-chunks)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.5.0

</template>
<template #zh>

## v0.5.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 8, 2024.

</template>
<template #zh>

发布于 2024 年 5 月 8 日。

</template>
</BiRow>

<BiRow>
<template #en>

### New features

</template>
<template #zh>

### 新特性

</template>
</BiRow>

<BiRow>
<template #en>

- Supports LLM DeepSeek.

</template>
<template #zh>

- 支持大模型 DeepSeek。

</template>
</BiRow>
