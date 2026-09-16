# HTTP API Reference (Part 11)

## SEARCH APP MANAGEMENT

### Create search app

**POST** `/api/v1/searches`

Creates a search app.

#### Request

- Method: POST
- URL: `/api/v1/searches`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:

```json
{
    "name": "my_search_app",
    "description": "optional description"
}
```

##### Request example

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

##### Request parameters

- `"name"`: (*Body parameter*), `string`, *Required*
  The name of the search app. Must be unique and no longer than 255 characters.
- `"description"`: (*Body parameter*), `string`
  A brief description of the search app.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "search_id": "b330ec2e91ec11efbc510242ac120006"
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "Search name can't be empty."
}
```

---

### List search apps

**GET** `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`

Lists search apps for the current user.

#### Request

- Method: GET
- URL: `/api/v1/searches?keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&owner_ids={owner_ids}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches?page=1&page_size=20' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

#### Response

Success:

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

### Get search app

**GET** `/api/v1/searches/{search_id}`

Gets the details of a search app.

#### Request

- Method: GET
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to retrieve.

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "Can't find this Search App!"
}
```

---

### Update search app

**PUT** `/api/v1/searches/{search_id}`

Updates a search app.

#### Request

- Method: PUT
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:

```json
{
    "name": "updated_name",
    "search_config": {"top_k": 5}
}
```

##### Request example

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

##### Request parameters

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to update.
- `"name"`: (*Body parameter*), `string`, *Required*
  The new name of the search app.
- `"search_config"`: (*Body parameter*), `object`, *Required*
  Configuration fields to update. Merged with the existing config.

#### Response

Success:

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

Failure:

```json
{
    "code": 109,
    "message": "no authorization"
}
```

---

### Delete search app

**DELETE** `/api/v1/searches/{search_id}`

Deletes a search app.

#### Request

- Method: DELETE
- URL: `/api/v1/searches/{search_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request DELETE \
     --url 'http://{address}/api/v1/searches/b330ec2e91ec11efbc510242ac120006' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app to delete.

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
    "code": 109,
    "message": "no authorization"
}
```

---

### Search completion

**POST** `/api/v1/searches/{search_id}/completions`

Generates an answer using the saved search app configuration and returns the result as a Server-Sent Events stream.

#### Request

- Method: POST
- URL: `/api/v1/searches/{search_id}/completions`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_LOGIN_TOKEN>'`
- Body:
  - `"question"`: `string` *(Required)* The user question.
  - `"kb_ids"`: `list[string]` *(Optional)* Fallback dataset IDs. Used only when the search app config does not already define `kb_ids`.

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/searches/{search_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_LOGIN_TOKEN>' \
     --data '{
         "question": "What is retrieval-augmented generation?"
     }'
```

##### Request parameters

- `search_id`: (*Path parameter*), `string`, *Required*
  The ID of the search app.
- `"question"`: (*Body parameter*), `string`, *Required*
  The user question.
- `"kb_ids"`: (*Body parameter*), `list[string]`
  Optional fallback dataset IDs when the search app config does not define them.

#### Response

Success (streaming):

```text
data: {"code": 0, "message": "", "data": {"answer": "...", "reference": {...}}}

data: {"code": 0, "message": "", "data": true}
```

Failure:

```json
{
    "code": 109,
    "message": "no authorization"
}
```
