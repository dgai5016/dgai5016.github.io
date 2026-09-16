# Python API 参考（第 1 部分）

RAGFlow Python API 的完整参考。开始之前，请确保你已[准备好用于认证的 RAGFlow API key](https://ragflow.io/docs/dev/acquire_ragflow_api_key)。

:::tip 注意
运行以下命令下载 Python SDK：

```bash
pip install ragflow-sdk
```

:::

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

## OpenAI 兼容 API

---

### 创建对话补全

通过 OpenAI 的 API 为给定的历史对话生成模型响应。

#### 参数

##### chat_id：`string`，*必填*

已有对话助手的 ID。该值是请求路径的一部分：`/api/v1/openai/<chat_id>/chat/completions`。

##### model：`string`，*必填*

用于生成响应的模型。也可以沿用旧版占位值 `"model"`，以继续使用该对话助手所配置的模型。

##### messages：`list[object]`，*必填*

用于生成响应的历史对话消息列表，其中必须至少包含一条 `user` 角色的消息。

##### stream：`boolean`

是否以流式方式接收响应。如果希望一次性接收完整响应而非流式数据，请显式设置为 `false`。

#### 返回

- 成功：响应[消息](https://platform.openai.com/docs/api-reference/chat/create)，格式与 OpenAI 一致
- 失败：`Exception`

#### 示例

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

当 `extra_body.reference` 为 `true` 时，流式响应的最后一个分块可能包含 `choices[0].delta.reference`，非流式响应可能包含 `choices[0].message.reference`。

当 `extra_body.reference_metadata.include` 为 `true` 时，无论流式还是非流式响应，每个引用分块都可能包含一个 `document_metadata` 对象。

## 数据集管理

---

### 创建数据集

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

创建数据集。

#### 参数

##### name：`string`，*必填*

待创建数据集的唯一名称，必须满足以下要求：

- 最多 128 个字符。
- 不区分大小写。

##### avatar：`string`

头像的 Base64 编码。默认为 `None`

##### description：`string`

待创建数据集的简短描述。默认为 `None`。

##### embedding_model：`string | None`

该数据集要使用的嵌入模型。默认为 `None`。

##### auto_metadata_config：`dict[str, Any] | None`

该数据集的自动元数据提取配置。默认为 `None`。

##### permission

指定谁可以访问待创建的数据集。可用选项：

- `"me"`：（默认）仅你自己可以管理该数据集。
- `"team"`：所有团队成员都可以管理该数据集。

##### chunk_method，`string`

待创建数据集的分块方法。可用选项：

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

##### parser_config：`DataSet.ParserConfig | None`

数据集的解析器配置。`ParserConfig` 对象的属性随所选 `chunk_method` 而异：

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

#### 返回

- 成功：一个 `dataset` 对象。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="kb_1")
```

---

### 删除数据集

```python
RAGFlow.delete_datasets(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除数据集。

#### 参数

##### ids：`list[str]` 或 `None`

待删除数据集的 ID。默认为 `None`。

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何数据集。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的数据集。

##### delete_all：`bool`

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前用户拥有的所有数据集。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
rag_object.delete_datasets(ids=["d94a8dc02c9711f0930f7fbc369eab6d","e94a8dc02c9711f0930f7fbc369eab6e"])
rag_object.delete_datasets(delete_all=True)
```

---

### 列出数据集

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

列出数据集。

#### 参数

##### page：`int`

指定数据集显示的页码。默认为 `1`。

##### page_size：`int`

每页的数据集数量。默认为 `30`。

##### orderby：`string`

数据集排序所依据的字段。可用选项：

- `"create_time"`（默认）
- `"update_time"`

##### desc：`bool`

指示检索到的数据集是否按降序排列。默认为 `True`。

##### id：`string`

待获取数据集的 ID。默认为 `None`。

##### name：`string`

待获取数据集的名称。默认为 `None`。

##### ids：`list[str] | None`

待获取数据集的 ID。默认为 `None`。`id` 与 `ids` 参数不能同时使用。

#### 返回

- 成功：一个 `DataSet` 对象列表。
- 失败：`Exception`。

#### 示例

##### 列出所有数据集

```python
for dataset in rag_object.list_datasets():
    print(dataset)
```

##### 按 ID 获取单个数据集

```python
dataset = rag_object.list_datasets(id = "id_1")
print(dataset[0])
```

##### 按 ID 批量获取数据集

```python
datasets = rag_object.list_datasets(ids=["id_1", "id_2"])
for dataset in datasets:
    print(dataset)
```

---

### 更新数据集

```python
DataSet.update(update_message: dict)
```

更新当前数据集的配置。

#### 参数

##### update_message：`dict[str, str|int]`，*必填*

一个表示待更新属性的字典，包含以下键：

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

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_name")
dataset = dataset[0]
dataset.update({"embedding_model":"BAAI/bge-zh-v1.5", "chunk_method":"manual"})
```

---

## 数据集内文件管理

---

### 上传文档

```python
DataSet.upload_documents(document_list: list[dict])
```

向当前数据集上传文档。

#### 参数

##### document_list：`list[dict]`，*必填*

一个表示待上传文档的字典列表，每个字典包含以下键：

- `"display_name"`：`string`，*必填*
  在数据集中显示的文件名。
- `"blob"`：`bytes`，*必填*
  待上传文件的二进制内容。

#### 返回

- 成功：已上传 `Document` 对象的列表。
- 失败：`Exception`

#### 示例

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

---

### 更新文档

```python
Document.update(update_message: dict)
```

更新当前文档的配置。

#### 参数

##### update_message：`dict[str, Any]`，*必填*

一个表示待更新属性的字典，包含以下键：

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

#### 返回

- 成功：更新后的 `Document` 对象。
- 失败：`Exception`

#### 示例

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

---

### 下载文档

```python
Document.download() -> bytes
```

下载当前文档。

#### 返回

已下载文档的字节内容。

#### 示例

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

---

### 列出文档

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

列出当前数据集中的文档。

#### 参数

##### id：`string | None`

待获取文档的 ID。默认为 `None`。

##### ids：`list[str] | None`

待获取文档的 ID。默认为 `None`。`id` 与 `ids` 参数不能同时使用。

##### name：`string | None`

待获取文档的准确名称。默认为 `None`。

##### keywords：`string | None`

用于匹配文档标题的关键词。默认为 `None`。

##### page：`int`

指定文档显示的页码。默认为 `1`。

##### page_size：`int`

每页文档的最大数量。默认为 `30`。

##### orderby：`string`

文档排序所依据的字段。可用选项：

- `"create_time"`（默认）
- `"update_time"`

##### desc：`bool`

指示检索到的文档是否按降序排列。默认为 `True`。

##### create_time_from：`int`
用于筛选在此时间之后创建的文档的 Unix 时间戳。0 表示不筛选。默认为 0。

##### create_time_to：`int`
用于筛选在此时间之前创建的文档的 Unix 时间戳。0 表示不筛选。默认为 0。

#### 返回

- 成功：一个 `Document` 对象列表。
- 失败：`Exception`。

`Document` 对象包含以下属性：

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

#### 示例

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

---

### 删除文档

```python
DataSet.delete_documents(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除文档。

#### 参数

##### ids：`list[str]` 或 `None`

待删除文档的 ID。默认为 `None`。

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何文档。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的文档。

##### delete_all：`bool`

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前数据集中的所有文档。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_1")
dataset = dataset[0]
dataset.delete_documents(ids=["id_1","id_2"])
dataset.delete_documents(delete_all=True)
```

---

### 解析文档

```python
DataSet.async_parse_documents(document_ids:list[str]) -> None
```

解析当前数据集中的文档。

#### 参数

##### document_ids：`list[str]`，*必填*

待解析文档的 ID。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

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

---

### 解析文档（附带文档状态）

```python
DataSet.parse_documents(document_ids: list[str]) -> list[tuple[str, str, int, int]]
```

开始解析当前数据集中的文档，并同步等待结果。

该方法调用 `async_parse_documents()` 并在轮询期间保持阻塞，直到所有请求的文档进入终止状态或上报完整进度。随后返回每个文档的解析状态与统计信息。若发生键盘中断（如 `Ctrl+C`），该方法会为所请求的文档发起取消，并继续轮询其最终状态。若状态请求失败或某个请求的文档已不存在，该方法会抛出异常而不是继续轮询。

#### 参数

##### document_ids：`list[str]`，*必填*

待解析文档的 ID。

#### 返回

一个包含详细解析结果的元组列表：

```python
[
  (document_id: str, status: str, chunk_count: int, token_count: int),
  ...
]
```
- `status`：最终解析状态（如 `DONE`、`FAIL`、`CANCEL`）。若文档尚未进入终止状态但上报了 `progress >= 1.0`，其状态将按 `DONE` 返回。
- `chunk_count`：从该文档创建的内容分块数量。
- `token_count`：已处理的总 token 数量。

---

#### 示例

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

---

### 停止解析文档

```python
DataSet.async_cancel_parse_documents(document_ids:list[str])-> None
```

停止解析指定文档。

#### 参数

##### document_ids：`list[str]`，*必填*

需要停止解析的文档 ID。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

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

---
