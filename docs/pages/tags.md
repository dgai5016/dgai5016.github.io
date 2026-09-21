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
  // 教程子文章（hidden）已内嵌进主文章的学习地图，标签页列表不再单独展示——
  // 与标签云计数（tags.data.ts）规则一致：计数 1 篇、点进去也只有 1 篇，不自相矛盾
  const visible = posts.filter(p => !p.hidden)
  if (!activeTag.value) return visible
  return visible.filter(p => p.tags.includes(activeTag.value))
})
</script>

<h1 class="page-title">标签</h1>

<TagCloud :tags="tags" :active-tag="activeTag" @select="(t) => activeTag = activeTag === t ? '' : t" />

<div style="margin-top: 2rem">
  <PostList :posts="filtered" />
</div>
