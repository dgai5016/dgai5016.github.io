# 什么是模型上下文协议（Model Context Protocol，MCP）？

MCP（模型上下文协议，Model Context Protocol）是一个开源标准，用于把 AI 应用连接到外部系统。

借助 MCP，Claude、ChatGPT 等 AI 应用可以连接数据源（如本地文件、数据库）、工具（如搜索引擎、计算器）和工作流（如专用提示词），从而获取关键信息并执行任务。

可以把 MCP 想象成 AI 应用的 USB-C 接口。正如 USB-C 为电子设备提供了一种标准化的连接方式，MCP 也为 AI 应用连接外部系统提供了标准化的方式。

  <img src="https://mintcdn.com/mcp/bEUxYpZqie0DsluH/images/mcp-simple-diagram.png?fit=max&auto=format&n=bEUxYpZqie0DsluH&q=85&s=35268aa0ad50b8c385913810e7604550" width="3840" height="1500" data-path="images/mcp-simple-diagram.png" />

## MCP 能实现什么？

* 智能体（agent）可以访问你的 Google Calendar 和 Notion，成为更个性化的 AI 助手。
* Claude Code 可以依据 Figma 设计稿生成整个 Web 应用。
* 企业聊天机器人可以连接组织内的多个数据库，让用户通过对话就能分析数据。
* AI 模型可以在 Blender 中创建 3D 设计，并用 3D 打印机打印出来。

## MCP 为何重要？

处在生态的什么位置，决定了 MCP 能为你带来哪些收益。

* **开发者**：无论是构建 AI 应用或智能体，还是与它们集成，MCP 都能缩短开发时间、降低复杂度。
* **AI 应用或智能体**：MCP 让它们接入由数据源、工具和应用构成的生态，从而增强能力、改善最终用户体验。
* **最终用户**：MCP 带来能力更强的 AI 应用或智能体，它们可以访问用户数据，并在必要时代表用户采取行动。

## 广泛的生态支持

MCP 是一个开放协议，得到了大量客户端和服务器支持。[Claude](https://claude.com/docs/connectors/building)、[ChatGPT](https://developers.openai.com/api/docs/mcp/) 等 AI 助手，[Visual Studio Code](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)、[Cursor](https://cursor.com/docs/context/mcp)、[MCPJam](https://docs.mcpjam.com/getting-started) 等开发工具，以及许多其他产品都支持 MCP，让「一次构建、处处集成」轻而易举。

## 开始构建

  - [构建服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：创建 MCP 服务器，对外暴露你的数据和工具
  - [构建客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)：开发能连接 MCP 服务器的应用程序
  - [构建 MCP 应用](https://modelcontextprotocol.io/extensions/apps/overview)：开发运行在 AI 客户端内的交互式应用

## 了解更多

  - [理解概念](https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture)：学习 MCP 的核心概念与架构
