// baoyu-translate-02-comparison.cjs — 三档模式对比 quick/normal/refined（type=comparison，palette=tech）
// 演示：左右三列卡片 + 中间 accent 突出默认档 + 底部 速度↔质量 虚线轴。
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-translate-02-comparison.cjs docs/posts/skill/imgs/baoyu-translate-02-comparison.svg

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

// 1. 配色：tech（深蓝→青）。accent 紫色用来突出默认的 normal 档
const P = H.palette('tech');
const W = 1200, Hh = 440;

// 2. 三档模式内容（术语来自正文表格）
const modes = [
  { name: 'quick',   cn: '快翻 · 直译',     feats: ['一次性直译', '不分块', '速度最快'],         fill: P.fills[0], isDefault: false },
  { name: 'normal',  cn: '标准 · 先分析再译', feats: ['先分析全文', '再据此翻译', '默认推荐'],     fill: P.accent,   isDefault: true  },
  { name: 'refined', cn: '精翻 · 完整流水线', feats: ['分析→译→评审', '→修订→润色', '出版级质量'], fill: P.fills[3], isDefault: false },
];

const parts = [];
// 3. 投影滤镜 + 标题
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('三档模式对比 · 速度 ↔ 质量', W / 2, 58, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('说「快翻 / 精翻」自动切档，其余走默认 normal', W / 2, 96, { size: 16, fill: '#ffffff', opacity: 0.7 }));

// 4. 三列卡片：默认档用 accent 色并加描边突出
const cardW = 300, cardH = 230, gap = 40;
const startX = (W - (3 * cardW + 2 * gap)) / 2;
const cardY = 125;

modes.forEach((mode, i) => {
  const x = startX + i * (cardW + gap);
  const cx = x + cardW / 2;
  // 卡片：默认档加白色细描边，视觉上「浮起来」
  parts.push(H.rect(x, cardY, cardW, cardH, {
    rx: 16, fill: mode.fill, filter: 'url(#sh)',
    stroke: mode.isDefault ? '#ffffff' : null, strokeWidth: mode.isDefault ? 3 : 0,
  }));
  // 默认档顶部小标「默认」
  if (mode.isDefault) {
    parts.push(H.text('★ 默认', cx, cardY + 32, { size: 14, fill: '#ffffff', weight: 700, opacity: 0.95 }));
  }
  // 英文模式名（大字）
  parts.push(H.text(mode.name, cx, cardY + (mode.isDefault ? 72 : 56), { size: 28, fill: '#ffffff', weight: 700 }));
  // 中文别称
  parts.push(H.text(mode.cn, cx, cardY + 108, { size: 16, fill: '#ffffff', opacity: 0.9 }));
  // 三行特点
  mode.feats.forEach((ft, j) => {
    parts.push(H.text(ft, cx, cardY + 148 + j * 28, { size: 14, fill: '#ffffff', opacity: 0.85 }));
  });
});

// 5. 底部 速度↔质量 虚线轴：左端速度、右端质量，中间渐变箭头
const axisY = 405;
parts.push(H.line(110, axisY, 1090, axisY, { stroke: '#ffffff', strokeWidth: 1.5, dash: '6 5', opacity: 0.5 }));
parts.push(H.text('速度 ↑', 110, axisY + 26, { size: 15, fill: '#ffffff', opacity: 0.75, anchor: 'start' }));
parts.push(H.text('质量 ↑', 1090, axisY + 26, { size: 15, fill: '#ffffff', opacity: 0.75, anchor: 'end' }));

// 6. wrap 拼完整 SVG
const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-translate-02-comparison.svg', svg);
console.log('✓ baoyu-translate-02-comparison');
