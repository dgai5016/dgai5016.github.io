<BiRow>
<template #en>

Configurations for deploying RAGFlow via Docker.

</template>
<template #zh>

通过 Docker 部署 RAGFlow 的相关配置。

</template>
</BiRow>

<BiRow>
<template #en>

## Guidelines

</template>
<template #zh>

## 基本准则

</template>
</BiRow>

<BiRow>
<template #en>

When it comes to system configurations, you will need to manage the following files:

</template>
<template #zh>

在系统配置方面，你需要管理以下文件：

</template>
</BiRow>

<BiRow>
<template #en>

- [.env](https://github.com/infiniflow/ragflow/blob/main/docker/.env): Contains important environment variables for Docker.
- [service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template): Configures the back-end services. It specifies the system-level configuration for RAGFlow and is used by its API server and task executor. Upon container startup, the `service_conf.yaml` file will be generated based on this template file. This process replaces any environment variables within the template, allowing for dynamic configuration tailored to the container's environment.
- [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml): The Docker Compose file for starting up the RAGFlow service.

</template>
<template #zh>

- [.env](https://github.com/infiniflow/ragflow/blob/main/docker/.env)：包含 Docker 的重要环境变量。
- [service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template)：用于配置后端服务。它指定 RAGFlow 的系统级配置，供其 API 服务器和任务执行器使用。容器启动时，会基于该模板文件生成 `service_conf.yaml` 文件。此过程会替换模板中的环境变量，从而实现贴合容器环境的动态配置。
- [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml)：用于启动 RAGFlow 服务的 Docker Compose 文件。

</template>
</BiRow>

<BiRow>
<template #en>

To update the default HTTP serving port (80), go to [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml) and change `80:80`
to `<YOUR_SERVING_PORT>:80`.

</template>
<template #zh>

如需更新默认的 HTTP 服务端口（80），请打开 [docker-compose.yml](https://github.com/infiniflow/ragflow/blob/main/docker/docker-compose.yml)，把 `80:80` 改为 `<YOUR_SERVING_PORT>:80`。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
Updates to the above configurations require a reboot of all containers to take effect:

```bash
docker compose -f docker/docker-compose.yml up -d
```

:::

</template>
<template #zh>

:::tip 注意
上述配置的更新需要重启所有容器才能生效：

```bash
docker compose -f docker/docker-compose.yml up -d
```

:::

</template>
</BiRow>

<BiRow>
<template #en>

## Docker Compose

</template>
<template #zh>

## Docker Compose

</template>
</BiRow>

<BiRow>
<template #en>

- **docker-compose.yml**
  Sets up environment for RAGFlow and its dependencies.
- **docker-compose-base.yml**
  Sets up environment for RAGFlow's dependencies: Elasticsearch/[Infinity](https://github.com/infiniflow/infinity), MySQL, MinIO, and Redis.

</template>
<template #zh>

- **docker-compose.yml**
  为 RAGFlow 及其依赖组件搭建运行环境。
- **docker-compose-base.yml**
  为 RAGFlow 的依赖组件搭建运行环境：Elasticsearch/[Infinity](https://github.com/infiniflow/infinity)、MySQL、MinIO 和 Redis。

</template>
</BiRow>

<BiRow>
<template #en>

:::danger IMPORTANT
We do not actively maintain **docker-compose-CN-oc9.yml**, **docker-compose-macos.yml**, so use them at your own risk. However, you are welcome to file a pull request to improve them.
:::

</template>
<template #zh>

:::danger 重要
我们并未积极维护 **docker-compose-CN-oc9.yml** 和 **docker-compose-macos.yml**，使用风险自负。不过，欢迎提交 pull request 来改进它们。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## Docker Environment Variables

</template>
<template #zh>

## Docker 环境变量

</template>
</BiRow>

<BiRow>
<template #en>

The [.env](https://github.com/infiniflow/ragflow/blob/main/docker/.env) file contains important environment variables for Docker.

</template>
<template #zh>

[.env](https://github.com/infiniflow/ragflow/blob/main/docker/.env) 文件包含 Docker 的重要环境变量。

</template>
</BiRow>

<BiRow>
<template #en>

### Elasticsearch

</template>
<template #zh>

### Elasticsearch

</template>
</BiRow>

<BiRow>
<template #en>

- `STACK_VERSION`
  The version of Elasticsearch. Defaults to `8.11.3`
- `ES_PORT`
  The port used to expose the Elasticsearch service to the host machine, allowing **external** access to the service running inside the Docker container.  Defaults to `1200`.
- `ELASTIC_PASSWORD`
  The password for Elasticsearch.

</template>
<template #zh>

- `STACK_VERSION`
  Elasticsearch 的版本。默认为 `8.11.3`
- `ES_PORT`
  用于向主机暴露 Elasticsearch 服务的端口，允许从**外部**访问运行在 Docker 容器内的服务。默认为 `1200`。
- `ELASTIC_PASSWORD`
  Elasticsearch 的密码。

</template>
</BiRow>

<BiRow>
<template #en>

### Kibana

</template>
<template #zh>

### Kibana

</template>
</BiRow>

<BiRow>
<template #en>

- `KIBANA_PORT`
  The port used to expose the Kibana service to the host machine, allowing **external** access to the service running inside the Docker container. Defaults to `6601`.
- `KIBANA_USER`
  The username for Kibana. Defaults to `rag_flow`.
- `KIBANA_PASSWORD`
  The password for Kibana. Defaults to `infini_rag_flow`.

</template>
<template #zh>

- `KIBANA_PORT`
  用于向主机暴露 Kibana 服务的端口，允许从**外部**访问运行在 Docker 容器内的服务。默认为 `6601`。
- `KIBANA_USER`
  Kibana 的用户名。默认为 `rag_flow`。
- `KIBANA_PASSWORD`
  Kibana 的密码。默认为 `infini_rag_flow`。

</template>
</BiRow>

<BiRow>
<template #en>

### Resource Management

</template>
<template #zh>

### 资源管理

</template>
</BiRow>

<BiRow>
<template #en>

- `MEM_LIMIT`
  The maximum amount of the memory, in bytes, that *a specific* Docker container can use while running. Defaults to `8073741824`.

</template>
<template #zh>

- `MEM_LIMIT`
  *特定* Docker 容器在运行期间可使用的最大内存量（以字节计）。默认为 `8073741824`。

</template>
</BiRow>

<BiRow>
<template #en>

### MySQL

</template>
<template #zh>

### MySQL

</template>
</BiRow>

<BiRow>
<template #en>

- `MYSQL_PASSWORD`
  The password for MySQL.
- `MYSQL_PORT`
  The port to connect to MySQL from RAGFlow container. Defaults to `3306`. Change this if you use an external MySQL.
- `EXPOSE_MYSQL_PORT`
  The port used to expose the MySQL service to the host machine, allowing **external** access to the MySQL database running inside the Docker container. Defaults to `5455`.

</template>
<template #zh>

- `MYSQL_PASSWORD`
  MySQL 的密码。
- `MYSQL_PORT`
  RAGFlow 容器连接 MySQL 所用的端口。默认为 `3306`。如果使用外部 MySQL，请修改此值。
- `EXPOSE_MYSQL_PORT`
  用于向主机暴露 MySQL 服务的端口，允许从**外部**访问运行在 Docker 容器内的 MySQL 数据库。默认为 `5455`。

</template>
</BiRow>

<BiRow>
<template #en>

### MinIO

</template>
<template #zh>

### MinIO

</template>
</BiRow>

<BiRow>
<template #en>

RAGFlow utilizes MinIO as its object storage solution, leveraging its scalability to store and manage all uploaded files.

</template>
<template #zh>

RAGFlow 采用 MinIO 作为对象存储方案，并利用其可扩展性来存储和管理所有上传的文件。

</template>
</BiRow>

<BiRow>
<template #en>

- `MINIO_CONSOLE_PORT`
  The port used to expose the MinIO console interface to the host machine, allowing **external** access to the web-based console running inside the Docker container. Defaults to `9001`
- `MINIO_PORT`
  The port used to expose the MinIO API service to the host machine, allowing **external** access to the MinIO object storage service running inside the Docker container. Defaults to `9000`.
- `MINIO_USER`
  The username for MinIO.
- `MINIO_PASSWORD`
  The password for MinIO.

</template>
<template #zh>

- `MINIO_CONSOLE_PORT`
  用于向主机暴露 MinIO 控制台界面的端口，允许从**外部**访问运行在 Docker 容器内的 Web 控制台。默认为 `9001`
- `MINIO_PORT`
  用于向主机暴露 MinIO API 服务的端口，允许从**外部**访问运行在 Docker 容器内的 MinIO 对象存储服务。默认为 `9000`。
- `MINIO_USER`
  MinIO 的用户名。
- `MINIO_PASSWORD`
  MinIO 的密码。

</template>
</BiRow>

<BiRow>
<template #en>

### Redis

</template>
<template #zh>

### Redis

</template>
</BiRow>

<BiRow>
<template #en>

- `REDIS_PORT`
  The port used to expose the Redis service to the host machine, allowing **external** access to the Redis service running inside the Docker container. Defaults to `6379`.
- `REDIS_USERNAME`
  Optional Redis ACL username when using Redis 6+ authentication.
- `REDIS_PASSWORD`
  The password for Redis.

</template>
<template #zh>

- `REDIS_PORT`
  用于向主机暴露 Redis 服务的端口，允许从**外部**访问运行在 Docker 容器内的 Redis 服务。默认为 `6379`。
- `REDIS_USERNAME`
  使用 Redis 6+ 身份验证时可选的 Redis ACL 用户名。
- `REDIS_PASSWORD`
  Redis 的密码。

</template>
</BiRow>

<BiRow>
<template #en>

### RAGFlow

</template>
<template #zh>

### RAGFlow

</template>
</BiRow>

<BiRow>
<template #en>

- `SVR_HTTP_PORT`
  The port used to expose RAGFlow's HTTP API service to the host machine, allowing **external** access to the service running inside the Docker container. Defaults to `9380`.
- `RAGFLOW_IMAGE`
  The Docker image edition. Defaults to `infiniflow/ragflow:v0.27.2` (the RAGFlow Docker image without embedding models).

</template>
<template #zh>

- `SVR_HTTP_PORT`
  用于向主机暴露 RAGFlow HTTP API 服务的端口，允许从**外部**访问运行在 Docker 容器内的服务。默认为 `9380`。
- `RAGFLOW_IMAGE`
  Docker 镜像版本。默认为 `infiniflow/ragflow:v0.27.2`（不含嵌入模型的 RAGFlow Docker 镜像）。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
If you cannot download the RAGFlow Docker image, try the following mirrors.

- For the `nightly` edition:
  - `RAGFLOW_IMAGE=swr.cn-north-4.myhuaweicloud.com/infiniflow/ragflow:nightly` or,
  - `RAGFLOW_IMAGE=registry.cn-hangzhou.aliyuncs.com/infiniflow/ragflow:nightly`.
:::

</template>
<template #zh>

:::tip 注意
如果无法下载 RAGFlow Docker 镜像，可以尝试以下镜像源。

- `nightly` 版本：
  - `RAGFLOW_IMAGE=swr.cn-north-4.myhuaweicloud.com/infiniflow/ragflow:nightly`，或
  - `RAGFLOW_IMAGE=registry.cn-hangzhou.aliyuncs.com/infiniflow/ragflow:nightly`。
:::

</template>
</BiRow>

<BiRow>
<template #en>

### Embedding Service

</template>
<template #zh>

### 嵌入服务

</template>
</BiRow>

<BiRow>
<template #en>

- `TEI_MODEL`
  The embedding model which text-embeddings-inference serves. Allowed values are one of `Qwen/Qwen3-Embedding-0.6B`(default), `BAAI/bge-m3`, and `BAAI/bge-small-en-v1.5`.

</template>
<template #zh>

- `TEI_MODEL`
  text-embeddings-inference 所服务的嵌入模型。允许的取值为 `Qwen/Qwen3-Embedding-0.6B`（默认）、`BAAI/bge-m3`、`BAAI/bge-small-en-v1.5` 三者之一。

</template>
</BiRow>

<BiRow>
<template #en>

- `TEI_PORT`
  The port used to expose the text-embeddings-inference service to the host machine, allowing **external** access to the text-embeddings-inference service running inside the Docker container. Defaults to `6380`.

</template>
<template #zh>

- `TEI_PORT`
  用于向主机暴露 text-embeddings-inference 服务的端口，允许从**外部**访问运行在 Docker 容器内的 text-embeddings-inference 服务。默认为 `6380`。

</template>
</BiRow>

<BiRow>
<template #en>

### Timezone

</template>
<template #zh>

### 时区

</template>
</BiRow>

<BiRow>
<template #en>

- `TZ`
  The local time zone. Defaults to `Asia/Shanghai`.

</template>
<template #zh>

- `TZ`
  本地时区。默认为 `Asia/Shanghai`。

</template>
</BiRow>

<BiRow>
<template #en>

### Hugging Face Mirror Site

</template>
<template #zh>

### Hugging Face 镜像站

</template>
</BiRow>

<BiRow>
<template #en>

- `HF_ENDPOINT`
  The mirror site for huggingface.co. It is disabled by default. You can uncomment this line if you have limited access to the primary Hugging Face domain.

</template>
<template #zh>

- `HF_ENDPOINT`
  huggingface.co 的镜像站。默认处于禁用状态。如果访问 Hugging Face 主域名受限，可以取消注释该行。

</template>
</BiRow>

<BiRow>
<template #en>

### macOS

</template>
<template #zh>

### macOS

</template>
</BiRow>

<BiRow>
<template #en>

- `MACOS`
  Optimizations for macOS. It is disabled by default. You can uncomment this line if your OS is macOS.

</template>
<template #zh>

- `MACOS`
  针对 macOS 的优化。默认处于禁用状态。如果你的操作系统是 macOS，可以取消注释该行。

</template>
</BiRow>

<BiRow>
<template #en>

### User Registration

</template>
<template #zh>

### 用户注册

</template>
</BiRow>

<BiRow>
<template #en>

- `REGISTER_ENABLED`
  - `1`: (Default) Enable user registration.
  - `0`: Disable user registration.
- `OAUTH_AUTO_REGISTER`
  - `true`: (Default) Allow new users to be provisioned on OAuth/OIDC login.
  - `false`: Require OAuth/OIDC users to already exist. This is independent of `REGISTER_ENABLED`.

</template>
<template #zh>

- `REGISTER_ENABLED`
  - `1`：（默认）启用用户注册。
  - `0`：禁用用户注册。
- `OAUTH_AUTO_REGISTER`
  - `true`：（默认）允许新用户在 OAuth/OIDC 登录时自动开通账号。
  - `false`：要求 OAuth/OIDC 用户预先存在。该配置独立于 `REGISTER_ENABLED`。

</template>
</BiRow>

<BiRow>
<template #en>

## Service Configuration

</template>
<template #zh>

## 服务配置

</template>
</BiRow>

<BiRow>
<template #en>

[service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template) specifies the system-level configuration for RAGFlow and is used by its API server and task executor.

</template>
<template #zh>

[service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template) 指定 RAGFlow 的系统级配置，供其 API 服务器和任务执行器使用。

</template>
</BiRow>

<BiRow>
<template #en>

### `ragflow`

</template>
<template #zh>

### `ragflow`

</template>
</BiRow>

<BiRow>
<template #en>

- `host`: The API server's IP address inside the Docker container. Defaults to `0.0.0.0`.
- `http_port`: The API server's serving port inside the Docker container. Defaults to `9380`.

</template>
<template #zh>

- `host`：API 服务器在 Docker 容器内的 IP 地址。默认为 `0.0.0.0`。
- `http_port`：API 服务器在 Docker 容器内的服务端口。默认为 `9380`。

</template>
</BiRow>

<BiRow>
<template #en>

### `mysql`

</template>
<template #zh>

### `mysql`

</template>
</BiRow>

<BiRow>
<template #en>

- `name`: The MySQL database name. Defaults to `rag_flow`.
- `user`: The username for MySQL.
- `password`: The password for MySQL.
- `port`: The MySQL serving port inside the Docker container. Defaults to `3306`.
- `max_connections`: The maximum number of concurrent connections to the MySQL database. Defaults to `100`.
- `stale_timeout`: Timeout in seconds.

</template>
<template #zh>

- `name`：MySQL 数据库名。默认为 `rag_flow`。
- `user`：MySQL 的用户名。
- `password`：MySQL 的密码。
- `port`：MySQL 在 Docker 容器内的服务端口。默认为 `3306`。
- `max_connections`：MySQL 数据库的最大并发连接数。默认为 `100`。
- `stale_timeout`：超时时间，单位为秒。

</template>
</BiRow>

<BiRow>
<template #en>

### `minio`

</template>
<template #zh>

### `minio`

</template>
</BiRow>

<BiRow>
<template #en>

- `user`: The username for MinIO.
- `password`: The password for MinIO.
- `host`: The MinIO serving IP *and* port inside the Docker container. Defaults to `minio:9000`.

</template>
<template #zh>

- `user`：MinIO 的用户名。
- `password`：MinIO 的密码。
- `host`：MinIO 在 Docker 容器内的服务 IP *和*端口。默认为 `minio:9000`。

</template>
</BiRow>

<BiRow>
<template #en>

### `S3` (Tigris)

</template>
<template #zh>

### `S3` (Tigris)

</template>
</BiRow>

<BiRow>
<template #en>

To use [Tigris](https://www.tigrisdata.com) as an S3-compatible storage backend, set `STORAGE_IMPL=AWS_S3` in `.env` and configure the `s3:` section:

</template>
<template #zh>

要使用 [Tigris](https://www.tigrisdata.com) 作为 S3 兼容的存储后端，请在 `.env` 中设置 `STORAGE_IMPL=AWS_S3` 并配置 `s3:` 段：

</template>
</BiRow>

<BiRow>
<template #en>

```yaml
s3:
  access_key: 'tid_YOUR_ACCESS_KEY'
  secret_key: 'tsec_YOUR_SECRET_KEY'
  region_name: 'auto'
  endpoint_url: 'https://t3.storage.dev'
  bucket: 'ragflow'
  prefix_path: 'ragflow'
  signature_version: 'v4'
  addressing_style: 'virtual'
```

</template>
<template #zh>

```yaml
s3:
  access_key: 'tid_YOUR_ACCESS_KEY'
  secret_key: 'tsec_YOUR_SECRET_KEY'
  region_name: 'auto'
  endpoint_url: 'https://t3.storage.dev'
  bucket: 'ragflow'
  prefix_path: 'ragflow'
  signature_version: 'v4'
  addressing_style: 'virtual'
```

</template>
</BiRow>

<BiRow>
<template #en>

- `access_key` / `secret_key`: Create at [console.tigris.dev](https://console.tigris.dev).
- `region_name`: Must be `auto`.
- `endpoint_url`: `https://t3.storage.dev`, or `https://fly.storage.tigris.dev` on Fly.io.
- `addressing_style`: Must be `virtual`.
- `bucket` / `prefix_path`: Optional. Enables single-bucket mode — see [Migrate from multi-bucket to single-bucket mode](https://ragflow.io/docs/administrator/migration/backup_and_migration.md#migrate-from-multi-bucket-to-single-bucket-mode).

</template>
<template #zh>

- `access_key` / `secret_key`：在 [console.tigris.dev](https://console.tigris.dev) 创建。
- `region_name`：必须为 `auto`。
- `endpoint_url`：`https://t3.storage.dev`；部署在 Fly.io 上时为 `https://fly.storage.tigris.dev`。
- `addressing_style`：必须为 `virtual`。
- `bucket` / `prefix_path`：可选。用于启用单桶模式——参见[从多桶模式迁移到单桶模式](https://ragflow.io/docs/administrator/migration/backup_and_migration.md#migrate-from-multi-bucket-to-single-bucket-mode)。

</template>
</BiRow>

<BiRow>
<template #en>

When using an external storage backend, you can remove the `minio` service from `docker-compose-base.yml`.

</template>
<template #zh>

使用外部存储后端时，可以从 `docker-compose-base.yml` 中移除 `minio` 服务。

</template>
</BiRow>

<BiRow>
<template #en>

For other S3-compatible backends (AWS S3, Alibaba Cloud OSS, Azure Blob, Google Cloud Storage), see the commented examples in [service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template).

</template>
<template #zh>

其他 S3 兼容后端（AWS S3、阿里云 OSS、Azure Blob、Google Cloud Storage）的配置，请参阅 [service_conf.yaml.template](https://github.com/infiniflow/ragflow/blob/main/docker/service_conf.yaml.template) 中的注释示例。

</template>
</BiRow>

<BiRow>
<template #en>

### `redis`

</template>
<template #zh>

### `redis`

</template>
</BiRow>

<BiRow>
<template #en>

- `host`: The Redis serving IP *and* port inside the Docker container. Defaults to `redis:6379`.
- `db`: The Redis database index to use. Defaults to `1`.
- `username`: Optional Redis ACL username (Redis 6+).
- `password`: The password for the specified Redis user.

</template>
<template #zh>

- `host`：Redis 在 Docker 容器内的服务 IP *和*端口。默认为 `redis:6379`。
- `db`：要使用的 Redis 数据库索引。默认为 `1`。
- `username`：可选的 Redis ACL 用户名（Redis 6+）。
- `password`：指定 Redis 用户的密码。

</template>
</BiRow>

<BiRow>
<template #en>

### `oauth`

</template>
<template #zh>

### `oauth`

</template>
</BiRow>

<BiRow>
<template #en>

The OAuth configuration for signing up or signing in to RAGFlow using a third-party account.

</template>
<template #zh>

用于以第三方账号注册或登录 RAGFlow 的 OAuth 配置。

</template>
</BiRow>

<BiRow>
<template #en>

- `<channel>`: Custom channel ID.
  - `type`: Authentication type, options include `oauth2`, `oidc`, `github`. Default is `oauth2`, when `issuer` parameter is provided, defaults to `oidc`.
  - `icon`: Icon ID, options include `github`, `sso`, default is `sso`.
  - `display_name`: Channel name, defaults to the Title Case format of the channel ID.
  - `client_id`: Required, unique identifier assigned to the client application.
  - `client_secret`: Required, secret key for the client application, used for communication with the authentication server.
  - `authorization_url`: Base URL for obtaining user authorization.
  - `token_url`: URL for exchanging authorization code and obtaining access token.
  - `userinfo_url`: URL for obtaining user information (username, email, etc.).
  - `issuer`: Base URL of the identity provider. OIDC clients can dynamically obtain the identity provider's metadata (`authorization_url`, `token_url`, `userinfo_url`) through `issuer`.
  - `scope`: Requested permission scope, a space-separated string. For example, `openid profile email`.
  - `redirect_uri`: Required, URI to which the authorization server redirects during the authentication flow to return results. Must match the callback URI registered with the authentication server. Format: `https://your-app.com/api/v1/auth/oauth/<channel>/callback`. For local configuration, you can directly use `http://127.0.0.1:80/api/v1/auth/oauth/<channel>/callback`.

</template>
<template #zh>

- `<channel>`：自定义渠道 ID。
  - `type`：认证类型，可选值包括 `oauth2`、`oidc`、`github`。默认为 `oauth2`；提供 `issuer` 参数时默认为 `oidc`。
  - `icon`：图标 ID，可选值包括 `github`、`sso`，默认为 `sso`。
  - `display_name`：渠道名称，默认为渠道 ID 的 Title Case 格式。
  - `client_id`：必填，分配给客户端应用的唯一标识符。
  - `client_secret`：必填，客户端应用的密钥，用于与认证服务器通信。
  - `authorization_url`：获取用户授权的基础 URL。
  - `token_url`：用于交换授权码并获取访问令牌的 URL。
  - `userinfo_url`：获取用户信息（用户名、邮箱等）的 URL。
  - `issuer`：身份提供方的基础 URL。OIDC 客户端可以通过 `issuer` 动态获取身份提供方的元数据（`authorization_url`、`token_url`、`userinfo_url`）。
  - `scope`：请求的权限范围，以空格分隔的字符串，例如 `openid profile email`。
  - `redirect_uri`：必填。认证流程中授权服务器重定向并返回结果所用的 URI，必须与在认证服务器上注册的回调 URI 一致。格式为 `https://your-app.com/api/v1/auth/oauth/<channel>/callback`。本地配置时可直接使用 `http://127.0.0.1:80/api/v1/auth/oauth/<channel>/callback`。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
The following are best practices for configuring various third-party authentication methods. You can configure one or multiple third-party authentication methods for Ragflow:
```yaml
oauth:
  oauth2:
    display_name: "OAuth2"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    authorization_url: "https://your-oauth-provider.com/oauth/authorize"
    token_url: "https://your-oauth-provider.com/oauth/token"
    userinfo_url: "https://your-oauth-provider.com/oauth/userinfo"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/oauth2/callback"

  oidc:
    display_name: "OIDC"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    issuer: "https://your-oauth-provider.com/oidc"
    scope: "openid email profile"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/oidc/callback"

  github:
    # https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
    type: "github"
    icon: "github"
    display_name: "Github"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/github/callback"
```
:::

</template>
<template #zh>

:::tip 注意
以下是配置各类第三方认证的最佳实践。你可以为 RAGFlow 配置一种或多种第三方认证方式：
```yaml
oauth:
  oauth2:
    display_name: "OAuth2"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    authorization_url: "https://your-oauth-provider.com/oauth/authorize"
    token_url: "https://your-oauth-provider.com/oauth/token"
    userinfo_url: "https://your-oauth-provider.com/oauth/userinfo"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/oauth2/callback"

  oidc:
    display_name: "OIDC"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    issuer: "https://your-oauth-provider.com/oidc"
    scope: "openid email profile"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/oidc/callback"

  github:
    # https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app
    type: "github"
    icon: "github"
    display_name: "Github"
    client_id: "your_client_id"
    client_secret: "your_client_secret"
    redirect_uri: "https://your-app.com/api/v1/auth/oauth/github/callback"
```
:::

</template>
</BiRow>

<BiRow>
<template #en>

### `user_default_llm`

</template>
<template #zh>

### `user_default_llm`

</template>
</BiRow>

<BiRow>
<template #en>

Assigning default models to newly registered users through `user_default_llm` is deprecated and no longer supported in the open-source version. Uncommenting this section in **service_conf.yaml.template** does not configure models for new users.

</template>
<template #zh>

通过 `user_default_llm` 为新注册用户分配默认模型的做法已弃用，开源版本不再支持。在 **service_conf.yaml.template** 中取消注释该段，也不会为新用户配置模型。

</template>
</BiRow>

<BiRow>
<template #en>

Each tenant must configure its own model provider instances and credentials. New users do not automatically inherit an administrator's configured instances or default model selections.

</template>
<template #zh>

每个租户必须自行配置模型提供方实例和凭据。新用户不会自动继承管理员已配置的实例或默认模型选择。

</template>
</BiRow>

<BiRow>
<template #en>

Go to **User settings** **>** **Model providers** to configure provider instances, add models, and select default models. See [Configure Model API Key](https://ragflow.io/docs/guides/models/llm_api_key_setup) for instructions.

</template>
<template #zh>

进入 **User settings** **>** **Model providers**，即可配置提供方实例、添加模型并选择默认模型。具体操作参见[配置模型 API Key](https://ragflow.io/docs/guides/models/llm_api_key_setup)。

</template>
</BiRow>

<BiRow>
<template #en>

The Enterprise Edition provides role-level default model settings.

</template>
<template #zh>

企业版提供角色级别的默认模型设置。

</template>
</BiRow>

<BiRow>
<template #en>

:::info Builtin embedding
If you deploy TEI, keep the shipped `user_default_llm.default_models.embedding_model` connection settings in **service_conf.yaml.template**. They are used by the TEI `Builtin` embedding service and do not assign administrator-owned model instances to new tenants.
:::

</template>
<template #zh>

:::info Builtin embedding
如果你部署了 TEI，请保留 **service_conf.yaml.template** 中自带的 `user_default_llm.default_models.embedding_model` 连接设置。这些设置供 TEI 的 `Builtin` 嵌入服务使用，不会把管理员名下的模型实例分配给新租户。
:::

</template>
</BiRow>
