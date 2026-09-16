#!/usr/bin/env python3
"""
清单生成器：manifest.py + en/ 目录实际文件 → ragflow-docs-manifest.ts。

为什么需要它：全管线只有 manifest.py 一份手工清单；前端 TS 清单
（BilingualOverlay 头部标题/上下篇导航、RagflowDocLink 的 href 都靠它）
必须与脚本侧逐条一致，112+ 条目手工同步两份必出错，故由脚本生成。

切分条目的真实份数以 en/ 目录为准（fetch 时按章节大小装箱，份数可能
微调于目标值），本脚本扫盘展开成 references-http-api-01 ... NN 条目，
中文标题带（一）（二）…序号。

用法：python3 scripts/ragflow-docs/gen-manifest.py   # 在 Phase 2 抓取完成后执行
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from manifest import ENTRIES, SPLIT_ENTRIES, site_url  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
EN_DIR = REPO / "docs" / "posts" / "ai" / "ragflow" / "en"
OUT = REPO / "docs" / ".vitepress" / "theme" / "ragflow-docs-manifest.ts"

# 中文数字（切分条目的（一）（二）…序号用）
CN_NUM = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十",
          "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十"]


def split_part_entries():
    """扫 en/ 目录展开切分条目，按「插入锚点」分组返回 {anchor: [记录...]}。
    锚点是 ENTRIES 里的一个 slug——该组分片在清单顺序上紧跟其后
    （API 参考跟在术语表后、更新日志跟在 FAQ 后），保证浮层上一篇/下一篇
    与文章板块顺序一致。"""
    groups = {}
    for base, path, group, zh_base, en_base, _n, anchor in SPLIT_ENTRIES:
        parts = sorted(EN_DIR.glob("%s-??.md" % base))
        if not parts:
            print("警告：%s 在 en/ 下没有任何分片（先跑 fetch-originals.py）" % base)
            continue
        url = site_url(path)  # 各分片同源一篇官方页面，sourceUrl 相同
        rows = []
        for i, p in enumerate(parts, 1):
            rows.append((p.stem, group,
                         "%s（%s）" % (zh_base, CN_NUM[i] if i < len(CN_NUM) else str(i)),
                         "%s (Part %d)" % (en_base, i), url))
        groups[anchor] = groups.get(anchor, []) + rows
    return groups


def main():
    # 普通条目按清单顺序；切分条目按各自锚点插入（API 分片跟术语表、
    # 更新日志分片跟 FAQ），与文章板块的展示顺序一致——浮层上一篇/下一篇的动线才连贯
    by_anchor = split_part_entries()
    rows, pending = [], list(by_anchor.items())
    for slug, path, group, zh, en in ENTRIES:
        rows.append((slug, group, zh, en, site_url(path)))
        for anchor, parts in list(pending):
            if anchor == slug:
                rows += parts
                pending.remove((anchor, parts))
    if pending:  # 防御：锚点不在清单里时分片退回追加在末尾
        for _anchor, parts in pending:
            rows += parts

    lines = [
        "// RAGFlow 双语文档清单——本文件由 scripts/ragflow-docs/gen-manifest.py 生成，勿手改。",
        "// 数据源：scripts/ragflow-docs/manifest.py（单一事实源）+ en/ 目录的分片文件。",
        "// 消费方：BilingualOverlay（头部标题/原文链接/上下篇导航）、RagflowDocLink（href）。",
        "export interface RagflowDocMeta {",
        "  slug: string      // 站内标识，对应 posts/ai/ragflow/paired/<slug>.md",
        "  group: string     // 分组名（与官方文档板块结构一致）",
        "  titleZh: string   // 中文标题（overlay 头部主标题）",
        "  titleEn: string   // 英文标题（副标题）",
        "  sourceUrl: string // 官方英文原文链接（「阅读原文」入口）",
        "}",
        "",
        "export const ragflowDocs: RagflowDocMeta[] = [",
    ]
    for slug, group, zh, en, url in rows:
        lines.append("  { slug: '%s', group: '%s', titleZh: '%s', titleEn: '%s', sourceUrl: '%s' }," % (slug, group, zh, en, url))
    lines.append("]")
    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("已生成 %s（共 %d 条）" % (OUT, len(rows)))


if __name__ == "__main__":
    main()
