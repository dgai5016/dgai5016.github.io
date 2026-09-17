<BiRow>
<template #en>

## Graph

</template>
<template #zh>

## Graph

</template>
</BiRow>

<BiRow>
<template #en>

Graph extracts entities and relationships from documents, helping users build a knowledge network in the document. Users can configure the Graph template to define the entity types, relationship types, and extraction rules that need to be recognized. Based on the configuration, the system identifies and associates key information in documents to generate the corresponding knowledge graph.

</template>
<template #zh>

Graph 从文档中抽取实体和关系，帮助用户在文档中构建知识网络。用户可以配置 Graph 模板，定义需要识别的实体类型、关系类型和抽取规则。系统会基于该配置识别并关联文档中的关键信息，生成对应的知识图谱。

</template>
</BiRow>

<BiRow>
<template #en>

Graph configuration mainly includes:

</template>
<template #zh>

Graph 配置主要包括：

</template>
</BiRow>

<BiRow>
<template #en>

- Global rules
- EntitySpecification
- RelationSpecification
- Re-splitting Parser output

</template>
<template #zh>

- 全局规则
- EntitySpecification
- RelationSpecification
- 重新切分解析器输出

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules set general requirements for the knowledge graph extraction process and apply to the current Graph template. Users can enter global rules to supplement the entity recognition scope, relationship extraction requirements, naming conventions, and other restrictions.

</template>
<template #zh>

全局规则为知识图谱抽取过程设定通用要求，作用于当前 Graph 模板。用户可以输入全局规则，补充实体识别范围、关系抽取要求、命名规范等其他限制。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration recommendations:

</template>
<template #zh>

配置建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Describe the entities and relationships that need focused attention based on the business scenario.
- Avoid overly broad rules to reduce invalid entity generation.
- For professional domain documents, supplement domain-specific constraints through rules.

</template>
<template #zh>

- 结合业务场景描述需要重点关注的实体和关系。
- 避免设置过于宽泛的规则，以减少无效实体的生成。
- 针对专业领域文档，通过规则补充领域约束。

</template>
</BiRow>

<BiRow>
<template #en>

Example: Extract only core people, organizations, products, and key events from the document. Keep entity names complete and do not generate entities that cannot be confirmed.

</template>
<template #zh>

示例：仅从文档中抽取核心人物、组织、产品和关键事件。保持实体名称完整，不生成无法确认的实体。

</template>
</BiRow>

<BiRow>
<template #en>

### EntitySpecification

</template>
<template #zh>

### EntitySpecification

</template>
</BiRow>

<BiRow>
<template #en>

EntitySpecification defines the entity types that need to be recognized in the knowledge graph. Click an entity type card to enter the entity configuration page.

</template>
<template #zh>

EntitySpecification 定义知识图谱中需要识别的实体类型。点击实体类型卡片可进入实体配置页面。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration items:

</template>
<template #zh>

配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Entity type name, used to identify the current entity category. |
| Description | Describes the object scope corresponding to this entity type. |
| Rule | Defines entity extraction requirements, such as recognition scope, naming conventions, and restrictions. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 实体类型名称，用于标识当前实体类别。 |
| 描述 | 描述该实体类型对应的对象范围。 |
| 规则 | 定义实体抽取要求，如识别范围、命名规范和限制。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default node types:

</template>
<template #zh>

系统提供以下默认节点类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Entity Name | Description |
| --- | --- |
| person | Person entity, used to represent natural persons or specific individuals, such as authors, employees, customers, historical figures, and similar entities. |
| org | Organization entity, used to represent companies, institutions, departments, associations, or other organizational groups. |
| product | Product entity, used to represent specific products, services, software, solutions, or other business offerings. |
| regulation | Regulation entity, used to represent laws, policies, standards, specifications, guidance documents, or regulatory documents. |
| location | Location entity, used to represent geographic locations, including countries, cities, addresses, regions, or natural geographic entities. |
| other | Other entity, used to represent business-meaningful entity objects that do not belong to the categories above. |

</template>
<template #zh>

| 实体名称 | 描述 |
| --- | --- |
| person | 人物实体，用于表示自然人或特定个人，例如作者、员工、客户、历史人物等。 |
| org | 组织实体，用于表示公司、机构、部门、协会或其他组织团体。 |
| product | 产品实体，用于表示具体的产品、服务、软件、解决方案或其他业务提供物。 |
| regulation | 法规实体，用于表示法律、政策、标准、规范、指导文件或监管文件。 |
| location | 地点实体，用于表示地理位置，包括国家、城市、地址、地区或自然地理实体。 |
| other | 其他实体，用于表示不属于以上类别、具有业务意义的实体对象。 |

</template>
</BiRow>

<BiRow>
<template #en>

### RelationSpecification

</template>
<template #zh>

### RelationSpecification

</template>
</BiRow>

<BiRow>
<template #en>

RelationSpecification defines the entity relationship types that need to be recognized in the knowledge graph. The system provides some preset relationship types to cover common entity association scenarios. Users can adjust relationship types based on business requirements.

</template>
<template #zh>

RelationSpecification 定义知识图谱中需要识别的实体关系类型。系统提供部分预设关系类型，覆盖常见的实体关联场景。用户可以根据业务需求调整关系类型。

</template>
</BiRow>

<BiRow>
<template #en>

Users can:

</template>
<template #zh>

用户可以：

</template>
</BiRow>

<BiRow>
<template #en>

- Edit existing relationship types.
- Delete unnecessary relationship types.
- Add custom relationship types.

</template>
<template #zh>

- 编辑现有关系类型。
- 删除不需要的关系类型。
- 添加自定义关系类型。

</template>
</BiRow>

<BiRow>
<template #en>

Click a relationship type card to enter the relationship configuration page.

</template>
<template #zh>

点击关系类型卡片可进入关系配置页面。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration items:

</template>
<template #zh>

配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Relationship type name, used to identify the current relationship category. |
| Description | Describes the entity association method represented by this relationship. |
| Rule | Supplements relationship extraction requirements, such as relationship direction, applicable scope, and restrictions. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 关系类型名称，用于标识当前关系类别。 |
| 描述 | 描述该关系所表示的实体关联方式。 |
| 规则 | 补充关系抽取要求，如关系方向、适用范围和限制。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default relationship types:

</template>
<template #zh>

系统提供以下默认关系类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Relationship Name | Description |
| --- | --- |
| owns | Ownership relationship, used to indicate ownership or possession between entities, such as a person owning assets or an enterprise owning products. |
| part_of | Composition relationship, used to indicate composition or inclusion between entities, such as a component belonging to a product or a department belonging to an organization. |
| caused_by | Causal relationship, used to indicate that an event, action, or state is caused by other factors. |
| regulates | Regulatory relationship, used to indicate that laws, standards, or specifications constrain, manage, or guide entities. |
| located_in | Location relationship, used to indicate location associations between entities, such as a company located in a city or a building located in a region. |
| other | Other relationship, used to represent valuable entity relationships that cannot be classified into the categories above. |

</template>
<template #zh>

| 关系名称 | 描述 |
| --- | --- |
| owns | 所有关系，用于表示实体之间的拥有或持有，例如个人拥有资产、企业拥有产品。 |
| part_of | 组成关系，用于表示实体之间的组成或包含，例如部件属于产品、部门属于组织。 |
| caused_by | 因果关系，用于表示事件、动作或状态由其他因素引起。 |
| regulates | 监管关系，用于表示法律、标准或规范对实体进行约束、管理或指导。 |
| located_in | 位置关系，用于表示实体之间的位置关联，例如公司位于某座城市、建筑位于某个地区。 |
| other | 其他关系，用于表示无法归入以上类别、有价值的实体关系。 |

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Recommendations

</template>
<template #zh>

### 配置建议

</template>
</BiRow>

<BiRow>
<template #en>

To improve knowledge graph extraction results, follow these principles:

</template>
<template #zh>

为了提升知识图谱的抽取效果，请遵循以下原则：

</template>
</BiRow>

<BiRow>
<template #en>

- Select entity types and relationship types that require attention based on business requirements.
- Delete default configurations that have no practical use to reduce invalid information extraction.
- Keep entity type names and descriptions clear, and avoid using multiple types to represent similar concepts.
- Relationship types should have clear meanings and avoid overly broad definitions.
- For complex business scenarios, add extra constraints through the rule field.

</template>
<template #zh>

- 根据业务需求选择需要关注的实体类型和关系类型。
- 删除没有实际用处的默认配置，以减少无效信息抽取。
- 保持实体类型名称和描述清晰，避免用多种类型表示相似概念。
- 关系类型应含义明确，避免定义过于宽泛。
- 对于复杂业务场景，通过规则（rule）字段补充额外约束。

</template>
</BiRow>

<BiRow>
<template #en>

![Graph configuration recommendations](/ragflow-images/graph-configuration-recommendations.jpg)

</template>
<template #zh>

![Graph 配置建议](/ragflow-images/graph-configuration-recommendations.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Tree

</template>
<template #zh>

## Tree

</template>
</BiRow>

<BiRow>
<template #en>

The Tree template controls the final knowledge tree generation result mainly through summary rules, summary length, content clustering, and tree structure parameters.

</template>
<template #zh>

Tree 模板主要通过摘要规则、摘要长度、内容聚类和树结构参数来控制最终知识树的生成结果。

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules set the overall requirements that the Tree template should follow when generating structures and summaries. Users can use global rules to supplement the document processing direction, such as specifying information types to focus on, summary generation methods, or content organization requirements.

</template>
<template #zh>

全局规则设定 Tree 模板在生成结构和摘要时应遵循的总体要求。用户可以通过全局规则补充文档处理方向，例如指定重点关注的信息类型、摘要生成方式或内容组织要求。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration recommendations:

</template>
<template #zh>

配置建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Set content that requires focused attention based on document characteristics.
- For specific business scenarios, supplement additional content extraction requirements.
- Avoid overly broad or complex rules to ensure the generated results meet expectations.

</template>
<template #zh>

- 根据文档特点设置需要重点关注的内容。
- 针对特定业务场景，补充额外的内容抽取要求。
- 避免设置过于宽泛或复杂的规则，以确保生成结果符合预期。

</template>
</BiRow>

<BiRow>
<template #en>

Example: Summarize the main topics, key events, and important information in the document. Keep the content accurate and do not add information that does not appear in the document.

</template>
<template #zh>

示例：总结文档中的主要主题、关键事件和重要信息。保持内容准确，不添加文档中未出现的信息。

</template>
</BiRow>

<BiRow>
<template #en>

### Summary Prompt

</template>
<template #zh>

### 摘要提示词

</template>
</BiRow>

<BiRow>
<template #en>

Sets the generation rules for node summaries and controls the information and output format the system focuses on when summarizing each node. Users can adjust the summary direction based on actual requirements, such as emphasizing key content, core conclusions, or important information.

</template>
<template #zh>

设定节点摘要的生成规则，控制系统在为各节点生成摘要时关注的信息和输出格式。用户可以根据实际需求调整摘要方向，例如强调重点内容、核心结论或重要信息。

</template>
</BiRow>

<BiRow>
<template #en>

### Maximum Tokens

</template>
<template #zh>

### 最大 token 数

</template>
</BiRow>

<BiRow>
<template #en>

Sets the maximum length for node summary generation. A larger value can preserve more summary information and is suitable for more complex documents. A smaller value can generate more concise summaries and is suitable for quickly viewing a document overview.

</template>
<template #zh>

设定节点摘要生成的最大长度。值越大，可保留的摘要信息越多，适合较复杂的文档；值越小，生成的摘要更简洁，适合快速浏览文档概览。

</template>
</BiRow>

<BiRow>
<template #en>

### Clustering Threshold

</template>
<template #zh>

### 聚类阈值

</template>
</BiRow>

<BiRow>
<template #en>

Adjusts the matching degree during document content clustering and affects how related content is merged into the same topic node. Increasing this parameter makes content division stricter and usually generates more detailed topic nodes. Decreasing this parameter merges more related content together, making the structure more concentrated.

</template>
<template #zh>

调整文档内容聚类时的匹配程度，影响相关内容如何合并到同一主题节点。调大该参数会让内容划分更严格，通常会生成更细致的主题节点。调小该参数会把更多相关内容合并到一起，使结构更集中。

</template>
</BiRow>

<BiRow>
<template #en>

### Clustering Ratio

</template>
<template #zh>

### 聚类比例

</template>
</BiRow>

<BiRow>
<template #en>

Adjusts the content clustering ratio in the Tree structure and affects the number of final hierarchy levels and the structure detail. Increasing this parameter usually generates a richer hierarchy. Decreasing this parameter can reduce the number of nodes and make the overall structure more concise.

</template>
<template #zh>

调整 Tree 结构中的内容聚类比例，影响最终层级数量和结构细节。调大该参数通常会生成更丰富的层级。调小该参数可以减少节点数量，使整体结构更简洁。

</template>
</BiRow>

<BiRow>
<template #en>

![Tree clustering ratio](/ragflow-images/tree-clustering-ratio.jpg)

</template>
<template #zh>

![Tree 聚类比例](/ragflow-images/tree-clustering-ratio.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## PageIndex

</template>
<template #zh>

## PageIndex

</template>
</BiRow>

<BiRow>
<template #en>

PageIndex generates a hierarchical index based on the chapter structure in a document, helping users quickly locate document content. This template is suitable for documents with clear title hierarchies, such as books, reports, and specification documents.

</template>
<template #zh>

PageIndex 基于文档中的章节结构生成层级索引，帮助用户快速定位文档内容。该模板适合具有清晰标题层级的文档，例如图书、报告和规范文档。

</template>
</BiRow>

<BiRow>
<template #en>

By configuring entity fields and relationship rules, PageIndex can extract chapter titles, key facts, and summary content from documents, and establish hierarchical relationships between chapters.

</template>
<template #zh>

通过配置实体字段和关系规则，PageIndex 可以从文档中抽取章节标题、关键事实和摘要内容，并在章节之间建立层级关系。

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules define general requirements that must be followed during PageIndex content extraction, such as chapter recognition scope, content extraction specifications, and index generation rules.

</template>
<template #zh>

全局规则定义 PageIndex 内容抽取过程中必须遵循的通用要求，例如章节识别范围、内容抽取规范和索引生成规则。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration recommendations:

</template>
<template #zh>

配置建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Preserve the original chapter structure of the document and generate an index according to the title hierarchy in the document.
- Prefer the original chapter titles as index node names.
- Extract only key information related to each chapter topic and avoid generating irrelevant content.
- For content without clear titles, it is not recommended to force-generate chapter nodes.

</template>
<template #zh>

- 保留文档的原始章节结构，按照文档中的标题层级生成索引。
- 优先使用原始章节标题作为索引节点名称。
- 仅抽取与各章节主题相关的关键信息，避免生成无关内容。
- 对于没有明确标题的内容，不建议强行生成章节节点。

</template>
</BiRow>

<BiRow>
<template #en>

### EntitySpecification

</template>
<template #zh>

### EntitySpecification

</template>
</BiRow>

<BiRow>
<template #en>

EntitySpecification defines the content fields that PageIndex needs to extract. Different fields record different types of information in chapters. Users can adjust the default fields provided by the system based on requirements, or add new fields.

</template>
<template #zh>

EntitySpecification 定义 PageIndex 需要抽取的内容字段。不同字段记录章节中不同类型的信息。用户可以按需调整系统提供的默认字段，或添加新字段。

</template>
</BiRow>

<BiRow>
<template #en>

Field configuration parameters:

</template>
<template #zh>

字段配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter Name | Description |
| --- | --- |
| Type | Field type, used to specify the information type to extract for the current field, such as title, fact, or conclusion. |
| Description | Field description, used to explain the specific content that needs to be extracted for this field, helping the system understand the field meaning and extraction scope. |
| Rule | Field rule, used to further constrain how content is extracted, including content format, length, extraction scope, and other requirements. |

</template>
<template #zh>

| 参数名称 | 描述 |
| --- | --- |
| 类型 | 字段类型，用于指定当前字段要抽取的信息类型，例如 title、fact 或 conclusion。 |
| 描述 | 字段描述，用于说明该字段需要抽取的具体内容，帮助系统理解字段含义和抽取范围。 |
| 规则 | 字段规则，用于进一步约束内容抽取方式，包括内容格式、长度、抽取范围等要求。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default fields:

</template>
<template #zh>

系统提供以下默认字段：

</template>
</BiRow>

<BiRow>
<template #en>

| Field Name | Description |
| --- | --- |
| title | Title field, used to extract titles or chapter names from the document. The title content should preserve the original text and should not include page numbers, numbering, or other irrelevant symbols. |
| fact | Fact field, used to extract key facts, rules, definitions, or explanatory content related to the current chapter, reflecting the core information of the chapter. |
| conclusion | Conclusion field, used to extract summaries, analysis results, or important conclusions from the chapter, supplementing the chapter's core viewpoints. |

</template>
<template #zh>

| 字段名称 | 描述 |
| --- | --- |
| title | 标题字段，用于从文档中抽取标题或章节名称。标题内容应保留原文，不应包含页码、编号等无关符号。 |
| fact | 事实字段，用于抽取与当前章节相关的关键事实、规则、定义或说明性内容，反映章节的核心信息。 |
| conclusion | 结论字段，用于抽取章节中的总结、分析结果或重要结论，补充章节的核心观点。 |

</template>
</BiRow>

<BiRow>
<template #en>

### RelationSpecification

</template>
<template #zh>

### RelationSpecification

</template>
</BiRow>

<BiRow>
<template #en>

RelationSpecification defines relationships between different chapter nodes. PageIndex uses the include relationship by default to represent inclusion between chapters, for example:

</template>
<template #zh>

RelationSpecification 定义不同章节节点之间的关系。PageIndex 默认使用 include 关系表示章节之间的包含关系，例如：

</template>
</BiRow>

<BiRow>
<template #en>

- A document contains chapters.
- A chapter contains subchapters.

</template>
<template #zh>

- 文档包含章节。
- 章节包含子章节。

</template>
</BiRow>

<BiRow>
<template #en>

Through this relationship, the system can generate a hierarchical index based on the original document structure.

</template>
<template #zh>

通过这一关系，系统可以基于原始文档结构生成层级索引。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration parameters:

</template>
<template #zh>

配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter | Description |
| --- | --- |
| Type | Relationship type, used to define the association method between entities. The current supported type is include, which indicates an inclusion relationship. |
| Description | Describes the meaning of the relationship and helps the model understand the association rules between two entities. |
| Rule | Further constrains relationship extraction logic, including relationship direction, applicable scope, and entity connection requirements. |

</template>
<template #zh>

| 参数 | 描述 |
| --- | --- |
| 类型 | 关系类型，用于定义实体之间的关联方式。当前支持的类型为 include，表示包含关系。 |
| 描述 | 描述关系的含义，帮助模型理解两个实体之间的关联规则。 |
| 规则 | 进一步约束关系抽取逻辑，包括关系方向、适用范围和实体连接要求。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default relationship type:

</template>
<template #zh>

系统提供以下默认关系类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Relationship Name | Description |
| --- | --- |
| conclusion | Conclusion relationship, used to represent findings, results, or conclusion information extracted based on document content. |

</template>
<template #zh>

| 关系名称 | 描述 |
| --- | --- |
| conclusion | 结论关系，用于表示基于文档内容抽取的发现、结果或结论信息。 |

</template>
</BiRow>

<BiRow>
<template #en>

Configuration recommendations:

</template>
<template #zh>

配置建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Keep the hierarchical relationships between chapters consistent with the original structure.
- Avoid adding associations without clear hierarchical evidence.
- For documents with simple structures, you can directly use the default relationship configuration.

</template>
<template #zh>

- 保持章节之间的层级关系与原始结构一致。
- 避免添加没有明确层级依据的关联。
- 对于结构简单的文档，可以直接使用默认关系配置。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Description

</template>
<template #zh>

### 配置说明

</template>
</BiRow>

<BiRow>
<template #en>

The PageIndex template is already configured with basic fields and relationship rules by default. Users can adjust them based on actual business requirements.

</template>
<template #zh>

PageIndex 模板默认已配置基础字段和关系规则。用户可以根据实际业务需求进行调整。

</template>
</BiRow>

<BiRow>
<template #en>

Supported operations:

</template>
<template #zh>

支持的操作：

</template>
</BiRow>

<BiRow>
<template #en>

- Edit field descriptions to optimize the content extraction scope.
- Add new entity fields to extend index information.
- Delete unnecessary fields to reduce invalid content generation.
- Modify relationship rules to adjust associations between chapters.

</template>
<template #zh>

- 编辑字段描述，以优化内容抽取范围。
- 添加新的实体字段，以扩展索引信息。
- 删除不需要的字段，以减少无效内容生成。
- 修改关系规则，以调整章节之间的关联。

</template>
</BiRow>

<BiRow>
<template #en>

![PageIndex configuration description](/ragflow-images/page-index-configuration-description.jpg)

</template>
<template #zh>

![PageIndex 配置说明](/ragflow-images/page-index-configuration-description.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## MindMap

</template>
<template #zh>

## MindMap

</template>
</BiRow>

<BiRow>
<template #en>

MindMap generates a hierarchical structure around the core topic of a document, displaying content relationships through a central topic, branches, and keywords. It helps users quickly understand the main content, knowledge structure, and concept relationships of a document.

</template>
<template #zh>

MindMap 围绕文档核心主题生成层级结构，通过中心主题、分支和关键词展示内容之间的关系，帮助用户快速了解文档的主要内容、知识结构和概念关系。

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules define the overall requirements for mind map generation, including topic extraction, hierarchical organization, and node naming conventions.

</template>
<template #zh>

全局规则定义思维导图生成的总体要求，包括主题抽取、层级组织和节点命名规范。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration recommendations:

</template>
<template #zh>

配置建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Generate a mind map around the core content of the document and prioritize extracting main topics.
- Use important topics as first-level branches and expand related details as lower-level branches.
- Keep node names concise and avoid using complete sentences as nodes.
- Maintain clear hierarchical relationships and avoid duplicate or circular references.
- Keep node language consistent with the original text.

</template>
<template #zh>

- 围绕文档核心内容生成思维导图，优先抽取主要主题。
- 将重要主题作为一级分支，相关细节展开为下级分支。
- 保持节点名称简洁，避免使用完整句子作为节点。
- 保持层级关系清晰，避免重复或循环引用。
- 节点语言与原文保持一致。

</template>
</BiRow>

<BiRow>
<template #en>

### EntitySpecification

</template>
<template #zh>

### EntitySpecification

</template>
</BiRow>

<BiRow>
<template #en>

EntitySpecification defines the node types in the mind map. Different node types correspond to information content at different levels. Users can adjust the default nodes provided by the system based on business requirements, including deleting existing nodes or adding custom nodes.

</template>
<template #zh>

EntitySpecification 定义思维导图中的节点类型。不同节点类型对应不同层级的信息内容。用户可以根据业务需求调整系统提供的默认节点，包括删除现有节点或添加自定义节点。

</template>
</BiRow>

<BiRow>
<template #en>

When configuring nodes, the main parameters are as follows. The system provides the following default node types:

</template>
<template #zh>

配置节点时的主要参数如下。系统提供以下默认节点类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Node Name | Description |
| --- | --- |
| CentralTopic | Core topic node, used to represent the main topic of the document or content as the center node of the mind map. |
| Branch | First-level branch node, used to represent the main directions, categories, or knowledge domains expanded around the core topic. |
| Sub-branch | Second-level branch node, used to represent specific concepts, tasks, cases, or detailed content under Branch. |
| Keyword | Keyword node, used to supplement other nodes with key concepts or core information. |

</template>
<template #zh>

| 节点名称 | 描述 |
| --- | --- |
| CentralTopic | 核心主题节点，用于表示文档或内容的主要主题，作为思维导图的中心节点。 |
| Branch | 一级分支节点，用于表示围绕核心主题展开的主要方向、类别或知识领域。 |
| Sub-branch | 二级分支节点，用于表示 Branch 下具体的概念、任务、案例或详细内容。 |
| Keyword | 关键词节点，用于为其他节点补充关键概念或核心信息。 |

</template>
</BiRow>

<BiRow>
<template #en>

### RelationSpecification

</template>
<template #zh>

### RelationSpecification

</template>
</BiRow>

<BiRow>
<template #en>

RelationSpecification defines the relationships between different nodes in the mind map and describes the hierarchy and content associations between nodes. The system uses relationship definitions to determine how nodes are connected, such as inclusion between the core topic and branches, or support relationships between branches and keywords.

</template>
<template #zh>

RelationSpecification 定义思维导图中不同节点之间的关系，描述节点之间的层级和内容关联。系统通过关系定义决定节点的连接方式，例如核心主题与分支之间的包含关系，或分支与关键词之间的支撑关系。

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter Name | Description |
| --- | --- |
| Type | Node type name, used to identify the role of the current node in the mind map. |
| Description | Describes the information content that this node needs to extract, helping the system understand the node definition and scope. |
| Rule | Further constrains node generation methods, including content selection, naming requirements, length limits, and other generation requirements. |

</template>
<template #zh>

| 参数名称 | 描述 |
| --- | --- |
| 类型 | 节点类型名称，用于标识当前节点在思维导图中的角色。 |
| 描述 | 描述该节点需要抽取的信息内容，帮助系统理解节点定义和范围。 |
| 规则 | 进一步约束节点生成方式，包括内容选择、命名要求、长度限制等生成要求。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides common relationship types. Users can adjust them based on business requirements, including adding, modifying, or deleting relationship types.

</template>
<template #zh>

系统提供常见的关系类型。用户可以根据业务需求进行调整，包括添加、修改或删除关系类型。

</template>
</BiRow>

<BiRow>
<template #en>

Relationship configuration parameters:

</template>
<template #zh>

关系配置参数：

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter Name | Description |
| --- | --- |
| Type | Relationship type name, used to identify the association method between nodes. |
| Description | Describes the connection meaning represented by this relationship, helping the system understand relationships between nodes. |
| Rule | Further restricts relationship generation conditions, such as applicable node types, connection direction, and relationship usage scenarios. |

</template>
<template #zh>

| 参数名称 | 描述 |
| --- | --- |
| 类型 | 关系类型名称，用于标识节点之间的关联方式。 |
| 描述 | 描述该关系所表示的连接含义，帮助系统理解节点之间的关系。 |
| 规则 | 进一步限制关系生成条件，如适用的节点类型、连接方向和关系使用场景。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default relationship types:

</template>
<template #zh>

系统提供以下默认关系类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Relationship Name | Description |
| --- | --- |
| has_branch | Indicates that the core topic contains major branches and is used to connect CentralTopic and Branch. |
| has_sub_branch | Indicates that a branch contains more specific sub-branches and is used to connect Branch and Sub-branch. |
| supports | Indicates that keywords, cases, or details provide supplementary explanation for an upper-level concept. |
| related_to | Indicates an association between two concepts that does not belong to a clear parent-child structure. |

</template>
<template #zh>

| 关系名称 | 描述 |
| --- | --- |
| has_branch | 表示核心主题包含主要分支，用于连接 CentralTopic 和 Branch。 |
| has_sub_branch | 表示分支包含更具体的子分支，用于连接 Branch 和 Sub-branch。 |
| supports | 表示关键词、案例或细节为上级概念提供补充说明。 |
| related_to | 表示两个概念之间存在关联，但不属于明确的父子结构。 |

</template>
</BiRow>

<BiRow>
<template #en>

Users can adjust relationship definitions based on document content characteristics:

</template>
<template #zh>

用户可以根据文档内容特点调整关系定义：

</template>
</BiRow>

<BiRow>
<template #en>

- For content with a clear hierarchy, use inclusion relationships such as topic -> branch -> sub-branch.
- For content with associations but no parent-child relationship, use association relationships.
- Relationship names should be concise and clear, and should reflect the connection meaning between nodes.
- Avoid configuring too many meaningless relationships to prevent generating a complex or hard-to-understand mind map structure.

</template>
<template #zh>

- 对于层级清晰的内容，使用主题 -> 分支 -> 子分支这类包含关系。
- 对于存在关联但没有父子关系的内容，使用关联关系。
- 关系名称应简洁明确，体现节点之间的连接含义。
- 避免配置过多无意义的关系，防止生成复杂、难以理解的思维导图结构。

</template>
</BiRow>

<BiRow>
<template #en>

### Node Configuration Description

</template>
<template #zh>

### 节点配置说明

</template>
</BiRow>

<BiRow>
<template #en>

In the node configuration area, users can view the currently configured node types and adjust them as needed.

</template>
<template #zh>

在节点配置区域，用户可以查看当前已配置的节点类型，并按需进行调整。

</template>
</BiRow>

<BiRow>
<template #en>

Supported operations:

</template>
<template #zh>

支持的操作：

</template>
</BiRow>

<BiRow>
<template #en>

- **Add node**: Add a new node type to meet specific business scenarios.
- **Delete node**: Remove a node type that does not need to participate in generation.
- **Modify node description**: Adjust the node definition, affecting how the system extracts content.

</template>
<template #zh>

- **添加节点**：添加新的节点类型，以满足特定业务场景。
- **删除节点**：移除不需要参与生成的节点类型。
- **修改节点描述**：调整节点定义，影响系统抽取内容的方式。

</template>
</BiRow>

<BiRow>
<template #en>

Recommendations:

</template>
<template #zh>

建议：

</template>
</BiRow>

<BiRow>
<template #en>

- Preserve a clear hierarchy and avoid configuring too many node types, which can make the structure complex.
- Node names should be short and clear for final display.
- Adjust node definitions based on document type. For example, technical documents can add types such as "module" and "function", while business documents can add types such as "process" and "role".

</template>
<template #zh>

- 保持清晰的层级，避免配置过多节点类型导致结构复杂。
- 节点名称应简短清晰，便于最终展示。
- 根据文档类型调整节点定义。例如，技术类文档可以添加「module」「function」等类型，业务类文档可以添加「process」「role」等类型。

</template>
</BiRow>

<BiRow>
<template #en>

![MindMap node configuration description](/ragflow-images/mind-map-node-configuration-description.jpg)

</template>
<template #zh>

![MindMap 节点配置说明](/ragflow-images/mind-map-node-configuration-description.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Timeline

</template>
<template #zh>

## Timeline

</template>
</BiRow>

<BiRow>
<template #en>

Timeline identifies key time information and related events in documents, then organizes event relationships in chronological order, helping users quickly understand the development process of events in the document.

</template>
<template #zh>

Timeline 识别文档中的关键时间信息及相关事件，并按时间顺序组织事件关系，帮助用户快速了解文档中事件的发展过程。

</template>
</BiRow>

<BiRow>
<template #en>

This template is suitable for documents that contain timelines, event records, historical processes, project progress, personal experiences, and similar content. It extracts time points (Timestamp) and corresponding events (Event) to generate a continuous time relationship chain.

</template>
<template #zh>

该模板适合包含时间线、事件记录、历史进程、项目进展、个人经历等内容的文档。它通过抽取时间点（Timestamp）和对应的事件（Event），生成连续的时间关系链。

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules define general requirements for Timeline extraction, including the scope of time information recognition, event extraction rules, and time relationship organization methods.

</template>
<template #zh>

全局规则定义 Timeline 抽取的通用要求，包括时间信息识别范围、事件抽取规则和时间关系组织方式。

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default rules:

</template>
<template #zh>

系统提供以下默认规则：

</template>
</BiRow>

<BiRow>
<template #en>

- Extract valid time information and corresponding events from the document.
- Organize event relationships in chronological order to form a continuous time chain.
- Preserve events with clear time evidence and do not delete events because they are difficult to sort.
- When multiple events have the same time information, arrange them in the order they appear in the document.

</template>
<template #zh>

- 从文档中抽取有效的时间信息和对应事件。
- 按时间顺序组织事件关系，形成连续的时间链。
- 保留有明确时间依据的事件，不因事件难以排序而将其删除。
- 当多个事件的时间信息相同时，按它们在文档中出现的顺序排列。

</template>
</BiRow>

<BiRow>
<template #en>

Users can adjust rules based on actual business requirements, such as specifying event types to focus on, limiting the time range, or supplementing domain-specific requirements.

</template>
<template #zh>

用户可以根据实际业务需求调整规则，例如指定重点关注的事件类型、限定时间范围或补充领域特定要求。

</template>
</BiRow>

<BiRow>
<template #en>

### EntitySpecification

</template>
<template #zh>

### EntitySpecification

</template>
</BiRow>

<BiRow>
<template #en>

Entity configuration defines the information types that need to be recognized and extracted in Timeline.

</template>
<template #zh>

实体配置定义 Timeline 中需要识别和抽取的信息类型。

</template>
</BiRow>

<BiRow>
<template #en>

Each entity contains the following configuration items:

</template>
<template #zh>

每个实体包含以下配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Entity type name, used to identify the information category to extract. |
| Description | Describes the content scope that the entity needs to extract, helping the model accurately recognize target information. |
| Rule | Further constrains entity extraction methods, such as format requirements, content restrictions, and special processing logic. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 实体类型名称，用于标识要抽取的信息类别。 |
| 描述 | 描述该实体需要抽取的内容范围，帮助模型准确识别目标信息。 |
| 规则 | 进一步约束实体抽取方式，如格式要求、内容限制和特殊处理逻辑。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default entity types:

</template>
<template #zh>

系统提供以下默认实体类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Entity Name | Description |
| --- | --- |
| timestamp | Indicates the time information when an event occurs. It can be a specific date, time point, or valid time range. |
| event | Indicates the event content corresponding to the time information and describes the main occurrence. |

</template>
<template #zh>

| 实体名称 | 描述 |
| --- | --- |
| timestamp | 表示事件发生的时间信息，可以是具体日期、时间点或有效时间范围。 |
| event | 表示时间信息对应的事件内容，描述主要发生的事情。 |

</template>
</BiRow>

<BiRow>
<template #en>

Users can add entity types based on actual requirements to supplement time-related information that needs attention.

</template>
<template #zh>

用户可以根据实际需求添加实体类型，补充需要关注的时间相关信息。

</template>
</BiRow>

<BiRow>
<template #en>

### RelationSpecification

</template>
<template #zh>

### RelationSpecification

</template>
</BiRow>

<BiRow>
<template #en>

Relationship configuration defines associations between entities and describes chronological order or other relationships between events.

</template>
<template #zh>

关系配置定义实体之间的关联，描述事件之间的时间先后顺序或其他关系。

</template>
</BiRow>

<BiRow>
<template #en>

Each relationship contains the following configuration items:

</template>
<template #zh>

每个关系包含以下配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Relationship type name, used to define the connection method between entities. |
| Description | Describes the meaning and applicable scenarios of the relationship. |
| Rule | Restricts relationship generation methods, such as sorting rules and connection conditions. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 关系类型名称，用于定义实体之间的连接方式。 |
| 描述 | 描述关系的含义和适用场景。 |
| 规则 | 限制关系生成方式，如排序规则和连接条件。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default relationship type:

</template>
<template #zh>

系统提供以下默认关系类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Relationship Name | Description | Rule Description |
| --- | --- | --- |
| ordered | Indicates that events are arranged in chronological order and is used to build a continuous time chain. | Sort events by occurrence time to form relationships from earliest to latest. When multiple events have the same time, arrange them in the order they appear in the document. |

</template>
<template #zh>

| 关系名称 | 描述 | 规则说明 |
| --- | --- | --- |
| ordered | 表示事件按时间顺序排列，用于构建连续的时间链。 | 按事件发生时间排序，形成从最早到最晚的关系。当多个事件时间相同时，按它们在文档中出现的顺序排列。 |

</template>
</BiRow>

<BiRow>
<template #en>

Users can add relationship types based on actual requirements to describe more complex event relationships.

</template>
<template #zh>

用户可以根据实际需求添加关系类型，以描述更复杂的事件关系。

</template>
</BiRow>

<BiRow>
<template #en>

![Timeline configuration recommendations](/ragflow-images/timeline-configuration-recommendations.jpg)

</template>
<template #zh>

![Timeline 配置建议](/ragflow-images/timeline-configuration-recommendations.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Recommendations

</template>
<template #zh>

### 配置建议

</template>
</BiRow>

<BiRow>
<template #en>

Entity descriptions should clearly specify the scope of information to extract and avoid overly broad descriptions.

</template>
<template #zh>

实体描述应明确指定要抽取的信息范围，避免过于宽泛的描述。

</template>
</BiRow>

<BiRow>
<template #en>

Rule configuration is used to supplement special extraction requirements, such as time format, sorting method, or content restrictions.

</template>
<template #zh>

规则配置用于补充特殊抽取要求，例如时间格式、排序方式或内容限制。

</template>
</BiRow>

<BiRow>
<template #en>

For timeline documents, it is recommended to keep the default timestamp, event, and ordered configurations to ensure the basic time relationship generation effect.

</template>
<template #zh>

对于时间线类文档，建议保持默认的 timestamp、event 和 ordered 配置，以保证基础时间关系的生成效果。

</template>
</BiRow>

<BiRow>
<template #en>

When adding entities or relationships, make sure they can form clear associations with the document content and avoid producing invalid information.

</template>
<template #zh>

添加实体或关系时，应确保它们能与文档内容形成清晰关联，避免产生无效信息。

</template>
</BiRow>

<BiRow>
<template #en>

## Wiki

</template>
<template #zh>

## Wiki

</template>
</BiRow>

<BiRow>
<template #en>

Wiki compiles document content into structured and associated knowledge pages. The system identifies entities, relationships, facts, and concepts in documents, then generates content similar to encyclopedia knowledge pages according to page organization rules.

</template>
<template #zh>

Wiki 将文档内容编译为结构化且相互关联的知识页面。系统识别文档中的实体、关系、事实和概念，然后按照页面组织规则生成类似百科知识页面的内容。

</template>
</BiRow>

<BiRow>
<template #en>

Wiki is suitable for enterprise knowledge accumulation, product documentation, domain knowledge bases, and similar scenarios. It helps users convert scattered document content into clearly structured knowledge pages that are easy to browse and retrieve.

</template>
<template #zh>

Wiki 适合企业知识沉淀、产品文档、领域知识库等场景。它可以帮助用户把分散的文档内容转换为结构清晰、便于浏览和检索的知识页面。

</template>
</BiRow>

<BiRow>
<template #en>

### Global Rules

</template>
<template #zh>

### 全局规则

</template>
</BiRow>

<BiRow>
<template #en>

Global rules define general requirements for Wiki knowledge extraction, including entity recognition, relationship establishment, and content organization.

</template>
<template #zh>

全局规则定义 Wiki 知识抽取的通用要求，包括实体识别、关系建立和内容组织。

</template>
</BiRow>

<BiRow>
<template #en>

System default rules include:

</template>
<template #zh>

系统默认规则包括：

</template>
</BiRow>

<BiRow>
<template #en>

- Each relationship must connect two extracted entities and define a clear relationship type.
- Relationship direction is determined according to the actual semantics between entities.
- When multiple relationships exist, preserve them in the order they appear in the document.
- Keep relationship type names in a unified format.

</template>
<template #zh>

- 每个关系必须连接两个已抽取的实体，并定义明确的关系类型。
- 根据实体之间的实际语义确定关系方向。
- 存在多个关系时，按它们在文档中出现的顺序保留。
- 关系类型名称保持统一的格式。

</template>
</BiRow>

<BiRow>
<template #en>

Users can adjust rules based on business requirements, such as limiting the entity scope to focus on, supplementing domain knowledge, or adjusting page generation requirements.

</template>
<template #zh>

用户可以根据业务需求调整规则，例如限定重点关注的实体范围、补充领域知识或调整页面生成要求。

</template>
</BiRow>

<BiRow>
<template #en>

### Plan

</template>
<template #zh>

### Plan

</template>
</BiRow>

<BiRow>
<template #en>

Plan is used to plan and organize document content before generating Wiki content. After Plan is enabled, the system first generates a content plan for the Wiki based on the document content, and then generates the corresponding Wiki content according to the plan, making the generated result more clearly structured.

</template>
<template #zh>

Plan 用于在生成 Wiki 内容之前对文档内容进行规划整理。启用 Plan 后，系统会先根据文档内容为 Wiki 生成内容计划，再按照该计划生成对应的 Wiki 内容，使生成结果的结构更清晰。

</template>
</BiRow>

<BiRow>
<template #en>

When creating or editing a Wiki compilation template, you can choose whether to enable Plan.

</template>
<template #zh>

创建或编辑 Wiki 编译模板时，可以选择是否启用 Plan。

</template>
</BiRow>

<BiRow>
<template #en>

- **Plan enabled**: The system first generates a content plan, and then generates Wiki content according to the plan. This is suitable for documents with substantial content and complex structures that require overall organization of Wiki content.
- **Plan disabled**: The system does not generate a content plan and directly generates Wiki content based on the document content.

</template>
<template #zh>

- **启用 Plan**：系统先生成内容计划，再按照该计划生成 Wiki 内容。适合内容量大、结构复杂、需要对 Wiki 内容进行整体组织的文档。
- **停用 Plan**：系统不生成内容计划，直接基于文档内容生成 Wiki 内容。

</template>
</BiRow>

<BiRow>
<template #en>

After the configuration is completed and the template is saved, the system follows the current Plan configuration when using this template for knowledge compilation.

</template>
<template #zh>

配置完成并保存模板后，系统使用该模板进行知识编译时会遵循当前的 Plan 配置。

</template>
</BiRow>

<BiRow>
<template #en>

Note: Whether Plan is enabled affects the Wiki content generation flow. For longer documents or documents with complex content structures, it is recommended to enable Plan.

</template>
<template #zh>

注意：是否启用 Plan 会影响 Wiki 内容的生成流程。对于篇幅较长或内容结构复杂的文档，建议启用 Plan。

</template>
</BiRow>

<BiRow>
<template #en>

### EntitySpecification

</template>
<template #zh>

### EntitySpecification

</template>
</BiRow>

<BiRow>
<template #en>

EntitySpecification defines the entity types that need to be recognized and extracted in Wiki.

</template>
<template #zh>

EntitySpecification 定义 Wiki 中需要识别和抽取的实体类型。

</template>
</BiRow>

<BiRow>
<template #en>

Each entity contains the following configuration items:

</template>
<template #zh>

每个实体包含以下配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Entity type name, used to identify the information category to extract. |
| Description | Describes the entity definition and recognition scope. |
| Rule | Supplements entity extraction requirements, such as format restrictions and content scope. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 实体类型名称，用于标识要抽取的信息类别。 |
| 描述 | 描述实体的定义和识别范围。 |
| 规则 | 补充实体抽取要求，如格式限制和内容范围。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default entity types:

</template>
<template #zh>

系统提供以下默认实体类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Entity Name | Description |
| --- | --- |
| person | People, including individuals or natural persons. |
| org | Organizations, companies, institutions, or other collective organizations. |
| product | Products, services, software, or other offerings. |
| regulation | Laws, policies, standards, specifications, and other rule documents. |
| location | Geographic locations, including countries, cities, regions, and similar entities. |
| system | Technical systems, platforms, frameworks, or infrastructure. |
| equipment | Devices, machines, hardware, and similar entities. |
| other | Other entities that do not belong to the categories above. |

</template>
<template #zh>

| 实体名称 | 描述 |
| --- | --- |
| person | 人物，包括个人或自然人。 |
| org | 组织、公司、机构或其他集体组织。 |
| product | 产品、服务、软件或其他提供物。 |
| regulation | 法律、政策、标准、规范等规则类文档。 |
| location | 地理位置，包括国家、城市、地区等。 |
| system | 技术系统、平台、框架或基础设施。 |
| equipment | 设备、机器、硬件等。 |
| other | 不属于以上类别的其他实体。 |

</template>
</BiRow>

<BiRow>
<template #en>

Users can add, modify, or delete entity types based on business scenarios.

</template>
<template #zh>

用户可以根据业务场景添加、修改或删除实体类型。

</template>
</BiRow>

<BiRow>
<template #en>

### RelationSpecification

</template>
<template #zh>

### RelationSpecification

</template>
</BiRow>

<BiRow>
<template #en>

RelationSpecification defines relationship types between entities and is used to build knowledge associations in Wiki pages.

</template>
<template #zh>

RelationSpecification 定义实体之间的关系类型，用于在 Wiki 页面中构建知识关联。

</template>
</BiRow>

<BiRow>
<template #en>

Each relationship contains the following configuration items:

</template>
<template #zh>

每个关系包含以下配置项：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Type | Relationship type name, used to indicate the association method between entities. |
| Description | Describes the relationship meaning and applicable scope. |
| Rule | Restricts relationship extraction methods, such as relationship direction and connection conditions. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 类型 | 关系类型名称，用于表示实体之间的关联方式。 |
| 描述 | 描述关系的含义和适用范围。 |
| 规则 | 限制关系抽取方式，如关系方向和连接条件。 |

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following default relationship types:

</template>
<template #zh>

系统提供以下默认关系类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Relationship Name | Description |
| --- | --- |
| owns | Indicates ownership or affiliation. |
| part_of | Indicates a composition relationship, such as a component belonging to a whole. |
| caused_by | Indicates a causal relationship. |
| regulates | Indicates a regulatory, management, or constraint relationship. |
| uses | Indicates a usage relationship. |
| located_in | Indicates a location inclusion relationship. |
| other | Indicates another valid relationship not covered above. |

</template>
<template #zh>

| 关系名称 | 描述 |
| --- | --- |
| owns | 表示所有权或隶属关系。 |
| part_of | 表示组成关系，例如部件属于整体。 |
| caused_by | 表示因果关系。 |
| regulates | 表示监管、管理或约束关系。 |
| uses | 表示使用关系。 |
| located_in | 表示位置上的包含关系。 |
| other | 表示以上未覆盖的其他有效关系。 |

</template>
</BiRow>

<BiRow>
<template #en>

Users can add relationship types based on business requirements to describe domain-specific associations.

</template>
<template #zh>

用户可以根据业务需求添加关系类型，以描述领域特定的关联。

</template>
</BiRow>

<BiRow>
<template #en>

### ClaimSpecification

</template>
<template #zh>

### ClaimSpecification

</template>
</BiRow>

<BiRow>
<template #en>

ClaimSpecification defines factual descriptions that need to be extracted.

</template>
<template #zh>

ClaimSpecification 定义需要抽取的事实描述。

</template>
</BiRow>

<BiRow>
<template #en>

Each Claim field contains:

</template>
<template #zh>

每个 Claim 字段包含：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Description | Defines the factual content to extract, usually as a complete factual statement. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 描述 | 定义要抽取的事实内容，通常是完整的事实陈述。 |

</template>
</BiRow>

<BiRow>
<template #en>

System default requirements:

</template>
<template #zh>

系统默认要求：

</template>
</BiRow>

<BiRow>
<template #en>

- Claim content should be a complete factual description.
- Entities or concepts associated with a Claim should come from extracted information.
- Avoid generating speculative content that cannot be verified from the document.

</template>
<template #zh>

- Claim 内容应为完整的事实描述。
- 与 Claim 关联的实体或概念应来自已抽取的信息。
- 避免生成无法从文档中验证的推测性内容。

</template>
</BiRow>

<BiRow>
<template #en>

### ConceptSpecification

</template>
<template #zh>

### ConceptSpecification

</template>
</BiRow>

<BiRow>
<template #en>

ConceptSpecification defines professional concepts, topics, or core terms that need to be extracted.

</template>
<template #zh>

ConceptSpecification 定义需要抽取的专业概念、主题或核心术语。

</template>
</BiRow>

<BiRow>
<template #en>

Each Concept field contains:

</template>
<template #zh>

每个 Concept 字段包含：

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Description | Defines the concept name or topic content to extract. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| 描述 | 定义要抽取的概念名称或主题内容。 |

</template>
</BiRow>

<BiRow>
<template #en>

By default, the system identifies:

</template>
<template #zh>

默认情况下，系统会识别：

</template>
</BiRow>

<BiRow>
<template #en>

- Professional terms.
- Core concepts.
- Important topics in the document.

</template>
<template #zh>

- 专业术语。
- 核心概念。
- 文档中的重要主题。

</template>
</BiRow>

<BiRow>
<template #en>

### Blueprint

</template>
<template #zh>

### Blueprint

</template>
</BiRow>

<BiRow>
<template #en>

Blueprint defines the structure template used when generating Wiki pages. The system provides multiple preset blueprints. Users can select an appropriate blueprint based on document content and usage scenarios, or select Custom to define page generation rules.

</template>
<template #zh>

Blueprint（蓝图）定义生成 Wiki 页面时使用的结构模板。系统提供多个预设蓝图，用户可以根据文档内容和使用场景选择合适的蓝图，或选择 Custom 自定义页面生成规则。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration items:

</template>
<template #zh>

配置项：

</template>
</BiRow>

<BiRow>
<template #en>

The system provides the following blueprints:

</template>
<template #zh>

系统提供以下蓝图：

</template>
</BiRow>

<BiRow>
<template #en>

- **Brand**: Suitable for brand-related content.
- **Engineering**: Suitable for technical, R&D, and engineering content.
- **General**: A general blueprint suitable for documents without specific content structure requirements.
- **Market**: Suitable for market, industry analysis, and related content.
- **Product**: Suitable for product introductions, product planning, and product-related documents.
- **Userinterview**: Suitable for user interviews, research records, and similar content.
- **Custom**: A custom blueprint that can configure Wiki page generation rules based on actual requirements.

</template>
<template #zh>

- **Brand**：适合品牌相关内容。
- **Engineering**：适合技术、研发和工程类内容。
- **General**：通用蓝图，适合对内容结构没有特定要求的文档。
- **Market**：适合市场、行业分析等相关内容。
- **Product**：适合产品介绍、产品规划和产品相关文档。
- **Userinterview**：适合用户访谈、调研记录等内容。
- **Custom**：自定义蓝图，可根据实际需求配置 Wiki 页面生成规则。

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration Item | Description |
| --- | --- |
| Blueprint | Specifies the template for Wiki page generation. |
| Instruction | Supplements page generation rules, such as chapter structure, content format, and display requirements. |

</template>
<template #zh>

| 配置项 | 描述 |
| --- | --- |
| Blueprint | 指定 Wiki 页面生成所用的模板。 |
| Instruction | 补充页面生成规则，例如章节结构、内容格式和展示要求。 |

</template>
</BiRow>

<BiRow>
<template #en>

![Wiki blueprint configuration](/ragflow-images/built-in-templates-and-dedicated-config-wiki.jpg)

</template>
<template #zh>

![Wiki 蓝图配置](/ragflow-images/built-in-templates-and-dedicated-config-wiki.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

After a blueprint is selected, the system generates Wiki content according to the preset page structure and rules of the corresponding blueprint. When Custom is selected, you can customize page generation requirements through Instruction, such as chapter structure, content format, and display method.

</template>
<template #zh>

选择蓝图后，系统会按照对应蓝图预设的页面结构和规则生成 Wiki 内容。选择 Custom 时，可以通过 Instruction 自定义页面生成要求，例如章节结构、内容格式和展示方式。

</template>
</BiRow>

<BiRow>
<template #en>

### Example Preview

</template>
<template #zh>

### 示例预览

</template>
</BiRow>

<BiRow>
<template #en>

After configuring a blueprint, you can preview the Wiki page structure corresponding to the current blueprint in the Example area below. The preview content displays the page title, chapter hierarchy, and content requirements of each chapter, helping users understand the page organization method of the selected blueprint before generating the Wiki.

</template>
<template #zh>

配置蓝图后，可以在下方 Example 区域预览当前蓝图对应的 Wiki 页面结构。预览内容展示页面标题、章节层级以及各章节的内容要求，帮助用户在生成 Wiki 之前了解所选蓝图的页面组织方式。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Recommendations

</template>
<template #zh>

### 配置建议

</template>
</BiRow>

<BiRow>
<template #en>

For structurally complex content such as enterprise knowledge bases and product documentation, it is recommended to enable Plan.

</template>
<template #zh>

对于企业知识库、产品文档等结构复杂的内容，建议启用 Plan。

</template>
</BiRow>

<BiRow>
<template #en>

Entity types should be adjusted based on the business domain to avoid configuring too many irrelevant entities.

</template>
<template #zh>

实体类型应根据业务领域调整，避免配置过多无关实体。

</template>
</BiRow>

<BiRow>
<template #en>

Relationship types should remain clear and avoid defining relationships with duplicate meanings.

</template>
<template #zh>

关系类型应保持清晰，避免定义含义重复的关系。

</template>
</BiRow>

<BiRow>
<template #en>

Claim is used to supplement factual information and is suitable for scenarios that require knowledge verification.

</template>
<template #zh>

Claim 用于补充事实信息，适合需要知识核验的场景。

</template>
</BiRow>

<BiRow>
<template #en>

Concept is suitable for professional domain knowledge organization and can help improve the association capability of Wiki pages.

</template>
<template #zh>

Concept 适合专业领域知识整理，可以帮助提升 Wiki 页面的关联能力。

</template>
</BiRow>

<BiRow>
<template #en>

Blueprint controls the final page display effect. It is recommended to adjust it based on the purpose of the knowledge base.

</template>
<template #zh>

蓝图控制最终的页面展示效果，建议根据知识库的用途进行调整。

</template>
</BiRow>
