<BiRow>
<template #en>

MCP servers are programs that expose specific capabilities to AI applications through standardized protocol interfaces.

</template>
<template #zh>

MCP 服务器是一类程序，通过标准化的协议接口向 AI 应用暴露特定能力。

</template>
</BiRow>

<BiRow>
<template #en>

Common examples include file system servers for document access, database servers for data queries, GitHub servers for code management, Slack servers for team communication, and calendar servers for scheduling.

</template>
<template #zh>

常见的例子包括：用于文档访问的文件系统服务器、用于数据查询的数据库服务器、用于代码管理的 GitHub 服务器、用于团队沟通的 Slack 服务器，以及用于日程安排的日历服务器。

</template>
</BiRow>

<BiRow>
<template #en>

## Core Server Features

</template>
<template #zh>

## 服务器的核心功能

</template>
</BiRow>

<BiRow>
<template #en>

Servers provide functionality through three building blocks:

</template>
<template #zh>

服务器通过三个基本构件提供功能：

</template>
</BiRow>

<BiRow>
<template #en>

| Feature       | Explanation                                                                                                                                                                             | Examples                                                           | Who controls it |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | --------------- |
| **Tools**     | Functions that your LLM can actively call, and decides when to use them based on user requests. Tools can write to databases, call external APIs, modify files, or trigger other logic. | Search flights<br />Send messages<br />Create calendar events      | Model           |
| **Resources** | Passive data sources that provide read-only access to information for context, such as file contents, database schemas, or API documentation.                                           | Retrieve documents<br />Access knowledge bases<br />Read calendars | Application     |
| **Prompts**   | Pre-built instruction templates that tell the model to work with specific tools and resources.                                                                                          | Plan a vacation<br />Summarize my meetings<br />Draft an email     | User            |

</template>
<template #zh>

| 功能         | 说明                                                                                                                                                                                       | 示例                                       | 由谁控制        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------- |
| **工具**     | 可供 LLM 主动调用的函数，模型会根据用户请求决定何时使用。工具可以写入数据库、调用外部 API、修改文件或触发其他逻辑。                                                                            | 搜索航班<br />发送消息<br />创建日历事件      | 模型            |
| **资源**     | 被动数据源，以只读方式提供用于上下文的信息，例如文件内容、数据库 schema 或 API 文档。                                                                                                          | 检索文档<br />访问知识库<br />读取日历        | 应用            |
| **提示词**   | 预置的指令模板，用于指导模型配合特定工具和资源完成工作。                                                                                                                                       | 规划一次度假<br />总结我的会议<br />起草一封邮件 | 用户            |

</template>
</BiRow>

<BiRow>
<template #en>

We will use a hypothetical scenario to demonstrate the role of each of these features, and show how they can work together.

</template>
<template #zh>

下面用一个假想场景来演示这三项功能各自的作用，并展示它们如何协同工作。

</template>
</BiRow>

<BiRow>
<template #en>

### Tools

</template>
<template #zh>

### 工具

</template>
</BiRow>

<BiRow>
<template #en>

Tools enable AI models to perform actions. Each tool defines a specific operation with typed inputs and outputs. The model requests tool execution based on context.

</template>
<template #zh>

工具让 AI 模型能够执行动作。每个工具都定义了一个具体操作，且输入和输出都有明确的类型。模型会根据上下文请求执行工具。

</template>
</BiRow>

<BiRow>
<template #en>

#### How Tools Work

</template>
<template #zh>

#### 工具的工作原理

</template>
</BiRow>

<BiRow>
<template #en>

Tools are schema-defined interfaces that LLMs can invoke. MCP uses JSON Schema for validation. Each tool performs a single operation with clearly defined inputs and outputs. Tools may require user consent prior to execution, helping to ensure users maintain control over actions taken by a model.

</template>
<template #zh>

工具是由 schema 定义、可供 LLM 调用的接口。MCP 使用 JSON Schema 进行校验。每个工具只执行一个操作，输入和输出都有清晰定义。工具在执行前可能需要用户同意，这有助于确保用户始终掌控模型执行的动作。

</template>
</BiRow>

<BiRow>
<template #en>

**Protocol operations:**

</template>
<template #zh>

**协议操作：**

</template>
</BiRow>

<BiRow>
<template #en>

| Method       | Purpose                  | Returns                                |
| ------------ | ------------------------ | -------------------------------------- |
| `tools/list` | Discover available tools | Array of tool definitions with schemas |
| `tools/call` | Execute a specific tool  | Tool execution result                  |

</template>
<template #zh>

| 方法         | 用途         | 返回                     |
| ------------ | ------------ | ------------------------ |
| `tools/list` | 发现可用工具 | 带 schema 的工具定义数组 |
| `tools/call` | 执行特定工具 | 工具执行结果             |

</template>
</BiRow>

<BiRow>
<template #en>

**Example tool definition:**

</template>
<template #zh>

**工具定义示例：**

</template>
</BiRow>

<BiRow>
<template #en>

```typescript theme={null}
{
  name: "searchFlights",
  description: "Search for available flights",
  inputSchema: {
type: "object",
properties: {
  origin: { type: "string", description: "Departure city" },
  destination: { type: "string", description: "Arrival city" },
  date: { type: "string", format: "date", description: "Travel date" }
},
required: ["origin", "destination", "date"]
  }
}
```

</template>
<template #zh>

```typescript theme={null}
{
  name: "searchFlights",
  description: "Search for available flights",
  inputSchema: {
type: "object",
properties: {
  origin: { type: "string", description: "Departure city" },
  destination: { type: "string", description: "Arrival city" },
  date: { type: "string", format: "date", description: "Travel date" }
},
required: ["origin", "destination", "date"]
  }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Example: Travel Booking

</template>
<template #zh>

#### 示例：旅行预订

</template>
</BiRow>

<BiRow>
<template #en>

Tools enable AI applications to perform actions on behalf of users. In a travel planning scenario, the AI application might use several tools to help book a vacation:

</template>
<template #zh>

工具让 AI 应用能够代表用户执行动作。在旅行规划场景中，AI 应用可能会使用多个工具来帮助预订度假行程：

</template>
</BiRow>

<BiRow>
<template #en>

**Flight Search**

</template>
<template #zh>

**航班搜索**

</template>
</BiRow>

<BiRow>
<template #en>

```
searchFlights(origin: "NYC", destination: "Barcelona", date: "2024-06-15")
```

</template>
<template #zh>

```
searchFlights(origin: "NYC", destination: "Barcelona", date: "2024-06-15")
```

</template>
</BiRow>

<BiRow>
<template #en>

Queries multiple airlines and returns structured flight options.

</template>
<template #zh>

查询多家航空公司，返回结构化的航班选项。

</template>
</BiRow>

<BiRow>
<template #en>

**Calendar Blocking**

</template>
<template #zh>

**日历占位**

</template>
</BiRow>

<BiRow>
<template #en>

```
createCalendarEvent(title: "Barcelona Trip", startDate: "2024-06-15", endDate: "2024-06-22")
```

</template>
<template #zh>

```
createCalendarEvent(title: "Barcelona Trip", startDate: "2024-06-15", endDate: "2024-06-22")
```

</template>
</BiRow>

<BiRow>
<template #en>

Marks the travel dates in the user's calendar.

</template>
<template #zh>

在用户的日历中标记旅行日期。

</template>
</BiRow>

<BiRow>
<template #en>

**Email notification**

</template>
<template #zh>

**邮件通知**

</template>
</BiRow>

<BiRow>
<template #en>

```
sendEmail(to: "team@work.com", subject: "Out of Office", body: "...")
```

</template>
<template #zh>

```
sendEmail(to: "team@work.com", subject: "Out of Office", body: "...")
```

</template>
</BiRow>

<BiRow>
<template #en>

Sends an automated out-of-office message to colleagues.

</template>
<template #zh>

自动向同事发送外出回复邮件。

</template>
</BiRow>

<BiRow>
<template #en>

#### User Interaction Model

</template>
<template #zh>

#### 用户交互模型

</template>
</BiRow>

<BiRow>
<template #en>

Tools are model-controlled, meaning AI models can discover and invoke them automatically. However, MCP emphasizes human oversight through several mechanisms.

</template>
<template #zh>

工具由模型控制（model-controlled），也就是说，AI 模型可以自动发现并调用它们。不过，MCP 通过多种机制强调人工监督。

</template>
</BiRow>

<BiRow>
<template #en>

For trust and safety, applications can implement user control through various mechanisms, such as:

</template>
<template #zh>

出于信任与安全的考虑，应用可以通过多种机制实现用户控制，例如：

</template>
</BiRow>

<BiRow>
<template #en>

* Displaying available tools in the UI, enabling users to define whether a tool should be made available in specific interactions
* Approval dialogs for individual tool executions
* Permission settings for pre-approving certain safe operations
* Activity logs that show all tool executions with their results

</template>
<template #zh>

* 在界面中展示可用工具，让用户设定某个工具在特定交互中是否可用
* 针对单次工具执行的批准对话框
* 用于预先批准某些安全操作的权限设置
* 记录全部工具执行及其结果的活动日志

</template>
</BiRow>

<BiRow>
<template #en>

### Resources

</template>
<template #zh>

### 资源

</template>
</BiRow>

<BiRow>
<template #en>

Resources provide structured access to information that the AI application can retrieve and provide to models as context.

</template>
<template #zh>

资源提供了对信息的结构化访问，AI 应用可以检索这些信息，并作为上下文提供给模型。

</template>
</BiRow>

<BiRow>
<template #en>

#### How Resources Work

</template>
<template #zh>

#### 资源的工作原理

</template>
</BiRow>

<BiRow>
<template #en>

Resources expose data from files, APIs, databases, or any other source that an AI needs to understand context. Applications can access this information directly and decide how to use it - whether that's selecting relevant portions, searching with embeddings, or passing it all to the model.

</template>
<template #zh>

资源暴露来自文件、API、数据库或任何其他来源的数据，AI 需要这些数据来理解上下文。应用可以直接访问这些信息，并自行决定如何使用——是选取相关部分、基于嵌入（embedding）进行搜索，还是把全部内容交给模型。

</template>
</BiRow>

<BiRow>
<template #en>

Each resource has a unique URI (e.g., `file:///path/to/document.md`) and declares its MIME type for appropriate content handling.

</template>
<template #zh>

每个资源都有唯一的 URI（例如 `file:///path/to/document.md`），并声明其 MIME 类型，以便对内容做恰当处理。

</template>
</BiRow>

<BiRow>
<template #en>

Resources support two discovery patterns:

</template>
<template #zh>

资源支持两种发现模式：

</template>
</BiRow>

<BiRow>
<template #en>

* **Direct Resources** - fixed URIs that point to specific data. Example: `calendar://events/2024` - returns calendar availability for 2024
* **Resource Templates** - dynamic URIs with parameters for flexible queries. Example:
  * `travel://activities/{city}/{category}` - returns activities by city and category
  * `travel://activities/barcelona/museums` - returns all museums in Barcelona

</template>
<template #zh>

* **直接资源（Direct Resources）** - 指向特定数据的固定 URI。示例：`calendar://events/2024` - 返回 2024 年的日历空闲时间
* **资源模板（Resource Templates）** - 带参数的动态 URI，用于灵活查询。示例：
  * `travel://activities/{city}/{category}` - 按城市和类别返回活动
  * `travel://activities/barcelona/museums` - 返回巴塞罗那的所有博物馆

</template>
</BiRow>

<BiRow>
<template #en>

Resource Templates include metadata such as title, description, and expected MIME type, making them discoverable and self-documenting.

</template>
<template #zh>

资源模板包含标题、描述和预期的 MIME 类型等元数据，因而可被发现、自文档化。

</template>
</BiRow>

<BiRow>
<template #en>

**Protocol operations:**

</template>
<template #zh>

**协议操作：**

</template>
</BiRow>

<BiRow>
<template #en>

| Method                     | Purpose                         | Returns                                |
| -------------------------- | ------------------------------- | -------------------------------------- |
| `resources/list`           | List available direct resources | Array of resource descriptors          |
| `resources/templates/list` | Discover resource templates     | Array of resource template definitions |
| `resources/read`           | Retrieve resource contents      | Resource data with metadata            |
| `subscriptions/listen`     | Monitor resource changes        | Stream of update notifications         |

</template>
<template #zh>

| 方法                       | 用途               | 返回               |
| -------------------------- | ------------------ | ------------------ |
| `resources/list`           | 列出可用的直接资源 | 资源描述符数组     |
| `resources/templates/list` | 发现资源模板       | 资源模板定义数组   |
| `resources/read`           | 检索资源内容       | 带元数据的资源数据 |
| `subscriptions/listen`     | 监视资源变化       | 更新通知流         |

</template>
</BiRow>

<BiRow>
<template #en>

To watch specific resources for changes, a client sends a [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) request with the resource URIs listed in the `resourceSubscriptions` filter. The server delivers `notifications/resources/updated` on the resulting stream whenever a watched resource changes.

</template>
<template #zh>

要监视特定资源的变化，客户端会发送 [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) 请求，并在 `resourceSubscriptions` 过滤器中列出要监视的资源 URI。每当被监视的资源发生变化，服务器就会在相应的流上发送 `notifications/resources/updated` 通知。

</template>
</BiRow>

<BiRow>
<template #en>

#### Example: Getting Travel Planning Context

</template>
<template #zh>

#### 示例：获取旅行规划上下文

</template>
</BiRow>

<BiRow>
<template #en>

Continuing with the travel planning example, resources provide the AI application with access to relevant information:

</template>
<template #zh>

继续沿用旅行规划的例子，资源让 AI 应用能够访问相关信息：

</template>
</BiRow>

<BiRow>
<template #en>

* **Calendar data** (`calendar://events/2024`) - Checks user availability
* **Travel documents** (`file:///Documents/Travel/passport.pdf`) - Accesses important documents
* **Previous itineraries** (`trips://history/barcelona-2023`) - References past trips and preferences

</template>
<template #zh>

* **日历数据**（`calendar://events/2024`）- 查看用户的空闲时间
* **旅行证件**（`file:///Documents/Travel/passport.pdf`）- 访问重要证件
* **历史行程**（`trips://history/barcelona-2023`）- 参考过去的旅行和偏好

</template>
</BiRow>

<BiRow>
<template #en>

The AI application retrieves these resources and decides how to process them, whether selecting a subset of data using embeddings or keyword search, or passing raw data directly to the model.

</template>
<template #zh>

AI 应用检索这些资源后自行决定如何处理：是用嵌入或关键词搜索选取数据子集，还是把原始数据直接交给模型。

</template>
</BiRow>

<BiRow>
<template #en>

In this case, it provides calendar data, weather information, and travel preferences to the model, enabling it to check availability, look up weather patterns, and reference past travel preferences.

</template>
<template #zh>

本例中，它把日历数据、天气信息和旅行偏好提供给模型，使模型能够查看空闲时间、查询天气模式并参考过往的旅行偏好。

</template>
</BiRow>

<BiRow>
<template #en>

**Resource Template Examples:**

</template>
<template #zh>

**资源模板示例：**

</template>
</BiRow>

<BiRow>
<template #en>

```json theme={null}
{
  "uriTemplate": "weather://forecast/{city}/{date}",
  "name": "weather-forecast",
  "title": "Weather Forecast",
  "description": "Get weather forecast for any city and date",
  "mimeType": "application/json"
}

{
  "uriTemplate": "travel://flights/{origin}/{destination}",
  "name": "flight-search",
  "title": "Flight Search",
  "description": "Search available flights between cities",
  "mimeType": "application/json"
}
```

</template>
<template #zh>

```json theme={null}
{
  "uriTemplate": "weather://forecast/{city}/{date}",
  "name": "weather-forecast",
  "title": "Weather Forecast",
  "description": "Get weather forecast for any city and date",
  "mimeType": "application/json"
}

{
  "uriTemplate": "travel://flights/{origin}/{destination}",
  "name": "flight-search",
  "title": "Flight Search",
  "description": "Search available flights between cities",
  "mimeType": "application/json"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

These templates enable flexible queries. For weather data, users can access forecasts for any city/date combination. For flights, they can search routes between any two airports. When a user has input "NYC" as the `origin` airport and begins to input "Bar" as the `destination` airport, the system can suggest "Barcelona (BCN)" or "Barbados (BGI)".

</template>
<template #zh>

这些模板让查询更加灵活。以天气数据为例，用户可以访问任意城市/日期组合的预报；以航班为例，可以搜索任意两个机场之间的航线。当用户已输入「NYC」作为 `origin` 机场，又开始输入「Bar」作为 `destination` 机场时，系统可以建议「Barcelona (BCN)」或「Barbados (BGI)」。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameter Completion

</template>
<template #zh>

#### 参数补全

</template>
</BiRow>

<BiRow>
<template #en>

Dynamic resources support parameter completion. For example:

</template>
<template #zh>

动态资源支持参数补全。例如：

</template>
</BiRow>

<BiRow>
<template #en>

* Typing "Par" as input for `weather://forecast/{city}` might suggest "Paris" or "Park City"
* Typing "JFK" for `flights://search/{airport}` might suggest "JFK - John F. Kennedy International"

</template>
<template #zh>

* 为 `weather://forecast/{city}` 输入「Par」时，系统可能会建议「Paris」或「Park City」
* 为 `flights://search/{airport}` 输入「JFK」时，可能会建议「JFK - John F. Kennedy International」

</template>
</BiRow>

<BiRow>
<template #en>

The system helps discover valid values without requiring exact format knowledge.

</template>
<template #zh>

系统会帮助用户发现有效取值，无需事先了解确切格式。

</template>
</BiRow>

<BiRow>
<template #en>

#### User Interaction Model

</template>
<template #zh>

#### 用户交互模型

</template>
</BiRow>

<BiRow>
<template #en>

Resources are application-driven, giving them flexibility in how they retrieve, process, and present available context. Common interaction patterns include:

</template>
<template #zh>

资源由应用驱动（application-driven），应用因此可以灵活地检索、处理和呈现可用上下文。常见的交互模式包括：

</template>
</BiRow>

<BiRow>
<template #en>

* Tree or list views for browsing resources in familiar folder-like structures
* Search and filter interfaces for finding specific resources
* Automatic context inclusion or smart suggestions based on heuristics or AI selection
* Manual or bulk selection interfaces for including single or multiple resources

</template>
<template #zh>

* 树形或列表视图，让用户在熟悉的类文件夹结构中浏览资源
* 用于查找特定资源的搜索与过滤界面
* 自动纳入上下文，或基于启发式规则、AI 选择的智能建议
* 用于纳入单个或多个资源的手动或批量选择界面

</template>
</BiRow>

<BiRow>
<template #en>

Applications are free to implement resource discovery through any interface pattern that suits their needs. The protocol doesn't mandate specific UI patterns, allowing for resource pickers with preview capabilities, smart suggestions based on current conversation context, bulk selection for including multiple resources, or integration with existing file browsers and data explorers.

</template>
<template #zh>

应用可以自由选择适合自身需求的界面模式来实现资源发现。协议并不强制特定 UI 模式，因此可以实现带预览功能的资源选择器、基于当前对话上下文的智能建议、用于纳入多个资源的批量选择，或与现有文件浏览器、数据浏览器集成。

</template>
</BiRow>

<BiRow>
<template #en>

### Prompts

</template>
<template #zh>

### 提示词

</template>
</BiRow>

<BiRow>
<template #en>

Prompts provide reusable templates. They allow MCP server authors to provide parameterized prompts for a domain, or showcase how to best use the MCP server.

</template>
<template #zh>

提示词提供可复用的模板。MCP 服务器的作者可以借此为特定领域提供参数化提示词，或展示这个 MCP 服务器的最佳用法。

</template>
</BiRow>

<BiRow>
<template #en>

#### How Prompts Work

</template>
<template #zh>

#### 提示词的工作原理

</template>
</BiRow>

<BiRow>
<template #en>

Prompts are structured templates that define expected inputs and interaction patterns. They are user-controlled, requiring explicit invocation rather than automatic triggering. Prompts can be context-aware, referencing available resources and tools to create comprehensive workflows. Similar to resources, prompts support parameter completion to help users discover valid argument values.

</template>
<template #zh>

提示词是结构化模板，定义了预期的输入和交互模式。提示词由用户控制（user-controlled），需要显式调用，而不是自动触发。提示词可以感知上下文，引用可用的资源和工具来构建完整的工作流。与资源类似，提示词也支持参数补全，帮助用户发现有效的参数取值。

</template>
</BiRow>

<BiRow>
<template #en>

**Protocol operations:**

</template>
<template #zh>

**协议操作：**

</template>
</BiRow>

<BiRow>
<template #en>

| Method         | Purpose                    | Returns                               |
| -------------- | -------------------------- | ------------------------------------- |
| `prompts/list` | Discover available prompts | Array of prompt descriptors           |
| `prompts/get`  | Retrieve prompt details    | Full prompt definition with arguments |

</template>
<template #zh>

| 方法           | 用途           | 返回                   |
| -------------- | -------------- | ---------------------- |
| `prompts/list` | 发现可用提示词 | 提示词描述符数组       |
| `prompts/get`  | 检索提示词详情 | 带参数的完整提示词定义 |

</template>
</BiRow>

<BiRow>
<template #en>

#### Example: Streamlined Workflows

</template>
<template #zh>

#### 示例：精简工作流

</template>
</BiRow>

<BiRow>
<template #en>

Prompts provide structured templates for common tasks. In the travel planning context:

</template>
<template #zh>

提示词为常见任务提供结构化模板。在旅行规划的场景下：

</template>
</BiRow>

<BiRow>
<template #en>

**"Plan a vacation" prompt:**

</template>
<template #zh>

**「规划度假」提示词：**

</template>
</BiRow>

<BiRow>
<template #en>

```json theme={null}
{
  "name": "plan-vacation",
  "title": "Plan a vacation",
  "description": "Guide through vacation planning process",
  "arguments": [
{ "name": "destination", "type": "string", "required": true },
{ "name": "duration", "type": "number", "description": "days" },
{ "name": "budget", "type": "number", "required": false },
{ "name": "interests", "type": "array", "items": { "type": "string" } }
  ]
}
```

</template>
<template #zh>

```json theme={null}
{
  "name": "plan-vacation",
  "title": "Plan a vacation",
  "description": "Guide through vacation planning process",
  "arguments": [
{ "name": "destination", "type": "string", "required": true },
{ "name": "duration", "type": "number", "description": "days" },
{ "name": "budget", "type": "number", "required": false },
{ "name": "interests", "type": "array", "items": { "type": "string" } }
  ]
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Rather than unstructured natural language input, the prompt system enables:

</template>
<template #zh>

有了提示词系统，用户无需输入非结构化的自然语言，而是可以：

</template>
</BiRow>

<BiRow>
<template #en>

1. Selection of the "Plan a vacation" template
2. Structured input: Barcelona, 7 days, \$3000, \["beaches", "architecture", "food"]
3. Consistent workflow execution based on the template

</template>
<template #zh>

1. 选择「规划度假」模板
2. 结构化输入：巴塞罗那、7 天、\$3000、\["beaches", "architecture", "food"]
3. 按照模板一致地执行工作流

</template>
</BiRow>

<BiRow>
<template #en>

#### User Interaction Model

</template>
<template #zh>

#### 用户交互模型

</template>
</BiRow>

<BiRow>
<template #en>

Prompts are user-controlled, requiring explicit invocation. The protocol gives implementers freedom to design interfaces that feel natural within their application. Key principles include:

</template>
<template #zh>

提示词由用户控制，需要显式调用。协议给实现者留出了自由，可以在自己的应用中设计自然贴切的界面。关键原则包括：

</template>
</BiRow>

<BiRow>
<template #en>

* Easy discovery of available prompts
* Clear descriptions of what each prompt does
* Natural argument input with validation
* Transparent display of the prompt's underlying template

</template>
<template #zh>

* 易于发现可用提示词
* 清晰描述每个提示词的作用
* 自然流畅、带校验的参数输入
* 透明展示提示词背后的模板

</template>
</BiRow>

<BiRow>
<template #en>

Applications typically expose prompts through various UI patterns such as:

</template>
<template #zh>

应用通常通过各种 UI 模式呈现提示词，例如：

</template>
</BiRow>

<BiRow>
<template #en>

* Slash commands (typing "/" to see available prompts like /plan-vacation)
* Command palettes for searchable access
* Dedicated UI buttons for frequently used prompts
* Context menus that suggest relevant prompts

</template>
<template #zh>

* 斜杠命令（输入 "/" 即可看到 /plan-vacation 等可用提示词）
* 提供可搜索访问入口的命令面板
* 面向常用提示词的专属 UI 按钮
* 能推荐相关提示词的上下文菜单

</template>
</BiRow>

<BiRow>
<template #en>

## Bringing Servers Together

</template>
<template #zh>

## 让多个服务器协同工作

</template>
</BiRow>

<BiRow>
<template #en>

The real power of MCP emerges when multiple servers work together, combining their specialized capabilities through a unified interface.

</template>
<template #zh>

当多个服务器协同工作、通过统一界面整合各自的专业能力时，MCP 的真正威力才得以显现。

</template>
</BiRow>

<BiRow>
<template #en>

### Example: Multi-Server Travel Planning

</template>
<template #zh>

### 示例：多服务器旅行规划

</template>
</BiRow>

<BiRow>
<template #en>

Consider a personalized AI travel planner application, with three connected servers:

</template>
<template #zh>

设想一个个性化的 AI 旅行规划应用，它连接了三个服务器：

</template>
</BiRow>

<BiRow>
<template #en>

* **Travel Server** - Handles flights, hotels, and itineraries
* **Weather Server** - Provides climate data and forecasts
* **Calendar/Email Server** - Manages schedules and communications

</template>
<template #zh>

* **旅行服务器** - 处理航班、酒店和行程
* **天气服务器** - 提供气候数据和预报
* **日历/邮件服务器** - 管理日程与通信

</template>
</BiRow>

<BiRow>
<template #en>

#### The Complete Flow

</template>
<template #zh>

#### 完整流程

</template>
</BiRow>

<BiRow>
<template #en>

1. **User invokes a prompt with parameters:**

</template>
<template #zh>

1. **用户带参数调用提示词：**

</template>
</BiRow>

<BiRow>
<template #en>

   ```json theme={null}
   {
 "prompt": "plan-vacation",
 "arguments": {
   "destination": "Barcelona",
   "departure_date": "2024-06-15",
   "return_date": "2024-06-22",
   "budget": 3000,
   "travelers": 2
 }
   }
   ```

</template>
<template #zh>

   ```json theme={null}
   {
 "prompt": "plan-vacation",
 "arguments": {
   "destination": "Barcelona",
   "departure_date": "2024-06-15",
   "return_date": "2024-06-22",
   "budget": 3000,
   "travelers": 2
 }
   }
   ```

</template>
</BiRow>

<BiRow>
<template #en>

2. **User selects resources to include:**
   * `calendar://my-calendar/June-2024` (from Calendar Server)
   * `travel://preferences/europe` (from Travel Server)
   * `travel://past-trips/Spain-2023` (from Travel Server)
3. **AI processes the request using tools:**

</template>
<template #zh>

2. **用户选择要纳入的资源：**
   * `calendar://my-calendar/June-2024`（来自日历服务器）
   * `travel://preferences/europe`（来自旅行服务器）
   * `travel://past-trips/Spain-2023`（来自旅行服务器）
3. **AI 使用工具处理请求：**

</template>
</BiRow>

<BiRow>
<template #en>

   The AI first reads all selected resources to gather context - identifying available dates from the calendar, learning preferred airlines and hotel types from travel preferences, and discovering previously enjoyed locations from past trips.

</template>
<template #zh>

   AI 首先读取所有选中的资源来收集上下文——从日历中找出可用日期，从旅行偏好中了解偏好的航空公司和酒店类型，并从过往行程中发现曾经喜欢去的地方。

</template>
</BiRow>

<BiRow>
<template #en>

   Using this context, the AI then executes the prompt provided by the AI application. In our example, the AI application exposes the weather tools from the connected MCP weather server to the model. Because weather can affect travel plans, the AI chooses to call `checkWeather()` when interpreting the prompt.

</template>
<template #zh>

   接着，AI 利用这些上下文执行 AI 应用提供的提示词。在我们的例子中，AI 应用把所连接的 MCP 天气服务器中的天气工具暴露给了模型。由于天气可能影响旅行计划，AI 在解读提示词时选择调用 `checkWeather()`。

</template>
</BiRow>

<BiRow>
<template #en>

   As a result the AI executes a series of tools:

</template>
<template #zh>

   于是，AI 执行了一系列工具：

</template>
</BiRow>

<BiRow>
<template #en>

   * `searchFlights()` - Queries airlines for NYC to Barcelona flights
   * `checkWeather()` - Retrieves climate forecasts for travel dates

</template>
<template #zh>

   * `searchFlights()` - 向各家航空公司查询纽约到巴塞罗那的航班
   * `checkWeather()` - 获取旅行日期的气候预报

</template>
</BiRow>

<BiRow>
<template #en>

   The AI then uses this information to create the booking and following steps, requesting approval from the user where necessary:

</template>
<template #zh>

   随后，AI 利用这些信息完成预订及后续步骤，并在需要时请求用户批准：

</template>
</BiRow>

<BiRow>
<template #en>

   * `bookHotel()` - Finds hotels within the specified budget
   * `createCalendarEvent()` - Adds the trip to the user's calendar
   * `sendEmail()` - Sends confirmation with trip details

</template>
<template #zh>

   * `bookHotel()` - 在指定预算内找到合适的酒店
   * `createCalendarEvent()` - 把行程加入用户日历
   * `sendEmail()` - 发送包含行程详情的确认邮件

</template>
</BiRow>

<BiRow>
<template #en>

**The result:** Through multiple MCP servers, the user researched and booked a Barcelona trip tailored to their schedule. The "Plan a Vacation" prompt guided the AI to combine Resources (calendar availability and travel history) with Tools (searching flights, booking hotels, updating calendars) across different servers—gathering context and executing the booking. A task that could have taken hours was completed in minutes using MCP.

</template>
<template #zh>

**结果：**借助多个 MCP 服务器，用户调研并预订了一次契合自己日程的巴塞罗那之行。「规划度假」提示词引导 AI 跨不同服务器组合资源（日历空闲时间和旅行历史）与工具（搜索航班、预订酒店、更新日历）——收集上下文并完成预订。原本可能耗费数小时的任务，用 MCP 几分钟就完成了。

</template>
</BiRow>
