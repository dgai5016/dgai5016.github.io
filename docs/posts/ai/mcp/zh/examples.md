# 示例服务器

> 示例服务器与实现一览

本页展示了多个模型上下文协议（Model Context Protocol，MCP）服务器，它们体现了该协议的能力与通用性。这些服务器让大语言模型（LLM）能够安全地访问工具和数据源。

## 参考实现

这些官方参考服务器演示了 MCP 的核心功能与 SDK 用法：

### 当前参考服务器

* **[Everything](https://github.com/modelcontextprotocol/servers/tree/main/src/everything)** - 包含提示词、资源和工具的参考/测试服务器
* **[Fetch](https://github.com/modelcontextprotocol/servers/tree/main/src/fetch)** - 网页内容抓取与转换，供 LLM 高效使用
* **[Filesystem](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)** - 支持可配置访问控制的安全文件操作
* **[Git](https://github.com/modelcontextprotocol/servers/tree/main/src/git)** - 用于读取、搜索和操作 Git 仓库的工具
* **[Memory](https://github.com/modelcontextprotocol/servers/tree/main/src/memory)** - 基于知识图谱的持久化记忆系统
* **[Sequential Thinking](https://github.com/modelcontextprotocol/servers/tree/main/src/sequentialthinking)** - 通过思维序列进行动态、反思式的问题求解
* **[Time](https://github.com/modelcontextprotocol/servers/tree/main/src/time)** - 时间与时区转换能力

### 更多示例服务器（已归档）

访问 [servers-archived 仓库](https://github.com/modelcontextprotocol/servers-archived)，获取已不再积极维护的归档示例服务器。

它们仅供历史参考。

## 官方集成

访问 [MCP 服务器仓库（官方集成部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#%EF%B8%8F-official-integrations)，查看各公司为其平台维护的 MCP 服务器列表。

## 社区实现

访问 [MCP 服务器仓库（社区部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-community-servers)，查看由社区成员维护的 MCP 服务器列表。

## 快速上手

### 使用参考服务器

基于 TypeScript 的服务器可以用 `npx` 直接运行：

```bash theme={null}
npx -y @modelcontextprotocol/server-memory
```

基于 Python 的服务器可以用 `uvx`（推荐）或 `pip` 运行：

```bash theme={null}
# Using uvx
uvx mcp-server-git

# Using pip
pip install mcp-server-git
python -m mcp_server_git
```

### 在 Claude 中配置

要在 Claude 中使用某个 MCP 服务器，需将它加入你的配置：

```json theme={null}
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

## 更多资源

访问 [MCP 服务器仓库（资源部分）](https://github.com/modelcontextprotocol/servers?tab=readme-ov-file#-resources)，获取与 MCP 相关的其他资源与项目合集。

欢迎访问我们的 [GitHub Discussions](https://github.com/orgs/modelcontextprotocol/discussions)，与 MCP 社区交流。
