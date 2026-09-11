# 版本管理

模型上下文协议（Model Context Protocol）使用基于字符串的版本标识符，格式为 `YYYY-MM-DD`，用以标明最后一次引入向后不兼容变更的日期。

<Info>
  协议更新时，只要变更保持向后兼容，协议版本就*不会*递增。这样可以在保持互操作性的同时实现渐进式改进。
</Info>

## 修订版本

修订版本（revision）可能被标记为：

* **草案（Draft）**：开发中的规范，尚未可供使用。
* **当前（Current）**：当前协议版本，已可供使用，并可能继续获得向后兼容的变更。
* **最终（Final）**：已完成的过往规范，不会再变更。

**当前**协议版本为 [**2026-07-28**](https://modelcontextprotocol.io/specification/2026-07-28/)。

## 功能状态

规范中的单个功能还可能依据[功能生命周期与弃用政策](https://modelcontextprotocol.io/community/feature-lifecycle)被标记为**已弃用（Deprecated）**：该功能仍是规范的一部分，但已被列入移除计划。被弃用的功能会说明迁移路径（或声明无需迁移），并在规范中至少保留十二个月（若适用该政策的[加速移除例外](https://modelcontextprotocol.io/community/feature-lifecycle#expedited-removal)，则至少保留九十天）才符合移除条件，此后便可能在未来的修订版本中被**移除（Removed）**。

目前已弃用的功能列于[已弃用功能注册表](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)中。

## 协商

每个请求都通过其 [`_meta`](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta) 字段中的 `io.modelcontextprotocol/protocolVersion` 键声明所使用的协议版本，由服务器逐个独立决定接受还是拒绝。在 Streamable HTTP 上，同一值也会通过 [`MCP-Protocol-Version` 请求头](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#protocol-version-header)携带。客户端和服务器**可以（MAY）**同时支持多个协议版本。

如果服务器不支持所请求的版本，会返回 [`UnsupportedProtocolVersionError`](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#protocol-version-negotiation)，其中列出自己实际支持的版本。客户端随后可用双方都支持的版本重试请求；如果不存在这样的版本，则向用户报错。

希望提前选定版本的客户端可以调用 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)。这是一个必须实现的 RPC，能在一次请求中返回服务器支持的协议版本、能力和身份信息。是否调用它是可选的：客户端完全可以直接发送任意请求，并在收到版本错误时进行处理。

如需与实现基于握手的协议修订版本（`2025-11-25` 及更早版本）的服务器和客户端互操作，请参阅[向后兼容性](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#backward-compatibility-with-initialization-based-versions)。
