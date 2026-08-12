---
title: Encoder-Decoder 是什么
date: 2026-08-12 14:28
tags: [AI]
excerpt: 机器翻译、文本摘要这类 Seq2Seq 任务，输入和输出都是变长序列——既要读懂源文，又要生成新句子。Encoder-Decoder 架构正是为此而生：Encoder 双向理解源序列，Decoder 自回归生成目标序列，交叉注意力是连接两座塔唯一的桥。本文用零基础视角讲透 T5 背后的双子塔结构与 Cross-Attention 的角色。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFhMWEyZSIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImVuYyIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjYTg5ZGZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZGVjIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM3Yzc0ZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNDIzNmI4Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CgogIDwhLS0gVGl0bGUgLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNTYiIGZvbnQtd2VpZ2h0PSJib2xkIj5FbmNvZGVyLURlY29kZXIg5p625p6EPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMTE4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZDRkMWZmIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCI+U2VxMlNlcSDnmoTlj4zlrZDloZTvvJrnkIbop6PkuI7nlJ/miJDnmoTliIblt6XljY/kvZw8L3RleHQ+CgogIDwhLS0gRW5jb2RlciBib3ggLS0+CiAgPHJlY3QgeD0iMTgwIiB5PSIyMzAiIHdpZHRoPSIyNjAiIGhlaWdodD0iMjAwIiByeD0iMjAiIGZpbGw9InVybCgjZW5jKSIgb3BhY2l0eT0iMC45MiIvPgogIDx0ZXh0IHg9IjMxMCIgeT0iMjE1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9ImJvbGQiPkVuY29kZXI8L3RleHQ+CiAgPCEtLSBCaWRpcmVjdGlvbmFsIGFycm93cyBpbnNpZGUgRW5jb2RlciAtLT4KICA8ZyBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgZmlsbD0iI2ZmZmZmZiI+CiAgICA8bGluZSB4MT0iMjMwIiB5MT0iMjgwIiB4Mj0iMzkwIiB5Mj0iMjgwIi8+CiAgICA8bGluZSB4MT0iMjMwIiB5MT0iMzMwIiB4Mj0iMzkwIiB5Mj0iMzMwIi8+CiAgICA8bGluZSB4MT0iMjMwIiB5MT0iMzgwIiB4Mj0iMzkwIiB5Mj0iMzgwIi8+CiAgICA8cG9seWdvbiBwb2ludHM9IjIzMCwyODAgMjQwLDI3NSAyNDAsMjg1Ii8+CiAgICA8cG9seWdvbiBwb2ludHM9IjM5MCwyODAgMzgwLDI3NSAzODAsMjg1Ii8+CiAgICA8cG9seWdvbiBwb2ludHM9IjIzMCwzMzAgMjQwLDMyNSAyNDAsMzM1Ii8+CiAgICA8cG9seWdvbiBwb2ludHM9IjM5MCwzMzAgMzgwLDMyNSAzODAsMzM1Ii8+CiAgICA8cG9seWdvbiBwb2ludHM9IjIzMCwzODAgMjQwLDM3NSAyNDAsMzg1Ii8+CiAgICA8cG9seWdvbiBwb2ludHM9IjM5MCwzODAgMzgwLDM3NSAzODAsMzg1Ii8+CiAgPC9nPgoKICA8IS0tIERlY29kZXIgYm94IC0tPgogIDxyZWN0IHg9Ijc2MCIgeT0iMjMwIiB3aWR0aD0iMjYwIiBoZWlnaHQ9IjIwMCIgcng9IjIwIiBmaWxsPSJ1cmwoI2RlYykiIG9wYWNpdHk9IjAuOTIiLz4KICA8dGV4dCB4PSI4OTAiIHk9IjIxNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSJib2xkIj5EZWNvZGVyPC90ZXh0PgogIDwhLS0gQ2F1c2FsIChsZWZ0LXRvLXJpZ2h0KSBhcnJvd3MgaW5zaWRlIERlY29kZXIgLS0+CiAgPGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9IiNmZmZmZmYiPgogICAgPGxpbmUgeDE9IjgxMCIgeTE9IjI4MCIgeDI9Ijk3MCIgeTI9IjI4MCIvPgogICAgPGxpbmUgeDE9IjgxMCIgeTE9IjMzMCIgeDI9Ijk3MCIgeTI9IjMzMCIvPgogICAgPGxpbmUgeDE9IjgxMCIgeTE9IjM4MCIgeDI9Ijk3MCIgeTI9IjM4MCIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI5NzAsMjgwIDk2MCwyNzUgOTYwLDI4NSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI5NzAsMzMwIDk2MCwzMjUgOTYwLDMzNSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI5NzAsMzgwIDk2MCwzNzUgOTYwLDM4NSIvPgogIDwvZz4KCiAgPCEtLSBDcm9zcy1hdHRlbnRpb24gYnJpZGdlOiBFbmNvZGVyIC0+IERlY29kZXIgLS0+CiAgPGcgc3Ryb2tlPSIjZmZkNTRmIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9IiNmZmQ1NGYiIHN0cm9rZS1kYXNoYXJyYXk9IjEwIDYiPgogICAgPGxpbmUgeDE9IjQ0MCIgeTE9IjI5MCIgeDI9Ijc2MCIgeTI9IjI5MCIvPgogICAgPGxpbmUgeDE9IjQ0MCIgeTE9IjMzMCIgeDI9Ijc2MCIgeTI9IjMzMCIvPgogICAgPGxpbmUgeDE9IjQ0MCIgeTE9IjM3MCIgeDI9Ijc2MCIgeTI9IjM3MCIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI3NjAsMjkwIDc1MCwyODUgNzUwLDI5NSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI3NjAsMzMwIDc1MCwzMjUgNzUwLDMzNSIvPgogICAgPHBvbHlnb24gcG9pbnRzPSI3NjAsMzcwIDc1MCwzNjUgNzUwLDM3NSIvPgogIDwvZz4KICA8dGV4dCB4PSI2MDAiIHk9IjI2NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZDU0ZiIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSJib2xkIj5Dcm9zcy1BdHRlbnRpb248L3RleHQ+CgogIDwhLS0gVG9rZW4gY2hpcHMgLS0+CiAgPGcgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFhMWEyZSI+CiAgICA8cmVjdCB4PSIyMDAiIHk9IjQ1NSIgd2lkdGg9IjIyMCIgaGVpZ2h0PSIzMiIgcng9IjE2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjg1Ii8+CiAgICA8dGV4dCB4PSIzMTAiIHk9IjQ3NiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5Y6f5paH77yaSSBsb3ZlIEFJPC90ZXh0PgoKICAgIDxyZWN0IHg9Ijc4MCIgeT0iNDU1IiB3aWR0aD0iMjIwIiBoZWlnaHQ9IjMyIiByeD0iMTYiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuODUiLz4KICAgIDx0ZXh0IHg9Ijg5MCIgeT0iNDc2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7or5HmlofvvJrmiJEg54ixIEFJPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBGb290ZXIgLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI1ODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNkNGQxZmYiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iNCI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="Encoder-Decoder封面" />

你正在用翻译软件把一句英文翻成中文：原文在前，译文在后，长度还常常不一样。要完成这件事，模型既要"读懂"源语言，又要"写出"目标语言——这两件事需要的本领并不相同。Encoder-Decoder 架构就是为这类**序列到序列（Sequence-to-Sequence，Seq2Seq）**任务设计的"双子塔"结构：一座叫 **Encoder**，负责把源序列"理解透"；一座叫 **Decoder**，负责把目标序列"生成出来"。两座塔之间用一座叫**交叉注意力（Cross-Attention）**的桥连起来。代表模型是 Google 2020 年提出的 **T5（Text-to-Text Transfer Transformer）**。

生活类比：想象一个会议室里的同声传译组合——

- **Encoder** 是那位"听得全"的助理：把整段原文听完，做出一份完整的要点笔记（双向看，前看后看都行）。
- **Decoder** 是那位"说得顺"的译员：一边开口讲译文，一边只能听到自己已经说出口的话（不能偷看未来要说的词），讲到一个词时就回头去翻助理的笔记找对应。
- **Cross-Attention** 就是译员"翻笔记"的动作——这是连接两座塔唯一的桥。

## 它要解决什么问题：Seq2Seq 任务

很多 AI 任务的输入和输出都是一段长度可变的序列，且两边长度不必相等：

- **机器翻译**：输入英文句子，输出中文句子
- **文本摘要**：输入一篇长文章，输出几句要点
- **语音识别**：输入一段音频帧序列，输出文字
- **对话生成**：输入对话历史，输出回复

这类任务有一个共同特点：**输入是"待理解的内容"，输出是"待生成的新序列"**，两个角色完全分开。Encoder-Decoder 正是为这种分工量身定做的。

## 两个主角：Encoder 与 Decoder

### Encoder：把源序列"读懂"

Encoder 由若干层堆叠而成，每层的核心是**双向自注意力（Bidirectional Self-Attention）**。意思是：源序列里的每个 token（一个词或子词）都可以**同时看到左边和右边**的所有 token，互相交换信息。

举例：处理 "I love AI" 时，"love" 这个词可以同时看到前面的 "I" 和后面的 "AI"，从而理解它在这句话里的具体含义（动词，宾语是 "AI"）。最后 Encoder 输出一组向量——叫 **memory**（记忆）——它携带了对整段源序列的完整理解，每个向量对应源序列的一个位置。

最关键的一点：Encoder 在处理源序列时是"一气呵成"的，**它本身不生成新词**，只是把理解结果打包传出去。

### Decoder：自回归地"写出来"

Decoder 也由若干层堆叠，但每层包含**三个**子层：

1. **Masked 自注意力**：Decoder 是一个 token 一个 token 往外吐的。在生成第 t 个词时，它**只能看自己已经生成的前 t-1 个词，不能偷看第 t+1 个及以后的词**。"Masked"（被遮住）指的就是把未来的位置用掩码挡住——否则训练时就等于"抄答案"，模型就废了。
2. **交叉注意力（Cross-Attention）**：这是 Decoder 与 Encoder 之间的唯一通道，下面单开一节细讲。
3. **前馈层**：对每个位置做一次独立变换，进一步加工信息。

## 交叉注意力：两座塔之间的桥

理解 Encoder-Decoder 架构的核心，就是理解这一座桥。

回忆注意力的通用公式（缩放点积形式）：

$$\text{Attention}(Q, K, V) = \text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V$$

符号逐项拆解：

- $Q$（Query，查询）：当前正在生成的位置发出的"提问"向量
- $K$（Key，钥匙）：每个被查询位置发出的"标签"向量，用来与 Query 匹配
- $V$（Value，值）：每个被查询位置发出的"内容"向量，按匹配度被取走
- $QK^T$：Query 与所有 Key 做点积，得到一组"匹配分数"
- $\sqrt{d_k}$：缩放因子，防止点积过大导致 softmax 饱和（梯度消失）
- 最外面的 softmax：把分数归一成概率（非负，和为 1）
- 最后乘 $V$：按概率对所有 Value 加权求和，得到这次注意力的输出

通俗理解：你进图书馆找书——Query 是手里的检索词，Key 是每本书书脊上的标签，匹配度越高权重越大，最后真正带走的 Value 是这些书的加权内容。

**关键差别在于 Q、K、V 从哪里来**——这正是各种注意力的区别所在：

| 注意力类型 | Query 来源 | Key / Value 来源 | 用在哪 |
|---|---|---|---|
| Encoder 自注意力 | Encoder 当前层 | Encoder 当前层（双向） | Encoder 内部 |
| Decoder 的 Masked 自注意力 | Decoder 当前层 | Decoder 当前层（被遮未来） | Decoder 内部 |
| **Cross-Attention（交叉注意力）** | **Decoder 当前层** | **Encoder 输出（memory）** | **Decoder 的第二个子层** |

也就是说，在 Cross-Attention 里：**Query 来自 Decoder 当前状态**（"我现在要生成的下一个词，需要找源文里什么信息？"），**Key 和 Value 全部来自 Encoder 的输出**（"源文每个位置都备好了标签和内容，请来查"）。这就把源语言和目标语言对齐了起来——译员一边讲译文，一边回头查助理的笔记。

对应到 PyTorch，调用 `nn.MultiheadAttention` 时把 Query 喂 `query`、把 Encoder 输出同时喂 `key` 和 `value`，就完成了这座桥：

```python
# query 来自 Decoder 当前层；key/value 来自 Encoder 输出 memory
cross_out, _ = self.cross_attn(query=x, key=memory, value=memory)
```

### 一个极小的计算示例

设 Encoder 输出有 3 个 token（即 memory 有 3 行），$d_k = 4$（所以 $\sqrt{d_k}=2$）。Decoder 当前位置的 Query 向量 $Q = [1, 0, 1, 1]$。Encoder 输出的 3 个 Key：

$$K_1=[1,1,0,0],\ K_2=[0,1,1,0],\ K_3=[0,0,1,1]$$

第一步，算 $Q$ 与每个 $K$ 的点积：

- $Q\cdot K_1 = 1\cdot1 + 0\cdot1 + 1\cdot0 + 1\cdot0 = 1$
- $Q\cdot K_2 = 1\cdot0 + 0\cdot1 + 1\cdot1 + 1\cdot0 = 1$
- $Q\cdot K_3 = 1\cdot0 + 0\cdot0 + 1\cdot1 + 1\cdot1 = 2$

第二步，除以 $\sqrt{d_k}=2$：得到 $[0.5,\ 0.5,\ 1.0]$。

第三步，softmax 归一（$\text{e}^{0.5}\approx1.65$，$\text{e}^{1.0}\approx2.72$，三者之和约 $6.02$）：

- $p_1 \approx 0.274,\ p_2 \approx 0.274,\ p_3 \approx 0.452$（和为 1，自检通过）

最后，设 Encoder 输出对应的 Value 为 $V_1=[2,0],\ V_2=[0,2],\ V_3=[1,1]$，按概率加权：

$$\text{输出} = 0.274[2,0] + 0.274[0,2] + 0.452[1,1] \approx [1.0,\ 1.0]$$

可以看到，**$Q$ 与 $K_3$ 最相关（权重最大 0.452）**，所以输出向量更偏向 $V_3$ 的方向。这就是 Cross-Attention"按相关度取源文信息"的全过程。

## 自回归生成：从 [BOS] 到 [EOS]

Decoder 不是一次性吐出整个目标序列，而是**一步一步往前生成**：

1. 输入起始符 `[BOS]`（Beginning Of Sequence），Decoder 生成第一个目标词
2. 把刚生成的词追加到输入，再喂回去，生成第二个词
3. 一直循环，直到 Decoder 输出终止符 `[EOS]`（End Of Sequence）为止

这种"用自己之前的输出作为下一步输入"的方式叫**自回归（autoregressive）**。它解释了为什么 Decoder 必须用 Masked 自注意力——生成阶段本来就没有"未来"，训练时也得制造同样的条件，否则就脱节了。

## Encoder-Only / Decoder-Only / Encoder-Decoder：三家分工

Transformer 衍生出三大家族，各自适合不同任务：

- **Encoder-Only**（如 BERT）：只保留 Encoder，每个位置都能双向看全。适合"理解型"任务——文本分类、命名实体识别、句子相似度。**没有生成能力**。
- **Decoder-Only**（如 GPT 系列、Claude、Llama）：只保留 Decoder，用 Masked 自注意力，只能从左到右生成。适合"开放式生成"——续写、对话、问答。如今主流大语言模型大多是这一家。
- **Encoder-Decoder**（如 T5、BART、原始 Transformer）：两边都保留，靠 Cross-Attention 连接。适合"有明确源输入 + 需要生成对应输出"的任务——翻译、摘要。

一句话区分：**有没有源序列要"读"，要不要"生成"新序列**。两边都要——选 Encoder-Decoder。

## T5：把所有任务统一成 text-to-text

T5（Text-to-Text Transfer Transformer）是 Encoder-Decoder 架构最知名的代表之一，Google 2020 年在论文《Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer》中提出。它做了一个非常漂亮的设计：**把所有 NLP 任务都统一成"输入文本 → 输出文本"的格式**，例如：

- 翻译：`translate English to French: Good morning` → `Bonjour`
- 摘要：`summarize: <一段长文>` → `<几句要点>`
- 分类：`cola sentence: The movie was good` → `acceptable`
- 问答：`question: ... context: ...` → `answer`

这样 Encoder-Decoder 一套架构、一次训练，就能应付五花八门的任务。T5 用 "C4"（Colossal Clean Crawled Corpus）这个大规模语料做预训练，再用下游任务微调，证明了 Encoder-Decoder 在通用 NLP 上同样能与 Decoder-Only 一较高下。

## 小结

Encoder-Decoder 是为**序列到序列任务**量身打造的架构：Encoder 用双向自注意力"读懂"源序列并打包成 memory；Decoder 用 Masked 自注意力保证生成时不偷看未来，再用**交叉注意力**这座桥去 memory 里按需取信息，从 `[BOS]` 自回归地生成到 `[EOS]`。交叉注意力是它和单塔模型最本质的区别。代表模型 T5 用 text-to-text 的统一视角，把翻译、摘要、分类、问答都装进了同一座双子塔。

## 完整代码

下面是一个最小可跑的 Encoder-Decoder 模型（T5 风格简化版），用假数据跑一次前向 + 一次训练步。代码里每一处都对应上面讲过的组件。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

# 一个最小的 Encoder-Decoder 结构（T5 风格简化版）

class MiniEncoder(nn.Module):
    def __init__(self, vocab_size, d_model):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, d_model)   # 把 token id 变成向量
        # Encoder 的自注意力：每个位置可以同时看到所有位置（双向）
        self.attn = nn.MultiheadAttention(d_model, num_heads=2, batch_first=True)
        self.ffn = nn.Linear(d_model, d_model)           # 前馈层

    def forward(self, src_ids):
        x = self.embed(src_ids)                          # [batch, src_len, d_model]
        # Q = K = V = x：双向自注意力，每个位置都能看到全句
        attn_out, _ = self.attn(x, x, x)
        x = F.layer_norm(x + attn_out)                   # 残差连接 + LayerNorm
        x = F.layer_norm(x + self.ffn(x))                # 再过一层前馈
        return x                                         # 这就是传给 Decoder 的 memory


class MiniDecoder(nn.Module):
    def __init__(self, vocab_size, d_model):
        super().__init__()
        self.embed = nn.Embedding(vocab_size, d_model)
        # 子层 1：Masked 自注意力（防止看到未来 token）
        self.self_attn = nn.MultiheadAttention(d_model, num_heads=2, batch_first=True)
        # 子层 2：交叉注意力——Q 来自 Decoder，K/V 来自 Encoder 输出
        self.cross_attn = nn.MultiheadAttention(d_model, num_heads=2, batch_first=True)
        # 子层 3：前馈层
        self.ffn = nn.Linear(d_model, d_model)
        self.head = nn.Linear(d_model, vocab_size)       # 输出层，预测下一个 token

    def forward(self, tgt_ids, memory, tgt_mask):
        x = self.embed(tgt_ids)                          # [batch, tgt_len, d_model]
        # 1) Masked 自注意力：只看当前及之前的 token
        sa_out, _ = self.self_attn(x, x, x, attn_mask=tgt_mask)
        x = F.layer_norm(x + sa_out)
        # 2) 交叉注意力：query 来自 x，key/value 来自 memory
        #    —— 这一行就是 Encoder 和 Decoder 之间的桥
        ca_out, _ = self.cross_attn(query=x, key=memory, value=memory)
        x = F.layer_norm(x + ca_out)
        # 3) 前馈层
        x = F.layer_norm(x + self.ffn(x))
        return self.head(x)                              # [batch, tgt_len, vocab_size]


# 用假数据跑一次前向 + 训练一步
torch.manual_seed(0)
vocab_size, d_model = 100, 16
enc = MiniEncoder(vocab_size, d_model)
dec = MiniDecoder(vocab_size, d_model)

src = torch.randint(0, vocab_size, (2, 6))   # batch=2，源序列长度 6（如待翻译的原文）
tgt = torch.randint(0, vocab_size, (2, 5))   # batch=2，目标序列长度 5（如翻译结果）

# causal mask：上三角填 -inf，禁止 Decoder 看未来 token
tgt_mask = torch.triu(torch.full((5, 5), float('-inf')), diagonal=1)

memory = enc(src)                            # Encoder 把源序列编码成 memory
logits = dec(tgt, memory, tgt_mask)          # Decoder 自回归地生成（这里一次前向模拟）
loss = F.cross_entropy(logits.reshape(-1, vocab_size), tgt.reshape(-1))
loss.backward()                              # 反向传播，算出所有参数的梯度
print("loss:", loss.item())                  # 一次训练一步完成
```

## 参考资料

1. Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer - Raffel et al.
   https://arxiv.org/abs/1910.10683
2. Attention Is All You Need - Vaswani et al.（原始 Transformer 论文，首次提出 Encoder-Decoder + Cross-Attention）
   https://arxiv.org/abs/1706.03762
3. The Illustrated Transformer - Jay Alammar（图解 Encoder/Decoder/Cross-Attention 的权威博客）
   https://jalammar.github.io/illustrated-transformer/
