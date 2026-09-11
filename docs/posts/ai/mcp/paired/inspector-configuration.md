<BiRow>
<template #en>

> Catalog vs. config files, which client owns which flag, and every environment variable

</template>
<template #zh>

> 目录（catalog）与配置文件之辨、每个标志归哪个客户端所有，以及全部环境变量

</template>
</BiRow>

<BiRow>
<template #en>

The `mcp-inspector` binary is a launcher: it reads two flags of its own and forwards every other argument to one of three clients (web, CLI, or TUI). Each client defines its own flags, so a flag that works in one can be unknown to another (`--method`, for example, is CLI-only). This page groups flags and environment variables by the client that owns them.

</template>
<template #zh>

`mcp-inspector` 二进制文件是一个启动器（launcher）：它读取属于自己的两个标志，并把其余所有参数转发给三个客户端（web、CLI 或 TUI）之一。每个客户端各自定义自己的标志，因此在一个客户端里可用的标志，到了另一个客户端可能就是未知标志（例如 `--method` 仅 CLI 可用）。本页面按标志与环境变量所属的客户端分组呈现。

</template>
</BiRow>

<BiRow>
<template #en>

## The launcher owns exactly two things

</template>
<template #zh>

## 启动器只负责两件事

</template>
</BiRow>

<BiRow>
<template #en>

| Flag                        | Behavior                                                                                                                                                                                                                                                                                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--web` / `--cli` / `--tui` | Selects the client, `--web` by default. Passing more than one fails with `Specify at most one of --web, --cli, or --tui.` Launcher flags must come first: parsing stops at the first argument the launcher does not own, and everything from that point on is forwarded to the client unchanged. |
| `-h` / `--help`             | With no mode flag, prints the launcher's own help and exits. With a mode flag it is forwarded, so `mcp-inspector --cli --help` prints the CLI's help.                                                                                                                                            |

</template>
<template #zh>

| 标志                        | 行为                                                                                                                                                                                                                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--web` / `--cli` / `--tui` | 选择客户端，默认 `--web`。传入多个会以 `Specify at most one of --web, --cli, or --tui.` 报错失败。启动器标志必须放在最前面：解析在第一个不属于启动器的参数处停止，其后的所有内容都原封不动地转发给客户端。 |
| `-h` / `--help`             | 不带模式标志时打印启动器自身的帮助并退出；带模式标志时则被转发，因此 `mcp-inspector --cli --help` 打印的是 CLI 的帮助。                                                                                                                                            |

</template>
</BiRow>

<BiRow>
<template #en>

Everything below belongs to a client.

</template>
<template #zh>

下文的所有内容都属于某个客户端。

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

### `--catalog` vs. `--config`

</template>
<template #zh>

### `--catalog` 与 `--config`

</template>
</BiRow>

<BiRow>
<template #en>

All three clients resolve `--catalog` and `--config` through the same shared code, so each flag behaves the same in the web app, the CLI, and the TUI. Where the two differ from each other is the table below.

</template>
<template #zh>

三个客户端通过同一套共享代码解析 `--catalog` 和 `--config`，因此这两个标志在 web 应用、CLI 和 TUI 中的行为完全一致。两者之间的差异见下表。

</template>
</BiRow>

<BiRow>
<template #en>

|                             | `--catalog <path>`                                                           | `--config <path>`                                       |
| --------------------------- | ---------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Writable?**               | Yes, the Inspector's own server list.                                        | No. Served as-is, never written, seeded, or migrated.   |
| **Missing file?**           | Created and seeded (see below).                                              | **Errors.**                                             |
| **Default**                 | `~/.mcp-inspector/mcp.json`, or the `MCP_CATALOG_PATH` environment variable. | None; you must pass it.                                 |
| **Editable in the web UI?** | Yes.                                                                         | No.                                                     |
| **Use it for**              | Your own working set of servers.                                             | A read-only session against someone else's config file. |

</template>
<template #zh>

|                              | `--catalog <path>`                                                     | `--config <path>`                       |
| --------------------------- | ---------------------------------------------------------------------- | --------------------------------------- |
| **可写？**                   | 可写，是 Inspector 自己的服务器列表。                                       | 不可写。原样提供服务，绝不写入、预置或迁移。   |
| **文件缺失？**               | 创建并预置（见下文）。                                                     | **报错。**                                |
| **默认值**                   | `~/.mcp-inspector/mcp.json`，或 `MCP_CATALOG_PATH` 环境变量。              | 无；必须显式传入。                          |
| **可在 Web UI 中编辑？**      | 是。                                                                    | 否。                                      |
| **用途**                     | 你自己日常使用的服务器集合。                                                | 针对他人配置文件的只读会话。                  |

</template>
</BiRow>

<BiRow>
<template #en>

The two are **mutually exclusive**, and neither combines with an ad-hoc target. Passing both is rejected identically by all three clients.

</template>
<template #zh>

两者**互斥**，且都不能与临时目标（ad-hoc target）组合。同时传入两者时，三个客户端会一致拒绝。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> **What a freshly seeded catalog contains depends on the client.** The web backend seeds two sample servers, so a first launch has something to connect to immediately:

</template>
<template #zh>

> **注：**
> **新预置的目录里有什么取决于客户端。** Web 后端会预置两个示例服务器，让首次启动就有可以立即连接的对象：

</template>
</BiRow>

<BiRow>
<template #en>

  ```json theme={null}
  {
"mcpServers": {
  "filesystem-server-default": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
  },
  "everything-server-default": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-everything"]
  }
}
  }
  ```

</template>
<template #zh>

  ```json theme={null}
  {
"mcpServers": {
  "filesystem-server-default": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]
  },
  "everything-server-default": {
    "type": "stdio",
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-everything"]
  }
}
  }
  ```

</template>
</BiRow>

<BiRow>
<template #en>

  The CLI and TUI seed an empty `{ "mcpServers": {} }` instead: they are non-interactive or list-driven, so sample entries would be noise rather than a starting point.

</template>
<template #zh>

  CLI 和 TUI 预置的则是一个空的 `{ "mcpServers": {} }`：它们是非交互式的或列表驱动的，示例条目只会成为噪音，而非起点。

</template>
</BiRow>

<BiRow>
<template #en>

  Either way, seeding happens only when the file does not exist yet, and a read-only `--config` is never seeded at all.

</template>
<template #zh>

  无论哪种情况，预置只发生在文件尚不存在时；只读的 `--config` 则永远不被预置。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> `--config` is what you want when pointing the Inspector at a config file you
  didn't write: a coworker's, a client application's, or one checked into a
  repo. It guarantees the Inspector will not touch the file.

</template>
<template #zh>

> **注：**
> 当你把 Inspector 指向一份并非由你编写的配置文件——同事的、某个客户端应用的、或签入仓库的那份——`--config` 正是你要的。
> 它保证 Inspector 不会改动该文件。

</template>
</BiRow>

<BiRow>
<template #en>

### Ad-hoc targets

</template>
<template #zh>

### 临时目标（ad-hoc target）

</template>
</BiRow>

<BiRow>
<template #en>

Instead of a file you can name one server directly, either as a positional command (stdio) or a URL:

</template>
<template #zh>

也可以不走文件，而是直接指定单个服务器——位置参数形式的命令（stdio）或 URL 均可：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
mcp-inspector node build/index.js                              # stdio, positional
mcp-inspector --server-url https://api.example.com/mcp --transport http
```

</template>
<template #zh>

```bash theme={null}
mcp-inspector node build/index.js                              # stdio, positional
mcp-inspector --server-url https://api.example.com/mcp --transport http
```

</template>
</BiRow>

<BiRow>
<template #en>

### Shared server-selection flags

</template>
<template #zh>

### 服务器选择的共享标志

</template>
</BiRow>

<BiRow>
<template #en>

Defined **separately by each of web, CLI, and TUI**, so they're available in all three, with the divergences noted:

</template>
<template #zh>

这些标志由 web、CLI 和 TUI **各自分别定义**，因此三者全都可用，差异之处已注明：

</template>
</BiRow>

<BiRow>
<template #en>

| Flag                     | Meaning                                               | Divergence                                                                                      |
| ------------------------ | ----------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `--catalog <path>`       | Writable catalog file.                                | None                                                                                            |
| `--config <path>`        | Read-only session file.                               | None                                                                                            |
| `--server <name>`        | Pick one named server out of the file.                | **Web and CLI only.** The TUI loads every server in the file and lets you choose interactively. |
| `--transport <type>`     | `stdio`, `sse`, or `http`.                            | Ad-hoc targets only.                                                                            |
| `--server-url <url>`     | Server URL for SSE/HTTP.                              | Ad-hoc targets only.                                                                            |
| `--cwd <path>`           | Working directory for a stdio server process.         | None                                                                                            |
| `-e <KEY=VALUE>`         | Environment variables for a stdio server. Repeatable. | None                                                                                            |
| `--header "Name: Value"` | HTTP headers for an HTTP/SSE server. Repeatable.      | Requires an ad-hoc HTTP/SSE server on the web client.                                           |
| `[target...]`            | Positional command/URL for one ad-hoc server.         | None                                                                                            |

</template>
<template #zh>

| 标志                          | 含义                                                | 差异                                                          |
| ----------------------------- | --------------------------------------------------- | ------------------------------------------------------------- |
| `--catalog <path>`            | 可写的目录文件。                                      | 无                                                            |
| `--config <path>`             | 只读的会话文件。                                      | 无                                                            |
| `--server <name>`             | 从文件中挑选一个指定名称的服务器。                       | **仅 Web 和 CLI。** TUI 会加载文件中的全部服务器，让你交互式挑选。 |
| `--transport <type>`          | `stdio`、`sse` 或 `http`。                            | 仅适用于临时目标。                                              |
| `--server-url <url>`          | SSE/HTTP 服务器的 URL。                               | 仅适用于临时目标。                                              |
| `--cwd <path>`                | stdio 服务器进程的工作目录。                           | 无                                                            |
| `-e <KEY=VALUE>`              | stdio 服务器的环境变量。可重复传入。                     | 无                                                            |
| `--header "Name: Value"`      | HTTP/SSE 服务器的 HTTP 请求头。可重复传入。              | Web 客户端上要求以临时 HTTP/SSE 服务器方式运行。                 |
| `[target...]`                 | 单个临时服务器的位置参数形式的命令/URL。                 | 无                                                            |

</template>
</BiRow>

<BiRow>
<template #en>

### The `--` separator

</template>
<template #zh>

### `--` 分隔符

</template>
</BiRow>

<BiRow>
<template #en>

The **web and CLI** clients split their arguments at a bare `--` and pass everything after it to the target command as its own arguments. This is how you pass a flag that the Inspector would otherwise eat:

</template>
<template #zh>

**Web 和 CLI** 客户端会在一个裸 `--` 处切分参数，把它之后的一切作为目标命令自己的参数传过去。这样就能传入一个本会被 Inspector 吞掉的标志：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
mcp-inspector node build/index.js -- --config /etc/myserver.conf --verbose
```

</template>
<template #zh>

```bash theme={null}
mcp-inspector node build/index.js -- --config /etc/myserver.conf --verbose
```

</template>
</BiRow>

<BiRow>
<template #en>

Without the separator, `--config` would be read as the Inspector's own read-only-session flag.

</template>
<template #zh>

没有这个分隔符，`--config` 会被解读为 Inspector 自己的只读会话标志。

</template>
</BiRow>

<BiRow>
<template #en>

## Web-only flags

</template>
<template #zh>

## Web 专属标志

</template>
</BiRow>

<BiRow>
<template #en>

| Flag    | Meaning                                                                                               |
| ------- | ----------------------------------------------------------------------------------------------------- |
| `--dev` | Run the Vite dev server instead of the pre-built bundle. Useful when working on the Inspector itself. |

</template>
<template #zh>

| 标志     | 含义                                                                     |
| ------- | ------------------------------------------------------------------------- |
| `--dev` | 改为运行 Vite 开发服务器，而不是预构建的 bundle。在开发 Inspector 本身时很有用。 |

</template>
</BiRow>

<BiRow>
<template #en>

## CLI and TUI: OAuth client flags

</template>
<template #zh>

## CLI 和 TUI：OAuth 客户端标志

</template>
</BiRow>

<BiRow>
<template #en>

These five are defined by the **CLI and TUI** only. The web client obtains the same settings through its Client Settings dialog.

</template>
<template #zh>

这五个标志仅由 **CLI 和 TUI** 定义。Web 客户端通过其 Client Settings（客户端设置）对话框获得相同的设置。

</template>
</BiRow>

<BiRow>
<template #en>

| Flag                          | Environment variable     | Meaning                                                                                                                                                                                                                                                                                                          |
| ----------------------------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--client-config <path>`      | `MCP_CLIENT_CONFIG_PATH` | Install-level client config. Default `~/.mcp-inspector/storage/client.json`.                                                                                                                                                                                                                                     |
| `--client-id <id>`            | None                     | OAuth client ID for a static client. Overrides `client.json`.                                                                                                                                                                                                                                                    |
| `--client-secret <secret>`    | None                     | OAuth client secret for confidential clients. Overrides `client.json`.                                                                                                                                                                                                                                           |
| `--client-metadata-url <url>` | None                     | CIMD metadata URL. Overrides `client.json`.                                                                                                                                                                                                                                                                      |
| `--callback-url <url>`        | `MCP_OAUTH_CALLBACK_URL` | The redirect URI sent to the authorization server. Default `http://127.0.0.1:6276/oauth/callback`. Must be a loopback host (`127.0.0.1` or `localhost`): the local callback listener receives the authorization code over plaintext `http`, so any other host is rejected and there is no flag to override this. |

</template>
<template #zh>

| 标志                           | 环境变量                  | 含义                                                                                                                                                                 |
| ------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--client-config <path>`       | `MCP_CLIENT_CONFIG_PATH`  | 安装级的客户端配置。默认 `~/.mcp-inspector/storage/client.json`。                                                                                                       |
| `--client-id <id>`             | 无                        | 静态客户端的 OAuth client ID。覆盖 `client.json`。                                                                                                                      |
| `--client-secret <secret>`     | 无                        | 机密客户端（confidential client）的 OAuth client secret。覆盖 `client.json`。                                                                                           |
| `--client-metadata-url <url>`  | 无                        | CIMD 元数据 URL。覆盖 `client.json`。                                                                                                                                   |
| `--callback-url <url>`         | `MCP_OAUTH_CALLBACK_URL`  | 发送给授权服务器的重定向 URI。默认 `http://127.0.0.1:6276/oauth/callback`。必须是回环主机（`127.0.0.1` 或 `localhost`）：本地回调监听器通过明文 `http` 接收授权码，因此任何其他主机都会被拒绝，且没有任何标志可以覆盖这一限制。 |

</template>
</BiRow>

<BiRow>
<template #en>

## CLI-only flags

</template>
<template #zh>

## CLI 专属标志

</template>
</BiRow>

<BiRow>
<template #en>

The whole scripting surface belongs to the CLI. See [CLI client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli) for usage.

</template>
<template #zh>

整个脚本化操作面都属于 CLI。用法参见 [CLI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)。

</template>
</BiRow>

<BiRow>
<template #en>

| Group              | Flags                                                                                                                                                  |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **What to invoke** | `--method`, `--tool-name`, `--tool-arg`, `--tool-args-json`, `--uri`, `--prompt-name`, `--prompt-args`, `--log-level`, `--metadata`, `--tool-metadata` |
| **How to run it**  | `--connect-timeout`, `--format`, `--app-info`                                                                                                          |
| **Auth**           | `--use-stored-auth`, `--stored-auth-only`, `--relogin`, `--wait-for-auth`, `--list-stored-auth`, `--print-handoff`                                     |

</template>
<template #zh>

| 分组               | 标志                                                                                                                                                                 |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **调用什么**        | `--method`, `--tool-name`, `--tool-arg`, `--tool-args-json`, `--uri`, `--prompt-name`, `--prompt-args`, `--log-level`, `--metadata`, `--tool-metadata` |
| **如何运行**        | `--connect-timeout`, `--format`, `--app-info`                                                                                                                       |
| **授权**           | `--use-stored-auth`, `--stored-auth-only`, `--relogin`, `--wait-for-auth`, `--list-stored-auth`, `--print-handoff`                                                   |

</template>
</BiRow>

<BiRow>
<template #en>

## Environment variables

</template>
<template #zh>

## 环境变量

</template>
</BiRow>

<BiRow>
<template #en>

Environment variables split the same way as flags: two are read by the launcher itself, and the rest belong to the CLI and TUI or to the web backend.

</template>
<template #zh>

环境变量的划分与标志相同：两个由启动器自身读取，其余分别属于 CLI 和 TUI，或属于 Web 后端。

</template>
</BiRow>

<BiRow>
<template #en>

### Read by the launcher

</template>
<template #zh>

### 由启动器读取

</template>
</BiRow>

<BiRow>
<template #en>

| Variable    | Effect                                                                                                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_DEBUG` | Append the error stack to a top-level failure. Only when set to a meaningful value: `0`, `false`, and empty read as off.                                            |
| `DEBUG`     | Same, with the same meaningful-value rule, so a stray `DEBUG=0` doesn't turn stack traces on and `DEBUG` still works as the npm `debug` package's namespace filter. |

</template>
<template #zh>

| 变量         | 效果                                                                                                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_DEBUG`  | 在顶层失败信息后附上错误堆栈。仅在设为有意义的值时生效：`0`、`false` 和空值都视为关闭。                                                                                                     |
| `DEBUG`      | 同上，并遵循同一条「有意义的值」规则，因此误设的 `DEBUG=0` 不会打开堆栈跟踪，`DEBUG` 也仍能照常充当 npm `debug` 包的命名空间过滤器。                                                            |

</template>
</BiRow>

<BiRow>
<template #en>

### CLI and TUI

</template>
<template #zh>

### CLI 和 TUI

</template>
</BiRow>

<BiRow>
<template #en>

| Variable                         | Effect                                                                                                                                                                                              |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_CATALOG_PATH`               | Fallback for `--catalog`. Honored only when no ad-hoc target is given, so a shell that exports it can still run one-off ad-hoc invocations.                                                         |
| `MCP_CLIENT_CONFIG_PATH`         | Fallback for `--client-config`.                                                                                                                                                                     |
| `MCP_OAUTH_CALLBACK_URL`         | Fallback for `--callback-url`.                                                                                                                                                                      |
| `MCP_STORAGE_DIR`                | Directory for the OAuth state file (`<dir>/oauth.json`).                                                                                                                                            |
| `MCP_INSPECTOR_OAUTH_STATE_PATH` | Per-file override of the OAuth state path. Takes precedence over `MCP_STORAGE_DIR`.                                                                                                                 |
| `MCP_AUTO_OPEN_ENABLED`          | Controls browser auto-open and whether interactive OAuth may run without a TTY. `true` forces auto-open and allows OAuth prompts without a TTY, `false` never opens, and unset opens only on a TTY. |

</template>
<template #zh>

| 变量                             | 效果                                                                                                                                                                     |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `MCP_CATALOG_PATH`               | `--catalog` 的回退值。仅在未给出临时目标时生效，因此在导出了它的 shell 里，仍然可以运行一次性的临时调用。                                                                       |
| `MCP_CLIENT_CONFIG_PATH`         | `--client-config` 的回退值。                                                                                                                                                |
| `MCP_OAUTH_CALLBACK_URL`         | `--callback-url` 的回退值。                                                                                                                                                |
| `MCP_STORAGE_DIR`                | OAuth 状态文件（`<dir>/oauth.json`）所在的目录。                                                                                                                            |
| `MCP_INSPECTOR_OAUTH_STATE_PATH` | 对 OAuth 状态路径的按文件覆盖。优先于 `MCP_STORAGE_DIR`。                                                                                                                    |
| `MCP_AUTO_OPEN_ENABLED`          | 控制浏览器自动打开，以及交互式 OAuth 能否在没有 TTY 时运行。`true` 强制自动打开，并允许在没有 TTY 的情况下进行 OAuth 提示；`false` 从不打开；未设置则仅在存在 TTY 时打开。          |

</template>
</BiRow>

<BiRow>
<template #en>

### Web backend environment variables

</template>
<template #zh>

### Web 后端环境变量

</template>
</BiRow>

<BiRow>
<template #en>

| Variable                                  | Effect                                                                                                                         |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `MCP_INSPECTOR_API_TOKEN`                 | Pin the [session token](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#the-session-token) instead of generating a random one per launch. |
| `DANGEROUSLY_OMIT_AUTH`                   | Disable the `/api/*` token check entirely.                                                                                     |
| `HOST`                                    | Bind host. Defaults to `localhost`.                                                                                            |
| `CLIENT_PORT`                             | Web UI port. Defaults to `6274`.                                                                                               |
| `DANGEROUSLY_BIND_ALL_INTERFACES`         | Required opt-in to bind a wildcard host (`0.0.0.0`, `::`, or any equivalent spelling).                                         |
| `ALLOWED_ORIGINS`                         | Comma-separated origin allow-list. **Replaces** the default list rather than merging.                                          |
| `MCP_SANDBOX_PORT`                        | Pin the MCP Apps sandbox port, which is dynamic by default.                                                                    |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | Standard proxy routing for outbound MCP connections.                                                                           |

</template>
<template #zh>

| 变量                          | 效果                                                                                                                 |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `MCP_INSPECTOR_API_TOKEN`     | 固定[会话令牌](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web#the-session-token)，而不是每次启动都随机生成一个。 |
| `DANGEROUSLY_OMIT_AUTH`       | 彻底关闭 `/api/*` 的令牌校验。                                                                                        |
| `HOST`                        | 要绑定的主机。默认 `localhost`。                                                                                      |
| `CLIENT_PORT`                 | Web UI 端口。默认 `6274`。                                                                                            |
| `DANGEROUSLY_BIND_ALL_INTERFACES` | 绑定通配主机（`0.0.0.0`、`::` 或任何等价写法）时必须显式设置的开关。                                                |
| `ALLOWED_ORIGINS`             | 以逗号分隔的源（origin）允许列表。是**替换**默认列表，而不是与之合并。                                                  |
| `MCP_SANDBOX_PORT`            | 固定 MCP Apps（MCP 应用）沙箱的端口；该端口默认动态分配。                                                              |
| `HTTPS_PROXY` / `HTTP_PROXY` / `NO_PROXY` | 出站 MCP 连接的标准代理路由。                                                                              |

</template>
</BiRow>

<BiRow>
<template #en>

> **注意：**
> Never combine `DANGEROUSLY_OMIT_AUTH` and `DANGEROUSLY_BIND_ALL_INTERFACES`.
  The web backend spawns processes and holds OAuth tokens, so anyone who can
  reach it can drive it.

</template>
<template #zh>

> **注意：**
> 切勿将 `DANGEROUSLY_OMIT_AUTH` 和 `DANGEROUSLY_BIND_ALL_INTERFACES` 同时使用。
  Web 后端会派生进程并持有 OAuth 令牌，因此任何能访问到它的人，
  都能操纵它。

</template>
</BiRow>

<BiRow>
<template #en>

## Catalog file format

</template>
<template #zh>

## 目录文件格式

</template>
</BiRow>

<BiRow>
<template #en>

A catalog or config file is the familiar MCP client config shape (a `mcpServers` object) with per-server Inspector settings alongside:

</template>
<template #zh>

目录或配置文件采用常见的 MCP 客户端配置形态（一个 `mcpServers` 对象），其中并排附带逐服务器的 Inspector 设置：

</template>
</BiRow>

<BiRow>
<template #en>

```json theme={null}
{
  "mcpServers": {
"my-stdio-server": {
  "command": "node",
  "args": ["build/index.js"],
  "env": { "API_KEY": "..." }
},
"my-modern-server": {
  "type": "http",
  "url": "https://api.example.com/mcp",
  "protocolEra": "modern",
  "modernLogLevel": "info",
  "headers": { "X-Tenant": "acme" },
  "roots": [{ "uri": "file:///Users/me/project", "name": "project" }]
}
  }
}
```

</template>
<template #zh>

```json theme={null}
{
  "mcpServers": {
"my-stdio-server": {
  "command": "node",
  "args": ["build/index.js"],
  "env": { "API_KEY": "..." }
},
"my-modern-server": {
  "type": "http",
  "url": "https://api.example.com/mcp",
  "protocolEra": "modern",
  "modernLogLevel": "info",
  "headers": { "X-Tenant": "acme" },
  "roots": [{ "uri": "file:///Users/me/project", "name": "project" }]
}
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Fields that equal their default are omitted when the Inspector writes the file back, keeping diffs minimal. `protocolEra` (see [Protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)) defaults to `legacy` and `modernLogLevel` to `debug`.

</template>
<template #zh>

当 Inspector 写回文件时，等于默认值的字段会被省略，从而让 diff 保持最小。`protocolEra`（参见[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)）默认为 `legacy`，`modernLogLevel` 默认为 `debug`。

</template>
</BiRow>

<BiRow>
<template #en>

You do not have to hand-write these; the web client can [import an existing client config](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#importing-an-existing-client-config) from Claude Desktop, Cursor, Cline, or VS Code, or a registry `server.json`.

</template>
<template #zh>

你不必手写这些内容；Web 客户端可以从 Claude Desktop、Cursor、Cline 或 VS Code [导入现成的客户端配置](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#importing-an-existing-client-config)，也可以导入注册表（registry）的 `server.json`。

</template>
</BiRow>
