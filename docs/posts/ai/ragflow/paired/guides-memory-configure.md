<BiRow>
<template #en>

The configuration page is used to maintain a memory's basic information, model configuration, capacity configuration, and advanced settings. After making changes, click **Confirm** to save them, or click **Cancel** to discard unsaved content.

</template>
<template #zh>

配置页面用于维护记忆的基本信息、模型配置、容量配置和高级设置。修改后，点击 **Confirm** 保存，或点击 **Cancel** 放弃未保存的内容。

</template>
</BiRow>

<BiRow>
<template #en>

On the memory page, click the target memory **> Configurations** to view and update its settings.

</template>
<template #zh>

在记忆页面，点击目标记忆 **> Configurations**，即可查看并更新其设置。

</template>
</BiRow>

<BiRow>
<template #en>

### Basic Information

</template>
<template #zh>

### 基本信息

</template>
</BiRow>

<BiRow>
<template #en>

The name, avatar, and description are mainly used to distinguish memories. Fill them in according to the page prompts. The avatar image must not exceed 4 MB.

</template>
<template #zh>

名称、头像和描述主要用于区分不同的记忆，按页面提示填写即可。头像图片不得超过 4 MB。

</template>
</BiRow>

<BiRow>
<template #en>

The embedding model and large language model are the basic configuration for memory extraction and retrieval. The embedding model is used to convert memory content into vectors and supports subsequent similarity retrieval. The large language model is used to analyze conversation content and extract structured memories. After messages have already been written to a memory, frequent model changes are not recommended.

</template>
<template #zh>

嵌入模型和大语言模型是记忆提取与检索的基础配置。嵌入模型用于把记忆内容转换为向量，支持后续的相似度检索；大语言模型用于分析对话内容并提取结构化记忆。消息写入记忆后，不建议频繁更换模型。

</template>
</BiRow>

<BiRow>
<template #en>

### Memory Type

</template>
<template #zh>

### 记忆类型

</template>
</BiRow>

<BiRow>
<template #en>

Multiple memory types can be selected, but **Raw (`raw`)** is required and cannot be removed. When multiple types are selected, the system saves or extracts memories at different levels according to the selected types.

</template>
<template #zh>

可以选择多种记忆类型，其中 **Raw (`raw`)** 为必选项，不可移除。选中多种类型时，系统会根据所选类型在不同层级保存或提取记忆。

</template>
</BiRow>

<BiRow>
<template #en>

- **Raw (`raw`)**: Saves the original conversation content between the user and the Agent. It is suitable for scenarios where the complete context needs to be traced, and it is also the basis for extracting other types of memory.
- **Semantic (`semantic`)**: Extracts relatively stable facts, preferences, attributes, or background information, such as user preferences, customer profiles, and common requirements. It is suitable for long-term reuse.
- **Episodic (`episodic`)**: Extracts experience records with time, conversation, or event context, such as a communication, a task execution result, or a staged event. It is suitable for tracing historical processes.
- **Procedural (`procedural`)**: Extracts processes, steps, operating habits, or handling rules, such as fixed workflows and common handling methods. It is suitable for allowing Agents to reuse approaches in subsequent tasks.

</template>
<template #zh>

- **Raw (`raw`)**：保存用户与 Agent 之间的原始对话内容，适合需要追溯完整上下文的场景，也是提取其他类型记忆的基础。
- **Semantic (`semantic`)**：提取相对稳定的事实、偏好、属性或背景信息，如用户偏好、客户画像和常见需求，适合长期复用。
- **Episodic (`episodic`)**：提取带有时间、对话或事件语境的经历记录，如一次沟通、一次任务执行结果或一个阶段性事件，适合追溯历史过程。
- **Procedural (`procedural`)**：提取流程、步骤、操作习惯或处理规则，如固定工作流和常见处理方式，适合让 Agent 在后续任务中复用做法。

</template>
</BiRow>

<BiRow>
<template #en>

### Memory Size

</template>
<template #zh>

### 记忆大小

</template>
</BiRow>

<BiRow>
<template #en>

Memory size is used to limit the capacity that the memory can occupy. The value range is `(0, 5242880]` bytes. After the capacity reaches the upper limit, the system cleans up old content according to the forgetting policy.

</template>
<template #zh>

记忆大小用于限制记忆可占用的容量，取值范围为 `(0, 5242880]` 字节。容量达到上限后，系统会按照遗忘策略清理旧内容。

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

Advanced settings are used to control the memory's visibility scope, storage method, and extraction effect. If there are no special requirements, you can keep the default configuration.

</template>
<template #zh>

高级设置用于控制记忆的可见范围、存储方式和提取效果。如无特殊需求，保持默认配置即可。

</template>
</BiRow>

<BiRow>
<template #en>

- **Permissions**: Select **Only me** or **Team**. **Only me** means that only the current user can see the memory. **Team** means that team members can see and use the memory.
- **Storage type**: Currently, **Table (`table`)** can be selected. It is suitable for general messages, field queries, and regular retrieval.
- **Forgetting policy**: Currently, **First in, first out (FIFO)** can be selected. When the capacity reaches the upper limit, the system preferentially cleans up content written earlier.
- **Temperature**: The value range is `0-1`. It is used to control the randomness of memory extraction. A lower value makes the extraction result more stable, while a higher value makes the expression more divergent.
- **System prompt**: Used to define the role, output format, and structure constraints for memory extraction. Adjust it only when you need to unify the extraction format or strengthen extraction rules.
- **User prompt**: Used to supplement user-side extraction requirements. If there are no special requirements, it can be left empty.

</template>
<template #zh>

- **权限**：选择 **Only me** 或 **Team**。**Only me** 表示仅当前用户可见该记忆；**Team** 表示团队成员可以看到并使用该记忆。
- **存储类型**：目前可选择 **Table (`table`)**，适用于一般消息、字段查询和常规检索。
- **遗忘策略**：目前可选择 **First in, first out (FIFO)**（先进先出）。容量达到上限时，系统会优先清理较早写入的内容。
- **Temperature**：取值范围为 `0-1`，用于控制记忆提取的随机性。值越低，提取结果越稳定；值越高，表达越发散。
- **系统提示词**：用于定义记忆提取的角色、输出格式和结构约束。仅在需要统一提取格式或强化提取规则时调整。
- **用户提示词**：用于补充用户侧的提取需求，如无特殊要求可留空。

</template>
</BiRow>
