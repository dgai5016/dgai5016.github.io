# Python API Reference (Part 4)

## Memory Management

### Create Memory

```python
RAGFlow.create_memory(
    name: str,
    memory_type: list[str],
    embd_id: str,
    llm_id: str
) -> Memory
```

Create a new memory.

#### Parameters

##### name: `string`, *Required*

The unique name of the memory to create. It must adhere to the following requirements:

- Basic Multilingual Plane (BMP) only
- Maximum 128 characters

##### memory_type: `list[str]`, *Required*

Specifies the types of memory to extract. Available options:

- `raw`: The raw dialogue content between the user and the agent . *Required by default*.
- `semantic`: General knowledge and facts about the user and world.
- `episodic`: Time-stamped records of specific events and experiences.
- `procedural`: Learned skills, habits, and automated procedures.

##### embd_id: `string`, *Required*

The name of the embedding model to use. For example: `"BAAI/bge-large-zh-v1.5@BAAI"`

- Maximum 255 characters
- Must follow `model_name@model_factory` format

##### llm_id: `string`, *Required*

The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

- Maximum 255 characters
- Must follow `model_name@model_factory` format

#### Returns

- Success: A `memory` object.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory = rag_object.create_memory("name", ["raw"], "BAAI/bge-large-zh-v1.5@SILICONFLOW", "glm-4-flash@ZHIPU-AI")
```

---

### Update Memory

```python
Memory.update(
	update_dict: dict
) -> Memory
```

Updates configurations for a specified memory.

#### Parameters

##### update_dict: `dict`, *Required*

Configurations to update. Available configurations:

- `name`: `string`, *Optional*

  The revised name of the memory.

  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters, *Optional*
- `avatar`: `string`, *Optional*

  The updated base64 encoding of the avatar.

  - Maximum 65535 characters
- `permissions`:  `enum<string>`, *Optional*

  The updated memory permission. Available options:

  - `"me"`: (Default) Only you can manage the memory.
  - `"team"`: All team members can manage the memory.
- `llm_id`: `string`, *Optional*

  The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `description`: `string`, *Optional*

  The description of the memory. Defaults to `None`.

- `memory_size`: `int`, *Optional*

  Defaults to `5*1024*1024` Bytes. Accounts for each message's content + its embedding vector (≈ Content + Dimensions × 8 Bytes). Example: A 1 KB message with 1024-dim embedding uses ~9 KB. The 5 MB default limit holds ~500 such messages.

  - Maximum 10 * 1024 * 1024 Bytes
- `forgetting_policy`: `enum<string>`, *Optional*

  Evicts existing data based on the chosen policy when the size limit is reached, freeing up space for new messages. Available options:

  - `"FIFO"`: (Default) Prioritize messages with the earliest `forget_at` time for removal. When the pool of messages that have `forget_at` set is insufficient, it falls back to selecting messages in ascending order of their `valid_at` (oldest first).
- `temperature`: (*Body parameter*), `float`, *Optional*

  Adjusts output randomness. Lower = more deterministic; higher = more creative.

  - Range [0, 1]
- `system_prompt`: (*Body parameter*), `string`, *Optional*

  Defines the system-level instructions and role for the AI assistant. It is automatically assembled based on the selected `memory_type` by `PromptAssembler` in `memory/utils/prompt_util.py`. This prompt sets the foundational behavior and context for the entire conversation.

  - Keep the `OUTPUT REQUIREMENTS` and `OUTPUT FORMAT` parts unchanged.
- `user_prompt`: (*Body parameter*), `string`, *Optional*

  Represents the user's custom setting, which is the specific question or instruction the AI needs to respond to directly. Defaults to `None`.

#### Returns

- Success: A `memory` object.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update({"name": "New_name"})
```

---

### List Memory

```python
RAGFlow.list_memory(
    page: int = 1,
    page_size: int = 50,
    tenant_id: str | list[str] = None,
    memory_type: str | list[str] = None,
    storage_type: str = None,
    keywords: str = None) -> dict
```

List memories.

#### Parameters

##### page: `int`, *Optional*

Specifies the page on which the datasets will be displayed. Defaults to `1`

##### page_size: `int`, *Optional*

The number of memories on each page. Defaults to `50`.

##### tenant_id: `string` or `list[str]`, *Optional*

The owner's ID, supports search multiple IDs.

##### memory_type: `string` or `list[str]`, *Optional*

The type of memory (as set during creation). A memory matches if its type is **included in** the provided value(s). Available options:

- `raw`
- `semantic`
- `episodic`
- `procedural`

##### storage_type: `string`, *Optional*

The storage format of messages. Available options:

- `table`: (Default)

##### keywords: `string`, *Optional*

The name of memory to retrieve, supports fuzzy search.

#### Returns

Success: A dict of `Memory` object list and total count.

```json
{"memory_list": list[Memory], "total_count": int}
```

Failure: `Exception`

#### Examples

```
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.list_memory()
```

---

### Get Memory Config

```python
Memory.get_config()
```

Get the configuration of a specified memory.

#### Parameters

None

#### Returns

Success: A `Memory` object.

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_config()
```

---

### Delete Memory

```python
RAGFlow.delete_memory(
    memory_id: str
) -> None
```

Delete a specified memory.

#### Parameters

##### memory_id: `string`, *Required*

The ID of the memory.

#### Returns

Success: Nothing

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_memory("your memory_id")
```

---

### List messages of a memory

```python
Memory.list_memory_messages(
    agent_id: str | list[str]=None,
    keywords: str=None,
    page: int=1,
    page_size: int=50
) -> dict
```

List the messages of a specified memory.

#### Parameters

##### agent_id: `string` or `list[str]`, *Optional*

Filters messages by the ID of their source agent. Supports multiple values.

##### keywords: `string`, *Optional*

Filters messages by their session ID. This field supports fuzzy search.

##### page: `int`, *Optional*

Specifies the page on which the messages will be displayed. Defaults to `1`.

##### page_size: `int`, *Optional*

The number of messages on each page. Defaults to `50`.

#### Returns

Success: a dict of messages and meta info.

```json
{"messages": {"message_list": [{message dict}], "total_count": int}, "storage_type": "table"}
```

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.list_memory_messages()
```

---

### Add Message

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

Add a message to specified memories.

#### Parameters

##### memory_id: `list[str]`, *Required*

The IDs of the memories to save messages.

##### agent_id: `string`, *Required*

The ID of the message's source agent.

##### session_id: `string`, *Required*

The ID of the message's session.

##### user_input: `string`, *Required*

The text input provided by the user.

##### agent_response: `string`, *Required*

The text response generated by the AI agent.

##### user_id: `string`, *Optional*

The user participating in the conversation with the agent. Defaults to `""`.

#### Returns

Success:  A text `"All add to task."`

Failure: `Exception`

#### Examples

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

### Forget Message

```python
Memory.forget_message(message_id: int) -> bool
```

Forget a specified message. After forgetting, this message will not be retrieved by agents, and it will also be prioritized for cleanup by the forgetting policy.

#### Parameters

##### message_id: `int`, *Required*

The ID of the message to forget.

#### Returns

Success: True

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.forget_message(message_id)
```

---

### Update message status

```python
Memory.update_message_status(message_id: int, status: bool) -> bool
```

Update message status, enable or disable a message. Once a message is disabled, it will not be retrieved by agents.

#### Parameters

##### message_id: `int`, *Required*

The ID of the message to enable or disable.

##### status: `bool`, *Required*

The status of message. `True` = `enabled`, `False` = `disabled`.

#### Returns

Success: `True`

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.update_message_status(message_id, True)
```

---

### Search message

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

Searches and retrieves messages from memory based on the provided `query` and other configuration parameters.

#### Parameters

##### query: `string`, *Required*

The search term or natural language question used to find relevant messages.

##### memory_id: `list[str]`, *Required*

The IDs of the memories to search. Supports multiple values.

##### agent_id: `string`, *Optional*

The ID of the message's source agent. Defaults to `None`.

##### session_id: `string`, *Optional*

The ID of the message's session. Defaults to `None`.

##### user_id: `string`, *Optional*

The user participating in the conversation with the agent. Defaults to `None`.

##### similarity_threshold: `float`, *Optional*

The minimum cosine similarity score required for a message to be considered a match. A higher value yields more precise but fewer results. Defaults to `0.2`.

- Range [0.0, 1.0]

##### keywords_similarity_weight: `float`, *Optional*

Controls the influence of keyword matching versus semantic (embedding-based) matching in the final relevance score. A value of 0.5 gives them equal weight. Defaults to `0.7`.

- Range [0.0, 1.0]

##### top_n: `int`, *Optional*

The maximum number of most relevant messages to return. This limits the result set size for efficiency. Defaults to `10`.

#### Returns

Success: A list of `message` dict.

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.search_message("your question", ["your memory_id"])
```

---

### Get Recent Messages

```python
RAGFlow.get_recent_messages(
    memory_id: list[str],
    agent_id: str=None,
    session_id: str=None,
    limit: int=10
) -> list[dict]
```

Retrieves the most recent messages from specified memories. Typically, accepts a `limit` parameter to control the number of messages returned.

#### Parameters

##### memory_id: `list[str]`, *Required*

The IDs of the memories to search. Supports multiple values.

##### agent_id: `string`, *Optional*

The ID of the message's source agent. Defaults to `None`.

##### session_id: `string`, *Optional*

The ID of the message's session. Defaults to `None`.

##### limit: `int`, *Optional*

Control the number of messages returned. Defaults to `10`.

#### Returns

Success: A list of `message` dict.

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.get_recent_messages(["your memory_id"])
```

---

### Get Message Content

```python
Memory.get_message_content(message_id: int)
```

Retrieves the full content and embed vector of a specific message using its unique message ID.

#### Parameters

##### message_id: `int`, *Required*

#### Returns

Success: A `message` dict.

Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow,Memory
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
memory_object = Memory(rag_object, {"id": "your memory_id"})
memory_object.get_message_content(message_id)
```

---
