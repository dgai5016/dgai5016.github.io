<BiRow>
<template #en>

> Practical guides for transports, importing configs, reviewing MCP Apps, Docker, and network hosting

</template>
<template #zh>

> 传输连接、配置导入、MCP Apps 审查、Docker 与网络托管的实用指南

</template>
</BiRow>

<BiRow>
<template #en>

## Connecting stdio vs. HTTP servers

</template>
<template #zh>

## 连接 stdio 与 HTTP 服务器

</template>
</BiRow>

<BiRow>
<template #en>

### stdio

</template>
<template #zh>

### stdio

</template>
</BiRow>

<BiRow>
<template #en>

A stdio server is a process the Inspector spawns. Everything positional is the command line:

</template>
<template #zh>

stdio 服务器是 Inspector 派生的一个进程。所有按位置传递的内容，共同构成服务器的命令行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector node build/index.js -- --verbose --config /etc/myserver.conf
```

</template>
<template #zh>

```bash
mcp-inspector node build/index.js -- --verbose --config /etc/myserver.conf
```

</template>
</BiRow>

<BiRow>
<template #en>

Put `--` before any arguments meant for your server. Without the separator, `--verbose` would be
parsed by the Inspector and never reach the server.

</template>
<template #zh>

把传给你服务器的参数放在 `--` 之后。没有这个分隔符的话，`--verbose` 会被 Inspector 解析掉，永远到不了服务器。

</template>
</BiRow>

<BiRow>
<template #en>

Give the process environment variables with `-e` and a working directory with `--cwd`:

</template>
<template #zh>

用 `-e` 给进程传环境变量，用 `--cwd` 指定工作目录：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector -e API_KEY=abc123 -e REGION=us-east-1 --cwd ~/projects/my-server \
  node build/index.js
```

</template>
<template #zh>

```bash
mcp-inspector -e API_KEY=abc123 -e REGION=us-east-1 --cwd ~/projects/my-server \
  node build/index.js
```

</template>
</BiRow>

<BiRow>
<template #en>

The server's `stderr` lands in the **Console** tab (web) or the Console tab (`o`, TUI), which is where most stdio servers put their diagnostics, so check there first when a connection fails for no visible reason.

</template>
<template #zh>

服务器的 `stderr` 会出现在 **Console**（控制台）标签页（web）或 Console 标签页（TUI 中按 `o` 打开）里——大多数 stdio 服务器都把诊断信息写到这里，所以当连接毫无征兆地失败时，先来这里排查。

</template>
</BiRow>

<BiRow>
<template #en>

### HTTP and SSE

</template>
<template #zh>

### HTTP 与 SSE

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --server-url https://api.example.com/mcp --transport http \
  --header "X-Tenant: acme"
```

</template>
<template #zh>

```bash
mcp-inspector --server-url https://api.example.com/mcp --transport http \
  --header "X-Tenant: acme"
```

</template>
</BiRow>

<BiRow>
<template #en>

`--transport` accepts `http` (Streamable HTTP) and `sse`. If the server is protected, see [Authorization](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization): no setup is needed in advance, because when the server answers `401` the Inspector runs the OAuth flow described there and retries the connection.

</template>
<template #zh>

`--transport` 接受 `http`（Streamable HTTP）与 `sse`。如果服务器受保护，参见[授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)：无需提前做任何设置，因为当服务器返回 `401` 时，Inspector 会执行其中描述的 OAuth 流程并重试连接。

</template>
</BiRow>

<BiRow>
<template #en>

For an HTTP server, also decide its [protocol era](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras). The default is `legacy`; set `modern` or `auto` in Server Settings (or `protocolEra` in the catalog file) to exercise the 2026-07-28 behavior.

</template>
<template #zh>

对于 HTTP 服务器，还要选定它的[协议时代（protocol era）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)。默认值为 `legacy`（旧版）；在 Server Settings（服务器设置）中设置 `modern`（新版）或 `auto`（或在目录文件中设置 `protocolEra`），即可启用 2026-07-28 的行为。

</template>
</BiRow>

<BiRow>
<template #en>

## Importing an existing client config

</template>
<template #zh>

## 导入既有客户端配置

</template>
</BiRow>

<BiRow>
<template #en>

On the Servers screen, **Add Servers** can import MCP servers you have already configured
elsewhere instead of retyping them. It parses Claude Desktop, Cursor, Cline, and VS Code client
configs directly, and it also reads a server's own [MCP Registry](https://modelcontextprotocol.io/registry/about) `server.json`.

</template>
<template #zh>

在 Servers（服务器）屏幕上，**Add Servers**（添加服务器）可以导入你在别处已经配置好的 MCP 服务器，无需重新输入。它直接解析 Claude Desktop、Cursor、Cline 和 VS Code 的客户端配置，还能读取服务器自己的 [MCP Registry](https://modelcontextprotocol.io/registry/about) `server.json`。

</template>
</BiRow>

<BiRow>
<template #en>

Import merges into the active [catalog](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#choosing-servers)
(the Inspector's writable server list), so existing entries aren't clobbered. If you'd rather
not touch your catalog at all, launch against the foreign file read-only instead:

</template>
<template #zh>

导入会合并进当前活动的[目录（catalog）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#choosing-servers)（Inspector 的可写服务器列表），因此既有条目不会被覆盖。如果你完全不想动自己的目录，也可以改为只读地针对这份外部文件启动：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --config ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

</template>
<template #zh>

```bash
mcp-inspector --config ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

</template>
</BiRow>

<BiRow>
<template #en>

`--config` guarantees the file is served as-is and never written, seeded, or migrated.

</template>
<template #zh>

`--config` 保证该文件按原样提供，绝不会被写入、预置（seed）或迁移。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/import-config.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=c9f5229c2d827f4bcab37938879f21f2" width="3840" height="2160" data-path="images/inspector/import-config.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/import-config.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=c9f5229c2d827f4bcab37938879f21f2" width="3840" height="2160" data-path="images/inspector/import-config.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Reviewing an MCP App

</template>
<template #zh>

## 审查 MCP App

</template>
</BiRow>

<BiRow>
<template #en>

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) are tools that carry a UI widget. For an automated reviewer (CI or an agent), use the CLI for every check that returns JSON, and open a browser only to inspect the rendered widget.

</template>
<template #zh>

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) 是自带 UI 部件（widget）的工具。对于自动化的审查方（CI 或智能体），凡是返回 JSON 的检查都用 CLI 完成，只在要检视渲染出来的部件时才打开浏览器。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --cli --transport http --server-url https://example.com/mcp \
  --method tools/call --tool-name <tool> --app-info
```

</template>
<template #zh>

```bash
mcp-inspector --cli --transport http --server-url https://example.com/mcp \
  --method tools/call --tool-name <tool> --app-info
```

</template>
</BiRow>

<BiRow>
<template #en>

One JSON line on stdout; exit `0` if the tool has an app, `2` if not, so an `&&` chain short-circuits:

</template>
<template #zh>

stdout 上只有一行 JSON；工具带 app 时退出码为 `0`，不带则为 `2`，因此可以用 `&&` 链短路：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "hasApp": true,
  "toolName": "get_pros",
  "resourceUri": "ui://pros/view.html",
  "csp": { "connectDomains": ["https://api.example.com"] },
  "permissions": { "clipboard": false },
  "prefersBorder": true,
  "resourceMimeType": "text/html"
}
```

</template>
<template #zh>

```json
{
  "hasApp": true,
  "toolName": "get_pros",
  "resourceUri": "ui://pros/view.html",
  "csp": { "connectDomains": ["https://api.example.com"] },
  "permissions": { "clipboard": false },
  "prefersBorder": true,
  "resourceMimeType": "text/html"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

`csp` and `permissions` (and `domain`, when the resource declares one) live on the UI **resource** rather than the tool, so `--app-info` reads that resource. The tool is never called.

</template>
<template #zh>

`csp` 与 `permissions`（以及 `domain`，前提是资源声明了它）长在 UI **资源**（resource）上而非工具上，因此 `--app-info` 读取的是那个资源；工具本身永远不会被调用。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --cli --transport http --server-url https://example.com/mcp \
  --method tools/call --tool-name <tool> --tool-args-json '{"zip":"10001"}' --format json
```

</template>
<template #zh>

```bash
mcp-inspector --cli --transport http --server-url https://example.com/mcp \
  --method tools/call --tool-name <tool> --tool-args-json '{"zip":"10001"}' --format json
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
TOKEN="$(openssl rand -hex 24)"
HOST=127.0.0.1 CLIENT_PORT=6274 MCP_SANDBOX_PORT=6275 \
MCP_AUTO_OPEN_ENABLED=false MCP_INSPECTOR_API_TOKEN="$TOKEN" \
mcp-inspector --web &
```

</template>
<template #zh>

```bash
TOKEN="$(openssl rand -hex 24)"
HOST=127.0.0.1 CLIENT_PORT=6274 MCP_SANDBOX_PORT=6275 \
MCP_AUTO_OPEN_ENABLED=false MCP_INSPECTOR_API_TOKEN="$TOKEN" \
mcp-inspector --web &
```

</template>
</BiRow>

<BiRow>
<template #en>

Pinning `MCP_SANDBOX_PORT` matters here: the app's UI is served from a separate sandbox port that is dynamic by default, and your automation needs a fixed address to reach it.

</template>
<template #zh>

这里务必固定 `MCP_SANDBOX_PORT`：app 的 UI 由一个独立的沙箱（sandbox）端口提供，该端口默认动态分配，而你的自动化流程需要一个固定地址才能访问它。

</template>
</BiRow>

<BiRow>
<template #en>

```
http://127.0.0.1:6274/?serverUrl=<encoded url>&transport=http&autoConnect=<TOKEN>&openApp=<tool>&appArgs=<base64url(JSON)>&autoOpen=<TOKEN>
```

</template>
<template #zh>

```
http://127.0.0.1:6274/?serverUrl=<encoded url>&transport=http&autoConnect=<TOKEN>&openApp=<tool>&appArgs=<base64url(JSON)>&autoOpen=<TOKEN>
```

</template>
</BiRow>

<BiRow>
<template #en>

`appArgs` is the tool's arguments as base64url-encoded JSON, and every deep-link parameter is described under [Deep links](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links). `autoConnect` and `autoOpen` must both equal the session token, since `autoOpen` fires a tool call straight from the URL and needs the same gate as `autoConnect`.

</template>
<template #zh>

`appArgs` 是工具参数经 base64url 编码后的 JSON，每个深度链接参数都在[深度链接（Deep links）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links)一节中有说明。`autoConnect` 与 `autoOpen` 都必须等于会话令牌（session token），因为 `autoOpen` 会直接从 URL 发起一次工具调用，需要与 `autoConnect` 相同的校验关卡。

</template>
</BiRow>

<BiRow>
<template #en>

The Apps screen exposes a stable automation contract. Poll these attributes instead of sleeping:

</template>
<template #zh>

Apps 屏幕对外提供了一份稳定的自动化契约。轮询这些属性，而不是固定 sleep 一段时间：

</template>
</BiRow>

<BiRow>
<template #en>

| Selector                            | Attribute         | Values                                                                                                  |
| ----------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| `[data-testid="apps-form"]`         | `data-app-status` | `ready` (on failure, `data-app-error` carries the reason)                                               |
| `[data-testid="connection-status"]` | `data-status`     | `connecting`, then `connected` or `error` (`data-error-message` has the detail)                         |
| `[data-testid="connection-status"]` | `data-deeplink`   | `parsed`, `rejected`, or `none` (`none` means no deep link was given, `rejected` means one was refused) |

</template>
<template #zh>

| 选择器                              | 属性             | 取值                                                                                                    |
| ----------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
| `[data-testid="apps-form"]`         | `data-app-status` | `ready`（失败时，`data-app-error` 中带有原因）                                                          |
| `[data-testid="connection-status"]` | `data-status`     | `connecting`，随后变为 `connected` 或 `error`（细节在 `data-error-message` 中）                          |
| `[data-testid="connection-status"]` | `data-deeplink`   | `parsed`、`rejected` 或 `none`（`none` 表示没有给出深度链接，`rejected` 表示链接被拒绝）                 |

</template>
</BiRow>

<BiRow>
<template #en>

## Docker

</template>
<template #zh>

## Docker

</template>
</BiRow>

<BiRow>
<template #en>

A container image is published to GitHub Container Registry for `linux/amd64` and `linux/arm64`:

</template>
<template #zh>

容器镜像已发布到 GitHub Container Registry，支持 `linux/amd64` 与 `linux/arm64`：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker run --rm -p 6274:6274 ghcr.io/modelcontextprotocol/inspector
```

</template>
<template #zh>

```bash
docker run --rm -p 6274:6274 ghcr.io/modelcontextprotocol/inspector
```

</template>
</BiRow>

<BiRow>
<template #en>

Read the [session token](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#the-session-token) from the container logs, or pin it with `-e MCP_INSPECTOR_API_TOKEN=<value>`.

</template>
<template #zh>

从容器日志中读取[会话令牌](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#the-session-token)，或用 `-e MCP_INSPECTOR_API_TOKEN=<value>` 固定它。

</template>
</BiRow>

<BiRow>
<template #en>

The image defaults to `--web`, bound to `0.0.0.0:6274` with browser auto-open off, and runs as a non-root user. It sets `DANGEROUSLY_BIND_ALL_INTERFACES=true` because a container must bind the wildcard address to be reachable through `-p`.

</template>
<template #zh>

该镜像默认以 `--web` 模式运行，绑定 `0.0.0.0:6274`，关闭浏览器自动打开，并以非 root 用户运行。它设置了 `DANGEROUSLY_BIND_ALL_INTERFACES=true`，因为容器必须绑定通配地址，才能经 `-p` 端口映射访问到。

</template>
</BiRow>

<BiRow>
<template #en>

Its `HEALTHCHECK` probes the web UI, so add `--no-healthcheck` when running `--cli` or `--tui` (neither has a web server). `<target>` below is an [ad-hoc target](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#ad-hoc-targets): a positional stdio command, or `--server-url <url> --transport http`.

</template>
<template #zh>

镜像的 `HEALTHCHECK` 探测的是 web UI，因此在以 `--cli` 或 `--tui` 运行时（两者都没有 web 服务器）请加上 `--no-healthcheck`。下文中的 `<target>` 是一个[临时目标（ad-hoc target）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#ad-hoc-targets)：一条以位置参数形式给出的 stdio 命令，或 `--server-url <url> --transport http`。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker run --rm --no-healthcheck ghcr.io/modelcontextprotocol/inspector --cli <target> --method tools/list
```

</template>
<template #zh>

```bash
docker run --rm --no-healthcheck ghcr.io/modelcontextprotocol/inspector --cli <target> --method tools/list
```

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> **If you remap the published port, set `ALLOWED_ORIGINS`.** With `-p
  8080:6274` the browser's origin becomes `http://localhost:8080`, which no
  longer matches the in-container port, and connects will `403`. Either run `-e
  CLIENT_PORT=8080 -p 8080:8080`, or set `-e
  ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080`.

</template>
<template #zh>

> **注意：**
> **如果你重新映射了对外发布的端口，请设置 `ALLOWED_ORIGINS`。** 使用 `-p 8080:6274` 时，浏览器的源（origin）变成 `http://localhost:8080`，与容器内端口不再匹配，连接会收到 `403`。要么改用 `-e CLIENT_PORT=8080 -p 8080:8080`，要么设置 `-e ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080`。

</template>
</BiRow>

<BiRow>
<template #en>

## Hosting on a network

</template>
<template #zh>

## 在网络上托管

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector binds `localhost` by default and its backend spawns processes, so treat exposing it to a network as a deliberate decision.

</template>
<template #zh>

Inspector 默认绑定 `localhost`，且其后端会派生进程，因此，把它暴露到网络应当是一项刻意为之的决定。

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector refuses to bind the **wildcard** all-interfaces addresses (`0.0.0.0`, `::`, and every equivalent spelling) unless you set `DANGEROUSLY_BIND_ALL_INTERFACES=true`. Binding a **specific** address is allowed with no opt-in, because that's one deliberate exposure rather than every interface at once, which is the shape DNS-rebinding attacks target.

</template>
<template #zh>

除非设置了 `DANGEROUSLY_BIND_ALL_INTERFACES=true`，否则 Inspector 会拒绝绑定**通配**（wildcard）全接口地址（`0.0.0.0`、`::` 及一切等价写法）。绑定**特定**地址则无需任何开关，因为那是一次有意的单点暴露，而非一次性暴露全部接口——后者正是 DNS 重绑定攻击所瞄准的形态。

</template>
</BiRow>

<BiRow>
<template #en>

| Goal                                         | What to do                                                                                                                                             |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Reach it from another machine on the LAN** | `HOST=192.168.1.50`. The default origin allow-list follows the bind host, so `http://192.168.1.50:6274` is accepted with no further config.            |
| **Behind TLS or a reverse proxy**            | The browser's `Origin` becomes the public origin, which won't match the bind host. Set `ALLOWED_ORIGINS=https://inspector.example.com`.                |
| **Wildcard bind (containers)**               | Set `DANGEROUSLY_BIND_ALL_INTERFACES=true`. Loopback access still works out of the box; reaching it at a non-loopback address needs `ALLOWED_ORIGINS`. |

</template>
<template #zh>

| 目标                                         | 做法                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **从局域网内另一台机器访问它**               | `HOST=192.168.1.50`。默认的源允许列表会跟随绑定主机，因此 `http://192.168.1.50:6274` 无需额外配置即可被接受。                                            |
| **位于 TLS 或反向代理之后**                  | 浏览器的 `Origin` 变成了对外的源，与绑定主机不匹配。请设置 `ALLOWED_ORIGINS=https://inspector.example.com`。                                             |
| **通配绑定（容器）**                         | 设置 `DANGEROUSLY_BIND_ALL_INTERFACES=true`。回环访问开箱即用；要以非回环地址访问则需要 `ALLOWED_ORIGINS`。                                              |

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> `ALLOWED_ORIGINS` **replaces** the default list rather than merging with it. List every origin you'll browse from, including the loopback forms you want to keep:

</template>
<template #zh>

> **注意：**
> `ALLOWED_ORIGINS` **会替换**默认列表，而不是与其合并。请把你打算从其访问的每一个源都列上，包括你想保留的回环形式：

</template>
</BiRow>

<BiRow>
<template #en>

  ```
  ALLOWED_ORIGINS=http://localhost:6274,http://127.0.0.1:6274,http://192.168.1.50:6274
  ```

</template>
<template #zh>

  ```
  ALLOWED_ORIGINS=http://localhost:6274,http://127.0.0.1:6274,http://192.168.1.50:6274
  ```

</template>
</BiRow>

<BiRow>
<template #en>

  Each entry must include the scheme; a scheme-less value is dropped with a warning. A blank value does **not** disable the check; it falls back to the default. There is no knob to turn origin validation off.

</template>
<template #zh>

  每一项都必须包含 scheme（协议）；不带 scheme 的值会被丢弃并给出警告。留空**不会**关闭这项校验，而是回退到默认列表。没有任何开关可以关闭源校验。

</template>
</BiRow>

<BiRow>
<template #en>

Two further caveats when going off loopback:

</template>
<template #zh>

一旦走出回环，还有两点需要注意：

</template>
</BiRow>

<BiRow>
<template #en>

* **MCP Apps need their sandbox port reachable too.** It's a separate, dynamic-by-default port; pin it with `MCP_SANDBOX_PORT` and expose or forward it. The Docker image publishes only `6274`.
* **MCP Apps can't render over TLS or at a bare IPv6 literal.** The sandbox URL is always plain `http`, so an `https://` page blocks the iframe as mixed content; and a bracketed IPv6 literal isn't a valid CSP host-source, so browse at a name or an IPv4 address.

</template>
<template #zh>

* **MCP Apps 的沙箱端口也必须可达。** 它是一个独立的、默认动态分配的端口；请用 `MCP_SANDBOX_PORT` 固定它，并暴露或转发该端口。Docker 镜像只发布了 `6274` 一个端口。
* **MCP Apps 无法在 TLS 下或裸 IPv6 字面量地址上渲染。** 沙箱 URL 始终是纯 `http`，因此 `https://` 页面会把该 iframe 当作混合内容拦截；而带方括号的 IPv6 字面量不是合法的 CSP host-source，所以请通过主机名或 IPv4 地址访问 Inspector。

</template>
</BiRow>

<BiRow>
<template #en>

Whatever the shape: keep authentication on. Do not set `DANGEROUSLY_OMIT_AUTH` on anything reachable by anyone but you.

</template>
<template #zh>

无论采用哪种形态，都请保持认证开启。凡是除你之外还有人能访问到的东西，都不要设置 `DANGEROUSLY_OMIT_AUTH`。

</template>
</BiRow>

<BiRow>
<template #en>

## Development workflow

</template>
<template #zh>

## 开发工作流

</template>
</BiRow>

<BiRow>
<template #en>

A loop that works well in practice:

</template>
<template #zh>

一套在实践中行之有效的循环：

</template>
</BiRow>

<BiRow>
<template #en>

`--method initialize` confirms the server starts, handshakes, and reports
the capabilities you expect, in one second, with a machine-readable answer.
Most "it doesn't work" turns out to be here.

</template>
<template #zh>

`--method initialize` 能在一秒内确认服务器可以启动、完成握手并报告你预期的能力，应答还是机器可读的。大多数“跑不起来”的问题，根源都在这一步。

</template>
</BiRow>

<BiRow>
<template #en>

Schema-driven forms, rendered results, and the Protocol tab beside them make
it fast to find the case where a tool misbehaves.

</template>
<template #zh>

Schema 驱动的表单、渲染出来的结果，再加上旁边的 Protocol 标签页，能帮你迅速定位工具行为异常的那类用例。

</template>
</BiRow>

<BiRow>
<template #en>

Invalid inputs, missing required prompt arguments, concurrent calls, and,
for HTTP servers, both protocol eras. Verify the *errors* are as intentional
as the successes.

</template>
<template #zh>

无效输入、缺少必填的提示词参数、并发调用，对 HTTP 服务器还要两个协议时代都试一遍。要验证这些*错误*与成功结果一样，都是有意为之。

</template>
</BiRow>

<BiRow>
<template #en>

Turn what you found into a CI assertion: pipe the CLI's `--format json`
output to `jq -e` with `--stored-auth-only`, so a missing token fails fast
instead of starting interactive OAuth. See [Verify a server in
CI](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli#verify-a-server-in-ci) for the full
command.

</template>
<template #zh>

把你的发现固化成一条 CI 断言：把 CLI 的 `--format json` 输出通过管道传给 `jq -e`，并加上 `--stored-auth-only`，这样令牌缺失时会快速失败，而不是启动交互式 OAuth。完整命令见[在 CI 中验证服务器](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli#verify-a-server-in-ci)。

</template>
</BiRow>
