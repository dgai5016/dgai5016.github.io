<BiRow>
<template #en>

Team membership and resource permissions are separate concepts.

</template>
<template #zh>

团队成员关系与资源权限是两个独立的概念。

</template>
</BiRow>

<BiRow>
<template #en>

A user may be a member of a team, but that does not mean the user can access every resource in the team. A resource must also be shared with the team or explicitly authorized to the user through collaborator permissions.

</template>
<template #zh>

用户可能是某个团队的成员，但这并不意味着该用户就能访问团队中的所有资源。资源还必须共享给团队，或通过协作者权限显式授权给该用户。

</template>
</BiRow>

<BiRow>
<template #en>

For common resource sharing scopes:

</template>
<template #zh>

常见的资源共享范围如下：

</template>
</BiRow>

<BiRow>
<template #en>

| Sharing scope | Description |
| --- | --- |
| Only me / me | Only the owner can access the resource. |
| Team / team | Users who have joined the team may access the resource if the resource-level permission rules allow it. |

</template>
<template #zh>

| 共享范围 | 说明 |
| --- | --- |
| Only me / me（仅自己） | 只有资源所有者可以访问该资源。 |
| Team / team（团队） | 如果资源级权限规则允许，已加入团队的用户可以访问该资源。 |

</template>
</BiRow>

<BiRow>
<template #en>

When a team owner invites a user, the relationship is first created with the `invite` role. After the invited user accepts the invitation, the role changes to `normal`.

</template>
<template #zh>

团队所有者邀请用户时，该关系首先以 `invite` 角色创建。被邀请的用户接受邀请后，角色会变更为 `normal`。

</template>
</BiRow>
