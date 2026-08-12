// baoyu-translate-01-infographic.cjs — 机器翻译的三大痛点（type=infographic，palette=tech）
// 演示：rect 卡片 + circle 序号 + 多行 text，扁平矢量风（渐变背景 + 轻投影 + 无衬线）。
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-translate-01-infographic.cjs docs/posts/skill/imgs/baoyu-translate-01-infographic.svg

// ─── robust require svg-helpers：先试相对，再按 skill 目录找 scripts/svg-helpers.cjs ───
let H;
try { H = require('../scripts/svg-helpers.cjs'); }   // gen 脚本恰好在 skill 目录内时
catch {
  const p = require('path'), os = require('os'), fs = require('fs');
  const home = os.homedir();
  const cands = [
    process.env.DG_SKILL_DIR,
    process.env.SKILL_DIR,
    '.claude/skills/dg-article-illustrator-svg',               // 项目级 skill（博客根 cwd）
    p.join(home, '.claude/skills/dg-article-illustrator-svg'), // 用户级 skill
    p.join(home, '.claude/plugins/marketplaces/dg-skills/skills/dg-article-illustrator-svg'),
  ].filter(Boolean);
  const dir = cands.find(d => fs.existsSync(p.resolve(d, 'scripts/svg-helpers.cjs')));
  if (!dir) { console.error('✗ svg-helpers 未找到。设 DG_SKILL_DIR 指向本 skill 目录。'); process.exit(1); }
  H = require(p.resolve(dir, 'scripts/svg-helpers.cjs'));
}
const fs = require('fs');

// 1. 选配色：tech（深蓝→青渐变，契合博客主色与封面）
const P = H.palette('tech');
const W = 1200, Hh = 440;

// 2. 三大痛点内容（标签来自正文与 alt，术语保持原文）
const pains = [
  { title: '翻译腔',     lines: ['句子生硬', '读起来不像人话'],   fill: P.fills[0] },
  { title: '术语漂移',   lines: ['同一术语', '前后翻译不一致'],   fill: P.fills[2] },
  { title: '长文丢语境', lines: ['翻到后半段', '就丢了前文背景'], fill: P.fills[3] },
];

const parts = [];
// 3. 投影滤镜（卡片引用 url(#sh)，制造扁平风的轻浮起感）
parts.push(H.shadowFilter('sh', 'subtle'));
// 4. 标题 + 副标题（无衬线，自带 PingFang SC 字体栈）
parts.push(H.text('机器翻译的三大痛点', W / 2, 62, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('不是「翻错」，而是「翻译腔 / 术语漂移 / 长文丢语境」', W / 2, 100, { size: 16, fill: '#ffffff', opacity: 0.7 }));

// 5. 三张卡片横排：每张 rect + 顶部序号圆 + 痛点名 + 两行说明
const cardW = 340, cardH = 250, gap = 30;
const startX = (W - (3 * cardW + 2 * gap)) / 2;   // 整体居中
const cardY = 135;

pains.forEach((pain, i) => {
  const x = startX + i * (cardW + gap);
  const cx = x + cardW / 2;
  // 卡片本体：圆角矩形 + 渐变色填充 + 轻投影
  parts.push(H.rect(x, cardY, cardW, cardH, { rx: 16, fill: pain.fill, filter: 'url(#sh)' }));
  // 顶部序号圆（白底彩字，视觉锚点）
  parts.push(H.circle(cx, cardY + 56, 28, { fill: '#ffffff' }));
  parts.push(H.text(String(i + 1), cx, cardY + 56, { size: 26, fill: pain.fill, weight: 700 }));
  // 痛点名（大字白字）
  parts.push(H.text(pain.title, cx, cardY + 130, { size: 28, fill: '#ffffff', weight: 700 }));
  // 两行说明（小字，半透明白）
  pain.lines.forEach((ln, j) => {
    parts.push(H.text(ln, cx, cardY + 175 + j * 32, { size: 16, fill: '#ffffff', opacity: 0.88 }));
  });
});

// 6. wrap 拼完整 SVG（渐变背景自动进 defs，生成 linearGradient + feDropShadow）
const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-translate-01-infographic.svg', svg);
console.log('✓ baoyu-translate-01-infographic');
