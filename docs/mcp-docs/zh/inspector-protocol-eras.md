# 协议时代

> Inspector 如何协商旧版（legacy）与新版（modern）MCP，以及各项功能在两个协议时代下分别如何处理

2026-07-28 修订版对 MCP 协议做了重大改动。因此，Inspector 把**协议时代（protocol era）**（旧版 legacy 或新版 modern，分别指该修订之前与自该修订起）视为一个一等设置，逐服务器（per-server）生效，并与传输（transport）正交：同一个 HTTP URL 既可以作为旧版服务器、也可以作为新版服务器来检查。根据当前生效的协议时代，若干标签页会渲染出明显不同的 UI 和流量。

## `Protocol Era` 设置

每个服务器都有一个 `protocolEra` 取值：`legacy`、`auto` 或 `modern`。在 web 客户端中，它位于 **Server Settings**（服务器设置）里；在目录（catalog）或配置文件中，它是 `protocolEra` 字段；在 CLI 和 TUI 中，它同样来自该文件。

| 协议时代 | Inspector 在连接时所做的事                                          |
| -------- | -------------------------------------------------------------------- |
| `legacy` | **默认值。** 只发起普通的 `initialize`，完全不做探测。                |
| `auto`   | 先探测 `server/discover`，任何非新版结果都回退到 `initialize`。       |
| `modern` | 精确锁定 `2026-07-28`。没有回退，因此非新版服务器会明确报错。        |

> **注：**
> **为什么默认是 `legacy` 而不是 `auto`。** 调试工具绝不能自动探测。对静默的旧版 stdio 服务器发起 `server/discover` 探测会挂起，而且会污染你专程来看的流量记录（transcript）。选择 `auto` 或 `modern` 是一种刻意之举，因此你在 Protocol 标签页中看到的，正是你的服务器从一个以你所配置的方式行事的客户端那里会看到的内容。

在三种客户端中，协议时代的选择方式完全一致。

连接建立后，协商出的协议时代会显示在连接头部区域（connection header）和 **Connection Info**（连接信息）中。在新版连接上，`server/discover` 还会提供 `capabilities`（包括 `extensions`）、`instructions` 以及 `supportedVersions` 列表。服务器的名称和版本则通过结果 `_meta` 中的 `io.modelcontextprotocol/serverInfo` 传回。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/settings-protocol-era.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=34566c45f97c8af0e2c0d9ee0493b572" width="3840" height="2160" data-path="images/inspector/settings-protocol-era.png" />

## 在本地复现各个协议时代

下面每一节的末尾都有一个 **Reproduce with ...** 指引，指向 Inspector 仓库自带的**可组合测试服务器（composable test servers）**之一的 JSON 配置。克隆仓库、构建测试服务器，然后让 Inspector 指向该小节点名的那份配置即可。

```bash theme={null}
git clone https://github.com/modelcontextprotocol/inspector
cd inspector && npm install && npm run build
cd clients/web && npm run test-servers:build
```

***

## 日志

    日志是**会话级（session-scoped）**的。客户端发送一次 `logging/setLevel`，随后的整个会话期间，服务器都会以该级别或更高级别发出 `notifications/message`。

    **Logs** 标签页提供一个 **Set Active Level** 选择器和一个 **Set** 按钮。选好级别、点击 Set，随后服务器日志便会流入面板。

    可用 `test-servers/configs/logging-legacy-http.json` 复现。

    `logging/setLevel` **没有了**。改为客户端**按请求**逐个启用（opt in）：在每个发出的请求上打上 `_meta["io.modelcontextprotocol/logLevel"]` 标记。对未启用的请求，服务器不得（MUST NOT）发出 `notifications/message`。

    因此，**Logs** 标签页改为显示一个 **Log Level per Request** 控件。选定级别后，后续每个请求都会携带该标记，在 Network 标签页的请求体中可以看到。处理请求期间产生的日志会随该请求的 SSE 响应流一起返回。

    把控件设为 **Off** 后，`logLevel` 键会被完全省略，于是同一个工具调用不会产生任何日志。这种静默是正确行为，不是 bug。

    逐服务器的默认值为 `debug`（因为 Inspector 是调试工具，默认以最详尽的级别启用）；在某台服务器上设置 `modernLogLevel: "off"` 即可让其默认不启用。

    可用 `test-servers/configs/logging-modern-http.json` 复现。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/logs-legacy.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=ec5fddd86d1fe7ecc1ef83549798f33e" width="3840" height="2160" data-path="images/inspector/logs-legacy.png" />

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/logs-modern.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=85a1d7118a1e693930aefab8ca6b21a3" width="3840" height="2160" data-path="images/inspector/logs-modern.png" />

***

## 资源订阅

    点击某个资源上的 **Subscribe** 会发送 `resources/subscribe`。Subscriptions 区域会列出该 URI，不带任何流式界面装饰（chrome）。资源发生变化时，服务器会发出 `notifications/resources/updated`，被订阅的卡片随之打上最新的更新时间。

    可用 `test-servers/configs/subscriptions-legacy-http.json` 复现；该配置还提供一个 `update_resource` 工具，让你能亲自驱动这趟通知往返。

    同样是这个 **Subscribe** 按钮，现在发送的是 **`subscriptions/listen`**，其过滤器中带上了 `resourceSubscriptions` 以及对 `resourcesListChanged` 的显式启用。服务器发出 `notifications/subscriptions/acknowledged` 时，订阅即告确认。

    由于订阅现在是一个长生命周期流，而不再是一个会话标志，Subscriptions 区域的标题栏会多出一个**流状态徽章**，状态从 `Connecting...` 变为 `Listening`。一旦流断开，Inspector 会重新发送 `subscriptions/listen` 进行重连。

    可用 `test-servers/configs/subscriptions-modern-http.json` 复现。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/resources-subscriptions-modern.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=5ca4c64c6783eb210fe54248f03de144" width="3840" height="2160" data-path="images/inspector/resources-subscriptions-modern.png" />

***

## 任务

任务在两个协议时代之间的变化最大，包括 *Inspector 的 UI 标签页如何受门控*。

    服务器声明（advertise）`capabilities.tasks` 能力时，**Tasks** 标签页就会出现。勾选 **Run as task** 运行某个工具，该标签页便会列出它：列表由 `tasks/list` 填充，通过 `tasks/get` 轮询。完成后的载荷用一个**阻塞式的 `tasks/result`** 获取，**Cancel** 则发送 `tasks/cancel`。

    可用 `test-servers/configs/tasks-legacy-http.json` 复现。

    任务是一种**扩展（extension）**（`io.modelcontextprotocol/tasks`，[SEP-2663](https://modelcontextprotocol.io/seps/2663-tasks-extension)），因此该标签页的门控依据是*协商成功的扩展*，而不是 `capabilities.tasks`。

    以任务方式运行某个工具时，`tools/call` 会返回一个 `CreateTaskResult`（`resultType: "task"`，在 Protocol 和 Network 标签页中可见）。Inspector 只轮询 **`tasks/get`**；没有 `tasks/list`，因此 **Refresh** 只会对客户端已知的句柄重新轮询。已完成的任务会**内联返回其结果**，无需阻塞式的 `tasks/result` 调用。

    需要更多信息的任务会转入 `input_required`，并在待处理请求模态框中呈现一个内嵌的[征询（elicitation）](https://modelcontextprotocol.io/specification/draft/client/elicitation)（即每当有请求在等你回应时，web 客户端打开的那个对话框）。作答后会发送携带 `inputResponses` 的 **`tasks/update`**，下一轮轮询即告完成。

    可用 `test-servers/configs/tasks-modern-http.json` 复现（工具 `modern_task` 和 `modern_input_task`）。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tasks-legacy.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=777729bfc1b58b359808c8120d9597d3" width="3840" height="2160" data-path="images/inspector/tasks-legacy.png" />

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tasks-modern.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=8e90d128528463fd672537c79db2e1fe" width="3840" height="2160" data-path="images/inspector/tasks-modern.png" />

***

## 多轮工具结果（MRTR）

在新版协议时代，工具可以返回 `input_required` 而非最终结果，其中内嵌一个[征询（elicitation）](https://modelcontextprotocol.io/specification/draft/client/elicitation)、一个[采样（sampling）](https://modelcontextprotocol.io/specification/draft/client/sampling)请求或一个 [`roots/list`](https://modelcontextprotocol.io/specification/draft/client/roots) 请求。客户端应答这个内嵌请求，再以一个全新的 JSON-RPC id 重试 `tools/call`，直到调用到达 `complete`。

Inspector **手动**驱动 MRTR，因此每一轮都会停在带 `input_required` 标记的**待处理请求模态框**处等你作答。Protocol 视图会把整段交换归组为一次 MRTR 对话，而不是一堆互不相关的调用。

`test-servers/configs/mrtr-showcase-http.json` 把所有形态打包进一个新版服务器：

| 工具            | 考察的内容                                                            |
| --------------- | --------------------------------------------------------------------- |
| `mrtr_confirm`  | 单轮征询。                                                             |
| `mrtr_two_step` | 两轮征询，经由 `requestState` 串联。                                   |
| `mrtr_sample`   | 一个内嵌的采样请求，路由到 Sampling 面板。                             |
| `mrtr_roots`    | 一个内嵌的 `roots/list`，从已配置的根目录（roots）静默作答（无模态框）。     |
| `mrtr_edge`     | 先是一轮仅含 `inputRequests` 的回合，再是一轮仅含 `requestState` 的回合。   |
| `mrtr_loop`     | 永不完成，因此客户端会停在 `MRTR_MAX_ROUNDS` 上限处。                  |

> **注：**
> 旧版 `collect_elicitation` 模式（由服务器调用 `server.elicitInput`）在 2026-07-28 连接上会**报错**，因为该版本不允许服务器向客户端发起请求。MRTR 是它的新版替代方案。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/mrtr-pending-request.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=99f8acb7f845a12aed42bcea4d310fee" width="3840" height="2160" data-path="images/inspector/mrtr-pending-request.png" />

***

## 工具：镜像请求头与被排除的工具

[SEP-2243](https://modelcontextprotocol.io/seps/2243-http-standardization) 允许工具用 `x-mcp-header` 标注某个参数，要求 Streamable HTTP 客户端把该参数的值镜像到一个 `Mcp-Param-*` 请求头中。

Inspector 在 **Tools** 标签页中把这份契约的两半都摆在你面前：

* 带有**有效**标注的工具，其详情面板会显示一个 **"Mirrored request headers (SEP-2243)"** 小节，例如 `city -> Mcp-Param-City`。
* 带有**无效**标注的工具（比如请求头名称为 `"Bad Header"`——空格使它不是一个合法的 RFC 9110 token）会在侧边栏中显示为删除线样式，归在 **"Excluded (SEP-2243)"** 分隔栏之下，悬停可查看原因。符合规范的客户端必须（MUST）把这种工具从 `tools/list` 中剔除；而 Inspector 会让你看到它*为什么*被剔除，而不是悄悄藏起来。

可用 `test-servers/configs/xmcpheader-modern-http.json` 复现。

> **注意：**
> **在浏览器中，SDK 会跳过 `Mcp-Param-*` 镜像。** 从 *web* 客户端调用带镜像的工具时会省略该请求头，因此严格的服务器会应答 `-32020`（`HeaderMismatch`，见下文的[错误分类体系](#network-and-protocol-headers-and-the-error-taxonomy)）。同一个工具从 **CLI** 或 **TUI**（两者都运行在 Node 上）调用则能正确镜像。该请求头是被 SDK 内部的一处环境检查丢弃的，超出 Inspector 的控制范围。

 Mcp-Param-City header, while invalid_header_tool is struck through under the Excluded (SEP-2243) divider.">
  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tools-sep2243.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=98b020f6612b3a76b78b1a8d6159c2c0" width="3840" height="2160" data-path="images/inspector/tools-sep2243.png" />

### `-32602` 错误面板

在新版协议时代下，以 `-32602` 拒绝的 `tools/call` 会渲染为一个独立的**错误面板**：

* **Unknown Tool**：错误消息中提到的工具不在服务器的列表中。调用任何未出现在服务器 `tools/list` 中的名称即可复现。
* **Invalid Parameters**：其余一切 `-32602`。用上文配置中的 `trigger_invalid_params` 工具即可复现。

两种协议时代都会以 `-32602` 拒绝；变化的只是 Inspector 的呈现方式。在旧版连接上，你只会得到一个笼统的 JSON-RPC 失败，必须阅读错误消息才能分辨遇到的是哪种情况。

***

## Network 与 Protocol：请求头与错误分类体系

新版协议时代标准化了一组 `Mcp-*` HTTP 请求头，并引入了一套更丰富的 JSON-RPC 错误分类体系（[SEP-2243](https://modelcontextprotocol.io/seps/2243-http-standardization) / [SEP-2575](https://modelcontextprotocol.io/seps/2575-stateless-mcp)）。两个监控标签页各司其职：

* **Network** 标签页是 HTTP 视图：镜像的 `Mcp-*` 请求头会被高亮，哨兵值会被解码。
* **Protocol** 标签页是 JSON-RPC 视图：每种规范错误都独立渲染，而不是显示为一次笼统的失败。

`test-servers/configs/modern-network-http.json` 提供四个工具，各自产生一个真实的 HTTP 状态码外加一个 JSON-RPC 错误体，每类一个：

| 工具                          | HTTP  | JSON-RPC 错误码 | 含义                                          |
| ------------------------------ | ----- | --------------- | ------------------------------------------- |
| `trigger_header_mismatch`     | `400` | `-32020`        | 必需的镜像请求头缺失或有误。                 |
| `trigger_missing_capability`  | `400` | `-32021`        | 请求遗漏了服务器所要求的客户端能力。         |
| `trigger_unsupported_version` | `400` | `-32022`        | 不支持的版本；支持的版本见 `data.supported`。 |
| `trigger_method_not_found`    | `404` | `-32601`        | 方法未找到。                                 |

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/network-modern-headers.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=7df4c01f5ab68aa7632ac3b5a5866b42" width="3840" height="2160" data-path="images/inspector/network-modern-headers.png" />

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/protocol-modern-error.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=d578ea8262ff327e4d61d3697937900b" width="3840" height="2160" data-path="images/inspector/protocol-modern-error.png" />

***

## 会话

旧版 Streamable HTTP 连接可能携带一个由服务器分配的会话 id（`Mcp-Session-Id`），客户端通过一次 HTTP `DELETE` 将其拆除。新版连接则是**无会话、逐请求**的：没有会话 id，客户端 SDK 就不会向服务器发送 `DELETE`，因此断开连接纯属本地行为。

这对编写你自己的测试服务器有一个实际影响。逐请求构建的无状态新版处理器无法在多次调用之间保留状态，这也正是 `test-servers/configs/subscriptions-modern-http.json` 与其旧版对应配置不同、未提供 `update_resource` 工具的原因：那次变更会作用在一个用完即弃的服务器实例上，对下一次读取不可见。
