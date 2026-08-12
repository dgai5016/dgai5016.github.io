// framework-transformer.cjs — 示例：Transformer Block 结构（type=framework，palette=tech）
// 演示 svg-helpers 的 node（带副标签）+ arrow（纵向连接）+ wrap（渐变底）。
// 跑法：bun run examples/framework-transformer.cjs examples/framework-transformer.svg
const H = require('../scripts/svg-helpers.cjs');
const fs = require('fs');

const P = H.palette('tech');
const W = 1200, Hh = 560;
const cx = W / 2;

// 一个 Transformer Block 的纵向堆叠（从上到下阅读）
const boxW = 360, boxH = 56, step = 70, startY = 108;
const layers = [
  { label: '输入嵌入',     sub: 'Embedding + 位置编码' },
  { label: '多头注意力',   sub: 'Multi-Head Self-Attention' },
  { label: 'Add & LayerNorm', sub: '残差连接 + 层归一化' },
  { label: '前馈网络',     sub: 'Feed-Forward (MLP)' },
  { label: 'Add & LayerNorm', sub: '残差连接 + 层归一化' },
  { label: '输出',         sub: '送入下一层 / 预测' },
];

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('Transformer Block · 结构图', W / 2, 58, { size: 32, fill: '#ffffff', weight: 700 }));

let prevBottom = null;
layers.forEach((layer, i) => {
  const y = startY + i * step;
  // 注意力层与 FFN 层是核心，用 accent 突出；其余用 fills 轮转
  const isCore = i === 1 || i === 3;
  const n = H.node(cx - boxW / 2, y, boxW, boxH, layer.label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 18, weight: 600,
    sub: layer.sub,
  });
  parts.push(n.svg);
  // 纵向箭头：从上一层底部 → 当前层顶部（数据自上而下流动）
  if (prevBottom !== null) {
    parts.push(H.arrow(cx, prevBottom, cx, y, { stroke: '#ffffff', strokeWidth: 2, opacity: 0.8 }));
  }
  prevBottom = y + boxH;
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'framework-transformer.svg', svg);
console.log('✓ framework-transformer');
