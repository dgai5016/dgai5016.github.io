<BiRow>
<template #en>

## What Is a Dataset

</template>
<template #zh>

## 什么是数据集

</template>
</BiRow>

<BiRow>
<template #en>

A dataset is the workspace in RAGFlow that carries knowledge sources and retrieval content. A dataset usually corresponds to a group of business materials, a document collection, or an external data source. In a dataset, users import files, parse files, split them into chunks, maintain metadata, and validate recall. Later, modules such as chats, search, and Agents use this content for retrieval augmentation.

</template>
<template #zh>

数据集是 RAGFlow 中承载知识来源与检索内容的工作区。一个数据集通常对应一组业务资料、一个文档集合或一个外部数据源。在数据集中，用户导入文件、解析文件、将其切分为分块、维护元数据并验证召回效果。随后，对话、搜索与 Agent 等模块会使用这些内容进行检索增强。

</template>
</BiRow>

<BiRow>
<template #en>

In terms of responsibility, a dataset is more than a "folder". It converts raw documents into retrievable chunks, stores the enabled status of documents and chunks, maintains metadata, and provides foundational data for knowledge artifacts and log tracing.

</template>
<template #zh>

就职责而言，数据集远不止一个“文件夹”：它把原始文档转换为可检索的分块，存储文档与分块的启用状态，维护元数据，并为知识工件和日志追踪提供基础数据。

</template>
</BiRow>

<BiRow>
<template #en>

## Basic Workflow

</template>
<template #zh>

## 基本工作流

</template>
</BiRow>

<BiRow>
<template #en>

The following briefly introduces the basic dataset workflow and helps you quickly understand the overall process from creating a dataset to testing retrieval results. The specific operations, configuration items, and feature descriptions involved in each step are described in detail in later sections.

</template>
<template #zh>

下面简要介绍数据集的基本工作流，帮助你快速了解从创建数据集到测试检索结果的总体流程。每一步涉及的具体操作、配置项与功能说明，将在后续章节中详细介绍。

</template>
</BiRow>

<BiRow>
<template #en>

1. Create a dataset and select an embedding model and parsing method.
2. Complete dataset configuration under **Configuration**.
3. Upload or add documents under **Document Management**.
4. Parse documents and generate chunks.
5. Check and adjust chunks and metadata.
6. Use **Retrieval Testing** to test retrieval results.
7. Adjust parsing or retrieval configuration based on the test results.

</template>
<template #zh>

1. 创建数据集并选择嵌入模型与解析方法。
2. 在 **Configuration** 中完成数据集配置。
3. 在 **Document Management** 中上传或添加文档。
4. 解析文档并生成分块。
5. 检查并调整分块与元数据。
6. 使用 **Retrieval Testing** 测试检索结果。
7. 根据测试结果调整解析或检索配置。

</template>
</BiRow>

<BiRow>
<template #en>

## Dataset Page Overview

</template>
<template #zh>

## 数据集页面概览

</template>
</BiRow>

<BiRow>
<template #en>

The following briefly introduces the main entries on the dataset detail page and helps you quickly understand the purpose of each page. The specific operations, configuration items, and usage methods for each feature are described in detail in later sections.

</template>
<template #zh>

下面简要介绍数据集详情页上的主要入口，帮助你快速了解各页面的用途。每项功能的具体操作、配置项与使用方法，将在后续章节中详细介绍。

</template>
</BiRow>

<BiRow>
<template #en>

- **File list**: The default entry on the dataset detail page. It is used to manage documents, parsing status, enabled status, chunk count, metadata field count, and document-level operations in the dataset.
- **Retrieval Testing**: Used to enter test questions and adjust retrieval parameters to verify the recall effect of the current dataset. Test parameter adjustments are not saved automatically and must be applied separately in **Chat Assistant** or the **Retrieval Agent** component.
- **Artifacts**: Used to view entries for knowledge artifacts related to the current dataset, such as **Wiki**, **Navigation**, and **Graph**. This dataset manual only introduces the entry and viewing method. For generation and updates, see **Knowledge Compilation**.
- **Logs**: Used to view document parsing and dataset-level task records, including document logs and dataset-level logs.
- **Configuration**: Used to maintain the dataset's basic information, embedding model, parsing method, data source associations, and other configurations.

</template>
<template #zh>

- **File list**：数据集详情页上的默认入口，用于管理数据集中的文档、解析状态、启用状态、分块数量、元数据字段数量以及文档级操作。
- **Retrieval Testing**：用于输入测试问题并调整检索参数，验证当前数据集的召回效果。测试中的参数调整不会被自动保存，需在 **Chat Assistant** 或 **Retrieval Agent** 组件中另行应用。
- **Artifacts**：用于查看与当前数据集相关的各类知识工件入口，如 **Wiki**、**Navigation** 和 **Graph**。本数据集手册只介绍入口与查看方法；其生成与更新参见**知识编译（Knowledge Compilation）**。
- **Logs**：用于查看文档解析与数据集级任务记录，包括文档日志与数据集级日志。
- **Configuration**：用于维护数据集的基本信息、嵌入模型、解析方法、数据源关联等配置。

</template>
</BiRow>
