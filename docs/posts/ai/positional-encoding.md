---
title: 位置编码是什么
date: 2026-08-12 14:10
tags: [AI]
excerpt: Transformer 的自注意力天生对词序无感——把句子打乱算出来都一样。位置编码用一组不同频率的正弦/余弦波，给序列里每个位置打上独一无二的向量指纹，再叠加到词向量上，让模型既知道「这是什么词」，又知道「它在第几个位置」，从而分得清「我打你」和「你打我」。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZm9udC1mYW1pbHk9InVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E4OWJmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjAuNSIgY3k9IjAuNCIgcj0iMC42Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAuMjUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjZ2xvdykiLz4KCiAgPCEtLSBUaHJlZSBsYXllcmVkIHNpbmUgd2F2ZXMgb2YgZGlmZmVyZW50IGZyZXF1ZW5jaWVzOiB0aGUgdmlzdWFsIG1ldGFwaG9yIGZvciBwb3NpdGlvbmFsIGVuY29kaW5nIC0tPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI5MS44IDE1MCAzMDUuMCAxNzUgMjkxLjggMjAwIDI2MC4wIDIyNSAyMjguMiAyNTAgMjE1LjAgMjc1IDIyOC4yIDMwMCAyNjAuMCAzMjUgMjkxLjggMzUwIDMwNS4wIDM3NSAyOTEuOCA0MDAgMjYwLjAgNDI1IDIyOC4yIDQ1MCAyMTUuMCA0NzUgMjI4LjIgNTAwIDI2MC4wIDUyNSAyOTEuOCA1NTAgMzA1LjAgNTc1IDI5MS44IDYwMCAyNjAuMCA2MjUgMjI4LjIgNjUwIDIxNS4wIDY3NSAyMjguMiA3MDAgMjYwLjAgNzI1IDI5MS44IDc1MCAzMDUuMCA3NzUgMjkxLjggODAwIDI2MC4wIDgyNSAyMjguMiA4NTAgMjE1LjAgODc1IDIyOC4yIDkwMCAyNjAuMCA5MjUgMjkxLjggOTUwIDMwNS4wIDk3NSAyOTEuOCAxMDAwIDI2MC4wIDEwMjUgMjI4LjIgMTA1MCAyMTUuMCAxMDc1IDIyOC4yIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjU1Ii8+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI3My45IDE1MCAyODYuNSAxNzUgMjk2LjQgMjAwIDMwMi44IDIyNSAzMDUuMCAyNTAgMzAyLjggMjc1IDI5Ni40IDMwMCAyODYuNSAzMjUgMjczLjkgMzUwIDI2MC4wIDM3NSAyNDYuMSA0MDAgMjMzLjUgNDI1IDIyMy42IDQ1MCAyMTcuMiA0NzUgMjE1LjAgNTAwIDIxNy4yIDUyNSAyMjMuNiA1NTAgMjMzLjUgNTc1IDI0Ni4xIDYwMCAyNjAuMCA2MjUgMjczLjkgNjUwIDI4Ni41IDY3NSAyOTYuNCA3MDAgMzAyLjggNzI1IDMwNS4wIDc1MCAzMDIuOCA3NzUgMjk2LjQgODAwIDI4Ni41IDgyNSAyNzMuOSA4NTAgMjYwLjAgODc1IDI0Ni4xIDkwMCAyMzMuNSA5MjUgMjIzLjYgOTUwIDIxNy4yIDk3NSAyMTUuMCAxMDAwIDIxNy4yIDEwMjUgMjIzLjYgMTA1MCAyMzMuNSAxMDc1IDI0Ni4xIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjc1Ii8+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI2Ny4wIDE1MCAyNzMuOSAxNzUgMjgwLjQgMjAwIDI4Ni41IDIyNSAyOTEuOCAyNTAgMjk2LjQgMjc1IDMwMC4xIDMwMCAzMDIuOCAzMjUgMzA0LjQgMzUwIDMwNS4wIDM3NSAzMDQuNCA0MDAgMzAyLjggNDI1IDMwMC4xIDQ1MCAyOTYuNCA0NzUgMjkxLjggNTAwIDI4Ni41IDUyNSAyODAuNCA1NTAgMjczLjkgNTc1IDI2Ny4wIDYwMCAyNjAuMCA2MjUgMjUzLjAgNjUwIDI0Ni4xIDY3NSAyMzkuNiA3MDAgMjMzLjUgNzI1IDIyOC4yIDc1MCAyMjMuNiA3NzUgMjE5LjkgODAwIDIxNy4yIDgyNSAyMTUuNiA4NTAgMjE1LjAgODc1IDIxNS42IDkwMCAyMTcuMiA5MjUgMjE5LjkgOTUwIDIyMy42IDk3NSAyMjguMiAxMDAwIDIzMy41IDEwMjUgMjM5LjYgMTA1MCAyNDYuMSAxMDc1IDI1My4wIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIxIi8+CiAgPC9nPgoKICA8IS0tIFBvc2l0aW9uIG1hcmtlcnMgYWxvbmcgdGhlIGF4aXM6IGVhY2ggcG9zaXRpb24gZ2V0cyBhIHVuaXF1ZSBjb21iaW5hdGlvbiBvZiB3YXZlIGhlaWdodHMgLS0+CiAgPGcgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiPgogICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIyNjAiIHI9IjkiLz4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjI2MCIgcj0iOSIvPgogICAgPGNpcmNsZSBjeD0iODAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgICA8Y2lyY2xlIGN4PSIxMDAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgPC9nPgoKICA8IS0tIFRpdGxlIGJsb2NrIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9Ijg2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNCI+5L2N572u57yW56CBPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjMwIiBvcGFjaXR5PSIwLjkiIGxldHRlci1zcGFjaW5nPSIyIj5Qb3NpdGlvbmFsIEVuY29kaW5nPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjIyIiBvcGFjaXR5PSIwLjgiIGxldHRlci1zcGFjaW5nPSI2Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="位置编码封面" />


同样三个字「我、打、你」，排成「我打你」和「你打我」，意思完全反过来——前者的「我」是动手的人，后者的「我」是挨打的人。两个句子词一样，区别只在顺序。可是 Transformer 的核心机制——自注意力（self-attention）——天生是个「顺序盲」：它只看每个词和其他词的相似度，把整句话的词序打乱后再算，结果居然一模一样。要让模型分清「我打你」和「你打我」，必须额外告诉它「这是第几个词」。这份「位置说明书」就是**位置编码（Positional Encoding，简称 PE）**。

## 一句话定义

位置编码是给序列里每个位置生成的一个独特向量，**和词嵌入（embedding）维度相同，逐位相加**，让模型在拿到「这是什么词」的同时也拿到「它在第几个位置」。

## 为什么必须要有它

Transformer 抛弃了 RNN 的「按时间一步步走」的结构，改成所有词并行计算。好处是快，代价是丢了顺序信息。如果你把「我 打 你」喂进去，模型看到的是三个孤立的词向量，没有任何信号告诉它「我」在「打」之前。所以必须在 embedding 上再叠加一份编码，把顺序信息重新注入回去。

> 类比：embedding 像「身份证」写清你是谁，位置编码像「座位号」写清你坐第几排。两个加起来，模型才知道「这个人是谁、坐在哪里」。

## 核心公式（原论文的正余弦方案）

《Attention Is All You Need》给出的位置编码，用一组正弦和余弦函数生成：

$$
PE_{(pos,\,2i)} \;=\; \sin\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

$$
PE_{(pos,\,2i+1)} \;=\; \cos\!\left(\frac{pos}{10000^{2i/d_{model}}}\right)
$$

**逐符号解读**：

- `pos`：这个词在句子里的位置（从 0 开始数）。第 0 个词、第 1 个词、第 2 个词……
- `i`：编码向量里的维度下标，取值 `0, 1, …, d_model/2 - 1`。每一对维度共用同一个频率。
- `2i` 和 `2i+1`：偶数维度填 sin，奇数维度填 cos——**两两配对**，一对里一个是正弦、一个是余弦。
- `d_model`：embedding 的总维度（Transformer base 模型里是 512）。
- `10000`：一个大底数，让不同维度的「波长」从极短到极长均匀铺开。

**直觉**：想象用一组转速不同的指针给时刻打标签——秒针转得飞快，相邻两秒就差很多；时针转得慢，几个小时才走完一圈。把秒针、分针、时针的角度一起读出来，每个时刻的组合都独一无二。位置编码干的就是这件事：**低维度频率高（像秒针），负责把相邻位置拉开；高维度频率低（像时针），负责让远处也保持区分度**。所有维度叠在一起，每个位置就拿到一个独一无二的「指纹向量」。

> 另一个常用类比是二进制：`000, 001, 010, 011`……低位变化最快、高位变化最慢。正余弦位置编码本质是这个想法的「连续平滑版」，不会因为位置溢出而突变。

## 手算一个小例子

取 `d_model = 4`（所以 `i ∈ {0, 1}`），算前三个位置的编码。

先算分母 `10000^{2i/d_model}`：

- `i=0`：`10000^{0/4} = 1`
- `i=1`：`10000^{2/4} = 100`

代入公式（弧度制）：

| pos | PE(pos,0) = sin(pos/1) | PE(pos,1) = cos(pos/1) | PE(pos,2) = sin(pos/100) | PE(pos,3) = cos(pos/100) | 编码向量 |
|-----|------------------------|------------------------|--------------------------|--------------------------|----------|
| 0   | sin(0) = **0**         | cos(0) = **1**         | sin(0) = **0**           | cos(0) = **1**           | \[0, 1, 0, 1\] |
| 1   | sin(1) ≈ **0.841**     | cos(1) ≈ **0.540**     | sin(0.01) ≈ **0.010**    | cos(0.01) ≈ **1.000**    | \[0.841, 0.540, 0.010, 1.000\] |
| 2   | sin(2) ≈ **0.909**     | cos(2) ≈ **-0.416**    | sin(0.02) ≈ **0.020**    | cos(0.02) ≈ **1.000**    | \[0.909, -0.416, 0.020, 1.000\] |

**自检观察**：

- 前两维（高频，分母=1）随 pos 变化剧烈：0→0.841→0.909，cos 甚至已经从正变负。
- 后两维（低频，分母=100）变化极慢：0→0.010→0.020，几乎贴着 0 不动。
- 三行向量互不相同——每个位置拿到了独属于自己的「指纹」，目的达到。

## 怎么用：和 embedding 相加

拿到 PE 后做的事就一件——**逐位相加**：

$$
x_{final} = embedding(word) + PE(pos)
$$

为什么不拼接（concat）而要相加？拼接会让向量维度翻倍，参数和计算都涨；而高维空间里两个向量相加，相当于把「身份信息」和「座位信息」叠加到同一组维度上，后面的线性层（`nn.Linear`）完全学得会把它俩分出来读。

## PyTorch 实现

逐行对应公式的实现：

```python
import math
import torch
import torch.nn as nn

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        # 预分配 (max_len, d_model) 矩阵，准备逐格填 sin/cos
        pe = torch.zeros(max_len, d_model)
        # pos 列向量：(max_len, 1)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        # 计算 10000^(2i/d_model)。用 exp(log(...)) 写法，数值上比直接 pow 更稳定
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)  # 偶数维：sin(pos / 10000^(2i/d))
        pe[:, 1::2] = torch.cos(position * div_term)  # 奇数维：cos(pos / 10000^(2i/d))
        # 存成 buffer：不参与训练（位置编码是固定的，不需要学）
        self.register_buffer('pe', pe.unsqueeze(0))   # shape (1, max_len, d_model)

    def forward(self, x):
        # x: (batch, seq_len, d_model) —— 已经是词嵌入
        # 把对应长度的 PE 切下来，加到 embedding 上
        return x + self.pe[:, :x.size(1)]
```

几个关键点对照公式：`position * div_term` 就是 `pos / 10000^(2i/d_model)`；`pe[:, 0::2]` 和 `pe[:, 1::2]` 实现「偶数维 sin、奇数维 cos」；`register_buffer` 保证 PE 跟着模型一起搬到 GPU，但不出现在 `optimizer.parameters()` 里。

## 完整代码

复制即可跑的最小例子——含前向、训练一步、验证 PE 不参与训练：

```python
import math
import torch
import torch.nn as nn

class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_len=5000):
        super().__init__()
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(
            torch.arange(0, d_model, 2).float() * (-math.log(10000.0) / d_model)
        )
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        self.register_buffer('pe', pe.unsqueeze(0))

    def forward(self, x):
        return x + self.pe[:, :x.size(1)]


if __name__ == "__main__":
    torch.manual_seed(0)
    d_model, seq_len = 16, 5

    # 假装这是 embedding 层的输出：(batch=1, seq_len=5, d_model=16)
    x = torch.randn(1, seq_len, d_model)

    pe = PositionalEncoding(d_model)
    out = pe(x)                  # 注入位置信息
    print("输入 shape :", tuple(x.shape))
    print("输出 shape :", tuple(out.shape))
    print("PE 前 3 个位置、前 4 维：\n", pe.pe[0, :3, :4])

    # 最小训练步：PE 是 buffer，不应有梯度
    head = nn.Linear(d_model, 2)
    loss = head(out).sum()
    loss.backward()
    print("loss =", round(loss.item(), 4))
    print("PE 是否需要梯度：", pe.pe.requires_grad)   # 期望 False
```

## 还有哪些其他方案

正余弦编码只是最早的一种，现代模型有更多选择，知道有这些就够了：

- **可学习位置编码**（BERT 用）：直接开一张 `(max_len, d_model)` 的表，让模型自己学，简单有效，但序列长度被锁定。
- **相对位置编码**（T5 用）：编码「两个词之间隔多远」而不是「在第几位」，更贴近注意力本质。
- **旋转位置编码 RoPE**（LLaMA、Qwen 用）：把位置信息揉进注意力计算里的旋转操作，对长上下文友好，是目前大模型的主流选择。

## 小结

位置编码是 Transformer 拿到「顺序感」的唯一入口。它用一组**不同频率的正弦/余弦波**，给序列里每个位置打上独一无二的向量指纹，再叠加到词向量上——模型因此既知道「这是什么词」，又知道「它在第几个位置」，分得清「我打你」和「你打我」。

## 参考资料

1. Attention Is All You Need - Vaswani et al., 2017
   https://arxiv.org/abs/1706.03762
2. A Gentle Introduction to Positional Encoding in Transformer Models (Part 1) - Jason Brownlee, Machine Learning Mastery
   https://www.machinelearningmastery.com/a-gentle-introduction-to-positional-encoding-in-transformer-models-part-1/
3. The Illustrated Transformer - Jay Alammar
   https://jalammar.github.io/illustrated-transformer/
