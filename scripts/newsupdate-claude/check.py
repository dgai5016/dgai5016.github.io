#!/usr/bin/env python3
"""检查 Claude Code whats-new 和 Anthropic News 是否有新内容。

用法:
    python3 check.py          # 对比 state.json,打印新增内容报告
    python3 check.py --init   # 把当前最新状态写入 state.json(建库/重置时用)

数据源(2026-09 验证均可直连):
    1. Claude Code 周报汇总页的 Markdown 源(Mintlify 特性,加 .md 后缀即返回纯文本)
       https://code.claude.com/docs/en/whats-new.md
       条目形如 <Update label="Week 37" description="September 7-11, 2026" tags={["v2.1.263-v2.1.269"]}>
    2. Anthropic 新闻列表页(服务端渲染,HTML 里直接含卡片)
       https://www.anthropic.com/news
       卡片形如 <a href="/news/<slug>">Sep 17, 2026 ... 标题 </a>

state.json 记录"上次看到哪",是增量判断的唯一依据:
    {"whats_new_week": 37, "news_seen": ["slug1", "slug2", ...]}
"""

import json
import re
import sys
import time
import urllib.request
from pathlib import Path

# ── 常量 ─────────────────────────────────────────────────────────────
# whats-new 的 Markdown 源(英文版内容最全,解析用它;给读者看的是 zh-CN 页面链接)
WHATSNEW_MD_URL = "https://code.claude.com/docs/en/whats-new.md"
# Anthropic 新闻列表页(SSR 渲染,curl 直接能拿到完整卡片)
NEWS_LIST_URL = "https://www.anthropic.com/news"
# 状态文件固定放在脚本同目录,和脚本一起进 git,换机器也不丢水位
STATE_FILE = Path(__file__).parent / "state.json"

# 本机走 Clash 代理,偶发 56 传输错误,重试几次基本都能过
FETCH_RETRY = 5


def fetch(url: str) -> str:
    """带重试的网页抓取,返回解码后的文本(urllib 会自动读 http_proxy 等环境变量走代理)。"""
    last_err = None
    for i in range(FETCH_RETRY):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:  # 网络抖动/代理不稳定:睡 2 秒再试
            last_err = e
            time.sleep(2)
    raise RuntimeError(f"抓取失败(已重试 {FETCH_RETRY} 次): {url} -> {last_err}")


# ── 数据源 1: Claude Code whats-new ──────────────────────────────────
def parse_whatsnew(md_text: str) -> list[dict]:
    """从 whats-new.md 提取周报条目,返回按页面顺序(最新在前)的列表。

    每条形如:
        {"week": 37, "label": "Week 37",
         "dates": "September 7-11, 2026", "versions": "v2.1.263-v2.1.269",
         "summary": "**`claude plugin eval`**: run your plugin ..."}
    """
    entries = []
    # <Update label="Week 37" description="..." tags={["v2.1.x-v2.1.y"]}> 开头,
    # 一直到 </Update> 闭合,中间第一段非空文本就是本周要点
    for m in re.finditer(
        r'<Update label="Week (\d+)" description="([^"]*)" tags=\{\["([^"]*)"\]\}>\s*(.*?)</Update>',
        md_text,
        re.S,
    ):
        week, dates, versions, body = int(m.group(1)), m.group(2), m.group(3), m.group(4)
        # 去掉 Markdown 强调符号后取第一段作为摘要(第二段通常是 "Also this week" 次要列表)
        first_para = body.strip().split("\n\n")[0]
        summary = re.sub(r"[*`#\[\]]", "", first_para).strip()
        entries.append(
            {"week": week, "label": f"Week {week}", "dates": dates,
             "versions": versions, "summary": summary}
        )
    return entries


# ── 数据源 2: Anthropic News ─────────────────────────────────────────
def parse_news_list(html: str) -> list[dict]:
    """从新闻列表页提取卡片,返回按页面顺序(最新在前)的列表。

    卡片是 <a href="/news/<slug>">Sep 17, 2026 | 分类 | 标题</a> 结构,
    文本节点用竖线拼起来后按出现顺序切出 日期/分类/标题 三个字段。
    """
    cards = []
    for m in re.finditer(r'<a[^>]+href="/news/([a-z0-9-]+)"[^>]*>(.{0,600}?)</a>', html, re.S):
        slug, body = m.group(1), m.group(2)
        # 标签全换成竖线分隔符,再按非空切片。
        # 注意不能按固定下标取字段: 页面版本有 3 段(日期/分类/标题)和 4 段两种结构,
        # 稳定的规律是 首段一定是日期(Mon DD, YYYY),末段一定是标题,中间归为分类
        parts = [p.strip() for p in re.sub(r"<[^>]+>", "|", body).split("|") if p.strip()]
        if len(parts) < 3 or not re.match(r"^[A-Z][a-z]{2} \d{1,2}, \d{4}$", parts[0]):
            continue  # 首段不是日期 => 不是新闻卡片(可能是"查看更多"之类杂项),跳过
        cards.append({"slug": slug, "date": parts[0],
                      "category": " / ".join(parts[1:-1]), "title": parts[-1]})
    return cards


# ── 主流程 ───────────────────────────────────────────────────────────
def main():
    is_init = "--init" in sys.argv  # --init: 不做对比,直接把当前水位写进 state

    print("抓取 Claude Code whats-new ...")
    whatsnew = parse_whatsnew(fetch(WHATSNEW_MD_URL))
    print("抓取 Anthropic News 列表 ...")
    news = parse_news_list(fetch(NEWS_LIST_URL))
    print(f"完成: whats-new {len(whatsnew)} 条周报, news {len(news)} 条新闻\n")

    # 防御: 任一源解析为空,大概率是代理抖动返回了不完整页面(实测发生过 0 条的偶发),
    # 此时绝不能往下走 —— 否则会把空结果写进 state 或误报"没有更新"
    if not whatsnew or not news:
        sys.exit("[错误] 有数据源解析结果为空,可能是网络返回不完整页面,请稍后重跑本脚本。")

    if is_init or not STATE_FILE.exists():
        # 建库/重置:当前看到什么就记什么,news 全部 slug 视为"已见过"
        state = {"whats_new_week": whatsnew[0]["week"], "news_seen": [c["slug"] for c in news]}
        STATE_FILE.write_text(json.dumps(state, ensure_ascii=False, indent=2) + "\n")
        print(f"[--init] state.json 已写入: 周报水位 Week {state['whats_new_week']}, "
              f"news 已见 {len(state['news_seen'])} 条")
        return

    state = json.loads(STATE_FILE.read_text())

    # 周报增量 = 周数大于水位的所有条目(一次没查可能攒了好几周)
    new_weeks = [e for e in whatsnew if e["week"] > state["whats_new_week"]]
    # 新闻增量 = 当前列表里没见过的 slug(列表页常驻 10 条,更早的不再提示)
    new_news = [c for c in news if c["slug"] not in state["news_seen"]]

    print("=" * 60)
    if not new_weeks and not new_news:
        print("两个数据源都没有新内容。")
    if new_weeks:
        print(f"[Claude Code whats-new] 新增 {len(new_weeks)} 期周报:")
        for e in new_weeks:
            print(f"  - {e['label']} ({e['dates']}, {e['versions']})")
            print(f"    要点: {e['summary'][:100]}...")
    if new_news:
        print(f"[Anthropic News] 新增 {len(new_news)} 条新闻:")
        for c in new_news:
            print(f"  - [{c['date']}] ({c['category']}) {c['title']}")
            print(f"    slug: {c['slug']}")
    print("=" * 60)
    print("提示: 更新完文章后,重跑本脚本并带 --init 刷新水位(或手动改 state.json)。")


if __name__ == "__main__":
    main()
