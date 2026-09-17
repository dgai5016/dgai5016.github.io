<BiRow>
<template #en>

## System

</template>
<template #zh>

## 系统

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

### Check system health

</template>
<template #zh>

### 检查系统健康

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/system/healthz`

</template>
<template #zh>

**GET** `/api/v1/system/healthz`

</template>
</BiRow>

<BiRow>
<template #en>

Check the health status of RAGFlow's dependencies (database, Redis, document engine, object storage).

</template>
<template #zh>

检查 RAGFlow 各依赖项（数据库、Redis、文档引擎、对象存储）的健康状态。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`GET /v1/system/healthz` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`GET /v1/system/healthz` 已弃用，请改用本端点。
:::

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
- URL: `/api/v1/system/healthz`
- Headers:
  - 'Content-Type: application/json'
  (no Authorization required)

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/system/healthz`
- 请求头：
  - 'Content-Type: application/json'
  （无需 Authorization）

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
     --url http://{address}/api/v1/system/healthz \
     --header 'Content-Type: application/json'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/system/healthz \
     --header 'Content-Type: application/json'
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

- `address`: (*Path parameter*), string
  The host and port of the backend service (e.g., `localhost:9380`).

</template>
<template #zh>

- `address`：（*路径参数*），string
  后端服务的主机和端口（例如 `localhost:9380`）。

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

#### Responses

</template>
<template #zh>

#### 响应

</template>
</BiRow>

<BiRow>
<template #en>

- **200 OK** – All services healthy

</template>
<template #zh>

- **200 OK** —— 所有服务正常

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

- **500 Internal Server Error** – At least one service unhealthy

</template>
<template #zh>

- **500 Internal Server Error** —— 至少一个服务异常

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Explanation:

</template>
<template #zh>

说明：

</template>
</BiRow>

<BiRow>
<template #en>

- Each service is reported as "ok" or "nok".
- The top-level `status` reflects overall health.
- If any service is "nok", detailed error info appears in `_meta`.

</template>
<template #zh>

- 每个服务的状态报告为 "ok" 或 "nok"。
- 顶层 `status` 反映整体健康状况。
- 若任一服务为 "nok"，详细错误信息会出现在 `_meta` 中。

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
