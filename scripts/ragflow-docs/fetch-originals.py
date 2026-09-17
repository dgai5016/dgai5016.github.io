#!/usr/bin/env python3
"""
RAGFlow 官方文档抓取与清洗管线（第一步：英文原文入库）

作用：
1. 按 manifest.py 清单从 GitHub（infiniflow/ragflow-docs main 分支）下载文档源码
   —— 比抓网页干净：拿到的就是官方维护的 markdown/MDX 源文件
2. 清洗 Docusaurus 专属语法为 VitePress 兼容的标准 markdown：
   - 剥 frontmatter（sidebar_position 等）与 MDX import/export 语句
   - <Tabs>/<TabItem> → 「**标签名：**」加粗小标题 + 去缩进内容
   - <APITable> 拆壳保留内部表格；<TOCInline> 整行删除
   - :::note/tip/caution/danger 提示块与 <details> 折叠块原样保留（VitePress 原生兼容）
   - 站内相对链接（./xxx.mdx 等）绝对化到 ragflow.io；相对图片路径绝对化到 raw.githubusercontent
3. 巨型 API 参考按 H2 章节切分成多份（精翻与浮层单页渲染都扛不住 200KB+ 整页）
4. 块结构规范化（空行压缩、松散列表收紧）——这是后续「逐段配对」的前提
5. 落盘到 docs/posts/ai/ragflow/en/<slug>.md

用法：python3 scripts/ragflow-docs/fetch-originals.py
依赖：仅 Python 标准库
"""

import re
import sys
import time
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from manifest import RAW_BASE, SITE_BASE, ENTRIES, SPLIT_ENTRIES  # noqa: E402

REPO = Path(__file__).resolve().parents[2]  # 博客仓库根目录
OUT_DIR = REPO / "docs" / "posts" / "ai" / "ragflow" / "en"

# raw.githubusercontent 上仓库根目录（图片相对路径解析用：images/ 在仓库根，不在 website/docs/）
RAW_ROOT = RAW_BASE[: -len("website/docs/")]
# 本仓库内文档目录名（相对路径解析的基准）
DOCS_ROOT = "website/docs"


def strip_frontmatter(text: str) -> str:
    """剥掉文件顶部的 Docusaurus frontmatter（--- 包裹的 sidebar_position/slug 等）。"""
    return re.sub(r"\A---\n.*?\n---\n", "", text, flags=re.DOTALL)


def strip_mdx_statements(text: str) -> str:
    """剥掉 MDX 的 import/export 语句行与 {/* ... */} 注释。
    这些是 Docusaurus 构建期的 JS 代码，VitePress 里既不能执行也不该展示。"""
    lines = text.split("\n")
    out = []
    for l in lines:
        s = l.strip()
        if s.startswith("import ") or s.startswith("export "):
            continue  # import/export 语句整行丢弃
        out.append(l)
    text = "\n".join(out)
    return re.sub(r"\{/\*.*?\*/\}", "", text)  # MDX 注释


def convert_tabs(text: str) -> str:
    """<Tabs>/<TabItem>（Docusaurus 标签页组件）→ 标准 markdown。
    每个 TabItem 的 label/value 转成「**标签名：**」加粗小标题（自成一块），
    内容去掉公共缩进后原样保留——左右双栏里都能正常渲染。"""
    lines = text.split("\n")
    out, i, n = [], 0, len(lines)
    while i < n:
        line = lines[i]
        s = line.strip()
        # <Tabs 开标签：属性可能跨多行（defaultValue/values 数组），读到含 > 的行为止
        if s.startswith("<Tabs"):
            while i < n and ">" not in lines[i]:
                i += 1
            i += 1
            continue
        if s == "</Tabs>":
            i += 1
            continue
        # <TabItem 开标签：同样兼容跨行属性，提取 label（缺省用 value 首字母大写）
        if s.startswith("<TabItem"):
            attrs = s
            while i < n and ">" not in lines[i]:
                i += 1
                attrs += lines[i].strip()
            lm = re.search(r'label="([^"]*)"', attrs) or re.search(r"label='([^']*)'", attrs)
            vm = re.search(r'value="([^"]*)"', attrs) or re.search(r"value='([^']*)'", attrs)
            label = lm.group(1) if lm else (vm.group(1).capitalize() if vm else "")
            # 常见操作系统的规范写法（capitalize() 会把 macos 变成 Macos）
            label = {"macos": "macOS", "Macos": "macOS"}.get(label, label)
            out += ["", "**%s：**" % label, ""]
            i += 1
            # 收集本 TabItem 内容直到闭合标签
            content = []
            while i < n and lines[i].strip() != "</TabItem>":
                content.append(lines[i])
                i += 1
            i += 1  # 跳过 </TabItem>
            # 去公共缩进（≥2 空格才去；围栏内容同步去，保持块内相对缩进）
            indents = [len(l) - len(l.lstrip(" ")) for l in content if l.strip()]
            cut = min(indents) if indents else 0
            if cut >= 2:
                content = [l[cut:] if l.strip() else l for l in content]
            while content and not content[0].strip():
                content.pop(0)
            while content and not content[-1].strip():
                content.pop()
            out += content + [""]
            continue
        out.append(line)
        i += 1
    return "\n".join(out)


def strip_component_shells(text: str) -> str:
    """拆掉无语义的 Docusaurus 组件壳、保留内容。
    <APITable>/<BrowserWindow> 只是给表格/窗口加样式，内容照常保留；
    <TOCInline .../> 是页内目录组件，纯导航装饰，整行删除。"""
    text = re.sub(r"<TOCInline\b[^>]*/?>", "", text)
    text = re.sub(r"</?(?:APITable|BrowserWindow)\b[^>]*>", "", text)
    return text


def resolve_repo_path(link: str, doc_path: str) -> str:
    """把文档里的相对路径解析成「仓库根相对路径」。
    doc_path 是本文档在仓库内的路径（website/docs/...），
    link 形如 ./x.mdx、../y/z.md、../../images/a.png。"""
    base = DOCS_ROOT + "/" + doc_path.rsplit("/", 1)[0] if "/" in doc_path else DOCS_ROOT
    parts = (base + "/" + link).split("/")
    resolved = []
    for p in parts:
        if p == "..":
            if resolved:
                resolved.pop()
        elif p not in ("", "."):
            resolved.append(p)
    return "/".join(resolved)


def absolutize_links(text: str, doc_path: str) -> str:
    """相对链接绝对化（译文与浮层里链接必须可点）：
    - markdown 链接里的 .mdx/.md 相对路径 → https://ragflow.io/docs/...（去掉扩展名）
    - 相对图片路径（images/ 在仓库根）→ raw.githubusercontent 绝对 URL
    - 绝对站内路径 /docs/... → 补上站点域名
    锚点链接（#xxx）与外部 http(s) 链接原样保留"""

    def rewrite(m):
        bang, label, url = m.group(1), m.group(2), m.group(3)
        if url.startswith(("http://", "https://", "#", "mailto:")):
            return m.group(0)
        # 图片相对路径 → 仓库 raw 地址（images/ 等资源在仓库根）
        if bang:
            return "![%s](%s)" % (label, RAW_ROOT + resolve_repo_path(url, doc_path))
        # 文档相对链接 → 官方站路由（去扩展名）
        resolved = resolve_repo_path(url, doc_path)
        resolved = re.sub(r"\.(mdx|md)$", "", resolved)
        resolved = re.sub(r"^website/docs/", "", resolved)
        return "[%s](%s)" % (label, SITE_BASE + resolved)

    text = re.sub(r"(!?)\[([^\]]*)\]\(([^)\s]+)\)", rewrite, text)
    text = text.replace("](/docs/", "](" + SITE_BASE)
    return text


def dedent_container_markers(text: str) -> str:
    """容器标记修正（围栏感知，只动标记行，不动内容行——不影响块结构）。
    1) 顶格化：官方源码里嵌在列表项内的提示块带 3 空格缩进——Docusaurus 认，
       但 markdown-it-container 只认顶格 :::，缩进的会整块按原文显示。
    2) 类型映射：Docusaurus 的容器类型 VitePress 不全支持——
       caution→warning、note→info（视觉语义对应：黄框、蓝框）；
       tip/info/danger 两边同名不用动。"""
    lines, in_fence = text.split("\n"), False
    kind_map = {"caution": "warning", "note": "info"}
    for i, line in enumerate(lines):
        if line.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if in_fence:
            continue
        if re.match(r"^\s+:::", line):
            line = line.lstrip()
        m = re.match(r"^(:::)(caution|note)\b(.*)$", line)
        if m:
            line = m.group(1) + kind_map[m.group(2)] + m.group(3)
        lines[i] = line
    return "\n".join(lines)


def normalize(text: str) -> str:
    """块结构规范化：这是后续「逐段配对」的前提。
    1) 连续多个空行压成一个（空行是块分隔符，数量必须恒为 1）
    2) 列表项之间的空行收紧——松散列表会让逐块配对把每个列表项误判成独立块
    3) 连续多条 --- 分隔线压成一条（删除 TOCInline 等组件后可能露出成对的 ---）"""
    text = re.sub(r"\n{3,}", "\n\n", text)
    text = re.sub(r"(^---\n)(---\n)+", r"\1", text, flags=re.MULTILINE)
    lines = text.split("\n")
    out = []
    is_item = lambda l: re.match(r"^\s*([-*+]|\d+\.)\s", l)  # noqa: E731
    for i, l in enumerate(lines):
        if l.strip() == "" and out and is_item(out[-1]) and i + 1 < len(lines) and is_item(lines[i + 1]):
            continue
        out.append(l)
    return "\n".join(out).strip() + "\n"


def clean(text: str, doc_path: str) -> str:
    """完整清洗链：frontmatter → MDX 语句 → 组件壳 → Tabs → 链接 → 容器顶格化 → 规范化。"""
    text = strip_frontmatter(text)
    text = strip_mdx_statements(text)
    text = strip_component_shells(text)
    text = convert_tabs(text)
    text = absolutize_links(text, doc_path)
    text = dedent_container_markers(text)
    return normalize(text)


def split_api_doc(text: str, base_slug: str, title_en: str, target_parts: int) -> list[tuple[str, str]]:
    """巨型 API 参考按 H2 章节切分。
    返回 [(part_slug, part_text), ...]，份数约等于 target_parts（按章节边界就近凑，
    单个超长章节独立成份）。每份开头补 H1（配对构建时会丢弃，但保持文件自解释）。
    H2 判定跳过代码围栏内部（围栏里的 ## 不是章节标题）。"""
    lines = text.split("\n")
    h1 = ""
    for l in lines:
        if l.startswith("# "):
            h1 = l[2:].strip()
            break
    # 剥掉原文自己的 H1——每份分片开头会补「# 标题 (Part N)」，原文 H1 保留会出现双标题
    lines = [l for l in lines if not l.startswith("# ")] if h1 else lines
    # 切章节：H2 之前的内容（H1+导语）并入第一份
    sections, cur = [], []
    in_fence = False
    for l in lines:
        if l.strip().startswith("```"):
            in_fence = not in_fence
        if not in_fence and l.startswith("## "):
            sections.append(cur)
            cur = [l]
        else:
            cur.append(l)
    sections.append(cur)
    sections = [s for s in sections if "".join(s).strip()]
    # 按目标份数算容量上限，顺序装箱
    total = sum(len("\n".join(s)) for s in sections)
    cap = max(total // target_parts, 1)
    parts, buf, size = [], [], 0
    for s in sections:
        if buf and size + len("\n".join(s)) > cap:
            parts.append(buf)
            buf, size = [], 0
        buf.append(s)
        size += len("\n".join(s))
    if buf:
        parts.append(buf)
    out = []
    for idx, p in enumerate(parts, 1):
        body = "\n\n".join("\n".join(s).strip("\n") for s in p).strip()
        out.append((
            "%s-%02d" % (base_slug, idx),
            "# %s (Part %d)\n\n%s\n" % (title_en, idx, body),
        ))
    return out


def fetch(url: str) -> str | None:
    """带 3 次递增退避重试的下载（网络偶发 SSL EOF / 超时）。"""
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            return urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
        except Exception:  # noqa: BLE001
            if attempt == 2:
                return None
            time.sleep(2 * (attempt + 1))
    return None


def main():
    # 可选过滤参数：只处理 slug 前缀匹配的条目（如 `release-notes` 只抓更新日志）。
    # 用于增量补充新文档——避免重抓全部：上游若已更新，全量重抓会改写 en/ 源文，
    # 与已完成的 zh 译文块结构错位
    only = sys.argv[1] if len(sys.argv) > 1 else None
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("%-44s %8s %s" % ("slug", "words", "status"))
    total, fail = 0, []

    def report(slug: str, text: str, tag: str = "ok"):
        nonlocal total
        (OUT_DIR / (slug + ".md")).write_text(text, encoding="utf-8")
        words = len(re.findall(r"[A-Za-z]+", text))
        total += words
        print("%-44s %8d %s" % (slug, words, tag))

    # 1) 普通条目：抓取 → 清洗 → 落盘
    for slug, path, *_ in ENTRIES:
        if only and not slug.startswith(only):
            continue
        raw = fetch(RAW_BASE + path)
        if raw is None:
            fail.append(path)
            print("%-44s %8s FAIL" % (slug, "-"))
            continue
        report(slug, clean(raw, path))

    # 2) 切分条目：抓取 → 清洗 → 按 H2 切多份 → 逐份落盘
    for base, path, _group, _zh, title_en, target_parts, _anchor in SPLIT_ENTRIES:
        if only and not base.startswith(only):
            continue
        raw = fetch(RAW_BASE + path)
        if raw is None:
            fail.append(path)
            print("%-44s %8s FAIL" % (base, "-"))
            continue
        for part_slug, part_text in split_api_doc(clean(raw, path), base, title_en, target_parts):
            report(part_slug, part_text, "ok (split)")

    print("-" * 60)
    print("合计约 %d 英文词；失败 %d 个：%s" % (total, len(fail), fail or "无"))


if __name__ == "__main__":
    main()
