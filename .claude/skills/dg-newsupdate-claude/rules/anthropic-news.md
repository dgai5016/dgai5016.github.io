# rules/anthropic-news.md：Anthropic News 新闻更新

对应数据源：Anthropic 官方新闻列表页（SSR 渲染，curl 直出，无反爬）。
每条新闻的处理 = 抓正文 → 全文翻译 → 落译文页 → 主文章列表最前插索引条目。

## 输入

check.py 输出的新增新闻条目，形如：

```
[Anthropic News] 新增 2 条新闻:
  - [Oct 2, 2026] (Announcements) Some New Announcement
    slug: some-new-announcement
```

## 操作步骤

### Step 1：抓正文

```bash
python3 scripts/newsupdate-claude/fetch_news.py <slug1> [slug2 ...]
```

输出 `/tmp/newsupdate-claude/<slug>.md`：YAML 头（title/slug/date/category）+ 正文（每行「标签<TAB>英文」，p/h2/h3/li/blockquote 五种标签）。

### Step 2：翻译并落译文页

单条直接自己译；**多条用并行子 agent**（每条一个，prompt 必须自包含：输入文件路径、输出路径、下方模板、SKILL.md 的术语表和美元金额坑全部贴进去）。

译文页模板（`docs/news-zh/<slug>.md`）：

```markdown
---
title: <中文标题，准确凝练>
date: <真实当前北京时间，先跑 TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M">
layout: post
---

> 原文：[<英文原题>](https://www.anthropic.com/news/<slug>)
> 发布：<YYYY-MM-DD> · 分类：<category>

<正文：p→段落，h2→##，h3→###，连续 li→一个无序列表，blockquote→> 引用>
```

日期来源优先级：抓取稿 YAML 的 date（可能空）> check.py 输出的列表页日期（`Oct 2, 2026` → `2026-10-02`）。

翻译规范见 SKILL.md 通用契约（术语表 + 美元金额必须中文化）。让子 agent 在**最终回复里**（不写进文件）报告：中文标题 + 一句话中文摘要（40~60 字）。

### 已知抓取稿结构坑（翻译时语义还原，不算改写）

- **段落粘连**：原文两个段落偶尔被压进同一行（句号后直接跟新句），按语义拆回两段
- **轮播引言压成巨段**：客户/研究者评价轮播（多条带署名引言）会被抓成单个超长 p，应还原为独立引用块，每条附「—— 姓名，头衔」署名；轮播 UI 计数器（如「01 / 03」）是页面控件残留，剔除
- **小节标题混进段落**：被并进段落的 h2/h3 按语义还原为标题

### Step 3：主文章列表最前插索引条目

在 `docs/posts/ai/claude-ecosystem-updates.md` 的「Anthropic 新闻（中文译文）」列表**最前面**插入（新的在上）：

```markdown
- **2026-10-02 · <中文标题>**：<一句话中文摘要>。<PostLink to="/news-zh/<slug>">全文译文</PostLink> · [原文](https://www.anthropic.com/news/<slug>)
```

**链接形式规则**：内部链接（译文页）必须用 `<PostLink>` 组件（右侧浮层打开，不跳转页面；`PostLink` 已全局注册，md 里直接写；插槽内只放纯文本，不放 markdown 语法如 `**加粗**`——组件插槽内不渲染 markdown，会露出星号）；外站链接（原文）保持普通 markdown 链接。

### Step 4：更新正文顶部的「最近更新」日期

同 whats-new 规则，改成今天（北京时间）。

## 边界

- 列表页常驻 10 条；state.json 已把见过的 slug 全记下（含建库时未回填翻译的早期条目），**不会**重复提示要翻译旧闻
- 新闻里的图片/表格当前抓取脚本不保留（只抓 p/h2/h3/li/blockquote 文本）；遇到以图表为主体的新闻，在译文页顶部加一行说明「原文含图表，建议查看原文链接」
- 不翻译列表页之外通过其他渠道发现的新闻（本 skill 只认 check.py 的增量输出）
