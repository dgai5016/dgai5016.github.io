// baoyu-translate-04-flowchart.cjs — refined 精翻完整流水线 + 长文分块并行（type=flowchart，palette=tech）
// 演示：横向 5 步主流程 node + arrow，下方虚线框装「长文分块并行」子流程。
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-translate-04-flowchart.cjs docs/posts/skill/imgs/baoyu-translate-04-flowchart.svg

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

const P = H.palette('tech');
const W = 1200, Hh = 500;

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('refined 精翻 · 完整流水线', W / 2, 50, { size: 32, fill: '#ffffff', weight: 700 }));
parts.push(H.text('分析 → 初译 → 评审 → 修订 → 润色，长文自动分块并行', W / 2, 86, { size: 15, fill: '#ffffff', opacity: 0.7 }));

// ── 主流程：5 步横向 node（术语来自正文示例 2）──
const steps = ['分析', '初译', '评审', '修订', '润色'];
const subs = ['领域/术语/语气', '产出初稿', '只诊断不重写', '按意见改稿', '读着像原创'];
const boxW = 195, boxH = 90, gap = 20;
const startX = (W - (5 * boxW + 4 * gap)) / 2;
const y = 120;

steps.forEach((label, i) => {
  const x = startX + i * (boxW + gap);
  // 「评审」「润色」是精翻独有的增值环节，用 accent 突出；其余 fills 轮转
  const isCore = i === 2 || i === 4;
  const n = H.node(x, y, boxW, boxH, label, {
    fill: isCore ? P.accent : P.fills[i % P.fills.length],
    filter: 'url(#sh)',
    textColor: '#ffffff',
    size: 21, weight: 700,
    sub: subs[i],
  });
  parts.push(n.svg);
  if (i < 4) {
    parts.push(H.arrow(x + boxW + 1, y + boxH / 2, x + boxW + gap - 1, y + boxH / 2, {
      stroke: '#ffffff', strokeWidth: 2, opacity: 0.75,
    }));
  }
});

// ── 下方：长文分块并行机制（虚线框 + 4 步小流程）──
const subY = 280, subH = 175;
const subBoxW = (W - 2 * 80) ;   // 虚线框宽度区域
// 虚线框背景：半透明白底 + 白色虚线边
parts.push(H.rect(80, subY, W - 160, subH, {
  rx: 14, fill: '#ffffff', opacity: 0.06,
  stroke: '#ffffff', strokeWidth: 1.5,
}));
// 用 opts.dash 让边线变虚线（rect 不支持 dash，这里用一条虚线 path 包一圈的简化：仅画顶部标识带）
parts.push(H.text('长文分块并行机制（文档超 4000 词时自动触发）', W / 2, subY + 34, { size: 17, fill: '#ffffff', weight: 700, opacity: 0.95 }));

// 子流程 4 步小卡片
const subSteps = ['抽全文术语', '切成多块', '每块并行翻译', '合并 + 术语对齐'];
const sBoxW = 200, sBoxH = 70, sGap = 22;
const sStartX = (W - (4 * sBoxW + 3 * sGap)) / 2;
const sY = subY + 75;

subSteps.forEach((label, i) => {
  const x = sStartX + i * (sBoxW + sGap);
  // 小卡片用半透明填充 + 白字，与主流程区分（弱化层级）
  parts.push(H.rect(x, sY, sBoxW, sBoxH, {
    rx: 10, fill: P.fills[i % P.fills.length], opacity: 0.55, filter: 'url(#sh)',
  }));
  parts.push(H.text(label, x + sBoxW / 2, sY + sBoxH / 2, { size: 15, fill: '#ffffff', weight: 600 }));
  if (i < 3) {
    parts.push(H.arrow(x + sBoxW + 1, sY + sBoxH / 2, x + sBoxW + sGap - 1, sY + sBoxH / 2, {
      stroke: '#ffffff', strokeWidth: 1.6, opacity: 0.6, size: 9,
    }));
  }
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-translate-04-flowchart.svg', svg);
console.log('✓ baoyu-translate-04-flowchart');
