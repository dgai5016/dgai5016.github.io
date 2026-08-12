// 05-flowchart-internal-workflow.cjs
// 内部工作流 5 步骤纵向总览
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

const W = 1200, H = 640;
const FONT = "'Caveat','Snell Roundhand','Comic Sans MS','楷体','KaiTi','STKaiti',cursive";
const drawables = [];

const steps = [
  { name: '加载偏好',           desc: '读 EXTEND.md · 合并内置 + 自定义术语表',       fill: '#eef6ff' },
  { name: '物化源 + 建目录',    desc: '文件直接用 · 内联/URL 存为 md · 自动备份不覆盖', fill: '#fff8e7' },
  { name: '评估长度',           desc: '> 4000 词 → 抽术语 · 切块 · 并行翻译再合并',   fill: '#ffeef5' },
  { name: '按模式翻译',         desc: 'quick 直译 · normal 先分析 · refined 五阶段',  fill: '#f3efff', focus: true },
  { name: '收尾',               desc: '写入 translation.md · 图片语言检查并提醒',     fill: '#eafff0' }
];
const boxW = 760, boxH = 80, gap = 18;
const startX = (W - boxW) / 2;
const startY = 140;

steps.forEach((s, i) => {
  const y = startY + i * (boxH + gap);
  s.y = y;
  drawables.push(gen.rectangle(startX, y, boxW, boxH, {
    stroke: '#5a4a3a', strokeWidth: s.focus ? 3 : 2.2, roughness: 1.6, bowing: 1.1,
    fill: s.fill, fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 7, hachureAngle: 45
  }));
  drawables.push(gen.circle(startX + 50, y + boxH / 2, 56, {
    stroke: '#5a4a3a', strokeWidth: 2.2, roughness: 1.5,
    fill: s.focus ? '#6c63ff' : '#5a4a3a', fillStyle: 'solid'
  }));
});

for (let i = 0; i < 4; i++) {
  const y1 = startY + i * (boxH + gap) + boxH;
  const y2 = startY + (i + 1) * (boxH + gap);
  const cx = startX + 50;
  drawables.push(gen.line(cx, y1 + 1, cx, y2 - 1, { stroke: '#5a4a3a', strokeWidth: 2, roughness: 1.3 }));
}

// 第 4 步右侧三模式小标签
{
  const fx = startX + boxW - 20;
  const fy = steps[3].y + boxH / 2;
  const tagW = 70, tagH = 30;
  const modes = [
    { fill: '#fdf6e3', dx: -240 },
    { fill: '#f3efff', dx: -150 },
    { fill: '#fdf6e3', dx: -60 }
  ];
  modes.forEach(m => {
    drawables.push(gen.rectangle(fx + m.dx, fy - tagH / 2, tagW, tagH, {
      stroke: '#5a4a3a', strokeWidth: 1.8, roughness: 1.4, bowing: 1,
      fill: m.fill, fillStyle: 'solid'
    }));
  });
}

const texts = [];
steps.forEach((s, i) => {
  const y = s.y;
  texts.push(`<text x="${startX + 50}" y="${y + boxH / 2 + 11}" font-family="${FONT}" font-size="32" fill="#fff" text-anchor="middle" font-weight="700">${i + 1}</text>`);
  texts.push(`<text x="${startX + 100}" y="${y + 35}" font-family="${FONT}" font-size="26" fill="#3a2a1a" text-anchor="start" font-weight="700">${s.name}</text>`);
  texts.push(`<text x="${startX + 100}" y="${y + 62}" font-family="${FONT}" font-size="17" fill="#5a4a3a" text-anchor="start">${s.desc}</text>`);
});
{
  const fx = startX + boxW - 20;
  const fy = steps[3].y + boxH / 2;
  const modes = [
    { name: 'quick',   dx: -240 },
    { name: 'normal',  dx: -150 },
    { name: 'refined', dx: -60 }
  ];
  modes.forEach(m => {
    texts.push(`<text x="${fx + m.dx + 35}" y="${fy + 6}" font-family="${FONT}" font-size="15" fill="#3a2a1a" text-anchor="middle" font-weight="600">${m.name}</text>`);
  });
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
<text x="${W / 2}" y="58" font-family="${FONT}" font-size="34" fill="#3a2a1a" text-anchor="middle" font-weight="700">内部工作流 · 5 步骤总览</text>
<text x="${W / 2}" y="90" font-family="${FONT}" font-size="18" fill="#5a4a3a" text-anchor="middle">从加载偏好到产出 translation.md 的完整链路</text>
${pathEls}
${texts.join('\n')}
</svg>`;

fs.writeFileSync(process.argv[2] || 'out.svg', svg);
console.log('✓ 生成', process.argv[2] || 'out.svg');
