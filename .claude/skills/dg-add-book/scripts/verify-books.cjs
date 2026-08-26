#!/usr/bin/env node
/**
 * verify-books.cjs — 书单页验收：DOM 全检 + 桌面/移动双截图
 *
 * 用法（在博客仓库根目录执行）：
 *   node .claude/skills/dg-add-book/scripts/verify-books.cjs [devUrl]
 *   devUrl 缺省 http://localhost:5173/pages/books
 *
 * 检查项（每本书一行简报）：
 *   - 封面缩略图：src + 是否真实加载（naturalWidth > 0，防破图/占位图混入；检查前先整页滚动触发懒加载）
 *   - 书名：必须是纯文本 span（不能残留链接）
 *   - 京东胶囊：存在且 href 指向 item.jd.com
 *   - 豆瓣胶囊：可选字段，渲染了就必须是 book.douban.com/subject/<数字>/ 条目页
 *   - 元信息行：作者 著 / 译者 译 · 出版社 · 出版时间
 *
 * 退出码：0 全部通过 | 1 有失败项（简报里标「!!」）
 * 截图：/tmp/books-desktop.png（1280 宽）+ /tmp/books-mobile.png（375 宽），供人工/视觉复查
 */
// 从脚本位置逐层向上找本仓库的 node_modules/playwright（不硬编码层级，脚本挪位置也不怕）
const path = require('path');
const fs = require('fs');
function resolvePlaywright() {
  let dir = __dirname;
  for (let i = 0; i < 6; i++) {
    const p = path.join(dir, 'node_modules', 'playwright');
    if (fs.existsSync(p)) return p;
    dir = path.dirname(dir);
  }
  console.error('找不到 node_modules/playwright：请在博客仓库内运行（且已 npm install）');
  process.exit(1);
}
const { chromium } = require(resolvePlaywright());

(async () => {
  const url = process.argv[2] || 'http://localhost:5173/pages/books';
  const browser = await chromium.launch();

  async function shot(viewport, path) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    // 展开所有主题抽屉（默认只展开第一个）
    await page.evaluate(() => document.querySelectorAll('.book-drawer__header').forEach(b => {
      if (b.getAttribute('aria-expanded') !== 'true') b.click();
    }));
    await page.waitForTimeout(600);
    // 整页滚动一遍触发封面懒加载（img loading="lazy" 不滚不加载，否则首屏外的书全被误判破图）
    await page.evaluate(async () => {
      await new Promise(resolve => {
        let y = 0;
        const step = () => {
          y += 600;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) return setTimeout(step, 80);
          window.scrollTo(0, 0);
          resolve();
        };
        step();
      });
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path, fullPage: true });
    return page;
  }

  const desktop = await shot({ width: 1280, height: 900 }, '/tmp/books-desktop.png');
  const items = await desktop.$$eval('.book-item', els => els.map(el => {
    const img = el.querySelector('.book-item__cover');
    const title = el.querySelector('.book-item__title');
    const jd = el.querySelector('.book-item__jd');
    const douban = el.querySelector('.book-item__douban');
    const weread = el.querySelector('.book-item__weread');
    return {
      title: title?.textContent?.trim(),
      imgOk: img ? (img.complete && img.naturalWidth > 0) : false,
      imgSrc: img?.getAttribute('src'),
      titleIsLink: title?.tagName === 'A',
      jdOk: jd ? /^https:\/\/item\.jd\.com\/\d+\.html$/.test(jd.getAttribute('href') || '') : false,
      // 豆瓣胶囊是可选字段：渲染了就必须是合法的 book.douban.com 条目页（subject/<数字>）
      doubanBad: douban ? !/^https:\/\/book\.douban\.com\/subject\/\d+\/?$/.test(douban.getAttribute('href') || '') : false,
      hasDouban: !!douban,
      hasWeread: !!weread,
      // 微信读书胶囊是可选字段：渲染了就必须是合法的 weread.qq.com 链接（尾部统一带 #outline?noScroll=1 锚点，打开直接看书的信息）
      wereadBad: weread ? !/^https:\/\/weread\.qq\.com\/web\/reader\/[0-9a-z]+#outline\?noScroll=1$/.test(weread.getAttribute('href') || '') : false,
      meta: el.querySelector('.book-item__meta')?.textContent?.trim() || null,
    };
  }));
  await desktop.close();
  await shot({ width: 375, height: 812 }, '/tmp/books-mobile.png'); // 移动端截图（小屏封面 28x42 缩放）

  // 逐本简报：任何一项失败行首标 !!
  let failed = 0;
  items.forEach(i => {
    const errs = [];
    if (!i.imgOk) errs.push('封面未加载/破图');
    if (!/^\/covers\/books\/.+/.test(i.imgSrc || '')) errs.push(`封面路径异常:${i.imgSrc}`);
    // 灯箱高清图按命名约定必须存在（<slug>.jpg → <slug>-full.jpg）；svg 兜底图无 full 版，跳过
    if (i.imgSrc && i.imgSrc.endsWith('.jpg')) {
      const full = 'docs/public' + i.imgSrc.replace('.jpg', '-full.jpg');
      if (!fs.existsSync(full)) errs.push(`缺灯箱高清图:${full}`);
    }
    if (i.titleIsLink) errs.push('书名是链接');
    // 京东/豆瓣/微信读书至少要有一个入口：纯自媒体电子书（如微信读书原创）没有京东/豆瓣是合法缺失
    if (!i.jdOk && !i.hasDouban && !i.hasWeread) errs.push('京东/豆瓣/微信读书入口全缺');
    if (i.wereadBad) errs.push('微信读书胶囊链接异常');
    if (i.doubanBad) errs.push('豆瓣胶囊链接异常');
    const flag = errs.length ? '!!' : 'ok';
    if (errs.length) failed++;
    console.log(`[${flag}] ${(i.title || '').slice(0, 24)} | ${errs.join('; ') || '封面/书名/胶囊/元信息 全过' + (i.meta ? ` | ${i.meta.slice(0, 40)}` : '')}`);
  });
  console.log(`\n共 ${items.length} 本, 失败 ${failed} | 截图: /tmp/books-desktop.png /tmp/books-mobile.png`);
  await browser.close();
  process.exit(failed ? 1 : 0);
})().catch(e => { console.error('失败:', e.message); process.exit(1); });
