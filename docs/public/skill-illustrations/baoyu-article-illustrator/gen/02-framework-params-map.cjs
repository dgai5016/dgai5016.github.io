// gen 02 — 7 个参数控制面（framework：网格节点）
// robust require 头（不带 NODE_PATH）
let rough;
try { rough = require('roughjs'); }
catch {
  const p = require('path'), os = require('os'), fs0 = require('fs');
  const cands = [process.env.DG_SKILL_DIR, p.resolve('.claude/skills/dg-article-illustrator-svg'), p.join(os.homedir(), '.claude/skills/dg-article-illustrator-svg')].filter(Boolean);
  const dir = cands.find(d => fs0.existsSync(p.join(d, 'node_modules/roughjs')));
  if (!dir) { console.error('✗ roughjs 未装'); process.exit(1); }
  rough = require(p.join(dir, 'node_modules/roughjs'));
}
const fs = require('fs');
const gen = rough.generator();

const W = 1200, H = 480;
const drawables = [];
const texts = [];
const INK = '#5a4a3a', TXT = '#3a2a1a', SUB = '#7a6a5a', FOCAL = '#6c63ff';

texts.push({ x: W / 2, y: 56, s: '7 个参数：每个控制一个维度', size: 32, fill: TXT, weight: 700 });
texts.push({ x: W / 2, y: 88, s: '三维 + 出图节奏 + 引导 = 完整控制面', size: 18, fill: SUB });

const cards = [
  { name: '--type', role: '信息结构', ex: 'infographic / flowchart', tint: '#eef6ff' },
  { name: '--style', role: '视觉风格', ex: 'blueprint / notion', tint: '#fff8e7' },
  { name: '--palette', role: '配色方案', ex: 'macaron / warm', tint: '#ffeef5' },
  { name: '--preset', role: '三维快捷组合', ex: 'tech-explainer 等', tint: '#eafff0' },
  { name: '--density', role: '出图张数', ex: 'minimal → rich', tint: '#f3efff' },
  { name: '--batch-size', role: '并行出图数', ex: '1-8，默认 4', tint: '#ffe9d6' },
  { name: '--ref', role: '参考图引导', ex: '引导风格 / 构图', tint: '#eef6ff' },
];
const CW = 260, CH = 140;
const row1X = [35, 325, 615, 905];
const row2X = [180, 470, 760];
const positions = row1X.map(x => ({ x, y: 120 })).concat(row2X.map(x => ({ x, y: 300 })));

cards.forEach((c, i) => {
  const { x, y } = positions[i];
  drawables.push(gen.rectangle(x, y, CW, CH, {
    stroke: INK, strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
    fill: c.tint, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
  }));
  texts.push({ x: x + 20, y: y + 46, s: c.name, size: 24, fill: FOCAL, weight: 700, anchor: 'start' });
  drawables.push(gen.line(x + 20, y + 56, x + 110, y + 56, { stroke: FOCAL, strokeWidth: 2, roughness: 1.4 }));
  texts.push({ x: x + 20, y: y + 82, s: c.role, size: 17, fill: TXT, anchor: 'start' });
  texts.push({ x: x + 20, y: y + 108, s: c.ex, size: 14, fill: '#8a7a6a', anchor: 'start' });
});

// 节点间小圆点（控制面/网络感）
const dotYs = [120 + CH / 2, 300 + CH / 2];
const dotPairs = [
  [row1X[0] + CW, row1X[1], dotYs[0]], [row1X[1] + CW, row1X[2], dotYs[0]], [row1X[2] + CW, row1X[3], dotYs[0]],
  [row2X[0] + CW, row2X[1], dotYs[1]], [row2X[1] + CW, row2X[2], dotYs[1]],
];
dotPairs.forEach(([a, b, dy]) => {
  const mx = (a + b) / 2;
  drawables.push(gen.circle(mx, dy, 8, { stroke: INK, strokeWidth: 1.4, roughness: 1.5, fill: '#fdf6e3', fillStyle: 'solid' }));
});

const allPaths = [];
drawables.forEach(d => { const ps = gen.toPaths(d); if (ps) ps.forEach(pp => allPaths.push(pp)); });
const pathEls = allPaths.map(pp => {
  const a = [`d="${pp.d}"`];
  if (pp.stroke) a.push(`stroke="${pp.stroke}"`);
  if (pp.strokeWidth) a.push(`stroke-width="${pp.strokeWidth}"`);
  a.push(`fill="${pp.fill || 'none'}"`);
  return `<path ${a.join(' ')} />`;
}).join('\n');
const textEls = texts.map(t => `<text x="${t.x}" y="${t.y}" font-family="'Caveat','Snell Roundhand',cursive" font-size="${t.size||18}" fill="${t.fill||TXT}" text-anchor="${t.anchor||'middle'}" font-weight="${t.weight||'400'}">${t.s}</text>`).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${pathEls}
${textEls}
</svg>`;
fs.writeFileSync(process.argv[2] || '02-framework-params-map.svg', svg, 'utf8');
