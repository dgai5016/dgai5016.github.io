// 03-flowchart-normal-mode.cjs
// normal 模式标准翻译流程：抓取源文 → 物化+建目录 → 分析全文 → 组装+翻译 → translation.md
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

const W = 1200, H = 400;
const FONT = "'Caveat','Snell Roundhand','Comic Sans MS','楷体','KaiTi','STKaiti',cursive";
const drawables = [];

const steps = [
  { name: '抓取源文',     fill: '#eef6ff', desc: 'URL / 文件 / 内联文本' },
  { name: '物化 + 建目录', fill: '#fff8e7', desc: '不覆盖 · 自动备份' },
  { name: '分析全文',     fill: '#f3efff', desc: '领域 / 语气 / 术语 / 难点', focus: true },
  { name: '组装 + 翻译',  fill: '#eafff0', desc: '组装翻译指令并翻译' },
  { name: 'translation.md', fill: '#ffe9d6', desc: '最终译文输出' }
];
const boxW = 180, boxH = 140, gap = 30;
const startX = (W - (5 * boxW + 4 * gap)) / 2;
const boxY = 180;

steps.forEach((s, i) => {
  const x = startX + i * (boxW + gap);
  s.x = x;
  drawables.push(gen.rectangle(x, boxY, boxW, boxH, {
    stroke: '#5a4a3a', strokeWidth: s.focus ? 3 : 2.2, roughness: 1.6, bowing: 1.2,
    fill: s.fill, fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
  }));
  drawables.push(gen.circle(x + boxW / 2, boxY + 38, 50, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5,
    fill: s.focus ? '#6c63ff' : '#fdf6e3', fillStyle: 'solid'
  }));
  drawables.push(gen.circle(x + 24, boxY + 24, 30, {
    stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.5,
    fill: s.focus ? '#06d6a0' : '#5a4a3a', fillStyle: 'solid'
  }));
});

for (let i = 0; i < 4; i++) {
  const x1 = startX + i * (boxW + gap) + boxW + 4;
  const x2 = startX + (i + 1) * (boxW + gap) - 4;
  const ay = boxY + boxH / 2;
  drawables.push(gen.line(x1, ay, x2, ay, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay - 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay + 8, { stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.4 }));
}

// 图标
// step0: URL（两椭圆相交）
{
  const cx = steps[0].x + boxW / 2, cy = boxY + 38;
  drawables.push(gen.ellipse(cx - 8, cy - 5, 16, 14, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
  drawables.push(gen.ellipse(cx + 8, cy + 5, 16, 14, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
}
// step1: 文件夹
{
  const cx = steps[1].x + boxW / 2, cy = boxY + 38;
  drawables.push(gen.rectangle(cx - 16, cy - 10, 32, 22, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
  drawables.push(gen.line(cx - 16, cy - 4, cx + 16, cy - 4, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.4 }));
}
// step2: 放大镜（焦点，白线）
{
  const cx = steps[2].x + boxW / 2, cy = boxY + 38;
  drawables.push(gen.circle(cx - 4, cy - 4, 20, { stroke: '#fff', strokeWidth: 2.4, roughness: 1.4, fill: 'none' }));
  drawables.push(gen.line(cx + 6, cy + 6, cx + 14, cy + 14, { stroke: '#fff', strokeWidth: 2.4, roughness: 1.4 }));
}
// step3: 齿轮
{
  const cx = steps[3].x + boxW / 2, cy = boxY + 38;
  drawables.push(gen.circle(cx, cy, 22, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
  drawables.push(gen.circle(cx, cy, 10, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
  for (let a = 0; a < 8; a++) {
    const ang = (a / 8) * Math.PI * 2;
    drawables.push(gen.line(cx + Math.cos(ang) * 12, cy + Math.sin(ang) * 12, cx + Math.cos(ang) * 16, cy + Math.sin(ang) * 16, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.3 }));
  }
}
// step4: 文档
{
  const cx = steps[4].x + boxW / 2, cy = boxY + 38;
  drawables.push(gen.rectangle(cx - 14, cy - 14, 28, 30, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.4, fill: 'none' }));
  drawables.push(gen.line(cx - 8, cy - 4, cx + 8, cy - 4, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.3 }));
  drawables.push(gen.line(cx - 8, cy + 4, cx + 8, cy + 4, { stroke: '#5a4a3a', strokeWidth: 1.6, roughness: 1.3 }));
}

const texts = [];
steps.forEach((s, i) => {
  const cx = s.x + boxW / 2;
  texts.push(`<text x="${cx - boxW / 2 + 24}" y="${boxY + 24 + 6}" font-family="${FONT}" font-size="16" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`);
  texts.push(`<text x="${cx}" y="${boxY + 88}" font-family="${FONT}" font-size="22" fill="#3a2a1a" text-anchor="middle" font-weight="700">${s.name}</text>`);
  texts.push(`<text x="${cx}" y="${boxY + 118}" font-family="${FONT}" font-size="16" fill="#5a4a3a" text-anchor="middle">${s.desc}</text>`);
});
{
  const cx = steps[2].x + boxW / 2;
  texts.push(`<text x="${cx}" y="${boxY - 18}" font-family="${FONT}" font-size="18" fill="#6c63ff" text-anchor="middle" font-weight="700">▲ normal 的核心</text>`);
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

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
<rect width="${W}" height="${H}" rx="14" fill="#fdf6e3"/>
<text x="${W / 2}" y="58" font-family="${FONT}" font-size="34" fill="#3a2a1a" text-anchor="middle" font-weight="700">normal 模式 · 标准翻译流程</text>
<text x="${W / 2}" y="90" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">默认模式 · 先分析全文再据此翻译</text>
${pathEls}
${texts.join('\n')}
</svg>`;

fs.writeFileSync(process.argv[2] || 'out.svg', svg);
console.log('✓ 生成', process.argv[2] || 'out.svg');
