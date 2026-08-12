// baoyu-cover-image-06-comparison.cjs — 能做 / 不能做 · 能力边界
// type=comparison, palette=tech：左右两栏对照 + 中间虚线分隔
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-06-comparison.cjs docs/posts/skill/imgs/baoyu-cover-image-06-comparison.svg

// robust require svg-helpers：先试相对，再按 skill 目录候选位置找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); } catch {
  const p = require('path'), os = require('os'), fs = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',
    p.join(home, '.claude/skills/dg-article-illustrator-svg'),
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

const P = H.palette('tech');
const W = 1200, Hh = 460;

// 能做 / 不能做 各 4 条要点
const can = [
  '5 维度定制 / 26 预设',
  '按内容自动匹配风格',
  '多种宽高比 + 参考图',
  '存 prompt + 沉淀偏好',
];
const cannot = [
  '不用 SVG/HTML 替代位图',
  '不在位图上代码修补',
  '不臆造标题文字',
  '不画写实人物',
];

const colW = 480, colH = 320, gap = 80;
const startX = (W - (2 * colW + gap)) / 2;          // 整体居中
const y = 130;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('能做 / 不能做 · 能力边界', W / 2, 60, { size: 34, fill: '#ffffff', weight: 700 }));

// ── 左栏：能做（绿色系，正向）──
const lx = startX;
parts.push(H.rect(lx, y, colW, colH, { rx: 16, fill: P.fills[4], filter: 'url(#sh)' }));   // fills[4]=绿色
parts.push(H.text('✓ 能做', lx + colW / 2, y + 40, { size: 26, fill: '#ffffff', weight: 800 }));
can.forEach((item, i) => {
  const iy = y + 100 + i * 48;
  // 小圆点 bullet
  parts.push(H.circle(lx + 50, iy + 8, 7, { fill: '#ffffff', opacity: 0.9 }));
  parts.push(H.text(item, lx + 72, iy + 8, { size: 17, fill: '#ffffff', anchor: 'start', weight: 500 }));
});

// ── 右栏：不能做（accent 紫，警示）──
const rx = startX + colW + gap;
parts.push(H.rect(rx, y, colW, colH, { rx: 16, fill: P.accent, filter: 'url(#sh)' }));
parts.push(H.text('✗ 不能做', rx + colW / 2, y + 40, { size: 26, fill: '#ffffff', weight: 800 }));
cannot.forEach((item, i) => {
  const iy = y + 100 + i * 48;
  parts.push(H.circle(rx + 50, iy + 8, 7, { fill: '#ffffff', opacity: 0.9 }));
  parts.push(H.text(item, rx + 72, iy + 8, { size: 17, fill: '#ffffff', anchor: 'start', weight: 500 }));
});

// ── 中间虚线分隔 ──
const dx = startX + colW + gap / 2;
parts.push(H.line(dx, y - 10, dx, y + colH + 10, {
  stroke: '#ffffff', strokeWidth: 1.5, dash: '6 6', opacity: 0.5,
}));

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-06-comparison.svg', svg);
console.log('✓ baoyu-cover-image-06-comparison');
