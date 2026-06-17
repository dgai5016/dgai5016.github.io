<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'

const { page } = useData()
const route = useRoute()

const headings = computed(() => {
  return (page.value.headers || []).filter(
    (h: any) => h.level === 2 || h.level === 3
  )
})

const activeId = ref('')
const navStyle = ref<Record<string, string>>({})

function positionToc() {
  if (import.meta.env.SSR) return
  const contentCard = document.querySelector('.content-card')
  const sidebar = document.querySelector('.toc-sidebar')
  if (!contentCard || !sidebar) return
  const contentRect = contentCard.getBoundingClientRect()
  const sidebarRect = sidebar.getBoundingClientRect()
  navStyle.value = {
    position: 'fixed',
    top: `${contentRect.top}px`,
    left: `${sidebarRect.left}px`,
    width: `${sidebarRect.width}px`,
  }
}

function onScroll() {
  if (import.meta.env.SSR) return
  const els = headings.value.map((h: any) => document.getElementById(h.slug)).filter(Boolean) as HTMLElement[]
  const scrollY = window.scrollY + 100
  let current = ''
  for (const el of els) {
    if (el.offsetTop <= scrollY) current = el.id
  }
  activeId.value = current
}

onMounted(() => {
  setTimeout(positionToc, 100)
  window.addEventListener('scroll', onScroll)
  window.addEventListener('resize', positionToc)
})

watch(() => route.path, () => setTimeout(positionToc, 100))

watch(headings, (val) => {
  if (val.length) setTimeout(positionToc, 100)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', positionToc)
})
</script>

<template>
  <nav v-if="headings.length" class="toc-nav" :style="navStyle">
    <div class="toc-container glass-card">
      <h4 class="toc-heading">目录</h4>
      <ul class="toc-list">
        <li v-for="h in headings" :key="h.slug">
          <a
            :href="`#${h.slug}`"
            :class="[
              'toc-link',
              h.level === 3 ? 'toc-link-h3' : '',
              activeId === h.slug ? 'toc-link-active' : 'toc-link-default'
            ]"
          >
            {{ h.title }}
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
.toc-nav {
  max-height: calc(100vh - 2rem);
  overflow-y: auto;
}

.toc-container {
  border-radius: 0.75rem;
  padding: 1rem;
}

.toc-heading {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-muted);
  margin-bottom: 0.75rem;
  letter-spacing: 0.05em;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.875rem;
}

.toc-list li {
  margin-bottom: 0.375rem;
}

.toc-list li:last-child {
  margin-bottom: 0;
}

.toc-link {
  display: block;
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
}

.toc-link-h3 {
  padding-left: 0.75rem;
}

.toc-link-active {
  color: var(--c-accent);
  font-weight: 500;
}

.toc-link-default {
  color: var(--c-text-secondary);
}

.toc-link-default:hover {
  color: var(--c-text-primary);
}
</style>
