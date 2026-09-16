<BiRow>
<template #en>

## Basic Information

</template>
<template #zh>

## 基本信息

</template>
</BiRow>

<BiRow>
<template #en>

The configuration page is used to maintain the core configuration of a dataset. Basic information includes **Name**, **Language**, **Avatar**, **Description**, **Embedding model**, **PageRank**, and **Tag sets**.

</template>
<template #zh>

配置页用于维护数据集的核心配置。基本信息包括**名称**、**语言**、**头像**、**描述**、**嵌入模型**、**PageRank** 和**标签集**。

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The dataset name. It can still be modified after creation and is used in list cards and the detail page title.
- **Language**: The primary language of the dataset. The language setting affects language assumptions during parsing and model processing.
- **Avatar**: The dataset avatar. Image uploads are supported, and the maximum image size is 4 MB.
- **Description**: The dataset description, used to describe the material scope, business purpose, or maintenance notes.
- **Embedding model**: The model used to vectorize chunks. Changing the embedding model after content has already been parsed usually affects the index and should be handled carefully.
- **PageRank**: Sets the dataset's PageRank score. During retrieval, this score is added to the hybrid similarity score of matched chunks in the dataset, increasing their ranking weight. This is suitable when content from a specific dataset needs higher priority during retrieval across multiple datasets.
- **Tag sets**: Used to associate one or more tag sets with a dataset and add tags to chunks in bulk based on text similarity. During retrieval, queries are also automatically associated with corresponding tags, improving retrieval accuracy with tag information. A tag set must be generated as a sample before use.

</template>
<template #zh>

- **名称（Name）**：数据集名称。创建后仍可修改，用于列表卡片和详情页标题。
- **语言（Language）**：数据集的主要语言。语言设置会影响解析和模型处理过程中的语言假设。
- **头像（Avatar）**：数据集头像。支持上传图片，图片最大为 4 MB。
- **描述（Description）**：数据集描述，用于说明资料范围、业务用途或维护备注。
- **嵌入模型（Embedding model）**：用于将分块向量化的模型。在内容已完成解析后再更改嵌入模型，通常会影响索引，需谨慎处理。
- **PageRank**：设置数据集的 PageRank 分数。检索时，该分数会加到数据集中命中分块的混合相似度得分上，提高其排序权重。适合在跨多个数据集检索时，需要让特定数据集的内容获得更高优先级的场景。
- **标签集（Tag sets）**：用于将一个或多个标签集关联到数据集，并基于文本相似度批量为分块添加标签。检索时，查询也会自动关联到相应标签，借助标签信息提升检索准确性。标签集必须先生成为样本，之后才能使用。

</template>
</BiRow>

<BiRow>
<template #en>

## Parsing Method

</template>
<template #zh>

## 解析方法

</template>
</BiRow>

<BiRow>
<template #en>

The parsing method determines how a dataset processes uploaded documents and how documents are converted into chunks. **Parse type** in configuration provides two entries: **Built-in** and **Pipeline**.

</template>
<template #zh>

解析方法决定数据集如何处理上传的文档，以及文档如何转换成分块。配置中的**解析类型（Parse type）**提供两个入口：**内置（Built-in）**和**管道（Pipeline）**。

</template>
</BiRow>

<BiRow>
<template #en>

### Built-in Parsing

</template>
<template #zh>

### 内置解析

</template>
</BiRow>

<BiRow>
<template #en>

**Built-in** means using RAGFlow's built-in document parsing capabilities. Users can choose a suitable parsing method based on the document type. The system then reads document content, splits it into chunks, and generates the structure required for retrieval according to the selected method.

</template>
<template #zh>

**内置**指使用 RAGFlow 自带的文档解析能力。用户可以根据文档类型选择合适的解析方法，系统随后读取文档内容、将其切分成块，并按所选方法生成检索所需的结构。

</template>
</BiRow>

<BiRow>
<template #en>

The following built-in parsing methods are available:

</template>
<template #zh>

可用的内置解析方法如下：

</template>
</BiRow>

<BiRow>
<template #en>

- **General**: A general-purpose parsing method suitable for most conventional documents. It identifies document content and creates chunks according to the configured chunking rules.
- **Q&A**: Designed for data organized as question-answer pairs. Each Q&A pair is treated as an individual chunk.
- **Manual**: Designed for PDFs with a clear hierarchical section structure, such as product manuals and operation guides. Documents are chunked based on their section structure.
- **Table**: Designed for structured tabular data such as XLSX and CSV/TXT files. Each row is typically treated as an individual chunk.
- **Paper**: Designed for PDF papers, research reports, and other academic documents. Documents are chunked based on structural elements such as abstracts, sections, and subsections.
- **Book**: Designed for DOCX, PDF, and TXT books or other long documents with a chapter-based structure.
- **Laws**: Designed for legal documents in DOCX, PDF, and TXT formats. Chunk boundaries are identified based on the structural characteristics of legal documents.
- **Presentation**: Designed for presentations in PDF and PPTX formats. Each page or slide is typically treated as an individual chunk.
- **One**: Treats the entire document as a single chunk. This method is suitable for relatively short documents when the complete context needs to be preserved.
- **Tag**: Used to create a tag set. A dataset using this method provides tags for chunks and queries in other datasets and does not directly participate in the RAG retrieval process.

</template>
<template #zh>

- **通用（General）**：通用型解析方法，适用于大多数常规文档。识别文档内容，并按配置的分块规则创建分块。
- **问答（Q&A）**：面向以问答对形式组织的数据。每个问答对作为一个独立分块。
- **手册（Manual）**：面向章节层级结构清晰的 PDF，例如产品手册和操作指南。文档按章节结构分块。
- **表格（Table）**：面向 XLSX 和 CSV/TXT 等结构化表格数据。通常每一行作为一个独立分块。
- **论文（Paper）**：面向 PDF 论文、研究报告等学术文档。文档按摘要、章节、小节等结构要素分块。
- **书籍（Book）**：面向 DOCX、PDF、TXT 格式的图书，或其他按章节组织的长文档。
- **法律（Laws）**：面向 DOCX、PDF、TXT 格式的法律文档。基于法律文档的结构特征识别分块边界。
- **演示文稿（Presentation）**：面向 PDF 和 PPTX 格式的演示文稿。通常每一页或每一张幻灯片作为一个独立分块。
- **整篇（One）**：将整个文档作为单个分块。适用于需要保留完整上下文的较短文档。
- **标签（Tag）**：用于创建标签集。采用该方法的数据集为其他数据集中的分块和查询提供标签，本身不直接参与 RAG 检索过程。

</template>
</BiRow>

<BiRow>
<template #en>

> **Tip:** On the built-in parsing configuration page, click **Built-in pipeline introduction** on the right to view the supported file formats, detailed chunking rules, and examples for each parsing method.

</template>
<template #zh>

> **提示：**在内置解析配置页面，点击右侧的**内置管道介绍（Built-in pipeline introduction）**，可查看各解析方法支持的文件格式、详细分块规则和示例。

</template>
</BiRow>

<BiRow>
<template #en>

Selection suggestion: choose the parsing method based on the form of the material itself. Use **General** first for regular documents; use **Table** first for tabular materials; choose the corresponding method for Q&A collections, manuals, papers, images, audio, and emails to reduce later chunk adjustment costs.

</template>
<template #zh>

选择建议：根据资料本身的形态选择解析方法。常规文档优先使用**通用**；表格类资料优先使用**表格**；问答集、手册、论文、图片、音频、邮件等则选择对应的方法，以减少后续分块调整成本。

</template>
</BiRow>

<BiRow>
<template #en>

### Chunk and Parsing Configuration

</template>
<template #zh>

### 分块与解析配置

</template>
</BiRow>

<BiRow>
<template #en>

After selecting a **Built-in** parsing method, you can further configure document parsing, chunk splitting, and content enhancement parameters. Reasonable configuration helps improve the accuracy and recall of later retrieval.

</template>
<template #zh>

选定**内置**解析方法后，可以进一步配置文档解析、分块切分和内容增强参数。合理的配置有助于提升后续检索的准确率和召回率。

</template>
</BiRow>

<BiRow>
<template #en>

Different built-in methods display different configuration items. Use the current interface as the source of truth.

</template>
<template #zh>

不同的内置方法展示的配置项不同。请以当前界面为准。

</template>
</BiRow>

<BiRow>
<template #en>

#### Document Parsing Configuration

</template>
<template #zh>

#### 文档解析配置

</template>
</BiRow>

<BiRow>
<template #en>

- **PDF parser**: Specifies the parser used when parsing PDF documents. Different parsers differ in text recognition, table structure recognition, layout analysis, processing speed, and other aspects. Choose one based on the content type and parsing requirements of the PDF. The system provides the following PDF parsers by default:
  - **DeepDoc**: The default PDF parser in RAGFlow. It can perform OCR, table structure recognition (TSR), document layout understanding (DLR), and other tasks. It is suitable for PDFs that contain complex layouts, images, scanned content, or tables. Because additional document analysis is required, parsing may take relatively longer.
  - **Naive**: Suitable for PDFs mainly composed of plain text. This method skips OCR, TSR, DLR, and other processing, reducing unnecessary parsing overhead. If a PDF contains scanned pages, complex layouts, or tables, this method is not recommended.
  - **Docling**: An open-source document processing tool that can parse documents such as PDFs and extract structured content.
  - **TCADPParser**: Tencent's open-source document parsing tool, which can be used for PDF content parsing.

</template>
<template #zh>

- **PDF 解析器（PDF parser）**：指定解析 PDF 文档时使用的解析器。不同解析器在文本识别、表格结构识别、版面分析、处理速度等方面各有差异，请根据 PDF 的内容类型和解析需求选择。系统默认提供以下 PDF 解析器：
  - **DeepDoc**：RAGFlow 默认的 PDF 解析器。可执行 OCR、表格结构识别（TSR）、文档版面理解（DLR）等任务，适用于包含复杂版面、图片、扫描件或表格的 PDF。由于需要额外的文档分析，解析耗时可能相对较长。
  - **Naive**：适用于以纯文本为主的 PDF。该方法跳过 OCR、TSR、DLR 等处理，减少不必要的解析开销。若 PDF 包含扫描页、复杂版面或表格，不建议使用该方法。
  - **Docling**：开源文档处理工具，能够解析 PDF 等文档并提取结构化内容。
  - **TCADPParser**：腾讯开源的文档解析工具，可用于 PDF 内容解析。

</template>
</BiRow>

<BiRow>
<template #en>

In addition to the built-in parsers above, you can also use a vision-language model (VLM) that supports PDF parsing. To use a third-party vision model to parse PDFs, first configure the default VLM under **Model Providers > Set default model**. After configuration, select the corresponding model from the **PDF parser** drop-down list.

</template>
<template #zh>

除上述内置解析器外，还可以使用支持 PDF 解析的视觉语言模型（VLM）。要使用第三方视觉模型解析 PDF，需先在**模型提供商 > 设置默认模型（Model Providers > Set default model）**中配置默认 VLM。配置完成后，从 **PDF 解析器**下拉列表中选择相应模型。

</template>
</BiRow>

<BiRow>
<template #en>

Usually, some vision models whose names contain identifiers such as **VL** or **V** support PDF parsing. For documents with complex layouts or mixed text and images, a more capable vision model may produce better parsing results, but it also incurs additional model calls and token consumption. The specific support and parsing effect depend on the model used.

</template>
<template #zh>

通常，名称中带有 **VL**、**V** 等标识的视觉模型支持 PDF 解析。对于版面复杂或图文混排的文档，能力更强的视觉模型可能获得更好的解析效果，但也会带来额外的模型调用和 token 消耗。具体支持情况和解析效果取决于所用的模型。

</template>
</BiRow>

<BiRow>
<template #en>

#### Chunk Splitting Configuration

</template>
<template #zh>

#### 分块切分配置

</template>
</BiRow>

<BiRow>
<template #en>

The following configurations are mainly used for built-in methods that need to split text according to specified rules, such as **General**.

</template>
<template #zh>

以下配置主要用于需要按指定规则切分文本的内置方法，例如**通用**。

</template>
</BiRow>

<BiRow>
<template #en>

- **Recommended chunk size**: Sets the recommended target size when generating chunks. Smaller chunks can provide more fine-grained retrieval results but may lack context. Larger chunks can preserve more context, but retrieval result granularity is relatively coarse.
- **Delimiter for text**: Sets the delimiter used for text splitting. The system splits text based on the delimiter and chunk size. It is recommended to set an appropriate delimiter based on the original paragraph and line-break structure to preserve semantic completeness as much as possible.
- **Overlapped percent (%)**: Sets the content overlap ratio between adjacent chunks. Increasing overlap appropriately can reduce context loss caused by split boundaries, but an overly high overlap ratio increases repeated content.
- **Child chunk are used for retrieval**: Controls whether finer-grained child chunks participate in retrieval. This is suitable for long documents where fine-grained recall needs to be improved.

</template>
<template #zh>

- **推荐分块大小（Recommended chunk size）**：设置生成分块时的推荐目标大小。较小的分块可以提供更细粒度的检索结果，但可能缺少上下文；较大的分块能保留更多上下文，但检索结果粒度较粗。
- **文本分隔符（Delimiter for text）**：设置文本切分所用的分隔符。系统基于分隔符和分块大小切分文本。建议根据原文的段落与换行结构设置合适的分隔符，以尽可能保持语义完整。
- **重叠比例（Overlapped percent (%)）**：设置相邻分块之间的内容重叠比例。适当提高重叠可以减少切分边界造成的上下文丢失，但重叠比例过高会增加重复内容。
- **子分块用于检索（Child chunk are used for retrieval）**：控制更细粒度的子分块是否参与检索。适合需要提升细粒度召回的长文档。

</template>
</BiRow>

<BiRow>
<template #en>

#### Page and Multimodal Content Configuration

</template>
<template #zh>

#### 页面与多模态内容配置

</template>
</BiRow>

<BiRow>
<template #en>

- **Page Index**: Controls whether Page Index-related capabilities are used to process document page information.
- **Image & table context window**: Sets the context range between images or tables and surrounding text. Increasing this value appropriately can preserve more related context when processing images or tables.

</template>
<template #zh>

- **页面索引（Page Index）**：控制是否使用页面索引相关能力处理文档页面信息。
- **图片与表格上下文窗口（Image & table context window）**：设置图片或表格与周围文本之间的上下文范围。适当增大该值，可以在处理图片或表格时保留更多相关上下文。

</template>
</BiRow>

<BiRow>
<template #en>

#### Content Enhancement Configuration

</template>
<template #zh>

#### 内容增强配置

</template>
</BiRow>

<BiRow>
<template #en>

Some built-in methods provide the following content enhancement configurations, such as **General**, **Manual**, **Paper**, **Book**, and **Laws**.

</template>
<template #zh>

部分内置方法（如**通用**、**手册**、**论文**、**书籍**、**法律**）提供以下内容增强配置。

</template>
</BiRow>

<BiRow>
<template #en>

- **Auto metadata**: Controls whether metadata is generated automatically. After it is enabled, the generation method for metadata can be further configured through **Settings**.
- **Auto-keyword**: Sets the number of keywords automatically generated for chunks to supplement chunk semantic information.
- **Auto-question**: Sets the number of questions automatically generated based on chunk content to supplement query expressions that may match the current chunk.

</template>
<template #zh>

- **自动元数据（Auto metadata）**：控制是否自动生成元数据。启用后，可通过**设置（Settings）**进一步配置元数据的生成方式。
- **自动关键词（Auto-keyword）**：设置为分块自动生成的关键词数量，用于补充分块的语义信息。
- **自动问题（Auto-question）**：设置基于分块内容自动生成的问题数量，用于补充可能与当前分块匹配的查询表述。

</template>
</BiRow>

<BiRow>
<template #en>

#### Table Parsing Configuration

</template>
<template #zh>

#### 表格解析配置

</template>
</BiRow>

<BiRow>
<template #en>

When **Table** is selected, the interface provides a dedicated **Column mode** configuration used to control how table columns participate in generating chunk content and metadata.

</template>
<template #zh>

选择**表格**时，界面会提供专门的**列模式（Column mode）**配置，用于控制表格列如何参与分块内容和元数据的生成。

</template>
</BiRow>

<BiRow>
<template #en>

- **Auto**: The system processes table columns according to the default rules. By default, all columns are included in the chunk text and are also saved as metadata.
- **Manual**: Manually configures the table columns that need to participate in processing. This configuration mainly targets structured table data and differs from chunk splitting configuration for ordinary text-based built-in methods.

</template>
<template #zh>

- **自动（Auto）**：系统按默认规则处理表格列。默认情况下，所有列都会纳入分块文本，同时保存为元数据。
- **手动（Manual）**：手动配置需要参与处理的表格列。该配置主要面向结构化表格数据，与面向普通文本类内置方法的分块切分配置不同。

</template>
</BiRow>

<BiRow>
<template #en>

#### Other Format Processing Configuration

</template>
<template #zh>

#### 其他格式处理配置

</template>
</BiRow>

<BiRow>
<template #en>

Some built-in methods may also provide configuration for specific file formats, for example:

</template>
<template #zh>

部分内置方法还可能提供针对特定文件格式的配置，例如：

</template>
</BiRow>

<BiRow>
<template #en>

- **Excel to HTML**: Controls whether Excel content is converted into HTML for processing, preserving table structure information.

</template>
<template #zh>

- **Excel 转 HTML（Excel to HTML）**：控制是否将 Excel 内容转换为 HTML 处理，以保留表格结构信息。

</template>
</BiRow>

<BiRow>
<template #en>

Different built-in methods use different parsing logic, so not all configuration items appear at the same time. After selecting a built-in method, configure only the parameters displayed in the current interface. In general, for ordinary text documents, focus on chunk splitting parameters such as **Recommended chunk size**, **Delimiter for text**, and **Overlapped percent (%)**. For PDFs, papers, books, manuals, or legal documents, focus on **PDF parser** and the corresponding content enhancement configuration. For table data, focus on **Column mode**. When you need to further enrich retrieval information, use content enhancement features such as **Auto metadata**, **Auto-keyword**, and **Auto-question** according to actual requirements.

</template>
<template #zh>

不同内置方法使用的解析逻辑不同，因此并非所有配置项都会同时出现。选定内置方法后，只需配置当前界面显示的参数。一般而言：普通文本文档重点关注**推荐分块大小**、**文本分隔符**、**重叠比例**等分块切分参数；PDF、论文、书籍、手册、法律文档重点关注 **PDF 解析器**及相应的内容增强配置；表格数据重点关注**列模式**；需要进一步丰富检索信息时，可按实际需求使用**自动元数据**、**自动关键词**、**自动问题**等内容增强功能。

</template>
</BiRow>

<BiRow>
<template #en>

After configuration is complete, click **Save** to save the settings. When documents are parsed later, the system processes them according to the currently selected built-in method and its configuration.

</template>
<template #zh>

配置完成后，点击**保存（Save）**以保存设置。后续解析文档时，系统会按当前选定的内置方法及其配置进行处理。

</template>
</BiRow>

<BiRow>
<template #en>

### Pipeline: Custom Parsing

</template>
<template #zh>

### 管道（Pipeline）：自定义解析

</template>
</BiRow>

<BiRow>
<template #en>

**Pipeline** means using a custom **Ingestion Pipeline** as the dataset's parsing method. It is suitable for scenarios that require custom document processing logic or complex processing flows.

</template>
<template #zh>

**管道**指使用自定义的**摄取管道（Ingestion Pipeline）**作为数据集的解析方法，适用于需要自定义文档处理逻辑或复杂处理流程的场景。

</template>
</BiRow>

<BiRow>
<template #en>

The pipeline must be created and configured in **Agent > Ingestion Pipeline** in advance. In the dataset, you do not need to configure the processing nodes inside the pipeline again. You only need to select the created pipeline.

</template>
<template #zh>

管道必须先在 **Agent > 摄取管道（Ingestion Pipeline）**中创建并配置。在数据集中，无需重复配置管道内部的处理节点，只需选择已创建的管道。

</template>
</BiRow>

<BiRow>
<template #en>

Usage:

</template>
<template #zh>

使用方法：

</template>
</BiRow>

<BiRow>
<template #en>

1. Create and configure an **Ingestion Pipeline** in **Agent > Pipeline**.
2. Go to **Dataset > Configuration** and select **Pipeline** as the parsing method.
3. Select the pipeline to use from the pipeline list.
4. Save the configuration. Afterward, documents in the dataset are processed according to the selected pipeline.

</template>
<template #zh>

1. 在 **Agent > 管道（Pipeline）**中创建并配置**摄取管道**。
2. 进入**数据集 > 配置（Dataset > Configuration）**，选择**管道**作为解析方法。
3. 在管道列表中选择要使用的管道。
4. 保存配置。此后，数据集中的文档将按所选管道处理。

</template>
</BiRow>

<BiRow>
<template #en>

If no pipeline is currently available, you can use the entry provided in the pipeline area to go to **Agent** and create one.

</template>
<template #zh>

如果当前没有可用管道，可以使用管道区域提供的入口前往 **Agent** 创建。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: For pipeline creation, node configuration, and flow orchestration, see [**Ingestion Pipeline**](https://ragflow.io/docs/guides/agent/agent_overview).

</template>
<template #zh>

> 注意：管道创建、节点配置与流程编排，参见[**摄取管道**](https://ragflow.io/docs/guides/agent/agent_overview)。

</template>
</BiRow>

<BiRow>
<template #en>

### Auto Metadata: Automatic Metadata Configuration

</template>
<template #zh>

### 自动元数据（Auto Metadata）：自动元数据配置

</template>
</BiRow>

<BiRow>
<template #en>

**Auto Metadata** is used to configure metadata automatically generated during document parsing. The system supports two types of metadata: **Generation** and **Built-in**. You can configure them separately as needed.

</template>
<template #zh>

**自动元数据**用于配置文档解析过程中自动生成的元数据。系统支持两类元数据：**生成（Generation）**和**内置（Built-in）**，可按需分别配置。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: Changes in **Metadata generation settings** only take effect for newly parsed documents later. They do not automatically update documents that have already completed parsing. To apply the new configuration to existing documents, parse the relevant documents again.

</template>
<template #zh>

> 注意：**元数据生成设置（Metadata generation settings）**的变更仅对之后新解析的文档生效，不会自动更新已完成解析的文档。要让新配置应用于已有文档，需重新解析相应文档。

</template>
</BiRow>

<BiRow>
<template #en>

#### Generation: Custom Metadata Generation

</template>
<template #zh>

#### 生成（Generation）：自定义元数据生成

</template>
</BiRow>

<BiRow>
<template #en>

**Generation** is used to customize metadata fields that need to be generated from document content. Click **Add** to add a field and configure the following items as needed:

</template>
<template #zh>

**生成**用于自定义需要从文档内容生成的元数据字段。点击**添加（Add）**新增字段，并按需配置以下各项：

</template>
</BiRow>

<BiRow>
<template #en>

- **Field**: The metadata field name.
- **Description**: The field description, used to explain the information to extract or generate from the document.
- **Type**: The field's data type.
- **Values**: The allowed values for the field, used to restrict the generated result's value range.

</template>
<template #zh>

- **字段（Field）**：元数据字段名。
- **描述（Description）**：字段描述，用来说明要从文档中提取或生成的信息。
- **类型（Type）**：字段的数据类型。
- **取值（Values）**：字段的允许取值，用于限制生成结果的取值范围。

</template>
</BiRow>

<BiRow>
<template #en>

After saving, the system generates corresponding metadata from document content during subsequent document parsing based on these field definitions.

</template>
<template #zh>

保存后，系统在后续解析文档时会基于这些字段定义，从文档内容生成相应的元数据。

</template>
</BiRow>

<BiRow>
<template #en>

#### Built-in: Built-in Metadata

</template>
<template #zh>

#### 内置（Built-in）：内置元数据

</template>
</BiRow>

<BiRow>
<template #en>

**Built-in** provides system-predefined metadata fields. You do not need to manually create or configure field rules. Use the switch on the right side of each corresponding field to choose whether to generate that metadata during document parsing. The following built-in fields are currently supported:

</template>
<template #zh>

**内置**提供系统预定义的元数据字段，无需手动创建或配置字段规则。使用各字段右侧的开关选择文档解析时是否生成该元数据。目前支持的内置字段如下：

</template>
</BiRow>

<BiRow>
<template #en>

- **update_time**: Records the document update time.
- **file_name**: Records the document file name.

</template>
<template #zh>

- **update_time**：记录文档更新时间。
- **file_name**：记录文档文件名。

</template>
</BiRow>

<BiRow>
<template #en>

Select the fields to use, enable their switches, and then click **Save** to save the configuration. Generated metadata can be used in document management and retrieval filtering. To view or edit generated metadata, [**Metadata management**](https://ragflow.io/docs/guides/dataset/metadata_management).

</template>
<template #zh>

选择要使用的字段并启用开关，然后点击**保存**以保存配置。生成的元数据可用于文档管理和检索过滤。要查看或编辑生成的元数据，参见[**元数据管理（Metadata management）**](https://ragflow.io/docs/guides/dataset/metadata_management)。

</template>
</BiRow>

<BiRow>
<template #en>

### Table Column Role Configuration

</template>
<template #zh>

### 表格列角色配置

</template>
</BiRow>

<BiRow>
<template #en>

When a dataset uses **Table** as the built-in parsing method, you can use **Column mode** to set the purpose of each table column during parsing and retrieval. A column can be included in chunk text for indexing, used only as metadata, or used for both.

</template>
<template #zh>

数据集采用**表格**作为内置解析方法时，可以通过**列模式**设置每个表格列在解析和检索中的用途。一列既可以纳入分块文本用于索引，也可以仅用作元数据，或两者兼用。

</template>
</BiRow>

<BiRow>
<template #en>

#### Auto

</template>
<template #zh>

#### 自动（Auto）

</template>
</BiRow>

<BiRow>
<template #en>

When **Auto** is selected, all columns are included in chunk text and are also stored as metadata. This is RAGFlow's default setting. This mode is suitable when you do not need to distinguish the purpose of each column and want all table content to participate in retrieval and also be available as metadata.

</template>
<template #zh>

选择**自动**时，所有列都会纳入分块文本，同时存储为元数据。这是 RAGFlow 的默认设置。该模式适合不需要区分各列用途、希望全部表格内容既参与检索又可用作元数据的场景。

</template>
</BiRow>

<BiRow>
<template #en>

#### Manual

</template>
<template #zh>

#### 手动（Manual）

</template>
</BiRow>

<BiRow>
<template #en>

When **Manual** is selected, RAGFlow identifies columns in the table and displays them one by one according to the original table column names. For example, **CRIM**, **ZN**, **INDUS**, **CHAS**, and similar names in the interface come from the column names in the current table. They are not predefined RAGFlow fields.

</template>
<template #zh>

选择**手动**时，RAGFlow 会识别表格中的列，并按表格的原始列名逐个展示。例如界面中的 **CRIM**、**ZN**、**INDUS**、**CHAS** 等名称来自当前表格的列名，并非 RAGFlow 预定义的字段。

</template>
</BiRow>

<BiRow>
<template #en>

Users can assign one of the following roles to each column through the drop-down menu on the right side of each column name:

</template>
<template #zh>

用户可通过各列名右侧的下拉菜单为每列指定以下角色之一：

</template>
</BiRow>

<BiRow>
<template #en>

- **Indexing**: Includes the column content in chunk text for vector retrieval and full-text retrieval. This is suitable for columns that contain the main retrieval content.
- **Metadata**: Saves the column only as metadata and does not include it in chunk text. This column can be used as a filter field to narrow the retrieval scope.
- **Both**: Uses the column for both indexing and metadata. The column is included in chunk text and participates in vector retrieval and full-text retrieval, and can also be used as metadata for filtering.

</template>
<template #zh>

- **索引（Indexing）**：将列内容纳入分块文本，参与向量检索和全文检索。适合包含主要检索内容的列。
- **元数据（Metadata）**：仅将列保存为元数据，不纳入分块文本。该列可用作过滤字段，缩小检索范围。
- **两者（Both）**：列同时用于索引和元数据。列内容纳入分块文本，参与向量检索和全文检索，同时可用作元数据进行过滤。

</template>
</BiRow>

<BiRow>
<template #en>

For example, if a table contains four columns, **Title**, **Content**, **Category**, and **Year**, you can set them according to actual use:

</template>
<template #zh>

例如，某表格包含 **Title**、**Content**、**Category**、**Year** 四列，可按实际用途设置：

</template>
</BiRow>

<BiRow>
<template #en>

- **Title -> Both**: The title participates in retrieval and can also be used as metadata.
- **Content -> Indexing**: The body text is mainly used for content retrieval.
- **Category -> Metadata**: Used to filter retrieval results by category.
- **Year -> Metadata**: Used to filter retrieval results by year.

</template>
<template #zh>

- **Title -> Both**：标题参与检索，也可用作元数据。
- **Content -> Indexing**：正文主要用于内容检索。
- **Category -> Metadata**：用于按类别过滤检索结果。
- **Year -> Metadata**：用于按年份过滤检索结果。

</template>
</BiRow>

<BiRow>
<template #en>

In this way, fields that do not need to participate in content retrieval can be prevented from entering chunk text, while these fields are still preserved as retrieval filter conditions.

</template>
<template #zh>

这样，无需参与内容检索的字段就不会进入分块文本，同时仍保留为检索过滤条件。

</template>
</BiRow>

<BiRow>
<template #en>

> Note: Column role configuration applies to the column structure of a table, not to individual cells. After configuration is modified, the new settings apply to subsequently parsed documents. For documents that have already completed parsing, the documents must be parsed again before the new column roles take effect.

</template>
<template #zh>

> 注意：列角色配置作用于表格的列结构，而非单个单元格。配置修改后，新设置应用于后续解析的文档；对已完成解析的文档，需重新解析后新列角色才生效。

</template>
</BiRow>

<BiRow>
<template #en>

### Associated Data Sources

</template>
<template #zh>

### 关联数据源

</template>
</BiRow>

<BiRow>
<template #en>

The **Data source** area is used to associate the current dataset with data sources that have already been added.

</template>
<template #zh>

**数据源（Data source）**区域用于将当前数据集与已添加的数据源建立关联。

</template>
</BiRow>

<BiRow>
<template #en>

Click **Link data source** and select the data source to associate from existing data sources. After association, the current dataset can use the data provided by that data source. This area is only used to establish and manage the association between the dataset and data sources. It does not provide data source creation or connection configuration.

</template>
<template #zh>

点击**关联数据源（Link data source）**，从已有数据源中选择要关联的数据源。关联后，当前数据集即可使用该数据源提供的数据。该区域仅用于建立和管理数据集与数据源之间的关联，不提供数据源的创建或连接配置。

</template>
</BiRow>

<BiRow>
<template #en>

> Tip: To add a new data source, or configure data source connection information, synchronization methods, and other settings, see [**Data source**](https://ragflow.io/docs/guides/data_source/overview_and_page_management). After adding the data source, return to the dataset configuration page to associate it.

</template>
<template #zh>

> 提示：要添加新数据源，或配置数据源连接信息、同步方式等设置，参见[**数据源**](https://ragflow.io/docs/guides/data_source/overview_and_page_management)。添加数据源后，回到数据集配置页面进行关联。

</template>
</BiRow>
