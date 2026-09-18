#!/usr/bin/env python3
"""抓取 arxiv 论文(ar5iv HTML 版)并转成结构化 Markdown 中间稿,供翻译用。

用法:
    python3 fetch_paper.py <arxiv-id> <slug> [vN]
    # 例: python3 fetch_paper.py 1706.03762 attention-is-all-you-need
    #     python3 fetch_paper.py 2312.05934 fine-tuning-or-retrieval v2

数据源(2026-09 验证):
    - 元数据(标题/作者/日期): https://arxiv.org/abs/<id> 的 citation_* meta 标签
    - 正文: https://ar5iv.labs.arxiv.org/html/<id> —— LaTeXML 生成,
      公式 <math alttext="原始LaTeX"> 的 alttext 属性完整保留 LaTeX 源码,
      这是以 LaTeX 形式迁移公式到博客 KaTeX 的关键。

输出:
    1. /tmp/ai-papers/<id>.md  中间稿:YAML 头(元数据) + 每行「标签<TAB>内容」
       标签: P=段落 H2/H3/H4=标题 EQ=块级公式 FIG=图 TBL=表 ABS=摘要段 REF=参考文献
       公式一律 $...$ / $$...$$ 定界(翻译时原样保留)
    2. docs/public/papers/<slug>/figN.png  论文图片按出现顺序重命名落地
       (译文页直接以 /papers/<slug>/figN.png 绝对路径引用)
"""

import html as html_lib
import re
import sys
import time
import urllib.request
from pathlib import Path

ABS_URL = "https://arxiv.org/abs/{}"
AR5IV_URL = "https://ar5iv.labs.arxiv.org/html/{}"
# 图片 URL 前缀: ar5iv 页面里的 src 是 /html/<id>/assets/... 相对路径
AR5IV_ORIGIN = "https://ar5iv.labs.arxiv.org"

OUT_DIR = Path("/tmp/ai-papers")                       # 中间稿目录(不进仓库)
FIG_DIR = Path(__file__).resolve().parents[2] / "docs" / "public" / "papers"

FETCH_RETRY = 5  # 本机代理偶发抖动,失败重试


def fetch(url: str) -> str:
    """带重试的抓取(与 newsupdate-claude 管线同款逻辑)。"""
    last_err = None
    for _ in range(FETCH_RETRY):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except Exception as e:
            last_err = e
            time.sleep(2)
    raise RuntimeError(f"抓取失败: {url} -> {last_err}")


def fetch_binary(url: str) -> bytes:
    """下载图片二进制(与 fetch 同重试策略)。"""
    last_err = None
    for _ in range(FETCH_RETRY):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as resp:
                return resp.read()
        except Exception as e:
            last_err = e
            time.sleep(2)
    raise RuntimeError(f"下载失败: {url} -> {last_err}")


# ── 元数据 ───────────────────────────────────────────────────────────
def extract_meta(abs_html: str) -> dict:
    """从 abs 页 <head> 提取 citation_title / citation_author 列表 / citation_date。"""
    def meta(name: str) -> str:
        m = re.search(rf'<meta name="{name}" content="([^"]*)"', abs_html)
        return html_lib.unescape(m.group(1)) if m else ""
    authors = re.findall(r'<meta name="citation_author" content="([^"]*)"', abs_html)
    return {"title": meta("citation_title"),
            "authors": ", ".join(html_lib.unescape(a) for a in authors),
            "date": meta("citation_date")}


# ── 正文转换 ─────────────────────────────────────────────────────────
def math_to_latex(fragment: str) -> str:
    """把片段里所有 <math alttext="X"> 替换成 $X$(行内定界)。

    alttext 属性值经过 XML 转义(&amp; &quot; 等),替换回来要 unescape 一次;
    属性里不会出现裸双引号,所以 [^"]* 能完整取到 LaTeX 源。
    """
    def repl(m):
        latex = html_lib.unescape(m.group(1)).strip()
        return f"${latex}$" if latex else ""
    # .*? 非贪婪跨过 math 内部的 MathML 标签(可能多行)
    return re.sub(r'<math[^>]*alttext="([^"]*)"[^>]*>.*?</math>', repl, fragment, flags=re.S)


def strip_tags(fragment: str) -> str:
    """剥掉剩余 HTML 标签、解码实体、压缩空白(保留 $...$ 公式标记)。"""
    txt = re.sub(r"<[^>]+>", "", fragment)
    txt = html_lib.unescape(txt)
    return re.sub(r"\s+", " ", txt).strip()


def table_to_markdown(tbl_html: str) -> str:
    """LaTeXML 表格转 markdown 竖线表(合并单元格摊平,复杂结构降级近似)。"""
    rows = []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", tbl_html, re.S):
        cells = []
        for td in re.findall(r"<t[dh][^>]*>(.*?)</t[dh]>", tr, re.S):
            cells.append(strip_tags(math_to_latex(td)) or " ")
        rows.append("| " + " | ".join(cells) + " |")
    if not rows:
        return ""
    # 第二行补表头分隔线(markdown 表格语法要求)
    sep = "| " + " | ".join(["---"] * (rows[0].count("|") - 1)) + " |"
    return "\n".join([rows[0], sep] + rows[1:])


def parse_body(doc_html: str, arxiv_id: str, slug: str, fig_manifest: list) -> list[tuple[str, str]]:
    """按文档顺序扫描正文,输出 (标签, 内容) 流。

    扫描策略: 在正文 HTML 上用交替匹配按顺序找五种块(ltx_title 标题 /
    ltx_equation 公式组 / figure 环境 / ltx_p 段落),谁出现在前面谁先输出。
    """
    # 只取 <article> 内的部分(排除页面壳)
    art = re.search(r'<article[^>]*class="ltx_document"[^>]*>(.*)</article>', doc_html, re.S)
    body = art.group(1) if art else doc_html

    # 统一的块匹配模式: 每个分支的命名组用 (?P<名>...) 标记
    pattern = re.compile(
        r'(?P<h><h([234])[^>]*class="ltx_title[^"]*"[^>]*>(?P<h_body>.*?)</h\2>)'
        # 块级公式: LaTeXML 用 <table class="ltx_equation"> 布局公式与编号(不是 div)
        r'|(?P<eq><table[^>]*class="ltx_equation[^"]*"[^>]*>(?P<eq_body>.*?)</table>)'
        r'|(?P<fig><figure[^>]*class="ltx_(?P<fig_kind>figure|table)"[^>]*>(?P<fig_body>.*?)</figure>)'
        r'|(?P<p><p[^>]*class="ltx_p"[^>]*>(?P<p_body>.*?)</p>)'
        r'|(?P<abs><div[^>]*class="ltx_abstract"[^>]*>(?P<abs_body>.*?)</div>)',
        re.S,
    )

    out = []
    for m in pattern.finditer(body):
        if m.group("h"):
            level = "H" + m.group(2)  # h2->H2 h3->H3 h4->H4
            out.append((level, strip_tags(math_to_latex(m.group("h_body")))))
        elif m.group("eq"):
            # 公式组: 组内所有 math 的 alttext 都提出来,块级 $$..$$ 定界
            latices = re.findall(r'<math[^>]*alttext="([^"]*)"', m.group("eq_body"))
            for lx in latices:
                out.append(("EQ", "$$" + html_lib.unescape(lx).strip() + "$$"))
        elif m.group("fig"):
            fb = m.group("fig_body")
            caption = re.search(r'<figcaption[^>]*>(.*?)</figcaption>', fb, re.S)
            cap = strip_tags(math_to_latex(caption.group(1))) if caption else ""
            if m.group("fig_kind") == "figure":
                # 图片: 按顺序重命名 figN.png 下载落地
                img = re.search(r'<img[^>]+src="([^"]+)"', fb)
                if img:
                    n = len(fig_manifest) + 1
                    fname = f"fig{n}.png"
                    fig_manifest.append({"src": img.group(1), "dest": fname})
                    out.append(("FIG", f"{fname} | {cap}"))
            else:
                # 表格(figure class="ltx_table" 里含 table.ltx_tabular + 表标题)
                tbl = re.search(r'<table[^>]*>(.*?)</table>', fb, re.S)
                md = table_to_markdown(tbl.group(0)) if tbl else ""
                out.append(("TBL", (md + " | " + cap).strip()))
        elif m.group("abs"):
            # 摘要: 里面的段落作为 ABS 输出(置于最前)
            for p in re.findall(r'<p[^>]*>(.*?)</p>', m.group("abs_body"), re.S):
                txt = strip_tags(math_to_latex(p))
                if txt:
                    out.append(("ABS", txt))
        elif m.group("p"):
            txt = strip_tags(math_to_latex(m.group("p_body")))
            if txt:
                out.append(("P", txt))

    # 参考文献(ltx_bibitem)附在最后,保留英文原文不翻译
    for bib in re.findall(r'<li[^>]*class="ltx_bibitem"[^>]*>(.*?)</li>', body, re.S):
        ref = strip_tags(math_to_latex(bib))
        if ref:
            out.append(("REF", ref))
    return out


# ── 主流程 ───────────────────────────────────────────────────────────
def main():
    if len(sys.argv) < 3:
        sys.exit("用法: python3 fetch_paper.py <arxiv-id> <slug> [vN]  (slug 用论文英文短横线名)")
    arxiv_id, slug = sys.argv[1], sys.argv[2]
    ver = sys.argv[3] if len(sys.argv) > 3 else ""   # 可选版本号,如 v2

    print(f"抓取 abs 元数据: {arxiv_id} ...")
    meta = extract_meta(fetch(ABS_URL.format(arxiv_id)))
    print(f"  {meta['title']} / {meta['authors']} / {meta['date']}")

    print(f"抓取 ar5iv 正文: {arxiv_id}{ver} ...")
    doc_html = fetch(AR5IV_URL.format(arxiv_id + ver))

    fig_manifest: list[dict] = []   # 图片清单: [{src: 远端相对路径, dest: 本地文件名}]
    blocks = parse_body(doc_html, arxiv_id, slug, fig_manifest)
    counts = {}
    for tag, _ in blocks:
        counts[tag] = counts.get(tag, 0) + 1
    print(f"解析完成: {counts}")

    # 下载图片到 docs/public/papers/<slug>/
    out_fig_dir = FIG_DIR / slug
    if fig_manifest:
        out_fig_dir.mkdir(parents=True, exist_ok=True)
        for item in fig_manifest:
            url = item["src"]
            if url.startswith("/"):  # ar5iv 相对路径补全域名
                url = AR5IV_ORIGIN + url
            data = fetch_binary(url)
            (out_fig_dir / item["dest"]).write_bytes(data)
            print(f"  图片 {item['dest']} <- {url} ({len(data)//1024}KB)")

    # 落中间稿
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    lines = [
        "---",
        f"title: {meta['title']}",
        f"authors: {meta['authors']}",
        f"date: {meta['date']}",
        f"arxiv: {arxiv_id}",
        f"slug: {slug}",
        f"source: https://arxiv.org/abs/{arxiv_id}",
        "---",
        "",
    ]
    lines += [f"{tag}\t{content}" for tag, content in blocks]
    out = OUT_DIR / f"{slug}.md"
    out.write_text("\n".join(lines) + "\n")
    print(f"中间稿 -> {out}")


if __name__ == "__main__":
    main()
