---
title: 位置编码是什么
date: 2026-08-12 14:10
tags: [AI]
excerpt: Transformer 的自注意力天生对词序无感——把句子打乱算出来都一样。位置编码用一组不同频率的正弦/余弦波，给序列里每个位置打上独一无二的向量指纹，再叠加到词向量上，让模型既知道「这是什么词」，又知道「它在第几个位置」，从而分得清「我打你」和「你打我」。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZm9udC1mYW1pbHk9InVpLXNhbnMtc2VyaWYsIHN5c3RlbS11aSwgLWFwcGxlLXN5c3RlbSwgJ1NlZ29lIFVJJywgUm9ib3RvLCBzYW5zLXNlcmlmIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E4OWJmZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iZ2xvdyIgY3g9IjAuNSIgY3k9IjAuNCIgcj0iMC42Ij4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAuMjUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZmZmZmIiBzdG9wLW9wYWNpdHk9IjAiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjZ2xvdykiLz4KCiAgPCEtLSBUaHJlZSBsYXllcmVkIHNpbmUgd2F2ZXMgb2YgZGlmZmVyZW50IGZyZXF1ZW5jaWVzOiB0aGUgdmlzdWFsIG1ldGFwaG9yIGZvciBwb3NpdGlvbmFsIGVuY29kaW5nIC0tPgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI5MS44IDE1MCAzMDUuMCAxNzUgMjkxLjggMjAwIDI2MC4wIDIyNSAyMjguMiAyNTAgMjE1LjAgMjc1IDIyOC4yIDMwMCAyNjAuMCAzMjUgMjkxLjggMzUwIDMwNS4wIDM3NSAyOTEuOCA0MDAgMjYwLjAgNDI1IDIyOC4yIDQ1MCAyMTUuMCA0NzUgMjI4LjIgNTAwIDI2MC4wIDUyNSAyOTEuOCA1NTAgMzA1LjAgNTc1IDI5MS44IDYwMCAyNjAuMCA2MjUgMjI4LjIgNjUwIDIxNS4wIDY3NSAyMjguMiA3MDAgMjYwLjAgNzI1IDI5MS44IDc1MCAzMDUuMCA3NzUgMjkxLjggODAwIDI2MC4wIDgyNSAyMjguMiA4NTAgMjE1LjAgODc1IDIyOC4yIDkwMCAyNjAuMCA5MjUgMjkxLjggOTUwIDMwNS4wIDk3NSAyOTEuOCAxMDAwIDI2MC4wIDEwMjUgMjI4LjIgMTA1MCAyMTUuMCAxMDc1IDIyOC4yIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjU1Ii8+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI3My45IDE1MCAyODYuNSAxNzUgMjk2LjQgMjAwIDMwMi44IDIyNSAzMDUuMCAyNTAgMzAyLjggMjc1IDI5Ni40IDMwMCAyODYuNSAzMjUgMjczLjkgMzUwIDI2MC4wIDM3NSAyNDYuMSA0MDAgMjMzLjUgNDI1IDIyMy42IDQ1MCAyMTcuMiA0NzUgMjE1LjAgNTAwIDIxNy4yIDUyNSAyMjMuNiA1NTAgMjMzLjUgNTc1IDI0Ni4xIDYwMCAyNjAuMCA2MjUgMjczLjkgNjUwIDI4Ni41IDY3NSAyOTYuNCA3MDAgMzAyLjggNzI1IDMwNS4wIDc1MCAzMDIuOCA3NzUgMjk2LjQgODAwIDI4Ni41IDgyNSAyNzMuOSA4NTAgMjYwLjAgODc1IDI0Ni4xIDkwMCAyMzMuNSA5MjUgMjIzLjYgOTUwIDIxNy4yIDk3NSAyMTUuMCAxMDAwIDIxNy4yIDEwMjUgMjIzLjYgMTA1MCAyMzMuNSAxMDc1IDI0Ni4xIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzIiBvcGFjaXR5PSIwLjc1Ii8+CiAgICA8cG9seWxpbmUgcG9pbnRzPSIxMDAgMjYwLjAgMTI1IDI2Ny4wIDE1MCAyNzMuOSAxNzUgMjgwLjQgMjAwIDI4Ni41IDIyNSAyOTEuOCAyNTAgMjk2LjQgMjc1IDMwMC4xIDMwMCAzMDIuOCAzMjUgMzA0LjQgMzUwIDMwNS4wIDM3NSAzMDQuNCA0MDAgMzAyLjggNDI1IDMwMC4xIDQ1MCAyOTYuNCA0NzUgMjkxLjggNTAwIDI4Ni41IDUyNSAyODAuNCA1NTAgMjczLjkgNTc1IDI2Ny4wIDYwMCAyNjAuMCA2MjUgMjUzLjAgNjUwIDI0Ni4xIDY3NSAyMzkuNiA3MDAgMjMzLjUgNzI1IDIyOC4yIDc1MCAyMjMuNiA3NzUgMjE5LjkgODAwIDIxNy4yIDgyNSAyMTUuNiA4NTAgMjE1LjAgODc1IDIxNS42IDkwMCAyMTcuMiA5MjUgMjE5LjkgOTUwIDIyMy42IDk3NSAyMjguMiAxMDAwIDIzMy41IDEwMjUgMjM5LjYgMTA1MCAyNDYuMSAxMDc1IDI1My4wIDExMDAgMjYwLjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI0IiBvcGFjaXR5PSIxIi8+CiAgPC9nPgoKICA8IS0tIFBvc2l0aW9uIG1hcmtlcnMgYWxvbmcgdGhlIGF4aXM6IGVhY2ggcG9zaXRpb24gZ2V0cyBhIHVuaXF1ZSBjb21iaW5hdGlvbiBvZiB3YXZlIGhlaWdodHMgLS0+CiAgPGcgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjNmM2M2ZmIiBzdHJva2Utd2lkdGg9IjIiPgogICAgPGNpcmNsZSBjeD0iMjAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgICA8Y2lyY2xlIGN4PSI0MDAiIGN5PSIyNjAiIHI9IjkiLz4KICAgIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjI2MCIgcj0iOSIvPgogICAgPGNpcmNsZSBjeD0iODAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgICA8Y2lyY2xlIGN4PSIxMDAwIiBjeT0iMjYwIiByPSI5Ii8+CiAgPC9nPgoKICA8IS0tIFRpdGxlIGJsb2NrIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNDYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9Ijg2IiBmb250LXdlaWdodD0iNzAwIiBsZXR0ZXItc3BhY2luZz0iNCI+5L2N572u57yW56CBPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjMwIiBvcGFjaXR5PSIwLjkiIGxldHRlci1zcGFjaW5nPSIyIj5Qb3NpdGlvbmFsIEVuY29kaW5nPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNTg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIiBmb250LXNpemU9IjIyIiBvcGFjaXR5PSIwLjgiIGxldHRlci1zcGFjaW5nPSI2Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="位置编码封面" />


同样三个字「我、打、你」，排成「我打你」和「你打我」，意思完全反过来——前者的「我」是动手的人，后者的「我」是挨打的人。两个句子词一样，区别只在顺序。可是 Transformer 的核心机制——自注意力（self-attention）——天生是个「顺序盲」：它只看每个词和其他词的相似度，把整句话的词序打乱后再算，结果居然一模一样。要让模型分清「我打你」和「你打我」，必须额外告诉它「这是第几个词」。这份「位置说明书」就是**位置编码（Positional Encoding，简称 PE）**。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM0MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyRSIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iOCIgbWFya2VySGVpZ2h0PSI4IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgIDxwYXRoIGQ9Ik0wLDAgTDEwLDUgTDAsMTAgeiIgZmlsbD0iIzZjNjNmZiIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgoKICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzNDAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+6Ieq5rOo5oSP5Yqb5piv44CM6aG65bqP55uy44CN77ya5ZCM5qC355qE6K+N5omT5Lmx6aG65bqP77yM566X5Ye655qE5YWz57O75LiN5Y+YPC90ZXh0PgoKICA8IS0tID09PT09IFJvdyAxOiDmiJEg5omTIOS9oCA9PT09PSAtLT4KICA8dGV4dCB4PSI2MCIgeT0iMTA4IiBmb250LXNpemU9IjE2IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7lj6UgQTwvdGV4dD4KICA8ZyBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDxyZWN0IHg9IjE0MCIgeT0iODAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiM2YzYzZmYiLz48dGV4dCB4PSIxODUiIHk9IjExMCIgZmlsbD0iI2ZmZmZmZiI+5oiRPC90ZXh0PgogICAgPHJlY3QgeD0iMjUwIiB5PSI4MCIgd2lkdGg9IjkwIiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2E3OGJmYSIvPjx0ZXh0IHg9IjI5NSIgeT0iMTEwIiBmaWxsPSIjZmZmZmZmIj7miZM8L3RleHQ+CiAgICA8cmVjdCB4PSIzNjAiIHk9IjgwIiB3aWR0aD0iOTAiIGhlaWdodD0iNDYiIHJ4PSI4IiBmaWxsPSIjYzRiNWZkIi8+PHRleHQgeD0iNDA1IiB5PSIxMTAiIGZpbGw9IiMxZjI5MzciPuS9oDwvdGV4dD4KICA8L2c+CiAgPHRleHQgeD0iNDc1IiB5PSIxMTAiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuKGkjwvdGV4dD4KICA8cmVjdCB4PSI1MTAiIHk9IjgwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1ODUiIHk9IjEwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzRiNTU2MyI+5rOo5oSP5Yqb6L6T5Ye6PC90ZXh0PgogIDwhLS0gc2ltaWxhcml0aWVzIGluc2lkZSAtLT4KICA8dGV4dCB4PSI3MDAiIHk9Ijk4IiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7miJHihpTmiZM6IDAuNjwvdGV4dD4KICA8dGV4dCB4PSI3MDAiIHk9IjExOCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+5omT4oaU5L2gOiAwLjc8L3RleHQ+CgogIDwhLS0gPT09PT0gUm93IDI6IOS9oCDmiZMg5oiRID09PT09IC0tPgogIDx0ZXh0IHg9IjYwIiB5PSIyMjgiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPuWPpSBCPC90ZXh0PgogIDxnIGZvbnQtc2l6ZT0iMTgiIGZvbnQtd2VpZ2h0PSI3MDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPHJlY3QgeD0iMTQwIiB5PSIyMDAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNjNGI1ZmQiLz48dGV4dCB4PSIxODUiIHk9IjIzMCIgZmlsbD0iIzFmMjkzNyI+5L2gPC90ZXh0PgogICAgPHJlY3QgeD0iMjUwIiB5PSIyMDAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiNhNzhiZmEiLz48dGV4dCB4PSIyOTUiIHk9IjIzMCIgZmlsbD0iI2ZmZmZmZiI+5omTPC90ZXh0PgogICAgPHJlY3QgeD0iMzYwIiB5PSIyMDAiIHdpZHRoPSI5MCIgaGVpZ2h0PSI0NiIgcng9IjgiIGZpbGw9IiM2YzYzZmYiLz48dGV4dCB4PSI0MDUiIHk9IjIzMCIgZmlsbD0iI2ZmZmZmZiI+5oiRPC90ZXh0PgogIDwvZz4KICA8dGV4dCB4PSI0NzUiIHk9IjIzMCIgZm9udC1zaXplPSIyMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+4oaSPC90ZXh0PgogIDxyZWN0IHg9IjUxMCIgeT0iMjAwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQ2IiByeD0iOCIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8dGV4dCB4PSI1ODUiIHk9IjIyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNSIgZmlsbD0iIzRiNTU2MyI+5rOo5oSP5Yqb6L6T5Ye6PC90ZXh0PgogIDx0ZXh0IHg9IjcwMCIgeT0iMjE4IiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7miJHihpTmiZM6IDAuNjwvdGV4dD4KICA8dGV4dCB4PSI3MDAiIHk9IjIzOCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+5omT4oaU5L2gOiAwLjc8L3RleHQ+CgogIDwhLS0gZXF1YWxzIHNpZ24gLS0+CiAgPHRleHQgeD0iOTQwIiB5PSIxNzIiIGZvbnQtc2l6ZT0iNDYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPj08L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMTU2IiBmb250LXNpemU9IjE0IiBmaWxsPSIjYjQ1NDU0IiBmb250LXdlaWdodD0iNjAwIj7nm7jkvLzluqbnn6npmLU8L3RleHQ+CiAgPHRleHQgeD0iMTAwMCIgeT0iMTc2IiBmb250LXNpemU9IjE0IiBmaWxsPSIjYjQ1NDU0IiBmb250LXdlaWdodD0iNjAwIj7lrozlhajnm7jlkIw8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iMzEwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj7ms6jmhI/lipvlj6rnnIvjgIzor43kuI7or43mnInlpJrnm7jlhbPjgI3vvIznnIvkuI3op4HosIHlnKjliY3osIHlnKjlkI7igJTigJTmiYDku6Xlv4Xpobvpop3lpJbms6jlhaXkvY3nva7kv6Hmga/jgII8L3RleHQ+Cjwvc3ZnPgo=" alt="自注意力是顺序盲" />

*图 1：「我打你」和「你打我」词一样、只是顺序不同；自注意力只看词与词有多相关，看不见谁在前谁在后，两句话算出的相似度矩阵完全相同——所以必须额外注入位置信息。*

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

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjM4MCIgZmlsbD0iI2Y4ZjlmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjM2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIzIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7kuI3lkIznu7TluqbnmoTmraPkvZnlvKblg4/kuI3lkIzovazpgJ/nmoTmjIfpkojvvJrnu4TlkIjlh7rni6zkuIDml6DkuoznmoTkvY3nva7mjIfnurk8L3RleHQ+CgogIDwhLS0gcGxvdCBhcmVhIC0tPgogIDwhLS0geC1heGlzIC0tPgogIDxsaW5lIHgxPSI4MCIgeTE9IjIwMCIgeDI9IjExMjAiIHkyPSIyMDAiIHN0cm9rZT0iIzljYTNhZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgPCEtLSB5LWF4aXMgLS0+CiAgPGxpbmUgeDE9IjgwIiB5MT0iODAiIHgyPSI4MCIgeTI9IjMyMCIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8IS0tIHkgbGFiZWxzIC0tPgogIDx0ZXh0IHg9IjcyIiB5PSI5NCIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+KzE8L3RleHQ+CiAgPHRleHQgeD0iNzIiIHk9IjIwNCIgdGV4dC1hbmNob3I9ImVuZCIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+MDwvdGV4dD4KICA8dGV4dCB4PSI3MiIgeT0iMzI0IiB0ZXh0LWFuY2hvcj0iZW5kIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7iiJIxPC90ZXh0PgogIDwhLS0gZGFzaGVkIHJlZmVyZW5jZSBsaW5lcyAtLT4KICA8bGluZSB4MT0iODAiIHkxPSI5MCIgeDI9IjExMjAiIHkyPSI5MCIgc3Ryb2tlPSIjZTVlN2ViIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1kYXNoYXJyYXk9IjQgNCIvPgogIDxsaW5lIHgxPSI4MCIgeTE9IjMxMCIgeDI9IjExMjAiIHkyPSIzMTAiIHN0cm9rZT0iI2U1ZTdlYiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtZGFzaGFycmF5PSI0IDQiLz4KCiAgPCEtLSB4IGxhYmVscyAocG9zIDAuLjEwKSAtLT4KICA8ZyBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDx0ZXh0IHg9IjgwIiB5PSIzNDAiPjA8L3RleHQ+CiAgICA8dGV4dCB4PSIyODgiIHk9IjM0MCI+MjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQ5NiIgeT0iMzQwIj40PC90ZXh0PgogICAgPHRleHQgeD0iNzA0IiB5PSIzNDAiPjY8L3RleHQ+CiAgICA8dGV4dCB4PSI5MTIiIHk9IjM0MCI+ODwvdGV4dD4KICAgIDx0ZXh0IHg9IjExMjAiIHk9IjM0MCI+MTA8L3RleHQ+CiAgPC9nPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzY0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmaWxsPSIjNmI3MjgwIj7kvY3nva4gcG9zIOKGkjwvdGV4dD4KCiAgPCEtLSBoaWdoIGZyZXEgY3VydmU6IHNpbihwb3MvMSkgLS0+CiAgPHBvbHlsaW5lIHBvaW50cz0iODAsMjAwIDE4NCwxMDggMjg4LDEwMCAzOTIsMTg1IDQ5NiwyODMgNjAwLDMwNiA3MDQsMjMxIDgwOCwxMjggOTEyLDkxIDEwMTYsMTU1IDExMjAsMjYwIiBmaWxsPSJub25lIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIvPgogIDwhLS0gbWlkIGZyZXEgY3VydmU6IHNpbihwb3MvMTApIC0tPgogIDxwb2x5bGluZSBwb2ludHM9IjgwLDIwMCAxODQsMTg5IDI4OCwxNzggMzkyLDE2NyA0OTYsMTU3IDYwMCwxNDcgNzA0LDEzOCA4MDgsMTI5IDkxMiwxMjEgMTAxNiwxMTQgMTEyMCwxMDciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2E3OGJmYSIgc3Ryb2tlLXdpZHRoPSI0Ii8+CiAgPCEtLSBsb3cgZnJlcSBjdXJ2ZTogc2luKHBvcy8xMDApIC0tPgogIDxwb2x5bGluZSBwb2ludHM9IjgwLDIwMCAxODQsMTk5IDI4OCwxOTggMzkyLDE5NyA0OTYsMTk2IDYwMCwxOTUgNzA0LDE5MyA4MDgsMTkyIDkxMiwxOTEgMTAxNiwxOTAgMTEyMCwxODkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSI0Ii8+CgogIDwhLS0gcG9zaXRpb24gZG90cyBvbiBlYWNoIGN1cnZlIGF0IHBvcz0zICh4PTM5MikgLS0+CiAgPGNpcmNsZSBjeD0iMzkyIiBjeT0iMTg1IiByPSI2IiBmaWxsPSIjNmM2M2ZmIi8+CiAgPGNpcmNsZSBjeD0iMzkyIiBjeT0iMTY3IiByPSI2IiBmaWxsPSIjYTc4YmZhIi8+CiAgPGNpcmNsZSBjeD0iMzkyIiBjeT0iMTk3IiByPSI2IiBmaWxsPSIjYzRiNWZkIi8+CiAgPCEtLSB2ZXJ0aWNhbCBndWlkZSAtLT4KICA8bGluZSB4MT0iMzkyIiB5MT0iODAiIHgyPSIzOTIiIHkyPSIyMDAiIHN0cm9rZT0iI2QxZDVkYiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjMgNSIvPgoKICA8IS0tIGxlZ2VuZCAtLT4KICA8ZyBmb250LXNpemU9IjE0Ij4KICAgIDxyZWN0IHg9IjgyMCIgeT0iNTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSI2IiBmaWxsPSIjNmM2M2ZmIi8+CiAgICA8dGV4dCB4PSI4NTAiIHk9IjY1IiBmaWxsPSIjMWYyOTM3IiBmb250LXdlaWdodD0iNjAwIj7pq5jpopHnu7TluqbvvIjlg4/np5LpkojvvIk8L3RleHQ+CiAgICA8cmVjdCB4PSI4MjAiIHk9Ijc2IiB3aWR0aD0iMjIiIGhlaWdodD0iNiIgZmlsbD0iI2E3OGJmYSIvPgogICAgPHRleHQgeD0iODUwIiB5PSI4MyIgZmlsbD0iIzFmMjkzNyIgZm9udC13ZWlnaHQ9IjYwMCI+5Lit6aKR57u05bqm77yI5YOP5YiG6ZKI77yJPC90ZXh0PgogICAgPHJlY3QgeD0iODIwIiB5PSI5NCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjYiIGZpbGw9IiNjNGI1ZmQiLz4KICAgIDx0ZXh0IHg9Ijg1MCIgeT0iMTAxIiBmaWxsPSIjMWYyOTM3IiBmb250LXdlaWdodD0iNjAwIj7kvY7popHnu7TluqbvvIjlg4/ml7bpkojvvIk8L3RleHQ+CiAgPC9nPgoKICA8dGV4dCB4PSI2MDAiIHk9IjMwNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZiNzI4MCI+6Jma57q/5aSE77yIcG9zPTPvvInkuInnp43popHnjoflkITor7vlh7rkuIDkuKrlgLzvvIznu4TlkIggKDAuMTQsIDAuMzAsIDAuMDMsIOKApikg5bCx5piv6K+l5L2N572u54us5LiA5peg5LqM55qE5oyH57q544CCPC90ZXh0Pgo8L3N2Zz4K" alt="不同频率正余弦波" />

*图 2：三种频率的正弦曲线叠在同一坐标轴上——高频维度（紫，像秒针）变化剧烈，相邻位置就差很多；低频维度（浅紫，像时针）几乎平直，负责让远处也保持区分。每个位置从所有频率各读一个值，组合成独一无二的指纹。*

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

- $x_{final}$ —— 位置 $pos$ 上最终送进后面所有层的输入向量，既含词义又含位置信息

为什么不拼接（concat）而要相加？拼接会让向量维度翻倍，参数和计算都涨；而高维空间里两个向量相加，相当于把「身份信息」和「座位信息」叠加到同一组维度上，后面的线性层（`nn.Linear`）完全学得会把它俩分出来读。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM4MCIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPgogIDxkZWZzPgogICAgPG1hcmtlciBpZD0iYXJyUyIgdmlld0JveD0iMCAwIDEwIDEwIiByZWZYPSI5IiByZWZZPSI1IiBtYXJrZXJXaWR0aD0iOCIgbWFya2VySGVpZ2h0PSI4IiBvcmllbnQ9ImF1dG8tc3RhcnQtcmV2ZXJzZSI+CiAgICAgIDxwYXRoIGQ9Ik0wLDAgTDEwLDUgTDAsMTAgeiIgZmlsbD0iIzZjNjNmZiIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgoKICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzODAiIGZpbGw9IiNmOGY5ZmYiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyMyIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+6K+N5bWM5YWlICsg5L2N572u57yW56CBID0g5bim5L2N572u5L+h5oGv55qE6K+N5ZCR6YeP77yI6YCQ5L2N55u45Yqg77yJPC90ZXh0PgoKICA8IS0tID09PT09IFJvdyAxOiBlbWJlZGRpbmcgPT09PT0gLS0+CiAgPHRleHQgeD0iNjAiIHk9IjExMiIgZm9udC1zaXplPSIxNSIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzFmMjkzNyI+6K+N5bWM5YWlPC90ZXh0PgogIDx0ZXh0IHg9IjYwIiB5PSIxMzAiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM2YjcyODAiPu+8iOi6q+S7ve+8iTwvdGV4dD4KICA8ZyBmb250LXNpemU9IjE1IiBmaWxsPSIjMWYyOTM3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDxyZWN0IHg9IjE4MCIgeT0iODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWVmMmZmIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSIyMzAiIHk9IjExMyI+4oiSMC4zPC90ZXh0PgogICAgPHJlY3QgeD0iMjkwIiB5PSI4NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiNlZWYyZmYiIHN0cm9rZT0iI2E3OGJmYSIvPjx0ZXh0IHg9IjM0MCIgeT0iMTEzIj4wLjQ8L3RleHQ+CiAgICA8cmVjdCB4PSI0MDAiIHk9Ijg0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2VlZjJmZiIgc3Ryb2tlPSIjYTc4YmZhIi8+PHRleHQgeD0iNDUwIiB5PSIxMTMiPjAuNzwvdGV4dD4KICAgIDxyZWN0IHg9IjUxMCIgeT0iODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWVmMmZmIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSI1NjAiIHk9IjExMyI+4oiSMC4yPC90ZXh0PgogICAgPHJlY3QgeD0iNjIwIiB5PSI4NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiNlZWYyZmYiIHN0cm9rZT0iI2E3OGJmYSIvPjx0ZXh0IHg9IjY3MCIgeT0iMTEzIj4wLjU8L3RleHQ+CiAgICA8cmVjdCB4PSI3MzAiIHk9Ijg0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2VlZjJmZiIgc3Ryb2tlPSIjYTc4YmZhIi8+PHRleHQgeD0iNzgwIiB5PSIxMTMiPjAuMTwvdGV4dD4KICAgIDxyZWN0IHg9Ijg0MCIgeT0iODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWVmMmZmIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSI4OTAiIHk9IjExMyI+4oiSMC42PC90ZXh0PgogICAgPHJlY3QgeD0iOTUwIiB5PSI4NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiNlZWYyZmYiIHN0cm9rZT0iI2E3OGJmYSIvPjx0ZXh0IHg9IjEwMDAiIHk9IjExMyI+MC4zPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBwbHVzIHNpZ24gLS0+CiAgPHRleHQgeD0iMTA4MCIgeT0iMTE4IiBmb250LXNpemU9IjMyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjNmM2M2ZmIj4rPC90ZXh0PgoKICA8IS0tID09PT09IFJvdyAyOiBQRSA9PT09PSAtLT4KICA8dGV4dCB4PSI2MCIgeT0iMjAyIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7kvY3nva7nvJbnoIE8L3RleHQ+CiAgPHRleHQgeD0iNjAiIHk9IjIyMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCI+77yI5bqn5L2N77yJPC90ZXh0PgogIDxnIGZvbnQtc2l6ZT0iMTUiIGZpbGw9IiMxZjI5MzciIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPHJlY3QgeD0iMTgwIiB5PSIxOTQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWRlOWZlIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSIyMzAiIHk9IjIyMyI+MC44NDwvdGV4dD4KICAgIDxyZWN0IHg9IjI5MCIgeT0iMTk0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2VkZTlmZSIgc3Ryb2tlPSIjYTc4YmZhIi8+PHRleHQgeD0iMzQwIiB5PSIyMjMiPjAuNTQ8L3RleHQ+CiAgICA8cmVjdCB4PSI0MDAiIHk9IjE5NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiNlZGU5ZmUiIHN0cm9rZT0iI2E3OGJmYSIvPjx0ZXh0IHg9IjQ1MCIgeT0iMjIzIj4wLjAxPC90ZXh0PgogICAgPHJlY3QgeD0iNTEwIiB5PSIxOTQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWRlOWZlIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSI1NjAiIHk9IjIyMyI+MS4wMDwvdGV4dD4KICAgIDxyZWN0IHg9IjYyMCIgeT0iMTk0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2VkZTlmZSIgc3Ryb2tlPSIjYTc4YmZhIi8+PHRleHQgeD0iNjcwIiB5PSIyMjMiPjAuMDA8L3RleHQ+CiAgICA8cmVjdCB4PSI3MzAiIHk9IjE5NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiNlZGU5ZmUiIHN0cm9rZT0iI2E3OGJmYSIvPjx0ZXh0IHg9Ijc4MCIgeT0iMjIzIj4xLjAwPC90ZXh0PgogICAgPHJlY3QgeD0iODQwIiB5PSIxOTQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjZWRlOWZlIiBzdHJva2U9IiNhNzhiZmEiLz48dGV4dCB4PSI4OTAiIHk9IjIyMyI+MC4wMDwvdGV4dD4KICAgIDxyZWN0IHg9Ijk1MCIgeT0iMTk0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iI2VkZTlmZSIgc3Ryb2tlPSIjYTc4YmZhIi8+PHRleHQgeD0iMTAwMCIgeT0iMjIzIj4xLjAwPC90ZXh0PgogIDwvZz4KCiAgPCEtLSBlcXVhbHMgLyBkb3duIGFycm93IC0tPgogIDx0ZXh0IHg9IjEwODAiIHk9IjIyOCIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+PTwvdGV4dD4KICA8bGluZSB4MT0iNjAwIiB5MT0iMjQ4IiB4Mj0iNjAwIiB5Mj0iMjc2IiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iMyIgbWFya2VyLWVuZD0idXJsKCNhcnJTKSIvPgoKICA8IS0tID09PT09IFJvdyAzOiBzdW0gKGZpbmFsKSA9PT09PSAtLT4KICA8dGV4dCB4PSI2MCIgeT0iMzAyIiBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7mnIDnu4jlkJHph488L3RleHQ+CiAgPHRleHQgeD0iNjAiIHk9IjMyMCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4MCI+77yI6Lqr5Lu9K+W6p+S9je+8iTwvdGV4dD4KICA8ZyBmb250LXNpemU9IjE1IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj4KICAgIDxyZWN0IHg9IjE4MCIgeT0iMjg0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPjx0ZXh0IHg9IjIzMCIgeT0iMzEzIj4wLjU0PC90ZXh0PgogICAgPHJlY3QgeD0iMjkwIiB5PSIyODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjNmM2M2ZmIi8+PHRleHQgeD0iMzQwIiB5PSIzMTMiPjAuOTQ8L3RleHQ+CiAgICA8cmVjdCB4PSI0MDAiIHk9IjI4NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiM2YzYzZmYiLz48dGV4dCB4PSI0NTAiIHk9IjMxMyI+MC43MTwvdGV4dD4KICAgIDxyZWN0IHg9IjUxMCIgeT0iMjg0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPjx0ZXh0IHg9IjU2MCIgeT0iMzEzIj4wLjgwPC90ZXh0PgogICAgPHJlY3QgeD0iNjIwIiB5PSIyODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjNmM2M2ZmIi8+PHRleHQgeD0iNjcwIiB5PSIzMTMiPjAuNTA8L3RleHQ+CiAgICA8cmVjdCB4PSI3MzAiIHk9IjI4NCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0OCIgcng9IjYiIGZpbGw9IiM2YzYzZmYiLz48dGV4dCB4PSI3ODAiIHk9IjMxMyI+MS4xMDwvdGV4dD4KICAgIDxyZWN0IHg9Ijg0MCIgeT0iMjg0IiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQ4IiByeD0iNiIgZmlsbD0iIzZjNjNmZiIvPjx0ZXh0IHg9Ijg5MCIgeT0iMzEzIj7iiJIwLjYwPC90ZXh0PgogICAgPHJlY3QgeD0iOTUwIiB5PSIyODQiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDgiIHJ4PSI2IiBmaWxsPSIjNmM2M2ZmIi8+PHRleHQgeD0iMTAwMCIgeT0iMzEzIj4xLjMwPC90ZXh0PgogIDwvZz4KCiAgPHRleHQgeD0iNjAwIiB5PSIzNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZpbGw9IiM2YjcyODAiPuS4pOWQkemHj+mAkOS9jeebuOWKoO+8iOS4jeaLvOaOpe+8ie+8jOWQjumdnuagh+WkluaAp+WxguWtpuWfs+S8muaKiuOAjOi6q+S7veOAjeWSjOOAjOW6p+S9jeOAjeWIhuWIq+ivu+WHuuadpeOAgjwvdGV4dD4KPC9zdmc+Cg==" alt="词嵌入加位置编码示意" />

*图 3：词嵌入（身份）和位置编码（座位）两个同维度向量逐位相加，得到融合了「这是什么词」和「它在第几个位置」的最终向量；不拼接是为了避免维度翻倍。*

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
