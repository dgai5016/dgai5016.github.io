<BiRow>
<template #en>

## Begin Component

</template>
<template #zh>

## Begin 组件

</template>
</BiRow>

<BiRow>
<template #en>

`Begin` is the starting point of an Agent workflow. It is used to set the trigger mode, opening greeting, and global input variables. Every Agent must contain a `Begin` component.

</template>
<template #zh>

`Begin` 是 Agent 工作流的起点，用于设置触发方式、开场白和全局输入变量。每个 Agent 都必须包含一个 `Begin` 组件。

</template>
</BiRow>

<BiRow>
<template #en>

### Trigger Mode

</template>
<template #zh>

### 触发方式

</template>
</BiRow>

<BiRow>
<template #en>

`Begin` supports the following modes:

</template>
<template #zh>

`Begin` 支持以下方式：

</template>
</BiRow>

<BiRow>
<template #en>

- **Conversational**: Triggered from a conversation. This is suitable for regular chat-style Agents.
- **Task**: Started as a task. This is suitable for non-conversational automated workflows.
- **Webhook**: Triggered by external HTTP requests. This is suitable for system integration, automation tasks, and third-party callbacks.

</template>
<template #zh>

- **Conversational**：从对话中触发。适合常规聊天式 Agent。
- **Task**：以任务方式启动。适合非对话式的自动化工作流。
- **Webhook**：由外部 HTTP 请求触发。适合系统集成、自动化任务和第三方回调。

</template>
</BiRow>

<BiRow>
<template #en>

When `Webhook` mode is selected, the system generates the current Agent's Webhook URL. You can continue to configure the request method, security authentication, request schema, and response method.

</template>
<template #zh>

选择 `Webhook` 方式后，系统会生成当前 Agent 的 Webhook URL。你可以继续配置请求方式、安全认证、请求结构和响应方式。

</template>
</BiRow>

<BiRow>
<template #en>

### Opening Greeting

</template>
<template #zh>

### Opening Greeting

</template>
</BiRow>

<BiRow>
<template #en>

In `Conversational` mode, you can set the first message that the Agent says to the user in **Opening greeting**. The opening greeting should describe what the Agent can handle, and should not be written as a lengthy product introduction.

</template>
<template #zh>

在 `Conversational` 方式下，你可以在 **Opening greeting** 中设置 Agent 对用户说的第一条消息。开场白应说明 Agent 能够处理的内容，不要写成冗长的产品介绍。

</template>
</BiRow>

<BiRow>
<template #en>

Example:

</template>
<template #zh>

示例：

</template>
</BiRow>

<BiRow>
<template #en>

> Hello, I can help you query product materials, compare models, and generate installation suggestions.  
> Please describe your question, or upload the files that need to be analyzed.

</template>
<template #zh>

> 你好，我可以帮你查询产品资料、对比型号并生成安装建议。  
> 请描述你的问题，或上传需要分析的文件。

</template>
</BiRow>

<BiRow>
<template #en>

![Begin Component](/ragflow-images/begin_component_1.jpg)

</template>
<template #zh>

![Begin 组件](/ragflow-images/begin_component_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Input Variables

</template>
<template #zh>

### 输入变量

</template>
</BiRow>

<BiRow>
<template #en>

`Input` is used to define the input parameters that users need to provide before starting a conversation. After configuration, subsequent components can reference these inputs through variables.

</template>
<template #zh>

`Input` 用于定义用户在开始对话前需要提供的输入参数。配置后，后续组件可以通过变量引用这些输入。

</template>
</BiRow>

<BiRow>
<template #en>

In the **Input** area of the right configuration panel for the `Begin` component, click the `+` button in the upper right corner to add an input variable.

</template>
<template #zh>

在 `Begin` 组件右侧配置面板的 **Input** 区域，点击右上角的 `+` 按钮即可添加输入变量。

</template>
</BiRow>

<BiRow>
<template #en>

Common fields are as follows:

</template>
<template #zh>

常见字段如下：

</template>
</BiRow>

<BiRow>
<template #en>

- **Name**: The variable display name.
- **Type**: The variable type, including single-line text, paragraph text, dropdown options, file upload, number, and Boolean.
- **Key**: The variable key, used by subsequent components for reference.
- **Optional**: Whether the input is optional.

</template>
<template #zh>

- **Name**：变量的显示名称。
- **Type**：变量类型，包括单行文本、段落文本、下拉选项、文件上传、数字和布尔值。
- **Key**：变量键名，供后续组件引用。
- **Optional**：该输入是否为可选。

</template>
</BiRow>

<BiRow>
<template #en>

Variable types:

</template>
<template #zh>

变量类型：

</template>
</BiRow>

<BiRow>
<template #en>

| Type | Description |
| --- | --- |
| Single-line text | Used to enter short text, such as names, keywords, and serial numbers. |
| Paragraph text | Used to enter longer content, such as problem descriptions, requirement descriptions, and prompts. |
| Dropdown options | Provides predefined options for users to select. You can click **Add option** to add multiple options. This is suitable for fixed-value inputs such as language, department, and model type. |
| File upload | Allows users to upload files as workflow input. This can be used for document analysis, image processing, and similar scenarios. Uploaded files are not automatically saved to knowledge bases, and are used only in the current workflow. |
| Number | Used to enter numeric values, such as quantity, threshold, `Top K`, and maximum returned items. |
| Boolean | Provides a switch (`True`/`False`) or yes/no option, used to control whether a feature is enabled or whether a branch is executed. |
| JSON object | Used to enter structured JSON data, such as parameters, configurations, or other complex data containing multiple fields. |

</template>
<template #zh>

| 类型 | 说明 |
| --- | --- |
| 单行文本 | 用于输入简短的文本，例如姓名、关键词、编号。 |
| 段落文本 | 用于输入较长的内容，例如问题描述、需求描述、提示词。 |
| 下拉选项 | 提供预设选项供用户选择。可以点击 **添加选项** 增加多个选项。适合语言、部门、型号等固定取值的输入。 |
| 文件上传 | 允许用户上传文件作为工作流输入。可用于文档分析、图像处理等场景。上传的文件不会自动保存到知识库，仅在当前工作流中使用。 |
| 数字 | 用于输入数值，例如数量、阈值、`Top K`、最大返回条数。 |
| 布尔值 | 提供开关（`True`/`False`）或是否选项，用于控制某个功能是否启用、某个分支是否执行。 |
| JSON 对象 | 用于输入结构化的 JSON 数据，例如参数、配置或其他包含多个字段的复杂数据。 |

</template>
</BiRow>

<BiRow>
<template #en>

![Begin Component](/ragflow-images/begin_component_2.jpg)

</template>
<template #zh>

![Begin 组件](/ragflow-images/begin_component_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE

Files uploaded through the `Begin` component are used only as input for the current workflow. They are not automatically saved to knowledge bases, and they do not use knowledge base parsing, OCR, or chunking capabilities. File content can be passed to subsequent components as variables, and is limited by the model context length.

:::

</template>
<template #zh>

:::tip 注意

通过 `Begin` 组件上传的文件仅作为当前工作流的输入使用：不会自动保存到知识库，也不会使用知识库的解析、OCR 或分块能力。文件内容可以作为变量传递给后续组件，并受模型上下文长度限制。

:::

</template>
</BiRow>

<BiRow>
<template #en>

## Agent Component

</template>
<template #zh>

## Agent 组件

</template>
</BiRow>

<BiRow>
<template #en>

The Agent component is used to call large language models for reasoning, content generation, task planning, and tool calling. It can process user questions independently, or work with components such as knowledge retrieval, HTTP requests, code, databases, and sub-agents to complete multi-step tasks.

</template>
<template #zh>

Agent 组件用于调用大语言模型完成推理、内容生成、任务规划和工具调用。它可以独立处理用户问题，也可以与知识检索、HTTP 请求、代码、数据库、子 Agent 等组件配合完成多步任务。

</template>
</BiRow>

<BiRow>
<template #en>

The Agent component can work independently and has the following capabilities:

</template>
<template #zh>

Agent 组件可以独立工作，具备以下能力：

</template>
</BiRow>

<BiRow>
<template #en>

- Reason, reflect, and adjust based on context and execution results.
- Call tools or sub-agents to complete tasks.
- Control reply style, task boundaries, and output format through system prompts and user prompts.

</template>
<template #zh>

- 根据上下文和执行结果进行推理、反思和调整。
- 调用工具或子 Agent 完成任务。
- 通过系统提示词和用户提示词控制回复风格、任务边界和输出格式。

</template>
</BiRow>

<BiRow>
<template #en>

### Basic Configuration

</template>
<template #zh>

### 基础配置

</template>
</BiRow>

<BiRow>
<template #en>

Common configuration items for the Agent component include `Model`, `System prompt`, `User prompt`, `Tools`, `Agent`, `Message window size`, `Max retries`, `Delay after error`, `Max reflection rounds`, and `Output`.

</template>
<template #zh>

Agent 组件的常用配置项包括 `Model`、`System prompt`、`User prompt`、`Tools`、`Agent`、`Message window size`、`Max retries`、`Delay after error`、`Max reflection rounds` 和 `Output`。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration steps:

</template>
<template #zh>

配置步骤：

</template>
</BiRow>

<BiRow>
<template #en>

1. Click the Agent component to open the right configuration panel.
2. Select a chat model in **Model**.
3. Set **Creativity** as needed, or keep **Precise**.
4. Describe the role, constraints, and output format in **System prompt**.
5. Write the task in **User prompt**, and insert variables by typing `/`.
6. If retrieval, SQL, HTTP, MCP, or sub-Agents are required, add **Tools** or **Agent**.
7. Set the output variable name.
8. Save and run tests.

</template>
<template #zh>

1. 点击 Agent 组件，打开右侧配置面板。
2. 在 **Model** 中选择一个对话模型。
3. 按需设置 **Creativity**，或保持 **Precise**。
4. 在 **System prompt** 中描述角色、约束和输出格式。
5. 在 **User prompt** 中编写任务，输入 `/` 可插入变量。
6. 如需检索、SQL、HTTP、MCP 或子 Agent，添加 **Tools** 或 **Agent**。
7. 设置输出变量名。
8. 保存并运行测试。

</template>
</BiRow>

<BiRow>
<template #en>

![Agent Component](/ragflow-images/agent_component_1.jpg)

</template>
<template #zh>

![Agent 组件](/ragflow-images/agent_component_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Prompt Configuration

</template>
<template #zh>

### 提示词配置

</template>
</BiRow>

<BiRow>
<template #en>

The system prompt is used to define the model role and behavior boundaries. The user prompt is used to define the current task and input data.

</template>
<template #zh>

系统提示词用于定义模型的角色和行为边界。用户提示词用于定义当前任务和输入数据。

</template>
</BiRow>

<BiRow>
<template #en>

If the Agent component follows a knowledge retrieval component, you usually need to reference `formalized_content` in the user prompt so that the model answers based on the retrieval results.

</template>
<template #zh>

如果 Agent 组件位于知识检索组件之后，通常需要在用户提示词中引用 `formalized_content`，让模型依据检索结果作答。

</template>
</BiRow>

<BiRow>
<template #en>

Example:

</template>
<template #zh>

示例：

</template>
</BiRow>

<BiRow>
<template #en>

> Please answer `/sys.query` based on `/Retrieval_0.formalized_content`. If the retrieval results are insufficient, clearly state that confirmation cannot be obtained from the knowledge base, and do not fabricate answers.

</template>
<template #zh>

> 请基于 `/Retrieval_0.formalized_content` 回答 `/sys.query`。如果检索结果不足以回答，请明确说明无法从知识库获得确认，不要编造答案。

</template>
</BiRow>

<BiRow>
<template #en>

![Agent Component](/ragflow-images/agent_component_2.jpg)

</template>
<template #zh>

![Agent 组件](/ragflow-images/agent_component_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Tools and Sub-Agents

</template>
<template #zh>

### 工具与子 Agent

</template>
</BiRow>

<BiRow>
<template #en>

When tools or sub-agents are added under an Agent component, the current Agent acts as a planner and determines when to call these capabilities. Tools can be knowledge retrieval (`Retrieval`), Execute SQL, HTTP Request, MCP Server, or other available components. Sub-agents are used to split complex tasks and assign them to different roles for collaboration.

</template>
<template #zh>

在 Agent 组件下添加工具或子 Agent 后，当前 Agent 会作为规划者，决定何时调用这些能力。工具可以是知识检索（`Retrieval`）、Execute SQL、HTTP Request、MCP Server 或其他可用组件。子 Agent 用于拆分复杂任务并分配给不同角色协作完成。

</template>
</BiRow>

<BiRow>
<template #en>

It is recommended to describe tool trigger conditions in the system prompt. For example: "Call knowledge base retrieval first when product documents are involved" or "Call the HTTP API when order status is involved".

</template>
<template #zh>

建议在系统提示词中描述工具的触发条件。例如：「涉及产品文档时，优先调用知识库检索」或「涉及订单状态时，调用 HTTP API」。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE

Tool calling, sub-agents, reflection rounds, and a larger message window size all increase response time. For regular Q&A, prefer a simple workflow. Enable tools and multi-agent planning only when planning is truly required.

:::

</template>
<template #zh>

:::tip 注意

工具调用、子 Agent、反思轮数以及更大的消息窗口都会增加响应时间。常规问答优先采用简单的工作流，仅在确有规划需求时启用工具和多 Agent 规划。

:::

</template>
</BiRow>

<BiRow>
<template #en>

![Agent Component](/ragflow-images/agent_component_3.jpg)

</template>
<template #zh>

![Agent 组件](/ragflow-images/agent_component_3.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Advanced Settings

</template>
<template #zh>

### 高级设置

</template>
</BiRow>

<BiRow>
<template #en>

Advanced settings are used to control context management, exception handling, output format, and other runtime behavior for the Agent node. In most cases, keep the default configuration. When you need to optimize Agent execution results or adapt to a specific business scenario, adjust these settings based on actual requirements.

</template>
<template #zh>

高级设置用于控制 Agent 节点的上下文管理、异常处理、输出格式等运行行为。大多数情况下保持默认配置即可；需要优化 Agent 执行效果或适配特定业务场景时，再按实际需求调整。

</template>
</BiRow>

<BiRow>
<template #en>

Parameter description:

</template>
<template #zh>

参数说明：

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter | Description | Suggestion |
| --- | --- | --- |
| Message window size | Sets the number of historical messages retained by the Agent during reasoning. A larger window provides more context, but increases token consumption. | Keep the default value in general. Increase it for multi-turn conversations, and decrease it for single-turn tasks. |
| Citation | Specifies whether to return citation information in answers. When the Agent uses knowledge bases or retrieval results to generate answers, source citations can be enabled to make it easier to view the basis for the answer. | Recommended for knowledge base Q&A scenarios. |
| Max retries | The maximum number of retries after Agent execution fails. When model calls or tool calls fail, the system automatically retries. | Keep the default value. Increase it when the network is unstable. |
| Delay after error | The waiting time, in seconds, before each retry. This helps avoid another failure caused by continuous requests within a short time. | Keep the default value in general. |
| Exception handling method | Sets how the Agent handles exceptions during execution. Different options determine whether execution continues, exception information is returned, or another handling policy is used after an error occurs. | Select based on business requirements. Keep the default value if there are no special requirements. |

</template>
<template #zh>

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| Message window size | 设置 Agent 推理时保留的历史消息条数。窗口越大提供的上下文越多，但会增加 token 消耗。 | 一般保持默认。多轮对话可调大，单轮任务可调小。 |
| Citation | 设置回答中是否返回引用信息。当 Agent 使用知识库或检索结果生成回答时，可以启用来源引用，方便查看回答依据。 | 知识库问答场景建议启用。 |
| Max retries | Agent 执行失败后的最大重试次数。模型调用或工具调用失败时，系统会自动重试。 | 保持默认。网络不稳定时可调大。 |
| Delay after error | 每次重试前等待的秒数，用于避免短时间内连续请求导致再次失败。 | 一般保持默认。 |
| Exception handling method | 设置 Agent 执行中出现异常时的处理方式。不同选项决定出错后是继续执行、返回异常信息，还是采用其他处理策略。 | 根据业务需求选择。无特殊要求时保持默认。 |

</template>
</BiRow>

<BiRow>
<template #en>

`Output` is used to configure the output content of the Agent node.

</template>
<template #zh>

`Output` 用于配置 Agent 节点的输出内容。

</template>
</BiRow>

<BiRow>
<template #en>

| Configuration item | Description |
| --- | --- |
| `content` | The natural language text returned by the Agent. This is the default output. |
| `structured` | Structured data returned by the Agent. After structured output is enabled, results can be output according to a predefined JSON Schema, making it easier for subsequent nodes to read and process. |

</template>
<template #zh>

| 配置项 | 说明 |
| --- | --- |
| `content` | Agent 返回的自然语言文本，是默认输出。 |
| `structured` | Agent 返回的结构化数据。启用结构化输出后，可以按预定义的 JSON Schema 输出结果，便于后续节点读取和处理。 |

</template>
</BiRow>

<BiRow>
<template #en>

For structured output, after enabling **Structured output**, click **Configuration** to configure the output structure. Users can define the returned data format according to JSON Schema, such as specifying field names, data types, and required fields. The Agent tries to return results according to the configured structure, making it easier to pass data to nodes such as Code, HTTP Request, SQL, and condition judgment for automated processing.

</template>
<template #zh>

结构化输出：启用 **Structured output** 后，点击 **配置** 设置输出结构。你可以按 JSON Schema 定义返回的数据格式，例如指定字段名、数据类型和必填字段。Agent 会尽量按配置的结构返回结果，便于把数据传给 Code、HTTP Request、SQL、条件判断等节点做自动化处理。

</template>
</BiRow>

<BiRow>
<template #en>

![Agent Component](/ragflow-images/agent_component_4.jpg)

</template>
<template #zh>

![Agent 组件](/ragflow-images/agent_component_4.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Retrieval Component

</template>
<template #zh>

## Retrieval 组件

</template>
</BiRow>

<BiRow>
<template #en>

The knowledge retrieval component is used to retrieve relevant content from specified knowledge bases or memories. It can be used as a regular workflow component, or as a tool for the Agent component.

</template>
<template #zh>

知识检索组件用于从指定的知识库或记忆中检索相关内容。它既可以作为普通的工作流组件使用，也可以作为 Agent 组件的工具使用。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration steps:

</template>
<template #zh>

配置步骤：

</template>
</BiRow>

<BiRow>
<template #en>

1. Click the knowledge retrieval component.
2. In **Query variable**, select the query source. `sys.query` is commonly used.
3. In **Retrieval source**, select one or more knowledge bases, or select **Memory**.
4. Adjust **Similarity threshold**, **Keyword similarity weight**, and **Top N** as needed.
5. For cross-language retrieval, select a **Cross-language search** language.
6. For graph multi-hop Q&A, enable **Use knowledge graph**.
7. Click **Run** to test the retrieval results.

</template>
<template #zh>

1. 点击知识检索组件。
2. 在 **Query variable** 中选择查询来源，`sys.query` 较为常用。
3. 在 **Retrieval source** 中选择一个或多个知识库，或选择 **Memory**。
4. 按需调整 **Similarity threshold**、**Keyword similarity weight** 和 **Top N**。
5. 需要跨语言检索时，选择 **Cross-language search** 语言。
6. 需要知识图谱多跳问答时，启用 **Use knowledge graph**。
7. 点击 **运行** 测试检索结果。

</template>
</BiRow>

<BiRow>
<template #en>

![Knowledge Retrieval Component](/ragflow-images/knowledge_retrieval_component_1.jpg)

</template>
<template #zh>

![知识检索组件](/ragflow-images/knowledge_retrieval_component_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Knowledge Retrieval Component](/ragflow-images/knowledge_retrieval_component_2.jpg)

</template>
<template #zh>

![知识检索组件](/ragflow-images/knowledge_retrieval_component_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

### Parameter Description

</template>
<template #zh>

### 参数说明

</template>
</BiRow>

<BiRow>
<template #en>

**Similarity threshold** is used to filter low-relevance chunks. The higher the threshold, the stricter the returned content, but useful information may be missed.

</template>
<template #zh>

**Similarity threshold** 用于过滤相关度低的分块。阈值越高，返回内容越严格，但可能遗漏有用信息。

</template>
</BiRow>

<BiRow>
<template #en>

**Keyword similarity weight** is used to control the weight of vector similarity in the overall similarity score. When retrieving from multiple knowledge bases together, make sure they use the same embedding model.

</template>
<template #zh>

**Keyword similarity weight** 用于控制向量相似度在整体相似度得分中的权重。多个知识库一起检索时，请确保它们使用相同的嵌入模型。

</template>
</BiRow>

<BiRow>
<template #en>

**Top N** specifies the number of chunks sent to subsequent components. Too few chunks may result in insufficient information, while too many chunks may increase response time and context pressure.

</template>
<template #zh>

**Top N** 指定发送给后续组件的分块数量。分块过少可能导致信息不足，过多则可能增加响应时间和上下文压力。

</template>
</BiRow>

<BiRow>
<template #en>

Enabling a **Rerank model** usually improves the sorting of knowledge retrieval results, but also adds model call latency. For Agents that are sensitive to speed, you can leave reranking disabled at first.

</template>
<template #zh>

启用 **Rerank model** 通常能改善知识检索结果的排序，但也会增加模型调用延迟。对速度敏感的 Agent，可以先不启用重排序。

</template>
</BiRow>

<BiRow>
<template #en>

`Similarity threshold` is used to filter low-relevance chunks. The higher the threshold, the stricter the returned content, but useful information may be missed.

</template>
<template #zh>

`Similarity threshold` 用于过滤相关度低的分块。阈值越高，返回内容越严格，但可能遗漏有用信息。

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration Suggestions

</template>
<template #zh>

### 配置建议

</template>
</BiRow>

<BiRow>
<template #en>

The following values are only initial configuration references. Actual results are affected by the embedding model, document quality, chunking method, and business questions. Adjust them based on knowledge retrieval test results.

</template>
<template #zh>

下表数值仅作为初始配置参考。实际效果受嵌入模型、文档质量、分块方法和业务问题影响，请结合知识检索测试结果调整。

</template>
</BiRow>

<BiRow>
<template #en>

Retrieval parameters directly affect answer coverage, accuracy, and response time. You can start with the settings in the following table, and then optimize them based on real questions.

</template>
<template #zh>

检索参数直接影响回答的覆盖面、准确性和响应时间。可以先按下表设置起步，再根据真实问题优化。

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter | Suggested Value | Scenario | Description |
| --- | --- | --- | --- |
| Top N | 3-5 | FAQ and short knowledge entries | Faster responses for clear answers. |
| Top N | 5-10 | Product documentation and help centers | Default recommended range. |
| Top N | 10-20 | Legal contracts and long document analysis | More context with higher token consumption. |
| Similarity threshold | 0.2 | Loose recall | Questions with diverse expressions. |
| Similarity threshold | 0.5 | General Q&A | Default starting value. |
| Similarity threshold | 0.8 | Strict precise matching | Scenarios that require exact terminology matching. |

</template>
<template #zh>

| 参数 | 建议值 | 场景 | 说明 |
| --- | --- | --- | --- |
| Top N | 3-5 | FAQ 和短知识条目 | 答案明确时响应更快。 |
| Top N | 5-10 | 产品文档和帮助中心 | 默认推荐范围。 |
| Top N | 10-20 | 法律合同和长文档分析 | 上下文更多，token 消耗更高。 |
| Similarity threshold | 0.2 | 宽松召回 | 提问表达多样的场景。 |
| Similarity threshold | 0.5 | 一般问答 | 默认起始值。 |
| Similarity threshold | 0.8 | 严格精确匹配 | 需要精确匹配术语的场景。 |

</template>
</BiRow>
