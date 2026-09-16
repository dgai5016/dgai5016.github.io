<BiRow>
<template #en>

## FILE MANAGEMENT WITHIN DATASET

</template>
<template #zh>

## 数据集内的文件管理

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

**POST** `/api/v1/datasets/{dataset_id}/documents`

</template>
<template #zh>

**POST** `/api/v1/datasets/{dataset_id}/documents`

</template>
</BiRow>

<BiRow>
<template #en>

Uploads documents to a specified dataset.

</template>
<template #zh>

将文档上传到指定数据集。

</template>
</BiRow>

<BiRow>
<template #en>

This endpoint supports three creation modes via the optional `type` query parameter:

</template>
<template #zh>

此端点通过可选的 `type` 查询参数支持三种创建模式：

</template>
</BiRow>

<BiRow>
<template #en>

- `type=local` or omitted: Upload one or more local files using `multipart/form-data`.
- `type=web`: Crawl a web page and save it as a document.
- `type=empty`: Create an empty virtual document by name.

</template>
<template #zh>

- `type=local` 或省略：使用 `multipart/form-data` 上传一个或多个本地文件。
- `type=web`：抓取网页并保存为文档。
- `type=empty`：按名称创建一个空白虚拟文档。

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
- URL: `/api/v1/datasets/{dataset_id}/documents`
- Query:
  - `type`: Optional. One of `local`, `web`, or `empty`. Defaults to `local`.
- Headers:
  - `'Content-Type: multipart/form-data'` for `type=local` and `type=web`
  - `'Content-Type: application/json'` for `type=empty`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - For `type=local`: form field `'file=@{FILE_PATH}'`
  - For `type=web`: form fields `'name'` and `'url'`
  - For `type=empty`: JSON body with `'name'`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/documents`
- 查询参数：
  - `type`：可选。取值为 `local`、`web` 或 `empty` 之一。默认为 `local`。
- 请求头：
  - `type=local` 和 `type=web` 时使用 `'Content-Type: multipart/form-data'`
  - `type=empty` 时使用 `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `type=local`：表单字段 `'file=@{FILE_PATH}'`
  - `type=web`：表单字段 `'name'` 和 `'url'`
  - `type=empty`：含 `'name'` 的 JSON 请求体

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
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf'
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=web' \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'name=example-page' \
     --form 'url=https://example.com'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=web' \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'name=example-page' \
     --form 'url=https://example.com'
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=empty' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{"name":"blank.txt"}'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=empty' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{"name":"blank.txt"}'
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
  The ID of the dataset to which the documents will be uploaded.
- `type`: (*Query parameter*)
  Controls how the document is created:
  - `local`: Upload files.
  - `web`: Crawl a URL into a document.
  - `empty`: Create an empty document without file upload.
- `'file'`: (*Body parameter*)
  A document to upload. Required when `type=local`.
- `'name'`: (*Body parameter*)
  The document name. Required when `type=web` or `type=empty`.
- `'url'`: (*Body parameter*)
  The source URL to crawl. Required when `type=web`.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  要上传文档的目标数据集 ID。
- `type`：（*查询参数*）
  控制文档的创建方式：
  - `local`：上传文件。
  - `web`：将某个 URL 抓取为文档。
  - `empty`：不通过文件上传创建空文档。
- `'file'`：（*请求体参数*）
  要上传的文档。`type=local` 时必填。
- `'name'`：（*请求体参数*）
  文档名称。`type=web` 或 `type=empty` 时必填。
- `'url'`：（*请求体参数*）
  要抓取的源 URL。`type=web` 时必填。

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
    "data": [
        {
            "chunk_method": "naive",
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
            "run": "UNSTART",
            "size": 17966,
            "thumbnail": "",
            "type": "doc"
        }
    ]
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": [
        {
            "chunk_method": "naive",
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
            "run": "UNSTART",
            "size": 17966,
            "thumbnail": "",
            "type": "doc"
        }
    ]
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
    "code": 101,
    "message": "No file part!"
}
```

</template>
<template #zh>

```json
{
    "code": 101,
    "message": "No file part!"
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

### Update document

</template>
<template #zh>

### 更新文档

</template>
</BiRow>

<BiRow>
<template #en>

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

</template>
<template #zh>

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Updates configurations for a specified document.

</template>
<template #zh>

更新指定文档的配置。

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
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`:`string`
  - `"meta_fields"`:`object`
  - `"chunk_method"`:`string`
  - `"parser_config"`:`object`

</template>
<template #zh>

- 方法：PATCH
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`：`string`
  - `"meta_fields"`：`object`
  - `"chunk_method"`：`string`
  - `"parser_config"`：`object`

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
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '
     {
          "name": "manual.txt",
          "chunk_method": "manual",
          "parser_config": {"chunk_token_num": 128}
     }'

```

</template>
<template #zh>

```bash
curl --request PATCH \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '
     {
          "name": "manual.txt",
          "chunk_method": "manual",
          "parser_config": {"chunk_token_num": 128}
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
  The ID of the associated dataset.
- `document_id`: (*Path parameter*)
  The ID of the document to update.
- `"name"`: (*Body parameter*), `string`
- `"meta_fields"`: (*Body parameter*), `dict[str, Any]` The meta fields of the document.
- `"chunk_method"`: (*Body parameter*), `string`
  The parsing method to apply to the document:
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
- `"parser_config"`: (*Body parameter*), `object`
  The configuration settings for the dataset parser. The attributes in this JSON object vary with the selected `"chunk_method"`:
  - If `"chunk_method"` is `"naive"`, the `"parser_config"` object contains the following attributes:
    - `"chunk_token_num"`: Defaults to `256`.
    - `"layout_recognize"`: Defaults to `"DeepDOC"`.
    - `"html4excel"`: Indicates whether to convert Excel documents into HTML format. Defaults to `false`.
    - `"delimiter"`: Defaults to `"\n"`.
    - `"task_page_size"`: Defaults to `12`. For PDF only.
- `"enabled"`: (*Body parameter*), `integer`
  Whether the document should be **available** in the knowledge base.
  - `1` → （available）
  - `0` → （unavailable）

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `document_id`：（*路径参数*）
  要更新的文档 ID。
- `"name"`：（*请求体参数*），`string`
- `"meta_fields"`：（*请求体参数*），`dict[str, Any]` 文档的元数据字段。
- `"chunk_method"`：（*请求体参数*），`string`
  应用于该文档的解析方法：
  - `"naive"`：通用
  - `"manual"`：手册
  - `"qa"`：问答
  - `"table"`：表格
  - `"paper"`：论文
  - `"book"`：书籍
  - `"laws"`：法律
  - `"presentation"`：演示文稿
  - `"picture"`：图片
  - `"one"`：One
  - `"email"`：电子邮件
- `"parser_config"`：（*请求体参数*），`object`
  数据集解析器的配置。此 JSON 对象中的属性随所选 `"chunk_method"` 而异：
  - 若 `"chunk_method"` 为 `"naive"`，`"parser_config"` 对象包含以下属性：
    - `"chunk_token_num"`：默认为 `256`。
    - `"layout_recognize"`：默认为 `"DeepDOC"`。
    - `"html4excel"`：是否将 Excel 文档转换为 HTML 格式。默认为 `false`。
    - `"delimiter"`：默认为 `"\n"`。
    - `"task_page_size"`：默认为 `12`。仅适用于 PDF。
- `"enabled"`：（*请求体参数*），`integer`
  文档在知识库中是否**可用**。
  - `1` → （可用）
  - `0` → （不可用）

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
    "id": "cd38dd72d4a611f0af9c71de94a988ef",
    "name": "large.md",
    "type": "doc",
    "suffix": "md",
    "size": 2306906,
    "location": "large.md",
    "source_type": "local",
    "status": "1",
    "run": "DONE",
    "dataset_id": "5f546a1ad4a611f0af9c71de94a988ef",

    "chunk_method": "naive",
    "chunk_count": 2,
    "token_count": 8126,

    "created_by": "eab7f446cb5a11f0ab334fbc3aa38f35",
    "create_date": "Tue, 09 Dec 2025 10:28:52 GMT",
    "create_time": 1765247332122,
    "update_date": "Wed, 17 Dec 2025 10:51:16 GMT",
    "update_time": 1765939876819,

    "process_begin_at": "Wed, 17 Dec 2025 10:33:55 GMT",
    "process_duration": 14.8615,
    "progress": 1.0,

    "progress_msg": [
      "10:33:58 Task has been received.",
      "10:33:59 Page(1~100000001): Start to parse.",
      "10:33:59 Page(1~100000001): Finish parsing.",
      "10:34:07 Page(1~100000001): Generate 2 chunks",
      "10:34:09 Page(1~100000001): Embedding chunks (2.13s)",
      "10:34:09 Page(1~100000001): Indexing done (0.31s).",
      "10:34:09 Page(1~100000001): Task done (11.68s)"
    ],

    "parser_config": {
      "chunk_token_num": 512,
      "delimiter": "\n",
      "auto_keywords": 0,
      "auto_questions": 0,
      "topn_tags": 3,
      "layout_recognize": "DeepDOC",
      "html4excel": false,
      "image_context_size": 0,
      "table_context_size": 0
    },

    "meta_fields": {},
    "pipeline_id": "",
    "thumbnail": ""
  }
}

```

</template>
<template #zh>

```json
{
  "code": 0,
  "data": {
    "id": "cd38dd72d4a611f0af9c71de94a988ef",
    "name": "large.md",
    "type": "doc",
    "suffix": "md",
    "size": 2306906,
    "location": "large.md",
    "source_type": "local",
    "status": "1",
    "run": "DONE",
    "dataset_id": "5f546a1ad4a611f0af9c71de94a988ef",

    "chunk_method": "naive",
    "chunk_count": 2,
    "token_count": 8126,

    "created_by": "eab7f446cb5a11f0ab334fbc3aa38f35",
    "create_date": "Tue, 09 Dec 2025 10:28:52 GMT",
    "create_time": 1765247332122,
    "update_date": "Wed, 17 Dec 2025 10:51:16 GMT",
    "update_time": 1765939876819,

    "process_begin_at": "Wed, 17 Dec 2025 10:33:55 GMT",
    "process_duration": 14.8615,
    "progress": 1.0,

    "progress_msg": [
      "10:33:58 Task has been received.",
      "10:33:59 Page(1~100000001): Start to parse.",
      "10:33:59 Page(1~100000001): Finish parsing.",
      "10:34:07 Page(1~100000001): Generate 2 chunks",
      "10:34:09 Page(1~100000001): Embedding chunks (2.13s)",
      "10:34:09 Page(1~100000001): Indexing done (0.31s).",
      "10:34:09 Page(1~100000001): Task done (11.68s)"
    ],

    "parser_config": {
      "chunk_token_num": 512,
      "delimiter": "\n",
      "auto_keywords": 0,
      "auto_questions": 0,
      "topn_tags": 3,
      "layout_recognize": "DeepDOC",
      "html4excel": false,
      "image_context_size": 0,
      "table_context_size": 0
    },

    "meta_fields": {},
    "pipeline_id": "",
    "thumbnail": ""
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
    "message": "The dataset does not have the document."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The dataset does not have the document."
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

### Download document

</template>
<template #zh>

### 下载文档

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

</template>
<template #zh>

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Downloads a document from a specified dataset.

</template>
<template #zh>

从指定数据集下载文档。

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
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Output:
  - `'{PATH_TO_THE_FILE}'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 输出：
  - `'{PATH_TO_THE_FILE}'`

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
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./ragflow.txt
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./ragflow.txt
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
- `documents_id`: (*Path parameter*)
  The ID of the document to download.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `documents_id`：（*路径参数*）
  要下载的文档 ID。

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
This is a test to verify the file download feature.
```

</template>
<template #zh>

```json
This is a test to verify the file download feature.
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
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
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

### List documents

</template>
<template #zh>

### 列出文档

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`

</template>
<template #zh>

**GET** `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists documents in a specified dataset.

</template>
<template #zh>

列出指定数据集中的文档。

</template>
</BiRow>

<BiRow>
<template #en>

To retrieve a specific document's settings and metadata, pass its document ID in the `id` query parameter: `/api/v1/datasets/{dataset_id}/documents?id={document_id}`.

</template>
<template #zh>

要获取特定文档的设置和元数据，请将其文档 ID 传入 `id` 查询参数：`/api/v1/datasets/{dataset_id}/documents?id={document_id}`。

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
- URL: `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
</BiRow>

<BiRow>
<template #en>

##### Request examples

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

**A basic request with pagination:**

</template>
<template #zh>

**带分页的基本请求：**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents?page=1&page_size=10 \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents?page=1&page_size=10 \
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
- `keywords`: (*Filter parameter*), `string`
  The keywords used to match document titles.
- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the documents will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The maximum number of documents on each page. Defaults to `30`.
- `orderby`: (*Filter parameter*), `string`
  The field by which documents should be sorted. Available options:
  - `create_time` (default)
  - `update_time`
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved documents should be sorted in descending order. Defaults to `true`.
- `id`: (*Filter parameter*), `string`
  The ID of the document to retrieve.
- `create_time_from`: (*Filter parameter*), `integer`
  Unix timestamp for filtering documents created after this time. 0 means no filter. Defaults to `0`.
- `create_time_to`: (*Filter parameter*), `integer`
  Unix timestamp for filtering documents created before this time. 0 means no filter. Defaults to `0`.
- `suffix`: (*Filter parameter*), `array[string]`
  Filter by file suffix. Supports multiple values, e.g., `pdf`, `txt`, and `docx`. Defaults to all suffixes.
- `run`: (*Filter parameter*), `array[string]`
  Filter by document processing status. Supports numeric, text, and mixed formats:
  - Numeric format: `["0", "1", "2", "3", "4", "5"]`
  - Text format: `[UNSTART, RUNNING, CANCEL, DONE, FAIL, SCHEDULE]`
  - Mixed format: `[UNSTART, 1, DONE]` (mixing numeric and text formats)
  - Status mapping:
    - `0` / `UNSTART`: Document not yet processed
    - `1` / `RUNNING`: Document is currently being processed
    - `2` / `CANCEL`: Document processing was canceled
    - `3` / `DONE`: Document processing completed successfully
    - `4` / `FAIL`: Document processing failed
    - `5` / `SCHEDULE`: Document is scheduled and waiting to be processed
  Defaults to all statuses.
- `metadata_condition`: (*Filter parameter*), `object` (JSON in query)
  Optional metadata filter applied to documents when `document_ids` is not provided. Uses the same structure as retrieval:
  - `logic`: `"and"` (default) or `"or"`
  - `conditions`: array of `{ "name": string, "comparison_operator": string, "value": string }`
    - `comparison_operator` supports: `is`, `not is`, `contains`, `not contains`, `in`, `not in`, `start with`, `end with`, `>`, `<`, `≥`, `≤`, `empty`, `not empty`

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `keywords`：（*过滤参数*），`string`
  用于匹配文档标题的关键词。
- `page`：（*过滤参数*），`integer`
  指定显示文档的页码。默认为 `1`。
- `page_size`：（*过滤参数*），`integer`
  每页文档的最大数量。默认为 `30`。
- `orderby`：（*过滤参数*），`string`
  文档排序所依据的字段。可用选项：
  - `create_time`（默认）
  - `update_time`
- `desc`：（*过滤参数*），`boolean`
  指示检索到的文档是否按降序排序。默认为 `true`。
- `id`：（*过滤参数*），`string`
  要获取的文档 ID。
- `create_time_from`：（*过滤参数*），`integer`
  Unix 时间戳，用于筛选该时间之后创建的文档。0 表示不过滤。默认为 `0`。
- `create_time_to`：（*过滤参数*），`integer`
  Unix 时间戳，用于筛选该时间之前创建的文档。0 表示不过滤。默认为 `0`。
- `suffix`：（*过滤参数*），`array[string]`
  按文件后缀过滤。支持多个值，例如 `pdf`、`txt`、`docx`。默认为所有后缀。
- `run`：（*过滤参数*），`array[string]`
  按文档处理状态过滤。支持数字、文本和混合格式：
  - 数字格式：`["0", "1", "2", "3", "4", "5"]`
  - 文本格式：`[UNSTART, RUNNING, CANCEL, DONE, FAIL, SCHEDULE]`
  - 混合格式：`[UNSTART, 1, DONE]`（数字与文本格式混用）
  - 状态映射：
    - `0` / `UNSTART`：文档尚未处理
    - `1` / `RUNNING`：文档正在处理中
    - `2` / `CANCEL`：文档处理已取消
    - `3` / `DONE`：文档处理成功完成
    - `4` / `FAIL`：文档处理失败
    - `5` / `SCHEDULE`：文档已排期，等待处理
  默认为所有状态。
- `metadata_condition`：（*过滤参数*），`object`（查询字符串中的 JSON）
  未提供 `document_ids` 时应用于文档的可选元数据过滤器。结构与检索所用相同：
  - `logic`：`"and"`（默认）或 `"or"`
  - `conditions`：由 `{ "name": string, "comparison_operator": string, "value": string }` 组成的数组
    - `comparison_operator` 支持：`is`、`not is`、`contains`、`not contains`、`in`、`not in`、`start with`、`end with`、`>`、`<`、`≥`、`≤`、`empty`、`not empty`

</template>
</BiRow>

<BiRow>
<template #en>

##### Usage examples

</template>
<template #zh>

##### 用法示例

</template>
</BiRow>

<BiRow>
<template #en>

**A request with multiple filtering parameters**

</template>
<template #zh>

**带多个过滤参数的请求**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?suffix=pdf&run=DONE&page=1&page_size=10' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?suffix=pdf&run=DONE&page=1&page_size=10' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

**Filter by metadata (query JSON):**

</template>
<template #zh>

**按元数据过滤（查询 JSON）：**

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl -G \
  --url "http://localhost:9222/api/v1/datasets/{{KB_ID}}/documents" \
  --header 'Authorization: Bearer <YOUR_API_KEY>' \
  --data-urlencode 'metadata_condition={"logic":"and","conditions":[{"name":"tags","comparison_operator":"is","value":"bar"},{"name":"author","comparison_operator":"is","value":"alice"}]}'
```

</template>
<template #zh>

```bash
curl -G \
  --url "http://localhost:9222/api/v1/datasets/{{KB_ID}}/documents" \
  --header 'Authorization: Bearer <YOUR_API_KEY>' \
  --data-urlencode 'metadata_condition={"logic":"and","conditions":[{"name":"tags","comparison_operator":"is","value":"bar"},{"name":"author","comparison_operator":"is","value":"alice"}]}'
```

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
        "docs": [
            {
                "chunk_count": 0,
                "create_date": "Mon, 14 Oct 2024 09:11:01 GMT",
                "create_time": 1728897061948,
                "created_by": "69736c5e723611efb51b0242ac120007",
                "id": "3bcfbf8a8a0c11ef8aba0242ac120006",
                "knowledgebase_id": "7898da028a0511efbf750242ac120005",
                "location": "Test_2.txt",
                "name": "Test_2.txt",
                "parser_config": {
                    "chunk_token_count": 128,
                    "delimiter": "\n",
                    "layout_recognize": "DeepDOC",
                    "task_page_size": 12
                },
                "chunk_method": "naive",
                "process_begin_at": null,
                "process_duration": 0.0,
                "progress": 0.0,
                "progress_msg": "",
                "run": "UNSTART",
                "size": 7,
                "source_type": "local",
                "status": "1",
                "thumbnail": null,
                "token_count": 0,
                "type": "doc",
                "update_date": "Mon, 14 Oct 2024 09:11:01 GMT",
                "update_time": 1728897061948
            }
        ],
        "total_datasets": 1
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "docs": [
            {
                "chunk_count": 0,
                "create_date": "Mon, 14 Oct 2024 09:11:01 GMT",
                "create_time": 1728897061948,
                "created_by": "69736c5e723611efb51b0242ac120007",
                "id": "3bcfbf8a8a0c11ef8aba0242ac120006",
                "knowledgebase_id": "7898da028a0511efbf750242ac120005",
                "location": "Test_2.txt",
                "name": "Test_2.txt",
                "parser_config": {
                    "chunk_token_count": 128,
                    "delimiter": "\n",
                    "layout_recognize": "DeepDOC",
                    "task_page_size": 12
                },
                "chunk_method": "naive",
                "process_begin_at": null,
                "process_duration": 0.0,
                "progress": 0.0,
                "progress_msg": "",
                "run": "UNSTART",
                "size": 7,
                "source_type": "local",
                "status": "1",
                "thumbnail": null,
                "token_count": 0,
                "type": "doc",
                "update_date": "Mon, 14 Oct 2024 09:11:01 GMT",
                "update_time": 1728897061948
            }
        ],
        "total_datasets": 1
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
    "message": "You don't own the dataset 7898da028a0511efbf750242ac1220005. "
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "You don't own the dataset 7898da028a0511efbf750242ac1220005. "
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

### Delete documents

</template>
<template #zh>

### 删除文档

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/datasets/{dataset_id}/documents`

</template>
<template #zh>

**DELETE** `/api/v1/datasets/{dataset_id}/documents`

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

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/documents`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/documents`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`：`list[string]`
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
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["id_1","id_2"]
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["id_1","id_2"]
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
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
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
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
- `"ids"`: (*Body parameter*), `list[string]`
  The IDs of the documents to delete.
  - If omitted, or set to `null` or an empty array, no documents are deleted.
  - If an array of IDs is provided, only the documents matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all documents in the specified dataset when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  要删除的文档 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何文档。
  - 若提供 ID 数组，则仅删除与这些 ID 匹配的文档。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 被省略、设为 `null` 或为空数组时，是否删除指定数据集中的全部文档。默认为 `false`。

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
}.
```

</template>
<template #zh>

```json
{
    "code": 0
}.
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
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
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

### Parse documents

</template>
<template #zh>

### 解析文档

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/datasets/{dataset_id}/chunks`

</template>
<template #zh>

**POST** `/api/v1/datasets/{dataset_id}/chunks`

</template>
</BiRow>

<BiRow>
<template #en>

Parses documents in a specified dataset using the built-in chunking pipeline.

</template>
<template #zh>

使用内置分块管道解析指定数据集中的文档。

</template>
</BiRow>

<BiRow>
<template #en>

:::note
This endpoint only supports datasets that use the built-in chunking pipeline. For datasets configured with an ingestion pipeline, use `POST /api/v1/documents/ingest` instead.
:::

</template>
<template #zh>

:::note
此端点仅支持使用内置分块管道的数据集。对于配置了摄取管道的数据集，请改用 `POST /api/v1/documents/ingest`。
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

- Method: POST
- URL: `/api/v1/datasets/{dataset_id}/chunks`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"document_ids"`: `list[string]`
  - `"user_id"`: `string` (optional)

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/chunks`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"document_ids"`：`list[string]`
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
     --url http://{address}/api/v1/datasets/{dataset_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "document_ids": ["97a5f1c2759811efaa500242ac120004","97ad64b6759811ef9fc30242ac120004"],
          "user_id": "end-user-123"
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets/{dataset_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "document_ids": ["97a5f1c2759811efaa500242ac120004","97ad64b6759811ef9fc30242ac120004"],
          "user_id": "end-user-123"
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
  The dataset ID.
- `"document_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents to parse.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on embedding requests for this parse job. Omitted when unset. The value is carried on the worker queue only; it is not stored on Task rows.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  数据集 ID。
- `"document_ids"`：（*请求体参数*），`list[string]`，*必填*
  要解析的文档 ID。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，将作为 OpenAI `user` 字段随本次解析任务的嵌入请求转发。未设置时省略。该值仅在 worker 队列中传递，不会存储在 Task 行中。

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
    "message": "`document_ids` is required"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`document_ids` is required"
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

### Ingest documents

</template>
<template #zh>

### 摄取文档

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/documents/ingest`

</template>
<template #zh>

**POST** `/api/v1/documents/ingest`

</template>
</BiRow>

<BiRow>
<template #en>

Starts, cancels, or reruns ingestion for documents. Use this endpoint for documents in datasets configured with an ingestion pipeline.

</template>
<template #zh>

启动、取消或重新运行文档的摄取。若文档所在数据集配置了摄取管道，请使用此端点。

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
- URL: `/api/v1/documents/ingest`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"doc_ids"`: `list[string]`
  - `"run"`: `string`
  - `"delete"`: `boolean`
  - `"user_id"`: `string` (optional)

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/documents/ingest`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"doc_ids"`：`list[string]`
  - `"run"`：`string`
  - `"delete"`：`boolean`
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
     --url http://{address}/api/v1/documents/ingest \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "doc_ids": ["97a5f1c2759811efaa500242ac120004"],
          "run": "1",
          "delete": true,
          "user_id": "end-user-123"
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/documents/ingest \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "doc_ids": ["97a5f1c2759811efaa500242ac120004"],
          "run": "1",
          "delete": true,
          "user_id": "end-user-123"
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

- `"doc_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents to ingest.
- `"run"`: (*Body parameter*), `string`, *Required*
  The ingestion action. Use `"1"` to start ingestion and `"2"` to cancel ingestion.
- `"delete"`: (*Body parameter*), `boolean`
  Whether to delete existing tasks and chunks before rerunning. Defaults to `false`.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on embedding requests when `run` starts ingestion. Omitted when unset.

</template>
<template #zh>

- `"doc_ids"`：（*请求体参数*），`list[string]`，*必填*
  要摄取的文档 ID。
- `"run"`：（*请求体参数*），`string`，*必填*
  摄取动作。使用 `"1"` 启动摄取，使用 `"2"` 取消摄取。
- `"delete"`：（*请求体参数*），`boolean`
  重新运行前是否删除已有任务和分块。默认为 `false`。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，`run` 启动摄取时将作为 OpenAI `user` 字段随嵌入请求转发。未设置时省略。

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

**DELETE** `/api/v1/datasets/{dataset_id}/chunks`

</template>
<template #zh>

**DELETE** `/api/v1/datasets/{dataset_id}/chunks`

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

#### Request

</template>
<template #zh>

#### 请求

</template>
</BiRow>

<BiRow>
<template #en>

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/chunks`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"document_ids"`: `list[string]`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/chunks`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"document_ids"`：`list[string]`

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
     --url http://{address}/api/v1/datasets/{dataset_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "document_ids": ["97a5f1c2759811efaa500242ac120004","97ad64b6759811ef9fc30242ac120004"]
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/chunks \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "document_ids": ["97a5f1c2759811efaa500242ac120004","97ad64b6759811ef9fc30242ac120004"]
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
- `"document_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents for which the parsing should be stopped.

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `"document_ids"`：（*请求体参数*），`list[string]`，*必填*
  要停止解析的文档 ID。

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
    "message": "`document_ids` is required"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "`document_ids` is required"
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
