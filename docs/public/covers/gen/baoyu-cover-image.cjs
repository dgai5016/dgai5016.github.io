// gen/baoyu-cover-image.cjs — baoyu-cover-image skill 封面（tech palette，shapes 装饰，16:9）
// 跑法：bun run docs/public/covers/gen/baoyu-cover-image.cjs docs/public/covers/baoyu-cover-image.svg
const p = require('path'), os = require('os'), fs = require('fs');
// robust require cover-helpers（gen 脚本不在 skill 目录内，走 fallback 查找）
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
  tag: 'Skill 指南',
  title: '给文章自动生成定制封面图',
  subtitle: 'Claude Code skill 使用指南',
  decor: 'shapes',
});

fs.writeFileSync(process.argv[2] || 'baoyu-cover-image.svg', svg);
console.log('✓ baoyu-cover-image');
