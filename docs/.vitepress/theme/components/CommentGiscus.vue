<script setup lang="ts">
import { useData } from 'vitepress'
import Giscus from '@giscus/vue'

const { isDark } = useData()
</script>

<template>
  <div class="mt-8 pt-8 border-t border-white/5">
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
