// gen 01 — 三维定制：类型 × 风格 × 色板（infographic）
// robust require 头（不带 NODE_PATH，自带找 roughjs：先 bun 解析 → DG_SKILL_DIR → 项目内 skill 目录 → 家目录 skill 目录）
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

const W = 1200, H = 460;
const drawables = [];
const texts = [];
const INK = '#5a4a3a', TXT = '#3a2a1a', SUB = '#7a6a5a';

texts.push({ x: W / 2, y: 56, s: '三维定制：类型 × 风格 × 色板', size: 34, fill: TXT, weight: 700 });
texts.push({ x: W / 2, y: 88, s: '三个维度组合，保证一篇文章里多张图调性一致', size: 18, fill: SUB });

const cols = [
  { x: 120, tint: '#eef6ff', accent: '#6c63ff', head: '类型 Type', sub: '控制信息结构',
    items: ['infographic', 'flowchart', 'comparison', 'framework', 'timeline', 'scene'] },
  { x: 460, tint: '#fff8e7', accent: '#b8860b', head: '风格 Style', sub: '控制渲染方式',
    items: ['blueprint', 'notion', 'vector-illustration', 'sketch-notes', 'ink-notes', 'editorial'] },
  { x: 800, tint: '#ffeef5', accent: '#e76f51', head: '色板 Palette', sub: '控制配色',
    items: ['macaron', 'warm', 'neon', 'mono-ink'] },
];
const BW = 280, BH = 280, BY = 130;
cols.forEach(c => {
  drawables.push(gen.rectangle(c.x, BY, BW, BH, {
    stroke: INK, strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
    fill: c.tint, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
  }));
  texts.push({ x: c.x + BW / 2, y: 172, s: c.head, size: 26, fill: TXT, weight: 700 });
  texts.push({ x: c.x + BW / 2, y: 198, s: c.sub, size: 16, fill: SUB });
  drawables.push(gen.line(c.x + 50, 214, c.x + BW - 50, 214, { stroke: INK, strokeWidth: 1.6, roughness: 1.5 }));
  c.items.forEach((it, i) => {
    const iy = 246 + i * 26;
    drawables.push(gen.circle(c.x + 24, iy - 5, 10, { stroke: c.accent, strokeWidth: 1.6, roughness: 1.5, fill: c.accent, fillStyle: 'solid' }));
    texts.push({ x: c.x + 44, y: iy, s: it, size: 17, fill: TXT, anchor: 'start' });
  });
});
texts.push({ x: 430, y: 274, s: '×', size: 60, fill: INK, weight: 700 });
texts.push({ x: 770, y: 274, s: '×', size: 60, fill: INK, weight: 700 });

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
fs.writeFileSync(process.argv[2] || '01-infographic-three-dimensions.svg', svg, 'utf8');
