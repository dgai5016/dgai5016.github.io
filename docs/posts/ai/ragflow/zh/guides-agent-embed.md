# 嵌入网页

## 通过网页嵌入 Agent
你可以使用 iframe 将 Agent 嵌入第三方网页。

前提条件：必须先获取 API Key。

步骤：
1. 在 Agent 页面点击目标 Agent，打开其编辑页面。
2. 点击画布右上角的 **管理 > 嵌入网页**，打开 iframe 窗口。

![将 Agent 嵌入网页的菜单](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/embed_agent_into_webpage.jpg)
3. 复制 iframe 代码并将其嵌入你的网页。

![嵌入 Agent 网页](https://raw.githubusercontent.com/infiniflow/ragflow-docs/main/images/embed_an_agent_web_page.jpg)
> **注意：** 目前只有 **工作流（Workflow）** Agent 支持嵌入网页；**摄取管道（Ingestion pipeline）** 和 **编译算子（Compilation Operator）** Agent 不支持网页嵌入。
