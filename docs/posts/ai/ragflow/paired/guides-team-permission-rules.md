<BiRow>
<template #en>

When a user performs an operation on a resource, RAGFlow evaluates permissions in the following order:

</template>
<template #zh>

当用户对资源执行操作时，RAGFlow 按以下顺序评估权限：

</template>
</BiRow>

<BiRow>
<template #en>

1. Whether the user has formally joined the team that owns the resource.
2. Whether the resource sharing scope allows team access.
3. Whether the user has knowledge base-level, resource-level, or collaborator-level **Read**, **Write**, or **Manage** permission.
4. Whether the target document has additional document-level **Read**, **Write**, or **Manage** permission requirements.
5. Whether the current operation is allowed by the permission table for that resource type.

</template>
<template #zh>

1. 用户是否已正式加入资源所属团队。
2. 资源共享范围是否允许团队访问。
3. 用户是否具有知识库级、资源级或协作者级的 **Read**（读）、**Write**（写）或 **Manage**（管理）权限。
4. 目标文档是否有额外的文档级 **Read**、**Write** 或 **Manage** 权限要求。
5. 当前操作是否为该资源类型的权限表所允许。

</template>
</BiRow>

<BiRow>
<template #en>

The resource owner always has all permissions. If a resource is set to **Only me**, only the owner can access it. If a resource is set to **Team**, only team members who meet the permission conditions can access it.

</template>
<template #zh>

资源所有者始终拥有全部权限。如果资源设置为 **Only me**（仅自己），只有所有者可以访问；如果设置为 **Team**（团队），只有满足权限条件的团队成员可以访问。

</template>
</BiRow>

<BiRow>
<template #en>

If finer-grained permissions exist, such as document-level permissions in a knowledge base, those permissions continue to apply on top of resource access permission.

</template>
<template #zh>

如果存在更细粒度的权限（例如知识库中的文档级权限），这些权限会在资源访问权限之上继续生效。

</template>
</BiRow>
