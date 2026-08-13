---
title: 稀疏 MOE 是什么
date: 2026-08-12 14:36
tags: [AI]
excerpt: 大模型想懂得多就得堆参数，可参数一多推理就慢、显存就爆。稀疏混合专家（SparseMoE）让每个 token 只激活 Top-K 个最对口的专家，于是模型总参数量可以做得很大、单次前向却只算一小部分，实现「参数多、算得快」的以小博大。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOijhemlsOWchueCue+8iOaegea3oe+8iSAtLT4KICA8Y2lyY2xlIGN4PSI5MCIgY3k9IjkwIiByPSI1NSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4wNiIvPgogIDxjaXJjbGUgY3g9IjExMTUiIGN5PSI1NjAiIHI9Ijg4IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjA2Ii8+CiAgPGNpcmNsZSBjeD0iMTA1NSIgY3k9IjEwNSIgcj0iMjgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDgiLz4KCiAgPCEtLSDmoIfpopggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPueogOeWj+a3t+WQiOS4k+WutiBTcGFyc2VNb0U8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgTWljcm9zb2Z0IFlhSGVpLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjgyIj5TcGFyc2UgTWl4dHVyZSBvZiBFeHBlcnRzIMK3IOavj+S4qiB0b2tlbiDlj6rmv4DmtLsgVG9wLUsg5Liq5LiT5a62PC90ZXh0PgoKICA8IS0tIGlucHV0IHRva2VuIC0tPgogIDxjaXJjbGUgY3g9IjExMCIgY3k9IjMyMCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMTAiIHk9IjMyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj50b2tlbjwvdGV4dD4KCiAgPCEtLSByb3V0ZXIgLyBnYXRlIC0tPgogIDxyZWN0IHg9IjI5MCIgeT0iMjc0IiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjkyIiByeD0iMTQiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTYiLz4KICA8dGV4dCB4PSIzNTAiIHk9IjMxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj7ot6/nlLHpl6jmjqc8L3RleHQ+CiAgPHRleHQgeD0iMzUwIiB5PSIzNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj5Sb3V0ZXI8L3RleHQ+CgogIDwhLS0gNiDkuKrkuJPlrrbnurXlkJHmjpLliJfvvJpUb3AtMiDpq5jkuq7vvIjnmb3lupXlrp7nur/vvInvvIzlhbbkvZnljYrpgI/mmI7omZrnur/moYbooajnpLrjgIzmsonpu5jjgI0gLS0+CiAgPCEtLSDkuJPlrrYgMe+8iOa/gOa0u++8jFRvcC0x77yJIC0tPgogIDxyZWN0IHg9IjY4MCIgeT0iMTgwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjQ4IiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTYiLz4KICA8dGV4dCB4PSI3NTAiIHk9IjIxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj7kuJPlrrYgMSDinJM8L3RleHQ+CgogIDwhLS0g5LiT5a62IDLvvIjmsonpu5jvvIkgLS0+CiAgPHJlY3QgeD0iNjgwIiB5PSIyNDIiIHdpZHRoPSIxNDAiIGhlaWdodD0iNDgiIHJ4PSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNSA0IiBvcGFjaXR5PSIwLjQiLz4KICA8dGV4dCB4PSI3NTAiIHk9IjI3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjQiPuS4k+WutiAyPC90ZXh0PgoKICA8IS0tIOS4k+WutiAz77yI5r+A5rS777yMVG9wLTLvvIkgLS0+CiAgPHJlY3QgeD0iNjgwIiB5PSIzMDQiIHdpZHRoPSIxNDAiIGhlaWdodD0iNDgiIHJ4PSIxMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45NiIvPgogIDx0ZXh0IHg9Ijc1MCIgeT0iMzM0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YzYzZmYiIGZvbnQtd2VpZ2h0PSI3MDAiPuS4k+WutiAzIOKckzwvdGV4dD4KCiAgPCEtLSDkuJPlrrYgNO+8iOayiem7mO+8iSAtLT4KICA8cmVjdCB4PSI2ODAiIHk9IjM2NiIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI0OCIgcng9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI1IDQiIG9wYWNpdHk9IjAuNCIvPgogIDx0ZXh0IHg9Ijc1MCIgeT0iMzk2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNCI+5LiT5a62IDQ8L3RleHQ+CgogIDwhLS0g5LiT5a62IDXvvIjmsonpu5jvvIkgLS0+CiAgPHJlY3QgeD0iNjgwIiB5PSI0MjgiIHdpZHRoPSIxNDAiIGhlaWdodD0iNDgiIHJ4PSIxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNSA0IiBvcGFjaXR5PSIwLjQiLz4KICA8dGV4dCB4PSI3NTAiIHk9IjQ1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjQiPuS4k+WutiA1PC90ZXh0PgoKICA8IS0tIOS4k+WutiA277yI5rKJ6buY77yJIC0tPgogIDxyZWN0IHg9IjY4MCIgeT0iNDkwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjQ4IiByeD0iMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIgb3BhY2l0eT0iMC40Ii8+CiAgPHRleHQgeD0iNzUwIiB5PSI1MjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC40Ij7kuJPlrrYgNjwvdGV4dD4KCiAgPCEtLSBvdXRwdXQgLS0+CiAgPGNpcmNsZSBjeD0iMTA4MCIgY3k9IjI4OCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMDgwIiB5PSIyOTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+6L6T5Ye6PC90ZXh0PgoKICA8IS0tIGlucHV0IOKGkiByb3V0ZXIgLS0+CiAgPGxpbmUgeDE9IjE0MCIgeTE9IjMyMCIgeDI9IjI5MCIgeTI9IjMyMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KCiAgPCEtLSByb3V0ZXIg4oaSIGV4cGVydHPvvJrmv4DmtLvnmoTnspflrp7nur/vvIzmsonpu5jnmoTnu4bomZrnur/vvIjooajnpLrooqvot6/nlLHlmajot7Pov4fvvIkgLS0+CiAgPGxpbmUgeDE9IjQxMCIgeTE9IjI5NiIgeDI9IjY4MCIgeTI9IjIwNCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuOTUiLz4KICA8bGluZSB4MT0iNDEwIiB5MT0iMzA4IiB4Mj0iNjgwIiB5Mj0iMjY2IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI1IDQiIG9wYWNpdHk9IjAuMzUiLz4KICA8bGluZSB4MT0iNDEwIiB5MT0iMzMyIiB4Mj0iNjgwIiB5Mj0iMzI4IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNiIgb3BhY2l0eT0iMC45NSIvPgogIDxsaW5lIHgxPSI0MTAiIHkxPSIzNDQiIHgyPSI2ODAiIHkyPSIzOTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIgb3BhY2l0eT0iMC4zNSIvPgogIDxsaW5lIHgxPSI0MTAiIHkxPSIzNTQiIHgyPSI2ODAiIHkyPSI0NTIiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIgb3BhY2l0eT0iMC4zNSIvPgogIDxsaW5lIHgxPSI0MTAiIHkxPSIzNjQiIHgyPSI2ODAiIHkyPSI1MTQiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIgb3BhY2l0eT0iMC4zNSIvPgoKICA8IS0tIGV4cGVydHMg4oaSIG91dHB1dO+8muWPquaciea/gOa0u+eahCAyIOS4quS4k+WutueahOi+k+WHuuaxh+WFpSAtLT4KICA8bGluZSB4MT0iODIwIiB5MT0iMjA0IiB4Mj0iMTA1MiIgeTI9IjI4MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuOTUiLz4KICA8bGluZSB4MT0iODIwIiB5MT0iMzI4IiB4Mj0iMTA1MiIgeTI9IjI5NiIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjYiIG9wYWNpdHk9IjAuOTUiLz4KCiAgPCEtLSBUb3AtSyDmoIfnrb7vvIjngrnmmI7nqIDnlo/nmoTmoLjlv4PvvIkgLS0+CiAgPHJlY3QgeD0iODU1IiB5PSIxNDAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMzIiIHJ4PSIxNiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4xOCIvPgogIDx0ZXh0IHg9IjkxNSIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiNmZmZmZmYiIGZvbnQtd2VpZ2h0PSI3MDAiPlRvcC1LID0gMjwvdGV4dD4KCiAgPCEtLSDlupXpg6jlia/moIfor4YgLS0+CiAgPGxpbmUgeDE9IjU0MCIgeTE9IjU2OCIgeDI9IjY2MCIgeTI9IjU2OCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNSIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTk4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNzIiIGxldHRlci1zcGFjaW5nPSIzIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="稀疏 MoE 封面" />

做大模型的人，常常卡在一个两难：想让模型「懂得多」，就得把参数量做大（参数越多，能记住的知识越多）；可参数一旦多起来，每次回答都要把所有参数都算一遍，推理就慢、显存就爆。这就像想开一家「什么病都会看」的超级医院，把所有科的医生都雇进来——知识容量有了，可每个病人进门都让所有医生一起会诊，显然不现实。

稀疏混合专家（Sparse Mixture of Experts，简称 SparseMoE）就是解开这个死结的关键设计：**让模型的总参数量很大（知识容量大），但每次只激活一小部分参数参与计算（算得快）**——一句话，以小博大。它是当下主流大模型（Mixtral 8x7B、DeepSeek-V3、Switch Transformer 等）把规模做大、又把推理成本压下来的核心架构。

## 一个贯穿全文的类比：分诊台 + 专科医生

把一个 SparseMoE 层想象成一家医院：

- **专家（Expert）**：每个专家是一个独立的小神经网络（通常是前馈网络 FFN），就像医院里各个科的专科医生。
- **路由器（Router / Gate）**：一个小线性层，相当于医院的**分诊台**——它不看病的，它的活儿是「看一眼病人，决定送去哪几个科室」。

早期的「稠密版」MoE 做法是：每个病人都要被**所有**医生看一遍，再把每位医生的意见按权重加起来。医生一多，这显然太贵了。

稀疏版的破局点就一句话：**每个病人只被 Top-K 个最对口的医生看**（比如 Top-2，即分诊台打分最高的两位医生），其余医生不参与。这就是「稀疏」二字的意思——大部分专家在每次决策里都是「沉默」的。

## 它在 AI 体系中的位置

SparseMoE 属于**大模型架构设计**分支，是当下主流大模型把规模做大、又把推理成本压下来的核心手段。代表模型有 Google 的 Switch Transformer（Top-1）、Mistral 的 Mixtral 8x7B（Top-2）、DeepSeek-V3 等。理解它之前，最好先有「Transformer 的前馈层 FFN」和「softmax」这两个前置概念——本文会顺手点一句，不展开。

## 核心流程：路由器怎么打分、怎么挑专家

SparseMoE 的一次前向，可以拆成五步：

1. **算打分**：路由器对当前 token 算出「它对每个专家有多对口」的原始分数（logits）。
2. **softmax 归一化**：把原始分数转成概率（每个数在 0~1 之间，加起来等于 1）。
3. **取 Top-K**：只保留分数最高的 K 个专家，其余专家权重直接清零。
4. **分发计算**：只把 token 喂给被选中的 K 个专家，没被选中的专家本轮完全不计算。
5. **加权求和**：用这 K 个专家的（重新归一化后的）权重，把它们的输出加权相加，作为本层最终输出。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDwhLS0g6IOM5pmvIC0tPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM0MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8IS0tIOaAu+agh+mimCAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij5TcGFyc2VNb0Ug5LiA5qyh5YmN5ZCR55qE5LqU5q2l5rWB5rC057q/PC90ZXh0PgoKICA8IS0tIOS6lOS4quiKgueCue+8muWuvSAxODDvvIzpl7Tot50gMzDvvIzotbfngrkgeD05MCAtLT4KICA8IS0tIOiKgueCuSAx77ya566X5omT5YiGIC0tPgogIDxjaXJjbGUgY3g9IjE4MCIgY3k9Ijk1IiByPSIyMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjE4MCIgeT0iMTAzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj4xPC90ZXh0PgogIDxyZWN0IHg9IjkwIiB5PSIxMjAiIHdpZHRoPSIxODAiIGhlaWdodD0iMTEwIiByeD0iMTQiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMTgwIiB5PSIxNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPueul+aJk+WIhjwvdGV4dD4KICA8dGV4dCB4PSIxODAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+cm91dGVyIOWvueavj+S4quS4k+WutjwvdGV4dD4KICA8dGV4dCB4PSIxODAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+566X5Y6f5aeL5YiG5pWwIGxvZ2l0czwvdGV4dD4KICA8dGV4dCB4PSIxODAiIHk9IjIyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZjNjNmZiIgZm9udC1zdHlsZT0iaXRhbGljIj54IMK3IFdfZzwvdGV4dD4KCiAgPCEtLSDnrq3lpLQgMeKGkjIgLS0+CiAgPGxpbmUgeDE9IjI3MyIgeTE9IjE3NSIgeDI9IjI5MiIgeTI9IjE3NSIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjI5MiwxNjggMjkyLDE4MiAzMDYsMTc1IiBmaWxsPSIjOWNhM2FmIi8+CgogIDwhLS0g6IqC54K5IDLvvJpzb2Z0bWF4IOW9kuS4gCAtLT4KICA8Y2lyY2xlIGN4PSIzOTAiIGN5PSI5NSIgcj0iMjIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIzOTAiIHk9IjEwMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+MjwvdGV4dD4KICA8cmVjdCB4PSIzMDAiIHk9IjEyMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMTAiIHJ4PSIxNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSIzOTAiIHk9IjE1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+c29mdG1heCDlvZLkuIA8L3RleHQ+CiAgPHRleHQgeD0iMzkwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPuaKiuWIhuaVsOi9rOaIkOamgueOhzwvdGV4dD4KICA8dGV4dCB4PSIzOTAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+6YO95ZyoIDB+Me+8jOWSjOS4uiAxPC90ZXh0PgogIDx0ZXh0IHg9IjM5MCIgeT0iMjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmM2M2ZmIiBmb250LXN0eWxlPSJpdGFsaWMiPkcoeCkgPSBTb2Z0bWF4PC90ZXh0PgoKICA8IS0tIOeureWktCAy4oaSMyAtLT4KICA8bGluZSB4MT0iNDgzIiB5MT0iMTc1IiB4Mj0iNTAyIiB5Mj0iMTc1IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNTAyLDE2OCA1MDIsMTgyIDUxNiwxNzUiIGZpbGw9IiM5Y2EzYWYiLz4KCiAgPCEtLSDoioLngrkgM++8muWPliBUb3AtSyAtLT4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSI5NSIgcj0iMjIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjEwMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+MzwvdGV4dD4KICA8cmVjdCB4PSI1MTAiIHk9IjEyMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMTAiIHJ4PSIxNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjE1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+5Y+WIFRvcC1LPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7lj6rnlZnliIbmlbDmnIDpq5jnmoQ8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPksg5Liq77yM5YW25L2Z5riF6Zu2PC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmM2M2ZmIiBmb250LXN0eWxlPSJpdGFsaWMiPnRvcmNoLnRvcGs8L3RleHQ+CgogIDwhLS0g566t5aS0IDPihpI0IC0tPgogIDxsaW5lIHgxPSI2OTMiIHkxPSIxNzUiIHgyPSI3MTIiIHkyPSIxNzUiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI3MTIsMTY4IDcxMiwxODIgNzI2LDE3NSIgZmlsbD0iIzljYTNhZiIvPgoKICA8IS0tIOiKgueCuSA077ya5YiG5Y+R6K6h566XIC0tPgogIDxjaXJjbGUgY3g9IjgxMCIgY3k9Ijk1IiByPSIyMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjgxMCIgeT0iMTAzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj40PC90ZXh0PgogIDxyZWN0IHg9IjcyMCIgeT0iMTIwIiB3aWR0aD0iMTgwIiBoZWlnaHQ9IjExMCIgcng9IjE0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjgxMCIgeT0iMTUyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7liIblj5HorqHnrpc8L3RleHQ+CiAgPHRleHQgeD0iODEwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPnRva2VuIOWPquWWgue7mTwvdGV4dD4KICA8dGV4dCB4PSI4MTAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+6KKr6YCJ5Lit55qEIEsg5Liq5LiT5a62PC90ZXh0PgogIDx0ZXh0IHg9IjgxMCIgeT0iMjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmM2M2ZmIiBmb250LXN0eWxlPSJpdGFsaWMiPuWFtuS9meS4jeiuoeeulzwvdGV4dD4KCiAgPCEtLSDnrq3lpLQgNOKGkjUgLS0+CiAgPGxpbmUgeDE9IjkwMyIgeTE9IjE3NSIgeDI9IjkyMiIgeTI9IjE3NSIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjkyMiwxNjggOTIyLDE4MiA5MzYsMTc1IiBmaWxsPSIjOWNhM2FmIi8+CgogIDwhLS0g6IqC54K5IDXvvJrliqDmnYPmsYLlkowgLS0+CiAgPGNpcmNsZSBjeD0iMTAyMCIgY3k9Ijk1IiByPSIyMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjEwMjAiIHk9IjEwMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+NTwvdGV4dD4KICA8cmVjdCB4PSI5MzAiIHk9IjEyMCIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxMTAiIHJ4PSIxNCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSIxMDIwIiB5PSIxNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuWKoOadg+axguWSjDwvdGV4dD4KICA8dGV4dCB4PSIxMDIwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPksg5Liq5p2D6YeN6YeN5pawPC90ZXh0PgogIDx0ZXh0IHg9IjEwMjAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+5b2S5LiA5ZCO5Yqg5p2D55u45YqgPC90ZXh0PgogIDx0ZXh0IHg9IjEwMjAiIHk9IjIyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZjNjNmZiIgZm9udC1zdHlsZT0iaXRhbGljIj7ihpIg5bGC6L6T5Ye6PC90ZXh0PgoKICA8IS0tIOW6lemDqOazqOinoyAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjI5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+5YmN5Lik5q2l5piv44CM5omT5YiG5b2S5LiA44CN77yM56ysIDMg5q2l5piv44CM56iA55aP6YCJ5oup44CN77yM5ZCO5Lik5q2l5piv44CM5Y+q566X6KKr6YCJ5Lit55qE44CNPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmM2M2ZmIj7nrKwgM+OAgTQg5q2l5ZCI6LW35p2l5bCx5piv44CM56iA55aP44CN55yB566X5Yqb55qE5YWz6ZSuPC90ZXh0Pgo8L3N2Zz4K" alt="SparseMoE 一次前向的五步流水线" />

*图 1：SparseMoE 前向五步——从打分归一、Top-K 选择到只算被选中的专家*

把这套流程写成公式，只有两条，却抓住了 SparseMoE 的全部机制。

### 路由打分

$$G(x) = \text{Softmax}(x \cdot W_g)$$

逐个符号拆开：

- $x$：当前 token 的向量表示（一个 token 进来时的「特征」）。
- $W_g$：路由器内部的权重矩阵，形状是 `[特征维度, 专家数]`——这是路由器唯一需要学的参数。
- $x \cdot W_g$：得到每个专家的原始打分（logits），有几个专家就有几个数。
- $\text{Softmax}$：把原始打分归一成概率，让它们好比较。
- $G(x)$：等号左边的输出量——路由权重向量，即每个专家分到的比重（所有分量加起来等于 1）。

**直观理解**：分诊台护士看一眼病人，给每个科室打一个「对口程度」分，再换算成百分比。

### Top-K 选择 + 重新归一化

打完分后，**只保留分数最高的 K 个专家**（比如 K=2），其余专家的路由权重直接置 0。被选中的 K 个权重通常还会**再做一次归一化**（让这 K 个权重加起来等于 1），方便后面加权求和。

### 专家输出加权求和

$$y = \sum_{i=1}^{N} G(x)_i \cdot E_i(x)$$

- $y$：等号左边，本层 SparseMoE 对当前 token 算出的最终输出向量。
- $N$：专家总数。
- $E_i(x)$：第 $i$ 个专家对 token $x$ 算出来的输出。
- $G(x)_i$：第 $i$ 个专家的路由权重（没被选中的专家此项为 0）。

由于没被选中的专家 $G(x)_i = 0$，它的输出 $E_i(x)$ 根本不用算——这正是「稀疏」省算力的地方：公式里虽然对所有 $N$ 个专家求和，实际只算被选中的那 K 个。

## 一个最小算例：3 个专家，挑 Top-2

假设有 3 个专家，某个 token 经过路由器后得到原始 logits 为 $[2.0,\ 1.0,\ 0.5]$。

第一步，softmax 归一化（用 $e^{x_i} / \sum e^{x_j}$，其中 $e \approx 2.718$ 是自然对数底，$i$、$j$ 都是遍历所有专家的求和指标）：

- $e^{2.0} \approx 7.39$，$e^{1.0} \approx 2.72$，$e^{0.5} \approx 1.65$
- 三者之和 $\approx 11.76$
- 三个概率 $\approx [0.628,\ 0.231,\ 0.140]$

第二步，Top-2 选择：保留专家 1（0.628）和专家 2（0.231），专家 3 落选。

第三步，对剩下的两个权重重新归一化（让它们加起来等于 1）：

- 总和 $0.628 + 0.231 = 0.859$
- 专家 1 权重 $\approx 0.628 / 0.859 \approx 0.731$
- 专家 2 权重 $\approx 0.231 / 0.859 \approx 0.269$

**自检**：$0.731 + 0.269 = 1.0$ ✓，两个权重都在 0~1 之间 ✓，方向也合理（专家 1 原本分更高，归一化后仍然更大）✓。

最终输出 = $0.731 \times E_1(x) + 0.269 \times E_2(x)$。专家 3 完全没参与计算，省了它那份算力。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDU0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDwhLS0g6IOM5pmvIC0tPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjU0MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8IS0tIOaAu+agh+mimCAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7mnIDlsI/nrpfkvovvvJrmiZPliIYg4oaSIHNvZnRtYXgg4oaSIFRvcC0yIOKGkiDph43mlrDlvZLkuIDljJY8L3RleHQ+CgogIDwhLS0gPT09PT0g6Zi25q61IOKRoCDljp/lp4sgbG9naXRz77yI56uW5p+x77yJID09PT09IC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YzYzZmYiPuKRoCDljp/lp4vmiZPliIYgbG9naXRz77yI5pyq5b2S5LiA77yM5pyJ5aSn5pyJ5bCP77yJPC90ZXh0PgogIDwhLS0g5LiJ5qC556uW5p+x77yM5p+x5bqVIHk9MTgw77yM5pyA5aSn5YC8IDIuMCDlr7nlupTpq5ggMTAwIC0tPgogIDxyZWN0IHg9IjQzMCIgeT0iODAiICB3aWR0aD0iODAiIGhlaWdodD0iMTAwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHJlY3QgeD0iNTYwIiB5PSIxMzAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI1MCIgIGZpbGw9IiNhNzhiZmEiLz4KICA8cmVjdCB4PSI2OTAiIHk9IjE1NSIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI1IiAgZmlsbD0iI2M0YjVmZCIvPgogIDwhLS0g5p+x6aG25pWw5YC8IC0tPgogIDx0ZXh0IHg9IjQ3MCIgeT0iNzIiICB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij4yLjA8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPjEuMDwvdGV4dD4KICA8dGV4dCB4PSI3MzAiIHk9IjE0NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+MC41PC90ZXh0PgogIDwhLS0g5p+x5bqV5LiT5a625ZCNIC0tPgogIDx0ZXh0IHg9IjQ3MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj7kuJPlrrYgMTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+5LiT5a62IDI8L3RleHQ+CiAgPHRleHQgeD0iNzMwIiB5PSIyMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPuS4k+WutiAzPC90ZXh0PgoKICA8IS0tID09PT09IOmYtuautSDikaEgc29mdG1heCDlvZLkuIDvvIjmr5TkvovmnaHvvIkgPT09PT0gLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIyNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YzYzZmYiPuKRoSBzb2Z0bWF4IOW9kuS4gOaIkOamgueOh++8iOS4ieauteaLvOa7oe+8jOWSjCA9IDHvvIk8L3RleHQ+CiAgPCEtLSDmnaEgeD0xNTAuLjEwNTDvvIzlrr0gOTAw77yMeT0yNjDvvIxoPTQyIC0tPgogIDxyZWN0IHg9IjE1MCIgeT0iMjYwIiB3aWR0aD0iNTY1IiBoZWlnaHQ9IjQyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHJlY3QgeD0iNzE1IiB5PSIyNjAiIHdpZHRoPSIyMDgiIGhlaWdodD0iNDIiIGZpbGw9IiNhNzhiZmEiLz4KICA8cmVjdCB4PSI5MjMiIHk9IjI2MCIgd2lkdGg9IjEyNyIgaGVpZ2h0PSI0MiIgZmlsbD0iI2M0YjVmZCIvPgogIDx0ZXh0IHg9IjQzMiIgeT0iMjg3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj4wLjYyODwvdGV4dD4KICA8dGV4dCB4PSI4MTkiIHk9IjI4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+MC4yMzE8L3RleHQ+CiAgPHRleHQgeD0iOTg2IiB5PSIyODciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPjAuMTQwPC90ZXh0PgoKICA8IS0tID09PT09IOmYtuautSDikaIgVG9wLTIg6YCJ5oup77yI5LiT5a62IDMg5riF6Zu277yJID09PT09IC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj7ikaIgVG9wLTIg6YCJ5oup77ya5LiT5a62IDMg6JC96YCJ77yM5YW25p2D6YeN5riF6Zu2PC90ZXh0PgogIDxyZWN0IHg9IjE1MCIgeT0iMzYwIiB3aWR0aD0iNTY1IiBoZWlnaHQ9IjQyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHJlY3QgeD0iNzE1IiB5PSIzNjAiIHdpZHRoPSIyMDgiIGhlaWdodD0iNDIiIGZpbGw9IiNhNzhiZmEiLz4KICA8IS0tIOiiq+S4ouW8g+aute+8muiZmue6v+eBsOahhiAtLT4KICA8cmVjdCB4PSI5MjMiIHk9IjM2MCIgd2lkdGg9IjEyNyIgaGVpZ2h0PSI0MiIgZmlsbD0iI2VlZjJmZiIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIvPgogIDx0ZXh0IHg9IjQzMiIgeT0iMzg3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj4wLjYyODwvdGV4dD4KICA8dGV4dCB4PSI4MTkiIHk9IjM4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+MC4yMzE8L3RleHQ+CiAgPHRleHQgeD0iOTg2IiB5PSIzODciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNjNGI1ZmQiPjA8L3RleHQ+CgogIDwhLS0gPT09PT0g6Zi25q61IOKRoyDph43mlrDlvZLkuIDljJbvvIjkuKTmrrXph43mlrDloavmu6HvvIkgPT09PT0gLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI0NDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YzYzZmYiPuKRoyDliankvZnkuKTmnYPph43ph43mlrDlvZLkuIDljJbvvIjph43mlrDmi7zmu6HvvIzlkowgPSAx77yJPC90ZXh0PgogIDxyZWN0IHg9IjE1MCIgeT0iNDYwIiB3aWR0aD0iNjU4IiBoZWlnaHQ9IjQyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHJlY3QgeD0iODA4IiB5PSI0NjAiIHdpZHRoPSIyNDIiIGhlaWdodD0iNDIiIGZpbGw9IiNhNzhiZmEiLz4KICA8dGV4dCB4PSI0NzkiIHk9IjQ4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+MC43MzE8L3RleHQ+CiAgPHRleHQgeD0iOTI5IiB5PSI0ODciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPjAuMjY5PC90ZXh0PgoKICA8IS0tIOW6lemDqOazqOinoyAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjUyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+VG9wLUsg5ZCO5YGa5LiA5qyh6YeN5paw5b2S5LiA5YyW77yM6K6p55WZ5LiL55qE5LiT5a625p2D6YeN6YeN5paw5YeR5oiQIDHvvIzkvr/kuo7lkI7pnaLliqDmnYPmsYLlkow8L3RleHQ+Cjwvc3ZnPgo=" alt="最小算例从 logits 到重新归一化的比例条演变" />

*图 2：最小算例——原始打分经 softmax、Top-2 截断、重新归一化的四步演变*

## 为什么 SparseMoE 能「以小博大」

把 Mixtral 8x7B 的真实数字摆出来，一切就一目了然：

- **总参数量 ≈ 47B**（知识容量大，相当于一个 47B 的大脑装在脑袋里）。
- **每个 token 只激活 2/8 个专家**，实际参与计算的参数 ≈ 13B。
- **推理速度**接近一个 13B 的稠密模型，但知识储备是 47B 的级别。

这就是 SparseMoE 的核心价值：**总参数量 ≠ 计算量**。总参数量决定「能装多少知识」，激活参数量决定「跑得多快」。稀疏路由让这两个量解耦——大脑可以很大，但每次思考只动用一小部分。

代价也不是没有：所有 47B 参数都得装进显存（哪怕大部分每次不算），所以 MoE 模型对显存要求高，本质是「用显存换算力」。这也是为什么 Mixtral 8x7B 看起来只有 8 个 7B，部署门槛却远高于单个 7B 模型。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDwhLS0g6IOM5pmvIC0tPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8IS0tIOaAu+agh+mimCAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij5NaXh0cmFsIDh4N0LvvJo0N0Ig55qE5aSn6ISR77yMMTNCIOeahOeul+WKmzwvdGV4dD4KCiAgPCEtLSDkuInmoLnnq5bmn7HvvIzmn7HlupUgeT0zMTAgLS0+CiAgPCEtLSDmgLvlj4LmlbAgNDdC77yI5pyA6auY77yJIC0tPgogIDxyZWN0IHg9IjI4NSIgeT0iNTAiIHdpZHRoPSIxMzAiIGhlaWdodD0iMjYwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMzUwIiB5PSI0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+NDdCPC90ZXh0PgogIDx0ZXh0IHg9IjM1MCIgeT0iMzM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij7mgLvlj4LmlbDph488L3RleHQ+CiAgPHRleHQgeD0iMzUwIiB5PSIzNTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPu+8iOefpeivhuWuuemHj++8iTwvdGV4dD4KCiAgPCEtLSDljZXmrKHmv4DmtLsgMTNC77yI55+u77yJIC0tPgogIDxyZWN0IHg9IjUzNSIgeT0iMjM4IiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjcyIiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIyMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPjEzQjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjMzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+5Y2V5qyh5r+A5rS75Y+C5pWwPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMzU2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7vvIgyLzgg5Liq5LiT5a6277yJPC90ZXh0PgoKICA8IS0tIDEzQiDnqKDlr4blj4LnhacgLS0+CiAgPHJlY3QgeD0iNzg1IiB5PSIyMzgiIHdpZHRoPSIxMzAiIGhlaWdodD0iNzIiIGZpbGw9IiM5Y2EzYWYiLz4KICA8dGV4dCB4PSI4NTAiIHk9IjIzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+MTNCPC90ZXh0PgogIDx0ZXh0IHg9Ijg1MCIgeT0iMzM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij4xM0Ig56ig5a+G5qih5Z6LPC90ZXh0PgogIDx0ZXh0IHg9Ijg1MCIgeT0iMzU2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7vvIjlj4LnhafvvIk8L3RleHQ+CgogIDwhLS0g562J6auY6Jma57q/77ya6L+e5o6l5Lik5LiqIDEzQiDmn7HpobbvvIzmoIfmjqjnkIbpgJ/luqbnm7jlvZMgLS0+CiAgPGxpbmUgeDE9IjY2NSIgeTE9IjIzOCIgeDI9Ijc4NSIgeTI9IjIzOCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNSIvPgogIDx0ZXh0IHg9IjcyNSIgeT0iMjI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj7mjqjnkIbpgJ/luqbnm7jlvZM8L3RleHQ+CgogIDwhLS0g5bqV6YOo5rOo6KejIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmI3MjgwIj7mgLvlj4LmlbDlhrPlrprohJHlrrnph4/vvIg0N0LvvInvvIzmv4DmtLvlj4LmlbDlhrPlrprmgJ3ogIPpgJ/luqbvvIjiiYgxM0Ig56ig5a+G77yJ4oCU4oCU5Lik6ICF6KKr56iA55aP6Lev55Sx6Kej6ICmPC90ZXh0Pgo8L3N2Zz4K" alt="Mixtral 8x7B 总参数 47B 与激活参数 13B 的对比" />

*图 3：Mixtral 8x7B——47B 的总参数只激活 13B，推理速度相当于一个 13B 稠密模型*

## PyTorch 代码：Mistral 风格的最小实现

下面这个实现参考 Mistral MoE 的写法，拆成两个类：`MOERouter`（分诊台）和 `SparseMOE`（整层）。先看穿插片段，文末有完整可跑版。

**路由器核心：gate → softmax → topk → 归一化 → one_hot 掩码**

```python
# 路由器：给每个 token 算出「该去哪些专家」以及对应权重
class MOERouter(nn.Module):
    def __init__(self, dim, num_experts, top_k):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        # gate 就是公式里的 W_g，一个线性层把 dim 维特征映射到 num_experts 个打分
        self.gate = nn.Linear(dim, num_experts, bias=False)

    def forward(self, x):
        # x 形状: [num_tokens, dim]，把 batch 和 seq 两个维度拍扁，按 token 处理
        logits = self.gate(x)            # 第一步：算原始打分（公式里的 x · W_g）
        probs = F.softmax(logits, dim=-1)  # 第二步：softmax 归一成概率
        topk_weights, topk_indices = torch.topk(probs, self.top_k, dim=-1)  # 第三步：取 top-k
        topk_weights = topk_weights / topk_weights.sum(dim=-1, keepdim=True)  # 第四步：K 个权重重新归一化
        # 第五步：把 top-k 结果展开成 one_hot 掩码，形状 [num_tokens, num_experts]
        # 被选中的位置是 1，其余是 0——后续靠它「只把 token 喂给被选中的专家」
        mask = F.one_hot(topk_indices, num_classes=self.num_experts).sum(dim=1).float()
        return topk_weights, topk_indices, mask
```

**SparseMOE 核心：按掩码分发 token → 专家计算 → index_add_ 汇总**

```python
# 稀疏 MoE 层：把 token 按掩码分发给被选中的专家，再把结果加权汇总回来
class SparseMOE(nn.Module):
    def __init__(self, dim, num_experts, top_k):
        super().__init__()
        self.router = MOERouter(dim, num_experts, top_k)
        self.num_experts = num_experts
        # 每个专家就是一个普通的小 FFN
        self.experts = nn.ModuleList([FeedForward(dim) for _ in range(num_experts)])

    def forward(self, x):
        topk_weights, topk_indices, mask = self.router(x)
        final_output = torch.zeros_like(x)  # 准备零张量累加各专家输出

        for expert_idx in range(self.num_experts):
            # mask[:, expert_idx] == 1 表示这个 token 当前要送给 expert_idx 处理
            token_indices = torch.where(mask[:, expert_idx] == 1)[0]
            if token_indices.numel() == 0:
                continue  # 这个专家本轮没被任何 token 选中，跳过——省算力的关键
            expert_out = self.experts[expert_idx](x[token_indices])  # 只把被选中的 token 喂进去
            # 取出这些 token 对当前专家的权重（在 topk 维上挑出匹配 expert_idx 的那一项）
            sel = (topk_indices[token_indices] == expert_idx)
            weights = (topk_weights[token_indices] * sel.float()).sum(dim=1, keepdim=True)
            # 用 index_add_ 把加权结果累加到对应 token 位置
            final_output.index_add_(0, token_indices, expert_out * weights)

        return final_output
```

## 完整代码

下面是一个复制即可跑的最小版本——8 个专家、Top-2，假数据走一遍前向 + 一步训练：

```python
import torch
import torch.nn as nn
import torch.nn.functional as F


# 一个最简单的前馈专家：两层 Linear 夹一个激活
class FeedForward(nn.Module):
    def __init__(self, dim, hidden=None):
        super().__init__()
        hidden = hidden or 4 * dim
        self.w1 = nn.Linear(dim, hidden)
        self.w2 = nn.Linear(hidden, dim)

    def forward(self, x):
        # 先放大维度、过激活，再缩回原维度——标准 FFN 结构
        return self.w2(F.gelu(self.w1(x)))


# 路由器：gate → softmax → topk → 归一化 → one_hot 掩码
class MOERouter(nn.Module):
    def __init__(self, dim, num_experts, top_k):
        super().__init__()
        self.num_experts = num_experts
        self.top_k = top_k
        self.gate = nn.Linear(dim, num_experts, bias=False)  # 公式里的 W_g

    def forward(self, x):
        logits = self.gate(x)                                  # x · W_g
        probs = F.softmax(logits, dim=-1)                      # 归一成概率
        topk_weights, topk_indices = torch.topk(probs, self.top_k, dim=-1)
        topk_weights = topk_weights / topk_weights.sum(dim=-1, keepdim=True)  # K 个权重再归一化
        mask = F.one_hot(topk_indices, num_classes=self.num_experts).sum(dim=1).float()
        return topk_weights, topk_indices, mask


class SparseMOE(nn.Module):
    def __init__(self, dim, num_experts=8, top_k=2):
        super().__init__()
        self.router = MOERouter(dim, num_experts, top_k)
        self.experts = nn.ModuleList([FeedForward(dim) for _ in range(num_experts)])
        self.num_experts = num_experts

    def forward(self, x):
        # x: [num_tokens, dim]，这里假设上游已经把 batch/seq 拍扁
        topk_weights, topk_indices, mask = self.router(x)
        final_output = torch.zeros_like(x)

        for expert_idx in range(self.num_experts):
            token_indices = torch.where(mask[:, expert_idx] == 1)[0]
            if token_indices.numel() == 0:
                continue
            expert_out = self.experts[expert_idx](x[token_indices])
            sel = (topk_indices[token_indices] == expert_idx)
            weights = (topk_weights[token_indices] * sel.float()).sum(dim=1, keepdim=True)
            final_output.index_add_(0, token_indices, expert_out * weights)

        return final_output


# === 跑一遍：8 个专家、Top-2 ===
torch.manual_seed(0)
dim, num_experts, top_k = 16, 8, 2
moe = SparseMOE(dim, num_experts, top_k)

x = torch.randn(10, dim)        # 伪造 10 个 token，每个 16 维
target = torch.randn(10, dim)   # 假目标，只为演示训练一步

out = moe(x)                                # 前向：每个 token 只动了 2 个专家
loss = F.mse_loss(out, target)              # 用 MSE 演示，任务不限定
loss.backward()                             # 反向传播：梯度经被选中的专家回流
optim = torch.optim.Adam(moe.parameters(), lr=1e-3)
optim.step()                                # 更新一步（含路由器权重 W_g）

print("前向输出形状:", out.shape)  # 期望 [10, 16]
print("loss:", round(loss.item(), 4))
```

跑完你会看到：输出形状对得上、loss 是个正常的小数——8 个专家里每个 token 只动了 2 个，但梯度照样通过那 2 个专家回流，路由器（`gate`）的权重也一起被训练。

## 小结

一句话浓缩：**SparseMoE 用一个路由器给每个 token 挑 Top-K 个最对口的专家，只让这几个专家参与计算——于是模型可以做到「参数多、知识大」，同时「单次算得少、推理快」**。总参数量决定脑容量，激活参数量决定思考速度，稀疏路由让这两件事彻底解耦。这就是当下大模型「以小博大」的核心架构。

## 参考资料

1. Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer - Noam Shazeer et al. (Google)
   https://arxiv.org/abs/1701.06538
2. Mixtral of Experts - Albert Q. Jiang et al. (Mistral AI)
   https://arxiv.org/abs/2401.04088
3. Mixture of Experts Explained - Hugging Face Blog
   https://huggingface.co/blog/moe
