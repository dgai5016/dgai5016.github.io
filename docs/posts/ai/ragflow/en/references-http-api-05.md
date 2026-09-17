# HTTP API Reference (Part 5)

## CHAT ASSISTANT MANAGEMENT

---

### Create chat assistant

**POST** `/api/v1/chats`

Creates a chat assistant.

#### Request

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

##### Request example

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

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "duplicated chat name"
}
```

---

### Update chat assistant

**PUT** `/api/v1/chats/{chat_id}`

Overwrites the existing configuration for a specified chat assistant.

Use this endpoint only when providing a complete configuration. Any fields omitted from the request will be reset to their server-side default values. For partial updates, use `PATCH /api/v1/chats/{chat_id}` instead.

#### Request

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

##### Request example

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

#### Parameters

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

For `PUT` requests, any fields omitted from the request body are reset to their server-side default values.

#### Response

Success: returns the full updated chat assistant object.

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

Failure:

```json
{
    "code": 102,
    "message": "duplicated chat name"
}
```

---

### Get chat assistant

**GET** `/api/v1/chats/{chat_id}`

Retrieves a specified chat assistant.

#### Request

- Method: GET
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `chat_id`: (*Path parameter*)
  The ID of the chat assistant to retrieve.

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### Partially update chat assistant

**PATCH** `/api/v1/chats/{chat_id}`

Performs a partial update on a specified chat assistant.

Unspecified fields are preserved, while nested objects, such as `llm_setting` and `prompt_config`, are deep-merged with the existing configuration. This is the recommended endpoint for renaming an assistant or modifying a specific subset of settings.

#### Request

- Method: PATCH
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body: any subset of the fields accepted by `PUT /api/v1/chats/{chat_id}`

##### Request example

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

#### Response

Success: returns the full updated chat assistant object (same structure as `PUT /api/v1/chats/{chat_id}`).

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

Failure:

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### Delete chat assistant

**DELETE** `/api/v1/chats/{chat_id}`

Deletes a chat assistant by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/chats/{chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `chat_id`: (*Path parameter*)
  The ID of the chat assistant to delete.

#### Response

Success:

```json
{
    "code": 0,
    "data": true
}
```

Failure:

```json
{
    "code": 102,
    "message": "no authorization"
}
```

---

### Delete chat assistants

**DELETE** `/api/v1/chats`

Deletes chat assistants by ID.

:::warning DEPRECATED
The `chat_id` in the request body is deprecated, please use `ids` list.
:::

#### Request

- Method: DELETE
- URL: `/api/v1/chats`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### Request example

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

##### Request parameters

- `"ids"`: (*Body parameter*), `list[string]`
  The IDs of the chat assistants to delete.
  - If omitted, or set to `null` or an empty array, no chat assistants are deleted.
  - If an array of IDs is provided, only the chat assistants matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all chat assistants owned by the current user when `"ids"` is omitted, or set to`null` or an empty array. Defaults to `false`.

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
    "message": "ids are required"
}
```

---

### List chat assistants

**GET** `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`

Lists chat assistants.

#### Request

- Method: GET
- URL: `/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&owner_ids={owner_id}&name={chat_name}&id={chat_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

When `id` or `name` is provided, exact filtering takes precedence over `keywords`.

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "The chat doesn't exist"
}
```

---
