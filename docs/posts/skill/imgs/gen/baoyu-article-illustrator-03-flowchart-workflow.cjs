// baoyu-article-illustrator-03-flowchart-workflow.cjs
// 类型：flowchart（流程）— baoyu-article-illustrator 内部 6 步工作流（第 3 步「确认设置」为硬门槛）
// 画法：横向 6 个节点（H.node）+ H.arrow 连接 + 节点上方序号圆；
//       第 3 步用 accent 强调色 + 上方挂「硬门槛」徽章（warm 警示色），其余依次取 fills。
// robust require svg-helpers：先试相对，再按 skill 目录候选位置找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); }
catch {
  const p = require('path'), os = require('os'), fs0 = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',
    p.join(home, '.claude/skills/dg-article-illustrator-svg'),
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs0.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

const P = H.palette('tech');
const W = 1200, Hh = 460;

// 6 步（来自正文「内部工作流概览」，第 3 步 = 硬门槛）
const steps = ['前置检查', '分析文章', '确认设置', '生成大纲', '生成图片', '收尾插回'];
const GATE = 2;                            // 第 3 步（下标 2）= 硬门槛
const GATE_BADGE = '#f59e0b';              // 警示琥珀色（强调硬门槛，tech 调色板外单点借用）

const boxW = 160, boxH = 100, gap = 28;
const startX = (W - (6 * boxW + 5 * gap)) / 2;   // 整体居中
const y = 250;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('内部 6 步工作流', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('第 3 步「确认设置」为硬门槛 — 不确认不走下一步', W / 2, 116, { size: 16, fill: '#ffffff', opacity: 0.6 }));

steps.forEach((label, i) => {
  const x = startX + i * (boxW + gap);
  const isGate = i === GATE;
  // 节点：硬门槛步用 accent 突出，其余依次取 fills
  const n = H.node(x, y, boxW, boxH, label, {
    fill: isGate ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 19, weight: 600,
  });
  parts.push(n.svg);
  // 节点上方的小序号圆
  parts.push(H.circle(x + boxW / 2, y - 30, 20, { fill: isGate ? GATE_BADGE : P.fills[i % P.fills.length], filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 30, { size: 20, fill: '#ffffff', weight: 700 }));
  // 硬门槛步：额外挂一个「硬门槛」徽章（节点下方）
  if (isGate) {
    parts.push(H.rect(x + boxW / 2 - 52, y + boxH + 14, 104, 30, { rx: 8, fill: GATE_BADGE, filter: 'url(#sh)' }));
    parts.push(H.text('硬门槛', x + boxW / 2, y + boxH + 29, { size: 15, fill: '#ffffff', weight: 700 }));
  }
  // 连到下一步的箭头
  if (i < steps.length - 1) {
    parts.push(H.arrow(x + boxW + 2, y + boxH / 2, x + boxW + gap - 2, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-article-illustrator-03-flowchart-workflow.svg', svg);
console.log('✓ baoyu-article-illustrator-03-flowchart-workflow');
