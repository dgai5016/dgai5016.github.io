---
title: 交叉熵是什么
date: 2026-08-12 14:02
tags: [AI]
excerpt: 模型预测一张图是猫 70%、狗 20%、鸟 10%，但怎么用一个数告诉它「离正确答案还差多远」？交叉熵就是那把量「预测概率分布」与「真实标签分布」差异的尺子。它和信息熵只差一个字母，one-hot 标签下退化成「正确类概率的负对数」，和 softmax 组合后梯度干净成 ŷ − y——这正是它成为几乎所有分类任务标准损失的原因。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOmhtumDqOWJr+agh+mimO+8mueCueWHuiLooaHph4/kuKTkuKrliIbluIPnmoTlt67lvIIiIC0tPgogIDx0ZXh0IHg9IjYwMCIgeT0iOTIiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyOCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjg4KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgbGV0dGVyLXNwYWNpbmc9IjMiPuihoemHj+S4pOS4quWIhuW4g+eahOW3ruW8gjwvdGV4dD4KCiAgPCEtLSDlt6bkvqfvvJrnnJ/lrp7liIbluIMgcO+8iG9uZS1ob3TvvJrkuK3pl7TkuIDmoLnmu6Hpq5jvvIzlhbbkvZnkuLogMO+8iSAtLT4KICA8dGV4dCB4PSIyNzAiIHk9IjIwMCIgZm9udC1mYW1pbHk9IlBpbmdGYW5nIFNDLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+55yf5a6e5YiG5biDIHA8L3RleHQ+CiAgPGxpbmUgeDE9IjE0MCIgeTE9IjQzMCIgeDI9IjQwMCIgeTI9IjQzMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuNDUpIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8cmVjdCB4PSIxNzIiIHk9IjQyMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiByeD0iMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjI4KSIvPgogIDxyZWN0IHg9IjI0OCIgeT0iMjUwIiB3aWR0aD0iNTAiIGhlaWdodD0iMTgwIiByeD0iNCIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSIzMjQiIHk9IjQyMCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjEwIiByeD0iMyIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjI4KSIvPgoKICA8IS0tIOWPs+S+p++8mumihOa1i+WIhuW4gyBx77yI5LiJ5qC55YiG5pWj55qE5p+x5a2Q77yJIC0tPgogIDx0ZXh0IHg9IjgxMCIgeT0iMjAwIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjYiIGZvbnQtd2VpZ2h0PSI2MDAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7pooTmtYvliIbluIMgcTwvdGV4dD4KICA8bGluZSB4MT0iNjgwIiB5MT0iNDMwIiB4Mj0iOTQwIiB5Mj0iNDMwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC40NSkiIHN0cm9rZS13aWR0aD0iMiIvPgogIDxyZWN0IHg9IjcxMiIgeT0iMzIwIiB3aWR0aD0iNTAiIGhlaWdodD0iMTEwIiByeD0iNCIgZmlsbD0iI2Q0ZDBmZiIvPgogIDxyZWN0IHg9Ijc4OCIgeT0iMjc4IiB3aWR0aD0iNTAiIGhlaWdodD0iMTUyIiByeD0iNCIgZmlsbD0iI2Q0ZDBmZiIvPgogIDxyZWN0IHg9Ijg2NCIgeT0iMzUwIiB3aWR0aD0iNTAiIGhlaWdodD0iODAiIHJ4PSI0IiBmaWxsPSIjZDRkMGZmIi8+CgogIDwhLS0g5Lit6Ze077ya5Y+M5ZCR566t5aS0ICsgSChwLHEpIOagh+ivhuW3ruW8giAtLT4KICA8dGV4dCB4PSI1NDAiIHk9IjMyNSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSIzMiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkgocCwgcSk8L3RleHQ+CiAgPGxpbmUgeDE9IjQyMCIgeTE9IjM0NSIgeDI9IjY2MCIgeTI9IjM0NSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI0MjAsMzQ1IDQzNCwzMzggNDM0LDM1MiIgZmlsbD0id2hpdGUiLz4KICA8cG9seWdvbiBwb2ludHM9IjY2MCwzNDUgNjQ2LDMzOCA2NDYsMzUyIiBmaWxsPSJ3aGl0ZSIvPgogIDx0ZXh0IHg9IjU0MCIgeT0iMzc1IiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+6LaK5YOP6LaK5L2OPC90ZXh0PgoKICA8IS0tIOamguW/teWQjSAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjUyMCIgZm9udC1zaXplPSI5MiIgZm9udC13ZWlnaHQ9ImJvbGQiIGZpbGw9IndoaXRlIgogICAgICAgIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJQaW5nRmFuZyBTQywgc2Fucy1zZXJpZiI+5Lqk5Y+J54a1PC90ZXh0PgoKICA8IS0tIOWJr+agh+ivhiAtLT4KICA8dGV4dCB4PSI2MDAiIHk9IjU4MCIgZm9udC1zaXplPSIzMiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgyKSIKICAgICAgICB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iUGluZ0ZhbmcgU0MsIHNhbnMtc2VyaWYiIGxldHRlci1zcGFjaW5nPSI2Ij5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="交叉熵封面" />

你训练一个识图模型，给它看一张猫的图，它吐出一组概率：猫 70%、狗 20%、鸟 10%。猫的概率最高，看上去学得不错。但问题来了——你怎么用**一个数**告诉模型「你这次预测得离正确答案还差多远」？模型只会顺着这个数去调整自己，这个数给得不合适，它就学歪了。

把「预测」和「真相」的差距压成一个数，正是**交叉熵**（Cross-Entropy）干的事。它是几乎所有分类任务（图像识别、文本分类、语音转文字……）的标准损失函数，和 softmax 是一对黄金搭档。

先把预测和真相都看成一份「概率预算单」。真相很干脆：这张图 100% 是猫，所以真实分布是把所有预算都给猫、其余给 0；预测那份则分散在猫狗鸟三类上。交叉熵就是量这两份单子「差多大」的尺子——预测越像真相，分数越低；越偏离，分数越高。

## 先从信息熵说起：一个分布「有多确定」

交叉熵的前置概念是**信息熵**（information entropy）。铺垫一下，因为它和交叉熵只差一个字母。

气象局预报明天的天气，可能有三种表态：

- 「100% 下雨」——完全确定
- 「50% 下雨」——拿不准
- 「33% 下雨」——更不确定

一个分布越集中（概率堆在一个选项上），就越确定；越平均（概率分散到各选项），就越乱。信息熵就是量化这种「不确定程度」的数：

$$H(p) = -\sum_{i=1}^{K} p_i \log p_i$$

**符号解读**：

- $p = (p_1, \ldots, p_K)$：一个概率分布，共 $K$ 个类别，每个 $p_i$ 是第 $i$ 类的概率，全部加起来等于 1
- $p_i$：第 $i$ 类在分布里占的概率
- $\log$：对数函数（深度学习里通常取自然对数 $\ln$）。当 $0 < p_i < 1$ 时 $\log p_i$ 是负数
- 前面的负号：把 $\log$ 的负数翻成正数，让最终结果非负
- 求和 $\sum$：把每个类别的贡献加起来

**通俗理解**：分布越平均，$H(p)$ 越大（越乱、越不确定）；分布越集中，$H(p)$ 越小。极端情况——某个 $p_i = 1$、其余为 0（完全确定）——信息熵为 0。直觉上，信息熵就是一个分布「内在的不确定性」。

## 交叉熵：拿预测去「量」真相

交叉熵只把信息熵公式里的一个字符换掉：把「分布自己描述自己」的 $p_i \log p_i$，换成「用预测分布 $q$ 去描述真实分布 $p$」的 $p_i \log q_i$：

$$H(p, q) = -\sum_{i=1}^{K} p_i \log q_i$$

**符号解读**：

- $p_i$：真实分布里第 $i$ 类的概率（真相）
- $q_i$：预测分布里第 $i$ 类的概率（模型的猜测）
- $\log q_i$：模型给第 $i$ 类的「确信程度」——$q_i$ 越接近 1，$\log q_i$ 越接近 0；$q_i$ 越接近 0，$\log q_i$ 越趋向负无穷
- 用 $p_i$ 加权求和：真相越看重哪几类（$p_i$ 大），就重点看模型在那几类上预测得准不准（$q_i$ 大不大）

**通俗理解**：真相觉得重要的类别，模型也得给够概率；模型把真相看重的类预测得越准，交叉熵越小。一个关键性质：$H(p, q) \geq H(p)$，当且仅当 $q = p$（预测和真相完全一样）时取等号。所以**最小化交叉熵，等价于逼着预测分布 $q$ 去逼近真实分布 $p$**——这正是分类训练想要的。（严格说 $H(p,q) = H(p) + \mathrm{KL}(p \| q)$，多出来的 KL 散度衡量两个分布的差异，本文不展开，记住这个等价关系即可。）

## 分类里的简化：one-hot 标签让公式缩成一行

分类任务的真实标签通常是 **one-hot**（独热）编码：正确类别概率为 1，其余全为 0。比如真相是「猫」，三类问题里 $p = (1, 0, 0)$。

把这个 $p$ 代回交叉熵公式，由于 $p$ 里只有正确类 $c$ 的 $p_c = 1$、其他都是 0，那些乘以 0 的项全消失了，公式瞬间缩成：

$$L = -\log q_c$$

也就是说，**one-hot 标签下，交叉熵 = 模型给正确类预测的概率取负对数**。模型给正确类的概率越高（$q_c$ 接近 1），$-\log q_c$ 越接近 0；给得越低（比如 $q_c = 0.01$），$-\log 0.01 \approx 4.6$，损失越大。这个形式也叫**负对数似然**（Negative Log-Likelihood, NLL）——最大化模型给正确答案的概率，等价于最小化它的负对数。

### 计算示例：两个模型比一比

还是识别一张猫的图，真相是猫，所以 $p = (1, 0, 0)$。看两个模型的预测：

| 模型 | $q_\text{猫}$ | $q_\text{狗}$ | $q_\text{鸟}$ | 交叉熵损失 $-\log q_\text{猫}$ |
|---|---|---|---|---|
| 模型 A | 0.7 | 0.2 | 0.1 | $-\log 0.7 \approx 0.357$ |
| 模型 B | 0.3 | 0.4 | 0.3 | $-\log 0.3 \approx 1.204$ |

模型 A 给猫的概率高（0.7），损失小（0.357）；模型 B 给猫的概率低（0.3），损失大（1.204）。

**自检**：两个损失都非负 ✓；给正确类概率越高、损失越小 ✓；若 $q_\text{猫} = 1$，则 $-\log 1 = 0$（完全猜对时损失为 0）✓。注意极端情况：若模型给正确类概率是 0，$-\log 0 = \infty$——交叉熵对「把正确答案彻底否定」的惩罚是无穷大，这是它训练分类模型的关键优势之一。

## 和 Softmax 是黄金搭档：梯度干净成 $\hat{y} - y$

分类模型的输出层通常长这样：网络先吐一组原始得分（logits $z$），再用 softmax 把它变成一组加起来等于 1 的概率 $\hat{y}$，最后用交叉熵算损失。

softmax + 交叉熵组合后，损失对原始得分 $z$ 的梯度有一个著名且极简的结论：

$$\frac{\partial L}{\partial z} = \hat{y} - y$$

也就是**预测概率减真实标签**（$\hat{y}$ 是 softmax 输出，$y$ 是 one-hot 真实标签）。这个式子干净得惊人——预测错了多少，梯度就指多少回去修正。

比如真相是猫（$y = (1, 0, 0)$），模型预测 $\hat{y} = (0.7, 0.2, 0.1)$，梯度就是 $(0.7-1,\ 0.2-0,\ 0.1-0) = (-0.3,\ 0.2,\ 0.1)$：负号表示「猫的得分该往上调」（损失随 $z_\text{猫}$ 增大而减小），狗和鸟的得分该往下调。

正因为推导简洁、数值稳定、训练信号直接，PyTorch 把这两步合成一个 API：`nn.CrossEntropyLoss`（内部先做 softmax 再算交叉熵）。你喂它原始 logits，它自动处理一切。一个常见坑：如果模型 `forward` 里已经手动加了 softmax，再喂给 `CrossEntropyLoss` 等于做了两次 softmax，模型会学坏。

## 和 MSE 对比：为什么分类任务不用 MSE

均方误差 $\text{MSE} = \frac{1}{n}\sum(y_i - \hat{y}_i)^2$ 是回归任务（预测房价那种连续数值）的标配。那分类为什么不用它？三个关键原因：

- **梯度饱和，学得慢（最致命）**：分类模型最后一层通常套 softmax 或 sigmoid，这俩函数在输出接近 0 或 1 时曲线很平（梯度趋近 0）。MSE 配合它们时，损失对参数的梯度里会乘上这个接近 0 的因子，导致模型**尤其在预测严重偏离时反而学不动**——而那恰恰是最该使劲学的时候。交叉熵和 softmax 组合后梯度是 $\hat{y} - y$，不带这条「平尾巴」，训练信号一路通畅。
- **概率语义不匹配**：MSE 衡量的是「数值差」，但分类预测的是概率。把正确类的概率从 0.01 提到 0.1，和从 0.9 提到 0.99，难度和意义都不同——前者是「从几乎全错到开始摸到边」，后者是「从很对到更对」。交叉熵里的 $\log$ 正好捕捉这种「概率越接近 0，惩罚越陡」的非线性代价。
- **优化曲面更友好**：MSE 配合 sigmoid/softmax 会让损失曲面多出局部最小，优化容易卡住；交叉熵配合 softmax 的曲面更光滑，容易收敛到好解。

一句话：MSE 适合「预测一个数」，交叉熵适合「预测一个概率分布」——分类任务输出的是分布，所以选交叉熵。

## 完整代码

下面这段代码训练一个 3 分类小模型（4 维特征 → 猫 / 狗 / 鸟），演示 `nn.CrossEntropyLoss` 怎么用、怎么对上公式。整体流程：**搭网络（吐 logits）→ 备假数据 → 训练多轮（CrossEntropyLoss 内部 softmax + 交叉熵算损失 → 反向 → 更新）→ 测试看学会没**。带着这个地图读下面的逐行注释：

```python
import torch
import torch.nn as nn

# ===== 任务：4 维特征 → 3 分类（猫 / 狗 / 鸟）=====
class Classifier(nn.Module):            # nn.Module：所有神经网络模块的基类，自定义网络都继承它
    def __init__(self, in_dim, num_classes):
        super().__init__()
        # 全连接层：把输入特征映射到 num_classes 个原始得分（logits）
        self.fc = nn.Linear(in_dim, num_classes)

    def forward(self, x):
        # 关键坑：这里故意不加 softmax！
        # 因为 nn.CrossEntropyLoss 内部会先 softmax 再算交叉熵，
        # 这里再加一次等于做了两次 softmax，模型会学坏。
        return self.fc(x)               # 输出 logits z（对应公式里的 z）

torch.manual_seed(42)                   # 固定随机种子，让每次运行结果一样（可复现）

model = Classifier(in_dim=4, num_classes=3)
# CrossEntropyLoss = softmax + 交叉熵 H(p, q)，喂整数标签时内部自动转 one-hot
loss_fn = nn.CrossEntropyLoss()
opt = torch.optim.SGD(model.parameters(), lr=0.1)   # SGD 优化器，lr 是步长

# ===== 假数据：3 个样本，标签分别是猫(0)、狗(1)、鸟(2) =====
x = torch.randn(3, 4)                   # torch.randn：生成标准正态分布随机数当假特征
y = torch.tensor([0, 1, 2])             # 真实类别编号（0/1/2）；CrossEntropyLoss 直接收这种整数标签

# ===== 训练 60 轮，看损失怎么降 =====
for epoch in range(60):
    logits = model(x)                   # 前向：得到 logits（没加 softmax）
    loss = loss_fn(logits, y)           # 算交叉熵：内部先 softmax 得 q̂，再按 -log q̂_正确类 求平均
    opt.zero_grad()                     # 清空上一轮的梯度
    loss.backward()                     # 反向传播：自动算每个参数的梯度（梯度结论就是 ŷ − y）
    opt.step()                          # 优化器走一步：用梯度更新参数

# ===== 测试：看模型对训练样本的预测概率 =====
with torch.no_grad():                   # 推理阶段不需要算梯度，关掉省内存
    logits = model(x)
    probs = torch.softmax(logits, dim=1)    # 手动套 softmax 看概率；dim=1 表示按行归一化（每行和为 1）
    preds = probs.argmax(dim=1)             # argmax：挑每行最大值的序号作为预测类别
    print(f"预测概率:\n{probs}")
    print(f"预测类别: {preds.tolist()}（标准答案 [0, 1, 2]）")
    print(f"训练结束 loss: {loss.item():.4f}")
```

运行后你会看到：随训练轮次推进 loss 逐渐下降，最终 `preds` 接近 `[0, 1, 2]`（三个样本都分对了），`probs` 每行最大的那个都落在正确类别上——`CrossEntropyLoss` 配合 softmax 真的驱动模型学会了这个 3 分类任务。

## 小结

一句话浓缩：**交叉熵是衡量「预测概率分布」与「真实标签分布」差异的尺子；one-hot 标签下它退化成「正确类概率的负对数」，和 softmax 组合后梯度干净成 $\hat{y} - y$，让分类训练又快又稳——这就是它成为几乎所有分类任务标准损失的原因。** 下次你看到 `nn.CrossEntropyLoss`，就知道它内部正悄悄做 softmax + 交叉熵，用一把「概率的尺子」量出模型离真相还差多远。

## 参考资料

1. Softmax Regression — Dive into Deep Learning（李沐等，经典教材，从最大似然推出交叉熵）
   https://d2l.ai/chapter_linear-classification/softmax-regression.html
2. A Gentle Introduction to Cross-Entropy for Machine Learning — Machine Learning Mastery（从信息熵讲到交叉熵的入门长文）
   https://machinelearningmastery.com/cross-entropy-for-machine-learning/
3. 深度学习——Softmax 与交叉熵：从原理到梯度推导 - 博客园（含 $\hat{y} - y$ 梯度的完整推导）
   https://www.cnblogs.com/smartljy/p/18819629
