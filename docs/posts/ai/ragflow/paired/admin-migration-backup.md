<BiRow>
<template #en>

- [Data migration](#data-migration)
- [Migrate from multi-bucket to single-bucket mode](#migrate-from-multi-bucket-to-single-bucket-mode)

</template>
<template #zh>

- [数据迁移](#data-migration)
- [从多存储桶模式迁移到单存储桶模式](#migrate-from-multi-bucket-to-single-bucket-mode)

</template>
</BiRow>

<BiRow>
<template #en>

## Data Migration

</template>
<template #zh>

## 数据迁移

</template>
</BiRow>

<BiRow>
<template #en>

:::info KUDOS
This document is contributed by our community contributor [TreeDy](https://github.com/Treedy2020). We may not actively maintain this document.
:::

</template>
<template #zh>

:::info 致谢
本文档由我们的社区贡献者 [TreeDy](https://github.com/Treedy2020) 提供。我们可能不会积极维护此文档。
:::

</template>
</BiRow>

<BiRow>
<template #en>

A common scenario is processing large datasets on a powerful instance (e.g., with a GPU) and then migrating the entire RAGFlow service to a different production environment (e.g., a CPU-only server). This guide explains how to safely back up and restore your data using our provided migration script.

</template>
<template #zh>

一种常见场景是：先在一台性能强劲的实例（例如带 GPU）上处理大型数据集，再将整个 RAGFlow 服务迁移到另一个生产环境（例如一台纯 CPU 服务器）。本指南介绍如何使用我们提供的迁移脚本安全地备份和恢复你的数据。

</template>
</BiRow>

<BiRow>
<template #en>

### Identify Your Data

</template>
<template #zh>

### 确认你的数据

</template>
</BiRow>

<BiRow>
<template #en>

By default, RAGFlow uses Docker volumes to store all persistent data, including your database, uploaded files, and search indexes. You can see these volumes by running:

</template>
<template #zh>

默认情况下，RAGFlow 使用 Docker 卷（volume）存储所有持久化数据，包括数据库、已上传的文件和搜索索引。运行以下命令即可查看这些卷：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker volume ls
```

</template>
<template #zh>

```bash
docker volume ls
```

</template>
</BiRow>

<BiRow>
<template #en>

The output will look similar to this:

</template>
<template #zh>

输出类似于：

</template>
</BiRow>

<BiRow>
<template #en>

```text
DRIVER    VOLUME NAME
local     docker_esdata01
local     docker_minio_data
local     docker_mysql_data
local     docker_redis_data
```

</template>
<template #zh>

```text
DRIVER    VOLUME NAME
local     docker_esdata01
local     docker_minio_data
local     docker_mysql_data
local     docker_redis_data
```

</template>
</BiRow>

<BiRow>
<template #en>

These volumes contain all the data you need to migrate.

</template>
<template #zh>

这些卷包含了你需要迁移的全部数据。

</template>
</BiRow>

<BiRow>
<template #en>

:::info
The volume name prefix (e.g., `docker_`) comes from the Docker Compose project name. By default it is `docker` (derived from the directory name). If you started RAGFlow with `docker compose -p <project_name>`, your volumes will be prefixed with `<project_name>_` instead, for example `ragflow_mysql_data`.
:::

</template>
<template #zh>

:::info
卷名前缀（例如 `docker_`）来自 Docker Compose 的项目名。默认为 `docker`（由目录名推导而来）。如果你是通过 `docker compose -p <project_name>` 启动 RAGFlow 的，卷名前缀将是 `<project_name>_`，例如 `ragflow_mysql_data`。
:::

</template>
</BiRow>

<BiRow>
<template #en>

### Step 1: Stop RAGFlow Services

</template>
<template #zh>

### 第 1 步：停止 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

Before starting the migration, you must stop all running RAGFlow services on the **source machine**. Navigate to the project's root directory and run:

</template>
<template #zh>

开始迁移之前，必须停止**源机器**上所有正在运行的 RAGFlow 服务。进入项目根目录并运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -f docker/docker-compose.yml down
```

</template>
<template #zh>

```bash
docker compose -f docker/docker-compose.yml down
```

</template>
</BiRow>

<BiRow>
<template #en>

If you started RAGFlow with a custom project name (e.g., `docker compose -p ragflow`), include it in the command:

</template>
<template #zh>

如果你是用自定义项目名（例如 `docker compose -p ragflow`）启动的 RAGFlow，请在命令中带上项目名：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -p ragflow -f docker/docker-compose.yml down
```

</template>
<template #zh>

```bash
docker compose -p ragflow -f docker/docker-compose.yml down
```

</template>
</BiRow>

<BiRow>
<template #en>

**Important:** Do **not** use the `-v` flag (e.g., `docker compose down -v`), as this will delete all your data volumes. The migration script includes a check and will prevent you from running it if services are active.

</template>
<template #zh>

**重要：** 请**不要**使用 `-v` 标志（例如 `docker compose down -v`），因为这会删除你的全部数据卷。迁移脚本内置了检查，如果服务仍在运行，会阻止你执行迁移。

</template>
</BiRow>

<BiRow>
<template #en>

### Step 2: Back Up Your Data

</template>
<template #zh>

### 第 2 步：备份数据

</template>
</BiRow>

<BiRow>
<template #en>

We provide a convenient script to package all your data volumes into a single backup folder.

</template>
<template #zh>

我们提供了一个便捷的脚本，可以把你的全部数据卷打包进单个备份目录。

</template>
</BiRow>

<BiRow>
<template #en>

For a quick reference of the script's commands and options, you can run:
```bash
bash docker/migration.sh help
```

</template>
<template #zh>

如需快速查阅脚本的命令和选项，可以运行：
```bash
bash docker/migration.sh help
```

</template>
</BiRow>

<BiRow>
<template #en>

To create a backup, run the following command from the project's root directory:

</template>
<template #zh>

要创建备份，请在项目根目录下运行以下命令：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh backup
```

</template>
<template #zh>

```bash
bash docker/migration.sh backup
```

</template>
</BiRow>

<BiRow>
<template #en>

This will create a `backup/` folder in your project root containing compressed archives of your data volumes.

</template>
<template #zh>

该命令会在项目根目录下创建一个 `backup/` 目录，其中包含数据卷的压缩归档。

</template>
</BiRow>

<BiRow>
<template #en>

You can also specify a custom name for your backup folder:

</template>
<template #zh>

你也可以为备份目录指定自定义名称：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh backup my_ragflow_backup
```

</template>
<template #zh>

```bash
bash docker/migration.sh backup my_ragflow_backup
```

</template>
</BiRow>

<BiRow>
<template #en>

This will create a folder named `my_ragflow_backup/` instead.

</template>
<template #zh>

这样创建的目录名就是 `my_ragflow_backup/`。

</template>
</BiRow>

<BiRow>
<template #en>

If you started RAGFlow with a custom project name (e.g., `docker compose -p ragflow`), use the `-p` flag so the script can find the correct volumes:

</template>
<template #zh>

如果你是用自定义项目名（例如 `docker compose -p ragflow`）启动的 RAGFlow，请使用 `-p` 标志，以便脚本找到正确的卷：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh -p ragflow backup
bash docker/migration.sh -p ragflow backup my_ragflow_backup
```

</template>
<template #zh>

```bash
bash docker/migration.sh -p ragflow backup
bash docker/migration.sh -p ragflow backup my_ragflow_backup
```

</template>
</BiRow>

<BiRow>
<template #en>

### Step 3: Transfer the Backup Folder

</template>
<template #zh>

### 第 3 步：传输备份目录

</template>
</BiRow>

<BiRow>
<template #en>

Copy the entire backup folder (e.g., `backup/` or `my_ragflow_backup/`) from your source machine to the RAGFlow project directory on your **target machine**. You can use tools like `scp`, `rsync`, or a physical drive for the transfer.

</template>
<template #zh>

把整个备份目录（例如 `backup/` 或 `my_ragflow_backup/`）从源机器复制到**目标机器**上的 RAGFlow 项目目录。可以使用 `scp`、`rsync` 等工具或物理驱动器来传输。

</template>
</BiRow>

<BiRow>
<template #en>

### Step 4: Restore Your Data

</template>
<template #zh>

### 第 4 步：恢复你的数据

</template>
</BiRow>

<BiRow>
<template #en>

On the **target machine**, ensure that RAGFlow services are not running. Then, use the migration script to restore your data from the backup folder.

</template>
<template #zh>

在**目标机器**上，先确保 RAGFlow 服务未在运行，然后使用迁移脚本从备份目录恢复数据。

</template>
</BiRow>

<BiRow>
<template #en>

If your backup folder is named `backup/`, run:

</template>
<template #zh>

如果你的备份目录名为 `backup/`，运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh restore
```

</template>
<template #zh>

```bash
bash docker/migration.sh restore
```

</template>
</BiRow>

<BiRow>
<template #en>

If you used a custom name, specify it in the command:

</template>
<template #zh>

如果你使用的是自定义名称，请在命令中指定：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh restore my_ragflow_backup
```

</template>
<template #zh>

```bash
bash docker/migration.sh restore my_ragflow_backup
```

</template>
</BiRow>

<BiRow>
<template #en>

If the target machine uses a custom project name, use the `-p` flag to ensure the volumes are created with the correct prefix:

</template>
<template #zh>

如果目标机器使用自定义项目名，请使用 `-p` 标志，确保创建的卷带有正确的前缀：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
bash docker/migration.sh -p ragflow restore
bash docker/migration.sh -p ragflow restore my_ragflow_backup
```

</template>
<template #zh>

```bash
bash docker/migration.sh -p ragflow restore
bash docker/migration.sh -p ragflow restore my_ragflow_backup
```

</template>
</BiRow>

<BiRow>
<template #en>

The script will automatically create the necessary Docker volumes and unpack the data.

</template>
<template #zh>

脚本会自动创建所需的 Docker 卷并解包数据。

</template>
</BiRow>

<BiRow>
<template #en>

**Note:** If the script detects that Docker volumes with the same names already exist on the target machine, it will warn you that restoring will overwrite the existing data and ask for confirmation before proceeding.

</template>
<template #zh>

**注意：** 如果脚本检测到目标机器上已存在同名 Docker 卷，会警告你恢复操作将覆盖现有数据，并在继续之前请求确认。

</template>
</BiRow>

<BiRow>
<template #en>

### Step 5: Start RAGFlow Services

</template>
<template #zh>

### 第 5 步：启动 RAGFlow 服务

</template>
</BiRow>

<BiRow>
<template #en>

Once the restore process is complete, you can start the RAGFlow services on your new machine:

</template>
<template #zh>

恢复完成后，即可在新机器上启动 RAGFlow 服务：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -f docker/docker-compose.yml up -d
```

</template>
<template #zh>

```bash
docker compose -f docker/docker-compose.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

If you use a custom project name:

</template>
<template #zh>

如果你使用自定义项目名：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
docker compose -p ragflow -f docker/docker-compose.yml up -d
```

</template>
<template #zh>

```bash
docker compose -p ragflow -f docker/docker-compose.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

**Note:** If you already have built a service by docker compose before, you may need to backup your data for target machine like this guide above and run like:

</template>
<template #zh>

**注意：** 如果你之前已经通过 docker compose 构建过服务，可能需要先按上文指南的步骤为目标机器备份数据，再按如下方式运行：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
# Please backup by `bash docker/migration.sh backup backup_dir_name` before you do the following line.
# !!! this line -v flag will delete the original docker volume
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

</template>
<template #zh>

```bash
# Please backup by `bash docker/migration.sh backup backup_dir_name` before you do the following line.
# !!! this line -v flag will delete the original docker volume
docker compose -f docker/docker-compose.yml down -v
docker compose -f docker/docker-compose.yml up -d
```

</template>
</BiRow>

<BiRow>
<template #en>

Your RAGFlow instance is now running with all the data from your original machine.

</template>
<template #zh>

现在，你的 RAGFlow 实例已带着原机器的全部数据运行起来了。

</template>
</BiRow>

<BiRow>
<template #en>

## Migrate from Multi-Bucket to Single-Bucket Mode

</template>
<template #zh>

## 从多存储桶模式迁移到单存储桶模式

</template>
</BiRow>

<BiRow>
<template #en>

:::info KUDOS
This document is contributed by our community contributor [arogan178](https://github.com/arogan178). We may not actively maintain this document.
:::

</template>
<template #zh>

:::info 致谢
本文档由我们的社区贡献者 [arogan178](https://github.com/arogan178) 提供。我们可能不会积极维护此文档。
:::

</template>
</BiRow>

<BiRow>
<template #en>

By default, RAGFlow creates one bucket per Knowledge Base (dataset) and one bucket per user folder. This can be problematic when:

</template>
<template #zh>

默认情况下，RAGFlow 会为每个知识库（数据集）创建一个存储桶，并为每个用户文件夹创建一个存储桶。这在以下情况会带来问题：

</template>
</BiRow>

<BiRow>
<template #en>

- Your cloud provider charges per bucket
- Your IAM policy restricts bucket creation
- You want all data organized in a single bucket with directory structure

</template>
<template #zh>

- 你的云服务商按存储桶收费
- 你的 IAM 策略限制创建存储桶
- 你希望所有数据以目录结构组织在单个存储桶中

</template>
</BiRow>

<BiRow>
<template #en>

The **Single Bucket Mode** allows you to configure RAGFlow to use a single bucket with a directory structure instead of multiple buckets.

</template>
<template #zh>

**单存储桶模式**（Single Bucket Mode）允许你把 RAGFlow 配置为使用带目录结构的单个存储桶，而非多个存储桶。

</template>
</BiRow>

<BiRow>
<template #en>

### How It Works

</template>
<template #zh>

### 工作原理

</template>
</BiRow>

<BiRow>
<template #en>

#### Default Mode (Multiple Buckets)

</template>
<template #zh>

#### 默认模式（多存储桶）

</template>
</BiRow>

<BiRow>
<template #en>

```
bucket: kb_12345/
  └── document_1.pdf
bucket: kb_67890/
  └── document_2.pdf
bucket: folder_abc/
  └── file_3.txt
```

</template>
<template #zh>

```
bucket: kb_12345/
  └── document_1.pdf
bucket: kb_67890/
  └── document_2.pdf
bucket: folder_abc/
  └── file_3.txt
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Single Bucket Mode (With Prefix_path)

</template>
<template #zh>

#### 单存储桶模式（使用 prefix_path）

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

### Configuration

</template>
<template #zh>

### 配置

</template>
</BiRow>

<BiRow>
<template #en>

#### MinIO Configuration

</template>
<template #zh>

#### MinIO 配置

</template>
</BiRow>

<BiRow>
<template #en>

Edit your `service_conf.yaml` or set environment variables:

</template>
<template #zh>

编辑你的 `service_conf.yaml`，或设置环境变量：

</template>
</BiRow>

<BiRow>
<template #en>

```yaml
minio:
  user: "your-access-key"
  password: "your-secret-key"
  host: "minio.example.com:443"
  bucket: "ragflow-bucket" # Default bucket name
  prefix_path: "ragflow" # Optional prefix path
```

</template>
<template #zh>

```yaml
minio:
  user: "your-access-key"
  password: "your-secret-key"
  host: "minio.example.com:443"
  bucket: "ragflow-bucket" # Default bucket name
  prefix_path: "ragflow" # Optional prefix path
```

</template>
</BiRow>

<BiRow>
<template #en>

Or using environment variables:

</template>
<template #zh>

或者使用环境变量：

</template>
</BiRow>

<BiRow>
<template #en>

```bash
```

</template>
<template #zh>

```bash
```

</template>
</BiRow>

<BiRow>
<template #en>

#### S3 Configuration (Already Supported)

</template>
<template #zh>

#### S3 配置（已支持）

</template>
</BiRow>

<BiRow>
<template #en>

```yaml
s3:
  access_key: "your-access-key"
  secret_key: "your-secret-key"
  endpoint_url: "https://s3.amazonaws.com"
  bucket: "my-ragflow-bucket"
  prefix_path: "production"
  region_name: "us-east-1"
```

</template>
<template #zh>

```yaml
s3:
  access_key: "your-access-key"
  secret_key: "your-secret-key"
  endpoint_url: "https://s3.amazonaws.com"
  bucket: "my-ragflow-bucket"
  prefix_path: "production"
  region_name: "us-east-1"
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Tigris Configuration

</template>
<template #zh>

#### Tigris 配置

</template>
</BiRow>

<BiRow>
<template #en>

[Tigris](https://www.tigrisdata.com) is an S3-compatible object storage service that works with RAGFlow's `AWS_S3` backend. Set `STORAGE_IMPL=AWS_S3` in your `.env` file:

</template>
<template #zh>

[Tigris](https://www.tigrisdata.com) 是一个兼容 S3 的对象存储服务，可与 RAGFlow 的 `AWS_S3` 后端配合使用。在 `.env` 文件中设置 `STORAGE_IMPL=AWS_S3`：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

See [S3 (Tigris)](https://ragflow.io/docs/administrator/configurations/configurations.md#s3-tigris) for full setup instructions.

</template>
<template #zh>

完整的设置说明参见 [S3 (Tigris)](https://ragflow.io/docs/administrator/configurations/configurations.md#s3-tigris)。

</template>
</BiRow>

<BiRow>
<template #en>

### Iam Policy Example

</template>
<template #zh>

### IAM 策略示例

</template>
</BiRow>

<BiRow>
<template #en>

When using single bucket mode, you only need permissions for one bucket:

</template>
<template #zh>

使用单存储桶模式时，只需要针对单个存储桶授权：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

### Migration from Multi-Bucket to Single Bucket

</template>
<template #zh>

### 从多存储桶迁移到单存储桶

</template>
</BiRow>

<BiRow>
<template #en>

If you're migrating from multi-bucket mode to single-bucket mode:

</template>
<template #zh>

如果你正在从多存储桶模式迁移到单存储桶模式：

</template>
</BiRow>

<BiRow>
<template #en>

1. **Set environment variables** for the new configuration
2. **Restart RAGFlow** services
3. **Migrate existing data** (optional):

</template>
<template #zh>

1. 为新配置**设置环境变量**
2. **重启 RAGFlow** 服务
3. **迁移现有数据**（可选）：

</template>
</BiRow>

<BiRow>
<template #en>

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

</template>
<template #zh>

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

</template>
</BiRow>

<BiRow>
<template #en>

### Toggle Between Modes

</template>
<template #zh>

### 在两种模式之间切换

</template>
</BiRow>

<BiRow>
<template #en>

#### Enable Single Bucket Mode

</template>
<template #zh>

#### 启用单存储桶模式

</template>
</BiRow>

<BiRow>
<template #en>

```yaml
minio:
  bucket: "my-single-bucket"
  prefix_path: "ragflow"
```

</template>
<template #zh>

```yaml
minio:
  bucket: "my-single-bucket"
  prefix_path: "ragflow"
```

</template>
</BiRow>

<BiRow>
<template #en>

#### Disable (Use Multi-Bucket Mode)

</template>
<template #zh>

#### 禁用（使用多存储桶模式）

</template>
</BiRow>

<BiRow>
<template #en>

```yaml
minio:
  # Leave bucket and prefix_path empty or commented out
  # bucket: ''
  # prefix_path: ''
```

</template>
<template #zh>

```yaml
minio:
  # Leave bucket and prefix_path empty or commented out
  # bucket: ''
  # prefix_path: ''
```

</template>
</BiRow>

<BiRow>
<template #en>

### Troubleshooting

</template>
<template #zh>

### 故障排查

</template>
</BiRow>

<BiRow>
<template #en>

#### Issue: Access Denied Errors

</template>
<template #zh>

#### 问题：Access Denied 错误

</template>
</BiRow>

<BiRow>
<template #en>

**Solution**: Ensure your IAM policy grants access to the bucket specified in the configuration.

</template>
<template #zh>

**解决方案**：确保你的 IAM 策略授予了对配置中所指定存储桶的访问权限。

</template>
</BiRow>

<BiRow>
<template #en>

#### Issue: Files Not Found After Switching Modes

</template>
<template #zh>

#### 问题：切换模式后找不到文件

</template>
</BiRow>

<BiRow>
<template #en>

**Solution**: The path structure changes between modes. You'll need to migrate existing data.

</template>
<template #zh>

**解决方案**：两种模式的路径结构不同，你需要迁移现有数据。

</template>
</BiRow>

<BiRow>
<template #en>

#### Issue: Connection Fails with HTTPS

</template>
<template #zh>

#### 问题：HTTPS 连接失败

</template>
</BiRow>

<BiRow>
<template #en>

**Solution**: Ensure `secure: True` is set in the MinIO connection (automatically handled for port 443).

</template>
<template #zh>

**解决方案**：确保在 MinIO 连接中设置了 `secure: True`（端口为 443 时会自动处理）。

</template>
</BiRow>

<BiRow>
<template #en>

### Storage Backends Supported

</template>
<template #zh>

### 支持的存储后端

</template>
</BiRow>

<BiRow>
<template #en>

- ✅ **MinIO** - Full support with single bucket mode
- ✅ **AWS S3** - Full support with single bucket mode
- ✅ **Tigris** - Full support with single bucket mode (uses `AWS_S3` backend)
- ✅ **Alibaba OSS** - Full support with single bucket mode
- ✅ **Azure Blob** - Uses container-based structure (different paradigm)
- ⚠️ **OpenDAL** - Depends on underlying storage backend

</template>
<template #zh>

- ✅ **MinIO** - 完整支持单存储桶模式
- ✅ **AWS S3** - 完整支持单存储桶模式
- ✅ **Tigris** - 完整支持单存储桶模式（使用 `AWS_S3` 后端）
- ✅ **Alibaba OSS** - 完整支持单存储桶模式
- ✅ **Azure Blob** - 使用基于容器的结构（组织方式不同）
- ⚠️ **OpenDAL** - 取决于底层存储后端

</template>
</BiRow>

<BiRow>
<template #en>

### Performance Considerations

</template>
<template #zh>

### 性能注意事项

</template>
</BiRow>

<BiRow>
<template #en>

- **Single bucket mode** may have slightly better performance for bucket listing operations
- **Multi-bucket mode** provides better isolation and organization for large deployments
- Choose based on your specific requirements and infrastructure constraints

</template>
<template #zh>

- **单存储桶模式**在列举存储桶的操作上性能可能略好
- **多存储桶模式**为大型部署提供更好的隔离性与组织性
- 请根据具体需求和基础设施限制来选择

</template>
</BiRow>
