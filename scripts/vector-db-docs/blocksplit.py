#!/usr/bin/env python3
"""
共享切块模块：check-alignment.py 与 build-paired.py 共用同一套切块规则，
保证「校验时的块数」与「配对时的块数」永远一致。

在 ragflow 版（scripts/ragflow-docs/blocksplit.py）基础上新增一条规则：
$$ 数学块（$$...$$ 跨行公式）开闭之间不切块——本合集索引算法篇公式密集，
公式拆成两半会让 KaTeX 渲染报错。

规则：按空行切块，但以下四处不切块——
1. 代码围栏内部（``` 开闭之间）
2. $$ 数学块内部（行首 $$ 开闭之间；单行完整闭合的 $$...$$ 不算）
3. ::: 提示容器开闭之间
4. <details> 等 HTML/JSX 容器开闭之间（开标签与内容必须留在同一块）
"""

import re

CONTAINER_RE = re.compile(r"<(/?)(details|summary|Tabs|TabItem|APITable|CodeGroup|Accordion)\b")


def split_blocks(text: str) -> list[str]:
    """把 markdown 文本切成块列表（空行分隔，围栏/公式/容器内部不切）。"""
    blocks, cur, in_fence, in_math, stack = [], [], False, False, []
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            # $$ 数学块：行首 $$ 视为开/闭定界；单行完整闭合（$$...$$）不动
            if s.startswith("$$") and not (s.endswith("$$") and len(s) > 4):
                in_math = not in_math
            elif not in_math:
                for m in CONTAINER_RE.finditer(line):
                    if m.group(1):  # 闭合标签：弹栈到匹配项
                        while stack and stack.pop() != m.group(2):
                            pass
                    else:
                        stack.append(m.group(2))
                # ::: 容器同理不能拆块
                if re.match(r"^:::\s*\S", s):
                    stack.append(":::")
                elif s == ":::" and ":::" in stack:
                    while stack and stack.pop() != ":::":
                        pass
        if s == "" and not in_fence and not in_math and not stack:
            if cur:
                blocks.append("\n".join(cur).strip("\n"))
                cur = []
        else:
            cur.append(line)
    if cur:
        blocks.append("\n".join(cur).strip("\n"))
    return [b for b in blocks if b.strip()]
