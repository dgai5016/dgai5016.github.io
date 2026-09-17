# HTTP API Reference (Part 6)

## SESSION MANAGEMENT

---

### Create session with chat assistant

**POST** `/api/v1/chats/{chat_id}/sessions`

Creates a session with a chat assistant.

#### Request

- Method: POST
- URL: `/api/v1/chats/{chat_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"user_id"`: `string` (optional)

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "new session"
     }'
```

##### Request parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `"name"`: (*Body parameter*), `string`
  The name of the chat session to create.
- `"user_id"`: (*Body parameter*), `string`
  Optional user-defined ID.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "create_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "create_time": 1728636374571,
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "messages": [
            {
                "content": "Hi! I am your assistant, can I help you?",
                "role": "assistant"
            }
        ],
        "name": "new session",
        "update_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "update_time": 1728636374571
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

---

### Update chat assistant's session

**PATCH** `/api/v1/chats/{chat_id}/sessions/{session_id}`

Updates a session of a specified chat assistant.

:::warning DEPRECATED
`PUT /api/v1/chats/{chat_id}/sessions/{session_id}` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: PATCH
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`

##### Request example

```bash
curl --request PATCH \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "<REVISED_SESSION_NAME_HERE>"
     }'
```

##### Request Parameter

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session to update.
- `"name"`: (*Body Parameter*), `string`
  The revised name of the session.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "create_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "create_time": 1728636374571,
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "messages": [
            {
                "content": "Hi! I am your assistant, can I help you?",
                "role": "assistant"
            }
        ],
        "name": "updated session name",
        "update_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "update_time": 1728636374571,
        "user_id": ""
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

---

### List chat assistant's sessions

**GET** `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`

Lists sessions associated with a specified chat assistant.

#### Request

- Method: GET
- URL: `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request Parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the sessions will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of sessions on each page. Defaults to `30`. If set to `0`, an empty list is returned.
- `orderby`: (*Filter parameter*), `string`
  The field by which sessions should be sorted. Available options:
  - `create_time` (default)
  - `update_time`
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `true`.
- `name`: (*Filter parameter*) `string`
  The name of the chat session to retrieve.
- `id`: (*Filter parameter*), `string`
  The ID of the chat session to retrieve.
- `user_id`: (*Filter parameter*), `string`
  The optional user-defined ID passed in when creating session.

#### Response

Success:

```json
{
    "code": 0,
    "data": [
        {
            "chat_id": "2ca4b22e878011ef88fe0242ac120005",
            "create_date": "Fri, 11 Oct 2024 08:46:43 GMT",
            "create_time": 1728636403974,
            "id": "578d541e87ad11ef96b90242ac120006",
            "messages": [
                {
                    "content": "Hi! I am your assistant, can I help you?",
                    "role": "assistant"
                }
            ],
            "name": "new session",
            "reference": [],
            "update_date": "Fri, 11 Oct 2024 08:46:43 GMT",
            "update_time": 1728636403974,
            "user_id": ""
        }
    ]
}
```

Failure:

```json
{
    "code": 102,
    "message": "The session doesn't exist"
}
```

---

### Get chat assistant's session

**GET** `/api/v1/chats/{chat_id}/sessions/{session_id}`

Gets a specific session of a specified chat assistant, including its messages, references, and avatar.

#### Request

- Method: GET
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request Parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session to retrieve.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "name": "new session",
        "avatar": "data:image/png;base64,...",
        "messages": [
            {
                "content": "Hi! I am your assistant, can I help you?",
                "role": "assistant"
            }
        ],
        "reference": []
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### Delete a message from a chat assistant's session

**DELETE** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`

Deletes a user message and its paired assistant reply from a specified chat assistant session.

#### Request

- Method: DELETE
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request Parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session that owns the message.
- `msg_id`: (*Path parameter*)
  The ID of the message to delete.

#### Response

Success: returns the updated session object.

```json
{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "messages": [],
        "reference": []
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### Update message feedback in a chat assistant's session

**PUT** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`

Updates feedback for an assistant message in a specified chat assistant session.

#### Request

- Method: PUT
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"thumbup"`: `boolean`
  - `"feedback"`: `string` (optional)

##### Request example

```bash
curl --request PUT \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "thumbup": false,
          "feedback": "The answer missed the cited document."
     }'
```

##### Request Parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session that owns the message.
- `msg_id`: (*Path parameter*)
  The ID of the assistant message to update.
- `"thumbup"`: (*Body parameter*), `boolean`
  Whether the assistant message is marked as positive feedback.
- `"feedback"`: (*Body parameter*), `string`
  Optional feedback text, typically used when `"thumbup"` is `false`.

#### Response

Success: returns the updated session object.

```json
{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "messages": [
            {
                "id": "message-id",
                "role": "assistant",
                "content": "Here is the answer.",
                "thumbup": false,
                "feedback": "The answer missed the cited document."
            }
        ]
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### Delete chat assistant's sessions

**DELETE** `/api/v1/chats/{chat_id}/sessions`

Deletes sessions of a chat assistant by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/chats/{chat_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["test_1", "test_2"]
     }'
```

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

##### Request Parameters

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `"ids"`: (*Body Parameter*), `list[string]`
  The IDs of the sessions to delete.
  - If omitted, or set to `null` or an empty array, no sessions are deleted.
  - If an array of IDs is provided, only the sessions matching those IDs are deleted.
- `"delete_all"`: (*Body Parameter*), `boolean`
  Whether to delete all sessions of the specified chat assistant when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

#### Response

Success:

```json
{
    "code": 0
}
```

Failure:

```json
{
    "code": 102,
    "message": "The chat doesn't own the session"
}
```

---

### Converse with chat assistant

**POST** `/api/v1/chat/completions`

Starts a chat completion request. The same endpoint supports three modes:

:::warning DEPRECATED
`POST /api/v1/chats/{chat_id}/completions` is deprecated. Use this endpoint instead.
:::

- No `chat_id`: talk directly with the tenant's default chat model.
- With `chat_id` but no `session_id`: use that chat's configuration and automatically create a new session.
- With both `chat_id` and `session_id`: continue an existing chat session.

:::tip NOTE

- In streaming mode, not all responses include a reference, as this depends on the system's judgment.
- In streaming mode, the last message is an empty message:

  ```json
  data:
  {
    "code": 0,
    "data": true
  }
  ```

:::

#### Request

- Method: POST
- URL: `/api/v1/chat/completions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"messages"`: `list[object]`
  - `"question"`: `string`
  - `"stream"`: `boolean`
  - `"chat_id"`: `string` (optional)
  - `"session_id"`: `string` (optional)
  - `"llm_id"`: `string` (optional)
  - `"pass_all_history_messages"`: `boolean` (optional)
  - `"legacy"`: `boolean` (optional)

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
          "messages": [
              {
                  "role": "user",
                  "content": "Who are you?"
              }
          ]
     }'
```

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
          "chat_id": "{chat_id}",
          "stream": true,
          "session_id":"9fa7691cb85c11ef9c5f0242ac120005",
          "messages": [
              {
                  "role": "user",
                  "content": "Who are you?"
              }
          ]
     }'
```

##### Request Parameters

- `"messages"`: (*Body Parameter*), `list[object]`
  The latest user message, or the conversation messages sent to the model when `pass_all_history_messages` is `true`. Either `messages` or `question` is required.
- `"question"`: (*Body Parameter*), `string`
  Latest user question. This is equivalent to passing `messages: [{"role": "user", "content": question}]`.
- `"stream"`: (*Body Parameter*), `boolean`
  Enables streaming output:
  - `true`: Enable streaming (default).
  - `false`: Disable streaming.
- `"chat_id"`: (*Body Parameter*)
  Optional chat assistant ID. If omitted, the tenant's default chat model is used directly.
- `"session_id"`: (*Body Parameter*)
  Optional session ID. If `chat_id` is provided but `session_id` is omitted, a new session will be generated automatically.
- `"llm_id"`: (*Body Parameter*), `string`
  Optional model override when a specific chat model should be used for this request.
- `"pass_all_history_messages"`: (*Body Parameter*), `boolean`
  When `chat_id` and `session_id` are provided, defaults to `false`, so the server uses stored session history and only the latest user message from the request. Set to `true` to replace/use the submitted full `messages` history, and overrides the stored session history.
- `"legacy"`: (*Body Parameter*), `boolean`
  Defaults to `false`. Enables backward compatibility with RAGFlow v0.23.0 for streaming responses. When set to `true`:
  - Cumulative output: The `"answer"` field in each chunk returns the entire text generated so far, rather than just the new tokens (deltas).
  - No reasoning markers: The `start_to_think` and `end_to_think` signals are stripped from the stream.

#### Response

Success without `chat_id` or `session_id`:

```json
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "I am an assistant powered by the tenant's default chat model.",
        "reference": {},
        "audio_binary": null,
        "id": "b01eed84b85611efa0e90242ac120005",
        "session_id": ""
    }
}
data:{
    "code": 0,
    "message": "",
    "data": true
}
```

Success with `chat_id` and `session_id`:

Streaming response example with `chat_id` and `session_id`:

```json
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250170.37759,
        "final": false,
        "start_to_think": true,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "The user just said \"hello\". I should respond warmly and ask how I can help.",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250170.3778317,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": " Let's keep it short and friendly.",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250171.101234,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250171.5262048,
        "final": false,
        "end_to_think": true,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "Hello! 👋 Welcome!",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250171.5266216,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": true
}
```

For `legacy: true`, the same request keeps the thinking content inside `answer` as literal `<think>` tags, and appends the final answer after `</think>`:

```json
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "<think>The user just said \"hello\".",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250170.3778317,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "<think>The user just said \"hello\". I should respond warmly and ask how I can help.",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250170.901234,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "<think>The user just said \"hello\". I should respond warmly and ask how I can help. Let's keep it short and friendly.</think>Hello! 👋 Welcome!",
        "reference": {
            "chunks": []
        },
        "audio_binary": null,
        "prompt": "",
        "created_at": 1781250171.5262048,
        "final": false,
        "id": "76961783-1523-43f7-8148-19da08247922",
        "session_id": "4edfabd6663211f1943e217dfc5f0165",
        "chat_id": "d90fd732646f11f1803d2fb3c77f9b23"
    }
}
data:{
    "code": 0,
    "message": "",
    "data": true
}
```

Failure:

```json
{
    "code": 102,
    "message": "Please input your question."
}
```

---

### Create session with agent

:::danger DEPRECATED
This method is deprecated and no longer recommended. Use `Converse with agent` (`POST /api/v1/agents/chat/completions`) instead; it automatically creates a session ID for the associated agent when `session_id` is not specified.
:::

**POST** `/api/v1/agents/{agent_id}/sessions`

Creates a session with an agent.

#### Request

- Method: POST
- URL: `/api/v1/agents/{agent_id}/sessions?user_id={user_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"user_id"`: `string` (optional)
  - Other parameters:
    The variables specified in the **Begin** component.

##### Request example

If the **Begin** component in your agent does not take required parameters:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     }'
```

##### Request parameters

- `agent_id`: (*Path parameter*)
  The ID of the associated agent.
- `user_id`: (*Body or query parameter*), `string`, *Optional*
  A user-defined ID associated with the created session. It can be provided either in the JSON request body or as a URL query parameter. If both are provided, the value in the request body takes precedence. If omitted, the tenant ID associated with the current API key is used.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "agent_id": "dbb4ed366e8611f09690a55a6daec4ef",
        "dsl": {
            "components": {
                "Message:EightyJobsAsk": {
                    "downstream": [],
                    "obj": {
                        "component_name": "Message",
                        "params": {
                            "content": [
                                "{begin@var1}{begin@var2}"
                            ],
                            "debug_inputs": {},
                            "delay_after_error": 2.0,
                            "description": "",
                            "exception_default_value": null,
                            "exception_goto": null,
                            "exception_method": null,
                            "inputs": {},
                            "max_retries": 0,
                            "message_history_window_size": 22,
                            "outputs": {
                                "content": {
                                    "type": "str",
                                    "value": null
                                }
                            },
                            "stream": true
                        }
                    },
                    "upstream": [
                        "begin"
                    ]
                },
                "begin": {
                    "downstream": [
                        "Message:EightyJobsAsk"
                    ],
                    "obj": {
                        "component_name": "Begin",
                        "params": {
                            "debug_inputs": {},
                            "delay_after_error": 2.0,
                            "description": "",
                            "enablePrologue": true,
                            "enable_tips": true,
                            "exception_default_value": null,
                            "exception_goto": null,
                            "exception_method": null,
                            "inputs": {
                                "var1": {
                                    "name": "var1",
                                    "optional": false,
                                    "options": [],
                                    "type": "line",
                                    "value": null
                                },
                                "var2": {
                                    "name": "var2",
                                    "optional": false,
                                    "options": [],
                                    "type": "line",
                                    "value": null
                                }
                            },
                            "max_retries": 0,
                            "message_history_window_size": 22,
                            "mode": "conversational",
                            "outputs": {},
                            "prologue": "Hi! I'm your assistant. What can I do for you?",
                            "tips": "Please fill in the form"
                        }
                    },
                    "upstream": []
                }
            },
            "globals": {
                "sys.conversation_turns": 0,
                "sys.files": [],
                "sys.query": "",
                "sys.user_id": ""
            },
            "graph": {
                "edges": [
                    {
                        "data": {
                            "isHovered": false
                        },
                        "id": "xy-edge__beginstart-Message:EightyJobsAskend",
                        "markerEnd": "logo",
                        "source": "begin",
                        "sourceHandle": "start",
                        "style": {
                            "stroke": "rgba(151, 154, 171, 1)",
                            "strokeWidth": 1
                        },
                        "target": "Message:EightyJobsAsk",
                        "targetHandle": "end",
                        "type": "buttonEdge",
                        "zIndex": 1001
                    }
                ],
                "nodes": [
                    {
                        "data": {
                            "form": {
                                "enablePrologue": true,
                                "inputs": {
                                    "var1": {
                                        "name": "var1",
                                        "optional": false,
                                        "options": [],
                                        "type": "line"
                                    },
                                    "var2": {
                                        "name": "var2",
                                        "optional": false,
                                        "options": [],
                                        "type": "line"
                                    }
                                },
                                "mode": "conversational",
                                "prologue": "Hi! I'm your assistant. What can I do for you?"
                            },
                            "label": "Begin",
                            "name": "begin"
                        },
                        "dragging": false,
                        "id": "begin",
                        "measured": {
                            "height": 112,
                            "width": 200
                        },
                        "position": {
                            "x": 270.64098070942583,
                            "y": -56.320928437811176
                        },
                        "selected": false,
                        "sourcePosition": "left",
                        "targetPosition": "right",
                        "type": "beginNode"
                    },
                    {
                        "data": {
                            "form": {
                                "content": [
                                    "{begin@var1}{begin@var2}"
                                ]
                            },
                            "label": "Message",
                            "name": "Message_0"
                        },
                        "dragging": false,
                        "id": "Message:EightyJobsAsk",
                        "measured": {
                            "height": 57,
                            "width": 200
                        },
                        "position": {
                            "x": 279.5,
                            "y": 190
                        },
                        "selected": true,
                        "sourcePosition": "right",
                        "targetPosition": "left",
                        "type": "messageNode"
                    }
                ]
            },
            "history": [],
            "memory": [],
            "messages": [],
            "path": [],
            "retrieval": [],
            "task_id": "dbb4ed366e8611f09690a55a6daec4ef"
        },
        "id": "0b02fe80780e11f084adcfdc3ed1d902",
        "message": [
            {
                "content": "Hi! I'm your assistant. What can I do for you?",
                "role": "assistant"
            }
        ],
        "source": "agent",
        "user_id": "c3fb861af27a11efa69751e139332ced"
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

---

### Converse with agent

**POST** `/api/v1/agents/chat/completions`

Asks a specified agent a question to start an AI-powered conversation.

Uses a single completion endpoint for all agent conversations.

:::warning DEPRECATED
`POST /api/v1/agents/{agent_id}/completions` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/agents/chat/completions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

#### Standard mode

Use this mode for the native agent API.

##### Body

- `"agent_id"`: `string`
- `"query"`: `string`
- `"stream"`: `boolean`
- `"session_id"`: `string` (optional)
- `"inputs"`: `object` (optional)
- `"files"`: `list[object]` (optional)
- `"user_id"`: `string` (optional)
- `"return_trace"`: `boolean` (optional, default `false`)
- `"chat_template_kwargs"`: `object` (optional)

#### Streaming events to handle

When `stream=true`, the server sends Server-Sent Events (SSE). A client should handle these events:

- `message`: Streaming content from the **Message** components.
- `message_end`: End of a **Message** component, which may include `reference` or `attachment`.
- `node_finished`: A component finishes. `data.inputs`, `data.outputs`, `data.error`, and `data.elapsed_time` describe the node result. If `return_trace=true`, the same event also contains `data.trace`.

The stream terminates with `[DONE]`.

:::info IMPORTANT
You can include custom parameters in the request body, but they must be defined in the [Begin](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component) component first.
:::

##### Request examples

If the **Begin** component does not take parameters:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
        "agent_id": "AGENT_ID",
        "query": "Hello",
        "stream": false
     }'
```

- If the **Begin** component takes parameters, include their values in the body of `"inputs"` as follows:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
        "agent_id": "AGENT_ID",
        "query": "",
        "stream": false,
        "inputs": {
            "line_var": {
                "type": "line",
                "value": "I am line_var"
            },
            "int_var": {
                "type": "integer",
                "value": 1
            },
            "paragraph_var": {
                "type": "paragraph",
                "value": "a\nb\nc"
            },
            "option_var": {
                "type": "options",
                "value": "option 2"
            },
            "boolean_var": {
                "type": "boolean",
                "value": true
            }
        }
     }'
```

To continue an existing session:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
        "agent_id": "AGENT_ID",
        "query": "Hello again",
        "stream": true,
        "session_id": "cb2f385cb86211efa36e0242ac120005"
     }'
```

##### Request parameters

- `"agent_id"`: (*Body parameter*), `string`, *Required*
  The ID of the associated agent.
- `"query"`: (*Body parameter*), `string`
  The question to start an AI-powered conversation.
- `"stream"`: (*Body Parameter*), `boolean`
  Indicates whether to output responses in a streaming way:
  - `true`: Enable streaming (default).
  - `false`: Disable streaming.
- `"session_id"`: (*Body Parameter*)
  The ID of the session. If it is not provided, a new session will be generated.
- `"inputs"`: (*Body parameter*), `object`
  Values for variables defined in the **Begin** component. Each variable value must be an object containing a `"value"` field and may include a `"type"` field.
- `"user_id"`: (*Body parameter*), `string`
  The optional user-defined ID. Valid *only* when no `session_id` is provided.
- `"chat_template_kwargs"`: (*Body parameter*), `object`
  Optional passthrough parameters for the underlying LLM's chat template. Commonly used to toggle thinking/reasoning modes on supported models (e.g., `{"enable_thinking": false}`).

:::tip NOTE
For now, this method does *not* support a file type input/variable. As a workaround, use the following to upload a file to an agent:
`http://{address}/v1/canvas/upload/{agent_id}`
*You will get a corresponding file ID from its response body.*
:::

##### Response

Standard mode stream:

```json
data: {
    "event": "message",
    "message_id": "cecdcb0e83dc11f0858253708ecb6573",
    "created_at": 1756364483,
    "task_id": "d1f79142831f11f09cc51795b9eb07c0",
    "data": {
        "content": "Hello"
    },
    "session_id": "cd097ca083dc11f0858253708ecb6573"
}

data: {
    "event": "message_end",
    "message_id": "cecdcb0e83dc11f0858253708ecb6573",
    "created_at": 1756364483,
    "task_id": "d1f79142831f11f09cc51795b9eb07c0",
    "data": {
        "reference": {}
    },
    "session_id": "cd097ca083dc11f0858253708ecb6573"
}

data:[DONE]
```

When `extra_body.reference_metadata.include` is `true`, each reference chunk may include a `document_metadata` object.

Standard mode non-stream:

```json
{
    "code": 0,
    "data": {
        "data": {
            "content": "Hello",
            "reference": {},
            "trace": []
        },
        "message_id": "c4692a2683d911f0858253708ecb6573",
        "session_id": "c39f6f9c83d911f0858253708ecb6573",
        "task_id": "d1f79142831f11f09cc51795b9eb07c0"
    }
}
```

If one or more components produce structured output, set `return_trace=true` and inspect that component output from `trace`.

#### OpenAI-compatible mode

Use the same endpoint and add `"openai-compatible": true`.

##### Body

- `"agent_id"`: `string`
- `"messages"`: `list[object]`
- `"openai-compatible"`: `boolean`, must be `true`
- `"stream"`: `boolean`
- `"session_id"`: `string` (optional)
- `"model"`: `string` (optional, accepted for compatibility)
- `"chat_template_kwargs"`: `object` (optional)

##### Request examples

Streaming request:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
        "agent_id": "AGENT_ID",
        "openai-compatible": true,
        "stream": true,
        "messages": [
            {
                "role": "user",
                "content": "Hello"
            }
        ],
        "chat_template_kwargs": {
            "enable_thinking": true
        }
     }'
```

Non-stream request with existing session:

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
        "agent_id": "AGENT_ID",
        "openai-compatible": true,
        "stream": false,
        "session_id": "cb2f385cb86211efa36e0242ac120005",
        "messages": [
            {
                "role": "user",
                "content": "Hello"
            }
        ]
     }'
```

##### Request parameters

- `"agent_id"`: (*Body parameter*), `string`, *Required*
  The ID of the associated agent.
- `"messages"`: (*Body parameter*), `list[object]`, *Required*
  OpenAI-style chat messages.
- `"openai-compatible"`: (*Body parameter*), `boolean`, *Required*
  Must be `true` to enable OpenAI-compatible responses.
- `"stream"`: (*Body parameter*), `boolean`
  Whether to return streaming chunks.
- `"session_id"`: (*Body parameter*), `string`
  Optional existing session ID.
- `"model"`: (*Body parameter*), `string`
  Optional compatibility field. The server still routes by `agent_id`.
- `"chat_template_kwargs"`: (*Body parameter*), `object`
  Optional passthrough parameters for the underlying LLM's chat template. Commonly used to toggle thinking/reasoning modes on supported models (e.g., `{"enable_thinking": false}`).

##### Response

OpenAI-compatible stream:

```json
data: {
    "id": "chatcmpl-xxx",
    "object": "chat.completion.chunk",
    "model": "AGENT_ID",
    "choices": [
        {
            "delta": {
                "content": "Hello"
            },
            "finish_reason": null,
            "index": 0
        }
    ]
}

data: [DONE]
```

OpenAI-compatible non-stream:

```json
{
    "id": "chatcmpl-xxx",
    "object": "chat.completion",
    "model": "AGENT_ID",
    "choices": [
        {
            "finish_reason": "stop",
            "index": 0,
            "message": {
                "role": "assistant",
                "content": "Hello",
                "reference": {}
            }
        }
    ],
    "usage": {
        "prompt_tokens": 6,
        "completion_tokens": 1,
        "total_tokens": 7
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

---

### List agent sessions

**GET** `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`

Lists sessions associated with a specified agent.

#### Request

- Method: GET
- URL: `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request Parameters

- `agent_id`: (*Path parameter*)
  The ID of the associated agent.
- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the sessions will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of sessions on each page. Defaults to `30`.
- `orderby`: (*Filter parameter*), `string`
  The field by which sessions should be sorted. Available options:
  - `create_time`
  - `update_time` (default)
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved sessions should be sorted in descending order. Defaults to `true`.
- `id`: (*Filter parameter*), `string`
  The ID of the agent session to retrieve.
- `user_id`: (*Filter parameter*), `string`
  The optional user-defined ID passed in when creating session.
- `dsl`: (*Filter parameter*), `boolean`
  Indicates whether to include the dsl field of the sessions in the response. Defaults to `true`.
- `keywords`: (*Filter parameter*), `string`
  Fuzzy-searches the session ID, session name, and session messages.
- `from_date`: (*Filter parameter*), `string`
  Filters sessions whose applicable date is on or after this date.
- `to_date`: (*Filter parameter*), `string`
  Filters sessions whose applicable date is on or before this date.
- `exp_user_id`: (*Filter parameter*), `string`
  Returns only the IDs and names of sessions associated with the specified external user ID. When provided, the endpoint uses this special listing mode and does not apply the other pagination and filtering parameters.

#### Response

Success:

```json
{
    "code": 0,
    "data": [{
        "agent_id": "e9e2b9c2b2f911ef801d0242ac120006",
        "dsl": {
            "answer": [],
            "components": {
                "Answer:OrangeTermsBurn": {
                    "downstream": [],
                    "obj": {
                        "component_name": "Answer",
                        "params": {}
                    },
                    "upstream": []
                },
                "Generate:SocialYearsRemain": {
                    "downstream": [],
                    "obj": {
                        "component_name": "Generate",
                        "params": {
                            "cite": true,
                            "frequency_penalty": 0.7,
                            "llm_id": "gpt-4o___OpenAI-API@OpenAI-API-Compatible",
                            "message_history_window_size": 12,
                            "parameters": [],
                            "presence_penalty": 0.4,
                            "prompt": "Please summarize the following paragraph. Pay attention to the numbers and do not make things up. The paragraph is as follows:\n{input}\nThis is what you need to summarize.",
                            "temperature": 0.1,
                            "top_p": 0.3
                        }
                    },
                    "upstream": []
                },
                "begin": {
                    "downstream": [],
                    "obj": {
                        "component_name": "Begin",
                        "params": {}
                    },
                    "upstream": []
                }
            },
            "graph": {
                "edges": [],
                "nodes": [
                    {
                        "data": {
                            "label": "Begin",
                            "name": "begin"
                        },
                        "height": 44,
                        "id": "begin",
                        "position": {
                            "x": 50,
                            "y": 200
                        },
                        "sourcePosition": "left",
                        "targetPosition": "right",
                        "type": "beginNode",
                        "width": 200
                    },
                    {
                        "data": {
                            "form": {
                                "cite": true,
                                "frequencyPenaltyEnabled": true,
                                "frequency_penalty": 0.7,
                                "llm_id": "gpt-4o___OpenAI-API@OpenAI-API-Compatible",
                                "maxTokensEnabled": true,
                                "message_history_window_size": 12,
                                "parameters": [],
                                "presencePenaltyEnabled": true,
                                "presence_penalty": 0.4,
                                "prompt": "Please summarize the following paragraph. Pay attention to the numbers and do not make things up. The paragraph is as follows:\n{input}\nThis is what you need to summarize.",
                                "temperature": 0.1,
                                "temperatureEnabled": true,
                                "topPEnabled": true,
                                "top_p": 0.3
                            },
                            "label": "Generate",
                            "name": "Generate Answer_0"
                        },
                        "dragging": false,
                        "height": 105,
                        "id": "Generate:SocialYearsRemain",
                        "position": {
                            "x": 561.3457829707513,
                            "y": 178.7211182312641
                        },
                        "positionAbsolute": {
                            "x": 561.3457829707513,
                            "y": 178.7211182312641
                        },
                        "selected": true,
                        "sourcePosition": "right",
                        "targetPosition": "left",
                        "type": "generateNode",
                        "width": 200
                    },
                    {
                        "data": {
                            "form": {},
                            "label": "Answer",
                            "name": "Dialogue_0"
                        },
                        "height": 44,
                        "id": "Answer:OrangeTermsBurn",
                        "position": {
                            "x": 317.2368194777658,
                            "y": 218.30635555445093
                        },
                        "sourcePosition": "right",
                        "targetPosition": "left",
                        "type": "logicNode",
                        "width": 200
                    }
                ]
            },
            "history": [],
            "messages": [],
            "path": [],
            "reference": []
        },
        "id": "792dde22b2fa11ef97550242ac120006",
        "message": [
            {
                "content": "Hi! I'm your smart assistant. What can I do for you?",
                "role": "assistant"
            }
        ],
        "source": "agent",
        "user_id": ""
    }]
}
```

Failure:

```json
{
    "code": 102,
    "message": "You don't own the agent ccd2f856b12311ef94ca0242ac1200052."
}
```

---

### Delete agent's sessions

**DELETE** `/api/v1/agents/{agent_id}/sessions`

Deletes sessions of an agent by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/agents/{agent_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["test_1", "test_2"]
     }'
```

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

##### Request Parameters

- `agent_id`: (*Path parameter*)
  The ID of the associated agent.
- `"ids"`: (*Body Parameter*), `list[string]`
  The IDs of the sessions to delete.
  - If omitted, or set to `null` or an empty array, no sessions are deleted.
  - If an array of IDs is provided, only the sessions matching those IDs are deleted.
- `"delete_all"`: (*Body Parameter*), `boolean`
  Whether to delete all sessions of the specified agent when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

#### Response

Success:

```json
{
    "code": 0
}
```

Failure:

```json
{
    "code": 102,
    "message": "The agent doesn't own the session cbd31e52f73911ef93b232903b842af6"
}
```

---

### Text-to-speech

**POST** `/api/v1/chat/audio/speech`

Converts text to speech audio using the tenant's default TTS model, returning a streaming audio response.

#### Request

- Method: POST
- URL: `/api/v1/chat/audio/speech`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"text"`: `string` *(Required)* The text to synthesize.

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/speech \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --output audio.mp3 \
     --data '{"text": "Hello, how can I help you today?"}'
```

#### Response

Success: binary `audio/mpeg` stream with headers `Cache-Control: no-cache`, `Connection: keep-alive`, `X-Accel-Buffering: no`.

Failure:

```json
{
    "code": 102,
    "message": "No default TTS model is set"
}
```

---

### Speech-to-text

**POST** `/api/v1/chat/audio/transcription`

Transcribes an audio file using the tenant's default ASR (automatic speech recognition) model.

#### Request

- Method: POST
- URL: `/api/v1/chat/audio/transcription`
- Headers:
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body (multipart/form-data):
  - `"file"`: audio file (`.wav`, `.mp3`, `.m4a`, `.aac`, `.flac`, `.ogg`, `.webm`, `.opus`, `.wma`)
  - `"stream"`: `string` `"true"` for SSE streaming, `"false"` (default) for a single JSON response.

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/transcription \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --form file=@recording.wav \
     --form stream=false
```

#### Response

Success (non-streaming):

```json
{
    "code": 0,
    "data": {
        "text": "Hello, how can I help you today?"
    }
}
```

Success (streaming): SSE events with `data: {"event": "partial", "text": "..."}`.

Failure:

```json
{
    "code": 102,
    "message": "Unsupported audio format: .mp4. Allowed: .aac, .flac, .m4a, .mp3, .ogg, .opus, .wav, .webm, .wma"
}
```

---

### Generate mind map

**POST** `/api/v1/chat/mindmap`

Generates a mind map from a question and a set of knowledge base IDs.

#### Request

- Method: POST
- URL: `/api/v1/chat/mindmap`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The central question or topic.
  - `"kb_ids"`: `list[string]` *(Required)* Knowledge base IDs to search.
  - `"search_id"`: `string` *(Optional)* ID of a saved search configuration to merge additional `kb_ids` and settings.

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/mindmap \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
         "question": "What is retrieval-augmented generation?",
         "kb_ids": ["kb-abc123"]
     }'
```

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "name": "Retrieval-Augmented Generation",
        "children": [...]
    }
}
```

Failure:

```json
{
    "code": 500,
    "message": "..."
}
```

---

### Generate related questions

**POST** `/api/v1/chat/recommendation`

Generates five to ten alternative question strings from the user's original query to retrieve more relevant search results.

:::warning DEPRECATED
`POST /api/v1/sessions/related_questions` is deprecated. Use this endpoint instead.
:::

This operation requires a `Bearer Login Token`, which typically expires with in 24 hours. You can find it in the Request Headers in your browser easily as shown below:

![Image](/ragflow-images/login_token.jpg)

:::tip NOTE
The chat model autonomously determines the number of questions to generate based on the instruction, typically between five and ten.
:::

#### Request

- Method: POST
- URL: `/api/v1/chat/recommendation`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The original user question.
  - `"search_id"`: `string` *(Optional)* ID of a saved search configuration to use custom LLM settings.

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/recommendation \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
          "question": "What are the key advantages of Neovim over Vim?"
     }'
```

##### Request Parameters

- `"question"`: (*Body Parameter*), `string`
  The original user question.
- `"search_id"`: (*Body Parameter*), `string`
  ID of a saved search configuration to use custom LLM settings. If provided, the LLM model and generation settings from the search configuration will be used.

#### Response

Success:

```json
{
    "code": 0,
    "data": [
        "What makes Neovim superior to Vim in terms of features?",
        "How do the benefits of Neovim compare to those of Vim?",
        "What advantages does Neovim offer that are not present in Vim?",
        "In what ways does Neovim outperform Vim in functionality?",
        "What are the most significant improvements in Neovim compared to Vim?",
        "What unique advantages does Neovim bring to the table over Vim?",
        "How does the user experience in Neovim differ from Vim in terms of benefits?",
        "What are the top reasons to switch from Vim to Neovim?",
        "What features of Neovim are considered more advanced than those in Vim?"
    ],
    "message": "success"
}
```

Failure:

```json
{
    "code": 401,
    "data": null,
    "message": "<Unauthorized '401: Unauthorized'>"
}
```

---
