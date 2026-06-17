---
layout: page
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'
import { computed } from 'vue'

const tutorials = posts.filter(p => p.tags.includes('教程') && p.tutorial)

const tutorialMap = computed(() => {
  const map = new Map()
  for (const post of tutorials) {
    const s = post.tutorial
    if (!s || !s.name) continue
    if (!map.has(s.name)) {
      map.set(s.name, {
        name: s.name,
        excerpt: post.excerpt,
        date: post.date,
        firstUrl: Array.isArray(s.chapters) && s.chapters.length ? s.chapters[0].url : '#'
      })
    }
  }
  return Array.from(map.values())
})
</script>

<div class="tutorial-grid">
  <h1 class="page-title">教程</h1>

  <div v-if="tutorialMap.length">
    <a
      v-for="tutorial in tutorialMap"
      :key="tutorial.name"
      :href="tutorial.firstUrl"
      class="glass-card tutorial-card"
    >
      <h2 class="tutorial-card-title">{{ tutorial.name }}</h2>
      <p class="tutorial-card-excerpt">{{ tutorial.excerpt }}</p>
    </a>
  </div>

  <div v-if="!tutorialMap.length" class="tutorial-empty">
    <p class="tutorial-empty-title">还没有教程</p>
    <p class="tutorial-empty-hint">在文章的 tags 中添加 <code>tutorial</code> 即可让它出现在这里。</p>
  </div>
</div>
