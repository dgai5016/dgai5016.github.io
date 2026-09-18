# rules/claude-code-whats-new.md：Claude Code whats-new 周报更新

对应数据源：Claude Code 官方周报汇总页。
解析用英文 Markdown 源（内容最全最及时），**给读者看的链接用中文官方页**。

## 输入

check.py 输出的新增周报条目，形如：

```
[Claude Code whats-new] 新增 2 期周报:
  - Week 38 (September 14-18, 2026, v2.1.270-v2.1.280)
    要点: **`claude plugin eval`**: run your plugin ...
```

## 操作步骤

### Step 1：抓英文 Markdown 源（如需看完整条目）

```bash
curl -s --retry 5 --retry-all-errors "https://code.claude.com/docs/en/whats-new.md" | head -80
```

每个条目结构：`<Update label="Week N" description="日期区间" tags={["版本范围"]}>` + 首段主特性 + "Also this week" 次要特性 + 周报详情页链接 `/docs/en/whats-new/2026-wNN`。

### Step 2：提炼一行要点（中文，20~40 字）

从条目**首段主特性**提炼 1~2 个最重要特性的关键词级描述，用顿号分隔。次特性（Also this week）只在主特性单薄时补一个。示例：

- 原文首段：`**claude plugin eval**: run your plugin against a suite of test cases...`
- 提炼：`` `claude plugin eval` 插件评测上线，Desktop 面板可弹出独立窗口 ``

### Step 3：追加到主文章（列表最上方）

在 `docs/posts/ai/claude-ecosystem-updates.md` 的「Claude Code 更新（whats-new 周报）」列表**最前面**插入（最新的在上），条目格式固定：

```markdown
- **Week 38**（2026-09-14 ~ 09-18 · v2.1.270–v2.1.280）：<一行中文要点>。[中文周报 →](https://code.claude.com/docs/zh-CN/whats-new/2026-w38)
```

格式要点：

- 周号 `Week N` 与版本范围 `v2.1.x–v2.1.y` 原样保留（注意用中文波浪号区间一致的短横线 `–`，与原文一致）
- `description` 里的英文日期区间（September 14-18, 2026）转成 `2026-09-14 ~ 09-18`（同月省略月份）
- 周报详情页链接语言代码用 `zh-CN`：`https://code.claude.com/docs/zh-CN/whats-new/2026-wNN`（`w` + 两位周号；**坑：`zh` 是 404，必须 `zh-CN`**）

### Step 4：更新正文顶部的「最近更新」日期

主文章正文顶部有一行「最近更新：YYYY-MM-DD」，改成今天（北京时间）。

## 边界

- 只提炼一行要点，**不翻译周报全文**（中文官方页本身就是完整翻译，链接过去即可）
- 不改写历史条目；发现历史条目有错，先问用户
- whats-new 页面常驻约 24 期周报；更早的周报官方页会归档，不要试图回填超出一页的旧条目
