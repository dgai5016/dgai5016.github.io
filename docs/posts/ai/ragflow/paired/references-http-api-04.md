<BiRow>
<template #en>

## CHUNK MANAGEMENT WITHIN DATASET

</template>
<template #zh>

## 数据集内的分块管理

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

### 新增分块

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

</template>
<template #zh>

**POST** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

</template>
</BiRow>

<BiRow>
<template #en>

Adds a chunk to a specified document in a specified dataset.

</template>
<template #zh>

向指定数据集内的指定文档添加分块。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"content"`: `string`
  - `"important_keywords"`: `list[string]`
  - `"tag_kwd"`: `list[string]`
  - `"questions"`: `list[string]`
  - `"image_base64"`: `string`
  - `"user_id"`: `string` (optional)

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `"content"`: (*Body parameter*), `string`, *Required*
  The text content of the chunk.
- `"important_keywords"`: (*Body parameter*), `list[string]`
  The key terms or phrases to tag with the chunk.
- `"tag_kwd"`: (*Body parameter*), `list[string]`
  Tag keywords to associate with the chunk.
- `"questions"`: (*Body parameter*), `list[string]`
  Optional questions to use when embedding the chunk.
- `"image_base64"`: (*Body parameter*), `string`
  A base64-encoded image to associate with the chunk.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on the embedding request for this chunk. Omitted when unset.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`content` is required"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`content` is required"
}
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

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`

</template>
<template #zh>

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists chunks in a specified document.

</template>
<template #zh>

列出指定文档中的分块。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `keywords`(*Filter parameter*), `string`
  The keywords used to match chunk content.
- `page`(*Filter parameter*), `integer`
  Specifies the page on which the chunks will be displayed. Defaults to `1`.
- `page_size`(*Filter parameter*), `integer`
  The maximum number of chunks on each page. Defaults to `30`.
- `id`(*Filter parameter*), `string`
  The ID of the chunk to retrieve. You can also use `GET /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` to retrieve one chunk.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "you don't own the document 5c5999ec7be811ef9cab0242ac12000e5"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "you don't own the document 5c5999ec7be811ef9cab0242ac12000e5"
}
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

### Get chunk

</template>
<template #zh>

### 获取分块

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

</template>
<template #zh>

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves a specified chunk in a specified document. Runtime fields such as vector and token fields are not returned.

</template>
<template #zh>

获取指定文档中的指定分块。不返回向量、token 等运行时字段。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `chunk_id`: (*Path parameter*)
  The ID of the chunk to retrieve.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  关联的文档 ID。
- `chunk_id`：（*路径参数*）
  要获取的分块 ID。

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 100,
    "message": "Chunk not found"
}
```

</template>
<template #zh>

```json
{
    "code": 100,
    "message": "Chunk not found"
}
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

**DELETE** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

</template>
<template #zh>

**DELETE** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

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

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"chunk_ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"chunk_ids"`：`list[string]`
  - `"delete_all"`：`boolean`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `"chunk_ids"`: (*Body parameter*), `list[string]`
  The IDs of the chunks to delete.
  - If omitted, or set to `null` or an empty array, no chunks are deleted.
  - If an array of IDs is provided, only the chunks matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all chunks of the specified document when `"chunk_ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0
}
```

</template>
<template #zh>

```json
{
    "code": 0
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "rm_chunk deleted chunks 0, expect 1"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "rm_chunk deleted chunks 0, expect 1"
}
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

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

</template>
<template #zh>

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Updates content or configurations for a specified chunk.

</template>
<template #zh>

更新指定分块的内容或配置。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`PUT /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`PUT /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` 已弃用。请改用此端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: PATCH
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"content"`: `string`
  - `"important_keywords"`: `list[string]`
  - `"questions"`: `list[string]`
  - `"positions"`: `list`
  - `"tag_kwd"`: `list[string]`
  - `"available"`: `boolean`
  - `"image_base64"`: `string`
  - `"user_id"`: `string` (optional)

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `chunk_id`: (*Path parameter*)
  The ID of the chunk to update.
- `"content"`: (*Body parameter*), `string`
  The text content of the chunk.
- `"important_keywords"`: (*Body parameter*), `list[string]`
  A list of key terms or phrases to tag with the chunk.
- `"questions"`: (*Body parameter*), `list[string]`
  Optional questions to use when embedding the chunk.
- `"positions"`: (*Body parameter*), `list`
  Updated source positions for the chunk.
- `"tag_kwd"`: (*Body parameter*), `list[string]`
  Updated tag keywords.
- `"available"`: (*Body parameter*) `boolean`
  The chunk's availability status in the dataset. Value options:
  - `true`: Available (default)
  - `false`: Unavailable
- `"image_base64"`: (*Body parameter*), `string`
  Base64-encoded image content to associate with the chunk.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on the embedding request for this update. Omitted when unset.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0
}
```

</template>
<template #zh>

```json
{
    "code": 0
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Can't find this chunk 29a2d9987e16ba331fb4d7d30d99b71d2"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Can't find this chunk 29a2d9987e16ba331fb4d7d30d99b71d2"
}
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

### Update chunk availability

</template>
<template #zh>

### 更新分块可用性

</template>
</BiRow>

<BiRow>
<template #en>

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

</template>
<template #zh>

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

</template>
</BiRow>

<BiRow>
<template #en>

Updates or switches the availability status of specified chunks, controlling whether they are available for retrieval.

</template>
<template #zh>

更新或切换指定分块的可用状态，控制这些分块是否可被检索。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: PATCH
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"chunk_ids"`: `list[string]` (*Required*)
  - `"available_int"`: `integer` (*Optional*)
  - `"available"`: `boolean` (*Optional*)

</template>
<template #zh>

- 方法：PATCH
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"chunk_ids"`：`list[string]`（*必填*）
  - `"available_int"`：`integer`（*可选*）
  - `"available"`：`boolean`（*可选*）

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameters

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The ID of the dataset.
- `document_id`: (*Path parameter*)
  The ID of the document.
- `"chunk_ids"`: (*Body parameter*), `list[string]` (*Required*)
  IDs of the chunks whose availability status is to be updated.
- `"available_int"`: (*Body parameter*), `integer` (*Optional*)
  Availability status for the specified chunks. You must provide either `"available_int"` or `"available"`. If both are provided, `"available_int"` is used.
  - `1`: Available,
  - `0`: Unavailable.
- `"available"`: (*Body parameter*), `boolean` (*Optional*)
  Availability status of the specified chunks. Used when `"available_int"` is not provided.
  - `true`: Available,
  - `false`: Unavailable.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 0,
    "data": true
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": true
}
```

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "You don't own the dataset {dataset_id}."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "You don't own the dataset {dataset_id}."
}
```

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`chunk_ids` is required."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`chunk_ids` is required."
}
```

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`available_int` or `available` is required."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`available_int` or `available` is required."
}
```

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "document not found"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "document not found"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "Index updating failure"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Index updating failure"
}
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

### Retrieve a metadata summary from a dataset

</template>
<template #zh>

### 从数据集获取元数据摘要

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/datasets/{dataset_id}/metadata/summary`

</template>
<template #zh>

**GET** `/api/v1/datasets/{dataset_id}/metadata/summary`

</template>
</BiRow>

<BiRow>
<template #en>

Aggregates metadata values across all documents in a dataset.

</template>
<template #zh>

聚合数据集内所有文档的元数据值。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/metadata/summary`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/metadata/summary`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Response

</template>
<template #zh>

##### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

### Update or delete metadata

</template>
<template #zh>

### 更新或删除元数据

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/datasets/{dataset_id}/metadata/update`

</template>
<template #zh>

**POST** `/api/v1/datasets/{dataset_id}/metadata/update`

</template>
</BiRow>

<BiRow>
<template #en>

Batch update or delete document-level metadata within a specified dataset. If both `document_ids` and `metadata_condition` are omitted, all documents within that dataset are selected. When both are provided, the intersection is used.

</template>
<template #zh>

批量更新或删除指定数据集内的文档级元数据。若 `document_ids` 和 `metadata_condition` 均未提供，则选中该数据集内的所有文档；若两者都提供，则取交集。

</template>
</BiRow>

<BiRow>
<template #en>

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/datasets/{dataset_id}/metadata/update`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `selector`: `object`
  - `updates`: `list[object]`
  - `deletes`: `list[object]`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/metadata/update`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `selector`：`object`
  - `updates`：`list[object]`
  - `deletes`：`list[object]`

</template>
</BiRow>

<BiRow>
<template #en>

#### Request parameters

</template>
<template #zh>

#### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `"selector"`: (*Body parameter*), `object`, *optional*
  A document selector:
  - `"document_ids"`: `list[string]` *optional*
    The associated document ID.
  - `"metadata_condition"`: `object`, *optional*
    - `"logic"`: Defines the logic relation between conditions if multiple conditions are provided. Options:
      - `"and"` (default)
      - `"or"`
    - `"conditions"`: `list[object]` *optional*
      Each object: `{ "name": string, "comparison_operator": string, "value": string }`
      - `"name"`: `string` The key name to search by.
      - `"comparison_operator"`: `string` Available options:
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
      - `"value"`: `string` The key value to search by.
- `"updates"`: (*Body parameter*), `list[object]`, *optional*
  Replaces metadata of the retrieved documents. Each object: `{ "key": string, "match": string, "value": string }`.
  - `"key"`: `string` The name of the key to update.
  - `"match"`: `string` *optional* The current value of the key to update. When omitted, the corresponding keys are updated to `"value"` regardless of their current values.
  - `"value"`: `string` The new value to set for the specified keys.
- `"deletes"`: (*Body parameter*), `list[object]`, *optional*
  Deletes metadata of the retrieved documents. Each object: `{ "key": string, "value": string }`.
  - `"key"`: `string` The name of the key to delete.
  - `"value"`: `string` *Optional* The value of the key to delete.
    - When provided, only keys with a matching value are deleted.
    - When omitted, all specified keys are deleted.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Response

</template>
<template #zh>

##### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
  "code": 0,
  "data": {
    "updated": 1,
    "matched_docs": 2
  }
}
```

</template>
<template #zh>

```json
{
  "code": 0,
  "data": {
    "updated": 1,
    "matched_docs": 2
  }
}
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

**POST** `/api/v1/retrieval`

</template>
<template #zh>

**POST** `/api/v1/retrieval`

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

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: POST
- URL: `/api/v1/retrieval`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"question"`: `string`
  - `"dataset_ids"`: `list[string]`
  - `"document_ids"`: `list[string]`
  - `"page"`: `integer`
  - `"page_size"`: `integer`
  - `"similarity_threshold"`: `float`
  - `"vector_similarity_weight"`: `float`
  - `"top_k"`: `integer` (deprecated; use `"knn_top_k"`)
  - `"knn_top_k"`: `integer`
  - `"knn_num_candidates"`: `integer`
  - `"rerank_candidates_count"`: `integer`
  - `"rerank_id"`: `string`
  - `"keyword"`: `boolean`
  - `"highlight"`: `boolean`
  - `"cross_languages"`: `list[string]`
  - `"metadata_condition"`: `object`
  - `"use_kg"`: `boolean`
  - `"toc_enhance"`: `boolean`
  - `"include_knowledge_compilation"`: `boolean`

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request example

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Request parameter

</template>
<template #zh>

##### 请求参数

</template>
</BiRow>

<BiRow>
<template #en>

- `"question"`: (*Body parameter*), `string`, *Required*
  The user query or query keywords.
- `"dataset_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the datasets to search. At least one dataset ID must be provided.
- `"document_ids"`: (*Body parameter*), `list[string]`
  Limits the search to specific documents within the datasets specified by `"dataset_ids"`. Ensure that all selected documents use the same embedding model. Defaults to an empty list.
- `"page"`: (*Body parameter*), `integer`
  Specifies the page on which the chunks will be displayed. Defaults to `1`.
- `"page_size"`: (*Body parameter*)
  The maximum number of chunks on each page. Defaults to `30`.
- `"similarity_threshold"`: (*Body parameter*)
  The minimum similarity score. Defaults to `0.2`.
- `"vector_similarity_weight"`: (*Body parameter*), `float`
  The weight of vector cosine similarity. Defaults to `0.3`. If x represents the weight of vector cosine similarity, then (1 - x) is the term similarity weight.
- `"top_k"`: (*Body parameter*), `integer`
  **Deprecated.** An alias for `"knn_top_k"`. If both parameters are provided, `"knn_top_k"` takes precedence.
- `"knn_top_k"`: (*Body parameter*), `integer`
  The number of chunks engaged in vector cosine computation. Defaults to `1024`.
- `"knn_num_candidates"`: (*Body parameter*), `integer`
  The number of approximate nearest-neighbor candidates considered for vector search. It must be greater than or equal to `"knn_top_k"`. Defaults to the greater of `2048` and `"knn_top_k"`. This parameter currently applies only to Elasticsearch.
- `"rerank_candidates_count"`: (*Body parameter*), `integer`
  The number of initial retrieval candidates to rank. It must be at least `"page"` multiplied by `"page_size"`. Defaults to `64`.
- `"include_knowledge_compilation"`: (*Body parameter*), `boolean`
  Whether to include knowledge-compilation chunks in the results. Defaults to `true`.
- `"use_kg"`: (*Body parameter*), `boolean`
  Whether to search chunks related to the generated knowledge graph for multi-hop queries. Defaults to `False`. Before enabling this, ensure you have successfully constructed a knowledge graph for the specified datasets. See [here](https://ragflow.io/docs/guides/knowledge_compilation/built_in_templates_and_dedicated_configuration.md#graph) for details.
- `"toc_enhance"`: (*Body parameter*), `boolean`
  Whether to search chunks with extracted table of content. Defaults to `False`. Before enabling this, ensure you have enabled `TOC_Enhance` and successfully extracted table of contents for the specified datasets. See [here](https://ragflow.io/docs/dev/enable_table_of_contents) for details.
- `"rerank_id"`: (*Body parameter*), `string`
  The ID of the rerank model.
- `"keyword"`: (*Body parameter*), `boolean`
  Indicates whether to enable keyword-based matching:
  - `true`: Enable keyword-based matching.
  - `false`: Disable keyword-based matching (default).
- `"highlight"`: (*Body parameter*), `boolean`
  Specifies whether to enable highlighting of matched terms in the results:
  - `true`: Enable highlighting of matched terms.
  - `false`: Disable highlighting of matched terms (default).
- `"cross_languages"`: (*Body parameter*) `list[string]`
  The languages that should be translated into, in order to achieve keywords retrievals in different languages.
- `"metadata_condition"`: (*Body parameter*), `object`
  The metadata condition used for filtering chunks:
  - `"logic"`: (*Body parameter*), `string`
    - `"and"`: Return only results that satisfy *every* condition (default).
    - `"or"`: Return results that satisfy *any* condition.
  - `"conditions"`: (*Body parameter*), `array`
    A list of metadata filter conditions.
    - `"name"`: `string` - The metadata field name to filter by, e.g., `"author"`, `"company"`, `"url"`. Ensure this parameter before use. See [Set metadata](https://ragflow.io/docs/guides/dataset/metadata_management) for details.
    - `comparison_operator`: `string` - The comparison operator. Can be one of:
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
    - `"value"`: `string` - The value to compare.

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

#### Response

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

Success:

</template>
<template #zh>

成功：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Failure:

</template>
<template #zh>

失败：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 102,
    "message": "`dataset_ids` is required."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`dataset_ids` is required."
}
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
