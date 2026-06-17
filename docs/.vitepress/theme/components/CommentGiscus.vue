<script setup lang="ts">
import { useData } from 'vitepress'
import Giscus from '@giscus/vue'

const { isDark } = useData()
</script>

<template>
  <div class="comment-section">
    <Giscus
      repo="dgai5016/dgai5016.github.io"
      repoId=""
      category="Comments"
      categoryId=""
      mapping="pathname"
      :theme="isDark ? 'dark' : 'light'"
      lang="zh-CN"
    />
  </div>
</template>

<style scoped>
.comment-section {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
