---
layout: page
---

<script setup>
// 书单数据来自 docs/books/*.yaml，由 books.data.ts 在构建期自动发现并解析
import { data as topics } from '../.vitepress/books.data'
import { ref, nextTick, onMounted, onUnmounted } from 'vue'

// 通用兜底封面：没抓到真实封面的书统一显示这张占位图（SVG 自绘，存在 public/covers/books/ 下）
const DEFAULT_COVER = '/covers/books/default-cover.svg'

// ===== 已读统计：页面标题旁「已读 X / Y 本」和主题标题栏「已读 X / Y 本」共用的计数 =====
// topics 是构建期数据（页面内不再变化），总数/已读数直接算一次即可，不需要响应式

// 全站总书数：各主题 books 数量累加
const totalBooks = topics.reduce((n, t) => n + t.books.length, 0)

// 全站已读数：isRead: true 的书累加
const readBooks = topics.reduce((n, t) => n + t.books.filter(b => b.isRead).length, 0)

// 主题内已读数（主题标题栏渲染用）
function readCount(topic) {
  return topic.books.filter(b => b.isRead).length
}

// 把作者/译者/出版社/页数/出版时间拼成一行元信息，如「黄佳 著 · 人民邮电出版社 · 254 页 · 2023-06」；
// 翻译书作者与译者用「 / 」衔接，如「艾德勒 著 / 郝明义 译 · 商务印书馆 · 376 页 · 2004-01」；
// 缺哪段就跳过哪段，全缺返回空串（详情浮层里就不渲染这一行）
function metaText(book) {
  const parts = []
  let who = ''
  if (book.author) who = `${book.author} 著`
  if (book.translator) who = who ? `${who} / ${book.translator} 译` : `${book.translator} 译`
  if (who) parts.push(who)
  if (book.publisher) parts.push(book.publisher)
  if (book.pages) parts.push(`${book.pages} 页`)
  if (book.pubDate) parts.push(book.pubDate)
  // 读完的书在末尾追加读完年月，如「… · 2023-06 · 读完于 2026-08」
  if (book.isRead && book.finishedDate) parts.push(`读完于 ${book.finishedDate}`)
  return parts.join(' · ')
}

// ===== 书籍详情卡（点击开合的非模态详情层） =====
// 点击书籍卡片 → 在卡片旁弹出详情卡（毛玻璃）；页面一切照常可点可滚——
// 点别的书直接切换、点页面其他区域/按 Esc 关闭、点击卡内（胶囊/文章链接）不关；
// 页面一滚动（超 8px 阈值）详情卡即收起：卡是 fixed 定位不跟随书卡滚动，
// 「滚动即关闭」避免两者脱节（非模态 popover 的标准行为）；
// 布局：头部（封面+书名+元信息+胶囊行含思维导图按钮）固定不滚动，
// 下方章节文章列表超高时在卡内滚动（列表滚到头继续滚会自然过渡为滚页面→关闭）
const detailBook = ref(null)
const detailPos = ref({ x: 0, y: 0 }) // 详情卡左上角的 fixed 视口坐标

// 详情卡打开瞬间的页面滚动位置：scroll 监听里偏离超阈值即关闭
let detailOpenScrollY = 0

// 点击卡片：在卡片旁定位并显示详情卡（默认右侧，最右列放不下翻左侧）。
// 垂直定位分两步：渲染前先与书卡顶部对齐；渲染后按卡的【实际高度】精调——
// 卡底超出视口才整体上移（移多少贴多少），避免用固定估值一刀切地把
// 矮卡（无文档列表的书只有 ~200px）过度上提、和书卡脱节（2026-09 位置 bug）
async function showDetailCard(book, el) {
  detailOpenScrollY = window.scrollY
  const r = el.getBoundingClientRect()
  const W = 340 // 详情卡宽度（与 CSS .book-detail-card 的 width 保持一致）
  const gap = 12
  const flip = r.right + gap + W > window.innerWidth - 8
  detailPos.value = {
    x: flip ? r.left - gap - W : r.right + gap,
    y: Math.max(8, r.top), // 第一步：顶部对齐书卡
  }
  detailBook.value = book
  // 第二步：等卡渲染出来，按实际高度把超出视口底的部分上移（贴着书卡方向收）
  await nextTick()
  const card = document.querySelector('.book-detail-card')
  if (card) {
    const overflow = detailPos.value.y + card.offsetHeight - (window.innerHeight - 8)
    if (overflow > 0) detailPos.value.y = Math.max(8, detailPos.value.y - overflow)
  }
}

// 关闭详情卡（Esc / 点卡外 / 页面滚动 共用）
function hideDetailCard() {
  detailBook.value = null
}

// 更高层浮层（PostOverlay 文章覆盖层 / 思维导图工作台 / 代码展开 / 灯箱）是否开着：
// 开着时点击与滚动都归它管——详情卡保持不动（否则读文章时点下正文、或页面
// scrollY 被浮层的锁滚/还原改变，都会误关详情卡，2026-09 踩过两个洞）
const higherLayerOpen = () =>
  !!document.querySelector('.overlay-panel, .bm-overlay, .cb-backdrop, .lb-backdrop')

// 全局点击：点到详情卡外且不在书籍卡片上 → 关闭。
// 点书籍卡片被豁免——那是「切换到另一本书」，由卡片自身的 click 打开新详情
function onGlobalClick(e) {
  if (!detailBook.value || higherLayerOpen()) return
  if (document.querySelector('.book-detail-card')?.contains(e.target)) return
  if (e.target.closest?.('.book-card')) return
  hideDetailCard()
}

// 页面滚动即关闭：详情卡 fixed 不跟书卡走，滚动超 8px 阈值即收起
//（阈值防打开瞬间的亚像素抖动误关；列表内部滚动不触发 window scroll，不受影响）
function onWindowScroll() {
  if (!detailBook.value || higherLayerOpen()) return
  if (Math.abs(window.scrollY - detailOpenScrollY) > 8) hideDetailCard()
}

// 浮层里的高清封面：按命名约定取 <slug>-full.jpg（网格缩略图只有 144px 高，直接放大会糊）；
// 没抓到真实封面的书（无 cover 字段、卡片上用 svg 兜底图）没有 full 版，预览卡里继续用兜底图原样展示
function fullCover(book) {
  return book.cover ? book.cover.replace('.jpg', '-full.jpg') : DEFAULT_COVER
}

// ===== 思维导图工作台：详情卡「思维导图」按钮打开 =====
// mindmapBook 为 null 时工作台关闭；存书籍对象时打开（BookMindmap 组件用 book.mindmap 目录名拉导图 md）
const mindmapBook = ref(null)

function openBookMindmap(book) {
  mindmapBook.value = book
}

// 全局监听：Esc 关详情卡（键盘兜底）；document 点击用于「点详情卡外关闭」
function onDetailKeydown(e) {
  if (e.key !== 'Escape') return
  // PostOverlay / 灯箱等更高层开着时把这次 Esc 让给它——防「一次 Esc 连关两层」
  //（与 PostOverlay 自身的防双关判断 .cb-backdrop/.lb-backdrop 互相对齐）
  if (document.querySelector('.overlay-panel, .cb-backdrop, .lb-backdrop')) return
  hideDetailCard()
}
onMounted(() => {
  window.addEventListener('keydown', onDetailKeydown)
  window.addEventListener('scroll', onWindowScroll, { passive: true })
  document.addEventListener('click', onGlobalClick)
})
onUnmounted(() => {
  window.removeEventListener('keydown', onDetailKeydown)
  window.removeEventListener('scroll', onWindowScroll)
  document.removeEventListener('click', onGlobalClick)
  hideDetailCard() // 页面卸载时兜底收起
})
</script>

<!-- 页面标题行：大标题 + 右侧已读统计（小字弱化，flex wrap 兜底窄屏） -->
<div class="books-page-head">
  <h1 class="page-title">书单</h1>
  <span class="books-page-stat">已读 {{ readBooks }} / {{ totalBooks }} 本</span>
</div>

<!-- 每个读书主题一张毛玻璃卡片（glass-card 提供底子），主题不做折叠、全部常开展示 -->
<div v-for="topic in topics" :key="topic.id" class="book-drawer glass-card">
  <!-- 主题标题栏：主题名 + 已读/总数计数（纯展示，无折叠交互） -->
  <div class="book-drawer__header">
    <span class="book-drawer__name">{{ topic.name }}</span>
    <span class="book-drawer__count">已读 {{ readCount(topic) }} / {{ topic.books.length }} 本</span>
  </div>

  <!-- 主题内容：书籍网格墙（桌面端一行十本，上封面下信息） -->
  <div class="book-drawer__body">
    <ul v-if="topic.books.length" class="book-grid">
      <li v-for="(book, index) in topic.books" :key="book.title">
        <!-- 单本书卡片：整卡可点，打开详情浮层看完整信息和购买/阅读入口；
             用 button 承载点击语义（type=button 防止被当成表单提交按钮）；
             卡片上的封面用 144px 高缩略图（与显示尺寸基本 1:1），width/height 属性
             配合占位框 aspect-ratio 防止图片加载引起布局抖动；
             isRead 的书加 --finished 修饰类：封面保持彩色 + 序号转主题紫底白字，
             未读的书由 CSS 把封面和文字整体灰掉（读书进度的「点亮」隐喻） -->
        <button
          type="button"
          class="book-card"
          :class="{ 'book-card--finished': book.isRead }"
          :aria-label="`查看 ${book.title} 详情`"
          @click="showDetailCard(book, $event.currentTarget)"
        >
          <!-- 封面占位框：竖版 2:3，relative 供左上角序号徽章定位；
               有真实封面用真实图，没抓到的用通用兜底占位图 -->
          <span class="book-card__cover-wrap">
            <img
              class="book-card__cover"
              :src="book.cover || DEFAULT_COVER"
              :alt="`${book.title} 封面`"
              width="102"
              height="144"
              loading="lazy"
              decoding="async"
            >
            <!-- 主题内序号：钉在封面左上角；白玻璃底为默认（未读），
                 已读（--finished）由 CSS 转主题紫底白字——状态并入序号徽章，不再单放对勾；
                 已读置顶后 1、2 号天然落在读完的书上，紫色序号即「已读完」标识 -->
            <span class="book-card__index">{{ index + 1 }}</span>
          </span>
          <!-- 书名：窄格子放不下长书名，CSS 限制最多两行、超出省略号 -->
          <span class="book-card__title">{{ book.title }}</span>
          <!-- 作者：单行截断弱化展示，完整名单（含译者）看详情浮层 -->
          <span v-if="book.author" class="book-card__author">{{ book.author }}</span>
        </button>
      </li>
    </ul>
    <p v-else class="book-drawer__empty">这个主题还没有书目</p>
  </div>
</div>

<!-- 书籍详情卡：点击书籍卡片出现在卡片旁的毛玻璃卡（非模态，无遮罩）；
     页面照常可点可滚：点别的书直接切换、点空白/Esc 关闭、页面滚动即收起；
     点击卡内的胶囊、文章链接不关闭（章节文章在 PostOverlay 读完后回来卡还在）；
     布局：头部（封面+信息+胶囊行）固定，下方章节文章列表超高时卡内滚动。
     ⚠ 本段内部不能出现空行——markdown 会把「空行 + 缩进≥4空格」解析成缩进代码块 -->
<Teleport to="body">
  <div
    v-if="detailBook"
    class="book-detail-card"
    :style="{ left: detailPos.x + 'px', top: detailPos.y + 'px' }"
  >
    <!-- 头部（不滚动）：左高清封面（-full.jpg 命名约定，缩到 96px 依然锐利）+ 右信息列 -->
    <div class="book-detail-card__head">
      <img class="book-detail-card__cover" :src="fullCover(detailBook)" :alt="`${detailBook.title} 封面`">
      <!-- 右：书名 + 读完徽章 + 元信息 + 三平台胶囊 + 思维导图按钮 -->
      <div class="book-detail-card__info">
        <span class="book-detail-card__title">{{ detailBook.title }}</span>
        <span v-if="detailBook.isRead" class="book-detail-card__status">读完</span>
        <span v-if="metaText(detailBook)" class="book-detail-card__meta">{{ metaText(detailBook) }}</span>
        <!-- 购买/阅读入口胶囊：有哪个平台渲染哪个（新标签页打开），点击不影响详情卡开合 -->
        <div class="book-detail-card__links">
          <a
            v-if="detailBook.jd"
            :href="detailBook.jd"
            target="_blank"
            rel="noopener"
            class="book-detail-card__jd"
          >京东</a>
          <a
            v-if="detailBook.douban"
            :href="detailBook.douban"
            target="_blank"
            rel="noopener"
            class="book-detail-card__douban"
          >豆瓣</a>
          <a
            v-if="detailBook.weread"
            :href="detailBook.weread"
            target="_blank"
            rel="noopener"
            class="book-detail-card__weread"
          >微信读书</a>
          <!-- 思维导图入口：主题紫胶囊（站内功能用主题色，区别于三平台品牌色）；
               yaml 有 mindmap 字段才渲染；点击开全屏导图工作台（详情卡保持开着） -->
          <button
            v-if="detailBook.mindmap"
            type="button"
            class="book-detail-card__mindmap"
            @click="openBookMindmap(detailBook)"
          >🧠 思维导图</button>
        </div>
      </div>
    </div>
    <!-- 滚动区（思维导图按钮之下的内容）：这本书的章节文章 / 读书笔记（来自书的 dir 目录），
         条目多时在此内部滚动；PostLink 点击唤出右滑覆盖层（z-index 100 > 详情卡 90），
         读完文章回来详情卡仍在原位 -->
    <div v-if="detailBook.docs?.length" class="book-detail-card__scroll">
      <PostLink
        v-for="doc in detailBook.docs"
        :key="doc.url"
        :to="doc.url"
        class="book-detail-card__doc-link"
      >
        📄 {{ doc.title }}
      </PostLink>
    </div>
  </div>
</Teleport>

<!-- 全屏思维导图工作台：详情卡「思维导图」按钮触发（mindmapBook 非空即打开）；
     BookMindmap 全局注册组件，内部自己 fetch 导图 md 并用 markmap 渲染 -->
<BookMindmap :book="mindmapBook" @close="mindmapBook = null" />

<!-- 一个 yaml 都没有时的兜底提示 -->
<p v-if="!topics.length" class="empty-state">书单还在筹备中…</p>
