<BiRow>
<template #en>

The message page is used to view messages written to memory and control whether messages participate in subsequent retrieval. The left side provides **Messages** and **Configurations** entries, and the right side displays the message list, search, and filters.

</template>
<template #zh>

消息页面用于查看写入记忆的消息，并控制这些消息是否参与后续检索。页面左侧提供**消息**和**配置**入口，右侧展示消息列表、搜索和筛选功能。

</template>
</BiRow>

<BiRow>
<template #en>

Memory extraction uses the prompts and temperature in **Advanced Settings** on the configuration page. If the extraction result does not meet expectations, check these configurations first.

</template>
<template #zh>

记忆提取使用配置页面**高级设置**中的提示词和 temperature。如果提取结果不符合预期，请先检查这些配置。

</template>
</BiRow>

<BiRow>
<template #en>

Users can search messages in the current memory's message list, or narrow the search scope through conditional filters.

</template>
<template #zh>

用户可以在当前记忆的消息列表中搜索消息，也可以通过条件筛选缩小搜索范围。

</template>
</BiRow>

<BiRow>
<template #en>

The message list displays information such as sessions, source Agents, message types, valid time, forgotten status, and enabled status, and provides corresponding operation entries.

</template>
<template #zh>

消息列表展示会话、来源 Agent、消息类型、有效时间、遗忘状态和启用状态等信息，并提供相应的操作入口。

</template>
</BiRow>

<BiRow>
<template #en>

### Message Fields

</template>
<template #zh>

### 消息字段

</template>
</BiRow>

<BiRow>
<template #en>

| Field | Description |
| --- | --- |
| Session ID | The session that the message belongs to. Multiple messages generated in the same session usually have the same session ID. |
| Agent | The name of the Agent that wrote the message, such as `customer` or `deep search`. |
| Type | The message type or extracted memory type. In the current example, this is displayed as **Raw**. |
| Valid date | The valid time of this memory, that is, the effective time. |
| Forgotten at | The time when this message was forgotten. If it has not been forgotten, this is usually displayed as **None** or left empty. |
| Enabled | Controls whether this message participates in subsequent retrieval. After it is disabled, the message is still retained, but it no longer affects Agent retrieval results. |
| Operation | Used to view, copy, view logs, or forget messages. The specific buttons depend on the current permissions and message status. |

</template>
<template #zh>

| 字段 | 说明 |
| --- | --- |
| 会话 ID | 消息所属的会话。同一会话中生成的多条消息通常具有相同的会话 ID。 |
| Agent | 写入该消息的 Agent 名称，如 `customer` 或 `deep search`。 |
| 类型 | 消息类型或提取出的记忆类型。在当前示例中显示为 **Raw**。 |
| 有效日期 | 该条记忆的有效时间，即生效时间。 |
| 遗忘时间 | 该消息被遗忘的时间。如果尚未遗忘，通常显示为 **None** 或留空。 |
| 启用 | 控制该消息是否参与后续检索。禁用后消息仍会保留，但不再影响 Agent 的检索结果。 |
| 操作 | 用于查看、复制、查看日志或遗忘消息。具体按钮取决于当前权限和消息状态。 |

</template>
</BiRow>

<BiRow>
<template #en>

![Message page](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/message_page.jpg)

</template>
<template #zh>

![消息页面](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/message_page.jpg)

</template>
</BiRow>
