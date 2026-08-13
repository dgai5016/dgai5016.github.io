---
title: 前向传播是什么
date: 2026-08-12 00:25
tags: [AI]
excerpt: 前向传播是神经网络做预测时数据流动的方式——输入数据从输入层出发，逐层做"加权求和+激活"，一路算到输出层得到预测。本文用工厂流水线类比、一层的矩阵公式、一个迷你网络的手算全过程，加上能跑的 PyTorch 代码，讲清数据怎么一层层接力传过去。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDkuInlsYLnvZHnu5zov57nur/vvIjovpPlhaUyIOKGkiDpmpDol48zIOKGkiDovpPlh7oy77yJIC0tPgogIDxnIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjMwKSIgc3Ryb2tlLXdpZHRoPSIxLjYiIGZpbGw9Im5vbmUiPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjE2MCIgeDI9IjU2MCIgeTI9IjEyMCIvPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjE2MCIgeDI9IjU2MCIgeTI9IjIxMCIvPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjE2MCIgeDI9IjU2MCIgeTI9IjMwMCIvPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjI1MCIgeDI9IjU2MCIgeTI9IjEyMCIvPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjI1MCIgeDI9IjU2MCIgeTI9IjIxMCIvPgogICAgPGxpbmUgeDE9IjIyMCIgeTE9IjI1MCIgeDI9IjU2MCIgeTI9IjMwMCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjEyMCIgeDI9IjkwMCIgeTI9IjE4MCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjEyMCIgeDI9IjkwMCIgeTI9IjI3MCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjIxMCIgeDI9IjkwMCIgeTI9IjE4MCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjIxMCIgeDI9IjkwMCIgeTI9IjI3MCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjMwMCIgeDI9IjkwMCIgeTI9IjE4MCIvPgogICAgPGxpbmUgeDE9IjU2MCIgeTE9IjMwMCIgeDI9IjkwMCIgeTI9IjI3MCIvPgogIDwvZz4KCiAgPCEtLSDoioLngrkgLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk2KSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiPgogICAgPGNpcmNsZSBjeD0iMjIwIiBjeT0iMTYwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iMjIwIiBjeT0iMjUwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iNTYwIiBjeT0iMTIwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iNTYwIiBjeT0iMjEwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iNTYwIiBjeT0iMzAwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iOTAwIiBjeT0iMTgwIiByPSIxOCIvPgogICAgPGNpcmNsZSBjeD0iOTAwIiBjeT0iMjcwIiByPSIxOCIvPgogIDwvZz4KCiAgPCEtLSDlsYLmoIfnrb4gLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjY1KSIgZm9udC1zaXplPSIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iMjIwIiB5PSIzNDgiPui+k+WFpeWxgjwvdGV4dD4KICAgIDx0ZXh0IHg9IjU2MCIgeT0iMzQ4Ij7pmpDol4/lsYI8L3RleHQ+CiAgICA8dGV4dCB4PSI5MDAiIHk9IjM0OCI+6L6T5Ye65bGCPC90ZXh0PgogIDwvZz4KCiAgPCEtLSDotK/nqb/nmoTlpKfmlrnlkJHnrq3lpLTvvJrngrnpopgi5YmN5ZCRIuaVsOaNrua1gSAtLT4KICA8dGV4dCB4PSI1NTUiIHk9IjM4OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgyKSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc3R5bGU9Iml0YWxpYyI+5pWw5o2u5rWB5ZCRIMK3IEZvcndhcmQ8L3RleHQ+CiAgPGxpbmUgeDE9IjE1MCIgeTE9IjQwNSIgeDI9Ijk0NSIgeTI9IjQwNSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjQuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI5NDUsMzkxIDk3NSw0MDUgOTQ1LDQxOSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIvPgoKICA8IS0tIOamguW/teWQjSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjUwMCIgZm9udC1zaXplPSI4NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5YmN5ZCR5Lyg5pKtPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTQ4IiBmb250LXNpemU9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODIpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+Rm9yd2FyZCBQcm9wYWdhdGlvbjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU5NSIgZm9udC1zaXplPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgbGV0dGVyLXNwYWNpbmc9IjMiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="前向传播封面" />

如果你读过《神经网络是什么》，应该还记得那个**分层的识别委员会**：数据从输入层进，一道道工序往后传，最后拍板给结论。这一篇就专门回答一个更具体的问题——**数据到底是怎么一道道工序流过去的？** 这个过程有个正式名字，叫**前向传播**（forward propagation，也叫 forward pass）。

一句话定义：前向传播就是**把输入数据从输入层出发，逐层做"加权求和 + 激活"，一路算到输出层得到预测结果**的过程。

用你秒懂的话说，它就像工厂的**流水线**：原料（输入数据）从第一道工序进，每道工序加工一下交给下一道，最后一道产出成品（预测结果）。整条线**只往前走、不回头**——"前向"二字就是这个意思。对应到委员会类比：意见从基层初审 → 中层复审 → 终审定论，一层层上报，这个"上报"的流程就是前向传播。

## 拆开看：前向传播就是层层"加权求和 + 激活"的接力

单个神经元干的事，上一篇《神经元是什么》讲过了：把输入按权重加权求和、加偏置、再过激活函数（$z = w_1x_1+\cdots+w_nx_n+b$，$a=f(z)$）。前向传播，就是**把这个动作在每一层重复一遍、层与层接力**。

一层里通常有多个神经元并排工作。把它们打包成紧凑的矩阵写法（**"矩阵"你可以理解成"把一堆权重排成一张表，好一次性算完这层的所有神经元"**），一层的计算就是：

$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$

$$a^{(l)} = f(z^{(l)})$$

**符号逐项解读：**

- $z^{(l)}$ —— 等号左边，第 $l$ 层的加权和：这层做完"权重×输入"累加再加偏置后的中间结果，还没过激活函数。
- $a^{(l-1)}$ —— 上一层的输出（也就是这一层的输入）。最开头 $a^{(0)}$ 就是原始输入数据。
- $W^{(l)}$ —— 第 $l$ 层的**权重矩阵**：把这层所有神经元对所有输入的"话语权"打包成一张表。
- $b^{(l)}$ —— 第 $l$ 层的偏置，每个神经元一个底数。
- $f$ —— 激活函数（ReLU、sigmoid 等），"够强才放行"的开关。
- $a^{(l)}$ —— 这层的输出，**它会原封不动地变成下一层的输入**。

**关键直觉就一句：上一层的输出，就是下一层的输入。** 整张网络，本质上是在把"加权求和 + 激活"这个简单函数**一层套一层地复合很多次**——第一层的输出喂给第二层，第二层的输出喂给第三层，一直套到输出层。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7liY3lkJHkvKDmkq3vvJrkuIrkuIDlsYLnmoTovpPlh7ogPSDkuIvkuIDlsYLnmoTovpPlhaU8L3RleHQ+CgogIDwhLS0g5LiJ5bGC5pa55qGGIC0tPgogIDxyZWN0IHg9IjcwIiB5PSIxMjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMTIwIiByeD0iMTQiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iMTgwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7nrKwgbC0xIOWxgjwvdGV4dD4KICA8dGV4dCB4PSIxODAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiI+YeKBvcuh4oG7wrnigb48L3RleHQ+CiAgPHRleHQgeD0iMTgwIiB5PSIyMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPuS4iuS4gOWxgui+k+WHujwvdGV4dD4KCiAgPHJlY3QgeD0iNDkwIiB5PSIxMjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMTIwIiByeD0iMTQiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIxNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7nrKwgbCDlsYI8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMxZjI5MzciPnogPSBXwrdhICsgYjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzFmMjkzNyI+YSA9IGYoeik8L3RleHQ+CgogIDxyZWN0IHg9IjkxMCIgeT0iMTIwIiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjEyMCIgcng9IjE0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjEwMjAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZjI5MzciPuesrCBsKzEg5bGCPC90ZXh0PgogIDx0ZXh0IHg9IjEwMjAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiI+YeKBvcuh4oG+PC90ZXh0PgogIDx0ZXh0IHg9IjEwMjAiIHk9IjIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+6L+Z5bGC6L6T5Ye6IOKGkiDkuIvlsYLovpPlhaU8L3RleHQ+CgogIDwhLS0g566t5aS0IDEgLS0+CiAgPGxpbmUgeDE9IjI5NSIgeTE9IjE4MCIgeDI9IjQ3NSIgeTI9IjE4MCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjQ5MCwxODAgNDcwLDE3MSA0NzAsMTg5IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMzg1IiB5PSIxNjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YzYzZmYiPuW9k+S9nOi+k+WFpTwvdGV4dD4KCiAgPCEtLSDnrq3lpLQgMiAtLT4KICA8bGluZSB4MT0iNzE1IiB5MT0iMTgwIiB4Mj0iODk1IiB5Mj0iMTgwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iOTEwLDE4MCA4OTAsMTcxIDg5MCwxODkiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI4MDUiIHk9IjE2OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZjNjNmZiI+5b2T5L2c6L6T5YWlPC90ZXh0PgoKICA8IS0tIOW6lemDqOaOpeWKm+ivtOaYjiAtLT4KICA8cmVjdCB4PSI3MCIgeT0iMjg1IiB3aWR0aD0iMTA2MCIgaGVpZ2h0PSI2MCIgcng9IjEwIiBmaWxsPSIjZWVmMmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij7lkIzkuIDlpZfjgIzliqDmnYPmsYLlkowgKyDmv4DmtLvjgI3liqjkvZzvvIzlnKjmr4/kuIDlsYLph43lpI3kuIDpgY3jgIHlsYLkuI7lsYLmjqXlipvvvIzkuIDot6/nrpfliLDovpPlh7rlsYI8L3RleHQ+Cjwvc3ZnPgo=" alt="层与层接力示意" />

*图 1：每一层都把上一层的输出原封不动当作输入，同一套「加权求和 + 激活」动作层层接力。*

用 PyTorch 写，这个"接力"一目了然：

```python
a1 = torch.relu(self.layer1(x))        # 第一层：a⁽¹⁾ = f(W⁽¹⁾x + b⁽¹⁾)
out = torch.sigmoid(self.layer2(a1))   # 第二层：把 a⁽¹⁾ 当输入再算一遍
```

## 手算一遍：数据怎么从输入流到输出

公式看着抽象，我们用一个**迷你网络**实际走一遍：2 个输入、1 个隐藏层（2 个神经元）、1 个输出。

**已知**（权重假装是训练后学出来的定值）：

- 输入 $a^{(0)} = \begin{bmatrix}1 \\ 0\end{bmatrix}$（比如"有尖耳朵"、"没长胡须"两个特征）
- 第一层 $W^{(1)} = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8\end{bmatrix}$，$b^{(1)} = \begin{bmatrix}0 \\ 0\end{bmatrix}$，激活用 ReLU
- 第二层 $W^{(2)} = \begin{bmatrix}0.6 & -0.4\end{bmatrix}$，$b^{(2)} = [0]$，激活用 sigmoid

**先理清这两层各扮演什么角色**（带着这个看下面的数字就不晕）：

第一层 $W^{(1)}$ 是个 $2\times2$ 的表，**每一行 = 一个神经元对"耳朵、胡须"这两条输入各给的话语权**。具体到每个数：第一行 $[0.7,\ 0.5]$ 是神经元①的——对耳朵的话语权 $0.7$、对胡须 $0.5$；第二行 $[-0.3,\ 0.8]$ 是神经元②的——对耳朵 $-0.3$（负号是反向话语权：耳朵越尖它越反对）、对胡须 $0.8$。两个神经元并排分头把输入揉成两个"初步印象"，像流水线上两道粗加工。第二层 $W^{(2)}$ 只剩 $1\times2$ 一行，即一个神经元，它把第一层的两个初步印象**综合**成一个数来拍板。一句话概括分工：

- **第一层负责"特征提取"**：把原始线索揉成几个初步印象；
- **第二层负责"综合决策"**：把初步印象合成最终判断。

至于每个神经元具体"更看重耳朵还是胡须"，是训练从数据里学出来的——上面这组权重只是占位，用来演示矩阵怎么相乘，不代表真实学到的含义。

**第一层**（加权求和 → 激活）：

$$z^{(1)} = W^{(1)}a^{(0)} = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8\end{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix} = \begin{bmatrix}0.7 \\ -0.3\end{bmatrix} \;\xrightarrow{\text{ReLU}}\; a^{(1)} = \begin{bmatrix}0.7 \\ 0\end{bmatrix}$$

（ReLU 把负的 $-0.3$ 归零。）

**第二层**（拿 $a^{(1)}$ 当输入，再来一次）：

$$z^{(2)} = W^{(2)}a^{(1)} = \begin{bmatrix}0.6 & -0.4\end{bmatrix}\begin{bmatrix}0.7 \\ 0\end{bmatrix} = 0.42 \;\xrightarrow{\text{sigmoid}}\; a^{(2)} = \frac{1}{1+e^{-0.42}} \approx 0.60$$

（式中的 $e$ 是自然对数的底，约等于 2.718，是一个数学常数。）

**自检：** sigmoid 的输出必须落在 $(0,1)$ 区间，$0.60$ 在范围内 ✅；它表示"略倾向于'是猫'"——方向也合理 ✅。

这个 $0.60$ 就是这次前向传播的最终预测。注意 $a^{(1)}$ 怎么从"第一层的输出"变成"第二层的输入"，这就是"接力"的真实模样。

对照这次的结果看：输入是"有尖耳朵、没长胡须"，也就是 $[1,\ 0]$。第一层算的时候，那两个对"胡须"的话语权 $0.5$、$0.8$ 因为胡须输入是 $0$、乘出来还是 $0$，这次没派上用场——真正起作用的只有对"耳朵"的 $0.7$ 和 $-0.3$。于是第一层把这条输入揉成初步印象 $[0.7,\ -0.3]$，ReLU 后变 $[0.7,\ 0]$（第二个被打成负分、压住不发话）；第二层再综合成 $0.60$，意思是"略微像猫"。这也点出权重的一个性质：**权重是"潜在的话语权"，得看输入给不给它发挥的机会**——某条线索的输入若是 $0$，它的话语权再大也使不上劲。具体数字会随训练变化，但"**第一层提取、第二层综合**"这套分工不变。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQyMCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7ov7fkvaDnvZHnu5zmiYvnrpfvvJrmlbDmja7mgI7kuYjkuIDot6/lj5jlvaI8L3RleHQ+CgogIDwhLS0g6L6T5YWlIC0tPgogIDxyZWN0IHg9IjQwIiB5PSIxNzAiIHdpZHRoPSIxNzAiIGhlaWdodD0iMTAwIiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iMTI1IiB5PSIxOTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7ovpPlhaU8L3RleHQ+CiAgPHRleHQgeD0iMTI1IiB5PSIyMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiMxZjI5MzciPlsxLCAwXTwvdGV4dD4KICA8dGV4dCB4PSIxMjUiIHk9IjI1NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+YeKBveKBsOKBvjwvdGV4dD4KCiAgPCEtLSDnrKzkuIDlsYIgLS0+CiAgPHJlY3QgeD0iMzIwIiB5PSIxMjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMjAwIiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNDMwIiB5PSIxNDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7nrKzkuIDlsYLvvIhSZUxV77yJPC90ZXh0PgogIDx0ZXh0IHg9IjQzMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmI3MjgwIj7liqDmnYPmsYLlkowgeuKBvcK54oG+PC90ZXh0PgogIDx0ZXh0IHg9IjQzMCIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMWYyOTM3Ij5bMC43LCAtMC4zXTwvdGV4dD4KICA8bGluZSB4MT0iMzUwIiB5MT0iMjI2IiB4Mj0iNTEwIiB5Mj0iMjI2IiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNSA0Ii8+CiAgPHRleHQgeD0iNDMwIiB5PSIyNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPui/h+a/gOa0uyBh4oG9wrnigb48L3RleHQ+CiAgPHRleHQgeD0iNDMwIiB5PSIyODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj5bMC43LCAwXTwvdGV4dD4KICA8dGV4dCB4PSI0MzAiIHk9IjMwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzljYTNhZiI+LTAuMyDooqvlvZLpm7Y8L3RleHQ+CgogIDwhLS0g56ys5LqM5bGCIC0tPgogIDxyZWN0IHg9IjY4MCIgeT0iMTIwIiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjIwMCIgcng9IjEyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9Ijc5MCIgeT0iMTQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+56ys5LqM5bGC77yIc2lnbW9pZO+8iTwvdGV4dD4KICA8dGV4dCB4PSI3OTAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZiNzI4MCI+5Yqg5p2D5rGC5ZKMIHrigb3CsuKBvjwvdGV4dD4KICA8dGV4dCB4PSI3OTAiIHk9IjIwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzFmMjkzNyI+MC40MjwvdGV4dD4KICA8bGluZSB4MT0iNzEwIiB5MT0iMjI2IiB4Mj0iODcwIiB5Mj0iMjI2IiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNSA0Ii8+CiAgPHRleHQgeD0iNzkwIiB5PSIyNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPui/h+a/gOa0uyBh4oG9wrLigb48L3RleHQ+CiAgPHRleHQgeD0iNzkwIiB5PSIyODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj4wLjYwPC90ZXh0PgogIDx0ZXh0IHg9Ijc5MCIgeT0iMzA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOWNhM2FmIj7ljovnvKnliLAgKDAsMSk8L3RleHQ+CgogIDwhLS0g6L6T5Ye6IC0tPgogIDxyZWN0IHg9IjEwMTAiIHk9IjE3MCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMDAiIHJ4PSIxMiIgZmlsbD0iI2VlZjJmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSIxMDg1IiB5PSIxOTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7pooTmtYs8L3RleHQ+CiAgPHRleHQgeD0iMTA4NSIgeT0iMjI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+MC42MDwvdGV4dD4KICA8dGV4dCB4PSIxMDg1IiB5PSIyNTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPuOAjOaYr+eMq+OAjeamgueOhzwvdGV4dD4KCiAgPCEtLSDnrq3lpLQgLS0+CiAgPGxpbmUgeDE9IjIxNSIgeTE9IjIyMCIgeDI9IjMxMiIgeTI9IjIyMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjMyMCwyMjAgMzA1LDIxMiAzMDUsMjI4IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGxpbmUgeDE9IjU0NSIgeTE9IjIyMCIgeDI9IjY3MiIgeTI9IjIyMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8cG9seWdvbiBwb2ludHM9IjY4MCwyMjAgNjY1LDIxMiA2NjUsMjI4IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGxpbmUgeDE9IjkwNSIgeTE9IjIyMCIgeDI9IjEwMDIiIHkyPSIyMjAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSIxMDEwLDIyMCA5OTUsMjEyIDk5NSwyMjgiIGZpbGw9IiM2YzYzZmYiLz4KCiAgPCEtLSDlupXms6ggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIzNzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM2YjcyODAiPuavj+S4gOWxgumDveaYr+OAjOWFiOWKoOadg+axguWSjOOAgeWGjei/h+a/gOa0u+OAje+8jOe7k+aenOWOn+WwgeS4jeWKqOS6pOe7meS4i+S4gOWxguW9k+i+k+WFpTwvdGV4dD4KPC9zdmc+Cg==" alt="迷你网络手算数据流" />

*图 2：迷你网络手算全过程，数据从 [1, 0] 一路变形到预测值 0.60。*

## 前向 vs 反向：答题 与 对答案

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7orq3nu4Plvqrnjq/lm5vmraXvvJrliY3lkJHkvKDmkq3mmK/nrKzkuIDmraU8L3RleHQ+CgogIDwhLS0g5q2l6aqkIDEg5YmN5ZCR77yI6auY5Lqu77yJIC0tPgogIDxjaXJjbGUgY3g9IjIwMCIgY3k9IjIwMCIgcj0iNjgiIGZpbGw9IiM2YzYzZmYiIHN0cm9rZT0iIzRmNDZlNSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iMjAwIiB5PSIxOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiNmZmZmZmYiPuKRoCDliY3lkJHkvKDmkq08L3RleHQ+CiAgPHRleHQgeD0iMjAwIiB5PSIyMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNlZWYyZmYiPuetlOmimDwvdGV4dD4KCiAgPCEtLSDmraXpqqQgMiDmjZ/lpLEgLS0+CiAgPGNpcmNsZSBjeD0iNDcwIiBjeT0iMjAwIiByPSI2OCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI0NzAiIHk9IjE5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyI+4pGhIOeul+aNn+WksTwvdGV4dD4KICA8dGV4dCB4PSI0NzAiIHk9IjIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+5om55pS5PC90ZXh0PgoKICA8IS0tIOatpemqpCAzIOWPjeWQkSAtLT4KICA8Y2lyY2xlIGN4PSI3NDAiIGN5PSIyMDAiIHI9IjY4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9Ijc0MCIgeT0iMTkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij7ikaIg5Y+N5ZCR5Lyg5pKtPC90ZXh0PgogIDx0ZXh0IHg9Ijc0MCIgeT0iMjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj7mib7plJk8L3RleHQ+CgogIDwhLS0g5q2l6aqkIDQg5pu05pawIC0tPgogIDxjaXJjbGUgY3g9IjEwMDAiIGN5PSIyMDAiIHI9IjY4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjEwMDAiIHk9IjE5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyI+4pGjIOabtOaWsOadg+mHjTwvdGV4dD4KICA8dGV4dCB4PSIxMDAwIiB5PSIyMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPuaUueatozwvdGV4dD4KCiAgPCEtLSDlvKflvaLnrq3lpLTkuLLotbfmnaUgLS0+CiAgPHBhdGggZD0iTSAyNjggMjAwIFEgMzUwIDE1MCA0MDIgMjAwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0ibm9uZSIvPgogIDxwb2x5Z29uIHBvaW50cz0iNDAyLDIwMCAzODgsMTkwIDM4OCwyMTAiIGZpbGw9IiM2YzYzZmYiLz4KICA8cGF0aCBkPSJNIDUzOCAyMDAgUSA2MjAgMTUwIDY3MiAyMDAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI2NzIsMjAwIDY1OCwxOTAgNjU4LDIxMCIgZmlsbD0iIzZjNjNmZiIvPgogIDxwYXRoIGQ9Ik0gODA4IDIwMCBRIDg5MCAxNTAgOTMyIDIwMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiLz4KICA8cG9seWdvbiBwb2ludHM9IjkzMiwyMDAgOTE4LDE5MCA5MTgsMjEwIiBmaWxsPSIjNmM2M2ZmIi8+CgogIDwhLS0g5b6q546v5Zue546v566t5aS0IC0tPgogIDxwYXRoIGQ9Ik0gMTAwMCAyNjggUSA2MDAgMzMwIDIwMCAyNjgiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIiBzdHJva2UtZGFzaGFycmF5PSI2IDUiLz4KICA8cG9seWdvbiBwb2ludHM9IjIwMCwyNjggMjE0LDI2MCAyMTQsMjc4IiBmaWxsPSIjYzRiNWZkIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIzMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YjcyODAiPuS4jeaWreW+queOr++8jOe9kee7nOS4gOeCueeCueWtpuS8muS7u+WKoTwvdGV4dD4KCiAgPHRleHQgeD0iMjAwIiB5PSIxMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIj7mnKzmlofkuLvop5I8L3RleHQ+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjEyNCIgeDI9IjIwMCIgeTI9IjEzMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KPC9zdmc+Cg==" alt="训练循环四步" />

*图 3：训练循环的四个步骤，前向传播站在第一个位置。*

前向传播从不单独存在——它是训练循环里的**第一步**。完整的训练循环是四步：

1. **前向传播**（答题）：数据流过网络，得到预测。
2. **算损失**（批改）：预测和正确答案一比，差多少（这个差叫**损失 / loss**）。
3. **反向传播**（找错）：从输出往回算，揪出每个权重该为误差负多少责任。
4. **更新权重**（改正）：真的把权重挪一点点。

所以前向和反向是**一对**：前向是"答题"、反向是"对答案并改话语权"。但有件事要划清——**模型训练好之后，预测新数据时只跑前向传播，不需要反向**。前向是"用"网络，反向是"改"网络。

## 前向传播在 AI 里的位置

- **推理（inference）的全部**：模型训练好、部署出去之后，每来一条新数据，就是跑一次前向传播。你用人脸解锁手机、相册自动识猫，背后都是一次毫秒级的前向传播。
- **大模型也一样**：你给 ChatGPT 打一句话、它吐出回答，核心就是一次（超大规模的）前向传播——只是层数和参数量大到惊人。
- **它是理解反向传播的前提**：反向传播要沿着前向走过的路"原路返回"算账，所以不懂前向，就没法懂反向。

## 小结

前向传播是神经网络**做预测时数据流动的方式**：从输入层开始，每一层做一次"加权求和 $W a + b$ + 激活 $f(z)$"，把结果交给下一层当输入，一路算到输出层得到预测值。它是"答题"，和"对答案、改权重"的反向传播是一对；模型训练好之后，每一次预测都只跑前向——从手机识猫到 ChatGPT 回话，骨子里都是它。

## 完整代码

下面这个最小网络演示一次完整的前向传播：数据从输入层流过隐藏层、再到输出层，每层都是"加权求和 + 激活"。重点看 `TinyNet.forward` 里每一行注释，和上面的公式逐条对应。代码末尾还接了一个训练步，让你看清前向传播在"预测 → 算损失 → 反向 → 更新"这个循环里站在第一个位置。

```python
import torch
import torch.nn as nn

# ===== 定义一个两层小网络，演示前向传播 =====
class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(2, 2)   # 输入层(2) → 隐藏层(2)：内部自带 W⁽¹⁾ 和 b⁽¹⁾
        self.layer2 = nn.Linear(2, 1)   # 隐藏层(2) → 输出层(1)：内部自带 W⁽²⁾ 和 b⁽²⁾

    # forward 方法定义"数据怎么从输入流到输出"，调用模型时 PyTorch 会自动执行它
    def forward(self, x):
        z1 = self.layer1(x)             # 第一层加权求和 z⁽¹⁾ = W⁽¹⁾x + b⁽¹⁾
        a1 = torch.relu(z1)             # 第一层激活 a⁽¹⁾ = f(z⁽¹⁾)
        z2 = self.layer2(a1)            # 第二层加权求和（注意输入是上一层的输出 a⁽¹⁾）
        a2 = torch.sigmoid(z2)          # 第二层激活 → 这就是最终的预测值
        return a2

# ===== 准备数据 + 实例化网络 =====
torch.manual_seed(42)
net = TinyNet()
X = torch.tensor([[1., 0.],   # 一条样本：2 个特征
                  [0., 1.]])  # 另一条样本（一次前向传播能同时处理多条数据）

# ===== 前向传播：把数据流过网络，得到预测 =====
pred = net(X)
print("前向传播得到的预测值：")
print(pred)

# ===== 演示前向在训练循环里的位置（前向是第 1 步）=====
target = torch.tensor([[1.], [0.]])     # 假装正确的标签
loss_fn = nn.MSELoss()
opt = torch.optim.SGD(net.parameters(), lr=0.1)

loss = loss_fn(pred, target)            # 第 2 步：算损失
opt.zero_grad()
loss.backward()                         # 第 3 步：反向传播（沿前向的路原路返回算账）
opt.step()                              # 第 4 步：更新权重
print(f"训练一步后的 loss: {loss.item():.4f}")
```

运行后，`pred` 就是网络对两条样本各做一次前向传播得到的预测值；后面几行则演示了前向传播作为训练循环第一步之后，紧接着会发生什么。

## 参考资料

1. 前向传播、反向传播和计算图 - 《动手学深度学习》
   https://zh.d2l.ai/chapter_multilayer-perceptrons/backprop.html
2. Forwardpropagation - ML Glossary
   https://ml-cheatsheet.readthedocs.io/en/latest/forwardpropagation.html
3. 什么是反向传播（含前向传递说明）- IBM
   https://www.ibm.com/cn-zh/think/topics/backpropagation
