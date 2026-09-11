#!/usr/bin/env python3
"""
链接改造（第四步）：《MCP 学习地图》文章里的 24 个官方文档外链
改写成 <McpDocLink slug="...">站内双语阅读</McpDocLink> 组件标签。

只改写「编号条目」形态的文档链接（**N. [译名](URL)**），文章其余外链
（如 Specification 规格书、文末「这里」等）保持原样。

用法：python3 scripts/mcp-docs/convert-links.py [--dry-run]
"""

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
ARTICLE = REPO / "docs" / "posts" / "ai" / "mcp-docs-guide.md"
BASE = "https://modelcontextprotocol.io/docs/2026-07-28/"

# slug → 官方 URL（与 fetch-originals.py 的 MANIFEST 一致）
SLUG_URLS = {
    "intro": BASE + "getting-started/intro",
    "architecture": BASE + "learn/architecture",
    "server-concepts": BASE + "learn/server-concepts",
    "client-concepts": BASE + "learn/client-concepts",
    "versioning": BASE + "learn/versioning",
    "connect-local-servers": BASE + "develop/connect-local-servers",
    "connect-remote-servers": BASE + "develop/connect-remote-servers",
    "build-with-agent-skills": BASE + "develop/build-with-agent-skills",
    "build-server": BASE + "develop/build-server",
    "build-client": BASE + "develop/build-client",
    "client-best-practices": BASE + "develop/clients/client-best-practices",
    "sdk": BASE + "sdk",
    "security-authorization": BASE + "tutorials/security/authorization",
    "security-best-practices": BASE + "tutorials/security/security_best_practices",
    "inspector": BASE + "tools/inspector",
    "inspector-web": BASE + "tools/inspector/web",
    "inspector-cli": BASE + "tools/inspector/cli",
    "inspector-tui": BASE + "tools/inspector/tui",
    "inspector-configuration": BASE + "tools/inspector/configuration",
    "inspector-authorization": BASE + "tools/inspector/authorization",
    "inspector-protocol-eras": BASE + "tools/inspector/protocol-eras",
    "inspector-recipes": BASE + "tools/inspector/recipes",
    "debugging": BASE + "tools/debugging",
    "examples": "https://modelcontextprotocol.io/examples",
}
URL_SLUG = {v: k for k, v in SLUG_URLS.items()}


def main():
    dry = "--dry-run" in sys.argv
    text = ARTICLE.read_text(encoding="utf-8")

    # 匹配编号条目：**N. [译名](URL)** （intro 试点已手工转换过，自然跳过）
    # URL 只要求 modelcontextprotocol.io 开头，是否属于 24 篇由 URL_SLUG 映射过滤
    pattern = re.compile(
        r"\*\*(\d+)\. \[([^\]]+)\]\((https://modelcontextprotocol\.io/[^)]+)\)\*\*"
    )

    converted, skipped = [], []

    def repl(m):
        num, label, url = m.group(1), m.group(2), m.group(3)
        slug = URL_SLUG.get(url)
        if not slug:
            skipped.append(url)
            return m.group(0)  # 不在 24 篇清单里的链接原样保留
        converted.append((num, slug))
        # 注意：markdown 语法（**加粗**）在组件插槽内不会被 markdown-it 处理，
        # 星号会原样显示——必须用 HTML 的 <strong> 标签
        return '<McpDocLink slug="%s"><strong>%s. %s</strong></McpDocLink>' % (slug, num, label)

    new_text = pattern.sub(repl, text)

    print("转换 %d 条：" % len(converted))
    for num, slug in converted:
        print("  #%s -> %s" % (num, slug))
    if skipped:
        print("跳过（不在清单）：%s" % skipped)

    if not dry:
        ARTICLE.write_text(new_text, encoding="utf-8")
        print("已写回 %s" % ARTICLE)
    else:
        print("[dry-run] 未写回")


if __name__ == "__main__":
    main()
