---
title: 神经网络矩阵计算是什么
date: 2026-08-12 09:53
tags: [AI]
excerpt: 神经网络矩阵计算就是把神经元的「加权求和」用矩阵打包，一次算完一整层、甚至一整批数据。本文用 Excel 拖拉填充类比、两层打包公式（z=Wx+b 与 Z=WX+b）、两个迷你手算示例，加上能跑的 PyTorch 代码，讲清为什么深度学习非靠矩阵和 GPU 不可。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDmoIfpopggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIxNzAiIGZvbnQtc2l6ZT0iNzQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuelnue7j+e9kee7nOefqemYteiuoeeulzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjIyMCIgZm9udC1zaXplPSIyOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg4KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuS4gOasoeS5mOazle+8jOeul+WujOS4gOaVtOWxgjwvdGV4dD4KCiAgPCEtLSDkuInkuKrnn6npmLXnu4TmiJDnmoTnrYnlvI/vvJpYIMOXIFcgPSBa77yM5L2T546wIuefqemYteS5mOefqemYtT3nn6npmLUiIC0tPgogIDxnPgogICAgPCEtLSDnn6npmLUgWO+8mjPDlzMg572R5qC877yM5bem5LiKICg0MzAsMzIwKe+8jOagvCAyNiAtLT4KICAgIDxwYXRoIGQ9Ik00MjUsMzIwIEw0MjAsMzIwIEw0MjAsMzk4IEw0MjUsMzk4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHN0cm9rZS13aWR0aD0iMi40IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik01MDgsMzIwIEw1MTMsMzIwIEw1MTMsMzk4IEw1MDgsMzk4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHN0cm9rZS13aWR0aD0iMi40IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxyZWN0IHg9IjQzMCIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45MikiLz4KICAgIDxyZWN0IHg9IjQ1NiIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC41NSkiLz4KICAgIDxyZWN0IHg9IjQ4MiIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43OCkiLz4KICAgIDxyZWN0IHg9IjQzMCIgeT0iMzQ2IiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42KSIvPgogICAgPHJlY3QgeD0iNDU2IiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIvPgogICAgPHJlY3QgeD0iNDgyIiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIi8+CiAgICA8cmVjdCB4PSI0MzAiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzIpIi8+CiAgICA8cmVjdCB4PSI0NTYiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNDgpIi8+CiAgICA8cmVjdCB4PSI0ODIiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIi8+CiAgICA8dGV4dCB4PSI0NzEiIHk9IjQyNiIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiPlg8L3RleHQ+CgogICAgPCEtLSDkuZjlj7cgLS0+CiAgICA8dGV4dCB4PSI1MzEiIHk9IjM2OSIgZm9udC1zaXplPSI0MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNlcmlmIj7DlzwvdGV4dD4KCiAgICA8IS0tIOefqemYtSBX77yaM8OXM++8jOW3puS4iiAoNTU1LDMyMCkgLS0+CiAgICA8cGF0aCBkPSJNNTUwLDMyMCBMNTQ1LDMyMCBMNTQ1LDM5OCBMNTUwLDM5OCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIiBzdHJva2Utd2lkdGg9IjIuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cGF0aCBkPSJNNjMzLDMyMCBMNjM4LDMyMCBMNjM4LDM5OCBMNjMzLDM5OCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIiBzdHJva2Utd2lkdGg9IjIuNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgICA8cmVjdCB4PSI1NTUiIHk9IjMyMCIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiLz4KICAgIDxyZWN0IHg9IjU4MSIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIvPgogICAgPHJlY3QgeD0iNjA3IiB5PSIzMjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIvPgogICAgPHJlY3QgeD0iNTU1IiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIvPgogICAgPHJlY3QgeD0iNTgxIiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIi8+CiAgICA8cmVjdCB4PSI2MDciIHk9IjM0NiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzIpIi8+CiAgICA8cmVjdCB4PSI1NTUiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNTUpIi8+CiAgICA8cmVjdCB4PSI1ODEiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIi8+CiAgICA8cmVjdCB4PSI2MDciIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNDgpIi8+CiAgICA8dGV4dCB4PSI1OTYiIHk9IjQyNiIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiPlc8L3RleHQ+CgogICAgPCEtLSDnrYnlj7cgLS0+CiAgICA8dGV4dCB4PSI2NTYiIHk9IjM2NiIgZm9udC1zaXplPSI0MCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNlcmlmIj49PC90ZXh0PgoKICAgIDwhLS0g55+p6Zi1IFrvvJozw5cz77yM5bem5LiKICg2ODAsMzIwKSAtLT4KICAgIDxwYXRoIGQ9Ik02NzUsMzIwIEw2NzAsMzIwIEw2NzAsMzk4IEw2NzUsMzk4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHN0cm9rZS13aWR0aD0iMi40IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik03NTgsMzIwIEw3NjMsMzIwIEw3NjMsMzk4IEw3NTgsMzk4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHN0cm9rZS13aWR0aD0iMi40IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxyZWN0IHg9IjY4MCIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiLz4KICAgIDxyZWN0IHg9IjcwNiIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42NSkiLz4KICAgIDxyZWN0IHg9IjczMiIgeT0iMzIwIiB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIvPgogICAgPHJlY3QgeD0iNjgwIiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIvPgogICAgPHJlY3QgeD0iNzA2IiB5PSIzNDYiIHdpZHRoPSIyNiIgaGVpZ2h0PSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIi8+CiAgICA8cmVjdCB4PSI3MzIiIHk9IjM0NiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIi8+CiAgICA8cmVjdCB4PSI2ODAiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzIpIi8+CiAgICA8cmVjdCB4PSI3MDYiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNDgpIi8+CiAgICA8cmVjdCB4PSI3MzIiIHk9IjM3MiIgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzgpIi8+CiAgICA8dGV4dCB4PSI3MjEiIHk9IjQyNiIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiPlo8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOW6lemDqOWJr+agh+ivhiAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjUwMCIgZm9udC1zaXplPSIyNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc3R5bGU9Iml0YWxpYyI+TWF0cml4IENvbXB1dGF0aW9uPC90ZXh0PgogIDxsaW5lIHgxPSIxNTAiIHkxPSI1NDAiIHgyPSI5NDUiIHkyPSI1NDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwb2x5Z29uIHBvaW50cz0iOTQ1LDUyNiA5NzUsNTQwIDk0NSw1NTQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjU4OCIgZm9udC1zaXplPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgbGV0dGVyLXNwYWNpbmc9IjMiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="神经网络矩阵计算封面" />


你用 Excel 做过这种事吗——在一格写好公式 `=A1*2+B1*3`，然后往下拖拉，几百行瞬间全算完。你不会傻到一行一行手敲公式。神经网络做的事几乎一模一样：它要给成千上万个神经元、成千上万条数据反复算「加权求和」，而它的「拖拉填充」工具，就是**矩阵**。

一句话定义：**神经网络矩阵计算**，就是把神经元那种「输入乘权重再求和」的计算，用矩阵（一张数表）打包起来，一次性算完一整层、甚至一整批数据的运算方式。

它是整个深度学习的「算术底座」——从手机识猫到 ChatGPT 吐字，背后都是海量的矩阵乘法在 GPU 上一遍遍飞。理解了它，你就能看懂为什么训练神经网络非得靠显卡、为什么 PyTorch 那几行代码能算那么多东西。

## 先回忆：一个神经元在算什么

上一篇《神经元是什么》讲过，单个神经元干的事是**加权求和再加偏置**：

$$z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$$

把权重 $w = [w_1, \ldots, w_n]$ 和输入 $x = [x_1, \ldots, x_n]$ 都看成一组数，这个公式其实就是高中数学里的**点乘**（对应位相乘再求和）：$z = w \cdot x + b$。一个神经元 = 一次点乘。

问题来了：一层神经网络往往有几百几千个神经元，每个都在做点乘；训练时一次又要处理几十几百条数据。如果用 `for` 循环一个一个算，慢到无法忍受。于是我们把所有这些点乘**打包成一次矩阵乘法**。

## 第一层打包：把一整层神经元塞进一张权重矩阵

一层里的神经元，输入相同、各自的权重不同。把每个神经元的权重写成**一行**，摞起来就是这层的**权重矩阵** $W$，整层的计算压缩成一个紧凑的式子：

$$z = Wx + b$$

**符号逐项解读：**

- $x$ —— 这层的输入，一个**列向量**（竖着排的一列数），长度 = 输入特征数 $n$。
- $W$ —— 这层的**权重矩阵**：每**行**是一个神经元的全部权重。若这层有 $m$ 个神经元、输入 $n$ 个，$W$ 就是 $m \times n$（$m$ 行 $n$ 列）的一张表。
- $b$ —— 偏置向量，每个神经元一个底数，长 $m$。
- $z$ —— 这层所有神经元的加权求和结果，长 $m$ 的列向量。

一次乘法，整层的 $m$ 个神经元**同时**算完——这就是「打包一层」。直觉上：权重矩阵 $W$ 就是一张「**配方表**」，每一行写满一个神经元怎么看各个输入的偏好；拿输入 $x$ 去乘这张表，就是让所有神经元同时给出反应。

## 手算一遍：一条数据过一层

用一个极小的例子：2 个输入、3 个神经元的层。

**已知：**

- 输入 $x = \begin{bmatrix}1 \\ 0\end{bmatrix}$（两个特征，第二个为 0）
- 权重矩阵 $W = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8 \\ 0.2 & 0.4\end{bmatrix}$（3 行 = 3 个神经元，每行 2 个权重）
- 偏置 $b = \begin{bmatrix}0 \\ 0 \\ 0\end{bmatrix}$（简化为 0）

**计算：**

$$z = Wx = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8 \\ 0.2 & 0.4\end{bmatrix}\begin{bmatrix}1 \\ 0\end{bmatrix} = \begin{bmatrix}0.7\times1 + 0.5\times0 \\ -0.3\times1 + 0.8\times0 \\ 0.2\times1 + 0.4\times0\end{bmatrix} = \begin{bmatrix}0.7 \\ -0.3 \\ 0.2\end{bmatrix}$$

**自检：** 结果是 $3 \times 1$ 列向量（3 个神经元各一个值）✅；因为 $x$ 第二个分量为 0，结果恰好等于 $W$ 的第一列，方向也对 ✅。

注意每个神经元是怎么「挑出自己那行权重」做点乘的——矩阵乘法天然就是「**一行配一列**」。

## 第二层打包：把一批数据也塞进矩阵

真实训练不会一条一条喂数据，而是一次喂一批（叫一个 **batch**，常见 32/64/128 条）。好在矩阵还能再打包一次：把一批列向量**横着并排**拼成一个大矩阵 $X$，每列一条样本：

$$Z = WX + b$$

**符号逐项解读：**

- $X$ —— 输入矩阵，每**列**一条样本。若批大小为 $B$、输入 $n$ 个特征，$X$ 就是 $n \times B$。
- $Z$ —— 输出矩阵，每列对应一条样本的结果，形状 $m \times B$。
- $W$、$b$ 同上——同一层对整批数据复用同一份权重。

这一步是质的飞跃：**一次矩阵乘法，就把整批数据同时过了一整层**。这也是「向量化」（vectorization）这个词的真正含义——用矩阵运算替代 `for` 循环。

## 算一批试试：两条数据并行过同一层

沿用上面的 $W$，这次喂两条样本 $x_1 = \begin{bmatrix}1 \\ 0\end{bmatrix}$、$x_2 = \begin{bmatrix}0 \\ 1\end{bmatrix}$：

**拼成输入矩阵**（第一列 $x_1$、第二列 $x_2$）：$X = \begin{bmatrix}1 & 0 \\ 0 & 1\end{bmatrix}$

**一次乘法算完：**

$$Z = WX = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8 \\ 0.2 & 0.4\end{bmatrix}\begin{bmatrix}1 & 0 \\ 0 & 1\end{bmatrix} = \begin{bmatrix}0.7 & 0.5 \\ -0.3 & 0.8 \\ 0.2 & 0.4\end{bmatrix}$$

**自检：** 结果是 $3 \times 2$（3 个神经元 × 2 条样本）✅；第一列 $[0.7, -0.3, 0.2]^T$ 和上一个例子完全一致 ✅；第二列 $[0.5, 0.8, 0.4]^T$ 正是 $W$ 乘 $x_2$ 的结果 ✅。

更巧的是：这里 $X$ 恰好是单位矩阵（主对角线为 1、其余为 0），所以 $Z$ 直接等于 $W$——你可以一眼验证每个数都对得上。

## 维度对得上才算合法：矩阵运算的命脉

矩阵乘法有个铁律——**前一个的列数，必须等于后一个的行数**：$(m \times n)$ 乘 $(n \times p)$，结果是 $(m \times p)$。

这条「**列 = 行**」的规矩，恰恰对应神经网络里「**上一层输出的个数 = 这层每个神经元接收的输入个数**」。所以你看到一层写成 `nn.Linear(784, 128)`，意思就是：输入 784 个特征、输出 128 个，权重矩阵 $W$ 是 $128 \times 784$。维度的对齐，就是网络结构能不能搭起来的硬约束。

> 一个小提醒：上面用「列向量」讲最直观，但 **PyTorch 习惯把样本排成行**——形状是 `[batch, features]`，权重矩阵相应做一次转置处理。本质完全一样，只是「数据横着躺还是竖着躺」的排版差异。代码里看到 `x.shape = [32, 784]` 不用慌，那就是 32 条样本、每条 784 个特征。

## 为什么非矩阵不可：向量化与 GPU 并行

有人会问：用 `for` 循环一条一条、一个神经元一个神经元算，不也能得到一样的结果吗？理论上能，但有两个现实障碍让矩阵运算成为唯一选择：

- **速度差是几十到几百倍**：CPU 串行 `for` 循环，一次算一个数；矩阵运算把成千上万个乘加打包，交给底层高度优化的数学库（BLAS）一次完成。同样一层 1000 个神经元 × 1000 条数据，循环 vs 矩阵，可能是分钟级和毫秒级的差距。
- **GPU 天生为矩阵而生**：显卡里有几千个小核心，能同时算矩阵里互不依赖的大量乘法。深度学习的爆发，正是靠 GPU 把这种并行吃满了——训练 ChatGPT 这种千亿参数模型，离开 GPU 和矩阵运算根本不可能。

所以在 PyTorch 里，你几乎看不到「遍历神经元」的循环，全是矩阵运算：

```python
import torch.nn as nn
self.fc = nn.Linear(784, 128)   # 内部就是权重矩阵 W (128×784) + 偏置 b (128)
# 调用 self.fc(x) 时，x 是 [batch, 784]，一次矩阵乘法就把整批数据过完这层
```

连**反向传播**算梯度，本质也是矩阵运算（用到的还是权重矩阵的**转置** $W^\top$）——正向算一遍、反向算一遍，骨架全是矩阵。可以说：**神经网络在数学上就是一长串矩阵乘法加非线性激活的反复叠加**。

## 矩阵计算在 AI 里的位置

- **所有深度学习框架的核心**：PyTorch、TensorFlow、JAX，底层都是矩阵/张量运算库。你写的每一层网络，最终都翻译成矩阵乘法。
- **硬件的指挥棒**：为什么 AI 芯片（GPU/TPU）长成那样？因为矩阵乘法能拆成海量独立的小乘加，适合上千核心并行——硬件是跟着矩阵运算的形状设计的。
- **大模型的体量就藏在矩阵里**：一个几十亿参数的大模型，本质就是几千个巨大的权重矩阵；所谓「参数量」，就是这些矩阵里所有元素的总数。

## 小结

神经网络矩阵计算，就是把神经元「加权求和 + 偏置」这件小事，用矩阵打包成两步飞跃：先**把一层的多个神经元塞进一张权重矩阵**（$z = Wx + b$，一次算完一层），再**把一批样本并排塞进输入矩阵**（$Z = WX + b$，一次算完一批）；它的意义不只是写法简洁，而是让成千上万次乘加能交给 GPU 几千个核心同时去算，把本来要跑几分钟的计算压到毫秒——这就是为什么深度学习非靠显卡不可，也是「神经网络本质上是一长串矩阵乘法」这句话的全部含义。

## 完整代码

下面用 PyTorch 演示一次「批处理矩阵运算」：32 条假样本（每条 784 个特征）一次过完一个 128 神经元的全连接层。重点看 `forward` 里**没有任何 `for` 循环**——一层 128 个神经元、32 条数据，全部由一次矩阵乘法搞定。代码末尾打印了每一步张量的形状（shape），方便你把「矩阵维度」和「网络结构」对上号。

```python
import torch
import torch.nn as nn

# ===== 用矩阵运算实现"一层全连接神经网络" =====
# nn.Linear 内部就是权重矩阵 W 和偏置 b：Linear(in, out) → W 形状 [out, in]，b 形状 [out]
class OneLayer(nn.Module):
    def __init__(self):
        super().__init__()
        # 784 个输入特征 → 128 个神经元；内部自带 W (128×784) 和 b (128)
        self.fc = nn.Linear(784, 128)

    # forward 定义数据怎么过这层——全程没有 for 循环，全靠一次矩阵乘法
    def forward(self, x):
        z = self.fc(x)           # 矩阵乘法：Z = x @ W^T + b，32 条样本同时过完 128 个神经元
        a = torch.relu(z)        # 逐元素激活（不改变形状），负数归零
        return a

# ===== 造一批假数据：32 条样本，每条 784 个特征 =====
torch.manual_seed(42)                          # 固定随机种子，保证每次跑结果一样
X = torch.randn(32, 784)                       # [batch=32, features=784]，行约定：每行一条样本

# ===== 实例化网络，看权重矩阵的形状 =====
net = OneLayer()
W, b = net.fc.weight, net.fc.bias              # nn.Linear 把 W、b 存在这两个属性里

# ===== 一次前向 = 一次矩阵乘法，32 条数据并行过完一层 =====
out = net(X)

# ===== 打印每一步的形状，把"矩阵维度"和"网络结构"对上号 =====
print(f"输入  X.shape = {tuple(X.shape)}    # 32 条样本 × 784 特征")
print(f"权重  W.shape = {tuple(W.shape)}    # 128 个神经元 × 784 输入（每个神经元一行权重）")
print(f"偏置  b.shape = {tuple(b.shape)}    # 每个神经元一个底数")
print(f"输出out.shape = {tuple(out.shape)}   # 32 条样本 × 128 个神经元的结果")
```

运行后你会看到形状一路变化：输入 `[32, 784]` → 权重 `[128, 784]` → 输出 `[32, 128]`。这三个数字正好对应「**批大小、输入特征数、神经元数**」——矩阵维度和网络结构，在这里严丝合缝地对上了。

## 参考资料

1. 前向传播、反向传播和计算图 - 《动手学深度学习》
   https://zh.d2l.ai/chapter_multilayer-perceptrons/backprop.html
2. 神经网络的矩阵运算（批量与向量化）- APXML
   https://apxml.com/zh/courses/introduction-to-neural-networks/chapter-3-forward-propagation/matrix-operations
3. 深度学习数学基础：矩阵运算与线性映射 - 知乎
   https://zhuanlan.zhihu.com/p/26080522606
