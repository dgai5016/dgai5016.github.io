// cover-attention.cjs — 示例：注意力机制封面（tech palette，shapes 装饰，16:9）
// 演示 cover-helpers 的 coverWrap（渐变背景 + 装饰 + 大标题 + 副标题 + 标签）。
// 跑法：bun run examples/cover-attention.cjs examples/cover-attention.svg
const p = require('path'), os = require('os'), fs = require('fs');
// robust require cover-helpers
let C;
try { C = require('../scripts/cover-helpers.cjs'); }
catch {
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    '.claude/skills/dg-cover-image',
    p.join(home, '.claude/skills/dg-cover-image'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/cover-helpers.cjs')));
  if (!dir) { console.error('✗ cover-helpers 未找到'); process.exit(1); }
  C = require(p.resolve(dir, 'scripts/cover-helpers.cjs'));
}

const svg = C.coverWrap({
  palette: 'tech',
  tag: 'AI · 深度学习',
  title: '注意力机制',
  subtitle: 'Attention Mechanism · 让模型「有重点地看」',
  decor: 'shapes',
});

fs.writeFileSync(process.argv[2] || 'cover-attention.svg', svg);
console.log('✓ cover-attention');
