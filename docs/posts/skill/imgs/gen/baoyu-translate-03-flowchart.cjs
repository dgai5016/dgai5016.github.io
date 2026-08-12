// baoyu-translate-03-flowchart.cjs — normal 模式标准翻译流程（type=flowchart，palette=tech）
// 演示：横向 5 步 node + 序号圆 + arrow 连线（参考 examples/flow-6steps.cjs）。
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-translate-03-flowchart.cjs docs/posts/skill/imgs/baoyu-translate-03-flowchart.svg

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

// 1. 配色：tech。accent 紫色突出「分析」这一步（normal 模式区别于 quick 的核心）
const P = H.palette('tech');
const W = 1200, Hh = 360;

// 2. normal 模式 5 步（术语来自正文示例 1）
const steps = ['抓取', '物化', '分析', '翻译', '输出'];
const boxW = 180, boxH = 100, gap = 30;
const startX = (W - (5 * boxW + 4 * gap)) / 2;   // 整体居中
const y = 210;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('normal 模式 · 标准翻译流程', W / 2, 60, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('先分析全文（领域 / 语气 / 术语），再据此翻译', W / 2, 96, { size: 15, fill: '#ffffff', opacity: 0.7 }));

steps.forEach((label, i) => {
  const x = startX + i * (boxW + gap);
  // 「分析」是 normal 的核心步骤，用 accent 突出；其余轮转 fills
  const isCore = i === 2;
  const n = H.node(x, y, boxW, boxH, label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 22, weight: 700,
  });
  parts.push(n.svg);
  // 节点上方序号圆
  parts.push(H.circle(x + boxW / 2, y - 32, 20, { fill: '#ffffff', filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 32, { size: 20, fill: P.fills[i % P.fills.length], weight: 700 }));
  // 连到下一步的箭头
  if (i < 4) {
    parts.push(H.arrow(x + boxW + 2, y + boxH / 2, x + boxW + gap - 2, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

// 3. wrap 拼完整 SVG
const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-translate-03-flowchart.svg', svg);
console.log('✓ baoyu-translate-03-flowchart');
