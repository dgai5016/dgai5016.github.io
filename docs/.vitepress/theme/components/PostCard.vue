<script setup lang="ts">
import type { Post } from '../posts.data'

defineProps<{
  post: Post
}>()

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <a
    :href="post.url"
    class="group block p-5 rounded-xl bg-bg-dark-card border border-white/5
      hover:border-accent/30 transition-all glow-hover"
  >
    <h3 class="text-lg font-semibold mb-2 text-text-dark group-hover:text-accent transition-colors">
      {{ post.title }}
    </h3>
    <p class="text-sm text-text-dark-muted mb-3 line-clamp-2">
      {{ post.excerpt }}
    </p>
    <div class="flex items-center justify-between text-xs text-text-dark-muted">
      <span>{{ formatDate(post.date) }}</span>
      <div class="flex gap-2 flex-wrap justify-end">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="px-2 py-0.5 rounded-full bg-accent/10 text-accent"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>
