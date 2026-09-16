# 管理用户账号

## 查看与搜索用户

用户账号在 **User management** 页面中管理。管理员可以查看用户列表，包括 `Email`、`Nickname`、`Status`、`User type` 和 `Last login time`。

![用户管理](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/user_management_1.jpg)

![用户管理](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/user_management_2.jpg)

![用户管理](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/user_management_3.jpg)

使用右上角的搜索框，可以按 `Email` 或 `Nickname` 搜索用户；还可以按 `Status` 筛选 `Active` 或 `Inactive` 用户。

![查看与搜索用户](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/view_and_search_users_1.jpg)

![查看与搜索用户](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/view_and_search_users_2.jpg)

## 新建用户

要为新成员创建账号，请进入 **User management** 并点击 **New user**。在对话框中填写 `Email`、`Password` 和 `Confirm password`。

1. 进入 **User management** 页面。
2. 点击 **New user**。
3. 输入用户的 `Email`。
4. 输入初始密码。
5. 在 `Confirm password` 中再次输入相同密码。
6. 点击 **Confirm** 创建账号。

![新建用户](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_a_new_user_1.jpg)

![新建用户](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/create_a_new_user_2.jpg)

创建完成后，返回用户列表，确认该账号已出现且状态符合预期。然后通过安全渠道把登录信息发送给该用户。

**注意：** `Email` 必须使用有效的邮箱格式。启用邮箱验证后，用户必须先完成邮箱验证才能正常使用账号；未启用邮箱验证时，系统只校验邮箱格式。

新建用户时，密码与确认密码必须一致。当前新建用户表单的前端校验要求至少 6 个字符；重置密码则要求新密码至少 8 个字符。在生产环境中，请使用更强的统一密码策略。

## 禁用或恢复账号

用户列表中的 `Status` 字段控制账号能否登录系统。

| Status | 含义 |
| --- | --- |
| `Active` | 账号处于启用状态，可以正常登录并使用系统。 |
| `Inactive` | 账号已禁用。用户无法登录，但账号及相关数据会保留。 |

1. 进入 **User management** 页面，在用户列表中找到目标用户。
2. 在该用户所在行的 `Status` 列，点击当前状态下拉框，按需选择 `Active` 或 `Inactive`。

![禁用或恢复账号](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/disable_or_restore_accounts.jpg)

**注意：** 当前登录的管理员不能禁用自己的账号。禁用账号不会删除用户数据，只会让该用户无法登录。如果需要永久移除某个用户，请先确认不再需要保留该账号，再执行删除。

## 设置后台管理员身份

`User type` 区分 `Normal` 与 `Superuser`。`Normal` 是普通用户类型；`Superuser` 可以进入管理后台并执行系统级管理操作。

1. 在 **User management** 页面找到目标用户。
2. 打开 `User type` 列的选择器。
3. 选择 `Normal` 或 `Superuser`。
4. 等待系统提交变更并刷新用户列表。

![设置后台管理员身份](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/set_backend_administrator_identity.jpg)

**注意：** 当前登录的管理员不能在列表中修改自己的 `Superuser` 类型。

## 重置用户密码

当用户忘记密码，或必须强制其更换密码时，管理员可以通过用户列表中的 **Actions** 重置其他用户的密码。重置密码对话框打开后，页面会显示目标用户的 `Email`，并要求填写 `New password` 和 `Confirm new password`。

1. 在 **User management** 页面找到目标用户。将鼠标悬停在用户所在行以显示 **Actions**，然后点击重置密码按钮。
2. 确认对话框中的 `Email` 是目标用户。
3. 输入新密码并再次确认。
4. 点击 **Change password**。

![重置用户密码](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/reset_user_passwords_1.jpg)

![重置用户密码](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/reset_user_passwords_2.jpg)

**注意：** 当前登录的管理员不能通过列表中的 **Actions** 重置自己的密码。

## 删除用户

当用户不再需要访问系统且相关资源已交接完毕时，管理员可以通过用户列表中的 **Actions** 删除该用户。删除前，页面会弹出确认对话框，并显示待删除用户的 `Email`。

1. 在 **User management** 页面找到目标用户。将鼠标悬停在用户所在行以显示 **Actions**，然后点击删除按钮。
2. 在确认对话框中核对用户的 `Email`。
3. 点击 **Delete** 删除该用户。

![删除用户](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/delete_users.jpg)

**注意：** 当前登录的管理员不能通过列表中的 **Actions** 删除自己的账号。

删除用户是高风险操作。执行前，请确认该用户的相关数据、知识库、Agent、文件、API key 以及业务职责均已交接完毕。如果只是想暂时阻止登录，请先把账号状态改为 `Inactive`。

## 查看用户详情与资源影响

点击用户列表中 **Actions** 里的详情按钮，进入用户详情页。详情页会显示该用户的 `Email`、账号状态、`Last login time`、`Create time`、`Last update time`、`Language`、`Is anonymous` 和 `Is superuser`。

**注意：** 在禁用、删除或降级 `Superuser` 之前，管理员应先查看详情页，确认该用户是否仍持有重要资源或近期有登录活动。

![查看用户详情与资源影响](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/view_user_details_and_resource_impact.jpg)
