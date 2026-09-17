# HTTP API Reference (Part 4)

## CHUNK MANAGEMENT WITHIN DATASET

---

### Add chunk

**POST** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

Adds a chunk to a specified document in a specified dataset.

#### Request

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

##### Request example

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

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "`content` is required"
}
```

---

### List chunks

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`

Lists chunks in a specified document.

#### Request

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks?keywords={keywords}&page={page}&page_size={page_size}&id={chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "you don't own the document 5c5999ec7be811ef9cab0242ac12000e5"
}
```

---

### Get chunk

**GET** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

Retrieves a specified chunk in a specified document. Runtime fields such as vector and token fields are not returned.

#### Request

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `dataset_id`: (*Path parameter*)
  The associated dataset ID.
- `document_id`: (*Path parameter*)
  The associated document ID.
- `chunk_id`: (*Path parameter*)
  The ID of the chunk to retrieve.

#### Response

Success:

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

Failure:

```json
{
    "code": 100,
    "message": "Chunk not found"
}
```

---

### Delete chunks

**DELETE** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

Deletes chunks by ID.

#### Request

- Method: DELETE
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"chunk_ids"`: `list[string]`
  - `"delete_all"`: `boolean`

##### Request example

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

##### Request parameters

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
    "message": "rm_chunk deleted chunks 0, expect 1"
}
```

---

### Update chunk

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}`

Updates content or configurations for a specified chunk.

:::warning DEPRECATED
`PUT /api/v1/datasets/{dataset_id}/documents/{document_id}/chunks/{chunk_id}` is deprecated. Use this endpoint instead.
:::

#### Request

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

##### Request example

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

##### Request parameters

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
    "message": "Can't find this chunk 29a2d9987e16ba331fb4d7d30d99b71d2"
}
```

---

### Update chunk availability

**PATCH** `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`

Updates or switches the availability status of specified chunks, controlling whether they are available for retrieval.

#### Request

- Method: PATCH
- URL: `/api/v1/datasets/{dataset_id}/documents/{document_id}/chunks`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"chunk_ids"`: `list[string]` (*Required*)
  - `"available_int"`: `integer` (*Optional*)
  - `"available"`: `boolean` (*Optional*)

##### Request example

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

##### Request parameters

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

### Retrieve a metadata summary from a dataset

**GET** `/api/v1/datasets/{dataset_id}/metadata/summary`

Aggregates metadata values across all documents in a dataset.

#### Request

- Method: GET
- URL: `/api/v1/datasets/{dataset_id}/metadata/summary`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Response

Success:

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

### Update or delete metadata

**POST** `/api/v1/datasets/{dataset_id}/metadata/update`

Batch update or delete document-level metadata within a specified dataset. If both `document_ids` and `metadata_condition` are omitted, all documents within that dataset are selected. When both are provided, the intersection is used.

#### Request

- Method: POST
- URL: `/api/v1/datasets/{dataset_id}/metadata/update`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `selector`: `object`
  - `updates`: `list[object]`
  - `deletes`: `list[object]`

#### Request parameters

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

##### Request example

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

##### Response

Success:

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

### Retrieve chunks

**POST** `/api/v1/retrieval`

Retrieves chunks from specified datasets.

#### Request

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

##### Request example

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

##### Request parameter

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

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "`dataset_ids` is required."
}
```

---
