# Python API Reference (Part 3)

## SESSION MANAGEMENT

---

### Create session with chat assistant

```python
Chat.create_session(name: str = "New session") -> Session
```

Creates a session with the current chat assistant.

#### Parameters

##### name: `string`

The name of the chat session to create.

#### Returns

- Success: A `Session` object containing the following attributes:
  - `id`: `string` The auto-generated unique identifier of the created session.
  - `name`: `string` The name of the created session.
  - `message`: `list[Message]` The opening message of the created session. Default: `[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `chat_id`: `string` The ID of the associated chat assistant.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session()
```

---

### Update chat assistant's session

```python
Session.update(update_message: dict)
```

Updates the current session of the current chat assistant.

#### Parameters

##### update_message: `dict[str, Any]`, *Required*

A dictionary representing the attributes to update, with only one key:

- `"name"`: `string` The revised name of the session.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
session = assistant.create_session("session_name")
session.update({"name": "updated_name"})
```

---

### List chat assistant's sessions

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

Lists sessions associated with the current chat assistant.

#### Parameters

##### page: `int`

Specifies the page on which the sessions will be displayed. Defaults to `1`.

##### page_size: `int`

The number of sessions on each page. Defaults to `30`.

##### orderby: `string`

The field by which sessions should be sorted. Available options:

- `"create_time"` (default)
- `"update_time"`

##### desc: `bool`

Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `True`.

##### id: `string`

The ID of the chat session to retrieve. Defaults to `None`.

##### name: `string`

The name of the chat session to retrieve. Defaults to `None`.

##### user_id: `str`

The optional user-defined ID to filter sessions by. Defaults to `None`.

#### Returns

- Success: A list of `Session` objects associated with the current chat assistant.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
for session in assistant.list_sessions():
    print(session)
```

---

### Delete chat assistant's sessions

```python
Chat.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes sessions of the current chat assistant by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the sessions to delete. Defaults to `None`.

- If omitted, or set to `null` or an empty array, no sessions are deleted.
- If an array of IDs is provided, only the sessions matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all sessions of the current chat assistant when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
assistant = rag_object.list_chats(name="Miss R")
assistant = assistant[0]
assistant.delete_sessions(ids=["id_1","id_2"])
assistant.delete_sessions(delete_all=True)
```

---

### Converse with chat assistant

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message, iter[Message]]
```

Asks a specified chat assistant a question to start an AI-powered conversation.

:::tip NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgment.
:::

#### Parameters

##### question: `string`, *Required*

The question to start an AI-powered conversation. Default to `""`

##### stream: `bool`

Indicates whether to output responses in a streaming way:

- `True`: Enable streaming (default).
- `False`: Disable streaming.

##### **kwargs

The parameters in prompt(system).

#### Returns

- A `Message` object containing the response to the question if `stream` is set to `False`.
- An iterator containing multiple `message` objects (`iter[Message]`) if `stream` is set to `True`

The following shows the attributes of a `Message` object:

##### id: `string`

The auto-generated message ID.

##### content: `string`

The content of the message. Defaults to `"Hi! I am your assistant, can I help you?"`.

##### reference: `list[Chunk]`

A list of `Chunk` objects representing references to the message, each containing the following attributes:

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

#### Examples

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

### Create session with agent

```python
Agent.create_session(**kwargs) -> Session
```

Creates a session with the current agent.

#### Parameters

##### **kwargs

The parameters in `begin` component.

Also supports:

- `release` (`bool | str`, optional): When set to `True` (or `"true"`), creates a session with the published agent app only.

#### Returns

- Success: A `Session` object containing the following attributes:
  - `id`: `string` The auto-generated unique identifier of the created session.
  - `message`: `list[Message]` The messages of the created session assistant. Default: `[{"role": "assistant", "content": "Hi! I am your assistant, can I help you?"}]`
  - `agent_id`: `string` The ID of the associated agent.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow, Agent

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent_id = "AGENT_ID"
agent = rag_object.get_agent(agent_id)
session = agent.create_session()
```

---

### Converse with agent

```python
Session.ask(question: str = "", stream: bool = False, **kwargs) -> Optional[Message | iter[Message]]
```

Asks a specified agent through the unified completion endpoint.

:::tip NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgment.
:::

#### Parameters

##### question: `string`

The user message sent to the agent. If the **Begin** component takes parameters, `question` can be an empty string.

##### stream: `bool`

Indicates whether to output responses in a streaming way:

- `True`: Enable streaming.
- `False`: Disable streaming.

##### kwargs: `dict`

Additional request parameters forwarded to the completion API. Common options:

- `inputs`: Variables defined in the **Begin** component.
- `session_id`: Continue an existing session instead of creating a new one.
- `release`: Use the latest published version of the agent.
- `return_trace`: Include execution trace information in the response.
- Other custom Begin component parameters supported by the current workflow.

#### Returns

- A `Message` object containing the response to the question if `stream` is set to `False`
- An iterator containing multiple `message` objects (`iter[Message]`) if `stream` is set to `True`

The following shows the attributes of a `Message` object:

##### id: `string`

The auto-generated message ID.

##### content: `string`

The content of the message. Defaults to `"Hi! I am your assistant, can I help you?"`.

##### reference: `list[Chunk]`

A list of `Chunk` objects representing references to the message, each containing the following attributes:

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

#### Examples

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

Use Begin inputs and request trace output:

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

### List agent sessions

```python
Agent.list_sessions(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True,
    id: str = None
) -> List[Session]
```

Lists sessions associated with the current agent.

#### Parameters

##### page: `int`

Specifies the page on which the sessions will be displayed. Defaults to `1`.

##### page_size: `int`

The number of sessions on each page. Defaults to `30`.

##### orderby: `string`

The field by which sessions should be sorted. Available options:

- `"create_time"`
- `"update_time"`(default)

##### desc: `bool`

Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `True`.

##### id: `string`

The ID of the agent session to retrieve. Defaults to `None`.

#### Returns

- Success: A list of `Session` objects associated with the current agent.
- Failure: `Exception`.

#### Examples

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

```python
Agent.delete_sessions(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes sessions of an agent by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the sessions to delete. Defaults to `None`.

- If omitted, or set to `None` or an empty array, no sessions are deleted.
- If an array of IDs is provided, only the sessions matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all sessions of the current agent when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
AGENT_id = "AGENT_ID"
agent = rag_object.get_agent(AGENT_id)
agent.delete_sessions(ids=["id_1","id_2"])
agent.delete_sessions(delete_all=True)
```

---

## AGENT MANAGEMENT

---

### List agents

```python
RAGFlow.list_agents(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "update_time",
    desc: bool = True
) -> List[Agent]
```

Lists agents. This is a collection API and always returns a list.

#### Parameters

##### page: `int`

Specifies the page on which the agents will be displayed. Defaults to `1`.

##### page_size: `int`

The number of agents on each page. Defaults to `30`.

##### orderby: `string`

The attribute by which the results are sorted. Available options:

- `"create_time"`
- `"update_time"` (default)

##### desc: `bool`

Indicates whether the retrieved agents should be sorted in descending order. Defaults to `True`.

#### Returns

- Success: A list of `Agent` objects.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for agent in rag_object.list_agents():
    print(agent)
```

---

### Get agent

```python
RAGFlow.get_agent(agent_id: str) -> Agent
```

Gets a single agent by ID and returns the detailed agent payload.

#### Parameters

##### agent_id: `string`

The ID of the agent to retrieve.

#### Returns

- Success: An `Agent` object.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
agent = rag_object.get_agent("AGENT_ID")
print(agent)
```

---

### Create agent

```python
RAGFlow.create_agent(
    title: str,
    dsl: dict,
    description: str | None = None,
    canvas_type: str | None = None
) -> None
```

Create an agent.

#### Parameters

##### title: `string`

Specifies the title of the agent.

##### dsl: `dict`

Specifies the canvas DSL of the agent.

##### description: `string`

The description of the agent. Defaults to `None`.

##### canvas_type: `string | None`

The canvas type of the agent. Defaults to `None`.

#### Returns

- Success: Nothing.
- Failure: `Exception`.

#### Examples

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

### Update agent

```python
RAGFlow.update_agent(
    agent_id: str,
    title: str | None = None,
    description: str | None = None,
    dsl: dict | None = None,
    canvas_type: str | None = None,
) -> None
```

Update an agent.

#### Parameters

##### agent_id: `string`

Specifies the id of the agent to be updated.

##### title: `string`

Specifies the new title of the agent. `None` if you do not want to update this.

##### dsl: `dict`

Specifies the new canvas DSL of the agent. `None` if you do not want to update this.

##### description: `string`

The new description of the agent. `None` if you do not want to update this.

##### canvas_type: `string | None`

The canvas type of the agent. Defaults to `None`.

#### Returns

- Success: Nothing.
- Failure: `Exception`.

#### Examples

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

### Delete agent

```python
RAGFlow.delete_agent(
    agent_id: str
) -> None
```

Delete an agent.

#### Parameters

##### agent_id: `string`

Specifies the id of the agent to be deleted.

#### Returns

- Success: Nothing.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_agent("58af890a2a8911f0a71a11b922ed82d6")
```

---
