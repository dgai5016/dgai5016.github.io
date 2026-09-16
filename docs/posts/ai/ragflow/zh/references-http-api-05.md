# HTTP API 参考（第 5 部分）

## 对话助手管理

---

### 创建对话助手

**POST** `/api/v1/chats`

创建一个对话助手。

#### 请求

- 方法：POST
- URL：`/api/v1/chats`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"icon"`: `string`
  - `"dataset_ids"`: `list[string]`
  - `"llm_id"`: `string`
  - `"llm_setting"`: `object`
  - `"prompt_config"`: `object`

##### 请求示例

```shell
curl --request POST \
     --url http://{address}/api/v1/chats \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
    "dataset_ids": ["0b2cbc8c877f11ef89070242ac120005"],
    "name":"new_chat_1"
}'
```

##### 请求参数

- `"name"`：（*请求体参数*），`string`，*必填*
  对话助手的名称。
- `"icon"`：（*请求体参数*），`string`
  头像的 Base64 编码。
- `"dataset_ids"`：（*请求体参数*），`list[string]`
  关联数据集的唯一标识符。若省略或设为 `[]`，将创建一个空的对话助手，稍后可再关联数据集。
- `"llm_id"`：（*请求体参数*），`string`
  对话模型的标识符。若未指定，系统默认使用用户预先配置的对话模型。
- `"llm_setting"`：（*请求体参数*），`object`
  定义助手 LLM 参数的配置对象。`llm_setting` 对象可包含以下属性：
  - `"model_type"`: `string`
    模型类型标识符。仅识别 `"chat"` 和 `"image2text"`；其他取值或省略该字段时，均按 `"chat"` 处理。
  - `"temperature"`: `float`
    控制模型预测的随机性。温度越低，回答越保守；温度越高，回答越有创造性和多样性。默认值为 `0.1`。
  - `"top_p"`: `float`
    也称“核采样”（nucleus sampling），该参数设置一个阈值，据此选出一个更小的候选词集合进行采样。它聚焦于最可能的词，截掉概率较低的词。默认值为 `0.3`
  - `"presence_penalty"`: `float`
    通过对会话中已出现过的词施加惩罚，抑制模型重复相同的信息。默认值为 `0.4`。
  - `"frequency penalty"`: `float`
    类似于 presence penalty（存在惩罚），用于降低模型频繁重复相同词语的倾向。默认值为 `0.7`。
- `"prompt_config"`：（*请求体参数*），`object`
  LLM 需要遵循的指令。`prompt_config` 对象可包含以下属性：
  - `"system"`: `string` 提示词内容。
  - `"prologue"`: `string` 面向用户的开场问候。
  - `"parameters"`: `object[]` 此项列出系统提示词中要使用的变量。注意：
    - `"knowledge"` 是保留变量，代表检索到的分块。
    - `"system"` 中的所有变量都应使用花括号包裹。
  - `"empty_response"`: `string` 若在数据集中未检索到与用户问题相关的任何内容，将以此作为回复。若希望 LLM 在检索不到内容时即兴发挥，请将此项留空。
  - `"quote"`: `boolean` 是否显示文本的来源。默认值为 `true`。
  - `"tts"`: `boolean`
  - `"refine_multiturn"`: `boolean`
  - `"use_kg"`: `boolean`
  - `"reasoning"`: `boolean`
  - `"cross_languages"`: `list[string]`
  - `"web_search_provider"`: `string` 要使用的网页搜索服务。支持的取值为 `"tavily"`、`"querit"`、`"serly"` 和 `"youcom"`。若省略，仅在配置了 `"tavily_api_key"` 时选择 Tavily；否则禁用网页搜索。
  - `"tavily_api_key"`: `string`
  - `"querit_api_key"`: `string` Querit 的 API key。使用该字段时需将 `web_search_provider` 设为 `"querit"`。
  - `"serply_api_key"`: `string` [Serply](https://serply.io) 的 API key。使用该字段时需将 `web_search_provider` 设为 `"serply"`。详情见 [Serply 文档](https://serply.io/docs)。
  - `"youcom_api_key"`: `string` You.com 的 API key。使用该字段时需将 `web_search_provider` 设为 `"youcom"`。可选：You.com 提供一个有速率限制的免密钥端点，因此省略该字段时 `"youcom"` 也能使用，配置 key 后可解除这些限制。
  - `"toc_enhance"`: `boolean`
- `"similarity_threshold"`：（*请求体参数*），`float`
- `"vector_similarity_weight"`：（*请求体参数*），`float`
- `"top_n"`：（*请求体参数*），`int`
- `"top_k"`：（*请求体参数*），`int`
- `"rerank_id"`：（*请求体参数*），`string`

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "icon": "",
        "create_date": "Thu, 24 Oct 2024 11:18:29 GMT",
        "create_time": 1729768709023,
        "dataset_ids": [
            "527fa74891e811ef9c650242ac120006"
        ],
        "kb_names": [
            "dataset_1"
        ],
        "description": "A helpful Assistant",
        "id": "b1f2f15691f911ef81180242ac120003",
        "language": "English",
        "llm_id": "qwen-plus@Tongyi-Qianwen",
        "llm_setting": {
            "frequency_penalty": 0.7,
            "presence_penalty": 0.4,
            "temperature": 0.1,
            "top_p": 0.3
        },
        "name": "12234",
        "prompt_config": {
            "empty_response": "Sorry! No relevant content was found in the knowledge base!",
            "prologue": "Hi! I'm your assistant. What can I do for you?",
            "quote": true,
            "system": "You are an intelligent assistant...",
            "parameters": [
                {
                    "key": "knowledge",
                    "optional": false
                }
            ]
        },
        "rerank_id": "",
        "similarity_threshold": 0.2,
        "vector_similarity_weight": 0.3,
        "top_n": 6,
        "prompt_type": "simple",
        "status": "1",
        "tenant_id": "69736c5e723611efb51b0242ac120007",
        "top_k": 1024,
        "update_date": "Thu, 24 Oct 2024 11:18:29 GMT",
        "update_time": 1729768709023
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "duplicated chat name"
}
```

---

### 更新对话助手

**PUT** `/api/v1/chats/{chat_id}`

覆盖指定对话助手的现有配置。

仅在提供完整配置时使用该端点。请求中省略的任何字段都会被重置为服务端默认值。如需部分更新，请改用 `PATCH /api/v1/chats/{chat_id}`。

#### 请求

- 方法：PUT
- URL：`/api/v1/chats/{chat_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"icon"`: `string`
  - `"dataset_ids"`: `list[string]`
  - `"llm_id"`: `string`
  - `"llm_setting"`: `object`
  - `"prompt_config"`: `object`

##### 请求示例

```bash
curl --request PUT \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name":"Test",
          "icon":"",
          "dataset_ids":["0b2cbc8c877f11ef89070242ac120005"],
          "llm_id":"qwen-plus@Tongyi-Qianwen",
          "llm_setting":{"temperature":0.1,"top_p":0.3,"presence_penalty":0.4,"frequency_penalty":0.7},
          "prompt_config":{
               "system":"You are an intelligent assistant...",
               "prologue":"Hi! I'\''m your assistant. What can I do for you?",
               "parameters":[{"key":"knowledge","optional":false}],
               "empty_response":"Sorry! No relevant content was found in the knowledge base!",
               "quote":true
          },
          "similarity_threshold":0.2,
          "vector_similarity_weight":0.3,
          "top_n":6,
          "top_k":1024,
          "rerank_id":""
     }'
```

#### 参数

- `chat_id`：（*路径参数*）
  要更新的对话助手的 ID。
- `"name"`：（*请求体参数*），`string`，*必填*
  修改后的对话助手名称。
- `"icon"`：（*请求体参数*），`string`
  头像的 Base64 编码。
- `"dataset_ids"`：（*请求体参数*），`list[string]`
  关联数据集的 ID。
- `"llm_id"`：（*请求体参数*），`string`
  对话模型名称。若未设置，使用用户的默认对话模型。
- `"llm_setting"`：（*请求体参数*），`object`
  对话助手的 LLM 设置。`llm_setting` 对象包含以下属性：
  - `"model_type"`: `string`
    模型类型标识符。支持的取值为 `"chat"` 和 `"image2text"`。若省略该字段或提供了无法识别的值，默认按 `"chat"` 处理。
  - `"temperature"`: `float`
    控制模型预测的随机性。温度越低，回答越保守；温度越高，回答越有创造性和多样性。默认值为 `0.1`。
  - `"top_p"`: `float`
    也称“核采样”（nucleus sampling），该参数设置一个阈值，据此选出一个更小的候选词集合进行采样。它聚焦于最可能的词，截掉概率较低的词。默认值为 `0.3`
  - `"presence_penalty"`: `float`
    通过对会话中已出现过的词施加惩罚，抑制模型重复相同的信息。默认值为 `0.4`。
  - `"frequency penalty"`: `float`
    类似于 presence penalty（存在惩罚），用于降低模型频繁重复相同词语的倾向。默认值为 `0.7`。
- `"prompt_config"`：（*请求体参数*），`object`
- `"similarity_threshold"`：（*请求体参数*），`float`
- `"vector_similarity_weight"`：（*请求体参数*），`float`
- `"top_n"`：（*请求体参数*），`int`
- `"top_k"`：（*请求体参数*），`int`
- `"rerank_id"`：（*请求体参数*），`string`

对于 `PUT` 请求，请求体中省略的任何字段都会被重置为服务端默认值。

#### 响应

成功：返回更新后的完整对话助手对象。

```json
{
    "code": 0,
    "data": {
        "id": "04d0d8e28d1911efa3630242ac120006",
        "name": "Test",
        "description": "A helpful Assistant",
        "icon": "",
        "dataset_ids": ["527fa74891e811ef9c650242ac120006"],
        "kb_names": ["dataset_1"],
        "llm_id": "qwen-plus@Tongyi-Qianwen",
        "llm_setting": {
            "frequency_penalty": 0.7,
            "presence_penalty": 0.4,
            "temperature": 0.1,
            "top_p": 0.3
        },
        "prompt_config": {
            "empty_response": "Sorry! No relevant content was found in the knowledge base!",
            "prologue": "Hi! I'm your assistant. What can I do for you?",
            "quote": true,
            "system": "You are an intelligent assistant...",
            "parameters": [{"key": "knowledge", "optional": false}]
        },
        "similarity_threshold": 0.2,
        "vector_similarity_weight": 0.3,
        "top_n": 6,
        "top_k": 1024,
        "rerank_id": "",
        "status": "1",
        "tenant_id": "69736c5e723611efb51b0242ac120007",
        "create_time": 1729232406637,
        "update_time": 1729232406638
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "duplicated chat name"
}
```

---

### 获取对话助手

**GET** `/api/v1/chats/{chat_id}`

获取指定的对话助手。

#### 请求

- 方法：GET
- URL：`/api/v1/chats/{chat_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `chat_id`：（*路径参数*）
  要获取的对话助手的 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "icon": "",
        "create_date": "Fri, 18 Oct 2024 06:20:06 GMT",
        "create_time": 1729232406637,
        "description": "A helpful Assistant",
        "id": "04d0d8e28d1911efa3630242ac120006",
        "dataset_ids": ["527fa74891e811ef9c650242ac120006"],
        "kb_names": ["dataset_1"],
        "language": "English",
        "llm_id": "qwen-plus@Tongyi-Qianwen",
        "llm_setting": {
            "temperature": 0.1,
            "top_p": 0.3
        },
        "name": "my_chat",
        "prompt_config": {
            "empty_response": "Sorry! No relevant content was found in the knowledge base!",
            "prologue": "Hi! I'm your assistant. What can I do for you?",
            "quote": true,
            "system": "You are an intelligent assistant...",
            "parameters": [{"key": "knowledge", "optional": false}]
        },
        "rerank_id": "",
        "similarity_threshold": 0.2,
        "vector_similarity_weight": 0.3,
        "top_n": 6,
        "status": "1",
        "tenant_id": "69736c5e723611efb51b0242ac120007",
        "update_date": "Fri, 18 Oct 2024 06:20:06 GMT",
        "update_time": 1729232406638
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### 部分更新对话助手

**PATCH** `/api/v1/chats/{chat_id}`

对指定对话助手执行部分更新。

未指定的字段保持不变，而嵌套对象（如 `llm_setting` 和 `prompt_config`）会与现有配置深度合并。重命名助手或修改某一组特定设置时，推荐使用该端点。

#### 请求

- 方法：PATCH
- URL：`/api/v1/chats/{chat_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：`PUT /api/v1/chats/{chat_id}` 所接受字段的任意子集

##### 请求示例

```bash
curl --request PATCH \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
    "llm_id": "gpt-4o",
    "llm_setting": {"temperature": 0.5}
}'
```

#### 响应

成功：返回更新后的完整对话助手对象（结构与 `PUT /api/v1/chats/{chat_id}` 相同）。

```json
{
    "code": 0,
    "data": {
        "id": "04d0d8e28d1911efa3630242ac120006",
        "name": "Renamed assistant",
        "llm_id": "qwen-plus@Tongyi-Qianwen",
        "..."  : "..."
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### 删除对话助手

**DELETE** `/api/v1/chats/{chat_id}`

按 ID 删除对话助手。

#### 请求

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `chat_id`：（*路径参数*）
  要删除的对话助手的 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": true
}
```

失败：

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### 删除多个对话助手

**DELETE** `/api/v1/chats`

按 ID 删除多个对话助手。

:::caution 已弃用
请求体中的 `chat_id` 已弃用，请使用 `ids` 列表。
:::

#### 请求

- 方法：DELETE
- URL：`/api/v1/chats`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["test_1", "test_2"]
     }'
```

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

##### 请求参数

- `"ids"`：（*请求体参数*），`list[string]`
  要删除的对话助手的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何对话助手。
  - 若提供了 ID 数组，则仅删除与这些 ID 匹配的对话助手。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略或设为 `null` 或空数组时，是否删除当前用户拥有的全部对话助手。默认值为 `false`。

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
    "message": "ids are required"
}
```

---

### 列出对话助手

**GET** `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`

列出对话助手。

#### 请求

- 方法：GET
- URL：`/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `page`：（*过滤参数*），`integer`
  指定显示对话助手的页码。默认值为 `1`。
- `page_size`：（*过滤参数*），`integer`
  每页的对话助手数量。默认值为 `30`。
- `orderby`：（*过滤参数*），`string`
  结果排序所依据的属性。可用选项：
  - `create_time`（默认）
  - `update_time`
- `desc`：（*过滤参数*），`boolean`
  指示检索到的对话助手是否按降序排列。默认值为 `true`。
- `keywords`：（*过滤参数*），`string`
  按对话助手名称进行不区分大小写的模糊匹配。
- `owner_ids`：（*过滤参数*），`string`（可重复）
  按所有者租户 ID 过滤。可多次指定：`?owner_ids=id1&owner_ids=id2`。
- `id`：（*过滤参数*），`string`
  要获取的对话助手的 ID（精确匹配）。
- `name`：（*过滤参数*），`string`
  要获取的对话助手的名称（精确匹配）。

提供了 `id` 或 `name` 时，精确过滤优先于 `keywords`。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "chats": [
            {
                "icon": "",
                "create_date": "Fri, 18 Oct 2024 06:20:06 GMT",
                "create_time": 1729232406637,
                "description": "A helpful Assistant",
                "id": "04d0d8e28d1911efa3630242ac120006",
                "dataset_ids": ["527fa74891e811ef9c650242ac120006"],
                "kb_names": ["dataset_1"],
                "language": "English",
                "llm_id": "qwen-plus@Tongyi-Qianwen",
                "llm_setting": {
                    "frequency_penalty": 0.7,
                    "presence_penalty": 0.4,
                    "temperature": 0.1,
                    "top_p": 0.3
                },
                "name": "13243",
                "prompt_config": {
                    "empty_response": "Sorry! No relevant content was found in the knowledge base!",
                    "prologue": "Hi! I'm your assistant. What can I do for you?",
                    "quote": true,
                    "system": "You are an intelligent assistant...",
                    "parameters": [
                        {
                            "key": "knowledge",
                            "optional": false
                        }
                    ]
                },
                "rerank_id": "",
                "similarity_threshold": 0.2,
                "vector_similarity_weight": 0.3,
                "top_n": 6,
                "prompt_type": "simple",
                "status": "1",
                "tenant_id": "69736c5e723611efb51b0242ac120007",
                "update_date": "Fri, 18 Oct 2024 06:20:06 GMT",
                "update_time": 1729232406638
            }
        ],
        "total": 1
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "The chat doesn't exist"
}
```

---
