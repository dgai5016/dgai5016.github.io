// 02-infographic-preset-math.cjs
// 11 配色 × 7 渲染 → 26 预设的组合关系图
// 输出: 02-infographic-preset-math.svg
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

// 11 套配色（小圆）—— 左上区块
const paletteColors = ['#fff8e7', '#eef6ff', '#eafff0', '#ffeef5', '#ffe9d6', '#f3efff', '#ffd6d6', '#d6f0ff', '#fff0d6', '#e8d6ff', '#d6ffd6'];
const palX0 = 70, palY0 = 170, palR = 18, palGap = 46;
const palCols = 4;
drawables.push(gen.rectangle(40, 130, 280, 250, {
  stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5, bowing: 1.1,
  fill: '#fffbf0', fillStyle: 'hachure', fillWeight: 1, hachureGap: 7, hachureAngle: 45,
}));
paletteColors.forEach((c, i) => {
  const col = i % palCols, row = Math.floor(i / palCols);
  const x = palX0 + col * palGap;
  const y = palY0 + row * palGap;
  drawables.push(gen.circle(x, y, palR * 2, {
    stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.6,
    fill: c, fillStyle: 'solid',
  }));
});

// 7 种渲染（小方框）—— 右上区块（放右上避免和配色框挤）
const renderLabels = ['flat', 'hand-drawn', 'painterly', 'digital', 'pixel', 'chalk', 'screen-print'];
const renX0 = 410, renY0 = 160, renW = 150, renH = 36, renGapV = 24;
drawables.push(gen.rectangle(380, 130, 220, 270, {
  stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5, bowing: 1.1,
  fill: '#f3efff', fillStyle: 'hachure', fillWeight: 1, hachureGap: 7, hachureAngle: 45,
}));

// 中间合并符号（大箭头 →）
const arrowX1 = 620, arrowX2 = 760, arrowY = 265;
drawables.push(gen.line(arrowX1, arrowY, arrowX2, arrowY, { stroke: '#5a4a3a', strokeWidth: 3, roughness: 1.4 }));
drawables.push(gen.line(arrowX2, arrowY, arrowX2 - 22, arrowY - 14, { stroke: '#5a4a3a', strokeWidth: 3, roughness: 1.4 }));
drawables.push(gen.line(arrowX2, arrowY, arrowX2 - 22, arrowY + 14, { stroke: '#5a4a3a', strokeWidth: 3, roughness: 1.4 }));
// 加号（配色 + 渲染）
drawables.push(gen.line(670, 200, 710, 200, { stroke: '#6c63ff', strokeWidth: 3, roughness: 1.3 }));
drawables.push(gen.line(690, 180, 690, 220, { stroke: '#6c63ff', strokeWidth: 3, roughness: 1.3 }));

// 右侧大圆「26 个预设」
const bigCx = 970, bigCy = 265, bigR = 130;
drawables.push(gen.circle(bigCx, bigCy, bigR * 2, {
  stroke: '#5a4a3a', strokeWidth: 2.6, roughness: 1.7, bowing: 1.2,
  fill: '#6c63ff', fillStyle: 'hachure', fillWeight: 1.3, hachureGap: 6, hachureAngle: 45,
}));
// 大圆周围几个预设名小标签框
const presetChips = [
  { name: 'elegant', x: 820, y: 140 },
  { name: 'blueprint', x: 1110, y: 180 },
  { name: 'chalkboard', x: 1110, y: 360 },
  { name: 'pixel-art', x: 820, y: 390 },
];
presetChips.forEach(chip => {
  drawables.push(gen.rectangle(chip.x - 58, chip.y - 18, 116, 36, {
    stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.5,
    fill: '#fff8e7', fillStyle: 'solid',
  }));
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

const title = `<text x="${W / 2}" y="58" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="32" fill="#3a2a1a" text-anchor="middle" font-weight="700">11 配色 × 7 渲染 = 26 个预设</text>`;
const palTitle = `<text x="180" y="158" font-family="'Caveat',cursive" font-size="22" fill="#3a2a1a" text-anchor="middle" font-weight="700">11 套配色</text>`;
const renTitle = `<text x="490" y="158" font-family="'Caveat',cursive" font-size="22" fill="#3a2a1a" text-anchor="middle" font-weight="700">7 种渲染</text>`;

const renTexts = renderLabels.map((label, i) => {
  const y = renY0 + i * (renH + renGapV) + renH / 2 + 6;
  return `<text x="${renX0 + 75}" y="${y}" font-family="'Caveat',cursive" font-size="17" fill="#3a2a1a" text-anchor="middle" font-weight="600">${label}</text>`;
}).join('\n');

const chipTexts = presetChips.map(c => `<text x="${c.x}" y="${c.y + 6}" font-family="'Caveat',cursive" font-size="17" fill="#3a2a1a" text-anchor="middle" font-weight="700">${c.name}</text>`).join('\n');

const bigText = `<text x="${bigCx}" y="${bigCy - 14}" font-family="'Caveat','Snell Roundhand',cursive" font-size="64" fill="#fff" text-anchor="middle" font-weight="700">26</text><text x="${bigCx}" y="${bigCy + 26}" font-family="'Caveat',cursive" font-size="26" fill="#fff" text-anchor="middle" font-weight="700">个预设</text><text x="${bigCx}" y="${bigCy + 56}" font-family="'Caveat',cursive" font-size="16" fill="#fff" text-anchor="middle" font-weight="500">一键定型</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${palTitle}
${renTitle}
${renTexts}
${chipTexts}
${bigText}
</svg>`;

fs.writeFileSync(process.argv[2] || '02-infographic-preset-math.svg', svg);
console.log('✓ 生成', process.argv[2] || '02-infographic-preset-math.svg');
