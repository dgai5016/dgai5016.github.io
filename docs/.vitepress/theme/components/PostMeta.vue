<script setup lang="ts">
defineProps<{
  date: string
  tags?: string[]
}>()

function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="post-meta">
    <span>{{ formatDate(date) }}</span>
    <span v-for="tag in (tags || [])" :key="tag" class="tag-pill">
      #{{ tag }}
    </span>
  </div>
</template>

<style scoped>
.post-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.875rem;
  color: var(--c-text-muted);
}

.post-meta .tag-pill {
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--c-accent);
  background: color-mix(in srgb, var(--c-accent) 10%, transparent);
}
</style>
