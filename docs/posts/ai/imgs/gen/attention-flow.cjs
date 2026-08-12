// attention-flow.cjs — 注意力计算流程：QK^T → ÷√dk → softmax → ×V → 输出
// 对应 attention.md「核心公式：缩放点积注意力」一节。type=flowchart，palette=tech。
// 跑法：bun run docs/posts/ai/imgs/gen/attention-flow.cjs docs/posts/ai/imgs/attention-flow.svg
const p = require('path'), os = require('os'), fs = require('fs');
// robust require svg-helpers：按 cwd / home 找 skill 目录（博客副本在新版同步后含 svg-helpers.cjs）
const cands = [
  process.env.DG_SKILL_DIR,
  '.claude/skills/dg-article-illustrator-svg',
  p.join(os.homedir(), '.claude/skills/dg-article-illustrator-svg'),
].filter(Boolean);
const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
if (!dir) { console.error('✗ svg-helpers 未找到'); process.exit(1); }
const H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));

const P = H.palette('tech');            // 深蓝→青，契合 AI/技术主题
const W = 1200, Hh = 380;

// 缩放点积注意力的 5 步流水线
const steps = [
  { label: 'QKᵀ',   sub: '点积算相似度' },
  { label: '÷ √dk', sub: '缩放，防梯度消失' },
  { label: 'softmax', sub: '归一化成权重' },
  { label: '× V',   sub: '按权重混合 Value' },
  { label: '输出',   sub: '融合上下文的新表示' },
];
const boxW = 180, boxH = 104, gap = 32;
const startX = (W - (5 * boxW + 4 * gap)) / 2;
const y = 210;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('缩放点积注意力 · 计算流程', W / 2, 72, { size: 32, fill: '#ffffff', weight: 700 }));

steps.forEach((s, i) => {
  const x = startX + i * (boxW + gap);
  const isCore = i === 2;               // softmax 是核心，用 accent 突出
  const n = H.node(x, y, boxW, boxH, s.label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 26, weight: 700, sub: s.sub,
  });
  parts.push(n.svg);
  if (i < 4) {
    parts.push(H.arrow(x + boxW + 2, y + boxH / 2, x + boxW + gap - 2, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2.2, opacity: 0.8,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'attention-flow.svg', svg);
console.log('✓ attention-flow');
