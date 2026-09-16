# HTTP API 参考（第 11 部分）

## 搜索应用管理

### 创建搜索应用

**POST** `/api/v1/searches`

创建搜索应用。

#### 请求

- 方法：POST
- URL：`/api/v1/searches`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：

```json
{
    "name": "my_search_app",
    "description": "optional description"
}
```

##### 请求示例

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

##### 请求参数

- `"name"`:（*请求体参数*），`string`，*必填*
  搜索应用的名称。必须唯一，且不超过 255 个字符。
- `"description"`:（*请求体参数*），`string`
  搜索应用的简短描述。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "search_id": "b330ec2e91ec11efbc510242ac120006"
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "Search name can't be empty."
}
```

---

### 列出搜索应用

**GET** `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`

列出当前用户的搜索应用。

#### 请求

- 方法：GET
- URL：`/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches?page=1&page_size=20' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

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

#### 响应

成功：

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

---

### 获取搜索应用

**GET** `/api/v1/searches/{search_id}`

获取搜索应用的详细信息。

#### 请求

- 方法：GET
- URL：`/api/v1/searches/{search_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `search_id`:（*路径参数*），`string`，*必填*
  要获取的搜索应用 ID。

#### 响应

成功：

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

失败：

```json
{
    "code": 102,
    "message": "Can't find this Search App!"
}
```

---

### 更新搜索应用

**PUT** `/api/v1/searches/{search_id}`

更新搜索应用。

#### 请求

- 方法：PUT
- URL：`/api/v1/searches/{search_id}`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：

```json
{
    "name": "updated_name",
    "search_config": {"top_k": 5}
}
```

##### 请求示例

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

##### 请求参数

- `search_id`:（*路径参数*），`string`，*必填*
  要更新的搜索应用 ID。
- `"name"`:（*请求体参数*），`string`，*必填*
  搜索应用的新名称。
- `"search_config"`:（*请求体参数*），`object`，*必填*
  要更新的配置字段。与现有配置合并。

#### 响应

成功：

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

失败：

```json
{
    "code": 109,
    "message": "no authorization"
}
```

---

### 删除搜索应用

**DELETE** `/api/v1/searches/{search_id}`

删除搜索应用。

#### 请求

- 方法：DELETE
- URL：`/api/v1/searches/{search_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request DELETE \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `search_id`:（*路径参数*），`string`，*必填*
  要删除的搜索应用 ID。

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
    "code": 109,
    "message": "no authorization"
}
```

---

### 搜索补全

**POST** `/api/v1/searches/{search_id}/completions`

使用已保存的搜索应用配置生成回答，并以 Server-Sent Events 流的形式返回结果。

#### 请求

- 方法：POST
- URL：`/api/v1/searches/{search_id}/completions`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- 请求体：
  - `"question"`: `string` *（必填）* 用户的问题。
  - `"kb_ids"`: `list[string]` *（可选）* 备选数据集 ID。仅当搜索应用配置中未定义 `kb_ids` 时使用。

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/searches/{search_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
         "question": "What is retrieval-augmented generation?"
     }'
```

##### 请求参数

- `search_id`:（*路径参数*），`string`，*必填*
  搜索应用的 ID。
- `"question"`:（*请求体参数*），`string`，*必填*
  用户的问题。
- `"kb_ids"`:（*请求体参数*），`list[string]`
  可选的备选数据集 ID，仅在搜索应用配置未定义时使用。

#### 响应

成功（流式）：

```text
data: {"code": 0, "message": "", "data": {"answer": "...", "reference": {...}}}

data: {"code": 0, "message": "", "data": true}
```

失败：

```json
{
    "code": 109,
    "message": "no authorization"
}
```
