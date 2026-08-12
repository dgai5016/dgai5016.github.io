---
title: 神经元是什么
date: 2026-08-12 00:17
tags: [AI]
excerpt: 神经网络里的「神经元」（neuron），是构成整个神经网络的最小计算单元——一个会做决定的小盒子：接收若干数字输入，按各自重要性汇总，再给出一个数字输出。无数这样的小盒子按层连起来，就成了能识别图像、对话的神经网络。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxyYWRpYWxHcmFkaWVudCBpZD0iYm9keSIgY3g9IjUwJSIgY3k9IjM4JSIgcj0iNjIlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTUlIiBzdG9wLWNvbG9yPSIjYzRiNWZkIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgPC9yYWRpYWxHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiB2aWV3Qm94PSIwIDAgMTAgMTAiIHJlZlg9IjkiIHJlZlk9IjUiIG1hcmtlcldpZHRoPSI4IiBtYXJrZXJIZWlnaHQ9IjgiIG9yaWVudD0iYXV0by1zdGFydC1yZXZlcnNlIj4KICAgICAgPHBhdGggZD0iTTAgMCBMMTAgNSBMMCAxMCB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIi8+CiAgICA8L21hcmtlcj4KICA8L2RlZnM+CgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPCEtLSDog4zmma/mn5TlhYkgLS0+CiAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTIwIiByPSIxOTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KICA8Y2lyY2xlIGN4PSIxMDgwIiBjeT0iNTYwIiByPSIyMTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KCiAgPCEtLSDnpZ7nu4/lhYPnu5PmnoTlm77vvJp4McK3dzEgKyB4MsK3dzIgKyB4M8K3dzMgKyBiIOKGkiDOoyDihpIg5r+A5rS7IOKGkiB5IC0tPgogIDxnIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnUGluZ0ZhbmcgU0MnLCAnTWljcm9zb2Z0IFlhSGVpJywgc2Fucy1zZXJpZiI+CgogICAgPCEtLSDkuInkuKrovpPlhaXoioLngrkgeDEgeDIgeDMgLS0+CiAgICA8Zz4KICAgICAgPGNpcmNsZSBjeD0iMTgwIiBjeT0iMTEwIiByPSIyMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjk1KSIvPgogICAgICA8dGV4dCB4PSIxNDIiIHk9IjExOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOTUiPnjigoE8L3RleHQ+CgogICAgICA8Y2lyY2xlIGN4PSIxODAiIGN5PSIxODAiIHI9IjIwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIi8+CiAgICAgIDx0ZXh0IHg9IjE0MiIgeT0iMTg4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC45NSI+eOKCgjwvdGV4dD4KCiAgICAgIDxjaXJjbGUgY3g9IjE4MCIgY3k9IjI1MCIgcj0iMjAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45NSkiLz4KICAgICAgPHRleHQgeD0iMTQyIiB5PSIyNTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IndoaXRlIiBvcGFjaXR5PSIwLjk1Ij544oKDPC90ZXh0PgogICAgPC9nPgoKICAgIDwhLS0g6L6T5YWl5Yiw56We57uP5YWD5Li75L2T55qE6L+e57q/77yM5bim5p2D6YeN5qCH5rOoIC0tPgogICAgPGcgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODUpIiBzdHJva2Utd2lkdGg9IjMiPgogICAgICA8bGluZSB4MT0iMjAwIiB5MT0iMTEwIiB4Mj0iNDk4IiB5Mj0iMTcwIi8+CiAgICAgIDxsaW5lIHgxPSIyMDAiIHkxPSIxODAiIHgyPSI0OTgiIHkyPSIxODAiLz4KICAgICAgPGxpbmUgeDE9IjIwMCIgeTE9IjI1MCIgeDI9IjQ5OCIgeTI9IjE5MCIvPgogICAgPC9nPgogICAgPGcgZm9udC1zaXplPSIyMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+CiAgICAgIDx0ZXh0IHg9IjMyMCIgeT0iMTI4Ij534oKBPC90ZXh0PgogICAgICA8dGV4dCB4PSIzMjAiIHk9IjE3NCI+d+KCgjwvdGV4dD4KICAgICAgPHRleHQgeD0iMzIwIiB5PSIyMzIiPnfigoM8L3RleHQ+CiAgICA8L2c+CgogICAgPCEtLSDnpZ7nu4/lhYPkuLvkvZPvvJrmsYLlkowgzqMgKyDlgY/nva4gYiAtLT4KICAgIDxjaXJjbGUgY3g9IjU2MCIgY3k9IjE4MCIgcj0iNjIiIGZpbGw9InVybCgjYm9keSkiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPHRleHQgeD0iNTU0IiB5PSIxOTYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iNTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjM2IyZjdhIj7OozwvdGV4dD4KICAgIDx0ZXh0IHg9IjYxMiIgeT0iMjQ0IiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC45NSI+KyBiPC90ZXh0PgoKICAgIDwhLS0g5LuO5Li75L2T5Yiw5r+A5rS75puy57q/55qE566t5aS0IC0tPgogICAgPGxpbmUgeDE9IjYyNCIgeTE9IjE4MCIgeDI9IjcyNCIgeTI9IjE4MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjMiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CgogICAgPCEtLSDmv4DmtLvlh73mlbDmm7Lnur/vvIhzaWdtb2lkIOaEj+ixoe+8ie+8jOWkluahhui9u+ahhiAtLT4KICAgIDxyZWN0IHg9Ijc0NCIgeT0iMTIwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEyMCIgcng9IjE0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTApIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC41NSkiIHN0cm9rZS13aWR0aD0iMiIvPgogICAgPHBhdGggZD0iTSA3NTggMjE0IEMgNzkwIDIxNCA4MDAgMTQ2IDg0MCAxNDYgQyA4NjAgMTQ2IDg2NiAxMzIgODcwIDEyNiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI0IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICAgIDx0ZXh0IHg9IjgxNCIgeT0iMTA4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIwIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC45MiI+5r+A5rS7IGY8L3RleHQ+CgogICAgPCEtLSDku47mv4DmtLvliLDovpPlh7rnmoTnrq3lpLQgLS0+CiAgICA8bGluZSB4MT0iODg2IiB5MT0iMTgwIiB4Mj0iOTg2IiB5Mj0iMTgwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC45MikiIHN0cm9rZS13aWR0aD0iMyIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KCiAgICA8IS0tIOi+k+WHuuiKgueCuSB5IC0tPgogICAgPGNpcmNsZSBjeD0iMTAxOCIgY3k9IjE4MCIgcj0iMjIiIGZpbGw9IndoaXRlIi8+CiAgICA8dGV4dCB4PSIxMDE4IiB5PSIyNDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSI+eTwvdGV4dD4KCiAgPC9nPgoKICA8IS0tIOamguW/teWQjSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjQwOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSI5NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIgogICAgICAgIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCAnUGluZ0ZhbmcgU0MnLCAnTWljcm9zb2Z0IFlhSGVpJywgc2Fucy1zZXJpZiI+56We57uP5YWDPC90ZXh0PgoKICA8IS0tIOiLseaWh+WJr+WQjSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjQ2MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgyKSIKICAgICAgICBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgJ1BpbmdGYW5nIFNDJywgJ01pY3Jvc29mdCBZYUhlaScsIHNhbnMtc2VyaWYiPk5ldXJvbiBpbiBOZXVyYWwgTmV0d29ya3M8L3RleHQ+CgogIDwhLS0g5ZOB54mM5Ymv5qCH6K+GIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCiAgICAgICAgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sICdQaW5nRmFuZyBTQycsICdNaWNyb3NvZnQgWWFIZWknLCBzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="神经元封面" />


神经网络里的「神经元」（neuron），是构成整个神经网络的最小计算单元——你可以把它想成一个**会做决定的小盒子**：接收若干个数字输入，按各自的重要性汇总，最后给出一个数字输出。无数这样的小盒子按层连起来，就成了能识别图像、翻译语言、跟你对话的神经网络。

一句话总结：神经元 = 加权求和 + 激活函数。

## 用「评审团投票」来理解

想象一个评审团要对一份方案投票。每位评审给出一个分数（这就是**输入** $x_1, x_2, \dots$），但主席对不同评审的信任程度不一样：资深的意见权重大，新人的权重小（这就是**权重** $w_1, w_2, \dots$）。主席自己还有个默认立场——比如他天生偏保守，会先扣掉一分再开始算（这就是**偏置** $b$）。

主席把所有人的分数加权汇总，再叠上自己的默认立场，得到一个综合分数（这就是**加权和** $z$）。最后，他根据综合分数做决定：分数特别高就强烈通过，特别低就强烈反对，介于中间就给出温和意见（这个「做决定」的规则，就是**激活函数** $f$）。

整个流程，就是一个神经元干的事。

## 拆开看：神经元的五个零件

一个标准神经元由这几个部分协作完成：

- **输入** $x_i$：神经元接收的数字信号，可以是一张图片的像素、上一层别的神经元的输出，或一个词的特征向量。
- **权重** $w_i$：每个输入配一个权重，代表这个输入的重要性——权重越大，该输入对结果影响越大。
- **偏置** $b$：一个独立的数字，相当于神经元的「默认倾向」，让神经元更容易或更难被激活。
- **加权和** $z$：把所有「输入 × 权重」相加，再加偏置，得到汇总值。
- **激活函数** $f$：把汇总值变成最终输出的规则。它决定神经元是否「被激活」，并给整个网络引入非线性——这是神经网络能学复杂规律、而不只是做简单线性累加的关键。

在 AI 体系里，神经元是深度学习的最小积木；单个神经元能做的事很有限，但成千上万个按层组织起来，就能逼近任意复杂的函数。和它强相关的概念是「激活函数」和「多层感知机」——后者就是把神经元堆成层后的产物。

## 核心公式

把上面五步写成数学，就是这两行：

$$z = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b = \sum_{i=1}^{n} w_i x_i + b$$

$$y = f(z)$$

逐项解读：

- $x_i$：第 $i$ 个输入（第 $i$ 位评审的分数）。
- $w_i$：第 $i$ 个权重（主席给这位评审的信任度）。
- $b$：偏置（主席的默认立场）。
- $z$：加权和，所有评审意见汇总后的综合分。
- $f$：激活函数（主席做决定的规则）。
- $y$：神经元的最终输出。

权重和偏置，正是神经网络在「训练」时要不断调整的东西——所谓「学习」，本质上就是反复微调这堆 $w$ 和 $b$，让神经元的输出越来越接近正确答案。

## 算一个小例子

设一个神经元有 2 个输入：$x_1 = 2$，$x_2 = 3$，权重 $w_1 = 0.5$，$w_2 = -1$，偏置 $b = 1$。

先算加权和：

$$z = 0.5 \times 2 + (-1) \times 3 + 1 = 1 - 3 + 1 = -1$$

再用激活函数处理。换不同的 $f$ 会得到不同输出：

- 用 **ReLU**（小于 0 一律归零）：$y = \max(0, -1) = 0$。
- 用 **sigmoid**（压到 0~1 之间，可以理解为「通过的信心」）：$y = \dfrac{1}{1 + e^{-(-1)}} = \dfrac{1}{1 + e^{1}} \approx 0.27$。

可以看到，偏置和权重的不同取值，加上不同激活函数，会让同一个输入产生完全不同的输出——这正是神经元「做决定」的灵活性来源。

## PyTorch 里长什么样

在 PyTorch 里，`nn.Linear` 这一行就实现了「加权求和 + 偏置」这件事：

```python
import torch.nn as nn

# 输入 3 个特征，输出 1 个值——本质上就是一个单神经元
neuron = nn.Linear(in_features=3, out_features=1)
# 内部自动维护权重 w（3 个）和偏置 b（1 个）
```

完整的「加权求和 + 激活函数」流程如下面的小节。

## 完整代码

下面是一个能直接跑的单神经元示例：用假数据演示一次前向传播和一次训练步。

```python
import torch
import torch.nn as nn
import torch.nn.functional as F

# 定义一个单神经元模型：Linear 负责 w·x + b，ReLU 是激活函数
class SingleNeuron(nn.Module):
    def __init__(self, in_features):
        super().__init__()
        self.linear = nn.Linear(in_features, 1)  # 加权求和 + 偏置

    def forward(self, x):
        z = self.linear(x)        # 加权和 z = Σ wᵢxᵢ + b
        y = F.relu(z)             # 激活函数 f(z)，这里用 ReLU
        return y

# 实例化：接收 3 个输入
model = SingleNeuron(in_features=3)

# 假数据：1 个样本，3 个特征
x = torch.randn(1, 3)
target = torch.tensor([[1.0]])    # 假装正确的输出是 1

# 前向传播
y = model(x)
print("输出:", y.item())

# 训练一步：算损失 → 反向传播 → 更新权重和偏置
criterion = nn.MSELoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.01)

loss = criterion(y, target)       # 损失：输出和目标的差距
loss.backward()                   # 反向传播，算出每个 w 和 b 该往哪调
optimizer.step()                  # 按梯度更新 w 和 b

print("训练一步后的损失:", loss.item())
```

跑完你会发现，`loss.backward()` + `optimizer.step()` 这两步，正是不断微调权重和偏置的过程——也就是神经元在「学习」。

## 小结

神经元是神经网络的最小单元，干的事就一句：**把输入按权重加权求和，加偏置，再过激活函数，得到输出**。单看简单得像一道中学数学题，但成千上万个叠在一起、互相连接，就构成了今天所有大模型的基础。

## 参考资料

1. Artificial neuron - Wikipedia
   https://en.wikipedia.org/wiki/Artificial_neuron
2. 动手学深度学习 - 4.1 多层感知机（李沐等）
   https://zh.d2l.ai/chapter_multilayer-perceptrons/mlp.html
3. The McCulloch-Pitts Artificial Neuron - Computational Cognition Book
   https://com-cog-book.github.io/com-cog-book/features/mp-artificial-neuron.html
