#!/usr/bin/env python3
"""抓取 Anthropic 单条新闻的正文,落成结构化 Markdown 供翻译用。

用法:
    python3 fetch_news.py <slug1> [slug2 ...]
    # 例: python3 fetch_news.py life-sciences-verification-program

输出: /tmp/newsupdate-claude/<slug>.md,形如:
    ---
    title: Introducing the Life Sciences Verification Program
    slug: life-sciences-verification-program
    date: 2026-09-17
    category: Announcements
    description: <meta og:description 摘要>
    ---

    ## 正文
    <p> 段落原文...
    <h2> 小节标题...

正文提取原理(2026-09 验证):
    详情页是 SSR 渲染,整篇正文在一个 <article> 标签里,
    段落元素只有 p / h2 / h3 / li / blockquote 几种,逐个带标签名输出即可保留结构。
    元信息(标题/日期/分类)从 <head> 的 og:title / article:published_time / meta 取。
"""

import html as html_lib  # 用于解码 HTML 实体(&#x27; -> ', &amp; -> &)
import re
import sys
import time
import urllib.request
from pathlib import Path

# 抓取目标固定为详情页 URL: 列表页 slug -> https://www.anthropic.com/news/<slug>
NEWS_DETAIL_URL = "https://www.anthropic.com/news/{}"
# 临时产物目录: 只给翻译环节当原料,不进仓库(对齐站内 /tmp/<skill名>/ 惯例)
OUT_DIR = Path("/tmp/newsupdate-claude")

FETCH_RETRY = 5  # 本机代理偶发抖动,失败重试


def fetch(url: str) -> str:
    """带重试的抓取(check.py 同款逻辑)。"""
    last_err = None
    for _ in range(FETCH_RETRY):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            last_err = e
            time.sleep(2)
    raise RuntimeError(f"抓取失败: {url} -> {last_err}")


def month_to_num(name: str) -> str:
    """英文月份缩写转两位数字(Sep -> 09),拼 ISO 日期用。"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
              "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return f"{months.index(name) + 1:02d}"


def extract_meta(html: str) -> dict:
    """从 <head> 提取元信息: og:title 标题 / article:published_time 发布时间 / og:description 摘要。

    实测部分页面没有 article:published_time,此时降级到正文里找 "Sep 17, 2026" 这种日期文本。
    og:description 也常是站点级通用描述而非文章摘要,仅供参考。
    """
    def meta(prop: str) -> str:
        m = re.search(rf'<meta[^>]+(?:property|name)="{prop}"[^>]+content="([^"]*)"', html)
        return html_lib.unescape(m.group(1)) if m else ""

    published = meta("article:published_time")
    if not published:
        # 降级: 页面上第一个 "月份缩写 日, 年" 模式即发布日期
        m = re.search(r"\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}), (\d{4})\b", html)
        if m:
            published = f"{m.group(3)}-{month_to_num(m.group(1))}-{int(m.group(2)):02d}"
    return {"title": meta("og:title"), "published": published,
            "description": meta("og:description")}


def extract_body(html: str) -> list[tuple[str, str]]:
    """提取 <article> 内的 (标签名, 纯文本) 序列,保留 p/h2/h3/li/blockquote 结构。"""
    art = re.search(r"<article[^>]*>(.*?)</article>", html, re.S)
    if not art:
        return []
    elems = []
    # 按标签逐对匹配;li 在页面上会重复出现在 ul/ol 两层? 实测只有一层,直接取
    for m in re.finditer(r"<(p|h2|h3|li|blockquote)[^>]*>(.*?)</\1>", art.group(1), re.S):
        tag, txt = m.group(1), m.group(2)
        # 去内层标签(链接/加粗等),解码 HTML 实体,压缩空白
        txt = re.sub(r"<[^>]+>", "", txt)
        txt = html_lib.unescape(txt)
        txt = re.sub(r"\s+", " ", txt).strip()
        if txt:
            elems.append((tag, txt))
    return elems


def main():
    slugs = [s for s in sys.argv[1:] if not s.startswith("-")]
    if not slugs:
        sys.exit("用法: python3 fetch_news.py <slug1> [slug2 ...]  (slug 见 check.py 输出)")
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    for slug in slugs:
        print(f"抓取 {slug} ...")
        html = fetch(NEWS_DETAIL_URL.format(slug))
        meta = extract_meta(html)
        body = extract_body(html)
        if not body:
            print(f"  [警告] 未提取到正文,可能页面结构变了,请人工看 {NEWS_DETAIL_URL.format(slug)}")
            continue

        # article:published_time 形如 2026-09-17T13:00:00+00:00,截日期部分
        date = meta.get("published", "")[:10]
        lines = [
            "---",
            f"title: {meta['title']}",
            f"slug: {slug}",
            f"date: {date}",
            "category: Announcements",
            f"description: {meta.get('description', '')}",
            "---",
            "",
            "## 正文",
            "",
        ]
        # 每个元素一行 "标签<TAB>文本",翻译时按标签还原结构(p->段落, h2->小节标题)
        lines += [f"{tag}\t{txt}" for tag, txt in body]
        out = OUT_DIR / f"{slug}.md"
        out.write_text("\n".join(lines) + "\n")
        print(f"  -> {out} ({len(body)} 个正文元素)")


if __name__ == "__main__":
    main()
