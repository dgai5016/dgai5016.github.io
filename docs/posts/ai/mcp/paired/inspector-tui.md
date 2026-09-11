<BiRow>
<template #en>

> The terminal MCP Inspector: navigation, tabs, and keyboard reference

</template>
<template #zh>

> 终端版 MCP Inspector：导航、标签页与键盘操作参考

</template>
</BiRow>

<BiRow>
<template #en>

The TUI is the Inspector's terminal interface, with the same interactive exploration of tools, resources, and prompts as the web client. Use it on a remote host over SSH, in a locked-down environment, or when you prefer to stay in the terminal.

</template>
<template #zh>

TUI 是 Inspector 的终端界面，可以像 web 客户端一样交互式地探索工具、资源和提示词。无论是通过 SSH 在远程主机上、在受限环境中，还是单纯想留在终端里，它都适用。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
npx @modelcontextprotocol/inspector --tui node build/index.js   # with an ad-hoc stdio server
```

</template>
<template #zh>

```bash
npx @modelcontextprotocol/inspector --tui node build/index.js   # with an ad-hoc stdio server
```

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tui-tools.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=5d11d64f4b98df8c26e7ac048f38576f" width="2986" height="1832" data-path="images/inspector/tui-tools.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tui-tools.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=5d11d64f4b98df8c26e7ac048f38576f" width="2986" height="1832" data-path="images/inspector/tui-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Choosing servers

</template>
<template #zh>

## 选择服务器

</template>
</BiRow>

<BiRow>
<template #en>

Unlike the CLI, the TUI has no `--server <name>` flag for picking one entry: it reads its servers from a catalog or config file, loads every server in it, and lets you pick from an on-screen list:

</template>
<template #zh>

与 CLI 不同，TUI 没有用来挑选单个条目的 `--server <name>` 标志：它从目录（catalog）或配置文件读取服务器，将其中的每个服务器都加载进来，再让你从屏幕列表中挑选：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --tui --catalog mcp.json   # writable catalog, seeded empty if missing (unlike the web client)
mcp-inspector --tui --config mcp.json    # read-only session, errors if absent
```

</template>
<template #zh>

```bash
mcp-inspector --tui --catalog mcp.json   # writable catalog, seeded empty if missing (unlike the web client)
mcp-inspector --tui --config mcp.json    # read-only session, errors if absent
```

</template>
</BiRow>

<BiRow>
<template #en>

With neither `--catalog` nor `--config`, and no [ad-hoc target](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#ad-hoc-targets), it uses the default writable catalog `~/.mcp-inspector/mcp.json`. See [Configuration and flags](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration).

</template>
<template #zh>

既未指定 `--catalog` 也未指定 `--config`，也没有[临时目标（ad-hoc target）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#ad-hoc-targets)时，它会使用默认的可写目录 `~/.mcp-inspector/mcp.json`。参见[配置与命令行标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)。

</template>
</BiRow>

<BiRow>
<template #en>

## Tabs

</template>
<template #zh>

## 标签页

</template>
</BiRow>

<BiRow>
<template #en>

| Tab           | Key | What it shows                                                                               |
| ------------- | --- | ------------------------------------------------------------------------------------------- |
| **Info**      | `i` | Server info, capabilities, and negotiated protocol details.                                 |
| **Auth**      | `a` | OAuth state for the selected server, plus a **Clear OAuth state** action.                   |
| **Resources** | `r` | Browse and read resources.                                                                  |
| **Prompts**   | `m` | List prompts and render them with arguments.                                                |
| **Tools**     | `t` | View tools and execute them with form-like inputs.                                          |
| **Protocol**  | `p` | JSON-RPC request/response/notification history.                                             |
| **Network**   | `n` | HTTP traffic for SSE and [Streamable HTTP](https://modelcontextprotocol.io/specification/latest/basic/transports) servers. |
| **Console**   | `o` | `stderr` from a connected stdio server process.                                             |

</template>
<template #zh>

| 标签页        | 按键 | 显示内容                                                    |
| ------------- | ---- | ------------------------------------------------------------ |
| **Info**      | `i`  | 服务器信息、能力（capabilities）与协商后的协议细节。          |
| **Auth**      | `a`  | 所选服务器的 OAuth 状态，外加**清除 OAuth 状态**（Clear OAuth state）操作。 |
| **Resources** | `r`  | 浏览并读取资源。                                              |
| **Prompts**   | `m`  | 列出提示词，并带参数渲染。                                    |
| **Tools**     | `t`  | 查看工具，并通过类表单的输入执行。                            |
| **Protocol**  | `p`  | JSON-RPC 请求/响应/通知历史。                                 |
| **Network**   | `n`  | SSE 与 [Streamable HTTP](https://modelcontextprotocol.io/specification/latest/basic/transports) 服务器的 HTTP 流量。 |
| **Console**   | `o`  | 已连接的 stdio（标准输入输出）服务器进程的 `stderr`。          |

</template>
</BiRow>

<BiRow>
<template #en>

The accelerators avoid collisions rather than always taking the first letter: **P**rotocol takes `p` so Pro**m**pts takes `m`, and **C**onsole takes `o` because `c` is the global Connect action.

</template>
<template #zh>

这些快捷键字母并非一律取首字母，而是有意避开冲突：**P**rotocol 取 `p`，于是 Pro**m**pts 取 `m`；**C**onsole 取 `o`，因为 `c` 留给了全局的 Connect（连接）操作。

</template>
</BiRow>

<BiRow>
<template #en>

## Navigation

</template>
<template #zh>

## 导航

</template>
</BiRow>

<BiRow>
<template #en>

| Key                              | Action                                              |
| -------------------------------- | --------------------------------------------------- |
| `Left` / `Right` arrows or `Tab` | Switch tabs                                         |
| `Up` / `Down` arrows             | Move through the current list                       |
| `Enter`                          | Select an item, execute a tool, or fetch a resource |
| `c`                              | Connect to the selected server                      |
| `d`                              | Disconnect                                          |
| `Esc` or `Ctrl+C`                | Exit                                                |

</template>
<template #zh>

| 按键                               | 操作                        |
| ---------------------------------- | ---------------------------- |
| `Left` / `Right` 方向键或 `Tab`    | 切换标签页                   |
| `Up` / `Down` 方向键               | 在当前列表中移动             |
| `Enter`                            | 选择条目、执行工具或获取资源 |
| `c`                                | 连接到所选服务器             |
| `d`                                | 断开连接                     |
| `Esc` 或 `Ctrl+C`                  | 退出                         |

</template>
</BiRow>

<BiRow>
<template #en>

## Authorizing an HTTP server

</template>
<template #zh>

## 为 HTTP 服务器授权

</template>
</BiRow>

<BiRow>
<template #en>

1. Select an HTTP or SSE server and press **`c`** to connect.
2. If the server requires authorization, the TUI starts OAuth automatically and opens the authorization URL in a browser.
3. When the browser redirect lands on the TUI's loopback listener, the connection finishes on its own, with no second **`c`**.
4. Use the **Auth** tab to inspect the resulting OAuth state, or to clear it.

</template>
<template #zh>

1. 选择一个 HTTP 或 SSE 服务器，按 **`c`** 连接。
2. 如果服务器要求授权，TUI 会自动发起 OAuth，并在浏览器中打开授权 URL。
3. 当浏览器重定向到达 TUI 的回环监听器时，连接会自行完成，无需再按一次 **`c`**。
4. 使用 **Auth** 标签页查看由此产生的 OAuth 状态，或将其清除。

</template>
</BiRow>

<BiRow>
<template #en>

The TUI's callback listener defaults to `http://127.0.0.1:6276/oauth/callback`. The port is fixed on purpose: a pre-registered (static) OAuth client, a [Client ID Metadata Document (CIMD)](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents), or an enterprise-managed IdP all need a redirect URI known in advance. Register that URI once and it works across sessions. On a remote host where your browser is on another machine, forward the callback port so the redirect reaches this listener; see [Callback URLs](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization#callback-urls).

</template>
<template #zh>

TUI 的回调监听器默认监听 `http://127.0.0.1:6276/oauth/callback`。这个端口是刻意固定的：预注册（静态）OAuth 客户端、[客户端 ID 元数据文档（CIMD）](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents)以及企业管理的 IdP，都要求重定向 URI 事先已知。该 URI 只需注册一次，即可跨会话使用。在远程主机上运行时，若浏览器在另一台机器上，请转发回调端口，让重定向能到达这个监听器；参见[回调 URL](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization#callback-urls)。

</template>
</BiRow>

<BiRow>
<template #en>

The trade-off is that only one TUI OAuth flow can hold the port at a time; a second concurrent flow fails with `EADDRINUSE`. To override it, pass `--callback-url` or set `MCP_OAUTH_CALLBACK_URL`: use a different fixed port per instance, or `http://127.0.0.1:0/oauth/callback` for an OS-assigned ephemeral port when your authorization server registers redirect URIs dynamically.

</template>
<template #zh>

代价是同一时刻只能有一个 TUI OAuth 流程占用该端口；并发运行第二个流程会以 `EADDRINUSE` 报错失败。如需覆盖这一行为，请传入 `--callback-url` 或设置 `MCP_OAUTH_CALLBACK_URL`：可为每个实例使用不同的固定端口；如果授权服务器会动态注册重定向 URI，也可以用 `http://127.0.0.1:0/oauth/callback` 获得由操作系统分配的临时端口。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> Redirect URIs must match **exactly** what you registered. `localhost` and
  `127.0.0.1` are different URIs as far as an authorization server is concerned.

</template>
<template #zh>

> **注意：**
> 重定向 URI 必须与所注册的内容**完全**一致。在授权服务器看来，`localhost` 和
  `127.0.0.1` 是两个不同的 URI。

</template>
</BiRow>

<BiRow>
<template #en>

Per-server OAuth fields in the catalog (static client id/secret, scopes, the enterprise-managed flag) are applied automatically. Install-wide settings (CIMD, enterprise IdP) come from `~/.mcp-inspector/storage/client.json`, the same file the web client's **Client Settings** dialog writes. Point at a different one with `--client-config` or `MCP_CLIENT_CONFIG_PATH`.

</template>
<template #zh>

目录中按服务器配置的 OAuth 字段（静态 client id/secret、scopes、企业管理标志）会自动生效。安装级的设置（CIMD、企业 IdP）来自 `~/.mcp-inspector/storage/client.json`，web 客户端的 **Client Settings**（客户端设置）对话框写入的也是这个文件。可用 `--client-config` 或 `MCP_CLIENT_CONFIG_PATH` 指向其他文件。

</template>
</BiRow>

<BiRow>
<template #en>

See [Authorization](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization) for the full picture.

</template>
<template #zh>

完整的授权流程说明参见[授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tui-auth.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=2e5ef574e80e81c4b49fa2ef0eac0528" width="2986" height="1832" data-path="images/inspector/tui-auth.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/tui-auth.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=2e5ef574e80e81c4b49fa2ef0eac0528" width="2986" height="1832" data-path="images/inspector/tui-auth.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Requirements

</template>
<template #zh>

## 环境要求

</template>
</BiRow>

<BiRow>
<template #en>

The TUI needs a real TTY with raw-mode support. It will not run usefully in a headless CI job; use the [CLI](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli) there.

</template>
<template #zh>

TUI 需要支持原始模式（raw mode）的真实 TTY。它在无头 CI 任务中无法有效运行；此类场景请改用 [CLI](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)。

</template>
</BiRow>
