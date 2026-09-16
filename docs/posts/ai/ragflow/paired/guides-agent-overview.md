<BiRow>
<template #en>

## Purpose of Agent
Agent is the business workflow orchestration capability in RAGFlow. Users can add components on a no-code canvas and define execution order via connections. Components can be executed sequentially, or enter different paths according to conditional branches, classification results or loop logic.

</template>
<template #zh>

## Agent 的用途
Agent 是 RAGFlow 中的业务工作流编排能力。用户可以在零代码画布上添加组件，并通过连线定义执行顺序。组件可以顺序执行，也可以根据条件分支、分类结果或循环逻辑进入不同路径。

</template>
</BiRow>

<BiRow>
<template #en>

Agents are commonly used in the following scenarios:
- Answering user questions based on knowledge bases.
- Identifying user intents and routing to different processing flows.
- Calling HTTP interfaces, databases, MCP tools or custom code.
- Splitting and batch processing long texts.
- Saving session memory or exporting processing results.

</template>
<template #zh>

Agent 常用于以下场景：
- 基于知识库回答用户问题。
- 识别用户意图并路由到不同的处理流程。
- 调用 HTTP 接口、数据库、MCP 工具或自定义代码。
- 拆分长文本并批量处理。
- 保存会话记忆或导出处理结果。

</template>
</BiRow>

<BiRow>
<template #en>

## Relationship Between Agent and Knowledge Base Q&A
- **Chat**: Suitable for applications mainly based on knowledge base Q&A and multi-turn dialogue.
- **Agent**: Suitable for business workflows requiring conditional branching, tool calling, data processing or multi-step orchestration.

</template>
<template #zh>

## Agent 与知识库问答的关系
- **对话助手（Chat）**：适合以知识库问答和多轮对话为主的应用。
- **Agent**：适合需要条件分支、工具调用、数据处理或多步编排的业务工作流。

</template>
</BiRow>

<BiRow>
<template #en>

The `Retrieval` component can be used inside an Agent to query knowledge bases. Retrieval can also be used as a tool under the Agent component, allowing the LLM to autonomously decide when to perform retrieval.

</template>
<template #zh>

`Retrieval` 组件可以在 Agent 内部查询知识库。检索也可以作为 Agent 组件下的工具使用，让 LLM 自主决定何时执行检索。

</template>
</BiRow>

<BiRow>
<template #en>

For example, an after-sales Agent can first use `Categorize` to judge the type of user questions, then use `Retrieval` to query product materials. If the user requests installation reservation, an HTTP request is used to call the external work order system. Finally, the `Message` component outputs the result.

</template>
<template #zh>

例如，一个售后 Agent 可以先用 `Categorize` 判断用户问题类型，再用 `Retrieval` 查询产品资料；如果用户请求安装预约，则通过 HTTP 请求调用外部工单系统；最后由 `Message` 组件输出结果。

</template>
</BiRow>
