---
title: MCP 学习地图：官方文档 24 篇导航与阅读顺序
date: 2026-09-11 10:00
tags: [MCP]
excerpt: MCP（Model Context Protocol）是连接 AI 应用与外部系统的开放协议，官方把它比作「AI 应用的 USB-C 接口」。这份地图把官方文档当前版本（2026-07-28）的全部 24 篇文章收齐、译成中文并按主题分好组，文末附三条阅读路线——想学 MCP，从这一页出发就够了。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWExYTJlIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE2MjEzZSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYWNjZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOWQ4YWZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CiAgPHJlY3QgeD0iODAiIHk9IjgwIiB3aWR0aD0iMTA0MCIgaGVpZ2h0PSIzIiBmaWxsPSJ1cmwoI2FjY2VudCkiIG9wYWNpdHk9IjAuNiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjIxNSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUwIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iOCI+TUNQPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMjcwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iIzlkOGFmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPk1vZGVsIENvbnRleHQgUHJvdG9jb2w8L3RleHQ+CgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIxNywgMzQwKSI+CiAgICA8IS0tIOW3puS+p++8mkFJIOW6lOeUqOWNoeeJh++8iOacuuWZqOS6uuWktOWDj++8iSAtLT4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiByeD0iMTYiIGZpbGw9IiM2YzYzZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPGxpbmUgeDE9IjY1IiB5MT0iMTgiIHgyPSI2NSIgeTI9IjMwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8Y2lyY2xlIGN4PSI2NSIgY3k9IjE2IiByPSI0IiBmaWxsPSIjZmZmZmZmIi8+CiAgICA8cmVjdCB4PSIzNSIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI0NCIgcng9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iNTMiIGN5PSI1MiIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPGNpcmNsZSBjeD0iNzciIGN5PSI1MiIgcj0iNSIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPHBhdGggZD0iTSA1MyA2MiBRIDY1IDcwIDc3IDYyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8dGV4dCB4PSI2NSIgeT0iMTA1IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkFJIOW6lOeUqDwvdGV4dD4KICAgIDx0ZXh0IHg9IjY1IiB5PSIxMjMiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC43IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DbGF1ZGUgwrcgQ2hhdEdQVDwvdGV4dD4KCiAgICA8IS0tIOi/nuaOpee6v++8mkFJIOW6lOeUqCAtPiBNQ1AgLS0+CiAgICA8cGF0aCBkPSJNIDE0MCA2NSBMIDIwMCA2NSIgc3Ryb2tlPSIjOWQ4YWZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTSAxOTUgNTcgTCAyMDcgNjUgTCAxOTUgNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KCiAgICA8IS0tIOS4remXtO+8mk1DUCDmoIflh4bmjqXlj6PvvIhVU0ItQyDmj5Llj6PpgKDlnovvvIkgLS0+CiAgICA8cmVjdCB4PSIyMTUiIHk9IjAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMTMwIiByeD0iMjIiIGZpbGw9InVybCgjYWNjZW50KSIgb3BhY2l0eT0iMC45NSIvPgogICAgPHJlY3QgeD0iMjQwIiB5PSIzOCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI4IiByeD0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8bGluZSB4MT0iMjU0IiB5MT0iNTIiIHgyPSIzMDYiIHkyPSI1MiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHRleHQgeD0iMjgwIiB5PSI5NSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5NQ1A8L3RleHQ+CiAgICA8dGV4dCB4PSIyODAiIHk9IjEyMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNDAwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuagh+WHhuaOpeWPozwvdGV4dD4KCiAgICA8IS0tIOi/nuaOpee6v++8mk1DUCAtPiDlpJbpg6jns7vnu58gLS0+CiAgICA8cGF0aCBkPSJNIDM1NSA2NSBMIDQxNSA2NSIgc3Ryb2tlPSIjOWQ4YWZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHBhdGggZD0iTSA0MTAgNTcgTCA0MjIgNjUgTCA0MTAgNzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KCiAgICA8IS0tIOWPs+S+p++8muS4ieS4quWklumDqOezu+e7n+WNoeeJhyAtLT4KICAgIDwhLS0g5Y2h54mHIDHvvJrmlofku7bvvIjmlofku7blpLnlm77moIfvvIkgLS0+CiAgICA8cmVjdCB4PSI0MzAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTMwIiByeD0iMTQiIGZpbGw9IiM2YzYzZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPHBhdGggZD0iTSA0NTAgNDQgaCAyMiBsIDcgLTcgaCAyMSB2IDMyIGggLTUwIHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CiAgICA8dGV4dCB4PSI0ODAiIHk9IjEwNSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNTAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7mlofku7Y8L3RleHQ+CgogICAgPCEtLSDljaHniYcgMu+8muaVsOaNruW6k++8iOWchuafseWbvuagh++8iSAtLT4KICAgIDxyZWN0IHg9IjU0OCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMzAiIHJ4PSIxNCIgZmlsbD0iIzZjNjNmZiIgb3BhY2l0eT0iMC45Ii8+CiAgICA8ZWxsaXBzZSBjeD0iNTk4IiBjeT0iNDIiIHJ4PSIyNCIgcnk9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cGF0aCBkPSJNIDU3NCA0MiB2IDIwIGEgMjQgOCAwIDAgMCA0OCAwIHYgLTIwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHRleHQgeD0iNTk4IiB5PSIxMDUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5pWw5o2uPC90ZXh0PgoKICAgIDwhLS0g5Y2h54mHIDPvvJrlt6XlhbfvvIjmu5HmnYborr7nva7lm77moIfvvIkgLS0+CiAgICA8cmVjdCB4PSI2NjYiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTMwIiByeD0iMTQiIGZpbGw9IiM2YzYzZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPGxpbmUgeDE9IjY4NiIgeTE9IjM2IiB4Mj0iNzQ2IiB5Mj0iMzYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxjaXJjbGUgY3g9IjcxMiIgY3k9IjM2IiByPSI2IiBmaWxsPSIjMWExYTJlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGxpbmUgeDE9IjY4NiIgeTE9IjU4IiB4Mj0iNzQ2IiB5Mj0iNTgiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxjaXJjbGUgY3g9IjcwMCIgY3k9IjU4IiByPSI2IiBmaWxsPSIjMWExYTJlIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHRleHQgeD0iNzE2IiB5PSIxMDUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5bel5YW3PC90ZXh0PgogIDwvZz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1NjAiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZmZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgb3BhY2l0eT0iMC41NSIgbGV0dGVyLXNwYWNpbmc9IjYiPk1DUCDlrabkuaDlnLDlm748L3RleHQ+CiAgPHJlY3QgeD0iODAiIHk9IjU4NSIgd2lkdGg9IjEwNDAiIGhlaWdodD0iMyIgZmlsbD0idXJsKCNhY2NlbnQpIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+Cg==" alt="MCP封面" />

MCP 全称 **Model Context Protocol**（模型上下文协议），是一个连接 AI 应用与外部系统的开放标准。有了它，Claude、ChatGPT 这类 AI 应用就能接到你的文件、数据库、搜索工具上，拿到关键信息、替你执行任务。官方给了一个很好记的类比：**MCP 之于 AI 应用，就像 USB-C 之于电子设备**——一个标准化的接口，插什么都能用。

官方文档（modelcontextprotocol.io）质量很高，但有两个门槛：**全英文**，而且文章分散在入门、概念、开发、SDK、安全、工具、示例好几个板块里，从首页进去容易迷路。这篇文章把官方文档 **2026-07-28 版（当前的最新正式版）** 的全部 **24 篇**文章收齐：每篇给出中文译名（点击直达英文原文）和一句话说明——这篇讲什么、什么时候需要读。

不必从头读到尾。可以先扫一遍分组找到自己关心的部分，或者直接跳到文末的[建议阅读顺序](#建议阅读顺序)按路线走。

## 一、认识 MCP（1 篇）

<McpDocLink slug="intro"><strong>1. MCP 是什么？</strong></McpDocLink>

协议的官方定义和「USB-C」类比都出自这一页，还列了 MCP 能实现的真实场景（读日历、连 Notion、用 Figma 稿生成网页等）和生态支持情况。全站文档的入口，5 分钟能读完，是后面所有文章的地基。

## 二、核心概念（4 篇）

这一组建立 MCP 的 mental model：三方角色怎么分工、怎么通信。概念清楚了，后面的开发文档才不是照抄命令。

<McpDocLink slug="architecture"><strong>2. 架构总览</strong></McpDocLink>

讲清 MCP 的整体结构：宿主应用（host）、客户端（client）、服务器（server）三方怎么连接、消息怎么流动。读懂这张「地图」，其他所有概念都有了安放的位置。

<McpDocLink slug="server-concepts"><strong>3. 理解 MCP 服务器</strong></McpDocLink>

服务器是「能力的提供方」。这篇讲一个 server 能提供哪几类能力——工具（tools）、资源（resources）、提示词（prompts）——各自解决什么问题。

<McpDocLink slug="client-concepts"><strong>4. 理解 MCP 客户端</strong></McpDocLink>

客户端住在宿主（比如 Claude Desktop）里面，代表宿主去连接服务器。这篇讲 client 的职责、能力发现和协商机制。

<McpDocLink slug="versioning"><strong>5. 版本机制</strong></McpDocLink>

MCP 协议本身也在迭代。这篇讲协议版本怎么编号、新旧版本怎么兼容。刚开始可以跳过，遇到「这个特性哪个版本才有」的困惑时回来查。

## 三、动手开发（6 篇）

从「用别人的 server」到「写自己的 server / client」，动手内容都在这组。

<McpDocLink slug="connect-local-servers"><strong>6. 连接本地 MCP 服务器</strong></McpDocLink>

在 Claude Desktop 里配置本地运行的 server（比如文件系统访问），是最短路径「先跑起来看见效果」的一篇。

<McpDocLink slug="connect-remote-servers"><strong>7. 连接远程 MCP 服务器</strong></McpDocLink>

连接网络上托管的 server，不用在本地装任何东西。现在的官方服务器目录基本都是这种形态。

<McpDocLink slug="build-with-agent-skills"><strong>8. 用 Agent Skills 构建</strong></McpDocLink>

一个很新的思路：把 MCP server 的设计规范写成 agent skill，让 AI 编码助手（比如 Claude Code）按规范帮你设计和实现 server。

<McpDocLink slug="build-server"><strong>9. 构建 MCP 服务器</strong></McpDocLink>

亲手写一个自己的 server 的官方入门教程，从零到能在 Claude for Desktop 等客户端里用起来。想做 MCP 开发，这是核心一篇。

<McpDocLink slug="build-client"><strong>10. 构建 MCP 客户端</strong></McpDocLink>

反过来，写一个能接入所有 MCP server 的客户端应用。适合想做自己的 AI 应用 / agent 框架的读者。

<McpDocLink slug="client-best-practices"><strong>11. 客户端最佳实践</strong></McpDocLink>

当宿主应用要同时管理很多 server 和工具时怎么扩展、怎么取舍。偏进阶，做产品化 host 时再读。

## 四、SDK（1 篇）

<McpDocLink slug="sdk"><strong>12. 官方 SDK 一览</strong></McpDocLink>

TypeScript、Python 等官方 SDK 的清单和入口。写代码之前先来这里挑好工具，能省掉大量协议层的样板代码。

## 五、安全（2 篇）

MCP 意味着让 AI 访问你的数据和工具，安全不是可选项。这组适合在「准备对外提供 server」或「要在生产环境用」时读。

<McpDocLink slug="security-authorization"><strong>13. 理解 MCP 的授权机制</strong></McpDocLink>

怎么用 OAuth 2.1 给 server 加授权，保护敏感资源和操作。远程 server 的标配。

<McpDocLink slug="security-best-practices"><strong>14. 安全最佳实践</strong></McpDocLink>

MCP 实现的攻击面、常见攻击向量和防御清单。建议任何要上线的实现都过一遍。

## 六、调试与工具（9 篇）

这组是官方调试工具 **MCP Inspector** 的完整手册（前 8 篇）加一篇通用调试指南。Inspector 提供浏览器图形界面、命令行、终端 TUI 三种形态，写 MCP 必备。

<McpDocLink slug="inspector"><strong>15. MCP Inspector</strong></McpDocLink>

Inspector 的总览页：三种形态怎么选、快速上手。调试 MCP 的第一站，后面的子文档都从这篇出发。

<McpDocLink slug="inspector-web"><strong>16. Web 客户端</strong></McpDocLink>

图形界面版 Inspector 的逐标签页走读——连接、工具调用、资源浏览各在哪个面板。

<McpDocLink slug="inspector-cli"><strong>17. CLI 客户端</strong></McpDocLink>

命令行脚本化调用 Inspector：支持的方法、输出格式、退出码，以及接进 CI 的配方。适合写自动化测试。

<McpDocLink slug="inspector-tui"><strong>18. TUI 客户端</strong></McpDocLink>

终端交互版 Inspector：导航方式、标签页和快捷键速查。

<McpDocLink slug="inspector-configuration"><strong>19. 配置与参数</strong></McpDocLink>

Inspector 的配置文件体系、各客户端分别认哪些参数、全部环境变量。调不动行为时来这里查。

<McpDocLink slug="inspector-authorization"><strong>20. 授权</strong></McpDocLink>

Inspector 自己怎么做 OAuth：授权流程、会话中途重新授权、多个客户端之间共享 token。

<McpDocLink slug="inspector-protocol-eras"><strong>21. 协议时代</strong></McpDocLink>

「协议时代」指新旧协议版本（legacy vs modern MCP）。这篇讲 Inspector 怎么在两者间协商，每个特性跨时代怎么处理。调试旧版 server 时有用。

<McpDocLink slug="inspector-recipes"><strong>22. Recipes（实战配方）</strong></McpDocLink>

一组拿来就用的实操配方：各种传输方式、导入既有配置、审查 MCP Apps、Docker 部署、网络托管。

<McpDocLink slug="debugging"><strong>23. 调试指南</strong></McpDocLink>

不限于 Inspector 的通用调试方法论：MCP 集成出问题时从哪里下手、怎么定位是哪一层的锅。

## 七、示例（1 篇）

<McpDocLink slug="examples"><strong>24. 官方示例服务器</strong></McpDocLink>

官方与社区 server 实现的列表。想找参考实现学写法，或者找一个现成能用的 server，都从这里找。

## 建议阅读顺序

24 篇不需要通读。按你的目标选一条路线：

**路线 A · 先跑起来（体验优先）**：第 1 篇搞懂是什么 → 第 6 篇在 Claude Desktop 接一个本地 server → 第 7 篇接一个远程 server → 第 9 篇写一个自己的 server。半天到一天，能建立完整的体感。

**路线 B · 建立概念框架（理解优先）**：第 1 篇 → 第 2 篇架构 → 第 3、4 篇服务器与客户端，把三方模型吃透，再看第 9、10 篇边写边对照概念。适合想把 MCP 用深、用对的读者。

**路线 C · 按需查阅（开发中随用随取）**：动手写代码前看第 12 篇挑 SDK；要上线翻第 13、14 篇补安全；调试卡住进第 15–23 篇 Inspector 工具族；找参考实现看第 24 篇。

三条路线不互斥——比较典型的组合是：先用路线 A 跑通，再用路线 B 补概念，开发过程中靠路线 C 查资料。

## 写在最后

这份地图覆盖的是官方文档（Documentation）版块。如果你想再往下钻一层——消息格式、传输层细节、生命周期这些协议本身的逐条定义——官方还有 [Specification（规格书）](https://modelcontextprotocol.io/specification/2026-07-28)版块，按同样的版本号组织，等你需要它的时候自然会用上。

另外，MCP 官方文档是按版本快照持续更新的（本文收录的是 2026-07-28 最新正式版，入口在[这里](https://modelcontextprotocol.io/docs/2026-07-28/getting-started/intro)）。协议迭代很快，以官方站点为准，这份地图帮你的是「知道有哪些、该读哪篇」。
