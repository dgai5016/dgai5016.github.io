---
name: dg-newsupdate-claude
description: 追踪 Claude 生态更新并维护博客长期文章《Claude 生态更新动态》。检查两个官方数据源的增量（Claude Code whats-new 周报 + Anthropic News 新闻），把新增内容更新进博客：whats-new 以「版本 + 一行要点 + 中文官方链接」形式追加；Anthropic 新闻抓取正文、翻译成中文、生成独立译文页（不进首页文章流），并在主文章列表最前面插入索引条目。Use when 用户说「查一下 Claude 更新」「Claude Code 有没有新版本」「anthropic 有什么新闻」「更新一下动态文章」「/dg-newsupdate-claude」，或任何想核对这两个源有没有新内容的场景。Does NOT 主动通知/定时轮询（纯手动触发）、不翻译 whats-new 周报全文（只提炼一行要点 + 给中文官方链接）、不改动历史条目（只追加，错了让用户明确要求才改）、不 commit/push（提交走 dg-git-push）。
---

# dg-newsupdate-claude：Claude 生态更新追踪

把两个官方源的增量更新进一篇长期博客文章：

| 数据源 | 官方地址 | 在博客里的形态 |
| --- | --- | --- |
| Claude Code whats-new 周报 | `https://code.claude.com/docs/en/whats-new`（解析用 `.md` 源） | 主文章里一行一条：周号 + 版本 + 要点 + **中文官方链接** |
| Anthropic News | `https://www.anthropic.com/news` | 主文章列表一条索引 + **独立中文译文页**（全文翻译） |

产出物固定位置（都是本仓库内约定，别挪）：

- 主文章：`docs/posts/ai/claude-ecosystem-updates.md`（长期更新，只追加不改写历史）
- 译文页：`docs/news-zh/<slug>.md`（在 `posts/` glob 之外，天然不进首页文章流，数据层零改动）
- 检查脚本：`scripts/newsupdate-claude/check.py`（增量检查）+ `fetch_news.py`（抓单条正文）
- 水位状态：`scripts/newsupdate-claude/state.json`（记录上次看到哪，增量判断唯一依据）

## 总流程

### Step 1：跑检查脚本

```bash
python3 scripts/newsupdate-claude/check.py
```

- 输出「两个数据源都没有新内容」→ 告知用户，流程结束。
- 输出新增项 → 按 Step 2/3 分别处理（两源独立，可能只更新其中一个）。
- 脚本报「解析结果为空」→ 网络抖动返回了不完整页面，直接重跑，不要手工绕过。

### Step 2：有 whats-new 新周报 → 读 `rules/claude-code-whats-new.md` 执行

### Step 3：有 Anthropic 新新闻 → 读 `rules/anthropic-news.md` 执行

### Step 4：刷新水位

文章更新完、用户验收前，重跑 `python3 scripts/newsupdate-claude/check.py --init` 把 state 推到最新（防止下次重复提示）。**顺序注意**：必须在确认本次新增内容都已写进文章之后再 --init，否则等于白查。

### Step 5：本地验收

`npm run dev` 让用户在浏览器看效果（5173 端口已有服务在跑就不用重启）。不 commit/push。

## 通用契约

### frontmatter 规范

- 新建译文页的 `date` 用真实当前北京时间，写 frontmatter 前先执行
  `TZ=Asia/Shanghai date "+%Y-%m-%d %H:%M"`。
- 主文章的 date 是建文时间，之后追加更新**不动 frontmatter**，「最近更新」日期写在正文顶部（站内长期文章惯例）。
- 每篇文章仅一个标签；主文章标签 `Claude 生态`，译文页不进文章流、不需要 tags。

### 翻译术语表（译文页通用）

- **不译**：Claude / Claude Code / Claude.ai / Claude Science / API / Opus / Sonnet / Fable / Mythos 等产品名与模型名，公司名，型号（H100、FP4 等）
- **参考译法**：safeguards→安全防护，alignment→对齐，interpretability→可解释性，red-teaming→红队测试，evaluation→评估，credits→额度，research preview→研究预览版，grant→授权/许可，dual-use→两用性
- Anthropic 自称 "we" 译「我们」；风格为准确流畅的书面中文，不增删内容、不加译者评论
- 原文里的链接文字按普通文字翻译，**不要**自行补 URL（抓取稿已丢失链接目标，猜错不如不补）

### ⚠️ 美元金额坑（KaTeX）

博客渲染器会把**成对 `$` 之间的中文**当数学公式吃掉。所有美元金额必须译成中文金额
（`$15 per month` → 每月 15 美元；`$50,000` → 5 万美元），译文中不允许出现两个裸 `$`。

### 文章内容边界（公开内容 ≠ 内部文档）

主文章和译文页是**给读者看的公开博文**，正文中**禁止**出现任何维护元信息：

- 技能名（dg-newsupdate-claude）、脚本路径、state/水位、目录约定（/news-zh 不进文章流之类）
- 「怎么触发更新」「本文如何维护」之类的操作说明
- 允许的唯一元信息是主文章顶部的「最近更新：日期」一行（站内长期文章惯例）

这些信息只存在于 SKILL.md / rules / scripts README / CLAUDE.md 里。

### 临时产物

抓取原料只落 `/tmp/newsupdate-claude/`，绝不进仓库。

## 坑位清单（实战学费）

1. **语言代码是 `zh-CN` 不是 `zh`**：`code.claude.com/docs/zh/whats-new` 是 404，中文官方链接一律用 `https://code.claude.com/docs/zh-CN/...`。
2. **news 列表卡片结构有两种版本**（3 段/4 段文本），解析取字段必须按「首位=日期、末位=标题、中间=分类」，check.py 已按此实现，别改回固定下标。
3. **本机代理偶发 56 传输错误**，两个脚本都内置了 5 次重试；check.py 对空解析结果会拒绝继续（防止把空页面写进 state 污染水位）。
4. **详情页 `article:published_time` meta 可能缺失**，fetch_news.py 有「正文日期文本」降级逻辑；若 date 仍为空，从 check.py 输出的列表页日期补。
5. **多条新闻并行翻译**时用子 agent（每条一个，给完整自包含 prompt 含术语表），译文页标题+摘要让 agent 在最终回复里报告，用于主文章索引条目。
