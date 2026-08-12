---
title: GQA 是什么
date: 2026-08-12 14:30
tags: [AI]
excerpt: 大模型推理时，KV 缓存随序列长度线性膨胀，成为显存和速度的瓶颈。分组查询注意力（GQA）让多个 Query 头分组共享同一套 K/V，在 MHA 的精度和 MQA 的速度之间找到几乎不丢精度的甜点，被 Llama 2/3、Mistral 等主流大模型广泛采用。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsIHNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJiZyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxZTFiNGIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CgogIDx0ZXh0IHg9IjYwMCIgeT0iOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtc2l6ZT0iNTYiIGZvbnQtd2VpZ2h0PSI3MDAiPuWIhue7hOafpeivouazqOaEj+WKmzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2UwZTBmZiIgZm9udC1zaXplPSIyNiIgb3BhY2l0eT0iMC44NSI+R3JvdXBlZCBRdWVyeSBBdHRlbnRpb24gwrcgR1FBPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMTc1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjE4IiBvcGFjaXR5PSIwLjYiPuiuqSBRdWVyeSDlpLTjgIzmi7zlm6LjgI3lhbHkuqsgSy9W77yM5Zyo57K+5bqm5ZKM6YCf5bqm5LmL6Ze05om+5bmz6KGhPC90ZXh0PgoKICA8dGV4dCB4PSIyMjAiIHk9IjI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9IjYwMCIgb3BhY2l0eT0iMC45Ij5NSEE8L3RleHQ+CiAgPHRleHQgeD0iMjIwIiB5PSIyODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtc2l6ZT0iMTUiIG9wYWNpdHk9IjAuNiI+5q+P5aS054us56uLIEsvVjwvdGV4dD4KICA8bGluZSB4MT0iMTA4IiB5MT0iMzUwIiB4Mj0iMzMyIiB5Mj0iMzUwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjQ1Ii8+CiAgPGxpbmUgeDE9IjEwOCIgeTE9IjQwMCIgeDI9IjMzMiIgeTI9IjQwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgb3BhY2l0eT0iMC40NSIvPgogIDxsaW5lIHgxPSIxMDgiIHkxPSI0NTAiIHgyPSIzMzIiIHkyPSI0NTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIG9wYWNpdHk9IjAuNDUiLz4KICA8bGluZSB4MT0iMTA4IiB5MT0iNTAwIiB4Mj0iMzMyIiB5Mj0iNTAwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjQ1Ii8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iMzUwIiByPSIxMSIgZmlsbD0iI2E4OWVmZiIvPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjQwMCIgcj0iMTEiIGZpbGw9IiNhODllZmYiLz4KICA8Y2lyY2xlIGN4PSIxMDAiIGN5PSI0NTAiIHI9IjExIiBmaWxsPSIjYTg5ZWZmIi8+CiAgPGNpcmNsZSBjeD0iMTAwIiBjeT0iNTAwIiByPSIxMSIgZmlsbD0iI2E4OWVmZiIvPgogIDxyZWN0IHg9IjMyNCIgeT0iMzM5IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjgiLz4KICA8cmVjdCB4PSIzMjQiIHk9IjM4OSIgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC44Ii8+CiAgPHJlY3QgeD0iMzI0IiB5PSI0MzkiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuOCIvPgogIDxyZWN0IHg9IjMyNCIgeT0iNDg5IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjgiLz4KCiAgPHJlY3QgeD0iNDI1IiB5PSIyMjUiIHdpZHRoPSIzNTAiIGhlaWdodD0iMzEwIiByeD0iMTIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDYiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9IjcwMCI+R1FBPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMjgyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjE1IiBvcGFjaXR5PSIwLjg1Ij7liIbnu4TlhbHkuqsgSy9WPC90ZXh0PgogIDxsaW5lIHgxPSI0ODgiIHkxPSIzNTAiIHgyPSI3MTIiIHkyPSIzNzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjgiIG9wYWNpdHk9IjAuNzUiLz4KICA8bGluZSB4MT0iNDg4IiB5MT0iNDAwIiB4Mj0iNzEyIiB5Mj0iMzc1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS44IiBvcGFjaXR5PSIwLjc1Ii8+CiAgPGxpbmUgeDE9IjQ4OCIgeTE9IjQ1MCIgeDI9IjcxMiIgeTI9IjQ3NSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuOCIgb3BhY2l0eT0iMC43NSIvPgogIDxsaW5lIHgxPSI0ODgiIHkxPSI1MDAiIHgyPSI3MTIiIHkyPSI0NzUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjgiIG9wYWNpdHk9IjAuNzUiLz4KICA8Y2lyY2xlIGN4PSI0ODAiIGN5PSIzNTAiIHI9IjExIiBmaWxsPSIjYTg5ZWZmIi8+CiAgPGNpcmNsZSBjeD0iNDgwIiBjeT0iNDAwIiByPSIxMSIgZmlsbD0iI2E4OWVmZiIvPgogIDxjaXJjbGUgY3g9IjQ4MCIgY3k9IjQ1MCIgcj0iMTEiIGZpbGw9IiNhODllZmYiLz4KICA8Y2lyY2xlIGN4PSI0ODAiIGN5PSI1MDAiIHI9IjExIiBmaWxsPSIjYTg5ZWZmIi8+CiAgPHJlY3QgeD0iNzA0IiB5PSIzNjQiIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45NSIvPgogIDxyZWN0IHg9IjcwNCIgeT0iNDY0IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTUiLz4KCiAgPHRleHQgeD0iOTgwIiB5PSIyNTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSI2MDAiIG9wYWNpdHk9IjAuOSI+TVFBPC90ZXh0PgogIDx0ZXh0IHg9Ijk4MCIgeT0iMjgyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjE1IiBvcGFjaXR5PSIwLjYiPuWFqOWFseS6qyBLL1Y8L3RleHQ+CiAgPGxpbmUgeDE9Ijg2OCIgeTE9IjM1MCIgeDI9IjEwOTIiIHkyPSI0MjUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIG9wYWNpdHk9IjAuNDUiLz4KICA8bGluZSB4MT0iODY4IiB5MT0iNDAwIiB4Mj0iMTA5MiIgeTI9IjQyNSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgb3BhY2l0eT0iMC40NSIvPgogIDxsaW5lIHgxPSI4NjgiIHkxPSI0NTAiIHgyPSIxMDkyIiB5Mj0iNDI1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjQ1Ii8+CiAgPGxpbmUgeDE9Ijg2OCIgeTE9IjUwMCIgeDI9IjEwOTIiIHkyPSI0MjUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxLjUiIG9wYWNpdHk9IjAuNDUiLz4KICA8Y2lyY2xlIGN4PSI4NjAiIGN5PSIzNTAiIHI9IjExIiBmaWxsPSIjYTg5ZWZmIi8+CiAgPGNpcmNsZSBjeD0iODYwIiBjeT0iNDAwIiByPSIxMSIgZmlsbD0iI2E4OWVmZiIvPgogIDxjaXJjbGUgY3g9Ijg2MCIgY3k9IjQ1MCIgcj0iMTEiIGZpbGw9IiNhODllZmYiLz4KICA8Y2lyY2xlIGN4PSI4NjAiIGN5PSI1MDAiIHI9IjExIiBmaWxsPSIjYTg5ZWZmIi8+CiAgPHJlY3QgeD0iMTA4NCIgeT0iNDE0IiB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjgiLz4KCiAgPHRleHQgeD0iMjIwIiB5PSI1NTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtc2l6ZT0iMTYiIG9wYWNpdHk9IjAuNiI+S1Yg5aS077yaNCDkuKo8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1NTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtc2l6ZT0iMTYiIG9wYWNpdHk9IjAuODUiPktWIOWktO+8mjIg5LiqPC90ZXh0PgogIDx0ZXh0IHg9Ijk4MCIgeT0iNTU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjE2IiBvcGFjaXR5PSIwLjYiPktWIOWktO+8mjEg5LiqPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjU5NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1zaXplPSIxNSIgb3BhY2l0eT0iMC41NSI+S1Yg57yT5a2Y77ya5aSnIOKftiDlsI/jgIDCt+OAgOeyvuW6pu+8mumrmCDin7Yg5L2OPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjIwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjE0IiBvcGFjaXR5PSIwLjQ1Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="GQA封面" />

**一句话定义：** 分组查询注意力（Grouped Query Attention，GQA）是一种「折中型」的注意力机制——它把多个 Query（查询）头分成若干组，让同组的 Query 头共享同一套 Key/Value（键值），在几乎不掉精度的情况下，大幅减少推理时的内存占用、提升速度。

## 为什么需要它：KV 缓存的烦恼

要理解 GQA 解决了什么问题，先得知道现代大模型推理时的一个隐形负担：**KV 缓存**。

大模型生成文字时，是一个 token 一个 token 往外蹦的。每生成一个新的 token，都需要用到「之前所有 token」的 Key 和 Value（你可以把它们理解为「之前每个词的特征记录」）。为了不算重复账，模型会把这些历史 K/V 存起来复用，这就是 **KV 缓存**。

问题在于：这个缓存会**随序列长度线性增长**，而且模型有多少个注意力头，缓存就要存多少份。序列一长、头数一多，显存很快就被吃光，成为推理速度的瓶颈。于是研究者们开始琢磨：能不能少存几份 K/V？

## 三个翻译小组的故事

想象一家翻译公司，有 **8 个翻译员**（对应 8 个 Query 头），他们工作时需要查阅词典（对应 K/V）。公司有三种运营方案：

- **方案 A（MHA，多头注意力）**：每个翻译员都配一本专属词典，共 8 本。最准，但书架最挤。
- **方案 B（MQA，多查询注意力）**：8 个人共用 1 本词典。书架最省，但抢着翻页、有些词还查不到，翻译质量下降。
- **方案 C（GQA，分组查询注意力）**：把 8 个人分成 4 组，每组 2 人共用 1 本词典，共 4 本。书架省了一半，质量也基本不掉。

**GQA 就是方案 C**——介于「全独立」和「全共享」之间的中间路线。

## 在 MHA → MQA 的光谱上定位

用一组公式把三者关系说清楚。设模型有 $N$ 个 Query 头，KV 头的数量记作 $G$：

- **MHA**：$G = N$（每个 Query 头都有自己的 K/V）
- **MQA**：$G = 1$（所有 Query 头共享同一份 K/V）
- **GQA**：$1 < G < N$（Query 头分成 $G$ 组，每组共享一份 K/V）

换句话说，**GQA 是 MHA 和 MQA 之间的一个旋钮**：把 $G$ 拧到 $N$ 就是 MHA，拧到 1 就是 MQA。常见配置是把 $G$ 设为 $N$ 的某个因数（如 $N=8$ 时取 $G=4$ 或 $G=2$），让每个 KV 头被整数个 Query 头共享。

## 算一算：KV 缓存到底省了多少

来看个小例子，直观感受 GQA 的省内存效果。假设：Query 头数 $N=8$，每个头维度 $d=128$，序列长度 $L=1000$，要缓存的 K 和 V 各一份。每种方案的 KV 缓存大小（标量个数）：

- **MHA**：$8 \times 128 \times 1000 \times 2 = 2{,}048{,}000$
- **GQA（G=4）**：$4 \times 128 \times 1000 \times 2 = 1{,}024{,}000$
- **MQA（G=1）**：$1 \times 128 \times 1000 \times 2 = 256{,}000$

也就是说，**GQA（4 组）相比 MHA 直接省了一半的 KV 缓存**，组数越少省得越多。在大模型那种几十亿、上百亿参数、序列动辄几千上万的规模下，这个节省非常可观——既意味着更小的显存压力，也意味着更快的推理速度（毕竟要从显存里读取的数据变少了）。

## PyTorch 代码：GQA 长什么样

下面这段代码展示了 GQA 的核心结构。关键在于：Q 用 `n_query_heads` 组投影，而 K/V 只用 `n_kv_heads` 组投影（少于 Q 头数），然后把每个 KV 头「复制」若干次对齐到 Q 头数，再做标准注意力计算。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class GroupedQueryAttention(nn.Module):
    def __init__(self, d_model, n_query_heads, n_kv_heads):
        super().__init__()
        self.n_q_heads = n_query_heads       # Query 头数（如 8）
        self.n_kv_heads = n_kv_heads         # KV 头数（如 4，少于 Q 头数 → 省内存）
        self.head_dim = d_model // n_query_heads
        # Query 投影：输出仍是 n_q_heads 组
        self.q_proj = nn.Linear(d_model, n_query_heads * self.head_dim)
        # K/V 投影：只输出 n_kv_heads 组（这是省内存的关键）
        self.k_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
        self.v_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
        self.out_proj = nn.Linear(d_model, d_model)
        # 每个 KV 头被几个 Query 头共享
        self.n_rep = n_query_heads // n_kv_heads

    def forward(self, x):
        B, L, _ = x.shape
        # 投影并重塑：B, L, n_heads, head_dim -> B, n_heads, L, head_dim
        q = self.q_proj(x).view(B, L, self.n_q_heads, self.head_dim).transpose(1, 2)
        k = self.k_proj(x).view(B, L, self.n_kv_heads, self.head_dim).transpose(1, 2)
        v = self.v_proj(x).view(B, L, self.n_kv_heads, self.head_dim).transpose(1, 2)
        # 把 KV 头沿「头维度」复制 n_rep 次，对齐到 Q 头数（GQA 的核心操作）
        k = k.repeat_interleave(self.n_rep, dim=1)
        v = v.repeat_interleave(self.n_rep, dim=1)
        # 标准 scaled dot-product attention
        scores = (q @ k.transpose(-2, -1)) / (self.head_dim ** 0.5)
        attn = F.softmax(scores, dim=-1)
        out = attn @ v                       # B, n_q_heads, L, head_dim
        out = out.transpose(1, 2).reshape(B, L, -1)
        return self.out_proj(out)
```

## 完整代码

把上面的模块拼起来，跑一个最小例子和一次反向传播：

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

class GroupedQueryAttention(nn.Module):
    def __init__(self, d_model, n_query_heads, n_kv_heads):
        super().__init__()
        self.n_q_heads = n_query_heads
        self.n_kv_heads = n_kv_heads
        self.head_dim = d_model // n_query_heads
        self.q_proj = nn.Linear(d_model, n_query_heads * self.head_dim)
        self.k_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
        self.v_proj = nn.Linear(d_model, n_kv_heads * self.head_dim)
        self.out_proj = nn.Linear(d_model, d_model)
        self.n_rep = n_query_heads // n_kv_heads

    def forward(self, x):
        B, L, _ = x.shape
        q = self.q_proj(x).view(B, L, self.n_q_heads, self.head_dim).transpose(1, 2)
        k = self.k_proj(x).view(B, L, self.n_kv_heads, self.head_dim).transpose(1, 2)
        v = self.v_proj(x).view(B, L, self.n_kv_heads, self.head_dim).transpose(1, 2)
        # KV 头复制对齐 Q 头（GQA 的核心：同组 Q 头共享同一份 KV）
        k = k.repeat_interleave(self.n_rep, dim=1)
        v = v.repeat_interleave(self.n_rep, dim=1)
        scores = (q @ k.transpose(-2, -1)) / (self.head_dim ** 0.5)
        attn = F.softmax(scores, dim=-1)
        out = attn @ v
        out = out.transpose(1, 2).reshape(B, L, -1)
        return self.out_proj(out)

# 假数据：batch=2，序列长 16，模型维度 512
torch.manual_seed(0)
x = torch.randn(2, 16, 512)

# 8 个 Query 头，4 个 KV 头（每个 KV 头被 2 个 Q 头共享）
gqa = GroupedQueryAttention(d_model=512, n_query_heads=8, n_kv_heads=4)
out = gqa(x)
print(out.shape)   # torch.Size([2, 16, 512])

# 训练一步：用 MSE 损失跑一次反向传播
target = torch.randn_like(out)
loss = F.mse_loss(out, target)
loss.backward()
print(f"loss: {loss.item():.4f}")
```

> 小提示：实际推理引擎（如 vLLM、TensorRT-LLM）会做更聪明的优化——不真的复制 KV 头，而是让多个 Q 头直接指向同一块 KV 内存，这样连「复制」的开销都省了。上面的 `repeat_interleave` 只是教学写法，便于理解「分组共享」这件事。

## 为什么它成了主流

GQA 最早由 Google 研究团队在 2023 年的论文《GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints》中正式提出。论文里还给出了一个实用技巧：可以从一个已经训练好的 MHA 模型出发，把部分 KV 头合并、再少量微调，就能得到一个 GQA 模型——不需要从头训练。

正是因为「精度几乎不掉 + 推理明显更快」这个甜点，GQA 迅速被主流大模型采纳：

- **Llama 2（70B）、Llama 3 全系列**
- **Mistral 7B / Mixtral**
- **Phi-3、Gemini** 等

可以说，**今天你叫得出名字的新一代大模型，几乎都用 GQA**。它和「注意力机制」本身一样，已经成为现代 LLM 的标配组件。

## 小结

一句话浓缩：**GQA 让多个 Query 头「拼团」共享同一套 K/V，在 MHA 的精度和 MQA 的速度之间找到了一个几乎不丢精度的甜点位置，从而大幅削减 KV 缓存、提升推理效率。**

## 参考资料

1. GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints - Ainslie et al., 2023
   https://arxiv.org/abs/2305.13245
2. Grouped-Query Attention (GQA) - Sebastian Raschka, LLMs-from-Scratch
   https://sebastianraschka.com/llms-from-scratch/ch04/04_gqa/
3. What is Grouped Query Attention (GQA)? - IBM Think
   https://www.ibm.com/think/topics/grouped-query-attention
