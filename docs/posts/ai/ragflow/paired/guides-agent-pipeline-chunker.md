<BiRow>
<template #en>

The Chunker component intelligently splits text. Its goal is to prevent overflow of the AI context window and improve semantic accuracy in hybrid search.

</template>
<template #zh>

分块器（Chunker）组件对文本进行智能切分。其目标是避免 AI 上下文窗口溢出，并提升混合搜索中的语义准确度。

</template>
</BiRow>

<BiRow>
<template #en>

There are two core methods, which can be used sequentially:

</template>
<template #zh>

有两种核心方法，可以依次使用：

</template>
</BiRow>

<BiRow>
<template #en>

Token-based chunking (default):

</template>
<template #zh>

基于 token 的切分（默认）：

</template>
</BiRow>

<BiRow>
<template #en>

- **Chunk size**: Defaults to 512 tokens, balancing retrieval quality and model compatibility.
- **Overlap**: Set the overlap percentage to copy the end of one chunk to the beginning of the next chunk, improving semantic continuity.
- **Delimiter**: Uses `\n` (line break) by default to split first at natural paragraph boundaries and avoid cutting in the middle of sentences.

</template>
<template #zh>

- **分块大小**：默认为 512 token，在检索质量与模型兼容性之间取得平衡。
- **重叠**：设置重叠百分比，把上一个分块的结尾复制到下一个分块的开头，提升语义连续性。
- **分隔符**：默认使用 `\n`（换行符），先在自然段落边界切分，避免从句子中间切断。

</template>
</BiRow>

<BiRow>
<template #en>

Title-based chunking (hierarchical):

</template>
<template #zh>

基于标题的切分（层级式）：

</template>
</BiRow>

<BiRow>
<template #en>

- Best suited for structured documents such as manuals, papers and legal contracts.
- The system splits documents by chapter and section structure.
- Each chunk represents a complete structural unit.

</template>
<template #zh>

- 最适合手册、论文、法律合同等结构化文档。
- 系统按章节结构切分文档。
- 每个分块代表一个完整的结构单元。

</template>
</BiRow>

<BiRow>
<template #en>

:::caution IMPORTANT
In the current design, if both token-based and title-based methods are used, connect the **Token Chunker** component first, and then connect the **Title Chunker** component. Connecting the **Title Chunker** directly to the **Parser** may cause formatting errors for emails, images, spreadsheets and text files.
:::

</template>
<template #zh>

:::caution 重要
当前设计中，若同时使用基于 token 的切分和基于标题的切分，请先连接 **Token Chunker** 组件，再连接 **Title Chunker** 组件。将 **Title Chunker** 直接连接到 **Parser**，可能导致邮件、图片、电子表格和文本文件出现格式错误。
:::

</template>
</BiRow>
