# 调试

> 关于模型上下文协议（Model Context Protocol，MCP）集成的全面调试指南

无论是开发 MCP 服务器，还是将其集成到应用中，有效的调试都至关重要。本指南涵盖 MCP 生态中可用的调试工具与方法。

## 调试工具概览

MCP 提供了多种工具，可在不同层面进行调试：

1. **[MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)**：交互式、与传输无关的测试界面。可连接 stdio（标准输入输出）或 Streamable HTTP 服务器，调用[工具](https://modelcontextprotocol.io/specification/latest/server/tools)、[提示词](https://modelcontextprotocol.io/specification/latest/server/prompts)和[资源](https://modelcontextprotocol.io/specification/latest/server/resources)，并观察通知流。排查时应首先从这里入手。
2. **服务器日志**：结构化日志写入 stderr（stdio 传输），或通过 [OpenTelemetry](https://opentelemetry.io/)（适用于所有传输）。通过协议进行的[日志记录](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging)（`notifications/message`）自协议版本 `2026-07-28` 起已弃用。
3. **客户端开发者工具**：大多数 MCP 客户端都会暴露日志和连接状态。示例可参阅下文的[在 Claude Desktop 中调试](#debugging-in-claude-desktop)，或查阅所用客户端的文档。

## 实现日志记录

### 服务器端日志

构建使用本地 [stdio 传输](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)的服务器时，写入 stderr（标准错误）的所有日志消息都会被宿主应用自动捕获。

> **注意：**
> 本地 MCP 服务器不应向 stdout（标准输出）写入日志消息，否则会干扰协议的运行。

对于使用 [Streamable HTTP 传输](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)的服务器，stderr 不会被客户端捕获。日志请使用自己的服务器端日志聚合或 [OpenTelemetry](https://opentelemetry.io/)；检查请求和 SSE 流则可使用标准 HTTP 工具（curl、浏览器 DevTools 的 Network 面板）。

> **注意：**
> 下文的 `notifications/message` 机制自协议版本 `2026-07-28` 起已弃用，在弃用窗口期内仍然可用。

对于所有[传输](https://modelcontextprotocol.io/specification/latest/basic/transports)方式，请记录服务器运行时的行为：

<CodeGroup>
  ```python Python theme={null}
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

  ```typescript TypeScript theme={null}
  await server.sendLoggingMessage({
    level: "info",
    data: "Server started successfully",
  });
  ```
</CodeGroup>

MCP 定义了八个 [RFC 5424 严重级别](https://modelcontextprotocol.io/specification/latest/server/utilities/logging#log-levels)（从 `debug` 到 `emergency`）。客户端通过在请求的 `_meta` 中设置 [`io.modelcontextprotocol/logLevel`](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/logging#per-request-log-level) 字段，按请求选择接收日志消息。对于未携带该字段的请求，服务器不得发送 `notifications/message`。

需要记录的重要事件：

* 启动步骤
* 资源访问
* 工具执行
* 错误情形
* 性能指标

## 常见问题

下文的示例使用 Claude Desktop 的 [`claude_desktop_config.json`](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)；同样的原则适用于任何基于 stdio 的 MCP 客户端。

### 工作目录

当 MCP 客户端启动 stdio 服务器时：

* 通过客户端配置启动的服务器，其工作目录可能没有明确定义（例如在 macOS 上可能是 `/`），因为客户端本身可能从任何位置启动
* 请始终在配置和 `.env` 文件中使用绝对路径，以确保运行可靠
* 若直接通过命令行测试服务器，工作目录就是你执行命令时所在的目录

例如，在 `claude_desktop_config.json` 中应这样配置：

```json theme={null}
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

而不是 `./data` 这样的相对路径

### 环境变量

通过 stdio 启动的 MCP 服务器只会自动继承有限的一部分环境变量（具体包含哪些取决于平台）。

要覆盖默认变量或提供自定义变量，可以在 `claude_desktop_config.json` 中指定 `env` 键：

```json theme={null}
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

### 服务器启动

常见启动问题：

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

### 连接问题

当服务器无法连接时：

1. 检查客户端日志
2. 确认服务器进程仍在运行
3. 用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) 独立测试
4. 验证[协议兼容性](https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning#negotiation)：调用 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) 查看服务器支持哪些协议版本。`UnsupportedProtocolVersionError`（`-32022`）会在其 `data` 字段中列出服务器支持的版本
5. 检查[每个请求的 `_meta` 字段](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta)：每个请求都必须携带 `io.modelcontextprotocol/protocolVersion` 和 `io.modelcontextprotocol/clientCapabilities`，客户端还应包含 `io.modelcontextprotocol/clientInfo`。缺少任一必填字段的请求都会被拒绝，错误码为 `-32602`（Invalid params）——许多其他格式错误的输入也会返回同样的错误码。如果服务器需要的某项能力未在请求的 `clientCapabilities` 中声明，例如[征询](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)（elicitation），它会返回 `MissingRequiredClientCapabilityError`（`-32021`），并指明所缺的能力。检查请求的 `_meta` 和 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) 响应，确认双方声明的内容与预期一致

## 在 Claude Desktop 中调试

Claude Desktop 是众多 MCP 客户端之一，可在 macOS 和 Windows 上使用。

### 检查服务器状态

点击聊天输入框中的「Add files, connectors, and more」加号图标，然后将鼠标悬停在 **Connectors** 菜单上，即可查看已连接的服务器和可用工具。

<img src="https://mintcdn.com/mcp/zNouQwo2h8cbxlDS/images/available-mcp-tools.png?fit=max&auto=format&n=zNouQwo2h8cbxlDS&q=85&s=e2ace1ac88895a5fe30ebd8d01456bc3" alt="Available MCP tools" width="437" height="244" data-path="images/available-mcp-tools.png" />

### 查看日志

日志文件写入以下位置：

* macOS：`~/Library/Logs/Claude`
* Windows：`%APPDATA%\Claude\logs`

<CodeGroup>
  ```bash macOS theme={null}
  tail -n 20 -F ~/Library/Logs/Claude/mcp*.log
  ```

  ```powershell Windows theme={null}
  type "$env:AppData\Claude\logs\mcp*.log"
  ```
</CodeGroup>

日志会记录：

* 服务器连接事件
* 配置问题
* 运行时错误
* 消息交互

### 使用 Chrome DevTools

在 Claude Desktop 中调用 Chrome 的开发者工具，排查客户端侧错误：

1. 创建一个 `developer_settings.json` 文件，将 `allowDevTools` 设为 true：

<CodeGroup>
  ```bash macOS theme={null}
  echo '{"allowDevTools": true}' > ~/Library/Application\ Support/Claude/developer_settings.json
  ```

  ```powershell Windows theme={null}
  '{"allowDevTools": true}' | Set-Content "$env:AppData\Claude\developer_settings.json"
  ```
</CodeGroup>

2. 打开 DevTools：`Command-Option-I`（macOS）或 `Ctrl+Alt+I`（Windows）

注意：你会看到两个 DevTools 窗口：

* 主内容窗口
* 应用标题栏窗口

使用 Console 面板排查客户端侧错误。

使用 Network 面板检查：

* 消息负载
* 连接时序

## 调试工作流

### 开发循环

1. 初始开发
   * 用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector) 做基础测试
   * 实现核心功能
   * 添加日志点
2. 集成测试
   * 在目标 MCP 客户端中测试
   * 监控日志
   * 检查错误处理

### 测试变更

要高效地测试变更：

* **配置变更**：重启 MCP 客户端
* **服务器代码变更**：重启客户端（Claude Desktop 需完全退出后重新打开，仅关闭窗口是不够的）
* **快速迭代**：开发期间使用 [Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)

## 最佳实践

### 日志策略

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

### 安全考量

调试时：

1. **敏感数据**
   * 净化日志
   * 保护凭据
   * 对个人信息进行掩码处理
2. **访问控制**
   * 核实权限
   * 检查认证
   * 监控访问模式

关于 MCP 攻击向量与缓解措施的完整论述，请参阅[安全最佳实践](https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)。

## 获取帮助

遇到问题时：

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

## 后续步骤

  - [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)：学习使用 MCP Inspector
  - [构建 MCP 服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：完整演练如何从零构建一个服务器
  - [连接本地服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：完整的 claude\_desktop\_config.json 参考与故障排查
