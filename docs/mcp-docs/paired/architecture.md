<BiRow>
<template #en>

This overview of the Model Context Protocol (MCP) discusses its [scope](#scope) and [core concepts](#concepts-of-mcp), and provides an [example](#example) demonstrating each core concept.

</template>
<template #zh>

本文概述模型上下文协议（Model Context Protocol，MCP），介绍其[范围](#scope)与[核心概念](#concepts-of-mcp)，并给出一个演示各核心概念的[示例](#example)。

</template>
</BiRow>

<BiRow>
<template #en>

Because MCP SDKs abstract away many concerns, most developers will likely find the [data layer protocol](#data-layer-protocol) section to be the most useful. It discusses how MCP servers can provide context to an AI application.

</template>
<template #zh>

由于 MCP SDK 已经封装了大量底层细节，对大多数开发者而言，最实用的可能就是[数据层协议](#data-layer-protocol)一节。该节讨论 MCP 服务器如何向 AI 应用提供上下文。

</template>
</BiRow>

<BiRow>
<template #en>

For specific implementation details, please refer to the documentation for your [language-specific SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk).

</template>
<template #zh>

具体实现细节请参阅你所用[语言对应的 SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk) 的文档。

</template>
</BiRow>

<BiRow>
<template #en>

## Scope

</template>
<template #zh>

## 范围

</template>
</BiRow>

<BiRow>
<template #en>

The Model Context Protocol includes the following projects:

</template>
<template #zh>

模型上下文协议包含以下项目：

</template>
</BiRow>

<BiRow>
<template #en>

* [MCP Specification](https://modelcontextprotocol.io/specification/latest): A specification of MCP that outlines the implementation requirements for clients and servers.
* [MCP SDKs](https://modelcontextprotocol.io/docs/2026-07-28/sdk): SDKs for different programming languages that implement MCP.
* **MCP Development Tools**: Tools for developing MCP servers and clients, including the [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
* [MCP Reference Server Implementations](https://github.com/modelcontextprotocol/servers): Reference implementations of MCP servers.

</template>
<template #zh>

* [MCP 规范](https://modelcontextprotocol.io/specification/latest)：概述客户端与服务器实现要求的 MCP 规范。
* [MCP SDK](https://modelcontextprotocol.io/docs/2026-07-28/sdk)：实现 MCP 的各编程语言 SDK。
* **MCP 开发工具**：用于开发 MCP 服务器和客户端的工具，包括 [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
* [MCP 参考服务器实现](https://github.com/modelcontextprotocol/servers)：MCP 服务器的参考实现。

</template>
</BiRow>

<BiRow>
<template #en>

> **注：**
> MCP focuses solely on the protocol for context exchange—it does not dictate
  how AI applications use LLMs or manage the provided context.

</template>
<template #zh>

> **注：**
> MCP 只关注上下文交换的协议本身——它并不规定 AI 应用如何使用 LLM，也不规定如何管理所提供的上下文。

</template>
</BiRow>

<BiRow>
<template #en>

## Concepts of MCP

</template>
<template #zh>

## MCP 的概念

</template>
</BiRow>

<BiRow>
<template #en>

### Participants

</template>
<template #zh>

### 参与者

</template>
</BiRow>

<BiRow>
<template #en>

MCP follows a client-server architecture where an MCP host — an AI application like [Claude Code](https://www.anthropic.com/claude-code) or [Claude Desktop](https://www.claude.ai/download) — establishes connections to one or more MCP servers. The MCP host accomplishes this by creating one MCP client for each MCP server. Each MCP client maintains a dedicated connection with its corresponding MCP server.

</template>
<template #zh>

MCP 采用客户端-服务器架构：MCP 宿主（MCP host）——如 [Claude Code](https://www.anthropic.com/claude-code) 或 [Claude Desktop](https://www.claude.ai/download) 这样的 AI 应用——与一个或多个 MCP 服务器建立连接。MCP 宿主通过为每个 MCP 服务器创建一个 MCP 客户端来实现这一点，每个 MCP 客户端与其对应的 MCP 服务器之间维持一条专用连接。

</template>
</BiRow>

<BiRow>
<template #en>

Local MCP servers that use the STDIO transport typically serve a single MCP client, whereas remote MCP servers that use the Streamable HTTP transport will typically serve many MCP clients.

</template>
<template #zh>

使用 STDIO（标准输入输出）传输的本地 MCP 服务器通常只服务单个 MCP 客户端，而使用 Streamable HTTP 传输的远程 MCP 服务器通常同时服务多个 MCP 客户端。

</template>
</BiRow>

<BiRow>
<template #en>

The key participants in the MCP architecture are:

</template>
<template #zh>

MCP 架构中的关键参与者如下：

</template>
</BiRow>

<BiRow>
<template #en>

* **MCP Host**: The AI application that coordinates and manages one or multiple MCP clients
* **MCP Client**: A component that maintains a connection to an MCP server and obtains context from an MCP server for the MCP host to use
* **MCP Server**: A program that provides context to MCP clients

</template>
<template #zh>

* **MCP 宿主**：协调并管理一个或多个 MCP 客户端的 AI 应用
* **MCP 客户端**：维持与 MCP 服务器的连接、并从 MCP 服务器获取上下文供 MCP 宿主使用的组件
* **MCP 服务器**：向 MCP 客户端提供上下文的程序

</template>
</BiRow>

<BiRow>
<template #en>

**For example**: Visual Studio Code acts as an MCP host. When Visual Studio Code establishes a connection to an MCP server, such as the [Sentry MCP server](https://docs.sentry.io/product/sentry-mcp/), the Visual Studio Code runtime instantiates an MCP client object that maintains the connection to the Sentry MCP server.
When Visual Studio Code subsequently connects to another MCP server, such as the [local filesystem server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem), the Visual Studio Code runtime instantiates an additional MCP client object to maintain this connection.

</template>
<template #zh>

**举例**：Visual Studio Code 就是一个 MCP 宿主。当 Visual Studio Code 连接到某个 MCP 服务器（例如 [Sentry MCP 服务器](https://docs.sentry.io/product/sentry-mcp/)）时，Visual Studio Code 运行时会实例化一个 MCP 客户端对象来维持与该 Sentry MCP 服务器的连接。
当 Visual Studio Code 随后连接另一个 MCP 服务器（例如[本地文件系统服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)）时，Visual Studio Code 运行时会再实例化一个 MCP 客户端对象来维持这条连接。

</template>
</BiRow>

<BiRow>
<template #en>

```mermaid theme={null}
graph TB
subgraph "MCP Host (AI Application)"
    Client1["MCP Client 1"]
    Client2["MCP Client 2"]
    Client3["MCP Client 3"]
    Client4["MCP Client 4"]
end

ServerA["MCP Server A - Local<br/>(e.g. Filesystem)"]
ServerB["MCP Server B - Local<br/>(e.g. Database)"]
ServerC["MCP Server C - Remote<br/>(e.g. Sentry)"]

Client1 ---|"Dedicated<br/>connection"| ServerA
Client2 ---|"Dedicated<br/>connection"| ServerB
Client3 ---|"Dedicated<br/>connection"| ServerC
Client4 ---|"Dedicated<br/>connection"| ServerC
```

</template>
<template #zh>

```mermaid theme={null}
graph TB
subgraph "MCP Host (AI Application)"
    Client1["MCP Client 1"]
    Client2["MCP Client 2"]
    Client3["MCP Client 3"]
    Client4["MCP Client 4"]
end

ServerA["MCP Server A - Local<br/>(e.g. Filesystem)"]
ServerB["MCP Server B - Local<br/>(e.g. Database)"]
ServerC["MCP Server C - Remote<br/>(e.g. Sentry)"]

Client1 ---|"Dedicated<br/>connection"| ServerA
Client2 ---|"Dedicated<br/>connection"| ServerB
Client3 ---|"Dedicated<br/>connection"| ServerC
Client4 ---|"Dedicated<br/>connection"| ServerC
```

</template>
</BiRow>

<BiRow>
<template #en>

Note that **MCP server** refers to the program that serves context data, regardless of
where it runs. MCP servers can execute locally or remotely. For example, when
Claude Desktop launches the [filesystem
server](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem),
the server runs locally on the same machine because it uses the STDIO
transport. This is commonly referred to as a "local" MCP server. The official
[Sentry MCP server](https://docs.sentry.io/product/sentry-mcp/) runs on the
Sentry platform, and uses the Streamable HTTP transport. This is commonly
referred to as a "remote" MCP server.

</template>
<template #zh>

注意，**MCP 服务器**指的是提供上下文数据的程序，与其运行位置无关。MCP 服务器既可以在本地运行，也可以在远程运行。例如，当 Claude Desktop 启动[文件系统服务器](https://github.com/modelcontextprotocol/servers/tree/main/src/filesystem)时，由于该服务器使用 STDIO 传输，它会运行在同一台机器上，这类服务器通常称为「本地」MCP 服务器。而官方的 [Sentry MCP 服务器](https://docs.sentry.io/product/sentry-mcp/)运行在 Sentry 平台上，使用 Streamable HTTP 传输，这类服务器通常称为「远程」MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

### Layers

</template>
<template #zh>

### 分层

</template>
</BiRow>

<BiRow>
<template #en>

MCP consists of two layers:

</template>
<template #zh>

MCP 由两层组成：

</template>
</BiRow>

<BiRow>
<template #en>

* **Data layer**: Defines the JSON-RPC based protocol for client-server communication, including capability and version discovery, and core primitives, such as tools, resources, prompts and notifications.
* **Transport layer**: Defines the communication mechanisms and channels that enable data exchange between clients and servers, including transport-specific connection establishment, message framing, and authorization.

</template>
<template #zh>

* **数据层（data layer）**：定义基于 JSON-RPC 的客户端-服务器通信协议，包括能力与版本的发现，以及工具、资源、提示词、通知等核心原语。
* **传输层（transport layer）**：定义使客户端与服务器之间能够交换数据的通信机制与通道，包括特定于传输的连接建立、消息帧（framing）封装与授权。

</template>
</BiRow>

<BiRow>
<template #en>

Conceptually the data layer is the inner layer, while the transport layer is the outer layer.

</template>
<template #zh>

从概念上讲，数据层是内层，传输层是外层。

</template>
</BiRow>

<BiRow>
<template #en>

#### Data layer

</template>
<template #zh>

#### 数据层

</template>
</BiRow>

<BiRow>
<template #en>

The data layer implements a [JSON-RPC 2.0](https://www.jsonrpc.org/) based exchange protocol that defines the message structure and semantics.
This layer includes:

</template>
<template #zh>

数据层实现了基于 [JSON-RPC 2.0](https://www.jsonrpc.org/) 的交换协议，定义了消息的结构与语义。
这一层包括：

</template>
</BiRow>

<BiRow>
<template #en>

* **Discovery**: Lets clients query a server's supported protocol versions, capabilities, and identity through the `server/discover` request
* **Server features**: Enables servers to provide core functionality including tools for AI actions, resources for context data, and prompts for interaction templates from and to the client
* **Client features**: Enables servers to elicit input from the user. Sampling is [deprecated](https://modelcontextprotocol.io/specification/2026-07-28/deprecated) as of protocol version `2026-07-28`.
* **Utility features**: Supports additional capabilities like notifications for real-time updates and progress tracking for long-running operations

</template>
<template #zh>

* **发现（Discovery）**：让客户端通过 `server/discover` 请求查询服务器支持的协议版本、能力与身份
* **服务器功能**：让服务器提供核心功能，包括供 AI 执行操作的工具、承载上下文数据的资源，以及用作客户端往来交互模板的提示词
* **客户端功能**：让服务器能够向用户征询输入。采样（sampling）自协议版本 `2026-07-28` 起[已弃用](https://modelcontextprotocol.io/specification/2026-07-28/deprecated)。
* **实用功能**：支持用于实时更新的通知、针对长时间运行操作的进度追踪等附加能力

</template>
</BiRow>

<BiRow>
<template #en>

#### Transport layer

</template>
<template #zh>

#### 传输层

</template>
</BiRow>

<BiRow>
<template #en>

The transport layer manages communication channels and authentication between clients and servers. It handles connection establishment, message framing, and secure communication between MCP participants.

</template>
<template #zh>

传输层管理客户端与服务器之间的通信通道和认证，负责连接建立、消息帧封装，以及 MCP 各参与方之间的安全通信。

</template>
</BiRow>

<BiRow>
<template #en>

MCP supports two transport mechanisms:

</template>
<template #zh>

MCP 支持两种传输机制：

</template>
</BiRow>

<BiRow>
<template #en>

* **Stdio transport**: Uses standard input/output streams for direct process communication between local processes on the same machine, providing optimal performance with no network overhead.
* **Streamable HTTP transport**: Uses HTTP POST for client-to-server messages with optional Server-Sent Events for streaming capabilities. This transport enables remote server communication and supports standard HTTP authentication methods including bearer tokens, API keys, and custom headers. MCP recommends using OAuth to obtain authentication tokens.

</template>
<template #zh>

* **Stdio 传输**：使用标准输入/输出流在同一台机器上的本地进程之间直接通信，性能最优且没有网络开销。
* **Streamable HTTP 传输**：客户端到服务器的消息使用 HTTP POST 发送，并可选使用 Server-Sent Events 获得流式能力。这种传输支持远程服务器通信，并支持标准 HTTP 认证方式，包括 bearer token、API key 和自定义请求头。MCP 建议使用 OAuth 获取认证令牌。

</template>
</BiRow>

<BiRow>
<template #en>

The transport layer abstracts communication details from the protocol layer, enabling the same JSON-RPC 2.0 message format across all transport mechanisms.

</template>
<template #zh>

传输层为协议层屏蔽了通信细节，使所有传输机制都能使用同一种 JSON-RPC 2.0 消息格式。

</template>
</BiRow>

<BiRow>
<template #en>

### Data Layer Protocol

</template>
<template #zh>

### 数据层协议

</template>
</BiRow>

<BiRow>
<template #en>

A core part of MCP is defining the schema and semantics between MCP clients and MCP servers. Developers will likely find the data layer — in particular, the set of [primitives](#primitives) — to be the most interesting part of MCP. It is the part of MCP that defines the ways developers can share context from MCP servers to MCP clients.

</template>
<template #zh>

MCP 的核心部分之一，是定义 MCP 客户端与 MCP 服务器之间的模式（schema）与语义。开发者很可能会觉得数据层——尤其是[原语](#primitives)这一组概念——是 MCP 最有意思的部分：它定义了开发者把上下文从 MCP 服务器共享给 MCP 客户端的方式。

</template>
</BiRow>

<BiRow>
<template #en>

MCP uses [JSON-RPC 2.0](https://www.jsonrpc.org/) as its underlying RPC protocol. Client and servers send requests to each other and respond accordingly. Notifications can be used when no response is required.

</template>
<template #zh>

MCP 使用 [JSON-RPC 2.0](https://www.jsonrpc.org/) 作为底层 RPC 协议。客户端和服务器相互发送请求并作出响应；不需要响应时可使用通知。

</template>
</BiRow>

<BiRow>
<template #en>

#### Statelessness and discovery

</template>
<template #zh>

#### 无状态与发现

</template>
</BiRow>

<BiRow>
<template #en>

MCP is a <Tooltip tip="Every request contains all the information needed to process it, so servers infer nothing from previous requests">stateless protocol</Tooltip>. Every request carries the protocol version and the <Tooltip tip="Features and operations that a client or server supports, such as tools, resources, or prompts">capabilities</Tooltip> relevant to that request in its `_meta` field, so the server can process each request on its own. Clients should also identify themselves in the same field unless configured not to. Servers advertise their supported versions and capabilities through the mandatory [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) request, which clients may send before any other request. Detailed information can be found in the [specification](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#statelessness), and the [example](#example) showcases the per-request metadata and the discovery sequence.

</template>
<template #zh>

MCP 是一种<Tooltip tip="每个请求都自带处理它所需的全部信息，服务器不会从先前的请求推断任何状态">无状态协议</Tooltip>。每个请求都在自己的 `_meta` 字段中携带协议版本以及与该请求相关的<Tooltip tip="客户端或服务器支持的功能与操作，例如工具、资源或提示词">能力</Tooltip>，因此服务器可以独立处理每个请求。除非另有配置，客户端也应在同一字段中标识自己的身份。服务器通过必须实现的 [`server/discover`](https://modelcontextprotocol.io/specification/2026-07-28/server/discover) 请求公布自己支持的版本与能力，客户端可以在发送任何其他请求之前先发送它。详细信息见[规范](https://modelcontextprotocol.io/specification/2026-07-28/basic/index#statelessness)，[示例](#example)部分则演示了逐请求的元数据与发现流程。

</template>
</BiRow>

<BiRow>
<template #en>

#### Primitives

</template>
<template #zh>

#### 原语

</template>
</BiRow>

<BiRow>
<template #en>

MCP primitives are the most important concept within MCP. They define what clients and servers can offer each other. These primitives specify the types of contextual information that can be shared with AI applications and the range of actions that can be performed.

</template>
<template #zh>

MCP 原语是 MCP 中最重要的概念。它定义了客户端与服务器能彼此提供什么，规定了可以共享给 AI 应用的上下文信息类型，以及可以执行的操作范围。

</template>
</BiRow>

<BiRow>
<template #en>

MCP defines three core primitives that *servers* can expose:

</template>
<template #zh>

MCP 定义了三种可由*服务器*暴露的核心原语：

</template>
</BiRow>

<BiRow>
<template #en>

* **Tools**: Executable functions that AI applications can invoke to perform actions (e.g., file operations, API calls, database queries)
* **Resources**: Data sources that provide contextual information to AI applications (e.g., file contents, database records, API responses)
* **Prompts**: Reusable templates that help structure interactions with language models (e.g., system prompts, few-shot examples)

</template>
<template #zh>

* **工具（Tools）**：AI 应用可以调用以执行操作的函数（例如文件操作、API 调用、数据库查询）
* **资源（Resources）**：向 AI 应用提供上下文信息的数据源（例如文件内容、数据库记录、API 响应）
* **提示词（Prompts）**：帮助组织与语言模型交互结构的可复用模板（例如系统提示词、few-shot 示例）

</template>
</BiRow>

<BiRow>
<template #en>

Each primitive type has associated methods for discovery (`*/list`), retrieval (`*/get`), and in some cases, execution (`tools/call`).
MCP clients will use the `*/list` methods to discover available primitives. For example, a client can first list all available tools (`tools/list`) and then execute them. This design allows listings to be dynamic.

</template>
<template #zh>

每种原语都有相应的方法用于发现（`*/list`）、获取（`*/get`），某些情况下还有执行（`tools/call`）。
MCP 客户端会用 `*/list` 方法发现可用的原语。例如，客户端可以先列出所有可用工具（`tools/list`），再执行它们。这种设计使列表能够动态变化。

</template>
</BiRow>

<BiRow>
<template #en>

As a concrete example, consider an MCP server that provides context about a database. It can expose tools for querying the database, a resource that contains the schema of the database, and a prompt that includes few-shot examples for interacting with the tools.

</template>
<template #zh>

举一个具体例子：假设有一个提供数据库上下文的 MCP 服务器，它可以暴露用于查询数据库的工具、包含数据库结构（schema）的资源，以及一个包含 few-shot 示例、演示如何与这些工具交互的提示词。

</template>
</BiRow>

<BiRow>
<template #en>

For more details about server primitives see [server concepts](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts).

</template>
<template #zh>

关于服务器原语的更多细节，见[服务器概念](https://modelcontextprotocol.io/docs/2026-07-28/learn/server-concepts)。

</template>
</BiRow>

<BiRow>
<template #en>

MCP also defines primitives that *clients* can expose. These primitives allow MCP server authors to build richer interactions.

</template>
<template #zh>

MCP 还定义了可由*客户端*暴露的原语。这些原语让 MCP 服务器的作者可以构建更丰富的交互。

</template>
</BiRow>

<BiRow>
<template #en>

* **Elicitation**: Allows servers to request additional information from users. This is useful when server authors want to get more information from the user, or ask for confirmation of an action. Servers request user input with the `elicitation/create` method.

</template>
<template #zh>

* **征询（Elicitation）**：允许服务器向用户请求更多信息。当服务器作者想从用户那里获取更多信息，或请求确认某个操作时，这一原语很有用。服务器通过 `elicitation/create` 方法请求用户输入。

</template>
</BiRow>

<BiRow>
<template #en>

Elicitation requests are delivered through the [Multi Round-Trip Requests](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr) pattern, explained in the [elicitation overview](https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts#elicitation).

</template>
<template #zh>

征询请求通过[多次往返请求（Multi Round-Trip Requests）](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr)模式传递，具体解释见[征询概述](https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts#elicitation)。

</template>
</BiRow>

<BiRow>
<template #en>

**Deprecated**: The following client primitives are deprecated as of protocol version `2026-07-28`.

</template>
<template #zh>

**已弃用**：以下客户端原语自协议版本 `2026-07-28` 起已弃用。

</template>
</BiRow>

<BiRow>
<template #en>

* **Sampling**: Allows servers to request language model completions from the client's AI application. This is useful when server authors want access to a language model, but want to stay model-independent and not include a language model SDK in their MCP server. Servers request completions with the `sampling/createMessage` method, also delivered through the Multi Round-Trip Requests pattern. New implementations should integrate directly with LLM provider APIs.
* **Logging**: Enables servers to send log messages to clients for debugging and monitoring purposes. New implementations should log to `stderr` (stdio transport) or use OpenTelemetry.

</template>
<template #zh>

* **采样（Sampling）**：允许服务器向客户端所在的 AI 应用请求语言模型补全。当服务器作者需要用到语言模型，又想保持模型无关、不在 MCP 服务器中内置语言模型 SDK 时，这一原语很有用。服务器通过 `sampling/createMessage` 方法请求补全，同样通过多次往返请求模式传递。新实现应直接对接 LLM 提供商的 API。
* **日志（Logging）**：让服务器能够向客户端发送日志消息，用于调试和监控。新实现应将日志输出到 `stderr`（stdio 传输）或使用 OpenTelemetry。

</template>
</BiRow>

<BiRow>
<template #en>

For more details about client primitives see [client concepts](https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts).

</template>
<template #zh>

关于客户端原语的更多细节，见[客户端概念](https://modelcontextprotocol.io/docs/2026-07-28/learn/client-concepts)。

</template>
</BiRow>

<BiRow>
<template #en>

Besides server and client primitives, the protocol supports optional [extensions](https://modelcontextprotocol.io/extensions/overview) that build on the core protocol. For example, the [Tasks extension](https://modelcontextprotocol.io/extensions/tasks/overview) lets servers return a durable handle for long-running requests, so clients can poll for status and retrieve the result later.

</template>
<template #zh>

除服务器与客户端原语外，协议还支持在核心协议之上构建的可选[扩展](https://modelcontextprotocol.io/extensions/overview)。例如，[Tasks 扩展](https://modelcontextprotocol.io/extensions/tasks/overview)让服务器为长时间运行的请求返回一个持久句柄，客户端可据此轮询状态并在稍后取回结果。

</template>
</BiRow>

<BiRow>
<template #en>

#### Notifications

</template>
<template #zh>

#### 通知

</template>
</BiRow>

<BiRow>
<template #en>

The protocol supports real-time notifications to enable dynamic updates between servers and clients. For example, when a server's available tools change (such as when new functionality becomes available or existing tools are modified), the server can send tool update notifications to inform connected clients about these changes. Notifications are sent as JSON-RPC 2.0 notification messages (without expecting a response). Change notifications are opt-in: the client opens a long-lived [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) stream naming the notification types it wants to receive, and the server delivers matching notifications on that stream.

</template>
<template #zh>

协议支持实时通知，使服务器与客户端之间能够动态更新。例如，当服务器的可用工具发生变化（如新功能上线或既有工具被修改）时，服务器可以发送工具更新通知，告知已连接的客户端这些变化。通知以 JSON-RPC 2.0 通知消息的形式发送（不期待响应）。变更通知需要客户端主动订阅：客户端打开一个长生命周期的 [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) 流，并在其中声明想接收的通知类型，服务器就在该流上投递匹配的通知。

</template>
</BiRow>

<BiRow>
<template #en>

## Example

</template>
<template #zh>

## 示例

</template>
</BiRow>

<BiRow>
<template #en>

### Data Layer

</template>
<template #zh>

### 数据层

</template>
</BiRow>

<BiRow>
<template #en>

This section provides a step-by-step walkthrough of an MCP client-server interaction, focusing on the data layer protocol. We'll demonstrate discovery, tool operations, and notifications using JSON-RPC 2.0 messages.

</template>
<template #zh>

本节逐步讲解一次 MCP 客户端-服务器交互，聚焦数据层协议。我们将用 JSON-RPC 2.0 消息演示发现、工具操作与通知。

</template>
</BiRow>

<BiRow>
<template #en>

As described in the [statelessness and discovery](#statelessness-and-discovery) section, every MCP request carries the protocol version and client capabilities in its `_meta` field, and clients should also include their identity there. A client that wants to learn what a server supports before issuing other requests sends a `server/discover` request, which every server must implement. The discovery response is typically cacheable, meaning it can be re-used so the discovery flow does not need to be performed for every request.

</template>
<template #zh>

如[无状态与发现](#statelessness-and-discovery)一节所述，每个 MCP 请求都会在其 `_meta` 字段中携带协议版本和客户端能力，客户端还应在那里附上自己的身份。客户端若想在发出其他请求之前先了解服务器的支持情况，可以发送 `server/discover` 请求——这是每个服务器都必须实现的。发现响应通常可缓存，即可以被复用，因而不必为每个请求都执行一遍发现流程。

</template>
</BiRow>

<BiRow>
<template #en>

<CodeGroup>
  ```json Discover Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "server/discover",
    "params": {
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Discover Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "resultType": "complete",
      "supportedVersions": ["2026-07-28"],
      "capabilities": {
        "tools": {
          "listChanged": true
        },
        "resources": {}
      },
      "_meta": {
        "io.modelcontextprotocol/serverInfo": {
          "name": "example-server",
          "version": "1.0.0"
        }
      },
      "ttlMs": 3600000,
      "cacheScope": "public"
    }
  }
  ```
</CodeGroup>

</template>
<template #zh>

<CodeGroup>
  ```json Discover Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "server/discover",
    "params": {
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Discover Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 1,
    "result": {
      "resultType": "complete",
      "supportedVersions": ["2026-07-28"],
      "capabilities": {
        "tools": {
          "listChanged": true
        },
        "resources": {}
      },
      "_meta": {
        "io.modelcontextprotocol/serverInfo": {
          "name": "example-server",
          "version": "1.0.0"
        }
      },
      "ttlMs": 3600000,
      "cacheScope": "public"
    }
  }
  ```
</CodeGroup>

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding the Discovery Exchange

</template>
<template #zh>

#### 理解发现交换过程

</template>
</BiRow>

<BiRow>
<template #en>

The `_meta` fields and the discovery response together serve several purposes:

</template>
<template #zh>

`_meta` 字段与发现响应共同承担几个作用：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Protocol Version Selection**: The `io.modelcontextprotocol/protocolVersion` field declares the version the client is speaking on this request, and `supportedVersions` in the response lists the versions the server accepts. If a server does not support the requested version, it rejects the request with an `UnsupportedProtocolVersionError` listing the versions it does support, and the client retries with a mutually supported version.
2. **Capability Discovery**: The client declares its capabilities in `io.modelcontextprotocol/clientCapabilities` on every request, and the server returns its own `capabilities` object from `server/discover`. This tells each party which [primitives](#primitives) the other can handle (tools, resources, prompts) and whether change [notifications](#notifications) are available, so unsupported operations are never attempted.
3. **Identity Exchange**: The `io.modelcontextprotocol/clientInfo` field in the request's `_meta` and the `io.modelcontextprotocol/serverInfo` field in the result's `_meta` provide identification and versioning information for debugging and compatibility purposes.

</template>
<template #zh>

1. **协议版本选择**：`io.modelcontextprotocol/protocolVersion` 字段声明客户端在本次请求中使用的版本，响应中的 `supportedVersions` 列出服务器接受的版本。如果服务器不支持所请求的版本，会以 `UnsupportedProtocolVersionError` 拒绝该请求并列出自己支持的版本，客户端再改用双方都支持的版本重试。
2. **能力发现**：客户端在每次请求的 `io.modelcontextprotocol/clientCapabilities` 中声明自己的能力，服务器则通过 `server/discover` 返回自己的 `capabilities` 对象。这告诉双方彼此能处理哪些[原语](#primitives)（工具、资源、提示词）、变更[通知](#notifications)是否可用，从而避免尝试不支持的操作。
3. **身份交换**：请求 `_meta` 中的 `io.modelcontextprotocol/clientInfo` 字段与结果 `_meta` 中的 `io.modelcontextprotocol/serverInfo` 字段提供标识与版本信息，用于调试和兼容性判断。

</template>
</BiRow>

<BiRow>
<template #en>

In this example, the exchange demonstrates how MCP capabilities are declared:

</template>
<template #zh>

在这个例子中，这轮交换展示了 MCP 能力是如何声明的：

</template>
</BiRow>

<BiRow>
<template #en>

**Client Capabilities**:

</template>
<template #zh>

**客户端能力**：

</template>
</BiRow>

<BiRow>
<template #en>

* `"elicitation": {}` - The client declares it can gather additional input from the user when the server requests it

</template>
<template #zh>

* `"elicitation": {}` —— 客户端声明：当服务器提出请求时，它能够从用户那里收集额外输入

</template>
</BiRow>

<BiRow>
<template #en>

**Server Capabilities**:

</template>
<template #zh>

**服务器能力**：

</template>
</BiRow>

<BiRow>
<template #en>

* `"tools": {"listChanged": true}` - The server supports the tools primitive and can honor a `toolsListChanged` filter in [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions). Clients that request this filter receive `notifications/tools/list_changed` when the tool list changes.
* `"resources": {}` - The server also supports the resources primitive (can handle `resources/list` and `resources/read` methods)

</template>
<template #zh>

* `"tools": {"listChanged": true}` —— 服务器支持工具原语，并能响应 [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) 中的 `toolsListChanged` 过滤器。请求了该过滤器的客户端会在工具列表变化时收到 `notifications/tools/list_changed`。
* `"resources": {}` —— 服务器同样支持资源原语（能处理 `resources/list` 与 `resources/read` 方法）

</template>
</BiRow>

<BiRow>
<template #en>

Calling `server/discover` is optional. Because every request carries the same `_meta` fields, a client is free to send any request directly and handle a version error if one comes back. Discovery is a convenient way to fetch the server's identity, capabilities, and supported versions in a single request.

</template>
<template #zh>

调用 `server/discover` 是可选的。由于每个请求都携带同样的 `_meta` 字段，客户端完全可以直接发送任意请求，并在返回版本错误时再作处理。发现提供了一种便捷方式：用一次请求同时获取服务器的身份、能力和支持的版本。

</template>
</BiRow>

<BiRow>
<template #en>

#### How This Works in AI Applications

</template>
<template #zh>

#### 这在 AI 应用中如何运作

</template>
</BiRow>

<BiRow>
<template #en>

The AI application's MCP client manager connects to configured servers and stores their discovered capabilities for later use. The application uses this information to determine which servers can provide specific types of functionality (tools, resources, prompts) and whether they support real-time updates. In the Python SDK, discovery happens while the client connects. The results are then available on the client object.

</template>
<template #zh>

AI 应用的 MCP 客户端管理器连接配置好的服务器，并保存发现到的能力供后续使用。应用据此判断哪些服务器能提供特定类型的功能（工具、资源、提示词）以及是否支持实时更新。在 Python SDK 中，发现发生在客户端连接的过程中，结果随后可从客户端对象上获取。

</template>
</BiRow>

<BiRow>
<template #en>

```python Pseudo-code for AI application discovery theme={null}
# Pseudo Code
async with Client(stdio_client(server_config)) as client:
    if client.server_capabilities.tools:
        app.register_mcp_server(client, supports_tools=True)
    app.set_server_ready(client)
```

</template>
<template #zh>

```python Pseudo-code for AI application discovery theme={null}
# Pseudo Code
async with Client(stdio_client(server_config)) as client:
    if client.server_capabilities.tools:
        app.register_mcp_server(client, supports_tools=True)
    app.set_server_ready(client)
```

</template>
</BiRow>

<BiRow>
<template #en>

The client can discover available tools by sending a `tools/list` request. This request is fundamental to MCP's tool discovery mechanism: it allows clients to understand what tools are available on the server before attempting to use them.

</template>
<template #zh>

客户端可以通过发送 `tools/list` 请求来发现可用工具。这个请求是 MCP 工具发现机制的基础：它让客户端在使用工具之前，先了解服务器上有哪些工具可用。

</template>
</BiRow>

<BiRow>
<template #en>

<CodeGroup>
  ```json Tools List Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list",
    "params": {
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Tools List Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
      "resultType": "complete",
      "tools": [
        {
          "name": "calculator_arithmetic",
          "title": "Calculator",
          "description": "Perform mathematical calculations including basic arithmetic, trigonometric functions, and algebraic operations",
          "inputSchema": {
            "type": "object",
            "properties": {
              "expression": {
                "type": "string",
                "description": "Mathematical expression to evaluate (e.g., '2 + 3 * 4', 'sin(30)', 'sqrt(16)')"
              }
            },
            "required": ["expression"]
          }
        },
        {
          "name": "weather_current",
          "title": "Weather Information",
          "description": "Get current weather information for any location worldwide",
          "inputSchema": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "City name, address, or coordinates (latitude,longitude)"
              },
              "units": {
                "type": "string",
                "enum": ["metric", "imperial", "kelvin"],
                "description": "Temperature units to use in response",
                "default": "metric"
              }
            },
            "required": ["location"]
          }
        }
      ],
      "ttlMs": 300000,
      "cacheScope": "public"
    }
  }
  ```
</CodeGroup>

</template>
<template #zh>

<CodeGroup>
  ```json Tools List Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/list",
    "params": {
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Tools List Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 2,
    "result": {
      "resultType": "complete",
      "tools": [
        {
          "name": "calculator_arithmetic",
          "title": "Calculator",
          "description": "Perform mathematical calculations including basic arithmetic, trigonometric functions, and algebraic operations",
          "inputSchema": {
            "type": "object",
            "properties": {
              "expression": {
                "type": "string",
                "description": "Mathematical expression to evaluate (e.g., '2 + 3 * 4', 'sin(30)', 'sqrt(16)')"
              }
            },
            "required": ["expression"]
          }
        },
        {
          "name": "weather_current",
          "title": "Weather Information",
          "description": "Get current weather information for any location worldwide",
          "inputSchema": {
            "type": "object",
            "properties": {
              "location": {
                "type": "string",
                "description": "City name, address, or coordinates (latitude,longitude)"
              },
              "units": {
                "type": "string",
                "enum": ["metric", "imperial", "kelvin"],
                "description": "Temperature units to use in response",
                "default": "metric"
              }
            },
            "required": ["location"]
          }
        }
      ],
      "ttlMs": 300000,
      "cacheScope": "public"
    }
  }
  ```
</CodeGroup>

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding the Tool Discovery Request

</template>
<template #zh>

#### 理解工具发现请求

</template>
</BiRow>

<BiRow>
<template #en>

The `tools/list` request requires no parameters beyond the standard `_meta` fields that accompany every MCP request. It also accepts an optional `cursor` parameter for [pagination](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination), which the example above omits.

</template>
<template #zh>

`tools/list` 请求除每个 MCP 请求都会携带的标准 `_meta` 字段外，不需要任何其他参数。它还可接受一个可选的 `cursor` 参数用于[分页](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/pagination)，上面的示例省略了该参数。

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding the Tool Discovery Response

</template>
<template #zh>

#### 理解工具发现响应

</template>
</BiRow>

<BiRow>
<template #en>

The response contains a `tools` array that provides comprehensive metadata about each available tool. This array-based structure allows servers to expose multiple tools simultaneously while maintaining clear boundaries between different functionalities.

</template>
<template #zh>

响应中包含一个 `tools` 数组，提供每个可用工具的完整元数据。这种基于数组的结构让服务器能同时暴露多个工具，同时在不同功能之间保持清晰边界。

</template>
</BiRow>

<BiRow>
<template #en>

Each tool object in the response includes several key fields:

</template>
<template #zh>

响应中的每个工具对象都包含几个关键字段：

</template>
</BiRow>

<BiRow>
<template #en>

* **`name`**: A unique identifier for the tool within the server's namespace. This serves as the primary key for tool execution and should follow a clear naming pattern (e.g., `calculator_arithmetic` rather than just `calculate`)
* **`title`**: A human-readable display name for the tool that clients can show to users
* **`description`**: Detailed explanation of what the tool does and when to use it
* **`inputSchema`**: A JSON Schema that defines the expected input parameters, enabling type validation and providing clear documentation about required and optional parameters

</template>
<template #zh>

* **`name`**：工具在服务器命名空间内的唯一标识，是工具执行时的主键，应遵循清晰的命名模式（例如 `calculator_arithmetic`，而不只是 `calculate`）
* **`title`**：人类可读的工具显示名称，客户端可以将其展示给用户
* **`description`**：对工具做什么、何时使用的详细说明
* **`inputSchema`**：定义预期输入参数的 JSON Schema，用于类型校验，并清晰说明哪些参数必填、哪些可选

</template>
</BiRow>

<BiRow>
<template #en>

The result is marked `"resultType": "complete"` and carries two caching fields. `ttlMs` is a freshness hint in milliseconds, so this tool list can be cached for five minutes. `cacheScope` indicates who may reuse the response. The specification's [caching utility](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching) defines the full rules.

</template>
<template #zh>

结果标记为 `"resultType": "complete"`，并携带两个缓存字段。`ttlMs` 是以毫秒为单位的新鲜度提示，因此这份工具列表可以缓存五分钟。`cacheScope` 指明谁可以复用该响应。完整规则由规范中的[缓存实用功能](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching)定义。

</template>
</BiRow>

<BiRow>
<template #en>

#### How This Works in AI Applications

</template>
<template #zh>

#### 这在 AI 应用中如何运作

</template>
</BiRow>

<BiRow>
<template #en>

The AI application fetches available tools from all connected MCP servers and combines them into a unified tool registry that the language model can access. This allows the LLM to understand what actions it can perform and automatically generates the appropriate tool calls during conversations.

</template>
<template #zh>

AI 应用从所有已连接的 MCP 服务器拉取可用工具，并把它们合并成一个语言模型可以访问的统一工具注册表。这让 LLM 知道自己能执行哪些操作，并在对话过程中自动生成相应的工具调用。

</template>
</BiRow>

<BiRow>
<template #en>

```python Pseudo-code for AI application tool discovery theme={null}
# Pseudo-code using MCP Python SDK patterns
available_tools = []
for client in app.mcp_clients():
    tools_response = await client.list_tools()
    available_tools.extend(tools_response.tools)
conversation.register_available_tools(available_tools)
```

</template>
<template #zh>

```python Pseudo-code for AI application tool discovery theme={null}
# Pseudo-code using MCP Python SDK patterns
available_tools = []
for client in app.mcp_clients():
    tools_response = await client.list_tools()
    available_tools.extend(tools_response.tools)
conversation.register_available_tools(available_tools)
```

</template>
</BiRow>

<BiRow>
<template #en>

Clients that federate many servers can use [progressive tool discovery](https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices#progressive-tool-discovery) rather than loading every tool upfront.

</template>
<template #zh>

聚合大量服务器的客户端可以使用[渐进式工具发现](https://modelcontextprotocol.io/docs/2026-07-28/develop/clients/client-best-practices#progressive-tool-discovery)，而不必一开始就加载全部工具。

</template>
</BiRow>

<BiRow>
<template #en>

The client can now execute a tool using the `tools/call` method. This demonstrates how MCP primitives are used in practice: after discovering available tools, the client can invoke them with appropriate arguments.

</template>
<template #zh>

现在，客户端可以使用 `tools/call` 方法执行工具了。这演示了 MCP 原语在实践中的用法：发现可用工具之后，客户端就能带上合适的参数调用它们。

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding the Tool Execution Request

</template>
<template #zh>

#### 理解工具执行请求

</template>
</BiRow>

<BiRow>
<template #en>

The `tools/call` request follows a structured format that ensures type safety and clear communication between client and server. Note that we're using the proper tool name from the discovery response (`weather_current`) rather than a simplified name:

</template>
<template #zh>

`tools/call` 请求遵循结构化格式，确保类型安全以及客户端与服务器之间的清晰通信。注意，这里用的是发现响应中正确的工具名（`weather_current`），而不是简化名称：

</template>
</BiRow>

<BiRow>
<template #en>

<CodeGroup>
  ```json Tool Call Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "weather_current",
      "arguments": {
        "location": "San Francisco",
        "units": "imperial"
      },
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Tool Call Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
      "resultType": "complete",
      "content": [
        {
          "type": "text",
          "text": "Current weather in San Francisco: 68°F, partly cloudy with light winds from the west at 8 mph. Humidity: 65%"
        }
      ]
    }
  }
  ```
</CodeGroup>

</template>
<template #zh>

<CodeGroup>
  ```json Tool Call Request theme={null}
  {
    "jsonrpc": "2.0",
    "id": 3,
    "method": "tools/call",
    "params": {
      "name": "weather_current",
      "arguments": {
        "location": "San Francisco",
        "units": "imperial"
      },
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientInfo": {
          "name": "example-client",
          "version": "1.0.0"
        },
        "io.modelcontextprotocol/clientCapabilities": {
          "elicitation": {}
        }
      }
    }
  }
  ```

  ```json Tool Call Response theme={null}
  {
    "jsonrpc": "2.0",
    "id": 3,
    "result": {
      "resultType": "complete",
      "content": [
        {
          "type": "text",
          "text": "Current weather in San Francisco: 68°F, partly cloudy with light winds from the west at 8 mph. Humidity: 65%"
        }
      ]
    }
  }
  ```
</CodeGroup>

</template>
</BiRow>

<BiRow>
<template #en>

#### Key Elements of Tool Execution

</template>
<template #zh>

#### 工具执行的关键要素

</template>
</BiRow>

<BiRow>
<template #en>

The request structure includes several important components:

</template>
<template #zh>

请求结构包含几个重要组成部分：

</template>
</BiRow>

<BiRow>
<template #en>

1. **`name`**: Must match exactly the tool name from the discovery response (`weather_current`). This ensures the server can correctly identify which tool to execute.
2. **`arguments`**: Contains the input parameters as defined by the tool's `inputSchema`. In this example:
   * `location`: "San Francisco" (required parameter)
   * `units`: "imperial" (optional parameter, defaults to "metric" if not specified)
3. **`_meta`**: Carries the standard per-request fields: the protocol version and client capabilities that every MCP request must include, plus the client's identity, which clients should include unless configured not to.
4. **JSON-RPC Structure**: Uses standard JSON-RPC 2.0 format with unique `id` for request-response correlation.

</template>
<template #zh>

1. **`name`**：必须与发现响应中的工具名（`weather_current`）完全一致，以确保服务器能正确识别要执行的工具。
2. **`arguments`**：包含由工具 `inputSchema` 定义的输入参数。本例中：
   * `location`："San Francisco"（必填参数）
   * `units`："imperial"（可选参数，未指定时默认为 "metric"）
3. **`_meta`**：携带标准的逐请求字段：每个 MCP 请求都必须包含的协议版本与客户端能力，外加客户端身份（除非另有配置，客户端都应附上）。
4. **JSON-RPC 结构**：使用标准 JSON-RPC 2.0 格式，以唯一的 `id` 关联请求与响应。

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding the Tool Execution Response

</template>
<template #zh>

#### 理解工具执行响应

</template>
</BiRow>

<BiRow>
<template #en>

The response demonstrates MCP's flexible content system:

</template>
<template #zh>

响应展示了 MCP 灵活的内容系统：

</template>
</BiRow>

<BiRow>
<template #en>

1. **`content` Array**: Tool responses return an array of content objects, allowing for rich, multi-format responses (text, images, resources, etc.)
2. **Content Types**: Each content object has a `type` field. In this example, `"type": "text"` indicates plain text content, but MCP supports various content types for different use cases.
3. **Structured Output**: The response provides actionable information that the AI application can use as context for language model interactions.

</template>
<template #zh>

1. **`content` 数组**：工具响应返回内容对象数组，支持文本、图像、资源等多种格式的丰富响应
2. **内容类型**：每个内容对象都有一个 `type` 字段。本例中 `"type": "text"` 表示纯文本内容，但 MCP 针对不同场景支持多种内容类型。
3. **结构化输出**：响应提供的是可据此采取行动的信息，AI 应用可将其用作与语言模型交互的上下文。

</template>
</BiRow>

<BiRow>
<template #en>

This execution pattern allows AI applications to dynamically invoke server functionality and receive structured responses that can be integrated into conversations with language models.

</template>
<template #zh>

这种执行模式让 AI 应用能够动态调用服务器功能，并接收可融入与语言模型对话的结构化响应。

</template>
</BiRow>

<BiRow>
<template #en>

#### How This Works in AI Applications

</template>
<template #zh>

#### 这在 AI 应用中如何运作

</template>
</BiRow>

<BiRow>
<template #en>

When the language model decides to use a tool during a conversation, the AI application intercepts the tool call, routes it to the appropriate MCP server, executes it, and returns the results back to the LLM as part of the conversation flow. This enables the LLM to access real-time data and perform actions in the external world.

</template>
<template #zh>

当语言模型在对话中决定使用某个工具时，AI 应用会拦截该工具调用，把它路由到对应的 MCP 服务器执行，然后把结果作为对话流程的一部分返回给 LLM。这使 LLM 能够访问实时数据，并在外部世界中执行操作。

</template>
</BiRow>

<BiRow>
<template #en>

```python theme={null}
# Pseudo-code for AI application tool execution
async def handle_tool_call(conversation, tool_name, arguments):
    client = app.find_mcp_client_for_tool(tool_name)
    result = await client.call_tool(tool_name, arguments)
    conversation.add_tool_result(result.content)
```

</template>
<template #zh>

```python theme={null}
# Pseudo-code for AI application tool execution
async def handle_tool_call(conversation, tool_name, arguments):
    client = app.find_mcp_client_for_tool(tool_name)
    result = await client.call_tool(tool_name, arguments)
    conversation.add_tool_result(result.content)
```

</template>
</BiRow>

<BiRow>
<template #en>

MCP supports real-time notifications that enable servers to inform clients about changes without being polled for them. This demonstrates the notification system, a key feature that keeps clients synchronized and responsive.

</template>
<template #zh>

MCP 支持实时通知，让服务器无需被轮询就能把变化告知客户端。这一部分演示通知系统——它是保持客户端同步与响应能力的关键特性。

</template>
</BiRow>

<BiRow>
<template #en>

#### Subscribing to Changes

</template>
<template #zh>

#### 订阅变更

</template>
</BiRow>

<BiRow>
<template #en>

Change notifications are opt-in. To receive them, the client opens a long-lived notification stream by sending a [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) request with a `notifications` filter naming the event types it wants. Here the client asks for tool list changes:

</template>
<template #zh>

变更通知需要主动订阅。为了接收通知，客户端发送 [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) 请求打开一条长生命周期的通知流，并在请求的 `notifications` 过滤器中声明想要的事件类型。这里客户端订阅的是工具列表变化：

</template>
</BiRow>

<BiRow>
<template #en>

```json Listen Request theme={null}
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "subscriptions/listen",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {
        "elicitation": {}
      }
    },
    "notifications": {
      "toolsListChanged": true
    }
  }
}
```

</template>
<template #zh>

```json Listen Request theme={null}
{
  "jsonrpc": "2.0",
  "id": 4,
  "method": "subscriptions/listen",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {
        "elicitation": {}
      }
    },
    "notifications": {
      "toolsListChanged": true
    }
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Every client request carries the `io.modelcontextprotocol/protocolVersion` and `io.modelcontextprotocol/clientCapabilities` fields in `_meta`, and normally `io.modelcontextprotocol/clientInfo` as well, so the server can identify the client without relying on connection state.

</template>
<template #zh>

每个客户端请求都会在 `_meta` 中携带 `io.modelcontextprotocol/protocolVersion` 与 `io.modelcontextprotocol/clientCapabilities` 字段，通常还有 `io.modelcontextprotocol/clientInfo`，这样服务器无需依赖连接状态就能识别客户端。

</template>
</BiRow>

<BiRow>
<template #en>

The server acknowledges the subscription with `notifications/subscriptions/acknowledged`, which is the first message carrying that subscription's ID in `_meta` (the server sends no other notification for that subscription before it). Its `notifications` field reflects the subset of the requested filter the server agreed to honor, with unsupported notification types omitted:

</template>
<template #zh>

服务器以 `notifications/subscriptions/acknowledged` 确认订阅。这是第一条在 `_meta` 中携带该订阅 ID 的消息（在此之前，服务器不会为该订阅发送任何其他通知）。它的 `notifications` 字段反映服务器同意履行的所请求过滤器的子集，不支持的通知类型会被省略：

</template>
</BiRow>

<BiRow>
<template #en>

```json Acknowledgment theme={null}
{
  "jsonrpc": "2.0",
  "method": "notifications/subscriptions/acknowledged",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 4
    },
    "notifications": {
      "toolsListChanged": true
    }
  }
}
```

</template>
<template #zh>

```json Acknowledgment theme={null}
{
  "jsonrpc": "2.0",
  "method": "notifications/subscriptions/acknowledged",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 4
    },
    "notifications": {
      "toolsListChanged": true
    }
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Understanding Tool List Change Notifications

</template>
<template #zh>

#### 理解工具列表变更通知

</template>
</BiRow>

<BiRow>
<template #en>

After the acknowledgment, when the server's available tools change (for example, when new functionality becomes available, existing tools are modified, or tools become temporarily unavailable), the server delivers a notification on that stream:

</template>
<template #zh>

确认之后，当服务器的可用工具发生变化（例如新功能上线、既有工具被修改，或工具暂时不可用）时，服务器会在该流上投递一条通知：

</template>
</BiRow>

<BiRow>
<template #en>

```json Notification theme={null}
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 4
    }
  }
}
```

</template>
<template #zh>

```json Notification theme={null}
{
  "jsonrpc": "2.0",
  "method": "notifications/tools/list_changed",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/subscriptionId": 4
    }
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Key Features of MCP Notifications

</template>
<template #zh>

#### MCP 通知的关键特性

</template>
</BiRow>

<BiRow>
<template #en>

1. **No Response Required**: Notice there's no `id` field in the notification. This follows JSON-RPC 2.0 notification semantics where no response is expected or sent.
2. **Opt-In Based**: This notification is only sent to clients that requested `"toolsListChanged": true` in their `subscriptions/listen` filter, and it is only available from servers that declared `"listChanged": true` in their tools capability (as shown in Step 1).
3. **Subscription-ID Tagging**: Every notification on the stream carries `io.modelcontextprotocol/subscriptionId` in `_meta`. The value is the JSON-RPC ID of the `subscriptions/listen` request that opened the stream (`4` in this example), so clients can correlate each notification with the subscription that produced it.
4. **Event-Driven**: The server decides when to send notifications based on internal state changes, making MCP connections dynamic and responsive.
5. **Best Effort**: There are no guarantees that every notification will be sent or received, particularly across transport reconnects. Clients should also rely on polling to preserve freshness of results.

</template>
<template #zh>

1. **无需响应**：注意，通知中没有 `id` 字段。这遵循 JSON-RPC 2.0 的通知语义——既不期待响应，也不会发送响应。
2. **基于主动订阅**：该通知只会发送给在 `subscriptions/listen` 过滤器中请求了 `"toolsListChanged": true` 的客户端，并且只有在其工具能力中声明了 `"listChanged": true` 的服务器才能提供（如第 1 步所示）。
3. **订阅 ID 标记**：流上的每条通知都在 `_meta` 中携带 `io.modelcontextprotocol/subscriptionId`。它的值是打开该流的 `subscriptions/listen` 请求的 JSON-RPC ID（本例中为 `4`），客户端据此把每条通知与产生它的订阅关联起来。
4. **事件驱动**：服务器根据内部状态变化决定何时发送通知，使 MCP 连接具备动态性和响应能力。
5. **尽力而为**：不保证每条通知都会被发送或收到，跨越传输重连时尤其如此。客户端还应借助轮询来保持结果的新鲜度。

</template>
</BiRow>

<BiRow>
<template #en>

#### Client Response to Notifications

</template>
<template #zh>

#### 客户端对通知的响应

</template>
</BiRow>

<BiRow>
<template #en>

Upon receiving this notification, the client typically reacts by requesting the updated tool list. This creates a refresh cycle that keeps the client's understanding of available tools current:

</template>
<template #zh>

收到这条通知后，客户端通常会重新请求更新后的工具列表。由此形成一个刷新循环，使客户端对可用工具的认知保持最新：

</template>
</BiRow>

<BiRow>
<template #en>

```json Request theme={null}
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/list",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {
        "elicitation": {}
      }
    }
  }
}
```

</template>
<template #zh>

```json Request theme={null}
{
  "jsonrpc": "2.0",
  "id": 5,
  "method": "tools/list",
  "params": {
    "_meta": {
      "io.modelcontextprotocol/protocolVersion": "2026-07-28",
      "io.modelcontextprotocol/clientInfo": {
        "name": "example-client",
        "version": "1.0.0"
      },
      "io.modelcontextprotocol/clientCapabilities": {
        "elicitation": {}
      }
    }
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Why Notifications Matter

</template>
<template #zh>

#### 通知为何重要

</template>
</BiRow>

<BiRow>
<template #en>

This notification system is crucial for several reasons:

</template>
<template #zh>

通知系统之所以重要，原因有几点：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Dynamic Environments**: Tools may come and go based on server state, external dependencies, or user permissions
2. **Efficiency**: Clients don't need to poll for changes; they're notified when updates occur
3. **Consistency**: Ensures clients always have accurate information about available server capabilities
4. **Real-time Collaboration**: Enables responsive AI applications that can adapt to changing contexts

</template>
<template #zh>

1. **动态环境**：工具可能随服务器状态、外部依赖或用户权限的变化而出现或消失
2. **效率**：客户端无需轮询变化，更新发生时会收到通知
3. **一致性**：确保客户端始终掌握关于服务器可用能力的准确信息
4. **实时协作**：让 AI 应用具备响应能力，能够适应不断变化的上下文

</template>
</BiRow>

<BiRow>
<template #en>

This notification pattern extends beyond tools to other MCP primitives, enabling comprehensive real-time synchronization between clients and servers.

</template>
<template #zh>

这一通知模式并不限于工具，也适用于其他 MCP 原语，从而在客户端与服务器之间实现全面的实时同步。

</template>
</BiRow>

<BiRow>
<template #en>

#### How This Works in AI Applications

</template>
<template #zh>

#### 这在 AI 应用中如何运作

</template>
</BiRow>

<BiRow>
<template #en>

The AI application keeps a notification stream open for the changes it cares about. When one arrives, it immediately refreshes its tool registry and updates the LLM's available capabilities. This ensures that ongoing conversations always have access to the most current set of tools, and the LLM can dynamically adapt to new functionality as it becomes available.

</template>
<template #zh>

AI 应用会为自己关心的变更保持一条打开的通知流。通知一到，它就立即刷新工具注册表，并更新 LLM 可用的能力。这确保进行中的对话始终能用上最新的工具集合，LLM 也能随新功能的上线动态适应。

</template>
</BiRow>

<BiRow>
<template #en>

```python theme={null}
# Pseudo-code for AI application notification handling
async def follow_tool_changes(client):
    async with client.listen(tools_list_changed=True) as sub:
        async for _event in sub:
            tools_response = await client.list_tools()
            app.update_available_tools(client, tools_response.tools)
            if app.conversation.is_active():
                app.conversation.notify_llm_of_new_capabilities()
```

</template>
<template #zh>

```python theme={null}
# Pseudo-code for AI application notification handling
async def follow_tool_changes(client):
    async with client.listen(tools_list_changed=True) as sub:
        async for _event in sub:
            tools_response = await client.list_tools()
            app.update_available_tools(client, tools_response.tools)
            if app.conversation.is_active():
                app.conversation.notify_llm_of_new_capabilities()
```

</template>
</BiRow>
