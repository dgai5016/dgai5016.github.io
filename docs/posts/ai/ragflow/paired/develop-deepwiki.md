<BiRow>
<template #en>

An AI-generated, always-up-to-date knowledge base for understanding RAGFlow's codebase — designed for developers doing secondary development or deep-diving into RAGFlow's internals.

</template>
<template #zh>

一个由 AI 生成、始终保持最新的知识库，用于理解 RAGFlow 的代码库——专为从事二次开发或希望深入探究 RAGFlow 内部实现的开发者而设计。

</template>
</BiRow>

<BiRow>
<template #en>

---

</template>
<template #zh>

---

</template>
</BiRow>

<BiRow>
<template #en>

:::warning NOTE
The RAGFlow content on DeepWiki is maintained by DeepWiki, not by the RAGFlow team. It may lag behind the latest official release. Always refer to the official [RAGFlow documentation](https://ragflow.io/docs/dev/) and [source code](https://github.com/infiniflow/ragflow) for the most up-to-date information.
:::

</template>
<template #zh>

:::warning 注意
DeepWiki 上的 RAGFlow 内容由 DeepWiki 维护，而非 RAGFlow 团队，可能滞后于最新官方发布版本。最新信息请始终以官方 [RAGFlow 文档](https://ragflow.io/docs/dev/) 和 [源代码](https://github.com/infiniflow/ragflow) 为准。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## What Is DeepWiki?

</template>
<template #zh>

## DeepWiki 是什么？

</template>
</BiRow>

<BiRow>
<template #en>

[DeepWiki](https://deepwiki.com) is an AI-powered tool that automatically reads a GitHub repository's source code, tests, and documentation to produce a structured, interactive wiki. It maps out architecture diagrams, module relationships, data flows, and design rationale — all without requiring manual documentation work.

</template>
<template #zh>

[DeepWiki](https://deepwiki.com) 是一款 AI 驱动的工具，可以自动读取 GitHub 仓库的源代码、测试和文档，生成结构化的交互式 wiki。它会梳理出架构图、模块关系、数据流和设计思路——全程无需人工编写文档。

</template>
</BiRow>

<BiRow>
<template #en>

## The RAGFlow DeepWiki Page

</template>
<template #zh>

## RAGFlow 的 DeepWiki 页面

</template>
</BiRow>

<BiRow>
<template #en>

The RAGFlow project is indexed at:

</template>
<template #zh>

RAGFlow 项目的索引地址为：

</template>
</BiRow>

<BiRow>
<template #en>

**[https://deepwiki.com/infiniflow/ragflow](https://deepwiki.com/infiniflow/ragflow)**

</template>
<template #zh>

**[https://deepwiki.com/infiniflow/ragflow](https://deepwiki.com/infiniflow/ragflow)**

</template>
</BiRow>

<BiRow>
<template #en>

## Target Audience

</template>
<template #zh>

## 目标读者

</template>
</BiRow>

<BiRow>
<template #en>

This resource is primarily intended for:

</template>
<template #zh>

这一资源主要面向：

</template>
</BiRow>

<BiRow>
<template #en>

- **Secondary developers** who want to extend or customize RAGFlow (e.g., add a new document parser, integrate a new LLM provider, or modify the retrieval pipeline).
- **Contributors** who need to understand how a specific module fits into the overall architecture before filing a PR.
- **Researchers and engineers** who want to study RAGFlow's internal design principles — chunking strategies, embedding pipelines, graph-based retrieval, and agent orchestration.

</template>
<template #zh>

- 想要扩展或定制 RAGFlow 的**二次开发者**（例如添加新的文档解析器、接入新的 LLM 提供商或修改检索管道）。
- 在提交 PR 之前需要了解某个模块如何融入整体架构的**贡献者**。
- 想要研究 RAGFlow 内部设计原理——分块策略、嵌入管道、基于图的检索以及 Agent 编排——的**研究者和工程师**。

</template>
</BiRow>

<BiRow>
<template #en>

:::tip NOTE
For general usage of RAGFlow (configuring knowledge bases, running chat, etc.), the [Guides](https://ragflow.io/docs/guides) section is a better starting point.
:::

</template>
<template #zh>

:::tip 注意
如果只是想了解 RAGFlow 的一般用法（配置知识库、运行对话等），[指南](https://ragflow.io/docs/guides)部分是更好的起点。
:::

</template>
</BiRow>

<BiRow>
<template #en>

## What You Can Find on DeepWiki

</template>
<template #zh>

## 在 DeepWiki 上能找到什么

</template>
</BiRow>

<BiRow>
<template #en>

| Topic | What to look for |
|---|---|
| **Overall architecture** | High-level component diagram showing how `api/`, `rag/`, `deepdoc/`, `agent/`, and `web/` relate to each other |
| **Document ingestion pipeline** | How files flow from upload → parsing (`deepdoc/`) → chunking → embedding → storage |
| **Retrieval pipeline** | How queries are processed, how hybrid search (keyword + vector) works, and how reranking is applied |
| **Agent framework** | How `agent/` orchestrates multi-step reasoning, tool calling, and memory |
| **LLM / Embedding abstractions** | How `rag/llm/` wraps different model providers behind a unified interface |
| **API layer** | How `api/apps/` Blueprint routes map to internal service calls |

</template>
<template #zh>

| 主题 | 可以了解什么 |
|---|---|
| **整体架构** | 展示 `api/`、`rag/`、`deepdoc/`、`agent/`、`web/` 各部分如何关联的高层组件图 |
| **文档摄取管道** | 文件如何从上传 → 解析（`deepdoc/`）→ 分块 → 嵌入 → 存储 |
| **检索管道** | 查询如何被处理，混合搜索（关键词 + 向量）如何工作，以及重排序如何应用 |
| **Agent 框架** | `agent/` 如何编排多步推理、工具调用和记忆 |
| **LLM / 嵌入抽象层** | `rag/llm/` 如何把不同的模型提供商封装在统一接口之后 |
| **API 层** | `api/apps/` 的 Blueprint 路由如何映射到内部服务调用 |

</template>
</BiRow>

<BiRow>
<template #en>

## Using DeepWiki Alongside Local Development

</template>
<template #zh>

## 在本地开发的同时使用 DeepWiki

</template>
</BiRow>

<BiRow>
<template #en>

When you are making changes to the codebase, DeepWiki can help you quickly answer questions such as:

</template>
<template #zh>

在修改代码库时，DeepWiki 可以帮你快速回答这类问题：

</template>
</BiRow>

<BiRow>
<template #en>

- *"Where is the entry point for task execution?"*
- *"Which class handles PDF page segmentation?"*
- *"How does the knowledge graph retrieval differ from the dense vector path?"*

</template>
<template #zh>

- *“任务执行的入口在哪里？”*
- *“哪个类负责 PDF 页面切分？”*
- *“知识图谱检索与稠密向量路径有什么不同？”*

</template>
</BiRow>

<BiRow>
<template #en>

You can also ask DeepWiki questions in natural language using its built-in chat interface — it will ground its answers in the actual source code.

</template>
<template #zh>

你还可以通过 DeepWiki 内置的聊天界面用自然语言提问——它的回答将以实际源代码为依据。

</template>
</BiRow>

<BiRow>
<template #en>

## Keeping the Wiki Current

</template>
<template #zh>

## 保持 Wiki 最新

</template>
</BiRow>

<BiRow>
<template #en>

DeepWiki re-indexes the repository automatically when the upstream `main` branch is updated. If you notice the indexed content lagging behind a recent release, you can trigger a manual re-index from the DeepWiki page.

</template>
<template #zh>

当上游 `main` 分支更新时，DeepWiki 会自动重新索引仓库。如果你发现索引内容落后于最近的发布版本，可以在 DeepWiki 页面上手动触发重新索引。

</template>
</BiRow>

<BiRow>
<template #en>

## Related Resources

</template>
<template #zh>

## 相关资源

</template>
</BiRow>

<BiRow>
<template #en>

- [Launch service from source](https://ragflow.io/docs/develop/launch_ragflow_from_source) — set up a local RAGFlow development environment.
- [Build RAGFlow Docker image](https://ragflow.io/docs/develop/build_docker_image) — build a custom image after code changes.
- [Contribution guidelines](https://ragflow.io/docs/develop/contributing) — how to file a PR once you understand the codebase.

</template>
<template #zh>

- [从源码启动服务](https://ragflow.io/docs/develop/launch_ragflow_from_source)——搭建本地 RAGFlow 开发环境。
- [构建 RAGFlow Docker 镜像](https://ragflow.io/docs/develop/build_docker_image)——在修改代码后构建自定义镜像。
- [贡献指南](https://ragflow.io/docs/develop/contributing)——了解代码库之后如何提交 PR。

</template>
</BiRow>
