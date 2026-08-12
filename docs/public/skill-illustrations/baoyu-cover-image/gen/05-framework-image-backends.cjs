// 05-framework-image-backends.cjs
// skill（分析+组装prompt）→ 多个位图后端 的架构关系图
// 输出: 05-framework-image-backends.svg
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

// 左侧 skill 框（焦点色）
const skillX = 70, skillY = 180, skillW = 280, skillH = 160;
drawables.push(gen.rectangle(skillX, skillY, skillW, skillH, {
  stroke: '#5a4a3a', strokeWidth: 2.6, roughness: 1.6, bowing: 1.2,
  fill: '#6c63ff', fillStyle: 'hachure', fillWeight: 1.3, hachureGap: 6, hachureAngle: 45,
}));

// 右侧 5 个后端框（纵向排列）
const backends = [
  { name: 'Codex imagegen', sub: 'Codex 运行时', fill: '#eef6ff' },
  { name: 'Cursor GenerateImage', sub: 'Cursor 运行时', fill: '#eafff0' },
  { name: '运行时原生图像工具', sub: '其他运行时', fill: '#fff8e7' },
  { name: 'baoyu-image-gen', sub: '已装的非原生后端', fill: '#ffeef5' },
  { name: 'codex CLI', sub: '需先 codex login', fill: '#ffe9d6' },
];

const beX = 720, beW = 420, beH = 56, beGap = 14;
const beStartY = 90;
backends.forEach((b, i) => {
  const y = beStartY + i * (beH + beGap);
  drawables.push(gen.rectangle(beX, y, beW, beH, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5, bowing: 1.1,
    fill: b.fill, fillStyle: 'hachure', fillWeight: 1, hachureGap: 7, hachureAngle: 45,
  }));
});

// 连接线：skill 中心 → 每个后端框中心（折线）
backends.forEach((b, i) => {
  const cy = beStartY + i * (beH + beGap) + beH / 2;
  const midX = (skillX + skillW + beX) / 2;
  drawables.push(gen.line(skillX + skillW, skillY + skillH / 2, midX, skillY + skillH / 2, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
  drawables.push(gen.line(midX, skillY + skillH / 2, midX, cy, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
  drawables.push(gen.line(midX, cy, beX - 4, cy, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
  drawables.push(gen.line(beX - 4, cy, beX - 14, cy - 6, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
  drawables.push(gen.line(beX - 4, cy, beX - 14, cy + 6, { stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.3 }));
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

const title = `<text x="${W / 2}" y="56" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="28" fill="#3a2a1a" text-anchor="middle" font-weight="700">skill 只分析 + 组装 prompt · 真正画图靠后端</text>`;

const skillText = `<text x="${skillX + skillW / 2}" y="${skillY + 48}" font-family="'Caveat','Snell Roundhand',cursive" font-size="24" fill="#fff" text-anchor="middle" font-weight="700">baoyu-cover-image</text><text x="${skillX + skillW / 2}" y="${skillY + 80}" font-family="'Caveat',cursive" font-size="20" fill="#fff" text-anchor="middle" font-weight="600">skill</text><text x="${skillX + skillW / 2}" y="${skillY + 116}" font-family="'Caveat',cursive" font-size="16" fill="#fff" text-anchor="middle" font-weight="500">分析内容</text><text x="${skillX + skillW / 2}" y="${skillY + 140}" font-family="'Caveat',cursive" font-size="16" fill="#fff" text-anchor="middle" font-weight="500">组装 prompt</text>`;

const beTexts = backends.map((b, i) => {
  const y = beStartY + i * (beH + beGap) + beH / 2;
  return `<text x="${beX + 24}" y="${y - 4}" font-family="'Caveat','Snell Roundhand',cursive" font-size="22" fill="#3a2a1a" text-anchor="start" font-weight="700">${b.name}</text><text x="${beX + 24}" y="${y + 18}" font-family="'Caveat',cursive" font-size="15" fill="#5a4a3a" text-anchor="start" font-weight="500">${b.sub}</text>`;
}).join('\n');

const note = `<text x="${beX + beW / 2}" y="${beStartY - 18}" font-family="'Caveat',cursive" font-size="20" fill="#06a378" text-anchor="middle" font-weight="700">▼ 位图图像生成后端</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${skillText}
${beTexts}
${note}
</svg>`;

fs.writeFileSync(process.argv[2] || '05-framework-image-backends.svg', svg);
console.log('✓ 生成', process.argv[2] || '05-framework-image-backends.svg');
