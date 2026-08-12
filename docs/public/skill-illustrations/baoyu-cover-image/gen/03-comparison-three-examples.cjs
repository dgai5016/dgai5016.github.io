// 03-comparison-three-examples.cjs
// 三列对比：最省事 / 预设+比例 / 边界（无后端）
// 输出: 03-comparison-three-examples.svg
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

const cols = [
  {
    title: '示例一 · 最省事', fill: '#eef6ff',
    trigger: '"给这篇文章生成封面图"',
    action: '什么都不指定',
    result: 'skill 自动选 5 维度',
    note: '确认环节点头即可',
  },
  {
    title: '示例二 · 预设 + 比例', fill: '#eafff0',
    trigger: '--style watercolor --aspect 3:4',
    action: '水彩配色 + 竖图比例',
    result: '锁定 earth + painterly',
    note: '其余维度仍自动选',
  },
  {
    title: '示例三 · 边界', fill: '#ffeef5',
    trigger: '无任何图像后端',
    action: '想让它用 SVG 凑合',
    result: '停下询问，拒绝画',
    note: '不会用代码代替位图',
  },
];

const colW = 340, colH = 300, gap = 40;
const startX = (W - (3 * colW + 2 * gap)) / 2;
const startY = 110;

cols.forEach((c, i) => {
  const x = startX + i * (colW + gap);
  drawables.push(gen.rectangle(x, startY, colW, colH, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
    fill: c.fill, fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 7, hachureAngle: 45,
  }));
  drawables.push(gen.circle(x + colW / 2, startY - 26, 44, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.6,
    fill: i === 2 ? '#ff8a5b' : '#6c63ff', fillStyle: 'solid',
  }));
});

// 中间两条虚线分隔
for (let i = 0; i < 2; i++) {
  const x = startX + (i + 1) * colW + i * gap + gap / 2;
  for (let y = startY + 20; y < startY + colH - 20; y += 22) {
    drawables.push(gen.line(x, y, x, y + 12, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.2 }));
  }
}

const allPaths = [];
drawables.forEach(d => { const ps = gen.toPaths(d); if (ps) ps.forEach(p => allPaths.push(p)); });
const pathEls = allPaths.map(p => {
  const a = [`d="${p.d}"`];
  if (p.stroke) a.push(`stroke="${p.stroke}"`);
  if (p.strokeWidth) a.push(`stroke-width="${p.strokeWidth}"`);
  a.push(`fill="${p.fill || 'none'}"`);
  return `<path ${a.join(' ')} />`;
}).join('\n');

const title = `<text x="${W / 2}" y="56" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="32" fill="#3a2a1a" text-anchor="middle" font-weight="700">三种典型用法 · 并排对比</text>`;

const colTexts = cols.map((c, i) => {
  const x = startX + i * (colW + gap) + colW / 2;
  const num = `<text x="${x}" y="${startY - 18}" font-family="'Caveat',cursive" font-size="24" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`;
  const t = `<text x="${x}" y="${startY + 42}" font-family="'Caveat','Snell Roundhand',cursive" font-size="23" fill="#3a2a1a" text-anchor="middle" font-weight="700">${c.title}</text>`;
  const trig = `<text x="${x}" y="${startY + 92}" font-family="'Caveat',cursive" font-size="18" fill="#5a4a3a" text-anchor="middle" font-weight="600">触发</text><text x="${x}" y="${startY + 118}" font-family="'Caveat',cursive" font-size="17" fill="#3a2a1a" text-anchor="middle" font-weight="600">${c.trigger}</text>`;
  const act = `<text x="${x}" y="${startY + 162}" font-family="'Caveat',cursive" font-size="18" fill="#5a4a3a" text-anchor="middle" font-weight="600">行为</text><text x="${x}" y="${startY + 188}" font-family="'Caveat',cursive" font-size="17" fill="#3a2a1a" text-anchor="middle" font-weight="600">${c.action}</text>`;
  const res = `<text x="${x}" y="${startY + 232}" font-family="'Caveat',cursive" font-size="18" fill="#5a4a3a" text-anchor="middle" font-weight="600">结果</text><text x="${x}" y="${startY + 258}" font-family="'Caveat',cursive" font-size="17" fill="${i === 2 ? '#a33a2a' : '#3a2a1a'}" text-anchor="middle" font-weight="700">${c.result}</text>`;
  const note = `<text x="${x}" y="${startY + 288}" font-family="'Caveat',cursive" font-size="15" fill="#6c63ff" text-anchor="middle" font-weight="600">${c.note}</text>`;
  return num + t + trig + act + res + note;
}).join('\n');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${colTexts}
</svg>`;

fs.writeFileSync(process.argv[2] || '03-comparison-three-examples.svg', svg);
console.log('✓ 生成', process.argv[2] || '03-comparison-three-examples.svg');
