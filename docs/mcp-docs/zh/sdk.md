# SDK

> 基于模型上下文协议（Model Context Protocol）进行构建的官方 SDK

使用我们的官方 SDK 构建 MCP 服务器和客户端。SDK 依据功能完备程度、协议支持情况和维护承诺划分为不同层级（tier）。更多信息请参阅 [SDK 层级](https://modelcontextprotocol.io/community/sdk-tiers)。

## 可用的 SDK

| SDK                                                                                        | 代码仓库                                                                                          |                                                层级 |
| :----------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------- | ------------------------------------------------: |
| <Icon icon="square-js" size={24} />   [TypeScript](https://ts.sdk.modelcontextprotocol.io) | [modelcontextprotocol/typescript-sdk](https://github.com/modelcontextprotocol/typescript-sdk) |   <Badge color="blue" shape="pill">Tier 1</Badge> |
| <Icon icon="python" size={24} />   [Python](https://py.sdk.modelcontextprotocol.io)        | [modelcontextprotocol/python-sdk](https://github.com/modelcontextprotocol/python-sdk)         |   <Badge color="blue" shape="pill">Tier 1</Badge> |
| <Icon icon="square-c" size={24} />   [C#](https://csharp.sdk.modelcontextprotocol.io)      | [modelcontextprotocol/csharp-sdk](https://github.com/modelcontextprotocol/csharp-sdk)         |   <Badge color="blue" shape="pill">Tier 1</Badge> |
| <Icon icon="golang" size={24} />   [Go](https://go.sdk.modelcontextprotocol.io)            | [modelcontextprotocol/go-sdk](https://github.com/modelcontextprotocol/go-sdk)                 |   <Badge color="blue" shape="pill">Tier 1</Badge> |
| <Icon icon="rust" size={24} />   [Rust](https://rust.sdk.modelcontextprotocol.io)          | [modelcontextprotocol/rust-sdk](https://github.com/modelcontextprotocol/rust-sdk)             |   <Badge color="blue" shape="pill">Tier 1</Badge> |
| <Icon icon="java" size={24} />   [Java](https://java.sdk.modelcontextprotocol.io)          | [modelcontextprotocol/java-sdk](https://github.com/modelcontextprotocol/java-sdk)             | <Badge color="purple" shape="pill">Tier 2</Badge> |
| <Icon icon="gem" size={24} />   [Ruby](https://ruby.sdk.modelcontextprotocol.io)           | [modelcontextprotocol/ruby-sdk](https://github.com/modelcontextprotocol/ruby-sdk)             | <Badge color="purple" shape="pill">Tier 2</Badge> |
| <Icon icon="swift" size={24} />   Swift                                                    | [modelcontextprotocol/swift-sdk](https://github.com/modelcontextprotocol/swift-sdk)           | <Badge color="orange" shape="pill">Tier 3</Badge> |
| <Icon icon="php" size={24} />   [PHP](https://php.sdk.modelcontextprotocol.io)             | [modelcontextprotocol/php-sdk](https://github.com/modelcontextprotocol/php-sdk)               | <Badge color="orange" shape="pill">Tier 3</Badge> |
| <Icon icon="square-k" size={24} />   [Kotlin](https://kotlin.sdk.modelcontextprotocol.io)  | [modelcontextprotocol/kotlin-sdk](https://github.com/modelcontextprotocol/kotlin-sdk)         | <Badge color="orange" shape="pill">Tier 3</Badge> |

每个层级的具体含义，详见 [SDK 分层体系](https://modelcontextprotocol.io/community/sdk-tiers)。

## 快速上手

每个 SDK 提供的功能相同，但都遵循各自语言的惯用法与最佳实践。所有 SDK 均支持：

* 创建对外暴露工具、资源和提示词的 MCP 服务器
* 构建可连接任意 MCP 服务器的 MCP 客户端
* 本地与远程传输协议
* 既符合协议规范，又具备类型安全

前往你所选语言的 SDK 页面，查看安装说明、文档和示例。

## 后续步骤

准备好用 MCP 开始构建了吗？选择你的路线：

  - [构建服务器](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-server)：学习如何创建你的第一个 MCP 服务器
  - [构建客户端](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-client)：开发能连接 MCP 服务器的应用程序
