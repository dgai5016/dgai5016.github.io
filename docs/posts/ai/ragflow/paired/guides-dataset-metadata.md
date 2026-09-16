<BiRow>
<template #en>

## Metadata Overview

</template>
<template #zh>

## 元数据概览

</template>
</BiRow>

<BiRow>
<template #en>

Metadata is structured information associated with documents or chunks. It is used to describe the source, category, time, owner, business attributes, or other supplementary information of content. Metadata can be used for document management, filtering, retrieval range restriction, and result analysis.

</template>
<template #zh>

元数据是与文档或分块关联的结构化信息，用于描述内容的来源、类别、时间、归属者、业务属性或其他补充信息。元数据可用于文档管理、筛选、检索范围限制和结果分析。

</template>
</BiRow>

<BiRow>
<template #en>

Metadata may come from system built-in fields, automatic generation during parsing, table column role configuration, or manual maintenance.

</template>
<template #zh>

元数据可以来自系统内置字段、解析过程中的自动生成、表格列角色配置或手动维护。

</template>
</BiRow>

<BiRow>
<template #en>

## View and Manage Metadata

</template>
<template #zh>

## 查看与管理元数据

</template>
</BiRow>

<BiRow>
<template #en>

In document management or document details, you can view and maintain metadata related to documents. Metadata is displayed in list form, including **Field**, **Type**, **Values**, and related operations.

</template>
<template #zh>

在文档管理或文档详情中，可以查看和维护文档相关元数据。元数据以列表形式展示，包括**字段（Field）**、**类型（Type）**、**取值（Values）**及相关操作。

</template>
</BiRow>

<BiRow>
<template #en>

## Add Metadata

</template>
<template #zh>

## 添加元数据

</template>
</BiRow>

<BiRow>
<template #en>

You can add metadata manually for documents. When adding metadata, you need to specify the field name, data type, and value. To improve subsequent filtering and retrieval, keep field names, data types, and value formats consistent.

</template>
<template #zh>

可以为文档手动添加元数据。添加时需指定字段名、数据类型和取值。为便于后续筛选和检索，应保持字段名、数据类型和取值格式一致。

</template>
</BiRow>

<BiRow>
<template #en>

## Automatically Generate Metadata

</template>
<template #zh>

## 自动生成元数据

</template>
</BiRow>

<BiRow>
<template #en>

After **Auto Metadata** is enabled in dataset configuration, the system can automatically generate metadata during document parsing according to the configured generation rules. Automatically generated metadata usually comes from document content, source information, or built-in parsing information.

</template>
<template #zh>

在数据集配置中启用**自动元数据（Auto Metadata）**后，系统会在文档解析时按配置的生成规则自动生成元数据。自动生成的元数据通常来自文档内容、来源信息或内置解析信息。

</template>
</BiRow>

<BiRow>
<template #en>

Changes to auto metadata configuration only affect newly parsed documents. If you need to apply new metadata rules to existing documents, parse the relevant documents again.

</template>
<template #zh>

自动元数据配置的变更只影响新解析的文档。若要将新的元数据规则应用于已有文档，需重新解析相应文档。

</template>
</BiRow>

<BiRow>
<template #en>

## Use Metadata to Filter Documents

</template>
<template #zh>

## 使用元数据筛选文档

</template>
</BiRow>

<BiRow>
<template #en>

On the document list page, you can use **Metadata field** to filter documents. The available fields and values depend on the metadata already present in the current dataset.

</template>
<template #zh>

在文档列表页，可以使用**元数据字段（Metadata field）**筛选文档。可用的字段和取值取决于当前数据集中已有的元数据。

</template>
</BiRow>

<BiRow>
<template #en>

For table documents, columns configured as **Metadata** or **Both** can be used as metadata filter fields.

</template>
<template #zh>

对于表格文档，配置为**元数据（Metadata）**或**两者（Both）**的列可用作元数据筛选字段。

</template>
</BiRow>

<BiRow>
<template #en>

## Metadata and Retrieval

</template>
<template #zh>

## 元数据与检索

</template>
</BiRow>

<BiRow>
<template #en>

Metadata can also be used to restrict the retrieval range. After metadata conditions are configured, retrieval only searches content that meets the metadata conditions.

</template>
<template #zh>

元数据还可用于限制检索范围。配置元数据条件后，检索只会搜索满足元数据条件的内容。

</template>
</BiRow>

<BiRow>
<template #en>

When using metadata, keep field names, data types, and value formats unified and accurate. Metadata conditions that are too strict or inaccurate field values may exclude relevant content from the retrieval scope.

</template>
<template #zh>

使用元数据时，应保持字段名、数据类型和取值格式统一且准确。元数据条件过严或字段取值不准确，都可能把相关内容排除在检索范围之外。

</template>
</BiRow>
