---
title: LSTM 是什么
date: 2026-08-11 17:52
tags: [AI]
excerpt: LSTM（长短期记忆网络）是记性更好的输入法：普通 RNN 只记得最近两三个字，读到「我会说___」时早忘了开头的「法国」；LSTM 带着笔记本（细胞状态），能记住几百步前的关键信息，于是猜出「法语」。本文用输入法猜词贯穿全文，配四组门控公式、一个计算示例和可跑的 PyTorch 猜词代码。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIHJlZlg9IjgiIHJlZlk9IjMiIG9yaWVudD0iYXV0byIgbWFya2VyVW5pdHM9InN0cm9rZVdpZHRoIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMCw2IEw4LDMgeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8dGV4dCB4PSI4MCIgeT0iNzgiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43OCkiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXN0eWxlPSJpdGFsaWMiPue7huiDnueKtuaAgSBD77yI6ZqP6Lqr56yU6K6w5pys77yM5LiA6Lev5ZCR5YmN5rWB77yJPC90ZXh0PgogIDxsaW5lIHgxPSI5MCIgeTE9IjExMCIgeDI9IjExMTAiIHkyPSIxMTAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIgc3Ryb2tlLXdpZHRoPSI2IiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93KSIvPgoKICA8cmVjdCB4PSIxMDAiIHk9Ijg4IiB3aWR0aD0iOTAiIGhlaWdodD0iNDQiIHJ4PSI4IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIi8+CiAgPHRleHQgeD0iMTQ1IiB5PSIxMTYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5rOV5Zu9PC90ZXh0PgogIDx0ZXh0IHg9IjE0NSIgeT0iMTUyIiBmb250LXNpemU9IjEzIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODIpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+6K6w5LiA56yUPC90ZXh0PgoKICA8dGV4dCB4PSI0NDAiIHk9IjEwMCIgZm9udC1zaXplPSIxNyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuKApuKApu+8iOS4remXtOmalOS6huWHoOWNgeS4quWtl++8ieKApuKApjwvdGV4dD4KCiAgPHJlY3QgeD0iNTY1IiB5PSI5MiIgd2lkdGg9IjcwIiBoZWlnaHQ9IjM2IiByeD0iNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNikiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI0IDMiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjExNiIgZm9udC1zaXplPSIxNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuazleWbvTwvdGV4dD4KCiAgPHJlY3QgeD0iOTAwIiB5PSI4OCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIvPgogIDx0ZXh0IHg9Ijk0NSIgeT0iMTE2IiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuazleivrTwvdGV4dD4KICA8dGV4dCB4PSI5NDUiIHk9IjE1MiIgZm9udC1zaXplPSIxMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPue/u+WHuuadpeeUqDwvdGV4dD4KICA8dGV4dCB4PSI5NDUiIHk9IjE4MCIgZm9udC1zaXplPSIxMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5oiR5Lya6K+0IF9fXzwvdGV4dD4KCiAgPHRleHQgeD0iNjAwIiB5PSIyNDgiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuS4iemBk+mXqOaKiuWFs++8muiusOS7gOS5iCDCtyDlv5jku4DkuYggwrcg6K+05LuA5LmIPC90ZXh0PgoKICA8Y2lyY2xlIGN4PSIzNjAiIGN5PSIzMDAiIHI9IjM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTMpIi8+CiAgPHRleHQgeD0iMzYwIiB5PSIzMDgiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjNmM2M2ZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5b+YPC90ZXh0PgogIDx0ZXh0IHg9IjM2MCIgeT0iMzU2IiBmb250LXNpemU9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+6YGX5b+Y6ZeoIGY8L3RleHQ+CiAgPHRleHQgeD0iMzYwIiB5PSIzNzYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC42NikiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7liJLmjonov4fml7blhoXlrrk8L3RleHQ+CgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjMwMCIgcj0iMzQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45MykiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjMwOCIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7orrA8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIzNTYiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7ovpPlhaXpl6ggaTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjM3NiIgZm9udC1zaXplPSIxMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjY2KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuWGmeS4i+aWsOWGheWuuTwvdGV4dD4KCiAgPGNpcmNsZSBjeD0iODQwIiBjeT0iMzAwIiByPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkzKSIvPgogIDx0ZXh0IHg9Ijg0MCIgeT0iMzA4IiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuivtDwvdGV4dD4KICA8dGV4dCB4PSI4NDAiIHk9IjM1NiIgZm9udC1zaXplPSIxNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg4KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPui+k+WHuumXqCBvPC90ZXh0PgogIDx0ZXh0IHg9Ijg0MCIgeT0iMzc2IiBmb250LXNpemU9IjEyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNjYpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5Yaz5a6a5b+15ZOq5p2hPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjUwMCIgZm9udC1zaXplPSI5NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+TFNUTTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU0OCIgZm9udC1zaXplPSIzMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+6K6w5oCn5pu05aW955qE6L6T5YWl5rOVPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTkyIiBmb250LXNpemU9IjI0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzUpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="LSTM封面" />


你打字时，输入法会猜你下一个字想打什么——刚敲完「今天天气真」，它就跳出「好」等你选。这背后就是**循环神经网络（RNN）**：一个字一个字地读，根据前面读到的内容猜下一个。

但普通 RNN 有个致命弱点：**记性太差**。它只记得最近两三个字，再多就开始忘。想象输入法读到「我出生在法国……（中间隔了几十个字）……现在我会说___」——普通 RNN 读到「我会说」时，开头那个「法国」早就模糊了，自然猜不出该填「法语」。

**LSTM（Long Short-Term Memory，长短期记忆网络）** 就是来解决这个问题的。它还是输入法那套「逐字读、猜下一个」的思路，但随身带了一个**笔记本**（LSTM 里叫「细胞状态」）：读到「法国」时随手记一笔，中间不管隔多少字，等到「我会说___」这一步翻开笔记本一看——哦，法国——于是自信地猜出「法语」。

一句话：**LSTM 是记性更好的输入法**。该记的记进笔记本，该忘的划掉，该用的时候翻出来——全靠三道「门」把关。

从体系上看，LSTM 属于深度学习 → 循环神经网络（RNN 家族）的进阶成员，由 Sepp Hochreiter 和 Jürgen Schmidhuber 在 1997 年提出。它是普通 RNN 的直接升级，也是 2010 年代深度学习在语音识别、机器翻译等领域大放异彩的关键功臣之一。

## 普通输入法为什么猜不准：记不住远处的字

要理解 LSTM 为什么这么设计，先得知道普通 RNN 这台「输入法」出了什么问题。

RNN 处理一句话时，靠「隐藏状态」一步步往后传信息——每读一个字，就把新信息和上一步的记忆揉在一起，传给下一步。问题是：每传一步，信息就要乘一次权重，而指导学习的信号（梯度）在反向传播时要连乘很多次。如果权重大多小于 1，连乘几十步后梯度就**指数级衰减到接近 0**——这就是「梯度消失」。

后果很直接：网络想学「第 1 个字的『法国』和第 50 个字的『我会说』之间的关系」，却根本收不到来自第 50 步的有效信号。于是普通 RNN 读到「我会说」时，记忆里的「法国」已经被层层稀释到几乎为零，猜词自然猜偏。

LSTM 的解法很巧妙：它**不靠隐藏状态传长期记忆**，而是单独开了一条「细胞状态」通道——信息在这条通道上几乎是直通车的流动（只有加法和少量逐位乘法），梯度能畅通无阻地倒着流回去。于是几百步前写进笔记本的「法国」，也不会在路上消失。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0icnAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgb3JpZW50PSJhdXRvIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMTAsNSBMMCwxMCB6IiBmaWxsPSIjYTc4YmZhIi8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9InJwMiIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iOCIgbWFya2VySGVpZ2h0PSI4IiBvcmllbnQ9ImF1dG8iPgogICAgICA8cGF0aCBkPSJNMCwwIEwxMCw1IEwwLDEwIHoiIGZpbGw9IiNjNGI1ZmQiLz4KICAgIDwvbWFya2VyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzODAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+Uk5OIHZzIExTVE3vvJrlpJrkuIDmnaHjgIznu4bog57nirbmgIHjgI3pgJrpgZM8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+Uk5OIOWPqumdoCBoIOS4gOadoee6v+S8oOiusOW/hu+8iOair+W6pui/nuS5mOihsOWHj++8ie+8m0xTVE0g5aSa5LiA5p2hIEMg5Yqg5rOV6YCa6YGT77yM5qKv5bqm55WF6YCaPC90ZXh0PgoKICA8bGluZSB4MT0iNjAwIiB5MT0iNzgiIHgyPSI2MDAiIHkyPSIzNjUiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CgogIDwhLS0g5bem77yaUk5OIC0tPgogIDx0ZXh0IHg9IjMwMCIgeT0iMTAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij7mma7pgJogUk5O77ya5Y+q6Z2gIGgg5Lyg6K6w5b+GPC90ZXh0PgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjIwMCIgcj0iMzIiIGZpbGw9IiNhNzhiZmEiLz4KICA8dGV4dCB4PSIxNTAiIHk9IjIwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+aDwvdGV4dD4KICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIyMDAiIHI9IjMyIiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iMzAwIiB5PSIyMDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPmg8L3RleHQ+CiAgPGNpcmNsZSBjeD0iNDUwIiBjeT0iMjAwIiByPSIzMiIgZmlsbD0iI2M0YjVmZCIvPgogIDx0ZXh0IHg9IjQ1MCIgeT0iMjA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5oPC90ZXh0PgogIDxsaW5lIHgxPSIxODQiIHkxPSIyMDAiIHgyPSIyNjYiIHkyPSIyMDAiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI1IiBtYXJrZXItZW5kPSJ1cmwoI3JwKSIvPgogIDx0ZXh0IHg9IjIyNSIgeT0iMTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYTc4YmZhIj7DlyBXX2g8L3RleHQ+CiAgPGxpbmUgeDE9IjMzNCIgeTE9IjIwMCIgeDI9IjQxNiIgeTI9IjIwMCIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNCIgbWFya2VyLWVuZD0idXJsKCNycDIpIi8+CiAgPHRleHQgeD0iMzc1IiB5PSIxODgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNjNGI1ZmQiPsOXIFdfaDwvdGV4dD4KICA8dGV4dCB4PSIzMDAiIHk9IjI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+5qKv5bqm6L+e5LmY6LaK5Lyg6LaK5byx77yaPC90ZXh0PgogIDx0ZXh0IHg9IjMwMCIgeT0iMzAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYTc4YmZhIj4wLjkg4oaSIDAuODEg4oaSIDAuNzMg4oCm4oCm5Yeg5Y2B5q2l5ZCOIOKJiCAwPC90ZXh0PgogIDx0ZXh0IHg9IjMwMCIgeT0iMzMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjMWYyOTM3Ij7ihpIg6K6w5LiN5L2P5Yeg5Y2B5q2l5YmN55qE5L+h5oGvPC90ZXh0PgoKICA8IS0tIOWPs++8mkxTVE0gLS0+CiAgPHRleHQgeD0iOTAwIiB5PSIxMDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxZjI5MzciPkxTVE3vvJrlpJrkuIDmnaEgQyDliqDms5XpgJrpgZM8L3RleHQ+CiAgPHJlY3QgeD0iNjg1IiB5PSIxMzAiIHdpZHRoPSI0MzAiIGhlaWdodD0iMjYiIHJ4PSIxMyIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjkwMCIgeT0iMTQ4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj7nu4bog57nirbmgIEgQ++8muWPquacieWKoOazleWSjOmAkOS9jeS5mO+8jOair+W6pueVhemAmuaXoOmYuzwvdGV4dD4KICA8dGV4dCB4PSI2NzgiIHk9IjE0OCIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+Qyh0LTEpPC90ZXh0PgogIDx0ZXh0IHg9IjExMjQiIHk9IjE0OCIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+Qyh0KTwvdGV4dD4KICA8bGluZSB4MT0iNzcwIiB5MT0iMTU2IiB4Mj0iNzcwIiB5Mj0iMTk2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSI5MDAiIHkxPSIxNTYiIHgyPSI5MDAiIHkyPSIxOTYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjEwMzAiIHkxPSIxNTYiIHgyPSIxMDMwIiB5Mj0iMTk2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxyZWN0IHg9IjcyMCIgeT0iMTk2IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjU2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9Ijc3MCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj5MU1RNIOWNleWFgzwvdGV4dD4KICA8dGV4dCB4PSI3NzAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZiNzI4MCI+5LiJ6Zeo5o6nPC90ZXh0PgogIDxyZWN0IHg9Ijg1MCIgeT0iMTk2IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjU2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjkwMCIgeT0iMjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj5MU1RNIOWNleWFgzwvdGV4dD4KICA8dGV4dCB4PSI5MDAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMSIgZmlsbD0iIzZiNzI4MCI+5LiJ6Zeo5o6nPC90ZXh0PgogIDxyZWN0IHg9Ijk4MCIgeT0iMTk2IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjU2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjEwMzAiIHk9IjIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzZjNjNmZiI+TFNUTSDljZXlhYM8L3RleHQ+CiAgPHRleHQgeD0iMTAzMCIgeT0iMjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjNmI3MjgwIj7kuInpl6jmjqc8L3RleHQ+CiAgPGxpbmUgeDE9Ijc3MCIgeTE9IjI1MiIgeDI9Ijc3MCIgeTI9IjI3OCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDxsaW5lIHgxPSI5MDAiIHkxPSIyNTIiIHgyPSI5MDAiIHkyPSIyNzgiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8bGluZSB4MT0iMTAzMCIgeTE9IjI1MiIgeDI9IjEwMzAiIHkyPSIyNzgiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8Y2lyY2xlIGN4PSI3NzAiIGN5PSIyOTYiIHI9IjE4IiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iNzcwIiB5PSIzMDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPmg8L3RleHQ+CiAgPGNpcmNsZSBjeD0iOTAwIiBjeT0iMjk2IiByPSIxOCIgZmlsbD0iI2E3OGJmYSIvPgogIDx0ZXh0IHg9IjkwMCIgeT0iMzAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5oPC90ZXh0PgogIDxjaXJjbGUgY3g9IjEwMzAiIGN5PSIyOTYiIHI9IjE4IiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iMTAzMCIgeT0iMzAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5oPC90ZXh0PgogIDx0ZXh0IHg9IjkwMCIgeT0iMzQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj7ihpIg5Yeg55m+5q2l5YmN55qE44CM5rOV5Zu944CN5Lmf6IO95LiA6Lev5rWB5Yiw44CM5oiR5Lya6K+044CNPC90ZXh0Pgo8L3N2Zz4K" alt="RNN 与 LSTM 通道对比" />

*图 1：RNN 只有一条 h 传递线（梯度连乘衰减）；LSTM 在上方多开一条 C 加法通道，信息只做加法和逐位乘，梯度能沿它畅通无阻地回流几百步。*

## 先认得几个词

| 术语 | 大白话 |
|------|--------|
| **序列** | 按顺序排成一串的数据，比如一句话的各个字、一段音频的各帧。输入法逐字读，读的就是一个序列——**顺序一变意思就变**（「我吃饭」和「饭吃我」完全是两回事）。 |
| **时间步（time step）** | 序列里的「第几步」。处理一句话时，每读一个字就是走一个时间步，记作 t。 |
| **细胞状态 C** | LSTM 的「长期笔记本」，一条贯穿所有时间步的通道。**cell** 原意就是「格子」——你可以把它想成一排贯通的储物格，内容物一路往前流。 |
| **隐藏状态 h** | LSTM 此刻「对外说出口」的记忆，既要传给下一步，也要用来算输出。 |
| **门（gate）** | 一个能算出 0 到 1 之间小数的开关：1 = 全开（全放行），0 = 全关（全拦下）。**注意是「假熟词」**：它不是一扇物理意义上的门，而是**一排旋钮**——长期笔记本里每一格都单独配一个 0~1 的旋钮，控制那一格这次保留多少、放走多少。 |

## 三道门怎么协作：记什么、忘什么、说什么

LSTM 每走一个时间步（每读一个字），都要依次动一动笔记本，分成 4 组讲。先约定符号：

- `x_t`：当前输入（这一步读到的字）
- `h_{t-1}`：上一步的隐藏状态
- `C_{t-1}`：上一步的细胞状态（笔记本上一页）
- `σ`：sigmoid 函数（把任意数压到 0~1）
- `·`：矩阵乘法
- `⊙`：逐位相乘（Hadamard 积，对应位置相乘）

### 第一组：遗忘门——划掉过时内容

**公式：** `f_t = σ(W_f · [h_{t-1}, x_t] + b_f)`

**符号解读：**

- `W_f`、`b_f`：遗忘门自己要学的参数
- `[h_{t-1}, x_t]`：把上一步隐藏状态和当前输入拼起来
- 整个式子过一道 sigmoid：输出一个 0~1 的向量 `f_t`

**通俗理解：** 遗忘门看一眼「上一步记着的 + 这步新读到的」，给笔记本里的**每一格**打分——接近 0 的就擦掉（过时了），接近 1 的就保留（还有用）。就像整理笔记本时先决定「哪些旧内容该划掉」。

### 第二组：输入门 + 候选值——写下新内容

**输入门公式：** `i_t = σ(W_i · [h_{t-1}, x_t] + b_i)`

**候选值公式：** `C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)`

**符号解读：** `i_t` 同样是 0~1 的开关（决定要写哪几格）；`C̃_t` 是过 tanh 后落在 -1~1 的「候选新内容」，表示「这步我想往笔记本里写点啥」。

**通俗理解：** 输入门决定「**写到哪些格子**」，候选值决定「**写什么内容**」——两个一配合，就是「往笔记本上添加新条目」。tanh 之所以用 -1~1（而不是 sigmoid 的 0~1），是因为记忆既可能是「该做某事」也可能是「该避免某事」，需要正负两个方向。

工程上有个关键技巧：这四个量（f / i / C̃ / o）的计算式**结构完全一样**，只是参数不同，所以 PyTorch 里通常**用一个 `nn.Linear` 一次性算出四份，再用 `.chunk(4)` 切开**——比写四个独立的 Linear 又快又省内存，这也是业界标准写法：

```python
# 四个门一次算完，再 chunk 切成 4 段（PyTorch 工程惯例，而非写四个独立 Linear）
f_raw, i_raw, C_tilde_raw, o_raw = self.gates(combined).chunk(4, dim=-1)
```

### 第三组：细胞状态更新——一道式子把「划旧 + 写新」同时完成

**公式：** `C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t`

**符号解读：**

- `⊙`：逐位相乘（对应位置相乘）
- `f_t ⊙ C_{t-1}`：把旧记忆按遗忘门的比例缩水（划掉一部分）
- `i_t ⊙ C̃_t`：把新内容按输入门的比例写入（添上新的）
- 两者相加 = 更新后的细胞状态（笔记本翻到新的一页）

**通俗理解：** 旧的划掉一部分 + 新的写进去一部分 = 笔记本翻到了新的一页。这一步只用了加法和逐位乘法，**没有嵌套的非线性**，所以梯度能顺畅地沿这条通道反向流回任意远的过去——这正是 LSTM 不怕长程依赖的根源。

### 第四组：输出门 + 隐藏状态——此刻该念哪条

**输出门公式：** `o_t = σ(W_o · [h_{t-1}, x_t] + b_o)`

**隐藏状态公式：** `h_t = o_t ⊙ tanh(C_t)`

**符号解读：** `o_t` 又是一个 0~1 的开关；`C_t` 先过 tanh 压到 -1~1，再被 `o_t` 按比例放行，得到这一步的隐藏状态 `h_t`。

**通俗理解：** 细胞状态是「笔记本上的全部内容」，但你此刻不必把所有内容都念出来——输出门决定「**此刻该让多少记忆见光**」。就像笔记本里记了很多，但回答「下一个字该填啥」时只挑相关的那几条念出来。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0ibWciIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgb3JpZW50PSJhdXRvIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMTAsNSBMMCwxMCB6IiBmaWxsPSIjOWNhM2FmIi8+CiAgICA8L21hcmtlcj4KICAgIDxtYXJrZXIgaWQ9Im12IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI4IiBtYXJrZXJIZWlnaHQ9IjgiIG9yaWVudD0iYXV0byI+CiAgICAgIDxwYXRoIGQ9Ik0wLDAgTDEwLDUgTDAsMTAgeiIgZmlsbD0iI2E3OGJmYSIvPgogICAgPC9tYXJrZXI+CiAgICA8bWFya2VyIGlkPSJtcCIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iOCIgbWFya2VySGVpZ2h0PSI4IiBvcmllbnQ9ImF1dG8iPgogICAgICA8cGF0aCBkPSJNMCwwIEwxMCw1IEwwLDEwIHoiIGZpbGw9IiM2YzYzZmYiLz4KICAgIDwvbWFya2VyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI0NjAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+TFNUTSDljZXlhYPlhoXpg6jvvJrkuIDmnaEgQyDpgJrpgZMgKyDkuInpgZPpl6g8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzZiNzI4MCI+6YGX5b+Y6Zeo5YiS5pen44CB6L6T5YWl6Zeo5YaZ5paw44CB6L6T5Ye66Zeo5b+15Ye65p2l77ybQyDpgJrpgZPlj6rlgZrliqDms5XlkozpgJDkvY3kuZg8L3RleHQ+CgogIDwhLS0g6aG26YOoIEMg6YCa6YGTIC0tPgogIDxyZWN0IHg9IjYwIiB5PSI4NCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2E3OGJmYSIvPgogIDx0ZXh0IHg9IjEwOCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DKHQtMSk8L3RleHQ+CiAgPGxpbmUgeDE9IjE1NiIgeTE9IjEwNiIgeDI9IjI5OCIgeTI9IjEwNiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiLz4KICA8Y2lyY2xlIGN4PSIzMjAiIGN5PSIxMDYiIHI9IjIyIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjMyMCIgeT0iMTE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjNmM2M2ZmIj7DlzwvdGV4dD4KICA8dGV4dCB4PSIzNTAiIHk9IjEwMCIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iI2E3OGJmYSI+Zl90IOWIkuaXpzwvdGV4dD4KICA8bGluZSB4MT0iMzQyIiB5MT0iMTA2IiB4Mj0iNTk4IiB5Mj0iMTA2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxjaXJjbGUgY3g9IjYyMCIgY3k9IjEwNiIgcj0iMjIiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNjIwIiB5PSIxMTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPis8L3RleHQ+CiAgPHRleHQgeD0iNjUwIiB5PSIxMDAiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNhNzhiZmEiPmlfdMK3Q8yDX3Qg5YaZ5pawPC90ZXh0PgogIDxsaW5lIHgxPSI2NDIiIHkxPSIxMDYiIHgyPSI4MTgiIHkyPSIxMDYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPHJlY3QgeD0iODIwIiB5PSI4NCIgd2lkdGg9Ijk2IiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9Ijg2OCIgeT0iMTEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5DKHQpPC90ZXh0PgogIDxsaW5lIHgxPSI5MTYiIHkxPSIxMDYiIHgyPSIxMDE4IiB5Mj0iMTA2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNSIgbWFya2VyLWVuZD0idXJsKCNtcCkiLz4KICA8dGV4dCB4PSIxMDI4IiB5PSIxMDEiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YzYzZmYiPuS8oOe7meS4i+S4gOatpTwvdGV4dD4KCiAgPCEtLSDlm5vpgZPpl6ggLS0+CiAgPHJlY3QgeD0iMTMwIiB5PSIyNDAiIHdpZHRoPSIxNDAiIGhlaWdodD0iNjAiIHJ4PSI4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iMjAwIiB5PSIyNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiMxZjI5MzciPumBl+W/mOmXqDwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjI4NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iI2E3OGJmYSI+Zl90ID0gz4MowrcpPC90ZXh0PgoKICA8cmVjdCB4PSIzMDAiIHk9IjI0MCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI2MCIgcng9IjgiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSIzNzAiIHk9IjI2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+6L6T5YWl6ZeoPC90ZXh0PgogIDx0ZXh0IHg9IjM3MCIgeT0iMjg3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjYTc4YmZhIj5pX3QgPSDPgyjCtyk8L3RleHQ+CgogIDxyZWN0IHg9IjQ3MCIgeT0iMjQwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjU0MCIgeT0iMjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij7lgJnpgInlgLw8L3RleHQ+CiAgPHRleHQgeD0iNTQwIiB5PSIyODciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YzYzZmYiPkPMg190ID0gdGFuaCjCtyk8L3RleHQ+CgogIDxyZWN0IHg9IjcwMCIgeT0iMjQwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9Ijc3MCIgeT0iMjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij7ovpPlh7rpl6g8L3RleHQ+CiAgPHRleHQgeD0iNzcwIiB5PSIyODciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNhNzhiZmEiPm9fdCA9IM+DKMK3KTwvdGV4dD4KCiAgPCEtLSDpgZflv5jpl6gg4oaSIMOXIOWchiAtLT4KICA8bGluZSB4MT0iMjAwIiB5MT0iMjQwIiB4Mj0iMjAwIiB5Mj0iMTk2IiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIyMDAiIHkxPSIxOTYiIHgyPSIzMjAiIHkyPSIxOTYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGxpbmUgeDE9IjMyMCIgeTE9IjE5NiIgeDI9IjMyMCIgeTI9IjEyOCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbXYpIi8+CiAgPHRleHQgeD0iMjMyIiB5PSIxOTAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNhNzhiZmEiPmZfdDwvdGV4dD4KCiAgPCEtLSDovpPlhaXpl6jjgIHlgJnpgIkg4oaSIOebuOS5mCDihpIgKyDlnIYgLS0+CiAgPGxpbmUgeDE9IjM3MCIgeTE9IjI0MCIgeDI9IjM3MCIgeTI9IjIwNiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8bGluZSB4MT0iNTQwIiB5MT0iMjQwIiB4Mj0iNTQwIiB5Mj0iMjA2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIzNzAiIHkxPSIyMDYiIHgyPSI2MjAiIHkyPSIyMDYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iNjIwIiBjeT0iMjA2IiByPSIxNSIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjYyMCIgeT0iMjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMzc0MTUxIj7DlzwvdGV4dD4KICA8dGV4dCB4PSI0NzUiIHk9IjIwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCI+aV90IMK3IEPMg190PC90ZXh0PgogIDxsaW5lIHgxPSI2MjAiIHkxPSIxOTEiIHgyPSI2MjAiIHkyPSIxMjgiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIzIiBtYXJrZXItZW5kPSJ1cmwoI21nKSIvPgoKICA8IS0tIOi+k+WFpeaAu+e6vyAtLT4KICA8cmVjdCB4PSIxMjAiIHk9IjM2MCIgd2lkdGg9IjY5MCIgaGVpZ2h0PSI1NiIgcng9IjEwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iNDY1IiB5PSIzODYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPlsgaCh0LTEpICwgeCh0KSBdPC90ZXh0PgogIDx0ZXh0IHg9IjQ2NSIgeT0iNDA2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjZWNlOGZmIj7kuIrkuIDmraXpmpDol4/nirbmgIEgKyDov5nkuIDmraXovpPlhaXvvIzlm5vpgZPpl6jpg73nnIvlroM8L3RleHQ+CiAgPGxpbmUgeDE9IjIwMCIgeTE9IjM2MCIgeDI9IjIwMCIgeTI9IjMwMiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbWcpIi8+CiAgPGxpbmUgeDE9IjM3MCIgeTE9IjM2MCIgeDI9IjM3MCIgeTI9IjMwMiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbWcpIi8+CiAgPGxpbmUgeDE9IjU0MCIgeTE9IjM2MCIgeDI9IjU0MCIgeTI9IjMwMiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbWcpIi8+CiAgPGxpbmUgeDE9Ijc3MCIgeTE9IjM2MCIgeDI9Ijc3MCIgeTI9IjMwMiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbWcpIi8+CgogIDwhLS0g5Y+z5L6n6L6T5Ye66ZO+77yaQyh0KSDihpIgdGFuaCDihpIgw5cgbyDihpIgaCh0KSAtLT4KICA8bGluZSB4MT0iODY4IiB5MT0iMTI4IiB4Mj0iODY4IiB5Mj0iMTgyIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSI4NjgiIHkxPSIxODIiIHgyPSIxMDAwIiB5Mj0iMTgyIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxsaW5lIHgxPSIxMDAwIiB5MT0iMTgyIiB4Mj0iMTAwMCIgeTI9IjIxOCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbXApIi8+CiAgPHJlY3QgeD0iOTYwIiB5PSIyMjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0MCIgcng9IjYiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIxMDAwIiB5PSIyNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPnRhbmg8L3RleHQ+CiAgPGxpbmUgeDE9IjEwMDAiIHkxPSIyNjAiIHgyPSIxMDAwIiB5Mj0iMjcyIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxjaXJjbGUgY3g9IjEwMDAiIGN5PSIyOTIiIHI9IjE4IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iMTAwMCIgeT0iMjk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjNmM2M2ZmIj7DlzwvdGV4dD4KICA8bGluZSB4MT0iODQwIiB5MT0iMjcwIiB4Mj0iOTgyIiB5Mj0iMjkwIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9Ijg5NSIgeT0iMjc2IiBmb250LXNpemU9IjEyIiBmaWxsPSIjYTc4YmZhIj5vX3Q8L3RleHQ+CiAgPGxpbmUgeDE9IjEwMDAiIHkxPSIzMTAiIHgyPSIxMDAwIiB5Mj0iMzMwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIgbWFya2VyLWVuZD0idXJsKCNtcCkiLz4KICA8cmVjdCB4PSI5NTAiIHk9IjMzMiIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0NiIgcng9IjEwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iMTAwMCIgeT0iMzYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5oKHQpPC90ZXh0PgogIDxsaW5lIHgxPSIxMDUwIiB5MT0iMzU1IiB4Mj0iMTEwOCIgeTI9IjM1NSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjbXApIi8+CiAgPHRleHQgeD0iMTExNSIgeT0iMzUwIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj7lv7Xlh7rmnaU8L3RleHQ+CiAgPHRleHQgeD0iMTExNSIgeT0iMzY4IiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmI3MjgwIj7njJzkuIvkuIDkuKrlrZc8L3RleHQ+Cjwvc3ZnPgo=" alt="LSTM 单元内部结构" />

*图 2：一个时间步的内部——顶部 C 通道贯穿，遗忘门 f 划旧、输入门 i 配合候选 C̃ 写新、输出门 o 控制念出多少；四道门都看 [h(t-1), x(t)]。*

## 手算一个时间步

公式看着抽象，我们用一组**标量**（每个变量都是单个数，相当于 1 维的 LSTM）实际算一遍，你就知道这些门怎么把数字挪来挪去了——相当于输入法读完一个字，笔记本是怎么翻页的。

**初始条件：** 上一步的细胞状态（笔记本上一页）`C_{t-1} = 0.5`。

假设四个门已经算好了原始值（相当于线性层算完、还没过激活的数）：

| 量 | 原始值 z | 过激活 | 结果 |
|----|--------|--------|------|
| 遗忘门 f | z_f = 1.0 | sigmoid | f = 0.73 |
| 输入门 i | z_i = -1.0 | sigmoid | i = 0.27 |
| 候选值 C̃ | z_C = 0.5 | tanh | C̃ = 0.46 |
| 输出门 o | z_o = 2.0 | sigmoid | o = 0.88 |

> 提醒：sigmoid 把任意数压到 0~1（正数偏大、负数偏小）；tanh 压到 -1~1。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXgiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjgiIG1hcmtlckhlaWdodD0iOCIgb3JpZW50PSJhdXRvIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMTAsNSBMMCwxMCB6IiBmaWxsPSIjOWNhM2FmIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iMzgwIiBmaWxsPSIjZjhmOWZmIi8+CiAgPHRleHQgeD0iNjAwIiB5PSIzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+5Li65LuA5LmI6Zeo55SoIHNpZ21vaWTjgIHlgJnpgInnlKggdGFuaDwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj5zaWdtb2lkIOi+k+WHuiAwfjEg5b2T6Zeo55qE5byA5YWz77ybdGFuaCDovpPlh7og4oiSMX4xIOiuqeiusOW/huiDveiusOOAjOivpeWBmuOAjeS5n+iDveiusOOAjOivpemBv+WFjeOAjTwvdGV4dD4KCiAgPCEtLSDlm77kvosgLS0+CiAgPHJlY3QgeD0iMTA4IiB5PSI4NiIgd2lkdGg9IjI4OCIgaGVpZ2h0PSI5MiIgcng9IjgiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICA8dGV4dCB4PSIyNTIiIHk9IjEwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+5Lik57G75r+A5rS75Ye95pWwPC90ZXh0PgogIDxsaW5lIHgxPSIxMjQiIHkxPSIxMjgiIHgyPSIxNjgiIHkyPSIxMjgiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI0LjUiIHN0cm9rZS1kYXNoYXJyYXk9IjcgNCIvPgogIDx0ZXh0IHg9IjE3OCIgeT0iMTI1IiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij5zaWdtb2lk77yaMCB+IDE8L3RleHQ+CiAgPHRleHQgeD0iMTc4IiB5PSIxNDIiIGZvbnQtc2l6ZT0iMTEiIGZpbGw9IiM2YjcyODAiPuW9k+OAjOmXqOOAjeKAlOKAlCAwIOWFqOWFs+OAgTEg5YWo5byAPC90ZXh0PgogIDxsaW5lIHgxPSIxMjQiIHkxPSIxNjEiIHgyPSIxNjgiIHkyPSIxNjEiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI0LjUiLz4KICA8dGV4dCB4PSIxNzgiIHk9IjE1OCIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzFmMjkzNyI+dGFuaO+8muKIkjEgfiAxPC90ZXh0PgogIDx0ZXh0IHg9IjE3OCIgeT0iMTc1IiBmb250LXNpemU9IjExIiBmaWxsPSIjNmI3MjgwIj7lvZPjgIzlgJnpgIkv6K6w5b+G44CN4oCU4oCUIOWPr+ato+WPr+i0nzwvdGV4dD4KCiAgPCEtLSDmuJDov5HomZrnur8gLS0+CiAgPGxpbmUgeDE9IjQzMCIgeTE9IjEzMCIgeDI9IjEwOTAiIHkyPSIxMzAiIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNCIvPgogIDxsaW5lIHgxPSI0MzAiIHkxPSIzMzAiIHgyPSIxMDkwIiB5Mj0iMzMwIiBzdHJva2U9IiNkMWQ1ZGIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtZGFzaGFycmF5PSI1IDQiLz4KICA8dGV4dCB4PSIxMDk1IiB5PSIxMzQiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPnk9MTwvdGV4dD4KICA8dGV4dCB4PSIxMDk1IiB5PSIzMzQiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPnk94oiSMTwvdGV4dD4KCiAgPCEtLSDlnZDmoIfovbQg5Y6f54K5ICg3NjAsMjMwKSAtLT4KICA8bGluZSB4MT0iNDMwIiB5MT0iMjMwIiB4Mj0iMTA5MCIgeTI9IjIzMCIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiIG1hcmtlci1lbmQ9InVybCgjYXgpIi8+CiAgPGxpbmUgeDE9Ijc2MCIgeTE9IjM1NSIgeDI9Ijc2MCIgeTI9Ijg2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9Ijc2NSIgeT0iODAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiPng9MDwvdGV4dD4KICA8dGV4dCB4PSI0MzIiIHk9IjI0OCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzljYTNhZiI+4oiSNjwvdGV4dD4KICA8dGV4dCB4PSIxMDcwIiB5PSIyNDgiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPis2PC90ZXh0PgoKICA8IS0tIHRhbmgg5puy57q/77yaeOWDj+e0oD03NjAreCo1NSwgeeWDj+e0oD0yMzAtdGFuaCh4KSoxMDAgLS0+CiAgPHBvbHlsaW5lIHBvaW50cz0iNDMwLDMzMCA1NjUsMzI5IDYyMCwzMjYgNjc1LDMwNiA3NjAsMjMwIDg0NSwxNTQgOTAwLDEzNCA5NTUsMTMxIDEwOTAsMTMwIgogICAgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQuNSIvPgogIDwhLS0gc2lnbW9pZCDmm7Lnur/vvJp55YOP57SgPTIzMC1zaWdtb2lkKHgpKjEwMCAtLT4KICA8cG9seWxpbmUgcG9pbnRzPSI0MzAsMjI4IDU2NSwyMjUgNjIwLDIxOCA2NzUsMjAzIDc2MCwxODAgODQ1LDE1NyA5MDAsMTQyIDk1NSwxMzUgMTA5MCwxMzAiCiAgICBmaWxsPSJub25lIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iNC41IiBzdHJva2UtZGFzaGFycmF5PSI3IDQiLz4KCiAgPHRleHQgeD0iOTc1IiB5PSIxMjAiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPnRhbmg8L3RleHQ+CiAgPHRleHQgeD0iNTAwIiB5PSIyMTIiIGZvbnQtc2l6ZT0iMTUiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNhNzhiZmEiPnNpZ21vaWQ8L3RleHQ+Cjwvc3ZnPgo=" alt="sigmoid 与 tanh 函数图像对比" />

*图 3：sigmoid 把任意数压到 0~1（当门的开关），tanh 压到 −1~1（当候选/记忆，可正可负）——这是门和候选用不同激活函数的原因。*

**第一步——更新细胞状态（翻笔记本）：**

```
C_t = f · C_{t-1} + i · C̃
    = 0.73 · 0.5 + 0.27 · 0.46
    = 0.365 + 0.124
    = 0.489  ≈ 0.49
```

解读：旧记忆 0.5 被遗忘门削弱到 0.365（留了七成），新内容 0.46 被输入门削弱到 0.124（只写进去两成多），合起来新的细胞状态是 0.49——比原来略降，因为这步「忘的多、记的少」。

**第二步——算隐藏状态（念出来）：**

```
h_t = o · tanh(C_t)
    = 0.88 · tanh(0.49)
    = 0.88 · 0.45
    = 0.396  ≈ 0.40
```

解读：细胞状态 0.49 过 tanh 变成 0.45，再被输出门放到近九成（0.88），最终对外念出的隐藏状态是 0.40。

> 自检：sigmoid(1.0)=0.73、sigmoid(-1.0)=0.27、tanh(0.5)=0.46、tanh(0.49)=0.45 都是对的（sigmoid 把正数压成 >0.5、负数压成 <0.5；tanh 把 0.5 附近的数压到 0.46 附近）。算出来的 `C_t=0.49` 介于旧的 0.5 和新的 0.46 之间，符合「新旧按比例混合」的直觉——数字没算错。

这样一个时间步就跑完了——`h_t` 和 `C_t` 会作为「上一步」传给下一个时间步，周而复始。

## LSTM 在哪里闪光

LSTM 在以下场景长期是业界首选（直到 Transformer 兴起才部分让位）：

- **机器翻译**：把整句源语言读完再翻译，长句子开头的主语和结尾的动词要对得上——LSTM 能记住句首信息。
- **语音识别**：一段音频几十秒，前面的音节和后面的音节有上下文关系，LSTM 能抓住。
- **时间序列预测**：股票、天气、流量等带时间顺序的数据，LSTM 能捕捉跨时间的依赖。
- **文本生成**：写文章、写代码时，要记得前面写过什么才能接得上下文。

## 小结

LSTM 的精髓就一句话：**把「长期记忆」从隐藏状态里剥离出来，单独走一条加法通道（细胞状态），再用三个门控精确控制该忘什么、记什么、念什么**。遗忘门管划掉、输入门管写入、输出门管放行——三道关卡配合一条贯通的笔记本，就是它能在长句子里不掉链子的全部秘密。说到底，它就是一台**记性更好的输入法**。

## 完整代码：教 LSTM 当输入法

下面把上面 4 组公式翻译成 PyTorch，用一个和 RNN 版**完全相同的猜词任务**（「今天天气真 → 好」）来演示——同样的任务，把 `RNNCell` 换成 `LSTMCell`，你就能直观对比两者。重点看 `LSTMCell.forward` 里每一行注释，和文章公式逐条对应。代码已实跑验证：训练后 LSTM 真能猜对「好」（5 个随机种子下 loss 都降到 0，猜词全对）。

**先看懂整体流程，再看代码细节**——这段代码和 RNN 版一模一样的骨架「造大脑 → 备料 → 反复练习 → 考试」，只是「大脑」换成了 LSTM：

- **造大脑**（`class LSTMCell`）：零件是「四门合并的 `nn.Linear` + 细胞状态 C」，`forward` 里六行对应六个公式。
- **备料**：和 RNN 一样（字变 one-hot、造实例、备优化器/损失），**多一个初始细胞状态 C**（LSTM 特有）。
- **反复练习**（训练循环 200 次）：同样的 4 步——读字 → 算误差 → 反向 → 更新。LSTM 内部记得更久，但训练流程和 RNN 完全一样。
- **考试**：再读一遍（不调权重），看它猜什么。

你会发现：**把 `LSTMCell` 换回 `RNNCell`，代码照样跑**——因为「造 → 备 → 练 → 考」这个骨架是通用的，换的只是大脑。

```python
import torch
import torch.nn as nn

# ===== 任务：教 LSTM 学会「今天天气真 → 好」（输入法猜词原理）=====
# 词汇表就 5 个字，和 RNN 版猜词完全相同的任务，方便对比
vocab = ['今', '天', '气', '真', '好']
char2idx = {c: i for i, c in enumerate(vocab)}
inputs = [char2idx[c] for c in ['今', '天', '气', '真']]   # 输入序列
target = char2idx['好']                                    # 要猜的目标字

# ===== 定义 LSTM 单元（四门合并，对应文章 4 组公式）=====
# nn.Module 是 PyTorch 所有网络层的基类，自定义层都继承它
class LSTMCell(nn.Module):
    def __init__(self, vocab_size, h_dim):
        super().__init__()                          # super().__init__() 初始化父类，必须调用
        # 四个门（遗忘 f / 输入 i / 候选 C̃ / 输出 o）共用一个线性层：输出 4*h_dim
        # nn.Linear(in, out) 就是一次仿射变换 y = W·x + b，最常用的全连接层
        self.gates = nn.Linear(vocab_size + h_dim, 4 * h_dim)
        self.W_hy = nn.Linear(h_dim, vocab_size)   # 输出层：隐藏状态 → 每个字的得分

    # forward 定义数据怎么从输入流到输出，PyTorch 自动用它做前向传播
    def forward(self, x, h_prev, C_prev):
        # 拼接当前输入 x 和上一步隐藏状态 h_prev（对应公式里的 [h_{t-1}, x_t]）
        combined = torch.cat([h_prev, x], dim=-1)
        # 一次矩阵乘法算出四份结果，再用 chunk 切成 4 段——单 Linear 拆四门的关键
        f_raw, i_raw, C_tilde_raw, o_raw = self.gates(combined).chunk(4, dim=-1)

        f = torch.sigmoid(f_raw)            # 公式(1) 遗忘门：决定从旧记忆里丢弃多少
        i = torch.sigmoid(i_raw)            # 公式(2) 输入门：决定写入多少新信息
        C_tilde = torch.tanh(C_tilde_raw)   # 公式(3) 候选值：要写入的新内容
        C = f * C_prev + i * C_tilde        # 公式(4) 细胞状态更新：先擦旧再写新
        o = torch.sigmoid(o_raw)            # 公式(5) 输出门：决定念出多少
        h = o * torch.tanh(C)               # 公式(6) 隐藏状态：细胞状态过 tanh，由 o 控制放行
        y = self.W_hy(h)                    # 把隐藏状态映射成「每个字的得分」
        return h, C, y

# ===== 训练：反复读「今天天气真」，学会预测「好」=====
torch.manual_seed(42)
cell = LSTMCell(vocab_size=len(vocab), h_dim=16)
opt = torch.optim.Adam(cell.parameters(), lr=0.05)   # Adam 优化器，lr 是学习率
loss_fn = nn.CrossEntropyLoss()                       # 交叉熵损失：专为「多分类选一个」设计
x_seq = torch.eye(len(vocab))[inputs]                 # one-hot 编码：把字变成向量（输入法就这么干）

for epoch in range(200):
    h = torch.zeros(16)          # 初始隐藏状态
    C = torch.zeros(16)          # 初始细胞状态（LSTM 特有，一开始笔记本是空的）
    for x_t in x_seq:            # 逐字读：今 → 天 → 气 → 真
        h, C, y = cell(x_t, h, C)
    loss = loss_fn(y.unsqueeze(0), torch.tensor([target]))
    opt.zero_grad()      # 清空旧梯度（避免累积）
    loss.backward()      # 反向传播：自动算出每个权重的梯度
    opt.step()           # 用梯度更新权重——这一对就是"训练"的本质

# ===== 测试：输入「今天天气真」，看它猜什么 =====
h = torch.zeros(16)
C = torch.zeros(16)
for x_t in x_seq:
    h, C, y = cell(x_t, h, C)
print(f"输入「今天天气真」，LSTM 猜下一个字是：「{vocab[y.argmax()]}」")
print(f"训练 loss：{loss.item():.4f}")
```

运行输出：

```
输入「今天天气真」，LSTM 猜下一个字是：「好」
训练 loss：0.0000
```

——LSTM 真的学会了猜词，这正是输入法预测下一个字的原理。把 `LSTMCell` 换回上一篇的 `RNNCell`（去掉细胞状态 C），任务和代码结构完全一样，你就能直观对比两者的实现差异。

## 参考资料

1. Long Short-Term Memory - Hochreiter & Schmidhuber (1997, Neural Computation)
   https://deeplearning.cs.cmu.edu/S23/document/readings/LSTM.pdf
2. Understanding LSTM Networks - colah's blog
   https://colah.github.io/posts/2015-08-Understanding-LSTMs/
3. 长短期记忆网络（LSTM）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_recurrent-modern/lstm.html
