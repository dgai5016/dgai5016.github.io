// 01-framework-five-dimensions.cjs
// 中心节点「封面图」+ 周围 6 个维度节点（类型/配色/渲染/文字/氛围/字体）
// 输出: 01-framework-five-dimensions.svg
// 头：robust require —— 先 NODE_PATH/向上，再 skill 目录（DG_SKILL_DIR / 项目 .claude/skills / 用户级 ~/.claude/skills）
let rough;
try { rough = require('roughjs'); }
catch {
  const p = require('path'), os = require('os');
  const cands = [process.env.DG_SKILL_DIR, '.claude/skills/dg-article-illustrator-svg', p.join(os.homedir(), '.claude/skills/dg-article-illustrator-svg')].filter(Boolean);
  const dir = cands.find(d => require('fs').existsSync(p.resolve(d, 'node_modules/roughjs')));
  if (!dir) { console.error('✗ roughjs 未装。跑: bash <skill-dir>/scripts/install-deps.sh'); process.exit(1); }
  rough = require(p.resolve(dir, 'node_modules/roughjs'));
}
const fs = require('fs');
const gen = rough.generator();

const W = 1200, H = 520;
const drawables = [];

const cx = W / 2, cy = H / 2 + 20;

// 6 个维度节点：标签 + 取值速记 + 角度（从正上方顺时针）
const nodes = [
  { label: '类型', sub: 'hero / conceptual / typography...', fill: '#fff8e7', angle: -Math.PI / 2 },
  { label: '配色', sub: '11 套（warm/cool/macaron...）', fill: '#eef6ff', angle: -Math.PI / 2 + (2 * Math.PI / 6) },
  { label: '渲染', sub: '7 种（flat/hand-drawn/chalk...）', fill: '#eafff0', angle: -Math.PI / 2 + (4 * Math.PI / 6) },
  { label: '文字', sub: 'none → text-rich', fill: '#ffeef5', angle: -Math.PI / 2 + (6 * Math.PI / 6) },
  { label: '氛围', sub: 'subtle / balanced / bold', fill: '#ffe9d6', angle: -Math.PI / 2 + (8 * Math.PI / 6) },
  { label: '字体', sub: 'clean / handwritten / serif', fill: '#f3efff', angle: -Math.PI / 2 + (10 * Math.PI / 6) },
];

const R = 250;
const boxW = 230, boxH = 96;

// 先画连线（在节点下层）
nodes.forEach(n => {
  const nx = cx + Math.cos(n.angle) * (R - boxW / 2 - 4);
  const ny = cy + Math.sin(n.angle) * (R - boxH / 2 - 4);
  drawables.push(gen.line(cx, cy, nx, ny, {
    stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.5, bowing: 1,
  }));
});

// 中心节点（封面图）—— 焦点色
const centerW = 180, centerH = 110;
drawables.push(gen.rectangle(cx - centerW / 2, cy - centerH / 2, centerW, centerH, {
  stroke: '#5a4a3a', strokeWidth: 2.6, roughness: 1.6, bowing: 1.2,
  fill: '#6c63ff', fillStyle: 'hachure', fillWeight: 1.4, hachureGap: 6, hachureAngle: 45,
}));

// 周围 6 个维度节点
nodes.forEach(n => {
  const nx = cx + Math.cos(n.angle) * R;
  const ny = cy + Math.sin(n.angle) * R;
  drawables.push(gen.rectangle(nx - boxW / 2, ny - boxH / 2, boxW, boxH, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
    fill: n.fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45,
  }));
  n.cx = nx; n.cy = ny;
});

const allPaths = [];
drawables.forEach(d => { const ps = gen.toPaths(d); if (ps) ps.forEach(p => allPaths.push(p)); });
const pathEls = allPaths.map(p => {
  const a = [`d="${p.d}"`];
  if (p.stroke) a.push(`stroke="${p.stroke}"`);
  if (p.strokeWidth) a.push(`stroke-width="${p.strokeWidth}"`);
  a.push(`fill="${p.fill || 'none'}"`);
  return `<path ${a.join(' ')} />`;
}).join('\n');

const title = `<text x="${W / 2}" y="58" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="34" fill="#3a2a1a" text-anchor="middle" font-weight="700">5 维度 + 字体 · 定制你的封面</text>`;
const centerText = `<text x="${cx}" y="${cy - 6}" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="30" fill="#fff" text-anchor="middle" font-weight="700">封面图</text><text x="${cx}" y="${cy + 28}" font-family="'Caveat',cursive" font-size="18" fill="#fff" text-anchor="middle" font-weight="600">5 维度 × 字体</text>`;

const nodeTexts = nodes.map(n => {
  return `<text x="${n.cx}" y="${n.cy - 8}" font-family="'Caveat','Snell Roundhand',cursive" font-size="24" fill="#3a2a1a" text-anchor="middle" font-weight="700">${n.label}</text>` +
    `<text x="${n.cx}" y="${n.cy + 22}" font-family="'Caveat',cursive" font-size="15" fill="#5a4a3a" text-anchor="middle" font-weight="500">${n.sub}</text>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${centerText}
${nodeTexts}
</svg>`;

fs.writeFileSync(process.argv[2] || '01-framework-five-dimensions.svg', svg);
console.log('✓ 生成', process.argv[2] || '01-framework-five-dimensions.svg');
