# HTTP API Reference (Part 3)

## FILE MANAGEMENT WITHIN DATASET

---

### Upload documents

**POST** `/api/v1/datasets/{dataset_id}/documents`

Uploads documents to a specified dataset.

This endpoint supports three creation modes via the optional `type` query parameter:

- `type=local` or omitted: Upload one or more local files using `multipart/form-data`.
- `type=web`: Crawl a web page and save it as a document.
- `type=empty`: Create an empty virtual document by name.

#### Request

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

##### Request example

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

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 101,
    "message": "No file part!"
}
```

---

### Update document

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

Updates configurations for a specified document.

#### Request

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

##### Request example

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

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "The dataset does not have the document."
}
```

---

### Download document

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}`

Downloads a document from a specified dataset.

#### Request

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Output:
  - `'{PATH_TO_THE_FILE}'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./ragflow.txt
```

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `documents_id`: (*Path parameter*)
  The ID of the document to download.

#### Response

Success:

```json
This is a test to verify the file download feature.
```

Failure:

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

---

### List documents

**GET** `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`

Lists documents in a specified dataset.

To retrieve a specific document's settings and metadata, pass its document ID in the `id` query parameter: `/api/v1/datasets/{dataset_id}/documents?id={document_id}`.

#### Request

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&keywords={keywords}&id={document_id}&name={document_name}&create_time_from={timestamp}&create_time_to={timestamp}&suffix={file_suffix}&run={run_status}&metadata_condition={json}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request examples

**A basic request with pagination:**

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents?page=1&page_size=10 \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

##### Usage examples

**A request with multiple filtering parameters**

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets/{dataset_id}/documents?suffix=pdf&run=DONE&page=1&page_size=10' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

**Filter by metadata (query JSON):**

```bash
curl -G \
  --url "http://localhost:9222/api/v1/datasets/{{KB_ID}}/documents" \
  --header 'Authorization: Bearer <YOUR_API_KEY>' \
  --data-urlencode 'metadata_condition={"logic":"and","conditions":[{"name":"tags","comparison_operator":"is","value":"bar"},{"name":"author","comparison_operator":"is","value":"alice"}]}'
```

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "You don't own the dataset 7898da028a0511efbf750242ac1220005. "
}
```

---

### Delete documents

**DELETE** `/api/v1/datasets/{dataset_id}/documents`

Deletes documents by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/documents`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### Request example

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

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `"ids"`: (*Body parameter*), `list[string]`
  The IDs of the documents to delete.
  - If omitted, or set to `null` or an empty array, no documents are deleted.
  - If an array of IDs is provided, only the documents matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all documents in the specified dataset when `"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

#### Response

Success:

```json
{
    "code": 0
}.
```

Failure:

```json
{
    "code": 102,
    "message": "You do not own the dataset 7898da028a0511efbf750242ac1220005."
}
```

---

### Parse documents

**POST** `/api/v1/datasets/{dataset_id}/chunks`

Parses documents in a specified dataset using the built-in chunking pipeline.

:::note
This endpoint only supports datasets that use the built-in chunking pipeline. For datasets configured with an ingestion pipeline, use `POST /api/v1/documents/ingest` instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/datasets/{dataset_id}/chunks`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"document_ids"`: `list[string]`
  - `"user_id"`: `string` (optional)

##### Request example

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

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The dataset ID.
- `"document_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents to parse.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on embedding requests for this parse job. Omitted when unset. The value is carried on the worker queue only; it is not stored on Task rows.

#### Response

Success:

```json
{
    "code": 0
}
```

Failure:

```json
{
    "code": 102,
    "message": "`document_ids` is required"
}
```

---

### Ingest documents

**POST** `/api/v1/documents/ingest`

Starts, cancels, or reruns ingestion for documents. Use this endpoint for documents in datasets configured with an ingestion pipeline.

#### Request

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

##### Request example

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

##### Request parameters

- `"doc_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents to ingest.
- `"run"`: (*Body parameter*), `string`, *Required*
  The ingestion action. Use `"1"` to start ingestion and `"2"` to cancel ingestion.
- `"delete"`: (*Body parameter*), `boolean`
  Whether to delete existing tasks and chunks before rerunning. Defaults to `false`.
- `"user_id"`: (*Body parameter*), `string`, *Optional*
  End-user identifier forwarded as the OpenAI `user` field on embedding requests when `run` starts ingestion. Omitted when unset.

#### Response

Success:

```json
{
    "code": 0,
    "data": true
}
```

Failure:

```json
{
    "code": 102,
    "message": "document not found"
}
```

---

### Stop parsing documents

**DELETE** `/api/v1/datasets/{dataset_id}/chunks`

Stops parsing specified documents.

#### Request

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/chunks`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"document_ids"`: `list[string]`

##### Request example

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

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `"document_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the documents for which the parsing should be stopped.

#### Response

Success:

```json
{
    "code": 0
}
```

Failure:

```json
{
    "code": 102,
    "message": "`document_ids` is required"
}
```

---
