<BiRow>
<template #en>

Launch an MCP server from source or via Docker.

</template>
<template #zh>

从源码或通过 Docker 启动 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

A RAGFlow Model Context Protocol (MCP) server is designed as an independent component to complement the RAGFlow server. Note that an MCP server must operate alongside a properly functioning RAGFlow server.

</template>
<template #zh>

RAGFlow MCP（Model Context Protocol，模型上下文协议）服务器是一个独立组件，用于补充 RAGFlow 服务器的功能。注意，MCP 服务器必须与一个正常运行的 RAGFlow 服务器配合使用。

</template>
</BiRow>

<BiRow>
<template #en>

An MCP server can start up in either self-host mode (default) or host mode:

</template>
<template #zh>

MCP 服务器能以自托管模式（self-host mode，默认）或宿主模式（host mode）启动：

</template>
</BiRow>

<BiRow>
<template #en>

- **Self-host mode**:
  When launching an MCP server in self-host mode, you must provide an API key to authenticate the MCP server with the RAGFlow server. In this mode, the MCP server can access *only* the datasets of a specified tenant on the RAGFlow server.
- **Host mode**:
  In host mode, each MCP client can access their own datasets on the RAGFlow server. However, each client request must include a valid API key to authenticate the client with the RAGFlow server.

</template>
<template #zh>

- **自托管模式（self-host mode）**：
  以自托管模式启动 MCP 服务器时，你必须提供一个 API key，用于向 RAGFlow 服务器认证该 MCP 服务器。在此模式下，MCP 服务器*仅*能访问 RAGFlow 服务器上指定租户的数据集。
- **宿主模式（host mode）**：
  在宿主模式下，每个 MCP 客户端都可以访问自己在 RAGFlow 服务器上的数据集。但每个客户端请求都必须携带有效的 API key，用于向 RAGFlow 服务器认证该客户端。

</template>
</BiRow>

<BiRow>
<template #en>

Once a connection is established, an MCP server communicates with its client in MCP HTTP+SSE (Server-Sent Events) mode, unidirectionally pushing responses from the RAGFlow server to its client in real time.

</template>
<template #zh>

连接建立后，MCP 服务器以 MCP HTTP+SSE（Server-Sent Events，服务器推送事件）模式与其客户端通信，将 RAGFlow 服务器的响应单向实时推送给客户端。

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

1. Ensure RAGFlow is upgraded to v0.18.0 or later.
2. Have your RAGFlow API key ready. See [Acquire a RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key).

</template>
<template #zh>

1. 确保 RAGFlow 已升级到 v0.18.0 或更高版本。
2. 准备好你的 RAGFlow API key。参见[获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip INFO
If you wish to try out our MCP server without upgrading RAGFlow, community contributor [yiminghub2024](https://github.com/yiminghub2024) 👏 shares their recommended steps [here](#launch-an-mcp-server-without-upgrading-ragflow).
:::

</template>
<template #zh>

:::tip 信息
如果想在不升级 RAGFlow 的情况下试用我们的 MCP 服务器，社区贡献者 [yiminghub2024](https://github.com/yiminghub2024) 👏 在[此处](#launch-an-mcp-server-without-upgrading-ragflow)分享了他们推荐的步骤。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Launch an MCP Server

</template>
<template #zh>

## 启动 MCP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

You can start an MCP server either from source code or via Docker.

</template>
<template #zh>

你可以从源码或通过 Docker 启动 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

### Launch from Source Code

</template>
<template #zh>

### 从源码启动

</template>
</BiRow>

<BiRow>
<template #en>

1. Ensure that a RAGFlow server v0.18.0+ is properly running.
2. Launch the MCP server:

</template>
<template #zh>

1. 确保 RAGFlow 服务器 v0.18.0+ 正常运行。
2. 启动 MCP 服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
# Launch the MCP server to work in self-host mode, run either of the following
uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --api-key=ragflow-xxxxx
# uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --mode=self-host --api-key=ragflow-xxxxx

# To launch the MCP server to work in host mode, run the following instead:
# uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --mode=host
```

</template>
<template #zh>

```bash
# Launch the MCP server to work in self-host mode, run either of the following
uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --api-key=ragflow-xxxxx
# uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --mode=self-host --api-key=ragflow-xxxxx

# To launch the MCP server to work in host mode, run the following instead:
# uv run mcp/server/server.py --host=127.0.0.1 --port=9382 --base-url=http://127.0.0.1:9380 --mode=host
```

</template>
</BiRow>

<BiRow>
<template #en>

Where:

</template>
<template #zh>

其中：

</template>
</BiRow>

<BiRow>
<template #en>

- `host`: The MCP server's host address.
- `port`: The MCP server's listening port.
- `base_url`: The address of the running RAGFlow server.
- `mode`: The launch mode.
  - `self-host`: (default) self-host mode.
  - `host`: host mode.
- `api_key`: Required in self-host mode to authenticate the MCP server with the RAGFlow server. See [here](https://ragflow.io/docs/develop/acquire_ragflow_api_key) for instructions on acquiring an API key.

</template>
<template #zh>

- `host`：MCP 服务器的主机地址。
- `port`：MCP 服务器的监听端口。
- `base_url`：正在运行的 RAGFlow 服务器的地址。
- `mode`：启动模式。
  - `self-host`：（默认）自托管模式。
  - `host`：宿主模式。
- `api_key`：自托管模式下必需，用于向 RAGFlow 服务器认证该 MCP 服务器。获取 API key 的方法参见[此处](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。

</template>
</BiRow>

<BiRow>
<template #en>

### Transports

</template>
<template #zh>

### 传输方式

</template>
</BiRow>

<BiRow>
<template #en>

The RAGFlow MCP server supports two transports: the legacy SSE transport (served at `/sse`), introduced on November 5, 2024, and deprecated on March 26, 2025, and the streamable-HTTP transport (served at `/mcp`). The legacy SSE transport and the streamable HTTP transport with JSON responses are enabled by default. To disable either transport, use the flags `--no-transport-sse-enabled` or `--no-transport-streamable-http-enabled`. To disable JSON responses for the streamable HTTP transport,  use the `--no-json-response` flag.

</template>
<template #zh>

RAGFlow MCP 服务器支持两种传输方式：旧版 SSE 传输（由 `/sse` 端点提供，于 2024 年 11 月 5 日引入，2025 年 3 月 26 日弃用）和 streamable-HTTP 传输（由 `/mcp` 端点提供）。旧版 SSE 传输以及带 JSON 响应的 streamable-HTTP 传输默认启用。要禁用其中任一种传输，使用 `--no-transport-sse-enabled` 或 `--no-transport-streamable-http-enabled` 标志。要禁用 streamable-HTTP 传输的 JSON 响应，使用 `--no-json-response` 标志。

</template>
</BiRow>

<BiRow>
<template #en>

### Launch from Docker

</template>
<template #zh>

### 通过 Docker 启动

</template>
</BiRow>

<BiRow>
<template #en>

#### 1. Enable MCP Server

</template>
<template #zh>

#### 1. 启用 MCP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

The MCP server is designed as an optional component that complements the RAGFlow server and disabled by default. To enable MCP server:

</template>
<template #zh>

MCP 服务器是 RAGFlow 服务器的可选补充组件，默认禁用。要启用 MCP 服务器：

</template>
</BiRow>

<BiRow>
<template #en>

1. Navigate to **docker/docker-compose.yml**.
2. Uncomment the `services.ragflow.command` section as shown below:

</template>
<template #zh>

1. 打开 **docker/docker-compose.yml**。
2. 取消注释 `services.ragflow.command` 部分，如下所示：

</template>
</BiRow>

<BiRow>
<template #en>

```yaml {6-13}
  services:
    ragflow:
      ...
      image: ${RAGFLOW_IMAGE}
      # Example configuration to set up an MCP server:
      command:
        - --enable-mcpserver
        - --mcp-host=0.0.0.0
        - --mcp-port=9382
        - --mcp-base-url=http://127.0.0.1:9380
        - --mcp-script-path=/ragflow/mcp/server/server.py
        - --mcp-mode=self-host
        - --mcp-host-api-key=ragflow-xxxxxxx
        # Optional transport flags for the RAGFlow MCP server.
        # If you set `mcp-mode` to `host`, you must add the --no-transport-streamable-http-enabled flag, because the streamable-HTTP transport is not yet supported in host mode.
        # The legacy SSE transport and the streamable-HTTP transport with JSON responses are enabled by default.
        # To disable a specific transport or JSON responses for the streamable-HTTP transport, use the corresponding flag(s):
        #   - --no-transport-sse-enabled # Disables the legacy SSE endpoint (/sse)
        #   - --no-transport-streamable-http-enabled #  Disables the streamable-HTTP transport (served at the /mcp endpoint)
        #   - --no-json-response # Disables JSON responses for the streamable-HTTP transport
```

</template>
<template #zh>

```yaml {6-13}
  services:
    ragflow:
      ...
      image: ${RAGFLOW_IMAGE}
      # Example configuration to set up an MCP server:
      command:
        - --enable-mcpserver
        - --mcp-host=0.0.0.0
        - --mcp-port=9382
        - --mcp-base-url=http://127.0.0.1:9380
        - --mcp-script-path=/ragflow/mcp/server/server.py
        - --mcp-mode=self-host
        - --mcp-host-api-key=ragflow-xxxxxxx
        # Optional transport flags for the RAGFlow MCP server.
        # If you set `mcp-mode` to `host`, you must add the --no-transport-streamable-http-enabled flag, because the streamable-HTTP transport is not yet supported in host mode.
        # The legacy SSE transport and the streamable-HTTP transport with JSON responses are enabled by default.
        # To disable a specific transport or JSON responses for the streamable-HTTP transport, use the corresponding flag(s):
        #   - --no-transport-sse-enabled # Disables the legacy SSE endpoint (/sse)
        #   - --no-transport-streamable-http-enabled #  Disables the streamable-HTTP transport (served at the /mcp endpoint)
        #   - --no-json-response # Disables JSON responses for the streamable-HTTP transport
```

</template>
</BiRow>

<BiRow>
<template #en>

Where:

</template>
<template #zh>

其中：

</template>
</BiRow>

<BiRow>
<template #en>

- `mcp-host`: The MCP server's host address.
- `mcp-port`: The MCP server's listening port.
- `mcp-base-url`: The address of the running RAGFlow server.
- `mcp-script-path`: The file path to the MCP server’s main script.
- `mcp-mode`: The launch mode.
  - `self-host`: (default) self-host mode.
  - `host`: host mode.
- `mcp-host-api_key`: Required in self-host mode to authenticate the MCP server with the RAGFlow server. See [here](https://ragflow.io/docs/develop/acquire_ragflow_api_key) for instructions on acquiring an API key.

</template>
<template #zh>

- `mcp-host`：MCP 服务器的主机地址。
- `mcp-port`：MCP 服务器的监听端口。
- `mcp-base-url`：正在运行的 RAGFlow 服务器的地址。
- `mcp-script-path`：MCP 服务器主脚本的文件路径。
- `mcp-mode`：启动模式。
  - `self-host`：（默认）自托管模式。
  - `host`：宿主模式。
- `mcp-host-api_key`：自托管模式下必需，用于向 RAGFlow 服务器认证该 MCP 服务器。获取 API key 的方法参见[此处](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip INFO
If you set `mcp-mode` to `host`, you must add the `--no-transport-streamable-http-enabled` flag, because the streamable-HTTP transport is not yet supported in host mode.
:::

</template>
<template #zh>

:::tip 信息
如果将 `mcp-mode` 设置为 `host`，必须添加 `--no-transport-streamable-http-enabled` 标志，因为宿主模式尚不支持 streamable-HTTP 传输。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### 2. Launch a RAGFlow Server with an MCP Server

</template>
<template #zh>

#### 2. 启动附带 MCP 服务器的 RAGFlow 服务器

</template>
</BiRow>

<BiRow>
<template #en>

Run `docker compose -f docker-compose.yml up` to launch the RAGFlow server together with the MCP server.

</template>
<template #zh>

运行 `docker compose -f docker-compose.yml up`，同时启动 RAGFlow 服务器与 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

*The following ASCII art confirms a successful launch:*

</template>
<template #zh>

*以下 ASCII 字符画表示启动成功：*

</template>
</BiRow>

<BiRow>
<template #en>

```bash
  docker-ragflow-cpu-1  | Starting MCP Server on 0.0.0.0:9382 with base URL http://127.0.0.1:9380...
  docker-ragflow-cpu-1  | Starting 1 task executor(s) on host 'dd0b5e07e76f'...
  docker-ragflow-cpu-1  | 2025-04-18 15:41:18,816 INFO     27 ragflow_server log path: /ragflow/logs/ragflow_server.log, log levels: {'peewee': 'WARNING', 'pdfminer': 'WARNING', 'root': 'INFO'}
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | __  __  ____ ____       ____  _____ ______     _______ ____
  docker-ragflow-cpu-1  | |  \/  |/ ___|  _ \     / ___|| ____|  _ \ \   / / ____|  _ \
  docker-ragflow-cpu-1  | | |\/| | |   | |_) |    \___ \|  _| | |_) \ \ / /|  _| | |_) |
  docker-ragflow-cpu-1  | | |  | | |___|  __/      ___) | |___|  _ < \ V / | |___|  _ <
  docker-ragflow-cpu-1  | |_|  |_|\____|_|        |____/|_____|_| \_\ \_/  |_____|_| \_\
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | MCP launch mode: self-host
  docker-ragflow-cpu-1  | MCP host: 0.0.0.0
  docker-ragflow-cpu-1  | MCP port: 9382
  docker-ragflow-cpu-1  | MCP base_url: http://127.0.0.1:9380
  docker-ragflow-cpu-1  | INFO:     Started server process [26]
  docker-ragflow-cpu-1  | INFO:     Waiting for application startup.
  docker-ragflow-cpu-1  | INFO:     Application startup complete.
  docker-ragflow-cpu-1  | INFO:     Uvicorn running on http://0.0.0.0:9382 (Press CTRL+C to quit)
  docker-ragflow-cpu-1  | 2025-04-18 15:41:20,469 INFO     27 found 0 gpus
  docker-ragflow-cpu-1  | 2025-04-18 15:41:23,263 INFO     27 init database on cluster mode successfully
  docker-ragflow-cpu-1  | 2025-04-18 15:41:25,318 INFO     27 load_model /ragflow/rag/res/deepdoc/det.onnx uses CPU
  docker-ragflow-cpu-1  | 2025-04-18 15:41:25,367 INFO     27 load_model /ragflow/rag/res/deepdoc/rec.onnx uses CPU
  docker-ragflow-cpu-1  |         ____   ___    ______ ______ __
  docker-ragflow-cpu-1  |        / __ \ /   |  / ____// ____// /____  _      __
  docker-ragflow-cpu-1  |       / /_/ // /| | / / __ / /_   / // __ \| | /| / /
  docker-ragflow-cpu-1  |      / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
  docker-ragflow-cpu-1  |     /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 RAGFlow version: v0.18.0-285-gb2c299fa full
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 project base: /ragflow
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 Current configs, from /ragflow/conf/service_conf.yaml:
  docker-ragflow-cpu-1  |  ragflow: {'host': '0.0.0.0', 'http_port': 9380}
  ...
  docker-ragflow-cpu-1  |  * Running on all addresses (0.0.0.0)
  docker-ragflow-cpu-1  |  * Running on http://127.0.0.1:9380
  docker-ragflow-cpu-1  |  * Running on http://172.19.0.6:9380
  docker-ragflow-cpu-1  |   ______           __      ______                     __
  docker-ragflow-cpu-1  |  /_  __/___ ______/ /__   / ____/  _____  _______  __/ /_____  _____
  docker-ragflow-cpu-1  |   / / / __ `/ ___/ //_/  / __/ | |/_/ _ \/ ___/ / / / __/ __ \/ ___/
  docker-ragflow-cpu-1  |  / / / /_/ (__  ) ,<    / /____>  </  __/ /__/ /_/ / /_/ /_/ / /
  docker-ragflow-cpu-1  | /_/  \__,_/____/_/|_|  /_____/_/|_|\___/\___/\__,_/\__/\____/_/
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | 2025-04-18 15:41:34,501 INFO     32 TaskExecutor: RAGFlow version: v0.18.0-285-gb2c299fa full
  docker-ragflow-cpu-1  | 2025-04-18 15:41:34,501 INFO     32 Use Elasticsearch http://es01:9200 as the doc engine.
  ...
```

</template>
<template #zh>

```bash
  docker-ragflow-cpu-1  | Starting MCP Server on 0.0.0.0:9382 with base URL http://127.0.0.1:9380...
  docker-ragflow-cpu-1  | Starting 1 task executor(s) on host 'dd0b5e07e76f'...
  docker-ragflow-cpu-1  | 2025-04-18 15:41:18,816 INFO     27 ragflow_server log path: /ragflow/logs/ragflow_server.log, log levels: {'peewee': 'WARNING', 'pdfminer': 'WARNING', 'root': 'INFO'}
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | __  __  ____ ____       ____  _____ ______     _______ ____
  docker-ragflow-cpu-1  | |  \/  |/ ___|  _ \     / ___|| ____|  _ \ \   / / ____|  _ \
  docker-ragflow-cpu-1  | | |\/| | |   | |_) |    \___ \|  _| | |_) \ \ / /|  _| | |_) |
  docker-ragflow-cpu-1  | | |  | | |___|  __/      ___) | |___|  _ < \ V / | |___|  _ <
  docker-ragflow-cpu-1  | |_|  |_|\____|_|        |____/|_____|_| \_\ \_/  |_____|_| \_\
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | MCP launch mode: self-host
  docker-ragflow-cpu-1  | MCP host: 0.0.0.0
  docker-ragflow-cpu-1  | MCP port: 9382
  docker-ragflow-cpu-1  | MCP base_url: http://127.0.0.1:9380
  docker-ragflow-cpu-1  | INFO:     Started server process [26]
  docker-ragflow-cpu-1  | INFO:     Waiting for application startup.
  docker-ragflow-cpu-1  | INFO:     Application startup complete.
  docker-ragflow-cpu-1  | INFO:     Uvicorn running on http://0.0.0.0:9382 (Press CTRL+C to quit)
  docker-ragflow-cpu-1  | 2025-04-18 15:41:20,469 INFO     27 found 0 gpus
  docker-ragflow-cpu-1  | 2025-04-18 15:41:23,263 INFO     27 init database on cluster mode successfully
  docker-ragflow-cpu-1  | 2025-04-18 15:41:25,318 INFO     27 load_model /ragflow/rag/res/deepdoc/det.onnx uses CPU
  docker-ragflow-cpu-1  | 2025-04-18 15:41:25,367 INFO     27 load_model /ragflow/rag/res/deepdoc/rec.onnx uses CPU
  docker-ragflow-cpu-1  |         ____   ___    ______ ______ __
  docker-ragflow-cpu-1  |        / __ \ /   |  / ____// ____// /____  _      __
  docker-ragflow-cpu-1  |       / /_/ // /| | / / __ / /_   / // __ \| | /| / /
  docker-ragflow-cpu-1  |      / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
  docker-ragflow-cpu-1  |     /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 RAGFlow version: v0.18.0-285-gb2c299fa full
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 project base: /ragflow
  docker-ragflow-cpu-1  | 2025-04-18 15:41:29,088 INFO     27 Current configs, from /ragflow/conf/service_conf.yaml:
  docker-ragflow-cpu-1  |  ragflow: {'host': '0.0.0.0', 'http_port': 9380}
  ...
  docker-ragflow-cpu-1  |  * Running on all addresses (0.0.0.0)
  docker-ragflow-cpu-1  |  * Running on http://127.0.0.1:9380
  docker-ragflow-cpu-1  |  * Running on http://172.19.0.6:9380
  docker-ragflow-cpu-1  |   ______           __      ______                     __
  docker-ragflow-cpu-1  |  /_  __/___ ______/ /__   / ____/  _____  _______  __/ /_____  _____
  docker-ragflow-cpu-1  |   / / / __ `/ ___/ //_/  / __/ | |/_/ _ \/ ___/ / / / __/ __ \/ ___/
  docker-ragflow-cpu-1  |  / / / /_/ (__  ) ,<    / /____>  </  __/ /__/ /_/ / /_/ /_/ / /
  docker-ragflow-cpu-1  | /_/  \__,_/____/_/|_|  /_____/_/|_|\___/\___/\__,_/\__/\____/_/
  docker-ragflow-cpu-1  |
  docker-ragflow-cpu-1  | 2025-04-18 15:41:34,501 INFO     32 TaskExecutor: RAGFlow version: v0.18.0-285-gb2c299fa full
  docker-ragflow-cpu-1  | 2025-04-18 15:41:34,501 INFO     32 Use Elasticsearch http://es01:9200 as the doc engine.
  ...
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Launch an MCP Server Without Upgrading RAGFlow

</template>
<template #zh>

#### 在不升级 RAGFlow 的情况下启动 MCP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

:::info KUDOS
This section is contributed by our community contributor [yiminghub2024](https://github.com/yiminghub2024). 👏
:::

</template>
<template #zh>

:::info 致谢
本节由社区贡献者 [yiminghub2024](https://github.com/yiminghub2024) 提供。👏
:::

</template>
</BiRow>

<BiRow>
<template #en>

1. Prepare all MCP-specific files and directories.
   i. Copy the [mcp/](https://github.com/infiniflow/ragflow/tree/main/mcp) directory to your local working directory.
   ii. Copy [docker/docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml) locally.
   iii. Copy [docker/entrypoint.sh](https://github.com/infiniflow/ragflow/blob/main/docker/entrypoint.sh) locally.
   iv. Install the required dependencies using `uv`:
       - Run `uv add mcp` or
       - Copy [pyproject.toml](https://github.com/infiniflow/ragflow/blob/main/pyproject.toml) locally and run `uv sync --python 3.13`.
2. Edit **docker-compose.yml** to enable MCP (disabled by default).
3. Launch the MCP server:

</template>
<template #zh>

1. 准备所有 MCP 相关的文件和目录。
   i. 将 [mcp/](https://github.com/infiniflow/ragflow/tree/main/mcp) 目录复制到你的本地工作目录。
   ii. 将 [docker/docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml) 复制到本地。
   iii. 将 [docker/entrypoint.sh](https://github.com/infiniflow/ragflow/blob/main/docker/entrypoint.sh) 复制到本地。
   iv. 使用 `uv` 安装所需的依赖：
       - 运行 `uv add mcp`，或
       - 将 [pyproject.toml](https://github.com/infiniflow/ragflow/blob/main/pyproject.toml) 复制到本地并运行 `uv sync --python 3.13`。
2. 编辑 **docker-compose.yml** 以启用 MCP（默认禁用）。
3. 启动 MCP 服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -f docker-compose.yml up -d
```

</template>
<template #zh>

```bash
docker compose -f docker-compose.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

### Check MCP Server Status

</template>
<template #zh>

### 检查 MCP 服务器状态

</template>
</BiRow>

<BiRow>
<template #en>

Run the following to check the logs the RAGFlow server and the MCP server:

</template>
<template #zh>

运行以下命令查看 RAGFlow 服务器和 MCP 服务器的日志：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker logs docker-ragflow-cpu-1
```

</template>
<template #zh>

```bash
docker logs docker-ragflow-cpu-1
```

</template>
</BiRow>

<BiRow>
<template #en>

## Security Considerations

</template>
<template #zh>

## 安全注意事项

</template>
</BiRow>

<BiRow>
<template #en>

As MCP technology is still at early stage and no official best practices for authentication or authorization have been established, RAGFlow currently uses [API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key) to validate identity for the operations described earlier. However, in public environments, this makeshift solution could expose your MCP server to potential network attacks. Therefore, when running a local SSE server, it is recommended to bind only to localhost (`127.0.0.1`) rather than to all interfaces (`0.0.0.0`).

</template>
<template #zh>

由于 MCP 技术仍处于早期阶段，官方尚未建立身份验证或授权的最佳实践，RAGFlow 目前使用 [API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key) 对前述操作进行身份校验。但在公开环境中，这种权宜之计可能使你的 MCP 服务器暴露于潜在的网络攻击之下。因此，运行本地 SSE 服务器时，建议只绑定到 localhost（`127.0.0.1`），而不要绑定到所有网络接口（`0.0.0.0`）。

</template>
</BiRow>

<BiRow>
<template #en>

For further guidance, see the [official MCP documentation](https://modelcontextprotocol.io/docs/concepts/transports#security-considerations).

</template>
<template #zh>

更多指导请参见 [MCP 官方文档](https://modelcontextprotocol.io/docs/concepts/transports#security-considerations)。

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

### When to Use an API Key for Authentication?

</template>
<template #zh>

### 何时使用 API key 进行身份验证？

</template>
</BiRow>

<BiRow>
<template #en>

The use of an API key depends on the operating mode of your MCP server.

</template>
<template #zh>

是否使用 API key 取决于 MCP 服务器的运行模式。

</template>
</BiRow>

<BiRow>
<template #en>

- **Self-host mode** (default):
  When starting the MCP server in self-host mode, you should provide an API key when launching it to authenticate it with the RAGFlow server:
  - If launching from source, include the API key in the command.
  - If launching from Docker, update the API key in **docker/docker-compose.yml**.
- **Host mode**:
  If your RAGFlow MCP server is working in host mode, include the API key in the `headers` of your client requests to authenticate your client with the RAGFlow server. An example is available [here](https://github.com/infiniflow/ragflow/blob/main/mcp/client/client.py).

</template>
<template #zh>

- **自托管模式**（默认）：
  以自托管模式启动 MCP 服务器时，应在启动时提供 API key，用于向 RAGFlow 服务器完成认证：
  - 若从源码启动，将 API key 包含在命令中。
  - 若通过 Docker 启动，更新 **docker/docker-compose.yml** 中的 API key。
- **宿主模式**：
  若 RAGFlow MCP 服务器以宿主模式运行，则在客户端请求的 `headers` 中携带 API key，以便向 RAGFlow 服务器认证你的客户端。示例参见[此处](https://github.com/infiniflow/ragflow/blob/main/mcp/client/client.py)。

</template>
</BiRow>
