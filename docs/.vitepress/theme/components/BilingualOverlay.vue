<script setup lang="ts">
// BilingualOverlay.vue
// 双语文档的右侧滑出覆盖层：从《MCP 学习地图》《RAGFlow 学习地图》等文章
// 点击文档链接（McpDocLink / RagflowDocLink）时打开。
// 与 PostOverlay 同一套交互范式（右滑入 / Esc·遮罩关闭 / 底层滚动锁 / 后退键关闭），
// 差异有三：
// 1. 面板更宽（92rem）：容纳左右双栏
// 2. 正文是「配对 md」（posts/ai/<合集>/paired/<slug>.md）——逐段 BiRow 行，
//    左英文右中文水平对齐；块数失配的文档整篇降级为单行对照（仍可读）
// 3. 窄屏（<1024px）双栏放不下：顶部出现 英文/中文 tab 切换单栏
// 一个浮层实例服务多个文档合集（collection）：slug 在合集各自的 manifest 里查元信息，
// 上一篇/下一篇只在同一合集内导航（避免从 RAGFlow 一路翻进 MCP）。
import { ref, shallowRef, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { mcpDocs } from '../mcp-docs-manifest'
import { ragflowDocs } from '../ragflow-docs-manifest'
import { enhanceCodeBlocks } from '../utils/enhanceCodeBlocks'
import { enhanceMermaid } from '../utils/enhanceMermaid'

const props = defineProps<{ slug: string | null }>()
const emit = defineEmits<{ close: [], prev: [slug: string], next: [slug: string] }>()

// 懒加载全部配对文档（构建期 VitePress 编译，代码高亮/表格全保真）
// 路径：posts/ai/<合集>/paired/<slug>.md（srcExclude 排除路由但保留模块加载）
const modules = {
  ...import.meta.glob('/posts/ai/mcp/paired/*.md'),
  ...import.meta.glob('/posts/ai/ragflow/paired/*.md'),
}

// 合并清单：每条标注所属合集，供「同合集内」的上下篇导航
const allDocs = [
  ...mcpDocs.map((d) => ({ ...d, collection: 'mcp' })),
  ...ragflowDocs.map((d) => ({ ...d, collection: 'ragflow' })),
]

const bodyComp = shallowRef<any>(null)   // 当前文档的渲染组件
const loading = ref(false)
const scrollRef = ref<HTMLElement | null>(null)

// —— 目录（TOC）：收集中文栏的 h2/h3 作章节导航 ——
// 配对文档每个 BiRow 行的 en/zh 格标题一一对应，取 zh 栏即得完整章节结构。
// 标题元素直接持有引用，点击 scrollIntoView 平滑滚到对应行。
interface TocItem { key: string; level: number; text: string; el: HTMLElement }
const tocItems = ref<TocItem[]>([])
const activeKey = ref('')

function collectToc() {
  // 目录收集 h2/h3/h4 三级（对应原文的 ##/###/#### 层级）
  const els = scrollRef.value
    ? (Array.from(scrollRef.value.querySelectorAll('.bi-zh h2, .bi-zh h3, .bi-zh h4')) as HTMLElement[])
    : []
  tocItems.value = els.map((el, i) => ({
    key: 'toc-' + i,
    level: Number(el.tagName.slice(1)),
    // 清掉 VitePress 标题锚点链接残留的零宽空格（​），否则目录文本尾部带隐形字符
    text: (el.textContent || '').replace(/​/g, '').trim(),
    el,
  }))
  activeKey.value = tocItems.value[0]?.key || ''
}

// 滚动高亮：最后一个「顶部已滚过容器顶 + 120px 缓冲」的标题视为当前节
function onOverlayScroll() {
  if (!scrollRef.value || !tocItems.value.length) return
  const wrapTop = scrollRef.value.getBoundingClientRect().top
  let current = ''
  for (const it of tocItems.value) {
    if (it.el.getBoundingClientRect().top - wrapTop <= 120) current = it.key
  }
  activeKey.value = current
}

function jumpTo(it: TocItem) {
  // 不带 behavior 参数 = 瞬间定位（dg 验收要求去掉平滑滚动动画）
  it.el.scrollIntoView({ block: 'start' })
}

// 清单元信息：标题（双语）/ 分组 / 原文链接（在合并清单里按 slug 查）
const meta = computed(() => allDocs.find((d) => d.slug === props.slug) || null)

// 上一篇 / 下一篇：限同一合集（collection）内按清单顺序导航，跨分组连续；
// 没查到元信息（slug 不在清单）时按 mcp 处理兜底，行为与旧版一致
const collectionDocs = computed(() =>
  allDocs.filter((d) => d.collection === (meta.value?.collection ?? 'mcp')),
)
const idx = computed(() => collectionDocs.value.findIndex((d) => d.slug === props.slug))
const prevDoc = computed(() => (idx.value > 0 ? collectionDocs.value[idx.value - 1] : null))
const nextDoc = computed(() =>
  idx.value >= 0 && idx.value < collectionDocs.value.length - 1
    ? collectionDocs.value[idx.value + 1]
    : null,
)

// 窄屏 tab：'both' 仅作初值，模板里 tab 栏只在 <1024px 显示；
// hide-en/hide-zh 类挂在正文容器上，配合非 scoped 样式块控制 BiRow 格子显隐
const mobileTab = ref<'en' | 'zh'>('zh')

function findLoader(slug: string) {
  // 两个合集目录都试：slug 在各自目录内唯一，命中即返回对应的懒加载器
  const paths = [`/posts/ai/mcp/paired/${slug}.md`, `/posts/ai/ragflow/paired/${slug}.md`]
  return paths.map((p) => modules[p]).find(Boolean)
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
    // 目录收集：正文组件渲染完成后 zh 栏的 h2/h3 就位
    collectToc()
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

      <div ref="scrollRef" class="biol-scroll" @scroll.passive="onOverlayScroll">
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

          <!-- 正文 + 目录 两栏：目录只在桌面端（≥1024px）显示，样式对齐文章页 TableOfContents -->
          <div class="biol-content-row">
            <div class="biol-body-col">
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
            </div>

            <!-- 右侧目录：sticky 跟随滚动，点击平滑滚到对应章节，当前节高亮 -->
            <aside v-if="tocItems.length" class="biol-toc">
              <nav class="biol-toc-container glass-card">
                <h4 class="biol-toc-heading">目录</h4>
                <ul class="biol-toc-list">
                  <li v-for="it in tocItems" :key="it.key">
                    <a
                      :class="[
                        'biol-toc-link',
                        it.level === 3 ? 'biol-toc-link-h3' : '',
                        it.level === 4 ? 'biol-toc-link-h4' : '',
                        activeKey === it.key ? 'biol-toc-link-active' : 'biol-toc-link-default',
                      ]"
                      @click.prevent="jumpTo(it)"
                    >{{ it.text }}</a>
                  </li>
                </ul>
              </nav>
            </aside>
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

/* 正文 + 目录 两栏：目录 sticky 跟随，桌面端显示（<1024px 隐藏，与文章页 TOC 一致） */
.biol-content-row {
  display: flex;
  gap: 1.25rem;
  align-items: flex-start;
}

.biol-body-col {
  flex: 1;
  min-width: 0;
}

.biol-toc {
  display: none;
  position: sticky;
  top: 1rem;
  width: 11.5rem;
  flex-shrink: 0;
  max-height: calc(100vh - 2.5rem);
  overflow-y: auto;
}

@media (min-width: 1024px) {
  .biol-toc { display: block; }
}

/* 目录样式对齐文章页 TableOfContents（glass-card 容器 + 高亮当前节） */
.biol-toc-container {
  border-radius: 0.75rem;
  padding: 1rem;
}

.biol-toc-heading {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-muted);
  margin: 0 0 0.75rem;
  letter-spacing: 0.05em;
}

.biol-toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 0.8125rem;
}

.biol-toc-list li {
  margin-bottom: 0.375rem;
}

.biol-toc-list li:last-child {
  margin-bottom: 0;
}

.biol-toc-link {
  display: block;
  transition: color 0.2s ease;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
}

.biol-toc-link-h3 {
  padding-left: 0.75rem;
}

.biol-toc-link-h4 {
  padding-left: 1.5rem;
}

.biol-toc-link-active {
  color: var(--c-accent);
  font-weight: 500;
}

.biol-toc-link-default {
  color: var(--c-text-secondary);
}

.biol-toc-link-default:hover {
  color: var(--c-text-primary);
}

.biol-toc::-webkit-scrollbar { width: 6px; }
.biol-toc::-webkit-scrollbar-thumb {
  background: rgba(108, 99, 255, 0.25);
  border-radius: 9999px;
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

/* 目录点击滚动定位时，标题顶部留呼吸空间（scrollIntoView 的 block:start 对齐用）。
   正文内容来自插槽渲染的配对组件，scoped 选择器够不到，须走非作用域 */
.biol-body :is(h2, h3) {
  scroll-margin-top: 1.25rem;
}
/* ≥1024px：双栏常显（清掉 tab 隐藏类的影响，防止窄→宽切换残留） */
@media (min-width: 1024px) {
  .biol-body.hide-en .bi-en,
  .biol-body.hide-zh .bi-zh {
    display: block;
  }
}
</style>
