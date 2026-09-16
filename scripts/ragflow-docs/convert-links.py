#!/usr/bin/env python3
"""
链接改造：《RAGFlow 学习地图》文章里的官方文档外链
改写成 <RagflowDocLink slug="...">站内双语阅读</RagflowDocLink> 组件标签。

只改写「编号条目」形态的文档链接（**N. [译名](URL)**），文章其余外链
（如 release_notes 更新日志、「这里」等指路链接）保持原样。

注意：切分条目（HTTP/Python API 参考的各分片）多篇共用同一个官方 URL，
URL→slug 映射不唯一，本脚本无法自动区分——分片条目请在文章里直接写
组件标签，不走本脚本。

用法：python3 scripts/ragflow-docs/convert-links.py [--dry-run]
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from manifest import ENTRIES, site_url  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
ARTICLE = REPO / "docs" / "posts" / "ai" / "ragflow" / "ragflow-docs-guide.md"

# slug → 官方 URL（来自 manifest.py；sourceUrl 是唯一键，反查成 URL→slug）
URL_SLUG = {site_url(path): slug for slug, path, *_ in ENTRIES}


def main():
    dry = "--dry-run" in sys.argv
    text = ARTICLE.read_text(encoding="utf-8")

    # 匹配编号条目：**N. [译名](URL)**
    # URL 只要求 ragflow.io 开头，是否属于清单由 URL_SLUG 映射过滤
    pattern = re.compile(
        r"\*\*(\d+)\. \[([^\]]+)\]\((https://ragflow\.io/[^)]+)\)\*\*"
    )

    converted, skipped = [], []

    def repl(m):
        num, label, url = m.group(1), m.group(2), m.group(3)
        slug = URL_SLUG.get(url)
        if not slug:
            skipped.append(url)
            return m.group(0)  # 不在清单里的链接原样保留
        converted.append((num, slug))
        # 注意：markdown 语法（**加粗**）在组件插槽内不会被 markdown-it 处理，
        # 星号会原样显示——必须用 HTML 的 <strong> 标签
        return '<RagflowDocLink slug="%s"><strong>%s. %s</strong></RagflowDocLink>' % (slug, num, label)

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
