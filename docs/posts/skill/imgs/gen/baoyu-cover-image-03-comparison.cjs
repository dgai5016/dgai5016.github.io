// baoyu-cover-image-03-comparison.cjs — 三种典型用法 · 并排对比
// type=comparison, palette=tech：左中右三栏节点 + 中间虚线分隔
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-03-comparison.cjs docs/posts/skill/imgs/baoyu-cover-image-03-comparison.svg

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
const W = 1200, Hh = 420;

// 三种典型用法：标题 + 触发命令 + 一句话说明
const cols = [
  { head: '示例一 · 最省事', cmd: 'make cover', desc: '什么都不指定\n自动选全部维度' },
  { head: '示例二 · 预设',   cmd: '--style watercolor --aspect 3:4', desc: '锁定配色渲染\n自定义宽高比' },
  { head: '示例三 · 边界',   cmd: '无图像后端', desc: '明确告知不可用\n不用 SVG 凑数' },
];

const colW = 320, colH = 240, gap = 60;
const startX = (W - (3 * colW + 2 * gap)) / 2;    // 整体居中
const y = 150;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('三种典型用法 · 并排对比', W / 2, 70, { size: 34, fill: '#ffffff', weight: 700 }));

cols.forEach((c, i) => {
  const x = startX + i * (colW + gap);
  const isBoundary = i === 2;                      // 边界示例用 accent 区分
  const fill = isBoundary ? P.accent : P.fills[i % P.fills.length];
  // 列头部圆角节点
  const n = H.node(x, y, colW, 56, c.head, {
    fill, filter: 'url(#sh)', textColor: '#ffffff', size: 19, weight: 700, rx: 14,
  });
  parts.push(n.svg);
  // 命令代码块（半透明深底，模拟终端）
  parts.push(H.rect(x, y + 76, colW, 50, { rx: 8, fill: '#000000', opacity: 0.28 }));
  parts.push(H.text(c.cmd, x + colW / 2, y + 76 + 25, {
    size: c.cmd.length > 20 ? 14 : 17, fill: '#ffffff', weight: 600,
  }));
  // 说明文字（两行）
  const lines = c.desc.split('\n');
  lines.forEach((ln, k) => {
    parts.push(H.text(ln, x + colW / 2, y + 150 + k * 30, {
      size: 16, fill: '#ffffff', opacity: 0.85,
    }));
  });
  // 列间虚线分隔符
  if (i < 2) {
    const dx = x + colW + gap / 2;
    parts.push(H.line(dx, y - 10, dx, y + colH + 10, {
      stroke: '#ffffff', strokeWidth: 1.5, dash: '6 6', opacity: 0.5,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-03-comparison.svg', svg);
console.log('✓ baoyu-cover-image-03-comparison');
