---
name: cover-usage
description: cover-helpers 用法手册（dg-cover-image 出图引擎，复用 dg-article-illustrator-svg 的 svg-helpers）
---

# cover-helpers 封面生成手册

dg-cover-image 用 `scripts/cover-helpers.cjs` 生成 16:9 扁平矢量封面（1728×960）。cover-helpers 复用 `dg-article-illustrator-svg/scripts/svg-helpers.cjs`（共享组件库）。**零依赖、不调位图 API、矢量、文字锐利**。

本文件是 **Step 4 出图的实现参考**——生成封面时照这里用 cover-helpers。

## 依赖：零依赖（cover-helpers 复用 svg-helpers）

cover-helpers require `dg-article-illustrator-svg/scripts/svg-helpers.cjs`。无需安装任何包，只需 bun。

### 在 gen 脚本里 require cover-helpers（robust 查找头）

```js
// gen 脚本开头：robust 找 cover-helpers（它内部再找 svg-helpers）
const p = require('path'), os = require('os'), fs = require('fs');
let C;
try { C = require('../scripts/cover-helpers.cjs'); }   // gen 脚本在 skill 目录内时
catch {
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    '.claude/skills/dg-cover-image',
    p.join(home, '.claude/skills/dg-cover-image'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/cover-helpers.cjs')));
  if (!dir) { console.error('✗ cover-helpers 未找到'); process.exit(1); }
  C = require(p.resolve(dir, 'scripts/cover-helpers.cjs'));
}
```

## cover-helpers API 速查

| 函数 | 作用 | 关键参数 |
|---|---|---|
| `C.coverWrap({palette,title,subtitle,tag,decor})` | **主力**：拼完整封面（渐变背景+装饰+标题+副标题+标签） | palette='tech', decor='dots' |
| `C.coverTitle(text,y,opts)` | 大标题（居中，无衬线超粗体） | size=96, weight=800 |
| `C.coverSubtitle(text,y,opts)` | 副标题（半透明，带字距） | size=34, opacity=0.82 |
| `C.coverTag(text,y,opts)` | 顶部标签药丸（圆角半透明） | size=24 |
| `C.decorDots(P)` | 装饰：右下圆点阵列（科技感） | — |
| `C.decorWaves(P)` | 装饰：底部波浪曲线（流动感） | — |
| `C.decorGrid(P)` | 装饰：全屏细网格 + 焦点圆（工程感） | — |
| `C.decorShapes(P)` | 装饰：散布几何（概念感） | — |
| `C.COVER_W` / `C.COVER_H` | 1728 / 960（16:9） | — |
| `C.PALETTES` / `C.palette(name)` | 透传 svg-helpers 的 4 套配色 | — |

> 90% 场景只需 `C.coverWrap({...})` 一行——它内部自动处理渐变背景 + 装饰 + 标题布局。子元素函数供自定义布局用。

## 4 palette（复用 svg-helpers）

| palette | 调性 | 适用 |
|---|---|---|
| `tech`（默认） | 深蓝→青科技 | AI、系统、技术（契合博客主色 #6c63ff） |
| `soft` | 米色低饱和柔和 | 知识、教程、生活 |
| `vibrant` | 浅灰底高饱和 | 产品、活力、对比 |
| `mono` | 白底单主色+灰阶 | 极简、Before/After |

详见 `dg-article-illustrator-svg/references/vector-usage.md`。

## 装饰变体（decor）

| decor | 视觉 | 适合主题 |
|---|---|---|
| `dots` | 右下角半透明圆点阵列 | 技术 / AI / 系统 / 数据 |
| `waves` | 底部 3 条叠加半透明波浪 | 流程 / 动态 / 翻译 / 时序 |
| `grid` | 全屏细网格 + 焦点圆 | 架构 / 框架 / 工程 / 网络 |
| `shapes` | 散布大圆 + 多边形 | 概念 / 抽象 / 通用 / 默认 |

**多张封面轮换**：批量生成时按 `dots → waves → grid → shapes` 循环，避免雷同。

## gen 脚本模板（一行出图）

```js
// gen/cover-<slug>.cjs
<robust require 头（见上）>
const fs = require('fs');
const svg = C.coverWrap({
  palette: 'tech',
  tag: 'AI · 深度学习',
  title: '注意力机制',
  subtitle: 'Attention Mechanism · 让模型「有重点地看」',
  decor: 'shapes',
});
fs.writeFileSync(process.argv[2] || 'cover.svg', svg);
console.log('✓ cover-<slug>');
```

跑：`bun run gen/cover-<slug>.cjs docs/public/covers/<slug>.svg`

## 完整可跑示例

见 skill 目录 `examples/cover-attention.cjs`（tech + shapes + 标签 + 标题 + 副标题）。跑法：`bun run examples/cover-attention.cjs examples/cover-attention.svg`。

## 注意

- **标题长度**：中文标题建议 ≤ 8 字（96px 居中不溢出 1728 宽）；超长可减小 `coverTitle` 的 `size` 或拆副标题。
- **subtitle 可选**：没有英文/描述就留空，封面只有标题也成立。
- **tag 可选**：从文章分类提炼（AI/编程/Skill/工具），没有可省。
- **文字必须用 cover-helpers 函数**（自带转义 + 无衬线栈），不要手拼 `<text>`。
- **改图重跑**：封面是 gen 脚本生成的，改脚本重跑即可（即时反馈，无 API）。
