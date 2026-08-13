---
title: 神经网络是什么
date: 2026-08-12 15:20
tags: [AI]
excerpt: 神经网络就是你手机相册里那个自动把猫的照片归到一起的「识别引擎」。本文用一个「识猫评审委员会」的类比、一条神经元的计算公式、一个手算的神经元，加上能学会「尖耳朵+长胡须=猫」的 PyTorch 代码，讲清它怎么把一堆数字权重学成判断能力——并点出它是 CNN、RNN、Transformer 共同的地基。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOS4ieWIl+iKgueCuei/nue6v++8iOi+k+WFpeWxguKGkumakOiXj+WxguKGkui+k+WHuuWxgu+8ie+8jOS9k+eOsOelnue7j+WFg+WIhuWxgui/nuaOpSAtLT4KICA8ZyBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yNSkiIHN0cm9rZS13aWR0aD0iMS42Ij4KICAgIDwhLS0g6L6T5YWl5bGCKDMpIOKGkiDpmpDol4/lsYIoNCkgLS0+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMTMwIiB4Mj0iNTg0IiB5Mj0iMTAwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMTMwIiB4Mj0iNTg0IiB5Mj0iMTc1Ii8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMTMwIiB4Mj0iNTg0IiB5Mj0iMjUwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMTMwIiB4Mj0iNTg0IiB5Mj0iMzI1Ii8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMjE1IiB4Mj0iNTg0IiB5Mj0iMTAwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMjE1IiB4Mj0iNTg0IiB5Mj0iMTc1Ii8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMjE1IiB4Mj0iNTg0IiB5Mj0iMjUwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMjE1IiB4Mj0iNTg0IiB5Mj0iMzI1Ii8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMzAwIiB4Mj0iNTg0IiB5Mj0iMTAwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMzAwIiB4Mj0iNTg0IiB5Mj0iMTc1Ii8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMzAwIiB4Mj0iNTg0IiB5Mj0iMjUwIi8+CiAgICA8bGluZSB4MT0iMjk2IiB5MT0iMzAwIiB4Mj0iNTg0IiB5Mj0iMzI1Ii8+CiAgICA8IS0tIOmakOiXj+Wxgig0KSDihpIg6L6T5Ye65bGCKDIpIC0tPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjEwMCIgeDI9IjkwNCIgeTI9IjE3NSIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjEwMCIgeDI9IjkwNCIgeTI9IjI2MCIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjE3NSIgeDI9IjkwNCIgeTI9IjE3NSIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjE3NSIgeDI9IjkwNCIgeTI9IjI2MCIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjI1MCIgeDI9IjkwNCIgeTI9IjE3NSIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjI1MCIgeDI9IjkwNCIgeTI9IjI2MCIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjMyNSIgeDI9IjkwNCIgeTI9IjE3NSIvPgogICAgPGxpbmUgeDE9IjYxNiIgeTE9IjMyNSIgeDI9IjkwNCIgeTI9IjI2MCIvPgogIDwvZz4KCiAgPCEtLSDoioLngrnvvIjnpZ7nu4/lhYPvvIkgLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk2KSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiPgogICAgPGNpcmNsZSBjeD0iMjgwIiBjeT0iMTMwIiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iMjgwIiBjeT0iMjE1IiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iMjgwIiBjeT0iMzAwIiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMTAwIiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMTc1IiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMjUwIiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iNjAwIiBjeT0iMzI1IiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iOTIwIiBjeT0iMTc1IiByPSIxNiIvPgogICAgPGNpcmNsZSBjeD0iOTIwIiBjeT0iMjYwIiByPSIxNiIvPgogIDwvZz4KCiAgPCEtLSDlsYLmoIfnrb4gLS0+CiAgPGcgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjYyKSIgZm9udC1zaXplPSIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iMjgwIiB5PSIzNjAiPui+k+WFpeWxgjwvdGV4dD4KICAgIDx0ZXh0IHg9IjYwMCIgeT0iMzg1Ij7pmpDol4/lsYI8L3RleHQ+CiAgICA8dGV4dCB4PSI5MjAiIHk9IjMyMCI+6L6T5Ye65bGCPC90ZXh0PgogIDwvZz4KCiAgPHRleHQgeD0iNjAwIiB5PSI0NzAiIGZvbnQtc2l6ZT0iOTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuelnue7j+e9kee7nDwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU0MCIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="神经网络封面" />

你打开手机相册，长按一张猫的照片，能一键选中相册里所有的「猫」——这件你天天能做的事，背后就是一个**神经网络**在干。

一句话定义：神经网络是一种**模仿大脑神经元分工协作的方式**、靠**从数据里反复练习、不断调权重**来学会判断的机器学习模型。

但别被「模仿大脑」吓到——真正的神经网络比大脑简单亿万倍。用一个你秒懂的类比：它就像一个**识别猫的评审委员会**，分几道工序层层把关：

- 第一道工序的每个委员，只盯一个小线索——这只耳朵尖不尖？这撮毛什么颜色？眼睛圆不圆？——各自打出一个「初步印象」；
- 第二道委员把上一道的印象再综合——有尖耳朵 + 圆眼睛，更像猫了；
- 最后一道委员拍板：「是猫」还是「不是猫」。

每个委员对每个线索「听不听」，取决于一个数——**权重**（相当于这个委员给某个线索的**话语权**）。而整个委员会判断得准不准，靠的是**反复练习、不断微调每个委员的话语权**——这就是「训练」。

这个类比里，藏着神经网络全部的零件：**委员 = 神经元**，**话语权 = 权重**，**拍板前的标准高低 = 偏置**，**委员「要不要把印象往下传」的开关 = 激活函数**，**工序 = 层**。

从体系上看，神经网络是**深度学习的地基**，也是今天所有大名鼎鼎的模型的「祖宗」——识别图片的 CNN、处理语言的 RNN、撑起 ChatGPT 的 Transformer，骨子里都是「神经元分层连接 + 从数据学权重」的神经网络，只是连法不同。所以理解了神经网络，就拿到了理解这一整条技术脉络的钥匙。它最早可追溯到 1958 年 Rosenblatt 提出的**感知机**（Perceptron），是公认的人工神经元雏形。

## 先认得几个词

| 术语 | 大白话 |
|------|--------|
| **神经元（neuron）/ 节点** | 委员会里的一个「委员」：收进几个数（比如「耳朵尖不尖=1」「胡须长不长=0」），做一次简单计算，吐出一个数（比如「有点像猫=0.6」）。单个委员只会这点本事，厉害的是成千上万个连起来。 |
| **权重（weight）** | 委员对某条线索的「话语权」——AI 里就是一个跟着线索**相乘**的数。比如「耳朵尖」这条线索权重是 0.7，就是它能左右「是不是猫」结论的七成；权重是 0，这条线索就被完全无视。（不是日常说的「权力/分量」那种抽象感觉，而是真有一个具体的数。） |
| **偏置（bias）** | 委员本人的「脾气倾向」——AI 里就是一个固定**加上去**的数，跟线索无关、是委员自带的。偏置是正的，委员心软、证据不太够也容易点头说「是」；偏置是负的，委员眼高手低、证据得很足才肯松口。 |
| **激活函数（activation）** | 委员的一道「门槛」——证据够强才把印象往下传，太弱就压成零。**为什么非要有它？** 没这道门槛，哪怕叠一百个委员，它们合起来也只是一把直尺，只能一刀切（画一条直线把猫和狗分开）；有了它，网络才能学会弯弯绕绕的、真正复杂的判断。 |
| **层（layer）** | 一道工序：同一层的委员各自独立算，再把结果交给下一道。分输入层、隐藏层（中间若干道）、输出层——层层递进，越往后提炼出的特征越抽象。 |
| **训练 / 学习（假熟词）** | 这两个词在 AI 语境和日常不一样：不是人那样读书思考，而是指**用数据反复调网络里的权重和偏置，让输出越来越准**——文末代码里 `loss.backward()` + `opt.step()` 那两行，就是这件事的真实模样。 |

> 光记单个词还不够，把它们串起来跑一遍，你才知道这套零件怎么配合。假设有个只盯「耳朵尖」的委员：它收到线索值 1（耳朵确实尖），乘上权重 0.7，再加上自带的偏置 -0.2，算出原始冲动 $z = 0.7 \times 1 + (-0.2) = 0.5$；这个 $z$ 再过激活函数，就变成传给下一道工序的「印象」。
>
> 一句话总结四个词的分工：**权重大小**决定某条线索多重要，**偏置正负**决定委员严不严，**激活函数**决定够不够格往下传——一个神经元就这么把一堆线索揉成了一个判断。完整的逐步手算（含激活函数怎么算），见下一节。

## 一个神经元在干嘛：加权求和 + 激活

把「委员」拆开看，它干的事出奇地简单，就两步。

**第一步：把收到的线索各自乘上话语权，再加一个底数。**

$$z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$$

**符号解读：**

- $x_i$ —— 第 $i$ 个输入线索（比如「耳朵尖不尖」这个数）
- $w_i$ —— 这个线索的话语权（权重），AI 里是相乘的系数
- $n$ —— 输入线索的总个数，下标 $i$ 从 1 取到 $n$
- $b$ —— 偏置，这个委员的底数（标准高低）
- $z$ —— 加权求和的结果，还没过开关的「原始冲动」

**第二步：把 $z$ 过一遍激活函数，决定要不要往下传。**

$$a = f(z)$$

- $a$ —— 激活函数的输出，过完开关后往下传的「初步印象」

$f$ 就是激活函数，常见的有：

- **ReLU**：$z$ 是正的就原样放行，是负的直接归零——「不够明显就不传」。简单粗暴，今天绝大多数网络都用它。
- **Sigmoid**：把任意 $z$ 压进 $(0,1)$ 区间，可以当成「概率」——输出层爱用它来给「是猫的概率」打分。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5Li65LuA5LmI6Z2e6KaB5Yqg44CM5r+A5rS75Ye95pWw44CNPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiPuWPquaciee6v+aAp+WPmOaNou+8jOWGjeWkmuWxguS5n+WPquiDveeUu+S4gOadoeebtOe6v++8m+WKoOWFpemdnue6v+aAp++8jOaJjeiDveWtpuWHuuWkjeadgueahOWIhueVjDwvdGV4dD4KCiAgPCEtLSA9PT09PT09PT09PT0g5bem5Zu+77ya57qv57q/5oCnID09PT09PT09PT09PSAtLT4KICA8dGV4dCB4PSIyOTAiIHk9IjEwNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM5Y2EzYWYiPuWPquWPoOWKoOe6v+aApyDihpIg6L+Y5piv5LiA5p2h55u057q/PC90ZXh0PgoKICA8IS0tIOWdkOagh+ahhiAtLT4KICA8cmVjdCB4PSI3MCIgeT0iMTIwIiB3aWR0aD0iNDQwIiBoZWlnaHQ9IjIyMCIgcng9IjgiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIyIi8+CgogIDwhLS0g5LiA5p2h55u057q/77yM5peg5rOV5oqK5Lik57G754K55YiG5byAIC0tPgogIDxsaW5lIHgxPSIxMDAiIHkxPSIyMDAiIHgyPSI0ODAiIHkyPSIyOTAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CgogIDwhLS0g5Lik57G754K577yI5ZyGIHZzIOaWue+8ie+8jOebtOe6v+aXoOazleWIhuW8gCAtLT4KICA8ZyBmaWxsPSIjNmM2M2ZmIj4KICAgIDxjaXJjbGUgY3g9IjE0MCIgY3k9IjE2MCIgcj0iMTEiLz4KICAgIDxjaXJjbGUgY3g9IjE4MCIgY3k9IjI2MCIgcj0iMTEiLz4KICAgIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjMxMCIgcj0iMTEiLz4KICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjE4MCIgcj0iMTEiLz4KICA8L2c+CiAgPGcgZmlsbD0iI2E3OGJmYSI+CiAgICA8cmVjdCB4PSIyNjQiIHk9IjE1MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICA8cmVjdCB4PSIzMzAiIHk9IjIxMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICA8cmVjdCB4PSIzODAiIHk9IjE2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICA8cmVjdCB4PSI0MjAiIHk9IjI1MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgPC9nPgoKICA8IS0tIOWPieWPt+ihqOekuuWIhuS4jeW8gCAtLT4KICA8ZyBzdHJva2U9IiNlZjQ0NDQiIHN0cm9rZS13aWR0aD0iNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj4KICAgIDxsaW5lIHgxPSI1NDAiIHkxPSIxMjUiIHgyPSI1MDAiIHkyPSIxNjUiLz4KICAgIDxsaW5lIHgxPSI1MDAiIHkxPSIxMjUiIHgyPSI1NDAiIHkyPSIxNjUiLz4KICA8L2c+CiAgPHRleHQgeD0iNDgwIiB5PSIzNTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiM5Y2EzYWYiPuebtOe6v+S4gOWIgOWIh+S4jeW8gOi/meS4pOexuzwvdGV4dD4KCiAgPCEtLSA9PT09PT09PT09PT0g5Y+z5Zu+77ya5Yqg6Z2e57q/5oCnID09PT09PT09PT09PSAtLT4KICA8dGV4dCB4PSI4OTAiIHk9IjEwNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOSIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiPuWKoOS6hua/gOa0u+WHveaVsCDihpIg6IO95byv6IO95ouQPC90ZXh0PgoKICA8cmVjdCB4PSI2NzAiIHk9IjEyMCIgd2lkdGg9IjQ0MCIgaGVpZ2h0PSIyMjAiIHJ4PSI4IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgoKICA8IS0tIOmdnue6v+aAp+absue6v++8iOazoua1quWIhueVjO+8ieaKiuS4pOexu+WIhuW8gCAtLT4KICA8cGF0aCBkPSJNIDcwMCAyMDAgQyA3ODAgMTIwLCA4NjAgMzIwLCA5NDAgMjIwIFMgMTA0MCAxMzAsIDEwOTAgMjUwIgogICAgICAgIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI2Ii8+CgogIDwhLS0g5bem5L6n5LiA57G777yI5ZyG77yJIC0tPgogIDxnIGZpbGw9IiM2YzYzZmYiPgogICAgPGNpcmNsZSBjeD0iNzEwIiBjeT0iMTYwIiByPSIxMSIvPgogICAgPGNpcmNsZSBjeD0iNzYwIiBjeT0iMjYwIiByPSIxMSIvPgogICAgPGNpcmNsZSBjeD0iNzIwIiBjeT0iMzAwIiByPSIxMSIvPgogICAgPGNpcmNsZSBjeD0iODIwIiBjeT0iMTcwIiByPSIxMSIvPgogICAgPGNpcmNsZSBjeD0iODcwIiBjeT0iMjkwIiByPSIxMSIvPgogIDwvZz4KICA8IS0tIOWPs+S+p+S4gOexu++8iOaWue+8iSAtLT4KICA8ZyBmaWxsPSIjYTc4YmZhIj4KICAgIDxyZWN0IHg9IjkzOCIgeT0iMTUwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz4KICAgIDxyZWN0IHg9Ijk5MCIgeT0iMjkwIiB3aWR0aD0iMjAiIGhlaWdodD0iMjAiLz4KICAgIDxyZWN0IHg9IjEwMjAiIHk9IjE2MCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIi8+CiAgICA8cmVjdCB4PSIxMDYwIiB5PSIyODAiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIvPgogIDwvZz4KCiAgPCEtLSDlr7nli77ooajnpLrliIblvIDkuoYgLS0+CiAgPGcgc3Ryb2tlPSIjMTBiOTgxIiBzdHJva2Utd2lkdGg9IjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSI+CiAgICA8cGF0aCBkPSJNIDExMzAgMTQ1IEwgMTE1MCAxNjggTCAxMTgwIDEyMCIvPgogIDwvZz4KICA8dGV4dCB4PSI4OTAiIHk9IjM1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZjNjNmZiI+5byv5puy55qE5YiG55WM5oqK5Lik57G75bmy5bmy5YeA5YeA5YiG5byAPC90ZXh0Pgo8L3N2Zz4K" alt="线性与非线性分类边界对比" />

*图 1：激活函数的价值——没有它，网络叠再多也只能画一条直线；有了它，才能学出弯弯绕绕的分界，识别真正复杂的模式。*

> AI 里的「权重」是相乘的系数、「偏置」是相加的底数，两者都是网络自己学出来的参数。一个神经元用 PyTorch 写，核心就两行：

```python
z = self.layer(x)        # 加权求和 z = W·x + b（nn.Linear 把"权重矩阵+偏置"打包成一层）
a = torch.relu(z)        # 过激活函数 a = f(z)
```

这里的 `nn.Linear` 把「一堆权重 + 偏置」打包成一层，所以代码里看不到单独的 $w_i$、$b$——它们被藏进 `nn.Linear` 自带的参数里了。

## 手算一个神经元

公式看着抽象，我们用一个**只看两个线索**的委员实际算一遍，你就知道它怎么把线索变成判断。

**已知：** 两个输入 $x_1 = 1$（「耳朵尖」这个线索出现）、$x_2 = 0$（「长胡须」这个线索没出现）；权重 $w_1 = 0.7$（耳朵尖的话语权高）、$w_2 = 0.5$；偏置 $b = -0.2$（这个委员标准偏高，负数表示「证据不够强就先不倾向下结论」）。激活用 sigmoid。

| 步骤 | 计算 | 结果 |
|---|---|---|
| 加权求和 | $0.7 \times 1 + 0.5 \times 0 + (-0.2)$ | $0.7 + 0 - 0.2 = 0.5$ |
| sigmoid 激活 | $\dfrac{1}{1+e^{-0.5}}$ | $\mathbf{a \approx 0.62}$ |

（式中的 $e$ 是自然对数的底，约等于 2.718，是一个数学常数。）

**自检：** sigmoid 的输出必须落在 $(0,1)$ 区间——$0.62$ 在范围内 ✅；加权求和 $z = 0.5 > 0$，所以 $a > 0.5$（倾向「是」），方向也对 ✅。

这个 $a \approx 0.62$ 就是这个委员的「初步印象」，会作为新线索传给下一道工序的委员。

## 神经元怎么连成一张网：分层与前向传播

一个委员只会做简单的线性判断，但把成百上千个委员**分层串起来**，奇迹就出现了：**每一道工序，都在把上一步的线索揉成更高层、更抽象的印象**。

- **输入层**：接收原始数据。识猫时，就是图片里每个像素的数字。
- **隐藏层**（中间若干道）：第一道可能只认「边缘」「色块」这种零碎线索；后一道把边缘揉成「耳朵」「眼睛」；再后一道揉成「猫脸」。**层次越深，提炼出的特征越高级**——这就是「深度学习」里「深度」二字的来源。
- **输出层**：最后一道拍板，给出「是猫的概率」。

数据从输入层**逐层往后流**，每经过一个神经元就做一次「加权求和 + 激活」，最后在输出层得到预测——这个过程叫**前向传播**（forward）。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5YiG5bGC6L+e6LW35p2l77yM5omN6IO95oqK5YOP57Sg44CM5o+J44CN5oiQ5Yik5patPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiPuavj+e7j+i/h+S4gOmBk+W3peW6j++8jOeJueW+geWwseabtOaKveixoeOAgeabtOmrmOe6p+KAlOKAlOi/meWwseaYr+OAjOa3seW6puWtpuS5oOOAjemHjOOAjOa3seW6puOAjeS6jOWtl+eahOadpea6kDwvdGV4dD4KCiAgPCEtLSDlm5vpgZPlt6Xluo/mlrnmoYbvvIzmsLTlubPpgJLov5sgLS0+CiAgPCEtLSDlt6Xluo8x77ya5Y6f5aeL5YOP57SgIC0tPgogIDxnPgogICAgPHJlY3QgeD0iNDAiIHk9IjEzMCIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIxNTAiIHJ4PSIxNCIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDwhLS0g55So5bCP5pa55Z2X572R5qC856S65oSP5YOP57SgIC0tPgogICAgPGcgZmlsbD0iI2M0YjVmZCI+CiAgICAgIDxyZWN0IHg9IjcwIiB5PSIxNjAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiLz48cmVjdCB4PSI5NiIgeT0iMTYwIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIzIiBvcGFjaXR5PSIwLjYiLz4KICAgICAgPHJlY3QgeD0iMTIyIiB5PSIxNjAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuNCIvPjxyZWN0IHg9IjE0OCIgeT0iMTYwIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIzIiBvcGFjaXR5PSIwLjciLz4KICAgICAgPHJlY3QgeD0iMTc0IiB5PSIxNjAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuNSIvPjxyZWN0IHg9IjIwMCIgeT0iMTYwIiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIzIiBvcGFjaXR5PSIwLjgiLz4KICAgICAgPHJlY3QgeD0iNzAiIHk9IjE4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC41Ii8+PHJlY3QgeD0iOTYiIHk9IjE4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC44Ii8+CiAgICAgIDxyZWN0IHg9IjEyMiIgeT0iMTg2IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIzIiBvcGFjaXR5PSIwLjYiLz48cmVjdCB4PSIxNDgiIHk9IjE4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC45Ii8+CiAgICAgIDxyZWN0IHg9IjE3NCIgeT0iMTg2IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHJ4PSIzIiBvcGFjaXR5PSIwLjUiLz48cmVjdCB4PSIyMDAiIHk9IjE4NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC43Ii8+CiAgICAgIDxyZWN0IHg9IjcwIiB5PSIyMTIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuNyIvPjxyZWN0IHg9Ijk2IiB5PSIyMTIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuNCIvPgogICAgICA8cmVjdCB4PSIxMjIiIHk9IjIxMiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC44Ii8+PHJlY3QgeD0iMTQ4IiB5PSIyMTIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuNiIvPgogICAgICA8cmVjdCB4PSIxNzQiIHk9IjIxMiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiByeD0iMyIgb3BhY2l0eT0iMC41Ii8+PHJlY3QgeD0iMjAwIiB5PSIyMTIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgcng9IjMiIG9wYWNpdHk9IjAuOSIvPgogICAgPC9nPgogICAgPHRleHQgeD0iMTUwIiB5PSIyNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7ljp/lp4vlg4/ntKA8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOeureWktDHihpIyIC0tPgogIDxwb2x5Z29uIHBvaW50cz0iMjg1LDIwNSAzMDUsMTkzIDMwNSwyMTciIGZpbGw9IiM2YzYzZmYiLz4KICA8bGluZSB4MT0iMjYyIiB5MT0iMjA1IiB4Mj0iMzAyIiB5Mj0iMjA1IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNSIvPgoKICA8IS0tIOW3peW6jzLvvJrovrnnvJgv6Imy5Z2XIC0tPgogIDxnPgogICAgPHJlY3QgeD0iMzE1IiB5PSIxMzAiIHdpZHRoPSIyMjAiIGhlaWdodD0iMTUwIiByeD0iMTQiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8IS0tIOeUqOWHoOadoee6v+auteekuuaEj+i+uee8mCAtLT4KICAgIDxsaW5lIHgxPSIzNjAiIHkxPSIxNzAiIHgyPSI0NzAiIHkyPSIxODAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxsaW5lIHgxPSIzNzAiIHkxPSIyMDAiIHgyPSI0NjAiIHkyPSIyMDAiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik0gMzUwIDIzNSBRIDQyMCAyMTUgNDgwIDIzNSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPGNpcmNsZSBjeD0iNTAwIiBjeT0iMTc1IiByPSIxMCIgZmlsbD0iI2M0YjVmZCIvPgogICAgPHRleHQgeD0iNDI1IiB5PSIyNjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7ovrnnvJggwrcg6Imy5Z2XPC90ZXh0PgogIDwvZz4KCiAgPCEtLSDnrq3lpLQy4oaSMyAtLT4KICA8cG9seWdvbiBwb2ludHM9IjU2MCwyMDUgNTgwLDE5MyA1ODAsMjE3IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGxpbmUgeDE9IjUzNyIgeTE9IjIwNSIgeDI9IjU3NyIgeTI9IjIwNSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjUiLz4KCiAgPCEtLSDlt6Xluo8z77ya6ICz5py1L+ecvOedmyAtLT4KICA8Zz4KICAgIDxyZWN0IHg9IjU5MCIgeT0iMTMwIiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjE1MCIgcng9IjE0IiBmaWxsPSIjZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPCEtLSDkuKTkuKrkuInop5LogLPmnLUgKyDkuKTkuKrlnIbnnLznnZsgLS0+CiAgICA8cG9seWdvbiBwb2ludHM9IjY0MCwxODAgNjYwLDE1MCA2ODAsMTgwIiBmaWxsPSIjYTc4YmZhIi8+CiAgICA8cG9seWdvbiBwb2ludHM9IjcyMCwxODAgNzQwLDE1MCA3NjAsMTgwIiBmaWxsPSIjYTc4YmZhIi8+CiAgICA8Y2lyY2xlIGN4PSI2NjUiIGN5PSIyMTAiIHI9IjEwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8Y2lyY2xlIGN4PSI3MzUiIGN5PSIyMTAiIHI9IjEwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8cGF0aCBkPSJNIDY3MCAyNDAgUSA3MDAgMjU1IDczMCAyNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDx0ZXh0IHg9IjcwMCIgeT0iMjYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+6ICz5py1IMK3IOecvOedmzwvdGV4dD4KICA8L2c+CgogIDwhLS0g566t5aS0M+KGkjQgLS0+CiAgPHBvbHlnb24gcG9pbnRzPSI4MzUsMjA1IDg1NSwxOTMgODU1LDIxNyIgZmlsbD0iIzZjNjNmZiIvPgogIDxsaW5lIHgxPSI4MTIiIHkxPSIyMDUiIHgyPSI4NTIiIHkyPSIyMDUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSI1Ii8+CgogIDwhLS0g5bel5bqPNO+8mueMq+iEuCAvIOWIpOaWrSAtLT4KICA8Zz4KICAgIDxyZWN0IHg9Ijg2NSIgeT0iMTMwIiB3aWR0aD0iMjk1IiBoZWlnaHQ9IjE1MCIgcng9IjE0IiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8IS0tIOeMq+iEuOi9ruW7kyAtLT4KICAgIDxwb2x5Z29uIHBvaW50cz0iOTIwLDE3MCA5NDAsMTQwIDk2MCwxNzAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuODUiLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iMTAxMCwxNzAgMTAzMCwxNDAgMTA1MCwxNzAiIGZpbGw9IiNmZmYiIG9wYWNpdHk9IjAuODUiLz4KICAgIDxjaXJjbGUgY3g9Ijk1MCIgY3k9IjE5NSIgcj0iOSIgZmlsbD0iI2ZmZiIvPgogICAgPGNpcmNsZSBjeD0iMTAyMCIgY3k9IjE5NSIgcj0iOSIgZmlsbD0iI2ZmZiIvPgogICAgPHBhdGggZD0iTSA5NjAgMjMwIFEgOTg1IDI0OCAxMDEwIDIzMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogICAgPHRleHQgeD0iMTAxMiIgeT0iMjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZiI+54yr6IS4IOKGkuOAjOaYr+eMq+OAjTwvdGV4dD4KICA8L2c+CgogIDwhLS0g5bGC5qCH562+IC0tPgogIDxnIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM4YjVjZjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPHRleHQgeD0iMTUwIiB5PSIzMTAiPui+k+WFpeWxgjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQyNSIgeT0iMzEwIj7pmpDol4/lsYIgMTwvdGV4dD4KICAgIDx0ZXh0IHg9IjcwMCIgeT0iMzEwIj7pmpDol4/lsYIgMjwvdGV4dD4KICAgIDx0ZXh0IHg9IjEwMTIiIHk9IjMxMCI+6L6T5Ye65bGCPC90ZXh0PgogIDwvZz4KICA8bGluZSB4MT0iNDAiIHkxPSIzMzAiIHgyPSIxMTYwIiB5Mj0iMzMwIiBzdHJva2U9IiNlNWU3ZWIiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzU4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmI3MjgwIj7otorlvoDlkI7vvIzmj5Dngrzlh7rnmoTnibnlvoHotormir3osaHigJTigJTov5nlsLHmmK/jgIzmt7HluqbjgI3lnKjlgZrnmoTkuos8L3RleHQ+Cjwvc3ZnPgo=" alt="神经网络分层抽象示意" />

*图 2：每一层都在把上一层的线索揉成更抽象的特征——像素变成边缘，边缘变成耳朵眼睛，最终汇聚成「是猫」的判断。*

> 注意「深度」不是越深越好：层太多会更难训练，还容易「死记硬背」（术语叫**过拟合**——把训练题背得滚瓜烂熟，遇到新题却不会做）。多少层合适，是个经验活。

## 它是怎么学会的：训练 = 看答案、调话语权

到这里，网络其实还什么都不会——所有权重一开始都是**随机**的，输出基本是瞎猜。让它变聪明的过程叫**训练**，核心就一个循环：

1. **前向传播**：让网络对一批数据给出预测。
2. **算误差**：把预测和正确答案一比，算出差多少（这个差叫**损失 / loss**）。
3. **反向传播**：从输出层往回算，**揪出每个权重该为误差负多少责任**——哪些话语权该调大、哪些该调小。这一步用到的数学工具叫**梯度**，它指的方向正是「让误差下降最快」的方向。
4. **更新权重**：真的把权重往那个方向挪一点点。

重复这个循环成百上千次，权重越来越准，网络就从瞎猜变成了「会判断」。其中第 3、4 步——**反向传播 + 更新**——是整个 AI 的心脏。文末代码里 `loss.backward()` 和 `opt.step()` 这两行，干的就是这件事。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzFmMjkzNyI+5YmN5ZCR5Lyg5pKt566X6aKE5rWL77yM5Y+N5ZCR5Lyg5pKt6LCD5p2D6YeNPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiPuaVsOaNruWQkeWPs+a1geW+l+WIsOmihOa1i++8jOivr+W3ruWQkeW3puWbnua1geaPquWHuuavj+S4quadg+mHjeivpeaAjuS5iOiwgzwvdGV4dD4KCiAgPCEtLSDkuInlsYLoioLngrnvvJrovpPlhaXlsYIoMinjgIHpmpDol4/lsYIoMynjgIHovpPlh7rlsYIoMSkgLS0+CiAgPCEtLSDovpPlhaXlsYIgLS0+CiAgPGcgZmlsbD0iI2M0YjVmZCI+CiAgICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSIxODAiIHI9IjIwIi8+CiAgICA8Y2lyY2xlIGN4PSIxNjAiIGN5PSIyNTAiIHI9IjIwIi8+CiAgPC9nPgogIDwhLS0g6ZqQ6JeP5bGCIC0tPgogIDxnIGZpbGw9IiM2YzYzZmYiPgogICAgPGNpcmNsZSBjeD0iNTAwIiBjeT0iMTQwIiByPSIyMiIvPgogICAgPGNpcmNsZSBjeD0iNTAwIiBjeT0iMjE1IiByPSIyMiIvPgogICAgPGNpcmNsZSBjeD0iNTAwIiBjeT0iMjkwIiByPSIyMiIvPgogIDwvZz4KICA8IS0tIOi+k+WHuuWxgiAtLT4KICA8ZyBmaWxsPSIjYTc4YmZhIj4KICAgIDxjaXJjbGUgY3g9Ijg1MCIgY3k9IjIxNSIgcj0iMjQiLz4KICA8L2c+CgogIDwhLS0g6L+e57q/77yI5reh6Imy5bqV77yJIC0tPgogIDxnIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIxODAiIHgyPSI0NzgiIHkyPSIxNDAiLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIxODAiIHgyPSI0NzgiIHkyPSIyMTUiLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIxODAiIHgyPSI0NzgiIHkyPSIyOTAiLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIyNTAiIHgyPSI0NzgiIHkyPSIxNDAiLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIyNTAiIHgyPSI0NzgiIHkyPSIyMTUiLz4KICAgIDxsaW5lIHgxPSIxODAiIHkxPSIyNTAiIHgyPSI0NzgiIHkyPSIyOTAiLz4KICAgIDxsaW5lIHgxPSI1MjIiIHkxPSIxNDAiIHgyPSI4MjYiIHkyPSIyMTUiLz4KICAgIDxsaW5lIHgxPSI1MjIiIHkxPSIyMTUiIHgyPSI4MjYiIHkyPSIyMTUiLz4KICAgIDxsaW5lIHgxPSI1MjIiIHkxPSIyOTAiIHgyPSI4MjYiIHkyPSIyMTUiLz4KICA8L2c+CgogIDwhLS0g5bGC5qCH562+IC0tPgogIDxnIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YjcyODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPHRleHQgeD0iMTYwIiB5PSIzMjAiPui+k+WFpeWxgjwvdGV4dD4KICAgIDx0ZXh0IHg9IjUwMCIgeT0iMzMwIj7pmpDol4/lsYI8L3RleHQ+CiAgICA8dGV4dCB4PSI4NTAiIHk9IjI4NSI+6L6T5Ye65bGCPC90ZXh0PgogIDwvZz4KCiAgPCEtLSDliY3lkJHkvKDmkq3vvJrkuIrmlrnlpKfnrq3lpLTlkJHlj7MgLS0+CiAgPGc+CiAgICA8bGluZSB4MT0iMTIwIiB5MT0iMTAwIiB4Mj0iODgwIiB5Mj0iMTAwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNiIgbWFya2VyLWVuZD0idXJsKCNmd2QpIi8+CiAgICA8ZGVmcz4KICAgICAgPG1hcmtlciBpZD0iZndkIiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI4IiBtYXJrZXJIZWlnaHQ9IjgiIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgICA8cGF0aCBkPSJNMCAwIEwxMCA1IEwwIDEwIHoiIGZpbGw9IiM2YzYzZmYiLz4KICAgICAgPC9tYXJrZXI+CiAgICA8L2RlZnM+CiAgICA8cmVjdCB4PSIzNTAiIHk9Ijc2IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI4IiByeD0iMTQiIGZpbGw9IiM2YzYzZmYiLz4KICAgIDx0ZXh0IHg9IjUwMCIgeT0iOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmIj7ikaAg5YmN5ZCR5Lyg5pKt77ya5pWw5o2uIOKGkiDpooTmtYs8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOeul+ivr+W3ruawlOazoSAtLT4KICA8Zz4KICAgIDxyZWN0IHg9IjkyMCIgeT0iMTgwIiB3aWR0aD0iMjMwIiBoZWlnaHQ9Ijc0IiByeD0iMTIiIGZpbGw9IiNmZmYiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8dGV4dCB4PSIxMDM1IiB5PSIyMDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3Ij7ikaEg566X6K+v5beuPC90ZXh0PgogICAgPHRleHQgeD0iMTAzNSIgeT0iMjMyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj7pooTmtYsgdnMg5q2j56Gu562U5qGIID0gbG9zczwvdGV4dD4KICA8L2c+CgogIDwhLS0g5Y+N5ZCR5Lyg5pKt77ya5LiL5pa55aSn566t5aS05ZCR5bemIC0tPgogIDxnPgogICAgPGxpbmUgeDE9Ijg4MCIgeTE9IjM3MCIgeDI9IjEyMCIgeTI9IjM3MCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjYiIHN0cm9rZS1kYXNoYXJyYXk9IjEyIDgiIG1hcmtlci1lbmQ9InVybCgjYndkKSIvPgogICAgPGRlZnM+CiAgICAgIDxtYXJrZXIgaWQ9ImJ3ZCIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iOCIgbWFya2VySGVpZ2h0PSI4IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgICAgPHBhdGggZD0iTTAgMCBMMTAgNSBMMCAxMCB6IiBmaWxsPSIjYTc4YmZhIi8+CiAgICAgIDwvbWFya2VyPgogICAgPC9kZWZzPgogICAgPHJlY3QgeD0iMzIwIiB5PSIzNDYiIHdpZHRoPSIzNjAiIGhlaWdodD0iMjgiIHJ4PSIxNCIgZmlsbD0iI2E3OGJmYSIvPgogICAgPHRleHQgeD0iNTAwIiB5PSIzNjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjZmZmIj7ikaIg5Y+N5ZCR5Lyg5pKt77ya6K+v5beu5Zue5rWBIOKGkiDosIPmr4/kuKrmnYPph408L3RleHQ+CiAgPC9nPgo8L3N2Zz4K" alt="前向传播与反向传播对照" />

*图 3：训练的一来一回——前向传播让数据向右流得到预测，反向传播让误差向左回流、揪出每个权重该怎么调。*

> 反向传播和「梯度下降」本身是两座大山，本文先点到为止——它们各自值得单开一篇。你只要先记住一句话：**训练的本质，就是反复「看答案、调话语权」**。

## 神经网络在哪里大显身手

只要一件事能变成「输入一堆数字、输出一个判断」，神经网络就能上手：

- **图像识别**：手机相册按猫狗/人脸自动分类、人脸解锁、拍题识花，背后都是它（更专门的形态叫 CNN）。
- **语音助手**：把你的语音转成文字，再把文字理解成可执行的指令。
- **机器翻译 / 聊天机器人**：今天的大模型（ChatGPT 这类）本质也是神经网络（Transformer 这种连法），只是规模大到惊人。
- **推荐系统**：短视频、购物 App 越用越懂你，靠的就是它学你的偏好。
- **预测与决策**：信用评估、天气预报、医疗影像辅助诊断。

## 小结

神经网络就是一个**分层的识别委员会**：每个神经元干的事极简单——把收到的线索按**权重**加权求和、加个**偏置**、再过个**激活函数**（$z = w_1x_1+\cdots+w_nx_n+b$，$a=f(z)$）；成千上万个神经元**分层连起来**，就能把像素这种零碎输入层层提炼成「是不是猫」这样的判断；而它「变聪明」靠的不是人写规则，而是**反复看数据、对照答案、微调每个权重**（反向传播 + 更新）。它是 CNN、RNN、Transformer 共同的地基——理解了它，就握住了进入深度学习的总钥匙。

## 完整代码：教一个神经网络认猫

下面把上面的零件翻译成 PyTorch，教一个最小的神经网络学会「**尖耳朵 + 长胡须 → 是猫**」这条规则。重点看 `CatNet.forward` 里每一行注释，和文章公式逐条对应。代码已实跑验证：训练后真学会了——尖耳朵 + 长胡须判为猫（概率 0.99），其余三种都判不是（概率 0.00）。

**先看懂整体流程，再看代码细节**——这段代码回答「怎么教神经网络学会一条判断规则」，骨架是「造大脑 → 备料 → 反复练习 → 考试」：

- **造大脑**（`class CatNet`）：把神经网络的零件（两层 `nn.Linear` + 一个 `ReLU` 激活）和算法（`forward`）打包成一个类。
- **备料**：准备 4 条带标签的小数据（两个特征 + 是不是猫），造出大脑实例（权重先随机），备好「调权重的工具」（优化器）和「量误差的工具」（损失函数）。
- **反复练习**（训练循环 500 次）：每次循环 4 步——**预测**（前向传播）→ **算误差**（和正确答案比）→ **反向**（算每个权重该往哪调）→ **更新**（真的去调）。重复 500 次，权重越来越准。
- **考试**（测试）：再喂一遍数据，看它现在判什么。学会了就只在「尖耳朵 + 长胡须」时判「是猫」。

记住这个骨架：**造 → 备 → 练（预测→误差→反向→改）→ 考**。上一篇 RNN 是这个流程，这篇的神经网络也是——变的只是「大脑」内部怎么算。

```python
import torch
import torch.nn as nn   # nn 是 PyTorch 的神经网络模块，Linear/ReLU 等现成的"零件"都在里面

# ===== 任务：教神经网络学会「尖耳朵 + 长胡须 → 是猫」=====
# 两个特征：x1=是否有尖耳朵, x2=是否有长胡须；只有两个都满足才算猫
# torch.tensor 把列表变成"张量"——就是 PyTorch 存数据用的多维数组，是这里所有数据的基本容器
X = torch.tensor([[1., 1.],   # 尖耳朵 + 长胡须 → 猫
                  [1., 0.],   # 只尖耳朵 → 不是
                  [0., 1.],   # 只长胡须 → 不是
                  [0., 0.]])  # 都没有 → 不是
y = torch.tensor([[1.], [0.], [0.], [0.]])   # 标签：是不是猫

# ===== 定义最小的神经网络（对应文章结构）=====
# nn.Module 是 PyTorch 所有网络层的基类，自定义网络都继承它
class CatNet(nn.Module):
    def __init__(self):
        super().__init__()                          # super().__init__() 初始化父类，必须调用
        self.layer1 = nn.Linear(2, 4)              # 输入层→隐藏层：2 个线索进，4 个神经元（多一道综合工序）
        self.act = nn.ReLU()                        # 激活函数：引入非线性（够明显才往下传）
        self.layer2 = nn.Linear(4, 1)              # 隐藏层→输出层：4 个神经元综合 → 1 个"是不是猫"的得分

    # forward 定义数据怎么从输入流到输出，PyTorch 自动用它做前向传播
    def forward(self, x):
        z1 = self.layer1(x)                         # 第一层加权求和（公式 z = W·x + b）
        a1 = self.act(z1)                           # 过激活函数（公式 a = f(z)）
        z2 = self.layer2(a1)                        # 第二层再加权求和
        return torch.sigmoid(z2)                    # 输出层用 sigmoid 压成 0~1 的概率（是不是猫）

# ===== 训练：反复看 4 条数据，学会"尖耳朵+长胡须=猫"=====
torch.manual_seed(42)   # 固定随机种子：网络初始权重是随机生成的，设了种子后每次跑结果都一样（方便复现文章里的数字）
net = CatNet()          # 造出大脑实例——此刻权重还是随机的、啥都不会，接下来靠训练把它教会
opt = torch.optim.Adam(net.parameters(), lr=0.05)   # Adam 优化器，lr 是学习率
loss_fn = nn.BCELoss()                               # 二分类交叉熵损失：专为「是/不是」二选一设计

for epoch in range(500):
    pred = net(X)           # 前向传播：四条数据一起算预测
    loss = loss_fn(pred, y) # 算误差：预测 vs 正确答案
    opt.zero_grad()         # 清空旧梯度（避免累积）
    loss.backward()         # 反向传播：自动算每个权重的梯度
    opt.step()              # 用梯度更新权重——这一对就是"训练"的本质

# ===== 测试：看它学没学会 =====
with torch.no_grad():                          # 测试时不调权重，no_grad 关掉梯度计算省内存
    for i, x in enumerate(X):
        feat = ('尖耳朵' if x[0] else '无尖耳朵') + '+' + ('长胡须' if x[1] else '无长胡须')
        print(f"{feat} → 是猫的概率 {net(x)[0]:.2f}")
print(f"训练 loss：{loss.item():.4f}")
```

运行输出：

```
尖耳朵+长胡须 → 是猫的概率 0.99
尖耳朵+无长胡须 → 是猫的概率 0.00
无尖耳朵+长胡须 → 是猫的概率 0.00
无尖耳朵+无长胡须 → 是猫的概率 0.00
训练 loss：0.0039
```

——神经网络真的学会了：只要「尖耳朵 + 长胡须」同时出现，它就判「是猫」（0.99），否则判「不是」（0.00）。这条「两个线索同时满足才成立」的规则（逻辑上的「与」），没有任何人写进代码——网络是**自己从 4 条数据里把权重练出来的**。把数据换成更复杂的图片像素、把网络加深加宽，同一套「加权求和 + 激活 + 反复调权重」就能识别真实的猫狗，甚至撑起 ChatGPT。

## 参考资料

1. What is a neural network? - IBM
   https://www.ibm.com/think/topics/neural-networks
2. 多层感知机（5.1 节）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html
3. But what is a neural network? - 3Blue1Brown（神经网络可视化经典系列）
   https://www.3blue1brown.com/lessons/neural-networks
