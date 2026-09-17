# 更新日志（第 4 部分）

## v0.19.0

发布于 2025 年 5 月 26 日。

### 新特性

- [跨语言搜索](https://ragflow.io/docs/references/glossary.mdx#cross-language-search)现已在知识库与 Chat 模块中得到支持，可提升多语言环境（如中英数据集）下的搜索准确性与使用体验。
- Agent 组件：新增 Code 组件，支持 Python 与 JavaScript 脚本，使开发者能够处理动态数据处理等更复杂的任务。
- 图片显示增强：Chat 与 Search 中的图片现可直接在回答内渲染，而不再作为外部引用显示。知识库检索测试可直接检索图片，而非从图片中提取的文本。
- Claude 4 与 ChatGPT o3：开发者现可使用新发布的、最先进的 Claude 模型以及 OpenAI 最新的 ChatGPT o3 推理模型。

> 以下功能由我们的社区贡献：

- Agent 组件：支持在 Generate 组件内调用工具。感谢 [notsyncing](https://github.com/notsyncing)。
- Markdown 渲染：Markdown 文件中的图片引用可在分块后显示。感谢 [Woody-Hu](https://github.com/Woody-Hu)。
- 文档引擎支持：现可将 OpenSearch 用作 RAGFlow 的文档引擎。感谢 [pyyuhao](https://github.com/pyyuhao)。

### 文档

#### 新增文档

- [选择 PDF 解析器](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration)
- [启用 Excel2HTML]
- [Code 组件](https://ragflow.io/docs/guides/agent/agent_workflow/data_manipulation_components.md#code-component)

## v0.18.0

发布于 2025 年 4 月 23 日。

### 兼容性变更

自本版本起，内置重排序模型已被移除——它们对检索率的影响微乎其微，却会显著增加检索时间。

### 新特性

- MCP 服务器：支持通过 MCP 访问 RAGFlow 的数据集。
- DeepDoc 支持在文档版面识别时采用 VLM 模型作为处理管道，实现对 PDF 与 DOCX 文件中图片的深度分析。
- OpenAI 兼容 API：可通过 OpenAI 兼容 API 调用 Agent。
- 用户注册管控：管理员可通过环境变量开启或关闭用户注册。
- 团队协作：Agent 可与团队成员共享。
- Agent 版本控制：所有更新都会被持续记录，并可通过导出回滚到先前的版本。

![export_agent](/ragflow-images/export_agent_as_json.jpg)

### 改进

- 回答引用增强：提升生成回答中的引用准确性。
- 问答体验增强：用户现可在对话过程中手动停止流式输出。

### 文档

#### 新增文档

- [设置 PageRank](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)
- 启用 RAPTOR
- 为对话助手设置变量
- [启动 RAGFlow MCP 服务器](https://ragflow.io/docs/develop/mcp/launch_mcp_server)

## v0.17.2

发布于 2025 年 3 月 13 日。

### 兼容性变更

- 移除 **Chat configuration** 中的 **Max_tokens** 设置。
- 移除 **Generate**、**Rewrite**、**Categorize**、**Keyword** Agent 组件中的 **Max_tokens** 设置。

自本版本起，如果仍出现 RAGFlow 回答被截断的情况，请检查模型提供商的 **Max_tokens** 设置。

### 改进

- 新增 OpenAI 兼容 API。
- 新增德语用户界面。
- 加速知识图谱提取。
- 在 **Retrieval** Agent 组件中启用基于 Tavily 的网络搜索。
- 新增通义千问 QwQ 模型（OpenAI 兼容）。
- **General** 分块方法支持 CSV 文件。

### 问题修复

- 无法通过 Ollama/Xinference 添加模型，该问题由 v0.17.1 引入。

### API 变更

#### HTTP API

- [创建对话补全](https://ragflow.io/docs/references/http_api_reference.md#openai-compatible-api)

#### Python API

- [创建对话补全](https://ragflow.io/docs/references/python_api_reference.md#openai-compatible-api)

## v0.17.1

发布于 2025 年 3 月 11 日。

### 改进

- 提升英文分词质量。
- 改进 Markdown 文档解析中的表格提取逻辑。
- 更新 SiliconFlow 的模型列表。
- 支持 XLS（Excel 97-2003）文件解析，并改进了相应的错误处理。
- 支持 Huggingface 重排序模型。
- 在对话助手与 **Rewrite** Agent 组件中启用相对时间表达（"now"、"yesterday"、"last week"、"next year" 等）。

### 问题修复

- 知识图谱重复提取的问题。
- API 调用相关问题。
- **PDF parser**（又称 **Document parser**）下拉菜单中的选项缺失。
- 一个 Tavily 网络搜索问题。
- 无法在 AI 对话中预览图表或图片。

### 文档

#### 新增文档

- [使用标签集](https://ragflow.io/docs/guides/dataset/configuration.md#basic-information)

## v0.17.0

发布于 2025 年 3 月 3 日。

### 新特性

- AI 对话：实现面向 Agentic 推理的 Deep research。要启用该功能，请在对话助手的对话配置中打开 **Prompt engine** 标签页下的 **Reasoning** 开关。
- AI 对话：利用基于 Tavily 的网络搜索增强 Agentic 推理的上下文。要启用该功能，请在对话助手对话配置的 **Assistant settings** 标签页下填入正确的 Tavily API key。
- AI 对话：支持不指定数据集直接开始对话。
- AI 对话：除 PDF 文件外，HTML 文件也可预览与引用。
- 数据集：在数据集配置中新增 **PDF parser**（又称 **Document parser**）下拉菜单。其中包括耗时较长的 DeepDoc 模型选项，跳过 DLA（文档版面分析）、OCR（光学字符识别）与 TSR（表格结构识别）任务、速度快得多的 **naive** 选项（纯文本），以及若干目前处于*实验性*阶段的大模型选项。参见[此处](https://ragflow.io/docs/guides/dataset/configuration.md#document-parsing-configuration)。
- Agent 组件：在 **Generate** 或 **Template** 组件的系统提示词输入框中，可使用 **(x)** 或正斜杠 `/` 插入可用的键（变量）。
- 对象存储：支持将阿里云 OSS（对象存储服务）用作文件存储选项。
- 模型：更新通义千问（Qwen）支持的模型列表并新增 DeepSeek 专用模型；新增 ModelScope 作为模型提供商。
- API：支持通过 API 更新文档元数据。

下图展示了 RAGFlow Deep research 的工作流：

![Image](/ragflow-images/f65d4759-4f09-4d9d-9549-c0e1fe907525.png)

以下是一段集成了 Deep research 的对话截图：

![Image](/ragflow-images/165b88ff-1f5d-4fb8-90e2-c836b25e32e9.png)

### API 变更

#### HTTP API

为[更新文档](https://ragflow.io/docs/references/http_api_reference.md#update-document)方法新增请求体参数 `"meta_fields"`。

#### Python API

为[更新文档](https://ragflow.io/docs/references/python_api_reference.md#update-document)方法新增键选项 `"meta_fields"`。

### 文档

#### 新增文档

- [运行检索测试](https://ragflow.io/docs/guides/dataset/retrieval_testing)

## v0.16.0

发布于 2025 年 2 月 6 日。

### 新特性

- 支持 DeepSeek R1 与 DeepSeek V3。
- GraphRAG 重构：知识图谱在整个数据集上动态构建，而非基于单个文件，并在新上传的文件开始解析时自动更新。参见[此处](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#graph)。
- 新增 **Iteration** Agent 组件与 **Research report generator** Agent 模板。参见[此处](https://ragflow.io/docs/guides/agent/agent_workflow/flow_components.md#iteration)。
- 新增界面语言：葡萄牙语。
- 支持为数据集中的特定文件设置元数据，以增强 AI 对话。参见[此处](https://ragflow.io/docs/guides/dataset/metadata_management)。
- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.6.0.dev3。
- 支持 DeepDoc 的 GPU 加速（参见 [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml)）。
- 支持创建并引用 **Tag** 数据集，这是弥合查询与回答之间语义鸿沟的关键里程碑。

:::danger 重要
**Tag 数据集**功能在 [Infinity](https://github.com/infiniflow/infinity) 文档引擎上*不可用*。
:::

### 文档

#### 新增文档

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

## v0.15.1

发布于 2024 年 12 月 25 日。

### 升级

- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.5.2。
- 增强文档解析状态的日志展示。

### 问题修复

本版本修复了以下问题：

- [Infinity](https://github.com/infiniflow/infinity) 返回 `SCORE not found` 与 `position_int` 错误的问题。
- 一旦更改某个数据集的嵌入模型，其他数据集的嵌入模型便无法再更改。
- 嵌入模型被反复加载，导致问答与 AI 搜索响应缓慢。
- 无法使用 RAPTOR 解析文档。
- 使用 **Table** 解析方法会导致信息丢失。
- 其他若干 API 问题。

### API 变更

#### HTTP API

为以下 API 新增可选参数 `"user_id"`：

- [与对话助手创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-chat-assistant)
- [更新对话助手的会话](https://ragflow.io/docs/dev/http_api_reference#update-chat-assistants-session)
- [列出对话助手的会话](https://ragflow.io/docs/dev/http_api_reference#list-chat-assistants-sessions)
- [与 Agent 创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [与对话助手对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-chat-assistant)
- [与 Agent 对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)
- [列出 Agent 会话](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)

## v0.15.0

发布于 2024 年 12 月 18 日。

### 新特性

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

### 改进

- 升级 DeepDoc 中的文档版面分析模型。
- 显著提升以 [Infinity](https://github.com/infiniflow/infinity) 作为文档引擎时的检索性能。

### API 变更

#### HTTP API

- [列出 Agent 会话](https://ragflow.io/docs/dev/http_api_reference#list-agent-sessions)
- [列出 Agent](https://ragflow.io/docs/dev/http_api_reference#list-agents)

#### Python API

- [列出 Agent 会话](https://ragflow.io/docs/dev/python_api_reference#list-agent-sessions)
- [列出 Agent](https://ragflow.io/docs/dev/python_api_reference#list-agents)

## v0.14.1

发布于 2024 年 11 月 29 日。

### 改进

新增 [Infinity 配置文件](https://github.com/infiniflow/ragflow/blob/main/docker/infinity_conf.toml)，便于将 [Infinity](https://github.com/infiniflow/infinity) 集成为文档引擎并进行定制。自本版本起，可直接在 RAGFlow 内更新 Infinity 的配置，并会在使用 `docker compose` 重启 RAGFlow 后立即生效。[#3715](https://github.com/infiniflow/ragflow/pull/3715)

### 问题修复

本版本修复了以下问题：

- 点击分块后无法显示或编辑其内容。
- Elasticsearch 中出现 `'Not found'` 错误。
- 解析过程中中文文本出现乱码。
- 与 Polars 的兼容性问题。
- Infinity 与 GraphRAG 之间的兼容性问题。

## v0.14.0

发布于 2024 年 11 月 26 日。

### 新特性

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

### 兼容性变更

自本版本起，**service_config.yaml.template** 取代 **service_config.yaml** 用于配置后端服务。Docker 容器启动时，模板文件中定义的环境变量会被自动填充，并据此自动生成 **service_config.yaml**。[#3341](https://github.com/infiniflow/ragflow/pull/3341)

这种方式免去了修改 **.env** 后手动更新 **service_config.yaml** 的步骤，便于实现动态环境配置。

:::danger 重要
在尝试这一新方式之前，请确保已[将**代码**与 Docker 镜像**同时**升级到本版本](https://ragflow.io/docs/administrator/upgrade_ragflow.mdx#upgrade-ragflow-to-given-release)。
:::

### API 变更

#### HTTP API

- [与 Agent 创建会话](https://ragflow.io/docs/dev/http_api_reference#create-session-with-agent)
- [与 Agent 对话](https://ragflow.io/docs/dev/http_api_reference#converse-with-agent)

#### Python API

- [与 Agent 创建会话](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)
- [与 Agent 对话](https://ragflow.io/docs/dev/python_api_reference#create-session-with-agent)

### 文档

#### 新增文档

- [配置](https://ragflow.io/docs/dev/configurations)
- [管理团队成员](https://ragflow.io/docs/guides/team/team_management/index)
- [对 RAGFlow 的依赖运行健康检查](https://ragflow.io/docs/dev/run_health_check)

## v0.13.0

发布于 2024 年 10 月 31 日。

### 新特性

- 为所有用户增加团队管理功能。
- 更新 Agent 界面以提升易用性。
- **General** 分块方法新增对 Markdown 分块的支持。
- 在 Agent 界面中引入 **invoke** 工具。
- 集成对 Dify 知识库 API 的支持。
- 新增对 GLM4-9B 与 Yi-Lightning 模型的支持。
- 引入用于数据集管理、数据集内文件管理与对话助手管理的 HTTP 和 Python API。

:::tip 注意
如需下载 RAGFlow 的 Python SDK：

```bash
pip install ragflow-sdk==0.13.0
```
:::

### 文档

#### 新增文档

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)

## v0.12.0

发布于 2024 年 9 月 30 日。

### 新特性

- 提供 RAGFlow Docker 镜像的 slim 版，不含内置 BGE/BCE 嵌入与重排序模型。
- 改进多轮对话的效果。
- 允许用户移除已添加的 LLM 供应商。
- 新增对 **OpenTTS** 与 **SparkTTS** 模型的支持。
- 在 **General** 分块方法中实现 **Excel to HTML** 开关，用户可将电子表格解析为 HTML 表格或按行组织的键值对。
- 新增 Agent 工具 **YahooFinance** 与 **Jin10**。
- 新增投资顾问 Agent 模板。

### 兼容性变更

自本版本起，RAGFlow 提供 Docker 镜像的 slim 版，以改善网络访问受限用户的使用体验。RAGFlow Docker 镜像的 slim 版不含内置 BGE/BCE 嵌入模型，体积约 1GB；完整版约 9GB，包含两个内置嵌入模型。

默认 Docker 镜像版本为 `nightly-slim`。以下列表说明了各版本之间的差异：

- `nightly-slim`：最近一次测试通过的 Docker 镜像的 slim 版。
- `v0.12.0-slim`：最近一个**正式发布**的 Docker 镜像的 slim 版。
- `nightly`：最近一次测试通过的 Docker 镜像的完整版。
- `v0.12.0`：最近一个**正式发布**的 Docker 镜像的完整版。

升级步骤参见[升级 RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)。

### 文档

#### 新增文档

- [升级 RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)

## v0.11.0

发布于 2024 年 9 月 14 日。

### 新特性

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

## v0.10.0

发布于 2024 年 8 月 26 日。

### 新特性

- 在 Agent 界面中引入 text-to-SQL 模板。
- 实现 Agent API。
- 加入对任务执行器的监控。
- 引入 Agent 工具 **GitHub**、**DeepL**、**BaiduFanyi**、**QWeather** 与 **GoogleScholar**。
- 支持 EML 文件分块。
- 支持更多 LLM 或模型服务：**GPT-4o-mini**、**PerfXCloud**、**TogetherAI**、**Upstage**、**Novita AI**、**01.AI**、**SiliconFlow**、**PPIO**、**XunFei Spark**、**Jiekou.AI**、**Baidu Yiyan** 与 **Tencent Hunyuan**。
