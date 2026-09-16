# 开始之前

## 访问管理后台

系统管理员可以在浏览器中访问 RAGFlow 管理后台（Admin UI）。当前管理后台的入口是 `/admin`，例如 `http://192.168.1.5/admin`。

进入管理后台后，管理员可以执行服务健康检查、维护用户账户、配置沙箱、控制注册、管理角色与权限、配置系统设置以及配置身份提供者。管理后台应仅暴露给受信任的管理员。

![进入管理控制台](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/enter_the_admin_console.jpg)

普通用户在使用知识库、对话、Agent、文件和模型提供商等业务功能时，无需进入管理后台。

## 初始管理员账户

首次部署后，你可以使用默认管理员账户 `admin@ragflow.io` 登录。该账户的密码在管理服务器启动且系统中尚无超级用户时确定：

- 如果设置了 `ADMIN_DEFAULT_PASSWORD` 环境变量（或 `DEFAULT_SUPERUSER_PASSWORD`——该变量与 Web 服务引导流程共用），则使用该值。
- 否则，系统会生成一个随机密码，并**一次性**写入 `logs/admin_bootstrap_password.txt`（权限 0600；Docker 部署时请查看 `docker/ragflow-logs` 卷）——从该文件中取出密码，登录后立即修改。

该账户用于初始化系统并创建后续的管理员账户，不建议作为长期共用的日常运维账户。

首次登录后，请尽快重置默认密码，并为不同管理员创建各自独立的账户。日常管理中，仅向真正需要承担管理后台职责的用户授予 `Superuser` 身份。

## 修改管理员账户密码

该功能目前尚不可用。
