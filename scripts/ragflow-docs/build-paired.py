#!/usr/bin/env python3
"""
配对构建管线（第三步：en + zh -> paired/<slug>.md）

作用：
1. 读取 docs/posts/ai/ragflow/en/<slug>.md 与 docs/posts/ai/ragflow/zh/<slug>.md
2. 双方按空行切块（与 check-alignment.py 同一规则），校验块数一致
3. 一致 → 每对块生成一个 <BiRow>（左英右中），写入 docs/posts/ai/ragflow/paired/<slug>.md
   不一致 → 整篇降级为单个 BiRow（左右整篇对照，仍是可用阅读体验），并报告差异
4. 图片块两侧原样保留（译文栏也显示配图）
5. 文首 H1 块丢弃（overlay 头部已展示双语标题，避免重复）
6. 剥掉残留的 JSX 风格属性（MDX 源里 style={{...}} 之类，Vue 会把 {{}} 当插值导致构建失败）

与 MCP 版 build-paired.py 的差异：RAGFlow 的 ::: 提示块与 <details> 折叠块
在源文里就存在（MCP 是构建时才产生 code-group），切块规则见 split_blocks；
Mintlify 专有的 CodeGroup 转换这里不需要（RAGFlow 是 Docusaurus，fetch 阶段已清洗）。

用法：python3 scripts/ragflow-docs/build-paired.py [slug ...]   # 不传参 = 处理 zh/ 下全部
"""

import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from blocksplit import split_blocks  # noqa: E402 - 与校验脚本共用同一套切块规则

REPO = Path(__file__).resolve().parents[2]
EN = REPO / "docs" / "posts" / "ai" / "ragflow" / "en"
ZH = REPO / "docs" / "posts" / "ai" / "ragflow" / "zh"
PAIRED = REPO / "docs" / "posts" / "ai" / "ragflow" / "paired"


def strip_jsx_attrs(block: str) -> str:
    """剥掉 MDX 残留的 JSX 风格属性（如 style={{display:...}}）。
    Vue 模板会把 {{...}} 当插值表达式解析导致构建失败，直接删属性保留标签。"""
    return re.sub(r"\s[a-zA-Z-]+=\{\{[^}]*\}\}", "", block)


def bi_row(en_b: str, zh_b: str) -> str:
    """一对块 → 一个 BiRow 组件用法（两侧各自做 JSX 属性清理）。"""

    def prep(b: str) -> str:
        return strip_jsx_attrs(b)

    return (
        '<BiRow>\n<template #en>\n\n%s\n\n</template>\n<template #zh>\n\n%s\n\n</template>\n</BiRow>'
        % (prep(en_b), prep(zh_b))
    )


def build(slug: str) -> tuple[str, int, int]:
    """构建单篇。返回 (状态, en块数, zh块数)。"""
    en_text = (EN / (slug + ".md")).read_text(encoding="utf-8")
    zh_text = (ZH / (slug + ".md")).read_text(encoding="utf-8")
    en_blocks, zh_blocks = split_blocks(en_text), split_blocks(zh_text)

    # 文首 H1 丢弃（overlay 头部已展示双语标题）
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
        # 降级：整篇各放一格，保持可读
        rows.append(bi_row(en_text.strip(), zh_text.strip()))
        status = "FALLBACK"

    PAIRED.mkdir(parents=True, exist_ok=True)
    (PAIRED / (slug + ".md")).write_text("\n\n".join(rows) + "\n", encoding="utf-8")
    return status, ne, nz


def main():
    slugs = sys.argv[1:] or sorted(p.stem for p in ZH.glob("*.md"))
    print("%-44s %6s %6s %s" % ("slug", "en块", "zh块", "状态"))
    fallback = []
    for slug in slugs:
        status, ne, nz = build(slug)
        if status == "FALLBACK":
            fallback.append(slug)
        print("%-44s %6d %6d %s" % (slug, ne, nz, status))
    if fallback:
        print("块数失配（已降级整篇对照）：%s" % fallback)


if __name__ == "__main__":
    main()
