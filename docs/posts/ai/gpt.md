---
title: GPT 是什么
date: 2026-08-12 10:02
tags: [AI]
excerpt: GPT 全称 Generative Pre-trained Transformer（生成式预训练 Transformer）。它先在海量文本上练就语言能力，再根据你给的开头，一个词一个词接龙写下去——ChatGPT 背后就是这样一个模型。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMWExYTJlIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzE2MjEzZSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYWNjZW50IiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIwJSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOWQ4YWZmIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CiAgPHJlY3QgeD0iODAiIHk9IjgwIiB3aWR0aD0iMTA0MCIgaGVpZ2h0PSIzIiBmaWxsPSJ1cmwoI2FjY2VudCkiIG9wYWNpdHk9IjAuNiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjIxNSIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBNaWNyb3NvZnQgWWFIZWksIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUwIiBmb250LXdlaWdodD0iODAwIiBmaWxsPSIjZmZmZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iOCI+R1BUPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iMjcwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIE1pY3Jvc29mdCBZYUhlaSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9IjQwMCIgZmlsbD0iIzlkOGFmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjIiPkdlbmVyYXRpdmUgUHJlLXRyYWluZWQgVHJhbnNmb3JtZXI8L3RleHQ+CgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIyNSwgMzcwKSI+CiAgICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE0IiBmaWxsPSIjNmM2M2ZmIiBvcGFjaXR5PSIwLjkiLz4KICAgIDx0ZXh0IHg9IjUwIiB5PSI2OCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7kvaA8L3RleHQ+CgogICAgPHJlY3QgeD0iMTIwIiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE0IiBmaWxsPSIjNmM2M2ZmIiBvcGFjaXR5PSIwLjkiLz4KICAgIDx0ZXh0IHg9IjE3MCIgeT0iNjgiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI0NCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+5aW9PC90ZXh0PgoKICAgIDxyZWN0IHg9IjI0MCIgeT0iMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHJ4PSIxNCIgZmlsbD0iIzZjNjNmZiIgb3BhY2l0eT0iMC45Ii8+CiAgICA8dGV4dCB4PSIyOTAiIHk9IjY4IiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNDQiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuS4ljwvdGV4dD4KCiAgICA8cmVjdCB4PSIzNjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTQiIGZpbGw9IiM2YzYzZmYiIG9wYWNpdHk9IjAuOSIvPgogICAgPHRleHQgeD0iNDEwIiB5PSI2OCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIFBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQ0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7nlYw8L3RleHQ+CgogICAgPHBhdGggZD0iTSA0NzIgNTAgTCA1MDIgNTAiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDxwYXRoIGQ9Ik0gNDk3IDQyIEwgNTA5IDUwIEwgNDk3IDU4IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZDhhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CgogICAgPHJlY3QgeD0iNTI1IiB5PSIwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcng9IjE0IiBmaWxsPSJub25lIiBzdHJva2U9IiM5ZDhhZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWRhc2hhcnJheT0iOCA2IiBvcGFjaXR5PSIwLjg1Ii8+CiAgICA8dGV4dCB4PSI1NzUiIHk9IjcwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSI1MiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzlkOGFmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+PzwvdGV4dD4KCiAgICA8cmVjdCB4PSI2NDUiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iMTQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzlkOGFmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtZGFzaGFycmF5PSI0IDYiIG9wYWNpdHk9IjAuMzUiLz4KICA8L2c+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNTYwIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIG9wYWNpdHk9IjAuNTUiIGxldHRlci1zcGFjaW5nPSI2Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+CiAgPHJlY3QgeD0iODAiIHk9IjU4NSIgd2lkdGg9IjEwNDAiIGhlaWdodD0iMyIgZmlsbD0idXJsKCNhY2NlbnQpIiBvcGFjaXR5PSIwLjYiLz4KPC9zdmc+Cg==" alt="GPT封面" />

GPT 全称 **Generative Pre-trained Transformer**（生成式预训练 Transformer）。一句话定义：**一个先在海量文本上「读万卷书」练就语言能力，再根据你给的开头，一个词一个词接龙写下去的 AI 模型**。我们天天用的 ChatGPT、各类大语言聊天机器人，背后几乎都站着这样一个「GPT 式」的模型。

在拆解它之前，先用一个你一定用过的场景建立直觉——**手机输入法的「联想输入」**。你打出「今天天气」，输入法就在候选栏跳出「很好 / 不错 / 真」等下一个可能的词；你选了一个，它再接着猜下一个。GPT 做的几乎是同一件事，只不过它把「猜下一个词」这件事练到了极致——读过的文本够多、模型够大，猜着猜着就能写出流畅的文章、答出复杂的问题。

理解了这层，我们就能拆开 GPT 这三个字母到底各代表什么。

## 三个词，三层意思

GPT 不是随便取的名字，这三个词正好对应这种模型的三个核心特征：

- **Generative（生成式）**——它会「生成」内容。和「给一张图判断是不是猫」这种输出固定标签的分类模型不同，生成式模型的输出是一段**新的、由它自己逐字拼出来的序列**（一段话、一首诗、一行代码）。前面说的「接龙猜下一个词」，就是一种生成。
- **Pre-trained（预训练）**——它在正式上岗前，先做了一遍「通识教育」。研究人员让它读（实际上是做「猜下一个词」式的训练）海量无标注的文本——网页、书籍、新闻，什么都读。这一步叫**预训练**，目标是练出通用的语言感觉。等它语言基本功扎实了，再用针对性数据「开小灶」做微调（fine-tune），或用指令让它学会听人话（这就是 ChatGPT 那一层）。先通识后专精，和人上学一个道理。
- **Transformer**——这是它的「大脑结构」，也就是模型的架构。Transformer 是 2017 年提出的一种神经网络，靠**自注意力机制**（self-attention）来理解一句话里词与词之间的关系，是当下几乎所有大语言模型共同的地基。GPT 具体用的是 Transformer 的「解码器（decoder）」部分。

把三层合起来：**用 Transformer 当大脑，先预训练练就语言功底，再用生成的方式逐字吐出回答**——这就是 GPT。

## 它到底是怎么「接龙」的：自回归生成

GPT 生成文字的方式有个专业术语，叫**自回归（autoregressive）**——「自」是「用自己之前的输出当输入」，「回归」在这里就是「一步步预测」。说白了：**每生成一个词，就把它接在原句后面，作为下一次预测的输入**，循环往复。

用一个具体例子看最清楚。假设你输入了「今天天气」，模型会：

1. 读入「今天天气」，算出下一个词的概率分布，挑出「真」（或采样得到）；
2. 把序列变成「今天天气真」，再算下一个词，得到「好」；
3. 把序列变成「今天天气真好」，再算下一个词……直到遇到结束标志或达到长度上限。

这个过程用数学写出来，就是语言模型最核心的一个公式——**把「一整句话的概率」拆成「每个词在它前面所有词出现之后的条件概率」的连乘**：

$$P(x_1, x_2, \dots, x_T) = \prod_{t=1}^{T} P(x_t \mid x_1, x_2, \dots, x_{t-1})$$

逐项解读：

- $P(x_1, x_2, \dots, x_T)$：整句话 $x_1$ 到 $x_T$ 出现的概率（$T$ 是句子长度）。
- $\prod$：连乘符号，把后面每一项乘起来。
- $x_t$：第 $t$ 个词。
- $P(x_t \mid x_1, \dots, x_{t-1})$：在前面 $t-1$ 个词已经确定的前提下，第 $t$ 个词是某个候选词的条件概率。

直觉上：一句话「通顺」的程度，等于它每个词「接得合不合理」的程度乘起来。GPT 要学的，就是把这个条件概率估准。

那这个 $P(x_t \mid \dots)$ 具体怎么算出来？模型最后一层会为词表里每个词打一个分数 $z$（叫 logit），再用 **softmax 把分数转成概率**：

$$P(x_t = w \mid x_{<t}) = \frac{\exp(z_w)}{\sum_{j=1}^{V} \exp(z_j)}$$

- $z_w$：候选词 $w$ 的原始分数；
- $V$：词表大小，也就是所有可能候选词的个数；
- 分母 $\sum_j \exp(z_j)$：把所有候选词的 $\exp$ 分数加起来，用来做归一化，保证所有概率加起来等于 1。

### 算一个小例子

光看公式不直观，我们来代入算一遍。假设词表只有 3 个候选词：`["好", "差", "冷"]`，模型给当前位置的打分 $z$ 分别是 `[2.0, 1.0, 0.1]`。

- 分子：对每个分数取指数 $\exp$——$\exp(2.0) \approx 7.40$、$\exp(1.0) \approx 2.72$、$\exp(0.1) \approx 1.11$；
- 分母：三者相加 $\approx 7.40 + 2.72 + 1.11 = 11.23$；
- 各概率：
  - 「好」$\approx 7.40 / 11.23 \approx 0.66$
  - 「差」$\approx 2.72 / 11.23 \approx 0.24$
  - 「冷」$\approx 1.11 / 11.23 \approx 0.10$

**自检**：三个概率 $0.66 + 0.24 + 0.10 = 1.00$，非负且和为 1，符合概率分布；分数最高的「好」拿到了最大概率，方向正确。模型这一步大概率会挑「好」——于是下一笔就是「今天天气好」。

这就是 GPT 每生成一个词时心里打的算盘。把这一步重复成百上千次，一篇完整的回答就「接龙」出来了。

## GPT 在 AI 体系中的位置

GPT 属于**自然语言处理（NLP）**下的**大语言模型（LLM）**分支。它和 Transformer 的关系是「用其一部分」：完整 Transformer 原本有编码器和解码器两半，**GPT 只用了解码器那一半**，堆叠了很多层（GPT-3 是 96 层）。和它对位的另一条路是 BERT，BERT 只用了编码器，用来「理解」而非「生成」——所以同样是 Transformer 家族，GPT 负责写、BERT 负责读。

几个容易混的概念也顺手划一下边界：

- **GPT 是一类架构/方法**，不是一个具体产品。从 2018 年 OpenAI 的 GPT-1，到 GPT-2、GPT-3、GPT-4，以及很多公司的模型，背后都是这套思路。
- **ChatGPT 是产品名**，是「用 GPT 式模型 + 对话微调 + 人类反馈强化学习（RLHF）」包装出来的聊天应用。所以「GPT」是大脑，「ChatGPT」是戴了礼貌面具的那个大脑。
- 我们说的「大语言模型（LLM）」是个更宽的类别，GPT 是其中最有代表性的一条技术路线（解码器、自回归），但不是唯一路线。

## 为什么 GPT 这条路跑通了

GPT 之所以成为今天大模型的事实标杆，关键在于「预训练 + 生成」这套范式**能吃下海量无标注数据带来的规模红利**：互联网上有无穷无尽的纯文本，不需要人工逐条打标签，模型就能靠「猜下一个词」这个简单到不能再简单的任务，自动练出语法、常识、甚至一定的推理能力。模型越大、数据越多，这种能力就越强——这就是常说的「Scaling Law（缩放定律）」。一句话：**任务极简、数据无穷、规模可放大**，三者合力把 GPT 推上了王座。

## 小结

GPT = 用 Transformer 解码器当大脑，先在海量文本上预训练练就语言功底，再用「猜下一个词、把自己猜的接回去再猜」的自回归方式生成内容的模型。记住那个手机输入法联想的类比，再加「通识教育 + 接龙」两个意象，你就抓住了它的全部精髓。

## 完整代码

下面是一个**极简版 GPT** 的 PyTorch 实现——把核心骨架搭出来，你复制就能跑，跑完能直观看到「模型对一个序列预测下一个 token 的概率」。真实 GPT 还有更多工程细节（层归一化位置、激活函数、更大的层数等），但主干逻辑就是下面这样。

```python
import torch
import torch.nn as nn

# 设置随机种子，保证每次运行结果可复现
torch.manual_seed(42)

# ============ 超参数（极小，方便 CPU 跑通） ============
vocab_size = 10    # 词表大小：假设只有 10 个「词」
d_model = 16       # 每个 token 的向量维度
n_heads = 2        # 注意力头数
n_layers = 2       # 堆叠几层 Transformer 解码器
seq_len = 8        # 输入序列长度
batch = 1          # 一次喂几条序列


# ============ 极简 GPT 模型 ============
class MiniGPT(nn.Module):
    def __init__(self, vocab_size, d_model, n_heads, n_layers):
        super().__init__()
        # 1) 词嵌入：把每个词编号映射成一个 d_model 维向量
        self.token_emb = nn.Embedding(vocab_size, d_model)
        # 2) 位置嵌入：告诉模型每个词在句子里的第几个位置
        self.pos_emb = nn.Embedding(seq_len, d_model)
        # 3) Transformer 解码器堆叠
        # 用 TransformerEncoderLayer + causal mask（因果掩码）来模拟解码器行为：
        # 让每个位置只能「看到」它左边的词，从而实现自回归
        self.blocks = nn.ModuleList([
            nn.TransformerEncoderLayer(
                d_model=d_model, nhead=n_heads,
                batch_first=True, activation='gelu'
            ) for _ in range(n_layers)
        ])
        # 4) 语言模型头：把 d_model 维向量映射回 vocab_size 个分数（logits）
        self.lm_head = nn.Linear(d_model, vocab_size)

    def forward(self, x):
        # x 形状: (batch, seq_len)，里面是词编号
        positions = torch.arange(x.size(1))
        # 词向量 + 位置向量 = 带位置信息的输入表示
        h = self.token_emb(x) + self.pos_emb(positions)
        # 上三角为 -inf 的因果掩码：保证第 t 个位置只能看到 0..t，这是自回归的关键
        mask = torch.triu(torch.full((x.size(1), x.size(1)), float('-inf')), diagonal=1)
        # 逐层过 Transformer 解码器，每层都套上因果掩码
        for block in self.blocks:
            h = block(h, mask=mask)
        # 映射回词表大小的 logits，对应上面公式里的 z
        return self.lm_head(h)  # (batch, seq_len, vocab_size)


# ============ 构造假数据 + 训练一步 ============
model = MiniGPT(vocab_size, d_model, n_heads, n_layers)
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

# 假序列：任务是「给前 7 个词预测第 2~8 个词」（整体右移一位）
tokens = torch.randint(0, vocab_size, (batch, seq_len))
x = tokens[:, :-1]   # 输入：第 1..7 个词
y = tokens[:, 1:]    # 目标：第 2..8 个词

# 前向：得到每个位置的 logits（对应公式里的 z），形状 (batch, seq_len-1, vocab_size)
logits = model(x)

# 交叉熵损失：让「正确的下一个词」的概率尽量大
loss = nn.functional.cross_entropy(
    logits.reshape(-1, vocab_size),  # 展平成 (batch*seq, vocab_size)
    y.reshape(-1)                     # 展平的目标
)
# 反向传播 + 更新一步参数（就是一次「学怎么猜下一个词」）
loss.backward()
optimizer.step()

print(f"loss = {loss.item():.4f}")
```

## 参考资料

1. Improving Language Understanding by Generative Pre-Training - Radford et al. / OpenAI, 2018（GPT-1 原始论文，提出「无监督预训练 + 有监督微调」的两阶段范式）
   https://openai.com/index/language-unsupervised/
2. How does next-token prediction train a large language model? - Sebastian Raschka（权威 FAQ，讲清交叉熵训练下一个 token 的机制）
   https://sebastianraschka.com/faq/docs/next-token-prediction.html
3. Generative pre-trained transformer - Wikipedia（GPT 系列综述，含 GPT-1 到 GPT-4 的谱系）
   https://en.wikipedia.org/wiki/Generative_pre-trained_transformer
