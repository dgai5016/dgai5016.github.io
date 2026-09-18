# rules/ai-paper-translation.md：AI 论文翻译

把 arxiv 论文翻译成中文全文译文页，并收录进合集主文章《AI 论文翻译》（`docs/posts/ai/ai-papers.md`）。

## 输入

arxiv 链接 / arxiv ID / 论文标题任一种。给标题时先搜出 arxiv ID（WebSearch 或 arxiv API），**务必用实际搜到的 ID，不要凭记忆猜**（实战教训：凭记忆猜错过论文）。

## 操作步骤

### Step 1：抓取中间稿

```bash
python3 scripts/ai-papers/fetch_paper.py <arxiv-id> <slug> [vN]
```

- `slug` = 论文英文短横线名（如 `attention-is-all-you-need`），也是译文页文件名
- 产物：`/tmp/ai-papers/<slug>.md` 中间稿 + 图片落 `docs/public/papers/<slug>/figN.png`
- 中间稿每行「标签<TAB>内容」，标签：`ABS` 摘要段 / `P` 段落 / `H2/H3/H4` 标题 / `EQ` 块级公式（`$$..$$`）/ `FIG` 图（`文件名 | caption`）/ `TBL` 表（markdown）/ `REF` 参考文献（保留英文）
- 注意：块级公式的行内公式**已经在段落文本里以 `$..$` 形式存在**

### Step 2：翻译并落译文页

**翻译一律通过 baoyu-translate 技能执行，不许裸译**（dg 的全局规则）。流程：

1. 读中间稿，掌握结构与公式分布。
2. 调用 `Skill(baoyu-translate)`，模式 **refined**（论文是公开发布的长文，走分析→翻译→审校→润色全流程），输入 `/tmp/ai-papers/<slug>.md`，目标 zh-CN。仓库根的 `.baoyu-skills/baoyu-translate/EXTEND.md` 已配置受众/风格/核心术语表，会自动加载。
3. **调用时必须额外传递论文领域约束**（EXTEND.md 管术语与风格，管不到公式和中间稿格式，附在给 baoyu 的指令里）：
   - 中间稿是「标签<TAB>内容」行格式（P/H2/H3/H4/EQ/FIG/TBL/ABS/REF），标签与制表符原样保留，只译内容
   - `$...$` / `$$...$$` 内部 LaTeX **原样保留不翻译不拆开**，公式标记当原子 token 整体搬移，中文绝不进 `$` 定界符之间
   - 表格数值/模型名/数字不动；REF 参考文献条目整行保留英文
4. baoyu 产出后按下方模板组装译文页（frontmatter/导读/图表引用/参考文献），再执行**机检**：`$` 定界符内零中文、`$` 逐行配对、块级公式与源稿 diff、表格数值逐位核对。机检失败处手工修复。

**baoyu 分块注意（实战经验）**：论文源稿常超 baoyu 的 4000 词分块阈值，但标准分块脚本对「TAG<TAB>」行和多行表格有**切断风险**——必须走内联不分块路径，或按章节边界手工分块（每块完整含自己的表格），绝不让分块脚本落在标签行/表格中间。baoyu 中间产物会落 `/tmp/ai-papers/<slug>-zh-CN/`（01-analysis 至 translation.md），组装后机检以最终落盘文件为准。

多篇论文用并行子 agent，每个 agent 的 prompt 必须自包含：中间稿路径、输出路径、下方模板、上述 baoyu 调用方式与领域约束全文。

译文页模板（`docs/papers-zh/<slug>.md`）：

```markdown
---
title: <中文标题>
date: <真实当前北京时间，先跑 TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M">
layout: post
---

> 原文：[<英文原题>](https://arxiv.org/pdf/<id>)
> 作者：<作者列表>（<机构>）· 发表：<YYYY-MM>

> **导读**：<100~200 字，只写三要素：论文地位（出处/影响力）、核心结论、适合谁读>

## 摘要

<ABS 段翻译>

<正文：H2→##（标题编号保留原文的 "1 Introduction" → "## 1 引言"），
P→段落，EQ→独立成行块级公式，FIG→图片引用+caption，TBL→markdown 表格>

## 参考文献

<REF 条目逐条列出，保留英文原文不翻译>
```

格式细则：

- **图片引用**：`![<caption 中文翻译>](/papers/<slug>/figN.png)`，caption 译中文
- **公式是原子**：`$...$` / `$$...$$` 内部 LaTeX 原样保留，翻译时整体搬移不拆开；中文绝不写进 `$` 定界符之间（KaTeX 坑，见 SKILL.md）
- **块级公式编号**：中间稿没有保留原文编号，不补；正文里 "see Equation 1" 类引用照译（"见公式 (1)"）
- **中文标题**：优先学界惯用译法（如 Attention Is All You Need → 《注意力就是你需要的全部》），无惯用译法自行意译；英文原题在信息块保留
- **机构/发表信息**：从论文内容或常识判断（NeurIPS/EMNLP 等出处写进导读），拿不准就只写 arxiv 日期

## 翻译规范（论文场景）

- 风格：准确优先的书面学术中文，术语用学界通行译法；"we" 译「我们」
- **不译**：模型名/数据集名/方法缩写（Transformer、GPT、MPT、Wikipedia、KILT、LoRA）、数学符号、代码
- **参考译法**：attention→注意力，self-attention→自注意力，encoder/decoder→编码器/解码器，embedding→嵌入（向量），fine-tuning→微调，retrieval→检索，RAG→RAG（保留缩写，首次出现括注「检索增强生成」），knowledge injection→知识注入，in-context learning→上下文学习，hallucination→幻觉，quantization→量化，paraphrase→改写
- 数字、百分比、表格里的数值保持原样；表格重建为规范 markdown 表
- 不增删内容；导读之外不加任何解读性文字

### Step 3：主文章插入索引条目

主文章**按「年份 H2 → 月份 H3」两级分节**（`## 2024 年` 下再分 `### 3 月`，年份倒序、同年内月份倒序）——H2/H3 是右侧目录的来源，主文章不能没有节标题。插入规则：

- 该「年-月」节已存在 → 条目加到该节**列表最前**（同月新的在上）
- 月份节不存在但年份节存在 → 在该年份节内**最前**新建 `### <M> 月` 再放条目
- 年份节也不存在 → 最上面新建 `## <年份> 年` + `### <M> 月` 再放条目

条目格式（**标题段 + 解释段两段结构**：标题段 = 英文原题书名号加粗且**本身是原文 PDF 直链**（`**[《英文原题》](pdf 链接)**`，不单独放「原文」文字链接）+ 中文译名圆括号 + 作者圆括号；然后**空一行**再缩进两空格起解释段 = 一句话核心结论 40~70 字 + 全文译文链接——空行分段渲染成两个段落，标题和解释之间有自然间距。月份已进 H3 不重复，来自论文 arxiv 发表月即 fetch_paper.py 抓到的 citation_date）：

```markdown
- **[《<英文原题>》](https://arxiv.org/pdf/<id>)**（<中文标题>）（<一作> 等，<机构>）

  <一句话核心结论，40~70 字>。<PostLink to="/papers-zh/<slug>">全文译文</PostLink>
```

**「原文」一律用 PDF 直链**（`https://arxiv.org/pdf/<id>`，点开就是论文全文）——不用 abs 摘要页链接（那是介绍落地页，读者还要再点一次 PDF）。abs 页只供抓取脚本取元数据。同步更新主文章顶部「最近更新」日期。

### Step 4：首次建合集时（一次性）

- 建主文章 `docs/posts/ai/ai-papers.md`（frontmatter：标签 `论文翻译`，layout: post）。开头**只用一句话**说明合集定位（如「收录 AI 领域重要论文（多来自 arxiv）的中文全文翻译，持续更新」）+「最近更新」行 + 论文列表——**不写任何制作工艺描述**（公式怎么渲染、图表存哪、译文页有什么结构，读者打开自然看到，预告即是废话，见 SKILL.md 产出物边界）
- `docs/.vitepress/theme/components/PostOverlay.vue` 的 `import.meta.glob` 加 `'/papers-zh/**/*.md'`，**改完重启 dev**（glob 构建期展开）
- CLAUDE.md 的「dg-writer 写作技能」节确认已覆盖论文翻译条目

### Step 5：本地验收

`npm run dev` 让用户浏览器验收（5173 已跑就不重启）。检查点：公式渲染（KaTeX）、图片显示、表格对齐、浮层打开译文页。

## 坑位清单（实战学费）

1. **块级公式在 `<table class="ltx_equation">` 里**（LaTeXML 用表格布局对齐公式与编号），不是 div——fetch_paper.py 已按此实现，别改回 div 匹配。
2. **ar5iv 图片 src 是相对路径**（`/html/<id>/assets/...`），脚本已补全域名下载；译文页引用落地后的 `/papers/<slug>/figN.png` 绝对路径，不热链 ar5iv。
3. **论文表格可能既在 `figure class="ltx_table"` 也在正文散置**，TBL 标签行内含 markdown 表 + caption（`| ` 分隔），重建时注意拆开。
4. **凭记忆猜 arxiv ID 会错**（2312.05934 曾被记成 2312.17559——一篇物理论文），必须搜。
5. **中间稿表格有提取伪影，翻译时须按原论文语义修复**（实测两篇各遇到）：双行表头合并为单行；复杂表列错位（每行列数不等）按原论文重排，数值逐一核对；空白格保持空。
6. **EQ 公式行可能被 HTML 提取拆残**（如 Attention 论文式 (2) 被拆成 4 个残缺 `$$` 行），按公式语义合并回完整块级公式，LaTeX 字符级不动。
7. **ar5iv 个别句子有截断**（如 Attention 论文第 4 节卷积段），对照发表的论文原文补全后照译。
8. **特殊 token 抓取残留**：`<BOS>`/`<EOS>` 等尖括号 token 在中间稿里可能变成空的 `$$ and $$`，对照 ar5iv 原文恢复为行内代码。
9. **KaTeX 不认 LaTeXML 排版技法**：极个别公式用 `\hbox to0.0pt{...}` 叠否定线等排版 hack，KaTeX 会 parse error——改成语义等价的可渲染写法（改动须在报告里说明），其余公式逐字保留。
10. **空章节跳过**：中间稿可能有无内容的孤立 H2（如 "Attention Visualizations"），不输出空标题节。
11. **自检必做**（翻译 agent 收尾时）：`$` 定界符内零中文、`$` 逐行配对、块级公式与源稿 diff、表格数值逐位核对。
