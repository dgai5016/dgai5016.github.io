# HTTP API Reference (Part 1)

A complete reference for RAGFlow's RESTful API. Before proceeding, please ensure you [have your RAGFlow API key ready for authentication](https://ragflow.io/docs/dev/acquire_ragflow_api_key).

---

## ERROR CODES

RAGFlow responses may contain both an HTTP status code and a business code in the JSON response body. These codes should be checked separately.

### HTTP status codes

| Code | Meaning |
|------|---------|
| 200 | The HTTP request was processed successfully. Check the response body `code` for the business result. |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 500 | Internal server error |

### Response body codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 10 | Not effective |
| 100 | Exception error |
| 101 | Invalid request argument |
| 102 | Invalid or missing data |
| 103 | Operation error |
| 105 | Connection error |
| 106 | Operation still running |
| 108 | Permission error |
| 109 | Authentication error |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 500 | Server error |
---

## Deprecated API Aliases

The following v0.24.0 REST API paths are deprecated. They remain available through the backward compatibility layer, but new integrations should use the replacement endpoints.

| Deprecated endpoint                                                               | Replacement endpoint                                                                |
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
| **POST** `/api/v1/agents_openai/{agent_id}/chat/completions` | **POST** `/api/v1/agents/chat/completions` with `"openai-compatible": true` |

---

## OpenAI-Compatible API

---

### Create chat completion

**POST** `/api/v1/openai/{chat_id}/chat/completions`

Creates a model response for a given chat conversation.

:::warning DEPRECATED
`POST /api/v1/chats_openai/{chat_id}/chat/completions` is deprecated. Use this endpoint instead.
:::

This API follows the same request and response format as OpenAI's API. It allows you to interact with the model in a manner similar to how you would with [OpenAI's API](https://platform.openai.com/docs/api-reference/chat/create).

#### Request

- Method: POST
- URL: `/api/v1/openai/{chat_id}/chat/completions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"model"`: `string`
  - `"messages"`: `object list`
  - `"stream"`: `boolean`
  - `"extra_body"`: `object` (optional)

##### Request example

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

##### Request Parameters

- `chat_id` (*Path parameter*) `string`, *Required*
  Existing chat assistant ID. The request will use that chat assistant's knowledge and settings.

- `model` (*Body parameter*) `string`, *Required*
  The model used to generate the response. When `chat_id` is provided, you may also use the legacy placeholder value `"model"` to keep using the chat assistant's configured model.

- `messages` (*Body parameter*) `list[object]`, *Required*
  A list of historical chat messages used to generate the response. This must contain at least one message with the `user` role.

- `stream` (*Body parameter*) `boolean`
  Whether to receive the response as a stream. Set this to `false` explicitly if you prefer to receive the entire response in one go instead of as a stream.

- `extra_body` (*Body parameter*) `object`
  Extra request parameters:
  - `reference`: `boolean` - include reference in the final chunk (stream) or in the final message (non-stream).
  - `reference_metadata`: `object` - include document metadata in each reference chunk.
    - `include`: `boolean` - enable document metadata in reference chunks.
    - `fields`: `list[string]` - optional allowlist of metadata keys. Omit to include all. Use an empty list to include none.
  - `metadata_condition`: `object` - metadata filter conditions applied to retrieval results.

#### Response

Stream:

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

Non-stream:

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

Failure:

```json
{
  "code": 102,
  "message": "The last content of this conversation is not from user."
}
```

---

### Create agent completion

:::warning DEPRECATED
This endpoint remains available for backward compatibility but may be removed in a future release. New integrations should use `POST /api/v1/agents/chat/completions` with `"openai-compatible": true`.
:::

**POST** `/api/v1/agents_openai/{agent_id}/chat/completions`

Creates a model response for a given chat conversation.

This API follows the same request and response format as OpenAI's API. It allows you to interact with the model in a manner similar to how you would with [OpenAI's API](https://platform.openai.com/docs/api-reference/chat/create).

#### Request

- Method: POST
- URL: `/api/v1/agents_openai/{agent_id}/chat/completions`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"model"`: `string`
  - `"messages"`: `object list`
  - `"stream"`: `boolean`

##### Request example

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

##### Request Parameters

- `model` (*Body parameter*) `string`, *Required*
  The model used to generate the response. The server will parse this automatically, so you can set it to any value for now.

- `messages` (*Body parameter*) `list[object]`, *Required*
  A list of historical chat messages used to generate the response. This must contain at least one message with the `user` role.

- `stream` (*Body parameter*) `boolean`
  Whether to receive the response as a stream. Set this to `false` explicitly if you prefer to receive the entire response in one go instead of as a stream.

- `session_id` (*Body parameter*) `string`
  Agent session id.

#### Response

Stream:

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

Non-stream:

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

Failure:

```json
{
  "code": 102,
  "message": "The last content of this conversation is not from user."
}
```
