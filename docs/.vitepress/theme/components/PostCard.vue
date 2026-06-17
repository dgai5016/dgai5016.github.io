<script setup lang="ts">
import type { Post } from '../posts.data'

defineProps<{
  post: Post
}>()

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <a
    :href="post.url"
    class="post-card"
  >
    <h3 class="post-card-title">
      {{ post.title }}
    </h3>
    <p class="post-card-excerpt">
      {{ post.excerpt }}
    </p>
    <div class="post-card-meta">
      <span>{{ formatDate(post.date) }}</span>
      <div class="post-card-tags">
        <span
          v-for="tag in post.tags.slice(0, 3)"
          :key="tag"
          class="tag-pill"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<style scoped>
.post-card {
  display: block;
  padding: 1.25rem;
  border-radius: 0.75rem;
  text-decoration: none;
  transition: background-color 0.2s ease, box-shadow 0.2s ease;
}

.post-card-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.375rem;
  color: var(--c-text-primary);
  transition: color 0.2s ease;
}

.post-card:hover .post-card-title {
  color: var(--c-accent);
}

.post-card-excerpt {
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  margin-bottom: 0.75rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--c-text-muted);
}

.post-card-tags {
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.post-card-tags .tag-pill {
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--c-accent);
  background: color-mix(in srgb, var(--c-accent) 10%, transparent);
}
</style>
