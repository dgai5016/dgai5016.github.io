---
layout: page
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'
import { data as categories } from '../.vitepress/categories.data'
import PostCard from '../.vitepress/theme/components/PostCard.vue'
import { ref, computed } from 'vue'

const activeCategory = ref('')
const filtered = computed(() => {
  if (!activeCategory.value) return posts
  return posts.filter(p => p.category === activeCategory.value)
})
</script>

<h1 class="text-3xl font-bold mb-8 text-text-primary">分类</h1>

<div class="flex flex-wrap gap-2 mb-8">
  <button
    @click="activeCategory = ''"
    :class="[
      'px-4 py-2 rounded-lg text-sm transition-all',
      !activeCategory ? 'bg-accent text-white shadow-md' : 'glass-card text-text-secondary hover:text-accent'
    ]"
  >
    全部
  </button>
  <button
    v-for="cat in categories"
    :key="cat.slug"
    @click="activeCategory = activeCategory === cat.slug ? '' : cat.slug"
    :class="[
      'px-4 py-2 rounded-lg text-sm transition-all',
      activeCategory === cat.slug ? 'bg-accent text-white shadow-md' : 'glass-card text-text-secondary hover:text-accent'
    ]"
  >
    {{ cat.name }}
    <span class="ml-1 text-xs opacity-60">{{ cat.count }}</span>
  </button>
</div>

<div v-if="filtered.length" class="grid gap-4 sm:grid-cols-2">
  <PostCard v-for="post in filtered" :key="post.url" :post="post" />
</div>
<p v-else class="text-text-muted text-center py-12">暂无文章</p>
