// baoyu-article-illustrator-02-framework-params-map.cjs
// 类型：framework（结构）— baoyu-article-illustrator 的 7 个参数控制面
// 画法：4 + 3 两行排列的节点卡（H.node 带 sub 副标签），主标签是参数名、副标签是作用，
//       用 H.palette('tech') 深蓝→青渐变底 + 投影，纯 SVG 字符串拼接（零依赖）。
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
const W = 1200, Hh = 500;

// 7 个参数（来自正文参数表），主标签 = 参数名，副标签 = 一句话作用
const params = [
  { name: '--type',       sub: '插图类型' },
  { name: '--style',      sub: '视觉风格' },
  { name: '--palette',    sub: '配色方案' },
  { name: '--preset',     sub: '预设快捷' },
  { name: '--density',    sub: '出图密度' },
  { name: '--batch-size', sub: '并行 1-8' },
  { name: '--ref',        sub: '参考图引导' },
];

const cardW = 270, cardH = 130, gap = 24;
const row1Y = 170, row2Y = 330;

// 第 1 行 4 张：整体居中
const startR1 = (W - (4 * cardW + 3 * gap)) / 2;
// 第 2 行 3 张：整体居中
const startR2 = (W - (3 * cardW + 2 * gap)) / 2;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('7 个参数控制面', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('Command-line flags · 单维度微调 / 预设一把带出', W / 2, 116, { size: 16, fill: '#ffffff', opacity: 0.6 }));

// 第 1 行：前 4 个参数
params.slice(0, 4).forEach((d, i) => {
  const x = startR1 + i * (cardW + gap);
  const n = H.node(x, row1Y, cardW, cardH, d.name, {
    fill: P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 22, weight: 700,
    sub: d.sub,
  });
  parts.push(n.svg);
});

// 第 2 行：后 3 个参数
params.slice(4).forEach((d, i) => {
  const x = startR2 + i * (cardW + gap);
  const idx = i + 4;
  const n = H.node(x, row2Y, cardW, cardH, d.name, {
    fill: P.fills[idx % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 22, weight: 700,
    sub: d.sub,
  });
  parts.push(n.svg);
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-article-illustrator-02-framework-params-map.svg', svg);
console.log('✓ baoyu-article-illustrator-02-framework-params-map');
