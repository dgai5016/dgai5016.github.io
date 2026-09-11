<BiRow>
<template #en>

> How the MCP Inspector performs OAuth, re-authorizes mid-session, and shares tokens between its clients

</template>
<template #zh>

> MCP Inspector 如何执行 OAuth、在会话中途重新授权，以及在各客户端之间共享 token

</template>
</BiRow>

<BiRow>
<template #en>

Remote MCP servers usually require authorization. The Inspector implements the full [authorization](https://modelcontextprotocol.io/specification/latest/basic/authorization) flow in all three clients, sharing the resulting tokens on disk so a login done once is usable everywhere.

</template>
<template #zh>

远程 MCP 服务器通常要求授权。Inspector 在全部三种客户端形态中实现了完整的[授权](https://modelcontextprotocol.io/specification/latest/basic/authorization)流程，并把得到的 token 共享到磁盘上，因此登录一次即可处处可用。

</template>
</BiRow>

<BiRow>
<template #en>

## The flow, end to end

</template>
<template #zh>

## 端到端流程

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector connects to the server URL. The server answers `401`. When the
response carries a `WWW-Authenticate` header, it points at the
protected-resource metadata URL (`resource_metadata`) and, optionally, the
scopes the request requires.

</template>
<template #zh>

Inspector 连接到服务器 URL。服务器返回 `401`。当响应携带
`WWW-Authenticate` 头时，该头会指出受保护资源元数据 URL
（`resource_metadata`），并可选地给出请求所需的作用域（scope）。

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector fetches the server's [protected-resource and
authorization-server
metadata](https://modelcontextprotocol.io/specification/latest/basic/authorization/authorization-server-discovery)
to learn the endpoints and the supported grants.

</template>
<template #zh>

Inspector 获取服务器的[受保护资源与授权服务器
元数据](https://modelcontextprotocol.io/specification/latest/basic/authorization/authorization-server-discovery)，
以了解各项端点以及支持的授权模式（grant）。

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector identifies itself to the authorization server through
whichever mechanism is configured: [dynamic client
registration](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#dynamic-client-registration),
a pre-registered static client (`--client-id` / `--client-secret`), a
[Client ID Metadata
Document](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents)
(`--client-metadata-url`), or an [enterprise-managed
IdP](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization).

</template>
<template #zh>

Inspector 通过所配置的任意一种机制向授权服务器表明身份：[动态客户端
注册](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#dynamic-client-registration)、
预注册的静态客户端（`--client-id` / `--client-secret`）、
[客户端 ID 元数据文档（Client ID Metadata
Document）](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents)
（`--client-metadata-url`），或[企业托管
IdP](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization)。

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector opens the authorization URL. You sign in and consent.

</template>
<template #zh>

Inspector 打开授权 URL。你完成登录并同意授权。

</template>
</BiRow>

<BiRow>
<template #en>

The authorization server redirects to the Inspector's callback URL, carrying
the authorization code.

</template>
<template #zh>

授权服务器重定向到 Inspector 的回调 URL，并携带授权码。

</template>
</BiRow>

<BiRow>
<template #en>

The code is exchanged for tokens, the tokens are persisted, and the original
connect (or, for a [mid-session challenge](#mid-session-re-authorization),
the request that was refused) is retried automatically.

</template>
<template #zh>

随后用授权码换取 token，token 随即持久化，最初的连接（若是[会话中途
质询（challenge）](#mid-session-re-authorization)，则是被拒绝的那个
请求）会自动重试。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/auth-connection-info.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=01a8d11058c2d33e0069b8dec98591b5" width="3840" height="2160" data-path="images/inspector/auth-connection-info.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/auth-connection-info.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=01a8d11058c2d33e0069b8dec98591b5" width="3840" height="2160" data-path="images/inspector/auth-connection-info.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Callback URLs

</template>
<template #zh>

## 回调 URL

</template>
</BiRow>

<BiRow>
<template #en>

The web app listens for the OAuth callback on its own URL, while the CLI and TUI deliberately share a second one:

</template>
<template #zh>

Web 应用在自身 URL 上监听 OAuth 回调，而 CLI 和 TUI 则特意共用第二个回调地址：

</template>
</BiRow>

<BiRow>
<template #en>

| Surface | Default callback                       | Why                                                                                |
| ------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **Web** | `http://localhost:6274/oauth/callback` | The main app server already has an HTTP listener.                                  |
| **CLI** | `http://127.0.0.1:6276/oauth/callback` | A dedicated loopback listener, so it doesn't collide with a running web Inspector. |
| **TUI** | `http://127.0.0.1:6276/oauth/callback` | The same listener as the CLI.                                                      |

</template>
<template #zh>

| 形态 | 默认回调地址                            | 原因                                                                               |
| ----- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **Web** | `http://localhost:6274/oauth/callback` | 主应用服务器本身已有 HTTP 监听器。                                  |
| **CLI** | `http://127.0.0.1:6276/oauth/callback` | 使用专用环回监听器，避免与正在运行的 Web Inspector 冲突。 |
| **TUI** | `http://127.0.0.1:6276/oauth/callback` | 与 CLI 共用同一监听器。                                                      |

</template>
</BiRow>

<BiRow>
<template #en>

**Register `http://127.0.0.1:6276/oauth/callback`** on any IdP that requires pre-registered redirect URIs before using the CLI or TUI. A predictable default is the point: you register once and reuse it.

</template>
<template #zh>

对于任何要求预先注册重定向 URI 的 IdP，先**注册 `http://127.0.0.1:6276/oauth/callback`**，然后再使用 CLI 或 TUI。默认回调地址固定可预测，正是用意所在：注册一次，处处复用。

</template>
</BiRow>

<BiRow>
<template #en>

Override with `--callback-url` or `MCP_OAUTH_CALLBACK_URL`.

</template>
<template #zh>

可通过 `--callback-url` 或 `MCP_OAUTH_CALLBACK_URL` 覆盖。

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> The callback URL **must bind a loopback host**: `localhost`, `127.0.0.0/8`, or
  `[::1]`. The listener receives the authorization code over plaintext `http`,
  so a non-loopback host is rejected with an error and there is no flag to
  override that. If your browser runs on a different machine, forward the
  callback port to it; `--print-handoff` (below) prints a ready-made
  `portForwardCmd`.

</template>
<template #zh>

> **注意：**
> 回调 URL **必须绑定环回主机**：`localhost`、`127.0.0.0/8` 或
> `[::1]`。监听器通过明文 `http` 接收授权码，因此非环回主机会被报错
> 拒绝，且没有任何标志能覆盖这一限制。如果你的浏览器运行在另一台
> 机器上，请将回调端口转发到那台机器；`--print-handoff`（见下文）
> 会输出一条现成的 `portForwardCmd`。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Redirect URIs must match your registration **exactly**. `http://localhost:6276/...` and `http://127.0.0.1:6276/...` are different URIs to an authorization server, even though they reach the same listener.

</template>
<template #zh>

> **注：**
> 重定向 URI 必须与你的注册信息**完全**一致。`http://localhost:6276/...` 和 `http://127.0.0.1:6276/...` 对授权服务器来说是两个不同的 URI，即使它们访问的是同一个监听器。

</template>
</BiRow>

<BiRow>
<template #en>

  Only one process can hold the default port at a time; a second concurrent flow fails with `EADDRINUSE`. Use a different fixed port per instance, or `http://127.0.0.1:0/oauth/callback` for an OS-assigned ephemeral port when your authorization server supports dynamic redirect-URI registration.

</template>
<template #zh>

  默认端口同一时刻只能由一个进程持有；第二个并发授权流程会以 `EADDRINUSE` 报错失败。请为每个实例使用不同的固定端口；若授权服务器支持动态重定向 URI 注册，也可使用 `http://127.0.0.1:0/oauth/callback`，由操作系统分配临时端口。

</template>
</BiRow>

<BiRow>
<template #en>

## Where credentials live

</template>
<template #zh>

## 凭据存放在哪里

</template>
</BiRow>

<BiRow>
<template #en>

| File                                                                                                                 | Contents                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `~/.mcp-inspector/storage/oauth.json`                                                                                | Tokens and client information, keyed by canonicalized server URL. Written owner-only.                                                  |
| `~/.mcp-inspector/storage/client.json`                                                                               | Install-level client settings (client metadata URL, enterprise IdP). The same file the web client's **Client Settings** dialog writes. |
| The server's `oauth` block in the [catalog file](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#catalog-file-format) | Per-server client id/secret, scopes, the enterprise-managed flag, and the [step-up](#mid-session-re-authorization) policy.             |

</template>
<template #zh>

| 文件                                                                                                                 | 内容                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `~/.mcp-inspector/storage/oauth.json`                                                                                | token 与客户端信息，以规范化后的服务器 URL 为键。文件以仅限所有者的权限写入。                                                  |
| `~/.mcp-inspector/storage/client.json`                                                                               | 安装级客户端设置（客户端元数据 URL、企业 IdP）。Web 客户端的 **Client Settings**（客户端设置）对话框写入的也是这个文件。 |
| [目录文件](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#catalog-file-format)中该服务器的 `oauth` 块 | 各服务器各自的 client id/secret、作用域、企业托管标志，以及 [step-up 升级授权](#mid-session-re-authorization)策略。             |

</template>
</BiRow>

<BiRow>
<template #en>

The path to `oauth.json` is resolved in order: `MCP_INSPECTOR_OAUTH_STATE_PATH`, then `<MCP_STORAGE_DIR>/oauth.json` (see [Environment variables](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables)), then the default above. All three clients resolve it the same way. Command-line `--client-id` / `--client-secret` / `--client-metadata-url` override `client.json`.

</template>
<template #zh>

`oauth.json` 的路径按以下顺序解析：先看 `MCP_INSPECTOR_OAUTH_STATE_PATH`，再看 `<MCP_STORAGE_DIR>/oauth.json`（参见[环境变量](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables)），最后才落到上面的默认路径。三种客户端都按同样方式解析。命令行传入的 `--client-id` / `--client-secret` / `--client-metadata-url` 会覆盖 `client.json`。

</template>
</BiRow>

<BiRow>
<template #en>

## Mid-session re-authorization

</template>
<template #zh>

## 会话中途重新授权

</template>
</BiRow>

<BiRow>
<template #en>

A server can refuse a *single* request mid-session with a `401` or a `403 insufficient_scope`, and the Inspector handles both without dropping the connection:

</template>
<template #zh>

服务器可以在会话中途拒绝*单个*请求，返回 `401` 或 `403 insufficient_scope`；Inspector 处理这两种情况时都不会断开连接：

</template>
</BiRow>

<BiRow>
<template #en>

* **Re-authorization**: the token expired or was revoked. The Inspector parses the `WWW-Authenticate` challenge and re-runs the flow, then retries the failed request.
* **Step-up**: the request needs scopes the current token doesn't carry. The Inspector re-authorizes for the union of the held and required scopes, so the new token covers everything the old one did plus the newly required scopes.

</template>
<template #zh>

* **重新授权（re-authorization）**：token 已过期或已被吊销。Inspector 解析 `WWW-Authenticate` 质询并重新执行授权流程，然后重试失败的请求。
* **升级授权（step-up）**：请求需要当前 token 不具备的作用域。Inspector 会针对已持有作用域与所需作用域的并集重新授权，因此新 token 既覆盖旧 token 的全部能力，也涵盖新要求的这些作用域。

</template>
</BiRow>

<BiRow>
<template #en>

In the **web** client this surfaces as a re-authorization banner. In the **CLI** it prompts on stderr:

</template>
<template #zh>

在 **Web** 客户端中，这会以重新授权横幅的形式呈现；在 **CLI** 中则会在 stderr 上给出提示：

</template>
</BiRow>

<BiRow>
<template #en>

```
Proceed with step-up authorization? [y/N]
```

</template>
<template #zh>

```
Proceed with step-up authorization? [y/N]
```

</template>
</BiRow>

<BiRow>
<template #en>

Answer **y** to continue. Piped input works (`echo y | ...`), as long as it's newline-terminated or stdin closes. **N**, or EOF with no answer, declines. A non-TTY stdin that sends nothing within 5 seconds fails with `auth_required`, which is distinct from an explicit decline. Enterprise-managed step-up re-mints silently, with no prompt.

</template>
<template #zh>

回答 **y** 即继续。管道输入同样可行（`echo y | ...`），前提是以换行符结尾，或 stdin 已关闭。回答 **N**，或在未作答时遇到 EOF，均视为拒绝。非 TTY 的 stdin 若在 5 秒内未送出任何输入，将以 `auth_required` 失败——这与显式拒绝是两回事。企业托管的 step-up 升级会静默重新签发 token，不出现任何提示。

</template>
</BiRow>

<BiRow>
<template #en>

## Non-interactive and CI runs

</template>
<template #zh>

## 非交互与 CI 运行

</template>
</BiRow>

<BiRow>
<template #en>

Interactive OAuth requires a TTY on **stdin or stderr**, or [`MCP_AUTO_OPEN_ENABLED=true`](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables). Redirecting stderr into a pipe, as in `2>&1 | tee`, still works because stdin stays a TTY. When neither is true, which is the normal CI shape, the CLI fails fast with `auth_required` rather than waiting up to fifteen minutes for a callback nobody will complete.

</template>
<template #zh>

交互式 OAuth 要求 **stdin 或 stderr** 上有 TTY，或设置了 [`MCP_AUTO_OPEN_ENABLED=true`](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables)。像 `2>&1 | tee` 这样把 stderr 重定向进管道仍然可行，因为 stdin 仍是 TTY。当两者都不满足时——而这正是 CI 的常态——CLI 会以 `auth_required` 快速失败，而不是为一次没人会去完成的回调空等最长十五分钟。

</template>
</BiRow>

<BiRow>
<template #en>

For CI, be explicit:

</template>
<template #zh>

在 CI 中，请显式声明：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
mcp-inspector --cli "$URL" --transport http --stored-auth-only --method tools/list
```

</template>
<template #zh>

```bash theme={null}
mcp-inspector --cli "$URL" --transport http --stored-auth-only --method tools/list
```

</template>
</BiRow>

<BiRow>
<template #en>

`--stored-auth-only` never starts interactive OAuth or step-up, never opens a browser, uses the shared store if a token is there, and fails immediately otherwise.

</template>
<template #zh>

`--stored-auth-only` 绝不发起交互式 OAuth 或 step-up 升级授权，也绝不会打开浏览器：共享存储中已有 token 就直接使用，否则立即失败。

</template>
</BiRow>

<BiRow>
<template #en>

## Handing off from the web client to the CLI

</template>
<template #zh>

## 从 Web 客户端交接给 CLI

</template>
</BiRow>

<BiRow>
<template #en>

The common case: a human completed OAuth in the web Inspector on this machine, and now a script wants to use that token.

</template>
<template #zh>

常见情形是：有人已在这台机器的 Web Inspector 中完成了 OAuth，而现在某个脚本要用那个 token。

</template>
</BiRow>

<BiRow>
<template #en>

| Flag                    | Behavior                                                                                                                                                                                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--use-stored-auth`     | Read the stored auth for `--server-url` and inject `Authorization: Bearer`. When a refresh token is stored, run the refresh grant first and inject the **fresh** token, persisting the rotation. Exits `3` (listing the stored server URLs) when nothing matches. |
| `--wait-for-auth <sec>` | Poll the state file until a token for `--server-url` appears, then inject it. Times out at `<sec>` with exit `3`. Use after handing a login off to a human.                                                                                                       |
| `--list-stored-auth`    | Print `{ oauthStatePath, storedServerUrls }` and exit without connecting.                                                                                                                                                                                         |
| `--print-handoff`       | Print a JSON block (`deepLink`, `portForwardCmd`, `oauthStatePath`, `apiToken`) for `--server-url` and exit; this is everything a remote script needs to drive the browser side.                                                                                  |
| `--relogin`             | Delete the stored OAuth for this server URL before connecting. HTTP/SSE only.                                                                                                                                                                                     |

</template>
<template #zh>

| 标志                     | 行为                                                                                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--use-stored-auth`     | 读取为 `--server-url` 存储的授权信息并注入 `Authorization: Bearer`。若存有 refresh token，则先执行刷新模式（refresh grant），注入**新** token 并持久化轮换结果。没有匹配项时以退出码 `3` 退出（同时列出已存储的服务器 URL）。 |
| `--wait-for-auth <sec>` | 轮询状态文件，直到出现 `--server-url` 对应的 token，然后注入。超过 `<sec>` 秒即超时，并以退出码 `3` 退出。适合在把登录交给真人完成之后使用。                                                                                                       |
| `--list-stored-auth`    | 打印 `{ oauthStatePath, storedServerUrls }` 后退出，不发起连接。                                                                                                                                                                                         |
| `--print-handoff`       | 为 `--server-url` 打印一个 JSON 块（`deepLink`、`portForwardCmd`、`oauthStatePath`、`apiToken`）后退出；远程脚本驱动浏览器侧所需的一切都在这里。                                                                                  |
| `--relogin`             | 连接之前删除为该服务器 URL 存储的 OAuth。仅支持 HTTP/SSE。                                                                                                                                                                                       |

</template>
</BiRow>

<BiRow>
<template #en>

A typical remote-VM sequence:

</template>
<template #zh>

一个典型的远程 VM 操作序列：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
# On the VM: print what the human needs in order to complete OAuth in their browser
mcp-inspector --cli --server-url https://api.example/mcp --print-handoff

# Then block until the token lands, and run the call with it
mcp-inspector --cli --transport http --server-url https://api.example/mcp \
  --wait-for-auth 120 --method tools/list
```

</template>
<template #zh>

```bash theme={null}
# On the VM: print what the human needs in order to complete OAuth in their browser
mcp-inspector --cli --server-url https://api.example/mcp --print-handoff

# Then block until the token lands, and run the call with it
mcp-inspector --cli --transport http --server-url https://api.example/mcp \
  --wait-for-auth 120 --method tools/list
```

</template>
</BiRow>

<BiRow>
<template #en>

The `deepLink` in the handoff block navigates a browser straight to a *connected* Inspector; see [Deep links](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links).

</template>
<template #zh>

交接块中的 `deepLink` 可让浏览器直达处于*已连接*状态的 Inspector；参见[深度链接](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links)。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Because the stored entry records no expiry, a stored refresh token is
  exercised on **every** `--use-stored-auth` run. With rotating (single-use)
  refresh tokens that opens two narrow failure windows: two concurrent
  invocations against the same state file can race for the token, and a crash
  between a successful refresh and the write-back leaves the rotated token
  unsaved. Both are unlikely; re-authorize in the web client to recover.

</template>
<template #zh>

> **注：**
> 由于存储条目不记录过期时间，已存储的 refresh token 会在**每次**
> `--use-stored-auth` 运行时被使用。对轮换式（一次性）refresh
> token 而言，这会留下两扇很窄的失败窗口：针对同一状态文件的两个并发
> 调用可能竞争同一个 token；刷新成功后、写回完成前发生崩溃，会使
> 轮换出的 token 未能保存。两者概率都很低；在 Web 客户端中重新授权
> 即可恢复。

</template>
</BiRow>

<BiRow>
<template #en>

## Inspecting auth state

</template>
<template #zh>

## 查看授权状态

</template>
</BiRow>

<BiRow>
<template #en>

* **Web**: the Connection Info panel shows discovery results, the registered client, granted scopes, and token state, and offers **Clear OAuth state** for the active server.
* **TUI**: the **Auth** tab (`a`) shows the same fields and clears state the same way.
* **CLI**: `--list-stored-auth` shows what's on disk, and `--relogin` discards it and starts over.

</template>
<template #zh>

* **Web**：Connection Info 面板展示发现结果、已注册的客户端、已授予的作用域和 token 状态，并为当前活跃服务器提供 **Clear OAuth state**（清除 OAuth 状态）操作。
* **TUI**：**Auth** 标签页（按 `a`）展示同样的字段，清除状态的方式也相同。
* **CLI**：`--list-stored-auth` 查看磁盘上存了什么，`--relogin` 则将其丢弃、从头再来。

</template>
</BiRow>
