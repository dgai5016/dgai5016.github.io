# 实战配方（Recipes）

> 传输连接、配置导入、MCP Apps 审查、Docker 与网络托管的实用指南

## 连接 stdio 与 HTTP 服务器

### stdio

stdio 服务器是 Inspector 派生的一个进程。所有按位置传递的内容，共同构成服务器的命令行：

```bash theme={null}
mcp-inspector node build/index.js -- --verbose --config /etc/myserver.conf
```

把传给你服务器的参数放在 `--` 之后。没有这个分隔符的话，`--verbose` 会被 Inspector 解析掉，永远到不了服务器。

用 `-e` 给进程传环境变量，用 `--cwd` 指定工作目录：

```bash theme={null}
mcp-inspector -e API_KEY=abc123 -e REGION=us-east-1 --cwd ~/projects/my-server \
  node build/index.js
```

服务器的 `stderr` 会出现在 **Console**（控制台）标签页（web）或 Console 标签页（TUI 中按 `o` 打开）里——大多数 stdio 服务器都把诊断信息写到这里，所以当连接毫无征兆地失败时，先来这里排查。

### HTTP 与 SSE

```bash theme={null}
mcp-inspector --server-url https://api.example.com/mcp --transport http \
  --header "X-Tenant: acme"
```

`--transport` 接受 `http`（Streamable HTTP）与 `sse`。如果服务器受保护，参见[授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)：无需提前做任何设置，因为当服务器返回 `401` 时，Inspector 会执行其中描述的 OAuth 流程并重试连接。

对于 HTTP 服务器，还要选定它的[协议时代（protocol era）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)。默认值为 `legacy`（旧版）；在 Server Settings（服务器设置）中设置 `modern`（新版）或 `auto`（或在目录文件中设置 `protocolEra`），即可启用 2026-07-28 的行为。

## 导入既有客户端配置

在 Servers（服务器）屏幕上，**Add Servers**（添加服务器）可以导入你在别处已经配置好的 MCP 服务器，无需重新输入。它直接解析 Claude Desktop、Cursor、Cline 和 VS Code 的客户端配置，还能读取服务器自己的 [MCP Registry](https://modelcontextprotocol.io/registry/about) `server.json`。

导入会合并进当前活动的[目录（catalog）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#choosing-servers)（Inspector 的可写服务器列表），因此既有条目不会被覆盖。如果你完全不想动自己的目录，也可以改为只读地针对这份外部文件启动：

```bash theme={null}
mcp-inspector --config ~/Library/Application\ Support/Claude/claude_desktop_config.json
```

`--config` 保证该文件按原样提供，绝不会被写入、预置（seed）或迁移。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/import-config.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=c9f5229c2d827f4bcab37938879f21f2" width="3840" height="2160" data-path="images/inspector/import-config.png" />

## 审查 MCP App

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) 是自带 UI 部件（widget）的工具。对于自动化的审查方（CI 或智能体），凡是返回 JSON 的检查都用 CLI 完成，只在要检视渲染出来的部件时才打开浏览器。

    ```bash theme={null}
    mcp-inspector --cli --transport http --server-url https://example.com/mcp \
      --method tools/call --tool-name <tool> --app-info
    ```

    stdout 上只有一行 JSON；工具带 app 时退出码为 `0`，不带则为 `2`，因此可以用 `&&` 链短路：

    ```json theme={null}
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

    `csp` 与 `permissions`（以及 `domain`，前提是资源声明了它）长在 UI **资源**（resource）上而非工具上，因此 `--app-info` 读取的是那个资源；工具本身永远不会被调用。

    ```bash theme={null}
    mcp-inspector --cli --transport http --server-url https://example.com/mcp \
      --method tools/call --tool-name <tool> --tool-args-json '{"zip":"10001"}' --format json
    ```

    ```bash theme={null}
    TOKEN="$(openssl rand -hex 24)"
    HOST=127.0.0.1 CLIENT_PORT=6274 MCP_SANDBOX_PORT=6275 \
    MCP_AUTO_OPEN_ENABLED=false MCP_INSPECTOR_API_TOKEN="$TOKEN" \
    mcp-inspector --web &
    ```

    这里务必固定 `MCP_SANDBOX_PORT`：app 的 UI 由一个独立的沙箱（sandbox）端口提供，该端口默认动态分配，而你的自动化流程需要一个固定地址才能访问它。

    ```
    http://127.0.0.1:6274/?serverUrl=<encoded url>&transport=http&autoConnect=<TOKEN>&openApp=<tool>&appArgs=<base64url(JSON)>&autoOpen=<TOKEN>
    ```

    `appArgs` 是工具参数经 base64url 编码后的 JSON，每个深度链接参数都在[深度链接（Deep links）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#deep-links)一节中有说明。`autoConnect` 与 `autoOpen` 都必须等于会话令牌（session token），因为 `autoOpen` 会直接从 URL 发起一次工具调用，需要与 `autoConnect` 相同的校验关卡。

    Apps 屏幕对外提供了一份稳定的自动化契约。轮询这些属性，而不是固定 sleep 一段时间：

    | 选择器                              | 属性             | 取值                                                                                                    |
    | ----------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------- |
    | `[data-testid="apps-form"]`         | `data-app-status` | `ready`（失败时，`data-app-error` 中带有原因）                                                          |
    | `[data-testid="connection-status"]` | `data-status`     | `connecting`，随后变为 `connected` 或 `error`（细节在 `data-error-message` 中）                          |
    | `[data-testid="connection-status"]` | `data-deeplink`   | `parsed`、`rejected` 或 `none`（`none` 表示没有给出深度链接，`rejected` 表示链接被拒绝）                 |

## Docker

容器镜像已发布到 GitHub Container Registry，支持 `linux/amd64` 与 `linux/arm64`：

```bash theme={null}
docker run --rm -p 6274:6274 ghcr.io/modelcontextprotocol/inspector
```

从容器日志中读取[会话令牌](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#the-session-token)，或用 `-e MCP_INSPECTOR_API_TOKEN=<value>` 固定它。

该镜像默认以 `--web` 模式运行，绑定 `0.0.0.0:6274`，关闭浏览器自动打开，并以非 root 用户运行。它设置了 `DANGEROUSLY_BIND_ALL_INTERFACES=true`，因为容器必须绑定通配地址，才能经 `-p` 端口映射访问到。

镜像的 `HEALTHCHECK` 探测的是 web UI，因此在以 `--cli` 或 `--tui` 运行时（两者都没有 web 服务器）请加上 `--no-healthcheck`。下文中的 `<target>` 是一个[临时目标（ad-hoc target）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#ad-hoc-targets)：一条以位置参数形式给出的 stdio 命令，或 `--server-url <url> --transport http`。

```bash theme={null}
docker run --rm --no-healthcheck ghcr.io/modelcontextprotocol/inspector --cli <target> --method tools/list
```

> **注意：**
> **如果你重新映射了对外发布的端口，请设置 `ALLOWED_ORIGINS`。** 使用 `-p 8080:6274` 时，浏览器的源（origin）变成 `http://localhost:8080`，与容器内端口不再匹配，连接会收到 `403`。要么改用 `-e CLIENT_PORT=8080 -p 8080:8080`，要么设置 `-e ALLOWED_ORIGINS=http://localhost:8080,http://127.0.0.1:8080`。

## 在网络上托管

Inspector 默认绑定 `localhost`，且其后端会派生进程，因此，把它暴露到网络应当是一项刻意为之的决定。

除非设置了 `DANGEROUSLY_BIND_ALL_INTERFACES=true`，否则 Inspector 会拒绝绑定**通配**（wildcard）全接口地址（`0.0.0.0`、`::` 及一切等价写法）。绑定**特定**地址则无需任何开关，因为那是一次有意的单点暴露，而非一次性暴露全部接口——后者正是 DNS 重绑定攻击所瞄准的形态。

| 目标                                         | 做法                                                                                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **从局域网内另一台机器访问它**               | `HOST=192.168.1.50`。默认的源允许列表会跟随绑定主机，因此 `http://192.168.1.50:6274` 无需额外配置即可被接受。                                            |
| **位于 TLS 或反向代理之后**                  | 浏览器的 `Origin` 变成了对外的源，与绑定主机不匹配。请设置 `ALLOWED_ORIGINS=https://inspector.example.com`。                                             |
| **通配绑定（容器）**                         | 设置 `DANGEROUSLY_BIND_ALL_INTERFACES=true`。回环访问开箱即用；要以非回环地址访问则需要 `ALLOWED_ORIGINS`。                                              |

> **注意：**
> `ALLOWED_ORIGINS` **会替换**默认列表，而不是与其合并。请把你打算从其访问的每一个源都列上，包括你想保留的回环形式：

  ```
  ALLOWED_ORIGINS=http://localhost:6274,http://127.0.0.1:6274,http://192.168.1.50:6274
  ```

  每一项都必须包含 scheme（协议）；不带 scheme 的值会被丢弃并给出警告。留空**不会**关闭这项校验，而是回退到默认列表。没有任何开关可以关闭源校验。

一旦走出回环，还有两点需要注意：

* **MCP Apps 的沙箱端口也必须可达。** 它是一个独立的、默认动态分配的端口；请用 `MCP_SANDBOX_PORT` 固定它，并暴露或转发该端口。Docker 镜像只发布了 `6274` 一个端口。
* **MCP Apps 无法在 TLS 下或裸 IPv6 字面量地址上渲染。** 沙箱 URL 始终是纯 `http`，因此 `https://` 页面会把该 iframe 当作混合内容拦截；而带方括号的 IPv6 字面量不是合法的 CSP host-source，所以请通过主机名或 IPv4 地址访问 Inspector。

无论采用哪种形态，都请保持认证开启。凡是除你之外还有人能访问到的东西，都不要设置 `DANGEROUSLY_OMIT_AUTH`。

## 开发工作流

一套在实践中行之有效的循环：

    `--method initialize` 能在一秒内确认服务器可以启动、完成握手并报告你预期的能力，应答还是机器可读的。大多数“跑不起来”的问题，根源都在这一步。

    Schema 驱动的表单、渲染出来的结果，再加上旁边的 Protocol 标签页，能帮你迅速定位工具行为异常的那类用例。

    无效输入、缺少必填的提示词参数、并发调用，对 HTTP 服务器还要两个协议时代都试一遍。要验证这些*错误*与成功结果一样，都是有意为之。

    把你的发现固化成一条 CI 断言：把 CLI 的 `--format json` 输出通过管道传给 `jq -e`，并加上 `--stored-auth-only`，这样令牌缺失时会快速失败，而不是启动交互式 OAuth。完整命令见[在 CI 中验证服务器](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli#verify-a-server-in-ci)。
