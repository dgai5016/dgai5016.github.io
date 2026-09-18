# newsupdate-claude：Claude 生态更新追踪管线

配合 skill `dg-newsupdate-claude`（`.claude/skills/dg-newsupdate-claude/`）使用，维护博客长期文章
《Claude 生态更新动态》（`docs/posts/ai/claude-ecosystem-updates.md`）。
纯 Python 标准库，无第三方依赖。

## 数据流

```
check.py ──对比 state.json──> 输出增量报告（无新内容则结束）
   │
   ├─ whats-new 新周报 ──> 人工(由 skill 流程)提炼一行要点 ──> 追加进主文章
   │
   └─ news 新新闻 ──> fetch_news.py 抓正文到 /tmp ──> 翻译 ──> docs/news-zh/<slug>.md
                                                     └─> 主文章列表最前插索引条目
   │
   └── 全部更新完 ──> check.py --init 刷新水位
```

## 脚本清单

| 脚本 | 作用 |
| --- | --- |
| `check.py` | 抓两个源，对比 `state.json` 打印增量；`--init` 把当前水位写入 state |
| `fetch_news.py` | 抓指定 slug 的新闻正文，落 `/tmp/newsupdate-claude/<slug>.md`（带结构标签供翻译） |

`state.json` 记录 `whats_new_week`（周报水位周号）和 `news_seen`（已见过的新闻 slug 全集，
含未翻译的历史条目——列表页常驻 10 条，见过的不再提示）。

## 常见场景

- **日常查更新**：`python3 check.py`，有增量按 skill 流程更新文章，完成后 `--init`。
- **误跑了 --init（漏更新文章）**：手动编辑 `state.json`，把 `whats_new_week` 调回上周号、
  从 `news_seen` 删掉漏掉的 slug，下次 check 会重新提示。
- **页面结构变化**：check.py 解析为空会直接报错拒绝继续（防污染水位），修 `parse_news_list`
  时注意卡片字段要按「首位=日期、末位=标题」取，不能按固定下标（页面有 3 段/4 段两种版本）。

## 已知问题

- 本机走代理（7890 端口），偶发 curl 56 传输错误，两个脚本均内置 5 次重试。
- 新闻详情页的图片、表格不抓取（只保留 p/h2/h3/li/blockquote 文本），图表为主的新闻
  在译文页顶部加说明引导看原文。
