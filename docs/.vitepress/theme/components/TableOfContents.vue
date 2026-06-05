<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref, onMounted, onUnmounted } from 'vue'

const data = useData()

const headings = computed(() => {
  const toc = data.toc?.value
  if (!toc) return []
  return (toc.items || []).filter((h: any) => h.level === 2 || h.level === 3)
})

const activeId = ref('')

function onScroll() {
  if (!import.meta.env.SSR) {
    const els = headings.value.map((h: any) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[]
    const scrollY = window.scrollY + 100
    let current = ''
    for (const el of els) {
      if (el.offsetTop <= scrollY) current = el.id
    }
    activeId.value = current
  }
}

onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <nav v-if="headings.length" class="sticky top-24">
    <h4 class="text-xs font-semibold uppercase text-text-dark-muted mb-3 tracking-wider">
      目录
    </h4>
    <ul class="space-y-1.5 text-sm">
      <li v-for="h in headings" :key="h.id">
        <a
          :href="`#${h.id}`"
          :class="[
            'block transition-colors truncate',
            h.level === 3 ? 'pl-3' : '',
            activeId === h.id ? 'text-accent font-medium' : 'text-text-dark-muted hover:text-text-dark'
          ]"
        >
          {{ h.text }}
        </a>
      </li>
    </ul>
  </nav>
</template>
