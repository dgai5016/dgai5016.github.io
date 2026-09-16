# 认识画布

## 添加组件
点击画布上任意组件旁边的加号即可选择下一个组件。常用组件包括：
`Begin`、`Agent`、`Retrieval`、`Message`、`Await response`、`Switch`、`Iteration`、`Categorize`、`Code`、`Text processing`、`Execute SQL`、`HTTP Request`，以及摄取管道相关组件：`Parser`、`Title chunker`、`Token chunker`、`Transformer`、`Indexer`。

添加组件后，点击组件本身即可打开右侧配置面板。配置面板中的各字段定义输入数据、处理逻辑、输出变量以及供后续步骤引用的内容。

![添加组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/add_component.jpg)

## 使用变量
Agent 画布上的组件支持变量引用，以实现组件间的数据传递。变量来源包括系统变量、在 Begin 组件中定义的全局变量，以及上游组件的输出。

在支持变量引用的输入框中，输入 `/` 或点击输入框旁的变量按钮即可打开变量选择器。

常用变量：
| 变量 | 说明 |
| ---- | ---- |
| `sys.query` | 当前用户输入的问题 |
| `formalized_content` | 来自 Retrieval、SQL 或工具组件的排序后文本结果 |
| `chunks` | 文档解析或分块组件输出的分块集合 |
| `content` | Agent、Code 或其他组件输出的主要文本 |

操作步骤：
1. 进入 Agent 页面并打开目标画布进行编辑。
2. 选择一个支持变量引用的组件，例如 Agent、Retrieval、Message、Code、HTTP Request、SQL。
3. 在右侧配置面板中，点击需要引用变量的输入框，如 System Prompt、User Prompt、Query 等。
4. 通过以下任一方式打开变量选择器：
   - 在输入框中输入 `/`
   - 点击输入框旁的变量图标（不同版本中可能显示为 `{}`、`+` 等图标）
5. 在选择器中选择所需变量。可用变量包括：
   - 系统变量，如 `sys.query`
   - 在 Begin 组件中定义的全局变量
   - 上游组件的输出变量
6. 选择后，变量会自动插入输入框。
7. 保存组件配置并运行 Agent，验证数据传递是否正常。

![使用变量](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/use_variables.jpg)
## 保存与运行
配置完成后，点击 **保存** 保存 Agent。调试时，点击画布顶部的 **运行**，输入测试问题并观察各组件的执行结果。如果某个组件没有输出，请检查输入变量、模型配置、知识库权限、外部接口地址或工具配置。

![保存并运行](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/save_and_run.jpg)
## 组件连线规则
连线定义组件的执行顺序。顺序组件沿单一路径运行；`Switch`、`Categorize` 等分支组件根据条件将工作流路由到不同出口；`Iteration` 以循环方式执行子流程。未连接到执行路径上的组件不会运行。删除组件前，请检查上游/下游连线及变量引用，避免后续节点缺少输入。

## 配置面板
点击画布上的任意组件即可打开右侧配置面板，其中展示字段、输入变量、输出变量和运行时参数。推荐的工作流程：确认组件读取哪个变量 → 配置处理逻辑 → 验证下游节点引用的输出是否正确。
