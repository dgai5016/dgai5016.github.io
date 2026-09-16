<BiRow>
<template #en>

## CHUNK MANAGEMENT WITHIN DATASET

</template>
<template #zh>

## 数据集内分块管理

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

### Add chunk

</template>
<template #zh>

### 添加分块

</template>
</BiRow>

<BiRow>
<template #en>

```python
Document.add_chunk(content:str, important_keywords:list[str] = [], questions:list[str] = [], image_base64:str = None, *, tag_kwd:list[str] = []) -> Chunk
```

</template>
<template #zh>

```python
Document.add_chunk(content:str, important_keywords:list[str] = [], questions:list[str] = [], image_base64:str = None, *, tag_kwd:list[str] = []) -> Chunk
```

</template>
</BiRow>

<BiRow>
<template #en>

Adds a chunk to the current document.

</template>
<template #zh>

向当前文档添加一个分块。

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

##### content: `string`, *Required*

</template>
<template #zh>

##### content：`string`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The text content of the chunk.

</template>
<template #zh>

分块的文本内容。

</template>
</BiRow>

<BiRow>
<template #en>

##### important_keywords: `list[str]`

</template>
<template #zh>

##### important_keywords：`list[str]`

</template>
</BiRow>

<BiRow>
<template #en>

The key terms or phrases to tag with the chunk.

</template>
<template #zh>

要为分块标记的关键词或短语。

</template>
</BiRow>

<BiRow>
<template #en>

##### questions: `list[str]`

</template>
<template #zh>

##### questions：`list[str]`

</template>
</BiRow>

<BiRow>
<template #en>

Optional questions to use when embedding the chunk.

</template>
<template #zh>

嵌入该分块时要使用的可选问题。

</template>
</BiRow>

<BiRow>
<template #en>

##### image_base64: `string`

</template>
<template #zh>

##### image_base64：`string`

</template>
</BiRow>

<BiRow>
<template #en>

A base64-encoded image to associate with the chunk. If the chunk already has an image, the new image will be vertically concatenated below the existing one.

</template>
<template #zh>

要与分块关联的 Base64 编码图像。若分块已有图像，新图像将纵向拼接在已有图像下方。

</template>
</BiRow>

<BiRow>
<template #en>

##### tag_kwd: `list[str]`

</template>
<template #zh>

##### tag_kwd：`list[str]`

</template>
</BiRow>

<BiRow>
<template #en>

Tag keywords to associate with the chunk.

</template>
<template #zh>

要与分块关联的标签关键词。

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

- Success: A `Chunk` object.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `Chunk` 对象。
- 失败：`Exception`。

</template>
</BiRow>

<BiRow>
<template #en>

A `Chunk` object contains the following attributes:

</template>
<template #zh>

`Chunk` 对象包含以下属性：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

- `id`：`string` 分块 ID。
- `content`：`string` 分块的文本内容。
- `important_keywords`：`list[str]` 要为分块标记的关键词或短语列表。
- `tag_kwd`：`list[str]` 与分块关联的标签关键词列表。
- `questions`：`list[str]` 与分块关联的问题列表。
- `image_id`：`string` 与分块关联的图像 ID（无图像时为空字符串）。
- `create_time`：`string` 分块的创建时间（即被添加到文档的时间）。
- `create_timestamp`：`float` 表示分块创建时间的时间戳，以自 1970 年 1 月 1 日以来的秒数表示。
- `dataset_id`：`string` 关联数据集的 ID。
- `document_name`：`string` 关联文档的名称。
- `document_id`：`string` 关联文档的 ID。
- `available`：`bool` 分块在数据集中的可用状态。取值选项：
  - `False`：不可用
  - `True`：可用（默认）

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
datasets = rag_object.list_datasets(id="123")
dataset = datasets[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(id="123")
dataset = datasets[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
```

</template>
</BiRow>

<BiRow>
<template #en>

Adding a chunk with an image:

</template>
<template #zh>

添加带图像的分块：

</template>
</BiRow>

<BiRow>
<template #en>

```python

with open("image.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()
chunk = doc.add_chunk(content="description of image", image_base64=img_b64)
```

</template>
<template #zh>

```python

with open("image.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()
chunk = doc.add_chunk(content="description of image", image_base64=img_b64)
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

### List chunks

</template>
<template #zh>

### 列出分块

</template>
</BiRow>

<BiRow>
<template #en>

```python
Document.list_chunks(keywords: str = None, page: int = 1, page_size: int = 30, id : str = None) -> list[Chunk]
```

</template>
<template #zh>

```python
Document.list_chunks(keywords: str = None, page: int = 1, page_size: int = 30, id : str = None) -> list[Chunk]
```

</template>
</BiRow>

<BiRow>
<template #en>

Lists chunks in the current document.

</template>
<template #zh>

列出当前文档中的分块。

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

##### keywords: `string`

</template>
<template #zh>

##### keywords：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The keywords used to match chunk content. Defaults to `None`

</template>
<template #zh>

用于匹配分块内容的关键词。默认为 `None`

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

Specifies the page on which the chunks will be displayed. Defaults to `1`.

</template>
<template #zh>

指定分块显示的页码。默认为 `1`。

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

The maximum number of chunks on each page. Defaults to `30`.

</template>
<template #zh>

每页的最大分块数量。默认为 `30`。

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

The ID of the chunk to retrieve. Default: `None`

</template>
<template #zh>

待获取分块的 ID。默认：`None`

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

- Success: A list of `Chunk` objects.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `Chunk` 对象列表。
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

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets("123")
dataset = dataset[0]
docs = dataset.list_documents(keywords="test", page=1, page_size=12)
for chunk in docs[0].list_chunks(keywords="rag", page=0, page_size=12):
    print(chunk)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
dataset = rag_object.list_datasets("123")
dataset = dataset[0]
docs = dataset.list_documents(keywords="test", page=1, page_size=12)
for chunk in docs[0].list_chunks(keywords="rag", page=0, page_size=12):
    print(chunk)
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

### Delete chunks

</template>
<template #zh>

### 删除分块

</template>
</BiRow>

<BiRow>
<template #en>

```python
Document.delete_chunks(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
Document.delete_chunks(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes chunks by ID.

</template>
<template #zh>

按 ID 删除分块。

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

The IDs of the chunks to delete. Defaults to `None`.

</template>
<template #zh>

待删除分块的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `null` or an empty array, no chunks are deleted.
- If an array of IDs is provided, only the chunks matching those IDs are deleted.

</template>
<template #zh>

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何分块。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的分块。

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

Whether to delete all chunks in the current document when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前文档中的所有分块。默认为 `False`。

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
dataset = rag_object.list_datasets(id="123")
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
doc.delete_chunks(["id_1","id_2"])
doc.delete_chunks(delete_all=True)
```

</template>
<template #zh>

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

### Update chunk

</template>
<template #zh>

### 更新分块

</template>
</BiRow>

<BiRow>
<template #en>

```python
Chunk.update(update_message: dict)
```

</template>
<template #zh>

```python
Chunk.update(update_message: dict)
```

</template>
</BiRow>

<BiRow>
<template #en>

Updates content or configurations for the current chunk.

</template>
<template #zh>

更新当前分块的内容或配置。

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

##### update_message: `dict[str, str|list[str]|bool]` *Required*

</template>
<template #zh>

##### update_message：`dict[str, str|list[str]|bool]` *必填*

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

- `"content"`: `string` The text content of the chunk.
- `"important_keywords"`: `list[str]` A list of key terms or phrases to tag with the chunk.
- `"questions"`: `list[str]` A list of questions associated with the chunk.
- `"tag_kwd"`: `list[str]` A list of tag keywords to associate with the chunk.
- `"positions"`: `list` Updated source positions for the chunk.
- `"available"`: `bool` The chunk's availability status in the dataset. Value options:
  - `False`: Unavailable
  - `True`: Available (default)
- `"image_base64"`: `string` Base64-encoded image content to associate with the chunk.

</template>
<template #zh>

- `"content"`：`string` 分块的文本内容。
- `"important_keywords"`：`list[str]` 要为分块标记的关键词或短语列表。
- `"questions"`：`list[str]` 与分块关联的问题列表。
- `"tag_kwd"`：`list[str]` 要与分块关联的标签关键词列表。
- `"positions"`：`list` 更新后的分块来源位置。
- `"available"`：`bool` 分块在数据集中的可用状态。取值选项：
  - `False`：不可用
  - `True`：可用（默认）
- `"image_base64"`：`string` 要与分块关联的 Base64 编码图像内容。

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
dataset = rag_object.list_datasets(id="123")
dataset = dataset[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
chunk.update({"content":"sdfx..."})
```

</template>
<template #zh>

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

### Retrieve chunks

</template>
<template #zh>

### 检索分块

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves chunks from specified datasets.

</template>
<template #zh>

从指定数据集检索分块。

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

##### question: `string`

</template>
<template #zh>

##### question：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The user query or query keywords. Defaults to `""`. When an empty string is provided, the API returns an empty retrieval result.

</template>
<template #zh>

用户查询或查询关键词。默认为 `""`。提供空字符串时，API 返回空的检索结果。

</template>
</BiRow>

<BiRow>
<template #en>

##### dataset_ids: `list[str]`, *Required*

</template>
<template #zh>

##### dataset_ids：`list[str]`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the datasets to search. At least one dataset ID must be provided.

</template>
<template #zh>

要搜索的数据集 ID。必须至少提供一个数据集 ID。

</template>
</BiRow>

<BiRow>
<template #en>

##### document_ids: `list[str]`

</template>
<template #zh>

##### document_ids：`list[str]`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the documents to search. Defaults to `None`. You must ensure all selected documents use the same embedding model. Otherwise, an error will occur.

</template>
<template #zh>

要搜索的文档 ID。默认为 `None`。必须确保所有选定的文档使用相同的嵌入模型，否则会出错。

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

The page number of the chunk retrieval results. Defaults to `1`.

</template>
<template #zh>

分块检索结果的页码。默认为 `1`。

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

The maximum number of chunks returned on each page. Defaults to `30`.

</template>
<template #zh>

每页返回的最大分块数量。默认为 `30`。

</template>
</BiRow>

<BiRow>
<template #en>

##### similarity_threshold: `float`

</template>
<template #zh>

##### similarity_threshold：`float`

</template>
</BiRow>

<BiRow>
<template #en>

The minimum similarity score. Defaults to `0.2`.

</template>
<template #zh>

最低相似度得分。默认为 `0.2`。

</template>
</BiRow>

<BiRow>
<template #en>

##### vector_similarity_weight: `float`

</template>
<template #zh>

##### vector_similarity_weight：`float`

</template>
</BiRow>

<BiRow>
<template #en>

The weight of vector cosine similarity. Defaults to `0.3`. If x represents the vector cosine similarity, then (1 - x) is the term similarity weight.

</template>
<template #zh>

向量余弦相似度的权重。默认为 `0.3`。若 x 表示向量余弦相似度，则 (1 - x) 为词项相似度权重。

</template>
</BiRow>

<BiRow>
<template #en>

##### top_k: `int`

</template>
<template #zh>

##### top_k：`int`

</template>
</BiRow>

<BiRow>
<template #en>

The number of chunks engaged in vector cosine computation. Defaults to `1024`.

</template>
<template #zh>

参与向量余弦计算的分块数量。默认为 `1024`。

</template>
</BiRow>

<BiRow>
<template #en>

##### rerank_id: `string`

</template>
<template #zh>

##### rerank_id：`string`

</template>
</BiRow>

<BiRow>
<template #en>

The ID of the rerank model. Defaults to `None`.

</template>
<template #zh>

重排序模型的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### keyword: `bool`

</template>
<template #zh>

##### keyword：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Indicates whether to enable keyword-based matching:

</template>
<template #zh>

指示是否启用关键词匹配：

</template>
</BiRow>

<BiRow>
<template #en>

- `True`: Enable keyword-based matching.
- `False`: Disable keyword-based matching (default).

</template>
<template #zh>

- `True`：启用关键词匹配。
- `False`：禁用关键词匹配（默认）。

</template>
</BiRow>

<BiRow>
<template #en>

##### cross_languages:  `list[string]`

</template>
<template #zh>

##### cross_languages：`list[string]`

</template>
</BiRow>

<BiRow>
<template #en>

The languages that should be translated into, in order to achieve keywords retrievals in different languages.

</template>
<template #zh>

要翻译成的目标语言，用于实现不同语言之间的关键词检索。

</template>
</BiRow>

<BiRow>
<template #en>

##### metadata_condition: `dict`

</template>
<template #zh>

##### metadata_condition：`dict`

</template>
</BiRow>

<BiRow>
<template #en>

filter condition for `meta_fields`.

</template>
<template #zh>

`meta_fields` 的过滤条件。

</template>
</BiRow>

<BiRow>
<template #en>

##### use_kg: `bool`

</template>
<template #zh>

##### use_kg：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to enable graph-assisted retrieval for multi-hop queries. Defaults to `False`.

</template>
<template #zh>

是否为多跳查询启用图谱辅助检索。默认为 `False`。

</template>
</BiRow>

<BiRow>
<template #en>

##### toc_enhance: `bool`

</template>
<template #zh>

##### toc_enhance：`bool`

</template>
</BiRow>

<BiRow>
<template #en>

Whether to use extracted table-of-contents information during retrieval. Defaults to `False`.

</template>
<template #zh>

检索时是否使用提取到的目录（table of contents）信息。默认为 `False`。

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

- Success: A list of `Chunk` objects representing the document chunks.
- Failure: `Exception`

</template>
<template #zh>

- 成功：表示文档分块的 `Chunk` 对象列表。
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

</template>
<template #zh>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Creates a chat assistant.

</template>
<template #zh>

创建对话助手。

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

The name of the chat assistant.

</template>
<template #zh>

对话助手的名称。

</template>
</BiRow>

<BiRow>
<template #en>

##### icon: `string`

</template>
<template #zh>

##### icon：`string`

</template>
</BiRow>

<BiRow>
<template #en>

Base64 encoding of the avatar. Defaults to `""`.

</template>
<template #zh>

头像的 Base64 编码。默认为 `""`。

</template>
</BiRow>

<BiRow>
<template #en>

##### dataset_ids: `list[str]`

</template>
<template #zh>

##### dataset_ids：`list[str]`

</template>
</BiRow>

<BiRow>
<template #en>

The IDs of the associated datasets. Defaults to `[]`. When omitted or empty, the SDK creates an empty chat assistant, and you can attach datasets later.

</template>
<template #zh>

关联数据集的 ID。默认为 `[]`。省略或为空时，SDK 会创建一个空的对话助手，稍后可以再关联数据集。

</template>
</BiRow>

<BiRow>
<template #en>

##### llm_id: `str | None`

</template>
<template #zh>

##### llm_id：`str | None`

</template>
</BiRow>

<BiRow>
<template #en>

The LLM model name/ID to use. If `None`, the user’s default chat model is used. Defaults to `None`.

</template>
<template #zh>

要使用的 LLM 模型名称/ID。若为 `None`，则使用用户的默认对话模型。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### llm_setting: `dict | None`

</template>
<template #zh>

##### llm_setting：`dict | None`

</template>
</BiRow>

<BiRow>
<template #en>

Configuration for LLM generation parameters. Defaults to `None` (server-side defaults apply). Supported keys:

</template>
<template #zh>

LLM 生成参数的配置。默认为 `None`（采用服务器端默认值）。支持的键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"temperature"`: `float` Controls the randomness of the model's output. Higher values increase creativity, while lower values make responses more deterministic. Defaults to `0.1`.
- `"top_p"`: `float` Sets the nucleus sampling threshold. The model considers only the results of the tokens with `top_p` probability mass. Defaults to `0.3`.
- `"presence_penalty"`: `float` Penalizes tokens based on whether they have appeared in the text so far, increasing the likelihood of the model talking about new topics. Defaults to `0.4`.
- `"frequency_penalty"`: `float` Penalizes tokens based on their existing frequency in the text, decreasing the likelihood of repeating the same lines. Defaults to `0.7`.
- `"max_token"`: `int` The maximum number of tokens to generate in the response. Defaults to `512`.

</template>
<template #zh>

- `"temperature"`：`float` 控制模型输出的随机性。值越高，创造性越强；值越低，回答越确定。默认为 `0.1`。
- `"top_p"`：`float` 设置核采样（nucleus sampling）阈值。模型只考虑概率质量位于 `top_p` 之内的 token。默认为 `0.3`。
- `"presence_penalty"`：`float` 根据 token 是否已在当前文本中出现过对其进行惩罚，提高模型谈论新话题的可能性。默认为 `0.4`。
- `"frequency_penalty"`：`float` 根据 token 在文本中已出现的频率对其进行惩罚，降低重复相同内容的可能性。默认为 `0.7`。
- `"max_token"`：`int` 回答中生成的最大 token 数量。默认为 `512`。

</template>
</BiRow>

<BiRow>
<template #en>

##### prompt_config: `dict | None`

</template>
<template #zh>

##### prompt_config：`dict | None`

</template>
</BiRow>

<BiRow>
<template #en>

Instructions and behavioral settings for the LLM. Defaults to `None` (server-side defaults apply). Supported keys:

</template>
<template #zh>

LLM 需要遵循的指令与行为设置。默认为 `None`（采用服务器端默认值）。支持的键：

</template>
</BiRow>

<BiRow>
<template #en>

- `"system"`: `string` The core system prompt or instructions defining the assistant's persona.
- `"empty_response"`: `string` The specific message returned when no relevant information is retrieved. If left blank, the LLM will generate its own response. Defaults to `None`.
- `"prologue"`: `string` The initial greeting displayed to the user. Defaults to `"Hi! I’m your assistant. What can I do for you?"`.
- `"quote"`: `boolean` Determines whether the assistant should include citations or source references in its responses. Defaults to `True`.
- `"parameters"`: `list[dict]` A list of variables utilized within the system prompt. Each entry must include a `"key"` (`string`) and an `"optional"` (`boolean`) status. The `knowledge` key is reserved for retrieved context chunks. Default: `[{"key": "knowledge", "optional": true}]`.

</template>
<template #zh>

- `"system"`：`string` 定义助手人设的核心系统提示词或指令。
- `"empty_response"`：`string` 未检索到相关信息时返回的特定消息。若留空，LLM 会自行生成回答。默认为 `None`。
- `"prologue"`：`string` 展示给用户的开场问候。默认为 `"Hi! I’m your assistant. What can I do for you?"`。
- `"quote"`：`boolean` 决定助手是否在回答中包含引用或来源参考。默认为 `True`。
- `"parameters"`：`list[dict]` 系统提示词中使用的变量列表。每个条目必须包含 `"key"`（`string`）和 `"optional"`（`boolean`）状态。`knowledge` 键为检索到的上下文分块保留。默认：`[{"key": "knowledge", "optional": true}]`。

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

- Success: A `Chat` object representing the chat assistant.
- Failure: `Exception`

</template>
<template #zh>

- 成功：一个表示对话助手的 `Chat` 对象。
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
datasets = rag_object.list_datasets(name="kb_1")
dataset_ids = []
for dataset in datasets:
    dataset_ids.append(dataset.id)
assistant = rag_object.create_chat("Miss R", dataset_ids=dataset_ids)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(name="kb_1")
dataset_ids = []
for dataset in datasets:
    dataset_ids.append(dataset.id)
assistant = rag_object.create_chat("Miss R", dataset_ids=dataset_ids)
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

```python
Chat.update(update_message: dict)
```

</template>
<template #zh>

```python
Chat.update(update_message: dict)
```

</template>
</BiRow>

<BiRow>
<template #en>

Performs a partial update to the configuration settings for the current chat assistant.

</template>
<template #zh>

对当前对话助手的配置进行部分更新。

</template>
</BiRow>

<BiRow>
<template #en>

`Chat.update()` utilizes the `PATCH /api/v1/chats/{chat_id}` endpoint. Only the specified keys are modified, while all other existing fields are preserved.

</template>
<template #zh>

`Chat.update()` 使用 `PATCH /api/v1/chats/{chat_id}` 端点。只有指定的键会被修改，其余现有字段全部保留。

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

##### update_message: `dict`, *Required*

</template>
<template #zh>

##### update_message：`dict`，*必填*

</template>
</BiRow>

<BiRow>
<template #en>

A dictionary containing the attributes to be updated. Supported keys include:

</template>
<template #zh>

一个包含待更新属性的字典。支持的键包括：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

- `"name"`：`string` 对话助手更新后的名称。
- `"icon"`：`string` 表示助手头像的 Base64 编码字符串。
- `"dataset_ids"`：`list[string]` 与助手关联的数据集唯一标识符列表。
- `"llm_id"`：`string` 所用 LLM 的唯一标识符或名称。
- `"llm_setting"`：`dict` LLM 生成参数的配置：
  - `"temperature"`：`float` 控制模型输出的随机性。
  - `"top_p"`：`float` 设置核采样（nucleus sampling）阈值。
  - `"presence_penalty"`：`float` 根据 token 是否已在文本中出现过对其进行惩罚。
  - `"frequency_penalty"`：`float` 根据 token 在文本中已出现的频率对其进行惩罚。
  - `"max_token"`：`int` 回答中生成的最大 token 数量。
- `"prompt_config"`：`dict` LLM 需要遵循的指令与行为设置：
  - `"system"`：`string` 定义助手人设的核心系统提示词或指令。
  - `"empty_response"`：`string` 未检索到相关信息时返回的消息。留空则允许 LLM 即兴发挥。
  - `"prologue"`：`string` 展示给用户的开场问候。
  - `"quote"`：`boolean` 决定助手是否在回答中包含引用或来源参考。
  - `"parameters"`：`list[dict]` 系统提示词中使用的变量（如保留的 `knowledge` 键）。
- `"similarity_threshold"`：`float` 检索到的上下文分块所需的最低相似度得分。默认为 `0.2`。
- `"vector_similarity_weight"`：`float` 混合搜索得分中分配给向量余弦相似度的权重。默认为 `0.3`。
- `"top_n"`：`int` 作为上下文提供给 LLM 的排名靠前的分块数量。默认为 `6`。
- `"top_k"`：`int` 为重排序而检索出的初始候选池大小。默认为 `1024`。
- `"rerank_id"`：`string` 重排序模型的唯一标识符。若留空，则使用标准向量余弦相似度进行排序。

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
datasets = rag_object.list_datasets(name="kb_1")
dataset_id = datasets[0].id
assistant = rag_object.create_chat("Miss R", dataset_ids=[dataset_id])
assistant.update({"name": "Stefan", "llm_setting": {"temperature": 0.8}, "top_n": 8})
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(name="kb_1")
dataset_id = datasets[0].id
assistant = rag_object.create_chat("Miss R", dataset_ids=[dataset_id])
assistant.update({"name": "Stefan", "llm_setting": {"temperature": 0.8}, "top_n": 8})
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

### 删除对话助手

</template>
</BiRow>

<BiRow>
<template #en>

```python
RAGFlow.delete_chats(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
<template #zh>

```python
RAGFlow.delete_chats(ids: list[str] | None = None, delete_all: bool = False)
```

</template>
</BiRow>

<BiRow>
<template #en>

Deletes chat assistants by ID.

</template>
<template #zh>

按 ID 删除对话助手。

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

The IDs of the chat assistants to delete. Defaults to `None`.

</template>
<template #zh>

待删除对话助手的 ID。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

- If omitted, or set to `null` or an empty array, no chat assistants are deleted.
- If an array of IDs is provided, only the chat assistants matching those IDs are deleted.

</template>
<template #zh>

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何对话助手。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的对话助手。

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

Whether to delete all chat assistants owned by the current user when `ids` is omitted, or set to `None` or an empty list. Defaults to `False`.

</template>
<template #zh>

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前用户拥有的所有对话助手。默认为 `False`。

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
rag_object.delete_chats(ids=["id_1","id_2"])
rag_object.delete_chats(delete_all=True)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_chats(ids=["id_1","id_2"])
rag_object.delete_chats(delete_all=True)
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

</template>
<template #zh>

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

Specifies the page on which the chat assistants will be displayed. Defaults to `1`.

</template>
<template #zh>

指定对话助手显示的页码。默认为 `1`。

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

The number of chat assistants on each page. Defaults to `30`.

</template>
<template #zh>

每页的对话助手数量。默认为 `30`。

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

The attribute by which the results are sorted. Available options:

</template>
<template #zh>

结果排序所依据的属性。可用选项：

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

Indicates whether the retrieved chat assistants should be sorted in descending order. Defaults to `True`.

</template>
<template #zh>

指示检索到的对话助手是否按降序排列。默认为 `True`。

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

Exact match on chat assistant ID. Defaults to `None`.

</template>
<template #zh>

精确匹配对话助手 ID。默认为 `None`。

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

Filters results by the exact name of the chat assistant. Defaults to `None`.

</template>
<template #zh>

按对话助手的准确名称筛选结果。默认为 `None`。

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

Performs a case-insensitive fuzzy search against chat assistant names. Defaults to `None`.

</template>
<template #zh>

对对话助手名称执行不区分大小写的模糊搜索。默认为 `None`。

</template>
</BiRow>

<BiRow>
<template #en>

##### owner_ids: `string | list[string] | None`

</template>
<template #zh>

##### owner_ids：`string | list[string] | None`

</template>
</BiRow>

<BiRow>
<template #en>

Filters results by one or more owner tenant IDs. Defaults to `None`.

</template>
<template #zh>

按一个或多个所有者租户 ID 筛选结果。默认为 `None`。

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

- Success: A list of `Chat` objects.
- Failure: `Exception`.

</template>
<template #zh>

- 成功：一个 `Chat` 对象列表。
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

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for assistant in rag_object.list_chats():
    print(assistant)
```

</template>
<template #zh>

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for assistant in rag_object.list_chats():
    print(assistant)
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
