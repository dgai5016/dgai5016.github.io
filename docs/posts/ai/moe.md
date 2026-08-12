---
title: 混合专家 MOE 是什么
date: 2026-08-12 14:34
tags: [AI]
excerpt: 传统神经网络要让模型更强就得加宽加深，算力成本跟着翻倍。混合专家模型（MoE）改用「分而治之」——多个小网络分工，加一个门控 router 决定输入该交给谁，最后加权融合。本文用一篇零基础就能读懂的三要素拆解 + 最简 PyTorch 代码，带你拿下大模型架构的核心创新。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOGE4M2ZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CgogIDwhLS0g6KOF6aWw5ZyG54K5IC0tPgogIDxjaXJjbGUgY3g9IjkwIiBjeT0iOTAiIHI9IjYwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjA2Ii8+CiAgPGNpcmNsZSBjeD0iMTExMCIgY3k9IjU1MCIgcj0iOTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDYiLz4KICA8Y2lyY2xlIGN4PSIxMDUwIiBjeT0iMTEwIiByPSIzMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC4wOCIvPgoKICA8IS0tIOagh+mimCAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjkyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI1NiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iI2ZmZmZmZiI+5re35ZCI5LiT5a625qih5Z6LIE1PRTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjEzOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuODIiPk1peHR1cmUgb2YgRXhwZXJ0cyDCtyDliIbogIzmsrvkuYsgwrcg5pyv5Lia5pyJ5LiT5pS7PC90ZXh0PgoKICA8IS0tIGlucHV0IC0tPgogIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjM1MCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMjAiIHk9IjM1NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE1IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj7ovpPlhaU8L3RleHQ+CgogIDwhLS0gcm91dGVyIC0tPgogIDxyZWN0IHg9IjMzMCIgeT0iMzAwIiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjEwMCIgcng9IjE0IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjk2Ii8+CiAgPHRleHQgeD0iMzg1IiB5PSIzNDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+6Zeo5o6nPC90ZXh0PgogIDx0ZXh0IHg9IjM4NSIgeT0iMzcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+Um91dGVyPC90ZXh0PgoKICA8IS0tIDQg5Liq5LiT5a62IC0tPgogIDxyZWN0IHg9IjcwMCIgeT0iMTgwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjU4IiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTYiLz4KICA8dGV4dCB4PSI3NjUiIHk9IjIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj7kuJPlrrYgMTwvdGV4dD4KCiAgPHJlY3QgeD0iNzAwIiB5PSIyNjgiIHdpZHRoPSIxMzAiIGhlaWdodD0iNTgiIHJ4PSIxMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45NiIvPgogIDx0ZXh0IHg9Ijc2NSIgeT0iMzAzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2YzYzZmYiIGZvbnQtd2VpZ2h0PSI3MDAiPuS4k+WutiAyPC90ZXh0PgoKICA8cmVjdCB4PSI3MDAiIHk9IjM1NiIgd2lkdGg9IjEzMCIgaGVpZ2h0PSI1OCIgcng9IjEwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjk2Ii8+CiAgPHRleHQgeD0iNzY1IiB5PSIzOTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+5LiT5a62IDM8L3RleHQ+CgogIDxyZWN0IHg9IjcwMCIgeT0iNDQ0IiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjU4IiByeD0iMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTYiLz4KICA8dGV4dCB4PSI3NjUiIHk9IjQ3OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNmM2M2ZmIiBmb250LXdlaWdodD0iNzAwIj7kuJPlrrYgNDwvdGV4dD4KCiAgPCEtLSBvdXRwdXQgLS0+CiAgPGNpcmNsZSBjeD0iMTA4MCIgY3k9IjM1MCIgcj0iMzAiIGZpbGw9IiNmZmZmZmYiLz4KICA8dGV4dCB4PSIxMDgwIiB5PSIzNTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjcwMCI+6L6T5Ye6PC90ZXh0PgoKICA8IS0tIGlucHV0IOKGkiByb3V0ZXIgLS0+CiAgPGxpbmUgeDE9IjE1MCIgeTE9IjM1MCIgeDI9IjMzMCIgeTI9IjM1MCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KCiAgPCEtLSByb3V0ZXIg4oaSIGV4cGVydHPvvIjnspfnu4booajnpLrmnYPph43vvIkgLS0+CiAgPGxpbmUgeDE9IjQ0MCIgeTE9IjMyMCIgeDI9IjcwMCIgeTI9IjIwOSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuNDUiLz4KICA8bGluZSB4MT0iNDQwIiB5MT0iMzM1IiB4Mj0iNzAwIiB5Mj0iMjk3IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgb3BhY2l0eT0iMC45Ii8+CiAgPGxpbmUgeDE9IjQ0MCIgeTE9IjM1NSIgeDI9IjcwMCIgeTI9IjM4NSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjkiIG9wYWNpdHk9IjEiLz4KICA8bGluZSB4MT0iNDQwIiB5MT0iMzc1IiB4Mj0iNzAwIiB5Mj0iNDczIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgb3BhY2l0eT0iMC42Ii8+CgogIDwhLS0gZXhwZXJ0cyDihpIgb3V0cHV077yI57KX57uG6KGo56S66J6N5ZCI5p2D6YeN77yJIC0tPgogIDxsaW5lIHgxPSI4MzAiIHkxPSIyMDkiIHgyPSIxMDUyIiB5Mj0iMzQwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC40NSIvPgogIDxsaW5lIHgxPSI4MzAiIHkxPSIyOTciIHgyPSIxMDUyIiB5Mj0iMzQ1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iNSIgb3BhY2l0eT0iMC45Ii8+CiAgPGxpbmUgeDE9IjgzMCIgeTE9IjM4NSIgeDI9IjEwNTIiIHkyPSIzNTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI5IiBvcGFjaXR5PSIxIi8+CiAgPGxpbmUgeDE9IjgzMCIgeTE9IjQ3MyIgeDI9IjEwNTIiIHkyPSIzNTUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjYiLz4KCiAgPCEtLSDlupXpg6jlia/moIfor4YgLS0+CiAgPGxpbmUgeDE9IjU0MCIgeTE9IjU2OCIgeDI9IjY2MCIgeTI9IjU2OCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuNSIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTk4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNzIiIGxldHRlci1zcGFjaW5nPSIzIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="混合专家 MOE封面" />

你有没有想过：为什么一家大医院要分那么多科室？如果让一个「全能医生」从头到脚、内内外外全包，他要么累垮，要么哪科都不精。医院的做法是分而治之——按病症分诊到不同科室，每科医生在自己领域深耕，最后综合各科意见给出诊断。

混合专家模型（Mixture of Experts，简称 MoE）就是把这个「术业有专攻」的思路搬进神经网络：不再用一个又大又全的网络处理所有输入，而是设置多个小网络（专家），再让一个「门控 router」决定当前输入该交给哪些专家、各占多少比重，最后把各专家的输出加权融合。

这是当下大模型（如 Mixtral 8x7B、DeepSeek-V3；业界普遍推测 GPT-4 也采用了类似架构）背后最核心的架构创新之一，属于深度学习里「让模型变大、但不让计算成本跟着爆炸」的关键思路。

## 三个核心要素

MoE 的全部秘密就藏在这三件套里：

1. **专家（Expert）**：每个专家是一个独立的小网络（最简单可以就是一个线性层 Linear）。它并不是真的懂某个领域，而是在训练过程中逐渐「擅长」某一类输入，自然形成分工。
2. **门控 Router（Gate）**：一个小网络，输入和专家们看到的是同一个 $x$，输出是「该给每个专家多少权重」。最常见的实现就是一个 Linear 加 softmax。
3. **加权融合**：让每个专家都跑一遍自己的小网络，得到各自的输出，再用 router 给的权重做加权求和，得到最终结果。

本文讲的是基础版，叫**稠密 MoE**：所有专家都会被激活（即参与计算）、都参与加权融合。后面会提一句工程上的升级版——稀疏 MoE（只挑 top-k 个专家），但思想完全一致。

## 公式：三步走

把上面的流程写成数学，就两条核心公式。

**第一步，router 算权重：**

$$g = \mathrm{softmax}(W_g \, x)$$

逐项解读：

- $x$：当前输入向量（比如一个词的特征表示）。
- $W_g$：router 的权重矩阵，形状是「专家数 × 输入维度」。
- $W_g \, x$：得到每个专家的一个原始打分（logit，就是 softmax 之前的那层分数，有正有负，本身没有概率含义）。
- $\mathrm{softmax}$：把原始打分转成「概率」——非负、所有专家权重加起来等于 1。
- $g = (g_1, g_2, \dots, g_n)$：第 $i$ 个分量 $g_i$ 就是「第 $i$ 个专家该占的比重」。

**第二步，每个专家各自计算：**

$$e_i(x) = \text{第 } i \text{ 个专家对 } x \text{ 的输出}$$

最简单时，$e_i(x) = A_i x + b_i$，也就是一个线性层。

**第三步，加权融合：**

$$y = \sum_{i=1}^{n} g_i \cdot e_i(x)$$

把每个专家的输出乘以 router 给的权重，全部加起来，就是最终输出 $y$。直觉上：权重大的专家「话语权」大，对结果影响大；权重小的几乎被忽略。

## 一个小算例

假设有 3 个专家，router 对某次输入算出的原始打分是 $[1,\, 2,\, 3]$。

先过 softmax（公式 $\mathrm{softmax}(z)_i = e^{z_i} / \sum_j e^{z_j}$）：

- 分母：$e^1 + e^2 + e^3 \approx 2.72 + 7.39 + 20.09 = 30.20$
- 权重：$g_1 \approx 0.09,\; g_2 \approx 0.24,\; g_3 \approx 0.67$

自检：$0.09 + 0.24 + 0.67 = 1.00$，非负且和为 1，符合概率含义。

假设三个专家对这条输入的输出分别是 $e_1 = 10$、$e_2 = 20$、$e_3 = 30$，加权融合：

$$y = 0.09 \times 10 + 0.24 \times 20 + 0.67 \times 30 = 0.9 + 4.8 + 20.1 = 25.8$$

可以看到，专家 3 的权重最大（0.67），最终结果也明显偏向它的输出 30。Router 就这样通过权重「调控」了每个专家的话语权。

## 为什么要有 MoE？

传统的「一个网络通吃」做法，要让模型更强就得加宽加深，但**计算量随参数线性增长**——参数翻倍，算力也翻倍，很快就把显卡压垮。

MoE 的妙处在于：参数可以加到很大（多放几个专家），但每次前向（即模型算一次输出）只需激活其中一部分。稀疏 MoE（如 Mixtral 8x7B，8 个专家只用 2 个）正是利用这一点——总参数量很大，但单次计算量只相当于一个小模型，从而在「容量」和「速度」之间鱼和熊掌兼得。

基础版稠密 MoE 虽然没省计算量（所有专家都跑），但它把一个复杂的「通才」网络拆成了多个「专才」小网络，让每个专家专注于自己擅长的输入子集，整体效果往往比单一网络更好——这就是「分而治之」的价值。

## 稠密 vs 稀疏：一句话区分

- **稠密 MoE（本文基础版）**：所有专家都激活，全部加权融合。简单直观，适合学原理。
- **稀疏 MoE（大模型实际用的）**：router 只挑权重最高的 top-k 个专家（如 8 选 2），其他专家直接跳过，省算力。

两者只是 router 多了一步「取 top-k」，核心思想一致。

## 完整代码：基础版 MoE

下面是一个最简实现，复制即可跑：`BasicExpert`（一个 Linear 当专家）+ `BasicMOE`（gate 是一个 Linear，输出过 softmax 得权重，再加权求和）。代码里每一步都对应上面公式的某一行。

```python
# PyTorch 是最常用的深度学习框架；nn 是神经网络模块，F 是常用函数（如 softmax、mse_loss）
import torch
import torch.nn as nn
import torch.nn.functional as F


# 单个专家：最简实现就是一个线性层 Linear(feature_in -> feature_out)
class BasicExpert(nn.Module):
    def __init__(self, feature_in: int, feature_out: int):
        super().__init__()
        # 一个 Linear 就是一个最简「小网络」，对应公式里的 e_i(x) = A_i x + b_i
        self.linear = nn.Linear(feature_in, feature_out)

    def forward(self, x):
        return self.linear(x)


# 基础版稠密 MoE：gate 算权重 + 所有专家都跑 + 加权求和
class BasicMOE(nn.Module):
    def __init__(self, feature_in: int, feature_out: int, expert_number: int):
        super().__init__()
        # 用 ModuleList 注册多个专家，PyTorch 才会把它们的参数纳入 model.parameters()
        self.experts = nn.ModuleList(
            [BasicExpert(feature_in, feature_out) for _ in range(expert_number)]
        )
        # 门控 router：一个 Linear，输出维度 = 专家数，对应公式里的 W_g
        self.gate = nn.Linear(feature_in, expert_number)

    def forward(self, x):
        # x 形状: (batch, feature_in)，batch 是这一批的样本数
        # 第一步：router 算每个专家的权重，过 softmax 得到 g（对应公式 g = softmax(W_g x)）
        expert_weights = F.softmax(self.gate(x), dim=-1)  # (batch, expert_number)

        # 第二步：每个专家都对 x 跑一遍，得到 e_i(x)
        # torch.stack 把列表沿新维度拼起来: (batch, feature_out, expert_number)
        expert_outputs = torch.stack(
            [expert(x) for expert in self.experts], dim=-1
        )

        # 第三步：按权重加权求和（对应公式 y = Σ g_i · e_i(x)）
        # expert_weights.unsqueeze(1) 形状变成 (batch, 1, expert_number)，便于广播逐元素相乘
        weighted = expert_outputs * expert_weights.unsqueeze(1)
        output = weighted.sum(dim=-1)  # 沿专家维度求和: (batch, feature_out)
        return output, expert_weights


# === 假数据跑一遍前向 + 训练一步 ===
torch.manual_seed(42)  # 固定随机种子，保证每次运行结果一样（便于复现）

model = BasicMOE(feature_in=4, feature_out=3, expert_number=3)
x = torch.randn(2, 4)  # 生成 2 个样本，每个 4 维特征（数值为标准正态分布随机数）

# 前向：把 x 喂进模型，算出输出 y 和专家权重 weights
y, weights = model(x)
print("输出 y:", y)            # 形状 (2, 3)
print("专家权重 g:", weights)   # 形状 (2, 3)，每行加起来等于 1

# 训练一步：用 MSE 损失（均方误差）让模型输出逼近全 1 的目标，反向传播更新参数
target = torch.ones(2, 3)  # 目标输出：2 个样本，每个 3 维，全为 1
loss = F.mse_loss(y, target)
loss.backward()  # 反向传播：算出 loss 对所有参数（专家 + gate）的梯度

optimizer = torch.optim.SGD(model.parameters(), lr=0.01)  # SGD 优化器，学习率 0.01
optimizer.step()  # 用梯度更新一次参数
print("loss:", loss.item())  # .item() 把单元素 tensor 转成 Python 浮点数
```

读代码时抓住这三个对应关系就够了：

- `self.gate = nn.Linear(feature_in, expert_number)` 对应 $W_g$；
- `F.softmax(self.gate(x), dim=-1)` 对应公式第一步 $g = \mathrm{softmax}(W_g x)$；
- `expert_outputs * expert_weights.unsqueeze(1)` 再 `.sum(dim=-1)` 对应第三步 $y = \sum g_i \cdot e_i(x)$。

还有几个易忽略的细节：

- `nn.ModuleList`：把多个专家装进 `ModuleList`（而不是普通 Python list），PyTorch 才会注册它们的参数，`model.parameters()` 才能拿到、才能训练。
- `unsqueeze(1)`：把权重形状从 `(batch, expert_number)` 变成 `(batch, 1, expert_number)`，才能和 `(batch, feature_out, expert_number)` 逐元素相乘（广播机制）。
- 训练时专家和 router 是**联合训练**的——router 学「该把什么输入分给谁」，专家学「接到分配的输入后该怎么处理」，二者共同进化。

## 小结

一句话：**MoE = 多个专家 + 一个门控 router + 加权融合**。它把「一个通才大网络」拆成「多个专才小网络」分工合作，是「分而治之」「术业有专攻」在神经网络里的具体实现。基础版稠密（所有专家都跑、全部加权），大模型实际用的稀疏版只在 router 上多了「取 top-k」一步，思想完全一致。理解了这个基础版，再去读 Mixtral、DeepSeek-V3 的架构就轻松多了。

## 参考资料

1. Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer - Shazeer et al., ICLR 2017
   https://arxiv.org/abs/1701.06538
2. Mixture of Experts Explained - HuggingFace Blog
   https://huggingface.co/blog/moe
3. Mixture of experts - Wikipedia
   https://en.wikipedia.org/wiki/Mixture_of_experts
