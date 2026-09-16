<BiRow>
<template #en>

## v0.26.1

</template>
<template #zh>

## v0.26.1

</template>
</BiRow>

<BiRow>
<template #en>

Released on June 17, 2026.

</template>
<template #zh>

发布于 2026 年 6 月 17 日。

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

- **Model providers**: Allows users to modify the model type of existing model configurations. [#16029](https://github.com/infiniflow/ragflow/pull/16029)
- **Chat channels**: Enables users to deploy RAGFlow assistants as chatbots within external messaging platforms like Discord and Feishu. [#15850](https://github.com/infiniflow/ragflow/pull/15850)
- **Observability**: Groups multi-turn chat traces by session within Langfuse to facilitate conversation debugging and replay. [#15679](https://github.com/infiniflow/ragflow/pull/15679)

</template>
<template #zh>

- **模型提供商**：允许用户修改已有模型配置的模型类型。[#16029](https://github.com/infiniflow/ragflow/pull/16029)
- **对话渠道**：支持把 RAGFlow 助手部署为 Discord、Feishu 等外部消息平台上的聊天机器人。[#15850](https://github.com/infiniflow/ragflow/pull/15850)
- **可观测性**：在 Langfuse 中按会话分组多轮对话追踪，便于对话的调试与回放。[#15679](https://github.com/infiniflow/ragflow/pull/15679)

</template>
</BiRow>

<BiRow>
<template #en>

### i18n

</template>
<template #zh>

### 国际化

</template>
</BiRow>

<BiRow>
<template #en>

- Adds ~70 missing translation keys for the French UI. [#15983](https://github.com/infiniflow/ragflow/pull/15983)

</template>
<template #zh>

- 为法语界面补上约 70 个缺失的翻译键。[#15983](https://github.com/infiniflow/ragflow/pull/15983)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- **Model provider**: Fixes inaccurate token billing, corrects embedding truncation limits to prevent indexing failures, and refactors error handling to surface root error causes. [#15424](https://github.com/infiniflow/ragflow/pull/15424)
- **API**: Adds a legacy mode to the `/chat/completions` endpoint to restore the v0.23.0 style `<think>` output for backward compatibility. [#16014](https://github.com/infiniflow/ragflow/pull/16014) See also [Converse with chat assistant](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant).

</template>
<template #zh>

- **模型提供商**：修复 token 计费不准确的问题，纠正嵌入截断上限以防索引失败，并重构错误处理以呈现根因。[#15424](https://github.com/infiniflow/ragflow/pull/15424)
- **API**：为 `/chat/completions` 端点添加 legacy 模式，恢复 v0.23.0 风格的 `<think>` 输出，以保持向后兼容。[#16014](https://github.com/infiniflow/ragflow/pull/16014) 另见 [与对话助手对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant)。

</template>
</BiRow>

<BiRow>
<template #en>

## v0.26.0

</template>
<template #zh>

## v0.26.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on June 11, 2026.

</template>
<template #zh>

发布于 2026 年 6 月 11 日。

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

- **Model providers**
  - Implements auto-populated model lists for multiple providers, eliminating the need to type model names manually. This feature currently supports: Ollama, OpenRouter, vLLM, OpenAI-API-Compatible, LM-Studio, VolcEngine, Xinference, LocalAI, BaiduYiyan, GPUStack, and Fish Audio.
  - Allows configuring multiple API keys for the same model provider. [#14595](https://github.com/infiniflow/ragflow/pull/14595)
  - Dynamically populates model selection dropdowns in the UI by fetching the currently available models directly from remote model providers. [#15711](https://github.com/infiniflow/ragflow/pull/15711)
- **Data source connectors**: Implements new data source connectors for Outlook, OneDrive, Microsoft Teams, Slack, SharePoint, Salesforce, and Azure Blob Storage. [#15333](https://github.com/infiniflow/ragflow/pull/15333)[#15330](https://github.com/infiniflow/ragflow/pull/15330)[#15332](https://github.com/infiniflow/ragflow/pull/15332)[#15188](https://github.com/infiniflow/ragflow/pull/15188)[#15190](https://github.com/infiniflow/ragflow/pull/15190)[#15462](https://github.com/infiniflow/ragflow/pull/15462)[#15466](https://github.com/infiniflow/ragflow/pull/15466)
- **Dataset** - Implements a checkpoint and resume feature for community extraction and entity resolution, the most expensive and time-consuming parts of the GraphRAG indexing pipeline. [#15518](https://github.com/infiniflow/ragflow/issues/15518)[#15523](https://github.com/infiniflow/ragflow/pull/15523)

</template>
<template #zh>

- **模型提供商**
  - 为多家提供商实现模型列表自动填充，免去手动输入模型名称。该功能目前支持：Ollama、OpenRouter、vLLM、OpenAI-API-Compatible、LM-Studio、VolcEngine、Xinference、LocalAI、BaiduYiyan、GPUStack 和 Fish Audio。
  - 支持为同一模型提供商配置多个 API key。[#14595](https://github.com/infiniflow/ragflow/pull/14595)
  - 通过直接从远端模型提供商获取当前可用模型，动态填充界面中的模型选择下拉框。[#15711](https://github.com/infiniflow/ragflow/pull/15711)
- **数据源连接器**：新增 Outlook、OneDrive、Microsoft Teams、Slack、SharePoint、Salesforce 和 Azure Blob Storage 数据源连接器。[#15333](https://github.com/infiniflow/ragflow/pull/15333)[#15330](https://github.com/infiniflow/ragflow/pull/15330)[#15332](https://github.com/infiniflow/ragflow/pull/15332)[#15188](https://github.com/infiniflow/ragflow/pull/15188)[#15190](https://github.com/infiniflow/ragflow/pull/15190)[#15462](https://github.com/infiniflow/ragflow/pull/15462)[#15466](https://github.com/infiniflow/ragflow/pull/15466)
- **数据集** - 为 GraphRAG 索引管道中最耗时耗资源的社区提取和实体消解实现检查点与断点续跑。[#15518](https://github.com/infiniflow/ragflow/issues/15518)[#15523](https://github.com/infiniflow/ragflow/pull/15523)

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- Removes `<think>` text buffering to ensure reasoning-capable models feel faster and more transparent during interactions. [#15891](https://github.com/infiniflow/ragflow/pull/15891)
- Marks MySQL migrations as applied. [#15504](https://github.com/infiniflow/ragflow/pull/15504)

</template>
<template #zh>

- 移除 `<think>` 文本缓冲，让具备推理能力的模型在交互中体感更快、更透明。[#15891](https://github.com/infiniflow/ragflow/pull/15891)
- 将 MySQL 迁移标记为已应用。[#15504](https://github.com/infiniflow/ragflow/pull/15504)

</template>
</BiRow>

<BiRow>
<template #en>

### Model Support

</template>
<template #zh>

### 模型支持

</template>
</BiRow>

<BiRow>
<template #en>

- Four new SiliconFlow models [#15383](https://github.com/infiniflow/ragflow/pull/15383)
- MiniMax-M3 model [#15513](https://github.com/infiniflow/ragflow/pull/15513)
- Latest Anthropic models [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Voyage 4 model family [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Cohere model list. [#15576](https://github.com/infiniflow/ragflow/pull/15576)

</template>
<template #zh>

- 新增四个 SiliconFlow 模型 [#15383](https://github.com/infiniflow/ragflow/pull/15383)
- MiniMax-M3 模型 [#15513](https://github.com/infiniflow/ragflow/pull/15513)
- 最新 Anthropic 模型 [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Voyage 4 模型系列 [#15516](https://github.com/infiniflow/ragflow/pull/15516)
- Cohere 模型列表。[#15576](https://github.com/infiniflow/ragflow/pull/15576)

</template>
</BiRow>

<BiRow>
<template #en>

### i18n

</template>
<template #zh>

### 国际化

</template>
</BiRow>

<BiRow>
<template #en>

- Completes Korean translation. [#15863](https://github.com/infiniflow/ragflow/pull/15863)
- Completes Italian translation. [#15729](https://github.com/infiniflow/ragflow/pull/15729)

</template>
<template #zh>

- 完成韩语翻译。[#15863](https://github.com/infiniflow/ragflow/pull/15863)
- 完成意大利语翻译。[#15729](https://github.com/infiniflow/ragflow/pull/15729)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- The thinking mode of MiniMax models was not correctly enabled. [#15496](https://github.com/infiniflow/ragflow/pull/15496)
- Infinite loops were triggered when the thinking mode was enabled for Qwen3.5 and Qwen3.6 models. [#15101](https://github.com/infiniflow/ragflow/pull/15101)
- Streamed answers were being duplicated when using the OpenAI-compatible chat completions API endpoint. [#15286](https://github.com/infiniflow/ragflow/issues/15286)[#15443](https://github.com/infiniflow/ragflow/pull/15443)
- Serialization errors were caused during chat completions when invalid numeric scores like `NaN` (Not-a-Number) or `Inf` (Infinity) were passed to the JSON encoder. [#15245](https://github.com/infiniflow/ragflow/issues/15245)[#15266](https://github.com/infiniflow/ragflow/pull/15266)
- Chat completions using LiteLLM providers were failing because unrecognized internal configuration parameters were not being filtered out before reaching the external APIs. [#15427](https://github.com/infiniflow/ragflow/issues/15427)[#15432](https://github.com/infiniflow/ragflow/pull/15432)
- The OpenAI-compatible chat completions API was defaulting to streamed responses. [#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- Empty `AND` results were incorrectly dropped during metadata filtering. [#15477](https://github.com/infiniflow/ragflow/pull/15477)
- Repetitive page chrome, such as headers and footers, was incorrectly extracted as main text by the MinerU parser. [#15335](https://github.com/infiniflow/ragflow/issues/15335)[#15387](https://github.com/infiniflow/ragflow/pull/15387)
- English chart titles were missing during document extraction in the DeepDoc module. [#15481](https://github.com/infiniflow/ragflow/pull/15481)
- Empty outputs were returned by the TitleChunker for `json` and `chunks` upstream formats [#14247](https://github.com/infiniflow/ragflow/pull/14247)[#15396](https://github.com/infiniflow/ragflow/pull/15396)
- An error message was missing when a .tsv file upload attempt failed. [#15284](https://github.com/infiniflow/ragflow/pull/15284)
- API tokens missing beta values caused token retrieval errors. [#15405](https://github.com/infiniflow/ragflow/pull/15405)
- Caps the maximum page size to fix system crashes or slowdowns from large queries. [#15292](https://github.com/infiniflow/ragflow/pull/15292)
- Client errors were caused by the OpenAI-compatible chat completion API incorrectly defaulting to streamed responses. [#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- HTTP 500 internal server errors were triggered instead of standard 4xx client errors when users attempted to download missing files from the storage backend. [#15369](https://github.com/infiniflow/ragflow/issues/15369)[#15371](https://github.com/infiniflow/ragflow/pull/15371)
- GraphRAG entity ranking was broken. [#15795](https://github.com/infiniflow/ragflow/issues/15795)[#15797](https://github.com/infiniflow/ragflow/pull/15797)

</template>
<template #zh>

- MiniMax 模型的思考模式未被正确启用。[#15496](https://github.com/infiniflow/ragflow/pull/15496)
- Qwen3.5 和 Qwen3.6 模型启用思考模式时触发无限循环。[#15101](https://github.com/infiniflow/ragflow/pull/15101)
- 使用 OpenAI 兼容的 chat completions API 端点时，流式回答出现重复。[#15286](https://github.com/infiniflow/ragflow/issues/15286)[#15443](https://github.com/infiniflow/ragflow/pull/15443)
- `NaN`（非数字）或 `Inf`（无穷大）等无效数值分数传入 JSON 编码器时，chat completions 出现序列化错误。[#15245](https://github.com/infiniflow/ragflow/issues/15245)[#15266](https://github.com/infiniflow/ragflow/pull/15266)
- 使用 LiteLLM 提供商的 chat completions 失败，原因是未识别的内部配置参数在到达外部 API 前没有被过滤掉。[#15427](https://github.com/infiniflow/ragflow/issues/15427)[#15432](https://github.com/infiniflow/ragflow/pull/15432)
- OpenAI 兼容的 chat completions API 默认采用流式响应。[#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- 元数据过滤期间，空的 `AND` 结果被错误丢弃。[#15477](https://github.com/infiniflow/ragflow/pull/15477)
- MinerU 解析器把页眉、页脚等重复的页面装饰元素错误提取为正文。[#15335](https://github.com/infiniflow/ragflow/issues/15335)[#15387](https://github.com/infiniflow/ragflow/pull/15387)
- DeepDoc 模块在文档提取时丢失英文图表标题。[#15481](https://github.com/infiniflow/ragflow/pull/15481)
- TitleChunker 对 `json` 和 `chunks` 上游格式返回空输出 [#14247](https://github.com/infiniflow/ragflow/pull/14247)[#15396](https://github.com/infiniflow/ragflow/pull/15396)
- .tsv 文件上传失败时缺少错误提示。[#15284](https://github.com/infiniflow/ragflow/pull/15284)
- API token 缺少 beta 值导致 token 获取错误。[#15405](https://github.com/infiniflow/ragflow/pull/15405)
- 限制最大分页大小，修复大查询导致的系统崩溃或变慢。[#15292](https://github.com/infiniflow/ragflow/pull/15292)
- OpenAI 兼容的 chat completion API 错误地默认采用流式响应，导致客户端错误。[#15356](https://github.com/infiniflow/ragflow/issues/15356)[#15394](https://github.com/infiniflow/ragflow/pull/15394)
- 用户尝试从存储后端下载缺失文件时，触发的是 HTTP 500 内部服务器错误而非标准 4xx 客户端错误。[#15369](https://github.com/infiniflow/ragflow/issues/15369)[#15371](https://github.com/infiniflow/ragflow/pull/15371)
- GraphRAG 实体排序失效。[#15795](https://github.com/infiniflow/ragflow/issues/15795)[#15797](https://github.com/infiniflow/ragflow/pull/15797)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.25.6

</template>
<template #zh>

## v0.25.6

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 26, 2026.

</template>
<template #zh>

发布于 2026 年 5 月 26 日。

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

- Agent: Adds a **Browser** component that enables AI to autonomously navigate and interact with web pages. [#14888](https://github.com/infiniflow/ragflow/pull/14888)

</template>
<template #zh>

- Agent：新增 **Browser** 组件，让 AI 能自主浏览并操作网页。[#14888](https://github.com/infiniflow/ragflow/pull/14888)

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- RAG: Stabilizes RAPTOR's AHC mode (Ψ-RAG), which was introduced in v0.25.3 to resolve previous semantic loss by building individual document trees and then merging them hierarchically. This new approach significantly accelerates index construction and outperforms the legacy GMM mode in Recall@5 and average F1. Users retain the option to switch between the two modes. [#14674](https://github.com/infiniflow/ragflow/issues/14674)[#14679](https://github.com/infiniflow/ragflow/pull/14679)
- Agent: Introduces lightweight `@tool` decorator to streamline Python function registration process for chat models. [#15047](https://github.com/infiniflow/ragflow/pull/15047)
- Agent: Enables agent messages to display base64-encoded images. [#15212](https://github.com/infiniflow/ragflow/pull/15212)
- Agent: Exposes **Doc Generator** component's file metadata as discrete variables. [#15080](https://github.com/infiniflow/ragflow/pull/15080)
- Agent: Allows developers to pass `chat_template_kwargs` to agent chat completion endpoint. [#14182](https://github.com/infiniflow/ragflow/issues/14182)[#14542](https://github.com/infiniflow/ragflow/pull/14542) See also [Converse with agent](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent)

</template>
<template #zh>

- RAG：稳定 RAPTOR 的 AHC 模式（Ψ-RAG）。该模式于 v0.25.3 引入，通过为每篇文档单独构建文档树，再分层合并，解决此前的语义损失问题。新方式显著加快索引构建，在 Recall@5 和平均 F1 上优于旧版 GMM 模式。用户仍可在两种模式之间切换。[#14674](https://github.com/infiniflow/ragflow/issues/14674)[#14679](https://github.com/infiniflow/ragflow/pull/14679)
- Agent：引入轻量 `@tool` 装饰器，简化为对话模型注册 Python 函数的流程。[#15047](https://github.com/infiniflow/ragflow/pull/15047)
- Agent：支持在 Agent 消息中显示 base64 编码的图片。[#15212](https://github.com/infiniflow/ragflow/pull/15212)
- Agent：将 **Doc Generator** 组件的文件元数据公开为独立变量。[#15080](https://github.com/infiniflow/ragflow/pull/15080)
- Agent：允许开发者向 agent chat completion 端点传入 `chat_template_kwargs`。[#14182](https://github.com/infiniflow/ragflow/issues/14182)[#14542](https://github.com/infiniflow/ragflow/pull/14542) 另见 [与 Agent 对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Fixes `/chat/completions` to allow sending only latest message in API payload and removes requirement to transmit full conversation history. [#15197](https://github.com/infiniflow/ragflow/pull/15197) See also [Converse with chat assistant](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant).
- Weight assigned to vector similarity was not properly applied during the retrieval phase. [#15108](https://github.com/infiniflow/ragflow/pull/15108)
- Users were unable to save parser configurations on the dataset configuration page. [#15175](https://github.com/infiniflow/ragflow/issues/15175)[#15177](https://github.com/infiniflow/ragflow/pull/15177)
- Log text on a data source's details page was truncated. [#15056](https://github.com/infiniflow/ragflow/pull/15056)
- An unresponsive "Status" filter on the document list page prevented users from filtering or managing uploaded documents by their parsing status. [#15170](https://github.com/infiniflow/ragflow/issues/15170)[#15216](https://github.com/infiniflow/ragflow/pull/15216)
- Calling `GET /agents/<agent_id>/sessions/<session_id>` with a missing or invalid session ID caused a server error. [#14989](https://github.com/infiniflow/ragflow/issues/14989)[#15011](https://github.com/infiniflow/ragflow/pull/15011)
- RAG: RAPTOR construction process halted when using the [Infinity](https://github.com/infiniflow/infinity) document engine. [#14998](https://github.com/infiniflow/ragflow/pull/14998)
- The system failed to correctly parse structured content returned by Mistral reasoning models. [#14805](https://github.com/infiniflow/ragflow/pull/14805)
- The **Parser** component in an ingestion pipeline incorrectly retained raw HTML tags in its text output. [#14831](https://github.com/infiniflow/ragflow/issues/14831)[#14920](https://github.com/infiniflow/ragflow/pull/14920)
- The table parser incorrectly extracted or attached metadata during document processing. [#15127](https://github.com/infiniflow/ragflow/pull/15127)
- Asynchronous background tasks and nested event loops were not properly handled, causing backend instability. [#14755](https://github.com/infiniflow/ragflow/issues/14755)[#14761](https://github.com/infiniflow/ragflow/pull/14761)
- Prompt variables configured in the **Agent** component disappeared after being entered. [#15218](https://github.com/infiniflow/ragflow/pull/15218)

</template>
<template #zh>

- 修复 `/chat/completions`：允许 API 载荷中只发送最新一条消息，不再要求传输完整对话历史。[#15197](https://github.com/infiniflow/ragflow/pull/15197) 另见 [与对话助手对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant)。
- 检索阶段向量相似度的权重未被正确应用。[#15108](https://github.com/infiniflow/ragflow/pull/15108)
- 用户无法在数据集配置页保存解析器配置。[#15175](https://github.com/infiniflow/ragflow/issues/15175)[#15177](https://github.com/infiniflow/ragflow/pull/15177)
- 数据源详情页的日志文本被截断。[#15056](https://github.com/infiniflow/ragflow/pull/15056)
- 文档列表页的 "Status" 筛选器无响应，用户无法按解析状态筛选或管理已上传的文档。[#15170](https://github.com/infiniflow/ragflow/issues/15170)[#15216](https://github.com/infiniflow/ragflow/pull/15216)
- 以缺失或无效的会话 ID 调用 `GET /agents/<agent_id>/sessions/<session_id>` 会导致服务器错误。[#14989](https://github.com/infiniflow/ragflow/issues/14989)[#15011](https://github.com/infiniflow/ragflow/pull/15011)
- RAG：使用 [Infinity](https://github.com/infiniflow/infinity) 文档引擎时，RAPTOR 构建过程中断。[#14998](https://github.com/infiniflow/ragflow/pull/14998)
- 系统未能正确解析 Mistral 推理模型返回的结构化内容。[#14805](https://github.com/infiniflow/ragflow/pull/14805)
- 摄取管道中的 **Parser** 组件在文本输出中错误保留了原始 HTML 标签。[#14831](https://github.com/infiniflow/ragflow/issues/14831)[#14920](https://github.com/infiniflow/ragflow/pull/14920)
- 表格解析器在文档处理期间错误地提取或附加元数据。[#15127](https://github.com/infiniflow/ragflow/pull/15127)
- 异步后台任务与嵌套事件循环未被正确处理，导致后端不稳定。[#14755](https://github.com/infiniflow/ragflow/issues/14755)[#14761](https://github.com/infiniflow/ragflow/pull/14761)
- 在 **Agent** 组件中配置的提示词变量在输入后消失。[#15218](https://github.com/infiniflow/ragflow/pull/15218)

</template>
</BiRow>

<BiRow>
<template #en>

### i18n

</template>
<template #zh>

### 国际化

</template>
</BiRow>

<BiRow>
<template #en>

- Fully translates the interface into French with the addition of roughly 1,400 localization keys. [#15192](https://github.com/infiniflow/ragflow/pull/15192)

</template>
<template #zh>

- 新增约 1,400 个本地化键，将界面完整翻译为法语。[#15192](https://github.com/infiniflow/ragflow/pull/15192)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.25.5

</template>
<template #zh>

## v0.25.5

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 20, 2026.

</template>
<template #zh>

发布于 2026 年 5 月 20 日。

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

- Introduces local and SSH provider options for sandbox environment settings within the admin interface, allowing administrators to configure execution environments without editing environment variables. [#15039](https://github.com/infiniflow/ragflow/pull/15039)

</template>
<template #zh>

- 在管理界面的沙箱环境设置中引入本地和 SSH 提供商选项，管理员无需编辑环境变量即可配置执行环境。[#15039](https://github.com/infiniflow/ragflow/pull/15039)

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- Elasticsearch: Accelerates the retrieval process by removing unnecessary vector fetches during the main search phase, reducing latency by 50–100%. [#14970](https://github.com/infiniflow/ragflow/pull/14970)
- Pushes metadata filters down to the [Infinity](https://github.com/infiniflow/infinity) document engine, significantly improving retrieval performance. [#14974](https://github.com/infiniflow/ragflow/pull/14974)
- Introduces Redis-based caching for Text-to-Speech model outputs, eliminating redundant API calls for identical text to reduce latency and save provider quota. [#14851](https://github.com/infiniflow/ragflow/pull/14851)
- Reduces server startup time by 5-9 seconds and saves roughly 200MB of memory by replacing heavy module-level imports with lazy runtime loading. [#14973](https://github.com/infiniflow/ragflow/pull/14973)
- Optimizes the connector dashboard. [#14979](https://github.com/infiniflow/ragflow/pull/14979)
- Increases minimum supported Python version to 3.13. [#14767](https://github.com/infiniflow/ragflow/pull/14767)

</template>
<template #zh>

- Elasticsearch：在主搜索阶段移除不必要的向量抓取以加快检索，延迟降低 50–100%。[#14970](https://github.com/infiniflow/ragflow/pull/14970)
- 将元数据过滤器下推到 [Infinity](https://github.com/infiniflow/infinity) 文档引擎，显著提升检索性能。[#14974](https://github.com/infiniflow/ragflow/pull/14974)
- 为文本转语音模型的输出引入基于 Redis 的缓存，避免对相同文本重复调用 API，降低延迟并节省提供商配额。[#14851](https://github.com/infiniflow/ragflow/pull/14851)
- 以运行时懒加载取代重量级的模块级导入，服务器启动时间缩短 5-9 秒，内存节省约 200MB。[#14973](https://github.com/infiniflow/ragflow/pull/14973)
- 优化连接器仪表盘。[#14979](https://github.com/infiniflow/ragflow/pull/14979)
- 将最低支持的 Python 版本提升到 3.13。[#14767](https://github.com/infiniflow/ragflow/pull/14767)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Atomic database updates: Wraps document and dataset chunk counter updates in atomic database transactions to prevent data drift. [#14866](https://github.com/infiniflow/ragflow/issues/14866)[#14867](https://github.com/infiniflow/ragflow/pull/14867)
- Data source: the GitHub data source connector was failing to sync any content by default. [#13975](https://github.com/infiniflow/ragflow/issues/13975)[#14062](https://github.com/infiniflow/ragflow/pull/14062)
- The Tongyi-Qianwen text embedding models were hitting the wrong API endpoints when configured with international or Chinese regional URLs. [#14784](https://github.com/infiniflow/ragflow/pull/14784)
- Agent: Fully aggregates message content, reference data, and structured outputs across all generated events to fix incomplete responses in the non-streaming `/api/v1/agentbots/<agent_id>/completions` endpoint. [#13384](https://github.com/infiniflow/ragflow/issues/13384)[#14848](https://github.com/infiniflow/ragflow/pull/14848)
- Prevents the **Retrieval** component's manual metadata filters from getting stuck on the first loop's value by making a temporary copy of the filter settings to preserve the original placeholder.[#12582](https://github.com/infiniflow/ragflow/issues/12582)[#14849](https://github.com/infiniflow/ragflow/pull/14849)
- Agent: Fixed MCP tool name duplication.[#14217](https://github.com/infiniflow/ragflow/pull/14217)
- Agent: top_k passing issues [#14760](https://github.com/infiniflow/ragflow/pull/14760)
- Chat file attachment loss. [#13993](https://github.com/infiniflow/ragflow/pull/13993)
- IMAP synchronization process crashed when multiple email addresses or quoted commas were detected in "From" header. [#14963](https://github.com/infiniflow/ragflow/issues/14963)[#14964](https://github.com/infiniflow/ragflow/issues/14964)[#15006](https://github.com/infiniflow/ragflow/pull/15006)
- Langfuse integration failed to track token consumption. [#9837](https://github.com/infiniflow/ragflow/issues/9837)[#13294](https://github.com/infiniflow/ragflow/pull/13294)
- Enhances the stability and fault tolerance of the reranking module by implementing network timeouts, crash-prevention safeguards, and specific provider bug fixes. [#14264](https://github.com/infiniflow/ragflow/pull/14264)
- Increases minimum supported Nginx to 1.31.0. [#14928](https://github.com/infiniflow/ragflow/issues/14928)[#15007](https://github.com/infiniflow/ragflow/pull/15007)

</template>
<template #zh>

- 原子数据库更新：把文档与数据集的分块计数器更新包裹在原子数据库事务中，防止数据漂移。[#14866](https://github.com/infiniflow/ragflow/issues/14866)[#14867](https://github.com/infiniflow/ragflow/pull/14867)
- 数据源：GitHub 数据源连接器默认无法同步任何内容。[#13975](https://github.com/infiniflow/ragflow/issues/13975)[#14062](https://github.com/infiniflow/ragflow/pull/14062)
- Tongyi-Qianwen 文本嵌入模型在配置为国际或中国区域 URL 时调用错误的 API 端点。[#14784](https://github.com/infiniflow/ragflow/pull/14784)
- Agent：汇总全部生成事件的消息内容、引用数据与结构化输出，修复非流式 `/api/v1/agentbots/<agent_id>/completions` 端点响应不完整的问题。[#13384](https://github.com/infiniflow/ragflow/issues/13384)[#14848](https://github.com/infiniflow/ragflow/pull/14848)
- 通过临时复制筛选设置来保留原始占位符，修复 **Retrieval** 组件手动元数据过滤器卡在首轮循环值的问题。[#12582](https://github.com/infiniflow/ragflow/issues/12582)[#14849](https://github.com/infiniflow/ragflow/pull/14849)
- Agent：修复 MCP 工具名称重复的问题。[#14217](https://github.com/infiniflow/ragflow/pull/14217)
- Agent：top_k 传递问题 [#14760](https://github.com/infiniflow/ragflow/pull/14760)
- 对话文件附件丢失。[#13993](https://github.com/infiniflow/ragflow/pull/13993)
- 当 "From" 头中检测到多个邮箱地址或带引号的逗号时，IMAP 同步进程崩溃。[#14963](https://github.com/infiniflow/ragflow/issues/14963)[#14964](https://github.com/infiniflow/ragflow/issues/14964)[#15006](https://github.com/infiniflow/ragflow/pull/15006)
- Langfuse 集成无法追踪 token 消耗。[#9837](https://github.com/infiniflow/ragflow/issues/9837)[#13294](https://github.com/infiniflow/ragflow/pull/13294)
- 通过实现网络超时、防崩溃保护和特定提供商的缺陷修复，增强重排序模块的稳定性与容错能力。[#14264](https://github.com/infiniflow/ragflow/pull/14264)
- 将最低支持的 Nginx 提升到 1.31.0。[#14928](https://github.com/infiniflow/ragflow/issues/14928)[#15007](https://github.com/infiniflow/ragflow/pull/15007)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.25.4

</template>
<template #zh>

## v0.25.4

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 14, 2026

</template>
<template #zh>

发布于 2026 年 5 月 14 日

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

- Introduces a generic RESTful API connector, enabling configurable data ingestion from niche or enterprise-specific platforms into RAGFlow. [#13545](https://github.com/infiniflow/ragflow/pull/13545)
- Agent: Implements tag management to help users categorize, filter, and sort their Agent apps. [#14799](https://github.com/infiniflow/ragflow/pull/14799)

</template>
<template #zh>

- 引入通用 RESTful API 连接器，实现从小众或企业特有平台到 RAGFlow 的可配置数据摄取。[#13545](https://github.com/infiniflow/ragflow/pull/13545)
- Agent：实现标签管理，帮助用户对 Agent 应用进行分类、筛选和排序。[#14799](https://github.com/infiniflow/ragflow/pull/14799)

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- Adds widget customization and persistence, allowing users to tailor their chat interface and ensure their settings are retained across sessions. [#14603](https://github.com/infiniflow/ragflow/pull/14603)

</template>
<template #zh>

- 新增小组件自定义与持久化，用户可定制对话界面，并让设置在会话之间保留。[#14603](https://github.com/infiniflow/ragflow/pull/14603)

</template>
</BiRow>

<BiRow>
<template #en>

### Model support

</template>
<template #zh>

### 模型支持

</template>
</BiRow>

<BiRow>
<template #en>

- Adds gpt-5.4-mini and gpt-5.4-nano to the OpenAI model list [#14908](https://github.com/infiniflow/ragflow/pull/14908)

</template>
<template #zh>

- 向 OpenAI 模型列表添加 gpt-5.4-mini 和 gpt-5.4-nano [#14908](https://github.com/infiniflow/ragflow/pull/14908)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Corrects the API endpoint for downloading original files from a specified dataset. [#14910](https://github.com/infiniflow/ragflow/pull/14910) See also [Download document](https://ragflow.io/docs/references/http_api_reference.md#download-document).

</template>
<template #zh>

- 修正从指定数据集下载原始文件的 API 端点。[#14910](https://github.com/infiniflow/ragflow/pull/14910) 另见 [下载文档](https://ragflow.io/docs/references/http_api_reference.md#download-document)。

</template>
</BiRow>

<BiRow>
<template #en>

## v0.25.3

</template>
<template #zh>

## v0.25.3

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 13, 2026.

</template>
<template #zh>

发布于 2026 年 5 月 13 日。

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

- Enables assigning specific roles like content, metadata, and primary key, to table columns. [#13710](https://github.com/infiniflow/ragflow/pull/13710)

</template>
<template #zh>

- 支持为表格列指定特定角色，如内容、元数据和主键。[#13710](https://github.com/infiniflow/ragflow/pull/13710)

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- S3 connector: Implements ETag-based incremental synchronization for S3 data sources, drastically reducing sync time and AWS egress costs for users with massive-volumn S3-based datasets. [#14628](https://github.com/infiniflow/ragflow/issues/14628)[#14677](https://github.com/infiniflow/ragflow/pull/14677)
- API refactoring and security
  - Continues the transition of web APIs to RESTful conventions, ensuring backward compatibility for all legacy endpoints.
  - Binds the `user_id` in `POST /api/v1/messages` to the authenticated JWT principal. [#14745](https://github.com/infiniflow/ragflow/pull/14745)
  - Secures the sandbox executor against dynamic and indirect code execution bypasses. [#14690](https://github.com/infiniflow/ragflow/pull/14690)
  - Enforces HTTP request timeouts across the LLM integration layer. [#14313](https://github.com/infiniflow/ragflow/pull/14313)
- Refactors thread pool lifecycle management in `file_service.py` and `task_executor.py` for more efficient, lightweight resource handling. [#14668](https://github.com/infiniflow/ragflow/pull/14668)
- Agent: Enables the **Code** component to output and display file-based attachments, such as charts and images, directly in the chat. [#14787](https://github.com/infiniflow/ragflow/pull/14787)
- Reduces ingestion server boot time. [#14894](https://github.com/infiniflow/ragflow/pull/14894)

</template>
<template #zh>

- S3 连接器：为 S3 数据源实现基于 ETag 的增量同步，为海量 S3 数据集用户大幅缩短同步时间、降低 AWS 流出流量成本。[#14628](https://github.com/infiniflow/ragflow/issues/14628)[#14677](https://github.com/infiniflow/ragflow/pull/14677)
- API 重构与安全
  - 继续将 Web API 迁移到 RESTful 规范，并确保所有旧端点向后兼容。
  - 将 `POST /api/v1/messages` 中的 `user_id` 绑定到已认证的 JWT 主体。[#14745](https://github.com/infiniflow/ragflow/pull/14745)
  - 加固沙箱执行器，防御动态与间接的代码执行绕过。[#14690](https://github.com/infiniflow/ragflow/pull/14690)
  - 在 LLM 集成层统一强制 HTTP 请求超时。[#14313](https://github.com/infiniflow/ragflow/pull/14313)
- 重构 `file_service.py` 与 `task_executor.py` 中的线程池生命周期管理，实现更高效、更轻量的资源处理。[#14668](https://github.com/infiniflow/ragflow/pull/14668)
- Agent：支持 **Code** 组件在对话中直接输出并展示图表、图片等基于文件的附件。[#14787](https://github.com/infiniflow/ragflow/pull/14787)
- 缩短摄取服务器的启动时间。[#14894](https://github.com/infiniflow/ragflow/pull/14894)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Images in multi-sheet Excel workbooks were not scoped by sheet, causing images to be incorrectly attributed across different worksheets. [#14120](https://github.com/infiniflow/ragflow/pull/14120)
- Agent: Splits the **Message** component output into distinct 'waiting' and 'message' states when nested inside an **Iteration** component alongside a **Wait** component. [#14839](https://github.com/infiniflow/ragflow/pull/14839)
- Agent: The **Iteration** component failed to correctly pass array elements to its child components due to a naming mismatch between the expected `IterationItem` alias and the runtime `item` variable. [#14146](https://github.com/infiniflow/ragflow/pull/14146)
- Agent: Template strings in tool-type components like **Email** and **Invoke** failed to interpolate; `{{variable}}` placeholders were passed through as raw text. [#14601](https://github.com/infiniflow/ragflow/pull/14601)
- Volcengine (Doubao/Ark) endpoints were not visible in the provider list. [#14702](https://github.com/infiniflow/ragflow/pull/14702)

</template>
<template #zh>

- 多工作表 Excel 工作簿中的图片未按工作表隔离，导致图片被错误归属到不同的工作表。[#14120](https://github.com/infiniflow/ragflow/pull/14120)
- Agent：当 **Message** 组件与 **Wait** 组件一同嵌套在 **Iteration** 组件内时，把 **Message** 组件的输出拆分为 'waiting' 和 'message' 两种状态。[#14839](https://github.com/infiniflow/ragflow/pull/14839)
- Agent：**Iteration** 组件因预期的 `IterationItem` 别名与运行时的 `item` 变量命名不一致，未能把数组元素正确传给子组件。[#14146](https://github.com/infiniflow/ragflow/pull/14146)
- Agent：**Email**、**Invoke** 等工具类组件中的模板字符串无法插值，`{{variable}}` 占位符被当作原始文本透传。[#14601](https://github.com/infiniflow/ragflow/pull/14601)
- Volcengine（Doubao/Ark）端点在提供商列表中不可见。[#14702](https://github.com/infiniflow/ragflow/pull/14702)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.25.2

</template>
<template #zh>

## v0.25.2

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 11, 2026.

</template>
<template #zh>

发布于 2026 年 5 月 11 日。

</template>
</BiRow>

<BiRow>
<template #en>

### Improvements

</template>
<template #zh>

### 改进

</template>
</BiRow>

<BiRow>
<template #en>

- API refactoring and unification: Continues the transition of web APIs to RESTful conventions, ensuring backward compatibility for all legacy endpoints.

</template>
<template #zh>

- API 重构与统一：继续将 Web API 迁移到 RESTful 规范，并确保所有旧端点向后兼容。

</template>
</BiRow>

<BiRow>
<template #en>

### Data source

</template>
<template #zh>

### 数据源

</template>
</BiRow>

<BiRow>
<template #en>

- Introduces a lightweight snapshot mechanism for synchronizing deleted files across eight data sources—including Moodle, DingTalk AI Table, and RSS—ensuring a faithful reflection of all remote data sources. [#14362](https://github.com/infiniflow/ragflow/issues/14362)[#14499](https://github.com/infiniflow/ragflow/pull/14499)

</template>
<template #zh>

- 为八种数据源引入轻量快照机制来同步已删除的文件——包括 Moodle、DingTalk AI Table 和 RSS——确保如实反映所有远端数据源。[#14362](https://github.com/infiniflow/ragflow/issues/14362)[#14499](https://github.com/infiniflow/ragflow/pull/14499)

</template>
</BiRow>

<BiRow>
<template #en>

### Bug fixes

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Metadata visibility issues during v0.24.0 to v0.25.0 upgrades.
- Duplicate chat output.
- Metadata filtering was handled in-memory instead of leveraging Elasticsearch, incurring performance bottlenecks. [#14576](https://github.com/infiniflow/ragflow/pull/14576)

</template>
<template #zh>

- v0.24.0 升级到 v0.25.0 期间的元数据可见性问题。
- 对话输出重复。
- 元数据过滤在内存中进行，而没有利用 Elasticsearch，造成性能瓶颈。[#14576](https://github.com/infiniflow/ragflow/pull/14576)

</template>
</BiRow>
