<BiRow>
<template #en>

## v0.19.0

</template>
<template #zh>

## v0.19.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on May 26, 2025.

</template>
<template #zh>

发布于 2025 年 5 月 26 日。

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

- [Cross-language search](https://ragflow.io/docs/references/glossary.mdx#cross-language-search) is supported in the Knowledge and Chat modules, enhancing search accuracy and user experience in multilingual environments, such as in Chinese-English datasets.
- Agent component: A new Code component supports Python and JavaScript scripts, enabling developers to handle more complex tasks like dynamic data processing.
- Enhanced image display: Images in Chat and Search now render directly within responses, rather than as external references. Knowledge retrieval testing can retrieve images directly, instead of texts extracted from images.
- Claude 4 and ChatGPT o3: Developers can now use the newly released, most advanced Claude model and OpenAI’s latest ChatGPT o3 inference model.

</template>
<template #zh>

- [跨语言搜索](https://ragflow.io/docs/references/glossary.mdx#cross-language-search)现已在知识库与 Chat 模块中得到支持，可提升多语言环境（如中英数据集）下的搜索准确性与使用体验。
- Agent 组件：新增 Code 组件，支持 Python 与 JavaScript 脚本，使开发者能够处理动态数据处理等更复杂的任务。
- 图片显示增强：Chat 与 Search 中的图片现可直接在回答内渲染，而不再作为外部引用显示。知识库检索测试可直接检索图片，而非从图片中提取的文本。
- Claude 4 与 ChatGPT o3：开发者现可使用新发布的、最先进的 Claude 模型以及 OpenAI 最新的 ChatGPT o3 推理模型。

</template>
</BiRow>

<BiRow>
<template #en>

> The following features have been contributed by our community:

</template>
<template #zh>

> 以下功能由我们的社区贡献：

</template>
</BiRow>

<BiRow>
<template #en>

- Agent component: Enables tool calling within the Generate Component. Thanks to [notsyncing](https://github.com/notsyncing).
- Markdown rendering: Image references in a markdown file can be displayed after chunking. Thanks to [Woody-Hu](https://github.com/Woody-Hu).
- Document engine support: OpenSearch can now be used as RAGFlow's document engine. Thanks to [pyyuhao](https://github.com/pyyuhao).

</template>
<template #zh>

- Agent 组件：支持在 Generate 组件内调用工具。感谢 [notsyncing](https://github.com/notsyncing)。
- Markdown 渲染：Markdown 文件中的图片引用可在分块后显示。感谢 [Woody-Hu](https://github.com/Woody-Hu)。
- 文档引擎支持：现可将 OpenSearch 用作 RAGFlow 的文档引擎。感谢 [pyyuhao](https://github.com/pyyuhao)。

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Select PDF parser](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration)
- [Enable Excel2HTML]
- [Code component](https://ragflow.io/docs/guides/agent/agent_workflow/data_manipulation_components.md#code-component)

</template>
<template #zh>

- [选择 PDF 解析器](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration)
- [启用 Excel2HTML]
- [Code 组件](https://ragflow.io/docs/guides/agent/agent_workflow/data_manipulation_components.md#code-component)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.18.0

</template>
<template #zh>

## v0.18.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on April 23, 2025.

</template>
<template #zh>

发布于 2025 年 4 月 23 日。

</template>
</BiRow>

<BiRow>
<template #en>

### Compatibility changes

</template>
<template #zh>

### 兼容性变更

</template>
</BiRow>

<BiRow>
<template #en>

From this release onwards, built-in rerank models have been removed because they have minimal impact on retrieval rates but significantly increase retrieval time.

</template>
<template #zh>

自本版本起，内置重排序模型已被移除——它们对检索率的影响微乎其微，却会显著增加检索时间。

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

- MCP server: enables access to RAGFlow's datasets via MCP.
- DeepDoc supports adopting VLM model as a processing pipeline during document layout recognition, enabling in-depth analysis of images in PDF and DOCX files.
- OpenAI-compatible APIs: Agents can be called via OpenAI-compatible APIs.
- User registration control: administrators can enable or disable user registration through an environment variable.
- Team collaboration: Agents can be shared with team members.
- Agent version control: all updates are continuously logged and can be rolled back to a previous version via export.

</template>
<template #zh>

- MCP 服务器：支持通过 MCP 访问 RAGFlow 的数据集。
- DeepDoc 支持在文档版面识别时采用 VLM 模型作为处理管道，实现对 PDF 与 DOCX 文件中图片的深度分析。
- OpenAI 兼容 API：可通过 OpenAI 兼容 API 调用 Agent。
- 用户注册管控：管理员可通过环境变量开启或关闭用户注册。
- 团队协作：Agent 可与团队成员共享。
- Agent 版本控制：所有更新都会被持续记录，并可通过导出回滚到先前的版本。

</template>
</BiRow>

<BiRow>
<template #en>

![export_agent](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/export_agent_as_json.jpg)

</template>
<template #zh>

![export_agent](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/export_agent_as_json.jpg)

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

- Enhanced answer referencing: Citation accuracy in generated responses is improved.
- Enhanced question-answering experience: users can now manually stop streaming output during a conversation.

</template>
<template #zh>

- 回答引用增强：提升生成回答中的引用准确性。
- 问答体验增强：用户现可在对话过程中手动停止流式输出。

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Set page rank](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)
- Enable RAPTOR
- Set variables for your chat assistant
- [Launch RAGFlow MCP server](https://ragflow.io/docs/develop/mcp/launch_mcp_server)

</template>
<template #zh>

- [设置 PageRank](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)
- 启用 RAPTOR
- 为对话助手设置变量
- [启动 RAGFlow MCP 服务器](https://ragflow.io/docs/develop/mcp/launch_mcp_server)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.17.2

</template>
<template #zh>

## v0.17.2

</template>
</BiRow>

<BiRow>
<template #en>

Released on March 13, 2025.

</template>
<template #zh>

发布于 2025 年 3 月 13 日。

</template>
</BiRow>

<BiRow>
<template #en>

### Compatibility changes

</template>
<template #zh>

### 兼容性变更

</template>
</BiRow>

<BiRow>
<template #en>

- Removes the **Max_tokens** setting from **Chat configuration**.
- Removes the **Max_tokens** setting from **Generate**, **Rewrite**, **Categorize**, **Keyword** agent components.

</template>
<template #zh>

- 移除 **Chat configuration** 中的 **Max_tokens** 设置。
- 移除 **Generate**、**Rewrite**、**Categorize**、**Keyword** Agent 组件中的 **Max_tokens** 设置。

</template>
</BiRow>

<BiRow>
<template #en>

From this release onwards, if you still see RAGFlow's responses being cut short or truncated, check the **Max_tokens** setting of your model provider.

</template>
<template #zh>

自本版本起，如果仍出现 RAGFlow 回答被截断的情况，请检查模型提供商的 **Max_tokens** 设置。

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

- Adds OpenAI-compatible APIs.
- Introduces a German user interface.
- Accelerates knowledge graph extraction.
- Enables Tavily-based web search in the **Retrieval** agent component.
- Adds Tongyi-Qianwen QwQ models (OpenAI-compatible).
- Supports CSV files in the **General** chunking method.

</template>
<template #zh>

- 新增 OpenAI 兼容 API。
- 新增德语用户界面。
- 加速知识图谱提取。
- 在 **Retrieval** Agent 组件中启用基于 Tavily 的网络搜索。
- 新增通义千问 QwQ 模型（OpenAI 兼容）。
- **General** 分块方法支持 CSV 文件。

</template>
</BiRow>

<BiRow>
<template #en>

### Fixed issues

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- Unable to add models via Ollama/Xinference, an issue introduced in v0.17.1.

</template>
<template #zh>

- 无法通过 Ollama/Xinference 添加模型，该问题由 v0.17.1 引入。

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

#### HTTP APIs

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

- [Create chat completion](https://ragflow.io/docs/references/http_api_reference.md#openai-compatible-api)

</template>
<template #zh>

- [创建对话补全](https://ragflow.io/docs/references/http_api_reference.md#openai-compatible-api)

</template>
</BiRow>

<BiRow>
<template #en>

#### Python APIs

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

- [Create chat completion](https://ragflow.io/docs/references/python_api_reference.md#openai-compatible-api)

</template>
<template #zh>

- [创建对话补全](https://ragflow.io/docs/references/python_api_reference.md#openai-compatible-api)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.17.1

</template>
<template #zh>

## v0.17.1

</template>
</BiRow>

<BiRow>
<template #en>

Released on March 11, 2025.

</template>
<template #zh>

发布于 2025 年 3 月 11 日。

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

- Improves English tokenization quality.
- Improves the table extraction logic in Markdown document parsing.
- Updates SiliconFlow's model list.
- Supports parsing XLS files (Excel 97-2003) with improved corresponding error handling.
- Supports Huggingface rerank models.
- Enables relative time expressions ("now", "yesterday", "last week", "next year", and more) in chat assistant and the **Rewrite** agent component.

</template>
<template #zh>

- 提升英文分词质量。
- 改进 Markdown 文档解析中的表格提取逻辑。
- 更新 SiliconFlow 的模型列表。
- 支持 XLS（Excel 97-2003）文件解析，并改进了相应的错误处理。
- 支持 Huggingface 重排序模型。
- 在对话助手与 **Rewrite** Agent 组件中启用相对时间表达（"now"、"yesterday"、"last week"、"next year" 等）。

</template>
</BiRow>

<BiRow>
<template #en>

### Fixed issues

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

- A repetitive knowledge graph extraction issue.
- Issues with API calling.
- Options in the **PDF parser**, aka **Document parser**, dropdown are missing.
- A Tavily web search issue.
- Unable to preview diagrams or images in an AI chat.

</template>
<template #zh>

- 知识图谱重复提取的问题。
- API 调用相关问题。
- **PDF parser**（又称 **Document parser**）下拉菜单中的选项缺失。
- 一个 Tavily 网络搜索问题。
- 无法在 AI 对话中预览图表或图片。

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Use tag set](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)

</template>
<template #zh>

- [使用标签集](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.17.0

</template>
<template #zh>

## v0.17.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on March 3, 2025.

</template>
<template #zh>

发布于 2025 年 3 月 3 日。

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

- AI chat: Implements Deep research for agentic reasoning. To activate this, enable the **Reasoning** toggle under the **Prompt engine** tab of your chat assistant dialogue.
- AI chat: Leverages Tavily-based web search to enhance contexts in agentic reasoning. To activate this, enter the correct Tavily API key under the **Assistant settings** tab of your chat assistant dialogue.
- AI chat: Supports starting a chat without specifying datasets.
- AI chat: HTML files can also be previewed and referenced, in addition to PDF files.
- Dataset: Adds a **PDF parser**, aka **Document parser**, dropdown menu to dataset configurations. This includes a DeepDoc model option, which is time-consuming, a much faster **naive** option (plain text), which skips DLA (Document Layout Analysis), OCR (Optical Character Recognition), and TSR (Table Structure Recognition) tasks, and several currently *experimental* large model options. See [here](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration).
- Agent component: **(x)** or a forward slash `/` can be used to insert available keys (variables) in the system prompt field of the **Generate** or **Template** component.
- Object storage: Supports using Aliyun OSS (Object Storage Service) as a file storage option.
- Models: Updates the supported model list for Tongyi-Qianwen (Qwen), adding DeepSeek-specific models; adds ModelScope as a model provider.
- APIs: Document metadata can be updated through an API.

</template>
<template #zh>

- AI 对话：实现面向 Agentic 推理的 Deep research。要启用该功能，请在对话助手的对话配置中打开 **Prompt engine** 标签页下的 **Reasoning** 开关。
- AI 对话：利用基于 Tavily 的网络搜索增强 Agentic 推理的上下文。要启用该功能，请在对话助手对话配置的 **Assistant settings** 标签页下填入正确的 Tavily API key。
- AI 对话：支持不指定数据集直接开始对话。
- AI 对话：除 PDF 文件外，HTML 文件也可预览与引用。
- 数据集：在数据集配置中新增 **PDF parser**（又称 **Document parser**）下拉菜单。其中包括耗时较长的 DeepDoc 模型选项，跳过 DLA（文档版面分析）、OCR（光学字符识别）与 TSR（表格结构识别）任务、速度快得多的 **naive** 选项（纯文本），以及若干目前处于*实验性*阶段的大模型选项。参见[此处](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration)。
- Agent 组件：在 **Generate** 或 **Template** 组件的系统提示词输入框中，可使用 **(x)** 或正斜杠 `/` 插入可用的键（变量）。
- 对象存储：支持将阿里云 OSS（对象存储服务）用作文件存储选项。
- 模型：更新通义千问（Qwen）支持的模型列表并新增 DeepSeek 专用模型；新增 ModelScope 作为模型提供商。
- API：支持通过 API 更新文档元数据。

</template>
</BiRow>

<BiRow>
<template #en>

The following diagram illustrates the workflow of RAGFlow's Deep research:

</template>
<template #zh>

下图展示了 RAGFlow Deep research 的工作流：

</template>
</BiRow>

<BiRow>
<template #en>

![Image](https://github.com/user-attachments/assets/f65d4759-4f09-4d9d-9549-c0e1fe907525)

</template>
<template #zh>

![Image](https://github.com/user-attachments/assets/f65d4759-4f09-4d9d-9549-c0e1fe907525)

</template>
</BiRow>

<BiRow>
<template #en>

The following is a screenshot of a conversation that integrates Deep research:

</template>
<template #zh>

以下是一段集成了 Deep research 的对话截图：

</template>
</BiRow>

<BiRow>
<template #en>

![Image](https://github.com/user-attachments/assets/165b88ff-1f5d-4fb8-90e2-c836b25e32e9)

</template>
<template #zh>

![Image](https://github.com/user-attachments/assets/165b88ff-1f5d-4fb8-90e2-c836b25e32e9)

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

#### HTTP APIs

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

Adds a body parameter `"meta_fields"` to the [Update document](https://ragflow.io/docs/references/http_api_reference.md#update-document) method.

</template>
<template #zh>

为[更新文档](https://ragflow.io/docs/references/http_api_reference.md#update-document)方法新增请求体参数 `"meta_fields"`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Python APIs

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

Adds a key option `"meta_fields"` to the [Update document](https://ragflow.io/docs/references/python_api_reference.md#update-document) method.

</template>
<template #zh>

为[更新文档](https://ragflow.io/docs/references/python_api_reference.md#update-document)方法新增键选项 `"meta_fields"`。

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Run retrieval test](https://ragflow.io/docs/guides/dataset/retrieval_testing)

</template>
<template #zh>

- [运行检索测试](https://ragflow.io/docs/guides/dataset/retrieval_testing)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.16.0

</template>
<template #zh>

## v0.16.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on February 6, 2025.

</template>
<template #zh>

发布于 2025 年 2 月 6 日。

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

- Supports DeepSeek R1 and DeepSeek V3.
- GraphRAG refactor: Knowledge graph is dynamically built on an entire dataset rather than on an individual file, and automatically updated when a newly uploaded file starts parsing. See [here](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#graph).
- Adds an **Iteration** agent component and a **Research report generator** agent template. See [here](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#iteration).
- New UI language: Portuguese.
- Allows setting metadata for a specific file in a dataset to enhance AI-powered chats. See [here](https://ragflow.io/docs/guides/dataset/metadata_management).
- Upgrades RAGFlow's document engine [Infinity](https://github.com/infiniflow/infinity) to v0.6.0.dev3.
- Supports GPU acceleration for DeepDoc (see [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml)).
- Supports creating and referencing a **Tag** dataset as a key milestone towards bridging the semantic gap between query and response.

</template>
<template #zh>

- 支持 DeepSeek R1 与 DeepSeek V3。
- GraphRAG 重构：知识图谱在整个数据集上动态构建，而非基于单个文件，并在新上传的文件开始解析时自动更新。参见[此处](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#graph)。
- 新增 **Iteration** Agent 组件与 **Research report generator** Agent 模板。参见[此处](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#iteration)。
- 新增界面语言：葡萄牙语。
- 支持为数据集中的特定文件设置元数据，以增强 AI 对话。参见[此处](https://ragflow.io/docs/guides/dataset/metadata_management)。
- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.6.0.dev3。
- 支持 DeepDoc 的 GPU 加速（参见 [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml)）。
- 支持创建并引用 **Tag** 数据集，这是弥合查询与回答之间语义鸿沟的关键里程碑。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
The **Tag dataset** feature is *unavailable* on the [Infinity](https://github.com/infiniflow/infinity) document engine.
:::

</template>
<template #zh>

:::danger 重要
**Tag 数据集**功能在 [Infinity](https://github.com/infiniflow/infinity) 文档引擎上*不可用*。
:::

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Construct knowledge graph]
- [Set metadata](https://ragflow.io/docs/guides/dataset/metadata_management)
- [Begin component](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#begin-component)
- [Generate component]
- [Interact component]
- [Retrieval component](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#retrieval-component)
- [Categorize component](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#categorize-component)
- [Keyword component]
- [Message component](https://ragflow.io/docs/guides/agent/agent_workflow/dialogue_component.md#reply-message-component)
- [Rewrite component]
- [Switch component](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#switch-component)
- [Concentrator component]
- [Template component]
- [Iteration component](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#iteration)
- [Note component]

</template>
<template #zh>

- [构建知识图谱]
- [设置元数据](https://ragflow.io/docs/guides/dataset/metadata_management)
- [Begin 组件](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#begin-component)
- [Generate 组件]
- [Interact 组件]
- [Retrieval 组件](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#retrieval-component)
- [Categorize 组件](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#categorize-component)
- [Keyword 组件]
- [Message 组件](https://ragflow.io/docs/guides/agent/agent_workflow/dialogue_component.md#reply-message-component)
- [Rewrite 组件]
- [Switch 组件](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#switch-component)
- [Concentrator 组件]
- [Template 组件]
- [Iteration 组件](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#iteration)
- [Note 组件]

</template>
</BiRow>

<BiRow>
<template #en>

## v0.15.1

</template>
<template #zh>

## v0.15.1

</template>
</BiRow>

<BiRow>
<template #en>

Released on December 25, 2024.

</template>
<template #zh>

发布于 2024 年 12 月 25 日。

</template>
</BiRow>

<BiRow>
<template #en>

### Upgrades

</template>
<template #zh>

### 升级

</template>
</BiRow>

<BiRow>
<template #en>

- Upgrades RAGFlow's document engine [Infinity](https://github.com/infiniflow/infinity) to v0.5.2.
- Enhances the log display of document parsing status.

</template>
<template #zh>

- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.5.2。
- 增强文档解析状态的日志展示。

</template>
</BiRow>

<BiRow>
<template #en>

### Fixed issues

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

This release fixes the following issues:

</template>
<template #zh>

本版本修复了以下问题：

</template>
</BiRow>

<BiRow>
<template #en>

- The `SCORE not found` and `position_int` errors returned by [Infinity](https://github.com/infiniflow/infinity).
- Once an embedding model in a specific dataset is changed, embedding models in other datasets can no longer be changed.
- Slow response in question-answering and AI search due to repetitive loading of the embedding model.
- Fails to parse documents with RAPTOR.
- Using the **Table** parsing method results in information loss.
- Miscellaneous API issues.

</template>
<template #zh>

- [Infinity](https://github.com/infiniflow/infinity) 返回 `SCORE not found` 与 `position_int` 错误的问题。
- 一旦更改某个数据集的嵌入模型，其他数据集的嵌入模型便无法再更改。
- 嵌入模型被反复加载，导致问答与 AI 搜索响应缓慢。
- 无法使用 RAPTOR 解析文档。
- 使用 **Table** 解析方法会导致信息丢失。
- 其他若干 API 问题。

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

#### HTTP APIs

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

Adds an optional parameter `"user_id"` to the following APIs:

</template>
<template #zh>

为以下 API 新增可选参数 `"user_id"`：

</template>
</BiRow>

<BiRow>
<template #en>

- [Create session with chat assistant](https://ragflow.io/docs/dev/http_api_reference#create-session-with-chat-assistant)
- [Update chat assistant's session](https://ragflow.io/docs/dev/http_api_reference#update-chat-assistants-session)
- [List chat assistant's sessions](https://ragflow.io/docs/dev/http_api_reference#list-chat-assistants-sessions)
- [Create session with agent](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [Converse with chat assistant](https://ragflow.io/docs/dev/http_api_reference#converse-with-chat-assistant)
- [Converse with agent](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)
- [List agent sessions](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)

</template>
<template #zh>

- [与对话助手创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-chat-assistant)
- [更新对话助手的会话](https://ragflow.io/docs/dev/http_api_reference#update-chat-assistants-session)
- [列出对话助手的会话](https://ragflow.io/docs/dev/http_api_reference#list-chat-assistants-sessions)
- [与 Agent 创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [与对话助手对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-chat-assistant)
- [与 Agent 对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)
- [列出 Agent 会话](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.15.0

</template>
<template #zh>

## v0.15.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on December 18, 2024.

</template>
<template #zh>

发布于 2024 年 12 月 18 日。

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

- Introduces additional Agent-specific APIs.
- Supports using page rank score to improve retrieval performance when searching across multiple datasets.
- Offers an iframe in Chat and Agent to facilitate the integration of RAGFlow into your webpage.
- Adds a Helm chart for deploying RAGFlow on Kubernetes.
- Supports importing or exporting an agent in JSON format.
- Supports step run for Agent components/tools.
- Adds a new UI language: Japanese.
- Supports resuming GraphRAG and RAPTOR from a failure, enhancing task management resilience.
- Adds more Mistral models.
- Adds a dark mode to the UI, allowing users to toggle between light and dark themes.

</template>
<template #zh>

- 引入更多 Agent 专用 API。
- 支持使用 PageRank 分数提升跨多数据集搜索时的检索性能。
- 在 Chat 与 Agent 中提供 iframe，便于将 RAGFlow 集成到你的网页。
- 新增用于在 Kubernetes 上部署 RAGFlow 的 Helm chart。
- 支持以 JSON 格式导入或导出 Agent。
- 支持 Agent 组件/工具的单步运行。
- 新增界面语言：日语。
- 支持 GraphRAG 与 RAPTOR 从失败处恢复，增强任务管理的韧性。
- 新增更多 Mistral 模型。
- 界面新增深色模式，用户可在浅色与深色主题之间切换。

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

- Upgrades the Document Layout Analysis model in DeepDoc.
- Significantly enhances the retrieval performance when using [Infinity](https://github.com/infiniflow/infinity) as document engine.

</template>
<template #zh>

- 升级 DeepDoc 中的文档版面分析模型。
- 显著提升以 [Infinity](https://github.com/infiniflow/infinity) 作为文档引擎时的检索性能。

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

#### HTTP APIs

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

- [List agent sessions](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)
- [List agents](https://ragflow.io/docs/dev/http_api_reference#list-agents)

</template>
<template #zh>

- [列出 Agent 会话](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)
- [列出 Agent](https://ragflow.io/docs/dev/http_api_reference#list-agents)

</template>
</BiRow>

<BiRow>
<template #en>

#### Python APIs

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

- [List agent sessions](https://ragflow.io/docs/dev/python_api_reference#list-agent-sessions)
- [List agents](https://ragflow.io/docs/dev/python_api_reference#list-agents)

</template>
<template #zh>

- [列出 Agent 会话](https://ragflow.io/docs/dev/python_api_reference#list-agent-sessions)
- [列出 Agent](https://ragflow.io/docs/dev/python_api_reference#list-agents)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.14.1

</template>
<template #zh>

## v0.14.1

</template>
</BiRow>

<BiRow>
<template #en>

Released on November 29, 2024.

</template>
<template #zh>

发布于 2024 年 11 月 29 日。

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

Adds [Infinity's configuration file](https://github.com/infiniflow/ragflow/blob/main/docker/infinity_conf.toml) to facilitate integration and customization of [Infinity](https://github.com/infiniflow/infinity) as a document engine. From this release onwards, updates to Infinity's configuration can be made directly within RAGFlow and will take effect immediately after restarting RAGFlow using `docker compose`. [#3715](https://github.com/infiniflow/ragflow/pull/3715)

</template>
<template #zh>

新增 [Infinity 配置文件](https://github.com/infiniflow/ragflow/blob/main/docker/infinity_conf.toml)，便于将 [Infinity](https://github.com/infiniflow/infinity) 集成为文档引擎并进行定制。自本版本起，可直接在 RAGFlow 内更新 Infinity 的配置，并会在使用 `docker compose` 重启 RAGFlow 后立即生效。[#3715](https://github.com/infiniflow/ragflow/pull/3715)

</template>
</BiRow>

<BiRow>
<template #en>

### Fixed issues

</template>
<template #zh>

### 问题修复

</template>
</BiRow>

<BiRow>
<template #en>

This release fixes the following issues:

</template>
<template #zh>

本版本修复了以下问题：

</template>
</BiRow>

<BiRow>
<template #en>

- Unable to display or edit content of a chunk after clicking it.
- A `'Not found'` error in Elasticsearch.
- Chinese text becoming garbled during parsing.
- A compatibility issue with Polars.
- A compatibility issue between Infinity and GraphRAG.

</template>
<template #zh>

- 点击分块后无法显示或编辑其内容。
- Elasticsearch 中出现 `'Not found'` 错误。
- 解析过程中中文文本出现乱码。
- 与 Polars 的兼容性问题。
- Infinity 与 GraphRAG 之间的兼容性问题。

</template>
</BiRow>

<BiRow>
<template #en>

## v0.14.0

</template>
<template #zh>

## v0.14.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on November 26, 2024.

</template>
<template #zh>

发布于 2024 年 11 月 26 日。

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

- Supports [Infinity](https://github.com/infiniflow/infinity) or Elasticsearch (default) as document engine for vector storage and full-text indexing. [#2894](https://github.com/infiniflow/ragflow/pull/2894)
- Enhances user experience by adding more variables to the Agent and implementing auto-saving.
- Adds a three-step translation agent template, inspired by [Andrew Ng's translation agent](https://github.com/andrewyng/translation-agent).
- Adds an SEO-optimized blog writing agent template.
- Provides HTTP and Python APIs for conversing with an agent.
- Supports the use of English synonyms during retrieval processes.
- Optimizes term weight calculations, reducing the retrieval time by 50%.
- Improves task executor monitoring with additional performance indicators.
- Replaces Redis with Valkey.
- Adds three new UI languages (*contributed by the community*): Indonesian, Spanish, and Vietnamese.

</template>
<template #zh>

- 支持将 [Infinity](https://github.com/infiniflow/infinity) 或 Elasticsearch（默认）用作文档引擎，进行向量存储与全文索引。[#2894](https://github.com/infiniflow/ragflow/pull/2894)
- 为 Agent 增加更多变量并实现自动保存，提升使用体验。
- 新增三步翻译 Agent 模板，灵感来自[吴恩达的翻译 Agent](https://github.com/andrewyng/translation-agent)。
- 新增 SEO 优化的博客写作 Agent 模板。
- 提供与 Agent 对话的 HTTP 与 Python API。
- 检索过程支持使用英文同义词。
- 优化词项权重计算，检索耗时缩短 50%。
- 增加更多性能指标，改进任务执行器监控。
- 以 Valkey 替换 Redis。
- 新增三种界面语言（*由社区贡献*）：印尼语、西班牙语与越南语。

</template>
</BiRow>

<BiRow>
<template #en>

### Compatibility changes

</template>
<template #zh>

### 兼容性变更

</template>
</BiRow>

<BiRow>
<template #en>

From this release onwards, **service_config.yaml.template** replaces **service_config.yaml** for configuring backend services. Upon Docker container startup, the environment variables defined in this template file are automatically populated and a **service_config.yaml** is auto-generated from it. [#3341](https://github.com/infiniflow/ragflow/pull/3341)

</template>
<template #zh>

自本版本起，**service_config.yaml.template** 取代 **service_config.yaml** 用于配置后端服务。Docker 容器启动时，模板文件中定义的环境变量会被自动填充，并据此自动生成 **service_config.yaml**。[#3341](https://github.com/infiniflow/ragflow/pull/3341)

</template>
</BiRow>

<BiRow>
<template #en>

This approach eliminates the need to manually update **service_config.yaml** after making changes to **.env**, facilitating dynamic environment configurations.

</template>
<template #zh>

这种方式免去了修改 **.env** 后手动更新 **service_config.yaml** 的步骤，便于实现动态环境配置。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
Ensure that you [upgrade **both** your code **and** Docker image to this release](https://ragflow.io/docs/administrator/upgrade_ragflow.mdx#upgrade-ragflow-to-given-release) before trying this new approach.
:::

</template>
<template #zh>

:::danger 重要
在尝试这一新方式之前，请确保已[将**代码**与 Docker 镜像**同时**升级到本版本](https://ragflow.io/docs/administrator/upgrade_ragflow.mdx#upgrade-ragflow-to-given-release)。
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

#### HTTP APIs

</template>
<template #zh>

#### HTTP API

</template>
</BiRow>

<BiRow>
<template #en>

- [Create session with agent](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [Converse with agent](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)

</template>
<template #zh>

- [与 Agent 创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [与 Agent 对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)

</template>
</BiRow>

<BiRow>
<template #en>

#### Python APIs

</template>
<template #zh>

#### Python API

</template>
</BiRow>

<BiRow>
<template #en>

- [Create session with agent](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)
- [Converse with agent](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)

</template>
<template #zh>

- [与 Agent 创建会话](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)
- [与 Agent 对话](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Configurations](https://ragflow.io/docs/dev/configurations)
- [Manage team members](https://ragflow.io/docs/guides/team/team_management/index)
- [Run health check on RAGFlow's dependencies](https://ragflow.io/docs/dev/run_health_check)

</template>
<template #zh>

- [配置](https://ragflow.io/docs/dev/configurations)
- [管理团队成员](https://ragflow.io/docs/guides/team/team_management/index)
- [对 RAGFlow 的依赖运行健康检查](https://ragflow.io/docs/dev/run_health_check)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.13.0

</template>
<template #zh>

## v0.13.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on October 31, 2024.

</template>
<template #zh>

发布于 2024 年 10 月 31 日。

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

- Adds the team management functionality for all users.
- Updates the Agent UI to improve usability.
- Adds support for Markdown chunking in the **General** chunking method.
- Introduces an **invoke** tool within the Agent UI.
- Integrates support for Dify's knowledge base API.
- Adds support for GLM4-9B and Yi-Lightning models.
- Introduces HTTP and Python APIs for dataset management, file management within dataset, and chat assistant management.

</template>
<template #zh>

- 为所有用户增加团队管理功能。
- 更新 Agent 界面以提升易用性。
- **General** 分块方法新增对 Markdown 分块的支持。
- 在 Agent 界面中引入 **invoke** 工具。
- 集成对 Dify 知识库 API 的支持。
- 新增对 GLM4-9B 与 Yi-Lightning 模型的支持。
- 引入用于数据集管理、数据集内文件管理与对话助手管理的 HTTP 和 Python API。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
To download RAGFlow's Python SDK:

```bash
pip install ragflow-sdk==0.13.0
```
:::

</template>
<template #zh>

:::tip 注意
如需下载 RAGFlow 的 Python SDK：

```bash
pip install ragflow-sdk==0.13.0
```
:::

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Acquire a RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API Reference](https://ragflow.io/docs/references/http_api_reference)
- [Python API Reference](https://ragflow.io/docs/references/python_api_reference)

</template>
<template #zh>

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.12.0

</template>
<template #zh>

## v0.12.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on September 30, 2024.

</template>
<template #zh>

发布于 2024 年 9 月 30 日。

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

- Offers slim editions of RAGFlow's Docker images, which do not include built-in BGE/BCE embedding or reranking models.
- Improves the results of multi-round dialogues.
- Enables users to remove added LLM vendors.
- Adds support for **OpenTTS** and **SparkTTS** models.
- Implements an **Excel to HTML** toggle in the **General** chunking method, allowing users to parse a spreadsheet into either HTML tables or key-value pairs by row.
- Adds agent tools **YahooFinance** and **Jin10**.
- Adds an investment advisor agent template.

</template>
<template #zh>

- 提供 RAGFlow Docker 镜像的 slim 版，不含内置 BGE/BCE 嵌入与重排序模型。
- 改进多轮对话的效果。
- 允许用户移除已添加的 LLM 供应商。
- 新增对 **OpenTTS** 与 **SparkTTS** 模型的支持。
- 在 **General** 分块方法中实现 **Excel to HTML** 开关，用户可将电子表格解析为 HTML 表格或按行组织的键值对。
- 新增 Agent 工具 **YahooFinance** 与 **Jin10**。
- 新增投资顾问 Agent 模板。

</template>
</BiRow>

<BiRow>
<template #en>

### Compatibility changes

</template>
<template #zh>

### 兼容性变更

</template>
</BiRow>

<BiRow>
<template #en>

From this release onwards, RAGFlow offers slim editions of its Docker images to improve the experience for users with limited Internet access. A slim edition of RAGFlow's Docker image does not include built-in BGE/BCE embedding models and has a size of about 1GB; a full edition of RAGFlow is approximately 9GB and includes two built-in embedding models.

</template>
<template #zh>

自本版本起，RAGFlow 提供 Docker 镜像的 slim 版，以改善网络访问受限用户的使用体验。RAGFlow Docker 镜像的 slim 版不含内置 BGE/BCE 嵌入模型，体积约 1GB；完整版约 9GB，包含两个内置嵌入模型。

</template>
</BiRow>

<BiRow>
<template #en>

The default Docker image edition is `nightly-slim`. The following list clarifies the differences between various editions:

</template>
<template #zh>

默认 Docker 镜像版本为 `nightly-slim`。以下列表说明了各版本之间的差异：

</template>
</BiRow>

<BiRow>
<template #en>

- `nightly-slim`: The slim edition of the most recent tested Docker image.
- `v0.12.0-slim`: The slim edition of the most recent **officially released** Docker image.
- `nightly`: The full edition of the most recent tested Docker image.
- `v0.12.0`: The full edition of the most recent **officially released** Docker image.

</template>
<template #zh>

- `nightly-slim`：最近一次测试通过的 Docker 镜像的 slim 版。
- `v0.12.0-slim`：最近一个**正式发布**的 Docker 镜像的 slim 版。
- `nightly`：最近一次测试通过的 Docker 镜像的完整版。
- `v0.12.0`：最近一个**正式发布**的 Docker 镜像的完整版。

</template>
</BiRow>

<BiRow>
<template #en>

See [Upgrade RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow) for instructions on upgrading.

</template>
<template #zh>

升级步骤参见[升级 RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)。

</template>
</BiRow>

<BiRow>
<template #en>

### Documentation

</template>
<template #zh>

### 文档

</template>
</BiRow>

<BiRow>
<template #en>

#### Added documents

</template>
<template #zh>

#### 新增文档

</template>
</BiRow>

<BiRow>
<template #en>

- [Upgrade RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)

</template>
<template #zh>

- [升级 RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.11.0

</template>
<template #zh>

## v0.11.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on September 14, 2024.

</template>
<template #zh>

发布于 2024 年 9 月 14 日。

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

-  Introduces an AI search interface within the RAGFlow UI.
-  Supports audio output via **FishAudio** or **Tongyi Qwen TTS**.
-  Allows the use of Postgres for metadata storage, in addition to MySQL.
-  Supports object storage options with S3 or Azure Blob.
-  Supports model vendors: **Anthropic**, **Voyage AI**, and **Google Cloud**.
-  Supports the use of **Tencent Cloud ASR** for audio content recognition.
-  Adds finance-specific agent components: **WenCai**, **AkShare**, **YahooFinance**, and **TuShare**.
-  Adds a medical consultant agent template.
-  Supports running retrieval benchmarking on the following datasets:
    - [ms_marco_v1.1](https://huggingface.co/datasets/microsoft/ms_marco)
    - [trivia_qa](https://huggingface.co/datasets/mandarjoshi/trivia_qa)
    - [miracl](https://huggingface.co/datasets/miracl/miracl)

</template>
<template #zh>

-  在 RAGFlow 中引入 AI 搜索界面。
-  支持通过 **FishAudio** 或 **Tongyi Qwen TTS** 输出音频。
-  除 MySQL 外，还支持使用 Postgres 存储元数据。
-  支持 S3 或 Azure Blob 对象存储选项。
-  支持模型供应商：**Anthropic**、**Voyage AI** 与 **Google Cloud**。
-  新增金融专用 Agent 组件：**WenCai**、**AkShare**、**YahooFinance** 与 **TuShare**。
-  新增医疗顾问 Agent 模板。
-  支持在以下数据集上运行检索基准测试：
    - [ms_marco_v1.1](https://huggingface.co/datasets/microsoft/ms_marco)
    - [trivia_qa](https://huggingface.co/datasets/mandarjoshi/trivia_qa)
    - [miracl](https://huggingface.co/datasets/miracl/miracl)

</template>
</BiRow>

<BiRow>
<template #en>

## v0.10.0

</template>
<template #zh>

## v0.10.0

</template>
</BiRow>

<BiRow>
<template #en>

Released on August 26, 2024.

</template>
<template #zh>

发布于 2024 年 8 月 26 日。

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

- Introduces a text-to-SQL template in the Agent UI.
- Implements Agent APIs.
- Incorporates monitoring for the task executor.
- Introduces Agent tools **GitHub**, **DeepL**, **BaiduFanyi**, **QWeather**, and **GoogleScholar**.
- Supports chunking of EML files.
- Supports more LLMs or model services: **GPT-4o-mini**, **PerfXCloud**, **TogetherAI**, **Upstage**, **Novita AI**, **01.AI**, **SiliconFlow**, **PPIO**, **XunFei Spark**, **Jiekou.AI**, **Baidu Yiyan**, and **Tencent Hunyuan**.

</template>
<template #zh>

- 在 Agent 界面中引入 text-to-SQL 模板。
- 实现 Agent API。
- 加入对任务执行器的监控。
- 引入 Agent 工具 **GitHub**、**DeepL**、**BaiduFanyi**、**QWeather** 与 **GoogleScholar**。
- 支持 EML 文件分块。
- 支持更多 LLM 或模型服务：**GPT-4o-mini**、**PerfXCloud**、**TogetherAI**、**Upstage**、**Novita AI**、**01.AI**、**SiliconFlow**、**PPIO**、**XunFei Spark**、**Jiekou.AI**、**Baidu Yiyan** 与 **Tencent Hunyuan**。

</template>
</BiRow>
