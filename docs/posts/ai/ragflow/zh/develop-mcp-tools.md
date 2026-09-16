# RAGFlow MCP 工具

MCP 服务器目前提供一个专用工具，基于 RAGFlow DeepDoc 技术帮助用户搜索相关信息：

- **retrieve**：根据给定问题，通过 RAGFlow 检索接口从指定的 `dataset_ids` 以及可选的 `document_ids` 中获取相关分块。所有可用数据集的详细信息（即 `id` 与 `description`）会在各个数据集的工具描述中给出。

更多信息请参见我们的 [MCP 服务器](https://github.com/infiniflow/ragflow/blob/main/mcp/server/server.py) Python 实现。
