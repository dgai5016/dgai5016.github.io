<BiRow>
<template #en>

A memory must be connected to an Agent before historical messages can be written during Agent execution or historical context can be retrieved when answering. Usually, both directions, **write to memory** and **retrieve from memory**, need to be configured.

</template>
<template #zh>

记忆必须先连接到 Agent，才能在 Agent 执行过程中写入历史消息，或在回答时检索历史上下文。通常，**写入记忆**和**从记忆检索**两个方向都需要配置。

</template>
</BiRow>

<BiRow>
<template #en>

### Write Agent Messages to Memory

</template>
<template #zh>

### 将 Agent 消息写入记忆

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to the **Agent** page and open the Agent that needs to be configured.
2. Select or add the **Message** component on the Agent canvas.
3. In the **Message** component configuration, find **Save to Memory**.
4. Select the target memory. If historical records need to be distinguished by user, configure the user ID.
5. Save the Agent and run a test. After it runs, return to the memory's **Messages** page to check whether new messages have been generated.

</template>
<template #zh>

1. 进入 **Agent** 页面，打开需要配置的 Agent。
2. 在 Agent 画布上选择或添加 **Message** 组件。
3. 在 **Message** 组件配置中找到 **Save to Memory**。
4. 选择目标记忆。若需要按用户区分历史记录，请配置用户 ID。
5. 保存 Agent 并运行测试。运行后回到记忆的 **Messages** 页面，检查是否生成了新消息。

</template>
</BiRow>

<BiRow>
<template #en>

![Write agent messages to memory](/ragflow-images/write_agent_messages_to_memory.jpg)

</template>
<template #zh>

![将 Agent 消息写入记忆](/ragflow-images/write_agent_messages_to_memory.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Let an Agent Retrieve from Memory

</template>
<template #zh>

### 让 Agent 从记忆中检索

</template>
</BiRow>

<BiRow>
<template #en>

1. Select or add the **Retrieval** component on the Agent canvas.
2. In **Query variable**, select the query source. `sys.query` is commonly used.
3. In **Retrieval source**, select **Memory**, and select one or more target memories.
4. Adjust **Similarity threshold**, **Vector similarity weight**, and **Top N** as needed.
5. Connect the retrieval result to a subsequent large language model or answer component, so that the Agent can use the retrieved historical context.
6. Save and run a test, and check whether the answer correctly references historical memories.

</template>
<template #zh>

1. 在 Agent 画布上选择或添加 **Retrieval** 组件。
2. 在 **Query variable** 中选择查询来源，`sys.query` 较为常用。
3. 在 **Retrieval source** 中选择 **Memory**，并选择一个或多个目标记忆。
4. 按需调整 **Similarity threshold**、**Vector similarity weight** 和 **Top N**。
5. 把检索结果连接到后续的大语言模型或回答组件，使 Agent 能够使用检索到的历史上下文。
6. 保存并运行测试，检查回答是否正确引用了历史记忆。

</template>
</BiRow>

<BiRow>
<template #en>

![Let an agent retrieve from memory](/ragflow-images/let_an_agent_retrieve_from_memory.jpg)

</template>
<template #zh>

![让 Agent 从记忆中检索](/ragflow-images/let_an_agent_retrieve_from_memory.jpg)

</template>
</BiRow>
