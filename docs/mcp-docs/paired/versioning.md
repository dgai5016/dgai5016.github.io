<BiRow>
<template #en>

The Model Context Protocol uses string-based version identifiers following the format
`YYYY-MM-DD`, to indicate the last date backwards incompatible changes were made.

</template>
<template #zh>

模型上下文协议（Model Context Protocol）使用基于字符串的版本标识符，格式为 `YYYY-MM-DD`，用以标明最后一次引入向后不兼容变更的日期。

</template>
</BiRow>

<BiRow>
<template #en>

<Info>
  The protocol version will *not* be incremented when the
  protocol is updated, as long as the changes maintain backwards compatibility. This allows
  for incremental improvements while preserving interoperability.
</Info>

</template>
<template #zh>

<Info>
  协议更新时，只要变更保持向后兼容，协议版本就*不会*递增。这样可以在保持互操作性的同时实现渐进式改进。
</Info>

</template>
</BiRow>

<BiRow>
<template #en>

## Revisions

</template>
<template #zh>

## 修订版本

</template>
</BiRow>

<BiRow>
<template #en>

Revisions may be marked as:

</template>
<template #zh>

修订版本（revision）可能被标记为：

</template>
</BiRow>

<BiRow>
<template #en>

* **Draft**: in-progress specifications, not yet ready for consumption.
* **Current**: the current protocol version, which is ready for use and may continue to
  receive backwards compatible changes.
* **Final**: past, complete specifications that will not be changed.

</template>
<template #zh>

* **草案（Draft）**：开发中的规范，尚未可供使用。
* **当前（Current）**：当前协议版本，已可供使用，并可能继续获得向后兼容的变更。
* **最终（Final）**：已完成的过往规范，不会再变更。

</template>
</BiRow>

<BiRow>
<template #en>

The **current** protocol version is [**2026-07-28**](https://modelcontextprotocol.io/specification/2026-07-28/).

</template>
<template #zh>

**当前**协议版本为 [**2026-07-28**](https://modelcontextprotocol.io/specification/2026-07-28/)。

</template>
</BiRow>

<BiRow>
<template #en>

## Feature States

</template>
<template #zh>

## 功能状态

</template>
</BiRow>

<BiRow>
<template #en>

Individual features of the specification may additionally be marked as
**Deprecated** under the
[feature lifecycle and deprecation policy](https://modelcontextprotocol.io/community/feature-lifecycle):
the feature remains part of the specification, but is scheduled for removal.
Deprecated features document a migration path (or state that none is required)
and remain in the specification for at least twelve months, or at least
ninety days under the policy's
[expedited-removal exception](https://modelcontextprotocol.io/community/feature-lifecycle#expedited-removal),
before they become eligible for removal, after which they may be **Removed**
in a future revision.

</template>
<template #zh>

规范中的单个功能还可能依据[功能生命周期与弃用政策](https://modelcontextprotocol.io/community/feature-lifecycle)被标记为**已弃用（Deprecated）**：该功能仍是规范的一部分，但已被列入移除计划。被弃用的功能会说明迁移路径（或声明无需迁移），并在规范中至少保留十二个月（若适用该政策的[加速移除例外](https://modelcontextprotocol.io/community/feature-lifecycle#expedited-removal)，则至少保留九十天）才符合移除条件，此后便可能在未来的修订版本中被**移除（Removed）**。

</template>
</BiRow>

<BiRow>
<template #en>

Features that are currently Deprecated are listed in the
[deprecated features registry](https://modelcontextprotocol.io/specification/2026-07-28/deprecated).

</template>
<template #zh>

目前已弃用的功能列于[已弃用功能注册表](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)中。

</template>
</BiRow>

<BiRow>
<template #en>

## Negotiation

</template>
<template #zh>

## 协商

</template>
</BiRow>

<BiRow>
<template #en>

Every request declares the protocol version it is using via the
`io.modelcontextprotocol/protocolVersion` key in its
[`_meta`](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta) field, and the server accepts or
rejects each request independently. On Streamable HTTP, the same value is also carried
in the
[`MCP-Protocol-Version` header](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#protocol-version-header).
Clients and servers **MAY** support multiple protocol versions simultaneously.

</template>
<template #zh>

每个请求都通过其 [`_meta`](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#meta) 字段中的 `io.modelcontextprotocol/protocolVersion` 键声明所使用的协议版本，由服务器逐个独立决定接受还是拒绝。在 Streamable HTTP 上，同一值也会通过 [`MCP-Protocol-Version` 请求头](https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http#protocol-version-header)携带。客户端和服务器**可以（MAY）**同时支持多个协议版本。

</template>
</BiRow>

<BiRow>
<template #en>

If the server does not support the requested version, it responds with an
[`UnsupportedProtocolVersionError`](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#protocol-version-negotiation)
listing the versions it does support. The client can then retry the request with a
mutually supported version, or surface an error to the user if none exists.

</template>
<template #zh>

如果服务器不支持所请求的版本，会返回 [`UnsupportedProtocolVersionError`](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#protocol-version-negotiation)，其中列出自己实际支持的版本。客户端随后可用双方都支持的版本重试请求；如果不存在这样的版本，则向用户报错。

</template>
</BiRow>

<BiRow>
<template #en>

Clients that want to select a version up front can call
[`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover), a mandatory RPC that
returns the server's supported protocol versions, capabilities, and identity in a
single request. Calling it is optional: a client is free to send any request directly
and handle a version error if one comes back.

</template>
<template #zh>

希望提前选定版本的客户端可以调用 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover)。这是一个必须实现的 RPC，能在一次请求中返回服务器支持的协议版本、能力和身份信息。是否调用它是可选的：客户端完全可以直接发送任意请求，并在收到版本错误时进行处理。

</template>
</BiRow>

<BiRow>
<template #en>

For interoperability with servers and clients that implement the
handshake-based protocol revisions (`2025-11-25` and earlier), see
[Backward Compatibility](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#backward-compatibility-with-initialization-based-versions).

</template>
<template #zh>

如需与实现基于握手的协议修订版本（`2025-11-25` 及更早版本）的服务器和客户端互操作，请参阅[向后兼容性](https://modelcontextprotocol.io/specification/2026-07-28/basic/versioning#backward-compatibility-with-initialization-based-versions)。

</template>
</BiRow>
