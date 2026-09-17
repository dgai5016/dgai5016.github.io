# 使用 Chat 对话

进入 Chat 后，用户可以在不同的对话中提问。对话列表位于左侧，当前对话位于中间，消息输入框位于底部。

一个 Chat 可以包含多个对话。每个对话各自维护自己的上下文，而所有对话共享为该 Chat 配置的知识库、模型、System prompt 和检索参数。

## 创建和管理对话

点击对话列表中的 **+** 创建对话。发送第一条消息后，系统会根据对话内容自动生成对话名称。

可以执行以下对话操作：

- **切换对话**：点击对话名称，打开其历史记录并继续对话。
- **搜索对话**：使用搜索框按名称筛选已有对话。
- **删除对话**：使用对话旁边的 **More** 菜单，也可以选中多个对话一起删除。

![创建和管理对话](/ragflow-images/create_and_manage_sessions.jpg)

不同话题请使用不同的对话。例如，讨论完一个产品问题后，在开始一项完全不同的任务前新建一个对话，避免之前的上下文影响后续回答。

## 发送问题

在消息输入框中输入问题并按 **Enter**，或点击 **Send**。按 **Shift+Enter** 可插入换行。

回答生成过程中，点击 **Stop** 可以中断。发送问题前，可以选择 Thinking 模式、启用或禁用网页搜索，以及添加附件。

Chat 会结合当前对话历史和为 Chat 配置的知识库、模型、System prompt 来生成回答。

## 上传文件

点击消息输入框中的回形针图标，或把文件拖入消息输入框，即可随问题一起发送附件。上传的文件会显示在消息输入框上方，发送前请移除不需要的文件。

文本文件可以解析成文本供模型参考。处理图片需要具备多模态能力的模型。

![在对话中上传文件](/ragflow-images/upload_files.jpg)

在对话中上传的文件仅提供补充上下文，不会自动添加到知识库。要让某个文件长期可用于知识库检索，请把它添加到知识库并完成解析。

支持的文件数量、大小和类型取决于部署方式和回答配置。请遵循界面上显示的提示。

## 使用语音输入

点击消息输入框中的麦克风图标开始录音，再次点击结束录音。首次使用该功能时，浏览器可能会请求麦克风权限。

录音结束后，系统会用配置好的语音识别模型把语音转换成文字，并作为问题发送。

![使用语音输入](/ragflow-images/use_voice_input.jpg)

## 嵌入网站

点击 Chat 名称旁边的纸飞机图标，打开 **Embed into website**。通过该配置可以把 Chat 集成到外部网页或业务系统中。

RAGFlow 提供用于集成的 HTTP 和 Python API：

- [获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)
- [HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)
- [Python API 参考](https://ragflow.io/docs/references/python_api_reference)

也可以用 iframe 把创建好的对话助手嵌入第三方网页：

1. 先[获取 API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)再继续，否则会报错。
2. 把鼠标悬停在目标对话助手上，点击 **Edit** 打开 iframe 窗口。
3. 复制 iframe 代码并嵌入你的网页。

![打开 iframe 配置](/ragflow-images/embed_into_website_1.jpg)

![复制 iframe 代码](/ragflow-images/embed_into_website_2.jpg)
