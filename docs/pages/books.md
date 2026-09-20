---
layout: page
---

<script setup>
// 书单数据来自 docs/books/*.yaml，由 books.data.ts 在构建期自动发现并解析
import { data as topics } from '../.vitepress/books.data'
import { ref, onMounted, onUnmounted } from 'vue'

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

// ===== 悬浮 1 秒的轻量预览卡（hover card，可停留） =====
// 停在卡片上 1s → 在卡片旁弹出小预览（毛玻璃、不遮屏、不锁滚动）；
// 鼠标从卡片移到预览卡上 → 预览保持不消失（离开预览卡才消失），
// 卡片与预览卡之间的 12px 间隙用「离开卡片先延迟 250ms 再隐藏」过渡；
// 胶囊链接 / 大图 / 笔记入口在全屏详情浮层（点击进）——
// 轻交互（hover 瞄一眼）和重交互（点击看详情拿链接）各司其职
const hoverBook = ref(null)
const hoverPos = ref({ x: 0, y: 0 }) // 预览卡左上角的 fixed 视口坐标

let hoverTimer = null // 显示延迟：进入卡片 1s 后弹出预览
let hoverHideTimer = null // 隐藏延迟：离开卡片 250ms 内没到预览卡上才真隐藏

// 鼠标进入卡片：清掉一切挂起状态（含旧预览），重新计 1s
function startHoverTimer(book, e) {
  clearHover()
  // 同步取出触发元素再进闭包——事件的 currentTarget 在传播结束后会被置 null，
  // 直接把 e 存进定时器回调里 1s 后取到的是 null（书墙是静态列表，元素必然还在）
  const el = e.currentTarget
  hoverTimer = setTimeout(() => showHoverCard(book, el), 1000)
}

// 在卡片旁定位并显示预览卡：默认放卡片右侧，右侧空间不够（最右列）时翻转到左侧；
// 垂直方向顶部对齐卡片，底部出视口时上提
function showHoverCard(book, el) {
  const r = el.getBoundingClientRect()
  const W = 340 // 预览卡宽度（与 CSS .book-hover-card 的 width 保持一致）
  const gap = 12
  const flip = r.right + gap + W > window.innerWidth - 8
  hoverPos.value = {
    x: flip ? r.left - gap - W : r.right + gap,
    y: Math.max(8, Math.min(r.top, window.innerHeight - 340)), // 340 ≈ 含胶囊/笔记的预览卡高度上限估值
  }
  hoverBook.value = book
}

// 鼠标离开卡片：没到点的显示定时器直接取消（不想看了）；
// 已显示的预览延迟 250ms 再隐藏——给鼠标穿过 12px 间隙移到预览卡上留时间
function scheduleHoverHide() {
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  if (hoverBook.value && !hoverHideTimer) {
    hoverHideTimer = setTimeout(() => {
      hoverHideTimer = null
      hoverBook.value = null
    }, 250)
  }
}

// 鼠标移到预览卡上：取消挂起的隐藏，预览保持（用户在读它）
function keepHover() {
  if (hoverHideTimer) {
    clearTimeout(hoverHideTimer)
    hoverHideTimer = null
  }
}

// 鼠标离开预览卡：立即隐藏（阅读结束）
function hideHoverNow() {
  keepHover()
  hoverBook.value = null
}

// 点击进全屏 / 页面卸载：全清
function clearHover() {
  keepHover()
  if (hoverTimer) {
    clearTimeout(hoverTimer)
    hoverTimer = null
  }
  hoverBook.value = null
}

// 浮层里的高清封面：按命名约定取 <slug>-full.jpg（网格缩略图只有 144px 高，直接放大会糊）；
// 没抓到真实封面的书（无 cover 字段、卡片上用 svg 兜底图）没有 full 版，预览卡里继续用兜底图原样展示
function fullCover(book) {
  return book.cover ? book.cover.replace('.jpg', '-full.jpg') : DEFAULT_COVER
}

// 全局按 Esc 收起预览卡（键盘兜底；主关闭途径仍是鼠标移开）
function onHoverKeydown(e) {
  if (e.key === 'Escape') hideHoverNow()
}
onMounted(() => window.addEventListener('keydown', onHoverKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onHoverKeydown)
  clearHover() // 页面卸载时清掉可能挂着的悬浮定时器
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
          @click="showHoverCard(book, $event.currentTarget)"
          @mouseenter="startHoverTimer(book, $event)"
          @mouseleave="scheduleHoverHide()"
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

<!-- 悬浮预览卡（hover card）：停在卡片 2s 后出现在卡片旁的轻量毛玻璃卡；
     纯展示（pointer-events:none，鼠标可穿过它继续扫书墙），离开触发卡片即消失；
     点击卡片进全屏详情浮层（京东/豆瓣/微信读书胶囊和笔记链接都在那边）。
     ⚠ 本段内部不能出现空行——markdown 会把「空行 + 缩进≥4空格」解析成缩进代码块 -->
<Teleport to="body">
  <div
    v-if="hoverBook"
    class="book-hover-card"
    :style="{ left: hoverPos.x + 'px', top: hoverPos.y + 'px' }"
    @mouseenter="keepHover()"
    @mouseleave="hideHoverNow()"
  >
    <!-- 左：高清封面（-full.jpg 命名约定，缩到 96px 依然锐利） -->
    <img class="book-hover-card__cover" :src="fullCover(hoverBook)" :alt="`${hoverBook.title} 封面`">
    <!-- 右：书名 + 读完徽章 + 元信息 + 三平台胶囊 + 笔记链接 -->
    <div class="book-hover-card__info">
      <span class="book-hover-card__title">{{ hoverBook.title }}</span>
      <span v-if="hoverBook.isRead" class="book-hover-card__status">读完</span>
      <span v-if="metaText(hoverBook)" class="book-hover-card__meta">{{ metaText(hoverBook) }}</span>
      <!-- 购买/阅读入口胶囊：有哪个平台渲染哪个（新标签页打开），停在预览卡上即可点击 -->
      <div class="book-hover-card__links">
        <a
          v-if="hoverBook.jd"
          :href="hoverBook.jd"
          target="_blank"
          rel="noopener"
          class="book-hover-card__jd"
        >京东</a>
        <a
          v-if="hoverBook.douban"
          :href="hoverBook.douban"
          target="_blank"
          rel="noopener"
          class="book-hover-card__douban"
        >豆瓣</a>
        <a
          v-if="hoverBook.weread"
          :href="hoverBook.weread"
          target="_blank"
          rel="noopener"
          class="book-hover-card__weread"
        >微信读书</a>
      </div>
      <!-- 这本书的专属文档（读书笔记 / 大纲等，来自书的 dir 目录）：
           PostLink 点击唤出右滑覆盖层（z-index 100 > 预览卡 90），
           点击后鼠标移向覆盖层，预览卡因 mouseleave 自然收起 -->
      <div v-if="hoverBook.docs?.length" class="book-hover-card__docs">
        <PostLink
          v-for="doc in hoverBook.docs"
          :key="doc.url"
          :to="doc.url"
          class="book-hover-card__doc-link"
        >
          📄 {{ doc.title }}
        </PostLink>
      </div>
    </div>
  </div>
</Teleport>

<!-- 一个 yaml 都没有时的兜底提示 -->
<p v-if="!topics.length" class="empty-state">书单还在筹备中…</p>
