<BiRow>
<template #en>

## Data Source Overview

</template>
<template #zh>

## 数据源概览

</template>
</BiRow>

<BiRow>
<template #en>

Data sources are used to connect external systems and synchronize their documents, records, emails, or messages to RAGFlow knowledge bases. After configuring a data source, users can reduce the workload of manually uploading files, and can retrieve and ask questions about content from external systems in the knowledge base.

</template>
<template #zh>

数据源用于连接外部系统，并将其文档、记录、邮件或消息同步到 RAGFlow 知识库。配置数据源后，用户可以减少手动上传文件的工作量，并在知识库中对外部系统的内容进行检索和问答。

</template>
</BiRow>

<BiRow>
<template #en>

## Data Source Page Management

</template>
<template #zh>

## 数据源页面管理

</template>
</BiRow>

<BiRow>
<template #en>

### Enter the Data Source Page

</template>
<template #zh>

### 进入数据源页面

</template>
</BiRow>

<BiRow>
<template #en>

Enter the **Data Source** page from **User Settings**. The upper part of the page displays connected data sources, and the lower part displays data sources that can be added.

</template>
<template #zh>

从 **User Settings**（用户设置）进入 **Data Source**（数据源）页面。页面上方显示已连接的数据源，下方显示可添加的数据源。

</template>
</BiRow>

<BiRow>
<template #en>

![Enter the Data Source Page](/ragflow-images/Enter_Data_Source_Page.jpg)

</template>
<template #zh>

![进入数据源页面](/ragflow-images/Enter_Data_Source_Page.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Create a Data Source Connection

</template>
<template #zh>

### 创建数据源连接

</template>
</BiRow>

<BiRow>
<template #en>

Select the system you need to connect from the available data sources. The system opens the creation window for the corresponding data source. When creating a data source, you usually need to complete the following operations:

</template>
<template #zh>

在可用数据源中选择需要连接的系统，系统会打开对应数据源的创建窗口。创建数据源时，通常需要完成以下操作：

</template>
</BiRow>

<BiRow>
<template #en>

1. Fill in the connection name, which is used to identify the connection on the data source page and in the knowledge base.
2. Fill in connection information such as the account, token, address, path, or storage scope.
3. Set synchronization parameters as needed, such as sync deletion, refresh interval, cleanup interval, and timeout.
4. Click **Save** to create the data source connection.

</template>
<template #zh>

1. 填写连接名称，用于在数据源页面和知识库中标识此连接。
2. 填写连接信息，如账号、token、地址、路径或存储范围。
3. 按需设置同步参数，如同步删除、刷新间隔、清理间隔和超时时间。
4. 点击 **Save**（保存），创建数据源连接。

</template>
</BiRow>

<BiRow>
<template #en>

Different data source creation windows display different fields. Users only need to fill in the fields in the current window. Credentials, addresses, spaces, buckets, database tables, and other information should be based on the actual configuration in the corresponding external system.

</template>
<template #zh>

不同数据源的创建窗口显示的字段各不相同，只需填写当前窗口中的字段。凭据、地址、空间、存储桶、数据库表等信息，应以对应外部系统中的实际配置为准。

</template>
</BiRow>

<BiRow>
<template #en>

![Create a Data Source Connection](/ragflow-images/Create_Data_Source_Connection.jpg)

</template>
<template #zh>

![创建数据源连接](/ragflow-images/Create_Data_Source_Connection.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Manage Connected Data Sources

</template>
<template #zh>

### 管理已连接的数据源

</template>
</BiRow>

<BiRow>
<template #en>

Successfully created data sources are displayed in the connected data source area. Each connection displays the data source type, connection name, and operation buttons that can be executed.

</template>
<template #zh>

创建成功的数据源会显示在已连接数据源区域。每个连接会显示数据源类型、连接名称以及可用的操作按钮。

</template>
</BiRow>

<BiRow>
<template #en>

**Settings**: Click the settings button to enter the settings page of the data source connection and view or modify connection parameters.

</template>
<template #zh>

**Settings**（设置）：点击设置按钮，进入该数据源连接的设置页面，查看或修改连接参数。

</template>
</BiRow>

<BiRow>
<template #en>

**Delete**: Click the delete button to delete the data source connection. Before deleting it, confirm whether the connection is still used by a knowledge base to avoid affecting subsequent synchronization.

</template>
<template #zh>

**Delete**（删除）：点击删除按钮，删除该数据源连接。删除前，请确认该连接是否仍被某个知识库使用，以免影响后续同步。

</template>
</BiRow>

<BiRow>
<template #en>

Area description: the connected data source area is used to manage the connection itself; the available data source area is used to create new data source connections.

</template>
<template #zh>

区域说明：已连接数据源区域用于管理连接本身；可用数据源区域用于创建新的数据源连接。

</template>
</BiRow>

<BiRow>
<template #en>

### Set a Connected Data Source

</template>
<template #zh>

### 设置已连接的数据源

</template>
</BiRow>

<BiRow>
<template #en>

Click the settings button on the right side of a connected data source to enter the settings page of that connection. The settings page is used to view and maintain the configuration of the current connection. It is suitable for use when a token expires, the synchronization scope changes, the refresh frequency needs to be adjusted, or the synchronization result is abnormal.

</template>
<template #zh>

点击已连接数据源右侧的设置按钮，进入该连接的设置页面。设置页面用于查看和维护当前连接的配置，适用于 token 过期、同步范围变化、需要调整刷新频率或同步结果异常等情形。

</template>
</BiRow>

<BiRow>
<template #en>

Common fields on the settings page include:

</template>
<template #zh>

设置页面的常见字段包括：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The name displayed for the current data source connection in RAGFlow.
- **Authentication information**: The account, token, key, or authorization file used to access the external system.
- **Synchronization scope**: The pages, folders, buckets, database tables, channels, or project scope that need to be read.
- **Sync deleted files**: After this is enabled, content deleted from the external system is removed from the knowledge base index during subsequent synchronization or cleanup tasks.
- **Refresh interval**: The interval at which RAGFlow checks the external system for newly added or updated content.
- **Cleanup interval**: The interval at which RAGFlow checks the external system for deleted content. It takes effect only when sync deleted files is enabled.
- **Timeout**: The maximum time that a single connection or synchronization task is allowed to wait.

</template>
<template #zh>

- **Name**：当前数据源连接在 RAGFlow 中显示的名称。
- **Authentication information**：用于访问外部系统的账号、token、密钥或授权文件。
- **Synchronization scope**：需要读取的页面、文件夹、存储桶、数据库表、频道或项目范围。
- **Sync deleted files**：启用后，外部系统中删除的内容会在后续同步或清理任务中从知识库索引移除。
- **Refresh interval**：RAGFlow 检查外部系统新增或更新内容的间隔。
- **Cleanup interval**：RAGFlow 检查外部系统已删除内容的间隔。仅在启用 Sync deleted files 后生效。
- **Timeout**：单个连接或同步任务允许等待的最长时间。

</template>
</BiRow>

<BiRow>
<template #en>

After completing the modification, click **Save**. The new configuration is used for subsequent synchronization tasks. Content that has already been synchronized to the knowledge base is gradually updated according to the next synchronization or cleanup task.

</template>
<template #zh>

修改完成后，点击 **Save**。新的配置将用于后续的同步任务。已同步到知识库的内容，会随下一次同步或清理任务逐步更新。

</template>
</BiRow>

<BiRow>
<template #en>

![Set a Connected Data Source](/ragflow-images/Set_a_Connected_Data_Source.jpg)

</template>
<template #zh>

![设置已连接的数据源](/ragflow-images/Set_a_Connected_Data_Source.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### View Connected Data Source Logs

</template>
<template #zh>

### 查看已连接数据源的日志

</template>
</BiRow>

<BiRow>
<template #en>

A log area is provided at the bottom of the data source settings page to view synchronization task records related to the connection. Logs can help determine whether synchronization has been executed, whether it failed, and the reason for failure.

</template>
<template #zh>

数据源设置页面底部提供日志区域，用于查看与该连接相关的同步任务记录。日志可以帮助判断同步是否已执行、是否失败以及失败原因。

</template>
</BiRow>

<BiRow>
<template #en>

Log fields are described as follows:

</template>
<template #zh>

日志字段说明如下：

</template>
</BiRow>

<BiRow>
<template #en>

- **Start time**: The time when the synchronization task started.
- **Status**: The execution result of the synchronization task, such as successful, failed, or in progress.
- **Knowledge base**: The knowledge base that the synchronization task writes to.
- **Task type**: For example, initial synchronization, incremental synchronization, or cleanup task.
- **Summary**: The synchronization summary or error description, used to troubleshoot permissions, fields, networks, rate limits, and other issues.

</template>
<template #zh>

- **Start time**：同步任务开始的时间。
- **Status**：同步任务的执行结果，如成功、失败或进行中。
- **Knowledge base**：同步任务写入的知识库。
- **Task type**：例如初始同步、增量同步或清理任务。
- **Summary**：同步摘要或错误描述，用于排查权限、字段、网络、速率限制等问题。

</template>
</BiRow>

<BiRow>
<template #en>

If the log is empty, it usually means that the data source has not been used by any knowledge base, or that no synchronization task has been triggered.

</template>
<template #zh>

如果日志为空，通常表示该数据源尚未被任何知识库使用，或尚未触发过同步任务。

</template>
</BiRow>

<BiRow>
<template #en>

![View Connected Data Source Logs](/ragflow-images/View_Connected_Data_Source_Logs.jpg)

</template>
<template #zh>

![查看已连接数据源的日志](/ragflow-images/View_Connected_Data_Source_Logs.jpg)

</template>
</BiRow>
