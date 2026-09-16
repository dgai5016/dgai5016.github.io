# 更新日志（第 3 部分）

## v0.25.1

发布于 2026 年 4 月 29 日。

### 改进

- API 重构与统一：将 Web API 在所有端点上标准化为 RESTful 规范，统一文档创建与索引流程，同时保持向后兼容。
- 解析优化：新增 [OpenDataLoader](https://github.com/opendataloader-project/opendataloader-pdf) PDF 解析器后端。[#14097](https://github.com/infiniflow/ragflow/pull/14097)
- 为大型 PDF（&gt;50 页）引入延迟加载与分批解析，显著降低内存占用。[#14385](https://github.com/infiniflow/ragflow/pull/14385)

### 数据源

支持同步 Bitbucket、Gmail、Google Drive 与 Airtable 中的已删除文件。[#14362](https://github.com/infiniflow/ragflow/issues/14362)

### 模型支持

- DeepSeek v4

### 模型提供商

- UCloud

### 问题修复

- v0.24.0 升级到 v0.25.0 过程中出现的元数据可见性问题。
- 对话输出重复。

## v0.25.0

发布于 2026 年 4 月 21 日。

### 新特性

- Agent
  - 引入七个预置摄取管道模板。
  - Agent 应用支持发布。
  - 支持沙箱代码执行与图表生成。
  - 新增面向入门用户的数据分析 Agent 模板。
- 记忆：支持用户级记忆的存储与检索。
- 新增界面语言：阿拉伯语（实现了从右到左布局）、保加利亚语和土耳其语。
- 生态系统集成：可通过 OpenClaw 访问 RAGFlow 数据集。

### 改进

- 优化 Docx 解析，支持图片延迟加载，降低内存占用。
- 优化 Chat、Agent 与 Search 的内嵌对话页面，提升移动端兼容性。
- 底层系统与基础设施优化：
  - 将 RAGFlow 的文档引擎 Elasticsearch 升级到 9.x。
  - 由于官方 MinIO 镜像已被弃用，默认对象存储容器切换为 `pgsty/minio`。
  - 新增数据库迁移脚本；详见[此 readme](https://github.com/infiniflow/ragflow/tree/74b44e1aa3ecd6687b3aa4ef731d0187720c3cb5/tools/scripts)。

### 模型支持

- MiniMax-M2.7 系列
- Perplexity 嵌入模型（pplx-embed）
- 通义重排序模型

### 新增模型提供商

- avian.io
- ragcon.ai

### 数据源

- Seafile
- RSS
- DingTalk AI Table
- GitHub：支持同步已删除文件。

## v0.24.0

发布于 2026 年 2 月 10 日。

### 新特性

- 记忆
  - 引入记忆管理 API（HTTP 与 Python）。
  - 将记忆提取日志输出到控制台。
- 数据集
  - 支持批量元数据管理。
  - 将“ToC（Table of Contents）”更名为“PageIndex”。参见[此处](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#pageindex)。
- Agent
  - 推出类似 Chat 的 Agent 会话管理界面，保留会话与对话历史。
  - 引入多沙箱机制，支持本地 gVisor 与阿里云，并兼容主流沙箱 API（可在管理后台页面配置）。
- Chat
  - 新增“Thinking”模式，并移除先前的“Reasoning”配置项。
  - 优化深度研究场景的检索策略，提升召回准确性。
- 管理后台
  - 支持多个管理员账号。
- 模型配置中心
  - 新增针对新模型的连接测试。

### MySQL 替代方案

- 支持以 OceanBase 作为 MySQL 的替代方案。

### 模型支持

- Kimi 2.5
- Stepfun 3
- doubao-embedding-vision
- PaddleOCR-VL

### 数据源

- Zendesk
- Bitbucket

### API 变更

#### HTTP API

[记忆管理 API](https://ragflow.io/docs/references/http_api_reference.md#memory-management)

#### Python API

[记忆管理 API](https://ragflow.io/docs/references/python_api_reference.md#memory-management)

## v0.23.1

发布于 2025 年 12 月 31 日。

### 改进

- 记忆：提升选中全部记忆类型时记忆提取的稳定性。
- RAG：改进图片与表格的上下文窗口提取策略。

### 问题修复

- 记忆：
  - 存在空记忆对象时 RAGFlow 服务器无法启动。
  - 无法删除新建的空记忆。
- RAG：此前不支持 MDX 文件解析。

### 数据源

- GitHub
- Gitlab
- Asana
- IMAP

## v0.23.0

发布于 2025 年 12 月 27 日。

### 新特性

- 记忆
  - 实现用于管理记忆的 **Memory** 界面。
  - 支持通过 **Retrieval** 或 **Message** 组件配置上下文。
- Agent
  - 通过重构底层架构提升 **Agent** 组件的性能。
  - **Agent** 组件现可输出结构化数据，供下游组件使用。
  - 支持使用 Webhook 触发 Agent 执行。
  - 支持语音输入/输出。
  - 支持为每个 **Agent** 组件配置多个 **Retrieval** 组件。
- 摄取管道
  - 支持在 **Transformer** 组件中提取目录，提升长上下文 RAG 性能。
- 数据集
  - 支持为图片与表格配置上下文窗口。
  - 引入父子分块策略。
  - 支持在文件解析时自动生成元数据。
- Chat：支持语音输入。

### 改进

- RAG：显著加速 GraphRAG 生成。
- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.6.15（向后兼容）。

### 数据源

- Google Cloud Storage
- Gmail
- Dropbox
- WebDAV
- Airtable

### 模型支持

- GPT-5.2
- GPT-5.2 Pro
- GPT-5.1
- GPT-5.1 Instant
- Claude Opus 4.5
- MiniMax M2
- GLM-4.7.
- MinerU 配置界面。
- AI Badgr（模型提供商）。

### API 变更

#### HTTP API

- [与 Agent 对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent)返回完整执行轨迹日志。
- [创建对话补全](https://ragflow.io/docs/references/http_api_reference.md#create-chat-completion)支持基于元数据的过滤。
- [与对话助手对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant)支持基于元数据的过滤。

## v0.22.1

发布于 2025 年 11 月 19 日。

### 改进

- Agent：
  - 支持将 Agent 输出导出为 Word 或 Markdown 格式。
  - 新增 **List operations** 组件。
  - 新增 **Variable aggregator** 组件。
- 数据源：
  - 支持兼容 S3 协议的数据源，例如 MinIO。
  - 新增与 JIRA 的数据同步。
- 继续重新设计 **Profile** 页面布局。
- 将 Flask Web 框架从同步升级为异步，提高并发能力，避免请求上游 LLM 服务时出现阻塞问题。

### 问题修复

- 一个 v0.22.0 的问题：在 `-full` 版 RAGFlow 中，若数据集已包含使用内置模型解析的文件，用户无法解析上传的文件或切换嵌入模型。
- Word 文档中的图片出现拼接问题。[#11310](https://github.com/infiniflow/ragflow/pull/11310)
- 对话历史中图文混排内容未能正确显示。

### 新增支持的模型

- Gemini 3 Pro Preview

## v0.22.0

发布于 2025 年 11 月 12 日。

### 破坏性变更

:::danger 重要
自本版本起，我们仅发布 slim 版（不含嵌入模型）Docker 镜像，且不再在镜像标签后附加 `-slim` 后缀。
:::

### 新特性

- 数据集：
  - 支持从五个在线数据源（AWS S3、Google Drive、Notion、Confluence 与 Discord）同步数据。
  - RAPTOR 可在整个数据集范围构建，也可基于单个文档构建。
- 摄取管道：**Parser** 组件支持 [Docling 文档解析](https://github.com/docling-project/docling)。
- 推出全新的管理 Web UI 仪表盘，支持以图形化方式管理用户并监控服务状态。
- Agent：
  - 支持结构化输出。
  - **Retrieval** 组件支持元数据过滤。
  - 引入 **Variable aggregator** 组件，具备数据操作与会话变量定义能力。

### 改进

- Agent：支持在 **Await Response** 组件中可视化前序组件的输出。
- 全面改版模型提供商页面。
- 将 RAGFlow 的文档引擎 Infinity 升级到 v0.6.5。

### 新增模型

- Kimi-K2-Thinking

### 新增 Agent 模板

- Interactive Agent：引入实时用户反馈，动态优化 Agent 输出。

## v0.21.1

发布于 2025 年 10 月 23 日。

### 新特性

- 实验性功能：新增使用 MinerU 解析 PDF 文档的支持。参见[此处](https://ragflow.io/docs/faq.mdx#how-to-use-mineru-to-parse-pdf-documents)。

### 改进

- 优化数据集页面与个人中心页面的 UI/UX。
- 将 RAGFlow 的文档引擎 [Infinity](https://github.com/infiniflow/infinity) 升级到 v0.6.1。

### 问题修复

- 一个视频解析问题。

## v0.21.0

发布于 2025 年 10 月 15 日。

### 新特性

- 可编排摄取管道：支持自定义数据摄取与清洗工作流，用户可灵活设计数据流，也可直接在画布上套用官方数据流模板。
- GraphRAG 与 RAPTOR 写入流程优化：以手动批量构建取代自动增量构建，显著降低构建开销。
- 长上下文 RAG：自动生成文档级目录（TOC）结构，缓解因分块不准确或过度分块造成的上下文丢失，大幅提升检索质量。该功能现已通过 TOC 提取模板提供。参见[此处](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#pageindex)。
- 视频文件解析：新增视频文件解析支持，扩展系统的多模态数据处理能力。
- Admin CLI：推出全新的系统管理命令行工具，用户可通过命令行管理与监控 RAGFlow 的服务状态。

### 改进

- 重新设计 RAGFlow 的登录与注册页面。
- 将 RAGFlow 的文档引擎 Infinity 升级到 v0.6.0。

### 新增支持的模型

- 通义千问 Qwen 3 系列
- Claude Sonnet 4.5
- Meituan LongCat-Flash-Thinking

### 新增 Agent 模板

- Company Research Report Deep Dive Agent：专为金融机构设计，帮助分析师快速整理信息、生成研究报告并做出投资决策。
- Orchestratable Ingestion Pipeline Template：用户可在画布上套用该模板，快速建立标准化的数据摄取与清洗流程。

## v0.20.5

发布于 2025 年 9 月 10 日。

### 改进

- Agent：
  - Agent 性能优化：提升简单任务的规划与反思速度；针对可并行场景优化并发工具调用，显著缩短整体响应时间。
  - **System prompt** 区域提供四个框架级提示词块，支持在框架层面自定义并覆盖提示词，提升灵活性与可控性。参见[此处](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component.md#prompt-configuration)。
  - **Execute SQL** 组件增强：将原变量引用组件替换为文本输入框，用户可编写自由格式的 SQL 查询并引用变量。参见[此处](https://ragflow.io/docs/guides/agent/agent_workflow/tool_components.md#execute-sql)。
- Chat：重新启用 **Reasoning** 与 **Cross-language search**。

### 新增支持的模型

- Meituan LongCat
- Kimi：kimi-k2-turbo-preview 与 kimi-k2-0905-preview
- Qwen：qwen3-max-preview
- SiliconFlow：DeepSeek V3.1

### 问题修复

- 数据集：已删除的文件仍可被检索。
- Chat：无法与 Ollama 模型对话。
- Agent：
  - **Cite** 开关失效。
  - 任务模式下的 Agent 仍需对话才能触发。
  - 多轮对话中出现重复回答。
  - 并行执行结果被重复总结。

### API 变更

#### HTTP API

- 为[检索分块](https://ragflow.io/docs/references/http_api_reference.md#retrieve-chunks)方法新增请求体参数 `"metadata_condition"`，可在检索时基于元数据过滤分块。[#9877](https://github.com/infiniflow/ragflow/pull/9877)

#### Python API

- 为[检索分块](https://ragflow.io/docs/references/python_api_reference.md#retrieve-chunks)方法新增参数 `metadata_condition`，可在检索时基于元数据过滤分块。[#9877](https://github.com/infiniflow/ragflow/pull/9877)

## v0.20.4

发布于 2025 年 8 月 27 日。

### 改进

- Agent 组件：完成 Agent 组件的中文本地化。
- 引入 `ENABLE_TIMEOUT_ASSERTION` 环境变量，用于开启或关闭文件解析任务的超时断言。
- 数据集：
  - 改进 Markdown 文件解析，支持 AST，避免非预期的分块。
  - 增强 HTML 解析，支持基于 bs4 的 HTML 标签遍历。

### 新增支持的模型

ZHIPU GLM-4.5

### 新增 Agent 模板

Ecommerce Customer Service Workflow：该模板用于处理基于内部数据集的产品功能咨询与多产品对比问题，并用于管理安装预约。

### 问题修复

- 数据集：
  - 无法与团队共享资源。
  - 对上传文件的数量与大小限制不当。
- Chat：
  - 无法预览回答中引用的文件。
  - 上传文件后无法发送消息。
- 一个 OAuth2 认证失败问题。
- 数据集内多条件元数据搜索存在逻辑错误。
- 多轮对话中引用无限增加。

## v0.20.3

发布于 2025 年 8 月 20 日。

### 改进

- 全面改版 **Datasets**、**Chat** 与 **Search** 页面的用户界面。
- Search 与 Chat：引入文档级元数据过滤，支持在对话或搜索时自动或手动过滤。
- Search：支持创建适配各类业务场景的搜索应用
- Chat：支持在单个 **Chat** 页面上对比最多三组对话模型设置的回答表现。
- Agent：
  - 在 **Agent** 组件中实现引用开关，可开启或关闭引用。
  - 引入拖拽方式创建组件。
- 文档：修正 API 参考中的不准确之处。

### 新增 Agent 模板

- Report Agent：用于内部问答场景生成总结报告的模板，支持表格与公式的显示。  [#9427](https://github.com/infiniflow/ragflow/pull/9427)

### 问题修复

- v0.20.0 引入的超时机制导致 GraphRAG 等任务停滞。
- 对话中缺失 **Agent** 组件预定义的开场白。
- 提示词编辑器中的自动换行问题。
- PyPDF 引发的内存泄漏问题。[#9469](https://github.com/infiniflow/ragflow/pull/9469)

### API 变更

#### 已废弃

[与 Agent 创建会话](https://ragflow.io/docs/references/http_api_reference.md#create-session-with-agent)

## v0.20.1

发布于 2025 年 8 月 8 日。

### 新特性

- **Retrieval** 组件现支持通过变量动态指定数据集名称。
- 用户界面新增法语选项。

### 新增支持的模型

- GPT-5
- Claude 4.1

### 新增 Agent 模板（工作流与 Agentic 两类）

- Text-to-SQL data expert Workflow：让非技术团队（如运营、产品）能够独立查询业务数据。
- Choose Your Knowledge Base Workflow：让用户在对话中选择要查询的数据集。[#9325](https://github.com/infiniflow/ragflow/pull/9325)
- Choose Your Knowledge Base Agent：以更长的推理时间换取更高质量的回答，适合复杂查询。[#9325](https://github.com/infiniflow/ragflow/pull/9325)

### 问题修复

- **Agent** 组件无法调用通过 vLLM 安装的模型。
- Agent 无法与团队共享。
- 将 Agent 嵌入网页的功能运行不正常。

## v0.20.0

发布于 2025 年 8 月 4 日。

### 兼容性变更

自 v0.20.0 起，Agent 不再兼容更早版本，升级后必须重建此前版本的全部既有 Agent。

### 新特性

- 统一编排 Agent 与工作流。
- 对 Agent 进行全面重构，大幅提升其能力与易用性，支持 Multi-Agent 配置、规划与反思以及可视化功能。
- 全面实现 MCP 功能：支持导入 MCP 服务器、Agent 作为 MCP 客户端运行，以及 RAGFlow 自身作为 MCP 服务器运行。
- 支持查看 Agent 的运行时日志。
- 可通过管理面板查看与 Agent 的对话历史。
- 集成更稳健的新版 Infinity，在以 Infinity 为底层文档引擎时提供自动打标功能。
- 新增支持文件引用信息的 OpenAI 兼容 API。
- 支持新模型，包括 Kimi K2、Grok 4 与 Voyage 嵌入模型。
- RAGFlow 代码库现已在 Gitee 提供镜像。
- 引入新的模型提供商 Gitee AI。

### 新增 Agent 模板

- Multi-Agent based Deep research：由 Lead Agent 带领多个 Subagent 协作的 Agent 团队，有别于传统的工作流编排。
- 基于内部数据集的智能问答机器人，面向客服与培训场景。
- 简历分析模板，RAGFlow 团队用它来筛选、分析并记录候选人信息。
- 博客生成工作流，将原始想法转化为 SEO 友好的博客内容。
- 智能客服工作流。
- 用户反馈分析模板，通过语义分析将用户反馈分派给相应团队。
- Trip planner：使用网络搜索与地图 MCP 服务器辅助制定旅行计划。
- Photo text translator：翻译上传照片中的内容。
- 信息搜索助手，同时从内部数据集与网络检索答案。

## v0.19.1

发布于 2025 年 6 月 23 日。

### 问题修复

- 高并发请求时的内存泄漏问题。
- 启用 GraphRAG 实体消解时大文件解析卡死。[#8223](https://github.com/infiniflow/ragflow/pull/8223)
- 单机模式下使用沙箱时出现上下文错误。[#8340](https://github.com/infiniflow/ragflow/pull/8340)
- Ollama 引发的 CPU 占用过高问题。[#8216](https://github.com/infiniflow/ragflow/pull/8216)
- Code 组件的一个缺陷。[#7949](https://github.com/infiniflow/ragflow/pull/7949)
- 通过 API 创建数据集时，新增对经 Ollama 或 VLLM 安装的模型的支持。[#8069](https://github.com/infiniflow/ragflow/pull/8069)
- 为 S3 存储桶访问启用基于角色的认证。[#8149](https://github.com/infiniflow/ragflow/pull/8149)

### 新增支持的模型

- Qwen 3 Embedding。[#8184](https://github.com/infiniflow/ragflow/pull/8184)
- Voyage Multimodal 3。[#7987](https://github.com/infiniflow/ragflow/pull/7987)
