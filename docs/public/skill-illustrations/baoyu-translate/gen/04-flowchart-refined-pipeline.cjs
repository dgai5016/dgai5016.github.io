// 04-flowchart-refined-pipeline.cjs
// refined 精翻流水线 + 长文分块并行
// robust require 头
let rough;
try { rough = require('roughjs'); }
catch {
  const p = require('path'), os = require('os');
  const cands = [process.env.DG_SKILL_DIR, '.claude/skills/dg-article-illustrator-svg', p.join(os.homedir(), '.claude/skills/dg-article-illustrator-svg')].filter(Boolean);
  const dir = cands.find(d => require('fs').existsSync(p.join(d, 'node_modules/roughjs')));
  if (!dir) { console.error('✗ roughjs 未装。跑: bash <skill-dir>/scripts/install-deps.sh'); process.exit(1); }
  rough = require(p.resolve(dir, 'node_modules/roughjs'));
}
const fs = require('fs');
const gen = rough.generator();

const W = 1200, H = 620;
const FONT = "'Caveat','Snell Roundhand','Comic Sans MS','楷体','KaiTi','STKaiti',cursive";
const drawables = [];

// 上层：5 阶段主流程
const phases = [
  { name: '分析',   fill: '#eef6ff', note: '领域 / 术语 / 语气' },
  { name: '初译',   fill: '#fff8e7', note: '可分块并行 ↓', focus: true },
  { name: '评审',   fill: '#ffeef5', note: '只诊断不重写' },
  { name: '修订',   fill: '#eafff0', note: '按评审意见改' },
  { name: '润色',   fill: '#f3efff', note: '出版级终稿' }
];
const boxW = 180, boxH = 110, gap = 30;
const startX = (W - (5 * boxW + 4 * gap)) / 2;
const topY = 140;

phases.forEach((p, i) => {
  p.x = startX + i * (boxW + gap);
  drawables.push(gen.rectangle(p.x, topY, boxW, boxH, {
    stroke: '#5a4a3a', strokeWidth: p.focus ? 3 : 2.2, roughness: 1.6, bowing: 1.2,
    fill: p.fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
  }));
  drawables.push(gen.circle(p.x + 26, topY + 26, 30, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5,
    fill: p.focus ? '#6c63ff' : '#5a4a3a', fillStyle: 'solid'
  }));
});

for (let i = 0; i < 4; i++) {
  const x1 = startX + i * (boxW + gap) + boxW + 4;
  const x2 = startX + (i + 1) * (boxW + gap) - 4;
  const ay = topY + boxH / 2;
  drawables.push(gen.line(x1, ay, x2, ay, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay - 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay + 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
}

// 下层：长文分块并行
const lowerY = 360;
const lowerBoxW = 160, lowerBoxH = 70;
const docX = 90, docY = lowerY;
drawables.push(gen.rectangle(docX, docY, 120, 180, {
  stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
  fill: '#fdf6e3', fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
}));
for (let i = 0; i < 7; i++) {
  drawables.push(gen.line(docX + 16, docY + 24 + i * 20, docX + 104, docY + 24 + i * 20, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.3 }));
}

const chunkFills = ['#fff8e7', '#eef6ff', '#eafff0'];
const chunkNames = ['chunk-1', 'chunk-2', 'chunk-3'];
const chunkX = 360;
const chunkGap = 24;
const chunkStartY = lowerY + 10;
chunkNames.forEach((_, i) => {
  const cx = chunkX + i * (lowerBoxW + chunkGap) + lowerBoxW / 2;
  drawables.push(gen.line(docX + 120, docY + 90, cx - lowerBoxW / 2, chunkStartY + i * (lowerBoxH + 18) + lowerBoxH / 2, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.5 }));
});
chunkNames.forEach((cn, i) => {
  const cy = chunkStartY + i * (lowerBoxH + 18);
  drawables.push(gen.rectangle(chunkX, cy, lowerBoxW, lowerBoxH, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5, bowing: 1,
    fill: chunkFills[i], fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 6, hachureAngle: 45
  }));
  const rbtX = chunkX + lowerBoxW - 26, rbtY = cy + lowerBoxH / 2;
  drawables.push(gen.circle(rbtX, rbtY, 22, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.4, fill: '#fdf6e3', fillStyle: 'solid' }));
  drawables.push(gen.line(rbtX, rbtY - 11, rbtX, rbtY - 18, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
  drawables.push(gen.circle(rbtX, rbtY - 20, 5, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.3, fill: '#6c63ff', fillStyle: 'solid' }));
});

const mergeX = chunkX + 3 * (lowerBoxW + chunkGap) + 20;
const mergeY = lowerY + 90;
drawables.push(gen.circle(mergeX, mergeY, 70, {
  stroke: '#5a4a3a', strokeWidth: 2.4, roughness: 1.5,
  fill: '#06d6a0', fillStyle: 'solid'
}));
chunkNames.forEach((_, i) => {
  const cy = chunkStartY + i * (lowerBoxH + 18) + lowerBoxH / 2;
  drawables.push(gen.line(chunkX + lowerBoxW + 8, cy, mergeX - 35, mergeY, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.5 }));
});

// 虚线：合并 → 上层初译
const initialPhase = phases.find(p => p.focus);
const initialCx = initialPhase.x + boxW / 2;
const initialBottom = topY + boxH;
const dashSegments = 12;
for (let i = 0; i < dashSegments; i += 2) {
  const t1 = i / dashSegments, t2 = (i + 1) / dashSegments;
  const x1 = mergeX + (initialCx - mergeX) * t1;
  const y1 = mergeY + (initialBottom - mergeY) * t1;
  const x2 = mergeX + (initialCx - mergeX) * t2;
  const y2 = mergeY + (initialBottom - mergeY) * t2;
  drawables.push(gen.line(x1, y1, x2, y2, { stroke: '#6c63ff', strokeWidth: 2, roughness: 1.3 }));
}

const texts = [];
phases.forEach((p, i) => {
  const cx = p.x + boxW / 2;
  texts.push(`<text x="${p.x + 26}" y="${topY + 26 + 6}" font-family="${FONT}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`);
  texts.push(`<text x="${cx}" y="${topY + 58}" font-family="${FONT}" font-size="24" fill="#3a2a1a" text-anchor="middle" font-weight="700">${p.name}</text>`);
  texts.push(`<text x="${cx}" y="${topY + 88}" font-family="${FONT}" font-size="15" fill="#5a4a3a" text-anchor="middle">${p.note}</text>`);
});
texts.push(`<text x="${docX + 60}" y="${docY + 210}" font-family="${FONT}" font-size="18" fill="#3a2a1a" text-anchor="middle" font-weight="600">长文档</text>`);
texts.push(`<text x="${docX + 60}" y="${docY + 230}" font-family="${FONT}" font-size="15" fill="#6c63ff" text-anchor="middle" font-weight="600">&gt; 4000 词</text>`);
chunkNames.forEach((cn, i) => {
  const cy = chunkStartY + i * (lowerBoxH + 18);
  texts.push(`<text x="${chunkX + 20}" y="${cy + lowerBoxH / 2 + 6}" font-family="${FONT}" font-size="18" fill="#3a2a1a" text-anchor="start" font-weight="600">${cn}</text>`);
});
texts.push(`<text x="${mergeX}" y="${mergeY + 6}" font-family="${FONT}" font-size="20" fill="#fff" text-anchor="middle" font-weight="700">合并</text>`);
texts.push(`<text x="${W / 2}" y="${H - 30}" font-family="${FONT}" font-size="18" fill="#6c63ff" text-anchor="middle" font-weight="600">长文分块并行 · 每块派一个子代理 · 共享 02-prompt.md 保证术语一致</text>`);
texts.push(`<text x="${mergeX + (initialCx - mergeX) / 2 - 30}" y="${mergeY + (initialBottom - mergeY) / 2}" font-family="${FONT}" font-size="15" fill="#6c63ff" text-anchor="middle" font-weight="600">展开初译</text>`);

const allPaths = [];
drawables.forEach(d => { const ps = gen.toPaths(d); if (ps) ps.forEach(p => allPaths.push(p)); });
const pathEls = allPaths.map(p => {
  const a = [`d="${p.d}"`];
  if (p.stroke) a.push(`stroke="${p.stroke}"`);
  if (p.strokeWidth) a.push(`stroke-width="${p.strokeWidth}"`);
  a.push(`fill="${p.fill || 'none'}"`);
  return `<path ${a.join(' ')} />`;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
<text x="${W / 2}" y="55" font-family="${FONT}" font-size="34" fill="#3a2a1a" text-anchor="middle" font-weight="700">refined 精翻 · 完整流水线</text>
<text x="${W / 2}" y="87" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">分析 → 初译 → 评审 → 修订 → 润色（超阈值自动分块并行）</text>
${pathEls}
${texts.join('\n')}
</svg>`;

fs.writeFileSync(process.argv[2] || 'out.svg', svg);
console.log('✓ 生成', process.argv[2] || 'out.svg');
