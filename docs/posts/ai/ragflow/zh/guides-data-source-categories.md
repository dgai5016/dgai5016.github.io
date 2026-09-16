# 数据源分类与选择

RAGFlow 支持多种数据源。建议先根据内容来源选择所属大类，再进入相应的数据源配置。以下分类可以帮助用户快速确定该选择哪种连接方式。

**文档与协作平台**：用于同步团队文档、wiki、云盘文件和协作文档。该类别适合搭建企业知识库或项目资料库，包括 Confluence、Notion、Feishu Wiki、Google Drive、OneDrive、SharePoint、Box、Dropbox、WebDAV 和 SeaFile。

**对象存储**：用于同步存储桶或容器中的大量文件。该类别适合历史数据归档、批量文件导入和云文件的集中管理，包括 S3、Google Cloud Storage、Oracle Storage、R2 和 Azure Blob Storage。

**数据库与数据仓库**：用于同步结构化记录或查询结果。该类别适合业务数据问答、指标知识的沉淀以及数据分析结果的检索，包括 MySQL、PostgreSQL 和 BigQuery。

**代码仓库与项目管理**：用于同步代码协作、issue、pull request、任务和项目记录。该类别适合技术知识的沉淀和项目历史的查询，包括 GitHub、GitLab、Bitbucket、Azure DevOps、Jira 和 Asana。

**邮件、消息与协作沟通**：用于同步邮件、频道消息和团队讨论内容。该类别适合客服沟通、业务往来函件和协作记录的查询，包括 Gmail、Outlook、IMAP、Microsoft Teams、Slack 和 Discord。

**业务系统与表格**：用于同步 CRM、工单、在线表格、课程或运营记录。该类别适合搭建业务台账和服务知识库，包括 Salesforce、Airtable、Dingtalk AI Table、Zendesk 和 Moodle。

**通用 API 与订阅**：用于连接自定义 API、X 搜索结果或公开的订阅源。该类别适合没有标准连接器的业务系统，以及公开内容的采集，包括 REST API、Xquik、RSS 和 Sitemap。

账号版本说明：本手册中，**Personal Edition**（个人版）和 **Enterprise Edition**（企业版）指的是外部系统的账号或服务版本，而不是 RAGFlow 的许可证。同步是否可用最终取决于外部系统是否允许当前账号访问目标内容和 API。
