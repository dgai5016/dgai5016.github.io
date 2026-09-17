# 沙箱快速开始

RAGFlow 的 `CodeExec` Agent 组件需要一个沙箱提供商（sandbox provider）才能运行 Python 和 JavaScript 代码。

最简单的配置流程如下：

1. 启动所需的沙箱服务。
2. 打开 RAGFlow 管理后台。
3. 进入 **Admin > Sandbox Settings**。
4. 选择一个提供商并保存配置。
5. 在同一页面中测试连接。

## 管理后台页面

在管理后台页面配置沙箱提供商：

- `self_managed`：使用执行器管理器（executor manager）服务。
- `local`：在当前机器上运行代码。
- `ssh`：通过 SSH 在远程机器上运行代码。
- `aliyun_codeinterpreter`、`e2b` 和 `tenki`：云端提供商。

<img width="2547" height="1475" alt="admin-sandbox-settings" src="/ragflow-images/59ab948e-b98a-45a8-9db4-f1afbf6c3685.png" />

## 提供商选项

RAGFlow 支持多种沙箱提供商。服务启动后，在 Admin > Sandbox Settings 中配置当前生效的提供商。

- `self_managed`：在 Docker 管理的沙箱容器中运行代码。这是默认提供商。
- `local`：以本地 Python 或 Node.js 子进程的方式运行代码。请仅在可信的开发环境中使用。
- `ssh`：通过 SSH 在远程机器上运行代码。
- `aliyun_codeinterpreter` 和 `e2b`：云端托管的提供商，仍保留在管理后台的提供商列表中。
- `tenki`：云端托管的提供商，每次执行都在一个一次性的 [Tenki](https://tenki.cloud) microVM 中运行。参见下文 [Tenki](#tenki)。

### Tenki

`tenki` 的每次代码执行都在一个全新的 Tenki microVM 中进行，执行结束后将其销毁。它托管在云端，因此不需要本地沙箱服务、gVisor 或 Docker 基础镜像——只需要出站网络访问和一个 API key。

`tenki-sandbox` SDK 是一个可选依赖（它要求 `protobuf>=6.31`，与 RAGFlow 默认的 gRPC 栈不同），因此默认不安装。在选择该提供商之前，请先将其安装到 RAGFlow 运行时：

```bash
pip install tenki-sandbox
```

在 **Admin > Sandbox Settings** 中完成配置：

- `api_key`（必填）：Tenki API key。在 [app.tenki.cloud](https://app.tenki.cloud) 的 **API Keys** 下创建。
- `project_id`（必填）：沙箱创建时归属的 Tenki 项目。
- `base_url`（可选）：覆盖 Tenki API 端点。
- `image`（可选）：沙箱基础镜像。留空则使用 Tenki 默认镜像，其中包含 `python3` 和 `node`。
- `allow_outbound`（可选，与安全相关）：沙箱是否可以发起出站网络连接。默认为 `false`，即沙箱中的代码没有网络访问；当代码需要网络时（例如安装软件包），设为 `true`。
- `timeout`、`max_lifetime`、`cpu_cores`、`memory_mb`、`disk_size_gb` 以及输出/产物限制均有合理的默认值，可在同一页面中调整。

注意：

- 支持的语言是 Python 和 JavaScript。
- 写入工作目录下 `artifacts/` 目录中的文件会作为运行产物返回。
- 该提供商只使用 Tenki 的 create/exec/destroy 操作；不使用卷或快照。

## 前提条件

- 与 gVisor 兼容的 Linux 发行版。
- 已安装并配置好 gVisor。
- Docker 25.0 或更高版本（API 1.44+）。请确保执行器管理器镜像自带的 Docker CLI 不低于 `29.1.0`，以兼容最新的 Docker 守护进程。
- Docker Compose 2.26.1 或更高版本（与 RAGFlow 的要求类似）。
- 已安装 uv 包管理器和项目管理器。
- （可选）GNU Make，用于简化命令行管理。

:::tip 注意
错误信息 `client version 1.43 is too old. Minimum supported API version is 1.44` 表示你的执行器管理器镜像内置的 Docker CLI 版本低于当前所用 Docker 守护进程要求的 `29.1.0`。
:::

## 构建 Docker 基础镜像

沙箱使用相互隔离的基础镜像，以构建安全的容器化执行环境。

### 方式 1：从源码构建

构建运行时基础镜像：

```bash
docker build -t sandbox-base-python:latest ./sandbox_base_image/python
docker build -t sandbox-base-nodejs:latest ./sandbox_base_image/nodejs
```

或者，使用 Makefile 一次性构建全部基础镜像：

```bash
make build
```

构建执行器管理器镜像：

```bash
docker build -t sandbox-executor-manager:latest ./executor_manager
```

### 方式 2：从 Docker Hub 拉取基础镜像

如果不需要自定义运行时依赖，可以拉取已发布的基础镜像，并打上独立 Docker Compose 所使用的镜像名标签：

```bash
docker pull infiniflow/sandbox-base-python:latest
docker pull infiniflow/sandbox-base-nodejs:latest

docker tag infiniflow/sandbox-base-python:latest sandbox-base-python:latest
docker tag infiniflow/sandbox-base-nodejs:latest sandbox-base-nodejs:latest
```

然后重启独立的沙箱服务：

```bash
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml up -d
```

## 配合 RAGFlow 运行

1. 确认 gVisor 已正确安装并正常运行。
2. 配置位于 docker/.env 的 .env 文件：
- 设置 `SANDBOX_ENABLED=1`。
- 如需默认的 `self_managed` 执行器管理器服务，请在 `COMPOSE_PROFILES` 中加入 `sandbox`。
- 如需修改 sandbox-executor-manager 镜像、池大小、基础镜像、seccomp、内存或超时，请保留 `.env` 中的自管部署默认值。

3. 在你的 /etc/hosts 文件中添加以下条目，用于解析执行器管理器服务：

    ```bash
    127.0.0.1 es01 infinity mysql minio redis sandbox-executor-manager
    ```

4. 照常启动 RAGFlow 服务。
5. 打开 **Admin > Sandbox Settings**。
6. 选择一个提供商。
7. 填写必填字段。
8. 点击 **Save**。
9. 如有需要，点击 **Test Connection**。

## 环境变量

`docker/.env` 中的变量按作用域分组。

### 系统级变量

以下变量总体作用于沙箱支持：

- `SANDBOX_ENABLED`：在 RAGFlow 中启用沙箱支持。
- `COMPOSE_PROFILES`：加入 `sandbox` 以启动默认的自管执行器管理器服务。
- `SANDBOX_ARTIFACT_BUCKET`：存放沙箱代码所生成文件的 MinIO 存储桶。
- `SANDBOX_ARTIFACT_EXPIRE_DAYS`：沙箱产物过期前的天数。

### 自管部署默认值

这些变量在管理后台中作为 `self_managed` 的部署默认值展示。
修改它们后需要重启 `sandbox-executor-manager`。

- `SANDBOX_EXECUTOR_MANAGER_IMAGE`：执行器管理器服务的 Docker 镜像。
- `SANDBOX_EXECUTOR_MANAGER_POOL_SIZE`：池中保持的 Python 和 Node.js 沙箱容器数量。
- `SANDBOX_BASE_PYTHON_IMAGE`：执行器管理的容器使用的 Python 运行时镜像。
- `SANDBOX_BASE_NODEJS_IMAGE`：执行器管理的容器使用的 Node.js 运行时镜像。
- `SANDBOX_EXECUTOR_MANAGER_PORT`：执行器管理器对外暴露的主机端口。
- `SANDBOX_ENABLE_SECCOMP`：为沙箱容器启用可选的 seccomp 配置。
- `SANDBOX_MAX_MEMORY`：每个沙箱运行时容器的内存上限。
- `SANDBOX_TIMEOUT`：默认执行超时时间。

### 管理后台管理的运行时设置

提供商选择和运行时设置在 **Admin > Sandbox Settings** 中配置。

示例：

- 选择当前生效的提供商
- 配置 `self_managed` 运行时设置
- 配置全部 `local` 设置
- 配置全部 `ssh` 设置

对于 `self_managed`：

- 运行时设置可在管理后台中编辑
- 部署默认值来自 `.env`，并以只读值展示

## 独立运行

### 手动设置

1. 初始化环境变量：

    ```bash
    cp .env.example .env
    ```

2. 用 Docker Compose 启动沙箱服务：

    ```bash
    docker compose -f docker-compose.yml up
    ```

3. 测试沙箱配置：

    ```bash
    source .venv/bin/activate
    uv pip install -r executor_manager/requirements.txt
    uv run tests/sandbox_security_tests_full.py
    ```

### 使用 Makefile

一条命令完成全部设置、构建、启动和测试：

```bash
make
```

### 监控

跟踪执行器管理器容器的日志：

```bash
docker logs -f sandbox-executor-manager
```

或使用 Makefile 快捷命令：

```bash
make logs
```
