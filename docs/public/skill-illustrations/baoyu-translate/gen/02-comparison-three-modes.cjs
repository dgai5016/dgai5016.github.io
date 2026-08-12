// 02-comparison-three-modes.cjs
// 三档模式对比：quick / normal / refined
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

const W = 1200, H = 540;
const FONT = "'Caveat','Snell Roundhand','Comic Sans MS','楷体','KaiTi','STKaiti',cursive";
const drawables = [];

const cols = [
  { x: 70,  fill: '#eef6ff', accent: '#06d6a0', name: 'quick',  cn: '快翻',  tag: '直译',      badge: '最快',   note: '长文术语易漂移', steps: ['直译'] },
  { x: 430, fill: '#f3efff', accent: '#6c63ff', name: 'normal', cn: '标准',  tag: '先分析再译', badge: '平衡 · 默认', note: '日常博客 / 文档', steps: ['分析', '翻译'] },
  { x: 790, fill: '#fff8e7', accent: '#06d6a0', name: 'refined', cn: '精翻', tag: '完整流水线', badge: '出版级', note: '正式交付稿件', steps: ['分析', '初译', '评审', '修订', '润色'] }
];
const colW = 340, colH = 380, colY = 130;

cols.forEach((c) => {
  drawables.push(gen.rectangle(c.x, colY, colW, colH, {
    stroke: '#5a4a3a', strokeWidth: 2.4, roughness: 1.6, bowing: 1.2,
    fill: c.fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 7, hachureAngle: 45
  }));
  drawables.push(gen.ellipse(c.x + colW / 2, colY - 18, 150, 42, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.5,
    fill: c.accent, fillStyle: 'solid'
  }));
});

const stepBoxW = 220, stepBoxH = 38;
cols.forEach((c) => {
  const cx = c.x + colW / 2;
  const stepsStartY = colY + 130;
  const gap = 8;
  c.steps.forEach((s, i) => {
    const sy = stepsStartY + i * (stepBoxH + gap);
    drawables.push(gen.rectangle(cx - stepBoxW / 2, sy, stepBoxW, stepBoxH, {
      stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.5, bowing: 1,
      fill: '#fdf6e3', fillStyle: 'solid'
    }));
    if (i < c.steps.length - 1) {
      const ax = cx;
      const ay1 = sy + stepBoxH, ay2 = sy + stepBoxH + gap;
      drawables.push(gen.line(ax, ay1 + 2, ax, ay2 - 2, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
    }
    drawables.push(gen.circle(cx - stepBoxW / 2 + 22, sy + stepBoxH / 2, 16, {
      stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.4,
      fill: c.accent, fillStyle: 'solid'
    }));
  });
});

const texts = [];
cols.forEach((c) => {
  const cx = c.x + colW / 2;
  texts.push(`<text x="${cx}" y="${colY - 11}" font-family="${FONT}" font-size="22" fill="#fff" text-anchor="middle" font-weight="700">${c.badge}</text>`);
  texts.push(`<text x="${cx}" y="${colY + 55}" font-family="${FONT}" font-size="34" fill="#3a2a1a" text-anchor="middle" font-weight="700">${c.name}</text>`);
  texts.push(`<text x="${cx}" y="${colY + 90}" font-family="${FONT}" font-size="24" fill="${c.accent}" text-anchor="middle" font-weight="600">${c.cn} · ${c.tag}</text>`);
  const stepsStartY = colY + 130;
  const gap = 8;
  c.steps.forEach((s, i) => {
    const sy = stepsStartY + i * (stepBoxH + gap);
    texts.push(`<text x="${cx - stepBoxW / 2 + 22}" y="${sy + stepBoxH / 2 + 6}" font-family="${FONT}" font-size="14" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`);
    texts.push(`<text x="${cx + 8}" y="${sy + stepBoxH / 2 + 6}" font-family="${FONT}" font-size="18" fill="#3a2a1a" text-anchor="middle" font-weight="600">${s}</text>`);
  });
  const noteY = colY + colH - 30;
  texts.push(`<text x="${cx}" y="${noteY}" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">${c.note}</text>`);
});

// 顶部速度↔质量标尺
drawables.push(gen.line(120, 100, W - 120, 100, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.4 }));
drawables.push(gen.polygon([[W - 120, 100], [W - 135, 92], [W - 135, 108]], { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.4, fill: '#5a4a3a', fillStyle: 'solid' }));

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
<text x="${W / 2}" y="55" font-family="${FONT}" font-size="36" fill="#3a2a1a" text-anchor="middle" font-weight="700">三档模式 · 速度 ↔ 质量</text>
<text x="120" y="92" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">速度优先</text>
<text x="${W - 120}" y="92" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">质量优先</text>
${pathEls}
${texts.join('\n')}
</svg>`;

fs.writeFileSync(process.argv[2] || 'out.svg', svg);
console.log('✓ 生成', process.argv[2] || 'out.svg');
