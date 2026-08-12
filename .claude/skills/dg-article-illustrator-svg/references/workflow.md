# Detailed Workflow Procedures

## Step 1: Pre-check

### 1.0 Reference Images（简化）

本 skill 用**纯 SVG** 画**扁平矢量风**插图，**不消费照片参考**（无 `--ref`、不调任何位图模型）。若用户提供了参考图，**仅提取配色/风格 verbally**，用于 palette 选择与精致度参考，写入 outline 的 Visual Content，不存参考文件、不加 frontmatter references。

### 1.1 Determine Input Type

| Input | Output Directory | Next |
|-------|------------------|------|
| File path | EXTEND.md `default_output_dir` (default: `imgs-subdir`). If not configured, confirm in 1.2. | → 1.2 |
| Pasted content | `illustrations/{topic-slug}/` | → 1.4 |

**Backup rule for pasted content**: If `source.md` exists in target directory, rename to `source-backup-YYYYMMDD-HHMMSS.md` before saving.

### 1.2-1.4 Configuration (file path input only)

Check preferences and existing state, then ask ALL needed questions in ONE AskUserQuestion call (max 4 questions).

**Questions to include** (skip if preference exists or not applicable):

| Question | When to Ask | Options |
|----------|-------------|---------|
| Output directory | No `default_output_dir` in EXTEND.md | `{article-dir}/imgs/` (Recommended), `{article-dir}/`, `{article-dir}/illustrations/`, `illustrations/{topic-slug}/` |
| Existing SVGs | Target dir has `.svg` files | `supplement`, `overwrite`, `regenerate` |
| Article update | Always (file path input) | `update`, `copy` |

**Preference Values** (if configured, skip asking):

| `default_output_dir` | Path |
|----------------------|------|
| `same-dir` | `{article-dir}/` |
| `imgs-subdir` | `{article-dir}/imgs/` |
| `illustrations-subdir` | `{article-dir}/illustrations/` |
| `independent` | `illustrations/{topic-slug}/` |

### 1.5 Load Preferences (EXTEND.md) ⛔ BLOCKING

**CRITICAL**: If EXTEND.md not found, MUST complete first-time setup before ANY other questions or steps. Do NOT proceed to content, do NOT ask about type/style — ONLY complete the preferences setup first.

```bash
# macOS, Linux, WSL, Git Bash
test -f .dg-skills/dg-article-illustrator-svg/EXTEND.md && echo "project"
test -f "${XDG_CONFIG_HOME:-$HOME/.config}/dg-skills/dg-article-illustrator-svg/EXTEND.md" && echo "xdg"
test -f "$HOME/.dg-skills/dg-article-illustrator-svg/EXTEND.md" && echo "user"
```

```powershell
# PowerShell (Windows)
if (Test-Path .dg-skills/dg-article-illustrator-svg/EXTEND.md) { "project" }
$xdg = if ($env:XDG_CONFIG_HOME) { $env:XDG_CONFIG_HOME } else { "$HOME/.config" }
if (Test-Path "$xdg/dg-skills/dg-article-illustrator-svg/EXTEND.md") { "xdg" }
if (Test-Path "$HOME/.dg-skills/dg-article-illustrator-svg/EXTEND.md") { "user" }
```

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary → Continue |
| Not found | ⛔ **BLOCKING**: Run first-time setup ONLY ([config/first-time-setup.md](config/first-time-setup.md)) → Complete and save EXTEND.md → Then continue |

**Supports**: Preferred type/style | 精致度参数（gradient/shadow/corner_radius/stroke/font）| Palette（soft/tech/vibrant/mono）| Language | Output directory

### 1.6 Dependencies（零依赖）

本 skill **零依赖**——不需要安装任何 npm 包（旧的 roughjs 依赖已移除）。所有绘图能力都在 skill 自带的 `scripts/svg-helpers.cjs`（纯字符串拼接）。运行时只需 `bun`（或 `node`）跑 `.cjs` 脚本。

gen 脚本通过 **robust require 头**自动找到 skill 目录的 `scripts/svg-helpers.cjs`（见 [vector-usage.md](vector-usage.md)），无需手动设 NODE_PATH、无需 `install-deps.sh`。

---

## Step 2: Setup & Analyze

### 2.1 Analyze Content

| Analysis | Description |
|----------|-------------|
| Content type | Technical / Tutorial / Methodology / Narrative |
| Illustration purpose | information / visualization / imagination |
| Core arguments | 2-5 main points to visualize |
| Visual opportunities | Positions where illustrations add value |
| Recommended type | Based on content signals and purpose |
| Recommended density | Based on length and complexity |

### 2.2 Extract Core Arguments

- Main thesis
- Key concepts reader needs
- Comparisons/contrasts
- Framework/model proposed

**CRITICAL**: If article uses metaphors, do NOT illustrate literally. Visualize the **underlying concept**.

### 2.3 Identify Positions

**Illustrate**:
- Core arguments (REQUIRED)
- Abstract concepts
- Data comparisons
- Processes, workflows

**Do NOT Illustrate**:
- Metaphors literally
- Decorative scenes
- Generic illustrations

---

## Step 3: Confirm Settings ⚠️

**Do NOT skip.** Use ONE AskUserQuestion call with max 4 questions. **Q1, Q2, Q3 are ALL REQUIRED.**

### Q1: Preset or Type ⚠️ REQUIRED

Based on Step 2 content analysis, recommend a preset first (sets type + 精致度档 + palette). Look up [style-presets.md](style-presets.md).

- [Recommended preset] — [brief: type + 精致度档 + palette + why] (Recommended)
- [Alternative preset] — [brief]
- Or choose type manually: infographic / flowchart / comparison / framework / timeline / mixed

**Default**: if Step 2 found no strong content signal, recommend `vector-edu` preset（infographic + flat 精致度 + soft 配色）。

**If user picks a preset → skip Q3**（type & style both resolved）。
**If user picks a type → Q3 is REQUIRED.**

### Q2: Density ⚠️ REQUIRED - DO NOT SKIP
- minimal (1-2) - Core concepts only
- balanced (3-5) - Major sections
- per-section - At least 1 per section/chapter (Recommended)
- rich (6+) - Comprehensive coverage

### Q3: Style（精致度档）⚠️ REQUIRED (skip if preset chosen in Q1)

扁平矢量精致度档（映射 svg-helpers 的 gradient/shadow/corner_radius/stroke）：

| Style | gradient | shadow | corner_radius | 感觉 |
|-------|----------|--------|---------------|------|
| `flat` | linear | subtle | 12 | 干净现代，扁平矢量标准（默认） |
| `soft` | linear | subtle | 16 | 更柔和（大圆角 + 轻投影） |
| `bold` | linear | strong | 8 | 更强调（重投影 + 描边） |

If EXTEND.md has `preferred_style`，把它作 Recommended。Style 选择映射到 Step 5 gen 脚本的精致度参数。

### Q4: Palette (optional)

- `soft`（米色低饱和，通用，Recommended）
- `tech`（深蓝→青科技，AI/技术）
- `vibrant`（浅灰底高饱和，产品/活力）
- `mono`（白底单主色，极简/对比）

**Skip if**: preset already resolved palette, or `preferred_palette` set in EXTEND.md. Palette 映射到 Step 5 gen 脚本的 `H.palette()` 配色（见 [vector-usage.md](vector-usage.md) 配色配方）。

### Q5: Image Text Language ⚠️ REQUIRED when article language ≠ EXTEND.md `language`

Detect article language from content. If different from EXTEND.md `language` setting, MUST ask:
- Article language (match article content) (Recommended)
- EXTEND.md language (user's general preference)

**Skip only if**: Article language matches EXTEND.md `language`, or EXTEND.md has no `language` setting.

---

## Step 4: Generate Outline

Save as `{output-dir}/outline.md`：

```yaml
---
type: flowchart
density: per-section
style: flat
palette: tech
image_count: 4
---

## Illustration 1

**Position**: [section] / [paragraph]
**Purpose**: [why this helps]
**Visual Content**: [what to draw — 用文章真实术语/数据/步骤名，这是 Step 5 画图的依据]
**Type**: flowchart
**Filename**: 01-flowchart-concept-name.svg
```

**Requirements**:
- Each position justified by content needs
- Type applied consistently
- Visual Content 要具体（实际术语/数字/步骤），不要泛泛——Step 5 据此画图
- Count matches density

---

## Step 5: Generate SVG Illustrations（纯 SVG 扁平矢量）

为 outline 里每张图生成扁平矢量风 SVG。**不写位图 prompt 文件、不调位图后端**——用 skill 自带的 `svg-helpers.cjs` 模块拼纯 SVG 字符串。

### 5.1 Write Gen Scripts ⛔ BLOCKING（每张图一个 gen 脚本）

**Every illustration MUST have a saved gen script before generation.** gen 脚本替代 baoyu 的位图 prompt 文件，是可复现记录。

For each illustration in the outline：

1. **定布局**：按 type（SKILL.md「Types」表的 type→画法）+ outline 的 Visual Content，确定用哪些 svg-helpers 组件（`node`/`barChart`/`arrow`/`rect`/`circle`/`line`/`text`…）+ 坐标 + 标签 + 配色
2. **写 gen 脚本** `{output-dir}/gen/NN-{type}-{slug}.cjs`，参考 [vector-usage.md](../vector-usage.md)：
   - **开头必须用 robust require 头**找 skill 目录的 `scripts/svg-helpers.cjs`（见 vector-usage.md「robust require 头」）
   - 选 palette：`const P = H.palette('tech')`
   - 按精致度档备 defs：`H.shadowFilter('sh','subtle')`（+ 可选 `H.linearGradient`）
   - 用 `H.node/barChart/arrow/rect/circle/line/text` 拼内容（标签用文章真实术语）
   - 用 `H.wrap(W,H,{gradFrom:P.bgGrad[0],gradTo:P.bgGrad[1]},parts)` 拼完整 SVG（背景渐变自动进 defs）
3. **标签/数据用文章真实内容**（实际术语、数字、步骤名）——不要泛泛占位
4. **Backup rule**：若 gen 脚本已存在，rename 加 `-backup-YYYYMMDD-HHMMSS`

**Verification** ⛔：确认 ALL gen 脚本存在：
```
Gen Scripts:
- gen/01-flowchart-core-loop.cjs ✓
- gen/02-infographic-params.cjs ✓
...
```

### 5.2 Generate SVG（bun run）

1. **无需装依赖**（零依赖，svg-helpers 自带）
2. **跑每张图**：`bun run {output-dir}/gen/NN-{type}-{slug}.cjs {output-dir}/NN-{type}-{slug}.svg`
   - 纯本地字符串拼接，**无 API/无网络/无限流**，可放心并行多张
3. **Backup rule**：若输出 .svg 已存在，rename 加 `-backup-YYYYMMDD-HHMMSS`
4. 记录进度："Generated X/N: filename"
5. **失败**（脚本错误/坐标问题/文字溢出）→ 改 gen 脚本重跑（即时反馈，无需重调 API）

**类型→组件映射** + 完整 svg-helpers API + 可跑示例：[vector-usage.md](../vector-usage.md)（示例脚本见 skill 目录 `examples/`）

---

## Step 6: Finalize

### 6.1 Update Article

Insert after corresponding paragraph, using path relative to article file:

| `default_output_dir` | Insert Path |
|----------------------|-------------|
| `imgs-subdir` | `![description](imgs/NN-{type}-{slug}.svg)` |
| `same-dir` | `![description](NN-{type}-{slug}.svg)` |
| `illustrations-subdir` | `![description](illustrations/NN-{type}-{slug}.svg)` |
| `independent` | `![description](illustrations/{topic-slug}/NN-{type}-{slug}.svg)` (relative to cwd) |

Alt text: concise description in article's language.

### 6.2 Output Summary

```
Article Illustration Complete!

Article: [path]
Type: [type] | Density: [level] | Style: [style] | Palette: [palette]
Location: [directory]
SVGs: X/N generated

Positions:
- 01-xxx.svg → After "[Section]"
- 02-yyy.svg → After "[Section]"

[If failures]
Failed:
- NN-zzz.svg: [reason — 改 gen 脚本重跑]
```
