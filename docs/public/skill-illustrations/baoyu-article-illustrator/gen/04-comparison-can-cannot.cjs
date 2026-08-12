// gen 04 — 能力边界：能做 vs 不能做（comparison，左右对立）
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

const W = 1200, H = 460;
const drawables = [];
const texts = [];
const INK = '#5a4a3a', TXT = '#3a2a1a', SUB = '#7a6a5a';
const GREEN = '#2a8a5a', RED = '#c0392b';

texts.push({ x: W / 2, y: 54, s: '能力边界：能做 vs 不能做', size: 32, fill: TXT, weight: 700 });

const PW = 500, PH = 320, PY = 90;
const leftX = 60, rightX = 640;
drawables.push(gen.rectangle(leftX, PY, PW, PH, {
  stroke: INK, strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
  fill: '#eafff0', fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
}));
drawables.push(gen.rectangle(rightX, PY, PW, PH, {
  stroke: INK, strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
  fill: '#ffeef5', fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
}));
// 中间虚线分隔（用多段短线模拟 dashed）
for (let y = 110; y < 400; y += 18) {
  drawables.push(gen.line(600, y, 600, y + 10, { stroke: INK, strokeWidth: 1.6, roughness: 1.3 }));
}

texts.push({ x: leftX + PW / 2, y: 138, s: '✓ 能做', size: 30, fill: GREEN, weight: 700 });
texts.push({ x: rightX + PW / 2, y: 138, s: '✗ 不能做', size: 30, fill: RED, weight: 700 });
drawables.push(gen.line(leftX + 60, 152, leftX + PW - 60, 152, { stroke: GREEN, strokeWidth: 2, roughness: 1.4 }));
drawables.push(gen.line(rightX + 60, 152, rightX + PW - 60, 152, { stroke: RED, strokeWidth: 2, roughness: 1.4 }));

const leftItems = [
  '自动定位配图点，三维批量出图',
  '预设快捷 / 单维度覆盖 / 参考图',
  '图片引用自动插回原文段落',
  '跨运行时自动选用原生出图后端',
];
leftItems.forEach((s, i) => {
  const y = 192 + i * 55;
  texts.push({ x: leftX + 30, y, s: '✓', size: 22, fill: GREEN, weight: 700, anchor: 'start' });
  texts.push({ x: leftX + 62, y, s, size: 17, fill: TXT, anchor: 'start' });
});

const rightItems = [
  { s: '不用 SVG/HTML/canvas 替代位图', hard: true },
  { s: '不在位图上代码涂改 / 覆盖文字', hard: true },
  { s: '不在 prompt 落盘前出图', hard: false },
  { s: '不跳过确认（除非你明说）', hard: false },
];
rightItems.forEach((it, i) => {
  const y = 192 + i * 55;
  texts.push({ x: rightX + 30, y, s: '✗', size: 22, fill: RED, weight: 700, anchor: 'start' });
  texts.push({ x: rightX + 62, y, s: it.s, size: 17, fill: it.hard ? RED : TXT, weight: it.hard ? 700 : 400, anchor: 'start' });
  if (it.hard) {
    const tagX = rightX + 62 + it.s.length * 16 + 14;
    drawables.push(gen.rectangle(tagX, y - 16, 60, 22, {
      stroke: RED, strokeWidth: 1.6, roughness: 1.3, fill: '#ffe9d6', fillStyle: 'hachure', fillWeight: 1, hachureGap: 5, hachureAngle: 45
    }));
    texts.push({ x: tagX + 30, y, s: '硬规则', size: 14, fill: RED, weight: 700 });
  }
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
fs.writeFileSync(process.argv[2] || '04-comparison-can-cannot.svg', svg, 'utf8');
