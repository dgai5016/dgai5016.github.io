<BiRow>
<template #en>

The **Team members** list displays members in the current workspace. The owner is not included in the ordinary member list returned by the backend member query.

</template>
<template #zh>

**Team members**（团队成员）列表显示当前工作区的成员。后端成员查询返回的普通成员列表不包含所有者。

</template>
</BiRow>

<BiRow>
<template #en>

The list contains the following fields:

</template>
<template #zh>

该列表包含以下字段：

</template>
</BiRow>

<BiRow>
<template #en>

| Field | Description |
| --- | --- |
| Name | The member's nickname. |
| Update date | The time when the membership record was last updated. |
| Email | The member's email address. |
| Role | The member's team role. `normal` is displayed as **Member**, `invite` is displayed as **Invite**, and `owner` is displayed as **Owner**. |
| Action | Operations available for the current member, such as removing a member when permitted. |

</template>
<template #zh>

| 字段 | 说明 |
| --- | --- |
| Name（名称） | 成员的昵称。 |
| Update date（更新日期） | 成员关系记录最近一次更新的时间。 |
| Email（邮箱） | 成员的电子邮箱地址。 |
| Role（角色） | 成员的团队角色。`normal` 显示为 **Member**，`invite` 显示为 **Invite**，`owner` 显示为 **Owner**。 |
| Action（操作） | 当前成员可用的操作，例如在允许时移除成员。 |

</template>
</BiRow>

<BiRow>
<template #en>

You can search members by nickname or email address, and sort members by **Update date**.

</template>
<template #zh>

你可以按昵称或邮箱地址搜索成员，并按 **Update date** 排序。

</template>
</BiRow>

<BiRow>
<template #en>

Only the workspace owner can query and manage the full member list for the workspace.

</template>
<template #zh>

只有工作区所有者才能查询和管理该工作区的完整成员列表。

</template>
</BiRow>

<BiRow>
<template #en>

![View Current Workspace Members](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/view_current_workspace_members.jpg)

</template>
<template #zh>

![查看当前工作区成员](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/view_current_workspace_members.jpg)

</template>
</BiRow>
