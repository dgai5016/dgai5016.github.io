---
title: MLA 是什么
date: 2026-08-12 14:32
tags: [AI]
excerpt: 长上下文推理时，KV 缓存随长度线性膨胀，烧光显存。DeepSeek-V2 提出的多头潜注意力（MLA），把 K/V 联合压缩成一个低维潜向量缓存、用时再还原，比 GQA 压得更狠，让百万级 token 上下文成为可能。本文用大白话讲清它的压缩思路，并附公式、算例与 PyTorch 代码。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM5YjhkZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImxhdGVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2U4ZTVmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgogIDxjaXJjbGUgY3g9IjEyMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDgiLz4KICA8Y2lyY2xlIGN4PSIxMDgwIiBjeT0iNTQwIiByPSIxMjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDgiLz4KICA8Y2lyY2xlIGN4PSI5NTAiIGN5PSIxMjAiIHI9IjUwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjEiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjEwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjgiIGZvbnQtd2VpZ2h0PSI3MDAiPuWkmuWktOa9nOazqOaEj+WKmzwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgb3BhY2l0eT0iMC45IiBsZXR0ZXItc3BhY2luZz0iMiI+TUxBIMK3IE11bHRpLWhlYWQgTGF0ZW50IEF0dGVudGlvbjwvdGV4dD4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxNzAsIDI2MCkiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45NSIgcng9IjEwIi8+CiAgICA8dGV4dCB4PSI0MCIgeT0iMTM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM2M2ZmIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iNzAwIj5LPC90ZXh0PgogICAgPHJlY3QgeD0iMTAwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iMjQwIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjk1IiByeD0iMTAiLz4KICAgIDx0ZXh0IHg9IjE0MCIgeT0iMTM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM2M2ZmIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjQwIiBmb250LXdlaWdodD0iNzAwIj5WPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTgiIG9wYWNpdHk9IjAuOSI+5a6M5pW0IEsvVu+8iOWkp++8iTwvdGV4dD4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzkwLCAzNjApIj4KICAgIDxwYXRoIGQ9Ik0gMCAwIEwgODAgMCBMIDgwIC00MCBMIDEzMCAyMCBMIDgwIDgwIEwgODAgNDAgTCAwIDQwIFoiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOSIvPgogIDwvZz4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1NjAsIDMyMCkiPgogICAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMjAiIGZpbGw9InVybCgjbGF0ZW50KSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjQiIHJ4PSIxMiIvPgogICAgPHRleHQgeD0iNTAiIHk9IjYyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM2M2ZmIiBmb250LWZhbWlseT0iSGVsdmV0aWNhIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmb250LXN0eWxlPSJpdGFsaWMiPmM8L3RleHQ+CiAgICA8dGV4dCB4PSI1MCIgeT0iMTAyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNmM2M2ZmIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIEhlbHZldGljYSIgZm9udC1zaXplPSIxNiI+5r2c5ZCR6YePPC90ZXh0PgogICAgPHRleHQgeD0iNTAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTgiIG9wYWNpdHk9IjAuOTUiPuWPque8k+WtmOi/meS4qu+8iOWwj++8iTwvdGV4dD4KICA8L2c+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzAwLCAzNjApIj4KICAgIDxwYXRoIGQ9Ik0gMCAyMCBMIDUwIC00MCBMIDUwIDAgTCAxMzAgMCBMIDEzMCA0MCBMIDUwIDQwIEwgNTAgODAgWiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45Ii8+CiAgPC9nPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDg3MCwgMjYwKSI+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iMjQwIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iOCw2IiByeD0iMTAiIG9wYWNpdHk9IjAuNzUiLz4KICAgIDx0ZXh0IHg9IjQwIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iNDAiIGZvbnQtd2VpZ2h0PSI3MDAiIG9wYWNpdHk9IjAuOSI+SzwvdGV4dD4KICAgIDxyZWN0IHg9IjEwMCIgeT0iMCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjgsNiIgcng9IjEwIiBvcGFjaXR5PSIwLjc1Ii8+CiAgICA8dGV4dCB4PSIxNDAiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IkhlbHZldGljYSIgZm9udC1zaXplPSI0MCIgZm9udC13ZWlnaHQ9IjcwMCIgb3BhY2l0eT0iMC45Ij5WPC90ZXh0PgogICAgPHRleHQgeD0iOTAiIHk9IjI4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBIZWx2ZXRpY2EiIGZvbnQtc2l6ZT0iMTgiIG9wYWNpdHk9IjAuOSI+55So5pe26L+Y5Y6f77yI5oyJ6ZyA77yJPC90ZXh0PgogIDwvZz4KICA8bGluZSB4MT0iNTQwIiB5MT0iNTU1IiB4Mj0iNjYwIiB5Mj0iNTU1IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjYiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjU4NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIG9wYWNpdHk9IjAuOSIgbGV0dGVyLXNwYWNpbmc9IjYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="MLA封面" />

## 多头潜注意力（MLA）是什么

**一句话定义**：多头潜注意力（Multi-head Latent Attention，MLA）是 DeepSeek 在 DeepSeek-V2 中提出的一种注意力机制，它把推理时要缓存的 K、V 两个大矩阵**联合压缩成一个低维的"潜向量"**，需要用时再"上采样"还原成 K、V，从而把 KV 缓存压到极小。

## 为什么需要它：KV 缓存的烦恼

先说一个背景知识。LLM 在做"下一个词预测"时，对前面每一个 token 都要保留两份信息：一把**钥匙（Key，K）**和一个**数值（Value，V）**。新 token 进来时，拿自己的"问题"（Query，Q）去和所有历史 token 的 K 比对，算出注意力权重，再从 V 里取信息。

这些历史 K/V 就是所谓的 **KV 缓存（KV cache）**。它的麻烦在于：**上下文越长，要存的 K/V 越多**，且成线性增长。

举一组直观数字（DeepSeek-V2 配置）：128 个注意力头，每头维度 128，单个 token 的 K/V 就要存 `2 × 128 × 128 = 32,768` 个元素。如果上下文有 12.8 万个 token，光是 KV 缓存就要存数十亿个浮点数，显存压力极大，长文本场景下尤其吃紧。

**类比**：你在写一篇长论文，每翻一份资料就摊在桌上不收。资料越多，桌面越爆满，最后根本铺不开。KV 缓存就是这张越来越满的"桌子"。

## 前一个解法：GQA 靠"共享头"

在 MLA 之前，业界主流的省显存方案是 **分组查询注意力（Grouped-Query Attention，GQA）**，Llama 系列就采用它。

GQA 的思路：多个 Query 头**共享同一组 K/V 头**。比如 32 个 Q 头共享 8 个 K/V 头，KV 缓存直接降到原来的四分之一。

这思路有效但有限：**它只能靠"少几个头"来省，压缩比有天花板**。类比一下，相当于让几个同事共用一本字典——字典本数少了，但每本还是原封不动的厚度。

## MLA 的核心思路：低秩潜变量压缩

MLA 不走"共享头"那条路，而是换了个思路：**K/V 本身就能被压缩**。

直觉是这样的：K 和 V 都是从同一个输入向量算出来的，它们之间有大量冗余信息。既然如此，何必非要把完整 K、V 都存下来？**只存一个"浓缩精华"的潜向量 $c$ 就够了，要用时再"稀释"还原出 K/V**。

类比：与其在桌上摊 100 本厚厚的资料，不如把它们拍照扫描、压缩成一个 50 MB 的 zip 包存硬盘，要用时再解压拿出来。桌面（显存）瞬间清爽。

具体怎么做？分两步。

### 1. 下采样（压缩）：把 K/V 联合压成一个潜向量

$$c_{KV,t} = W^{DKV} \cdot h_t$$

符号逐项解读：

- $t$：token 在序列里的位置编号（第几个词），从 1 数到序列长度；本文所有带 $t$ 下标的量，都特指「第 $t$ 个 token」的那一份。
- $h_t$：第 $t$ 个 token 的输入向量（模型里流动的隐藏状态），维度很高，比如 $d_{model} = 5120$。
- $W^{DKV}$：**下采样矩阵**（"DKV" 表示 Down-projection for KV），形状是 $d_c \times d_{model}$，负责把高维压到低维。
- $c_{KV,t}$：压缩后的 **KV 潜向量**，维度 $d_c$ 远小于 $d_{model}$。

**关键**：K 和 V 共用同一个潜向量 $c_{KV,t}$，这就是"联合压缩"。

**这个 $c_{KV,t}$ 就是推理时要缓存进显存的全部内容**，替代了原本的 K 和 V 两个大矩阵。

### 2. 上采样（还原）：从潜向量重建 K 和 V

用到的时候，再用两个上采样矩阵把 $c_{KV,t}$ 分别还原成 K 和 V：

$$k_t = W^{UK} \cdot c_{KV,t}, \quad v_t = W^{UV} \cdot c_{KV,t}$$

- $W^{UK}$：把潜向量还原成 **K** 的上采样矩阵（"UK" = Up-projection for K）。
- $W^{UV}$：把潜向量还原成 **V** 的上采样矩阵（"UV" = Up-projection for V）。
- $c_{KV,t}$：上一步压好的 KV 潜向量，在这里作为还原的「原料」。
- $d_n$：每个注意力头的维度（单个头里 K/V 向量的长度）。
- $k_t$、$v_t$：重建出来的第 $t$ 个 token 的 K 和 V，喂进标准注意力公式算权重。

**通俗理解**：下采样是"打包压缩成 zip"，上采样是"解压还原"。推理时只把 zip（潜向量）存进显存，要用时才解压。

### 3. 一个聪明的优化：上采样矩阵可以"吸收"

按上面写法，每次推理似乎要先解压出 K，再算 $Q \cdot K^\top$。但 DeepSeek 团队观察到一个数学事实：**矩阵乘法可以合并**。

把 $k_t = W^{UK} c_{KV,t}$ 代入 $Q \cdot k_t^\top$，得到 $Q \cdot (W^{UK})^\top \cdot c_{KV,t}^\top$（右上角的 $^\top$ 是「转置」记号，表示把矩阵的行与列互换，这里出现是因为点积 $Q \cdot k_t^\top$ 要求维度对齐）。这意味着可以把 $W^{UK}$ 提前合并进 Q 的投影矩阵里（叫做"吸收"，absorb），**推理时根本不用真的解压出 K**，直接用潜向量 $c_{KV,t}$ 算注意力。这把上采样的算力开销也省掉了。

## 一组真实数字：压缩到底有多狠？

DeepSeek-V2 的配置（论文 3.1.2 节）：

| 参数 | 值 | 含义 |
|------|------|------|
| $n_h$ | 128 | 注意力头数 |
| $d_h$ | 128 | 每头维度 |
| $d_c$ | 512 | KV 潜向量维度 |
| $d_h^R$ | 64 | 给 RoPE 位置编码额外留的维度 |

**对比标准多头注意力（MHA）**：单个 token、单层的 KV 缓存元素数 = $2 \cdot n_h \cdot d_h = 2 \times 128 \times 128 = 32{,}768$。

**MLA**：单个 token、单层只需要缓存 $d_c + d_h^R = 512 + 64 = 576$ 个元素（潜向量 + RoPE 部分）。

**比例**：$576 / 32{,}768 \approx 1.8\%$，相当于**只剩零头**。论文官方给出的等效水平：和 GQA 只有约 2.25 个组时一样省，但模型质量反而比标准 MHA 更强。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM2MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuWOi+e8qeacieWkmueLoO+8muWNleS4qiB0b2tlbiDljZXlsYLnmoQgS1Yg57yT5a2Y5YWD57Sg5pWwPC90ZXh0PgoKICA8dGV4dCB4PSIyMDAiIHk9Ijk2IiB0ZXh0LWFuY2hvcj0ic3RhcnQiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiM5Y2EzYWYiIGZvbnQtd2VpZ2h0PSI2MDAiPk1IQe+8iOagh+WHhuWkmuWktOazqOaEj+WKm++8iTwvdGV4dD4KICA8cmVjdCB4PSIyMDAiIHk9IjExMCIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2MCIgcng9IjgiIGZpbGw9IiM5Y2EzYWYiLz4KICA8dGV4dCB4PSI2NTAiIHk9IjE0OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgZm9udC13ZWlnaHQ9IjYwMCI+MiDDlyAxMjggw5cgMTI4ID0gMzIsNzY4IOS4quWFg+e0oDwvdGV4dD4KCiAgPGxpbmUgeDE9IjExMTgiIHkxPSIxNDAiIHgyPSIxMTMwIiB5Mj0iMTQwIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIxMTMwIiB5MT0iMTEwIiB4Mj0iMTEzMCIgeTI9IjI2MCIgc3Ryb2tlPSIjZDFkNWRiIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNSA1Ii8+CgogIDx0ZXh0IHg9IjIwMCIgeT0iMjE2IiB0ZXh0LWFuY2hvcj0ic3RhcnQiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiM2YzYzZmYiIGZvbnQtd2VpZ2h0PSI2MDAiPk1MQe+8iOWkmuWktOa9nOazqOaEj+WKm++8iTwvdGV4dD4KICA8cmVjdCB4PSIyMDAiIHk9IjIzMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjYwIiByeD0iMyIgZmlsbD0iIzZjNjNmZiIvPgoKICA8bGluZSB4MT0iMjE2IiB5MT0iMjYwIiB4Mj0iMzMwIiB5Mj0iMjYwIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIzMzAiIHkxPSIyNjAiIHgyPSIzMzAiIHkyPSIyNTAiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHJlY3QgeD0iMzMwIiB5PSIyMzIiIHdpZHRoPSIzMjAiIGhlaWdodD0iNTYiIHJ4PSIxMCIgZmlsbD0iI2VlZjBmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI0OTAiIHk9IjI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZmlsbD0iIzFmMjkzNyIgZm9udC13ZWlnaHQ9IjYwMCI+NTEyICsgNjQgPSA1NzYg5Liq5YWD57SgPC90ZXh0PgogIDx0ZXh0IHg9IjQ5MCIgeT0iMjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmM2M2ZmIj7iiYggTUhBIOeahCAxLjgl77yI5Y+q5Ymp6Zu25aS077yJPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjMyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzljYTNhZiI+5ZCM5qC35LiA5LiqIHRva2VuIOS4gOWxgu+8jE1MQSDnvJPlrZjnmoTlhYPntKDmlbDlpKfnuqblj6rmnIkgTUhBIOeahCAxLzU3PC90ZXh0Pgo8L3N2Zz4K" alt="MLA 与 MHA 单 token KV 缓存元素数比例条" />

*图 1：单个 token 单层的 KV 缓存元素数对比——MHA 要 32,768 个，MLA 只需 576 个（≈ 1.8%），MLA 缓存大约只有 MHA 的 1/57。*

## 和 GQA 的核心区别

| 维度 | GQA | MLA |
|------|-----|-----|
| 省显存的招 | 多个 Q 头**共享**同一组 K/V 头 | 把 K/V **压缩**成低维潜向量，缓存潜向量 |
| 压缩上限 | 受限于头数（最多压到 1 个组 = MQA） | 受限于潜维度（可压到极小） |
| 长上下文表现 | 头共享会损失信息，长上下文受限 | 潜变量保留信息更充分，长上下文优势显著 |
| 用在哪些模型 | Llama 2/3、Qwen 等 | DeepSeek-V2、DeepSeek-V3 |

一句话：**GQA 靠"少几个头"，MLA 靠"压一维"**。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDQwMCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPkdRQSB2cyBNTEHvvJrkuKTnp43nnIEgS1Yg57yT5a2Y55qE5oCd6LevPC90ZXh0PgoKICA8bGluZSB4MT0iNjAwIiB5MT0iODAiIHgyPSI2MDAiIHkyPSIzNDAiIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI4IDciLz4KCiAgPHRleHQgeD0iMzAwIiB5PSI3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjYwMCI+R1FB77ya6Z2g44CM5YWx5Lqr5aS044CNPC90ZXh0PgogIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjE0MCIgcj0iMTYiIGZpbGw9IiNlZWYwZmYiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSIxNzAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzFmMjkzNyI+UTE8L3RleHQ+CiAgPGNpcmNsZSBjeD0iMTcwIiBjeT0iMTgwIiByPSIxNiIgZmlsbD0iI2VlZjBmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIuNSIvPgogIDx0ZXh0IHg9IjE3MCIgeT0iMTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjMWYyOTM3Ij5RMjwvdGV4dD4KICA8Y2lyY2xlIGN4PSIxNzAiIGN5PSIyMjUiIHI9IjE2IiBmaWxsPSIjZWVmMGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMi41Ii8+CiAgPHRleHQgeD0iMTcwIiB5PSIyMzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiMxZjI5MzciPlEzPC90ZXh0PgogIDxjaXJjbGUgY3g9IjE3MCIgY3k9IjI2NSIgcj0iMTYiIGZpbGw9IiNlZWYwZmYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8dGV4dCB4PSIxNzAiIHk9IjI3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzFmMjkzNyI+UTQ8L3RleHQ+CiAgPHJlY3QgeD0iMzcwIiB5PSIxNDMiIHdpZHRoPSI4MCIgaGVpZ2h0PSI0NCIgcng9IjgiIGZpbGw9IiM2YzYzZmYiLz4KICA8dGV4dCB4PSI0MTAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZmZmZiI+S1YgMTwvdGV4dD4KICA8cmVjdCB4PSIzNzAiIHk9IjIyOCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjQ0IiByeD0iOCIgZmlsbD0iI2E3OGJmYSIvPgogIDx0ZXh0IHg9IjQxMCIgeT0iMjU1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmZmZmIj5LViAyPC90ZXh0PgogIDxsaW5lIHgxPSIzNzAiIHkxPSIxNjUiIHgyPSIxODYiIHkyPSIxNDUiIHN0cm9rZT0iIzZjNjNmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPGxpbmUgeDE9IjM3MCIgeTE9IjE2NSIgeDI9IjE4NiIgeTI9IjE4MCIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8bGluZSB4MT0iMzcwIiB5MT0iMjUwIiB4Mj0iMTg2IiB5Mj0iMjI4IiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxsaW5lIHgxPSIzNzAiIHkxPSIyNTAiIHgyPSIxODYiIHkyPSIyNjUiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iMzAwIiB5PSIzMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiPuWwkeWHoOS4quWktO+8jOavj+acrOOAjOWtl+WFuOOAjei/mOaYr+WOn+WOmuW6pjwvdGV4dD4KCiAgPHRleHQgeD0iOTAwIiB5PSI3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzZjNjNmZiIgZm9udC13ZWlnaHQ9IjYwMCI+TUxB77ya6Z2g44CM5Y6L5LiA57u044CNPC90ZXh0PgogIDxyZWN0IHg9IjY4MCIgeT0iMTMwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjExMCIgcng9IjEwIiBmaWxsPSIjOWNhM2FmIi8+CiAgPHRleHQgeD0iNzQwIiB5PSIxOTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiNmZmZmZmYiPksgLyBWPC90ZXh0PgogIDx0ZXh0IHg9Ijc0MCIgeT0iMjEyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjZmZmZmZmIj7vvIjlrozmlbTpq5jnu7TvvIk8L3RleHQ+CiAgPGxpbmUgeDE9IjgwMCIgeTE9IjE4NSIgeDI9Ijg1MCIgeTI9IjE4NSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9Ijg1NiwxODUgODQ0LDE3OSA4NDQsMTkxIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iODI1IiB5PSIxNzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YzYzZmYiPuWOi+e8qTwvdGV4dD4KICA8cmVjdCB4PSI4NjAiIHk9IjE2NSIgd2lkdGg9IjU2IiBoZWlnaHQ9IjQwIiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9Ijg4OCIgeT0iMTgzIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmZmZmIj5jPC90ZXh0PgogIDx0ZXh0IHg9Ijg4OCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjExIiBmaWxsPSIjZmZmZmZmIj7mvZzlkJHph488L3RleHQ+CiAgPGxpbmUgeDE9IjkxNiIgeTE9IjE4NSIgeDI9Ijk2NiIgeTI9IjE4NSIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9Ijk3MiwxODUgOTYwLDE3OSA5NjAsMTkxIiBmaWxsPSIjYTc4YmZhIi8+CiAgPHRleHQgeD0iOTQxIiB5PSIxNzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiNhNzhiZmEiPui/mOWOnzwvdGV4dD4KICA8cmVjdCB4PSI5NzIiIHk9IjE0MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI5MCIgcng9IjEwIiBmaWxsPSJub25lIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMi41IiBzdHJva2UtZGFzaGFycmF5PSI2IDUiLz4KICA8dGV4dCB4PSIxMDMyIiB5PSIxODAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiMxZjI5MzciPksgLyBWPC90ZXh0PgogIDx0ZXh0IHg9IjEwMzIiIHk9IjIwMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzljYTNhZiI+77yI6YeN5bu677yJPC90ZXh0PgogIDx0ZXh0IHg9Ijg4OCIgeT0iMjU4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmM2M2ZmIj7lj6rnvJPlrZjov5nkuKo8L3RleHQ+CiAgPHRleHQgeD0iOTAwIiB5PSIzMjQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiPksvViDljovmiJDkvY7nu7TmvZzlkJHph4/vvIznvJPlrZjmnoHlsI88L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjMWYyOTM3Ij7kuIDlj6Xor53vvJpHUUEg6Z2g44CM5bCR5Yeg5Liq5aS044CN77yMTUxBIOmdoOOAjOWOi+S4gOe7tOOAjTwvdGV4dD4KPC9zdmc+Cg==" alt="GQA 共享头与 MLA 低秩压缩对比" />

*图 2：两种省 KV 缓存的思路对比——GQA 靠「少几个头」（多个 Q 头共享同一组 K/V 头，每本字典还是原厚度），MLA 靠「压一维」（把 K/V 压成低维潜向量，缓存极小、用时再还原）。*

## 在 AI 体系中的位置

MLA 属于**大模型注意力机制**这一支的工程优化，是对标准 MHA 和 GQA 的进一步演进。它属于"**推理时显存优化**"领域，和 Paged Attention、Flash Attention 等技术互补（一个省存储，一个省算力）。

提出方 DeepSeek 在 V2、V3 两代模型上都用 MLA，验证了它在超长上下文场景（百万级 token 上下文）下的显存优势。后续研究（如 MHA2MLA）也在探索如何把已有的 MHA 模型微调成 MLA，进一步推广这个机制。

## 一个简化的计算示例

为了看清压缩怎么发生，用一组极小的数字演示。

假设 $d_{model} = 4$，潜维度 $d_c = 2$，每头维度 $d_n = 3$，1 个头。输入 $h = [1, 0, 2, -1]$。

**下采样矩阵**（$2 \times 4$，挑出第 0、2 维）：

$$W^{DKV} = \begin{bmatrix} 1 & 0 & 0 & 0 \\ 0 & 0 & 1 & 0 \end{bmatrix}$$

压缩：

$$c_{KV} = W^{DKV} \cdot h = [1, 2]$$

原本 4 维，现在压成 2 维。

**上采样矩阵**（$3 \times 2$）：

$$W^{UK} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 1 & 1 \end{bmatrix}, \quad W^{UV} = \begin{bmatrix} 1 & 1 \\ 0 & 1 \\ 1 & 0 \end{bmatrix}$$

重建：

$$k = W^{UK} \cdot c_{KV} = [1, 2, 3], \quad v = W^{UV} \cdot c_{KV} = [3, 2, 1]$$

**自检**：原本要缓存 K、V 各 3 个元素，共 6 个浮点数；现在只缓存 $c_{KV}$ 的 2 个。压缩比 $6 / 2 = 3$ 倍。真实场景下，DeepSeek-V2 的压缩比是这个示例的几十倍。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM0MCIgZmlsbD0iI2Y4ZjlmZiIvPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuWOi+e8qeekuuS+i++8mjQg57u05Y6L5oiQIDIg57u05r2c5ZCR6YeP77yM5YaN6L+Y5Y6f5oiQIEvjgIFWPC90ZXh0PgoKICA8dGV4dCB4PSIyMzciIHk9IjExNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiI+aO+8iOi+k+WFpe+8jDQg57u077yJPC90ZXh0PgogIDxyZWN0IHg9IjEyMCIgeT0iMTMwIiB3aWR0aD0iNTQiIGhlaWdodD0iNTAiIHJ4PSI2IiBmaWxsPSIjZjNmNGY2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjE0NyIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMWYyOTM3Ij4xPC90ZXh0PgogIDxyZWN0IHg9IjE4MCIgeT0iMTMwIiB3aWR0aD0iNTQiIGhlaWdodD0iNTAiIHJ4PSI2IiBmaWxsPSIjZjNmNGY2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjIwNyIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMWYyOTM3Ij4wPC90ZXh0PgogIDxyZWN0IHg9IjI0MCIgeT0iMTMwIiB3aWR0aD0iNTQiIGhlaWdodD0iNTAiIHJ4PSI2IiBmaWxsPSIjZjNmNGY2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjI2NyIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMWYyOTM3Ij4yPC90ZXh0PgogIDxyZWN0IHg9IjMwMCIgeT0iMTMwIiB3aWR0aD0iNTQiIGhlaWdodD0iNTAiIHJ4PSI2IiBmaWxsPSIjZjNmNGY2IiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjMyNyIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjMWYyOTM3Ij4tMTwvdGV4dD4KCiAgPGxpbmUgeDE9IjM2MiIgeTE9IjE1NSIgeDI9IjQ3MCIgeTI9IjE1NSIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjQ3NiwxNTUgNDY0LDE0OSA0NjQsMTYxIiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iNDE2IiB5PSIxNDIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YzYzZmYiPldfREtWIOS4i+mHh+agtzwvdGV4dD4KCiAgPHRleHQgeD0iNTM3IiB5PSIxMTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2YzYzZmYiIGZvbnQtd2VpZ2h0PSI2MDAiPmNfS1bvvIgyIOe7tO+8jOWPque8k+WtmOWug++8iTwvdGV4dD4KICA8cmVjdCB4PSI0ODAiIHk9IjEzMCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjUwIiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPgogIDx0ZXh0IHg9IjUwNyIgeT0iMTYxIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIj4xPC90ZXh0PgogIDxyZWN0IHg9IjU0MCIgeT0iMTMwIiB3aWR0aD0iNTQiIGhlaWdodD0iNTAiIHJ4PSI2IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPHRleHQgeD0iNTY3IiB5PSIxNjEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiPjI8L3RleHQ+CgogIDxsaW5lIHgxPSI1OTYiIHkxPSIxNDgiIHgyPSI3NzQiIHkyPSI5NSIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9Ijc4MCw5MyA3NjgsODkgNzcwLDEwMSIgZmlsbD0iI2E3OGJmYSIvPgogIDx0ZXh0IHg9IjY5MCIgeT0iMTA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTc4YmZhIj5XX1VLPC90ZXh0PgoKICA8bGluZSB4MT0iNTk2IiB5MT0iMTYyIiB4Mj0iNzc0IiB5Mj0iMjI1IiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNzgwLDIyOCA3NzAsMjE4IDc2OCwyMzAiIGZpbGw9IiNhNzhiZmEiLz4KICA8dGV4dCB4PSI2OTAiIHk9IjIxNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2E3OGJmYSI+V19VVjwvdGV4dD4KCiAgPHRleHQgeD0iODY3IiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiI+a++8iDMg57u077yJPC90ZXh0PgogIDxyZWN0IHg9Ijc4MCIgeT0iNzAiIHdpZHRoPSI1NCIgaGVpZ2h0PSI0MiIgcng9IjYiIGZpbGw9IiNlZWYwZmYiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPHRleHQgeD0iODA3IiB5PSI5NyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNyIgZmlsbD0iIzFmMjkzNyI+MTwvdGV4dD4KICA8cmVjdCB4PSI4NDAiIHk9IjcwIiB3aWR0aD0iNTQiIGhlaWdodD0iNDIiIHJ4PSI2IiBmaWxsPSIjZWVmMGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9Ijg2NyIgeT0iOTciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTciIGZpbGw9IiMxZjI5MzciPjI8L3RleHQ+CiAgPHJlY3QgeD0iOTAwIiB5PSI3MCIgd2lkdGg9IjU0IiBoZWlnaHQ9IjQyIiByeD0iNiIgZmlsbD0iI2VlZjBmZiIgc3Ryb2tlPSIjYTc4YmZhIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI5MjciIHk9Ijk3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmaWxsPSIjMWYyOTM3Ij4zPC90ZXh0PgoKICA8dGV4dCB4PSI4NjciIHk9IjI5NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZiI+du+8iDMg57u077yJPC90ZXh0PgogIDxyZWN0IHg9Ijc4MCIgeT0iMjEwIiB3aWR0aD0iNTQiIGhlaWdodD0iNDIiIHJ4PSI2IiBmaWxsPSIjZWVmMGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjgwNyIgeT0iMjM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmaWxsPSIjMWYyOTM3Ij4zPC90ZXh0PgogIDxyZWN0IHg9Ijg0MCIgeT0iMjEwIiB3aWR0aD0iNTQiIGhlaWdodD0iNDIiIHJ4PSI2IiBmaWxsPSIjZWVmMGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9Ijg2NyIgeT0iMjM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmaWxsPSIjMWYyOTM3Ij4yPC90ZXh0PgogIDxyZWN0IHg9IjkwMCIgeT0iMjEwIiB3aWR0aD0iNTQiIGhlaWdodD0iNDIiIHJ4PSI2IiBmaWxsPSIjZWVmMGZmIiBzdHJva2U9IiNhNzhiZmEiIHN0cm9rZS13aWR0aD0iMiIvPgogIDx0ZXh0IHg9IjkyNyIgeT0iMjM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE3IiBmaWxsPSIjMWYyOTM3Ij4xPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjMyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzljYTNhZiI+5Y6f5pys6KaB57yT5a2YIEsgKyBWIOWFsSA2IOS4quaVsO+8jOeOsOWcqOWPque8k+WtmCBjX0tWIOeahCAyIOS4qiDihpIg5Y6L57ypIDMg5YCN77yI55yf5a6e5Zy65pmv5Yeg5Y2B5YCN77yJPC90ZXh0Pgo8L3N2Zz4K" alt="MLA 压缩还原计算示例向量流" />

*图 3：压缩示例——4 维输入 h 经下采样压成 2 维潜向量 c_KV（只缓存它），再分别上采样还原成 3 维的 k 和 v；原本要缓存 6 个数，现在只缓存 2 个。*

## PyTorch 代码示例

先看核心步骤对应的代码片段。下采样 + 上采样：

```python
import torch
import torch.nn as nn

# 下采样：把 h 压成潜向量 c_KV（对应公式 c_KV = W_DKV · h）
self.W_DKV = nn.Linear(d_model, d_c, bias=False)
c_KV = self.W_DKV(h)  # shape: (batch, seq, d_c) —— 推理时只缓存这个

# 上采样：从潜向量还原 K 和 V（对应 k = W_UK · c_KV, v = W_UV · c_KV）
self.W_UK = nn.Linear(d_c, n_heads * d_n, bias=False)
self.W_UV = nn.Linear(d_c, n_heads * d_n, bias=False)
k = self.W_UK(c_KV).view(batch, seq, n_heads, d_n)
v = self.W_UV(c_KV).view(batch, seq, n_heads, d_n)
```

标准注意力计算（K/V 重建后照常算）：

```python
# 注意力权重 = Q · K^T / sqrt(d_n)，再 softmax，再加权 V
scores = torch.einsum('bqhd,bkhd->bhqk', q, k) / (d_n ** 0.5)
attn = torch.softmax(scores, dim=-1)
out = torch.einsum('bhqk,bkhd->bqhd', attn, v)
```

## 完整代码

下面给一份可复制可跑的极简版（省略 RoPE 解耦部分，聚焦"压缩—还原"主流程）：

```python
import torch
import torch.nn as nn

class MLASimpleAttention(nn.Module):
    """MLA 的极简实现（省略 RoPE 解耦部分，只展示核心压缩-还原流程）"""
    def __init__(self, d_model=64, d_c=16, n_heads=4, d_n=16):
        super().__init__()
        self.n_heads = n_heads
        self.d_n = d_n
        # Q 路径（也可压缩，这里简化为直接投影）
        self.W_Q = nn.Linear(d_model, n_heads * d_n, bias=False)
        # KV 联合压缩：d_model -> d_c
        self.W_DKV = nn.Linear(d_model, d_c, bias=False)
        # 上采样：d_c -> K 和 V 各 n_heads * d_n
        self.W_UK = nn.Linear(d_c, n_heads * d_n, bias=False)
        self.W_UV = nn.Linear(d_c, n_heads * d_n, bias=False)
        # 输出投影
        self.W_O = nn.Linear(n_heads * d_n, d_model, bias=False)

    def forward(self, x):
        batch, seq, _ = x.shape
        # 1) 算 Q
        q = self.W_Q(x).view(batch, seq, self.n_heads, self.d_n)
        # 2) 下采样：把 x 压成潜向量 c_KV —— 推理时只缓存它
        c_KV = self.W_DKV(x)  # (batch, seq, d_c) ← KV cache 只存这个
        # 3) 上采样：从 c_KV 还原 K、V
        k = self.W_UK(c_KV).view(batch, seq, self.n_heads, self.d_n)
        v = self.W_UV(c_KV).view(batch, seq, self.n_heads, self.d_n)
        # 4) 标准注意力（为清晰起见，这里没展示"把 W_UK 吸收进 W_Q"的优化）
        scores = torch.einsum('bqhd,bkhd->bhqk', q, k) / (self.d_n ** 0.5)
        attn = torch.softmax(scores, dim=-1)
        out = torch.einsum('bhqk,bkhd->bqhd', attn, v).reshape(batch, seq, -1)
        return self.W_O(out)


# 跑一下
torch.manual_seed(0)  # 固定随机种子，结果可复现
model = MLASimpleAttention()
x = torch.randn(2, 10, 64)  # batch=2, seq=10, d_model=64
out = model(x)
print(out.shape)  # torch.Size([2, 10, 64]) —— 输入输出同形状

# 训练一步（演示反向传播能跑通）
loss = out.mean()
loss.backward()  # 反向传播，计算所有参数的梯度
print("反向传播成功，梯度已计算")
```

## 小结

MLA 的核心就一句话：**别再傻乎乎地存完整的 K 和 V，把它们压成一个低维潜向量存起来，要用时再还原**。它把"省 KV 缓存"这件事从 GQA 的"共享头"推进到了"低秩压缩"的新维度，让超长上下文成为可能，是 DeepSeek-V2/V3 的关键技术之一。

## 参考资料

1. DeepSeek-V2: A Strong, Economical, and Efficient Mixture-of-Experts Language Model - DeepSeek-AI
   https://arxiv.org/abs/2405.04434
2. Multi-Head Latent Attention (MLA) - Sebastian Raschka
   https://sebastianraschka.com/llms-from-scratch/ch04/05_mla/
3. A Gentle Introduction to Multi-Head Latent Attention (MLA) - Machine Learning Mastery
   https://machinelearningmastery.com/a-gentle-introduction-to-multi-head-latent-attention-mla/
