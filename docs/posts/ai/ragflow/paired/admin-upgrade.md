<BiRow>
<template #en>

Upgrade RAGFlow to `nightly` or the latest, published release.

</template>
<template #zh>

将 RAGFlow 升级到 `nightly` 或最新发布的正式版本。

</template>
</BiRow>

<BiRow>
<template #en>

:::info NOTE
Upgrading RAGFlow in itself will *not* remove your uploaded/historical data. However, be aware that `docker compose -f docker/docker-compose.yml down -v` will remove Docker container volumes, resulting in data loss.
:::

</template>
<template #zh>

:::info 注意
升级 RAGFlow 本身*不会*删除你上传的/历史数据。但要注意，`docker compose -f docker/docker-compose.yml down -v` 会删除 Docker 容器卷，导致数据丢失。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Upgrade RAGFlow to `nightly`, the Most Recent, Tested Docker Image

</template>
<template #zh>

## 将 RAGFlow 升级到 `nightly`（最新且经过测试的 Docker 镜像）

</template>
</BiRow>

<BiRow>
<template #en>

`nightly` refers to the RAGFlow Docker image without embedding models.

</template>
<template #zh>

`nightly` 指不包含嵌入模型的 RAGFlow Docker 镜像。

</template>
</BiRow>

<BiRow>
<template #en>

To upgrade RAGFlow, you must upgrade **both** your code **and** your Docker image:

</template>
<template #zh>

要升级 RAGFlow，你必须**同时**升级代码**和** Docker 镜像：

</template>
</BiRow>

<BiRow>
<template #en>

1. Stop the server

</template>
<template #zh>

1. 停止服务器

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   docker compose -f docker/docker-compose.yml down
   ```

</template>
<template #zh>

   ```bash
   docker compose -f docker/docker-compose.yml down
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Update the local code

</template>
<template #zh>

2. 更新本地代码

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   git pull
   ```

</template>
<template #zh>

   ```bash
   git pull
   ```

</template>
</BiRow>

<BiRow>
<template #en>

3. Update **ragflow/docker/.env**:

</template>
<template #zh>

3. 更新 **ragflow/docker/.env**：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   RAGFLOW_IMAGE=infiniflow/ragflow:nightly
   ```

</template>
<template #zh>

   ```bash
   RAGFLOW_IMAGE=infiniflow/ragflow:nightly
   ```

</template>
</BiRow>

<BiRow>
<template #en>

4. Update RAGFlow image and restart RAGFlow:

</template>
<template #zh>

4. 更新 RAGFlow 镜像并重启 RAGFlow：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   docker compose -f docker/docker-compose.yml pull
   docker compose -f docker/docker-compose.yml up -d
   ```

</template>
<template #zh>

   ```bash
   docker compose -f docker/docker-compose.yml pull
   docker compose -f docker/docker-compose.yml up -d
   ```

</template>
</BiRow>

<BiRow>
<template #en>

## Upgrade RAGFlow to Given Release

</template>
<template #zh>

## 将 RAGFlow 升级到指定版本

</template>
</BiRow>

<BiRow>
<template #en>

To upgrade RAGFlow, you must upgrade **both** your code **and** your Docker image:

</template>
<template #zh>

要升级 RAGFlow，你必须**同时**升级代码**和** Docker 镜像：

</template>
</BiRow>

<BiRow>
<template #en>

1. Stop the server

</template>
<template #zh>

1. 停止服务器

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   docker compose -f docker/docker-compose.yml down
   ```

</template>
<template #zh>

   ```bash
   docker compose -f docker/docker-compose.yml down
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Update the local code

</template>
<template #zh>

2. 更新本地代码

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   git pull
   ```

</template>
<template #zh>

   ```bash
   git pull
   ```

</template>
</BiRow>

<BiRow>
<template #en>

3. Switch to the latest, officially published release, e.g., `v0.27.2`:

</template>
<template #zh>

3. 切换到最新的官方发布版本，例如 `v0.27.2`：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   git checkout -f v0.27.2
   ```

</template>
<template #zh>

   ```bash
   git checkout -f v0.27.2
   ```

</template>
</BiRow>

<BiRow>
<template #en>

4. Update **ragflow/docker/.env**:

</template>
<template #zh>

4. 更新 **ragflow/docker/.env**：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   RAGFLOW_IMAGE=infiniflow/ragflow:v0.27.2
   ```

</template>
<template #zh>

   ```bash
   RAGFLOW_IMAGE=infiniflow/ragflow:v0.27.2
   ```

</template>
</BiRow>

<BiRow>
<template #en>

5. Update the RAGFlow image and restart RAGFlow:

</template>
<template #zh>

5. 更新 RAGFlow 镜像并重启 RAGFlow：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   docker compose -f docker/docker-compose.yml pull
   docker compose -f docker/docker-compose.yml up -d
   ```

</template>
<template #zh>

   ```bash
   docker compose -f docker/docker-compose.yml pull
   docker compose -f docker/docker-compose.yml up -d
   ```

</template>
</BiRow>

<BiRow>
<template #en>

## Frequently Asked Questions

</template>
<template #zh>

## 常见问题

</template>
</BiRow>

<BiRow>
<template #en>

### Do I Need to Back Up My Datasets Before Upgrading RAGFlow?

</template>
<template #zh>

### 升级 RAGFlow 前需要备份数据集吗？

</template>
</BiRow>

<BiRow>
<template #en>

No, you do not need to. Upgrading RAGFlow in itself will *not* remove your uploaded data or dataset settings. However, be aware that `docker compose -f docker/docker-compose.yml down -v` will remove Docker container volumes, resulting in data loss.

</template>
<template #zh>

不需要。升级 RAGFlow 本身*不会*删除你上传的数据或数据集设置。但要注意，`docker compose -f docker/docker-compose.yml down -v` 会删除 Docker 容器卷，导致数据丢失。

</template>
</BiRow>

<BiRow>
<template #en>

### Upgrade RAGFlow in an Offline Environment (Without Internet Access)

</template>
<template #zh>

### 在离线环境（无法访问互联网）中升级 RAGFlow

</template>
</BiRow>

<BiRow>
<template #en>

1. From an environment with Internet access, pull the required Docker image.
2. Save the Docker image to a **.tar** file.
   ```bash
   docker save -o ragflow.v0.27.2.tar infiniflow/ragflow:v0.27.2
   ```
3. Copy the **.tar** file to the target server.
4. Load the **.tar** file into Docker:
   ```bash
   docker load -i ragflow.v0.27.2.tar
   ```

</template>
<template #zh>

1. 在有互联网访问的环境下拉取所需的 Docker 镜像。
2. 将 Docker 镜像保存为 **.tar** 文件。
   ```bash
   docker save -o ragflow.v0.27.2.tar infiniflow/ragflow:v0.27.2
   ```
3. 将 **.tar** 文件复制到目标服务器。
4. 将 **.tar** 文件加载到 Docker：
   ```bash
   docker load -i ragflow.v0.27.2.tar
   ```

</template>
</BiRow>
