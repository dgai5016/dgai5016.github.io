# Releases (Part 3)

## v0.25.1

Released on April 29, 2026.

### Improvements

- API refactoring and unification: Standardizes web APIs to RESTful conventions across all endpoints, unifying document creation and indexing flows while maintaining backward compatibility.
- Parsing optimizations: Adds [OpenDataLoader](https://github.com/opendataloader-project/opendataloader-pdf) PDF parser backend. [#14097](https://github.com/infiniflow/ragflow/pull/14097)
- Introduces lazy loading and chunked parsing for large PDFs (&gt;50 pages), significantly reducing memory footprint. [#14385](https://github.com/infiniflow/ragflow/pull/14385)

### Data source

Enables synchronizing deleted files in Bitbucket, Gmail, Google Drive, and Airtable. [#14362](https://github.com/infiniflow/ragflow/issues/14362)

### Model support

- DeepSeek v4

### Model providers

- UCloud

### Bug fixes

- Metadata visibility issues during v0.24.0 to v0.25.0 upgrades.
- Duplicate chat output.

## v0.25.0

Released on April 21, 2026.

### New features

- Agent
  - Introduces seven prebuilt ingestion pipeline templates.
  - Agent apps can be published.
  - Supports sandbox code execution and chart generation.
  - Adds a beginner's data analytics Agent template.
- Memory: Supports user-level memory storage and retrieval.
- New UI language: Arabic (implemented a Right-to-Left layout), Bulgarian, and Turkish.
- Ecosystem integration: RAGFlow datasets are accessible via OpenClaw.

### Improvements

- Optimizes Docx parsing by supporting image lazy-loading, reducing memory footprint.
- Optimizes Chat, Agent, and Search embedded dialog pages for mobile compatibility.
- Underlying system & infrastructure optimization:
  - Bumps RAGFlow's document engine, Elasticsearch to 9.x.
  - Switches the default object storage container to `pgsty/minio` due to the deprecation of the official MinIO images.
  - Adds database migration scripts; see [this readme](https://github.com/infiniflow/ragflow/tree/74b44e1aa3ecd6687b3aa4ef731d0187720c3cb5/tools/scripts) for further details.

### Model support

- MiniMax-M2.7 series
- Perplexity embedding model (pplx-embed)
- Tongyi rerank model

### New model providers

- avian.io
- ragcon.ai

### Data sources

- Seafile
- RSS
- DingTalk AI Table
- GitHub: Enables synchronization for deleted files.

## v0.24.0

Released on February 10, 2026.

### New features

- Memory
  - Introduces memory management APIs (HTTP and Python).
  - Outputs Memory extraction log to the console.
- Dataset
  - Supports batch metadata management.
  - Renames "ToC (Table of Contents)" to "PageIndex". See [here](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#pageindex).
- Agent
  - Launches a new Chat-like Agent conversation management interface that retains sessions and dialogue history.
  - Introduces a multi-Sandbox mechanism supporting local gVisor and Alibaba Cloud, with compatibility for mainstream Sandbox APIs (configurable in the Admin page).
- Chat
  - Adds a new "Thinking" mode and removes the previous "Reasoning" configuration option.
  - Optimizes retrieval strategies for deep-research scenarios, enhancing recall accuracy.
- Admin
  - Supports multiple Admin accounts.
- Model configuration center
  - Adds model connection test for new models.

### MySQL alternative

- Supports OceanBase as an alternative to MySQL.

### Model support

- Kimi 2.5
- Stepfun 3
- doubao-embedding-vision
- PaddleOCR-VL

### Data sources

- Zendesk
- Bitbucket

### API changes

#### HTTP API

[Memory management API](https://ragflow.io/docs/references/http_api_reference.md#memory-management)

#### Python API

[Memory management API](https://ragflow.io/docs/references/python_api_reference.md#memory-management)

## v0.23.1

Released on December 31, 2025.

### Improvements

- Memory: Enhances the stability of memory extraction when all memory types are selected.
- RAG: Refines the context window extraction strategy for images and tables.

### Fixed issues

- Memory:
  - The RAGFlow server failed to start if an empty memory object existed.
  - Unable to delete a newly created empty Memory.
- RAG: MDX file parsing was not supported.

### Data sources

- GitHub
- Gitlab
- Asana
- IMAP

## v0.23.0

Released on December 27, 2025.

### New features

- Memory
  - Implements a **Memory** interface for managing memory.
  - Supports configuring context via the **Retrieval** or **Message** component.
- Agent
  - Improves the **Agent** component's performance by refactoring the underlying architecture.
  - The **Agent** component can now output structured data for use in downstream components.
  - Supports using webhook to trigger agent execution.
  - Supports voice input/output.
  - Supports configuring multiple **Retrieval** components per **Agent** component.
- Ingestion pipeline
  - Supports extracting table of contents in the **Transformer** component to improve long-context RAG performance.
- Dataset
  - Supports configuring context window for images and tables.
  - Introduces parent-child chunking strategy.
  - Supports auto-generation of metadata during file parsing.
- Chat: Supports voice input.

### Improvements

- RAG: Accelerates GraphRAG generation significantly.
- Bumps RAGFlow's document engine, [Infinity](https://github.com/infiniflow/infinity) to v0.6.15 (backward compatible).

### Data sources

- Google Cloud Storage
- Gmail
- Dropbox
- WebDAV
- Airtable

### Model support

- GPT-5.2
- GPT-5.2 Pro
- GPT-5.1
- GPT-5.1 Instant
- Claude Opus 4.5
- MiniMax M2
- GLM-4.7.
- A MinerU configuration interface.
- AI Badgr (model provider).

### API changes

#### HTTP API

- [Converse with Agent](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent) returns complete execution trace logs.
- [Create chat completion](https://ragflow.io/docs/references/http_api_reference.md#create-chat-completion) supports metadata-based filtering.
- [Converse with chat assistant](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant) supports metadata-based filtering.

## v0.22.1

Released on November 19, 2025.

### Improvements

- Agent:
  - Supports exporting Agent outputs in Word or Markdown formats.
  - Adds a **List operations** component.
  - Adds a **Variable aggregator** component.
- Data sources:
  - Supports S3-compatible data sources, e.g., MinIO.
  - Adds data synchronization with JIRA.
- Continues the redesign of the **Profile** page layouts.
- Upgrades the Flask web framework from synchronous to asynchronous, increasing concurrency and preventing blocking issues caused when requesting upstream LLM services.

### Fixed issues

- A v0.22.0 issue: Users failed to parse uploaded files or switch embedding model in a dataset containing parsed files using a built-in model from a `-full` RAGFlow edition.
- Image concatenated in Word documents. [#11310](https://github.com/infiniflow/ragflow/pull/11310)
- Mixed images and text were not correctly displayed in the chat history.

### Newly supported models

- Gemini 3 Pro Preview

## v0.22.0

Released on November 12, 2025.

### Breaking Changes

:::danger IMPORTANT
From this release onwards, we ship only the slim edition (without embedding models) Docker image and no longer append the `-slim` suffix to the image tag.
:::

### New Features

- Dataset:
  - Supports data synchronization from five online sources (AWS S3, Google Drive, Notion, Confluence, and Discord).
  - RAPTOR can be built across an entire dataset or on individual documents.
- Ingestion pipeline: Supports [Docling document parsing](https://github.com/docling-project/docling) in the **Parser** component.
- Launches a new administrative Web UI dashboard for graphical user management and service status monitoring.
- Agent:
  - Supports structured output.
  - Supports metadata filtering in the **Retrieval** component.
  - Introduces a **Variable aggregator** component with data operation and session variable definition capabilities.

### Improvements

- Agent: Supports visualizing previous components' outputs in the **Await Response** component.
- Revamps the model provider page.
- Upgrades RAGFlow's document engine Infinity to v0.6.5.

### Added Models

- Kimi-K2-Thinking

### New agent templates

- Interactive Agent, incorporates real-time user feedback to dynamically optimize Agent output.

## v0.21.1

Released on October 23, 2025.

### New features

- Experimental: Adds support for PDF document parsing using MinerU. See [here](https://ragflow.io/docs/faq.mdx#how-to-use-mineru-to-parse-pdf-documents).

### Improvements

- Enhances UI/UX for the dataset and personal center pages.
- Upgrades RAGFlow's document engine, [Infinity](https://github.com/infiniflow/infinity), to v0.6.1.

### Fixed issues

- An issue with video parsing.

## v0.21.0

Released on October 15, 2025.

### New features

- Orchestratable ingestion pipeline: Supports customized data ingestion and cleansing workflows, enabling users to flexibly design their data flows or directly apply the official data flow templates on the canvas.
- GraphRAG & RAPTOR write process optimized: Replaces the automatic incremental build process with manual batch building, significantly reducing construction overhead.
- Long-context RAG: Automatically generates document-level table of contents (TOC) structures to mitigate context loss caused by inaccurate or excessive chunking, substantially improving retrieval quality. This feature is now available via a TOC extraction template. See [here](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#pageindex).
- Video file parsing: Expands the system's multimodal data processing capabilities by supporting video file parsing.
- Admin CLI: Introduces a new command-line tool for system administration, allowing users to manage and monitor RAGFlow's service status via command line.

### Improvements

- Redesigns RAGFlow's Login and Registration pages.
- Upgrades RAGFlow's document engine Infinity to v0.6.0.

### Newly supported models

- Tongyi Qwen 3 series
- Claude Sonnet 4.5
- Meituan LongCat-Flash-Thinking

### New agent templates

- Company Research Report Deep Dive Agent: Designed for financial institutions to help analysts quickly organize information, generate research reports, and make investment decisions.
- Orchestratable Ingestion Pipeline Template: Allows users to apply this template on the canvas to rapidly establish standardized data ingestion and cleansing processes.

## v0.20.5

Released on September 10, 2025.

### Improvements

- Agent:
  - Agent Performance Optimized: Improves planning and reflection speed for simple tasks; optimizes concurrent tool calls for parallelizable scenarios, significantly reducing overall response time.
  - Four framework-level prompt blocks are available in the **System prompt** section, enabling customization and overriding of prompts at the framework level, thereby enhancing flexibility and control. See [here](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#prompt-configuration).
  - **Execute SQL** component enhanced: Replaces the original variable reference component with a text input field, allowing users to write free-form SQL queries and reference variables. See [here](https://ragflow.io/docs/guides/agent/agent_workflow/tool_components.md#execute-sql).
- Chat: Re-enables **Reasoning** and **Cross-language search**.

### Newly supported models

- Meituan LongCat
- Kimi: kimi-k2-turbo-preview and kimi-k2-0905-preview
- Qwen: qwen3-max-preview
- SiliconFlow: DeepSeek V3.1

### Fixed issues

- Dataset: Deleted files remained searchable.
- Chat: Unable to chat with an Ollama model.
- Agent:
  - A **Cite** toggle failure.
  - An Agent in task mode still required a dialogue to trigger.
  - Repeated answers in multi-turn dialogues.
  - Duplicate summarization of parallel execution results.

### API changes

#### HTTP APIs

- Adds a body parameter `"metadata_condition"` to the [Retrieve chunks](https://ragflow.io/docs/references/http_api_reference.md#retrieve-chunks) method, enabling metadata-based chunk filtering during retrieval. [#9877](https://github.com/infiniflow/ragflow/pull/9877)

#### Python APIs

- Adds a parameter `metadata_condition` to the [Retrieve chunks](https://ragflow.io/docs/references/python_api_reference.md#retrieve-chunks) method, enabling metadata-based chunk filtering during retrieval. [#9877](https://github.com/infiniflow/ragflow/pull/9877)

## v0.20.4

Released on August 27, 2025.

### Improvements

- Agent component: Completes Chinese localization for the Agent component.
- Introduces the `ENABLE_TIMEOUT_ASSERTION` environment variable to enable or disable timeout assertions for file parsing tasks.
- Dataset:
  - Improves Markdown file parsing, with AST support to avoid unintended chunking.
  - Enhances HTML parsing, supporting bs4-based HTML tag traversal.

### Newly supported models

ZHIPU GLM-4.5

### New Agent templates

Ecommerce Customer Service Workflow: A template designed to handle enquiries about product features and multi-product comparisons using the internal dataset, as well as to manage installation appointment bookings.

### Fixed issues

- Dataset:
  - Unable to share resources with the team.
  - Inappropriate restrictions on the number and size of uploaded files.
- Chat:
  - Unable to preview referenced files in responses.
  - Unable to send out messages after file uploads.
- An OAuth2 authentication failure.
- A logical error in multi-conditioned metadata searches within a dataset.
- Citations infinitely increased in multi-turn conversations.

## v0.20.3

Released on August 20, 2025.

### Improvements

- Revamps the user interface for the **Datasets**, **Chat**, and **Search** pages.
- Search and Chat: Introduces document-level metadata filtering, allowing automatic or manual filtering during chats or searches.
- Search: Supports creating search apps tailored to various business scenarios
- Chat: Supports comparing answer performance of up to three chat model settings on a single **Chat** page.
- Agent:
  - Implements a toggle in the **Agent** component to enable or disable citation.
  - Introduces a drag-and-drop method for creating components.
- Documentation: Corrects inaccuracies in the API reference.

### New Agent templates

- Report Agent: A template for generating summary reports in internal question-answering scenarios, supporting the display of tables and formulae.  [#9427](https://github.com/infiniflow/ragflow/pull/9427)

### Fixed issues

- The timeout mechanism introduced in v0.20.0 caused tasks like GraphRAG to halt.
- Predefined opening greeting in the **Agent** component was missing during conversations.
- An automatic line break issue in the prompt editor.
- A memory leak issue caused by PyPDF. [#9469](https://github.com/infiniflow/ragflow/pull/9469)

### API changes

#### Deprecated

[Create session with agent](https://ragflow.io/docs/references/http_api_reference.md#create-session-with-agent)

## v0.20.1

Released on August 8, 2025.

### New Features

- The **Retrieval** component now supports the dynamic specification of dataset names using variables.
- The user interface now includes a French language option.

### Newly supported models

- GPT-5
- Claude 4.1

### New agent templates (both workflow and agentic)

- Text-to-SQL data expert Workflow: Empowers non-technical teams (e.g., operations, product) to independently query business data.
- Choose Your Knowledge Base Workflow: Lets users select a dataset to query during conversations. [#9325](https://github.com/infiniflow/ragflow/pull/9325)
- Choose Your Knowledge Base Agent: Delivers higher-quality responses with extended reasoning time, suited for complex queries. [#9325](https://github.com/infiniflow/ragflow/pull/9325)

### Fixed Issues

- The **Agent** component was unable to invoke models installed via vLLM.
- Agents could not be shared with the team.
- Embedding an Agent into a webpage was not functioning properly.

## v0.20.0

Released on August 4, 2025.

### Compatibility changes

From v0.20.0 onwards, Agents are no longer compatible with earlier versions, and all existing Agents from previous versions must be rebuilt following the upgrade.

### New features

- Unified orchestration of both Agents and Workflows.
- A comprehensive refactor of the Agent, greatly enhancing its capabilities and usability, with support for Multi-Agent configurations, planning and reflection, and visual functionalities.
- Fully implemented MCP functionality, allowing for MCP Server import, Agents functioning as MCP Clients, and RAGFlow itself operating as an MCP Server.
- Access to runtime logs for Agents.
- Chat histories with Agents available through the management panel.
- Integration of a new, more robust version of Infinity, enabling the auto-tagging functionality with Infinity as the underlying document engine.
- An OpenAI-compatible API that supports file reference information.
- Support for new models, including Kimi K2, Grok 4, and Voyage embedding.
- RAGFlow’s codebase is now mirrored on Gitee.
- Introduction of a new model provider, Gitee AI.

### New agent templates introduced

- Multi-Agent based Deep research: Collaborative Agent teamwork led by a Lead Agent with multiple Subagents, distinct from traditional workflow orchestration.
- An intelligent Q&A chatbot leveraging internal datasets, designed for customer service and training scenarios.
- A resume analysis template used by the RAGFlow team to screen, analyze, and record candidate information.
- A blog generation workflow that transforms raw ideas into SEO-friendly blog content.
- An intelligent customer service workflow.
- A user feedback analysis template that directs user feedback to appropriate teams through semantic analysis.
- Trip planner: Uses web search and map MCP servers to assist with travel planning.
- Photo text translator: Translates content from uploaded photos.
- An information search assistant that retrieves answers from both internal datasets and the web.

## v0.19.1

Released on June 23, 2025.

### Fixed issues

- A memory leak issue during high-concurrency requests.
- Large file parsing freezes when GraphRAG entity resolution is enabled. [#8223](https://github.com/infiniflow/ragflow/pull/8223)
- A context error occurring when using Sandbox in standalone mode. [#8340](https://github.com/infiniflow/ragflow/pull/8340)
- An excessive CPU usage issue caused by Ollama. [#8216](https://github.com/infiniflow/ragflow/pull/8216)
- A bug in the Code Component. [#7949](https://github.com/infiniflow/ragflow/pull/7949)
- Added support for models installed via Ollama or VLLM when creating a dataset through the API. [#8069](https://github.com/infiniflow/ragflow/pull/8069)
- Enabled role-based authentication for S3 bucket access. [#8149](https://github.com/infiniflow/ragflow/pull/8149)

### Newly supported models

- Qwen 3 Embedding. [#8184](https://github.com/infiniflow/ragflow/pull/8184)
- Voyage Multimodal 3. [#7987](https://github.com/infiniflow/ragflow/pull/7987)
