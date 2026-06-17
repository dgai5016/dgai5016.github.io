---
layout: page
---

<script setup>
import { data as posts } from '../.vitepress/posts.data'
import { data as tags } from '../.vitepress/tags.data'
import TagCloud from '../.vitepress/theme/components/TagCloud.vue'
import PostList from '../.vitepress/theme/components/PostList.vue'
import { ref, computed } from 'vue'

const activeTag = ref('')
const filtered = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter(p => p.tags.includes(activeTag.value))
})
</script>

<h1 class="page-title">标签</h1>

<TagCloud :tags="tags" :active-tag="activeTag" @select="(t) => activeTag = activeTag === t ? '' : t" />

<div style="margin-top: 2rem">
  <PostList :posts="filtered" />
</div>
