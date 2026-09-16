<BiRow>
<template #en>

Each user has a personal workspace. The team page of that workspace is displayed with the current user's nickname and **workspace** as its title.

</template>
<template #zh>

每个用户都有一个个人工作区。该工作区的团队页面以当前用户的昵称加 **workspace**（工作区）作为标题。

</template>
</BiRow>

<BiRow>
<template #en>

The team page contains two main areas:

</template>
<template #zh>

团队页面包含两个主要区域：

</template>
</BiRow>

<BiRow>
<template #en>

- **Team members**: Members in the current workspace.
- **Joined teams**: Other workspaces that the current user has joined or has been invited to join.

</template>
<template #zh>

- **Team members**（团队成员）：当前工作区中的成员。
- **Joined teams**（已加入的团队）：当前用户已加入或被邀请加入的其他工作区。

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow uses the `user_tenant` relationship to record team membership. Common role values include:

</template>
<template #zh>

RAGFlow 使用 `user_tenant` 关系记录团队成员关系。常见的角色值包括：

</template>
</BiRow>

<BiRow>
<template #en>

| Role | Description |
| --- | --- |
| owner | The owner of the workspace. The owner can invite members and remove members. |
| normal | A user who has accepted an invitation and joined the workspace. |
| invite | A user who has been invited but has not accepted the invitation. |
| admin | A backend role value used by the system. |

</template>
<template #zh>

| 角色 | 说明 |
| --- | --- |
| owner | 工作区所有者。可以邀请成员和移除成员。 |
| normal | 已接受邀请并加入工作区的用户。 |
| invite | 已被邀请但尚未接受邀请的用户。 |
| admin | 系统使用的后台角色值。 |

</template>
</BiRow>

<BiRow>
<template #en>

The team role is different from the Enterprise role management feature. Team roles define whether a user belongs to a workspace and what team-level actions the user can perform. Enterprise roles define action permissions for administrative resources.

</template>
<template #zh>

团队角色不同于企业版的角色管理功能。团队角色定义用户是否属于某个工作区，以及用户可以执行哪些团队级操作；企业角色定义的是管理资源的操作权限。

</template>
</BiRow>
