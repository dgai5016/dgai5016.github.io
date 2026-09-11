#!/usr/bin/env python3
"""
MCP 官方文档抓取与清洗管线（第一步：英文原文入库）

作用：
1. 按 MANIFEST 清单从 modelcontextprotocol.io 下载 24 篇文档的 .md 原始版本
2. 剥离文件顶部的 llms.txt 推广横幅（以 > 开头的引用块）
3. 清洗 Mintlify 私有组件（<Note>/<Card>/<Frame> 等）为标准 markdown
4. 站内相对链接（/docs/... 等）改写为绝对链接，保证译文里链接可点
5. 落盘到 docs/mcp-docs/en/<slug>.md

用法：python3 scripts/mcp-docs/fetch-originals.py
依赖：仅 Python 标准库
"""

import re
import time
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]  # 博客仓库根目录
OUT_DIR = REPO / "docs" / "posts" / "ai" / "mcp" / "en"
BASE = "https://modelcontextprotocol.io/docs/2026-07-28/"

# 24 篇文档清单：slug 是站内文件名（也是前端路由标识），path 是官方 URL 路径
MANIFEST = [
    ("intro", "getting-started/intro"),
    ("architecture", "learn/architecture"),
    ("server-concepts", "learn/server-concepts"),
    ("client-concepts", "learn/client-concepts"),
    ("versioning", "learn/versioning"),
    ("connect-local-servers", "develop/connect-local-servers"),
    ("connect-remote-servers", "develop/connect-remote-servers"),
    ("build-with-agent-skills", "develop/build-with-agent-skills"),
    ("build-server", "develop/build-server"),
    ("build-client", "develop/build-client"),
    ("client-best-practices", "develop/clients/client-best-practices"),
    ("sdk", "sdk"),
    ("security-authorization", "tutorials/security/authorization"),
    ("security-best-practices", "tutorials/security/security_best_practices"),
    ("inspector", "tools/inspector"),
    ("inspector-web", "tools/inspector/web"),
    ("inspector-cli", "tools/inspector/cli"),
    ("inspector-tui", "tools/inspector/tui"),
    ("inspector-configuration", "tools/inspector/configuration"),
    ("inspector-authorization", "tools/inspector/authorization"),
    ("inspector-protocol-eras", "tools/inspector/protocol-eras"),
    ("inspector-recipes", "tools/inspector/recipes"),
    ("debugging", "tools/debugging"),
    ("examples", "../../examples"),  # examples 不在 /docs/ 版本路径下，特殊处理
]

# 站内相对路径前缀 → 绝对 URL 前缀（链接改写用）
ABS_PREFIX = "https://modelcontextprotocol.io"


def strip_banner(text: str) -> str:
    """剥离文件顶部的 llms.txt 推广横幅（连续的 > 引用行 + 其后空行）。"""
    lines = text.splitlines()
    i = 0
    while i < len(lines) and (lines[i].startswith(">") or lines[i].strip() == ""):
        i += 1
    return "\n".join(lines[i:]).strip() + "\n"


def clean_mintlify(text: str) -> str:
    """把 Mintlify 私有组件改写为标准 markdown，保证 VitePress 能正常渲染。"""
    # 1) 提示框组件：<Note>/<Warning>/<Tip>/<Check> → blockquote 加粗前缀
    for tag, label in [
        ("Note", "注"),
        ("Warning", "注意"),
        ("Tip", "提示"),
        ("Check", "校验"),
    ]:
        # 多行内容整体转成 blockquote（逐行加 "> "）
        pattern = re.compile(
            r"<%s>\n?(.*?)\n?</%s>" % (tag, tag), re.DOTALL | re.IGNORECASE
        )

        def to_quote(m, label=label):
            body = m.group(1).strip()
            quoted = "\n".join("> " + l for l in body.splitlines())
            return "> **%s：**\n>%s\n" % (label, quoted if quoted.startswith(" ") else " " + body)

        text = pattern.sub(to_quote, text)

    # 2) 卡片组：<CardGroup ...> ... </CardGroup> 内的 <Card> 逐个转成列表项
    def card_to_item(m):
        attrs, body = m.group(1), m.group(2).strip()
        title = re.search(r'title="([^"]*)"', attrs)
        href = re.search(r'href="([^"]*)"', attrs)
        t = title.group(1) if title else ""
        h = href.group(1) if href else ""
        desc = " ".join(body.split())
        if h:
            return "- [%s](%s)%s" % (t, h, ("：" + desc) if desc else "")
        return "- **%s**%s" % (t, ("：" + desc) if desc else "")

    text = re.sub(r"<Card ([^>]*)>\n?(.*?)\n?</Card>", card_to_item, text, flags=re.DOTALL)
    text = re.sub(r"<CardGroup[^>]*>|</CardGroup>", "", text)  # 卡片组壳直接拆掉

    # 3) 其余容器壳一律拆除、保留内部内容：<Frame>/<Steps>/<Step>/<Tabs>/<Tab>/<Example>
    text = re.sub(r"</?(?:Frame|Steps|Step|Tabs|Tab|Example)[^>]*>", "", text)

    return text


def normalize(text: str) -> str:
    """块结构规范化：这是后续「逐段配对」的前提。
    1) 连续多个空行压成一个（空行是块分隔符，数量必须恒为 1）
    2) 列表项之间的空行收紧——松散列表（- a\\n\\n- b）会让逐块配对
       把每个列表项误判成独立块；收紧后整个列表 = 一个块
    """
    text = re.sub(r"\n{3,}", "\n\n", text)
    lines = text.split("\n")
    out = []
    is_item = lambda l: re.match(r"^\s*([-*+]|\d+\.)\s", l)  # noqa: E731
    for i, l in enumerate(lines):
        # 当前是空行、上一行是列表项、下一行也是列表项 → 跳过（收紧）
        if l.strip() == "" and out and is_item(out[-1]) and i + 1 < len(lines) and is_item(lines[i + 1]):
            continue
        out.append(l)
    return "\n".join(out)


def absolutize_links(text: str, path: str) -> str:
    """站内相对链接改写为绝对链接。
    覆盖两类：斜杠开头的站内路径（/docs/...，含无尾斜杠的 /examples），
    以及同目录兄弟文件相对链接（./server-concepts）——后者按本文档所在
    URL 目录拼出绝对地址。"""
    for prefix in [
        "/docs/", "/specification/", "/extensions/", "/registry/",
        "/seps/", "/community/", "/development/", "/examples/",
    ]:
        text = text.replace("](" + prefix, "](" + ABS_PREFIX + prefix)
        # HTML 标签属性里的相对路径（如 href="/docs/..."）
        text = text.replace('href="' + prefix, 'href="' + ABS_PREFIX + prefix)
    # 无尾斜杠的裸路径（如 ](/examples)）
    text = re.sub(r"\]\((/examples)\)", "](" + ABS_PREFIX + r"/examples)", text)
    # 兄弟文件相对链接：./xxx → 按 URL 父目录拼接（path 如 learn/architecture）
    parent = path.rsplit("/", 1)[0] if "/" in path else ""
    base_dir = BASE + parent + "/" if parent else BASE

    def sibling(m):
        return "](" + base_dir + m.group(1) + ")"

    text = re.sub(r"\]\(\./([a-z0-9_-]+)\)", sibling, text)
    return text


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    print("%-28s %8s %s" % ("slug", "words", "status"))
    total = 0
    for slug, path in MANIFEST:
        url = (ABS_PREFIX + "/examples.md") if slug == "examples" else (BASE + path + ".md")
        # 网络偶发 SSL EOF / 超时，带 3 次递增退避重试
        raw, err = None, None
        for attempt in range(3):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                raw = urllib.request.urlopen(req, timeout=60).read().decode("utf-8")
                break
            except Exception as e:  # noqa: BLE001 - 记下最后一次错误，退避后重试
                err = e
                time.sleep(2 * (attempt + 1))
        if raw is None:
            print("%-28s %8s FAIL %s" % (slug, "-", err))
            continue
        text = normalize(absolutize_links(clean_mintlify(strip_banner(raw)), path))
        (OUT_DIR / (slug + ".md")).write_text(text, encoding="utf-8")
        words = len(re.findall(r"[A-Za-z]+", text))
        total += words
        print("%-28s %8d ok" % (slug, words))
    print("-" * 44)
    print("24 篇合计约 %d 英文词" % total)


if __name__ == "__main__":
    main()
