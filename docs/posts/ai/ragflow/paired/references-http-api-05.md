<BiRow>
<template #en>

## CHAT ASSISTANT MANAGEMENT

</template>
<template #zh>

## 对话助手管理

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

### Create chat assistant

</template>
<template #zh>

### 创建对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/chats`

</template>
<template #zh>

**POST** `/api/v1/chats`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a chat assistant.

</template>
<template #zh>

创建一个对话助手。

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
- URL: `/api/v1/chats`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"icon"`: `string`
  - `"dataset_ids"`: `list[string]`
  - `"llm_id"`: `string`
  - `"llm_setting"`: `object`
  - `"prompt_config"`: `object`

</template>
<template #zh>

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

</template>
<template #zh>

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

- `"name"`: (*Body parameter*), `string`, *Required*
  The name of the chat assistant.
- `"icon"`: (*Body parameter*), `string`
  Base64 encoding of the avatar.
- `"dataset_ids"`: (*Body parameter*), `list[string]`
  The unique identifiers for the associated datasets. If omitted or set to `[]`, an empty chat assistant is created; datasets can be attached at a later time.
- `"llm_id"`: (*Body parameter*), `string`
  The identifier of the chat model. If not specified, the system defaults to the user's pre-configured chat model.
- `"llm_setting"`: (*Body parameter*), `object`
  A configuration object defining the LLM parameters for the assistant. The `llm_setting` object may contain the following attributes:
  - `"model_type"`: `string`
    A model type specifier. Only `"chat"` and `"image2text"` are recognized; any other inputs, or when omitted, are treated as `"chat"`.
  - `"temperature"`: `float`
    Controls the randomness of the model's predictions. A lower temperature results in more conservative responses, while a higher temperature yields more creative and diverse responses. Defaults to `0.1`.
  - `"top_p"`: `float`
    Also known as "nucleus sampling", this parameter sets a threshold to select a smaller set of words to sample from. It focuses on the most likely words, cutting off the less probable ones. Defaults to `0.3`
  - `"presence_penalty"`: `float`
    This discourages the model from repeating the same information by penalizing words that have already appeared in the conversation. Defaults to `0.4`.
  - `"frequency penalty"`: `float`
    Similar to the presence penalty, this reduces the model's tendency to repeat the same words frequently. Defaults to `0.7`.
- `"prompt_config"`: (*Body parameter*), `object`
  Instructions for the LLM to follow. A `prompt_config` object may contain the following attributes:
  - `"system"`: `string` The prompt content.
  - `"prologue"`: `string` The opening greeting for the user.
  - `"parameters"`: `object[]` This argument lists the variables to use in the system prompt. Note that:
    - `"knowledge"` is a reserved variable, which represents the retrieved chunks.
    - All the variables in `"system"` should be curly bracketed.
  - `"empty_response"`: `string` If nothing is retrieved in the dataset for the user's question, this will be used as the response. To allow the LLM to improvise when nothing is found, leave this blank.
  - `"quote"`: `boolean` Whether the source of text should be displayed. Defaults to `true`.
  - `"tts"`: `boolean`
  - `"refine_multiturn"`: `boolean`
  - `"use_kg"`: `boolean`
  - `"reasoning"`: `boolean`
  - `"cross_languages"`: `list[string]`
  - `"web_search_provider"`: `string` The web search service to use. Supported values are `"tavily"`, `"querit"`, `"serply"`, and `"youcom"`. If omitted, Tavily is selected only when `"tavily_api_key"` is configured; otherwise web search is disabled.
  - `"tavily_api_key"`: `string`
  - `"querit_api_key"`: `string` The Querit API key. Set `web_search_provider` to `"querit"` when using this field.
  - `"serply_api_key"`: `string` The [Serply](https://serply.io) API key. Set `web_search_provider` to `"serply"` when using this field. See the [Serply documentation](https://serply.io/docs) for details.
  - `"youcom_api_key"`: `string` The You.com API key. Set `web_search_provider` to `"youcom"` when using this field. Optional: You.com serves a rate-limited keyless endpoint, so `"youcom"` works with this field omitted, and a key lifts those limits.
  - `"toc_enhance"`: `boolean`
- `"similarity_threshold"`: (*Body parameter*), `float`
- `"vector_similarity_weight"`: (*Body parameter*), `float`
- `"top_n"`: (*Body parameter*), `int`
- `"top_k"`: (*Body parameter*), `int`
- `"rerank_id"`: (*Body parameter*), `string`

</template>
<template #zh>

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

</template>
<template #zh>

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
    "message": "duplicated chat name"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "duplicated chat name"
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

### Update chat assistant

</template>
<template #zh>

### 更新对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**PUT** `/api/v1/chats/{chat_id}`

</template>
<template #zh>

**PUT** `/api/v1/chats/{chat_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Overwrites the existing configuration for a specified chat assistant.

</template>
<template #zh>

覆盖指定对话助手的现有配置。

</template>
</BiRow>

<BiRow>
<template #en>

Use this endpoint only when providing a complete configuration. Any fields omitted from the request will be reset to their server-side default values. For partial updates, use `PATCH /api/v1/chats/{chat_id}` instead.

</template>
<template #zh>

仅在提供完整配置时使用该端点。请求中省略的任何字段都会被重置为服务端默认值。如需部分更新，请改用 `PATCH /api/v1/chats/{chat_id}`。

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
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"icon"`: `string`
  - `"dataset_ids"`: `list[string]`
  - `"llm_id"`: `string`
  - `"llm_setting"`: `object`
  - `"prompt_config"`: `object`

</template>
<template #zh>

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

</template>
<template #zh>

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

- `chat_id`: (*Path parameter*)
  The ID of the chat assistant to update.
- `"name"`: (*Body parameter*), `string`, *Required*
  The revised name of the chat assistant.
- `"icon"`: (*Body parameter*), `string`
  Base64 encoding of the avatar.
- `"dataset_ids"`: (*Body parameter*), `list[string]`
  The IDs of the associated datasets.
- `"llm_id"`: (*Body parameter*), `string`
  The chat model name. If not set, the user's default chat model is used.
- `"llm_setting"`: (*Body parameter*), `object`
  The LLM settings for the chat assistant. An `llm_setting` object contains the following attributes:
  - `"model_type"`: `string`
    A model type specifier. Supported values are `"chat"` and `"image2text"`. If the field is omitted or an unrecognized value is provided, it defaults to `"chat"`.
  - `"temperature"`: `float`
    Controls the randomness of the model's predictions. A lower temperature results in more conservative responses, while a higher temperature yields more creative and diverse responses. Defaults to `0.1`.
  - `"top_p"`: `float`
    Also known as "nucleus sampling", this parameter sets a threshold to select a smaller set of words to sample from. It focuses on the most likely words, cutting off the less probable ones. Defaults to `0.3`
  - `"presence_penalty"`: `float`
    This discourages the model from repeating the same information by penalizing words that have already appeared in the conversation. Defaults to `0.4`.
  - `"frequency penalty"`: `float`
    Similar to the presence penalty, this reduces the model's tendency to repeat the same words frequently. Defaults to `0.7`.
- `"prompt_config"`: (*Body parameter*), `object`
- `"similarity_threshold"`: (*Body parameter*), `float`
- `"vector_similarity_weight"`: (*Body parameter*), `float`
- `"top_n"`: (*Body parameter*), `int`
- `"top_k"`: (*Body parameter*), `int`
- `"rerank_id"`: (*Body parameter*), `string`

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

For `PUT` requests, any fields omitted from the request body are reset to their server-side default values.

</template>
<template #zh>

对于 `PUT` 请求，请求体中省略的任何字段都会被重置为服务端默认值。

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

Success: returns the full updated chat assistant object.

</template>
<template #zh>

成功：返回更新后的完整对话助手对象。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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
    "message": "duplicated chat name"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "duplicated chat name"
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

### Get chat assistant

</template>
<template #zh>

### 获取对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/chats/{chat_id}`

</template>
<template #zh>

**GET** `/api/v1/chats/{chat_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves a specified chat assistant.

</template>
<template #zh>

获取指定的对话助手。

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
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/chats/{chat_id}`
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
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
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
  The ID of the chat assistant to retrieve.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  要获取的对话助手的 ID。

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

</template>
<template #zh>

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
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "no authorization"
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

### Partially update chat assistant

</template>
<template #zh>

### 部分更新对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**PATCH** `/api/v1/chats/{chat_id}`

</template>
<template #zh>

**PATCH** `/api/v1/chats/{chat_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Performs a partial update on a specified chat assistant.

</template>
<template #zh>

对指定对话助手执行部分更新。

</template>
</BiRow>

<BiRow>
<template #en>

Unspecified fields are preserved, while nested objects, such as `llm_setting` and `prompt_config`, are deep-merged with the existing configuration. This is the recommended endpoint for renaming an assistant or modifying a specific subset of settings.

</template>
<template #zh>

未指定的字段保持不变，而嵌套对象（如 `llm_setting` 和 `prompt_config`）会与现有配置深度合并。重命名助手或修改某一组特定设置时，推荐使用该端点。

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
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body: any subset of the fields accepted by `PUT /api/v1/chats/{chat_id}`

</template>
<template #zh>

- 方法：PATCH
- URL：`/api/v1/chats/{chat_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：`PUT /api/v1/chats/{chat_id}` 所接受字段的任意子集

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
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
    "llm_id": "gpt-4o",
    "llm_setting": {"temperature": 0.5}
}'
```

</template>
<template #zh>

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

Success: returns the full updated chat assistant object (same structure as `PUT /api/v1/chats/{chat_id}`).

</template>
<template #zh>

成功：返回更新后的完整对话助手对象（结构与 `PUT /api/v1/chats/{chat_id}` 相同）。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "no authorization"
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

### Delete chat assistant

</template>
<template #zh>

### 删除对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/chats/{chat_id}`

</template>
<template #zh>

**DELETE** `/api/v1/chats/{chat_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes a chat assistant by ID.

</template>
<template #zh>

按 ID 删除对话助手。

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
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/chats/{chat_id}`
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
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
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
  The ID of the chat assistant to delete.

</template>
<template #zh>

- `chat_id`：（*路径参数*）
  要删除的对话助手的 ID。

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
    "data": true
}
```

</template>
<template #zh>

```json
{
    "code": 0,
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
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "no authorization"
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

### Delete chat assistants

</template>
<template #zh>

### 删除多个对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/chats`

</template>
<template #zh>

**DELETE** `/api/v1/chats`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes chat assistants by ID.

</template>
<template #zh>

按 ID 删除多个对话助手。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
The `chat_id` in the request body is deprecated, please use `ids` list.
:::

</template>
<template #zh>

:::warning 已弃用
请求体中的 `chat_id` 已弃用，请使用 `ids` 列表。
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

- Method: DELETE
- URL: `/api/v1/chats`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/chats`
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
     --url http://{address}/api/v1/chats \
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
     --url http://{address}/api/v1/chats \
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
     --url http://{address}/api/v1/chats \
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
     --url http://{address}/api/v1/chats \
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

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `"ids"`: (*Body parameter*), `list[string]`
  The IDs of the chat assistants to delete.
  - If omitted, or set to `null` or an empty array, no chat assistants are deleted.
  - If an array of IDs is provided, only the chat assistants matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all chat assistants owned by the current user when `"ids"` is omitted, or set to`null` or an empty array. Defaults to `false`.

</template>
<template #zh>

- `"ids"`：（*请求体参数*），`list[string]`
  要删除的对话助手的 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何对话助手。
  - 若提供了 ID 数组，则仅删除与这些 ID 匹配的对话助手。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略或设为 `null` 或空数组时，是否删除当前用户拥有的全部对话助手。默认值为 `false`。

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
    "message": "ids are required"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "ids are required"
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

### List chat assistants

</template>
<template #zh>

### 列出对话助手

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`

</template>
<template #zh>

**GET** `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists chat assistants.

</template>
<template #zh>

列出对话助手。

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
- URL: `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`
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
     --url http://{address}/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
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

- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the chat assistants will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of chat assistants on each page. Defaults to `30`.
- `orderby`: (*Filter parameter*), `string`
  The attribute by which the results are sorted. Available options:
  - `create_time` (default)
  - `update_time`
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved chat assistants should be sorted in descending order. Defaults to `true`.
- `keywords`: (*Filter parameter*), `string`
  Case-insensitive fuzzy match against chat assistant names.
- `owner_ids`: (*Filter parameter*), `string` (repeatable)
  Filter by owner tenant IDs. Can be specified multiple times: `?owner_ids=id1&owner_ids=id2`.
- `id`: (*Filter parameter*), `string`
  The ID of the chat assistant to retrieve with exact match.
- `name`: (*Filter parameter*), `string`
  The name of the chat assistant to retrieve with exact match.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

When `id` or `name` is provided, exact filtering takes precedence over `keywords`.

</template>
<template #zh>

提供了 `id` 或 `name` 时，精确过滤优先于 `keywords`。

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

</template>
<template #zh>

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
    "message": "The chat doesn't exist"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The chat doesn't exist"
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
