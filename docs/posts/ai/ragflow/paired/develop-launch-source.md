<BiRow>
<template #en>

A guide explaining how to set up a RAGFlow service from its source code. By following this guide, you'll be able to debug using the source code.

</template>
<template #zh>

本指南介绍如何从源码搭建 RAGFlow 服务。依照本指南操作后，你就可以使用源码进行调试。

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

Developers who have added new features or modified existing code and wish to debug using the source code, *provided that* their machine has the target deployment environment set up.

</template>
<template #zh>

适合已经添加了新功能或修改了现有代码、并希望使用源码进行调试的开发者，*前提是*其机器已配置好目标部署环境。

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

:::tip NOTE
If you have not installed Docker on your local machine (Windows, Mac, or Linux), see the [Install Docker Engine](https://docs.docker.com/engine/install/) guide.
:::

</template>
<template #zh>

:::tip 注意
如果你还没有在本地机器（Windows、Mac 或 Linux）上安装 Docker，请参阅 [Docker Engine 安装指南](https://docs.docker.com/engine/install/)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Launch a Service from Source

</template>
<template #zh>

## 从源码启动服务

</template>
</BiRow>

<BiRow>
<template #en>

To launch a RAGFlow service from source code:

</template>
<template #zh>

要从源码启动 RAGFlow 服务：

</template>
</BiRow>

<BiRow>
<template #en>

### Clone the RAGFlow Repository

</template>
<template #zh>

### 克隆 RAGFlow 仓库

</template>
</BiRow>

<BiRow>
<template #en>

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/
```

</template>
<template #zh>

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/
```

</template>
</BiRow>

<BiRow>
<template #en>

### Install Python Dependencies

</template>
<template #zh>

### 安装 Python 依赖

</template>
</BiRow>

<BiRow>
<template #en>

1. Install uv:

</template>
<template #zh>

1. 安装 uv：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   pipx install uv
   ```

</template>
<template #zh>

   ```bash
   pipx install uv
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Install RAGFlow service's Python dependencies:

</template>
<template #zh>

2. 安装 RAGFlow 服务的 Python 依赖：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   uv sync --python 3.13 --frozen
   ```
   *A virtual environment named `.venv` is created, and all Python dependencies are installed into the new environment.*

</template>
<template #zh>

   ```bash
   uv sync --python 3.13 --frozen
   ```
   *此命令会创建名为 `.venv` 的虚拟环境，并把所有 Python 依赖安装到这个新环境中。*

</template>
</BiRow>

<BiRow>
<template #en>

   If you need to run tests against the RAGFlow service, install the test dependencies:

</template>
<template #zh>

   如果你需要针对 RAGFlow 服务运行测试，请安装测试依赖：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   uv sync --python 3.13 --group test --frozen && uv pip install sdk/python --group test
   ```

</template>
<template #zh>

   ```bash
   uv sync --python 3.13 --group test --frozen && uv pip install sdk/python --group test
   ```

</template>
</BiRow>

<BiRow>
<template #en>

### Launch Third-Party Services

</template>
<template #zh>

### 启动第三方服务

</template>
</BiRow>

<BiRow>
<template #en>

The following command launches the 'base' services (MinIO, Elasticsearch, Redis, and MySQL) using Docker Compose:

</template>
<template #zh>

以下命令使用 Docker Compose 启动 “base” 服务（MinIO、Elasticsearch、Redis 和 MySQL）：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -f docker/docker-compose-base.yml up -d
```

</template>
<template #zh>

```bash
docker compose -f docker/docker-compose-base.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

### Update `host` and `port` Settings for Third-Party Services

</template>
<template #zh>

### 更新第三方服务的 `host` 与 `port` 设置

</template>
</BiRow>

<BiRow>
<template #en>

1. Add the following line to `/etc/hosts` to resolve all hosts specified in **docker/service_conf.yaml.template** to `127.0.0.1`:

</template>
<template #zh>

1. 在 `/etc/hosts` 中添加以下内容，把 **docker/service_conf.yaml.template** 中指定的所有主机都解析到 `127.0.0.1`：

</template>
</BiRow>

<BiRow>
<template #en>

   ```
   127.0.0.1       es01 infinity mysql minio redis
   ```

</template>
<template #zh>

   ```
   127.0.0.1       es01 infinity mysql minio redis
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. In **docker/service_conf.yaml.template**, update mysql port to `5455` and es port to `1200`, as specified in **docker/.env**.

</template>
<template #zh>

2. 在 **docker/service_conf.yaml.template** 中，按 **docker/.env** 中的配置，把 mysql 端口更新为 `5455`、es 端口更新为 `1200`。

</template>
</BiRow>

<BiRow>
<template #en>

### Launch the RAGFlow Backend Service

</template>
<template #zh>

### 启动 RAGFlow 后端服务

</template>
</BiRow>

<BiRow>
<template #en>

1. Comment out the `nginx` line in **docker/entrypoint.sh**.

</template>
<template #zh>

1. 注释掉 **docker/entrypoint.sh** 中的 `nginx` 行。

</template>
</BiRow>

<BiRow>
<template #en>

   ```
   # /usr/sbin/nginx
   ```

</template>
<template #zh>

   ```
   # /usr/sbin/nginx
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Activate the Python virtual environment:

</template>
<template #zh>

2. 激活 Python 虚拟环境：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   source .venv/bin/activate
   ```

</template>
<template #zh>

   ```bash
   source .venv/bin/activate
   ```

</template>
</BiRow>

<BiRow>
<template #en>

3. **Optional:** If you cannot access HuggingFace, set the HF_ENDPOINT environment variable to use a mirror site:

</template>
<template #zh>

3. **可选：**如果你无法访问 HuggingFace，可以设置 HF_ENDPOINT 环境变量来使用镜像站点：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   ```

</template>
<template #zh>

   ```bash
   ```

</template>
</BiRow>

<BiRow>
<template #en>

4. Check the configuration in **conf/service_conf.yaml**, ensuring all hosts and ports are correctly set.
5. Run the **entrypoint.sh** script to launch the backend service:

</template>
<template #zh>

4. 检查 **conf/service_conf.yaml** 中的配置，确保所有主机和端口都设置正确。
5. 运行 **entrypoint.sh** 脚本，启动后端服务：

</template>
</BiRow>

<BiRow>
<template #en>

   ```shell
   JEMALLOC_PATH=$(pkg-config --variable=libdir jemalloc)/libjemalloc.so;
   LD_PRELOAD=$JEMALLOC_PATH python rag/svr/task_executor.py -i 1;
   ```
   ```shell
   python api/ragflow_server.py;
   ```

</template>
<template #zh>

   ```shell
   JEMALLOC_PATH=$(pkg-config --variable=libdir jemalloc)/libjemalloc.so;
   LD_PRELOAD=$JEMALLOC_PATH python rag/svr/task_executor.py -i 1;
   ```
   ```shell
   python api/ragflow_server.py;
   ```

</template>
</BiRow>

<BiRow>
<template #en>

### Launch the RAGFlow Frontend Service

</template>
<template #zh>

### 启动 RAGFlow 前端服务

</template>
</BiRow>

<BiRow>
<template #en>

1. Navigate to the `web` directory and install the frontend dependencies:

</template>
<template #zh>

1. 进入 `web` 目录并安装前端依赖：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   cd web
   npm install
   ```

</template>
<template #zh>

   ```bash
   cd web
   npm install
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Start the RAGFlow frontend service with the proxy configured for the Python backend:

</template>
<template #zh>

2. 启动 RAGFlow 前端服务，并把代理配置为指向 Python 后端：

</template>
</BiRow>

<BiRow>
<template #en>

   ```bash
   API_PROXY_SCHEME=python npm run dev
   ```

</template>
<template #zh>

   ```bash
   API_PROXY_SCHEME=python npm run dev
   ```

</template>
</BiRow>

<BiRow>
<template #en>

   The `python` proxy scheme routes API requests to the Python backend on port `9380`. Use `go` for the Go backend on port `9384`, or `hybrid` when running both backends.

</template>
<template #zh>

   `python` 代理方案会把 API 请求路由到端口 `9380` 上的 Python 后端；`go` 对应端口 `9384` 上的 Go 后端；同时运行两个后端时使用 `hybrid`。

</template>
</BiRow>

<BiRow>
<template #en>

   *The following message appears, showing the IP address and port number of your frontend service:*

</template>
<template #zh>

   *随后会出现如下消息，显示前端服务的 IP 地址和端口号：*

</template>
</BiRow>

<BiRow>
<template #en>

   ![](https://github.com/user-attachments/assets/0daf462c-a24d-4496-a66f-92533534e187)

</template>
<template #zh>

![](https://github.com/user-attachments/assets/0daf462c-a24d-4496-a66f-92533534e187)

</template>
</BiRow>

<BiRow>
<template #en>

### Access the RAGFlow Service

</template>
<template #zh>

### 访问 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

In your web browser, enter `http://127.0.0.1:<PORT>/`, ensuring the port number matches that shown in the screenshot above.

</template>
<template #zh>

在浏览器中输入 `http://127.0.0.1:<PORT>/`，并确保端口号与上方截图所示一致。

</template>
</BiRow>

<BiRow>
<template #en>

### Stop the RAGFlow Service When the Development Is Done

</template>
<template #zh>

### 开发完成后停止 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

1. Stop the RAGFlow frontend service:
   ```bash
   pkill npm
   ```

</template>
<template #zh>

1. 停止 RAGFlow 前端服务：
   ```bash
   pkill npm
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Stop the RAGFlow backend service:
   ```bash
   pkill -f "docker/entrypoint.sh"
   ```

</template>
<template #zh>

2. 停止 RAGFlow 后端服务：
   ```bash
   pkill -f "docker/entrypoint.sh"
   ```

</template>
</BiRow>
