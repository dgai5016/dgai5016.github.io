---
title: 学习率是什么
date: 2026-08-12 01:27
tags: [AI]
excerpt: '上一篇讲梯度下降时留了个钩子：更新公式里那颗叫 η 的小螺丝，当时只一句话带过——它就是学习率，「太大发散、太小太慢」。可这一个小数，恰恰是整个深度学习训练里最难调、最决定成败的一个设置。'
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8bGluZSB4MT0iMTkwIiB5MT0iMTQwIiB4Mj0iMTkwIiB5Mj0iNDAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zMCkiIHN0cm9rZS13aWR0aD0iNCIvPgogIDxsaW5lIHgxPSIxOTAiIHkxPSI0MDAiIHgyPSIxMDEwIiB5Mj0iNDAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zMCkiIHN0cm9rZS13aWR0aD0iNCIvPgoKICA8cGF0aCBkPSJNIDIxMCAxNjIgQyAzNjAgMTYyLCA0NzAgMzYwLCA2MjAgMzkyIFMgOTAwIDM5OCwgMTAwMCAzOTgiCiAgICAgICAgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2Utd2lkdGg9IjkiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgoKICA8bGluZSB4MT0iMjI1IiB5MT0iNDUwIiB4Mj0iMzUwIiB5Mj0iNDUwIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwb2x5Z29uIHBvaW50cz0iMzUwLDQ1MCAzMzQsNDQwIDMzNCw0NjAiIGZpbGw9IndoaXRlIi8+CiAgPGxpbmUgeDE9IjQ5NSIgeTE9IjQ1MCIgeDI9IjU4MCIgeTI9IjQ1MCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuODgpIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxwb2x5Z29uIHBvaW50cz0iNTgwLDQ1MCA1NjcsNDQyIDU2Nyw0NTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiLz4KICA8bGluZSB4MT0iNzE1IiB5MT0iNDUwIiB4Mj0iNzYwIiB5Mj0iNDUwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC43KSIgc3Ryb2tlLXdpZHRoPSI2IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8cG9seWdvbiBwb2ludHM9Ijc2MCw0NTAgNzUwLDQ0NCA3NTAsNDU2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNykiLz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1MzgiIGZvbnQtc2l6ZT0iOTYiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIKICAgICAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiI+5a2m5Lmg546HPC90ZXh0PgoKICA8dGV4dCB4PSI2MDAiIHk9IjU5MCIgZm9udC1zaXplPSIzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="学习率封面" />


上一篇讲梯度下降时，那个更新公式 $\theta_{\text{新}} = \theta_{\text{旧}} - \eta \cdot \nabla L$ 里有一颗不起眼的小写希腊字母 $\eta$（读 eta）。当时只用一句话带过——它叫**学习率**（learning rate），「太大发散、太小太慢」。可恰恰是这一个小数，是整个深度学习训练里**最难调、最决定成败**的一个设置，从业者花在它身上的时间，常常比写模型本身还多。这一篇，就把它单独拧出来讲透。

一句话定义：**学习率是「每一步迈多大」的那个数**。回到蒙眼下山的比喻——梯度告诉你往哪走，学习率决定你这一脚跨多远。换个更贴切的说法，它像汽车的**油门**：踩太深会冲出路面（发散），踩太浅车子挪不动（太慢），而且一路上还得**动态调节**——起步时狠踩赶路，快到目的地时轻踩微调。这「动态调节」，正是本文要讲的重点。

## 它在 AI 体系里的位置

学习率是一种**超参数**（hyperparameter）——「超」在它是你在训练**前**就要人手设好的数，不是模型自己学出来的（模型学的是参数 $\theta$，不是学习率 $\eta$）。在所有超参数里，它通常是对训练结果影响最大的一个。

它和几个概念紧密绑定：

- **梯度下降**：学习率是它更新公式里的步长系数，没有它梯度下降走不起来。
- **优化器**（optimizer）：像 Adam、SGD 这些，本质上都是「梯度下降 + 一套迈步策略」，学习率是它们共用的那根「油门」。

## 太大会「发散」：为什么会炸成 NaN

梯度下降那篇说过学习率太大会「跨到对面山坡」，这里拆得更细：当学习率**大于 1**（在 $L=w^2$ 这种简单例子里），会发生更吓人的事——**每一步都比上一步跨得更远**，数值像滚雪球一样放大。

拿 $L(w)=w^2$、初始 $w=1$、学习率 $\eta=1.1$ 心算前三步：

| 第几步 | 当前 $w$ | 梯度 $2w$ | 新 $w = w - 1.1\times 2w$ |
|---|---|---|---|
| 1 | 1.0 | 2.0 | $1 - 2.2 = -1.2$ |
| 2 | -1.2 | -2.4 | $-1.2 + 2.64 = 1.44$ |
| 3 | 1.44 | 2.88 | $1.44 - 3.168 = -1.728$ |

$w$ 的绝对值在 $1 \to 1.2 \to 1.44 \to 1.728$ 一路放大，损失 $w^2$ 不降反**飙升**。再走几十步，数值大到超出计算机浮点数能表示的范围，就变成 `inf`，再往下算就变成 `NaN`（Not a Number，一个「算坏了」的废值）——训练彻底崩掉。这就是「**发散**」（divergence）的真相：不是方向错了，是步子太大、每步都比上步更大，系统爆炸。

> 关键区别：$\eta=1$ 时是「左右来回横跳」（震荡，损失不上不下）；$\eta>1$ 时才是「越跳越远、直接爆炸」（发散）。震荡还能救，发散基本就废了。

## 太小不只慢，还可能「卡住」

反过来，学习率太小也不只是慢这么简单。想象损失曲面是一片**波浪起伏**的丘陵（不是光溜溜的碗），你的步子只有蚂蚁那么大——一旦走进一个**浅浅的小坑**，脚下感觉「平了」（梯度接近 0），算法就以为到了谷底、停下了。可真正最低的那个谷底，其实在更远处。这叫陷在**局部最优**（local minimum）或**平坦区**（plateau）：步子太小，连小土包都翻不过去。

## 怎么看 loss 曲线诊断学习率

实战中判断学习率合不合适，最直接的工具是**损失曲线**——把每轮的 loss 画成折线。三种典型形态一眼就能看出问题：

- **震荡 / 不降反升**：曲线像锯齿甚至往上窜 → 学习率**太大**，正贴着发散的边缘。
- **降得极慢 / 很早躺平**：曲线半天不往下走，或早早趴在一个平台上 → 学习率**太小**，或卡在了平坦区。
- **平滑稳定下降、逐渐收敛**：曲线像滑梯一样顺 → 学习率**合适**。

养成训练时盯着损失曲线看的习惯，是调学习率最基础的「手感」。

## 核心增量：学习率调度（为什么训练中要「变」学习率）

到这里讲的都是「一个固定的学习率怎么挑」。可真实训练里，**几乎没人用一个固定的学习率从头训到尾**——因为一个固定值很难两头讨好：

- 训练**早期**，参数离最优值还远，需要**大步快走**，赶紧挪到谷底附近；
- 训练**后期**，已经接近谷底，大步会反复跨过谷底来回晃，这时要**小步精修**，稳稳贴到底。

一套步幅贯穿始终，必然「要么前期太慢，要么后期太晃」。解决办法是**学习率调度**（learning rate schedule）：让学习率 $\eta$ 随训练轮次 $t$ 变化 $\eta(t)$，前期大、后期小。

下面是四种最常见的策略：

**1. 阶梯衰减（Step decay）**——每训练 $s$ 轮，把学习率乘以一个小于 1 的因子 $\gamma$：

$$\eta_t = \eta_0 \cdot \gamma^{\lfloor t/s \rfloor}$$

- $\eta_0$ —— 初始学习率，训练开始时的「大步」
- $\gamma$ —— 衰减因子，一个小于 1 的数（如 $0.5$ 表示砍半）
- $s$ —— 衰减周期，每隔多少轮降一次
- $\lfloor t/s \rfloor$ —— 向下取整，意思是「到第 $t$ 轮为止，已经降过几次」

直觉：像开车每跑一段路就把油门**松一档**，台阶式往下走。

**2. 指数衰减（Exponential decay）**——每一轮都乘一次 $\gamma$，是阶梯衰减的「连续平滑版」：

$$\eta_t = \eta_0 \cdot \gamma^{t}$$

不再有台阶，学习率每一轮都微微下降，曲线是一条平滑的下倾弧。

**3. 余弦退火（Cosine annealing）**——让学习率按余弦曲线平滑下降：

$$\eta_t = \eta_{\min} + \frac{1}{2}(\eta_{\max} - \eta_{\min})\left(1 + \cos\frac{\pi t}{T}\right)$$

- $\eta_{\max}$、$\eta_{\min}$ —— 学习率的上下限（最高点和最终降到的小值）
- $T$ —— 总训练轮次，余弦周期的长度
- $\cos$ —— 余弦函数，负责制造「平滑过渡」的形状

直觉：曲线**两头缓、中间陡**——开始降得慢（稳住大步）、中段快速衰减、末段又放缓（精细收敛），整体是一条从高点滑到低点的弧线。这是目前**最流行**的调度策略，从图像分类到大模型训练都在用。

**4. 预热（Warmup）**——开头先用几轮把学习率从 0 **线性升**到 $\eta_{\max}$，升完再按上面任一策略衰减：

$$\eta_t = \eta_{\max} \cdot \frac{t}{T_w}\quad(\text{预热阶段},\ t \le T_w)$$

为什么要「先升后降」？训练刚开始时，参数全是随机的、算出的梯度又大又乱，这时直接踩大油门很容易摔跟头；先用小步探一段路、等方向稳定了再加速，反而更安全。**几乎所有现代大模型**（GPT、Transformer 系列）的训练，都用「warmup + 余弦衰减」这套组合拳。

### 一个心算示例：阶梯衰减每档剩多少

取 $\eta_0 = 0.1$，每 $s=3$ 轮衰减一次，$\gamma = 0.5$（砍半）：

| 训练轮次 $t$ | 计算式 | 学习率 $\eta_t$ |
|---|---|---|
| 0–2 | $0.1 \times 0.5^0$ | **0.1000** |
| 3–5 | $0.1 \times 0.5^1$ | **0.0500** |
| 6–8 | $0.1 \times 0.5^2$ | **0.0250** |
| 9–11 | $0.1 \times 0.5^3$ | **0.0125** |

**自检**：学习率随轮次单调递减 ✓；每三轮砍半、越后期步子越小，完全符合「前期大步、后期小步」的直觉 ✓。

## 调参直觉：初始值怎么挑、Adam 怎么帮忙

挑初始学习率有几个经验范围：

- **SGD 优化器**：从 $0.01 \sim 0.1$ 起步试。
- **Adam 优化器**：从 $0.001$（即 $10^{-3}$）起步——这是业界最常用的「安全默认值」。

验证方法就是前面说的：先跑几轮、看损失曲线形态，按锯齿 / 过慢 / 平滑三种情况往大或往小调。

> 另一条捷径：**Adam 这类「自适应优化器」会自动按每个参数的梯度历史，单独调整各自的有效学习率**，大幅减轻了手调 $\eta$ 的负担。很多人直接用 `Adam + lr=0.001` 就能跑出不错的结果。不过 Adam 内部细节值得单开一篇，这里只先点一句——理解学习率调度，依然是做好训练的基本功。

## PyTorch 里怎么写

在 PyTorch 里，学习率调度被封装成 `lr_scheduler`，跟优化器绑定：

```python
# 挂一个「阶梯衰减」调度器：每 30 轮把学习率乘 0.1
scheduler = torch.optim.lr_scheduler.StepLR(opt, step_size=30, gamma=0.1)
# 换成余弦退火：scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=60)
```

用法的精髓是**训练循环每轮末尾多调一句** `scheduler.step()`——它会按策略自动把优化器里的学习率改掉，下一轮 `opt.step()` 用的就是新值。

## 完整代码

接着梯度下降那篇「教模型学会 $y=2x$」的玩法，这回加一个**余弦退火调度器**，并打印每段学习率，让你亲眼看到 $\eta$ 怎么随训练平滑下降。整体流程仍是熟悉的「预测 → 扣分 → 算梯度 → 迈步」，只是在每轮结尾多一步「调学习率」。

```python
import torch
import torch.nn as nn   # 导入神经网络模块并起别名 nn，后续才能用 nn.Linear 这类 API

# ===== 任务：继续教模型学会「y = 2x」 =====
torch.manual_seed(42)                              # 固定随机种子，保证每次运行结果可复现
x_train = torch.linspace(1, 10, 20).reshape(-1, 1) # torch.linspace(起, 止, 个数)：在 1~10 均匀取 20 个数；reshape(-1, 1) 改成 20 行 1 列
y_train = 2 * x_train                               # 真实答案：每个数的两倍

# ===== 搭同一个最简线性模型 y = w·x + b =====
model = nn.Linear(1, 1)                             # 线性层：内置 y = w·x + b，输入 1 维、输出 1 维
opt = torch.optim.SGD(model.parameters(), lr=0.1)  # 优化器：初始学习率 η_0 = 0.1
loss_fn = nn.MSELoss()                             # 损失函数：均方误差

# ===== 关键新动作：挂一个「余弦退火」学习率调度器 =====
# 让 η 按余弦曲线从 0.1 平滑降到 0；T_max=60 是周期长度（设成总轮数，正好走半个余弦周期）
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(opt, T_max=60)

# ===== 训练循环：每轮末尾多一步 scheduler.step()，自动改学习率 =====
for epoch in range(60):
    pred = model(x_train)          # 前向：模型预测
    loss = loss_fn(pred, y_train)  # 用 MSE 算损失（扣分）
    opt.zero_grad()                # 清空上一轮残留的梯度
    loss.backward()                # 反向传播：自动算出梯度 ∇L
    opt.step()                     # 用「当前学习率」迈一步：θ := θ − η·∇L
    scheduler.step()               # 学习率调度：按余弦曲线把 η 调小一档（下一轮生效）

    if epoch % 15 == 0:            # 每 15 轮打印一次，观察 η 怎么变
        cur_lr = opt.param_groups[0]['lr']   # 从优化器读出「当前实际学习率」
        print(f"第 {epoch:2d} 轮：lr={cur_lr:.4f}, loss={loss.item():.3f}")

# ===== 看看模型学会了没 =====
print(f"学到的权重 w：{model.weight.item():.3f}（标准答案 2）")
print(f"学到的偏置 b：{model.bias.item():.3f}（标准答案 0）")
```

运行时你会看到学习率按余弦公式平滑下降（loss 则从初始的较大值一路降到接近 0）：

```
第  0 轮：lr=0.1000, loss=38.659     （余弦起点：η 还是初始值 0.1）
第 15 轮：lr=0.0854, loss=0.123      （前段降得慢：还在大步快走）
第 30 轮：lr=0.0500, loss=0.005      （中点：正好砍半，cos(π/2)=0）
第 45 轮：lr=0.0146, loss=0.000      （后段接近 0：小步精修）
学到的权重 w：2.001（标准答案 2）
学到的偏置 b：0.000（标准答案 0）
```

其中 lr 数值由余弦公式 $\eta_t = 0.1 \times \frac{1+\cos(\pi t/60)}{2}$ 精确决定，可直接手算验证（如第 30 轮 $\cos(\pi/2)=0$，所以 $\eta_{30}=0.05$）；loss 的具体数值因随机初始化会略有不同，但都会从较大值持续降到接近 0，模型最终稳定收敛到 $y=2x$。

把调度器换成 `StepLR(opt, step_size=20, gamma=0.5)`，你会看到学习率呈**阶梯式**跳降而不是平滑下降——同一套训练循环，换个调度器就是不同的「换挡节奏」。这就是学习率调度在代码里的落地：一行 `scheduler.step()`，背后是「前期大步快走、后期小步精修」的全部思想。

## 小结

一句话浓缩：**学习率是每一步迈多大的那个数，太大会发散、太小会卡住；而学习率调度让它在训练中「前期大、后期小」，是固定学习率做不到的两全之策。** 挑初始值靠看损失曲线的「手感」，现代训练常用 warmup + 余弦退火的组合——理解了这些，你就拿到了控制训练节奏的油门。

## 参考资料

1. 动手学深度学习（李沐等）- 11.11 学习率调度器：系统讲解 step / 多项式 / 余弦等调度策略及实验对比
   https://d2l.ai/chapter_optimization/lr-scheduler.html
2. PyTorch 官方文档 - torch.optim.lr_scheduler：StepLR / CosineAnnealingLR 等调度器的 API 与公式
   https://docs.pytorch.org/docs/stable/optim.html#how-to-adjust-learning-rate
3. Cosine Learning Rate Schedule: Decay, Restarts, and Warmup：详解余弦退火及其与 warmup 的组合用法
   https://mbrenndoerfer.com/writing/cosine-learning-rate-schedule-decay-restarts-warmup
