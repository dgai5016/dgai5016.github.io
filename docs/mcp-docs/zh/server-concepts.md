# 理解 MCP 服务器

MCP 服务器是一类程序，通过标准化的协议接口向 AI 应用暴露特定能力。

常见的例子包括：用于文档访问的文件系统服务器、用于数据查询的数据库服务器、用于代码管理的 GitHub 服务器、用于团队沟通的 Slack 服务器，以及用于日程安排的日历服务器。

## 服务器的核心功能

服务器通过三个基本构件提供功能：

| 功能         | 说明                                                                                                                                                                                       | 示例                                       | 由谁控制        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------- |
| **工具**     | 可供 LLM 主动调用的函数，模型会根据用户请求决定何时使用。工具可以写入数据库、调用外部 API、修改文件或触发其他逻辑。                                                                            | 搜索航班<br />发送消息<br />创建日历事件      | 模型            |
| **资源**     | 被动数据源，以只读方式提供用于上下文的信息，例如文件内容、数据库 schema 或 API 文档。                                                                                                          | 检索文档<br />访问知识库<br />读取日历        | 应用            |
| **提示词**   | 预置的指令模板，用于指导模型配合特定工具和资源完成工作。                                                                                                                                       | 规划一次度假<br />总结我的会议<br />起草一封邮件 | 用户            |

下面用一个假想场景来演示这三项功能各自的作用，并展示它们如何协同工作。

### 工具

工具让 AI 模型能够执行动作。每个工具都定义了一个具体操作，且输入和输出都有明确的类型。模型会根据上下文请求执行工具。

#### 工具的工作原理

工具是由 schema 定义、可供 LLM 调用的接口。MCP 使用 JSON Schema 进行校验。每个工具只执行一个操作，输入和输出都有清晰定义。工具在执行前可能需要用户同意，这有助于确保用户始终掌控模型执行的动作。

**协议操作：**

| 方法         | 用途         | 返回                     |
| ------------ | ------------ | ------------------------ |
| `tools/list` | 发现可用工具 | 带 schema 的工具定义数组 |
| `tools/call` | 执行特定工具 | 工具执行结果             |

**工具定义示例：**

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

#### 示例：旅行预订

工具让 AI 应用能够代表用户执行动作。在旅行规划场景中，AI 应用可能会使用多个工具来帮助预订度假行程：

**航班搜索**

```
searchFlights(origin: "NYC", destination: "Barcelona", date: "2024-06-15")
```

查询多家航空公司，返回结构化的航班选项。

**日历占位**

```
createCalendarEvent(title: "Barcelona Trip", startDate: "2024-06-15", endDate: "2024-06-22")
```

在用户的日历中标记旅行日期。

**邮件通知**

```
sendEmail(to: "team@work.com", subject: "Out of Office", body: "...")
```

自动向同事发送外出回复邮件。

#### 用户交互模型

工具由模型控制（model-controlled），也就是说，AI 模型可以自动发现并调用它们。不过，MCP 通过多种机制强调人工监督。

出于信任与安全的考虑，应用可以通过多种机制实现用户控制，例如：

* 在界面中展示可用工具，让用户设定某个工具在特定交互中是否可用
* 针对单次工具执行的批准对话框
* 用于预先批准某些安全操作的权限设置
* 记录全部工具执行及其结果的活动日志

### 资源

资源提供了对信息的结构化访问，AI 应用可以检索这些信息，并作为上下文提供给模型。

#### 资源的工作原理

资源暴露来自文件、API、数据库或任何其他来源的数据，AI 需要这些数据来理解上下文。应用可以直接访问这些信息，并自行决定如何使用——是选取相关部分、基于嵌入（embedding）进行搜索，还是把全部内容交给模型。

每个资源都有唯一的 URI（例如 `file:///path/to/document.md`），并声明其 MIME 类型，以便对内容做恰当处理。

资源支持两种发现模式：

* **直接资源（Direct Resources）** - 指向特定数据的固定 URI。示例：`calendar://events/2024` - 返回 2024 年的日历空闲时间
* **资源模板（Resource Templates）** - 带参数的动态 URI，用于灵活查询。示例：
  * `travel://activities/{city}/{category}` - 按城市和类别返回活动
  * `travel://activities/barcelona/museums` - 返回巴塞罗那的所有博物馆

资源模板包含标题、描述和预期的 MIME 类型等元数据，因而可被发现、自文档化。

**协议操作：**

| 方法                       | 用途               | 返回               |
| -------------------------- | ------------------ | ------------------ |
| `resources/list`           | 列出可用的直接资源 | 资源描述符数组     |
| `resources/templates/list` | 发现资源模板       | 资源模板定义数组   |
| `resources/read`           | 检索资源内容       | 带元数据的资源数据 |
| `subscriptions/listen`     | 监视资源变化       | 更新通知流         |

要监视特定资源的变化，客户端会发送 [`subscriptions/listen`](https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions) 请求，并在 `resourceSubscriptions` 过滤器中列出要监视的资源 URI。每当被监视的资源发生变化，服务器就会在相应的流上发送 `notifications/resources/updated` 通知。

#### 示例：获取旅行规划上下文

继续沿用旅行规划的例子，资源让 AI 应用能够访问相关信息：

* **日历数据**（`calendar://events/2024`）- 查看用户的空闲时间
* **旅行证件**（`file:///Documents/Travel/passport.pdf`）- 访问重要证件
* **历史行程**（`trips://history/barcelona-2023`）- 参考过去的旅行和偏好

AI 应用检索这些资源后自行决定如何处理：是用嵌入或关键词搜索选取数据子集，还是把原始数据直接交给模型。

本例中，它把日历数据、天气信息和旅行偏好提供给模型，使模型能够查看空闲时间、查询天气模式并参考过往的旅行偏好。

**资源模板示例：**

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

这些模板让查询更加灵活。以天气数据为例，用户可以访问任意城市/日期组合的预报；以航班为例，可以搜索任意两个机场之间的航线。当用户已输入「NYC」作为 `origin` 机场，又开始输入「Bar」作为 `destination` 机场时，系统可以建议「Barcelona (BCN)」或「Barbados (BGI)」。

#### 参数补全

动态资源支持参数补全。例如：

* 为 `weather://forecast/{city}` 输入「Par」时，系统可能会建议「Paris」或「Park City」
* 为 `flights://search/{airport}` 输入「JFK」时，可能会建议「JFK - John F. Kennedy International」

系统会帮助用户发现有效取值，无需事先了解确切格式。

#### 用户交互模型

资源由应用驱动（application-driven），应用因此可以灵活地检索、处理和呈现可用上下文。常见的交互模式包括：

* 树形或列表视图，让用户在熟悉的类文件夹结构中浏览资源
* 用于查找特定资源的搜索与过滤界面
* 自动纳入上下文，或基于启发式规则、AI 选择的智能建议
* 用于纳入单个或多个资源的手动或批量选择界面

应用可以自由选择适合自身需求的界面模式来实现资源发现。协议并不强制特定 UI 模式，因此可以实现带预览功能的资源选择器、基于当前对话上下文的智能建议、用于纳入多个资源的批量选择，或与现有文件浏览器、数据浏览器集成。

### 提示词

提示词提供可复用的模板。MCP 服务器的作者可以借此为特定领域提供参数化提示词，或展示这个 MCP 服务器的最佳用法。

#### 提示词的工作原理

提示词是结构化模板，定义了预期的输入和交互模式。提示词由用户控制（user-controlled），需要显式调用，而不是自动触发。提示词可以感知上下文，引用可用的资源和工具来构建完整的工作流。与资源类似，提示词也支持参数补全，帮助用户发现有效的参数取值。

**协议操作：**

| 方法           | 用途           | 返回                   |
| -------------- | -------------- | ---------------------- |
| `prompts/list` | 发现可用提示词 | 提示词描述符数组       |
| `prompts/get`  | 检索提示词详情 | 带参数的完整提示词定义 |

#### 示例：精简工作流

提示词为常见任务提供结构化模板。在旅行规划的场景下：

**「规划度假」提示词：**

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

有了提示词系统，用户无需输入非结构化的自然语言，而是可以：

1. 选择「规划度假」模板
2. 结构化输入：巴塞罗那、7 天、\$3000、\["beaches", "architecture", "food"]
3. 按照模板一致地执行工作流

#### 用户交互模型

提示词由用户控制，需要显式调用。协议给实现者留出了自由，可以在自己的应用中设计自然贴切的界面。关键原则包括：

* 易于发现可用提示词
* 清晰描述每个提示词的作用
* 自然流畅、带校验的参数输入
* 透明展示提示词背后的模板

应用通常通过各种 UI 模式呈现提示词，例如：

* 斜杠命令（输入 "/" 即可看到 /plan-vacation 等可用提示词）
* 提供可搜索访问入口的命令面板
* 面向常用提示词的专属 UI 按钮
* 能推荐相关提示词的上下文菜单

## 让多个服务器协同工作

当多个服务器协同工作、通过统一界面整合各自的专业能力时，MCP 的真正威力才得以显现。

### 示例：多服务器旅行规划

设想一个个性化的 AI 旅行规划应用，它连接了三个服务器：

* **旅行服务器** - 处理航班、酒店和行程
* **天气服务器** - 提供气候数据和预报
* **日历/邮件服务器** - 管理日程与通信

#### 完整流程

1. **用户带参数调用提示词：**

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

2. **用户选择要纳入的资源：**
   * `calendar://my-calendar/June-2024`（来自日历服务器）
   * `travel://preferences/europe`（来自旅行服务器）
   * `travel://past-trips/Spain-2023`（来自旅行服务器）
3. **AI 使用工具处理请求：**

   AI 首先读取所有选中的资源来收集上下文——从日历中找出可用日期，从旅行偏好中了解偏好的航空公司和酒店类型，并从过往行程中发现曾经喜欢去的地方。

   接着，AI 利用这些上下文执行 AI 应用提供的提示词。在我们的例子中，AI 应用把所连接的 MCP 天气服务器中的天气工具暴露给了模型。由于天气可能影响旅行计划，AI 在解读提示词时选择调用 `checkWeather()`。

   于是，AI 执行了一系列工具：

   * `searchFlights()` - 向各家航空公司查询纽约到巴塞罗那的航班
   * `checkWeather()` - 获取旅行日期的气候预报

   随后，AI 利用这些信息完成预订及后续步骤，并在需要时请求用户批准：

   * `bookHotel()` - 在指定预算内找到合适的酒店
   * `createCalendarEvent()` - 把行程加入用户日历
   * `sendEmail()` - 发送包含行程详情的确认邮件

**结果：**借助多个 MCP 服务器，用户调研并预订了一次契合自己日程的巴塞罗那之行。「规划度假」提示词引导 AI 跨不同服务器组合资源（日历空闲时间和旅行历史）与工具（搜索航班、预订酒店、更新日历）——收集上下文并完成预订。原本可能耗费数小时的任务，用 MCP 几分钟就完成了。
