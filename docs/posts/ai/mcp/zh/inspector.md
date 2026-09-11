# MCP Inspector

> 用于测试与调试 MCP 服务器的交互式开发者工具，在浏览器、命令行与终端中均可使用

[MCP Inspector](https://github.com/modelcontextprotocol/inspector) 是测试和调试 [MCP 服务器](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts)的参考开发者工具。它以单个包 `@modelcontextprotocol/inspector` 发布，提供**一个二进制文件，三种客户端**：

| 客户端  | 调用方式                                    | 用途                                                                               |
| ------- | ------------------------------------------- | --------------------------------------------------------------------------------- |
| **Web** | `npx @modelcontextprotocol/inspector`       | 浏览器中的完整图形化 inspector。默认形态，也是功能最丰富的界面。                  |
| **CLI** | `npx @modelcontextprotocol/inspector --cli` | 可脚本化、机器可读的客户端，适用于 CI、shell 管道与编码智能体。                   |
| **TUI** | `npx @modelcontextprotocol/inspector --tui` | 交互式终端 UI，适合没有浏览器或不想用浏览器的场合。                               |

三者都构建在同一个共享核心之上，因此同一个连接在三种客户端中的行为完全一致：相同的传输（transport）、相同的配置文件、磁盘上相同的 OAuth 状态，以及相同的[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)协商（旧版 legacy 与新版 modern 2026-07-28）。

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-monitor-sidebar.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=eef6e546b9831b3d169e26bba8c54ce3" width="3840" height="2160" data-path="images/inspector/web-monitor-sidebar.png" />

## 快速开始

Inspector 要求 **Node 22.19.0 或更高版本**，可直接通过 `npx` 运行。无需安装：

    ```bash theme={null}
    # Launch the web UI and connect to a local stdio server
    npx @modelcontextprotocol/inspector node path/to/server/index.js

    # Or launch with no target and add servers from the UI
    npx @modelcontextprotocol/inspector
    ```

    该命令会打印一个包含一次性会话令牌（token）的 URL，请在浏览器中打开它。参见 [Web 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)。

    ```bash theme={null}
    # List a server's tools and exit
    npx @modelcontextprotocol/inspector --cli node path/to/server/index.js --method tools/list

    # Call a tool and pipe the result into jq
    npx @modelcontextprotocol/inspector --cli https://api.example.com/mcp --transport http \
      --method tools/call --tool-name get_weather --tool-arg city=Boston --format json | jq .result
    ```

    参见 [CLI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)。

    ```bash theme={null}
    npx @modelcontextprotocol/inspector --tui node path/to/server/index.js
    ```

    参见 [TUI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui)。

### 检查已发布的服务器

把启动服务器的命令作为参数传给 Inspector，或者用 `--server-url` 让 Inspector 指向一个远程服务器：

    ```bash theme={null}
    npx -y @modelcontextprotocol/inspector npx @modelcontextprotocol/server-filesystem ~/Desktop
    ```

    ```bash theme={null}
    npx @modelcontextprotocol/inspector uvx mcp-server-git --repository ~/code/mcp/servers.git
    ```

    ```bash theme={null}
    npx @modelcontextprotocol/inspector --server-url https://api.example.com/mcp --transport http
    ```

请务必先阅读服务器自己的 README——每个服务器所需的命令和参数各不相同。

## 启动器标志与客户端标志

`npx @modelcontextprotocol/inspector` 运行的二进制文件是 `mcp-inspector`——一个轻量级启动器（launcher），它只负责两件事：

1. **模式标志（mode flag）：** `--web`（默认）、`--cli` 或 `--tui`。至多一个；同时传入两个会报错：`Specify at most one of --web, --cli, or --tui.`
2. **`-h` / `--help`。**

其余标志（`--catalog`、`--config`、`--server-url`、`--transport`、`--method` 以及各 OAuth 标志）都由*客户端*而非启动器定义，而且三个客户端定义的标志集合并不完全相同。[配置与标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)页面正是按这种归属关系组织的。

> **注：**
> 模式标志只在命令行最前面才会被识别：第一个不是 `--web` / `--cli` / `--tui` 的 token 会终结启动器的解析，其后的所有内容都原封不动地转发给客户端。正因如此，命令行后面才能出现一个字面上的 `--cli`，作为你服务器自己的参数之一：

  ```bash theme={null}
  mcp-inspector --cli node server.js --cli   # mode is CLI; the trailing --cli goes to server.js
  ```

> **注：**
> `--help` 在有无模式标志时行为不同。裸的 `mcp-inspector   --help` 会打印启动器的帮助并退出；带上模式标志后它会被转发，因此 `mcp-inspector --cli --help` 打印的则是 CLI 的完整标志参考。

## 后续阅读

  - [Web 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web)：图形化 inspector 的逐标签页导览。
  - [CLI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli)：方法参考、输出格式、退出码与 CI 实用方案。
  - [TUI 客户端](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui)：终端导航与键盘操作参考。
  - [配置与标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)：目录（catalog）与配置文件的对比、各客户端完整的标志参考，以及环境变量。
  - [授权](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization)：端到端的 OAuth 流程、会话中途的重新授权，以及回环回调。
  - [协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)：旧版（legacy）与新版（modern，2026-07-28）的运作方式，以及每个标签页在两个协议时代之间的变化。
  - [实用方案](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes)：导入客户端配置、审查 MCP Apps、Docker 与网络托管。
  - [调试指南](https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging)：Inspector 之外的更广泛调试策略。
