# Python API 参考（第 3 部分）

## 会话管理

---

### 创建与对话助手的会话

```python
Chat.create_session(name: str = "New session") -> Session
```

创建与当前对话助手的会话。

#### 参数

##### name：`string`

要创建的对话会话的名称。

#### 返回

- 成功：一个 `Session` 对象，包含以下属性：
  - `id`：`string` 所创建会话的自动生成唯一标识符。
  - `name`：`string` 所创建会话的名称。
  - `message`：`list[Message]` 所创建会话的开场消息。默认值：`[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `chat_id`：`string` 关联的对话助手的 ID。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session()
```

---

### 更新对话助手的会话

```python
Session.update(update_message: dict)
```

更新该对话助手的当前会话。

#### 参数

##### update_message：`dict[str, Any]`，*必需*

一个字典，表示要更新的属性，仅包含一个键：

- `"name"`：`string` 修改后的会话名称。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session("session_name")
session.update({"name": "updated_name"})
```

---

### 列出对话助手的会话

```python
Chat.list_sessions(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    id: str = None,
    name: str = None,
    user_id: str = None
) -> list[Session]
```

列出与当前对话助手关联的会话。

#### 参数

##### page：`int`

指定会话显示的页码。默认为 `1`。

##### page_size：`int`

每页的会话数量。默认为 `30`。

##### orderby：`string`

会话排序所依据的字段。可用选项：

- `"create_time"`（默认）
- `"update_time"`

##### desc：`bool`

指示检索到的会话是否按降序排序。默认为 `True`。

##### id：`string`

要检索的对话会话的 ID。默认为 `None`。

##### name：`string`

要检索的对话会话的名称。默认为 `None`。

##### user_id：`str`

可选的用户自定义 ID，用于筛选会话。默认为 `None`。

#### 返回

- 成功：与当前对话助手关联的 `Session` 对象列表。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
for session in assistant.list_sessions():
    print(session)
```

---

### 删除对话助手的会话

```python
Chat.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除当前对话助手的会话。

#### 参数

##### ids：`list[str]` 或 `None`

要删除的会话的 ID。默认为 `None`。

- 如果省略该参数，或设为 `null` 或空数组，则不删除任何会话。
- 如果提供 ID 数组，则仅删除与这些 ID 匹配的会话。

##### delete_all：`bool`

当 `ids` 省略，或设为 `None` 或空列表时，是否删除当前对话助手的所有会话。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
assistant.delete_sessions(ids=["id_1","id_2"])
assistant.delete_sessions(delete_all=True)
```

---

### 与对话助手对话

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message, iter[Message]]
```

向指定对话助手提问，开启一段 AI 驱动的对话。

:::tip 注意
流式模式下，并非所有响应都包含引用，这取决于系统的判断。
:::

#### 参数

##### question：`string`，*必需*

用于开启 AI 驱动对话的问题。默认为 `""`

##### stream：`bool`

指示是否以流式方式输出响应：

- `True`：启用流式输出（默认）。
- `False`：禁用流式输出。

##### **kwargs

系统提示词（prompt(system)）中的参数。

#### 返回

- 当 `stream` 设为 `False` 时，返回包含该问题响应的 `Message` 对象
- 当 `stream` 设为 `True` 时，返回包含多个 `message` 对象的迭代器（`iter[Message]`）

以下是 `Message` 对象的属性：

##### id：`string`

自动生成的消息 ID。

##### content：`string`

消息的内容。默认为 `"Hi! I am your assistant, can I help you?"`。

##### reference：`list[Chunk]`

一个 `Chunk` 对象列表，表示消息的引用，每个对象包含以下属性：

- `id` `string`
  分块 ID。
- `content` `string`
  分块的内容。
- `img_id` `string`
  分块快照的 ID。仅当分块来源为图片、PPT、PPTX 或 PDF 文件时适用。
- `document_id` `string`
  被引用文档的 ID。
- `document_name` `string`
  被引用文档的名称。
- `document_metadata` `dict`
  可选的文档元数据，仅当 `extra_body.reference_metadata.include` 为 `true` 时返回。
- `position` `list[str]`
  分块在被引用文档中的位置信息。
- `dataset_id` `string`
  被引用文档所属数据集的 ID。
- `similarity` `float`
  分块的综合相似度得分，取值范围为 `0` 到 `1`，值越大表示相似度越高。它是 `vector_similarity` 与 `term_similarity` 的加权和。
- `vector_similarity` `float`
  分块的向量相似度得分，取值范围为 `0` 到 `1`，值越大表示向量嵌入之间越相似。
- `term_similarity` `float`
  分块的关键词相似度得分，取值范围为 `0` 到 `1`，值越大表示关键词之间越相似。

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session()

print("\n==================== Miss R =====================\n")
print("Hello. What can I do for you?")

while True:
    question = input("\n==================== User =====================\n> ")
    print("\n==================== Miss R =====================\n")

    cont = ""
    for ans in session.ask(question, stream=True):
        print(ans.content[len(cont):], end='', flush=True)
        cont = ans.content
```

---

### 创建与 Agent 的会话

```python
Agent.create_session(**kwargs) -> Session
```

创建与当前 Agent 的会话。

#### 参数

##### **kwargs

`begin` 组件中的参数。

还支持：

- `release`（`bool | str`，可选）：设为 `True`（或 `"true"`）时，仅与已发布的 Agent 应用创建会话。

#### 返回

- 成功：一个 `Session` 对象，包含以下属性：
  - `id`：`string` 所创建会话的自动生成唯一标识符。
  - `message`：`list[Message]` 所创建会话助手的消息。默认值：`[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `agent_id`：`string` 关联的 Agent 的 ID。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent_id = "AGENT_ID"
agent = rag_object.get_agent(agent_id)
session = agent.create_session()
```

---

### 与 Agent 对话

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message | iter[Message]]
```

通过统一的补全端点向指定 Agent 提问。

:::tip 注意
流式模式下，并非所有响应都包含引用，这取决于系统的判断。
:::

#### 参数

##### question：`string`

发送给 Agent 的用户消息。如果 **Begin** 组件接受参数，`question` 可以为空字符串。

##### stream：`bool`

指示是否以流式方式输出响应：

- `True`：启用流式输出。
- `False`：禁用流式输出。

##### kwargs：`dict`

转发给补全 API 的额外请求参数。常用选项：

- `inputs`：在 **Begin** 组件中定义的变量。
- `session_id`：继续已有会话，而不是新建会话。
- `release`：使用 Agent 最新发布的版本。
- `return_trace`：在响应中包含执行轨迹信息。
- 当前工作流支持的其他自定义 Begin 组件参数。

#### 返回

- 当 `stream` 设为 `False` 时，返回包含该问题响应的 `Message` 对象
- 当 `stream` 设为 `True` 时，返回包含多个 `message` 对象的迭代器（`iter[Message]`）

以下是 `Message` 对象的属性：

##### id：`string`

自动生成的消息 ID。

##### content：`string`

消息的内容。默认为 `"Hi! I am your assistant, can I help you?"`。

##### reference：`list[Chunk]`

一个 `Chunk` 对象列表，表示消息的引用，每个对象包含以下属性：

- `id` `string`
  分块 ID。
- `content` `string`
  分块的内容。
- `image_id` `string`
  分块快照的 ID。仅当分块来源为图片、PPT、PPTX 或 PDF 文件时适用。
- `document_id` `string`
  被引用文档的 ID。
- `document_name` `string`
  被引用文档的名称。
- `document_metadata` `dict`
  可选的文档元数据，仅当 `extra_body.reference_metadata.include` 为 `true` 时返回。
- `position` `list[str]`
  分块在被引用文档中的位置信息。
- `dataset_id` `string`
  被引用文档所属数据集的 ID。
- `similarity` `float`
  分块的综合相似度得分，取值范围为 `0` 到 `1`，值越大表示相似度越高。它是 `vector_similarity` 与 `term_similarity` 的加权和。
- `vector_similarity` `float`
  分块的向量相似度得分，取值范围为 `0` 到 `1`，值越大表示向量嵌入之间越相似。
- `term_similarity` `float`
  分块的关键词相似度得分，取值范围为 `0` 到 `1`，值越大表示关键词之间越相似。

#### 示例

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
session = agent.create_session()

print("\n===== Miss R ====\n")
print("Hello. What can I do for you?")

while True:
    question = input("\n===== User ====\n> ")
    print("\n==== Miss R ====\n")

    cont = ""
    for ans in session.ask(question, stream=True):
        print(ans.content[len(cont):], end='', flush=True)
        cont = ans.content
```

使用 Begin 输入并请求轨迹输出：

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent = rag_object.get_agent("AGENT_ID")
session = agent.create_session()

message = session.ask(
    "",
    stream=False,
    inputs={
        "line_var": {
            "type": "line",
            "value": "I am line_var",
        }
    },
    return_trace=True,
)

print(message.content)
print(message.reference)
```

---

### 列出 Agent 会话

```python
Agent.list_sessions(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True,
    id: str = None
) -> List[Session]
```

列出与当前 Agent 关联的会话。

#### 参数

##### page：`int`

指定会话显示的页码。默认为 `1`。

##### page_size：`int`

每页的会话数量。默认为 `30`。

##### orderby：`string`

会话排序所依据的字段。可用选项：

- `"create_time"`
- `"update_time"`（默认）

##### desc：`bool`

指示检索到的会话是否按降序排序。默认为 `True`。

##### id：`string`

要检索的 Agent 会话的 ID。默认为 `None`。

#### 返回

- 成功：与当前 Agent 关联的 `Session` 对象列表。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
sessions = agent.list_sessions()
for session in sessions:
    print(session)
```
---
### 删除 Agent 的会话

```python
Agent.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除 Agent 的会话。

#### 参数

##### ids：`list[str]` 或 `None`

要删除的会话的 ID。默认为 `None`。

- 如果省略该参数，或设为 `None` 或空数组，则不删除任何会话。
- 如果提供 ID 数组，则仅删除与这些 ID 匹配的会话。

##### delete_all：`bool`

当 `ids` 省略，或设为 `None` 或空列表时，是否删除当前 Agent 的所有会话。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
agent.delete_sessions(ids=["id_1","id_2"])
agent.delete_sessions(delete_all=True)
```

---

## Agent 管理

---

### 列出 Agent

```python
RAGFlow.list_agents(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True
) -> List[Agent]
```

列出 Agent。这是一个集合 API，始终返回列表。

#### 参数

##### page：`int`

指定 Agent 显示的页码。默认为 `1`。

##### page_size：`int`

每页的 Agent 数量。默认为 `30`。

##### orderby：`string`

结果排序所依据的属性。可用选项：

- `"create_time"`
- `"update_time"`（默认）

##### desc：`bool`

指示检索到的 Agent 是否按降序排序。默认为 `True`。

#### 返回

- 成功：`Agent` 对象列表。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for agent in rag_object.list_agents():
    print(agent)
```

---

### 获取 Agent

```python
RAGFlow.get_agent(agent_id: str) -> Agent
```

按 ID 获取单个 Agent，并返回详细的 Agent 数据。

#### 参数

##### agent_id：`string`

要检索的 Agent 的 ID。

#### 返回

- 成功：一个 `Agent` 对象。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent = rag_object.get_agent("AGENT_ID")
print(agent)
```

---

### 创建 Agent

```python
RAGFlow.create_agent(
    title: str,
    dsl: dict,
    description: str | None = None,
    canvas_type: str | None = None
) -> None
```

创建 Agent。

#### 参数

##### title：`string`

指定 Agent 的标题。

##### dsl：`dict`

指定 Agent 的画布 DSL。

##### description：`string`

Agent 的描述。默认为 `None`。

##### canvas_type：`string | None`

Agent 的画布类型。默认为 `None`。

#### 返回

- 成功：无。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.create_agent(
  title="Test Agent",
  description="A test agent",
  dsl={
    # ... canvas DSL here ...
  }
)
```

---

### 更新 Agent

```python
RAGFlow.update_agent(
    agent_id: str,
    title: str | None = None,
    description: str | None = None,
    dsl: dict | None = None,
    canvas_type: str | None = None,
) -> None
```

更新 Agent。

#### 参数

##### agent_id：`string`

指定要更新的 Agent 的 id。

##### title：`string`

指定 Agent 的新标题。如果不想更新此项，设为 `None`。

##### dsl：`dict`

指定 Agent 的新画布 DSL。如果不想更新此项，设为 `None`。

##### description：`string`

Agent 的新描述。如果不想更新此项，设为 `None`。

##### canvas_type：`string | None`

Agent 的画布类型。默认为 `None`。

#### 返回

- 成功：无。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.update_agent(
  agent_id="58af890a2a8911f0a71a11b922ed82d6",
  title="Test Agent",
  description="A test agent",
  dsl={
    # ... canvas DSL here ...
  }
)
```

---

### 删除 Agent

```python
RAGFlow.delete_agent(
    agent_id: str
) -> None
```

删除 Agent。

#### 参数

##### agent_id：`string`

指定要删除的 Agent 的 id。

#### 返回

- 成功：无。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_agent("58af890a2a8911f0a71a11b922ed82d6")
```

---
