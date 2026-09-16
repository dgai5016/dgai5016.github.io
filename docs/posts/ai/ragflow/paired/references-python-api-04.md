<BiRow>
<template #en>

## Memory Management

</template>
<template #zh>

## 记忆管理

</template>
</BiRow>

<BiRow>
<template #en>

### Create Memory

</template>
<template #zh>

### 创建记忆

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.create_memory(
    name: str,
    memory_type: list[str],
    embd_id: str,
    llm_id: str
) -> Memory
```

</template>
<template #zh>

```python
RAGFlow.create_memory(
    name: str,
    memory_type: list[str],
    embd_id: str,
    llm_id: str
) -> Memory
```

</template>
</BiRow>

<BiRow>
<template #en>

Create a new memory.

</template>
<template #zh>

创建一个新记忆。

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

##### name: `string`, *Required*

</template>
<template #zh>

##### name：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The unique name of the memory to create. It must adhere to the following requirements:

</template>
<template #zh>

新建记忆的唯一名称。必须满足以下要求：

</template>
</BiRow>

<BiRow>
<template #en>

- Basic Multilingual Plane (BMP) only
- Maximum 128 characters

</template>
<template #zh>

- 仅限基本多文种平面（BMP）字符
- 最多 128 个字符

</template>
</BiRow>

<BiRow>
<template #en>

##### memory_type: `list[str]`, *Required*

</template>
<template #zh>

##### memory_type：`list[str]`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the types of memory to extract. Available options:

</template>
<template #zh>

指定要提取的记忆类型。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `raw`: The raw dialogue content between the user and the agent . *Required by default*.
- `semantic`: General knowledge and facts about the user and world.
- `episodic`: Time-stamped records of specific events and experiences.
- `procedural`: Learned skills, habits, and automated procedures.

</template>
<template #zh>

- `raw`：用户与 Agent 之间的原始对话内容。*默认必需*。
- `semantic`：关于用户和世界的一般性知识与事实。
- `episodic`：带有时间戳的具体事件与经历记录。
- `procedural`：习得的技能、习惯和自动化流程。

</template>
</BiRow>

<BiRow>
<template #en>

##### embd_id: `string`, *Required*

</template>
<template #zh>

##### embd_id：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The name of the embedding model to use. For example: `"BAAI/bge-large-zh-v1.5@BAAI"`

</template>
<template #zh>

要使用的嵌入模型名称。例如：`"BAAI/bge-large-zh-v1.5@BAAI"`

</template>
</BiRow>

<BiRow>
<template #en>

- Maximum 255 characters
- Must follow `model_name@model_factory` format

</template>
<template #zh>

- 最多 255 个字符
- 必须符合 `model_name@model_factory` 格式

</template>
</BiRow>

<BiRow>
<template #en>

##### llm_id: `string`, *Required*

</template>
<template #zh>

##### llm_id：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

</template>
<template #zh>

要使用的对话模型名称。例如：`"glm-4-flash@ZHIPU-AI"`

</template>
</BiRow>

<BiRow>
<template #en>

- Maximum 255 characters
- Must follow `model_name@model_factory` format

</template>
<template #zh>

- 最多 255 个字符
- 必须符合 `model_name@model_factory` 格式

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

- Success: A `memory` object.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个 `memory` 对象。
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
memory = rag_object.create_memory("name", ["raw"], "BAAI/bge-large-zh-v1.5@SILICONFLOW", "glm-4-flash@ZHIPU-AI")
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory = rag_object.create_memory("name", ["raw"], "BAAI/bge-large-zh-v1.5@SILICONFLOW", "glm-4-flash@ZHIPU-AI")
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

### Update Memory

</template>
<template #zh>

### 更新记忆

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.update(
	update_dict: dict
) -> Memory
```

</template>
<template #zh>

```python
Memory.update(
	update_dict: dict
) -> Memory
```

</template>
</BiRow>

<BiRow>
<template #en>

Updates configurations for a specified memory.

</template>
<template #zh>

更新指定记忆的配置。

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

##### update_dict: `dict`, *Required*

</template>
<template #zh>

##### update_dict：`dict`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

Configurations to update. Available configurations:

</template>
<template #zh>

要更新的配置。可用配置：

</template>
</BiRow>

<BiRow>
<template #en>

- `name`: `string`, *Optional*

</template>
<template #zh>

- `name`：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  The revised name of the memory.

</template>
<template #zh>

  修改后的记忆名称。

</template>
</BiRow>

<BiRow>
<template #en>

  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters, *Optional*
- `avatar`: `string`, *Optional*

</template>
<template #zh>

  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符，*可选*
- `avatar`：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  The updated base64 encoding of the avatar.

</template>
<template #zh>

  更新后的头像 base64 编码。

</template>
</BiRow>

<BiRow>
<template #en>

  - Maximum 65535 characters
- `permissions`:  `enum<string>`, *Optional*

</template>
<template #zh>

  - 最多 65535 个字符
- `permissions`：`enum<string>`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  The updated memory permission. Available options:

</template>
<template #zh>

  更新后的记忆权限。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

  - `"me"`: (Default) Only you can manage the memory.
  - `"team"`: All team members can manage the memory.
- `llm_id`: `string`, *Optional*

</template>
<template #zh>

  - `"me"`：（默认）仅你自己可以管理该记忆。
  - `"team"`：所有团队成员都可以管理该记忆。
- `llm_id`：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

</template>
<template #zh>

  要使用的对话模型名称。例如：`"glm-4-flash@ZHIPU-AI"`

</template>
</BiRow>

<BiRow>
<template #en>

  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `description`: `string`, *Optional*

</template>
<template #zh>

  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `description`：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  The description of the memory. Defaults to `None`.

</template>
<template #zh>

  记忆的描述。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- `memory_size`: `int`, *Optional*

</template>
<template #zh>

- `memory_size`：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  Defaults to `5*1024*1024` Bytes. Accounts for each message's content + its embedding vector (≈ Content + Dimensions × 8 Bytes). Example: A 1 KB message with 1024-dim embedding uses ~9 KB. The 5 MB default limit holds ~500 such messages.

</template>
<template #zh>

  默认为 5*1024*1024 字节。空间占用按每条消息的内容 + 其嵌入向量计算（≈ 内容 + 维度数 × 8 字节）。例如：一条 1 KB 的消息配 1024 维嵌入约占 9 KB，5 MB 的默认上限约可容纳 500 条这样的消息。

</template>
</BiRow>

<BiRow>
<template #en>

  - Maximum 10 * 1024 * 1024 Bytes
- `forgetting_policy`: `enum<string>`, *Optional*

</template>
<template #zh>

  - 最大 10 * 1024 * 1024 字节
- `forgetting_policy`：`enum<string>`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  Evicts existing data based on the chosen policy when the size limit is reached, freeing up space for new messages. Available options:

</template>
<template #zh>

  当达到大小上限时，按所选策略逐出已有数据，为新消息腾出空间。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

  - `"FIFO"`: (Default) Prioritize messages with the earliest `forget_at` time for removal. When the pool of messages that have `forget_at` set is insufficient, it falls back to selecting messages in ascending order of their `valid_at` (oldest first).
- `temperature`: (*Body parameter*), `float`, *Optional*

</template>
<template #zh>

  - `"FIFO"`：（默认）优先移除 `forget_at` 时间最早的消息。当已设置 `forget_at` 的消息池不够用时，会退化为按 `valid_at` 升序（最旧优先）选择消息。
- `temperature`：（*请求体参数*），`float`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  Adjusts output randomness. Lower = more deterministic; higher = more creative.

</template>
<template #zh>

  调整输出的随机性。值越低越确定；越高越有创造性。

</template>
</BiRow>

<BiRow>
<template #en>

  - Range [0, 1]
- `system_prompt`: (*Body parameter*), `string`, *Optional*

</template>
<template #zh>

  - 取值范围 [0, 1]
- `system_prompt`：（*请求体参数*），`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  Defines the system-level instructions and role for the AI assistant. It is automatically assembled based on the selected `memory_type` by `PromptAssembler` in `memory/utils/prompt_util.py`. This prompt sets the foundational behavior and context for the entire conversation.

</template>
<template #zh>

  定义 AI 助手的系统级指令与角色。它由 `memory/utils/prompt_util.py` 中的 `PromptAssembler` 根据所选 `memory_type` 自动组装。该提示词为整段对话设定基础行为与上下文。

</template>
</BiRow>

<BiRow>
<template #en>

  - Keep the `OUTPUT REQUIREMENTS` and `OUTPUT FORMAT` parts unchanged.
- `user_prompt`: (*Body parameter*), `string`, *Optional*

</template>
<template #zh>

  - 保持 `OUTPUT REQUIREMENTS` 和 `OUTPUT FORMAT` 部分不变。
- `user_prompt`：（*请求体参数*），`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

  Represents the user's custom setting, which is the specific question or instruction the AI needs to respond to directly. Defaults to `None`.

</template>
<template #zh>

  表示用户的自定义设置，即 AI 需要直接回应的具体问题或指令。默认为 `None`。

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

- Success: A `memory` object.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个 `memory` 对象。
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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update({"name": "New_name"})
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update({"name": "New_name"})
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

### List Memory

</template>
<template #zh>

### 列出记忆

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.list_memory(
    page: int = 1,
    page_size: int = 50,
    tenant_id: str | list[str] = None,
    memory_type: str | list[str] = None,
    storage_type: str = None,
    keywords: str = None) -> dict
```

</template>
<template #zh>

```python
RAGFlow.list_memory(
    page: int = 1,
    page_size: int = 50,
    tenant_id: str | list[str] = None,
    memory_type: str | list[str] = None,
    storage_type: str = None,
    keywords: str = None) -> dict
```

</template>
</BiRow>

<BiRow>
<template #en>

List memories.

</template>
<template #zh>

列出记忆。

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

##### page: `int`, *Optional*

</template>
<template #zh>

##### page：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the datasets will be displayed. Defaults to `1`

</template>
<template #zh>

指定数据集显示的页码。默认为 `1`

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`, *Optional*

</template>
<template #zh>

##### page_size：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The number of memories on each page. Defaults to `50`.

</template>
<template #zh>

每页的记忆数量。默认为 `50`。

</template>
</BiRow>

<BiRow>
<template #en>

##### tenant_id: `string` or `list[str]`, *Optional*

</template>
<template #zh>

##### tenant_id：`string` 或 `list[str]`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The owner's ID, supports search multiple IDs.

</template>
<template #zh>

所有者的 ID，支持搜索多个 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### memory_type: `string` or `list[str]`, *Optional*

</template>
<template #zh>

##### memory_type：`string` 或 `list[str]`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The type of memory (as set during creation). A memory matches if its type is **included in** the provided value(s). Available options:

</template>
<template #zh>

记忆的类型（创建时设置）。若某条记忆的类型**包含于**所给值之中，即视为匹配。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `raw`
- `semantic`
- `episodic`
- `procedural`

</template>
<template #zh>

- `raw`
- `semantic`
- `episodic`
- `procedural`

</template>
</BiRow>

<BiRow>
<template #en>

##### storage_type: `string`, *Optional*

</template>
<template #zh>

##### storage_type：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The storage format of messages. Available options:

</template>
<template #zh>

消息的存储格式。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `table`: (Default)

</template>
<template #zh>

- `table`：（默认）

</template>
</BiRow>

<BiRow>
<template #en>

##### keywords: `string`, *Optional*

</template>
<template #zh>

##### keywords：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The name of memory to retrieve, supports fuzzy search.

</template>
<template #zh>

要检索的记忆名称，支持模糊搜索。

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

Success: A dict of `Memory` object list and total count.

</template>
<template #zh>

成功：一个字典，包含 `Memory` 对象列表与总数。

</template>
</BiRow>

<BiRow>
<template #en>

```json
{"memory_list": list[Memory], "total_count": int}
```

</template>
<template #zh>

```json
{"memory_list": list[Memory], "total_count": int}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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

```
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.list_memory()
```

</template>
<template #zh>

```
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.list_memory()
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

### Get Memory Config

</template>
<template #zh>

### 获取记忆配置

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.get_config()
```

</template>
<template #zh>

```python
Memory.get_config()
```

</template>
</BiRow>

<BiRow>
<template #en>

Get the configuration of a specified memory.

</template>
<template #zh>

获取指定记忆的配置。

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

None

</template>
<template #zh>

无

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

Success: A `Memory` object.

</template>
<template #zh>

成功：一个 `Memory` 对象。

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_config()
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_config()
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

### Delete Memory

</template>
<template #zh>

### 删除记忆

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.delete_memory(
    memory_id: str
) -> None
```

</template>
<template #zh>

```python
RAGFlow.delete_memory(
    memory_id: str
) -> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Delete a specified memory.

</template>
<template #zh>

删除指定的记忆。

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

##### memory_id: `string`, *Required*

</template>
<template #zh>

##### memory_id：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the memory.

</template>
<template #zh>

记忆的 ID。

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

Success: Nothing

</template>
<template #zh>

成功：无

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_memory("your memory_id")
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_memory("your memory_id")
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

### List messages of a memory

</template>
<template #zh>

### 列出记忆的消息

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.list_memory_messages(
    agent_id: str | list[str]=None,
    keywords: str=None,
    page: int=1,
    page_size: int=50
) -> dict
```

</template>
<template #zh>

```python
Memory.list_memory_messages(
    agent_id: str | list[str]=None,
    keywords: str=None,
    page: int=1,
    page_size: int=50
) -> dict
```

</template>
</BiRow>

<BiRow>
<template #en>

List the messages of a specified memory.

</template>
<template #zh>

列出指定记忆的消息。

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

##### agent_id: `string` or `list[str]`, *Optional*

</template>
<template #zh>

##### agent_id：`string` 或 `list[str]`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Filters messages by the ID of their source agent. Supports multiple values.

</template>
<template #zh>

按消息来源 Agent 的 ID 筛选消息。支持多个值。

</template>
</BiRow>

<BiRow>
<template #en>

##### keywords: `string`, *Optional*

</template>
<template #zh>

##### keywords：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Filters messages by their session ID. This field supports fuzzy search.

</template>
<template #zh>

按消息的会话 ID 筛选消息。该字段支持模糊搜索。

</template>
</BiRow>

<BiRow>
<template #en>

##### page: `int`, *Optional*

</template>
<template #zh>

##### page：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the messages will be displayed. Defaults to `1`.

</template>
<template #zh>

指定消息显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`, *Optional*

</template>
<template #zh>

##### page_size：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The number of messages on each page. Defaults to `50`.

</template>
<template #zh>

每页的消息数量。默认为 `50`。

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

Success: a dict of messages and meta info.

</template>
<template #zh>

成功：一个字典，包含消息与元信息。

</template>
</BiRow>

<BiRow>
<template #en>

```json
{"messages": {"message_list": [{message dict}], "total_count": int}, "storage_type": "table"}
```

</template>
<template #zh>

```json
{"messages": {"message_list": [{message dict}], "total_count": int}, "storage_type": "table"}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.list_memory_messages()
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.list_memory_messages()
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

### Add Message

</template>
<template #zh>

### 添加消息

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.add_message(
    memory_id: list[str],
    agent_id: str,
    session_id: str,
    user_input: str,
    agent_response: str,
    user_id: str = ""
) -> str
```

</template>
<template #zh>

```python
RAGFlow.add_message(
    memory_id: list[str],
    agent_id: str,
    session_id: str,
    user_input: str,
    agent_response: str,
    user_id: str = ""
) -> str
```

</template>
</BiRow>

<BiRow>
<template #en>

Add a message to specified memories.

</template>
<template #zh>

向指定记忆添加消息。

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

##### memory_id: `list[str]`, *Required*

</template>
<template #zh>

##### memory_id：`list[str]`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the memories to save messages.

</template>
<template #zh>

要保存消息的记忆的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`, *Required*

</template>
<template #zh>

##### agent_id：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's source agent.

</template>
<template #zh>

消息来源 Agent 的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### session_id: `string`, *Required*

</template>
<template #zh>

##### session_id：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's session.

</template>
<template #zh>

消息所属会话的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### user_input: `string`, *Required*

</template>
<template #zh>

##### user_input：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The text input provided by the user.

</template>
<template #zh>

用户提供的文本输入。

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_response: `string`, *Required*

</template>
<template #zh>

##### agent_response：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The text response generated by the AI agent.

</template>
<template #zh>

AI Agent 生成的文本响应。

</template>
</BiRow>

<BiRow>
<template #en>

##### user_id: `string`, *Optional*

</template>
<template #zh>

##### user_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The user participating in the conversation with the agent. Defaults to `""`.

</template>
<template #zh>

参与该 Agent 对话的用户。默认为 `""`。

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

Success:  A text `"All add to task."`

</template>
<template #zh>

成功：一段文本 `"All add to task."`

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
message_payload = {
    "memory_id": memory_ids,
    "agent_id": agent_id,
    "session_id": session_id,
    "user_id": "",
    "user_input": "Your question here",
    "agent_response": """
Your agent response here
"""
}
rag_object.add_message(**message_payload)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
message_payload = {
    "memory_id": memory_ids,
    "agent_id": agent_id,
    "session_id": session_id,
    "user_id": "",
    "user_input": "Your question here",
    "agent_response": """
Your agent response here
"""
}
rag_object.add_message(**message_payload)
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

### Forget Message

</template>
<template #zh>

### 遗忘消息

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.forget_message(message_id: int) -> bool
```

</template>
<template #zh>

```python
Memory.forget_message(message_id: int) -> bool
```

</template>
</BiRow>

<BiRow>
<template #en>

Forget a specified message. After forgetting, this message will not be retrieved by agents, and it will also be prioritized for cleanup by the forgetting policy.

</template>
<template #zh>

遗忘指定的消息。消息被遗忘后不会再被 Agent 检索到，也会被遗忘策略优先清理。

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

##### message_id: `int`, *Required*

</template>
<template #zh>

##### message_id：`int`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message to forget.

</template>
<template #zh>

要遗忘的消息的 ID。

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

Success: True

</template>
<template #zh>

成功：True

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.forget_message(message_id)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.forget_message(message_id)
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

### Update message status

</template>
<template #zh>

### 更新消息状态

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.update_message_status(message_id: int, status: bool) -> bool
```

</template>
<template #zh>

```python
Memory.update_message_status(message_id: int, status: bool) -> bool
```

</template>
</BiRow>

<BiRow>
<template #en>

Update message status, enable or disable a message. Once a message is disabled, it will not be retrieved by agents.

</template>
<template #zh>

更新消息状态，启用或禁用消息。消息一旦被禁用，就不会再被 Agent 检索到。

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

##### message_id: `int`, *Required*

</template>
<template #zh>

##### message_id：`int`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message to enable or disable.

</template>
<template #zh>

要启用或禁用的消息的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### status: `bool`, *Required*

</template>
<template #zh>

##### status：`bool`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The status of message. `True` = `enabled`, `False` = `disabled`.

</template>
<template #zh>

消息的状态。`True` = `enabled`，`False` = `disabled`。

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

Success: `True`

</template>
<template #zh>

成功：`True`

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update_message_status(message_id, True)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update_message_status(message_id, True)
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

### Search message

</template>
<template #zh>

### 搜索消息

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.search_message(
    query: str,
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    user_id: str=None,
    similarity_threshold: float=0.2,
    keywords_similarity_weight: float=0.7,
    top_n: int=10
) -> list[dict]
```

</template>
<template #zh>

```python
RAGFlow.search_message(
    query: str,
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    user_id: str=None,
    similarity_threshold: float=0.2,
    keywords_similarity_weight: float=0.7,
    top_n: int=10
) -> list[dict]
```

</template>
</BiRow>

<BiRow>
<template #en>

Searches and retrieves messages from memory based on the provided `query` and other configuration parameters.

</template>
<template #zh>

根据所提供的 `query` 及其他配置参数，从记忆中搜索并检索消息。

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

##### query: `string`, *Required*

</template>
<template #zh>

##### query：`string`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The search term or natural language question used to find relevant messages.

</template>
<template #zh>

用于查找相关消息的搜索词或自然语言问题。

</template>
</BiRow>

<BiRow>
<template #en>

##### memory_id: `list[str]`, *Required*

</template>
<template #zh>

##### memory_id：`list[str]`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the memories to search. Supports multiple values.

</template>
<template #zh>

要搜索的记忆的 ID。支持多个值。

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`, *Optional*

</template>
<template #zh>

##### agent_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's source agent. Defaults to `None`.

</template>
<template #zh>

消息来源 Agent 的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### session_id: `string`, *Optional*

</template>
<template #zh>

##### session_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's session. Defaults to `None`.

</template>
<template #zh>

消息所属会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### user_id: `string`, *Optional*

</template>
<template #zh>

##### user_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The user participating in the conversation with the agent. Defaults to `None`.

</template>
<template #zh>

参与该 Agent 对话的用户。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### similarity_threshold: `float`, *Optional*

</template>
<template #zh>

##### similarity_threshold：`float`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The minimum cosine similarity score required for a message to be considered a match. A higher value yields more precise but fewer results. Defaults to `0.2`.

</template>
<template #zh>

消息被视为匹配所需的最低余弦相似度得分。值越高，结果越精确但数量越少。默认为 `0.2`。

</template>
</BiRow>

<BiRow>
<template #en>

- Range [0.0, 1.0]

</template>
<template #zh>

- 取值范围 [0.0, 1.0]

</template>
</BiRow>

<BiRow>
<template #en>

##### keywords_similarity_weight: `float`, *Optional*

</template>
<template #zh>

##### keywords_similarity_weight：`float`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Controls the influence of keyword matching versus semantic (embedding-based) matching in the final relevance score. A value of 0.5 gives them equal weight. Defaults to `0.7`.

</template>
<template #zh>

控制关键词匹配与语义（基于嵌入）匹配在最终相关性得分中的影响力。取 0.5 时二者权重相等。默认为 `0.7`。

</template>
</BiRow>

<BiRow>
<template #en>

- Range [0.0, 1.0]

</template>
<template #zh>

- 取值范围 [0.0, 1.0]

</template>
</BiRow>

<BiRow>
<template #en>

##### top_n: `int`, *Optional*

</template>
<template #zh>

##### top_n：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The maximum number of most relevant messages to return. This limits the result set size for efficiency. Defaults to `10`.

</template>
<template #zh>

返回的最相关消息的最大数量。以此限制结果集大小，保证效率。默认为 `10`。

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

Success: A list of `message` dict.

</template>
<template #zh>

成功：`message` 字典列表。

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
rag_object.search_message("your question", ["your memory_id"])
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.search_message("your question", ["your memory_id"])
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

### Get Recent Messages

</template>
<template #zh>

### 获取最近消息

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.get_recent_messages(
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    limit: int=10
) -> list[dict]
```

</template>
<template #zh>

```python
RAGFlow.get_recent_messages(
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    limit: int=10
) -> list[dict]
```

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the most recent messages from specified memories. Typically, accepts a `limit` parameter to control the number of messages returned.

</template>
<template #zh>

从指定记忆检索最近的消息。通常通过 `limit` 参数控制返回的消息数量。

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

##### memory_id: `list[str]`, *Required*

</template>
<template #zh>

##### memory_id：`list[str]`，*必需*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the memories to search. Supports multiple values.

</template>
<template #zh>

要搜索的记忆的 ID。支持多个值。

</template>
</BiRow>

<BiRow>
<template #en>

##### agent_id: `string`, *Optional*

</template>
<template #zh>

##### agent_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's source agent. Defaults to `None`.

</template>
<template #zh>

消息来源 Agent 的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### session_id: `string`, *Optional*

</template>
<template #zh>

##### session_id：`string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the message's session. Defaults to `None`.

</template>
<template #zh>

消息所属会话的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### limit: `int`, *Optional*

</template>
<template #zh>

##### limit：`int`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

Control the number of messages returned. Defaults to `10`.

</template>
<template #zh>

控制返回的消息数量。默认为 `10`。

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

Success: A list of `message` dict.

</template>
<template #zh>

成功：`message` 字典列表。

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
rag_object.get_recent_messages(["your memory_id"])
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.get_recent_messages(["your memory_id"])
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

### Get Message Content

</template>
<template #zh>

### 获取消息内容

</template>
</BiRow>

<BiRow>
<template #en>

```python
Memory.get_message_content(message_id: int)
```

</template>
<template #zh>

```python
Memory.get_message_content(message_id: int)
```

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the full content and embed vector of a specific message using its unique message ID.

</template>
<template #zh>

使用消息的唯一 ID 检索指定消息的完整内容与嵌入向量。

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

##### message_id: `int`, *Required*

</template>
<template #zh>

##### message_id：`int`，*必需*

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

Success: A `message` dict.

</template>
<template #zh>

成功：一个 `message` 字典。

</template>
</BiRow>

<BiRow>
<template #en>

Failure: `Exception`

</template>
<template #zh>

失败：`Exception`

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
from ragflow_sdk import RAGFlow,Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_message_content(message_id)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow,Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_message_content(message_id)
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
