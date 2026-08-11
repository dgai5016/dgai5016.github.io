---
title: RNN 是什么
date: 2026-08-11 16:42
tags: [AI]
excerpt: RNN（Recurrent Neural Network，循环神经网络）是一种专门用来处理有先后顺序的数据的神经网络。一句话定义：它能一边读一边记，每看一个新内容时，都参考「之前读过的」来做判断。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiBtYXJrZXJXaWR0aD0iOSIgbWFya2VySGVpZ2h0PSI5IiByZWZYPSI3IiByZWZZPSIzIiBvcmllbnQ9ImF1dG8iIG1hcmtlclVuaXRzPSJzdHJva2VXaWR0aCI+CiAgICAgIDxwYXRoIGQ9Ik0wLDAgTDAsNiBMOCwzIHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSB2aXN1YWwgbWV0YXBob3I6IHVucm9sbGVkIFJOTiDigJQgY2hhaW4gb2YgdGltZS1zdGVwIGNlbGxzIHdpdGggcmVjdXJyZW50IHNlbGYtbG9vcHMgLS0+CiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjUiPgogICAgPCEtLSB0aHJlZSBwcm9jZXNzaW5nIGNlbGxzIChzYW1lIHVuaXQsIHJlcGVhdGVkIGFjcm9zcyB0aW1lKSAtLT4KICAgIDxyZWN0IHg9IjMwMCIgeT0iMTU1IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjE0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpIi8+CiAgICA8cmVjdCB4PSI1NDAiIHk9IjE1NSIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHJ4PSIxNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE0KSIvPgogICAgPHJlY3QgeD0iNzgwIiB5PSIxNTUiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iMTQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNCkiLz4KICAgIDwhLS0gdGhlIHJlY3VycmVudCBzZWxmLWxvb3Agb24gZWFjaCBjZWxsICh0aGUgZGVmaW5pbmcgZmVhdHVyZSkgLS0+CiAgICA8cGF0aCBkPSJNIDM0OCAxNTUgQyAzNDggMTAwLCAzNzIgMTAwLCAzNzIgMTU1IiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93KSIvPgogICAgPHBhdGggZD0iTSA1ODggMTU1IEMgNTg4IDEwMCwgNjEyIDEwMCwgNjEyIDE1NSIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICAgIDxwYXRoIGQ9Ik0gODI4IDE1NSBDIDgyOCAxMDAsIDg1MiAxMDAsIDg1MiAxNTUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8IS0tIGhpZGRlbiBzdGF0ZSBoYW5kZWQgZm9yd2FyZCBiZXR3ZWVuIGNlbGxzIC0tPgogICAgPGxpbmUgeDE9IjQyMCIgeTE9IjIxNSIgeDI9IjUzNCIgeTI9IjIxNSIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICAgIDxsaW5lIHgxPSI2NjAiIHkxPSIyMTUiIHgyPSI3NzQiIHkyPSIyMTUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8IS0tIG5ldyBpbnB1dCBmbG93cyBpbnRvIGVhY2ggY2VsbCAtLT4KICAgIDxsaW5lIHgxPSIzNjAiIHkxPSIzMzUiIHgyPSIzNjAiIHkyPSIyODAiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8bGluZSB4MT0iNjAwIiB5MT0iMzM1IiB4Mj0iNjAwIiB5Mj0iMjgwIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93KSIvPgogICAgPGxpbmUgeDE9Ijg0MCIgeTE9IjMzNSIgeDI9Ijg0MCIgeTI9IjI4MCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8L2c+CgogIDwhLS0gdGltZS1zdGVwIGxhYmVscyAtLT4KICA8ZyBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDx0ZXh0IHg9IjM2MCIgeT0iMzY1Ij50LTE8L3RleHQ+CiAgICA8dGV4dCB4PSI2MDAiIHk9IjM2NSI+dDwvdGV4dD4KICAgIDx0ZXh0IHg9Ijg0MCIgeT0iMzY1Ij50KzE8L3RleHQ+CiAgPC9nPgoKICA8IS0tIGNvbmNlcHQgbmFtZSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjQ5MCIgZm9udC1zaXplPSIxMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPlJOTjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU0NSIgZm9udC1zaXplPSIzOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuW+queOr+elnue7j+e9kee7nDwvdGV4dD4KCiAgPCEtLSBzZXJpZXMgc3VidGl0bGUgLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI2MDAiIGZvbnQtc2l6ZT0iMzIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="RNN封面" />

RNN（Recurrent Neural Network，循环神经网络）是一种专门用来处理**有先后顺序的数据**的神经网络。一句话定义：**它能一边读一边记，每看一个新内容时，都参考「之前读过的」来做判断。**

普通神经网络（前馈网络）有个致命短板：它把每一次输入都当成完全独立的事件，看完上一眼就忘。可如果你给它「我 吃 苹果」三个词，让它预测第四个词，它根本不记得前面是「我吃」。RNN 就是来解决这个「健忘症」的——它给网络加了一条**记忆回路**，让前面的信息能顺着流到后面。

## 一个生活类比：边读边记的速记员

想象一个速记员在听写一封长信。他不是每听完一句就把上一句忘掉，而是脑子里始终留着一个**「到目前为止讲了啥」的摘要**——每听到一个新词，他就把这个新词和脑子里的旧摘要融合一下，更新成一个新摘要。讲到结尾时，他脑子里那个摘要，其实已经浓缩了整封信的脉络。

RNN 干的就是这件事。那个「脑子里的摘要」有个正式名字，叫**隐藏状态（hidden state）**——它是 RNN 的核心，也是 RNN「记忆」的载体。

## 拆开看：RNN 的三个关键组件

复杂概念不能一句话带过，得拆开看 RNN 是怎么运作的。它本质就是**同一个处理单元，在时间轴上重复使用**。

**1. 处理单元（A）**：你可以理解成一个固定的小函数。它每次干同一件事——把「当前输入」和「上一刻的记忆」两个东西揉到一起，吐出两样东西：当前的判断结果，和更新后的记忆。重点来了：**无论时间走到第几步，用的都是同一个单元、同一套参数**。这是 RNN 和「把网络复制很多份」的关键区别——它是一个单元在循环，不是很多个独立单元。

**2. 隐藏状态（记忆）**：就是上面说的「脑子里的摘要」。它本质是一个数字向量（一串数字），每走一步就刷新一次。第 t 步的记忆，取决于第 t 步的输入和第 t-1 步的记忆。如此一来，信息就能像接力棒一样，沿着时间往后传。

**3. 输入与输出**：每个时间点，网络接收一个新输入（比如一个词），可能也吐出一个输出（比如对这个词的预测）。但即便某个时刻不需要输出，记忆也一直在悄悄更新。

把这三样组合起来，再把循环「展开」，你会看到一串一模一样的单元从左到右排开，前一个把记忆递给后一个——这就是 RNN 最经典的那张「展开图」（也正是本文封面上画的：一排方框，每个方框顶上有一条自指的循环箭头，方框之间用箭头串起来，底下还有输入箭头往上送）。

## 体系位置：RNN 在 AI 里站在哪

在 AI 的版图上，RNN 属于**深度学习 → 处理序列数据的专门架构**这一支。它曾统治过自然语言处理（NLP）十几年——机器翻译、语音识别、文本生成，2010 年代基本是 RNN 家族的天下。

它的「亲戚」和「继任者」值得知道：

- **LSTM（长短期记忆网络）**和 **GRU（门控循环单元）**：RNN 的升级版，专门补 RNN 的短板（见下一节）。
- **Transformer**：2017 年横空出世的架构，靠着「注意力机制」取代 RNN 成了主流（GPT、BERT 全是它）。但 Transformer 解决的很多问题，最早就是 RNN 在啃——理解 RNN，是理解 Transformer 为什么那么设计的好起点。

## RNN 的致命短板：记不住太远的事

RNN 听起来很美好，但它有个出名的毛病，叫**「梯度消失」**，大白话就是：**它记不住很久以前的事**。

原因在于它训练时（用反向传播调整参数）要沿着时间往回传信号。每往回走一步，信号就被乘以一个小于 1 的系数；走几十步，信号就缩到几乎为零。结果就是——网络「学」不动很久之前的输入，长距离依赖（比如一句话开头的主语和结尾的动词）抓不住。短记还行，长记就糊涂了。

这正是 LSTM 和 GRU 出场的原因。它们在 RNN 的单元里加了几个**「门」**（遗忘门、输入门、输出门），用一种更聪明的「加法」方式更新记忆（而不是反复相乘），让信号能传得更远，从而记住更久以前的信息。可以这么记：**LSTM/GRU 是给 RNN 装上了「智能记忆开关」的加强版。**

## 为什么重要、现在还用在哪

哪怕今天 Transformer 风头正盛，RNN 也并没有被扫进历史垃圾堆：

- **教学与入门**：RNN 是理解「网络如何处理时间/序列」的最简洁模型，几乎每本深度学习教材都从它讲起。
- **小设备、实时场景**：RNN（尤其轻量的 GRU）参数少、能边来数据边算，适合手机、可穿戴设备上跑实时语音识别、传感器时序预测。
- **时序预测**：股票、天气、工业传感器这类纯时间序列任务，RNN/LSTM 仍是常用基线模型。
- **概念基石**：读懂了 RNN 的「记忆」与「梯度消失」，再去看 LSTM 的门、Transformer 的注意力，会顺畅得多。

## 一句话带走

RNN 就是给神经网络加了一条**记忆回路**，让它能像边读边记的人一样处理有顺序的数据；它开创了序列建模的范式，虽被 LSTM 补强了短板、又被 Transformer 接过了主流接力棒，但仍是理解一整代 AI 序列模型时不可跳过的地基。

## 参考资料

1. Understanding LSTM Networks — Christopher Olah（循环网络最经典的图解博客，讲 RNN 展开图和 LSTM 的门）
   https://colah.github.io/posts/2015-08-Understanding-LSTMs/
2. 循环神经网络 — 《动手学深度学习》（D2L，李沐团队的经典开源教材 RNN 章节，含公式与代码）
   https://d2l.ai/chapter_recurrent-neural-networks/rnn.html
3. 什么是循环神经网络（RNN）？ — IBM（权威厂商科普，覆盖 RNN 原理与 LSTM/GRU）
   https://www.ibm.com/cn-zh/think/topics/recurrent-neural-networks
