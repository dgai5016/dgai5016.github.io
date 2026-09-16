# HTTP API 参考（第 7 部分）

## Agent 管理

---

### 列出 Agent

**GET** `/api/v1/agents`

列出当前用户可访问的 Agent 及编译模板组。

#### 请求

- 方法：GET
- URL：`/api/v1/agents`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents?page=1&page_size=30&orderby=create_time&desc=true&keywords=example' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `page`：（*过滤参数*），`integer`
  指定显示 Agent 的页码。默认为 `1`。
- `page_size`：（*过滤参数*），`integer`
  每页的 Agent 数量。默认为 `30`。
- `orderby`：（*过滤参数*），`string`
  结果排序所依据的属性。可用选项：
  - `create_time`（默认）
  - `update_time`
- `desc`：（*过滤参数*），`boolean`
  指示检索到的 Agent 是否应按降序排序。默认为 `true`。
- `keywords`：（*过滤参数*），`string`
  按标题模糊搜索 Agent。
- `canvas_category`：（*过滤参数*），`string`
  按一个或多个逗号分隔的画布类别过滤 Agent。
- `canvas_type`：（*过滤参数*），`string`
  按画布类型过滤 Agent。
- `owner_ids`：（*过滤参数*），`string`
  按逗号分隔的已授权所有者 ID 过滤 Agent。
- `tags`：（*过滤参数*），`string`
  按逗号分隔的标签过滤 Agent。

#### 响应

成功：

```json
{
  "code": 0,
  "data": {
    "canvas": [
      {
        "avatar": null,
        "canvas_category": "agent_canvas",
        "canvas_type": "",
        "description": null,
        "id": "d12e0f02a13c11f19804611a4dfe1a85",
        "nickname": "test",
        "permission": "me",
        "release_time": null,
        "tags": "",
        "tenant_avatar": null,
        "tenant_id": "fc117a7ea10011f1b894bf34cf9cba96",
        "title": "111",
        "type": "agent",
        "update_time": 1787741800476
      }
    ],
    "total": 1
  },
  "message": "success"
}
```

##### 响应字段

- `data`: `object`
  结果容器。
- `data.canvas`: `list[object]`
  由 Agent 与（若适用）编译模板组构成的列表。
- `data.canvas[].type`: `string`
  条目类型：
  - `agent`: 一个 Agent。
  - `compilation_template_group`: 一个编译模板组。
- `data.total`: `integer`
  分页前匹配条目的总数。
- `message`: `string`
  结果消息。

---

### 创建 Agent

**POST** `/api/v1/agents`

创建 Agent。

#### 请求

- 方法：POST
- URL：`/api/v1/agents`
- 请求头：
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/agents \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
         "title": "Test Agent",
         "description": "A test agent",
         "dsl": {
           // ... Canvas DSL here ...
         }
     }'
```

##### 请求参数

- `title`：（*请求体参数*），`string`，*必填*
  Agent 的标题。
- `description`：（*请求体参数*），`string`
  Agent 的描述。默认为 `None`。
- `dsl`：（*请求体参数*），`object`，*必填*
  Agent 的画布 DSL 对象。

#### 响应

成功：

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

失败：

```json
{
    "code": 102,
    "message": "Agent with title test already exists."
}
```

---

### 更新 Agent

**PUT** `/api/v1/agents/{agent_id}`

按 id 更新 Agent。

#### 请求

- 方法：PUT
- URL：`/api/v1/agents/{agent_id}`
- 请求头：
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

##### 请求示例

```bash
curl --request PUT \
     --url http://{address}/api/v1/agents/58af890a2a8911f0a71a11b922ed82d6 \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
         "title": "Test Agent",
         "description": "A test agent",
         "dsl": {
           // ... Canvas DSL here ...
         }
     }'
```

##### 请求参数

- `agent_id`：（*路径参数*），`string`
  待更新 Agent 的 id。
- `title`：（*请求体参数*），`string`
  Agent 的标题。
- `description`：（*请求体参数*），`string`
  Agent 的描述。
- `dsl`：（*请求体参数*），`object`
  Agent 的画布 DSL 对象。

请求体中只需指定你要修改的参数。若某参数不存在或为 `None`，则不会被更新。

#### 响应

成功：

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

失败：

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

---

### 删除 Agent

**DELETE** `/api/v1/agents/{agent_id}`

按 id 删除 Agent。

#### 请求

- 方法：DELETE
- URL：`/api/v1/agents/{agent_id}`
- 请求头：
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/58af890a2a8911f0a71a11b922ed82d6 \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{}'
```

##### 请求参数

- `agent_id`：（*路径参数*），`string`
  待删除 Agent 的 id。

#### 响应

成功：

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

失败：

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

---
