# 工具组件

工具组件将外部搜索、数据库、HTTP API、邮件发送、文档生成、金融查询和浏览器自动化能力接入 Agent。构建 Agent 时，应先了解每个工具的用途与安全边界。

## 工具选择建议

| 工具类别 | 典型组件 | 使用场景 |
| --- | --- | --- |
| 网页搜索 | Tavily、Google、DuckDuckGo、SearXNG、Keenable | 检索网页、新闻、公开信息或指定站点的内容。 |
| 学术搜索 | Google Scholar、ArXiv、PubMed、BGPT | 检索论文、医学文献和科研资料。 |
| 数据与金融查询 | Execute SQL、Yahoo Finance、WenCai | 查询数据库、市场行情或金融筛选结果。 |
| 内容输出 | Email、Document Generator | 发送邮件或生成可下载的文档。 |
| 浏览器自动化 | Browser | 访问网页、读取页面内容或执行多步骤浏览器任务。 |

## 网页与信息检索

### Tavily Search 

Tavily 是面向 LLM 的网页搜索服务，适合检索一般性网络信息、新闻，以及需要限定在特定域名内的内容。查询应聚焦单一主题，避免过长的自然语言提问。

#### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 查询 | string | 是 | 当前用户输入 | 搜索关键词。 |
| 主题 | string | 否 | general | 搜索类型。取值为 `general` 或 `news`。 |
| 包含域名 | array[string] | 否 | 空列表 | 仅保留来自这些域名的结果，如 `www.nasa.gov`。 |
| 排除域名 | array[string] | 否 | 空列表 | 排除来自这些域名的结果。 |
| API key | string | 否 | 空 | Tavily API key。 |
| 搜索深度 | string | 否 | basic | 搜索深度。取值为 `basic` 或 `advanced`。 |
| 最大结果数 | integer | 否 | 6 | 结果数量上限。 |
| 天数 | integer | 否 | 14 | 新闻检索的时间范围（天）。 |
| 包含答案 | boolean | 否 | false | 是否请求 Tavily 的 answer 字段。 |
| 包含原始内容 | boolean | 否 | false | 是否请求原始页面内容。 |
| 包含图片 | boolean | 否 | false | 是否请求图片。 |
| 包含图片描述 | boolean | 否 | false | 是否请求图片描述。 |

#### 支持的参数取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 主题 | general | 一般网页搜索。 |
| 主题 | news | 新闻检索。 |
| 搜索深度 | basic | 基础搜索。 |
| 搜索深度 | advanced | 深度搜索。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| URL 列表 | `["https://www.ragflow.io/docs/dev/"]` |
| 提取深度 | basic |
| 格式 | markdown |
| API key |  |
| 包含图片 | false |

#### 输出结果

输出通常包含搜索结果的摘要、标题、链接、摘要片段以及可选的图片信息。`formalized_content` 通常会传给 Agent 用于生成回答，而 JSON 则由后续节点读取结构化字段。

![Tavily Search](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/tavily_search.jpg)

### Tavily Extract 

Tavily Extract 用于读取一个或多个已知 URL 的正文内容。常见流程是先用 Tavily Search 获取链接，再把链接交给该组件提取页面内容。

#### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| URL 列表 | array[string] | 是 | 空列表 | 待提取的 URL 列表。输入为字符串时按英文逗号拆分。 |
| 提取深度 | string | 否 | basic | `advanced` 可提取更多表格与内嵌内容，但成本和延迟更高。 |
| 格式 | string | 否 | markdown | 提取结果格式。取值为 `markdown` 或 `text`。 |
| API key | string | 否 | 空 | Tavily API key。 |
| 包含图片 | boolean | 否 | false | 是否包含图片。 |

#### 支持的参数取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 提取深度 | basic | 基础提取。 |
| 提取深度 | advanced | 提取更多表格与内嵌内容，延迟和成本更高。 |
| 格式 | markdown | Markdown 格式。 |
| 格式 | text | 纯文本格式。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| URL 列表 | `["https://www.ragflow.io/docs/dev/"]` |
| 提取深度 | basic |
| 格式 | markdown |
| API key |  |
| 包含图片 | false |

#### 输出结果

输出包含页面正文、标题、URL 和提取状态。`formalized_content` 常用作 Agent 上下文，JSON 则保留每个 URL 的结构化提取结果。

![Tavily Extract](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/tavily_extract.jpg)

### Google 

Google Search 通过 SerpApi 获取 Google 自然搜索结果，适合需要按国家/地区和语言定向的网页检索。

#### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 查询 | string | 是 | 当前用户输入 | 搜索关键词。 |
| 起始位置 | integer | 否 | 0 | 结果偏移量。按文档语义，这是分页的起始位置。 |
| 结果数 | integer | 否 | 6 | 请求返回的结果数量。 |
| API key | string | 是 | 空 | SerpApi API key。 |
| 国家/地区 | string | 否 | cn | Google 地区代码，如 `cn`、`us` 或 `jp`。 |
| 语言 | string | 否 | en | Google 界面/结果语言代码，如 `zh-CN` 或 `en`。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | RAGFlow 官方文档 |
| 起始位置 | 0 |
| 结果数 | 6 |
| API key |  |
| 国家/地区 | cn |
| 语言 | en |

#### 输出结果

输出包含搜索结果的标题、链接和摘要。整理后的文本可交给 Agent 汇总，后续节点也可从 JSON 中读取链接列表。

![Google Search](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/google_search.jpg)

### DuckDuckGo

DuckDuckGo 是注重隐私的搜索引擎组件，无需单独的 API key，可用于一般性网页和新闻检索。

#### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 查询 | string | 是 | 当前用户输入 | 搜索关键词。 |
| 频道 | string | 否 | general | 消息频道：`general` 或 `news`。 |
| 返回条数 | integer | 节点配置 | 10 | 返回结果数量上限。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | RAGFlow 开源 |
| 频道 | general |
| 返回条数 | 10 |

#### 输出结果

输出包含 DuckDuckGo 返回的标题、链接和摘要，可用于网页资料汇总、新闻线索整理或后续页面提取。

![Duckduckgo](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/duckduckgo_1.jpg)

![Duckduckgo](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/duckduckgo_2.jpg)

### SearXNG 

SearXNG 是可自托管、注重隐私的元搜索引擎。该组件调用用户提供的 SearXNG 实例，适合需要掌控检索来源或部署内部检索的场景。

#### 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| 查询 | string | 是 | 当前用户输入 | 搜索关键词。 |
| SearXNG URL | string | 是 | 空 | SearXNG 实例的基础 URL，如 `https://searxng.example.com`。 |
| 返回条数 | integer | 否 | 10 | 结果数量上限。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | RAGFlow 文档 |
| SearXNG URL | `https://<your-searxng-host>` |
| 返回条数 | 10 |

#### 输出结果

输出包含 SearXNG 返回的标题、链接、摘要和来源信息。使用前需配置可访问的 SearXNG 服务地址，并通过系统安全检查。

### Keenable 

Keenable 是面向 AI Agent 的网页搜索 API。默认提供无需 key 的公共免费通道；配置 key 后可提升限额并启用低延迟的 realtime 模式。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 搜索关键词。 |
| site | string | 否 | 空 | 将结果限定在单一域名，如 `techcrunch.com`。 |
| api_key | string | 节点配置 | 空 | 可选的 Keenable API key。 |
| mode | string | 节点配置 | pro | `pro` 检索更深入，`realtime` 延迟更低。`realtime` 需要 API key。 |
| top_n | integer | 节点配置 | 10 | 结果数量上限。 |
| KEENABLE_API_URL | 环境变量 | 部署配置 | `https://api.keenable.ai` | 服务 API 基础 URL。生产环境必须使用 HTTPS，本地回环地址可使用 HTTP。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | RAGFlow Agent 工作流 |
| 站点 | github.com |
| API key |  |
| 模式 | pro |
| 返回条数 | 10 |
| Keenable API URL | `https://api.keenable.ai` |

#### 输出结果

输出包含 Keenable 返回的搜索条目、摘要和链接，可交给 Agent 汇总，或传给后续检索/提取节点。无 key 试用时不要设置 `realtime`。

![Keenable Search](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/keenable_search.jpg)

### Wikipedia
Wikipedia 组件用于搜索百科词条并提取词条摘要，适合查询明确的实体、概念和历史事件。查询词应尽量接近词条标题。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 具体的词条主题或关键词。 |
| top_n | integer | 节点配置 | 10 | 搜索条目数量上限。 |
| language | string | 节点配置 | en | Wikipedia 语言代码，如 `zh`、`en` 或 `ja`。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | 文化 |
| 返回条数 | 10 |
| 语言 | en |

#### 输出结果

输出包含匹配词条的标题、摘要和页面链接，适合配合 Agent 生成概念解释或背景说明。

![Wikipedia](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/wikipedia.jpg)

### GitHub

GitHub 组件通过 GitHub Repository Search API 搜索仓库，默认按热度排序，适合寻找开源项目、参考实现和技术生态。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | GitHub 仓库搜索语法或关键词。 |
| top_n | integer | 节点配置 | 10 | 返回仓库数量上限。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | RAGFlow |
| 返回条数 | 10 |

#### 输出结果

输出包含仓库、issue、代码或用户的搜索条目，通常包括名称、链接、摘要、更新时间等信息。输出中包含仓库名称、链接、描述和 star 数。

![GitHub](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/GitHub.jpg)

## 学术文献检索

### Google Scholar

Google Scholar 用于检索论文、学位论文、书籍、摘要等学术资料，适合科研综述前的初步文献调研，但不能替代对原文和引用信息的核实。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 论文主题或关键词。 |
| top_n | integer | 节点配置 | 12 | 论文数量上限。 |
| sort_by | string | 节点配置 | relevance | 排序方式：`date` 或 `relevance`。 |
| year_low | integer/null | 节点配置 | null | 最早发表年份。 |
| year_high | integer/null | 节点配置 | null | 最晚发表年份。 |
| patents | boolean | 节点配置 | true | 是否包含专利。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | 检索增强生成评估 |
| 返回条数 | 12 |
| 排序方式 | relevance |
| 起始年份 | null |
| 结束年份 | null |
| 专利 | true |

#### 输出结果

输出包含论文标题、作者、摘要、来源链接和引用信息等学术检索条目，适合文献综述或科研线索整理。

![Google Scholar](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/google_scholar.jpg)

### ArXiv 

ArXiv 用于检索计算机科学、数学、物理、量化金融等领域的开放预印本。ArXiv 论文可能未经同行评审，使用结果时应注明其预印本性质。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 检索关键词。 |
| top_n | integer | 节点配置 | 12 | 返回论文数量上限。 |
| sort_by | string | 节点配置 | submittedDate | 排序方式：`submittedDate`、`lastUpdatedDate` 或 `relevance`。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | 大语言模型 Agent |
| 返回条数 | 12 |
| 排序方式 | submittedDate |

#### 输出结果

输出包含论文标题、作者、摘要、发表时间、分类和论文链接，可供 Agent 生成论文摘要或研究对比。

![ArXiv](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/arxiv.jpg)

### PubMed 

PubMed 用于检索生命科学和生物医学文献。组件通过 NCBI E-utilities 查询，返回标题、作者、期刊、DOI、摘要等信息。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | PubMed 检索词，支持医学主题词或布尔检索式。 |
| top_n | integer | 节点配置 | 12 | 论文数量上限。 |
| email | string | 节点配置 | `A.N.Other@example.com` | NCBI Entrez 联系邮箱。生产环境请替换为真实维护者邮箱。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | COVID-19 疫苗有效性 |
| 返回条数 | 12 |
| 邮箱 | `A.N.Other@example.com` |

#### 输出结果

输出包含医学文献的标题、作者、期刊、摘要、发表日期和 PubMed 链接，适合医学文献检索场景。

![PubMed](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/pubmed.jpg)

### BGPT 

BGPT 检索科学论文并返回结构化证据，包括研究方法、样本量、结果、局限性、利益冲突、数据可用性和可证伪性提示。它适合评估科学论断，而不只是查找论文摘要。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 自然语言科学检索问题。 |
| top_n | integer | 节点配置 | 10 | 结果数量上限。 |
| api_key | string | 节点配置 | 空 | 可选 API key。未配置时使用公共服务通道。 |
| days_back | integer/null | 节点配置 | null | 可选。将检索限定在最近若干天内的内容。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | 睡眠剥夺会损害成年人的工作记忆吗？ |
| 返回条数 | 10 |
| API key |  |
| 回溯天数 | null |

#### 输出结果

输出包含生物医学知识检索结果和摘要，可供后续 Agent 进一步汇总、对比或生成研究解读。

![BGPT](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/bgpt.jpg)

## 数据与金融查询

### Execute SQL 

Execute SQL 连接外部数据库并执行 SQL 语句，结果会格式化为文本或表格内容。

为保护系统安全，数据库地址必须通过服务端安全检查。连接本地或内网数据库前，请先确认部署环境允许访问。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| sql | string | 是 | `{sys.query}` | 要执行的 SQL，可包含画布变量。 |
| db_type | string | 是 | mysql | 支持 `mysql`、`postgres`、`mariadb`、`mssql`、`IBMDB2`、`trino`、`oceanbase`。 |
| database | string | 是 | 空 | 数据库名。Trino 使用 `catalog.schema` 或 `catalog`。 |
| username | string | 是 | 空 | 数据库账号。 |
| host | string | 是 | 空 | 数据库地址，必须通过服务端安全检查。 |
| port | integer | 是 | 3306 | 数据库端口。 |
| password | string | 条件必填 | 空 | 数据库密码。Trino 可以为空。 |
| max_records | integer | 否 | 1024 | 每条语句返回的记录数上限。 |

#### 支持的取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 数据库类型 | mysql | MySQL |
| 数据库类型 | postgres | PostgreSQL |
| 数据库类型 | mariadb | MariaDB |
| 数据库类型 | mssql | Microsoft SQL Server |
| 数据库类型 | IBMDB2 | IBM DB2 |
| 数据库类型 | trino | Trino |
| 数据库类型 | oceanbase | OceanBase |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| SQL | `SELECT * FROM XXX;` |
| 数据库类型 | mysql |
| 数据库 | demo_sql |
| 用户名 | ragflow_reader |
| 主机 | `<host>` |
| 端口 | 3306 |
| 密码 | `<read-only database account password>` |
| 最大记录数 | 10 |

#### 输出结果

输出包含 SQL 执行结果、字段名和记录内容。可将格式化文本交给 Agent 解释，或让后续节点读取结构化结果。

![Execute SQL](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/execute_sql.jpg)

### Yahoo Finance 

Yahoo Finance 组件通过 `yfinance` 查询股票行情、公司概况、历史行情、财务报表和新闻，并将所选内容输出为 Markdown 报告。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| stock_code | string | 是 | `{sys.query}` | 股票代码或公司名称，尽量使用交易所标准代码。 |
| info | boolean | 节点配置 | true | 输出公司与行情信息。 |
| history | boolean | 节点配置 | false | 输出历史行情数据。 |
| count | boolean | 节点配置 | false | 由代码定义的股数开关。 |
| financials | boolean | 节点配置 | false | 当前实现输出日历信息。 |
| income_stmt | boolean | 节点配置 | false | 由代码定义的利润表开关。 |
| balance_sheet | boolean | 节点配置 | false | 输出资产负债表和季度资产负债表。 |
| cash_flow_statement | boolean | 节点配置 | false | 输出现金流量表和季度现金流量表。 |
| news | boolean | 节点配置 | true | 输出相关新闻。 |

#### 支持的取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 股票代码 | AAPL |
| 信息 | true |
| 历史数据 | false |
| 股数 | false |
| 财报 | false |
| 利润表 | false |
| 资产负债表 | false |
| 现金流量表 | false |
| 新闻 | true |

#### 输出结果

输出包含金融查询报告和结构化行情数据，可供后续 Agent 生成市场综述或指标解读。

### WenCai 
WenCai 用于按自然语言条件筛选股票、指数、基金、港股、美股、期货等金融数据。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| query | string | 是 | `{sys.query}` | 选股或金融条件，如「市盈率低于 20 的 A 股」。 |
| top_n | integer | 节点配置 | 10 | 结果数量上限。前端默认值可能为 20。 |
| query_type | string | 节点配置 | stock | 支持 `stock`、`zhishu`、`fund`、`hkstock`、`usstock`、`threeboard`、`conbond`、`insurance`、`futures`、`lccp`、`foreign_exchange`。 |

#### 支持的查询类型

| 类型 | 说明 |
| --- | --- |
| stock | A 股股票 |
| zhishu | 指数 |
| fund | 基金 |
| hkstock | 港股 |
| usstock | 美股 |
| threeboard | 新三板 |
| conbond | 可转债 |
| insurance | 保险 |
| futures | 期货 |
| lccp | 理财产品 |
| foreign_exchange | 外汇 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 查询 | 市盈率低于 20 且净利润同比增长超过 20% 的 A 股 |
| 返回条数 | 10 |
| 查询类型 | stock |

#### 输出结果

输出包含符合自然语言筛选条件的金融数据列表，可用于展示选股结果、后续筛选或由 Agent 解读。

:::tip 注意

使用 WenCai 组件前，请确认当前环境中 WenCai 查询服务可用。若该服务未开启，组件不会返回真实金融数据。

:::

## 通信与外部系统

### Email

Email 组件通过 SMTP 发送 HTML 邮件，支持多个抄送地址。当前版本支持收件人、抄送人、主题和邮件正文，不支持通过该组件添加附件或密送人。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| to_email | string | 是 | `{sys.query}` | 收件人邮箱地址。 |
| cc_email | string | 否 | 空 | 抄送邮箱地址，多个地址用英文逗号分隔。 |
| content | string | 否 | 空 | 邮件正文，以 HTML 内容发送。 |
| subject | string | 否 | 空 | 邮件主题。 |
| smtp_server | string | 节点配置 | 空 | SMTP 服务器地址。 |
| smtp_port | integer | 节点配置 | 465 | SMTP 端口。465 端口使用 SSL，其他端口使用 STARTTLS。 |
| email | string | 节点配置 | 空 | 发件人邮箱地址。 |
| smtp_username | string | 节点配置 | 空 | SMTP 登录账号，为空时使用发件人邮箱地址。 |
| password | string | 节点配置 | 空 | SMTP 授权码或密码。 |
| sender_name | string | 节点配置 | 空 | 发件人显示名称。 |

:::tip 注意

尽管部分 SMTP 字段在界面中显示为可选，发送邮件前仍必须提供有效的 SMTP 服务器地址、发件人账号和认证信息。

:::

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 收件邮箱 | receiver@example.com |
| 抄送邮箱 |  |
| 内容 | `<p>This is a test email sent by RAGFlow.</p>` |
| 主题 | RAGFlow 邮件工具测试 |
| SMTP 服务器 |  |
| SMTP 端口 | 465 |
| 发件邮箱 |  |
| SMTP 用户名 |  |
| 密码 |  |
| 发件人名称 |  |

#### 输出结果

输出包含发送状态和错误信息。`success` 为 `true` 表示邮件发送成功；若发送失败，请检查 SMTP 地址、账号、密码和收件人。

![Email](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/email.jpg)

### HTTP Request 

HTTP Request 组件调用外部 HTTP API，可将业务系统、第三方服务或自建 API 接入 Agent 工作流。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| url | string | 是 | 空 | API 地址，可使用画布变量。 |
| method | string | 是 | get | 支持 `get`、`post`、`put`。 |
| headers | string/object | 否 | 空 | JSON 对象格式的请求头，值中可使用变量。 |
| variables | array[object] | 否 | `[]` | 请求参数列表，每项通常包含 `key`、`value` 和 `ref`。 |
| timeout | integer | 否 | 60 | 请求超时时间（秒）。 |
| proxy | string | 否 | 空 | 可选的 HTTP/HTTPS 代理地址。 |
| clean_html | boolean | 否 | false | 是否清除响应中的 HTML 标签。 |
| datatype | string | 否 | json | Python 请求体类型：`json` 或 `formdata`。 |
| body | string | 否 | 空 | Go 运行时支持的原始请求体。 |
| content_type | string | 否 | 空 | POST/PUT 默认为 `application/json`。 |

#### 支持的取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 方法 | GET | GET 请求。 |
| 方法 | POST | POST 请求。 |
| 方法 | PUT | PUT 请求。 |
| 代理 | HTTP | HTTP 代理。 |
| 代理 | HTTPS | HTTPS 代理地址。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| URL | `https://1.1.1.1/cdn-cgi/trace` |
| 方法 | GET |
| 请求头 | `{}` |
| 变量 | `[]` |
| 超时 | 30 |
| 代理 |  |
| 清除 HTML | false |
| 数据类型 | json |
| 请求体 |  |
| 内容类型 |  |

#### 输出结果

输出包含响应状态码、响应头和响应体。文本响应可交给 Agent 汇总，JSON 响应可由后续节点读取。

![HTTP Request](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/http_request.jpg)

## 内容生成与自动化

### Document Generator（DocGenerator）

Document Generator 组件将 Markdown 内容输出为 PDF、DOCX、TXT、Markdown 或 HTML 文件，并将生成的文件存入 Agent 附件存储。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| content | string | 是 | 空 | 要生成的 Markdown 内容，可引用上游输出。 |
| output_format | string | 是 | pdf | 输出格式：`pdf`、`docx`、`txt`、`markdown` 或 `html`。 |
| filename | string | 否 | 空 | 文件名。为空时自动生成，并清理非法文件名字符。 |
| header_text | string | 否 | 空 | 页眉文本，适用于 PDF/DOCX。 |
| footer_text | string | 否 | 空 | 页脚文本，适用于 PDF/DOCX。 |
| watermark_text | string | 否 | 空 | 水印文本。PDF/DOCX/HTML 是否支持取决于具体实现。 |
| add_page_numbers | boolean | 否 | true | 是否添加页码，主要用于 PDF/DOCX。 |
| add_timestamp | boolean | 否 | true | 是否添加生成时间。 |
| include_download_info_in_content | boolean | 否 | false | 是否在内容中保留下载信息标记。 |
| font_size | number | 否 | 12 | 字号，必须大于等于 12。 |

#### 支持的取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 输出格式 | pdf | PDF 文档。 |
| 输出格式 | docx | Word 文档。 |
| 输出格式 | html | HTML 文档。 |
| 输出格式 | txt | 文本文件。 |
| 输出格式 | markdown | Markdown 文件。 |
| 字号 | >=12 | 字号必须大于等于 12。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| 内容 | `# RAGFlow
Test This document is generated by the DocGenerator component.` |
| 输出格式 | pdf |
| 文件名 | ragflow-agent-test.pdf |
| 页眉文本 | RAGFlow |
| 页脚文本 | 内部测试 |
| 水印文本 | DRAFT |
| 添加页码 | true |
| 添加时间戳 | true |
| 在内容中保留下载信息 | false |
| 字号 | 12 |

#### 输出结果

输出包含生成文件的附件信息、下载链接和文件名。用户可以预览、下载，或将文件传给后续节点继续处理。

![Document Generator](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/document_generator.jpg)

### Browser（Browser）

Browser 是由 LLM 驱动的浏览器自动化组件，可根据自然语言任务访问网页、执行多步操作、读取页面内容、上传源文件并收集下载的文件。它依赖已配置的模型以及运行环境中的浏览器自动化依赖包。

#### 参数说明

| 字段 | 类型 | 必填 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| llm_id | string | 是 | 空 | Browser 使用的已配置对话模型 ID。Go 路径可接受 `model_id` 作为别名。 |
| prompts | string | 是 | `{sys.query}` | 自然语言浏览器任务，支持画布变量。Go 路径可接受 `prompt` 作为别名。 |
| max_steps | integer | 否 | 30 | 浏览器执行步数上限，在 Python 路径下生效。当前 Go Stagehand 路径接受该字段，但执行时不使用。 |
| headless | boolean | 否 | true | 是否以无头模式运行浏览器。 |
| enable_default_extensions | boolean | 否 | false | 是否启用默认的 `browser-use` 扩展。 |
| chromium_sandbox | boolean | 否 | false | 是否启用 Chromium 沙箱。Docker root 环境下一般保持关闭。 |
| persist_session | boolean | 否 | true | 是否为同一节点复用浏览器用户目录，在 Python 路径下生效。 |
| upload_sources | array/string | 否 | `[]` | 浏览器任务使用的文件 ID、URL 或上游变量引用。 |
| url | string | 否 | 空 | 当前 Go 组件接受的兼容字段，不参与 Stagehand 执行。 |
| timeout | integer | 否 | 0 | 当前 Go 组件接受的兼容字段，不参与 Stagehand 执行。 |

#### 支持的取值

| 参数 | 支持的取值 | 说明 |
| --- | --- | --- |
| 上传来源 | 文件 ID | 上传到 RAGFlow 的文件 ID。 |
| 上传来源 | URL | 可访问的文件或网页 URL。 |
| 上传来源 | 上游变量引用 | 来自上游节点的文件或资源引用。 |

#### 配置示例

| 配置项 | 示例值 |
| --- | --- |
| LLM ID | `<configured chat model ID>` |
| 提示词 | 打开 https://www.ragflow.io，识别主导航项，并以简洁的项目列表返回。 |
| 最大步数 | 10 |
| 无头模式 | true |
| 启用默认扩展 | false |
| Chromium 沙箱 | false |
| 持久化会话 | true |
| 上传来源 | `[]` |
| URL |  |
| 超时 | 0 |

#### 输出结果

输出包含浏览器任务执行摘要、提取的页面内容以及生成的下载文件信息。避免给 Browser 分配涉及登录、支付或不可逆提交的任务。
