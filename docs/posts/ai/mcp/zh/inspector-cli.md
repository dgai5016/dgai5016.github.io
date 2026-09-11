# CLI 客户端

> 脚本化使用 MCP Inspector：方法、输出格式、退出码与 CI 实用方案

CLI 每次运行都会连接一个服务器，执行你用 `--method` 指定的那一个请求，打印结果后退出。这使它非常适合 CI 流水线、shell 单行命令，以及需要立即验证服务器改动的编码智能体。

```bash theme={null}
npx @modelcontextprotocol/inspector --cli node build/index.js --method tools/list
```

下文示例使用的是已安装的 `mcp-inspector` 可执行文件。若未全局安装，请像上面那样给每条命令加上 `npx @modelcontextprotocol/inspector` 前缀。

## 选择服务器

CLI 接受三种指定服务器的方式：位置参数形式的命令（stdio，标准输入输出）、`--server-url`（HTTP/SSE），或从目录（catalog）或配置文件中按名称选出的服务器：

```bash theme={null}
# stdio: everything positional is the command to spawn
mcp-inspector --cli node build/index.js --method tools/list

# HTTP
mcp-inspector --cli https://api.example.com/mcp --transport http --method tools/list

# From a file
mcp-inspector --cli --config ./mcp.json --server myserver --method tools/list
```

当服务器来自文件时，其中针对该服务器的设置（请求头、超时、OAuth、[协议时代（protocol era）](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)以及根目录（roots））会应用到这条连接上，解析方式与 TUI 和 web 客户端完全一致。`--header` 标志会在本次运行中覆盖文件里的请求头，而保留其中的超时与 OAuth 设置。

下文示例把上述任意一种形式连同其 `--transport` 或 `--config`/`--server` 标志，简写为 `<server>`。

> **注：**
> **要让一次运行带上[根目录（roots）](https://modelcontextprotocol.io/specification/draft/client/roots)，配置文件是唯一持久的途径：**没有专门的 roots 标志，而
> `--method roots/set` 只在那一条一次性短连接内生效。为服务器配置的根目录会在连接时通告出去，因此调用 `roots/list` 的服务器（如 `@modelcontextprotocol/server-filesystem`，它借此获知自己被允许访问的目录）即可取到它们。

关于 `--catalog` 与 `--config` 的区别、`--` 分隔符，以及各形态共用的服务器选择标志，参见[配置与命令行标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)。

## 方法

| `--method`                     | 必需的配套参数                                       | 说明                                                                        |
| ------------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `initialize`                   | 无                                                   | 仅做连接的探测：`{serverInfo, protocolVersion, capabilities, instructions}`。 |
| `tools/list`                   | 无                                                   |                                                                             |
| `tools/call`                   | `--tool-name`，外加 `--tool-arg` / `--tool-args-json` |                                                                             |
| `resources/list`               | 无                                                   |                                                                             |
| `resources/read`               | `--uri`                                              |                                                                             |
| `resources/templates/list`     | 无                                                   |                                                                             |
| `prompts/list`                 | 无                                                   |                                                                             |
| `prompts/get`                  | `--prompt-name`、`--prompt-args`                     |                                                                             |
| `logging/setLevel`             | `--log-level`                                        | 仅限旧版协议时代；新版服务器改为按请求单独开启。                               |
| `servers/list`、`servers/show` | 无                                                   | **无需连接**任何服务器即可读取目录。                                          |

仅面向流或会话的方法（例如 `logging/tail`）会被拒绝，因为一个会退出的进程无法保持流开启。

### 传参

`--tool-arg` 接受 `key=value` 形式，并通过对值做 JSON 解析来**强制转换**类型：`count=1` 会变成数字，`"012"` 会变成 `12`：

```bash theme={null}
mcp-inspector --cli <server> --method tools/call --tool-name mytool \
  --tool-arg key=value --tool-arg count=1 --tool-arg 'options={"format":"json"}'
```

`--tool-args-json` 一次接受整个参数对象并**原样**传入，不做任何强制转换，因此 `"012"` 保持字符串 `012` 不变。两者互斥：

```bash theme={null}
mcp-inspector --cli <server> --method tools/call --tool-name mytool \
  --tool-args-json '{"zip":"10001"}'
```

## 输出

`--format text`（默认值）面向人类阅读做美化打印。`--format json` 则在 stdout 上输出单个 JSON 对象，不带任何横幅（banner）信息，因此整个输出可以干净地接入管道：

```bash theme={null}
mcp-inspector --cli <server> --method tools/list --format json | jq '.result.tools[].name'
```

## 探测 MCP App

`--app-info` 报告某个工具是否附带 [MCP App](https://modelcontextprotocol.io/extensions/apps/overview) UI（即其 `ui://` 资源、CSP 和权限），且**无需调用该工具**，这样流水线可以在真正调用之前判断自己是否需要浏览器：

```bash theme={null}
# One tool -> one JSON line
mcp-inspector --cli <server> --method tools/call --tool-name my_tool --app-info
# {"hasApp":true,"toolName":"my_tool","resourceUri":"ui://...","csp":{...},"permissions":{...}}

# Every tool -> NDJSON, one line each, over a single connection
mcp-inspector --cli <server> --method tools/list --app-info | jq -c 'select(.hasApp)'
```

退出码区分了不同结果：带 app 的工具退出码为 `0`，不带 app 的为 `2`，工具不存在则为 `5`，这样拼写错误就不会被误判成“没有 app”。探测失败（UI 资源不可读、`resourceUri` 格式错误）会记录在 `resourceError` 字段中而不是让整个命令中止，因此一个坏工具永远不会拖垮整份列表输出。

> **注：**
> 无论 `--format` 取值如何，`tools/list --app-info` 始终输出 NDJSON（每个工具一行）；`--format json` 只会重塑 `tools/call --app-info` 的单工具输出。

## 退出码与错误信封（error envelope）

每个非零退出码都映射到一个稳定的失败类别，调用方可以据此直接按失败*原因*分支处理，而不必从输出的文字描述里抓取信息：

| 退出码 | 含义                                                  |
| ------ | ----------------------------------------------------- |
| `0`    | 成功。                                                |
| `1`    | 用法错误或意外错误（兜底项）。                          |
| `2`    | 工具上未发现 MCP App（`--app-info` 探测）。             |
| `3`    | 服务器要求认证（401/403、`WWW-Authenticate`、OAuth）。   |
| `4`    | 服务器不可达（DNS、连接被拒绝、超时、`fetch failed`）。  |
| `5`    | 工具错误：`tools/call` 返回了 `isError: true`，或未找到该工具。 |

只要以非零码退出，CLI 还会**向 stderr 写入一行 JSON**：

```json theme={null}
{
  "error": {
    "code": "auth_required",
    "message": "Unauthorized",
    "status": 401,
    "url": "https://api.example/mcp"
  }
}
```

由于只有一行，调用方可以用 `2>&1 | tail -1 | jq .error` 解析它。

返回 `isError: true` 的 `tools/call` 仍会打印其载荷（payload），但以退出码 `5` 退出，因此 `&&` 链不会在失败的调用之后继续执行。

## 脚本中的授权

默认情况下，CLI 会运行与 TUI 相同的回环 OAuth 流程：打开浏览器，然后等待一个 CI 任务无法完成的 localhost 回调。下面两个标志让非交互式运行变得可预期：

* `--stored-auth-only`：绝不发起交互式 OAuth 或升级授权（step-up），也绝不自动打开浏览器。共享存储中已有 token 则直接使用，否则立即以 `auth_required` 失败。CI 想要的正是这个标志。
* `--use-stored-auth`：复用 web Inspector 已在本机获取的 token；若存有 refresh token，则先刷新它。

两者都未指定且 stdin 或 stderr 上没有 TTY 时，CLI 会以 `auth_required` 快速失败，而不是在一个没人会去完成的回调上空等十五分钟。

完整流程、web 客户端到 CLI 的交接（handoff）以及 `--print-handoff`，参见[授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)。

## 实用方案

### 在 CI 中验证服务器

```bash theme={null}
set -euo pipefail

# Fail the build if the server can't be reached or doesn't expose the tool
mcp-inspector --cli --config ./ci-servers.json --server my-server \
  --stored-auth-only --method tools/list --format json \
  | jq -e '.result.tools | map(.name) | index("get_weather")' > /dev/null
```

### 按失败类别分支处理

```bash theme={null}
if out=$(mcp-inspector --cli "$URL" --transport http --method tools/list 2>err.json); then
  echo "$out"
else
  case $? in
    3) echo "needs auth: run the web inspector once to sign in" ;;
    4) echo "server unreachable" ;;
    *) jq .error < err.json ;;
  esac
fi
```

### 冒烟测试所有带 UI 的工具

```bash theme={null}
mcp-inspector --cli "$URL" --transport http --method tools/list --app-info \
  | jq -r 'select(.hasApp) | .toolName'
```

### 不建立连接，直接查看目录

```bash theme={null}
mcp-inspector --cli --catalog ~/.mcp-inspector/mcp.json --method servers/list
mcp-inspector --cli --catalog ~/.mcp-inspector/mcp.json --method servers/show --server my-server
```

> **注意：**
> `servers/show` 会对含敏感信息的字段（`env` 值、敏感请求头、OAuth client secret）脱敏，但**不会**清理嵌在服务器 `url`（userinfo 或查询参数中的 token）或 stdio `args` 中的凭据。在把原始 URL 和 `detail` 字段粘贴进 issue 之前，请把它们当作敏感内容对待。

## 代理

连接远程 HTTP/SSE 服务器时会遵循惯用的代理环境变量：`HTTPS_PROXY` / `HTTP_PROXY`（及其小写形式）选择代理，`NO_PROXY` 豁免特定主机。无需任何 Inspector 专属标志，且代理 agent 是惰性加载的，因此不使用代理的运行零开销。web 客户端的后端同样如此。
