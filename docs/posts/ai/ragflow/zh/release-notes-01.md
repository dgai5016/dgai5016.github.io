# 更新日志（第 1 部分）

最新各版本的关键特性、改进与问题修复。

## v0.27.2

发布于 2026 年 9 月 10 日。

### 新特性
- Agentic RAG：重构 Agentic RAG 检索框架，显著提升推理速度与基准测试成绩。([#19046](https://github.com/infiniflow/ragflow/pull/19046), [#19112](https://github.com/infiniflow/ragflow/pull/19112), [#19172](https://github.com/infiniflow/ragflow/pull/19172), [#19209](https://github.com/infiniflow/ragflow/pull/19209), [#19424](https://github.com/infiniflow/ragflow/pull/19424), [#19459](https://github.com/infiniflow/ragflow/pull/19459))
- 知识编译运行时设置 ([#19254](https://github.com/infiniflow/ragflow/pull/19254))
- 对知识编译管道强制实行速率限制 ([#19156](https://github.com/infiniflow/ragflow/pull/19156))
- 知识图谱显示总节点数与当前节点数 ([#19142](https://github.com/infiniflow/ragflow/pull/19142),[#19095](https://github.com/infiniflow/ragflow/pull/19095), [#19114](https://github.com/infiniflow/ragflow/pull/19114))
- 图搜索中在实体名上按 Enter 时高亮该节点 ([#19320](https://github.com/infiniflow/ragflow/pull/19320))
- 新增 Sitemap 数据源，用于基于 sitemap.xml 的网页摄取 ([#19344](https://github.com/infiniflow/ragflow/pull/19344))
- WebDAV 连接器支持自定义 CA 证书 ([#16901](https://github.com/infiniflow/ragflow/pull/16901))
- 支持 MonkeyOCRv2 解析 ([#18887](https://github.com/infiniflow/ragflow/pull/18887))
- 支持自托管部署 PaddleOCR-VL ([#19011](https://github.com/infiniflow/ragflow/pull/19011))
- 为 Agent 新增 Sofya 搜索工具 ([#19323](https://github.com/infiniflow/ragflow/pull/19323))
- EPUB 文档预览 ([#19242](https://github.com/infiniflow/ragflow/pull/19242))
- Excel 引用来源可在文档预览中定位 ([#18853](https://github.com/infiniflow/ragflow/pull/18853))

### 模型支持
- 新增 Hubris 模型提供商 ([#19341](https://github.com/infiniflow/ragflow/pull/19341))
- 新增 llmman 模型提供商 ([#19030](https://github.com/infiniflow/ragflow/pull/19030))

### 改进
- 新增 RERANK_TOKEN_LIMIT_MODE 配置 ([#19404](https://github.com/infiniflow/ragflow/pull/19404))
- 检索测试与搜索中新增高亮 ([#18981](https://github.com/infiniflow/ragflow/pull/18981))
- 相似度阈值以百分比显示 ([#18974](https://github.com/infiniflow/ragflow/pull/18974))

### UI/UX
- 补全土耳其语翻译 ([#19009](https://github.com/infiniflow/ragflow/pull/19009))
- 团队设置表格中的搜索匹配高亮 ([#15985](https://github.com/infiniflow/ragflow/pull/15985))

### 问题修复
- 修复对话中上传的图片被视觉模型忽略的问题 ([#18884](https://github.com/infiniflow/ragflow/pull/18884))
- 修复 CSV/TXT 预览与文档解码中的非 UTF-8 编码问题 ([#19222](https://github.com/infiniflow/ragflow/pull/19222), [#19253](https://github.com/infiniflow/ragflow/pull/19253))

## v0.27.1

发布于 2026 年 8 月 28 日。

### 新特性
- 新增用于数据源的 Azure DevOps 连接器 ([#18715](https://github.com/infiniflow/ragflow/pull/18715))
- 新增用于对话与 Agent 的 You.com 网页搜索提供商 ([#18478](https://github.com/infiniflow/ragflow/pull/18478))
- 新增用于对话的 Serply 网页搜索提供商 ([#18475](https://github.com/infiniflow/ragflow/pull/18475))

### 模型支持
- 新增 Synthorai 模型提供商 ([#18830](https://github.com/infiniflow/ragflow/pull/18830))
- 补充缺失的 DeepSeek 模型 ([#18678](https://github.com/infiniflow/ragflow/pull/18678))
- 支持 AWS Bedrock API key 认证 ([#18301](https://github.com/infiniflow/ragflow/pull/18301))

### 改进
- 检索 API 公开 rerank_candidates_count、knn top_k 与 num_candidates ([#18768](https://github.com/infiniflow/ragflow/pull/18768), [#18737](https://github.com/infiniflow/ragflow/pull/18737))
- 元数据过滤器下推到元数据索引，加快检索 ([#18219](https://github.com/infiniflow/ragflow/pull/18219))
- 对话设置表单在保存时自动滚动到错误位置 ([#18811](https://github.com/infiniflow/ragflow/pull/18811))
- 搜索页校验已删除的知识库 ([#18522](https://github.com/infiniflow/ragflow/pull/18522))

### 问题修复
- 修复对话中 PDF 解析失败的问题 ([#18860](https://github.com/infiniflow/ragflow/pull/18860))
- 修复 Wiki 编译接受 LLM 错误响应的问题 ([#18857](https://github.com/infiniflow/ragflow/pull/18857))
- 修复 MinerU 渲染稳定性、错误可见性与代码块解析问题 ([#18617](https://github.com/infiniflow/ragflow/pull/18617))
- 修复 0 分块数据集不显示、导致无法滚动加载更多数据集的问题 ([#18810](https://github.com/infiniflow/ragflow/pull/18810))
- 修复 QA Excel 解析器丢弃答案为零的行的问题 ([#17902](https://github.com/infiniflow/ragflow/pull/17902))
- 修复 naive 解析器把空上传当作缺失二进制文件的问题 ([#18826](https://github.com/infiniflow/ragflow/pull/18826))
- 修复编码检测丢弃高置信度检测结果的问题 ([#15793](https://github.com/infiniflow/ragflow/pull/15793))
- 修复启用推理的对话忽略对话系统提示词的问题 ([#18842](https://github.com/infiniflow/ragflow/pull/18842))
- 修复知识编译使用默认租户 LLM 而非管道 LLM 的问题 ([#18572](https://github.com/infiniflow/ragflow/pull/18572))
- 修复对话网络搜索服务不允许为空的问题 ([#18791](https://github.com/infiniflow/ragflow/pull/18791))
- 修复 Firefox 对话自动滚动未固定到底部的问题 ([#18736](https://github.com/infiniflow/ragflow/pull/18736))
- 修复对话自动滚动未跟随流式回答的问题 ([#18570](https://github.com/infiniflow/ragflow/pull/18570))
- 修复选择上传后解析进度不可见的问题 ([#18741](https://github.com/infiniflow/ragflow/pull/18741))
- 修复 BigQuery 连接器构造 SQL 查询错误的问题 ([#17500](https://github.com/infiniflow/ragflow/pull/17500))
- 修复 WebDAV 列表错误未向上传递、导致清理时数据丢失的问题 ([#18694](https://github.com/infiniflow/ragflow/pull/18694))
- 修复数据源同步中跨知识库文档 ID 冲突的问题 ([#18244](https://github.com/infiniflow/ragflow/pull/18244))
- 修复 GPUStack 模型发现与音频支持问题 ([#18599](https://github.com/infiniflow/ragflow/pull/18599))
- 修复 Kimi K3 温度参数问题 ([#18564](https://github.com/infiniflow/ragflow/pull/18564))
- 修复未配置图生文模型时 OCR 文本丢失的问题 ([#18012](https://github.com/infiniflow/ragflow/pull/18012))
- 修复层级式 Wiki 主题导航问题 ([#18721](https://github.com/infiniflow/ragflow/pull/18721))

## v0.27.0

发布于 2026 年 8 月 19 日。

### 新特性
- 全新的文档级与数据集级知识编译，支持 Wiki、Graph、Tree、Page Index、Mind Map、Timeline 和 To Skills ([#16777](https://github.com/infiniflow/ragflow/pull/16777), [#17546](https://github.com/infiniflow/ragflow/pull/17546), [#16797](https://github.com/infiniflow/ragflow/pull/16797), [#16749](https://github.com/infiniflow/ragflow/pull/16749), [#16899](https://github.com/infiniflow/ragflow/pull/16899), [#17996](https://github.com/infiniflow/ragflow/pull/17996))
   - 此前的 GraphRAG 与 RAPTOR 功能已弃用，不再出现在界面中。它们的替代者 Graph 与 Tree 已整合进知识编译。此前生成的 GraphRAG 与 RAPTOR 内容仍可检索。
- 全新的 Agentic RAG，回答时提供四种思考模式——Low、Medium、High 和 Ultra ([#18303](https://github.com/infiniflow/ragflow/pull/18303), [#18138](https://github.com/infiniflow/ragflow/pull/18138), [#17342](https://github.com/infiniflow/ragflow/pull/17342), [#17444](https://github.com/infiniflow/ragflow/pull/17444))

### 改进
- 全面重构模型提供商系统，模型配置与管理更轻松 ([#16604](https://github.com/infiniflow/ragflow/pull/16604))

### 模型支持
- Qwen 3.8 系列 ([#18368](https://github.com/infiniflow/ragflow/pull/18368))
- Kimi K3 ([#17106](https://github.com/infiniflow/ragflow/pull/17106))
- AIMLAPI ([#17311](https://github.com/infiniflow/ragflow/pull/17311))
- GreenPT 模型 ([#17447](https://github.com/infiniflow/ragflow/pull/17447))
- AWS Bedrock 重排序模型 ([#16960](https://github.com/infiniflow/ragflow/pull/16960))
- OpenRouter 嵌入模型 ([#17213](https://github.com/infiniflow/ragflow/pull/17213))
- FunASR/SenseVoice STT ([#16473](https://github.com/infiniflow/ragflow/pull/16473))
- Tongyi-Qianwen 的 Fun-ASR-Flash 支持 ([#16844](https://github.com/infiniflow/ragflow/pull/16844))
- Mistral OCR 文档解析器 ([#17057](https://github.com/infiniflow/ragflow/pull/17057))

### 基础设施
- 新增 GaussDB 数据库适配器 ([#17703](https://github.com/infiniflow/ragflow/pull/17703))
- 支持 SereneDB 文档存储引擎 ([#17375](https://github.com/infiniflow/ragflow/pull/17375))
- 支持 Tenki 沙箱提供商 ([#17305](https://github.com/infiniflow/ragflow/pull/17305))
- Infinity 集成升级至 0.7.3 ([#18137](https://github.com/infiniflow/ragflow/pull/18137))

### 工具
- 新增 Querit 网页搜索工具 ([#17813](https://github.com/infiniflow/ragflow/pull/17813))

### UI/UX
- Markdown 排版改进 ([#16752](https://github.com/infiniflow/ragflow/pull/16752))
- 搜索/对话筛选器 ([#16707](https://github.com/infiniflow/ragflow/pull/16707))

### 问题修复
- 修复解析大文件时服务器挂起的问题 ([#17936](https://github.com/infiniflow/ragflow/pull/17936))
- 修复文档上传卡死整个服务的问题 ([#17537](https://github.com/infiniflow/ragflow/pull/17537))
- 修复多模型对话忽略传入模型的问题 ([#18439](https://github.com/infiniflow/ragflow/pull/18439))
- 修复对话页重排序模型切换保存失败的问题 ([#18357](https://github.com/infiniflow/ragflow/pull/18357))
- 修复中文文件名 PDF 预览失败的问题 ([#18422](https://github.com/infiniflow/ragflow/pull/18422))
- 修复 CID 字体 PDF 预览问题 ([#18249](https://github.com/infiniflow/ragflow/pull/18249))
- 修复无效查询字符串导致搜索出错的问题 ([#18217](https://github.com/infiniflow/ragflow/pull/18217))
- 修复数据集/文档删除阻塞其他 API 请求的问题 ([#17800](https://github.com/infiniflow/ragflow/pull/17800))
- 修复默认分隔符被存成转义字符串而非真正换行符的问题 ([#17591](https://github.com/infiniflow/ragflow/pull/17591))
- 修复共享页面语言影响原网站的问题 ([#18043](https://github.com/infiniflow/ragflow/pull/18043))
- 修复切换会话时残留旧消息的问题 ([#18140](https://github.com/infiniflow/ragflow/pull/18140))
- 修复新会话沿用上一会话消息的问题 ([#18078](https://github.com/infiniflow/ragflow/pull/18078))
- 修复切换会话时 SSE 流中断的问题 ([#18037](https://github.com/infiniflow/ragflow/pull/18037))
- 修复 DOCX 预览中中文文本行重叠的问题 ([#17693](https://github.com/infiniflow/ragflow/pull/17693))
- 修复 SSO 用户更新管理员密码时崩溃的问题 ([#16914](https://github.com/infiniflow/ragflow/pull/16914))
- 修复 QA DOCX 表格解析器丢失单元格的问题 ([#17497](https://github.com/infiniflow/ragflow/pull/17497))
- 修复以引号开头的 Q&A CSV 字段解析问题 ([#16881](https://github.com/infiniflow/ragflow/pull/16881))
- 修复标签 CSV 解析器忽略 TAB 分隔符的问题 ([#17496](https://github.com/infiniflow/ragflow/pull/17496))
- 修复任务时间显示错误的问题 ([#18453](https://github.com/infiniflow/ragflow/pull/18453))
- 修复取消 PDF 解析时日志重复的问题 ([#18435](https://github.com/infiniflow/ragflow/pull/18435))

## v0.26.4

发布于 2026 年 7 月 7 日。

### 新特性

- NLP/分词：新增支持 16 种语言的语言感知 Snowball 词干提取器，将数据集 `language` 参数接入整个分块管道，并在前端新增荷兰语。[#14140](https://github.com/infiniflow/ragflow/pull/14140)

### 问题修复

- 解析包含 '@' 符号的 LM-Studio 模型名时，系统崩溃并抛出 `ValueError`。[#16467](https://github.com/infiniflow/ragflow/pull/16467)
- MCP 服务器崩溃：list_chats 函数期望从 `/chats` API 获得列表，实际收到的是分页字典。[#16639](https://github.com/infiniflow/ragflow/pull/16639)
- Docling 解析器静默丢弃文档中的数学公式，而不是将其提取出来。[#16645](https://github.com/infiniflow/ragflow/pull/16645)
- 系统未能把对元数据值的行内编辑持久化到后端。[#16655](https://github.com/infiniflow/ragflow/pull/16655)
- 批量把文件链接到数据集时，系统移除了已有链接。[#16587](https://github.com/infiniflow/ragflow/pull/16587)
- 筛选器无法使用中文。[#16673](https://github.com/infiniflow/ragflow/pull/16673)
- 系统未能强制标签权重必须大于零。[#16657](https://github.com/infiniflow/ragflow/pull/16657)
- Agent 提示词下拉菜单布局渲染错误。[#16653](https://github.com/infiniflow/ragflow/pull/16653)
- Laws 分块器把点号编号的交叉引用错误归类为标题。[#16626](https://github.com/infiniflow/ragflow/pull/16626)
- 编辑过程中系统未能阻止用户保存重复的 MCP 服务器名称。[#16588](https://github.com/infiniflow/ragflow/pull/16588)
- 系统允许用户导出空的 MCP 服务器选择。[#16589](https://github.com/infiniflow/ragflow/pull/16589)

## v0.26.3

发布于 2026 年 7 月 2 日。

### 新特性

- 数据源连接器：引入 Google BigQuery 数据源连接器，用于文档摄取与增量同步。[#15871](https://github.com/infiniflow/ragflow/pull/15871)
- MCP：为 RAGFlow MCP 服务器新增 `ragflow_list_datasets` 和 `ragflow_list_chats` 两个 MCP 工具。[#15384](https://github.com/infiniflow/ragflow/pull/15384)
- 文件摄取
  - 集成版面感知的 SoMark OCR 解析器，用于提取和索引表格、图形等复杂文档元素。[#16482](https://github.com/infiniflow/ragflow/pull/16482)
  - API：公开[摄取文档](https://ragflow.io/docs/references/http_api_reference.md#ingest-documents)端点，用自定义管道来处理文档。[#16395](https://github.com/infiniflow/ragflow/pull/16395)

### 改进

- 后端：为批量文档上传引入部分成功处理，单个文件失败不再导致整批被丢弃。[#16438](https://github.com/infiniflow/ragflow/pull/16438)
- UI/UX：重构全局页头，根据可用屏幕空间在桌面端完整导航栏与移动端侧边抽屉之间动态切换，解决元素重叠问题，显著改善移动端体验。[#15984](https://github.com/infiniflow/ragflow/pull/15984)

### 问题修复

- 配置 Ollama 提供商后，系统返回错误："Failed to access model(name) using this api key"。[#16519](https://github.com/infiniflow/ragflow/pull/16519)
- 删除一组用户/助手对话消息时，因索引错位误删了上一轮对话的引用。[#16436](https://github.com/infiniflow/ragflow/pull/16436)

## v0.26.2

发布于 2026 年 6 月 29 日。

### 新特性

- 对话渠道：
  - 通过扫描二维码接入 WhatsApp。[#16238](https://github.com/infiniflow/ragflow/pull/16238)
  - 通过机器人 API 凭证接入 DingTalk。[#16183](https://github.com/infiniflow/ragflow/pull/16183)
  - 通过 WebSocket 连接接入 WeCom。[#16175](https://github.com/infiniflow/ragflow/pull/16175)
- 文件解析：为 PP-OCRv6 及同类文字识别模型添加回退逻辑，并将图像解析整合进 PaddleOCR 管道。[#16150](https://github.com/infiniflow/ragflow/pull/16150)

### 改进

- 数据集
  - 为文件摄取逻辑添加边界情况检查，安全地把空文件夹链接到数据集。[#16296](https://github.com/infiniflow/ragflow/pull/16296)
  - 为 `get_flatted_meta_by_kbs()` 方法添加分页，防止文档数超过 10,000 的数据集出现 CRUD 失败。[#16095](https://github.com/infiniflow/ragflow/pull/16095)
- 对话渠道：确保终端用户的对话历史在重启后保留，同时在渠道绑定新对话时仍相互隔离。[#16274](https://github.com/infiniflow/ragflow/pull/16274)

### 国际化

- 扩大国际化覆盖范围并改进韩语界面翻译。[#16203](https://github.com/infiniflow/ragflow/pull/16203)；
- 补全对话渠道、用户名校验和模型编辑缺失的法语翻译。[#16217](https://github.com/infiniflow/ragflow/pull/16217)

### 问题修复

- 文件解析：
  - 解析 .docx 中的 'Heading' 样式时抛出 `ValueError`。[#16284](https://github.com/infiniflow/ragflow/pull/16284)
  - 法律文档解析器静默移除 .docx 文件中的表格。[#16155](https://github.com/infiniflow/ragflow/pull/16155)
  - 设置 DeepDoc 分隔符后，孤立的 Markdown 标题与其后续章节被拆开。[#16109](https://github.com/infiniflow/ragflow/pull/16109)
  - Markdown 表格在分块结果中出现两次，一次作为独立分块，另一次包含在普通文本分块中。[#16143](https://github.com/infiniflow/ragflow/pull/16143)
- MCP
  - MCP 服务器遇到空白文档页时无限挂起；因分页逻辑缺陷，文档最后一页被静默丢弃。[#16285](https://github.com/infiniflow/ragflow/pull/16285)
  - MCP 连接与数据集发现失败，原因是服务器硬编码的抓取上限超出了新引入的 `page_size` 限制。[#16148](https://github.com/infiniflow/ragflow/pull/16148)
- 数据流
  - 恢复数据流重跑端点，并确保摄取响应包含 DSL 载荷，以可靠渲染时间线与解析器视图。[#16292](https://github.com/infiniflow/ragflow/pull/16292)
  - 恢复数据流解析器默认值并返回真实 SSE 载荷，确保管道运行能正常显示消息 ID 与日志更新。[#16290](https://github.com/infiniflow/ragflow/pull/16290)
- LLM：无法通过 Google Cloud（Vertex AI）提供商使用 `eu` 或 `us` 区域端点调用新模型 `gemini-3.5-flash`。现通过把多区域请求显式路由到所需的 `aiplatform.<region>.rep.googleapis.com` 域名而非合成的 `<region>-aiplatform.googleapis.com` 主机来解决。[#15990](https://github.com/infiniflow/ragflow/pull/15990)
- UI/UX：元数据添加弹窗向后端发送空值。[#15229](https://github.com/infiniflow/ragflow/pull/15229)
