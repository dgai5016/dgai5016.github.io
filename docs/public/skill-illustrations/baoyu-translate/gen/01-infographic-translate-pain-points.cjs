// 01-infographic-translate-pain-points.cjs
// 三大翻译痛点 infographic：翻译腔 / 术语漂移 / 长文丢语境
// robust require 头：自带找 roughjs（不设 NODE_PATH）
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

const W = 1200, H = 460;
const drawables = [];

// 手绘参数（preset tech-handdrawn: sketch + default palette）
const OPT = (fill) => ({
  stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
  fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
});

// 三张卡片
const cards = [
  { x: 70,  fill: '#fff8e7', title: '翻译腔',         sub: '生硬不自然',  desc: '读起来像机翻' },
  { x: 430, fill: '#ffeef5', title: '术语漂移',       sub: '前后不一致',  desc: '同一词多种译法' },
  { x: 790, fill: '#eef6ff', title: '长文丢语境', sub: '后半段失控',  desc: '语境被遗忘' }
];
const cardW = 340, cardH = 300, cardY = 120;

cards.forEach((c) => {
  drawables.push(gen.rectangle(c.x, cardY, cardW, cardH, OPT(c.fill)));
  drawables.push(gen.circle(c.x + cardW / 2, cardY + 60, 64, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6,
    fill: '#fdf6e3', fillStyle: 'solid'
  }));
});

// 卡片1 图标：两条波浪线（翻译腔——生硬句子）
[
  [70 + 170 - 50, 180], [70 + 170 - 25, 168], [70 + 170, 180], [70 + 170 + 25, 192], [70 + 170 + 50, 180]
].forEach((_, i, arr) => {
  if (i < arr.length - 1) {
    const [x1, y1] = arr[i], [x2, y2] = arr[i + 1];
    drawables.push(gen.line(x1, y1, x2, y2, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.8 }));
  }
});
[
  [70 + 170 - 50, 200], [70 + 170 - 25, 212], [70 + 170, 200], [70 + 170 + 25, 188], [70 + 170 + 50, 200]
].forEach((_, i, arr) => {
  if (i < arr.length - 1) {
    const [x1, y1] = arr[i], [x2, y2] = arr[i + 1];
    drawables.push(gen.line(x1, y1, x2, y2, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.8 }));
  }
});

// 卡片2 图标：术语多路分叉
const tCx = 430 + 170, tCy = 180;
drawables.push(gen.circle(tCx - 60, tCy, 14, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.6, fill: '#5a4a3a', fillStyle: 'solid' }));
[[-30, 30], [0, 40], [30, 30]].forEach(([dx, dy]) => {
  drawables.push(gen.line(tCx - 50, tCy, tCx + dx, tCy + dy, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5 }));
  drawables.push(gen.circle(tCx + dx + 8, tCy + dy + 4, 12, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.6, fill: '#fdf6e3', fillStyle: 'solid' }));
});

// 卡片3 图标：长卷轴后半段褪色
const sCx = 790 + 170, sCy = 180;
drawables.push(gen.rectangle(sCx - 70, sCy - 18, 140, 36, {
  stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.6, fill: '#fdf6e3', fillStyle: 'solid'
}));
drawables.push(gen.line(sCx - 55, sCy - 8, sCx + 55, sCy - 8, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5 }));
drawables.push(gen.line(sCx - 55, sCy + 2, sCx + 20, sCy + 2, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.5 }));
drawables.push(gen.line(sCx - 55, sCy + 12, sCx - 10, sCy + 12, { stroke: '#5a4a3a', strokeWidth: 1.2, roughness: 1.5 }));

// 序号圆圈
cards.forEach((c, i) => {
  drawables.push(gen.circle(c.x + 32, cardY + 32, 34, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6,
    fill: '#6c63ff', fillStyle: 'solid'
  }));
});

const FONT = "'Caveat','Snell Roundhand','Comic Sans MS','楷体','KaiTi','STKaiti',cursive";
const texts = [];
cards.forEach((c, i) => {
  const cx = c.x + cardW / 2;
  texts.push(`<text x="${c.x + 32}" y="${cardY + 40}" font-family="${FONT}" font-size="20" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`);
  texts.push(`<text x="${cx}" y="${cardY + 165}" font-family="${FONT}" font-size="30" fill="#3a2a1a" text-anchor="middle" font-weight="700">${c.title}</text>`);
  texts.push(`<text x="${cx}" y="${cardY + 205}" font-family="${FONT}" font-size="22" fill="#6c63ff" text-anchor="middle" font-weight="600">${c.sub}</text>`);
  texts.push(`<text x="${cx}" y="${cardY + 250}" font-family="${FONT}" font-size="20" fill="#5a4a3a" text-anchor="middle">${c.desc}</text>`);
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
<text x="${W / 2}" y="60" font-family="${FONT}" font-size="36" fill="#3a2a1a" text-anchor="middle" font-weight="700">机器翻译的三大痛点</text>
<text x="${W / 2}" y="92" font-family="${FONT}" font-size="20" fill="#5a4a3a" text-anchor="middle">baoyu-translate 要解决的问题</text>
${pathEls}
${texts.join('\n')}
</svg>`;

fs.writeFileSync(process.argv[2] || 'out.svg', svg);
console.log('✓ 生成', process.argv[2] || 'out.svg');
