<BiRow>
<template #en>

## SESSION MANAGEMENT

</template>
<template #zh>

## 会话管理

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Create session with chat assistant

</template>
<template #zh>

### 创建与对话助手的会话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Chat.create_session(name: str = "New session") -> Session
```

</template>
<template #zh>

```python
Chat.create_session(name: str = "New session") -> Session
```

</template>
</BiRow>

<BiRow>
<template #en>

Creates a session with the current chat assistant.

</template>
<template #zh>

创建与当前对话助手的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### name: `string`

</template>
<template #zh>

##### name：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The name of the chat session to create.

</template>
<template #zh>

要创建的对话会话的名称。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A `Session` object containing the following attributes:
  - `id`: `string` The auto-generated unique identifier of the created session.
  - `name`: `string` The name of the created session.
  - `message`: `list[Message]` The opening message of the created session. Default: `[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `chat_id`: `string` The ID of the associated chat assistant.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个 `Session` 对象，包含以下属性：
  - `id`：`string` 所创建会话的自动生成唯一标识符。
  - `name`：`string` 所创建会话的名称。
  - `message`：`list[Message]` 所创建会话的开场消息。默认值：`[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `chat_id`：`string` 关联的对话助手的 ID。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session()
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session()
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Update chat assistant's session

</template>
<template #zh>

### 更新对话助手的会话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Session.update(update_message: dict)
```

</template>
<template #zh>

```python
Session.update(update_message: dict)
```

</template>
</BiRow>

<BiRow>
<template #en>

Updates the current session of the current chat assistant.

</template>
<template #zh>

更新该对话助手的当前会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### update_message: `dict[str, Any]`, *Required*

</template>
<template #zh>

##### update_message：`dict[str, Any]`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

A dictionary representing the attributes to update, with only one key:

</template>
<template #zh>

一个字典，表示要更新的属性，仅包含一个键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"name"`: `string` The revised name of the session.

</template>
<template #zh>

- `"name"`：`string` 修改后的会话名称。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session("session_name")
session.update({"name": "updated_name"})
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session("session_name")
session.update({"name": "updated_name"})
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### List chat assistant's sessions

</template>
<template #zh>

### 列出对话助手的会话

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Lists sessions associated with the current chat assistant.

</template>
<template #zh>

列出与当前对话助手关联的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### page: `int`

</template>
<template #zh>

##### page：`int`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the sessions will be displayed. Defaults to `1`.

</template>
<template #zh>

指定会话显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`

</template>
<template #zh>

##### page_size：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The number of sessions on each page. Defaults to `30`.

</template>
<template #zh>

每页的会话数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### orderby: `string`

</template>
<template #zh>

##### orderby：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The field by which sessions should be sorted. Available options:

</template>
<template #zh>

会话排序所依据的字段。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"create_time"` (default)
- `"update_time"`

</template>
<template #zh>

- `"create_time"`（默认）
- `"update_time"`

</template>
</BiRow>

<BiRow>
<template #en>

##### desc: `bool`

</template>
<template #zh>

##### desc：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的会话是否按降序排序。默认为 `True`。

</template>
</BiRow>

<BiRow>
<template #en>

##### id: `string`

</template>
<template #zh>

##### id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the chat session to retrieve. Defaults to `None`.

</template>
<template #zh>

要检索的对话会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### name: `string`

</template>
<template #zh>

##### name：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The name of the chat session to retrieve. Defaults to `None`.

</template>
<template #zh>

要检索的对话会话的名称。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### user_id: `str`

</template>
<template #zh>

##### user_id：`str`

</template>
</BiRow>

<BiRow>
<template #en>

The optional user-defined ID to filter sessions by. Defaults to `None`.

</template>
<template #zh>

可选的用户自定义 ID，用于筛选会话。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of `Session` objects associated with the current chat assistant.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：与当前对话助手关联的 `Session` 对象列表。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
for session in assistant.list_sessions():
    print(session)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
for session in assistant.list_sessions():
    print(session)
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Delete chat assistant's sessions

</template>
<template #zh>

### 删除对话助手的会话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Chat.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
Chat.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes sessions of the current chat assistant by ID.

</template>
<template #zh>

按 ID 删除当前对话助手的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### ids: `list[str]` or `None`

</template>
<template #zh>

##### ids：`list[str]` 或 `None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the sessions to delete. Defaults to `None`.

</template>
<template #zh>

要删除的会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `null` or an empty array, no sessions are deleted.
- If an array of IDs is provided, only the sessions matching those IDs are deleted.

</template>
<template #zh>

- 如果省略该参数，或设为 `null` 或空数组，则不删除任何会话。
- 如果提供 ID 数组，则仅删除与这些 ID 匹配的会话。

</template>
</BiRow>

<BiRow>
<template #en>

##### delete_all: `bool`

</template>
<template #zh>

##### delete_all：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to delete all sessions of the current chat assistant when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 省略，或设为 `None` 或空列表时，是否删除当前对话助手的所有会话。默认为 `False`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
assistant.delete_sessions(ids=["id_1","id_2"])
assistant.delete_sessions(delete_all=True)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
assistant.delete_sessions(ids=["id_1","id_2"])
assistant.delete_sessions(delete_all=True)
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Converse with chat assistant

</template>
<template #zh>

### 与对话助手对话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message, iter[Message]]
```

</template>
<template #zh>

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message, iter[Message]]
```

</template>
</BiRow>

<BiRow>
<template #en>

Asks a specified chat assistant a question to start an AI-powered conversation.

</template>
<template #zh>

向指定对话助手提问，开启一段 AI 驱动的对话。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgment.
:::

</template>
<template #zh>

:::tip 注意
流式模式下，并非所有响应都包含引用，这取决于系统的判断。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### question: `string`, *Required*

</template>
<template #zh>

##### question：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The question to start an AI-powered conversation. Default to `""`

</template>
<template #zh>

用于开启 AI 驱动对话的问题。默认为 `""`

</template>
</BiRow>

<BiRow>
<template #en>

##### stream: `bool`

</template>
<template #zh>

##### stream：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether to output responses in a streaming way:

</template>
<template #zh>

指示是否以流式方式输出响应：

</template>
</BiRow>

<BiRow>
<template #en>

- `True`: Enable streaming (default).
- `False`: Disable streaming.

</template>
<template #zh>

- `True`：启用流式输出（默认）。
- `False`：禁用流式输出。

</template>
</BiRow>

<BiRow>
<template #en>

##### **kwargs

</template>
<template #zh>

##### **kwargs

</template>
</BiRow>

<BiRow>
<template #en>

The parameters in prompt(system).

</template>
<template #zh>

系统提示词（prompt(system)）中的参数。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- A `Message` object containing the response to the question if `stream` is set to `False`.
- An iterator containing multiple `message` objects (`iter[Message]`) if `stream` is set to `True`

</template>
<template #zh>

- 当 `stream` 设为 `False` 时，返回包含该问题响应的 `Message` 对象
- 当 `stream` 设为 `True` 时，返回包含多个 `message` 对象的迭代器（`iter[Message]`）

</template>
</BiRow>

<BiRow>
<template #en>

The following shows the attributes of a `Message` object:

</template>
<template #zh>

以下是 `Message` 对象的属性：

</template>
</BiRow>

<BiRow>
<template #en>

##### id: `string`

</template>
<template #zh>

##### id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The auto-generated message ID.

</template>
<template #zh>

自动生成的消息 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### content: `string`

</template>
<template #zh>

##### content：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The content of the message. Defaults to `"Hi! I am your assistant, can I help you?"`.

</template>
<template #zh>

消息的内容。默认为 `"Hi! I am your assistant, can I help you?"`。

</template>
</BiRow>

<BiRow>
<template #en>

##### reference: `list[Chunk]`

</template>
<template #zh>

##### reference：`list[Chunk]`

</template>
</BiRow>

<BiRow>
<template #en>

A list of `Chunk` objects representing references to the message, each containing the following attributes:

</template>
<template #zh>

一个 `Chunk` 对象列表，表示消息的引用，每个对象包含以下属性：

</template>
</BiRow>

<BiRow>
<template #en>

- `id` `string`
  The chunk ID.
- `content` `string`
  The content of the chunk.
- `img_id` `string`
  The ID of the snapshot of the chunk. Applicable only when the source of the chunk is an image, PPT, PPTX, or PDF file.
- `document_id` `string`
  The ID of the referenced document.
- `document_name` `string`
  The name of the referenced document.
- `document_metadata` `dict`
  Optional document metadata, returned only when `extra_body.reference_metadata.include` is `true`.
- `position` `list[str]`
  The location information of the chunk within the referenced document.
- `dataset_id` `string`
  The ID of the dataset to which the referenced document belongs.
- `similarity` `float`
  A composite similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity. It is the weighted sum of `vector_similarity` and `term_similarity`.
- `vector_similarity` `float`
  A vector similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity between vector embeddings.
- `term_similarity` `float`
  A keyword similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity between keywords.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Create session with agent

</template>
<template #zh>

### 创建与 Agent 的会话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Agent.create_session(**kwargs) -> Session
```

</template>
<template #zh>

```python
Agent.create_session(**kwargs) -> Session
```

</template>
</BiRow>

<BiRow>
<template #en>

Creates a session with the current agent.

</template>
<template #zh>

创建与当前 Agent 的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### **kwargs

</template>
<template #zh>

##### **kwargs

</template>
</BiRow>

<BiRow>
<template #en>

The parameters in `begin` component.

</template>
<template #zh>

`begin` 组件中的参数。

</template>
</BiRow>

<BiRow>
<template #en>

Also supports:

</template>
<template #zh>

还支持：

</template>
</BiRow>

<BiRow>
<template #en>

- `release` (`bool | str`, optional): When set to `True` (or `"true"`), creates a session with the published agent app only.

</template>
<template #zh>

- `release`（`bool | str`，可选）：设为 `True`（或 `"true"`）时，仅与已发布的 Agent 应用创建会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A `Session` object containing the following attributes:
  - `id`: `string` The auto-generated unique identifier of the created session.
  - `message`: `list[Message]` The messages of the created session assistant. Default: `[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `agent_id`: `string` The ID of the associated agent.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个 `Session` 对象，包含以下属性：
  - `id`：`string` 所创建会话的自动生成唯一标识符。
  - `message`：`list[Message]` 所创建会话助手的消息。默认值：`[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `agent_id`：`string` 关联的 Agent 的 ID。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent_id = "AGENT_ID"
agent = rag_object.get_agent(agent_id)
session = agent.create_session()
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent_id = "AGENT_ID"
agent = rag_object.get_agent(agent_id)
session = agent.create_session()
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Converse with agent

</template>
<template #zh>

### 与 Agent 对话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message | iter[Message]]
```

</template>
<template #zh>

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message | iter[Message]]
```

</template>
</BiRow>

<BiRow>
<template #en>

Asks a specified agent through the unified completion endpoint.

</template>
<template #zh>

通过统一的补全端点向指定 Agent 提问。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgment.
:::

</template>
<template #zh>

:::tip 注意
流式模式下，并非所有响应都包含引用，这取决于系统的判断。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### question: `string`

</template>
<template #zh>

##### question：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The user message sent to the agent. If the **Begin** component takes parameters, `question` can be an empty string.

</template>
<template #zh>

发送给 Agent 的用户消息。如果 **Begin** 组件接受参数，`question` 可以为空字符串。

</template>
</BiRow>

<BiRow>
<template #en>

##### stream: `bool`

</template>
<template #zh>

##### stream：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether to output responses in a streaming way:

</template>
<template #zh>

指示是否以流式方式输出响应：

</template>
</BiRow>

<BiRow>
<template #en>

- `True`: Enable streaming.
- `False`: Disable streaming.

</template>
<template #zh>

- `True`：启用流式输出。
- `False`：禁用流式输出。

</template>
</BiRow>

<BiRow>
<template #en>

##### kwargs: `dict`

</template>
<template #zh>

##### kwargs：`dict`

</template>
</BiRow>

<BiRow>
<template #en>

Additional request parameters forwarded to the completion API. Common options:

</template>
<template #zh>

转发给补全 API 的额外请求参数。常用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `inputs`: Variables defined in the **Begin** component.
- `session_id`: Continue an existing session instead of creating a new one.
- `release`: Use the latest published version of the agent.
- `return_trace`: Include execution trace information in the response.
- Other custom Begin component parameters supported by the current workflow.

</template>
<template #zh>

- `inputs`：在 **Begin** 组件中定义的变量。
- `session_id`：继续已有会话，而不是新建会话。
- `release`：使用 Agent 最新发布的版本。
- `return_trace`：在响应中包含执行轨迹信息。
- 当前工作流支持的其他自定义 Begin 组件参数。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- A `Message` object containing the response to the question if `stream` is set to `False`
- An iterator containing multiple `message` objects (`iter[Message]`) if `stream` is set to `True`

</template>
<template #zh>

- 当 `stream` 设为 `False` 时，返回包含该问题响应的 `Message` 对象
- 当 `stream` 设为 `True` 时，返回包含多个 `message` 对象的迭代器（`iter[Message]`）

</template>
</BiRow>

<BiRow>
<template #en>

The following shows the attributes of a `Message` object:

</template>
<template #zh>

以下是 `Message` 对象的属性：

</template>
</BiRow>

<BiRow>
<template #en>

##### id: `string`

</template>
<template #zh>

##### id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The auto-generated message ID.

</template>
<template #zh>

自动生成的消息 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### content: `string`

</template>
<template #zh>

##### content：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The content of the message. Defaults to `"Hi! I am your assistant, can I help you?"`.

</template>
<template #zh>

消息的内容。默认为 `"Hi! I am your assistant, can I help you?"`。

</template>
</BiRow>

<BiRow>
<template #en>

##### reference: `list[Chunk]`

</template>
<template #zh>

##### reference：`list[Chunk]`

</template>
</BiRow>

<BiRow>
<template #en>

A list of `Chunk` objects representing references to the message, each containing the following attributes:

</template>
<template #zh>

一个 `Chunk` 对象列表，表示消息的引用，每个对象包含以下属性：

</template>
</BiRow>

<BiRow>
<template #en>

- `id` `string`
  The chunk ID.
- `content` `string`
  The content of the chunk.
- `image_id` `string`
  The ID of the snapshot of the chunk. Applicable only when the source of the chunk is an image, PPT, PPTX, or PDF file.
- `document_id` `string`
  The ID of the referenced document.
- `document_name` `string`
  The name of the referenced document.
- `document_metadata` `dict`
  Optional document metadata, returned only when `extra_body.reference_metadata.include` is `true`.
- `position` `list[str]`
  The location information of the chunk within the referenced document.
- `dataset_id` `string`
  The ID of the dataset to which the referenced document belongs.
- `similarity` `float`
  A composite similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity. It is the weighted sum of `vector_similarity` and `term_similarity`.
- `vector_similarity` `float`
  A vector similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity between vector embeddings.
- `term_similarity` `float`
  A keyword similarity score of the chunk ranging from `0` to `1`, with a higher value indicating greater similarity between keywords.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Use Begin inputs and request trace output:

</template>
<template #zh>

使用 Begin 输入并请求轨迹输出：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### List agent sessions

</template>
<template #zh>

### 列出 Agent 会话

</template>
</BiRow>

<BiRow>
<template #en>

```python
Agent.list_sessions(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True,
    id: str = None
) -> List[Session]
```

</template>
<template #zh>

```python
Agent.list_sessions(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True,
    id: str = None
) -> List[Session]
```

</template>
</BiRow>

<BiRow>
<template #en>

Lists sessions associated with the current agent.

</template>
<template #zh>

列出与当前 Agent 关联的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### page: `int`

</template>
<template #zh>

##### page：`int`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the sessions will be displayed. Defaults to `1`.

</template>
<template #zh>

指定会话显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`

</template>
<template #zh>

##### page_size：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The number of sessions on each page. Defaults to `30`.

</template>
<template #zh>

每页的会话数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### orderby: `string`

</template>
<template #zh>

##### orderby：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The field by which sessions should be sorted. Available options:

</template>
<template #zh>

会话排序所依据的字段。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"create_time"`
- `"update_time"`(default)

</template>
<template #zh>

- `"create_time"`
- `"update_time"`（默认）

</template>
</BiRow>

<BiRow>
<template #en>

##### desc: `bool`

</template>
<template #zh>

##### desc：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的会话是否按降序排序。默认为 `True`。

</template>
</BiRow>

<BiRow>
<template #en>

##### id: `string`

</template>
<template #zh>

##### id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the agent session to retrieve. Defaults to `None`.

</template>
<template #zh>

要检索的 Agent 会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of `Session` objects associated with the current agent.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：与当前 Agent 关联的 `Session` 对象列表。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

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
### Delete agent's sessions

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

```python
Agent.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
Agent.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes sessions of an agent by ID.

</template>
<template #zh>

按 ID 删除 Agent 的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### ids: `list[str]` or `None`

</template>
<template #zh>

##### ids：`list[str]` 或 `None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the sessions to delete. Defaults to `None`.

</template>
<template #zh>

要删除的会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `None` or an empty array, no sessions are deleted.
- If an array of IDs is provided, only the sessions matching those IDs are deleted.

</template>
<template #zh>

- 如果省略该参数，或设为 `None` 或空数组，则不删除任何会话。
- 如果提供 ID 数组，则仅删除与这些 ID 匹配的会话。

</template>
</BiRow>

<BiRow>
<template #en>

##### delete_all: `bool`

</template>
<template #zh>

##### delete_all：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to delete all sessions of the current agent when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 省略，或设为 `None` 或空列表时，是否删除当前 Agent 的所有会话。默认为 `False`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
agent.delete_sessions(ids=["id_1","id_2"])
agent.delete_sessions(delete_all=True)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
agent.delete_sessions(ids=["id_1","id_2"])
agent.delete_sessions(delete_all=True)
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

## AGENT MANAGEMENT

</template>
<template #zh>

## Agent 管理

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### List agents

</template>
<template #zh>

### 列出 Agent

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.list_agents(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True
) -> List[Agent]
```

</template>
<template #zh>

```python
RAGFlow.list_agents(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True
) -> List[Agent]
```

</template>
</BiRow>

<BiRow>
<template #en>

Lists agents. This is a collection API and always returns a list.

</template>
<template #zh>

列出 Agent。这是一个集合 API，始终返回列表。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### page: `int`

</template>
<template #zh>

##### page：`int`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the agents will be displayed. Defaults to `1`.

</template>
<template #zh>

指定 Agent 显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`

</template>
<template #zh>

##### page_size：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The number of agents on each page. Defaults to `30`.

</template>
<template #zh>

每页的 Agent 数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### orderby: `string`

</template>
<template #zh>

##### orderby：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The attribute by which the results are sorted. Available options:

</template>
<template #zh>

结果排序所依据的属性。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"create_time"`
- `"update_time"` (default)

</template>
<template #zh>

- `"create_time"`
- `"update_time"`（默认）

</template>
</BiRow>

<BiRow>
<template #en>

##### desc: `bool`

</template>
<template #zh>

##### desc：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether the retrieved agents should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的 Agent 是否按降序排序。默认为 `True`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of `Agent` objects.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：`Agent` 对象列表。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for agent in rag_object.list_agents():
    print(agent)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for agent in rag_object.list_agents():
    print(agent)
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Get agent

</template>
<template #zh>

### 获取 Agent

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.get_agent(agent_id: str) -> Agent
```

</template>
<template #zh>

```python
RAGFlow.get_agent(agent_id: str) -> Agent
```

</template>
</BiRow>

<BiRow>
<template #en>

Gets a single agent by ID and returns the detailed agent payload.

</template>
<template #zh>

按 ID 获取单个 Agent，并返回详细的 Agent 数据。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`

</template>
<template #zh>

##### agent_id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the agent to retrieve.

</template>
<template #zh>

要检索的 Agent 的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: An `Agent` object.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `Agent` 对象。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent = rag_object.get_agent("AGENT_ID")
print(agent)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent = rag_object.get_agent("AGENT_ID")
print(agent)
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Create agent

</template>
<template #zh>

### 创建 Agent

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.create_agent(
    title: str,
    dsl: dict,
    description: str | None = None,
    canvas_type: str | None = None
) -> None
```

</template>
<template #zh>

```python
RAGFlow.create_agent(
    title: str,
    dsl: dict,
    description: str | None = None,
    canvas_type: str | None = None
) -> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Create an agent.

</template>
<template #zh>

创建 Agent。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### title: `string`

</template>
<template #zh>

##### title：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the title of the agent.

</template>
<template #zh>

指定 Agent 的标题。

</template>
</BiRow>

<BiRow>
<template #en>

##### dsl: `dict`

</template>
<template #zh>

##### dsl：`dict`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the canvas DSL of the agent.

</template>
<template #zh>

指定 Agent 的画布 DSL。

</template>
</BiRow>

<BiRow>
<template #en>

##### description: `string`

</template>
<template #zh>

##### description：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The description of the agent. Defaults to `None`.

</template>
<template #zh>

Agent 的描述。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### canvas_type: `string | None`

</template>
<template #zh>

##### canvas_type：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The canvas type of the agent. Defaults to `None`.

</template>
<template #zh>

Agent 的画布类型。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: Nothing.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：无。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Update agent

</template>
<template #zh>

### 更新 Agent

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.update_agent(
    agent_id: str,
    title: str | None = None,
    description: str | None = None,
    dsl: dict | None = None,
    canvas_type: str | None = None,
) -> None
```

</template>
<template #zh>

```python
RAGFlow.update_agent(
    agent_id: str,
    title: str | None = None,
    description: str | None = None,
    dsl: dict | None = None,
    canvas_type: str | None = None,
) -> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Update an agent.

</template>
<template #zh>

更新 Agent。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`

</template>
<template #zh>

##### agent_id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the id of the agent to be updated.

</template>
<template #zh>

指定要更新的 Agent 的 id。

</template>
</BiRow>

<BiRow>
<template #en>

##### title: `string`

</template>
<template #zh>

##### title：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the new title of the agent. `None` if you do not want to update this.

</template>
<template #zh>

指定 Agent 的新标题。如果不想更新此项，设为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### dsl: `dict`

</template>
<template #zh>

##### dsl：`dict`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the new canvas DSL of the agent. `None` if you do not want to update this.

</template>
<template #zh>

指定 Agent 的新画布 DSL。如果不想更新此项，设为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### description: `string`

</template>
<template #zh>

##### description：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The new description of the agent. `None` if you do not want to update this.

</template>
<template #zh>

Agent 的新描述。如果不想更新此项，设为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### canvas_type: `string | None`

</template>
<template #zh>

##### canvas_type：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The canvas type of the agent. Defaults to `None`.

</template>
<template #zh>

Agent 的画布类型。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: Nothing.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：无。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

### Delete agent

</template>
<template #zh>

### 删除 Agent

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.delete_agent(
    agent_id: str
) -> None
```

</template>
<template #zh>

```python
RAGFlow.delete_agent(
    agent_id: str
) -> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Delete an agent.

</template>
<template #zh>

删除 Agent。

</template>
</BiRow>

<BiRow>
<template #en>

#### Parameters

</template>
<template #zh>

#### 参数

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`

</template>
<template #zh>

##### agent_id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the id of the agent to be deleted.

</template>
<template #zh>

指定要删除的 Agent 的 id。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: Nothing.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：无。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_agent("58af890a2a8911f0a71a11b922ed82d6")
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_agent("58af890a2a8911f0a71a11b922ed82d6")
```

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>
