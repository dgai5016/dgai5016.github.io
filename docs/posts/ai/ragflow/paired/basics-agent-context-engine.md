<BiRow>
<template #en>

From 2025, a silent revolution began beneath the dazzling surface of AI Agents. While the world marveled at agents that could write code, analyze data, and automate workflows, a fundamental bottleneck emerged: why do even the most advanced agents still stumble on simple questions, forget previous conversations, or misuse available tools?

</template>
<template #zh>

2025 年以来，一场无声的革命正在 AI Agent 光鲜的表面之下悄然发生。当世人为能写代码、分析数据、自动化工作流的 Agent 而惊叹时，一个根本性的瓶颈也浮出水面：为什么即便是最先进的 Agent，仍会在简单问题上磕绊、忘记先前的对话，或误用可用的工具？

</template>
</BiRow>

<BiRow>
<template #en>

The answer lies not in the intelligence of the Large Language Model (LLM) itself, but in the quality of the Context it receives. An LLM, no matter how powerful, is only as good as the information we feed it. Today’s cutting-edge agents are often crippled by a cumbersome, manual, and error-prone process of context assembly—a process known as Context Engineering.

</template>
<template #zh>

答案不在于大语言模型（LLM）本身的智能，而在于它所接收的上下文（Context）的质量。LLM 再强大，其表现也取决于我们喂给它的信息。如今最前沿的 Agent，常常被一套繁重、手工且易错的上下文组装流程拖累——这一流程被称为上下文工程（Context Engineering）。

</template>
</BiRow>

<BiRow>
<template #en>

This is where the Agent Context Engine comes in. It is not merely an incremental improvement but a foundational shift, representing the evolution of RAG from a singular technique into the core data and intelligence substrate for the entire Agent ecosystem.

</template>
<template #zh>

Agent 上下文引擎正应此而生。它不仅是渐进式改良，而是一次根基性的转变：RAG 从一项单一技术，进化为整个 Agent 生态的核心数据与智能底座。

</template>
</BiRow>

<BiRow>
<template #en>

## Beyond the Hype: The Reality of Today's "Intelligent" Agents
Today, the “intelligence” behind most AI Agents hides a mountain of human labor. Developers must:

</template>
<template #zh>

## 热潮之外：当今“智能”Agent 的现实
如今，大多数 AI Agent 背后的“智能”，都建立在大量人工劳动之上。开发者必须：

</template>
</BiRow>

<BiRow>
<template #en>

- Hand-craft elaborate prompt templates
- Hard-code document-retrieval logic for every task
- Juggle tool descriptions, conversation history, and knowledge snippets inside a tiny context window
- Repeat the whole process for each new scenario

</template>
<template #zh>

- 手工打造精细的提示词模板
- 为每个任务硬编码文档检索逻辑
- 在狭小的上下文窗口里同时应付工具描述、对话历史和知识片段
- 每换一个新场景就把整套流程重来一遍

</template>
</BiRow>

<BiRow>
<template #en>

This pattern is called Context Engineering. It is deeply tied to expert know-how, almost impossible to scale, and prohibitively expensive to maintain. When an enterprise needs to keep dozens of distinct agents alive, the artisanal workshop model collapses under its own weight.

</template>
<template #zh>

这一模式被称为上下文工程。它高度依赖专家经验，几乎无法规模化，维护成本也高得离谱。当企业需要让几十个不同的 Agent 同时运转时，这种手工作坊模式便会因自身之重而崩塌。

</template>
</BiRow>

<BiRow>
<template #en>

The mission of an Agent Context Engine is to turn Context Engineering from an “art” into an industrial-grade science.

</template>
<template #zh>

Agent 上下文引擎的使命，就是让上下文工程从一门“手艺”变为一门工业级的科学。

</template>
</BiRow>

<BiRow>
<template #en>

Deconstructing the Agent Context Engine
So, what exactly is an Agent Context Engine? It is a unified, intelligent, and automated platform responsible for the end-to-end process of assembling the optimal context for an LLM or Agent at the moment of inference. It moves from artisanal crafting to industrialized production.
At its core, an Agent Context Engine is built on a triumvirate of next-generation retrieval capabilities, seamlessly integrated into a single service layer:

</template>
<template #zh>

拆解 Agent 上下文引擎
那么，Agent 上下文引擎究竟是什么？它是一个统一、智能、自动化的平台，负责在推理时刻为 LLM 或 Agent 端到端地组装出最优上下文。它让上下文的生产从手工打造走向工业化制造。
其核心建立在三大下一代检索能力之上，并无缝整合进同一个服务层：

</template>
</BiRow>

<BiRow>
<template #en>

1. The Knowledge Core (Advanced RAG): This is the evolution of traditional RAG. It moves beyond simple chunk-and-embed to intelligently process static, private enterprise knowledge. Techniques like TreeRAG (building LLM-generated document outlines for "locate-then-expand" retrieval) and GraphRAG (extracting entity networks to find semantically distant connections) work to close the "semantic gap." The engine’s Ingestion Pipeline acts as the ETL for unstructured data, parsing multi-format documents and using LLMs to enrich content with summaries, metadata, and structure before indexing.
2. The Memory Layer: An Agent’s intelligence is defined by its ability to learn from interaction. The Memory Layer is a specialized retrieval system for dynamic, episodic data: conversation history, user preferences, and the agent’s own internal state (e.g., "waiting for human input"). It manages the lifecycle of this data—storing raw dialogue, triggering summarization into semantic memory, and retrieving relevant past interactions to provide continuity and personalization. Technologically, it is a close sibling to RAG, but focused on a temporal stream of data.
3. The Tool Orchestrator: As MCP (Model Context Protocol) enables the connection of hundreds of internal services as tools, a new problem arises: tool selection. The Context Engine solves this with Tool Retrieval. Instead of dumping all tool descriptions into the prompt, it maintains an index of tools and—critically—an index of Skills (best practices on when and how to use tools). For a given task, it retrieves only the most relevant tools and instructions, transforming the LLM’s job from "searching a haystack" to "following a recipe."

</template>
<template #zh>

1. 知识内核（高级 RAG）：这是传统 RAG 的进化形态。它超越了简单的“分块—嵌入”，能够智能化处理静态的企业私有知识。TreeRAG（用 LLM 生成文档大纲，实现“先定位后展开”的检索）与 GraphRAG（抽取实体网络，发现语义上相距遥远的关联）等技术，都在致力于弥合“语义鸿沟”。引擎的摄取管道（Ingestion Pipeline）充当非结构化数据的 ETL：解析多种格式的文档，并在索引前用 LLM 为内容补充摘要、元数据与结构信息。
2. 记忆层：Agent 的智能，取决于它从交互中学习的能力。记忆层是面向动态情景数据的专用检索系统：对话历史、用户偏好，以及 Agent 自身的内部状态（如“等待人工输入”）。它管理这类数据的完整生命周期——存储原始对话、触发汇总、沉淀为语义记忆、检索相关的过往交互，从而提供连续性与个性化。在技术上，它与 RAG 是近亲，只是专注于一条随时间流动的数据流。
3. 工具编排器：随着 MCP（Model Context Protocol，模型上下文协议）让数百个内部服务都能以工具形式接入，一个新问题随之出现：工具选择。上下文引擎用工具检索（Tool Retrieval）来解决它。它不是把所有工具描述一股脑塞进提示词，而是维护一个工具索引，并且——关键在于——维护一个技能（Skill）索引（记录何时以及如何使用工具的最佳实践）。针对给定任务，它只检索最相关的工具与使用说明，把 LLM 的任务从“大海捞针”变成“照方抓药”。

</template>
</BiRow>

<BiRow>
<template #en>

## Why Do We Need a Dedicated Engine? The Case for a Unified Substrate

</template>
<template #zh>

## 为什么需要专门的引擎？统一底座的理由

</template>
</BiRow>

<BiRow>
<template #en>

The necessity of an Agent Context Engine becomes clear when we examine the alternative: siloed, manually wired components.

</template>
<template #zh>

只要看看另一种选择——彼此割裂、靠手工接线的组件——Agent 上下文引擎的必要性便一目了然：

</template>
</BiRow>

<BiRow>
<template #en>

- The Data Silo Problem: Knowledge, memory, and tools reside in separate systems, requiring complex integration for each new agent.
- The Assembly Line Bottleneck: Developers spend more time on context plumbing than on agent logic, slowing innovation to a crawl.
- The "Context Ownership" Dilemma: In manually engineered systems, context logic is buried in code, owned by developers, and opaque to business users. An Engine makes context a configurable, observable, and customer-owned asset.

</template>
<template #zh>

- 数据孤岛问题：知识、记忆和工具分散在不同系统中，每上线一个新 Agent 都要做复杂的集成。
- 流水线瓶颈：开发者在上下文管道杂活上花的时间比在 Agent 逻辑上的还多，创新被拖得步履蹒跚。
- “上下文归属”困境：在手工搭建的系统里，上下文逻辑埋藏在代码中，归开发者所有，对业务用户完全不透明。而引擎让上下文成为可配置、可观测、归客户所有的资产。

</template>
</BiRow>

<BiRow>
<template #en>

The shift from Context Engineering to a Context Platform/Engine marks the maturation of enterprise AI, as summarized in the table below:

</template>
<template #zh>

从上下文工程走向上下文平台/引擎，标志着企业 AI 的成熟，如下表所示：

</template>
</BiRow>

<BiRow>
<template #en>

| Dimension           | Context engineering (present)                                              | Context engineering/Platform (future)                                                               |
| ------------------- | -------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| Context creation    | Manual, artisanal work by developers and prompt engineers.                 | Automated, driven by intelligent ingestion pipelines and configurable rules.                        |
| Context delivery    | Hard-coded prompts and static retrieval logic embedded in agent workflows. | Dynamic, real-time retrieval and assembly based on the agent's live state and intent.               |
| Context maintenance | A development and operational burden, logic locked in code.                | A manageable platform function, with visibility and control returned to the business.               |

</template>
<template #zh>

| 维度           | 上下文工程（现状）                                | 上下文工程/平台（未来）                                  |
| -------------- | ------------------------------------------------- | ------------------------------------------------------- |
| 上下文创建     | 开发者与提示词工程师的手工作业。                  | 自动化，由智能摄取管道和可配置规则驱动。                 |
| 上下文交付     | 硬编码的提示词与嵌入 Agent 工作流的静态检索逻辑。 | 基于 Agent 实时状态与意图的动态、实时检索与组装。        |
| 上下文维护     | 开发与运维负担，逻辑锁死在代码里。                | 可管理的平台职能，可见性与控制权交还业务。               |

</template>
</BiRow>

<BiRow>
<template #en>

## RAGFlow: A Resolute March Toward the Context Engine of Agents

</template>
<template #zh>

## RAGFlow：坚定迈向 Agent 的上下文引擎

</template>
</BiRow>

<BiRow>
<template #en>

This is the future RAGFlow is forging.

</template>
<template #zh>

这正是 RAGFlow 正在开拓的未来。

</template>
</BiRow>

<BiRow>
<template #en>

We left behind the label of “yet another RAG system” long ago. From DeepDoc—our deeply-optimized, multimodal document parser—to the bleeding-edge architectures that bridge semantic chasms in complex RAG scenarios, all the way to a full-blown, enterprise-grade ingestion pipeline, every evolutionary step RAGFlow takes is a deliberate stride toward the ultimate form: an Agentic Context Engine.

</template>
<template #zh>

我们早已摘下“又一个 RAG 系统”的标签。从深度优化的多模态文档解析器 DeepDoc，到在复杂 RAG 场景中弥合语义鸿沟的前沿架构，再到完整的企业级摄取管道，RAGFlow 走出的每一步进化，都是朝着终极形态——Agentic 上下文引擎——的刻意迈进。

</template>
</BiRow>

<BiRow>
<template #en>

We believe tomorrow’s enterprise AI advantage will hinge not on who owns the largest model, but on who can feed that model the highest-quality, most real-time, and most relevant context. An Agentic Context Engine is the critical infrastructure that turns this vision into reality.

</template>
<template #zh>

我们相信，未来企业 AI 的优势将不在于谁拥有最大的模型，而在于谁能为模型供给质量最高、实时性最强、最相关的上下文。Agentic 上下文引擎，正是把这一愿景变为现实的关键基础设施。

</template>
</BiRow>

<BiRow>
<template #en>

In the paradigm shift from “hand-crafted prompts” to “intelligent context,” RAGFlow is determined to be the most steadfast propeller and enabler. We invite every developer, enterprise, and researcher who cares about the future of AI agents to follow RAGFlow’s journey—so together we can witness and build the cornerstone of the next-generation AI stack.

</template>
<template #zh>

在从“手工提示词”到“智能上下文”的范式转移中，RAGFlow 志在成为最坚定的推动者与赋能者。我们邀请每一位关心 AI Agent 未来的开发者、企业与研究者，与 RAGFlow 同行——一起见证并共建下一代 AI 技术栈的基石。

</template>
</BiRow>
