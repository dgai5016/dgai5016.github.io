#!/usr/bin/env python3
"""
Zilliz《Vector Database 101》系列抓取与清洗管线（第一步：英文原文入库）。

作用：
1. 按 manifest.py 清单抓取 zilliz.com/learn/ 页面（Next.js SSR）
2. 从 __NEXT_DATA__ JSON 里取 pp['data']['articleContent']（正文 HTML）与 title
3. HTML → markdown 清洗（BeautifulSoup）：
   - KaTeX 渲染结果 → 还原成 $...$ / $$...$$（LaTeX 原文保存在 annotation 标签里）
   - 剥标题里的锚点按钮（<button>/<svg>）
   - 剥页面尾部「Take another look at the Vector Database 101 courses」系列导航区块
   - 标题/段落/列表/表格/代码块/图片/链接 → 标准 markdown
4. 图片本地化：assets.zilliz.com 图片下载到 docs/public/vector-db-images/<slug>-<序号>.<ext>，
   正文链接重写为本地路径（对齐 ragflow 的自托管策略）
5. 块结构规范化（空行压缩、松散列表收紧）——「逐段配对」的前提
6. 落盘到 docs/posts/ai/vector-db-101/en/<slug>.md（首行补 H1 标题）

用法：python3 scripts/vector-db-docs/fetch-originals.py [slug前缀过滤]
依赖：Python 标准库 + beautifulsoup4（bs4）
"""

import json
import re
import sys
import time
import urllib.request
from pathlib import Path

from bs4 import BeautifulSoup, NavigableString, Tag

sys.path.insert(0, str(Path(__file__).resolve().parent))
from manifest import ENTRIES, site_url  # noqa: E402

REPO = Path(__file__).resolve().parents[2]  # 博客仓库根目录
OUT_DIR = REPO / "docs" / "posts" / "ai" / "vector-db-101" / "en"
IMG_DIR = REPO / "docs" / "public" / "vector-db-images"

UA = ("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36")


def fetch(url: str) -> str | None:
    """带 3 次递增退避重试的下载。"""
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            return urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
        except Exception:  # noqa: BLE001
            if attempt == 2:
                return None
            time.sleep(2 * (attempt + 1))
    return None


def fetch_bytes(url: str) -> bytes | None:
    """二进制下载（图片用）——与 fetch() 分开，避免把 JPEG 按 UTF-8 解码炸掉。"""
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            return urllib.request.urlopen(req, timeout=60).read()
        except Exception:  # noqa: BLE001
            if attempt == 2:
                return None
            time.sleep(2 * (attempt + 1))
    return None


def get_article(page_html: str) -> tuple[str, str]:
    """从页面 HTML 提取 (标题, 正文HTML)。正文在 __NEXT_DATA__ 的
    props.pageProps.data.articleContent，title 在同级的 data.title。"""
    m = re.search(
        r'<script id="__NEXT_DATA__" type="application/json"[^>]*>(.*?)</script>',
        page_html, re.S)
    if not m:
        raise ValueError("页面里没找到 __NEXT_DATA__")
    data = json.loads(m.group(1))
    d = data["props"]["pageProps"]["data"]
    return d.get("title", "").strip(), d["articleContent"]


def katex_to_dollar(soup: BeautifulSoup) -> None:
    """KaTeX 渲染 span → $...$（行内）/ $$...$$（display）。
    浏览器端渲染后的结构是 <span class="katex"><span class="katex-mathml"><math>
    ...<annotation encoding="application/x-tex">原始LaTeX</annotation></math></span>
    <span class="katex-html">视觉渲染</span></span>——annotation 里是无损原文。"""
    for sp in soup.find_all("span", class_="katex"):
        ann = sp.find("annotation", attrs={"encoding": "application/x-tex"})
        latex = ann.get_text() if ann else ""
        # 是否处于 katex-display（块级公式）里
        display = sp.find_parent(class_="katex-display") is not None
        sp.replace_with(NavigableString(
            ("$$%s$$" if display else "$%s$") % latex.strip()))


def clean_soup(content_html: str) -> BeautifulSoup:
    """正文 HTML 的结构性清洗（在转 markdown 之前做）。"""
    soup = BeautifulSoup(content_html, "html.parser")

    # 1) 剥掉尾部「系列导航」区块：从该 H2 起到文末整段删除
    marker = soup.find(id="Take-another-look-at-the-Vector-Database-101-courses")
    if marker is not None:
        for el in reversed(marker.find_all_next()):  # 先删子节点再删容器
            el.extract()
        marker.extract()

    # 2) 剥标题锚点按钮与内嵌 svg（纯导航装饰）
    for b in soup.find_all("button"):
        b.decompose()
    for s in soup.find_all("svg"):
        s.decompose()

    # 3) KaTeX → $ 记号
    katex_to_dollar(soup)
    return soup


def esc_cell(text: str) -> str:
    """表格单元格转义：竖线会破坏 markdown 表格结构。"""
    return text.replace("|", "\\|").replace("\n", " ")


def clean_alt(alt: str) -> str:
    """图片 alt 清理：原文 alt 里偶带截断的 HTML 片段（如 'Photo by <a href='），截掉。"""
    alt = re.sub(r"<.*", "", alt).replace('"', "'").replace("]", ")")
    return alt.strip()


def inline_md(node) -> str:
    """行内节点（文本 + strong/em/code/a/sup/sub/br）→ markdown 片段。"""
    if isinstance(node, NavigableString):
        return str(node)
    if not isinstance(node, Tag):
        return ""
    name = node.name
    inner = "".join(inline_md(c) for c in node.children)
    if name in ("strong", "b"):
        return "**%s**" % inner.strip() if inner.strip() else ""
    if name in ("em", "i"):
        return "*%s*" % inner.strip() if inner.strip() else ""
    if name == "code":
        return "`%s`" % inner
    if name == "a":
        href = node.get("href", "")
        if href.startswith("javascript"):
            return inner
        return "[%s](%s)" % (inner, href) if inner else ""
    if name == "sup":
        return "<sup>%s</sup>" % inner
    if name == "sub":
        return "<sub>%s</sub>" % inner
    if name == "br":
        return "\n"
    if name == "img":
        return "![%s](%s)" % (clean_alt(node.get("alt", "")), node.get("src", ""))
    return inner  # span 等无语义壳：透传


def list_md(node: Tag, ordered: bool) -> list[str]:
    """ul/ol → markdown 列表块（支持 li 内嵌套列表，缩进两格）。"""
    lines, idx = [], 0
    for li in node.find_all("li", recursive=False):
        idx += 1
        prefix = "%d. " % idx if ordered else "- "
        # li 的直接行内内容（排除嵌套列表）
        parts = []
        for c in li.children:
            if isinstance(c, Tag) and c.name in ("ul", "ol"):
                continue
            parts.append(inline_md(c))
        lines.append(prefix + "".join(parts).strip())
        # 嵌套列表：缩进追加
        for sub in li.find_all(["ul", "ol"], recursive=False):
            for l in list_md(sub, sub.name == "ol"):
                lines.append("  " + l)
    return ["\n".join(lines)] if lines else []


def table_md(node: Tag) -> list[str]:
    """table → markdown 表格块。首行（thead 或首个 tr）作表头。"""
    rows = []
    for tr in node.find_all("tr"):
        cells = tr.find_all(["th", "td"])
        rows.append([esc_cell(inline_md(c).strip()) for c in cells])
    if not rows:
        return []
    width = max(len(r) for r in rows)
    for r in rows:  # 补齐短行
        r += [""] * (width - len(r))
    out = ["| " + " | ".join(rows[0]) + " |",
           "| " + " | ".join(["---"] * width) + " |"]
    out += ["| " + " | ".join(r) + " |" for r in rows[1:]]
    return ["\n".join(out)]


def blocks_md(node) -> list[str]:
    """顶层遍历正文树，产出 markdown 块列表（块间以空行分隔）。"""
    blocks = []
    for c in node.children:
        if isinstance(c, NavigableString):
            if c.strip():
                blocks.append(c.strip())
            continue
        if not isinstance(c, Tag):
            continue
        n = c.name
        if n in ("h1", "h2", "h3", "h4", "h5", "h6"):
            level = int(n[1])
            blocks.append("#" * level + " " + inline_md(c).strip())
        elif n in ("ul", "ol"):
            blocks += list_md(c, n == "ol")
        elif n == "table":
            blocks += table_md(c)
        elif n == "pre":
            code = c.find("code")
            lang = ""
            if code:
                cls = code.get("class") or []
                for k in cls:
                    if k.startswith("language-"):
                        lang = k[len("language-"):]
            text = (code or c).get_text()
            blocks.append("```%s\n%s\n```" % (lang, text.rstrip("\n")))
        elif n == "blockquote":
            inner_blocks = blocks_md(c)
            blocks.append("\n".join("> " + b for b in inner_blocks))
        elif n in ("figure", "figcaption"):
            blocks += blocks_md(c)
        elif n == "hr":
            blocks.append("---")
        elif n in ("p", "div", "section", "span"):
            text = inline_md(c).strip()
            if text:
                blocks += [b for b in text.split("\n\n") if b.strip()]
        elif n == "img":
            blocks.append("![%s](%s)" % (clean_alt(c.get("alt", "")), c.get("src", "")))
        else:
            text = inline_md(c).strip()
            if text:
                blocks.append(text)
    return [re.sub(r"\n{3,}", "\n\n", b).strip("\n") for b in blocks if b.strip()]


def localize_images(md: str, slug: str) -> str:
    """assets.zilliz.com 图片下载到本地，重写链接。
    文件名 <slug>-<两位序号>.<ext>，避免跨文章同名冲突。"""
    def repl(m):
        url = m.group(2)
        if not url.startswith("https://assets.zilliz.com/"):
            return m.group(0)  # 非站内资源不动
        ext = Path(url.split("?")[0]).suffix or ".png"
        name = "%s-%02d%s" % (slug, repl.seq, ext)
        repl.seq += 1
        IMG_DIR.mkdir(parents=True, exist_ok=True)
        dest = IMG_DIR / name
        if not dest.exists():
            data = fetch_bytes(url)
            if data is None:
                print("    警告：图片下载失败，保留外链 %s" % url)
                return m.group(0)
            dest.write_bytes(data)
            time.sleep(0.5)  # 下载限速，礼貌抓取
        return "![%s](/vector-db-images/%s)" % (m.group(1), name)

    repl.seq = 1
    return re.sub(r"!\[([^\]]*)\]\(([^)\s]+)\)", repl, md)


def normalize(text: str) -> str:
    """块结构规范化（与 ragflow 管线同款）：
    1) 连续空行压成一个 2) 松散列表收紧——都是「逐段配对」的前提。"""
    text = re.sub(r"\n{3,}", "\n\n", text)
    lines = text.split("\n")
    out = []
    is_item = lambda l: re.match(r"^\s*([-*+]|\d+\.)\s", l)  # noqa: E731
    for i, l in enumerate(lines):
        if l.strip() == "" and out and is_item(out[-1]) and i + 1 < len(lines) and is_item(lines[i + 1]):
            continue
        out.append(l)
    return "\n".join(out).strip() + "\n"


def scrub_dead_footnotes(md: str) -> str:
    """死链脚注清理：部分文章的脚注标记是 <sup>[[N]](#fnN)</sup>（指向文末锚点），
    但正文里没有对应的定义块——渲染成带方括号的死链。统一降为纯 <sup>N</sup>，
    与其他文章的脚注形态一致。"""
    return re.sub(r"<sup>\[\[(\d+)\]\]\(#fn\d+\)</sup>", r"<sup>\1</sup>", md)


def scrub_image_lines(md: str) -> str:
    """清掉图片行尾部的畸形残留：Zilliz 源 HTML 偶有 alt 里嵌未闭合 <a> 的坏图，
    转换后会漏出 `Patrice Bouchard." class="doc-image" ... />` 之类的尾巴。
    图片行在这些文档里都是独立块，行尾带 class=/id=//> 残留的一律截掉。"""
    return re.sub(
        r'(!\[[^\]]*\]\([^)]*\))[^!\n]*(?:class="[^"]*"|id="[^"]*"|/?>)[^!\n]*$',
        r"\1",
        md,
        flags=re.MULTILINE,
    )


def convert(content_html: str, slug: str) -> str:
    """完整转换链：结构清洗 → markdown 块 → 图片行去脏 → 图片本地化 → 规范化。"""
    soup = clean_soup(content_html)
    md = "\n\n".join(blocks_md(soup))
    md = scrub_image_lines(md)
    md = scrub_dead_footnotes(md)
    md = localize_images(md, slug)
    return normalize(md)


def main():
    only = sys.argv[1] if len(sys.argv) > 1 else None
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("%-56s %8s %s" % ("slug", "words", "status"))
    total, fail = 0, []
    for slug, url_path, _group, _zh, _en in ENTRIES:
        if only and not slug.startswith(only):
            continue
        page = fetch(site_url(url_path))
        if page is None:
            fail.append(slug)
            print("%-56s %8s FAIL" % (slug, "-"))
            continue
        try:
            title, content = get_article(page)
        except Exception as e:  # noqa: BLE001
            fail.append(slug)
            print("%-56s %8s FAIL(%s)" % (slug, "-", e))
            continue
        text = "# %s\n\n%s" % (title, convert(content, slug))
        (OUT_DIR / (slug + ".md")).write_text(text, encoding="utf-8")
        words = len(re.findall(r"[A-Za-z]+", text))
        total += words
        print("%-56s %8d ok" % (slug, words))
        time.sleep(1.5)  # 页面抓取限速，礼貌访问
    print("-" * 76)
    print("合计约 %d 英文词；失败 %d 个：%s" % (total, len(fail), fail or "无"))


if __name__ == "__main__":
    main()
