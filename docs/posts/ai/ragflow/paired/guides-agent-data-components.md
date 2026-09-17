<BiRow>
<template #en>

Prerequisite: The Code component depends on a secure sandbox environment. The deployment environment needs to install and enable gVisor, RAGFlow sandbox and related environment variables. Restart the service after dependency changes.

</template>
<template #zh>

前置条件：Code 组件依赖安全的沙箱环境。部署环境需要安装并启用 gVisor、RAGFlow sandbox 以及相关环境变量。依赖变更后需重启服务。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration:
1. **Input**: Define parameters passed into code; variables can be directly referenced inside scripts.
2. **Code**: Select Python or JavaScript and write business logic.
3. **Return Value**: Define output data returned to downstream components.

</template>
<template #zh>

配置：
1. **Input**：定义传入代码的参数，脚本内可以直接引用这些变量。
2. **Code**：选择 Python 或 JavaScript，编写业务逻辑。
3. **Return Value**：定义返回给下游组件的输出数据。

</template>
</BiRow>

<BiRow>
<template #en>

![Code Component](/ragflow-images/code_component.jpg)

</template>
<template #zh>

![Code 组件](/ragflow-images/code_component.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Text Processing Component
Text Processing splits or merges text. Used to split long upstream text by separators or combine multiple variables into one template.

</template>
<template #zh>

## Text Processing 组件
Text Processing 用于拆分或合并文本。可以按分隔符拆分上游的长文本，或把多个变量组合成一个模板。

</template>
</BiRow>

<BiRow>
<template #en>

Processing Modes:
- **Merge**: Concatenate content sequentially
- **Split**: Split text by specified delimiters (comma, line break, space etc.)

</template>
<template #zh>

处理模式：
- **Merge**：按顺序拼接内容
- **Split**：按指定的分隔符（逗号、换行符、空格等）拆分文本

</template>
</BiRow>

<BiRow>
<template #en>

Configure script content with variables inserted via `/`. Output results can be referenced by subsequent nodes.

</template>
<template #zh>

配置脚本内容，通过 `/` 插入变量。输出结果可供后续节点引用。

</template>
</BiRow>

<BiRow>
<template #en>

![Text Processing Component](/ragflow-images/text_processing_component.jpg)

</template>
<template #zh>

![Text Processing 组件](/ragflow-images/text_processing_component.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Data Operation Component
Data Operation processes structured objects returned by upstream tools, code or database nodes to clean data for downstream usage.

</template>
<template #zh>

## Data Operation 组件
Data Operation 用于处理上游工具、代码或数据库节点返回的结构化对象，清洗数据供下游使用。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration Steps:
1. Add and select the Data Operation component on canvas.
2. Select target data variables in Query variables.
3. Click `+` to add multiple input variables. Query variables are mandatory.
4. Select processing operation in Operations and fill corresponding configurations.
5. Save and run tests.

</template>
<template #zh>

配置步骤：
1. 在画布上添加并选中 Data Operation 组件。
2. 在 Query variables 中选择目标数据变量。
3. 点击 `+` 添加多个输入变量。Query variables 为必填项。
4. 在 Operations 中选择处理操作，并填写相应的配置。
5. 保存并运行测试。

</template>
</BiRow>

<BiRow>
<template #en>

![Data Operation Component](/ragflow-images/data_operation_component.jpg)

</template>
<template #zh>

![Data Operation 组件](/ragflow-images/data_operation_component.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Output: Processed data stored in variable `result`.

</template>
<template #zh>

输出：处理后的数据存入变量 `result`。

</template>
</BiRow>

<BiRow>
<template #en>

Supported Operations:
| Operation | Function | Scenario |
| ---- | ---- | ---- |
| Select keys | Keep only specified fields | Extract required fields for downstream nodes |
| Literal eval | Convert string-formatted list/dict/bool/number into actual data types | Parse serialized structured strings |
| Combine | Merge multiple objects into one | Aggregate outputs from multiple upstream nodes |
| Filter values | Filter data matching conditions | Filter array/object collections |
| Append or update | Add new fields or overwrite existing field values | Supplement or modify object attributes |
| Remove keys | Delete specified fields | Remove unnecessary sensitive or unused fields |
| Rename keys | Rename object field keys | Unify field naming standards |

</template>
<template #zh>

支持的操作：
| 操作 | 功能 | 场景 |
| ---- | ---- | ---- |
| Select keys | 只保留指定字段 | 为下游节点提取所需字段 |
| Literal eval | 把字符串形式的 list/dict/bool/number 转换为实际的数据类型 | 解析序列化的结构化字符串 |
| Combine | 把多个对象合并为一个 | 汇总多个上游节点的输出 |
| Filter values | 筛选符合条件的数据 | 过滤数组/对象集合 |
| Append or update | 新增字段或覆盖已有字段的值 | 补充或修改对象属性 |
| Remove keys | 删除指定字段 | 移除不必要的敏感或无用字段 |
| Rename keys | 重命名对象的字段键 | 统一字段命名规范 |

</template>
</BiRow>

<BiRow>
<template #en>

## Variable Assignor Component
Variable Assignor writes or updates variables during workflow execution. It can save upstream results to target variables and support overwrite, clear, append and arithmetic operations for numbers, arrays and objects.

</template>
<template #zh>

## Variable Assignor 组件
Variable Assignor 在工作流执行过程中写入或更新变量。它可以把上游结果保存到目标变量，并支持对数字、数组、对象执行覆盖、清空、追加和算术运算。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration Steps:
1. Click the **Variable Assigner** component and add a new variable rule under **Variables**.
2. Select the target variable to be updated.
3. Select an assignment operation, such as **Overwrite**, **Set**, **Append**, or **Add**.
4. If the selected operation requires a value, select a variable from the right panel or enter a fixed value.
5. To update multiple variables at once, continue adding variable rules. The system will execute them sequentially in the order they are added.

</template>
<template #zh>

配置步骤：
1. 点击 **Variable Assigner** 组件，在 **Variables** 下新增一条变量规则。
2. 选择要更新的目标变量。
3. 选择赋值操作，例如 **Overwrite**、**Set**、**Append** 或 **Add**。
4. 如果所选操作需要值，从右侧面板选择一个变量，或输入固定值。
5. 要一次更新多个变量，可继续添加变量规则。系统会按添加的顺序依次执行。

</template>
</BiRow>

<BiRow>
<template #en>

![Variable Assigner Component](/ragflow-images/variable_assigner_component.jpg)

</template>
<template #zh>

![Variable Assigner 组件](/ragflow-images/variable_assigner_component.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Parameter Description：

</template>
<template #zh>

参数说明：

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter | Type | Required | Description |
|---|---|---|---|
| Target Variable | Variable | Yes | Select the variable to be written or updated. Supports component output variables, system variables, environment variables, session variables, and other variable types. |
| Operation | Enum | Yes | Select the operation to be performed on the target variable. The system will automatically display available operations based on the variable type. |
| Value | Variable / Constant | Conditional | The value used for the operation. You can select another variable or enter a fixed value (depending on the supported operation type). Some operations do not require a value. |

</template>
<template #zh>

| 参数 | 类型 | 必填 | 说明 |
|---|---|---|---|
| Target Variable | Variable | 是 | 选择要写入或更新的变量。支持组件输出变量、系统变量、环境变量、会话变量等多种变量类型。 |
| Operation | Enum | 是 | 选择要对目标变量执行的操作。系统会根据变量类型自动显示可用的操作。 |
| Value | Variable / Constant | 视情况 | 操作所使用的值。可以选择另一个变量，或输入固定值（取决于支持的操作类型）。部分操作不需要值。 |

</template>
</BiRow>

<BiRow>
<template #en>

Supported Operations:
| Operation | Requires Value | Description |
| ---- | ---- | ---- |
| Overwritten by | Yes | Overwrite target variable with another variable's value |
| Set | Yes | Assign fixed constant value to target variable |
| Clear | No | Empty the target variable |

</template>
<template #zh>

支持的操作：
| 操作 | 需要值 | 说明 |
| ---- | ---- | ---- |
| Overwritten by | 是 | 用另一个变量的值覆盖目标变量 |
| Set | 是 | 为目标变量赋固定的常量值 |
| Clear | 否 | 清空目标变量 |

</template>
</BiRow>

<BiRow>
<template #en>

## List Operation Component
List Operation processes array data, supporting element extraction, head/tail fetching, filtering, sorting and deduplication. Suitable for array outputs from Begin, HTTP Request, Code and SQL.

</template>
<template #zh>

## List Operation 组件
List Operation 用于处理数组数据，支持元素提取、取头尾、筛选、排序和去重。适合处理 Begin、HTTP Request、Code 和 SQL 输出的数组。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration Steps：
1. Add the **List** component to the canvas and select it.
2. In the **Query variables** section of the right configuration panel, select the array variable to be processed. Click the dropdown menu and choose an array-type variable from the **Begin** node, upstream nodes, or session variables.
3. Select the list processing method in **Operations**.
4. configure the corresponding parameters based on the selected operation.
5. Enable **Strict mode** if required.
6. Save the configuration, then click **Run** on the page to test and view the execution results.
7. The processed result will be output through the component and can be referenced by subsequent nodes.

</template>
<template #zh>

配置步骤：
1. 在画布上添加 **List** 组件并选中。
2. 在右侧配置面板的 **Query variables** 中选择要处理的数组变量。点击下拉菜单，从 **Begin** 节点、上游节点或会话变量中选择数组类型的变量。
3. 在 **Operations** 中选择列表处理方式。
4. 根据所选操作配置相应参数。
5. 如有需要，启用 **Strict mode**。
6. 保存配置，然后点击页面上的 **运行** 测试并查看执行结果。
7. 处理结果会通过该组件输出，可供后续节点引用。

</template>
</BiRow>

<BiRow>
<template #en>

Parameter Description：
| Parameter | Required | Description |
|---|---|---|
| Query variables | Yes | Select the array variable to be processed. |
| Operations | Yes | Select the list processing operation. |
| Strict mode | No | When enabled, the system performs strict validation during processing and returns an error if an exception occurs. When disabled, the system processes according to the configured rules. |
| Operation Parameters | Conditional | Configure the corresponding parameters based on the selected operation, such as N, filter conditions, or sorting rules. |

</template>
<template #zh>

参数说明：
| 参数 | 必填 | 说明 |
|---|---|---|
| Query variables | 是 | 选择要处理的数组变量。 |
| Operations | 是 | 选择列表处理操作。 |
| Strict mode | 否 | 启用后，系统在处理过程中执行严格校验，出现异常即返回错误；未启用时，系统按配置的规则处理。 |
| Operation Parameters | 视情况 | 根据所选操作配置相应参数，例如 N、筛选条件或排序规则。 |

</template>
</BiRow>

<BiRow>
<template #en>

Supported Operations：
| Operation | Description | Use Case |
|---|---|---|
| Nth | Retrieves an element at a specified position from the list. | Get the Nth item from the list. |
| Head | Retrieves one or more elements from the beginning of the list. | Get the first N items from the list. |
| Tail | Retrieves one or more elements from the end of the list. | Get the last N items from the list. |
| Filter | Filters elements in the list based on conditions. | Keep data that meets the specified conditions. |
| Sort | Sorts the elements in the list. | Sort by specified fields or order. |
| Drop duplicates | Removes duplicate elements from the list. | Deduplicate the list data. |

</template>
<template #zh>

支持的操作：
| 操作 | 说明 | 用例 |
|---|---|---|
| Nth | 从列表中取出指定位置的元素。 | 获取列表中的第 N 项。 |
| Head | 从列表开头取出一个或多个元素。 | 获取列表前 N 项。 |
| Tail | 从列表末尾取出一个或多个元素。 | 获取列表后 N 项。 |
| Filter | 按条件筛选列表中的元素。 | 保留满足指定条件的数据。 |
| Sort | 对列表中的元素排序。 | 按指定字段或顺序排序。 |
| Drop duplicates | 移除列表中的重复元素。 | 对列表数据去重。 |

</template>
</BiRow>

<BiRow>
<template #en>

Operation Configuration Description：
| Operation | Description | Configuration |
|---|---|---|
| Nth | Retrieves an element at a specified position from the list. | Configure **N** to specify the element index (starting from 0). |
| Head | Retrieves elements from the beginning of the list. | Configure the return count **N** to return the first N elements. |
| Tail | Retrieves elements from the end of the list. | Configure the return count **N** to return the last N elements. |
| Filter | Filters list elements based on conditions. | Configure filter conditions and retain only elements that meet the requirements. |
| Sort | Sorts elements in the list. | Configure the sorting field and order (ascending or descending). |
| Drop duplicates | Removes duplicate elements from the list. | No additional configuration required. Returns the deduplicated list. |

</template>
<template #zh>

操作配置说明：
| 操作 | 说明 | 配置 |
|---|---|---|
| Nth | 从列表中取出指定位置的元素。 | 配置 **N** 指定元素索引（从 0 开始）。 |
| Head | 从列表开头取出元素。 | 配置返回数量 **N**，返回前 N 个元素。 |
| Tail | 从列表末尾取出元素。 | 配置返回数量 **N**，返回后 N 个元素。 |
| Filter | 按条件筛选列表元素。 | 配置筛选条件，只保留满足要求的元素。 |
| Sort | 对列表中的元素排序。 | 配置排序字段和顺序（升序或降序）。 |
| Drop duplicates | 移除列表中的重复元素。 | 无需额外配置，返回去重后的列表。 |

</template>
</BiRow>

<BiRow>
<template #en>

Strict Mode:
- Enabled: Return error when input data format is abnormal
- Disabled: Handle abnormal data with default tolerance

</template>
<template #zh>

严格模式：
- 启用：输入数据格式异常时返回错误
- 未启用：以默认的容错方式处理异常数据

</template>
</BiRow>

<BiRow>
<template #en>

## Variable Aggregator Component
Variable Aggregator combines multiple independent variables into one output group for unified reference by downstream nodes. Widely used in multi-branch conditional workflows to collect data from different branches.

</template>
<template #zh>

## Variable Aggregator 组件
Variable Aggregator 把多个独立变量合并为一个输出组，供下游节点统一引用。常用于多分支的条件工作流，收集来自不同分支的数据。

</template>
</BiRow>

<BiRow>
<template #en>

Configuration Steps：
1. Add the **Variable Aggregator** component to the canvas and select it.
2. In the **Variable Group** (default: **Group0**), click **Select value** and choose the variables to be aggregated.
3. Click **Add** to add additional variables to aggregate.
4. To create a new variable group, click the **+** icon. To delete a variable group, click the delete button.
5. Save the configuration, then click **Run** at the top of the page to test the execution result.
6. The aggregated variables will be output through the corresponding variable group name (for example, **Group0**) and can be referenced by subsequent nodes.

</template>
<template #zh>

配置步骤：
1. 在画布上添加 **Variable Aggregator** 组件并选中。
2. 在 **Variable Group**（默认为 **Group0**）中，点击 **Select value** 选择要聚合的变量。
3. 点击 **Add** 继续添加要聚合的变量。
4. 要新建变量组，点击 **+** 图标；要删除变量组，点击删除按钮。
5. 保存配置，然后点击页面顶部的 **运行** 测试执行结果。
6. 聚合后的变量会通过相应的变量组名（例如 **Group0**）输出，可供后续节点引用。

</template>
</BiRow>

<BiRow>
<template #en>

> **Note**
>
> A variable group can contain multiple variables. Multiple variable groups can also be created based on different business requirements for separate aggregation.

</template>
<template #zh>

> **注意**
>
> 一个变量组可以包含多个变量。也可以按不同的业务需求创建多个变量组，分别聚合。

</template>
</BiRow>

<BiRow>
<template #en>

Parameter Description：
| Parameter | Required | Description |
|---|---|---|
| Group | Yes | Variable group used to store variables to be aggregated. A default group **Group0** is created automatically, and additional variable groups can be added. |
| Select value | Yes | Select the variables to be aggregated. Supports system variables, **Begin** node inputs, session variables, or output variables from upstream nodes. |
| Add | No | Continue adding variables to the current variable group. |
| + | No | Create a new variable group. |
| Delete | No | Delete the current variable group. |

</template>
<template #zh>

参数说明：
| 参数 | 必填 | 说明 |
|---|---|---|
| Group | 是 | 用于存放待聚合变量的变量组。系统会自动创建默认组 **Group0**，也可以添加更多变量组。 |
| Select value | 是 | 选择要聚合的变量。支持系统变量、**Begin** 节点输入、会话变量或上游节点的输出变量。 |
| Add | 否 | 继续向当前变量组添加变量。 |
| + | 否 | 新建变量组。 |
| Delete | 否 | 删除当前变量组。 |

</template>
</BiRow>

<BiRow>
<template #en>

Output Result：
| Output | Description |
|---|---|
| Group0 (or other variable group name) | Outputs the variables after aggregation in the current variable group. The output can be directly referenced by subsequent nodes. |

</template>
<template #zh>

输出结果：
| 输出 | 说明 |
|---|---|
| Group0（或其他变量组名） | 输出当前变量组中聚合后的变量，可供后续节点直接引用。 |

</template>
</BiRow>

<BiRow>
<template #en>

Usage Instructions：
| Operation | Description |
|---|---|
| Add Variable | Select variables in **Select value**, then click **Add** to continue adding multiple variables. |
| Create Variable Group | Click the **+** icon to create a new variable group. |
| Delete Variable Group | Click the delete button for the variable group to remove the current group. |
| Reference Output | Subsequent nodes can directly reference the variable group (for example, **Group0**) as an input. |

</template>
<template #zh>

使用说明：
| 操作 | 说明 |
|---|---|
| 添加变量 | 在 **Select value** 中选择变量，然后点击 **Add** 继续添加多个变量。 |
| 新建变量组 | 点击 **+** 图标新建变量组。 |
| 删除变量组 | 点击变量组的删除按钮，移除当前组。 |
| 引用输出 | 后续节点可以直接引用变量组（例如 **Group0**）作为输入。 |

</template>
</BiRow>

<BiRow>
<template #en>

![Variable Aggregation Component](/ragflow-images/variable_aggregation_component.jpg)

</template>
<template #zh>

![变量聚合组件](/ragflow-images/variable_aggregation_component.jpg)

</template>
</BiRow>
