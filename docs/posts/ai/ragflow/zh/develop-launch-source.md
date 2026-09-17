# 从源码启动服务

本指南介绍如何从源码搭建 RAGFlow 服务。依照本指南操作后，你就可以使用源码进行调试。

## 目标读者

适合已经添加了新功能或修改了现有代码、并希望使用源码进行调试的开发者，*前提是*其机器已配置好目标部署环境。

## 前置条件

- CPU &ge; 4 核
- 内存 &ge; 16 GB
- 磁盘 &ge; 50 GB
- Docker &ge; 24.0.0 & Docker Compose &ge; v2.26.1

:::tip 注意
如果你还没有在本地机器（Windows、Mac 或 Linux）上安装 Docker，请参阅 [Docker Engine 安装指南](https://docs.docker.com/engine/install/)。
:::

## 从源码启动服务

要从源码启动 RAGFlow 服务：

### 克隆 RAGFlow 仓库

```bash
git clone https://github.com/infiniflow/ragflow.git
cd ragflow/
```

### 安装 Python 依赖

1. 安装 uv：

   ```bash
   pipx install uv
   ```

2. 安装 RAGFlow 服务的 Python 依赖：

   ```bash
   uv sync --python 3.13 --frozen
   ```
   *此命令会创建名为 `.venv` 的虚拟环境，并把所有 Python 依赖安装到这个新环境中。*

   如果你需要针对 RAGFlow 服务运行测试，请安装测试依赖：

   ```bash
   uv sync --python 3.13 --group test --frozen && uv pip install sdk/python --group test
   ```

### 启动第三方服务

以下命令使用 Docker Compose 启动 “base” 服务（MinIO、Elasticsearch、Redis 和 MySQL）：

```bash
docker compose -f docker/docker-compose-base.yml up -d
```

### 更新第三方服务的 `host` 与 `port` 设置

1. 在 `/etc/hosts` 中添加以下内容，把 **docker/service_conf.yaml.template** 中指定的所有主机都解析到 `127.0.0.1`：

   ```
   127.0.0.1       es01 infinity mysql minio redis
   ```

2. 在 **docker/service_conf.yaml.template** 中，按 **docker/.env** 中的配置，把 mysql 端口更新为 `5455`、es 端口更新为 `1200`。

### 启动 RAGFlow 后端服务

1. 注释掉 **docker/entrypoint.sh** 中的 `nginx` 行。

   ```
   # /usr/sbin/nginx
   ```

2. 激活 Python 虚拟环境：

   ```bash
   source .venv/bin/activate
   ```

3. **可选：**如果你无法访问 HuggingFace，可以设置 HF_ENDPOINT 环境变量来使用镜像站点：

   ```bash
   ```

4. 检查 **conf/service_conf.yaml** 中的配置，确保所有主机和端口都设置正确。
5. 运行 **entrypoint.sh** 脚本，启动后端服务：

   ```shell
   JEMALLOC_PATH=$(pkg-config --variable=libdir jemalloc)/libjemalloc.so;
   LD_PRELOAD=$JEMALLOC_PATH python rag/svr/task_executor.py -i 1;
   ```
   ```shell
   python api/ragflow_server.py;
   ```

### 启动 RAGFlow 前端服务

1. 进入 `web` 目录并安装前端依赖：

   ```bash
   cd web
   npm install
   ```

2. 启动 RAGFlow 前端服务，并把代理配置为指向 Python 后端：

   ```bash
   API_PROXY_SCHEME=python npm run dev
   ```

   `python` 代理方案会把 API 请求路由到端口 `9380` 上的 Python 后端；`go` 对应端口 `9384` 上的 Go 后端；同时运行两个后端时使用 `hybrid`。

   *随后会出现如下消息，显示前端服务的 IP 地址和端口号：*

![](/ragflow-images/0daf462c-a24d-4496-a66f-92533534e187.jpg)

### 访问 RAGFlow 服务

在浏览器中输入 `http://127.0.0.1:<PORT>/`，并确保端口号与上方截图所示一致。

### 开发完成后停止 RAGFlow 服务

1. 停止 RAGFlow 前端服务：
   ```bash
   pkill npm
   ```

2. 停止 RAGFlow 后端服务：
   ```bash
   pkill -f "docker/entrypoint.sh"
   ```
