<BiRow>
<template #en>

The **Indexer** component indexes data for optimal retrieval. It is the final step, writing processed data into search engines such as Infinity, Elasticsearch and OpenSearch.

</template>
<template #zh>

**索引器**（Indexer）组件为数据建立索引，以获得最佳检索效果。它是最后一步，将处理后的数据写入 Infinity、Elasticsearch、OpenSearch 等搜索引擎。

</template>
</BiRow>

<BiRow>
<template #en>

Key configurations:

</template>
<template #zh>

关键配置：

</template>
</BiRow>

<BiRow>
<template #en>

Search method:

</template>
<template #zh>

搜索方式：

</template>
</BiRow>

<BiRow>
<template #en>

- **Full-text**: Keyword search for exact matches, such as code and names.
- **Embedding**: Semantic search using vector similarity.
- **Hybrid** (recommended): Combines both methods for the best recall.

</template>
<template #zh>

- **全文**：基于关键词的精确匹配搜索，适合代码、名称等内容。
- **嵌入**：基于向量相似度的语义搜索。
- **混合**（推荐）：结合两种方式，获得最佳召回效果。

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval strategy:

</template>
<template #zh>

检索策略：

</template>
</BiRow>

<BiRow>
<template #en>

- **Processed text** (default): Indexes chunked text.
- **Questions**: Indexes generated questions. This usually produces higher similarity matches than text-to-text matching.
- **Enhanced context**: Indexes summaries instead of raw text. Suitable for broad topic matching.

</template>
<template #zh>

- **处理后文本**（默认）：对切分后的文本建立索引。
- **问题**：对生成的问题建立索引，通常比文本对文本的匹配产生相似度更高的结果。
- **增强上下文**：对摘要而非原文建立索引，适合宽泛的主题匹配。

</template>
</BiRow>

<BiRow>
<template #en>

Filename weight:

</template>
<template #zh>

文件名权重：

</template>
</BiRow>

<BiRow>
<template #en>

- A slider for including the document filename as semantic information in retrieval.

</template>
<template #zh>

- 一个滑块，用于在检索时把文档文件名纳入语义信息。

</template>
</BiRow>

<BiRow>
<template #en>

Embedding model:

</template>
<template #zh>

嵌入模型：

</template>
</BiRow>

<BiRow>
<template #en>

- Automatically uses the model set when creating the knowledge base.

</template>
<template #zh>

- 自动使用创建知识库时设置的模型。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning IMPORTANT
To search across multiple knowledge bases at the same time, all selected knowledge bases must use the same embedding model.
:::

</template>
<template #zh>

:::warning 重要
要同时跨多个知识库搜索，所有选中的知识库必须使用相同的嵌入模型。
:::

</template>
</BiRow>

<BiRow>
<template #en>

![Configure The Indexer Component](/ragflow-images/configure_the_indexer_component.jpg)

</template>
<template #zh>

![配置索引器组件](/ragflow-images/configure_the_indexer_component.jpg)

</template>
</BiRow>
