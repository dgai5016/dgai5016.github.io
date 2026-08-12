// baoyu-cover-image-04-flowchart.cjs — 内部工作流 · 6 个步骤
// type=flowchart, palette=tech：横向 6 步流程，每步带序号圆点 + 右向箭头
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-04-flowchart.cjs docs/posts/skill/imgs/baoyu-cover-image-04-flowchart.svg

// robust require svg-helpers：先试相对，再按 skill 目录候选位置找 scripts/svg-helpers.cjs
let H;
try { H = require('../scripts/svg-helpers.cjs'); } catch {
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

const P = H.palette('tech');
const W = 1200, Hh = 440;

// 工作流 6 步（取自文章第 84-93 行）
const steps = [
  { label: '加载偏好', sub: '首次必经' },
  { label: '分析内容', sub: '主题/语气' },
  { label: '确认选项', sub: '点头/微调' },
  { label: '写 prompt', sub: '存文件' },
  { label: '生成图片', sub: '调后端' },
  { label: '完成报告', sub: '汇报结果' },
];

const boxW = 160, boxH = 110, gap = 28;
const startX = (W - (6 * boxW + 5 * gap)) / 2;     // 整体居中
const y = 240;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('内部工作流 · 6 个步骤', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));
parts.push(H.text('从触发到出图，skill 内部按顺序经历这六步', W / 2, 122, { size: 16, fill: '#ffffff', opacity: 0.7 }));

steps.forEach((s, i) => {
  const x = startX + i * (boxW + gap);
  const isCore = i === 4;                           // 「生成图片」是核心步骤，用 accent 突出
  const n = H.node(x, y, boxW, boxH, s.label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 19, weight: 700,
    sub: s.sub,
  });
  parts.push(n.svg);
  // 节点上方序号圆
  parts.push(H.circle(x + boxW / 2, y - 34, 20, { fill: isCore ? P.accent : P.fills[i % P.fills.length], filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 34, { size: 20, fill: '#ffffff', weight: 700 }));
  // 连到下一步的箭头
  if (i < 5) {
    parts.push(H.arrow(x + boxW + 2, y + boxH / 2, x + boxW + gap - 2, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-04-flowchart.svg', svg);
console.log('✓ baoyu-cover-image-04-flowchart');
