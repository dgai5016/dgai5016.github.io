// baoyu-article-illustrator-01-framework-three-dimensions.cjs
// 类型：framework（结构/维度）— 三维定制模型：类型 × 风格 × 色板
// 画法：3 张并排维度卡（圆角矩形 + 维度名 + 取值列表），卡间用「×」表达组合关系，
//       用 H.palette('tech') 深蓝→青渐变底 + 投影，纯 SVG 字符串拼接（零依赖）。
// robust require svg-helpers：先试相对，再按 skill 目录候选位置找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); }   // gen 脚本恰好在 skill 目录内时
catch {
  const p = require('path'), os = require('os'), fs0 = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',               // 项目级 skill（相对 CWD）
    p.join(home, '.claude/skills/dg-article-illustrator-svg'), // 用户级 skill
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs0.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

const P = H.palette('tech');            // 深蓝→青渐变（EXTEND.md 指定的 tech 调色板）
const W = 1200, Hh = 460;

// 三个维度的真实取值（来自文章正文）
const dims = [
  { name: '类型', vals: ['infographic', 'scene', 'flowchart', 'comparison', 'framework', 'timeline'] },
  { name: '风格', vals: ['blueprint', 'notion', 'vector-illustration', 'sketch-notes', 'ink-notes', 'editorial'] },
  { name: '色板', vals: ['macaron', 'warm', 'neon', 'mono-ink'] },
];

const cardW = 320, cardH = 300, gap = 40;
const startX = (W - (3 * cardW + 2 * gap)) / 2;   // 整组居中 → 80
const cardY = 140;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));      // 卡片柔和投影（放进 defs）
// 标题 + 英文副标
parts.push(H.text('三维定制模型：类型 × 风格 × 色板', W / 2, 72, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('Type × Style × Palette', W / 2, 108, { size: 16, fill: '#ffffff', opacity: 0.6 }));

dims.forEach((d, i) => {
  const x = startX + i * (cardW + gap);
  const cx = x + cardW / 2;
  // 维度卡：圆角矩形，依次取 fills 配色，带投影
  parts.push(H.rect(x, cardY, cardW, cardH, { rx: 16, fill: P.fills[i], filter: 'url(#sh)' }));
  // 维度名（卡顶大字）
  parts.push(H.text(d.name, cx, cardY + 40, { size: 26, fill: '#ffffff', weight: 700 }));
  // 标题下细分隔线
  parts.push(H.line(x + 30, cardY + 70, x + cardW - 30, cardY + 70, { stroke: '#ffffff', strokeWidth: 1.2, opacity: 0.35 }));
  // 取值列表（逐行居中）
  d.vals.forEach((v, j) => {
    parts.push(H.text(v, cx, cardY + 104 + j * 32, { size: 17, fill: '#ffffff', weight: 500, opacity: 0.92 }));
  });
  // 卡片之间的「×」组合符（只在前两张后画）
  if (i < 2) {
    const xx = x + cardW + gap / 2;
    parts.push(H.text('×', xx, cardY + cardH / 2 + 8, { size: 40, fill: '#ffffff', weight: 700, opacity: 0.85 }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-article-illustrator-01-framework-three-dimensions.svg', svg);
console.log('✓ baoyu-article-illustrator-01-framework-three-dimensions');
