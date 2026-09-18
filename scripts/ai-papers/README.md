# ai-papers：AI 论文翻译抓取管线

配合 skill `dg-writer`（`.claude/skills/dg-writer/rules/ai-paper-translation.md`）使用，
把 arxiv 论文转成可翻译的结构化中间稿。纯 Python 标准库，无第三方依赖。

## 数据流

```
fetch_paper.py <arxiv-id> <slug>
   ├─ arxiv.org/abs/<id>        → 元数据(citation_title/author/date)
   ├─ ar5iv.labs.arxiv.org/html → 正文 HTML(LaTeXML)
   │     段落/标题/公式(alttext=LaTeX 源)/表格/图 逐项提取
   ├─ 图片按序下载 → docs/public/papers/<slug>/figN.png
   └─ 中间稿 → /tmp/ai-papers/<slug>.md（「标签<TAB>内容」行格式,供翻译）
```

## 与 newsupdate-claude 管线的差异

| | newsupdate-claude | ai-papers |
| --- | --- | --- |
| 触发方式 | 定期检查增量（state.json 水位） | **按需**（点名翻译某篇，无水位无轮询） |
| 数据源 | anthropic.com/news | arxiv abs + ar5iv |
| 公式 | 无 | LaTeX（`$..$`/`$$..$$` 定界迁移，KaTeX 渲染） |

## 已知问题

- 本机代理偶发 56 传输错误，脚本内置 5 次重试。
- 块级公式在 `<table class="ltx_equation">` 里（LaTeXML 表格布局），不是 div。
- 合并单元格的复杂表格降级为摊平近似，翻译环节人工校对。
