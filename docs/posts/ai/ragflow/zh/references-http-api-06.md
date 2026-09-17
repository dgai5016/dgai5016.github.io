# HTTP API 参考（第 6 部分）

## 会话管理

---

### 与对话助手创建会话

**POST** `/api/v1/chats/{chat_id}/sessions`

创建与对话助手的会话。

#### 请求

- 方法：POST
- URL：`/api/v1/chats/{chat_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"user_id"`: `string`（可选）

##### 请求示例

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

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `"name"`：（*请求体参数*），`string`
  待创建会话的名称。
- `"user_id"`：（*请求体参数*），`string`
  可选的用户自定义 ID。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

---

### 更新对话助手的会话

**PATCH** `/api/v1/chats/{chat_id}/sessions/{session_id}`

更新指定对话助手的某个会话。

:::warning 已弃用
`PUT /api/v1/chats/{chat_id}/sessions/{session_id}` 已弃用。请改用本端点。
:::

#### 请求

- 方法：PATCH
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`

##### 请求示例

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

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  待更新会话的 ID。
- `"name"`：（*请求体参数*），`string`
  修改后的会话名称。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

---

### 列出对话助手的会话

**GET** `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`

列出与指定对话助手关联的会话。

#### 请求

- 方法：GET
- URL：`/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `page`：（*筛选参数*），`integer`
  指定会话显示的页码。默认为 `1`。
- `page_size`：（*筛选参数*），`integer`
  每页的会话数量。默认为 `30`。若设为 `0`，则返回空列表。
- `orderby`：（*筛选参数*），`string`
  会话排序依据的字段。可用选项：
  - `create_time`（默认）
  - `update_time`
- `desc`：（*筛选参数*），`boolean`
  指示检索到的会话是否按降序排列。默认为 `true`。
- `name`：（*筛选参数*），`string`
  待检索会话的名称。
- `id`：（*筛选参数*），`string`
  待检索会话的 ID。
- `user_id`：（*筛选参数*），`string`
  创建会话时传入的可选用户自定义 ID。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "The session doesn't exist"
}
```

---

### 获取对话助手的会话

**GET** `/api/v1/chats/{chat_id}/sessions/{session_id}`

获取指定对话助手的特定会话，包括其消息、引用和头像。

#### 请求

- 方法：GET
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  待检索会话的 ID。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### 删除对话助手会话中的消息

**DELETE** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`

从指定的对话助手会话中删除一条用户消息及其配对的助手回复。

#### 请求

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  该消息所属会话的 ID。
- `msg_id`：（*路径参数*）
  待删除消息的 ID。

#### 响应

成功：返回更新后的会话对象。

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

失败：

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### 更新对话助手会话中的消息反馈

**PUT** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`

更新指定对话助手会话中某条助手消息的反馈。

#### 请求

- 方法：PUT
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"thumbup"`: `boolean`
  - `"feedback"`: `string`（可选）

##### 请求示例

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

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  该消息所属会话的 ID。
- `msg_id`：（*路径参数*）
  待更新的助手消息的 ID。
- `"thumbup"`：（*请求体参数*），`boolean`
  该助手消息是否被标记为正面反馈。
- `"feedback"`：（*请求体参数*），`string`
  可选的反馈文本，通常在 `"thumbup"` 为 `false` 时使用。

#### 响应

成功：返回更新后的会话对象。

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

失败：

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

---

### 删除对话助手的会话

**DELETE** `/api/v1/chats/{chat_id}/sessions`

按 ID 删除对话助手的会话。

#### 请求

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### 请求示例

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

##### 请求参数

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  待删除会话的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何会话。
  - 若提供 ID 数组，则仅删除匹配这些 ID 的会话。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略、设为 `null` 或为空数组时，是否删除指定对话助手的全部会话。默认为 `false`。

#### 响应

成功：

```json
{
    "code": 0
}
```

失败：

```json
{
    "code": 102,
    "message": "The chat doesn't own the session"
}
```

---

### 与对话助手对话

**POST** `/api/v1/chat/completions`

发起一个对话补全请求。同一端点支持三种模式：

:::warning 已弃用
`POST /api/v1/chats/{chat_id}/completions` 已弃用。请改用本端点。
:::

- 不带 `chat_id`：直接与租户的默认对话模型对话。
- 带 `chat_id` 但不带 `session_id`：使用该对话的配置并自动创建新会话。
- 同时带 `chat_id` 和 `session_id`：继续已有的对话会话。

:::tip 注意

- 流式模式下，并非所有响应都包含引用，因为这取决于系统的判断。
- 流式模式下，最后一条消息是空消息：

  ```json
  data:
  {
    "code": 0,
    "data": true
  }
  ```

:::

#### 请求

- 方法：POST
- URL：`/api/v1/chat/completions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"messages"`: `list[object]`
  - `"question"`: `string`
  - `"stream"`: `boolean`
  - `"chat_id"`: `string`（可选）
  - `"session_id"`: `string`（可选）
  - `"llm_id"`: `string`（可选）
  - `"pass_all_history_messages"`: `boolean`（可选）
  - `"legacy"`: `boolean`（可选）

##### 请求示例

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

##### 请求参数

- `"messages"`：（*请求体参数*），`list[object]`
  最新的用户消息；当 `pass_all_history_messages` 为 `true` 时，则是发送给模型的完整对话消息。`messages` 与 `question` 二者必填其一。
- `"question"`：（*请求体参数*），`string`
  最新的用户问题。等价于传入 `messages: [{"role": "user", "content": question}]`。
- `"stream"`：（*请求体参数*），`boolean`
  启用流式输出：
  - `true`：启用流式（默认）。
  - `false`：禁用流式。
- `"chat_id"`：（*请求体参数*）
  可选的对话助手 ID。若省略，则直接使用租户的默认对话模型。
- `"session_id"`：（*请求体参数*）
  可选的会话 ID。若提供了 `chat_id` 但省略了 `session_id`，将自动生成新会话。
- `"llm_id"`：（*请求体参数*），`string`
  本次请求需要使用特定对话模型时的可选模型覆盖。
- `"pass_all_history_messages"`：（*请求体参数*），`boolean`
  当提供了 `chat_id` 和 `session_id` 时默认为 `false`，此时服务器使用已存储的会话历史，只取请求中最新的用户消息。设为 `true` 则改为使用提交的完整 `messages` 历史，覆盖已存储的会话历史。
- `"legacy"`：（*请求体参数*），`boolean`
  默认为 `false`。为流式响应启用与 RAGFlow v0.23.0 的向后兼容。设为 `true` 时：
  - 累积输出：每个分块中的 `"answer"` 字段返回迄今为止生成的全部文本，而不仅仅是新增的 token（增量）。
  - 无推理标记：`start_to_think` 和 `end_to_think` 信号会从流中剥离。

#### 响应

不带 `chat_id` 或 `session_id` 的成功响应：

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

带 `chat_id` 和 `session_id` 的成功响应：

带 `chat_id` 和 `session_id` 的流式响应示例：

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

对于 `legacy: true`，同一请求会把思考内容以字面 `<think>` 标签的形式保留在 `answer` 中，并在 `</think>` 之后追加最终答案：

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

失败：

```json
{
    "code": 102,
    "message": "Please input your question."
}
```

---

### 与 Agent 创建会话

:::danger 已弃用
此方法已弃用，不再推荐使用。请改用「与 Agent 对话」（`POST /api/v1/agents/chat/completions`）；未指定 `session_id` 时，它会自动为关联的 Agent 创建会话 ID。
:::

**POST** `/api/v1/agents/{agent_id}/sessions`

创建与 Agent 的会话。

#### 请求

- 方法：POST
- URL：`/api/v1/agents/{agent_id}/sessions?user_id={user_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"user_id"`: `string`（可选）
  - 其他参数：
    **Begin** 组件中指定的变量。

##### 请求示例

如果你的 Agent 中 **Begin** 组件不接收必填参数：

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     }'
```

##### 请求参数

- `agent_id`：（*路径参数*）
  关联 Agent 的 ID。
- `user_id`：（*请求体或查询参数*），`string`，*可选*
  与所创建会话关联的用户自定义 ID。可以在 JSON 请求体中提供，也可以作为 URL 查询参数提供。若两者都提供，则以请求体中的值为准。若省略，则使用与当前 API key 关联的租户 ID。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

---

### 与 Agent 对话

**POST** `/api/v1/agents/chat/completions`

向指定 Agent 提问，开启一次 AI 驱动的对话。

所有 Agent 对话共用一个补全端点。

:::warning 已弃用
`POST /api/v1/agents/{agent_id}/completions` 已弃用。请改用本端点。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/agents/chat/completions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

#### 标准模式

此模式用于原生 Agent API。

##### 请求体

- `"agent_id"`: `string`
- `"query"`: `string`
- `"stream"`: `boolean`
- `"session_id"`: `string`（可选）
- `"inputs"`: `object`（可选）
- `"files"`: `list[object]`（可选）
- `"user_id"`: `string`（可选）
- `"return_trace"`: `boolean`（可选，默认 `false`）
- `"chat_template_kwargs"`: `object`（可选）

#### 需要处理的流式事件

当 `stream=true` 时，服务器会发送服务器推送事件（SSE）。客户端应处理以下事件：

- `message`：来自 **Message** 组件的流式内容。
- `message_end`：某个 **Message** 组件结束，可能附带 `reference` 或 `attachment`。
- `node_finished`：某个组件执行完毕。`data.inputs`、`data.outputs`、`data.error` 和 `data.elapsed_time` 描述该节点的结果。若 `return_trace=true`，同一事件还会包含 `data.trace`。

流以 `[DONE]` 结束。

:::info 重要
你可以在请求体中包含自定义参数，但必须先在 [Begin](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component) 组件中定义它们。
:::

##### 请求示例

若 **Begin** 组件不接收参数：

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

- 若 **Begin** 组件接收参数，请按如下方式将参数值包含在 `"inputs"` 中：

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

继续已有会话：

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

##### 请求参数

- `"agent_id"`：（*请求体参数*），`string`，*必填*
  关联 Agent 的 ID。
- `"query"`：（*请求体参数*），`string`
  用于开启 AI 驱动对话的问题。
- `"stream"`：（*请求体参数*），`boolean`
  指示是否以流式方式输出响应：
  - `true`：启用流式（默认）。
  - `false`：禁用流式。
- `"session_id"`：（*请求体参数*）
  会话的 ID。若未提供，将生成新会话。
- `"inputs"`：（*请求体参数*），`object`
  **Begin** 组件中所定义变量的取值。每个变量值必须是一个包含 `"value"` 字段的对象，也可以包含 `"type"` 字段。
- `"user_id"`：（*请求体参数*），`string`
  可选的用户自定义 ID。*仅*在未提供 `session_id` 时有效。
- `"chat_template_kwargs"`：（*请求体参数*），`object`
  传递给底层 LLM 聊天模板的可选透传参数。常用于在支持的模型上切换思考/推理模式（例如 `{"enable_thinking": false}`）。

:::tip 注意
目前此方法*不*支持文件类型的输入/变量。作为变通方案，可使用以下地址向 Agent 上传文件：
`http://{address}/v1/canvas/upload/{agent_id}`
*你将从其响应体中获得对应的文件 ID。*
:::

##### 响应

标准模式流式响应：

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

当 `extra_body.reference_metadata.include` 为 `true` 时，每个引用分块都可能包含 `document_metadata` 对象。

标准模式非流式响应：

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

如果一个或多个组件产生结构化输出，请设置 `return_trace=true` 并从 `trace` 中检查该组件的输出。

#### OpenAI 兼容模式

使用同一端点并添加 `"openai-compatible": true`。

##### 请求体

- `"agent_id"`: `string`
- `"messages"`: `list[object]`
- `"openai-compatible"`: `boolean`，必须为 `true`
- `"stream"`: `boolean`
- `"session_id"`: `string`（可选）
- `"model"`: `string`（可选，为兼容性而接受）
- `"chat_template_kwargs"`: `object`（可选）

##### 请求示例

流式请求：

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

带已有会话的非流式请求：

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

##### 请求参数

- `"agent_id"`：（*请求体参数*），`string`，*必填*
  关联 Agent 的 ID。
- `"messages"`：（*请求体参数*），`list[object]`，*必填*
  OpenAI 风格的对话消息。
- `"openai-compatible"`：（*请求体参数*），`boolean`，*必填*
  必须为 `true` 以启用 OpenAI 兼容响应。
- `"stream"`：（*请求体参数*），`boolean`
  是否返回流式分块。
- `"session_id"`：（*请求体参数*），`string`
  可选的已有会话 ID。
- `"model"`：（*请求体参数*），`string`
  可选的兼容性字段。服务器仍按 `agent_id` 路由。
- `"chat_template_kwargs"`：（*请求体参数*），`object`
  传递给底层 LLM 聊天模板的可选透传参数。常用于在支持的模型上切换思考/推理模式（例如 `{"enable_thinking": false}`）。

##### 响应

OpenAI 兼容流式响应：

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

OpenAI 兼容非流式响应：

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

失败：

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

---

### 列出 Agent 会话

**GET** `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`

列出与指定 Agent 关联的会话。

#### 请求

- 方法：GET
- URL：`/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `agent_id`：（*路径参数*）
  关联 Agent 的 ID。
- `page`：（*筛选参数*），`integer`
  指定会话显示的页码。默认为 `1`。
- `page_size`：（*筛选参数*），`integer`
  每页的会话数量。默认为 `30`。
- `orderby`：（*筛选参数*），`string`
  会话排序依据的字段。可用选项：
  - `create_time`
  - `update_time`（默认）
- `desc`：（*筛选参数*），`boolean`
  指示检索到的会话是否按降序排列。默认为 `true`。
- `id`：（*筛选参数*），`string`
  待检索 Agent 会话的 ID。
- `user_id`：（*筛选参数*），`string`
  创建会话时传入的可选用户自定义 ID。
- `dsl`：（*筛选参数*），`boolean`
  指示响应中是否包含会话的 dsl 字段。默认为 `true`。
- `keywords`：（*筛选参数*），`string`
  对会话 ID、会话名称和会话消息进行模糊搜索。
- `from_date`：（*筛选参数*），`string`
  筛选适用日期在该日期当天或之后的会话。
- `to_date`：（*筛选参数*），`string`
  筛选适用日期在该日期当天或之前的会话。
- `exp_user_id`：（*筛选参数*），`string`
  仅返回与指定外部用户 ID 关联的会话的 ID 和名称。提供此参数时，端点会使用这一特殊列表模式，不再应用其他分页和筛选参数。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "You don't own the agent ccd2f856b12311ef94ca0242ac1200052."
}
```

---

### 删除 Agent 的会话

**DELETE** `/api/v1/agents/{agent_id}/sessions`

按 ID 删除 Agent 的会话。

#### 请求

- 方法：DELETE
- URL：`/api/v1/agents/{agent_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### 请求示例

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

##### 请求参数

- `agent_id`：（*路径参数*）
  关联 Agent 的 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  待删除会话的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何会话。
  - 若提供 ID 数组，则仅删除匹配这些 ID 的会话。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略、设为 `null` 或为空数组时，是否删除指定 Agent 的全部会话。默认为 `false`。

#### 响应

成功：

```json
{
    "code": 0
}
```

失败：

```json
{
    "code": 102,
    "message": "The agent doesn't own the session cbd31e52f73911ef93b232903b842af6"
}
```

---

### 文本转语音

**POST** `/api/v1/chat/audio/speech`

使用租户的默认 TTS 模型将文本转换为语音音频，返回流式音频响应。

#### 请求

- 方法：POST
- URL：`/api/v1/chat/audio/speech`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"text"`: `string` *（必填）* 要合成的文本。

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/speech \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --output audio.mp3 \
     --data '{"text": "Hello, how can I help you today?"}'
```

#### 响应

成功：二进制 `audio/mpeg` 流，响应头为 `Cache-Control: no-cache`、`Connection: keep-alive`、`X-Accel-Buffering: no`。

失败：

```json
{
    "code": 102,
    "message": "No default TTS model is set"
}
```

---

### 语音转文字

**POST** `/api/v1/chat/audio/transcription`

使用租户的默认 ASR（自动语音识别）模型转写音频文件。

#### 请求

- 方法：POST
- URL：`/api/v1/chat/audio/transcription`
- 请求头：
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体（multipart/form-data）：
  - `"file"`：音频文件（`.wav`、`.mp3`、`.m4a`、`.aac`、`.flac`、`.ogg`、`.webm`、`.opus`、`.wma`）
  - `"stream"`：`string`，`"true"` 表示 SSE 流式返回，`"false"`（默认）表示返回单个 JSON 响应。

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/transcription \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --form file=@recording.wav \
     --form stream=false
```

#### 响应

成功（非流式）：

```json
{
    "code": 0,
    "data": {
        "text": "Hello, how can I help you today?"
    }
}
```

成功（流式）：SSE 事件，形如 `data: {"event": "partial", "text": "..."}`。

失败：

```json
{
    "code": 102,
    "message": "Unsupported audio format: .mp4. Allowed: .aac, .flac, .m4a, .mp3, .ogg, .opus, .wav, .webm, .wma"
}
```

---

### 生成思维导图

**POST** `/api/v1/chat/mindmap`

根据一个问题和一组知识库 ID 生成思维导图。

#### 请求

- 方法：POST
- URL：`/api/v1/chat/mindmap`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 中心问题或主题。
  - `"kb_ids"`: `list[string]` *（必填）* 要搜索的知识库 ID。
  - `"search_id"`: `string` *（可选）* 已保存搜索配置的 ID，用于合并额外的 `kb_ids` 和设置。

##### 请求示例

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

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "name": "Retrieval-Augmented Generation",
        "children": [...]
    }
}
```

失败：

```json
{
    "code": 500,
    "message": "..."
}
```

---

### 生成相关问题

**POST** `/api/v1/chat/recommendation`

从用户的原始查询生成五到十个备选问题字符串，以检索出更相关的搜索结果。

:::warning 已弃用
`POST /api/v1/sessions/related_questions` 已弃用。请改用本端点。
:::

此操作需要 `Bearer Login Token`，该 token 通常在 24 小时内过期。你可以按下面所示，在浏览器的请求标头中轻松找到它：

![Image](/ragflow-images/login_token.jpg)

:::tip 注意
对话模型会依据指令自主决定生成的问题数量，通常在五到十个之间。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/chat/recommendation`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 用户的原始问题。
  - `"search_id"`: `string` *（可选）* 已保存搜索配置的 ID，用于使用自定义 LLM 设置。

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/recommendation \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
          "question": "What are the key advantages of Neovim over Vim?"
     }'
```

##### 请求参数

- `"question"`：（*请求体参数*），`string`
  用户的原始问题。
- `"search_id"`：（*请求体参数*），`string`
  用于使用自定义 LLM 设置的已保存搜索配置 ID。若提供，将使用该搜索配置中的 LLM 模型和生成设置。

#### 响应

成功：

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

失败：

```json
{
    "code": 401,
    "data": null,
    "message": "<Unauthorized '401: Unauthorized'>"
}
```

---
