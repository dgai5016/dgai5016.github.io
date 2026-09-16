<BiRow>
<template #en>

A complete reference for RAGFlow's Python APIs. Before proceeding, please ensure you [have your RAGFlow API key ready for authentication](https://ragflow.io/docs/dev/acquire_ragflow_api_key).

</template>
<template #zh>

RAGFlow Python API 的完整参考。开始之前，请确保你已[准备好用于认证的 RAGFlow API key](https://ragflow.io/docs/dev/acquire_ragflow_api_key)。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
Run the following command to download the Python SDK:

```bash
pip install ragflow-sdk
```

:::

</template>
<template #zh>

:::tip 注意
运行以下命令下载 Python SDK：

```bash
pip install ragflow-sdk
```

:::

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

## ERROR CODES

</template>
<template #zh>

## 错误码

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow responses may contain both an HTTP status code and a business code in the JSON response body. These codes should be checked separately.

</template>
<template #zh>

RAGFlow 的响应可能同时包含 HTTP 状态码和 JSON 响应体中的业务码，二者需要分别检查。

</template>
</BiRow>

<BiRow>
<template #en>

### HTTP status codes

</template>
<template #zh>

### HTTP 状态码

</template>
</BiRow>

<BiRow>
<template #en>

| Code | Meaning |
|------|---------|
| 200 | The HTTP request was processed successfully. Check the response body `code` for the business result. |
| 400 | Bad request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not found |
| 409 | Conflict |
| 500 | Internal server error |

</template>
<template #zh>

| 代码 | 含义 |
|------|---------|
| 200 | HTTP 请求已成功处理。请查看响应体中的 `code` 字段获取业务结果。 |
| 400 | 错误的请求 |
| 401 | 未授权 |
| 403 | 禁止访问 |
| 404 | 未找到 |
| 409 | 冲突 |
| 500 | 服务器内部错误 |

</template>
</BiRow>

<BiRow>
<template #en>

### Response body codes

</template>
<template #zh>

### 响应体业务码

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

## OpenAI-Compatible API

</template>
<template #zh>

## OpenAI 兼容 API

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

### Create chat completion

</template>
<template #zh>

### 创建对话补全

</template>
</BiRow>

<BiRow>
<template #en>

Creates a model response for the given historical chat conversation via OpenAI's API.

</template>
<template #zh>

通过 OpenAI 的 API 为给定的历史对话生成模型响应。

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

##### chat_id: `string`, *Required*

</template>
<template #zh>

##### chat_id：`string`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

Existing chat assistant ID. This value is part of the request path: `/api/v1/openai/<chat_id>/chat/completions`.

</template>
<template #zh>

已有对话助手的 ID。该值是请求路径的一部分：`/api/v1/openai/<chat_id>/chat/completions`。

</template>
</BiRow>

<BiRow>
<template #en>

##### model: `string`, *Required*

</template>
<template #zh>

##### model：`string`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The model used to generate the response. You may also use the legacy placeholder value `"model"` to keep using the chat assistant's configured model.

</template>
<template #zh>

用于生成响应的模型。也可以沿用旧版占位值 `"model"`，以继续使用该对话助手所配置的模型。

</template>
</BiRow>

<BiRow>
<template #en>

##### messages: `list[object]`, *Required*

</template>
<template #zh>

##### messages：`list[object]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

A list of historical chat messages used to generate the response. This must contain at least one message with the `user` role.

</template>
<template #zh>

用于生成响应的历史对话消息列表，其中必须至少包含一条 `user` 角色的消息。

</template>
</BiRow>

<BiRow>
<template #en>

##### stream: `boolean`

</template>
<template #zh>

##### stream：`boolean`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to receive the response as a stream. Set this to `false` explicitly if you prefer to receive the entire response in one go instead of as a stream.

</template>
<template #zh>

是否以流式方式接收响应。如果希望一次性接收完整响应而非流式数据，请显式设置为 `false`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: Response [message](https://platform.openai.com/docs/api-reference/chat/create) like OpenAI
- Failure: `Exception`

</template>
<template #zh>

- 成功：响应[消息](https://platform.openai.com/docs/api-reference/chat/create)，格式与 OpenAI 一致
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from openai import OpenAI

model = "glm-4-flash@ZHIPU-AI"
client = OpenAI(api_key="ragflow-api-key", base_url="http://ragflow_address/api/v1/openai/<chat_id>/chat")

stream = True
reference = True

request_kwargs = dict(
    model=model,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who are you?"},
        {"role": "assistant", "content": "I am an AI assistant named..."},
        {"role": "user", "content": "Can you tell me how to install neovim"},
    ],
    extra_body={
        "reference": reference,
        "reference_metadata": {
            "include": True,
            "fields": ["author", "year", "source"],
        },
    },
)

if stream:
    completion = client.chat.completions.create(stream=True, **request_kwargs)
    for chunk in completion:
        print(chunk)
else:
    resp = client.chat.completions.with_raw_response.create(
        stream=False, **request_kwargs
    )
    print("status:", resp.http_response.status_code)
    raw_text = resp.http_response.text
    print("raw:", raw_text)

    data = json.loads(raw_text)
    print("assistant:", data["choices"][0]["message"].get("content"))
    print("reference:", data["choices"][0]["message"].get("reference"))
```

</template>
<template #zh>

```python
from openai import OpenAI

model = "glm-4-flash@ZHIPU-AI"
client = OpenAI(api_key="ragflow-api-key", base_url="http://ragflow_address/api/v1/openai/<chat_id>/chat")

stream = True
reference = True

request_kwargs = dict(
    model=model,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who are you?"},
        {"role": "assistant", "content": "I am an AI assistant named..."},
        {"role": "user", "content": "Can you tell me how to install neovim"},
    ],
    extra_body={
        "reference": reference,
        "reference_metadata": {
            "include": True,
            "fields": ["author", "year", "source"],
        },
    },
)

if stream:
    completion = client.chat.completions.create(stream=True, **request_kwargs)
    for chunk in completion:
        print(chunk)
else:
    resp = client.chat.completions.with_raw_response.create(
        stream=False, **request_kwargs
    )
    print("status:", resp.http_response.status_code)
    raw_text = resp.http_response.text
    print("raw:", raw_text)

    data = json.loads(raw_text)
    print("assistant:", data["choices"][0]["message"].get("content"))
    print("reference:", data["choices"][0]["message"].get("reference"))
```

</template>
</BiRow>

<BiRow>
<template #en>

When `extra_body.reference` is `true`, the streamed final chunk may include `choices[0].delta.reference`, and the non-stream response may include `choices[0].message.reference`.

</template>
<template #zh>

当 `extra_body.reference` 为 `true` 时，流式响应的最后一个分块可能包含 `choices[0].delta.reference`，非流式响应可能包含 `choices[0].message.reference`。

</template>
</BiRow>

<BiRow>
<template #en>

When `extra_body.reference_metadata.include` is `true`, each reference chunk may include a `document_metadata` object in both streaming and non-streaming responses.

</template>
<template #zh>

当 `extra_body.reference_metadata.include` 为 `true` 时，无论流式还是非流式响应，每个引用分块都可能包含一个 `document_metadata` 对象。

</template>
</BiRow>

<BiRow>
<template #en>

## DATASET MANAGEMENT

</template>
<template #zh>

## 数据集管理

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

### Create dataset

</template>
<template #zh>

### 创建数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.create_dataset(
    name: str,
    avatar: Optional[str] = None,
    description: Optional[str] = None,
    embedding_model: Optional[str] = None,
    permission: str = "me",
    chunk_method: str = "naive",
    parser_config: Optional[DataSet.ParserConfig] = None,
    auto_metadata_config: Optional[dict[str, Any]] = None

) -> DataSet
```

</template>
<template #zh>

```python
RAGFlow.create_dataset(
    name: str,
    avatar: Optional[str] = None,
    description: Optional[str] = None,
    embedding_model: Optional[str] = None,
    permission: str = "me",
    chunk_method: str = "naive",
    parser_config: Optional[DataSet.ParserConfig] = None,
    auto_metadata_config: Optional[dict[str, Any]] = None

) -> DataSet
```

</template>
</BiRow>

<BiRow>
<template #en>

Creates a dataset.

</template>
<template #zh>

创建数据集。

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

##### name: `string`, *Required*

</template>
<template #zh>

##### name：`string`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The unique name of the dataset to create. It must adhere to the following requirements:

</template>
<template #zh>

待创建数据集的唯一名称，必须满足以下要求：

</template>
</BiRow>

<BiRow>
<template #en>

- Maximum 128 characters.
- Case-insensitive.

</template>
<template #zh>

- 最多 128 个字符。
- 不区分大小写。

</template>
</BiRow>

<BiRow>
<template #en>

##### avatar: `string`

</template>
<template #zh>

##### avatar：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Base64 encoding of the avatar. Defaults to `None`

</template>
<template #zh>

头像的 Base64 编码。默认为 `None`

</template>
</BiRow>

<BiRow>
<template #en>

##### description: `string`

</template>
<template #zh>

##### description：`string`

</template>
</BiRow>

<BiRow>
<template #en>

A brief description of the dataset to create. Defaults to `None`.

</template>
<template #zh>

待创建数据集的简短描述。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### embedding_model: `string | None`

</template>
<template #zh>

##### embedding_model：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The embedding model to use for the dataset. Defaults to `None`.

</template>
<template #zh>

该数据集要使用的嵌入模型。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### auto_metadata_config: `dict[str, Any] | None`

</template>
<template #zh>

##### auto_metadata_config：`dict[str, Any] | None`

</template>
</BiRow>

<BiRow>
<template #en>

The automatic metadata extraction configuration for the dataset. Defaults to `None`.

</template>
<template #zh>

该数据集的自动元数据提取配置。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### permission

</template>
<template #zh>

##### permission

</template>
</BiRow>

<BiRow>
<template #en>

Specifies who can access the dataset to create. Available options:

</template>
<template #zh>

指定谁可以访问待创建的数据集。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"me"`: (Default) Only you can manage the dataset.
- `"team"`: All team members can manage the dataset.

</template>
<template #zh>

- `"me"`：（默认）仅你自己可以管理该数据集。
- `"team"`：所有团队成员都可以管理该数据集。

</template>
</BiRow>

<BiRow>
<template #en>

##### chunk_method, `string`

</template>
<template #zh>

##### chunk_method，`string`

</template>
</BiRow>

<BiRow>
<template #en>

The chunking method of the dataset to create. Available options:

</template>
<template #zh>

待创建数据集的分块方法。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"naive"`: General (default)
- `"manual"`: Manual
- `"qa"`: Q&A
- `"table"`: Table
- `"paper"`: Paper
- `"book"`: Book
- `"laws"`: Laws
- `"presentation"`: Presentation
- `"picture"`: Picture
- `"one"`: One
- `"email"`: Email

</template>
<template #zh>

- `"naive"`：通用（默认）
- `"manual"`：手册
- `"qa"`：问答
- `"table"`：表格
- `"paper"`：论文
- `"book"`：书籍
- `"laws"`：法律
- `"presentation"`：演示文稿
- `"picture"`：图片
- `"one"`：整篇
- `"email"`：邮件

</template>
</BiRow>

<BiRow>
<template #en>

##### parser_config: `DataSet.ParserConfig | None`

</template>
<template #zh>

##### parser_config：`DataSet.ParserConfig | None`

</template>
</BiRow>

<BiRow>
<template #en>

The parser configuration of the dataset. A `ParserConfig` object's attributes vary based on the selected `chunk_method`:

</template>
<template #zh>

数据集的解析器配置。`ParserConfig` 对象的属性随所选 `chunk_method` 而异：

</template>
</BiRow>

<BiRow>
<template #en>

- `chunk_method`=`"naive"`:
  `{"chunk_token_num":512,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False},"parent_child":{"use_parent_child":False,"children_delimiter":"\n"}}`.
- `chunk_method`=`"qa"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"manual"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"table"`:
  `None`
- `chunk_method`=`"paper"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"book"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"laws"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"picture"`:
  `None`
- `chunk_method`=`"presentation"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"one"`:
  `None`
- `chunk_method`=`"email"`:
  `None`

</template>
<template #zh>

- `chunk_method`=`"naive"`:
  `{"chunk_token_num":512,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False},"parent_child":{"use_parent_child":False,"children_delimiter":"\n"}}`.
- `chunk_method`=`"qa"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"manual"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"table"`:
  `None`
- `chunk_method`=`"paper"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"book"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"laws"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"picture"`:
  `None`
- `chunk_method`=`"presentation"`:
  `{"raptor": {"use_raptor": False}}`
- `chunk_method`=`"one"`:
  `None`
- `chunk_method`=`"email"`:
  `None`

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A `dataset` object.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个 `dataset` 对象。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="kb_1")
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="kb_1")
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

### Delete datasets

</template>
<template #zh>

### 删除数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.delete_datasets(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
RAGFlow.delete_datasets(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes datasets by ID.

</template>
<template #zh>

按 ID 删除数据集。

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

##### ids: `list[str]` or `None`

</template>
<template #zh>

##### ids：`list[str]` 或 `None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the datasets to delete. Defaults to `None`.

</template>
<template #zh>

待删除数据集的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `null` or an empty array, no datasets are deleted.
- If an array of IDs is provided, only the datasets matching those IDs are deleted.

</template>
<template #zh>

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何数据集。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的数据集。

</template>
</BiRow>

<BiRow>
<template #en>

##### delete_all: `bool`

</template>
<template #zh>

##### delete_all：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to delete all datasets owned by the current user when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前用户拥有的所有数据集。默认为 `False`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
rag_object.delete_datasets(ids=["d94a8dc02c9711f0930f7fbc369eab6d","e94a8dc02c9711f0930f7fbc369eab6e"])
rag_object.delete_datasets(delete_all=True)
```

</template>
<template #zh>

```python
rag_object.delete_datasets(ids=["d94a8dc02c9711f0930f7fbc369eab6d","e94a8dc02c9711f0930f7fbc369eab6e"])
rag_object.delete_datasets(delete_all=True)
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

### List datasets

</template>
<template #zh>

### 列出数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.list_datasets(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    id: str | None = None,
    ids: list[str] | None = None,
    name: str | None = None,
) -> list[DataSet]
```

</template>
<template #zh>

```python
RAGFlow.list_datasets(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    id: str | None = None,
    ids: list[str] | None = None,
    name: str | None = None,
) -> list[DataSet]
```

</template>
</BiRow>

<BiRow>
<template #en>

Lists datasets.

</template>
<template #zh>

列出数据集。

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

##### page: `int`

</template>
<template #zh>

##### page：`int`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the datasets will be displayed. Defaults to `1`.

</template>
<template #zh>

指定数据集显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`

</template>
<template #zh>

##### page_size：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The number of datasets on each page. Defaults to `30`.

</template>
<template #zh>

每页的数据集数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### orderby: `string`

</template>
<template #zh>

##### orderby：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The field by which datasets should be sorted. Available options:

</template>
<template #zh>

数据集排序所依据的字段。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"create_time"` (default)
- `"update_time"`

</template>
<template #zh>

- `"create_time"`（默认）
- `"update_time"`

</template>
</BiRow>

<BiRow>
<template #en>

##### desc: `bool`

</template>
<template #zh>

##### desc：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether the retrieved datasets should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的数据集是否按降序排列。默认为 `True`。

</template>
</BiRow>

<BiRow>
<template #en>

##### id: `string`

</template>
<template #zh>

##### id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the dataset to retrieve. Defaults to `None`.

</template>
<template #zh>

待获取数据集的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### name: `string`

</template>
<template #zh>

##### name：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The name of the dataset to retrieve. Defaults to `None`.

</template>
<template #zh>

待获取数据集的名称。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### ids: `list[str] | None`

</template>
<template #zh>

##### ids：`list[str] | None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the datasets to retrieve. Defaults to `None`. The `id` and `ids` parameters cannot be used together.

</template>
<template #zh>

待获取数据集的 ID。默认为 `None`。`id` 与 `ids` 参数不能同时使用。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of `DataSet` objects.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `DataSet` 对象列表。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

##### List all datasets

</template>
<template #zh>

##### 列出所有数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
for dataset in rag_object.list_datasets():
    print(dataset)
```

</template>
<template #zh>

```python
for dataset in rag_object.list_datasets():
    print(dataset)
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Retrieve a dataset by ID

</template>
<template #zh>

##### 按 ID 获取单个数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
dataset = rag_object.list_datasets(id = "id_1")
print(dataset[0])
```

</template>
<template #zh>

```python
dataset = rag_object.list_datasets(id = "id_1")
print(dataset[0])
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Retrieve datasets by IDs

</template>
<template #zh>

##### 按 ID 批量获取数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
datasets = rag_object.list_datasets(ids=["id_1", "id_2"])
for dataset in datasets:
    print(dataset)
```

</template>
<template #zh>

```python
datasets = rag_object.list_datasets(ids=["id_1", "id_2"])
for dataset in datasets:
    print(dataset)
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

### Update dataset

</template>
<template #zh>

### 更新数据集

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.update(update_message: dict)
```

</template>
<template #zh>

```python
DataSet.update(update_message: dict)
```

</template>
</BiRow>

<BiRow>
<template #en>

Updates configurations for the current dataset.

</template>
<template #zh>

更新当前数据集的配置。

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

##### update_message: `dict[str, str|int]`, *Required*

</template>
<template #zh>

##### update_message：`dict[str, str|int]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

A dictionary representing the attributes to update, with the following keys:

</template>
<template #zh>

一个表示待更新属性的字典，包含以下键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"name"`: `string` The revised name of the dataset.
  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters
  - Case-insensitive
- `"avatar"`: (*Body parameter*), `string`
  The updated base64 encoding of the avatar.
  - Maximum 65535 characters
- `"embedding_model"`: (*Body parameter*), `string`
  The updated embedding model name.
  - Ensure that `"chunk_count"` is `0` before updating `"embedding_model"`.
  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `"permission"`: (*Body parameter*), `string`
  The updated dataset permission. Available options:
  - `"me"`: (Default) Only you can manage the dataset.
  - `"team"`: All team members can manage the dataset.
- `"pagerank"`: (*Body parameter*), `int`
  refer to [Set page rank](https://ragflow.io/docs/dev/set_page_rank)
  - Default: `0`
  - Minimum: `0`
  - Maximum: `100`
- `"chunk_method"`: (*Body parameter*), `enum<string>`
  The chunking method for the dataset. Available options:
  - `"naive"`: General (default)
  - `"book"`: Book
  - `"email"`: Email
  - `"laws"`: Laws
  - `"manual"`: Manual
  - `"one"`: One
  - `"paper"`: Paper
  - `"picture"`: Picture
  - `"presentation"`: Presentation
  - `"qa"`: Q&A
  - `"table"`: Table
  - `"tag"`: Tag

</template>
<template #zh>

- `"name"`：`string` 数据集修改后的名称。
  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符
  - 不区分大小写
- `"avatar"`：（*请求体参数*），`string`
  更新后的头像 Base64 编码。
  - 最多 65535 个字符
- `"embedding_model"`：（*请求体参数*），`string`
  更新后的嵌入模型名称。
  - 更新 `"embedding_model"` 前请确保 `"chunk_count"` 为 `0`。
  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `"permission"`：（*请求体参数*），`string`
  更新后的数据集权限。可用选项：
  - `"me"`：（默认）仅你自己可以管理该数据集。
  - `"team"`：所有团队成员都可以管理该数据集。
- `"pagerank"`：（*请求体参数*），`int`
  参见[设置 PageRank](https://ragflow.io/docs/dev/set_page_rank)
  - 默认：`0`
  - 最小值：`0`
  - 最大值：`100`
- `"chunk_method"`：（*请求体参数*），`enum<string>`
  数据集的分块方法。可用选项：
  - `"naive"`：通用（默认）
  - `"book"`：书籍
  - `"email"`：邮件
  - `"laws"`：法律
  - `"manual"`：手册
  - `"one"`：整篇
  - `"paper"`：论文
  - `"picture"`：图片
  - `"presentation"`：演示文稿
  - `"qa"`：问答
  - `"table"`：表格
  - `"tag"`：标签

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_name")
dataset = dataset[0]
dataset.update({"embedding_model":"BAAI/bge-zh-v1.5", "chunk_method":"manual"})
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_name")
dataset = dataset[0]
dataset.update({"embedding_model":"BAAI/bge-zh-v1.5", "chunk_method":"manual"})
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

## FILE MANAGEMENT WITHIN DATASET

</template>
<template #zh>

## 数据集内文件管理

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

### Upload documents

</template>
<template #zh>

### 上传文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.upload_documents(document_list: list[dict])
```

</template>
<template #zh>

```python
DataSet.upload_documents(document_list: list[dict])
```

</template>
</BiRow>

<BiRow>
<template #en>

Uploads documents to the current dataset.

</template>
<template #zh>

向当前数据集上传文档。

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

##### document_list: `list[dict]`, *Required*

</template>
<template #zh>

##### document_list：`list[dict]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

A list of dictionaries representing the documents to upload, each containing the following keys:

</template>
<template #zh>

一个表示待上传文档的字典列表，每个字典包含以下键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"display_name"`: `string`, *Required*
  The file name to display in the dataset.
- `"blob"`: `bytes`, *Required*
  The binary content of the file to upload.

</template>
<template #zh>

- `"display_name"`：`string`，*必填*
  在数据集中显示的文件名。
- `"blob"`：`bytes`，*必填*
  待上传文件的二进制内容。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of uploaded `Document` objects.
- Failure: `Exception`

</template>
<template #zh>

- 成功：已上传 `Document` 对象的列表。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
dataset = rag_object.create_dataset(name="kb_name")

with open("1.txt", "rb") as file:
    documents = dataset.upload_documents([
        {
            "display_name": "1.txt",
            "blob": file.read(),
        }
    ])

print(documents[0].id)
```

</template>
<template #zh>

```python
dataset = rag_object.create_dataset(name="kb_name")

with open("1.txt", "rb") as file:
    documents = dataset.upload_documents([
        {
            "display_name": "1.txt",
            "blob": file.read(),
        }
    ])

print(documents[0].id)
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

### Update document

</template>
<template #zh>

### 更新文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
Document.update(update_message: dict)
```

</template>
<template #zh>

```python
Document.update(update_message: dict)
```

</template>
</BiRow>

<BiRow>
<template #en>

Updates configurations for the current document.

</template>
<template #zh>

更新当前文档的配置。

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

##### update_message: `dict[str, Any]`, *Required*

</template>
<template #zh>

##### update_message：`dict[str, Any]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

A dictionary representing the attributes to update, with the following keys:

</template>
<template #zh>

一个表示待更新属性的字典，包含以下键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"display_name"`: `string` The name of the document to update.
- `"meta_fields"`: `dict[str, Any]` The meta fields of the document.
- `"chunk_method"`: `string` The parsing method to apply to the document.
  - `"naive"`: General
  - `"manual"`: Manual
  - `"qa"`: Q&A
  - `"table"`: Table
  - `"paper"`: Paper
  - `"book"`: Book
  - `"laws"`: Laws
  - `"presentation"`: Presentation
  - `"picture"`: Picture
  - `"one"`: One
  - `"email"`: Email
- `"parser_config"`: `dict[str, Any]` The parsing configuration for the document. Its attributes vary based on the selected `"chunk_method"`:
  - `"chunk_method"`=`"naive"`:
    `{"chunk_token_num":128,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False},"parent_child":{"use_parent_child":False,"children_delimiter":"\n"}}`.
  - `chunk_method`=`"qa"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"manual"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"table"`:
    `None`
  - `chunk_method`=`"paper"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"book"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"laws"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"presentation"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"picture"`:
    `None`
  - `chunk_method`=`"one"`:
    `None`
  - `chunk_method`=`"email"`:
    `None`

</template>
<template #zh>

- `"display_name"`：`string` 待更新文档的名称。
- `"meta_fields"`：`dict[str, Any]` 文档的元数据字段。
- `"chunk_method"`：`string` 应用于该文档的解析方法。
  - `"naive"`：通用
  - `"manual"`：手册
  - `"qa"`：问答
  - `"table"`：表格
  - `"paper"`：论文
  - `"book"`：书籍
  - `"laws"`：法律
  - `"presentation"`：演示文稿
  - `"picture"`：图片
  - `"one"`：整篇
  - `"email"`：邮件
- `"parser_config"`：`dict[str, Any]` 文档的解析配置。其属性随所选 `"chunk_method"` 而异：
  - `"chunk_method"`=`"naive"`:
    `{"chunk_token_num":128,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False},"parent_child":{"use_parent_child":False,"children_delimiter":"\n"}}`.
  - `chunk_method`=`"qa"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"manual"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"table"`:
    `None`
  - `chunk_method`=`"paper"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"book"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"laws"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"presentation"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"picture"`:
    `None`
  - `chunk_method`=`"one"`:
    `None`
  - `chunk_method`=`"email"`:
    `None`

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: The updated `Document` object.
- Failure: `Exception`

</template>
<template #zh>

- 成功：更新后的 `Document` 对象。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(id='id')
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
doc.update({
    "parser_config": {
        "chunk_token_num": 256,
    },
    "chunk_method": "manual",
})
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(id='id')
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
doc.update({
    "parser_config": {
        "chunk_token_num": 256,
    },
    "chunk_method": "manual",
})
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

### Download document

</template>
<template #zh>

### 下载文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
Document.download() -> bytes
```

</template>
<template #zh>

```python
Document.download() -> bytes
```

</template>
</BiRow>

<BiRow>
<template #en>

Downloads the current document.

</template>
<template #zh>

下载当前文档。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

The downloaded document in bytes.

</template>
<template #zh>

已下载文档的字节内容。

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from pathlib import Path
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(
    api_key="<YOUR_API_KEY>",
    base_url="https://<YOUR_BASE_URL>",
)
dataset = rag_object.list_datasets(id="id")[0]
doc = dataset.list_documents(id="wdfxb5t547d")[0]

Path("~/ragflow.txt").expanduser().write_bytes(doc.download())
```

</template>
<template #zh>

```python
from pathlib import Path
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(
    api_key="<YOUR_API_KEY>",
    base_url="https://<YOUR_BASE_URL>",
)
dataset = rag_object.list_datasets(id="id")[0]
doc = dataset.list_documents(id="wdfxb5t547d")[0]

Path("~/ragflow.txt").expanduser().write_bytes(doc.download())
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

### List documents

</template>
<template #zh>

### 列出文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.list_documents(
    id: str | None = None,
    ids: list[str] | None = None,
    name: str | None = None,
    keywords: str | None = None,
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    create_time_from: int = 0,
    create_time_to: int = 0
)
```

</template>
<template #zh>

```python
DataSet.list_documents(
    id: str | None = None,
    ids: list[str] | None = None,
    name: str | None = None,
    keywords: str | None = None,
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    create_time_from: int = 0,
    create_time_to: int = 0
)
```

</template>
</BiRow>

<BiRow>
<template #en>

Lists documents in the current dataset.

</template>
<template #zh>

列出当前数据集中的文档。

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

##### id: `string | None`

</template>
<template #zh>

##### id：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the document to retrieve. Defaults to `None`.

</template>
<template #zh>

待获取文档的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### ids: `list[str] | None`

</template>
<template #zh>

##### ids：`list[str] | None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents to retrieve. Defaults to `None`. The `id` and `ids` parameters cannot be used together.

</template>
<template #zh>

待获取文档的 ID。默认为 `None`。`id` 与 `ids` 参数不能同时使用。

</template>
</BiRow>

<BiRow>
<template #en>

##### name: `string | None`

</template>
<template #zh>

##### name：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The exact name of the document to retrieve. Defaults to `None`.

</template>
<template #zh>

待获取文档的准确名称。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### keywords: `string | None`

</template>
<template #zh>

##### keywords：`string | None`

</template>
</BiRow>

<BiRow>
<template #en>

The keywords used to match document titles. Defaults to `None`.

</template>
<template #zh>

用于匹配文档标题的关键词。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page: `int`

</template>
<template #zh>

##### page：`int`

</template>
</BiRow>

<BiRow>
<template #en>

Specifies the page on which the documents will be displayed. Defaults to `1`.

</template>
<template #zh>

指定文档显示的页码。默认为 `1`。

</template>
</BiRow>

<BiRow>
<template #en>

##### page_size: `int`

</template>
<template #zh>

##### page_size：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The maximum number of documents on each page. Defaults to `30`.

</template>
<template #zh>

每页文档的最大数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### orderby: `string`

</template>
<template #zh>

##### orderby：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The field by which documents should be sorted. Available options:

</template>
<template #zh>

文档排序所依据的字段。可用选项：

</template>
</BiRow>

<BiRow>
<template #en>

- `"create_time"` (default)
- `"update_time"`

</template>
<template #zh>

- `"create_time"`（默认）
- `"update_time"`

</template>
</BiRow>

<BiRow>
<template #en>

##### desc: `bool`

</template>
<template #zh>

##### desc：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether the retrieved documents should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的文档是否按降序排列。默认为 `True`。

</template>
</BiRow>

<BiRow>
<template #en>

##### create_time_from: `int`
Unix timestamp for filtering documents created after this time. 0 means no filter. Defaults to 0.

</template>
<template #zh>

##### create_time_from：`int`
用于筛选在此时间之后创建的文档的 Unix 时间戳。0 表示不筛选。默认为 0。

</template>
</BiRow>

<BiRow>
<template #en>

##### create_time_to: `int`
Unix timestamp for filtering documents created before this time. 0 means no filter. Defaults to 0.

</template>
<template #zh>

##### create_time_to：`int`
用于筛选在此时间之前创建的文档的 Unix 时间戳。0 表示不筛选。默认为 0。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: A list of `Document` objects.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `Document` 对象列表。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

A `Document` object contains the following attributes:

</template>
<template #zh>

`Document` 对象包含以下属性：

</template>
</BiRow>

<BiRow>
<template #en>

- `id`: The document ID. Defaults to `""`.
- `name`: The document name. Defaults to `""`.
- `thumbnail`: The thumbnail image of the document. Defaults to `None`.
- `dataset_id`: The dataset ID associated with the document. Defaults to `None`.
- `chunk_method` The chunking method name. Defaults to `"naive"`.
- `source_type`: The source type of the document. Defaults to `"local"`.
- `type`: Type or category of the document. Defaults to `""`. Reserved for future use.
- `created_by`: `string` The creator of the document. Defaults to `""`.
- `size`: `int` The document size in bytes. Defaults to `0`.
- `token_count`: `int` The number of tokens in the document. Defaults to `0`.
- `chunk_count`: `int` The number of chunks in the document. Defaults to `0`.
- `progress`: `float` The current processing progress as a percentage. Defaults to `0.0`.
- `progress_msg`: `string` A message indicating the current progress status. Defaults to `""`.
- `process_begin_at`: `datetime` The start time of document processing. Defaults to `None`.
- `process_duration`: `float` Duration of the processing in seconds. Defaults to `0.0`.
- `run`: `string` The document's processing status:
  - `"UNSTART"`  (default)
  - `"RUNNING"`
  - `"CANCEL"`
  - `"DONE"`
  - `"FAIL"`
- `status`: `string` Reserved for future use.
- `parser_config`: `ParserConfig` Configuration object for the parser. Its attributes vary based on the selected `chunk_method`:
  - `chunk_method`=`"naive"`:
    `{"chunk_token_num":128,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False}}`.
  - `chunk_method`=`"qa"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"manual"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"table"`:
    `None`
  - `chunk_method`=`"paper"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"book"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"laws"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"presentation"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"picture"`:
    `None`
  - `chunk_method`=`"one"`:
    `None`
  - `chunk_method`=`"email"`:
    `None`

</template>
<template #zh>

- `id`：文档 ID。默认为 `""`。
- `name`：文档名称。默认为 `""`。
- `thumbnail`：文档的缩略图。默认为 `None`。
- `dataset_id`：文档关联的数据集 ID。默认为 `None`。
- `chunk_method` 分块方法名称。默认为 `"naive"`。
- `source_type`：文档的来源类型。默认为 `"local"`。
- `type`：文档的类型或类别。默认为 `""`。保留供将来使用。
- `created_by`：`string` 文档的创建者。默认为 `""`。
- `size`：`int` 文档大小（字节）。默认为 `0`。
- `token_count`：`int` 文档中的 token 数量。默认为 `0`。
- `chunk_count`：`int` 文档中的分块数量。默认为 `0`。
- `progress`：`float` 当前的处理进度（百分比）。默认为 `0.0`。
- `progress_msg`：`string` 指示当前进度状态的消息。默认为 `""`。
- `process_begin_at`：`datetime` 文档处理的开始时间。默认为 `None`。
- `process_duration`：`float` 处理时长（秒）。默认为 `0.0`。
- `run`：`string` 文档的处理状态：
  - `"UNSTART"`（默认）
  - `"RUNNING"`
  - `"CANCEL"`
  - `"DONE"`
  - `"FAIL"`
- `status`：`string` 保留供将来使用。
- `parser_config`：`ParserConfig` 解析器的配置对象。其属性随所选 `chunk_method` 而异：
  - `chunk_method`=`"naive"`:
    `{"chunk_token_num":128,"delimiter":"\n","html4excel":False,"layout_recognize":"DeepDOC","raptor":{"use_raptor":False}}`.
  - `chunk_method`=`"qa"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"manual"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"table"`:
    `None`
  - `chunk_method`=`"paper"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"book"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"laws"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"presentation"`:
    `{"raptor": {"use_raptor": False}}`
  - `chunk_method`=`"picture"`:
    `None`
  - `chunk_method`=`"one"`:
    `None`
  - `chunk_method`=`"email"`:
    `None`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from pathlib import Path
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(
    api_key="<YOUR_API_KEY>",
    base_url="http://<YOUR_BASE_URL>:9380",
)
dataset = rag_object.create_dataset(name="kb_1")

file_path = Path("~/ragflow.txt").expanduser()
dataset.upload_documents([
    {
        "display_name": file_path.name,
        "blob": file_path.read_bytes(),
    }
])

for doc in dataset.list_documents(
    keywords="rag",
    page=1,
    page_size=12,
):
    print(doc)
```

</template>
<template #zh>

```python
from pathlib import Path
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(
    api_key="<YOUR_API_KEY>",
    base_url="http://<YOUR_BASE_URL>:9380",
)
dataset = rag_object.create_dataset(name="kb_1")

file_path = Path("~/ragflow.txt").expanduser()
dataset.upload_documents([
    {
        "display_name": file_path.name,
        "blob": file_path.read_bytes(),
    }
])

for doc in dataset.list_documents(
    keywords="rag",
    page=1,
    page_size=12,
):
    print(doc)
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

### Delete documents

</template>
<template #zh>

### 删除文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.delete_documents(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
DataSet.delete_documents(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes documents by ID.

</template>
<template #zh>

按 ID 删除文档。

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

##### ids: `list[str]` or `None`

</template>
<template #zh>

##### ids：`list[str]` 或 `None`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents to delete. Defaults to `None`.

</template>
<template #zh>

待删除文档的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `null` or an empty array, no documents are deleted.
- If an array of IDs is provided, only the documents matching those IDs are deleted.

</template>
<template #zh>

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何文档。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的文档。

</template>
</BiRow>

<BiRow>
<template #en>

##### delete_all: `bool`

</template>
<template #zh>

##### delete_all：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to delete all documents in the current dataset when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前数据集中的所有文档。默认为 `False`。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_1")
dataset = dataset[0]
dataset.delete_documents(ids=["id_1","id_2"])
dataset.delete_documents(delete_all=True)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_1")
dataset = dataset[0]
dataset.delete_documents(ids=["id_1","id_2"])
dataset.delete_documents(delete_all=True)
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

### Parse documents

</template>
<template #zh>

### 解析文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.async_parse_documents(document_ids:list[str]) -> None
```

</template>
<template #zh>

```python
DataSet.async_parse_documents(document_ids:list[str]) -> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Parses documents in the current dataset.

</template>
<template #zh>

解析当前数据集中的文档。

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

##### document_ids: `list[str]`, *Required*

</template>
<template #zh>

##### document_ids：`list[str]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents to parse.

</template>
<template #zh>

待解析文档的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = [
    {'display_name': 'test1.txt', 'blob': open('./test_data/test1.txt',"rb").read()},
    {'display_name': 'test2.txt', 'blob': open('./test_data/test2.txt',"rb").read()},
    {'display_name': 'test3.txt', 'blob': open('./test_data/test3.txt',"rb").read()}
]
dataset.upload_documents(documents)
documents = dataset.list_documents(keywords="test")
ids = []
for document in documents:
    ids.append(document.id)
dataset.async_parse_documents(ids)
print("Async bulk parsing initiated.")
```

</template>
<template #zh>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = [
    {'display_name': 'test1.txt', 'blob': open('./test_data/test1.txt',"rb").read()},
    {'display_name': 'test2.txt', 'blob': open('./test_data/test2.txt',"rb").read()},
    {'display_name': 'test3.txt', 'blob': open('./test_data/test3.txt',"rb").read()}
]
dataset.upload_documents(documents)
documents = dataset.list_documents(keywords="test")
ids = []
for document in documents:
    ids.append(document.id)
dataset.async_parse_documents(ids)
print("Async bulk parsing initiated.")
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

### Parse documents (with document status)

</template>
<template #zh>

### 解析文档（附带文档状态）

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.parse_documents(document_ids: list[str]) -> list[tuple[str, str, int, int]]
```

</template>
<template #zh>

```python
DataSet.parse_documents(document_ids: list[str]) -> list[tuple[str, str, int, int]]
```

</template>
</BiRow>

<BiRow>
<template #en>

Starts parsing documents in the current dataset and synchronously waits for the results.

</template>
<template #zh>

开始解析当前数据集中的文档，并同步等待结果。

</template>
</BiRow>

<BiRow>
<template #en>

This method calls `async_parse_documents()` and blocks while polling until all requested documents reach a terminal state or report complete progress. It then returns the parsing status and statistics for each document. If a keyboard interruption occurs (e.g., `Ctrl+C`), it requests cancellation for the requested documents and continues polling for their final statuses. If a status request fails or a requested document is no longer found, the method raises an exception instead of continuing to poll.

</template>
<template #zh>

该方法调用 `async_parse_documents()` 并在轮询期间保持阻塞，直到所有请求的文档进入终止状态或上报完整进度。随后返回每个文档的解析状态与统计信息。若发生键盘中断（如 `Ctrl+C`），该方法会为所请求的文档发起取消，并继续轮询其最终状态。若状态请求失败或某个请求的文档已不存在，该方法会抛出异常而不是继续轮询。

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

##### document_ids: `list[str]`, *Required*

</template>
<template #zh>

##### document_ids：`list[str]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents to parse.

</template>
<template #zh>

待解析文档的 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

A list of tuples with detailed parsing results:

</template>
<template #zh>

一个包含详细解析结果的元组列表：

</template>
</BiRow>

<BiRow>
<template #en>

```python
[
  (document_id: str, status: str, chunk_count: int, token_count: int),
  ...
]
```
- `status`: The final parsing state (e.g., `DONE`, `FAIL`, `CANCEL`). If a document has not reached a terminal state but reports `progress >= 1.0`, its status is returned as `DONE`.
- `chunk_count`: The number of content chunks created from the document.
- `token_count`: The total number of tokens processed.

</template>
<template #zh>

```python
[
  (document_id: str, status: str, chunk_count: int, token_count: int),
  ...
]
```
- `status`：最终解析状态（如 `DONE`、`FAIL`、`CANCEL`）。若文档尚未进入终止状态但上报了 `progress >= 1.0`，其状态将按 `DONE` 返回。
- `chunk_count`：从该文档创建的内容分块数量。
- `token_count`：已处理的总 token 数量。

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

#### Example

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = dataset.list_documents(keywords="test")
ids = [doc.id for doc in documents]

try:
    finished = dataset.parse_documents(ids)
    for doc_id, status, chunk_count, token_count in finished:
        print(f"Document {doc_id} parsing finished with status: {status}, chunks: {chunk_count}, tokens: {token_count}")
except Exception as e:
    print(f"Parsing failed: {e}")
```

</template>
<template #zh>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = dataset.list_documents(keywords="test")
ids = [doc.id for doc in documents]

try:
    finished = dataset.parse_documents(ids)
    for doc_id, status, chunk_count, token_count in finished:
        print(f"Document {doc_id} parsing finished with status: {status}, chunks: {chunk_count}, tokens: {token_count}")
except Exception as e:
    print(f"Parsing failed: {e}")
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

### Stop parsing documents

</template>
<template #zh>

### 停止解析文档

</template>
</BiRow>

<BiRow>
<template #en>

```python
DataSet.async_cancel_parse_documents(document_ids:list[str])-> None
```

</template>
<template #zh>

```python
DataSet.async_cancel_parse_documents(document_ids:list[str])-> None
```

</template>
</BiRow>

<BiRow>
<template #en>

Stops parsing specified documents.

</template>
<template #zh>

停止解析指定文档。

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

##### document_ids: `list[str]`, *Required*

</template>
<template #zh>

##### document_ids：`list[str]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents for which parsing should be stopped.

</template>
<template #zh>

需要停止解析的文档 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Returns

</template>
<template #zh>

#### 返回

</template>
</BiRow>

<BiRow>
<template #en>

- Success: No value is returned.
- Failure: `Exception`

</template>
<template #zh>

- 成功：无返回值。
- 失败：`Exception`

</template>
</BiRow>

<BiRow>
<template #en>

#### Examples

</template>
<template #zh>

#### 示例

</template>
</BiRow>

<BiRow>
<template #en>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = [
    {'display_name': 'test1.txt', 'blob': open('./test_data/test1.txt',"rb").read()},
    {'display_name': 'test2.txt', 'blob': open('./test_data/test2.txt',"rb").read()},
    {'display_name': 'test3.txt', 'blob': open('./test_data/test3.txt',"rb").read()}
]
dataset.upload_documents(documents)
documents = dataset.list_documents(keywords="test")
ids = []
for document in documents:
    ids.append(document.id)
dataset.async_parse_documents(ids)
print("Async bulk parsing initiated.")
dataset.async_cancel_parse_documents(ids)
print("Async bulk parsing cancelled.")
```

</template>
<template #zh>

```python
rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="dataset_name")
documents = [
    {'display_name': 'test1.txt', 'blob': open('./test_data/test1.txt',"rb").read()},
    {'display_name': 'test2.txt', 'blob': open('./test_data/test2.txt',"rb").read()},
    {'display_name': 'test3.txt', 'blob': open('./test_data/test3.txt',"rb").read()}
]
dataset.upload_documents(documents)
documents = dataset.list_documents(keywords="test")
ids = []
for document in documents:
    ids.append(document.id)
dataset.async_parse_documents(ids)
print("Async bulk parsing initiated.")
dataset.async_cancel_parse_documents(ids)
print("Async bulk parsing cancelled.")
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
