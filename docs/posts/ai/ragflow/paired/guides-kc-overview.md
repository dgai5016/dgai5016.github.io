<BiRow>
<template #en>

Knowledge compilation converts unstructured documents into structured knowledge content. The system analyzes information in documents with a large language model and generates different types of knowledge artifacts based on the compilation template selected by the user.

</template>
<template #zh>

知识编译（Knowledge Compilation）将非结构化文档转换为结构化的知识内容。系统借助大语言模型分析文档中的信息，并根据用户选择的编译模板生成不同类型的知识工件（knowledge artifact）。

</template>
</BiRow>

<BiRow>
<template #en>

Generated knowledge artifacts can be used for knowledge retrieval, intelligent Q&A, and Agent applications, helping users quickly understand and use key information in documents. The following knowledge artifact types are currently supported:

</template>
<template #zh>

生成的知识工件可用于知识检索、智能问答和 Agent 应用，帮助用户快速理解并使用文档中的关键信息。目前支持以下知识工件类型：

</template>
</BiRow>

<BiRow>
<template #en>

- **Knowledge graph**: Displays entities in documents and their relationships. It is suitable for content such as personal relationships, organizational structures, and product relationships.
- **Knowledge tree**: Organizes document content by hierarchy. It is suitable for chapter structures, topic classification, and knowledge system organization.
- **Page index**: Preserves the original document structure and enhances chapter positioning. It is suitable for manuals, specifications, reports, and similar materials.
- **Mind map**: Expands content relationships around core topics and helps users quickly understand the overall document structure.
- **Timeline**: Organizes event information in chronological order. It is suitable for historical materials, project records, event tracking, and similar content.
- **Knowledge page**: Generates interconnected knowledge pages. It is suitable for enterprise knowledge, product materials, and domain knowledge management.

</template>
<template #zh>

- **知识图谱**：展示文档中的实体及其关系。适用于人物关系、组织结构、产品关系等内容。
- **知识树**：按层级组织文档内容。适用于章节结构、主题分类和知识体系梳理。
- **页面索引**：保留文档原有结构并增强章节定位。适用于手册、规范、报告等材料。
- **思维导图**：围绕核心主题展开各部分内容的关系，帮助用户快速了解文档整体结构。
- **时间线**：按时间先后顺序组织事件信息。适用于历史资料、项目记录、事件追踪等内容。
- **知识页面**：生成相互关联的知识页面。适用于企业知识、产品资料和领域知识管理。

</template>
</BiRow>

<BiRow>
<template #en>

Generated knowledge artifacts can be used as auxiliary information for subsequent retrieval and Q&A, improving the efficiency of knowledge queries and content understanding.

</template>
<template #zh>

生成的知识工件可作为后续检索和问答的辅助信息，提升知识查询和内容理解的效率。

</template>
</BiRow>

<BiRow>
<template #en>

## Core Concepts

</template>
<template #zh>

## 核心概念

</template>
</BiRow>

<BiRow>
<template #en>

Before using knowledge compilation, you need to understand the following basic concepts:

</template>
<template #zh>

在使用知识编译之前，需要先了解以下基本概念：

</template>
</BiRow>

<BiRow>
<template #en>

- **Compilation template**: Defines how knowledge compilation is generated, including the information types to extract, the organization structure, and generation rules. Users can select different templates based on actual requirements to generate the corresponding knowledge artifacts.
- **Knowledge artifact**: A structured result produced by knowledge compilation, including knowledge graphs, knowledge trees, page indexes, mind maps, timelines, and knowledge pages. Different knowledge artifact types are suitable for different information organization scenarios.
- **Compilation node**: A processing node in the knowledge compilation flow that executes a specified compilation task. When using a compilation node, you need to associate it with the corresponding compilation template to determine the format and structure of the generated content.

</template>
<template #zh>

- **编译模板**：定义知识编译的生成方式，包括要提取的信息类型、组织结构和生成规则。用户可根据实际需求选择不同模板，生成相应的知识工件。
- **知识工件**：知识编译产出的结构化结果，包括知识图谱、知识树、页面索引、思维导图、时间线和知识页面。不同类型的知识工件适用于不同的信息组织场景。
- **编译节点**：知识编译流程中的处理节点，负责执行指定的编译任务。使用编译节点时，需要关联相应的编译模板，以确定生成内容的格式和结构。

</template>
</BiRow>

<BiRow>
<template #en>

## Template Selection Recommendations

</template>
<template #zh>

## 模板选择建议

</template>
</BiRow>

<BiRow>
<template #en>

Knowledge compilation provides multiple built-in templates. Different templates are suitable for different knowledge organization methods. When creating a knowledge compilation template, select an appropriate template based on the document content and the expected knowledge artifact.

</template>
<template #zh>

知识编译提供多个内置模板。不同模板适用于不同的知识组织方式。创建知识编译模板时，请根据文档内容和期望的知识工件选择合适的模板。

</template>
</BiRow>

<BiRow>
<template #en>

| Template | Applicable Scenario |
| --- | --- |
| Graph | Suitable for extracting entities and relationships between entities in documents, such as people, organizations, products, and their relationships. |
| Tree | Suitable for organizing document content by topic and hierarchy, arranging knowledge into a tree structure. |
| PageIndex | Suitable for preserving the original chapter and page structure of a document and building a hierarchical index for quick content positioning and retrieval. |
| MindMap | Suitable for extracting core topics and branch content from documents and displaying the knowledge structure as a mind map. |
| Timeline | Suitable for documents that contain clear time information and events, organizing and displaying events in chronological order. |
| Wiki | Suitable for documents with substantial content and relationships between topics, organizing the content into interconnected Wiki pages. |

</template>
<template #zh>

| 模板 | 适用场景 |
| --- | --- |
| Graph | 适合提取文档中的实体及实体间关系，例如人物、组织、产品及其相互关系。 |
| Tree | 适合按主题和层级组织文档内容，将知识整理成树状结构。 |
| PageIndex | 适合保留文档原有章节和页面结构，构建层级索引以便快速定位和检索内容。 |
| MindMap | 适合从文档中提取核心主题和分支内容，以思维导图的形式展示知识结构。 |
| Timeline | 适合包含明确时间信息和事件的文档，按时间顺序组织并展示事件。 |
| Wiki | 适合内容量大且主题间存在关联的文档，将内容组织为相互关联的 Wiki 页面。 |

</template>
</BiRow>

<BiRow>
<template #en>

After selecting a template, you can also adjust global rules and template-specific configurations based on actual business requirements to control the content and generation results of knowledge compilation.

</template>
<template #zh>

选定模板后，还可以根据实际业务需求调整全局规则和模板专属配置，以控制知识编译的内容和生成结果。

</template>
</BiRow>

<BiRow>
<template #en>

## Preparation Before Starting

</template>
<template #zh>

## 开始前的准备

</template>
</BiRow>

<BiRow>
<template #en>

Before configuration, confirm the following conditions:

</template>
<template #zh>

配置之前，请确认以下条件：

</template>
</BiRow>

<BiRow>
<template #en>

- An available LLM has been configured, and the model has strong text understanding, structured output, and reasoning capabilities.
- You have created or plan to create an Ingestion Pipeline that includes Parser, Chunker, Compiler, and Indexer.
- Source documents with clear topics and reliable content are ready.
- The template type to use has been determined based on the target knowledge structure.

</template>
<template #zh>

- 已配置可用的大语言模型（LLM），且该模型具有较强的文本理解、结构化输出和推理能力。
- 已创建或计划创建包含解析器（Parser）、分块器（Chunker）、编译器（Compiler）和索引器（Indexer）的摄取管道（Ingestion Pipeline）。
- 已准备好主题清晰、内容可靠的源文档。
- 已根据目标知识结构确定要使用的模板类型。

</template>
</BiRow>

<BiRow>
<template #en>

Recommendation: When using this feature for the first time, select a small number of representative documents for testing. After confirming the output structure and quality, process data at a larger scale.

</template>
<template #zh>

建议：首次使用该功能时，先选取少量有代表性的文档进行测试，确认输出结构和质量后再进行更大规模的数据处理。

</template>
</BiRow>

<BiRow>
<template #en>

## Standard Workflow

</template>
<template #zh>

## 标准工作流

</template>
</BiRow>

<BiRow>
<template #en>

1. **Create a knowledge compilation template**: On the Agent page, select **Compilation Operator** when creating a new Agent. Then create a template based on the type of knowledge artifact to generate and complete the related parameter configuration.
2. **Configure the Ingestion Pipeline**: Add Compiler to the Ingestion Pipeline and select the created knowledge compilation template.
3. **Apply the Ingestion Pipeline**: In Dataset, select the documents to process and apply the configured Ingestion Pipeline.
4. **Execute knowledge compilation**: The system parses documents according to the Pipeline configuration and generates the corresponding knowledge artifacts based on the selected template.
5. **View knowledge artifacts**: After compilation is complete, view generated artifacts such as Graph, Tree, PageIndex, MindMap, Timeline, or Wiki.

</template>
<template #zh>

1. **创建知识编译模板**：在 Agent 页面新建 Agent 时选择**编译算子（Compilation Operator）**，然后根据要生成的知识工件类型创建模板，并完成相关参数配置。
2. **配置摄取管道**：在摄取管道中添加编译器，并选择已创建的知识编译模板。
3. **应用摄取管道**：在数据集中选择要处理的文档，应用已配置的摄取管道。
4. **执行知识编译**：系统按管道配置解析文档，并基于所选模板生成相应的知识工件。
5. **查看知识工件**：编译完成后，查看生成的 Graph、Tree、PageIndex、MindMap、Timeline 或 Wiki 等工件。

</template>
</BiRow>

<BiRow>
<template #en>

![Create a knowledge compilation template](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/usage-flow-standard-usage-flow.jpg)

</template>
<template #zh>

![创建知识编译模板](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/usage-flow-standard-usage-flow.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Choose Compilation Operator](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/usage-flow-standard-usage-flow-2.jpg)

</template>
<template #zh>

![选择编译算子](https://raw.githubusercontent.com/infiniflow/ragflow-docs/78dcfd707366b45934720c7abe480897f31ecbe7/images/usage-flow-standard-usage-flow-2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Note: This section helps users quickly understand the overall workflow of knowledge compilation and only shows the operation interface for "creating a knowledge compilation template". Ingestion Pipeline configuration, document application, knowledge artifact viewing, and other operations are described in detail in the corresponding later chapters with interface screenshots. For specific operations, refer to the relevant chapters.

</template>
<template #zh>

说明：本节帮助用户快速了解知识编译的整体工作流，仅展示「创建知识编译模板」的操作界面。摄取管道配置、文档应用、知识工件查看等操作将在后续相应章节中结合界面截图详细说明。具体操作请参阅相关章节。

</template>
</BiRow>

<BiRow>
<template #en>

Typical flow: Parser -> Chunker -> Compiler -> Indexer.

</template>
<template #zh>

典型流程：解析器 -> 分块器 -> 编译器 -> 索引器。

</template>
</BiRow>

<BiRow>
<template #en>

Parser is responsible for parsing, Chunker is responsible for splitting, Compiler is responsible for knowledge compilation, and Indexer is responsible for building the indexes required for subsequent retrieval.

</template>
<template #zh>

解析器负责解析文档，分块器负责切分内容，编译器负责知识编译，索引器负责构建后续检索所需的索引。

</template>
</BiRow>
