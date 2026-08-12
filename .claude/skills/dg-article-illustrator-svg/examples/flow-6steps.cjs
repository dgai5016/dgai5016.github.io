// flow-6steps.cjs — 示例：横向 6 步流程（type=flowchart，palette=tech）
// 演示 svg-helpers 的 node + arrow + circle + wrap（渐变背景 + 投影）。
// 跑法：bun run examples/flow-6steps.cjs examples/flow-6steps.svg
const H = require('../scripts/svg-helpers.cjs');
const fs = require('fs');

const P = H.palette('tech');            // 深蓝→青渐变配色（AI/技术风）
const W = 1200, Hh = 440;

const steps = ['前置检查', '分析文章', '确认设置', '生成大纲', '生成 SVG', '收尾插回'];
const boxW = 160, boxH = 100, gap = 28;
const startX = (W - (6 * boxW + 5 * gap)) / 2;   // 整体居中
const y = 240;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));      // 投影滤镜（放进 <defs>，节点引用）
parts.push(H.text('配图工作流 · 6 个步骤', W / 2, 80, { size: 34, fill: '#ffffff', weight: 700 }));

steps.forEach((label, i) => {
  const x = startX + i * (boxW + gap);
  // 节点：圆角矩形 + 居中标签，依次取 fills 配色
  const n = H.node(x, y, boxW, boxH, label, {
    fill: P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 19, weight: 600,
  });
  parts.push(n.svg);
  // 节点上方的小序号圆
  parts.push(H.circle(x + boxW / 2, y - 30, 20, { fill: P.accent, filter: 'url(#sh)' }));
  parts.push(H.text(String(i + 1), x + boxW / 2, y - 30, { size: 20, fill: '#ffffff', weight: 700 }));
  // 连到下一个节点的箭头
  if (i < 5) {
    parts.push(H.arrow(x + boxW + 2, y + boxH / 2, x + boxW + gap - 2, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'flow-6steps.svg', svg);
console.log('✓ flow-6steps');
