// baoyu-cover-image-01-framework.cjs — 5 维度 + 字体 · 定制模型
// type=framework, palette=tech：6 个节点（5 维度 + 1 字体），字体节点用 accent 突出
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-01-framework.cjs docs/posts/skill/imgs/baoyu-cover-image-01-framework.svg

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

const P = H.palette('tech');               // 深蓝→青科技渐变（AI/技术风）
const W = 1200, Hh = 420;

// 6 个定制维度：前 5 个是「维度」，最后 1 个是「字体」（用 accent 强调）
const dims = [
  { label: '类型', sub: 'type' },
  { label: '配色', sub: 'palette' },
  { label: '渲染', sub: 'rendering' },
  { label: '文字', sub: 'text' },
  { label: '氛围', sub: 'mood' },
  { label: '字体', sub: 'font' },
];

const boxW = 160, boxH = 120, gap = 24;
const startX = (W - (6 * boxW + 5 * gap)) / 2;   // 整体水平居中
const y = 230;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));      // 轻投影滤镜，节点引用 url(#sh)
parts.push(H.text('定制模型 · 5 维度 + 字体', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('六个旋钮决定一张封面的气质', W / 2, 124, { size: 17, fill: '#ffffff', opacity: 0.7 }));

dims.forEach((d, i) => {
  const x = startX + i * (boxW + gap);
  const isFont = i === 5;                         // 字体节点作为焦点用 accent 色
  const n = H.node(x, y, boxW, boxH, d.label, {
    fill: isFont ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 22, weight: 700,
    sub: d.sub,
  });
  parts.push(n.svg);
  // 节点上方小序号圆
  parts.push(H.circle(x + boxW / 2, y - 34, 20, { fill: isFont ? P.accent : P.fills[i % P.fills.length], filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 34, { size: 20, fill: '#ffffff', weight: 700 }));
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-01-framework.svg', svg);
console.log('✓ baoyu-cover-image-01-framework');
