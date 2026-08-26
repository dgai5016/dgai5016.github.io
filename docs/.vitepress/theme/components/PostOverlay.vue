<script setup lang="ts">
// PostOverlay.vue
// 右侧滑出的文章覆盖层：在索引页点击概念链接时，
// 目标文章从右滑入、覆盖在当前页上，索引页保持挂载不动；关闭即回索引。
import { ref, shallowRef, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
// 复用全站文章数据（title/date/tags/url），避免重复解析 frontmatter
import { data as posts } from '../../posts.data'
// 代码块「全屏展开」按钮注入函数（与 Layout 共用同一份）
import { enhanceCodeBlocks } from '../utils/enhanceCodeBlocks'

const props = defineProps<{ url: string | null }>()
const emit = defineEmits<{ close: [] }>()

// 用 import.meta.glob 把所有文章 markdown 当 Vue 组件懒加载
// key 形如 '/posts/ai/neural-network.md'，按 url 后缀匹配，兼容前缀差异
// 书单页挂载的读书文档（/books/...）也一并纳入，书单页里的 PostLink 才能唤出覆盖层
const modules = import.meta.glob(['/posts/**/*.md', '/books/**/*.md'])

const bodyComp = shallowRef<any>(null)   // 目标文章正文的渲染组件
const loading = ref(false)
const scrollRef = ref<HTMLElement | null>(null) // 覆盖层滚动容器（切换文章时回顶）
const pageMeta = ref<any>(null) // 兜底元信息：书文档等不在 posts.data 里的页面，从模块 __pageData 取

// 从全站数据里取这篇的元信息（标题/日期/标签）。
// 注意两边 url 形态不同：posts.data 里带 .html 后缀，PostLink 传入前已剥掉，
// 必须归一化后再比较（直接严格相等永远匹配不上，覆盖层会丢失标题头）；
// posts.data 里查不到的页面（如书文档）退回用 pageMeta 兜底
const meta = computed(() => {
  if (!props.url) return null
  const norm = props.url.replace(/\.html$/, '').replace(/\/$/, '')
  return (
    posts.find((p) => p.url.replace(/\.html$/, '').replace(/\/$/, '') === norm) ||
    pageMeta.value
  )
})

function findLoader(url: string) {
  const norm = url.replace(/\.md$/, '').replace(/\/$/, '')
  // 优先精确匹配，退而求其次用后缀匹配（兼容 glob key 的不同前缀写法）
  const exact = Object.entries(modules).find(([k]) => k.replace(/\.md$/, '') === norm)
  if (exact) return exact[1]
  const suffix = Object.entries(modules).find(([k]) => k.replace(/\.md$/, '').endsWith(norm))
  return suffix?.[1]
}

// url 变化时，懒加载对应文章正文组件
watch(() => props.url, async (url) => {
  scrollRef.value?.scrollTo({ top: 0 }) // 切换文章回到顶部
  pageMeta.value = null // 切换文章时清掉上一篇的兜底元信息，防止串页
  if (!url) { bodyComp.value = null; return }
  loading.value = true
  bodyComp.value = null
  const loader = findLoader(url)
  if (loader) {
    const mod = await (loader as () => Promise<any>)()
    bodyComp.value = mod.default
    // VitePress 的 md 模块自带 __pageData（含 frontmatter），
    // 不在 posts.data 里的页面（书文档）用它拼出覆盖层头部需要的元信息
    const fm = mod.__pageData?.frontmatter
    if (fm?.title) {
      pageMeta.value = { title: fm.title, date: fm.date || '', tags: fm.tags }
    }
  }
  loading.value = false
  // 关键：loading 置 false 后，模板里 <component :is="bodyComp"/>（v-else-if）才渲染出正文与代码块。
  // 必须等它渲染完再注入展开按钮，否则此时 DOM 里还是「加载中」，找不到代码块。
  // 覆盖层正文随 props.url 切换、不触发 route.path 变化，Layout 的 watch 不会替它注入，故在此自行调用
  // （扫描范围限定到覆盖层滚动容器，避免重复处理主文章页的代码块）。
  await nextTick()
  if (scrollRef.value) enhanceCodeBlocks(scrollRef.value)
}, { immediate: true })

// Esc 关闭
function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape' || !props.url) return
  // 上层模态（代码全屏展开 .cb-backdrop / 图片预览 .lb-backdrop）打开时，Esc 优先交给它们，
  // 不要连带关闭覆盖层——防「一次 Esc 连关两层」。这也顺手修复了 ImageLightbox 从覆盖层打开时按 Esc 的同类双关问题。
  if (document.querySelector('.cb-backdrop, .lb-backdrop')) return
  emit('close')
}
let savedScroll = 0
// 锁底层滚动 + 记录/还原滚动位置（防止关闭后索引页跳回顶部）
watch(() => props.url, (url, prev) => {
  if (typeof document === 'undefined') return
  if (url && !prev) {            // 打开：记录底层位置 + 锁滚动
    savedScroll = window.scrollY
    document.body.style.overflow = 'hidden'
  } else if (!url && prev) {     // 关闭：解锁 + 还原到底层原位置
    document.body.style.overflow = ''
    window.scrollTo(0, savedScroll)
  }
  // url && prev（覆盖层内切换）：不动滚动、不动锁
})

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- 半透明遮罩：点一下关闭 -->
  <Transition name="overlay-fade" appear>
    <div v-if="url" class="overlay-backdrop" @click="emit('close')" />
  </Transition>

  <!-- 右侧滑入的文章面板 -->
  <Transition name="overlay-slide" appear>
    <div v-if="url" class="overlay-panel" role="dialog" aria-modal="true">
      <button class="overlay-close" @click="emit('close')" title="关闭（Esc）" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div ref="scrollRef" class="overlay-scroll">
        <article class="overlay-article">
          <header v-if="meta" class="overlay-header">
            <h1 class="overlay-title">{{ meta.title }}</h1>
            <div class="overlay-meta">
              <span>{{ meta.date }}</span>
              <span v-if="meta.tags?.length" class="overlay-tags">
                <span v-for="t in meta.tags" :key="t" class="overlay-tag">{{ t }}</span>
              </span>
            </div>
          </header>

          <!-- 正文：复用博客的 glass-card + vp-doc 样式，公式/代码/表格自动渲染 -->
          <div class="glass-card vp-doc content-card overlay-body">
            <div v-if="loading" class="overlay-loading">加载中…</div>
            <component :is="bodyComp" v-else-if="bodyComp" />
            <div v-else class="overlay-loading">暂无内容</div>
          </div>

          <div class="overlay-foot">
            <button class="overlay-close-text" @click="emit('close')">← 返回</button>
          </div>
        </article>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 遮罩 */
.overlay-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 18, 40, 0.45);
  backdrop-filter: blur(2px);
  z-index: 100;
}

/* 右侧面板：宽屏留出左侧遮罩可见，窄屏全宽 */
.overlay-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(100%, 56rem);
  background: var(--c-bg, #f7f8fc);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(15, 18, 40, 0.18);
}

.overlay-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.overlay-article {
  max-width: 48rem;
  margin: 0 auto;
  padding: 3rem 1.25rem 4rem;
}

@media (min-width: 640px) {
  .overlay-article { padding: 3.5rem 2rem 4rem; }
}

.overlay-header { margin-bottom: 1.75rem; }

.overlay-title {
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 0.75rem;
  color: var(--c-text-primary);
}

@media (min-width: 640px) {
  .overlay-title { font-size: 2.5rem; }
}

.overlay-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--c-text-secondary);
  font-size: 0.9rem;
}

.overlay-tags { display: inline-flex; gap: 0.4rem; }

.overlay-tag {
  padding: 0.1rem 0.55rem;
  border-radius: 9999px;
  background: rgba(108, 99, 255, 0.1);
  color: var(--c-accent, #6c63ff);
  font-size: 0.78rem;
}

.overlay-body {
  border-radius: 0.75rem;
  padding: 1.5rem;
}

@media (min-width: 640px) {
  .overlay-body { padding: 2rem; }
}

.overlay-loading {
  padding: 3rem 0;
  text-align: center;
  color: var(--c-text-secondary);
}

.overlay-foot {
  margin-top: 2rem;
  text-align: center;
}

.overlay-close-text {
  border: none;
  background: rgba(108, 99, 255, 0.1);
  color: var(--c-accent, #6c63ff);
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s;
}
.overlay-close-text:hover { background: rgba(108, 99, 255, 0.18); }

/* 右上角关闭按钮 */
.overlay-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-text-secondary);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 102;
  transition: color 0.15s, background 0.15s, transform 0.15s;
}
.overlay-close:hover {
  color: var(--c-accent, #6c63ff);
  background: #fff;
  transform: rotate(90deg);
}

/* —— 过渡动画 —— */
/* 面板从右滑入 / 向右滑出 */
.overlay-slide-enter-from,
.overlay-slide-leave-to {
  transform: translateX(100%);
}
.overlay-slide-enter-active,
.overlay-slide-leave-active {
  transition: transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1);
}

/* 遮罩淡入淡出 */
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.32s ease;
}

/* 滚动条美化 */
.overlay-scroll::-webkit-scrollbar { width: 8px; }
.overlay-scroll::-webkit-scrollbar-thumb {
  background: rgba(108, 99, 255, 0.25);
  border-radius: 9999px;
}
</style>
