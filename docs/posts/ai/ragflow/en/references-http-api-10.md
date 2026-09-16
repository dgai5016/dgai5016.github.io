# HTTP API Reference (Part 10)

## FILE MANAGEMENT

---

### Upload file

**POST** `/api/v1/files`

Uploads one or multiple files to the system.

:::caution DEPRECATED
`POST /api/v1/file/upload` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Form:
  - `'file=@{FILE_PATH}'`
  - `'parent_id'`: `string` (optional)

##### Request example

```bash
curl --request POST \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.txt' \
     --form 'file=@./test2.pdf' \
     --form 'parent_id={workspace_id}'
```

##### Request parameters

- `'file'`: (*Form parameter*), `file`, *Required*
  The file(s) to upload. Multiple files can be uploaded in a single request.
- `'parent_id'`: (*Form parameter*), `string`
  The parent folder ID where the file will be uploaded. If not specified, files will be uploaded to the root folder.

#### Response

Success:

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

Failure:

```json
{
    "code": 400,
    "message": "No file part!"
}
```

---

### Upload document

**POST** `/api/v1/documents/upload`

Uploads a file and creates the respective document.

:::caution DEPRECATED
`POST /v1/document/upload_info` and `POST /api/v1/file/upload_info` are deprecated. Use this endpoint instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/documents/upload`
- Headers:
  - `'Content-Type: multipart/form-data'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Form:
  - `'file=@{FILE_PATH}'` (mutually exclusive with `url`)
- Query:
  - `url`: URL to crawl and convert to a runtime attachment (mutually exclusive with `file`).

##### Request example

Upload a local file:

```bash
curl --request POST \
     --url http://{address}/api/v1/documents/upload \
     --header 'Content-Type: multipart/form-data' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --form 'file=@./test1.pdf'
```

Crawl a URL:

```bash
curl --request POST \
     --url 'http://{address}/api/v1/documents/upload?url=https://example.com/page' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `'file'`: (*Form parameter*), `file`, *Optional*
  The file to upload. Mutually exclusive with `url`; either `file` or `url` must be provided.
- `url`: (*Query parameter*), `string`, *Optional*
  A URL to crawl and store as an attachment. Mutually exclusive with `file`; either `url` or `file` must be provided.

#### Response

Success:

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

Failure:

```json
{
    "code": 400,
    "message": "Provide either multipart file(s) or ?url=...!"
}
```

---

### Download attachment

**GET** `/api/v1/agents/attachments/{attachment_id}/download`

:::caution DEPRECATED
The previous endpoints `GET /v1/document/download/{doc_id}` and `GET /api/v1/document/download/{doc_id}` are deprecated. Use this endpoint instead.
:::

Downloads a runtime attachment previously uploaded for use in the agent system.

#### Request

- Method: GET
- URL: `/api/v1/agents/attachments/{attachment_id}/download`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query parameter:
  - `ext`: `string` (Optional)

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/agents/attachments/{attachment_id}/download?ext=pdf' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_attachment.pdf
```

##### Request parameters

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

#### Response

Success:

Returns the file content as a binary stream with the relevant Content-Type header.

Failure:

```json
{
    "code": 500,
    "message": "Internal server error"
}
```

---

### Create file or folder

**POST** `/api/v1/files`

Creates a new file or folder in the system.

:::caution DEPRECATED
`POST /api/v1/file/create` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"name"`: `string`
  - `"parent_id"`: `string` (optional)
  - `"type"`: `string`

##### Request example

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

##### Request parameters

- `"name"`: (*Body parameter*), `string`, *Required*
  The name of the file or folder to create.
- `"parent_id"`: (*Body parameter*), `string`
  The parent folder ID. If not specified, the file/folder will be created in the root folder.
- `"type"`: (*Body parameter*), `string`
  The type of the file to create. Available options:
  - `"folder"`: Create a folder
  - `"virtual"`: Create a virtual file

#### Response

Success:

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

Failure:

```json
{
    "code": 409,
    "message": "Duplicated folder name in the same folder."
}
```

---

### List files

**GET** `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`

Lists files and folders under a specific folder.

:::caution DEPRECATED
`GET /api/v1/file/list` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: GET
- URL: `/api/v1/files?parent_id={parent_id}&keywords={keywords}&page={page}&page_size={page_size}&orderby={orderby}&desc={desc}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files?parent_id={folder_id}&page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

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

#### Response

Success:

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

Failure:

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### Get parent folder

**GET** `/api/v1/files/{file_id}/parent`

Retrieves the immediate parent folder information of a specified file.

:::caution DEPRECATED
`GET /api/v1/file/parent_folder?file_id=...` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: GET
- URL: `/api/v1/files/{file_id}/parent`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/parent' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file whose immediate parent folder to retrieve.

#### Response

Success:

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

Failure:

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### Get all parent folders

**GET** `/api/v1/files/{file_id}/ancestors`

Retrieves all parent folders of a specified file in the folder hierarchy.

:::caution DEPRECATED
`GET /api/v1/file/all_parent_folder?file_id=...` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: GET
- URL: `/api/v1/files/{file_id}/ancestors`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/files/{file_id}/ancestors' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file whose parent folders to retrieve.

#### Response

Success:

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

Failure:

```json
{
    "code": 404,
    "message": "Folder not found!"
}
```

---

### Delete files

**DELETE** `/api/v1/files`

Deletes one or multiple files or folders.

:::caution DEPRECATED
`POST /api/v1/file/rm` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: DELETE
- URL: `/api/v1/files`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"ids"`: `list[string]`

##### Request example

```bash
curl --request DELETE \
     --url http://{address}/api/v1/files \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
          "ids": ["file_id_1", "file_id_2"]
     }'
```

##### Request parameters

- `"ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files or folders to delete.

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "success_count": 2
    }
}
```

Failure:

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

### Download file

**GET** `/api/v1/files/{file_id}`

Downloads a file from the system.

:::caution DEPRECATED
`GET /api/v1/file/get/{file_id}` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: GET
- URL: `/api/v1/files/{file_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/files/{file_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --output ./downloaded_file.txt
```

##### Request parameters

- `file_id`: (*Path parameter*), `string`, *Required*
  The ID of the file to download.

#### Response

Success:

Returns the file content as a binary stream with appropriate Content-Type headers.

Failure:

```json
{
    "code": 404,
    "message": "document not found"
}
```

---

### Move or rename files

**POST** `/api/v1/files/move`

Moves and/or renames files or folders. Follows Linux `mv` semantics: at least one of `dest_file_id` or `new_name` must be provided.

:::caution DEPRECATED
The previous endpoints `POST /api/v1/file/mv` and `POST /api/v1/file/rename` are deprecated. Use this endpoint instead.
:::

- `dest_file_id` only: move files to a new folder, names unchanged.
- `new_name` only: rename a single file or folder in place, no storage operation.
- Both: move and rename simultaneously.

#### Request

- Method: POST
- URL: `/api/v1/files/move`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"src_file_ids"`: `list[string]`, *Required*
  - `"dest_file_id"`: `string`, *Optional*
  - `"new_name"`: `string`, *Optional*

##### Request examples

Move files to a folder:

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

Rename a file in place:

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

##### Request parameters

- `"src_file_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files or folders to move or rename.
- `"dest_file_id"`: (*Body parameter*), `string`, *Optional*
  The ID of the destination folder. Omit to rename in place.
- `"new_name"`: (*Body parameter*), `string`, *Optional*
  New name for the file or folder. Only valid when `src_file_ids` contains a single entry. Note: Changing file extensions is *not* supported.

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
    "code": 404,
    "message": "File or Folder not found!"
}
```

or

```json
{
    "code": 404,
    "message": "Parent folder not found!"
}
```

or

```json
{
    "code": 400,
    "message": "The extension of file can't be changed"
}
```

---

### Links files to datasets and convert to documents

**POST** `/api/v1/files/link-to-datasets`

Converts files to documents and links them to specified datasets.

:::caution DEPRECATED
`POST /api/v1/file/convert` is deprecated. Use this endpoint instead.
:::

#### Request

- Method: POST
- URL: `/api/v1/files/link-to-datasets`
- Headers:
  - `'Content-Type: application/json'`
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `"file_ids"`: `list[string]`
  - `"kb_ids"`: `list[string]`

##### Request example

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

##### Request parameters

- `"file_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the files to convert. If a folder ID is provided, all files within that folder will be converted.
- `"kb_ids"`: (*Body parameter*), `list[string]`, *Required*
  The IDs of the target datasets.

#### Response

Success:

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

Failure:

```json
{
    "code": 404,
    "message": "File not found!"
}
```

or

```json
{
    "code": 404,
    "message": "Can't find this dataset!"
}
```

---

### Create commit

**POST** `/api/v1/workspaces/{workspace_id}/commits`

Creates a new snapshot commit for the specified workspace.
This endpoint also supports:
- `/api/v1/datasets/{dataset_id}/commits` (resolves dataset to its workspace)

#### Request

- Method: POST
- URL: `/api/v1/workspaces/{workspace_id}/commits`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Body:
  - `'message'`: `string` (required)
    The commit message.
  - `'files'`: `list[object]` (required)
    The list of file changes. Each file change is an object with the following fields:

##### Request example

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

##### Request parameters

- `"message"`: (*Body parameter*), `string`, *Required*
  The commit message describing the changes.
- `"files"`: (*Body parameter*), `list[object]`, *Required*
  Each file change object supports the following fields:

  | Field | Type | Required | Description |
  |-------|------|----------|-------------|
  | `file_id` | `string` | Yes | The file ID |
  | `file_name` | `string` | Only for add/rename | The file name |
  | `operation` | `string` | Yes | `"add"`, `"modify"`, `"delete"`, or `"rename"` |
  | `content` | `string` | Only for add/modify | The file content |
  | `old_name` | `string` | Only for rename | The old file name |
  | `new_name` | `string` | Only for rename | The new file name |

#### Response

Success:

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

:::note
`tree_state` is a JSON string containing a flat map of file entries. Each entry includes `parent_id` to track which sub-folder the file belonged to at commit time. Sub-folders are inferred from `parent_id` values.
:::

Failure:

```json
{
    "code": 101,
    "message": "required argument are missing: message"
}
```

---

### List commits

**GET** `/api/v1/workspaces/{workspace_id}/commits`

Lists all commits for the specified folder with pagination.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query:
  - `'page'`: `int` (optional, default: 1)
  - `'page_size'`: `int` (optional, default: 15)
  - `'order_by'`: `string` (optional, default: `"create_time"`)
  - `'desc'`: `bool` (optional, default: `true`)

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits?page=1&page_size=15' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `"page"`: (*Query parameter*), `int`, *Optional*
  Page number. Defaults to 1.
- `"page_size"`: (*Query parameter*), `int`, *Optional*
  Number of items per page. Defaults to 15.
- `"order_by"`: (*Query parameter*), `string`, *Optional*
  Sort field. Defaults to `"create_time"`.
- `"desc"`: (*Query parameter*), `bool`, *Optional*
  Sort descending. Defaults to `true`.

#### Response

Success:

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

### Get commit

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`

Retrieves the details of a specific commit, including its file changes.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `"folder_id"`: (*Path parameter*), `string`, *Required*
  The folder ID.
- `"commit_id"`: (*Path parameter*), `string`, *Required*
  The commit ID.

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
}
```

---

### List commit files

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`

Lists the file changes associated with a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### Response

Success:

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

### Diff commits

**GET** `/api/v1/workspaces/{workspace_id}/commits/diff?from={commit_id}&to={commit_id}`

Compares two commits and returns the differences.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/diff?from=...&to=...`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits/diff`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`
- Query:
  - `'from'`: `string` (required)
    The source commit ID.
  - `'to'`: `string` (required)
    The target commit ID.

##### Request example

```bash
curl --request GET \
     --url 'http://{address}/api/v1/workspaces/{workspace_id}/commits/diff?from=from_commit_id&to=to_commit_id' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

##### Request parameters

- `"from"`: (*Query parameter*), `string`, *Required*
  The source commit ID.
- `"to"`: (*Query parameter*), `string`, *Required*
  The target commit ID.

#### Response

Success:

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

Failure:

```json
{
    "code": 102,
    "message": "Commit not found in workspace"
}
```

---

### Get uncommitted changes

**GET** `/api/v1/workspaces/{workspace_id}/changes`

Returns the uncommitted changes for the specified folder (similar to `git status`).
Also available at:
- `/api/v1/datasets/{dataset_id}/changes`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/changes`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/changes \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### Response

Success:

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

### Get commit tree

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`

Retrieves the full folder tree snapshot as it existed at a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/tree`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/tree \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### Response

Success:

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

### Get commit file content

**GET** `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`

Retrieves the file content as it existed at a specific commit.
Also available at:
- `/api/v1/datasets/{dataset_id}/commits/{commit_id}/files/{file_id}/content`

#### Request

- Method: GET
- URL: `/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspaces/{workspace_id}/commits/{commit_id}/files/{file_id}/content \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### Response

Success:

```json
{
    "code": 0,
    "data": {
        "content": "file content as it existed in that commit"
    }
}
```

Failure:

```json
{
    "code": 102,
    "message": "File not found in this commit"
}
```

---

### Get a workspace file version history

**GET** `/api/v1/workspace-files/{file_id}/versions`

Returns the version history for a specific file across all commits.

#### Request

- Method: GET
- URL: `/api/v1/workspace-files/{file_id}/versions`
- Headers:
  - `'Authorization: Bearer <YOUR_API_KEY>'`

##### Request example

```bash
curl --request GET \
     --url http://{address}/api/v1/workspace-files/{file_id}/versions \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
```

#### Response

Success:

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
