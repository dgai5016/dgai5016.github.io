<BiRow>
<template #en>

Joining a team does not automatically grant access to all resources in that team. The resource itself must be shared with the team or authorized to the user.

</template>
<template #zh>

加入团队并不会自动获得该团队中所有资源的访问权。资源本身必须共享给团队，或授权给该用户。

</template>
</BiRow>

<BiRow>
<template #en>

For knowledge bases, the **Permissions** field can be set to **Only me** or **Team**. The default value is **Only me**. When the value is changed to **Team**, joined team members can see and use the knowledge base according to permission rules.

</template>
<template #zh>

对知识库而言，**Permissions**（权限）字段可以设置为 **Only me**（仅自己）或 **Team**（团队），默认值为 **Only me**。改为 **Team** 后，已加入的团队成员可以按照权限规则查看和使用该知识库。

</template>
</BiRow>

<BiRow>
<template #en>

Knowledge base access follows these rules:

</template>
<template #zh>

知识库的访问遵循以下规则：

</template>
</BiRow>

<BiRow>
<template #en>

- If the current user belongs to the owner tenant, access is allowed.
- If the knowledge base permission is **Only me**, non-owners cannot access it.
- If the knowledge base permission is **Team** and the user belongs to the tenant, access is allowed.
- Deleting a knowledge base is stricter and generally requires the current user to be the creator.

</template>
<template #zh>

- 如果当前用户属于所有者租户，允许访问。
- 如果知识库权限为 **Only me**，非所有者无法访问。
- 如果知识库权限为 **Team** 且用户属于该租户，允许访问。
- 删除知识库的规则更严格，通常要求当前用户是创建者。

</template>
</BiRow>

<BiRow>
<template #en>

Agent sharing also uses **Only me** and **Team**. The permission field is located in the Agent settings dialog. The default value is **Only me**.

</template>
<template #zh>

Agent 共享同样使用 **Only me** 和 **Team**。权限字段位于 Agent 设置对话框中，默认值为 **Only me**。

</template>
</BiRow>

<BiRow>
<template #en>

Memory sharing is configured in the memory's advanced settings. **Only me** maps to `me`, and **Team** maps to `team`. The backend also defines an `all` value, but the UI exposes **Only me** and **Team**.

</template>
<template #zh>

记忆共享在记忆的高级设置中配置。**Only me** 对应 `me`，**Team** 对应 `team`。后端还定义了 `all` 值，但 UI 只暴露 **Only me** 和 **Team**。

</template>
</BiRow>
