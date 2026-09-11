<script setup lang="ts">
// BilingualOverlay.vue
// MCP 双语文档的右侧滑出覆盖层：从《MCP 学习地图》文章点击文档链接时打开。
// 与 PostOverlay 同一套交互范式（右滑入 / Esc·遮罩关闭 / 底层滚动锁 / 后退键关闭），
// 差异有三：
// 1. 面板更宽（92rem）：容纳左右双栏
// 2. 正文是「配对 md」（docs/mcp-docs/paired/<slug>.md）——逐段 BiRow 行，
//    左英文右中文水平对齐；块数失配的文档整篇降级为单行对照（仍可读）
// 3. 窄屏（<1024px）双栏放不下：顶部出现 英文/中文 tab 切换单栏
import { ref, shallowRef, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { mcpDocs } from '../mcp-docs-manifest'
import { enhanceCodeBlocks } from '../utils/enhanceCodeBlocks'
import { enhanceMermaid } from '../utils/enhanceMermaid'

const props = defineProps<{ slug: string | null }>()
const emit = defineEmits<{ close: [], prev: [slug: string], next: [slug: string] }>()

// 懒加载全部配对文档（构建期 VitePress 编译，代码高亮/表格全保真）
// 路径：posts/ai/mcp/paired/<slug>.md（srcExclude 排除路由但保留模块加载）
const modules = import.meta.glob('/posts/ai/mcp/paired/*.md')

const bodyComp = shallowRef<any>(null)   // 当前文档的渲染组件
const loading = ref(false)
const scrollRef = ref<HTMLElement | null>(null)

// 清单元信息：标题（双语）/ 分组 / 原文链接
const meta = computed(() => mcpDocs.find((d) => d.slug === props.slug) || null)

// 上一篇 / 下一篇（按清单顺序，跨分组连续）
const idx = computed(() => mcpDocs.findIndex((d) => d.slug === props.slug))
const prevDoc = computed(() => (idx.value > 0 ? mcpDocs[idx.value - 1] : null))
const nextDoc = computed(() =>
  idx.value >= 0 && idx.value < mcpDocs.length - 1 ? mcpDocs[idx.value + 1] : null,
)

// 窄屏 tab：'both' 仅作初值，模板里 tab 栏只在 <1024px 显示；
// hide-en/hide-zh 类挂在正文容器上，配合非 scoped 样式块控制 BiRow 格子显隐
const mobileTab = ref<'en' | 'zh'>('zh')

function findLoader(slug: string) {
  return Object.entries(modules).find(([k]) => k === `/posts/ai/mcp/paired/${slug}.md`)?.[1]
}

// slug 变化时懒加载对应配对文档
watch(() => props.slug, async (slug) => {
  scrollRef.value?.scrollTo({ top: 0 })
  if (!slug) { bodyComp.value = null; return }
  loading.value = true
  bodyComp.value = null
  const loader = findLoader(slug)
  if (loader) {
    const mod = await (loader as () => Promise<any>)()
    bodyComp.value = mod.default
  }
  loading.value = false
  // 等正文渲染完再注入代码块展开按钮（与 PostOverlay 同款时序处理）
  await nextTick()
  if (scrollRef.value) {
    enhanceCodeBlocks(scrollRef.value)
    // mermaid 图按需渲染（异步进行，不阻塞面板展示）
    enhanceMermaid(scrollRef.value)
  }
}, { immediate: true })

// Esc 关闭：上层模态（代码全屏/图片预览）打开时让位，防止一次 Esc 连关两层
function onKey(e: KeyboardEvent) {
  if (e.key !== 'Escape' || !props.slug) return
  if (document.querySelector('.cb-backdrop, .lb-backdrop')) return
  emit('close')
}

// 锁底层滚动 + 记录/还原滚动位置（同 PostOverlay）
let savedScroll = 0
watch(() => props.slug, (slug, prev) => {
  if (typeof document === 'undefined') return
  if (slug && !prev) {
    savedScroll = window.scrollY
    document.body.style.overflow = 'hidden'
  } else if (!slug && prev) {
    document.body.style.overflow = ''
    window.scrollTo(0, savedScroll)
  }
})

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  document.body.style.overflow = ''
})
</script>

<template>
  <!-- 半透明遮罩：点一下关闭 -->
  <Transition name="biol-fade" appear>
    <div v-if="slug" class="biol-backdrop" @click="emit('close')" />
  </Transition>

  <!-- 右侧滑入的双栏面板 -->
  <Transition name="biol-slide" appear>
    <div v-if="slug" class="biol-panel" role="dialog" aria-modal="true">
      <button class="biol-close" @click="emit('close')" title="关闭（Esc）" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div ref="scrollRef" class="biol-scroll">
        <article class="biol-article">
          <!-- 头部：中文主标题 + 英文副标题 + 分组徽标 + 原文链接 -->
          <header v-if="meta" class="biol-header">
            <span v-if="meta.group" class="biol-group">{{ meta.group }}</span>
            <h1 class="biol-title">{{ meta.titleZh }}</h1>
            <p class="biol-subtitle">{{ meta.titleEn }}</p>
            <a :href="meta.sourceUrl" target="_blank" rel="noopener noreferrer" class="biol-source">
              阅读英文原文 ↗
            </a>
          </header>

          <!-- 窄屏 tab：英文/中文 切换（≥1024px 由 CSS 隐藏，始终双栏） -->
          <div class="biol-tabs" role="tablist">
            <button
              class="biol-tab" :class="{ active: mobileTab === 'en' }"
              role="tab" :aria-selected="mobileTab === 'en'"
              @click="mobileTab = 'en'"
            >英文</button>
            <button
              class="biol-tab" :class="{ active: mobileTab === 'zh' }"
              role="tab" :aria-selected="mobileTab === 'zh'"
              @click="mobileTab = 'zh'"
            >中文</button>
          </div>

          <!-- 正文：配对文档逐段 BiRow 行（代码块展开按钮已注入） -->
          <div
            class="glass-card vp-doc content-card biol-body"
            :class="{ 'hide-en': mobileTab === 'zh', 'hide-zh': mobileTab === 'en' }"
          >
            <div v-if="loading" class="biol-loading">加载中…</div>
            <component :is="bodyComp" v-else-if="bodyComp" />
            <div v-else class="biol-loading">暂无内容</div>
          </div>

          <!-- 底部：上一篇 / 返回 / 下一篇 -->
          <div class="biol-foot">
            <button v-if="prevDoc" class="biol-nav" @click="emit('prev', prevDoc.slug)">
              ← {{ prevDoc.titleZh }}
            </button>
            <span v-else class="biol-nav placeholder"></span>
            <button class="biol-back" @click="emit('close')">← 返回</button>
            <button v-if="nextDoc" class="biol-nav" @click="emit('next', nextDoc.slug)">
              {{ nextDoc.titleZh }} →
            </button>
            <span v-else class="biol-nav placeholder"></span>
          </div>
        </article>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 遮罩 */
.biol-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 18, 40, 0.45);
  backdrop-filter: blur(2px);
  z-index: 100;
}

/* 右侧面板：双栏需要更宽（PostOverlay 是 56rem，这里 92rem 上限）。
   桌面端宽度取视口 94%——左侧永远留 6% 缝隙透出遮罩，呈悬浮态而非全屏；
   窄屏（<640px）保持全宽，tab 阅读不吃亏 */
.biol-panel {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: min(100%, 92rem);
  background: var(--c-bg, #f7f8fc);
  z-index: 101;
  display: flex;
  flex-direction: column;
  box-shadow: -20px 0 60px rgba(15, 18, 40, 0.18);
}

@media (min-width: 640px) {
  .biol-panel {
    width: min(94%, 92rem);
  }
}

.biol-scroll {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.biol-article {
  max-width: 84rem;
  margin: 0 auto;
  padding: 2.5rem 1.25rem 4rem;
}

@media (min-width: 640px) {
  .biol-article { padding: 3rem 2rem 4rem; }
}

/* 头部 */
.biol-header { margin-bottom: 1.5rem; }

.biol-group {
  display: inline-block;
  padding: 0.1rem 0.6rem;
  border-radius: 9999px;
  background: rgba(108, 99, 255, 0.1);
  color: var(--c-accent, #6c63ff);
  font-size: 0.78rem;
  margin-bottom: 0.6rem;
}

.biol-title {
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.25;
  margin: 0 0 0.35rem;
  color: var(--c-text-primary);
}

@media (min-width: 640px) {
  .biol-title { font-size: 2.2rem; }
}

.biol-subtitle {
  margin: 0 0 0.75rem;
  color: var(--c-text-secondary);
  font-size: 0.95rem;
}

.biol-source {
  color: var(--c-accent, #6c63ff);
  text-decoration: none;
  font-size: 0.88rem;
}
.biol-source:hover { text-decoration: underline; }

/* 窄屏 tab（≥1024px 隐藏，双栏常显） */
.biol-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}
.biol-tab {
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-text-secondary);
  padding: 0.35rem 1.1rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.88rem;
  transition: all 0.15s;
}
.biol-tab.active {
  background: var(--c-accent, #6c63ff);
  border-color: var(--c-accent, #6c63ff);
  color: #fff;
}
@media (min-width: 1024px) {
  .biol-tabs { display: none; }
}

/* 正文卡片 */
.biol-body {
  border-radius: 0.75rem;
  padding: 1.25rem;
}

@media (min-width: 640px) {
  .biol-body { padding: 1.75rem; }
}

.biol-loading {
  padding: 3rem 0;
  text-align: center;
  color: var(--c-text-secondary);
}

/* 底部导航：上一篇/返回/下一篇 三等分 */
.biol-foot {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.75rem;
}
.biol-nav {
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-text-secondary);
  padding: 0.5rem 0.9rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.15s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.biol-nav:last-of-type { justify-self: end; }
.biol-nav:hover {
  color: var(--c-accent, #6c63ff);
  border-color: var(--c-accent, #6c63ff);
}
.biol-nav.placeholder { visibility: hidden; }
.biol-back {
  border: none;
  background: rgba(108, 99, 255, 0.1);
  color: var(--c-accent, #6c63ff);
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.15s;
}
.biol-back:hover { background: rgba(108, 99, 255, 0.18); }

/* 右上角关闭按钮 */
.biol-close {
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
.biol-close:hover {
  color: var(--c-accent, #6c63ff);
  background: #fff;
  transform: rotate(90deg);
}

/* —— 过渡动画（同 PostOverlay） —— */
.biol-slide-enter-from,
.biol-slide-leave-to { transform: translateX(100%); }
.biol-slide-enter-active,
.biol-slide-leave-active { transition: transform 0.32s cubic-bezier(0.22, 0.61, 0.36, 1); }
.biol-fade-enter-from,
.biol-fade-leave-to { opacity: 0; }
.biol-fade-enter-active,
.biol-fade-leave-active { transition: opacity 0.32s ease; }

.biol-scroll::-webkit-scrollbar { width: 8px; }
.biol-scroll::-webkit-scrollbar-thumb {
  background: rgba(108, 99, 255, 0.25);
  border-radius: 9999px;
}
</style>

<!-- 非作用域样式：窄屏单栏模式需要跨组件改 BiRow 的网格与格子显隐
     （BiRow 内部样式是 scoped 的，父级 scoped 选择器够不到，必须全局） -->
<style>
/* <1024px：tab 模式——单栏 + 按 tab 隐藏另一侧 */
@media (max-width: 1023px) {
  .biol-body .bi-row {
    grid-template-columns: 1fr;
  }
  .biol-body.hide-en .bi-en {
    display: none;
  }
  .biol-body.hide-zh .bi-zh {
    display: none;
  }
}
/* ≥1024px：双栏常显（清掉 tab 隐藏类的影响，防止窄→宽切换残留） */
@media (min-width: 1024px) {
  .biol-body.hide-en .bi-en,
  .biol-body.hide-zh .bi-zh {
    display: block;
  }
}
</style>
