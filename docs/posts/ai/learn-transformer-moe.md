---
title: 学透 Transformer & MOE
date: 2026-08-12 14:40
tags: [AI]
excerpt: 一张从零到 MOE 的学习地图。把神经网络基础、Transformer 核心、三大架构变体、注意力进阶、混合专家这五个阶段里的 37 个概念全部串成一条线，每个概念都附一句话定位和直达单篇解读的链接——以后想学哪个知识点，从这一篇跳过去就行。
layout: post
pin: true
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM1YTUyZDYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8bGluZSB4MT0iMjAwIiB5MT0iNDcwIiB4Mj0iMTAwMCIgeTI9IjQ3MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMzUpIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjIgMTAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxnIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPgogICAgPGNpcmNsZSBjeD0iMjQwIiBjeT0iNDcwIiByPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIvPgogICAgPHRleHQgeD0iMjQwIiB5PSI0NzYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPjE8L3RleHQ+CiAgICA8dGV4dCB4PSIyNDAiIHk9IjUxNSIgZm9udC1zaXplPSIxNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIj7ln7rnoYA8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSI0MzAiIGN5PSI0NzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIi8+CiAgICA8dGV4dCB4PSI0MzAiIHk9IjQ3NiIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+MjwvdGV4dD4KICAgIDx0ZXh0IHg9IjQzMCIgeT0iNTE1IiBmb250LXNpemU9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiPlRyYW5zZm9ybWVyPC90ZXh0PgogICAgPGNpcmNsZSBjeD0iNjIwIiBjeT0iNDcwIiByPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIvPgogICAgPHRleHQgeD0iNjIwIiB5PSI0NzYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPjM8L3RleHQ+CiAgICA8dGV4dCB4PSI2MjAiIHk9IjUxNSIgZm9udC1zaXplPSIxNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIj7kuInlpKfmnrbmnoQ8L3RleHQ+CiAgICA8Y2lyY2xlIGN4PSI4MTAiIGN5PSI0NzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIi8+CiAgICA8dGV4dCB4PSI4MTAiIHk9IjQ3NiIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+NDwvdGV4dD4KICAgIDx0ZXh0IHg9IjgxMCIgeT0iNTE1IiBmb250LXNpemU9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiPuazqOaEj+WKm+i/m+mYtjwvdGV4dD4KICAgIDxjaXJjbGUgY3g9IjEwMDAiIGN5PSI0NzAiIHI9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIi8+CiAgICA8dGV4dCB4PSIxMDAwIiB5PSI0NzYiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPjU8L3RleHQ+CiAgICA8dGV4dCB4PSIxMDAwIiB5PSI1MTUiIGZvbnQtc2l6ZT0iMTUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSI+TU9FPC90ZXh0PgogIDwvZz4KICA8dGV4dCB4PSI2MDAiIHk9IjE5MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI3NCIgZm9udC13ZWlnaHQ9IjgwMCIgZmlsbD0iI2ZmZmZmZiI+5a2m6YCPIFRyYW5zZm9ybWVyICZhbXA7IE1PRTwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjI1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIiBsZXR0ZXItc3BhY2luZz0iNCI+5a2m5Lmg6Lev57q/5Zu+IMK3IDM3IOS4quamguW/teS4gOermeWvvOiIqjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjYwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjcpIiBsZXR0ZXItc3BhY2luZz0iNiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4=" alt="学透 Transformer & MOE封面" />

这篇不是又一篇概念解读，而是一张**学习地图**。

Transformer 和 MOE 不是凭空冒出来的——它们是一层一层垒起来的：先有神经网络，再有 RNN/LSTM 处理序列，然后 Transformer 用注意力一把解决串行和长距离问题，最后 MOE 在不动单次计算量的前提下把模型容量做大。这 37 个概念，就是这条路上的一块块路标。

**怎么用这张地图**：按下面的五站顺序读，能看懂"全局怎么拼"；任何时刻想深挖某一个点，点链接跳到对应的单篇解读就行。每一站前面有一句话说明"这一站在解决什么"。

## 🧭 推荐学习顺序

如果你是零基础，建议严格按这条线走（**先过一遍 <PostLink to="/posts/ai/pytorch-primer">PyTorch 极简入门</PostLink>，后面的代码才看得懂**）：

1. **打地基**：<PostLink to="/posts/ai/neural-network">神经网络</PostLink> → <PostLink to="/posts/ai/vector">向量</PostLink> → <PostLink to="/posts/ai/neuron">神经元</PostLink> → <PostLink to="/posts/ai/weights">权重</PostLink> → <PostLink to="/posts/ai/bias">偏置</PostLink> → <PostLink to="/posts/ai/forward-propagation">前向传播</PostLink> → <PostLink to="/posts/ai/activation-function">激活函数</PostLink> → <PostLink to="/posts/ai/neural-network-matrix-computation">矩阵运算</PostLink> → <PostLink to="/posts/ai/softmax">Softmax</PostLink> → <PostLink to="/posts/ai/loss-function">损失函数</PostLink> → <PostLink to="/posts/ai/cross-entropy">交叉熵</PostLink> → <PostLink to="/posts/ai/gradient-descent">梯度下降</PostLink> → <PostLink to="/posts/ai/chain-rule">链式法则</PostLink> → <PostLink to="/posts/ai/backpropagation">反向传播</PostLink> → <PostLink to="/posts/ai/optimizer">优化器</PostLink> → <PostLink to="/posts/ai/learning-rate">学习率</PostLink> → <PostLink to="/posts/ai/overfitting">过拟合</PostLink>
2. **看前人的方案**：<PostLink to="/posts/ai/rnn">RNN</PostLink> → <PostLink to="/posts/ai/lstm">LSTM</PostLink>（体会"记性短"的痛）
3. **拆 Transformer**：<PostLink to="/posts/ai/tokenization">Token 与分词</PostLink> → <PostLink to="/posts/ai/embedding">词向量</PostLink> → <PostLink to="/posts/ai/positional-encoding">位置编码</PostLink> → <PostLink to="/posts/ai/attention">注意力机制</PostLink> → <PostLink to="/posts/ai/multi-head-attention">多头注意力</PostLink> → <PostLink to="/posts/ai/residual-connection">残差连接</PostLink> → <PostLink to="/posts/ai/layer-norm">层归一化</PostLink> → <PostLink to="/posts/ai/feed-forward-network">前馈神经网络</PostLink> → <PostLink to="/posts/ai/causal-mask">因果掩码</PostLink> → **<PostLink to="/posts/ai/transformer">Transformer 整体架构（收口）</PostLink>**
4. **分清三大流派**：<PostLink to="/posts/ai/gpt">Decoder-Only/GPT</PostLink> → <PostLink to="/posts/ai/bert">Encoder-Only/BERT</PostLink> → <PostLink to="/posts/ai/encoder-decoder">Encoder-Decoder/T5</PostLink>
5. **进阶省显存**：<PostLink to="/posts/ai/gqa">GQA</PostLink> → <PostLink to="/posts/ai/mla">MLA</PostLink>
6. **以小博大**：<PostLink to="/posts/ai/moe">MOE 基础版</PostLink> → <PostLink to="/posts/ai/sparse-moe">稀疏 MOE</PostLink> → <PostLink to="/posts/ai/shared-expert-moe">共享专家</PostLink>

走完这条线，你就能从"一个神经元"一路理解到"DeepSeek 这类现代大模型为什么这么设计"。任何一步卡住，点进对应单篇深挖即可。

---

## 🧰 第零站：先认得 PyTorch

这个系列每篇文章都附 PyTorch 代码。如果你对 PyTorch 不熟，先花一刻钟过这一篇——它只教你「读懂本系列代码需要的最小够用集」：张量怎么存、形状怎么变、网络怎么搭、训练循环怎么转。不展开原理（那些系列里逐篇讲），只让你不再卡在 `.view().transpose()` 这类语法上。

- <PostLink to="/posts/ai/pytorch-primer">PyTorch 极简入门</PostLink> — 读懂本系列代码的最小够用集：张量、形状操作、nn.Module、训练循环。

---

## 🧱 第一站：神经网络基础

Transformer 再神，底层也是一个神经网络。这一站搞定"一个神经网络是怎么训出来的"——数据怎么往前算、误差怎么往后传、权重怎么一点点调好；末尾再串一下 Transformer 之前处理序列的 RNN/LSTM。这些都是后面所有内容的地基。

- <PostLink to="/posts/ai/neural-network">神经网络</PostLink> — 一大群会自我纠正权重的"数字助理"，把复杂信息压成一个判断。
- <PostLink to="/posts/ai/vector">向量</PostLink> — AI 里万物皆是一串数字：向量是什么、维度怎么数、点积为什么能衡量"像不像"（神经元、词向量、注意力都靠它）。
- <PostLink to="/posts/ai/neuron">神经元</PostLink> — 网络的最小单元：接收输入 → 加权求和 → 套激活函数。
- <PostLink to="/posts/ai/weights">权重</PostLink> — 连在每条输入上的可调数，决定这条线索"该听多少"：数越大越看重，是训练时要学的核心参数。
- <PostLink to="/posts/ai/bias">偏置</PostLink> — 神经元里的一个可调常数，像"默认倾向"，决定神经元有多容易被激活——和权重一样是训练时要学的参数。
- <PostLink to="/posts/ai/forward-propagation">前向传播</PostLink> — 数据从输入层一路算到输出层、得到预测的过程。
- <PostLink to="/posts/ai/activation-function">激活函数</PostLink> — 给网络装上"非线性"，否则再深的网络也等价于一条直线（重点讲 ReLU）。
- <PostLink to="/posts/ai/neural-network-matrix-computation">矩阵运算</PostLink> — 神经网络里那些矩阵相乘，到底在算什么、形状怎么对上。
- <PostLink to="/posts/ai/softmax">Softmax</PostLink> — 把一堆有正有负的原始得分，变成一组加起来等于 1 的概率。
- <PostLink to="/posts/ai/loss-function">损失函数</PostLink> — 用一个数衡量"预测和真相差了多少"。
- <PostLink to="/posts/ai/cross-entropy">交叉熵</PostLink> — 分类任务的标准损失，衡量预测分布和真实分布的差异（和 Softmax 是黄金搭档）。
- <PostLink to="/posts/ai/gradient-descent">梯度下降</PostLink> — 沿着"下坡"方向，一步步把损失往低调。
- <PostLink to="/posts/ai/chain-rule">链式法则</PostLink> — 反向传播的数学内核：复合函数怎么一层层求导。
- <PostLink to="/posts/ai/backpropagation">反向传播</PostLink> — 误差从输出层倒流回每一层，告诉每个权重该往哪调。
- <PostLink to="/posts/ai/optimizer">优化器</PostLink> — 梯度下降的升级版（SGD / Adam 等），更聪明地更新权重。
- <PostLink to="/posts/ai/learning-rate">学习率</PostLink> — 每一步走多大：太大会震荡，太小会龟速。
- <PostLink to="/posts/ai/overfitting">过拟合</PostLink> — 模型把训练集连噪声都背死了：练习册满分、一到新数据就拉垮（泛化差）。

**以上是"一个网络怎么训出来"的训练机制。再顺手过一下 Transformer 之前处理序列的两个循环网络——背景知识，快速浏览即可，看懂它们的痛才知道 Transformer 好在哪：**

- <PostLink to="/posts/ai/rnn">RNN</PostLink> — 一个字一个字读、边读边记的循环网络；致命弱点是记性太短，句子一长就忘。
- <PostLink to="/posts/ai/lstm">LSTM</PostLink> — 给 RNN 装上"门"（遗忘门/输入门/输出门），缓解长距离遗忘，但仍然是串行计算、仍然偏慢。

---

## 🧩 第二站：Transformer 核心组件

这一站是全书重头戏。把一个 Transformer 拆成零件，一个个讲透，最后一篇再拼回整台机器。建议按顺序读——后面的零件依赖前面的。

- <PostLink to="/posts/ai/tokenization">Token 与分词</PostLink> — 大模型不认字，先把文本切成 token（BPE 子词分词为什么成为主流）。
- <PostLink to="/posts/ai/embedding">词向量</PostLink> — 把 token 变成稠密向量，让语义相近的词在空间里彼此靠近（one-hot 为什么不行）。
- <PostLink to="/posts/ai/positional-encoding">位置编码</PostLink> — 自注意力本身无序，要用位置编码告诉模型"这是第几个位置"。
- <PostLink to="/posts/ai/attention">注意力机制</PostLink> — 让每个词去"看"其它词；Q/K/V 与缩放点积公式的核心。
- <PostLink to="/posts/ai/multi-head-attention">多头注意力</PostLink> — 多个头从不同子空间同时关注不同关系（语法/指代/相邻词）。
- <PostLink to="/posts/ai/residual-connection">残差连接</PostLink> — `y = F(x) + x`，让几十上百层的超深网络也能训（来自 ResNet）。
- <PostLink to="/posts/ai/layer-norm">层归一化</PostLink> — 把每层数值分布稳住，加速收敛（Post-LN vs Pre-LN 的取舍）。
- <PostLink to="/posts/ai/feed-forward-network">前馈神经网络</PostLink> — attention 之后再过一遍 FFN，把非线性塞回去（含现代的 SwiGLU）。
- <PostLink to="/posts/ai/causal-mask">因果掩码</PostLink> — 生成时不能偷看未来：用下三角遮布把"未来 token"压成 0。
- <PostLink to="/posts/ai/transformer">Transformer 整体架构</PostLink> — **收口篇**：把上面所有零件串成一台完整机器，并讲清它击败 RNN 的三大优势。

---

## 🏛️ 第三站：三大架构变体

同一套 Transformer 零件，有三种主流组装方式，分别擅长不同任务。这一站帮你彻底分清"理解"和"生成"两条路线。

- <PostLink to="/posts/ai/gpt">Decoder-Only / GPT</PostLink> — 只保留解码器，自回归逐字生成下一个 token（GPT / Qwen / Llama 都是这一类）。
- <PostLink to="/posts/ai/bert">Encoder-Only / BERT</PostLink> — 只保留编码器，双向看全文做"理解"（文本分类、情感分析）。
- <PostLink to="/posts/ai/encoder-decoder">Encoder-Decoder / T5</PostLink> — 双子塔：编码器读懂源序列、解码器生成目标序列，**交叉注意力**是连接两座塔的桥（机器翻译、摘要）。

---

## ⚡ 第四站：注意力变体进阶

大模型推理时，KV 缓存随上下文长度膨胀，成为显存和速度的瓶颈。这一站讲注意力机制怎么"瘦身"。

- <PostLink to="/posts/ai/gqa">GQA</PostLink> — 分组查询注意力：让多个 Query 头共享同一组 K/V，在精度和速度间取折中（Llama 2/3、Mistral）。
- <PostLink to="/posts/ai/mla">MLA</PostLink> — 多头潜注意力（DeepSeek）：把 K/V 压成一个低维潜向量再缓存，压得比 GQA 更狠，支撑超长上下文。

---

## 🎯 第五站：MOE 混合专家

不动单次计算量、却把模型容量做大的关键架构创新。这一站讲清"以小博大"——参数很多，但每次只激活一小部分。

- <PostLink to="/posts/ai/moe">MOE 基础版</PostLink> — 多个"专家"小网络 + 一个门控 router，把输入加权融合（router / 专家 / 融合三要素）。
- <PostLink to="/posts/ai/sparse-moe">稀疏 MOE</PostLink> — 每个 token 只激活 Top-K 个专家，其余不计算：总参数大、单次计算小。
- <PostLink to="/posts/ai/shared-expert-moe">共享专家</PostLink> — DeepSeek 版：在稀疏 MOE 上加常驻"共享专家"承载通用知识，减少冗余、训练更稳。
