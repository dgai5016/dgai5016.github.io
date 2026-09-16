<BiRow>
<template #en>

The RAGFlow CLI is a command-line-based system administration tool that offers administrators an efficient and flexible method for system interaction and control. Operating on a client-server architecture, it communicates in real-time with the Admin Service, receiving administrator commands and dynamically returning execution results.

</template>
<template #zh>

RAGFlow CLI 是一个基于命令行的系统管理工具，为管理员提供了高效灵活的系统交互与控制方式。它采用客户端-服务器架构，与管理服务（Admin Service）实时通信，接收管理员命令并动态返回执行结果。

</template>
</BiRow>

<BiRow>
<template #en>

## Using the RAGFlow CLI

</template>
<template #zh>

## 使用 RAGFlow CLI

</template>
</BiRow>

<BiRow>
<template #en>

1. Ensure the Admin Service is running.
2. Install ragflow-cli.

</template>
<template #zh>

1. 确保 Admin Service 正在运行。
2. 安装 ragflow-cli。

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   pipx install ragflow-cli==0.27.2
   ```
  > You can also use `uv`, a tool for managing virtual environments and packages, to install RAGFlow CLI: `uv tool install ragflow-cli@0.27.2`.

</template>
<template #zh>

   ```bash
   pipx install ragflow-cli==0.27.2
   ```
  > 你也可以使用 `uv`（一个用于管理虚拟环境与软件包的工具）安装 RAGFlow CLI：`uv tool install ragflow-cli@0.27.2`。

</template>
</BiRow>

<BiRow>
<template #en>

3. Launch the CLI client:

</template>
<template #zh>

3. 启动 CLI 客户端：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   ragflow-cli -h 127.0.0.1 -p 9381
   ```

</template>
<template #zh>

   ```bash
   ragflow-cli -h 127.0.0.1 -p 9381
   ```

</template>
</BiRow>

<BiRow>
<template #en>

    You will be prompted to enter the superuser's password to log in.
    See [Default Administrative Account](#default-administrative-account) for how the initial password is chosen.

</template>
<template #zh>

    系统会提示你输入超级用户的密码进行登录。
    初始密码如何确定，参见[默认管理员账户](#default-administrative-account)。

</template>
</BiRow>

<BiRow>
<template #en>

    **Parameters:**

</template>
<template #zh>

    **参数：**

</template>
</BiRow>

<BiRow>
<template #en>

    - -h: RAGFlow admin server host address
    - -p: RAGFlow admin server port

</template>
<template #zh>

    - -h：RAGFlow 管理服务器主机地址
    - -p：RAGFlow 管理服务器端口

</template>
</BiRow>

<BiRow>
<template #en>

## Default Administrative Account

</template>
<template #zh>

## 默认管理员账户

</template>
</BiRow>

<BiRow>
<template #en>

- Username: admin@ragflow.io
- Password: the value of the `ADMIN_DEFAULT_PASSWORD` (or `DEFAULT_SUPERUSER_PASSWORD`) environment variable; if neither is set when the admin server first starts, a random password is generated and written once to `logs/admin_bootstrap_password.txt` (mode 0600). Change it after the first login.

</template>
<template #zh>

- 用户名：admin@ragflow.io
- 密码：取环境变量 `ADMIN_DEFAULT_PASSWORD`（或 `DEFAULT_SUPERUSER_PASSWORD`）的值；若管理服务器首次启动时两者均未设置，则会生成一个随机密码并一次性写入 `logs/admin_bootstrap_password.txt`（权限 0600）。请在首次登录后修改密码。

</template>
</BiRow>

<BiRow>
<template #en>

## Supported Commands

</template>
<template #zh>

## 支持的命令

</template>
</BiRow>

<BiRow>
<template #en>

Commands are case-insensitive and must be terminated with a semicolon(;).

</template>
<template #zh>

命令不区分大小写，且必须以分号（;）结尾。

</template>
</BiRow>

<BiRow>
<template #en>

### Service Manage Commands

</template>
<template #zh>

### 服务管理命令

</template>
</BiRow>

<BiRow>
<template #en>

`LIST SERVICES;`

</template>
<template #zh>

`LIST SERVICES;`

</template>
</BiRow>

<BiRow>
<template #en>

- Lists all available services within the RAGFlow system.
- [Example](#example-list-services)

</template>
<template #zh>

- 列出 RAGFlow 系统内所有可用的服务。
- [示例](#example-list-services)

</template>
</BiRow>

<BiRow>
<template #en>

`SHOW SERVICE <id>;`

</template>
<template #zh>

`SHOW SERVICE <id>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Shows detailed status information for the service identified by **id**.
- [Example](#example-show-service)

</template>
<template #zh>

- 显示由 **id** 标识的服务的详细状态信息。
- [示例](#example-show-service)

</template>
</BiRow>

<BiRow>
<template #en>

`SHOW VERSION;`

</template>
<template #zh>

`SHOW VERSION;`

</template>
</BiRow>

<BiRow>
<template #en>

- Shows RAGFlow version.
- [Example](#example-show-version)

</template>
<template #zh>

- 显示 RAGFlow 版本。
- [示例](#example-show-version)

</template>
</BiRow>

<BiRow>
<template #en>

### User Management Commands

</template>
<template #zh>

### 用户管理命令

</template>
</BiRow>

<BiRow>
<template #en>

`LIST USERS;`

</template>
<template #zh>

`LIST USERS;`

</template>
</BiRow>

<BiRow>
<template #en>

- Lists all users known to the system.
- [Example](#example-list-users)

</template>
<template #zh>

- 列出系统中的所有用户。
- [示例](#example-list-users)

</template>
</BiRow>

<BiRow>
<template #en>

`SHOW USER <username>;`

</template>
<template #zh>

`SHOW USER <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Shows details and permissions for the user specified by **email**. The username must be enclosed in single or double quotes.
- [Example](#example-show-user)

</template>
<template #zh>

- 显示由**邮箱**指定的用户详情与权限。用户名必须用单引号或双引号括起来。
- [示例](#example-show-user)

</template>
</BiRow>

<BiRow>
<template #en>

`CREATE USER <username> <password>;`

</template>
<template #zh>

`CREATE USER <username> <password>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Create user by username and password. The username and password must be enclosed in single or double quotes.
- [Example](#example-create-user)

</template>
<template #zh>

- 通过用户名和密码创建用户。用户名和密码必须用单引号或双引号括起来。
- [示例](#example-create-user)

</template>
</BiRow>

<BiRow>
<template #en>

`DROP USER <username>;`

</template>
<template #zh>

`DROP USER <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Removes the specified user from the system. Use with caution.
- [Example](#example-drop-user)

</template>
<template #zh>

- 从系统中删除指定用户。请谨慎使用。
- [示例](#example-drop-user)

</template>
</BiRow>

<BiRow>
<template #en>

`ALTER USER PASSWORD <username> <new_password>;`

</template>
<template #zh>

`ALTER USER PASSWORD <username> <new_password>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Changes the password for the specified user.
- [Example](#example-alter-user-password)

</template>
<template #zh>

- 修改指定用户的密码。
- [示例](#example-alter-user-password)

</template>
</BiRow>

<BiRow>
<template #en>

`ALTER USER ACTIVE <username> <on/off>;`

</template>
<template #zh>

`ALTER USER ACTIVE <username> <on/off>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Changes the user to active or inactive.
- [Example](#example-alter-user-active)

</template>
<template #zh>

- 将用户切换为激活或非激活状态。
- [示例](#example-alter-user-active)

</template>
</BiRow>

<BiRow>
<template #en>

`GENERATE KEY FOR USER <username>;`

</template>
<template #zh>

`GENERATE KEY FOR USER <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Generates a new API key for the specified user.
- [Example](#example-generate-key)

</template>
<template #zh>

- 为指定用户生成新的 API key。
- [示例](#example-generate-key)

</template>
</BiRow>

<BiRow>
<template #en>

`LIST KEYS OF <username>;`

</template>
<template #zh>

`LIST KEYS OF <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Lists all API keys associated with the specified user.
- [Example](#example-list-keys)

</template>
<template #zh>

- 列出与指定用户关联的所有 API key。
- [示例](#example-list-keys)

</template>
</BiRow>

<BiRow>
<template #en>

`DROP KEY <key> OF <username>;`

</template>
<template #zh>

`DROP KEY <key> OF <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Deletes a specific API key for the specified user.
- [Example](#example-drop-key)

</template>
<template #zh>

- 删除指定用户的某个 API key。
- [示例](#example-drop-key)

</template>
</BiRow>

<BiRow>
<template #en>

### Data and Agent Commands

</template>
<template #zh>

### 数据与 Agent 命令

</template>
</BiRow>

<BiRow>
<template #en>

`LIST DATASETS OF <username>;`

</template>
<template #zh>

`LIST DATASETS OF <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Lists the datasets associated with the specified user.
- [Example](#example-list-datasets-of-user)

</template>
<template #zh>

- 列出与指定用户关联的数据集。
- [示例](#example-list-datasets-of-user)

</template>
</BiRow>

<BiRow>
<template #en>

`LIST AGENTS OF <username>;`

</template>
<template #zh>

`LIST AGENTS OF <username>;`

</template>
</BiRow>

<BiRow>
<template #en>

- Lists the agents associated with the specified user.
- [Example](#example-list-agents-of-user)

</template>
<template #zh>

- 列出与指定用户关联的 Agent。
- [示例](#example-list-agents-of-user)

</template>
</BiRow>

<BiRow>
<template #en>

### System Info

</template>
<template #zh>

### 系统信息

</template>
</BiRow>

<BiRow>
<template #en>

`SHOW VERSION;`
- Display the current RAGFlow version.
- [Example](#example-show-version)

</template>
<template #zh>

`SHOW VERSION;`
- 显示当前 RAGFlow 版本。
- [示例](#example-show-version)

</template>
</BiRow>

<BiRow>
<template #en>

`GRANT ADMIN <username>`
- Grant administrator privileges to the specified user.
- [Example](#example-grant-admin)

</template>
<template #zh>

`GRANT ADMIN <username>`
- 授予指定用户管理员权限。
- [示例](#example-grant-admin)

</template>
</BiRow>

<BiRow>
<template #en>

`REVOKE ADMIN <username>`
- Revoke administrator privileges from the specified user.
- [Example](#example-revoke-admin)

</template>
<template #zh>

`REVOKE ADMIN <username>`
- 撤销指定用户的管理员权限。
- [示例](#example-revoke-admin)

</template>
</BiRow>

<BiRow>
<template #en>

`LIST VARS`
- List all system settings.
- [Example](#example-list-vars)

</template>
<template #zh>

`LIST VARS`
- 列出所有系统设置。
- [示例](#example-list-vars)

</template>
</BiRow>

<BiRow>
<template #en>

`SHOW VAR <var_name>`
- Display the content of a specific system configuration/setting by its name or name prefix.
- [Example](#example-show-var)

</template>
<template #zh>

`SHOW VAR <var_name>`
- 按名称或名称前缀显示某个系统配置/设置的内容。
- [示例](#example-show-var)

</template>
</BiRow>

<BiRow>
<template #en>

`SET VAR <var_name> <var_value>`
- Set the value for a specified configuration item.
- [Example](#example-set-var)

</template>
<template #zh>

`SET VAR <var_name> <var_value>`
- 设置指定配置项的值。
- [示例](#example-set-var)

</template>
</BiRow>

<BiRow>
<template #en>

`LIST CONFIGS`
- List all system configurations.
- [Example](#example-list-configs)

</template>
<template #zh>

`LIST CONFIGS`
- 列出所有系统配置。
- [示例](#example-list-configs)

</template>
</BiRow>

<BiRow>
<template #en>

`LIST ENVS`
- List all system environments which can accessed by Admin service.
- [Example](#example-list-environments)

</template>
<template #zh>

`LIST ENVS`
- 列出 Admin Service 可访问的所有系统环境变量。
- [示例](#example-list-environments)

</template>
</BiRow>

<BiRow>
<template #en>

### Meta-Commands

</template>
<template #zh>

### 元命令

</template>
</BiRow>

<BiRow>
<template #en>

- \? or \help
  Shows help information for the available commands.
- \q or \quit
  Exits the CLI application.
- [Example](#example-meta-commands)

</template>
<template #zh>

- \? 或 \help
  显示可用命令的帮助信息。
- \q 或 \quit
  退出 CLI 应用。
- [示例](#example-meta-commands)

</template>
</BiRow>

<BiRow>
<template #en>

### Examples

</template>
<template #zh>

### 示例

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-services"></span>

</template>
<template #zh>

<span id="example-list-services"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all available services.

</template>
<template #zh>

- 列出所有可用的服务。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list services;
command: list services;
Listing all services
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+
| extra                                                                                     | host      | id | name          | port  | service_type   | status  |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+
| {}                                                                                        | 0.0.0.0   | 0  | ragflow_0     | 9380  | ragflow_server | Timeout |
| {'meta_type': 'mysql', 'password': 'infini_rag_flow', 'username': 'root'}                 | localhost | 1  | mysql         | 5455  | meta_data      | Alive   |
| {'password': 'infini_rag_flow', 'store_type': 'minio', 'user': 'rag_flow'}                | localhost | 2  | minio         | 9000  | file_store     | Alive   |
| {'password': 'infini_rag_flow', 'retrieval_type': 'elasticsearch', 'username': 'elastic'} | localhost | 3  | elasticsearch | 1200  | retrieval      | Alive   |
| {'db_name': 'default_db', 'retrieval_type': 'infinity'}                                   | localhost | 4  | infinity      | 23817 | retrieval      | Timeout |
| {'database': 1, 'mq_type': 'redis', 'password': 'infini_rag_flow'}                        | localhost | 5  | redis         | 6379  | message_queue  | Alive   |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+

```

</template>
<template #zh>

```
ragflow> list services;
command: list services;
Listing all services
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+
| extra                                                                                     | host      | id | name          | port  | service_type   | status  |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+
| {}                                                                                        | 0.0.0.0   | 0  | ragflow_0     | 9380  | ragflow_server | Timeout |
| {'meta_type': 'mysql', 'password': 'infini_rag_flow', 'username': 'root'}                 | localhost | 1  | mysql         | 5455  | meta_data      | Alive   |
| {'password': 'infini_rag_flow', 'store_type': 'minio', 'user': 'rag_flow'}                | localhost | 2  | minio         | 9000  | file_store     | Alive   |
| {'password': 'infini_rag_flow', 'retrieval_type': 'elasticsearch', 'username': 'elastic'} | localhost | 3  | elasticsearch | 1200  | retrieval      | Alive   |
| {'db_name': 'default_db', 'retrieval_type': 'infinity'}                                   | localhost | 4  | infinity      | 23817 | retrieval      | Timeout |
| {'database': 1, 'mq_type': 'redis', 'password': 'infini_rag_flow'}                        | localhost | 5  | redis         | 6379  | message_queue  | Alive   |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+---------+

```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-show-service"></span>

</template>
<template #zh>

<span id="example-show-service"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Show ragflow_server.

</template>
<template #zh>

- 显示 ragflow_server。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 0;
command: show service 0;
Showing service: 0
Service ragflow_0 is alive. Detail:
Confirm elapsed: 26.0 ms.
```

</template>
<template #zh>

```
ragflow> show service 0;
command: show service 0;
Showing service: 0
Service ragflow_0 is alive. Detail:
Confirm elapsed: 26.0 ms.
```

</template>
</BiRow>

<BiRow>
<template #en>

- Show mysql.

</template>
<template #zh>

- 显示 mysql。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 1;
command: show service 1;
Showing service: 1
Service mysql is alive. Detail:
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
| command | db       | host             | id   | info             | state                  | time  | user            |
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
| Daemon  | None     | localhost        | 5    | None             | Waiting on empty queue | 16111 | event_scheduler |
| Sleep   | rag_flow | 172.18.0.1:40046 | 1610 | None             |                        | 2     | root            |
| Query   | rag_flow | 172.18.0.1:35882 | 1629 | SHOW PROCESSLIST | init                   | 0     | root            |
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
```

</template>
<template #zh>

```
ragflow> show service 1;
command: show service 1;
Showing service: 1
Service mysql is alive. Detail:
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
| command | db       | host             | id   | info             | state                  | time  | user            |
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
| Daemon  | None     | localhost        | 5    | None             | Waiting on empty queue | 16111 | event_scheduler |
| Sleep   | rag_flow | 172.18.0.1:40046 | 1610 | None             |                        | 2     | root            |
| Query   | rag_flow | 172.18.0.1:35882 | 1629 | SHOW PROCESSLIST | init                   | 0     | root            |
+---------+----------+------------------+------+------------------+------------------------+-------+-----------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

- Show minio.

</template>
<template #zh>

- 显示 minio。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 2;
command: show service 2;
Showing service: 2
Service minio is alive. Detail:
Confirm elapsed: 2.1 ms.
```

</template>
<template #zh>

```
ragflow> show service 2;
command: show service 2;
Showing service: 2
Service minio is alive. Detail:
Confirm elapsed: 2.1 ms.
```

</template>
</BiRow>

<BiRow>
<template #en>

- Show elasticsearch.

</template>
<template #zh>

- 显示 elasticsearch。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 3;
command: show service 3;
Showing service: 3
Service elasticsearch is alive. Detail:
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
| cluster_name   | docs | docs_deleted | indices | indices_shards | jvm_heap_max | jvm_heap_used | jvm_versions | mappings_deduplicated_fields | mappings_deduplicated_size | mappings_fields | nodes | nodes_version | os_mem  | os_mem_used | os_mem_used_percent | status | store_size | total_dataset_size |
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
| docker-cluster | 717  | 86           | 37      | 42             | 3.76 GB      | 1.74 GB       | 21.0.1+12-29 | 6575                         | 48.0 KB                    | 8521            | 1     | ['8.11.3']    | 7.52 GB | 4.55 GB     | 61                  | green  | 4.60 MB    | 4.60 MB            |
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
```

</template>
<template #zh>

```
ragflow> show service 3;
command: show service 3;
Showing service: 3
Service elasticsearch is alive. Detail:
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
| cluster_name   | docs | docs_deleted | indices | indices_shards | jvm_heap_max | jvm_heap_used | jvm_versions | mappings_deduplicated_fields | mappings_deduplicated_size | mappings_fields | nodes | nodes_version | os_mem  | os_mem_used | os_mem_used_percent | status | store_size | total_dataset_size |
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
| docker-cluster | 717  | 86           | 37      | 42             | 3.76 GB      | 1.74 GB       | 21.0.1+12-29 | 6575                         | 48.0 KB                    | 8521            | 1     | ['8.11.3']    | 7.52 GB | 4.55 GB     | 61                  | green  | 4.60 MB    | 4.60 MB            |
+----------------+------+--------------+---------+----------------+--------------+---------------+--------------+------------------------------+----------------------------+-----------------+-------+---------------+---------+-------------+---------------------+--------+------------+--------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

- Show infinity.

</template>
<template #zh>

- 显示 infinity。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 4;
command: show service 4;
Showing service: 4
Fail to show service, code: 500, message: Infinity is not in use.
```

</template>
<template #zh>

```
ragflow> show service 4;
command: show service 4;
Showing service: 4
Fail to show service, code: 500, message: Infinity is not in use.
```

</template>
</BiRow>

<BiRow>
<template #en>

- Show redis.

</template>
<template #zh>

- 显示 redis。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show service 5;
command: show service 5;
Showing service: 5
Service redis is alive. Detail:
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
| blocked_clients | connected_clients | instantaneous_ops_per_sec | mem_fragmentation_ratio | redis_version | server_mode | total_commands_processed | total_system_memory | used_memory |
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
| 0               | 2                 | 1                         | 10.41                   | 7.2.4         | standalone  | 10446                    | 30.84G              | 1.10M       |
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
```
<span id="example-show-version"></span>

</template>
<template #zh>

```
ragflow> show service 5;
command: show service 5;
Showing service: 5
Service redis is alive. Detail:
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
| blocked_clients | connected_clients | instantaneous_ops_per_sec | mem_fragmentation_ratio | redis_version | server_mode | total_commands_processed | total_system_memory | used_memory |
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
| 0               | 2                 | 1                         | 10.41                   | 7.2.4         | standalone  | 10446                    | 30.84G              | 1.10M       |
+-----------------+-------------------+---------------------------+-------------------------+---------------+-------------+--------------------------+---------------------+-------------+
```
<span id="example-show-version"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Show RAGFlow version

</template>
<template #zh>

- 显示 RAGFlow 版本

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show version;
+-----------------------+
| version               |
+-----------------------+
| v0.21.0-241-gc6cf58d5 |
+-----------------------+
```

</template>
<template #zh>

```
ragflow> show version;
+-----------------------+
| version               |
+-----------------------+
| v0.21.0-241-gc6cf58d5 |
+-----------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-users"></span>

</template>
<template #zh>

<span id="example-list-users"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all user.

</template>
<template #zh>

- 列出所有用户。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list users;
command: list users;
Listing all users
+-------------------------------+----------------------+-----------+----------+
| create_date                   | email                | is_active | nickname |
+-------------------------------+----------------------+-----------+----------+
| Mon, 22 Sep 2025 10:59:04 GMT | admin@ragflow.io     | 1         | admin    |
| Sun, 14 Sep 2025 17:36:27 GMT | lynn_inf@hotmail.com | 1         | Lynn     |
+-------------------------------+----------------------+-----------+----------+
```

</template>
<template #zh>

```
ragflow> list users;
command: list users;
Listing all users
+-------------------------------+----------------------+-----------+----------+
| create_date                   | email                | is_active | nickname |
+-------------------------------+----------------------+-----------+----------+
| Mon, 22 Sep 2025 10:59:04 GMT | admin@ragflow.io     | 1         | admin    |
| Sun, 14 Sep 2025 17:36:27 GMT | lynn_inf@hotmail.com | 1         | Lynn     |
+-------------------------------+----------------------+-----------+----------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-show-user"></span>

</template>
<template #zh>

<span id="example-show-user"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Show specified user.

</template>
<template #zh>

- 显示指定用户。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show user "admin@ragflow.io";
command: show user "admin@ragflow.io";
Showing user: admin@ragflow.io
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
| create_date                   | email            | is_active | is_anonymous | is_authenticated | is_superuser | language | last_login_time | login_channel | status | update_date                   |
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
| Mon, 22 Sep 2025 10:59:04 GMT | admin@ragflow.io | 1         | 0            | 1                | True         | Chinese  | None            | None          | 1      | Mon, 22 Sep 2025 10:59:04 GMT |
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
```

</template>
<template #zh>

```
ragflow> show user "admin@ragflow.io";
command: show user "admin@ragflow.io";
Showing user: admin@ragflow.io
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
| create_date                   | email            | is_active | is_anonymous | is_authenticated | is_superuser | language | last_login_time | login_channel | status | update_date                   |
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
| Mon, 22 Sep 2025 10:59:04 GMT | admin@ragflow.io | 1         | 0            | 1                | True         | Chinese  | None            | None          | 1      | Mon, 22 Sep 2025 10:59:04 GMT |
+-------------------------------+------------------+-----------+--------------+------------------+--------------+----------+-----------------+---------------+--------+-------------------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-create-user"></span>

</template>
<template #zh>

<span id="example-create-user"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Create new user.

</template>
<template #zh>

- 创建新用户。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> create user "example@ragflow.io" "psw";
command: create user "example@ragflow.io" "psw";
Create user: example@ragflow.io, password: psw, role: user
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
| access_token                     | email              | id                               | is_superuser | login_channel | nickname |
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
| 5cdc6d1e9df111f099b543aee592c6bf | example@ragflow.io | 5cdc6ca69df111f099b543aee592c6bf | False        | password      |          |
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
```

</template>
<template #zh>

```
ragflow> create user "example@ragflow.io" "psw";
command: create user "example@ragflow.io" "psw";
Create user: example@ragflow.io, password: psw, role: user
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
| access_token                     | email              | id                               | is_superuser | login_channel | nickname |
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
| 5cdc6d1e9df111f099b543aee592c6bf | example@ragflow.io | 5cdc6ca69df111f099b543aee592c6bf | False        | password      |          |
+----------------------------------+--------------------+----------------------------------+--------------+---------------+----------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-alter-user-password"></span>

</template>
<template #zh>

<span id="example-alter-user-password"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Alter user password.

</template>
<template #zh>

- 修改用户密码。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> alter user password "example@ragflow.io" "newpsw";
command: alter user password "example@ragflow.io" "newpsw";
Alter user: example@ragflow.io, password: newpsw
Password updated successfully!
```

</template>
<template #zh>

```
ragflow> alter user password "example@ragflow.io" "newpsw";
command: alter user password "example@ragflow.io" "newpsw";
Alter user: example@ragflow.io, password: newpsw
Password updated successfully!
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-alter-user-active"></span>

</template>
<template #zh>

<span id="example-alter-user-active"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Alter user active, turn off.

</template>
<template #zh>

- 修改用户激活状态（关闭）。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> alter user active "example@ragflow.io" off;
command: alter user active "example@ragflow.io" off;
Alter user example@ragflow.io activate status, turn off.
Turn off user activate status successfully!
```

</template>
<template #zh>

```
ragflow> alter user active "example@ragflow.io" off;
command: alter user active "example@ragflow.io" off;
Alter user example@ragflow.io activate status, turn off.
Turn off user activate status successfully!
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-drop-user"></span>

</template>
<template #zh>

<span id="example-drop-user"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Drop user.

</template>
<template #zh>

- 删除用户。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> Drop user "example@ragflow.io";
command: Drop user "example@ragflow.io";
Drop user: example@ragflow.io
Successfully deleted user. Details:
Start to delete owned tenant.
- Deleted 2 tenant-LLM records.
- Deleted 0 langfuse records.
- Deleted 1 tenant.
- Deleted 1 user-tenant records.
- Deleted 1 user.
Delete done!
```

</template>
<template #zh>

```
ragflow> Drop user "example@ragflow.io";
command: Drop user "example@ragflow.io";
Drop user: example@ragflow.io
Successfully deleted user. Details:
Start to delete owned tenant.
- Deleted 2 tenant-LLM records.
- Deleted 0 langfuse records.
- Deleted 1 tenant.
- Deleted 1 user-tenant records.
- Deleted 1 user.
Delete done!
```

</template>
</BiRow>

<BiRow>
<template #en>

Delete user's data at the same time.

</template>
<template #zh>

同时删除该用户的数据。

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-generate-key"></span>

</template>
<template #zh>

<span id="example-generate-key"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Generate API key for user.

</template>
<template #zh>

- 为用户生成 API key。

</template>
</BiRow>

<BiRow>
<template #en>

```
admin> generate key for user "example@ragflow.io";
Generating API key for user: example@ragflow.io
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
| beta                             | create_date                   | create_time   | tenant_id                        | token                                               | update_date | update_time |
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
| Es9OpZ6hrnPGeYA3VU1xKUkj6NCb7cp- | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 | 5d5ea8a3efc111f0a79b80fa5b90e659 | ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus | None        | None        |
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
```

</template>
<template #zh>

```
admin> generate key for user "example@ragflow.io";
Generating API key for user: example@ragflow.io
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
| beta                             | create_date                   | create_time   | tenant_id                        | token                                               | update_date | update_time |
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
| Es9OpZ6hrnPGeYA3VU1xKUkj6NCb7cp- | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 | 5d5ea8a3efc111f0a79b80fa5b90e659 | ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus | None        | None        |
+----------------------------------+-------------------------------+---------------+----------------------------------+-----------------------------------------------------+-------------+-------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-keys"></span>

</template>
<template #zh>

<span id="example-list-keys"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all API keys for user.

</template>
<template #zh>

- 列出用户的所有 API key。

</template>
</BiRow>

<BiRow>
<template #en>

```
admin> list keys of "example@ragflow.io";
Listing API keys for user: example@ragflow.io
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
| beta                             | create_date                   | create_time   | dialog_id | source | tenant_id                        | token                                               | update_date                   | update_time   |
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
| Es9OpZ6hrnPGeYA3VU1xKUkj6NCb7cp- | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 | None      | None   | 5d5ea8a3efc111f0a79b80fa5b90e659 | ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 |
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
```

</template>
<template #zh>

```
admin> list keys of "example@ragflow.io";
Listing API keys for user: example@ragflow.io
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
| beta                             | create_date                   | create_time   | dialog_id | source | tenant_id                        | token                                               | update_date                   | update_time   |
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
| Es9OpZ6hrnPGeYA3VU1xKUkj6NCb7cp- | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 | None      | None   | 5d5ea8a3efc111f0a79b80fa5b90e659 | ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus | Mon, 12 Jan 2026 15:19:11 GMT | 1768227551361 |
+----------------------------------+-------------------------------+---------------+-----------+--------+----------------------------------+-----------------------------------------------------+-------------------------------+---------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-drop-key"></span>

</template>
<template #zh>

<span id="example-drop-key"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Drop API key for user.

</template>
<template #zh>

- 删除用户的 API key。

</template>
</BiRow>

<BiRow>
<template #en>

```
admin> drop key "ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus" of "example@ragflow.io";
Dropping API key for user: example@ragflow.io
API key deleted successfully
```

</template>
<template #zh>

```
admin> drop key "ragflow-piwVJHEk09M5UN3LS_Xx9HA7yehs3yNOc9GGsD4jzus" of "example@ragflow.io";
Dropping API key for user: example@ragflow.io
API key deleted successfully
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-datasets-of-user"></span>

</template>
<template #zh>

<span id="example-list-datasets-of-user"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List the specified user's dataset.

</template>
<template #zh>

- 列出指定用户的数据集。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list datasets of "lynn_inf@hotmail.com";
command: list datasets of "lynn_inf@hotmail.com";
Listing all datasets of user: lynn_inf@hotmail.com
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
| chunk_num | create_date                   | doc_num | language | name          | permission | status | token_num | update_date                   |
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
| 29        | Mon, 15 Sep 2025 11:56:59 GMT | 12      | Chinese  | test_dataset  | me         | 1      | 12896     | Fri, 19 Sep 2025 17:50:58 GMT |
| 4         | Sun, 28 Sep 2025 11:49:31 GMT | 6       | Chinese  | dataset_share | team       | 1      | 1121      | Sun, 28 Sep 2025 14:41:03 GMT |
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
```

</template>
<template #zh>

```
ragflow> list datasets of "lynn_inf@hotmail.com";
command: list datasets of "lynn_inf@hotmail.com";
Listing all datasets of user: lynn_inf@hotmail.com
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
| chunk_num | create_date                   | doc_num | language | name          | permission | status | token_num | update_date                   |
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
| 29        | Mon, 15 Sep 2025 11:56:59 GMT | 12      | Chinese  | test_dataset  | me         | 1      | 12896     | Fri, 19 Sep 2025 17:50:58 GMT |
| 4         | Sun, 28 Sep 2025 11:49:31 GMT | 6       | Chinese  | dataset_share | team       | 1      | 1121      | Sun, 28 Sep 2025 14:41:03 GMT |
+-----------+-------------------------------+---------+----------+---------------+------------+--------+-----------+-------------------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-agents-of-user"></span>

</template>
<template #zh>

<span id="example-list-agents-of-user"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List the specified user's agents.

</template>
<template #zh>

- 列出指定用户的 Agent。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list agents of "lynn_inf@hotmail.com";
command: list agents of "lynn_inf@hotmail.com";
Listing all agents of user: lynn_inf@hotmail.com
+-----------------+-------------+------------+-----------------+
| canvas_category | canvas_type | permission | title           |
+-----------------+-------------+------------+-----------------+
| agent           | None        | team       | research_helper |
+-----------------+-------------+------------+-----------------+
```

</template>
<template #zh>

```
ragflow> list agents of "lynn_inf@hotmail.com";
command: list agents of "lynn_inf@hotmail.com";
Listing all agents of user: lynn_inf@hotmail.com
+-----------------+-------------+------------+-----------------+
| canvas_category | canvas_type | permission | title           |
+-----------------+-------------+------------+-----------------+
| agent           | None        | team       | research_helper |
+-----------------+-------------+------------+-----------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-show-version"></span>

</template>
<template #zh>

<span id="example-show-version"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Display the current RAGFlow version.

</template>
<template #zh>

- 显示当前 RAGFlow 版本。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show version;
show_version
+-----------------------+
| version               |
+-----------------------+
| v0.25.4-24-g6f60e9f9e |
+-----------------------+
```

</template>
<template #zh>

```
ragflow> show version;
show_version
+-----------------------+
| version               |
+-----------------------+
| v0.25.4-24-g6f60e9f9e |
+-----------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-grant-admin"></span>

</template>
<template #zh>

<span id="example-grant-admin"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Grant administrator privileges to the specified user.

</template>
<template #zh>

- 授予指定用户管理员权限。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> grant admin "anakin.skywalker@ragflow.io";
Grant successfully!
```

</template>
<template #zh>

```
ragflow> grant admin "anakin.skywalker@ragflow.io";
Grant successfully!
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-revoke-admin"></span>

</template>
<template #zh>

<span id="example-revoke-admin"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Revoke administrator privileges from the specified user.

</template>
<template #zh>

- 撤销指定用户的管理员权限。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> revoke admin "anakin.skywalker@ragflow.io";
Revoke successfully!
```

</template>
<template #zh>

```
ragflow> revoke admin "anakin.skywalker@ragflow.io";
Revoke successfully!
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-vars"></span>

</template>
<template #zh>

<span id="example-list-vars"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all system settings.

</template>
<template #zh>

- 列出所有系统设置。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list vars;
+-----------+---------------------+--------------+-----------+
| data_type | name                | setting_type | value     |
+-----------+---------------------+--------------+-----------+
| string    | default_role        | config       | user      |
| bool      | enable_whitelist    | config       | true      |
| string    | mail.default_sender | config       |           |
| string    | mail.password       | config       |           |
| integer   | mail.port           | config       | 15        |
| string    | mail.server         | config       | localhost |
| integer   | mail.timeout        | config       | 10        |
| bool      | mail.use_ssl        | config       | true      |
| bool      | mail.use_tls        | config       | false     |
| string    | mail.username       | config       |           |
+-----------+---------------------+--------------+-----------+
```

</template>
<template #zh>

```
ragflow> list vars;
+-----------+---------------------+--------------+-----------+
| data_type | name                | setting_type | value     |
+-----------+---------------------+--------------+-----------+
| string    | default_role        | config       | user      |
| bool      | enable_whitelist    | config       | true      |
| string    | mail.default_sender | config       |           |
| string    | mail.password       | config       |           |
| integer   | mail.port           | config       | 15        |
| string    | mail.server         | config       | localhost |
| integer   | mail.timeout        | config       | 10        |
| bool      | mail.use_ssl        | config       | true      |
| bool      | mail.use_tls        | config       | false     |
| string    | mail.username       | config       |           |
+-----------+---------------------+--------------+-----------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-show-var"></span>

</template>
<template #zh>

<span id="example-show-var"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Display the content of a specific system configuration/setting by its name or name prefix.

</template>
<template #zh>

- 按名称或名称前缀显示某个系统配置/设置的内容。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> show var mail.server;
+-----------+-------------+--------------+-----------+
| data_type | name        | setting_type | value     |
+-----------+-------------+--------------+-----------+
| string    | mail.server | config       | localhost |
+-----------+-------------+--------------+-----------+
```

</template>
<template #zh>

```
ragflow> show var mail.server;
+-----------+-------------+--------------+-----------+
| data_type | name        | setting_type | value     |
+-----------+-------------+--------------+-----------+
| string    | mail.server | config       | localhost |
+-----------+-------------+--------------+-----------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-set-var"></span>

</template>
<template #zh>

<span id="example-set-var"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Set the value for a specified configuration item.

</template>
<template #zh>

- 设置指定配置项的值。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> set var mail.server 127.0.0.1;
Set variable successfully
```

</template>
<template #zh>

```
ragflow> set var mail.server 127.0.0.1;
Set variable successfully
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-configs"></span>

</template>
<template #zh>

<span id="example-list-configs"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all system configurations.

</template>
<template #zh>

- 列出所有系统配置。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list configs;
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
| extra                                                                                     | host      | id | name          | port  | service_type   |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
| {}                                                                                        | 0.0.0.0   | 0  | ragflow_0     | 9380  | ragflow_server |
| {'meta_type': 'mysql', 'password': 'infini_rag_flow', 'username': 'root'}                 | localhost | 1  | mysql         | 5455  | meta_data      |
| {'password': 'infini_rag_flow', 'store_type': 'minio', 'user': 'rag_flow'}                | localhost | 2  | minio         | 9000  | file_store     |
| {'password': 'infini_rag_flow', 'retrieval_type': 'elasticsearch', 'username': 'elastic'} | localhost | 3  | elasticsearch | 1200  | retrieval      |
| {'db_name': 'default_db', 'retrieval_type': 'infinity'}                                   | localhost | 4  | infinity      | 23817 | retrieval      |
| {'database': 1, 'mq_type': 'redis', 'password': 'infini_rag_flow'}                        | localhost | 5  | redis         | 6379  | message_queue  |
| {'message_queue_type': 'redis'}                                                           |           | 6  | task_executor | 0     | task_executor  |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
```

</template>
<template #zh>

```
ragflow> list configs;
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
| extra                                                                                     | host      | id | name          | port  | service_type   |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
| {}                                                                                        | 0.0.0.0   | 0  | ragflow_0     | 9380  | ragflow_server |
| {'meta_type': 'mysql', 'password': 'infini_rag_flow', 'username': 'root'}                 | localhost | 1  | mysql         | 5455  | meta_data      |
| {'password': 'infini_rag_flow', 'store_type': 'minio', 'user': 'rag_flow'}                | localhost | 2  | minio         | 9000  | file_store     |
| {'password': 'infini_rag_flow', 'retrieval_type': 'elasticsearch', 'username': 'elastic'} | localhost | 3  | elasticsearch | 1200  | retrieval      |
| {'db_name': 'default_db', 'retrieval_type': 'infinity'}                                   | localhost | 4  | infinity      | 23817 | retrieval      |
| {'database': 1, 'mq_type': 'redis', 'password': 'infini_rag_flow'}                        | localhost | 5  | redis         | 6379  | message_queue  |
| {'message_queue_type': 'redis'}                                                           |           | 6  | task_executor | 0     | task_executor  |
+-------------------------------------------------------------------------------------------+-----------+----+---------------+-------+----------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-list-environments"></span>

</template>
<template #zh>

<span id="example-list-environments"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- List all system environments which can accessed by Admin service.

</template>
<template #zh>

- 列出 Admin Service 可访问的所有系统环境变量。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> list envs;
+-------------------------+------------------+
| env                     | value            |
+-------------------------+------------------+
| DOC_ENGINE              | elasticsearch    |
| DEFAULT_SUPERUSER_EMAIL | admin@ragflow.io |
| DB_TYPE                 | mysql            |
| DEVICE                  | cpu              |
| STORAGE_IMPL            | MINIO            |
+-------------------------+------------------+
```

</template>
<template #zh>

```
ragflow> list envs;
+-------------------------+------------------+
| env                     | value            |
+-------------------------+------------------+
| DOC_ENGINE              | elasticsearch    |
| DEFAULT_SUPERUSER_EMAIL | admin@ragflow.io |
| DB_TYPE                 | mysql            |
| DEVICE                  | cpu              |
| STORAGE_IMPL            | MINIO            |
+-------------------------+------------------+
```

</template>
</BiRow>

<BiRow>
<template #en>

<span id="example-meta-commands"></span>

</template>
<template #zh>

<span id="example-meta-commands"></span>

</template>
</BiRow>

<BiRow>
<template #en>

- Show help information.

</template>
<template #zh>

- 显示帮助信息。

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> \help
command: \help

Commands:
LIST SERVICES
SHOW SERVICE <service>
STARTUP SERVICE <service>
SHUTDOWN SERVICE <service>
RESTART SERVICE <service>
LIST USERS
SHOW USER <user>
DROP USER <user>
CREATE USER <user> <password>
ALTER USER PASSWORD <user> <new_password>
ALTER USER ACTIVE <user> <on/off>
LIST DATASETS OF <user>
LIST AGENTS OF <user>
CREATE ROLE <role>
DROP ROLE <role>
ALTER ROLE <role> SET DESCRIPTION <description>
LIST ROLES
SHOW ROLE <role>
GRANT <action_list> ON <function> TO ROLE <role>
REVOKE <action_list> ON <function> TO ROLE <role>
ALTER USER <user> SET ROLE <role>
SHOW USER PERMISSION <user>
SHOW VERSION
GRANT ADMIN <user>
REVOKE ADMIN <user>
GENERATE KEY FOR USER <user>
LIST KEYS OF <user>
DROP KEY <key> OF <user>

Meta Commands:
  \?, \h, \help     Show this help
  \q, \quit, \exit   Quit the CLI
```

</template>
<template #zh>

```
ragflow> \help
command: \help

Commands:
LIST SERVICES
SHOW SERVICE <service>
STARTUP SERVICE <service>
SHUTDOWN SERVICE <service>
RESTART SERVICE <service>
LIST USERS
SHOW USER <user>
DROP USER <user>
CREATE USER <user> <password>
ALTER USER PASSWORD <user> <new_password>
ALTER USER ACTIVE <user> <on/off>
LIST DATASETS OF <user>
LIST AGENTS OF <user>
CREATE ROLE <role>
DROP ROLE <role>
ALTER ROLE <role> SET DESCRIPTION <description>
LIST ROLES
SHOW ROLE <role>
GRANT <action_list> ON <function> TO ROLE <role>
REVOKE <action_list> ON <function> TO ROLE <role>
ALTER USER <user> SET ROLE <role>
SHOW USER PERMISSION <user>
SHOW VERSION
GRANT ADMIN <user>
REVOKE ADMIN <user>
GENERATE KEY FOR USER <user>
LIST KEYS OF <user>
DROP KEY <key> OF <user>

Meta Commands:
  \?, \h, \help     Show this help
  \q, \quit, \exit   Quit the CLI
```

</template>
</BiRow>

<BiRow>
<template #en>

- Exit

</template>
<template #zh>

- 退出

</template>
</BiRow>

<BiRow>
<template #en>

```
ragflow> \q
command: \q
Goodbye!
```

</template>
<template #zh>

```
ragflow> \q
command: \q
Goodbye!
```

</template>
</BiRow>
