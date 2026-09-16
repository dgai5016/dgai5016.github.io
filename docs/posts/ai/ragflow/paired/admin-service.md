<BiRow>
<template #en>

The Admin Service is the core backend management service of the RAGFlow system, providing comprehensive system administration capabilities through centralized API interfaces for managing and controlling the entire platform. Adopting a client-server architecture, it supports access and operations via both a Web UI and an Admin CLI, ensuring flexible and efficient execution of administrative tasks.

</template>
<template #zh>

管理服务（Admin Service）是 RAGFlow 系统的核心后端管理服务，通过集中式 API 接口提供全面的系统管理能力，用于管理和控制整个平台。它采用客户端-服务器架构，支持通过 Web UI 和 Admin CLI 访问和操作，确保管理任务灵活高效地执行。

</template>
</BiRow>

<BiRow>
<template #en>

The core functions of the Admin Service include real-time monitoring of the operational status of the RAGFlow server and its critical dependent components—such as MySQL, Elasticsearch, Redis, and MinIO—along with full-featured user management. In administrator mode, it enables key operations such as viewing user information, creating users, updating passwords, modifying activation status, and performing complete user data deletion. These functions remain accessible via the Admin CLI even when the web management interface is disabled, ensuring the system stays under control at all times.

</template>
<template #zh>

管理服务的核心功能包括：RAGFlow 服务器及其关键依赖组件（如 MySQL、Elasticsearch、Redis 和 MinIO）运行状态的实时监控，以及功能完备的用户管理。在管理员模式下，它支持查看用户信息、创建用户、更新密码、修改激活状态以及彻底删除用户数据等关键操作。即使 Web 管理界面被禁用，这些功能仍然可以通过 Admin CLI 访问，确保系统始终处于可控状态。

</template>
</BiRow>

<BiRow>
<template #en>

With its unified interface design, the Admin Service combines the convenience of visual administration with the efficiency and stability of command-line operations, serving as a crucial foundation for the reliable operation and secure management of the RAGFlow system.

</template>
<template #zh>

凭借统一的接口设计，管理服务把可视化管理的便捷性和命令行操作的高效与稳定结合起来，是 RAGFlow 系统可靠运行和安全管理的重要基础。

</template>
</BiRow>

<BiRow>
<template #en>

## Starting the Admin Service

</template>
<template #zh>

## 启动管理服务

</template>
</BiRow>

<BiRow>
<template #en>

### Launching from Source Code

</template>
<template #zh>

### 从源码启动

</template>
</BiRow>

<BiRow>
<template #en>

1. Before start Admin Service, please make sure RAGFlow system is already started.
2. Launch from source code:

</template>
<template #zh>

1. 启动管理服务之前，请确保 RAGFlow 系统已经启动。
2. 从源码启动：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   python admin/server/admin_server.py
   ```

</template>
<template #zh>

   ```bash
   python admin/server/admin_server.py
   ```

</template>
</BiRow>

<BiRow>
<template #en>

   The service will start and listen for incoming connections from the CLI on the configured port.

</template>
<template #zh>

   服务将启动，并在配置的端口上监听来自 CLI 的连接。

</template>
</BiRow>

<BiRow>
<template #en>

### Using Docker Image

</template>
<template #zh>

### 使用 Docker 镜像

</template>
</BiRow>

<BiRow>
<template #en>

1. Before startup, please configure the `docker_compose.yml`  file to enable admin server:

</template>
<template #zh>

1. 启动之前，请先配置 `docker_compose.yml` 文件以启用管理服务：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   command:
     - --enable-adminserver
   ```

</template>
<template #zh>

   ```bash
   command:
     - --enable-adminserver
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Start the containers, the service will start and listen for incoming connections from the CLI on the configured port.

</template>
<template #zh>

2. 启动容器后，服务将启动，并在配置的端口上监听来自 CLI 的连接。

</template>
</BiRow>
