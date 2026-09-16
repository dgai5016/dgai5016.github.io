# HTTP API Reference (Part 7)

## AGENT MANAGEMENT

---

### List agents

**GET** `/api/v1/agents`

Lists agents and compilation template groups accessible to the current user.

#### Request

- Method: GET
- URL: `/api/v1/agents`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents?page=1&page_size=30&orderby=create_time&desc=true&keywords=example' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

#### Response

Success:

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

##### Response fields

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

---

### Create agent

**POST** `/api/v1/agents`

Create an agent.

#### Request

- Method: POST
- URL: `/api/v1/agents`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

##### Request example

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

##### Request parameters

- `title`: (*Body parameter*), `string`, *Required*
  The title of the agent.
- `description`: (*Body parameter*), `string`
  The description of the agent. Defaults to `None`.
- `dsl`: (*Body parameter*), `object`, *Required*
  The canvas DSL object of the agent.

#### Response

Success:

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

Failure:

```json
{
    "code": 102,
    "message": "Agent with title test already exists."
}
```

---

### Update agent

**PUT** `/api/v1/agents/{agent_id}`

Update an agent by id.

#### Request

- Method: PUT
- URL: `/api/v1/agents/{agent_id}`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"title"`: `string`
  - `"description"`: `string`
  - `"dsl"`: `object`

##### Request example

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

##### Request parameters

- `agent_id`: (*Path parameter*), `string`
  The id of the agent to be updated.
- `title`: (*Body parameter*), `string`
  The title of the agent.
- `description`: (*Body parameter*), `string`
  The description of the agent.
- `dsl`: (*Body parameter*), `object`
  The canvas DSL object of the agent.

Only specify the parameter you want to change in the request body. If a parameter does not exist or is `None`, it won't be updated.

#### Response

Success:

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

Failure:

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

---

### Delete agent

**DELETE** `/api/v1/agents/{agent_id}`

Delete an agent by id.

#### Request

- Method: DELETE
- URL: `/api/v1/agents/{agent_id}`
- Headers:
  - `'Content-Type: application/json`
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/agents/58af890a2a8911f0a71a11b922ed82d6 \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{}'
```

##### Request parameters

- `agent_id`: (*Path parameter*), `string`
  The id of the agent to be deleted.

#### Response

Success:

```json
{
    "code": 0,
    "data": true,
    "message": "success"
}
```

Failure:

```json
{
    "code": 103,
    "message": "Only owner of canvas authorized for this operation."
}
```

---
