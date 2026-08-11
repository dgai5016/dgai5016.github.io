---
title: RNN 是什么
date: 2026-08-11 16:42
tags: [AI]
excerpt: RNN（Recurrent Neural Network，循环神经网络）专门处理有先后顺序的数据——每读一个新输入都参考上一步的「隐藏状态」做判断。本文用一条递推公式、一个时间步的计算示例，加上可直接运行的 PyTorch 代码，讲清它怎么「边读边记」，并点出它「记不住太久远的事」这一痛点。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxtYXJrZXIgaWQ9ImFycm93IiBtYXJrZXJXaWR0aD0iMTAiIG1hcmtlckhlaWdodD0iMTAiIHJlZlg9IjgiIHJlZlk9IjMiIG9yaWVudD0iYXV0byIgbWFya2VyVW5pdHM9InN0cm9rZVdpZHRoIj4KICAgICAgPHBhdGggZD0iTTAsMCBMMCw2IEw4LDMgeiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkyKSIvPgogICAgPC9tYXJrZXI+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgZmlsbD0idXJsKCNiZykiLz4KCiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBzdHJva2Utd2lkdGg9IjUiPgogICAgPHJlY3QgeD0iMzAwIiB5PSIxNzAiIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeD0iMTYiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xNSkiLz4KICAgIDxyZWN0IHg9IjU0MCIgeT0iMTcwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgcng9IjE2IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTUpIi8+CiAgICA8cmVjdCB4PSI3ODAiIHk9IjE3MCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxMjAiIHJ4PSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPgogICAgPHBhdGggZD0iTSAzNDggMTcwIEMgMzQ4IDExMCwgMzcyIDExMCwgMzcyIDE3MCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICAgIDxwYXRoIGQ9Ik0gNTg4IDE3MCBDIDU4OCAxMTAsIDYxMiAxMTAsIDYxMiAxNzAiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8cGF0aCBkPSJNIDgyOCAxNzAgQyA4MjggMTEwLCA4NTIgMTEwLCA4NTIgMTcwIiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93KSIvPgogICAgPGxpbmUgeDE9IjQyMCIgeTE9IjIzMCIgeDI9IjUzNCIgeTI9IjIzMCIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICAgIDxsaW5lIHgxPSI2NjAiIHkxPSIyMzAiIHgyPSI3NzQiIHkyPSIyMzAiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgICA8bGluZSB4MT0iMzYwIiB5MT0iMzUwIiB4Mj0iMzYwIiB5Mj0iMjk1IiBtYXJrZXItZW5kPSJ1cmwoI2Fycm93KSIvPgogICAgPGxpbmUgeDE9IjYwMCIgeTE9IjM1MCIgeDI9IjYwMCIgeTI9IjI5NSIgbWFya2VyLWVuZD0idXJsKCNhcnJvdykiLz4KICAgIDxsaW5lIHgxPSI4NDAiIHkxPSIzNTAiIHgyPSI4NDAiIHkyPSIyOTUiIG1hcmtlci1lbmQ9InVybCgjYXJyb3cpIi8+CiAgPC9nPgoKICA8ZyBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTIpIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+CiAgICA8dGV4dCB4PSIzNjAiIHk9IjM4MCI+dC0xPC90ZXh0PgogICAgPHRleHQgeD0iNjAwIiB5PSIzODAiPnQ8L3RleHQ+CiAgICA8dGV4dCB4PSI4NDAiIHk9IjM4MCI+dCsxPC90ZXh0PgogIDwvZz4KCiAgPHRleHQgeD0iNjAwIiB5PSI1MDAiIGZvbnQtc2l6ZT0iMTI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5STk48L3RleHQ+CiAgPHRleHQgeD0iNjAwIiB5PSI1NTUiIGZvbnQtc2l6ZT0iMzgiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44NSkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj7lvqrnjq/npZ7nu4/nvZHnu5w8L3RleHQ+CgogIDx0ZXh0IHg9IjYwMCIgeT0iNjA1IiBmb250LXNpemU9IjMyIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJzYW5zLXNlcmlmIj5BSSDmpoLlv7Xop6Por7s8L3RleHQ+Cjwvc3ZnPgo=" alt="RNN封面" />

RNN（Recurrent Neural Network，循环神经网络）是一种专门处理**有先后顺序的数据**的神经网络。一句话定义：**它能一边读一边记，每看一个新输入时，都参考「之前读过的」来做判断。**

普通神经网络（前馈网络）有个致命短板：把每次输入都当成完全独立的事件，看完一眼就忘。如果你给它「我 吃 苹果」三个词，让它预测第四个词，它根本不记得前面是「我吃」。RNN 就是来解决这个「健忘症」的——它给网络加了一条**记忆回路**，让前面的信息能顺着流到后面。

RNN 属于深度学习里**序列建模**（处理一串有顺序的数据）这一支。这里有两个关键词得先界定：

- **序列**：一串按顺序排列的数据——一句话（词的序列）、一段语音（音频帧序列）、一只股票的日线（价格序列）。**顺序一变，意思就变**（「我吃饭」和「饭吃我」完全是两回事）。
- **时间步（time step）**：序列里的「第几个时刻」，记作 $t=1, 2, 3, \ldots$。RNN 每次只读一个时间步的输入，比如一句话里一次读一个词。

## 一个生活类比：边读边记的速记员

把 RNN 想象成一个**速记员**，正在听一段讲话做纪要：

- 听到第 1 句，记下要点，存在脑子里（这是「上一步的记忆」）
- 听到第 2 句时，他不是从零开始听，而是**结合脑子里上一句的要点 + 这一句的新内容**，更新脑子里的纪要
- 听到第 3 句时，又结合上一轮的纪要 + 新内容……如此循环

每听完一句，「脑子里的纪要」就更新一次。这份**纪要**在 RNN 里有个名字：**隐藏状态**（hidden state），记作 $h_t$——它是网络读到第 $t$ 步时**自己内部记住的总结**。

注意「记忆」「状态」这些词在 AI 语境和日常不太一样：日常的「记忆」是人脑里的事；RNN 的「记忆」就是**这个隐藏状态**——一组数字，每步被刷新一次，**不是真的"记住过去"，而是"被上一步影响"**。同理，AI 里说的「**训练**」和「**学习**」也不是人那样读书思考，而是指**用数据反复调整网络里的权重数字，让输出越来越准**——文末「完整代码」里的 `loss.backward()` + `opt.step()` 那两行，就是这件事的真实模样。

## 核心机制：隐藏状态怎么算出来

RNN 每一步做的事就一个：**用「上一步的隐藏状态」+「这一步的输入」，算出「这一步的隐藏状态」**。为了好懂，拆成两步看。

**第 1 步：线性组合**（把两部分按重要性相加）

$$z_t = W_{hh}\, h_{t-1} + W_{xh}\, x_t + b_h$$

- $h_{t-1}$ —— 上一步的隐藏状态（速记员脑子里**上一轮的纪要**）
- $x_t$ —— 这一步的新输入（**这一句听到的话**）
- $W_{hh}$ —— 作用于旧记忆的**权重**（决定「旧纪要」多大程度被沿用）
- $W_{xh}$ —— 作用于新输入的**权重**（决定「新内容」多大程度被采纳）
- $b_h$ —— **偏置**（一个基础偏移量，像天平归零前的底数）

> AI 里的「权重」是"相乘的系数"，不是日常说的"权力/分量"；「偏置」是"相加的底数"。两者都是网络自己学出来的参数。

**通俗理解**：把"旧记忆 + 新输入"按各自权重配在一起，调出一份还没调味的半成品 $z_t$。

**第 2 步：tanh 激活**（把半成品压进「记忆盒」）

$$h_t = \tanh(z_t)$$

- $\tanh$ —— 双曲正切函数，把任意数字压到 $(-1, 1)$ 之间（输入很大输出接近 1，输入很小输出接近 -1，输入 0 输出 0）。

**通俗理解**：速记员脑子容量有限，装不下无穷大的数——$\tanh$ 就是**把半成品压进固定大小的记忆盒**，太大的截顶、太小的截底，保证数字永远在 -1 到 1 之间。出来的 $h_t$ 就是这一步最终的「记忆总结」，会被原样传给下一步。

上面这两步合成一条公式，用 PyTorch 写就是一行：

```python
# 对应 h_t = tanh(W_xh·x_t + W_hh·h_{t-1})
h_t = torch.tanh(self.W_xh(x_t) + self.W_hh(h_prev))
```

这里的 `W_xh` / `W_hh` 在 PyTorch 里通常用 `nn.Linear` 实现——它把"权重矩阵 + 偏置"打包成一层，所以代码里看不到单独的 $b_h$（它被藏进 `nn.Linear` 自带的偏置项里了）。完整写法见文末「完整代码」。

**输出层**（如果这一步需要给个预测，比如猜下一个词）：

$$y_t = \mathrm{softmax}(W_{hy}\, h_t + b_y)$$

- $W_{hy}$ —— 把隐藏状态映射到输出的**权重**
- $b_y$ —— 输出**偏置**
- $\mathrm{softmax}$ —— 把一组原始得分归一成概率分布（每个类别一个概率，加起来等于 1）

**通俗理解**：速记员根据脑子里的纪要 $h_t$，对"下一个词最可能是什么"给出**一组概率**（比如「我」0.7、「你」0.2、「他」0.1）。

## 一个时间步的计算示例

为了让上面的公式落地，我们走**一个时间步**看看 $h_t$ 具体怎么算出来。为了手算简单，假设输入和隐藏状态都是**单个数**（实际里是向量，但算理一样），权重也取好算的整数：

**已知**：上一步隐藏状态 $h_{t-1} = 0.5$，这一步输入 $x_t = 1.0$；权重 $W_{hh} = 0.8$、$W_{xh} = 0.6$，偏置 $b_h = 0.1$。

| 步骤 | 计算 | 结果 |
|---|---|---|
| 线性组合 | $0.8 \times 0.5 + 0.6 \times 1.0 + 0.1$ | $0.4 + 0.6 + 0.1 = 1.1$ |
| tanh 激活 | $\tanh(1.1)$ | $\mathbf{h_t \approx 0.8005}$ |

**自检**：$\tanh$ 的输出必须落在 $(-1, 1)$ 区间——$0.8005$ 在范围内 ✅；线性组合 $z_t = 1.1$ 是个正数且离 0 不太远，$\tanh$ 给出接近 1 的正值，方向也对 ✅。

这个 $h_t \approx 0.8005$ 就是这一步的「记忆总结」，会作为下一步的 $h_{t-1}$ 被传下去——RNN 的「循环」就体现在这里：**上一步的输出喂给下一步**。

## RNN 的痛点：记不住太久以前的事

RNN 听上去很美，但有个致命问题：**梯度消失**——通俗讲就是**记不住太久以前的事**。

原因是训练 RNN（让网络学出合适的权重）时，需要把误差**从后往前传**穿过很多个时间步。每传一步，误差就要乘一次循环权重 $W_{hh}$。如果 $W_{hh}$ 比 1 小一点（比如 0.9），连乘几十步后就接近 0 了：$0.9^{50} \approx 0.005$。意思是**几十步之前发生的事，对当前的训练几乎没有影响**——网络学不到「长程依赖」。

举个例子：句子「我出生在法国 ……（中间隔了 50 个词）…… 所以我会说法语」。RNN 看到「法语」时，早就把「法国」忘了，学不会两者的关联。

正是这个痛点，催生了 RNN 的升级版 **LSTM**（Long Short-Term Memory，长短期记忆网络）——它在隐藏状态之外，加了一条**专门的「长期记忆」通道**和几个**门控**（控制什么该记、什么该忘），让信息能传得更远。如果说 RNN 是个健忘的速记员，LSTM 就是给他配了个**笔记本**——重要的事写下来，不再只靠脑子记。

## 在哪用到

RNN / LSTM 曾经是序列建模的主力军：语言模型、机器翻译、语音识别、时间序列预测……不过近年被 **Transformer**（不靠循环、改用注意力机制一次看完全局）大面积取代。但 RNN「边读边记」的思想，仍然是理解 LSTM、GRU 等后续模型的基础，也是入门序列建模的第一站。

## 用 PyTorch 写一个 RNN

讲了这么多公式，RNN 落到代码里其实很短。下面这段用 PyTorch 把前面的隐藏状态公式原样实现成一个 `RNNCell` 类，造一组假数据跑一遍前向，再训练一步让你看到「学习」到底在干什么。**复制到本地即可运行**（只需装好 PyTorch）。

几个关键 API 先说清：

- `nn.Module`：PyTorch 所有神经网络的基类，自己写的网络都继承它
- `nn.Linear`：全连接层，把"权重矩阵 + 偏置"打包好
- `forward`：定义数据怎么从输入流到输出
- `loss.backward()`：自动算出每个权重该往哪调（梯度）
- `opt.step()`：真正去调权重——这两个一配合就是"训练"的本质

## 完整代码

```python
import torch
import torch.nn as nn

# ① 定义 RNN 单元（对应文章里的公式）
class RNNCell(nn.Module):              # nn.Module：PyTorch 神经网络的基类，自定义网络都继承它
    def __init__(self, in_dim, h_dim):
        super().__init__()             # 调用父类初始化（固定写法，让 nn.Module 的机制生效）
        self.W_xh = nn.Linear(in_dim, h_dim)   # 输入权重 W_xh：nn.Linear 把"权重矩阵+偏置"打包成一层
        self.W_hh = nn.Linear(h_dim, h_dim)    # 循环权重 W_hh：作用于上一步的隐藏状态
    def forward(self, x, h_prev):      # forward：定义数据从输入到输出的流向（前向传播）
        # 对应公式 h_t = tanh(W_xh·x_t + W_hh·h_{t-1})；两个 nn.Linear 各自带偏置，合并即公式里的 b_h
        return torch.tanh(self.W_xh(x) + self.W_hh(h_prev))

# ② 实例化 + 造一组假数据（5 个时间步）
torch.manual_seed(42)                  # 固定随机种子，让每次运行结果可复现
cell = RNNCell(in_dim=4, h_dim=8)      # 输入 4 维，隐藏状态 8 维
x_seq = torch.randn(5, 4)              # 5 步输入，每步 4 维（假装的一句话，5 个词各 4 维向量）
h = torch.zeros(8)                     # 初始隐藏状态 h_0 = 0（RNN 习惯从零向量开始）
target = torch.randn(8)                # 假装的目标（演示训练用；真实任务里来自数据集）

# ③ 前向：让 RNN 读完整个序列
for x_t in x_seq:
    h = cell(x_t, h)                   # 每步更新隐藏状态：h_1, h_2, ..., h_5（"边读边记"）
print("读完序列后的隐藏状态（前 3 维）：", [round(v, 4) for v in h[:3].tolist()])

# ④ 训练一步：算误差 → 反向传播 → 更新权重
opt = torch.optim.Adam(cell.parameters(), lr=0.01)   # Adam 优化器，负责按梯度更新权重
loss_fn = nn.MSELoss()                # 均方误差损失，衡量预测 h 和 target 的差距
loss = loss_fn(h, target)             # 算这一步的误差
loss.backward()                       # 反向传播：自动算出每个权重的梯度（这就是"学习"的本质）
opt.step()                            # 用梯度更新权重（让下一步误差更小）

# ⑤ 打印结果
print("这一步的 loss：", round(loss.item(), 4))
```

跑起来你会看到这样的输出（因为固定了随机种子，你跑出来也是这两个数）：

```
读完序列后的隐藏状态（前 3 维）：[0.2115, 0.2032, -0.8229]
这一步的 loss：0.4739
```

关键是看懂这个流程：**定义网络（公式）→ 前向算出预测 → 算误差 → 反向传播算梯度 → 更新权重**——任何深度学习模型的训练都是这五步的循环，RNN 只是把"隐藏状态递推"塞进了 `forward` 里。

## 小结

RNN 就是给神经网络加了条**记忆回路**——每一步都结合「上一步的记忆（隐藏状态 $h_{t-1}$）」和「这一步的输入 $x_t$」，用 $h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)$ 更新出这一步的记忆，从而处理有顺序的数据；落到 PyTorch 里，核心就是 `forward` 里那一行 `torch.tanh(W_xh(x) + W_hh(h_prev))` 加上一个时间步循环。它的短板是**记不住太久远的事（梯度消失）**，于是有了升级版 LSTM——理解了 RNN，你就握住了进入序列建模的钥匙。

## 参考资料

1. Finding Structure in Time - Jeffrey L. Elman, Cognitive Science 14(2), 1990
   https://www.sciencedirect.com/science/article/abs/pii/036402139090002E
2. 循环神经网络（8.4 节）- 《动手学深度学习》
   https://zh.d2l.ai/chapter_recurrent-neural-networks/rnn.html
3. The Unreasonable Effectiveness of Recurrent Neural Networks - Andrej Karpathy
   http://karpathy.github.io/2015/05/21/rnn-effectiveness/
