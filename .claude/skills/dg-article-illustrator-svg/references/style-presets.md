---
name: style-presets
description: 扁平矢量风预设（type + 精致度档 + 配色 的速记）
---

# Style Presets（扁平矢量风）

`--preset X` = type + 精致度档（+ 配色）的组合速记。差异在 type 与配色（精致度默认 `flat`）。

## 预设表

| --preset | Type | Style | Palette | 适合 |
|---|---|---|---|---|
| `vector-edu`（默认） | infographic | flat | soft | 通用默认、概念图、无强信号时 |
| `tech-vector` | infographic | flat | tech | AI / 技术讲解、系统指标 |
| `flow-vector` | flowchart | flat | tech | 流程、工作流、教程步骤 |
| `compare-vector` | comparison | flat | mono | 对比、选项、Before/After |
| `framework-vector` | framework | flat | tech | 架构、模型、组件关系 |
| `timeline-vector` | timeline | flat | vibrant | 历史、演进、里程碑 |

## Content Type → Preset 推荐

Step 3 Q1 推荐预设时用此表：

| 内容类型（Step 2） | Primary Preset | 备选 |
|---|---|---|
| 通用 / 无强信号 | `vector-edu` | `tech-vector` |
| AI / 技术 / API | `tech-vector` | `flow-vector` |
| 教程 / 步骤 | `flow-vector` | `tech-vector` |
| 对比 / 评测 | `compare-vector` | — |
| 架构 / 模型 | `framework-vector` | `tech-vector` |
| 历史 / 演进 | `timeline-vector` | — |

**默认**：Step 2 无强信号时，Q1 推荐 `vector-edu`（infographic + flat + soft）。

## 覆盖

显式 `--type` / `--style` / `--palette` 覆盖预设对应维度：

```bash
/dg-article-illustrator-svg article.md --preset tech-vector --style soft        # 用预设的 type，精致度换 soft（更大圆角）
/dg-article-illustrator-svg article.md --preset flow-vector --palette vibrant   # 流程图 + 活力配色
```

用户选了预设 → Step 3 的 Q3（style）跳过（type + style 都由预设定）。
