---
name: preferences-schema
description: EXTEND.md YAML schema for dg-article-illustrator-svg user preferences (扁平矢量精致风版)
---

# Preferences Schema

## Full Schema

```yaml
---
version: 2                      # schema 版本：2 = 扁平矢量精致风（旧版 1 是 rough.js 手绘，已废弃）

preferred_palette: soft         # soft | tech | vibrant | mono（4 套扁平矢量配色）
preferred_style: flat           # flat | soft | bold（精致度档，映射下方 gradient/shadow/corner_radius）

language: null                  # zh | en | auto（null = 自动检测文章语言）

default_output_dir: null        # same-dir | imgs-subdir | illustrations-subdir | independent（null = 每次问）

# 精致度参数（preferred_style 的细化/可覆盖，显式值优先于档位映射）
gradient: linear                # none | linear | radial（背景/色块是否渐变）
shadow: subtle                  # none | subtle | strong（feDropShadow 投影强度）
corner_radius: 12               # 0 | 8 | 12 | 16（圆角半径）
stroke: none                    # none | thin | bold（描边粗细）
font: sans-serif                # 固定无衬线（中文 PingFang SC，跨平台回退）

custom_palettes:                # 自定义配色（可选，覆盖/扩展内置 4 套）
  - name: my-brand
    bg: '#ffffff'
    bgGrad: ['#ffffff', '#f2f2f5']
    fills: ['#8ca6e0', '#c8a2e0', '#6bcf7f']
    accent: '#6c63ff'
    ink: '#1a1a1a'
---
```

## Field Reference

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `version` | int | 2 | Schema 版本（2 = 扁平矢量精致风） |
| `preferred_palette` | string | `soft` | 配色：soft / tech / vibrant / mono |
| `preferred_style` | string | `flat` | 精致度档：flat / soft / bold（见下映射表） |
| `language` | string | null | 输出语言（null = 自动检测） |
| `default_output_dir` | enum | null | 输出目录（null = 每次问） |
| `gradient` | enum | linear | 渐变：none / linear / radial |
| `shadow` | enum | subtle | 投影：none / subtle / strong |
| `corner_radius` | int | 12 | 圆角半径（0 / 8 / 12 / 16） |
| `stroke` | enum | none | 描边：none / thin / bold |
| `font` | string | sans-serif | 字体（固定无衬线，可选自定义栈） |
| `custom_palettes` | array | [] | 自定义配色（见下） |

## Style 映射（preferred_style → 精致度参数）

| preferred_style | gradient | shadow | corner_radius | stroke | 感觉 |
|---|---|---|---|---|---|
| `flat`（默认） | linear | subtle | 12 | none | 干净现代，扁平矢量标准 |
| `soft` | linear | subtle | 16 | none | 更柔和（大圆角 + 轻投影） |
| `bold` | linear | strong | 8 | bold | 更强调（重投影 + 描边） |

显式的 `gradient` / `shadow` / `corner_radius` / `stroke` 字段覆盖 preferred_style 的映射。

## Palette 速查（4 套，详见 [vector-usage.md](../vector-usage.md)）

| palette | 调性 | 适用 |
|---|---|---|
| `soft`（默认） | 米色低饱和柔和 | 通用、知识、教程 |
| `tech` | 深蓝→青科技 | AI、系统、技术 |
| `vibrant` | 浅灰底高饱和 | 产品、活力、对比 |
| `mono` | 白底单主色+灰阶 | 极简、Before/After |

## Output Directory Options

| Value | Description |
|-------|-------------|
| `same-dir` | Same directory as article |
| `imgs-subdir` | `{article-dir}/imgs/` subdirectory |
| `illustrations-subdir` | `{article-dir}/illustrations/` subdirectory |
| `independent` | `illustrations/{topic-slug}/` in working directory |

## Custom Palette Fields

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Unique palette identifier (kebab-case) |
| `bg` | Yes | 纯色背景 |
| `bgGrad` | No | 背景渐变 [起点色, 终点色]（不填则用 bg 纯色） |
| `fills` | Yes | 色块轮转数组 |
| `accent` | No | 焦点强调色 |
| `ink` | No | 文字/线条色 |

## Example: Minimal

```yaml
---
version: 2
preferred_palette: soft
preferred_style: flat
---
```

## Example: AI 技术文（深色科技风）

```yaml
---
version: 2
preferred_palette: tech
preferred_style: flat
language: zh
default_output_dir: imgs-subdir
gradient: linear
shadow: subtle
corner_radius: 12
---
```

## Example: 自定义品牌配色

```yaml
---
version: 2
preferred_palette: my-brand
preferred_style: soft
custom_palettes:
  - name: my-brand
    bg: '#ffffff'
    bgGrad: ['#ffffff', '#f2f2f5']
    fills: ['#8ca6e0', '#c8a2e0', '#6bcf7f', '#e8a87c']
    accent: '#6c63ff'
    ink: '#1a1a1a'
---
```
