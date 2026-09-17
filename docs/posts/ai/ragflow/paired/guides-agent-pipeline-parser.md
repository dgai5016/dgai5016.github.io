<BiRow>
<template #en>

The **Parser** component converts your files into structured text while preserving layout, tables, headers and other formatting.

</template>
<template #zh>

**解析器**（Parser）组件将文件转换为结构化文本，同时保留版式、表格、标题等格式。

</template>
</BiRow>

<BiRow>
<template #en>

It supports 8 file categories and more than 23 formats, including PDF, images, audio, video, email, spreadsheets (Excel), Word, PPT, HTML and Markdown.

</template>
<template #zh>

它支持 8 大文件类别、23 种以上格式，包括 PDF、图片、音频、视频、邮件、电子表格（Excel）、Word、PPT、HTML 和 Markdown。

</template>
</BiRow>

<BiRow>
<template #en>

![Select parser file format](/ragflow-images/configure_the_parser_component_2.jpg)

</template>
<template #zh>

![选择解析器文件格式](/ragflow-images/configure_the_parser_component_2.jpg)

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

For PDF files, select one of the following:

</template>
<template #zh>

PDF 文件请从以下解析方式中选择：

</template>
</BiRow>

<BiRow>
<template #en>

- **DeepDoc** (default): RAGFlow's built-in model. Best suited for scanned documents or complex layouts with tables.
- **MinerU**: Industry-leading for complex elements such as mathematical formulas and complex layouts.
- **Naive**: Simple text extraction. Use it for clean, text-based PDFs without complex elements.

</template>
<template #zh>

- **DeepDoc**（默认）：RAGFlow 内置模型，最适合扫描件或含表格的复杂版式。
- **MinerU**：处理数学公式、复杂版式等复杂元素的能力业界领先。
- **Naive**：简单文本提取，适用于没有复杂元素、以文本为主的干净 PDF。

</template>
</BiRow>

<BiRow>
<template #en>

![Configure PDF parser method](/ragflow-images/configure_the_parser_component_1.jpg)

</template>
<template #zh>

![配置 PDF 解析方式](/ragflow-images/configure_the_parser_component_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

For image files:

</template>
<template #zh>

图片文件：

</template>
</BiRow>

<BiRow>
<template #en>

- OCR is used by default.
- You can also configure a vision language model (VLM) for advanced visual understanding.

</template>
<template #zh>

- 默认使用 OCR。
- 也可以配置视觉语言模型（VLM），实现更高级的视觉理解。

</template>
</BiRow>

<BiRow>
<template #en>

For email files:

</template>
<template #zh>

邮件文件：

</template>
</BiRow>

<BiRow>
<template #en>

- Select specific fields to parse, such as `subject` and `body`, for precise extraction.

</template>
<template #zh>

- 选择要解析的特定字段，如 `subject` 和 `body`，实现精准提取。

</template>
</BiRow>

<BiRow>
<template #en>

For spreadsheets:

</template>
<template #zh>

电子表格：

</template>
</BiRow>

<BiRow>
<template #en>

- Output in HTML format, preserving row and column structure.

</template>
<template #zh>

- 以 HTML 格式输出，保留行列结构。

</template>
</BiRow>

<BiRow>
<template #en>

For Word/PPT:

</template>
<template #zh>

Word/PPT：

</template>
</BiRow>

<BiRow>
<template #en>

- Output in JSON format, preserving document hierarchy, such as headings, paragraphs and slides.

</template>
<template #zh>

- 以 JSON 格式输出，保留标题、段落、幻灯片等文档层级结构。

</template>
</BiRow>

<BiRow>
<template #en>

For text and markup (HTML/MD):

</template>
<template #zh>

文本与标记语言（HTML/MD）：

</template>
</BiRow>

<BiRow>
<template #en>

- Formatting tags are automatically removed and clean text is output.

</template>
<template #zh>

- 自动移除格式标签，输出干净的文本。

</template>
</BiRow>
