<BiRow>
<template #en>

Python and curl MCP client examples.

</template>
<template #zh>

Python 与 curl 的 MCP 客户端示例。

</template>
</BiRow>

<BiRow>
<template #en>

------

</template>
<template #zh>

------

</template>
</BiRow>

<BiRow>
<template #en>

## Example MCP Python Client

</template>
<template #zh>

## MCP Python 客户端示例

</template>
</BiRow>

<BiRow>
<template #en>

We provide a *prototype* MCP client example for testing [here](https://github.com/infiniflow/ragflow/blob/main/mcp/client/client.py).

</template>
<template #zh>

我们在[此处](https://github.com/infiniflow/ragflow/blob/main/mcp/client/client.py)提供了一个用于测试的*原型* MCP 客户端示例。

</template>
</BiRow>

<BiRow>
<template #en>

:::info IMPORTANT
If your MCP server is running in host mode, include your acquired API key in your client's `headers` when connecting asynchronously to it:

```python
async with sse_client("http://localhost:9382/sse", headers={"api_key": "YOUR_KEY_HERE"}) as streams:
    # Rest of your code...
```

Alternatively, to comply with [OAuth 2.1 Section 5](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#section-5), you can run the following code *instead* to connect to your MCP server:

```python
async with sse_client("http://localhost:9382/sse", headers={"Authorization": "YOUR_KEY_HERE"}) as streams:
    # Rest of your code...
```
:::

</template>
<template #zh>

:::info 重要
如果你的 MCP 服务器以宿主模式运行，以异步方式连接服务器时，请将你获取的 API key 放入客户端的 `headers`：

```python
async with sse_client("http://localhost:9382/sse", headers={"api_key": "YOUR_KEY_HERE"}) as streams:
    # Rest of your code...
```

或者，为了符合 [OAuth 2.1 第 5 节](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-12#section-5)，你可以*改为*运行以下代码连接你的 MCP 服务器：

```python
async with sse_client("http://localhost:9382/sse", headers={"Authorization": "YOUR_KEY_HERE"}) as streams:
    # Rest of your code...
```
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Use Curl to Interact with the RAGFlow MCP Server

</template>
<template #zh>

## 使用 Curl 与 RAGFlow MCP 服务器交互

</template>
</BiRow>

<BiRow>
<template #en>

When interacting with the MCP server via HTTP requests, follow this initialization sequence:

</template>
<template #zh>

通过 HTTP 请求与 MCP 服务器交互时，请遵循下面的初始化序列：

</template>
</BiRow>

<BiRow>
<template #en>

1. **The client sends an `initialize` request** with protocol version and capabilities.
2. **The server replies with an `initialize` response**, including the supported protocol and capabilities.
3. **The client confirms readiness with an `initialized` notification**.
   _The connection is established between the client and the server, and further operations (such as tool listing) may proceed._

</template>
<template #zh>

1. **客户端发送 `initialize` 请求**，携带协议版本和能力信息。
2. **服务器返回 `initialize` 响应**，包含所支持的协议和能力信息。
3. **客户端通过 `initialized` 通知确认就绪**。
   _客户端与服务器之间建立连接，后续操作（如工具列表）可以继续进行。_

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
For more information about this initialization process, see [here](https://modelcontextprotocol.io/docs/concepts/architecture#1-initialization).
:::

</template>
<template #zh>

:::tip 注意
关于此初始化过程的更多信息，参见[此处](https://modelcontextprotocol.io/docs/concepts/architecture#1-initialization)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

In the following sections, we will walk you through a complete tool calling process.

</template>
<template #zh>

下面几节将带你走完一个完整的工具调用流程。

</template>
</BiRow>

<BiRow>
<template #en>

### 1. Obtain a Session ID

</template>
<template #zh>

### 1. 获取会话 ID

</template>
</BiRow>

<BiRow>
<template #en>

Each curl request with the MCP server must include a session ID:

</template>
<template #zh>

每个发往 MCP 服务器的 curl 请求都必须包含一个会话 ID：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
$ curl -N -H "api_key: YOUR_API_KEY" http://127.0.0.1:9382/sse
```

</template>
<template #zh>

```bash
$ curl -N -H "api_key: YOUR_API_KEY" http://127.0.0.1:9382/sse
```

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
See [here](https://ragflow.io/docs/develop/acquire_ragflow_api_key) for information about acquiring an API key.
:::

</template>
<template #zh>

:::tip 注意
关于获取 API key 的说明，参见[此处](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Transport

</template>
<template #zh>

#### 传输方式

</template>
</BiRow>

<BiRow>
<template #en>

The transport will stream messages such as tool results, server responses, and keep-alive pings.

</template>
<template #zh>

传输层会以流式推送各类消息，例如工具结果、服务器响应和保活 ping。

</template>
</BiRow>

<BiRow>
<template #en>

_The server returns the session ID:_

</template>
<template #zh>

_服务器返回会话 ID：_

</template>
</BiRow>

<BiRow>
<template #en>

```bash
event: endpoint
data: /messages/?session_id=5c6600ef61b845a788ddf30dceb25c54
```

</template>
<template #zh>

```bash
event: endpoint
data: /messages/?session_id=5c6600ef61b845a788ddf30dceb25c54
```

</template>
</BiRow>

<BiRow>
<template #en>

### 2. Send an `Initialize` Request

</template>
<template #zh>

### 2. 发送 `Initialize` 请求

</template>
</BiRow>

<BiRow>
<template #en>

The client sends an `initialize` request with protocol version and capabilities:

</template>
<template #zh>

客户端发送 `initialize` 请求，携带协议版本和能力信息：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
session_id="5c6600ef61b845a788ddf30dceb25c54" && \

curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "1.0",
      "capabilities": {},
      "clientInfo": {
        "name": "ragflow-mcp-client",
        "version": "0.1"
      }
    }
  }' && \
```

</template>
<template #zh>

```bash
session_id="5c6600ef61b845a788ddf30dceb25c54" && \

curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "1.0",
      "capabilities": {},
      "clientInfo": {
        "name": "ragflow-mcp-client",
        "version": "0.1"
      }
    }
  }' && \
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Transport

</template>
<template #zh>

#### 传输方式

</template>
</BiRow>

<BiRow>
<template #en>

_The server replies with an `initialize` response, including the supported protocol and capabilities:_

</template>
<template #zh>

_服务器返回 `initialize` 响应，包含所支持的协议和能力信息：_

</template>
</BiRow>

<BiRow>
<template #en>

```bash
event: message
data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{"experimental":{"headers":{"host":"127.0.0.1:9382","user-agent":"curl/8.7.1","accept":"*/*","api_key":"ragflow-xxxxxxxxxxxx","accept-encoding":"gzip"}},"tools":{"listChanged":false}},"serverInfo":{"name":"docker-ragflow-cpu-1","version":"1.9.4"}}}
```

</template>
<template #zh>

```bash
event: message
data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{"experimental":{"headers":{"host":"127.0.0.1:9382","user-agent":"curl/8.7.1","accept":"*/*","api_key":"ragflow-xxxxxxxxxxxx","accept-encoding":"gzip"}},"tools":{"listChanged":false}},"serverInfo":{"name":"docker-ragflow-cpu-1","version":"1.9.4"}}}
```

</template>
</BiRow>

<BiRow>
<template #en>

### 3. Acknowledge Readiness

</template>
<template #zh>

### 3. 确认就绪

</template>
</BiRow>

<BiRow>
<template #en>

The client confirms readiness with an `initialized` notification:

</template>
<template #zh>

客户端通过 `initialized` 通知确认就绪：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized",
    "params": {}
  }' && \
```

</template>
<template #zh>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized",
    "params": {}
  }' && \
```

</template>
</BiRow>

<BiRow>
<template #en>

 _The connection is established between the client and the server, and further operations (such as tool listing) may proceed._

</template>
<template #zh>

 _客户端与服务器之间建立连接，后续操作（如工具列表）可以继续进行。_

</template>
</BiRow>

<BiRow>
<template #en>

### 4. Tool Listing

</template>
<template #zh>

### 4. 工具列表

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/list",
    "params": {}
  }' && \
```

</template>
<template #zh>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/list",
    "params": {}
  }' && \
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Transport

</template>
<template #zh>

#### 传输方式

</template>
</BiRow>

<BiRow>
<template #en>

```bash
event: message
data: {"jsonrpc":"2.0","id":3,"result":{"tools":[{"name":"ragflow_retrieval","description":"Retrieve relevant chunks from the RAGFlow retrieve interface based on the question, using the specified dataset_ids and optionally document_ids. Below is the list of all available datasets, including their descriptions and IDs. If you're unsure which datasets are relevant to the question, simply pass all dataset IDs to the function.","inputSchema":{"type":"object","properties":{"dataset_ids":{"type":"array","items":{"type":"string"}},"document_ids":{"type":"array","items":{"type":"string"}},"question":{"type":"string"}},"required":["dataset_ids","question"]}}]}}

```

</template>
<template #zh>

```bash
event: message
data: {"jsonrpc":"2.0","id":3,"result":{"tools":[{"name":"ragflow_retrieval","description":"Retrieve relevant chunks from the RAGFlow retrieve interface based on the question, using the specified dataset_ids and optionally document_ids. Below is the list of all available datasets, including their descriptions and IDs. If you're unsure which datasets are relevant to the question, simply pass all dataset IDs to the function.","inputSchema":{"type":"object","properties":{"dataset_ids":{"type":"array","items":{"type":"string"}},"document_ids":{"type":"array","items":{"type":"string"}},"question":{"type":"string"}},"required":["dataset_ids","question"]}}]}}

```

</template>
</BiRow>

<BiRow>
<template #en>

### 5. Tool Calling

</template>
<template #zh>

### 5. 工具调用

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "ragflow_retrieval",
      "arguments": {
        "question": "How to install neovim?",
        "dataset_ids": ["DATASET_ID_HERE"],
        "document_ids": []
      }
    }
  }'
```

</template>
<template #zh>

```bash
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "ragflow_retrieval",
      "arguments": {
        "question": "How to install neovim?",
        "dataset_ids": ["DATASET_ID_HERE"],
        "document_ids": []
      }
    }
  }'
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Transport

</template>
<template #zh>

#### 传输方式

</template>
</BiRow>

<BiRow>
<template #en>

```bash
event: message
data: {"jsonrpc":"2.0","id":4,"result":{...}}

```

</template>
<template #zh>

```bash
event: message
data: {"jsonrpc":"2.0","id":4,"result":{...}}

```

</template>
</BiRow>

<BiRow>
<template #en>

### A Complete Curl Example

</template>
<template #zh>

### 完整的 Curl 示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
session_id="YOUR_SESSION_ID" && \

# Step 1: Initialize request
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "1.0",
      "capabilities": {},
      "clientInfo": {
        "name": "ragflow-mcp-client",
        "version": "0.1"
      }
    }
  }' && \

sleep 2 && \

# Step 2: Initialized notification
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized",
    "params": {}
  }' && \

sleep 2 && \

# Step 3: Tool listing
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/list",
    "params": {}
  }' && \

sleep 2 && \

# Step 4: Tool call
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "ragflow_retrieval",
      "arguments": {
        "question": "How to install neovim?",
        "dataset_ids": ["DATASET_ID_HERE"],
        "document_ids": []
      }
    }
  }'

```

</template>
<template #zh>

```bash
session_id="YOUR_SESSION_ID" && \

# Step 1: Initialize request
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "1.0",
      "capabilities": {},
      "clientInfo": {
        "name": "ragflow-mcp-client",
        "version": "0.1"
      }
    }
  }' && \

sleep 2 && \

# Step 2: Initialized notification
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "notifications/initialized",
    "params": {}
  }' && \

sleep 2 && \

# Step 3: Tool listing
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/list",
    "params": {}
  }' && \

sleep 2 && \

# Step 4: Tool call
curl -X POST "http://127.0.0.1:9382/messages/?session_id=$session_id" \
  -H "api_key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 4,
    "method": "tools/call",
    "params": {
      "name": "ragflow_retrieval",
      "arguments": {
        "question": "How to install neovim?",
        "dataset_ids": ["DATASET_ID_HERE"],
        "document_ids": []
      }
    }
  }'

```

</template>
</BiRow>
