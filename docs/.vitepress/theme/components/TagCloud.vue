<script setup lang="ts">
import type { TagInfo } from '../tags.data'

defineProps<{
  tags: TagInfo[]
  activeTag?: string
}>()

defineEmits<{
  select: [tag: string]
}>()
</script>

<template>
  <div class="tag-cloud">
    <button
      v-for="tag in tags"
      :key="tag.name"
      @click="$emit('select', tag.name)"
      :class="[
        'tag-btn',
        activeTag === tag.name ? 'tag-btn-active' : 'tag-btn-default'
      ]"
    >
      {{ tag.name }}
      <span class="tag-count">{{ tag.count }}</span>
    </button>
  </div>
</template>

<style scoped>
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-btn {
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.tag-btn-active {
  background: var(--c-accent);
  color: #fff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
}

.tag-btn-default {
  background: rgba(255, 255, 255, 0.8);
  color: var(--c-text-secondary);
}

.tag-btn-default:hover {
  color: var(--c-accent);
}

.tag-count {
  margin-left: 0.25rem;
  font-size: 0.75rem;
  opacity: 0.6;
}
</style>
