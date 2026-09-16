# Python API 参考（第 4 部分）

## 记忆管理

### 创建记忆

```python
RAGFlow.create_memory(
    name: str,
    memory_type: list[str],
    embd_id: str,
    llm_id: str
) -> Memory
```

创建一个新记忆。

#### 参数

##### name：`string`，*必需*

新建记忆的唯一名称。必须满足以下要求：

- 仅限基本多文种平面（BMP）字符
- 最多 128 个字符

##### memory_type：`list[str]`，*必需*

指定要提取的记忆类型。可用选项：

- `raw`：用户与 Agent 之间的原始对话内容。*默认必需*。
- `semantic`：关于用户和世界的一般性知识与事实。
- `episodic`：带有时间戳的具体事件与经历记录。
- `procedural`：习得的技能、习惯和自动化流程。

##### embd_id：`string`，*必需*

要使用的嵌入模型名称。例如：`"BAAI/bge-large-zh-v1.5@BAAI"`

- 最多 255 个字符
- 必须符合 `model_name@model_factory` 格式

##### llm_id：`string`，*必需*

要使用的对话模型名称。例如：`"glm-4-flash@ZHIPU-AI"`

- 最多 255 个字符
- 必须符合 `model_name@model_factory` 格式

#### 返回

- 成功：一个 `memory` 对象。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory = rag_object.create_memory("name", ["raw"], "BAAI/bge-large-zh-v1.5@SILICONFLOW", "glm-4-flash@ZHIPU-AI")
```

---

### 更新记忆

```python
Memory.update(
	update_dict: dict
) -> Memory
```

更新指定记忆的配置。

#### 参数

##### update_dict：`dict`，*必需*

要更新的配置。可用配置：

- `name`：`string`，*可选*

  修改后的记忆名称。

  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符，*可选*
- `avatar`：`string`，*可选*

  更新后的头像 base64 编码。

  - 最多 65535 个字符
- `permissions`：`enum<string>`，*可选*

  更新后的记忆权限。可用选项：

  - `"me"`：（默认）仅你自己可以管理该记忆。
  - `"team"`：所有团队成员都可以管理该记忆。
- `llm_id`：`string`，*可选*

  要使用的对话模型名称。例如：`"glm-4-flash@ZHIPU-AI"`

  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `description`：`string`，*可选*

  记忆的描述。默认为 `None`。

- `memory_size`：`int`，*可选*

  默认为 5*1024*1024 字节。空间占用按每条消息的内容 + 其嵌入向量计算（≈ 内容 + 维度数 × 8 字节）。例如：一条 1 KB 的消息配 1024 维嵌入约占 9 KB，5 MB 的默认上限约可容纳 500 条这样的消息。

  - 最大 10 * 1024 * 1024 字节
- `forgetting_policy`：`enum<string>`，*可选*

  当达到大小上限时，按所选策略逐出已有数据，为新消息腾出空间。可用选项：

  - `"FIFO"`：（默认）优先移除 `forget_at` 时间最早的消息。当已设置 `forget_at` 的消息池不够用时，会退化为按 `valid_at` 升序（最旧优先）选择消息。
- `temperature`：（*请求体参数*），`float`，*可选*

  调整输出的随机性。值越低越确定；越高越有创造性。

  - 取值范围 [0, 1]
- `system_prompt`：（*请求体参数*），`string`，*可选*

  定义 AI 助手的系统级指令与角色。它由 `memory/utils/prompt_util.py` 中的 `PromptAssembler` 根据所选 `memory_type` 自动组装。该提示词为整段对话设定基础行为与上下文。

  - 保持 `OUTPUT REQUIREMENTS` 和 `OUTPUT FORMAT` 部分不变。
- `user_prompt`：（*请求体参数*），`string`，*可选*

  表示用户的自定义设置，即 AI 需要直接回应的具体问题或指令。默认为 `None`。

#### 返回

- 成功：一个 `memory` 对象。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update({"name": "New_name"})
```

---

### 列出记忆

```python
RAGFlow.list_memory(
    page: int = 1,
    page_size: int = 50,
    tenant_id: str | list[str] = None,
    memory_type: str | list[str] = None,
    storage_type: str = None,
    keywords: str = None) -> dict
```

列出记忆。

#### 参数

##### page：`int`，*可选*

指定数据集显示的页码。默认为 `1`

##### page_size：`int`，*可选*

每页的记忆数量。默认为 `50`。

##### tenant_id：`string` 或 `list[str]`，*可选*

所有者的 ID，支持搜索多个 ID。

##### memory_type：`string` 或 `list[str]`，*可选*

记忆的类型（创建时设置）。若某条记忆的类型**包含于**所给值之中，即视为匹配。可用选项：

- `raw`
- `semantic`
- `episodic`
- `procedural`

##### storage_type：`string`，*可选*

消息的存储格式。可用选项：

- `table`：（默认）

##### keywords：`string`，*可选*

要检索的记忆名称，支持模糊搜索。

#### 返回

成功：一个字典，包含 `Memory` 对象列表与总数。

```json
{"memory_list": list[Memory], "total_count": int}
```

失败：`Exception`

#### 示例

```
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.list_memory()
```

---

### 获取记忆配置

```python
Memory.get_config()
```

获取指定记忆的配置。

#### 参数

无

#### 返回

成功：一个 `Memory` 对象。

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_config()
```

---

### 删除记忆

```python
RAGFlow.delete_memory(
    memory_id: str
) -> None
```

删除指定的记忆。

#### 参数

##### memory_id：`string`，*必需*

记忆的 ID。

#### 返回

成功：无

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_memory("your memory_id")
```

---

### 列出记忆的消息

```python
Memory.list_memory_messages(
    agent_id: str | list[str]=None,
    keywords: str=None,
    page: int=1,
    page_size: int=50
) -> dict
```

列出指定记忆的消息。

#### 参数

##### agent_id：`string` 或 `list[str]`，*可选*

按消息来源 Agent 的 ID 筛选消息。支持多个值。

##### keywords：`string`，*可选*

按消息的会话 ID 筛选消息。该字段支持模糊搜索。

##### page：`int`，*可选*

指定消息显示的页码。默认为 `1`。

##### page_size：`int`，*可选*

每页的消息数量。默认为 `50`。

#### 返回

成功：一个字典，包含消息与元信息。

```json
{"messages": {"message_list": [{message dict}], "total_count": int}, "storage_type": "table"}
```

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.list_memory_messages()
```

---

### 添加消息

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

向指定记忆添加消息。

#### 参数

##### memory_id：`list[str]`，*必需*

要保存消息的记忆的 ID。

##### agent_id：`string`，*必需*

消息来源 Agent 的 ID。

##### session_id：`string`，*必需*

消息所属会话的 ID。

##### user_input：`string`，*必需*

用户提供的文本输入。

##### agent_response：`string`，*必需*

AI Agent 生成的文本响应。

##### user_id：`string`，*可选*

参与该 Agent 对话的用户。默认为 `""`。

#### 返回

成功：一段文本 `"All add to task."`

失败：`Exception`

#### 示例

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

---

### 遗忘消息

```python
Memory.forget_message(message_id: int) -> bool
```

遗忘指定的消息。消息被遗忘后不会再被 Agent 检索到，也会被遗忘策略优先清理。

#### 参数

##### message_id：`int`，*必需*

要遗忘的消息的 ID。

#### 返回

成功：True

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.forget_message(message_id)
```

---

### 更新消息状态

```python
Memory.update_message_status(message_id: int, status: bool) -> bool
```

更新消息状态，启用或禁用消息。消息一旦被禁用，就不会再被 Agent 检索到。

#### 参数

##### message_id：`int`，*必需*

要启用或禁用的消息的 ID。

##### status：`bool`，*必需*

消息的状态。`True` = `enabled`，`False` = `disabled`。

#### 返回

成功：`True`

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update_message_status(message_id, True)
```

---

### 搜索消息

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

根据所提供的 `query` 及其他配置参数，从记忆中搜索并检索消息。

#### 参数

##### query：`string`，*必需*

用于查找相关消息的搜索词或自然语言问题。

##### memory_id：`list[str]`，*必需*

要搜索的记忆的 ID。支持多个值。

##### agent_id：`string`，*可选*

消息来源 Agent 的 ID。默认为 `None`。

##### session_id：`string`，*可选*

消息所属会话的 ID。默认为 `None`。

##### user_id：`string`，*可选*

参与该 Agent 对话的用户。默认为 `None`。

##### similarity_threshold：`float`，*可选*

消息被视为匹配所需的最低余弦相似度得分。值越高，结果越精确但数量越少。默认为 `0.2`。

- 取值范围 [0.0, 1.0]

##### keywords_similarity_weight：`float`，*可选*

控制关键词匹配与语义（基于嵌入）匹配在最终相关性得分中的影响力。取 0.5 时二者权重相等。默认为 `0.7`。

- 取值范围 [0.0, 1.0]

##### top_n：`int`，*可选*

返回的最相关消息的最大数量。以此限制结果集大小，保证效率。默认为 `10`。

#### 返回

成功：`message` 字典列表。

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.search_message("your question", ["your memory_id"])
```

---

### 获取最近消息

```python
RAGFlow.get_recent_messages(
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    limit: int=10
) -> list[dict]
```

从指定记忆检索最近的消息。通常通过 `limit` 参数控制返回的消息数量。

#### 参数

##### memory_id：`list[str]`，*必需*

要搜索的记忆的 ID。支持多个值。

##### agent_id：`string`，*可选*

消息来源 Agent 的 ID。默认为 `None`。

##### session_id：`string`，*可选*

消息所属会话的 ID。默认为 `None`。

##### limit：`int`，*可选*

控制返回的消息数量。默认为 `10`。

#### 返回

成功：`message` 字典列表。

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.get_recent_messages(["your memory_id"])
```

---

### 获取消息内容

```python
Memory.get_message_content(message_id: int)
```

使用消息的唯一 ID 检索指定消息的完整内容与嵌入向量。

#### 参数

##### message_id：`int`，*必需*

#### 返回

成功：一个 `message` 字典。

失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow,Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_message_content(message_id)
```

---
