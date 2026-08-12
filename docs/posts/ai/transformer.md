---
title: Transformer 是什么
date: 2026-08-12 14:24
tags: [AI]
excerpt: 分词、嵌入、位置编码、注意力、FFN、残差、LayerNorm、softmax——这些零件你都单独学过了，可拼在一起是怎样一台机器？本文以《Attention Is All You Need》为蓝本，把数据流一次串清：文本→token→词向量+位置编码→堆叠 N 层（多头注意力+残差归一+FFN+残差归一）→softmax 出下一个 token 概率，并讲透 Transformer 击败 RNN/LSTM 的三大优势。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI3IiBtYXJrZXJIZWlnaHQ9IjciIG9yaWVudD0iYXV0byI+CiAgICAgIDxwYXRoIGQ9Ik0gMCAwIEwgMTAgNSBMIDAgMTAgeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPHRleHQgeD0iMTE3IiB5PSI2MCIgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPui+k+WFpTwvdGV4dD4KICA8bGluZSB4MT0iNzAiIHkxPSIxMjAiIHgyPSIxNjUiIHkyPSIxMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIgc3Ryb2tlLXdpZHRoPSIzLjUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CgogIDxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNCkiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIgc3Ryb2tlLXdpZHRoPSIzIj4KICAgIDxyZWN0IHg9IjE3MCIgeT0iODAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogICAgPHJlY3QgeD0iMTcwIiB5PSIxNjUiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogICAgPHJlY3QgeD0iMTcwIiB5PSIyNTAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogIDwvZz4KICA8Zz4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIxMTUiIHgyPSIzODAiIHkyPSIxMTUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIyMDAiIHgyPSIzODAiIHkyPSIyMDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxsaW5lIHgxPSIyMjAiIHkxPSIyODUiIHgyPSIzODAiIHkyPSIyODUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjIyMCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjMwMCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjM4MCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICA8L2c+CiAgPHRleHQgeD0iMzAwIiB5PSIzNjAiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPue8lueggeWZqCDDlyBOPC90ZXh0PgoKICA8cGF0aCBkPSJNIDQzMCAxMTUgQyA2MDAgMTE1LCA2MDAgMjAwLCA3NzAgMjAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgc3Ryb2tlLXdpZHRoPSIyLjUiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjcgNyIvPgogIDxwYXRoIGQ9Ik0gNDMwIDExNSBDIDYwMCAxMTUsIDYwMCAyODUsIDc3MCAyODUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjUpIiBzdHJva2Utd2lkdGg9IjIuNSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iNyA3Ii8+CgogIDxnIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNCkiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIgc3Ryb2tlLXdpZHRoPSIzIj4KICAgIDxyZWN0IHg9Ijc3MCIgeT0iODAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogICAgPHJlY3QgeD0iNzcwIiB5PSIxNjUiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogICAgPHJlY3QgeD0iNzcwIiB5PSIyNTAiIHdpZHRoPSIyNjAiIGhlaWdodD0iNzAiIHJ4PSIxMiIvPgogIDwvZz4KICA8Zz4KICAgIDxsaW5lIHgxPSI4MjAiIHkxPSIxMTUiIHgyPSI5MDAiIHkyPSIxMTUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjgyMCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjkwMCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9Ijk4MCIgY3k9IjExNSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxsaW5lIHgxPSI4MjAiIHkxPSIyMDAiIHgyPSI5ODAiIHkyPSIyMDAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjgyMCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjkwMCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9Ijk4MCIgY3k9IjIwMCIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxsaW5lIHgxPSI4MjAiIHkxPSIyODUiIHgyPSI5ODAiIHkyPSIyODUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjU1KSIgc3Ryb2tlLXdpZHRoPSIxLjUiLz4KICAgIDxjaXJjbGUgY3g9IjgyMCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9IjkwMCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICAgIDxjaXJjbGUgY3g9Ijk4MCIgY3k9IjI4NSIgcj0iNiIgZmlsbD0id2hpdGUiLz4KICA8L2c+CiAgPHRleHQgeD0iOTAwIiB5PSIzNjAiIGZvbnQtc2l6ZT0iMjYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuino+eggeWZqCDDlyBOPC90ZXh0PgoKICA8bGluZSB4MT0iMTAzNSIgeTE9IjEyMCIgeDI9IjExMzAiIHkyPSIxMjAiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjg1KSIgc3Ryb2tlLXdpZHRoPSIzLjUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgPHRleHQgeD0iMTA4MiIgeT0iNjAiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7ovpPlh7o8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNDc1IiBmb250LXNpemU9Ijk4IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5UcmFuc2Zvcm1lcjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjU0NSIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="Transformer 封面" />

你在手机输入法打出「今天天气」，候选栏瞬间跳出「很好」「真」「不错」。这个「猜下一个词」的小动作，背后其实藏着一台精密机器——把它做到极致，就是 ChatGPT。

前面十几篇里，我们已经一个一个拆过这台机器的零件：分词（tokenization）把文字切成 token、词嵌入（embedding）把 token 变向量、位置编码（positional encoding）告诉模型每个词在第几位、多头注意力（multi-head attention）让词与词相互「看见」、残差连接（residual connection）和层归一化（layer norm）稳住训练、softmax 把分数变成概率。这一篇，要把这些零件一次性拧在一起，看它们如何协同运转成一台完整的「下一个 token 预测机」。这就是 Transformer。

## 一句话定义与它的来历

Transformer 是 2017 年 Google 团队在论文《Attention Is All You Need》（Vaswani 等，arXiv:1706.03762）提出的一种神经网络架构。一句话：**它完全抛弃 RNN 的「按时间一步步走」的串行结构，仅靠注意力机制让序列里所有位置同时互相看见，从而可以整句并行地处理一段文本**。

论文标题那句「Attention Is All You Need」（你只需要注意力）当年相当大胆——主流的序列模型全都基于 RNN/LSTM，注意力只是辅助配件；这篇论文直接把 RNN 扔掉，宣称「光靠注意力就够」。结果一击即中：在机器翻译基准上同时拿下最高精度和最快训练速度，从此成为自然语言处理乃至整个深度学习的事实地基。今天你听过的 GPT、BERT、T5、Claude、Gemini，骨干都是 Transformer。

## 整机数据流：从一句文本到下一个 token

理解 Transformer，最好把它想成一条纵向流水线——原料（文本）从底下进，产品（下一个 token 的概率分布）从顶上出。中间是一摞结构完全相同的「加工层」。我们把流水线分四段看。

### 第 1 段：分词——文本变 token

输入「今天天气真好」并不能直接进模型。第一步先过**分词器**（tokenizer），把句子切成一个个基本单位：`["今天", "天气", "真好"]`，每个 token 再换成词表里的编号（比如「今天」=8342）。神经网络只能算数字，不能直接吃文字，所以这一步是必经的翻译关。

### 第 2 段：词嵌入 + 位置编码——token 变成「带座位号的向量」

光有编号还不够。每个 token 编号会被查表换成一个向量（叫**词嵌入**，维度记作 $d_{model}$，原文取 512），向量里藏着这个词的语义——意思相近的词，向量也靠得近。

但注意力机制有个天生缺陷：**它对词序无感**。把「我打你」和「你打我」的词打乱喂进去，注意力算出来一模一样。所以必须再叠加一份**位置编码**（positional encoding，PE）——给每个位置生成一个独特向量，告诉模型「这是第几个词」。两份向量维度相同，逐位相加：

$$X = \text{Embedding}(\text{token}) + \text{PE}(\text{pos})$$

- $X$：位置 pos 上最终送进后面所有层的输入向量（$d_{model}$ 维）。
- $\text{Embedding}(\text{token})$：查表得到的语义向量（「这个词是什么意思」）。
- $\text{PE}(\text{pos})$：位置 pos 的位置编码向量（「这个词坐在第几位」）。

算完之后，序列里每个位置都拿到一个 $d_{model}$ 维的、既含语义又含位置信息的向量。这才是后面所有层真正吃的「输入」。

### 第 3 段：N 个 Transformer 块堆叠——核心加工区

接下来是一摞结构完全相同的「Transformer 块」，原文堆 6 层（GPT-3 堆到 96 层）。**每个块做两件事，缺一不可**：

**子层 A：多头自注意力 + 残差 & 层归一化**

先把上一步的向量送进多头自注意力，让序列里每个词都去「打量」其它词、根据上下文重新混合自己的语义。这是 Transformer 理解语言的核心动作。算完之后做一次**残差连接**（把输入直接加回输出，$y = F(x) + x$）和**层归一化**（把数值拉回稳定范围）。这两个配件的作用是让深层网络也能稳定训练——堆 96 层也不会学不动。

**子层 B：前馈网络 FFN + 残差 & 层归一化**

注意力之后，每个位置再单独过一遍**前馈网络（Feed-Forward Network, FFN）**——它对每个位置独立做同样的两次线性变换、中间夹一个非线性激活。注意力负责「词与词横向交流」，FFN 负责「每个词纵向深加工」，两者互补。算完同样再做一次残差 + 层归一化。

一个块的内部就这么两步。一个块出来的向量，进下一个块再做一遍同样的两步，如此重复 N 次。每过一层，模型对句子的理解就更抽象、更深层一次。

### 第 4 段：输出层——从向量到下一个 token 的概率

N 层加工完之后，序列里每个位置都得到一个 $d_{model}$ 维的「精华向量」。预测下一个 token 时，我们只关心最后一个位置（或当前要填的那个位置）的向量：先过一个线性层，把它映射成「词表大小」维度的一组分数（每个候选词一个分，叫 logit）；再过 softmax，把分数归一成加起来等于 1 的概率分布。概率最大的那个词，就是模型预测的下一个 token。

把这一步预测的词接回原句当输入，再算一遍、再预测一个……循环往复，就能源源不断地「接龙」生成文本——这正是 GPT 的工作方式。

## 公式与计算：FFN 与整块的数据流

注意力那条公式 $\text{softmax}(QK^T/\sqrt{d_k})\,V$ 已经在《注意力机制是什么》里讲透了，这里重点看本篇新出现的 **FFN 公式**，它虽然朴素却是 Transformer 不可或缺的另一半：

$$\text{FFN}(x) = \max(0,\ x W_1 + b_1)\, W_2 + b_2$$

逐项拆解：

- $x$：某个位置经过注意力 + 残差归一后送进来的向量（$d_{model}$ 维）。
- $W_1,\ b_1$：第一层线性变换的权重和偏置。$W_1$ 把 $d_{model}$ 维**升维**到 $d_{ff}$ 维（原文 $d_{ff} = 4\,d_{model} = 2048$），让特征先「展开」。
- $\max(0,\ \cdot)$：ReLU 激活——负数清零、正数保留，引入非线性（没有它，整个 FFN 等价于一层线性变换）。
- $W_2,\ b_2$：第二层线性变换，把 $d_{ff}$ 维**降维**回 $d_{model}$，与输入同形状，方便外面的残差相加。

**直觉**：FFN 对每个位置做了一次「先展开思考、再压缩回来」的独立深加工。如果说注意力是让词之间开会交流，FFN 就是会后每个人回自己工位消化笔记。

把一个块的两段拼起来，整体数据流（原论文的 post-LN 摆法）是：

$$z_1 = \text{LayerNorm}\big(x + \text{MultiHead}(x)\big)$$

$$z_2 = \text{LayerNorm}\big(z_1 + \text{FFN}(z_1)\big)$$

下一个块把 $z_2$ 当成新的 $x$ 再来一遍。**算一个小例子**感受 FFN 的机制（只看流程，权重细节先不纠结）：设 $d_{model}=2$、$d_{ff}=3$，某个位置经过注意力层后的输入 $x = (1,\, -2)$。

| 步骤 | 计算 | 结果 |
|---|---|---|
| 第一层线性 | 升维到 3 维（假设权重算出来如此） | $h = (1,\, -2,\, 3)$ |
| ReLU | 负数清零、正数保留 | $\max(0, h) = (1,\, 0,\, 3)$ |
| 第二层线性 | 压回 2 维（假设权重算出来如此） | $(4,\, 1)$ |
| 残差相加 | 输出 + 输入 | $(4,\, 1) + (1,\, -2) = (5,\, -1)$ |
| LayerNorm | 拉回稳定范围 | 见《层归一化是什么》 |

**自检**：FFN 输出形状 (2,) 与输入 $x$ 相同 ✅，残差能正确相加 ✅；ReLU 后负数被清零，非线性生效 ✅。整条流水线里，向量的形状始终是 $d_{model}$ 维、从头到尾不变——这是 Transformer 能任意堆叠 N 层的关键设计。

## 三大优势：为什么 Transformer 击败了 RNN/LSTM

Transformer 之所以能取代统治序列建模十余年的 RNN/LSTM，靠的是三件杀手锏。

**① 全并行计算**。RNN 必须「一个词算完才能算下一个词」，因为后一步依赖前一步的隐藏状态——GPU 再强也只能干等。Transformer 的自注意力里，所有位置同时计算、互不依赖，整句话一次矩阵乘法搞定。训练时一整批、一整句同时上 GPU，效率高出几个数量级。这是大模型能在海量数据上训练的前提。

**② 长距离依赖「一步到位」**。RNN 里第 1 个词要影响第 100 个词，信号得沿时间步传 99 次，中途极易被梯度消失冲淡。Transformer 里任意两个词之间的「距离」恒为 1——无论隔多远，注意力直接算相似度、直接交换信息。论文里有个对比实验：在长句子上捕捉远距离依赖，Transformer 显著优于当时最强的 RNN/LSTM 变体。

**③ 架构通用、标准化**。同一套 Transformer 骨架，换数据、换任务都能跑——文本（GPT/BERT）、图像（ViT 把图片切成 patch 当 token）、语音、甚至蛋白质序列。一套架构吃遍天下，研究者得以把精力集中在「放大」而非「换结构」上，催生了 Scaling Law（缩放定律）和此后的大模型浪潮。

## 三大流派：编码器、解码器、编码器-解码器

原论文是「编码器 + 解码器」的双子塔结构（用于翻译这类 Seq2Seq 任务）。后来演化出三条主干路线，理解它们的分工就理解了现代大模型的版图：

- **编码器派（Encoder-only，代表 BERT）**——双向注意力，每个词能同时看到左右两侧，适合「理解」类任务：分类、阅读理解、语义检索。
- **解码器派（Decoder-only，代表 GPT 系列）**——因果注意力，每个词只能看到左边（不能偷看未来），专门用来「生成」下一段文本。ChatGPT、Claude 都走这条路。
- **编码器-解码器派（Encoder-Decoder，代表 T5、BART）**——保留原版双子塔，编码器读懂输入、解码器生成输出，适合翻译、摘要这类「输入一段、输出另一段」的任务。

三条路线用的都是上面那套 Transformer 块，差别只在注意力掩码和堆叠方式。所以本篇讲的整机数据流，是它们共同的地基。

## 小结

把前面所有零件拼起来：**文本 → 分词成 token → 词嵌入加位置编码 → 堆叠 N 层「多头自注意力 + 残差归一 + 前馈网络 FFN + 残差归一」→ 线性层 + softmax 出下一个 token 的概率**——这台机器就是 Transformer。它把 RNN 的串行换成了全并行、把长距离依赖从「传 99 步」压缩成「一步直达」、把架构统一成了跨模态通用的标准件。记住「一摞相同的加工层 + 全靠注意力」这两个意象，你就抓住了它全部的精髓。

## 完整代码

下面用一个**极简 Decoder-only Transformer**（GPT 风格）演示整条流水线：把一段假序列喂进去，看模型如何算出下一个 token 的概率。任务极小——只跑通一次前向 + 一次反向，重点是让你看到「分词编号 → embedding+PE → N 层注意力块 → 线性层出 logits → softmax 出概率」这条主线在代码里如何落地。真实 GPT 还有更多工程细节，但主干就是下面这样。

整体流程先理一遍：**造大脑（定义模型）→ 备料（造数据 + 优化器）→ 考一次（前向算分数 → softmax 出概率 → 反向更新权重）**。训练循环每一步的顺序是固定的「读（前向）→ 算误差 → 反向（求梯度）→ 更新（动权重）」，这就是「学怎么猜下一个词」的最小闭环。

```python
import torch                       # PyTorch 主库，提供张量（多维数组）运算
import torch.nn as nn              # 神经网络模块，给别名 nn，后续才能 nn.Linear
import torch.nn.functional as F    # 函数式接口（softmax、cross_entropy 等），给别名 F

# 固定随机种子，保证每次运行结果可复现（没有这行，每次 loss 都不一样）
torch.manual_seed(42)

# ===== 超参数（极小，方便 CPU 跑通） =====
vocab_size = 10    # 词表只有 10 个「词」
d_model = 16       # 每个 token 的向量维度（原文 512，这里缩小 32 倍）
n_heads = 2        # 多头注意力的头数（原文 8）
n_layers = 2       # 堆叠几层 Transformer 块（GPT-3 是 96）
seq_len = 8        # 输入序列长度

# ===== 极简 Transformer 块：多头自注意力 + FFN，各配残差与 LayerNorm =====
class TransformerBlock(nn.Module):
    def __init__(self, d_model, n_heads):
        super().__init__()
        # 子层 A：多头自注意力（nn.MultiheadAttention 内部即 softmax(QK^T/√dk) V）
        self.attn = nn.MultiheadAttention(d_model, n_heads, batch_first=True)
        self.norm1 = nn.LayerNorm(d_model)   # 第 1 个 LayerNorm
        # 子层 B：前馈网络 FFN = max(0, xW1+b1) W2 + b2（先升维 4 倍、ReLU、再降回）
        self.ffn = nn.Sequential(
            nn.Linear(d_model, d_model * 4),  # 升维到 4 倍，对应公式里的 W1
            nn.ReLU(),                         # 非线性激活 max(0, ·)
            nn.Linear(d_model * 4, d_model),   # 降回 d_model，对应公式里的 W2
        )
        self.norm2 = nn.LayerNorm(d_model)   # 第 2 个 LayerNorm

    def forward(self, x, mask):
        # 子层 A：注意力 + 残差 + LayerNorm（对应 z1 = LayerNorm(x + MHA(x))）
        attn_out, _ = self.attn(x, x, x, attn_mask=mask)  # Q=K=V=x 即「自」注意力
        x = self.norm1(x + attn_out)                        # 残差相加再归一化

        # 子层 B：FFN + 残差 + LayerNorm（对应 z2 = LayerNorm(z1 + FFN(z1))）
        ffn_out = self.ffn(x)
        x = self.norm2(x + ffn_out)                         # 残差相加再归一化
        return x

# ===== 极简 Decoder-only Transformer（GPT 风格） =====
class MiniTransformer(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, n_layers, seq_len):
        super().__init__()
        # 第 2 段：词嵌入 + 位置编码（这里用可学习的位置嵌入，原理同 PE）
        self.token_emb = nn.Embedding(vocab_size, d_model)   # token 编号 → d_model 维向量
        self.pos_emb = nn.Embedding(seq_len, d_model)        # 位置编号 → d_model 维向量
        # 第 3 段：N 层 Transformer 块（ModuleList 让多个块各自独立、参数不共享）
        self.blocks = nn.ModuleList([
            TransformerBlock(d_model, n_heads) for _ in range(n_layers)
        ])
        # 第 4 段：线性层（语言模型头），把 d_model 维向量映射回 vocab_size 个分数
        self.lm_head = nn.Linear(d_model, vocab_size)

    def forward(self, x):
        positions = torch.arange(x.size(1))               # 生成位置编号 [0, 1, ..., seq_len-1]
        h = self.token_emb(x) + self.pos_emb(positions)   # 词向量 + 位置向量（逐位相加）

        # 因果掩码：上三角填 -inf，保证第 t 个位置只能看到它左边（自回归的关键）
        mask = torch.triu(torch.full((x.size(1), x.size(1)), float('-inf')), diagonal=1)

        # 逐层过 Transformer 块（每层都套上因果掩码）
        for block in self.blocks:
            h = block(h, mask)

        # 映射回词表大小，输出每个位置对全部候选词的分数（即公式里的 z）
        return self.lm_head(h)  # 形状 (batch, seq_len, vocab_size)

# ===== 备料 + 跑一次前向 + 反向更新 =====
model = MiniTransformer(vocab_size, d_model, n_heads, n_layers, seq_len)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)  # Adam 优化器（自适应调学习率）

# 造一段假序列，任务是「前 7 个 token 预测第 2~8 个」（整体右移一位）
tokens = torch.randint(0, vocab_size, (1, seq_len))   # 随机生成一段长度 8 的 token 序列
x = tokens[:, :-1]   # 输入：第 1~7 个 token
y = tokens[:, 1:]    # 目标：第 2~8 个 token

logits = model(x)    # 前向：得到每个位置对词表所有词的分数

# 交叉熵损失：让「正确的下一个词」分数尽量高（内部已含 softmax + 负对数似然）
loss = F.cross_entropy(logits.reshape(-1, vocab_size), y.reshape(-1))
loss.backward()      # 反向传播：自动算出每个权重的梯度
optimizer.step()     # 用梯度更新权重（这就是一次「学习」）

# ===== 看模型对下一个 token 的预测分布 =====
probs = F.softmax(logits[0, -1], dim=-1)   # 取最后一个位置的 softmax 概率
print(f"loss = {loss.item():.4f}")
print("预测下一个 token 的概率分布（前 3 高）：")
for i in probs.topk(3).indices.tolist():
    print(f"  token {i}: {probs[i].item():.3f}")
```

运行会打印一次 loss 和模型对下一个 token 的概率分布——分数最大的那个就是模型当前最偏爱的猜测。把这种「读 → 算分数 → 反向更新」循环几万遍，就是真正训练一个大模型的过程。

## 参考资料

1. Attention Is All You Need - Vaswani et al., 2017（Transformer 原始论文，提出纯注意力架构与编码器-解码器双子塔）
   https://arxiv.org/abs/1706.03762
2. The Illustrated Transformer - Jay Alammar（图解经典，逐层可视化整条数据流，入门首选）
   https://jalammar.github.io/illustrated-transformer/
3. Transformer（深度学习）- 维基百科（综述三大流派与历史脉络，含扩展阅读链接）
   https://en.wikipedia.org/wiki/Transformer_(deep_learning)
