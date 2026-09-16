<BiRow>
<template #en>

## Access Agent Page
After logging into RAGFlow, click **Agent** in the top navigation bar to enter the Agent page. Created Agents are displayed as cards. Click an existing card to continue editing; click the creation entry to create a new Agent.

</template>
<template #zh>

## 进入 Agent 页面
登录 RAGFlow 后，点击顶部导航栏的 **Agent** 进入 Agent 页面。已创建的 Agent 以卡片形式展示。点击已有卡片可继续编辑；点击创建入口可新建 Agent。

</template>
</BiRow>

<BiRow>
<template #en>

![Agent list](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_list.jpg)

</template>
<template #zh>

![Agent 列表](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_list.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Create from Template
RAGFlow provides Agent templates for different business scenarios. When creating from a template, the system presets common components and connections. Users only need to modify models, knowledge bases, prompts, interface addresses or output content.

</template>
<template #zh>

## 从模板创建
RAGFlow 为不同业务场景提供了 Agent 模板。从模板创建时，系统会预置常用组件和连线，用户只需修改模型、知识库、提示词、接口地址或输出内容。

</template>
</BiRow>

<BiRow>
<template #en>

![Agent template list](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_template_list.jpg)

</template>
<template #zh>

![Agent 模板列表](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/agent_template_list.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Steps:
1. Enter the Agent page.
2. Click **Create agent**.

</template>
<template #zh>

步骤：
1. 进入 Agent 页面。
2. 点击 **创建 Agent**。

</template>
</BiRow>

<BiRow>
<template #en>

![Create from a template entry](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_2.jpg)
3. Select an appropriate template on the template page, such as Deep Research, Knowledge Base Q&A, Data Analysis or E-commerce Customer Service template.

</template>
<template #zh>

![从模板创建入口](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_2.jpg)
3. 在模板页面选择合适的模板，例如深度研究（Deep Research）、知识库问答、数据分析或电商客服模板。

</template>
</BiRow>

<BiRow>
<template #en>

![Select an Agent template](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_3.jpg)
4. Enter the Agent name.
5. Click **OK**.

</template>
<template #zh>

![选择 Agent 模板](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_3.jpg)
4. 输入 Agent 名称。
5. 点击 **确定**。

</template>
</BiRow>

<BiRow>
<template #en>

![Create from a template settings](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_1.jpg)
6. After entering the canvas, check the configuration of each component and save.

</template>
<template #zh>

![从模板创建设置](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_1.jpg)
6. 进入画布后，检查各组件的配置并保存。

</template>
</BiRow>

<BiRow>
<template #en>

![Template Agent canvas](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_4.jpg)
## Create from Blank Agent
When creating a blank Agent, the canvas contains a default `Begin` component. Users can click the plus sign next to the Begin component or other components to add downstream components.

</template>
<template #zh>

![模板 Agent 画布](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_from_a_template_4.jpg)
## 从空白 Agent 创建
创建空白 Agent 时，画布中包含一个默认的 `Begin` 组件。用户可以点击 Begin 组件或其他组件旁边的加号，添加下游组件。

</template>
</BiRow>

<BiRow>
<template #en>

Steps:
1. Enter the Agent page.
2. Click **Create agent**.
3. Select blank creation.

</template>
<template #zh>

步骤：
1. 进入 Agent 页面。
2. 点击 **创建 Agent**。
3. 选择空白创建。

</template>
</BiRow>

<BiRow>
<template #en>

![Create from blank entry](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_1.jpg)
4. Enter the Agent name and select the agent type.

</template>
<template #zh>

![从空白创建入口](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_1.jpg)
4. 输入 Agent 名称并选择 Agent 类型。

</template>
</BiRow>

<BiRow>
<template #en>

![Create blank Agent settings](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_2.jpg)
5. Enter the canvas.
6. Click the plus sign next to the `Begin` component, and add components according to business processes.

</template>
<template #zh>

![创建空白 Agent 设置](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_2.jpg)
5. 进入画布。
6. 点击 `Begin` 组件旁边的加号，按业务流程添加组件。

</template>
</BiRow>

<BiRow>
<template #en>

![Add components to a blank Agent](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_3.jpg)
7. Configure each component.
8. Click **Save**.

</template>
<template #zh>

![为空白 Agent 添加组件](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_an_agent_from_blank_3.jpg)
7. 配置各组件。
8. 点击 **保存**。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
The `Begin` component is the start of the workflow. Each Agent can only have one Begin component and it cannot be deleted. After creation, configure Begin first, then configure subsequent components.
:::
## Search, Copy and Delete Agent
In the Agent list, you can search for target Agents by name. If copy, delete or other operation entries are available on the interface, confirm the Agent name and permission scope before operation. Deletion is usually irreversible. Please confirm whether the Agent is referenced by embedded web pages, API calls or other workflows.

</template>
<template #zh>

:::tip 注意
`Begin` 组件是工作流的起点。每个 Agent 只能有一个 Begin 组件，且不能删除。创建后请先配置 Begin，再配置后续组件。
:::
## 搜索、复制和删除 Agent
在 Agent 列表中，你可以按名称搜索目标 Agent。如果界面上提供复制、删除等操作入口，请在操作前确认 Agent 名称和权限范围。删除通常不可逆，请确认该 Agent 是否被嵌入的网页、API 调用或其他工作流引用。

</template>
</BiRow>

<BiRow>
<template #en>

## Save Agent
Click **Save** in time after editing the canvas. Saving only records the current configuration. Whether it immediately affects published or embedded Agents depends on the version publishing mechanism and deployment strategy. Re-run tests before external usage.

</template>
<template #zh>

## 保存 Agent
编辑画布后请及时点击 **保存**。保存仅记录当前配置，是否立即影响已发布或已嵌入的 Agent 取决于版本发布机制和部署策略。对外使用前请重新测试。

</template>
</BiRow>
