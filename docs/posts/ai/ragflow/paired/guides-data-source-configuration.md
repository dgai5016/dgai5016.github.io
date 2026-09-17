<BiRow>
<template #en>

The Confluence data source is used to synchronize spaces, pages, and subpages maintained by a team in Confluence to a RAGFlow knowledge base. After configuration, users can query product documents, project descriptions, R&D standards, and other content in the knowledge base.

</template>
<template #zh>

Confluence 数据源用于将团队在 Confluence 中维护的空间、页面与子页面同步到 RAGFlow 知识库。配置后，用户即可在知识库中查询产品文档、项目说明、研发规范等内容。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: Read permissions for Confluence spaces or pages. If attachments or subpages need to be synchronized, read permissions for the corresponding content are also required.

</template>
<template #zh>

**权限要求**：需具有 Confluence 空间或页面的读取权限。如需同步附件或子页面，还须拥有相应内容的读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Personal spaces or free team spaces in Confluence Cloud can be used. If enterprise spaces, Server, or Data Center content is synchronized, access permissions for the corresponding organization space are required.

</template>
<template #zh>

**账号版本要求**：可使用 Confluence Cloud 中的个人空间或免费团队空间。如同步企业空间、Server 或 Data Center 内容，需拥有对应组织空间的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Confluence connection.
- **Confluence username**: Fill in the account used to access Confluence.
- **Confluence access token**: Fill in the access token used to access Confluence.
- **Wiki base URL**: Fill in the base address of the Confluence site.
- **Is cloud version**: Select according to the Confluence deployment type.
- **Index mode**: Select the synchronization scope. The options are **All**, **Space**, and **Page**.
- **Page ID**: Fill this in when the index mode is **Page**.
- **Space key**: Fill this in when the index mode is **Space**.
- **Recursive indexing**: Available when the index mode is **Page**. After it is enabled, the page and its subpages are synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![Confluence](/ragflow-images/Confluence.jpg)

</template>
<template #zh>

![Confluence](/ragflow-images/Confluence.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Notion

</template>
<template #zh>

## Notion

</template>
</BiRow>

<BiRow>
<template #en>

The Notion data source is used to synchronize Notion pages and database content to a RAGFlow knowledge base. After configuration, documents, project records, and knowledge cards organized by the team in Notion can be used for retrieval and Q&A.

</template>
<template #zh>

Notion 数据源用于将 Notion 页面与数据库内容同步到 RAGFlow 知识库。配置后，团队在 Notion 中整理的文档、项目记录与知识卡片即可用于检索和问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Notion integration must be granted access to the target page or database.

</template>
<template #zh>

**权限要求**：必须为 Notion 集成（integration）授予对目标页面或数据库的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both Notion personal pages and team spaces can be used. As long as the target page or database has been shared with the Notion integration, it can be synchronized to RAGFlow.

</template>
<template #zh>

**账号版本要求**：Notion 个人页面与团队空间均可使用。只要目标页面或数据库已共享给 Notion 集成，即可同步到 RAGFlow。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Notion connection.
- **Notion integration token**: Fill in the integration token used to access Notion.
- **Root page ID**: Fill in the root page ID that needs to be synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Notion 连接。
- **Notion integration token**：填写用于访问 Notion 的 integration token。
- **Root page ID**：填写需要同步的根页面 ID。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Notion](/ragflow-images/Notion.jpg)

</template>
<template #zh>

![Notion](/ragflow-images/Notion.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Google Drive

</template>
<template #zh>

## Google Drive

</template>
</BiRow>

<BiRow>
<template #en>

The Google Drive data source is used to synchronize files or folders in Google Drive to a RAGFlow knowledge base. After configuration, team cloud documents can be used directly for knowledge base retrieval and Q&A.

</template>
<template #zh>

Google Drive 数据源用于将 Google Drive 中的文件或文件夹同步到 RAGFlow 知识库。配置后，团队云文档即可直接用于知识库检索与问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Google account or OAuth authorization must have read permissions for the target files, shared folders, or cloud drives.

</template>
<template #zh>

**权限要求**：Google 账号或 OAuth 授权须对目标文件、共享文件夹或云盘具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Folders that a user is authorized to access in a personal Google Drive can be used. To synchronize organization shared folders or multi-user cloud drives, a Google Workspace administrator or an account with the corresponding authorization is usually required.

</template>
<template #zh>

**账号版本要求**：可使用个人 Google Drive 中用户被授权访问的文件夹。若要同步组织共享文件夹或多用户云盘，通常需要 Google Workspace 管理员或具有相应授权的账号。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Google Drive connection.
- **Primary administrator email**: Fill in the administrator email that has access to the target Drive content.
- **OAuth token JSON**: Fill in or upload the OAuth token JSON used to authorize Google Drive.
- **My Drive email**: Fill in the email address of the user whose **My Drive** needs to be indexed.
- **Shared folder URL**: Fill in the Google Drive shared folder URL that needs to be synchronized.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Google Drive 连接。
- **Primary administrator email**：填写有权访问目标 Drive 内容的管理员邮箱。
- **OAuth token JSON**：填写或上传用于授权 Google Drive 的 OAuth token JSON。
- **My Drive email**：填写需要对其 **My Drive** 建立索引的用户邮箱地址。
- **Shared folder URL**：填写需要同步的 Google Drive 共享文件夹 URL。

</template>
</BiRow>

<BiRow>
<template #en>

![Google Drive](/ragflow-images/Google_Drive.jpg)

</template>
<template #zh>

![Google Drive](/ragflow-images/Google_Drive.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Feishu Wiki

</template>
<template #zh>

## 飞书 Wiki

</template>
</BiRow>

<BiRow>
<template #en>

The Feishu Wiki data source is available with the Python backend. It recursively scans a configured Wiki subtree and imports matching downloadable `file` nodes. Native Feishu Docs, Sheets, Slides, and Bitable records are not imported directly, although the connector traverses non-file nodes to discover downloadable files below them.

</template>
<template #zh>

飞书 Wiki 数据源需在 Python 后端下使用。它会递归扫描所配置的 Wiki 子树，并导入符合条件的可下载 `file` 节点。飞书原生文档（Docs）、电子表格（Sheets）、幻灯片（Slides）与多维表格（Bitable）记录不会直接导入，但连接器会遍历非文件节点，以发现其下挂的可下载文件。

</template>
</BiRow>

<BiRow>
<template #en>

The Feishu custom app needs read-only Wiki and Drive permissions. Add the app to the target Wiki with permission to list nodes and download files.

</template>
<template #zh>

飞书自建应用需具有 Wiki 与 Drive 的只读权限。请将该应用添加到目标 Wiki，并授予列出节点和下载文件的权限。

</template>
</BiRow>

<BiRow>
<template #en>

The connector supports this file subset: `csv`, `doc`, `docx`, `eml`, `gif`, `html`, `jpeg`, `jpg`, `json`, `md`, `mdx`, `pdf`, `png`, `ppt`, `pptx`, `tif`, `txt`, `xls`, and `xlsx`.

</template>
<template #zh>

连接器支持以下文件扩展名子集：`csv`、`doc`、`docx`、`eml`、`gif`、`html`、`jpeg`、`jpg`、`json`、`md`、`mdx`、`pdf`、`png`、`ppt`、`pptx`、`tif`、`txt`、`xls` 与 `xlsx`。

</template>
</BiRow>

<BiRow>
<template #en>

Configure the following fields:

</template>
<template #zh>

请配置以下字段：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: A descriptive name for the connection in RAGFlow.
- **Feishu app ID** and **Feishu app secret**: Credentials for the Feishu custom app. The secret is masked in the form.
- **Wiki space ID**: The ID of the target Wiki space.
- **Wiki root node token**: The node whose descendants are scanned recursively.
- **Allowed file extensions**: An optional allow-list from the supported subset above. Leave it empty to allow the complete subset.
- **Required filename keywords**: An optional list. A filename must contain at least one configured keyword.
- **Excluded filename keywords**: An optional list. A matching filename is excluded.
- **Maximum file size (bytes)**: The largest file body the connector will accept. The default is `52428800` bytes (50 MiB). Both the declared content length and the streamed byte count are enforced.
- **Batch size**: The number of files sent to the ingestion pipeline per batch. The default is `2`; valid values are `1` through `10`.
- **Refresh interval**: The interval between periodic scans.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Extension and filename filters are applied before a file body is downloaded. Every periodic sync scans node metadata in the subtree, but downloads only matching files whose edit time falls within the completed sync window. An empty completed scan advances that window, so the same time interval is not treated as pending again.

</template>
<template #zh>

扩展名与文件名过滤会在下载文件内容之前应用。每次周期同步都会扫描子树内的节点元数据，但只下载编辑时间落在已完成同步窗口内的匹配文件。一次结果为空的已完成扫描会推进该窗口，因此同一时间段不会被再次视为待处理。

</template>
</BiRow>

<BiRow>
<template #en>

File downloads retry HTTP 429 responses up to three times. The connector honors the relative delay in seconds from Feishu's `x-ogw-ratelimit-reset` response header, with a minimum wait of one second. If the header is missing or invalid, retries wait one, two, then four seconds. A requested delay above 60 seconds stops the download instead of retrying before the server's reset. See [Feishu's rate-limit guide](https://open.feishu.cn/document/server-docs/api-call-guide/frequency-control).

</template>
<template #zh>

文件下载遇到 HTTP 429 响应时最多重试三次。连接器会遵循飞书 `x-ogw-ratelimit-reset` 响应头中给出的相对延迟秒数，最短等待一秒。若该响应头缺失或无效，重试将依次等待一秒、两秒、四秒。若要求的延迟超过 60 秒，则会停止下载，而不是在服务器重置前继续重试。参见[飞书频率限制指南](https://open.feishu.cn/document/server-docs/api-call-guide/frequency-control)。

</template>
</BiRow>

<BiRow>
<template #en>

Unsuccessful downloads raise a connector validation error with the HTTP status and, when available, Feishu's error code, message, and request log ID. Error-body parsing is limited to 8 KiB; diagnostic fields are length-limited and credentials are redacted. Successful file bodies, including JSON files, are imported unchanged. After retries are exhausted, the sync fails without advancing its successful window.

</template>
<template #zh>

下载失败会触发连接器校验错误，其中包含 HTTP 状态码，以及可用时飞书返回的错误码、错误信息与请求日志 ID。错误响应体的解析上限为 8 KiB；诊断字段有长度限制，凭据会被脱敏。下载成功的文件内容（包括 JSON 文件）将原样导入。重试次数耗尽后，本次同步失败，且不会推进其成功窗口。

</template>
</BiRow>

<BiRow>
<template #en>

Normal periodic sync does not propagate source deletions: deleting a file in Feishu does not immediately delete the imported RAGFlow document. A manual rebuild follows the existing delete-then-import behavior, so previously imported files that are no longer present or no longer match the filters can be removed during the rebuild.

</template>
<template #zh>

常规周期同步不会传播源端删除：在飞书中删除文件并不会立即删除已导入的 RAGFlow 文档。手动重建遵循既有的“先删除后导入”行为，因此已不存在或不再匹配过滤条件的既往导入文件，可在重建过程中被移除。

</template>
</BiRow>

<BiRow>
<template #en>

## OneDrive

</template>
<template #zh>

## OneDrive

</template>
</BiRow>

<BiRow>
<template #en>

The OneDrive data source is used to synchronize files in OneDrive or OneDrive for Business to a RAGFlow knowledge base. After configuration, personal or department cloud files can be queried in a unified way.

</template>
<template #zh>

OneDrive 数据源用于将 OneDrive 或 OneDrive for Business 中的文件同步到 RAGFlow 知识库。配置后，个人或部门云文件即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Microsoft account or application authorization must have read permissions for the target folders and files.

</template>
<template #zh>

**权限要求**：Microsoft 账号或应用授权须对目标文件夹和文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: This is usually configured for Microsoft 365 or Entra ID organization accounts. Personal OneDrive is generally not suitable for the current connection method based on tenant, client ID, and client secret.

</template>
<template #zh>

**账号版本要求**：此数据源通常面向 Microsoft 365 或 Entra ID 组织账号配置。个人 OneDrive 一般不适用当前这种基于 Tenant ID、Client ID 与 Client secret 的连接方式。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this OneDrive connection.
- **Tenant ID**: Fill in the Microsoft Entra ID tenant ID.
- **Client ID**: Fill in the client ID from the app registration.
- **Client secret**: Fill in the client secret from the app registration.
- **Folder path (optional)**: Fill in the OneDrive subfolder path.
- **Batch size**: Set the number of items processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 OneDrive 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Folder path (optional)**：填写 OneDrive 子文件夹路径。
- **Batch size**：设置每批处理的条目数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![OneDrive](/ragflow-images/OneDrive.jpg)

</template>
<template #zh>

![OneDrive](/ragflow-images/OneDrive.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## SharePoint

</template>
<template #zh>

## SharePoint

</template>
</BiRow>

<BiRow>
<template #en>

The SharePoint data source is used to synchronize SharePoint site document libraries to a RAGFlow knowledge base. After configuration, enterprise policies, department materials, and project files can be managed and queried in a unified way.

</template>
<template #zh>

SharePoint 数据源用于将 SharePoint 站点文档库同步到 RAGFlow 知识库。配置后，企业规章、部门资料与项目文件即可被统一管理和查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Microsoft account or application authorization must have read permissions for the target site, document library, and files.

</template>
<template #zh>

**权限要求**：Microsoft 账号或应用授权须对目标站点、文档库和文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: A Microsoft 365 or SharePoint organization site and Entra ID application authorization are required. Personal accounts are not applicable.

</template>
<template #zh>

**账号版本要求**：需要 Microsoft 365 或 SharePoint 组织站点以及 Entra ID 应用授权。个人账号不适用。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this SharePoint connection.
- **Site URL**: Fill in the complete URL of the SharePoint site.
- **Tenant ID**: Fill in the Microsoft Entra ID tenant ID.
- **Client ID**: Fill in the client ID from the app registration.
- **Client secret**: Fill in the client secret from the app registration.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 SharePoint 连接。
- **Site URL**：填写 SharePoint 站点的完整 URL。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![SharePoint](/ragflow-images/SharePoint.jpg)

</template>
<template #zh>

![SharePoint](/ragflow-images/SharePoint.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Box

</template>
<template #zh>

## Box

</template>
</BiRow>

<BiRow>
<template #en>

The Box data source is used to synchronize files and folders in Box cloud drive to a RAGFlow knowledge base. After configuration, enterprise cloud drive materials and externally collaborated files can be queried in a unified way.

</template>
<template #zh>

Box 数据源用于将 Box 云盘中的文件和文件夹同步到 RAGFlow 知识库。配置后，企业云盘资料与外部协作文件即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Box application or account must have read permissions for the target folders and files.

</template>
<template #zh>

**权限要求**：Box 应用或账号须对目标文件夹和文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal Box folders and enterprise Box spaces can be used. Enterprise spaces require the administrator or application authorization to allow access to the target folder.

</template>
<template #zh>

**账号版本要求**：个人 Box 文件夹与企业 Box 空间均可使用。企业空间需要管理员或应用授权允许访问目标文件夹。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Box connection.
- **Box OAuth configuration**: Fill in the Box OAuth configuration information.
- **Folder ID**: Fill in the Box folder ID that needs to be synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Box 连接。
- **Box OAuth configuration**：填写 Box OAuth 配置信息。
- **Folder ID**：填写需要同步的 Box 文件夹 ID。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Box](/ragflow-images/Box.jpg)

</template>
<template #zh>

![Box](/ragflow-images/Box.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Dropbox

</template>
<template #zh>

## Dropbox

</template>
</BiRow>

<BiRow>
<template #en>

The Dropbox data source is used to synchronize files and folders in Dropbox to a RAGFlow knowledge base. After configuration, cloud collaboration files can be used for knowledge base retrieval and Q&A.

</template>
<template #zh>

Dropbox 数据源用于将 Dropbox 中的文件和文件夹同步到 RAGFlow 知识库。配置后，云协作文件即可用于知识库检索与问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Dropbox application or account must have read permissions for the target folders and files.

</template>
<template #zh>

**权限要求**：Dropbox 应用或账号须对目标文件夹和文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal Dropbox and team Dropbox can be used. Team spaces require application authorization with read permissions for the target files or folders.

</template>
<template #zh>

**账号版本要求**：个人 Dropbox 与团队 Dropbox 均可使用。团队空间需要具有目标文件或文件夹读取权限的应用授权。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Dropbox connection.
- **Access token**: Fill in the Dropbox access token.
- **Batch size**: Set the number of files synchronized in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Dropbox 连接。
- **Access token**：填写 Dropbox 的 access token。
- **Batch size**：设置每批同步的文件数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Dropbox](/ragflow-images/Dropbox.jpg)

</template>
<template #zh>

![Dropbox](/ragflow-images/Dropbox.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## SeaFile

</template>
<template #zh>

## SeaFile

</template>
</BiRow>

<BiRow>
<template #en>

The SeaFile data source is used to synchronize account, library, or directory content in Seafile to a RAGFlow knowledge base. After configuration, private cloud drive materials and department files can be retrieved in a unified way.

</template>
<template #zh>

SeaFile 数据源用于将 Seafile 中的账号、资料库或目录内容同步到 RAGFlow 知识库。配置后，私有云盘资料与部门文件即可被统一检索。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The SeaFile account must have read permissions for the target libraries, directories, and files.

</template>
<template #zh>

**权限要求**：SeaFile 账号须对目标资料库、目录和文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal libraries and enterprise libraries can be used. When synchronizing shared libraries or specified directories, the corresponding library token or account permissions are required.

</template>
<template #zh>

**账号版本要求**：个人资料库与企业资料库均可使用。同步共享资料库或指定目录时，需要相应的资料库 token 或账号权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this SeaFile connection.
- **SeaFile server URL**: Fill in the SeaFile service address.
- **Synchronization scope**: Select the entire account, a single library, or a specified directory.
- **Account API token**: Fill in the account API token according to the synchronization scope.
- **Include shared libraries**: When synchronizing the entire account, select whether to include shared libraries.
- **Library token**: Fill this in when synchronizing a single library or specified directory.
- **Library ID**: Fill this in when synchronizing a single library or specified directory.
- **Directory path**: Fill this in when the synchronization scope is **Specified directory**.
- **Batch size**: Set the number of items processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![SeaFile](/ragflow-images/SeaFile.jpg)

</template>
<template #zh>

![SeaFile](/ragflow-images/SeaFile.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## S3

</template>
<template #zh>

## S3

</template>
</BiRow>

<BiRow>
<template #en>

The S3 data source is used to synchronize files in an object storage bucket to a RAGFlow knowledge base. After configuration, documents stored in the cloud or in private object storage can be uniformly included in knowledge base management.

</template>
<template #zh>

S3 数据源用于将对象存储桶中的文件同步到 RAGFlow 知识库。配置后，云端或私有对象存储中的文档即可统一纳入知识库管理。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The access key, IAM role, or compatible storage account must have bucket listing and object reading permissions.

</template>
<template #zh>

**权限要求**：访问密钥（access key）、IAM 角色或兼容存储账号须具有存储桶列举和对象读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: An AWS S3 or S3-compatible object storage account is required. This type of data source is determined by cloud account and bucket permissions, and does not distinguish between personal and enterprise editions.

</template>
<template #zh>

**账号版本要求**：需要 AWS S3 或兼容 S3 的对象存储账号。此类数据源取决于云账号与存储桶权限，不区分个人版与企业版。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this S3 connection.
- **Bucket name**: Fill in the bucket name that needs to be synchronized.
- **Region**: Fill in or select the region where the bucket is located.
- **Prefix**: Used to limit the synchronization path. Leave it empty to synchronize the entire bucket.
- **Mode**: Select **S3** or **S3 Compatible**.
- **Authentication method**: In S3 mode, select access key, IAM role, or AssumeRole.
- **AWS Access Key ID**: Fill this in when selecting access key or S3-compatible mode.
- **AWS Secret Access Key**: Fill this in when selecting access key or S3-compatible mode.
- **Role ARN**: Fill this in when using an IAM role or AssumeRole.
- **Addressing style**: Select virtual-hosted style or path style in S3-compatible mode.
- **Endpoint URL**: Fill in the endpoint address in S3-compatible mode.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

## Google Cloud Storage

</template>
<template #zh>

## Google Cloud Storage

</template>
</BiRow>

<BiRow>
<template #en>

The Google Cloud Storage data source is used to synchronize files in a GCS bucket to a RAGFlow knowledge base. After configuration, project materials, reports, and documents on Google Cloud can enter the knowledge base for team retrieval.

</template>
<template #zh>

Google Cloud Storage 数据源用于将 GCS 存储桶中的文件同步到 RAGFlow 知识库。配置后，Google Cloud 上的项目资料、报告与文档即可进入知识库供团队检索。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The GCS credentials must have listing and object reading permissions for the target bucket.

</template>
<template #zh>

**权限要求**：GCS 凭据须具有对目标存储桶的列举与对象读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Google Cloud project and bucket permissions are required. They are usually configured according to cloud project permissions, and do not distinguish between personal and enterprise editions.

</template>
<template #zh>

**账号版本要求**：需要 Google Cloud 项目与存储桶权限。通常依据云项目权限配置，不区分个人版与企业版。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Google Cloud Storage connection.
- **GCS access key ID**: Fill in the GCS access key ID.
- **GCS access key**: Fill in the GCS access key.
- **Bucket name**: Fill in the bucket name that needs to be synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Google Cloud Storage 连接。
- **GCS access key ID**：填写 GCS access key ID。
- **GCS access key**：填写 GCS access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Google Cloud Storage](/ragflow-images/Google_Cloud_Storage.jpg)

</template>
<template #zh>

![Google Cloud Storage](/ragflow-images/Google_Cloud_Storage.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Oracle Storage

</template>
<template #zh>

## Oracle Storage

</template>
</BiRow>

<BiRow>
<template #en>

The Oracle Storage data source is used to synchronize files in Oracle Cloud Object Storage to a RAGFlow knowledge base. After configuration, documents and archive materials stored on OCI can be retrieved in a unified way.

</template>
<template #zh>

Oracle Storage 数据源用于将 Oracle Cloud 对象存储中的文件同步到 RAGFlow 知识库。配置后，存储在 OCI 上的文档与归档资料即可被统一检索。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The OCI credentials must have listing and object reading permissions for the target bucket.

</template>
<template #zh>

**权限要求**：OCI 凭据须具有对目标存储桶的列举与对象读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Oracle Cloud tenancy and object storage permissions are required. They are usually configured according to cloud account permissions.

</template>
<template #zh>

**账号版本要求**：需要 Oracle Cloud 租户（tenancy）与对象存储权限。通常依据云账号权限配置。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Oracle Storage connection.
- **Namespace**: Fill in the OCI object storage namespace.
- **OCI region**: Fill in the OCI region.
- **OCI access key ID**: Fill in the OCI access key ID.
- **OCI access key**: Fill in the OCI access key.
- **Bucket name**: Fill in the bucket name that needs to be synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Oracle Storage 连接。
- **Namespace**：填写 OCI 对象存储的命名空间。
- **OCI region**：填写 OCI 区域。
- **OCI access key ID**：填写 OCI access key ID。
- **OCI access key**：填写 OCI access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Oracle Storage](/ragflow-images/Oracle_Storage.jpg)

</template>
<template #zh>

![Oracle Storage](/ragflow-images/Oracle_Storage.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## R2

</template>
<template #zh>

## R2

</template>
</BiRow>

<BiRow>
<template #en>

The R2 data source is used to synchronize files in a Cloudflare R2 bucket to a RAGFlow knowledge base. After configuration, public materials, business files, or historical documents stored in R2 can be queried in a unified way.

</template>
<template #zh>

R2 数据源用于将 Cloudflare R2 存储桶中的文件同步到 RAGFlow 知识库。配置后，存储在 R2 中的公开资料、业务文件或历史文档即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The R2 access key must have listing and object reading permissions for the target bucket.

</template>
<template #zh>

**权限要求**：R2 访问密钥须具有对目标存储桶的列举与对象读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: A Cloudflare account and R2 bucket permissions are required. Both personal and enterprise Cloudflare accounts can be used, depending on whether they have access to the target bucket.

</template>
<template #zh>

**账号版本要求**：需要 Cloudflare 账号与 R2 存储桶权限。个人与企业 Cloudflare 账号均可使用，视其是否具有目标存储桶的访问权限而定。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this R2 connection.
- **R2 account ID**: Fill in the Cloudflare account ID.
- **R2 access key ID**: Fill in the R2 access key ID.
- **R2 access key**: Fill in the R2 access key.
- **Bucket name**: Fill in the bucket name that needs to be synchronized.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 R2 连接。
- **R2 account ID**：填写 Cloudflare 账号 ID。
- **R2 access key ID**：填写 R2 access key ID。
- **R2 access key**：填写 R2 access key。
- **Bucket name**：填写需要同步的存储桶名称。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![R2](/ragflow-images/R2.jpg)

</template>
<template #zh>

![R2](/ragflow-images/R2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Azure Blob Storage

</template>
<template #zh>

## Azure Blob Storage

</template>
</BiRow>

<BiRow>
<template #en>

The Azure Blob Storage data source is used to synchronize files in an Azure Blob container to a RAGFlow knowledge base. After configuration, materials, reports, and archive files in an Azure cloud environment can be queried in a unified way.

</template>
<template #zh>

Azure Blob Storage 数据源用于将 Azure Blob 容器中的文件同步到 RAGFlow 知识库。配置后，Azure 云环境中的资料、报告与归档文件即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Azure credentials must have read permissions for the target container and blobs.

</template>
<template #zh>

**权限要求**：Azure 凭据须对目标容器与 Blob 具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: An Azure storage account, connection string, or SAS authorization is required. They are usually configured according to Azure subscription and storage container permissions.

</template>
<template #zh>

**账号版本要求**：需要 Azure 存储账号、连接字符串或 SAS 授权。通常依据 Azure 订阅与存储容器权限配置。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Azure Blob Storage connection.
- **Authentication mode**: Select account key, connection string, or SAS URL.
- **Account name**: Fill this in when using account key mode.
- **Account key**: Fill this in when using account key mode.
- **Connection string**: Fill this in when using connection string mode.
- **Container URL**: Fill this in when using SAS URL mode.
- **SAS token**: Fill this in when using SAS URL mode.
- **Container name**: Fill in the container name that needs to be synchronized.
- **Prefix (optional)**: Used to limit the synchronization path.
- **Batch size**: Set the number of files processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![Azure Blob Storage](/ragflow-images/Azure_Blob_Storage.jpg)

</template>
<template #zh>

![Azure Blob Storage](/ragflow-images/Azure_Blob_Storage.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## MySQL

</template>
<template #zh>

## MySQL

</template>
</BiRow>

<BiRow>
<template #en>

The MySQL data source is used to synchronize table records or query results in MySQL to a RAGFlow knowledge base. After configuration, structured business data can be used for retrieval and Q&A.

</template>
<template #zh>

MySQL 数据源用于将 MySQL 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，结构化业务数据即可用于检索与问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The database account must have SELECT permission on the target database tables. A read-only account is recommended.

</template>
<template #zh>

**权限要求**：数据库账号须对目标数据库表具有 SELECT 权限。建议使用只读账号。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal self-built databases and enterprise databases can be used. It is recommended to use a read-only account to connect to the target database tables.

</template>
<template #zh>

**账号版本要求**：个人自建数据库与企业数据库均可使用。建议使用只读账号连接目标数据库表。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this MySQL connection.
- **Host**: Fill in the database host address.
- **Port**: Fill in the database port.
- **Database**: Fill in the database name that needs to be synchronized.
- **Username**: Fill in the database username.
- **Password**: Fill in the database password.
- **SQL query**: Fill in the SQL statement used to read data.
- **Content column**: Select the field to be written as document content.
- **Metadata column**: Select the field to be written as metadata.
- **ID column**: Select the unique ID field.
- **Timestamp column**: Select the field used to determine incremental updates.
- **Sync deleted files**: After this is enabled, deleted records can be removed from the knowledge base index according to the field mapping or cleanup task.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![MySQL](/ragflow-images/MySQL.jpg)

</template>
<template #zh>

![MySQL](/ragflow-images/MySQL.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## PostgreSQL

</template>
<template #zh>

## PostgreSQL

</template>
</BiRow>

<BiRow>
<template #en>

The PostgreSQL data source is used to synchronize table records or query results in PostgreSQL to a RAGFlow knowledge base. After configuration, structured business data can be used for retrieval and Q&A.

</template>
<template #zh>

PostgreSQL 数据源用于将 PostgreSQL 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，结构化业务数据即可用于检索与问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The database account must have SELECT permission on the target database tables. A read-only account is recommended.

</template>
<template #zh>

**权限要求**：数据库账号须对目标数据库表具有 SELECT 权限。建议使用只读账号。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal self-built databases and enterprise databases can be used. It is recommended to use a read-only account to connect to the target database tables.

</template>
<template #zh>

**账号版本要求**：个人自建数据库与企业数据库均可使用。建议使用只读账号连接目标数据库表。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**: The configuration fields are the same as those for MySQL, including name, host, port, database, username, password, SQL query, content column, metadata column, ID column, timestamp column, and sync deleted files.

</template>
<template #zh>

**配置参数**：配置字段与 MySQL 相同，包括 name、host、port、database、username、password、SQL query、content column、metadata column、ID column、timestamp column 和 sync deleted files。

</template>
</BiRow>

<BiRow>
<template #en>

![PostgreSQL](/ragflow-images/PostgreSQL.jpg)

</template>
<template #zh>

![PostgreSQL](/ragflow-images/PostgreSQL.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## BigQuery

</template>
<template #zh>

## BigQuery

</template>
</BiRow>

<BiRow>
<template #en>

The BigQuery data source is used to synchronize table records or query results in BigQuery to a RAGFlow knowledge base. After configuration, structured data and analysis results in Google Cloud can be retrieved and used for Q&A.

</template>
<template #zh>

BigQuery 数据源用于将 BigQuery 中的表记录或查询结果同步到 RAGFlow 知识库。配置后，Google Cloud 中的结构化数据与分析结果即可被检索并用于问答。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Google Cloud account or service account must have query and read permissions for the target BigQuery project, dataset, and table.

</template>
<template #zh>

**权限要求**：Google Cloud 账号或服务账号须对目标 BigQuery 项目、数据集和表具有查询与读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Google Cloud project and BigQuery permissions are required. They are configured according to cloud project permissions.

</template>
<template #zh>

**账号版本要求**：需要 Google Cloud 项目与 BigQuery 权限。依据云项目权限配置。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this BigQuery connection.
- **Service account JSON**: Fill in or upload the service account JSON used to access BigQuery.
- **Project ID**: Fill in the Google Cloud project ID.
- **Dataset**: Fill in the dataset name.
- **Table**: Fill in the table name.
- **SQL query**: Fill in the SQL statement used to read data.
- **Content column**: Select the field to be written as document content.
- **Metadata column**: Select the field to be written as metadata.
- **ID column**: Select the unique ID field.
- **Timestamp column**: Select the field used to determine incremental updates.
- **Sync deleted files**: After this is enabled, deleted records can be removed from the knowledge base index according to the field mapping or cleanup task.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![BigQuery](/ragflow-images/BigQuery.jpg)

</template>
<template #zh>

![BigQuery](/ragflow-images/BigQuery.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## GitHub

</template>
<template #zh>

## GitHub

</template>
</BiRow>

<BiRow>
<template #en>

The GitHub data source is used to synchronize issues and pull requests in GitHub repositories to a RAGFlow knowledge base. After configuration, open-source project materials, development discussions, and issue handling records can be queried.

</template>
<template #zh>

GitHub 数据源用于将 GitHub 仓库中的 issue 与 pull request 同步到 RAGFlow 知识库。配置后，即可查询开源项目资料、开发讨论与 issue 处理记录。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The GitHub token must have read permissions for the target repositories, issues, and pull requests.

</template>
<template #zh>

**权限要求**：GitHub token 须对目标仓库、issue 和 pull request 具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal repositories and organization repositories can be used. Organization private repositories require the token to have read permissions for the corresponding repositories, issues, and pull requests.

</template>
<template #zh>

**账号版本要求**：个人仓库与组织仓库均可使用。组织私有仓库要求 token 具有对相应仓库、issue 和 pull request 的读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this GitHub connection.
- **Repository owner**: Fill in the GitHub repository owner.
- **Repository name**: Fill in the GitHub repository name.
- **GitHub access token**: Fill in the GitHub access token.
- **Include Pull Requests**: Select whether to synchronize pull requests.
- **Include Issues**: Select whether to synchronize issues.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 GitHub 连接。
- **Repository owner**：填写 GitHub 仓库所有者。
- **Repository name**：填写 GitHub 仓库名称。
- **GitHub access token**：填写 GitHub 的 access token。
- **Include Pull Requests**：选择是否同步 pull request。
- **Include Issues**：选择是否同步 issue。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![GitHub](/ragflow-images/GitHub.jpg)

</template>
<template #zh>

![GitHub](/ragflow-images/GitHub.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## GitLab

</template>
<template #zh>

## GitLab

</template>
</BiRow>

<BiRow>
<template #en>

The GitLab data source is used to synchronize GitLab repositories, issues, merge requests, and code files to a RAGFlow knowledge base. After configuration, project development records and code-related knowledge can be queried in a unified way.

</template>
<template #zh>

GitLab 数据源用于将 GitLab 仓库、issue、merge request 与代码文件同步到 RAGFlow 知识库。配置后，项目开发记录与代码相关知识即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The GitLab access token must have read permissions for the target project, issues, merge requests, and repository files.

</template>
<template #zh>

**权限要求**：GitLab access token 须对目标项目、issue、merge request 和仓库文件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal projects and group projects can be used. Private group projects require the token to have the corresponding read permissions.

</template>
<template #zh>

**账号版本要求**：个人项目与群组项目均可使用。私有群组项目要求 token 具有相应的读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this GitLab connection.
- **GitLab instance URL**: Fill in the GitLab service address.
- **Project ID or path**: Fill in the GitLab project ID or project path.
- **Access token**: Fill in the GitLab access token.
- **Include merge requests**: Select whether to synchronize merge requests.
- **Include issues**: Select whether to synchronize issues.
- **Include repository files**: Select whether to synchronize repository files.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 GitLab 连接。
- **GitLab instance URL**：填写 GitLab 服务地址。
- **Project ID or path**：填写 GitLab 项目 ID 或项目路径。
- **Access token**：填写 GitLab 的 access token。
- **Include merge requests**：选择是否同步 merge request。
- **Include issues**：选择是否同步 issue。
- **Include repository files**：选择是否同步仓库文件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![GitLab](/ragflow-images/GitLab.jpg)

</template>
<template #zh>

![GitLab](/ragflow-images/GitLab.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Bitbucket

</template>
<template #zh>

## Bitbucket

</template>
</BiRow>

<BiRow>
<template #en>

The Bitbucket data source is used to synchronize Bitbucket repository content, issues, and pull requests to a RAGFlow knowledge base. After configuration, team code collaboration records can be queried.

</template>
<template #zh>

Bitbucket 数据源用于将 Bitbucket 仓库内容、issue 与 pull request 同步到 RAGFlow 知识库。配置后，即可查询团队代码协作记录。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Bitbucket account, app password, or token must have read permissions for the target workspace and repository.

</template>
<template #zh>

**权限要求**：Bitbucket 账号、应用密码（app password）或 token 须对目标工作区和仓库具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal workspaces and team workspaces can be used. Private repositories require authorization with read permissions.

</template>
<template #zh>

**账号版本要求**：个人工作区与团队工作区均可使用。私有仓库需要具有读取权限的授权。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Bitbucket connection.
- **Workspace**: Fill in the Bitbucket workspace name.
- **Repository slug**: Fill in the Bitbucket repository identifier.
- **Username**: Fill in the Bitbucket username.
- **App password or access token**: Fill in the credential used to access Bitbucket.
- **Include pull requests**: Select whether to synchronize pull requests.
- **Include issues**: Select whether to synchronize issues.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Bitbucket 连接。
- **Workspace**：填写 Bitbucket 工作区名称。
- **Repository slug**：填写 Bitbucket 仓库标识（slug）。
- **Username**：填写 Bitbucket 用户名。
- **App password or access token**：填写用于访问 Bitbucket 的凭据。
- **Include pull requests**：选择是否同步 pull request。
- **Include issues**：选择是否同步 issue。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Bitbucket](/ragflow-images/Bitbucket.jpg)

</template>
<template #zh>

![Bitbucket](/ragflow-images/Bitbucket.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Azure DevOps

</template>
<template #zh>

## Azure DevOps

</template>
</BiRow>

<BiRow>
<template #en>

The Azure DevOps data source is used to synchronize Azure Repos source files and pull requests to a RAGFlow knowledge base. After configuration, repository content and code review history can be queried.

</template>
<template #zh>

Azure DevOps 数据源用于将 Azure Repos 源码文件与 pull request 同步到 RAGFlow 知识库。配置后，即可查询仓库内容与代码评审历史。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The personal access token (PAT) must have the **Code (Read)** scope for the target organization.

</template>
<template #zh>

**权限要求**：个人访问令牌（PAT）须具有目标组织的 **Code (Read)** 权限范围。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both Azure DevOps Services (`dev.azure.com`) and self-hosted Azure DevOps Server are supported. For a self-hosted server, provide the full collection URL as the organization, for example `https://tfs.contoso.com/DefaultCollection`. The URL must use HTTPS, because the personal access token is sent in the `Authorization` header.

</template>
<template #zh>

**账号版本要求**：同时支持 Azure DevOps Services（`dev.azure.com`）与自托管的 Azure DevOps Server。对于自托管服务器，请以完整集合 URL 作为组织填写，例如 `https://tfs.contoso.com/DefaultCollection`。该 URL 必须使用 HTTPS，因为个人访问令牌会放在 `Authorization` 请求头中发送。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Azure DevOps connection.
- **Azure DevOps Personal Access Token**: The PAT used to access the organization.
- **Azure DevOps Organization**: The organization name, or the collection URL of a self-hosted server.
- **Index Mode**: Choose whether to index every repository in the organization, only selected team projects, or only selected repositories.
- **Projects**: Comma separated team project names, used when indexing by project.
- **Repositories**: Comma separated repositories, used when indexing by repository. Use `project/repo` to disambiguate repositories that share a name across projects.
- **Content Types**: Choose whether to index source files, pull requests, or both.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Azure DevOps 连接。
- **Azure DevOps Personal Access Token**：用于访问该组织的 PAT。
- **Azure DevOps Organization**：组织名称，或自托管服务器的集合 URL。
- **Index Mode**：选择是为组织内全部仓库建立索引，还是仅为所选团队项目或所选仓库建立索引。
- **Projects**：以逗号分隔的团队项目名称，按项目索引时使用。
- **Repositories**：以逗号分隔的仓库，按仓库索引时使用。跨项目同名仓库可用 `project/repo` 加以区分。
- **Content Types**：选择建立索引的内容为源码文件、pull request，或两者。

</template>
</BiRow>

<BiRow>
<template #en>

Pull request descriptions are re-fetched individually when they reach the 400
character limit the list endpoint truncates at, so long descriptions are indexed
in full. Completed and abandoned pull requests are filtered by their close date;
active ones are always re-indexed, because Azure DevOps exposes no dependable
"last updated" timestamp for them.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

当 pull request 描述达到列表接口 400 字符的截断上限时，连接器会单独重新拉取该描述，因此长描述能够完整建立索引。已完成与已放弃的 pull request 按其关闭日期过滤；活跃的 pull request 则始终重新建立索引，因为 Azure DevOps 不为它们提供可靠的“最后更新”时间戳。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

Build output and vendored directories such as `node_modules`, `bin`, `obj`, `dist`, and `vendor` are skipped, along with binary files and files larger than 1 MB.

</template>
<template #zh>

构建产物目录以及 `node_modules`、`bin`、`obj`、`dist`、`vendor` 等第三方依赖目录会被跳过，同时被跳过的还有二进制文件与大于 1 MB 的文件。

</template>
</BiRow>

<BiRow>
<template #en>

## Jira

</template>
<template #zh>

## Jira

</template>
</BiRow>

<BiRow>
<template #en>

The Jira data source is used to synchronize issues, comments, and project records in Jira to a RAGFlow knowledge base. After configuration, project tasks, requirements, bugs, and handling records can be queried.

</template>
<template #zh>

Jira 数据源用于将 Jira 中的 issue、评论与项目记录同步到 RAGFlow 知识库。配置后，即可查询项目任务、需求、缺陷与处理记录。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Jira account or API token must have read permissions for the target project and issues.

</template>
<template #zh>

**权限要求**：Jira 账号或 API token 须对目标项目和 issue 具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Jira Cloud and Jira Server or Data Center can be used. Enterprise projects require the account to have access permissions for the corresponding project.

</template>
<template #zh>

**账号版本要求**：可使用 Jira Cloud 以及 Jira Server 或 Data Center。企业项目要求账号具有对应项目的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Jira connection.
- **Jira base URL**: Fill in the Jira site address.
- **Email or username**: Fill in the Jira account.
- **API token or password**: Fill in the Jira API token or password.
- **Project key**: Fill in the Jira project key that needs to be synchronized.
- **JQL**: Fill in the JQL condition used to limit the synchronization scope.
- **Sync comments**: Select whether to synchronize issue comments.
- **Sync attachments**: Select whether to synchronize attachments.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Jira 连接。
- **Jira base URL**：填写 Jira 站点地址。
- **Email or username**：填写 Jira 账号。
- **API token or password**：填写 Jira 的 API token 或密码。
- **Project key**：填写需要同步的 Jira 项目 key。
- **JQL**：填写用于限定同步范围的 JQL 条件。
- **Sync comments**：选择是否同步 issue 评论。
- **Sync attachments**：选择是否同步附件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Jira](/ragflow-images/Jira.jpg)

</template>
<template #zh>

![Jira](/ragflow-images/Jira.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Asana

</template>
<template #zh>

## Asana

</template>
</BiRow>

<BiRow>
<template #en>

The Asana data source is used to synchronize tasks, projects, and comments in Asana to a RAGFlow knowledge base. After configuration, team task records and project progress can be queried.

</template>
<template #zh>

Asana 数据源用于将 Asana 中的任务、项目与评论同步到 RAGFlow 知识库。配置后，即可查询团队任务记录与项目进展。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Asana account or access token must have read permissions for the target workspace, project, and tasks.

</template>
<template #zh>

**权限要求**：Asana 账号或 access token 须对目标工作区、项目和任务具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal projects and organization workspaces can be used. Organization workspaces require the account to have access permissions for the target project.

</template>
<template #zh>

**账号版本要求**：个人项目与组织工作区均可使用。组织工作区要求账号具有目标项目的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Asana connection.
- **Access token**: Fill in the Asana access token.
- **Workspace ID**: Fill in the Asana workspace ID.
- **Project ID**: Fill in the Asana project ID that needs to be synchronized.
- **Sync comments**: Select whether to synchronize task comments.
- **Sync attachments**: Select whether to synchronize attachments.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Asana 连接。
- **Access token**：填写 Asana 的 access token。
- **Workspace ID**：填写 Asana 工作区 ID。
- **Project ID**：填写需要同步的 Asana 项目 ID。
- **Sync comments**：选择是否同步任务评论。
- **Sync attachments**：选择是否同步附件。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Asana](/ragflow-images/Asana.jpg)

</template>
<template #zh>

![Asana](/ragflow-images/Asana.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Gmail

</template>
<template #zh>

## Gmail

</template>
</BiRow>

<BiRow>
<template #en>

The Gmail data source is used to synchronize Gmail email content to a RAGFlow knowledge base. After configuration, customer service emails, business correspondence, and historical communication records can be queried and reused.

</template>
<template #zh>

Gmail 数据源用于将 Gmail 邮件内容同步到 RAGFlow 知识库。配置后，客服邮件、商务往来与历史沟通记录即可被查询和复用。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: Google OAuth authorization must have read permissions for the target mailbox emails.

</template>
<template #zh>

**权限要求**：Google OAuth 授权须对目标邮箱的邮件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: The current interface includes a primary administrator email and OAuth JSON, which is more suitable for Google Workspace administrators or organization mailbox synchronization. Ordinary personal Gmail is recommended only after the actual authorization flow supports it.

</template>
<template #zh>

**账号版本要求**：当前界面包含主管理员邮箱与 OAuth JSON，更适合 Google Workspace 管理员或组织邮箱同步。普通个人 Gmail 建议待实际授权流程支持后再使用。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Gmail connection.
- **Primary administrator email**: Fill in the Google Workspace administrator email.
- **OAuth JSON**: Fill in or upload the OAuth JSON used for Gmail authorization.
- **User email**: Fill in the mailbox address that needs to be synchronized.
- **Label or folder**: Fill in the Gmail label or folder scope that needs to be synchronized.
- **Batch size**: Set the number of emails processed in each batch.
- **Sync deleted files**: After this is enabled, emails deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Gmail 连接。
- **Primary administrator email**：填写 Google Workspace 管理员邮箱。
- **OAuth JSON**：填写或上传用于 Gmail 授权的 OAuth JSON。
- **User email**：填写需要同步的邮箱地址。
- **Label or folder**：填写需要同步的 Gmail 标签或文件夹范围。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Gmail](/ragflow-images/Gmail.jpg)

</template>
<template #zh>

![Gmail](/ragflow-images/Gmail.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Outlook

</template>
<template #zh>

## Outlook

</template>
</BiRow>

<BiRow>
<template #en>

The Outlook data source is used to synchronize Outlook mailbox emails to a RAGFlow knowledge base. After configuration, business emails and communication records in Microsoft 365 can be queried.

</template>
<template #zh>

Outlook 数据源用于将 Outlook 邮箱中的邮件同步到 RAGFlow 知识库。配置后，即可查询 Microsoft 365 中的商务邮件与沟通记录。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Microsoft account or application authorization must have read permissions for the target mailbox emails.

</template>
<template #zh>

**权限要求**：Microsoft 账号或应用授权须对目标邮箱的邮件具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Microsoft 365 or Outlook organization accounts are recommended. Personal Outlook depends on whether the authorization flow and API permissions are available.

</template>
<template #zh>

**账号版本要求**：推荐使用 Microsoft 365 或 Outlook 组织账号。个人 Outlook 能否使用取决于授权流程与 API 权限是否可用。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Outlook connection.
- **Tenant ID**: Fill in the Microsoft Entra ID tenant ID.
- **Client ID**: Fill in the client ID from the app registration.
- **Client secret**: Fill in the client secret from the app registration.
- **Mailbox address**: Fill in the mailbox address that needs to be synchronized.
- **Folder**: Fill in the mail folder that needs to be synchronized.
- **Batch size**: Set the number of emails processed in each batch.
- **Sync deleted files**: After this is enabled, emails deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Outlook 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Mailbox address**：填写需要同步的邮箱地址。
- **Folder**：填写需要同步的邮件文件夹。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Outlook](/ragflow-images/Outlook.jpg)

</template>
<template #zh>

![Outlook](/ragflow-images/Outlook.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## IMAP

</template>
<template #zh>

## IMAP

</template>
</BiRow>

<BiRow>
<template #en>

The IMAP data source is used to synchronize email content in mail services that support the IMAP protocol to a RAGFlow knowledge base. After configuration, mailboxes that are not covered by standard email connectors can also be included in knowledge base retrieval.

</template>
<template #zh>

IMAP 数据源用于将支持 IMAP 协议的邮件服务中的邮件内容同步到 RAGFlow 知识库。配置后，标准邮件连接器未覆盖的邮箱也能纳入知识库检索。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The mailbox account must enable IMAP and have read permissions for the target folder.

</template>
<template #zh>

**权限要求**：邮箱账号须启用 IMAP，并对目标文件夹具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Personal mailboxes and enterprise mailboxes can both be used, as long as the mail service supports IMAP login and the account has the required permissions.

</template>
<template #zh>

**账号版本要求**：个人邮箱与企业邮箱均可使用，只要邮件服务支持 IMAP 登录且账号具有所需权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this IMAP connection.
- **IMAP server**: Fill in the IMAP server address.
- **Port**: Fill in the IMAP port.
- **Username**: Fill in the mailbox username.
- **Password or authorization code**: Fill in the mailbox password or application authorization code.
- **Mailbox folder**: Fill in the folder that needs to be synchronized.
- **SSL/TLS**: Select whether to enable secure connection.
- **Batch size**: Set the number of emails processed in each batch.
- **Sync deleted files**: After this is enabled, emails deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 IMAP 连接。
- **IMAP server**：填写 IMAP 服务器地址。
- **Port**：填写 IMAP 端口。
- **Username**：填写邮箱用户名。
- **Password or authorization code**：填写邮箱密码或应用授权码。
- **Mailbox folder**：填写需要同步的文件夹。
- **SSL/TLS**：选择是否启用安全连接。
- **Batch size**：设置每批处理的邮件数。
- **Sync deleted files**：启用后，外部系统中被删除的邮件会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![IMAP](/ragflow-images/IMAP.jpg)

</template>
<template #zh>

![IMAP](/ragflow-images/IMAP.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Microsoft Teams

</template>
<template #zh>

## Microsoft Teams

</template>
</BiRow>

<BiRow>
<template #en>

The Microsoft Teams data source is used to synchronize Teams channel messages and related collaboration records to a RAGFlow knowledge base. After configuration, team discussion content can be retrieved and reused.

</template>
<template #zh>

Microsoft Teams 数据源用于将 Teams 频道消息及相关协作记录同步到 RAGFlow 知识库。配置后，团队讨论内容即可被检索和复用。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Microsoft account or application authorization must have read permissions for the target team, channel, and messages.

</template>
<template #zh>

**权限要求**：Microsoft 账号或应用授权须对目标团队、频道和消息具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Microsoft 365 organization accounts and Teams permissions are required. Personal accounts are generally not applicable.

</template>
<template #zh>

**账号版本要求**：需要 Microsoft 365 组织账号与 Teams 权限。个人账号一般不适用。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Microsoft Teams connection.
- **Tenant ID**: Fill in the Microsoft Entra ID tenant ID.
- **Client ID**: Fill in the client ID from the app registration.
- **Client secret**: Fill in the client secret from the app registration.
- **Team ID**: Fill in the Teams team ID that needs to be synchronized.
- **Channel ID**: Fill in the channel ID that needs to be synchronized.
- **Batch size**: Set the number of messages processed in each batch.
- **Sync deleted files**: After this is enabled, messages deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Microsoft Teams 连接。
- **Tenant ID**：填写 Microsoft Entra ID 租户 ID。
- **Client ID**：填写应用注册中的 client ID。
- **Client secret**：填写应用注册中的 client secret。
- **Team ID**：填写需要同步的 Teams 团队 ID。
- **Channel ID**：填写需要同步的频道 ID。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Microsoft Teams](/ragflow-images/Microsoft_Teams.jpg)

</template>
<template #zh>

![Microsoft Teams](/ragflow-images/Microsoft_Teams.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Slack

</template>
<template #zh>

## Slack

</template>
</BiRow>

<BiRow>
<template #en>

The Slack data source is used to synchronize Slack channel messages and collaboration content to a RAGFlow knowledge base. After configuration, team communication records can be retrieved and queried.

</template>
<template #zh>

Slack 数据源用于将 Slack 频道消息与协作内容同步到 RAGFlow 知识库。配置后，团队沟通记录即可被检索和查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Slack application or token must have read permissions for the target workspace and channels.

</template>
<template #zh>

**权限要求**：Slack 应用或 token 须对目标工作区和频道具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Both personal workspaces and enterprise workspaces can be used. Private channels require the application to be invited or granted the corresponding permissions.

</template>
<template #zh>

**账号版本要求**：个人工作区与企业工作区均可使用。私有频道需先将应用邀请进频道，或为其授予相应权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Slack connection.
- **Slack bot token**: Fill in the Slack bot token.
- **Workspace ID**: Fill in the Slack workspace ID.
- **Channel IDs**: Fill in the channels that need to be synchronized.
- **Batch size**: Set the number of messages processed in each batch.
- **Sync deleted files**: After this is enabled, messages deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Slack 连接。
- **Slack bot token**：填写 Slack bot token。
- **Workspace ID**：填写 Slack 工作区 ID。
- **Channel IDs**：填写需要同步的频道。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Slack](/ragflow-images/Slack.jpg)

</template>
<template #zh>

![Slack](/ragflow-images/Slack.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Discord

</template>
<template #zh>

## Discord

</template>
</BiRow>

<BiRow>
<template #en>

The Discord data source is used to synchronize Discord server and channel messages to a RAGFlow knowledge base. After configuration, community communication records can be queried and analyzed.

</template>
<template #zh>

Discord 数据源用于将 Discord 服务器与频道消息同步到 RAGFlow 知识库。配置后，社区沟通记录即可被查询和分析。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Discord bot must have permission to read the target servers and channels.

</template>
<template #zh>

**权限要求**：Discord bot 须具有读取目标服务器和频道的权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Personal servers and community servers can both be used, as long as the bot has been added to the target server and granted message reading permissions.

</template>
<template #zh>

**账号版本要求**：个人服务器与社区服务器均可使用，只要 bot 已被添加到目标服务器并获授读取消息的权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Discord connection.
- **Discord bot token**: Fill in the Discord bot access token.
- **Server IDs**: Fill in the list of Discord server IDs that need to be synchronized.
- **Channels**: Fill in the Discord channel IDs or channel names that need to be synchronized.
- **Batch size**: Set the number of messages processed in each batch.
- **Sync deleted files**: After this is enabled, messages deleted from the external system are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Discord 连接。
- **Discord bot token**：填写 Discord bot 的 access token。
- **Server IDs**：填写需要同步的 Discord 服务器 ID 列表。
- **Channels**：填写需要同步的 Discord 频道 ID 或频道名称。
- **Batch size**：设置每批处理的消息数。
- **Sync deleted files**：启用后，外部系统中被删除的消息会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Discord](/ragflow-images/Discord.jpg)

</template>
<template #zh>

![Discord](/ragflow-images/Discord.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Dingtalk AI Table

</template>
<template #zh>

## 钉钉 AI Table

</template>
</BiRow>

<BiRow>
<template #en>

The Dingtalk AI Table data source is used to synchronize records in Dingtalk AI Table to a RAGFlow knowledge base. After configuration, online table records, business ledgers, and collaborative data can be queried.

</template>
<template #zh>

钉钉 AI Table 数据源用于将钉钉 AI Table 中的记录同步到 RAGFlow 知识库。配置后，即可查询在线表格记录、业务台账与协作数据。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Dingtalk account or application authorization must have read permissions for the target AI Table.

</template>
<template #zh>

**权限要求**：钉钉账号或应用授权须对目标 AI Table 具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Dingtalk organization accounts and AI Table permissions are required. Whether it can be synchronized depends on the organization permissions and application authorization.

</template>
<template #zh>

**账号版本要求**：需要钉钉组织账号与 AI Table 权限。能否同步取决于组织权限与应用授权。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Dingtalk AI Table connection.
- **Application key**: Fill in the Dingtalk application key.
- **Application secret**: Fill in the Dingtalk application secret.
- **Table ID**: Fill in the AI Table ID that needs to be synchronized.
- **View ID**: Fill in the view ID that needs to be synchronized.
- **Content field**: Select the field to be written as document content.
- **Metadata field**: Select the field to be written as metadata.
- **Sync deleted files**: After this is enabled, deleted records are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此钉钉 AI Table 连接。
- **Application key**：填写钉钉应用 key。
- **Application secret**：填写钉钉应用 secret。
- **Table ID**：填写需要同步的 AI Table ID。
- **View ID**：填写需要同步的视图 ID。
- **Content field**：选择要写入为文档内容的字段。
- **Metadata field**：选择要写入为元数据的字段。
- **Sync deleted files**：启用后，被删除的记录会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Dingtalk AI Table](/ragflow-images/Dingtalk_AI_Table.jpg)

</template>
<template #zh>

![Dingtalk AI Table](/ragflow-images/Dingtalk_AI_Table.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Zendesk

</template>
<template #zh>

## Zendesk

</template>
</BiRow>

<BiRow>
<template #en>

The Zendesk data source is used to synchronize Zendesk tickets, comments, and knowledge base content to a RAGFlow knowledge base. After configuration, customer service records and support knowledge can be queried in a unified way.

</template>
<template #zh>

Zendesk 数据源用于将 Zendesk 工单、评论与知识库内容同步到 RAGFlow 知识库。配置后，客服记录与支持知识即可被统一查询。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Zendesk account, API token, or application authorization must have read permissions for the target tickets and knowledge base content.

</template>
<template #zh>

**权限要求**：Zendesk 账号、API token 或应用授权须对目标工单和知识库内容具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Zendesk team or enterprise accounts can be used. The account must have access permissions for the target tickets or help center content.

</template>
<template #zh>

**账号版本要求**：可使用 Zendesk 团队版或企业版账号。账号须具有对目标工单或帮助中心内容的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Zendesk connection.
- **Subdomain**: Fill in the Zendesk subdomain.
- **Email**: Fill in the Zendesk account email.
- **API token**: Fill in the Zendesk API token.
- **Synchronization scope**: Select tickets, help center articles, or both.
- **Batch size**: Set the number of records processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Zendesk 连接。
- **Subdomain**：填写 Zendesk 子域名。
- **Email**：填写 Zendesk 账号邮箱。
- **API token**：填写 Zendesk 的 API token。
- **Synchronization scope**：选择工单、帮助中心文章，或两者。
- **Batch size**：设置每批处理的记录数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

## Moodle

</template>
<template #zh>

## Moodle

</template>
</BiRow>

<BiRow>
<template #en>

The Moodle data source is used to synchronize course content, forums, resources, and learning records in Moodle to a RAGFlow knowledge base. After configuration, course materials and teaching records can be queried.

</template>
<template #zh>

Moodle 数据源用于将 Moodle 中的课程内容、论坛、资源与学习记录同步到 RAGFlow 知识库。配置后，即可查询课程资料与教学记录。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The Moodle account or token must have read permissions for the target courses, activities, and resources.

</template>
<template #zh>

**权限要求**：Moodle 账号或 token 须对目标课程、活动和资源具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Self-built Moodle and organization Moodle platforms can be used. The account must have access permissions for the target courses.

</template>
<template #zh>

**账号版本要求**：自建 Moodle 与组织 Moodle 平台均可使用。账号须具有目标课程的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Moodle connection.
- **Moodle site URL**: Fill in the Moodle service address.
- **Access token**: Fill in the Moodle access token.
- **Course ID**: Fill in the course ID that needs to be synchronized.
- **Synchronization scope**: Select course resources, forums, assignments, or other content.
- **Batch size**: Set the number of records processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Moodle 连接。
- **Moodle site URL**：填写 Moodle 服务地址。
- **Access token**：填写 Moodle 的 access token。
- **Course ID**：填写需要同步的课程 ID。
- **Synchronization scope**：选择课程资源、论坛、作业或其他内容。
- **Batch size**：设置每批处理的记录数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![Moodle](/ragflow-images/Moodle.jpg)

</template>
<template #zh>

![Moodle](/ragflow-images/Moodle.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## REST API

</template>
<template #zh>

## REST API

</template>
</BiRow>

<BiRow>
<template #en>

The REST API data source is used to synchronize data returned by custom business APIs to a RAGFlow knowledge base. After configuration, records in internal systems or third-party systems can enter the knowledge base according to the API structure.

</template>
<template #zh>

REST API 数据源用于将自定义业务 API 返回的数据同步到 RAGFlow 知识库。配置后，内部系统或第三方系统中的记录即可按 API 结构进入知识库。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The API credentials must have permission to call the target API, and the data returned by the API must be readable.

</template>
<template #zh>

**权限要求**：API 凭据须具有调用目标 API 的权限，且 API 返回的数据须可读。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Personal or enterprise custom systems can both be used, provided that the target API is accessible and provides a stable data structure and authentication method.

</template>
<template #zh>

**账号版本要求**：个人或企业自定义系统均可使用，前提是目标 API 可访问，并提供稳定的数据结构与认证方式。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this REST API connection.
- **Request URL**: Fill in the API request address.
- **Request method**: Select GET, POST, or another request method.
- **Request headers**: Fill in the header information required for API authentication or requests.
- **Request body**: Fill in the request body when POST or other methods require it.
- **Pagination method**: Configure the pagination method to ensure that the next page of data can be continuously read.
- **Content field**: Specify the content field returned by the API.
- **Metadata field**: Specify the metadata field returned by the API.
- **Unique ID field**: Specify the unique ID field of each record.
- **Sync deleted files**: After this is enabled, deleted records are removed from the knowledge base index according to the synchronization or cleanup task.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

![REST API](/ragflow-images/REST_API.jpg)

</template>
<template #zh>

![REST API](/ragflow-images/REST_API.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Xquik

</template>
<template #zh>

## Xquik

</template>
</BiRow>

<BiRow>
<template #en>

The Xquik data source searches public X posts and syncs each matching post into a RAGFlow knowledge base. Use it to retrieve posts by keyword, hashtag, author, language, or another supported X search operator.

</template>
<template #zh>

Xquik 数据源用于搜索公开的 X 帖子，并将每条匹配的帖子同步到 RAGFlow 知识库。可用它按关键词、话题标签、作者、语言或其他受支持的 X 搜索运算符检索帖子。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: Create an [Xquik API key](https://docs.xquik.com/api-reference/authentication). The key needs access to the Search Tweets API.

</template>
<template #zh>

**权限要求**：请创建 [Xquik API key](https://docs.xquik.com/api-reference/authentication)。该 key 须具有访问 Search Tweets API 的权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Usage requirements**: Each returned post uses 1 Xquik credit. The page size and maximum page count bound each sync. Xquik is an independent third-party service.

</template>
<template #zh>

**使用要求**：每条返回的帖子消耗 1 个 Xquik 额度（credit）。每次同步的规模由每页条数与最大页数限定。Xquik 是独立的第三方服务。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Choose a name for this connection.
- **Xquik API key**: Enter the key in the password field.
- **X search query**: Enter keywords, hashtags, or operators such as `from:username`.
- **Result order**: Select **Latest** for chronological results or **Top** for ranked results.
- **Posts per page**: Set the maximum posts requested per API page.
- **Max pages**: Stop each sync after this many pages.
- **Batch size**: Set the number of posts sent to RAGFlow per batch.

</template>
<template #zh>

- **Name**：为此连接选择一个名称。
- **Xquik API key**：在密码输入框中输入 key。
- **X search query**：输入关键词、话题标签或 `from:username` 等运算符。
- **Result order**：选择 **Latest** 获取按时间排序的结果，或选择 **Top** 获取按排名排序的结果。
- **Posts per page**：设置每个 API 分页最多请求的帖子数。
- **Max pages**：每次同步在达到该页数后停止。
- **Batch size**：设置每批发送给 RAGFlow 的帖子数。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow sends each incremental sync window to Xquik as inclusive `sinceTime` and exclusive `untilTime` bounds. Cursor pagination continues until no page remains or the configured maximum is reached.

</template>
<template #zh>

RAGFlow 会将每个增量同步窗口发送给 Xquik，以 `sinceTime`（包含边界）与 `untilTime`（排除边界）划定范围。游标分页会持续进行，直到没有剩余页面或达到所配置的最大页数。

</template>
</BiRow>

<BiRow>
<template #en>

## RSS

</template>
<template #zh>

## RSS

</template>
</BiRow>

<BiRow>
<template #en>

The RSS data source is used to subscribe public websites, blogs, announcements, or product updates to a RAGFlow knowledge base. After configuration, the knowledge base can continuously obtain new content from the subscription source, making it convenient for users to view and ask questions in a unified way.

</template>
<template #zh>

RSS 数据源用于将公开网站、博客、公告或产品动态订阅到 RAGFlow 知识库。配置后，知识库即可持续从订阅源获取新内容，方便用户统一查看与提问。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The subscription source must be accessible. If the subscription source is protected, make sure the access address or credentials have read permissions.

</template>
<template #zh>

**权限要求**：订阅源须可访问。若订阅源受保护，请确保访问地址或凭据具有读取权限。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: Public subscription sources can usually be used directly. If the RSS address is protected, provide an account or access address that can access the subscription source.

</template>
<template #zh>

**账号版本要求**：公开订阅源通常可直接使用。若 RSS 地址受保护，请提供能够访问该订阅源的账号或访问地址。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this RSS connection.
- **Feed URL**: Fill in the RSS or Atom subscription address on the page that needs to be synchronized.
- **Batch size**: Set the number of subscription entries processed in each batch.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 RSS 连接。
- **Feed URL**：填写需要同步页面上的 RSS 或 Atom 订阅地址。
- **Batch size**：设置每批处理的订阅条目数。
- **Sync deleted files**：启用后，外部系统中被删除的内容会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

![RSS](/ragflow-images/RSS.jpg)

</template>
<template #zh>

![RSS](/ragflow-images/RSS.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Sitemap

</template>
<template #zh>

## Sitemap

</template>
</BiRow>

<BiRow>
<template #en>

The Sitemap data source is used to synchronize the web pages listed in a public `sitemap.xml` to a RAGFlow knowledge base. It is the simplest way to index a documentation site, a corporate website, or a blog without writing a crawler: the site itself declares which pages exist and when they were last modified.

</template>
<template #zh>

Sitemap 数据源用于将公开 `sitemap.xml` 中列出的网页同步到 RAGFlow 知识库。它是无需编写爬虫即可为文档站点、企业官网或博客建立索引的最简单方式：站点自身会声明存在哪些页面以及各页面的最后修改时间。

</template>
</BiRow>

<BiRow>
<template #en>

**Permission requirements**: The sitemap and the pages it lists must be reachable over HTTP or HTTPS from the RAGFlow server. No credentials are used. Every request is checked by the SSRF guard, so private or loopback addresses are rejected.

</template>
<template #zh>

**权限要求**：sitemap 及其列出的页面必须能从 RAGFlow 服务器通过 HTTP 或 HTTPS 访问。不使用任何凭据。每个请求都会经 SSRF 防护检查，因此私有地址或回环地址会被拒绝。

</template>
</BiRow>

<BiRow>
<template #en>

**Account version requirements**: None. Sitemaps are a public XML standard ([sitemaps.org](https://www.sitemaps.org/protocol.html)); both plain `urlset` files and `sitemapindex` files (followed recursively, up to 5 levels) are supported.

</template>
<template #zh>

**账号版本要求**：无。Sitemap 是公开的 XML 标准（[sitemaps.org](https://www.sitemaps.org/protocol.html)）；既支持普通 `urlset` 文件，也支持 `sitemapindex` 文件（递归跟随，最多 5 层）。

</template>
</BiRow>

<BiRow>
<template #en>

**Configuration parameters**:

</template>
<template #zh>

**配置参数**：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: Customize the name in RAGFlow to identify this Sitemap connection.
- **Sitemap URL**: The URL of the `sitemap.xml` or sitemap index to crawl, for example `https://example.com/sitemap.xml`.
- **URL filter (regex)**: Optional regular expression. Only URLs matching it are indexed, for example `^https://example\.com/docs/` to restrict the sync to one section of the site. The connection test fails when no URL matches. The pattern is limited to 512 characters, nested quantifiers such as `(a+)+` are refused, and it is evaluated with a 1-second timeout against the first 4,096 characters of each URL.
- **Follow PDF links**: When enabled, PDF files linked from the crawled HTML pages are indexed as well. Each PDF is indexed once even when several pages link to it.
- **Restrict PDFs to sitemap domain**: When enabled (default), only PDF links hosted on the same domain as the sitemap are followed.
- **User-Agent**: The `User-Agent` header sent with every request. Leave empty to use `RAGFlow-SitemapConnector/1.0`. Set it when the target site filters unknown crawlers.
- **Batch size**: The number of pages fetched and sent to RAGFlow per batch.
- **Sync deleted files**: After this is enabled, pages removed from the sitemap are removed from the knowledge base index.

</template>
<template #zh>

- **Name**：在 RAGFlow 中自定义名称，用于标识此 Sitemap 连接。
- **Sitemap URL**：要抓取的 `sitemap.xml` 或 sitemap 索引的 URL，例如 `https://example.com/sitemap.xml`。
- **URL filter (regex)**：可选的正则表达式。只有匹配该正则的 URL 才会被建立索引，例如用 `^https://example\.com/docs/` 将同步限定在站点的某一板块。若没有 URL 匹配，连接测试会失败。正则长度上限为 512 个字符，`(a+)+` 之类的嵌套量词会被拒绝，并且以 1 秒超时对每个 URL 的前 4,096 个字符进行匹配求值。
- **Follow PDF links**：启用后，被抓取的 HTML 页面中链接到的 PDF 文件也会建立索引。即使多个页面都链接到同一 PDF，该 PDF 也只建立一次索引。
- **Restrict PDFs to sitemap domain**：启用（默认）时，仅跟随与 sitemap 同域的 PDF 链接。
- **User-Agent**：随每个请求发送的 `User-Agent` 请求头。留空则使用 `RAGFlow-SitemapConnector/1.0`。当目标站点过滤未知爬虫时请设置此项。
- **Batch size**：每批抓取并发送给 RAGFlow 的页面数。
- **Sync deleted files**：启用后，从 sitemap 中移除的页面会从知识库索引中移除。

</template>
</BiRow>

<BiRow>
<template #en>

Every request goes through the SSRF guard with the resolved address pinned for the duration of the request, response bodies are capped at 64 MB, and at most 1000 sitemap documents are fetched per sync (each sitemap URL once). HTML pages are converted to Markdown with the same boilerplate removal as the other web connectors (`WEB_CONNECTOR_IGNORED_ELEMENTS`: navigation, footer, aside, scripts and styles by default) and stored as `.md` documents. URLs served with `Content-Type: application/pdf` are stored as `.pdf` documents and processed by the regular PDF pipeline. Each document keeps the page URL, the sitemap URL, and, for discovered PDFs, the parent page URL in its metadata.

</template>
<template #zh>

每个请求都会经过 SSRF 防护，且解析得到的地址在请求期间保持固定；响应体上限为 64 MB；每次同步最多抓取 1000 个 sitemap 文档（每个 sitemap URL 抓取一次）。HTML 页面会以与其他网页连接器相同的样板内容剔除逻辑（`WEB_CONNECTOR_IGNORED_ELEMENTS`：默认剔除导航、页脚、侧边栏、脚本与样式）转换为 Markdown，并存储为 `.md` 文档。以 `Content-Type: application/pdf` 提供的 URL 会存储为 `.pdf` 文档，并交由常规 PDF 管道处理。每个文档都会在其元数据中保留页面 URL 与 sitemap URL；对于发现的 PDF，还会保留其来源父页面的 URL。

</template>
</BiRow>

<BiRow>
<template #en>

Incremental syncs rely on the `<lastmod>` element: only pages whose `lastmod` falls inside the sync window are fetched again, and pages without `lastmod` are only fetched by a full sync. Every document also carries a content fingerprint, so a page that is fetched again but has not changed is skipped instead of being re-indexed.

</template>
<template #zh>

增量同步依赖 `<lastmod>` 元素：只有 `lastmod` 落在同步窗口内的页面才会被重新抓取，没有 `lastmod` 的页面仅在全量同步时抓取。每个文档还带有内容指纹，因此被重新抓取但内容未变化的页面会被跳过，而不会重新建立索引。

</template>
</BiRow>
