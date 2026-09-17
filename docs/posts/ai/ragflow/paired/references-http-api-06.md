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

### 与对话助手创建会话

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chats/{chat_id}/sessions`

</template>
<template #zh>

**POST** `/api/v1/chats/{chat_id}/sessions`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a session with a chat assistant.

</template>
<template #zh>

创建与对话助手的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/chats/{chat_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"user_id"`: `string` (optional)

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/chats/{chat_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"user_id"`: `string`（可选）

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `"name"`: (*Body parameter*), `string`
  The name of the chat session to create.
- `"user_id"`: (*Body parameter*), `string`
  Optional user-defined ID.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `"name"`：（*请求体参数*），`string`
  待创建会话的名称。
- `"user_id"`：（*请求体参数*），`string`
  可选的用户自定义 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
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

**PATCH** `/api/v1/chats/{chat_id}/sessions/{session_id}`

</template>
<template #zh>

**PATCH** `/api/v1/chats/{chat_id}/sessions/{session_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Updates a session of a specified chat assistant.

</template>
<template #zh>

更新指定对话助手的某个会话。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`PUT /api/v1/chats/{chat_id}/sessions/{session_id}` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`PUT /api/v1/chats/{chat_id}/sessions/{session_id}` 已弃用。请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: PATCH
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`

</template>
<template #zh>

- 方法：PATCH
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameter

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session to update.
- `"name"`: (*Body Parameter*), `string`
  The revised name of the session.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  待更新会话的 ID。
- `"name"`：（*请求体参数*），`string`
  修改后的会话名称。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`name` can not be empty."
}
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

**GET** `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`

</template>
<template #zh>

**GET** `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists sessions associated with a specified chat assistant.

</template>
<template #zh>

列出与指定对话助手关联的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}&user_id={user_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "The session doesn't exist"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The session doesn't exist"
}
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

### Get chat assistant's session

</template>
<template #zh>

### 获取对话助手的会话

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/chats/{chat_id}/sessions/{session_id}`

</template>
<template #zh>

**GET** `/api/v1/chats/{chat_id}/sessions/{session_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Gets a specific session of a specified chat assistant, including its messages, references, and avatar.

</template>
<template #zh>

获取指定对话助手的特定会话，包括其消息、引用和头像。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session to retrieve.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  待检索会话的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Session not found!"
}
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

### Delete a message from a chat assistant's session

</template>
<template #zh>

### 删除对话助手会话中的消息

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`

</template>
<template #zh>

**DELETE** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes a user message and its paired assistant reply from a specified chat assistant session.

</template>
<template #zh>

从指定的对话助手会话中删除一条用户消息及其配对的助手回复。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `session_id`: (*Path parameter*)
  The ID of the session that owns the message.
- `msg_id`: (*Path parameter*)
  The ID of the message to delete.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `session_id`：（*路径参数*）
  该消息所属会话的 ID。
- `msg_id`：（*路径参数*）
  待删除消息的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success: returns the updated session object.

</template>
<template #zh>

成功：返回更新后的会话对象。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Session not found!"
}
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

### Update message feedback in a chat assistant's session

</template>
<template #zh>

### 更新对话助手会话中的消息反馈

</template>
</BiRow>

<BiRow>
<template #en>

**PUT** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`

</template>
<template #zh>

**PUT** `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`

</template>
</BiRow>

<BiRow>
<template #en>

Updates feedback for an assistant message in a specified chat assistant session.

</template>
<template #zh>

更新指定对话助手会话中某条助手消息的反馈。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: PUT
- URL: `/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"thumbup"`: `boolean`
  - `"feedback"`: `string` (optional)

</template>
<template #zh>

- 方法：PUT
- URL：`/api/v1/chats/{chat_id}/sessions/{session_id}/messages/{msg_id}/feedback`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"thumbup"`: `boolean`
  - `"feedback"`: `string`（可选）

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success: returns the updated session object.

</template>
<template #zh>

成功：返回更新后的会话对象。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Session not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Session not found!"
}
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

**DELETE** `/api/v1/chats/{chat_id}/sessions`

</template>
<template #zh>

**DELETE** `/api/v1/chats/{chat_id}/sessions`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes sessions of a chat assistant by ID.

</template>
<template #zh>

按 ID 删除对话助手的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/chats/{chat_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `chat_id`: (*Path parameter*)
  The ID of the associated chat assistant.
- `"ids"`: (*Body Parameter*), `list[string]`
  The IDs of the sessions to delete.
  - If omitted, or set to `null` or an empty array, no sessions are deleted.
  - If an array of IDs is provided, only the sessions matching those IDs are deleted.
- `"delete_all"`: (*Body Parameter*), `boolean`
  Whether to delete all sessions of the specified chat assistant when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  关联对话助手的 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  待删除会话的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何会话。
  - 若提供 ID 数组，则仅删除匹配这些 ID 的会话。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略、设为 `null` 或为空数组时，是否删除指定对话助手的全部会话。默认为 `false`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0
}
```

</template>
<template #zh>

```json
{
    "code": 0
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "The chat doesn't own the session"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The chat doesn't own the session"
}
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

**POST** `/api/v1/chat/completions`

</template>
<template #zh>

**POST** `/api/v1/chat/completions`

</template>
</BiRow>

<BiRow>
<template #en>

Starts a chat completion request. The same endpoint supports three modes:

</template>
<template #zh>

发起一个对话补全请求。同一端点支持三种模式：

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/chats/{chat_id}/completions` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/chats/{chat_id}/completions` 已弃用。请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

- No `chat_id`: talk directly with the tenant's default chat model.
- With `chat_id` but no `session_id`: use that chat's configuration and automatically create a new session.
- With both `chat_id` and `session_id`: continue an existing chat session.

</template>
<template #zh>

- 不带 `chat_id`：直接与租户的默认对话模型对话。
- 带 `chat_id` 但不带 `session_id`：使用该对话的配置并自动创建新会话。
- 同时带 `chat_id` 和 `session_id`：继续已有的对话会话。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success without `chat_id` or `session_id`:

</template>
<template #zh>

不带 `chat_id` 或 `session_id` 的成功响应：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Success with `chat_id` and `session_id`:

</template>
<template #zh>

带 `chat_id` 和 `session_id` 的成功响应：

</template>
</BiRow>

<BiRow>
<template #en>

Streaming response example with `chat_id` and `session_id`:

</template>
<template #zh>

带 `chat_id` 和 `session_id` 的流式响应示例：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

For `legacy: true`, the same request keeps the thinking content inside `answer` as literal `<think>` tags, and appends the final answer after `</think>`:

</template>
<template #zh>

对于 `legacy: true`，同一请求会把思考内容以字面 `<think>` 标签的形式保留在 `answer` 中，并在 `</think>` 之后追加最终答案：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Please input your question."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Please input your question."
}
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

### 与 Agent 创建会话

</template>
</BiRow>

<BiRow>
<template #en>

:::danger DEPRECATED
This method is deprecated and no longer recommended. Use `Converse with agent` (`POST /api/v1/agents/chat/completions`) instead; it automatically creates a session ID for the associated agent when `session_id` is not specified.
:::

</template>
<template #zh>

:::danger 已弃用
此方法已弃用，不再推荐使用。请改用「与 Agent 对话」（`POST /api/v1/agents/chat/completions`）；未指定 `session_id` 时，它会自动为关联的 Agent 创建会话 ID。
:::

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/agents/{agent_id}/sessions`

</template>
<template #zh>

**POST** `/api/v1/agents/{agent_id}/sessions`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a session with an agent.

</template>
<template #zh>

创建与 Agent 的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/agents/{agent_id}/sessions?user_id={user_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"user_id"`: `string` (optional)
  - Other parameters:
    The variables specified in the **Begin** component.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/agents/{agent_id}/sessions?user_id={user_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"user_id"`: `string`（可选）
  - 其他参数：
    **Begin** 组件中指定的变量。

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

If the **Begin** component in your agent does not take required parameters:

</template>
<template #zh>

如果你的 Agent 中 **Begin** 组件不接收必填参数：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `agent_id`: (*Path parameter*)
  The ID of the associated agent.
- `user_id`: (*Body or query parameter*), `string`, *Optional*
  A user-defined ID associated with the created session. It can be provided either in the JSON request body or as a URL query parameter. If both are provided, the value in the request body takes precedence. If omitted, the tenant ID associated with the current API key is used.

</template>
<template #zh>

- `agent_id`：（*路径参数*）
  关联 Agent 的 ID。
- `user_id`：（*请求体或查询参数*），`string`，*可选*
  与所创建会话关联的用户自定义 ID。可以在 JSON 请求体中提供，也可以作为 URL 查询参数提供。若两者都提供，则以请求体中的值为准。若省略，则使用与当前 API key 关联的租户 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Agent not found."
}
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

**POST** `/api/v1/agents/chat/completions`

</template>
<template #zh>

**POST** `/api/v1/agents/chat/completions`

</template>
</BiRow>

<BiRow>
<template #en>

Asks a specified agent a question to start an AI-powered conversation.

</template>
<template #zh>

向指定 Agent 提问，开启一次 AI 驱动的对话。

</template>
</BiRow>

<BiRow>
<template #en>

Uses a single completion endpoint for all agent conversations.

</template>
<template #zh>

所有 Agent 对话共用一个补全端点。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/agents/{agent_id}/completions` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/agents/{agent_id}/completions` 已弃用。请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/agents/chat/completions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/agents/chat/completions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

#### Standard mode

</template>
<template #zh>

#### 标准模式

</template>
</BiRow>

<BiRow>
<template #en>

Use this mode for the native agent API.

</template>
<template #zh>

此模式用于原生 Agent API。

</template>
</BiRow>

<BiRow>
<template #en>

##### Body

</template>
<template #zh>

##### 请求体

</template>
</BiRow>

<BiRow>
<template #en>

- `"agent_id"`: `string`
- `"query"`: `string`
- `"stream"`: `boolean`
- `"session_id"`: `string` (optional)
- `"inputs"`: `object` (optional)
- `"files"`: `list[object]` (optional)
- `"user_id"`: `string` (optional)
- `"return_trace"`: `boolean` (optional, default `false`)
- `"chat_template_kwargs"`: `object` (optional)

</template>
<template #zh>

- `"agent_id"`: `string`
- `"query"`: `string`
- `"stream"`: `boolean`
- `"session_id"`: `string`（可选）
- `"inputs"`: `object`（可选）
- `"files"`: `list[object]`（可选）
- `"user_id"`: `string`（可选）
- `"return_trace"`: `boolean`（可选，默认 `false`）
- `"chat_template_kwargs"`: `object`（可选）

</template>
</BiRow>

<BiRow>
<template #en>

#### Streaming events to handle

</template>
<template #zh>

#### 需要处理的流式事件

</template>
</BiRow>

<BiRow>
<template #en>

When `stream=true`, the server sends Server-Sent Events (SSE). A client should handle these events:

</template>
<template #zh>

当 `stream=true` 时，服务器会发送服务器推送事件（SSE）。客户端应处理以下事件：

</template>
</BiRow>

<BiRow>
<template #en>

- `message`: Streaming content from the **Message** components.
- `message_end`: End of a **Message** component, which may include `reference` or `attachment`.
- `node_finished`: A component finishes. `data.inputs`, `data.outputs`, `data.error`, and `data.elapsed_time` describe the node result. If `return_trace=true`, the same event also contains `data.trace`.

</template>
<template #zh>

- `message`：来自 **Message** 组件的流式内容。
- `message_end`：某个 **Message** 组件结束，可能附带 `reference` 或 `attachment`。
- `node_finished`：某个组件执行完毕。`data.inputs`、`data.outputs`、`data.error` 和 `data.elapsed_time` 描述该节点的结果。若 `return_trace=true`，同一事件还会包含 `data.trace`。

</template>
</BiRow>

<BiRow>
<template #en>

The stream terminates with `[DONE]`.

</template>
<template #zh>

流以 `[DONE]` 结束。

</template>
</BiRow>

<BiRow>
<template #en>

:::info IMPORTANT
You can include custom parameters in the request body, but they must be defined in the [Begin](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component) component first.
:::

</template>
<template #zh>

:::info 重要
你可以在请求体中包含自定义参数，但必须先在 [Begin](https://ragflow.io/docs/guides/agent/agent_workflow/basic_component) 组件中定义它们。
:::

</template>
</BiRow>

<BiRow>
<template #en>

##### Request examples

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

If the **Begin** component does not take parameters:

</template>
<template #zh>

若 **Begin** 组件不接收参数：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

- If the **Begin** component takes parameters, include their values in the body of `"inputs"` as follows:

</template>
<template #zh>

- 若 **Begin** 组件接收参数，请按如下方式将参数值包含在 `"inputs"` 中：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

To continue an existing session:

</template>
<template #zh>

继续已有会话：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
For now, this method does *not* support a file type input/variable. As a workaround, use the following to upload a file to an agent:
`http://{address}/v1/canvas/upload/{agent_id}`
*You will get a corresponding file ID from its response body.*
:::

</template>
<template #zh>

:::tip 注意
目前此方法*不*支持文件类型的输入/变量。作为变通方案，可使用以下地址向 Agent 上传文件：
`http://{address}/v1/canvas/upload/{agent_id}`
*你将从其响应体中获得对应的文件 ID。*
:::

</template>
</BiRow>

<BiRow>
<template #en>

##### Response

</template>
<template #zh>

##### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Standard mode stream:

</template>
<template #zh>

标准模式流式响应：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

When `extra_body.reference_metadata.include` is `true`, each reference chunk may include a `document_metadata` object.

</template>
<template #zh>

当 `extra_body.reference_metadata.include` 为 `true` 时，每个引用分块都可能包含 `document_metadata` 对象。

</template>
</BiRow>

<BiRow>
<template #en>

Standard mode non-stream:

</template>
<template #zh>

标准模式非流式响应：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

If one or more components produce structured output, set `return_trace=true` and inspect that component output from `trace`.

</template>
<template #zh>

如果一个或多个组件产生结构化输出，请设置 `return_trace=true` 并从 `trace` 中检查该组件的输出。

</template>
</BiRow>

<BiRow>
<template #en>

#### OpenAI-compatible mode

</template>
<template #zh>

#### OpenAI 兼容模式

</template>
</BiRow>

<BiRow>
<template #en>

Use the same endpoint and add `"openai-compatible": true`.

</template>
<template #zh>

使用同一端点并添加 `"openai-compatible": true`。

</template>
</BiRow>

<BiRow>
<template #en>

##### Body

</template>
<template #zh>

##### 请求体

</template>
</BiRow>

<BiRow>
<template #en>

- `"agent_id"`: `string`
- `"messages"`: `list[object]`
- `"openai-compatible"`: `boolean`, must be `true`
- `"stream"`: `boolean`
- `"session_id"`: `string` (optional)
- `"model"`: `string` (optional, accepted for compatibility)
- `"chat_template_kwargs"`: `object` (optional)

</template>
<template #zh>

- `"agent_id"`: `string`
- `"messages"`: `list[object]`
- `"openai-compatible"`: `boolean`，必须为 `true`
- `"stream"`: `boolean`
- `"session_id"`: `string`（可选）
- `"model"`: `string`（可选，为兼容性而接受）
- `"chat_template_kwargs"`: `object`（可选）

</template>
</BiRow>

<BiRow>
<template #en>

##### Request examples

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

Streaming request:

</template>
<template #zh>

流式请求：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Non-stream request with existing session:

</template>
<template #zh>

带已有会话的非流式请求：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Response

</template>
<template #zh>

##### 响应

</template>
</BiRow>

<BiRow>
<template #en>

OpenAI-compatible stream:

</template>
<template #zh>

OpenAI 兼容流式响应：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

OpenAI-compatible non-stream:

</template>
<template #zh>

OpenAI 兼容非流式响应：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Agent not found."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Agent not found."
}
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

**GET** `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`

</template>
<template #zh>

**GET** `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists sessions associated with a specified agent.

</template>
<template #zh>

列出与指定 Agent 关联的会话。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/{agent_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&id={session_id}&user_id={user_id}&keywords={keywords}&from_date={from_date}&to_date={to_date}&dsl={dsl}&exp_user_id={exp_user_id}' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "You don't own the agent ccd2f856b12311ef94ca0242ac1200052."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "You don't own the agent ccd2f856b12311ef94ca0242ac1200052."
}
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

### Delete agent's sessions

</template>
<template #zh>

### 删除 Agent 的会话

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/agents/{agent_id}/sessions`

</template>
<template #zh>

**DELETE** `/api/v1/agents/{agent_id}/sessions`

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

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/agents/{agent_id}/sessions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/agents/{agent_id}/sessions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `agent_id`: (*Path parameter*)
  The ID of the associated agent.
- `"ids"`: (*Body Parameter*), `list[string]`
  The IDs of the sessions to delete.
  - If omitted, or set to `null` or an empty array, no sessions are deleted.
  - If an array of IDs is provided, only the sessions matching those IDs are deleted.
- `"delete_all"`: (*Body Parameter*), `boolean`
  Whether to delete all sessions of the specified agent when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

</template>
<template #zh>

- `agent_id`：（*路径参数*）
  关联 Agent 的 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  待删除会话的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何会话。
  - 若提供 ID 数组，则仅删除匹配这些 ID 的会话。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略、设为 `null` 或为空数组时，是否删除指定 Agent 的全部会话。默认为 `false`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0
}
```

</template>
<template #zh>

```json
{
    "code": 0
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "The agent doesn't own the session cbd31e52f73911ef93b232903b842af6"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The agent doesn't own the session cbd31e52f73911ef93b232903b842af6"
}
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

### Text-to-speech

</template>
<template #zh>

### 文本转语音

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chat/audio/speech`

</template>
<template #zh>

**POST** `/api/v1/chat/audio/speech`

</template>
</BiRow>

<BiRow>
<template #en>

Converts text to speech audio using the tenant's default TTS model, returning a streaming audio response.

</template>
<template #zh>

使用租户的默认 TTS 模型将文本转换为语音音频，返回流式音频响应。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/chat/audio/speech`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"text"`: `string` *(Required)* The text to synthesize.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/chat/audio/speech`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"text"`: `string` *（必填）* 要合成的文本。

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/speech \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --output audio.mp3 \
     --data '{"text": "Hello, how can I help you today?"}'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/speech \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --output audio.mp3 \
     --data '{"text": "Hello, how can I help you today?"}'
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success: binary `audio/mpeg` stream with headers `Cache-Control: no-cache`, `Connection: keep-alive`, `X-Accel-Buffering: no`.

</template>
<template #zh>

成功：二进制 `audio/mpeg` 流，响应头为 `Cache-Control: no-cache`、`Connection: keep-alive`、`X-Accel-Buffering: no`。

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "No default TTS model is set"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "No default TTS model is set"
}
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

### Speech-to-text

</template>
<template #zh>

### 语音转文字

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chat/audio/transcription`

</template>
<template #zh>

**POST** `/api/v1/chat/audio/transcription`

</template>
</BiRow>

<BiRow>
<template #en>

Transcribes an audio file using the tenant's default ASR (automatic speech recognition) model.

</template>
<template #zh>

使用租户的默认 ASR（自动语音识别）模型转写音频文件。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/chat/audio/transcription`
- Headers:
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body (multipart/form-data):
  - `"file"`: audio file (`.wav`, `.mp3`, `.m4a`, `.aac`, `.flac`, `.ogg`, `.webm`, `.opus`, `.wma`)
  - `"stream"`: `string` `"true"` for SSE streaming, `"false"` (default) for a single JSON response.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/chat/audio/transcription`
- 请求头：
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体（multipart/form-data）：
  - `"file"`：音频文件（`.wav`、`.mp3`、`.m4a`、`.aac`、`.flac`、`.ogg`、`.webm`、`.opus`、`.wma`）
  - `"stream"`：`string`，`"true"` 表示 SSE 流式返回，`"false"`（默认）表示返回单个 JSON 响应。

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/transcription \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --form file=@recording.wav \
     --form stream=false
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/audio/transcription \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --form file=@recording.wav \
     --form stream=false
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success (non-streaming):

</template>
<template #zh>

成功（非流式）：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0,
    "data": {
        "text": "Hello, how can I help you today?"
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "text": "Hello, how can I help you today?"
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Success (streaming): SSE events with `data: {"event": "partial", "text": "..."}`.

</template>
<template #zh>

成功（流式）：SSE 事件，形如 `data: {"event": "partial", "text": "..."}`。

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Unsupported audio format: .mp4. Allowed: .aac, .flac, .m4a, .mp3, .ogg, .opus, .wav, .webm, .wma"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Unsupported audio format: .mp4. Allowed: .aac, .flac, .m4a, .mp3, .ogg, .opus, .wav, .webm, .wma"
}
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

### Generate mind map

</template>
<template #zh>

### 生成思维导图

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chat/mindmap`

</template>
<template #zh>

**POST** `/api/v1/chat/mindmap`

</template>
</BiRow>

<BiRow>
<template #en>

Generates a mind map from a question and a set of knowledge base IDs.

</template>
<template #zh>

根据一个问题和一组知识库 ID 生成思维导图。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/chat/mindmap`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The central question or topic.
  - `"kb_ids"`: `list[string]` *(Required)* Knowledge base IDs to search.
  - `"search_id"`: `string` *(Optional)* ID of a saved search configuration to merge additional `kb_ids` and settings.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/chat/mindmap`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 中心问题或主题。
  - `"kb_ids"`: `list[string]` *（必填）* 要搜索的知识库 ID。
  - `"search_id"`: `string` *（可选）* 已保存搜索配置的 ID，用于合并额外的 `kb_ids` 和设置。

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0,
    "data": {
        "name": "Retrieval-Augmented Generation",
        "children": [...]
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "name": "Retrieval-Augmented Generation",
        "children": [...]
    }
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 500,
    "message": "..."
}
```

</template>
<template #zh>

```json
{
    "code": 500,
    "message": "..."
}
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

### Generate related questions

</template>
<template #zh>

### 生成相关问题

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chat/recommendation`

</template>
<template #zh>

**POST** `/api/v1/chat/recommendation`

</template>
</BiRow>

<BiRow>
<template #en>

Generates five to ten alternative question strings from the user's original query to retrieve more relevant search results.

</template>
<template #zh>

从用户的原始查询生成五到十个备选问题字符串，以检索出更相关的搜索结果。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/sessions/related_questions` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/sessions/related_questions` 已弃用。请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

This operation requires a `Bearer Login Token`, which typically expires with in 24 hours. You can find it in the Request Headers in your browser easily as shown below:

</template>
<template #zh>

此操作需要 `Bearer Login Token`，该 token 通常在 24 小时内过期。你可以按下面所示，在浏览器的请求标头中轻松找到它：

</template>
</BiRow>

<BiRow>
<template #en>

![Image](/ragflow-images/login_token.jpg)

</template>
<template #zh>

![Image](/ragflow-images/login_token.jpg)

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
The chat model autonomously determines the number of questions to generate based on the instruction, typically between five and ten.
:::

</template>
<template #zh>

:::tip 注意
对话模型会依据指令自主决定生成的问题数量，通常在五到十个之间。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/chat/recommendation`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The original user question.
  - `"search_id"`: `string` *(Optional)* ID of a saved search configuration to use custom LLM settings.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/chat/recommendation`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 用户的原始问题。
  - `"search_id"`: `string` *（可选）* 已保存搜索配置的 ID，用于使用自定义 LLM 设置。

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/recommendation \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
          "question": "What are the key advantages of Neovim over Vim?"
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/chat/recommendation \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
          "question": "What are the key advantages of Neovim over Vim?"
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request Parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `"question"`: (*Body Parameter*), `string`
  The original user question.
- `"search_id"`: (*Body Parameter*), `string`
  ID of a saved search configuration to use custom LLM settings. If provided, the LLM model and generation settings from the search configuration will be used.

</template>
<template #zh>

- `"question"`：（*请求体参数*），`string`
  用户的原始问题。
- `"search_id"`：（*请求体参数*），`string`
  用于使用自定义 LLM 设置的已保存搜索配置 ID。若提供，将使用该搜索配置中的 LLM 模型和生成设置。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 401,
    "data": null,
    "message": "<Unauthorized '401: Unauthorized'>"
}
```

</template>
<template #zh>

```json
{
    "code": 401,
    "data": null,
    "message": "<Unauthorized '401: Unauthorized'>"
}
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
