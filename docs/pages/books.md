---
layout: page
---

<script setup>
// 书单数据来自 docs/books/*.yaml，由 books.data.ts 在构建期自动发现并解析
import { data as topics } from '../.vitepress/books.data'
import { ref, onMounted, onUnmounted } from 'vue'

// 各主题抽屉独立开合：键为主题 id，值为是否展开
const openMap = ref({})

// 默认展开第一个主题，其余收起
if (topics.length) {
  openMap.value[topics[0].id] = true
}

// 点击抽头切换该主题的展开状态（多个主题可同时展开）
function toggle(id) {
  openMap.value[id] = !openMap.value[id]
}

// 通用兜底封面：没抓到真实封面的书统一显示这张占位图（SVG 自绘，存在 public/covers/books/ 下）
const DEFAULT_COVER = '/covers/books/default-cover.svg'

// 把作者/译者/出版社/页数/出版时间拼成一行元信息，如「黄佳 著 · 人民邮电出版社 · 254 页 · 2023-06」；
// 翻译书作者与译者用「 / 」衔接，如「艾德勒 著 / 郝明义 译 · 商务印书馆 · 376 页 · 2004-01」；
// 缺哪段就跳过哪段，全缺返回空串（页面上就不渲染这一行）
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

// ===== 封面灯箱：点击封面放大看高清图 =====
// zoomedCover 为 null 时灯箱关闭；存 { src, alt } 时打开
const zoomedCover = ref(null)

// 打开灯箱：高清图按命名约定取 <slug>-full.jpg（列表缩略图只有 144px 高，直接放大会糊）；
// svg 兜底占位图（没有真实封面的书）没有 full 版，点了也不开灯箱
function openCoverZoom(book) {
  if (!book.cover) return
  zoomedCover.value = {
    src: book.cover.replace('.jpg', '-full.jpg'),
    alt: `${book.title} 封面大图`,
  }
}

// 全局按 Esc 也能关灯箱（挂在 window 上，页面卸载时记得清理监听）
function onLightboxKeydown(e) {
  if (e.key === 'Escape') zoomedCover.value = null
}
onMounted(() => window.addEventListener('keydown', onLightboxKeydown))
onUnmounted(() => window.removeEventListener('keydown', onLightboxKeydown))
</script>

<h1 class="page-title">书单</h1>

<!-- 每个读书主题一个抽屉（glass-card 提供毛玻璃底子） -->
<div v-for="topic in topics" :key="topic.id" class="book-drawer glass-card">
  <!-- 抽头：主题名 + 本数 + 旋转箭头，点击切换展开 -->
  <button
    class="book-drawer__header"
    :aria-expanded="!!openMap[topic.id]"
    @click="toggle(topic.id)"
  >
    <span class="book-drawer__name">{{ topic.name }}</span>
    <span class="book-drawer__count">{{ topic.books.length }} 本</span>
    <svg
      class="book-drawer__chevron"
      :class="{ 'book-drawer__chevron--open': openMap[topic.id] }"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <!-- 展开后的内容：书籍列表（一行一本书） -->
  <div v-if="openMap[topic.id]" class="book-drawer__body">
    <ul v-if="topic.books.length" class="book-list">
      <li v-for="(book, index) in topic.books" :key="book.title" class="book-item">
        <!-- 最左：封面缩略图（竖版 2:3 小图，尺寸由 CSS 定）；
             每本书都渲染——有真实封面用真实图，没抓到的用通用兜底占位图；
             width/height 属性与 CSS 尺寸一致，图片加载前先占住位防止布局抖动；
             点击打开灯箱看高清大图（兜底 svg 没有 full 版，点击不开） -->
        <img
          class="book-item__cover"
          :src="book.cover || DEFAULT_COVER"
          :alt="`${book.title} 封面`"
          width="32"
          height="48"
          loading="lazy"
          decoding="async"
          @click="openCoverZoom(book)"
        >
        <!-- 封面右侧：序号（主题内从 1 开始） -->
        <span class="book-item__index">{{ index + 1 }}.</span>
        <!-- 中间：书名 + 元信息同行展示（窄屏时元信息自动换行） -->
        <div class="book-item__main">
          <!-- 书名纯文本展示（购买/评分/阅读入口统一收在行右侧的京东/豆瓣/微信读书胶囊，不在书名上做链接） -->
          <span class="book-item__title">{{ book.title }}</span>
          <!-- 阅读状态小标签：只有读完的书才有，紧贴书名右上角上浮（区别于右侧的购买/阅读胶囊） -->
          <span v-if="book.status" class="book-item__status">{{ book.status }}</span>
          <!-- 元信息一行：作者 著 / 译者 译 · 出版社 · 出版时间 -->
          <span v-if="metaText(book)" class="book-item__meta">{{ metaText(book) }}</span>
        </div>
        <!-- 右侧：京东购买入口（小红胶囊，新标签页打开商品页） -->
        <a
          v-if="book.jd"
          :href="book.jd"
          target="_blank"
          rel="noopener"
          class="book-item__jd"
        >京东</a>
        <!-- 右侧：豆瓣条目入口（豆瓣绿胶囊，排在京东之后；看评分/书评用，豆瓣未收录的书不显示） -->
        <a
          v-if="book.douban"
          :href="book.douban"
          target="_blank"
          rel="noopener"
          class="book-item__douban"
        >豆瓣</a>
        <!-- 右侧：微信读书线上阅读入口（绿胶囊，排在京东/豆瓣之后；书没上架微信读书就不显示） -->
        <a
          v-if="book.weread"
          :href="book.weread"
          target="_blank"
          rel="noopener"
          class="book-item__weread"
        >微信读书</a>
        <!-- 底部第二行：这本书的专属文档（读书笔记 / 大纲等，来自书的 dir 目录）；
             必须是 li 的最后一个子元素——配合 flex-wrap 换到书名行下方整行展示；
             用站内文章链接组件 PostLink：点击在当前页唤出右滑覆盖层阅读，不离开书单页 -->
        <div v-if="book.docs?.length" class="book-item__docs">
          <PostLink v-for="doc in book.docs" :key="doc.url" :to="doc.url" class="book-item__doc-link">
            📄 {{ doc.title }}
          </PostLink>
        </div>
      </li>
    </ul>
    <p v-else class="book-drawer__empty">这个主题还没有书目</p>
  </div>
</div>

<!-- 封面灯箱：点封面打开高清大图（Teleport 挂到 body 避免被父级层级/裁切影响）；
     点遮罩任意处或按 Esc 关闭 -->
<Teleport to="body">
  <div v-if="zoomedCover" class="book-cover-lightbox" @click="zoomedCover = null">
    <img :src="zoomedCover.src" :alt="zoomedCover.alt">
  </div>
</Teleport>

<!-- 一个 yaml 都没有时的兜底提示 -->
<p v-if="!topics.length" class="empty-state">书单还在筹备中…</p>
