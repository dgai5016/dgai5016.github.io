---
title: 层归一化是什么
date: 2026-08-12 14:18
tags: [AI]
excerpt: 深层网络里，每个 token 的特征数值越走越失控，梯度爆炸或消失，训练直接崩。层归一化对每个 token 自己的特征维做减均值、除标准差、再缩放，把数值拉回稳定范围，加速收敛、稳住训练。本文讲清公式，对比 Post-LN 与 Pre-LN 两种摆法的差异，并给出可直接运行的 PyTorch 代码。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdNaWNyb3NvZnQgWWFIZWknLCBzYW5zLXNlcmlmIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM4YTgzZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDmoIfpopggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIxNjAiIGZvbnQtc2l6ZT0iODYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiNmZmZmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuWxguW9kuS4gOWMljwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjIxNSIgZm9udC1zaXplPSIzMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBsZXR0ZXItc3BhY2luZz0iMyI+TGF5ZXIgTm9ybWFsaXphdGlvbjwvdGV4dD4KCiAgPCEtLSDlt6bkvqfvvJrlj4Llt67kuI3pvZDnmoTljp/lp4vnibnlvoHmn7EgLS0+CiAgPGc+CiAgICA8bGluZSB4MT0iMjE1IiB5MT0iNDkwIiB4Mj0iNDQ1IiB5Mj0iNDkwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1vcGFjaXR5PSIwLjUiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHJlY3QgeD0iMjMwIiB5PSIzMTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45NSIgcng9IjMiLz4KICAgIDxyZWN0IHg9IjI3MiIgeT0iNDMwIiB3aWR0aD0iMzAiIGhlaWdodD0iNjAiICBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTUiIHJ4PSIzIi8+CiAgICA8cmVjdCB4PSIzMTQiIHk9IjI3MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjIyMCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjk1IiByeD0iMyIvPgogICAgPHJlY3QgeD0iMzU2IiB5PSIzOTAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45NSIgcng9IjMiLz4KICAgIDxyZWN0IHg9IjM5OCIgeT0iMzMwIiB3aWR0aD0iMzAiIGhlaWdodD0iMTYwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTUiIHJ4PSIzIi8+CiAgICA8dGV4dCB4PSIzMzAiIHk9IjUzNSIgZm9udC1zaXplPSIyMiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7ljp/lp4vnibnlvoHvvIjmlbDlgLzlpLHmjqfvvIk8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOS4remXtO+8mkxheWVyTm9ybSDog7blm4ogKyDnrq3lpLQgLS0+CiAgPGc+CiAgICA8cmVjdCB4PSI1MDAiIHk9IjM3MCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZmZmZiIgcng9IjMwIi8+CiAgICA8dGV4dCB4PSI2MDAiIHk9IjQwOCIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TGF5ZXJOb3JtPC90ZXh0PgogICAgPGxpbmUgeDE9IjQ2MCIgeTE9IjQwMCIgeDI9IjQ5NSIgeTI9IjQwMCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iNzQwLDM5NCA3NTAsNDAwIDc0MCw0MDYiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDxwb2x5Z29uIHBvaW50cz0iNDcwLDM5NCA0NjAsNDAwIDQ3MCw0MDYiIGZpbGw9IiNmZmZmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwLDApIi8+CiAgPC9nPgoKICA8IS0tIOWPs+S+p++8muW9kuS4gOWMluWQju+8jOafseWtkOmrmOW6puaOpei/keOAgeWbtOe7leS4ree6v+WIhuW4gyAtLT4KICA8Zz4KICAgIDxsaW5lIHgxPSI3NjAiIHkxPSI0OTAiIHgyPSI5OTAiIHkyPSI0OTAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNSIgc3Ryb2tlLXdpZHRoPSIyIi8+CiAgICA8IS0tIOWdh+WAvOWPguiAg+e6vyAtLT4KICAgIDxsaW5lIHgxPSI3NjAiIHkxPSI0MDAiIHgyPSI5OTAiIHkyPSI0MDAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuNCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1kYXNoYXJyYXk9IjYgNiIvPgogICAgPHRleHQgeD0iMTAwMCIgeT0iNDA0IiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuNzUiPs684omIMDwvdGV4dD4KICAgIDwhLS0g5b2S5LiA5YyW5ZCO5p+x5a2Q77ya6auY5bqm5o6l6L+R44CB6L275b6u6LW35LyPIC0tPgogICAgPHJlY3QgeD0iNzc1IiB5PSIzNTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMzUiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45NSIgcng9IjMiLz4KICAgIDxyZWN0IHg9IjgxNyIgeT0iMzc1IiB3aWR0aD0iMzAiIGhlaWdodD0iMTE1IiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTUiIHJ4PSIzIi8+CiAgICA8cmVjdCB4PSI4NTkiIHk9IjM0MCIgd2lkdGg9IjMwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjk1IiByeD0iMyIvPgogICAgPHJlY3QgeD0iOTAxIiB5PSIzNzAiIHdpZHRoPSIzMCIgaGVpZ2h0PSIxMjAiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC45NSIgcng9IjMiLz4KICAgIDxyZWN0IHg9Ijk0MyIgeT0iMzYwIiB3aWR0aD0iMzAiIGhlaWdodD0iMTMwIiBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9IjAuOTUiIHJ4PSIzIi8+CiAgICA8dGV4dCB4PSI4NzUiIHk9IjUzNSIgZm9udC1zaXplPSIyMiIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjg1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lvZLkuIDljJblkI7vvIjliIbluIPnqLPlrprvvIk8L3RleHQ+CiAgPC9nPgoKICA8IS0tIOW6lemDqOWTgeeJjOWJr+agh+ivhiAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjU5NSIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIwLjciIHRleHQtYW5jaG9yPSJtaWRkbGUiIGxldHRlci1zcGFjaW5nPSI0Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="层归一化封面" />

你在手机上用输入法打字时，每按一个字，模型就在后台把「当前这段话」表示成一串数字，再一层层加工去预测下一个字。问题在于，层数一深，这串数字很容易越走越大（动辄成百上千），或者越走越接近 0。一旦数值失控，模型的梯度要么爆炸、要么消失，训练就崩了。

**层归一化（Layer Normalization，常缩写为 LayerNorm）** 就是来解决这个问题的：它在每一层内部，对「每个 token 自己的那一串特征数字」单独做一次标准化——减去自己的均值、除以自己的标准差，再缩放一下——让数值分布回到一个稳定、温和的范围，让训练又能继续往下走。

一个贯穿全文的类比：把每个 token 想象成一首歌，它的特征向量就是这首歌在不同频段上的音量。有的歌整体偏响、有的偏弱，直接混音会乱套。LayerNorm 就像「每首歌单独做一次自动音量归一」——不管原本录的响度是多少，统一拉到一个标准响度再送进下一级。这样下一层拿到的，永远是「音量被校准过」的稳定信号。

## 它在 AI 体系里的位置

LayerNorm 属于**深度学习的训练稳定技术**，和它齐名的还有 BatchNorm（批归一化）、RMSNorm 等。它几乎是今天所有大模型（Transformer、BERT、GPT 系列、T5……）的标配——你随便打开一个主流模型的结构图，都能看到它的身影。

它的核心公式来自 Ba、Kiros、Hinton 2016 年的论文，原本是为 RNN 设计的；后来被 Transformer 相中，从此成了 Transformer 系架构里维持数值稳定的「血液循环系统」。

## 公式：LayerNorm 到底在做什么

假设某个 token 在某一层输出的特征向量是 $x = (x_1, x_2, \dots, x_d)$，共 $d$ 维。LayerNorm 分三步计算：

$$\mu = \frac{1}{d}\sum_{i=1}^{d} x_i$$

$$\sigma = \sqrt{\frac{1}{d}\sum_{i=1}^{d}(x_i - \mu)^2 + \epsilon}$$

$$\text{LayerNorm}(x)_i = \gamma_i \cdot \frac{x_i - \mu}{\sigma} + \beta_i$$

逐符号解释：

- $x_i$：这个 token 第 $i$ 维的特征值（输入）。
- $\mu$：这个 token **自己** $d$ 维特征的均值——相当于「这首歌的平均响度」。
- $\sigma$：这 $d$ 维特征的标准差，描述数值的离散程度（响度起伏有多大）；根号里那个 $\epsilon$ 是一个极小的正数（例如 $10^{-5}$），纯粹为了防止除以 0。
- $\gamma_i$、$\beta_i$：两个**可学习的**缩放和偏移参数（每一维各一组），让模型自己决定「归一化之后，到底要拉到多大、平移到哪里」——而不是死板地固定在均值 0、方差 1。
- $(x_i - \mu)/\sigma$：把这一维「减均值、除标准差」，结果分布变成均值约为 0、方差约为 1。

通俗理解：先把这首歌「整体响度校到标准」，再用 $\gamma$ 调增益、$\beta$ 调偏置，由模型决定它最终听起来是亮一点还是闷一点。

## 手算一个小例子

设某个 token 的 4 维特征 $x = (2, 4, 6, 8)$，先算均值和标准差：

- $\mu = (2+4+6+8)/4 = 5$
- 方差 $= [(2-5)^2 + (4-5)^2 + (6-5)^2 + (8-5)^2]/4 = (9+1+1+9)/4 = 5$
- $\sigma = \sqrt{5} \approx 2.236$

逐维减均值、再除以标准差（暂且忽略 $\gamma$、$\beta$、$\epsilon$）：

- 第 1 维：$(2-5)/2.236 \approx -1.34$
- 第 2 维：$(4-5)/2.236 \approx -0.45$
- 第 3 维：$(6-5)/2.236 \approx 0.45$
- 第 4 维：$(8-5)/2.236 \approx 1.34$

结果 $(-1.34, -0.45, 0.45, 1.34)$——均值约为 0、关于 0 对称，数值被压到一个温和的范围，下一层拿到就不会「炸」。自检一下：四个数相加约为 $0$（满足均值 0），起伏幅度也比原来的 $(2,4,6,8)$ 小很多——确实归一化了。

## 一行代码看到它

PyTorch 直接提供了 `nn.LayerNorm`：

```python
import torch
import torch.nn as nn

# 对最后一维（特征维 d=4）做归一化；elementwise_affine=True 表示带可学习的 γ 和 β
ln = nn.LayerNorm(normalized_shape=4, elementwise_affine=True)

x = torch.tensor([[2.0, 4.0, 6.0, 8.0]])  # 1 个 token，4 维特征
y = ln(x)
print(y)  # 接近上面手算的 (-1.34, -0.45, 0.45, 1.34)
```

`nn.LayerNorm` 内部干的事，和上面公式、手算例子一模一样。

## Post-LN vs Pre-LN：归一化放在哪儿

光知道「LayerNorm 长什么样」还不够。在 Transformer 里，每个子层外面都包了一层残差连接（residual connection），LayerNorm 放在残差的**前**还是**后**，会带来截然不同的训练表现——这是工业界和学术界的重点对比，也是读懂 GPT 系列结构的关键。

设子层（比如注意力或前馈网络）为 $F(\cdot)$，输入为 $x$。两种摆法只差一个位置：

| 摆法 | 公式 | 谁在用 |
|---|---|---|
| **Post-LN**（后归一化） | $y = \text{LN}(x + F(x))$ | 原版 Transformer（2017）、BERT（2018） |
| **Pre-LN**（前归一化） | $y = x + F(\text{LN}(x))$ | GPT-2、GPT-3、T5.1.1、LLaMA 等绝大多数现代大模型 |

**Post-LN** 的做法：先把残差和子层输出相加（Add），再过 LayerNorm（Norm）——也常被称为「Add & Norm」。原版 Transformer 和 BERT 用的都是它。

**Pre-LN** 反过来：先过 LayerNorm（Norm），再送进子层，最后和原始的 $x$ 相加（Add）——也就是「Norm & Add」。从 GPT-2 开始，主流的生成式大模型几乎都换成了这种摆法。

### 为什么 Pre-LN 更好训

Xiong 等人 2020 年的论文《On Layer Normalization in the Transformer Architecture》给出了关键解释：

- **梯度沿残差直通**：在 Pre-LN 里，输出 $y = x + F(\text{LN}(x))$ 中那条直接加上去的 $x$ 是一条恒等路径。反向传播时，梯度可以顺着这条「残差高速公路」一路直达底层，不必每层都被 LN 和子层反复缩放。而 Post-LN 的输出 $y = \text{LN}(x + F(x))$ 把 LN 套在最外面，梯度**每一层都得穿过一个 LN**，多层 LN 的缩放叠乘起来，底层梯度要么过大、要么过小。
- **深层网络更稳定**：Xiong 等人证明，在初始化时，Post-LN 越靠近输出层的层，梯度期望越大，所以一开训就容易数值爆炸；而 Pre-LN 各层梯度量级接近，即使堆得很深也不失衡。
- **可以省掉长 warm-up**：正因为 Post-LN 初始梯度不稳，原版 Transformer 不得不在训练开始时先用一个很小的学习率慢慢加热（warm-up），再逐步放大，否则直接发散。Pre-LN 没这个毛病，跳过或大幅缩短 warm-up 也能训起来，训练更快、对超参数更不敏感——这也是现代大模型几乎清一色选 Pre-LN 的原因。

一句话：**Pre-LN 让残差路径变成一条干净的梯度高速公路，深层也能稳定通车。**

### Pre-LN 的一个小尾巴：结尾通常要再补一次 LN

Pre-LN 把 LayerNorm 放到了子层之前，意味着最后一个子层的输出是一个**未经归一化的残差和**——数值范围可能很野。直接拿去算 logits（比如语言模型预测下一个词的概率分布），输出会不稳定。

所以 Pre-LN 结构通常在所有 Transformer 层结束之后、进入输出头之前，**再补一次 LayerNorm**（在 GPT-2 的代码里这层叫 `ln_f`）。少了它，模型在最后一步还是会「翻车」。

## 顺带说一句：和 BatchNorm 的区别

很多人第一次见 LayerNorm 都会问：它和更早的 **Batch Normalization（BatchNorm）** 有什么不同？

- **BatchNorm**：在「批量维度」上做归一化——拿同一个特征，跨 batch 里的所有样本求均值和方差。它依赖 batch，batch 太小就失效，也不适合序列模型（RNN、Transformer）。
- **LayerNorm**：在「特征维度」上做归一化——拿同一个 token、它自己的所有特征求均值和方差。它和 batch 无关，**单个样本也能算**，所以天然适合 Transformer 这种一个 token 一个 token 处理的场景。

回到上面的类比：BatchNorm 像「同一首歌，跨所有听众统一定响度」；LayerNorm 是「每个听众自己，对自己听的所有歌分别定响度」。

## 小结

层归一化对**每个 token 自己的特征维**做「减均值、除标准差、再缩放」三步，让数值分布稳定，从而加速收敛、稳定训练。在 Transformer 里它有两种摆法：原版的 **Post-LN**（$y=\text{LN}(x+F(x))$）梯度要穿过多层 LN、初始不稳定、离不开 warm-up；现代大模型偏爱的 **Pre-LN**（$y=x+F(\text{LN}(x))$）让残差路径变成梯度高速公路、深层稳定、可省 warm-up，但结尾通常要再补一次 LN 才好交给输出头。

## 完整代码

下面把一个 Transformer 风格的 block 用两种摆法各写一遍，再拼一个完整的 Pre-LN 小模型，可以直接跑：

```python
import torch
import torch.nn as nn

# 一个极简的「子层」：两层线性 + 激活，用来模拟注意力或前馈网络的结构
class Sublayer(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.fc = nn.Sequential(
            nn.Linear(d, d * 2),
            nn.GELU(),
            nn.Linear(d * 2, d),
        )

    def forward(self, x):
        return self.fc(x)


# Post-LN：Add & Norm —— 先加残差，再过 LN
class PostLNBlock(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.sub = Sublayer(d)
        self.ln = nn.LayerNorm(d)  # LN 放在残差之外

    def forward(self, x):
        # 对应公式：y = LN(x + F(x))
        return self.ln(x + self.sub(x))


# Pre-LN：Norm & Add —— 先过 LN 进子层，再加残差
class PreLNBlock(nn.Module):
    def __init__(self, d):
        super().__init__()
        self.sub = Sublayer(d)
        self.ln = nn.LayerNorm(d)  # LN 放在子层之前

    def forward(self, x):
        # 对应公式：y = x + F(LN(x))
        return x + self.sub(self.ln(x))


# 完整的 Pre-LN 风格小模型：若干层堆叠 + 结尾再补一次 LN
class MiniPreLNModel(nn.Module):
    def __init__(self, d, n_layers, vocab_size):
        super().__init__()
        self.blocks = nn.ModuleList([PreLNBlock(d) for _ in range(n_layers)])  # 堆 n_layers 个 Pre-LN block
        self.ln_f = nn.LayerNorm(d)              # Pre-LN 的「小尾巴」：结尾再补一次 LN
        self.head = nn.Linear(d, vocab_size)     # 输出头（这里是语言模型预测下一个词）

    def forward(self, x):
        for block in self.blocks:
            x = block(x)
        x = self.ln_f(x)          # 进输出头前先归一化，避免最后一步数值失控
        return self.head(x)


# 跑一步前向 + 反向，确认能稳定训练
d, n_layers, vocab = 32, 4, 1000
model = MiniPreLNModel(d, n_layers, vocab)

# 假数据：batch=2、序列长=6、特征维=32
x = torch.randn(2, 6, d)
target = torch.randint(0, vocab, (2, 6))

logits = model(x)                                                   # 前向，得到每个位置上的词分布
loss = nn.functional.cross_entropy(
    logits.reshape(-1, vocab), target.reshape(-1)
)                                                                   # 计算交叉熵损失
loss.backward()                                                     # 反向传播求梯度

print(f"loss = {loss.item():.4f}")                                  # 有限数值，说明没发散
print(f"logits shape = {tuple(logits.shape)}")                      # 期望 (2, 6, 1000)
```

跑起来你会看到 loss 是一个有限数值（不发散）、logits 形状正确——这就是 Pre-LN + 结尾 `ln_f` 的标准配方。

## 参考资料

1. Layer Normalization —— Ba、Kiros、Hinton（2016）
   https://arxiv.org/abs/1607.06450
2. On Layer Normalization in the Transformer Architecture —— Xiong 等人（2020）
   https://arxiv.org/abs/2002.04745
3. LayerNorm —— PyTorch 官方文档
   https://docs.pytorch.org/docs/stable/generated/torch.nn.LayerNorm.html
