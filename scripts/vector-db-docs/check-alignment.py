#!/usr/bin/env python3
"""
对齐校验：对比 en 源文与 zh 译文的空行块数（逐段配对的前提）。

用法：python3 scripts/vector-db-docs/check-alignment.py <slug> [zh路径]
默认 zh 路径为 docs/posts/ai/vector-db-101/zh/<slug>.md。
输出：en/zh 块数 + MATCH/MISMATCH；MISMATCH 时打印首个差异块的首行，便于定位修复。

切块规则在 blocksplit.py（与 build-paired.py 共用，两处块数口径永远一致）。
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from blocksplit import split_blocks  # noqa: E402

REPO = Path(__file__).resolve().parents[2]
BASE = REPO / "docs" / "posts" / "ai" / "vector-db-101"


def main():
    if len(sys.argv) < 2:
        print("用法：python3 scripts/vector-db-docs/check-alignment.py <slug> [zh路径]")
        sys.exit(2)
    slug = sys.argv[1]
    en_path = BASE / "en" / (slug + ".md")
    zh_path = Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else BASE / "zh" / (slug + ".md")
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
