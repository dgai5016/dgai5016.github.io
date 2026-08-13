---
title: 反向传播（Backpropagation）
date: 2026-08-12 01:10
tags: [AI]
excerpt: "反向传播是神经网络训练时用来「算出每个参数该怎么调」的核心算法。它把网络最终的预测误差，从输出层一层层往回传，告诉路上每一个参数：你对这个误差该负多少责任、下次该往哪个方向调。"
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93YmFjayIgbWFya2VyV2lkdGg9IjEyIiBtYXJrZXJIZWlnaHQ9IjEyIiByZWZYPSI5IiByZWZZPSI2IiBvcmllbnQ9ImF1dG8iPgogICAgICA8cGF0aCBkPSJNOSwwIEwwLDYgTDksMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDliY3lkJHov57nur/vvJrovpPlhaXliJcgLT4g6ZqQ6JeP5YiXIC0+IOi+k+WHuuWIl++8iOa3oeiJsu+8iSAtLT4KICA8ZyBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zKSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyMTAiIHgyPSI1NzAiIHkyPSIxNzAiLz4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyMTAiIHgyPSI1NzAiIHkyPSIyNTAiLz4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyMTAiIHgyPSI1NzAiIHkyPSIzMzAiLz4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyOTAiIHgyPSI1NzAiIHkyPSIxNzAiLz4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyOTAiIHgyPSI1NzAiIHkyPSIyNTAiLz4KICAgIDxsaW5lIHgxPSIyNzAiIHkxPSIyOTAiIHgyPSI1NzAiIHkyPSIzMzAiLz4KICAgIDxsaW5lIHgxPSI2MzAiIHkxPSIxNzAiIHgyPSI5MzAiIHkyPSIyNTAiLz4KICAgIDxsaW5lIHgxPSI2MzAiIHkxPSIyNTAiIHgyPSI5MzAiIHkyPSIyNTAiLz4KICAgIDxsaW5lIHgxPSI2MzAiIHkxPSIzMzAiIHgyPSI5MzAiIHkyPSIyNTAiLz4KICA8L2c+CgogIDwhLS0g6IqC54K577ya6L6T5YWl5bGCKDIpIOmakOiXj+WxgigzKSDovpPlh7rlsYIoMSkgLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSI+CiAgICA8Y2lyY2xlIGN4PSIyNzAiIGN5PSIyMTAiIHI9IjIyIi8+CiAgICA8Y2lyY2xlIGN4PSIyNzAiIGN5PSIyOTAiIHI9IjIyIi8+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIxNzAiIHI9IjIyIi8+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIyNTAiIHI9IjIyIi8+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIzMzAiIHI9IjIyIi8+CiAgICA8Y2lyY2xlIGN4PSI5MzAiIGN5PSIyNTAiIHI9IjI2Ii8+CiAgPC9nPgoKICA8IS0tIOWPjeWQkeS8oOaSreeureWktO+8muS7juWPs+W+gOW3pueahOS6ruiJsuW8p+e6v++8jOihqOekuuivr+W3ruWbnua1gSAtLT4KICA8ZyBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiIG1hcmtlci1lbmQ9InVybCgjYXJyb3diYWNrKSI+CiAgICA8cGF0aCBkPSJNIDkwMCAzMTAgUSA3NTAgNDAwIDYyMCAzNzAiLz4KICAgIDxwYXRoIGQ9Ik0gNTcwIDM3MCBRIDQyMCA0MDAgMjgwIDM1MCIvPgogIDwvZz4KCiAgPCEtLSDmpoLlv7XlkI0gLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI0ODAiIGZvbnQtc2l6ZT0iOTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIKICAgICAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5Y+N5ZCR5Lyg5pKtPC90ZXh0PgoKICA8IS0tIOWJr+agh+ivhiAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjU0NSIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="反向传播封面" />

反向传播是神经网络训练时用来「算出每个参数该怎么调」的核心算法。它把网络最终的预测误差，从输出层一层层往回传，告诉路上每一个参数：你对这个误差该负多少责任、下次该往哪个方向调。

## 流水线返工：一个贯穿全文的类比

想象一条流水线：原料先过加工站 A，半成品再到 B，再到 C，最后出成品。质检员发现成品不达标（误差），这份「不达标」的信息会从最后一站往回传——

- 先告诉 C 站「你的输出偏了多少」，C 据此知道自己该怎么调；
- 同时 C 算出「那 B 交给我的料子也有问题」，把这条消息往回递给 B；
- B 再照样追溯给 A……

每个站收到的「调整指令」，就是梯度（gradient，一个表示「该往哪个方向调、调多少」的数）。神经网络就是这条流水线，反向传播就是「误差从后往前、逐站分摊责任」的过程。

## 它在 AI 体系中的位置

反向传播属于深度学习训练的「中枢」环节。一次完整的训练由四步循环组成，反向传播负责其中关键的第三步：

1. **前向传播**（forward）：数据从前往后走，得出网络的预测。
2. **算损失**（loss）：拿预测值和真实答案比对，得出误差有多大——这正是损失函数干的事。
3. **反向传播**（backward）：误差从后往前传，算出每个参数的梯度。
4. **更新参数**：用梯度下降，按梯度方向把每个参数调一点，让下一次更准。

四步不断循环，网络就一点点「学」会了任务。可以说，没有反向传播高效地算出梯度，训练多层网络几乎寸步难行。

## 核心数学：链式法则

反向传播的数学基础就是微积分里的链式法则（chain rule）。神经网络的本质是一个层层嵌套的复合函数：输入经过第一层得到中间结果，再喂进第二层，再喂进第三层……最后算出损失。链式法则告诉我们怎么对这种「函数套函数」的结构求导。

以最简单的一段为例——输入 $x$ 经过一个权重 $w$ 算出 $z = wx$，再过一个激活函数得到 $a = \sigma(z)$，最后和真实值 $y$ 比较得到损失 $L$。要求「$w$ 该负多少责任」，就把这三个环节的导数乘起来：

$$\frac{\partial L}{\partial w} = \underbrace{\frac{\partial L}{\partial a}}_{\text{输出端误差}} \cdot \underbrace{\frac{\partial a}{\partial z}}_{\text{激活函数的传导}} \cdot \underbrace{\frac{\partial z}{\partial w}}_{\text{权重的影响}}$$

**符号逐项解读**：

- $\partial$ —— 偏导数符号，读作"partial"，$\partial L/\partial w$ 整个读作"$L$ 对 $w$ 的偏导数"，表示 $w$ 动一点时 $L$ 跟着变多少，即梯度
- $\frac{\partial L}{\partial w}$ —— 损失 $L$ 对权重 $w$ 的梯度，也就是「$w$ 该往哪调、调多少才能减小误差」。这是反向传播最终想算出来的东西。
- $\frac{\partial L}{\partial a}$ —— 误差信号从输出端出发的初始值（损失对网络输出的敏感度）。
- $\sigma$ —— 激活函数的记号，本文里就是 sigmoid，把 $z$ 压到 0~1
- $\sigma'(z)$ —— 上标撇号 $'$ 是求导记号，$\sigma'(z)$ 表示激活函数 $\sigma$ 对 $z$ 的导数
- $\frac{\partial a}{\partial z}$ —— 信号经过激活函数这一关时，被放大或缩小了多少。
- $\frac{\partial z}{\partial w}$ —— 权重 $w$ 对中间值 $z$ 的影响（在这个例子里它就等于输入 $x$）。

**通俗理解**：每个参数的「责任」= 输出端的误差 × 信号往回传时每一关的「传导系数」连乘。回到流水线类比——C 站的调整力度，等于「最终成品的偏差」乘上「B 到 C 之间信号衰减」再乘上「A 到 B 之间信号衰减」。这正是「反向传播」名字的由来：信号是反向流动的。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7pk77lvI/ms5XliJnvvJror6/lt67lvoDlm57kvKDml7bvvIzmr4/ov4fkuIDlhbPkuZjkuIDkuKrjgIzkvKDlr7zns7vmlbDjgI08L3RleHQ+CgogIDwhLS0g5LiJ5Liq5YWz5Y2h5pa55qGG77yM5LuO5Y+z5Yiw5bemIC0tPgogIDwhLS0g6L6T5Ye656uv6K+v5beuIC0tPgogIDxyZWN0IHg9IjkwMCIgeT0iMTUwIiB3aWR0aD0iMjMwIiBoZWlnaHQ9IjExMCIgcng9IjEyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjEwMTUiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+6L6T5Ye656uv6K+v5beuPC90ZXh0PgogIDx0ZXh0IHg9IjEwMTUiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPuKIgkwv4oiCYTwvdGV4dD4KICA8dGV4dCB4PSIxMDE1IiB5PSIyNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM5Y2EzYWYiPuivr+W3rui1t+eCuTwvdGV4dD4KCiAgPCEtLSDmv4DmtLvlh73mlbDkvKDlr7wgLS0+CiAgPHJlY3QgeD0iNDg1IiB5PSIxNTAiIHdpZHRoPSIyMzAiIGhlaWdodD0iMTEwIiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPua/gOa0u+WHveaVsOeahOS8oOWvvDwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPuKIgmEv4oiCejwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzljYTNhZiI+5L+h5Y+36KKr5pS+5aSn5oiW57yp5bCPPC90ZXh0PgoKICA8IS0tIOadg+mHjeW9seWTjSAtLT4KICA8cmVjdCB4PSI3MCIgeT0iMTUwIiB3aWR0aD0iMjMwIiBoZWlnaHQ9IjExMCIgcng9IjEyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjE4NSIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmI3MjgwIj7mnYPph43nmoTlvbHlk408L3RleHQ+CiAgPHRleHQgeD0iMTg1IiB5PSIyMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7iiIJ6L+KIgnc8L3RleHQ+CiAgPHRleHQgeD0iMTg1IiB5PSIyNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM5Y2EzYWYiPuadg+mHjeeahOi0o+S7uzwvdGV4dD4KCiAgPCEtLSDlj43lkJHnrq3lpLTvvIjku47lj7PlvoDlt6bvvIkgLS0+CiAgPGxpbmUgeDE9Ijg5NSIgeTE9IjIwNSIgeDI9IjcyNSIgeTI9IjIwNSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjcxNSwyMDUgNzMwLDE5NiA3MzAsMjE0IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iODEwIiB5PSIxOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7DlzwvdGV4dD4KCiAgPGxpbmUgeDE9IjQ4MCIgeTE9IjIwNSIgeDI9IjMxMCIgeTI9IjIwNSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjMwMCwyMDUgMzE1LDE5NiAzMTUsMjE0IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMzk1IiB5PSIxOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7DlzwvdGV4dD4KCiAgPCEtLSDlupXpg6jnu5PorrogLS0+CiAgPHJlY3QgeD0iNzAiIHk9IjMwMCIgd2lkdGg9IjEwNjAiIGhlaWdodD0iNTYiIHJ4PSIxMCIgZmlsbD0iI2VlZjJmZiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjMzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyI+5LiJ6ICF55u45LmYID0g5p2D6YeNIHcg55qE5qKv5bqmIOKIgkwv4oiCd++8iHcg6K+l5b6A5ZOq6LCD44CB6LCD5aSa5bCR77yJPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMTIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIj7or6/lt67kv6Hlj7flj43lkJHmtYHliqjmlrnlkJEg4oaSPC90ZXh0Pgo8L3N2Zz4K" alt="链式法则三因子相乘" />

*图 1：权重的梯度 = 输出端误差 × 激活函数传导 × 权重影响，三个因子从右往左连乘。*

## 算一个小例子

设 $w = 0.5$，$x = 2$，激活函数用 sigmoid，真实值 $y = 1$：

- $z = wx = 0.5 \times 2 = 1.0$
- $a = \sigma(z) = \frac{1}{1+e^{-1}} \approx 0.731$
- $L = \frac{1}{2}(a - y)^2 = \frac{1}{2}(0.731 - 1)^2 \approx 0.0362$

（式中的 $e$ 是自然对数的底，约等于 2.718，是一个数学常数。）

现在用链式法则往回算 $\frac{\partial L}{\partial w}$：

| 步骤 | 计算 | 结果 |
|---|---|---|
| 输出端误差 $\frac{\partial L}{\partial a}$ | $a - y$ | $0.731 - 1 = -0.269$ |
| 激活函数传导 $\frac{\partial a}{\partial z}$ | $\sigma'(z) = a(1-a)$ | $0.731 \times 0.269 \approx 0.197$ |
| 权重影响 $\frac{\partial z}{\partial w}$ | $x$ | $2$ |
| 三者相乘得 $\frac{\partial L}{\partial w}$ | $-0.269 \times 0.197 \times 2$ | $\approx -0.106$ |

**自检**：梯度为负，说明稍微增大 $w$ 就能让损失变小——这合理吗？目标 $y=1$，而当前预测 $a=0.731$ 偏小，增大 $w$ 会让 $z$ 变大、$a$ 更接近 1、损失下降。方向正确。做梯度下降时 $w_{\text{新}} = w - \text{lr} \times (-0.106)$，会把 $w$ 往大调，正是我们要的。

**符号解读：**

- $\text{lr}$ —— 学习率，每次调权重的步伐大小
- $w_{\text{新}}$ —— 更新后的新权重

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7lsI/kvovlrZDvvJrmoq/luqbmmK/mgI7kuYjkuIDmraXmraXkuZjlh7rmnaXnmoQ8L3RleHQ+CgogIDwhLS0g5Zub5Liq5q2l6aqk5pa55qGG77yM5qiq5ZCR5o6S5byA77yM55SoIMOXIOi/nuaOpSAtLT4KICA8IS0tIOatpemqpDEgLS0+CiAgPHJlY3QgeD0iNDAiIHk9IjE1MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSIxNjAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+6L6T5Ye656uv6K+v5beuPC90ZXh0PgogIDx0ZXh0IHg9IjE2MCIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3Ij7iiIJML+KIgmEgPSBhIOKIkiB5PC90ZXh0PgogIDx0ZXh0IHg9IjE2MCIgeT0iMjQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+4oiSMC4yNjk8L3RleHQ+CgogIDx0ZXh0IHg9IjMwMCIgeT0iMjE1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+w5c8L3RleHQ+CgogIDwhLS0g5q2l6aqkMiAtLT4KICA8cmVjdCB4PSIzMjUiIHk9IjE1MCIgd2lkdGg9IjI0MCIgaGVpZ2h0PSIxMzAiIHJ4PSIxMiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI0NDUiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+5r+A5rS75Ye95pWw5Lyg5a+8PC90ZXh0PgogIDx0ZXh0IHg9IjQ0NSIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3Ij7iiIJhL+KIgnogPSBhKDHiiJJhKTwvdGV4dD4KICA8dGV4dCB4PSI0NDUiIHk9IjI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPjAuMTk3PC90ZXh0PgoKICA8dGV4dCB4PSI1ODUiIHk9IjIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPsOXPC90ZXh0PgoKICA8IS0tIOatpemqpDMgLS0+CiAgPHJlY3QgeD0iNjEwIiB5PSIxNTAiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTMwIiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNzMwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPuadg+mHjeW9seWTjTwvdGV4dD4KICA8dGV4dCB4PSI3MzAiIHk9IjIwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzFmMjkzNyI+4oiCei/iiIJ3ID0geDwvdGV4dD4KICA8dGV4dCB4PSI3MzAiIHk9IjI0NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPjI8L3RleHQ+CgogIDx0ZXh0IHg9Ijg3MCIgeT0iMjE1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+PTwvdGV4dD4KCiAgPCEtLSDnu5PmnpwgLS0+CiAgPHJlY3QgeD0iODk1IiB5PSIxNTAiIHdpZHRoPSIyNzAiIGhlaWdodD0iMTMwIiByeD0iMTIiIGZpbGw9IiNlZWYyZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPHRleHQgeD0iMTAzMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmI3MjgwIj7mnYPph43nmoTmoq/luqY8L3RleHQ+CiAgPHRleHQgeD0iMTAzMCIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3Ij7iiIJML+KIgnc8L3RleHQ+CiAgPHRleHQgeD0iMTAzMCIgeT0iMjQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+4oiSMC4xMDY8L3RleHQ+CgogIDwhLS0g5bqV5rOo77ya5pa55ZCR6Kej6K+7IC0tPgogIDxyZWN0IHg9IjQwIiB5PSIzMDAiIHdpZHRoPSIxMTIwIiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjMyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzFmMjkzNyI+5qKv5bqm5Li66LSfIOKGkiDlop7lpKcgdyDkvJrorqnmjZ/lpLHkuIvpmY0g4oaSIOair+W6puS4i+mZjeaKiiB3IOW+gOWkp+iwg++8jOmihOa1i+abtOaOpei/keebruaghyB5PTE8L3RleHQ+Cjwvc3ZnPgo=" alt="梯度逐步乘出来" />

*图 2：把小例子的三个数 −0.269、0.197、2 连乘，得到权重梯度 −0.106。*

## 为什么它这么重要

在反向传播被广泛使用之前，训练多层神经网络极其困难——人们不知道怎么高效地算出成千上万个参数各自的梯度。反向传播（本质上是反向模式的自动微分）把这个计算组织成一次从后往前的扫掠，效率极高：网络再深，算梯度也只需走一遍。

正是有了它，深度学习才从「理论可行」变成「实际可训」，今天的大模型才训练得动。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7lj43lkJHkvKDmkq3nmoTpq5jmlYjkuYvlpITvvJrkuIDmrKHlj43lkJHmiavmjqDvvIznrpflh7rlhajpg6jmoq/luqY8L3RleHQ+CgogIDwhLS0g6IqC54K55YiX77yaeCDihpIg5bGCMSDihpIg5bGCMiDihpIg5bGCMyDihpIgTCAtLT4KICA8Zz4KICAgIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjIwMCIgcj0iMjYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8dGV4dCB4PSIxMjAiIHk9IjIwNyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyI+eDwvdGV4dD4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjE2MCIgcj0iMjYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSIzODAiIGN5PSIyNDAiIHI9IjI2IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iNjIwIiBjeT0iMTYwIiByPSIyNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxjaXJjbGUgY3g9IjYyMCIgY3k9IjI0MCIgcj0iMjYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8Y2lyY2xlIGN4PSI4NjAiIGN5PSIyMDAiIHI9IjI2IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPGNpcmNsZSBjeD0iMTA4MCIgY3k9IjIwMCIgcj0iMjgiIGZpbGw9IiM2YzYzZmYiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8dGV4dCB4PSIxMDgwIiB5PSIyMDciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmZmZmYiPkw8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOWJjeWQkei/nue6v++8iOa3oe+8iSAtLT4KICA8ZyBzdHJva2U9IiNkMWQ1ZGIiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSI+CiAgICA8bGluZSB4MT0iMTQ2IiB5MT0iMTk1IiB4Mj0iMzU0IiB5Mj0iMTYyIi8+CiAgICA8bGluZSB4MT0iMTQ2IiB5MT0iMjA1IiB4Mj0iMzU0IiB5Mj0iMjM4Ii8+CiAgICA8bGluZSB4MT0iNDA2IiB5MT0iMTYwIiB4Mj0iNTk0IiB5Mj0iMTYwIi8+CiAgICA8bGluZSB4MT0iNDA2IiB5MT0iMjQwIiB4Mj0iNTk0IiB5Mj0iMjQwIi8+CiAgICA8bGluZSB4MT0iNDA2IiB5MT0iMTcwIiB4Mj0iNTk0IiB5Mj0iMjMyIi8+CiAgICA8bGluZSB4MT0iNjQ2IiB5MT0iMTcwIiB4Mj0iODM0IiB5Mj0iMTk4Ii8+CiAgICA8bGluZSB4MT0iNjQ2IiB5MT0iMjMyIiB4Mj0iODM0IiB5Mj0iMjAyIi8+CiAgICA8bGluZSB4MT0iODg2IiB5MT0iMjAwIiB4Mj0iMTA1MiIgeTI9IjIwMCIvPgogIDwvZz4KCiAgPCEtLSDlj43lkJHmiavmjqDnspfnrq3lpLTvvIjku44gTCDlkJHlt6bmiavvvIkgLS0+CiAgPHBhdGggZD0iTSAxMDUwIDIwMCBRIDcwMCAxMTAgMTUwIDIwMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz4KICA8cG9seWdvbiBwb2ludHM9IjE1MCwyMDAgMTY2LDE5MCAxNjYsMjEyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7kuIDmrKHlj43lkJHmiavmjqA8L3RleHQ+CgogIDwhLS0g5qKv5bqm5pS26I635qCH6K6wIC0tPgogIDxnIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YzYzZmYiPgogICAgPHRleHQgeD0iODYwIiB5PSIyNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuKIgkwv4oiCV+KCgyDinJM8L3RleHQ+CiAgICA8dGV4dCB4PSI2MjAiIHk9IjMwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4oiCTC/iiIJX4oKCIOKckzwvdGV4dD4KICAgIDx0ZXh0IHg9IjM4MCIgeT0iMzIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7iiIJML+KIglfigoEg4pyTPC90ZXh0PgogIDwvZz4KCiAgPCEtLSDlupXms6ggLS0+CiAgPHJlY3QgeD0iNjAiIHk9IjM0NSIgd2lkdGg9IjEwODAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSIjZWVmMmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzczIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3Ij7nvZHnu5zlho3mt7HvvIznrpfmoq/luqbkuZ/lj6rpnIDku47lkI7lvoDliY3otbDkuIDpgY3igJTigJTov5nmraPmmK/mt7HluqblrabkuaDjgIzlrp7pmYXlj6/orq3jgI3nmoTlhbPplK48L3RleHQ+Cjwvc3ZnPgo=" alt="反向扫掠一次算出全部梯度" />

*图 3：反向传播只需从输出往输入扫一遍，沿途顺手收集每一层权重的梯度。*

## 完整代码

下面用 PyTorch 写一个能真学会任务的小网络。整体流程是「造大脑 → 备数据 → 反复练习（前向 → 算误差 → 反向 → 更新）→ 考试」——训练循环里每一步的顺序不能乱：先看预测准不准（前向 + 损失），再回头分摊责任（反向传播），最后才动参数（更新）。

```python
import torch
import torch.nn as nn  # nn = neural network，PyTorch 搭神经网络用的工具箱

# ===== 任务：教神经网络学会「复习时长 → 考试分数」=====
# 准备 4 组有真实含义的数据（小时数 → 分数），趋势是学得越久分越高
hours = torch.tensor([[1.0], [2.0], [3.0], [4.0]])        # torch.tensor：把数据变成 PyTorch 的多维数组（张量）
scores = torch.tensor([[52.0], [65.0], [78.0], [91.0]])   # 目标分数

# ===== 定义两层小网络：信号要穿过两层，「反向」才有链条可言 =====
class ScoreNet(nn.Module):              # nn.Module：所有神经网络模块的基类，继承它 PyTorch 才能帮你管理参数
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(1, 8)   # 第一层：1 个输入 → 8 个中间值（nn.Linear = 全连接层）
        self.act = nn.ReLU()            # 激活函数：把负数压成 0，给网络「非线性」能力
        self.layer2 = nn.Linear(8, 1)   # 第二层：8 个中间值 → 1 个输出（预测分数）
    def forward(self, x):              # forward：定义数据「从前往后」怎么走，即前向传播
        out = self.layer1(x)           # 先过第一层
        out = self.act(out)            # 再过激活函数
        out = self.layer2(out)         # 再过第二层，得到预测分数
        return out

torch.manual_seed(42)                  # 固定随机数种子，保证每次运行结果可复现
net = ScoreNet()
loss_fn = nn.MSELoss()                 # 均方误差：衡量预测分数和真实分数差多少（损失函数）
opt = torch.optim.Adam(net.parameters(), lr=0.1)  # Adam 优化器：自适应学习率，比普通梯度下降收敛更快更稳，lr 是学习率（每次调整的步伐大小）

# ===== 训练循环：反复「前向 → 算误差 → 反向传播 → 更新参数」=====
for epoch in range(500):               # 把 4 组数据反复看 500 遍
    pred = net(hours)                  # ① 前向传播：输入复习时长，得到预测分数
    loss = loss_fn(pred, scores)       # ② 算损失：预测分数离真实分数有多远
    opt.zero_grad()                    # ③ 清空上一轮残留的梯度（不清空会累加，方向就算错）
    loss.backward()                    # ④ 反向传播！自动用链式法则，从损失往回算出每个参数的梯度
    opt.step()                         # ⑤ 梯度下降：按梯度把每个参数往「让损失更小」的方向调一点

# ===== 考试：网络学会了吗？预测「复习 5 小时」能考多少分 =====
test_hour = torch.tensor([[5.0]])
print(f"复习 5 小时，网络预测能考：{net(test_hour).item():.1f} 分")
print(f"训练损失：{loss.item():.4f}（越小越准）")
```

运行后会看到网络预测「复习 5 小时」能考约 104 分——它真的从 4 组数据里学到了「每小时约涨 13 分」的趋势（52 → 65 → 78 → 91 → 104，正好接上）。其中 `loss.backward()` 这一行，就是反向传播在代码里的化身：框架自动用链式法则，把穿过两层的梯度一口气算好，你完全不用手写求导。

## 小结

前向传播让数据从前往后走出一个预测，反向传播则让误差从后往前传回去，算清每个参数该怎么调。一个是「往前走」，一个是「往回传」，两者一去一回，神经网络才真正「学」起来。

## 参考资料

1. Backpropagation calculus — 3Blue1Brown（深度学习系列第 4 章，最直观的反向传播可视化讲解）
   https://www.3blue1brown.com/lessons/backpropagation-calculus
2. Neural Networks: Backpropagation — CS231n（斯坦福深度学习课程笔记，含计算图与梯度推导）
   https://cs231n.github.io/optimization-2/
3. 反向传播算法 — 维基百科
   https://zh.wikipedia.org/zh-cn/反向传播算法
