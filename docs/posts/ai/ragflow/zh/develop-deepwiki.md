# 在 DeepWiki 上探索 RAGFlow

一个由 AI 生成、始终保持最新的知识库，用于理解 RAGFlow 的代码库——专为从事二次开发或希望深入探究 RAGFlow 内部实现的开发者而设计。

---

:::warning 注意
DeepWiki 上的 RAGFlow 内容由 DeepWiki 维护，而非 RAGFlow 团队，可能滞后于最新官方发布版本。最新信息请始终以官方 [RAGFlow 文档](https://ragflow.io/docs/dev/) 和 [源代码](https://github.com/infiniflow/ragflow) 为准。
:::

## DeepWiki 是什么？

[DeepWiki](https://deepwiki.com) 是一款 AI 驱动的工具，可以自动读取 GitHub 仓库的源代码、测试和文档，生成结构化的交互式 wiki。它会梳理出架构图、模块关系、数据流和设计思路——全程无需人工编写文档。

## RAGFlow 的 DeepWiki 页面

RAGFlow 项目的索引地址为：

**[https://deepwiki.com/infiniflow/ragflow](https://deepwiki.com/infiniflow/ragflow)**

## 目标读者

这一资源主要面向：

- 想要扩展或定制 RAGFlow 的**二次开发者**（例如添加新的文档解析器、接入新的 LLM 提供商或修改检索管道）。
- 在提交 PR 之前需要了解某个模块如何融入整体架构的**贡献者**。
- 想要研究 RAGFlow 内部设计原理——分块策略、嵌入管道、基于图的检索以及 Agent 编排——的**研究者和工程师**。

:::tip 注意
如果只是想了解 RAGFlow 的一般用法（配置知识库、运行对话等），[指南](https://ragflow.io/docs/guides)部分是更好的起点。
:::

## 在 DeepWiki 上能找到什么

| 主题 | 可以了解什么 |
|---|---|
| **整体架构** | 展示 `api/`、`rag/`、`deepdoc/`、`agent/`、`web/` 各部分如何关联的高层组件图 |
| **文档摄取管道** | 文件如何从上传 → 解析（`deepdoc/`）→ 分块 → 嵌入 → 存储 |
| **检索管道** | 查询如何被处理，混合搜索（关键词 + 向量）如何工作，以及重排序如何应用 |
| **Agent 框架** | `agent/` 如何编排多步推理、工具调用和记忆 |
| **LLM / 嵌入抽象层** | `rag/llm/` 如何把不同的模型提供商封装在统一接口之后 |
| **API 层** | `api/apps/` 的 Blueprint 路由如何映射到内部服务调用 |

## 在本地开发的同时使用 DeepWiki

在修改代码库时，DeepWiki 可以帮你快速回答这类问题：

- *“任务执行的入口在哪里？”*
- *“哪个类负责 PDF 页面切分？”*
- *“知识图谱检索与稠密向量路径有什么不同？”*

你还可以通过 DeepWiki 内置的聊天界面用自然语言提问——它的回答将以实际源代码为依据。

## 保持 Wiki 最新

当上游 `main` 分支更新时，DeepWiki 会自动重新索引仓库。如果你发现索引内容落后于最近的发布版本，可以在 DeepWiki 页面上手动触发重新索引。

## 相关资源

- [从源码启动服务](https://ragflow.io/docs/develop/launch_ragflow_from_source)——搭建本地 RAGFlow 开发环境。
- [构建 RAGFlow Docker 镜像](https://ragflow.io/docs/develop/build_docker_image)——在修改代码后构建自定义镜像。
- [贡献指南](https://ragflow.io/docs/develop/contributing)——了解代码库之后如何提交 PR。
