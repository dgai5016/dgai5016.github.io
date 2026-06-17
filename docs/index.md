---
layout: page
---

<script setup>
import { data as posts } from '.vitepress/posts.data'
import { data as tags } from '.vitepress/tags.data'
import TagCloud from '.vitepress/theme/components/TagCloud.vue'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const searchQuery = ref('')
const activeTag = ref('')

const filtered = computed(() => {
  let result = posts
  if (activeTag.value) {
    result = result.filter(p => p.tags.includes(activeTag.value))
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase()
    result = result.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q) ||
      p.tags.some(t => t.toLowerCase().includes(q))
    )
  }
  return result
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

onMounted(() => {
  const saved = sessionStorage.getItem('dg-home-state')
  if (saved) {
    try {
      const { searchQuery: q, activeTag: t, scrollY: y } = JSON.parse(saved)
      if (q) searchQuery.value = q
      if (t) activeTag.value = t
      if (y) window.scrollTo(0, y)
    } catch {}
    sessionStorage.removeItem('dg-home-state')
  }
})

onBeforeUnmount(() => {
  if (searchQuery.value || activeTag.value) {
    sessionStorage.setItem('dg-home-state', JSON.stringify({
      searchQuery: searchQuery.value,
      activeTag: activeTag.value,
      scrollY: window.scrollY
    }))
  }
})
</script>

<div class="search-box">
  <div class="glass-card search-input-wrapper">
    <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="搜索文章..."
    />
    <button
      v-if="searchQuery"
      @click="searchQuery = ''"
      class="clear-btn"
    >
      <svg style="width:1rem;height:1rem" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
  <p class="search-count">共 {{ filtered.length }} 篇文章</p>
</div>

<TagCloud :tags="tags" :active-tag="activeTag" @select="(t) => activeTag = activeTag === t ? '' : t" />

<div class="home-post-list">
  <a
    v-for="post in filtered"
    :key="post.url"
    :href="post.url"
    class="glass-card home-post-card"
  >
    <h3 class="home-post-title">{{ post.title }}</h3>
    <p class="home-post-excerpt">{{ post.excerpt }}</p>
    <div class="home-post-meta">
      <span>{{ formatDate(post.date) }}</span>
      <span class="home-post-dot">·</span>
      <div class="home-post-tags">
        <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag-pill">
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</div>

<p v-if="!filtered.length" class="empty-state">没有找到匹配的文章</p>
