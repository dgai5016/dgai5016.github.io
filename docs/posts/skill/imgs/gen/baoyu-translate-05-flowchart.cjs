// baoyu-translate-05-flowchart.cjs — 内部工作流 5 步骤总览（type=flowchart，palette=tech）
// 演示：横向 5 步 node（带 sub 副标签）+ 序号圆 + arrow 连线。
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-translate-05-flowchart.cjs docs/posts/skill/imgs/baoyu-translate-05-flowchart.svg

// ─── robust require svg-helpers：先试相对，再按 skill 目录找 scripts/svg-helpers.cjs ───
let H;
try { H = require('../scripts/svg-helpers.cjs'); }
catch {
  const p = require('path'), os = require('os'), fs = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',
    p.join(home, '.claude/skills/dg-article-illustrator-svg'),
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

// 1. 配色：tech。accent 突出「按模式翻译」这一核心环节
const P = H.palette('tech');
const W = 1200, Hh = 420;

// 2. 5 步（主标签 + 副标签，术语来自正文「内部工作流概览」列表）
const steps = [
  { label: '加载偏好', sub: '读 EXTEND.md + 术语表' },
  { label: '物化源',   sub: '文件/URL → markdown' },
  { label: '评估长度', sub: '超阈值 → 分块' },
  { label: '按模式翻译', sub: 'quick / normal / refined' },
  { label: '收尾',     sub: '写 translation.md + 图检' },
];
const boxW = 205, boxH = 115, gap = 18;
const startX = (W - (5 * boxW + 4 * gap)) / 2;   // 整体居中
const y = 175;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('内部工作流 · 5 步骤总览', W / 2, 52, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('从加载偏好的收尾，skill 内部按这 5 步跑完一次翻译', W / 2, 88, { size: 15, fill: '#ffffff', opacity: 0.7 }));

steps.forEach((s, i) => {
  const x = startX + i * (boxW + gap);
  // 「按模式翻译」是核心环节，用 accent 紫；其余 fills 轮转
  const isCore = i === 3;
  const n = H.node(x, y, boxW, boxH, s.label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 19, weight: 700,
    sub: s.sub,
  });
  parts.push(n.svg);
  // 序号圆
  parts.push(H.circle(x + boxW / 2, y - 30, 19, { fill: '#ffffff', filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 30, { size: 19, fill: isCore ? P.accent : P.fills[i % P.fills.length], weight: 700 }));
  // 连到下一步的箭头
  if (i < 4) {
    parts.push(H.arrow(x + boxW + 1, y + boxH / 2, x + boxW + gap - 1, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

// 3. wrap 拼完整 SVG
const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-translate-05-flowchart.svg', svg);
console.log('✓ baoyu-translate-05-flowchart');
