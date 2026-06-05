---
layout: page
---

<script setup>
import { data as posts } from '.vitepress/posts.data'
import { data as tags } from '.vitepress/tags.data'
import PostCard from '.vitepress/theme/components/PostCard.vue'
import TagCloud from '.vitepress/theme/components/TagCloud.vue'
import { ref, computed } from 'vue'

const activeTag = ref('')
const filtered = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter(p => p.tags.includes(activeTag.value))
})

function formatDate(date) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<div class="mb-8">
  <h2 class="text-2xl font-bold mb-2">最新文章</h2>
  <p class="text-text-dark-muted text-sm">共 {{ filtered.length }} 篇文章</p>
</div>

<TagCloud :tags="tags" :active-tag="activeTag" @select="(t) => activeTag = activeTag === t ? '' : t" />

<div class="mt-8 space-y-4">
  <a
    v-for="post in filtered"
    :key="post.url"
    :href="post.url"
    class="group block p-5 rounded-xl bg-bg-dark-card border border-white/5
      hover:border-accent/30 transition-all glow-hover"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1 min-w-0">
        <h3 class="text-lg font-semibold mb-1.5 text-text-dark group-hover:text-accent transition-colors">
          {{ post.title }}
        </h3>
        <p class="text-sm text-text-dark-muted mb-3 line-clamp-2">
          {{ post.excerpt }}
        </p>
        <div class="flex items-center gap-3 text-xs text-text-dark-muted">
          <span>{{ formatDate(post.date) }}</span>
          <span class="text-text-dark-muted/40">·</span>
          <div class="flex gap-1.5">
            <span
              v-for="tag in post.tags.slice(0, 3)"
              :key="tag"
              class="px-2 py-0.5 rounded-full bg-accent/10 text-accent"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </a>
</div>

<p v-if="!filtered.length" class="text-text-dark-muted text-center py-16">暂无文章</p>
