<BiRow>
<template #en>

## AGENT MANAGEMENT

</template>
<template #zh>

## Agent 管理

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

### List agents

</template>
<template #zh>

### 列出 Agent

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/agents`

</template>
<template #zh>

**GET** `/api/v1/agents`

</template>
</BiRow>

<BiRow>
<template #en>

Lists agents and compilation template groups accessible to the current user.

</template>
<template #zh>

列出当前用户可访问的 Agent 及编译模板组。

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
- URL: `/api/v1/agents`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/agents`
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
     --url 'http://{address}/api/v1/agents?page=1&page_size=30&orderby=create_time&desc=true&keywords=example' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents?page=1&page_size=30&orderby=create_time&desc=true&keywords=example' \
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

- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the agents will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of agents on each page. Defaults to `30`.
- `orderby`: (*Filter parameter*), `string`
  The attribute by which the results are sorted. Available options:
  - `create_time` (default)
  - `update_time`
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved agents should be sorted in descending order. Defaults to `true`.
- `keywords`: (*Filter parameter*), `string`
  Fuzzy-searches agents by title.
- `canvas_category`: (*Filter parameter*), `string`
  Filters agents by one or more comma-separated canvas categories.
- `canvas_type`: (*Filter parameter*), `string`
  Filters agents by canvas type.
- `owner_ids`: (*Filter parameter*), `string`
  Filters agents by comma-separated authorized owner IDs.
- `tags`: (*Filter parameter*), `string`
  Filters agents by comma-separated tags.

</template>
<template #zh>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

##### Response fields

</template>
<template #zh>

##### 响应字段

</template>
</BiRow>

<BiRow>
<template #en>

- `data`: `object`
  The result container.
- `data.canvas`: `list[object]`
  A list of agents and, when applicable, compilation template groups.
- `data.canvas[].type`: `string`
  The item type:
  - `agent`: An agent.
  - `compilation_template_group`: A compilation template group.
- `data.total`: `integer`
  The total number of matched items before pagination.
- `message`: `string`
  The result message.

</template>
<template #zh>

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

### Create agent

</template>
<template #zh>

### 创建 Agent

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/agents`

</template>
<template #zh>

**POST** `/api/v1/agents`

</template>
</BiRow>

<BiRow>
<template #en>

Create an agent.

</template>
<template #zh>

创建 Agent。

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
- URL: `/api/v1/agents`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/agents`
- 请求头：
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

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

</template>
<template #zh>

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

- `title`: (*Body parameter*), `string`, *Required*
  The title of the agent.
- `description`: (*Body parameter*), `string`
  The description of the agent. Defaults to `None`.
- `dsl`: (*Body parameter*), `object`, *Required*
  The canvas DSL object of the agent.

</template>
<template #zh>

- `title`：（*请求体参数*），`string`，*必填*
  Agent 的标题。
- `description`：（*请求体参数*），`string`
  Agent 的描述。默认为 `None`。
- `dsl`：（*请求体参数*），`object`，*必填*
  Agent 的画布 DSL 对象。

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
    "data": true,
    "message": "success"
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": true,
    "message": "success"
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
    "message": "Agent with title test already exists."
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Agent with title test already exists."
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

### Update agent

</template>
<template #zh>

### 更新 Agent

</template>
</BiRow>

<BiRow>
<template #en>

**PUT** `/api/v1/agents/{agent_id}`

</template>
<template #zh>

**PUT** `/api/v1/agents/{agent_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Update an agent by id.

</template>
<template #zh>

按 id 更新 Agent。

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
- URL: `/api/v1/agents/{agent_id}`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

</template>
<template #zh>

- 方法：PUT
- URL：`/api/v1/agents/{agent_id}`
- 请求头：
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

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

</template>
<template #zh>

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

- `agent_id`: (*Path parameter*), `string`
  The id of the agent to be updated.
- `title`: (*Body parameter*), `string`
  The title of the agent.
- `description`: (*Body parameter*), `string`
  The description of the agent.
- `dsl`: (*Body parameter*), `object`
  The canvas DSL object of the agent.

</template>
<template #zh>

- `agent_id`：（*路径参数*），`string`
  待更新 Agent 的 id。
- `title`：（*请求体参数*），`string`
  Agent 的标题。
- `description`：（*请求体参数*），`string`
  Agent 的描述。
- `dsl`：（*请求体参数*），`object`
  Agent 的画布 DSL 对象。

</template>
</BiRow>

<BiRow>
<template #en>

Only specify the parameter you want to change in the request body. If a parameter does not exist or is `None`, it won't be updated.

</template>
<template #zh>

请求体中只需指定你要修改的参数。若某参数不存在或为 `None`，则不会被更新。

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
    "data": true,
    "message": "success"
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": true,
    "message": "success"
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
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

</template>
<template #zh>

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
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

### Delete agent

</template>
<template #zh>

### 删除 Agent

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/agents/{agent_id}`

</template>
<template #zh>

**DELETE** `/api/v1/agents/{agent_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Delete an agent by id.

</template>
<template #zh>

按 id 删除 Agent。

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
- URL: `/api/v1/agents/{agent_id}`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/agents/{agent_id}`
- 请求头：
  - `'Content-Type: application/json`
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
     --url http://{address}/api/v1/agents/58af890a2a8911f0a71a11b922ed82d6 \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{}'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/58af890a2a8911f0a71a11b922ed82d6 \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{}'
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

- `agent_id`: (*Path parameter*), `string`
  The id of the agent to be deleted.

</template>
<template #zh>

- `agent_id`：（*路径参数*），`string`
  待删除 Agent 的 id。

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
    "data": true,
    "message": "success"
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": true,
    "message": "success"
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
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

</template>
<template #zh>

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
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
