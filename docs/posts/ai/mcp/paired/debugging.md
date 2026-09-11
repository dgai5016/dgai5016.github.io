<BiRow>
<template #en>

> A comprehensive guide to debugging Model Context Protocol (MCP) integrations

</template>
<template #zh>

> 关于模型上下文协议（Model Context Protocol，MCP）集成的全面调试指南

</template>
</BiRow>

<BiRow>
<template #en>

Effective debugging is essential when developing MCP servers or integrating
them with applications. This guide covers the debugging tools and approaches
available in the MCP ecosystem.

</template>
<template #zh>

无论是开发 MCP 服务器，还是将其集成到应用中，有效的调试都至关重要。本指南涵盖 MCP 生态中可用的调试工具与方法。

</template>
</BiRow>

<BiRow>
<template #en>

## Debugging tools overview

</template>
<template #zh>

## 调试工具概览

</template>
</BiRow>

<BiRow>
<template #en>

MCP provides several tools for debugging at different levels:

</template>
<template #zh>

MCP 提供了多种工具，可在不同层面进行调试：

</template>
</BiRow>

<BiRow>
<template #en>

1. **[MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)**: interactive, transport-agnostic
   testing UI. Connect to stdio or Streamable HTTP servers, invoke
   [tools](https://modelcontextprotocol.io/specification/latest/server/tools),
   [prompts](https://modelcontextprotocol.io/specification/latest/server/prompts), and
   [resources](https://modelcontextprotocol.io/specification/latest/server/resources), and watch the
   notification stream. This should be your first stop.
2. **Server logging**: structured logs to stderr (stdio transport) or via
   [OpenTelemetry](https://opentelemetry.io/) (all transports).
   [Logging](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging) over the protocol
   (`notifications/message`) is deprecated as of protocol version `2026-07-28`.
3. **Client developer tools**: most MCP clients expose logs and connection
   state. See [Debugging in Claude Desktop](#debugging-in-claude-desktop)
   below for one example, or consult your client's documentation.

</template>
<template #zh>

1. **[MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)**：交互式、与传输无关的测试界面。可连接 stdio（标准输入输出）或 Streamable HTTP 服务器，调用[工具](https://modelcontextprotocol.io/specification/latest/server/tools)、[提示词](https://modelcontextprotocol.io/specification/latest/server/prompts)和[资源](https://modelcontextprotocol.io/specification/latest/server/resources)，并观察通知流。排查时应首先从这里入手。
2. **服务器日志**：结构化日志写入 stderr（stdio 传输），或通过 [OpenTelemetry](https://opentelemetry.io/)（适用于所有传输）。通过协议进行的[日志记录](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging)（`notifications/message`）自协议版本 `2026-07-28` 起已弃用。
3. **客户端开发者工具**：大多数 MCP 客户端都会暴露日志和连接状态。示例可参阅下文的[在 Claude Desktop 中调试](#debugging-in-claude-desktop)，或查阅所用客户端的文档。

</template>
</BiRow>

<BiRow>
<template #en>

## Implementing logging

</template>
<template #zh>

## 实现日志记录

</template>
</BiRow>

<BiRow>
<template #en>

### Server-side logging

</template>
<template #zh>

### 服务器端日志

</template>
</BiRow>

<BiRow>
<template #en>

When building a server that uses the local
[stdio transport](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio), all messages
logged to stderr (standard error) will be captured by the host application
automatically.

</template>
<template #zh>

构建使用本地 [stdio 传输](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)的服务器时，写入 stderr（标准错误）的所有日志消息都会被宿主应用自动捕获。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> Local MCP servers should not log messages to stdout (standard out), as this
  will interfere with protocol operation.

</template>
<template #zh>

> **注意：**
> 本地 MCP 服务器不应向 stdout（标准输出）写入日志消息，否则会干扰协议的运行。

</template>
</BiRow>

<BiRow>
<template #en>

For servers using the
[Streamable HTTP transport](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http),
stderr is not captured by the client. Use your own server-side log aggregation
or [OpenTelemetry](https://opentelemetry.io/) for logs, and standard HTTP
tooling (curl, browser DevTools Network panel) to inspect requests and SSE
streams.

</template>
<template #zh>

对于使用 [Streamable HTTP 传输](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)的服务器，stderr 不会被客户端捕获。日志请使用自己的服务器端日志聚合或 [OpenTelemetry](https://opentelemetry.io/)；检查请求和 SSE 流则可使用标准 HTTP 工具（curl、浏览器 DevTools 的 Network 面板）。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> The `notifications/message` mechanism below is deprecated as of protocol
  version `2026-07-28`. It remains available during the deprecation window.

</template>
<template #zh>

> **注意：**
> 下文的 `notifications/message` 机制自协议版本 `2026-07-28` 起已弃用，在弃用窗口期内仍然可用。

</template>
</BiRow>

<BiRow>
<template #en>

For all [transports](https://modelcontextprotocol.io/specification/latest/basic/transports), record what the
server is doing as it runs:

</template>
<template #zh>

对于所有[传输](https://modelcontextprotocol.io/specification/latest/basic/transports)方式，请记录服务器运行时的行为：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```python title="[Python]"
  import logging

  from mcp.server import MCPServer

  logger = logging.getLogger(__name__)

  mcp = MCPServer("reports")

  @mcp.tool()
  async def fetch_report(report_id: str) -> str:
  """Fetch a report by id."""
  logger.info("Fetching report %s", report_id)
  return f"Report {report_id} is ready."
  ```

  ```typescript title="[TypeScript]"
  await server.sendLoggingMessage({
level: "info",
data: "Server started successfully",
  });
  ```
:::

</template>
<template #zh>

::: code-group
  ```python title="[Python]"
  import logging

  from mcp.server import MCPServer

  logger = logging.getLogger(__name__)

  mcp = MCPServer("reports")

  @mcp.tool()
  async def fetch_report(report_id: str) -> str:
  """Fetch a report by id."""
  logger.info("Fetching report %s", report_id)
  return f"Report {report_id} is ready."
  ```

  ```typescript title="[TypeScript]"
  await server.sendLoggingMessage({
level: "info",
data: "Server started successfully",
  });
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

MCP defines eight
[RFC 5424 severity levels](https://modelcontextprotocol.io/specification/latest/server/utilities/logging#log-levels)
(`debug` through `emergency`). Clients opt in to log messages per request by
setting the
[`io.modelcontextprotocol/logLevel`](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging#per-request-log-level)
field in the request's `_meta`. Servers must not send `notifications/message`
for requests that omit this field.

</template>
<template #zh>

MCP 定义了八个 [RFC 5424 严重级别](https://modelcontextprotocol.io/specification/latest/server/utilities/logging#log-levels)（从 `debug` 到 `emergency`）。客户端通过在请求的 `_meta` 中设置 [`io.modelcontextprotocol/logLevel`](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging#per-request-log-level) 字段，按请求选择接收日志消息。对于未携带该字段的请求，服务器不得发送 `notifications/message`。

</template>
</BiRow>

<BiRow>
<template #en>

Important events to log:

</template>
<template #zh>

需要记录的重要事件：

</template>
</BiRow>

<BiRow>
<template #en>

* Startup steps
* Resource access
* Tool execution
* Error conditions
* Performance metrics

</template>
<template #zh>

* 启动步骤
* 资源访问
* 工具执行
* 错误情形
* 性能指标

</template>
</BiRow>

<BiRow>
<template #en>

## Common issues

</template>
<template #zh>

## 常见问题

</template>
</BiRow>

<BiRow>
<template #en>

The examples below use Claude Desktop's
[`claude_desktop_config.json`](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers); the same
principles apply to any stdio-based MCP client.

</template>
<template #zh>

下文的示例使用 Claude Desktop 的 [`claude_desktop_config.json`](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)；同样的原则适用于任何基于 stdio 的 MCP 客户端。

</template>
</BiRow>

<BiRow>
<template #en>

### Working directory

</template>
<template #zh>

### 工作目录

</template>
</BiRow>

<BiRow>
<template #en>

When an MCP client launches a stdio server:

</template>
<template #zh>

当 MCP 客户端启动 stdio 服务器时：

</template>
</BiRow>

<BiRow>
<template #en>

* The working directory for servers launched via the client's config may be
  undefined (like `/` on macOS) since the client could be started from
  anywhere
* Always use absolute paths in your configuration and `.env` files to ensure
  reliable operation
* For testing servers directly via command line, the working directory will be
  where you run the command

</template>
<template #zh>

* 通过客户端配置启动的服务器，其工作目录可能没有明确定义（例如在 macOS 上可能是 `/`），因为客户端本身可能从任何位置启动
* 请始终在配置和 `.env` 文件中使用绝对路径，以确保运行可靠
* 若直接通过命令行测试服务器，工作目录就是你执行命令时所在的目录

</template>
</BiRow>

<BiRow>
<template #en>

For example in `claude_desktop_config.json`, use:

</template>
<template #zh>

例如，在 `claude_desktop_config.json` 中应这样配置：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "mcpServers": {
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/Users/username/data"
  ]
}
  }
}
```

</template>
<template #zh>

```json
{
  "mcpServers": {
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/Users/username/data"
  ]
}
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Instead of relative paths like `./data`

</template>
<template #zh>

而不是 `./data` 这样的相对路径

</template>
</BiRow>

<BiRow>
<template #en>

### Environment variables

</template>
<template #zh>

### 环境变量

</template>
</BiRow>

<BiRow>
<template #en>

MCP servers launched over stdio inherit only a limited subset of environment
variables automatically (the exact set is platform-dependent).

</template>
<template #zh>

通过 stdio 启动的 MCP 服务器只会自动继承有限的一部分环境变量（具体包含哪些取决于平台）。

</template>
</BiRow>

<BiRow>
<template #en>

To override the default variables or provide your own, you can specify an
`env` key in `claude_desktop_config.json`:

</template>
<template #zh>

要覆盖默认变量或提供自定义变量，可以在 `claude_desktop_config.json` 中指定 `env` 键：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "mcpServers": {
"myserver": {
  "command": "mcp-server-myapp",
  "env": {
    "MYAPP_API_KEY": "some_key"
  }
}
  }
}
```

</template>
<template #zh>

```json
{
  "mcpServers": {
"myserver": {
  "command": "mcp-server-myapp",
  "env": {
    "MYAPP_API_KEY": "some_key"
  }
}
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

### Server startup

</template>
<template #zh>

### 服务器启动

</template>
</BiRow>

<BiRow>
<template #en>

Common startup problems:

</template>
<template #zh>

常见启动问题：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Path Issues**
   * Incorrect server executable path
   * Missing required files
   * Permission problems
   * Try using an absolute path for `command`
2. **Configuration Errors**
   * Invalid JSON syntax
   * Missing required fields
   * Type mismatches
3. **Environment Problems**
   * Missing environment variables
   * Incorrect variable values
   * Permission restrictions

</template>
<template #zh>

1. **路径问题**
   * 服务器可执行文件路径错误
   * 缺少必需文件
   * 权限问题
   * 尝试为 `command` 使用绝对路径
2. **配置错误**
   * JSON 语法无效
   * 缺少必填字段
   * 类型不匹配
3. **环境问题**
   * 缺少环境变量
   * 变量值不正确
   * 权限受限

</template>
</BiRow>

<BiRow>
<template #en>

### Connection problems

</template>
<template #zh>

### 连接问题

</template>
</BiRow>

<BiRow>
<template #en>

When servers fail to connect:

</template>
<template #zh>

当服务器无法连接时：

</template>
</BiRow>

<BiRow>
<template #en>

1. Check client logs
2. Verify server process is running
3. Test standalone with [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)
4. Verify
   [protocol compatibility](https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning#negotiation): call
   [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) to see which
   protocol versions the server supports. An
   `UnsupportedProtocolVersionError` (`-32022`) lists the server's supported
   versions in its `data` field
5. Check the
   [per-request `_meta` fields](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta):
   every request must carry `io.modelcontextprotocol/protocolVersion` and
   `io.modelcontextprotocol/clientCapabilities`, and clients should also
   include `io.modelcontextprotocol/clientInfo`. A request missing either
   required field is rejected with error `-32602` (Invalid params), the same
   code returned for many other malformed inputs. If the server needs a
   capability the request's `clientCapabilities` did not declare, such as
   [elicitation](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation), it returns a
   `MissingRequiredClientCapabilityError` (`-32021`) naming the missing
   capabilities. Inspect the request's `_meta` and the
   [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) response to
   verify both sides declared what you expect

</template>
<template #zh>

1. 检查客户端日志
2. 确认服务器进程仍在运行
3. 用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) 独立测试
4. 验证[协议兼容性](https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning#negotiation)：调用 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) 查看服务器支持哪些协议版本。`UnsupportedProtocolVersionError`（`-32022`）会在其 `data` 字段中列出服务器支持的版本
5. 检查[每个请求的 `_meta` 字段](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta)：每个请求都必须携带 `io.modelcontextprotocol/protocolVersion` 和 `io.modelcontextprotocol/clientCapabilities`，客户端还应包含 `io.modelcontextprotocol/clientInfo`。缺少任一必填字段的请求都会被拒绝，错误码为 `-32602`（Invalid params）——许多其他格式错误的输入也会返回同样的错误码。如果服务器需要的某项能力未在请求的 `clientCapabilities` 中声明，例如[征询](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)（elicitation），它会返回 `MissingRequiredClientCapabilityError`（`-32021`），并指明所缺的能力。检查请求的 `_meta` 和 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) 响应，确认双方声明的内容与预期一致

</template>
</BiRow>

<BiRow>
<template #en>

## Debugging in Claude Desktop

</template>
<template #zh>

## 在 Claude Desktop 中调试

</template>
</BiRow>

<BiRow>
<template #en>

Claude Desktop is one of many MCP clients. It is available on
macOS and Windows.

</template>
<template #zh>

Claude Desktop 是众多 MCP 客户端之一，可在 macOS 和 Windows 上使用。

</template>
</BiRow>

<BiRow>
<template #en>

### Checking server status

</template>
<template #zh>

### 检查服务器状态

</template>
</BiRow>

<BiRow>
<template #en>

Click the "Add files, connectors, and more" plus icon in the chat input, then
hover over the **Connectors** menu to see connected servers and available
tools.

</template>
<template #zh>

点击聊天输入框中的「Add files, connectors, and more」加号图标，然后将鼠标悬停在 **Connectors** 菜单上，即可查看已连接的服务器和可用工具。

</template>
</BiRow>

<BiRow>
<template #en>

<img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" alt="Available MCP tools" width="437" height="244" data-path="images/available-mcp-tools.png" />

</template>
<template #zh>

<img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" alt="Available MCP tools" width="437" height="244" data-path="images/available-mcp-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

### Viewing logs

</template>
<template #zh>

### 查看日志

</template>
</BiRow>

<BiRow>
<template #en>

Log files are written to:

</template>
<template #zh>

日志文件写入以下位置：

</template>
</BiRow>

<BiRow>
<template #en>

* macOS: `~/Library/Logs/Claude`
* Windows: `%APPDATA%\Claude\logs`

</template>
<template #zh>

* macOS：`~/Library/Logs/Claude`
* Windows：`%APPDATA%\Claude\logs`

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS]"
  tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
  ```

  ```powershell title="[Windows]"
  type "$env:AppData\Claude\logs\mcp*.log"
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS]"
  tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
  ```

  ```powershell title="[Windows]"
  type "$env:AppData\Claude\logs\mcp*.log"
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

The logs capture:

</template>
<template #zh>

日志会记录：

</template>
</BiRow>

<BiRow>
<template #en>

* Server connection events
* Configuration issues
* Runtime errors
* Message exchanges

</template>
<template #zh>

* 服务器连接事件
* 配置问题
* 运行时错误
* 消息交互

</template>
</BiRow>

<BiRow>
<template #en>

### Using Chrome DevTools

</template>
<template #zh>

### 使用 Chrome DevTools

</template>
</BiRow>

<BiRow>
<template #en>

Access Chrome's developer tools inside Claude Desktop to investigate
client-side errors:

</template>
<template #zh>

在 Claude Desktop 中调用 Chrome 的开发者工具，排查客户端侧错误：

</template>
</BiRow>

<BiRow>
<template #en>

1. Create a `developer_settings.json` file with `allowDevTools` set to true:

</template>
<template #zh>

1. 创建一个 `developer_settings.json` 文件，将 `allowDevTools` 设为 true：

</template>
</BiRow>

<BiRow>
<template #en>

::: code-group
  ```bash title="[macOS]"
  echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
  ```

  ```powershell title="[Windows]"
  '{"allowDevTools": true}' | Set-Content "$env:AppData\Claude\developer_settings.json"
  ```
:::

</template>
<template #zh>

::: code-group
  ```bash title="[macOS]"
  echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
  ```

  ```powershell title="[Windows]"
  '{"allowDevTools": true}' | Set-Content "$env:AppData\Claude\developer_settings.json"
  ```
:::

</template>
</BiRow>

<BiRow>
<template #en>

2. Open DevTools: `Command-Option-I` (macOS) or `Ctrl+Alt+I` (Windows)

</template>
<template #zh>

2. 打开 DevTools：`Command-Option-I`（macOS）或 `Ctrl+Alt+I`（Windows）

</template>
</BiRow>

<BiRow>
<template #en>

Note: You'll see two DevTools windows:

</template>
<template #zh>

注意：你会看到两个 DevTools 窗口：

</template>
</BiRow>

<BiRow>
<template #en>

* Main content window
* App title bar window

</template>
<template #zh>

* 主内容窗口
* 应用标题栏窗口

</template>
</BiRow>

<BiRow>
<template #en>

Use the Console panel to inspect client-side errors.

</template>
<template #zh>

使用 Console 面板排查客户端侧错误。

</template>
</BiRow>

<BiRow>
<template #en>

Use the Network panel to inspect:

</template>
<template #zh>

使用 Network 面板检查：

</template>
</BiRow>

<BiRow>
<template #en>

* Message payloads
* Connection timing

</template>
<template #zh>

* 消息负载
* 连接时序

</template>
</BiRow>

<BiRow>
<template #en>

## Debugging workflow

</template>
<template #zh>

## 调试工作流

</template>
</BiRow>

<BiRow>
<template #en>

### Development cycle

</template>
<template #zh>

### 开发循环

</template>
</BiRow>

<BiRow>
<template #en>

1. Initial Development
   * Use [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) for basic testing
   * Implement core functionality
   * Add logging points
2. Integration Testing
   * Test in your target MCP client
   * Monitor logs
   * Check error handling

</template>
<template #zh>

1. 初始开发
   * 用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) 做基础测试
   * 实现核心功能
   * 添加日志点
2. 集成测试
   * 在目标 MCP 客户端中测试
   * 监控日志
   * 检查错误处理

</template>
</BiRow>

<BiRow>
<template #en>

### Testing changes

</template>
<template #zh>

### 测试变更

</template>
</BiRow>

<BiRow>
<template #en>

To test changes efficiently:

</template>
<template #zh>

要高效地测试变更：

</template>
</BiRow>

<BiRow>
<template #en>

* **Configuration changes**: Restart the MCP client
* **Server code changes**: Restart the client (for Claude Desktop, fully quit
  and reopen; closing the window is not enough)
* **Quick iteration**: Use [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) during
  development

</template>
<template #zh>

* **配置变更**：重启 MCP 客户端
* **服务器代码变更**：重启客户端（Claude Desktop 需完全退出后重新打开，仅关闭窗口是不够的）
* **快速迭代**：开发期间使用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)

</template>
</BiRow>

<BiRow>
<template #en>

## Best practices

</template>
<template #zh>

## 最佳实践

</template>
</BiRow>

<BiRow>
<template #en>

### Logging strategy

</template>
<template #zh>

### 日志策略

</template>
</BiRow>

<BiRow>
<template #en>

1. **Structured Logging**
   * Use consistent formats
   * Include context
   * Add timestamps
   * Track request IDs
2. **Error Handling**
   * Log stack traces
   * Include error context
   * Track error patterns
   * Monitor recovery
3. **Performance Tracking**
   * Log operation timing
   * Monitor resource usage
   * Track message sizes
   * Measure latency

</template>
<template #zh>

1. **结构化日志**
   * 使用一致的格式
   * 包含上下文
   * 添加时间戳
   * 跟踪请求 ID
2. **错误处理**
   * 记录堆栈跟踪
   * 包含错误上下文
   * 跟踪错误模式
   * 监控恢复情况
3. **性能追踪**
   * 记录操作耗时
   * 监控资源占用
   * 跟踪消息大小
   * 测量延迟

</template>
</BiRow>

<BiRow>
<template #en>

### Security considerations

</template>
<template #zh>

### 安全考量

</template>
</BiRow>

<BiRow>
<template #en>

When debugging:

</template>
<template #zh>

调试时：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Sensitive Data**
   * Sanitize logs
   * Protect credentials
   * Mask personal information
2. **Access Control**
   * Verify permissions
   * Check authentication
   * Monitor access patterns

</template>
<template #zh>

1. **敏感数据**
   * 净化日志
   * 保护凭据
   * 对个人信息进行掩码处理
2. **访问控制**
   * 核实权限
   * 检查认证
   * 监控访问模式

</template>
</BiRow>

<BiRow>
<template #en>

For a full treatment of MCP attack vectors and mitigations, see
[Security Best Practices](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices).

</template>
<template #zh>

关于 MCP 攻击向量与缓解措施的完整论述，请参阅[安全最佳实践](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)。

</template>
</BiRow>

<BiRow>
<template #en>

## Getting help

</template>
<template #zh>

## 获取帮助

</template>
</BiRow>

<BiRow>
<template #en>

When encountering issues:

</template>
<template #zh>

遇到问题时：

</template>
</BiRow>

<BiRow>
<template #en>

1. **First Steps**
   * Check server logs
   * Test with [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)
   * Review configuration
   * Verify environment
2. **Support Channels**
   * [GitHub issues](https://github.com/modelcontextprotocol/modelcontextprotocol/issues)
   * [GitHub discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)
3. **Providing Information**
   * Log excerpts
   * Configuration files
   * Steps to reproduce
   * Environment details

</template>
<template #zh>

1. **首要步骤**
   * 检查服务器日志
   * 用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) 测试
   * 复查配置
   * 核实环境
2. **支持渠道**
   * [GitHub issues](https://github.com/modelcontextprotocol/modelcontextprotocol/issues)
   * [GitHub discussions](https://github.com/modelcontextprotocol/modelcontextprotocol/discussions)
3. **提供信息**
   * 日志摘录
   * 配置文件
   * 复现步骤
   * 环境详情

</template>
</BiRow>

<BiRow>
<template #en>

## Next steps

</template>
<template #zh>

## 后续步骤

</template>
</BiRow>

<BiRow>
<template #en>

  - [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)：Learn to use the MCP Inspector
  - [Build an MCP server](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：Walk through building a server from scratch
  - [Connect local servers](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：Full claude\_desktop\_config.json reference and troubleshooting

</template>
<template #zh>

  - [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)：学习使用 MCP Inspector
  - [构建 MCP 服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：完整演练如何从零构建一个服务器
  - [连接本地服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：完整的 claude\_desktop\_config.json 参考与故障排查

</template>
</BiRow>
