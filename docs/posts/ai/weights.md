---
title: 权重
date: 2026-08-13 15:40
tags: [AI]
excerpt: "你每天打开邮箱，几十封邮件里总能一眼挑出垃圾邮件。凭什么？你其实在大脑里飞速掂量几条线索：标题有没有「中奖」、发件人陌不陌生、是不是一堆感叹号。而这些线索在你心里的分量并不一样。"
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOinhuiniemakOWWu++8mjMg5Liq6L6T5YWl6IqC54K577yM6L+e57q/57KX57uG5LiN5ZCM77yM5rGH6IGa5YiwIDEg5Liq6L6T5Ye66IqC54K577yI5p2D6YeNID0g6L+e5o6l55qE5by65bqmL+WIhumHj++8iS0tPgogIDxjaXJjbGUgY3g9IjMzMCIgY3k9IjE3MCIgcj0iMjYiIGZpbGw9IndoaXRlIi8+CiAgPGNpcmNsZSBjeD0iMzMwIiBjeT0iMjY1IiByPSIyNiIgZmlsbD0id2hpdGUiLz4KICA8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzNjAiIHI9IjI2IiBmaWxsPSJ3aGl0ZSIvPgoKICA8bGluZSB4MT0iMzU2IiB5MT0iMTcwIiB4Mj0iODE4IiB5Mj0iMjY1IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiIHN0cm9rZS13aWR0aD0iMTQiLz4KICA8bGluZSB4MT0iMzU2IiB5MT0iMjY1IiB4Mj0iODE4IiB5Mj0iMjY1IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC41KSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CiAgPGxpbmUgeDE9IjM1NiIgeTE9IjM2MCIgeDI9IjgxOCIgeTI9IjI2NSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHN0cm9rZS13aWR0aD0iOSIvPgoKICA8Y2lyY2xlIGN4PSI4NTAiIGN5PSIyNjUiIHI9IjM0IiBmaWxsPSJ3aGl0ZSIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjUwMCIgZm9udC1zaXplPSI5NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7mnYPph408L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTY1IiBmb250LXNpemU9IjM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCiAgICAgICAgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="权重封面" />

你每天打开邮箱，几十封邮件里总能一眼挑出垃圾邮件。凭什么？你其实在大脑里飞速掂量几条线索：标题有没有「中奖」、发件人陌不陌生、是不是一堆感叹号。而这些线索在你心里的分量并不一样——「中奖」两个字一出现，基本就八九不离十了；感叹号多一点少一点，影响不大。

神经网络里的**权重（weight）**，干的就是这件事：给每条线索标一个「该听多少」的数。

## 权重是什么

权重是连在每条输入线索上的一个数。它和线索的值**相乘**，决定这条线索对最终结果的影响力大小——数越大，这条线越「粗」，说明网络越看重它。

接着上面的垃圾邮件例子：「含『中奖』」这条线索的权重可能是 3.0（重），「感叹号多」这条只有 0.2（轻）。一个神经元（网络里最基本的计算单元）把所有「线索 × 权重」加起来，再加一个偏置 $b$（一个和具体线索无关的基础分，负责把整体倾向拉高或拉低），就得到一个总分 $z$。怎么拿这个总分下判断？这里有个简单约定：**以 0 为分界线**——$z>0$，线索们合力把分数顶过基础分，倾向判为垃圾邮件；$z<0$，则判为正常邮件。

在 AI 体系里，**权重和偏置合起来叫「参数」**。一个神经网络可能有几亿、上百亿个参数——而所谓「训练一个模型」，本质就是把这些权重调到一组合适的值。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQ0MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTAiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7liqDmnYPmsYLlkozvvJrnrpfkuIDlsIHpgq7ku7bnmoTmgLvliIY8L3RleHQ+CgogIDxyZWN0IHg9IjgwIiB5PSIxMjAiIHdpZHRoPSIzMDAiIGhlaWdodD0iOTAiIHJ4PSIxMiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjIzMCIgeT0iMTU2IiBmb250LXNpemU9IjIxIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5ZCr44CM5Lit5aWW44CNeOKCgT0xIMOXIHfigoE9My4wPC90ZXh0PgogIDx0ZXh0IHg9IjIzMCIgeT0iMTkwIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPj0gMy4wPC90ZXh0PgoKICA8cmVjdCB4PSI4MCIgeT0iMjQwIiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjkwIiByeD0iMTIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIyMzAiIHk9IjI3NiIgZm9udC1zaXplPSIyMSIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuaEn+WPueWPt+WkmiB44oKCPTEgw5cgd+KCgj0wLjI8L3RleHQ+CiAgPHRleHQgeD0iMjMwIiB5PSIzMTAiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+PSAwLjI8L3RleHQ+CgogIDxsaW5lIHgxPSIzODAiIHkxPSIyMjUiIHgyPSI0NzgiIHkyPSIyMjUiIHN0cm9rZT0iIzFmMjkzNyIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0OTAsMjI1IDQ3NiwyMTcgNDc2LDIzMyIgZmlsbD0iIzFmMjkzNyIvPgoKICA8cmVjdCB4PSI0OTAiIHk9IjE1MCIgd2lkdGg9IjI4MCIgaGVpZ2h0PSIxNTAiIHJ4PSIxMiIgZmlsbD0iI2E3OGJmYSIvPgogIDx0ZXh0IHg9IjYzMCIgeT0iMTkwIiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5Yqg5p2D5rGC5ZKMIM6jPC90ZXh0PgogIDx0ZXh0IHg9IjYzMCIgeT0iMjI1IiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+My4wICsgMC4yID0gMy4yPC90ZXh0PgogIDx0ZXh0IHg9IjYzMCIgeT0iMjYyIiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5YaN5Yqg5YGP572uIGIgPSAtMS4wPC90ZXh0PgoKICA8bGluZSB4MT0iNzcwIiB5MT0iMjI1IiB4Mj0iODU4IiB5Mj0iMjI1IiBzdHJva2U9IiMxZjI5MzciIHN0cm9rZS13aWR0aD0iNCIvPgogIDxwb2x5Z29uIHBvaW50cz0iODcwLDIyNSA4NTYsMjE3IDg1NiwyMzMiIGZpbGw9IiMxZjI5MzciLz4KCiAgPHJlY3QgeD0iODcwIiB5PSIxNTAiIHdpZHRoPSIyNTAiIGhlaWdodD0iMTAwIiByeD0iMTIiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI5OTUiIHk9IjE5MiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuaAu+WIhiB6ID0gMi4yPC90ZXh0PgogIDx0ZXh0IHg9Ijk5NSIgeT0iMjI4IiBmb250LXNpemU9IjIyIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+eiAmZ3Q7IDA8L3RleHQ+CgogIDx0ZXh0IHg9Ijk5NSIgeT0iMzAwIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzZjNjNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+4oaSIOWIpOS4uuWeg+WcvumCruS7tjwvdGV4dD4KPC9zdmc+Cg==" alt="加权求和流程示意" />

*图 1：把两条线索各乘自己的权重、相加、再加偏置，算出一封邮件的总分*

## 一个公式说清它

$$z = \sum_{i=1}^{n} w_i x_i + b$$

逐个符号的意思是：

- $z$ —— 神经元算出的总分（还没经过最后一步的概率化，可正可负）
- $i$ —— 线索编号，从 1 数到 $n$
- $n$ —— 线索总条数
- $x_i$ —— 第 $i$ 条线索的取值（比如「含中奖」这条，命中记 1、没命中记 0）
- $w_i$ —— 第 $i$ 条线索的权重，即这条线索有多重要
- $\sum$ —— 求和号，把每一条「线索 × 权重」都乘好，再统统加起来
- $b$ —— 偏置，一个固定的基础分，和具体哪条线索无关

换成评委打分就好懂了：每个评委的打分（$x_i$）乘以他的话语权（$w_i$），全加起来再加个基础分（$b$），就是总分。

代入垃圾邮件算一遍：线索「含中奖」$x_1=1$（命中）、「感叹号多」$x_2=1$（命中），权重 $w_1=3.0$、$w_2=0.2$，偏置 $b=-1.0$：

$$z = 3.0\times 1 + 0.2\times 1 + (-1.0) = 2.2$$

总分 $z=2.2>0$，倾向判为垃圾邮件。换成一封正常邮件（两条线索都不命中）：$z = 3.0\times 0 + 0.2\times 0 + (-1.0) = -1.0$，是负数，判为正常。

自检：方向对得上 ✅——「中奖」命中 → 正 → 垃圾邮件；两条都不命中 → 负 → 正常邮件。

## 权重是怎么「学」出来的

关键问题来了：这些权重一开始从哪来？答案是——**随机瞎设**。刚起步的网络啥也不懂，只会乱猜。

所谓「学习」，就是一轮轮把这个乱猜的权重往准里调：

1. 网络用当前的权重算出总分，给出判断；
2. 拿这个判断和正确答案比，算出误差（这一步由损失函数负责）；
3. 用**梯度**（告诉你每个权重该往大调还是往小调、各调多少）反过来修正每一个权重，这步叫反向传播；
4. 调完再来一轮，如此循环成千上万次。

练到最后，权重稳定在一组能让网络答对的值上。**整个网络「学到的全部知识」，就编码在这几亿个调好的权重里**——一张磁盘上的权重文件，就是一个训练好的模型。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQ2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQ2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTAiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMWYyOTM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7orq3nu4PvvJrmiormnYPph43ku47kubHosIPliLDlh4Y8L3RleHQ+CgogIDx0ZXh0IHg9IjI2MCIgeT0iMTAwIiBmb250LXNpemU9IjI0IiBmaWxsPSIjMWYyOTM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7orq3nu4PliY3vvIjpmo/mnLrvvIk8L3RleHQ+CiAgPGNpcmNsZSBjeD0iMTUwIiBjeT0iMTcwIiByPSIyMCIgZmlsbD0iIzZjNjNmZiIvPgogIDxjaXJjbGUgY3g9IjE1MCIgY3k9IjI2MCIgcj0iMjAiIGZpbGw9IiM2YzYzZmYiLz4KICA8Y2lyY2xlIGN4PSIxNTAiIGN5PSIzNTAiIHI9IjIwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGxpbmUgeDE9IjE3MCIgeTE9IjE3MCIgeDI9IjM1MCIgeTI9IjI2MCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iMTcwIiB5MT0iMjYwIiB4Mj0iMzUwIiB5Mj0iMjYwIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMTEiLz4KICA8bGluZSB4MT0iMTcwIiB5MT0iMzUwIiB4Mj0iMzUwIiB5Mj0iMjYwIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iNiIvPgogIDxjaXJjbGUgY3g9IjM3MCIgY3k9IjI2MCIgcj0iMjQiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSIyNjAiIHk9IjQxMCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+57q/57KX57uG5Lmx77yM5YWz6ZSu57q/57Si5rKh6KKr6K6k5Ye6PC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjI1MCIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IiM2YzYzZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWPjeWkjeiuree7gzwvdGV4dD4KICA8bGluZSB4MT0iNDMwIiB5MT0iMjYwIiB4Mj0iNzU4IiB5Mj0iMjYwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNSIvPgogIDxwb2x5Z29uIHBvaW50cz0iNzc1LDI2MCA3NTgsMjUxIDc1OCwyNjkiIGZpbGw9IiM2YzYzZmYiLz4KCiAgPHRleHQgeD0iOTQwIiB5PSIxMDAiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPuiuree7g+WQjjwvdGV4dD4KICA8Y2lyY2xlIGN4PSI4MzAiIGN5PSIxNzAiIHI9IjIwIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGNpcmNsZSBjeD0iODMwIiBjeT0iMjYwIiByPSIyMCIgZmlsbD0iIzZjNjNmZiIvPgogIDxjaXJjbGUgY3g9IjgzMCIgY3k9IjM1MCIgcj0iMjAiIGZpbGw9IiM2YzYzZmYiLz4KICA8bGluZSB4MT0iODUwIiB5MT0iMTcwIiB4Mj0iMTAzMCIgeTI9IjI2MCIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjEzIi8+CiAgPGxpbmUgeDE9Ijg1MCIgeTE9IjI2MCIgeDI9IjEwMzAiIHkyPSIyNjAiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI3Ii8+CiAgPGxpbmUgeDE9Ijg1MCIgeTE9IjM1MCIgeDI9IjEwMzAiIHkyPSIyNjAiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGNpcmNsZSBjeD0iMTA1MCIgY3k9IjI2MCIgcj0iMjQiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI5NDAiIHk9IjQxMCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5YWz6ZSu57q/57Si5p2D6YeN5Y+Y5aSn77yM5qyh6KaB57q/57Si5Y+Y5bCPPC90ZXh0Pgo8L3N2Zz4K" alt="训练前后权重变化对比" />

*图 2：训练让连线的粗细从「乱」变成「关键线索粗、次要线索细」——这就是权重被调准*

## 不是什么

划两条边界，免得误会：

- 权重不是「要不要连接」——网络结构先定了哪些线相连，权重决定的是每根线**连得多紧**。
- 权重不是越大越好——它要调到「合适」。有时一个本该小的权重被调大，反而会让网络判错。

## 小结

权重是神经网络给每条输入线索分配的「重要程度」，靠加权求和得出总分来做判断。训练的全部意义，就是把几十亿个权重从随机调成刚好能让网络答对——所以两个 AI 模型的差别，本质上不在结构多花哨，而在那一堆调好的权重数值不同。回到开头那封垃圾邮件：网络能一眼挑出它，靠的就是练出来的权重把「中奖」这条线索顶得很高。所谓「AI 学到的知识」，说到底就是一堆调好的权重。

## 完整代码

下面用一个极小的例子，让读者亲眼看到「训练 = 把随机权重调成会判断的权重」。整体流程是这样的：先造一个网络大脑（里面权重是随机的），再备好 4 条带正确答案的邮件样本，然后反复练习（每一轮都「读一遍 → 算误差 → 反向求梯度 → 更新权重」），最后考试看它学到了什么。把这段代码复制到本地跑一下，你会看到网络把 4 条邮件全判对，而且学到的权重里「含『中奖』」那条明显比「感叹号」大得多。

```python
import torch                                  # torch 是 PyTorch 深度学习库：提供"张量"（多维数组）这种数据容器，还能自动算梯度
import torch.nn as nn                         # nn 是神经网络模块，Linear 等现成"零件"都在里面

# ===== 任务：教网络学会「垃圾邮件判断」=====
# 两条线索：x1=是否含「中奖」(0 或 1)，x2=感叹号是否多(0 或 1)
# 正确规则：含「中奖」分量重、感叹号分量轻——这两条线索的权重就是网络要学回来的
X = torch.tensor([[1., 1.],                   # torch.tensor 把普通列表变成张量；带小数点的 1. 表示浮点数（网络只认小数）
                  [1., 0.],
                  [0., 1.],
                  [0., 0.]])                  # 4 条样本：含中奖+感叹号 / 含中奖 / 感叹号 / 都没有
y = torch.tensor([[1.], [1.], [0.], [0.]])    # 正确答案：1=垃圾邮件，0=正常邮件

# ===== 定义网络（一个神经元，对应文章公式 z = w1·x1 + w2·x2 + b）=====
class SpamNet(nn.Module):                     # nn.Module 是所有网络的"模板"，括号里写它表示"照这个模板造"
    def __init__(self):
        super().__init__()                    # 固定写法：让 PyTorch 先把模板该初始化的都初始化好，照抄即可
        self.layer = nn.Linear(2, 1)          # 一个神经元：2=收进 2 条线索(x1,x2)，1=输出 1 个总分 z
                                              # 里面的权重 w1、w2 和偏置 b 一开始是随机瞎设的
    def forward(self, x):                     # forward 定义"前向传播"：线索怎么一步步变成输出
        return self.layer(x)                  # 加权求和（文章公式 z = Σ w_i·x_i + b），直接由 Linear 算出

# ===== 训练：反复看这 4 条样本，把权重调准 =====
torch.manual_seed(42)                         # 固定随机种子：初始权重是随机的，设种子后每次跑结果一样（可复现）
net = SpamNet()                               # 造出网络大脑
opt = torch.optim.SGD(net.parameters(), lr=0.1)  # 优化器=按梯度调权重的工具；lr=学习率=每次调多大步子
loss_fn = nn.BCEWithLogitsLoss()              # 损失函数=量"预测离正确答案多远"的尺子（专为 0/1 二分类设计）

for epoch in range(2000):                     # 一轮(epoch)=把 4 条样本完整看一遍；重复 2000 轮让网络反复练
    z = net(X)                                # 前向：算每条邮件的总分 z
    loss = loss_fn(z, y)                      # 算误差：预测的总分 vs 正确答案差多远
    opt.zero_grad()                           # 清空旧梯度（避免上一轮的残留累积进来）
    loss.backward()                           # 反向传播：自动算出每个权重(w1、w2、b)该往大调还是小调
    opt.step()                                # 用梯度更新权重——backward 算方向、step 迈步子，合起来就是"训练"

# ===== 考试：看看网络学到了什么、判断得对不对 =====
with torch.no_grad():                         # 这段只是检验、不再调权重，所以关掉梯度计算省内存
    z = net(X)                                # 算每条邮件的总分
    prob = torch.sigmoid(z)                   # sigmoid 把总分 z 压成 0~1 的概率（0.5 正好对应 z=0，所以 prob>0.5 和正文里的 z>0 是同一回事）
    pred = (prob > 0.5).float()               # 概率 >0.5 判 1(垃圾邮件)，否则 0；.float() 把真假转成数字

for i in range(4):                            # 逐条打印检验结果（range(4) 依次取 0、1、2、3）
    label = '垃圾邮件' if pred[i, 0] == 1 else '正常邮件'  # pred[i, 0] = 第 i 条样本的第 0 个输出
    print(f"线索{X[i].tolist()} → 网络判断：{label}")

w = net.layer.weight[0]                       # 取出学到的两条线索的权重 [w1, w2]
b = net.layer.bias                            # 取出学到的偏置 b
print(f"学到的权重：含「中奖」w1={w[0]:.3f}，感叹号 w2={w[1]:.3f}")  # :.3f = 保留 3 位小数
print(f"学到的偏置：b={b.item():.3f}")        # .item() 把张量取出成普通小数
print(f"训练 loss：{loss.item():.4f}")        # loss 越小说明预测越接近正确答案
```

跑完你会看到：网络把 4 条邮件都判对了，而且学到的 $w_1$ 远大于 $w_2$——这正是「含『中奖』分量重、感叹号分量轻」。它不一定会恰好等于 3.0 和 0.2（能让分类正确的权重组合不止一组），但一定把「哪条线索该听多少」这个方向学对了。这就是训练在做的事：把随机的权重，调成一组会判断的权重。

## 参考资料

1. But what is a Neural Network? - 3Blue1Brown
   https://www.3blue1brown.com/lessons/neural-networks
2. 多层感知机 - 动手学深度学习
   https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html
3. 权重和偏置：网络的参数 - ApXML Machine Learning
   https://apxml.com/zh/courses/introduction-to-neural-networks/chapter-1-neural-network-foundations/weights-and-biases
