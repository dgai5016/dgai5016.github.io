# HTTP API 参考（第 1 部分）

RAGFlow RESTful API 的完整参考。开始之前，请确保你已[准备好用于认证的 RAGFlow API key](https://ragflow.io/docs/dev/acquire_ragflow_api_key)。

---

## 错误码

RAGFlow 的响应可能同时包含 HTTP 状态码和 JSON 响应体中的业务码，二者需要分别检查。

### HTTP 状态码

| 代码 | 含义 |
|------|---------|
| 200 | HTTP 请求已成功处理。请查看响应体中的 `code` 字段获取业务结果。 |
| 400 | 错误的请求 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 409 | 冲突 |
| 500 | 服务器内部错误 |

### 响应体业务码

| 代码 | 含义 |
|------|---------|
| 0 | 成功 |
| 10 | 未生效 |
| 100 | 异常错误 |
| 101 | 无效的请求参数 |
| 102 | 数据无效或缺失 |
| 103 | 操作错误 |
| 105 | 连接错误 |
| 106 | 操作仍在进行中 |
| 108 | 权限错误 |
| 109 | 认证错误 |
| 400 | 错误的请求 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 409 | 冲突 |
| 500 | 服务器错误 |
---

## 已弃用的 API 别名

以下 v0.24.0 REST API 路径已弃用。它们目前仍可通过向后兼容层访问，但新的集成应使用对应的替代端点。

| 已弃用端点                                                               | 替代端点                                                                |
|-----------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| **POST** `/api/v1/chats_openai/{chat_id}/chat/completions`                        | **POST** `/api/v1/openai/{chat_id}/chat/completions`                                |
| **PUT** `/api/v1/chats/{chat_id}/sessions/{session_id}`                           | **PATCH** `/api/v1/chats/{chat_id}/sessions/{session_id}`                           |
| **POST** `/api/v1/chats/{chat_id}/completions`                                    | **POST** `/api/v1/chat/completions`                                                 |
| **POST** `/api/v1/sessions/related_questions`                                     | **POST** `/api/v1/chat/recommendation`                                              |
| **PUT** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` | **PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` |
| **GET** `/v1/system/healthz`                                                      | **GET** `/api/v1/system/healthz`                                                    |
| **POST** `/v1/document/upload_info`                                               | **POST** `/api/v1/documents/upload`                                                 |
| **POST** `/api/v1/file/upload`                                                    | **POST** `/api/v1/files`                                                            |
| **POST** `/api/v1/file/create`                                                    | **POST** `/api/v1/files`                                                            |
| **GET** `/api/v1/file/list`                                                       | **GET** `/api/v1/files`                                                             |
| **GET** `/api/v1/file/root_folder`                                                | **GET** `/api/v1/files`                                                             |
| **GET** `/api/v1/file/parent_folder`                                              | **GET** `/api/v1/files/{file_id}/parent`                                            |
| **GET** `/api/v1/file/all_parent_folder`                                          | **GET** `/api/v1/files/{file_id}/ancestors`                                         |
| **POST** `/api/v1/file/rm`                                                        | **DELETE** `/api/v1/files`                                                          |
| **POST** `/api/v1/file/rename`                                                    | **POST** `/api/v1/files/move`                                                       |
| **GET** `/api/v1/file/get/{file_id}`                                              | **GET** `/api/v1/files/{file_id}`                                                   |
| **POST** `/api/v1/file/mv`                                                        | **POST** `/api/v1/files/move`                                                       |
| **POST** `/api/v1/file/convert`                                                   | **POST** `/api/v1/files/link-to-datasets`                                           |
| **POST** `/api/v1/agents_openai/{agent_id}/chat/completions` | **POST** `/api/v1/agents/chat/completions`，附带 `"openai-compatible": true` |

---

## OpenAI 兼容 API

---

### 创建对话补全

**POST** `/api/v1/openai/{chat_id}/chat/completions`

为指定对话生成模型响应。

:::warning 已弃用
`POST /api/v1/chats_openai/{chat_id}/chat/completions` 已弃用，请改用本端点。
:::

本 API 的请求与响应格式与 OpenAI 的 API 完全一致，让你可以像使用 [OpenAI 的 API](https://platform.openai.com/docs/api-reference/chat/create) 那样与模型交互。

#### 请求

- 方法：POST
- URL：`/api/v1/openai/{chat_id}/chat/completions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"model"`: `string`
  - `"messages"`: `object list`
  - `"stream"`: `boolean`
  - `"extra_body"`: `object`（可选）

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/openai/{chat_id}/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
        "model": "glm-4-flash@ZHIPU-AI",
        "messages": [{"role": "user", "content": "Say this is a test!"}],
        "stream": true,
        "extra_body": {
          "reference": true,
          "reference_metadata": {
            "include": true,
            "fields": ["author", "year", "source"]
          },
          "metadata_condition": {
            "logic": "and",
            "conditions": [
              {
                "name": "author",
                "comparison_operator": "is",
                "value": "bob"
              }
            ]
          }
        }
      }'
```

##### 请求参数

- `chat_id`（*路径参数*）`string`，*必填*
  已有对话助手的 ID。请求将使用该对话助手绑定的知识与设置。

- `model`（*请求体参数*）`string`，*必填*
  用于生成响应的模型。当提供 `chat_id` 时，也可以沿用旧版占位值 `"model"`，继续使用该对话助手配置的模型。

- `messages`（*请求体参数*）`list[object]`，*必填*
  用于生成响应的历史对话消息列表，其中必须至少包含一条 `user` 角色的消息。

- `stream`（*请求体参数*）`boolean`
  是否以流式方式接收响应。如果希望一次性接收完整响应而非流式数据，请显式设置为 `false`。

- `extra_body`（*请求体参数*）`object`
  额外的请求参数：
  - `reference`: `boolean` - 在最后一个分块（流式）或最后一条消息（非流式）中包含引用。
  - `reference_metadata`: `object` - 在每个引用分块中包含文档元数据。
    - `include`: `boolean` - 在引用分块中启用文档元数据。
    - `fields`: `list[string]` - 可选的元数据键允许列表。省略则包含全部，传空列表则均不包含。
  - `metadata_condition`: `object` - 作用于检索结果的元数据过滤条件。

#### 响应

流式：

```json
data:{
    "id": "chatcmpl-3b0397f277f511f0b47f729e3aa55728",
    "choices": [
        {
            "delta": {
                "content": "Hello! It seems like you're just greeting me. If you have a specific",
                "role": "assistant",
                "function_call": null,
                "tool_calls": null,
                "reasoning_content": null
            },
            "finish_reason": null,
            "index": 0,
            "logprobs": null
        }
    ],
    "created": 1755084508,
    "model": "model",
    "object": "chat.completion.chunk",
    "system_fingerprint": "",
    "usage": null
}

data:{"id": "chatcmpl-3b0397f277f511f0b47f729e3aa55728", "choices": [{"delta": {"content": " question or need information, feel free to ask, and I'll do my best", "role": "assistant", "function_call": null, "tool_calls": null, "reasoning_content": null}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1755084508, "model": "model", "object": "chat.completion.chunk", "system_fingerprint": "", "usage": null}

data:{"id": "chatcmpl-3b0397f277f511f0b47f729e3aa55728", "choices": [{"delta": {"content": " to assist you based on the knowledge base provided.", "role": "assistant", "function_call": null, "tool_calls": null, "reasoning_content": null}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1755084508, "model": "model", "object": "chat.completion.chunk", "system_fingerprint": "", "usage": null}

data:{"id": "chatcmpl-3b0397f277f511f0b47f729e3aa55728", "choices": [{"delta": {"content": null, "role": "assistant", "function_call": null, "tool_calls": null, "reasoning_content": null}, "finish_reason": "stop", "index": 0, "logprobs": null}], "created": 1755084508, "model": "model", "object": "chat.completion.chunk", "system_fingerprint": "", "usage": {"prompt_tokens": 5, "completion_tokens": 188, "total_tokens": 193}}

data:[DONE]
```

非流式：

```json
{
    "choices": [
        {
            "finish_reason": "stop",
            "index": 0,
            "logprobs": null,
            "message": {
                "content": "Hello! I'm your smart assistant. What can I do for you?",
                "role": "assistant"
            }
        }
    ],
    "created": 1755084403,
    "id": "chatcmpl-3b0397f277f511f0b47f729e3aa55728",
    "model": "model",
    "object": "chat.completion",
    "usage": {
        "completion_tokens": 55,
        "completion_tokens_details": {
            "accepted_prediction_tokens": 55,
            "reasoning_tokens": 5,
            "rejected_prediction_tokens": 0
        },
        "prompt_tokens": 5,
        "total_tokens": 60
    }
}
```

失败：

```json
{
  "code": 102,
  "message": "The last content of this conversation is not from user."
}
```

---

### 创建 Agent 补全

:::warning 已弃用
该端点目前仍为向后兼容而保留，但可能在未来的版本中移除。新的集成应使用 `POST /api/v1/agents/chat/completions` 并附带 `"openai-compatible": true`。
:::

**POST** `/api/v1/agents_openai/{agent_id}/chat/completions`

为指定对话生成模型响应。

本 API 的请求与响应格式与 OpenAI 的 API 完全一致，让你可以像使用 [OpenAI 的 API](https://platform.openai.com/docs/api-reference/chat/create) 那样与模型交互。

#### 请求

- 方法：POST
- URL：`/api/v1/agents_openai/{agent_id}/chat/completions`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"model"`: `string`
  - `"messages"`: `object list`
  - `"stream"`: `boolean`

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/agents_openai/{agent_id}/chat/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
        "model": "model",
        "messages": [{"role": "user", "content": "Say this is a test!"}],
        "stream": true
      }'
```

##### 请求参数

- `model`（*请求体参数*）`string`，*必填*
  用于生成响应的模型。服务器会自动解析该字段，目前可设为任意值。

- `messages`（*请求体参数*）`list[object]`，*必填*
  用于生成响应的历史对话消息列表，其中必须至少包含一条 `user` 角色的消息。

- `stream`（*请求体参数*）`boolean`
  是否以流式方式接收响应。如果希望一次性接收完整响应而非流式数据，请显式设置为 `false`。

- `session_id`（*请求体参数*）`string`
  Agent 会话 ID。

#### 响应

流式：

```json
...

data: {
    "id": "c39f6f9c83d911f0858253708ecb6573",
    "object": "chat.completion.chunk",
    "model": "d1f79142831f11f09cc51795b9eb07c0",
    "choices": [
        {
            "delta": {
                "content": " terminal"
            },
            "finish_reason": null,
            "index": 0
        }
    ]
}

data: {
    "id": "c39f6f9c83d911f0858253708ecb6573",
    "object": "chat.completion.chunk",
    "model": "d1f79142831f11f09cc51795b9eb07c0",
    "choices": [
        {
            "delta": {
                "content": "."
            },
            "finish_reason": null,
            "index": 0
        }
    ]
}

data: {
    "id": "c39f6f9c83d911f0858253708ecb6573",
    "object": "chat.completion.chunk",
    "model": "d1f79142831f11f09cc51795b9eb07c0",
    "choices": [
        {
            "delta": {
                "content": "",
                "reference": {
                    "chunks": {
                        "20": {
                            "id": "4b8935ac0a22deb1",
                            "content": "```cd /usr/ports/editors/neovim/ && make install```## Android[Termux](https://github.com/termux/termux-app) offers a Neovim package.",
                            "document_id": "4bdd2ff65e1511f0907f09f583941b45",
                            "document_name": "INSTALL22.md",
                            "document_metadata": {
                                "author": "bob",
                                "year": "2023",
                                "source": "internal"
                            },
                            "dataset_id": "456ce60c5e1511f0907f09f583941b45",
                            "image_id": "",
                            "positions": [
                                [
                                    12,
                                    11,
                                    11,
                                    11,
                                    11
                                ]
                            ],
                            "url": null,
                            "similarity": 0.5697155305154673,
                            "vector_similarity": 0.7323851005515574,
                            "term_similarity": 0.5000000005,
                            "doc_type": ""
                        }
                    },
                    "doc_aggs": {
                        "INSTALL22.md": {
                            "doc_name": "INSTALL22.md",
                            "doc_id": "4bdd2ff65e1511f0907f09f583941b45",
                            "count": 3
                        },
                        "INSTALL.md": {
                            "doc_name": "INSTALL.md",
                            "doc_id": "4bd7fdd85e1511f0907f09f583941b45",
                            "count": 2
                        },
                        "INSTALL(1).md": {
                            "doc_name": "INSTALL(1).md",
                            "doc_id": "4bdfb42e5e1511f0907f09f583941b45",
                            "count": 2
                        },
                        "INSTALL3.md": {
                            "doc_name": "INSTALL3.md",
                            "doc_id": "4bdab5825e1511f0907f09f583941b45",
                            "count": 1
                        }
                    }
                }
            },
            "finish_reason": null,
            "index": 0
        }
    ]
}

data: [DONE]
```

非流式：

```json
{
    "choices": [
        {
            "finish_reason": "stop",
            "index": 0,
            "logprobs": null,
            "message": {
                "content": "\nTo install Neovim, the process varies depending on your operating system:\n\n### For Windows:\n1. **Download from GitHub**: \n   - Visit the [Neovim releases page](https://github.com/neovim/neovim/releases)\n   - Download the latest Windows installer (nvim-win64.msi)\n   - Run the installer and follow the prompts\n\n2. **Using winget** (Windows Package Manager):\n...",
                "reference": {
                    "chunks": {
                        "20": {
                            "content": "```cd /usr/ports/editors/neovim/ && make install```## Android[Termux](https://github.com/termux/termux-app) offers a Neovim package.",
                            "dataset_id": "456ce60c5e1511f0907f09f583941b45",
                            "doc_type": "",
                            "document_id": "4bdd2ff65e1511f0907f09f583941b45",
                            "document_name": "INSTALL22.md",
                            "document_metadata": {
                                "author": "bob",
                                "year": "2023",
                                "source": "internal"
                            },
                            "id": "4b8935ac0a22deb1",
                            "image_id": "",
                            "positions": [
                                [
                                    12,
                                    11,
                                    11,
                                    11,
                                    11
                                ]
                            ],
                            "similarity": 0.5697155305154673,
                            "term_similarity": 0.5000000005,
                            "url": null,
                            "vector_similarity": 0.7323851005515574
                        }
                    },
                    "doc_aggs": {
                        "INSTALL(1).md": {
                            "count": 2,
                            "doc_id": "4bdfb42e5e1511f0907f09f583941b45",
                            "doc_name": "INSTALL(1).md"
                        },
                        "INSTALL.md": {
                            "count": 2,
                            "doc_id": "4bd7fdd85e1511f0907f09f583941b45",
                            "doc_name": "INSTALL.md"
                        },
                        "INSTALL22.md": {
                            "count": 3,
                            "doc_id": "4bdd2ff65e1511f0907f09f583941b45",
                            "doc_name": "INSTALL22.md"
                        },
                        "INSTALL3.md": {
                            "count": 1,
                            "doc_id": "4bdab5825e1511f0907f09f583941b45",
                            "doc_name": "INSTALL3.md"
                        }
                    }
                },
                "role": "assistant"
            }
        }
    ],
    "created": null,
    "id": "c39f6f9c83d911f0858253708ecb6573",
    "model": "d1f79142831f11f09cc51795b9eb07c0",
    "object": "chat.completion",
    "param": null,
    "usage": {
        "completion_tokens": 415,
        "completion_tokens_details": {
            "accepted_prediction_tokens": 0,
            "reasoning_tokens": 0,
            "rejected_prediction_tokens": 0
        },
        "prompt_tokens": 6,
        "total_tokens": 421
    }
}
```

失败：

```json
{
  "code": 102,
  "message": "The last content of this conversation is not from user."
}
```
