---
name: first-time-setup
description: First-time setup flow for dg-article-illustrator-svg preferences（扁平矢量精致风版）
---

# First-Time Setup

## Overview

When no EXTEND.md is found, guide user through preference setup.

**⛔ BLOCKING OPERATION**: This setup MUST complete before ANY other workflow steps. Do NOT:
- Ask about reference images
- Ask about content/article
- Ask about type preferences
- Proceed to content analysis

ONLY ask the questions in this setup flow, save EXTEND.md, then continue.

## Setup Flow

```
No EXTEND.md found
        │
        ▼
┌─────────────────────┐
│ AskUserQuestion     │
│ (all questions)     │
└─────────────────────┘
        │
        ▼
┌─────────────────────┐
│ Create EXTEND.md    │
└─────────────────────┘
        │
        ▼
    Continue to Step 1
```

## Questions

**Language**: Use user's input language or preferred language for all questions. Do not always use English.

Use single AskUserQuestion（auto-adds "Other" option）：

### Question 1: 精致度档（Style）

```
header: "精致度档"
question: "默认精致度档？（扁平矢量的渐变/投影/圆角强度）"
options:
  - label: "flat（推荐）"
    description: "干净现代，扁平矢量标准（渐变+轻投影+12px 圆角）"
  - label: "soft"
    description: "更柔和（大圆角 16px + 轻投影）"
  - label: "bold"
    description: "更强调（重投影 + 描边）"
```

### Question 2: 配色（Palette）

```
header: "配色"
question: "默认配色？（4 套扁平矢量配色，对齐博客封面图风格）"
options:
  - label: "soft（推荐）"
    description: "米色低饱和柔和（通用/知识/教程）"
  - label: "tech"
    description: "深蓝→青科技风（AI/系统/技术，契合博客主色）"
  - label: "vibrant"
    description: "浅灰底高饱和（产品/活力/对比）"
  - label: "mono"
    description: "白底单主色+灰阶（极简/Before-After）"
```

### Question 3: Output Directory

```
header: "Output Directory"
question: "生成的 SVG 存哪（相对文章）？"
options:
  - label: "imgs-subdir（推荐）"
    description: "{article-dir}/imgs/ — 文章旁的子目录"
  - label: "same-dir"
    description: "{article-dir}/ — 和文章同目录"
  - label: "illustrations-subdir"
    description: "{article-dir}/illustrations/"
  - label: "independent"
    description: "illustrations/{topic-slug}/ — cwd 下独立目录"
```

### Question 4: Save Location

```
header: "Save"
question: "偏好存哪？"
options:
  - label: "Project（推荐）"
    description: ".dg-skills/（仅本项目）"
  - label: "User"
    description: "~/.dg-skills/（所有项目）"
```

## Save Locations

| Choice | Path | Scope |
|--------|------|-------|
| Project | `.dg-skills/dg-article-illustrator-svg/EXTEND.md` | Current project |
| User | `~/.dg-skills/dg-article-illustrator-svg/EXTEND.md` | All projects |

## After Setup

1. Create directory if needed
2. Write EXTEND.md with frontmatter
3. Confirm: "Preferences saved to [path]"
4. Continue to Step 1

## EXTEND.md Template

```yaml
---
version: 2                      # schema 版本：2 = 扁平矢量精致风
preferred_style: flat           # flat | soft | bold（精致度档）
preferred_palette: soft         # soft | tech | vibrant | mono（配色）
default_output_dir: imgs-subdir # same-dir | imgs-subdir | illustrations-subdir | independent
language: null                  # zh | en | auto
gradient: linear                # none | linear | radial（preferred_style 的默认，可显式覆盖）
shadow: subtle                  # none | subtle | strong
corner_radius: 12               # 0 | 8 | 12 | 16
stroke: none                    # none | thin | bold
font: sans-serif                # 无衬线（中文 PingFang SC）
custom_palettes: []
---
```

## Modifying Preferences Later

See `## Changing Preferences` in SKILL.md. Full schema: `preferences-schema.md`.
