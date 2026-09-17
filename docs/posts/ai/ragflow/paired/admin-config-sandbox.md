<BiRow>
<template #en>

RAGFlow's `CodeExec` agent component needs a sandbox provider to run Python and JavaScript code.

</template>
<template #zh>

RAGFlow 的 `CodeExec` Agent 组件需要一个沙箱提供商（sandbox provider）才能运行 Python 和 JavaScript 代码。

</template>
</BiRow>

<BiRow>
<template #en>

The simplest setup flow is:

</template>
<template #zh>

最简单的配置流程如下：

</template>
</BiRow>

<BiRow>
<template #en>

1. Start the required sandbox services.
2. Open the RAGFlow admin page.
3. Go to **Admin > Sandbox Settings**.
4. Choose a provider and save the configuration.
5. Test the connection in the same page.

</template>
<template #zh>

1. 启动所需的沙箱服务。
2. 打开 RAGFlow 管理后台。
3. 进入 **Admin > Sandbox Settings**。
4. 选择一个提供商并保存配置。
5. 在同一页面中测试连接。

</template>
</BiRow>

<BiRow>
<template #en>

## Admin page

</template>
<template #zh>

## 管理后台页面

</template>
</BiRow>

<BiRow>
<template #en>

Configure sandbox providers from the admin page:

</template>
<template #zh>

在管理后台页面配置沙箱提供商：

</template>
</BiRow>

<BiRow>
<template #en>

- `self_managed`: Uses the executor manager service.
- `local`: Runs code on the current machine.
- `ssh`: Runs code on a remote machine over SSH.
- `aliyun_codeinterpreter`, `e2b`, and `tenki`: Cloud providers.

</template>
<template #zh>

- `self_managed`：使用执行器管理器（executor manager）服务。
- `local`：在当前机器上运行代码。
- `ssh`：通过 SSH 在远程机器上运行代码。
- `aliyun_codeinterpreter`、`e2b` 和 `tenki`：云端提供商。

</template>
</BiRow>

<BiRow>
<template #en>

<img width="2547" height="1475" alt="admin-sandbox-settings" src="/ragflow-images/59ab948e-b98a-45a8-9db4-f1afbf6c3685.png" />

</template>
<template #zh>

<img width="2547" height="1475" alt="admin-sandbox-settings" src="/ragflow-images/59ab948e-b98a-45a8-9db4-f1afbf6c3685.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Provider options

</template>
<template #zh>

## 提供商选项

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow supports multiple sandbox providers. Configure the active provider in
Admin > Sandbox Settings after the services are up.

</template>
<template #zh>

RAGFlow 支持多种沙箱提供商。服务启动后，在 Admin > Sandbox Settings 中配置当前生效的提供商。

</template>
</BiRow>

<BiRow>
<template #en>

- `self_managed`: Runs code inside Docker-managed sandbox containers. This is the default provider.
- `local`: Runs code as local Python or Node.js subprocesses. Use this only in trusted development environments.
- `ssh`: Runs code on a remote machine over SSH.
- `aliyun_codeinterpreter` and `e2b`: Cloud-hosted providers that remain available in the admin provider list.
- `tenki`: Cloud-hosted provider that runs each execution in a disposable [Tenki](https://tenki.cloud) microVM. See [Tenki](#tenki) below.

</template>
<template #zh>

- `self_managed`：在 Docker 管理的沙箱容器中运行代码。这是默认提供商。
- `local`：以本地 Python 或 Node.js 子进程的方式运行代码。请仅在可信的开发环境中使用。
- `ssh`：通过 SSH 在远程机器上运行代码。
- `aliyun_codeinterpreter` 和 `e2b`：云端托管的提供商，仍保留在管理后台的提供商列表中。
- `tenki`：云端托管的提供商，每次执行都在一个一次性的 [Tenki](https://tenki.cloud) microVM 中运行。参见下文 [Tenki](#tenki)。

</template>
</BiRow>

<BiRow>
<template #en>

### Tenki

</template>
<template #zh>

### Tenki

</template>
</BiRow>

<BiRow>
<template #en>

`tenki` runs each code execution in a fresh Tenki microVM and destroys it afterwards. It is cloud-hosted, so it needs no local sandbox services, gVisor, or Docker base images — only outbound network access and an API key.

</template>
<template #zh>

`tenki` 的每次代码执行都在一个全新的 Tenki microVM 中进行，执行结束后将其销毁。它托管在云端，因此不需要本地沙箱服务、gVisor 或 Docker 基础镜像——只需要出站网络访问和一个 API key。

</template>
</BiRow>

<BiRow>
<template #en>

The `tenki-sandbox` SDK is an optional dependency (it requires `protobuf>=6.31`, which differs from RAGFlow's default gRPC stack), so it is not installed by default. Install it into the RAGFlow runtime before selecting this provider:

</template>
<template #zh>

`tenki-sandbox` SDK 是一个可选依赖（它要求 `protobuf>=6.31`，与 RAGFlow 默认的 gRPC 栈不同），因此默认不安装。在选择该提供商之前，请先将其安装到 RAGFlow 运行时：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
pip install tenki-sandbox
```

</template>
<template #zh>

```bash
pip install tenki-sandbox
```

</template>
</BiRow>

<BiRow>
<template #en>

Configure it in **Admin > Sandbox Settings**:

</template>
<template #zh>

在 **Admin > Sandbox Settings** 中完成配置：

</template>
</BiRow>

<BiRow>
<template #en>

- `api_key` (required): Tenki API key. Create one at [app.tenki.cloud](https://app.tenki.cloud) under **API Keys**.
- `project_id` (required): the Tenki project that sandboxes are created under.
- `base_url` (optional): override the Tenki API endpoint.
- `image` (optional): sandbox base image. Leave empty to use the Tenki default image, which includes `python3` and `node`.
- `allow_outbound` (optional, security-relevant): whether the sandbox may make outbound network connections. Defaults to `false` so sandboxed code has no network access; set it to `true` when code needs the network (for example, to install packages).
- `timeout`, `max_lifetime`, `cpu_cores`, `memory_mb`, `disk_size_gb`, and the output/artifact limits have sensible defaults and can be tuned in the same page.

</template>
<template #zh>

- `api_key`（必填）：Tenki API key。在 [app.tenki.cloud](https://app.tenki.cloud) 的 **API Keys** 下创建。
- `project_id`（必填）：沙箱创建时归属的 Tenki 项目。
- `base_url`（可选）：覆盖 Tenki API 端点。
- `image`（可选）：沙箱基础镜像。留空则使用 Tenki 默认镜像，其中包含 `python3` 和 `node`。
- `allow_outbound`（可选，与安全相关）：沙箱是否可以发起出站网络连接。默认为 `false`，即沙箱中的代码没有网络访问；当代码需要网络时（例如安装软件包），设为 `true`。
- `timeout`、`max_lifetime`、`cpu_cores`、`memory_mb`、`disk_size_gb` 以及输出/产物限制均有合理的默认值，可在同一页面中调整。

</template>
</BiRow>

<BiRow>
<template #en>

Notes:

</template>
<template #zh>

注意：

</template>
</BiRow>

<BiRow>
<template #en>

- Supported languages are Python and JavaScript.
- Files written to the `artifacts/` directory of the working directory are returned as run artifacts.
- The provider uses only Tenki's create/exec/destroy operations; it does not use volumes or snapshots.

</template>
<template #zh>

- 支持的语言是 Python 和 JavaScript。
- 写入工作目录下 `artifacts/` 目录中的文件会作为运行产物返回。
- 该提供商只使用 Tenki 的 create/exec/destroy 操作；不使用卷或快照。

</template>
</BiRow>

<BiRow>
<template #en>

## Prerequisites

</template>
<template #zh>

## 前提条件

</template>
</BiRow>

<BiRow>
<template #en>

- Linux distribution compatible with gVisor.
- gVisor installed and configured.
- Docker version 25.0 or higher (API 1.44+). Ensure your executor manager image ships with Docker CLI `29.1.0` or higher to stay compatible with the latest Docker daemons.
- Docker Compose version 2.26.1 or higher (similar to RAGFlow requirements).
- uv package and project manager installed.
- (Optional) GNU Make for simplified command-line management.

</template>
<template #zh>

- 与 gVisor 兼容的 Linux 发行版。
- 已安装并配置好 gVisor。
- Docker 25.0 或更高版本（API 1.44+）。请确保执行器管理器镜像自带的 Docker CLI 不低于 `29.1.0`，以兼容最新的 Docker 守护进程。
- Docker Compose 2.26.1 或更高版本（与 RAGFlow 的要求类似）。
- 已安装 uv 包管理器和项目管理器。
- （可选）GNU Make，用于简化命令行管理。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
The error message `client version 1.43 is too old. Minimum supported API version is 1.44` indicates that your executor manager image's built-in Docker CLI version is lower than `29.1.0` required by the Docker daemon in use.
:::

</template>
<template #zh>

:::tip 注意
错误信息 `client version 1.43 is too old. Minimum supported API version is 1.44` 表示你的执行器管理器镜像内置的 Docker CLI 版本低于当前所用 Docker 守护进程要求的 `29.1.0`。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Build Docker base images

</template>
<template #zh>

## 构建 Docker 基础镜像

</template>
</BiRow>

<BiRow>
<template #en>

The sandbox uses isolated base images for secure containerized execution environments.

</template>
<template #zh>

沙箱使用相互隔离的基础镜像，以构建安全的容器化执行环境。

</template>
</BiRow>

<BiRow>
<template #en>

### Option 1: Build from source

</template>
<template #zh>

### 方式 1：从源码构建

</template>
</BiRow>

<BiRow>
<template #en>

Build the runtime base images:

</template>
<template #zh>

构建运行时基础镜像：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker build -t sandbox-base-python:latest ./sandbox_base_image/python
docker build -t sandbox-base-nodejs:latest ./sandbox_base_image/nodejs
```

</template>
<template #zh>

```bash
docker build -t sandbox-base-python:latest ./sandbox_base_image/python
docker build -t sandbox-base-nodejs:latest ./sandbox_base_image/nodejs
```

</template>
</BiRow>

<BiRow>
<template #en>

Alternatively, build all base images at once using the Makefile:

</template>
<template #zh>

或者，使用 Makefile 一次性构建全部基础镜像：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
make build
```

</template>
<template #zh>

```bash
make build
```

</template>
</BiRow>

<BiRow>
<template #en>

Build the executor manager image:

</template>
<template #zh>

构建执行器管理器镜像：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker build -t sandbox-executor-manager:latest ./executor_manager
```

</template>
<template #zh>

```bash
docker build -t sandbox-executor-manager:latest ./executor_manager
```

</template>
</BiRow>

<BiRow>
<template #en>

### Option 2: Pull base images from Docker Hub

</template>
<template #zh>

### 方式 2：从 Docker Hub 拉取基础镜像

</template>
</BiRow>

<BiRow>
<template #en>

If you do not need to customize runtime dependencies, pull the published base images and tag them with the names used by standalone Docker Compose:

</template>
<template #zh>

如果不需要自定义运行时依赖，可以拉取已发布的基础镜像，并打上独立 Docker Compose 所使用的镜像名标签：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker pull infiniflow/sandbox-base-python:latest
docker pull infiniflow/sandbox-base-nodejs:latest

docker tag infiniflow/sandbox-base-python:latest sandbox-base-python:latest
docker tag infiniflow/sandbox-base-nodejs:latest sandbox-base-nodejs:latest
```

</template>
<template #zh>

```bash
docker pull infiniflow/sandbox-base-python:latest
docker pull infiniflow/sandbox-base-nodejs:latest

docker tag infiniflow/sandbox-base-python:latest sandbox-base-python:latest
docker tag infiniflow/sandbox-base-nodejs:latest sandbox-base-nodejs:latest
```

</template>
</BiRow>

<BiRow>
<template #en>

Then restart the standalone sandbox services:

</template>
<template #zh>

然后重启独立的沙箱服务：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml up -d
```

</template>
<template #zh>

```bash
docker compose -f docker-compose.yml down
docker compose -f docker-compose.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

## Running with RAGFlow

</template>
<template #zh>

## 配合 RAGFlow 运行

</template>
</BiRow>

<BiRow>
<template #en>

1. Verify that gVisor is properly installed and operational.
2. Configure the .env file located at docker/.env:
- Set `SANDBOX_ENABLED=1`.
- Include `sandbox` in `COMPOSE_PROFILES` if you want the default
  `self_managed` executor-manager service.
- Keep the self-managed deployment defaults in `.env` if you need to change the
  sandbox-executor-manager image, pool size, base images, seccomp, memory, or
  timeout.

</template>
<template #zh>

1. 确认 gVisor 已正确安装并正常运行。
2. 配置位于 docker/.env 的 .env 文件：
- 设置 `SANDBOX_ENABLED=1`。
- 如需默认的 `self_managed` 执行器管理器服务，请在 `COMPOSE_PROFILES` 中加入 `sandbox`。
- 如需修改 sandbox-executor-manager 镜像、池大小、基础镜像、seccomp、内存或超时，请保留 `.env` 中的自管部署默认值。

</template>
</BiRow>

<BiRow>
<template #en>

3. Add the following entry to your /etc/hosts file to resolve the executor manager service:

</template>
<template #zh>

3. 在你的 /etc/hosts 文件中添加以下条目，用于解析执行器管理器服务：

</template>
</BiRow>

<BiRow>
<template #en>

    ```bash
    127.0.0.1 es01 infinity mysql minio redis sandbox-executor-manager
    ```

</template>
<template #zh>

    ```bash
    127.0.0.1 es01 infinity mysql minio redis sandbox-executor-manager
    ```

</template>
</BiRow>

<BiRow>
<template #en>

4. Start the RAGFlow service as usual.
5. Open **Admin > Sandbox Settings**.
6. Select a provider.
7. Fill in the required fields.
8. Click **Save**.
9. Click **Test Connection** if needed.

</template>
<template #zh>

4. 照常启动 RAGFlow 服务。
5. 打开 **Admin > Sandbox Settings**。
6. 选择一个提供商。
7. 填写必填字段。
8. 点击 **Save**。
9. 如有需要，点击 **Test Connection**。

</template>
</BiRow>

<BiRow>
<template #en>

## Environment variables

</template>
<template #zh>

## 环境变量

</template>
</BiRow>

<BiRow>
<template #en>

The variables in `docker/.env` are grouped by scope.

</template>
<template #zh>

`docker/.env` 中的变量按作用域分组。

</template>
</BiRow>

<BiRow>
<template #en>

### System-level variables

</template>
<template #zh>

### 系统级变量

</template>
</BiRow>

<BiRow>
<template #en>

These variables apply to sandbox support in general:

</template>
<template #zh>

以下变量总体作用于沙箱支持：

</template>
</BiRow>

<BiRow>
<template #en>

- `SANDBOX_ENABLED`: Enables sandbox support in RAGFlow.
- `COMPOSE_PROFILES`: Include `sandbox` to start the default self-managed executor-manager service.
- `SANDBOX_ARTIFACT_BUCKET`: MinIO bucket used for files generated by sandbox code.
- `SANDBOX_ARTIFACT_EXPIRE_DAYS`: Number of days before sandbox artifacts expire.

</template>
<template #zh>

- `SANDBOX_ENABLED`：在 RAGFlow 中启用沙箱支持。
- `COMPOSE_PROFILES`：加入 `sandbox` 以启动默认的自管执行器管理器服务。
- `SANDBOX_ARTIFACT_BUCKET`：存放沙箱代码所生成文件的 MinIO 存储桶。
- `SANDBOX_ARTIFACT_EXPIRE_DAYS`：沙箱产物过期前的天数。

</template>
</BiRow>

<BiRow>
<template #en>

### Self-managed deployment defaults

</template>
<template #zh>

### 自管部署默认值

</template>
</BiRow>

<BiRow>
<template #en>

These variables are shown in Admin as deployment defaults for `self_managed`.
Changing them requires restarting `sandbox-executor-manager`.

</template>
<template #zh>

这些变量在管理后台中作为 `self_managed` 的部署默认值展示。
修改它们后需要重启 `sandbox-executor-manager`。

</template>
</BiRow>

<BiRow>
<template #en>

- `SANDBOX_EXECUTOR_MANAGER_IMAGE`: Docker image for the executor manager service.
- `SANDBOX_EXECUTOR_MANAGER_POOL_SIZE`: Number of Python and Node.js sandbox containers kept in the pool.
- `SANDBOX_BASE_PYTHON_IMAGE`: Python runtime image used by executor-managed containers.
- `SANDBOX_BASE_NODEJS_IMAGE`: Node.js runtime image used by executor-managed containers.
- `SANDBOX_EXECUTOR_MANAGER_PORT`: Host port exposed by the executor manager.
- `SANDBOX_ENABLE_SECCOMP`: Enables the optional seccomp profile for sandbox containers.
- `SANDBOX_MAX_MEMORY`: Memory limit for each sandbox runtime container.
- `SANDBOX_TIMEOUT`: Default execution timeout.

</template>
<template #zh>

- `SANDBOX_EXECUTOR_MANAGER_IMAGE`：执行器管理器服务的 Docker 镜像。
- `SANDBOX_EXECUTOR_MANAGER_POOL_SIZE`：池中保持的 Python 和 Node.js 沙箱容器数量。
- `SANDBOX_BASE_PYTHON_IMAGE`：执行器管理的容器使用的 Python 运行时镜像。
- `SANDBOX_BASE_NODEJS_IMAGE`：执行器管理的容器使用的 Node.js 运行时镜像。
- `SANDBOX_EXECUTOR_MANAGER_PORT`：执行器管理器对外暴露的主机端口。
- `SANDBOX_ENABLE_SECCOMP`：为沙箱容器启用可选的 seccomp 配置。
- `SANDBOX_MAX_MEMORY`：每个沙箱运行时容器的内存上限。
- `SANDBOX_TIMEOUT`：默认执行超时时间。

</template>
</BiRow>

<BiRow>
<template #en>

### Admin-managed runtime settings

</template>
<template #zh>

### 管理后台管理的运行时设置

</template>
</BiRow>

<BiRow>
<template #en>

Provider selection and runtime settings are configured in **Admin > Sandbox Settings**.

</template>
<template #zh>

提供商选择和运行时设置在 **Admin > Sandbox Settings** 中配置。

</template>
</BiRow>

<BiRow>
<template #en>

Examples:

</template>
<template #zh>

示例：

</template>
</BiRow>

<BiRow>
<template #en>

- Choose the active provider
- Configure `self_managed` runtime settings
- Configure all `local` settings
- Configure all `ssh` settings

</template>
<template #zh>

- 选择当前生效的提供商
- 配置 `self_managed` 运行时设置
- 配置全部 `local` 设置
- 配置全部 `ssh` 设置

</template>
</BiRow>

<BiRow>
<template #en>

For `self_managed`:

</template>
<template #zh>

对于 `self_managed`：

</template>
</BiRow>

<BiRow>
<template #en>

- Runtime settings are editable in Admin
- Deployment defaults come from `.env` and are shown as read-only values

</template>
<template #zh>

- 运行时设置可在管理后台中编辑
- 部署默认值来自 `.env`，并以只读值展示

</template>
</BiRow>

<BiRow>
<template #en>

## Running standalone

</template>
<template #zh>

## 独立运行

</template>
</BiRow>

<BiRow>
<template #en>

### Manual setup

</template>
<template #zh>

### 手动设置

</template>
</BiRow>

<BiRow>
<template #en>

1. Initialize the environment variables:

</template>
<template #zh>

1. 初始化环境变量：

</template>
</BiRow>

<BiRow>
<template #en>

    ```bash
    cp .env.example .env
    ```

</template>
<template #zh>

    ```bash
    cp .env.example .env
    ```

</template>
</BiRow>

<BiRow>
<template #en>

2. Launch the sandbox services with Docker Compose:

</template>
<template #zh>

2. 用 Docker Compose 启动沙箱服务：

</template>
</BiRow>

<BiRow>
<template #en>

    ```bash
    docker compose -f docker-compose.yml up
    ```

</template>
<template #zh>

    ```bash
    docker compose -f docker-compose.yml up
    ```

</template>
</BiRow>

<BiRow>
<template #en>

3. Test the sandbox setup:

</template>
<template #zh>

3. 测试沙箱配置：

</template>
</BiRow>

<BiRow>
<template #en>

    ```bash
    source .venv/bin/activate
    uv pip install -r executor_manager/requirements.txt
    uv run tests/sandbox_security_tests_full.py
    ```

</template>
<template #zh>

    ```bash
    source .venv/bin/activate
    uv pip install -r executor_manager/requirements.txt
    uv run tests/sandbox_security_tests_full.py
    ```

</template>
</BiRow>

<BiRow>
<template #en>

### Using Makefile

</template>
<template #zh>

### 使用 Makefile

</template>
</BiRow>

<BiRow>
<template #en>

Run all setup, build, launch, and tests with a single command:

</template>
<template #zh>

一条命令完成全部设置、构建、启动和测试：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
make
```

</template>
<template #zh>

```bash
make
```

</template>
</BiRow>

<BiRow>
<template #en>

### Monitoring

</template>
<template #zh>

### 监控

</template>
</BiRow>

<BiRow>
<template #en>

To follow logs of the executor manager container:

</template>
<template #zh>

跟踪执行器管理器容器的日志：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker logs -f sandbox-executor-manager
```

</template>
<template #zh>

```bash
docker logs -f sandbox-executor-manager
```

</template>
</BiRow>

<BiRow>
<template #en>

Or use the Makefile shortcut:

</template>
<template #zh>

或使用 Makefile 快捷命令：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
make logs
```

</template>
<template #zh>

```bash
make logs
```

</template>
</BiRow>
