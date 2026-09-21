---
title: AutoHarness：通过自动合成代码 Harness 改进 LLM 智能体
date: 2026-09-20 23:19
layout: post
---

> 原文：[AutoHarness: improving LLM agents by automatically synthesizing a code harness](https://arxiv.org/pdf/2603.03329)
> 作者：Xinghua Lou 等 · 发表：2026-02

> **导读**：Google DeepMind 团队（Kevin P. Murphy 等）的智能体方法论文。核心结论：Gemini-2.5-Flash 借助 Thompson 采样树搜索与环境反馈，自动合成代码 harness，在 145 个 TextArena 游戏中杜绝全部非法动作，让小模型反超 Gemini-2.5-Pro；推向极端可合成完整代码策略，测试时零 LLM 调用仍胜过 GPT-5.2-High。适合关注 LLM 智能体可靠性、代码合成与测试时自我改进的读者阅读。

## 摘要

尽管语言模型在过去几年取得了显著进展，但当它们被用作智能体时，往往会尝试执行一些不仅对当前状态而言欠优、而且被外部环境严格禁止的动作。例如，在最近的 Kaggle GameArena 国际象棋比赛中，Gemini-2.5-Flash 有 78% 的失利被归因于非法动作。为防止这类失败，人们通常围绕 LLM 手工编写「harness」（脚手架/执行环境）。本文证明，Gemini-2.5-Flash 只需根据（游戏）环境的反馈进行少量轮次的迭代代码精炼，便能自动合成这样的代码 harness。所得 harness 在 145 个不同的 TextArena 游戏（含单人游戏与双人游戏）中杜绝了全部非法动作，使规模更小的 Gemini-2.5-Flash 胜过 Gemini-2.5-Pro 等更大的模型。将这一技术推向极限，我们可以让 Gemini-2.5-Flash 用代码生成整个策略，从而在决策时刻彻底无需调用 LLM。所得的代码策略在 16 个 TextArena 单人游戏上获得了比 Gemini-2.5-Pro 和 GPT-5.2-High 更高的平均奖励。我们的结果表明，用更小的模型合成定制的代码 harness（或完整策略），既能胜过规模大得多的模型，也更经济。

## 1 引言

大语言模型（LLM）在代码合成与数学问题求解上已展现出卓越能力（参见例如 (1; 4)）。然而，它们的规划与推理性能可能相当脆弱（参见例如 (16; 12)）。例如，在最近的 Kaggle GameArena (5) 国际象棋比赛中，Gemini 2.5 Flash 有 78% 的失利并非源于战略失误，而是源于简单的非法动作。

这一失败模式凸显了模型表面上的游戏理解与其实际遵守规则的能力之间的脱节（参见例如 (13) 中的图 A16）。更一般的问题是：如何知道在给定状态下哪些动作才是有效的——这被称为「动作可适用性」（action applicability）问题，AI 规划社区对此早有研究 (6)。缓解这一问题的传统手段包括：在游戏轨迹上微调，或使用手工编写的 harness 来验证一步动作是否有效。微调 LLM——尤其是以当前旗舰模型的规模——既不快也不经济，还可能损害模型在其他任务（如指令遵循）上的表现。手工设计的 harness 脆弱且费时费力，每新增一个游戏都要额外的开发工作。一条更具可扩展性的路线——也是本文所采取的——是利用 LLM 自身的代码生成能力来弥合这一鸿沟。

智能体通常被定义为特定 LLM 与一个 harness 的组合，后者充当模型与待解决任务之间的「胶水」或「管道」。在本工作中，我们提出「代码即 harness」（code as harness）框架：由 LLM 自己动手编写 harness，从而补全整个智能体。在最简单的形态下，这个 harness 可以看作一个控制循环：调用 LLM，并拒绝不可接受的回答。至于什么算「可接受」，其定义本身也是学出来的。这在本质上构成了一个面向 LLM 的拒绝采样器，其中的条件化（conditioning）依据任务学习而得。

我们把该 harness 的生成表述为程序空间上的一个搜索问题。与简单的迭代式提示不同，我们采用 Thompson 采样 (15) 引导的树搜索，高效探索潜在 harness 的全景。在这一设置中，LLM 充当变异算子，基于执行反馈提出代码的修改方案。搜索算法在探索（尝试不同的逻辑结构）与利用（精炼一个部分可用的 harness）之间权衡，最终收敛到一个稳健的控制循环。harness 模板可以约束得更紧（例如一个固定的拒绝采样循环，只学习一个签名为 def is_legal_action() 的条件化函数），也可以放得更开——最大灵活性的极端便是「代码即策略」（code-as-policy）设定 (9)：代码直接提出下一个动作，执行时无需任何 LLM 调用。

## 2 相关工作

将 LLM 作为智能体用于游戏环境已被广泛研究，游戏类型从文字冒险游戏到 Minecraft、国际象棋等复杂策略游戏不等 (14; 18)。早期工作聚焦于用「思维链」提示 (19) 改进战略规划。然而，近期的基准测试揭示：即便是最先进的模型，在严格定义的环境中仍难以做好状态跟踪与有效性判断 (17)。「思维树」(20) 一类技术在推理期间借助搜索来模拟前瞻，但它们依赖 LLM 内部的世界模型，而该模型对有效状态转换很容易产生幻觉。我们的工作与之不同：把状态转换的有效性检查交给一个外部的、可验证的程序，而不是依赖模型内部的模拟。LLM 也可以用来为某个游戏生成完整状态转换函数（即世界模型）的代码 (7)，但对于那些本可采用相对简单策略的复杂游戏来说，这种做法过于繁重；此外，它也没有利用 LLM 在有效动作之间进行选择的战略能力。

我们的方法建立在「用代码生成做动作规划」这一不断增长的系列工作之上。Voyager (18) 证明，LLM 可以把可执行代码存入技能库，从而持续学习 Minecraft 技能。类似地，Eureka (10) 表明 LLM 能执行进化搜索，为强化学习生成奖励函数。与本文更接近的是「代码即策略」(9)，它把机器人控制直接表述为代码生成。我们的方法与之相关，但基于树搜索与丰富的环境反馈做迭代代码精炼，生成的是代码+LLM 的混合 harness。

如前所述，迭代精炼对代码生成至关重要。Reflexion (14) 引入了一个言语强化学习循环，让智能体对失败日志进行反思。在程序合成领域，AlphaCode (8) 一类方法利用大规模采样与过滤，而 AlphaEvolve (11) 则以 LLM 为变异函数，对整个代码库运行进化算法。我们的方法把这些概念整合进一个遵循 (15) 的结构化 Thompson 采样树搜索，并将其应用于在线、多轮的设定，目标是创建一个代码 harness。

## 3 方法

受 (15) 启发，我们的方法在树结构中维护多个代码假设，并用 Thompson 采样决定下一步精炼哪个节点；每个节点的启发式值取合法动作的平均准确率。精炼（一个免梯度的代码优化器）由基础 LLM 完成：它接收环境（critic，批评者）的反馈——先前尝试的动作是否合法、产生了什么奖励（若有）——流程参见图 1。若 is_legal_action() 返回 True 但动作无效，我们同时精炼两个函数；若 is_legal_action() 返回 False 且动作无效，则只需精炼 propose_action()。

我们可以用这一方法生成不同类型的代码 harness：harness 作动作过滤器（harness-as-action-filter）调用 propose_action() 生成一组合法动作，再借助 LLM 对其排序（可辅以思维链推理）；harness 作动作验证器（harness-as-action-verifier）先调用 LLM 生成动作，用 is_legal_action() 验证，若无效，则用一条附带『非法动作』警告的新提示重复该过程；harness 即策略（harness-as-policy）则用代码直接选定动作。代码原则上可以调用 LLM，但在我们的设定中，策略只使用原生 Python 函数与 numpy 等标准库，因此推理时无需调用 LLM。本文主要聚焦 harness 作动作验证器，不过在 4.3 节我们也会报告 harness 即策略的初步结果。

## 4 实验结果

在实验中，我们从 TextArena (3)——一个由复杂多样的文字游戏组成的大型集合——里选出全部单人（1P）与双人（2P）游戏，但排除了 9 个动作空间为自由文本/对话的游戏（如「Mafia」与「Codenames」）。这样共得到 145 个游戏，其中包括国际象棋、西洋跳棋、二十一点、数独等知名游戏，以及它们的新式变体。我们所用游戏的完整清单见附录表 1。

为了让问题对我们的 harness 更具挑战性，我们修改了部分游戏：手工删除观测字符串中一切形式的「Available Moves」（可用动作）提示（示例见附录 A.4 节）。我们认为这更贴近许多真实场景——智能体需要从环境反馈中推断合法动作，而不是被明确告知。（若不做这一修改，harness 大可以直接从提示中复制合法动作列表，那样结果会更好，但我们将证明这并无必要。）

### 4.1 训练

我们的训练设置（针对 harness 作动作验证器）如下。每次迭代使用 10 个并行环境，rollout 至多 1000 步（环境自动重置）。一旦代码走出非法动作或代码执行失败，rollout 即告终止。我们采样至多 5 个失败步骤交给 Critic（批评者），由它归并各种类型的错误。这些步骤连同错误信息，再与原始代码一起送入 Refiner（精炼器），生成新的（希望有所改进的）代码。Thompson 采样的启发式权重设为 1.0。当启发式值（即合法动作成功率）达到 1.0 或超时，训练即告结束。训练使用 Gemini-2.5-Flash。

平均而言，训练在 14.5 次树搜索迭代后结束，而 32 个游戏中有 19 个在不到 10 次迭代内完成。学习所需 LLM 调用次数最多的游戏是 GermanWhist-v0（2P）、Cryptarithm-v0（1P）、Othello-v0（2P）和 Chess-v0（2P），如图 2 所示。我们通过把动作过滤器应用于全新的测试 rollout（长度 1000，每个游戏 10 个随机种子），并统计其中合法动作的比例，来衡量其准确率。如附录表 1 所示，我们在全部游戏上都取得了 100% 的合法动作成功率。生成的代码 harness 示例见附录 D 节。

### 4.2 评估

接下来评估智能体在实际对局中的表现。出于效率考虑，我们只报告 16 个 1P 游戏与 16 个 2P 游戏的结果，而没有使用全部 145 个游戏。我们评估以下智能体：Gemini-2.5-Flash、Gemini-2.5-Pro 与 Gemini-2.5-Flash+Harness（我们的方法）。需要说明的是，我们的方法先用一个 LLM（此处为 Gemini-2.5-Flash）生成动作验证器代码 harness，再用该 harness 过滤来自同一 LLM 的动作提议。所有实验使用同一个优化过的提示。1P 游戏每个运行 20 局，以奖励作为评估指标；2P 游戏以随机种子运行 40 局，我方作为先手与后手的对局各占一半，并以平均胜/平/负率作为评估指标。

2P 游戏的结果见图 3。可以看到，我们的方法让规模小得多的 Gemini-2.5-Flash 在对阵规模大得多的 Gemini-2.5-Pro 时赢下 9/16 个游戏（总胜率 56.3%，后者总胜率为 38.2%）。对阵（原生）Gemini-2.5-Flash 时，我们赢下 12/16 个游戏，总胜率升至 64.8%。

1P 游戏的结果见图 4。我们的方法在 8/16 个游戏上取得了比 Gemini-2.5-Pro 更高的奖励，另有 5/16 个游戏战平。平均而言，我们获得 0.745 的奖励，作为对比，Gemini-2.5-Pro 为 0.707，Gemini-2.5-Flash 为 0.673。

### 4.3 Harness 即策略

作为极端情形，我们考虑把整个策略学成代码，从而在测试时彻底不再需要 LLM。我们在 16 个 1P 游戏上做此评估（因为对 2P 游戏而言，以代码形式学出完整策略要困难得多：双人游戏需要对对手的策略进行战略推理，这在运行时往往要用到 MCTS 一类的方法（参见例如 (2)）；原则上我们的代码合成方法能够生成这样的策略，但那还需要像 (7) 那样学出一个可供搜索的代码世界模型，这对文字游戏颇具挑战）。除上述智能体外，我们另评估三个新智能体：GPT-5.2（no thinking，不思考模式）、GPT-5.2-High（high thinking，高强度思考模式）与 Harness 即策略（我们的方法）。与之前一样，每个智能体在每个游戏上评估 20 次；出于成本考虑，GPT-5.2 与 GPT-5.2-High 例外，分别只重复 10 次和 5 次。

训练时，我们修改了启发式值以纳入奖励。具体而言，若走了非法动作则设 $H=0$，否则设 $H=0.5+0.5r$，其中 $r\in[0.0,1.0]$ 为环境奖励，它只在轨迹结束时才可获知（稀疏奖励设定）。我们用 Gemini-2.5-Flash 以我们的代码合成方法训练 Harness 即策略，至多 256 轮迭代。平均而言，训练用时 89.4 轮迭代，达到 0.939 的启发式值。

如图 5 所示，我们的方法取得了最高的平均奖励（0.870），胜过包括 GPT-5.2（0.635）、Gemini-2.5-Pro（0.707）与 GPT-5.2-High（0.844）在内的所有其他智能体。逐游戏来看，我们赢下 3/16 个游戏，GPT-5.2-High 赢下 5/16 个，其余 8/16 个战平（细节见附录）。由于 Harness 即策略生成的是纯（Python）代码，我们的测试时成本近乎为零，而 GPT-5.2 与 GPT-5.2-High 实验的花费约为 640 美元。

## 5 结论与未来工作

我们提出了一种通过自动合成代码 harness 来改进 LLM 智能体表现的新方法。目前，我们为每个环境（游戏）生成一个独立的 harness。未来，我们希望把由此得到的领域专家（智能体）蒸馏回基础 LLM，使整个系统具备递归自我改进的能力。我们还希望探索构建一个可复用的 harness 库，并把该方法应用到更具挑战性的多模态游戏上，例如 Craftax（https://github.com/MichaelTMatthews/Craftax）与 Terra Nova（https://github.com/trevormcinroe/terra_nova/）。

## 附录 A TextArena 游戏

### A.1 全部 145 个游戏的清单

| 序号 | 游戏 | 玩家人数 | 学习步数 | 合法动作率 |
| --- | --- | --- | --- | --- |
| 0 | 2048-v0* | 1 | 27 | 1.0 |
| 1 | 2048-v0-easy | 1 | 4 | 1.0 |
| 2 | 2048-v0-extreme | 1 | 44 | 1.0 |
| 3 | 2048-v0-hard | 1 | 47 | 1.0 |
| 4 | 2048-v0-mega-easy | 1 | 31 | 1.0 |
| 5 | 2048-v0-super-easy | 1 | 6 | 1.0 |
| 6 | 2048-v0-ultra-easy | 1 | 2 | 1.0 |
| 7 | 2048-v0-very-easy | 1 | 57 | 1.0 |
| 8 | 2048-v0-very-hard | 1 | 7 | 1.0 |
| 9 | Alquerque-v0* | 2 | 4 | 1.0 |
| 10 | Bandit-v0* | 1 | 2 | 1.0 |
| 11 | Bandit-v0-hard | 1 | 1 | 1.0 |
| 12 | Battleship-v0 | 2 | 4 | 1.0 |
| 13 | Battleship-v0-extreme | 2 | 32 | 1.0 |
| 14 | Battleship-v0-large | 2 | 9 | 1.0 |
| 15 | Battleship-v0-standard | 2 | 6 | 1.0 |
| 16 | Blackjack-v0* | 1 | 2 | 1.0 |
| 17 | Blackjack-v0-long | 1 | 1 | 1.0 |
| 18 | Breakthrough-v0* | 2 | 2 | 1.0 |
| 19 | Breakthrough-v0-blind | 2 | 20 | 1.0 |
| 20 | Breakthrough-v0-large | 2 | 9 | 1.0 |
| 21 | Breakthrough-v0-long | 2 | 7 | 1.0 |
| 22 | Breakthrough-v0-small | 2 | 136 | 1.0 |
| 23 | Breakthrough-v0-tiny | 2 | 5 | 1.0 |
| 24 | Briscola-v0 | 2 | 2 | 1.0 |
| 25 | Checkers-v0* | 2 | 7 | 1.0 |
| 26 | Checkers-v0-long | 2 | 3 | 1.0 |
| 27 | Chess-v0* | 2 | 64 | 1.0 |
| 28 | Chess-v0-blind | 2 | 19 | 1.0 |
| 29 | Chess-v0-long | 2 | 16 | 1.0 |
| 30 | Chopsticks-v0* | 2 | 15 | 1.0 |
| 31 | Chopsticks-v0-long | 2 | 7 | 1.0 |
| 32 | Chopsticks-v0-medium | 2 | 15 | 1.0 |
| 33 | ColonelBlotto-v0 | 2 | 1 | 1.0 |
| 34 | ColonelBlotto-v0-extreme | 2 | 1 | 1.0 |
| 35 | ColonelBlotto-v0-large | 2 | 1 | 1.0 |
| 36 | ColonelBlotto-v0-small | 2 | 1 | 1.0 |
| 37 | ConnectFour-v0 | 2 | 10 | 1.0 |
| 38 | ConnectFour-v0-blind | 2 | 2 | 1.0 |
| 39 | ConnectFour-v0-large | 2 | 1 | 1.0 |
| 40 | Crusade-v0* | 2 | 4 | 1.0 |
| 41 | Cryptarithm-v0* | 1 | 45 | 1.0 |
| 42 | FifteenPuzzle-v0* | 1 | 3 | 1.0 |
| 43 | FrozenLake-v0* | 1 | 19 | 1.0 |
| 44 | FrozenLake-v0-hardcore | 1 | 4 | 1.0 |
| 45 | FrozenLake-v0-random | 1 | 22 | 1.0 |
| 46 | GameOfPureStrategy-v0 | 2 | 3 | 1.0 |
| 47 | GermanWhist-v0* | 2 | 43 | 1.0 |
| 48 | Golf-v0* | 2 | 8 | 1.0 |
| 49 | Golf-v0-medium | 2 | 9 | 1.0 |
| 50 | GuessTheNumber-v0* | 1 | 2 | 1.0 |
| 51 | GuessTheNumber-v0-hardcore | 1 | 2 | 1.0 |
| 52 | HighSociety-v0 | 2 | 3 | 1.0 |
| 53 | IndianPoker-v0 | 2 | 11 | 1.0 |
| 54 | IndianPoker-v0-extreme | 2 | 2 | 1.0 |
| 55 | IndianPoker-v0-long | 2 | 26 | 1.0 |
| 56 | IndianPoker-v0-medium | 2 | 7 | 1.0 |
| 57 | IndianPoker-v0-short | 2 | 2 | 1.0 |
| 58 | IteratedMatchingPennies-v0 | 2 | 1 | 1.0 |
| 59 | IteratedRockPaperScissors-v0 | 2 | 1 | 1.0 |
| 60 | IteratedTwoThirdsAverage-v0 | 2 | 1 | 1.0 |
| 61 | KuhnPoker-v0 | 2 | 5 | 1.0 |
| 62 | KuhnPoker-v0-extreme | 2 | 3 | 1.0 |
| 63 | KuhnPoker-v0-long | 2 | 2 | 1.0 |
| 64 | KuhnPoker-v0-medium | 2 | 2 | 1.0 |
| 65 | KuhnPoker-v0-short | 2 | 3 | 1.0 |
| 66 | LiarsDice-v0* | 2 | 4 | 1.0 |
| 67 | LiarsDice-v0-large | 2 | 6 | 1.0 |
| 68 | LiarsDice-v0-small | 2 | 5 | 1.0 |
| 69 | LightsOut-v0* | 1 | 1 | 1.0 |
| 70 | LinesOfAction-v0* | 2 | 23 | 1.0 |
| 71 | Mastermind-v0* | 1 | 2 | 1.0 |
| 72 | Mastermind-v0-extreme | 1 | 1 | 1.0 |
| 73 | Mastermind-v0-hard | 1 | 2 | 1.0 |
| 74 | MemoryGame-v0 | 2 | 3 | 1.0 |
| 75 | MemoryGame-v0-hard | 2 | 2 | 1.0 |
| 76 | MemoryGame-v0-medium | 2 | 2 | 1.0 |
| 77 | Minesweeper-v0* | 1 | 11 | 1.0 |
| 78 | Minesweeper-v0-hard | 1 | 6 | 1.0 |
| 79 | Minesweeper-v0-medium | 1 | 10 | 1.0 |
| 80 | Minesweeper-v0-small | 1 | 2 | 1.0 |
| 81 | NewRecruit-v0* | 2 | 2 | 1.0 |
| 82 | Nim-v0 | 2 | 1 | 1.0 |
| 83 | Nim-v0-large | 2 | 2 | 1.0 |
| 84 | Nim-v0-medium | 2 | 2 | 1.0 |
| 85 | Othello-v0* | 2 | 62 | 1.0 |
| 86 | Othello-v0-big | 2 | 2 | 1.0 |
| 87 | Othello-v0-hard | 2 | 30 | 1.0 |
| 88 | Othello-v0-huge | 2 | 12 | 1.0 |
| 89 | Othello-v0-small | 2 | 5 | 1.0 |
| 90 | Othello-v0-tiny | 2 | 13 | 1.0 |
| 91 | PegJump-v0* | 1 | 1 | 1.0 |
| 92 | PigDice-v0 | 2 | 1 | 1.0 |
| 93 | PigDice-v0-100 | 2 | 1 | 1.0 |
| 94 | PigDice-v0-150 | 2 | 1 | 1.0 |
| 95 | PigDice-v0-200 | 2 | 1 | 1.0 |
| 96 | PigDice-v0-250 | 2 | 1 | 1.0 |
| 97 | PigDice-v0-300 | 2 | 1 | 1.0 |
| 98 | PigDice-v0-350 | 2 | 1 | 1.0 |
| 99 | PigDice-v0-400 | 2 | 1 | 1.0 |
| 100 | PigDice-v0-450 | 2 | 1 | 1.0 |
| 101 | PigDice-v0-50 | 2 | 1 | 1.0 |
| 102 | PigDice-v0-500 | 2 | 1 | 1.0 |
| 103 | PigDice-v0-long | 2 | 1 | 1.0 |
| 104 | PigDice-v0-short | 2 | 1 | 1.0 |
| 105 | Poker-v0 | 2 | 17 | 1.0 |
| 106 | Poker-v0-extreme | 2 | 7 | 1.0 |
| 107 | Poker-v0-long | 2 | 5 | 1.0 |
| 108 | Poker-v0-small | 2 | 29 | 1.0 |
| 109 | QuantumTicTacToe-v0 | 2 | 12 | 1.0 |
| 110 | ReverseTicTacToe-v0 | 2 | 3 | 1.0 |
| 111 | RushHour-v0* | 1 | 3 | 1.0 |
| 112 | SantoriniBaseFixed-v0 | 2 | 30 | 1.0 |
| 113 | Secretary-v0* | 1 | 1 | 1.0 |
| 114 | Secretary-v0-long | 1 | 1 | 1.0 |
| 115 | SimpleTak-v0 | 2 | 4 | 1.0 |
| 116 | SimpleTak-v0-extreme | 2 | 8 | 1.0 |
| 117 | SimpleTak-v0-large | 2 | 12 | 1.0 |
| 118 | SimpleTak-v0-medium | 2 | 5 | 1.0 |
| 119 | Snake-v0 | 2 | 1 | 1.0 |
| 120 | Snake-v0-large | 2 | 1 | 1.0 |
| 121 | Snake-v0-standard | 2 | 1 | 1.0 |
| 122 | Sokoban-v0* | 1 | 5 | 1.0 |
| 123 | Sokoban-v0-medium | 1 | 1 | 1.0 |
| 124 | SpiteAndMalice-v0* | 2 | 33 | 1.0 |
| 125 | Stratego-v0* | 2 | 23 | 1.0 |
| 126 | Sudoku-v0* | 1 | 5 | 1.0 |
| 127 | Sudoku-v0-easy | 1 | 5 | 1.0 |
| 128 | Sudoku-v0-hard | 1 | 9 | 1.0 |
| 129 | Sudoku-v0-medium | 1 | 4 | 1.0 |
| 130 | Sudoku-v0-very-easy | 1 | 4 | 1.0 |
| 131 | Surround-v0 | 2 | 1 | 1.0 |
| 132 | Surround-v0-large | 2 | 1 | 1.0 |
| 133 | Surround-v0-standard | 2 | 1 | 1.0 |
| 134 | Tak-v0* | 2 | 21 | 1.0 |
| 135 | Tak-v0-hard | 2 | 53 | 1.0 |
| 136 | Tak-v0-medium | 2 | 6 | 1.0 |
| 137 | TicTacToe-v0 | 2 | 4 | 1.0 |
| 138 | TowerOfHanoi-v0* | 1 | 7 | 1.0 |
| 139 | TowerOfHanoi-v0-extreme | 1 | 44 | 1.0 |
| 140 | TowerOfHanoi-v0-hard | 1 | 7 | 1.0 |
| 141 | TowerOfHanoi-v0-hardcore | 1 | 2 | 1.0 |
| 142 | TowerOfHanoi-v0-medium | 1 | 7 | 1.0 |
| 143 | UltimateTicTacToe-v0* | 2 | 13 | 1.0 |
| 144 | WildTicTacToe-v0 | 2 | 10 | 1.0 |

表 1：全部 145 个 TextArena 游戏的清单，包含所学 harness 的准确率以及达到该准确率所需的 LLM 调用次数。用于端到端智能体评估的 32 个游戏以 * 标注。

### A.2 逐游戏奖励

![图 6：TextArena 1P 逐游戏奖励。](/papers/autoharness/fig1.png)

### A.3 逐游戏合法动作率

![图 7：TextArena 1P 逐游戏合法动作成功率。](/papers/autoharness/fig2.png)

### A.4 示例游戏：Chess-v0

本节演示我们如何从观测中移除合法动作列表。

## 附录 C Harness 函数签名

### C.2 Harness 即策略

我们沿用与上文相同的函数签名，仅 propose_action() 的 docstring 有所不同：

## 附录 D Harness 代码示例片段

### D.1 Minesweeper-v0

Minesweeper-v0 的 propose_action() 代码片段将策略分解为三步：检查第一步走法、通过逻辑推理找出必定安全的格子、以及用概率启发式做出最优猜测。注意，此处展示的并非完整的代码 harness。

### D.2 Chess-v0

Chess-v0 中一些有意思的代码片段，包括通用国际象棋接口（UCI）的解析与格式化、棋子定位以及攻击检查。注意，此处展示的并非完整的代码 harness。
