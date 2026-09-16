# 链路追踪

基于 Langfuse 的可观测性与链路追踪。

---

:::info 致谢
本文档由社区贡献者 [jannikmaierhoefer](https://github.com/jannikmaierhoefer) 提供。👏
:::

RAGFlow 内置了 [Langfuse](https://langfuse.com) 集成，让你可以近实时地**检查和调试 RAG 管道中每一个检索与生成步骤**。

Langfuse 将 trace、span 和提示词载荷存储在专为可观测性构建的后端中，并在其上提供过滤与可视化功能。

:::info 注意
• RAGFlow **≥ 0.18.0**（包含 Langfuse 连接器）
• 一个 Langfuse 工作区（云端或自托管），备有 _Project Public Key_（项目公钥）与 _Secret Key_（密钥）
:::

---

## 1. 收集 Langfuse 凭据

1. 登录你的 Langfuse 仪表盘。
2. 打开 **Settings ▸ Projects**，新建一个项目或选择一个已有项目。
3. 复制 **Public Key** 和 **Secret Key**。
4. 记下 Langfuse **host**（例如 `https://cloud.langfuse.com`）。如果是自托管，请使用你自己安装的基础 URL。

> 这些密钥是_项目级（project-scoped）_的：所有需要写入同一项目的环境共用一对密钥即可。

---

## 2. 将密钥添加到 RAGFlow

RAGFlow 以_租户_为单位存储这些凭据。你可以通过 Web UI 或 HTTP API 进行配置。

1. 登录 RAGFlow，点击右上角的头像。
2. 选择 **API ▸ 滚动到页面底部 ▸ Langfuse Configuration**。
3. 填入你的 Langfuse **Host**、**Public Key** 和 **Secret Key**。
4. 点击 **Save**。

保存后，RAGFlow 会自动开始上报 trace——无需改动任何代码。

---

## 3. 运行管道并查看 trace

1. 在 RAGFlow 中执行任意对话或检索管道（例如 Quickstart 演示）。
2. 打开你的 Langfuse 项目 ▸ **Traces**。
3. 按 **name ~ `ragflow-*`** 过滤（RAGFlow 会给每个 trace 加上 `ragflow-` 前缀）。

对于每个用户请求，你会看到：

• 一条代表整个请求的 **trace**
• 对应检索、排序和生成步骤的 **span**
• 作为元数据的完整**提示词**、**检索到的文档**和 **LLM 响应**

（[Langfuse 中的示例 trace](https://cloud.langfuse.com/project/cloramnkj0002jz088vzn1ja4/traces/0bde9629-4251-4386-b583-26101b8e7561?timestamp=2025-05-09T19%3A15%3A37.797Z&display=details&observation=823997d8-ac40-40f3-8e7b-8aa6753b499e)）

:::tip 注意
可以用 Langfuse 的 diff 视图比较提示词版本，或者下钻查看耗时较长的检索，以定位瓶颈。
:::
