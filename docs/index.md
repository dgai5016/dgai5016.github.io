---
layout: page
---

<script setup>
import { data as posts } from '.vitepress/posts.data'
import { data as tags } from '.vitepress/tags.data'
import HeroSection from '.vitepress/theme/components/HeroSection.vue'
import PostList from '.vitepress/theme/components/PostList.vue'
import TagCloud from '.vitepress/theme/components/TagCloud.vue'
import { ref, computed } from 'vue'

const activeTag = ref('')
const filtered = computed(() => {
  if (!activeTag.value) return posts
  return posts.filter(p => p.tags.includes(activeTag.value))
})
</script>

<HeroSection />

<PostList :posts="filtered" title="最新文章" />

<div class="mt-12">
  <TagCloud :tags="tags" :active-tag="activeTag" @select="(t) => activeTag = activeTag === t ? '' : t" />
</div>
