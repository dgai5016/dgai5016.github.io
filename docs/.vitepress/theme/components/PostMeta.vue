<script setup lang="ts">
defineProps<{
  date: string
  tags?: string[]
  category?: string
}>()

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-3 text-sm text-text-dark-muted">
    <span>{{ formatDate(date) }}</span>
    <span v-if="category" class="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-xs">
      {{ category }}
    </span>
    <span v-for="tag in (tags || [])" :key="tag" class="px-2 py-0.5 rounded-full bg-bg-dark-surface text-xs">
      #{{ tag }}
    </span>
  </div>
</template>
