<BiRow>
<template #en>

## SEARCH APP MANAGEMENT

</template>
<template #zh>

## 搜索应用管理

</template>
</BiRow>

<BiRow>
<template #en>

### Create search app

</template>
<template #zh>

### 创建搜索应用

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/searches`

</template>
<template #zh>

**POST** `/api/v1/searches`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a search app.

</template>
<template #zh>

创建搜索应用。

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
- URL: `/api/v1/searches`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/searches`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "name": "my_search_app",
    "description": "optional description"
}
```

</template>
<template #zh>

```json
{
    "name": "my_search_app",
    "description": "optional description"
}
```

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
     --url 'http://{address}/api/v1/searches' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "my_search_app",
         "description": "My first search app"
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/searches' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "my_search_app",
         "description": "My first search app"
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
  The name of the search app. Must be unique and no longer than 255 characters.
- `"description"`: (*Body parameter*), `string`
  A brief description of the search app.

</template>
<template #zh>

- `"name"`:（*请求体参数*），`string`，*必填*
  搜索应用的名称。必须唯一，且不超过 255 个字符。
- `"description"`:（*请求体参数*），`string`
  搜索应用的简短描述。

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
        "search_id": "b330ec2e91ec11efbc510242ac120006"
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "search_id": "b330ec2e91ec11efbc510242ac120006"
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
    "message": "Search name can't be empty."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Search name can't be empty."
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

### List search apps

</template>
<template #zh>

### 列出搜索应用

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`

</template>
<template #zh>

**GET** `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists search apps for the current user.

</template>
<template #zh>

列出当前用户的搜索应用。

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
- URL: `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`
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
     --url 'http://{address}/api/v1/searches?page=1&page_size=20' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches?page=1&page_size=20' \
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

- `keywords`: (*Filter parameter*), `string`
  Search keyword to filter search apps by name.
- `page`: (*Filter parameter*), `integer`
  Specifies the page number. Defaults to `1`. Values less than `1` fall back to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of items per page. Defaults to `30`. Values less than `1` fall back to `30`. The maximum value is `100`.
- `orderby`: (*Filter parameter*), `string`
  The field to sort by. Defaults to `create_time`.
- `desc`: (*Filter parameter*), `boolean`
  Whether to sort in descending order. Defaults to `true`.
- `owner_ids`: (*Filter parameter*), `string` (repeatable)
  Filter by owner tenant IDs. Can be specified multiple times: `?owner_ids=id1&owner_ids=id2`.

</template>
<template #zh>

- `keywords`:（*过滤参数*），`string`
  按名称过滤搜索应用的关键词。
- `page`:（*过滤参数*），`integer`
  指定页码。默认值为 `1`。小于 `1` 的值会回退为 `1`。
- `page_size`:（*过滤参数*），`integer`
  每页的条目数量。默认值为 `30`。小于 `1` 的值会回退为 `30`。最大值为 `100`。
- `orderby`:（*过滤参数*），`string`
  排序所依据的字段。默认值为 `create_time`。
- `desc`:（*过滤参数*），`boolean`
  是否按降序排序。默认值为 `true`。
- `owner_ids`:（*过滤参数*），`string`（可重复）
  按所有者租户 ID 过滤。可多次指定：`?owner_ids=id1&owner_ids=id2`。

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
        "total": 2,
        "search_apps": [
            {
                "id": "b330ec2e91ec11efbc510242ac120006",
                "name": "my_search_app",
                "description": "My first search app",
                "tenant_id": "7c8983badede11f083f184ba59bc53c7",
                "create_time": 1729763127646
            }
        ]
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "total": 2,
        "search_apps": [
            {
                "id": "b330ec2e91ec11efbc510242ac120006",
                "name": "my_search_app",
                "description": "My first search app",
                "tenant_id": "7c8983badede11f083f184ba59bc53c7",
                "create_time": 1729763127646
            }
        ]
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

### Get search app

</template>
<template #zh>

### 获取搜索应用

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/searches/{search_id}`

</template>
<template #zh>

**GET** `/api/v1/searches/{search_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Gets the details of a search app.

</template>
<template #zh>

获取搜索应用的详细信息。

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
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/searches/{search_id}`
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
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
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

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to retrieve.

</template>
<template #zh>

- `search_id`:（*路径参数*），`string`，*必填*
  要获取的搜索应用 ID。

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
        "id": "b330ec2e91ec11efbc510242ac120006",
        "name": "my_search_app",
        "description": "My first search app",
        "tenant_id": "7c8983badede11f083f184ba59bc53c7",
        "search_config": {},
        "create_time": 1729763127646
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "id": "b330ec2e91ec11efbc510242ac120006",
        "name": "my_search_app",
        "description": "My first search app",
        "tenant_id": "7c8983badede11f083f184ba59bc53c7",
        "search_config": {},
        "create_time": 1729763127646
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
    "message": "Can't find this Search App!"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Can't find this Search App!"
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

### Update search app

</template>
<template #zh>

### 更新搜索应用

</template>
</BiRow>

<BiRow>
<template #en>

**PUT** `/api/v1/searches/{search_id}`

</template>
<template #zh>

**PUT** `/api/v1/searches/{search_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Updates a search app.

</template>
<template #zh>

更新搜索应用。

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
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:

</template>
<template #zh>

- 方法：PUT
- URL：`/api/v1/searches/{search_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "name": "updated_name",
    "search_config": {"top_k": 5}
}
```

</template>
<template #zh>

```json
{
    "name": "updated_name",
    "search_config": {"top_k": 5}
}
```

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
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "updated_name",
         "search_config": {"top_k": 5}
     }'
```

</template>
<template #zh>

```bash
curl --request PUT \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --header 'Content-Type: application/json' \
     --data '{
         "name": "updated_name",
         "search_config": {"top_k": 5}
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

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to update.
- `"name"`: (*Body parameter*), `string`, *Required*
  The new name of the search app.
- `"search_config"`: (*Body parameter*), `object`, *Required*
  Configuration fields to update. Merged with the existing config.

</template>
<template #zh>

- `search_id`:（*路径参数*），`string`，*必填*
  要更新的搜索应用 ID。
- `"name"`:（*请求体参数*），`string`，*必填*
  搜索应用的新名称。
- `"search_config"`:（*请求体参数*），`object`，*必填*
  要更新的配置字段。与现有配置合并。

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
        "id": "b330ec2e91ec11efbc510242ac120006",
        "name": "updated_name",
        "search_config": {"top_k": 5},
        "create_time": 1729763127646
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "id": "b330ec2e91ec11efbc510242ac120006",
        "name": "updated_name",
        "search_config": {"top_k": 5},
        "create_time": 1729763127646
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
    "code": 109,
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 109,
    "message": "no authorization"
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

### Delete search app

</template>
<template #zh>

### 删除搜索应用

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/searches/{search_id}`

</template>
<template #zh>

**DELETE** `/api/v1/searches/{search_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes a search app.

</template>
<template #zh>

删除搜索应用。

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
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/searches/{search_id}`
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
curl --request DELETE \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
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

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to delete.

</template>
<template #zh>

- `search_id`:（*路径参数*），`string`，*必填*
  要删除的搜索应用 ID。

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
    "code": 109,
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 109,
    "message": "no authorization"
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

### Search completion

</template>
<template #zh>

### 搜索补全

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/searches/{search_id}/completions`

</template>
<template #zh>

**POST** `/api/v1/searches/{search_id}/completions`

</template>
</BiRow>

<BiRow>
<template #en>

Generates an answer using the saved search app configuration and returns the result as a Server-Sent Events stream.

</template>
<template #zh>

使用已保存的搜索应用配置生成回答，并以 Server-Sent Events 流的形式返回结果。

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
- URL: `/api/v1/searches/{search_id}/completions`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The user question.
  - `"kb_ids"`: `list[string]` *(Optional)* Fallback dataset IDs. Used only when the search app config does not already define `kb_ids`.

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/searches/{search_id}/completions`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 用户的问题。
  - `"kb_ids"`: `list[string]` *（可选）* 备选数据集 ID。仅当搜索应用配置中未定义 `kb_ids` 时使用。

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
     --url http://{address}/api/v1/searches/{search_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
         "question": "What is retrieval-augmented generation?"
     }'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/searches/{search_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
         "question": "What is retrieval-augmented generation?"
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

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app.
- `"question"`: (*Body parameter*), `string`, *Required*
  The user question.
- `"kb_ids"`: (*Body parameter*), `list[string]`
  Optional fallback dataset IDs when the search app config does not define them.

</template>
<template #zh>

- `search_id`:（*路径参数*），`string`，*必填*
  搜索应用的 ID。
- `"question"`:（*请求体参数*），`string`，*必填*
  用户的问题。
- `"kb_ids"`:（*请求体参数*），`list[string]`
  可选的备选数据集 ID，仅在搜索应用配置未定义时使用。

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

Success (streaming):

</template>
<template #zh>

成功（流式）：

</template>
</BiRow>

<BiRow>
<template #en>

```text
data: {"code": 0, "message": "", "data": {"answer": "...", "reference": {...}}}

data: {"code": 0, "message": "", "data": true}
```

</template>
<template #zh>

```text
data: {"code": 0, "message": "", "data": {"answer": "...", "reference": {...}}}

data: {"code": 0, "message": "", "data": true}
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
    "code": 109,
    "message": "no authorization"
}
```

</template>
<template #zh>

```json
{
    "code": 109,
    "message": "no authorization"
}
```

</template>
</BiRow>
