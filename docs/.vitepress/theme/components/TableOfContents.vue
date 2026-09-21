<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import { computed, ref, onMounted, onUnmounted, watch } from 'vue'

const { page } = useData()
const route = useRoute()

// VitePress 的 page.headers 是嵌套树:H3 挂在 H2 的 children 里,
// 只过滤顶层数组的话 H3 永远取不到(目录只剩大标题)——这里拍平:
// 顺序为 H2、其 children 中的 H3、下一个 H2 …
const headings = computed(() => {
  const out: any[] = []
  for (const h of page.value.headers || []) {
    if (h.level === 2) {
      out.push(h)
      for (const c of h.children || []) {
        if (c.level === 3) out.push(c)
      }
    } else if (h.level === 3) {
      out.push(h) // 顶层裸 H3(无前置 H2)的情况
    }
  }
  return out
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
    // top/left 必须用「视口坐标 + 当前滚动量」还原成文档绝对坐标：
    // fixed 的 top 是视口坐标，若直接写 rect.top，重算发生在页面已滚动时
    // （HMR 更新文章 / 滚动中切路由触发 watch）会把 TOC 钉死在错误的瞬时高度
    top: `${contentRect.top + window.scrollY}px`,
    left: `${sidebarRect.left + window.scrollX}px`,
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
