#!/usr/bin/env python3
"""
清单生成器：manifest.py → theme/vector-db-docs-manifest.ts。

前端 TS 清单（BilingualOverlay 头部标题/上下篇导航、VectorDbDocLink 的 href）
必须与脚本侧逐条一致，由脚本生成避免两份手工同步出错。
会校验 en/<slug>.md 确实存在（先跑 fetch-originals.py）。

用法：python3 scripts/vector-db-docs/gen-manifest.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from manifest import ENTRIES, site_url  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
EN_DIR = REPO / "docs" / "posts" / "ai" / "vector-db-101" / "en"
OUT = REPO / "docs" / ".vitepress" / "theme" / "vector-db-docs-manifest.ts"


def main():
    lines = [
        "// Vector Database 101 双语文档清单——本文件由 scripts/vector-db-docs/gen-manifest.py 生成，勿手改。",
        "// 数据源：scripts/vector-db-docs/manifest.py（单一事实源）。",
        "// 消费方：BilingualOverlay（头部标题/原文链接/上下篇导航）、VectorDbDocLink（href）。",
        "export interface VectorDbDocMeta {",
        "  slug: string      // 站内标识，对应 posts/ai/vector-db-101/paired/<slug>.md",
        "  group: string     // 分组名（基础概念 / Milvus 入门 / 索引算法）",
        "  titleZh: string   // 中文标题（overlay 头部主标题）",
        "  titleEn: string   // 英文标题（副标题）",
        "  sourceUrl: string // 官方英文原文链接（「阅读原文」入口）",
        "}",
        "",
        "export const vectorDbDocs: VectorDbDocMeta[] = [",
    ]
    n = 0
    for slug, url_path, group, zh, en in ENTRIES:
        if not (EN_DIR / (slug + ".md")).exists():
            print("警告：%s 在 en/ 下不存在（先跑 fetch-originals.py）" % slug)
        lines.append("  { slug: '%s', group: '%s', titleZh: '%s', titleEn: '%s', sourceUrl: '%s' },"
                     % (slug, group, zh, en, site_url(url_path)))
        n += 1
    lines.append("]")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("已生成 %s（共 %d 条）" % (OUT, n))


if __name__ == "__main__":
    main()
