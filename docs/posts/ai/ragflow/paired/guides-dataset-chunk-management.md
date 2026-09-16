<BiRow>
<template #en>

Chunks are the retrievable knowledge fragments generated after document parsing. They are the basic units used by RAGFlow for retrieval and Q&A. Chunk management is used to view, search, filter, edit, add, enable, disable, and delete chunks.

</template>
<template #zh>

分块（chunk）是文档解析后生成的、可被检索的知识片段，是 RAGFlow 进行检索和问答的基本单元。分块管理用于对分块进行查看、搜索、筛选、编辑、添加、启用、停用和删除。

</template>
</BiRow>

<BiRow>
<template #en>

## View Parsing Results

</template>
<template #zh>

## 查看解析结果

</template>
</BiRow>

<BiRow>
<template #en>

After document parsing is completed, click the document name on the **Files** page to enter the document parsing result page. The parsing result page displays chunks generated from the document. You can use this page to check whether document content has been correctly parsed, split, and stored.

</template>
<template #zh>

文档解析完成后，在**文件（Files）**页面点击文档名称，进入文档解析结果页。解析结果页展示文档生成的分块，可用于检查文档内容是否被正确解析、切分和存储。

</template>
</BiRow>

<BiRow>
<template #en>

## View Chunk List

</template>
<template #zh>

## 查看分块列表

</template>
</BiRow>

<BiRow>
<template #en>

The chunk list displays the chunks generated for the current document. Each chunk usually includes body text, keywords, questions, enabled status, and related operations. For documents that support source preview, the chunk list can be linked with source content. After clicking chunk text, the document preview area jumps to the corresponding source location, making it convenient to compare with the original document and check parsing and splitting results.

</template>
<template #zh>

分块列表展示当前文档生成的分块。每个分块通常包含正文、关键词、问题、启用状态及相关操作。对于支持源文预览的文档，分块列表可以与源文内容联动：点击分块文本后，文档预览区会跳转到对应的原文位置，方便与原文档对照，检查解析与切分结果。

</template>
</BiRow>

<BiRow>
<template #en>

For document types that cannot locate source text, parsing results are mainly viewed through chunk body text.

</template>
<template #zh>

对于无法定位源文本的文档类型，主要通过分块正文查看解析结果。

</template>
</BiRow>

<BiRow>
<template #en>

## Search and Filter Chunk

</template>
<template #zh>

## 搜索与筛选分块

</template>
</BiRow>

<BiRow>
<template #en>

When a document contains many chunks, use the search and filter functions in the toolbar to quickly locate target content. You can enter keywords to search chunks or filter chunks by enabled status. For chunks with long body text, you can switch between full display and collapsed display as needed to browse parsing results.

</template>
<template #zh>

文档分块较多时，可使用工具栏中的搜索和筛选功能快速定位目标内容：输入关键词搜索分块，或按启用状态筛选分块。对于正文较长的分块，可按需在完整显示与折叠显示之间切换，浏览解析结果。

</template>
</BiRow>

<BiRow>
<template #en>

### View Chunk Details

</template>
<template #zh>

### 查看分块详情

</template>
</BiRow>

<BiRow>
<template #en>

After opening chunk details, you can further view the body text and related information for the knowledge fragment, such as:

</template>
<template #zh>

打开分块详情后，可以进一步查看该知识片段的正文及相关信息，例如：

</template>
</BiRow>

<BiRow>
<template #en>

- **Body text**: The main text actually stored in the chunk and used for retrieval. After clicking the chunk body, the document preview area jumps to the corresponding source location.
- **Keywords**: Keywords related to the current chunk, used to enhance content retrieval.
- **Questions**: Questions generated or configured based on chunk content, used to enhance recall for related questions.
- **Enabled status**: Determines whether the current chunk participates in dataset retrieval.

</template>
<template #zh>

- **正文（Body text）**：分块中实际存储并用于检索的主要文本。点击分块正文后，文档预览区会跳转到对应的原文位置。
- **关键词（Keywords）**：与当前分块相关的关键词，用于增强内容检索。
- **问题（Questions）**：基于分块内容生成或配置的问题，用于增强相关问题的召回。
- **启用状态（Enabled status）**：决定当前分块是否参与数据集检索。

</template>
</BiRow>

<BiRow>
<template #en>

When viewing a chunk, you can check it together with its corresponding source document to confirm whether the chunk content is complete, semantically coherent, and suitable for retrieval.

</template>
<template #zh>

查看分块时，可以结合对应的源文档进行检查，确认分块内容是否完整、语义是否连贯、是否适合检索。

</template>
</BiRow>

<BiRow>
<template #en>

### Edit Chunk

</template>
<template #zh>

### 编辑分块

</template>
</BiRow>

<BiRow>
<template #en>

If parsing results are inaccurate or content needs to be supplemented, you can edit chunks manually. Double-click a chunk to open the edit parsing block window. You can view and modify:

</template>
<template #zh>

如果解析结果不准确，或需要补充内容，可以手动编辑分块。双击分块即可打开编辑解析块窗口，查看和修改以下内容：

</template>
</BiRow>

<BiRow>
<template #en>

- **Content**: The body text of the chunk.
- **Keywords**: Keywords related to chunk content. Keywords can be added or deleted to enhance retrieval for the chunk.
- **Questions**: Questions associated with the chunk.
- **Tags**: Tags added to the chunk, used to mark and manage knowledge fragments.

</template>
<template #zh>

- **内容（Content）**：分块正文。
- **关键词（Keywords）**：与分块内容相关的关键词。可以增加或删除关键词，以增强该分块的检索效果。
- **问题（Questions）**：与分块关联的问题。
- **标签（Tags）**：为分块添加的标签，用于标记和管理知识片段。

</template>
</BiRow>

<BiRow>
<template #en>

After saving the edit, the updated chunk content is used for later retrieval.

</template>
<template #zh>

保存编辑后，更新后的分块内容将用于后续检索。

</template>
</BiRow>

<BiRow>
<template #en>

### Add Chunk

</template>
<template #zh>

### 添加分块

</template>
</BiRow>

<BiRow>
<template #en>

If you need to add extra knowledge fragments manually, you can add chunks on the chunk management page. Added chunks are stored under the current document and can be used as content sources for dataset retrieval and Q&A.

</template>
<template #zh>

如果需要手动补充知识片段，可以在分块管理页面添加分块。新增的分块存储在当前文档下，可用作数据集检索和问答的内容来源。

</template>
</BiRow>

<BiRow>
<template #en>

When adding a chunk, you usually need to enter the chunk content and configure keywords, questions, tags, or enabled status as needed.

</template>
<template #zh>

添加分块时，通常需要输入分块内容，并按需配置关键词、问题、标签或启用状态。

</template>
</BiRow>

<BiRow>
<template #en>

### Enable and Disable Chunk

</template>
<template #zh>

### 启用与停用分块

</template>
</BiRow>

<BiRow>
<template #en>

The enabled status of a chunk determines whether it participates in dataset retrieval. A disabled chunk remains in the parsing result but is not recalled during retrieval.

</template>
<template #zh>

分块的启用状态决定其是否参与数据集检索。分块停用后仍保留在解析结果中，但检索时不会被召回。

</template>
</BiRow>

<BiRow>
<template #en>

If a chunk contains outdated, incorrect, or temporarily unnecessary content, you can disable it. If the content needs to participate in retrieval again, enable it again.

</template>
<template #zh>

如果分块内容过时、有误或暂时不需要，可以停用该分块；需要其重新参与检索时，再启用即可。

</template>
</BiRow>

<BiRow>
<template #en>

### Delete Chunk

</template>
<template #zh>

### 删除分块

</template>
</BiRow>

<BiRow>
<template #en>

Deleting a chunk removes it from the current document's parsing results. It no longer participates in later retrieval or Q&A.

</template>
<template #zh>

删除分块会将其从当前文档的解析结果中移除，不再参与后续检索或问答。

</template>
</BiRow>

<BiRow>
<template #en>

Before deleting, confirm that the chunk is no longer needed. If you only want to temporarily exclude it from retrieval, use disable instead.

</template>
<template #zh>

删除前，请确认不再需要该分块。如果只是想让分块暂时退出检索，请改用停用。

</template>
</BiRow>
