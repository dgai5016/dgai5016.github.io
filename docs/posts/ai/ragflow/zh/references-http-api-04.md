# HTTP API 参考（第 4 部分）

## 数据集内的分块管理

---

### 新增分块

**POST** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

向指定数据集内的指定文档添加分块。

#### 请求

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"content"`：`string`
  - `"important_keywords"`：`list[string]`
  - `"tag_kwd"`：`list[string]`
  - `"questions"`：`list[string]`
  - `"image_base64"`：`string`
  - `"user_id"`：`string`（可选）

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "content": "<CHUNK_CONTENT_HERE>",
          "image_base64": "<BASE64_ENCODED_IMAGE>"
     }'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `"content"`：（*请求体参数*），`string`，*必填*
  分块的文本内容。
- `"important_keywords"`：（*请求体参数*），`list[string]`
  要随分块一起标记的关键词或短语。
- `"tag_kwd"`：（*请求体参数*），`list[string]`
  与分块关联的标签关键词。
- `"questions"`：（*请求体参数*），`list[string]`
  嵌入分块时使用的可选问题。
- `"image_base64"`：（*请求体参数*），`string`
  与分块关联的 base64 编码图片。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，将作为 OpenAI `user` 字段随该分块的嵌入请求转发。未设置时省略。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "chunk": {
            "content": "who are you",
            "create_time": "2024-12-30 16:59:55",
            "create_timestamp": 1735549195.969164,
            "dataset_id": "72f36e1ebdf411efb7250242ac120006",
            "document_id": "61d68474be0111ef98dd0242ac120006",
            "id": "12ccdc56e59837e5",
            "image_id": "",
            "important_keywords": [],
            "tag_kwd": [],
            "questions": []
        }
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "`content` is required"
}
```

---

### 列出分块

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`

列出指定文档中的分块。

#### 请求

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `keywords`：（*过滤参数*），`string`
  用于匹配分块内容的关键词。
- `page`：（*过滤参数*），`integer`
  指定显示分块的页码。默认为 `1`。
- `page_size`：（*过滤参数*），`integer`
  每页分块的最大数量。默认为 `30`。
- `id`：（*过滤参数*），`string`
  要获取的分块 ID。也可以使用 `GET /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` 获取单个分块。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "chunks": [
            {
                "available": true,
                "content": "This is a test content.",
                "docnm_kwd": "1.txt",
                "document_id": "b330ec2e91ec11efbc510242ac120004",
                "id": "b48c170e90f70af998485c1065490726",
                "image_id": "",
                "important_keywords": [],
                "tag_kwd": [],
                "positions": []
            }
        ],
        "doc": {
            "chunk_count": 1,
            "chunk_method": "naive",
            "create_date": "Thu, 24 Oct 2024 09:45:27 GMT",
            "create_time": 1729763127646,
            "created_by": "69736c5e723611efb51b0242ac120007",
            "dataset_id": "527fa74891e811ef9c650242ac120006",
            "id": "b330ec2e91ec11efbc510242ac120004",
            "location": "1.txt",
            "name": "1.txt",
            "parser_config": {
                "chunk_token_num": 128,
                "delimiter": "\\n",
                "html4excel": false,
                "layout_recognize": "DeepDOC"
            },
            "process_begin_at": "Thu, 24 Oct 2024 09:56:44 GMT",
            "process_duration": 0.54213,
            "progress": 0.0,
            "progress_msg": "Task dispatched...",
            "run": "2",
            "size": 17966,
            "source_type": "local",
            "status": "1",
            "thumbnail": "",
            "token_count": 8,
            "type": "doc",
            "update_date": "Thu, 24 Oct 2024 11:03:15 GMT",
            "update_time": 1729767795721
        },
        "total": 1
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "you don't own the document 5c5999ec7be811ef9cab0242ac12000e5"
}
```

---

### 获取分块

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

获取指定文档中的指定分块。不返回向量、token 等运行时字段。

#### 请求

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `chunk_id`：（*路径参数*）
  要获取的分块 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "available_int": 1,
        "content_with_weight": "This is a test content.",
        "doc_id": "b330ec2e91ec11efbc510242ac120004",
        "docnm_kwd": "1.txt",
        "id": "b48c170e90f70af998485c1065490726",
        "img_id": "",
        "important_kwd": [],
        "question_kwd": [],
        "tag_kwd": []
    }
}
```

失败：

```json
{
    "code": 100,
    "message": "Chunk not found"
}
```

---

### 删除分块

**DELETE** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

按 ID 删除分块。

#### 请求

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"chunk_ids"`：`list[string]`
  - `"delete_all"`：`boolean`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "chunk_ids": ["test_1", "test_2"]
     }'
```

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `"chunk_ids"`：（*请求体参数*），`list[string]`
  要删除的分块 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何分块。
  - 若提供 ID 数组，则仅删除与这些 ID 匹配的分块。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"chunk_ids"` 被省略、设为 `null` 或为空数组时，是否删除指定文档的全部分块。默认为 `false`。

#### 响应

成功：

```json
{
    "code": 0
}
```

失败：

```json
{
    "code": 102,
    "message": "rm_chunk deleted chunks 0, expect 1"
}
```

---

### 更新分块

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

更新指定分块的内容或配置。

:::warning 已弃用
`PUT /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` 已弃用。请改用此端点。
:::

#### 请求

- 方法：PATCH
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"content"`：`string`
  - `"important_keywords"`：`list[string]`
  - `"questions"`：`list[string]`
  - `"positions"`：`list`
  - `"tag_kwd"`：`list[string]`
  - `"available"`：`boolean`
  - `"image_base64"`：`string`
  - `"user_id"`：`string`（可选）

##### 请求示例

```bash
curl --request PATCH \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "content": "ragflow123",
          "important_keywords": []
     }'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `chunk_id`：（*路径参数*）
  要更新的分块 ID。
- `"content"`：（*请求体参数*），`string`
  分块的文本内容。
- `"important_keywords"`：（*请求体参数*），`list[string]`
  要随分块一起标记的关键词或短语列表。
- `"questions"`：（*请求体参数*），`list[string]`
  嵌入分块时使用的可选问题。
- `"positions"`：（*请求体参数*），`list`
  更新后的分块来源位置。
- `"tag_kwd"`：（*请求体参数*），`list[string]`
  更新后的标签关键词。
- `"available"`：（*请求体参数*）`boolean`
  分块在数据集中的可用状态。可选值：
  - `true`：可用（默认）
  - `false`：不可用
- `"image_base64"`：（*请求体参数*），`string`
  与分块关联的 base64 编码图片内容。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，将作为 OpenAI `user` 字段随本次更新的嵌入请求转发。未设置时省略。

#### 响应

成功：

```json
{
    "code": 0
}
```

失败：

```json
{
    "code": 102,
    "message": "Can't find this chunk 29a2d9987e16ba331fb4d7d30d99b71d2"
}
```

---

### 更新分块可用性

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

更新或切换指定分块的可用状态，控制这些分块是否可被检索。

#### 请求

- 方法：PATCH
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"chunk_ids"`：`list[string]`（*必填*）
  - `"available_int"`：`integer`（*可选*）
  - `"available"`：`boolean`（*可选*）

##### 请求示例

```bash
curl --request PATCH \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "chunk_ids": ["chunk_id_1", "chunk_id_2"],
          "available_int": 1
     }'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  数据集 ID。
- `document_id`：（*路径参数*）
  文档 ID。
- `"chunk_ids"`：（*请求体参数*），`list[string]`（*必填*）
  要更新可用状态的分块 ID。
- `"available_int"`：（*请求体参数*），`integer`（*可选*）
  指定分块的可用状态。必须提供 `"available_int"` 或 `"available"` 之一。若两者都提供，则使用 `"available_int"`。
  - `1`：可用，
  - `0`：不可用。
- `"available"`：（*请求体参数*），`boolean`（*可选*）
  指定分块的可用状态。在未提供 `"available_int"` 时使用。
  - `true`：可用，
  - `false`：不可用。

#### 响应

成功：

```json
{
    "code": 0,
    "data": true
}
```

失败：

```json
{
    "code": 102,
    "message": "You don't own the dataset {dataset_id}."
}
```

```json
{
    "code": 102,
    "message": "`chunk_ids` is required."
}
```

```json
{
    "code": 102,
    "message": "`available_int` or `available` is required."
}
```

```json
{
    "code": 102,
    "message": "document not found"
}
```

```json
{
    "code": 102,
    "message": "Index updating failure"
}
```

---

### 从数据集获取元数据摘要

**GET** `/api/v1/datasets/{dataset_id}/metadata/summary`

聚合数据集内所有文档的元数据值。

#### 请求

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/metadata/summary`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 响应

成功：

```json
{
  "code": 0,
  "data": {
    "summary": {
      "tags": {
        "type": "string",
        "values": [["bar", 2], ["foo", 1], ["baz", 1]]
      },
      "author": {
        "type": "string",
        "values": [["alice", 2], ["bob", 1]]
      }
    }
  }
}
```

---

### 更新或删除元数据

**POST** `/api/v1/datasets/{dataset_id}/metadata/update`

批量更新或删除指定数据集内的文档级元数据。若 `document_ids` 和 `metadata_condition` 均未提供，则选中该数据集内的所有文档；若两者都提供，则取交集。

#### 请求

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/metadata/update`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `selector`：`object`
  - `updates`：`list[object]`
  - `deletes`：`list[object]`

#### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `"selector"`：（*请求体参数*），`object`，*可选*
  文档选择器：
  - `"document_ids"`：`list[string]` *可选*
    关联的文档 ID。
  - `"metadata_condition"`：`object`，*可选*
    - `"logic"`：定义所提供的多个条件之间的逻辑关系。选项：
      - `"and"`（默认）
      - `"or"`
    - `"conditions"`：`list[object]` *可选*
      每个对象为：`{ "name": string, "comparison_operator": string, "value": string }`
      - `"name"`：`string` 检索所依据的键名。
      - `"comparison_operator"`：`string` 可用选项：
        - `"is"`
        - `"not is"`
        - `"contains"`
        - `"not contains"`
        - `"in"`
        - `"not in"`
        - `"start with"`
        - `"end with"`
        - `">"`
        - `"<"`
        - `"≥"`
        - `"≤"`
        - `"empty"`
        - `"not empty"`
      - `"value"`：`string` 检索所依据的键值。
- `"updates"`：（*请求体参数*），`list[object]`，*可选*
  替换所检索文档的元数据。每个对象为：`{ "key": string, "match": string, "value": string }`。
  - `"key"`：`string` 要更新的键名。
  - `"match"`：`string` *可选* 要更新的键的当前值。省略时，相应的键无论当前值为何都会更新为 `"value"`。
  - `"value"`：`string` 为指定键设置的新值。
- `"deletes"`：（*请求体参数*），`list[object]`，*可选*
  删除所检索文档的元数据。每个对象为：`{ "key": string, "value": string }`。
  - `"key"`：`string` 要删除的键名。
  - `"value"`：`string` *可选* 要删除的键的值。
    - 提供时，仅删除值匹配的键。
    - 省略时，删除所有指定的键。

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets/{dataset_id}/metadata/update \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
       "selector": {
         "metadata_condition": {
           "logic": "and",
           "conditions": [
             {"name": "author", "comparison_operator": "is", "value": "alice"}
           ]
         }
       },
       "updates": [
         {"key": "tags", "match": "foo", "value": "foo_new"}
       ],
       "deletes": [
         {"key": "obsolete_key"},
         {"key": "author", "value": "alice"}
       ]
     }'
```

##### 响应

成功：

```json
{
  "code": 0,
  "data": {
    "updated": 1,
    "matched_docs": 2
  }
}
```

---

### 检索分块

**POST** `/api/v1/retrieval`

从指定数据集检索分块。

#### 请求

- 方法：POST
- URL：`/api/v1/retrieval`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"question"`：`string`
  - `"dataset_ids"`：`list[string]`
  - `"document_ids"`：`list[string]`
  - `"page"`：`integer`
  - `"page_size"`：`integer`
  - `"similarity_threshold"`：`float`
  - `"vector_similarity_weight"`：`float`
  - `"top_k"`：`integer`（已弃用；请使用 `"knn_top_k"`）
  - `"knn_top_k"`：`integer`
  - `"knn_num_candidates"`：`integer`
  - `"rerank_candidates_count"`：`integer`
  - `"rerank_id"`：`string`
  - `"keyword"`：`boolean`
  - `"highlight"`：`boolean`
  - `"cross_languages"`：`list[string]`
  - `"metadata_condition"`：`object`
  - `"use_kg"`：`boolean`
  - `"toc_enhance"`：`boolean`
  - `"include_knowledge_compilation"`：`boolean`

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/retrieval \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "question": "What is advantage of ragflow?",
          "dataset_ids": ["b2a62730759d11ef987d0242ac120004"],
          "document_ids": ["77df9ef4759a11ef8bdd0242ac120004"],
          "knn_top_k": 1024,
          "knn_num_candidates": 2048,
          "rerank_candidates_count": 64,
          "include_knowledge_compilation": true,
          "metadata_condition": {
            "logic": "and",
            "conditions": [
              {
                "name": "author",
                "comparison_operator": "=",
                "value": "Toby"
              },
              {
                "name": "url",
                "comparison_operator": "not contains",
                "value": "amd"
              }
            ]
          }
     }'
```

##### 请求参数

- `"question"`：（*请求体参数*），`string`，*必填*
  用户查询或查询关键词。
- `"dataset_ids"`：（*请求体参数*），`list[string]`，*必填*
  要搜索的数据集 ID。必须至少提供一个数据集 ID。
- `"document_ids"`：（*请求体参数*），`list[string]`
  将搜索范围限定为 `"dataset_ids"` 所指定数据集内的特定文档。请确保所有选中的文档使用相同的嵌入模型。默认为空列表。
- `"page"`：（*请求体参数*），`integer`
  指定显示分块的页码。默认为 `1`。
- `"page_size"`：（*请求体参数*）
  每页分块的最大数量。默认为 `30`。
- `"similarity_threshold"`：（*请求体参数*）
  最小相似度得分。默认为 `0.2`。
- `"vector_similarity_weight"`：（*请求体参数*），`float`
  向量余弦相似度的权重。默认为 `0.3`。若 x 表示向量余弦相似度的权重，则 (1 - x) 为词项相似度权重。
- `"top_k"`：（*请求体参数*），`integer`
  **已弃用。** `"knn_top_k"` 的别名。若两个参数都提供，以 `"knn_top_k"` 为准。
- `"knn_top_k"`：（*请求体参数*），`integer`
  参与向量余弦计算的分块数量。默认为 `1024`。
- `"knn_num_candidates"`：（*请求体参数*），`integer`
  向量搜索所考虑的近似最近邻候选数量。必须大于或等于 `"knn_top_k"`。默认为 `2048` 与 `"knn_top_k"` 中的较大者。此参数目前仅适用于 Elasticsearch。
- `"rerank_candidates_count"`：（*请求体参数*），`integer`
  参与重排序的初始检索候选数量。必须至少为 `"page"` 乘以 `"page_size"`。默认为 `64`。
- `"include_knowledge_compilation"`：（*请求体参数*），`boolean`
  结果中是否包含知识编译分块。默认为 `true`。
- `"use_kg"`：（*请求体参数*），`boolean`
  是否为多跳查询搜索与所生成知识图谱相关的分块。默认为 `False`。启用前，请确保已为指定数据集成功构建知识图谱。详见[此处](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#graph)。
- `"toc_enhance"`：（*请求体参数*），`boolean`
  是否搜索已提取目录的分块。默认为 `False`。启用前，请确保已启用 `TOC_Enhance` 并成功为指定数据集提取目录。详见[此处](https://ragflow.io/docs/dev/enable_table_of_contents)。
- `"rerank_id"`：（*请求体参数*），`string`
  重排序模型的 ID。
- `"keyword"`：（*请求体参数*），`boolean`
  指示是否启用关键词匹配：
  - `true`：启用关键词匹配。
  - `false`：禁用关键词匹配（默认）。
- `"highlight"`：（*请求体参数*），`boolean`
  指定是否启用结果中匹配词的高亮：
  - `true`：启用匹配词高亮。
  - `false`：禁用匹配词高亮（默认）。
- `"cross_languages"`：（*请求体参数*）`list[string]`
  为实现不同语言的关键词检索而要翻译成的目标语言。
- `"metadata_condition"`：（*请求体参数*），`object`
  用于过滤分块的元数据条件：
  - `"logic"`：（*请求体参数*），`string`
    - `"and"`：仅返回满足*所有*条件的结果（默认）。
    - `"or"`：返回满足*任一*条件的结果。
  - `"conditions"`：（*请求体参数*），`array`
    元数据过滤条件列表。
    - `"name"`：`string` - 过滤所依据的元数据字段名，如 `"author"`、`"company"`、`"url"`。使用前请先确认该参数。详见[设置元数据](https://ragflow.io/docs/guides/dataset/metadata_management)。
    - `comparison_operator`：`string` - 比较运算符。可以是以下之一：
      - `"contains"`
      - `"not contains"`
      - `"start with"`
      - `"empty"`
      - `"not empty"`
      - `"="`
      - `"≠"`
      - `">"`
      - `"<"`
      - `"≥"`
      - `"≤"`
    - `"value"`：`string` - 用于比较的值。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "chunks": [
            {
                "content": "ragflow content",
                "content_ltks": "ragflow content",
                "document_id": "5c5999ec7be811ef9cab0242ac120005",
                "document_keyword": "1.txt",
                "highlight": "<em>ragflow</em> content",
                "id": "d78435d142bd5cf6704da62c778795c5",
                "image_id": "",
                "important_keywords": [
                    ""
                ],
                "tag_kwd": [],
                "dataset_id": "c7ee74067a2c11efb21c0242ac120006",
                "positions": [
                    ""
                ],
                "similarity": 0.9669436601210759,
                "term_similarity": 1.0,
                "vector_similarity": 0.8898122004035864
            }
        ],
        "doc_aggs": [
            {
                "count": 1,
                "doc_id": "5c5999ec7be811ef9cab0242ac120005",
                "doc_name": "1.txt"
            }
        ],
        "total": 1
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "`dataset_ids` is required."
}
```

---
