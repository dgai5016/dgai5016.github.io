# HTTP API 参考（第 8 部分）

## 记忆管理

### 创建记忆

**POST** `/api/v1/memories`

创建新记忆。

#### 请求

- 方法：POST
- URL：`/api/v1/memories`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"memory_type"`: `list[string]`
  - `"embd_id"`: `string`.
  - `"llm_id"`: `string`

##### 请求示例

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

##### 请求参数

- `name`：（*请求体参数*），`string`，*必填*

  待创建记忆的唯一名称，必须满足以下要求：

  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符
- `memory_type`：（*请求体参数*），`list[enum<string>]`，*必填*

  指定要提取的记忆类型。可用选项：

  - `raw`：用户与 Agent 之间的原始对话内容。*默认必填*。
  - `semantic`：关于用户和世界的一般性知识与事实。
  - `episodic`：带时间戳的特定事件与经历记录。
  - `procedural`：习得的技能、习惯与自动化流程。
- `embd_id`：（*请求体参数*），`string`，*必填*

  所用嵌入模型的名称，例如 `"BAAI/bge-large-zh-v1.5@BAAI"`

  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `llm_id`：（*请求体参数*），`string`，*必填*

  所用对话模型的名称，例如 `"glm-4-flash@ZHIPU-AI"`

  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式

#### 响应

成功：

```json
{
	"code": 0,
	"data": {
	...your new memory here
	},
	"message": true
}
```

失败：

```json
{
    "code": 101,
    "message": "Memory name cannot be empty or whitespace."
}
```

### 更新记忆

**PUT** `/api/v1/memories/{memory_id}`

更新指定记忆的配置。

#### 请求

- 方法：PUT
- URL：`/api/v1/memories/{memory_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
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

##### 请求示例

```bash
curl --location --request PUT 'http://{address}/api/v1/memories/d6775d4eeada11f08ca284ba59bc53c7' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data '{
    "name": "name_update",
}'
```

##### 请求参数

- `memory_id`：（*路径参数*）

  待更新记忆的 ID。

- `name`：（*请求体参数*），`string`，*可选*

  修改后的记忆名称。

  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符，*可选*
- `avatar`：（*请求体参数*），`string`，*可选*

  更新后的头像 Base64 编码。

  - 最多 65535 个字符
- `permissions`：（*请求体参数*），`enum<string>`，*可选*

  更新后的记忆权限。可用选项：

  - `"me"`：（默认）仅你自己可以管理该记忆。
  - `"team"`：所有团队成员都可以管理该记忆。
- `llm_id`：（*请求体参数*），`string`，*可选*

  所用对话模型的名称，例如 `"glm-4-flash@ZHIPU-AI"`

  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `description`：（*请求体参数*），`string`，*可选*

  记忆的描述。默认为 `None`。

- `memory_size`：（*请求体参数*），`int`，*可选*

  默认为 `5*1024*1024` 字节。按每条消息的内容 + 其嵌入向量计算（≈ 内容 + 维度数 × 8 字节）。例如：一条 1 KB 的消息配 1024 维嵌入约占 9 KB。5 MB 的默认上限约可容纳 500 条这样的消息。

  - 最大 10 * 1024 * 1024 字节
- `forgetting_policy`：（*请求体参数*），`enum<string>`，*可选*

  达到大小上限时，按所选策略淘汰既有数据，为新消息腾出空间。可用选项：

  - `"FIFO"`：（默认）优先移除 `forget_at` 时间最早的消息。当设置了 `forget_at` 的消息池不够用时，会回退为按 `valid_at` 升序（最旧优先）选取消息。
- `temperature`：（*请求体参数*），`float`，*可选*

  调整输出的随机性。值越低越确定；越高越有创造性。

  - 取值范围 [0, 1]
- `system_prompt`：（*请求体参数*），`string`，*可选*

  定义 AI 助手的系统级指令与角色。它由 `memory/utils/prompt_util.py` 中的 `PromptAssembler` 依据所选 `memory_type` 自动组装。该提示词为整段对话设定基础行为与上下文。

  - 保持 `OUTPUT REQUIREMENTS` 和 `OUTPUT FORMAT` 部分不变。
- `user_prompt`：（*请求体参数*），`string`，*可选*

  表示用户的自定义设置，即 AI 需要直接回应的具体问题或指令。默认为 `None`。

#### 响应

成功：

```json
{
	"code": 0,
	"data": {
	...your updated memory here
	},
	"message": true
}
```

失败：

```json
{
    "code": 101,
    "message": "Memory name cannot be empty or whitespace."
}
```

### 列出记忆

**GET** `/api/v1/memories?tenant_id={tenant_ids}&memory_type={memory_types}&storage_type={storage_type}&keywords={keywords}&page={page}&page_size={page_size}`

列出记忆。

#### 请求

- 方法：GET
- URL：`/api/v1/memories?tenant_id={tenant_ids}&memory_type={memory_types}&storage_type={storage_type}&keywords={keywords}&page={page}&page_size={page_size}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/memories?keywords=&page_size=50&page=1&memory_type=semantic%2Cepisodic' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `tenant_id`：（*过滤参数*），`string` 或 `list[string]`，*可选*

  所有者的 ID，支持搜索多个 ID。

- `memory_type`：（*过滤参数*），`enum<string>` 或 `list[enum<string>]`，*可选*

  记忆的类型（创建时设置）。若某条记忆的类型**包含于**所给取值之中，即视为匹配。可用选项：

  - `raw`
  - `semantic`
  - `episodic`
  - `procedural`
- `storage_type`：（*过滤参数*），`enum<string>`，*可选*

  消息的存储格式。可用选项：

  - `table`：（默认）
- `keywords`：（*过滤参数*），`string`，*可选*

  要检索的记忆名称，支持模糊搜索。

- `page`：（*过滤参数*），`int`，*可选*

  指定显示记忆的页码。默认为 `1`。

- `page_size`：（*过滤参数*），`int`，*可选*

  每页的记忆数量。默认为 `50`。

#### 响应

成功：

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

失败：

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### 获取记忆配置

**GET** `/api/v1/memories/{memory_id}/config`

获取指定记忆的配置。

#### 请求

- 方法：GET
- URL：`/api/v1/memories/{memory_id}/config`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/memories/6c8983badede11f083f184ba59bc53c7/config' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  记忆的 ID。

#### 响应

成功

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

失败

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### 删除记忆

**DELETE** `/api/v1/memories/{memory_id}`

删除指定记忆。

#### 请求

- 方法：DELETE
- URL：`/api/v1/memories/{memory_id}`
- 请求头：
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location --request DELETE 'http://{address}/api/v1/memories/d6775d4eeada11f08ca284ba59bc53c7' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  待删除记忆的 ID。

#### 响应

成功

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

失败

```json
{
    "code": 404,
    "data": null,
    "message": true
}
```

### 列出记忆的消息

**GET** `/api/v1/memories/{memory_id}?agent_id={agent_id}&keywords={keywords}&page={page}&page_size={page_size}`

列出指定记忆的消息。

#### 请求

- 方法：GET
- URL：`/api/v1/memories/{memory_id}?agent_id={agent_id}&keywords={keywords}&page={page}&page_size={page_size}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/memories/6c8983badede11f083f184ba59bc53c?page=1' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  要展示消息的记忆 ID。

- `agent_id`：（*过滤参数*），`string` 或 `list[string]`，*可选*

  按消息来源 Agent 的 ID 过滤消息。支持多个值。

- `keywords`：（*过滤参数*），`string`，*可选*

  按会话 ID 过滤消息。尽管参数名如此，该值实际作用于 `session_id` 字段。

- `page`：（*过滤参数*），`int`，*可选*

  指定显示消息的页码。默认为 `1`。

- `page_size`：（*过滤参数*），`int`，*可选*

  每页的消息数量。默认为 `50`。

#### 响应

成功

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

失败

```
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### 添加消息

**POST** `/api/v1/messages`

向指定记忆添加消息。

#### 请求

- 方法：POST
- URL：`/api/v1/messages`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"memory_id"`: `list[string]`
  - `"agent_id"`: `string`
  - `"session_id"`: `string`
  - `"user_id"`: `string`
  - `"user_input"`: `string`
  - `"agent_response"`: `string`

##### 请求示例

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

##### 请求参数

- `memory_id`：（*请求体参数*），`list[string]`，*必填*

  要保存消息的各条记忆的 ID。

- `agent_id`：（*请求体参数*），`string`，*必填*

  消息来源 Agent 的 ID。

- `session_id`：（*请求体参数*），`string`，*必填*

  消息所属会话的 ID。

- `user_id`：（*请求体参数*），`string`，*可选*

  与 Agent 对话的用户。仅当请求以 API key 认证时才生效；任何其他认证方式——无论是 JWT bearer token 还是浏览器会话——都会忽略该字段，并将消息归到认证用户名下。首尾空白字符会被去除；值缺失、为空白或不是字符串时，回退为 API key 的所有者。

- `user_input`：（*请求体参数*），`string`，*必填*

  用户提供的文本输入。

- `agent_response`：（*请求体参数*），`string`，*必填*

  AI Agent 生成的文本回复。

#### 响应

成功

```json
{
    "code": 0,
    "data": null,
    "message": "All add to task."
}
```

失败

```json
{
    "code": 500,
    "data": null,
    "message": "Some messages failed to add. Detail: {fail information}"
}
```

### 遗忘消息

**DELETE** `/api/v1/messages/{memory_id}:{message_id}`

遗忘指定消息。消息被遗忘后，Agent 将不再检索到它，且它也会被遗忘策略优先清理。

#### 请求

- 方法：DELETE
- URL：`/api/v1/messages/{memory_id}:{message_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location --request DELETE 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:272' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  指定消息所属记忆的 ID。

- `message_id`：（*路径参数*），`string`，*必填*

  要遗忘的消息的 ID。

#### 响应

成功

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

失败

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### 更新消息状态

**PUT** `/api/v1/messages/{memory_id}:{message_id}`

更新消息状态，即启用或禁用消息。消息一旦被禁用，Agent 将不再检索到它。

#### 请求

- 方法：PUT
- URL：`/api/v1/messages/{memory_id}:{message_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"status"`: `bool`

##### 请求示例

```bash
curl --location --request PUT 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:270' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer <YOUR_API_KEY>' \
--data '{
    "status": false
}'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  指定消息所属记忆的 ID。

- `message_id`：（*路径参数*），`string`，*必填*

  要启用或禁用的消息的 ID。

- `status`：（*请求体参数*），`bool`，*必填*

  消息的状态。`True` = `enabled`，`False` = `disabled`。

#### 响应

成功

```json
{
    "code": 0,
    "data": null,
    "message": true
}
```

失败

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

### 搜索消息

**GET** `/api/v1/messages/search?query={query}&memory_id={memory_id}&similarity_threshold={similarity_threshold}&keywords_similarity_weight={keywords_similarity_weight}&top_n={top_n}`

根据提供的 `query` 及其他配置参数，从记忆中搜索并检索消息。

#### 请求

- 方法：GET
- URL：`/api/v1/messages/search?query={query}&memory_id={memory_id}&similarity_threshold={similarity_threshold}&keywords_similarity_weight={keywords_similarity_weight}&top_n={top_n}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/messages/search?query=%22who%20are%20you%3F%22&memory_id=6c8983badede11f083f184ba59bc53c7&similarity_threshold=0.2&keywords_similarity_weight=0.7&top_n=10' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `query`：（*过滤参数*），`string`，*必填*

  用于查找相关消息的搜索词或自然语言问题。

- `memory_id`：（*过滤参数*），`string` 或 `list[string]`，*必填*

  要搜索的记忆的 ID。支持多个值。

- `agent_id`：（*过滤参数*），`string`，*可选*

  消息来源 Agent 的 ID。默认为 `None`。

- `session_id`：（*过滤参数*），`string`，*可选*

  消息所属会话的 ID。默认为 `None`。

- `user_id`：（*过滤参数*），`string`，*可选*

  与 Agent 对话的用户。默认为 `None`。

- `similarity_threshold`：（*过滤参数*），`float`，*可选*

  消息被视为匹配所需的最低余弦相似度得分。值越高，结果越精确但数量越少。默认为 `0.2`。

  - 取值范围 [0.0, 1.0]
- `keywords_similarity_weight`：（*过滤参数*），`float`，*可选*

  控制关键词匹配与语义（基于嵌入的）匹配在最终相关性得分中的影响力。取值为 0.5 时二者权重相等。默认为 `0.7`。

  - 取值范围 [0.0, 1.0]
- `top_n`：（*过滤参数*），`int`，*可选*

  返回的最相关消息的最大数量。出于效率考虑，用它限制结果集大小。默认为 `5`。

#### 响应

成功

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

失败

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### 获取最近消息

**GET** `/api/v1/messages?memory_id={memory_id}&agent_id={agent_id}&session_id={session_id}&limit={limit}`

从指定记忆中检索最近的消息。通常接受一个 `limit` 参数来控制返回的消息数量。

#### 请求

- 方法：GET
- URL：`/api/v1/messages?memory_id={memory_id}&agent_id={agent_id}&session_id={session_id}&limit={limit}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/messages?memory_id=6c8983badede11f083f184ba59bc53c7&limit=10' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*过滤参数*），`string` 或 `list[string]`，*必填*

  要搜索的记忆的 ID。支持多个值。

- `agent_id`：（*过滤参数*），`string`，*可选*

  消息来源 Agent 的 ID。默认为 `None`。

- `session_id`：（*过滤参数*），`string`，*可选*

  消息所属会话的 ID。默认为 `None`。

- `limit`：（*过滤参数*），`int`，*可选*

  控制返回的消息数量。默认为 `10`。

#### 响应

成功

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

失败

```json
{
    "code": 500,
    "message": "Internal Server Error."
}
```

### 获取消息内容

**GET** `/api/v1/messages/{memory_id}:{message_id}/content`

使用消息的唯一 ID 检索指定消息的完整内容及嵌入向量。

#### 请求

- 方法：GET
- URL：`/api/v1/messages/{memory_id}:{message_id}/content`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --location 'http://{address}/api/v1/messages/6c8983badede11f083f184ba59bc53c7:270/content' \
--header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `memory_id`：（*路径参数*），`string`，*必填*

  指定消息所属记忆的 ID。

- `message_id`：（*路径参数*），`string`，*必填*

  消息的 ID。

#### 响应

成功

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

失败

```json
{
    "code": 404,
    "data": null,
    "message": "Memory '{memory_id}' not found."
}
```

---
