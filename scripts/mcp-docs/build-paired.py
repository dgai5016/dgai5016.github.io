#!/usr/bin/env python3
"""
配对构建管线（第三步：en + zh -> paired/<slug>.md）

作用：
1. 读取 docs/mcp-docs/en/<slug>.md 与 docs/mcp-docs/zh/<slug>.md
2. 双方按空行切块，校验块数一致（逐段对齐的前提）
3. 一致 → 每对块生成一个 <BiRow>（左英右中），写入 docs/mcp-docs/paired/<slug>.md
   不一致 → 整篇降级为单个 BiRow（左右整篇对照，仍是可用阅读体验），并报告差异
4. 图片块两侧原样保留（dg 验收：译文栏也要显示配图）
5. 文首 H1 块丢弃（overlay 头部已展示双语标题，避免重复）

用法：python3 scripts/mcp-docs/build-paired.py [slug ...]   # 不传参 = 处理 zh/ 下全部
"""

import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
EN = REPO / "docs" / "mcp-docs" / "en"
ZH = REPO / "docs" / "mcp-docs" / "zh"
PAIRED = REPO / "docs" / "mcp-docs" / "paired"


# Mintlify 容器组件：开闭标签之间不能按空行分块，
# 否则 <CodeGroup> 开标签和 </CodeGroup> 会被拆进不同的 BiRow 行，
# 单行模板标签不闭合 → Vue 编译报「missing end tag」
CONTAINER_RE = re.compile(r"<(/?)(CodeGroup|AccordionGroup|Accordion|Tabs|Tab|Steps|Frame)\b")


def split_blocks(text: str) -> list[str]:
    """按空行切块；代码围栏内部与容器组件开闭标签之间的空行不切块。"""
    blocks, cur, in_fence, stack = [], [], False, []
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            # 跟踪容器标签嵌套深度（含 CodeGroup 内嵌多段围栏的场景）
            for m in CONTAINER_RE.finditer(line):
                if m.group(1):  # 闭合标签：弹栈到匹配项
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


def dedent4(block: str) -> str:
    """剥掉 Mintlify 容器壳残留的 4 空格缩进。
    原文 <Steps>/<Accordion> 的子内容整体缩进 4 格，壳被剥掉后缩进仍在，
    CommonMark 会把 ≥4 空格缩进的正文渲染成缩进代码块（整段变等宽字体），
    必须统一去掉一层 4 空格缩进（围栏内容同步去，保持块内相对缩进）。"""
    out = []
    for line in block.split("\n"):
        out.append(line[4:] if line.startswith("    ") else line)
    return "\n".join(out)


def strip_jsx_attrs(block: str) -> str:
    """剥掉 Mintlify 残留的 JSX 风格属性（如 <img style={{display:...}}>）。
    Vue 模板会把 {{...}} 当插值表达式解析导致构建失败，且这些内联样式只是装饰；
    直接删掉整个 style={{...}} 属性，img 仍正常渲染。"""
    return re.sub(r'\s[a-zA-Z-]+=\{\{[^}]*\}\}', "", block)


def bi_row(en_b: str, zh_b: str) -> str:
    """一对块 → 一个 BiRow 组件用法（入参先过 JSX 属性剥离）。"""
    return (
        '<BiRow>\n<template #en>\n\n%s\n\n</template>\n<template #zh>\n\n%s\n\n</template>\n</BiRow>'
        % (dedent4(strip_jsx_attrs(en_b)), dedent4(strip_jsx_attrs(zh_b)))
    )


def build(slug: str) -> tuple[str, bool]:
    """返回 (状态, 是否逐段对齐)。"""
    en_text = (EN / (slug + ".md")).read_text(encoding="utf-8")
    zh_text = (ZH / (slug + ".md")).read_text(encoding="utf-8")
    en_blocks, zh_blocks = split_blocks(en_text), split_blocks(zh_text)

    # 文首 H1 丢弃（头部已有双语标题）
    if en_blocks and en_blocks[0].startswith("# "):
        en_blocks = en_blocks[1:]
    if zh_blocks and zh_blocks[0].startswith("# "):
        zh_blocks = zh_blocks[1:]

    rows = []
    aligned = len(en_blocks) == len(zh_blocks)
    if aligned:
        for en_b, zh_b in zip(en_blocks, zh_blocks):
            rows.append(bi_row(en_b, zh_b))
    else:
        # 降级：整篇各放一格，保持可读
        rows.append(bi_row(en_text.strip(), zh_text.strip()))

    PAIRED.mkdir(parents=True, exist_ok=True)
    (PAIRED / (slug + ".md")).write_text("\n\n".join(rows) + "\n", encoding="utf-8")
    return ("OK" if aligned else "FALLBACK"), aligned


def main():
    slugs = sys.argv[1:] or sorted(p.stem for p in ZH.glob("*.md"))
    print("%-28s %6s %6s %s" % ("slug", "en块", "zh块", "状态"))
    for slug in slugs:
        en_text = (EN / (slug + ".md")).read_text(encoding="utf-8")
        zh_text = (ZH / (slug + ".md")).read_text(encoding="utf-8")
        status, _ = build(slug)
        ne = len(split_blocks(en_text)) - (1 if split_blocks(en_text)[0].startswith("# ") else 0)
        nz = len(split_blocks(zh_text)) - (1 if split_blocks(zh_text)[0].startswith("# ") else 0)
        print("%-28s %6d %6d %s" % (slug, ne, nz, status))


if __name__ == "__main__":
    main()
