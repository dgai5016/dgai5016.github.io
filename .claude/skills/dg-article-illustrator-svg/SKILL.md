---
name: dg-article-illustrator-svg
description: Analyzes article structure, identifies positions requiring visual aids, generates flat-vector polished SVG illustrations with pure SVG string concatenation (zero dependencies, no bitmap API, vector, crisp text). Aligned with blog cover aesthetic — flat geometry + gradients + soft shadows + sans-serif. Same analysis flow as baoyu-article-illustrator (locate → outline → confirm → insert). Use when user asks to "为文章配图", "illustrate article", "add images", "generate images for article", or wants flat-vector SVG illustrations. Requires bun.
version: 2.0.0
metadata:
  openclaw:
    homepage: https://github.com/dgai5016/dg-skills#dg-article-illustrator-svg
    requires:
      anyBins:
        - bun
---

# dg-article-illustrator-svg（扁平矢量精致风 SVG 文章配图）

分析文章结构、定位配图点、用**纯 SVG**（skill 自带的 `svg-helpers.cjs` 模块）生成扁平矢量精致风插图——几何色块 + 渐变 + 轻投影 + 无衬线粗体，对齐博客封面图美学。和 baoyu-article-illustrator **同构的分析流程**（locate → outline → confirm → insert），但出图用纯 SVG 字符串拼接——**零依赖、不调任何位图 API、矢量、文字锐利、可缩放、零额度**。

**职责边界：**
- ✅ **做**：分析文章、定位配图点、生成 outline、用 `svg-helpers` 画扁平矢量风 SVG、把 `.svg` 插回文章
- ❌ **不做**：调任何位图 API（glm-image/DALL·E/codex 等）、生成位图、需要网络/额度

## User Input Tools

When this skill prompts the user, follow this tool-selection rule (priority order):

1. **Prefer built-in user-input tools** exposed by the current agent runtime — e.g., `AskUserQuestion`, `request_user_input`, `clarify`, `ask_user`, or any equivalent.
2. **Fallback**: if no such tool exists, emit a numbered plain-text message and ask the user to reply with the chosen number/answer for each question.
3. **Batching**: if the tool supports multiple questions per call, combine all applicable questions into a single call; if only single-question, ask them one at a time in priority order.

Concrete `AskUserQuestion` references below are examples — substitute the local equivalent in other runtimes.

## SVG Generation（纯 SVG 扁平矢量）

本 skill 用**纯 SVG 字符串拼接**生成扁平矢量风插图——几何色块 + 线性/径向渐变 + 轻投影（`feDropShadow`）+ 无衬线粗体，对齐博客封面图美学。**不依赖任何位图 API**（无 glm-image/DALL·E/codex），无额度/限流/网络问题。所有绘图能力封装在 skill 自带的 `scripts/svg-helpers.cjs`（纯字符串拼接，零 npm 依赖）。

完整用法（svg-helpers API、精致度参数、4 套配色、可跑示例脚本、类型→组件映射）见 [references/vector-usage.md](references/vector-usage.md)。Step 5 出图时照它用 `svg-helpers`。

**依赖：零依赖。** 无需安装任何 npm 包（旧的 roughjs 依赖已移除）。运行时只需 `bun`（跑 `.cjs`）。gen 脚本通过 **robust require 头**自动找到 skill 目录的 `scripts/svg-helpers.cjs`（见 vector-usage.md），无需手动设 NODE_PATH、无需 `install-deps.sh`。

**硬规则：**
- ✅ 用 `svg-helpers` 的组件（`node`/`barChart`/`arrow`/`rect`/`circle`/`line`/`text`…）拼 SVG，保证全站风格一致、避免手算坐标。
- ✅ 文字用 `svg-helpers` 的 `text()`（自带无衬线字体栈 + XML 转义，中文 PingFang SC）。
- ✅ 渐变用 `linearGradient`/`radialGradient`，投影用 `feDropShadow`（SVG filter 用于光效/投影，合法且效果稳定）。
- ✅ 输出 `.svg`（矢量），文章引用 `.svg`。
- ✅ 文字错乱/坐标错 → 改 gen 脚本重跑（无需重调 API，即时反馈）。

## Confirmation Policy

Default behavior: **confirm before generation**.

- Treat explicit skill invocation, a file path, matched signals/presets, and `EXTEND.md` defaults as **recommendation inputs only**. None of them authorizes skipping confirmation.
- Do **not** start Step 4 or later until the user completes Step 3.
- Skip confirmation only when the current request explicitly says to do so, for example: "直接生成", "不用确认", "跳过确认", "按默认出图", or equivalent wording.
- If confirmation is skipped explicitly, state the assumed type / density / style / palette / language in the next user-facing update before generating.

## Three Dimensions

| Dimension | Controls | 本 skill 的体现 |
|-----------|----------|----------------|
| **Type** | 信息结构（决定布局） | infographic / flowchart / comparison / framework / timeline / scene → 决定用哪些 svg-helpers 组件（见 vector-usage.md「类型→组件映射」） |
| **Style** | 精致度档 | `flat` / `soft` / `bold` → 映射 `gradient`/`shadow`/`corner_radius`/`stroke` |
| **Palette** | 配色（可选） | `soft`/`tech`/`vibrant`/`mono` → `bg`/`fills`/`accent`/`ink`（见 vector-usage.md「配色配方」） |

自由组合：`--type flowchart --style flat`；或用预设 `--preset flow-vector`（见 [Style Presets](references/style-presets.md)）。

## Types

| Type | Best For | svg-helpers 画法 |
|------|----------|------------------|
| `infographic` | 数据/指标/技术 | `barChart` / `rect` 分区 + `text` 标签 + 小 `circle` 图标 |
| `flowchart` | 流程/工作流 | `node` + `arrow`（横/纵向） |
| `comparison` | 对比/选项 | 左右 `node`/`rect` + `line`（`dash` 虚线分隔） |
| `framework` | 模型/架构 | `node`（带 `sub` 副标签）+ `arrow` 连线 |
| `timeline` | 历史/演进 | 横 `line` 轴 + `circle` 事件点 + `text` |
| `scene` | 叙事/情感 | 抽象 `path`/`polygon` 组合（少用） |

## Styles

精致度档（flat/soft/bold，映射渐变/投影/圆角/描边）+ 4 套配色（soft/tech/vibrant/mono），见 [references/styles.md](references/styles.md)。

## Workflow

```
- [ ] Step 1: Pre-check（EXTEND.md；零依赖，无需装包）
- [ ] Step 2: Analyze content
- [ ] Step 3: Confirm settings（AskUserQuestion）
- [ ] Step 4: Generate outline
- [ ] Step 5: Generate SVG（svg-helpers 纯 SVG）
- [ ] Step 6: Finalize
```

### Step 1: Pre-check

**1.5 Load Preferences（EXTEND.md）⛔ BLOCKING**

Check EXTEND.md in priority order — the first one found wins:

| Priority | Path | Scope |
|----------|------|-------|
| 1 | `.dg-skills/dg-article-illustrator-svg/EXTEND.md` | Project |
| 2 | `${XDG_CONFIG_HOME:-$HOME/.config}/dg-skills/dg-article-illustrator-svg/EXTEND.md` | XDG |
| 3 | `$HOME/.dg-skills/dg-article-illustrator-svg/EXTEND.md` | User home |

| Result | Action |
|--------|--------|
| Found | Read, parse, display summary |
| Not found | ⛔ Run [first-time-setup](references/config/first-time-setup.md) |

**1.6 依赖：零依赖。** 无需安装任何包。gen 脚本通过 robust require 头自动找 `scripts/svg-helpers.cjs`（见 vector-usage.md）。

Full procedures: [references/workflow.md](references/workflow.md#step-1-pre-check)

### Step 2: Analyze

| Analysis | Output |
|----------|--------|
| Content type | Technical / Tutorial / Methodology / Narrative |
| Purpose | information / visualization / imagination |
| Core arguments | 2-5 main points |
| Positions | Where illustrations add value |

**CRITICAL**: Metaphors → visualize underlying concept, NOT literal image.

Full procedures: [references/workflow.md](references/workflow.md#step-2-setup--analyze)

### Step 3: Confirm Settings ⚠️

**Hard gate**: mandatory per [Confirmation Policy](#confirmation-policy) — Steps 4+ cannot start until the user confirms (or explicitly opts out with "直接生成" / equivalent).

**ONE AskUserQuestion, max 4 Qs. Q1-Q2 REQUIRED. Q3 required unless preset chosen.**

| Q | Options |
|---|---------|
| **Q1: Preset or Type** | [Recommended preset], [alt], or manual: infographic, flowchart, comparison, framework, timeline, mixed |
| **Q2: Density** | minimal (1-2), balanced (3-5), per-section (Recommended), rich (6+) |
| **Q3: Style（精致度档）** | flat（干净现代，推荐）/ soft（大圆角柔和）/ bold（重投影描边）— **skip if preset chosen** |
| Q4: Palette | soft（米色低饱和）/ tech（深蓝科技）/ vibrant（高饱和）/ mono（单色）— **skip if preset includes palette or preferred_palette set** |
| Q5: Language | When article language ≠ EXTEND.md setting |

Full procedures: [references/workflow.md](references/workflow.md#step-3-confirm-settings-)

### Step 4: Generate Outline

Save `{output-dir}/outline.md` with frontmatter (type, density, style, palette, image_count) and entries：

```yaml
## Illustration 1
**Position**: [section/paragraph]
**Purpose**: [why]
**Visual Content**: [what to draw — 用文章真实术语/数据，这是 Step 5 画图的依据]
**Type**: flowchart
**Filename**: 01-flowchart-concept-name.svg
```

Full template: [references/workflow.md](references/workflow.md#step-4-generate-outline)

### Step 5: Generate SVG Illustrations（svg-helpers 纯 SVG）

为 outline 里每张图生成扁平矢量风 SVG。**不写位图 prompt 文件、不调位图后端**——用 skill 自带的 `svg-helpers` 模块拼纯 SVG 字符串。

1. **零依赖，无需装包。**
2. **每张图写一个 gen 脚本**，按其 type（flowchart/infographic/...）和 Visual Content，参考 [references/vector-usage.md](references/vector-usage.md)：
   - 定布局（用哪些 svg-helpers 组件 + 坐标 + 标签 + 配色），按 SKILL.md「Types」表的 type→画法 + vector-usage.md「类型→组件映射」
   - 写 `{output-dir}/gen/NN-{type}-{slug}.cjs`：**开头必须用 vector-usage.md「robust require 头」**找 skill 目录的 `scripts/svg-helpers.cjs` → 选 palette（`H.palette('tech')`）→ 备 defs（`H.shadowFilter` + 可选 `H.linearGradient`）→ 用 `H.node/barChart/arrow/...` 拼内容（标签用文章真实术语）→ `H.wrap(W,H,{gradFrom,gradTo},parts)` 拼完整 SVG
   - gen 脚本是**可复现记录**（替代 baoyu 的位图 prompt 文件）——改图改脚本重跑
3. **标签/数据用文章真实内容**（实际术语、数字、步骤名），不要泛泛占位
4. **跑**：`bun run {output-dir}/gen/NN-{type}-{slug}.cjs {output-dir}/NN-{type}-{slug}.svg` → 生成 SVG
5. **多张图**：每张一个 gen 脚本，顺序或并行 `bun run`（纯本地字符串拼接，无 API 限流，可放心并行）
6. **失败**（脚本错误/坐标问题/文字溢出）→ 改 gen 脚本重跑（无网络/API，失败=脚本 bug，迭代快）

可跑示例见 skill 目录 `examples/`（flow-6steps / infographic-softmax / framework-transformer）。

Full procedures + svg-helpers API + 示例脚本：[references/vector-usage.md](references/vector-usage.md)

### Step 6: Finalize

Insert `![description]({relative-path}/NN-{type}-{slug}.svg)` after paragraphs. Path computed relative to article file based on output directory setting.

```
Article Illustration Complete!
Article: [path] | Type: [type] | Density: [level] | Style: [style] | Palette: [palette]
SVGs: X/N generated
```

## Output Directory

Output directory is determined by `default_output_dir` in EXTEND.md：

| `default_output_dir` | Output Path | Markdown Insert Path |
|----------------------|-------------|----------------------|
| `imgs-subdir` (default) | `{article-dir}/imgs/` | `imgs/NN-{type}-{slug}.svg` |
| `same-dir` | `{article-dir}/` | `NN-{type}-{slug}.svg` |
| `illustrations-subdir` | `{article-dir}/illustrations/` | `illustrations/NN-{type}-{slug}.svg` |
| `independent` | `illustrations/{topic-slug}/` | `illustrations/{topic-slug}/NN-{type}-{slug}.svg` (relative to cwd) |

辅助文件存输出目录内：

```
{output-dir}/
├── outline.md
├── gen/                        # svg-helpers 生成脚本（可复现记录）
│   └── NN-{type}-{slug}.cjs
└── NN-{type}-{slug}.svg        # 产物
```

When input is **pasted content** (no file path), always uses `illustrations/{topic-slug}/` with `source-{slug}.md` saved alongside.

**Slug**: 2-4 words, kebab-case. **Conflict**: append `-YYYYMMDD-HHMMSS`.

## Modification

| Action | Steps |
|--------|-------|
| Edit | 改 gen 脚本（坐标/标签/精致度参数）→ 重跑 → 更新引用 |
| Add | 定位 → 写 gen 脚本 → 跑 → 更新 outline → 插入 |
| Delete | 删 .svg + gen 脚本 → 移除引用 → 更新 outline |

文字修正：SVG 文字是矢量 `<text>`，**直接改 gen 脚本里的文字内容重跑**即可（不像位图要重新调 API）。

## References

| File | Content |
|------|---------|
| [references/workflow.md](references/workflow.md) | 详细流程 |
| [references/vector-usage.md](references/vector-usage.md) | **纯 SVG 扁平矢量用法 + svg-helpers API（Step 5 出图引擎）** |
| [references/styles.md](references/styles.md) | 精致度档 + 4 套配色 |
| [references/style-presets.md](references/style-presets.md) | 预设（type + 精致度档 + 配色） |
| [references/config/first-time-setup.md](references/config/first-time-setup.md) | 首次设置 |
| [references/config/preferences-schema.md](references/config/preferences-schema.md) | EXTEND.md schema |
| `examples/` | 可跑示例脚本（flow-6steps / infographic-softmax / framework-transformer） |

## Changing Preferences

EXTEND.md lives at the first matching path listed in Step 1.5. Three ways to change:

- **Edit directly** — open EXTEND.md and change fields. Full schema: `references/config/preferences-schema.md`.
- **Reconfigure interactively** — delete EXTEND.md (or ask "重新配置 dg-article-illustrator-svg preferences"). Next run re-triggers first-time setup.
- **Common one-line edits**:
  - `preferred_palette: tech`, `preferred_style: flat`, `language: zh`.
  - `default_output_dir: imgs-subdir` — 生成 SVG 相对文章的位置。
  - 精致度参数默认：`gradient: linear`, `shadow: subtle`, `corner_radius: 12`, `font: sans-serif`.
