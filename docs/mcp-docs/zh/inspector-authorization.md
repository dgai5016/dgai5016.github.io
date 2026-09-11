# 授权

> MCP Inspector 如何执行 OAuth、在会话中途重新授权，以及在各客户端之间共享 token

远程 MCP 服务器通常要求授权。Inspector 在全部三种客户端形态中实现了完整的[授权](https://modelcontextprotocol.io/specification/latest/basic/authorization)流程，并把得到的 token 共享到磁盘上，因此登录一次即可处处可用。

## 端到端流程

    Inspector 连接到服务器 URL。服务器返回 `401`。当响应携带
    `WWW-Authenticate` 头时，该头会指出受保护资源元数据 URL
    （`resource_metadata`），并可选地给出请求所需的作用域（scope）。

    Inspector 获取服务器的[受保护资源与授权服务器
    元数据](https://modelcontextprotocol.io/specification/latest/basic/authorization/authorization-server-discovery)，
    以了解各项端点以及支持的授权模式（grant）。

    Inspector 通过所配置的任意一种机制向授权服务器表明身份：[动态客户端
    注册](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#dynamic-client-registration)、
    预注册的静态客户端（`--client-id` / `--client-secret`）、
    [客户端 ID 元数据文档（Client ID Metadata
    Document）](https://modelcontextprotocol.io/specification/latest/basic/authorization/client-registration#client-id-metadata-documents)
    （`--client-metadata-url`），或[企业托管
    IdP](https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization)。

    Inspector 打开授权 URL。你完成登录并同意授权。

    授权服务器重定向到 Inspector 的回调 URL，并携带授权码。

    随后用授权码换取 token，token 随即持久化，最初的连接（若是[会话中途
    质询（challenge）](#mid-session-re-authorization)，则是被拒绝的那个
    请求）会自动重试。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/auth-connection-info.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=01a8d11058c2d33e0069b8dec98591b5" width="3840" height="2160" data-path="images/inspector/auth-connection-info.png" />

## 回调 URL

Web 应用在自身 URL 上监听 OAuth 回调，而 CLI 和 TUI 则特意共用第二个回调地址：

| 形态 | 默认回调地址                            | 原因                                                                               |
| ----- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| **Web** | `http://localhost:6274/oauth/callback` | 主应用服务器本身已有 HTTP 监听器。                                  |
| **CLI** | `http://127.0.0.1:6276/oauth/callback` | 使用专用环回监听器，避免与正在运行的 Web Inspector 冲突。 |
| **TUI** | `http://127.0.0.1:6276/oauth/callback` | 与 CLI 共用同一监听器。                                                      |

对于任何要求预先注册重定向 URI 的 IdP，先**注册 `http://127.0.0.1:6276/oauth/callback`**，然后再使用 CLI 或 TUI。默认回调地址固定可预测，正是用意所在：注册一次，处处复用。

可通过 `--callback-url` 或 `MCP_OAUTH_CALLBACK_URL` 覆盖。

> **注意：**
> 回调 URL **必须绑定环回主机**：`localhost`、`127.0.0.0/8` 或
> `[::1]`。监听器通过明文 `http` 接收授权码，因此非环回主机会被报错
> 拒绝，且没有任何标志能覆盖这一限制。如果你的浏览器运行在另一台
> 机器上，请将回调端口转发到那台机器；`--print-handoff`（见下文）
> 会输出一条现成的 `portForwardCmd`。

> **注：**
> 重定向 URI 必须与你的注册信息**完全**一致。`http://localhost:6276/...` 和 `http://127.0.0.1:6276/...` 对授权服务器来说是两个不同的 URI，即使它们访问的是同一个监听器。

  默认端口同一时刻只能由一个进程持有；第二个并发授权流程会以 `EADDRINUSE` 报错失败。请为每个实例使用不同的固定端口；若授权服务器支持动态重定向 URI 注册，也可使用 `http://127.0.0.1:0/oauth/callback`，由操作系统分配临时端口。

## 凭据存放在哪里

| 文件                                                                                                                 | 内容                                                                                                                               |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `~/.mcp-inspector/storage/oauth.json`                                                                                | token 与客户端信息，以规范化后的服务器 URL 为键。文件以仅限所有者的权限写入。                                                  |
| `~/.mcp-inspector/storage/client.json`                                                                               | 安装级客户端设置（客户端元数据 URL、企业 IdP）。Web 客户端的 **Client Settings**（客户端设置）对话框写入的也是这个文件。 |
| [目录文件](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#catalog-file-format)中该服务器的 `oauth` 块 | 各服务器各自的 client id/secret、作用域、企业托管标志，以及 [step-up 升级授权](#mid-session-re-authorization)策略。             |

`oauth.json` 的路径按以下顺序解析：先看 `MCP_INSPECTOR_OAUTH_STATE_PATH`，再看 `<MCP_STORAGE_DIR>/oauth.json`（参见[环境变量](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables)），最后才落到上面的默认路径。三种客户端都按同样方式解析。命令行传入的 `--client-id` / `--client-secret` / `--client-metadata-url` 会覆盖 `client.json`。

## 会话中途重新授权

服务器可以在会话中途拒绝*单个*请求，返回 `401` 或 `403 insufficient_scope`；Inspector 处理这两种情况时都不会断开连接：

* **重新授权（re-authorization）**：token 已过期或已被吊销。Inspector 解析 `WWW-Authenticate` 质询并重新执行授权流程，然后重试失败的请求。
* **升级授权（step-up）**：请求需要当前 token 不具备的作用域。Inspector 会针对已持有作用域与所需作用域的并集重新授权，因此新 token 既覆盖旧 token 的全部能力，也涵盖新要求的这些作用域。

在 **Web** 客户端中，这会以重新授权横幅的形式呈现；在 **CLI** 中则会在 stderr 上给出提示：

```
Proceed with step-up authorization? [y/N]
```

回答 **y** 即继续。管道输入同样可行（`echo y | ...`），前提是以换行符结尾，或 stdin 已关闭。回答 **N**，或在未作答时遇到 EOF，均视为拒绝。非 TTY 的 stdin 若在 5 秒内未送出任何输入，将以 `auth_required` 失败——这与显式拒绝是两回事。企业托管的 step-up 升级会静默重新签发 token，不出现任何提示。

## 非交互与 CI 运行

交互式 OAuth 要求 **stdin 或 stderr** 上有 TTY，或设置了 [`MCP_AUTO_OPEN_ENABLED=true`](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#environment-variables)。像 `2>&1 | tee` 这样把 stderr 重定向进管道仍然可行，因为 stdin 仍是 TTY。当两者都不满足时——而这正是 CI 的常态——CLI 会以 `auth_required` 快速失败，而不是为一次没人会去完成的回调空等最长十五分钟。

在 CI 中，请显式声明：

```bash theme={null}
mcp-inspector --cli "$URL" --transport http --stored-auth-only --method tools/list
```

`--stored-auth-only` 绝不发起交互式 OAuth 或 step-up 升级授权，也绝不会打开浏览器：共享存储中已有 token 就直接使用，否则立即失败。

## 从 Web 客户端交接给 CLI

常见情形是：有人已在这台机器的 Web Inspector 中完成了 OAuth，而现在某个脚本要用那个 token。

| 标志                     | 行为                                                                                                                                                                                                                                                       |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--use-stored-auth`     | 读取为 `--server-url` 存储的授权信息并注入 `Authorization: Bearer`。若存有 refresh token，则先执行刷新模式（refresh grant），注入**新** token 并持久化轮换结果。没有匹配项时以退出码 `3` 退出（同时列出已存储的服务器 URL）。 |
| `--wait-for-auth <sec>` | 轮询状态文件，直到出现 `--server-url` 对应的 token，然后注入。超过 `<sec>` 秒即超时，并以退出码 `3` 退出。适合在把登录交给真人完成之后使用。                                                                                                       |
| `--list-stored-auth`    | 打印 `{ oauthStatePath, storedServerUrls }` 后退出，不发起连接。                                                                                                                                                                                         |
| `--print-handoff`       | 为 `--server-url` 打印一个 JSON 块（`deepLink`、`portForwardCmd`、`oauthStatePath`、`apiToken`）后退出；远程脚本驱动浏览器侧所需的一切都在这里。                                                                                  |
| `--relogin`             | 连接之前删除为该服务器 URL 存储的 OAuth。仅支持 HTTP/SSE。                                                                                                                                                                                       |

一个典型的远程 VM 操作序列：

```bash theme={null}
# On the VM: print what the human needs in order to complete OAuth in their browser
mcp-inspector --cli --server-url https://api.example/mcp --print-handoff

# Then block until the token lands, and run the call with it
mcp-inspector --cli --transport http --server-url https://api.example/mcp \
  --wait-for-auth 120 --method tools/list
```

交接块中的 `deepLink` 可让浏览器直达处于*已连接*状态的 Inspector；参见[深度链接](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links)。

> **注：**
> 由于存储条目不记录过期时间，已存储的 refresh token 会在**每次**
> `--use-stored-auth` 运行时被使用。对轮换式（一次性）refresh
> token 而言，这会留下两扇很窄的失败窗口：针对同一状态文件的两个并发
> 调用可能竞争同一个 token；刷新成功后、写回完成前发生崩溃，会使
> 轮换出的 token 未能保存。两者概率都很低；在 Web 客户端中重新授权
> 即可恢复。

## 查看授权状态

* **Web**：Connection Info 面板展示发现结果、已注册的客户端、已授予的作用域和 token 状态，并为当前活跃服务器提供 **Clear OAuth state**（清除 OAuth 状态）操作。
* **TUI**：**Auth** 标签页（按 `a`）展示同样的字段，清除状态的方式也相同。
* **CLI**：`--list-stored-auth` 查看磁盘上存了什么，`--relogin` 则将其丢弃、从头再来。
