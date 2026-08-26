#!/usr/bin/env node
/**
 * fetch-douban.cjs — 抓豆瓣图书条目页：元数据 + 封面大图 + 京东 SKU
 *
 * 用法（在博客仓库根目录执行）：
 *   node .claude/skills/dg-add-book/scripts/fetch-douban.cjs <subjectId> [subjectId2 ...]
 *
 * 输出：stdout 打印 JSON 数组，同时落盘 /tmp/douban-fetch.json。
 * 每条记录：{ subjectId, title, cover, info, jdSku, error? }
 *   - cover  已换成 /view/subject/l/ 大图规格
 *   - info   信息区整块文本（含 作者:/译者:/出版社:/出版年:，供人核对）
 *   - jdSku  从豆瓣购买区京东联盟链的落地 URL（ReturnUrl）解析出的京东商品 ID
 *
 * 设计要点（坑位对应 SKILL.md）：
 *   - 串行 + 每本间隔 2.5s：豆瓣并行抓取必限流
 *   - cookie 持久化到 /tmp/douban-state.json：跨调用复用降低风控概率
 *   - 京东联盟链会跳到京东登录页——没关系，ReturnUrl 参数里带着真实商品 URL
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

// 桌面 Chrome UA + 中文环境，尽量像正常访客
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

(async () => {
  const ids = process.argv.slice(2).filter(a => /^\d+$/.test(a));
  if (!ids.length) {
    console.error('用法: node .claude/skills/dg-add-book/scripts/fetch-douban.cjs <subjectId> [subjectId2 ...]');
    process.exit(1);
  }
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1280, height: 900 }, locale: 'zh-CN' });
  // 复用上次会话 cookie（只认数组格式，异常忽略）
  try {
    const saved = JSON.parse(fs.readFileSync('/tmp/douban-state.json', 'utf-8'));
    if (Array.isArray(saved)) ctx.addCookies(saved);
  } catch {}
  const page = await ctx.newPage();
  const results = [];

  for (const subjectId of ids) {
    const rec = { subjectId };
    try {
      await page.goto('https://book.douban.com/subject/' + subjectId + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(1500); // 等封面惰性加载与购买区渲染
      rec.title = await page.evaluate(() =>
        document.querySelector('h1 [property="v:itemreviewed"]')?.textContent?.trim() || document.title);
      // 封面：优先 data-src（惰性加载的大图），强制 /l/ 规格
      rec.cover = await page.evaluate(() => {
        const img = document.querySelector('#mainpic img');
        let c = img?.getAttribute('data-src') || img?.src || null;
        return c ? c.replace(/\/view\/subject\/[sm]\//, '/view/subject/l/') : null;
      });
      // 信息区整块文本：作者/译者/出版社/出版年/ISBN 都在里面，人工核对最稳
      rec.info = await page.evaluate(() =>
        document.querySelector('#info')?.innerText?.replace(/\n+/g, '\n').trim() || null);
      // 购买区京东联盟链
      const jdLink = await page.evaluate(() => {
        const a = [...document.querySelectorAll('#buyinfo a, .buy-info a')]
          .find(x => x.href.includes('vendor=jingdong') || /京东/.test(x.textContent));
        return a ? a.href : null;
      });
      if (jdLink && jdLink.includes('link2')) {
        // 打开联盟链：可能 302 到商品页，也可能被风控拦到登录页——两种情况 URL 里都带真实商品地址
        try {
          await page.goto(jdLink, { waitUntil: 'domcontentloaded', timeout: 20000 });
          await page.waitForTimeout(2500); // 等可能的 JS 二次跳转
          const m = page.url().match(/item\.(?:m\.)?jd\.com\/(\d+)\.html/)
            || decodeURIComponent(page.url()).match(/item\.(?:m\.)?jd\.com\/(\d+)\.html/);
          rec.jdSku = m ? m[1] : null;
        } catch { rec.jdSku = null; }
      }
      console.error(`OK ${subjectId} ${rec.title} | SKU: ${rec.jdSku || '无'}`); // 进度走 stderr，stdout 保持纯 JSON
    } catch (e) {
      rec.error = e.message.slice(0, 120);
      console.error(`FAIL ${subjectId} ${rec.error}`);
    }
    results.push(rec);
    fs.writeFileSync('/tmp/douban-fetch.json', JSON.stringify(results, null, 1)); // 每本落盘，中断不丢
    await page.waitForTimeout(2500); // 限速防风控
  }
  fs.writeFileSync('/tmp/douban-state.json', JSON.stringify(await ctx.cookies())); // 存 cookie 供下次复用
  await browser.close();
  console.log(JSON.stringify(results, null, 1));
  process.exit(results.some(r => r.error) && results.every(r => r.error) ? 2 : 0); // 全挂才报错，部分成功算通过
})().catch(e => { console.error('脚本失败:', e.message); process.exit(1); });
