// baoyu-cover-image-02-infographic.cjs — 11 配色 × 7 渲染 = 26 个预设
// type=infographic, palette=tech：三块数据磁贴 + 运算符，结果「26 预设」用 accent 突出
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-02-infographic.cjs docs/posts/skill/imgs/baoyu-cover-image-02-infographic.svg

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
const W = 1200, Hh = 400;

// 三块磁贴：11 配色、7 渲染、26 预设（最后一块是焦点）
const tileW = 260, tileH = 200, y = 150;
const opW = 80;                                   // 运算符区宽度
const totalW = 3 * tileW + 2 * opW;               // 780 + 160 = 940
const startX = (W - totalW) / 2;                  // 整体居中 (1200-940)/2 = 130

const tiles = [
  { num: '11', label: '套配色', sub: 'palette', isResult: false },
  { num: '7',  label: '种渲染', sub: 'rendering', isResult: false },
  { num: '26', label: '个预设', sub: 'preset', isResult: true },
];
const ops = ['×', '='];

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('预设风格 = 配色 × 渲染', W / 2, 70, { size: 34, fill: '#ffffff', weight: 700 }));

tiles.forEach((t, i) => {
  const x = startX + i * (tileW + opW);
  const fill = t.isResult ? P.accent : P.fills[i % P.fills.length];
  // 磁贴矩形（圆角 + 投影）
  parts.push(H.rect(x, y, tileW, tileH, { rx: 16, fill, filter: 'url(#sh)' }));
  // 大数字
  parts.push(H.text(t.num, x + tileW / 2, y + 70, { size: 64, fill: '#ffffff', weight: 800 }));
  // 中文标签
  parts.push(H.text(t.label, x + tileW / 2, y + 120, { size: 22, fill: '#ffffff', weight: 600 }));
  // 英文副标签
  parts.push(H.text(t.sub, x + tileW / 2, y + 158, { size: 15, fill: '#ffffff', opacity: 0.75 }));
  // 运算符（在相邻两块之间）
  if (i < 2) {
    const ox = x + tileW + opW / 2;
    parts.push(H.text(ops[i], ox, y + tileH / 2, { size: 46, fill: '#ffffff', weight: 800, opacity: 0.9 }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-02-infographic.svg', svg);
console.log('✓ baoyu-cover-image-02-infographic');
