# 数据源配置
## Confluence

Confluence 数据源用于将团队在 Confluence 中维护的空间、页面与子页面同步到 RAGFlow 知识库。配置后，用户即可在知识库中查询产品文档、项目说明、研发规范等内容。

**权限要求**：需具有 Confluence 空间或页面的读取权限。如需同步附件或子页面，还须拥有相应内容的读取权限。

**账号版本要求**：可使用 Confluence Cloud 中的个人空间或免费团队空间。如同步企业空间、Server 或 Data Center 内容，需拥有对应组织空间的访问权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Confluence 连接。
- **Confluence username**：填写访问 Confluence 所用的账号。
- **Confluence access token**：填写访问 Confluence 所用的 access token。
- **Wiki base URL**：填写 Confluence 站点的基础地址。
- **Is cloud version**：根据 Confluence 的部署类型选择。
- **Index mode**：选择同步范围。可选项为 **All**、**Space** 和 **Page**。
- **Page ID**：索引模式为 **Page** 时填写。
- **Space key**：索引模式为 **Space** 时填写。
- **Recursive indexing**：仅在索引模式为 **Page** 时可用。启用后，该页面及其子页面都会被同步。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Confluence](/ragflow-images/Confluence.jpg)

## Notion

Notion 数据源用于将 Notion 页面与数据库内容同步到 RAGFlow 知识库。配置后，团队在 Notion 中整理的文档、项目记录与知识卡片即可用于检索和问答。

**权限要求**：必须为 Notion 集成（integration）授予对目标页面或数据库的访问权限。

**账号版本要求**：Notion 个人页面与团队空间均可使用。只要目标页面或数据库已共享给 Notion 集成，即可同步到 RAGFlow。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Notion 连接。
- **Notion integration token**：填写用于访问 Notion 的 integration token。
- **Root page ID**：填写需要同步的根页面 ID。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Notion](/ragflow-images/Notion.jpg)

## Google Drive

Google Drive 数据源用于将 Google Drive 中的文件或文件夹同步到 RAGFlow 知识库。配置后，团队云文档即可直接用于知识库检索与问答。

**权限要求**：Google 账号或 OAuth 授权须对目标文件、共享文件夹或云盘具有读取权限。

**账号版本要求**：可使用个人 Google Drive 中用户被授权访问的文件夹。若要同步组织共享文件夹或多用户云盘，通常需要 Google Workspace 管理员或具有相应授权的账号。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Google Drive 连接。
- **Primary administrator email**：填写有权访问目标 Drive 内容的管理员邮箱。
- **OAuth token JSON**：填写或上传用于授权 Google Drive 的 OAuth token JSON。
- **My Drive email**：填写需要对其 **My Drive** 建立索引的用户邮箱地址。
- **Shared folder URL**：填写需要同步的 Google Drive 共享文件夹 URL。

![Google Drive](/ragflow-images/Google_Drive.jpg)

## 飞书 Wiki

飞书 Wiki 数据源需在 Python 后端下使用。它会递归扫描所配置的 Wiki 子树，并导入符合条件的可下载 `file` 节点。飞书原生文档（Docs）、电子表格（Sheets）、幻灯片（Slides）与多维表格（Bitable）记录不会直接导入，但连接器会遍历非文件节点，以发现其下挂的可下载文件。

飞书自建应用需具有 Wiki 与 Drive 的只读权限。请将该应用添加到目标 Wiki，并授予列出节点和下载文件的权限。

连接器支持以下文件扩展名子集：`csv`、`doc`、`docx`、`eml`、`gif`、`html`、`jpeg`、`jpg`、`json`、`md`、`mdx`、`pdf`、`png`、`ppt`、`pptx`、`tif`、`txt`、`xls` 与 `xlsx`。

请配置以下字段：

- **Name**：为 RAGFlow 中的此连接取一个描述性名称。
- **Feishu app ID** 与 **Feishu app secret**：飞书自建应用的凭据。secret 在表单中会以掩码显示。
- **Wiki space ID**：目标 Wiki 空间的 ID。
- **Wiki root node token**：以该节点为起点，递归扫描其全部后代节点。
- **Allowed file extensions**：可选的允许列表，取值须来自上述受支持的扩展名子集。留空表示允许全部子集。
- **Required filename keywords**：可选列表。文件名必须至少包含一个所配置的关键词。
- **Excluded filename keywords**：可选列表。匹配到关键词的文件名会被排除。
- **Maximum file size (bytes)**：连接器可接受的最大文件体积。默认值为 `52428800` 字节（50 MiB）。声明的内容长度与实际流式传输的字节数均受此限制约束。
- **Batch size**：每批发送到摄取管道（ingestion pipeline）的文件数。默认值为 `2`，有效取值为 `1` 到 `10`。
- **Refresh interval**：周期性扫描之间的间隔。

扩展名与文件名过滤会在下载文件内容之前应用。每次周期同步都会扫描子树内的节点元数据，但只下载编辑时间落在已完成同步窗口内的匹配文件。一次结果为空的已完成扫描会推进该窗口，因此同一时间段不会被再次视为待处理。

文件下载遇到 HTTP 429 响应时最多重试三次。连接器会遵循飞书 `x-ogw-ratelimit-reset` 响应头中给出的相对延迟秒数，最短等待一秒。若该响应头缺失或无效，重试将依次等待一秒、两秒、四秒。若要求的延迟超过 60 秒，则会停止下载，而不是在服务器重置前继续重试。参见[飞书频率限制指南](https://open.feishu.cn/document/server-docs/api-call-guide/frequency-control)。

下载失败会触发连接器校验错误，其中包含 HTTP 状态码，以及可用时飞书返回的错误码、错误信息与请求日志 ID。错误响应体的解析上限为 8 KiB；诊断字段有长度限制，凭据会被脱敏。下载成功的文件内容（包括 JSON 文件）将原样导入。重试次数耗尽后，本次同步失败，且不会推进其成功窗口。

常规周期同步不会传播源端删除：在飞书中删除文件并不会立即删除已导入的 RAGFlow 文档。手动重建遵循既有的“先删除后导入”行为，因此已不存在或不再匹配过滤条件的既往导入文件，可在重建过程中被移除。

## OneDrive

OneDrive 数据源用于将 OneDrive 或 OneDrive for Business 中的文件同步到 RAGFlow 知识库。配置后，个人或部门云文件即可被统一查询。

**权限要求**：Microsoft 账号或应用授权须对目标文件夹和文件具有读取权限。

**账号版本要求**：此数据源通常面向 Microsoft 365 或 Entra ID 组织账号配置。个人 OneDrive 一般不适用当前这种基于 Tenant ID、Client ID 与 Client secret 的连接方式。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 OneDrive 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Folder path (optional)**：填写 OneDrive 子文件夹路径。
- **Batch size**：设置每批处理的条目数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![OneDrive](/ragflow-images/OneDrive.jpg)

## SharePoint

SharePoint 数据源用于将 SharePoint 站点文档库同步到 RAGFlow 知识库。配置后，企业规章、部门资料与项目文件即可被统一管理和查询。

**权限要求**：Microsoft 账号或应用授权须对目标站点、文档库和文件具有读取权限。

**账号版本要求**：需要 Microsoft 365 或 SharePoint 组织站点以及 Entra ID 应用授权。个人账号不适用。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 SharePoint 连接。
- **Site URL**：填写 SharePoint 站点的完整 URL。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![SharePoint](/ragflow-images/SharePoint.jpg)

## Box

Box 数据源用于将 Box 云盘中的文件和文件夹同步到 RAGFlow 知识库。配置后，企业云盘资料与外部协作文件即可被统一查询。

**权限要求**：Box 应用或账号须对目标文件夹和文件具有读取权限。

**账号版本要求**：个人 Box 文件夹与企业 Box 空间均可使用。企业空间需要管理员或应用授权允许访问目标文件夹。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Box 连接。
- **Box OAuth configuration**：填写 Box OAuth 配置信息。
- **Folder ID**：填写需要同步的 Box 文件夹 ID。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Box](/ragflow-images/Box.jpg)

## Dropbox

Dropbox 数据源用于将 Dropbox 中的文件和文件夹同步到 RAGFlow 知识库。配置后，云协作文件即可用于知识库检索与问答。

**权限要求**：Dropbox 应用或账号须对目标文件夹和文件具有读取权限。

**账号版本要求**：个人 Dropbox 与团队 Dropbox 均可使用。团队空间需要具有目标文件或文件夹读取权限的应用授权。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Dropbox 连接。
- **Access token**：填写 Dropbox 的 access token。
- **Batch size**：设置每批同步的文件数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Dropbox](/ragflow-images/Dropbox.jpg)

## SeaFile

SeaFile 数据源用于将 Seafile 中的账号、资料库或目录内容同步到 RAGFlow 知识库。配置后，私有云盘资料与部门文件即可被统一检索。

**权限要求**：SeaFile 账号须对目标资料库、目录和文件具有读取权限。

**账号版本要求**：个人资料库与企业资料库均可使用。同步共享资料库或指定目录时，需要相应的资料库 token 或账号权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 SeaFile 连接。
- **SeaFile server URL**：填写 SeaFile 服务地址。
- **Synchronization scope**：选择整个账号、单个资料库或指定目录。
- **Account API token**：根据同步范围填写账号 API token。
- **Include shared libraries**：同步整个账号时，选择是否包含共享资料库。
- **Library token**：同步单个资料库或指定目录时填写。
- **Library ID**：同步单个资料库或指定目录时填写。
- **Directory path**：同步范围为 **Specified directory** 时填写。
- **Batch size**：设置每批处理的条目数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![SeaFile](/ragflow-images/SeaFile.jpg)

## S3

S3 数据源用于将对象存储桶中的文件同步到 RAGFlow 知识库。配置后，云端或私有对象存储中的文档即可统一纳入知识库管理。

**权限要求**：访问密钥（access key）、IAM 角色或兼容存储账号须具有存储桶列举和对象读取权限。

**账号版本要求**：需要 AWS S3 或兼容 S3 的对象存储账号。此类数据源取决于云账号与存储桶权限，不区分个人版与企业版。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 S3 连接。
- **Bucket name**：填写需要同步的存储桶名称。
- **Region**：填写或选择存储桶所在区域。
- **Prefix**：用于限定同步路径。留空则同步整个存储桶。
- **Mode**：选择 **S3** 或 **S3 Compatible**。
- **Authentication method**：在 S3 模式下选择 access key、IAM role 或 AssumeRole。
- **AWS Access Key ID**：在选择 access key 或 S3 兼容模式时填写。
- **AWS Secret Access Key**：在选择 access key 或 S3 兼容模式时填写。
- **Role ARN**：在使用 IAM role 或 AssumeRole 时填写。
- **Addressing style**：在 S3 兼容模式下选择虚拟主机式（virtual-hosted style）或路径式（path style）。
- **Endpoint URL**：在 S3 兼容模式下填写终端节点地址。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

## Google Cloud Storage

Google Cloud Storage 数据源用于将 GCS 存储桶中的文件同步到 RAGFlow 知识库。配置后，Google Cloud 上的项目资料、报告与文档即可进入知识库供团队检索。

**权限要求**：GCS 凭据须具有对目标存储桶的列举与对象读取权限。

**账号版本要求**：需要 Google Cloud 项目与存储桶权限。通常依据云项目权限配置，不区分个人版与企业版。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Google Cloud Storage 连接。
- **GCS access key ID**：填写 GCS access key ID。
- **GCS access key**：填写 GCS access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Google Cloud Storage](/ragflow-images/Google_Cloud_Storage.jpg)

## Oracle Storage

Oracle Storage 数据源用于将 Oracle Cloud 对象存储中的文件同步到 RAGFlow 知识库。配置后，存储在 OCI 上的文档与归档资料即可被统一检索。

**权限要求**：OCI 凭据须具有对目标存储桶的列举与对象读取权限。

**账号版本要求**：需要 Oracle Cloud 租户（tenancy）与对象存储权限。通常依据云账号权限配置。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Oracle Storage 连接。
- **Namespace**：填写 OCI 对象存储的命名空间。
- **OCI region**：填写 OCI 区域。
- **OCI access key ID**：填写 OCI access key ID。
- **OCI access key**：填写 OCI access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Oracle Storage](/ragflow-images/Oracle_Storage.jpg)

## R2

R2 数据源用于将 Cloudflare R2 存储桶中的文件同步到 RAGFlow 知识库。配置后，存储在 R2 中的公开资料、业务文件或历史文档即可被统一查询。

**权限要求**：R2 访问密钥须具有对目标存储桶的列举与对象读取权限。

**账号版本要求**：需要 Cloudflare 账号与 R2 存储桶权限。个人与企业 Cloudflare 账号均可使用，视其是否具有目标存储桶的访问权限而定。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 R2 连接。
- **R2 account ID**：填写 Cloudflare 账号 ID。
- **R2 access key ID**：填写 R2 access key ID。
- **R2 access key**：填写 R2 access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![R2](/ragflow-images/R2.jpg)

## Azure Blob Storage

Azure Blob Storage 数据源用于将 Azure Blob 容器中的文件同步到 RAGFlow 知识库。配置后，Azure 云环境中的资料、报告与归档文件即可被统一查询。

**权限要求**：Azure 凭据须对目标容器与 Blob 具有读取权限。

**账号版本要求**：需要 Azure 存储账号、连接字符串或 SAS 授权。通常依据 Azure 订阅与存储容器权限配置。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Azure Blob Storage 连接。
- **Authentication mode**：选择账户密钥（account key）、连接字符串（connection string）或 SAS URL。
- **Account name**：使用账户密钥模式时填写。
- **Account key**：使用账户密钥模式时填写。
- **Connection string**：使用连接字符串模式时填写。
- **Container URL**：使用 SAS URL 模式时填写。
- **SAS token**：使用 SAS URL 模式时填写。
- **Container name**：填写需要同步的容器名称。
- **Prefix (optional)**：用于限定同步路径。
- **Batch size**：设置每批处理的文件数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Azure Blob Storage](/ragflow-images/Azure_Blob_Storage.jpg)

## MySQL

MySQL 数据源用于将 MySQL 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，结构化业务数据即可用于检索与问答。

**权限要求**：数据库账号须对目标数据库表具有 SELECT 权限。建议使用只读账号。

**账号版本要求**：个人自建数据库与企业数据库均可使用。建议使用只读账号连接目标数据库表。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 MySQL 连接。
- **Host**：填写数据库主机地址。
- **Port**：填写数据库端口。
- **Database**：填写需要同步的数据库名称。
- **Username**：填写数据库用户名。
- **Password**：填写数据库密码。
- **SQL query**：填写用于读取数据的 SQL 语句。
- **Content column**：选择要写入为文档内容的字段。
- **Metadata column**：选择要写入为元数据的字段。
- **ID column**：选择唯一 ID 字段。
- **Timestamp column**：选择用于判断增量更新的字段。
- **Sync deleted files**：启用后，可根据字段映射或清理任务，将已删除的记录从知识库索引中移除。

![MySQL](/ragflow-images/MySQL.jpg)

## PostgreSQL

PostgreSQL 数据源用于将 PostgreSQL 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，结构化业务数据即可用于检索与问答。

**权限要求**：数据库账号须对目标数据库表具有 SELECT 权限。建议使用只读账号。

**账号版本要求**：个人自建数据库与企业数据库均可使用。建议使用只读账号连接目标数据库表。

**配置参数**：配置字段与 MySQL 相同，包括 name、host、port、database、username、password、SQL query、content column、metadata column、ID column、timestamp column 和 sync deleted files。

![PostgreSQL](/ragflow-images/PostgreSQL.jpg)

## BigQuery

BigQuery 数据源用于将 BigQuery 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，Google Cloud 中的结构化数据与分析结果即可被检索并用于问答。

**权限要求**：Google Cloud 账号或服务账号须对目标 BigQuery 项目、数据集和表具有查询与读取权限。

**账号版本要求**：需要 Google Cloud 项目与 BigQuery 权限。依据云项目权限配置。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 BigQuery 连接。
- **Service account JSON**：填写或上传用于访问 BigQuery 的服务账号 JSON。
- **Project ID**：填写 Google Cloud 项目 ID。
- **Dataset**：填写数据集名称。
- **Table**：填写表名。
- **SQL query**：填写用于读取数据的 SQL 语句。
- **Content column**：选择要写入为文档内容的字段。
- **Metadata column**：选择要写入为元数据的字段。
- **ID column**：选择唯一 ID 字段。
- **Timestamp column**：选择用于判断增量更新的字段。
- **Sync deleted files**：启用后，可根据字段映射或清理任务，将已删除的记录从知识库索引中移除。

![BigQuery](/ragflow-images/BigQuery.jpg)

## GitHub

GitHub 数据源用于将 GitHub 仓库中的 issue 与 pull request 同步到 RAGFlow 知识库。配置后，即可查询开源项目资料、开发讨论与 issue 处理记录。

**权限要求**：GitHub token 须对目标仓库、issue 和 pull request 具有读取权限。

**账号版本要求**：个人仓库与组织仓库均可使用。组织私有仓库要求 token 具有对相应仓库、issue 和 pull request 的读取权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 GitHub 连接。
- **Repository owner**：填写 GitHub 仓库所有者。
- **Repository name**：填写 GitHub 仓库名称。
- **GitHub access token**：填写 GitHub 的 access token。
- **Include Pull Requests**：选择是否同步 pull request。
- **Include Issues**：选择是否同步 issue。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![GitHub](/ragflow-images/GitHub.jpg)

## GitLab

GitLab 数据源用于将 GitLab 仓库、issue、merge request 与代码文件同步到 RAGFlow 知识库。配置后，项目开发记录与代码相关知识即可被统一查询。

**权限要求**：GitLab access token 须对目标项目、issue、merge request 和仓库文件具有读取权限。

**账号版本要求**：个人项目与群组项目均可使用。私有群组项目要求 token 具有相应的读取权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 GitLab 连接。
- **GitLab instance URL**：填写 GitLab 服务地址。
- **Project ID or path**：填写 GitLab 项目 ID 或项目路径。
- **Access token**：填写 GitLab 的 access token。
- **Include merge requests**：选择是否同步 merge request。
- **Include issues**：选择是否同步 issue。
- **Include repository files**：选择是否同步仓库文件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![GitLab](/ragflow-images/GitLab.jpg)

## Bitbucket

Bitbucket 数据源用于将 Bitbucket 仓库内容、issue 与 pull request 同步到 RAGFlow 知识库。配置后，即可查询团队代码协作记录。

**权限要求**：Bitbucket 账号、应用密码（app password）或 token 须对目标工作区和仓库具有读取权限。

**账号版本要求**：个人工作区与团队工作区均可使用。私有仓库需要具有读取权限的授权。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Bitbucket 连接。
- **Workspace**：填写 Bitbucket 工作区名称。
- **Repository slug**：填写 Bitbucket 仓库标识（slug）。
- **Username**：填写 Bitbucket 用户名。
- **App password or access token**：填写用于访问 Bitbucket 的凭据。
- **Include pull requests**：选择是否同步 pull request。
- **Include issues**：选择是否同步 issue。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Bitbucket](/ragflow-images/Bitbucket.jpg)

## Azure DevOps

Azure DevOps 数据源用于将 Azure Repos 源码文件与 pull request 同步到 RAGFlow 知识库。配置后，即可查询仓库内容与代码评审历史。

**权限要求**：个人访问令牌（PAT）须具有目标组织的 **Code (Read)** 权限范围。

**账号版本要求**：同时支持 Azure DevOps Services（`dev.azure.com`）与自托管的 Azure DevOps Server。对于自托管服务器，请以完整集合 URL 作为组织填写，例如 `https://tfs.contoso.com/DefaultCollection`。该 URL 必须使用 HTTPS，因为个人访问令牌会放在 `Authorization` 请求头中发送。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Azure DevOps 连接。
- **Azure DevOps Personal Access Token**：用于访问该组织的 PAT。
- **Azure DevOps Organization**：组织名称，或自托管服务器的集合 URL。
- **Index Mode**：选择是为组织内全部仓库建立索引，还是仅为所选团队项目或所选仓库建立索引。
- **Projects**：以逗号分隔的团队项目名称，按项目索引时使用。
- **Repositories**：以逗号分隔的仓库，按仓库索引时使用。跨项目同名仓库可用 `project/repo` 加以区分。
- **Content Types**：选择建立索引的内容为源码文件、pull request，或两者。

当 pull request 描述达到列表接口 400 字符的截断上限时，连接器会单独重新拉取该描述，因此长描述能够完整建立索引。已完成与已放弃的 pull request 按其关闭日期过滤；活跃的 pull request 则始终重新建立索引，因为 Azure DevOps 不为它们提供可靠的“最后更新”时间戳。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

构建产物目录以及 `node_modules`、`bin`、`obj`、`dist`、`vendor` 等第三方依赖目录会被跳过，同时被跳过的还有二进制文件与大于 1 MB 的文件。

## Jira

Jira 数据源用于将 Jira 中的 issue、评论与项目记录同步到 RAGFlow 知识库。配置后，即可查询项目任务、需求、缺陷与处理记录。

**权限要求**：Jira 账号或 API token 须对目标项目和 issue 具有读取权限。

**账号版本要求**：可使用 Jira Cloud 以及 Jira Server 或 Data Center。企业项目要求账号具有对应项目的访问权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Jira 连接。
- **Jira base URL**：填写 Jira 站点地址。
- **Email or username**：填写 Jira 账号。
- **API token or password**：填写 Jira 的 API token 或密码。
- **Project key**：填写需要同步的 Jira 项目 key。
- **JQL**：填写用于限定同步范围的 JQL 条件。
- **Sync comments**：选择是否同步 issue 评论。
- **Sync attachments**：选择是否同步附件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Jira](/ragflow-images/Jira.jpg)

## Asana

Asana 数据源用于将 Asana 中的任务、项目与评论同步到 RAGFlow 知识库。配置后，即可查询团队任务记录与项目进展。

**权限要求**：Asana 账号或 access token 须对目标工作区、项目和任务具有读取权限。

**账号版本要求**：个人项目与组织工作区均可使用。组织工作区要求账号具有目标项目的访问权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Asana 连接。
- **Access token**：填写 Asana 的 access token。
- **Workspace ID**：填写 Asana 工作区 ID。
- **Project ID**：填写需要同步的 Asana 项目 ID。
- **Sync comments**：选择是否同步任务评论。
- **Sync attachments**：选择是否同步附件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Asana](/ragflow-images/Asana.jpg)

## Gmail

Gmail 数据源用于将 Gmail 邮件内容同步到 RAGFlow 知识库。配置后，客服邮件、商务往来与历史沟通记录即可被查询和复用。

**权限要求**：Google OAuth 授权须对目标邮箱的邮件具有读取权限。

**账号版本要求**：当前界面包含主管理员邮箱与 OAuth JSON，更适合 Google Workspace 管理员或组织邮箱同步。普通个人 Gmail 建议待实际授权流程支持后再使用。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Gmail 连接。
- **Primary administrator email**：填写 Google Workspace 管理员邮箱。
- **OAuth JSON**：填写或上传用于 Gmail 授权的 OAuth JSON。
- **User email**：填写需要同步的邮箱地址。
- **Label or folder**：填写需要同步的 Gmail 标签或文件夹范围。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

![Gmail](/ragflow-images/Gmail.jpg)

## Outlook

Outlook 数据源用于将 Outlook 邮箱中的邮件同步到 RAGFlow 知识库。配置后，即可查询 Microsoft 365 中的商务邮件与沟通记录。

**权限要求**：Microsoft 账号或应用授权须对目标邮箱的邮件具有读取权限。

**账号版本要求**：推荐使用 Microsoft 365 或 Outlook 组织账号。个人 Outlook 能否使用取决于授权流程与 API 权限是否可用。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Outlook 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Mailbox address**：填写需要同步的邮箱地址。
- **Folder**：填写需要同步的邮件文件夹。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

![Outlook](/ragflow-images/Outlook.jpg)

## IMAP

IMAP 数据源用于将支持 IMAP 协议的邮件服务中的邮件内容同步到 RAGFlow 知识库。配置后，标准邮件连接器未覆盖的邮箱也能纳入知识库检索。

**权限要求**：邮箱账号须启用 IMAP，并对目标文件夹具有读取权限。

**账号版本要求**：个人邮箱与企业邮箱均可使用，只要邮件服务支持 IMAP 登录且账号具有所需权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 IMAP 连接。
- **IMAP server**：填写 IMAP 服务器地址。
- **Port**：填写 IMAP 端口。
- **Username**：填写邮箱用户名。
- **Password or authorization code**：填写邮箱密码或应用授权码。
- **Mailbox folder**：填写需要同步的文件夹。
- **SSL/TLS**：选择是否启用安全连接。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

![IMAP](/ragflow-images/IMAP.jpg)

## Microsoft Teams

Microsoft Teams 数据源用于将 Teams 频道消息及相关协作记录同步到 RAGFlow 知识库。配置后，团队讨论内容即可被检索和复用。

**权限要求**：Microsoft 账号或应用授权须对目标团队、频道和消息具有读取权限。

**账号版本要求**：需要 Microsoft 365 组织账号与 Teams 权限。个人账号一般不适用。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Microsoft Teams 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Team ID**：填写需要同步的 Teams 团队 ID。
- **Channel ID**：填写需要同步的频道 ID。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

![Microsoft Teams](/ragflow-images/Microsoft_Teams.jpg)

## Slack

Slack 数据源用于将 Slack 频道消息与协作内容同步到 RAGFlow 知识库。配置后，团队沟通记录即可被检索和查询。

**权限要求**：Slack 应用或 token 须对目标工作区和频道具有读取权限。

**账号版本要求**：个人工作区与企业工作区均可使用。私有频道需先将应用邀请进频道，或为其授予相应权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Slack 连接。
- **Slack bot token**：填写 Slack bot token。
- **Workspace ID**：填写 Slack 工作区 ID。
- **Channel IDs**：填写需要同步的频道。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

![Slack](/ragflow-images/Slack.jpg)

## Discord

Discord 数据源用于将 Discord 服务器与频道消息同步到 RAGFlow 知识库。配置后，社区沟通记录即可被查询和分析。

**权限要求**：Discord bot 须具有读取目标服务器和频道的权限。

**账号版本要求**：个人服务器与社区服务器均可使用，只要 bot 已被添加到目标服务器并获授读取消息的权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Discord 连接。
- **Discord bot token**：填写 Discord bot 的 access token。
- **Server IDs**：填写需要同步的 Discord 服务器 ID 列表。
- **Channels**：填写需要同步的 Discord 频道 ID 或频道名称。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

![Discord](/ragflow-images/Discord.jpg)

## 钉钉 AI Table

钉钉 AI Table 数据源用于将钉钉 AI Table 中的记录同步到 RAGFlow 知识库。配置后，即可查询在线表格记录、业务台账与协作数据。

**权限要求**：钉钉账号或应用授权须对目标 AI Table 具有读取权限。

**账号版本要求**：需要钉钉组织账号与 AI Table 权限。能否同步取决于组织权限与应用授权。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此钉钉 AI Table 连接。
- **Application key**：填写钉钉应用 key。
- **Application secret**：填写钉钉应用 secret。
- **Table ID**：填写需要同步的 AI Table ID。
- **View ID**：填写需要同步的视图 ID。
- **Content field**：选择要写入为文档内容的字段。
- **Metadata field**：选择要写入为元数据的字段。
- **Sync deleted files**：启用后，被删除的记录会从知识库索引中移除。

![Dingtalk AI Table](/ragflow-images/Dingtalk_AI_Table.jpg)

## Zendesk

Zendesk 数据源用于将 Zendesk 工单、评论与知识库内容同步到 RAGFlow 知识库。配置后，客服记录与支持知识即可被统一查询。

**权限要求**：Zendesk 账号、API token 或应用授权须对目标工单和知识库内容具有读取权限。

**账号版本要求**：可使用 Zendesk 团队版或企业版账号。账号须具有对目标工单或帮助中心内容的访问权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Zendesk 连接。
- **Subdomain**：填写 Zendesk 子域名。
- **Email**：填写 Zendesk 账号邮箱。
- **API token**：填写 Zendesk 的 API token。
- **Synchronization scope**：选择工单、帮助中心文章，或两者。
- **Batch size**：设置每批处理的记录数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

## Moodle

Moodle 数据源用于将 Moodle 中的课程内容、论坛、资源与学习记录同步到 RAGFlow 知识库。配置后，即可查询课程资料与教学记录。

**权限要求**：Moodle 账号或 token 须对目标课程、活动和资源具有读取权限。

**账号版本要求**：自建 Moodle 与组织 Moodle 平台均可使用。账号须具有目标课程的访问权限。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Moodle 连接。
- **Moodle site URL**：填写 Moodle 服务地址。
- **Access token**：填写 Moodle 的 access token。
- **Course ID**：填写需要同步的课程 ID。
- **Synchronization scope**：选择课程资源、论坛、作业或其他内容。
- **Batch size**：设置每批处理的记录数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![Moodle](/ragflow-images/Moodle.jpg)

## REST API

REST API 数据源用于将自定义业务 API 返回的数据同步到 RAGFlow 知识库。配置后，内部系统或第三方系统中的记录即可按 API 结构进入知识库。

**权限要求**：API 凭据须具有调用目标 API 的权限，且 API 返回的数据须可读。

**账号版本要求**：个人或企业自定义系统均可使用，前提是目标 API 可访问，并提供稳定的数据结构与认证方式。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 REST API 连接。
- **Request URL**：填写 API 请求地址。
- **Request method**：选择 GET、POST 或其他请求方法。
- **Request headers**：填写 API 认证或请求所需的请求头信息。
- **Request body**：当 POST 或其他方法需要时，填写请求体。
- **Pagination method**：配置分页方式，确保能够持续读取下一页数据。
- **Content field**：指定 API 返回的内容字段。
- **Metadata field**：指定 API 返回的元数据字段。
- **Unique ID field**：指定每条记录的唯一 ID 字段。
- **Sync deleted files**：启用后，会依据同步或清理任务将已删除的记录从知识库索引中移除。

![REST API](/ragflow-images/REST_API.jpg)

## Xquik

Xquik 数据源用于搜索公开的 X 帖子，并将每条匹配的帖子同步到 RAGFlow 知识库。可用它按关键词、话题标签、作者、语言或其他受支持的 X 搜索运算符检索帖子。

**权限要求**：请创建 [Xquik API key](https://docs.xquik.com/api-reference/authentication)。该 key 须具有访问 Search Tweets API 的权限。

**使用要求**：每条返回的帖子消耗 1 个 Xquik 额度（credit）。每次同步的规模由每页条数与最大页数限定。Xquik 是独立的第三方服务。

**配置参数**：

- **Name**：为此连接选择一个名称。
- **Xquik API key**：在密码输入框中输入 key。
- **X search query**：输入关键词、话题标签或 `from:username` 等运算符。
- **Result order**：选择 **Latest** 获取按时间排序的结果，或选择 **Top** 获取按排名排序的结果。
- **Posts per page**：设置每个 API 分页最多请求的帖子数。
- **Max pages**：每次同步在达到该页数后停止。
- **Batch size**：设置每批发送给 RAGFlow 的帖子数。

RAGFlow 会将每个增量同步窗口发送给 Xquik，以 `sinceTime`（包含边界）与 `untilTime`（排除边界）划定范围。游标分页会持续进行，直到没有剩余页面或达到所配置的最大页数。

## RSS

RSS 数据源用于将公开网站、博客、公告或产品动态订阅到 RAGFlow 知识库。配置后，知识库即可持续从订阅源获取新内容，方便用户统一查看与提问。

**权限要求**：订阅源须可访问。若订阅源受保护，请确保访问地址或凭据具有读取权限。

**账号版本要求**：公开订阅源通常可直接使用。若 RSS 地址受保护，请提供能够访问该订阅源的账号或访问地址。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 RSS 连接。
- **Feed URL**：填写需要同步页面上的 RSS 或 Atom 订阅地址。
- **Batch size**：设置每批处理的订阅条目数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

![RSS](/ragflow-images/RSS.jpg)

## Sitemap

Sitemap 数据源用于将公开 `sitemap.xml` 中列出的网页同步到 RAGFlow 知识库。它是无需编写爬虫即可为文档站点、企业官网或博客建立索引的最简单方式：站点自身会声明存在哪些页面以及各页面的最后修改时间。

**权限要求**：sitemap 及其列出的页面必须能从 RAGFlow 服务器通过 HTTP 或 HTTPS 访问。不使用任何凭据。每个请求都会经 SSRF 防护检查，因此私有地址或回环地址会被拒绝。

**账号版本要求**：无。Sitemap 是公开的 XML 标准（[sitemaps.org](https://www.sitemaps.org/protocol.html)）；既支持普通 `urlset` 文件，也支持 `sitemapindex` 文件（递归跟随，最多 5 层）。

**配置参数**：

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Sitemap 连接。
- **Sitemap URL**：要抓取的 `sitemap.xml` 或 sitemap 索引的 URL，例如 `https://example.com/sitemap.xml`。
- **URL filter (regex)**：可选的正则表达式。只有匹配该正则的 URL 才会被建立索引，例如用 `^https://example\.com/docs/` 将同步限定在站点的某一板块。若没有 URL 匹配，连接测试会失败。正则长度上限为 512 个字符，`(a+)+` 之类的嵌套量词会被拒绝，并且以 1 秒超时对每个 URL 的前 4,096 个字符进行匹配求值。
- **Follow PDF links**：启用后，被抓取的 HTML 页面中链接到的 PDF 文件也会建立索引。即使多个页面都链接到同一 PDF，该 PDF 也只建立一次索引。
- **Restrict PDFs to sitemap domain**：启用（默认）时，仅跟随与 sitemap 同域的 PDF 链接。
- **User-Agent**：随每个请求发送的 `User-Agent` 请求头。留空则使用 `RAGFlow-SitemapConnector/1.0`。当目标站点过滤未知爬虫时请设置此项。
- **Batch size**：每批抓取并发送给 RAGFlow 的页面数。
- **Sync deleted files**：启用后，从 sitemap 中移除的页面会从知识库索引中移除。

每个请求都会经过 SSRF 防护，且解析得到的地址在请求期间保持固定；响应体上限为 64 MB；每次同步最多抓取 1000 个 sitemap 文档（每个 sitemap URL 抓取一次）。HTML 页面会以与其他网页连接器相同的样板内容剔除逻辑（`WEB_CONNECTOR_IGNORED_ELEMENTS`：默认剔除导航、页脚、侧边栏、脚本与样式）转换为 Markdown，并存储为 `.md` 文档。以 `Content-Type: application/pdf` 提供的 URL 会存储为 `.pdf` 文档，并交由常规 PDF 管道处理。每个文档都会在其元数据中保留页面 URL 与 sitemap URL；对于发现的 PDF，还会保留其来源父页面的 URL。

增量同步依赖 `<lastmod>` 元素：只有 `lastmod` 落在同步窗口内的页面才会被重新抓取，没有 `lastmod` 的页面仅在全量同步时抓取。每个文档还带有内容指纹，因此被重新抓取但内容未变化的页面会被跳过，而不会重新建立索引。
