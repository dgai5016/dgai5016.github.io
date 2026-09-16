# 基础组件

## Begin 组件

`Begin` 是 Agent 工作流的起点，用于设置触发方式、开场白和全局输入变量。每个 Agent 都必须包含一个 `Begin` 组件。

### 触发方式

`Begin` 支持以下方式：

- **Conversational**：从对话中触发。适合常规聊天式 Agent。
- **Task**：以任务方式启动。适合非对话式的自动化工作流。
- **Webhook**：由外部 HTTP 请求触发。适合系统集成、自动化任务和第三方回调。

选择 `Webhook` 方式后，系统会生成当前 Agent 的 Webhook URL。你可以继续配置请求方式、安全认证、请求结构和响应方式。

### Opening Greeting

在 `Conversational` 方式下，你可以在 **Opening greeting** 中设置 Agent 对用户说的第一条消息。开场白应说明 Agent 能够处理的内容，不要写成冗长的产品介绍。

示例：

> 你好，我可以帮你查询产品资料、对比型号并生成安装建议。  
> 请描述你的问题，或上传需要分析的文件。

![Begin 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/begin_component_1.jpg)

### 输入变量

`Input` 用于定义用户在开始对话前需要提供的输入参数。配置后，后续组件可以通过变量引用这些输入。

在 `Begin` 组件右侧配置面板的 **Input** 区域，点击右上角的 `+` 按钮即可添加输入变量。

常见字段如下：

- **Name**：变量的显示名称。
- **Type**：变量类型，包括单行文本、段落文本、下拉选项、文件上传、数字和布尔值。
- **Key**：变量键名，供后续组件引用。
- **Optional**：该输入是否为可选。

变量类型：

| 类型 | 说明 |
| --- | --- |
| 单行文本 | 用于输入简短的文本，例如姓名、关键词、编号。 |
| 段落文本 | 用于输入较长的内容，例如问题描述、需求描述、提示词。 |
| 下拉选项 | 提供预设选项供用户选择。可以点击 **添加选项** 增加多个选项。适合语言、部门、型号等固定取值的输入。 |
| 文件上传 | 允许用户上传文件作为工作流输入。可用于文档分析、图像处理等场景。上传的文件不会自动保存到知识库，仅在当前工作流中使用。 |
| 数字 | 用于输入数值，例如数量、阈值、`Top K`、最大返回条数。 |
| 布尔值 | 提供开关（`True`/`False`）或是否选项，用于控制某个功能是否启用、某个分支是否执行。 |
| JSON 对象 | 用于输入结构化的 JSON 数据，例如参数、配置或其他包含多个字段的复杂数据。 |

![Begin 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/begin_component_2.jpg)

:::tip 注意

通过 `Begin` 组件上传的文件仅作为当前工作流的输入使用：不会自动保存到知识库，也不会使用知识库的解析、OCR 或分块能力。文件内容可以作为变量传递给后续组件，并受模型上下文长度限制。

:::

## Agent 组件

Agent 组件用于调用大语言模型完成推理、内容生成、任务规划和工具调用。它可以独立处理用户问题，也可以与知识检索、HTTP 请求、代码、数据库、子 Agent 等组件配合完成多步任务。

Agent 组件可以独立工作，具备以下能力：

- 根据上下文和执行结果进行推理、反思和调整。
- 调用工具或子 Agent 完成任务。
- 通过系统提示词和用户提示词控制回复风格、任务边界和输出格式。

### 基础配置

Agent 组件的常用配置项包括 `Model`、`System prompt`、`User prompt`、`Tools`、`Agent`、`Message window size`、`Max retries`、`Delay after error`、`Max reflection rounds` 和 `Output`。

配置步骤：

1. 点击 Agent 组件，打开右侧配置面板。
2. 在 **Model** 中选择一个对话模型。
3. 按需设置 **Creativity**，或保持 **Precise**。
4. 在 **System prompt** 中描述角色、约束和输出格式。
5. 在 **User prompt** 中编写任务，输入 `/` 可插入变量。
6. 如需检索、SQL、HTTP、MCP 或子 Agent，添加 **Tools** 或 **Agent**。
7. 设置输出变量名。
8. 保存并运行测试。

![Agent 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_component_1.jpg)

### 提示词配置

系统提示词用于定义模型的角色和行为边界。用户提示词用于定义当前任务和输入数据。

如果 Agent 组件位于知识检索组件之后，通常需要在用户提示词中引用 `formalized_content`，让模型依据检索结果作答。

示例：

> 请基于 `/Retrieval_0.formalized_content` 回答 `/sys.query`。如果检索结果不足以回答，请明确说明无法从知识库获得确认，不要编造答案。

![Agent 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_component_2.jpg)

### 工具与子 Agent

在 Agent 组件下添加工具或子 Agent 后，当前 Agent 会作为规划者，决定何时调用这些能力。工具可以是知识检索（`Retrieval`）、Execute SQL、HTTP Request、MCP Server 或其他可用组件。子 Agent 用于拆分复杂任务并分配给不同角色协作完成。

建议在系统提示词中描述工具的触发条件。例如：「涉及产品文档时，优先调用知识库检索」或「涉及订单状态时，调用 HTTP API」。

:::tip 注意

工具调用、子 Agent、反思轮数以及更大的消息窗口都会增加响应时间。常规问答优先采用简单的工作流，仅在确有规划需求时启用工具和多 Agent 规划。

:::

![Agent 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_component_3.jpg)

### 高级设置

高级设置用于控制 Agent 节点的上下文管理、异常处理、输出格式等运行行为。大多数情况下保持默认配置即可；需要优化 Agent 执行效果或适配特定业务场景时，再按实际需求调整。

参数说明：

| 参数 | 说明 | 建议 |
| --- | --- | --- |
| Message window size | 设置 Agent 推理时保留的历史消息条数。窗口越大提供的上下文越多，但会增加 token 消耗。 | 一般保持默认。多轮对话可调大，单轮任务可调小。 |
| Citation | 设置回答中是否返回引用信息。当 Agent 使用知识库或检索结果生成回答时，可以启用来源引用，方便查看回答依据。 | 知识库问答场景建议启用。 |
| Max retries | Agent 执行失败后的最大重试次数。模型调用或工具调用失败时，系统会自动重试。 | 保持默认。网络不稳定时可调大。 |
| Delay after error | 每次重试前等待的秒数，用于避免短时间内连续请求导致再次失败。 | 一般保持默认。 |
| Exception handling method | 设置 Agent 执行中出现异常时的处理方式。不同选项决定出错后是继续执行、返回异常信息，还是采用其他处理策略。 | 根据业务需求选择。无特殊要求时保持默认。 |

`Output` 用于配置 Agent 节点的输出内容。

| 配置项 | 说明 |
| --- | --- |
| `content` | Agent 返回的自然语言文本，是默认输出。 |
| `structured` | Agent 返回的结构化数据。启用结构化输出后，可以按预定义的 JSON Schema 输出结果，便于后续节点读取和处理。 |

结构化输出：启用 **Structured output** 后，点击 **配置** 设置输出结构。你可以按 JSON Schema 定义返回的数据格式，例如指定字段名、数据类型和必填字段。Agent 会尽量按配置的结构返回结果，便于把数据传给 Code、HTTP Request、SQL、条件判断等节点做自动化处理。

![Agent 组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_component_4.jpg)

## Retrieval 组件

知识检索组件用于从指定的知识库或记忆中检索相关内容。它既可以作为普通的工作流组件使用，也可以作为 Agent 组件的工具使用。

配置步骤：

1. 点击知识检索组件。
2. 在 **Query variable** 中选择查询来源，`sys.query` 较为常用。
3. 在 **Retrieval source** 中选择一个或多个知识库，或选择 **Memory**。
4. 按需调整 **Similarity threshold**、**Keyword similarity weight** 和 **Top N**。
5. 需要跨语言检索时，选择 **Cross-language search** 语言。
6. 需要知识图谱多跳问答时，启用 **Use knowledge graph**。
7. 点击 **运行** 测试检索结果。

![知识检索组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/knowledge_retrieval_component_1.jpg)

![知识检索组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/knowledge_retrieval_component_2.jpg)

### 参数说明

**Similarity threshold** 用于过滤相关度低的分块。阈值越高，返回内容越严格，但可能遗漏有用信息。

**Keyword similarity weight** 用于控制向量相似度在整体相似度得分中的权重。多个知识库一起检索时，请确保它们使用相同的嵌入模型。

**Top N** 指定发送给后续组件的分块数量。分块过少可能导致信息不足，过多则可能增加响应时间和上下文压力。

启用 **Rerank model** 通常能改善知识检索结果的排序，但也会增加模型调用延迟。对速度敏感的 Agent，可以先不启用重排序。

`Similarity threshold` 用于过滤相关度低的分块。阈值越高，返回内容越严格，但可能遗漏有用信息。

### 配置建议

下表数值仅作为初始配置参考。实际效果受嵌入模型、文档质量、分块方法和业务问题影响，请结合知识检索测试结果调整。

检索参数直接影响回答的覆盖面、准确性和响应时间。可以先按下表设置起步，再根据真实问题优化。

| 参数 | 建议值 | 场景 | 说明 |
| --- | --- | --- | --- |
| Top N | 3-5 | FAQ 和短知识条目 | 答案明确时响应更快。 |
| Top N | 5-10 | 产品文档和帮助中心 | 默认推荐范围。 |
| Top N | 10-20 | 法律合同和长文档分析 | 上下文更多，token 消耗更高。 |
| Similarity threshold | 0.2 | 宽松召回 | 提问表达多样的场景。 |
| Similarity threshold | 0.5 | 一般问答 | 默认起始值。 |
| Similarity threshold | 0.8 | 严格精确匹配 | 需要精确匹配术语的场景。 |
