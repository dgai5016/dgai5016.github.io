# HTTP API 参考（第 3 部分）

## 数据集内的文件管理

---

### 上传文档

**POST** `/api/v1/datasets/{dataset_id}/documents`

将文档上传到指定数据集。

此端点通过可选的 `type` 查询参数支持三种创建模式：

- `type=local` 或省略：使用 `multipart/form-data` 上传一个或多个本地文件。
- `type=web`：抓取网页并保存为文档。
- `type=empty`：按名称创建一个空白虚拟文档。

#### 请求

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

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf'
```

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=web' \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'name=example-page' \
     --form 'url=https://example.com'
```

```bash
curl --request POST \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?type=empty' \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{"name":"blank.txt"}'
```

##### 请求参数

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

#### 响应

成功：

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

失败：

```json
{
    "code": 101,
    "message": "No file part!"
}
```

---

### 更新文档

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

更新指定文档的配置。

#### 请求

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

##### 请求示例

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

##### 请求参数

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

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "The dataset does not have the document."
}
```

---

### 下载文档

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

从指定数据集下载文档。

#### 请求

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents/{document_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 输出：
  - `'{PATH_TO_THE_FILE}'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./ragflow.txt
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `documents_id`：（*路径参数*）
  要下载的文档 ID。

#### 响应

成功：

```json
This is a test to verify the file download feature.
```

失败：

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

---

### 列出文档

**GET** `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`

列出指定数据集中的文档。

要获取特定文档的设置和元数据，请将其文档 ID 传入 `id` 查询参数：`/api/v1/datasets/{dataset_id}/documents?id={document_id}`。

#### 请求

- 方法：GET
- URL：`/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

**带分页的基本请求：**

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents?page=1&page_size=10 \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

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

##### 用法示例

**带多个过滤参数的请求**

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?suffix=pdf&run=DONE&page=1&page_size=10' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

**按元数据过滤（查询 JSON）：**

```bash
curl -G \
  --url "http://localhost:9222/api/v1/datasets/{{KB_ID}}/documents" \
  --header 'Authorization: Bearer <YOUR_API_KEY>' \
  --data-urlencode 'metadata_condition={"logic":"and","conditions":[{"name":"tags","comparison_operator":"is","value":"bar"},{"name":"author","comparison_operator":"is","value":"alice"}]}'
```

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "You don't own the dataset 7898da028a0511efbf750242ac1220005. "
}
```

---

### 删除文档

**DELETE** `/api/v1/datasets/{dataset_id}/documents`

按 ID 删除文档。

#### 请求

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/documents`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`：`list[string]`
  - `"delete_all"`：`boolean`

##### 请求示例

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

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "delete_all": true
     }'
```

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `"ids"`：（*请求体参数*），`list[string]`
  要删除的文档 ID。
  - 若省略，或设为 `null` 或空数组，则不删除任何文档。
  - 若提供 ID 数组，则仅删除与这些 ID 匹配的文档。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 被省略、设为 `null` 或为空数组时，是否删除指定数据集中的全部文档。默认为 `false`。

#### 响应

成功：

```json
{
    "code": 0
}.
```

失败：

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

---

### 解析文档

**POST** `/api/v1/datasets/{dataset_id}/chunks`

使用内置分块管道解析指定数据集中的文档。

:::info
此端点仅支持使用内置分块管道的数据集。对于配置了摄取管道的数据集，请改用 `POST /api/v1/documents/ingest`。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/datasets/{dataset_id}/chunks`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"document_ids"`：`list[string]`
  - `"user_id"`：`string`（可选）

##### 请求示例

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

##### 请求参数

- `dataset_id`：（*路径参数*）
  数据集 ID。
- `"document_ids"`：（*请求体参数*），`list[string]`，*必填*
  要解析的文档 ID。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，将作为 OpenAI `user` 字段随本次解析任务的嵌入请求转发。未设置时省略。该值仅在 worker 队列中传递，不会存储在 Task 行中。

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
    "message": "`document_ids` is required"
}
```

---

### 摄取文档

**POST** `/api/v1/documents/ingest`

启动、取消或重新运行文档的摄取。若文档所在数据集配置了摄取管道，请使用此端点。

#### 请求

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

##### 请求示例

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

##### 请求参数

- `"doc_ids"`：（*请求体参数*），`list[string]`，*必填*
  要摄取的文档 ID。
- `"run"`：（*请求体参数*），`string`，*必填*
  摄取动作。使用 `"1"` 启动摄取，使用 `"2"` 取消摄取。
- `"delete"`：（*请求体参数*），`boolean`
  重新运行前是否删除已有任务和分块。默认为 `false`。
- `"user_id"`：（*请求体参数*），`string`，*可选*
  终端用户标识符，`run` 启动摄取时将作为 OpenAI `user` 字段随嵌入请求转发。未设置时省略。

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
    "message": "document not found"
}
```

---

### 停止解析文档

**DELETE** `/api/v1/datasets/{dataset_id}/chunks`

停止解析指定文档。

#### 请求

- 方法：DELETE
- URL：`/api/v1/datasets/{dataset_id}/chunks`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"document_ids"`：`list[string]`

##### 请求示例

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

##### 请求参数

- `dataset_id`：（*路径参数*）
  关联的数据集 ID。
- `"document_ids"`：（*请求体参数*），`list[string]`，*必填*
  要停止解析的文档 ID。

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
    "message": "`document_ids` is required"
}
```

---
