---
layout: page
---

<script setup>
// 书单数据来自 docs/books/*.yaml，由 books.data.ts 在构建期自动发现并解析
import { data as topics } from '../.vitepress/books.data'
import { ref } from 'vue'

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
        <!-- 最左：序号（主题内从 1 开始） -->
        <span class="book-item__index">{{ index + 1 }}.</span>
        <!-- 中间：书名 + 作者同行展示（窄屏时作者自动换行） -->
        <div class="book-item__main">
          <!-- 有豆瓣链接的书名渲染成链接（新标签页打开），没有的保持纯文本 -->
          <a
            v-if="book.douban"
            :href="book.douban"
            target="_blank"
            rel="noopener"
            class="book-item__title book-item__title--link"
          >{{ book.title }}</a>
          <span v-else class="book-item__title">{{ book.title }}</span>
          <span v-if="book.author" class="book-item__author">{{ book.author }}</span>
        </div>
        <!-- 右侧：只有读完的书才显示绿色胶囊，未读完不显示任何状态 -->
        <span v-if="book.status" class="book-status-pill">{{ book.status }}</span>
      </li>
    </ul>
    <p v-else class="book-drawer__empty">这个主题还没有书目</p>
  </div>
</div>

<!-- 一个 yaml 都没有时的兜底提示 -->
<p v-if="!topics.length" class="empty-state">书单还在筹备中…</p>
