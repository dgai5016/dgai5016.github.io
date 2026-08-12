// attention-matrix.cjs — 注意力矩阵示意：谁关注谁（行归一化）
// 对应 attention.md「注意力矩阵：一张图看懂『谁关注谁』」一节。type=framework，palette=tech。
// 跑法：bun run docs/posts/ai/imgs/gen/attention-matrix.cjs docs/posts/ai/imgs/attention-matrix.svg
const p = require('path'), os = require('os'), fs = require('fs');
const cands = [
  process.env.DG_SKILL_DIR,
  '.claude/skills/dg-article-illustrator-svg',
  p.join(os.homedir(), '.claude/skills/dg-article-illustrator-svg'),
].filter(Boolean);
const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
if (!dir) { console.error('✗ svg-helpers 未找到'); process.exit(1); }
const H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));

const P = H.palette('tech');
const W = 1200, Hh = 520;

// 「我 / 喜欢 / 吃 / 苹果」4 个词的注意力矩阵（行=查询词，列=被关注词，每行和≈1）
const words = ['我', '喜欢', '吃', '苹果'];
const matrix = [
  [0.5, 0.3, 0.1, 0.1],
  [0.2, 0.4, 0.2, 0.2],
  [0.1, 0.2, 0.4, 0.3],
  [0.1, 0.1, 0.3, 0.5],
];
const cell = 86, gridX = 420, gridY = 160;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('注意力矩阵 · 谁关注谁', W / 2, 64, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('每行 = 一个词对其他词的关注权重，加起来 = 1（颜色越实 = 关注越多）', W / 2, 102, { size: 15, fill: '#ffffff', opacity: 0.72 }));

// 矩阵格子：权重越大，accent 色越实（opacity 映射）
for (let i = 0; i < 4; i++) {
  for (let j = 0; j < 4; j++) {
    const v = matrix[i][j];
    const x = gridX + j * cell, y = gridY + i * cell;
    parts.push(H.rect(x, y, cell, cell, { fill: P.accent, opacity: 0.12 + v * 1.6, stroke: '#ffffff', strokeWidth: 1 }));
    parts.push(H.text(v.toFixed(1), x + cell / 2, y + cell / 2, { size: 19, fill: '#ffffff', weight: 600 }));
  }
}
// 列标签（上方 = 被关注的词）
words.forEach((w, j) => parts.push(H.text(w, gridX + j * cell + cell / 2, gridY - 18, { size: 19, fill: P.fills[3], weight: 600 })));
// 行标签（左侧 = 查询的词）
words.forEach((w, i) => parts.push(H.text(w, gridX - 22, gridY + i * cell + cell / 2, { size: 19, fill: P.fills[1], weight: 600, anchor: 'end' })));
// 轴说明
parts.push(H.text('被关注的词 →', gridX + 4 * cell / 2, gridY + 4 * cell + 48, { size: 14, fill: '#ffffff', opacity: 0.6 }));
parts.push(H.text('查询的词 ↓', gridX - 22, gridY + 4 * cell + 48, { size: 14, fill: '#ffffff', opacity: 0.6, anchor: 'end' }));

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'attention-matrix.svg', svg);
console.log('✓ attention-matrix');
