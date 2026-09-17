<BiRow>
<template #en>

## DATASET MANAGEMENT

</template>
<template #zh>

## 数据集管理

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

### Create dataset

</template>
<template #zh>

### 创建数据集

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/datasets`

</template>
<template #zh>

**POST** `/api/v1/datasets`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a dataset.

</template>
<template #zh>

创建数据集。

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

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/datasets`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
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

</template>
</BiRow>

<BiRow>
<template #en>

##### A basic request example

</template>
<template #zh>

##### 基础请求示例

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
      "name": "test_1"
      }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
      "name": "test_1"
      }'
```

</template>
</BiRow>

<BiRow>
<template #en>

##### A request example specifying ingestion pipeline

</template>
<template #zh>

##### 指定摄取管道的请求示例

</template>
</BiRow>

<BiRow>
<template #en>

:::warning WARNING
You must *not* include `"chunk_method"` or `"parser_config"` when specifying an ingestion pipeline.
:::

</template>
<template #zh>

:::warning 警告
指定摄取管道时，*不得*包含 `"chunk_method"` 或 `"parser_config"`。
:::

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
<template #zh>

- `"name"`：（*请求体参数*），`string`，*必填*
  待创建数据集的唯一名称，必须满足以下要求：
  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符
  - 不区分大小写
- `"avatar"`：（*请求体参数*），`string`
  头像的 Base64 编码。
  - 最多 65535 个字符
- `"description"`：（*请求体参数*），`string`
  待创建数据集的简短描述。
  - 最多 65535 个字符
- `"language"`：（*请求体参数*），`string`
  可选的文档/数据集语言，例如 `"English"` 或 `"Chinese"`。
  首尾空白字符会被去除。
  去除后必须至少包含 1 个字符、最多 32 个字符。该上限按字符数计算，而非 UTF-8 字节数。
  语言取值不受任何受限列表约束。
  若省略，则使用服务器/数据库的默认值。

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

- `"embedding_model"`：（*请求体参数*），`string`
  所用嵌入模型的名称，例如 `"BAAI/bge-large-zh-v1.5@BAAI"`
  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `"permission"`：（*请求体参数*），`string`
  指定谁可以访问待创建的数据集。可用选项：
  - `"me"`：（默认）仅你自己可以管理该数据集。
  - `"team"`：所有团队成员都可以管理该数据集。
- `"chunk_method"`：（*请求体参数*），`enum<string>`
  待创建数据集的默认分块方法，与 `"parse_type"` 和 `"pipeline_id"` 互斥。设置了 `"chunk_method"`，就不要再包含 `"parse_type"` 或 `"pipeline_id"`。
  可用选项：
  - `"naive"`：通用（默认）
  - `"book"`：书籍
  - `"email"`：邮件
  - `"laws"`：法律
  - `"manual"`：手册
  - `"one"`：整篇
  - `"paper"`：论文
  - `"picture"`：图片
  - `"presentation"`：演示文稿
  - `"qa"`：问答
  - `"table"`：表格
  - `"tag"`：标签
- `"parser_config"`：（*请求体参数*），`object`
  数据集解析器的配置项。该 JSON 对象中的属性随所选 `"chunk_method"` 而异：
  - 若 `"chunk_method"` 为 `"naive"`，`"parser_config"` 对象包含以下属性：
    - `"auto_keywords"`: `int`
      - 默认 `0`
      - 最小值：`0`
      - 最大值：`32`
    - `"auto_questions"`: `int`
      - 默认 `0`
      - 最小值：`0`
      - 最大值：`10`
    - `"chunk_token_num"`: `int`
      - 默认 `512`
      - 最小值：`1`
      - 最大值：`2048`
    - `"delimiter"`: `string`
      - 默认 `"\n"`。
    - `"html4excel"`: `bool`
      - 是否将 Excel 文档转换为 HTML 格式。
      - 默认 `false`
    - `"layout_recognize"`: `string`
      - 默认 `DeepDOC`
    - `"tag_kb_ids"`: `array<string>`
      - 使用标签（Tag）分块方法解析的数据集 ID。
      - 设置前请确保已创建并正确配置标签集，详见[使用标签集](https://ragflow.io/docs/dev/use_tag_sets)。
    - `"task_page_size"`: `int`
      - 仅适用于 PDF。
      - 默认 `12`
      - 最小值：`1`
    - `"parent_child"`: `object` 父子分块（parent-child chunking）设置。启用后，每个分块会按 `children_delimiter` 进一步切成更小的子分块。检索时，命中的子分块会先替换为其父分块的完整文本，再传给 LLM，从而在保持精确向量匹配的同时提供更宽的上下文。
      - `"use_parent_child"`: `bool` 是否启用父子分块。默认 `false`。
      - `"children_delimiter"`: `string` 用于把父分块切分成子分块的分隔符。仅在 `"use_parent_child"` 为 `true` 时生效。默认 `"\n"`。
- `"parse_type"`：（*请求体参数*），`int`
  摄取管道的解析类型标识，即你的 **Parser** 组件中解析器的数量。
  - 指定摄取管道时必须提供（与 `"pipeline_id"` 一起）。
  - 指定了 `"chunk_method"` 时不得包含该参数。
- `"pipeline_id"`：（*请求体参数*），`string`
  摄取管道 ID，可在 RAGFlow UI 中对应的 URL 里找到。
  - 指定摄取管道时必须提供（与 `"parse_type"` 一起）。
  - 必须是 32 个字符的小写十六进制字符串，例如 `"d0bebe30ae2211f0970942010a8e0005"`。
  - 指定了 `"chunk_method"` 时不得包含该参数。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning WARNING
You can choose either of the following ingestion options when creating a dataset, but *not* both:

- Use a built-in chunk method -- specify `"chunk_method"` (optionally with `"parser_config"`).
- Use an ingestion pipeline -- specify both `"parse_type"` and `"pipeline_id"`.

If none of `"chunk_method"`, `"parse_type"`, or `"pipeline_id"` are provided, the system defaults to `chunk_method = "naive"`.
:::

</template>
<template #zh>

:::warning 警告
创建数据集时，可以在以下两种摄取方式中任选其一，但*不能*同时使用：

- 使用内置分块方法——指定 `"chunk_method"`（可选搭配 `"parser_config"`）。
- 使用摄取管道——同时指定 `"parse_type"` 和 `"pipeline_id"`。

若 `"chunk_method"`、`"parse_type"`、`"pipeline_id"` 均未提供，系统默认使用 `chunk_method = "naive"`。
:::

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

</template>
<template #zh>

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
    "message": "Field: <name> - Message: <String should have at least 1 character> - Value: <>"
}
```

</template>
<template #zh>

```json
{
    "code": 101,
    "message": "Field: <name> - Message: <String should have at least 1 character> - Value: <>"
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

### Delete datasets

</template>
<template #zh>

### 删除数据集

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/datasets`

</template>
<template #zh>

**DELETE** `/api/v1/datasets`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes datasets by ID.

</template>
<template #zh>

按 ID 删除数据集。

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
- URL: `/api/v1/datasets`
- Headers:
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]` or `null`
  - `"delete_all"`: `boolean`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/datasets`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]` 或 `null`
  - `"delete_all"`: `boolean`

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
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     "ids": ["d94a8dc02c9711f0930f7fbc369eab6d", "e94a8dc02c9711f0930f7fbc369eab6e"]
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     "ids": ["d94a8dc02c9711f0930f7fbc369eab6d", "e94a8dc02c9711f0930f7fbc369eab6e"]
     }'
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/datasets \
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
     --url http://{address}/api/v1/datasets \
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

- `"ids"`: (*Body parameter*), `list[string]` or `null`
  Specifies the datasets to delete:
  - If omitted, or set to `null` or an empty array, no datasets are deleted.
  - If an array of IDs is provided, only the datasets matching those IDs are deleted.
- `"delete_all"`: (*Body parameter*), `boolean`
  Whether to delete all datasets owned by the current user when`"ids"` is omitted, or set to `null` or an empty array. Defaults to `false`.

</template>
<template #zh>

- `"ids"`：（*请求体参数*），`list[string]` 或 `null`
  指定要删除的数据集：
  - 若省略，或设为 `null` 或空数组，则不删除任何数据集。
  - 若提供 ID 数组，则仅删除与这些 ID 匹配的数据集。
- `"delete_all"`：（*请求体参数*），`boolean`
  当 `"ids"` 省略或设为 `null`/空数组时，是否删除当前用户拥有的全部数据集。默认为 `false`。

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
    "code":108,
    "message":"User '<tenant_id>' lacks permission for datasets: '<dataset_ids>'"
}

```

</template>
<template #zh>

```json
{
    "code":108,
    "message":"User '<tenant_id>' lacks permission for datasets: '<dataset_ids>'"
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

### Update dataset

</template>
<template #zh>

### 更新数据集

</template>
</BiRow>

<BiRow>
<template #en>

**PUT** `/api/v1/datasets/{dataset_id}`

</template>
<template #zh>

**PUT** `/api/v1/datasets/{dataset_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Updates configurations for a specified dataset.

</template>
<template #zh>

更新指定数据集的配置。

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

</template>
<template #zh>

- 方法：PUT
- URL：`/api/v1/datasets/{dataset_id}`
- 请求头：
  - `'content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"avatar"`: `string`
  - `"description"`: `string`
  - `"language"`: `string`
  - `"embedding_model"`: `string`
  - `"permission"`: `string`
  - `"chunk_method"`: `string`
  - `"pagerank"`: `int`
  - `"parser_config"`: `object`

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
curl --request PUT \
     --url http://{address}/api/v1/datasets/{dataset_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "updated_dataset"
     }'
```

</template>
<template #zh>

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

</template>
<template #zh>

- `dataset_id`：（*路径参数*）
  待更新数据集的 ID。
- `"name"`：（*请求体参数*），`string`
  数据集修改后的名称。
  - 仅限基本多文种平面（BMP）字符
  - 最多 128 个字符
  - 不区分大小写
- `"avatar"`：（*请求体参数*），`string`
  更新后的头像 Base64 编码。
  - 最多 65535 个字符
- `"embedding_model"`：（*请求体参数*），`string`
  更新后的嵌入模型名称。
  - 更新 `"embedding_model"` 前请确保 `"chunk_count"` 为 `0`。
  - 最多 255 个字符
  - 必须符合 `model_name@model_factory` 格式
- `"language"`：（*请求体参数*），`string`
  可选的文档/数据集语言，例如 `"English"` 或 `"Chinese"`。
  首尾空白字符会被去除。
  去除后必须至少包含 1 个字符、最多 32 个字符。该上限按字符数计算，而非 UTF-8 字节数。
  语言取值不受任何受限列表约束。
  若省略，数据集将保持原有语言不变。
- `"permission"`：（*请求体参数*），`string`
  更新后的数据集权限。可用选项：
  - `"me"`：（默认）仅你自己可以管理该数据集。
  - `"team"`：所有团队成员都可以管理该数据集。
- `"pagerank"`：（*请求体参数*），`int`
  参见[设置 PageRank](https://ragflow.io/docs/dev/set_page_rank)
  - 默认值：`0`
  - 最小值：`0`
  - 最大值：`100`
- `"chunk_method"`：（*请求体参数*），`enum<string>`
  数据集的分块方法。可用选项：
  - `"naive"`：通用（默认）
  - `"book"`：书籍
  - `"email"`：邮件
  - `"laws"`：法律
  - `"manual"`：手册
  - `"one"`：整篇
  - `"paper"`：论文
  - `"picture"`：图片
  - `"presentation"`：演示文稿
  - `"qa"`：问答
  - `"table"`：表格
  - `"tag"`：标签
- `"parser_config"`：（*请求体参数*），`object`
  数据集解析器的配置项。该 JSON 对象中的属性随所选 `"chunk_method"` 而异：
  - 若 `"chunk_method"` 为 `"naive"`，`"parser_config"` 对象包含以下属性：
    - `"auto_keywords"`: `int`
      - 默认 `0`
      - 最小值：`0`
      - 最大值：`32`
    - `"auto_questions"`: `int`
      - 默认 `0`
      - 最小值：`0`
      - 最大值：`10`
    - `"chunk_token_num"`: `int`
      - 默认 `512`
      - 最小值：`1`
      - 最大值：`2048`
    - `"delimiter"`: `string`
      - 默认 `"\n"`。
    - `"html4excel"`: `bool` 是否将 Excel 文档转换为 HTML 格式。
      - 默认 `false`
    - `"layout_recognize"`: `string`
      - 默认 `DeepDOC`
    - `"tag_kb_ids"`: `array<string>` 参见[使用标签集](https://ragflow.io/docs/dev/use_tag_sets)
      - 必须是一个数据集 ID 列表，且每个数据集都使用标签分块方法解析
    - `"task_page_size"`: `int` 仅适用于 PDF。
      - 默认 `12`
      - 最小值：`1`
    - `"parent_child"`: `object` 父子分块（parent-child chunking）设置。启用后，每个分块会按 `children_delimiter` 进一步切成更小的子分块。检索时，命中的子分块会先替换为其父分块的完整文本，再传给 LLM，从而在保持精确向量匹配的同时提供更宽的上下文。
      - `"use_parent_child"`: `bool` 是否启用父子分块。默认 `false`。
      - `"children_delimiter"`: `string` 用于把父分块切分成子分块的分隔符。仅在 `"use_parent_child"` 为 `true` 时生效。默认 `"\n"`。

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
    "message": "Can't change tenant_id."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Can't change tenant_id."
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

### List datasets

</template>
<template #zh>

### 列出数据集

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`

</template>
<template #zh>

**GET** `/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists datasets.

</template>
<template #zh>

列出数据集。

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
- URL: `/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}&include_parsing_status={include_parsing_status}`
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
     --url http://{address}/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/datasets?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets?include_parsing_status=true' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/datasets?include_parsing_status=true' \
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

</template>
<template #zh>

- `page`：（*筛选参数*）
  指定显示数据集的页码。默认为 `1`。
- `page_size`：（*筛选参数*）
  每页的数据集数量。默认为 `30`。
- `orderby`：（*筛选参数*）
  数据集排序所依据的字段。可用选项：
  - `create_time`（默认）
  - `update_time`
- `desc`：（*筛选参数*）
  表示检索出的数据集是否按降序排列。默认为 `true`。
- `name`：（*筛选参数*）
  要检索的数据集名称。
- `id`：（*筛选参数*）
  要检索的数据集 ID。
- `include_parsing_status`：（*筛选参数*）
  是否在响应中包含文档解析状态计数。默认为 `false`。设为 `true` 时，响应中的每个数据集对象会额外包含以下字段：
  - `unstart_count`：尚未开始解析的文档数量。
  - `running_count`：正在解析的文档数量。
  - `cancel_count`：解析已取消的文档数量。
  - `done_count`：已成功解析的文档数量。
  - `fail_count`：解析失败的文档数量。

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Success (with `include_parsing_status=true`):

</template>
<template #zh>

成功（带 `include_parsing_status=true`）：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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
    "message": "The dataset doesn't exist"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "The dataset doesn't exist"
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
