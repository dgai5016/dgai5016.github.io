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
  <section>
    <h2 class="text-xl font-bold mb-6 text-text-dark">标签</h2>
    <div class="flex flex-wrap gap-2">
      <button
        v-for="tag in tags"
        :key="tag.name"
        @click="$emit('select', tag.name)"
        :class="[
          'px-3 py-1.5 rounded-full text-sm transition-all',
          activeTag === tag.name
            ? 'bg-accent text-white'
            : 'bg-bg-dark-surface text-text-dark-muted hover:text-accent hover:bg-accent/10'
        ]"
      >
        {{ tag.name }}
        <span class="ml-1 text-xs opacity-70">{{ tag.count }}</span>
      </button>
    </div>
  </section>
</template>
