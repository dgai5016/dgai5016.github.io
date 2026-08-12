// gen 03 — 内部工作流：6 个步骤（flowchart，高亮第 3 步硬门槛）
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

const W = 1200, H = 400;
const drawables = [];
const texts = [];
const INK = '#5a4a3a', TXT = '#3a2a1a', SUB = '#7a6a5a', FOCAL = '#6c63ff', RED = '#e76f51';

texts.push({ x: W / 2, y: 56, s: '内部工作流：6 个步骤', size: 34, fill: TXT, weight: 700 });
texts.push({ x: W / 2, y: 88, s: '第 3 步「确认设置」是硬门槛——没确认不往下走', size: 17, fill: SUB });

const steps = ['前置检查', '分析文章', '确认设置', '生成大纲', '生成图片', '收尾插回'];
const fills = ['#eef6ff', '#fff8e7', '#ddd1f5', '#eafff0', '#ffe9d6', '#ffeef5'];
const BW = 160, BH = 110, BY = 180;
const startX = (W - (6 * BW + 5 * 30)) / 2;
const ay = BY + BH / 2;

steps.forEach((label, i) => {
  const x = startX + i * (BW + 30);
  const isGate = i === 2;
  drawables.push(gen.rectangle(x, BY, BW, BH, {
    stroke: isGate ? FOCAL : INK, strokeWidth: isGate ? 3.2 : 2.2, roughness: 1.6, bowing: 1.2,
    fill: fills[i], fillStyle: 'hachure', fillWeight: 1.2, hachureGap: 6, hachureAngle: 45
  }));
  const cx = x + BW / 2, cy = BY - 28;
  drawables.push(gen.circle(cx, cy, isGate ? 44 : 38, { stroke: FOCAL, strokeWidth: 2, roughness: 1.5, fill: FOCAL, fillStyle: 'solid' }));
  texts.push({ x: cx, y: cy + 7, s: String(i + 1), size: isGate ? 22 : 20, fill: '#ffffff', weight: 700 });
  texts.push({ x: cx, y: BY + BH / 2 + 8, s: label, size: 22, fill: TXT, weight: isGate ? 700 : 600 });
  if (isGate) {
    drawables.push(gen.rectangle(cx - 34, BY + BH + 22, 68, 30, {
      stroke: RED, strokeWidth: 2, roughness: 1.4, fill: '#ffe9d6', fillStyle: 'hachure', fillWeight: 1.1, hachureGap: 5, hachureAngle: 45
    }));
    texts.push({ x: cx, y: BY + BH + 43, s: '硬门槛', size: 17, fill: RED, weight: 700 });
  }
});

for (let i = 0; i < 5; i++) {
  const x1 = startX + i * (BW + 30) + BW + 4;
  const x2 = startX + (i + 1) * (BW + 30) - 4;
  drawables.push(gen.line(x1, ay, x2, ay, { stroke: INK, strokeWidth: 2, roughness: 1.5 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay - 7, { stroke: INK, strokeWidth: 2, roughness: 1.5 }));
  drawables.push(gen.line(x2, ay, x2 - 12, ay + 7, { stroke: INK, strokeWidth: 2, roughness: 1.5 }));
}

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
fs.writeFileSync(process.argv[2] || '03-flowchart-workflow.svg', svg, 'utf8');
