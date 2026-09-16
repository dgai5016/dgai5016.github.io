# RAGFlow MCP 客户端示例

Python 与 curl 的 MCP 客户端示例。

------

## MCP Python 客户端示例

我们在[此处](https://github.com/infiniflow/ragflow/blob/main/mcp/client/client.py)提供了一个用于测试的*原型* MCP 客户端示例。

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

## 使用 Curl 与 RAGFlow MCP 服务器交互

通过 HTTP 请求与 MCP 服务器交互时，请遵循下面的初始化序列：

1. **客户端发送 `initialize` 请求**，携带协议版本和能力信息。
2. **服务器返回 `initialize` 响应**，包含所支持的协议和能力信息。
3. **客户端通过 `initialized` 通知确认就绪**。
   _客户端与服务器之间建立连接，后续操作（如工具列表）可以继续进行。_

:::tip 注意
关于此初始化过程的更多信息，参见[此处](https://modelcontextprotocol.io/docs/concepts/architecture#1-initialization)。
:::

下面几节将带你走完一个完整的工具调用流程。

### 1. 获取会话 ID

每个发往 MCP 服务器的 curl 请求都必须包含一个会话 ID：

```bash
$ curl -N -H "api_key: YOUR_API_KEY" http://127.0.0.1:9382/sse
```

:::tip 注意
关于获取 API key 的说明，参见[此处](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。
:::

#### 传输方式

传输层会以流式推送各类消息，例如工具结果、服务器响应和保活 ping。

_服务器返回会话 ID：_

```bash
event: endpoint
data: /messages/?session_id=5c6600ef61b845a788ddf30dceb25c54
```

### 2. 发送 `Initialize` 请求

客户端发送 `initialize` 请求，携带协议版本和能力信息：

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

#### 传输方式

_服务器返回 `initialize` 响应，包含所支持的协议和能力信息：_

```bash
event: message
data: {"jsonrpc":"2.0","id":1,"result":{"protocolVersion":"2025-03-26","capabilities":{"experimental":{"headers":{"host":"127.0.0.1:9382","user-agent":"curl/8.7.1","accept":"*/*","api_key":"ragflow-xxxxxxxxxxxx","accept-encoding":"gzip"}},"tools":{"listChanged":false}},"serverInfo":{"name":"docker-ragflow-cpu-1","version":"1.9.4"}}}
```

### 3. 确认就绪

客户端通过 `initialized` 通知确认就绪：

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

 _客户端与服务器之间建立连接，后续操作（如工具列表）可以继续进行。_

### 4. 工具列表

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

#### 传输方式

```bash
event: message
data: {"jsonrpc":"2.0","id":3,"result":{"tools":[{"name":"ragflow_retrieval","description":"Retrieve relevant chunks from the RAGFlow retrieve interface based on the question, using the specified dataset_ids and optionally document_ids. Below is the list of all available datasets, including their descriptions and IDs. If you're unsure which datasets are relevant to the question, simply pass all dataset IDs to the function.","inputSchema":{"type":"object","properties":{"dataset_ids":{"type":"array","items":{"type":"string"}},"document_ids":{"type":"array","items":{"type":"string"}},"question":{"type":"string"}},"required":["dataset_ids","question"]}}]}}

```

### 5. 工具调用

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

#### 传输方式

```bash
event: message
data: {"jsonrpc":"2.0","id":4,"result":{...}}

```

### 完整的 Curl 示例

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
