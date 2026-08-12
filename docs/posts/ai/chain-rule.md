---
title: 链式法则是什么
date: 2026-08-12 14:04
tags: [AI]
excerpt: 多层神经网络训不动，问题常不在学习率，而在梯度传不回去。链式法则就是那把让误差从输出层一层层倒流回每个权重的数学钥匙——没有它就没有反向传播，多层网络根本训不了。本文用两层、三层复合函数的手算例子讲透它，并点出它和反向传播、梯度下降的关系。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMyZDI3NjYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImFjY2VudCIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjAiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNhODlkZmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZmZkMTY2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIGZpbGw9InVybCgjYmcpIi8+CiAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMTIwIiByPSIxOTAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KICA8Y2lyY2xlIGN4PSIxMDkwIiBjeT0iNTQwIiByPSIyMzAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuMDUiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNjAiIGZpbGw9IiNmZmZmZmYiIGZvbnQtd2VpZ2h0PSJib2xkIj7pk77lvI/ms5XliJk8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxMTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjc4Ij5DaGFpbiBSdWxlIMK3IOWPjeWQkeS8oOaSreeahOaVsOWtpuWGheaguDwvdGV4dD4KCiAgPGc+CiAgICA8Y2lyY2xlIGN4PSIyNTAiIGN5PSIzMjAiIHI9IjM2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjk2Ii8+CiAgICA8dGV4dCB4PSIyNTAiIHk9IjMyOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMyZDI3NjYiIGZvbnQtd2VpZ2h0PSJib2xkIj54PC90ZXh0PgogICAgPHRleHQgeD0iMjUwIiB5PSIzODIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjg1Ij7ovpPlhaU8L3RleHQ+CiAgPC9nPgogIDxnPgogICAgPGNpcmNsZSBjeD0iNTYwIiBjeT0iMzIwIiByPSIzNiIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45NiIvPgogICAgPHRleHQgeD0iNTYwIiB5PSIzMjgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjIyIiBmaWxsPSIjMmQyNzY2IiBmb250LXdlaWdodD0iYm9sZCI+dTwvdGV4dD4KICAgIDx0ZXh0IHg9IjU2MCIgeT0iMzgyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC44NSI+5Lit6Ze05bGCPC90ZXh0PgogIDwvZz4KICA8Zz4KICAgIDxjaXJjbGUgY3g9Ijg3MCIgY3k9IjMyMCIgcj0iMzYiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuOTYiLz4KICAgIDx0ZXh0IHg9Ijg3MCIgeT0iMzI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZmlsbD0iIzJkMjc2NiIgZm9udC13ZWlnaHQ9ImJvbGQiPnk8L3RleHQ+CiAgICA8dGV4dCB4PSI4NzAiIHk9IjM4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuODUiPui+k+WHujwvdGV4dD4KICA8L2c+CgogIDxsaW5lIHgxPSIyODYiIHkxPSIzMjAiIHgyPSI1MjAiIHkyPSIzMjAiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBvcGFjaXR5PSIwLjQiLz4KICA8bGluZSB4MT0iNTk2IiB5MT0iMzIwIiB4Mj0iODMwIiB5Mj0iMzIwIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgb3BhY2l0eT0iMC40Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI1MjAsMzIwIDUxMCwzMTUgNTEwLDMyNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC40Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI4MzAsMzIwIDgyMCwzMTUgODIwLDMyNSIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC40Ii8+CgogIDxwYXRoIGQ9Ik0gODcwIDI4NCBRIDcxNSAyMDUgNTYwIDI4NCIgc3Ryb2tlPSJ1cmwoI2FjY2VudCkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iNyA1Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI1NjAsMjg0IDU2OCwyNzQgNTUyLDI3NCIgZmlsbD0iI2ZmZDE2NiIvPgogIDx0ZXh0IHg9IjcxNSIgeT0iMTk1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZDE2NiIgZm9udC13ZWlnaHQ9ImJvbGQiPsOXIGR5L2R1PC90ZXh0PgoKICA8cGF0aCBkPSJNIDU2MCAzNTYgUSA0MDUgNDM1IDI1MCAzNTYiIHN0cm9rZT0idXJsKCNhY2NlbnQpIiBzdHJva2Utd2lkdGg9IjQiIGZpbGw9Im5vbmUiIHN0cm9rZS1kYXNoYXJyYXk9IjcgNSIvPgogIDxwb2x5Z29uIHBvaW50cz0iMjUwLDM1NiAyNTgsMzQ2IDI0MiwzNDYiIGZpbGw9IiNmZmQxNjYiLz4KICA8dGV4dCB4PSI0MDUiIHk9IjQ3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmQxNjYiIGZvbnQtd2VpZ2h0PSJib2xkIj7DlyBkdS9keDwvdGV4dD4KCiAgPHRleHQgeD0iNjAwIiB5PSI1OTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2IiBmaWxsPSIjZmZmZmZmIiBvcGFjaXR5PSIwLjYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="链式法则封面" />

你训练一个多层神经网络，发现怎么调学习率都不收敛。问题常常不在学习率，而在梯度——误差信号能不能从输出层一层层传回到每个权重。让这件事在数学上成立的，就是一条叫**链式法则（Chain Rule）**的求导公式。一句话定义：**当函数是「函数套函数」时，它的导数等于「外层的导数 × 内层的导数」**。

## 一个生活类比：流水线

想象一条流水线：原材料 `x` 经过第一台机器加工成半成品 `u`，`u` 再经过第二台机器加工成成品 `y`。如果你想知道「原材料多投入一点，成品会多产出多少」，你不必把整条流水线当一个整体去硬算，而是分两步：先算 `u` 对 `x` 的产出比，再算 `y` 对 `u` 的产出比，最后把两个比例乘起来——这就是链式法则的直觉：**分步求导，再相乘**。

## 核心公式（两层）

设 $u = g(x)$，$y = f(u)$，则 $y$ 对 $x$ 的导数是：

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$$

逐个符号解读：

- $y = f(u)$：外层函数，把中间量 $u$ 加工成最终输出 $y$。
- $u = g(x)$：内层函数，把输入 $x$ 加工成中间量 $u$。
- $\dfrac{dy}{du}$：固定在内层这一节，问「$u$ 变一点，$y$ 跟着变多少」。
- $\dfrac{du}{dx}$：固定在最底层，问「$x$ 变一点，$u$ 跟着变多少」。
- 两者相乘，就得到从 $x$ 一路到 $y$ 的总变化率。

直觉对应：流水线上两个车间的「产出比」相乘，就是头到尾的总产出比。

## 手算两层：拆开一个套娃

设 $y = (2x+1)^2$。它看着是一个式子，其实是两层套娃：内层 $u = 2x+1$，外层 $y = u^2$。

分步求导：

- 内层：$\dfrac{du}{dx} = 2$
- 外层：$\dfrac{dy}{du} = 2u = 2(2x+1)$

相乘：

$$\frac{dy}{dx} = 2(2x+1) \cdot 2 = 4(2x+1) = 8x + 4$$

自检：直接把 $y$ 展开成 $4x^2 + 4x + 1$，求导得 $8x + 4$，两者一致，结果可信。

## 手算三层：链子再长也一样

神经网络往往不止两层，链子会更长。设 $y = \sigma(3(2x)+1)$，其中 $\sigma$ 是 sigmoid 激活函数。拆成三节：

- 最内层 $a = 2x$：$\dfrac{da}{dx} = 2$
- 中间层 $u = 3a + 1$：$\dfrac{du}{da} = 3$
- 最外层 $y = \sigma(u)$：$\dfrac{dy}{du} = \sigma(u)\bigl(1-\sigma(u)\bigr)$

三节相乘：

$$\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{da} \cdot \frac{da}{dx} = \sigma(u)\bigl(1-\sigma(u)\bigr) \cdot 3 \cdot 2 = 6\,\sigma(u)\bigl(1-\sigma(u)\bigr)$$

规律很朴素：**链子有几节，导数就乘几次；每一层只管自己这一节的局部导数，链式法则负责把它们串起来**。

## 和反向传播、梯度下降是什么关系

这才是链式法则在 AI 里真正发光的地方。一个三层神经网络，本质就是三层（甚至几十、上百层）函数嵌套：

$$L = \text{Loss}\bigl(f_3(f_2(f_1(x;\,W_1);\,W_2);\,W_3)\bigr)$$

训练时，梯度下降要拿到每个权重的梯度 $\dfrac{\partial L}{\partial W_1}$、$\dfrac{\partial L}{\partial W_2}$、$\dfrac{\partial L}{\partial W_3}$ 才能更新权重。怎么算？就是反复套链式法则：

- 输出层最近：$\dfrac{\partial L}{\partial W_3} = \dfrac{\partial L}{\partial y} \cdot \dfrac{\partial y}{\partial W_3}$
- 往回一层多乘一节：$\dfrac{\partial L}{\partial W_2} = \dfrac{\partial L}{\partial y} \cdot \dfrac{\partial y}{\partial u_2} \cdot \dfrac{\partial u_2}{\partial W_2}$
- 再往回再多一节：$\dfrac{\partial L}{\partial W_1} = \dfrac{\partial L}{\partial y} \cdot \dfrac{\partial y}{\partial u_2} \cdot \dfrac{\partial u_2}{\partial u_1} \cdot \dfrac{\partial u_1}{\partial W_1}$

三件事的关系是这样的：

- **链式法则**：数学工具，告诉你「套娃函数怎么求导」。
- **反向传播（Backpropagation）**：把链式法则高效地跑在整张网络上的算法。它从输出层开始算，每往回一层就复用「已经算好的上层梯度」，再乘一次局部导数，避免重复计算。
- **梯度下降**：拿到每个权重的梯度后，真正去更新权重的那一步。

一句话收束：**没有链式法则，误差就没办法从 Loss 一路传回第一层权重，多层网络根本训不动**。这也是深度网络训练里常见的「梯度消失」问题的根源——链式法则里连乘的局部导数太小，乘着乘着梯度就趋近于零了。

## 完整代码

下面用 PyTorch 演示链式法则如何落地为自动的反向传播。对应上面两层手算例子的片段是：内层 `u = 2x + 1`，外层 `y = u ** 2`。

```python
import torch

# —— 片段：对应「两层手算」例子 ——
x = torch.tensor(2.0, requires_grad=True)   # 输入 x=2，开启梯度追踪
u = 2 * x + 1                               # 内层函数 u = 2x + 1
y = u ** 2                                  # 外层函数 y = u^2
y.backward()                                # 反向传播：PyTorch 自动套链式法则
print(x.grad)                               # 输出 20.0，即 4(2x+1)=4×5，与手算一致


# —— 完整：一个两层全连接网络，演示梯度如何逐层传回 ——
class TinyNet(torch.nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = torch.nn.Linear(3, 4)    # 第一层：3 维输入 → 4 维（权重 W1）
        self.fc2 = torch.nn.Linear(4, 1)    # 第二层：4 维 → 1 维输出（权重 W2）

    def forward(self, x):
        h = torch.relu(self.fc1(x))         # 中间量 u：先线性变换，再过 ReLU 激活
        return self.fc2(h)                  # 输出 y：再一层线性变换

model = TinyNet()
x = torch.randn(1, 3)                       # 一条假数据
target = torch.tensor([[1.0]])              # 假目标值

y = model(x)                                # 前向传播：x → u → y
loss = ((y - target) ** 2).mean()           # 均方误差损失 L
loss.backward()                             # 反向传播：沿计算图反向套链式法则，
                                           # 自动算出 ∂L/∂W1 和 ∂L/∂W2
print(model.fc1.weight.grad)                # 形状 [4, 3]：误差经「L → y → u → W1」三节链子传回
```

## 小结

链式法则本身只是微积分里一条朴素的求导规则：**复合函数的导数，等于各层局部导数相乘**。但正是这条公式，让误差信号能顺着网络一层层倒流回每个权重，反向传播才有了数学根基，多层神经网络才训得动。

## 参考资料

1. Chain Rule Review - Khan Academy
   https://www.khanacademy.org/a/chain-rule-review
2. Chapter 2: How the backpropagation algorithm works - Neural Networks and Deep Learning, Michael Nielsen
   http://neuralnetworksanddeeplearning.com/chap2.html
3. Optimization: Stochastic Gradient Descent（含链式法则与计算图） - CS231n, Stanford
   https://cs231n.github.io/optimization-2/
