# HTTP API Reference (Part 9)

## System

---

### Check system health

**GET** `/api/v1/system/healthz`

Check the health status of RAGFlow's dependencies (database, Redis, document engine, object storage).

:::caution DEPRECATED
`GET /v1/system/healthz` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: GET
- URL: `/api/v1/system/healthz`
- Headers:
  - 'Content-Type: application/json'
  (no Authorization required)

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/system/healthz \
     --header 'Content-Type: application/json'
```

##### Request parameters

- `address`: (*Path parameter*), string
  The host and port of the backend service (e.g., `localhost:9380`).

---

#### Responses

- **200 OK** – All services healthy

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "db": "ok",
  "redis": "ok",
  "doc_engine": "ok",
  "storage": "ok",
  "status": "ok"
}
```

- **500 Internal Server Error** – At least one service unhealthy

```http
HTTP/1.1 500 INTERNAL SERVER ERROR
Content-Type: application/json

{
  "db": "ok",
  "redis": "nok",
  "doc_engine": "ok",
  "storage": "ok",
  "status": "nok",
  "_meta": {
    "redis": {
      "elapsed": "5.2",
      "error": "Lost connection!"
    }
  }
}
```

Explanation:

- Each service is reported as "ok" or "nok".
- The top-level `status` reflects overall health.
- If any service is "nok", detailed error info appears in `_meta`.

---
