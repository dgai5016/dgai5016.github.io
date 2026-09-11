#!/usr/bin/env python3
"""
对齐校验：对比 en 源文与 zh 译文的空行块数（逐段配对的前提）。

用法：python3 scripts/mcp-docs/check-alignment.py <slug> [zh路径]
默认 zh 路径为 docs/mcp-docs/en/<slug>-zh-CN/translation.md（精翻输出目录）。
输出：en/zh 块数 + MATCH/MISMATCH；MISMATCH 时打印首个差异块的首行，便于定位修复。
"""

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def split_blocks(text: str) -> list[str]:
    """按空行切块；代码围栏内部与 Mintlify 容器组件（CodeGroup 等）开闭标签之间
    不切块（与 build-paired.py 同一规则）。"""
    container_re = re.compile(r"<(/?)(CodeGroup|AccordionGroup|Accordion|Tabs|Tab|Steps|Frame)\b")
    blocks, cur, in_fence, stack = [], [], False, []
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            for m in container_re.finditer(line):
                if m.group(1):
                    while stack and stack.pop() != m.group(2):
                        pass
                else:
                    stack.append(m.group(2))
        if s == "" and not in_fence and not stack:
            if cur:
                blocks.append("\n".join(cur).strip("\n"))
                cur = []
        else:
            cur.append(line)
    if cur:
        blocks.append("\n".join(cur).strip("\n"))
    return [b for b in blocks if b.strip()]


def main():
    slug = sys.argv[1]
    en_path = REPO / "docs" / "posts" / "ai" / "mcp" / "en" / (slug + ".md")
    zh_path = (
        Path(sys.argv[2]).resolve()
        if len(sys.argv) > 2
        else en_path.parent / (slug + "-zh-CN") / "translation.md"
    )
    en = split_blocks(en_path.read_text(encoding="utf-8"))
    zh = split_blocks(zh_path.read_text(encoding="utf-8"))

    code = lambda bs: sum(1 for b in bs if b.strip().startswith("```"))  # noqa: E731
    print("en_blocks=%d zh_blocks=%d en_code=%d zh_code=%d"
          % (len(en), len(zh), code(en), code(zh)))

    if len(en) == len(zh):
        print("MATCH")
        return

    print("MISMATCH")
    # 定位首个差异块：打印两侧首个不匹配位置的首行，辅助修复
    for i in range(max(len(en), len(zh))):
        e = en[i].split("\n")[0][:70] if i < len(en) else "<无>"
        z = zh[i].split("\n")[0][:70] if i < len(zh) else "<无>"
        if e != z:
            print("首个差异在第 %d 块：" % (i + 1))
            print("  en: %s" % e)
            print("  zh: %s" % z)
            break
    sys.exit(1)


if __name__ == "__main__":
    main()
