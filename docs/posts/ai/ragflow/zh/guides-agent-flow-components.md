# 流程组件

## Switch 组件
Switch 组件执行基于规则的判断，并根据判断结果将工作流路由到不同的下游路径。

### 配置方法
必须至少定义一个 Case。每个 Case 可以包含多个条件，条件之间用 AND / OR 组合。
支持的运算符：Equals、Not equal、Greater than、Greater equal、Less than、Less equal、Contains、Not contains、Starts with、Ends with、Is empty、Not empty。

:::tip 注意
Switch 面向结构化数据和条件明确的场景，执行基于规则的判断；Categorize 使用基于 LLM 的分类，适合自然语言的意图识别。
:::

![条件组件](/ragflow-images/condition_component.jpg)

### Iteration 组件
Iteration 组件会遍历一个数组，并对每个元素重复执行相同的处理逻辑。它适合批量处理文件，或用同一逻辑处理多条数据等场景。

#### 配置
配置 Iteration 组件时，需要设置 **Query variables** 和 **Output**。
- **Query variables**：指定要遍历的数组变量。可以选择上游组件的数组输出，也可以选择系统变量，例如 `sys.files` 或 `sys.history`。Iteration 组件按顺序处理数组中的每个元素，并执行配置好的内部工作流。
- **Internal workflow**：把需要重复执行的组件添加到 Iteration 区域内部。在每一轮迭代中，内部工作流处理当前的数组元素，直到数组中的所有元素都处理完毕。
- **Output**：定义每轮迭代返回的结果。你可以添加一个或多个输出字段，并选择 Iteration 内部组件生成的变量作为字段值。所有迭代完成后，组件会汇总这些结果，并提供给下游组件使用。

> **注意**
>
> 当输入是一个数组，且每个元素都可以独立处理时，适合使用 Iteration 组件。例如，选择 `sys.files` 后，就可以逐一处理用户上传的多个文件。

## Loop 组件
Iteration 会把文本拆分成片段，并对每个片段执行同一组内部组件。适合长文本翻译、分段摘要、批量生成以及逐条处理列表等场景。

### 内部工作流：
Iteration 内置 `Loop Item`。拖入 Iteration 内部的组件只能在循环内部被访问到。引用 `Loop Item` 可以获取当前片段的数据。

![Loop 组件](/ragflow-images/loop_component.jpg)

### 配置方法
###### **配置**
配置 Loop 组件时，需要设置循环变量、循环终止条件和最大循环次数。
- **Loop variables**：定义循环过程中使用的变量。需要设置变量名、类型和初始值。循环内的其他组件可以读取或更新这些变量。
- **Loop termination condition**：定义退出循环的条件。条件满足时，Loop 停止；否则进入下一轮迭代。
- **Maximum loop count**：限制循环的最大迭代次数，防止终止条件始终无法满足导致死循环。达到最大循环次数后，Loop 会自动停止。

:::tip 注意
请同时配置终止条件和最大循环次数，避免工作流长时间陷入死循环。
:::

## Categorize 组件
Categorize 利用 LLM 判断用户意图或输入类别，并根据分类结果让工作流进入不同分支。

### 配置方法
1. 在 Query variable / Input 中选择要分类的内容。
2. 选择模型和 Creativity。
3. 配置消息窗口大小（单轮分类保持默认即可）。
4. 添加至少两个分类。
5. 为每个分类填写清晰的 Name、Description 和 Examples。
6. 在画布上为每个分类结果连接下游组件。

### 分类建议
使用易于理解的分类名称，例如产品咨询、安装预约、售后故障、其他问题。
示例能提升分类的稳定性；请为每个分类提供 2~3 条典型样本。

![问题分类组件](/ragflow-images/question_classification_component.jpg)
