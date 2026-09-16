# 数据源概览与页面管理

## 数据源概览

数据源用于连接外部系统，并将其文档、记录、邮件或消息同步到 RAGFlow 知识库。配置数据源后，用户可以减少手动上传文件的工作量，并在知识库中对外部系统的内容进行检索和问答。

## 数据源页面管理

### 进入数据源页面

从 **User Settings**（用户设置）进入 **Data Source**（数据源）页面。页面上方显示已连接的数据源，下方显示可添加的数据源。

![进入数据源页面](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/Enter_Data_Source_Page.jpg)

### 创建数据源连接

在可用数据源中选择需要连接的系统，系统会打开对应数据源的创建窗口。创建数据源时，通常需要完成以下操作：

1. 填写连接名称，用于在数据源页面和知识库中标识此连接。
2. 填写连接信息，如账号、token、地址、路径或存储范围。
3. 按需设置同步参数，如同步删除、刷新间隔、清理间隔和超时时间。
4. 点击 **Save**（保存），创建数据源连接。

不同数据源的创建窗口显示的字段各不相同，只需填写当前窗口中的字段。凭据、地址、空间、存储桶、数据库表等信息，应以对应外部系统中的实际配置为准。

![创建数据源连接](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/Create_Data_Source_Connection.jpg)

### 管理已连接的数据源

创建成功的数据源会显示在已连接数据源区域。每个连接会显示数据源类型、连接名称以及可用的操作按钮。

**Settings**（设置）：点击设置按钮，进入该数据源连接的设置页面，查看或修改连接参数。

**Delete**（删除）：点击删除按钮，删除该数据源连接。删除前，请确认该连接是否仍被某个知识库使用，以免影响后续同步。

区域说明：已连接数据源区域用于管理连接本身；可用数据源区域用于创建新的数据源连接。

### 设置已连接的数据源

点击已连接数据源右侧的设置按钮，进入该连接的设置页面。设置页面用于查看和维护当前连接的配置，适用于 token 过期、同步范围变化、需要调整刷新频率或同步结果异常等情形。

设置页面的常见字段包括：

- **Name**：当前数据源连接在 RAGFlow 中显示的名称。
- **Authentication information**：用于访问外部系统的账号、token、密钥或授权文件。
- **Synchronization scope**：需要读取的页面、文件夹、存储桶、数据库表、频道或项目范围。
- **Sync deleted files**：启用后，外部系统中删除的内容会在后续同步或清理任务中从知识库索引移除。
- **Refresh interval**：RAGFlow 检查外部系统新增或更新内容的间隔。
- **Cleanup interval**：RAGFlow 检查外部系统已删除内容的间隔。仅在启用 Sync deleted files 后生效。
- **Timeout**：单个连接或同步任务允许等待的最长时间。

修改完成后，点击 **Save**。新的配置将用于后续的同步任务。已同步到知识库的内容，会随下一次同步或清理任务逐步更新。

![设置已连接的数据源](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/Set_a_Connected_Data_Source.jpg)

### 查看已连接数据源的日志

数据源设置页面底部提供日志区域，用于查看与该连接相关的同步任务记录。日志可以帮助判断同步是否已执行、是否失败以及失败原因。

日志字段说明如下：

- **Start time**：同步任务开始的时间。
- **Status**：同步任务的执行结果，如成功、失败或进行中。
- **Knowledge base**：同步任务写入的知识库。
- **Task type**：例如初始同步、增量同步或清理任务。
- **Summary**：同步摘要或错误描述，用于排查权限、字段、网络、速率限制等问题。

如果日志为空，通常表示该数据源尚未被任何知识库使用，或尚未触发过同步任务。

![查看已连接数据源的日志](https://raw.githubusercontent.com/infiniflow/ragflow-docs/2ee87008723d56cb6ebf0e9c92f6ef2ad1a45254/images/View_Connected_Data_Source_Logs.jpg)
