'use strict';

/**
 * cover-helpers.cjs — dg-cover-image 的封面专用 helper
 * ============================================================================
 * 16:9 封面（1728×960），扁平矢量精致风：渐变背景 + 装饰几何 + 大标题。
 * 复用 dg-article-illustrator-svg 的 svg-helpers（共享组件库，单一源）。
 * 零依赖、不调位图 API、矢量文字锐利。
 *
 * gen 脚本典型用法：
 *   const C = require('<skill-dir>/scripts/cover-helpers.cjs');
 *   const svg = C.coverWrap({
 *     palette: 'tech', tag: 'AI · 深度学习',
 *     title: '注意力机制', subtitle: 'Attention Mechanism',
 *     decor: 'shapes',
 *   });
 *   require('fs').writeFileSync('cover.svg', svg);
 * ============================================================================
 */

// ─── robust require svg-helpers（从 dg-article-illustrator-svg 共享）──────────
let H;
try { H = require('../dg-article-illustrator-svg/scripts/svg-helpers.cjs'); }
catch {
  const p = require('path'), os = require('os'), fs = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',
    p.join(home, '.claude/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到（dg-cover-image 依赖 dg-article-illustrator-svg）'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}

// 封面尺寸（16:9）
const COVER_W = 1728, COVER_H = 960;

// ============================================================================
// 装饰变体（背景层点缀，半透明，呼应主题）。每个返回 SVG 元素字符串
// ============================================================================

// 圆点阵列：右下角网格点，透明度渐变（科技感）
function decorDots(P) {
  const out = [];
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 4; j++) {
      const x = COVER_W - 140 - i * 78;
      const y = COVER_H - 150 - j * 78;
      const op = 0.07 + ((i + j) % 4) * 0.05;
      out.push(H.circle(x, y, 9, { fill: P.accent, opacity: op }));
    }
  }
  return out.join('\n');
}

// 波浪曲线：底部 3 条叠加半透明波（流动感）
function decorWaves(P) {
  const out = [];
  const cols = [P.fills[0], P.fills[2], P.accent];
  for (let k = 0; k < 3; k++) {
    const baseY = COVER_H - 140 + k * 34;
    const amp = 46 - k * 10;
    let d = `M0 ${baseY}`;
    for (let x = 0; x <= COVER_W; x += 144) {
      d += ` Q ${x + 72} ${baseY - amp} ${x + 144} ${baseY}`;
    }
    out.push(H.path(d, { fill: 'none', stroke: cols[k], strokeWidth: 3, opacity: 0.14 + k * 0.05 }));
  }
  return out.join('\n');
}

// 细网格：全屏淡网格线（工程/结构感）
function decorGrid(P) {
  const out = [];
  for (let x = 0; x <= COVER_W; x += 108) {
    out.push(H.line(x, 0, x, COVER_H, { stroke: '#ffffff', strokeWidth: 1, opacity: 0.05 }));
  }
  for (let y = 0; y <= COVER_H; y += 108) {
    out.push(H.line(0, y, COVER_W, y, { stroke: '#ffffff', strokeWidth: 1, opacity: 0.05 }));
  }
  // 右上一个大半透明圆做焦点
  out.push(H.circle(COVER_W * 0.84, COVER_H * 0.26, 200, { fill: P.accent, opacity: 0.1 }));
  return out.join('\n');
}

// 散布几何：大圆 + 多边形散布（抽象/概念感）
function decorShapes(P) {
  return [
    H.circle(COVER_W * 0.85, COVER_H * 0.24, 190, { fill: P.fills[0], opacity: 0.13 }),
    H.circle(COVER_W * 0.14, COVER_H * 0.78, 150, { fill: P.fills[2], opacity: 0.1 }),
    H.polygon([
      [COVER_W * 0.79, COVER_H * 0.68], [COVER_W * 0.91, COVER_H * 0.62],
      [COVER_W * 0.93, COVER_H * 0.78], [COVER_W * 0.81, COVER_H * 0.83],
    ], { fill: P.accent, opacity: 0.16 }),
    H.circle(COVER_W * 0.2, COVER_H * 0.22, 70, { fill: P.fills[4], opacity: 0.12 }),
  ].join('\n');
}

const DECOR = { dots: decorDots, waves: decorWaves, grid: decorGrid, shapes: decorShapes };

// ============================================================================
// 封面文字元素
// ============================================================================

// 大标题（居中，无衬线超粗体）。y = 标题中心
function coverTitle(text, y, opts = {}) {
  return H.text(text, COVER_W / 2, y, {
    size: opts.size || 96, fill: '#ffffff', weight: 800, anchor: 'middle',
  });
}

// 副标题（标题下，半透明，带字距）
function coverSubtitle(text, y, opts = {}) {
  return H.text(text, COVER_W / 2, y, {
    size: opts.size || 34, fill: '#ffffff', weight: 400, anchor: 'middle',
    opacity: 0.82, letterSpacing: '2',
  });
}

// 顶部标签药丸（圆角矩形 + 文字）。如「AI · 深度学习」「Skill 指南」
function coverTag(text, y = 200, opts = {}) {
  const size = opts.size || 24;
  const tw = text.length * (size * 0.62) + 56;   // 近似文字宽 + 左右 padding
  const x = COVER_W / 2 - tw / 2;
  const pill = H.rect(x, y, tw, 56, { rx: 28, fill: '#ffffff', opacity: 0.16 });
  const txt = H.text(text, COVER_W / 2, y + 28, { size, fill: '#ffffff', weight: 600, anchor: 'middle' });
  return pill + '\n' + txt;
}

// ============================================================================
// coverWrap：拼一张完整封面
// opts: { palette='tech', title, subtitle?, tag?, decor='dots' }
// ============================================================================
function coverWrap({ palette = 'tech', title, subtitle, tag, decor = 'dots' } = {}) {
  const P = H.palette(palette);
  const decorFn = DECOR[decor] || decorDots;
  const parts = [];
  parts.push(decorFn(P));                          // 装饰层（最底，在背景下）
  if (tag) parts.push(coverTag(tag));
  parts.push(coverTitle(title, COVER_H / 2 - 6));  // 标题略偏上居中
  if (subtitle) parts.push(coverSubtitle(subtitle, COVER_H / 2 + 78));
  // H.wrap：渐变背景 + 内容（16:9）
  return H.wrap(COVER_W, COVER_H, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
}

module.exports = {
  COVER_W, COVER_H,
  // 装饰
  decorDots, decorWaves, decorGrid, decorShapes,
  // 文字
  coverTitle, coverSubtitle, coverTag,
  // 拼装
  coverWrap,
  // 透传 svg-helpers 的常量/函数（方便 gen 脚本一处 require）
  PALETTES: H.PALETTES, palette: H.palette,
};
