// baoyu-article-illustrator-04-comparison-can-cannot.cjs
// 类型：comparison（对比）— baoyu-article-illustrator 能做 vs 不能做边界
// 画法：左右两列卡片（能做 / 不能做），中央 H.line 虚线分隔；
//       左列用绿色（fills[4]）调、右列用粉色（fills[5]）调，每列 4 条能力条目（rect + 左对齐 text）。
// robust require svg-helpers：先试相对，再按 skill 目录候选位置找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); }
catch {
  const p = require('path'), os = require('os'), fs0 = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',
    p.join(home, '.claude/skills/dg-article-illustrator-svg'),
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs0.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

const P = H.palette('tech');
const W = 1200, Hh = 520;

// 来自正文「能做 / 不能做边界」两段，每条精简成一句卡内文案
const can = [
  '自动定位配图点 · 三维批量出图',
  '预设快捷 / 单维度覆盖 / 参考图引导',
  '自动把图引用插回原文段落',
  '跨运行时自动选用原生出图后端',
];
const cannot = [
  '不用 SVG/HTML/canvas 替代位图',
  '不在位图上用代码涂改覆盖文字',
  'prompt 文件落盘前不出图',
  '不跳过确认（需当次明示授权）',
];

// 左右列几何
const colW = 500, cardH = 56, cardGap = 16;
const leftX = 60, rightX = W - 60 - colW;      // 右列右边留同样 60 边距
const dividerX = W / 2;                         // 中央分隔线
const listY = 190;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('能做 vs 不能做 · 边界', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('Can do / Cannot do', W / 2, 116, { size: 16, fill: '#ffffff', opacity: 0.6 }));

// 中央虚线分隔（dash 虚线表达「边界」）
parts.push(H.line(dividerX, 150, dividerX, Hh - 40, { stroke: '#ffffff', strokeWidth: 1.5, dash: '8 6', opacity: 0.4 }));

// 左列：能做（绿色基调 fills[4]）
parts.push(H.rect(leftX, 150, colW, 40, { rx: 10, fill: P.fills[4] }));
parts.push(H.text('✓ 能做', leftX + colW / 2, 170, { size: 20, fill: '#ffffff', weight: 700 }));
can.forEach((t, i) => {
  const y = listY + i * (cardH + cardGap);
  parts.push(H.rect(leftX, y, colW, cardH, { rx: 10, fill: 'rgba(255,255,255,0.08)', stroke: P.fills[4], strokeWidth: 1.2, filter: 'url(#sh)' }));
  parts.push(H.text(t, leftX + 22, y + cardH / 2, { size: 16, fill: '#ffffff', weight: 500, anchor: 'start' }));
});

// 右列：不能做（粉色基调 fills[5]）
parts.push(H.rect(rightX, 150, colW, 40, { rx: 10, fill: P.fills[5] }));
parts.push(H.text('✗ 不能做', rightX + colW / 2, 170, { size: 20, fill: '#ffffff', weight: 700 }));
cannot.forEach((t, i) => {
  const y = listY + i * (cardH + cardGap);
  parts.push(H.rect(rightX, y, colW, cardH, { rx: 10, fill: 'rgba(255,255,255,0.08)', stroke: P.fills[5], strokeWidth: 1.2, filter: 'url(#sh)' }));
  parts.push(H.text(t, rightX + 22, y + cardH / 2, { size: 16, fill: '#ffffff', weight: 500, anchor: 'start' }));
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-article-illustrator-04-comparison-can-cannot.svg', svg);
console.log('✓ baoyu-article-illustrator-04-comparison-can-cannot');
