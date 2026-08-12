---
title: 残差连接是什么
date: 2026-08-12 14:16
tags: [AI]
excerpt: 网络堆得越深，效果反而越差——这个反直觉的“退化问题”一度卡住整个深度学习。本文用在原稿上标改动 vs 整篇重写的生活类比、y=F(x)+x 的逐符号公式、梯度里那个关键的 +1，加一个能跑的 PyTorch 残差块，讲清残差连接如何让几十上百层的超深网络真正可训练——从 ResNet 到 Transformer 都靠它。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDkuLvot6/lvoTov57nur8gRih4KSAtLT4KICA8ZyBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zMCkiIHN0cm9rZS13aWR0aD0iMS44IiBmaWxsPSJub25lIj4KICAgIDxsaW5lIHgxPSIyMTIiIHkxPSIzMTUiIHgyPSIyOTAiIHkyPSIzMTUiLz4KICAgIDxsaW5lIHgxPSI0MzAiIHkxPSIzMTUiIHgyPSI0OTAiIHkyPSIzMTUiLz4KICAgIDxsaW5lIHgxPSI2MzAiIHkxPSIzMTUiIHgyPSI2NjgiIHkyPSIzMTUiLz4KICAgIDxsaW5lIHgxPSI3MzIiIHkxPSIzMTUiIHgyPSI4MjAiIHkyPSIzMTUiLz4KICA8L2c+CgogIDwhLS0g5o235b6EIHNraXAgY29ubmVjdGlvbu+8mueyl+S6rueZveW8p+e6v++8jOS7jui+k+WFpSB4IOebtOaOpei3qOWIsCArIOiKgueCuSAtLT4KICA8cGF0aCBkPSJNIDE3MCAyNzUgUSA0NDAgMTEwIDcwMCAyODMiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjk2KSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDx0ZXh0IHg9IjQ0MCIgeT0iOTYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zdHlsZT0iaXRhbGljIj7mjbflvoTvvJrmioogeCDnm7TmjqXpgIHov4fljrs8L3RleHQ+CgogIDwhLS0g5Li75bmyIEYoeCnvvJrkuKTkuKrmnYPph43lsYIgLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE0KSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIiBzdHJva2Utd2lkdGg9IjIiPgogICAgPHJlY3QgeD0iMjkwIiB5PSIyNzUiIHdpZHRoPSIxNDAiIGhlaWdodD0iODAiIHJ4PSIxMCIvPgogICAgPHJlY3QgeD0iNDkwIiB5PSIyNzUiIHdpZHRoPSIxNDAiIGhlaWdodD0iODAiIHJ4PSIxMCIvPgogIDwvZz4KICA8ZyBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBmb250LXNpemU9IjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+CiAgICA8dGV4dCB4PSIzNjAiIHk9IjMyMiI+5p2D6YeN5bGCPC90ZXh0PgogICAgPHRleHQgeD0iNTYwIiB5PSIzMjIiPuadg+mHjeWxgjwvdGV4dD4KICA8L2c+CiAgPHRleHQgeD0iNDI1IiB5PSIzODUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44MCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiPuS4u+W5siBGKHgpPC90ZXh0PgoKICA8IS0tIOebuOWKoOiKgueCuSArIC0tPgogIDxjaXJjbGUgY3g9IjcwMCIgY3k9IjMxNSIgcj0iMzIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yMCkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjcwMCIgeT0iMzI3IiBmb250LXNpemU9IjM0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJib2xkIj4rPC90ZXh0PgoKICA8IS0tIOi+k+WFpSB4IC0tPgogIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjMxNSIgcj0iNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45MikiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMTcwIiB5PSIzMjciIGZvbnQtc2l6ZT0iMzQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zdHlsZT0iaXRhbGljIj54PC90ZXh0PgoKICA8IS0tIOi+k+WHuiB5IC0tPgogIDxjaXJjbGUgY3g9Ijg2MCIgY3k9IjMxNSIgcj0iNDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45MikiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iODYwIiB5PSIzMjciIGZvbnQtc2l6ZT0iMzQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zdHlsZT0iaXRhbGljIj55PC90ZXh0PgoKICA8IS0tIOagh+mimCAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjUwMCIgZm9udC1zaXplPSI4NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5q6L5beu6L+e5o6lPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTQ4IiBmb250LXNpemU9IjI4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+UmVzaWR1YWwgQ29ubmVjdGlvbjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU5MyIgZm9udC1zaXplPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgbGV0dGVyLXNwYWNpbmc9IjMiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="残差连接封面" />

如果你读过《前向传播是什么》，应该还记得那个比喻——神经网络像一条**流水线**：数据从输入层进，每层加工一下交给下一层。听起来“层越多，加工越细，效果越好”对吧？但 2015 年何恺明团队撞上了一件反直觉的怪事：**把网络从 20 层堆到 56 层，精度反而更差了**。注意这**不是过拟合**（训练集上也在变差），而是网络干脆“学不动了”——这个现象有个专门的名字，叫**退化问题**（degradation problem）。

他们的解决方案，就是这一篇的主角——**残差连接**（residual connection，又叫 skip connection / 捷径连接）。就这一个改动，让网络能一路堆到 152 层还照常训练，催生它的论文《Deep Residual Learning for Image Recognition》也成了 AI 史上被引用最多的论文之一。

一句话定义：残差连接是**在网络层旁边架一条“捷径”，把这一层的输入 $x$ 直接加到输出上**，让最终输出变成 $y = F(x) + x$。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQyMCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPumAgOWMlumXrumimO+8muWxguWghuW+l+i2iua3se+8jOaZrumAmue9kee7nOWPjeiAjOi2iuW3rjwvdGV4dD4KCiAgPCEtLSDlnZDmoIfovbQgLS0+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjM0MCIgeDI9IjEwODAiIHkyPSIzNDAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjM0MCIgeDI9IjE3MCIgeTI9IjkwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTA4MCwzNDAgMTA2OCwzMzQgMTA2OCwzNDYiIGZpbGw9IiM5Y2EzYWYiLz4KICA8cG9seWdvbiBwb2ludHM9IjE3MCw5MCAxNjQsMTAyIDE3NiwxMDIiIGZpbGw9IiM5Y2EzYWYiLz4KCiAgPCEtLSDovbTmoIfnrb4gLS0+CiAgPHRleHQgeD0iMTA5NSIgeT0iMzQ2IiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNjAwIj7nvZHnu5zmt7HluqY8L3RleHQ+CiAgPHRleHQgeD0iMTcwIiB5PSI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjYwMCI+6K6t57uD6K+v5beuPC90ZXh0PgoKICA8IS0tIHgg5Yi75bqmIC0tPgogIDxnIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPGxpbmUgeDE9IjI2MCIgeTE9IjM0MCIgeDI9IjI2MCIgeTI9IjM0NiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9IjI2MCIgeT0iMzY2Ij4yMCDlsYI8L3RleHQ+CiAgICA8bGluZSB4MT0iNDgwIiB5MT0iMzQwIiB4Mj0iNDgwIiB5Mj0iMzQ2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHRleHQgeD0iNDgwIiB5PSIzNjYiPjM0IOWxgjwvdGV4dD4KICAgIDxsaW5lIHgxPSI3MjAiIHkxPSIzNDAiIHgyPSI3MjAiIHkyPSIzNDYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSI3MjAiIHk9IjM2NiI+NTAg5bGCPC90ZXh0PgogICAgPGxpbmUgeDE9Ijk0MCIgeTE9IjM0MCIgeDI9Ijk0MCIgeTI9IjM0NiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICAgIDx0ZXh0IHg9Ijk0MCIgeT0iMzY2Ij41NiDlsYI8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOaZrumAmue9kee7nO+8muivr+W3rumaj+a3seW6puS4iuWNh++8iOeBsOiZmue6v++8iSAtLT4KICA8cG9seWxpbmUgcG9pbnRzPSIyNjAsMjU4IDQ4MCwyMjIgNzIwLDE4MSA5NDAsMTU3IiBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgOCIvPgogIDxjaXJjbGUgY3g9IjI2MCIgY3k9IjI1OCIgcj0iNyIgZmlsbD0iIzljYTNhZiIvPgogIDxjaXJjbGUgY3g9IjQ4MCIgY3k9IjIyMiIgcj0iNyIgZmlsbD0iIzljYTNhZiIvPgogIDxjaXJjbGUgY3g9IjcyMCIgY3k9IjE4MSIgcj0iNyIgZmlsbD0iIzljYTNhZiIvPgogIDxjaXJjbGUgY3g9Ijk0MCIgY3k9IjE1NyIgcj0iNyIgZmlsbD0iIzljYTNhZiIvPgogIDx0ZXh0IHg9Ijk3MCIgeT0iMTUwIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmI3MjgwIiBmb250LXdlaWdodD0iNjAwIj7mma7pgJrnvZHnu5w8L3RleHQ+CiAgPHRleHQgeD0iOTcwIiB5PSIxNzAiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiPuWxgui2iua3seivr+W3ruWPjeiAjOabtOmrmDwvdGV4dD4KCiAgPCEtLSDmrovlt67nvZHnu5zvvJror6/lt67pmo/mt7HluqbkuIvpmY3vvIjntKvlrp7nur/vvIkgLS0+CiAgPHBvbHlsaW5lIHBvaW50cz0iMjYwLDE5OCA0ODAsMjM0IDcyMCwyNTggOTQwLDI3MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSIyNjAiIGN5PSIxOTgiIHI9IjgiIGZpbGw9IiM2YzYzZmYiLz4KICA8Y2lyY2xlIGN4PSI0ODAiIGN5PSIyMzQiIHI9IjgiIGZpbGw9IiM2YzYzZmYiLz4KICA8Y2lyY2xlIGN4PSI3MjAiIGN5PSIyNTgiIHI9IjgiIGZpbGw9IiM2YzYzZmYiLz4KICA8Y2lyY2xlIGN4PSI5NDAiIGN5PSIyNzAiIHI9IjgiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI5NzAiIHk9IjI3NiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjYwMCI+5q6L5beu572R57ucPC90ZXh0PgogIDx0ZXh0IHg9Ijk3MCIgeT0iMjk2IiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTc4YmZhIj7lsYLotormt7Hor6/lt67mm7TkvY48L3RleHQ+CgogIDwhLS0g5rOo6Kej566t5aS0IC0tPgogIDx0ZXh0IHg9IjQyMCIgeT0iNDAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3Ij7liqDkuIrmrovlt67mjbflvoTlkI7vvIw1NiDlsYLnu4jkuo7kuI3lho3jgIzlrabkuI3liqjjgI3vvIzmt7HlsYLkvJjlir/lvpfku6XlhZHnjrA8L3RleHQ+Cjwvc3ZnPgo=" alt="退化问题曲线" />

*图 1：退化问题——普通网络堆到 56 层训练误差反而比 20 层更高；引入残差后，层越深误差越低。*

## 主类比：在原稿上改，而不是重写

想象一份文档依次过 10 位编辑。每位编辑有两种工作方式：

- **没有捷径**：每位编辑把上一位的稿子**整个重写一遍**。哪怕只想改一个标点，也得把全文重新誊抄——10 个人誊抄下来，错别字越攒越多，原意都走样了。
- **有捷径**：每位编辑**只在原稿上标改动**（画个圈、加个批注），原稿本身一路原封不动往下传。最终稿子 = 原稿 + 所有批注。

残差连接走的就是第二条路。原稿就是 $x$，编辑的批注就是 $F(x)$，最终输出 $y = F(x) + x$。最大的好处在这里：**如果某位编辑觉得“这版已经挺好、不用改”，他只需让批注为零（$F(x)=0$），文档就原样传下去**。换句话说，加一层最差也就是“什么都没干”，不会越改越糟——这就是退化问题被治住的根。

## 公式：朴素得惊人，却改变了深度学习

残差连接的核心公式，朴素得让人意外：

$$y = F(x) + x$$

**符号逐项解读：**

- $x$ —— 这一层的**输入**（上一层传过来的东西，对应类比里的“原稿”）。
- $F(x)$ —— 这一层**主干路径**学到的东西（对应“批注”）。$F$ 可以是一两层卷积或全连接，也可以是 Transformer 里的一个注意力子层。
- $+x$ —— **残差连接**（捷径）：把输入绕过 $F$ 直接加到输出上。注意是“加”不是“拼接”——所以 $x$ 和 $F(x)$ 的形状必须一样大；不一样时，主干会额外加一个小变换把 $x$ 调成和 $F(x)$ 同形状再相加（ResNet 里的常见做法是 $1\times1$ 卷积，这篇了解即可）。
- $y$ —— 这一层的**输出**，交给下一层。

**为什么这能解决退化？** 直觉就一句：**深层最差也是恒等映射（也就是原样输出 $y=x$）**。没有捷径时，深层要硬学一个恒等映射反而难；有了捷径，把 $F(x)$ 学成 0 就行，轻而易举。所以 56 层的误差**最多和 20 层持平、不会更差**——退化问题被釜底抽薪。

它还顺手缓解了另一个老大难——**梯度消失**。训练时梯度沿 $y = F(x) + x$ 对 $x$ 求导：

$$\frac{\partial y}{\partial x} = \frac{\partial F(x)}{\partial x} + 1$$

那个 **$+1$** 是点睛之笔：哪怕主干把梯度压到几乎为零（$\partial F/\partial x \approx 0$），总梯度仍至少是 1，**误差信号永远有一条“直通”的路回到最初的层**。于是几十、上百层的网络也能正常训练。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQ2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuair+W6puWbnua1ge+8muaui+W3rumHjOmCo+S4quOAjCsx44CN5piv55u06YCa5bqV5bGC55qE6auY6YCf5YWs6LevPC90ZXh0PgoKICA8IS0tIOWPjeWQkeS8oOaSreaWueWQkeagh+azqCAtLT4KICA8dGV4dCB4PSIxMjAiIHk9IjExMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzljYTNhZiIgZm9udC13ZWlnaHQ9IjYwMCI+5qKv5bqm5pa55ZCRIOKGkTwvdGV4dD4KICA8bGluZSB4MT0iMTIwIiB5MT0iMjAwIiB4Mj0iMTIwIiB5Mj0iMTIwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTIwLDEyMCAxMTQsMTMyIDEyNiwxMzIiIGZpbGw9IiM5Y2EzYWYiLz4KCiAgPCEtLSDpobbpg6jvvJrkvKDlm57lupXlsYIgLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiMxZjI5MzciPuKGkiDkuIDot6/kvKDlm57mnIDlupXlsYI8L3RleHQ+CgogIDwhLS0gPT09PT09PT09IOW3pu+8muS4u+W5sui3r+W+hO+8iOair+W6pumAkOWxguihsOWHj++8iSA9PT09PT09PT0gLS0+CiAgPHRleHQgeD0iMzUwIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YjcyODAiPuS4u+W5sui3r+W+hCBGPC90ZXh0PgogIDwhLS0gRjMgLS0+CiAgPHJlY3QgeD0iMjkwIiB5PSIxNTAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDYiIHJ4PSIxMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjM1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij7nrKwgMyDlsYIgRjwvdGV4dD4KICA8IS0tIOeBsOiJsuS4iueureWktO+8iOi+g+eyl++8iSAtLT4KICA8bGluZSB4MT0iMzUwIiB5MT0iMTUwIiB4Mj0iMzUwIiB5Mj0iMTIwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzUwLDEyMCAzNDQsMTMyIDM1NiwxMzIiIGZpbGw9IiM5Y2EzYWYiLz4KCiAgPGxpbmUgeDE9IjM1MCIgeTE9IjI0NiIgeDI9IjM1MCIgeTI9IjIxNiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjM1MCwyMTYgMzQ0LDIyOCAzNTYsMjI4IiBmaWxsPSIjOWNhM2FmIi8+CiAgPCEtLSBGMiAtLT4KICA8cmVjdCB4PSIyOTAiIHk9IjI0NiIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0NiIgcng9IjEwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iMzUwIiB5PSIyNzYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPuesrCAyIOWxgiBGPC90ZXh0PgoKICA8bGluZSB4MT0iMzUwIiB5MT0iMzQyIiB4Mj0iMzUwIiB5Mj0iMzEyIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzUwLDMxMiAzNDQsMzI0IDM1NiwzMjQiIGZpbGw9IiM5Y2EzYWYiLz4KICA8IS0tIEYxIC0tPgogIDxyZWN0IHg9IjI5MCIgeT0iMzQyIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQ2IiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSIzNTAiIHk9IjM3MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyI+56ysIDEg5bGCIEY8L3RleHQ+CgogIDx0ZXh0IHg9IjM1MCIgeT0iNDEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIj7iiIJGL+KIgngg6KKr5Y+N5aSN57yp5pS+PC90ZXh0PgogIDx0ZXh0IHg9IjM1MCIgeT0iNDMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOWNhM2FmIj7otorlvoDlupXotormjqXov5EgMDwvdGV4dD4KCiAgPCEtLSA9PT09PT09PT0g5Y+z77ya5q6L5beu5o235b6E77yI5qKv5bqmICsxIOebtOmAmu+8iSA9PT09PT09PT0gLS0+CiAgPHRleHQgeD0iNzgwIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPuaui+W3ruaNt+W+hDwvdGV4dD4KICA8IS0tIOS4gOadoeeyl+e0q+e6v+ebtOmAmiAtLT4KICA8bGluZSB4MT0iNzgwIiB5MT0iMzg4IiB4Mj0iNzgwIiB5Mj0iMTIwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNzgwLDEyMCA3NzIsMTM2IDc4OCwxMzYiIGZpbGw9IiM2YzYzZmYiLz4KCiAgPCEtLSArMSDlvr3nq6AgLS0+CiAgPGNpcmNsZSBjeD0iNzgwIiBjeT0iMTgwIiByPSIyMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI3ODAiIHk9IjE4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+KzE8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNzgwIiBjeT0iMjc2IiByPSIyMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI3ODAiIHk9IjI4MyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+KzE8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNzgwIiBjeT0iMzcyIiByPSIyMCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI3ODAiIHk9IjM3OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+KzE8L3RleHQ+CgogIDx0ZXh0IHg9Ijc4MCIgeT0iNDEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNjAwIj7mr4/lsYLpg73nmb3pgIHkuIDkuKogKzE8L3RleHQ+CiAgPHRleHQgeD0iNzgwIiB5PSI0MzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNhNzhiZmEiPuivr+W3ruS/oeWPt+awuOS4jeW9kumbtjwvdGV4dD4KCiAgPCEtLSDkuK3pl7TliIbpmpTomZrnur8gLS0+CiAgPGxpbmUgeDE9IjU2MCIgeTE9IjEyMCIgeDI9IjU2MCIgeTI9IjQ0MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1kYXNoYXJyYXk9IjggOCIvPgoKICA8IS0tIOW6lemDqOWFrOW8jyAtLT4KICA8cmVjdCB4PSI5MDAiIHk9IjM5MiIgd2lkdGg9IjI1MCIgaGVpZ2h0PSI1MCIgcng9IjEyIiBmaWxsPSIjZWRlOWZlIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjEwMjUiIHk9IjQyMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+4oiCeS/iiIJ4ID0g4oiCRi/iiIJ4ICsgMTwvdGV4dD4KPC9zdmc+Cg==" alt="残差梯度回流高速公路" />

*图 2：反向传播时，主干路径的梯度 ∂F/∂x 逐层缩放、容易衰减；残差捷径每层白送一个 +1，给误差信号留了一条永不归零的直通路。*

## 手算一遍：捷径到底加了什么

假装某一层的输入是一个 2 维特征 $x = \begin{bmatrix}1.0 \\ 2.0\end{bmatrix}$，主干 $F$ 学到的输出是 $\begin{bmatrix}0.3 \\ -0.5\end{bmatrix}$。

**没有残差连接**（普通层）：输出就是 $F(x)$：

$$y = F(x) = \begin{bmatrix}0.3 \\ -0.5\end{bmatrix}$$

原始信号 $[1.0, 2.0]$ 在这一层就被“冲掉”了，全靠 $F$ 自己重新构造。

**有残差连接**：把输入直接加回来：

$$y = F(x) + x = \begin{bmatrix}0.3 \\ -0.5\end{bmatrix} + \begin{bmatrix}1.0 \\ 2.0\end{bmatrix} = \begin{bmatrix}1.3 \\ 1.5\end{bmatrix}$$

**自检：** 结果 $[1.3, 1.5]$ 正好是“原输入微调一点点”——$F(x)=[0.3,-0.5]$ 只是在原值上各挪了零点几，方向和量级都对得上 ✅。这就是残差的真面目：**网络学的不是“从零画出目标”，而是“在输入的基础上微调多少”**（残差 = 目标 − 输入）。

用 PyTorch 写，这条捷径就是一行加法：

```python
y = self.main(x) + x   # F(x) + x：主干 + 捷径
```

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuaui+W3riA9IOi+k+WFpSArIOW+ruiwg++8mui+k+WHuuaAu+aYr+OAjOWcqOi+k+WFpeS4iuaMquS4gOeCueeCueOAjTwvdGV4dD4KCiAgPCEtLSDln7rnur8gLS0+CiAgPGxpbmUgeDE9IjE2MCIgeTE9IjI2MCIgeDI9IjEwNDAiIHkyPSIyNjAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iMTUwIiB5PSIyNjYiIHRleHQtYW5jaG9yPSJlbmQiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiPjA8L3RleHQ+CgogIDwhLS0gPT09PT09PT09IOe7hDHvvJrovpPlhaUgeCA9PT09PT09PT0gLS0+CiAgPHRleHQgeD0iMzAwIiB5PSI5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+6L6T5YWlIHg8L3RleHQ+CiAgPCEtLSBkaW0wID0gMS4wIC0tPgogIDxyZWN0IHg9IjI3MCIgeT0iMjAwIiB3aWR0aD0iNDAiIGhlaWdodD0iNjAiIGZpbGw9IiNhNzhiZmEiIHJ4PSIzIi8+CiAgPHRleHQgeD0iMjkwIiB5PSIxOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPjEuMDwvdGV4dD4KICA8IS0tIGRpbTEgPSAyLjAgLS0+CiAgPHJlY3QgeD0iMzMwIiB5PSIxNDAiIHdpZHRoPSI0MCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiM2YzYzZmYiIHJ4PSIzIi8+CiAgPHRleHQgeD0iMzUwIiB5PSIxMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPjIuMDwvdGV4dD4KICA8dGV4dCB4PSIzMTAiIHk9IjMzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiI+5Y6f5aeL5L+h5Y+3PC90ZXh0PgoKICA8IS0tICsg5Y+3IC0tPgogIDxjaXJjbGUgY3g9IjQzMCIgY3k9IjIyMCIgcj0iMjQiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNDMwIiB5PSIyMjkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPis8L3RleHQ+CgogIDwhLS0gPT09PT09PT09IOe7hDLvvJpGKHgpIOW+ruiwgyA9PT09PT09PT0gLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+Rih4KSDlvq7osIM8L3RleHQ+CiAgPCEtLSBkaW0wID0gMC4zIC0tPgogIDxyZWN0IHg9IjU3MCIgeT0iMjQyIiB3aWR0aD0iNDAiIGhlaWdodD0iMTgiIGZpbGw9IiNjNGI1ZmQiIHJ4PSIzIi8+CiAgPHRleHQgeD0iNTkwIiB5PSIyMzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPjAuMzwvdGV4dD4KICA8IS0tIGRpbTEgPSAtMC41IOWQkeS4iyAtLT4KICA8cmVjdCB4PSI2MzAiIHk9IjI2MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjMwIiBmaWxsPSIjZDFkNWRiIiByeD0iMyIvPgogIDx0ZXh0IHg9IjY1MCIgeT0iMzA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij7iiJIwLjU8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIzMzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiPuS4u+W5suWtpuWIsOeahOWBj+enu+mHjzwvdGV4dD4KCiAgPCEtLSA9IOWPtyAtLT4KICA8Y2lyY2xlIGN4PSI3MzAiIGN5PSIyMjAiIHI9IjI0IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjczMCIgeT0iMjI5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjNmM2M2ZmIj49PC90ZXh0PgoKICA8IS0tID09PT09PT09PSDnu4Qz77ya6L6T5Ye6IHkgPT09PT09PT09IC0tPgogIDx0ZXh0IHg9IjkwMCIgeT0iOTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPui+k+WHuiB5PC90ZXh0PgogIDwhLS0gZGltMCA9IDEuMyAtLT4KICA8cmVjdCB4PSI4NzAiIHk9IjE4MiIgd2lkdGg9IjQwIiBoZWlnaHQ9Ijc4IiBmaWxsPSIjYTc4YmZhIiByeD0iMyIvPgogIDx0ZXh0IHg9Ijg5MCIgeT0iMTc0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij4xLjM8L3RleHQ+CiAgPCEtLSBkaW0xID0gMS41IC0tPgogIDxyZWN0IHg9IjkzMCIgeT0iMTcwIiB3aWR0aD0iNDAiIGhlaWdodD0iOTAiIGZpbGw9IiM2YzYzZmYiIHJ4PSIzIi8+CiAgPHRleHQgeD0iOTUwIiB5PSIxNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPjEuNTwvdGV4dD4KICA8dGV4dCB4PSI5MTAiIHk9IjMzMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiI+4omIIOWOn+i+k+WFpe+8jOS7heW+ruiwgzwvdGV4dD4KPC9zdmc+Cg==" alt="残差等于输入加微调的数值条形图" />

*图 3：把数字画成条形图：输出 y 正好是输入 x 各维「挪一点点」的结果，残差学的是微调量而非从零构造。*

## 它在 AI 里的位置：无处不在的“标准件”

残差连接如今是深度学习的基础设施，几乎所有现代网络都在用：

- **ResNet**（它诞生的地方）：让图像识别网络从二十几层跨到 152 层，拿下 2015 年 ImageNet 冠军，从此“深”才真的深得起来。
- **Transformer / 大模型**：你用的 ChatGPT、Claude 背后都是 Transformer，它的**每一个子层**——无论自注意力（self-attention）还是前馈网络（FFN）——外面都套了一圈残差连接，再接一层归一化，业内合称“Add & Norm”。没有它，几十上百层的 Transformer 根本训不动。
- **几乎所有现代架构**：从图像（ResNet 家族）、检测分割，到语音、推荐，再到如今的大语言模型，“层 + 残差”几乎是默认搭配。

一句话总结它在 AI 体系里的位置：**它是让“超深网络”从“理想”变成“现实”的那块关键拼图**——和注意力机制、反向传播等概念紧密关联，可以把它当成理解现代深度网络结构的必经一站。

## 小结

残差连接是**在网络层旁边架的一条捷径**：把输入 $x$ 绕过主干 $F$ 直接加到输出，使 $y = F(x) + x$。它一来治住“网络越深效果越差”的退化问题（深层最差也能学成恒等映射 $y=x$），二来靠梯度里那个 $+1$ 给误差信号留了条直通路、缓解梯度消失。从 ResNet 的 152 层到 Transformer 每个子层的 Add & Norm，它让超深网络真正可训练，是现代深度学习不可或缺的“标准件”。

## 完整代码

下面定义一个最小的**残差块**（两层全连接当主干 + 一条捷径），和普通块对比，跑一次前向 + 一步训练。重点看 `ResidualBlock.forward` 里 `out + x` 那一行——它就是 $y = F(x) + x$ 的全部实现。

```python
import torch
import torch.nn as nn

# ===== 残差块：主干 F(x) 是两层全连接，捷径把 x 直接加回来 =====
class ResidualBlock(nn.Module):
    def __init__(self, dim):
        super().__init__()
        # 主干 F(x)：两个全连接层，保持输出维度=输入维度，才能和 x 相加
        self.fc1 = nn.Linear(dim, dim)
        self.fc2 = nn.Linear(dim, dim)

    def forward(self, x):
        F = torch.relu(self.fc1(x))   # 第一层：加权求和 + ReLU
        F = self.fc2(F)               # 第二层：再过一层全连接（不激活，准备相加）
        out = F + x                   # ★ 残差连接：y = F(x) + x，就这一行
        return torch.relu(out)        # 相加后再过 ReLU（ResNet 残差块的常规做法）

# ===== 对比：普通块（没有捷径，纯堆两层）=====
class PlainBlock(nn.Module):
    def __init__(self, dim):
        super().__init__()
        self.fc1 = nn.Linear(dim, dim)
        self.fc2 = nn.Linear(dim, dim)

    def forward(self, x):
        out = torch.relu(self.fc1(x))  # 第一层
        out = self.fc2(out)            # 第二层
        return torch.relu(out)         # 没有 + x：输入 x 在这里就被冲掉了

# ===== 跑一次前向 + 一步训练，看残差块怎么工作 =====
torch.manual_seed(42)
block = ResidualBlock(dim=4)           # 4 维输入
x = torch.randn(2, 4)                  # 假数据：2 条样本，每条 4 维

out = block(x)                         # 前向传播：y = F(x) + x
print("残差块输出形状：", out.shape)    # 和输入 x 形状一致，能继续堆更多块

# 演示一步训练，体会梯度能顺着捷径 +1 流回输入
target = torch.randn(2, 4)
loss_fn = nn.MSELoss()
opt = torch.optim.SGD(block.parameters(), lr=0.1)

loss = loss_fn(out, target)            # 算损失
opt.zero_grad()
loss.backward()                        # 反向传播：梯度沿 out=F+x 流回，∂out/∂x = ∂F/∂x + 1
opt.step()                             # 更新权重
print(f"训练一步后的 loss: {loss.item():.4f}")
print("输入 x：", x[0].detach())
print("输出 y：", out[0].detach(), "（≈ x 加上主干 F(x) 的一点微调）")
```

运行后你会看到输出 $y$ 和输入 $x$ 的数值很接近——这正是“在输入基础上微调”的直观体现；而 `loss.backward()` 能顺畅跑完，背后就是那条捷径在给梯度“托底”。

## 参考资料

1. Deep Residual Learning for Image Recognition - He et al., 2015
   https://arxiv.org/abs/1512.03385
2. 残差网络（ResNet）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_convolutional-modern/resnet.html
3. Residual neural network - Wikipedia
   https://en.wikipedia.org/wiki/Residual_neural_network
