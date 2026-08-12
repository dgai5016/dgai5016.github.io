'use strict';

/**
 * svg-helpers.cjs — dg-article-illustrator-svg 的共享 SVG 辅助模块
 * ============================================================================
 * 作用：把「扁平矢量精致风」SVG 的常用片段封装成函数，gen 脚本 require 它复用，
 *       避免每张图都手算坐标、手拼 SVG 字符串，同时保证全站视觉风格一致。
 * 特点：零依赖（纯字符串拼接）、不调任何位图 API、产出矢量 SVG（文字锐利、可缩放）。
 * 风格：对齐博客封面图美学 —— 扁平几何色块 + 渐变 + 轻投影 + 无衬线粗体。
 *
 * gen 脚本典型用法：
 *   const H = require('<skill-dir>/scripts/svg-helpers.cjs');
 *   const P = H.palette('tech');                       // 选一套配色
 *   const svg = H.wrap(1200, 480, {                    // 拼完整 SVG（含渐变背景）
 *     gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1],
 *   }, [
 *     H.shadowFilter('sh', 'subtle'),                  // 投影滤镜（放进 defs）
 *     H.node(120, 180, 200, 120, '输入', {             // 一个带标签的节点
 *       fill: P.fills[0], filter: 'url(#sh)', textColor: P.ink,
 *     }).svg,
 *   ]);
 *   require('fs').writeFileSync('out.svg', svg);
 * ============================================================================
 */

// ─── 文本转义：SVG 属于 XML，文本里的 < > & 必须转义，否则破坏解析 ─────────
function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ─── 取整：三角函数/除法会产生长小数，取整保持坐标干净 ───────────────────
const r = n => Math.round(n);

// ─── 无衬线字体栈：mac 用 PingFang SC，Windows 回退 Microsoft YaHei，再退 Arial ──
const FONT_STACK = "-apple-system,BlinkMacSystemFont,'PingFang SC','Helvetica Neue','Microsoft YaHei',Arial,sans-serif";

// ============================================================================
// 4 套 palette（对齐博客三张封面图的扁平矢量调性 + 一套单色）
// 每套字段含义：
//   bg       — 纯色背景（不启用渐变时用）
//   bgGrad   — 背景渐变 [起点色, 终点色]（垂直方向）
//   fills    — 色块轮转数组（多个节点/柱形依次取色，保证同图配色协调）
//   accent   — 焦点强调色（整张图最关键的 1 个元素用，引导视线）
//   ink      — 文字 / 线条默认色
// ============================================================================
const PALETTES = {
  // soft：米色低饱和柔和，对齐 baoyu-article-illustrator 封面。通用默认。
  soft: {
    bg: '#f5e9d7', bgGrad: ['#f7ecd9', '#ece0cc'],
    fills: ['#8ca6e0', '#c8a2e0', '#6bcf7f', '#e8a87c', '#f1c40f', '#a8d8ea'],
    accent: '#6c63ff', ink: '#3a3530',
  },
  // tech：深蓝→青渐变，对齐 baoyu-translate 封面。AI / 系统 / 技术讲解（契合博客主色 #6c63ff）。
  tech: {
    bg: '#1e3a8a', bgGrad: ['#1e3a8a', '#0e7490'],
    fills: ['#0891b2', '#06b6d4', '#6c63ff', '#a78bfa', '#34d399', '#f472b6'],
    accent: '#a78bfa', ink: '#ffffff',
  },
  // vibrant：浅灰底 + 高饱和，对齐 baoyu-cover-image 封面。产品 / 活力 / 对比。
  vibrant: {
    bg: '#f0f2f5', bgGrad: ['#f4f5f8', '#e6e9ef'],
    fills: ['#ff6b35', '#4ecdc4', '#9b59b6', '#ffd93d', '#ff6b9d', '#48dbfb'],
    accent: '#ff6b35', ink: '#2c3e50',
  },
  // mono：白底 + 单主色 + 灰阶。极简、Before/After、纯对比。
  mono: {
    bg: '#ffffff', bgGrad: ['#ffffff', '#f2f2f5'],
    fills: ['#6c63ff', '#9b8ab5', '#c8c0d8', '#b8b8b8', '#e0e0e0', '#ededed'],
    accent: '#6c63ff', ink: '#1a1a1a',
  },
};

// 取 palette；名字不认识则回落 soft（最安全的默认）
function palette(name) { return PALETTES[name] || PALETTES.soft; }

// ============================================================================
// <defs> 资源：渐变、投影滤镜
// 把这些字符串拼进 <defs>...</defs>，元素再用 fill="url(#id)" / filter="url(#id)" 引用。
// 注意：同一张 SVG 内每个 id 必须唯一。
// ============================================================================

// 线性渐变。dir: 'v'(垂直，默认) | 'h'(水平)。返回 <linearGradient> 字符串
function linearGradient(id, from, to, dir = 'v') {
  const c = dir === 'h' ? 'x1="0" y1="0" x2="1" y2="0"' : 'x1="0" y1="0" x2="0" y2="1"';
  return `<linearGradient id="${id}" ${c}><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></linearGradient>`;
}

// 径向渐变（中心偏上，模拟柔和顶光）
function radialGradient(id, from, to) {
  return `<radialGradient id="${id}" cx="0.5" cy="0.35" r="0.85"><stop offset="0" stop-color="${from}"/><stop offset="1" stop-color="${to}"/></radialGradient>`;
}

// 投影滤镜。level: 'subtle'(轻，默认) | 'strong'(明显) | 'none'(不投影，返回空串)
// 用法：在元素上加 filter="url(#id)"
function shadowFilter(id, level = 'subtle') {
  if (level === 'none') return '';
  const p = level === 'strong'
    ? 'dy="8" stdDeviation="14" flood-opacity="0.22"'
    : 'dy="4" stdDeviation="6" flood-opacity="0.12"';
  return `<filter id="${id}" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" ${p} flood-color="#000000"/></filter>`;
}

// ============================================================================
// 基础形状：每个函数返回一个 SVG 元素字符串
// 通用 opts: { fill, stroke, strokeWidth, filter, opacity }
// ============================================================================

// 矩形。opts 额外: rx(圆角半径)
function rect(x, y, w, h, opts = {}) {
  const a = [`x="${r(x)}"`, `y="${r(y)}"`, `width="${r(w)}"`, `height="${r(h)}"`];
  if (opts.rx != null) a.push(`rx="${r(opts.rx)}"`);
  a.push(`fill="${opts.fill != null ? opts.fill : 'none'}"`);
  if (opts.stroke) { a.push(`stroke="${opts.stroke}"`); a.push(`stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`); }
  if (opts.filter) a.push(`filter="${opts.filter}"`);
  if (opts.opacity != null) a.push(`opacity="${opts.opacity}"`);
  return `<rect ${a.join(' ')}/>`;
}

// 圆
function circle(cx, cy, rad, opts = {}) {
  const a = [`cx="${r(cx)}"`, `cy="${r(cy)}"`, `r="${r(rad)}"`, `fill="${opts.fill != null ? opts.fill : 'none'}"`];
  if (opts.stroke) { a.push(`stroke="${opts.stroke}"`); a.push(`stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`); }
  if (opts.filter) a.push(`filter="${opts.filter}"`);
  return `<circle ${a.join(' ')}/>`;
}

// 椭圆（w/h 是整体宽高，内部转成 rx/ry）
function ellipse(cx, cy, w, h, opts = {}) {
  const a = [`cx="${r(cx)}"`, `cy="${r(cy)}"`, `rx="${r(w / 2)}"`, `ry="${r(h / 2)}"`, `fill="${opts.fill != null ? opts.fill : 'none'}"`];
  if (opts.stroke) { a.push(`stroke="${opts.stroke}"`); a.push(`stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`); }
  return `<ellipse ${a.join(' ')}/>`;
}

// 直线。opts 额外: dash(虚线样式，如 "6 4")
function line(x1, y1, x2, y2, opts = {}) {
  const a = [`x1="${r(x1)}"`, `y1="${r(y1)}"`, `x2="${r(x2)}"`, `y2="${r(y2)}"`, `stroke="${opts.stroke || '#333'}"`, `stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`];
  if (opts.dash) a.push(`stroke-dasharray="${opts.dash}"`);
  if (opts.opacity != null) a.push(`opacity="${opts.opacity}"`);
  return `<line ${a.join(' ')}/>`;
}

// 通用 path（自定义曲线 / 自由形状）
function path(d, opts = {}) {
  const a = [`d="${d}"`, `fill="${opts.fill != null ? opts.fill : 'none'}"`];
  if (opts.stroke) { a.push(`stroke="${opts.stroke}"`); a.push(`stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`); }
  if (opts.dash) a.push(`stroke-dasharray="${opts.dash}"`);
  return `<path ${a.join(' ')}/>`;
}

// 多边形。points: [[x,y], ...]
function polygon(points, opts = {}) {
  const pts = points.map(p => `${r(p[0])},${r(p[1])}`).join(' ');
  const a = [`points="${pts}"`, `fill="${opts.fill != null ? opts.fill : 'none'}"`];
  if (opts.stroke) { a.push(`stroke="${opts.stroke}"`); a.push(`stroke-width="${opts.strokeWidth != null ? opts.strokeWidth : 1.5}"`); }
  return `<polygon ${a.join(' ')}/>`;
}

// ============================================================================
// 文字（无衬线，矢量锐利）
// opts: { size, fill, weight, anchor('start'|'middle'|'end'), align('top'|'middle'|'bottom') }
// align 控制纵向对齐基准：默认把 y 当「文字垂直中心」(middle)，自动下移到基线；
//   'top'  → y 是文字顶，下移一个字号到基线；
//   'bottom' → y 就是基线，不偏移。
// ============================================================================
function text(content, x, y, opts = {}) {
  const size = opts.size || 18;
  let yy = y;
  if (opts.align === 'bottom') yy = y;            // y 即基线
  else if (opts.align === 'top') yy = y + size;   // 顶部对齐：下移一个字号
  else yy = y + size * 0.35;                       // middle（默认）：居中近似到基线
  const a = [
    `x="${r(x)}"`, `y="${r(yy)}"`,
    `font-family="${FONT_STACK}"`,
    `font-size="${size}"`,
    `fill="${opts.fill || '#333'}"`,
    `text-anchor="${opts.anchor || 'middle'}"`,
  ];
  if (opts.weight) a.push(`font-weight="${opts.weight}"`);
  if (opts.letterSpacing) a.push(`letter-spacing="${opts.letterSpacing}"`);
  if (opts.opacity != null) a.push(`opacity="${opts.opacity}"`);
  return `<text ${a.join(' ')}>${esc(content)}</text>`;
}

// ============================================================================
// 箭头连线（flowchart / framework 主力）
// 一条直线 + 末端实心三角箭头。opts: { stroke, strokeWidth, size(箭头大小), dash }
// 返回 线+箭头 两行字符串
// ============================================================================
function arrow(x1, y1, x2, y2, opts = {}) {
  const stroke = opts.stroke || '#333';
  const sw = opts.strokeWidth != null ? opts.strokeWidth : 1.8;
  const size = opts.size || 11;
  const ang = Math.atan2(y2 - y1, x2 - x1);
  // 箭头根部沿连线方向后退 size，避免线条穿出箭头
  const bx = x2 - size * Math.cos(ang);
  const by = y2 - size * Math.sin(ang);
  // 箭头两侧翼（垂直于连线方向各偏 size*0.55）
  const w1x = bx + size * 0.55 * Math.cos(ang - Math.PI / 2);
  const w1y = by + size * 0.55 * Math.sin(ang - Math.PI / 2);
  const w2x = bx + size * 0.55 * Math.cos(ang + Math.PI / 2);
  const w2y = by + size * 0.55 * Math.sin(ang + Math.PI / 2);
  const ln = line(x1, y1, bx, by, { stroke, strokeWidth: sw, dash: opts.dash, opacity: opts.opacity });
  const head = polygon([[x2, y2], [w1x, w1y], [w2x, w2y]], { fill: stroke });
  return ln + '\n' + head;
}

// ============================================================================
// 组合件：常用结构（box+文字 / 柱状图），省得每次手拼
// ============================================================================

/**
 * 节点 = 圆角矩形 + 居中标签（flowchart / framework / timeline 主力组件）
 * opts: { rx, fill, stroke, strokeWidth, filter, size(字号), textColor, weight, sub(副标签) }
 * 返回 { svg, cx, cy } —— cx/cy 供外部连线对准用
 */
function node(x, y, w, h, label, opts = {}) {
  const cx = x + w / 2, cy = y + h / 2;
  const box = rect(x, y, w, h, {
    rx: opts.rx != null ? opts.rx : 12,
    fill: opts.fill || '#ffffff',
    stroke: opts.stroke, strokeWidth: opts.strokeWidth, filter: opts.filter,
  });
  const size = opts.size || 18;
  let txt;
  if (opts.sub) {
    // 有副标签：主标签偏上、副标签偏下
    txt = text(label, cx, cy - 6, { size, fill: opts.textColor || '#333', weight: opts.weight || 600 })
      + '\n' + text(opts.sub, cx, cy + 18, { size: Math.round(size * 0.7), fill: opts.textColor || '#666', weight: 400 });
  } else {
    txt = text(label, cx, cy, { size, fill: opts.textColor || '#333', weight: opts.weight || 600 });
  }
  return { svg: box + '\n' + txt, cx, cy };
}

/**
 * 柱状图（infographic 主力，如 softmax 分布、loss 对比、指标对比）
 * data: [{ label, value, color? }]，在 (x,y,w,h) 矩形区内均匀排开
 * opts: { ink(文字色), valueSize, labelSize, fill(柱子默认色) }
 * 自动算最高值为满高、柱顶标数值、柱底标标签。
 */
function barChart(data, x, y, w, h, opts = {}) {
  if (!data.length) return '';
  const max = Math.max(...data.map(d => d.value));
  const slot = w / data.length;     // 每根柱子的槽位宽
  const barW = slot * 0.55;         // 柱子实际宽（槽位中央，两侧留间隙）
  const padB = 34;                  // 底部预留高度（放标签）
  const padT = 24;                  // 顶部预留高度（放数值）
  const baseY = y + h - padB;       // 柱底基线
  let s = '';
  data.forEach((d, i) => {
    const bh = (d.value / max) * (h - padB - padT);
    const bx = x + i * slot + (slot - barW) / 2;
    const col = d.color || opts.fill || '#6c63ff';
    s += rect(bx, baseY - bh, barW, bh, { rx: 5, fill: col }) + '\n';
    s += text(String(d.value), bx + barW / 2, baseY - bh - 14, { size: opts.valueSize || 15, fill: opts.ink || '#333', weight: 700 }) + '\n';
    s += text(d.label, bx + barW / 2, baseY + 16, { size: opts.labelSize || 13, fill: opts.ink || '#666' }) + '\n';
  });
  return s;
}

// ============================================================================
// wrap：拼一张完整 SVG
// bg: { fill }                      → 纯色背景
//     { gradFrom, gradTo, gradDir } → 渐变背景（自动建 id="bg-grad" 的渐变并放进 defs）
// children: 字符串或字符串数组（各形状 / 文字 / 组合件的输出）
// defsExtra: 额外的 <defs> 内容（投影 filter、自定义渐变等），字符串
// ============================================================================
function wrap(W, H, bg = {}, children = [], defsExtra = '') {
  let bgDefs = '';
  let bgRect;
  if (bg.gradFrom && bg.gradTo) {
    bgDefs = linearGradient('bg-grad', bg.gradFrom, bg.gradTo, bg.gradDir);
    bgRect = rect(0, 0, W, H, { fill: 'url(#bg-grad)' });
  } else {
    bgRect = rect(0, 0, W, H, { fill: bg.fill || '#ffffff' });
  }
  const defsInner = bgDefs + defsExtra;
  const defsTag = defsInner ? `<defs>\n${defsInner}\n</defs>` : '';
  const body = Array.isArray(children) ? children.join('\n') : String(children);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${r(W)} ${r(H)}" font-family="${FONT_STACK}">
${defsTag}
${bgRect}
${body}
</svg>`;
}

module.exports = {
  // 常量
  PALETTES, FONT_STACK,
  // 配色
  palette,
  // defs 资源
  linearGradient, radialGradient, shadowFilter,
  // 基础形状
  rect, circle, ellipse, line, path, polygon, text, arrow,
  // 组合件
  node, barChart,
  // 拼装
  wrap,
  // 工具
  esc,
};
