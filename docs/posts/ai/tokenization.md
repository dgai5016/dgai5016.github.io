---
title: Token 与分词是什么
date: 2026-08-12 14:06
tags: [AI]
excerpt: 大模型并不直接读文字，而是先把文本切成一个个 token。按词切词表会爆炸、生词全是未知符；按字切序列太长、语义被拆碎。本文对比三种分词思路，重点讲清 BPE 字节对编码——靠高频整词保留、低频拆零件的合并策略，把词表大小和未登录词问题同时压在甜点区，这就是它成为 GPT、BERT 等主流大模型默认分词方案的根本原因。
layout: post
---

<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAwIiBoZWlnaHQ9IjYzMCIgdmlld0JveD0iMCAwIDEyMDAgNjMwIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjNmM2M2ZmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2E3OGJmYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjMwIiBmaWxsPSJ1cmwoI2JnKSIvPgoKICA8IS0tIOi+k+WFpeaWh+acrOadoe+8muS4gOautei/nue7reacquWIh+WIhueahOaWh+acrCAtLT4KICA8cmVjdCB4PSIyNjAiIHk9IjE1MCIgd2lkdGg9IjY4MCIgaGVpZ2h0PSI2NCIgcng9IjE0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMTQpIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KCiAgPCEtLSDmlofmnKzmnaHph4znmoQgNiDkuKrlrZfnrKbmoIforrDvvIjlsI/nmb3lnIbop5LlnZfku6Pooajov57nu63lrZfnrKbvvIkgLS0+CiAgPHJlY3QgeD0iMzI1IiB5PSIxNjciIHdpZHRoPSIzOCIgaGVpZ2h0PSIzMCIgcng9IjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIvPgogIDxyZWN0IHg9IjQyNyIgeT0iMTY3IiB3aWR0aD0iMzgiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiLz4KICA8cmVjdCB4PSI1MzAiIHk9IjE2NyIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIi8+CiAgPHJlY3QgeD0iNjMyIiB5PSIxNjciIHdpZHRoPSIzOCIgaGVpZ2h0PSIzMCIgcng9IjUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC45KSIvPgogIDxyZWN0IHg9IjczNSIgeT0iMTY3IiB3aWR0aD0iMzgiIGhlaWdodD0iMzAiIHJ4PSI1IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOSkiLz4KICA8cmVjdCB4PSI4MzciIHk9IjE2NyIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjkpIi8+CgogIDwhLS0g5Lik5p2h5YiH5YiG6Jma57q/77yIdG9rZW4g6L6555WM77yJKyDpobbpg6jlsI/kuInop5Lku6PooajliIfliIAgLS0+CiAgPGxpbmUgeDE9IjQ5NyIgeTE9IjE0MCIgeDI9IjQ5NyIgeTI9IjMwMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNyA2Ii8+CiAgPGxpbmUgeDE9IjcwMiIgeTE9IjE0MCIgeDI9IjcwMiIgeTI9IjMwMCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOTUpIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWRhc2hhcnJheT0iNyA2Ii8+CiAgPHBvbHlnb24gcG9pbnRzPSI0ODksMTI4IDUwNSwxMjggNDk3LDE0MCIgZmlsbD0id2hpdGUiLz4KICA8cG9seWdvbiBwb2ludHM9IjY5NCwxMjggNzEwLDEyOCA3MDIsMTQwIiBmaWxsPSJ3aGl0ZSIvPgoKICA8IS0tIOS4ieS4quWQkeS4i+eureWktO+8muaWh+acrOadoSDihpIgdG9rZW4g54mH5q61IC0tPgogIDxsaW5lIHgxPSIzOTUiIHkxPSIyMjQiIHgyPSIzOTUiIHkyPSIzMjgiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiBzdHJva2Utd2lkdGg9IjMiLz4KICA8cG9seWdvbiBwb2ludHM9IjM4NywzMjIgNDAzLDMyMiAzOTUsMzM0IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiLz4KICA8bGluZSB4MT0iNjAwIiB5MT0iMjI0IiB4Mj0iNjAwIiB5Mj0iMzI4IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPHBvbHlnb24gcG9pbnRzPSI1OTIsMzIyIDYwOCwzMjIgNjAwLDMzNCIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIi8+CiAgPGxpbmUgeDE9IjgwNSIgeTE9IjIyNCIgeDI9IjgwNSIgeTI9IjMyOCIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIHN0cm9rZS13aWR0aD0iMyIvPgogIDxwb2x5Z29uIHBvaW50cz0iNzk3LDMyMiA4MTMsMzIyIDgwNSwzMzQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIvPgoKICA8IS0tIOS4ieS4qiB0b2tlbiDniYfmrrXljaHniYfvvIjliIfliIbnu5PmnpzvvIzkupLnm7jliIblvIDmmL7npLrliIbnprvmhJ/vvIkgLS0+CiAgPHJlY3QgeD0iMzA1IiB5PSIzNDAiIHdpZHRoPSIxODAiIGhlaWdodD0iNjYiIHJ4PSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE4KSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8cmVjdCB4PSIzMjUiIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSI0MjciIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KCiAgPHJlY3QgeD0iNTEwIiB5PSIzNDAiIHdpZHRoPSIxODAiIGhlaWdodD0iNjYiIHJ4PSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE4KSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8cmVjdCB4PSI1MzAiIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSI2MzIiIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KCiAgPHJlY3QgeD0iNzE1IiB5PSIzNDAiIHdpZHRoPSIxODAiIGhlaWdodD0iNjYiIHJ4PSIxNiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE4KSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz4KICA8cmVjdCB4PSI3MzUiIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KICA8cmVjdCB4PSI4MzciIHk9IjM1OCIgd2lkdGg9IjM4IiBoZWlnaHQ9IjMwIiByeD0iNSIgZmlsbD0id2hpdGUiLz4KCiAgPCEtLSDmpoLlv7XlkI0gLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI1MTUiIGZvbnQtc2l6ZT0iOTIiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPuWIhuivjTwvdGV4dD4KCiAgPCEtLSDlia/moIfor4YgLS0+CiAgPHRleHQgeD0iNjAwIiB5PSI1NzUiIGZvbnQtc2l6ZT0iMzQiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiPkFJIOamguW/teino+ivuzwvdGV4dD4KPC9zdmc+Cg==" alt="分词封面" />


你给 ChatGPT 发一句「我喜欢学 AI」，它并不是直接读懂这串中文字符的。在进入模型之前，这句话会先被切成一个个小块——就像把一串长文字剪成一张张短卡片。每一张卡片叫一个 **token**（中文常译「词元」），而剪切这个过程就是 **分词（tokenization）**。

生活里你其实见过类似的事：手机输入法打「人工智能」时，它会把你按的拼音 `ren`、`gong`、`zhi`、`neng` 自动对应到「人」「工」「智」「能」四个字。分词干的是同一件事——把连续的文本切成模型方便处理的基本单位，只不过切得更精细、更有讲究。

为什么要切？因为神经网络只能处理数字，不能直接吃文字。切完之后，每个 token 对应词表里的一个编号（比如「喜欢」是 8342），模型就能把这些编号换成向量去做后续计算。所以**分词是大模型接触文字的第一道关卡**，切得好不好，直接决定模型能不能高效、准确地理解你说了什么。

## 三种切法：按词、按字、按子词

切文本看起来简单，但怎么切却大有学问。历史上主要有三种思路。

### 按词切（Word Tokenization）

最直觉的做法：按空格和标点把句子切成一个个完整的词。比如 `"I love coding"` → `["I", "love", "coding"]`。

问题有两个：

- **词表爆炸**：英语动辄几十万词，加上变体（run/runs/running）、拼写错误、专有名词，词表会膨胀到上百万。中文没空格，还得先做分词，更麻烦。
- **未登录词（OOV, Out-Of-Vocabulary）**：训练时没见过的词（新人名、新网络用语、拼写错误），模型直接抓瞎——只能用一个 `<UNK>`（未知）符号代替，信息全丢了。

### 按字切（Character Tokenization）

另一个极端：一个字一个 token。`"I love coding"` → `["I", "l", "o", "v", "e", "c", "o", "d", "i", "n", "g"]`。

好处是词表极小（英文 26 个字母加标点，中文几千常用字就够），永远不会遇到 OOV——任何词都能用字符拼出来。

问题也很致命：

- **序列太长**：一句话切完 token 数量翻好几倍，模型要顺着更长的序列去理解，训练和推理都更慢更贵。
- **语义被拆散**：单个字母 `l`、`o`、`v`、`e` 几乎没语义，模型得自己从头学「`love` 这四个字母连起来是爱」——把压力全甩给了后续网络。

### 按子词切（Subword Tokenization）

有没有一种切法，既不像按词那样词表爆炸，又不像按字那样把语义拆碎？这就是 **子词（subword）**——把高频完整词保留成整体，低频或没见过的词拆成更小的有意义片段。

用一个经典例子感受一下：

```
"what's that"   →  ["what", "'s", "that"]
"unhappiness"   →  ["un", "happiness"]   或   ["un", "happ", "iness"]
"tokenization"  →  ["token", "ization"]
```

`what`、`that` 是高频词，整块保留；`'s` 是高频片段，单独成 token；`unhappiness` 这种低频长词被拆成 `un`（否定前缀）加 `happiness`，或进一步拆成 `un` + `happ` + `iness` 这种有意义的零件。结果：

- 高频词不被无谓拆碎，序列长度可控
- 低频词靠零件拼出来，彻底告别 OOV
- 词表大小可以人工设定（通常几万），不会爆炸

子词切法成了当前所有主流大模型（GPT 系列、LLaMA、BERT 等）的标准选择。其中最广泛使用的算法就是 **BPE（Byte Pair Encoding，字节对编码）**。

## BPE 是怎么工作的

BPE 的核心思想简单得可爱：**从字符开始，反复合并出现次数最多的相邻符号对，直到达到目标词表大小。**

训练一个 BPE 分词器的过程：

1. 把训练语料里所有词拆成单个字符，每个词末尾加一个结束符 `</w>`（标记词边界）。
2. 统计所有相邻符号对的出现次数。
3. 把出现次数最多的那一对合并成新符号，加进词表。
4. 回到第 2 步，重复 N 次（N 是你想要的合并轮数）。

### 手算一个小例子

假设语料里只有这几个词（括号是出现次数）：

```
low    (5)   →  l o w </w>
lower  (2)   →  l o w e r </w>
newest (6)   →  n e w e s t </w>
widest (3)   →  w i d e s t </w>
```

初始词表是所有字符：`l, o, w, e, r, n, s, t, i, d, </w>`。

**第 1 轮**：统计相邻字符对。`e` 后面跟 `s` 出现了 `6 + 3 = 9` 次（newest 6 次加 widest 3 次），是最多的。合并 `e + s → es`：

```
low    →  l o w </w>
lower  →  l o w e r </w>
newest →  n e w es t </w>     ← es 合并了
widest →  w i d es t </w>     ← es 合并了
```

**第 2 轮**：再统计，`es` 后面跟 `t` 出现了 `6 + 3 = 9` 次，最多。合并 `es + t → est`：

```
newest →  n e w est </w>
widest →  w i d est </w>
```

**第 3 轮**：`est` 后面跟 `</w>` 出现 9 次，合并 → `est</w>`。

继续下去，`low`、`new`、`wid` 这些片段会依次被合并成整体。最后你会得到一个词表：既有单个字符（兜底用，保证不会 OOV），也有 `est`、`low`、`new` 这种高频片段，还有完整的高频词。

切新文本时，就按学到的合并规则，能合并的尽量合并，合不动的剩下字符单列——所以**任何没见过的新词都能被表示**，最差退化成纯字符。

## 为什么 BPE 成了主流

回头看三种切法，BPE 胜在两个字：**平衡**。

| 切法 | 词表大小 | OOV 问题 | 序列长度 |
|------|---------|----------|----------|
| 按词 | 巨大（易百万级） | 严重，新词全是 `<UNK>` | 短 |
| 按字 | 极小（几十到几千） | 几乎没有 | 很长 |
| 子词（BPE） | 可控（几万） | 几乎没有 | 中等 |

对大模型来说，词表越大、模型最后一层输出头的参数越多（每个 token 都要一套参数）；序列越长、注意力计算的平方级开销越大。BPE 同时把这两个代价压在一个可接受的甜点区——这就是它从 2016 年被 Sennrich 等人提出后，迅速成为 GPT、BERT 乃至今天几乎所有大模型默认分词方法的原因。

补充一句：BPE 也有改进版本——OpenAI 在 GPT-2 之后改用 **Byte-level BPE**（在 UTF-8 字节而不是字符层面做合并），这样连多语言、emoji、特殊符号都能统一处理，真正实现「任何字符串都能被分词」。它的精神还是 BPE。

## 完整代码：一个极简 BPE

下面用 30 来行 Python 实现一个可跑的 BPE 训练核心循环，帮你把抽象的合并过程看清楚：

```python
import re
from collections import Counter

def get_stats(vocab):
    """统计 vocab 中所有相邻符号对的出现次数。
    vocab: dict，key 是空格分隔的符号串（如 'l o w </w>'），value 是该词频次。"""
    pairs = Counter()
    for word, freq in vocab.items():
        symbols = word.split()
        # 遍历相邻符号对，按词频加权累加
        for i in range(len(symbols) - 1):
            pairs[(symbols[i], symbols[i + 1])] += freq
    return pairs

def merge_pair(pair, vocab):
    """把 vocab 中所有出现的 pair 合并成一个新符号。"""
    # 用正则保证只合并边界完整的符号对（避免误伤其他符号）
    bigram = re.escape(' '.join(pair))
    pattern = re.compile(r'(?<!\S)' + bigram + r'(?!\S)')
    new_vocab = {}
    for word, freq in vocab.items():
        new_word = pattern.sub(''.join(pair), word)
        new_vocab[new_word] = freq
    return new_vocab

# 初始语料：词 -> 频次，每个词已拆成字符加结束符 </w>
vocab = {
    'l o w </w>': 5,
    'l o w e r </w>': 2,
    'n e w e s t </w>': 6,
    'w i d e s t </w>': 3,
}

num_merges = 10  # 想做多少轮合并
for i in range(num_merges):
    pairs = get_stats(vocab)
    if not pairs:
        break
    # 取频次最高的符号对
    best = max(pairs, key=pairs.get)
    print(f'第 {i + 1} 轮合并: {best} (频次 {pairs[best]})')
    vocab = merge_pair(best, vocab)

print('最终词表片段：', list(vocab.keys()))
```

跑一遍，你会清楚看到每一轮合并了哪一对、频次是多少，最终那些高频片段（`est`、`low`、`new` 等）是怎么从字符里「长」出来的。工业级分词器（HuggingFace tokenizers、OpenAI 的 tiktoken）核心逻辑与此同源，只是加了并行优化、字节级处理和大量工程细节。

## 小结

分词是大模型消化文字的第一步。按词切词表爆炸且怕生词，按字切序列过长且失语义，**子词切法（BPE 为代表）** 靠「高频整词保留、低频拆零件」的合并策略，把词表大小和未登录词问题同时压在一个甜点区——这就是它成为今天所有主流大模型默认分词方案的根本原因。理解了分词，你也就理解了为什么同样一句话不同模型的 token 数会不一样、为什么 API 按 token 计费——token 是大模型世界里的基本计量单位。

## 参考资料

1. Neural Machine Translation of Rare Words with Subword Units - Sennrich, Haddow & Birch（ACL 2016）
   https://aclanthology.org/P16-1162/
2. Byte-Pair Encoding Tokenization - HuggingFace LLM Course
   https://huggingface.co/learn/llm-course/en/chapter6/5
3. BPE Tokenizer From Scratch - Sebastian Raschka
   https://sebastianraschka.com/blog/2025/bpe-from-scratch.html
