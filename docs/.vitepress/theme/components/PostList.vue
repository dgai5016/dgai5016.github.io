<script setup lang="ts">
import type { Post } from '../posts.data'
import PostCard from './PostCard.vue'

defineProps<{
  posts: Post[]
  title?: string
}>()
</script>

<template>
  <section>
    <h2 v-if="title" class="section-title">
      {{ title }}
    </h2>
    <div v-if="posts.length" class="post-grid">
      <PostCard v-for="post in posts" :key="post.url" :post="post" />
    </div>
    <p v-else class="empty-message">暂无文章</p>
  </section>
</template>

<style scoped>
.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--c-text-primary);
}

.post-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .post-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.empty-message {
  color: var(--c-text-muted);
  text-align: center;
  padding: 3rem 0;
}
</style>
