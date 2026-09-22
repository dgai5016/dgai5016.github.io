---
title: AI 开源库
date: 2026-09-22 12:51
tags:
  - 开源库
excerpt: AI 相关开源仓库导航：按「大类 → 小类」两级分类组织，每个仓库附 GitHub 链接与一句话简介，持续更新。
layout: post
---

# AI 开源库

收录 AI 相关的开源仓库，按「大类 → 小类」两级分类组织，持续更新。

最近更新：2026-09-22

## RAG

### 框架

- **[RAGFlow](https://github.com/infiniflow/ragflow)** — https://github.com/infiniflow/ragflow

  基于深度文档理解的开源 RAG 引擎，提供模板化分块、多路召回、引用溯源与可编排的智能体工作流，支持对接主流大模型。

- **[GraphRAG](https://github.com/microsoft/graphrag)** — https://github.com/microsoft/graphrag

  微软开源的知识图谱增强 RAG 框架，用 LLM 从语料中抽取实体与关系构建图谱，再分层生成社区摘要，擅长回答需要跨文档全局理解的「大局观」问题。

### 文档解析

- **[pdfplumber](https://github.com/jsvine/pdfplumber)** — https://github.com/jsvine/pdfplumber

  纯 Python 的 PDF 解析库，可精细提取文本、表格、坐标与注释，表格结构还原尤其出色，是文档处理与数据抽取的常用底座。

- **[MinerU](https://github.com/opendatalab/MinerU)** — https://github.com/opendatalab/MinerU

  上海人工智能实验室 OpenDataLab 开源的文档解析工具，将 PDF、网页、电子书转为 Markdown，对公式、表格与复杂版面的还原效果出色，常用于大模型语料预处理。

### 检索引擎

- **[Elasticsearch](https://github.com/elastic/elasticsearch)** — https://github.com/elastic/elasticsearch

  老牌分布式搜索与分析引擎，支持 BM25 全文检索与 kNN 向量检索，原生混合检索能力使其成为 RAG 系统中常见的检索底座。

## 提示工程

### 学习指南

- **[Prompt-Engineering-Guide](https://github.com/dair-ai/Prompt-Engineering-Guide)** — https://github.com/dair-ai/Prompt-Engineering-Guide

  dair-ai 维护的提示工程权威指南，系统覆盖提示基础、常用技巧、应用场景与研究论文索引，提供多语言版本，是该领域最全面的学习入口。

### 提示词库

- **[prompts.chat](https://github.com/f/prompts.chat)** — https://github.com/f/prompts.chat

  知名 ChatGPT 提示词库，精选数百条场景化提示词，覆盖角色扮演、写作、编程等场景，可一键复制使用。

- **[awesome-chatgpt-prompts-zh](https://github.com/PlexPt/awesome-chatgpt-prompts-zh)** — https://github.com/PlexPt/awesome-chatgpt-prompts-zh

  ChatGPT 中文提示词库，持续收录社区贡献的中文场景提示词，配套提示词生成器，中文用户即取即用。

### 提示压缩

- **[LLMLingua](https://github.com/microsoft/LLMLingua)** — https://github.com/microsoft/LLMLingua

  微软开源的提示压缩工具，用小语言模型剔除提示中的非关键 token，最高压缩 20 倍，既省调用成本又缓解长上下文「迷失中间」问题。

## 智能体工程

### 学习指南

- **[Harness Books](https://github.com/wquguru/harness-books)** — https://github.com/wquguru/harness-books

  AgentWay 出品的中英双语两部曲：第一本拆解 Claude Code 的查询循环、权限与上下文治理等运行时结构，第二本对比 Claude Code 与 Codex 的 harness 设计哲学。

- **[《驾驭工程：从 Claude Code 源码到 AI 编码最佳实践》](https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding)** — https://github.com/ZhangHanDong/harness-engineering-from-cc-to-ai-coding

  张汉东所著的中文技术书，别名《马书》：基于 Claude Code 发布包与 source map 的逆向分析，系统提炼 AI 编码智能体的架构、上下文管理与权限体系。

- **[harness-engineering](https://github.com/deusyu/harness-engineering)** — https://github.com/deusyu/harness-engineering

  围绕 OpenAI 提出的 Harness Engineering（驭缰工程）范式构建的系统学习档案——人类设计约束、智能体写代码，含概念笔记、四十余篇专业译文与文献深度摘要。

### 记忆管理

- **[Zep](https://github.com/getzep/zep)** — https://github.com/getzep/zep

  Zep 官方仓库：托管式智能体记忆平台 Zep Cloud 的 SDK、框架集成（LangGraph、CrewAI 等）与数据导入示例集合，平台本身闭源。

- **[Graphiti](https://github.com/getzep/graphiti)** — https://github.com/getzep/graphiti

  Zep 团队开源的时序知识图谱框架，为智能体提供记忆层：事实带有效期、过时自动失效而非删除，支持增量更新与混合检索。

## LLM 评估

### 评估框架

- **[Ragas](https://github.com/vibrantlabsai/ragas)** — https://github.com/vibrantlabsai/ragas

  VibrantLabs 维护的 LLM 应用评估工具包，提供忠实度、答案相关性等客观指标，还能自动生成对齐生产场景的测试集，与主流框架无缝集成。

- **[OpenAI Evals](https://github.com/openai/evals)** — https://github.com/openai/evals

  OpenAI 官方开源的 LLM 评估框架，内置覆盖多维度能力的评估注册表，支持用私有数据编写自定义评估，是模型评测领域的早期标杆。

- **[DeepEval](https://github.com/confident-ai/deepeval)** — https://github.com/confident-ai/deepeval

  开源 LLM 评估框架，像 pytest 一样对 LLM 应用做单元测试，内置 G-Eval、幻觉、RAG 与智能体指标，覆盖端到端与组件级评估。

### 可观测与追踪

- **[Langfuse](https://github.com/langfuse/langfuse)** — https://github.com/langfuse/langfuse

  开源 LLM 工程平台，集可观测追踪、评估、提示词管理与数据集于一体，几分钟即可自托管，与主流框架无缝集成。

- **[MLflow](https://github.com/mlflow/mlflow)** — https://github.com/mlflow/mlflow

  老牌开源 AI 工程平台，从机器学习实验追踪、模型注册扩展到 LLM 追踪、评估与提示词管理，60 余种框架一行代码接入。

- **[TruLens](https://github.com/truera/trulens)** — https://github.com/truera/trulens

  开源的 LLM 应用可观测与评估工具：以 OpenTelemetry 原生方式追踪每一步调用，用自带解释的 LLM 评审打分，横向对比应用版本的质量与成本。

- **[LangSmith SDK](https://github.com/langchain-ai/langsmith-sdk)** — https://github.com/langchain-ai/langsmith-sdk

  LangChain 官方 LangSmith 平台的 Python/JS 客户端 SDK，为任意 LLM 应用提供追踪、评估与监控能力，与 LangChain 生态原生集成。

## 应用开发框架

### 应用框架

- **[Letta Code](https://github.com/letta-ai/letta-code)** — https://github.com/letta-ai/letta-code

  Letta 的智能体 harness 与 CLI：npm 安装即用，智能体具备持久记忆与技能，能自我改写进化，同一智能体可跨机器与多个消息渠道使用。

- **[Letta](https://github.com/letta-ai/letta)** — https://github.com/letta-ai/letta

  前身 MemGPT 的有状态智能体框架：为智能体配备持久记忆，可跨会话学习改进；本仓库为项目入口，活跃开发在 Letta Code。

- **[LangChain](https://github.com/langchain-ai/langchain)** — https://github.com/langchain-ai/langchain

  构建智能体与 LLM 应用的老牌开源框架，为模型、工具、向量库提供统一抽象与海量第三方集成，配套 LangGraph 编排可控的智能体工作流。

- **[LlamaIndex](https://github.com/run-llama/llama_index)** — https://github.com/run-llama/llama_index

  构建智能体应用与 RAG 的开源数据框架，覆盖数据接入、索引、检索全链路，配套 LlamaParse 提供企业级文档解析与结构化抽取。

## 模型服务

### 推理引擎

- **[vLLM](https://github.com/vllm-project/vllm)** — https://github.com/vllm-project/vllm

  UC Berkeley 起源的高性能 LLM 推理与服务引擎，凭 PagedAttention 显存管理与连续批处理取得业界领先吞吐，支持 200 余种主流模型架构。

- **[SGLang](https://github.com/sgl-project/sglang)** — https://github.com/sgl-project/sglang

  LMSYS 托管的高性能推理服务框架，以 RadixAttention 前缀缓存与零开销调度器实现高吞吐低延迟，从单卡到大规模集群均可部署。

### API 网关

- **[LiteLLM](https://github.com/BerriAI/litellm)** — https://github.com/BerriAI/litellm

  开源 AI 网关，以 OpenAI 统一格式调用 100 余家提供商的模型，自带虚拟密钥、花费追踪、负载均衡与护栏，支持自托管。
