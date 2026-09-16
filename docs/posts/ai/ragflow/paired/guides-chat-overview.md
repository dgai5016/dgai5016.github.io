<BiRow>
<template #en>

Chat is used to create dataset-based question-answering applications. After configuring the datasets, large language model, system prompt, and retrieval parameters for a Chat, users can ask questions based on dataset content in the chat interface.

</template>
<template #zh>

Chat 用于创建基于数据集的问答应用。为 Chat 配置好数据集、大语言模型、系统提示词和检索参数后，用户就可以在对话界面中基于数据集内容提问。

</template>
</BiRow>

<BiRow>
<template #en>

Chat supports dataset retrieval, citation display, keyword analysis, multi-turn conversation optimization, cross-language search, web search, and other capabilities.

</template>
<template #zh>

Chat 支持数据集检索、引用展示、关键词分析、多轮对话优化、跨语言搜索、网页搜索等能力。

</template>
</BiRow>

<BiRow>
<template #en>

After creating a Chat, configure its datasets, model, system prompt, and retrieval parameters for the actual business scenario before using it to answer questions. You can modify these settings later.

</template>
<template #zh>

创建 Chat 后，需要按照实际业务场景配置它的数据集、模型、系统提示词和检索参数，然后再用它来回答问题。这些设置之后可以修改。

</template>
</BiRow>

<BiRow>
<template #en>

## Create a Chat

</template>
<template #zh>

## 创建 Chat

</template>
</BiRow>

<BiRow>
<template #en>

1. Select **Chat** in the left navigation bar.
2. Click **Create chat**.
3. Enter a name for the Chat.
4. Confirm the creation.
5. Open **Chat setting**, then configure the datasets, model, system prompt, and retrieval parameters.
6. Save the setting, then open the chat window to test and use the Chat.

</template>
<template #zh>

1. 在左侧导航栏选择 **Chat**。
2. 点击 **Create chat**。
3. 为 Chat 输入名称。
4. 确认创建。
5. 打开 **Chat setting**，配置数据集、模型、系统提示词和检索参数。
6. 保存设置，然后打开对话窗口测试并使用 Chat。

</template>
</BiRow>

<BiRow>
<template #en>

![Open Chat from the navigation bar](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_1.jpg)

</template>
<template #zh>

![从导航栏打开 Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Create a Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_2.jpg)

</template>
<template #zh>

![创建 Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Enter a name for the Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_3.jpg)

</template>
<template #zh>

![为 Chat 输入名称](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_3.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Configure the newly created Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_4.jpg)

</template>
<template #zh>

![配置新建的 Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_chat_4.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

You do not need to complete every setting when creating a Chat. You can return to the corresponding Chat from the Chat list and update its configuration later.

</template>
<template #zh>

创建 Chat 时不必完成所有设置。之后可以从 Chat 列表回到对应的 Chat，更新它的配置。

</template>
</BiRow>

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

You can set the following basic information for a Chat:

</template>
<template #zh>

可以为 Chat 设置以下基本信息：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The display name used to identify the Chat in the Chat list, published pages, or embedded scenarios. Use a clear name that reflects its business scope or purpose.
- **Avatar**: The image displayed for the Chat. Select a brand, product, or general-purpose icon according to the scenario.
- **Description**: A brief description of the Chat's purpose, service scope, intended audience, or dataset coverage.

</template>
<template #zh>

- **名称**：Chat 的显示名称，用于在 Chat 列表、发布页面或嵌入场景中标识该 Chat。请使用能体现其业务范围或用途的清晰名称。
- **头像**：Chat 显示的图片。根据场景选择品牌、产品或通用图标。
- **描述**：对 Chat 用途、服务范围、目标用户或数据集覆盖范围的简要说明。

</template>
</BiRow>

<BiRow>
<template #en>

![Basic Chat information](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/basic_information_chat.jpg)

</template>
<template #zh>

![Chat 基本信息](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/basic_information_chat.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Configure a Chat

</template>
<template #zh>

## 配置 Chat

</template>
</BiRow>

<BiRow>
<template #en>

Complete the main Chat settings according to the actual scenario:

</template>
<template #zh>

根据实际场景完成 Chat 的主要设置：

</template>
</BiRow>

<BiRow>
<template #en>

- **Dataset**: Select the dataset the Chat can retrieve from. When answering a question, the system searches for relevant content in the associated dataset.
- **Model**: Select the large language model used to generate answers.
- **Retrieval configuration**: Configure the similarity threshold, vector similarity weight, Top N, and other settings to control the retrieval scope and results.
- **Advanced settings**: Use the options available in the current version to further tune answer generation and retrieval behavior.

</template>
<template #zh>

- **数据集**：选择 Chat 可以检索的数据集。回答问题时，系统会在关联的数据集中搜索相关内容。
- **模型**：选择用于生成回答的大语言模型。
- **检索配置**：配置相似度阈值、向量相似度权重、Top N 等设置，控制检索范围和结果。
- **高级设置**：使用当前版本提供的选项，进一步调整回答生成和检索行为。

</template>
</BiRow>

<BiRow>
<template #en>

Save the setting and test it in the chat window.

</template>
<template #zh>

保存设置并在对话窗口中测试。

</template>
</BiRow>

<BiRow>
<template #en>

![Configure a Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/configure_chat.jpg)

</template>
<template #zh>

![配置 Chat](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/configure_chat.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Start with the default parameters for a basic test. Then gradually adjust the retrieval parameters and system prompt based on the quality of the actual answers.

</template>
<template #zh>

先使用默认参数做基础测试，再根据实际回答质量逐步调整检索参数和系统提示词。

</template>
</BiRow>

<BiRow>
<template #en>

## Modify an Existing Chat

</template>
<template #zh>

## 修改已有 Chat

</template>
</BiRow>

<BiRow>
<template #en>

You can modify an existing Chat at any time. Find the Chat in the Chat list, open **Chat setting**, update its datasets, model, system prompt, or retrieval parameters, and save the changes.

</template>
<template #zh>

可以随时修改已有的 Chat。在 Chat 列表中找到该 Chat，打开 **Chat setting**，更新它的数据集、模型、系统提示词或检索参数，然后保存更改。

</template>
</BiRow>

<BiRow>
<template #en>

After changing the configuration, rerun tests with representative questions to confirm that the new settings meet expectations.

</template>
<template #zh>

修改配置后，用有代表性的问题重新测试，确认新设置符合预期。

</template>
</BiRow>
