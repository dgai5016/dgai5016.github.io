---
name: vector-usage
description: 纯 SVG 扁平矢量风插图生成手册（dg-article-illustrator-svg Step 5 出图引擎，基于 scripts/svg-helpers.cjs，零依赖、不调任何位图 API）
---

# 纯 SVG 扁平矢量风生成手册

dg-article-illustrator-svg 用**纯 SVG 字符串拼接**生成扁平矢量风插图——几何色块 + 渐变 + 轻投影 + 无衬线粗体，对齐博客封面图美学。**零依赖、不调任何位图 API（无 glm-image/DALL·E/codex）**，无额度/限流/网络问题；矢量、文字锐利、可缩放、文件小（~3-5KB/图）。

本文件是 **Step 5 出图的实现参考**——按 outline 画图时照这里用 `svg-helpers` 模块。

## 依赖：零依赖（无需安装任何包）

不再需要 roughjs 或任何 npm 包。唯一的运行时是 `bun`（或 `node`）跑 `.cjs` 脚本。所有绘图能力都在 skill 自带的 `scripts/svg-helpers.cjs` 里（纯字符串拼接）。

> 对比旧版：旧版要 `bash scripts/install-deps.sh` 装 roughjs；新版**完全不需要装依赖**，`install-deps.sh` 已移除。

## 核心模块：scripts/svg-helpers.cjs

封装了扁平矢量风的常用片段（形状 / 渐变 / 投影 / 文字 / 组合件）。gen 脚本 `require()` 它复用，**避免每张图手算坐标、手拼 SVG**，同时保证全站风格一致。

### 在 gen 脚本里 require 它（robust 查找头）

gen 脚本生成在文章输出目录（如 `docs/posts/.../gen/`），而 `svg-helpers.cjs` 在 skill 目录的 `scripts/`。裸 `require('../scripts/svg-helpers.cjs')` 从 gen 脚本位置通常找不到，**每个 gen 脚本必须以下面这段头开头**——先试相对引用，再按多个候选位置找 skill 目录：

```js
// robust require svg-helpers：先试相对，再按 skill 目录找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); }   // gen 脚本恰好在 skill 目录内时
catch {
  const p = require('path'), os = require('os'), fs = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,                                  // 环境变量优先（运行时注入）
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',               // 项目级 skill
    p.join(home, '.claude/skills/dg-article-illustrator-svg'), // 用户级 skill
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'), // 插件安装
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');
```

## svg-helpers API 速查

| 函数 | 作用 | 关键参数 |
|---|---|---|
| `H.palette(name)` | 取配色对象 `{bg,bgGrad,fills,accent,ink}` | `'soft'`/`'tech'`/`'vibrant'`/`'mono'` |
| `H.linearGradient(id,from,to,dir)` | 线性渐变定义（放进 `<defs>`） | dir: `'v'`(垂直,默认)/`'h'` |
| `H.radialGradient(id,from,to)` | 径向渐变（中心偏上光源） | — |
| `H.shadowFilter(id,level)` | 投影滤镜（放进 `<defs>`） | level: `'subtle'`(默认)/`'strong'`/`'none'` |
| `H.rect(x,y,w,h,opts)` | 矩形 | `rx`(圆角)/`fill`/`stroke`/`filter` |
| `H.circle(cx,cy,r,opts)` | 圆 | `fill`/`stroke`/`filter` |
| `H.ellipse(cx,cy,w,h,opts)` | 椭圆（w/h 是整体宽高） | `fill`/`stroke` |
| `H.line(x1,y1,x2,y2,opts)` | 直线 | `stroke`/`dash`(虚线)/`opacity` |
| `H.path(d,opts)` | 自由路径（曲线/形状） | `d`(SVG path 串)/`fill`/`stroke` |
| `H.polygon(points,opts)` | 多边形 | `points`:`[[x,y],...]`/`fill` |
| `H.text(content,x,y,opts)` | 无衬线文字（中文 PingFang SC） | `size`/`fill`/`weight`/`anchor`/`align`/`opacity` |
| `H.arrow(x1,y1,x2,y2,opts)` | 带箭头连线（线+末端三角） | `stroke`/`size`(箭头)/`dash`/`opacity` |
| `H.node(x,y,w,h,label,opts)` | **组合件**：圆角矩形+居中标签，返回 `{svg,cx,cy}` | `fill`/`filter`/`textColor`/`size`/`sub`(副标签) |
| `H.barChart(data,x,y,w,h,opts)` | **组合件**：柱状图（自动满高+数值+标签） | `data`:`[{label,value,color?}]` |
| `H.wrap(W,H,bg,children,defsExtra)` | 拼完整 SVG（含背景+defs） | bg:`{fill}` 或 `{gradFrom,gradTo}` |

> 通用 `opts`：`fill` / `stroke` / `strokeWidth` / `filter`（如 `'url(#sh)'`）/ `opacity`。`text` 的 `align`：`'middle'`(默认,y 当中心)/`'top'`/`'bottom'`(y 当基线)。

## 4 套 palette 速查（对齐博客封面图）

| palette | 调性 | 背景 | 适用 |
|---|---|---|---|
| `soft`（默认） | 米色低饱和柔和 | `#f5e9d7` / 渐变 `#f7ecd9→#ece0cc` | 通用、知识、教程 |
| `tech` | 深蓝→青科技 | `#1e3a8a` / 渐变 `#1e3a8a→#0e7490` | AI、系统、技术（契合博客主色） |
| `vibrant` | 浅灰底高饱和 | `#f0f2f5` / 渐变 `#f4f5f8→#e6e9ef` | 产品、活力、对比 |
| `mono` | 白底单主色+灰阶 | `#ffffff` / 渐变 `#ffffff→#f2f2f5` | 极简、Before/After |

每套含 `bg`(纯色) / `bgGrad[2]`(渐变) / `fills[]`(色块轮转) / `accent`(焦点) / `ink`(文字线)。

## gen 脚本骨架（每张图照这个写）

```js
// 01-flow-xxx.cjs
<robust require 头（见上）>
const P = H.palette('tech');               // 1. 选 palette
const W = 1200, Hh = 440;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle')); // 2. 投影滤镜（节点引用 url(#sh)）
parts.push(H.text('标题', W/2, 80, {size:34, fill:'#fff', weight:700}));

// 3. 用 node/rect/barChart/arrow 等拼内容
const n = H.node(120, 200, 200, 100, '输入', {fill:P.fills[0], filter:'url(#sh)', textColor:'#fff'});
parts.push(n.svg);

// 4. wrap 拼完整 SVG（背景渐变自动进 defs）
const svg = H.wrap(W, Hh, {gradFrom:P.bgGrad[0], gradTo:P.bgGrad[1]}, parts);
fs.writeFileSync(process.argv[2] || '01-flow-xxx.svg', svg);
console.log('✓ 01-flow-xxx');
```

跑：`bun run gen/01-flow-xxx.cjs gen/01-flow-xxx.svg`（纯本地计算，无 API，可放心并行多张）。

## 类型 → 组件映射（6 种 type 怎么画）

| type | 用哪些组件 | 画法要点 |
|---|---|---|
| `flowchart` | `node` + `arrow` | 横/纵向排 `node`，之间用 `arrow` 连。序号用 `circle`+`text`。见 `examples/flow-6steps.cjs` |
| `infographic` | `barChart` / `rect` 分区 + `text` + 小图标 | 数据对比用 `barChart`；指标分区用 `rect`+`text`。见 `examples/infographic-softmax.cjs` |
| `framework` | `node`（带 `sub` 副标签）+ `arrow` 纵向 | 层叠结构，核心层用 `accent` 色突出。见 `examples/framework-transformer.cjs` |
| `comparison` | 左右两组 `node`/`rect` + 中间 `line`（`dash` 虚线分隔） | 左右对称，dashed 线分隔 |
| `timeline` | 横向 `line`（轴）+ `circle`（事件点）+ `text` | 时间轴上等距打点 |
| `scene` | 抽象 `path`/`polygon` 组合 | 叙事场景，少用 |

> 完整可跑示例见 skill 目录 `examples/`：`flow-6steps.cjs`（横向流程）、`infographic-softmax.cjs`（柱状图）、`framework-transformer.cjs`（纵向结构图）。跑法：`bun run examples/<name>.cjs examples/<name>.svg`。

## 精致度参数（对应 EXTEND.md 的风格档）

扁平矢量风的「精致度」由这几个离散选择控制（写入 EXTEND.md 或 outline frontmatter）：

| 参数 | 取值 | 作用 |
|---|---|---|
| `gradient` | `none` / `linear` / `radial` | 背景/色块是否渐变（`wrap` 的 `gradFrom/gradTo` / `linearGradient`） |
| `shadow` | `none` / `subtle` / `strong` | 投影强度（`shadowFilter` 的 level） |
| `corner_radius` | `0` / `8` / `12` / `16` | 圆角（`rect`/`node` 的 `rx`） |
| `stroke` | `none` / `thin` / `bold` | 描边（元素 `stroke` + `strokeWidth`） |
| `font` | `sans-serif`（固定） | 无衬线（中文 PingFang SC） |

## 配色一致性原则

- **同图多元素**：依次取 `P.fills[i % fills.length]`，保证配色协调不撞色。
- **焦点元素**：用 `P.accent`（每套 palette 的强调色），引导视线到最关键的 1 个元素。
- **文字色**：浅/彩底用 `'#ffffff'` 或 `P.ink`；深底（tech）用白；浅底（soft/vibrant/mono）用 `P.ink`。
- **背景**：默认用 `P.bgGrad` 渐变（`wrap({gradFrom,gradTo})`）；要纯色底用 `wrap({fill:P.bg})`。

## 注意事项

- **文字必须用 `H.text`**（自带无衬线栈 + XML 转义），不要手拼 `<text>` 漏转义。
- **`id` 唯一**：同一张 SVG 里 `linearGradient`/`shadowFilter` 的 `id` 不能重复（如多张投影都用 `'sh'` 没问题，但别在一图里定义两个同名 id）。
- **viewBox 常用 `1200×(360–560)`**（横向宽带状，和博客嵌入兼容）。
- **坐标取整**：`H` 内部已对坐标 `Math.round`，无需手动取整。
- **失败=脚本 bug**：坐标算错导致元素重叠/文字溢出 → 改 gen 脚本重跑（即时反馈，无网络/API）。
- **不要用 SVG filter 模拟手绘抖动**——本 skill 已不走手绘路线，`filter` 只用于投影/光效。
