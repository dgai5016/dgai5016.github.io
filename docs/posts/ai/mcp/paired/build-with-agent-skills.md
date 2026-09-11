<BiRow>
<template #en>

> Use agent skills to guide AI coding assistants through MCP server design and implementation

</template>
<template #zh>

> 用 Agent Skills 指导 AI 编程助手完成 MCP 服务器的设计与实现

</template>
</BiRow>

<BiRow>
<template #en>

[Agent skills](https://agentskills.io/home) are portable instruction sets that
give AI coding assistants domain knowledge for a task. For MCP development,
they encode the design decisions (deployment model, tool patterns, auth) so
your agent can interrogate your use case and scaffold a server that fits.

</template>
<template #zh>

[Agent Skills](https://agentskills.io/home) 是可移植的指令集，能为 AI 编程助手提供完成某项任务所需的领域知识。在 MCP 开发中，技能将一系列设计决策（部署模型、工具模式、鉴权方式）编码其中，让智能体能够就你的使用场景逐项追问，并搭建出与之匹配的服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Available skills

</template>
<template #zh>

## 可用技能

</template>
</BiRow>

<BiRow>
<template #en>

A reference set of MCP development skills is available as the
[`mcp-server-dev` plugin](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev).
It provides three composing skills:

</template>
<template #zh>

一组 MCP 开发参考技能以 [`mcp-server-dev` 插件](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev)的形式提供。它包含三个可组合使用的技能：

</template>
</BiRow>

<BiRow>
<template #en>

| Skill              | Purpose                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `build-mcp-server` | Entry point. Interrogates the use case, picks a deployment model and tool-design pattern, routes to specialized skills. |
| `build-mcp-app`    | Adds interactive UI widgets (forms, pickers, dashboards) rendered inline in chat.                                       |
| `build-mcpb`       | Packages a local stdio server with its runtime so users can install it without Node or Python.                          |

</template>
<template #zh>

| 技能              | 用途                                                                                                                       |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `build-mcp-server` | 入口。追问使用场景，选定部署模型与工具设计模式，并路由到相应的专用技能。                                                   |
| `build-mcp-app`    | 添加在聊天中内联渲染的交互式 UI 组件（表单、选择器、仪表盘）。                                                             |
| `build-mcpb`       | 把本地 stdio（标准输入输出）服务器连同其运行时打包，让用户无需 Node 或 Python 即可安装。                                   |

</template>
</BiRow>

<BiRow>
<template #en>

Each skill ships a `SKILL.md` file plus a `references/` folder of supporting
material (auth flows, tool-design patterns, widget templates, manifest schemas)
that the agent reads on demand. The files follow the open format and work with
any agent that implements the standard. For example, to install them in Claude
Code:

</template>
<template #zh>

每个技能都附带一个 `SKILL.md` 文件，以及一个存放支持材料的 `references/` 目录（涵盖鉴权流程、工具设计模式、组件模板、清单 schema），供智能体按需读取。这些文件遵循开放格式，任何实现了该标准的智能体都能使用。例如，在 Claude Code 中安装它们：

</template>
</BiRow>

<BiRow>
<template #en>

```bash theme={null}
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mcp-server-dev
```

</template>
<template #zh>

```bash theme={null}
/plugin marketplace add anthropics/claude-plugins-official
/plugin install mcp-server-dev
```

</template>
</BiRow>

<BiRow>
<template #en>

For other agents, check your skills or extensions catalog, or clone the
[skill directories](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev/skills)
(`SKILL.md` plus `references/`) into your agent's skills location.

</template>
<template #zh>

对于其他智能体，请查看你的技能或扩展目录，或者把[技能目录](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/mcp-server-dev/skills)（`SKILL.md` 加 `references/`）克隆到你智能体的技能存放位置。

</template>
</BiRow>

<BiRow>
<template #en>

## Start a build

</template>
<template #zh>

## 开始构建

</template>
</BiRow>

<BiRow>
<template #en>

With the skills installed, ask your agent to help you build an MCP server. The
entry skill triggers on natural-language requests, or you can invoke it
directly using your agent's skill-invocation syntax.

</template>
<template #zh>

技能安装完成后，就可以让你的智能体帮你构建 MCP 服务器。入口技能会被自然语言请求触发，你也可以用智能体的技能调用语法直接调用它。

</template>
</BiRow>

<BiRow>
<template #en>

The skill runs a short discovery phase before writing any code. Expect
questions about:

</template>
<template #zh>

在编写任何代码之前，该技能会先进行一个简短的调研（discovery）阶段。它会就以下几方面向你提问：

</template>
</BiRow>

<BiRow>
<template #en>

* **What it connects to** — a cloud API, a local process, the filesystem, hardware
* **Who will use it** — just you, your team, or anyone who installs it
* **Action surface size** — a handful of operations versus wrapping a large API
* **User interaction needs** — plain text results, structured input via
  [elicitation](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation), or rich UI widgets
* **Upstream auth** — API keys, OAuth 2.0, or none

</template>
<template #zh>

* **连接对象** — 云端 API、本地进程、文件系统、硬件
* **使用者** — 只有你自己、你的团队，还是任何安装它的人
* **操作面大小** — 少量几个操作，还是封装一个大型 API
* **用户交互需求** — 纯文本结果、通过[征询](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)完成的结构化输入，还是富 UI 组件
* **上游鉴权** — API key、OAuth 2.0，还是无需鉴权

</template>
</BiRow>

<BiRow>
<template #en>

If your opening message already covers these, the agent skips ahead to the
recommendation.

</template>
<template #zh>

如果你的开场消息已经涵盖这些内容，智能体会直接跳到推荐环节。

</template>
</BiRow>

<BiRow>
<template #en>

## Deployment paths

</template>
<template #zh>

## 部署路径

</template>
</BiRow>

<BiRow>
<template #en>

Based on discovery, the skill recommends one of four paths and scaffolds
accordingly:

</template>
<template #zh>

根据调研结果，该技能会推荐四条路径之一，并据此搭建服务器：

</template>
</BiRow>

<BiRow>
<template #en>

**Remote [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)**
is the default for anything wrapping a cloud API. Zero install friction, one
deployment serves all users, and OAuth flows work properly because the server
can handle redirects and token storage. The reference skill includes scaffolds
for Cloudflare Workers and portable Express/FastMCP setups.

</template>
<template #zh>

**远程 [Streamable HTTP](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http)** 是封装任何云端 API 时的默认选择。零安装阻力，一次部署即可服务所有用户；OAuth 流程也能正常运转，因为服务器可以自行处理重定向和 token 存储。参考技能内置了 Cloudflare Workers 与可移植 Express/FastMCP 方案的脚手架。

</template>
</BiRow>

<BiRow>
<template #en>

**[MCP apps](https://modelcontextprotocol.io/extensions/apps/overview)** extend a server with interactive
widgets rendered in chat, such as searchable pickers, charts, and live
dashboards. The skill hands off to `build-mcp-app` when
[elicitation's](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation) flat-form constraints
don't fit.

</template>
<template #zh>

**[MCP 应用](https://modelcontextprotocol.io/extensions/apps/overview)** 通过在聊天中渲染的交互式组件来扩展服务器，例如可搜索的选择器、图表和实时仪表盘。当[征询](https://modelcontextprotocol.io/specification/2026-07-28/client/elicitation)的扁平表单约束不适用时，该技能会转交给 `build-mcp-app`。

</template>
</BiRow>

<BiRow>
<template #en>

**[MCP Bundles (MCPB)](https://github.com/modelcontextprotocol/mcpb)** package a
local server together with its runtime as a single `.mcpb` archive, so users
can install it without setting up Node or Python. Use this path when the server
must touch the user's machine: reading local files, driving desktop apps, or
talking to localhost services. The skill hands off to `build-mcpb`.

</template>
<template #zh>

**[MCP Bundle（MCPB）](https://github.com/modelcontextprotocol/mcpb)** 把本地服务器连同其运行时打包成单个 `.mcpb` 归档文件，用户无需配置 Node 或 Python 即可安装。如果服务器必须直接操作用户本机——读取本地文件、驱动桌面应用、与 localhost 服务通信——就应选择这条路径。该技能会转交给 `build-mcpb`。

</template>
</BiRow>

<BiRow>
<template #en>

**Local [stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)** remains available
for prototyping, with a noted upgrade path to MCPB when you're ready to
distribute.

</template>
<template #zh>

**本地 [stdio](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/stdio)** 仍可用于原型开发，并注明了准备分发时可升级到 MCPB 的路径。

</template>
</BiRow>

<BiRow>
<template #en>

## Next steps

</template>
<template #zh>

## 后续步骤

</template>
</BiRow>

<BiRow>
<template #en>

Once your agent scaffolds the server, iterate on tool descriptions and error
handling, then test and ship:

</template>
<template #zh>

智能体搭好服务器骨架后，反复打磨工具描述与错误处理，再测试并发布：

</template>
</BiRow>

<BiRow>
<template #en>

  - [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)：Test your server's tools, resources, and prompts interactively
  - [Connect to a client](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：Wire your server into an MCP client via local or remote configuration
  - [Publish to the Registry](https://modelcontextprotocol.io/registry/quickstart)：Make your server discoverable in the MCP Registry

</template>
<template #zh>

  - [MCP Inspector](https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector)：以交互方式测试你服务器的工具、资源和提示词
  - [连接到客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers)：通过本地或远程配置把你的服务器接入 MCP 客户端
  - [发布到 Registry](https://modelcontextprotocol.io/registry/quickstart)：让你的服务器在 MCP Registry 中可被发现

</template>
</BiRow>
