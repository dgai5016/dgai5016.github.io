---
title: LSTM 是什么
date: 2026-08-11 17:52
tags: [AI]
excerpt: LSTM（长短期记忆网络）通过「门控」机制和一条专门的细胞状态通道，让网络能记住几百步之前的关键信息，解决普通 RNN 记不住远距离依赖的老毛病。本文配上四个核心门控公式的三件套解读，再用一个完整的时间步计算示例带你算懂它怎么决定该记什么、该忘什么，最后附上可直接运行的 PyTorch 代码。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIHJlZlg9IjgiIHJlZlk9IjMiIG9yaWVudD0iYXV0byIgbWFya2VyVW5pdHM9InN0cm9rZVdpZHRoIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMCw2IEw4LDMgeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8dGV4dCB4PSIxMjAiIHk9IjEzMCIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zdHlsZT0iaXRhbGljIj7nu4bog57nirbmgIEgQ++8iOiusOW/huS8oOmAgeW4pu+8iTwvdGV4dD4KICA8bGluZSB4MT0iMTQwIiB5MT0iMTYwIiB4Mj0iMTA2MCIgeTI9IjE2MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2Utd2lkdGg9IjciIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgPGNpcmNsZSBjeD0iMzIwIiBjeT0iMTYwIiByPSI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNikiLz4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIxNjAiIHI9IjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSIvPgogIDxjaXJjbGUgY3g9Ijg4MCIgY3k9IjE2MCIgcj0iNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIi8+CgogIDxyZWN0IHg9IjI2NSIgeT0iMjE1IiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjE3MCIgcng9IjE0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTApIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSIzMjAiIHk9IjQwNSIgZm9udC1zaXplPSIxNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+dC0xPC90ZXh0PgoKICA8cmVjdCB4PSI1NDUiIHk9IjIxNSIgd2lkdGg9IjExMCIgaGVpZ2h0PSIxNzAiIHJ4PSIxNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE2KSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNjAwIiB5PSI0MDUiIGZvbnQtc2l6ZT0iMTciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj50PC90ZXh0PgoKICA8cmVjdCB4PSI4MjUiIHk9IjIxNSIgd2lkdGg9IjExMCIgaGVpZ2h0PSIxNzAiIHJ4PSIxNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEwKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iODgwIiB5PSI0MDUiIGZvbnQtc2l6ZT0iMTciIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPnQrMTwvdGV4dD4KCiAgPHRleHQgeD0iNTc1IiB5PSIyMzUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7pgZflv5jpl6g8L3RleHQ+CiAgPHRleHQgeD0iNjI1IiB5PSIyMzUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7ovpPlhaXpl6g8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNTc1IiBjeT0iMjYyIiByPSIxOSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIvPgogIDx0ZXh0IHg9IjU3NSIgeT0iMjcwIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmY8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNjI1IiBjeT0iMjYyIiByPSIxOSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIvPgogIDx0ZXh0IHg9IjYyNSIgeT0iMjcwIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iYm9sZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmk8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iMzIwIiBmb250LXNpemU9IjEyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5YCZ6YCJPC90ZXh0PgogIDxyZWN0IHg9IjU4NSIgeT0iMzI3IiB3aWR0aD0iMzAiIGhlaWdodD0iMjIiIHJ4PSI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIzNDQiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YzYzZmYiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+Q348L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iMzcyIiBmb250LXNpemU9IjEyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+6L6T5Ye66ZeoIG88L3RleHQ+CgogIDxsaW5lIHgxPSIzNzUiIHkxPSIzMDAiIHgyPSI1NDAiIHkyPSIzMDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjY1KSIgc3Ryb2tlLXdpZHRoPSIyLjUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgPGxpbmUgeDE9IjY2MCIgeTE9IjMwMCIgeDI9IjgyMCIgeTI9IjMwMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNjUpIiBzdHJva2Utd2lkdGg9IjIuNSIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8dGV4dCB4PSI0NTAiIHk9IjI5MCIgZm9udC1zaXplPSIxMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+aDwvdGV4dD4KICA8dGV4dCB4PSI3NDAiIHk9IjI5MCIgZm9udC1zaXplPSIxMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+aDwvdGV4dD4KCiAgPGxpbmUgeDE9IjYwMCIgeTE9IjE2NyIgeDI9IjYwMCIgeTI9IjIxNSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNTUpIiBzdHJva2Utd2lkdGg9IjIiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1MDAiIGZvbnQtc2l6ZT0iOTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkxTVE08L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1NDgiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7plb/nn63mnJ/orrDlv4bnvZHnu5w8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1OTIiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="LSTM封面" />

**LSTM（Long Short-Term Memory，长短期记忆网络）** 是一种特殊的循环神经网络（RNN），它靠一套「门控」机制和一条专门的记忆通道，让网络能记住几百步之前的关键信息，从而治好了普通 RNN「记不住远距离依赖」的老毛病。

打个比方：普通 RNN 像一个只用短期记忆读长文的人——读到句尾，开头说了啥已经模糊了，越往后前面的信息衰减得越厉害，直到彻底忘掉。LSTM 则像一个会做笔记的人：它随身带一本**笔记本**（LSTM 里叫「细胞状态」），重要的内容随时抄进去，过时的内容划掉，需要用时再翻出来——记什么、忘什么、什么时候用，全由三道**关卡（门）**把关。

从体系上看，LSTM 属于深度学习 → 循环神经网络（RNN 家族）的进阶成员，由 Sepp Hochreiter 和 Jürgen Schmidhuber 在 1997 年提出。它是普通 RNN 的直接升级，也是 2010 年代深度学习在语音识别、机器翻译等领域大放异彩的关键功臣之一。

## 它解决了什么问题：梯度消失与长程依赖

要理解 LSTM 为什么这么设计，先得知道普通 RNN 出了什么问题。

RNN 在处理序列（一句话、一段音频）时，靠「隐藏状态」一步步往后传信息。问题是：每传一步，信息就要乘一次权重，梯度（指导学习的信号）在反向传播时要连乘很多次。如果权重大多小于 1，连乘几十步后梯度就**指数级衰减到接近 0**——这就是「梯度消失」。结果网络想学「第 1 个词和第 50 个词的关系」，却根本收不到来自第 50 步的有效信号。

LSTM 的解法很巧妙：它**不靠隐藏状态传长期记忆**，而是单独开了一条「细胞状态」通道，信息在这条通道上几乎是直通车的流动（只有加法和少量逐位乘法），梯度能畅通无阻地倒着流回去——于是几百步前的信号也不会消失。

## 先认得几个词

| 术语 | 大白话 |
|------|--------|
| **序列** | 按顺序排成一串的数据，比如一句话的各个词、一段音频的各帧。LSTM 就是为序列设计的。 |
| **时间步（time step）** | 序列里的「第几步」。处理一句话时，每读一个词就是走一个时间步，记作 t。 |
| **细胞状态 C** | LSTM 的「长期记忆本」，一条贯穿所有时间步的通道。**cell** 原意就是「格子」——你可以把它想成一排贯通的储物格，内容物一路往前流。 |
| **隐藏状态 h** | LSTM 此刻「对外说出口」的记忆，既要传给下一步，也要用来算输出。 |
| **门（gate）** | 一个 0 到 1 之间的开关（用 sigmoid 算出来），1 = 全开（全放行），0 = 全关（全拦下）。 |

## 三个门怎么协作

LSTM 每走一个时间步，都要依次做 6 件事，分成 4 组讲。先约定符号：

- `x_t`：当前输入
- `h_{t-1}`：上一步的隐藏状态
- `C_{t-1}`：上一步的细胞状态
- `σ`：sigmoid 函数
- `·`：矩阵乘法
- `⊙`：逐位相乘（Hadamard 积）

### 第一组：遗忘门——决定忘什么

**公式：** `f_t = σ(W_f · [h_{t-1}, x_t] + b_f)`

**符号解读：**

- `W_f`、`b_f`：遗忘门自己要学的参数
- `[h_{t-1}, x_t]`：把上一步隐藏状态和当前输入拼起来
- 整个式子过一道 sigmoid：输出一个 0~1 的向量 `f_t`

**通俗理解：** 遗忘门看一眼「上一步记着的 + 这步新来的」，给细胞状态里的**每一格**打分——接近 0 的就擦掉（过时了），接近 1 的就保留（还有用）。就像整理笔记时先决定「哪些旧内容该划掉」。

```python
# 遗忘门：sigmoid 把值压到 0~1，决定每个记忆位保留多少
f = torch.sigmoid(f_raw)  # 对应公式 (1)
```

### 第二组：输入门 + 候选值——决定记什么

**输入门公式：** `i_t = σ(W_i · [h_{t-1}, x_t] + b_i)`

**候选值公式：** `C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)`

**符号解读：** `i_t` 同样是 0~1 的开关（决定要写哪几格）；`C̃_t` 是过 tanh 后落在 -1~1 的「候选新内容」，表示「这步我想往笔记里写点啥」。

**通俗理解：** 输入门决定「**写到哪些格子**」，候选值决定「**写什么内容**」——两个一配合，就是「往笔记本上添加新条目」。tanh 之所以用 -1~1（而不是 sigmoid 的 0~1），是因为记忆既可能是「该做某事」也可能是「该避免某事」，需要正负两个方向。

工程上有个关键技巧：这四个量（f / i / C̃ / o）的计算式**结构完全一样**，只是参数不同，所以 PyTorch 里通常**用一个 `nn.Linear` 一次性算出四份，再用 `.chunk(4)` 切开**——比写四个独立的 Linear 又快又省内存，这也是业界标准写法：

```python
# 四个门一次算完，再 chunk 切成 4 段（PyTorch 工程惯例，而非写四个独立 Linear）
f_raw, i_raw, C_tilde_raw, o_raw = self.gates(combined).chunk(4, dim=-1)
```

### 第三组：细胞状态更新——一道式子把「忘旧 + 记新」同时完成

**公式：** `C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t`

**符号解读：**

- `⊙`：逐位相乘（对应位置相乘）
- `f_t ⊙ C_{t-1}`：把旧记忆按遗忘门的比例缩水
- `i_t ⊙ C̃_t`：把新内容按输入门的比例写入
- 两者相加 = 更新后的细胞状态

**通俗理解：** 旧的划掉一部分 + 新的写进去一部分 = 笔记本翻到了新的一页。这一步只用了加法和逐位乘法，**没有嵌套的非线性**，所以梯度能顺畅地沿这条通道反向流回任意远的过去——这正是 LSTM 不怕长程依赖的根源。

```python
# 先擦旧（f·C_{t-1}）再写新（i·C̃），一步完成记忆更新
C = f * C_prev + i * C_tilde  # 对应公式 (4)
```

### 第四组：输出门 + 隐藏状态——决定此刻说什么

**输出门公式：** `o_t = σ(W_o · [h_{t-1}, x_t] + b_o)`

**隐藏状态公式：** `h_t = o_t ⊙ tanh(C_t)`

**符号解读：** `o_t` 又是一个 0~1 的开关；`C_t` 先过 tanh 压到 -1~1，再被 `o_t` 按比例放行，得到这一步的隐藏状态 `h_t`。

**通俗理解：** 细胞状态是「全部记忆」，但你此刻不必把所有记忆都说出来——输出门决定「**此刻该让多少记忆见光**」。就像笔记本里记了很多，但回答问题时只挑相关的几条念出来。

```python
# 输出门控制放行多少，tanh 把细胞状态压到 [-1,1]
o = torch.sigmoid(o_raw)          # 对应公式 (5)
h = o * torch.tanh(C)             # 对应公式 (6)
```

## 手算一个时间步

公式看着抽象，我们用一组**标量**（每个变量都是单个数，相当于 1 维的 LSTM）实际算一遍，你就知道这些门怎么把数字挪来挪去了。

**初始条件：** 上一步的细胞状态 `C_{t-1} = 0.5`。

假设四个门已经算好了原始值（相当于线性层算完、还没过激活的数）：

| 量 | 原始值 z | 过激活 | 结果 |
|----|--------|--------|------|
| 遗忘门 f | z_f = 1.0 | sigmoid | f = 0.73 |
| 输入门 i | z_i = -1.0 | sigmoid | i = 0.27 |
| 候选值 C̃ | z_C = 0.5 | tanh | C̃ = 0.46 |
| 输出门 o | z_o = 2.0 | sigmoid | o = 0.88 |

> 提醒：sigmoid 把任意数压到 0~1（正数偏大、负数偏小）；tanh 压到 -1~1。

**第一步——更新细胞状态：**

```
C_t = f · C_{t-1} + i · C̃
    = 0.73 · 0.5 + 0.27 · 0.46
    = 0.365 + 0.124
    = 0.489  ≈ 0.49
```

解读：旧记忆 0.5 被遗忘门削弱到 0.365（留了七成），新内容 0.46 被输入门削弱到 0.124（只写进去两成多），合起来新的细胞状态是 0.49——比原来略降，因为这步「忘的多、记的少」。

**第二步——算隐藏状态：**

```
h_t = o · tanh(C_t)
    = 0.88 · tanh(0.49)
    = 0.88 · 0.45
    = 0.396  ≈ 0.40
```

解读：细胞状态 0.49 过 tanh 变成 0.45，再被输出门放到近九成（0.88），最终对外输出的隐藏状态是 0.40。

这样一个时间步就跑完了——`h_t` 和 `C_t` 会作为「上一步」传给下一个时间步，周而复始。

## LSTM 在哪里闪光

LSTM 在以下场景长期是业界首选（直到 Transformer 兴起才部分让位）：

- **机器翻译**：把整句源语言读完再翻译，长句子开头的主语和结尾的动词要对得上——LSTM 能记住句首信息。
- **语音识别**：一段音频几十秒，前面的音节和后面的音节有上下文关系，LSTM 能抓住。
- **时间序列预测**：股票、天气、流量等带时间顺序的数据，LSTM 能捕捉跨时间的依赖。
- **文本生成**：写文章、写代码时，要记得前面写过什么才能接得上下文。

## 小结

LSTM 的精髓就一句话：**把「长期记忆」从隐藏状态里剥离出来，单独走一条加法通道（细胞状态），再用三个门控精确控制该忘什么、记什么、说什么**。遗忘门管擦除、输入门管写入、输出门管放行——三道关卡配合一条贯通的记忆传送带，就是它能在长序列里不掉链子的全部秘密。

## 完整代码

下面是把上面 6 个公式翻译成 PyTorch 的完整版，复制即可跑。重点看 `LSTMCell.forward` 里的每一行注释，和文章公式逐条对应。

```python
import torch
import torch.nn as nn

# ① 定义 LSTM 单元：四个门用单个 nn.Linear 合并计算，再 chunk 分开（PyTorch 工程惯例）
#    nn.Module 是 PyTorch 所有网络层的基类，自定义层都继承它
class LSTMCell(nn.Module):
    def __init__(self, in_dim, h_dim):
        super().__init__()                          # super().__init__() 初始化父类，必须调用
        self.h_dim = h_dim
        # 四个门（遗忘 f / 输入 i / 候选 C̃ / 输出 o）共用一个线性层：输出 4*h_dim
        # nn.Linear(in, out) 就是一次仿射变换 y = W·x + b，最常用的全连接层
        self.gates = nn.Linear(in_dim + h_dim, 4 * h_dim)

    # forward 定义数据怎么从输入流到输出，PyTorch 自动用它做前向传播
    def forward(self, x, h_prev, C_prev):
        # 拼接当前输入 x 和上一步隐藏状态 h_prev（对应公式里的 [h_{t-1}, x_t]）
        combined = torch.cat([h_prev, x], dim=-1)
        # 一次矩阵乘法算出四份结果，再用 chunk 切成 4 段
        # .chunk(4, dim=-1) 把张量沿最后一维均分 4 份——这就是单 Linear 拆四门的关键
        f_raw, i_raw, C_tilde_raw, o_raw = self.gates(combined).chunk(4, dim=-1)

        # 公式 (1) 遗忘门：决定从旧记忆里丢弃多少
        f = torch.sigmoid(f_raw)                    # f_t = σ(...)
        # 公式 (2) 输入门：决定写入多少新信息
        i = torch.sigmoid(i_raw)                    # i_t = σ(...)
        # 公式 (3) 候选值：要写入的新内容
        C_tilde = torch.tanh(C_tilde_raw)           # C̃_t = tanh(...)
        # 公式 (4) 细胞状态更新：先擦旧（f·C_{t-1}）再写新（i·C̃）
        C = f * C_prev + i * C_tilde                # C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t
        # 公式 (5) 输出门：决定输出多少
        o = torch.sigmoid(o_raw)                    # o_t = σ(...)
        # 公式 (6) 隐藏状态：把细胞状态过 tanh 压到 [-1,1]，再由 o 控制放行
        h = o * torch.tanh(C)                       # h_t = o_t ⊙ tanh(C_t)
        return h, C


# ② 实例化 + 造一组假数据（3 个时间步，用 torch.randn 不引入真实数据集）
torch.manual_seed(42)                  # 固定随机种子，让结果可复现
cell = LSTMCell(in_dim=4, h_dim=8)
x_seq = torch.randn(3, 4)              # 3 步输入，每步 4 维
h = torch.zeros(8)                     # 初始隐藏状态
C = torch.zeros(8)                     # 初始细胞状态（LSTM 特有，一开始是空的）
target = torch.randn(8)                # 假装的目标（演示训练用）

# ③ 前向：让 LSTM 读完整个序列
for x_t in x_seq:
    h, C = cell(x_t, h, C)             # 每步更新隐藏状态和细胞状态
print("读完序列后的隐藏状态：", h[:3].tolist(), "...")
print("读完序列后的细胞状态：", C[:3].tolist(), "...")

# ④ 训练一步：算误差 → 反向传播 → 更新权重
opt = torch.optim.Adam(cell.parameters(), lr=0.01)   # Adam 优化器，lr 是学习率
loss_fn = nn.MSELoss()                               # 均方误差损失
loss = loss_fn(h, target)
loss.backward()          # backward() 反向传播，自动算每个参数的梯度（误差对参数求导）
opt.step()               # 按梯度方向走一步，更新权重——这就是「学习」的本质

# ⑤ 打印结果
print("这一步的 loss：", round(loss.item(), 4))
```

运行后你会看到隐藏状态、细胞状态和 loss 的具体数值——说明这套门控真的在动。

## 参考资料

1. Long Short-Term Memory - Hochreiter & Schmidhuber (1997, Neural Computation)
   https://deeplearning.cs.cmu.edu/S23/document/readings/LSTM.pdf
2. Understanding LSTM Networks - colah's blog
   https://colah.github.io/posts/2015-08-Understanding-LSTMs/
3. 长短期记忆网络（LSTM）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_recurrent-modern/lstm.html
