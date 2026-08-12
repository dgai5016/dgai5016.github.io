# Usage

## Command Syntax

```bash
# 自动按内容选 type + 精致度档 + 配色
/dg-article-illustrator-svg path/to/article.md

# 指定 type
/dg-article-illustrator-svg path/to/article.md --type flowchart

# 指定精致度档
/dg-article-illustrator-svg path/to/article.md --style soft

# type + 精致度档 组合
/dg-article-illustrator-svg path/to/article.md --type flowchart --style flat

# 指定密度
/dg-article-illustrator-svg path/to/article.md --density per-section

# 用预设
/dg-article-illustrator-svg path/to/article.md --preset tech-vector

# 直接生成（跳过 Step 3 确认 gate）
/dg-article-illustrator-svg path/to/article.md --preset tech-vector 直接生成

# 粘贴内容（paste 模式）
/dg-article-illustrator-svg
[粘贴正文]
```

## Options

| Option | Description |
|--------|-------------|
| `--type <name>` | 插图类型：infographic / flowchart / comparison / framework / timeline / scene / mixed（见 SKILL.md Types） |
| `--style <name>` | 精致度档：flat / soft / bold（映射 gradient/shadow/corner_radius/stroke） |
| `--preset <name>` | type + 精致度档（+ 配色）的预设速记（见 [style-presets.md](style-presets.md)） |
| `--density <level>` | 出图密度：minimal / balanced / per-section / rich |
| `--palette <name>` | 配色：soft / tech / vibrant / mono（覆盖预设/EXTEND） |
| `直接生成` / `不用确认` / `跳过确认` | 跳过 Step 3 确认 gate，自主出图 |

> 无 `--ref`（扁平矢量不消费照片参考）、无 `--batch-size`（纯本地字符串拼接，多张图自然并行/顺序，无需节流）。

## Input Modes

| Mode | Trigger | Output Directory |
|------|---------|------------------|
| File path | `path/to/article.md` | `default_output_dir` preference，未设则问 |
| Paste content | 无 path 参数 | `illustrations/{topic-slug}/` |

## Output Directory Options

| Value | Path |
|-------|------|
| `imgs-subdir`（默认） | `{article-dir}/imgs/` |
| `same-dir` | `{article-dir}/` |
| `illustrations-subdir` | `{article-dir}/illustrations/` |
| `independent` | `illustrations/{topic-slug}/` |

Configure in EXTEND.md: `default_output_dir: imgs-subdir`

## Examples

**技术文章（流程扁平矢量风）**：
```bash
/dg-article-illustrator-svg api-design.md --type flowchart --style flat
```

**用预设等价**：
```bash
/dg-article-illustrator-svg api-design.md --preset tech-vector
```

**AI 概念文（深色科技风）**：
```bash
/dg-article-illustrator-svg attention.md --preset tech-vector --density per-section
```

**教程（多步流程，密一点）**：
```bash
/dg-article-illustrator-svg how-to-deploy.md --preset flow-vector --density per-section
```

**对比文（单色极简）**：
```bash
/dg-article-illustrator-svg vs-article.md --preset compare-vector
```

**预设 + 覆盖精致度**：
```bash
/dg-article-illustrator-svg article.md --preset tech-vector --style soft
```
