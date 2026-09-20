<script setup lang="ts">
// BookMindmap：书籍思维导图全屏工作台。
// 父组件（书单页）用 v-if="mindmapBook" 控制挂载，book 变化即打开；关闭 emit('close')。
// 数据流：fetch 该书 public 下的 mindmap.md 原文 → markmap-lib Transformer 转 树 → markmap-view 渲染到 svg。
// markmap 库用动态 import（在 open() 里才加载）：① 避开 VitePress SSR（markmap-view 顶层有浏览器 API）
// ② 大库自动代码分割，不进首屏 bundle。
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  book: { title: string; mindmap: string } | null
}>()

const emit = defineEmits<{ close: [] }>()

// ===== 渲染状态：loading → 渲染 / error =====
const status = ref<'loading' | 'ready' | 'error'>('loading')
const statusRef = ref<HTMLElement | null>(null) // 工作台容器（svg 挂载点）
let mm: any = null // Markmap 实例（动态 import 的类型拿不到，用 any）
let rootData: any = null // transform 出的根节点树（工具条操作要反复用）

// 导图分支色板：首色站点主题紫（章层），其余柔和区分色（markmap color 函数按深度循环取）
const MM_COLORS = ['#6c63ff', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']

// 打开时锁底层滚动（对齐 PostOverlay 的做法），关闭还原
let savedScroll = 0

// 打开工作台：拉取导图 md → 动态加载 markmap → 渲染
async function open() {
  status.value = 'loading'
  savedScroll = window.scrollY
  document.body.style.overflow = 'hidden'
  try {
    // 动态加载 markmap（客户端 only）
    const [{ Transformer }, { Markmap }] = await Promise.all([
      import('markmap-lib'),
      import('markmap-view'),
    ])
    // 拉原始 markdown：mindmap 字段是 public/books/ 下的目录名（slug）
    const res = await fetch(`/books/${props.book!.mindmap}/mindmap.md`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const md = await res.text()

    // markdown → markmap 树；关掉内置资源插件对脚本的诉求（我们只要树）
    const transformer = new Transformer()
    const { root } = transformer.transform(md)
    rootData = root

    // 等容器挂进 DOM 再创建实例（svg 已在模板里）
    await nextTickOnce()
    const svg = statusRef.value?.querySelector('svg.mm-canvas')
    if (!svg) throw new Error('canvas not ready')

    // 销毁旧实例（重复打开同一工作台时复用容器）
    if (mm) { try { mm.destroy() } catch {} mm = null }

    mm = Markmap.create(svg, {
      // 分支取色（⚠ markmap-view 0.18 的 color 只接受函数，传数组会在初始化时
      // 当函数调用炸出 "n is not a function"，导致整图渲染为空）：
      // 按节点深度循环取色，首色用站点主题紫（章层），其余为柔和区分色
      color: (node) => MM_COLORS[node.state.depth % MM_COLORS.length],
      initialExpandLevel: 2, // 初始展开到章（二级），复习时逐层点开
      maxWidth: 280, // 单节点文字最大宽度（超长换行）
      duration: 300, // 折叠/展开动画时长，对齐全站浮层节奏
      spacingVertical: 8,
      spacingHorizontal: 100,
    }, rootData)
    status.value = 'ready'
    setTimeout(() => mm?.fit(), 50) // 首帧 fit 一下，导图完整入画
  } catch (e) {
    status.value = 'error'
    console.error('[BookMindmap] 加载失败:', e)
  }
}

// 下一帧等待的小工具（等 Vue 把 v-if 的容器刷进 DOM）
function nextTickOnce() {
  return new Promise<void>((r) => requestAnimationFrame(() => r()))
}

// ===== 工具条三操作 =====

// 遍历树设置/清除折叠标记：fold=1 表示折叠该节点的子树
function walk(node: any, depth: number, foldFrom: number) {
  if (!node.children?.length) return
  if (depth >= foldFrom) node.payload = { ...node.payload, fold: 1 }
  else if (node.payload?.fold) node.payload = { ...node.payload, fold: 0 }
  node.children.forEach((c: any) => walk(c, depth + 1, foldFrom))
}

// 展开全部：清除所有折叠标记后重渲染。
// ⚠ 用 renderData() 而不是 setData()——setData 会重新走 _initializeData，
// 按 initialExpandLevel 无条件重算 fold，把手动设置的展开状态覆盖掉（工具条会失效）
function expandAll() {
  if (!mm || !rootData) return
  walkClearFold(rootData)
  mm.renderData()
  mm.fit()
}

// 收起到章（只展开到二级）：深度 1 起的节点（章）设折叠
function collapseToChapter() {
  if (!mm || !rootData) return
  walkClearFold(rootData)
  walk(rootData, 0, 1)
  mm.renderData()
  mm.fit()
}

// 清空整棵树的折叠标记（展开全部用）
function walkClearFold(node: any) {
  if (node.payload?.fold) node.payload.fold = 0
  node.children?.forEach((c: any) => walkClearFold(c))
}

// 适配屏宽：导图缩放平移复位
function fitView() {
  mm?.fit()
}

// ===== 关闭（Esc / 遮罩 / × 三保底） =====
function close() {
  document.body.style.overflow = ''
  window.scrollTo(0, savedScroll)
  emit('close')
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.book) close()
}

// book 一变化（父组件设置）就打开；组件卸载清监听 + 解锁滚动
watch(() => props.book, (b) => { if (b) open() }, { immediate: true })
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <Teleport to="body">
    <!-- 全屏遮罩：对齐 DESIGN.md 浮层范式（rgba(15,18,40,0.45)+blur、z-index 200 档全屏模态） -->
    <div v-if="book" class="bm-overlay" @click="close">
      <!-- 工作台主体：拦住冒泡，点内容不关 -->
      <div class="bm-stage" role="dialog" aria-modal="true" @click.stop>
        <!-- 顶栏：书名 + 工具条 + 关闭钮 -->
        <div class="bm-toolbar">
          <span class="bm-title">{{ book.title }} · 思维导图</span>
          <div class="bm-actions">
            <button type="button" class="bm-btn" @click="expandAll">展开全部</button>
            <button type="button" class="bm-btn" @click="collapseToChapter">收起到章</button>
            <button type="button" class="bm-btn" @click="fitView">适配屏宽</button>
          </div>
          <button type="button" class="bm-close" aria-label="关闭" @click="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <!-- 画布区：markmap 渲染目标（svg）；loading / error 态盖在上面 -->
        <div ref="statusRef" class="bm-canvas-wrap">
          <svg class="mm-canvas"></svg>
          <p v-if="status === 'loading'" class="bm-status">导图加载中…</p>
          <p v-else-if="status === 'error'" class="bm-status">
            导图加载失败——请确认 public/books/{{ book.mindmap }}/mindmap.md 存在
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
/* 全屏遮罩：压暗 + 模糊（对齐全站浮层范式） */
.bm-overlay {
  position: fixed;
  inset: 0;
  z-index: 200; /* 全屏模态档（DESIGN.md z-index 层级表） */
  background: rgba(15, 18, 40, 0.45);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}

/* 工作台主体：近全屏的毛玻璃面板（顶栏 + 画布） */
.bm-stage {
  display: flex;
  flex-direction: column;
  width: min(96vw, 100rem);
  height: 92vh;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 20px 60px rgba(15, 18, 40, 0.25);
  overflow: hidden;
}

/* 顶栏：书名在左、工具条居中推右、关闭钮贴右上 */
.bm-toolbar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--c-border);
}

.bm-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--c-text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bm-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
}

/* 工具条按钮：胶囊（对齐站内胶囊语言），hover accent 泛色 */
.bm-btn {
  padding: 3px 12px;
  border: 1px solid var(--c-border);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.85);
  font-size: 0.78rem;
  color: var(--c-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.bm-btn:hover {
  color: var(--c-accent, #6c63ff);
  background: rgba(108, 99, 255, 0.08);
}

/* 右上角关闭按钮：PostOverlay overlay-close 同款范式（圆形白玻璃底、hover 转紫 + 旋转 90°） */
.bm-close {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--c-border);
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease, transform 0.15s ease;
}

.bm-close:hover {
  color: var(--c-accent, #6c63ff);
  background: #fff;
  transform: rotate(90deg);
}

/* 画布区：占满剩余空间；markmap 的 svg 100% 铺开 */
.bm-canvas-wrap {
  position: relative;
  flex: 1;
  min-height: 0;
}

.mm-canvas {
  width: 100%;
  height: 100%;
  display: block;
  cursor: grab;
}

.mm-canvas:active {
  cursor: grabbing;
}

/* 节点文字色对齐站点文字三级（markmap 的 CSS 变量） */
.mm-canvas :deep(.markmap-foreign) {
  font-size: 0.85rem;
  color: var(--c-text-primary);
}

/* 加载/失败提示：画布中央弱化文案 */
.bm-status {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-size: 0.9rem;
  color: var(--c-text-muted);
  background: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

/* 小屏：顶栏换行容纳工具条 */
@media (max-width: 640px) {
  .bm-toolbar {
    flex-wrap: wrap;
  }

  .bm-title {
    max-width: 100%;
  }

  .bm-actions {
    margin-left: 0;
  }
}
</style>
