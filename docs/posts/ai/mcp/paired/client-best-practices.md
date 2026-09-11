<BiRow>
<template #en>

> Patterns for scaling MCP host applications across many servers and tools.

</template>
<template #zh>

> 让 MCP 宿主应用在接入大量服务器与工具时依然可扩展的一系列模式。

</template>
</BiRow>

<BiRow>
<template #en>

As MCP host applications, such as agents, connect to more MCP servers and accumulate access to hundreds or thousands of tools, naive approaches to tool management break down. Loading every tool definition into the model's context window upfront wastes tokens, increases latency, and degrades model performance. Passing large intermediate results through the model between sequential tool calls compounds the problem.

</template>
<template #zh>

随着智能体（agent）等 MCP 宿主应用连接越来越多的 MCP 服务器、可访问的工具累积到成百上千个，朴素的工具管理方式就会失效。一开始就把全部工具定义装进模型的上下文窗口，会浪费 token、增加延迟，还会拉低模型性能。若再让大型中间结果在连续的工具调用之间经由模型传递，问题会进一步加剧。

</template>
</BiRow>

<BiRow>
<template #en>

Two patterns address these challenges: **progressive discovery**, which controls *when* tool definitions enter context, and **programmatic tool calling**, which controls *how* tools are invoked.

</template>
<template #zh>

有两种模式可以应对这些挑战：**渐进式发现（progressive discovery）**控制工具定义*何时*进入上下文，**程序化工具调用（programmatic tool calling）**控制工具*如何*被调用。

</template>
</BiRow>

<BiRow>
<template #en>

## Progressive Tool Discovery

</template>
<template #zh>

## 渐进式工具发现

</template>
</BiRow>

<BiRow>
<template #en>

Naive MCP host implementations pass the tool definitions of every connected server directly to the model at the start of each conversation. For a handful of tools, this is perfectly reasonable. But when a host has access to dozens of servers exposing hundreds of tools, those definitions alone can consume the majority of the context window before the model has even read the user's message.

</template>
<template #zh>

朴素的 MCP 宿主实现会在每次对话开始时，把所有已连接服务器的工具定义直接交给模型。工具只有寥寥几个时，这样做完全合理；但当宿主接入数十个服务器、面对数百个工具时，光是这些定义就可能占掉上下文窗口的大部分——而此时模型甚至还没读到用户的消息。

</template>
</BiRow>

<BiRow>
<template #en>

<img src="https://mintcdn.com/mcp/JXfd5cBmEUh_qPUI/images/progressive-discovery.svg?fit=max&auto=format&n=JXfd5cBmEUh_qPUI&q=85&s=db39f47006107f04af43b5eeae2d6022" alt="Comparison of loading all tools upfront versus discovering tools on demand. The upfront approach consumes ~150,000 tokens on definitions alone, while progressive discovery uses ~2,000 tokens by loading only what the task requires." width="760" height="440" data-path="images/progressive-discovery.svg" />

</template>
<template #zh>

<img src="https://mintcdn.com/mcp/JXfd5cBmEUh_qPUI/images/progressive-discovery.svg?fit=max&auto=format&n=JXfd5cBmEUh_qPUI&q=85&s=db39f47006107f04af43b5eeae2d6022" alt="Comparison of loading all tools upfront versus discovering tools on demand. The upfront approach consumes ~150,000 tokens on definitions alone, while progressive discovery uses ~2,000 tokens by loading only what the task requires." width="760" height="440" data-path="images/progressive-discovery.svg" />

</template>
</BiRow>

<BiRow>
<template #en>

Progressive discovery avoids this:

</template>
<template #zh>

渐进式发现规避了这一问题：

</template>
</BiRow>

<BiRow>
<template #en>

* The host fetches tool definitions via `tools/list` as normal, but defers injecting them into the model's context.
* The host provides a lightweight `search_tools` meta-tool to the model.
* The host loads full definitions into context only as needed.

</template>
<template #zh>

* 宿主照常通过 `tools/list` 获取工具定义，但延迟注入模型的上下文。
* 宿主向模型提供一个轻量级的 `search_tools` 元工具（meta-tool）。
* 宿主只在需要时才把完整定义装进上下文。

</template>
</BiRow>

<BiRow>
<template #en>

### When to Use Progressive Discovery

</template>
<template #zh>

### 何时使用渐进式发现

</template>
</BiRow>

<BiRow>
<template #en>

Progressive discovery is best used when tool definitions take large parts of the context window. For a small
set of tools with tool definitions taking up a small part of the context window, loading all tools is fine.
Once the tool definitions take up a significant part of the available context window, clients should switch to progressive discovery. We recommend that clients implement thresholds to determine when to switch:

</template>
<template #zh>

渐进式发现最适合用在工具定义占用上下文窗口很大一部分的场景。如果工具集很小、工具定义只占上下文窗口的一小部分，加载全部工具完全没问题。一旦工具定义占掉可用上下文窗口的相当大一部分，客户端就应切换到渐进式发现。我们建议客户端通过设置阈值来判断何时切换：

</template>
</BiRow>

<BiRow>
<template #en>

* Implement a threshold as a percentage of the context window. For example, 1%-5%.
* Load tool definitions. Once the threshold is reached, switch to progressive discovery.

</template>
<template #zh>

* 按上下文窗口的百分比设定阈值，例如 1%-5%。
* 加载工具定义；一旦达到阈值，就切换到渐进式发现。

</template>
</BiRow>

<BiRow>
<template #en>

### Choosing a Discovery Strategy

</template>
<template #zh>

### 选择发现策略

</template>
</BiRow>

<BiRow>
<template #en>

Once the model invokes the `search_tools` tool, we need to choose a search strategy:

</template>
<template #zh>

模型调用 `search_tools` 工具后，就需要选定一种搜索策略：

</template>
</BiRow>

<BiRow>
<template #en>

* **Keyword-based**: Keyword matching (BM25, regex). Simple and effective, particularly for descriptive tool names and descriptions.
* **Embedding-based**: Vector-similarity retrieval over tool descriptions. Handles synonyms and semantic matching better.
* **Subagent-based**: A secondary model, often a small and fast model such as Claude Haiku or Gemini Flash, selects tools for the task. This usually works very well but can be more costly than embedding-based or keyword-based solutions.
* **Hybrid**: Combine approaches. For example, by scoring across keyword and embedding rankings, or choosing
  different strategies depending on use-case or query.

</template>
<template #zh>

* **基于关键词**：关键词匹配（BM25、正则表达式）。简单有效，尤其适合描述性强的工具名和工具描述。
* **基于嵌入（embedding）**：对工具描述做向量相似度检索。能更好地处理同义词与语义匹配。
* **基于子智能体**：由辅助模型（通常是 Claude Haiku 或 Gemini Flash 这类小而快的模型）为任务挑选工具。通常效果很好，但成本可能高于基于嵌入或基于关键词的方案。
* **混合式**：组合多种方法。例如对关键词排序与嵌入排序综合打分，或根据用例或查询选择不同策略。

</template>
</BiRow>

<BiRow>
<template #en>

Some model providers already offer built-in tool search. For example, [OpenAI](https://developers.openai.com/api/docs/guides/tools-tool-search) and [Anthropic](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) support this natively; check your provider's documentation for an equivalent. When available, you may prefer the platform's tool search over a custom implementation. Build your own when the provider doesn't offer one or when you need specialized retrieval logic (e.g., domain-specific ranking or access-control filtering).

</template>
<template #zh>

一些模型提供商已经内置了工具搜索。例如 [OpenAI](https://developers.openai.com/api/docs/guides/tools-tool-search) 和 [Anthropic](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) 就原生支持；可查阅你的提供商文档，确认是否有等价功能。如果平台已提供，可优先于自定义实现。当提供商没有提供，或你需要特殊的检索逻辑（例如面向特定领域的排序、访问控制过滤）时，再自行构建。

</template>
</BiRow>

<BiRow>
<template #en>

The three-layer pattern below illustrates a custom search-based approach in detail, but the layered principle (catalog, inspect, execute) applies regardless of retrieval mechanism.

</template>
<template #zh>

下文的三层模式详细展示了一种基于搜索的自定义方案，但（目录、检视、执行）这一分层原则与检索机制无关，普遍适用。

</template>
</BiRow>

<BiRow>
<template #en>

### Using Progressive Discovery

</template>
<template #zh>

### 使用渐进式发现

</template>
</BiRow>

<BiRow>
<template #en>

One common implementation for progressive discovery uses a search-based three-layer approach:

</template>
<template #zh>

渐进式发现的一种常见实现采用基于搜索的三层方法：

</template>
</BiRow>

<BiRow>
<template #en>

**Layer 1: Catalog.** The host exposes a small set of meta-tools for searching available capabilities. A `search_tools` tool accepts a natural-language query and returns matching tool names with brief descriptions.

</template>
<template #zh>

**第 1 层：目录（Catalog）。** 宿主暴露少量用于搜索可用能力的元工具。`search_tools` 工具接受自然语言查询，返回匹配的工具名称及简要描述。

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// The model calls a lightweight search tool
search_tools({ query: "update salesforce record" })

// Returns concise matches: names and one-line descriptions only
→ [
{ name: "salesforce_updateRecord", description: "Update fields on a Salesforce object" },
{ name: "salesforce_upsertRecord", description: "Insert or update based on external ID" }
  ]
```

</template>
<template #zh>

```typescript
// The model calls a lightweight search tool
search_tools({ query: "update salesforce record" })

// Returns concise matches: names and one-line descriptions only
→ [
{ name: "salesforce_updateRecord", description: "Update fields on a Salesforce object" },
{ name: "salesforce_upsertRecord", description: "Insert or update based on external ID" }
  ]
```

</template>
</BiRow>

<BiRow>
<template #en>

**Layer 2: Inspect.** Once the model identifies a candidate, it fetches the full definition (input schema, output schema, documentation) for that tool only.

</template>
<template #zh>

**第 2 层：检视（Inspect）。** 模型确定候选工具后，只获取该工具的完整定义（输入 schema、输出 schema、文档）。

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// The model inspects only the tool it needs
get_tool_details({ name: "salesforce_updateRecord" });
```

</template>
<template #zh>

```typescript
// The model inspects only the tool it needs
get_tool_details({ name: "salesforce_updateRecord" });
```

</template>
</BiRow>

<BiRow>
<template #en>

This returns the complete schema for a single tool:

</template>
<template #zh>

这会返回单个工具的完整 schema：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "name": "salesforce_updateRecord",
  "description": "Updates a record in Salesforce",
  "inputSchema": {
"type": "object",
"properties": {
  "objectType": {
    "type": "string",
    "description": "Salesforce object type"
  },
  "recordId": { "type": "string", "description": "Record ID to update" },
  "data": { "type": "object", "description": "Fields to update" }
},
"required": ["objectType", "recordId", "data"]
  }
}
```

</template>
<template #zh>

```json
{
  "name": "salesforce_updateRecord",
  "description": "Updates a record in Salesforce",
  "inputSchema": {
"type": "object",
"properties": {
  "objectType": {
    "type": "string",
    "description": "Salesforce object type"
  },
  "recordId": { "type": "string", "description": "Record ID to update" },
  "data": { "type": "object", "description": "Fields to update" }
},
"required": ["objectType", "recordId", "data"]
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

**Layer 3: Execute.** The model calls the tool with full knowledge of its interface, having loaded only the definitions it needed.

</template>
<template #zh>

**第 3 层：执行（Execute）。** 模型只加载需要的定义，就能在完全掌握工具接口的情况下调用工具。

</template>
</BiRow>

<BiRow>
<template #en>

This pattern reduces token usage dramatically and can improve tool selection accuracy: the model focuses on a few relevant tools rather than scanning hundreds of irrelevant ones. Other discovery strategies (embeddings, subagents, etc.) follow the same layered principle but substitute different retrieval mechanisms in the catalog layer.

</template>
<template #zh>

这种模式能大幅降低 token 用量，还可能提升工具选择的准确率：模型只需关注少数相关工具，而不必在数百个无关工具中逐一扫描。其他发现策略（嵌入、子智能体等）遵循同样的分层原则，只是把目录层的检索机制换成别的。

</template>
</BiRow>

<BiRow>
<template #en>

### Dynamic Server Management

</template>
<template #zh>

### 动态服务器管理

</template>
</BiRow>

<BiRow>
<template #en>

Progressive discovery extends beyond individual tools to entire servers. Rather than connecting to every configured server at startup, a host can:

</template>
<template #zh>

渐进式发现不仅适用于单个工具，还可以扩展到整个服务器。宿主无需在启动时连接所有已配置的服务器，而是可以：

</template>
</BiRow>

<BiRow>
<template #en>

1. Maintain a registry of available servers and their high-level descriptions.
2. Connect to a server only when the model determines it needs that server's capabilities.
3. Disconnect servers that are no longer relevant to the current task, freeing context.

</template>
<template #zh>

1. 维护一份可用服务器及其能力概要的注册表。
2. 仅当模型判断需要某台服务器的能力时才连接它。
3. 断开与当前任务不再相关的服务器，释放上下文。

</template>
</BiRow>

<BiRow>
<template #en>

```mermaid
sequenceDiagram
participant Model
participant Host
participant Registry
participant Server

Model->>Host: search_available_servers("CRM")
Host->>Registry: Query available servers
Registry-->>Host: Salesforce server (not connected)
Host-->>Model: Salesforce server available

Model->>Host: enable_server("salesforce")
Host->>Server: server/discover
Server-->>Host: Supported versions + capabilities
Host->>Server: tools/list
Server-->>Host: Tool definitions
Host-->>Model: Salesforce server connected

Note over Model: Task complete

Model->>Host: disable_server("salesforce")
Host-->>Model: Server disconnected, context freed
```

</template>
<template #zh>

```mermaid
sequenceDiagram
participant Model
participant Host
participant Registry
participant Server

Model->>Host: search_available_servers("CRM")
Host->>Registry: Query available servers
Registry-->>Host: Salesforce server (not connected)
Host-->>Model: Salesforce server available

Model->>Host: enable_server("salesforce")
Host->>Server: server/discover
Server-->>Host: Supported versions + capabilities
Host->>Server: tools/list
Server-->>Host: Tool definitions
Host-->>Model: Salesforce server connected

Note over Model: Task complete

Model->>Host: disable_server("salesforce")
Host-->>Model: Server disconnected, context freed
```

</template>
</BiRow>

<BiRow>
<template #en>

This works especially well for general-purpose agents, where the user's intent isn't known upfront. The agent starts with a minimal set of always-on servers and connects others as needed. Combined with [agent skills](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills), a skill file can declare which MCP servers it needs, and the host connects them only when that skill is invoked.

</template>
<template #zh>

这种做法对通用智能体尤其有效，因为用户意图事先未知。智能体启动时只配备一组最少的常驻服务器，其余按需连接。再结合 [agent skills](https://modelcontextprotocol.io/docs/2026-07-28/develop/build-with-agent-skills)，技能文件可以声明自己需要哪些 MCP 服务器，宿主只在该技能被调用时才去连接它们。

</template>
</BiRow>

<BiRow>
<template #en>

### Implementation Guidelines

</template>
<template #zh>

### 实现指南

</template>
</BiRow>

<BiRow>
<template #en>

When implementing progressive discovery:

</template>
<template #zh>

实现渐进式发现时：

</template>
</BiRow>

<BiRow>
<template #en>

| Guideline                        | Rationale                                                                                                                                                                                          |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Offer multiple detail levels** | Let the model choose between name-only, name-and-description, or full-schema responses.                                                                                                            |
| **Cache tool definitions**       | Once fetched from a server, memoize the definition host-side so re-injecting it later doesn't need another `tools/list` round trip. This is separate from what's currently in the model's context. |
| **Refresh on `list_changed`**    | Re-index the search catalog when a server sends `notifications/tools/list_changed`.                                                                                                                |
| **Group tools by server**        | Present tools organized by their source server so the model can reason about related capabilities.                                                                                                 |

</template>
<template #zh>

| 指南 | 理由 |
| --- | --- |
| **提供多种详细程度** | 让模型在「仅名称」「名称+描述」「完整 schema」几种响应之间做选择。 |
| **缓存工具定义** | 从服务器取到定义后，在宿主侧做记忆化（memoize），之后重新注入时无需再发起一次 `tools/list` 往返。它与当前已在模型上下文中的内容相互独立。 |
| **在 `list_changed` 时刷新** | 服务器发送 `notifications/tools/list_changed` 时，为搜索目录重建索引。 |
| **按服务器对工具分组** | 按来源服务器组织展示工具，便于模型对相关能力进行推理。 |

</template>
</BiRow>

<BiRow>
<template #en>

### Caching

</template>
<template #zh>

### 缓存

</template>
</BiRow>

<BiRow>
<template #en>

Each list result (such as `tools/list`), as well as each `server/discover` and
`resources/read` result, carries `ttlMs` and `cacheScope` hints. Follow them as defined in the
specification's [caching utility](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching). In particular,
treat a cached list as stale once a `list_changed` notification arrives, even before its TTL
expires.

</template>
<template #zh>

每个列表结果（如 `tools/list`），以及每个 `server/discover` 和 `resources/read` 结果，都携带 `ttlMs` 和 `cacheScope` 提示。请按规范中[缓存实用工具](https://modelcontextprotocol.io/specification/2026-07-28/server/utilities/caching)的定义遵循这些提示。尤其注意：一旦收到 `list_changed` 通知，即使 TTL 尚未到期，也应把已缓存的列表视为过期。

</template>
</BiRow>

<BiRow>
<template #en>

### Interaction with Prompt Caching

</template>
<template #zh>

### 与提示词缓存的交互

</template>
</BiRow>

<BiRow>
<template #en>

Most providers cache the prompt prefix, including the `tools` array. Adding or removing tool
definitions mid-conversation invalidates that cache, and the resulting miss can cost more tokens
than the definitions you removed. To preserve caching:

</template>
<template #zh>

大多数提供商会缓存提示词前缀（包括 `tools` 数组）。在对话中途增删工具定义会使缓存失效，由此产生的缓存未命中，其 token 开销可能比删掉的那些定义还高。要保持缓存有效：

</template>
</BiRow>

<BiRow>
<template #en>

* Append newly discovered definitions after the cache breakpoint rather than re-sorting the
  `tools` array, or route every call through a single stable `call_tool({name, args})` meta-tool
  so the array never changes.
* Treat server disconnection as a conversation-boundary operation rather than a per-turn one.
* Consult your provider's caching documentation alongside the tool-search links above.

</template>
<template #zh>

* 把新发现的定义追加到缓存断点之后，而不是对 `tools` 数组重新排序；或者让所有调用都经由同一个稳定的 `call_tool({name, args})` 元工具，使该数组永不变化。
* 把服务器断连视为会话边界级的操作，而非逐轮操作。
* 除上文给出的工具搜索链接外，还应查阅你所用提供商的缓存文档。

</template>
</BiRow>

<BiRow>
<template #en>

## Programmatic Tool Calling / Code Mode

</template>
<template #zh>

## 程序化工具调用 / 代码模式

</template>
</BiRow>

<BiRow>
<template #en>

With direct tool calling, every tool invocation is a round trip: the model generates a tool call, the client executes it, and the full result flows back into the model's context. When a task requires chaining multiple tools (read a document, transform it, write it somewhere else), each intermediate result passes through the model, consuming tokens and adding latency even when it has nothing to do with them.

</template>
<template #zh>

在直接工具调用（direct tool calling）下，每次工具调用都是一次往返：模型生成工具调用，客户端执行，完整结果再回流到模型的上下文。当任务需要串联多个工具（读取一份文档、做转换、再写到别处）时，每个中间结果都要经过模型，消耗 token、增加延迟——哪怕这些中间结果与模型毫无关系。

</template>
</BiRow>

<BiRow>
<template #en>

Programmatic tool calling (sometimes called "code mode") provides a way for clients to **compose tool calls** effectively. Instead of calling tools directly, the model writes code that calls tools. The code executes in a sandboxed environment, and only the final result returns to the model.

</template>
<template #zh>

程序化工具调用（有时也称「代码模式」，code mode）为客户端提供了一种高效**组合工具调用**的方式：模型不再直接调用工具，而是编写调用工具的代码。代码在沙箱（sandbox）环境中执行，只有最终结果返回给模型。

</template>
</BiRow>

<BiRow>
<template #en>

Programmatic tool calling is powerful and allows for more efficient use of MCP tools and resources, but requires
clients to implement a sandbox environment.

</template>
<template #zh>

程序化工具调用功能强大，可以更高效地使用 MCP 工具与资源，但需要客户端实现沙箱环境。

</template>
</BiRow>

<BiRow>
<template #en>

<img src="https://mintcdn.com/mcp/JXfd5cBmEUh_qPUI/images/programmatic-tool-calling.svg?fit=max&auto=format&n=JXfd5cBmEUh_qPUI&q=85&s=a2be82d097bb7cd7c7fd415918b1571d" alt="Comparison of direct tool calling versus programmatic tool calling. Direct calling passes every intermediate result through the model (~100K+ tokens). Programmatic calling sends a ~200-token script to a sandbox, which executes the tool calls and returns a ~15-token summary." width="900" height="900" data-path="images/programmatic-tool-calling.svg" />

</template>
<template #zh>

<img src="https://mintcdn.com/mcp/JXfd5cBmEUh_qPUI/images/programmatic-tool-calling.svg?fit=max&auto=format&n=JXfd5cBmEUh_qPUI&q=85&s=a2be82d097bb7cd7c7fd415918b1571d" alt="Comparison of direct tool calling versus programmatic tool calling. Direct calling passes every intermediate result through the model (~100K+ tokens). Programmatic calling sends a ~200-token script to a sandbox, which executes the tool calls and returns a ~15-token summary." width="900" height="900" data-path="images/programmatic-tool-calling.svg" />

</template>
</BiRow>

<BiRow>
<template #en>

### How It Works

</template>
<template #zh>

### 工作原理

</template>
</BiRow>

<BiRow>
<template #en>

The host converts MCP tool schemas into a typed API available inside a sandbox. When the model needs tools, it writes a script and executes it.

</template>
<template #zh>

宿主把 MCP 工具 schema 转换为沙箱内可用的类型化 API。模型需要工具时，便编写一段脚本并执行。

</template>
</BiRow>

<BiRow>
<template #en>

**Step 1: Generate a programmatic API from MCP schemas.** The host reads each server's tool definitions and produces typed functions based on each tool's arguments and `outputSchema`:

</template>
<template #zh>

**第 1 步：从 MCP schema 生成程序化 API。** 宿主读取每个服务器的工具定义，并基于各工具的参数与 `outputSchema` 产出类型化函数：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// Auto-generated from the Logging MCP server's tool schema
interface LogEntry {
  timestamp: string;
  message: string;
  level: string;
}

function logging_getLogs(input: {
  level: "error" | "warn" | "info";
  since: number;
}): Promise<{ entries: LogEntry[] }> {
  return mcp.callTool<{ entries: LogEntry[] }>("logging_getLogs", input);
}

// Auto-generated from the Ticketing MCP server's tool schema
function ticketing_createIssue(input: {
  title: string;
  body?: string;
  priority: "low" | "medium" | "high";
}): Promise<{ issueId: string }> {
  return mcp.callTool<{ issueId: string }>("ticketing_createIssue", input);
}
```

</template>
<template #zh>

```typescript
// Auto-generated from the Logging MCP server's tool schema
interface LogEntry {
  timestamp: string;
  message: string;
  level: string;
}

function logging_getLogs(input: {
  level: "error" | "warn" | "info";
  since: number;
}): Promise<{ entries: LogEntry[] }> {
  return mcp.callTool<{ entries: LogEntry[] }>("logging_getLogs", input);
}

// Auto-generated from the Ticketing MCP server's tool schema
function ticketing_createIssue(input: {
  title: string;
  body?: string;
  priority: "low" | "medium" | "high";
}): Promise<{ issueId: string }> {
  return mcp.callTool<{ issueId: string }>("ticketing_createIssue", input);
}
```

</template>
</BiRow>

<BiRow>
<template #en>

MCP Servers can provide an optional [`outputSchema`](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#output-schema) for each tool. When an output schema is present, the host can produce precise return types (like `LogEntry` above).

</template>
<template #zh>

MCP 服务器可以为每个工具提供可选的 [`outputSchema`](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#output-schema)。存在输出 schema 时，宿主就能产出精确的返回类型（如上面的 `LogEntry`）。

</template>
</BiRow>

<BiRow>
<template #en>

When an output schema is absent, prefer the simple path:

</template>
<template #zh>

没有输出 schema 时，优先选择简单的路线：

</template>
</BiRow>

<BiRow>
<template #en>

* **Use a generic type and move on.** Accept `any` or `string` and handle the unstructured output downstream. The real fix is for server authors to provide `outputSchema`.
* **Extract a typed result using a fast model**, for single-shot calls outside loops. Expose a host-brokered `extract(value, ExpectedType)` helper through the same stub-interception path as MCP tool calls so the sandbox itself never opens a network connection. The helper routes to a small model (for example, Claude Haiku or Gemini Flash) to coerce the value into `ExpectedType`. This adds per-call latency and can hallucinate or drop fields, so validate the result against `ExpectedType` before use.

</template>
<template #zh>

* **使用泛型，继续推进。** 接受 `any` 或 `string`，把非结构化输出留到下游处理。真正的解决办法是让服务器作者提供 `outputSchema`。
* **用快速模型提取类型化结果**，适用于循环之外的一次性调用。通过与 MCP 工具调用相同的函数桩拦截路径，暴露一个由宿主中介（broker）提供的 `extract(value, ExpectedType)` 辅助函数，使沙箱自身永不打开网络连接。该辅助函数会路由到一个小模型（例如 Claude Haiku 或 Gemini Flash），把值规整为 `ExpectedType`。这会增加每次调用的延迟，且可能产生幻觉或丢失字段，因此使用前先按 `ExpectedType` 校验结果。

</template>
</BiRow>

<BiRow>
<template #en>

**Step 2: The model writes code against these APIs.** Rather than making separate tool calls with full results flowing through context between them, the model writes a single script. Consider a task like "find all error logs from the past hour and file a ticket for each unique error." With direct tool calling, thousands of log entries would flow through the model's context. With code, the model filters in the sandbox:

</template>
<template #zh>

**第 2 步：模型基于这些 API 编写代码。** 模型不再分别发起工具调用、让完整结果在调用之间流经上下文，而是编写一段脚本。设想这样一个任务：「找出过去一小时内的所有错误日志，并为每种去重后的错误各建一张工单」。在直接工具调用下，数千条日志会流经模型的上下文；而用代码，模型直接在沙箱中过滤：

</template>
</BiRow>

<BiRow>
<template #en>

```typescript
// Model-generated code, executes in sandbox
const logs = await logging_getLogs({
  level: "error",
  since: Date.now() - 3600000,
});

// Filter and deduplicate inside the sandbox, not in the model's context
const uniqueErrors = new Map<string, LogEntry>();
for (const log of logs.entries) {
  if (!uniqueErrors.has(log.message)) {
uniqueErrors.set(log.message, log);
  }
}

for (const [message, log] of uniqueErrors) {
  await ticketing_createIssue({
title: `Error: ${message}`,
body: `First seen: ${log.timestamp}\nOccurrences: ${
  logs.entries.filter((l) => l.message === message).length
}`,
priority: "high",
  });
}

console.log(
  `Filed ${uniqueErrors.size} tickets from ${logs.entries.length} error logs`,
);
```

</template>
<template #zh>

```typescript
// Model-generated code, executes in sandbox
const logs = await logging_getLogs({
  level: "error",
  since: Date.now() - 3600000,
});

// Filter and deduplicate inside the sandbox, not in the model's context
const uniqueErrors = new Map<string, LogEntry>();
for (const log of logs.entries) {
  if (!uniqueErrors.has(log.message)) {
uniqueErrors.set(log.message, log);
  }
}

for (const [message, log] of uniqueErrors) {
  await ticketing_createIssue({
title: `Error: ${message}`,
body: `First seen: ${log.timestamp}\nOccurrences: ${
  logs.entries.filter((l) => l.message === message).length
}`,
priority: "high",
  });
}

console.log(
  `Filed ${uniqueErrors.size} tickets from ${logs.entries.length} error logs`,
);
```

</template>
</BiRow>

<BiRow>
<template #en>

**Step 3: The sandbox executes the code.** Function calls inside the sandbox are intercepted and routed back to the appropriate MCP server through the host broker. The log data and ticket creation flow directly between servers without ever entering the model's context. Only the `console.log` output, a single summary line, returns to the model.

</template>
<template #zh>

**第 3 步：沙箱执行代码。** 沙箱内的函数调用会被拦截，并经宿主中介路由到对应的 MCP 服务器。日志数据与工单创建在服务器之间直接流转，全程不进入模型的上下文。只有 `console.log` 的输出——一行摘要——会返回给模型。

</template>
</BiRow>

<BiRow>
<template #en>

### Choosing a Sandbox

</template>
<template #zh>

### 选择沙箱

</template>
</BiRow>

<BiRow>
<template #en>

The right sandbox depends on the language you want the model to write, your host application's language, and how much isolation you need. The table lists example runtimes rather than endorsements; evaluate maturity for your use case:

</template>
<template #zh>

选择哪种沙箱，取决于你想让模型编写什么语言、你的宿主应用使用什么语言，以及你需要多强的隔离。下表列出的是示例运行时而非背书；请结合自身用例评估其成熟度：

</template>
</BiRow>

<BiRow>
<template #en>

| Sandboxed language | Runtime / Library                                             | Host language     | Approach                                                                                        |
| ------------------ | ------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------- |
| **JavaScript**     | [Deno](https://github.com/denoland/deno), `isolated-vm`       | Rust / Node / CLI | V8-based runtimes with fine-grained permissions. Can disable all permissions for full lockdown. |
| **Python**         | [Monty](https://github.com/pydantic/monty) *(experimental)*   | Rust              | Minimal Python interpreter built for AI use cases. No I/O by default.                           |
| **TypeScript**     | [pctx](https://github.com/portofcontext/pctx) *(early-stage)* | Python / Rust     | Incorporates code mode concepts as a library, with low-level Rust support.                      |
| **Any (via Wasm)** | [Wasmtime](https://github.com/bytecodealliance/wasmtime)      | Rust / C / Go     | Compile any language to Wasm and run it with capability-based security.                         |

</template>
<template #zh>

| 沙箱内语言 | 运行时 / 库 | 宿主语言 | 方式 |
| --- | --- | --- | --- |
| **JavaScript** | [Deno](https://github.com/denoland/deno)、`isolated-vm` | Rust / Node / CLI | 基于 V8 的运行时，具备细粒度权限；可禁用全部权限实现完全锁定。 |
| **Python** | [Monty](https://github.com/pydantic/monty) *（实验性）* | Rust | 为 AI 用例打造的极简 Python 解释器，默认无 I/O。 |
| **TypeScript** | [pctx](https://github.com/portofcontext/pctx) *（早期阶段）* | Python / Rust | 以库的形式整合代码模式概念，并提供底层 Rust 支持。 |
| **任意语言（经 Wasm）** | [Wasmtime](https://github.com/bytecodealliance/wasmtime) | Rust / C / Go | 把任意语言编译为 Wasm，以基于能力的安全机制运行。 |

</template>
</BiRow>

<BiRow>
<template #en>

Regardless of sandbox, the integration pattern is the same: the host injects function stubs, intercepts calls over an in-process or stdio channel (so network permissions can stay fully denied), and dispatches them as `tools/call` requests to MCP servers.

</template>
<template #zh>

无论选择哪种沙箱，集成模式都一样：宿主注入函数桩，经进程内通道或 stdio 通道拦截调用（这样网络权限可以保持完全拒绝），再将其作为 `tools/call` 请求分发给 MCP 服务器。

</template>
</BiRow>

<BiRow>
<template #en>

### Execution Architecture

</template>
<template #zh>

### 执行架构

</template>
</BiRow>

<BiRow>
<template #en>

The implementation has three components:

</template>
<template #zh>

该实现包含三个组成部分：

</template>
</BiRow>

<BiRow>
<template #en>

```mermaid
flowchart LR
subgraph Host["MCP Host"]
    A[LLM] -->|writes code| B[Sandbox]
    B -->|function call| C[MCP Client]
    C -->|return value| B
    B -->|console output| A
end
C -->|tool call| D[MCP Server A]
C -->|tool call| E[MCP Server B]
D -->|result| C
E -->|result| C
```

</template>
<template #zh>

```mermaid
flowchart LR
subgraph Host["MCP Host"]
    A[LLM] -->|writes code| B[Sandbox]
    B -->|function call| C[MCP Client]
    C -->|return value| B
    B -->|console output| A
end
C -->|tool call| D[MCP Server A]
C -->|tool call| E[MCP Server B]
D -->|result| C
E -->|result| C
```

</template>
</BiRow>

<BiRow>
<template #en>

**The sandbox** runs model-generated code in an isolated environment with no direct network access. Its only interface to the outside world is through the generated function stubs, which route calls back to the host.

</template>
<template #zh>

**沙箱**在没有直接网络访问的隔离环境中运行模型生成的代码。它与外界的唯一接口是生成的函数桩，函数桩把调用路由回宿主。

</template>
</BiRow>

<BiRow>
<template #en>

**The host** acts as a broker. It receives function calls from the sandbox, maps them to the correct MCP server, executes the tool call, and returns the result to the sandbox. Authorization tokens and credentials are held by the host and never exposed to the generated code.

</template>
<template #zh>

**宿主**充当中介：接收来自沙箱的函数调用，映射到正确的 MCP 服务器，执行工具调用，再把结果返回给沙箱。授权令牌与凭据由宿主持有，绝不会暴露给生成的代码。

</template>
</BiRow>

<BiRow>
<template #en>

**The model** sees only what the sandbox returns, typically the output of `console.log` statements or a final return value. This gives the model (and the client developer) precise control over what enters the context window.

</template>
<template #zh>

**模型**只能看到沙箱返回的内容，通常是 `console.log` 语句的输出或最终返回值。这让模型（以及客户端开发者）能精确控制哪些内容进入上下文窗口。

</template>
</BiRow>

<BiRow>
<template #en>

### Security Considerations

</template>
<template #zh>

### 安全注意事项

</template>
</BiRow>

<BiRow>
<template #en>

Programmatic tool calling introduces a code execution surface that requires careful sandboxing:

</template>
<template #zh>

程序化工具调用引入了一个需要认真做沙箱隔离的代码执行面：

</template>
</BiRow>

<BiRow>
<template #en>

* **Per-call authorization**: The broker is still the MCP host for spec purposes. Apply the same human-in-the-loop confirmation policy to sandbox-originated calls that you apply to direct calls (see [Tools: Security](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations)). Approving the script does not grant blanket approval for every tool call it makes at runtime; hosts may grant categorical approval (for example, "allow `ticketing_createIssue` for this script run") rather than prompting per iteration, but the broker must still evaluate each call against that grant.
* **Cross-server data flow**: Tool results from one server are untrusted input to another. The broker should apply the same input-review policy to brokered calls as to direct ones; output truncation alone does not prevent exfiltration.
* **Network isolation**: The sandbox should have no direct network access. All external communication flows through the host broker, which enforces authorization and access control.
* **No credential exposure**: API keys and tokens are held by the host. The generated code calls typed functions; the host adds authentication when forwarding to servers.
* **Resource limits**: Set timeouts and memory limits on sandbox execution to prevent runaway scripts.
* **Output filtering**: Validate and truncate sandbox console output before feeding it back to the model.

</template>
<template #zh>

* **按调用授权**：就规范而言，中介仍然是 MCP 宿主。对沙箱发起的调用，应采用与直接调用相同的人工介入确认（human-in-the-loop）策略（参见[工具：安全](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#security-considerations)）。批准脚本并不等于对其运行时发起的每一次工具调用都给予一揽子许可；宿主可以给出类别级批准（例如「允许本次脚本运行调用 `ticketing_createIssue`」），而不必每次迭代都请求确认，但中介仍须对照该授权逐一评估每次调用。
* **跨服务器数据流**：一个服务器的工具结果对另一个服务器而言是不可信输入。中介对中转调用应采用与直接调用相同的输入审查策略；仅靠输出截断并不能防止数据外泄。
* **网络隔离**：沙箱不应有直接网络访问。所有对外通信都经由宿主中介，由它执行授权与访问控制。
* **不暴露凭据**：API 密钥与令牌由宿主持有。生成的代码只调用类型化函数，由宿主在转发给服务器时附加认证。
* **资源限制**：为沙箱执行设置超时与内存上限，防止脚本失控。
* **输出过滤**：沙箱控制台输出在回传给模型前，先做校验与截断。

</template>
</BiRow>

<BiRow>
<template #en>

### Error Handling

</template>
<template #zh>

### 错误处理

</template>
</BiRow>

<BiRow>
<template #en>

MCP tool errors arrive as a successful response with
[`isError: true`](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#error-handling) rather than a transport
failure. Generated wrappers should convert this into a thrown exception so model-authored code
can use `try`/`catch`. If an uncaught error terminates the script, surface it as the script's
result so the model can self-correct; the model is responsible for reporting any partial side
effects already committed.

</template>
<template #zh>

MCP 工具错误以携带 [`isError: true`](https://modelcontextprotocol.io/specification/2026-07-28/server/tools#error-handling) 的成功响应形式返回，而非传输故障。生成的包装函数应把它转换为抛出的异常，让模型编写的代码能用 `try`/`catch` 处理。若某个未捕获的错误导致脚本终止，应把它作为脚本的结果返回给模型，便于其自我修正；模型则需负责报告已实际产生的部分副作用。

</template>
</BiRow>

<BiRow>
<template #en>

## Combining Both Patterns

</template>
<template #zh>

## 组合两种模式

</template>
</BiRow>

<BiRow>
<template #en>

Progressive discovery and programmatic tool calling work well together. The model uses discovery tools to identify which tools it needs, loads their schemas, and then writes a single script that calls multiple tools in one execution pass. This combination minimizes both the token cost of tool definitions *and* the token cost of tool results, keeping the model's context focused on reasoning rather than passing data through it.

</template>
<template #zh>

渐进式发现与程序化工具调用相辅相成。模型先用发现工具确定自己需要哪些工具，加载它们的 schema，然后编写一段脚本，在一次执行中调用多个工具。这一组合能把工具定义与工具结果的 token 成本*都*降到最低，让模型的上下文专注于推理，而不是被当作数据通道。

</template>
</BiRow>
