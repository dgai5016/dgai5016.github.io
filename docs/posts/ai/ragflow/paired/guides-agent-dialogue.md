<BiRow>
<template #en>

## Reply Message Component

</template>
<template #zh>

## Reply Message 组件

</template>
</BiRow>

<BiRow>
<template #en>

The message is used to output static or dynamic messages to users, and is usually used as the final component of a workflow. It can directly write fixed text, or insert upstream variables.

</template>
<template #zh>

回复消息组件用于向用户输出静态或动态的消息，通常用作工作流的最终组件。可以直接写入固定文本，也可以插入上游变量。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Method

</template>
<template #zh>

### 配置方法

</template>
</BiRow>

<BiRow>
<template #en>

Write the output content in the message. Type `/` or click the variable button to insert component outputs.

</template>
<template #zh>

在 message 中填写输出内容。输入 `/` 或点击变量按钮，即可插入组件的输出。

</template>
</BiRow>

<BiRow>
<template #en>

If multiple messages are added, the system randomly selects one of them to send. When the `Begin` component selects `Webhook` and the response method is `Final response`, the reply message component can set an HTTP status code in the range of 200 to 399.

</template>
<template #zh>

如果添加了多条消息，系统会随机选择其中一条发送。当 `Begin` 组件选择 `Webhook` 且响应方式为 `Final response` 时，回复消息组件可以设置 200 到 399 范围内的 HTTP 状态码。

</template>
</BiRow>

<BiRow>
<template #en>

![Reply Message Component](/ragflow-images/reply_message_component_1.jpg)

</template>
<template #zh>

![Reply Message 组件](/ragflow-images/reply_message_component_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Save to Memory

</template>
<template #zh>

### 保存到记忆

</template>
</BiRow>

<BiRow>
<template #en>

The reply message component can choose to save to memory, storing the conversation in the specified memory. After enabling **User ID**, conversations can be associated with user IDs, and subsequent knowledge retrieval can query related memories by user ID.

</template>
<template #zh>

回复消息组件可以选择保存到记忆，把会话存入指定的记忆。启用 **User ID** 后，会话可以与用户 ID 关联，后续的知识检索可按用户 ID 查询相关记忆。

</template>
</BiRow>

<BiRow>
<template #en>

### Applicable Scenarios

</template>
<template #zh>

### 适用场景

</template>
</BiRow>

<BiRow>
<template #en>

This component is suitable for outputting final answers, branch hints, fallback replies, or displaying intermediate processing results to users.

</template>
<template #zh>

该组件适合用于输出最终答案、分支提示、兜底回复，或向用户展示中间处理结果。

</template>
</BiRow>

<BiRow>
<template #en>

### Output Result

</template>
<template #zh>

### 输出结果

</template>
</BiRow>

<BiRow>
<template #en>

The message outputs the configured text or variable content to the conversation window, webhook response, or embedded page.

</template>
<template #zh>

回复消息组件会把配置好的文本或变量内容输出到对话窗口、webhook 响应或嵌入页面。

</template>
</BiRow>

<BiRow>
<template #en>

![Reply Message Component](/ragflow-images/reply_message_component_2.jpg)

</template>
<template #zh>

![Reply Message 组件](/ragflow-images/reply_message_component_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Await Response Component
Await Response pauses the workflow and waits for users to supplement information. Suitable for multi-turn dialogue, form collection, confirmation operations or file upload requirements.

</template>
<template #zh>

## Await Response 组件
Await Response 会暂停工作流，等待用户补充信息。适合多轮对话、表单收集、确认操作或文件上传等需求。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Method
Define prompt messages to guide users. Input supports the same variable types as Begin: single-line text, paragraph text, dropdown options, file upload, number and boolean.

</template>
<template #zh>

### 配置方法
定义提示消息来引导用户。输入支持的变量类型与 Begin 相同：单行文本、段落文本、下拉选项、文件上传、数字和布尔值。

</template>
</BiRow>

<BiRow>
<template #en>

Recommendations:
- Dropdown options: Select business categories
- Paragraph text: Collect detailed requirement descriptions
- File upload: Receive contracts, reports or screenshots
- Boolean: Confirm continue/cancel operations

</template>
<template #zh>

建议：
- 下拉选项：选择业务类别
- 段落文本：收集详细的需求描述
- 文件上传：接收合同、报告或截图
- 布尔值：确认继续/取消操作

</template>
</BiRow>

<BiRow>
<template #en>

![User Input Component](/ragflow-images/user_input_component.jpg)

</template>
<template #zh>

![用户输入组件](/ragflow-images/user_input_component.jpg)

</template>
</BiRow>
