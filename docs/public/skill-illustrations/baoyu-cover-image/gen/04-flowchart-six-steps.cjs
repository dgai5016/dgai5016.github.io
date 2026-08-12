// 04-flowchart-six-steps.cjs
// 横向 6 步内部工作流：加载偏好 → 分析内容 → 确认选项 → 写 prompt → 生成图片 → 完成报告
// 输出: 04-flowchart-six-steps.svg
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

const steps = [
  { label: '加载偏好', sub: '首次必经 · 阻塞', fill: '#fff8e7' },
  { label: '分析内容', sub: '主题 / 语气 / 语言', fill: '#eef6ff' },
  { label: '确认选项', sub: '5 维度 + 字体', fill: '#eafff0' },
  { label: '写 prompt', sub: '存为可复现文件', fill: '#ffeef5' },
  { label: '生成图片', sub: '调用图像后端', fill: '#ffe9d6', focus: true },
  { label: '完成报告', sub: '汇报各维度取值', fill: '#f3efff' },
];

const boxW = 160, boxH = 130, gap = 30;
const startX = (W - (6 * boxW + 5 * gap)) / 2;
const y = 200;

steps.forEach((s, i) => {
  const x = startX + i * (boxW + gap);
  drawables.push(gen.rectangle(x, y, boxW, boxH, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.6, bowing: 1.2,
    fill: s.fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45,
  }));
  drawables.push(gen.circle(x + boxW / 2, y - 24, 38, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.6,
    fill: s.focus ? '#06d6a0' : '#6c63ff', fillStyle: 'solid',
  }));
});

for (let i = 0; i < 5; i++) {
  const x1 = startX + i * (boxW + gap) + boxW + 4;
  const x2 = startX + (i + 1) * (boxW + gap) - 4;
  const ay = y + boxH / 2;
  drawables.push(gen.line(x1, ay, x2, ay, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay - 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay + 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
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

const title = `<text x="${W / 2}" y="58" font-family="'Caveat','Snell Roundhand','Comic Sans MS',cursive" font-size="32" fill="#3a2a1a" text-anchor="middle" font-weight="700">内部工作流 · 6 个步骤</text>`;

const stepTexts = steps.map((s, i) => {
  const cx = startX + i * (boxW + gap) + boxW / 2;
  const num = `<text x="${cx}" y="${y - 16}" font-family="'Caveat',cursive" font-size="22" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`;
  const label = `<text x="${cx}" y="${y + boxH / 2 + 2}" font-family="'Caveat','Snell Roundhand',cursive" font-size="22" fill="#3a2a1a" text-anchor="middle" font-weight="700">${s.label}</text>`;
  const sub = `<text x="${cx}" y="${y + boxH / 2 + 32}" font-family="'Caveat',cursive" font-size="15" fill="#5a4a3a" text-anchor="middle" font-weight="500">${s.sub}</text>`;
  return num + label + sub;
}).join('\n');

const focusMark = `<text x="${startX + 4 * (boxW + gap) + boxW / 2}" y="${y + boxH + 48}" font-family="'Caveat',cursive" font-size="17" fill="#06a378" text-anchor="middle" font-weight="700">▲ 真正出图</text>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
${title}
${pathEls}
${stepTexts}
${focusMark}
</svg>`;

fs.writeFileSync(process.argv[2] || '04-flowchart-six-steps.svg', svg);
console.log('✓ 生成', process.argv[2] || '04-flowchart-six-steps.svg');
