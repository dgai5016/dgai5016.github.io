---
layout: page
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'

function groupByYear(posts) {
  const groups = {}
  for (const post of posts) {
    const year = post.date ? new Date(post.date).getFullYear() : '未知'
    if (!groups[year]) groups[year] = []
    groups[year].push(post)
  }
  return Object.entries(groups).sort((a, b) => Number(b[0]) - Number(a[0]))
}

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { month: 'short', day: 'numeric' })
}

const groups = groupByYear(posts)
</script>

<h1 class="page-title">归档</h1>

<div v-for="[year, yearPosts] in groups" :key="year" class="archive-group">
  <h2 class="archive-year">{{ year }}</h2>
  <ul class="archive-list">
    <li v-for="post in yearPosts" :key="post.url" class="glass-card">
      <span class="archive-date">{{ formatDate(post.date) }}</span>
      <a :href="post.url" class="archive-link">{{ post.title }}</a>
      <span v-for="tag in post.tags.slice(0, 2)" :key="tag" class="tag-pill">
        {{ tag }}
      </span>
    </li>
  </ul>
</div>

<p v-if="!posts.length" class="empty-state">暂无文章</p>
