---
title: Softmax 是什么
date: 2026-08-12 12:17
tags: [AI]
excerpt: 神经网络输出层吐出的原始得分有正有负、大小没上限，看不懂也用不了。Softmax 把这组得分变成一组加起来等于 1 的概率——让模型的输出从「一堆数」变成「我有多确信每个候选」，是多分类输出层的标配。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC41NSIgc3RvcC1jb2xvcj0iIzdjNzBmMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNhNzhiZmEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJhcjEiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZDRjY2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzhiODBmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmFyMiIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmZmQ2YTgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmY5ZDVjIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJiYXIzIiB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I5ZjVkOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM1Y2UwYTAiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgoKICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJ1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDgiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPlNvZnRtYXg8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJ1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNlOGU0ZmYiPuaKiuS7u+aEj+W+l+WIhuWPmOaIkOamgueOh+WIhuW4gzwvdGV4dD4KCiAgPCEtLSBTdGFnZSAxOiBsb2dpdHMgYmFycyAtLT4KICA8ZyBmb250LWZhbWlseT0idWktc2Fucy1zZXJpZiwgc3lzdGVtLXVpLCAtYXBwbGUtc3lzdGVtLCBzYW5zLXNlcmlmIj4KICAgIDx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmZmZmIj7ljp/lp4vlvpfliIYgbG9naXRzPC90ZXh0PgogICAgPGxpbmUgeDE9IjExMCIgeTE9IjQzMCIgeDI9IjMxMCIgeTI9IjQzMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC41NSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8cmVjdCB4PSIxNDAiIHk9IjMzMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNiYXIxKSIgcng9IjQiLz4KICAgIDxyZWN0IHg9IjE5NiIgeT0iNDMwIiB3aWR0aD0iMzYiIGhlaWdodD0iNTAiIGZpbGw9InVybCgjYmFyMikiIHJ4PSI0Ii8+CiAgICA8cmVjdCB4PSIyNTIiIHk9IjQwNSIgd2lkdGg9IjM2IiBoZWlnaHQ9IjI1IiBmaWxsPSJ1cmwoI2JhcjMpIiByeD0iNCIvPgogICAgPHRleHQgeD0iMTU4IiB5PSIzMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNmZmZmZmYiPjIuMDwvdGV4dD4KICAgIDx0ZXh0IHg9IjIxNCIgeT0iNDk1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjZmZmZmZmIj4tMS4wPC90ZXh0PgogICAgPHRleHQgeD0iMjcwIiB5PSIzOTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNmZmZmZmYiPjAuNTwvdGV4dD4KICA8L2c+CgogIDwhLS0gQXJyb3cgMSAtLT4KICA8Zz4KICAgIDx0ZXh0IHg9IjM5MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj5lXng8L3RleHQ+CiAgICA8bGluZSB4MT0iMzM1IiB5MT0iMzMwIiB4Mj0iNDUwIiB5Mj0iMzMwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI0NTAsMzMwIDQ0MCwzMjQgNDQwLDMzNiIgZmlsbD0iI2ZmZmZmZiIvPgogICAgPHRleHQgeD0iMzkwIiB5PSIzNTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNlOGU0ZmYiPuaMh+aVsOaUvuWkpzwvdGV4dD4KICA8L2c+CgogIDwhLS0gU3RhZ2UgMjogZXhwb25lbnRpYXRlZCBiYXJzIC0tPgogIDxnIGZvbnQtZmFtaWx5PSJ1aS1zYW5zLXNlcmlmLCBzeXN0ZW0tdWksIC1hcHBsZS1zeXN0ZW0sIHNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iNTgwIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNmZmZmZmYiPuWPluaMh+aVsO+8iOWFqOato++8iTwvdGV4dD4KICAgIDxsaW5lIHgxPSI0OTAiIHkxPSI0MzAiIHgyPSI2OTAiIHkyPSI0MzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNTUiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHJlY3QgeD0iNTIyIiB5PSIyMzAiIHdpZHRoPSIzNiIgaGVpZ2h0PSIyMDAiIGZpbGw9InVybCgjYmFyMSkiIHJ4PSI0Ii8+CiAgICA8cmVjdCB4PSI1NzgiIHk9IjQyMCIgd2lkdGg9IjM2IiBoZWlnaHQ9IjEwIiBmaWxsPSJ1cmwoI2JhcjIpIiByeD0iNCIvPgogICAgPHJlY3QgeD0iNjM0IiB5PSIzODIiIHdpZHRoPSIzNiIgaGVpZ2h0PSI0OCIgZmlsbD0idXJsKCNiYXIzKSIgcng9IjQiLz4KICAgIDx0ZXh0IHg9IjU0MCIgeT0iMjIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjZmZmZmZmIj43LjM5PC90ZXh0PgogICAgPHRleHQgeD0iNTk2IiB5PSI0MTQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNmZmZmZmYiPjAuMzc8L3RleHQ+CiAgICA8dGV4dCB4PSI2NTIiIHk9IjM3NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iI2ZmZmZmZiI+MS42NTwvdGV4dD4KICA8L2c+CgogIDwhLS0gQXJyb3cgMiAtLT4KICA8Zz4KICAgIDx0ZXh0IHg9Ijc3MCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjZmZmZmZmIj7DtyYjOTMxOzwvdGV4dD4KICAgIDxsaW5lIHgxPSI3MTUiIHkxPSIzMzAiIHgyPSI4MzAiIHkyPSIzMzAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgICA8cG9seWdvbiBwb2ludHM9IjgzMCwzMzAgODIwLDMyNCA4MjAsMzM2IiBmaWxsPSIjZmZmZmZmIi8+CiAgICA8dGV4dCB4PSI3NzAiIHk9IjM1NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iI2U4ZTRmZiI+5b2S5LiA5YyWPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBTdGFnZSAzOiBwaWUgY2hhcnQgLS0+CiAgPGcgZm9udC1mYW1pbHk9InVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiI+CiAgICA8dGV4dCB4PSI5ODAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZmZmZiI+5qaC546H5YiG5biD77yI5ZKMPTHvvIk8L3RleHQ+CiAgICA8cGF0aCBkPSJNIDk4MCAzNDAgTCA5ODAuMDAgMjU1LjAwIEEgODUgODUgMCAxIDEgODk3LjA1IDMyMS40NiBaIiBmaWxsPSJ1cmwoI2JhcjEpIi8+CiAgICA8cGF0aCBkPSJNIDk4MCAzNDAgTCA4OTcuMDUgMzIxLjQ2IEEgODUgODUgMCAwIDEgOTA0LjAyIDMwMS44OSBaIiBmaWxsPSJ1cmwoI2JhcjIpIi8+CiAgICA8cGF0aCBkPSJNIDk4MCAzNDAgTCA5MDQuMDIgMzAxLjg5IEEgODUgODUgMCAwIDEgOTc5LjQ3IDI1NS4wMCBaIiBmaWxsPSJ1cmwoI2JhcjMpIi8+CiAgICA8dGV4dCB4PSI5ODUiIHk9IjM0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFhMTczMyI+NzguNSU8L3RleHQ+CiAgICA8dGV4dCB4PSIxMDc1IiB5PSI0NzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNmZmZmZmYiPjE3LjUlPC90ZXh0PgogICAgPHRleHQgeD0iOTA1IiB5PSIyNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiNmZmZmZmYiPjMuOSU8L3RleHQ+CiAgPC9nPgoKICA8dGV4dCB4PSI2MDAiIHk9IjU5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2U4ZTRmZiIgb3BhY2l0eT0iMC44NSI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4=" alt="Softmax封面" />

你用输入法打字时，敲下拼音 `hello`，候选栏会弹出几个词：「hello」「哈罗」「喝了」。输入法不是随便排的——它给每个候选算了一个「可能性」，可能性高的排前面。

但模型最初算出来的不是「可能性」，而是一堆**原始得分**：hello 得 2.0 分，哈罗得 1.0 分，喝了得 0.1 分。这些分数有正有负、大小没上限，看着就头疼——「2.0 分」到底意味着多确信？

Softmax 要解决的就是这件事：**把一组任意大小的原始得分，变成一组加起来等于 1 的概率**，让你一眼看出模型倾向哪个答案。

## 为什么需要它：原始得分的三个毛病

神经网络输出层吐出来的一组数（叫 **logits**，原始得分）有三个毛病，直接拿给用户没法用：

- **没上下界**：可能是 -100，也可能是 1000，你不知道「2.0」算高还是低
- **互相不可比**：第一个数 2.0、第二个 1.0，差不代表第一个的可能性是第二个的两倍
- **加起来没意义**：2.0 + 1.0 + 0.1 = 3.1，这个 3.1 啥也说明不了

我们需要的是一组**像概率一样**的数：每个都在 0 到 1 之间，且全部加起来正好等于 1（「100% 的可能性分给这几个候选」）。这就是 softmax 干的事。

## 公式直觉

给定一组原始得分 $z_1, z_2, \ldots, z_K$（共 $K$ 个，对应 $K$ 个候选类别），第 $i$ 个类别经过 softmax 后的概率是：

$$
\text{softmax}(z_i) = \frac{e^{z_i}}{\sum_{j=1}^{K} e^{z_j}}
$$

逐项看这个式子在做什么：

- $z_i$：第 $i$ 个类别的原始得分（logit），由网络上一层算出来
- $e^{z_i}$：把 $z_i$ 套进指数函数 $e^x$。指数函数有个好性质——任何实数进去都出来正数，这就把「有正有负」的得分全变成了正数
- $\sum_{j=1}^{K} e^{z_j}$：所有 $K$ 个指数化后的得分加起来，当作分母
- 整个分式：每个指数得分除以总和，得到一个占比

整个过程像把 $K$ 个候选的得分「按比例分蛋糕」——先把每个得分都过一遍指数函数（变正、且放大差距），再用总和去归一化，每个候选分到一块，所有块加起来正好一整块。

至于为什么非用指数 $e^x$ 不可，是因为它有两个好处：① 把负数也变成正数（保证概率非负）；② 它增长很快，会放大差距——原本 2.0 和 1.0 只差一倍，指数化后变成 7.39 和 2.72，差快三倍，模型更确信的那个会被进一步突出。

### 计算示例：三个数字走一遍

就用开头输入法那三个候选的得分 $z = [2.0,\ 1.0,\ 0.1]$（hello / 哈罗 / 喝了）实地算一遍：

1. **指数化**（分子）：
   - $e^{2.0} \approx 7.389$
   - $e^{1.0} \approx 2.718$
   - $e^{0.1} \approx 1.105$
2. **求和**（分母）：$7.389 + 2.718 + 1.105 = 11.212$
3. **归一化**（每个除以分母）：
   - $p_1 = 7.389 / 11.212 \approx 0.659$
   - $p_2 = 2.718 / 11.212 \approx 0.242$
   - $p_3 = 1.105 / 11.212 \approx 0.099$

**自检**：三个概率 $0.659 + 0.242 + 0.099 = 1.000$，和为 1，全在 0–1 之间；且原本得分最高的 2.0 对应最大的概率 0.659，顺序没乱。

回头看：模型对第一个候选有约 **66%** 的把握，第二个约 24%，第三个约 10%——这下人能看懂了。

## 和 argmax、sigmoid 是什么关系

这三个函数经常被搞混，其实各管一摊：

| 函数 | 输出 | 用在哪 | 可导吗 |
|------|------|--------|--------|
| **softmax** | 一组概率（和为 1） | 多分类**输出层**（训练时） | 是 |
| **argmax** | 一个序号（最大值的位置） | **推理时**挑最终答案 | 否 |
| **sigmoid** | 一组概率（每个独立，和不要求为 1） | 二分类 / **多标签**分类 | 是 |

先解释一下表里的「可导」，它决定了谁能用来训练。训练模型靠的是「微调一点点参数，看误差怎么变」，这要求函数平滑、能算变化率（也就是「可导」）；softmax 是一条平滑的曲线，满足要求，所以能参与训练。而 argmax 是「只挑最大的、其余一刀切归零」的硬操作，拐角太陡、没法算变化率，所以只在推理时用、不参与训练。

三者的关系：

- **softmax + argmax 是流水线**：训练时用 softmax 得到概率，推理（预测）时再在概率上套 argmax，挑出概率最大的那个类别作为最终答案（argmax 直接吃原始得分也行，但概率更直观）。
- **softmax 是 sigmoid 的「多分类升级版」**：当只有 2 个类别时，softmax 和 sigmoid 数学上等价；类别一多，sigmoid 会「各算各的」（每个类别独立给一个 0–1 的概率，互相不约束，加起来可能 >1），softmax 则强制它们分一块蛋糕（和为 1）。所以：

  - 互斥的多分类（一张图只能是猫**或**狗**或**鸟）→ softmax
  - 多标签分类（一张图可以同时有猫**和**狗）→ sigmoid，每个标签独立判断

## 典型应用：多分类输出层的「最后一棒」

softmax 最经典的舞台是**多分类模型的输出层**。以手写数字识别（0–9 共 10 类）为例：

1. 网络前面几十层把图片特征提取成一串向量
2. 最后一层是全连接层，输出 10 个原始得分（logits），对应 0–9
3. **softmax 把这 10 个得分转成 10 个概率**，每个代表「这张图是该数字的可能性」
4. 训练时，这组概率再喂给一种叫**交叉熵**（cross-entropy）的函数算误差、更新模型（交叉熵是另一个概念，专门配合 softmax 用，本文不展开，你只要知道它负责「拿概率和真实标签比，算出误差」即可）
5. 预测时，argmax 从 10 个概率里挑最大的，作为识别结果

正因为 softmax 和交叉熵总是一起用，PyTorch 干脆把两步合成了一个函数 `nn.CrossEntropyLoss`——用的时候模型最后一层**不需要**再加 softmax（这是个常见坑，下面代码里会点明）。

## 完整代码

这段代码分三步走：①建一个吐 logits 的小网络 → ②训练一步（用 `CrossEntropyLoss` 算误差，它内部已含 softmax）→ ③推理时手动套一次 softmax 看概率、用 argmax 出预测。带着这个结构读下面的逐行注释：

```python
import torch
import torch.nn as nn

# 一个最小的多分类网络（3 个类别）
class Classifier(nn.Module):
    def __init__(self, in_dim, num_classes):
        super().__init__()
        # 全连接层：输出 num_classes 个 logits（原始得分）
        self.fc = nn.Linear(in_dim, num_classes)

    def forward(self, x):
        # 关键坑：这里【故意不加 softmax】！
        # 因为 nn.CrossEntropyLoss 内部已经先做 softmax 再算交叉熵，
        # 如果这里再加一次 softmax，等于做了两次，模型会学坏。
        return self.fc(x)

torch.manual_seed(42)  # 固定随机种子，让每次跑结果一样（可复现）

model = Classifier(in_dim=4, num_classes=3)
criterion = nn.CrossEntropyLoss()           # 内部自带 softmax + 交叉熵
optimizer = torch.optim.SGD(model.parameters(), lr=0.1)

# 假数据：2 个样本，每个 4 维特征
x = torch.randn(2, 4)
# 假标签：样本 0 属于类别 1，样本 1 属于类别 0（类别编号从 0 起）
y = torch.tensor([1, 0])

# —— 第②步：训练一步 ——
logits = model(x)                # 前向：得到原始得分（这步故意不加 softmax）
loss = criterion(logits, y)      # 关键：criterion 内部先 softmax 再算交叉熵，所以上面不能重复加
loss.backward(); optimizer.step()  # 反向传播更新参数（标准训练循环，省略 zero_grad 等样板）
print(f"训练损失: {loss.item():.4f}")

# —— 推理时想看"概率"，手动套一次 softmax ——
with torch.no_grad():
    probs = torch.softmax(model(x), dim=1)   # dim=1 表示按行归一化（每行和为 1）
    print(f"每个样本属于各类的概率:\n{probs}")
    print(f"每行求和（应≈1）: {probs.sum(dim=1)}")
    preds = probs.argmax(dim=1)              # argmax 挑概率最大的类别作为预测
    print(f"预测类别: {preds.tolist()}")
```

运行后你会看到：`probs` 每行的三个数加起来约等于 1，`preds` 给出每个样本的预测类别编号——这就是 softmax + argmax 的完整工作流。

## 小结

一句话：**softmax 把一组原始得分变成一组加起来为 1 的概率**，让模型的输出从「一堆看不懂的数」变成「我有多确信每个候选」——它是多分类任务输出层的标配，和交叉熵是黄金搭档。下次你用输入法，看到候选栏把「hello」稳稳排在最前，背后多半就有 softmax 在把一堆原始得分，悄悄变成那组你看到的概率排序。

## 参考资料

1. Softmax Regression — Dive into Deep Learning（李沐等，经典教材）
   https://d2l.ai/chapter_linear-classification/softmax-regression.html
2. Softmax Activation Function: Everything You Need to Know — Pinecone（含 softmax/sigmoid/argmax 对比）
   https://www.pinecone.io/learn/softmax-activation/
3. Softmax Function Definition — DeepAI Machine Learning Glossary
   https://deepai.org/machine-learning-glossary-and-terms/softmax-layer
