# Python API 参考（第 2 部分）

## 数据集内分块管理

---

### 添加分块

```python
Document.add_chunk(content:str, important_keywords:list[str] = [], questions:list[str] = [], image_base64:str = None, *, tag_kwd:list[str] = []) -> Chunk
```

向当前文档添加一个分块。

#### 参数

##### content：`string`，*必填*

分块的文本内容。

##### important_keywords：`list[str]`

要为分块标记的关键词或短语。

##### questions：`list[str]`

嵌入该分块时要使用的可选问题。

##### image_base64：`string`

要与分块关联的 Base64 编码图像。若分块已有图像，新图像将纵向拼接在已有图像下方。

##### tag_kwd：`list[str]`

要与分块关联的标签关键词。

#### 返回

- 成功：一个 `Chunk` 对象。
- 失败：`Exception`。

`Chunk` 对象包含以下属性：

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

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(id="123")
dataset = datasets[0]
doc = dataset.list_documents(id="wdfxb5t547d")
doc = doc[0]
chunk = doc.add_chunk(content="xxxxxxx")
```

添加带图像的分块：

```python

with open("image.jpg", "rb") as f:
    img_b64 = base64.b64encode(f.read()).decode()
chunk = doc.add_chunk(content="description of image", image_base64=img_b64)
```

---

### 列出分块

```python
Document.list_chunks(keywords: str = None, page: int = 1, page_size: int = 30, id : str = None) -> list[Chunk]
```

列出当前文档中的分块。

#### 参数

##### keywords：`string`

用于匹配分块内容的关键词。默认为 `None`

##### page：`int`

指定分块显示的页码。默认为 `1`。

##### page_size：`int`

每页的最大分块数量。默认为 `30`。

##### id：`string`

待获取分块的 ID。默认：`None`

#### 返回

- 成功：一个 `Chunk` 对象列表。
- 失败：`Exception`。

#### 示例

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

### 删除分块

```python
Document.delete_chunks(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除分块。

#### 参数

##### ids：`list[str]` 或 `None`

待删除分块的 ID。默认为 `None`。

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何分块。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的分块。

##### delete_all：`bool`

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前文档中的所有分块。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

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

### 更新分块

```python
Chunk.update(update_message: dict)
```

更新当前分块的内容或配置。

#### 参数

##### update_message：`dict[str, str|list[str]|bool]` *必填*

一个表示待更新属性的字典，包含以下键：

- `"content"`：`string` 分块的文本内容。
- `"important_keywords"`：`list[str]` 要为分块标记的关键词或短语列表。
- `"questions"`：`list[str]` 与分块关联的问题列表。
- `"tag_kwd"`：`list[str]` 要与分块关联的标签关键词列表。
- `"positions"`：`list` 更新后的分块来源位置。
- `"available"`：`bool` 分块在数据集中的可用状态。取值选项：
  - `False`：不可用
  - `True`：可用（默认）
- `"image_base64"`：`string` 要与分块关联的 Base64 编码图像内容。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

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

### 检索分块

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

从指定数据集检索分块。

#### 参数

##### question：`string`

用户查询或查询关键词。默认为 `""`。提供空字符串时，API 返回空的检索结果。

##### dataset_ids：`list[str]`，*必填*

要搜索的数据集 ID。必须至少提供一个数据集 ID。

##### document_ids：`list[str]`

要搜索的文档 ID。默认为 `None`。必须确保所有选定的文档使用相同的嵌入模型，否则会出错。

##### page：`int`

分块检索结果的页码。默认为 `1`。

##### page_size：`int`

每页返回的最大分块数量。默认为 `30`。

##### similarity_threshold：`float`

最低相似度得分。默认为 `0.2`。

##### vector_similarity_weight：`float`

向量余弦相似度的权重。默认为 `0.3`。若 x 表示向量余弦相似度，则 (1 - x) 为词项相似度权重。

##### top_k：`int`

参与向量余弦计算的分块数量。默认为 `1024`。

##### rerank_id：`string`

重排序模型的 ID。默认为 `None`。

##### keyword：`bool`

指示是否启用关键词匹配：

- `True`：启用关键词匹配。
- `False`：禁用关键词匹配（默认）。

##### cross_languages：`list[string]`

要翻译成的目标语言，用于实现不同语言之间的关键词检索。

##### metadata_condition：`dict`

`meta_fields` 的过滤条件。

##### use_kg：`bool`

是否为多跳查询启用图谱辅助检索。默认为 `False`。

##### toc_enhance：`bool`

检索时是否使用提取到的目录（table of contents）信息。默认为 `False`。

#### 返回

- 成功：表示文档分块的 `Chunk` 对象列表。
- 失败：`Exception`

#### 示例

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

## 对话助手管理

---

### 创建对话助手

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

创建对话助手。

#### 参数

##### name：`string`，*必填*

对话助手的名称。

##### icon：`string`

头像的 Base64 编码。默认为 `""`。

##### dataset_ids：`list[str]`

关联数据集的 ID。默认为 `[]`。省略或为空时，SDK 会创建一个空的对话助手，稍后可以再关联数据集。

##### llm_id：`str | None`

要使用的 LLM 模型名称/ID。若为 `None`，则使用用户的默认对话模型。默认为 `None`。

##### llm_setting：`dict | None`

LLM 生成参数的配置。默认为 `None`（采用服务器端默认值）。支持的键：

- `"temperature"`：`float` 控制模型输出的随机性。值越高，创造性越强；值越低，回答越确定。默认为 `0.1`。
- `"top_p"`：`float` 设置核采样（nucleus sampling）阈值。模型只考虑概率质量位于 `top_p` 之内的 token。默认为 `0.3`。
- `"presence_penalty"`：`float` 根据 token 是否已在当前文本中出现过对其进行惩罚，提高模型谈论新话题的可能性。默认为 `0.4`。
- `"frequency_penalty"`：`float` 根据 token 在文本中已出现的频率对其进行惩罚，降低重复相同内容的可能性。默认为 `0.7`。
- `"max_token"`：`int` 回答中生成的最大 token 数量。默认为 `512`。

##### prompt_config：`dict | None`

LLM 需要遵循的指令与行为设置。默认为 `None`（采用服务器端默认值）。支持的键：

- `"system"`：`string` 定义助手人设的核心系统提示词或指令。
- `"empty_response"`：`string` 未检索到相关信息时返回的特定消息。若留空，LLM 会自行生成回答。默认为 `None`。
- `"prologue"`：`string` 展示给用户的开场问候。默认为 `"Hi! I’m your assistant. What can I do for you?"`。
- `"quote"`：`boolean` 决定助手是否在回答中包含引用或来源参考。默认为 `True`。
- `"parameters"`：`list[dict]` 系统提示词中使用的变量列表。每个条目必须包含 `"key"`（`string`）和 `"optional"`（`boolean`）状态。`knowledge` 键为检索到的上下文分块保留。默认：`[{"key": "knowledge", "optional": true}]`。

#### 返回

- 成功：一个表示对话助手的 `Chat` 对象。
- 失败：`Exception`

#### 示例

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

### 更新对话助手

```python
Chat.update(update_message: dict)
```

对当前对话助手的配置进行部分更新。

`Chat.update()` 使用 `PATCH /api/v1/chats/{chat_id}` 端点。只有指定的键会被修改，其余现有字段全部保留。

#### 参数

##### update_message：`dict`，*必填*

一个包含待更新属性的字典。支持的键包括：

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

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
datasets = rag_object.list_datasets(name="kb_1")
dataset_id = datasets[0].id
assistant = rag_object.create_chat("Miss R", dataset_ids=[dataset_id])
assistant.update({"name": "Stefan", "llm_setting": {"temperature": 0.8}, "top_n": 8})
```

---

### 删除对话助手

```python
RAGFlow.delete_chats(ids: list[str] | None = None, delete_all: bool = False)
```

按 ID 删除对话助手。

#### 参数

##### ids：`list[str]` 或 `None`

待删除对话助手的 ID。默认为 `None`。

- 若省略该参数，或设为 `null` 或空数组，则不会删除任何对话助手。
- 若提供 ID 数组，则仅删除与这些 ID 匹配的对话助手。

##### delete_all：`bool`

当 `ids` 被省略，或设为 `None` 或空列表时，是否删除当前用户拥有的所有对话助手。默认为 `False`。

#### 返回

- 成功：无返回值。
- 失败：`Exception`

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
rag_object.delete_chats(ids=["id_1","id_2"])
rag_object.delete_chats(delete_all=True)
```

---

### 列出对话助手

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

列出对话助手。

#### 参数

##### page：`int`

指定对话助手显示的页码。默认为 `1`。

##### page_size：`int`

每页的对话助手数量。默认为 `30`。

##### orderby：`string`

结果排序所依据的属性。可用选项：

- `"create_time"`（默认）
- `"update_time"`

##### desc：`bool`

指示检索到的对话助手是否按降序排列。默认为 `True`。

##### id：`string | None`

精确匹配对话助手 ID。默认为 `None`。

##### name：`string | None`

按对话助手的准确名称筛选结果。默认为 `None`。

##### keywords：`string | None`

对对话助手名称执行不区分大小写的模糊搜索。默认为 `None`。

##### owner_ids：`string | list[string] | None`

按一个或多个所有者租户 ID 筛选结果。默认为 `None`。

#### 返回

- 成功：一个 `Chat` 对象列表。
- 失败：`Exception`。

#### 示例

```python
from ragflow_sdk import RAGFlow

rag_object = RAGFlow(api_key="<YOUR_API_KEY>", base_url="http://<YOUR_BASE_URL>:9380")
for assistant in rag_object.list_chats():
    print(assistant)
```

---
