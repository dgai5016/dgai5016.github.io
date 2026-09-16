# 配置解析器组件

**解析器**（Parser）组件将文件转换为结构化文本，同时保留版式、表格、标题等格式。

它支持 8 大文件类别、23 种以上格式，包括 PDF、图片、音频、视频、邮件、电子表格（Excel）、Word、PPT、HTML 和 Markdown。

![选择解析器文件格式](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/configure_the_parser_component_2.jpg)

关键配置：

PDF 文件请从以下解析方式中选择：

- **DeepDoc**（默认）：RAGFlow 内置模型，最适合扫描件或含表格的复杂版式。
- **MinerU**：处理数学公式、复杂版式等复杂元素的能力业界领先。
- **Naive**：简单文本提取，适用于没有复杂元素、以文本为主的干净 PDF。

![配置 PDF 解析方式](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/configure_the_parser_component_1.jpg)

图片文件：

- 默认使用 OCR。
- 也可以配置视觉语言模型（VLM），实现更高级的视觉理解。

邮件文件：

- 选择要解析的特定字段，如 `subject` 和 `body`，实现精准提取。

电子表格：

- 以 HTML 格式输出，保留行列结构。

Word/PPT：

- 以 JSON 格式输出，保留标题、段落、幻灯片等文档层级结构。

文本与标记语言（HTML/MD）：

- 自动移除格式标签，输出干净的文本。
