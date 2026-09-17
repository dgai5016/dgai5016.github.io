# 常见问题（FAQ）

关于通用功能、故障排查、用法等各类问题的解答。

---

## 通用功能

---

### RAGFlow 与其他 RAG 产品相比有何独特之处？

RAGFlow 提供了一个端到端的 RAG（检索增强生成）平台，能力不止于基础的文档分块与检索。其核心优势包括：

- **深度文档理解**，能够处理文本、表格、图片等复杂内容。
- **灵活的检索与可溯源的回答**，提供多种检索策略、重排序与引用。
- **Agentic 能力**，支持多步检索、推理、工具使用与工作流。
- **知识编译**，可将文档组织为结构化的知识工件。
- **广泛的模型与集成支持**，便于构建不同的 RAG 应用。

---

---

### 在哪里查看 RAGFlow 的版本号？如何解读？

你可以在 UI 的 **System**（系统）页面查看 RAGFlow 的版本号：

![Image](/ragflow-images/20cf7213-2537-4e18-a88c-4dadf6228c6b.jpg)

如果你是从源码构建的 RAGFlow，版本号也会出现在系统日志中：

```
        ____   ___    ______ ______ __
       / __ \ /   |  / ____// ____// /____  _      __
      / /_/ // /| | / / __ / /_   / // __ \| | /| / /
     / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
    /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/

2025-02-18 10:10:43,835 INFO     1445658 RAGFlow version: v0.15.0-50-g6daae7f2
```

其中：

- `v0.15.0`：官方发布的版本。
- `50`：自该官方版本以来的 git 提交数量。
- `g6daae7f2`：`g` 是前缀，`6daae7f2` 是当前提交 ID 的前七个字符。

---

### 为什么 RAGFlow 默认使用 Elasticsearch 或 Infinity 作为文档引擎？

Elasticsearch 和 [Infinity](https://github.com/infiniflow/infinity) 满足 RAGFlow 对混合搜索的核心需求，涵盖全文搜索、向量搜索、短语搜索以及高级排序能力。
RAGFlow 还支持其他文档引擎，包括 OpenSearch、OceanBase、SeekDB 和 GaussDB。不同文档引擎的支持程度和可用功能可能有所差异。
[Infinity](https://github.com/infiniflow/infinity) 是由 InfiniFlow 开发、针对 RAG 工作负载优化的 AI 原生数据库。

---

### cloud.ragflow.io 与本地部署的开源 RAGFlow 服务有什么区别？

cloud.ragflow.io 展示的是 RAGFlow 企业版的能力。其 DeepDoc 模型使用专有数据预训练，并提供更为完善的团队权限控制。本质上，cloud.ragflow.io 是 RAGFlow 即将推出的 SaaS（软件即服务）服务的预览。

你可以部署开源的 RAGFlow 服务，并通过 Python 客户端或 RESTful API 调用它。但 cloud.ragflow.io 不支持这种用法。

---

### 为什么 RAGFlow 需要大量系统资源？

RAGFlow 运行着多个组件，分别负责文档解析、嵌入、全文与向量索引、检索、任务处理、元数据存储、缓存以及对象存储。部分文档解析器还会加载或下载机器学习模型，可能需要大量内存或 GPU 资源。

实际资源占用取决于所选的文档引擎、解析器、模型提供商、文档数量和工作负载。当前的最低要求请参阅部署前提条件与配置文档。

---

### RAGFlow 支持哪些架构或设备？

我们官方支持 x86 CPU 和 NVIDIA GPU。虽然我们也在 ARM64 平台上测试 RAGFlow，但并不为 ARM 维护 RAGFlow Docker 镜像。如果你使用 ARM 平台，请按照[这份指南](https://ragflow.io/docs/develop/build_docker_image)自行构建 RAGFlow Docker 镜像。

---

### 是否提供用于与第三方应用集成的 API？

相应的 API 现已提供。更多信息请参阅 [RAGFlow HTTP API 参考](https://ragflow.io/docs/references/http_api_reference)或 [RAGFlow Python API 参考](https://ragflow.io/docs/references/python_api_reference)。

---

### 是否支持流式输出？

支持。对话助手和 Agent 中默认启用流式输出。注意，你无法通过 RAGFlow 的 UI 关闭流式输出。若要在响应中禁用流式输出，请使用 RAGFlow 的 Python 或 RESTful API：

Python：

- [创建对话补全](https://ragflow.io/docs/references/python_api_reference.md#create-chat-completion)
- [与对话助手对话](https://ragflow.io/docs/references/python_api_reference.md#converse-with-chat-assistant)
- [与 Agent 对话](https://ragflow.io/docs/references/python_api_reference.md#converse-with-agent)

RESTful：

- [创建对话补全](https://ragflow.io/docs/references/http_api_reference.md#create-chat-completion)
- [与对话助手对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-chat-assistant)
- [与 Agent 对话](https://ragflow.io/docs/references/http_api_reference.md#converse-with-agent)

---

### 搜索与对话的核心区别？

- **搜索（Search）**面向直接的知识检索。它从一个或多个数据集中检索相关内容并排序，将结果呈现给用户查看。
- **对话（Chat）**面向对话式问答。它检索相关知识并用 LLM 生成回答，支持多轮会话以及 Agentic 检索（Agentic Retrieval）等更高级的检索能力。

当你想直接查找并查看相关知识时，使用**搜索（Search）**；当你希望基于这些知识生成回答时，使用**对话（Chat）**。

---

## 故障排查

---

### 升级到 v0.27.2 时出现 `Request error 404: undefined`

要解决此问题，请执行以下任一操作：

- 从 [main 分支](https://github.com/infiniflow/ragflow)拉取最新源码，然后拉取并启动 v0.27.2 镜像。
- 在 [.env 文件](https://github.com/infiniflow/ragflow/blob/main/docker/.env)中将 `RAGFLOW_IMAGE` 从 `infiniflow/ragflow:latest` 改为 `infiniflow/ragflow:v0.27.2`，然后重启服务。

### 如何从零构建 RAGFlow 镜像？

请参阅[构建 RAGFlow Docker 镜像](https://ragflow.io/docs/develop/build_docker_image)。

---

### PDF 解析失败：所需的 Hugging Face 模型无法下载

RAGFlow 的部分文档解析器需要从 [Hugging Face](https://huggingface.co) 下载所需的模型文件。如果 RAGFlow 容器无法访问 Hugging Face，且这些文件尚未缓存，模型初始化或文档解析可能会失败。

例如：

```
FileNotFoundError: [Errno 2] No such file or directory: '/root/.cache/huggingface/hub/models--InfiniFlow--deepdoc/snapshots/be0c1e50eef6047b412d1800aa89aba4d275f997/ocr.res'
```

要解决此问题，可改用 https://hf-mirror.com：

1. 停止所有容器并移除所有相关资源：

   ```bash
   cd ragflow/docker/
   docker compose down
   ```

2. 取消 **ragflow/docker/.env** 中以下行的注释：

   ```
   # HF_ENDPOINT=https://hf-mirror.com
   ```

3. 启动服务器：

   ```bash
   docker compose up -d
   ```

---

### `Fail to access model(Ollama/xxxxx)`

这个错误表示 RAGFlow 无法访问所配置的 Ollama 模型。请检查 Ollama 是否正在运行、模型是否已下载、模型名称是否正确，以及从 RAGFlow 容器能否访问 Ollama Base URL。

如果加载模型时请求超时，请检查 Ollama 日志和可用内存。必要时可换用更小的模型或分配更多内存。

更多信息请参阅[部署本地 LLM](https://ragflow.io/docs/guides/models/deploy_local_llm)。

---

### `MaxRetryError: HTTPSConnectionPool(host='hf-mirror.com', port=443)`

这个错误说明你的环境无法访问互联网，或无法连接 hf-mirror.com。请尝试以下操作：

1. 从 [huggingface.co/InfiniFlow/deepdoc](https://huggingface.co/InfiniFlow/deepdoc) 手动下载资源文件到本地目录 **~/deepdoc**。
2. 在 **docker/docker-compose.yml** 中添加卷映射，例如：

   ```
   - ~/deepdoc:/ragflow/rag/res/deepdoc
   ```

---

### `RuntimeError: Unable to start Tika server.`

这个错误几乎总是由于环境中未安装 Java 或 Java 不可用导致的。详细操作说明请参见[这里](https://github.com/infiniflow/ragflow/issues/13194)。

---

### `Cannot stat '/etc/nginx/conf.d/ragflow.conf.python': No such file or directory`

要解决此问题，可以从 [GitHub](https://github.com/infiniflow/ragflow) 上对应 tag 下载缺失的文件，或者按如下方式更新 `~/ragflow/docker/docker-compose.yml`：

![](/ragflow-images/docker-compose_missing.jpg)

---

### `network anomaly There is an abnormality in your network and you cannot connect to the server.`

![anomaly](/ragflow-images/beb7ad10-92e4-4a58-8886-bfb7cbd09e5d.jpg)

服务器完全初始化之前，你无法登录 RAGFlow。请运行 `docker logs -f docker-ragflow-cpu-1` 查看日志。

*如果系统显示如下内容，说明服务器已成功初始化：*

```
     ____   ___    ______ ______ __
    / __ \ /   |  / ____// ____// /____  _      __
   / /_/ // /| | / / __ / /_   / // __ \| | /| / /
  / _, _// ___ |/ /_/ // __/  / // /_/ /| |/ |/ /
 /_/ |_|/_/  |_|\____//_/    /_/ \____/ |__/|__/

 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:9380
 * Running on http://x.x.x.x:9380
```
然后使用[系统健康 API](https://ragflow.io/docs/references/http_api_reference.md#check-system-health)检查数据库、Redis、文档引擎和对象存储。

---

### `Realtime synonym is disabled, since no redis connection`

忽略该警告并继续即可。所有系统警告都可以忽略。

![](/ragflow-images/ef5a6194-084a-4fe3-bdd5-1c025b40865c.png)

---

### `xxx tasks are ahead in the queue`

#### 针对 v0.26.0 之前的 RAGFlow 版本

1. 清空 Redis 任务队列：

```bash
$ docker exec -it ragflow-redis /bin/bash
# In container
$ redis-cli -a infini_rag_flow
# In redis-cli
select 1
XGROUP DESTROY rag_flow_svr_queue rag_flow_svr_task_broker
XGROUP CREATE rag_flow_svr_queue rag_flow_svr_task_broker $ MKSTREAM
# When CREATE raises and error:
FLUSHDB
```

2. 如果解析器仍停留在 0%，请使用以下任一方法重启 RAGFlow 容器：

```bash
# Option 1: Restart specific container
docker restart docker-redis-1 docker-ragflow-cpu-1

# Option 2: Recreate containers via Docker Compose
docker compose -f docker/docker-compose.yml down
docker compose -f docker/docker-compose.yml up -d

# Option 3: Reset all Docker containers
# WARNING: Run this ONLY if your environment contains no other non-RAGFlow containers.
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
```

#### 针对 v0.26.0 及之后的 RAGFlow 版本

1. 清空 Redis 任务队列：

```bash
$ docker exec -it ragflow-redis /bin/bash
# In container
$ redis-cli -a infini_rag_flow
# In redis-cli
select 1
XGROUP DESTROY te.0.common rag_flow_svr_task_broker
XGROUP CREATE te.0.common rag_flow_svr_task_broker $ MKSTREAM

XGROUP DESTROY te.1.common rag_flow_svr_task_broker
XGROUP CREATE te.1.common rag_flow_svr_task_broker $ MKSTREAM
```

2. 如果解析器仍停留在 0%，请使用以下任一方法重启 RAGFlow 容器：

```bash
# Option 1: Restart specific container
docker restart docker-redis-1 docker-ragflow-cpu-1

# Option 2: Recreate containers via Docker Compose
docker compose -f docker/docker-compose.yml down
docker compose -f docker/docker-compose.yml up -d

# Option 3: Reset all Docker containers
# WARNING: Run this ONLY if your environment contains no other non-RAGFlow containers.
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)
```

---

### 为什么我的文档解析卡在不到 1% 的进度？

![stall](/ragflow-images/3589cc25-c733-47d5-bbfc-fedb74a3da50.jpg)

点击“解析状态”栏旁边的红色叉号，然后重新启动解析流程，看问题是否依旧存在。如果问题仍然存在且你的 RAGFlow 是本地部署的，请尝试以下操作：

1. 查看 RAGFlow 服务器的日志，确认其是否正常运行：

   ```bash
   docker logs -f docker-ragflow-cpu-1
   ```

2. 检查 **task_executor.py** 进程是否存在。
3. 检查你的 RAGFlow 服务器能否访问 hf-mirror.com 或 huggingface.com。

---

### 为什么我的 PDF 解析在临近完成时卡住，日志里却没有任何错误？

点击“解析状态”栏旁边的红色叉号，然后重新启动解析流程，看问题是否依旧存在。如果问题仍然存在且你的 RAGFlow 是本地部署的，解析进程很可能是因内存（RAM）不足而被系统终止。可尝试增大 **docker/.env** 中 `MEM_LIMIT` 的值来增加内存分配。

:::info
请务必重启 RAGFlow 服务器，以使更改生效！

```bash
docker compose stop
```

```bash
docker compose up -d
```

:::

![nearcompletion](/ragflow-images/563974c3-f8bb-4ec8-b241-adcda8929cbb.png)

---

### `Index failure`

索引失败意味着 RAGFlow 无法将处理好的文档分块写入所配置的文档引擎。

请检查任务日志、嵌入模型、文档引擎连接和系统健康状况。如果你使用 Elasticsearch、OpenSearch、Infinity 或其他受支持的文档引擎，请确认相应服务正在运行且可以访问。

---

### 如何查看 RAGFlow 的日志？

```bash
tail -f ragflow/docker/ragflow-logs/*.log
```

---

### 如何检查 RAGFlow 中各组件的状态？

1. 检查 RAGFlow Docker 容器的状态：

   ```bash
   $ docker compose ps
   ```
   查看服务日志：
   ```bash
   docker compose logs -f ragflow

   ```

2. 使用[系统健康 API](https://ragflow.io/docs/references/http_api_reference.md#check-system-health)检查数据库、Redis、文档引擎和对象存储。

容器在运行并不代表其中的服务一定健康。请通过健康 API 和日志排查连接、端口、DNS 及配置错误。

---

### `Exception: Can't connect to ES cluster`

1. 检查 Elasticsearch Docker 容器的状态：

   ```bash
   $ docker ps
   ```

   *健康的 Elasticsearch 组件的状态应如下所示：*

   ```
   91220e3285dd   docker.elastic.co/elasticsearch/elasticsearch:8.11.3   "/bin/tini -- /usr/l…"   11 hours ago   Up 11 hours (healthy)     9300/tcp, 0.0.0.0:9200->9200/tcp, :::9200->9200/tcp           ragflow-es-01
   ```

2. 按照[系统健康 API](https://ragflow.io/docs/references/http_api_reference.md#check-system-health)的说明检查 Elasticsearch 服务的健康状态。

:::danger 重要
   Docker 容器的状态不一定反映其服务的状态。即使对应的 Docker 容器已在运行，你也可能发现服务并不健康。可能的原因包括网络故障、端口号不正确或 DNS 问题。
:::

3. 如果容器不断重启，请确保 `vm.max_map_count` >= 262144。在 Linux 上，更新 **/etc/sysctl.conf** 可让更改永久生效；macOS 请参见下面的常见问题。

---

### 无法启动 ES 容器，并出现 `Elasticsearch did not exit normally`

在 Linux 上，这是因为你忘记更新 **/etc/sysctl.conf** 中的 `vm.max_map_count` 值，你对这个值的修改在系统重启后被重置了。

---

### 在 macOS 上如何配置 `vm.max_map_count`？

`vm.max_map_count` 是只有 Elasticsearch 才需要的 Linux 内核参数。它不影响以 Infinity 作为文档引擎的 RAGFlow 部署。

在 Docker Desktop 上，需要在其 Linux 虚拟机中设置该值：

```bash
docker run --rm --privileged alpine sysctl -w vm.max_map_count=262144
```

该设置是临时的，Docker Desktop 重启后会被重置。

在 Colima 上，先在其虚拟机内查看当前值：

```bash
colima ssh -- sysctl vm.max_map_count
```

临时设置该值：

```bash
colima ssh -- sudo sysctl -w vm.max_map_count=262144
```

要永久生效，可运行 `colima start --edit` 并在 `colima.yaml` 中添加一个 provision 脚本：

```yaml
provision:
  - mode: system
    script: |
      #!/bin/bash
      sysctl -w vm.max_map_count=262144
```

然后重启 Colima：

```bash
colima stop
colima start
```

*由 [@helloxjade](https://github.com/helloxjade) 贡献。*

---

### `{"data":null,"code":100,"message":"<NotFound '404: Not Found'>"}`

你的 IP 地址或端口号可能不正确。如果你使用默认配置，请在浏览器中输入 `http://<IP_OF_YOUR_MACHINE>`（**不是 9380，而且不需要端口号！**）。这样应该就能正常访问。

---

### `Ollama - Mistral instance running at 127.0.0.1:11434 but cannot add Ollama as model in RagFlow`

正确的 Ollama IP 地址和端口，是成功添加 Ollama 模型的关键：

- 如果你使用的是 cloud.ragflow.io，请确保承载 Ollama 的服务器具有可公开访问的 IP 地址。注意，127.0.0.1 不是可公开访问的 IP 地址。
- 如果你本地部署 RAGFlow，请确保 Ollama 与 RAGFlow 处于同一局域网，且能相互通信。

更多信息请参阅[部署本地 LLM](https://ragflow.io/docs/guides/models/deploy_local_llm)。

---

### 是否提供使用 DeepDoc 解析 PDF 或其他文件的示例？

提供。请查看 [`rag/app`](https://github.com/infiniflow/ragflow/tree/main/rag/app) 目录中的解析器入口和示例。

例如，`rag/app/naive.py` 展示了 RAGFlow 如何针对不同文件类型选择并调用文档解析器。

---

### `FileNotFoundError: [Errno 2] No such file or directory`

这个错误表示 RAGFlow 找不到所需的文件。请查看完整的错误信息和堆栈跟踪，定位缺失的路径。

- 如果缺失的是模型文件，请检查所需模型是否已成功下载。
- 如果缺失的是已上传的文档，请检查所配置的对象存储服务。
- 如果缺失的是临时文件或本地文件，请检查容器卷映射和文件权限。

可使用[系统健康 API](https://ragflow.io/docs/references/http_api_reference.md#check-system-health)验证所配置的对象存储及其他依赖项。
---

## 用法

---

### 如何配合本地部署的 LLM 运行 RAGFlow？

你可以使用 Ollama 或 Xinference 部署本地 LLM。更多信息请参见[这里](https://ragflow.io/docs/guides/models/deploy_local_llm)。

---

### 如何添加尚不支持的 LLM？

如果你的模型目前不在支持之列，但其 API 与 OpenAI 的 API 兼容，可点击 **Model providers**（模型提供商）页面上的 **OpenAI-API-Compatible** 来配置你的模型：

![openai-api-compatible](/ragflow-images/b1e964f2-b86e-41af-8528-fd8a96dc5f6f.png)

---

### 如何将 RAGFlow 与 Ollama 集成？

- 如果 RAGFlow 是本地部署的，请确保你的 RAGFlow 和 Ollama 处于同一局域网。
- 如果你使用我们的在线演示，请确保你的 Ollama 服务器的 IP 地址是公开且可访问的。

更多信息请参见[这里](https://ragflow.io/docs/guides/models/deploy_local_llm)。

---

### 如何修改文件大小限制？

对于本地部署的 RAGFlow：每次上传的文件总大小上限为 1GB，单次批量上传最多 32 个文件。每个账户的文件总数没有上限。要修改这一 1GB 文件大小限制：

- 在 **docker/.env** 中取消 `# MAX_CONTENT_LENGTH=1073741824` 的注释，并按需调整该值；注意 `1073741824` 表示 1GB（以字节为单位）。
- 如果你修改了 **docker/.env** 中 `MAX_CONTENT_LENGTH` 的值，请相应更新 **nginx/nginx.conf** 中的 `client_max_body_size`。

:::tip 注意
不建议手动修改 32 个文件的批量上传限制。不过，如果你通过 RAGFlow 的 HTTP API 或 Python SDK 上传文件，该 32 文件批量上传限制会自动解除。
:::

---

### 如何获取用于与第三方应用集成的 API key？

请参阅[获取 RAGFlow API key](https://ragflow.io/docs/develop/acquire_ragflow_api_key)。

---

### 如何升级 RAGFlow？

更多信息请参阅[升级 RAGFlow](https://ragflow.io/docs/administrator/upgrade_ragflow)。

---

### 如何将文档引擎切换为 Infinity？

要将文档引擎从 Elasticsearch 切换为 [Infinity](https://github.com/infiniflow/infinity)：

:::danger 警告
切换文档引擎需要重建文档索引。以下命令会删除 Docker 卷和现有数据。继续操作前，请备份所需数据。
:::

1. 停止所有运行中的容器并删除现有卷：

   ```bash
   $ docker compose -f docker/docker-compose.yml down -v
   ```
:::warning 警告
   `-v` 会删除所有 Docker 容器卷，现有数据将被清空。
:::

2. 在 **docker/.env** 中设置以下值：

```env
   DOC_ENGINE=infinity
```

3. 重启你的 Docker 镜像：

   ```bash
   $ docker compose -f docker/docker-compose.yml up -d
   ```

---

### RAGFlow 中上传的文件存储在哪里？

上传的文件存储在所配置的对象存储后端。默认使用 MinIO，其他受支持的选项包括 Amazon S3、Azure Blob Storage、阿里云 OSS、Google Cloud Storage 以及兼容 OpenDAL 的存储。

内部的桶和对象路径取决于文件上传的方式和位置。请通过 RAGFlow 管理上传的文件，而不要依赖固定的存储路径。

---

### 如何调整文档解析与嵌入的批次大小？

你可以通过设置环境变量 `DOC_BULK_SIZE` 和 `EMBEDDING_BATCH_SIZE` 来控制文档解析与嵌入的批次大小。调大这些值可能会提升大规模数据处理的吞吐量，但也会增加内存占用。请根据你的硬件资源进行调整。

---

### 文档已成功解析，为什么在搜索或对话中仍检索不到相关内容？

解析成功只说明文档已被解析并完成分块，并不保证一定能检索到相关内容。

首先，使用检索测试（Retrieval testing）检查能否检索到预期的分块。如果不能，请检查分块结果、嵌入模型、相似度阈值和重排序器设置。如果能检索到预期的分块，但对话仍给出错误回答，请检查对话的检索设置、系统提示词和 LLM。

---

### 为什么同一个查询在检索测试、搜索和对话中产生不同的结果？

**检索测试**主要用于评估能否从数据集中检索到相关分块。**搜索**会根据自身配置对检索到的内容进一步过滤和排序，而**对话**则将检索到的内容作为上下文交给 LLM 生成回答。

因此，即使使用同一个数据集，检索设置、重排序和回答生成上的差异也可能导致不同的结果。

---

### 如何判断问题出在文档解析、分块、检索还是回答生成？

逐步检查 RAG 管道：

1. 确认文档已被正确解析。
2. 检查生成的分块是否包含预期的内容。
3. 使用检索测试验证能否检索到相关分块。
4. 如果检索正常，但对话或 Agent 给出了不符合预期的回答，请检查应用设置、系统提示词和 LLM。

这有助于定位问题出在管道的哪个阶段。

---

### 同一个数据集能否同时供搜索、对话和 Agent 使用？

可以。不同的知识应用和 Agent 都可以使用同一个数据集。

数据集负责管理和索引底层知识，而搜索、对话和 Agent 以不同方式使用这些知识。修改应用层设置一般不会改动数据集中的原始文档或分块。

---

### 应该先调整分块、检索设置还是模型？

先确认文档已被正确解析和分块，然后使用检索测试评估检索质量。

如果检索质量有待提升，可调整相似度阈值、向量相似度权重或重排序器等设置。如果检索结果已经足够相关，但生成的回答仍不理想，可考虑调整提示词或更换 LLM。

---

### 更换嵌入模型、重排序器或 LLM 后，哪些内容需要重新处理？

- 更换**嵌入模型**需要重建文档索引。RAGFlow 通常不允许在数据集中的文档已解析之后更换嵌入模型。如需使用其他嵌入模型，请新建数据集或删除已有的解析数据。
- 更换**重排序器**只影响检索结果的排序，不需要重新解析文档。
- 更换 **LLM** 影响查询理解和回答生成，通常不需要重新解析数据集。

---

### 数据集中已有答案，为什么模型仍会产生幻觉？

数据集中有正确的信息，并不能保证它一定会被检索到，也不能保证 LLM 会严格遵循检索到的上下文。

请检查内容是否已正确索引、相关分块是否被检索到，以及模型在生成回答时是否恰当利用了检索到的上下文。

---

### 如何加快我的对话助手的问答速度？

要降低响应延迟，可以考虑以下几点：
- 换用推理延迟更低、速度更快的 LLM。
- 通过调整 **Top N** 等检索参数，减少检索到的分块数量。
- 保持提示词简洁，避免不必要的上下文。
- 在不需要时，禁用需要额外模型调用的可选功能。
- 仅在重排序器能切实提升检索质量时才使用它。
- 确保所部署的模型服务有充足的计算资源和较低的网络延迟。

---

### 如何加快我的 Agent 的问答速度？

Agent 的响应时间取决于工作流中涉及的组件数量、模型调用和外部服务。
要提升响应速度：
- 对不需要强推理能力的组件，使用更快的模型。
- 减少不必要的 LLM、检索、工具和 HTTP 调用。
- 精简 Agent 工作流，避免过长的执行路径。
- 限制循环或推理密集型组件中的迭代次数。
- 尽可能减少组件之间传递的上下文量。
- 在工作流支持的情况下，并行执行相互独立的操作。
- 确保 Agent 使用的外部 API 和模型服务具有较低的延迟。

### 如何使用 MinerU 解析 PDF 文档？

从 v0.22.0 起，RAGFlow 内置了 MinerU（&ge; 3.3.0）作为可选的 PDF 解析器，支持多种后端。请注意，RAGFlow 在此仅充当 MinerU 的*远程客户端*（remote client）：调用 MinerU API 解析 PDF 并读取返回的文件。要使用该功能：

1. 准备一个可访问的 MinerU API 服务（FastAPI 服务器，MinerU &ge; 3.3.0）。
2. 在 **.env** 文件中，或通过 UI 的 **Model providers**（模型提供商）页面，将 RAGFlow 配置为 MinerU 的远程客户端：
   - `MINERU_APISERVER`：MinerU API 端点（例如 `http://mineru-host:8886`）。
   - `MINERU_BACKEND`：MinerU 后端（与当前 MinerU API / CLI 的 `-b` 取值一致）：
      - `"pipeline"`（默认）
      - `"vlm-engine"`
      - `"hybrid-engine"`
      - `"vlm-http-client"`
      - `"hybrid-http-client"`。
   - `MINERU_SERVER_URL`：当 `MINERU_BACKEND` 为 `"vlm-http-client"` 或 `"hybrid-http-client"` 时必填，其他后端不使用。指下游 OpenAI 兼容的 HTTP 服务器（例如 `http://vllm-host:30000`）。
   - `MINERU_OUTPUT_DIR`：（可选）在摄取前存放 MinerU API 服务输出（zip/JSON）的本地目录。
   - `MINERU_DELETE_OUTPUT`：使用临时目录时是否删除临时输出：
     - `1`：删除。
     - `0`：保留。
3. 在 Web UI 中，进入数据集的 **Configuration**（配置）页面，找到 **Ingestion pipeline**（摄取管道）部分：
   - 如果你打算从 **Built-in**（内置）下拉列表中选择分块方法，请确认该方法支持 PDF 解析，然后从 **PDF parser** 下拉列表中选择 **MinerU**。
   - 如果你使用自定义摄取管道，则在 **Parser**（解析器）组件的 **PDF parser** 部分选择 **MinerU**。

:::info
所有 MinerU 环境变量都是可选的。设置后，这些值会在首次使用时为租户自动预置（auto-provision）一个 MinerU OCR 模型。若不想自动预置，请跳过环境变量设置，只在 UI 的 **Model providers** 页面配置 MinerU。
:::

:::warning 警告
**升级说明：**旧的后端名称（`vlm-transformers`、`vlm-vllm-engine`、`vlm-mlx-engine`、`vlm-vllm-async-engine`、`vlm-lmdeploy-engine`）不再被接受。升级后，请在 **Model providers** 中重新选择当前可用的后端（或更新 `MINERU_BACKEND`），并确保你的 MinerU API 服务版本 &ge; 3.3.0。
:::

:::warning 警告
第三方视觉模型被标记为 **Experimental**（实验性），因为我们尚未针对上述数据提取任务充分测试这些模型。
:::
---

### 如何配置 MinerU 的相关设置？

下表汇总了远程 MinerU 场景下最常用的 MinerU 环境变量：

| 环境变量               | 说明                               | 默认值                              | 示例                                                                                            |
| ---------------------- | ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------- |
| `MINERU_APISERVER`     | MinerU API 服务的 URL      | _未设置_                             | `MINERU_APISERVER=http://your-mineru-server:8886`                                              |
| `MINERU_BACKEND`       | MinerU 解析后端             | `pipeline`                          | `MINERU_BACKEND=pipeline\|vlm-engine\|hybrid-engine\|vlm-http-client\|hybrid-http-client` |
| `MINERU_SERVER_URL`    | `vlm-http-client` / `hybrid-http-client` 所必需；其他情况不使用 | _未设置_ | `MINERU_SERVER_URL=http://your-vllm-server-ip:30000`                                           |
| `MINERU_OUTPUT_DIR`    | 存放 MinerU 输出文件的目录  | 系统临时目录  | `MINERU_OUTPUT_DIR=/home/ragflow/mineru/output`                                                |
| `MINERU_DELETE_OUTPUT` | 使用临时目录时是否删除 MinerU 输出目录 | `1`（删除临时输出） | `MINERU_DELETE_OUTPUT=0`                                                                       |

1. 设置 `MINERU_APISERVER`，让 RAGFlow 指向你的 MinerU API 服务器。
2. 设置 `MINERU_BACKEND`，指定解析后端。
3. 如果使用 `"vlm-http-client"` 或 `"hybrid-http-client"`，请将 `MINERU_SERVER_URL` 设为你的 OpenAI 兼容服务器的 URL。MinerU API 要求在请求体中携带 `backend=<http-client-backend>` 和 `server_url=http://<server>:30000`。
4. 设置 `MINERU_OUTPUT_DIR`，指定 RAGFlow 存放 MinerU API 输出的位置；否则会使用系统临时目录。
5. 将 `MINERU_DELETE_OUTPUT` 设为 `0` 可保留 MinerU 的临时输出（便于调试）。

:::tip 注意
关于 MinerU 原生支持的其他环境变量，请参见[这里](https://opendatalab.github.io/MinerU/usage/cli_tools/#environment-variables-description)。
:::

---

### 如何让 MinerU 搭配 vLLM 服务器进行文档解析？

RAGFlow 支持 MinerU 的 `vlm-http-client` 和 `hybrid-http-client` 后端，让你可以在通过 HTTP 调用 MinerU 的同时，把文档解析任务委托给远程的 OpenAI 兼容服务器（例如 vLLM）。配置方法：

1. 确保有一个可访问的 MinerU API 服务（例如 `http://mineru-host:8886`）。
2. 搭建或指定一个 OpenAI 兼容的 HTTP 服务器（例如 `http://vllm-host:30000`）。
3. 在 **docker/.env** 文件（若从源码运行则在 shell 中）中配置以下内容：
   - `MINERU_APISERVER=http://mineru-host:8886`
   - `MINERU_BACKEND="vlm-http-client"`（或 `"hybrid-http-client"`）
   - `MINERU_SERVER_URL="http://vllm-host:30000"`
   MinerU API 调用要求在请求体中携带 `backend=vlm-http-client`（或 `hybrid-http-client`）和 `server_url=http://<server>:30000`。
4. 按需配置 `MINERU_OUTPUT_DIR` / `MINERU_DELETE_OUTPUT`，以便在摄取前管理返回的 zip/JSON。

:::tip 注意
使用 `*-http-client` 后端时，RAGFlow 服务器不需要 GPU，只需网络连通即可。这样就能以较低成本进行分布式部署，让多个 RAGFlow 实例共享一个远程推理服务器。
:::

### 如何使用外部 Docling Serve 服务器进行文档解析？

RAGFlow 支持以两种模式使用 Docling：

1. **本地 Docling**（现有模式）：在 RAGFlow 运行时环境中安装 Docling（`USE_DOCLING=true`），在进程内解析。
2. **外部 Docling Serve**（远程模式）：让 RAGFlow 指向一个 Docling Serve 端点。

要启用远程模式，请设置：

```bash
DOCLING_SERVER_URL=http://your-docling-serve-host:5001
```

具体行为：

- 设置了 `DOCLING_SERVER_URL` 时，RAGFlow 会使用 `/v1/convert/source` 将 PDF 发送给 Docling Serve（对较旧的服务器则回退到 `/v1alpha/convert/source`）。
- 未设置 `DOCLING_SERVER_URL` 时，RAGFlow 使用本地的进程内 Docling。

### 如何使用 PaddleOCR 进行文档解析？

从 v0.24.0 起，RAGFlow 将 PaddleOCR 纳入为可选的 PDF 解析器。请注意，RAGFlow 在此仅充当 PaddleOCR 的*远程客户端*（remote client）：调用 PaddleOCR API 解析 PDF 并读取返回的文件。

在 RAGFlow 中配置和使用 PaddleOCR 主要有两种方式：

#### 1. 使用 PaddleOCR 官方 API

这种方式使用带访问令牌的 PaddleOCR 官方 API 服务。

**步骤 1：配置 RAGFlow**
- **通过环境变量：**
   ```bash
   # In your docker/.env file:
   PADDLEOCR_API_URL=https://your-paddleocr-api-endpoint
   PADDLEOCR_ALGORITHM=PaddleOCR-VL
   PADDLEOCR_ACCESS_TOKEN=your-access-token-here
   ```

- **通过 UI：**
   - 进入 **Model providers** 页面
   - 新增一个厂商类型为 "PaddleOCR" 的 OCR 模型
   - 配置以下字段：
      - **PaddleOCR API URL**：你的 PaddleOCR API 端点
      - **PaddleOCR Algorithm**：选择与该 API 端点对应的算法
      - **AI Studio Access Token**：你用于 PaddleOCR API 的访问令牌

**步骤 2：在数据集配置中使用**
- 在数据集的 **Configuration** 页面，找到 **Ingestion pipeline** 部分
- 如果使用支持 PDF 解析的内置分块方法，请从 **PDF parser** 下拉列表中选择 **PaddleOCR**
- 如果使用自定义摄取管道，请在 **Parser** 组件中选择 **PaddleOCR**

**注意事项：**
- 要获取 API URL，请访问 [PaddleOCR 官网](https://aistudio.baidu.com/paddleocr)，点击 **API** 按钮，选择你想使用的算法对应的示例代码（例如 PaddleOCR-VL），然后复制其中的 `API_URL`。
- 访问令牌可从 [AI Studio 平台](https://aistudio.baidu.com/account/accessToken)获取。
- 该方式需要能够访问互联网，以连接 PaddleOCR 官方 API。

#### 2. 使用自部署的 PaddleOCR 服务

这种方式允许你部署自己的 PaddleOCR 服务，无需访问令牌即可使用。

**步骤 1：部署 PaddleOCR 服务**
按照 [PaddleOCR 服务化部署文档](https://www.paddleocr.ai/latest/en/version3.x/inference_deployment/serving/serving.html)部署你自己的服务。对于版面解析，可以使用类似这样的端点：

```bash
http://localhost:8080/layout-parsing
```

**步骤 2：配置 RAGFlow**
- **通过环境变量：**
  ```bash
  PADDLEOCR_API_URL=http://localhost:8080/layout-parsing
  PADDLEOCR_ALGORITHM=PaddleOCR-VL
  # No access token required for self-hosted service
  ```

- **通过 UI：**
   - 进入 **Model providers** 页面
   - 新增一个厂商类型为 "PaddleOCR" 的 OCR 模型
   - 配置以下字段：
      - **PaddleOCR API URL**：你部署的服务的端点
      - **PaddleOCR Algorithm**：选择与所部署服务对应的算法
      - **AI Studio Access Token**：留空

**步骤 3：在数据集配置中使用**
- 在数据集的 **Configuration** 页面，找到 **Ingestion pipeline** 部分
- 如果使用支持 PDF 解析的内置分块方法，请从 **PDF parser** 下拉列表中选择 **PaddleOCR**
- 如果使用自定义摄取管道，请在 **Parser** 组件中选择 **PaddleOCR**

#### 环境变量汇总

| 环境变量 | 说明 | 默认值 | 是否必需 |
|---------------------|-------------|---------|----------|
| `PADDLEOCR_API_URL` | PaddleOCR API 端点 URL | `""` | 使用环境变量时必填 |
| `PADDLEOCR_ALGORITHM` | 用于解析的算法 | `"PaddleOCR-VL"` | 否 |
| `PADDLEOCR_ACCESS_TOKEN` | 官方 API 的访问令牌 | `None` | 仅在使用官方 API 时需要 |

环境变量可用于自动预置模型，但如果通过 UI 配置则并非必需。设置环境变量后，这些值会在首次使用时为租户自动预置一个 PaddleOCR 模型。

### 如何在 RAGFlow 中配合 Ollama 进行本地 LLM 推理？

RAGFlow 支持 Ollama 作为本地模型提供商，用于私有化的离线推理。

**步骤 1：启动 Ollama 并拉取模型**

```bash
ollama serve
ollama pull llama3
```

**步骤 2：在 RAGFlow 中添加 Ollama**

1. 进入 **Settings** > **Model providers** > **Ollama**。
2. 将 Base URL 设为 `http://host.docker.internal:11434`（Docker）或 `http://localhost:11434`（裸机）。
3. 输入模型名称（例如 `llama3`），然后点击 **Save**（保存）。

**步骤 3：在你的助手中使用 Ollama**

- 打开助手的 **Configuration** 页面，在 **Chat model**（对话模型）中选择 Ollama 模型。
