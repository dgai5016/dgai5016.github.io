---
title: 多头注意力是什么
date: 2026-08-12 14:14
tags: [AI]
excerpt: 单头注意力只有一双眼睛，盯了语法就顾不上指代。多头注意力把一个大注意力拆成多个并行的小注意力，每个头在独立子空间里专注一类关系——语法、指代、相邻词，再把所有头的发现拼接融合，让模型同时捕捉丰富得多的语言关系。它是 Transformer 的核心组件，也是 GQA、MLA 等高效变体的起点。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3YjczZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CgogIDwhLS0g6KeG6KeJ6ZqQ5Za777ya5bem5L6n5aSa5Liq5aS05bm26KGM77yM5puy57q/5rGH6IGa5Yiw5Y+z5L6n5LiA5Liq6J6N5ZCI6IqC54K5IC0tPgogIDxnIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+CiAgICA8cGF0aCBkPSJNIDQwMCAxMjAgQyA1ODAgMTIwLCA3MjAgMjAwLCA4MjAgMjAwIi8+CiAgICA8cGF0aCBkPSJNIDQwMCAxODAgQyA1ODAgMTgwLCA3MjAgMjAwLCA4MjAgMjAwIi8+CiAgICA8cGF0aCBkPSJNIDQwMCAyNDAgQyA1ODAgMjQwLCA3MjAgMjAwLCA4MjAgMjAwIi8+CiAgICA8cGF0aCBkPSJNIDQwMCAzMDAgQyA1ODAgMzAwLCA3MjAgMjAwLCA4MjAgMjAwIi8+CiAgPC9nPgoKICA8Zz4KICAgIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjEyMCIgcj0iMjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPGNpcmNsZSBjeD0iNDAwIiBjeT0iMTgwIiByPSIyMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45Ii8+CiAgICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIyNDAiIHI9IjIwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjkiLz4KICAgIDxjaXJjbGUgY3g9IjQwMCIgY3k9IjMwMCIgcj0iMjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPgogIDwvZz4KICA8ZyBmaWxsPSIjNmM2M2ZmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIHNhbnMtc2VyaWYiPgogICAgPHRleHQgeD0iNDAwIiB5PSIxMjYiPjE8L3RleHQ+CiAgICA8dGV4dCB4PSI0MDAiIHk9IjE4NiI+MjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQwMCIgeT0iMjQ2Ij4zPC90ZXh0PgogICAgPHRleHQgeD0iNDAwIiB5PSIzMDYiPjQ8L3RleHQ+CiAgPC9nPgoKICA8Y2lyY2xlIGN4PSI4MjAiIGN5PSIyMDAiIHI9IjM0IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjk1Ii8+CiAgPHRleHQgeD0iODIwIiB5PSIyMDgiIGZpbGw9IiM2YzYzZmYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBTZWdvZSBVSSwgc2Fucy1zZXJpZiI+zqM8L3RleHQ+CgogIDx0ZXh0IHg9IjQwMCIgeT0iMzcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjc1IiBmb250LXNpemU9IjIyIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIHNhbnMtc2VyaWYiPuWkmuS4quWktOW5tuihjDwvdGV4dD4KICA8dGV4dCB4PSI4MjAiIHk9IjI4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC43NSIgZm9udC1zaXplPSIyMiIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFNlZ29lIFVJLCBzYW5zLXNlcmlmIj7ono3lkIg8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNDcwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjgyIiBmb250LXdlaWdodD0iNzAwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIHNhbnMtc2VyaWYiPuWkmuWktOazqOaEj+WKmzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjUyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44IiBmb250LXNpemU9IjMwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIHNhbnMtc2VyaWYiPk11bHRpLUhlYWQgQXR0ZW50aW9uPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjU5OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC42IiBmb250LXNpemU9IjIwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgU2Vnb2UgVUksIHNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="多头注意力封面" />

你在读一句话：「小猫没穿过马路，因为它太累了。」看到「它」字时，你脑子里其实在同时处理好几件事：语法上，「它」该是主语；指代上，「它」指的是小猫而不是马路；语义上，「太累了」要和「它」搭得上。一个普通的注意力机制就像只有一双眼睛，盯了这个就顾不上那个。**多头注意力**（Multi-Head Attention, MHA）给了模型一整支分工小组——每双眼睛各盯一类关系，最后把大家的发现拼起来。

## 先回头看：单头注意力在做什么

在讲多头之前，先把单头注意力的核心动作说清楚。注意力机制本质上是「带权重的加权平均」：对一个词，模型拿它去和句子里的每个词算一个相关度分数，分数越高权重越大，然后把所有词的信息按权重混合，得到这个词的新表示。这个流程写成公式是：

$$\text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

三件套解读：

- $Q$（Query，查询）：当前这个词「我想找什么」的向量
- $K$（Key，键）：每个词「我能提供什么」的向量，用来和 $Q$ 配对打分
- $V$（Value，值）：每个词「我携带的实际信息」的向量，按权重加起来就是输出
- $QK^T$：查询和每个键做点积，得到相关度分数
- $\sqrt{d_k}$：缩放因子，防止分数过大导致 softmax 梯度消失（$d_k$ 是 $K$ 的维度）
- $\text{softmax}$：把分数归一成权重（加起来等于 1）
- 末尾乘 $V$：用权重把所有 value 加权求和，得到最终输出

通俗说：$Q$ 是问题，$K$ 是每个候选人的招牌，$Q$ 和 $K$ 一碰算匹配度，softmax 把匹配度变成权重百分比，最后按权重把每个人的 $V$（真本事）凑在一起，就是答案。

## 痛点：一个头根本看不过来

单头注意力只有一套 $Q/K/V$ 投影，相当于一个人同时要盯语法、指代、语义所有关系。问题在于，这些关系需要的视角是互相打架的。比如要判断「它」指代小猫，需要把「它」和「小猫」拉近；要分析语法结构，又要把「它」和动词「穿过」拉近。一个头在同一个空间里只能学出一种拉近方式，硬塞多种关系，最后会学成一个折中、什么都不精的平均值。

用一个生活例子：让一个面试官同时考查候选人的技术、沟通、文化匹配，他很容易顾此失彼；但如果你派出三个人，一个专问技术、一个专聊沟通、一个专看价值观，每个人在自己擅长的维度上深入判断，最后汇总，结论会丰富得多。多头注意力做的就是这件事。

## 多头注意力：一支分工小组

多头注意力的做法是：把原本一个大的注意力，拆成 $h$ 个并行的小注意力（每个叫一个头），每个头有自己独立的一套投影矩阵，在不同的子空间里各算各的，最后把所有头的输出拼起来，再过一层线性变换融合。核心公式如下：

$$\text{MultiHead}(Q, K, V) = \text{Concat}(\text{head}_1, \dots, \text{head}_h)\, W^O$$

其中每个头：

$$\text{head}_i = \text{Attention}(Q W_i^Q,\ K W_i^K,\ V W_i^V)$$

三件套解读：

- $h$：头的个数（Transformer 原文用 8）
- $W_i^Q, W_i^K, W_i^V$：第 $i$ 个头自己专属的投影矩阵——这是分工的关键，每个头用自己的矩阵把 $Q/K/V$ 投到一个独立的子空间，相当于戴上不同颜色的滤镜看同一句话
- $\text{head}_i$：第 $i$ 个头算出来的注意力输出，是在它那个子空间里看到的关系
- $\text{Concat}$：把所有头的输出沿特征维度拼起来
- $W^O$：输出投影矩阵，把拼接后的大向量再压回模型需要的维度，相当于小组汇总发言

关键点：每个头的 $W_i^Q, W_i^K, W_i^V$ 都是独立学习的参数，所以训练过程中它们会自然分化——有的头学会抓指代，有的头学会抓语法。模型没人告诉它们「你负责什么」，是数据本身把分工逼出来的。

## 子空间是什么？一个直觉

子空间这个词听着唬人，可以这样理解：一句话的向量表示就像一个多维空间里的点。投影矩阵 $W_i$ 相当于给这个点换了一个观察角度，同一个词在不同头里被投影到不同的视角坐标系，所以每个头看到的「谁和谁相关」是不一样的。8 个头就像 8 个不同角度的探照灯，照出的关系组合各不相同，最后拼起来就是一张更全面的关系网。

## 一个小算例：两个头怎么拼

为了把公式看实在，走一个极简流程。假设模型维度 $d_{\text{model}} = 4$，头数 $h = 2$，每个头维度 $d_k = d_v = 2$。某个词经过两个头后得到：

- $\text{head}_1 = [0.5,\ 0.3]$（比如抓到了指代关系）
- $\text{head}_2 = [0.1,\ 0.8]$（比如抓到了语法关系）

拼接：

$$\text{Concat}(\text{head}_1, \text{head}_2) = [0.5,\ 0.3,\ 0.1,\ 0.8]$$

这个 4 维向量再乘 $W^O$（一个 $4 \times 4$ 矩阵），就压回 4 维，作为该词最终的多头注意力输出。真实模型里这个流程对句子里的每个词同时跑一遍。

自检：拼接后维度 $h \cdot d_v = 2 \times 2 = 4 = d_{\text{model}}$，和输入维度对齐，$W^O$ 能把它变回 $d_{\text{model}}$，合理。

## 每个头到底学到了什么

研究表明，训练完的 Transformer 里，不同的头确实分化出了不同的关注模式，常见的几类：

- **指代消解头**：专门把代词连回它指代的名词（「它」→「小猫」）
- **语法依赖头**：关注主谓宾、修饰等句法关系（动词和它的主语）
- **相邻词头**：只看紧挨着的前后几个词，捕捉局部搭配
- **分隔符头**：关注句号、分段等结构标记

需要说明的是，并非每个头都这么干净，也有些头学到的模式很难用人话解释，甚至去掉也不太影响效果——这也是后来 GQA、MLA 这些变体想要精简的地方。

## 相比单头，多头强在哪

- **关系更丰富**：一个头只能学一种拉近方式，多个头在多个子空间里同时建模不同类型的关系，表达能力成倍提升
- **容错性更好**：一个头学坏了，其他头还能补上，不至于全线崩盘
- **可并行**：所有头互相独立，可以在 GPU 上一次性算完，效率高

代价是参数量和计算量随头数线性增长，所以头数不是越多越好（原文用 8 个头是经验上的平衡点）。

## 它是后续演进的起点

多头注意力是 2017 年 Transformer 的核心组件，但「每个头都要独立的 K/V」在大模型上变成了显存瓶颈。后来的改进都在怎么让多个头共享 K/V 上做文章：**分组查询注意力**（Grouped-Query Attention, GQA）让多个头共享一组 K/V，**多头潜在注意力**（Multi-head Latent Attention, MLA）则用低秩压缩把 K/V 压到潜在向量。但它们的多头并行思想，都源自 MHA 这套「分头各算、再融合」的范式。

## 完整代码

下面用一个最小可跑的 PyTorch 模块演示多头注意力的完整流程。代码里的每一步都对应上面的公式，注释中标出了对应关系。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        """
        d_model: 模型维度（如 512）
        num_heads: 头数（如 8）
        """
        super().__init__()
        assert d_model % num_heads == 0, "d_model 必须能被 num_heads 整除"
        self.num_heads = num_heads
        self.d_k = d_model // num_heads  # 每个头的维度

        # 四个投影矩阵：对应公式的 W^Q, W^K, W^V, W^O
        # 用 nn.Linear 一次算完所有头，再 reshape 拆开
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)

    def forward(self, x):
        # x 形状: (batch, seq_len, d_model) —— 一句话的向量序列
        batch, seq_len, d_model = x.shape

        # 1. 各算各的 Q/K/V（对应 Q*W_i^Q 等），再拆成 num_heads 个头
        #    transpose 把头维度提到前面，方便后续按头并行算
        Q = self.W_q(x).view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        K = self.W_k(x).view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        V = self.W_v(x).view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
        # 现在 Q/K/V 形状: (batch, num_heads, seq_len, d_k)

        # 2. 每个头独立算注意力分数: Q*K^T / sqrt(d_k)
        scores = Q @ K.transpose(-2, -1) / (self.d_k ** 0.5)
        # scores 形状: (batch, num_heads, seq_len, seq_len)

        # 3. softmax 把分数变成权重（每个头独立归一）
        weights = F.softmax(scores, dim=-1)

        # 4. 权重乘 V，得到每个头的输出
        out = weights @ V  # (batch, num_heads, seq_len, d_k)

        # 5. 把所有头的输出拼起来（Concat），对应公式里的 Concat(head_1, ..., head_h)
        out = out.transpose(1, 2).contiguous().view(batch, seq_len, d_model)

        # 6. 过输出矩阵 W^O 融合，得到最终结果
        return self.W_o(out)

# === 跑一遍看看 ===
torch.manual_seed(0)  # 固定随机种子，结果可复现
d_model, num_heads = 8, 2
mha = MultiHeadAttention(d_model, num_heads)

# 假数据：一句话 4 个词，每个词 8 维向量
x = torch.randn(1, 4, d_model)

# 前向 + 模拟一步训练
out = mha(x)
loss = out.sum()       # 假损失：让输出能反向传播
loss.backward()        # 反向传播，所有头的投影矩阵都会得到梯度并更新

print("输入形状:", x.shape)
print("输出形状:", out.shape)
print("输出:", out)
```

跑完你会看到输入输出形状都是 `(1, 4, 8)`——多头注意力不改变维度，只把每个词的向量重新混合成融合了多种关系的新表示。

## 小结

多头注意力把一个大的注意力拆成若干个并行的小注意力，每个头在独立的子空间里专注一种关系，再把所有头的发现拼接、融合。它解决了单头视角单一、学成折中平均值的痛点，让模型能同时捕捉语法、指代、语义等丰富关系，是 Transformer 的核心组件，也是后续 GQA、MLA 等高效变体的起点。

## 参考资料

1. Attention Is All You Need - Vaswani et al., 2017
   https://arxiv.org/abs/1706.03762
2. 多头注意力 - 《动手学深度学习》（李沐等）
   https://zh.d2l.ai/chapter_attention-mechanisms/multihead-attention.html
3. nn.MultiheadAttention - PyTorch 官方文档
   https://pytorch.org/docs/stable/generated/torch.nn.MultiheadAttention.html
