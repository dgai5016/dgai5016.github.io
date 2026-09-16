# Python API Reference (Part 2)

## CHUNK MANAGEMENT WITHIN DATASET

---

### Add chunk

```python
Document.add_chunk(content:str, important_keywords:list[str] = [], questions:list[str] = [], image_base64:str = None, *, tag_kwd:list[str] = []) -> Chunk
```

Adds a chunk to the current document.

#### Parameters

##### content: `string`, *Required*

The text content of the chunk.

##### important_keywords: `list[str]`

The key terms or phrases to tag with the chunk.

##### questions: `list[str]`

Optional questions to use when embedding the chunk.

##### image_base64: `string`

A base64-encoded image to associate with the chunk. If the chunk already has an image, the new image will be vertically concatenated below the existing one.

##### tag_kwd: `list[str]`

Tag keywords to associate with the chunk.

#### Returns

- Success: A `Chunk` object.
- Failure: `Exception`.

A `Chunk` object contains the following attributes:

- `id`: `string`: The chunk ID.
- `content`: `string` The text content of the chunk.
- `important_keywords`: `list[str]` A list of key terms or phrases tagged with the chunk.
- `tag_kwd`: `list[str]` A list of tag keywords associated with the chunk.
- `questions`: `list[str]` A list of questions associated with the chunk.
- `image_id`: `string` The image ID associated with the chunk (empty string if no image).
- `create_time`: `string` The time when the chunk was created (added to the document).
- `create_timestamp`: `float` The timestamp representing the creation time of the chunk, expressed in seconds since January 1, 1970.
- `dataset_id`: `string` The ID of the associated dataset.
- `document_name`: `string` The name of the associated document.
- `document_id`: `string` The ID of the associated document.
- `available`: `bool` The chunk's availability status in the dataset. Value options:
  - `False`: Unavailable
  - `True`: Available (default)

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(id="123")
dataset = datasets[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
```

Adding a chunk with an image:

```python

with open("image.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()
chunk = doc.add_chunk(content="description of image", image_base64=img_b64)
```

---

### List chunks

```python
Document.list_chunks(keywords: str = None, page: int = 1, page_size: int = 30, id : str = None) -> list[Chunk]
```

Lists chunks in the current document.

#### Parameters

##### keywords: `string`

The keywords used to match chunk content. Defaults to `None`

##### page: `int`

Specifies the page on which the chunks will be displayed. Defaults to `1`.

##### page_size: `int`

The maximum number of chunks on each page. Defaults to `30`.

##### id: `string`

The ID of the chunk to retrieve. Default: `None`

#### Returns

- Success: A list of `Chunk` objects.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets("123")
dataset = dataset[0]
docs = dataset.list_documents(keywords="test", page=1, page_size=12)
for chunk in docs[0].list_chunks(keywords="rag", page=0, page_size=12):
    print(chunk)
```

---

### Delete chunks

```python
Document.delete_chunks(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes chunks by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the chunks to delete. Defaults to `None`.

- If omitted, or set to `null` or an empty array, no chunks are deleted.
- If an array of IDs is provided, only the chunks matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all chunks in the current document when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(id="123")
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
doc.delete_chunks(["id_1","id_2"])
doc.delete_chunks(delete_all=True)
```

---

### Update chunk

```python
Chunk.update(update_message: dict)
```

Updates content or configurations for the current chunk.

#### Parameters

##### update_message: `dict[str, str|list[str]|bool]` *Required*

A dictionary representing the attributes to update, with the following keys:

- `"content"`: `string` The text content of the chunk.
- `"important_keywords"`: `list[str]` A list of key terms or phrases to tag with the chunk.
- `"questions"`: `list[str]` A list of questions associated with the chunk.
- `"tag_kwd"`: `list[str]` A list of tag keywords to associate with the chunk.
- `"positions"`: `list` Updated source positions for the chunk.
- `"available"`: `bool` The chunk's availability status in the dataset. Value options:
  - `False`: Unavailable
  - `True`: Available (default)
- `"image_base64"`: `string` Base64-encoded image content to associate with the chunk.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(id="123")
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
chunk.update({"content":"sdfx..."})
```

---

### Retrieve chunks

```python
RAGFlow.retrieve(
  dataset_ids,
  document_ids=None,
  question='',
  page=1,
  page_size=30,
  similarity_threshold=0.2,
  vector_similarity_weight=0.3,
  top_k=1024,
  rerank_id: str | None = None,
  keyword: bool = False,
  cross_languages: list[str] | None = None,
  metadata_condition: dict | None = None,
  use_kg: bool = False,
  toc_enhance: bool = False)
```

Retrieves chunks from specified datasets.

#### Parameters

##### question: `string`

The user query or query keywords. Defaults to `""`. When an empty string is provided, the API returns an empty retrieval result.

##### dataset_ids: `list[str]`, *Required*

The IDs of the datasets to search. At least one dataset ID must be provided.

##### document_ids: `list[str]`

The IDs of the documents to search. Defaults to `None`. You must ensure all selected documents use the same embedding model. Otherwise, an error will occur.

##### page: `int`

The page number of the chunk retrieval results. Defaults to `1`.

##### page_size: `int`

The maximum number of chunks returned on each page. Defaults to `30`.

##### similarity_threshold: `float`

The minimum similarity score. Defaults to `0.2`.

##### vector_similarity_weight: `float`

The weight of vector cosine similarity. Defaults to `0.3`. If x represents the vector cosine similarity, then (1 - x) is the term similarity weight.

##### top_k: `int`

The number of chunks engaged in vector cosine computation. Defaults to `1024`.

##### rerank_id: `string`

The ID of the rerank model. Defaults to `None`.

##### keyword: `bool`

Indicates whether to enable keyword-based matching:

- `True`: Enable keyword-based matching.
- `False`: Disable keyword-based matching (default).

##### cross_languages:  `list[string]`

The languages that should be translated into, in order to achieve keywords retrievals in different languages.

##### metadata_condition: `dict`

filter condition for `meta_fields`.

##### use_kg: `bool`

Whether to enable graph-assisted retrieval for multi-hop queries. Defaults to `False`.

##### toc_enhance: `bool`

Whether to use extracted table-of-contents information during retrieval. Defaults to `False`.

#### Returns

- Success: A list of `Chunk` objects representing the document chunks.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets(name="ragflow")
dataset = dataset[0]
name = 'ragflow_test.txt'
path = './test_data/ragflow_test.txt'
documents =[{"display_name":"test_retrieve_chunks.txt","blob":open(path, "rb").read()}]
docs = dataset.upload_documents(documents)
doc = docs[0]
doc.add_chunk(content="This is a chunk addition test")
for c in rag_object.retrieve(dataset_ids=[dataset.id],document_ids=[doc.id]):
  print(c)
```

---

## CHAT ASSISTANT MANAGEMENT

---

### Create chat assistant

```python
RAGFlow.create_chat(
    name: str,
    icon: str = "",
    dataset_ids: list[str] | None = None,
    llm_id: str | None = None,
    llm_setting: dict | None = None,
    prompt_config: dict | None = None,
    **kwargs
) -> Chat
```

Creates a chat assistant.

#### Parameters

##### name: `string`, *Required*

The name of the chat assistant.

##### icon: `string`

Base64 encoding of the avatar. Defaults to `""`.

##### dataset_ids: `list[str]`

The IDs of the associated datasets. Defaults to `[]`. When omitted or empty, the SDK creates an empty chat assistant, and you can attach datasets later.

##### llm_id: `str | None`

The LLM model name/ID to use. If `None`, the user’s default chat model is used. Defaults to `None`.

##### llm_setting: `dict | None`

Configuration for LLM generation parameters. Defaults to `None` (server-side defaults apply). Supported keys:

- `"temperature"`: `float` Controls the randomness of the model's output. Higher values increase creativity, while lower values make responses more deterministic. Defaults to `0.1`.
- `"top_p"`: `float` Sets the nucleus sampling threshold. The model considers only the results of the tokens with `top_p` probability mass. Defaults to `0.3`.
- `"presence_penalty"`: `float` Penalizes tokens based on whether they have appeared in the text so far, increasing the likelihood of the model talking about new topics. Defaults to `0.4`.
- `"frequency_penalty"`: `float` Penalizes tokens based on their existing frequency in the text, decreasing the likelihood of repeating the same lines. Defaults to `0.7`.
- `"max_token"`: `int` The maximum number of tokens to generate in the response. Defaults to `512`.

##### prompt_config: `dict | None`

Instructions and behavioral settings for the LLM. Defaults to `None` (server-side defaults apply). Supported keys:

- `"system"`: `string` The core system prompt or instructions defining the assistant's persona.
- `"empty_response"`: `string` The specific message returned when no relevant information is retrieved. If left blank, the LLM will generate its own response. Defaults to `None`.
- `"prologue"`: `string` The initial greeting displayed to the user. Defaults to `"Hi! I’m your assistant. What can I do for you?"`.
- `"quote"`: `boolean` Determines whether the assistant should include citations or source references in its responses. Defaults to `True`.
- `"parameters"`: `list[dict]` A list of variables utilized within the system prompt. Each entry must include a `"key"` (`string`) and an `"optional"` (`boolean`) status. The `knowledge` key is reserved for retrieved context chunks. Default: `[{"key": "knowledge", "optional": true}]`.

#### Returns

- Success: A `Chat` object representing the chat assistant.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(name="kb_1")
dataset_ids = []
for dataset in datasets:
    dataset_ids.append(dataset.id)
assistant = rag_object.create_chat("Miss R", dataset_ids=dataset_ids)
```

---

### Update chat assistant

```python
Chat.update(update_message: dict)
```

Performs a partial update to the configuration settings for the current chat assistant.

`Chat.update()` utilizes the `PATCH /api/v1/chats/{chat_id}` endpoint. Only the specified keys are modified, while all other existing fields are preserved.

#### Parameters

##### update_message: `dict`, *Required*

A dictionary containing the attributes to be updated. Supported keys include:

- `"name"`: `string` The updated name of the chat assistant.
- `"icon"`: `string` A Base64-encoded string representing the assistant's avatar.
- `"dataset_ids"`: `list[string]` A list of unique identifiers for the datasets associated with the assistant.
- `"llm_id"`: `string` The unique identifier or name of the LLM to be used.
- `"llm_setting"`: `dict` Configuration for LLM generation parameters:
  - `"temperature"`: `float` Controls the randomness of the model's output.
  - `"top_p"`: `float` Sets the nucleus sampling threshold.
  - `"presence_penalty"`: `float` Penalizes tokens based on whether they have already appeared in the text.
  - `"frequency_penalty"`: `float` Penalizes tokens based on their existing frequency in the text.
  - `"max_token"`: `int` The maximum number of tokens to generate in the response.
- `"prompt_config"`: `dict` Instructions and behavioral settings for the LLM:
  - `"system"`: `string` The core system prompt or instructions defining the assistant's persona.
  - `"empty_response"`: `string` The message returned when no relevant information is retrieved. Leave blank to allow the LLM to improvise.
  - `"prologue"`: `string` The initial greeting displayed to the user.
  - `"quote"`: `boolean` Determines whether the assistant should include citations or source references.
  - `"parameters"`: `list[dict]` Variables used within the system prompt (e.g., the reserved `knowledge` key).
- `"similarity_threshold"`: `float` The minimum similarity score required for retrieved context chunks. Defaults to `0.2`.
- `"vector_similarity_weight"`: `float` The weight assigned to vector cosine similarity within the hybrid search score. Defaults to `0.3`.
- `"top_n"`: `int` The number of top-ranked chunks provided to the LLM as context. Defaults to `6`.
- `"top_k"`: `int` The size of the initial candidate pool retrieved for reranking. Defaults to `1024`.
- `"rerank_id"`: `string` The unique identifier for the reranking model. If left empty, standard vector cosine similarity is used for ranking.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(name="kb_1")
dataset_id = datasets[0].id
assistant = rag_object.create_chat("Miss R", dataset_ids=[dataset_id])
assistant.update({"name": "Stefan", "llm_setting": {"temperature": 0.8}, "top_n": 8})
```

---

### Delete chat assistants

```python
RAGFlow.delete_chats(ids: list[str] | None = None, delete_all: bool = False)
```

Deletes chat assistants by ID.

#### Parameters

##### ids: `list[str]` or `None`

The IDs of the chat assistants to delete. Defaults to `None`.

- If omitted, or set to `null` or an empty array, no chat assistants are deleted.
- If an array of IDs is provided, only the chat assistants matching those IDs are deleted.

##### delete_all: `bool`

Whether to delete all chat assistants owned by the current user when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

#### Returns

- Success: No value is returned.
- Failure: `Exception`

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_chats(ids=["id_1","id_2"])
rag_object.delete_chats(delete_all=True)
```

---

### List chat assistants

```python
RAGFlow.list_chats(
    page: int = 1,
    page_size: int = 30,
    orderby: str = "create_time",
    desc: bool = True,
    id: str | None = None,
    name: str | None = None,
    keywords: str | None = None,
    owner_ids: str | list[str] | None = None,
) -> list[Chat]
```

Lists chat assistants.

#### Parameters

##### page: `int`

Specifies the page on which the chat assistants will be displayed. Defaults to `1`.

##### page_size: `int`

The number of chat assistants on each page. Defaults to `30`.

##### orderby: `string`

The attribute by which the results are sorted. Available options:

- `"create_time"` (default)
- `"update_time"`

##### desc: `bool`

Indicates whether the retrieved chat assistants should be sorted in descending order. Defaults to `True`.

##### id: `string | None`

Exact match on chat assistant ID. Defaults to `None`.

##### name: `string | None`

Filters results by the exact name of the chat assistant. Defaults to `None`.

##### keywords: `string | None`

Performs a case-insensitive fuzzy search against chat assistant names. Defaults to `None`.

##### owner_ids: `string | list[string] | None`

Filters results by one or more owner tenant IDs. Defaults to `None`.

#### Returns

- Success: A list of `Chat` objects.
- Failure: `Exception`.

#### Examples

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for assistant in rag_object.list_chats():
    print(assistant)
```

---
