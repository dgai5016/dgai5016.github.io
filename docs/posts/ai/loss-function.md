---
title: 损失函数是什么
date: 2026-08-12 00:15
tags: [AI]
excerpt: 损失函数（loss function）是机器学习里用来衡量「模型预测得有多不准」的一个数：预测离真实答案越远，这个数越大；完全猜中，这个数最小（通常是 0）。它还有个近义名叫代价函数（cost function），日常基本混用。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOWbvuW9ouWMuu+8mueil+W9ouaNn+WkseabsumdoiArIOeil+W6leacgOS9jueCue+8iOaNn+WkseWHveaVsOeahOinhuiniemakOWWu++8iSAtLT4KICA8IS0tIOeil+W9ouabsue6v++8iFUg5b2i5oqb54mp57q/77yM5Luj6KGo5o2f5aSx6ZqP5Y+C5pWw5Y+Y5YyW55qE5puy6Z2i77yJIC0tPgogIDxwYXRoIGQ9Ik0gMjUwIDIxNSBRIDYwMCA1NTUgOTUwIDIxNSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjgiIGZpbGw9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDwhLS0g5LuO5bem6auY54K55ruR5ZCR56KX5bqV55qE6Jma57q/6L2o6L+577yI5qKv5bqm5LiL6ZmN55qE5LiL6ZmN6Lev5b6E77yJIC0tPgogIDxwYXRoIGQ9Ik0gMzAwIDIzOCBRIDQzMCAzODAgNTc1IDQwOCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNSkiIHN0cm9rZS13aWR0aD0iNCIgZmlsbD0ibm9uZSIgc3Ryb2tlLWRhc2hhcnJheT0iMTAgOSIvPgogIDwhLS0g56KX5bqV5pyA5L2O54K555qE5bCP55CD77yI5pyA5LyY5Y+C5pWw77yM5o2f5aSx5pyA5bCP5aSE77yJIC0tPgogIDxjaXJjbGUgY3g9IjYwMCIgY3k9IjQwMCIgcj0iMjEiIGZpbGw9IndoaXRlIi8+CiAgPCEtLSDmnIDkvY7ngrnmoIforrDmqKrnur8gLS0+CiAgPGxpbmUgeDE9IjU1NSIgeTE9IjQzOCIgeDI9IjY0NSIgeTI9IjQzOCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNjUpIiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgoKICA8IS0tIOamguW/teWQjSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjQ5OCIgZm9udC1zaXplPSI4NiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7mjZ/lpLHlh73mlbA8L3RleHQ+CgogIDwhLS0g5Ymv5qCH6K+GIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iNTYyIiBmb250LXNpemU9IjM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiCiAgICAgICAgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="损失函数封面" />

损失函数（loss function）是机器学习里用来衡量「模型预测得有多不准」的一个数：预测离真实答案越远，这个数越大；完全猜中，这个数最小（通常是 0）。它还有个近义名叫**代价函数**（cost function），日常基本混用。

打个比方：模型在参加一场「预测考试」，每道题它给出答案，损失函数就是阅卷老师——不直接告诉你正确答案是什么，只给你**扣分**。答案离谱就狠狠扣，接近正确就少扣。模型的目标，就是反复练习，把这份扣分压到最低。

## 它在 AI 体系里的位置

损失函数属于机器学习的**核心基石**之一，和它形影不离的两个伙伴是：

- **梯度下降**——告诉模型「往哪个方向调，扣分才能变小」。它需要损失函数先算出扣分，再倒推出每个参数该怎么动。
- **优化器**（optimizer）——决定「每次具体走多大一步、怎么走」，是执行调整动作的角色。常见的有 SGD、Adam。

> 这里有个词叫**参数**（parameter），可以理解为模型内部的「旋钮」——训练就是在拧这些旋钮，让预测变准。而**梯度**（gradient）就是损失对每个旋钮「往哪个方向拧会变小」的指示。

三者串起来就是一次训练：**损失函数打分 → 梯度下降指方向 → 优化器迈步子**，循环往复直到扣分不再下降。可以说，损失函数是整个训练流程的「发令枪」——没有它，模型根本不知道该往哪儿学。

## 两种最常用的损失函数

任务不同，阅卷标准也不同。深度学习里最常用的有两类。

### MSE：回归任务的标尺

回归（预测一个连续的数值，比如房价、气温）最常用**均方误差**（Mean Squared Error, MSE）：

$$\text{MSE} = \frac{1}{n}\sum_{i=1}^{n}(y_i - \hat{y}_i)^2$$

**符号解读**：

- $y_i$ —— 第 $i$ 个样本的真实值（标准答案）
- $\hat{y}_i$ —— 模型对这个样本的预测值（头顶的帽子 $\hat{}$ 是「估计」的意思）
- $(y_i - \hat{y}_i)^2$ —— 误差的平方。平方有两个作用：① 让正负误差不抵消 ② 错得越离谱罚得越狠，平方把大误差放大
- $n$ —— 样本总数，$\frac{1}{n}$ 就是求平均

**通俗理解**：把每个预测的偏差平方后求平均。对应「扣分」——偏差越大，平方后扣分涨得越快，是「非线性加重处罚」。

### 交叉熵：分类任务的标尺

分类（预测属于哪一类，比如识别图片是猫还是狗）最常用**交叉熵损失**（Cross-Entropy Loss）。二分类的版本是：

$$L = -[y\log\hat{y} + (1-y)\log(1-\hat{y})]$$

**符号解读**：

- $y$ —— 真实标签，1 表示正类（比如真是猫），0 表示负类
- $\hat{y}$ —— 模型预测「是正类」的概率（0 到 1 之间）
- $\log$ —— 对数函数，作用是「概率越接近 0，惩罚越趋于无穷大」
- 整个式子用 $y$ 和 $(1-y)$ 做开关：真实是 1 时只算前半段，真实是 0 时只算后半段

**通俗理解**：模型把真答案的概率压得越低，扣分越狠（对数让低概率被重罚）。比如真是猫（$y=1$），模型却说只有 10% 是猫（$\hat{y}=0.1$），损失就会很大；猜 90% 是猫，损失就很小。

### 一个计算示例：MSE 怎么算

假设预测 3 套房子的价格（万元）：

| 样本 | 真实价 $y$ | 预测价 $\hat{y}$ | 误差 $y-\hat{y}$ | 误差平方 |
|---|---|---|---|---|
| 房 1 | 300 | 280 | 20 | 400 |
| 房 2 | 500 | 550 | -50 | 2500 |
| 房 3 | 200 | 210 | -10 | 100 |

代入公式：$\text{MSE} = \frac{400 + 2500 + 100}{3} = \frac{3000}{3} = 1000$

自检：所有误差平方都非负，平均 1000 也非负 ✓。房 2 偏差最大（-50），贡献了 2500 的扣分——平方放大了大错，符合「错得越离谱罚越重」。

## PyTorch 里怎么写

在 PyTorch 里，损失函数是 `torch.nn` 模块下现成的类，直接实例化就能用：

```python
import torch
import torch.nn as nn

# MSE：回归任务用
mse_loss = nn.MSELoss()              # 均方误差，nn.MSELoss 是 PyTorch 内置类
# 交叉熵：分类任务用（注意：它内部自带 softmax，直接喂原始得分 logits 即可）
ce_loss = nn.CrossEntropyLoss()      # 交叉熵，传预测的原始得分和真实类别编号
```

穿插在训练里就一行 `loss = loss_fn(预测, 真实)`，算出损失后交给 `backward()` 自动算梯度，再由优化器更新参数——上一节讲的「打分 → 指方向 → 迈步」就落地了。

## 完整代码

下面用 MSE 训练一个极小的线性模型，让它学会「一个数的两倍」这个规律。整体流程是：**造数据 → 搭模型 → 反复练习（预测→扣分→反向→更新）→ 考试看学会没**。

```python
import torch
import torch.nn as nn

# ===== 任务：教模型学会「y = 2x」这个规律 =====
torch.manual_seed(42)
x_train = torch.linspace(1, 10, 20).reshape(-1, 1)   # 输入：1 到 10 的 20 个数
y_train = 2 * x_train                                  # 真实答案：每个数的两倍

# ===== 定义模型：一个最简单的线性层 y = w·x + b =====
model = nn.Linear(1, 1)                 # nn.Linear(输入维度1, 输出维度1)：最简单的线性变换
opt = torch.optim.SGD(model.parameters(), lr=0.01)   # 优化器：根据梯度调整参数，lr 是步长
loss_fn = nn.MSELoss()                  # 损失函数：均方误差（本文讲的那把回归标尺）

# ===== 训练：反复看样本、扣分、调整，直到学会 =====
for epoch in range(300):
    pred = model(x_train)               # 模型预测
    loss = loss_fn(pred, y_train)       # 用 MSE 算「扣分」（损失函数的核心作用）
    opt.zero_grad()                     # 清空上一轮的梯度
    loss.backward()                     # 反向传播：自动算每个参数该往哪调（梯度下降的依据）
    opt.step()                          # 优化器迈一步：用梯度更新 w 和 b

# ===== 测试：模型学会「两倍」了吗？=====
test_x = torch.tensor([[5.0]])
print(f"输入 5，模型预测：{model(test_x).item():.2f}（标准答案 10）")
print(f"训练结束时的 loss：{loss.item():.4f}")
```

运行输出约为 `输入 5，模型预测：10.00（标准答案 10）`——读者能看到模型真的从随机参数学到了「两倍」规律，而损失函数（`loss_fn`）一直在背后打分、驱动每一次调整。

## 小结

一句话浓缩：**损失函数是给模型预测「扣分」的阅卷老师，它把「有多不准」变成一个数，驱动整个学习过程。** 回归找 MSE，分类找交叉熵，记住这两把标尺，就抓住了 90% 的日常用法。

## 参考资料

1. Deep Learning (Goodfellow 等) 第 5/6 章：基于似然的损失函数 - 经典教材，从最大似然推出 MSE 与交叉熵的统一根源
   https://ickma2311.github.io/ML/likelihood-loss-functions.html
2. Loss Functions in Deep Learning: A Comprehensive Review - arXiv 2025 综述论文
   https://arxiv.org/html/2504.04242v1
3. PyTorch 官方文档：Loss Functions - torch.nn 模块下所有损失函数的 API 说明
   https://pytorch.org/docs/stable/nn.html#loss-functions
