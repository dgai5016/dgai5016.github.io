---
title: 共享专家稀疏 MoE（DeepSeek 版）是什么
date: 2026-08-12 14:38
tags: [AI]
excerpt: 普通稀疏 MoE 里，多个路由专家会重复学同一套通用知识，既浪费参数、又不够专注。DeepSeekMoE 额外加几个所有 token 必经的「共享专家」专门承载通用知识，让路由专家专心做各自子任务——省参数、训练更稳、效果更好。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZXhwZXJ0T24iIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2VmZTdmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPHRleHQgeD0iNTYwIiB5PSI0MiIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg4KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiPui3r+eUseS4k+Wutu+8iHRvcC1LIOeogOeWj+a/gOa0u++8iTwvdGV4dD4KCiAgPGxpbmUgeDE9IjE1MiIgeTE9IjE3MCIgeDI9IjI3MiIgeTI9IjE3MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CgogIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjE3MCIgcj0iMzIiIGZpbGw9IndoaXRlIi8+CiAgPHRleHQgeD0iMTIwIiB5PSIxNzYiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiMzYTJkNmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIj50b2tlbjwvdGV4dD4KCiAgPHBvbHlnb24gcG9pbnRzPSIzMDAsMTQwIDMzMCwxNzAgMzAwLDIwMCAyNzAsMTcwIiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8dGV4dCB4PSIzMDAiIHk9IjIyMiIgZm9udC1zaXplPSIxNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjYwMCI+6Lev55SxIGdhdGU8L3RleHQ+CgogIDxsaW5lIHgxPSIzMzAiIHkxPSIxNzAiIHgyPSI1MDUiIHkyPSI5NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjMzMCIgeTE9IjE3MCIgeDI9IjUwNSIgeTI9IjE0NSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNCkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNyA2Ii8+CiAgPGxpbmUgeDE9IjMzMCIgeTE9IjE3MCIgeDI9IjUwNSIgeTI9IjE5NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPGxpbmUgeDE9IjMzMCIgeTE9IjE3MCIgeDI9IjUwNSIgeTI9IjI0NSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNCkiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWRhc2hhcnJheT0iNyA2Ii8+CgogIDxyZWN0IHg9IjUwNSIgeT0iNzUiIHdpZHRoPSIxMTAiIGhlaWdodD0iNDAiIHJ4PSI5IiBmaWxsPSJ1cmwoI2V4cGVydE9uKSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHRleHQgeD0iNTYwIiB5PSIxMDEiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiMzYTJkNmUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIj7kuJPlrrYgMTwvdGV4dD4KCiAgPHJlY3QgeD0iNTA1IiB5PSIxMjUiIHdpZHRoPSIxMTAiIGhlaWdodD0iNDAiIHJ4PSI5IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTYpIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC40MikiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjU2MCIgeT0iMTUxIiBmb250LXNpemU9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzIpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5LiT5a62IDI8L3RleHQ+CgogIDxyZWN0IHg9IjUwNSIgeT0iMTc1IiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjQwIiByeD0iOSIgZmlsbD0idXJsKCNleHBlcnRPbikiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgogIDx0ZXh0IHg9IjU2MCIgeT0iMjAxIiBmb250LXNpemU9IjE1IiBmaWxsPSIjM2EyZDZlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC13ZWlnaHQ9IjcwMCI+5LiT5a62IDM8L3RleHQ+CgogIDxyZWN0IHg9IjUwNSIgeT0iMjI1IiB3aWR0aD0iMTEwIiBoZWlnaHQ9IjQwIiByeD0iOSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE2KSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNDIpIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1NjAiIHk9IjI1MSIgZm9udC1zaXplPSIxNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuS4k+WutiA0PC90ZXh0PgoKICA8dGV4dCB4PSI1NjAiIHk9IjMwMCIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg4KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI2MDAiPuWFseS6q+S4k+Wutu+8iOWni+e7iOa/gOa0u++8iTwvdGV4dD4KCiAgPHBhdGggZD0iTSAxMjAgMjAyIFEgMjkwIDM2MCA1MDUgMzM1IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjUiIGZpbGw9Im5vbmUiLz4KICA8cGF0aCBkPSJNIDEyMCAyMDIgUSAyOTAgNDEwIDUwNSAzODUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iNSIgZmlsbD0ibm9uZSIvPgoKICA8cmVjdCB4PSI1MDUiIHk9IjMxNSIgd2lkdGg9IjExMCIgaGVpZ2h0PSI0MCIgcng9IjkiIGZpbGw9InVybCgjZXhwZXJ0T24pIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI1NjAiIHk9IjM0MSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzNhMmQ2ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiPuWFseS6q+S4k+WutiBBPC90ZXh0PgoKICA8cmVjdCB4PSI1MDUiIHk9IjM2NSIgd2lkdGg9IjExMCIgaGVpZ2h0PSI0MCIgcng9IjkiIGZpbGw9InVybCgjZXhwZXJ0T24pIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8dGV4dCB4PSI1NjAiIHk9IjM5MSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzNhMmQ2ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSI3MDAiPuWFseS6q+S4k+WutiBCPC90ZXh0PgoKICA8Y2lyY2xlIGN4PSI4ODAiIGN5PSIyNDAiIHI9IjM4IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjUiLz4KICA8dGV4dCB4PSI4ODAiIHk9IjI1NSIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iNzAwIj7OozwvdGV4dD4KCiAgPGxpbmUgeDE9IjYxNSIgeTE9Ijk1IiB4Mj0iODQ0IiB5Mj0iMjE4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iNjE1IiB5MT0iMTk1IiB4Mj0iODQ0IiB5Mj0iMjM4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iNjE1IiB5MT0iMzM1IiB4Mj0iODQ0IiB5Mj0iMjU4IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz4KICA8bGluZSB4MT0iNjE1IiB5MT0iMzg1IiB4Mj0iODQ0IiB5Mj0iMjY2IiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjQiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1MDAiIGZvbnQtc2l6ZT0iNzYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuWFseS6q+S4k+WutueogOeWjyBNb0U8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTU1IiBmb250LXNpemU9IjMwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODIpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="共享专家稀疏 MoE封面" />

**一句话定义**：在普通稀疏 MoE 的基础上，**额外加几个所有 token 都一定会经过的「共享专家」**，专门负责通用知识；剩下的「路由专家」由 router 挑选，只负责各自擅长的子任务。两类专家的输出相加，就是最终结果。这套做法由 DeepSeek 团队提出，被称为 DeepSeekMoE。

## 一个生活类比：综合医院

想象一家综合医院的就诊流程：

- 每个病人（token）进门后，**必先经过全科医生**——量血压、查血常规、问主诉，这些是几乎所有病人都需要的通用检查。
- 然后根据症状，**分流到对应科室的专科医生**——骨科、心内科、皮肤科……一个病人通常只需要看其中一两个科室，不用把所有科室都看一遍。

「共享专家」就是那位全科医生，「路由专家」就是各科室的专科医生。DeepSeek 把这套分工写进了 MoE 架构。

## 先回顾：普通稀疏 MoE 是什么样

在讲共享专家之前，得先知道普通的稀疏 MoE（关联概念：稀疏 MoE / Sparse MoE）长什么样。

普通的稀疏 MoE 层里有 N 个「专家」（每个专家就是一个小的 FFN 前馈网络），再加一个 router（路由器）。来一个 token，router 给它打分，挑出分数最高的 Top-K 个专家去处理它，其它专家不参与。这样每个 token 只动用一小部分专家，省算力。

公式如下：

$$h_t = \sum_{i=1}^{N} g_{i,t} \cdot \text{FFN}_i(x_t) + x_t$$

符号逐项解读：

- $x_t$：第 $t$ 个 token 的输入向量。
- $\text{FFN}_i$：第 $i$ 个专家（一个小型前馈网络）。
- $g_{i,t}$：router 给「第 $t$ 个 token 分配给第 $i$ 个专家」的权重；只有被选中的 Top-K 个专家的 $g_{i,t}$ 非零，其余为 0（这就是「稀疏」的来源）。
- $+ x_t$：残差连接，把输入直接加回去，帮助训练稳定。

问题来了：router 是「就事论事」地分派，它只看「这个 token 更像谁的专长」，并不会去管「有没有一些通用知识，其实是所有专家都需要会的」。

## 共享专家要解决什么问题：知识冗余

DeepSeek 团队观察到普通稀疏 MoE 的一个痛点：**知识冗余**。

很多 token 的底层需求是相通的——比如基本语法、常见搭配、通用语义。在普通稀疏 MoE 里，因为每个路由专家各自训练，这些通用知识会被**一遍又一遍地塞进不同路由专家的参数里**。结果就是：

- 多个路由专家都在重复学同一套通用知识，参数浪费；
- 路由专家不够「专注」，本该用来打磨自己专长的算力被通用部分占掉了；
- 训练时也更容易出现「几个专家越来越像」的不稳定现象。

DeepSeek 的解法很直接：**把通用知识单独抽出来，集中放到几个所有 token 都必经的「共享专家」里**。这样路由专家就被解放出来，专心处理各自独有的子任务。

论文里有一个很能说明问题的消融实验：把共享专家关掉（保持总计算量不变），模型在 Pile 数据集上的损失从 1.808 涨到 2.414——损失涨了一大截，说明共享专家不是可有可无的装饰，而是真的在干活。

## 共享专家 vs 路由专家：分工

| | 共享专家（Shared Expert） | 路由专家（Routed Expert） |
|---|---|---|
| 是否经过 | 所有 token **无条件**都经过 | 只有被 router 选中的 Top-K 才经过 |
| 负责什么 | 通用、共享的知识 | 各自擅长的特定子任务 |
| 数量 | 少（DeepSeek 用 1～4 个） | 多（几十到上百个） |
| 激活方式 | 恒定激活 | 稀疏激活 |

DeepSeekMoE 在不同规模的模型上，用的配置是：

- 2B 模型：1 个共享 + 63 个路由专家
- 16B 模型：2 个共享 + 64 个路由专家
- 145B 模型：4 个共享 + 128 个路由专家

可以看到，共享专家的数量很少（几个），路由专家才是大头。这也好理解：共享专家要是太多，「稀疏省算力」的好处就被吃掉了——本来 MoE 的卖点就是「每个 token 只动一小部分专家」。

> 补充一句：DeepSeekMoE 还有一个配套技巧叫「细粒度专家切分」（把大专家切成更小的专家，提升专业化），本篇聚焦共享专家，这里不展开。

## 公式：两者相加

DeepSeekMoE 的前向计算，相比 SparseMoE 就是多加了一项共享专家的求和：

$$h_t = \underbrace{\sum_{i=1}^{K_s} \text{FFN}_i(x_t)}_{\text{共享专家：恒定激活}} + \underbrace{\sum_{i=K_s+1}^{N} g_{i,t} \cdot \text{FFN}_i(x_t)}_{\text{路由专家：稀疏激活}} + x_t$$

符号读法：

- 前半段求和 $\sum_{i=1}^{K_s}$：$K_s$ 个共享专家，每个都对 $x_t$ 算一遍 FFN，**没有门控权重**（或者说权重恒为 1），全部累加。
- 后半段求和 $\sum_{i=K_s+1}^{N}$：剩下的是路由专家，按 router 给的门控权重 $g_{i,t}$ 加权求和（只有 Top-K 非零）。
- $+ x_t$：残差。

### 一个极小算例

设 token 输入 $x_t = [1, 1]$（2 维，纯示意），1 个共享专家 + 2 个路由专家（Top-1）。

- 共享专家输出：$\text{FFN}_{\text{shared}}(x_t) = [2, 0]$（固定经过，不受 router 影响）。
- router 打分 softmax 后 $s = [0.8, 0.2]$，Top-1 选专家 1，门控权重 $g_1 = 0.8$、$g_2 = 0$。
- 路由专家输出：$\text{FFN}_1(x_t) = [0, 3]$、$\text{FFN}_2(x_t) = [4, 0]$。
- 路由部分 $= 0.8 \times [0,3] + 0 \times [4,0] = [0, 2.4]$。
- 最终 $= [2,0] + [0,2.4] + [1,1] = [3, 3.4]$。

可以看到，共享专家那份 $[2,0]$ 不管 router 怎么选，**永远在**；路由专家那份则看 token 的性质动态变化。两者一相加，通用知识 + 专长知识就都齐了。

## PyTorch 实现：在 SparseMoE 输出上加共享专家

ShareExpertMOE 的实现非常清爽——直接复用 SparseMOE 的输出，再额外加上若干个所有 token 都经过的共享专家输出之和。

核心 forward 片段（对应公式两段求和）：

```python
# 1) 路由专家部分：复用 SparseMOE，由 router 选 Top-K
sparse_out = self.sparse_moe(x)                                       # [B, T, d_model]

# 2) 共享专家部分：所有 token 都过每一个共享专家，逐个累加（公式前半段求和）
shared_out = sum(expert(x) for expert in self.shared_experts)         # [B, T, d_model]

# 3) 两者相加作为最终结果（残差已在 sparse_moe 内部处理）
return sparse_out + shared_out
```

完整可跑版见下一节。

## 完整代码

```python
# PyTorch 实现：共享专家稀疏 MoE（DeepSeek 版）
# 依赖：pip install torch
import torch
import torch.nn as nn
import torch.nn.functional as F


class SparseMOE(nn.Module):
    """普通的稀疏 MoE：router 选 Top-K 个路由专家加权求和，再加残差。"""

    def __init__(self, d_model, d_ff, num_experts, top_k):
        super().__init__()
        self.top_k = top_k
        # router：线性层，给每个专家打一个分
        self.router = nn.Linear(d_model, num_experts)
        # num_experts 个路由专家，每个是一个小 FFN（两层线性 + 激活）
        self.experts = nn.ModuleList([
            nn.Sequential(
                nn.Linear(d_model, d_ff),   # 升维
                nn.ReLU(),                  # 非线性激活
                nn.Linear(d_ff, d_model),   # 降回原维度
            )
            for _ in range(num_experts)
        ])

    def forward(self, x):
        # x 形状：[B, T, d_model] —— B=批大小，T=序列长度，d_model=向量维度
        B, T, D = x.shape
        logits = self.router(x)                       # [B, T, num_experts]，router 给每个专家打分
        scores = F.softmax(logits, dim=-1)            # 归一化成权重（和为 1）
        topk_val, topk_idx = scores.topk(self.top_k, dim=-1)  # 选分数最高的 Top-K 个专家

        out = torch.zeros_like(x)                     # 准备累加容器
        # 逐 token 把选中的专家输出加权累加（教学版实现，清晰优先，不追求速度）
        for b in range(B):
            for t in range(T):
                for k in range(self.top_k):
                    idx = topk_idx[b, t, k]           # 第 k 个被选中的专家编号
                    w = topk_val[b, t, k]             # 对应的门控权重
                    out[b, t] += w * self.experts[idx](x[b, t])
        return out + x                                # 残差：对应公式里的 + x_t


class ShareExpertMOE(nn.Module):
    """共享专家稀疏 MoE = SparseMOE 输出 + 若干个共享专家输出之和。"""

    def __init__(self, d_model, d_ff, num_experts, num_shared_experts, top_k):
        super().__init__()
        # 1) 路由专家部分：直接复用前面的 SparseMOE
        self.sparse_moe = SparseMOE(d_model, d_ff, num_experts, top_k)
        # 2) 共享专家部分：所有 token 都经过，每个都是一个小 FFN
        self.shared_experts = nn.ModuleList([
            nn.Sequential(
                nn.Linear(d_model, d_ff),
                nn.ReLU(),
                nn.Linear(d_ff, d_model),
            )
            for _ in range(num_shared_experts)
        ])

    def forward(self, x):
        # 对应公式：共享专家求和（无条件） + 路由专家求和（门控加权），残差已在 sparse_moe 内
        sparse_out = self.sparse_moe(x)                                     # 路由专家部分
        shared_out = sum(expert(x) for expert in self.shared_experts)       # 共享专家部分
        return sparse_out + shared_out


# —— 跑一次 ——
torch.manual_seed(0)                       # 固定随机种子，保证结果可复现
B, T, D = 2, 4, 8                          # 批大小 2、序列长度 4、向量维度 8
x = torch.randn(B, T, D)                  # 构造假输入（正态分布随机张量）

# 4 个路由专家（Top-1）+ 1 个共享专家
model = ShareExpertMOE(d_model=D, d_ff=16, num_experts=4, num_shared_experts=1, top_k=1)

out = model(x)
print("输出形状:", out.shape)              # 期望 [2, 4, 8]

# 训练一步：随便给一个目标，算 loss 再反传
target = torch.randn_like(out)            # 假目标
loss = F.mse_loss(out, target)            # 均方误差损失
loss.backward()                           # 反向传播，算出每个参数的梯度
print("loss:", round(loss.item(), 4))
```

跑起来你应该能看到类似下面的输出（具体数值因随机种子而异）：

```
输出形状: torch.Size([2, 4, 8])
loss: 1.2345
```

几个对应关系提醒：`SparseMOE` 内部的 `out + x` 就是 SparseMoE 公式里的残差项；`ShareExpertMOE.forward` 里的 `shared_out` 对应公式前半段的无条件求和，`sparse_out` 对应后半段的门控加权求和。把它们加在一起，就是 DeepSeekMoE 的完整前向。

## 小结

共享专家稀疏 MoE 的核心洞察其实很朴素：**与其让每个路由专家都重复学一遍通用知识，不如把通用知识集中放到几个所有 token 都必经的共享专家里**。路由专家因此得以专注各自的子任务，模型既省参数、又更稳，效果还更好——这就是 DeepSeek 在 MoE 上做的关键改良之一。

## 参考资料

1. DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models - DeepSeek-AI, ACL 2024
   https://arxiv.org/abs/2401.06066
2. Mixture-of-Experts (MoE) LLMs - Cameron R. Wolfe, Ph.D.
   https://cameronrwolfe.substack.com/p/moe-llms
3. Mixture of Experts Explained - Hugging Face
   https://huggingface.co/blog/moe
