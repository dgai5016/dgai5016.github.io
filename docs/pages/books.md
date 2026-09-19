---
layout: page
---

<script setup>
// 书单数据来自 docs/books/*.yaml，由 books.data.ts 在构建期自动发现并解析
import { data as topics } from '../.vitepress/books.data'
import { ref, onMounted, onUnmounted } from 'vue'

// 通用兜底封面：没抓到真实封面的书统一显示这张占位图（SVG 自绘，存在 public/covers/books/ 下）
const DEFAULT_COVER = '/covers/books/default-cover.svg'

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
  return parts.join(' · ')
}

// ===== 书籍详情浮层：点任意书籍卡片打开 =====
// 网格卡片（一行十本）放不下完整元信息和购买/阅读胶囊，统一收进这个浮层展示。
// activeBook 为 null 时浮层关闭；存整本书对象时打开。
const activeBook = ref(null)

// 打开浮层前记住页面滚动位置并锁住底层滚动（对齐 PostOverlay 的做法），关闭时还原，
// 防止浮层后面页面跟着滚、关掉后跳位置
let savedScroll = 0

// 打开详情浮层（点网格卡片触发）
function openBookDetail(book) {
  savedScroll = window.scrollY
  document.body.style.overflow = 'hidden'
  activeBook.value = book
}

// 关闭详情浮层（Esc / 点遮罩 / 点右上角 × 都走这里）：解锁底层滚动并还原到打开前的位置
function closeBookDetail() {
  activeBook.value = null
  document.body.style.overflow = ''
  window.scrollTo(0, savedScroll)
}

// 浮层里的高清封面：按命名约定取 <slug>-full.jpg（网格缩略图只有 144px 高，直接放大会糊）；
// 没抓到真实封面的书（无 cover 字段、卡片上用 svg 兜底图）没有 full 版，浮层里继续用兜底图原样展示
function fullCover(book) {
  return book.cover ? book.cover.replace('.jpg', '-full.jpg') : DEFAULT_COVER
}

// 全局按 Esc 也能关浮层（挂在 window 上，页面卸载时记得清理监听）
function onDetailKeydown(e) {
  if (e.key === 'Escape' && activeBook.value) closeBookDetail()
}
onMounted(() => window.addEventListener('keydown', onDetailKeydown))
onUnmounted(() => window.removeEventListener('keydown', onDetailKeydown))
</script>

<h1 class="page-title">书单</h1>

<!-- 每个读书主题一张毛玻璃卡片（glass-card 提供底子），主题不做折叠、全部常开展示 -->
<div v-for="topic in topics" :key="topic.id" class="book-drawer glass-card">
  <!-- 主题标题栏：主题名 + 本数（纯展示，无折叠交互） -->
  <div class="book-drawer__header">
    <span class="book-drawer__name">{{ topic.name }}</span>
    <span class="book-drawer__count">{{ topic.books.length }} 本</span>
  </div>

  <!-- 主题内容：书籍网格墙（桌面端一行十本，上封面下信息） -->
  <div class="book-drawer__body">
    <ul v-if="topic.books.length" class="book-grid">
      <li v-for="(book, index) in topic.books" :key="book.title">
        <!-- 单本书卡片：整卡可点，打开详情浮层看完整信息和购买/阅读入口；
             用 button 承载点击语义（type=button 防止被当成表单提交按钮）；
             卡片上的封面用 144px 高缩略图（与显示尺寸基本 1:1），width/height 属性
             配合占位框 aspect-ratio 防止图片加载引起布局抖动；
             isRead 的书加 --finished 修饰类：封面保持彩色 + 右上角对勾，
             未读的书由 CSS 把封面和文字整体灰掉（读书进度的「点亮」隐喻） -->
        <button
          type="button"
          class="book-card"
          :class="{ 'book-card--finished': book.isRead }"
          :aria-label="`查看 ${book.title} 详情`"
          @click="openBookDetail(book)"
        >
          <!-- 封面占位框：竖版 2:3，relative 供「读完」对勾定位；
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
            <!-- 主题内序号：钉在封面左上角的白玻璃圆数字（与右上角的已读对勾对称）；
                 已读置顶后 1、2 号天然落在读完的书上 -->
            <span class="book-card__index">{{ index + 1 }}</span>
            <!-- 「已读完」对勾角标：钉在封面右上角的绿圆白勾（SVG 自绘，
                 跨平台渲染一致，不用 emoji）；语义文字「读完」保留在详情浮层里 -->
            <span v-if="book.isRead" class="book-card__status" role="img" aria-label="已读完">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
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

<!-- 书籍详情浮层（Teleport 挂到 body 避免被父级层级/裁切影响）：
     点卡片打开——左高清封面、右完整信息 + 京东/豆瓣/微信读书胶囊 + 读书笔记链接；
     点遮罩任意处、按 Esc 或点右上角 × 关闭；
     内容卡片 @click.stop 拦住冒泡，点里面的胶囊/链接不会误触关闭。
     ⚠ 本段内部不能出现空行——markdown 会把「空行 + 缩进≥4空格」的嵌套元素
     解析成缩进代码块（整段被转义），模板因此缺结束标签而编译失败 -->
<Teleport to="body">
  <div v-if="activeBook" class="book-detail-overlay" @click="closeBookDetail">
    <div class="book-detail" role="dialog" aria-modal="true" @click.stop>
      <!-- 右上角关闭按钮（样式对齐 PostOverlay 的 overlay-close） -->
      <button
        type="button"
        class="book-detail__close"
        aria-label="关闭"
        @click="closeBookDetail"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="18" height="18">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <!-- 左：高清大封面（-full.jpg 命名约定，约 424×600） -->
      <img
        class="book-detail__cover"
        :src="fullCover(activeBook)"
        :alt="`${activeBook.title} 封面大图`"
      >
      <!-- 右：完整信息列 -->
      <div class="book-detail__info">
        <!-- 完整书名（不截断）+「读完」徽章同行 -->
        <div class="book-detail__title-row">
          <h2 class="book-detail__title">{{ activeBook.title }}</h2>
          <span v-if="activeBook.isRead" class="book-detail__status">读完</span>
        </div>
        <!-- 元信息一行：作者 著 / 译者 译 · 出版社 · N 页 · 出版年 -->
        <p v-if="metaText(activeBook)" class="book-detail__meta">{{ metaText(activeBook) }}</p>
        <!-- 购买/阅读入口胶囊：有哪个平台渲染哪个（新标签页打开） -->
        <div class="book-detail__links">
          <a
            v-if="activeBook.jd"
            :href="activeBook.jd"
            target="_blank"
            rel="noopener"
            class="book-detail__jd"
          >京东</a>
          <a
            v-if="activeBook.douban"
            :href="activeBook.douban"
            target="_blank"
            rel="noopener"
            class="book-detail__douban"
          >豆瓣</a>
          <a
            v-if="activeBook.weread"
            :href="activeBook.weread"
            target="_blank"
            rel="noopener"
            class="book-detail__weread"
          >微信读书</a>
        </div>
        <!-- 这本书的专属文档（读书笔记 / 大纲等，来自书的 dir 目录）；
             PostLink 点击唤出右滑覆盖层，其 z-index(100) 低于本浮层(999)，
             所以这里 @click 同步把浮层关掉（不动 body 滚动锁——覆盖层自己会接管），
             否则浮层会盖在文章覆盖层上面 -->
        <div v-if="activeBook.docs?.length" class="book-detail__docs">
          <PostLink
            v-for="doc in activeBook.docs"
            :key="doc.url"
            :to="doc.url"
            class="book-detail__doc-link"
            @click="activeBook = null"
          >
            📄 {{ doc.title }}
          </PostLink>
        </div>
      </div>
    </div>
  </div>
</Teleport>

<!-- 一个 yaml 都没有时的兜底提示 -->
<p v-if="!topics.length" class="empty-state">书单还在筹备中…</p>
