---
title: 梯度下降是什么
date: 2026-08-12 01:10
tags: [AI]
excerpt: 上一篇讲损失函数时留了个钩子：模型预测完，损失函数给预测扣了分，可模型怎么根据这个分数去调整自己？答案就是梯度下降（gradient descent）——它告诉模型每个参数该往哪个方向调、调多少，扣分才能变小。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxwYXRoIGQ9Ik0gMjUwIDIxNSBRIDYwMCA1NzUgOTUwIDIxNSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwYXRoIGQ9Ik0gMzMwIDI5MCBRIDQzMCAzNzAgNjAwIDM5NSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNSkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgOSIvPgogIDxjaXJjbGUgY3g9IjMzMCIgY3k9IjI5MCIgcj0iMTgiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMzk1IiByPSIxNCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuODUiLz4KICA8bGluZSB4MT0iMzQ4IiB5MT0iMzA4IiB4Mj0iMzk4IiB5Mj0iMzUwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC42NSkiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPHRleHQgeD0iNjAwIiB5PSI0OTgiIGZvbnQtc2l6ZT0iODYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuair+W6puS4i+mZjTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU2MiIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="梯度下降封面" />

上一篇讲损失函数时留了个钩子：模型预测完，损失函数给预测「扣了分」，可模型怎么根据这个分数去调整自己？答案就是**梯度下降**（gradient descent）——它告诉模型「每个参数该往哪个方向调、调多少，扣分才能变小」。一句话定义：**沿着损失下降最快的方向，一步一步地更新参数，直到走到损失最小的位置。**

最贴切的类比是「蒙着眼下山」。想象你站在半山腰，被蒙住了眼，看不见全貌，目标是走到谷底。你只能怎么做？用脚探一探——感受脚下哪个方向最陡，朝着**最陡的下方**迈出一步；到了新位置再探一次，再迈一步……如此反复，直到脚下变平（再也感觉不到下坡），就到了谷底。梯度下降做的就是这件事：山是损失函数的曲面，你是算法，脚感的「陡度」就是**梯度**，迈出的步幅是**学习率**，谷底就是损失最小的那组参数。

## 它在 AI 体系里的位置

梯度下降属于机器学习的**核心优化算法**——「优化」在 AI 里就是「把损失往下压」的统称。上一篇说过训练的三步循环是「损失函数打分 → 梯度下降指方向 → 优化器迈步子」，梯度下降正是「指方向 + 迈步子」这一步的主角。

它和几个概念紧密绑定：

- **损失函数**：梯度下降要最小化的对象，没有损失就没有「山」可下。
- **反向传播**（backpropagation）：算梯度的具体方法——深度学习里梯度不是手算的，而是用反向传播自动算出来，再交给梯度下降去用。
- **学习率**（learning rate）：公式里的步长，下文单独讲——它是梯度下降能不能正常工作最关键的一颗螺丝。

> 「梯度」是什么？把损失函数想成一个曲面，站在某一点，梯度就是一个箭头，指向**上升最快**的方向，长度等于最陡的陡度。我们要让损失**下降**，所以取它的**反方向**走——这就是「梯度下降」里「下降」二字的由来。

## 核心公式：一行更新规则

梯度下降的全部动作，浓缩成一个更新公式：

$$\theta_{\text{新}} = \theta_{\text{旧}} - \eta \cdot \nabla L(\theta)$$

**符号解读**：

- $\theta$（theta）—— 模型的**参数**（那些待拧的「旋钮」，如神经网络的权重和偏置）。它可以是一个数，也可以是一组数（更新时整组同时换）
- $\eta$（eta）—— **学习率**，一个预先设好的小数（比如 0.01），就是「每步迈多远」
- $\nabla L(\theta)$ —— 损失函数 $L$ 在参数 $\theta$ 处的**梯度**，也就是「每个参数方向上，损失上升最快的方向和陡度」
- 中间的减号 —— 最关键的一笔！梯度指向「上升最快」，可我们要的是「下降」，所以取反方向（用减号）
- $\cdot$（乘号）—— 学习率乘上梯度，两者的乘积就是这一步实际迈出的步长大小

**通俗理解**：蒙着眼站在山上，梯度告诉你「脚下哪个方向最陡地往上」；你偏要反着来、往最陡地往下走，于是迈出 $\eta$ 那么远的一小步。每一步都这么走，损失就一点点降下来。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQzMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyQSIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gMCAwIEwgMTAgNSBMIDAgMTAgeiIgZmlsbD0iIzljYTNhZiIvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyIGlkPSJhcnJCIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgPHBhdGggZD0iTSAwIDAgTCAxMCA1IEwgMCAxMCB6IiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDMwIiBmaWxsPSIjZjhmOWZmIi8+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7lhazlvI/nm7Top4nvvJrmoq/luqbmjIflkJHkuIrlnaHvvIzlj5blj43mlrnlkJHmiY3ov4jlkJHosLflupU8L3RleHQ+CgogIDwhLS0g5o2f5aSx5puy6Z2i77yI5oqb54mp57q/5oiq6Z2i77yJIC0tPgogIDxwYXRoIGQ9Ik0gMTUwIDkwIFEgNjAwIDU1MCAxMDUwIDkwIiBmaWxsPSJub25lIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMzIwIiByPSI4IiBmaWxsPSIjZDFkNWRiIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIzNTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiM2YjcyODAiPuiwt+W6le+8muaNn+WkseacgOWwj+WkhDwvdGV4dD4KCiAgPCEtLSDlvZPliY3ngrkgzrjml6cgLS0+CiAgPGNpcmNsZSBjeD0iMzc1IiBjeT0iMjYzIiByPSIxMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjM1MiIgeT0iMjU2IiB0ZXh0LWFuY2hvcj0iZW5kIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+zrjml6c8L3RleHQ+CgogIDwhLS0g5qKv5bqm566t5aS077yI5LiK5Z2h5pa55ZCR77yJIC0tPgogIDxsaW5lIHgxPSIzNzUiIHkxPSIyNjMiIHgyPSIyNzAiIHkyPSIyMDkiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSI1IiBtYXJrZXItZW5kPSJ1cmwoI2FyckEpIi8+CiAgPHRleHQgeD0iMTcyIiB5PSIxOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjMiIGZpbGw9IiM2YjcyODAiPuKIh0zvvIjmoq/luqbvvIk8L3RleHQ+CiAgPHRleHQgeD0iMTcyIiB5PSIyMjMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTkiIGZpbGw9IiM5Y2EzYWYiPuS4iuWNh+acgOW/q+aWueWQkTwvdGV4dD4KCiAgPCEtLSDkuIvpmY3mraXvvIjlj5blj43ov4jmraXvvIkgLS0+CiAgPGxpbmUgeDE9IjM3NSIgeTE9IjI2MyIgeDI9IjQ1OCIgeTI9IjMwNSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjYiIG1hcmtlci1lbmQ9InVybCgjYXJyQikiLz4KICA8Y2lyY2xlIGN4PSI0NjgiIGN5PSIzMTEiIHI9IjkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNDc2IiB5PSIzMDUiIHRleHQtYW5jaG9yPSJzdGFydCIgZm9udC1zaXplPSIyMyIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPs645pawPC90ZXh0PgogIDx0ZXh0IHg9IjcwMCIgeT0iMzM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIzIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiI+4oiSIM63IMK3IOKIh0zvvJrlj43lkJHov4jkuIDmraU8L3RleHQ+CgogIDwhLS0g5YWs5byPIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmaWxsPSIjMWYyOTM3Ij7mm7TmlrDlhazlvI/vvJrOuOaWsCA9IM645penIOKIkiDOtyDCtyDiiIdM44CA77yI5YeP5Y+3ID0g5oqK5LiK5Z2h57+75oiQ5LiL5Z2h77yJPC90ZXh0Pgo8L3N2Zz4K" alt="梯度方向取反迈步示意" />

*图 1：公式里的减号，就是把「指向上坡」的梯度翻转成「指向谷底」的迈步方向。*

## 一个计算示例：手算三步看它怎么走

拿一个能心算的例子：假设损失函数就是 $L(w) = w^2$（一条开口向上的抛物线，谷底在 $w=0$），只有一个参数 $w$，学习率取 $\eta = 0.1$，初始 $w = 3$。

梯度就是对 $w$ 求导：$\nabla L = \frac{d(w^2)}{dw} = 2w$。开始迭代：

| 第几步 | 当前 $w$ | 梯度 $2w$ | 更新 $w - \eta \cdot 2w$ | 新 $w$ |
|---|---|---|---|---|
| 1 | 3.000 | 6.000 | $3 - 0.1 \times 6$ | 2.400 |
| 2 | 2.400 | 4.800 | $2.4 - 0.1 \times 4.8$ | 1.920 |
| 3 | 1.920 | 3.840 | $1.92 - 0.1 \times 3.84$ | 1.536 |

**自检**：$L(0) = 0$ 是真正的最低点（平方值非负，0 最小）✓；$w$ 从 3 一路单调递减、奔向 0，方向正确 ✓；而且因为越靠近谷底坡度越缓（梯度 $2w$ 越来越小），步长自然变小，渐渐减速，不会冲过头。这就是梯度下降「越接近最优解、走得越小心」的天然特性。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyUyIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gMCAwIEwgMTAgNSBMIDAgMTAgeiIgZmlsbD0iIzZjNjNmZiIvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyIGlkPSJhcnJEIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgPHBhdGggZD0iTSAwIDAgTCAxMCA1IEwgMCAxMCB6IiBmaWxsPSIjYTc4YmZhIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDIwIiBmaWxsPSIjZjhmOWZmIi8+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7miYvnrpfkuInmraXvvJp3IOWcqCBMID0gd8KyIOS4iuatpeatpemAvOi/keiwt+W6lTwvdGV4dD4KCiAgPCEtLSDmipvniannur8gTCA9IHfCsiAtLT4KICA8cGF0aCBkPSJNIDI1MCA4MCBMIDM2NyAxNTkgTCA0ODMgMjI0IEwgNjAwIDI3NSBMIDcxNyAzMTEgTCA4MzMgMzMzIEwgOTUwIDM0MCIKICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CgogIDwhLS0g5Z2Q5qCH5o+Q56S6IC0tPgogIDx0ZXh0IHg9IjEyMCIgeT0iODYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiPuaNn+WksSBMPC90ZXh0PgogIDx0ZXh0IHg9Ijk1OCIgeT0iMzY0IiB0ZXh0LWFuY2hvcj0ic3RhcnQiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM5Y2EzYWYiPuWPguaVsCB3PC90ZXh0PgoKICA8IS0tIOS4ieatpei/nue6v++8iOS4i+mZjei9qOi/ue+8iSAtLT4KICA8bGluZSB4MT0iMjY0IiB5MT0iODYiIHgyPSIzNzgiIHkyPSIxNjciIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXJrZXItZW5kPSJ1cmwoI2FyclMpIi8+CiAgPGxpbmUgeDE9IjQwMiIgeTE9IjE3OCIgeDI9IjQ5MSIgeTI9IjIyNiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiIG1hcmtlci1lbmQ9InVybCgjYXJyUykiLz4KICA8bGluZSB4MT0iNTEzIiB5MT0iMjM2IiB4Mj0iNTgyIiB5Mj0iMjY3IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJTKSIvPgogIDwhLS0g57un57ut5ZCR6LC35bqV55qE6Jma57q/IC0tPgogIDxsaW5lIHgxPSI2MDYiIHkxPSIyNzYiIHgyPSI4ODAiIHkyPSIzMzgiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtZGFzaGFycmF5PSI5IDgiIG1hcmtlci1lbmQ9InVybCgjYXJyRCkiLz4KCiAgPCEtLSDmraXpqqTngrkgLS0+CiAgPGNpcmNsZSBjeD0iMjUwIiBjeT0iODAiIHI9IjEyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMjUwIiB5PSI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzFmMjkzNyI+dyA9IDMuMDA8L3RleHQ+CiAgPHRleHQgeD0iMjUwIiB5PSIxMDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiM5Y2EzYWYiPui1t+eCuTwvdGV4dD4KCiAgPGNpcmNsZSBjeD0iMzkwIiBjeT0iMTc0IiByPSIxMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjM5MCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMWYyOTM3Ij53ID0gMi40MDwvdGV4dD4KCiAgPGNpcmNsZSBjeD0iNTAyIiBjeT0iMjMzIiByPSIxMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjUwMiIgeT0iMjE5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMWYyOTM3Ij53ID0gMS45MjwvdGV4dD4KCiAgPGNpcmNsZSBjeD0iNTkyIiBjeT0iMjcyIiByPSIxMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjU5MiIgeT0iMjU4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmaWxsPSIjMWYyOTM3Ij53ID0gMS41NDwvdGV4dD4KCiAgPCEtLSDnnJ/osLflupUgLS0+CiAgPGNpcmNsZSBjeD0iOTUwIiBjeT0iMzQwIiByPSIxMCIgZmlsbD0iI2QxZDVkYiIvPgogIDx0ZXh0IHg9Ijk1MCIgeT0iMzY4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIxIiBmaWxsPSIjNmI3MjgwIj7nnJ/osLflupUgdyA9IDA8L3RleHQ+CgogIDwhLS0g5rOo6KejIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmaWxsPSIjNmM2M2ZmIj7otorpnaDov5HosLflupXmoq/luqbotorlsI/vvIzmraXlrZDoh6rliqjlj5jnn60g4oCU4oCUIOWkqeeEtuOAjOWHj+mAn+OAjTwvdGV4dD4KPC9zdmc+Cg==" alt="手算三步在抛物线下山轨迹" />

*图 2：三步迭代让 w 从 3 一路降到 1.54，步长随梯度变缓而自动缩短，稳步逼近谷底。*

## 学习率：最关键的一颗螺丝

公式里那个 $\eta$（学习率），看着不起眼，却决定梯度下降能不能正常工作：

- **太大**（比如 $\eta = 1$）：$w = 3 \to 3 - 1\times 6 = -3$，一步直接跨到对面山坡，损失不降反升，来回震荡甚至越走越远（术语叫**发散**）。
- **太小**（比如 $\eta = 0.001$）：每步只挪 $0.006$，要走成千上万步才到谷底，训练慢到没法用。
- **合适**：稳定下坡、又不太久——这正是训练模型时反复要调的「手感」，也是「调参」这个词最常指的东西。

> 一句话记住学习率：**步子迈太大会摔跟头，步子迈太小走不到**。

## 一个家族：从最朴素到实战主流

实际训练里很少用「最朴素」的梯度下降，而是用它的一堆改进版，统称**优化器**（optimizer）。它们的内核都是上面那个更新公式，区别在于「怎么迈步」：

- **批量梯度下降**（BGD）：每次用**全部**样本算梯度，方向最准但每步最慢。
- **随机梯度下降**（SGD）：每次只用 **1 个**样本，每步最快但方向抖动大。
- **小批量梯度下降**（Mini-batch GD）：每次用一小批（如 32 或 64 个），兼顾速度与稳定，是实战主流。
- **自适应优化器**（Momentum / Adam 等）：在梯度基础上再记一份「惯性」或「历史趋势」，走得更聪明，目前 Adam 用得最多。

不用被名字吓到——它们都是梯度下降的「徒子徒孙」，把祖师爷那个公式理解透，后面这些只是工程上的精修。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQ0MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjMwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5qKv5bqm5LiL6ZmN5a625peP77ya5q+P5q2l55So5aSa5bCR5qC35pys5p2l566X5qKv5bqmPC90ZXh0PgoKICA8IS0tID09PT09IOmdouadvyAx77yaQkdEIOWFqOmDqOagt+acrCA9PT09PSAtLT4KICA8cmVjdCB4PSI0MCIgeT0iNzgiIHdpZHRoPSIzNDAiIGhlaWdodD0iMzAwIiByeD0iMTYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMjEwIiB5PSIxMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7mibnph4/moq/luqbkuIvpmY08L3RleHQ+CiAgPHRleHQgeD0iMjEwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTkiIGZpbGw9IiM2YjcyODAiPuavj+asoeeUqOWFqOmDqCBOIOS4quagt+acrDwvdGV4dD4KICA8IS0tIDV4NCDngrnpmLXvvIzlhajpg6jpq5jkuq4gLS0+CiAgPGcgZmlsbD0iIzZjNjNmZiI+CiAgICA8Y2lyY2xlIGN4PSI5NSIgIGN5PSIxODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMTU1IiBjeT0iMTg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjIxNSIgY3k9IjE4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIyNzUiIGN5PSIxODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMzM1IiBjeT0iMTg1IiByPSIxMyIvPgogICAgPGNpcmNsZSBjeD0iOTUiICBjeT0iMjM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjE1NSIgY3k9IjIzNSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIyMTUiIGN5PSIyMzUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMjc1IiBjeT0iMjM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjMzNSIgY3k9IjIzNSIgcj0iMTMiLz4KICAgIDxjaXJjbGUgY3g9Ijk1IiAgY3k9IjI4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIxNTUiIGN5PSIyODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMjE1IiBjeT0iMjg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjI3NSIgY3k9IjI4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIzMzUiIGN5PSIyODUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI5NSIgIGN5PSIzMzUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMTU1IiBjeT0iMzM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjIxNSIgY3k9IjMzNSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIyNzUiIGN5PSIzMzUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iMzM1IiBjeT0iMzM1IiByPSIxMyIvPgogIDwvZz4KICA8dGV4dCB4PSIyMTAiIHk9IjQwMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiI+5pa55ZCR5pyA5YeGIMK3IOavj+atpeacgOaFojwvdGV4dD4KCiAgPCEtLSA9PT09PSDpnaLmnb8gMu+8mlNHRCAxIOS4quagt+acrCA9PT09PSAtLT4KICA8cmVjdCB4PSI0MzAiIHk9Ijc4IiB3aWR0aD0iMzQwIiBoZWlnaHQ9IjMwMCIgcng9IjE2IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+6ZqP5py65qKv5bqm5LiL6ZmNPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE5IiBmaWxsPSIjNmI3MjgwIj7mr4/mrKHlj6rmir0gMSDkuKrmoLfmnKw8L3RleHQ+CiAgPGcgZmlsbD0iI2QxZDVkYiI+CiAgICA8Y2lyY2xlIGN4PSI0ODUiIGN5PSIxODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iNTQ1IiBjeT0iMTg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjYwNSIgY3k9IjE4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSI2NjUiIGN5PSIxODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iNzI1IiBjeT0iMTg1IiByPSIxMyIvPgogICAgPGNpcmNsZSBjeD0iNDg1IiBjeT0iMjM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjU0NSIgY3k9IjIzNSIgcj0iMTMiLz48Y2lyY2xlIGN4PSI2NjUiIGN5PSIyMzUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iNzI1IiBjeT0iMjM1IiByPSIxMyIvPgogICAgPGNpcmNsZSBjeD0iNDg1IiBjeT0iMjg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjU0NSIgY3k9IjI4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSI2NjUiIGN5PSIyODUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iNzI1IiBjeT0iMjg1IiByPSIxMyIvPgogICAgPGNpcmNsZSBjeD0iNDg1IiBjeT0iMzM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjU0NSIgY3k9IjMzNSIgcj0iMTMiLz48Y2lyY2xlIGN4PSI2MDUiIGN5PSIzMzUiIHI9IjEzIi8+PGNpcmNsZSBjeD0iNjY1IiBjeT0iMzM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjcyNSIgY3k9IjMzNSIgcj0iMTMiLz4KICA8L2c+CiAgPGNpcmNsZSBjeD0iNjA1IiBjeT0iMjM1IiByPSIxNSIgZmlsbD0iIzZjNjNmZiIvPgogIDxjaXJjbGUgY3g9IjYwNSIgY3k9IjI4NSIgcj0iMTMiIGZpbGw9IiNkMWQ1ZGIiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjQwMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiI+5q+P5q2l5pyA5b+rIMK3IOaWueWQkeaKluWKqOWkpzwvdGV4dD4KCiAgPCEtLSA9PT09PSDpnaLmnb8gM++8mk1pbmktYmF0Y2gg5LiA5bCP5om5ID09PT09IC0tPgogIDxyZWN0IHg9IjgyMCIgeT0iNzgiIHdpZHRoPSIzNDAiIGhlaWdodD0iMzAwIiByeD0iMTYiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iOTkwIiB5PSIxMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7lsI/mibnph4/moq/luqbkuIvpmY08L3RleHQ+CiAgPHRleHQgeD0iOTkwIiB5PSIxNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTkiIGZpbGw9IiM2YjcyODAiPuavj+asoeeUqOS4gOWwj+aJue+8iOWmgiAzMiDkuKrvvIk8L3RleHQ+CiAgPGcgZmlsbD0iI2QxZDVkYiI+CiAgICA8Y2lyY2xlIGN4PSI4NzUiICBjeT0iMTg1IiByPSIxMyIvPjxjaXJjbGUgY3g9Ijk5NSIgY3k9IjE4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIxMDU1IiBjeT0iMTg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjExMTUiIGN5PSIxODUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI4NzUiICBjeT0iMjM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjExMTUiIGN5PSIyMzUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI4NzUiICBjeT0iMjg1IiByPSIxMyIvPjxjaXJjbGUgY3g9Ijk5NSIgY3k9IjI4NSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIxMDU1IiBjeT0iMjg1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjExMTUiIGN5PSIyODUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI4NzUiICBjeT0iMzM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjkzNSIgY3k9IjMzNSIgcj0iMTMiLz48Y2lyY2xlIGN4PSIxMDU1IiBjeT0iMzM1IiByPSIxMyIvPjxjaXJjbGUgY3g9IjExMTUiIGN5PSIzMzUiIHI9IjEzIi8+CiAgPC9nPgogIDwhLS0g6auY5LquIDJ4MiDlsI/lnZcgLS0+CiAgPGcgZmlsbD0iIzZjNjNmZiI+CiAgICA8Y2lyY2xlIGN4PSI5MzUiIGN5PSIxODUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI5MzUiIGN5PSIyMzUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSI5OTUiIGN5PSIyMzUiIHI9IjEzIi8+CiAgICA8Y2lyY2xlIGN4PSIxMDU1IiBjeT0iMjM1IiByPSIxMyIvPgogIDwvZz4KICA8dGV4dCB4PSI5OTAiIHk9IjQwMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiI+5YW86aG+6YCf5bqm5LiO56iz5a6aIMK3IOWunuaImOS4u+a1gTwvdGV4dD4KPC9zdmc+Cg==" alt="BGD/SGD/Mini-batch 批量大小对比" />

*图 3：三种变体的差别只在「每步用多少样本算梯度」——全用、只用一个、还是用一小批。*

## PyTorch 里怎么写

在 PyTorch 里，梯度下降被封装进「优化器」对象，三行就能跑完一轮更新：

```python
opt = torch.optim.SGD(model.parameters(), lr=0.01)  # 优化器：封装梯度下降，lr 就是公式里的 η
loss.backward()   # 反向传播：自动算出梯度 ∇L（不用手算）
opt.step()        # 按公式 θ := θ - η·∇L 把所有参数更新一遍
```

`backward()` 算梯度、`step()` 走一步——这两行就是梯度下降公式在代码里的对应。

## 完整代码

接着上一篇的玩法，继续教模型学会「$y = 2x$」这个规律。这回重点看：梯度下降是怎么一轮轮把参数从随机值拧到正确值的。

```python
import torch
import torch.nn as nn

# ===== 任务：教模型学会「y = 2x」 =====
torch.manual_seed(42)
x_train = torch.linspace(1, 10, 20).reshape(-1, 1)   # 输入：1 到 10 的 20 个数
y_train = 2 * x_train                                  # 真实答案：每个数的两倍

# ===== 搭一个最简单的线性模型 y = w·x + b =====
model = nn.Linear(1, 1)                       # nn.Linear(输入1维, 输出1维)：内置线性变换
opt = torch.optim.SGD(model.parameters(), lr=0.01)   # 优化器：随机梯度下降，lr 是学习率 η
loss_fn = nn.MSELoss()                        # 损失函数：均方误差（上一篇讲的那把回归标尺）

# ===== 训练：梯度下降循环——预测 → 扣分 → 算梯度 → 迈一步 =====
for epoch in range(300):
    pred = model(x_train)        # 前向：模型预测
    loss = loss_fn(pred, y_train)# 用 MSE 算损失（扣分）
    opt.zero_grad()              # 清空上一轮残留的梯度
    loss.backward()              # 反向传播：自动算出梯度 ∇L
    opt.step()                   # 梯度下降迈一步：θ := θ - η·∇L

# ===== 看看模型学会了没 =====
print(f"学到的权重 w：{model.weight.item():.3f}（标准答案 2）")
print(f"学到的偏置 b：{model.bias.item():.3f}（标准答案 0）")
print(f"训练结束时的 loss：{loss.item():.4f}")
```

运行输出约为 `w：2.000，b：0.000，loss：0.0000`——模型从一组**随机**的 $w$、$b$ 出发，被梯度下降一轮轮往下拧，最终精准收敛到 $y = 2x$。把 `model.weight`、`model.bias` 想成那两个旋钮，整个训练过程就是梯度下降在反复「探坡 → 迈步」，直到旋钮拧到最优。

## 小结

一句话浓缩：**梯度下降是让模型「沿着损失下降最快的方向、一步一步调参数」的优化算法，公式就是 $\theta := \theta - \eta \cdot \nabla L$。** 它把「扣分」变成「该往哪调」的具体动作，是整个深度学习训练的发动机。

## 参考资料

1. 动手学深度学习（李沐等）- 7.2 梯度下降和随机梯度下降：系统讲解学习率作用与 BGD/SGD/小批量变体
   https://zh-v1.d2l.ai/chapter_optimization/gd-sgd.html
2. 3Blue1Brown - Gradient descent, how neural networks learn：经典动画讲解，直观展示梯度下降如何在损失曲面上「下坡」
   https://www.3blue1brown.com/lessons/gradient-descent/
3. IBM - 什么是梯度下降？：官方科普，介绍梯度下降作为训练神经网络的核心优化算法
   https://www.ibm.com/cn-zh/think/topics/gradient-descent
