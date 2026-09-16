# Python API Reference (Part 1)

A complete reference for RAGFlow's Python APIs. Before proceeding, please ensure you [have your RAGFlow API key ready for authentication](https://ragflow.io/docs/dev/acquire_ragflow_api_key).

:::tip NOTE
Run the following command to download the Python SDK:

```bash
pip install ragflow-sdk
```

:::

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

## OpenAI-Compatible API

---

### Create chat completion

Creates a model response for the given historical chat conversation via OpenAI's API.

#### Parameters

##### chat_id: `string`, *Required*

Existing chat assistant ID. This value is part of the request path: `/api/v1/openai/<chat_id>/chat/completions`.

##### model: `string`, *Required*

The model used to generate the response. You may also use the legacy placeholder value `"model"` to keep using the chat assistant's configured model.

##### messages: `list[object]`, *Required*

A list of historical chat messages used to generate the response. This must contain at least one message with the `user` role.

##### stream: `boolean`

Whether to receive the response as a stream. Set this to `false` explicitly if you prefer to receive the entire response in one go instead of as a stream.

#### Returns

- Success: Response [message](https://platform.openai.com/docs/api-reference/chat/create) like OpenAI
- Failure: `Exception`

#### Examples

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

When `extra_body.reference` is `true`, the streamed final chunk may include `choices[0].delta.reference`, and the non-stream response may include `choices[0].message.reference`.

When `extra_body.reference_metadata.include` is `true`, each reference chunk may include a `document_metadata` object in both streaming and non-streaming responses.

## DATASET MANAGEMENT

---

### Create dataset

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

Creates a dataset.

#### Parameters

##### name: `string`, *Required*

The unique name of the dataset to create. It must adhere to the following requirements:

- Maximum 128 characters.
- Case-insensitive.

##### avatar: `string`

Base64 encoding of the avatar. Defaults to `None`

##### description: `string`

A brief description of the dataset to create. Defaults to `None`.

##### embedding_model: `string | None`

The embedding model to use for the dataset. Defaults to `None`.

##### auto_metadata_config: `dict[str, Any] | None`

The automatic metadata extraction configuration for the dataset. Defaults to `None`.

##### permission

Specifies who can access the dataset to create. Available options:

- `"me"`: (Default) Only you can manage the dataset.
- `"team"`: All team members can manage the dataset.

##### chunk_method, `string`

The chunking method of the dataset to create. Available options:

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

##### parser_config: `DataSet.ParserConfig | None`

The parser configuration of the dataset. A `ParserConfig` object's attributes vary based on the selected `chunk_method`:

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

#### Returns

- Success: A `dataset` object.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.create_dataset(name="kb_1")
```

---

### Delete datasets

```python
RAGFlow.delete_datasets(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes datasets by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the datasets to delete. Defaults to `None`.

- If omitted, or set to `null` or an empty array, no datasets are deleted.
- If an array of IDs is provided, only the datasets matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all datasets owned by the current user when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
rag_object.delete_datasets(ids=["d94a8dc02c9711f0930f7fbc369eab6d","e94a8dc02c9711f0930f7fbc369eab6e"])
rag_object.delete_datasets(delete_all=True)
```

---

### List datasets

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

Lists datasets.

#### Parameters

##### page: `int`

Specifies the page on which the datasets will be displayed. Defaults to `1`.

##### page_size: `int`

The number of datasets on each page. Defaults to `30`.

##### orderby: `string`

The field by which datasets should be sorted. Available options:

- `"create_time"` (default)
- `"update_time"`

##### desc: `bool`

Indicates whether the retrieved datasets should be sorted in descending order. Defaults to `True`.

##### id: `string`

The ID of the dataset to retrieve. Defaults to `None`.

##### name: `string`

The name of the dataset to retrieve. Defaults to `None`.

##### ids: `list[str] | None`

The IDs of the datasets to retrieve. Defaults to `None`. The `id` and `ids` parameters cannot be used together.

#### Returns

- Success: A list of `DataSet` objects.
- Failure: `Exception`.

#### Examples

##### List all datasets

```python
for dataset in rag_object.list_datasets():
    print(dataset)
```

##### Retrieve a dataset by ID

```python
dataset = rag_object.list_datasets(id = "id_1")
print(dataset[0])
```

##### Retrieve datasets by IDs

```python
datasets = rag_object.list_datasets(ids=["id_1", "id_2"])
for dataset in datasets:
    print(dataset)
```

---

### Update dataset

```python
DataSet.update(update_message: dict)
```

Updates configurations for the current dataset.

#### Parameters

##### update_message: `dict[str, str|int]`, *Required*

A dictionary representing the attributes to update, with the following keys:

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

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_name")
dataset = dataset[0]
dataset.update({"embedding_model":"BAAI/bge-zh-v1.5", "chunk_method":"manual"})
```

---

## FILE MANAGEMENT WITHIN DATASET

---

### Upload documents

```python
DataSet.upload_documents(document_list: list[dict])
```

Uploads documents to the current dataset.

#### Parameters

##### document_list: `list[dict]`, *Required*

A list of dictionaries representing the documents to upload, each containing the following keys:

- `"display_name"`: `string`, *Required*
  The file name to display in the dataset.
- `"blob"`: `bytes`, *Required*
  The binary content of the file to upload.

#### Returns

- Success: A list of uploaded `Document` objects.
- Failure: `Exception`

#### Examples

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

### Update document

```python
Document.update(update_message: dict)
```

Updates configurations for the current document.

#### Parameters

##### update_message: `dict[str, Any]`, *Required*

A dictionary representing the attributes to update, with the following keys:

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

#### Returns

- Success: The updated `Document` object.
- Failure: `Exception`

#### Examples

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

### Download document

```python
Document.download() -> bytes
```

Downloads the current document.

#### Returns

The downloaded document in bytes.

#### Examples

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

### List documents

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

Lists documents in the current dataset.

#### Parameters

##### id: `string | None`

The ID of the document to retrieve. Defaults to `None`.

##### ids: `list[str] | None`

The IDs of the documents to retrieve. Defaults to `None`. The `id` and `ids` parameters cannot be used together.

##### name: `string | None`

The exact name of the document to retrieve. Defaults to `None`.

##### keywords: `string | None`

The keywords used to match document titles. Defaults to `None`.

##### page: `int`

Specifies the page on which the documents will be displayed. Defaults to `1`.

##### page_size: `int`

The maximum number of documents on each page. Defaults to `30`.

##### orderby: `string`

The field by which documents should be sorted. Available options:

- `"create_time"` (default)
- `"update_time"`

##### desc: `bool`

Indicates whether the retrieved documents should be sorted in descending order. Defaults to `True`.

##### create_time_from: `int`
Unix timestamp for filtering documents created after this time. 0 means no filter. Defaults to 0.

##### create_time_to: `int`
Unix timestamp for filtering documents created before this time. 0 means no filter. Defaults to 0.

#### Returns

- Success: A list of `Document` objects.
- Failure: `Exception`.

A `Document` object contains the following attributes:

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

#### Examples

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

### Delete documents

```python
DataSet.delete_documents(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes documents by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the documents to delete. Defaults to `None`.

- If omitted, or set to `null` or an empty array, no documents are deleted.
- If an array of IDs is provided, only the documents matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all documents in the current dataset when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="kb_1")
dataset = dataset[0]
dataset.delete_documents(ids=["id_1","id_2"])
dataset.delete_documents(delete_all=True)
```

---

### Parse documents

```python
DataSet.async_parse_documents(document_ids:list[str]) -> None
```

Parses documents in the current dataset.

#### Parameters

##### document_ids: `list[str]`, *Required*

The IDs of the documents to parse.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

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

### Parse documents (with document status)

```python
DataSet.parse_documents(document_ids: list[str]) -> list[tuple[str, str, int, int]]
```

Starts parsing documents in the current dataset and synchronously waits for the results.

This method calls `async_parse_documents()` and blocks while polling until all requested documents reach a terminal state or report complete progress. It then returns the parsing status and statistics for each document. If a keyboard interruption occurs (e.g., `Ctrl+C`), it requests cancellation for the requested documents and continues polling for their final statuses. If a status request fails or a requested document is no longer found, the method raises an exception instead of continuing to poll.

#### Parameters

##### document_ids: `list[str]`, *Required*

The IDs of the documents to parse.

#### Returns

A list of tuples with detailed parsing results:

```python
[
  (document_id: str, status: str, chunk_count: int, token_count: int),
  ...
]
```
- `status`: The final parsing state (e.g., `DONE`, `FAIL`, `CANCEL`). If a document has not reached a terminal state but reports `progress >= 1.0`, its status is returned as `DONE`.
- `chunk_count`: The number of content chunks created from the document.
- `token_count`: The total number of tokens processed.

---

#### Example

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

### Stop parsing documents

```python
DataSet.async_cancel_parse_documents(document_ids:list[str])-> None
```

Stops parsing specified documents.

#### Parameters

##### document_ids: `list[str]`, *Required*

The IDs of the documents for which parsing should be stopped.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

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
