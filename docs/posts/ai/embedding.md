---
title: 词向量是什么
date: 2026-08-12 14:08
tags: [AI]
excerpt: AI 看不懂字、只懂数。词向量（Embedding）把每个词变成几十到几百维的坐标，让语义相近的词在空间扎堆——「猫」与「狗」靠近、「猫」与「汽车」相隔很远，还能做 king − man + woman ≈ queen 这样的语义加减法。本文从 one-hot 的致命缺陷讲起，带零基础读者一次搞懂稠密向量、余弦相似度与 PyTorch 查表。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJiMmE2YiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNhODliZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjEwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNzQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiPuivjeWQkemHjyAvIEVtYmVkZGluZzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjE1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiNlOGU2ZmYiIG9wYWNpdHk9IjAuODUiPuaKiuaWh+Wtl+e/u+ivkeaIkCBBSSDog73nrpfnmoTmlbDlrZflnZDmoIc8L3RleHQ+CiAgPGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utb3BhY2l0eT0iMC4yMiIgc3Ryb2tlLXdpZHRoPSIxLjUiPgogICAgPGxpbmUgeDE9IjE5MCIgeTE9IjUyMCIgeDI9IjEwMTAiIHkyPSI1MjAiLz4KICAgIDxsaW5lIHgxPSIxOTAiIHkxPSI1MjAiIHgyPSIxOTAiIHkyPSIyMTAiLz4KICA8L2c+CiAgPHRleHQgeD0iMTAyMCIgeT0iNTI1IiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2U4ZTZmZiIgb3BhY2l0eT0iMC43Ij7nu7TluqYgMTwvdGV4dD4KICA8dGV4dCB4PSIxODAiIHk9IjIwNSIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNlOGU2ZmYiIG9wYWNpdHk9IjAuNyI+57u05bqmIDI8L3RleHQ+CiAgPGc+CiAgICA8Y2lyY2xlIGN4PSIzNDAiIGN5PSIzNDAiIHI9Ijc4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMTAiLz4KICAgIDxjaXJjbGUgY3g9IjMyMiIgY3k9IjMzMCIgcj0iOSIgZmlsbD0iI2ZmZDE2NiIvPgogICAgPHRleHQgeD0iMzIyIiB5PSIzMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiI+54yrPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iMzYyIiBjeT0iMzUyIiByPSI5IiBmaWxsPSIjZmZkMTY2Ii8+CiAgICA8dGV4dCB4PSIzNzgiIHk9IjM1NyIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmZmZmZmIj7ni5c8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSIzMzAiIGN5PSIzNzAiIHI9IjkiIGZpbGw9IiNmZmQxNjYiLz4KICAgIDx0ZXh0IHg9IjMxMCIgeT0iMzg4IiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiPueFlDwvdGV4dD4KICA8L2c+CiAgPGc+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIyOTAiIHI9Ijc4IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMTAiLz4KICAgIDxjaXJjbGUgY3g9IjU4MiIgY3k9IjI3OCIgcj0iOSIgZmlsbD0iIzA2ZDZhMCIvPgogICAgPHRleHQgeD0iNTYwIiB5PSIyNjQiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiI+6Iu55p6cPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iNjIyIiBjeT0iMjk4IiByPSI5IiBmaWxsPSIjMDZkNmEwIi8+CiAgICA8dGV4dCB4PSI2MzgiIHk9IjMwNCIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmZmZmZmIj7pppnolYk8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSI2MDAiIGN5PSIzMjUiIHI9IjkiIGZpbGw9IiMwNmQ2YTAiLz4KICAgIDx0ZXh0IHg9IjYwMCIgeT0iMzUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiPuapmOWtkDwvdGV4dD4KICA8L2c+CiAgPGc+CiAgICA8Y2lyY2xlIGN4PSI4NjAiIGN5PSIzNzUiIHI9IjgwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuMTAiLz4KICAgIDxjaXJjbGUgY3g9IjgzOCIgY3k9IjM2MCIgcj0iOSIgZmlsbD0iI2VmNDc2ZiIvPgogICAgPHRleHQgeD0iODE0IiB5PSIzNTAiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiI+5rG96L2mPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iODg2IiBjeT0iMzg0IiByPSI5IiBmaWxsPSIjZWY0NzZmIi8+CiAgICA8dGV4dCB4PSI5MDIiIHk9IjM5MCIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmaWxsPSIjZmZmZmZmIj7po57mnLo8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSI4NTUiIGN5PSI0MTAiIHI9IjkiIGZpbGw9IiNlZjQ3NmYiLz4KICAgIDx0ZXh0IHg9IjgzMyIgeT0iNDMwIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiPueBq+i9pjwvdGV4dD4KICA8L2c+CiAgPHRleHQgeD0iNjAwIiB5PSI1ODUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2U4ZTZmZiIgb3BhY2l0eT0iMC44IiBsZXR0ZXItc3BhY2luZz0iMyI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="词向量封面" />

词向量（Word Embedding）就是给每个词分配一串数字（比如 300 个连续小数），让这串数字成为该词在 AI 脑中的「坐标」。语义相近的词坐标也相近，于是「猫」和「狗」靠在一起，「猫」和「汽车」相隔很远。AI 看不懂字，但能对数字做加减和距离计算——词向量就是把「文字」翻译成「AI 能算的数」的那层关键翻译。

## 生活类比：每个词都有自己的 GPS 坐标

想象你在用输入法，刚打了「我想吃」，输入法立刻推荐「苹果、香蕉、米饭」。它怎么知道这几个词离「吃」近？因为每个词在它内部都有一组「GPS 坐标」，意义相近的词扎堆成簇。这张词义地图不是人手标的，而是模型自己从海量文本里「读」出来的——吃过几次「苹果」挨着「吃」，它就把这两个词的坐标悄悄拉近了一点。

## 为什么不用 one-hot？三个致命问题

最早让 AI 表示词的办法叫 one-hot（独热编码）：词表里有几万个词，就给每个词一个几万维的向量，只有自己那一维是 1，其余全是 0。

- **维度爆炸**：词表一大，向量就几万维，内存和算力都吃不消。
- **稀疏浪费**：每个向量只有一个 1，其余几万个 0，存了满屏废话。
- **彼此正交、无法度量相似度**：任意两个 one-hot 向量的点积都是 0，在数学上完全「垂直」。于是「猫」和「狗」的距离等于「猫」和「汽车」的距离，AI 看不出谁更近谁更远。

最后这一点最要命——没有相似度，模型就无法把「猫」学到的经验迁移到「狗」身上，每个词都得从头学。

## 稠密词向量：低维、连续、能算距离

词向量换了个思路：不用几万维，只用几十到几百维（常见 50 / 100 / 300）；每一维都是连续小数（不是非 0 即 1），由模型从语料里学出来。更关键的是，这些数字不是随便填的，而是被训练成「语义相近的词，向量空间距离也近」。

| 对比项 | one-hot | 稠密词向量 |
|--------|---------|------------|
| 维度 | 几万维（约等于词表大小） | 几十到几百维 |
| 取值 | 只有 0 和 1 | 连续实数 |
| 是否稀疏 | 极度稀疏（只有一个 1） | 稠密（每一维都有值） |
| 相似度计算 | 全部正交，相似度恒为 0 | 越相似越接近 1 |

## 距离怎么算：余弦相似度

判断两个词像不像，最常用的是余弦相似度——看两个向量的夹角：夹角越小越像，完全同向得 1，垂直得 0，反向得 -1。

$$\text{sim}(a, b) = \cos\theta = \frac{a \cdot b}{\lVert a\rVert\,\lVert b\rVert}$$

符号逐项解读：

- $a, b$ —— 两个词的词向量（比如「猫」和「狗」各一个 300 维向量）。
- $a \cdot b$ —— 点积，对应位置相乘再相加，衡量两个向量「同向程度」。
- $\lVert a\rVert, \lVert b\rVert$ —— 各自的长度（模），用来归一化，只比方向、不比长短。

通俗理解：把每个词当成一个箭头，两个箭头越指向同一方向就越相似；箭头长短不影响判断。

## 经典例子：king − man + woman ≈ queen

词向量最神奇的演示，是它能做「语义加减法」。把「国王」减去「男性」加上「女性」，得到的向量最接近的词，正是「女王」：

$$\vec{king} - \vec{man} + \vec{woman} \approx \vec{queen}$$

小算例（只用 2 维示意，真实是 300 维）：

- 假设 $\vec{king}=(0.9,\,0.8)$、$\vec{man}=(0.8,\,0.2)$、$\vec{woman}=(0.1,\,0.7)$。
- 代入：$(0.9-0.8+0.1,\;\,0.8-0.2+0.7) = (0.2,\,1.3)$。
- 对比 $\vec{queen}=(0.2,\,1.2)$，方向几乎一致——AI 就这样「算出」了「国王的女性对应词是女王」。

这说明词向量不只是把词随便摆进空间，它还把「性别」「时态」「复数」这类语义关系编码成了空间里的方向。

## 三大经典模型

把语料变成词向量，历史上主要有三套方法：

- **Word2Vec**（Mikolov, 2013）：用「猜上下文」（skip-gram）或「猜中心词」（CBOW）的方式训练，开创了神经网络词向量的范式。
- **GloVe**（Pennington 等, 2014）：基于「全局共现矩阵」——统计全语料里两两词一起出现的次数，再做矩阵分解，抓住了语料的整体统计规律。
- **fastText**（Facebook, 2016）：在 Word2Vec 基础上引入「子词」（subword，如把「苹果」拆成更小的片段），连没见过的生词也能拼出向量。

它们训练方式不同，但产物一样：一张「词 → 向量」的对照表。

## 「ID + 查表」本质就是 Embedding

跳出 NLP，再看「嵌入」这个更通用的概念。不管什么模型，只要做这件事——给每个对象分配一个 ID，再维护一张「ID → 稠密向量」的表，需要时按 ID 查出来——就是在做 Embedding。

在 PyTorch 里，这张表就是 `nn.Embedding`：

```python
import torch
import torch.nn as nn

# 一张表：词表大小 10000，每个词 300 维向量
embed = nn.Embedding(num_embeddings=10000, embedding_dim=300)
# 输入两个词的 ID（如「我」「爱」），查表得到它们的 300 维向量
vectors = embed(torch.tensor([5, 12]))
```

这张表初始是随机的，但会在训练中不断更新——最终学到的向量就承载了语义。

## 完整代码

```python
import torch
import torch.nn as nn

# === 1. 定义嵌入查表 ===
# 词表大小 5，每个词用 4 维向量表示（演示用，真实场景几百维）
vocab_size = 5
embed_dim = 4
embed_layer = nn.Embedding(num_embeddings=vocab_size, embedding_dim=embed_dim)

# === 2. 准备假数据：一句话「我 爱 编 程」已经分词成 ID ===
# ID 映射示意：0=我, 1=爱, 2=编, 3=程
sentence_ids = torch.tensor([0, 1, 2, 3])

# === 3. 前向：查表，得到每个词的 4 维向量 ===
word_vectors = embed_layer(sentence_ids)
print(word_vectors.shape)   # torch.Size([4, 4])：4 个词，每个 4 维
print(word_vectors)         # 看到每个词被替换成了一串连续实数

# === 4. 训练一步：让「我」和「爱」的向量更靠近 ===
# 简单起见，假装目标是让「我」的向量靠近「爱」的向量
target = word_vectors[1].detach()                       # 把「爱」的向量当目标
loss = ((word_vectors[0] - target) ** 2).mean()         # 「我」与「爱」的均方差
print("loss =", loss.item())

optimizer = torch.optim.SGD(embed_layer.parameters(), lr=0.1)
loss.backward()         # 反向传播，算出每个词向量的梯度
optimizer.step()        # 更新参数，向量在语义空间里挪了一小步
```

跑完这段，`embed_layer` 这张表就被「挪动」了一点——每一次更新，都在让相关词的向量更靠近它们该去的位置。

## 小结

词向量就是「把文字翻译成 AI 能算的数字坐标」：用几十到几百维的连续实数，取代了 one-hot 的几万维稀疏、无相似度。语义相近的词在向量空间里扎堆，还能做加减法（king − man + woman ≈ queen）；而「ID + 嵌入查表」这套机制，正是深度学习里所有 Embedding 的共同本质。

## 参考资料

1. Efficient Estimation of Word Representations in Vector Space - Mikolov et al., 2013
   https://arxiv.org/abs/1301.3781
2. GloVe: Global Vectors for Word Representation - Pennington, Socher & Manning, 2014
   https://nlp.stanford.edu/projects/glove/
3. Word Embedding (word2vec) - 《动手学深度学习》
   https://d2l.ai/chapter_natural-language-processing-pretraining/word2vec.html
