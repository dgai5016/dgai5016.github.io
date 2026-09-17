# 连接到 Agent

记忆必须先连接到 Agent，才能在 Agent 执行过程中写入历史消息，或在回答时检索历史上下文。通常，**写入记忆**和**从记忆检索**两个方向都需要配置。

### 将 Agent 消息写入记忆

1. 进入 **Agent** 页面，打开需要配置的 Agent。
2. 在 Agent 画布上选择或添加 **Message** 组件。
3. 在 **Message** 组件配置中找到 **Save to Memory**。
4. 选择目标记忆。若需要按用户区分历史记录，请配置用户 ID。
5. 保存 Agent 并运行测试。运行后回到记忆的 **Messages** 页面，检查是否生成了新消息。

![将 Agent 消息写入记忆](/ragflow-images/write_agent_messages_to_memory.jpg)

### 让 Agent 从记忆中检索

1. 在 Agent 画布上选择或添加 **Retrieval** 组件。
2. 在 **Query variable** 中选择查询来源，`sys.query` 较为常用。
3. 在 **Retrieval source** 中选择 **Memory**，并选择一个或多个目标记忆。
4. 按需调整 **Similarity threshold**、**Vector similarity weight** 和 **Top N**。
5. 把检索结果连接到后续的大语言模型或回答组件，使 Agent 能够使用检索到的历史上下文。
6. 保存并运行测试，检查回答是否正确引用了历史记忆。

![让 Agent 从记忆中检索](/ragflow-images/let_an_agent_retrieve_from_memory.jpg)
