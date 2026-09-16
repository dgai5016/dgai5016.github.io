<BiRow>
<template #en>

## Create Dataset

</template>
<template #zh>

## 创建数据集

</template>
</BiRow>

<BiRow>
<template #en>

On the dataset list page, click **Create dataset** to open the creation popup. When creating a dataset, you need to set **Name**, **Embedding model**, and **Parse type**, and then, based on the selected parse type, further select a **Built-in** parsing method or an existing **Pipeline**.

</template>
<template #zh>

在数据集列表页点击 **Create dataset** 打开创建弹窗。创建数据集时，你需要设置 **Name**、**Embedding model** 和 **Parse type**，再根据所选解析类型，进一步选择 **Built-in** 解析方法或现有的 **Pipeline**。

</template>
</BiRow>

<BiRow>
<template #en>

1. Fill in **Name**. The name cannot be empty. It is recommended to use a name that reflects the business or material scope.
2. Select **Embedding model**. The drop-down list displays embedding models that have been added to the system and are currently available. Select the model used to vectorize documents in the dataset.
3. Select **Parse type**. RAGFlow provides the following two types of document parsing:
   - **Built-in**: Uses RAGFlow's built-in document parsing methods. The system provides multiple preset parsing methods. You can choose a suitable method based on the document content and structure, such as general documents, Q&A, tables, papers, books, presentations, and so on. This is suitable when you want to directly use the system's preset parsing rules to process documents.
   - **Pipeline**: Uses a custom pipeline to parse documents. The pipeline must be created and configured in **Agent** in advance. You can customize the document parsing and processing flow according to actual requirements. After creation, you can select the corresponding pipeline when creating a dataset.
4. When **Built-in** is selected, continue selecting the specific built-in parsing method. When **Pipeline** is selected, select the pipeline used to process documents.
5. Click **Save** to complete creation. Creating a dataset is only the first step. After creation, it is recommended to go to the dataset configuration page and further check and configure language, parsing method, auto metadata, data source associations, and other options based on the actual scenario before uploading documents in bulk.

</template>
<template #zh>

1. 填写 **Name**。名称不能为空，建议使用能体现业务或资料范围的名称。
2. 选择 **Embedding model**。下拉列表会显示系统中已添加且当前可用的嵌入模型，请选择用于对数据集内文档做向量化的模型。
3. 选择 **Parse type**。RAGFlow 提供以下两类文档解析方式：
   - **Built-in**：使用 RAGFlow 内置的文档解析方法。系统提供多种预设解析方法，可根据文档内容与结构选择合适的一种，如通用文档、问答、表格、论文、书籍、演示文稿等。适合希望直接使用系统预设解析规则处理文档的场景。
   - **Pipeline**：使用自定义管道解析文档。管道必须事先在 **Agent** 中创建并配置，你可以按实际需求自定义文档解析与处理流程。创建完成后，即可在创建数据集时选择相应管道。
4. 选择 **Built-in** 时，继续选择具体的内置解析方法；选择 **Pipeline** 时，则选择用于处理文档的管道。
5. 点击 **Save** 完成创建。创建数据集只是第一步。创建后，建议进入数据集配置页，根据实际场景进一步检查并配置语言、解析方法、自动元数据、数据源关联等选项，然后再批量上传文档。

</template>
</BiRow>

<BiRow>
<template #en>

## View Dataset List

</template>
<template #zh>

## 查看数据集列表

</template>
</BiRow>

<BiRow>
<template #en>

After entering **Datasets** from the left menu, the page displays the datasets accessible to the current user as cards, including datasets created by the user and datasets shared by other users. Each dataset card displays basic information such as the dataset avatar or initials, name, document count, and creation time, making it easy to quickly understand the dataset content and status.

</template>
<template #zh>

从左侧菜单进入 **Datasets** 后，页面会以卡片形式展示当前用户可访问的数据集，包括用户自己创建的数据集和其他用户共享的数据集。每张数据集卡片展示数据集头像或首字母、名称、文档数量、创建时间等基本信息，方便快速了解数据集的内容与状态。

</template>
</BiRow>

<BiRow>
<template #en>

Click a dataset card to enter its detail page and view and manage documents, chunks, and related configuration. If there are many datasets, use the pagination feature at the bottom of the page to switch pages and adjust the number of datasets displayed per page.

</template>
<template #zh>

点击数据集卡片可进入其详情页，查看并管理文档、分块及相关配置。如果数据集较多，可使用页面底部的分页功能翻页，并调整每页展示的数据集数量。

</template>
</BiRow>

<BiRow>
<template #en>

Click **Create dataset** to create a new dataset. During creation, configure the dataset name, embedding model, document parsing method, and other information.

</template>
<template #zh>

点击 **Create dataset** 可新建数据集。创建时需配置数据集名称、嵌入模型、文档解析方法等信息。

</template>
</BiRow>
