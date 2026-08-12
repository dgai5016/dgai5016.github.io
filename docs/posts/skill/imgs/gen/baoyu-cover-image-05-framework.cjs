// baoyu-cover-image-05-framework.cjs — skill 只分析 + 组装 prompt · 真正画图靠后端
// type=framework, palette=tech：左右两个大区块 + 中间箭头，明确职责分工
// 跑法：bun run docs/posts/skill/imgs/gen/baoyu-cover-image-05-framework.cjs docs/posts/skill/imgs/baoyu-cover-image-05-framework.svg

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
const W = 1200, Hh = 440;

// 左侧 skill 职责、右侧后端职责，中间一个粗箭头表示 prompt 传递
const blockW = 420, blockH = 280, y = 150;
const leftX = 80;
const rightX = W - 80 - blockW;                    // 700
const arrowX1 = leftX + blockW + 20;               // 520
const arrowX2 = rightX - 20;                       // 680

const parts = [];
parts.push(H.shadowFilter('sh', 'subtle'));
parts.push(H.text('skill 分析 + 组装 prompt · 真正画图靠后端', W / 2, 70, { size: 30, fill: '#ffffff', weight: 700 }));

// ── 左侧大区块：skill ──
parts.push(H.rect(leftX, y, blockW, blockH, { rx: 16, fill: P.fills[0], filter: 'url(#sh)' }));
parts.push(H.text('skill', leftX + blockW / 2, y + 38, { size: 26, fill: '#ffffff', weight: 800 }));
parts.push(H.text('只做这两件事', leftX + blockW / 2, y + 72, { size: 15, fill: '#ffffff', opacity: 0.75 }));
// 两个子任务节点
parts.push(H.rect(leftX + 40, y + 100, blockW - 80, 56, { rx: 10, fill: '#000000', opacity: 0.22 }));
parts.push(H.text('① 分析文章内容', leftX + blockW / 2, y + 100 + 28, { size: 18, fill: '#ffffff', weight: 600 }));
parts.push(H.rect(leftX + 40, y + 178, blockW - 80, 56, { rx: 10, fill: '#000000', opacity: 0.22 }));
parts.push(H.text('② 组装 prompt', leftX + blockW / 2, y + 178 + 28, { size: 18, fill: '#ffffff', weight: 600 }));

// ── 中间箭头：prompt 传递 ──
parts.push(H.arrow(arrowX1, y + blockH / 2, arrowX2, y + blockH / 2, {
  stroke: '#ffffff', strokeWidth: 3, size: 16, opacity: 0.9,
}));
parts.push(H.text('prompt', (arrowX1 + arrowX2) / 2, y + blockH / 2 - 28, {
  size: 16, fill: '#ffffff', weight: 700, opacity: 0.9,
}));

// ── 右侧大区块：图像后端（焦点，用 accent）──
parts.push(H.rect(rightX, y, blockW, blockH, { rx: 16, fill: P.accent, filter: 'url(#sh)' }));
parts.push(H.text('图像后端', rightX + blockW / 2, y + 38, { size: 26, fill: '#ffffff', weight: 800 }));
parts.push(H.text('真正画图的力量', rightX + blockW / 2, y + 72, { size: 15, fill: '#ffffff', opacity: 0.85 }));
// 后端候选列表
const backends = ['imagegen (Codex)', 'GenerateImage (Cursor)', 'baoyu-image-gen', 'codex CLI'];
backends.forEach((b, i) => {
  parts.push(H.rect(rightX + 40, y + 100 + i * 42, blockW - 80, 32, { rx: 8, fill: '#000000', opacity: 0.22 }));
  parts.push(H.text(b, rightX + blockW / 2, y + 100 + i * 42 + 16, { size: 16, fill: '#ffffff', weight: 600 }));
});

const svg = H.wrap(W, Hh, { gradFrom: P.bgGrad[0], gradTo: P.bgGrad[1] }, parts);
fs.writeFileSync(process.argv[2] || 'baoyu-cover-image-05-framework.svg', svg);
console.log('✓ baoyu-cover-image-05-framework');
