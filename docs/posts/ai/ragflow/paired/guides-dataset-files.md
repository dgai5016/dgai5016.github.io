<BiRow>
<template #en>

## Document Management Overview

</template>
<template #zh>

## 文档管理概览

</template>
</BiRow>

<BiRow>
<template #en>

Document management is used to upload, add, parse, search, filter, enable, disable, delete, and maintain documents in a dataset. Documents become retrievable content only after parsing generates chunks. On the document management page, you can complete the complete process from importing files to parsing, checking results, maintaining metadata, and maintaining chunks.

</template>
<template #zh>

文档管理用于在数据集中上传、添加、解析、搜索、筛选、启用、停用、删除和维护文档。文档只有在解析生成分块后，才会成为可检索的内容。在文档管理页面，可以完成从导入文件到解析、查看结果、维护元数据、维护分块的完整流程。

</template>
</BiRow>

<BiRow>
<template #en>

## Document List

</template>
<template #zh>

## 文档列表

</template>
</BiRow>

<BiRow>
<template #en>

The document list is used to view the basic status of each document in the current dataset. The main fields in the list include **Name**, **Size**, **Source**, **Enabled**, **Chunks**, **Metadata**, **Parse**, **Status**, and **Action**.

</template>
<template #zh>

文档列表用于查看当前数据集中各文档的基本状态。列表的主要字段包括**名称**、**大小**、**来源**、**启用**、**分块**、**元数据**、**解析**、**状态**和**操作**。

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The document name.
- **Size**: The document file size.
- **Source**: The document source, such as local upload, associated data source, or file management.
- **Enabled**: Whether the document participates in dataset retrieval. After a document is disabled, it remains in the dataset but is not used as a retrieval source.
- **Chunks**: The number of chunks generated for the document. A value of `0` usually means the document has not been parsed, parsing failed, or no usable content was produced after parsing.
- **Metadata**: The number of document-level metadata fields. Click this field to view or edit document metadata.
- **Parse**: Displays the current parsing method or provides entries related to adjusting the parsing method and starting parsing.
- **Status**: Displays the document parsing task status, used to determine whether the document is waiting for parsing, being parsed, parsed successfully, or failed.
- **Action**: Provides operations such as renaming the document, viewing information, downloading, and deleting.

</template>
<template #zh>

- **名称（Name）**：文档名称。
- **大小（Size）**：文档文件大小。
- **来源（Source）**：文档来源，例如本地上传、关联数据源或文件管理。
- **启用（Enabled）**：文档是否参与数据集检索。文档停用后仍保留在数据集中，但不会作为检索来源。
- **分块（Chunks）**：文档已生成的分块数量。值为 `0` 通常表示文档尚未解析、解析失败，或解析后没有产生可用内容。
- **元数据（Metadata）**：文档级元数据的字段数量。点击该字段可查看或编辑文档元数据。
- **解析（Parse）**：显示当前解析方法，或提供调整解析方法、启动解析等相关入口。
- **状态（Status）**：显示文档解析任务的状态，用于判断文档是等待解析、正在解析、解析成功还是解析失败。
- **操作（Action）**：提供重命名文档、查看信息、下载、删除等操作。

</template>
</BiRow>

<BiRow>
<template #en>

## Add Documents

</template>
<template #zh>

## 添加文档

</template>
</BiRow>

<BiRow>
<template #en>

### Upload Local Documents

</template>
<template #zh>

### 上传本地文档

</template>
</BiRow>

<BiRow>
<template #en>

Click **Add file** and select **Upload file** to upload documents from the local machine to the current dataset. After upload, the documents appear in the document list.

</template>
<template #zh>

点击**添加文件（Add file）**并选择**上传文件（Upload file）**，即可将本地文档上传到当前数据集。上传完成后，文档会出现在文档列表中。

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to the **Files** page of the target dataset.
2. Click **Add file** and select **Upload file**.
3. Select the local documents to add to the dataset.
4. Choose whether to enable **Parse on creation** as needed.
5. After confirming the upload, view the document status in the document list.

</template>
<template #zh>

1. 进入目标数据集的**文件（Files）**页面。
2. 点击**添加文件**并选择**上传文件**。
3. 选择要添加到数据集的本地文档。
4. 按需选择是否启用**创建时解析（Parse on creation）**。
5. 确认上传后，在文档列表中查看文档状态。

</template>
</BiRow>

<BiRow>
<template #en>

### Add Documents from an Associated Data Source

</template>
<template #zh>

### 从关联数据源添加文档

</template>
</BiRow>

<BiRow>
<template #en>

If a dataset has already been associated with an external data source in configuration, documents in the data source can be added to the dataset from the document management page. After addition, the documents enter the dataset document list. They still need to complete parsing before generating chunks, metadata, and retrieval content.

</template>
<template #zh>

如果数据集已在配置中关联外部数据源，可以从文档管理页面将数据源中的文档添加到数据集。添加后，文档会进入数据集的文档列表，仍需完成解析才能生成分块、元数据和检索内容。

</template>
</BiRow>

<BiRow>
<template #en>

Operation steps:

</template>
<template #zh>

操作步骤：

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to the **Files** page of the target dataset.
2. Click **Add file** and select the associated data source entry.
3. Select the documents to add.
4. Confirm the addition and view the document status in the document list.

</template>
<template #zh>

1. 进入目标数据集的**文件**页面。
2. 点击**添加文件**，选择关联数据源入口。
3. 选择要添加的文档。
4. 确认添加，并在文档列表中查看文档状态。

</template>
</BiRow>

<BiRow>
<template #en>

### Add Documents from File

</template>
<template #zh>

### 从文件管理添加文档

</template>
</BiRow>

<BiRow>
<template #en>

Add documents from File Management

</template>
<template #zh>

从文件管理添加文档

</template>
</BiRow>

<BiRow>
<template #en>

Files that have already been uploaded to **File** can be added to a knowledge base by connecting them to the target knowledge base.
Once connected, the files will be processed according to the configuration of the target knowledge base.
For detailed instructions, see [**File > Connect to a knowledge base**](https://ragflow.io/docs/guides/file/link_dataset)

</template>
<template #zh>

已上传到**文件管理（File）**的文件，可以通过连接目标知识库的方式添加到知识库。
连接后，文件将按目标知识库的配置进行处理。
详细操作参见[**文件管理 > 连接到知识库**](https://ragflow.io/docs/guides/file/link_dataset)

</template>
</BiRow>

<BiRow>
<template #en>

## Parse Documents

</template>
<template #zh>

## 解析文档

</template>
</BiRow>

<BiRow>
<template #en>

Document parsing converts source files into chunks, metadata, and other data available for retrieval. By default, documents use the current dataset configuration's parsing method. For documents that require special handling, you can also change the parsing method of a single document.

</template>
<template #zh>

文档解析将源文件转换为分块、元数据等可用于检索的数据。默认情况下，文档采用当前数据集配置中的解析方法；对于需要特殊处理的文档，也可以单独更改该文档的解析方法。

</template>
</BiRow>

<BiRow>
<template #en>

### Start Parsing

</template>
<template #zh>

### 开始解析

</template>
</BiRow>

<BiRow>
<template #en>

You can start parsing after documents are uploaded or added.

</template>
<template #zh>

文档上传或添加完成后即可开始解析。

</template>
</BiRow>

<BiRow>
<template #en>

1. Select one or more documents in the document list.
2. Click **Run** or the corresponding parsing entry.
3. If the document has old chunks or existing auto metadata, handle them according to the interface prompt.
4. After confirming the operation, the system starts the parsing task.

</template>
<template #zh>

1. 在文档列表中选择一个或多个文档。
2. 点击**运行（Run）**或相应的解析入口。
3. 若文档已有旧分块或已生成的自动元数据，需按界面提示处理。
4. 确认操作后，系统启动解析任务。

</template>
</BiRow>

<BiRow>
<template #en>

### View Parsing Status

</template>
<template #zh>

### 查看解析状态

</template>
</BiRow>

<BiRow>
<template #en>

You can view the current parsing status of each document in the document list and view parsing progress and related information through **Logs**. Common statuses include waiting, running, completed, failed, and canceled.

</template>
<template #zh>

可在文档列表中查看各文档的当前解析状态，并通过**日志（Logs）**查看解析进度及相关信息。常见状态包括等待中、运行中、已完成、失败、已取消。

</template>
</BiRow>

<BiRow>
<template #en>

If parsing fails, view the related information in **Logs**, troubleshoot the problem, and run parsing again.

</template>
<template #zh>

若解析失败，可在**日志**中查看相关信息、排查问题，并重新运行解析。

</template>
</BiRow>

<BiRow>
<template #en>

### Parse Again

</template>
<template #zh>

### 重新解析

</template>
</BiRow>

<BiRow>
<template #en>

If parsing configuration changes or parsing results need to be updated, you can parse a document again. Common scenarios that require parsing again include:

</template>
<template #zh>

如果解析配置发生变化，或需要更新解析结果，可以对文档重新解析。需要重新解析的常见场景包括：

</template>
</BiRow>

<BiRow>
<template #en>

- The parsing method or its parameters changed.
- Chunk splitting configuration changed.
- Auto metadata configuration changed.
- Table column role configuration changed.
- The source document was updated or replaced.
- Existing parsing results are incorrect and need to be regenerated.

</template>
<template #zh>

- 解析方法或其参数发生变化。
- 分块切分配置发生变化。
- 自动元数据配置发生变化。
- 表格列角色配置发生变化。
- 源文档已更新或被替换。
- 现有解析结果不正确，需要重新生成。

</template>
</BiRow>

<BiRow>
<template #en>

Parsing again may regenerate chunks and metadata. Before operating, confirm whether old results need to be retained, overwritten, or updated according to the interface prompt.

</template>
<template #zh>

重新解析可能会重新生成分块和元数据。操作前，请按界面提示确认旧结果是保留、覆盖还是更新。

</template>
</BiRow>

<BiRow>
<template #en>

### Change the Parsing Method of a Single Document

</template>
<template #zh>

### 更改单个文档的解析方法

</template>
</BiRow>

<BiRow>
<template #en>

The parsing method in dataset configuration is the default parsing configuration for documents. If a document needs a different parsing method, you can change it separately in the document list or document detail page.

</template>
<template #zh>

数据集配置中的解析方法是文档的默认解析配置。若某个文档需要不同的解析方法，可在文档列表或文档详情页中单独更改。

</template>
</BiRow>

<BiRow>
<template #en>

This adjustment only applies to the current document and does not affect the default parsing configuration of the dataset.

</template>
<template #zh>

该调整仅对当前文档生效，不影响数据集的默认解析配置。

</template>
</BiRow>

<BiRow>
<template #en>

## Search and Filter Documents

</template>
<template #zh>

## 搜索与筛选文档

</template>
</BiRow>

<BiRow>
<template #en>

**Search documents**: You can enter keywords in the document list to search by document name or related content. Search helps quickly locate target documents when there are many documents.

</template>
<template #zh>

**搜索文档**：可以在文档列表中输入关键词，按文档名称或相关内容搜索。文档较多时，搜索有助于快速定位目标文档。

</template>
</BiRow>

<BiRow>
<template #en>

**Filter documents**: The document list supports filtering by parsing status, enabled status, source, and other conditions. The number of documents matching each condition is displayed on the right side of each filter item. You can select one or more conditions as needed.

</template>
<template #zh>

**筛选文档**：文档列表支持按解析状态、启用状态、来源等条件筛选。每个筛选项右侧会显示满足该条件的文档数量，可按需选择一个或多个条件。

</template>
</BiRow>

<BiRow>
<template #en>

**Metadata field** is used to further filter documents based on document metadata. The system displays metadata fields available for filtering in the current dataset. For table documents using the **Table** parsing method, columns set to **Metadata** or **Both** in column role configuration can appear here as metadata fields.

</template>
<template #zh>

**元数据字段（Metadata field）**用于基于文档元数据进一步筛选文档。系统会展示当前数据集中可用于筛选的元数据字段。对于采用**表格（Table）**解析方法的表格文档，在列角色配置中设为**元数据（Metadata）**或**两者（Both）**的列，可以在此处作为元数据字段显示。

</template>
</BiRow>

<BiRow>
<template #en>

You can search field names in the search box under **Metadata field**, or expand a specific field and select corresponding values as filter conditions. After setup, click **Submit** to apply filter conditions. Click **Clear** to clear the current filter conditions.

</template>
<template #zh>

可在**元数据字段**下方的搜索框中搜索字段名，也可以展开特定字段并选择相应的值作为筛选条件。设置完成后，点击**提交（Submit）**应用筛选条件；点击**清除（Clear）**清除当前筛选条件。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: The fields actually displayed in **Metadata field** depend on the document metadata in the current dataset, so available filter fields may vary between datasets.

</template>
<template #zh>

> 注意：**元数据字段**中实际显示的字段取决于当前数据集的文档元数据，因此不同数据集可用的筛选字段可能不同。

</template>
</BiRow>

<BiRow>
<template #en>

## Batch Operations

</template>
<template #zh>

## 批量操作

</template>
</BiRow>

<BiRow>
<template #en>

After selecting the checkboxes on the left side of the document list, a batch operation bar appears, allowing multiple documents to be processed at the same time.

</template>
<template #zh>

勾选文档列表左侧的复选框后，会出现批量操作栏，可同时处理多个文档。

</template>
</BiRow>

<BiRow>
<template #en>

- **Enabled**: Batch-enable selected documents.
- **Disabled**: Batch-disable selected documents.
- **Run**: Batch-parse selected documents and process old chunks and auto metadata application when needed.
- **Cancel**: Cancel running parsing tasks.
- **Metadata**: Maintain metadata for selected documents in bulk.
- **Delete**: Delete selected documents.

</template>
<template #zh>

- **启用（Enabled）**：批量启用所选文档。
- **停用（Disabled）**：批量停用所选文档。
- **运行（Run）**：批量解析所选文档，并在需要时处理旧分块和自动元数据的应用。
- **取消（Cancel）**：取消正在运行的解析任务。
- **元数据（Metadata）**：批量维护所选文档的元数据。
- **删除（Delete）**：删除所选文档。

</template>
</BiRow>

<BiRow>
<template #en>

## Single-Document Operations

</template>
<template #zh>

## 单文档操作

</template>
</BiRow>

<BiRow>
<template #en>

### View and Manage Documents

</template>
<template #zh>

### 查看与管理文档

</template>
</BiRow>

<BiRow>
<template #en>

Click the document name to enter the document detail page and view document information, parsing results, chunks, and metadata.

</template>
<template #zh>

点击文档名称进入文档详情页，可查看文档信息、解析结果、分块和元数据。

</template>
</BiRow>

<BiRow>
<template #en>

- **View parsing results**: Click the document name to enter document details and view chunks and related information generated by parsing.
- **View metadata**: View or edit document-level metadata.
- **Download**: Download the source document.
- **Rename**: Rename the document.

</template>
<template #zh>

- **查看解析结果（View parsing results）**：点击文档名称进入文档详情，查看解析生成的分块及相关信息。
- **查看元数据（View metadata）**：查看或编辑文档级元数据。
- **下载（Download）**：下载源文档。
- **重命名（Rename）**：重命名文档。

</template>
</BiRow>

<BiRow>
<template #en>

### Enable and Disable Documents

</template>
<template #zh>

### 启用与停用文档

</template>
</BiRow>

<BiRow>
<template #en>

The enabled status determines whether a document participates in dataset retrieval. After a document is disabled, its chunks are no longer used as retrieval sources, but the document and parsing results remain in the dataset.

</template>
<template #zh>

启用状态决定文档是否参与数据集检索。文档停用后，其分块不再作为检索来源，但文档和解析结果仍保留在数据集中。

</template>
</BiRow>

<BiRow>
<template #en>

If you want to temporarily remove a document from retrieval without deleting it, disable the document. If you need to restore retrieval, enable it again.

</template>
<template #zh>

如果只想让文档暂时退出检索而不删除它，可停用该文档；需要恢复检索时，再重新启用。

</template>
</BiRow>

<BiRow>
<template #en>

### Delete Documents

</template>
<template #zh>

### 删除文档

</template>
</BiRow>

<BiRow>
<template #en>

Deleting a document removes it from the current dataset. The corresponding chunks, metadata, and parsing results are also removed and no longer participate in later retrieval or Q&A.

</template>
<template #zh>

删除文档会将其从当前数据集中移除，相应的分块、元数据和解析结果也会一并移除，不再参与后续检索或问答。

</template>
</BiRow>

<BiRow>
<template #en>

Before deleting, confirm that the document and its parsing results are no longer needed.

</template>
<template #zh>

删除前，请确认不再需要该文档及其解析结果。

</template>
</BiRow>
