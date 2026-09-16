<BiRow>
<template #en>

A guide explaining how to build a RAGFlow Docker image from its source code. By following this guide, you'll be able to create a local Docker image that can be used for development, debugging, or testing purposes.

</template>
<template #zh>

本指南介绍如何从源码构建 RAGFlow Docker 镜像。依照本指南操作后，你就能创建一个可用于开发、调试或测试的本地 Docker 镜像。

</template>
</BiRow>

<BiRow>
<template #en>

## Target Audience

</template>
<template #zh>

## 目标读者

</template>
</BiRow>

<BiRow>
<template #en>

- Developers who have added new features or modified the existing code and require a Docker image to view and debug their changes.
- Developers seeking to build a RAGFlow Docker image for an ARM64 platform.
- Testers aiming to explore the latest features of RAGFlow in a Docker image.

</template>
<template #zh>

- 已经添加了新功能或修改了现有代码、需要 Docker 镜像来查看和调试这些改动的开发者。
- 希望为 ARM64 平台构建 RAGFlow Docker 镜像的开发者。
- 想在 Docker 镜像中体验 RAGFlow 最新功能的测试人员。

</template>
</BiRow>

<BiRow>
<template #en>

## Prerequisites

</template>
<template #zh>

## 前置条件

</template>
</BiRow>

<BiRow>
<template #en>

- CPU &ge; 4 cores
- RAM &ge; 16 GB
- Disk &ge; 50 GB
- Docker &ge; 24.0.0 & Docker Compose &ge; v2.26.1

</template>
<template #zh>

- CPU &ge; 4 核
- 内存 &ge; 16 GB
- 磁盘 &ge; 50 GB
- Docker &ge; 24.0.0 & Docker Compose &ge; v2.26.1

</template>
</BiRow>

<BiRow>
<template #en>

## Build a Docker Image

</template>
<template #zh>

## 构建 Docker 镜像

</template>
</BiRow>

<BiRow>
<template #en>

This image is approximately 2 GB in size and relies on external LLM and embedding services.

</template>
<template #zh>

该镜像大小约为 2 GB，并依赖外部 LLM 和嵌入服务。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
- While we also test RAGFlow on ARM64 platforms, we do not maintain RAGFlow Docker images for ARM. However, you can build an image yourself on a `linux/arm64` or `darwin/arm64` host machine as well.
- For ARM64 platforms, please upgrade the `xgboost` version in **pyproject.toml** to `1.6.0` and ensure **unixODBC** is properly installed.
:::

</template>
<template #zh>

:::danger 重要
- 我们也会在 ARM64 平台上测试 RAGFlow，但并不维护面向 ARM 的 RAGFlow Docker 镜像。不过，你同样可以在 `linux/arm64` 或 `darwin/arm64` 主机上自行构建镜像。
- 对于 ARM64 平台，请将 **pyproject.toml** 中的 `xgboost` 版本升级到 `1.6.0`，并确保正确安装 **unixODBC**。
:::

</template>
</BiRow>

<BiRow>
<template #en>

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/ragflow_deps
uv run python3 download_deps.py
docker build -f Dockerfile -t infiniflow/ragflow_deps .
cd ..
docker build -f Dockerfile -t infiniflow/ragflow:nightly .
```

</template>
<template #zh>

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/ragflow_deps
uv run python3 download_deps.py
docker build -f Dockerfile -t infiniflow/ragflow_deps .
cd ..
docker build -f Dockerfile -t infiniflow/ragflow:nightly .
```

</template>
</BiRow>

<BiRow>
<template #en>

## Launch a RAGFlow Service from Docker for macOS

</template>
<template #zh>

## 在 macOS 上通过 Docker 启动 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

After building the infiniflow/ragflow:nightly image, you are ready to launch a fully-functional RAGFlow service with all the required components, such as Elasticsearch, MySQL, MinIO, Redis, and more.

</template>
<template #zh>

构建好 infiniflow/ragflow:nightly 镜像后，你就可以启动一个功能完整的 RAGFlow 服务，并附带 Elasticsearch、MySQL、MinIO、Redis 等所有必需组件。

</template>
</BiRow>

<BiRow>
<template #en>

## Example: Apple M2 Pro (sequoia)

</template>
<template #zh>

## 示例：Apple M2 Pro（sequoia）

</template>
</BiRow>

<BiRow>
<template #en>

1. Edit Docker Compose Configuration

</template>
<template #zh>

1. 编辑 Docker Compose 配置

</template>
</BiRow>

<BiRow>
<template #en>

Open the `docker/.env` file. Find the `RAGFLOW_IMAGE` setting and change the image reference from `infiniflow/ragflow:v0.27.2` to `infiniflow/ragflow:nightly` to use the pre-built image.

</template>
<template #zh>

打开 `docker/.env` 文件，找到 `RAGFLOW_IMAGE` 设置，把镜像引用从 `infiniflow/ragflow:v0.27.2` 改为 `infiniflow/ragflow:nightly`，以使用预构建的镜像。

</template>
</BiRow>

<BiRow>
<template #en>

2. Launch the Service

</template>
<template #zh>

2. 启动服务

</template>
</BiRow>

<BiRow>
<template #en>

```bash
cd docker
$ docker compose -f docker-compose-macos.yml up -d
```

</template>
<template #zh>

```bash
cd docker
$ docker compose -f docker-compose-macos.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

3. Access the RAGFlow Service

</template>
<template #zh>

3. 访问 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

Once the setup is complete, open your web browser and navigate to http://127.0.0.1 or your server's \<IP_ADDRESS\>; (the default port is \<PORT\> = 80). You will be directed to the RAGFlow welcome page. Enjoy!🍻

</template>
<template #zh>

设置完成后，打开浏览器并访问 http://127.0.0.1 或你的服务器 \<IP_ADDRESS\>;（默认端口为 \<PORT\> = 80）。你会进入 RAGFlow 欢迎页。祝你使用愉快！🍻

</template>
</BiRow>
