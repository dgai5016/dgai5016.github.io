# HTTP API 参考（第 9 部分）

## 系统

---

### 检查系统健康

**GET** `/api/v1/system/healthz`

检查 RAGFlow 各依赖项（数据库、Redis、文档引擎、对象存储）的健康状态。

:::warning 已弃用
`GET /v1/system/healthz` 已弃用，请改用本端点。
:::

#### 请求

- 方法：GET
- URL：`/api/v1/system/healthz`
- 请求头：
  - 'Content-Type: application/json'
  （无需 Authorization）

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/system/healthz \
     --header 'Content-Type: application/json'
```

##### 请求参数

- `address`：（*路径参数*），string
  后端服务的主机和端口（例如 `localhost:9380`）。

---

#### 响应

- **200 OK** —— 所有服务正常

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

- **500 Internal Server Error** —— 至少一个服务异常

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

说明：

- 每个服务的状态报告为 "ok" 或 "nok"。
- 顶层 `status` 反映整体健康状况。
- 若任一服务为 "nok"，详细错误信息会出现在 `_meta` 中。

---
