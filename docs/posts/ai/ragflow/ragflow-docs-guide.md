---
title: RAGFlow 学习地图：官方文档 112 篇导航与阅读顺序
date: 2026-09-16 12:31
tags: [RAGFlow]
excerpt: RAGFlow 是基于深度文档理解的开源 RAG（检索增强生成）引擎，把 PDF、表格、幻灯片这类「难啃」的文档切块、向量化，再交给大模型做有据可依的问答。这份地图把官方文档当前版本的全部 112 篇文章（含更新日志）收齐、译成中文并按官方板块分好组——想系统学 RAGFlow，从这一页出发就够了。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWExYTJlIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE2MjEzZSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYWNjZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOWQ4YWZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CiAgPHJlY3QgeD0iODAiIHk9IjgwIiB3aWR0aD0iMTA0MCIgaGVpZ2h0PSIzIiBmaWxsPSJ1cmwoI2FjY2VudCkiIG9wYWNpdHk9IjAuNiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjIwMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTMwIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iNiI+UkFHRmxvdzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjI1NSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSI0MDAiIGZpbGw9IiM5ZDhhZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSIxMCI+5byA5rqQ5qOA57Si5aKe5by655Sf5oiQ5byV5pOOPC90ZXh0PgoKICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMTUsIDMzMCkiPgogICAgPCEtLSDoioLngrnkuIDvvJrmlofmoaPvvIhSQUcg55qE5Y6f5paZ77yJIC0tPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxNiIgZmlsbD0iIzZjNjNmZiIgb3BhY2l0eT0iMC45Ii8+CiAgICA8cGF0aCBkPSJNIDM4IDI4IGggMzQgbCAyMCAyMCB2IDU0IGEgNCA0IDAgMCAxIC00IDQgaCAtNTAgYSA0IDQgMCAwIDEgLTQgLTQgdiAtNzAgYSA0IDQgMCAwIDEgNCAtNCB6IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHBhdGggZD0iTSA3MiAyOCB2IDIwIGggMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8bGluZSB4MT0iNDQiIHkxPSI1OCIgeDI9IjcyIiB5Mj0iNTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxsaW5lIHgxPSI0NCIgeTE9IjcyIiB4Mj0iNzIiIHkyPSI3MiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPGxpbmUgeDE9IjQ0IiB5MT0iODYiIHgyPSI2NCIgeTI9Ijg2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8dGV4dCB4PSI2NSIgeT0iMTE1IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOSIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5paH5qGjPC90ZXh0PgoKICAgIDxwYXRoIGQ9Ik0gMTQwIDY1IEwgMTgwIDY1IiBzdHJva2U9IiM5ZDhhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNIDE3NSA1NyBMIDE4NyA2NSBMIDE3NSA3MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWQ4YWZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgoKICAgIDwhLS0g6IqC54K55LqM77ya5YiG5Z2X77yIRGVlcERvYyDliIflnZfvvIkgLS0+CiAgICA8cmVjdCB4PSIxOTAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiByeD0iMTYiIGZpbGw9IiM2YzYzZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPHJlY3QgeD0iMjIwIiB5PSIyNiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxyZWN0IHg9IjI2MCIgeT0iMjYiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgcng9IjYiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cmVjdCB4PSIyMjAiIHk9IjY2IiB3aWR0aD0iMzAiIGhlaWdodD0iMzAiIHJ4PSI2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHJlY3QgeD0iMjYwIiB5PSI2NiIgd2lkdGg9IjMwIiBoZWlnaHQ9IjMwIiByeD0iNiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44NSIvPgogICAgPHRleHQgeD0iMjU1IiB5PSIxMTUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE5IiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7liIblnZc8L3RleHQ+CgogICAgPHBhdGggZD0iTSAzMzAgNjUgTCAzNzAgNjUiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik0gMzY1IDU3IEwgMzc3IDY1IEwgMzY1IDczIiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZDhhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CgogICAgPCEtLSDoioLngrnkuInvvJrlkJHph4/ljJbvvIjltYzlhaXvvIkgLS0+CiAgICA8cmVjdCB4PSIzODAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiByeD0iMTYiIGZpbGw9InVybCgjYWNjZW50KSIgb3BhY2l0eT0iMC45NSIvPgogICAgPGNpcmNsZSBjeD0iNDI4IiBjeT0iNDIiIHI9IjUiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjQ1MiIgY3k9IjQyIiByPSI1IiBmaWxsPSIjZmZmZmZmIi8+CiAgICA8Y2lyY2xlIGN4PSI0NzYiIGN5PSI0MiIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPGNpcmNsZSBjeD0iNDI4IiBjeT0iNjYiIHI9IjUiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjQ1MiIgY3k9IjY2IiByPSI1IiBmaWxsPSIjMWExYTJlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iNDc2IiBjeT0iNjYiIHI9IjUiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjQyOCIgY3k9IjkwIiByPSI1IiBmaWxsPSIjZmZmZmZmIi8+CiAgICA8Y2lyY2xlIGN4PSI0NTIiIGN5PSI5MCIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPGNpcmNsZSBjeD0iNDc2IiBjeT0iOTAiIHI9IjUiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDx0ZXh0IHg9IjQ0NSIgeT0iMTE1IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOSIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5ZCR6YeP5YyWPC90ZXh0PgoKICAgIDxwYXRoIGQ9Ik0gNTIwIDY1IEwgNTYwIDY1IiBzdHJva2U9IiM5ZDhhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNIDU1NSA1NyBMIDU2NyA2NSBMIDU1NSA3MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjOWQ4YWZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgoKICAgIDwhLS0g6IqC54K55Zub77ya5qOA57Si77yI5re35ZCI5Y+s5Zue77yJIC0tPgogICAgPHJlY3QgeD0iNTcwIiB5PSIwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjEzMCIgcng9IjE2IiBmaWxsPSIjNmM2M2ZmIiBvcGFjaXR5PSIwLjkiLz4KICAgIDxjaXJjbGUgY3g9IjYyNSIgY3k9IjUyIiByPSIyMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxsaW5lIHgxPSI2NDEiIHkxPSI2OCIgeDI9IjY1NiIgeTI9IjgzIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8dGV4dCB4PSI2MzUiIHk9IjExNSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTkiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuajgOe0ojwvdGV4dD4KCiAgICA8cGF0aCBkPSJNIDcxMCA2NSBMIDc1MCA2NSIgc3Ryb2tlPSIjOWQ4YWZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTSA3NDUgNTcgTCA3NTcgNjUgTCA3NDUgNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KCiAgICA8IS0tIOiKgueCueS6lO+8muWvueivne+8iOacieS+neaNrueahOWbnuetlO+8iSAtLT4KICAgIDxyZWN0IHg9Ijc2MCIgeT0iMCIgd2lkdGg9IjEzMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxNiIgZmlsbD0iIzZjNjNmZiIgb3BhY2l0eT0iMC45Ii8+CiAgICA8cmVjdCB4PSI3OTIiIHk9IjI4IiB3aWR0aD0iNjYiIGhlaWdodD0iNDQiIHJ4PSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxwYXRoIGQ9Ik0gODA2IDcyIGwgLTggMTQgbCAyMCAtMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICA8Y2lyY2xlIGN4PSI4MTIiIGN5PSI1MCIgcj0iNCIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPGNpcmNsZSBjeD0iODI1IiBjeT0iNTAiIHI9IjQiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDxjaXJjbGUgY3g9IjgzOCIgY3k9IjUwIiByPSI0IiBmaWxsPSIjZmZmZmZmIi8+CiAgICA8dGV4dCB4PSI4MjUiIHk9IjExNSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTkiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWvueivnTwvdGV4dD4KICA8L2c+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTYwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC41NSIgbGV0dGVyLXNwYWNpbmc9IjYiPuWumOaWueaWh+ahoyDCtyDlrabkuaDlnLDlm748L3RleHQ+CiAgPHJlY3QgeD0iODAiIHk9IjU4NSIgd2lkdGg9IjEwNDAiIGhlaWdodD0iMyIgZmlsbD0idXJsKCNhY2NlbnQpIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+Cg==" alt="RAGFlow封面" />

RAGFlow 是 InfiniFlow 团队开源的 **RAG（Retrieval-Augmented Generation，检索增强生成）引擎**。它擅长的正是 RAG 里最费劲的一环——**深度文档理解**：把 PDF、Word、Excel、PPT、图片扫描件这类版式复杂的文档解析出来、切成合适的块、配上引用，让大模型回答问题时有据可依，少说瞎话。围绕这条主线，它长成了一台完整的机器：数据集与分块模板、对话助手、Agent 画布、摄取管道、记忆、团队权限，外加一整套 HTTP/Python API。

官方文档（ragflow.io/docs）写得相当细，但有两个门槛：**全英文**，而且体量惊人——七大板块 110 多页，从 30 秒能读完的小页到 231KB 的 API 巨页都有，从首页进去容易迷路。这篇文章把官方文档 **2026-09-16 快照（对应 v0.27.x 时期）** 的全部 **112 篇**收齐并精翻成中文：每篇给出中文译名（点击直达英文原文）和一句话说明——这篇讲什么、什么时候需要读。

阅读方式：**点击任意条目，会从右侧滑出双栏浮层——左边英文原文、右边中文译文，逐段水平对齐**，带目录和上/下一篇导航，可以直接顺着读下去。三篇长页——HTTP API（231KB）、Python API（73KB）、更新日志（79KB）——各拆成了若干部分，拆分条目在清单里标注了（一）（二）……拆开后内容一篇不少。

不必从头读到尾。可以先扫一遍分组找到自己关心的部分，或者直接跳到文末的[建议阅读顺序](#建议阅读顺序)按路线走。

## 一、快速开始（1 篇）

<RagflowDocLink slug="quickstart"><strong>1. 快速开始</strong></RagflowDocLink>

从 Docker 启动服务、配模型、建数据集、解析文件到跑起第一场对话的完整走场。硬件门槛（4 核/16GB/50GB 磁盘）、`vm.max_map_count` 这类必踩的坑都在这一页。第一次接触 RAGFlow 只读它就够了。

## 二、基础概念（2 篇）

这一组回答「RAGFlow 眼里的世界是什么样的」。

<RagflowDocLink slug="basics-rag"><strong>2. RAG 是什么？</strong></RagflowDocLink>

RAGFlow 的 RAG 观点文：为什么检索增强是大模型落地的关键路径，RAGFlow 在解析、分块、检索、生成这条链路上的取舍。理解了它，后面所有功能文档都有了主线。

<RagflowDocLink slug="basics-agent-context-engine"><strong>3. Agent 上下文引擎是什么？</strong></RagflowDocLink>

RAGFlow 的另一条腿：不只做「检索后回答」，而是把检索变成可编排的上下文供给，给 Agent 画布上的工作流喂料。这篇讲清 Agent 与 RAG 的关系。

## 三、功能指南（82 篇）

官方 Guides 板块，按功能域分成 11 组。RAGFlow 的主体用法都在这里。

### 数据集（11 篇）

数据集（dataset，旧称 knowledge base）是 RAGFlow 的地基：文档进来、切块、索引、被检索，全发生在这里。

<RagflowDocLink slug="guides-dataset-overview"><strong>4. 数据集概览</strong></RagflowDocLink>

数据集是什么、能干什么：上传文件、解析分块、维护元数据、验证召回，再被对话/搜索/Agent 消费。整个数据集板块的导读页。

<RagflowDocLink slug="guides-dataset-list-creation"><strong>5. 数据集列表与创建</strong></RagflowDocLink>

列表页的信息含义与新建数据集的入口操作。

<RagflowDocLink slug="guides-dataset-configuration"><strong>6. 数据集配置</strong></RagflowDocLink>

数据集的心脏：选嵌入模型（选定后不可换）、选分块模板（chunk template）。RAGFlow 按文档形态提供了多种模板——通用/法律/书籍/论文/简历/图片/表格等，这篇附完整参数表。

<RagflowDocLink slug="guides-dataset-files"><strong>7. 文件：数据集文档管理</strong></RagflowDocLink>

数据集里的文件怎么管：上传、解析状态、批量操作。

<RagflowDocLink slug="guides-dataset-retrieval-testing"><strong>8. 检索测试</strong></RagflowDocLink>

建好数据集后先别急着开对话——用检索测试直接提问，看召回的块和相关度分数，判断分块模板与参数是否调对了。调优 RAGFlow 的核心工作台。

<RagflowDocLink slug="guides-dataset-chunk-management"><strong>9. 分块：解析结果与知识片段管理</strong></RagflowDocLink>

RAGFlow 的招牌能力「可视化干预」：查看每个块的原文快照，手动改块文字、加关键词、添问题，直接提升该块的召回排名。

<RagflowDocLink slug="guides-dataset-metadata"><strong>10. 元数据管理</strong></RagflowDocLink>

给数据集/文档打自定义元数据字段，检索时可作过滤条件。

<RagflowDocLink slug="guides-dataset-logs"><strong>11. 日志</strong></RagflowDocLink>

数据集的解析与操作日志在哪看、看什么。

<RagflowDocLink slug="guides-dataset-notes-faqs"><strong>12. 注意事项与常见问题</strong></RagflowDocLink>

数据集板块的 FAQ 汇总：解析卡住、召回不理想这类高频问题。

<RagflowDocLink slug="guides-dataset-artifacts"><strong>13. 知识工件生成与管理</strong></RagflowDocLink>

从数据集生成「知识工件」——把沉淀的知识整理成可复用的产物。

<RagflowDocLink slug="guides-dataset-accelerate"><strong>14. 最佳实践：加速索引</strong></RagflowDocLink>

大批量文档入库太慢怎么办：任务并发、批量开关与硬件配置的取舍。

### 文件（4 篇）

文件板块是「还没进数据集的原料区」：先上传到文件库，再按需关联到数据集。

<RagflowDocLink slug="guides-file-overview"><strong>15. 文件与文件夹</strong></RagflowDocLink>

文件库总览：文件夹组织、与数据集的关系。

<RagflowDocLink slug="guides-file-operations"><strong>16. 文件操作</strong></RagflowDocLink>

重命名、移动、预览等单文件操作。

<RagflowDocLink slug="guides-file-batch"><strong>17. 批量移动与删除</strong></RagflowDocLink>

多选文件批量整理。

<RagflowDocLink slug="guides-file-link-dataset"><strong>18. 关联知识库</strong></RagflowDocLink>

把文件库里的文件挂到数据集（知识库）触发解析——文件板块与数据集板块的接缝。

### 数据源（4 篇）

数据源让 RAGFlow 不止「等你上传」：直连网盘与代码仓库，增量同步进知识库。

<RagflowDocLink slug="guides-data-source-overview"><strong>19. 数据源概览与页面管理</strong></RagflowDocLink>

数据源功能版图与列表页管理。

<RagflowDocLink slug="guides-data-source-categories"><strong>20. 数据源分类与选择</strong></RagflowDocLink>

支持哪些外部数据源、各自适合什么场景。

<RagflowDocLink slug="guides-data-source-configuration"><strong>21. 数据源配置</strong></RagflowDocLink>

全板块最厚的一篇：GitHub、Google Drive、SharePoint、Box、Dropbox 等每个数据源的权限要求、OAuth/凭证配置和同步参数，逐个手把手。接入哪个翻哪节。

<RagflowDocLink slug="guides-data-source-sync"><strong>22. 加入知识库并同步</strong></RagflowDocLink>

配好的数据源如何挂进知识库、增量同步与删除同步的行为。

### 对话（4 篇）

对话助手是面向终端用户的问答界面。

<RagflowDocLink slug="guides-chat-overview"><strong>23. 功能概览与创建</strong></RagflowDocLink>

对话助手是什么、怎么新建一个。

<RagflowDocLink slug="guides-chat-configuration"><strong>24. 对话配置</strong></RagflowDocLink>

对话的参数面板：选模型、绑数据集、Empty response（检索不到时是拒答还是自由发挥）、System prompt、引用展示等。把「有据可依」调到位的关键一篇。

<RagflowDocLink slug="guides-chat-sessions"><strong>25. 使用对话会话</strong></RagflowDocLink>

会话管理：多轮对话、引用溯源、点赞反馈。

<RagflowDocLink slug="guides-chat-multimodel-faq"><strong>26. 多模型对比</strong></RagflowDocLink>

同一问题让多个模型同台作答对比效果。

### 对话渠道（4 篇）

把 RAGFlow 对话助手作为服务发布到 IM 渠道（Slack、微信等）。

<RagflowDocLink slug="guides-chatchannel-overview"><strong>27. 对话渠道概览</strong></RagflowDocLink>

渠道功能是什么、支持哪些平台。

<RagflowDocLink slug="guides-chatchannel-access"><strong>28. 渠道接入与配置</strong></RagflowDocLink>

各渠道的接入步骤与凭证配置，按平台分节。

<RagflowDocLink slug="guides-chatchannel-connect"><strong>29. 连接对话渠道</strong></RagflowDocLink>

渠道与具体对话助手的绑定关系。

<RagflowDocLink slug="guides-chatchannel-faq"><strong>30. 对话渠道常见问题</strong></RagflowDocLink>

渠道接入的踩坑记录。

### 搜索（3 端）

不做对话、只要搜索框？RAGFlow 也能当内网搜索引擎用。

<RagflowDocLink slug="guides-search-create"><strong>31. 创建搜索</strong></RagflowDocLink>

新建一个搜索应用。

<RagflowDocLink slug="guides-search-settings"><strong>32. 搜索设置</strong></RagflowDocLink>

搜索范围、相似度阈值、结果展示等设置。

<RagflowDocLink slug="guides-search-faq"><strong>33. 搜索常见问题</strong></RagflowDocLink>

搜索板块 FAQ。

### Agent 与工作流（18 篇）

Agent 是 RAGFlow 从「问答机器」迈向「任务机器」的部分：在画布上拖组件、连线，编排检索、推理、工具调用。

#### Agent（5 篇）

<RagflowDocLink slug="guides-agent-overview"><strong>34. Agent 概览</strong></RagflowDocLink>

Agent 能做什么、与其他功能的关系，进入画布前的必读页。

<RagflowDocLink slug="guides-agent-creation"><strong>35. Agent 的创建与管理</strong></RagflowDocLink>

新建、复制、删除 Agent 的入口操作。

<RagflowDocLink slug="guides-agent-canvas"><strong>36. 理解画布</strong></RagflowDocLink>

画布的交互模型：组件、连线、变量在节点间的流动。看懂画布，后面所有组件文档才有意义。

<RagflowDocLink slug="guides-agent-import-export"><strong>37. 导入与导出 Agent</strong></RagflowDocLink>

Agent 以 DSL 文件形式导入导出，团队复用与版本管理。

<RagflowDocLink slug="guides-agent-embed"><strong>38. 嵌入网页</strong></RagflowDocLink>

把做好的 Agent 以 iframe/脚本嵌到自己的网站。

#### Agent 工作流组件（5 篇）

<RagflowDocLink slug="guides-agent-flow-components"><strong>39. 流程组件</strong></RagflowDocLink>

工作流组件的四大类（流程/对话/基础/数据操作/工具）总览与分类逻辑。

<RagflowDocLink slug="guides-agent-dialogue"><strong>40. 对话组件</strong></RagflowDocLink>

面向交互的组件：聊天框、提问、表单类输入。

<RagflowDocLink slug="guides-agent-basic-components"><strong>41. 基础组件</strong></RagflowDocLink>

画布的通用件：开始/结束、Agent 节点、消息、开关、变量赋值等。

<RagflowDocLink slug="guides-agent-data-components"><strong>42. 数据操作组件</strong></RagflowDocLink>

对数据做加工的组件：分类、提取、模板填充、代码执行、HTTP 请求等。

<RagflowDocLink slug="guides-agent-tool-components"><strong>43. 工具组件</strong></RagflowDocLink>

最厚的一组：检索、网页搜索、数据库查询、邮件、各类第三方工具组件的逐个用法手册。

#### 摄取管道（8 篇）

摄取管道（ingestion pipeline）是「用画布的方式编排入库流程」：解析→分块→转换→索引组装成可复用的流水线。

<RagflowDocLink slug="guides-agent-pipeline-create"><strong>44. 创建摄取管道</strong></RagflowDocLink>

新建一条摄取管道。

<RagflowDocLink slug="guides-agent-pipeline-components"><strong>45. 理解核心摄取管道组件</strong></RagflowDocLink>

四类核心组件的分工总览。

<RagflowDocLink slug="guides-agent-pipeline-parser"><strong>46. 配置解析器组件</strong></RagflowDocLink>

解析器参数。

<RagflowDocLink slug="guides-agent-pipeline-chunker"><strong>47. 配置分块器组件</strong></RagflowDocLink>

分块器参数。

<RagflowDocLink slug="guides-agent-pipeline-transformer"><strong>48. 配置转换器组件</strong></RagflowDocLink>

转换器参数。

<RagflowDocLink slug="guides-agent-pipeline-indexer"><strong>49. 配置索引器组件</strong></RagflowDocLink>

索引器参数。

<RagflowDocLink slug="guides-agent-pipeline-connect"><strong>50. 管道接入知识库</strong></RagflowDocLink>

管道产出去向：挂到知识库供检索。

<RagflowDocLink slug="guides-agent-pipeline-test"><strong>51. 测试运行</strong></RagflowDocLink>

画布上点 Run 跑一遍示例文件，逐步看结果。

### 记忆（4 篇）

记忆（memory）让对话助手记住用户的偏好与事实，跨会话生效。

<RagflowDocLink slug="guides-memory-create"><strong>52. 创建记忆</strong></RagflowDocLink>

新建一条记忆库。

<RagflowDocLink slug="guides-memory-configure"><strong>53. 配置记忆</strong></RagflowDocLink>

记忆的参数配置。

<RagflowDocLink slug="guides-memory-connect"><strong>54. 连接到 Agent</strong></RagflowDocLink>

把记忆库接到对话助手或 Agent 上生效。

<RagflowDocLink slug="guides-memory-messages"><strong>55. 消息页面</strong></RagflowDocLink>

记忆的消息视图。

### 知识编译（6 篇）

知识编译（knowledge compilation）把「检索原文」升级为「编译出成品知识」——按模板把数据集内容整理成结构化文档。

<RagflowDocLink slug="guides-kc-overview"><strong>56. 知识编译概览</strong></RagflowDocLink>

功能定位与核心概念。

<RagflowDocLink slug="guides-kc-basic-info"><strong>57. 基本信息配置</strong></RagflowDocLink>

新建编译任务的 基本信息 配置。

<RagflowDocLink slug="guides-kc-runtime"><strong>58. 知识编译运行时配置</strong></RagflowDocLink>

运行时参数。

<RagflowDocLink slug="guides-kc-apply-template"><strong>59. 应用知识编译模板</strong></RagflowDocLink>

给任务套模板。

<RagflowDocLink slug="guides-kc-built-in"><strong>60. 内置模板与专用配置</strong></RagflowDocLink>

全部内置模板的逐个说明与专用参数，选模板前查这页。

<RagflowDocLink slug="guides-kc-faq"><strong>61. 知识编译常见问题</strong></RagflowDocLink>

板块 FAQ。

### 模型（3 篇）

<RagflowDocLink slug="guides-models-api-key"><strong>62. 配置模型 API Key</strong></RagflowDocLink>

接入大模型的第一步：在 Model providers 里配各家的 API Key、设默认模型。启动后必读。

<RagflowDocLink slug="guides-models-local"><strong>63. 本地部署模型</strong></RagflowDocLink>

不想用云上 API？用 Ollama/Xinference/LocalAI 把模型跑在本地再接给 RAGFlow。

<RagflowDocLink slug="guides-models-supported"><strong>64. 模型提供商</strong></RagflowDocLink>

支持的模型/提供商全家福清单，按厂商列出兼容的对话、嵌入、重排序模型。

### 团队（21 篇）

多人与权限：RAGFlow 的团队体系把资源（Agent/知识库/记忆）按团队与共享范围管理。这组多为短页，按需查阅。

<RagflowDocLink slug="guides-team-permission-index"><strong>65. 权限系统概览</strong></RagflowDocLink>

权限模型总图：团队、成员、资源三层关系。先读它再读后面二十篇。

<RagflowDocLink slug="guides-team-permission-team-resource"><strong>66. 团队与资源权限</strong></RagflowDocLink>

权限的两条轴：团队维度的角色权限与资源维度的操作权限。

<RagflowDocLink slug="guides-team-permission-member"><strong>67. 团队成员管理</strong></RagflowDocLink>

成员角色与管理动作。

<RagflowDocLink slug="guides-team-permission-sharing"><strong>68. 资源共享范围</strong></RagflowDocLink>

资源可以共享给谁：范围等级的定义。

<RagflowDocLink slug="guides-team-permission-operation"><strong>69. 资源操作权限</strong></RagflowDocLink>

对资源能做什么：操作粒度的权限表。

<RagflowDocLink slug="guides-team-permission-rules"><strong>70. 权限生效规则</strong></RagflowDocLink>

多条权限叠加时谁说了算：生效优先级。

<RagflowDocLink slug="guides-team-sharing-index"><strong>71. 共享范围配置</strong></RagflowDocLink>

动手改共享范围的入口。

<RagflowDocLink slug="guides-team-sharing-opensource"><strong>72. 开源版共享范围配置</strong></RagflowDocLink>

开源版的共享范围行为差异。

<RagflowDocLink slug="guides-team-sharing-agents"><strong>73. 共享 Agent</strong></RagflowDocLink>

把 Agent 共享给团队。

<RagflowDocLink slug="guides-team-sharing-kb"><strong>74. 共享知识库</strong></RagflowDocLink>

把知识库共享给团队。

<RagflowDocLink slug="guides-team-sharing-memories"><strong>75. 共享记忆</strong></RagflowDocLink>

把记忆共享给团队。

<RagflowDocLink slug="guides-team-mgmt-index"><strong>76. 团队管理</strong></RagflowDocLink>

团队管理板块导读。

<RagflowDocLink slug="guides-team-mgmt-enter"><strong>77. 进入团队页面</strong></RagflowDocLink>

入口路径。

<RagflowDocLink slug="guides-team-mgmt-view-members"><strong>78. 查看当前工作区成员</strong></RagflowDocLink>

看当前空间里有谁。

<RagflowDocLink slug="guides-team-mgmt-invite"><strong>79. 邀请成员</strong></RagflowDocLink>

发邀请。

<RagflowDocLink slug="guides-team-mgmt-accept"><strong>80. 接受或拒绝邀请</strong></RagflowDocLink>

受邀方视角的操作。

<RagflowDocLink slug="guides-team-mgmt-remove"><strong>81. 移除成员</strong></RagflowDocLink>

移出团队。

<RagflowDocLink slug="guides-team-mgmt-leave"><strong>82. 退出已加入的团队</strong></RagflowDocLink>

主动退出。

<RagflowDocLink slug="guides-team-mgmt-view-teams"><strong>83. 查看已加入的团队</strong></RagflowDocLink>

列出自己加入的团队。

<RagflowDocLink slug="guides-team-mgmt-share"><strong>84. 团队视角的资源共享</strong></RagflowDocLink>

从团队侧看资源被怎么共享。

<RagflowDocLink slug="guides-team-mgmt-faq"><strong>85. 团队管理常见问题</strong></RagflowDocLink>

板块 FAQ。

## 四、参考资料（16 篇）

<RagflowDocLink slug="references-glossary"><strong>86. 术语表</strong></RagflowDocLink>

RAGFlow 全部概念的官方词典（Agent/Agentic Retrieval/Auto keyword/……按字母序）。读文档卡在某个词上时回来查。

下面两套 API 参考是给程序员的：HTTP API 覆盖数据集/检索/对话/Agent/文件全部 REST 接口，Python SDK 是它的封装。原文各是一篇巨页，这里按章节拆成了多份双语阅读单元，顺号读即是完整原文。

<RagflowDocLink slug="references-http-api-01"><strong>87. HTTP API 参考（一）</strong></RagflowDocLink>

错误码、已弃用端点别名与 OpenAI 兼容 API：HTTP 状态码与业务码的双层判读、旧端点对照表，以及两个 OpenAI 兼容端点（对话补全 / Agent 补全）。

<RagflowDocLink slug="references-http-api-02"><strong>88. HTTP API 参考（二）</strong></RagflowDocLink>

数据集管理接口：数据集的创建/更新/删除（含批量）/列出。

<RagflowDocLink slug="references-http-api-03"><strong>89. HTTP API 参考（三）</strong></RagflowDocLink>

数据集内文件管理接口：文件的上传/下载/解析/停止解析/更新等。

<RagflowDocLink slug="references-http-api-04"><strong>90. HTTP API 参考（四）</strong></RagflowDocLink>

数据集内分块管理接口：分块的增删改查与检索。

<RagflowDocLink slug="references-http-api-05"><strong>91. HTTP API 参考（五）</strong></RagflowDocLink>

对话助手管理接口：创建/更新/获取/部分更新/删除（含批量）/列出对话助手。

<RagflowDocLink slug="references-http-api-06"><strong>92. HTTP API 参考（六）</strong></RagflowDocLink>

会话管理接口：会话的创建/列出/删除，向助手提问（含流式回答）与引用。

<RagflowDocLink slug="references-http-api-07"><strong>93. HTTP API 参考（七）</strong></RagflowDocLink>

Agent 管理接口：Agent 的创建/更新/删除/列出。

<RagflowDocLink slug="references-http-api-08"><strong>94. HTTP API 参考（八）</strong></RagflowDocLink>

记忆管理接口：记忆的增删改查。

<RagflowDocLink slug="references-http-api-09"><strong>95. HTTP API 参考（九）</strong></RagflowDocLink>

系统接口：系统健康检查等。

<RagflowDocLink slug="references-http-api-10"><strong>96. HTTP API 参考（十）</strong></RagflowDocLink>

文件管理接口（文件库层）：文件/文件夹的上传、移动、下载等。

<RagflowDocLink slug="references-http-api-11"><strong>97. HTTP API 参考（十一）</strong></RagflowDocLink>

搜索应用管理接口：搜索应用的创建/配置/删除等。

<RagflowDocLink slug="references-python-api-01"><strong>98. Python API 参考（一）</strong></RagflowDocLink>

SDK 初始化、错误码、OpenAI 兼容 API，以及数据集（含数据集内文件）的对象方法。

<RagflowDocLink slug="references-python-api-02"><strong>99. Python API 参考（二）</strong></RagflowDocLink>

数据集内分块管理与对话助手管理方法。

<RagflowDocLink slug="references-python-api-03"><strong>100. Python API 参考（三）</strong></RagflowDocLink>

会话管理与 Agent 管理方法。

<RagflowDocLink slug="references-python-api-04"><strong>101. Python API 参考（四）</strong></RagflowDocLink>

记忆管理方法。

## 五、开发（6 篇）

给改代码、读源码的人。

<RagflowDocLink slug="develop-api-key"><strong>102. 获取 RAGFlow API Key</strong></RagflowDocLink>

调 API 前先拿 Key：在哪生成、怎么用。

<RagflowDocLink slug="develop-launch-source"><strong>103. 从源码启动服务</strong></RagflowDocLink>

不用 Docker 镜像，从源码把前后端各服务拉起来（开发调试场景）。

<RagflowDocLink slug="develop-build-docker"><strong>104. 构建 RAGFlow Docker 镜像</strong></RagflowDocLink>

自己打镜像：ARM 平台、改动源码后的镜像构建。

<RagflowDocLink slug="develop-switch-engine"><strong>105. 切换文档引擎</strong></RagflowDocLink>

文档引擎（Elasticsearch/Infinity）怎么换。

<RagflowDocLink slug="develop-deepwiki"><strong>106. 在 DeepWiki 上探索 RAGFlow</strong></RagflowDocLink>

用 DeepWiki 对着 RAGFlow 仓库问答、理解源码的官方指路。

<RagflowDocLink slug="develop-contributing"><strong>107. 贡献指南</strong></RagflowDocLink>

给 RAGFlow 提 PR 的规范流程。

## 六、开发 · MCP（3 篇）

RAGFlow 官方实现了 MCP 服务器，把检索、数据集列表等能力以 MCP 工具暴露——配合[之前那篇 MCP 学习地图](/posts/ai/mcp/mcp-docs-guide)食用更佳。

<RagflowDocLink slug="develop-mcp-server"><strong>108. 启动 RAGFlow MCP 服务器</strong></RagflowDocLink>

拉起 RAGFlow 自带的 MCP server，接入 Claude 等客户端。

<RagflowDocLink slug="develop-mcp-tools"><strong>109. RAGFlow MCP 工具</strong></RagflowDocLink>

提供了哪几个 MCP 工具、各自参数。

<RagflowDocLink slug="develop-mcp-client"><strong>110. RAGFlow MCP 客户端示例</strong></RagflowDocLink>

官方客户端调用示例代码。

## 七、管理（13 篇）

自部署运维向：后台、配置、迁移。

<RagflowDocLink slug="admin-tracing"><strong>111. 链路追踪</strong></RagflowDocLink>

接入 OpenTelemetry 观测服务调用链。

<RagflowDocLink slug="admin-upgrade"><strong>112. 升级 RAGFlow</strong></RagflowDocLink>

版本升级步骤与数据兼容注意。

<RagflowDocLink slug="admin-service"><strong>113. 管理服务</strong></RagflowDocLink>

admin 服务是什么、怎么开。

<RagflowDocLink slug="admin-cli"><strong>114. RAGFlow CLI</strong></RagflowDocLink>

命令行管理工具全命令手册：用户/团队/系统管理动作的 CLI 化。

<RagflowDocLink slug="admin-ui-begin"><strong>115. 开始之前</strong></RagflowDocLink>

管理后台（admin UI）启用前置条件。

<RagflowDocLink slug="admin-ui-status"><strong>116. 查看系统状态</strong></RagflowDocLink>

后台里看服务与组件健康度。

<RagflowDocLink slug="admin-ui-users"><strong>117. 管理用户账户</strong></RagflowDocLink>

后台的用户增删改与封禁。

<RagflowDocLink slug="admin-ui-sandbox"><strong>118. 配置代码执行沙箱</strong></RagflowDocLink>

Agent 里「代码执行」组件背后的沙箱：gVisor 隔离、资源限额与安全边界。

<RagflowDocLink slug="admin-config-general"><strong>119. 系统配置</strong></RagflowDocLink>

服务配置项总览：conf 目录、环境变量与常用开关。

<RagflowDocLink slug="admin-config-ssl"><strong>120. 配置 SSL 证书</strong></RagflowDocLink>

给服务挂 HTTPS 证书。

<RagflowDocLink slug="admin-config-sandbox"><strong>121. 沙箱快速开始</strong></RagflowDocLink>

代码执行沙箱的最短启用路径。

<RagflowDocLink slug="admin-migration-backup"><strong>122. 备份与迁移</strong></RagflowDocLink>

数据备份与实例迁移。

<RagflowDocLink slug="admin-migration-schema"><strong>123. 数据库结构与迁移</strong></RagflowDocLink>

数据库 schema 与版本间迁移机制。

## 八、常见问题（1 篇）

<RagflowDocLink slug="faq"><strong>124. 常见问题</strong></RagflowDocLink>

全站 FAQ 大合集：部署、解析、检索、对话各环节的高频问题与官方解答。遇到怪问题先来这页搜。

## 九、更新日志（5 篇）

官方 Releases 页按版本记录了每个版本的新特性、改进与修复，每条都附对应 PR 链接。想知道某个功能哪个版本加的、升级会带来什么，按版本范围对号入座；版本太老的部分当编年史翻翻即可。

<RagflowDocLink slug="release-notes-01"><strong>125. 更新日志（一）</strong></RagflowDocLink>

v0.27.2 ~ v0.26.2：最新五个版本。升级前扫一遍这份数变化最全。

<RagflowDocLink slug="release-notes-02"><strong>126. 更新日志（二）</strong></RagflowDocLink>

v0.26.1 ~ v0.25.2。

<RagflowDocLink slug="release-notes-03"><strong>127. 更新日志（三）</strong></RagflowDocLink>

v0.25.1 ~ v0.19.1。

<RagflowDocLink slug="release-notes-04"><strong>128. 更新日志（四）</strong></RagflowDocLink>

v0.19.0 ~ v0.10.0。

<RagflowDocLink slug="release-notes-05"><strong>129. 更新日志（五）</strong></RagflowDocLink>

v0.9.0 ~ v0.5.0：项目早期的版本记录。

## 建议阅读顺序

三条主线，按你的目标挑一条：

**路线 A：快速上手（半天）**。想尽快跑起来看效果：**1 快速开始 → 62 配置模型 API Key → 4~8 数据集主线（概览/创建/配置/文件/检索测试）→ 23~25 建对话助手**。跑通「上传文档→提问→带引用的回答」闭环后，再用 **8 检索测试** 和 **9 分块管理** 调质量。

**路线 B：吃透检索质量（持续）**。已经能跑，想回答得更准：**2 RAG 是什么 → 6 数据集配置（分块模板细读）→ 8 检索测试 → 9 分块管理（人工干预）→ 10 元数据 → 24 对话配置**，配合 **124 FAQ** 里检索相关条目。

**路线 C：Agent 与自动化（进阶）**。想做的不只是问答：**3 Agent 上下文引擎 → 34~36 Agent 入门三篇 → 39~43 工作流组件（当手册查）→ 44~51 摄取管道 → 52~55 记忆**，需要对外暴露成服务时看 **108~110 MCP 三篇** 和 **27~30 对话渠道**。

程序员与运维另有两条短线：二次开发走 **102 → 86 → 87~101（两套 API 参考）**；自部署运维走 **111~123 管理板块 + 105 切换文档引擎**。

## 写在最后

三点说明：

1. **版本快照**：本文收录的是 2026-09-16 抓取的官方文档（源码仓库 infiniflow/ragflow-docs 的 main 分支，对应 v0.27.x 时期）。RAGFlow 迭代很快，个别界面与参数可能与最新版有出入，以官方站为准。
2. **更新日志**按版本切成五份收录（第 125~129 条）。它是本次快照中时效性最强的部分——官方每发一版就会追加，需要最新版本的变化时以[官方原文](https://ragflow.io/docs/release_notes)为准。
3. 译文由 AI 精翻（分析→初译→评审→修订→润色）并与英文原文逐段对齐排版；术语尽量贴合 RAGFlow 中文社区的惯用译法。发现译得不妥的地方，欢迎在原文与译文的对照下自行甄别。
