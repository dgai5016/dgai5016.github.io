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

// —— 目录钉位：量一次初始位置，滚动全程不动 ——
// sticky 的 top 若写死（如 2rem），滚动时目录会从「卡片顶」跳到视口顶，产生位移。
// 这里 JS 量出目录初始的文档坐标 top（= 卡片顶到文档顶的距离，随标题行数变化），
// 写成 inline top：sticky 一旦生效就钉在这个视口高度上，视觉纹丝不动；
// 滚到文章末尾（外层 aside 拉伸区间的底部）sticky 释放，随页上移，不会压住页脚。
const stickyTop = ref('')

function measureStickyTop() {
  if (import.meta.env.SSR) return
  const nav = document.querySelector('.toc-nav') as HTMLElement | null
  if (!nav) return
  // 文档坐标 top：已钉住时 rect.top 是视口坐标，加回 scrollY 仍是同一个文档坐标，重复调用幂等
  stickyTop.value = `${Math.round(nav.getBoundingClientRect().top + window.scrollY)}px`
}

// 滚动高亮：滚过的最后一个标题即当前小节（scroll spy）。
// 只管 activeId，不管定位
const activeId = ref('')

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
  // 延迟 100ms 等 DOM 挂稳再量（沿用全站定位测量的惯例时序）
  setTimeout(measureStickyTop, 100)
  window.addEventListener('resize', measureStickyTop) // 标题换行等导致初始位置变化时重量
  window.addEventListener('scroll', onScroll)
  onScroll() // 首屏（如带 hash 直达）也能立即点亮对应小节
})

// 切换文章后目录初始位置随新标题行高变化，重量一次
watch(() => route.path, () => setTimeout(measureStickyTop, 100))

onUnmounted(() => {
  window.removeEventListener('resize', measureStickyTop)
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <nav v-if="headings.length" class="toc-nav" :style="stickyTop ? { top: stickyTop } : undefined">
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
/*
 * 定位：sticky + JS 量初始位（2026-09 定稿，此前经历 JS fixed → 纯 sticky 两版）。
 * - JS fixed 版：钉在视口里永不释放，滚到页底悬在页脚上，遮挡其他内容（已废弃）。
 * - 纯 sticky 版（top 写死 2rem）：滚动时目录从卡片顶跳到视口顶，有位移（dg 反馈「不要动」）。
 * - 现版：JS 量出初始文档坐标 top 写成 inline top，sticky 生效后钉在初始位置纹丝不动；
 *   滚动范围仍被外层 .toc-sidebar（grid 拉伸后与文章等高）框住，滚到文章末尾随页上移，不压页脚。
 * top: 2rem 仅为 JS 就绪前的兜底。祖先链无 overflow 拦截
 * （body 是 overflow-x: clip，不产生滚动容器，不影响 sticky）。
 */
.toc-nav {
  position: sticky;
  top: 2rem;
}

/* 滚动与高度上限都收在 .toc-container 上，
   让内容裁剪沿卡片自身圆角进行（外层矩形裁剪会切掉底部圆角）。
   高度上限固定 400px（2026-09 与 dg 对齐）：目录过长时不撑满视口，
   卡片内部滚动；sticky 到文章末尾随页面上移，不会压住页脚 */
.toc-container {
  border-radius: 0.75rem;
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
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
