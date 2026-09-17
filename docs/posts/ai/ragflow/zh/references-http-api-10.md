# HTTP API 参考（第 10 部分）

## 文件管理

---

### 上传文件

**POST** `/api/v1/files`

向系统上传一个或多个文件。

:::warning 已弃用
`POST /api/v1/file/upload` 已弃用，请改用本端点。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 表单：
  - `'file=@{FILE_PATH}'`
  - `'parent_id'`: `string`（可选）

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf' \
     --form 'parent_id={workspace_id}'
```

##### 请求参数

- `'file'`：（*表单参数*），`file`，*必填*
  要上传的文件。单个请求可上传多个文件。
- `'parent_id'`：（*表单参数*），`string`
  上传文件的目标父文件夹 ID。若未指定，文件将上传到根文件夹。

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "id": "b330ec2e91ec11efbc510242ac120004",
            "name": "test1.txt",
            "size": 17966,
            "type": "doc",
            "parent_id": "527fa74891e811ef9c650242ac120006",
            "location": "test1.txt",
            "create_time": 1729763127646
        }
    ]
}
```

失败：

```json
{
    "code": 400,
    "message": "No file part!"
}
```

---

### 上传文档

**POST** `/api/v1/documents/upload`

上传文件并创建相应的文档。

:::warning 已弃用
`POST /v1/document/upload_info` 与 `POST /api/v1/file/upload_info` 已弃用，请改用本端点。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/documents/upload`
- 请求头：
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 表单：
  - `'file=@{FILE_PATH}'`（与 `url` 互斥）
- 查询参数：
  - `url`: 要抓取并转换为运行时附件的 URL（与 `file` 互斥）。

##### 请求示例

上传本地文件：

```bash
curl --request POST \
     --url http://{address}/api/v1/documents/upload \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.pdf'
```

抓取 URL：

```bash
curl --request POST \
     --url 'http://{address}/api/v1/documents/upload?url=https://example.com/page' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `'file'`：（*表单参数*），`file`，*可选*
  要上传的文件。与 `url` 互斥；必须提供 `file` 或 `url` 之一。
- `url`：（*查询参数*），`string`，*可选*
  要抓取并存储为附件的 URL。与 `file` 互斥；必须提供 `url` 或 `file` 之一。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
      "created_at": 1772451421.7924063,
      "created_by": "be951084066611f18f5f00155d2f98f4",
      "extension": "pdf",
      "id": "2143a03d162c11f1b80f00155d334d02",
      "mime_type": "application/pdf",
      "name": "test1.pdf",
      "preview_url": null,
      "size": 49705
    },
    "message": "success"
}
```

失败：

```json
{
    "code": 400,
    "message": "Provide either multipart file(s) or ?url=...!"
}
```

---

### 下载附件

**GET** `/api/v1/agents/attachments/{attachment_id}/download`

:::warning 已弃用
之前的端点 `GET /v1/document/download/{doc_id}` 与 `GET /api/v1/document/download/{doc_id}` 已弃用，请改用本端点。
:::

下载此前上传供 Agent 系统使用的运行时附件。

#### 请求

- 方法：GET
- URL：`/api/v1/agents/attachments/{attachment_id}/download`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `ext`: `string`（可选）

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/attachments/{attachment_id}/download?ext=pdf' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_attachment.pdf
```

##### 请求参数

- `attachment_id`：（*路径参数*），`string`，*必填*
  要下载其文件的附件 ID。
- `ext`：（*查询参数*），`string`，*可选*
  文件扩展名提示，用于指定响应的 Content-Type。默认值为 `"markdown"`。可用值：
  - `"markdown"`
  - `"html"`
  - `"pdf"`
  - `"docx"`
  - `"xlsx"`
  - `"csv"`

#### 响应

成功：

以二进制流形式返回文件内容，并附带相应的 Content-Type 响应头。

失败：

```json
{
    "code": 500,
    "message": "Internal server error"
}
```

---

### 创建文件或文件夹

**POST** `/api/v1/files`

在系统中创建新文件或文件夹。

:::warning 已弃用
`POST /api/v1/file/create` 已弃用，请改用本端点。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"parent_id"`: `string`（可选）
  - `"type"`: `string`

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "name": "New Folder",
          "type": "folder",
          "parent_id": "{workspace_id}"
     }'
```

##### 请求参数

- `"name"`：（*请求体参数*），`string`，*必填*
  要创建的文件或文件夹的名称。
- `"parent_id"`：（*请求体参数*），`string`
  父文件夹 ID。若未指定，文件/文件夹将在根文件夹中创建。
- `"type"`：（*请求体参数*），`string`
  要创建的文件类型。可用选项：
  - `"folder"`: 创建文件夹
  - `"virtual"`: 创建虚拟文件

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "id": "b330ec2e91ec11efbc510242ac120004",
        "name": "New Folder",
        "type": "folder",
        "parent_id": "527fa74891e811ef9c650242ac120006",
        "size": 0,
        "create_time": 1729763127646
    }
}
```

失败：

```json
{
    "code": 409,
    "message": "Duplicated folder name in the same folder."
}
```

---

### 列出文件

**GET** `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`

列出指定文件夹下的文件和文件夹。

:::warning 已弃用
`GET /api/v1/file/list` 已弃用，请改用本端点。
:::

#### 请求

- 方法：GET
- URL：`/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files?parent_id={folder_id}&page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `parent_id`：（*过滤参数*），`string`
  要列出文件的文件夹 ID。若未指定，默认使用根文件夹。
- `keywords`：（*过滤参数*），`string`
  按名称过滤文件的搜索关键词。
- `page`：（*过滤参数*），`integer`
  指定显示文件的页码。默认值为 `1`。
- `page_size`：（*过滤参数*），`integer`
  每页的文件数量。默认值为 `15`。
- `orderby`：（*过滤参数*），`string`
  文件排序所依据的字段。可用选项：
  - `create_time`（默认）
- `desc`：（*过滤参数*），`boolean`
  指示检索到的文件是否按降序排列。默认值为 `true`。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "total": 10,
        "files": [
            {
                "id": "b330ec2e91ec11efbc510242ac120004",
                "name": "test1.txt",
                "type": "doc",
                "size": 17966,
                "parent_id": "527fa74891e811ef9c650242ac120006",
                "create_time": 1729763127646
            }
        ],
        "parent_folder": {
            "id": "527fa74891e811ef9c650242ac120006",
            "name": "Parent Folder"
        }
    }
}
```

失败：

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### 获取父文件夹

**GET** `/api/v1/files/{file_id}/parent`

获取指定文件的直接父文件夹信息。

:::warning 已弃用
`GET /api/v1/file/parent_folder?file_id=...` 已弃用，请改用本端点。
:::

#### 请求

- 方法：GET
- URL：`/api/v1/files/{file_id}/parent`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/parent' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `file_id`：（*路径参数*），`string`，*必填*
  要获取其直接父文件夹的文件 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "parent_folder": {
            "id": "527fa74891e811ef9c650242ac120006",
            "name": "Parent Folder"
        }
    }
}
```

失败：

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### 获取所有父文件夹

**GET** `/api/v1/files/{file_id}/ancestors`

获取指定文件在文件夹层级中的所有父文件夹。

:::warning 已弃用
`GET /api/v1/file/all_parent_folder?file_id=...` 已弃用，请改用本端点。
:::

#### 请求

- 方法：GET
- URL：`/api/v1/files/{file_id}/ancestors`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/ancestors' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `file_id`：（*路径参数*），`string`，*必填*
  要获取其父文件夹的文件 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "parent_folders": [
            {
                "id": "527fa74891e811ef9c650242ac120006",
                "name": "Parent Folder 1"
            },
            {
                "id": "627fa74891e811ef9c650242ac120007",
                "name": "Parent Folder 2"
            }
        ]
    }
}
```

失败：

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### 删除文件

**DELETE** `/api/v1/files`

删除一个或多个文件或文件夹。

:::warning 已弃用
`POST /api/v1/file/rm` 已弃用，请改用本端点。
:::

#### 请求

- 方法：DELETE
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`

##### 请求示例

```bash
curl --request DELETE \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "ids": ["file_id_1", "file_id_2"]
     }'
```

##### 请求参数

- `"ids"`：（*请求体参数*），`list[string]`，*必填*
  要删除的文件或文件夹的 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "success_count": 2
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "Partially deleted 1 files with 1 errors",
    "data": {
        "success_count": 1,
        "errors": [
            "No authorization for file file1"
        ]
    }
}
```

---

### 下载文件

**GET** `/api/v1/files/{file_id}`

从系统下载文件。

:::warning 已弃用
`GET /api/v1/file/get/{file_id}` 已弃用，请改用本端点。
:::

#### 请求

- 方法：GET
- URL：`/api/v1/files/{file_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/files/{file_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_file.txt
```

##### 请求参数

- `file_id`：（*路径参数*），`string`，*必填*
  要下载的文件 ID。

#### 响应

成功：

以二进制流形式返回文件内容，并附带适当的 Content-Type 响应头。

失败：

```json
{
    "code": 404,
    "message": "document not found"
}
```

---

### 移动或重命名文件

**POST** `/api/v1/files/move`

移动和/或重命名文件或文件夹。遵循 Linux `mv` 语义：`dest_file_id` 与 `new_name` 至少提供其一。

:::warning 已弃用
之前的端点 `POST /api/v1/file/mv` 与 `POST /api/v1/file/rename` 已弃用，请改用本端点。
:::

- 仅提供 `dest_file_id`：将文件移动到新文件夹，名称保持不变。
- 仅提供 `new_name`：就地重命名单个文件或文件夹，不涉及存储操作。
- 两者同时提供：移动并重命名。

#### 请求

- 方法：POST
- URL：`/api/v1/files/move`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"src_file_ids"`: `list[string]`，*必填*
  - `"dest_file_id"`: `string`，*可选*
  - `"new_name"`: `string`，*可选*

##### 请求示例

将文件移动到文件夹：

```bash
curl --request POST \
     --url http://{address}/api/v1/files/move \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "src_file_ids": ["file_id_1", "file_id_2"],
          "dest_file_id": "{destination_folder_id}"
     }'
```

就地重命名文件：

```bash
curl --request POST \
     --url http://{address}/api/v1/files/move \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "src_file_ids": ["{file_id}"],
          "new_name": "new_name.txt"
     }'
```

##### 请求参数

- `"src_file_ids"`：（*请求体参数*），`list[string]`，*必填*
  要移动或重命名的文件或文件夹的 ID。
- `"dest_file_id"`：（*请求体参数*），`string`，*可选*
  目标文件夹的 ID。省略则就地重命名。
- `"new_name"`：（*请求体参数*），`string`，*可选*
  文件或文件夹的新名称。仅当 `src_file_ids` 只包含一个条目时有效。注意：*不*支持更改文件扩展名。

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
    "code": 404,
    "message": "File or Folder not found!"
}
```

或

```json
{
    "code": 404,
    "message": "Parent folder not found!"
}
```

或

```json
{
    "code": 400,
    "message": "The extension of file can't be changed"
}
```

---

### 将文件关联到数据集并转换为文档

**POST** `/api/v1/files/link-to-datasets`

将文件转换为文档，并关联到指定数据集。

:::warning 已弃用
`POST /api/v1/file/convert` 已弃用，请改用本端点。
:::

#### 请求

- 方法：POST
- URL：`/api/v1/files/link-to-datasets`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"file_ids"`: `list[string]`
  - `"kb_ids"`: `list[string]`

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/files/link-to-datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "file_ids": ["file_id_1", "file_id_2"],
          "kb_ids": ["dataset_id_1", "dataset_id_2"]
     }'
```

##### 请求参数

- `"file_ids"`：（*请求体参数*），`list[string]`，*必填*
  要转换的文件 ID。若提供的是文件夹 ID，该文件夹内的所有文件都会被转换。
- `"kb_ids"`：（*请求体参数*），`list[string]`，*必填*
  目标数据集的 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "id": "file2doc_id_1",
            "file_id": "file_id_1",
            "document_id": "document_id_1"
        }
    ]
}
```

失败：

```json
{
    "code": 404,
    "message": "File not found!"
}
```

或

```json
{
    "code": 404,
    "message": "Can't find this dataset!"
}
```

---

### 创建提交

**POST** `/api/v1/workspaces/{workspace_id}/commits`

为指定工作区创建新的快照提交。
本端点还支持：
- `/api/v1/datasets/{dataset_id}/commits`（会将数据集解析为其所属工作区）

#### 请求

- 方法：POST
- URL：`/api/v1/workspaces/{workspace_id}/commits`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `'message'`: `string`（必填）
    提交信息。
  - `'files'`: `list[object]`（必填）
    文件变更列表。每个文件变更是一个包含以下字段的对象：

##### 请求示例

```bash
curl --request POST \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "message": "update config files",
          "files": [
               {"file_id": "file_uuid", "file_name": "config.json", "operation": "modify", "content": "{\"key\": \"value\"}"},
               {"file_id": "file_uuid", "file_name": "readme.md", "operation": "add", "content": "# New README"}
          ]
     }'
```

##### 请求参数

- `"message"`：（*请求体参数*），`string`，*必填*
  描述本次变更的提交信息。
- `"files"`：（*请求体参数*），`list[object]`，*必填*
  每个文件变更对象支持以下字段：

  | 字段 | 类型 | 必填 | 说明 |
  |-------|------|----------|-------------|
  | `file_id` | `string` | 是 | 文件 ID |
  | `file_name` | `string` | 仅 add/rename 时需要 | 文件名 |
  | `operation` | `string` | 是 | `"add"`、`"modify"`、`"delete"` 或 `"rename"` |
  | `content` | `string` | 仅 add/modify 时需要 | 文件内容 |
  | `old_name` | `string` | 仅 rename 时需要 | 旧文件名 |
  | `new_name` | `string` | 仅 rename 时需要 | 新文件名 |

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "id": "commit_uuid",
        "folder_id": "folder_uuid",
        "parent_id": null,
        "message": "update config files",
        "author_id": "user_uuid",
        "file_count": 2,
        "tree_state": "{\"file_uuid\": {\"hash\": \"abcd1234\", \"location\": \".objects/abcd1234\", \"name\": \"config.json\", \"size\": 1024, \"status\": \"1\", \"parent_id\": \"folder_uuid\"}}",
        "create_time": 1718200000000
    }
}
```

:::info
`tree_state` 是一个 JSON 字符串，包含文件条目的扁平映射。每个条目都带有 `parent_id`，用于记录提交时该文件所属的子文件夹。子文件夹结构由 `parent_id` 的值推导得出。
:::

失败：

```json
{
    "code": 101,
    "message": "required argument are missing: message"
}
```

---

### 列出提交

**GET** `/api/v1/workspaces/{workspace_id}/commits`

列出指定文件夹的所有提交，支持分页。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `'page'`: `int`（可选，默认值：1）
  - `'page_size'`: `int`（可选，默认值：15）
  - `'order_by'`: `string`（可选，默认值：`"create_time"`）
  - `'desc'`: `bool`（可选，默认值：`true`）

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits?page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `"page"`：（*查询参数*），`int`，*可选*
  页码。默认值为 1。
- `"page_size"`：（*查询参数*），`int`，*可选*
  每页的条目数量。默认值为 15。
- `"order_by"`：（*查询参数*），`string`，*可选*
  排序字段。默认值为 `"create_time"`。
- `"desc"`：（*查询参数*），`bool`，*可选*
  是否按降序排序。默认值为 `true`。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "total": 2,
        "page": 1,
        "page_size": 15,
        "commits": [
            {
                "id": "commit_uuid",
                "folder_id": "folder_uuid",
                "parent_id": null,
                "message": "first commit",
                "author_id": "user_uuid",
                "file_count": 3,
                "create_time": 1718200000000
            }
        ]
    }
}
```

---

### 获取提交

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`

获取指定提交的详细信息，包括其文件变更。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `"folder_id"`：（*路径参数*），`string`，*必填*
  文件夹 ID。
- `"commit_id"`：（*路径参数*），`string`，*必填*
  提交 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "id": "commit_uuid",
        "folder_id": "folder_uuid",
        "parent_id": null,
        "message": "added config files",
        "author_id": "user_uuid",
        "file_count": 2,
        "create_time": 1718200000000,
        "files": [
            {
                "file_id": "file_uuid",
                "operation": "add",
                "old_hash": null,
                "new_hash": "abcd1234",
                "old_name": null,
                "new_name": null
            }
        ]
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
}
```

---

### 列出提交文件

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`

列出与指定提交关联的文件变更。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "id": "item_uuid",
            "file_id": "file_uuid",
            "operation": "add",
            "old_hash": null,
            "new_hash": "abcd1234",
            "old_location": null,
            "new_location": ".objects/abcd1234",
            "old_name": null,
            "new_name": null
        }
    ]
}
```

---

### 比较提交

**GET** `/api/v1/workspaces/{workspace_id}/commits/diff?from={commit_id}&to={commit_id}`

比较两个提交并返回差异。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/diff?from=...&to=...`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/diff`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `'from'`: `string`（必填）
    源提交 ID。
  - `'to'`: `string`（必填）
    目标提交 ID。

##### 请求示例

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits/diff?from=from_commit_id&to=to_commit_id' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### 请求参数

- `"from"`：（*查询参数*），`string`，*必填*
  源提交 ID。
- `"to"`：（*查询参数*），`string`，*必填*
  目标提交 ID。

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "file_id": "file_uuid",
            "file_name": "config.json",
            "operation": "modify",
            "old_hash": "abc123",
            "new_hash": "def456",
            "old_location": ".objects/abc123",
            "new_location": ".objects/def456"
        }
    ]
}
```

失败：

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
}
```

---

### 获取未提交的更改

**GET** `/api/v1/workspaces/{workspace_id}/changes`

返回指定文件夹的未提交更改（类似 `git status`）。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/changes`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/changes`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/changes \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "file_id": "file_uuid",
            "file_name": "new.txt",
            "operation": "add"
        },
        {
            "file_id": "file_uuid",
            "file_name": "config.json",
            "operation": "modify"
        },
        {
            "file_id": "file_uuid",
            "file_name": "old.md",
            "operation": "delete"
        }
    ]
}
```

---

### 获取提交树

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`

获取特定提交时点的完整文件夹树快照。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/tree`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "id": "folder_uuid",
        "name": "workspace_name",
        "type": "folder",
        "children": [
            {
                "id": "file_uuid",
                "name": "config.json",
                "type": "file",
                "hash": "abcd1234",
                "size": 1024,
                "status": "1",
                "location": ".objects/abcd1234"
            },
            {
                "id": "sub_folder_uuid",
                "name": "sub_folder_name",
                "type": "folder",
                "children": [
                    {
                        "id": "file_uuid_2",
                        "name": "nested.txt",
                        "type": "file",
                        "hash": "ef5678",
                        "size": 512,
                        "status": "1",
                        "location": ".objects/ef5678"
                    }
                ]
            }
        ]
    }
}
```

---

### 获取提交文件内容

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`

获取文件在特定提交时点的内容。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files/{file_id}/content`

#### 请求

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### 响应

成功：

```json
{
    "code": 0,
    "data": {
        "content": "file content as it existed in that commit"
    }
}
```

失败：

```json
{
    "code": 102,
    "message": "File not found in this commit"
}
```

---

### 获取工作区文件版本历史

**GET** `/api/v1/workspace-files/{file_id}/versions`

返回指定文件在所有提交中的版本历史。

#### 请求

- 方法：GET
- URL：`/api/v1/workspace-files/{file_id}/versions`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### 请求示例

```bash
curl --request GET \
     --url http://{address}/api/v1/workspace-files/{file_id}/versions \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### 响应

成功：

```json
{
    "code": 0,
    "data": [
        {
            "commit_id": "commit_uuid",
            "operation": "modify",
            "hash": "def456",
            "create_time": 1718200000000,
            "message": "updated file"
        },
        {
            "commit_id": "commit_uuid",
            "operation": "add",
            "hash": "abc123",
            "create_time": 1718100000000,
            "message": "initial commit"
        }
    ]
}
```

---
