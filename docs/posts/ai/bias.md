---
title: 偏置（bias）是什么
date: 2026-08-13 13:04
tags: [AI]
excerpt: 神经网络里的「偏置」（bias），是神经元公式里那个独立的可学习常数 b——和权重并列，却不乘任何输入，只负责把结果整体抬高或压低一点。权重决定每个输入有多重要，偏置决定神经元天生有多容易被激活；缺了它，决策边界只能钉死在原点、零输入只能输出零。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI5IiBtYXJrZXJIZWlnaHQ9IjkiIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgPHBhdGggZD0iTTAgMCBMMTAgNSBMMCAxMCB6IiBmaWxsPSIjZmZkNjZiIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDoo4XppbDlhYnmlpEgLS0+CiAgPGNpcmNsZSBjeD0iMTMwIiBjeT0iMTAwIiByPSIxODAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KICA8Y2lyY2xlIGN4PSIxMDgwIiBjeT0iMTgwIiByPSIyMDAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KCiAgPCEtLSDlnZDmoIfns7vvvJrlsZXnpLogYiDmiorlhrPnrZbnur/mlbTkvZPlubPnp7sgLS0+CiAgPGcgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdNaWNyb3NvZnQgWWFIZWknLCBzYW5zLXNlcmlmIj4KICAgIDxsaW5lIHgxPSIyNDAiIHkxPSIzNDAiIHgyPSI5NjAiIHkyPSIzNDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjQpIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSI2MDAiIHkxPSIxMDAiIHgyPSI2MDAiIHkyPSI0MDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjQpIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9Ijk2NSIgeT0iMzU2IiBmb250LXNpemU9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiPng8L3RleHQ+CiAgICA8dGV4dCB4PSI1ODIiIHk9Ijk2IiBmb250LXNpemU9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiPnk8L3RleHQ+CgogICAgPCEtLSDml6DlgY/nva7nur/vvJrov4fljp/ngrnnmoTomZrnur8gLS0+CiAgICA8bGluZSB4MT0iMzMwIiB5MT0iMzgwIiB4Mj0iODUwIiB5Mj0iMTQwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtZGFzaGFycmF5PSIxMiA5IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDx0ZXh0IHg9IjY5MCIgeT0iMTMyIiBmb250LXNpemU9IjIyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzIpIj7ml6DlgY/nva7vvJrnur/ooqvpkonlnKjljp/ngrk8L3RleHQ+CgogICAgPCEtLSDmnInlgY/nva7nur/vvJrooqsgYiDmiqzotbfnmoTlrp7nur8gLS0+CiAgICA8bGluZSB4MT0iMzMwIiB5MT0iMzEwIiB4Mj0iODUwIiB5Mj0iNzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8dGV4dCB4PSI2NjgiIHk9IjYyIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiPuacieWBj+e9ru+8muaVtOadoee6v+iiqyBiIOaKrOi1tzwvdGV4dD4KCiAgICA8IS0tIGIg5bmz56e76YeP5qCH5rOo77yI5Y2V5ZCR566t5aS077yJIC0tPgogICAgPGxpbmUgeDE9IjQ3MCIgeTE9IjMyOCIgeDI9IjQ3MCIgeTI9IjI1OCIgc3Ryb2tlPSIjZmZkNjZiIiBzdHJva2Utd2lkdGg9IjQiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8dGV4dCB4PSI0ODYiIHk9IjMwMCIgZm9udC1zaXplPSI0NCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiNmZmQ2NmIiPmI8L3RleHQ+CgogICAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMzQwIiByPSI1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiLz4KICA8L2c+CgogIDwhLS0g5Li75qCH6aKYIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9Ijk2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiCiAgICAgICAgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdNaWNyb3NvZnQgWWFIZWknLCBzYW5zLXNlcmlmIj7lgY/nva48L3RleHQ+CgogIDwhLS0g5Ymv5qCH6aKYIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjMwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIgogICAgICAgIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnUGluZ0ZhbmcgU0MnLCAnTWljcm9zb2Z0IFlhSGVpJywgc2Fucy1zZXJpZiI+QmlhcyBpbiBOZXVyYWwgTmV0d29ya3M8L3RleHQ+CgogIDwhLS0g5bqV6YOo5qCH6K+GIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjMyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCiAgICAgICAgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdNaWNyb3NvZnQgWWFIZWknLCBzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="偏置封面" />

神经网络里的「偏置」（bias），是神经元公式里那个**独立的可学习常数** $b$——它和权重 $w$ 并列，却**不乘任何输入**，只负责在最后一步把结果整体抬高或压低一点。如果说权重决定"每个输入有多重要"，那偏置决定的是"神经元天生有多容易被激活"。

一句话总结：偏置 = 神经元的"默认倾向"，一个只做加法、不碰输入的可调常数。

## 用「评审团主席的默认立场」来理解

接着上一篇「神经元」里那个评审团的例子。主席把各位评审的分数按信任度加权汇总，得到综合分。但主席本人还有个**默认立场**：他天生偏保守，会先在心里扣掉一分再开始算；或者天生偏宽容，先给垫一分。

这个"先扣/先垫的一分"，就是偏置 $b$。

为什么这个默认立场非有不可？想象一个永远从零开始、没有任何默认倾向的主席——只要今天没人提交任何评审意见（所有输入都是 0），他的综合分就只能是 0，决定永远"原地不动"。可现实里，有些事"没什么证据也该默认通过"，有些事"没什么证据也该默认否决"。偏置就是给神经元装上这个"没有输入时也有的倾向"。

## 拆开看：为什么需要 b、它和权重有何不同

偏置虽小，缺了它神经元会"瘸腿"。三件事讲清它的存在感：

- **让决策边界不必钉死在原点**：偏置本质上在做"平移"。没有 $b$，神经元的决策边界（综合分 $z=0$ 那条线）必须穿过坐标原点；有了 $b$，整条线可以整体上下左右挪——这一挪，才能把现实中"并不围绕原点分布"的数据正确切开（见下面图 1）。
- **让"零输入"也能产生非零输出**：所有输入 $x_i=0$ 时，加权求和 $\sum w_i x_i$ 一定是 0；如果没有 $b$，神经元输出就被钉死成激活函数在 0 处的值（比如 ReLU 恒为 0）。加个 $b$，神经元在没有明显输入时也能"有态度"。
- **把激活函数推到合适的工作区**：像 sigmoid 这类函数，原点附近几乎是一条直线（接近线性），只有被 $b$ 推一推、挪到曲线弯曲的地方，神经元才能用到"非线性"那部分——而这正是神经网络能学复杂规律的关键。（所谓**线性**就是直来直去、按比例放大缩小，画出来是一条直线；**非线性**就是会拐弯，能把简单零件拼成复杂的判断。光靠线性，再多层叠起来也等价于一层，网络就学不动复杂规律了。）

**偏置和权重的区别**（这是新手最容易混的）：

| | 权重 $w$ | 偏置 $b$ |
|---|---|---|
| 怎么作用 | 和输入**相乘** | 和输入无关，**直接相加** |
| 调的是什么 | 每个输入的"重要程度" | 神经元整体的"激活门槛" |
| 数量 | 每个输入配一个（$n$ 个） | 每个神经元只有 1 个 |
| 训练时 | 反向传播更新 | 反向传播**一起**更新 |

在 AI 体系里，偏置是神经元"五个零件"之一（输入、权重、偏置、加权和、激活函数），和权重一样是训练时要学的**参数**。它俩经常被合在一起记作 $(W, b)$——读代码或论文时看到"网络参数"，指的就是这一整套权重加偏置。

放在现实任务里就好懂了：比如一个专门"判断邮件是不是垃圾"的神经元，各种输入是邮件里的可疑信号（有没有"中奖"字眼、有没有奇怪链接），权重是每个信号有多可疑，而偏置就是神经元"默认有多怀疑"——偏置高，哪怕没什么可疑信号也容易报警；偏置低，就得攒够证据才肯报警。这个"默认怀疑度"，就是 $b$ 在现实里的样子。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQyMCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5rKh5pyJ5YGP572u77yM5Yaz562W6L6555WM5Y+q6IO96L+H5Y6f54K54oCU4oCU5bi45bi45YiH5LiN5byA5Lik57G754K5PC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPuW3pu+8muaXoOWBj+e9rue6v+iiq+mSieWcqOWOn+eCue+8jOWIhumUme+8m+WPs++8muWKoOS6hiBi77yM57q/5pW05L2T5bmz56e777yM5q2j56Gu5YiG5byA5Lik57G7PC90ZXh0PgoKICA8IS0tIOW3pu+8muaXoOWBj+e9riAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4MCw5MCkiPgogICAgPHRleHQgeD0iMjIwIiB5PSItMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmI3MjgwIj7ml6DlgY/nva7vvIjov4fljp/ngrnvvIk8L3RleHQ+CiAgICA8bGluZSB4MT0iMCIgeTE9IjI2MCIgeDI9IjQ0MCIgeTI9IjI2MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIyMCIgeDI9IjIyMCIgeTI9IjI4MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSI2MCIgeTE9IjYwIiB4Mj0iMzgwIiB5Mj0iMjYwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgNyIvPgogICAgPGcgZmlsbD0iIzZjNjNmZiI+CiAgICAgIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIxMSIvPgogICAgICA8Y2lyY2xlIGN4PSIxNDAiIGN5PSIxMTAiIHI9IjExIi8+CiAgICAgIDxjaXJjbGUgY3g9IjkwIiBjeT0iMTM1IiByPSIxMSIvPgogICAgICA8Y2lyY2xlIGN4PSIxNjUiIGN5PSI3MCIgcj0iMTEiLz4KICAgIDwvZz4KICAgIDxnIGZpbGw9IiNhNzhiZmEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgICAgPHJlY3QgeD0iMjc4IiB5PSIxOTgiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPgogICAgICA8cmVjdCB4PSIzMTgiIHk9IjE2OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICAgIDxyZWN0IHg9IjI5OCIgeT0iMjI4IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz4KICAgICAgPHJlY3QgeD0iMzQ4IiB5PSIxOTgiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPgogICAgPC9nPgogICAgPHRleHQgeD0iMjIwIiB5PSIzMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNkYzI2MjYiPue6v+iiq+mSieWcqOWOn+eCue+8jOWIh+S4jeW8gOS4pOexuzwvdGV4dD4KICA8L2c+CgogIDwhLS0g5Y+z77ya5pyJ5YGP572uIC0tPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDY4MCw5MCkiPgogICAgPHRleHQgeD0iMjIwIiB5PSItMTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7mnInlgY/nva7vvIjnur/ooqsgYiDlubPnp7vvvIk8L3RleHQ+CiAgICA8bGluZSB4MT0iMCIgeTE9IjI2MCIgeDI9IjQ0MCIgeTI9IjI2MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIyMCIgeDI9IjIyMCIgeTI9IjI4MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDxsaW5lIHgxPSI2MCIgeTE9IjIyMCIgeDI9IjM4MCIgeTI9IjQwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8ZyBmaWxsPSIjNmM2M2ZmIj4KICAgICAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iODAiIHI9IjExIi8+CiAgICAgIDxjaXJjbGUgY3g9IjE0MCIgY3k9IjExMCIgcj0iMTEiLz4KICAgICAgPGNpcmNsZSBjeD0iOTAiIGN5PSIxMzUiIHI9IjExIi8+CiAgICAgIDxjaXJjbGUgY3g9IjE2NSIgY3k9IjcwIiByPSIxMSIvPgogICAgPC9nPgogICAgPGcgZmlsbD0iI2E3OGJmYSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiPgogICAgICA8cmVjdCB4PSIyNzgiIHk9IjE5OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICAgIDxyZWN0IHg9IjMxOCIgeT0iMTY4IiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz4KICAgICAgPHJlY3QgeD0iMjk4IiB5PSIyMjgiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPgogICAgICA8cmVjdCB4PSIzNDgiIHk9IjE5OCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICA8L2c+CiAgICA8dGV4dCB4PSIyMjAiIHk9IjMxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzE2YTM0YSI+5YqgIGIg5ZCO77yM5q2j56Gu5YiG5byA5Lik57G7PC90ZXh0PgogIDwvZz4KPC9zdmc+Cg==" alt="决策边界平移对比" />

*图 1：没有偏置，决策边界被钉死在原点，常常切不开两类点；加了 b，整条线能平移到合适位置正确分类——这是"为什么需要偏置"最直观的理由。*

## 核心公式

把偏置放进神经元公式：

$$z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b = \sum_{i=1}^{n} w_i x_i + b$$

$$y = f(z)$$

而神经元的**决策边界**（输出由"不激活"翻转为"激活"的那条分界）就是让 $z=0$：

$$\sum_{i=1}^{n} w_i x_i + b = 0$$

逐项解读：

- $x_i$：第 $i$ 个输入。
- $w_i$：第 $i$ 个权重（乘在第 $i$ 个输入上，调它的"重要程度"）。
- $b$：**偏置**——公式里唯一一个不乘输入、直接加上的数，作用是把 $z$ 整体平移。
- $n$：输入的总个数。
- $\sum_{i=1}^{n}$：求和符号，让 $i$ 从 1 取到 $n$，把所有"权重 × 输入"累加（等号中间那一长串的简写）。
- $z$：加权和（输入汇总后再加偏置的结果），也是后面要喂给激活函数的数。
- $f$：激活函数。
- $y$：神经元最终输出。

**偏置怎么参与训练**：偏置不是人手填死的，它和权重一样是训练时要"学"出来的。反向传播会算出损失 $L$ 对偏置的**梯度**（梯度就是"该往哪个方向调、调多少"的指引）。由链式法则：

$$\frac{\partial L}{\partial b} = \frac{\partial L}{\partial z} \cdot \frac{\partial z}{\partial b} = \frac{\partial L}{\partial z} \cdot 1 = \frac{\partial L}{\partial z}$$

补几个符号的意思：

- $L$：损失，用一个数衡量这次预测离正确答案有多远。
- $\partial$：偏导数符号，读"偏"——表示"只盯着某一个变量看变化率，其他变量当作常数"。
- $\dfrac{\partial L}{\partial b}$：损失对偏置的偏导，即"b 微调一点点，损失会变多少"。
- $\dfrac{\partial L}{\partial z}$：损失对加权和 $z$ 的偏导，即"z 微调一点点，损失会变多少"——也是这个公式最后算出来的结果。
- $\dfrac{\partial z}{\partial b}$：加和对偏置的偏导。因为 $z = \sum w_i x_i + b$，b 前面系数是 1，所以它恒等于 1。

因为 $\partial z / \partial b = 1$，偏置的梯度就等于损失对加权和 $z$ 的梯度。于是 $b$ 和权重一样，被优化器（SGD、Adam 等）一步步往下调，直到损失尽量小。

## 算一个小例子

固定输入和权重，只改偏置，看 $b$ 怎么左右神经元的激活。设 $x_1 = 2$，$x_2 = 3$，权重 $w_1 = 0.5$，$w_2 = -1$。

先算不加偏置的部分（这是"纯加权求和"，和 $b$ 无关）：

$$\sum w_i x_i = 0.5 \times 2 + (-1) \times 3 = 1 - 3 = -2$$

现在配上激活函数 ReLU（小于 0 一律归零），换不同的 $b$：

- $b = 0$（无偏置）：$z = -2 + 0 = -2$，$y = \max(0, -2) = 0$，神经元**沉默**。
- $b = 1$：$z = -2 + 1 = -1$，$y = \max(0, -1) = 0$，还是沉默。
- $b = 3$：$z = -2 + 3 = 1$，$y = \max(0, 1) = 1$——神经元**被激活**！

自检：三组算出来的 $z$ 分别是 $-2, -1, 1$，过 ReLU 后是 $0, 0, 1$，非负、方向合理（$b$ 越大 $z$ 越大、越容易过门槛），没问题。

看明白了吗？输入和权重都没变，**只是把偏置从 0 调到 3，这个神经元就从"永远沉默"变成了"会被激活"**——这就是偏置"调激活门槛"的直觉：它决定神经元有多容易被点亮。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvLXN0YXJ0LXJldmVyc2UiPgogICAgICA8cGF0aCBkPSJNMCAwIEwxMCA1IEwwIDEwIHoiIGZpbGw9IiNhNzhiZmEiLz4KICAgIDwvbWFya2VyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZjI5MzciPuWBj+e9riBiID0g5oqK5r+A5rS75Ye95pWw5pW05p2h5bem5Y+z5bmz56e7PC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPmIg5pS55Y+Y77yMUmVMVSDnmoQi5ouQ54K5Iu+8iOa/gOa0u+mXqOanm++8iei3n+edgOaMqu+8m+mXqOanm+WKqOS6hu+8jOWQjOS4gOS4qui+k+WFpeWPr+iDveS7juayiem7mOWPmOa/gOa0uzwvdGV4dD4KCiAgPCEtLSDlnZDmoIfovbQgLS0+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjI3MCIgeDI9IjEwODAiIHkyPSIyNzAiIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjYwMCIgeTE9IjEwMCIgeDI9IjYwMCIgeTI9IjMwMCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSIxMDYwIiB5PSIyODgiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPno8L3RleHQ+CiAgPHRleHQgeD0iNjA4IiB5PSIxMTAiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPnk8L3RleHQ+CgogIDwhLS0g572R5qC8IHk9MSDlj4LogIPnur8gLS0+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjE3MCIgeDI9IjEwODAiIHkyPSIxNzAiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNiIvPgogIDx0ZXh0IHg9IjExMCIgeT0iMTc2IiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWNhM2FmIj55PTE8L3RleHQ+CgogIDwhLS0gUmVMVSDljp/niYjvvIjmi5Dngrkgej0w77yM6Jma57q/54Gw77yJIC0tPgogIDxwYXRoIGQ9Ik0gMjAwIDI3MCBMIDYwMCAyNzAgTCA4MjAgMTUwIiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgNyIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDx0ZXh0IHg9IjgzNSIgeT0iMTQ2IiBmb250LXNpemU9IjE2IiBmaWxsPSIjOWNhM2FmIj5iPTDvvIjpl6jmp5vlnKggMO+8iTwvdGV4dD4KCiAgPCEtLSBSZUxVIOW5s+enu+WQju+8iOaLkOeCueW3puenu+WIsCB6PS1i77yM5a6e57q/57Sr77yJIC0tPgogIDxwYXRoIGQ9Ik0gMjAwIDI3MCBMIDQyMCAyNzAgTCA4MjAgOTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8dGV4dCB4PSI4MzUiIHk9Ijg2IiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iYm9sZCI+5Yqg5q2jIGLvvIjpl6jmp5vlt6bnp7vvvIzmm7TmmJPmv4DmtLvvvIk8L3RleHQ+CgogIDwhLS0g6Zeo5qeb5bmz56e75qCH5rOoIC0tPgogIDxsaW5lIHgxPSI0MjQiIHkxPSIyOTAiIHgyPSI1OTYiIHkyPSIyOTAiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIiBtYXJrZXItZW5kPSJ1cmwoI2FyKSIvPgogIDx0ZXh0IHg9IjUxMCIgeT0iMzEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTc4YmZhIj7pl6jmp5vooqsgYiDmjKrliqg8L3RleHQ+CgogIDwhLS0g5ouQ54K55qCH562+IC0tPgogIDx0ZXh0IHg9IjQxMiIgeT0iMjg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjYTc4YmZhIj4tYjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjI4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzljYTNhZiI+MDwvdGV4dD4KPC9zdmc+Cg==" alt="偏置平移激活门槛" />

*图 2：偏置把激活函数整条左右平移。b 变了，ReLU 的拐点（激活门槛）跟着挪；同一个加权和，门槛挪动后可能从沉默变激活。*

## PyTorch 里长什么样

在 PyTorch 里，一行 `nn.Linear` 就把"加权求和 + 偏置"打包好了，而且偏置默认是**开着的**：

```python
import torch.nn as nn

# 输入 3 个特征，输出 1 个值；bias=True 是默认值，可不写
layer = nn.Linear(in_features=3, out_features=1, bias=True)

# layer.weight 形状 [1, 3] —— 3 个权重
# layer.bias   形状 [1]    —— 1 个偏置
print(layer.bias)   # 看看初始化的 b
```

如果想做个"没有偏置"的对照（比如某些共享参数的设计），传 `bias=False` 即可，此时 `layer.bias` 是 `None`，神经元就退化成纯 $z = \sum w_i x_i$。

下面是一个能直接跑的完整示例，重点观察训练一步后**偏置和权重是怎么一起被更新的**。

## 完整代码

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

# 单神经元：Linear 负责 w·x + b，ReLU 是激活函数
class SingleNeuron(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.linear = nn.Linear(in_features, 1, bias=True)  # 加权求和 + 偏置

    def forward(self, x):
        z = self.linear(x)        # z = Σ wᵢxᵢ + b
        y = F.relu(z)             # 激活函数 f(z)
        return y

model = SingleNeuron(in_features=3)

# 训练前，看一眼初始的权重和偏置
print("初始偏置 b:", model.linear.bias.item())

# 假数据：1 个样本，3 个特征
x = torch.randn(1, 3)
target = torch.tensor([[1.0]])    # 假装正确输出是 1

# 训练一步
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

y = model(x)                      # 前向传播
loss = criterion(y, target)       # 算损失
loss.backward()                   # 反向传播：算出每个 w 和 b 该往哪调
print("偏置的梯度:", model.linear.bias.grad.item())  # 就是 ∂L/∂z
optimizer.step()                  # 更新 w 和 b

print("训练一步后的偏置 b:", model.linear.bias.item())
```

跑完你会看到：`bias.grad` 有值（正是上面推导的 $\partial L / \partial z$），`optimizer.step()` 之后 `bias.item()` 变了——偏置和权重一样，被优化器悄悄更新了一步。这就是偏置在"学习"。

## 小结

偏置是神经元里那个**只做加法、不碰输入的可学习常数** $b$。它的全部作用就一个字：**挪**——把激活函数、把决策边界整体平移，好让神经元既能在"没有明显输入"时有自己的倾向，也能把数据正确切开。回到开头的评审团：那个先扣或先垫一分的主席，其实就是 $b$。它和权重并列为训练时要学的参数，常被合记作 $(W, b)$。下一篇我们会看前向传播，看数据和这一整套 $w$、$b$ 怎么从输入层一路算到输出。

## 参考资料

1. 动手学深度学习 - 4.1 多层感知机（李沐等）
   https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html
2. Why We Need Bias in Neural Networks - Towards Data Science
   https://towardsdatascience.com/why-we-need-bias-in-neural-networks-db8f7e07cb98/
3. Role of bias in neural networks - GeeksforGeeks
   https://www.geeksforgeeks.org/machine-learning/what-is-the-role-of-the-bias-in-neural-networks/
