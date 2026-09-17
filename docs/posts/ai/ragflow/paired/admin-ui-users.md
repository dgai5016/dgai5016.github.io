<BiRow>
<template #en>

## View and Search Users

</template>
<template #zh>

## 查看与搜索用户

</template>
</BiRow>

<BiRow>
<template #en>

User accounts are managed on the **User management** page. Administrators can view the user list, including `Email`, `Nickname`, `Status`, `User type`, and `Last login time`.

</template>
<template #zh>

用户账号在 **User management** 页面中管理。管理员可以查看用户列表，包括 `Email`、`Nickname`、`Status`、`User type` 和 `Last login time`。

</template>
</BiRow>

<BiRow>
<template #en>

![User Management](/ragflow-images/user_management_1.jpg)

</template>
<template #zh>

![用户管理](/ragflow-images/user_management_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![User Management](/ragflow-images/user_management_2.jpg)

</template>
<template #zh>

![用户管理](/ragflow-images/user_management_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![User Management](/ragflow-images/user_management_3.jpg)

</template>
<template #zh>

![用户管理](/ragflow-images/user_management_3.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

Use the search box in the upper-right corner to search users by `Email` or `Nickname`. You can also filter `Active` or `Inactive` users by `Status`.

</template>
<template #zh>

使用右上角的搜索框，可以按 `Email` 或 `Nickname` 搜索用户；还可以按 `Status` 筛选 `Active` 或 `Inactive` 用户。

</template>
</BiRow>

<BiRow>
<template #en>

![View And Search Users](/ragflow-images/view_and_search_users_1.jpg)

</template>
<template #zh>

![查看与搜索用户](/ragflow-images/view_and_search_users_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![View And Search Users](/ragflow-images/view_and_search_users_2.jpg)

</template>
<template #zh>

![查看与搜索用户](/ragflow-images/view_and_search_users_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

## Create a New User

</template>
<template #zh>

## 新建用户

</template>
</BiRow>

<BiRow>
<template #en>

To create an account for a new member, go to **User management** and click **New user**. In the dialog, fill in `Email`, `Password`, and `Confirm password`.

</template>
<template #zh>

要为新成员创建账号，请进入 **User management** 并点击 **New user**。在对话框中填写 `Email`、`Password` 和 `Confirm password`。

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to the **User management** page.
2. Click **New user**.
3. Enter the user's `Email`.
4. Enter the initial password.
5. Enter the same password again in `Confirm password`.
6. Click **Confirm** to create the account.

</template>
<template #zh>

1. 进入 **User management** 页面。
2. 点击 **New user**。
3. 输入用户的 `Email`。
4. 输入初始密码。
5. 在 `Confirm password` 中再次输入相同密码。
6. 点击 **Confirm** 创建账号。

</template>
</BiRow>

<BiRow>
<template #en>

![Create A New User](/ragflow-images/create_a_new_user_1.jpg)

</template>
<template #zh>

![新建用户](/ragflow-images/create_a_new_user_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Create A New User](/ragflow-images/create_a_new_user_2.jpg)

</template>
<template #zh>

![新建用户](/ragflow-images/create_a_new_user_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

After creation, return to the user list and confirm that the account appears and that its status matches expectations. Then send the login information to the user through a secure channel.

</template>
<template #zh>

创建完成后，返回用户列表，确认该账号已出现且状态符合预期。然后通过安全渠道把登录信息发送给该用户。

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** `Email` must use a valid email format. After email verification is enabled, users must complete email verification before they can use the account normally. If email verification is not enabled, the system only validates the email format.

</template>
<template #zh>

**注意：** `Email` 必须使用有效的邮箱格式。启用邮箱验证后，用户必须先完成邮箱验证才能正常使用账号；未启用邮箱验证时，系统只校验邮箱格式。

</template>
</BiRow>

<BiRow>
<template #en>

When creating a new user, the password and confirmation password must match. The frontend validation for the current create-user form requires at least 6 characters. Password reset requires a new password of at least 8 characters. In production environments, use a stronger unified password policy.

</template>
<template #zh>

新建用户时，密码与确认密码必须一致。当前新建用户表单的前端校验要求至少 6 个字符；重置密码则要求新密码至少 8 个字符。在生产环境中，请使用更强的统一密码策略。

</template>
</BiRow>

<BiRow>
<template #en>

## Disable or Restore an Account

</template>
<template #zh>

## 禁用或恢复账号

</template>
</BiRow>

<BiRow>
<template #en>

The `Status` field in the user list controls whether an account can log in to the system.

</template>
<template #zh>

用户列表中的 `Status` 字段控制账号能否登录系统。

</template>
</BiRow>

<BiRow>
<template #en>

| Status | Meaning |
| --- | --- |
| `Active` | The account is enabled and can log in and use the system normally. |
| `Inactive` | The account is disabled. The user cannot log in, but the account and related data are retained. |

</template>
<template #zh>

| Status | 含义 |
| --- | --- |
| `Active` | 账号处于启用状态，可以正常登录并使用系统。 |
| `Inactive` | 账号已禁用。用户无法登录，但账号及相关数据会保留。 |

</template>
</BiRow>

<BiRow>
<template #en>

1. Go to the **User management** page and find the target user in the user list.
2. In the `Status` column of that user's row, click the current status dropdown and select `Active` or `Inactive` as needed.

</template>
<template #zh>

1. 进入 **User management** 页面，在用户列表中找到目标用户。
2. 在该用户所在行的 `Status` 列，点击当前状态下拉框，按需选择 `Active` 或 `Inactive`。

</template>
</BiRow>

<BiRow>
<template #en>

![Disable Or Restore Accounts](/ragflow-images/disable_or_restore_accounts.jpg)

</template>
<template #zh>

![禁用或恢复账号](/ragflow-images/disable_or_restore_accounts.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** The currently logged-in administrator cannot disable their own account. Disabling an account does not delete user data; it only prevents the user from logging in. If you need to permanently remove a user, confirm that the account no longer needs to be retained before deleting it.

</template>
<template #zh>

**注意：** 当前登录的管理员不能禁用自己的账号。禁用账号不会删除用户数据，只会让该用户无法登录。如果需要永久移除某个用户，请先确认不再需要保留该账号，再执行删除。

</template>
</BiRow>

<BiRow>
<template #en>

## Set Backend Administrator Identity

</template>
<template #zh>

## 设置后台管理员身份

</template>
</BiRow>

<BiRow>
<template #en>

`User type` distinguishes `Normal` from `Superuser`. `Normal` is a regular user type. `Superuser` can enter the Admin UI and perform system-level management operations.

</template>
<template #zh>

`User type` 区分 `Normal` 与 `Superuser`。`Normal` 是普通用户类型；`Superuser` 可以进入管理后台并执行系统级管理操作。

</template>
</BiRow>

<BiRow>
<template #en>

1. Find the target user on the **User management** page.
2. Open the selector in the `User type` column.
3. Select `Normal` or `Superuser`.
4. Wait for the system to submit the change and refresh the user list.

</template>
<template #zh>

1. 在 **User management** 页面找到目标用户。
2. 打开 `User type` 列的选择器。
3. 选择 `Normal` 或 `Superuser`。
4. 等待系统提交变更并刷新用户列表。

</template>
</BiRow>

<BiRow>
<template #en>

![Set Backend Administrator Identity](/ragflow-images/set_backend_administrator_identity.jpg)

</template>
<template #zh>

![设置后台管理员身份](/ragflow-images/set_backend_administrator_identity.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** The currently logged-in administrator cannot modify their own `Superuser` type in the list.

</template>
<template #zh>

**注意：** 当前登录的管理员不能在列表中修改自己的 `Superuser` 类型。

</template>
</BiRow>

<BiRow>
<template #en>

## Reset User Passwords

</template>
<template #zh>

## 重置用户密码

</template>
</BiRow>

<BiRow>
<template #en>

When a user forgets their password or must be forced to change it, administrators can reset another user's password from **Actions** in the user list. After the reset-password dialog opens, the page displays the target user's `Email` and requires `New password` and `Confirm new password`.

</template>
<template #zh>

当用户忘记密码，或必须强制其更换密码时，管理员可以通过用户列表中的 **Actions** 重置其他用户的密码。重置密码对话框打开后，页面会显示目标用户的 `Email`，并要求填写 `New password` 和 `Confirm new password`。

</template>
</BiRow>

<BiRow>
<template #en>

1. Find the target user on the **User management** page. Hover over the user row to display **Actions**, then click the reset-password button.
2. Confirm that the `Email` in the dialog is the target user.
3. Enter the new password and confirm it again.
4. Click **Change password**.

</template>
<template #zh>

1. 在 **User management** 页面找到目标用户。将鼠标悬停在用户所在行以显示 **Actions**，然后点击重置密码按钮。
2. 确认对话框中的 `Email` 是目标用户。
3. 输入新密码并再次确认。
4. 点击 **Change password**。

</template>
</BiRow>

<BiRow>
<template #en>

![Reset User Passwords](/ragflow-images/reset_user_passwords_1.jpg)

</template>
<template #zh>

![重置用户密码](/ragflow-images/reset_user_passwords_1.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

![Reset User Passwords](/ragflow-images/reset_user_passwords_2.jpg)

</template>
<template #zh>

![重置用户密码](/ragflow-images/reset_user_passwords_2.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** The currently logged-in administrator cannot reset their own password through list **Actions**.

</template>
<template #zh>

**注意：** 当前登录的管理员不能通过列表中的 **Actions** 重置自己的密码。

</template>
</BiRow>

<BiRow>
<template #en>

## Delete Users

</template>
<template #zh>

## 删除用户

</template>
</BiRow>

<BiRow>
<template #en>

When a user no longer needs system access and related resources have been handed over, administrators can delete the user from **Actions** in the user list. Before deletion, the page displays a confirmation dialog and shows the `Email` of the user to be deleted.

</template>
<template #zh>

当用户不再需要访问系统且相关资源已交接完毕时，管理员可以通过用户列表中的 **Actions** 删除该用户。删除前，页面会弹出确认对话框，并显示待删除用户的 `Email`。

</template>
</BiRow>

<BiRow>
<template #en>

1. Find the target user on the **User management** page. Hover over the user row to display **Actions**, then click the delete button.
2. Check the user's `Email` in the confirmation dialog.
3. Click **Delete** to delete the user.

</template>
<template #zh>

1. 在 **User management** 页面找到目标用户。将鼠标悬停在用户所在行以显示 **Actions**，然后点击删除按钮。
2. 在确认对话框中核对用户的 `Email`。
3. 点击 **Delete** 删除该用户。

</template>
</BiRow>

<BiRow>
<template #en>

![Delete Users](/ragflow-images/delete_users.jpg)

</template>
<template #zh>

![删除用户](/ragflow-images/delete_users.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** The currently logged-in administrator cannot delete their own account through list **Actions**.

</template>
<template #zh>

**注意：** 当前登录的管理员不能通过列表中的 **Actions** 删除自己的账号。

</template>
</BiRow>

<BiRow>
<template #en>

Deleting a user is a high-risk operation. Before doing it, confirm whether the user's related data, knowledge bases, Agents, files, API keys, and business responsibilities have been handed over. If you only need to temporarily prevent login, change the account status to `Inactive` first.

</template>
<template #zh>

删除用户是高风险操作。执行前，请确认该用户的相关数据、知识库、Agent、文件、API key 以及业务职责均已交接完毕。如果只是想暂时阻止登录，请先把账号状态改为 `Inactive`。

</template>
</BiRow>

<BiRow>
<template #en>

## View User Details and Resource Impact

</template>
<template #zh>

## 查看用户详情与资源影响

</template>
</BiRow>

<BiRow>
<template #en>

Click the detail button in **Actions** on the user list to enter the user detail page. The detail page displays the user's `Email`, account status, `Last login time`, `Create time`, `Last update time`, `Language`, `Is anonymous`, and `Is superuser`.

</template>
<template #zh>

点击用户列表中 **Actions** 里的详情按钮，进入用户详情页。详情页会显示该用户的 `Email`、账号状态、`Last login time`、`Create time`、`Last update time`、`Language`、`Is anonymous` 和 `Is superuser`。

</template>
</BiRow>

<BiRow>
<template #en>

**Caution:** Before disabling, deleting, or downgrading `Superuser`, administrators should check the detail page to confirm whether the user still has important resources or recent login activity.

</template>
<template #zh>

**注意：** 在禁用、删除或降级 `Superuser` 之前，管理员应先查看详情页，确认该用户是否仍持有重要资源或近期有登录活动。

</template>
</BiRow>

<BiRow>
<template #en>

![View User Details And Resource Impact](/ragflow-images/view_user_details_and_resource_impact.jpg)

</template>
<template #zh>

![查看用户详情与资源影响](/ragflow-images/view_user_details_and_resource_impact.jpg)

</template>
</BiRow>
