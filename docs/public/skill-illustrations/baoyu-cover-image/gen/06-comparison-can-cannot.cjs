// 06-comparison-can-cannot.cjs
// 左右对比：能做 ✓ / 不能做 ✗
// 输出: 06-comparison-can-cannot.svg
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

const W = 1200, H = 460;
const drawables = [];

const colW = 520, colH = 320, gap = 40;
const startX = (W - (2 * colW + gap)) / 2;
const startY = 100;

drawables.push(gen.rectangle(startX, startY, colW, colH, {
  stroke: '#5a4a3a', strokeWidth: 2.4, roughness: 1.6, bowing: 1.2,
  fill: '#eafff0', fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 7, hachureAngle: 45,
}));
drawables.push(gen.rectangle(startX + colW + gap, startY, colW, colH, {
  stroke: '#5a4a3a', strokeWidth: 2.4, roughness: 1.6, bowing: 1.2,
  fill: '#ffeef5', fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 7, hachureAngle: 45,
}));

const midX = startX + colW + gap / 2;
for (let y = startY + 20; y < startY + colH - 20; y += 22) {
  drawables.push(gen.line(midX, y, midX, y + 12, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.2 }));
}

// 左框 ✓ 圆 / 右框 ✗ 圆
drawables.push(gen.circle(startX + 60, startY + 50, 50, {
  stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6,
  fill: '#06d6a0', fillStyle: 'solid',
}));
drawables.push(gen.circle(startX + colW + gap + 60, startY + 50, 50, {
  stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6,
  fill: '#ff8a5b', fillStyle: 'solid',
}));

const allPaths = [];
drawables.forEach(d => { const ps = gen.toPaths(d); if (ps) ps.forEach(p => allPaths.push(p)); });
const pathEls = allPaths.map(p => {
  const a = [`d="${p.d}"`];
  if (p.stroke) a.push(`stroke="${p.stroke}"`);
  if (p.strokeWidth) a.push(`stroke-width="${p.strokeWidth}"`);
  a.push(`fill="${p.fill || 'none'}"`);
  return `<path ${a.join(' ')} />`;
}).join('\n');

const title = `<text x="${W / 2}" y="56" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="32" fill="#3a2a1a" text-anchor="middle" font-weight="700">能做 / 不能做 · 能力边界</text>`;
const check = `<text x="${startX + 60}" y="${startY + 60}" font-family="'Caveat',cursive" font-size="34" fill="#fff" text-anchor="middle" font-weight="700">✓</text>`;
const cross = `<text x="${startX + colW + gap + 60}" y="${startY + 60}" font-family="'Caveat',cursive" font-size="34" fill="#fff" text-anchor="middle" font-weight="700">✗</text>`;
const leftHead = `<text x="${startX + 110}" y="${startY + 58}" font-family="'Caveat','Snell Roundhand',cursive" font-size="28" fill="#3a2a1a" text-anchor="start" font-weight="700">能做</text>`;
const rightHead = `<text x="${startX + colW + gap + 110}" y="${startY + 58}" font-family="'Caveat','Snell Roundhand',cursive" font-size="28" fill="#3a2a1a" text-anchor="start" font-weight="700">不能做</text>`;

const canItems = [
  '5 维度 + 字体定制封面',
  '26 个预设一键定型',
  '按内容自动匹配视觉风格',
  '支持 16:9 / 2.35:1 / 1:1 / 3:4 …',
  '接受参考图做风格 / 构图引导',
  '每次 prompt 存档可复现',
  '偏好文件沉淀默认习惯',
];
const cannotItems = [
  '不用 SVG / HTML / canvas 画图凑数',
  '不在位图上用代码修补文字',
  '不臆造标题（严格取自文章）',
  '不画写实人物（只用简化剪影）',
];

const canTexts = canItems.map((it, i) => {
  const y = startY + 120 + i * 28;
  return `<text x="${startX + 32}" y="${y}" font-family="'Caveat',cursive" font-size="19" fill="#3a2a1a" text-anchor="start" font-weight="600">• ${it}</text>`;
}).join('\n');
const cannotTexts = cannotItems.map((it, i) => {
  const y = startY + 120 + i * 32;
  return `<text x="${startX + colW + gap + 32}" y="${y}" font-family="'Caveat',cursive" font-size="19" fill="#a33a2a" text-anchor="start" font-weight="600">• ${it}</text>`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${check}${cross}
${leftHead}${rightHead}
${canTexts}
${cannotTexts}
</svg>`;

fs.writeFileSync(process.argv[2] || '06-comparison-can-cannot.svg', svg);
console.log('✓ 生成', process.argv[2] || '06-comparison-can-cannot.svg');
