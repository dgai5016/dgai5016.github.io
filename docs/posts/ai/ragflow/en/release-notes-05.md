# Releases (Part 5)

## v0.9.0

Released on August 6, 2024.

### New features

- Supports GraphRAG as a chunking method.
- Introduces Agent component **Keyword** and search tools, including **Baidu**, **DuckDuckGo**, **PubMed**, **Wikipedia**, **Bing**, and **Google**.
- Supports speech-to-text recognition for audio files.
- Supports model vendors **Gemini** and **Groq**.
- Supports inference frameworks, engines, and services including **LM studio**, **OpenRouter**, **LocalAI**, and **Nvidia API**.
- Supports using reranker models in Xinference.

## v0.8.0

Released on July 8, 2024.

### New features

- Supports Agentic RAG, enabling graph-based workflow construction for RAG and agents.
- Supports model vendors **Mistral**, **MiniMax**, **Bedrock**, and **Azure OpenAI**.
- Supports DOCX files in the MANUAL chunking method.
- Supports DOCX, MD, and PDF files in the Q&A chunking method.

## v0.7.0

Released on May 31, 2024.

### New features

- Supports the use of reranker models.
- Integrates reranker and embedding models: [BCE](https://github.com/netease-youdao/BCEmbedding), [BGE](https://github.com/FlagOpen/FlagEmbedding), and [Jina](https://jina.ai/embeddings/).
- Supports LLMs Baichuan and VolcanoArk.
- Implements [RAPTOR](https://arxiv.org/html/2401.18059v1) for improved text retrieval.
- Supports HTML files in the GENERAL chunking method.
- Provides HTTP and Python APIs for deleting documents by ID.
- Supports ARM64 platforms.

:::danger IMPORTANT
While we also test RAGFlow on ARM64 platforms, we do not maintain RAGFlow Docker images for ARM.

If you are on an ARM platform, follow [this guide](https://ragflow.io/docs/develop/build_docker_image) to build a RAGFlow Docker image.
:::

### API changes

#### HTTP API

- [Delete documents](https://ragflow.io/docs/dev/http_api_reference#delete-documents)

#### Python API

- [Delete documents](https://ragflow.io/docs/dev/python_api_reference#delete-documents)

## v0.6.0

Released on May 21, 2024.

### New features

- Supports streaming output.
- Provides HTTP and Python APIs for retrieving document chunks.
- Supports monitoring of system components, including Elasticsearch, MySQL, Redis, and MinIO.
- Supports disabling **Layout Recognition** in the GENERAL chunking method to reduce file chunking time.

### API changes

#### HTTP API

- [Retrieve chunks](https://ragflow.io/docs/dev/http_api_reference#retrieve-chunks)

#### Python API

- [Retrieve chunks](https://ragflow.io/docs/dev/python_api_reference#retrieve-chunks)

## v0.5.0

Released on May 8, 2024.

### New features

- Supports LLM DeepSeek.
