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
  <div class="flex flex-wrap gap-2">
    <button
      v-for="tag in tags"
      :key="tag.name"
      @click="$emit('select', tag.name)"
      :class="[
        'px-3 py-1.5 rounded-full text-sm transition-all',
        activeTag === tag.name
          ? 'bg-accent text-white shadow-md'
          : 'glass-card hover:text-accent'
      ]"
    >
      {{ tag.name }}
      <span class="ml-1 text-xs opacity-60">{{ tag.count }}</span>
    </button>
  </div>
</template>
