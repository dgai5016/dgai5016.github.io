<script setup lang="ts">
import { useData, useRouter, useRoute } from 'vitepress'
import { computed, shallowRef, onMounted, onUnmounted, ref, watch, provide } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import PostMeta from './components/PostMeta.vue'
import TableOfContents from './components/TableOfContents.vue'
import PostOverlay from './components/PostOverlay.vue'
import ImageLightbox from './components/ImageLightbox.vue'
import CodeBlockExpand from './components/CodeBlockExpand.vue'
import CommandPalette from './components/CommandPalette.vue'
// 代码块「全屏展开」按钮注入函数（Layout 与 PostOverlay 共用）
import { enhanceCodeBlocks } from './utils/enhanceCodeBlocks'

const { frontmatter } = useData()
const router = useRouter()
const route = useRoute()
const isPost = computed(() => frontmatter.value?.layout === 'post')

const sourcePage = ref('/')
watch(() => route.path, (path) => {
  // 只有「非文章页」才能作为返回目标：/posts/ 下的页面全是文章（前缀判断），
  // 书单页挂载的读书文档（/books/...）也是 layout: post 的文章页，但路径不带 /posts/ 前缀，
  // 故再按 frontmatter.layout 排除一次，防止文档页被误记为来源页导致返回按钮失效
  if (!path.startsWith('/posts/') && frontmatter.value?.layout !== 'post') {
    sourcePage.value = path
  }
}, { immediate: true })
provide('sourcePage', sourcePage)

function goBack() {
  router.go(sourcePage.value || '/')
}

// —— 返回按钮定位（仅桌面端 ≥1024px）——
// fixed 到「Sidebar 右边缘 ↔ 正文卡片左边缘」的水平中点，垂直视口居中。
// 那段空当宽度随视口变化（正文居中留白），纯 CSS 无法精确居中，
// 故像 TOC 一样用 JS 量出中点写入 inline left；移动端（<1024px）不参与，沿用 CSS 默认（hamburger 旁）。
const backBtnStyle = ref<Record<string, string>>({})
function positionBackBtn() {
  if (import.meta.env.SSR) return
  if (window.innerWidth < 1024) {            // 移动端交给 CSS（left:3.75rem 紧挨 hamburger）
    backBtnStyle.value = {}
    return
  }
  const sidebar = document.querySelector('.desktop-sidebar')   // 可见 Sidebar 卡片（fixed 垂直居中）
  const card = document.querySelector('.content-card')         // 正文玻璃卡片
  if (!sidebar || !card) return
  // gutter 中点 = (Sidebar 右边缘 + 正文卡片左边缘) / 2
  const mid = (sidebar.getBoundingClientRect().right + card.getBoundingClientRect().left) / 2
  backBtnStyle.value = { left: `${mid}px` }
}

// 首次定位（延迟等正文卡片挂载）+ 视口变化时重算 + 切换文章时重算
onMounted(() => {
  setTimeout(positionBackBtn, 100)
  window.addEventListener('resize', positionBackBtn)
})
onUnmounted(() => window.removeEventListener('resize', positionBackBtn))
watch(() => route.path, () => setTimeout(positionBackBtn, 100))

const CommentGiscus = shallowRef<any>(null)

onMounted(() => {
  import('./components/CommentGiscus.vue').then(mod => {
    CommentGiscus.value = mod.default
  })
})

// —— 「右滑覆盖层」打开站内文章链接 ——
// 触发源改为正文里的 <PostLink> 组件（见 components/PostLink.vue）；
// 不再用 window 事件拦截——那个抢不过 VitePress 在 app 初始化时就注册的 capture 监听。
const overlayUrl = ref<string | null>(null)

// 打开/切换覆盖层：已开 → 就地切换（不压历史）；未开 → 压一条历史使「后退」能关闭
function openOverlay(path: string) {
  if (overlayUrl.value) {
    overlayUrl.value = path
  } else {
    // 把当前（索引）条目的 state 置空：关闭时 history.back() 触发的 popstate 会命中
    // VitePress 的 `if (e.state === null) return` 守卫，从而跳过 loadPage——不回顶、不重载
    history.replaceState(null, '')
    history.pushState({ overlay: path }, '')
    overlayUrl.value = path
  }
}

function closeOverlay() {
  if (history.state?.overlay) {
    history.back() // 触发 popstate → 关闭
  } else {
    overlayUrl.value = null
  }
}

function onPop() {
  overlayUrl.value = null
}

// 让 PostLink（正文里的链接组件）能调用 openOverlay
provide('openOverlay', openOverlay)

onMounted(() => window.addEventListener('popstate', onPop))
onUnmounted(() => window.removeEventListener('popstate', onPop))

// —— 图片预览（lightbox）：全局事件委托捕获 .vp-doc 内的图片点击 ——
const lightboxOpen = ref(false)
const lightboxImages = ref<string[]>([])
const lightboxIndex = ref(0)

// 冒泡阶段监听 document 的 click：命中 .vp-doc 内的 <img> 就放大。
// 刻意用冒泡（非 capture）：不碰 VitePress 对 <a> 的 capture 路由拦截，img 点击与之无冲突。
function onImageClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  if (target.tagName !== 'IMG') return
  if (target.closest('a')) return              // 防御：图片若被 <a> 包裹则交给 VitePress 路由，不放大
  const container = target.closest('.vp-doc')  // 定位图片所属的文章正文容器
  if (!container) return
  const imgs = Array.from(container.querySelectorAll('img')) as HTMLImageElement[]
  if (!imgs.length) return
  // 收集该容器内全部图片作为图集（currentSrc 兼容 base64 与文件路径），并定位到被点的那张
  lightboxImages.value = imgs.map(i => i.currentSrc || i.src)
  lightboxIndex.value = Math.max(0, imgs.indexOf(target as HTMLImageElement))
  lightboxOpen.value = true
}
onMounted(() => document.addEventListener('click', onImageClick))
onUnmounted(() => document.removeEventListener('click', onImageClick))

// —— 代码块「全屏展开」：注入按钮 + document 事件委托打开全屏模态 ——
const codeExpandOpen = ref(false)
const codeExpandHtml = ref('')
const codeExpandLang = ref('')

// 注入入口：onMounted + 路由切换都要重跑。
// VitePress 客户端路由会用新 <Content/> 替换 DOM，不重注入则切换文章后展开按钮会丢失。
// 照抄 positionBackBtn 的「延迟 100ms 等正文挂载」范式（见上方 onMounted / watch route.path）。
onMounted(() => setTimeout(() => enhanceCodeBlocks(), 100))
watch(() => route.path, () => setTimeout(() => enhanceCodeBlocks(), 100))

// document 级冒泡委托（与 onImageClick 同款）：命中 .code-expand-btn 就克隆对应代码块、打开模态。
// 一份委托同时覆盖主文章页与右滑覆盖层（PostOverlay）内的代码块——两者 DOM 都在 document 内，事件冒泡至此。
function onCodeExpandClick(e: MouseEvent) {
  const target = e.target as HTMLElement
  const btn = target.closest('.code-expand-btn') as HTMLElement | null
  if (!btn) return
  const block = btn.closest('div[class*="language-"]') as HTMLElement | null
  if (!block) return
  if (!block.querySelector('pre')) return

  // 克隆整个外层 div（而非只克隆 pre）：vp-doc.css 的代码布局规则是后代选择器
  // `.vp-doc [class*='language-'] pre/code`，只克隆 pre 会丢掉 pre 的 padding/overflow/position。
  // 克隆后剥掉行号 / 复制按钮 / 语言标签 / 展开按钮自身（模态自带语言标签，复制按钮与展开按钮在克隆里是「死的」点了无效）。
  const clone = block.cloneNode(true) as HTMLElement
  clone.querySelector('.line-numbers-wrapper')?.remove()
  clone.querySelector('button.copy')?.remove()
  clone.querySelector('span.lang')?.remove()
  clone.querySelector('.code-expand-btn')?.remove()
  clone.classList.remove('line-numbers-mode')   // 去掉行号带来的 padding-left:32px

  codeExpandLang.value = block.querySelector('span.lang')?.textContent?.trim() || ''
  codeExpandHtml.value = clone.outerHTML
  codeExpandOpen.value = true
}
onMounted(() => document.addEventListener('click', onCodeExpandClick))
onUnmounted(() => document.removeEventListener('click', onCodeExpandClick))
</script>

<template>
  <div class="layout-root">
    <Sidebar />

    <!--
      返回按钮（仅文章页）：fixed 钉在左上角视口导航带。
      桌面端落 desktop-sidebar（垂直居中）上方的天然留白；
      移动端紧挨 hamburger 组成「☰ ←」导航组。
      goBack()/sourcePage 逻辑见 script，与位置无关，原样复用。
    -->
    <button
      v-if="isPost"
      class="back-btn"
      :style="backBtnStyle"
      @click="goBack"
      title="返回"
      aria-label="返回上一页"
    >
      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <div class="main-wrapper">
      <main class="main-content">
        <article v-if="isPost" class="article">
          <header class="post-header">
            <h1 class="post-title">
              {{ frontmatter.title }}
            </h1>
            <PostMeta
              :date="frontmatter.date"
              :tags="frontmatter.tags"
            />
          </header>

          <div class="post-body">
            <div class="post-content-wrapper">
              <div class="glass-card vp-doc content-card">
                <Content />
              </div>
              <component :is="CommentGiscus" v-if="CommentGiscus" class="comment-section" />
            </div>

            <aside class="toc-sidebar">
              <TableOfContents />
            </aside>
          </div>
        </article>

        <Content v-else />
      </main>
      <Footer />
    </div>

    <!-- 右滑覆盖层：点击文章正文里的站内链接时由 onLinkIntercept 触发 -->
    <PostOverlay :url="overlayUrl" @close="closeOverlay" />

    <!-- 全局命令面板：任意页面按 Cmd/Ctrl+K 召唤，搜索文章并跳转（组件自管开合，无需 props） -->
    <CommandPalette />

    <!-- 图片预览层：点击 .vp-doc 内的配图时由上面的 onImageClick 事件委托触发 -->
    <ImageLightbox v-model="lightboxOpen" :images="lightboxImages" :index="lightboxIndex" />

    <!-- 代码块全屏展开层：点击代码块的展开按钮时由上面的 onCodeExpandClick 事件委托触发 -->
    <CodeBlockExpand v-model="codeExpandOpen" :code-html="codeExpandHtml" :lang="codeExpandLang" />
  </div>
</template>

<style scoped>
.layout-root {
  min-height: 100vh;
  color: var(--c-text-primary);
  display: flex;
}

/* Main content area */
.main-wrapper {
  flex: 1;
  min-width: 0;
}

.main-content {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem 1rem;
}

@media (min-width: 640px) {
  .main-content {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .main-content {
    padding: 3rem 2rem;
  }
}

/* Article */
.article {
  margin: 0 auto;
  max-width: 56rem;
}

/* Post header */
.post-header {
  margin-bottom: 2.5rem;
  /* position:relative 已移除：PostMeta 及 .post-header 内子元素均为静态流，
     旧 back-btn 也是普通流（非绝对定位），此声明从未被任何元素依赖。 */
}

/*
 * 移动端（<1024px）给 .post-header 顶部留白，避让 fixed 返回按钮（top:1rem + 高3.25rem → 底边≈4.25rem）。
 * 旧 in-flow 的 back-btn 恰好顺带提供了这层间隔，按钮 fixed 化后必须补回；
 * 桌面端无需——按钮在 Sidebar 列，与标题左右分离。
 */
@media (max-width: 1023px) {
  .post-header {
    padding-top: 3.5rem;   /* 标题顶到 ≈2rem+3.5rem=5.5rem，清开 4.25rem 按钮带并留 1.25rem 缝 */
  }
}

/*
 * 返回按钮：fixed 钉在视口左侧导航带。
 * - 背景对齐文章 .glass-card（rgba(255,255,255,0.92) + blur(12px) + 白边），与正文卡片同款毛玻璃、不透明。
 * - hover/active/focus：图标转强调色 --c-accent、边框转 --c-border-hover、底色略提亮。
 * - z-index:20 —— 高于正文/TOC/desktop-sidebar（均为 auto），低于移动端 Sidebar 面板(40)/遮罩(30)，
 *   更低于 PostOverlay(100)/Lightbox·CommandPalette(200)：故展开移动 Sidebar、打开右滑覆盖层或任何模态时，
 *   本按钮会被正确盖住；hamburger(50) 始终保持最上层可点击以关闭面板。
 *
 * 移动端（默认，<1024px）：left:3.75rem，紧挨 hamburger 右侧（hamburger left:1rem + 外宽2.375rem = 右边缘3.375rem，+0.375rem 间距）；
 *   尺寸 3.25rem，圆角 1rem。
 * 桌面端（≥1024px）：见下方 @media，落「Sidebar 右边缘 ↔ 正文左边缘」gutter 中点、垂直视口居中；尺寸 3rem。
 */
.back-btn {
  position: fixed;
  top: 1rem;
  left: 3.75rem;            /* 移动端：hamburger 右边缘3.375rem + 0.375rem 间距 */
  z-index: 20;

  width: 3.25rem;           /* 放大，更好按 */
  height: 3.25rem;
  padding: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;       /* 正圆（宽高相等） */
  border: 1px solid rgba(255, 255, 255, 0.4);   /* 对齐 .glass-card 边框 */
  background: rgba(255, 255, 255, 0.92);        /* 对齐文章 .glass-card 背景，不再透明 */
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);

  cursor: pointer;
  color: var(--c-text-secondary);
  transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
}

/* hover（桌面）/ active（移动触控）/ focus-visible（键盘）：图标转强调色 + 边框高亮 + 底色略提亮 */
.back-btn:hover,
.back-btn:active,
.back-btn:focus-visible {
  color: var(--c-accent);
  background: rgba(255, 255, 255, 0.88);        /* 呼应 --c-bg-card-hover */
  border-color: var(--c-border-hover);
  outline: none;
}

.back-btn:focus-visible {
  box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.4);   /* 键盘聚焦可见轮廓（无障碍） */
}

.back-btn svg {
  width: 1.5rem;            /* 放大 */
  height: 1.5rem;
}

/*
 * 桌面端（≥1024px）：落「Sidebar 右边缘 ↔ 正文卡片左边缘」的水平中点，垂直视口居中。
 * - left 由 JS positionBackBtn() 精确算出 gutter 中点并写入 inline style（见 script）；17rem 为 JS 就绪前的 fallback。
 * - top:50% + translate(-50%,-50%)：按钮中心对齐 gutter 中点、视口垂直居中（与 desktop-sidebar 同处垂直中线）。
 */
@media (min-width: 1024px) {
  .back-btn {
    top: 50%;
    left: 17rem;            /* fallback；JS 就绪后 inline style 覆盖为 gutter 中点 */
    transform: translate(-50%, -50%);
    width: 3rem;            /* 桌面放大 */
    height: 3rem;
  }
  .back-btn svg {
    width: 1.375rem;
    height: 1.375rem;
  }
}

.post-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  color: var(--c-text-primary);
}

@media (min-width: 640px) {
  .post-title {
    font-size: 3rem;
  }
}

/* Post body */
.post-body {
  display: flex;
  gap: 2rem;
}

.post-content-wrapper {
  flex: 1;
  min-width: 0;
}

.content-card {
  border-radius: 0.75rem;
  padding: 1.5rem;
}

@media (min-width: 640px) {
  .content-card {
    padding: 2rem;
  }
}

.comment-section {
  margin-top: 3rem;
}

/* TOC sidebar */
.toc-sidebar {
  display: none;
  width: 13rem;
  flex-shrink: 0;
}

@media (min-width: 1024px) {
  .toc-sidebar {
    display: block;
  }
}
</style>
