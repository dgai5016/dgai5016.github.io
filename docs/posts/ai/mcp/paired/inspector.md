<BiRow>
<template #en>

> Interactive developer tooling for testing and debugging MCP servers, in the browser, on the command line, and in the terminal

</template>
<template #zh>

> 用于测试与调试 MCP 服务器的交互式开发者工具，在浏览器、命令行与终端中均可使用

</template>
</BiRow>

<BiRow>
<template #en>

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) is the reference developer tool for testing and debugging [MCP servers](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts). It ships as a single package, `@modelcontextprotocol/inspector`, providing **three clients behind one binary**:

</template>
<template #zh>

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是测试和调试 [MCP 服务器](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts)的参考开发者工具。它以单个包 `@modelcontextprotocol/inspector` 发布，提供**一个二进制文件，三种客户端**：

</template>
</BiRow>

<BiRow>
<template #en>

| Client  | Invocation                                  | What it's for                                                                     |
| ------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| **Web** | `npx @modelcontextprotocol/inspector`       | A full graphical inspector in the browser. The default, and the richest surface.  |
| **CLI** | `npx @modelcontextprotocol/inspector --cli` | A scriptable, machine-readable client for CI, shell pipelines, and coding agents. |
| **TUI** | `npx @modelcontextprotocol/inspector --tui` | An interactive terminal UI, for when a browser isn't available or wanted.         |

</template>
<template #zh>

| 客户端  | 调用方式                                    | 用途                                                                               |
| ------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| **Web** | `npx @modelcontextprotocol/inspector`       | 浏览器中的完整图形化 inspector。默认形态，也是功能最丰富的界面。                  |
| **CLI** | `npx @modelcontextprotocol/inspector --cli` | 可脚本化、机器可读的客户端，适用于 CI、shell 管道与编码智能体。                   |
| **TUI** | `npx @modelcontextprotocol/inspector --tui` | 交互式终端 UI，适合没有浏览器或不想用浏览器的场合。                               |

</template>
</BiRow>

<BiRow>
<template #en>

All three are built on the same shared core, so a connection behaves identically across them: the same transports, the same configuration files, the same OAuth state on disk, and the same [protocol-era](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras) negotiation (legacy vs. modern 2026-07-28).

</template>
<template #zh>

三者都构建在同一个共享核心之上，因此同一个连接在三种客户端中的行为完全一致：相同的传输（transport）、相同的配置文件、磁盘上相同的 OAuth 状态，以及相同的[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)协商（旧版 legacy 与新版 modern 2026-07-28）。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-monitor-sidebar.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=eef6e546b9831b3d169e26bba8c54ce3" width="3840" height="2160" data-path="images/inspector/web-monitor-sidebar.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-monitor-sidebar.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=eef6e546b9831b3d169e26bba8c54ce3" width="3840" height="2160" data-path="images/inspector/web-monitor-sidebar.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Quickstart

</template>
<template #zh>

## 快速开始

</template>
</BiRow>

<BiRow>
<template #en>

The Inspector requires **Node 22.19.0 or newer** and runs directly through `npx`. No installation is required:

</template>
<template #zh>

Inspector 要求 **Node 22.19.0 或更高版本**，可直接通过 `npx` 运行。无需安装：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
# Launch the web UI and connect to a local stdio server
npx @modelcontextprotocol/inspector node path/to/server/index.js

# Or launch with no target and add servers from the UI
npx @modelcontextprotocol/inspector
```

</template>
<template #zh>

```bash theme={null}
# Launch the web UI and connect to a local stdio server
npx @modelcontextprotocol/inspector node path/to/server/index.js

# Or launch with no target and add servers from the UI
npx @modelcontextprotocol/inspector
```

</template>
</BiRow>

<BiRow>
<template #en>

The command prints a URL containing a one-time session token; open it in your browser. See [Web client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web).

</template>
<template #zh>

该命令会打印一个包含一次性会话令牌（token）的 URL，请在浏览器中打开它。参见 [Web 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)。

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
# List a server's tools and exit
npx @modelcontextprotocol/inspector --cli node path/to/server/index.js --method tools/list

# Call a tool and pipe the result into jq
npx @modelcontextprotocol/inspector --cli https://api.example.com/mcp --transport http \
  --method tools/call --tool-name get_weather --tool-arg city=Boston --format json | jq .result
```

</template>
<template #zh>

```bash theme={null}
# List a server's tools and exit
npx @modelcontextprotocol/inspector --cli node path/to/server/index.js --method tools/list

# Call a tool and pipe the result into jq
npx @modelcontextprotocol/inspector --cli https://api.example.com/mcp --transport http \
  --method tools/call --tool-name get_weather --tool-arg city=Boston --format json | jq .result
```

</template>
</BiRow>

<BiRow>
<template #en>

See [CLI client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli).

</template>
<template #zh>

参见 [CLI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)。

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
npx @modelcontextprotocol/inspector --tui node path/to/server/index.js
```

</template>
<template #zh>

```bash theme={null}
npx @modelcontextprotocol/inspector --tui node path/to/server/index.js
```

</template>
</BiRow>

<BiRow>
<template #en>

See [TUI client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui).

</template>
<template #zh>

参见 [TUI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui)。

</template>
</BiRow>

<BiRow>
<template #en>

### Inspecting published servers

</template>
<template #zh>

### 检查已发布的服务器

</template>
</BiRow>

<BiRow>
<template #en>

Pass the command that launches the server as the Inspector's arguments, or point it at a remote server with `--server-url`:

</template>
<template #zh>

把启动服务器的命令作为参数传给 Inspector，或者用 `--server-url` 让 Inspector 指向一个远程服务器：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem ~/Desktop
```

</template>
<template #zh>

```bash theme={null}
npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem ~/Desktop
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
```

</template>
<template #zh>

```bash theme={null}
npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
npx @modelcontextprotocol/inspector --server-url https://api.example.com/mcp --transport http
```

</template>
<template #zh>

```bash theme={null}
npx @modelcontextprotocol/inspector --server-url https://api.example.com/mcp --transport http
```

</template>
</BiRow>

<BiRow>
<template #en>

Always read a server's own README first, since every server requires different commands and arguments.

</template>
<template #zh>

请务必先阅读服务器自己的 README——每个服务器所需的命令和参数各不相同。

</template>
</BiRow>

<BiRow>
<template #en>

## Launcher flags vs. client flags

</template>
<template #zh>

## 启动器标志与客户端标志

</template>
</BiRow>

<BiRow>
<template #en>

`mcp-inspector`, the binary that `npx @modelcontextprotocol/inspector` runs, is a thin launcher. It owns only two things:

</template>
<template #zh>

`npx @modelcontextprotocol/inspector` 运行的二进制文件是 `mcp-inspector`——一个轻量级启动器（launcher），它只负责两件事：

</template>
</BiRow>

<BiRow>
<template #en>

1. **The mode flag:** `--web` (default), `--cli`, or `--tui`. At most one; passing two errors with `Specify at most one of --web, --cli, or --tui.`
2. **`-h` / `--help`.**

</template>
<template #zh>

1. **模式标志（mode flag）：** `--web`（默认）、`--cli` 或 `--tui`。至多一个；同时传入两个会报错：`Specify at most one of --web, --cli, or --tui.`
2. **`-h` / `--help`。**

</template>
</BiRow>

<BiRow>
<template #en>

Everything else (`--catalog`, `--config`, `--server-url`, `--transport`, `--method`, the OAuth flags) is defined by the *client*, not the launcher, and the clients do not all define the same set. The [Configuration and flags](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration) page is organized that way, by owner.

</template>
<template #zh>

其余标志（`--catalog`、`--config`、`--server-url`、`--transport`、`--method` 以及各 OAuth 标志）都由*客户端*而非启动器定义，而且三个客户端定义的标志集合并不完全相同。[配置与标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)页面正是按这种归属关系组织的。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> Mode flags are recognized only at the front of the command line: the first token that isn't `--web` / `--cli` / `--tui` ends launcher parsing, and everything after it is forwarded to the client unchanged. That's what lets a literal `--cli` appear later as one of your server's own arguments:

</template>
<template #zh>

> **注：**
> 模式标志只在命令行最前面才会被识别：第一个不是 `--web` / `--cli` / `--tui` 的 token 会终结启动器的解析，其后的所有内容都原封不动地转发给客户端。正因如此，命令行后面才能出现一个字面上的 `--cli`，作为你服务器自己的参数之一：

</template>
</BiRow>

<BiRow>
<template #en>

  ```bash theme={null}
  mcp-inspector --cli node server.js --cli   # mode is CLI; the trailing --cli goes to server.js
  ```

</template>
<template #zh>

  ```bash theme={null}
  mcp-inspector --cli node server.js --cli   # mode is CLI; the trailing --cli goes to server.js
  ```

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> `--help` behaves differently with and without a mode flag. Bare `mcp-inspector   --help` prints the launcher's help and exits. With a mode flag it is
  forwarded, so `mcp-inspector --cli --help` prints the CLI's full flag
  reference instead.

</template>
<template #zh>

> **注：**
> `--help` 在有无模式标志时行为不同。裸的 `mcp-inspector   --help` 会打印启动器的帮助并退出；带上模式标志后它会被转发，因此 `mcp-inspector --cli --help` 打印的则是 CLI 的完整标志参考。

</template>
</BiRow>

<BiRow>
<template #en>

## Where to go next

</template>
<template #zh>

## 后续阅读

</template>
</BiRow>

<BiRow>
<template #en>

  - [Web client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)：A tab-by-tab walkthrough of the graphical inspector.
  - [CLI client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)：Method reference, output formats, exit codes, and CI recipes.
  - [TUI client](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui)：Terminal navigation and keyboard reference.
  - [Configuration and flags](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)：Catalog vs. config files, the full per-client flag reference, and environment variables.
  - [Authorization](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)：The OAuth flow end to end, mid-session re-authorization, and loopback callbacks.
  - [Protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)：Legacy vs. modern (2026-07-28) operation, and how every tab changes between protocol eras.
  - [Recipes](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes)：Importing client configs, reviewing MCP Apps, Docker, and network hosting.
  - [Debugging guide](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：Broader debugging strategies beyond the Inspector.

</template>
<template #zh>

  - [Web 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)：图形化 inspector 的逐标签页导览。
  - [CLI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)：方法参考、输出格式、退出码与 CI 实用方案。
  - [TUI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui)：终端导航与键盘操作参考。
  - [配置与标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)：目录（catalog）与配置文件的对比、各客户端完整的标志参考，以及环境变量。
  - [授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)：端到端的 OAuth 流程、会话中途的重新授权，以及回环回调。
  - [协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)：旧版（legacy）与新版（modern，2026-07-28）的运作方式，以及每个标签页在两个协议时代之间的变化。
  - [实用方案](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes)：导入客户端配置、审查 MCP Apps、Docker 与网络托管。
  - [调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：Inspector 之外的更广泛调试策略。

</template>
</BiRow>
