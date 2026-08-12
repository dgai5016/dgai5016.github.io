---
title: RNN 是什么
date: 2026-08-11 22:53
tags: [AI]
excerpt: RNN（循环神经网络）就是输入法猜词本身：你刚敲完「今天天气真」，它逐字读入、根据前面所有字猜下一个「好」。本文用一条隐藏状态公式、一个手算的时间步，加上可跑的 PyTorch 猜词代码，讲清它怎么「边读边记」，并点出它记性太短这一痛点——自然引出升级版 LSTM。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIHJlZlg9IjgiIHJlZlk9IjMiIG9yaWVudD0iYXV0byIgbWFya2VyVW5pdHM9InN0cm9rZVdpZHRoIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMCw2IEw4LDMgeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPHRleHQgeD0iODAiIHk9IjYyIiBmb250LXNpemU9IjE4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzgpIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zdHlsZT0iaXRhbGljIj5o77yI6YCQ5a2X6K+744CB54yc5LiL5LiA5Liq77yM57Sr6Imy5Li76Imy77yJPC90ZXh0PgoKICA8cmVjdCB4PSI5MiIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSIxMzIiIHk9IjEyMyIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7ku4o8L3RleHQ+CiAgPGxpbmUgeDE9IjE3OCIgeTE9IjExNCIgeDI9IjI1MiIgeTI9IjExNCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8dGV4dCB4PSIyMTUiIHk9Ijk4IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmg8L3RleHQ+CgogIDxyZWN0IHg9IjI2MCIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSIzMDAiIHk9IjEyMyIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7lpKk8L3RleHQ+CiAgPGxpbmUgeDE9IjM0NiIgeTE9IjExNCIgeDI9IjQyMCIgeTI9IjExNCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8dGV4dCB4PSIzODMiIHk9Ijk4IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmg8L3RleHQ+CgogIDxyZWN0IHg9IjQyOCIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSI0NjgiIHk9IjEyMyIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7msJQ8L3RleHQ+CiAgPGxpbmUgeDE9IjUxNCIgeTE9IjExNCIgeDI9IjU4OCIgeTI9IjExNCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8dGV4dCB4PSI1NTEiIHk9Ijk4IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmg8L3RleHQ+CgogIDxyZWN0IHg9IjU5NiIgeT0iOTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0OCIgcng9IjgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSI2MzYiIHk9IjEyMyIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7nnJ88L3RleHQ+CiAgPGxpbmUgeDE9IjY4MiIgeTE9IjExNCIgeDI9Ijc1NiIgeTI9IjExNCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICA8dGV4dCB4PSI3MTkiIHk9Ijk4IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPmg8L3RleHQ+CgogIDxyZWN0IHg9Ijc2NCIgeT0iOTAiIHdpZHRoPSIxMDQiIGhlaWdodD0iNDgiIHJ4PSI4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI4MTYiIHk9IjEyMyIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7lpb08L3RleHQ+CiAgPHRleHQgeD0iODE2IiB5PSIxNjAiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44MikiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7njJzkuIvkuIDkuKo8L3RleHQ+CgogIDx0ZXh0IHg9IjQ3MCIgeT0iMjA1IiBmb250LXNpemU9IjE3IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODIpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5q+P6K+75LiA5Liq5a2X77yM5oqK44CM5LiK5LiA5q2l55qE6K6w5b+GIGjjgI3lkozjgIzov5nkuKrmlrDlrZfjgI3mj4nkuIDotbfvvIzmm7TmlrDorrDlv4blvoDkuIvkvKA8L3RleHQ+CgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjMyMCIgcj0iNDIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjMzMyIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5oPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMzg4IiBmb250LXNpemU9IjE2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7pmpDol4/nirbmgIHvvJrov5nkuIDmraXnmoTorrDlv4Y8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI0MTAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42NikiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7lj6rmnInkuIDkuKrnirbmgIHlnKjlvqrnjq/kvKDpgJI8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTAyIiBmb250LXNpemU9IjEwOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+Uk5OPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTQ4IiBmb250LXNpemU9IjMyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7ovpPlhaXms5XnjJzor43mnKzouqs8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1OTIiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="RNN封面" />

你打字时，输入法会猜你下一个字想打什么——刚敲完「今天天气真」，它就跳出「好」等你选。这件你天天在用的事，本身就是 **RNN** 在干的事。

RNN 全名 **Recurrent Neural Network（循环神经网络）**。一句话：它**一个字一个字地读，每读一个就把「之前读到的」和「这个新字」揉进一份记忆，再用这份记忆猜下一个字**。

但普通 RNN 有个致命弱点：**记性太短**。它只记得最近两三个字，再多就开始糊。所以「今天天气真 → 好」这种短句它能学好；可一旦句子拉长，比如「我出生在法国……（中间隔了几十个字）……现在我会说___」——它读到「我会说」时，开头那个「法国」早模糊了，自然猜不出该填「法语」。

这一痛点，后来由升级版 **LSTM** 解决。如果说 LSTM 是「记性更好的输入法」，那 RNN 就是**输入法猜词本身**——最朴素、最原始的那一版。理解了 RNN，就握住了进入序列建模的钥匙。

从体系上看，RNN 属于深度学习 → 序列建模这一支，1990 年由 Jeffrey Elman 在论文《Finding Structure in Time》里提出。它是 LSTM、GRU 等后续模型的地基，也是入门「处理有顺序的数据」的第一站。

## 先认得几个词

| 术语 | 大白话 |
|------|--------|
| **序列** | 按顺序排成一串的数据，比如一句话的各个字、一段音频的各帧、一只股票的日线。输入法逐字读，读的就是一个序列——**顺序一变意思就变**（「我吃饭」和「饭吃我」完全是两回事）。 |
| **时间步（time step）** | 序列里的「第几步」，记作 $t=1,2,3,\ldots$。处理一句话时，每读一个字就是走一个时间步。 |
| **隐藏状态 $h$** | RNN 此刻「脑子里记着的」对前文的摘要，既要传给下一步，也要用来算输出。它是 RNN **唯一**的记忆载体——记住多少全靠它。 |
| **门 / 记忆 / 训练（假熟词）** | 这些词在 AI 语境和日常不一样。「记忆」不是人脑里的事，就是**这个隐藏状态**——一组数字，每步刷新一次，不是真的「记住过去」而是「被上一步影响」。RNN 里**没有「门」**——那是 LSTM 才有的开关，这里提前点名免得和下一篇混淆。「训练 / 学习」也不是人那样读书思考，而是指**用数据反复调网络里的权重数字，让输出越来越准**——文末代码里 `loss.backward()` + `opt.step()` 那两行，就是这件事的真实模样。 |

## 输入法是怎么猜下一个字的：隐藏状态一路传

RNN 每一步只做一件事：**用「上一步的记忆」+「这一步读到的字」，算出「这一步的记忆」**。然后这份记忆既往下传，也拿来猜下一个字。

**隐藏状态公式（这一步的记忆怎么算）：**

$$h_t = \tanh(W_x\, x_t + W_h\, h_{t-1} + b)$$

**符号解读：**

- $x_t$ —— 这一步读到的字（输入法刚吃进的一个字）
- $h_{t-1}$ —— 上一步的记忆（输入法对前文的摘要）
- $W_x$ —— 作用于新字的**权重**（这个新字多大程度被采纳）
- $W_h$ —— 作用于旧记忆的**权重**（旧摘要多大程度被沿用）
- $b$ —— **偏置**（一个基础底数，像天平归零前的底数）
- $\tanh$ —— 双曲正切函数，把任意数字压到 $(-1, 1)$ 之间

**通俗理解：** 把「前文摘要 + 这个新字」按各自权重配好，过 $\tanh$ 压进固定大小的记忆盒，就得到这一步的记忆 $h_t$——它会被原样传给下一步，并用来猜下一个字。

> AI 里的「权重」是相乘的系数，不是日常说的权力/分量；「偏置」是相加的底数。两者都是网络自己学出来的参数。$\tanh$ 像一个限幅器：太大的截顶、太小的截底，保证记忆数字永远落在 $-1$ 到 $1$ 之间——脑子容量有限，装不下无穷大的数。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgb3JpZW50PSJhdXRvIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMTAsNSBMMCwxMCB6IiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9ImFnIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI4IiBtYXJrZXJIZWlnaHQ9IjgiIG9yaWVudD0iYXV0byI+CiAgICAgIDxwYXRoIGQ9Ik0wLDAgTDEwLDUgTDAsMTAgeiIgZmlsbD0iIzljYTNhZiIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQyMCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7kuIDkuKrml7bpl7TmraXvvJrorrDlv4YgaF90IOaYr+aAjuS5iOeul+WHuuadpeeahDwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj7kuIrkuIDmraXorrDlv4YgKyDov5nkuIDmraXnmoTlrZcg4oaSIOaMieadg+mHjea3t+WQiCDihpIgdGFuaCDljovnvKkg4oaSIOaWsOiusOW/hjwvdGV4dD4KCiAgPCEtLSDovpPlhaUgaF97dC0xfSAtLT4KICA8cmVjdCB4PSI3MCIgeT0iMTAwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiNhNzhiZmEiLz4KICA8dGV4dCB4PSIxMzUiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+aCh0LTEpPC90ZXh0PgogIDx0ZXh0IHg9IjEzNSIgeT0iMTUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZjFlY2ZmIj7kuIrkuIDmraXorrDlv4Y8L3RleHQ+CgogIDwhLS0g6L6T5YWlIHhfdCAtLT4KICA8cmVjdCB4PSI3MCIgeT0iMjgwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIxMzUiIHk9IjMxMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+eCh0KTwvdGV4dD4KICA8dGV4dCB4PSIxMzUiIHk9IjMzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2VjZThmZiI+6L+Z5LiA5q2l6K+75Yiw55qE5a2XPC90ZXh0PgoKICA8IS0tIOadg+mHjSBXX2ggLS0+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjEzMCIgeDI9IjI3MSIgeTI9IjEzMCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjQiIG1hcmtlci1lbmQ9InVybCgjYXIpIi8+CiAgPHJlY3QgeD0iMjc1IiB5PSIxMDgiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDQiIHJ4PSI2IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iMzI1IiB5PSIxMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxZjI5MzciPsOXIFdfaDwvdGV4dD4KCiAgPCEtLSDmnYPph40gV194IC0tPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIzMTAiIHgyPSIyNzEiIHkyPSIzMTAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXJrZXItZW5kPSJ1cmwoI2FyKSIvPgogIDxyZWN0IHg9IjI3NSIgeT0iMjg4IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ0IiByeD0iNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjMyNSIgeT0iMzE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij7DlyBXX3g8L3RleHQ+CgogIDwhLS0g5Lik6Lev5rGH5YWl5Yqg5rOVIC0tPgogIDxsaW5lIHgxPSIzNzUiIHkxPSIxMzIiIHgyPSI0NDYiIHkyPSIyMDgiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzLjUiIG1hcmtlci1lbmQ9InVybCgjYWcpIi8+CiAgPGxpbmUgeDE9IjM3NSIgeTE9IjMwOCIgeDI9IjQ0NiIgeTI9IjIzMiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMuNSIgbWFya2VyLWVuZD0idXJsKCNhZykiLz4KCiAgPCEtLSDliqDms5XlnIggLS0+CiAgPGNpcmNsZSBjeD0iNDcwIiBjeT0iMjIwIiByPSIyNiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjMzc0MTUxIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjQ3MCIgeT0iMjI5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzc0MTUxIj4rPC90ZXh0PgogIDx0ZXh0IHg9IjQ3MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7lho3liqDlgY/nva4gYjwvdGV4dD4KCiAgPCEtLSB0YW5oIC0tPgogIDxsaW5lIHgxPSI0OTYiIHkxPSIyMjAiIHgyPSI1NTYiIHkyPSIyMjAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzLjUiIG1hcmtlci1lbmQ9InVybCgjYWcpIi8+CiAgPHJlY3QgeD0iNTYwIiB5PSIxOTQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNTIiIHJ4PSI4IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iNjEwIiB5PSIyMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPnRhbmg8L3RleHQ+CiAgPHRleHQgeD0iNjEwIiB5PSIyNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiPuWOi+WIsCAo4oiSMSwgMSk8L3RleHQ+CgogIDwhLS0gaF90IC0tPgogIDxsaW5lIHgxPSI2NjAiIHkxPSIyMjAiIHgyPSI3MTYiIHkyPSIyMjAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXJrZXItZW5kPSJ1cmwoI2FyKSIvPgogIDxyZWN0IHg9IjcyMCIgeT0iMTkwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjYwIiByeD0iMTIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI3ODUiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+aCh0KTwvdGV4dD4KICA8dGV4dCB4PSI3ODUiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iI2VjZThmZiI+6L+Z5LiA5q2l55qE5paw6K6w5b+GPC90ZXh0PgoKICA8IS0tIGhfdCDkvKDnu5nkuIvkuIDmraUgLS0+CiAgPGxpbmUgeDE9Ijg1MCIgeTE9IjIwNSIgeDI9IjEwNDgiIHkyPSIxNTAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXJrZXItZW5kPSJ1cmwoI2FyKSIvPgogIDxyZWN0IHg9IjEwNTAiIHk9IjEyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI1NiIgcng9IjEwIiBmaWxsPSIjZWNlOGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjExMTAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzZjNjNmZiI+5Lyg57uZ5LiL5LiA5q2lPC90ZXh0PgogIDx0ZXh0IHg9IjExMTAiIHk9IjE2NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzFmMjkzNyI+5b2T5L2c5LiL5LiA6L2u55qEIGgodC0xKTwvdGV4dD4KCiAgPCEtLSBoX3Qg5ZCR5LiL5YiwIFdfeSAtLT4KICA8bGluZSB4MT0iNzg1IiB5MT0iMjUwIiB4Mj0iNzg1IiB5Mj0iMzA2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcikiLz4KICA8cmVjdCB4PSI3MzUiIHk9IjMxMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgcng9IjYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSI3ODUiIHk9IjMzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+w5cgV195PC90ZXh0PgoKICA8IS0tIHlfdCAtLT4KICA8bGluZSB4MT0iODM1IiB5MT0iMzMwIiB4Mj0iOTAxIiB5Mj0iMzMwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMy41IiBtYXJrZXItZW5kPSJ1cmwoI2FnKSIvPgogIDxyZWN0IHg9IjkwNSIgeT0iMzEwIiB3aWR0aD0iOTAiIGhlaWdodD0iNDAiIHJ4PSI4IiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iOTUwIiB5PSIzMzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPnkodCk8L3RleHQ+CgogIDwhLS0g54yc5a2XIC0tPgogIDxsaW5lIHgxPSI5OTUiIHkxPSIzMzAiIHgyPSIxMDQzIiB5Mj0iMzMwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMy41IiBtYXJrZXItZW5kPSJ1cmwoI2FnKSIvPgogIDx0ZXh0IHg9IjExMDAiIHk9IjMyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+4oaSIOavj+S4quWtl+eahOamgueOhzwvdGV4dD4KICA8dGV4dCB4PSIxMTAwIiB5PSIzNDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiMxZjI5MzciPuaMkeacgOmrmOWIhueMnOS4i+S4gOS4quWtlzwvdGV4dD4KPC9zdmc+Cg==" alt="一个时间步的记忆计算流程" />

*图 1：把隐藏状态公式画成数据流——上一步记忆 h(t-1) 和这一步的字 x(t) 各自乘权重、相加再加偏置、过 tanh 压缩，得到的新记忆 h(t) 一路传给下一步，另一路过 W_y 算出每个字的得分。*

这一条公式用 PyTorch 写就是一行：

```python
# 对应 h_t = tanh(W_x·x_t + W_h·h_{t-1})
h_t = torch.tanh(self.W_xh(x_t) + self.W_hh(h_prev))
```

这里的 `W_xh` / `W_hh` 在 PyTorch 里通常用 `nn.Linear` 实现——它把「权重矩阵 + 偏置」打包成一层，所以代码里看不到单独的 $b$（它被藏进 `nn.Linear` 自带的偏置项里了）。

**输出层（猜下一个字）：** 如果这一步要给预测，就把记忆 $h_t$ 再过一层映射，算出每个字的得分：

$$y_t = W_y\, h_t + b_y$$

最后通常再接一个 softmax，把得分归一成概率（每个字一个概率，加起来等于 1）——输入法就是挑概率最高的那个字跳出来等你选。

## 手算一个时间步

公式看着抽象，我们用一组**标量**（每个变量都是单个数，相当于 1 维的 RNN）实际算一遍，你就知道输入法读完一个字，记忆是怎么翻新的。

**已知：** 上一步的记忆 $h_{t-1} = 0.5$，这一步读到的字 $x_t = 1.0$；权重 $W_h = 0.8$、$W_x = 0.6$，偏置 $b = 0.1$。

| 步骤 | 计算 | 结果 |
|---|---|---|
| 加权求和 | $0.8 \times 0.5 + 0.6 \times 1.0 + 0.1$ | $0.4 + 0.6 + 0.1 = 1.1$ |
| tanh 压缩 | $\tanh(1.1)$ | $\mathbf{h_t \approx 0.8005}$ |

**自检：** $\tanh$ 的输出必须落在 $(-1, 1)$ 区间——$0.8005$ 在范围内 ✅；加权求和 $z = 1.1$ 是个正数且离 0 不太远，$\tanh$ 给出接近 1 的正值，方向也对 ✅。

这个 $h_t \approx 0.8005$ 就是这一步的记忆摘要，会作为下一步的 $h_{t-1}$ 传下去——RNN 的「循环」就体现在这里：**上一步的输出喂给下一步**，一个字一个字地往后传。

## RNN 的痛点：记性太短，猜不准远处

RNN 听上去够用了，但有个致命问题：**梯度消失**——通俗讲就是**记不住太久以前的事**。

训练 RNN（让它学出合适的权重）时，要把误差**从后往前传**，穿过很多个时间步。每传一步，误差就要乘一次循环权重 $W_h$。如果 $W_h$ 比 1 小一点（比如 0.9），连乘几十步后就接近 0 了：$0.9^{50} \approx 0.005$。意思是**几十步之前读到的字，对当前的训练几乎没有影响**——网络学不到「长程依赖」。

举个具体的：句子「我出生在法国 ……（中间隔了 50 个字）…… 所以我会说法语」。RNN 读到「法语」时，早就把开头的「法国」糊掉了，学不会两者的关联。短句「今天天气真 → 好」它能学好（只隔 4 个字），可一旦要记几十步前的信息，它就力不从心。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjMiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuair+W6pua2iOWkse+8muavj+WbnuS8oOS4gOatpeS5mOS4gOasoSBXX2jvvIzlh6DljYHmraXlkI7kv6Hlj7flvZLpm7Y8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+5qKv5bqm6L+e5LmYIFdfaO+8iCZsdDsgMe+8ie+8mumalOWHoOatpei/mOWJqeS4gOWkp+WNiu+8jOmalOWHoOWNgeatpeWwsei/keS5juS4uumbtjwvdGV4dD4KCiAgPCEtLSDlt6bljYrvvJroobDlh4/mm7Lnur8gLS0+CiAgPGxpbmUgeDE9IjEzMCIgeTE9IjkwIiB4Mj0iMTMwIiB5Mj0iMjkwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIxMzAiIHkxPSIyOTAiIHgyPSI2MDAiIHkyPSIyOTAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMTIyIiB5PSI5OCIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+MS4wPC90ZXh0PgogIDx0ZXh0IHg9IjEyMiIgeT0iMjk0IiB0ZXh0LWFuY2hvcj0iZW5kIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj4wPC90ZXh0PgogIDx0ZXh0IHg9IjEwMCIgeT0iMTkwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIiB0cmFuc2Zvcm09InJvdGF0ZSgtOTAgMTAwIDE5MCkiPuair+W6puW8uuW6pjwvdGV4dD4KICA8dGV4dCB4PSI1OTUiIHk9IjMxMiIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+5b6A5Zue55yL55qE5q2l5pWwIOKGkjwvdGV4dD4KCiAgPCEtLSAwLjlebiDmm7Lnur8gLS0+CiAgPHBvbHlsaW5lIHBvaW50cz0iMTMwLDkwIDE0NywxMjggMTY1LDE1OSAxODIsMTg0IDIwMCwyMDQgMjE3LDIyMSAyNTIsMjQ1IDI4NywyNjEgMzM5LDI3NSA0MDgsMjg0IDQ3OCwyODggNTY1LDI5MCIKICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0LjUiLz4KCiAgPCEtLSDmoIfms6ggc3RlcD00IC0tPgogIDxjaXJjbGUgY3g9IjE2NSIgY3k9IjE1OSIgcj0iNiIgZmlsbD0iIzZjNjNmZiIvPgogIDxsaW5lIHgxPSIxNjUiIHkxPSIxNTkiIHgyPSIxNjUiIHkyPSIyOTAiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjMgMyIvPgogIDx0ZXh0IHg9IjE3NCIgeT0iMTUwIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj40IOatpe+8mui/mOWJqSA2NiU8L3RleHQ+CgogIDwhLS0g5qCH5rOoIHN0ZXA9NTAgLS0+CiAgPGNpcmNsZSBjeD0iNTY1IiBjeT0iMjkwIiByPSI2IiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iNTY1IiB5PSIyNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNhNzhiZmEiPjUwIOatpe+8muWPquWJqSAwLjUlPC90ZXh0PgoKICA8IS0tIOWIhumalOe6vyAtLT4KICA8bGluZSB4MT0iNjQwIiB5MT0iODUiIHgyPSI2NDAiIHkyPSIzMzUiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CgogIDwhLS0g5Y+z5Y2K77ya5a+55q+U5p2hIC0tPgogIDx0ZXh0IHg9Ijg5MCIgeT0iOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxZjI5MzciPuefreWPpeWtpuW+l+S8mu+8jOmVv+WPpeWtpuS4jeS8mjwvdGV4dD4KCiAgPCEtLSDmnaEx77ya55+t5Y+lIC0tPgogIDxyZWN0IHg9IjcwMCIgeT0iMTI4IiB3aWR0aD0iMjUwIiBoZWlnaHQ9IjQwIiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjcxMiIgeT0iMTU0IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj42NiU8L3RleHQ+CiAgPHRleHQgeD0iOTYwIiB5PSIxNDIiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxZjI5MzciPuOAjOS7iuWkqeWkqeawlOecnyDihpIg5aW944CN77yINCDmraXvvIk8L3RleHQ+CiAgPHRleHQgeD0iOTYwIiB5PSIxNjIiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YzYzZmYiPuair+W6pui/mOWknyDihpIg5a2m5b6X5LyaPC90ZXh0PgoKICA8IS0tIOadoTLvvJrplb/lj6UgLS0+CiAgPHJlY3QgeD0iNzAwIiB5PSIyMjgiIHdpZHRoPSIxNCIgaGVpZ2h0PSI0MCIgcng9IjQiIGZpbGw9IiNjNGI1ZmQiLz4KICA8dGV4dCB4PSI3MjQiIHk9IjI0MiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+44CM5rOV5Zu9IOKApuKApiDmiJHkvJror7QgX19f44CN77yINTAg5q2l77yJPC90ZXh0PgogIDx0ZXh0IHg9IjcyNCIgeT0iMjYyIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYTc4YmZhIj7moq/luqblvZLpm7Yg4oaSIOWtpuS4jeS8mjwvdGV4dD4KICA8dGV4dCB4PSI3MDAiIHk9IjI5NCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+6L+Z5q2j5pivIFJOTiDnmoTnn63mnb/vvIzlgqznlJ/kuobljYfnuqfniYggTFNUTTwvdGV4dD4KPC9zdmc+Cg==" alt="梯度消失衰减曲线" />

*图 2：训练时梯度要反向连乘循环权重 W_h——左图是 0.9 的连乘衰减：隔 4 步还剩 66%（短句学得会），隔 50 步只剩 0.5%（长句学不会），这就是 RNN 记性太短的根源。*

正是这个痛点，催生了升级版 **LSTM**（Long Short-Term Memory，长短期记忆网络）——它在隐藏状态之外，单独开了一条「长期记忆」通道（细胞状态）和几个门控，让信息能传得更远。如果说 RNN 是输入法里**只靠脑子记**的那一版，LSTM 就是给它配了个**笔记本**——重要的事写下来，不再只靠脑子记。这也是本系列下一篇的主题。

## RNN 曾经在哪里大显身手

RNN / LSTM 曾经是序列建模的主力军，处理的核心都是「有顺序的数据」：

- **语言模型 / 输入法猜词**：给前几个字预测下一个，正是本文演示的任务。
- **机器翻译**：把源语言句子按顺序读完，再逐字译成目标语言。
- **语音识别**：一段音频是一串按时间排好的帧，RNN 能抓住前后音节的上下文。
- **时间序列预测**：股票、天气、流量等带时间顺序的数据，捕捉跨时间的依赖。

不过近年被 **Transformer**（不靠循环、改用注意力机制一次看完全局）大面积取代。但 RNN「边读边记」的思想，仍然是理解 LSTM、GRU 等后续模型的基础，也是入门序列建模的第一站。

## 小结

RNN 就是输入法猜词的最朴素版本：给神经网络加一条**记忆回路**，每一步都把「上一步的记忆 $h_{t-1}$」和「这一步的字 $x_t$」揉成新的记忆 $h_t = \tanh(W_x\, x_t + W_h\, h_{t-1} + b)$，从而处理有顺序的数据；落到 PyTorch 里，核心就是 `forward` 里那一行 `torch.tanh(self.W_xh(x) + self.W_hh(h_prev))` 加上一个时间步循环。它的短板是**记性太短（梯度消失）**，猜不远处的字——于是有了配了笔记本的升级版 LSTM。

## 完整代码：教 RNN 当输入法

下面把隐藏状态公式翻译成 PyTorch，用一个和 LSTM 版**完全相同的猜词任务**（「今天天气真 → 好」）来演示——同样的任务，方便你直观对比 RNN 和 LSTM。重点看 `RNNCell.forward` 里每一行注释，和文章公式逐条对应。代码已实跑验证：训练后 RNN 真能猜对「好」（5 个随机种子下 loss 都降到 0，猜词全对）。

**先看懂整体流程，再看代码细节**——这段代码回答「怎么教 RNN 学会猜下一个字」，骨架是「造大脑 → 备料 → 反复练习 → 考试」：

- **造大脑**（`class RNNCell`）：把 RNN 的零件（权重 `W_xh`/`W_hh`/`W_hy`）和算法（`forward`）打包成一个类。
- **备料**：把字变成数字（one-hot 编码），造出大脑实例（权重先随机），备好「调权重的工具」（优化器）和「量误差的工具」（损失函数）。
- **反复练习**（训练循环 200 次）：每次循环 4 步——**读字**（记忆一路更新）→ **算误差**（和正确答案「好」比）→ **反向**（算每个权重该往哪调）→ **更新**（真的去调）。重复 200 次，权重越来越准。
- **考试**（测试）：再读一遍（这次不调权重），看它现在猜什么。学会了就猜对「好」。

记住这个骨架：**造 → 备 → 练（读→误差→反向→改）→ 考**。所有监督学习代码都是这个流程，RNN 只是「大脑」内部不同。

```python
import torch
import torch.nn as nn

# ===== 任务：教 RNN 学会「今天天气真 → 好」（输入法猜词原理）=====
# 词汇表就 5 个字，和 LSTM 版猜词完全相同的任务，方便对比
vocab = ['今', '天', '气', '真', '好']
char2idx = {c: i for i, c in enumerate(vocab)}
inputs = [char2idx[c] for c in ['今', '天', '气', '真']]   # 输入序列
target = char2idx['好']                                    # 要猜的目标字

# ===== 定义 RNN 单元（对应文章公式）=====
# nn.Module 是 PyTorch 所有网络层的基类，自定义层都继承它
class RNNCell(nn.Module):
    def __init__(self, vocab_size, h_dim):
        super().__init__()                          # super().__init__() 初始化父类，必须调用
        self.W_xh = nn.Linear(vocab_size, h_dim)   # 输入权重 W_x：作用于这一步读到的字（nn.Linear 把"权重矩阵+偏置"打包成一层）
        self.W_hh = nn.Linear(h_dim, h_dim)        # 循环权重 W_h：作用于上一步的记忆
        self.W_hy = nn.Linear(h_dim, vocab_size)   # 输出层：把记忆映射成「每个字的得分」

    # forward 定义数据怎么从输入流到输出，PyTorch 自动用它做前向传播
    def forward(self, x, h_prev):
        # 公式 h_t = tanh(W_x·x_t + W_h·h_{t-1})；两个 nn.Linear 各自带偏置，合并即公式里的 b
        h = torch.tanh(self.W_xh(x) + self.W_hh(h_prev))   # 这一步的记忆（隐藏状态）
        y = self.W_hy(h)                                    # 对每个字的预测得分
        return h, y

# ===== 训练：反复读「今天天气真」，学会预测「好」=====
torch.manual_seed(42)
cell = RNNCell(vocab_size=len(vocab), h_dim=16)
opt = torch.optim.Adam(cell.parameters(), lr=0.05)   # Adam 优化器，lr 是学习率
loss_fn = nn.CrossEntropyLoss()                       # 交叉熵损失：专为「多分类选一个」设计
x_seq = torch.eye(len(vocab))[inputs]                 # one-hot 编码：把字变成向量（输入法就这么干）

for epoch in range(200):
    h = torch.zeros(16)          # 初始记忆（RNN 习惯从零向量开始）
    for x_t in x_seq:            # 逐字读：今 → 天 → 气 → 真
        h, y = cell(x_t, h)
    loss = loss_fn(y.unsqueeze(0), torch.tensor([target]))
    opt.zero_grad()      # 清空旧梯度（避免累积）
    loss.backward()      # 反向传播：自动算出每个权重的梯度
    opt.step()           # 用梯度更新权重——这一对就是"训练"的本质

# ===== 测试：输入「今天天气真」，看它猜什么 =====
h = torch.zeros(16)
for x_t in x_seq:
    h, y = cell(x_t, h)
print(f"输入「今天天气真」，RNN 猜下一个字是：「{vocab[y.argmax()]}」")
print(f"训练 loss：{loss.item():.4f}")
```

运行输出：

```
输入「今天天气真」，RNN 猜下一个字是：「好」
训练 loss：0.0000
```

——RNN 真的学会了猜词，这正是输入法预测下一个字的原理。把 `RNNCell` 换成下一篇的 `LSTMCell`（多加一条细胞状态 $C$ 和三个门），任务和代码结构完全一样，你就能直观看到 LSTM 是怎么在 RNN 基础上「记性变好」的。

## 参考资料

1. Finding Structure in Time - Jeffrey L. Elman, Cognitive Science 14(2), 1990
   https://www.sciencedirect.com/science/article/abs/pii/036402139090002E
2. 循环神经网络（8.4 节）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn.html
3. The Unreasonable Effectiveness of Recurrent Neural Networks - Andrej Karpathy
   http://karpathy.github.io/2015/05/21/rnn-effectiveness/
