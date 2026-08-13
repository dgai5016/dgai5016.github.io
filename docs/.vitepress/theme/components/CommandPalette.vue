<script setup lang="ts">
// CommandPalette.vue
// 全局命令面板：在任意页面按 Cmd/Ctrl+K 召唤，按「标题」模糊搜索文章并跳转。
// 搜索逻辑、结果卡片样式与首页（docs/index.md）完全一致——
// 只是把首页搜索做成了「全局快捷键触发的弹层 + 键盘导航」，离开首页也能用。
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'
// 复用全站文章数据（与首页 index.md、PostOverlay 同源），避免重复解析 frontmatter
import { data as posts } from '../../posts.data'
// 复用首页搜索用的标题模糊打分算法（子序列匹配 + 相关性排序，零依赖）
import { fuzzyScore } from '../utils/fuzzyMatch'

const router = useRouter()

// —— 面板开合与搜索状态 ——
const open = ref(false)                                   // 面板是否打开
const query = ref('')                                     // 搜索词
const activeIndex = ref(0)                                // 键盘当前选中的结果项下标
const inputRef = ref<HTMLInputElement | null>(null)       // 输入框引用：打开时自动聚焦
const itemRefs = ref<HTMLElement[]>([])                   // 各结果项引用：键盘移动时让其滚入可视区

// 搜索结果（逻辑照抄首页 index.md 的 filtered：仅按标题模糊匹配）
// - 有搜索词：fuzzyScore 打分 → 过滤不匹配(-Infinity) → 分数降序
// - 无搜索词：保持 posts.data.ts 原排序（pin 置顶 + 日期倒序）
// - 命令面板最多展示 10 条，避免弹层过长
const results = computed(() => {
  const q = query.value.trim()
  if (!q) return posts.slice(0, 10)
  const lower = q.toLowerCase()
  return posts
    .map(post => ({ post, score: fuzzyScore(lower, post.title.toLowerCase()) }))
    .filter(x => x.score > -Infinity)   // -Infinity 表示标题不含该查询子序列，排除
    .sort((a, b) => b.score - a.score)   // 分数越大越相关
    .map(x => x.post)
    .slice(0, 10)
})

// 日期格式化：与首页 index.md 的 formatDate 完全一致（复制一份，让面板自包含）
function formatDate(date: string) {
  if (!date) return ''
  return new Date(date).toLocaleString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

// —— 开合控制 ——
let savedScroll = 0   // 记录底层滚动位置，关闭后还原（防止页面跳顶）

function openPalette() {
  open.value = true
  query.value = ''          // 每次打开清空搜索词，给一个干净的起始状态
  activeIndex.value = 0
  // 锁底层滚动 + 记录位置（仿 PostOverlay.vue 的做法）
  savedScroll = window.scrollY
  document.body.style.overflow = 'hidden'
  // 等面板 DOM 渲染出来后再聚焦输入框（此时 inputRef 才指向真实节点）
  nextTick(() => inputRef.value?.focus())
}

function closePalette() {
  open.value = false
  // 解锁底层滚动 + 还原到打开前的位置
  document.body.style.overflow = ''
  window.scrollTo(0, savedScroll)
}

// 选中某篇文章：关闭面板并跳转（点击或 Enter 调用）
// 参数用结构类型 { url: string }，不依赖 posts.data 的 Post 接口是否导出
function select(post: { url: string }) {
  closePalette()
  router.go(post.url)   // 与 Layout.vue 的 goBack 同款跳转方式
}

// 键盘上下移动选中项（带回环），并让新选中项自动滚入面板可视区
// —— 只在键盘触发时滚动；鼠标 hover 仅改 activeIndex 不抢滚动，避免页面跳动
function moveActive(delta: number) {
  if (!results.value.length) return
  activeIndex.value = (activeIndex.value + delta + results.value.length) % results.value.length
  // 等 DOM 更新（activeIndex 变化已反映到列表）后，再滚动到该项
  nextTick(() => {
    // block:'nearest' = 元素已在可视区则不动，否则滚到最近边缘（即时滚动，连按也跟手）
    itemRefs.value[activeIndex.value]?.scrollIntoView({ block: 'nearest' })
  })
}

// —— 全局键盘交互（onMounted 注册 / onUnmounted 注销，遵循项目对偶模式）——
function onKeydown(e: KeyboardEvent) {
  // 1) Cmd/Ctrl + K：全局切换面板开合（任意页面可用）
  //    metaKey 对应 Mac 的 ⌘，ctrlKey 对应 Win/Linux 的 Ctrl
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()   // 阻止浏览器默认行为（部分浏览器会聚焦地址栏/搜索栏）
    open.value ? closePalette() : openPalette()
    return
  }

  // 2) 以下按键仅在面板打开时生效
  if (!open.value) return

  if (e.key === 'Escape') {
    e.preventDefault()
    closePalette()
  } else if (e.key === 'ArrowDown' || (e.ctrlKey && e.key.toLowerCase() === 'n')) {
    // ↓ 或 Ctrl+N（Emacs/readline 风格「下一行」）：下移并滚入可视区
    e.preventDefault()
    moveActive(1)
  } else if (e.key === 'ArrowUp' || (e.ctrlKey && e.key.toLowerCase() === 'p')) {
    // ↑ 或 Ctrl+P（「上一行」）：上移并滚入可视区
    e.preventDefault()
    moveActive(-1)
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const post = results.value[activeIndex.value]
    if (post) select(post)
  }
}

// 搜索词变化时，选中项归零 + 清空旧的结果项引用，避免停留在越界的下标上
watch(query, () => {
  activeIndex.value = 0
  itemRefs.value = []
})

onMounted(() => document.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''   // 兜底：组件卸载时确保底层滚动被解锁
})
</script>

<template>
  <!-- 半透明遮罩：盖住全屏，点击关闭 -->
  <Transition name="palette-fade" appear>
    <div v-if="open" class="palette-backdrop" @click="closePalette" />
  </Transition>

  <!-- 命令面板主体：居中弹出 -->
  <Transition name="palette-pop" appear>
    <div v-if="open" class="palette-panel" role="dialog" aria-modal="true" aria-label="搜索文章">
      <!-- 输入框区：复用首页 .search-input-wrapper 的视觉（放大镜 + 输入框） -->
      <div class="palette-input-row">
        <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          ref="inputRef"
          v-model="query"
          type="text"
          placeholder="搜索文章…"
          aria-label="搜索文章"
        />
        <kbd class="palette-kbd">ESC</kbd>
      </div>

      <!-- 可滚动结果区：卡片复用首页 .home-post-card 结构与全局 style.css 样式 -->
      <div class="palette-scroll">
        <a
          v-for="(post, i) in results"
          :key="post.url"
          :ref="el => (itemRefs[i] = el as HTMLElement)"
          :href="post.url"
          :class="['glass-card', 'home-post-card', { 'palette-card-active': i === activeIndex }]"
          @mouseenter="activeIndex = i"
          @click.prevent="select(post)"
        >
          <h3 class="home-post-title">{{ post.title }}</h3>
          <p class="home-post-excerpt">{{ post.excerpt }}</p>
          <div class="home-post-meta">
            <span>{{ formatDate(post.date) }}</span>
            <span class="home-post-dot">·</span>
            <div class="home-post-tags">
              <span v-for="tag in post.tags.slice(0, 3)" :key="tag" class="tag-pill">
                {{ tag }}
              </span>
            </div>
          </div>
        </a>

        <!-- 空状态：复用首页 .empty-state 样式 -->
        <p v-if="!results.length" class="empty-state">没有找到匹配的文章</p>
      </div>

      <!-- 底部操作提示栏 -->
      <div class="palette-foot">
        <span><kbd>↑</kbd><kbd>↓</kbd> 或 <kbd>Ctrl+N</kbd>/<kbd>P</kbd> 选择</span>
        <span><kbd>Enter</kbd> 打开</span>
        <span><kbd>ESC</kbd> 关闭</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* 遮罩：盖住全屏，点击关闭 */
.palette-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 18, 40, 0.45);
  backdrop-filter: blur(2px);
  z-index: 200;            /* 高于 PostOverlay 的 100~102，确保面板始终在最上层 */
}

/* 面板主体：居中、毛玻璃、固定高度可滚动 */
.palette-panel {
  position: fixed;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);     /* 配合 left:50% 实现水平居中 */
  width: calc(100% - 2rem);        /* 移动端留出两侧边距 */
  max-width: 36rem;                 /* 桌面端最大宽度 */
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.92);   /* 对齐 .glass-card 的底色 */
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1rem;
  box-shadow: 0 20px 60px rgba(15, 18, 40, 0.25);
  z-index: 201;
  overflow: hidden;
}

/* 输入框区：复用首页 .search-input-wrapper 的布局思路 */
.palette-input-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--c-border);
}

.palette-input-row .search-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  color: var(--c-text-muted);
}

.palette-input-row input {
  flex: 1;
  background: transparent;
  outline: none;
  border: none;
  font-size: 1rem;
  color: var(--c-text-primary);
}

.palette-input-row input::placeholder {
  color: var(--c-text-muted);
}

/* 角落键位徽标（ESC / ↑↓ / Enter 通用样式） */
.palette-kbd {
  flex-shrink: 0;
  padding: 0.15rem 0.5rem;
  border-radius: 0.375rem;
  background: var(--c-bg-surface);
  border: 1px solid var(--c-border);
  font-size: 0.7rem;
  color: var(--c-text-muted);
  font-family: inherit;
  line-height: 1;
}

/* 可滚动结果区 */
.palette-scroll {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
}

/* 键盘选中态：accent 浅底 + 左侧竖条（不改动全局 .home-post-card / .glass-card）
   竖条用 inset 阴影而非 border-left——不占布局空间，避免 hover/选中时卡片内容位移 */
.palette-card-active {
  background: rgba(108, 99, 255, 0.1) !important;
  box-shadow: inset 3px 0 0 var(--c-accent);
}

/* 底部操作提示栏 */
.palette-foot {
  display: flex;
  gap: 1.25rem;
  padding: 0.625rem 1.25rem;
  border-top: 1px solid var(--c-border);
  font-size: 0.75rem;
  color: var(--c-text-muted);
}

.palette-foot kbd {
  padding: 0.1rem 0.35rem;
  margin-right: 0.15rem;
  border-radius: 0.25rem;
  background: var(--c-bg-surface);
  border: 1px solid var(--c-border);
  font-size: 0.7rem;
  font-family: inherit;
}

/* —— 过渡动画 —— */
/* 遮罩淡入淡出 */
.palette-fade-enter-from,
.palette-fade-leave-to {
  opacity: 0;
}
.palette-fade-enter-active,
.palette-fade-leave-active {
  transition: opacity 0.2s ease;
}

/* 面板淡入 + 轻微缩放；注意 enter/leave 的 transform 要保留 translateX(-50%) 居中，否则动画期间会跳位 */
.palette-pop-enter-from,
.palette-pop-leave-to {
  opacity: 0;
  transform: translateX(-50%) scale(0.98);
}
.palette-pop-enter-active,
.palette-pop-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

/* 滚动条美化（仿 PostOverlay） */
.palette-scroll::-webkit-scrollbar { width: 8px; }
.palette-scroll::-webkit-scrollbar-thumb {
  background: rgba(108, 99, 255, 0.25);
  border-radius: 9999px;
}
</style>
