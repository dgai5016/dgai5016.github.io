---
article: docs/posts/skill/baoyu-article-illustrator.md
type: mixed
density: per-section
style: sketch
palette: default
preset: tech-handdrawn
roughness: 1.6
fill_style: hachure
font: cursive
language: zh
image_count: 4
---

# 配图大纲：baoyu-article-illustrator（文章配图 skill）

## Step 2 分析摘要

- **内容类型**：方法论 / 工具说明（一个「文章配图」skill 的定位 + 调用 + 内部流程 + 边界）
- **配图目的**：information / visualization —— 把抽象的三维模型、参数控制面、6 步流程、能力边界可视化
- **核心论点**：
  1. 「类型 × 风格 × 色板」三维组合，保证一篇文章多张图调性一致
  2. 7 个 CLI 参数 = 三维 + 出图节奏 + 引导的完整控制面
  3. 6 步工作流，其中「确认设置」是硬门槛（没确认不往下走）
  4. 能做 / 不能做边界清晰（两条硬规则：不用代码替代位图、不涂改位图）
- **隐喻可视化原则**：不画字面「图」「门槛」—— 把背后的结构（三维正交、控制面节点、流程顺序、左右对立）画出来

## 选位策略（per-section）

9 个章节里挑 4 个视觉收益最高的，每张一个不同 type（infographic / framework / flowchart / comparison），风格与色板统一（sketch + default 淡彩）：

| # | 章节 | type | 为什么配 |
|---|------|------|----------|
| 1 | 它是什么 | infographic | 三维模型是全文核心概念，三列并置 + 「×」最直观 |
| 2 | 怎么调用（参数表后） | framework | 7 个参数=控制面，网格节点化做速查 |
| 3 | 内部工作流概览 | flowchart | 6 步顺序流程，高亮第 3 步硬门槛 |
| 4 | 能做 / 不能做边界 | comparison | 天然左右对立结构，两条硬规则右侧醒目 |

---

## Illustration 1
**Position**: `## 它是什么` 段落之后
**Purpose**: 把「类型 × 风格 × 色板」三维正交、共同决定一张图视觉调性可视化；强调三维「组合」而非孤立。
**Visual Content**: 三列卡片（淡蓝/淡黄/淡粉 hachure 填充），列头「类型 Type / 风格 Style / 色板 Palette」，列头下小字「控制信息结构 / 控制渲染方式 / 控制配色」；每列列真实取值（类型：infographic/flowchart/comparison/framework/timeline/scene；风格：blueprint/notion/vector-illustration/sketch-notes/ink-notes/editorial；色板：macaron/warm/neon/mono-ink）。列间大号手写「×」。标题「三维定制：类型 × 风格 × 色板」。
**Type**: infographic
**Filename**: 01-infographic-three-dimensions.svg

## Illustration 2
**Position**: `### 参数` 小节表格之后（`## 怎么调用` 内）
**Purpose**: 把 7 个参数做成「控制面板」速查图，每参数控制一个维度，一眼看全完整控制面。
**Visual Content**: 7 张参数卡片网格（4 上 3 下），每卡：参数名（`--type`/`--style`/`--palette`/`--preset`/`--density`/`--batch-size`/`--ref`）+ 一句作用（信息结构 / 视觉风格 / 配色 / 类型+风格+色板快捷 / 出图张数 / 并行数 1-8 / 参考图引导）+ 灰色小字示例取值。卡间小圆点装饰体现「控制面」节点。标题「7 个参数：每个控制一个维度」。
**Type**: framework
**Filename**: 02-framework-params-map.svg

## Illustration 3
**Position**: `## 内部工作流概览` 段落之后
**Purpose**: 把 6 步顺序流程画出来，高亮第 3 步「确认设置」是硬门槛——这是该 skill 区别于「直接出图」的关键特征。
**Visual Content**: 6 个手绘方框横向排列（前置检查 → 分析文章 → 确认设置 → 生成大纲 → 生成图片 → 收尾插回），框上方编号圆圈 1-6；第 3 步（确认设置）用焦点色填充并标注「硬门槛」；框间手绘箭头。标题「内部工作流：6 个步骤」。
**Type**: flowchart
**Filename**: 03-flowchart-workflow.svg

## Illustration 4
**Position**: `## 能做 / 不能做边界` 的「不能做」列表之后（该节末尾）
**Purpose**: 把能力边界做成左右对比（左能做 ✓ / 右不能做 ✗），两条硬规则在右侧醒目呈现。
**Visual Content**: 左右两栏，中间虚线分隔。左栏淡绿底 + ✓（读完文章自动定位配图点三维出图 / 支持预设快捷+单维度覆盖+参考图引导 / 自动把图片引用插回原文 / 跨运行时自动选用原生出图后端）；右栏淡粉底 + ✗（不用 SVG/HTML/canvas 替代位图【硬规则】/ 不在位图上代码涂改文字【硬规则】/ 不在 prompt 落盘前出图 / 不跳过确认除非明说）。标题「能力边界：能做 vs 不能做」。
**Type**: comparison
**Filename**: 04-comparison-can-cannot.svg
