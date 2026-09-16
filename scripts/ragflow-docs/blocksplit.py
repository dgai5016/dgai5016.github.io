#!/usr/bin/env python3
"""
共享切块模块：check-alignment.py 与 build-paired.py 共用同一套切块规则，
保证「校验时的块数」与「配对时的块数」永远一致。

规则：按空行切块，但以下三处不切块——
1. 代码围栏内部（``` 开闭之间）
2. ::: 提示容器（::: note ... :::）开闭之间——RAGFlow 文档源码里就有 ::: 容器
3. <details> 等 HTML/JSX 容器开闭之间——开标签与内容必须留在同一块，
   否则配对后单个 BiRow 模板里标签不闭合，Vue 编译直接报错
"""

import re

# 容器标签：开闭标签之间不能按空行分块（RAGFlow 清洗后主要是 <details>，
# 其余 JSX 壳名保留是防御——万一清洗漏网也不至于把标签拆散）
CONTAINER_RE = re.compile(r"<(/?)(details|summary|Tabs|TabItem|APITable|CodeGroup|Accordion)\b")


def split_blocks(text: str) -> list[str]:
    """把 markdown 文本切成块列表（空行分隔，围栏/容器内部不切）。"""
    blocks, cur, in_fence, stack = [], [], False, []
    for line in text.split("\n"):
        s = line.strip()
        if s.startswith("```"):
            in_fence = not in_fence
        elif not in_fence:
            for m in CONTAINER_RE.finditer(line):
                if m.group(1):  # 闭合标签：弹栈到匹配项
                    while stack and stack.pop() != m.group(2):
                        pass
                else:
                    stack.append(m.group(2))
            # ::: 容器（::: note / ::: code-group 等）同理不能拆块
            if re.match(r"^:::\s*\S", s):
                stack.append(":::")
            elif s == ":::" and ":::" in stack:
                while stack and stack.pop() != ":::":
                    pass
        if s == "" and not in_fence and not stack:
            if cur:
                blocks.append("\n".join(cur).strip("\n"))
                cur = []
        else:
            cur.append(line)
    if cur:
        blocks.append("\n".join(cur).strip("\n"))
    return [b for b in blocks if b.strip()]
