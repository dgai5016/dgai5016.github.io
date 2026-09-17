<BiRow>
<template #en>

After entering a Chat, users can ask questions in different conversations. The conversation list appears on the left, the current conversation appears in the center, and the message input box appears at the bottom.

</template>
<template #zh>

进入 Chat 后，用户可以在不同的对话中提问。对话列表位于左侧，当前对话位于中间，消息输入框位于底部。

</template>
</BiRow>

<BiRow>
<template #en>

A Chat can contain multiple conversations. Each conversation maintains its own context, while all conversations share the knowledge bases, model, system prompt, and retrieval parameters configured for the Chat.

</template>
<template #zh>

一个 Chat 可以包含多个对话。每个对话各自维护自己的上下文，而所有对话共享为该 Chat 配置的知识库、模型、System prompt 和检索参数。

</template>
</BiRow>

<BiRow>
<template #en>

## Create and Manage conversations

</template>
<template #zh>

## 创建和管理对话

</template>
</BiRow>

<BiRow>
<template #en>

Click **+** in the conversation list to create a conversation. After you send the first message, the system generates a conversation name from the conversation.

</template>
<template #zh>

点击对话列表中的 **+** 创建对话。发送第一条消息后，系统会根据对话内容自动生成对话名称。

</template>
</BiRow>

<BiRow>
<template #en>

You can perform the following conversation operations:

</template>
<template #zh>

可以执行以下对话操作：

</template>
</BiRow>

<BiRow>
<template #en>

- **Switch conversations**: Click a conversation name to open its history and continue the conversation.
- **Search conversations**: Use the search box to filter existing conversations by name.
- **Delete conversations**: Use the **More** menu beside a conversation. You can also select multiple conversations and delete them together.

</template>
<template #zh>

- **切换对话**：点击对话名称，打开其历史记录并继续对话。
- **搜索对话**：使用搜索框按名称筛选已有对话。
- **删除对话**：使用对话旁边的 **More** 菜单，也可以选中多个对话一起删除。

</template>
</BiRow>

<BiRow>
<template #en>

![Create and manage conversations](/ragflow-images/create_and_manage_sessions.jpg)

</template>
<template #zh>

![创建和管理对话](/ragflow-images/create_and_manage_sessions.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Use different conversations for different topics. For example, after discussing a product issue, create a new conversation before starting a completely different task so that the earlier context does not affect subsequent answers.

</template>
<template #zh>

不同话题请使用不同的对话。例如，讨论完一个产品问题后，在开始一项完全不同的任务前新建一个对话，避免之前的上下文影响后续回答。

</template>
</BiRow>

<BiRow>
<template #en>

## Send a Question

</template>
<template #zh>

## 发送问题

</template>
</BiRow>

<BiRow>
<template #en>

Enter a question in the message box and press **Enter**, or click **Send**. Press **Shift+Enter** to insert a line break.

</template>
<template #zh>

在消息输入框中输入问题并按 **Enter**，或点击 **Send**。按 **Shift+Enter** 可插入换行。

</template>
</BiRow>

<BiRow>
<template #en>

While an answer is being generated, click **Stop** to interrupt it. Before sending a question, you can select a Thinking mode, enable or disable web search, and add attachments.

</template>
<template #zh>

回答生成过程中，点击 **Stop** 可以中断。发送问题前，可以选择 Thinking 模式、启用或禁用网页搜索，以及添加附件。

</template>
</BiRow>

<BiRow>
<template #en>

Chat generates an answer using the current conversation history together with the Chat's configured knowledge bases, model, and system prompt.

</template>
<template #zh>

Chat 会结合当前对话历史和为 Chat 配置的知识库、模型、System prompt 来生成回答。

</template>
</BiRow>

<BiRow>
<template #en>

## Upload Files

</template>
<template #zh>

## 上传文件

</template>
</BiRow>

<BiRow>
<template #en>

Click the paperclip icon in the message box, or drag files into the message box, to send files with your question as attachments. Uploaded files appear above the message box; remove any unnecessary files before sending.

</template>
<template #zh>

点击消息输入框中的回形针图标，或把文件拖入消息输入框，即可随问题一起发送附件。上传的文件会显示在消息输入框上方，发送前请移除不需要的文件。

</template>
</BiRow>

<BiRow>
<template #en>

Text files can be parsed into text for the model to reference. Processing images requires a model with multimodal capabilities.

</template>
<template #zh>

文本文件可以解析成文本供模型参考。处理图片需要具备多模态能力的模型。

</template>
</BiRow>

<BiRow>
<template #en>

![Upload files in a conversation](/ragflow-images/upload_files.jpg)

</template>
<template #zh>

![在对话中上传文件](/ragflow-images/upload_files.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Files uploaded in a conversation provide supplemental context only and are not automatically added to a knowledge base. To make a file permanently available for knowledge base retrieval, add it to a knowledge base and complete parsing.

</template>
<template #zh>

在对话中上传的文件仅提供补充上下文，不会自动添加到知识库。要让某个文件长期可用于知识库检索，请把它添加到知识库并完成解析。

</template>
</BiRow>

<BiRow>
<template #en>

The supported number, size, and types of files depend on the deployment and answer configuration. Follow the instructions displayed in the interface.

</template>
<template #zh>

支持的文件数量、大小和类型取决于部署方式和回答配置。请遵循界面上显示的提示。

</template>
</BiRow>

<BiRow>
<template #en>

## Use Voice Input

</template>
<template #zh>

## 使用语音输入

</template>
</BiRow>

<BiRow>
<template #en>

Click the microphone icon in the message box to start recording, then click it again to finish. The browser may request microphone permission the first time you use this feature.

</template>
<template #zh>

点击消息输入框中的麦克风图标开始录音，再次点击结束录音。首次使用该功能时，浏览器可能会请求麦克风权限。

</template>
</BiRow>

<BiRow>
<template #en>

After recording, the system converts the speech to text with the configured speech recognition model and sends it as a question.

</template>
<template #zh>

录音结束后，系统会用配置好的语音识别模型把语音转换成文字，并作为问题发送。

</template>
</BiRow>

<BiRow>
<template #en>

![Use voice input](/ragflow-images/use_voice_input.jpg)

</template>
<template #zh>

![使用语音输入](/ragflow-images/use_voice_input.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Embed into a Website

</template>
<template #zh>

## 嵌入网站

</template>
</BiRow>

<BiRow>
<template #en>

Click the paper-airplane icon next to the Chat name to open **Embed into website**. Use this configuration to integrate Chat into an external webpage or business system.

</template>
<template #zh>

点击 Chat 名称旁边的纸飞机图标，打开 **Embed into website**。通过该配置可以把 Chat 集成到外部网页或业务系统中。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow provides HTTP and Python APIs for integration:

</template>
<template #zh>

RAGFlow 提供用于集成的 HTTP 和 Python API：

</template>
</BiRow>

<BiRow>
<template #en>

- [Acquire a RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API reference](https://ragflow.io/docs/references/http_api_reference)
- [Python API reference](https://ragflow.io/docs/references/python_api_reference)

</template>
<template #zh>

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)

</template>
</BiRow>

<BiRow>
<template #en>

You can also embed the created Chat assistant in a third-party webpage with an iframe:

</template>
<template #zh>

也可以用 iframe 把创建好的对话助手嵌入第三方网页：

</template>
</BiRow>

<BiRow>
<template #en>

1. [Acquire an API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key) before continuing. Otherwise, an error occurs.
2. Hover over the target Chat assistant and click **Edit** to open the iframe window.
3. Copy the iframe code and embed it in your webpage.

</template>
<template #zh>

1. 先[获取 API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)再继续，否则会报错。
2. 把鼠标悬停在目标对话助手上，点击 **Edit** 打开 iframe 窗口。
3. 复制 iframe 代码并嵌入你的网页。

</template>
</BiRow>

<BiRow>
<template #en>

![Open the iframe configuration](/ragflow-images/embed_into_website_1.jpg)

</template>
<template #zh>

![打开 iframe 配置](/ragflow-images/embed_into_website_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Copy the iframe code](/ragflow-images/embed_into_website_2.jpg)

</template>
<template #zh>

![复制 iframe 代码](/ragflow-images/embed_into_website_2.jpg)

</template>
</BiRow>
