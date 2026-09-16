# 构建 RAGFlow Docker 镜像

本指南介绍如何从源码构建 RAGFlow Docker 镜像。依照本指南操作后，你就能创建一个可用于开发、调试或测试的本地 Docker 镜像。

## 目标读者

- 已经添加了新功能或修改了现有代码、需要 Docker 镜像来查看和调试这些改动的开发者。
- 希望为 ARM64 平台构建 RAGFlow Docker 镜像的开发者。
- 想在 Docker 镜像中体验 RAGFlow 最新功能的测试人员。

## 前置条件

- CPU &ge; 4 核
- 内存 &ge; 16 GB
- 磁盘 &ge; 50 GB
- Docker &ge; 24.0.0 & Docker Compose &ge; v2.26.1

## 构建 Docker 镜像

该镜像大小约为 2 GB，并依赖外部 LLM 和嵌入服务。

:::danger 重要
- 我们也会在 ARM64 平台上测试 RAGFlow，但并不维护面向 ARM 的 RAGFlow Docker 镜像。不过，你同样可以在 `linux/arm64` 或 `darwin/arm64` 主机上自行构建镜像。
- 对于 ARM64 平台，请将 **pyproject.toml** 中的 `xgboost` 版本升级到 `1.6.0`，并确保正确安装 **unixODBC**。
:::

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/ragflow_deps
uv run python3 download_deps.py
docker build -f Dockerfile -t infiniflow/ragflow_deps .
cd ..
docker build -f Dockerfile -t infiniflow/ragflow:nightly .
```

## 在 macOS 上通过 Docker 启动 RAGFlow 服务

构建好 infiniflow/ragflow:nightly 镜像后，你就可以启动一个功能完整的 RAGFlow 服务，并附带 Elasticsearch、MySQL、MinIO、Redis 等所有必需组件。

## 示例：Apple M2 Pro（sequoia）

1. 编辑 Docker Compose 配置

打开 `docker/.env` 文件，找到 `RAGFLOW_IMAGE` 设置，把镜像引用从 `infiniflow/ragflow:v0.27.2` 改为 `infiniflow/ragflow:nightly`，以使用预构建的镜像。

2. 启动服务

```bash
cd docker
$ docker compose -f docker-compose-macos.yml up -d
```

3. 访问 RAGFlow 服务

设置完成后，打开浏览器并访问 http://127.0.0.1 或你的服务器 \<IP_ADDRESS\>;（默认端口为 \<PORT\> = 80）。你会进入 RAGFlow 欢迎页。祝你使用愉快！🍻
