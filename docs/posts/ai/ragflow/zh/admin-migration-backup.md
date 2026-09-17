# 备份与迁移

- [数据迁移](#data-migration)
- [从多存储桶模式迁移到单存储桶模式](#migrate-from-multi-bucket-to-single-bucket-mode)

## 数据迁移

:::info 致谢
本文档由我们的社区贡献者 [TreeDy](https://github.com/Treedy2020) 提供。我们可能不会积极维护此文档。
:::

一种常见场景是：先在一台性能强劲的实例（例如带 GPU）上处理大型数据集，再将整个 RAGFlow 服务迁移到另一个生产环境（例如一台纯 CPU 服务器）。本指南介绍如何使用我们提供的迁移脚本安全地备份和恢复你的数据。

### 确认你的数据

默认情况下，RAGFlow 使用 Docker 卷（volume）存储所有持久化数据，包括数据库、已上传的文件和搜索索引。运行以下命令即可查看这些卷：

```bash
docker volume ls
```

输出类似于：

```text
DRIVER    VOLUME NAME
local     docker_esdata01
local     docker_minio_data
local     docker_mysql_data
local     docker_redis_data
```

这些卷包含了你需要迁移的全部数据。

:::info
卷名前缀（例如 `docker_`）来自 Docker Compose 的项目名。默认为 `docker`（由目录名推导而来）。如果你是通过 `docker compose -p <project_name>` 启动 RAGFlow 的，卷名前缀将是 `<project_name>_`，例如 `ragflow_mysql_data`。
:::

### 第 1 步：停止 RAGFlow 服务

开始迁移之前，必须停止**源机器**上所有正在运行的 RAGFlow 服务。进入项目根目录并运行：

```bash
docker compose -f docker/docker-compose.yml down
```

如果你是用自定义项目名（例如 `docker compose -p ragflow`）启动的 RAGFlow，请在命令中带上项目名：

```bash
docker compose -p ragflow -f docker/docker-compose.yml down
```

**重要：** 请**不要**使用 `-v` 标志（例如 `docker compose down -v`），因为这会删除你的全部数据卷。迁移脚本内置了检查，如果服务仍在运行，会阻止你执行迁移。

### 第 2 步：备份数据

我们提供了一个便捷的脚本，可以把你的全部数据卷打包进单个备份目录。

如需快速查阅脚本的命令和选项，可以运行：
```bash
bash docker/migration.sh help
```

要创建备份，请在项目根目录下运行以下命令：

```bash
bash docker/migration.sh backup
```

该命令会在项目根目录下创建一个 `backup/` 目录，其中包含数据卷的压缩归档。

你也可以为备份目录指定自定义名称：

```bash
bash docker/migration.sh backup my_ragflow_backup
```

这样创建的目录名就是 `my_ragflow_backup/`。

如果你是用自定义项目名（例如 `docker compose -p ragflow`）启动的 RAGFlow，请使用 `-p` 标志，以便脚本找到正确的卷：

```bash
bash docker/migration.sh -p ragflow backup
bash docker/migration.sh -p ragflow backup my_ragflow_backup
```

### 第 3 步：传输备份目录

把整个备份目录（例如 `backup/` 或 `my_ragflow_backup/`）从源机器复制到**目标机器**上的 RAGFlow 项目目录。可以使用 `scp`、`rsync` 等工具或物理驱动器来传输。

### 第 4 步：恢复你的数据

在**目标机器**上，先确保 RAGFlow 服务未在运行，然后使用迁移脚本从备份目录恢复数据。

如果你的备份目录名为 `backup/`，运行：

```bash
bash docker/migration.sh restore
```

如果你使用的是自定义名称，请在命令中指定：

```bash
bash docker/migration.sh restore my_ragflow_backup
```

如果目标机器使用自定义项目名，请使用 `-p` 标志，确保创建的卷带有正确的前缀：

```bash
bash docker/migration.sh -p ragflow restore
bash docker/migration.sh -p ragflow restore my_ragflow_backup
```

脚本会自动创建所需的 Docker 卷并解包数据。

**注意：** 如果脚本检测到目标机器上已存在同名 Docker 卷，会警告你恢复操作将覆盖现有数据，并在继续之前请求确认。

### 第 5 步：启动 RAGFlow 服务

恢复完成后，即可在新机器上启动 RAGFlow 服务：

```bash
docker compose -f docker/docker-compose.yml up -d
```

如果你使用自定义项目名：

```bash
docker compose -p ragflow -f docker/docker-compose.yml up -d
```

**注意：** 如果你之前已经通过 docker compose 构建过服务，可能需要先按上文指南的步骤为目标机器备份数据，再按如下方式运行：

```bash
# Please backup by `bash docker/migration.sh backup backup_dir_name` before you do the following line.
# !!! this line -v flag will delete the original docker volume
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

现在，你的 RAGFlow 实例已带着原机器的全部数据运行起来了。

## 从多存储桶模式迁移到单存储桶模式

:::info 致谢
本文档由我们的社区贡献者 [arogan178](https://github.com/arogan178) 提供。我们可能不会积极维护此文档。
:::

默认情况下，RAGFlow 会为每个知识库（数据集）创建一个存储桶，并为每个用户文件夹创建一个存储桶。这在以下情况会带来问题：

- 你的云服务商按存储桶收费
- 你的 IAM 策略限制创建存储桶
- 你希望所有数据以目录结构组织在单个存储桶中

**单存储桶模式**（Single Bucket Mode）允许你把 RAGFlow 配置为使用带目录结构的单个存储桶，而非多个存储桶。

### 工作原理

#### 默认模式（多存储桶）

```
bucket: kb_12345/
  └── document_1.pdf
bucket: kb_67890/
  └── document_2.pdf
bucket: folder_abc/
  └── file_3.txt
```

#### 单存储桶模式（使用 prefix_path）

```
bucket: ragflow-bucket/
  └── ragflow/
      ├── kb_12345/
      │   └── document_1.pdf
      ├── kb_67890/
      │   └── document_2.pdf
      └── folder_abc/
          └── file_3.txt
```

### 配置

#### MinIO 配置

编辑你的 `service_conf.yaml`，或设置环境变量：

```yaml
minio:
  user: "your-access-key"
  password: "your-secret-key"
  host: "minio.example.com:443"
  bucket: "ragflow-bucket" # Default bucket name
  prefix_path: "ragflow" # Optional prefix path
```

或者使用环境变量：

```bash
```

#### S3 配置（已支持）

```yaml
s3:
  access_key: "your-access-key"
  secret_key: "your-secret-key"
  endpoint_url: "https://s3.amazonaws.com"
  bucket: "my-ragflow-bucket"
  prefix_path: "production"
  region_name: "us-east-1"
```

#### Tigris 配置

[Tigris](https://www.tigrisdata.com) 是一个兼容 S3 的对象存储服务，可与 RAGFlow 的 `AWS_S3` 后端配合使用。在 `.env` 文件中设置 `STORAGE_IMPL=AWS_S3`：

```yaml
s3:
  access_key: "tid_YOUR_ACCESS_KEY"
  secret_key: "tsec_YOUR_SECRET_KEY"
  region_name: "auto"
  endpoint_url: "https://t3.storage.dev"
  bucket: "ragflow"
  prefix_path: "ragflow"
  signature_version: "v4"
  addressing_style: "virtual"
```

完整的设置说明参见 [S3 (Tigris)](https://ragflow.io/docs/administrator/configurations/configurations.md#s3-tigris)。

### IAM 策略示例

使用单存储桶模式时，只需要针对单个存储桶授权：

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:*"],
      "Resource": [
        "arn:aws:s3:::ragflow-bucket",
        "arn:aws:s3:::ragflow-bucket/*"
      ]
    }
  ]
}
```

### 从多存储桶迁移到单存储桶

如果你正在从多存储桶模式迁移到单存储桶模式：

1. 为新配置**设置环境变量**
2. **重启 RAGFlow** 服务
3. **迁移现有数据**（可选）：

```bash
# Example using mc (MinIO Client)
mc alias set old-minio http://old-minio:9000 ACCESS_KEY SECRET_KEY
mc alias set new-minio https://new-minio:443 ACCESS_KEY SECRET_KEY

# List all knowledge base buckets
mc ls old-minio/ | grep kb_ | while read -r line; do
    bucket=$(echo $line | awk '{print $5}')
    # Copy each bucket to the new structure
    mc cp --recursive old-minio/$bucket/ new-minio/ragflow-bucket/ragflow/$bucket/
done
```

### 在两种模式之间切换

#### 启用单存储桶模式

```yaml
minio:
  bucket: "my-single-bucket"
  prefix_path: "ragflow"
```

#### 禁用（使用多存储桶模式）

```yaml
minio:
  # Leave bucket and prefix_path empty or commented out
  # bucket: ''
  # prefix_path: ''
```

### 故障排查

#### 问题：Access Denied 错误

**解决方案**：确保你的 IAM 策略授予了对配置中所指定存储桶的访问权限。

#### 问题：切换模式后找不到文件

**解决方案**：两种模式的路径结构不同，你需要迁移现有数据。

#### 问题：HTTPS 连接失败

**解决方案**：确保在 MinIO 连接中设置了 `secure: True`（端口为 443 时会自动处理）。

### 支持的存储后端

- ✅ **MinIO** - 完整支持单存储桶模式
- ✅ **AWS S3** - 完整支持单存储桶模式
- ✅ **Tigris** - 完整支持单存储桶模式（使用 `AWS_S3` 后端）
- ✅ **Alibaba OSS** - 完整支持单存储桶模式
- ✅ **Azure Blob** - 使用基于容器的结构（组织方式不同）
- ⚠️ **OpenDAL** - 取决于底层存储后端

### 性能注意事项

- **单存储桶模式**在列举存储桶的操作上性能可能略好
- **多存储桶模式**为大型部署提供更好的隔离性与组织性
- 请根据具体需求和基础设施限制来选择
