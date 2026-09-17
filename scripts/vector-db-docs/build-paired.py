#!/usr/bin/env python3
"""
配对构建管线（en + zh -> paired/<slug>.md）——ragflow 版按 vector-db-101 路径移植。

作用：
1. 读取 en/<slug>.md 与 zh/<slug>.md
2. 双方按空行切块（blocksplit.py，含 $$ 数学块不切规则），校验块数一致
3. 一致 → 每对块生成一个 <BiRow>（左英右中）；不一致 → 整篇降级为单个 BiRow
4. 文首 H1 块丢弃（浮层头部已展示双语标题）
5. 剥掉残留的 JSX 风格属性（{{...}} 会被 Vue 当插值导致构建失败）

用法：python3 scripts/vector-db-docs/build-paired.py [slug ...]   # 不传参 = 处理 zh/ 下全部
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from blocksplit import split_blocks  # noqa: E402 - 与校验脚本共用同一套切块规则

REPO = Path(__file__).resolve().parents[2]
EN = REPO / "docs" / "posts" / "ai" / "vector-db-101" / "en"
ZH = REPO / "docs" / "posts" / "ai" / "vector-db-101" / "zh"
PAIRED = REPO / "docs" / "posts" / "ai" / "vector-db-101" / "paired"


def strip_jsx_attrs(block: str) -> str:
    """剥掉残留的 JSX 风格属性（如 style={{display:...}}）。
    Vue 模板会把 {{...}} 当插值表达式解析导致构建失败，直接删属性保留标签。"""
    return re.sub(r"\s[a-zA-Z-]+=\{\{[^}]*\}\}", "", block)


def bi_row(en_b: str, zh_b: str) -> str:
    """一对块 → 一个 BiRow 组件用法。"""
    return (
        '<BiRow>\n<template #en>\n\n%s\n\n</template>\n<template #zh>\n\n%s\n\n</template>\n</BiRow>'
        % (strip_jsx_attrs(en_b), strip_jsx_attrs(zh_b))
    )


def build(slug: str) -> tuple[str, int, int]:
    """构建单篇。返回 (状态, en块数, zh块数)。"""
    en_text = (EN / (slug + ".md")).read_text(encoding="utf-8")
    zh_text = (ZH / (slug + ".md")).read_text(encoding="utf-8")
    en_blocks, zh_blocks = split_blocks(en_text), split_blocks(zh_text)

    # 文首 H1 丢弃（浮层头部已展示双语标题）
    if en_blocks and en_blocks[0].startswith("# "):
        en_blocks = en_blocks[1:]
    if zh_blocks and zh_blocks[0].startswith("# "):
        zh_blocks = zh_blocks[1:]
    ne, nz = len(en_blocks), len(zh_blocks)

    rows = []
    if ne == nz:
        for en_b, zh_b in zip(en_blocks, zh_blocks):
            rows.append(bi_row(en_b, zh_b))
        status = "OK"
    else:
        rows.append(bi_row(en_text.strip(), zh_text.strip()))  # 降级：整篇各放一格
        status = "FALLBACK"

    PAIRED.mkdir(parents=True, exist_ok=True)
    (PAIRED / (slug + ".md")).write_text("\n\n".join(rows) + "\n", encoding="utf-8")
    return status, ne, nz


def main():
    slugs = sys.argv[1:] or sorted(p.stem for p in ZH.glob("*.md"))
    print("%-56s %6s %6s %s" % ("slug", "en块", "zh块", "状态"))
    fallback = []
    for slug in slugs:
        status, ne, nz = build(slug)
        if status == "FALLBACK":
            fallback.append(slug)
        print("%-56s %6d %6d %s" % (slug, ne, nz, status))
    if fallback:
        print("块数失配（已降级整篇对照）：%s" % fallback)


if __name__ == "__main__":
    main()
