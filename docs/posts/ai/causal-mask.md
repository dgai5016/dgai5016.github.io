---
title: 因果掩码是什么
date: 2026-08-12 14:22
tags: [AI]
excerpt: GPT 生成第 t 个 token 时绝不能偷看未来，因果掩码就是那张"防作弊"的遮布。它用一个下三角矩阵把注意力分数的上三角压成负无穷，经 softmax 后未来位置权重归零，是自回归模型能并行训练又不作弊的前提。本文讲清原理、小例子、PyTorch 代码，并对比 BERT 为什么不需要它。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8ZyBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zNSkiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSI+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMTEwIiB4Mj0iNDYwIiB5Mj0iMzUwIi8+CiAgICA8bGluZSB4MT0iNTIwIiB5MT0iMTEwIiB4Mj0iNTIwIiB5Mj0iMzUwIi8+CiAgICA8bGluZSB4MT0iNTgwIiB5MT0iMTEwIiB4Mj0iNTgwIiB5Mj0iMzUwIi8+CiAgICA8bGluZSB4MT0iNjQwIiB5MT0iMTEwIiB4Mj0iNjQwIiB5Mj0iMzUwIi8+CiAgICA8bGluZSB4MT0iNzAwIiB5MT0iMTEwIiB4Mj0iNzAwIiB5Mj0iMzUwIi8+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMTEwIiB4Mj0iNzAwIiB5Mj0iMTEwIi8+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMTcwIiB4Mj0iNzAwIiB5Mj0iMTcwIi8+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMjMwIiB4Mj0iNzAwIiB5Mj0iMjMwIi8+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMjkwIiB4Mj0iNzAwIiB5Mj0iMjkwIi8+CiAgICA8bGluZSB4MT0iNDYwIiB5MT0iMzUwIiB4Mj0iNzAwIiB5Mj0iMzUwIi8+CiAgPC9nPgoKICA8cGF0aCBkPSJNIDQ2MCAxMTAgTCA1MjAgMTEwIEwgNTIwIDE3MCBMIDU4MCAxNzAgTCA1ODAgMjMwIEwgNjQwIDIzMCBMIDY0MCAyOTAgTCA3MDAgMjkwIEwgNzAwIDM1MCBMIDQ2MCAzNTAgWiIKICAgICAgICBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIi8+CgogIDxnIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjc1KSIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiPgogICAgPGxpbmUgeDE9IjUyOCIgeTE9IjExOCIgeDI9IjU3MiIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjU3MiIgeTE9IjExOCIgeDI9IjUyOCIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjU4OCIgeTE9IjExOCIgeDI9IjYzMiIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjYzMiIgeTE9IjExOCIgeDI9IjU4OCIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjY0OCIgeTE9IjExOCIgeDI9IjY5MiIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjY5MiIgeTE9IjExOCIgeDI9IjY0OCIgeTI9IjE2MiIvPgogICAgPGxpbmUgeDE9IjU4OCIgeTE9IjE3OCIgeDI9IjYzMiIgeTI9IjIyMiIvPgogICAgPGxpbmUgeDE9IjYzMiIgeTE9IjE3OCIgeDI9IjU4OCIgeTI9IjIyMiIvPgogICAgPGxpbmUgeDE9IjY0OCIgeTE9IjE3OCIgeDI9IjY5MiIgeTI9IjIyMiIvPgogICAgPGxpbmUgeDE9IjY5MiIgeTE9IjE3OCIgeDI9IjY0OCIgeTI9IjIyMiIvPgogICAgPGxpbmUgeDE9IjY0OCIgeTE9IjIzOCIgeDI9IjY5MiIgeTI9IjI4MiIvPgogICAgPGxpbmUgeDE9IjY5MiIgeTE9IjIzOCIgeDI9IjY0OCIgeTI9IjI4MiIvPgogIDwvZz4KCiAgPHRleHQgeD0iNTgwIiB5PSIzOTUiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44NSkiCiAgICAgICAgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuS6ruagvD3lj6/nnIvlvZPliY3lj4rkuYvliY3jgIDlj4nmoLw95pyq5p2l6KKr5bGP6JS9PC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjQ4NSIgZm9udC1zaXplPSI5MiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7lm6DmnpzmjqnnoIE8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTU1IiBmb250LXNpemU9IjM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCiAgICAgICAgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="因果掩码封面" />


想象一场听写考试：老师念一段话，学生一个字一个字写下来。写到第 5 个字时，学生只能依据老师已经念过的前 4 个字加上正在念的第 5 个字，绝不能翻到老师讲义后面偷看答案——否则就是作弊。

因果掩码（Causal Mask，又叫下三角掩码）就是 GPT 这类生成模型里的"防作弊装置"：它在注意力分数矩阵上盖一张下三角的遮布，让模型在生成第 t 个 token 时，只能看到当前及之前的 token，看不到未来的 token。

## 为什么生成任务必须"防偷看"

GPT 这类 Decoder（解码器）模型的工作方式是**自回归**（autoregressive）：每次根据已生成的内容，预测下一个 token。推理（实际使用）时，下一个 token 根本还不存在，模型自然看不到。

但训练时，为了让模型并行学习所有位置（一次前向传播就同时预测整句每个位置的下一个 token，效率高），我们会把整句话一次性喂进去。这时如果不加干预，注意力机制会让每个位置都能看到整句所有 token——包括它本该预测的那个"未来答案"。模型直接抄答案就行，学不到东西，训练和推理就脱节了。

因果掩码就是来堵这个漏洞的。

## 因果掩码怎么工作

注意力机制的核心是：每个 token 看一眼所有 token，算一个相关度分数，再用分数加权求和。这个分数矩阵长这样（3 个 token 为例）：

$$S = \frac{QK^{\top}}{\sqrt{d_k}}$$

- $Q$、$K$、$V$：每个 token 经过三种线性变换得到的"查询 / 键 / 值"——粗略说就是"我要找什么""我有什么""我提供什么"
- $QK^{\top}$：每对 token 的相关度（点积越大越相关），这就是上面那个分数矩阵
- $\sqrt{d_k}$：缩放因子，防止点积数值过大导致训练不稳

因果掩码做的事，是在分数矩阵 $S$ 上加一个掩码矩阵 $M$，把上三角（未来位置）变成 $-\infty$，下三角和对角线保持 0：

$$\text{Attention}(Q,K,V) = \text{softmax}\!\left(S + M\right) V,\qquad M_{ij} = \begin{cases} 0, & i \geq j \\ -\infty, & i < j \end{cases}$$

- $i$：当前 token 的位置（行）
- $j$：被看的 token 的位置（列）
- $i \geq j$：当前 token 在被看 token 的后面或同一位置——允许看，掩码为 0
- $i < j$：当前 token 在被看 token 的前面——这是未来，禁止看，掩码为 $-\infty$

## 为什么负无穷等于"看不见"

softmax 把分数归一成概率（每行加起来等于 1）：

$$\text{softmax}(x_i) = \frac{e^{x_i}}{\sum_j e^{x_j}}$$

- $x_i$：第 $i$ 个位置的分数
- $e^{x_i}$：指数化，把任意实数变成正数
- 分母 $\sum_j e^{x_j}$：所有位置指数值的和，用来归一化

关键在指数：$e^{-\infty} = 0$。被掩码成 $-\infty$ 的未来位置，在分子分母里都是 0，归一化后权重就是 0。0 权重意味着对加权求和没有任何贡献，等价于完全看不见。

## 小例子：3 个 token 走一遍

假设 3 个 token 的注意力分数矩阵（已经过缩放）是：

```
S = [[2, 1, 3],
     [1, 2, 4],
     [2, 0, 1]]
```

加上因果掩码 $M$（下三角含对角线为 0，上三角为 $-\infty$）：

```
S + M = [[2,    -inf, -inf],
         [1,    2,    -inf],
         [2,    0,    0   ]]
```

每行做 softmax：

- 第 1 行（第 1 个 token 只能看自己）：$[e^2, 0, 0] / e^2 = [1, 0, 0]$
- 第 2 行（第 2 个 token 看前两个）：$[e^1, e^2, 0] / (e^1 + e^2) \approx [0.269, 0.731, 0]$
- 第 3 行（第 3 个 token 看全部三个）：$[e^2, e^0, e^0] / (e^2 + 1 + 1) \approx [0.787, 0.107, 0.107]$

自检：每行和约等于 1、所有值非负、上三角（未来位置）全是 0——三样都对，掩码生效。

## 为什么 BERT 不需要它

BERT 用的是 Transformer 的**编码器**（Encoder），任务是**理解**：给一整句话，做分类、问答、命名实体识别这种"看完再判断"的活。它的注意力是**双向**的——每个 token 都能同时看左和看右，一次拿全部上下文。

BERT 的训练任务叫掩码语言模型（Masked Language Model，MLM）：随机挖空几个 token 让模型填，挖空的位置是随机选的，不是"未来"。既然没有"按顺序生成"这回事，也就没有"未来"可言，因果掩码自然派不上用场。

一句话区分：

- **GPT（Decoder + 因果掩码）**：一个字一个字往外蹦，写第 t 个字时只能看前面——为**生成**而生
- **BERT（Encoder + 双向注意力）**：一眼看全文，理解整段意思——为**理解**而生

## 完整代码

下面是一个带因果掩码的最小自注意力模块，复制即可跑：

```python
import torch
import torch.nn as nn

class CausalSelfAttention(nn.Module):
    def __init__(self, d_model):
        super().__init__()
        # 三个线性层，把输入分别转成 Q / K / V（注意力三件套）
        self.q_proj = nn.Linear(d_model, d_model)
        self.k_proj = nn.Linear(d_model, d_model)
        self.v_proj = nn.Linear(d_model, d_model)
        self.d_k = d_model

    def forward(self, x):
        # x 形状: [batch, 序列长度 n, 维度 d_model]
        n = x.size(1)
        Q = self.q_proj(x)
        K = self.k_proj(x)
        V = self.v_proj(x)
        # 注意力分数 S = QK^T / sqrt(d_k)，对应上文公式
        scores = Q @ K.transpose(-2, -1) / (self.d_k ** 0.5)

        # 因果掩码：torch.triu 取上三角（diagonal=1 表示跳过对角线）
        # 上三角 = 1 用来标记"未来位置"
        mask = torch.triu(torch.ones(n, n), diagonal=1)
        # masked_fill 把未来位置的分数改成 -inf，softmax 后权重变 0
        scores = scores.masked_fill(mask.bool(), float('-inf'))

        # softmax 把每行分数归一成概率（和为 1）
        attn = torch.softmax(scores, dim=-1)
        # 用注意力权重加权求和 V
        return attn @ V

torch.manual_seed(0)  # 固定随机种子，让每次跑结果一样（可复现）
# 假数据：batch=2，序列长度=4，维度=8（即 2 个句子、每句 4 个 token、每个 token 8 维向量）
x = torch.randn(2, 4, 8)
module = CausalSelfAttention(d_model=8)
out = module(x)
print(out.shape)  # torch.Size([2, 4, 8]) —— 因果掩码不改输出形状，只禁止看未来
```

核心就两行：`torch.triu` 造掩码、`masked_fill` 把未来位置改成 $-\infty$。真实训练时再接一个普通的全连接层和残差连接，就接近 GPT 的注意力块了。

## 小结

因果掩码是一张下三角的遮布：它把注意力分数矩阵的上三角（未来位置）压成 $-\infty$，让 softmax 把这些位置的权重变成 0，从而保证模型生成第 t 个 token 时，只能看到当前及之前的内容。它是 GPT 这类自回归生成模型能并行训练、又能逐字生成的前提——既高效，又不作弊。

## 参考资料

1. Attention Is All You Need（原始 Transformer 论文，提出掩码注意力） - Vaswani et al., 2017
   https://arxiv.org/abs/1706.03762
2. What is causal attention, and why can GPT-style models train on next-word prediction - Sebastian Raschka
   https://sebastianraschka.com/faq/docs/causal-attention.html
3. A Gentle Introduction to Attention Masking in Transformer Models - Machine Learning Mastery
   https://machinelearningmastery.com/a-gentle-introduction-to-attention-masking-in-transformer-models/
