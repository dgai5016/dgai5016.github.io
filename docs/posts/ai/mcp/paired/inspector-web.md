<BiRow>
<template #en>

> A tab-by-tab walkthrough of the graphical MCP Inspector

</template>
<template #zh>

> 图形化 MCP Inspector 的逐标签页导览

</template>
</BiRow>

<BiRow>
<template #en>

The web client is the Inspector's richest surface: a single-page app backed by a small Node server that owns the actual MCP connections. It is the default mode, so `npx @modelcontextprotocol/inspector` with no mode flag lands here.

</template>
<template #zh>

Web 客户端是 Inspector 中功能最丰富的形态：一个由小型 Node 服务器支撑的单页应用，实际的 MCP 连接由它持有。它是默认模式，因此 `npx @modelcontextprotocol/inspector` 不带任何模式标志时进入的就是这里。

</template>
</BiRow>

<BiRow>
<template #en>

```bash
npx @modelcontextprotocol/inspector                       # empty, add servers in the UI
npx @modelcontextprotocol/inspector node build/index.js   # with an ad-hoc stdio server
npx @modelcontextprotocol/inspector --catalog ./mcp.json  # with a catalog file
```

</template>
<template #zh>

```bash
npx @modelcontextprotocol/inspector                       # empty, add servers in the UI
npx @modelcontextprotocol/inspector node build/index.js   # with an ad-hoc stdio server
npx @modelcontextprotocol/inspector --catalog ./mcp.json  # with a catalog file
```

</template>
</BiRow>

<BiRow>
<template #en>

## The session token

</template>
<template #zh>

## 会话令牌

</template>
</BiRow>

<BiRow>
<template #en>

The Node server behind the web client guards every `/api/*` route with a per-launch token, because it can spawn processes on your machine. The launcher prints a URL containing that token: **open that URL**, and don't type `localhost:6274` from memory.

</template>
<template #zh>

Web 客户端背后的 Node 服务器用每次启动生成的令牌（token）守卫所有 `/api/*` 路由，因为它可以在你的机器上派生进程。启动器会打印一个内含该令牌的 URL：**请打开这个 URL**，不要凭记忆手输 `localhost:6274`。

</template>
</BiRow>

<BiRow>
<template #en>

The browser recovers the token from three places, in priority order:

</template>
<template #zh>

浏览器会按优先级顺序从三个位置找回令牌：

</template>
</BiRow>

<BiRow>
<template #en>

1. `window.__INSPECTOR_API_TOKEN__`, injected into `index.html` on every page load. This is what makes a bare-URL reload or a bookmark keep working.
2. A `?MCP_INSPECTOR_API_TOKEN=...` query string, the form used in that printed URL.
3. `sessionStorage`, as a backstop.

</template>
<template #zh>

1. `window.__INSPECTOR_API_TOKEN__`，每次页面加载时注入到 `index.html`。正因如此，直接重载裸 URL 或使用书签都能继续工作。
2. `?MCP_INSPECTOR_API_TOKEN=...` 查询字符串，即打印出来的那个 URL 所用的形式。
3. `sessionStorage`，作为兜底。

</template>
</BiRow>

<BiRow>
<template #en>

Set the `MCP_INSPECTOR_API_TOKEN` environment variable to pin a known token (useful for scripted launches), or set `DANGEROUSLY_OMIT_AUTH=true` to disable the check entirely, but only on a machine where nothing else can reach the port. Both are described under [Web backend environment variables](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#web-backend-environment-variables).

</template>
<template #zh>

设置 `MCP_INSPECTOR_API_TOKEN` 环境变量可以固定一个已知令牌（对脚本化启动很有用）；也可以设置 `DANGEROUSLY_OMIT_AUTH=true` 彻底关闭这项校验，但只有在一台没有其他任何程序能访问该端口的机器上才能这么做。两者的说明见 [Web 后端环境变量](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#web-backend-environment-variables) 一节。

</template>
</BiRow>

<BiRow>
<template #en>

## Dev mode

</template>
<template #zh>

## Dev 模式

</template>
</BiRow>

<BiRow>
<template #en>

`--dev` is a **web-only** flag. It runs the Vite dev server instead of serving the pre-built bundle, which matters if you're working on the Inspector itself:

</template>
<template #zh>

`--dev` 是一个**仅限 Web 模式**的标志。它运行 Vite 开发服务器，而不是提供预构建产物（bundle）——如果你自己正在开发 Inspector，这一点很有用：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
mcp-inspector --web --dev
```

</template>
<template #zh>

```bash
mcp-inspector --web --dev
```

</template>
</BiRow>

<BiRow>
<template #en>

Production `--web` serves a built bundle. In the published package that bundle always ships; in a fresh source checkout it doesn't, so the runner builds it on demand the first time you launch.

</template>
<template #zh>

生产模式的 `--web` 提供的是构建产物。在已发布的包中，该产物始终随包附带；而在全新检出的源码副本中则没有，因此运行器会在你首次启动时按需构建它。

</template>
</BiRow>

<BiRow>
<template #en>

## The tab bar

</template>
<template #zh>

## 标签栏

</template>
</BiRow>

<BiRow>
<template #en>

| Tab           | Shown when                                                            | What it does                                                                   |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| **Servers**   | Always                                                                | The server list: add, edit, import, connect, and open per-server settings.     |
| **Apps**      | The server exposes MCP App tools                                      | Renders a tool's UI in a sandboxed frame.                                      |
| **Tools**     | `tools` capability                                                    | Browse schemas, fill arguments, call, inspect results.                         |
| **Prompts**   | `prompts` capability                                                  | List prompts, supply arguments, preview generated messages.                    |
| **Resources** | `resources` capability                                                | Browse, read, and subscribe to resources.                                      |
| **Tasks**     | `capabilities.tasks` (legacy era) or the tasks extension (modern era) | Track long-running tool calls.                                                 |
| **Logs**      | `logging` capability                                                  | Server `notifications/message` output, plus the era-appropriate level control. |
| **Protocol**  | Always                                                                | The JSON-RPC transcript: requests, responses, notifications.                   |
| **Network**   | HTTP / SSE servers                                                    | The raw HTTP view: status, headers, bodies.                                    |
| **Console**   | stdio servers                                                         | The server process's `stderr`.                                                 |

</template>
<template #zh>

| 标签页 | 何时显示 | 作用 |
| --- | --- | --- |
| **Servers** | 始终显示 | 服务器列表：添加、编辑、导入、连接，以及打开服务器专属设置。 |
| **Apps** | 服务器暴露 MCP App 工具时 | 在沙箱框架中渲染工具的 UI。 |
| **Tools** | 具备 `tools` 能力 | 浏览 schema、填写参数、调用工具、查看结果。 |
| **Prompts** | 具备 `prompts` 能力 | 列出提示词、提供参数、预览生成的消息。 |
| **Resources** | 具备 `resources` 能力 | 浏览、读取并订阅资源。 |
| **Tasks** | `capabilities.tasks`（旧协议时代）或 tasks 扩展（现代协议时代） | 跟踪长时间运行的工具调用。 |
| **Logs** | 具备 `logging` 能力 | 服务器的 `notifications/message` 输出，外加与协议时代匹配的级别控制。 |
| **Protocol** | 始终显示 | JSON-RPC 通信记录：请求、响应、通知。 |
| **Network** | HTTP / SSE 服务器 | 原始 HTTP 视图：状态码、请求头、消息体。 |
| **Console** | stdio（标准输入输出）服务器 | 服务器进程的 `stderr`。 |

</template>
</BiRow>

<BiRow>
<template #en>

**Network** and **Console** never appear together. Legacy and modern eras are described in [Protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras).

</template>
<template #zh>

**Network** 与 **Console** 永远不会同时出现。旧协议时代与现代协议时代（protocol eras）的说明参见[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-tab-bar.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=04bb61c4a45ff12e8337c701e195c386" width="3840" height="2400" data-path="images/inspector/web-tab-bar.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-tab-bar.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=04bb61c4a45ff12e8337c701e195c386" width="3840" height="2400" data-path="images/inspector/web-tab-bar.png" />

</template>
</BiRow>

<BiRow>
<template #en>

### The monitoring sidebar

</template>
<template #zh>

### 监控侧边栏

</template>
</BiRow>

<BiRow>
<template #en>

**Tasks**, **Logs**, **Protocol**, **Network**, and **Console** form a *monitor group*. Pin the group and they leave the tab bar and move into a resizable right-hand column, so you can watch traffic while working in Tools or Resources. The column width and the selected monitor tab persist across reloads.

</template>
<template #zh>

**Tasks**、**Logs**、**Protocol**、**Network** 和 **Console** 组成一个*监控组*（monitor group）。固定该组后，它们会离开标签栏，移入右侧一个宽度可调的栏，这样你在 Tools 或 Resources 中操作时也能同时观察流量。栏宽和选中的监控标签页在重载后也会保留。

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

## Servers

</template>
<template #zh>

## Servers（服务器）

</template>
</BiRow>

<BiRow>
<template #en>

The Servers screen is the entry point. A server row carries its transport, its connection state, and a control that opens its per-server settings.

</template>
<template #zh>

Servers 界面是入口。每个服务器行都会显示它的传输方式、连接状态，以及一个用于打开其专属设置的控件。

</template>
</BiRow>

<BiRow>
<template #en>

Where that list comes from, and whether it's editable, depends on how you launched:

</template>
<template #zh>

这个列表从哪里来、能否编辑，取决于你的启动方式：

</template>
</BiRow>

<BiRow>
<template #en>

| Launch                                       | Server list                                                             | Editable? |
| -------------------------------------------- | ----------------------------------------------------------------------- | --------- |
| `mcp-inspector --web`                        | The default catalog `~/.mcp-inspector/mcp.json`, seeded on first launch | Yes       |
| `--catalog <path>`                           | That file, seeded with the sample servers if missing                    | Yes       |
| `--config <path>`                            | That file, read-only (never written or seeded)                          | No        |
| `--server-url <url>` or a positional command | One ad-hoc server, held in memory                                       | No        |

</template>
<template #zh>

| 启动方式 | 服务器列表 | 可编辑？ |
| --- | --- | --- |
| `mcp-inspector --web` | 默认目录（catalog）`~/.mcp-inspector/mcp.json`，首次启动时预置 | 是 |
| `--catalog <path>` | 该文件，缺失时预置示例服务器 | 是 |
| `--config <path>` | 该文件，只读（绝不写入，也不预置） | 否 |
| `--server-url <url>` 或位置参数命令 | 单个临时服务器，仅存于内存 | 否 |

</template>
</BiRow>

<BiRow>
<template #en>

On a first launch the web client seeds the catalog with two sample servers: a filesystem server scoped to `/tmp` and the canonical "everything" reference server. See [Configuration and flags](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration) for the full rules, including why the CLI and TUI seed an empty catalog instead.

</template>
<template #zh>

首次启动时，Web 客户端会在目录中预置两个示例服务器：一个限定在 `/tmp` 范围内的文件系统服务器，以及权威的 "everything" 参考服务器。完整规则见[配置与标志](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration)，其中包括为什么 CLI 和 TUI 预置的反而是空目录。

</template>
</BiRow>

<BiRow>
<template #en>

### Server Settings

</template>
<template #zh>

### Server Settings（服务器设置）

</template>
</BiRow>

<BiRow>
<template #en>

* **Protocol Era**: `legacy` / `auto` / `modern`. See [Protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras).
* **Log level per request**: the level a modern-era connection stamps on each outgoing request by default, or `off` to opt out (see [Logging](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#logging)).
* **Advertised Extensions**: which extensions the Inspector declares in `capabilities.extensions`. A debugging knob: a server may legitimately change what it registers based on what you advertise. Uncheck the Tasks extension and reconnect against the `test-servers/configs/advertised-extensions-http.json` fixture (setup in [Reproducing each era locally](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#reproducing-each-era-locally)) to watch a tool disappear.
* **Roots**: the roots advertised via the `roots` client capability. `@modelcontextprotocol/server-filesystem`, for instance, calls `roots/list` to learn its allowed directories.
* **Headers**, **timeouts**, and **OAuth** fields.
* **Fetch lists one page at a time**: when off, list results are auto-aggregated across pages on connect; when on, each list loads page 1 only with a **Load next page** control and an *N pages loaded* status. Reproduce with `test-servers/configs/pagination-http.json`, which paginates 12 tools, resources, and prompts into three pages each.

</template>
<template #zh>

* **Protocol Era**（协议时代）：`legacy` / `auto` / `modern`。参见[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras)。
* **Log level per request**（每请求日志级别）：现代协议时代的连接默认为每个出站请求标注的级别，设为 `off` 可选择退出（参见[日志记录](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#logging)）。
* **Advertised Extensions**（声明的扩展）：Inspector 在 `capabilities.extensions` 中声明哪些扩展。这是一个便于调试的可调参数：服务器完全可能根据你声明的内容，合理地改变自己注册的东西。取消勾选 Tasks 扩展，再重新连接 `test-servers/configs/advertised-extensions-http.json` 测试夹具（搭建方法见[在本地复现各协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#reproducing-each-era-locally)），就能看到一个工具消失。
* **Roots**（根目录）：通过 `roots` 客户端能力对外声明的根目录（roots）。例如 `@modelcontextprotocol/server-filesystem` 会调用 `roots/list` 来获知自己被允许访问的目录。
* **Headers**（请求头）、**timeouts**（超时）与 **OAuth** 字段。
* **Fetch lists one page at a time**（列表逐页获取）：关闭时，连接时会自动跨页聚合列表结果；开启时，每个列表只加载第 1 页，并配有 **Load next page**（加载下一页）控件和 *N pages loaded*（已加载 N 页）状态。可用 `test-servers/configs/pagination-http.json` 复现，它把 12 个工具、资源和提示词各自分成三页。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-server-settings.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=d42be09ee8de7e45e58a8ff1a444ba52" width="3840" height="2160" data-path="images/inspector/web-server-settings.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-server-settings.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=d42be09ee8de7e45e58a8ff1a444ba52" width="3840" height="2160" data-path="images/inspector/web-server-settings.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Tools

</template>
<template #zh>

## Tools（工具）

</template>
</BiRow>

<BiRow>
<template #en>

Select a tool to see its description, its input schema rendered as a form, and its annotations. Fill the form and call it; the result renders below with structured content, embedded resources, and images handled natively.

</template>
<template #zh>

选中一个工具，即可查看它的描述、渲染成表单的输入 schema，以及它的注解。填写表单并调用；结果会渲染在下方，其中的结构化内容、内嵌资源和图片都按原生方式处理。

</template>
</BiRow>

<BiRow>
<template #en>

On modern-era servers this screen also shows mirrored `Mcp-Param-*` headers, excluded tools, and distinct `-32602` error panels, all covered in [Protocol eras](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#tools-mirrored-headers-and-excluded-tools).

</template>
<template #zh>

在现代协议时代的服务器上，该界面还会显示镜像的 `Mcp-Param-*` 请求头、被排除的工具，以及各自独立的 `-32602` 错误面板，这些内容都在[协议时代](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#tools-mirrored-headers-and-excluded-tools)中介绍。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-tools.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=7ef469a969f398ac0ec70cf019c133da" width="3840" height="2160" data-path="images/inspector/web-tools.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-tools.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=7ef469a969f398ac0ec70cf019c133da" width="3840" height="2160" data-path="images/inspector/web-tools.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Resources

</template>
<template #zh>

## Resources（资源）

</template>
</BiRow>

<BiRow>
<template #en>

Lists resources and resource templates with their MIME types and descriptions, reads content on selection, and offers **Subscribe** on servers that support subscriptions. The subscription mechanics differ by era; see [Resource subscriptions](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#resource-subscriptions).

</template>
<template #zh>

列出资源与资源模板及其 MIME 类型和描述，选中即读取内容，并在支持订阅的服务器上提供 **Subscribe**（订阅）操作。订阅机制因协议时代而异；参见[资源订阅](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#resource-subscriptions)。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-resources.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=1a94ea452e1ef8aaf2c9f486ed810b28" width="3840" height="2160" data-path="images/inspector/web-resources.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-resources.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=1a94ea452e1ef8aaf2c9f486ed810b28" width="3840" height="2160" data-path="images/inspector/web-resources.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Prompts

</template>
<template #zh>

## Prompts（提示词）

</template>
</BiRow>

<BiRow>
<template #en>

Lists prompt templates with their arguments, and renders the generated messages for the arguments you supply, which is the fastest way to confirm a prompt produces what you intended.

</template>
<template #zh>

列出提示词模板及其参数，并根据你提供的参数渲染生成的消息——这是确认提示词产出内容是否符合预期的最快方式。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-prompts.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=81b16312b1adff5601622a72444b0f92" width="3840" height="2160" data-path="images/inspector/web-prompts.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-prompts.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=81b16312b1adff5601622a72444b0f92" width="3840" height="2160" data-path="images/inspector/web-prompts.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Apps

</template>
<template #zh>

## Apps（应用）

</template>
</BiRow>

<BiRow>
<template #en>

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview) are tools that carry UI. The Apps tab renders one in a sandboxed iframe served from a **separate port**, exercises the `ui/*` bridge, and shows the view's `ui/message` submissions and its `notifications/message` logs in side panels.

</template>
<template #zh>

[MCP Apps](https://modelcontextprotocol.io/extensions/apps/overview)（MCP 应用）是自带 UI 的工具。Apps 标签页会在一个由**独立端口**提供的沙箱 iframe 中渲染此类工具，实际驱动 `ui/*` 桥接，并在侧面板中显示视图的 `ui/message` 提交记录和它的 `notifications/message` 日志。

</template>
</BiRow>

<BiRow>
<template #en>

* The sandbox port is dynamic by default; pin it with `MCP_SANDBOX_PORT` if you need to expose or forward it.
* The sandbox is gated by a `frame-ancestors` CSP, and a bracketed IPv6 literal is not a valid CSP host-source, so browse the Inspector at `localhost`, `127.0.0.1`, a hostname, or a LAN IPv4, **not** at a bare `http://[::1]:...`.
* The sandbox URL is always plain `http`, so an `https://` Inspector page blocks the frame as mixed content. MCP Apps need a plain-`http` origin today.

</template>
<template #zh>

* 沙箱端口默认动态分配；如需暴露或转发该端口，可用 `MCP_SANDBOX_PORT` 固定。
* 沙箱由 `frame-ancestors` CSP 把守，而带方括号的 IPv6 字面量不是合法的 CSP host-source，因此请通过 `localhost`、`127.0.0.1`、主机名或局域网 IPv4 访问 Inspector，**而不要**用裸地址 `http://[::1]:...`。
* 沙箱 URL 始终是纯 `http`，因此 `https://` 的 Inspector 页面会把该框架当作混合内容拦截。MCP Apps 目前需要一个纯 `http` 源。

</template>
</BiRow>

<BiRow>
<template #en>

See [Recipes](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#reviewing-an-mcp-app) for the CLI-first automated review flow.

</template>
<template #zh>

以 CLI 为先的自动化审查流程参见[实用方案](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#reviewing-an-mcp-app)。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-apps.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=bd311848514f7d251640012986abfc4d" width="3840" height="2160" data-path="images/inspector/web-apps.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-apps.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=bd311848514f7d251640012986abfc4d" width="3840" height="2160" data-path="images/inspector/web-apps.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Protocol, Network, and Console

</template>
<template #zh>

## Protocol、Network 与 Console

</template>
</BiRow>

<BiRow>
<template #en>

The three tabs show the same traffic at different levels of detail:

</template>
<template #zh>

这三个标签页展示的是同一份流量，只是详细程度不同：

</template>
</BiRow>

<BiRow>
<template #en>

* **Protocol**: the JSON-RPC transcript. Requests paired with responses, notifications inline, [MRTR](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#multi-round-tool-results-mrtr) rounds grouped as one conversation, and spec errors rendered by class.
* **Network**: the HTTP layer, for SSE and Streamable HTTP servers. Status codes, request and response headers, and bodies. On modern connections the standardized `Mcp-*` headers are highlighted and sentinel values decoded.
* **Console**: the connected stdio server process's `stderr`, which is where most stdio servers put their own diagnostics.

</template>
<template #zh>

* **Protocol**：JSON-RPC 通信记录。请求与响应成对呈现，通知穿插其间，[MRTR](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras#multi-round-tool-results-mrtr) 轮次归组为一次对话，规范错误按类别渲染。
* **Network**：面向 SSE 和 Streamable HTTP 服务器的 HTTP 层。状态码、请求与响应头、消息体。在现代连接上，标准化的 `Mcp-*` 请求头会被高亮，哨兵值（sentinel value）会被解码。
* **Console**：已连接的 stdio 服务器进程的 `stderr`——大多数 stdio 服务器都把自己的诊断输出写到这里。

</template>
</BiRow>

<BiRow>
<template #en>

Secrets are masked in these views, and entries can be cleared or exported.

</template>
<template #zh>

这些视图中的密钥一律掩码显示，条目可清除或导出。

</template>
</BiRow>

<BiRow>
<template #en>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-protocol.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=f31338c83a389c5588f11c0d5b2b97ed" width="3840" height="2160" data-path="images/inspector/web-protocol.png" />

</template>
<template #zh>

  <img src="https://mintcdn.com/mcp/gk28X8wi_tbRYzej/images/inspector/web-protocol.png?fit=max&auto=format&n=gk28X8wi_tbRYzej&q=85&s=f31338c83a389c5588f11c0d5b2b97ed" width="3840" height="2160" data-path="images/inspector/web-protocol.png" />

</template>
</BiRow>

<BiRow>
<template #en>

## Deep links

</template>
<template #zh>

## 深度链接（Deep links）

</template>
</BiRow>

<BiRow>
<template #en>

A driver (a script, a CI harness, or the CLI's [`--print-handoff`](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization#handing-off-from-the-web-client-to-the-cli)) can reach a *connected* Inspector with a single navigation:

</template>
<template #zh>

驱动方（一段脚本、一个 CI 测试框架，或 CLI 的 [`--print-handoff`](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization#handing-off-from-the-web-client-to-the-cli)）只需一次导航，就能访问处于*已连接*状态的 Inspector：

</template>
</BiRow>

<BiRow>
<template #en>

```
http://127.0.0.1:6274/?serverUrl=<url>&transport=http|sse&autoConnect=<token>
```

</template>
<template #zh>

```
http://127.0.0.1:6274/?serverUrl=<url>&transport=http|sse&autoConnect=<token>
```

</template>
</BiRow>

<BiRow>
<template #en>

| Parameter     | Meaning                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `serverUrl`   | The MCP server URL. Restricted to `http:` / `https:`; a crafted `javascript:` or `file:` value is rejected.    |
| `transport`   | `http` (default) or `sse`.                                                                                     |
| `autoConnect` | **Required CSRF gate.** Must equal the per-launch session token, which only whatever started the server knows. |

</template>
<template #zh>

| 参数 | 含义 |
| --- | --- |
| `serverUrl` | MCP 服务器 URL。仅限 `http:` / `https:`；精心构造的 `javascript:` 或 `file:` 值会被拒绝。 |
| `transport` | `http`（默认）或 `sse`。 |
| `autoConnect` | **必需的 CSRF 校验关卡。** 必须等于本次启动的会话令牌，而该令牌只有当初启动服务器的一方才知道。 |

</template>
</BiRow>

<BiRow>
<template #en>

Three further parameters land you on a *rendered app*: `openApp=<toolName>` names the tool, `appArgs=<base64url(JSON)>` supplies its arguments (merged over the tool's schema defaults), and `autoOpen=<token>` fires the tool call automatically. Because `autoOpen` fires a call, it carries the same mandatory token gate as `autoConnect`.

</template>
<template #zh>

另外三个参数可让你直达*已渲染的应用*：`openApp=<toolName>` 指定工具，`appArgs=<base64url(JSON)>` 提供其参数（在工具 schema 默认值的基础上合并），`autoOpen=<token>` 则自动触发工具调用。由于 `autoOpen` 会触发调用，它和 `autoConnect` 一样带强制令牌关卡。

</template>
</BiRow>

<BiRow>
<template #en>

## Host binding and origins

</template>
<template #zh>

## 主机绑定与源（origin）

</template>
</BiRow>

<BiRow>
<template #en>

By default the Inspector binds `localhost` and accepts requests only from the loopback origins for its port. Treat both defaults as security boundaries, since the backend spawns processes on your machine.

</template>
<template #zh>

默认情况下，Inspector 绑定 `localhost`，只接受来自其端口对应回环源的请求。请把这两个默认值都当作安全边界，因为后端会在你的机器上派生进程。

</template>
</BiRow>

<BiRow>
<template #en>

Binding all interfaces (`HOST=0.0.0.0`) is **refused** unless you set `DANGEROUSLY_BIND_ALL_INTERFACES=true`. Binding a *specific* non-loopback address is allowed with no opt-in, since that's a single deliberate exposure rather than every interface at once.

</template>
<template #zh>

除非设置 `DANGEROUSLY_BIND_ALL_INTERFACES=true`，否则绑定所有接口（`HOST=0.0.0.0`）会被**拒绝**。绑定*特定*的非回环地址则无需任何额外开关——那是一次有意的单点暴露，而不是一次性暴露全部接口。

</template>
</BiRow>

<BiRow>
<template #en>

See the [Hosting on a network](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#hosting-on-a-network) recipe for the full matrix, and [Configuration](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#web-backend-environment-variables) for the variables.

</template>
<template #zh>

完整对照矩阵见[在网络上托管](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes#hosting-on-a-network)方案，相关变量见[配置](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration#web-backend-environment-variables)。

</template>
</BiRow>
