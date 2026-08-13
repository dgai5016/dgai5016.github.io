---
title: PyTorch 极简入门：读懂深度学习代码的最小够用集
date: 2026-08-13 14:05
tags: [AI]
excerpt: 这是「学透 Transformer & MOE」系列的第零站，只教你读懂本系列代码需要的 PyTorch 最小够用集——张量怎么存、形状怎么变、nn.Module 怎么搭、训练循环怎么转。不展开原理，重点讲透卡住无数人的张量形状操作（view/transpose/负维度/广播/@），让你不再卡在 .view().transpose() 这行代码上。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYzMCIgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzZjNjNmZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiM1YTUyZDYiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KICA8IS0tIOW3puS4i+WPoOaUvuW8oOmHj+aWueWdl+ijhemlsCAtLT4KICA8ZyBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4zNSkiIHN0cm9rZS13aWR0aD0iMiI+CiAgICA8cmVjdCB4PSI5MCIgeT0iNDQwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9Ijk1IiByeD0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMCkiLz4KICAgIDxyZWN0IHg9IjExMCIgeT0iNDIwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9Ijk1IiByeD0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz4KICAgIDxyZWN0IHg9IjEzMCIgeT0iNDAwIiB3aWR0aD0iMTUwIiBoZWlnaHQ9Ijk1IiByeD0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiLz4KICA8L2c+CiAgPHRleHQgeD0iMjA1IiB5PSI0OTUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLFNlZ29lIFVJLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC43NSkiPlRlbnNvcjwvdGV4dD4KICA8IS0tIOWPs+S4iiBubi5Nb2R1bGUg5bGC5Y+g5pa55Z2X6KOF6aWwIC0tPgogIDxnIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjM1KSIgc3Ryb2tlLXdpZHRoPSIyIj4KICAgIDxyZWN0IHg9Ijk2MCIgeT0iMTIwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjcyIiByeD0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xMCkiLz4KICAgIDxyZWN0IHg9Ijk4NSIgeT0iMTAwIiB3aWR0aD0iMTMwIiBoZWlnaHQ9IjcyIiByeD0iMTIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNykiLz4KICA8L2c+CiAgPHRleHQgeD0iMTA1MCIgeT0iMTQ2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSxTZWdvZSBVSSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjE1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNzUpIj5ubi5Nb2R1bGU8L3RleHQ+CiAgPCEtLSDkuLvmoIfpopggLS0+CiAgPHRleHQgeD0iNjAwIiB5PSIyNzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLFNlZ29lIFVJLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iODIiIGZvbnQtd2VpZ2h0PSI4MDAiIGZpbGw9IiNmZmZmZmYiPlB5VG9yY2gg5p6B566A5YWl6ZeoPC90ZXh0PgogIDwhLS0g5Ymv5qCH6aKYIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iMzM4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iLWFwcGxlLXN5c3RlbSxTZWdvZSBVSSxzYW5zLXNlcmlmIiBmb250LXNpemU9IjMwIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBsZXR0ZXItc3BhY2luZz0iMyI+6K+75oeC5rex5bqm5a2m5Lmg5Luj56CB55qE5pyA5bCP5aSf55So6ZuGPC90ZXh0PgogIDwhLS0g5bqV6YOo5Zub5Liq5ZyG6KeS5qCH562+IC0tPgogIDxnIGZvbnQtZmFtaWx5PSItYXBwbGUtc3lzdGVtLFNlZ29lIFVJLHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44OCkiPgogICAgPHJlY3QgeD0iMjk4IiB5PSI1NDAiIHdpZHRoPSIxMjQiIGhlaWdodD0iNDIiIHJ4PSIyMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjx0ZXh0IHg9IjM2MCIgeT0iNTY3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7lvKDph488L3RleHQ+CiAgICA8cmVjdCB4PSI0MzgiIHk9IjU0MCIgd2lkdGg9IjE2NCIgaGVpZ2h0PSI0MiIgcng9IjIxIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+PHRleHQgeD0iNTIwIiB5PSI1NjciIHRleHQtYW5jaG9yPSJtaWRkbGUiPuW9oueKtuaTjeS9nDwvdGV4dD4KICAgIDxyZWN0IHg9IjYxOCIgeT0iNTQwIiB3aWR0aD0iMTY0IiBoZWlnaHQ9IjQyIiByeD0iMjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz48dGV4dCB4PSI3MDAiIHk9IjU2NyIgdGV4dC1hbmNob3I9Im1pZGRsZSI+bm4uTW9kdWxlPC90ZXh0PgogICAgPHJlY3QgeD0iNzk4IiB5PSI1NDAiIHdpZHRoPSIxNjQiIGhlaWdodD0iNDIiIHJ4PSIyMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjx0ZXh0IHg9Ijg4MCIgeT0iNTY3IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7orq3nu4Plvqrnjq88L3RleHQ+CiAgPC9nPgo8L3N2Zz4=" alt="PyTorch 极简入门封面" />

你打开这个系列，正兴致勃勃读着概念，代码里突然蹦出这么一行：

```python
Q = self.W_q(x).view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
```

每个字母都认识，连起来完全不知道在干嘛。如果你和我一样对 PyTorch 不熟——这行就是拦路虎，而且它还会在后面几十篇里反复出现。

一句话定位：**PyTorch 是一个深度学习框架——你只管把网络像搭积木一样拼出来，它帮你自动算"每个权重该怎么调"的梯度。**

这篇是系列的**第零站**。它不教 AI 概念（那是后面 35 篇的活），只教你**读懂那些代码需要的 PyTorch 最小语法集**。读完你会知道：数据怎么装进张量、形状怎么变、网络怎么搭成一个类、训练循环怎么转。其中**重点是「张量形状操作」——它是全系列代码里被用得最多、却从没人解释、最容易卡死人的部分**。

**怎么用这篇**：读系列前花一刻钟过一遍建立全局印象；后面任何一篇代码看不懂时，回来查对应那块就行。

---

## 1. 张量 Tensor —— 数字容器

PyTorch 里几乎一切数据都是「张量」（Tensor）。张量就是**多维数组**——一维的叫向量、二维的叫矩阵、三维及以上统称张量。你可以把它想成一个装数字的、**形状可变的盒子**。

### 1.1 创建张量

```python
import torch  # 导入 PyTorch 库，后续所有 torch.xxx 都来自它

# torch.tensor：把普通 Python 列表变成张量
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])  # 二维 → 一个 2×2 矩阵

# 下面几个是系列代码里几乎每篇都用的"造数据"函数
a = torch.randn(2, 3)      # 标准（正态）分布的随机数，形状 2×3——造假数据最常用
z = torch.zeros(3)         # 全 0，形状 3
r = torch.arange(0, 6)     # 0,1,2,3,4,5
```

**关键：维度是层层嵌套的**。看这个阶梯，每一级就是「多套」上一级结构：

```python
torch.tensor(5)                  # 0 维：单个数（标量）            shape []
torch.tensor([1, 2, 3])          # 1 维：一排数（向量）            shape [3]
torch.tensor([[1, 2],            # 2 维：一张表（矩阵）            shape [2, 2]
              [3, 4]])
torch.tensor([[[1, 2],           # 3 维：两张 2×2 表摞起来         shape [2, 2, 2]
               [3, 4]],
              [[5, 6],
               [7, 8]]])
```

**心智模型**：每多一个维度，就是「多套」上一级结构——2 维 = 向量排成表；3 维 = 表摞成一摞；4 维 = 几摞表叠一起。**一条不易记错的规则：最里面两维是一张「表」（矩阵），前面几个维度乘起来，决定有几张表**。所以 3 维 `[2, 3, 4]` = 最内 `3×4` 一张表、前面 `2` → 共 **2 张 3×4 表**；4 维 `(1, 2, 4, 4)` = 最内 `4×4` 一张表、前面 `1×2` → 共 **2 张 4×4 表**（验算：一张 4×4 是 16 个数，2 张 = 32，正好等于 `1×2×4×4`；对应拆头里 2 个头，每个头一张表）。**别被多层方括号吓到，它只是"多套了几层"**——这个模型是后面读懂拆头（4 维）的钥匙。

> **新手第一个坑**：神经网络只认小数（浮点数）。写 `torch.tensor([1, 2])` 默认是整数类型，喂给网络常常报错；要写成 `[1.0, 2.0]` 带小数点。

### 1.2 看张量：shape 和 dtype

先区分两件最容易混的事——**张量的「内容」和「形状」**：

```python
torch.manual_seed(42)      # 固定随机种子，让下面这堆随机数每次都一样（方便你对照）
x = torch.randn(3, 4)       # 造一个 3×4 的随机张量

print(x)
# tensor([[ 0.3367,  0.1288,  0.2345,  0.2303],
#         [-1.1229, -0.1863,  2.2082, -0.6380],
#         [ 0.4617,  0.2674,  0.5349,  0.8094]])

print(x.shape)
# torch.Size([3, 4])
```

- `x` 的**内容**是 12 个随机数（上面那堆）。
- `x.shape` 返回的 `[3, 4]` 只是在告诉你这 12 个数**怎么排列**——摆成 3 行 4 列。

> **新手最容易栽的坑**：把 `[3, 4]` 当成「张量里装了 3 和 4 两个数」。错——它是「第 0 维 = 3、第 1 维 = 4」的**尺码标签**，不是数据。就像快递箱上贴的「30×20×15 cm」：那三个数是箱子尺寸，不是箱子里的东西。对 2 维张量，`[3, 4]` 就是 3 行 4 列的矩阵；方括号只是 PyTorch 显示形状时的写法，别被它误导成「数组里有两个元素」。

```python
print(x.dtype)   # torch.float32 —— 数据类型（小数类型）
```

`shape` 是你调试时最常打的东西——「这个张量长什么样」。**读代码遇到看不懂的运算，第一步永远是 print 出各个张量的 shape**，对上了就懂了一大半。

### 1.3 负维度索引（系列高频盲区）

```python
x = torch.arange(24, dtype=torch.float).view(2, 3, 4)  # 0~23 摆成 (2,3,4)，shape [2, 3, 4]
# 维度编号：第 0 维=2，第 1 维=3，第 2 维=4
# 负号 = 从后往前数：-1 是最后一维(4)，-2 是倒数第二维(3)
x.sum(dim=-1)   # 沿最后一维求和——把每组 4 个数加起来
# tensor([[ 6., 22., 38.],
#         [54., 70., 86.]])    # 结果 shape [2, 3]（最后一维 4 被"求和消掉了"）
```

为什么要负维度？因为代码常想表达「沿最后一个维度操作」，用 `dim=-1` 比数清楚是第几维省心得多。系列里 `F.softmax(x, dim=-1)`、`x.transpose(-2, -1)` 都是这意思——「最后一维」或「倒数两维」。**记住：`-1` 永远指最后一维**。

---

## 2. 张量形状操作 ★重点

这是全系列代码里**最高频、却最没人讲、最容易卡死人**的一块。前面说了张量有 shape，而很多运算的本质就是「改变或对齐 shape」。下面 5 个操作是基础，最后用一个**真实的拆头案例**把它们串起来。

### 2.1 改形状不挪数据：view / reshape / contiguous

```python
x = torch.arange(12)        # 一维：[0,1,2,...,11]，shape [12]
y = x.view(3, 4)            # view 改"看法"，摆成 3 行 4 列矩阵：
                           # [[ 0,  1,  2,  3],
                           #  [ 4,  5,  6,  7],
                           #  [ 8,  9, 10, 11]]
z = x.reshape(2, 6)         # reshape 更通用（连"内存不连续"也能改），摆成 2 行 6 列：
                           # [[ 0,  1,  2,  3,  4,  5],
                           #  [ 6,  7,  8,  9, 10, 11]]

# view 要求张量在内存里连续；不连续时会报错，这时先 .contiguous() 再 view
out = x.contiguous().view(3, 4)

# 多维也一样：把一维数据摆成更高维——这正是后面拆头 view(batch, 词, 头, 维) 的简化版
m = torch.arange(24)       # shape [24]
n = m.view(2, 3, 4)        # 摆成 (2, 3, 4) = 2 张 3×4 矩阵（用上面的"摞矩阵"模型去想）：
                           # n[0] = [[ 0,  1,  2,  3], [ 4,  5,  6,  7], [ 8,  9, 10, 11]]
                           # n[1] = [[12, 13, 14, 15], [16, 17, 18, 19], [20, 21, 22, 23]]
```

**关键认知**：`view` / `reshape` 改的是「形状」（怎么看这些数），**不改变数据本身、也不改变元素总数**（12 个数怎么摆都是 12 个）。括号里的数字之积必须等于元素总数；可以写一个 `-1` 让 PyTorch 自己算那一位：`x.view(3, -1)` 会自动得出第二位是 4。

### 2.2 转置与换轴：transpose

```python
x = torch.tensor([[1., 2., 3.],   # 2 行 3 列：
                  [4., 5., 6.]])   # [[1., 2., 3.],
                                   #  [4., 5., 6.]]
y = x.transpose(0, 1)              # 交换第 0、1 维 → 3 行 2 列：
                                   # [[1., 4.],
                                   #  [2., 5.],
                                   #  [3., 6.]]
# 多头注意力里到处是 .transpose(1, 2)、.transpose(-2, -1)，就是"把某两个维度互换"
```

多维 transpose 同理——只换两个轴的顺序，每维大小不变：

```python
p = torch.randn(2, 3, 4)     # shape (2, 3, 4) = (句子, 词, 维)
q = p.transpose(1, 2)        # 交换第 1、2 维 → (2, 4, 3) = (句子, 维, 词)
                              # 拆头里的 .transpose(1, 2) 就是这种"把'头'维度换到前面"
```

`transpose(a, b)` 把第 a 维和第 b 维互换。它也不挪数据，只改「维度的排列顺序」。

### 2.3 增减维度：unsqueeze / squeeze

```python
x = torch.tensor([[1., 2., 3.],     # shape [2, 3]
                  [4., 5., 6.]])
y = x.unsqueeze(0)              # 在第 0 位插一个大小为 1 的新维度 → shape [1, 2, 3]
                                # y = [[[1., 2., 3.], [4., 5., 6.]]]（外层多包了一对括号）
z = y.squeeze(0)                # 把大小为 1 的维度去掉 → 回到 shape [2, 3]，值不变
```

什么时候用？有些运算要求维度数对齐（比如「1 句话」要表示成 `[1, 词数, 维度]`），就用 `unsqueeze` 补一个维度。系列里 `batch`（批次）维度经常这么补。

### 2.4 广播（broadcasting）：不同 shape 怎么自动对齐

```python
a = torch.zeros(2, 3)             # shape [2, 3]，全是 0
b = torch.tensor([10., 20., 30.]) # shape [3]
c = a + b                         # 居然能加！b 被自动"广播"——复制到 a 的每一行再相加
                                  # tensor([[10., 20., 30.],
                                  #         [10., 20., 30.]])   shape [2, 3]
```

规则（不用背）：从最后一维往前对齐，某维是 1 或缺失就自动复制扩展。效果上就是「一个向量加到一个矩阵的每一行」。系列里 MOE 的门控权重相加就靠广播。**遇到 shape 明明对不上却居然能运算，多半就是广播在帮忙**。

### 2.5 矩阵乘：@ 运算符

```python
A = torch.tensor([[1., 2., 3.],   # shape [2, 3]
                  [4., 5., 6.]])
B = torch.tensor([[1., 0.],       # shape [3, 2]
                  [0., 1.],
                  [1., 1.]])
C = A @ B                    # 矩阵乘法（等价于 torch.matmul(A, B)）
                             # tensor([[ 4.,  5.],
                             #         [10., 11.]])   shape [2, 2]
# A @ B 要求 A 的最后一维 == B 的倒数第二维（这里 3==3）
```

`@` 就是矩阵乘法，系列里 `Q @ K`、`weights @ V` 满眼都是它。**注意它和逐元素乘 `*`（`a * b` 是每个对应位置相乘）完全不同**——这是新手第二大坑。

### 2.6 ★贯穿案例：多头注意力那行拆头代码到底在干嘛

把上面 5 个操作串起来。下面是 [多头注意力](/posts/ai/multi-head-attention) 那篇里**真实的一行**（系列第二站的核心）：

```python
# x 形状: (batch, seq_len, d_model)，假设 (1, 4, 8)——1句话、4个词、每词8维
# 假设 num_heads=2，所以 d_k = d_model / num_heads = 4
Q = self.W_q(x).view(batch, seq_len, self.num_heads, self.d_k).transpose(1, 2)
```

拆开这一长串，看每步 shape 怎么变：

1. `self.W_q(x)` —— 一个线性变换，形状不变，还是 `(1, 4, 8)`
2. `.view(1, 4, 2, 4)` —— **把每个词的 8 维拆成「2 个头 × 每头 4 维」**，形状变 `(1, 4, 2, 4)`。用 view 是因为 8 = 2×4，只是把数据重新分组。
3. `.transpose(1, 2)` —— **把「头」维度（第 2 维）换到「词」维度（第 1 维）前面**，形状变 `(1, 2, 4, 4)` = `(句子, 头, 词, 每头维度)`。

为什么要折腾？因为后面要**对每个头独立**算注意力。把「头」维度提到前面后，剩下的 `(4个词, 4维)` 就能当成普通小矩阵，一次性批量处理 2 个头。

**一句话总结**：这行就是「把一摞词向量，切成几个头，再把『头』这个维度拎到前面，方便批量算」。

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDM2MCIgZm9udC1mYW1pbHk9Ii1hcHBsZS1zeXN0ZW0sU2Vnb2UgVUksc2Fucy1zZXJpZiI+CiAgPGRlZnM+CiAgICA8bWFya2VyIGlkPSJhcnIiIHZpZXdCb3g9IjAgMCAxMCAxMCIgcmVmWD0iOSIgcmVmWT0iNSIgbWFya2VyV2lkdGg9IjciIG1hcmtlckhlaWdodD0iNyIgb3JpZW50PSJhdXRvLXN0YXJ0LXJldmVyc2UiPgogICAgICA8cGF0aCBkPSJNMCwwIEwxMCw1IEwwLDEwIHoiIGZpbGw9IiM5Y2EzYWYiLz4KICAgIDwvbWFya2VyPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTIwMCIgaGVpZ2h0PSIzNjAiIGZpbGw9IiNmOGY5ZmYiLz4KICA8dGV4dCB4PSI2MDAiIHk9IjUwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjIyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij7lpJrlpLTms6jmhI/lipvnmoQi5ouG5aS0Iu+8muW9oueKtuaAjuS5iOS4gOatpeatpeWPmDwvdGV4dD4KCiAgPCEtLSDpmLbmrrUx77yaKDEsNCw4KSAtLT4KICA8cmVjdCB4PSI2MCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4MiIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxMDQiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTI2IiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjE0OCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxNzAiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTkyIiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjIxNCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI2MCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4MiIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxMDQiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTI2IiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjE0OCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxNzAiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTkyIiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjIxNCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI2MCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4MiIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxMDQiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTI2IiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjE0OCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxNzAiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTkyIiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjIxNCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI2MCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4MiIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxMDQiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTI2IiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjE0OCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSIxNzAiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTkyIiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjIxNCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8dGV4dCB4PSIxNDgiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+KDEsIDQsIDgpPC90ZXh0PgogIDx0ZXh0IHg9IjE0OCIgeT0iMjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNmI3MjgwIj4x5Y+l6K+dIMK3IDTor40gwrcg5q+P6K+NOOe7tDwvdGV4dD4KCiAgPCEtLSDnrq3lpLQx77yadmlldyAtLT4KICA8bGluZSB4MT0iMjkwIiB5MT0iMTgyIiB4Mj0iMzg1IiB5Mj0iMTgyIiBzdHJva2U9IiM5Y2EzYWYiIHN0cm9rZS13aWR0aD0iMi41IiBtYXJrZXItZW5kPSJ1cmwoI2FycikiLz4KICA8dGV4dCB4PSIzMzciIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iIzZiNzI4MCI+LnZpZXcoMSw0LDIsNCk8L3RleHQ+CiAgPHRleHQgeD0iMzM3IiB5PSIyMDYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPuavj+ivjSA4IOe7tDwvdGV4dD4KICA8dGV4dCB4PSIzMzciIHk9IjIyMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzljYTNhZiI+5ouG5oiQIDLlpLTDlzTnu7Q8L3RleHQ+CgogIDwhLS0g6Zi25q61Mu+8migxLDQsMiw0KSAtLT4KICA8cmVjdCB4PSI0MjAiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNDQyIiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjQ2NCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0ODYiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTA4IiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI1MzAiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjU1MiIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTc0IiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0MjAiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNDQyIiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjQ2NCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0ODYiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTA4IiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI1MzAiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjU1MiIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTc0IiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0MjAiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNDQyIiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjQ2NCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0ODYiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTA4IiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI1MzAiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjU1MiIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTc0IiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0MjAiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNDQyIiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjQ2NCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI0ODYiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTA4IiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI1MzAiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjU1MiIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iNTc0IiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz4KICA8dGV4dCB4PSI1MDgiIHk9IjEzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0iIzZjNjNmZiI+KDEsIDQsIDIsIDQpPC90ZXh0PgogIDx0ZXh0IHg9IjQ2NCIgeT0iMjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjNmM2M2ZmIj7lpLQxPC90ZXh0PgogIDx0ZXh0IHg9IjU1MiIgeT0iMjQ1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjEzIiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjYTc4YmZhIj7lpLQyPC90ZXh0PgoKICA8IS0tIOeureWktDLvvJp0cmFuc3Bvc2UgLS0+CiAgPGxpbmUgeDE9IjY2MCIgeTE9IjE4MiIgeDI9Ijc4MCIgeTI9IjE4MiIgc3Ryb2tlPSIjOWNhM2FmIiBzdHJva2Utd2lkdGg9IjIuNSIgbWFya2VyLWVuZD0idXJsKCNhcnIpIi8+CiAgPHRleHQgeD0iNzIwIiB5PSIxNzAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTMiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IiM2YjcyODAiPi50cmFuc3Bvc2UoMSwyKTwvdGV4dD4KICA8dGV4dCB4PSI3MjAiIHk9IjIwNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzljYTNhZiI+5oqKIuWktCLnu7TluqY8L3RleHQ+CiAgPHRleHQgeD0iNzIwIiB5PSIyMjIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5Y2EzYWYiPuaPkOWIsOWJjemdojwvdGV4dD4KCiAgPCEtLSDpmLbmrrUz77yaKDEsMiw0LDQpIOS4pOS4quWktOW5tuaOkiAtLT4KICA8cmVjdCB4PSI4MjAiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iODQyIiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijg2NCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4ODYiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iODIwIiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijg0MiIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4NjQiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iODg2IiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjgyMCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4NDIiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iODY0IiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijg4NiIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4MjAiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iODQyIiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxMDgsOTksMjU1LDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijg2NCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTA4LDk5LDI1NSwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI4ODYiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDEwOCw5OSwyNTUsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iOTM0IiB5PSIxNTAiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI5NTYiIHk9IjE1MCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijk3OCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTAwMCIgeT0iMTUwIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iOTM0IiB5PSIxNjYiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI5NTYiIHk9IjE2NiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijk3OCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTAwMCIgeT0iMTY2IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iOTM0IiB5PSIxODIiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI5NTYiIHk9IjE4MiIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijk3OCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTAwMCIgeT0iMTgyIiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iOTM0IiB5PSIxOTgiIHdpZHRoPSIyMiIgaGVpZ2h0PSIxNiIgZmlsbD0icmdiYSgxNjcsMTM5LDI1MCwwLjMyKSIgc3Ryb2tlPSIjYzRiNWZkIiBzdHJva2Utd2lkdGg9IjEiLz48cmVjdCB4PSI5NTYiIHk9IjE5OCIgd2lkdGg9IjIyIiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2JhKDE2NywxMzksMjUwLDAuMzIpIiBzdHJva2U9IiNjNGI1ZmQiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9Ijk3OCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHJlY3QgeD0iMTAwMCIgeT0iMTk4IiB3aWR0aD0iMjIiIGhlaWdodD0iMTYiIGZpbGw9InJnYmEoMTY3LDEzOSwyNTAsMC4zMikiIHN0cm9rZT0iI2M0YjVmZCIgc3Ryb2tlLXdpZHRoPSIxIi8+CiAgPHRleHQgeD0iOTIxIiB5PSIxMzUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtc2l6ZT0iMTYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiM2YzYzZmYiPigxLCAyLCA0LCA0KTwvdGV4dD4KICA8dGV4dCB4PSI4NjQiIHk9IjI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iIzZjNjNmZiI+5aS0MTogNOivjcOXNOe7tDwvdGV4dD4KICA8dGV4dCB4PSI5NzgiIHk9IjI0NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxMyIgZmlsbD0iI2E3OGJmYSI+5aS0MjogNOivjcOXNOe7tDwvdGV4dD4KPC9zdmc+" alt="view 与 transpose 改变形状的演变" />

*图 1：拆头的形状演变——(1,4,8) 的词向量先 view 成 (1,4,2,4) 切出 2 个头，再 transpose 把头维度提到前面变成 (1,2,4,4)，方便每个头独立做矩阵乘。*

紧跟着还有配套的两行（合头）：

```python
scores = Q @ K.transpose(-2, -1)   # Q 乘 K 的转置：每个头里，4个词两两算相关度 → (1, 2, 4, 4)
weights = F.softmax(scores, dim=-1) # 沿最后一维把每个词对所有人的得分归一成权重
out = weights @ V                   # 权重加权求和 → (1, 2, 4, 4)
out = out.transpose(1, 2).contiguous().view(batch, seq_len, d_model)  # 把头拼回去 → (1, 4, 8)
```

最后一行是「合头」：先 `transpose` 把头维度换回原位，再 `contiguous()`（因为 transpose 后内存不连续，view 前要重新排成连续），最后 `view` 把 `2头×4维` 合回 `8` 维。

这 4 行集齐了 **view / transpose / 负维度 / @ / contiguous 全家桶**。看懂它们，系列第二站往后的代码就不再有「黑魔法」。

### 2.7 选讲：einsum（只在 MLA 那篇出现）

```python
torch.einsum('bhid,bhjd->bhij', Q, K)   # 用"字母下标"一次性写完转置 + 矩阵乘
```

`einsum` 是一种用字母下标描述运算的紧凑写法，上面这行等价于 `Q @ K.transpose(-2, -1)`。它**只在系列最后的 [MLA](/posts/ai/mla) 用过一次**，其它地方用不上，现在跳过、到那篇再回来看即可。

---

## 3. 搭网络 nn.Module

系列里几乎每个模型都长这样：

```python
class XxxNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer = nn.Linear(4, 2)
    def forward(self, x):
        return self.layer(x)
```

这套 `class` 写法，对没怎么碰过 Python 面向对象的人是个坎。下面逐个拆。

### 3.1 四件套

- `class XxxNet(nn.Module):` —— 定义一个叫 `XxxNet` 的类，括号里的 `nn.Module` 表示「照 PyTorch 的网络模板来造」。继承它，你的类就自动有了「记录参数、自动算梯度」等能力。
- `def __init__(self):` —— **构造函数**，「这个网络由哪些零件组成」写在这里。
- `super().__init__()` —— **固定写法，照抄即可**。它让 PyTorch 先把 `nn.Module` 模板该初始化的内部状态都准备好。不写这行，模型会报错或行为异常。
- `def forward(self, x):` —— **「数据怎么从输入流到输出」**写在这里。

### 3.2 __init__ 放零件，forward 放数据流

```python
class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.layer1 = nn.Linear(4, 8)   # 零件1：线性层，4 维进 8 维出
        self.layer2 = nn.Linear(8, 1)   # 零件2：8 维进 1 维出

    def forward(self, x):
        x = self.layer1(x)              # 数据先过 layer1
        x = self.layer2(x)              # 再过 layer2
        return x
```

### 3.3 self 是什么 / 为何 super 不能漏

- **`self`** 指向「当前这个网络实例自己」。`self.layer1 = ...` 的意思是「给这个网络装上一个叫 `layer1` 的零件，以后用 `self.layer1` 就能找到它」。没有 `self`，零件就只是个局部变量，`forward` 里根本用不到。
- **`super().__init__()`**：`nn.Module` 在背后维护着「参数清单」「梯度状态」等。不调 `super`，这些没初始化，后面 `net.parameters()` 会取不到东西、训练直接出错。**所以这行是定式，照抄**。

### 3.4 model(x) 自动调 forward

```python
net = TinyNet()      # 造出一个网络实例（此刻权重是随机的）
out = net(x)         # 喂数据——注意：外面写 net(x)，不是 net.forward(x)
```

PyTorch 的规矩：**写 `net(x)`，它会自动去调你的 `forward`**。这是新手最常困惑的点——明明定义的是 `forward`，为什么外面调的是 `net(x)`？记住这个对应关系就行。

---

## 4. 现成零件（精简 + 指路系列篇）

`nn.Module` 是模板，`torch.nn` 里还有一堆现成零件。下面只列系列里高频出现的，每个一句话带过——**想懂原理点链接跳到对应单篇**，这里只讲怎么用。

### 4.1 nn.Linear —— 全连接层，算 y = Wx + b

```python
self.fc = nn.Linear(4, 2)   # 4 维输入 → 2 维输出，内部自带权重 W 和偏置 b
```

系列几乎每篇都用。它把「加权求和 + 偏置」打包成一层。原理见 [神经网络](/posts/ai/neural-network)。

### 4.2 nn.Embedding —— 查表，把 token 编号变成向量

```python
self.embed = nn.Embedding(vocab_size, d_model)   # 词表大小 → 每词 d_model 维向量
```

输入是整数编号（token id），输出是该编号对应的向量。原理见 [词向量](/posts/ai/embedding)。

### 4.3 nn.ModuleList —— 叠多个层

```python
self.layers = nn.ModuleList([nn.Linear(8, 8) for _ in range(3)])  # 3 个层叠起来
```

> **坑**：叠层一定要用 `nn.ModuleList` 而不是普通 Python `list`——**只有前者里面的层才会被注册成「模型参数」**。普通 `list` 装的层，参数不会被训练到。MOE 里多个专家网络就用它。

### 4.4 损失函数 —— 量「预测离真相多远」

```python
loss_fn = nn.MSELoss()            # 回归任务：预测值和真值的均方误差
loss_fn = nn.CrossEntropyLoss()   # 分类任务：交叉熵（注意它内部自带 softmax）
```

原理见 [损失函数](/posts/ai/loss-function) 和 [交叉熵](/posts/ai/cross-entropy)。

---

## 5. 训练循环四件套 + optimizer

网络定义好还什么都不会（权重是随机的），让它变聪明靠「训练循环」。全系列的训练循环骨架都一样，记住下面这五步。

### 5.1 先备好优化器

```python
opt = torch.optim.Adam(net.parameters(), lr=0.01)
# net.parameters() —— 把网络里所有"要学的权重"（W、b 等）交给优化器
# lr —— 学习率，每步走多大（太大不稳、太小太慢）
```

`Adam` 是最常用的优化器，还有 `SGD`。原理见 [优化器](/posts/ai/optimizer) 和 [学习率](/posts/ai/learning-rate)。

### 5.2 四件套（系列每篇训练循环的核心）

```python
for epoch in range(100):          # 重复 100 轮
    pred = net(X)                 # ① 前向：算预测
    loss = loss_fn(pred, y)       # ② 算误差
    opt.zero_grad()               # ③ 清空上一步的旧梯度（不清会累加出错）
    loss.backward()               # ④ 反向：自动算每个权重的梯度
    opt.step()                    # ⑤ 用梯度更新权重——这一步才是真正"学习"
```

对应关系：`backward()` 干的是 [反向传播](/posts/ai/backpropagation)，`step()` 干的是 [梯度下降](/posts/ai/gradient-descent)。`zero_grad()` 必须在 `backward()` 前，否则梯度会在多个 batch 间累加。

### 5.3 完整可跑迷你训练

把上面零件拼起来，教一个最小的网络学会 `y ≈ 2x + 1` 这条规律。重点对照训练循环和 5.2 的五步。

```python
import torch
import torch.nn as nn

# 假数据：5 个点，大致满足 y ≈ 2x + 1
X = torch.tensor([[0.], [1.], [2.], [3.], [4.]])   # 输入 x
y = torch.tensor([[1.], [3.], [5.], [7.], [9.]])   # 对应的 y（正好 2x+1）

class TinyNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc = nn.Linear(1, 1)   # 1 维进 1 维出：就是要它学会 y = wx + b
    def forward(self, x):
        return self.fc(x)

torch.manual_seed(0)                              # 固定随机种子，让结果可复现
net = TinyNet()                                   # 造出网络（此刻 w、b 随机）
opt = torch.optim.SGD(net.parameters(), lr=0.05)  # 优化器：SGD，学习率 0.05
loss_fn = nn.MSELoss()                            # 损失：均方误差

for epoch in range(300):        # 训练 300 轮
    pred = net(X)               # ① 前向
    loss = loss_fn(pred, y)     # ② 算误差
    opt.zero_grad()             # ③ 清旧梯度
    loss.backward()             # ④ 反向算梯度
    opt.step()                  # ⑤ 更新权重

# 看它学到的 w 和 b（理想值 w≈2.0, b≈1.0）
print(f"学到的权重 w ≈ {net.fc.weight.item():.3f}")
print(f"学到的偏置 b ≈ {net.fc.bias.item():.3f}")
print(f"最终 loss = {loss.item():.4f}")
```

运行输出：

```
学到的权重 w ≈ 2.000
学到的偏置 b ≈ 1.000
最终 loss = 0.0000
```

没有人把 `y = 2x + 1` 写进代码——网络是**从 5 个数据点里自己把权重练出来的**，w 和 b 都精准命中了 2 和 1。这里的 loss 几乎为 0，是因为 `y = 2x + 1` 是一条精确的直线，而 `nn.Linear` 本身也是线性的，所以能完美拟合；真实任务的数据不会有这么干净，loss 会停在一个非零的小值——但训练骨架完全一样。把它换成更复杂的网络、更复杂的数据，骨架完全一样：**造网络 → 备优化器和损失 → 循环（前向→误差→清梯度→反向→更新）**。

---

## 6. 杂项速查表

下面这些 API 在系列里零散出现，不需要现在精通，遇到时回来查即可。

| API | 一句话 | 系列哪篇用到 |
|---|---|---|
| `F.softmax(x, dim=-1)` | 把一组得分归一成「加和为 1」的概率 | [Softmax](/posts/ai/softmax) |
| `register_buffer(...)` | 注册一个「不参与训练但要跟着模型存」的张量（如位置编码表） | [位置编码](/posts/ai/positional-encoding) |
| `torch.triu` / `masked_fill` | 生成上三角 / 把某些位置填成特定值（因果掩码用） | [因果掩码](/posts/ai/causal-mask) |
| `with torch.no_grad():` | 临时关掉梯度计算（测试、推理时省内存） | 多篇的测试代码 |
| `.detach()` | 把张量从「计算图」摘出来（不再追踪梯度） | [词向量](/posts/ai/embedding) |
| `.item()` | 把单元素张量取出成普通 Python 数字（打印用） | 多篇 |
| `requires_grad=True` | 声明这个张量需要追踪梯度 | [链式法则](/posts/ai/chain-rule) |

---

## 小结

PyTorch 就两件事——**把数据装进张量、把网络拼成 nn.Module**，剩下的梯度计算它自动帮你做。这篇给你的是读懂本系列代码的最小集合：

- **张量**怎么建（`tensor / randn / zeros / arange`）
- **形状**怎么变（`view / transpose / unsqueeze / 广播 / @`）——这是重点，尤其多头注意力那行 `.view().transpose()` 拆头，看懂它系列代码就不再有黑魔法
- **网络**怎么搭（`class + __init__ + forward + super`）
- **训练**怎么转（`zero_grad → backward → step`）

接下来回到 [学透 Transformer & MOE 学习地图](/posts/ai/learn-transformer-moe)，从第一站神经网络开始——你会发现每个概念都在反复用这些 PyTorch 零件。

## 参考资料

1. Learn the Basics - PyTorch 官方教程
   https://pytorch.org/tutorials/beginner/basics/intro.html
2. 数据操作 - 《动手学深度学习》
   https://zh.d2l.ai/chapter_preliminaries/ndarray.html
3. Tensors - PyTorch 官方文档
   https://pytorch.org/docs/stable/tensors.html
