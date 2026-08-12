---
title: 学习率是什么
date: 2026-08-12 01:27
tags: [AI]
excerpt: '上一篇讲梯度下降时留了个钩子：更新公式里那颗叫 η 的小螺丝，当时只一句话带过——它就是学习率，「太大发散、太小太慢」。可这一个小数，恰恰是整个深度学习训练里最难调、最决定成败的一个设置。'
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8bGluZSB4MT0iMTkwIiB5MT0iMTQwIiB4Mj0iMTkwIiB5Mj0iNDAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zMCkiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxsaW5lIHgxPSIxOTAiIHkxPSI0MDAiIHgyPSIxMDEwIiB5Mj0iNDAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zMCkiIHN0cm9rZS13aWR0aD0iNCIvPgoKICA8cGF0aCBkPSJNIDIxMCAxNjIgQyAzNjAgMTYyLCA0NzAgMzYwLCA2MjAgMzkyIFMgOTAwIDM5OCwgMTAwMCAzOTgiCiAgICAgICAgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2Utd2lkdGg9IjkiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgoKICA8bGluZSB4MT0iMjI1IiB5MT0iNDUwIiB4Mj0iMzUwIiB5Mj0iNDUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzUwLDQ1MCAzMzQsNDQwIDMzNCw0NjAiIGZpbGw9IndoaXRlIi8+CiAgPGxpbmUgeDE9IjQ5NSIgeTE9IjQ1MCIgeDI9IjU4MCIgeTI9IjQ1MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwb2x5Z29uIHBvaW50cz0iNTgwLDQ1MCA1NjcsNDQyIDU2Nyw0NTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiLz4KICA8bGluZSB4MT0iNzE1IiB5MT0iNDUwIiB4Mj0iNzYwIiB5Mj0iNDUwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cG9seWdvbiBwb2ludHM9Ijc2MCw0NTAgNzUwLDQ0NCA3NTAsNDU2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1MzgiIGZvbnQtc2l6ZT0iOTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIKICAgICAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5a2m5Lmg546HPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjU5MCIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="学习率封面" />


上一篇讲梯度下降时，那个更新公式 $\theta_{\text{新}} = \theta_{\text{旧}} - \eta \cdot \nabla L$ 里有一颗不起眼的小写希腊字母 $\eta$（读 eta）。当时只用一句话带过——它叫**学习率**（learning rate），「太大发散、太小太慢」。可恰恰是这一个小数，是整个深度学习训练里**最难调、最决定成败**的一个设置，从业者花在它身上的时间，常常比写模型本身还多。这一篇，就把它单独拧出来讲透。

一句话定义：**学习率是「每一步迈多大」的那个数**。回到蒙眼下山的比喻——梯度告诉你往哪走，学习率决定你这一脚跨多远。换个更贴切的说法，它像汽车的**油门**：踩太深会冲出路面（发散），踩太浅车子挪不动（太慢），而且一路上还得**动态调节**——起步时狠踩赶路，快到目的地时轻踩微调。这「动态调节」，正是本文要讲的重点。

## 它在 AI 体系里的位置

学习率是一种**超参数**（hyperparameter）——「超」在它是你在训练**前**就要人手设好的数，不是模型自己学出来的（模型学的是参数 $\theta$，不是学习率 $\eta$）。在所有超参数里，它通常是对训练结果影响最大的一个。

它和几个概念紧密绑定：

- **梯度下降**：学习率是它更新公式里的步长系数，没有它梯度下降走不起来。
- **优化器**（optimizer）：像 Adam、SGD 这些，本质上都是「梯度下降 + 一套迈步策略」，学习率是它们共用的那根「油门」。

## 太大会「发散」：为什么会炸成 NaN

梯度下降那篇说过学习率太大会「跨到对面山坡」，这里拆得更细：当学习率**大于 1**（在 $L=w^2$ 这种简单例子里），会发生更吓人的事——**每一步都比上一步跨得更远**，数值像滚雪球一样放大。

拿 $L(w)=w^2$、初始 $w=1$、学习率 $\eta=1.1$ 心算前三步：

| 第几步 | 当前 $w$ | 梯度 $2w$ | 新 $w = w - 1.1\times 2w$ |
|---|---|---|---|
| 1 | 1.0 | 2.0 | $1 - 2.2 = -1.2$ |
| 2 | -1.2 | -2.4 | $-1.2 + 2.64 = 1.44$ |
| 3 | 1.44 | 2.88 | $1.44 - 3.168 = -1.728$ |

$w$ 的绝对值在 $1 \to 1.2 \to 1.44 \to 1.728$ 一路放大，损失 $w^2$ 不降反**飙升**。再走几十步，数值大到超出计算机浮点数能表示的范围，就变成 `inf`，再往下算就变成 `NaN`（Not a Number，一个「算坏了」的废值）——训练彻底崩掉。这就是「**发散**」（divergence）的真相：不是方向错了，是步子太大、每步都比上步更大，系统爆炸。

> 关键区别：$\eta=1$ 时是「左右来回横跳」（震荡，损失不上不下）；$\eta>1$ 时才是「越跳越远、直接爆炸」（发散）。震荡还能救，发散基本就废了。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQzMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyRCIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iNyIgbWFya2VySGVpZ2h0PSI3IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgIDxwYXRoIGQ9Ik0gMCAwIEwgMTAgNSBMIDAgMTAgeiIgZmlsbD0iIzZjNjNmZiIvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyIGlkPSJhcnJYIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI4IiBtYXJrZXJIZWlnaHQ9IjgiIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgPHBhdGggZD0iTSAwIDAgTCAxMCA1IEwgMCAxMCB6IiBmaWxsPSIjYTc4YmZhIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNDMwIiBmaWxsPSIjZjhmOWZmIi8+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7lrabkuaDnjoflpKrlpKfvvIjOtyA9IDEuMe+8ie+8mncg6LaK6Lez6LaK6L+c77yM5o2f5aSx6aOZ5Y2H55u06IezIE5hTjwvdGV4dD4KCiAgPCEtLSDmipvniannur8gTCA9IHfCsu+8iOWQq+WFqOmDqOW8uei3s+eCueS9nOS4uumHh+agt+mhtueCue+8iSAtLT4KICA8cGF0aCBkPSJNIDE1MCA2MiBMIDIzMCAxNTggTCAyODEgMjA4IEwgMzQzIDI2MyBMIDM4NiAyOTIgTCA0OTMgMzQzIEwgNjAwIDM2MCBMIDcwNyAzNDMgTCA4MTQgMjkzIEwgOTA4IDIyMCBMIDkyMSAyMDggTCAxMDUwIDYyIgogICAgICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIzNjAiIHI9IjgiIGZpbGw9IiNkMWQ1ZGIiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjM5MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzljYTNhZiI+6LC35bqVIHcgPSAwPC90ZXh0PgoKICA8IS0tIOW8uei3s+eureWktO+8iOi2iui3s+i2iui/nO+8iSAtLT4KICA8bGluZSB4MT0iODIwIiB5MT0iMjgzIiB4Mj0iMzU3IiB5Mj0iMjcwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIgbWFya2VyLWVuZD0idXJsKCNhcnJEKSIvPgogIDxsaW5lIHgxPSIzNDMiIHkxPSIyNDciIHgyPSI4OTUiIHkyPSIyMzQiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBtYXJrZXItZW5kPSJ1cmwoI2FyckQpIi8+CiAgPGxpbmUgeDE9IjkwOCIgeTE9IjIwNCIgeDI9IjI0MiIgeTI9IjE3MiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiIG1hcmtlci1lbmQ9InVybCgjYXJyRCkiLz4KCiAgPCEtLSDlvLnot7PngrkgLS0+CiAgPGNpcmNsZSBjeD0iODE0IiBjeT0iMjkzIiByPSIxMSIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjgxNCIgeT0iMjc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE5IiBmaWxsPSIjMWYyOTM3Ij53PTE8L3RleHQ+CiAgPGNpcmNsZSBjeD0iMzQzIiBjeT0iMjYzIiByPSIxMSIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjM0MyIgeT0iMjQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE5IiBmaWxsPSIjMWYyOTM3Ij53PeKIkjEuMjwvdGV4dD4KICA8Y2lyY2xlIGN4PSI5MDgiIGN5PSIyMjAiIHI9IjEyIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iOTA4IiB5PSIyMDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTkiIGZpbGw9IiMxZjI5MzciPnc9MS40NDwvdGV4dD4KICA8Y2lyY2xlIGN4PSIyMzAiIGN5PSIxNTgiIHI9IjEzIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMjMwIiB5PSIxNDMiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTkiIGZpbGw9IiMxZjI5MzciPnc94oiSMS43MzwvdGV4dD4KCiAgPCEtLSDpo57lh7rvvJppbmYg4oaSIE5hTiAtLT4KICA8bGluZSB4MT0iMjE4IiB5MT0iMTM4IiB4Mj0iMTIwIiB5Mj0iODYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtZGFzaGFycmF5PSIxMCA4IiBtYXJrZXItZW5kPSJ1cmwoI2FyclgpIi8+CiAgPHRleHQgeD0iMTE4IiB5PSI3NCIgdGV4dC1hbmNob3I9InN0YXJ0IiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2E3OGJmYSI+4oaSIGluZiDihpIgTmFOPC90ZXh0PgoKICA8IS0tIOazqOinoyAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjQxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZmlsbD0iIzZjNjNmZiI+fHd877yaMSDihpIgMS4yIOKGkiAxLjQ0IOKGkiAxLjcz77yM5q+P5q2l5q+U5LiK5q2l6Leo5b6X5pu06L+c77yM5YOP5rua6Zuq55CD5LiA5qC35pS+5aSnPC90ZXh0Pgo8L3N2Zz4K" alt="学习率太大导致发散，w 越跳越远直至 NaN" />

*图 1：η > 1 时每步跨得比上步更远，w 的绝对值像滚雪球放大，损失不降反飙，最终冲成 inf / NaN。*

## 太小不只慢，还可能「卡住」

反过来，学习率太小也不只是慢这么简单。想象损失曲面是一片**波浪起伏**的丘陵（不是光溜溜的碗），你的步子只有蚂蚁那么大——一旦走进一个**浅浅的小坑**，脚下感觉「平了」（梯度接近 0），算法就以为到了谷底、停下了。可真正最低的那个谷底，其实在更远处。这叫陷在**局部最优**（local minimum）或**平坦区**（plateau）：步子太小，连小土包都翻不过去。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQyMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyQTIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgb3JpZW50PSJhdXRvLXN0YXJ0LXJldmVyc2UiPgogICAgICA8cGF0aCBkPSJNIDAgMCBMIDEwIDUgTCAwIDEwIHoiIGZpbGw9IiNhNzhiZmEiLz4KICAgIDwvbWFya2VyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0MjAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZjI5MzciPuWtpuS5oOeOh+WkquWwj++8muWbsOWcqOa1hea1heeahOWxgOmDqOacgOS8mO+8jOi1sOS4jeWIsOecn+ato+eahOiwt+W6lTwvdGV4dD4KCiAgPCEtLSDms6LmtarlvaLmjZ/lpLHmm7LpnaLvvIjkuKTkuKrosLfvvIkgLS0+CiAgPHBhdGggZD0iTSA4MCAxMjAgTCAxNTAgMjAwIEwgMjIwIDI0NSBMIDI5MCAyNTAgTCAzNjAgMjQwIEwgNDMwIDE5MCBMIDQ5MCAxNjAgTCA1NjAgMjA1IEwgNjMwIDI3NSBMIDcwMCAzMjAgTCA3NzAgMzMzIEwgODIwIDMzNSBMIDg5MCAzMjUgTCA5NjAgMjc1IEwgMTAzMCAyMzUgTCAxMTIwIDIwNSIKICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iNiIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CgogIDwhLS0g5bGA6YOo5pyA5LyY77yI5YGH6LC35bqV77yJIC0tPgogIDxjaXJjbGUgY3g9IjI5MCIgY3k9IjI1MCIgcj0iMTUiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIyOTAiIHk9IjIyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiMxZjI5MzciPuWxgOmDqOacgOS8mDwvdGV4dD4KICA8dGV4dCB4PSIyOTAiIHk9IjI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzljYTNhZiI+77yI5rWF5rWF55qE5bCP5Z2R77yJPC90ZXh0PgogIDwhLS0g6JqC6JqB5bCP5q2l5p2l5Zue77yI5Zuw5L2P77yJIC0tPgogIDxsaW5lIHgxPSIyNjUiIHkxPSIyNTIiIHgyPSIyNDUiIHkyPSIyNTgiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjMxNSIgeTE9IjI1MiIgeDI9IjMzNSIgeTI9IjI1OCIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSIyOTAiIHk9IjMxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzljYTNhZiI+5q2l5a2Q5Y+q5pyJ6JqC6JqB5aSnPC90ZXh0PgoKICA8IS0tIOS4remXtOWcn+WMhSAtLT4KICA8Y2lyY2xlIGN4PSI0OTAiIGN5PSIxNjAiIHI9IjciIGZpbGw9IiNkMWQ1ZGIiLz4KICA8dGV4dCB4PSI0OTAiIHk9IjE0MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOSIgZmlsbD0iIzljYTNhZiI+5bCP5Zyf5YyFPC90ZXh0PgoKICA8IS0tIOWFqOWxgOacgOS8mO+8iOecn+iwt+W6le+8iSAtLT4KICA8Y2lyY2xlIGN4PSI4MjAiIGN5PSIzMzUiIHI9IjExIiBmaWxsPSIjZDFkNWRiIi8+CiAgPHRleHQgeD0iODIwIiB5PSIzMTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjEiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmI3MjgwIj7lhajlsYDmnIDkvJg8L3RleHQ+CiAgPHRleHQgeD0iODIwIiB5PSIzNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiPu+8iOecn+ato+eahOiwt+W6le+8iTwvdGV4dD4KCiAgPCEtLSDnv7vkuI3ov4fljrvnmoTomZrnur/lvKcgLS0+CiAgPHBhdGggZD0iTSAzMDUgMjQ0IFEgNDkwIDcwIDgxNSAzMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtZGFzaGFycmF5PSI5IDgiIG1hcmtlci1lbmQ9InVybCgjYXJyQTIpIi8+CiAgPHRleHQgeD0iNTYwIiB5PSI5NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2E3OGJmYSI+5q2l5a2Q5aSq5bCP77yM57+75LiN6L+H6L+Z5Liq5bCP5Zyf5YyFPC90ZXh0Pgo8L3N2Zz4K" alt="学习率太小陷在局部最优的波浪损失曲面" />

*图 2：损失曲面起伏时，太小的步子一旦落进浅浅的局部最优，脚下「变平」就停下，翻不过小土包到不了真正的谷底。*

## 怎么看 loss 曲线诊断学习率

实战中判断学习率合不合适，最直接的工具是**损失曲线**——把每轮的 loss 画成折线。三种典型形态一眼就能看出问题：

- **震荡 / 不降反升**：曲线像锯齿甚至往上窜 → 学习率**太大**，正贴着发散的边缘。
- **降得极慢 / 很早躺平**：曲线半天不往下走，或早早趴在一个平台上 → 学习率**太小**，或卡在了平坦区。
- **平滑稳定下降、逐渐收敛**：曲线像滑梯一样顺 → 学习率**合适**。

养成训练时盯着损失曲线看的习惯，是调学习率最基础的「手感」。

## 核心增量：学习率调度（为什么训练中要「变」学习率）

到这里讲的都是「一个固定的学习率怎么挑」。可真实训练里，**几乎没人用一个固定的学习率从头训到尾**——因为一个固定值很难两头讨好：

- 训练**早期**，参数离最优值还远，需要**大步快走**，赶紧挪到谷底附近；
- 训练**后期**，已经接近谷底，大步会反复跨过谷底来回晃，这时要**小步精修**，稳稳贴到底。

一套步幅贯穿始终，必然「要么前期太慢，要么后期太晃」。解决办法是**学习率调度**（learning rate schedule）：让学习率 $\eta$ 随训练轮次 $t$ 变化 $\eta(t)$，前期大、后期小。

下面是四种最常见的策略：

**1. 阶梯衰减（Step decay）**——每训练 $s$ 轮，把学习率乘以一个小于 1 的因子 $\gamma$：

$$\eta_t = \eta_0 \cdot \gamma^{\lfloor t/s \rfloor}$$

- $\eta_0$ —— 初始学习率，训练开始时的「大步」
- $\gamma$ —— 衰减因子，一个小于 1 的数（如 $0.5$ 表示砍半）
- $s$ —— 衰减周期，每隔多少轮降一次
- $\lfloor t/s \rfloor$ —— 向下取整，意思是「到第 $t$ 轮为止，已经降过几次」

直觉：像开车每跑一段路就把油门**松一档**，台阶式往下走。

**2. 指数衰减（Exponential decay）**——每一轮都乘一次 $\gamma$，是阶梯衰减的「连续平滑版」：

$$\eta_t = \eta_0 \cdot \gamma^{t}$$

不再有台阶，学习率每一轮都微微下降，曲线是一条平滑的下倾弧。

**3. 余弦退火（Cosine annealing）**——让学习率按余弦曲线平滑下降：

$$\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min})\left(1 + \cos\frac{\pi t}{T}\right)$$

- $\eta_{\max}$、$\eta_{\min}$ —— 学习率的上下限（最高点和最终降到的小值）
- $T$ —— 总训练轮次，余弦周期的长度
- $\cos$ —— 余弦函数，负责制造「平滑过渡」的形状

直觉：曲线**两头缓、中间陡**——开始降得慢（稳住大步）、中段快速衰减、末段又放缓（精细收敛），整体是一条从高点滑到低点的弧线。这是目前**最流行**的调度策略，从图像分类到大模型训练都在用。

**4. 预热（Warmup）**——开头先用几轮把学习率从 0 **线性升**到 $\eta_{\max}$，升完再按上面任一策略衰减：

$$\eta_t = \eta_{\max} \cdot \frac{t}{T_w}\quad(\text{预热阶段},\ t \le T_w)$$

为什么要「先升后降」？训练刚开始时，参数全是随机的、算出的梯度又大又乱，这时直接踩大油门很容易摔跟头；先用小步探一段路、等方向稳定了再加速，反而更安全。**几乎所有现代大模型**（GPT、Transformer 系列）的训练，都用「warmup + 余弦衰减」这套组合拳。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQ2MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjQyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjMwIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5Zub56eN5a2m5Lmg546H6LCD5bqm5puy57q/5a+55q+U77yI5YmN5pyf5aSn5q2l44CB5ZCO5pyf5bCP5q2l77yJPC90ZXh0PgoKICA8IS0tIOWdkOagh+i9tCAtLT4KICA8bGluZSB4MT0iMTIwIiB5MT0iMzQwIiB4Mj0iMTA5MCIgeTI9IjM0MCIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cG9seWdvbiBwb2ludHM9IjEwOTAsMzQwIDEwNzgsMzM0IDEwNzgsMzQ2IiBmaWxsPSIjOWNhM2FmIi8+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjM0MCIgeDI9IjEyMCIgeTI9Ijc4IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxwb2x5Z29uIHBvaW50cz0iMTIwLDc4IDExNCw5MCAxMjYsOTAiIGZpbGw9IiM5Y2EzYWYiLz4KICA8dGV4dCB4PSIxMDgwIiB5PSIzNjYiIHRleHQtYW5jaG9yPSJlbmQiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2YjcyODAiPuiuree7g+i9ruasoSB0IOKGkjwvdGV4dD4KICA8dGV4dCB4PSIxMTIiIHk9Ijg2IiB0ZXh0LWFuY2hvcj0iZW5kIiBmb250LXNpemU9IjIwIiBmaWxsPSIjNmI3MjgwIj7OtzwvdGV4dD4KICA8dGV4dCB4PSIxMjAiIHk9IjM1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzljYTNhZiI+MDwvdGV4dD4KICA8dGV4dCB4PSIxMDgwIiB5PSIzNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5Y2EzYWYiPlQ8L3RleHQ+CiAgPGxpbmUgeDE9IjEyMCIgeTE9IjkwIiB4Mj0iMTA4MCIgeTI9IjkwIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI1IDYiLz4KICA8dGV4dCB4PSIxMTIiIHk9Ijk2IiB0ZXh0LWFuY2hvcj0iZW5kIiBmb250LXNpemU9IjE4IiBmaWxsPSIjOWNhM2FmIj7Ot19tYXg8L3RleHQ+CgogIDwhLS0gMS4g6Zi25qKv6KGw5YeP77yI54Gw77yJIC0tPgogIDxwYXRoIGQ9Ik0gMTIwIDkwIEggMzYwIFYgMjE1IEggNjAwIFYgMjc4IEggODQwIFYgMzEyIEggMTA4MCIKICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz4KCiAgPCEtLSAyLiDmjIfmlbDoobDlh4/vvIjmt6HntKvvvIkgLS0+CiAgPHBhdGggZD0iTSAxMjAgOTAgUSAyNDAgMTUwIDM2MCAyMjMgVCA2MDAgMjg1IFQgODQwIDMxNCBUIDEwODAgMzI4IgogICAgICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CgogIDwhLS0gMy4g5L2Z5bym6YCA54Gr77yI5Li76Imy77yM5Yqg57KX77yJIC0tPgogIDxwYXRoIGQ9Ik0gMTIwIDkwIFEgMjYwIDEwMCAzNjAgMTI4IFQgNjAwIDIxNSBUIDg0MCAzMDMgVCAxMDgwIDM0MCIKICAgICAgICBmaWxsPSJub25lIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNSIvPgoKICA8IS0tIDQuIHdhcm11cCArIOS9meW8pu+8iOS4u+iJsuiZmue6v++8iSAtLT4KICA8cGF0aCBkPSJNIDEyMCAzNDAgTCAyNjAgOTAgUSAzODAgMTA1IDQ1MCAxMzUgVCA2NDAgMjI1IFQgODMwIDMwNSBUIDEwODAgMzQwIgogICAgICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0IiBzdHJva2UtZGFzaGFycmF5PSIxMSA3Ii8+CgogIDwhLS0g5Zu+5L6LIC0tPgogIDxnIGZvbnQtc2l6ZT0iMjEiIGZpbGw9IiMxZjI5MzciPgogICAgPGxpbmUgeDE9IjE1MCIgeTE9IjQwMCIgeDI9IjE5MCIgeTI9IjQwMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICAgIDx0ZXh0IHg9IjE5OCIgeT0iNDA3Ij7kvZnlvKbpgIDngas8L3RleHQ+CgogICAgPGxpbmUgeDE9IjM2MCIgeTE9IjQwMCIgeDI9IjQwMCIgeTI9IjQwMCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiIHN0cm9rZS1kYXNoYXJyYXk9IjkgNiIvPgogICAgPHRleHQgeD0iNDA4IiB5PSI0MDciPndhcm11cCArIOS9meW8pjwvdGV4dD4KCiAgICA8bGluZSB4MT0iNjQwIiB5MT0iNDAwIiB4Mj0iNjgwIiB5Mj0iNDAwIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPHRleHQgeD0iNjg4IiB5PSI0MDciPuaMh+aVsOihsOWHjzwvdGV4dD4KCiAgICA8bGluZSB4MT0iODcwIiB5MT0iNDAwIiB4Mj0iOTEwIiB5Mj0iNDAwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iNCIvPgogICAgPHRleHQgeD0iOTE4IiB5PSI0MDciPumYtuair+ihsOWHjzwvdGV4dD4KICA8L2c+CiAgPHRleHQgeD0iNjAwIiB5PSI0NDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiM2YjcyODAiPuS9meW8pumAgOeBq+acgOa1geihjO+8m+Wkp+aooeWei+iuree7g+WHoOS5jumDveeUqCB3YXJtdXAgKyDkvZnlvKY8L3RleHQ+Cjwvc3ZnPgo=" alt="四种学习率调度曲线对比" />

*图 3：四种调度都让 η 前期大、后期小；余弦退火最平滑流行，warmup + 余弦是大模型训练的标配。*

### 一个心算示例：阶梯衰减每档剩多少

取 $\eta_0 = 0.1$，每 $s=3$ 轮衰减一次，$\gamma = 0.5$（砍半）：

| 训练轮次 $t$ | 计算式 | 学习率 $\eta_t$ |
|---|---|---|
| 0–2 | $0.1 \times 0.5^0$ | **0.1000** |
| 3–5 | $0.1 \times 0.5^1$ | **0.0500** |
| 6–8 | $0.1 \times 0.5^2$ | **0.0250** |
| 9–11 | $0.1 \times 0.5^3$ | **0.0125** |

**自检**：学习率随轮次单调递减 ✓；每三轮砍半、越后期步子越小，完全符合「前期大步、后期小步」的直觉 ✓。

## 调参直觉：初始值怎么挑、Adam 怎么帮忙

挑初始学习率有几个经验范围：

- **SGD 优化器**：从 $0.01 \sim 0.1$ 起步试。
- **Adam 优化器**：从 $0.001$（即 $10^{-3}$）起步——这是业界最常用的「安全默认值」。

验证方法就是前面说的：先跑几轮、看损失曲线形态，按锯齿 / 过慢 / 平滑三种情况往大或往小调。

> 另一条捷径：**Adam 这类「自适应优化器」会自动按每个参数的梯度历史，单独调整各自的有效学习率**，大幅减轻了手调 $\eta$ 的负担。很多人直接用 `Adam + lr=0.001` 就能跑出不错的结果。不过 Adam 内部细节值得单开一篇，这里只先点一句——理解学习率调度，依然是做好训练的基本功。

## PyTorch 里怎么写

在 PyTorch 里，学习率调度被封装成 `lr_scheduler`，跟优化器绑定：

```python
# 挂一个「阶梯衰减」调度器：每 30 轮把学习率乘 0.1
scheduler = torch.optim.lr_scheduler.StepLR(opt, step_size=30, gamma=0.1)
# 换成余弦退火：scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=60)
```

用法的精髓是**训练循环每轮末尾多调一句** `scheduler.step()`——它会按策略自动把优化器里的学习率改掉，下一轮 `opt.step()` 用的就是新值。

## 完整代码

接着梯度下降那篇「教模型学会 $y=2x$」的玩法，这回加一个**余弦退火调度器**，并打印每段学习率，让你亲眼看到 $\eta$ 怎么随训练平滑下降。整体流程仍是熟悉的「预测 → 扣分 → 算梯度 → 迈步」，只是在每轮结尾多一步「调学习率」。

```python
import torch
import torch.nn as nn   # 导入神经网络模块并起别名 nn，后续才能用 nn.Linear 这类 API

# ===== 任务：继续教模型学会「y = 2x」 =====
torch.manual_seed(42)                              # 固定随机种子，保证每次运行结果可复现
x_train = torch.linspace(1, 10, 20).reshape(-1, 1) # torch.linspace(起, 止, 个数)：在 1~10 均匀取 20 个数；reshape(-1, 1) 改成 20 行 1 列
y_train = 2 * x_train                               # 真实答案：每个数的两倍

# ===== 搭同一个最简线性模型 y = w·x + b =====
model = nn.Linear(1, 1)                             # 线性层：内置 y = w·x + b，输入 1 维、输出 1 维
opt = torch.optim.SGD(model.parameters(), lr=0.1)  # 优化器：初始学习率 η_0 = 0.1
loss_fn = nn.MSELoss()                             # 损失函数：均方误差

# ===== 关键新动作：挂一个「余弦退火」学习率调度器 =====
# 让 η 按余弦曲线从 0.1 平滑降到 0；T_max=60 是周期长度（设成总轮数，正好走半个余弦周期）
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=60)

# ===== 训练循环：每轮末尾多一步 scheduler.step()，自动改学习率 =====
for epoch in range(60):
    pred = model(x_train)          # 前向：模型预测
    loss = loss_fn(pred, y_train)  # 用 MSE 算损失（扣分）
    opt.zero_grad()                # 清空上一轮残留的梯度
    loss.backward()                # 反向传播：自动算出梯度 ∇L
    opt.step()                     # 用「当前学习率」迈一步：θ := θ − η·∇L
    scheduler.step()               # 学习率调度：按余弦曲线把 η 调小一档（下一轮生效）

    if epoch % 15 == 0:            # 每 15 轮打印一次，观察 η 怎么变
        cur_lr = opt.param_groups[0]['lr']   # 从优化器读出「当前实际学习率」
        print(f"第 {epoch:2d} 轮：lr={cur_lr:.4f}, loss={loss.item():.3f}")

# ===== 看看模型学会了没 =====
print(f"学到的权重 w：{model.weight.item():.3f}（标准答案 2）")
print(f"学到的偏置 b：{model.bias.item():.3f}（标准答案 0）")
```

运行时你会看到学习率按余弦公式平滑下降（loss 则从初始的较大值一路降到接近 0）：

```
第  0 轮：lr=0.1000, loss=38.659     （余弦起点：η 还是初始值 0.1）
第 15 轮：lr=0.0854, loss=0.123      （前段降得慢：还在大步快走）
第 30 轮：lr=0.0500, loss=0.005      （中点：正好砍半，cos(π/2)=0）
第 45 轮：lr=0.0146, loss=0.000      （后段接近 0：小步精修）
学到的权重 w：2.001（标准答案 2）
学到的偏置 b：0.000（标准答案 0）
```

其中 lr 数值由余弦公式 $\eta_t = 0.1 \times \frac{1+\cos(\pi t/60)}{2}$ 精确决定，可直接手算验证（如第 30 轮 $\cos(\pi/2)=0$，所以 $\eta_{30}=0.05$）；loss 的具体数值因随机初始化会略有不同，但都会从较大值持续降到接近 0，模型最终稳定收敛到 $y=2x$。

把调度器换成 `StepLR(opt, step_size=20, gamma=0.5)`，你会看到学习率呈**阶梯式**跳降而不是平滑下降——同一套训练循环，换个调度器就是不同的「换挡节奏」。这就是学习率调度在代码里的落地：一行 `scheduler.step()`，背后是「前期大步快走、后期小步精修」的全部思想。

## 小结

一句话浓缩：**学习率是每一步迈多大的那个数，太大会发散、太小会卡住；而学习率调度让它在训练中「前期大、后期小」，是固定学习率做不到的两全之策。** 挑初始值靠看损失曲线的「手感」，现代训练常用 warmup + 余弦退火的组合——理解了这些，你就拿到了控制训练节奏的油门。

## 参考资料

1. 动手学深度学习（李沐等）- 11.11 学习率调度器：系统讲解 step / 多项式 / 余弦等调度策略及实验对比
   https://d2l.ai/chapter_optimization/lr-scheduler.html
2. PyTorch 官方文档 - torch.optim.lr_scheduler：StepLR / CosineAnnealingLR 等调度器的 API 与公式
   https://docs.pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate
3. Cosine Learning Rate Schedule: Decay, Restarts, and Warmup：详解余弦退火及其与 warmup 的组合用法
   https://mbrenndoerfer.com/writing/cosine-learning-rate-schedule-decay-restarts-warmup
