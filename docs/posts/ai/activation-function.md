---
title: 激活函数是什么
date: 2026-08-12 14:00
tags: [AI]
excerpt: 激活函数（activation function）是神经网络每个神经元「加权求和」之后套上的那个小函数——没有它，再深的网络也只是一层线性模型，什么复杂问题都学不会。本文从「为什么需要非线性」讲起，推导 ReLU 公式 max(0, x) 并手算一例，再对比 sigmoid / tanh 的梯度消失问题，让你看懂深度学习为什么在 2010 年后突然起飞。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMzYjM0YTMiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPGcgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMjIiPgogICAgPGxpbmUgeDE9IjIwMCIgeTE9IjQ4MCIgeDI9IjEwMDAiIHkyPSI0ODAiLz4KICAgIDxsaW5lIHgxPSI2MDAiIHkxPSIyMDAiIHgyPSI2MDAiIHkyPSI1NjAiLz4KICA8L2c+CgogIDxwYXRoIGQ9Ik0gMjIwLDUxMCBDIDQyMCw1MTAgNDcwLDQ0MiA2MDAsNDQyIEMgNzMwLDQ0MiA3ODAsMzc0IDk4MCwzNzQiCiAgICAgICAgc3Ryb2tlPSIjZmZkMTY2IiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuNDIiLz4KICA8cGF0aCBkPSJNIDIyMCw1NDggQyA0MDAsNTQ4IDQ1MCw0NDIgNjAwLDQ0MiBDIDc1MCw0NDIgODAwLDMzNiA5ODAsMzM2IgogICAgICAgIHN0cm9rZT0iIzA2ZDZhMCIgc3Ryb2tlLXdpZHRoPSIzIiBmaWxsPSJub25lIiBvcGFjaXR5PSIwLjQyIi8+CgogIDxwYXRoIGQ9Ik0gMjIwLDQ4MCBMIDYwMCw0ODAgTCA5MjAsMjAyIgogICAgICAgIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI3IiBmaWxsPSJub25lIgogICAgICAgIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjQ4MCIgcj0iOSIgZmlsbD0iI2ZmZmZmZiIvPgoKICA8dGV4dCB4PSI2MDAiIHk9IjEwMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZmZmZiIKICAgICAgICBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjY0IiBmb250LXdlaWdodD0iNzAwIj7mv4DmtLvlh73mlbA8L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSIxNDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiNmZmZmZmYiCiAgICAgICAgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgb3BhY2l0eT0iMC44NSIgbGV0dGVyLXNwYWNpbmc9IjMiPkFjdGl2YXRpb24gRnVuY3Rpb24gwrcgUmVMVTwvdGV4dD4KCiAgPGcgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sIEhlbHZldGljYSwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNyIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC45Ij4KICAgIDxyZWN0IHg9IjI0NiIgeT0iMjY2IiB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIGZpbGw9IiNmZmZmZmYiLz4KICAgIDx0ZXh0IHg9IjI2OCIgeT0iMjc5Ij5SZUxVPC90ZXh0PgogICAgPHJlY3QgeD0iMzM4IiB5PSIyNjYiIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgZmlsbD0iI2ZmZDE2NiIvPgogICAgPHRleHQgeD0iMzYwIiB5PSIyNzkiPlNpZ21vaWQ8L3RleHQ+CiAgICA8cmVjdCB4PSI0NDgiIHk9IjI2NiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiBmaWxsPSIjMDZkNmEwIi8+CiAgICA8dGV4dCB4PSI0NzAiIHk9IjI3OSI+VGFuaDwvdGV4dD4KICA8L2c+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmZmZmIgogICAgICAgIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIG9wYWNpdHk9IjAuNTUiIGxldHRlci1zcGFjaW5nPSI2Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="激活函数封面" />

假设你在做一个「今天该不该出门跑步」的判断器，输入有温度、湿度、空气质量三个数。如果只是把它们加权相加得到一个总分，不管这个分多大或多小，你的判断都只能在一条直线上滑动。可现实里的选择并不是直线：温度在 15～25 ℃ 时越接近 22 ℃ 越舒服，可一旦超过 30 ℃，温度越高反而越糟。这种「到达某个阈值后才转向」的判断，正是激活函数要给神经网络装上的能力。

## 一句话定义

激活函数（activation function）是神经网络每个神经元在「加权求和」之后套上的一个小函数，决定这个神经元的输出长什么样、以什么强度传给下一层。

如果没有它，神经网络无论堆多少层，都等价于一层线性回归——什么复杂问题都学不会。激活函数就是那个让神经网络「能学复杂东西」的关键开关。

## 为什么神经网络需要非线性

先看一个反直觉的事实：**没有激活函数，再深的网络也只是一层线性模型。**

假设有一个最简单的两层网络，中间不加激活函数：

$$
y = W_2 (W_1 x + b_1) + b_2
$$

把括号展开：

$$
y = (W_2 W_1) x + (W_2 b_1 + b_2)
$$

令 $W' = W_2 W_1$，$b' = W_2 b_1 + b_2$，就得到一个新的一层线性模型 $y = W' x + b'$。两层叠起来和一层完全等价，堆一百层也没用。

符号逐项解读：

- $x$：输入向量（比如一张图片的像素、一句话的词向量）。
- $W_1, W_2$：相邻两层之间的权重矩阵，是网络要学的参数。
- $b_1, b_2$：偏置，每个神经元自带的「基础值」。
- $W', b'$：合并后的等价权重和等价偏置。

线性模型只能解决「一条直线能分开」的问题。可现实里的数据——猫和狗的照片、垃圾邮件和正常邮件——根本不可能用一条直线切开，你需要的是曲面、折线、各种拐弯的边界。**激活函数就是那个把直线掰弯、让网络能画曲面的小函数。**

## ReLU：最简单也最常用的激活函数

ReLU（Rectified Linear Unit，修正线性单元）的公式：

$$
\text{ReLU}(x) = \max(0, x)
$$

符号逐项解读：

- $x$：这个神经元收到的加权求和值（来自上一层的输入乘权重之和）。
- $\max(0, x)$：在 0 和 $x$ 之间取较大者。
- 当 $x > 0$ 时，输出就是 $x$ 本身；当 $x \leq 0$ 时，输出被「掐」成 0。

直觉：信号大于 0 原样通过，小于等于 0 直接掐掉——就像一个只放行「正信号」的门卫。

### 手算小例子

假设某个神经元收到的加权求和是 $x = 3$：

$$
\text{ReLU}(3) = \max(0, 3) = 3
$$

再来一个 $x = -2$：

$$
\text{ReLU}(-2) = \max(0, -2) = 0
$$

自检：结果要么等于输入（输入为正），要么等于 0（输入非正），符合公式定义。

### 对应的 PyTorch 片段

```python
import torch.nn as nn  # nn 是 PyTorch 的神经网络模块

# 一层线性变换 + ReLU 激活，对应公式 y = ReLU(W x + b)
layer = nn.Linear(3, 1)        # 3 个输入 → 1 个输出，内部自带 W 和 b
activation = nn.ReLU()         # 激活函数 ReLU

y = activation(layer(x))       # 等价于 max(0, W x + b)
```

## 为什么是 ReLU 而不是 sigmoid / tanh

ReLU 不是唯一选择。历史上更早用的是 sigmoid 和 tanh，它们都是 S 形曲线。

**Sigmoid** 把任意实数压到 $(0, 1)$：

$$
\sigma(x) = \frac{1}{1 + e^{-x}}
$$

**Tanh** 把任意实数压到 $(-1, 1)$：

$$
\tanh(x) = \frac{e^x - e^{-x}}{e^x + e^{-x}}
$$

它们看起来都很优雅，但在深层网络里会触发一个致命问题——**梯度消失**。

### 梯度消失：为什么深层网络「学不动」

神经网络靠反向传播学习，每一层都要乘一次激活函数的导数（链式法则）。当导数小于 1，连乘几次就会迅速缩小：

- sigmoid 的导数是 $\sigma'(x) = \sigma(x)(1 - \sigma(x))$，最大值只有 **0.25**（出现在 $x = 0$ 处），输入稍微偏离 0 就更接近 0。
- tanh 的导数是 $\tanh'(x) = 1 - \tanh^2(x)$，最大值是 **1**（出现在 $x = 0$ 处），但两端同样快速趋近 0。

假设一个 10 层网络，每层都乘 0.25：

$$
0.25^{10} \approx 0.0000001
$$

底层收到的梯度几乎是 0，权重根本更新不了——网络「学不动」。这就是梯度消失。

ReLU 的导数则截然不同：

$$
\text{ReLU}'(x) = \begin{cases} 1, & x > 0 \\ 0, & x \leq 0 \end{cases}
$$

对正输入，导数恒为 1，连乘 100 次还是 1——梯度可以一路畅通传到底层。这正是 ReLU 让深度学习在 2010 年后突然起飞的原因。

### ReLU 的缺点：神经元「死亡」

ReLU 也有短板：负输入的导数是 0，一旦某个神经元的输入长期为负，它就再也得不到梯度更新，等于「死掉」。这就是 **Dying ReLU** 问题。

后来出现了不少改良版：Leaky ReLU（负输入给一个很小的斜率，比如 0.01）、GELU（BERT、GPT 等模型常用）等，专门弥补这个缺陷。

## 小结

激活函数是神经网络里那个「把直线掰弯」的关键零件——没有它，再深的网络也只是一条直线。历史上 sigmoid / tanh 的 S 曲线优雅，却容易让深层网络梯度消失；ReLU 用一个极简的 $\max(0, x)$ 既引入了非线性，又让正区间梯度恒为 1，成为今天最常用的激活函数。理解了它，你就能看懂为什么深度学习在 2010 年后突然起飞。

## 完整代码

下面这段代码定义一个带 ReLU 的两层多层感知机（MLP），用假数据跑一次前向 + 一次训练步，可以直接复制运行。

```python
import torch
import torch.nn as nn

# 定义一个带 ReLU 激活的两层 MLP
class TinyMLP(nn.Module):
    def __init__(self, in_dim=3, hid_dim=4, out_dim=1):
        super().__init__()
        # nn.Linear(in, out) 对应 y = W x + b，内部自带权重 W 和偏置 b
        self.fc1 = nn.Linear(in_dim, hid_dim)
        # ReLU 激活：max(0, x)，夹在两层之间引入非线性
        self.act = nn.ReLU()
        self.fc2 = nn.Linear(hid_dim, out_dim)

    def forward(self, x):
        # 前向：线性 → ReLU → 线性
        h = self.act(self.fc1(x))   # 第一层 + 激活
        out = self.fc2(h)           # 输出层（回归任务通常不再加激活）
        return out

# 造一批假数据：3 维输入 x，目标值 y
torch.manual_seed(0)                # 固定随机种子，结果可复现
x = torch.randn(8, 3)               # 8 个样本，每个 3 维
y = torch.randn(8, 1)               # 8 个目标值

# 实例化模型、损失函数、优化器
model = TinyMLP()
criterion = nn.MSELoss()            # 均方误差损失
optimizer = torch.optim.SGD(model.parameters(), lr=0.05)

# 一次训练步：前向 → 算损失 → 反向传播 → 更新权重
pred = model(x)
loss = criterion(pred, y)
optimizer.zero_grad()               # 清空旧梯度
loss.backward()                     # 反向传播算新梯度（ReLU 让梯度畅通）
optimizer.step()                    # 用梯度更新 W、b

print(f"loss = {loss.item():.4f}")
```

试着把 `self.act = nn.ReLU()` 换成 `nn.Sigmoid()`，再跑一次观察 loss 的下降速度——在深层网络里这个差距会被放大几十倍。

## 参考资料

1. Rectified Linear Units Improve Restricted Boltzmann Machines - Vinod Nair & Geoffrey E. Hinton（ICML 2010）
   http://www.cs.toronto.edu/~fritz/absps/reluICML.pdf
2. Activation Functions and the Vanishing Gradient Problem - Fabrizio Musacchio
   https://www.fabriziomusacchio.com/teaching/teaching_dimensionality_reduction_in_neuroscience/07_activations_functions_and_vanishing_gradient_problem
3. A Gentle Introduction to the Rectified Linear Unit (ReLU) - Machine Learning Mastery
   https://www.machinelearningmastery.com/rectified-linear-activation-function-for-deep-learning-neural-networks/
