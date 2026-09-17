<BiRow>
<template #en>

## FILE MANAGEMENT

</template>
<template #zh>

## 文件管理

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

### Upload file

</template>
<template #zh>

### 上传文件

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/files`

</template>
<template #zh>

**POST** `/api/v1/files`

</template>
</BiRow>

<BiRow>
<template #en>

Uploads one or multiple files to the system.

</template>
<template #zh>

向系统上传一个或多个文件。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/file/upload` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/file/upload` 已弃用，请改用本端点。
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

- Method: POST
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Form:
  - `'file=@{FILE_PATH}'`
  - `'parent_id'`: `string` (optional)

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 表单：
  - `'file=@{FILE_PATH}'`
  - `'parent_id'`: `string`（可选）

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
     --url http://{address}/api/v1/files \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf' \
     --form 'parent_id={workspace_id}'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf' \
     --form 'parent_id={workspace_id}'
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

- `'file'`: (*Form parameter*), `file`, *Required*
  The file(s) to upload. Multiple files can be uploaded in a single request.
- `'parent_id'`: (*Form parameter*), `string`
  The parent folder ID where the file will be uploaded. If not specified, files will be uploaded to the root folder.

</template>
<template #zh>

- `'file'`：（*表单参数*），`file`，*必填*
  要上传的文件。单个请求可上传多个文件。
- `'parent_id'`：（*表单参数*），`string`
  上传文件的目标父文件夹 ID。若未指定，文件将上传到根文件夹。

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

</template>
<template #zh>

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
    "code": 400,
    "message": "No file part!"
}
```

</template>
<template #zh>

```json
{
    "code": 400,
    "message": "No file part!"
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

### Upload document

</template>
<template #zh>

### 上传文档

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/documents/upload`

</template>
<template #zh>

**POST** `/api/v1/documents/upload`

</template>
</BiRow>

<BiRow>
<template #en>

Uploads a file and creates the respective document.

</template>
<template #zh>

上传文件并创建相应的文档。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /v1/document/upload_info` and `POST /api/v1/file/upload_info` are deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /v1/document/upload_info` 与 `POST /api/v1/file/upload_info` 已弃用，请改用本端点。
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

- Method: POST
- URL: `/api/v1/documents/upload`
- Headers:
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Form:
  - `'file=@{FILE_PATH}'` (mutually exclusive with `url`)
- Query:
  - `url`: URL to crawl and convert to a runtime attachment (mutually exclusive with `file`).

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/documents/upload`
- 请求头：
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 表单：
  - `'file=@{FILE_PATH}'`（与 `url` 互斥）
- 查询参数：
  - `url`: 要抓取并转换为运行时附件的 URL（与 `file` 互斥）。

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

Upload a local file:

</template>
<template #zh>

上传本地文件：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url http://{address}/api/v1/documents/upload \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.pdf'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url http://{address}/api/v1/documents/upload \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.pdf'
```

</template>
</BiRow>

<BiRow>
<template #en>

Crawl a URL:

</template>
<template #zh>

抓取 URL：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/documents/upload?url=https://example.com/page' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request POST \
     --url 'http://{address}/api/v1/documents/upload?url=https://example.com/page' \
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

- `'file'`: (*Form parameter*), `file`, *Optional*
  The file to upload. Mutually exclusive with `url`; either `file` or `url` must be provided.
- `url`: (*Query parameter*), `string`, *Optional*
  A URL to crawl and store as an attachment. Mutually exclusive with `file`; either `url` or `file` must be provided.

</template>
<template #zh>

- `'file'`：（*表单参数*），`file`，*可选*
  要上传的文件。与 `url` 互斥；必须提供 `file` 或 `url` 之一。
- `url`：（*查询参数*），`string`，*可选*
  要抓取并存储为附件的 URL。与 `file` 互斥；必须提供 `url` 或 `file` 之一。

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

</template>
<template #zh>

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
    "code": 400,
    "message": "Provide either multipart file(s) or ?url=...!"
}
```

</template>
<template #zh>

```json
{
    "code": 400,
    "message": "Provide either multipart file(s) or ?url=...!"
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

### Download attachment

</template>
<template #zh>

### 下载附件

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/agents/attachments/{attachment_id}/download`

</template>
<template #zh>

**GET** `/api/v1/agents/attachments/{attachment_id}/download`

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
The previous endpoints `GET /v1/document/download/{doc_id}` and `GET /api/v1/document/download/{doc_id}` are deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
之前的端点 `GET /v1/document/download/{doc_id}` 与 `GET /api/v1/document/download/{doc_id}` 已弃用，请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

Downloads a runtime attachment previously uploaded for use in the agent system.

</template>
<template #zh>

下载此前上传供 Agent 系统使用的运行时附件。

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
- URL: `/api/v1/agents/attachments/{attachment_id}/download`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query parameter:
  - `ext`: `string` (Optional)

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/agents/attachments/{attachment_id}/download`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `ext`: `string`（可选）

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
     --url 'http://{address}/api/v1/agents/attachments/{attachment_id}/download?ext=pdf' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_attachment.pdf
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/attachments/{attachment_id}/download?ext=pdf' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_attachment.pdf
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

- `attachment_id`: (*Path parameter*), `string`, *Required*
  The attachment ID whose file should be downloaded.
- `ext`: (*Query parameter*), `string`, *Optional*
  A file extension hint specifying the response's Content-Type. Defaults to `"markdown"`. Available values:
  - `"markdown"`
  - `"html"`
  - `"pdf"`
  - `"docx"`
  - `"xlsx"`
  - `"csv"`

</template>
<template #zh>

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

Returns the file content as a binary stream with the relevant Content-Type header.

</template>
<template #zh>

以二进制流形式返回文件内容，并附带相应的 Content-Type 响应头。

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
    "code": 500,
    "message": "Internal server error"
}
```

</template>
<template #zh>

```json
{
    "code": 500,
    "message": "Internal server error"
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

### Create file or folder

</template>
<template #zh>

### 创建文件或文件夹

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/files`

</template>
<template #zh>

**POST** `/api/v1/files`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a new file or folder in the system.

</template>
<template #zh>

在系统中创建新文件或文件夹。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/file/create` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/file/create` 已弃用，请改用本端点。
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

- Method: POST
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"parent_id"`: `string` (optional)
  - `"type"`: `string`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"name"`: `string`
  - `"parent_id"`: `string`（可选）
  - `"type"`: `string`

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
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "name": "New Folder",
          "type": "folder",
          "parent_id": "{workspace_id}"
     }'
```

</template>
<template #zh>

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
  The name of the file or folder to create.
- `"parent_id"`: (*Body parameter*), `string`
  The parent folder ID. If not specified, the file/folder will be created in the root folder.
- `"type"`: (*Body parameter*), `string`
  The type of the file to create. Available options:
  - `"folder"`: Create a folder
  - `"virtual"`: Create a virtual file

</template>
<template #zh>

- `"name"`：（*请求体参数*），`string`，*必填*
  要创建的文件或文件夹的名称。
- `"parent_id"`：（*请求体参数*），`string`
  父文件夹 ID。若未指定，文件/文件夹将在根文件夹中创建。
- `"type"`：（*请求体参数*），`string`
  要创建的文件类型。可用选项：
  - `"folder"`: 创建文件夹
  - `"virtual"`: 创建虚拟文件

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
        "id": "b330ec2e91ec11efbc510242ac120004",
        "name": "New Folder",
        "type": "folder",
        "parent_id": "527fa74891e811ef9c650242ac120006",
        "size": 0,
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
        "id": "b330ec2e91ec11efbc510242ac120004",
        "name": "New Folder",
        "type": "folder",
        "parent_id": "527fa74891e811ef9c650242ac120006",
        "size": 0,
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
    "code": 409,
    "message": "Duplicated folder name in the same folder."
}
```

</template>
<template #zh>

```json
{
    "code": 409,
    "message": "Duplicated folder name in the same folder."
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

### List files

</template>
<template #zh>

### 列出文件

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`

</template>
<template #zh>

**GET** `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`

</template>
</BiRow>

<BiRow>
<template #en>

Lists files and folders under a specific folder.

</template>
<template #zh>

列出指定文件夹下的文件和文件夹。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`GET /api/v1/file/list` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`GET /api/v1/file/list` 已弃用，请改用本端点。
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
- URL: `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`
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
     --url 'http://{address}/api/v1/files?parent_id={folder_id}&page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files?parent_id={folder_id}&page=1&page_size=15' \
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

- `parent_id`: (*Filter parameter*), `string`
  The folder ID to list files from. If not specified, the root folder is used by default.
- `keywords`: (*Filter parameter*), `string`
  Search keyword to filter files by name.
- `page`: (*Filter parameter*), `integer`
  Specifies the page on which the files will be displayed. Defaults to `1`.
- `page_size`: (*Filter parameter*), `integer`
  The number of files on each page. Defaults to `15`.
- `orderby`: (*Filter parameter*), `string`
  The field by which files should be sorted. Available options:
  - `create_time` (default)
- `desc`: (*Filter parameter*), `boolean`
  Indicates whether the retrieved files should be sorted in descending order. Defaults to `true`.

</template>
<template #zh>

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

</template>
<template #zh>

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
    "code": 404,
    "message": "Folder not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "Folder not found!"
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

### Get parent folder

</template>
<template #zh>

### 获取父文件夹

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/files/{file_id}/parent`

</template>
<template #zh>

**GET** `/api/v1/files/{file_id}/parent`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the immediate parent folder information of a specified file.

</template>
<template #zh>

获取指定文件的直接父文件夹信息。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`GET /api/v1/file/parent_folder?file_id=...` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`GET /api/v1/file/parent_folder?file_id=...` 已弃用，请改用本端点。
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
- URL: `/api/v1/files/{file_id}/parent`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/files/{file_id}/parent`
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
     --url 'http://{address}/api/v1/files/{file_id}/parent' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/parent' \
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

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file whose immediate parent folder to retrieve.

</template>
<template #zh>

- `file_id`：（*路径参数*），`string`，*必填*
  要获取其直接父文件夹的文件 ID。

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
        "parent_folder": {
            "id": "527fa74891e811ef9c650242ac120006",
            "name": "Parent Folder"
        }
    }
}
```

</template>
<template #zh>

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
    "code": 404,
    "message": "Folder not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "Folder not found!"
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

### Get all parent folders

</template>
<template #zh>

### 获取所有父文件夹

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/files/{file_id}/ancestors`

</template>
<template #zh>

**GET** `/api/v1/files/{file_id}/ancestors`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves all parent folders of a specified file in the folder hierarchy.

</template>
<template #zh>

获取指定文件在文件夹层级中的所有父文件夹。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`GET /api/v1/file/all_parent_folder?file_id=...` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`GET /api/v1/file/all_parent_folder?file_id=...` 已弃用，请改用本端点。
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
- URL: `/api/v1/files/{file_id}/ancestors`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/files/{file_id}/ancestors`
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
     --url 'http://{address}/api/v1/files/{file_id}/ancestors' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/ancestors' \
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

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file whose parent folders to retrieve.

</template>
<template #zh>

- `file_id`：（*路径参数*），`string`，*必填*
  要获取其父文件夹的文件 ID。

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

</template>
<template #zh>

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
    "code": 404,
    "message": "Folder not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "Folder not found!"
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

### Delete files

</template>
<template #zh>

### 删除文件

</template>
</BiRow>

<BiRow>
<template #en>

**DELETE** `/api/v1/files`

</template>
<template #zh>

**DELETE** `/api/v1/files`

</template>
</BiRow>

<BiRow>
<template #en>

Deletes one or multiple files or folders.

</template>
<template #zh>

删除一个或多个文件或文件夹。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/file/rm` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/file/rm` 已弃用，请改用本端点。
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

- Method: DELETE
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`

</template>
<template #zh>

- 方法：DELETE
- URL：`/api/v1/files`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"ids"`: `list[string]`

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
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "ids": ["file_id_1", "file_id_2"]
     }'
```

</template>
<template #zh>

```bash
curl --request DELETE \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "ids": ["file_id_1", "file_id_2"]
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

- `"ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files or folders to delete.

</template>
<template #zh>

- `"ids"`：（*请求体参数*），`list[string]`，*必填*
  要删除的文件或文件夹的 ID。

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
        "success_count": 2
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "success_count": 2
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
    "message": "Partially deleted 1 files with 1 errors",
    "data": {
        "success_count": 1,
        "errors": [
            "No authorization for file file1"
        ]
    }
}
```

</template>
<template #zh>

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

### Download file

</template>
<template #zh>

### 下载文件

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/files/{file_id}`

</template>
<template #zh>

**GET** `/api/v1/files/{file_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Downloads a file from the system.

</template>
<template #zh>

从系统下载文件。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`GET /api/v1/file/get/{file_id}` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`GET /api/v1/file/get/{file_id}` 已弃用，请改用本端点。
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
- URL: `/api/v1/files/{file_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/files/{file_id}`
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
     --url http://{address}/api/v1/files/{file_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_file.txt
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/files/{file_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_file.txt
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

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file to download.

</template>
<template #zh>

- `file_id`：（*路径参数*），`string`，*必填*
  要下载的文件 ID。

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

Returns the file content as a binary stream with appropriate Content-Type headers.

</template>
<template #zh>

以二进制流形式返回文件内容，并附带适当的 Content-Type 响应头。

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
    "code": 404,
    "message": "document not found"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "document not found"
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

### Move or rename files

</template>
<template #zh>

### 移动或重命名文件

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/files/move`

</template>
<template #zh>

**POST** `/api/v1/files/move`

</template>
</BiRow>

<BiRow>
<template #en>

Moves and/or renames files or folders. Follows Linux `mv` semantics: at least one of `dest_file_id` or `new_name` must be provided.

</template>
<template #zh>

移动和/或重命名文件或文件夹。遵循 Linux `mv` 语义：`dest_file_id` 与 `new_name` 至少提供其一。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
The previous endpoints `POST /api/v1/file/mv` and `POST /api/v1/file/rename` are deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
之前的端点 `POST /api/v1/file/mv` 与 `POST /api/v1/file/rename` 已弃用，请改用本端点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

- `dest_file_id` only: move files to a new folder, names unchanged.
- `new_name` only: rename a single file or folder in place, no storage operation.
- Both: move and rename simultaneously.

</template>
<template #zh>

- 仅提供 `dest_file_id`：将文件移动到新文件夹，名称保持不变。
- 仅提供 `new_name`：就地重命名单个文件或文件夹，不涉及存储操作。
- 两者同时提供：移动并重命名。

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
- URL: `/api/v1/files/move`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"src_file_ids"`: `list[string]`, *Required*
  - `"dest_file_id"`: `string`, *Optional*
  - `"new_name"`: `string`, *Optional*

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/files/move`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"src_file_ids"`: `list[string]`，*必填*
  - `"dest_file_id"`: `string`，*可选*
  - `"new_name"`: `string`，*可选*

</template>
</BiRow>

<BiRow>
<template #en>

##### Request examples

</template>
<template #zh>

##### 请求示例

</template>
</BiRow>

<BiRow>
<template #en>

Move files to a folder:

</template>
<template #zh>

将文件移动到文件夹：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

Rename a file in place:

</template>
<template #zh>

就地重命名文件：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

- `"src_file_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files or folders to move or rename.
- `"dest_file_id"`: (*Body parameter*), `string`, *Optional*
  The ID of the destination folder. Omit to rename in place.
- `"new_name"`: (*Body parameter*), `string`, *Optional*
  New name for the file or folder. Only valid when `src_file_ids` contains a single entry. Note: Changing file extensions is *not* supported.

</template>
<template #zh>

- `"src_file_ids"`：（*请求体参数*），`list[string]`，*必填*
  要移动或重命名的文件或文件夹的 ID。
- `"dest_file_id"`：（*请求体参数*），`string`，*可选*
  目标文件夹的 ID。省略则就地重命名。
- `"new_name"`：（*请求体参数*），`string`，*可选*
  文件或文件夹的新名称。仅当 `src_file_ids` 只包含一个条目时有效。注意：*不*支持更改文件扩展名。

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
    "code": 404,
    "message": "File or Folder not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "File or Folder not found!"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

or

</template>
<template #zh>

或

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 404,
    "message": "Parent folder not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "Parent folder not found!"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

or

</template>
<template #zh>

或

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 400,
    "message": "The extension of file can't be changed"
}
```

</template>
<template #zh>

```json
{
    "code": 400,
    "message": "The extension of file can't be changed"
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

### Links files to datasets and convert to documents

</template>
<template #zh>

### 将文件关联到数据集并转换为文档

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/files/link-to-datasets`

</template>
<template #zh>

**POST** `/api/v1/files/link-to-datasets`

</template>
</BiRow>

<BiRow>
<template #en>

Converts files to documents and links them to specified datasets.

</template>
<template #zh>

将文件转换为文档，并关联到指定数据集。

</template>
</BiRow>

<BiRow>
<template #en>

:::warning DEPRECATED
`POST /api/v1/file/convert` is deprecated. Use this endpoint instead.
:::

</template>
<template #zh>

:::warning 已弃用
`POST /api/v1/file/convert` 已弃用，请改用本端点。
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

- Method: POST
- URL: `/api/v1/files/link-to-datasets`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"file_ids"`: `list[string]`
  - `"kb_ids"`: `list[string]`

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/files/link-to-datasets`
- 请求头：
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `"file_ids"`: `list[string]`
  - `"kb_ids"`: `list[string]`

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
     --url http://{address}/api/v1/files/link-to-datasets \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "file_ids": ["file_id_1", "file_id_2"],
          "kb_ids": ["dataset_id_1", "dataset_id_2"]
     }'
```

</template>
<template #zh>

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

- `"file_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files to convert. If a folder ID is provided, all files within that folder will be converted.
- `"kb_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the target datasets.

</template>
<template #zh>

- `"file_ids"`：（*请求体参数*），`list[string]`，*必填*
  要转换的文件 ID。若提供的是文件夹 ID，该文件夹内的所有文件都会被转换。
- `"kb_ids"`：（*请求体参数*），`list[string]`，*必填*
  目标数据集的 ID。

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
    "data": [
        {
            "id": "file2doc_id_1",
            "file_id": "file_id_1",
            "document_id": "document_id_1"
        }
    ]
}
```

</template>
<template #zh>

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
    "code": 404,
    "message": "File not found!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "File not found!"
}
```

</template>
</BiRow>

<BiRow>
<template #en>

or

</template>
<template #zh>

或

</template>
</BiRow>

<BiRow>
<template #en>

```json
{
    "code": 404,
    "message": "Can't find this dataset!"
}
```

</template>
<template #zh>

```json
{
    "code": 404,
    "message": "Can't find this dataset!"
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

### Create commit

</template>
<template #zh>

### 创建提交

</template>
</BiRow>

<BiRow>
<template #en>

**POST** `/api/v1/workspaces/{workspace_id}/commits`

</template>
<template #zh>

**POST** `/api/v1/workspaces/{workspace_id}/commits`

</template>
</BiRow>

<BiRow>
<template #en>

Creates a new snapshot commit for the specified workspace.
This endpoint also supports:
- `/api/v1/datasets/{dataset_id}/commits` (resolves dataset to its workspace)

</template>
<template #zh>

为指定工作区创建新的快照提交。
本端点还支持：
- `/api/v1/datasets/{dataset_id}/commits`（会将数据集解析为其所属工作区）

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
- URL: `/api/v1/workspaces/{workspace_id}/commits`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `'message'`: `string` (required)
    The commit message.
  - `'files'`: `list[object]` (required)
    The list of file changes. Each file change is an object with the following fields:

</template>
<template #zh>

- 方法：POST
- URL：`/api/v1/workspaces/{workspace_id}/commits`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 请求体：
  - `'message'`: `string`（必填）
    提交信息。
  - `'files'`: `list[object]`（必填）
    文件变更列表。每个文件变更是一个包含以下字段的对象：

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

</template>
<template #zh>

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

- `"message"`: (*Body parameter*), `string`, *Required*
  The commit message describing the changes.
- `"files"`: (*Body parameter*), `list[object]`, *Required*
  Each file change object supports the following fields:

</template>
<template #zh>

- `"message"`：（*请求体参数*），`string`，*必填*
  描述本次变更的提交信息。
- `"files"`：（*请求体参数*），`list[object]`，*必填*
  每个文件变更对象支持以下字段：

</template>
</BiRow>

<BiRow>
<template #en>

  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | `file_id` | `string` | Yes | The file ID |
  | `file_name` | `string` | Only for add/rename | The file name |
  | `operation` | `string` | Yes | `"add"`, `"modify"`, `"delete"`, or `"rename"` |
  | `content` | `string` | Only for add/modify | The file content |
  | `old_name` | `string` | Only for rename | The old file name |
  | `new_name` | `string` | Only for rename | The new file name |

</template>
<template #zh>

  | 字段 | 类型 | 必填 | 说明 |
  |-------|------|----------|-------------|
  | `file_id` | `string` | 是 | 文件 ID |
  | `file_name` | `string` | 仅 add/rename 时需要 | 文件名 |
  | `operation` | `string` | 是 | `"add"`、`"modify"`、`"delete"` 或 `"rename"` |
  | `content` | `string` | 仅 add/modify 时需要 | 文件内容 |
  | `old_name` | `string` | 仅 rename 时需要 | 旧文件名 |
  | `new_name` | `string` | 仅 rename 时需要 | 新文件名 |

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

:::info
`tree_state` is a JSON string containing a flat map of file entries. Each entry includes `parent_id` to track which sub-folder the file belonged to at commit time. Sub-folders are inferred from `parent_id` values.
:::

</template>
<template #zh>

:::info
`tree_state` 是一个 JSON 字符串，包含文件条目的扁平映射。每个条目都带有 `parent_id`，用于记录提交时该文件所属的子文件夹。子文件夹结构由 `parent_id` 的值推导得出。
:::

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
    "code": 101,
    "message": "required argument are missing: message"
}
```

</template>
<template #zh>

```json
{
    "code": 101,
    "message": "required argument are missing: message"
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

### List commits

</template>
<template #zh>

### 列出提交

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits`

</template>
</BiRow>

<BiRow>
<template #en>

Lists all commits for the specified folder with pagination.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits`

</template>
<template #zh>

列出指定文件夹的所有提交，支持分页。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query:
  - `'page'`: `int` (optional, default: 1)
  - `'page_size'`: `int` (optional, default: 15)
  - `'order_by'`: `string` (optional, default: `"create_time"`)
  - `'desc'`: `bool` (optional, default: `true`)

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `'page'`: `int`（可选，默认值：1）
  - `'page_size'`: `int`（可选，默认值：15）
  - `'order_by'`: `string`（可选，默认值：`"create_time"`）
  - `'desc'`: `bool`（可选，默认值：`true`）

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
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits?page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits?page=1&page_size=15' \
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

- `"page"`: (*Query parameter*), `int`, *Optional*
  Page number. Defaults to 1.
- `"page_size"`: (*Query parameter*), `int`, *Optional*
  Number of items per page. Defaults to 15.
- `"order_by"`: (*Query parameter*), `string`, *Optional*
  Sort field. Defaults to `"create_time"`.
- `"desc"`: (*Query parameter*), `bool`, *Optional*
  Sort descending. Defaults to `true`.

</template>
<template #zh>

- `"page"`：（*查询参数*），`int`，*可选*
  页码。默认值为 1。
- `"page_size"`：（*查询参数*），`int`，*可选*
  每页的条目数量。默认值为 15。
- `"order_by"`：（*查询参数*），`string`，*可选*
  排序字段。默认值为 `"create_time"`。
- `"desc"`：（*查询参数*），`bool`，*可选*
  是否按降序排序。默认值为 `true`。

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

</template>
<template #zh>

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

### Get commit

</template>
<template #zh>

### 获取提交

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the details of a specific commit, including its file changes.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}`

</template>
<template #zh>

获取指定提交的详细信息，包括其文件变更。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}`
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
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id} \
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

- `"folder_id"`: (*Path parameter*), `string`, *Required*
  The folder ID.
- `"commit_id"`: (*Path parameter*), `string`, *Required*
  The commit ID.

</template>
<template #zh>

- `"folder_id"`：（*路径参数*），`string`，*必填*
  文件夹 ID。
- `"commit_id"`：（*路径参数*），`string`，*必填*
  提交 ID。

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

</template>
<template #zh>

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
    "message": "Commit not found in workspace"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
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

### List commit files

</template>
<template #zh>

### 列出提交文件

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`

</template>
</BiRow>

<BiRow>
<template #en>

Lists the file changes associated with a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files`

</template>
<template #zh>

列出与指定提交关联的文件变更。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`
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
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

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

</template>
<template #zh>

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

### Diff commits

</template>
<template #zh>

### 比较提交

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits/diff?from={commit_id}&to={commit_id}`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits/diff?from={commit_id}&to={commit_id}`

</template>
</BiRow>

<BiRow>
<template #en>

Compares two commits and returns the differences.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/diff?from=...&to=...`

</template>
<template #zh>

比较两个提交并返回差异。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/diff?from=...&to=...`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits/diff`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query:
  - `'from'`: `string` (required)
    The source commit ID.
  - `'to'`: `string` (required)
    The target commit ID.

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/diff`
- 请求头：
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- 查询参数：
  - `'from'`: `string`（必填）
    源提交 ID。
  - `'to'`: `string`（必填）
    目标提交 ID。

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
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits/diff?from=from_commit_id&to=to_commit_id' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits/diff?from=from_commit_id&to=to_commit_id' \
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

- `"from"`: (*Query parameter*), `string`, *Required*
  The source commit ID.
- `"to"`: (*Query parameter*), `string`, *Required*
  The target commit ID.

</template>
<template #zh>

- `"from"`：（*查询参数*），`string`，*必填*
  源提交 ID。
- `"to"`：（*查询参数*），`string`，*必填*
  目标提交 ID。

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

</template>
<template #zh>

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
    "message": "Commit not found in workspace"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
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

### Get uncommitted changes

</template>
<template #zh>

### 获取未提交的更改

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/changes`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/changes`

</template>
</BiRow>

<BiRow>
<template #en>

Returns the uncommitted changes for the specified folder (similar to `git status`).
Also available at:
- `/api/v1/datasets/{dataset_id}/changes`

</template>
<template #zh>

返回指定文件夹的未提交更改（类似 `git status`）。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/changes`

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
- URL: `/api/v1/workspaces/{workspace_id}/changes`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/changes`
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
     --url http://{address}/api/v1/workspaces/{workspace_id}/changes \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/changes \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

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

</template>
<template #zh>

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

### Get commit tree

</template>
<template #zh>

### 获取提交树

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the full folder tree snapshot as it existed at a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/tree`

</template>
<template #zh>

获取特定提交时点的完整文件夹树快照。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/tree`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`
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
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

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

</template>
<template #zh>

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

### Get commit file content

</template>
<template #zh>

### 获取提交文件内容

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`

</template>
<template #zh>

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`

</template>
</BiRow>

<BiRow>
<template #en>

Retrieves the file content as it existed at a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files/{file_id}/content`

</template>
<template #zh>

获取文件在特定提交时点的内容。
也可通过以下端点访问：
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files/{file_id}/content`

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
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`
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
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

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
        "content": "file content as it existed in that commit"
    }
}
```

</template>
<template #zh>

```json
{
    "code": 0,
    "data": {
        "content": "file content as it existed in that commit"
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
    "message": "File not found in this commit"
}
```

</template>
<template #zh>

```json
{
    "code": 102,
    "message": "File not found in this commit"
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

### Get a workspace file version history

</template>
<template #zh>

### 获取工作区文件版本历史

</template>
</BiRow>

<BiRow>
<template #en>

**GET** `/api/v1/workspace-files/{file_id}/versions`

</template>
<template #zh>

**GET** `/api/v1/workspace-files/{file_id}/versions`

</template>
</BiRow>

<BiRow>
<template #en>

Returns the version history for a specific file across all commits.

</template>
<template #zh>

返回指定文件在所有提交中的版本历史。

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
- URL: `/api/v1/workspace-files/{file_id}/versions`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

</template>
<template #zh>

- 方法：GET
- URL：`/api/v1/workspace-files/{file_id}/versions`
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
     --url http://{address}/api/v1/workspace-files/{file_id}/versions \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

</template>
<template #zh>

```bash
curl --request GET \
     --url http://{address}/api/v1/workspace-files/{file_id}/versions \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

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

</template>
<template #zh>

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
