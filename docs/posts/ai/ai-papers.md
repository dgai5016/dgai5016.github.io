---
title: AI 论文翻译
date: 2026-09-18 13:29
tags:
  - 论文翻译
excerpt: arxiv 上 AI 领域重要论文的中文全文翻译合集：公式以 LaTeX 渲染、图表落地本地、每篇附导读。
layout: post
---

# AI 论文翻译

> 最近更新：2026-09-20

收录 AI 领域重要论文（多来自 arxiv）的中文全文翻译，持续更新。

## 2026 年

### 3 月

- **[《Building Effective AI Coding Agents for the Terminal: Scaffolding, Harness, Context Engineering, and Lessons Learned》](https://arxiv.org/pdf/2603.05344)**（构建终端里的高效 AI 编码代理：脚手架、Harness、上下文工程与经验教训）（Bui 等）

  首个开源终端原生编码代理 OpenDev 的全面技术报告：按工作流绑定多模型、schema 级安全分离规划与执行、自适应上下文压缩把观察类上下文峰值消耗降低约 54%。<PostLink to="/papers-zh/ai-coding-agents-terminal">全文译文</PostLink>

### 2 月

- **[《AutoHarness: improving LLM agents by automatically synthesizing a code harness》](https://arxiv.org/pdf/2603.03329)**（AutoHarness：通过自动合成代码 Harness 改进 LLM 智能体）（Lou 等，Google DeepMind）

  Gemini-2.5-Flash 借助 Thompson 采样树搜索与环境反馈自动合成代码 harness，在 145 个 TextArena 游戏中杜绝全部非法动作，让小模型反超 Gemini-2.5-Pro。<PostLink to="/papers-zh/autoharness">全文译文</PostLink>

## 2023 年

### 12 月

- **[《Fine-Tuning or Retrieval? Comparing Knowledge Injection in LLMs》](https://arxiv.org/pdf/2312.05934)**（微调还是检索？——比较 LLM 的知识注入方式）（Ovadia 等，Microsoft）

  在 MMLU 与自建 2023 时事问答上实证比较，RAG 注入新知识与更新旧知识都显著优于无监督微调，且不损害模型已有能力。<PostLink to="/papers-zh/fine-tuning-or-retrieval">全文译文</PostLink>

## 2017 年

### 6 月

- **[《Attention Is All You Need》](https://arxiv.org/pdf/1706.03762)**（注意力就是你需要的全部）（Vaswani 等，Google）

  Transformer 开山之作。抛弃循环与卷积、纯自注意力架构，并行训练大幅提速，以更低训练成本取得当时 WMT 2014 机器翻译 SOTA。<PostLink to="/papers-zh/attention-is-all-you-need">全文译文</PostLink>
