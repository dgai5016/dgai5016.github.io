// MCP 双语文档清单：24 篇官方文档的元信息。
// 数据源三处对齐：slug 与 scripts/mcp-docs/fetch-originals.py 的 MANIFEST 一致；
// titleZh 与《MCP 学习地图》文章里的中文译名一致；sourceUrl 指向官方英文原文。
// 消费方：BilingualOverlay（头部标题/原文链接/上下篇导航）。
export interface McpDocMeta {
  slug: string      // 站内标识，对应 docs/mcp-docs/paired/<slug>.md
  group: string     // 分组名（与学习地图文章的七个分组一致）
  titleZh: string   // 中文标题（overlay 头部主标题）
  titleEn: string   // 英文标题（副标题）
  sourceUrl: string // 官方英文原文链接（「阅读原文」入口）
}

export const mcpDocs: McpDocMeta[] = [
  { slug: 'intro', group: '认识 MCP', titleZh: 'MCP 是什么？', titleEn: 'What is the Model Context Protocol (MCP)?', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro' },
  { slug: 'architecture', group: '核心概念', titleZh: '架构总览', titleEn: 'Architecture overview', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/learn/architecture' },
  { slug: 'server-concepts', group: '核心概念', titleZh: '理解 MCP 服务器', titleEn: 'Understanding MCP servers', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts' },
  { slug: 'client-concepts', group: '核心概念', titleZh: '理解 MCP 客户端', titleEn: 'Understanding MCP clients', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts' },
  { slug: 'versioning', group: '核心概念', titleZh: '版本机制', titleEn: 'Versioning', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/learn/versioning' },
  { slug: 'connect-local-servers', group: '动手开发', titleZh: '连接本地 MCP 服务器', titleEn: 'Connect to local MCP servers', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-local-servers' },
  { slug: 'connect-remote-servers', group: '动手开发', titleZh: '连接远程 MCP 服务器', titleEn: 'Connect to remote MCP Servers', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/connect-remote-servers' },
  { slug: 'build-with-agent-skills', group: '动手开发', titleZh: '用 Agent Skills 构建', titleEn: 'Build with Agent Skills', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills' },
  { slug: 'build-server', group: '动手开发', titleZh: '构建 MCP 服务器', titleEn: 'Build an MCP server', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server' },
  { slug: 'build-client', group: '动手开发', titleZh: '构建 MCP 客户端', titleEn: 'Build an MCP client', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client' },
  { slug: 'client-best-practices', group: '动手开发', titleZh: '客户端最佳实践', titleEn: 'Client Best Practices', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices' },
  { slug: 'sdk', group: 'SDK', titleZh: '官方 SDK 一览', titleEn: 'SDKs', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/sdk' },
  { slug: 'security-authorization', group: '安全', titleZh: '理解 MCP 的授权机制', titleEn: 'Understanding Authorization in MCP', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/authorization' },
  { slug: 'security-best-practices', group: '安全', titleZh: '安全最佳实践', titleEn: 'Security Best Practices', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices' },
  { slug: 'inspector', group: '调试与工具', titleZh: 'MCP Inspector 总览', titleEn: 'MCP Inspector', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector' },
  { slug: 'inspector-web', group: '调试与工具', titleZh: 'Inspector 网页客户端', titleEn: 'Web client', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/web' },
  { slug: 'inspector-cli', group: '调试与工具', titleZh: 'Inspector 命令行客户端', titleEn: 'CLI client', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/cli' },
  { slug: 'inspector-tui', group: '调试与工具', titleZh: 'Inspector 终端客户端', titleEn: 'TUI client', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/tui' },
  { slug: 'inspector-configuration', group: '调试与工具', titleZh: 'Inspector 配置与参数', titleEn: 'Configuration and flags', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/configuration' },
  { slug: 'inspector-authorization', group: '调试与工具', titleZh: 'Inspector 的授权', titleEn: 'Authorization', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/authorization' },
  { slug: 'inspector-protocol-eras', group: '调试与工具', titleZh: 'Inspector 协议时代', titleEn: 'Protocol eras', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/protocol-eras' },
  { slug: 'inspector-recipes', group: '调试与工具', titleZh: 'Inspector 实战配方', titleEn: 'Recipes', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/inspector/recipes' },
  { slug: 'debugging', group: '调试与工具', titleZh: '调试指南', titleEn: 'Debugging', sourceUrl: 'https://modelcontextprotocol.io/docs/2026-07-28/tools/debugging' },
  { slug: 'examples', group: '示例', titleZh: '官方示例服务器', titleEn: 'Example Servers', sourceUrl: 'https://modelcontextprotocol.io/examples' },
]
