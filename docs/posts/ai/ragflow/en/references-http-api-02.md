# HTTP API Reference (Part 2)

## DATASET MANAGEMENT

---

### Create dataset

**POST** `/api/v1/datasets`

Creates a dataset.

#### Request

- Method: POST
- URL: `/api/v1/datasets`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"avatar"`: `string`
  - `"description"`: `string`
  - `"language"`: `string`
  - `"embedding_model"`: `string`
  - `"permission"`: `string`
  - `"chunk_method"`: `string`
  - `"parser_config"`: `object`
  - `"parse_type"`: `int`
  - `"pipeline_id"`: `string`

##### A basic request example

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
      "name": "test_1"
      }'
```

##### A request example specifying ingestion pipeline

:::caution WARNING
You must *not* include `"chunk_method"` or `"parser_config"` when specifying an ingestion pipeline.
:::

```bash
curl --request POST \
  --url http://{address}/api/v1/datasets \
  --header 'Content-Type: application/json' \
  --header 'Authorization: Bearer <YOUR_API_KEY>' \
  --data '{
   "name": "test-sdk",
   "language": "English",
   "parse_type": <NUMBER_OF_PARSERS_IN_YOUR_PARSER_COMPONENT>,
   "pipeline_id": "<PIPELINE_ID_32_HEX>"
  }'
```

##### Request parameters

- `"name"`: (*Body parameter*), `string`, *Required*
  The unique name of the dataset to create. It must adhere to the following requirements:
  - Basic Multilingual Plane (BMP) only
  - Maximum 128 characters
  - Case-insensitive
- `"avatar"`: (*Body parameter*), `string`
  Base64 encoding of the avatar.
  - Maximum 65535 characters
- `"description"`: (*Body parameter*), `string`
  A brief description of the dataset to create.
  - Maximum 65535 characters
- `"language"`: (*Body parameter*), `string`
  Optional document/dataset language, for example: `"English"` or `"Chinese"`.
  Leading and trailing whitespace are stripped.
  After trimming, it must contain at least 1 character and at most 32 characters. The limit counts characters, not UTF-8 bytes.
  No restricted list of language values is enforced.
  If omitted, the server/database default is used.

- `"embedding_model"`: (*Body parameter*), `string`
  The name of the embedding model to use. For example: `"BAAI/bge-large-zh-v1.5@BAAI"`
  - Maximum 255 characters
  - Must follow `model_name@model_factory` format
- `"permission"`: (*Body parameter*), `string`
  Specifies who can access the dataset to create. Available options:
  - `"me"`: (Default) Only you can manage the dataset.
  - `"team"`: All team members can manage the dataset.
- `"chunk_method"`: (*Body parameter*), `enum<string>`
  The default chunk method of the dataset to create. Mutually exclusive with `"parse_type"` and `"pipeline_id"`. If you set `"chunk_method"`, do not include `"parse_type"` or `"pipeline_id"`.
  Available options:
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
- `"parser_config"`: (*Body parameter*), `object`
  The configuration settings for the dataset parser. The attributes in this JSON object vary with the selected `"chunk_method"`:
  - If `"chunk_method"` is `"naive"`, the `"parser_config"` object contains the following attributes:
    - `"auto_keywords"`: `int`
      - Defaults to `0`
      - Minimum: `0`
      - Maximum: `32`
    - `"auto_questions"`: `int`
      - Defaults to `0`
      - Minimum: `0`
      - Maximum: `10`
    - `"chunk_token_num"`: `int`
      - Defaults to `512`
      - Minimum: `1`
      - Maximum: `2048`
    - `"delimiter"`: `string`
      - Defaults to `"\n"`.
    - `"html4excel"`: `bool`
      - Whether to convert Excel documents into HTML format.
      - Defaults to `false`
    - `"layout_recognize"`: `string`
      - Defaults to `DeepDOC`
    - `"tag_kb_ids"`: `array<string>`
      - IDs of datasets to be parsed using the ​​Tag chunk method.
      - Before setting this, ensure a tag set is created and properly configured. For details, see [Use tag set](https://ragflow.io/docs/dev/use_tag_sets).
    - `"task_page_size"`: `int`
      - For PDFs only.
      - Defaults to `12`
      - Minimum: `1`
    - `"parent_child"`: `object` Parent-child chunking settings. When enabled, each chunk is further split into smaller child chunks using `children_delimiter`. At retrieval time, matched child chunks are replaced by their parent's full text before being passed to the LLM, giving precise vector matching with broader context.
      - `"use_parent_child"`: `bool` Whether to enable parent-child chunking. Defaults to `false`.
      - `"children_delimiter"`: `string` The delimiter used to split a parent chunk into child chunks. Only takes effect when `"use_parent_child"` is `true`. Defaults to `"\n"`.
- `"parse_type"`: (*Body parameter*), `int`
  The ingestion pipeline parse type identifier, i.e., the number of parsers in your **Parser** component.
  - Required (along with `"pipeline_id"`) if specifying an ingestion pipeline.
  - Must not be included when `"chunk_method"` is specified.
- `"pipeline_id"`: (*Body parameter*), `string`
  The ingestion pipeline ID. Can be found in the corresponding URL in the RAGFlow UI.
  - Required (along with `"parse_type"`) if specifying an ingestion pipeline.
  - Must be a 32-character lowercase hexadecimal string, e.g., `"d0bebe30ae2211f0970942010a8e0005"`.
  - Must not be included when `"chunk_method"` is specified.

:::caution WARNING
You can choose either of the following ingestion options when creating a dataset, but *not* both:

- Use a built-in chunk method -- specify `"chunk_method"` (optionally with `"parser_config"`).
- Use an ingestion pipeline -- specify both `"parse_type"` and `"pipeline_id"`.

If none of `"chunk_method"`, `"parse_type"`, or `"pipeline_id"` are provided, the system defaults to `chunk_method = "naive"`.
:::

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "avatar": null,
        "chunk_count": 0,
        "chunk_method": "naive",
        "create_date": "2025-04-28T18:40:41",
        "create_time": 1745836841611,
        "created_by": "3af81804241d11f0a6a79f24fc270c7f",
        "description": null,
        "document_count": 0,
        "embedding_model": "BAAI/bge-large-zh-v1.5@BAAI",
        "id": "3b4de7d4241d11f0a6a79f24fc270c7f",
        "language": "English",
        "name": "RAGFlow example",
        "pagerank": 0,
        "parser_config": {
            "chunk_token_num": 128,
            "delimiter": "\\n!?;。；！？",
            "html4excel": false,
            "layout_recognize": "DeepDOC"
        },
        "permission": "me",
        "similarity_threshold": 0.2,
        "status": "1",
        "tenant_id": "3af81804241d11f0a6a79f24fc270c7f",
        "token_num": 0,
        "update_date": "2025-04-28T18:40:41",
        "update_time": 1745836841611,
        "vector_similarity_weight": 0.3,
    },
}
```

Failure:

```json
{
    "code": 101,
    "message": "Field: <name> - Message: <String should have at least 1 character> - Value: <>"
}
```

---

### Delete datasets

**DELETE** `/api/v1/datasets`

Deletes datasets by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/datasets`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]` or `null`
  - `"delete_all"`: `boolean`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     "ids": ["d94a8dc02c9711f0930f7fbc369eab6d", "e94a8dc02c9711f0930f7fbc369eab6e"]
     }'
```

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     "delete_all": true
     }'
```

##### Request parameters

- `"ids"`: (*Body parameter*), `list[string]` or `null`
  Specifies the datasets to delete:
  - If omitted, or set to `null` or an empty array, no datasets are deleted.
  - If an array of IDs is provided, only the datasets matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all datasets owned by the current user when`"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

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
    "code":108,
    "message":"User '<tenant_id>' lacks permission for datasets: '<dataset_ids>'"
}

```

---

### Update dataset

**PUT** `/api/v1/datasets/{dataset_id}`

Updates configurations for a specified dataset.

#### Request

- Method: PUT
- URL: `/api/v1/datasets/{dataset_id}`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"avatar"`: `string`
  - `"description"`: `string`
  - `"language"`: `string`
  - `"embedding_model"`: `string`
  - `"permission"`: `string`
  - `"chunk_method"`: `string`
  - `"pagerank"`: `int`
  - `"parser_config"`: `object`

##### Request example

```bash
curl --request PUT \
     --url http://{address}/api/v1/datasets/{dataset_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "updated_dataset"
     }'
```

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The ID of the dataset to update.
- `"name"`: (*Body parameter*), `string`
  The revised name of the dataset.
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
- `"language"`: (*Body parameter*), `string`
  Optional document/dataset language, for example: `"English"` or `"Chinese"`.
  Leading and trailing whitespace are stripped.
  After trimming, it must contain at least 1 character and at most 32 characters. The limit counts characters, not UTF-8 bytes.
  No restricted list of language values is enforced.
  If omitted, the existing dataset language remains unchanged.
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
- `"parser_config"`: (*Body parameter*), `object`
  The configuration settings for the dataset parser. The attributes in this JSON object vary with the selected `"chunk_method"`:
  - If `"chunk_method"` is `"naive"`, the `"parser_config"` object contains the following attributes:
    - `"auto_keywords"`: `int`
      - Defaults to `0`
      - Minimum: `0`
      - Maximum: `32`
    - `"auto_questions"`: `int`
      - Defaults to `0`
      - Minimum: `0`
      - Maximum: `10`
    - `"chunk_token_num"`: `int`
      - Defaults to `512`
      - Minimum: `1`
      - Maximum: `2048`
    - `"delimiter"`: `string`
      - Defaults to `"\n"`.
    - `"html4excel"`: `bool` Indicates whether to convert Excel documents into HTML format.
      - Defaults to `false`
    - `"layout_recognize"`: `string`
      - Defaults to `DeepDOC`
    - `"tag_kb_ids"`: `array<string>` refer to [Use tag set](https://ragflow.io/docs/dev/use_tag_sets)
      - Must include a list of dataset IDs, where each dataset is parsed using the ​​Tag Chunking Method
    - `"task_page_size"`: `int` For PDF only.
      - Defaults to `12`
      - Minimum: `1`
    - `"parent_child"`: `object` Parent-child chunking settings. When enabled, each chunk is further split into smaller child chunks using `children_delimiter`. At retrieval time, matched child chunks are replaced by their parent's full text before being passed to the LLM, giving precise vector matching with broader context.
      - `"use_parent_child"`: `bool` Whether to enable parent-child chunking. Defaults to `false`.
      - `"children_delimiter"`: `string` The delimiter used to split a parent chunk into child chunks. Only takes effect when `"use_parent_child"` is `true`. Defaults to `"\n"`.

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
    "message": "Can't change tenant_id."
}
```

---

### List datasets

**GET** `/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`

Lists datasets.

#### Request

- Method: GET
- URL: `/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets?include_parsing_status=true' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `page`: (*Filter parameter*)
  Specifies the page on which the datasets will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*)
  The number of datasets on each page. Defaults to `30`.
- `orderby`: (*Filter parameter*)
  The field by which datasets should be sorted. Available options:
  - `create_time` (default)
  - `update_time`
- `desc`: (*Filter parameter*)
  Indicates whether the retrieved datasets should be sorted in descending order. Defaults to `true`.
- `name`: (*Filter parameter*)
  The name of the dataset to retrieve.
- `id`: (*Filter parameter*)
  The ID of the dataset to retrieve.
- `include_parsing_status`: (*Filter parameter*)
  Whether to include document parsing status counts in the response. Defaults to `false`. When set to `true`, each dataset object in the response will include the following additional fields:
  - `unstart_count`: Number of documents not yet started parsing.
  - `running_count`: Number of documents currently being parsed.
  - `cancel_count`: Number of documents whose parsing was canceled.
  - `done_count`: Number of documents that have been successfully parsed.
  - `fail_count`: Number of documents whose parsing failed.

#### Response

Success:

```json
{
    "code": 0,
    "data": [
        {
            "avatar": "",
            "chunk_count": 59,
            "create_date": "Sat, 14 Sep 2024 01:12:37 GMT",
            "create_time": 1726276357324,
            "created_by": "69736c5e723611efb51b0242ac120007",
            "description": null,
            "document_count": 1,
            "embedding_model": "BAAI/bge-large-zh-v1.5",
            "id": "6e211ee0723611efa10a0242ac120007",
            "language": "English",
            "name": "mysql",
            "chunk_method": "naive",
            "parser_config": {
                "chunk_token_num": 8192,
                "delimiter": "\\n",
                "entity_types": [
                    "organization",
                    "person",
                    "location",
                    "event",
                    "time"
                ]
            },
            "permission": "me",
            "similarity_threshold": 0.2,
            "status": "1",
            "tenant_id": "69736c5e723611efb51b0242ac120007",
            "token_num": 12744,
            "update_date": "Thu, 10 Oct 2024 04:07:23 GMT",
            "update_time": 1728533243536,
            "vector_similarity_weight": 0.3
        }
    ],
    "total_datasets": 1
}
```

Success (with `include_parsing_status=true`):

```json
{
    "code": 0,
    "data": [
        {
            "avatar": null,
            "cancel_count": 0,
            "chunk_count": 30,
            "chunk_method": "qa",
            "create_date": "2026-03-09T18:57:13",
            "create_time": 1773053833094,
            "created_by": "928f92a210b911f1ac4cc39e0b8fa3ad",
            "description": null,
            "document_count": 1,
            "done_count": 1,
            "embedding_model": "text-embedding-v2@Tongyi-Qianwen",
            "fail_count": 0,
            "id": "ba6586c21ba611f1a3dc476f0709e75e",
            "language": "English",
            "name": "Test Dataset",
            "parser_config": {
                "llm_id": "deepseek-chat@DeepSeek"
            },
            "permission": "me",
            "running_count": 0,
            "similarity_threshold": 0.2,
            "status": "1",
            "tenant_id": "928f92a210b911f1ac4cc39e0b8fa3ad",
            "token_num": 1746,
            "unstart_count": 0,
            "update_date": "2026-03-09T18:59:32",
            "update_time": 1773053972723,
            "vector_similarity_weight": 0.3
        }
    ],
    "total_datasets": 1
}
```

Failure:

```json
{
    "code": 102,
    "message": "The dataset doesn't exist"
}
```

---
