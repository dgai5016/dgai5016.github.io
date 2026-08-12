---
title: 神经网络里的优化器（Optimizer）是什么
date: 2026-08-12 01:12
tags: [AI]
excerpt: 优化器是神经网络训练时，决定「每一步把模型参数往哪个方向调、调多少」的算法。它和损失函数、反向传播是搭档：损失函数告诉模型「这里错了」，优化器决定「具体怎么改」，可以理解为梯度下降的进阶升级版家族。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMWExNzMzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMC41NSIgc3RvcC1jb2xvcj0iIzNiMmY2YiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM2YzYzZmYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImhpbGwiIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjOWQ5N2ZmIiBzdG9wLW9wYWNpdHk9IjAuMzUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIiBzdG9wLW9wYWNpdHk9IjAuMDgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8cGF0aCBkPSJNIDEwMCAxNzAgUSAzMjAgNzAgNjAwIDM2MCBUIDExMDAgNDkwIEwgMTEwMCA1ODAgTCAxMDAgNTgwIFoiIGZpbGw9InVybCgjaGlsbCkiIHN0cm9rZT0iIzlkOTdmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2Utb3BhY2l0eT0iMC41NSIvPgogIDxwYXRoIGQ9Ik0gMjAwIDIwMCBMIDI1MCAyNDUgTCAyODUgMjE1IEwgMzQwIDI3NSBMIDM3NSAyMzUgTCA0NDAgMzIwIEwgNDc1IDI4NSBMIDU2MCA0MDUgTCA2MTUgMzg1IEwgNzYwIDQ2NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmY3YTdhIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1kYXNoYXJyYXk9IjcgNSIvPgogIDxwYXRoIGQ9Ik0gMjAwIDIwMCBRIDQyMCAyODUgNjIwIDM4NSBUIDk2MCA0NzUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzVlZTBkMCIgc3Ryb2tlLXdpZHRoPSIzLjIiLz4KICA8cGF0aCBkPSJNIDIwMCAyMDAgQyAzNjAgMjE1IDUxMCAzMjUgNzIwIDQxNSBTIDkzMCA0NzUgMTAxMCA0NzgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZDE2NiIgc3Ryb2tlLXdpZHRoPSIzLjgiLz4KICA8Y2lyY2xlIGN4PSIyMDAiIGN5PSIyMDAiIHI9IjExIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMzYjJmNmIiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxjaXJjbGUgY3g9IjEwNTAiIGN5PSI0NzgiIHI9IjEzIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiM2YzYzZmYiIHN0cm9rZS13aWR0aD0iNCIvPgogIDx0ZXh0IHg9IjEwNzgiIHk9IjQ4MyIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuODUiPuacgOS9jueCuTwvdGV4dD4KICA8ZyBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMiIgZmlsbD0iI2ZmZmZmZiI+CiAgICA8cmVjdCB4PSI4NSIgeT0iNDk1IiB3aWR0aD0iMjgiIGhlaWdodD0iNCIgZmlsbD0iI2ZmN2E3YSIvPgogICAgPHRleHQgeD0iMTIyIiB5PSI1MDQiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlNHRDwvdGV4dD4KICAgIDxyZWN0IHg9IjIxNSIgeT0iNDk1IiB3aWR0aD0iMjgiIGhlaWdodD0iNCIgZmlsbD0iIzVlZTBkMCIvPgogICAgPHRleHQgeD0iMjUyIiB5PSI1MDQiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk1vbWVudHVtPC90ZXh0PgogICAgPHJlY3QgeD0iMzk1IiB5PSI0OTUiIHdpZHRoPSIyOCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZkMTY2Ii8+CiAgICA8dGV4dCB4PSI0MzIiIHk9IjUwNCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+QWRhbTwvdGV4dD4KICA8L2c+CiAgPHRleHQgeD0iNjAwIiB5PSIxMDUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXNpemU9IjYyIiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iI2ZmZmZmZiI+5LyY5YyW5ZmoIE9wdGltaXplcjwvdGV4dD4KICA8dGV4dCB4PSI2MDAiIHk9IjE0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9IiNmZmZmZmYiIG9wYWNpdHk9IjAuNyI+U0dEIMK3IE1vbWVudHVtIMK3IEFkYW0g55qE6YCS6L+b5LmL6LevPC90ZXh0PgogIDx0ZXh0IHg9IjYwMCIgeT0iNjA1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyMCIgZmlsbD0iI2ZmZmZmZiIgb3BhY2l0eT0iMC42IiBsZXR0ZXItc3BhY2luZz0iNiI+QUkg5qaC5b+16Kej6K+7PC90ZXh0Pgo8L3N2Zz4K" alt="神经网络里的优化器封面" />

**一句话定义**：优化器是神经网络训练时，决定「每一步把模型参数往哪个方向调、调多少」的算法。

把它放进 AI 体系里看：训练一个神经网络要做三件事——前向算出预测、用**损失函数**衡量预测差多少、再让**优化器**根据差距反向调整参数。损失函数和反向传播负责告诉模型「这里错了」，优化器负责决定「具体怎么改」。它和损失函数、学习率是搭档关系，本概念紧挨着「梯度下降」这个更基础的概念，可以理解为「梯度下降的进阶升级版家族」。

## 一个贯穿全文的主类比：蒙眼下山

想象你被蒙着眼放在一座山上，目标是走到最低的山谷。你看不到全貌，只能用脚感受脚下哪边更陡（这就是**梯度**），然后朝下坡方向迈一步。优化器就是「你的下山策略」——同样都在感受坡度，不同策略走出来的路线天差地别：

- **SGD（随机梯度下降）**：每一步只看脚下当前的坡度，立刻迈出去。
- **Momentum（动量法）**：记住自己前几步的方向，惯性帮助你维持大方向、不被小坑洼带偏。
- **Adam（自适应矩估计）**：在 Momentum 的基础上，再给每个参数单独配一个步长，陡的维度走稳、缓的维度走快。

下面逐个拆开看，重点讲清它们为什么层层递进。

## 第一代：SGD——纯粹「看脚下」

SGD 的更新规则极其简单——用当前梯度乘上学习率，直接从参数里减掉：

$$
\theta_{t+1} = \theta_t - \eta \cdot g_t
$$

符号逐项解读：

- $\theta_t$：当前这一步的模型参数（一个数或一个矩阵，看你调的是哪个权重）。
- $g_t$：当前算出来的**梯度**，指「朝哪个方向走，损失上升最快」；我们朝相反方向走，就能让损失下降。
- $\eta$（读作「伊塔」）：**学习率**，一个手动设的小数（如 0.01），决定每步迈多大。
- $\theta_{t+1}$：更新后的新参数。

**直觉**：每一步都把当前看到的坡度当成全部信息，立刻照做。简单、可靠、好实现，是深度学习最早的默认选择。

**问题**：在「峡谷」地形（一个方向陡、另一个方向缓）里，SGD 会在陡的方向上来回横跳——因为每步只看脚下，看到左陡就往右迈，下一步又看到右陡往左迈，明明大方向是顺着峡谷往下走，却一直在峡谷两壁之间反复震荡，走得又慢又乱。

## 第二代：Momentum——记住方向，少走弯路

Momentum（Polyak, 1964）的核心改动是引入一个「速度」变量 $v$，让它累积历史梯度：

$$
\begin{aligned}
v_t &= \beta \cdot v_{t-1} + (1-\beta) \cdot g_t \\
\theta_{t+1} &= \theta_t - \eta \cdot v_t
\end{aligned}
$$

符号逐项解读：

- $v_t$：当前这一步的「累积速度」，相当于把过去几步的梯度做了一个**加权平均**（叫指数加权移动平均）。
- $\beta$：动量系数（常用 0.9），决定历史信息的「记忆长度」——越大越重视过去方向。
- $(1-\beta)$：当前梯度的权重，确保新旧信息此消彼长。

**直觉**：像一个重球滚下山，球有惯性——即使当前这一步脚下提示「往左」，但球之前一直在朝前滚，惯性会带着它继续往前，只是稍微偏左一点。在峡谷里：陡方向上的梯度左右摇摆，正负抵消，累积速度被压小；缓方向上的梯度始终同向，累积速度越来越大。结果就是「震荡方向被压、有用方向被放大」，球更快地朝山谷前进。

**小例题（自检）**：设 $\eta=0.1$、$\beta=0.9$、初始 $v_0=0$、参数 $\theta_0=2.0$，第一步梯度 $g_1=0.5$。

- 算累积速度：$v_1 = 0.9 \times 0 + 0.1 \times 0.5 = 0.05$。
- 更新参数：$\theta_1 = 2.0 - 0.1 \times 0.05 = 1.995$。

对比纯 SGD 同样条件：$\theta_1 = 2.0 - 0.1 \times 0.5 = 1.95$。Momentum 第一步走得更小（因为只用了 0.1 倍当前梯度），但连续多步后累积速度会让它在「同向」的方向上越走越快——这就是惯性带来的加速。

> 注意：PyTorch 的 `torch.optim.SGD(momentum=0.9)` 内部公式是 $v_t = \beta \cdot v_{t-1} + g_t$（没有 $1-\beta$ 这一项），和我们这里写的「指数加权」形式相差一个常数倍，本质行为一致。Adam 部分用「指数加权」写法更连贯，所以本文统一采用这一形式。

## 第三代：Adam——每个参数有自己的步长

Adam（Kingma & Ba, 2014）在 Momentum 的基础上再加一个关键思想：**自适应学习率**。它同时维护两个滑动平均：

$$
\begin{aligned}
m_t &= \beta_1 \cdot m_{t-1} + (1-\beta_1) \cdot g_t & \text{(一阶矩：梯度的滑动平均，等价 Momentum)} \\
v_t &= \beta_2 \cdot v_{t-1} + (1-\beta_2) \cdot g_t^2 & \text{(二阶矩：梯度平方的滑动平均)} \\
\hat{m}_t &= \frac{m_t}{1 - \beta_1^t}, \quad \hat{v}_t = \frac{v_t}{1 - \beta_2^t} & \text{(偏差修正)} \\
\theta_{t+1} &= \theta_t - \eta \cdot \frac{\hat{m}_t}{\sqrt{\hat{v}_t} + \epsilon}
\end{aligned}
$$

符号逐项解读：

- $m_t$：梯度本身的滑动平均（沿用 Momentum 的思想，决定**方向**）。
- $v_t$：梯度**平方**的滑动平均（衡量这个参数历史上梯度有多**大**）。
- $\beta_1, \beta_2$：两个记忆系数，常用 $\beta_1=0.9$、$\beta_2=0.999$。
- $\hat{m}_t, \hat{v}_t$：偏差修正。因为 $m_0=v_0=0$，刚开始几步估计严重偏小，除以 $1-\beta^t$（一个接近 0 的小数）把它放大回来。
- $\epsilon$（如 $10^{-8}$）：防止分母为 0 的小常数。
- 步长 $\eta \cdot \hat{m}_t / (\sqrt{\hat{v}_t} + \epsilon)$：方向由 $m_t$ 定，但**每个参数的实际步长**被 $\sqrt{v_t}$ 缩放。

**直觉（这是 Adam 的精髓）**：梯度一直很大的参数 → $v_t$ 大 → 分母大 → 步长被压缩，避免冲过头；梯度一直很小的参数 → $v_t$ 小 → 分母小 → 步长被相对放大，加速前进。换句话说，Adam 给每个参数都自动配一个「专属学习率」：频繁出现大幅梯度的参数走稳，少见或小幅梯度的参数走快。这种自适应让它在稀疏数据（比如 NLP 里的词嵌入）上效果尤其好。

**小例题（自检）**：设 $\eta=0.1$、$\beta_1=\beta_2=0.9$（简化起见）、$\epsilon=0$、$\theta_0=2.0$、$m_0=v_0=0$、$g_1=0.5$。

- 算一阶矩：$m_1 = 0.9 \times 0 + 0.1 \times 0.5 = 0.05$。
- 算二阶矩：$v_1 = 0.9 \times 0 + 0.1 \times 0.5^2 = 0.025$。
- 偏差修正：$\hat{m}_1 = 0.05 / (1-0.9) = 0.5$，$\hat{v}_1 = 0.025 / 0.1 = 0.25$。
- 更新：$\theta_1 = 2.0 - 0.1 \times \frac{0.5}{\sqrt{0.25}} = 2.0 - 0.1 \times \frac{0.5}{0.5} = 1.9$。

可以看到：偏差修正后，第一步的有效梯度基本等于真实梯度 $g_1=0.5$（这正是修正的目的——让初期不被零初始化拖累）。再观察自适应效果：如果这个参数历史上梯度一直很大（比如 $v_t=2.5$），分母 $\sqrt{2.5}\approx 1.58$ 会把步长压到约三分之一；反之梯度很小（$v_t=0.0025$），分母 $\sqrt{0.0025}=0.05$ 会把步长放大约 10 倍。这就是「自适应」在起作用。

## 三者递进一张表

| 优化器 | 核心机制 | 解决了什么 | 代价 |
|---|---|---|---|
| **SGD** | 当前梯度 × 学习率 | 提供最基础的下山规则 | 峡谷里来回震荡、收敛慢 |
| **Momentum** | 累积历史梯度的速度 | 抑制震荡方向、放大有用方向 | 多一个动量超参要调 |
| **Adam** | 一阶矩 + 二阶矩 + 偏差修正 | 每个参数自适应步长、稀疏梯度友好 | 多几个超参（但默认值通常够用） |

实践经验：Adam 因为几乎「开箱即用」（默认 $\eta=0.001$、$\beta_1=0.9$、$\beta_2=0.999$ 就能跑出像样的结果），是大多数项目的默认首选；而 SGD + Momentum 在调好学习率衰减后，常常能取得**更好的泛化**精度，所以在图像分类等「卷精度」的任务里依然很受欢迎。

## 完整代码

下面这份代码可以复制即跑。用假数据演示如何用三种优化器训练同一个最小神经网络，重点看三种 `optimizer` 实例化方式，以及一个标准训练步的五个动作。

```python
import torch
import torch.nn as nn

# === 准备阶段 ===

# 1. 固定随机种子——让 torch 生成随机数的结果可复现
#    新手常困惑：为什么同样的代码两次跑结果不一样？多半是随机种子没固定
torch.manual_seed(42)

# 2. 造一份假数据：100 个样本，每个样本 4 个特征
#    torch.randn(100, 4) 返回 100 行 4 列、服从标准正态分布的张量，模拟「输入特征矩阵」
X = torch.randn(100, 4)

# 3. 造对应的假标签：100 个 0 或 1 的整数，模拟「二分类的真值」
#    torch.randint(0, 2, (100,)) 从 [0, 2) 区间随机采 100 个整数
y = torch.randint(0, 2, (100,))


# === 定义模型 ===

# 自定义神经网络：必须继承 nn.Module（PyTorch 所有神经网络模型的基类）
class TinyNet(nn.Module):
    def __init__(self):
        # super().__init__() 调用父类 nn.Module 的初始化，注册内部状态（必须写，否则参数不被追踪）
        super().__init__()
        # nn.Linear(4, 2)：全连接层（线性层），输入 4 维、输出 2 维
        # 内部自动创建权重 W（形状 2×4）和偏置 b（形状 2），并标记为「可学习参数」
        self.fc = nn.Linear(4, 2)

    def forward(self, x):
        # 前向传播：定义数据怎么从输入流到输出
        # 这一层就一步：y_pred = x @ W.T + b（@ 是矩阵乘法的运算符简写）
        return self.fc(x)


# 实例化模型——此时 self.fc 里的 W 和 b 已被随机初始化
model = TinyNet()


# === 损失函数 + 三种优化器对比 ===

# 交叉熵损失：分类任务的标准损失，内部会自动对 logits 做 softmax
criterion = nn.CrossEntropyLoss()

# 【SGD】最基础的优化器——所有参数共用同一个学习率 0.01
optimizer_sgd = torch.optim.SGD(model.parameters(), lr=0.01)

# 【Momentum】在 SGD 上加 momentum=0.9，相当于「重球」惯性
optimizer_momentum = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)

# 【Adam】自适应学习率；lr=0.001 是 Adam 的常用默认值（比 SGD 小一个数量级）
optimizer_adam = torch.optim.Adam(model.parameters(), lr=0.001)

# model.parameters() 把模型里所有「可学习参数」（W、b 等）打包传给优化器，让它知道要调谁

# 本例选 Adam 做一次完整的训练步（想换 SGD / Momentum，把下面这行改一下即可）
optimizer = optimizer_adam


# === 一个标准训练步的五个动作（背下来，几乎每次都这样写） ===

# 动作 1：清空上一步残留的梯度
# PyTorch 默认「梯度累加」：不清零的话，本次梯度会叠到上次梯度之上
optimizer.zero_grad()

# 动作 2：前向传播——把数据喂给模型，得到预测值（这里是 100×2 的 logits）
outputs = model(X)

# 动作 3：算损失——衡量「预测值」和「真实标签」的差距
loss = criterion(outputs, y)

# 动作 4：反向传播——PyTorch 自动算出每个参数对损失的梯度（这一步三种优化器完全一样）
loss.backward()

# 动作 5：更新参数——优化器根据梯度调整 W 和 b（这一步三种优化器差别最大！）
optimizer.step()

print(f"训练一步后的损失: {loss.item():.4f}")
```

跑完会打印一行类似 `训练一步后的损失: 0.7321` 的数值。把 `optimizer` 换成 `optimizer_sgd` 或 `optimizer_momentum` 再跑一次，对比损失下降的速度——你会直观感受到 Adam 在训练前期往往掉得最快。

## 小结

一句话浓缩全文：**优化器 = 用梯度信息更新参数的策略**。SGD 只看当前脚下；Momentum 加惯性、压震荡；Adam 再叠一层「每个参数自适应步长」。三者层层递进，工程上的默认选择几乎都是 Adam，但 SGD + Momentum 在「卷精度」的场景依然有它的位置。理解了这条演进线，你也就理解了深度学习训练里最关键的一个旋钮。

## 参考资料

1. Adam: A Method for Stochastic Optimization - Diederik P. Kingma & Jimmy Ba (2014/2015, ICLR)
   https://arxiv.org/abs/1412.6980
2. An overview of gradient descent optimization algorithms - Sebastian Ruder
   https://ruder.io/optimizing-gradient-descent/
3. 《动手学深度学习》——优化算法章节 - 李沐等
   https://zh.d2l.ai/chapter_optimization/index.html
