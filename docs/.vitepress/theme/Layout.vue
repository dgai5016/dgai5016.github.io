<script setup lang="ts">
import { useData, useRouter, useRoute } from 'vitepress'
import { computed, shallowRef, onMounted, onUnmounted, ref, watch, provide } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import PostMeta from './components/PostMeta.vue'
import TableOfContents from './components/TableOfContents.vue'
import PostOverlay from './components/PostOverlay.vue'

const { frontmatter } = useData()
const router = useRouter()
const route = useRoute()
const isPost = computed(() => frontmatter.value?.layout === 'post')

const sourcePage = ref('/')
watch(() => route.path, (path) => {
  if (!path.startsWith('/posts/')) {
    sourcePage.value = path
  }
}, { immediate: true })
provide('sourcePage', sourcePage)

function goBack() {
  router.go(sourcePage.value || '/')
}

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
</script>

<template>
  <div class="layout-root">
    <Sidebar />

    <div class="main-wrapper">
      <main class="main-content">
        <article v-if="isPost" class="article">
          <header class="post-header">
            <button class="back-btn" @click="goBack" title="返回">
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              <span class="back-btn-text">返回</span>
            </button>
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
  position: relative;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid var(--c-border);
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  color: var(--c-text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
  transition: color 0.15s, background  0.15s;
}

.back-btn:hover {
  color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}

.back-btn svg {
  width: 1rem;
  height: 1rem;
}

.back-btn-text {
  line-height: 1;
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
