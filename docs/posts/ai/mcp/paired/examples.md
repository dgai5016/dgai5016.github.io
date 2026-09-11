<BiRow>
<template #en>

> A list of example servers and implementations

</template>
<template #zh>

> 示例服务器与实现一览

</template>
</BiRow>

<BiRow>
<template #en>

This page showcases various Model Context Protocol (MCP) servers that demonstrate the protocol's capabilities and versatility. These servers enable Large Language Models (LLMs) to securely access tools and data sources.

</template>
<template #zh>

本页展示了多个模型上下文协议（Model Context Protocol，MCP）服务器，它们体现了该协议的能力与通用性。这些服务器让大语言模型（LLM）能够安全地访问工具和数据源。

</template>
</BiRow>

<BiRow>
<template #en>

## Reference implementations

</template>
<template #zh>

## 参考实现

</template>
</BiRow>

<BiRow>
<template #en>

These official reference servers demonstrate core MCP features and SDK usage:

</template>
<template #zh>

这些官方参考服务器演示了 MCP 的核心功能与 SDK 用法：

</template>
</BiRow>

<BiRow>
<template #en>

### Current reference servers

</template>
<template #zh>

### 当前参考服务器

</template>
</BiRow>

<BiRow>
<template #en>

* **[Everything](https://github.com/modelcontextprotocol/servers/tree/main/src/everything)** - Reference / test server with prompts, resources, and tools
* **[Fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)** - Web content fetching and conversion for efficient LLM usage
* **[Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)** - Secure file operations with configurable access controls
* **[Git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)** - Tools to read, search, and manipulate Git repositories
* **[Memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)** - Knowledge graph-based persistent memory system
* **[Sequential Thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)** - Dynamic and reflective problem-solving through thought sequences
* **[Time](https://github.com/modelcontextprotocol/servers/tree/main/src/time)** - Time and timezone conversion capabilities

</template>
<template #zh>

* **[Everything](https://github.com/modelcontextprotocol/servers/tree/main/src/everything)** - 包含提示词、资源和工具的参考/测试服务器
* **[Fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)** - 网页内容抓取与转换，供 LLM 高效使用
* **[Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)** - 支持可配置访问控制的安全文件操作
* **[Git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)** - 用于读取、搜索和操作 Git 仓库的工具
* **[Memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)** - 基于知识图谱的持久化记忆系统
* **[Sequential Thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)** - 通过思维序列进行动态、反思式的问题求解
* **[Time](https://github.com/modelcontextprotocol/servers/tree/main/src/time)** - 时间与时区转换能力

</template>
</BiRow>

<BiRow>
<template #en>

### Additional example servers (archived)

</template>
<template #zh>

### 更多示例服务器（已归档）

</template>
</BiRow>

<BiRow>
<template #en>

Visit the [servers-archived repository](https://github.com/modelcontextprotocol/servers-archived) to get access to archived example servers that are no longer actively maintained.

</template>
<template #zh>

访问 [servers-archived 仓库](https://github.com/modelcontextprotocol/servers-archived)，获取已不再积极维护的归档示例服务器。

</template>
</BiRow>

<BiRow>
<template #en>

They are provided for historical reference only.

</template>
<template #zh>

它们仅供历史参考。

</template>
</BiRow>

<BiRow>
<template #en>

## Official integrations

</template>
<template #zh>

## 官方集成

</template>
</BiRow>

<BiRow>
<template #en>

Visit the [MCP Servers Repository (Official Integrations section)](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#%EF%B8%8F-official-integrations) for a list of MCP servers maintained by companies for their platforms.

</template>
<template #zh>

访问 [MCP 服务器仓库（官方集成部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#%EF%B8%8F-official-integrations)，查看各公司为其平台维护的 MCP 服务器列表。

</template>
</BiRow>

<BiRow>
<template #en>

## Community implementations

</template>
<template #zh>

## 社区实现

</template>
</BiRow>

<BiRow>
<template #en>

Visit the [MCP Servers Repository (Community section)](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers) for a list of MCP servers maintained by community members.

</template>
<template #zh>

访问 [MCP 服务器仓库（社区部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers)，查看由社区成员维护的 MCP 服务器列表。

</template>
</BiRow>

<BiRow>
<template #en>

## Getting started

</template>
<template #zh>

## 快速上手

</template>
</BiRow>

<BiRow>
<template #en>

### Using reference servers

</template>
<template #zh>

### 使用参考服务器

</template>
</BiRow>

<BiRow>
<template #en>

TypeScript-based servers can be used directly with `npx`:

</template>
<template #zh>

基于 TypeScript 的服务器可以用 `npx` 直接运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
npx -y @modelcontextprotocol/server-memory
```

</template>
<template #zh>

```bash
npx -y @modelcontextprotocol/server-memory
```

</template>
</BiRow>

<BiRow>
<template #en>

Python-based servers can be used with `uvx` (recommended) or `pip`:

</template>
<template #zh>

基于 Python 的服务器可以用 `uvx`（推荐）或 `pip` 运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
# Using uvx
uvx mcp-server-git

# Using pip
pip install mcp-server-git
python -m mcp_server_git
```

</template>
<template #zh>

```bash
# Using uvx
uvx mcp-server-git

# Using pip
pip install mcp-server-git
python -m mcp_server_git
```

</template>
</BiRow>

<BiRow>
<template #en>

### Configuring with Claude

</template>
<template #zh>

### 在 Claude 中配置

</template>
</BiRow>

<BiRow>
<template #en>

To use an MCP server with Claude, add it to your configuration:

</template>
<template #zh>

要在 Claude 中使用某个 MCP 服务器，需将它加入你的配置：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "mcpServers": {
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
},
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/path/to/allowed/files"
  ]
},
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
  }
}
  }
}
```

</template>
<template #zh>

```json
{
  "mcpServers": {
"memory": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-memory"]
},
"filesystem": {
  "command": "npx",
  "args": [
    "-y",
    "@modelcontextprotocol/server-filesystem",
    "/path/to/allowed/files"
  ]
},
"github": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-github"],
  "env": {
    "GITHUB_PERSONAL_ACCESS_TOKEN": "<YOUR_TOKEN>"
  }
}
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

## Additional resources

</template>
<template #zh>

## 更多资源

</template>
</BiRow>

<BiRow>
<template #en>

Visit the [MCP Servers Repository (Resources section)](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-resources) for a collection of other resources and projects related to MCP.

</template>
<template #zh>

访问 [MCP 服务器仓库（资源部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-resources)，获取与 MCP 相关的其他资源与项目合集。

</template>
</BiRow>

<BiRow>
<template #en>

Visit our [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions) to engage with the MCP community.

</template>
<template #zh>

欢迎访问我们的 [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions)，与 MCP 社区交流。

</template>
</BiRow>
