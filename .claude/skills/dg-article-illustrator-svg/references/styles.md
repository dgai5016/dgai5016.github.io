---
name: styles
description: 扁平矢量精致风的精致度档与配色（dg-article-illustrator-svg）
---

# Styles & Palettes（扁平矢量精致风）

dg-article-illustrator-svg 用**纯 SVG** 画扁平矢量风——风格由**精致度档（gradient/shadow/corner_radius/stroke）+ 配色（palette）**决定。对齐博客封面图美学：几何色块 + 渐变 + 轻投影 + 无衬线粗体。无手绘抖动、无位图 API。

## 精致度档（Style）

映射到 svg-helpers 的渐变 / 投影 / 圆角 / 描边参数：

| Style | gradient | shadow | corner_radius | stroke | 感觉 |
|---|---|---|---|---|---|
| `flat`（默认） | linear | subtle | 12 | none | 干净现代，扁平矢量标准 |
| `soft` | linear | subtle | 16 | none | 更柔和（大圆角 + 轻投影） |
| `bold` | linear | strong | 8 | bold | 更强调（重投影 + 描边） |

用 `--style flat` 选，或 EXTEND.md 设 `preferred_style` / `gradient` / `shadow` / `corner_radius` / `stroke`（显式值覆盖档位映射）。

## 配色（Palette）

4 套配色（hex 详见 [vector-usage.md](vector-usage.md) 与 `scripts/svg-helpers.cjs` 的 `PALETTES`）：

| Palette | 调性 | fills（轮转） | accent | 适用 |
|---|---|---|---|---|
| `soft`（默认） | 米色低饱和 | 柔和蓝/紫/绿/橙/黄 | 紫 `#6c63ff` | 通用、知识、教程 |
| `tech` | 深蓝→青科技 | 青/蓝/紫/绿/粉 | 紫 `#a78bfa` | AI、系统、技术（契合博客主色） |
| `vibrant` | 浅灰底高饱和 | 橙/青/紫/黄/粉 | 橙 `#ff6b35` | 产品、活力、对比 |
| `mono` | 白底单主色 | 主色 + 灰阶 | 紫 `#6c63ff` | 极简、Before/After |

用 `--palette tech` 选，或 EXTEND.md 设 `preferred_palette` / `custom_palettes`（自定义 `bg` / `bgGrad` / `fills` / `accent` / `ink`）。

## Auto Selection by Content Signals

Step 2 内容分析后推荐 type + palette（style 默认 `flat`，palette 默认 `soft`，除非内容强信号要求 tech/vibrant/mono）：

| Content Signals | Recommended Type | Recommended Palette |
|---|---|---|
| 无强信号 / 通用 | infographic | soft |
| AI / 深度学习 / 模型 | framework / infographic | tech |
| 知识 / 概念 / 教程 / 指南 | infographic | soft |
| 步骤 / 流程 / 工作流 | flowchart | tech |
| API / 数据 / 指标 | infographic | soft |
| 架构 / 模型 / 框架 | framework | tech |
| 对比 / vs / pros-cons / before-after | comparison | mono |
| 历史 / 演进 / 时间线 | timeline | vibrant |
| 故事 / 叙事 / 情感 | scene | soft |

## 字体（固定无衬线）

- 字体栈：`-apple-system,BlinkMacSystemFont,'PingFang SC','Helvetica Neue','Microsoft YaHei',Arial,sans-serif`
- 中文 mac 用 PingFang SC，Windows 回退 Microsoft YaHei
- 由 svg-helpers 的 `text()` 自动应用，无需手动指定；矢量文字锐利、可缩放

详细 SVG 参数 + 配色 hex 配方见 [vector-usage.md](vector-usage.md)。
