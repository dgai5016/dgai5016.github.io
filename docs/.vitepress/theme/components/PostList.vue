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
    <h2 v-if="title" class="text-2xl font-bold mb-6 text-text-primary">
      {{ title }}
    </h2>
    <div v-if="posts.length" class="grid gap-4 sm:grid-cols-2">
      <PostCard v-for="post in posts" :key="post.url" :post="post" />
    </div>
    <p v-else class="text-text-muted text-center py-12">暂无文章</p>
  </section>
</template>
