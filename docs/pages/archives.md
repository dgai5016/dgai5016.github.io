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

<h1 class="text-3xl font-bold mb-8 text-text-primary">归档</h1>

<div v-for="[year, yearPosts] in groups" :key="year" class="mb-10">
  <h2 class="text-xl font-bold text-accent mb-4">{{ year }}</h2>
  <ul class="space-y-2">
    <li v-for="post in yearPosts" :key="post.url" class="flex items-center gap-4">
      <span class="text-sm text-text-muted w-20 shrink-0">{{ formatDate(post.date) }}</span>
      <a :href="post.url" class="text-text-primary hover:text-accent transition-colors truncate">
        {{ post.title }}
      </a>
      <span v-for="tag in post.tags.slice(0, 2)" :key="tag"
        class="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs shrink-0">
        {{ tag }}
      </span>
    </li>
  </ul>
</div>

<p v-if="!posts.length" class="text-text-muted text-center py-12">暂无文章</p>
