# 切换文档引擎

把你的文档引擎从 Elasticsearch 切换到 Infinity。

---

RAGFlow 默认使用 Elasticsearch 存储全文和向量。要切换到 [Infinity](https://github.com/infiniflow/infinity/)，请按以下步骤操作：

:::warning 警告
在 Linux/arm64 机器上切换到 Infinity 尚未获得官方支持。
:::

1. 停止所有正在运行的容器：

   ```bash
   $ docker compose -f docker/docker-compose.yml down -v
   ```

:::warning 警告
`-v` 会删除 Docker 容器卷，现有数据将被清空。
:::

2. 将 **docker/.env** 中的 `DOC_ENGINE` 设置为 `infinity`。
3. 启动容器：

   ```bash
   $ docker compose -f docker-compose.yml up -d
   ```
