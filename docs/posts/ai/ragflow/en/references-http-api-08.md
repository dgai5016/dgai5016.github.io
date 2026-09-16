# HTTP API Reference (Part 8)

## MEMORY MANAGEMENT

### Create Memory

**POST** `/api/v1/memories`

Create a new memory.

#### Request

- Method: POST
- URL: `/api/v1/memories`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"memory_type"`: `list[string]`
  - `"embd_id"`: `string`.
  - `"llm_id"`: `string`

##### Request example

```bash
curl --location 'http://{address}/api/v1/memories' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data-raw '{
    "name": "new_memory_1",
    "memory_type": ["raw", "semantic"],
    "embd_id": "BAAI/bge-large-zh-v1.5@BAAI",
    "llm_id": "glm-4-flash@ZHIPU-AI"
}'
```

##### Request parameters

- `name` : (*Body parameter*), `string`, *Required*

  The unique name of the memory to create. It must adhere to the following requirements:

  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters
- `memory_type`: (*Body parameter*), `list[enum<string>]`,  *Required*

  Specifies the types of memory to extract. Available options:

  - `raw`: The raw dialogue content between the user and the agent . *Required by default*.
  - `semantic`: General knowledge and facts about the user and world.
  - `episodic`:  Time-stamped records of specific events and experiences.
  - `procedural`: Learned skills, habits, and automated procedures.
- `embd_id`: (*Body parameter*), `string`, *Required*

  The name of the embedding model to use. For example: `"BAAI/bge-large-zh-v1.5@BAAI"`

  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `llm_id`: (*Body parameter*), `string`, *Required*

  The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

  - Maximum 255 characters
  - Must follow `model_name@model_factory` format

#### Response

Success:

```json
{
	"code": 0,
	"data": {
	...your new memory here
	},
	"message": true
}
```

Failure:

```json
{
    "code": 101,
    "message": "Memory name cannot be empty or whitespace."
}
```

### Update Memory

**PUT** `/api/v1/memories/{memory_id}`

Updates configurations for a specified memory.

#### Request

- Method: PUT
- URL: `/api/v1/memories/{memory_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"avatar"`: `string`
  - `"permissions"`: `string`
  - `"llm_id"`: `string`
  - `"description"`: `string`
  - `"memory_size"`: `int`
  - `"forgetting_policy"`: `string`
  - `"temperature"`: `float`
  - `"system_prompt"`: `string`
  - `"user_prompt"`: `string`

##### Request example

```bash
curl --location --request PUT 'http://{address}/api/v1/memories/d6775d4eeada11f08ca284ba59bc53c7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data '{
    "name": "name_update",
}'
```

##### Request parameters

- `memory_id`: (*Path parameter*)

  The ID of the memory to update.

- `name`: (*Body parameter*), `string`, *Optional*

  The revised name of the memory.

  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters, *Optional*
- `avatar`: (*Body parameter*), `string`, *Optional*

  The updated base64 encoding of the avatar.

  - Maximum 65535 characters
- `permissions`: (*Body parameter*), `enum<string>`, *Optional*

  The updated memory permission. Available options:

  - `"me"`: (Default) Only you can manage the memory.
  - `"team"`: All team members can manage the memory.
- `llm_id`: (*Body parameter*), `string`, *Optional*

  The name of the chat model to use. For example: `"glm-4-flash@ZHIPU-AI"`

  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `description`: (*Body parameter*), `string`, *Optional*

  The description of the memory. Defaults to `None`.

- `memory_size`: (*Body parameter*), `int`, *Optional*

  Defaults to `5*1024*1024` Bytes. Accounts for each message's content + its embedding vector (≈ Content + Dimensions × 8 Bytes). Example: A 1 KB message with 1024-dim embedding uses ~9 KB. The 5 MB default limit holds ~500 such messages.

  - Maximum 10 * 1024 * 1024 Bytes
- `forgetting_policy`: (*Body parameter*), `enum<string>`, *Optional*

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

#### Response

Success:

```json
{
	"code": 0,
	"data": {
	...your updated memory here
	},
	"message": true
}
```

Failure:

```json
{
    "code": 101,
    "message": "Memory name cannot be empty or whitespace."
}
```

### List Memory

**GET** `/api/v1/memories?tenant_id={tenant_ids}&memory_type={memory_types}&storage_type={storage_type}&keywords={keywords}&page={page}&page_size={page_size}`

List memories.

#### Request

- Method: GET
- URL:  `/api/v1/memories?tenant_id={tenant_ids}&memory_type={memory_types}&storage_type={storage_type}&keywords={keywords}&page={page}&page_size={page_size}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/memories?keywords=&page_size=50&page=1&memory_type=semantic%2Cepisodic' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `tenant_id`: (*Filter parameter*), `string` or `list[string]`, *Optional*

  The owner's ID, supports search multiple IDs.

- `memory_type`: (*Filter parameter*), `enum<string>` or `list[enum<string>]`, *Optional*

  The type of memory (as set during creation). A memory matches if its type is **included in** the provided value(s). Available options:

  - `raw`
  - `semantic`
  - `episodic`
  - `procedural`
- `storage_type`: (*Filter parameter*), `enum<string>`, *Optional*

  The storage format of messages. Available options:

  - `table`: (Default)
- `keywords`: (*Filter parameter*), `string`, *Optional*

  The name of memory to retrieve, supports fuzzy search.

- `page`: (*Filter parameter*), `int`, *Optional*

  Specifies the page on which the memories will be displayed. Defaults to `1`.

- `page_size`: (*Filter parameter*), `int`, *Optional*

  The number of memories on each page. Defaults to `50`.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "memory_list": [
            {
                "avatar": null,
                "create_date": "Tue, 06 Jan 2026 16:36:47 GMT",
                "create_time": 1767688607040,
                "description": null,
                "id": "d6775d4eeada11f08ca284ba59bc53c7",
                "memory_type": [
                    "raw",
                    "semantic"
                ],
                "name": "new_memory_1",
                "owner_name": "Lynn",
                "permissions": "me",
                "storage_type": "table",
                "tenant_id": "55777efac9df11f09cd07f49bd527ade"
            },
            ...other 3 memories here
        ],
        "total_count": 4
    },
    "message": true
}
```

Failure:

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### Get Memory Config

**GET** `/api/v1/memories/{memory_id}/config`

Get the configuration of a specified memory.

#### Request

- Method: GET
- URL: `/api/v1/memories/{memory_id}/config`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/memories/6c8983badede11f083f184ba59bc53c7/config' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory.

#### Response

Success

```json
{
    "code": 0,
    "data": {
        "avatar": null,
        "create_date": "Mon, 22 Dec 2025 10:32:13 GMT",
        "create_time": 1766370733354,
        "description": null,
        "embd_id": "BAAI/bge-large-zh-v1.5@SILICONFLOW",
        "forgetting_policy": "FIFO",
        "id": "6c8983badede11f083f184ba59bc53c7",
        "llm_id": "glm-4.5-flash@ZHIPU-AI",
        "memory_size": 5242880,
        "memory_type": [
            "raw",
            "semantic",
            "episodic",
            "procedural"
        ],
        "name": "mem1222",
        "owner_name": null,
        "permissions": "me",
        "storage_type": "table",
        "system_prompt": ...your prompt here,
        "temperature": 0.5,
        "tenant_id": "55777efac9df11f09cd07f49bd527ade",
        "update_date": null,
        "update_time": null,
        "user_prompt": null
    },
    "message": true
}
```

Failure

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### Delete Memory

**DELETE** `/api/v1/memories/{memory_id}`

Delete a specified memory.

#### Request

- Method: DELETE
- URL: `/api/v1/memories/{memory_id}`
- Headers:
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location --request DELETE 'http://{address}/api/v1/memories/d6775d4eeada11f08ca284ba59bc53c7' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory to delete.

#### Response

Success

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

Failure

```json
{
    "code": 404,
    "data": null,
    "message": true
}
```

### List messages of a memory

**GET** `/api/v1/memories/{memory_id}?agent_id={agent_id}&keywords={keywords}&page={page}&page_size={page_size}`

List the messages of a specified memory.

#### Request

- Method: GET
- URL: `/api/v1/memories/{memory_id}?agent_id={agent_id}&keywords={keywords}&page={page}&page_size={page_size}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/memories/6c8983badede11f083f184ba59bc53c?page=1' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory to show messages.

- `agent_id`: (*Filter parameter*), `string` or `list[string]`, *Optional*

  Filters messages by the ID of their source agent. Supports multiple values.

- `keywords`: (*Filter parameter*), `string`, *Optional*

  Filters messages by session ID. Despite the parameter name, its value is applied to the `session_id` field.

- `page`: (*Filter parameter*), `int`, *Optional*

  Specifies the page on which the messages will be displayed. Defaults to `1`.

- `page_size`: (*Filter parameter*), `int`, *Optional*

  The number of messages on each page. Defaults to `50`.

#### Response

Success

```json
{
    "code": 0,
    "data": {
        "messages": {
            "message_list": [
                {
                    "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
                    "agent_name": "memory_agent_1223",
                    "extract": [
                        {
                            "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
                            "agent_name": "memory_agent_1223",
                            "forget_at": "None",
                            "invalid_at": "None",
                            "memory_id": "6c8983badede11f083f184ba59bc53c7",
                            "message_id": 236,
                            "message_type": "semantic",
                            "session_id": "65b89ab8e96411f08d4e84ba59bc53c7",
                            "source_id": 233,
                            "status": true,
                            "user_id": "",
                            "valid_at": "2026-01-04 19:56:46"
                        },
                        ...other extracted messages
                    ],
                    "forget_at": "None",
                    "invalid_at": "None",
                    "memory_id": "6c8983badede11f083f184ba59bc53c7",
                    "message_id": 233,
                    "message_type": "raw",
                    "session_id": "65b89ab8e96411f08d4e84ba59bc53c7",
                    "source_id": "None",
                    "status": true,
                    "task": {
                        "progress": 1.0,
                        "progress_msg": "\n2026-01-04 19:56:46 Prepared prompts and LLM.\n2026-01-04 19:57:48 Get extracted result from LLM.\n2026-01-04 19:57:48 Extracted 6 messages from raw dialogue.\n2026-01-04 19:57:48 Prepared embedding model.\n2026-01-04 19:57:48 Embedded extracted content.\n2026-01-04 19:57:48 Saved messages to storage.\n2026-01-04 19:57:48 Message saved successfully."
                    },
                    "user_id": "",
                    "valid_at": "2026-01-04 19:56:42"
                },
                {
                    "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
                    "agent_name": "memory_agent_1223",
                    "extract": [],
                    "forget_at": "None",
                    "invalid_at": "None",
                    "memory_id": "6c8983badede11f083f184ba59bc53c7",
                    "message_id": 226,
                    "message_type": "raw",
                    "session_id": "d982a8cbe96111f08a1384ba59bc53c7",
                    "source_id": "None",
                    "status": true,
                    "task": {
                        "progress": -1.0,
                        "progress_msg": "Failed to insert message into memory. Details: 6c8983badede11f083f184ba59bc53c7_228:{'type': 'document_parsing_exception', 'reason': \"[1:230] failed to parse field [valid_at] of type [date] in document with id '6c8983badede11f083f184ba59bc53c7_228'. Preview of field's value: ''\", 'caused_by': {'type': 'illegal_argument_exception', 'reason': 'cannot parse empty date'}}; 6c8983badede11f083f184ba59bc53c7_229:{'type': 'document_parsing_exception', 'reason': \"[1:230] failed to parse field [valid_at] of type [date] in document with id '6c8983badede11f083f184ba59bc53c7_229'. Preview of field's value: ''\", 'caused_by': {'type': 'illegal_argument_exception', 'reason': 'cannot parse empty date'}}; 6c8983badede11f083f184ba59bc53c7_230:{'type': 'document_parsing_exception', 'reason': \"[1:230] failed to parse field [valid_at] of type [date] in document with id '6c8983badede11f083f184ba59bc53c7_230'. Preview of field's value: ''\", 'caused_by': {'type': 'illegal_argument_exception', 'reason': 'cannot parse empty date'}}; 6c8983badede11f083f184ba59bc53c7_231:{'type': 'document_parsing_exception', 'reason': \"[1:230] failed to parse field [valid_at] of type [date] in document with id '6c8983badede11f083f184ba59bc53c7_231'. Preview of field's value: ''\", 'caused_by': {'type': 'illegal_argument_exception', 'reason': 'cannot parse empty date'}}; 6c8983badede11f083f184ba59bc53c7_232:{'type': 'document_parsing_exception', 'reason': \"[1:230] failed to parse field [valid_at] of type [date] in document with id '6c8983badede11f083f184ba59bc53c7_232'. Preview of field's value: ''\", 'caused_by': {'type': 'illegal_argument_exception', 'reason': 'cannot parse empty date'}}"
                    },
                    "user_id": "",
                    "valid_at": "2026-01-04 19:38:26"
                },
                ...other 11 messages
            ],
            "total_count": 13
        },
        "storage_type": "table"
    },
    "message": true
}
```

Failure

```
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### Add Message

**POST** `/api/v1/messages`

Add a message to specified memories.

#### Request

- Method: POST
- URL: `/api/v1/messages`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"memory_id"`: `list[string]`
  - `"agent_id"`: `string`
  - `"session_id"`: `string`
  - `"user_id"`: `string`
  - `"user_input"`: `string`
  - `"agent_response"`: `string`

##### Request example

```bash
curl --location 'http://{address}/api/v1/messages' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data '{
    "memory_id": ["6c8983badede11f083f184ba59bc53c7", "87ebb892df1711f08d6b84ba59bc53c7"],
    "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
    "session_id": "bf0a50abeb8111f0917884ba59bc53c7",
    "user_id": "55777efac9df11f09cd07f49bd527ade",
    "user_input": "your user input here",
    "agent_response": "your agent response here"

}'
```

##### Request parameter

- `memory_id`: (*Body parameter*), `list[string]`, *Required*

  The IDs of the memories to save messages.

- `agent_id`: (*Body parameter*), `string`, *Required*

  The ID of the message's source agent.

- `session_id`: (*Body parameter*), `string`, *Required*

  The ID of the message's session.

- `user_id`: (*Body parameter*), `string`, *Optional*

  The user participating in the conversation with the agent. Honoured only when the request is authenticated with an API key. Any other authentication, whether a JWT bearer token or a browser session, ignores it and attributes the message to the authenticated user. Surrounding whitespace is stripped, and a value that is missing, blank or not a string falls back to the API key owner.

- `user_input`: (*Body parameter*), `string`, *Required*

  The text input provided by the user.

- `agent_response`: (*Body parameter*), `string`, *Required*

  The text response generated by the AI agent.

#### Response

Success

```json
{
    "code": 0,
    "data": null,
    "message": "All add to task."
}
```

Failure

```json
{
    "code": 500,
    "data": null,
    "message": "Some messages failed to add. Detail: {fail information}"
}
```

### Forget Message

**DELETE** `/api/v1/messages/{memory_id}:{message_id}`

Forget a specified message. After forgetting, this message will not be retrieved by agents, and it will also be prioritized for cleanup by the forgetting policy.

#### Request

- Method: DELETE
- URL: `/api/v1/messages/{memory_id}:{message_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location --request DELETE 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:272' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory to which the specified message belongs.

- `message_id`: (*Path parameter*), `string`, *Required*

  The ID of the message to forget.

#### Response

Success

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

Failure

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### Update message status

**PUT** `/api/v1/messages/{memory_id}:{message_id}`

Update message status, enable or disable a message. Once a message is disabled, it will not be retrieved by agents.

#### Request

- Method: PUT
- URL: `/api/v1/messages/{memory_id}:{message_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"status"`: `bool`

##### Request example

```bash
curl --location --request PUT 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:270' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data '{
    "status": false
}'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory to which the specified message belongs.

- `message_id`: (*Path parameter*), `string`, *Required*

  The ID of the message to enable or disable.

- `status`: (*Body parameter*), `bool`, *Required*

  The status of message. `True` = `enabled`, `False` = `disabled`.

#### Response

Success

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

Failure

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### Search Message

**GET** `/api/v1/messages/search?query={query}&memory_id={memory_id}&similarity_threshold={similarity_threshold}&keywords_similarity_weight={keywords_similarity_weight}&top_n={top_n}`

Searches and retrieves messages from memory based on the provided `query` and other configuration parameters.

#### Request

- Method: GET
- URL: `/api/v1/messages/search?query={query}&memory_id={memory_id}&similarity_threshold={similarity_threshold}&keywords_similarity_weight={keywords_similarity_weight}&top_n={top_n}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/messages/search?query=%22who%20are%20you%3F%22&memory_id=6c8983badede11f083f184ba59bc53c7&similarity_threshold=0.2&keywords_similarity_weight=0.7&top_n=10' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `query`: (*Filter parameter*), `string`, *Required*

  The search term or natural language question used to find relevant messages.

- `memory_id`: (*Filter parameter*), `string` or `list[string]`, *Required*

  The IDs of the memories to search.  Supports multiple values.

- `agent_id`: (*Filter parameter*), `string`, *Optional*

  The ID of the message's source agent. Defaults to `None`.

- `session_id`: (*Filter parameter*), `string`, *Optional*

  The ID of the message's session. Defaults to `None`.

- `user_id`: (*Filter parameter*), `string`, *Optional*

  The user participating in the conversation with the agent. Defaults to `None`.

- `similarity_threshold`: (*Filter parameter*), `float`, *Optional*

  The minimum cosine similarity score required for a message to be considered a match. A higher value  yields more precise but fewer results. Defaults to `0.2`.

  - Range [0.0, 1.0]
- `keywords_similarity_weight` : (*Filter parameter*), `float`, *Optional*

  Controls the influence of keyword matching versus semantic (embedding-based) matching in the final relevance score. A value of 0.5 gives them equal weight. Defaults to `0.7`.

  - Range [0.0, 1.0]
- `top_n`: (*Filter parameter*), `int`, *Optional*

  The maximum number of most relevant messages to return. This limits the result set size for efficiency. Defaults to `5`.

#### Response

Success

```json
{
    "code": 0,
    "data": [
        {
            "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
            "content": "User Input: who am I?\nAgent Response: To address the question \"who am I?\", let's follow the logical steps outlined in the instructions:\n\n1. **Understand the User's Request**: The user is asking for a clarification or identification of their own self. This is a fundamental question about personal identity.\n\n2. **Decompose the Request**: The request is quite simple and doesn't require complex decomposition. The core task is to provide an answer that identifies the user in some capacity.\n\n3. **Execute the Subtask**:\n   - **Identify the nature of the question**: The user is seeking to understand their own existence or their sense of self.\n   - **Assess the context**: The context is not explicitly given, so the response will be general.\n   - **Provide a response**: The answer should acknowledge the user's inquiry into their identity.\n\n4. **Validate Accuracy and Consistency**: The response should be consistent with the general understanding of the question. Since the user has not provided specific details about their identity, the response should be broad and open-ended.\n\n5. **Summarize the Final Result**: The user is asking \"who am I?\" which is an inquiry into their own identity. The answer is that the user is the individual who is asking the question. Without more specific information, a detailed description of their identity cannot be provided.\n\nSo, the final summary would be:\n\nThe user is asking the question \"who am I?\" to seek an understanding of their own identity. The response to this question is that the user is the individual who is posing the question. Without additional context or details, a more comprehensive description of the user's identity cannot be given.",
            "forget_at": "None",
            "invalid_at": "None",
            "memory_id": "6c8983badede11f083f184ba59bc53c7",
            "message_id": 61,
            "message_type": "raw",
            "session_id": "ebf8025de52211f0b56684ba59bc53c7",
            "source_id": "None",
            "status": true,
            "user_id": "",
            "valid_at": "2025-12-30 09:57:49"
        },
        ...other 2 matched messages here
    ],
    "message": true
}
```

Failure

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### Get Recent Messages

**GET** `/api/v1/messages?memory_id={memory_id}&agent_id={agent_id}&session_id={session_id}&limit={limit}`

Retrieves the most recent messages from specified memories. Typically, accepts a `limit` parameter to control the number of messages returned.

#### Request

- Method: GET
- URL: `/api/v1/messages?memory_id={memory_id}&agent_id={agent_id}&session_id={session_id}&limit={limit}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/messages?memory_id=6c8983badede11f083f184ba59bc53c7&limit=10' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Filter parameter*), `string` or `list[string]`, *Required*

  The IDs of the memories to search.  Supports multiple values.

- `agent_id`: (*Filter parameter*), `string`, *Optional*

  The ID of the message's source agent. Defaults to `None`.

- `session_id`: (*Filter parameter*), `string`, *Optional*

  The ID of the message's session. Defaults to `None`.

- `limit`: (*Filter parameter*), `int`, *Optional*

  Control the number of messages returned. Defaults to `10`.

#### Response

Success

```json
{
    "code": 0,
    "data": [
        {
            "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
            "content": "User Input: what is pineapple?\nAgent Response: A pineapple is a tropical fruit known for its sweet, tangy flavor and distinctive, spiky appearance. Here are the key facts:\nScientific Name: Ananas comosus\nPhysical Description: It has a tough, spiky, diamond-patterned outer skin (rind) that is usually green, yellow, or brownish. Inside, the juicy yellow flesh surrounds a fibrous core.\nGrowth: Unlike most fruits, pineapples do not grow on trees. They grow from a central stem as a composite fruit, meaning they are formed from many individual berries that fuse together around the core. They grow on a short, leafy plant close to the ground.\nUses: Pineapples are eaten fresh, cooked, grilled, juiced, or canned. They are a popular ingredient in desserts, fruit salads, savory dishes (like pizzas or ham glazes), smoothies, and cocktails.\nNutrition: They are a good source of Vitamin C, manganese, and contain an enzyme called bromelain, which aids in digestion and can tenderize meat.\nSymbolism: The pineapple is a traditional symbol of hospitality and welcome in many cultures.\nAre you asking about the fruit itself, or its use in a specific context?",
            "forget_at": "None",
            "invalid_at": "None",
            "memory_id": "6c8983badede11f083f184ba59bc53c7",
            "message_id": 269,
            "message_type": "raw",
            "session_id": "bf0a50abeb8111f0917884ba59bc53c7",
            "source_id": "None",
            "status": true,
            "user_id": "",
            "valid_at": "2026-01-07 16:49:12"
        },
        ...other 9 messages here
    ],
    "message": true
}
```

Failure

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### Get Message Content

**GET** `/api/v1/messages/{memory_id}:{message_id}/content`

Retrieves the full content and embed vector of a specific message using its unique message ID.

#### Request

- Method: GET
- URL: `/api/v1/messages/{memory_id}:{message_id}/content`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --location 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:270/content' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `memory_id`: (*Path parameter*), `string`, *Required*

  The ID of the memory to which the specified message belongs.

- `message_id`: (*Path parameter*), `string`, *Required*

  The ID of the message.

#### Response

Success

```json
{
    "code": 0,
    "data": {
        "agent_id": "8db9c8eddfcc11f0b5da84ba59bc53c7",
        "content": "Pineapples are tropical fruits known for their sweet, tangy flavor and distinctive, spiky appearance",
        "content_embed": [
        	0.03641991,
            ...embed vector here
        ],
        "forget_at": null,
        "id": "6c8983badede11f083f184ba59bc53c7_270",
        "invalid_at": null,
        "memory_id": "6c8983badede11f083f184ba59bc53c7",
        "message_id": 270,
        "message_type": "semantic",
        "session_id": "bf0a50abeb8111f0917884ba59bc53c7",
        "source_id": 269,
        "status": false,
        "user_id": "",
        "valid_at": "2026-01-07 16:48:37",
        "zone_id": 0
    },
    "message": true
}
```

Failure

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

---
