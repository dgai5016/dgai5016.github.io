---
title: 前馈神经网络是什么
date: 2026-08-12 14:20
tags: [AI]
excerpt: Transformer 里若只有线性变换，再多层堆叠也等价于一层。FFN 在两次线性变换之间夹一个 ReLU，把非线性塞回去，并对每个 token 独立施加同一套变换。本文讲清它的公式、逐符号拆解、极简算例，并附可直接运行的 PyTorch 代码。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdTZWdvZSBVSScsIHNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJiZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzJmMmE4YSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ29sZCIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZkMTY2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2Y0YTI2MSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDkuInliJfmoIfpopggLS0+CiAgPGcgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuOSI+CiAgICA8dGV4dCB4PSIyMDAiIHk9IjE4MCI+6L6T5YWlIHg8L3RleHQ+CiAgICA8dGV4dCB4PSI2MDAiIHk9IjE4MCI+5Y2H57u0ICsgUmVMVTwvdGV4dD4KICAgIDx0ZXh0IHg9IjEwMDAiIHk9IjE4MCI+6L6T5Ye6IHk8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOi/nuaOpee6v++8iGlucHV0IC0+IGhpZGRlbu+8iSAtLT4KICA8ZyBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjEuMyIgb3BhY2l0eT0iMC4zMiI+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMjcwIiB4Mj0iNTc4IiB5Mj0iMjMwIi8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMjcwIiB4Mj0iNTc4IiB5Mj0iMjg1Ii8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMjcwIiB4Mj0iNTc4IiB5Mj0iMzQwIi8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMjcwIiB4Mj0iNTc4IiB5Mj0iMzk1Ii8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMzMwIiB4Mj0iNTc4IiB5Mj0iMjMwIi8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMzMwIiB4Mj0iNTc4IiB5Mj0iMjg1Ii8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMzMwIiB4Mj0iNTc4IiB5Mj0iMzQwIi8+CiAgICA8bGluZSB4MT0iMjIyIiB5MT0iMzMwIiB4Mj0iNTc4IiB5Mj0iMzk1Ii8+CiAgICA8IS0tIGhpZGRlbiAtPiBvdXRwdXQgLS0+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMjMwIiB4Mj0iOTc4IiB5Mj0iMjcwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMjg1IiB4Mj0iOTc4IiB5Mj0iMjcwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMzQwIiB4Mj0iOTc4IiB5Mj0iMjcwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMzk1IiB4Mj0iOTc4IiB5Mj0iMjcwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMjMwIiB4Mj0iOTc4IiB5Mj0iMzMwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMjg1IiB4Mj0iOTc4IiB5Mj0iMzMwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMzQwIiB4Mj0iOTc4IiB5Mj0iMzMwIi8+CiAgICA8bGluZSB4MT0iNjIyIiB5MT0iMzk1IiB4Mj0iOTc4IiB5Mj0iMzMwIi8+CiAgPC9nPgoKICA8IS0tIOi+k+WFpeWIl++8iGRfbW9kZWzvvIkgLS0+CiAgPGcgZmlsbD0id2hpdGUiPgogICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjcwIiByPSIyMiIvPgogICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMzMwIiByPSIyMiIvPgogIDwvZz4KICA8dGV4dCB4PSIyMDAiIHk9IjM5NSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNzUiIGZvbnQtc2l6ZT0iMTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiPmRfbW9kZWw8L3RleHQ+CgogIDwhLS0g6ZqQ6JeP5YiX77yIZF9mZu+8jOabtOWkp++8iSAtLT4KICA8ZyBmaWxsPSJ1cmwoI2dvbGQpIj4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjIzMCIgcj0iMjIiLz4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjI4NSIgcj0iMjIiLz4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjM0MCIgcj0iMjIiLz4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjM5NSIgcj0iMjIiLz4KICA8L2c+CiAgPHRleHQgeD0iNjAwIiB5PSI0NTUiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjc1IiBmb250LXNpemU9IjE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5kX2Zm77yI5pu06auY57u077yJPC90ZXh0PgoKICA8IS0tIOi+k+WHuuWIlyAtLT4KICA8ZyBmaWxsPSJ3aGl0ZSI+CiAgICA8Y2lyY2xlIGN4PSIxMDAwIiBjeT0iMjcwIiByPSIyMiIvPgogICAgPGNpcmNsZSBjeD0iMTAwMCIgY3k9IjMzMCIgcj0iMjIiLz4KICA8L2c+CiAgPHRleHQgeD0iMTAwMCIgeT0iMzk1IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC43NSIgZm9udC1zaXplPSIxOCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+ZF9tb2RlbDwvdGV4dD4KCiAgPCEtLSDkuLvmoIfpopggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI1MjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjYwIiBmb250LXdlaWdodD0iYm9sZCI+5YmN6aaI56We57uP572R57ucIEZGTjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU3NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuNzIiIGZvbnQtc2l6ZT0iMjIiPkFJIOamguW/teino+ivuyDCtyBGZWVkLUZvcndhcmQgTmV0d29yazwvdGV4dD4KPC9zdmc+Cg==" alt="前馈神经网络封面" />

Transformer 在做完「注意力机制」之后，会给每个 token 单独再过一遍一个固定的小网络，把它「加工」一下，再传给下一层。这个固定的小网络就叫**前馈神经网络**（Feed-Forward Network，简称 **FFN**）。

它干的事用一句话概括：**对每个位置的向量，独立地做两次线性变换，中间夹一个非线性激活函数**。听起来抽象，但它要解决的问题其实很朴素。

## 为什么需要它：没有非线性，再多层也白搭

「神经网络」之所以能学复杂的东西，靠的是「线性变换 + 非线性激活」反复叠加。如果只有线性变换（就是矩阵乘法和加法），那么不管你堆多少层，整个网络在数学上等价于「只乘了一个大矩阵」——表达能力跟一层完全一样。

打个比方：你对一个数字做「先乘 2，再加 3，再乘 4」三步运算，完全可以合成「乘 26 再加 12」一步完成。线性运算怎么叠加都能压缩成一步，所以光靠它，模型根本学不出复杂模式。

FFN 在 Transformer 里的核心作用，就是把这个**非线性**重新塞回去：在两次线性变换之间，插一个 ReLU（或更现代的 SwiGLU）这种「非线性函数」，让多层叠加真正变得有意义。

## 它是怎么工作的：一个公式

Transformer 原论文里，FFN 的公式是：

$$
\text{FFN}(x) = \max(0,\ xW_1 + b_1)\,W_2 + b_2
$$

逐个符号拆开看：

- $x$：输入向量，是一个 token 在当前层的表示（比如 512 维）。可以理解成「这个 token 现在的长相」。
- $W_1,\ b_1$：第一层线性变换的**权重矩阵**和**偏置**。$W_1$ 通常把维度从 $d_{\text{model}}$（如 512）**放大**到 $d_{\text{ff}}$（如 2048），让信息在更高维的空间里展开。
- $\max(0,\ \cdot)$：就是 **ReLU 激活函数**。它做的事很简单——负数变 0，正数原样保留。这一步是整个公式里**唯一的非线性**，没有它，多层网络就退化成一个线性变换。
- $W_2,\ b_2$：第二层线性变换，把维度从 $d_{\text{ff}}$（2048）**压回** $d_{\text{model}}$（512），保证输出能接到下一层去。

一进一出：先升维展开，用 ReLU 切掉负信号，再压回原维度。模型在这个过程中可以挑选「哪些特征该保留、哪些该丢」。

## 一个极简算例

设 $x = [1,\ 2]$（一个 2 维向量），把参数都设得很小：

$$
W_1 = \begin{bmatrix} 1 & 0 & -1 \\ 2 & 1 & 0 \end{bmatrix},\quad b_1 = [0,\ 0,\ 1]
$$

第一步，算 $xW_1 + b_1$，得到一个 3 维向量：

$$
[1\times1 + 2\times2,\ \ 1\times0 + 2\times1,\ \ 1\times(-1) + 2\times0] + [0,\ 0,\ 1] = [5,\ 2,\ 0]
$$

第二步，套 ReLU，$\max(0,\ \cdot)$。这里没有负数，结果不变：$[5,\ 2,\ 0]$。

第三步，再乘 $W_2$、加 $b_2$。设 $W_2 = [1,\ -1,\ 2]^T$，$b_2 = 0.5$：

$$
5\times1 + 2\times(-1) + 0\times2 + 0.5 = 3.5
$$

最终这个 token 经过 FFN 后，输出是 $3.5$。如果输入里把 $x$ 的某个分量改成负数，线性部分会出现负值，ReLU 会把它「掐掉」，结果就不一样了——这正是非线性的作用。

## 逐位置（position-wise）：每个 token 走同一套

FFN 还有一个关键特性：**对序列里每个位置（token）都独立、且用同一套参数做变换**。

注意「独立」的意思——token A 和 token B 在 FFN 里**不交换信息**。信息交换是注意力机制的活，FFN 只负责「把每个 token 自己打磨一遍」。而「同一套参数」是说：所有 token 共享同一组 $W_1, b_1, W_2, b_2$。

这有点像流水线上的一道「统一加工站」：每个零件单独过一遍同一台机器，机器的设置（参数）对所有零件都一样。这样既保证每个 token 都被深度加工，又不会让参数量随序列长度爆炸。

## 现代大模型：SwiGLU 换掉了 ReLU

原始 Transformer 用 ReLU，但近几年主流大模型（LLaMA、PaLM、Mistral 等）几乎都改用了 **SwiGLU**。它是 Shazeer 在 2020 年提出的「带门控」的激活函数，大致形式是：

$$
\text{SwiGLU}(x) = \big(\text{Swish}(xW)\big) \odot (xV)
$$

其中 $\text{Swish}(z) = z \cdot \sigma(z)$（$\sigma$ 是 sigmoid 函数），$\odot$ 表示逐元素相乘，$W$ 和 $V$ 是两个独立的权重矩阵。

直觉上：它把 $x$ 同时投影成两路——一路当「候选内容」，另一路当「开关（门控）」——再逐位相乘。门控让网络能动态决定「这个维度上的信号要不要放过」，比 ReLU 一刀切的「负数全砍」要灵活得多，表达能力更强。代价是 FFN 参数多了约 2/3，但对大模型来说，这点开销换来的质量提升很划算。

## 小结

FFN 是 Transformer 里和注意力机制并列的两大核心组件之一。它做的事就三步：**升维、激活（塞进非线性）、降回原维度**，并且对每个 token 独立施加同一套变换。注意力负责让 token 之间「互相看见」，FFN 负责让每个 token「自己被深度加工」——二者一外一内，缺一不可。

## 完整代码

下面是一个可直接运行的 PyTorch 实现，包含经典的 ReLU 版本和现代的 SwiGLU 版本：

```python
import torch
import torch.nn as nn
import torch.nn.functional as F


class PositionWiseFFN(nn.Module):
    """经典版 FFN：两层线性 + ReLU，对应原论文公式"""
    def __init__(self, d_model: int, d_ff: int):
        super().__init__()
        # linear1 对应 W1, b1：把 d_model 维升到 d_ff 维
        self.linear1 = nn.Linear(d_model, d_ff)
        # linear2 对应 W2, b2：把 d_ff 维压回 d_model 维
        self.linear2 = nn.Linear(d_ff, d_model)

    def forward(self, x):
        # x 形状: (batch, seq_len, d_model)
        h = self.linear1(x)        # 升维：xW1 + b1
        h = F.relu(h)              # max(0, ·)，引入非线性
        return self.linear2(h)     # 降维：(...)W2 + b2


class SwiGLUFFN(nn.Module):
    """现代版 FFN：SwiGLU 门控激活（LLaMA 等大模型常用）"""
    def __init__(self, d_model: int, d_ff: int):
        super().__init__()
        # SwiGLU 需要两个并列的线性投影：w_gate 和 w_value
        self.w_gate  = nn.Linear(d_model, d_ff)
        self.w_value = nn.Linear(d_model, d_ff)
        # 再把门控后的 d_ff 维压回 d_model
        self.w_out   = nn.Linear(d_ff, d_model)

    def forward(self, x):
        # silu(x) = x * sigmoid(x)，即 Swish；门控 = silu(gate) * value
        gated = F.silu(self.w_gate(x)) * self.w_value(x)
        return self.w_out(gated)


# === 跑一下试试 ===
torch.manual_seed(0)
d_model, d_ff = 8, 16
ffn = PositionWiseFFN(d_model, d_ff)

# 假数据：1 个 batch、3 个 token、每个 token 8 维
x = torch.randn(1, 3, d_model)
y = ffn(x)                          # 前向：每个 token 独立过同一套 FFN
print("输出形状:", y.shape)          # (1, 3, 8)，维度压回了 d_model

# 训练一步演示（参数会被更新）
target = torch.randn_like(y)
loss = F.mse_loss(y, target)         # 算一个简单的损失
loss.backward()                      # 反向传播，算梯度
for p in ffn.parameters():
    p.data -= 0.01 * p.grad          # 手动做一步梯度下降
print("loss:", loss.item())
```

输出形状会是 `(1, 3, 8)`——三个 token 各自被同一套参数加工了一遍，维度回到 $d_{\text{model}}$。

## 参考资料

1. Attention Is All You Need — Vaswani et al., 2017
   https://arxiv.org/abs/1706.03762
2. GLU Variants Improve Transformer — Shazeer, 2020
   https://arxiv.org/abs/2002.05202
3. Position-wise Feed-Forward Network (FFN) — labml.ai
   https://nn.labml.ai/transformers/feed_forward.html
