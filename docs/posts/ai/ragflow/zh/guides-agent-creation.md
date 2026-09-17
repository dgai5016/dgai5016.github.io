# 创建与管理

## 进入 Agent 页面
登录 RAGFlow 后，点击顶部导航栏的 **Agent** 进入 Agent 页面。已创建的 Agent 以卡片形式展示。点击已有卡片可继续编辑；点击创建入口可新建 Agent。

![Agent 列表](/ragflow-images/agent_list.jpg)

## 从模板创建
RAGFlow 为不同业务场景提供了 Agent 模板。从模板创建时，系统会预置常用组件和连线，用户只需修改模型、知识库、提示词、接口地址或输出内容。

![Agent 模板列表](/ragflow-images/agent_template_list.jpg)

步骤：
1. 进入 Agent 页面。
2. 点击 **创建 Agent**。

![从模板创建入口](/ragflow-images/create_from_a_template_2.jpg)
3. 在模板页面选择合适的模板，例如深度研究（Deep Research）、知识库问答、数据分析或电商客服模板。

![选择 Agent 模板](/ragflow-images/create_from_a_template_3.jpg)
4. 输入 Agent 名称。
5. 点击 **确定**。

![从模板创建设置](/ragflow-images/create_from_a_template_1.jpg)
6. 进入画布后，检查各组件的配置并保存。

![模板 Agent 画布](/ragflow-images/create_from_a_template_4.jpg)
## 从空白 Agent 创建
创建空白 Agent 时，画布中包含一个默认的 `Begin` 组件。用户可以点击 Begin 组件或其他组件旁边的加号，添加下游组件。

步骤：
1. 进入 Agent 页面。
2. 点击 **创建 Agent**。
3. 选择空白创建。

![从空白创建入口](/ragflow-images/create_an_agent_from_blank_1.jpg)
4. 输入 Agent 名称并选择 Agent 类型。

![创建空白 Agent 设置](/ragflow-images/create_an_agent_from_blank_2.jpg)
5. 进入画布。
6. 点击 `Begin` 组件旁边的加号，按业务流程添加组件。

![为空白 Agent 添加组件](/ragflow-images/create_an_agent_from_blank_3.jpg)
7. 配置各组件。
8. 点击 **保存**。

:::tip 注意
`Begin` 组件是工作流的起点。每个 Agent 只能有一个 Begin 组件，且不能删除。创建后请先配置 Begin，再配置后续组件。
:::
## 搜索、复制和删除 Agent
在 Agent 列表中，你可以按名称搜索目标 Agent。如果界面上提供复制、删除等操作入口，请在操作前确认 Agent 名称和权限范围。删除通常不可逆，请确认该 Agent 是否被嵌入的网页、API 调用或其他工作流引用。

## 保存 Agent
编辑画布后请及时点击 **保存**。保存仅记录当前配置，是否立即影响已发布或已嵌入的 Agent 取决于版本发布机制和部署策略。对外使用前请重新测试。
