// infographic-softmax.cjs — 示例：Softmax 概率分布柱状图（type=infographic，palette=soft）
// 演示 svg-helpers 的 barChart（自动算满高、柱顶数值、柱底标签）+ wrap（纯色底）。
// 跑法：bun run examples/infographic-softmax.cjs examples/infographic-softmax.svg
const H = require('../scripts/svg-helpers.cjs');
const fs = require('fs');

const P = H.palette('soft');            // 米色低饱和柔和配色（通用/知识风）
const W = 1200, Hh = 480;

// 模型对一张图预测的 4 个类别概率（百分比，合计 100）
const data = [
  { label: '猫', value: 71, color: P.fills[0] },
  { label: '狗', value: 18, color: P.fills[2] },
  { label: '鸟', value: 8,  color: P.fills[3] },
  { label: '鱼', value: 3,  color: P.fills[4] },
];

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('Softmax 输出 · 每个类别的概率', W / 2, 68, { size: 32, fill: P.ink, weight: 700 }));
parts.push(H.text('数值为百分比，四类总和 = 100%', W / 2, 106, { size: 16, fill: P.ink, opacity: 0.6 }));

// 柱状图绘制区：左留 160、右留 160 边距，顶部 170 起，高 260
parts.push(H.barChart(data, 160, 170, 880, 260, { ink: P.ink, fill: P.accent }));

const svg = H.wrap(W, Hh, { fill: P.bg }, parts);
fs.writeFileSync(process.argv[2] || 'infographic-softmax.svg', svg);
console.log('✓ infographic-softmax');
