<script setup lang="ts">
// PostMap：全站文章知识星图（径向轨道图）——全屏浮层形态。
// 数据来自 map.data.ts（build 期按文章标签自动构建「根 → 分类 → 文章」两层树）。
// 由 Layout 挂载：右上角常驻圆钮点击 → open=true 全屏铺开；Esc / × 关闭。
//
// 交互：点击分类节点折叠↔展开、点击文章节点以右滑浮层打开（openOverlay）；
// 触控板双指滑动/滚轮=平移（内容跟随手指）、双指捏合=缩放；空白拖拽平移；
// 悬停任意节点高亮它到中心的祖先链路。
//
// 布局是手写极坐标分配（不引 D3）：节点在父扇区内按「可见叶子数」加权分角；
// viewBox 按视口宽高比动态适配（高度基准 1150，宽屏拉宽），短边永远撑满。
import { computed, inject, nextTick, ref, watch, onMounted, onUnmounted } from 'vue'
import { data as mapRoot } from '../../map.data'
import type { MapNode } from '../../map.data'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()

// ===== 浮层生命周期：打开时锁底层滚动 + 适配画布；Esc 关闭（对齐 BookMindmap 三保底范式）=====
const svgRef = ref<SVGSVGElement | null>(null)

function fitCanvas() {
  const svg = svgRef.value
  if (!svg) return
  // 高度基准固定 1150（内容外缘 ~580 + 呼吸留白），宽度按视口宽高比拉宽——
  // 正方形 viewBox 在 16:9 屏会被高度卡住（letterbox 两侧浪费），动态适配让短边撑满
  const H = 1150
  const W = Math.max(H, Math.round(H * (svg.clientWidth / Math.max(1, svg.clientHeight))))
  svg.setAttribute('viewBox', `${-W / 2} ${-H / 2} ${W} ${H}`)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open) {
    // Esc 分层：文章阅读浮层开着时先让浮层自己关（PostOverlay 也监听 Esc），
    // 地图保留待下一按——避免一次 Esc 把两层全关掉、丢掉「读完回到地图」的上下文
    if (document.querySelector('.overlay-panel')) return
    emit('close')
  }
}

watch(() => props.open, async (v) => {
  if (!v) return
  document.body.style.overflow = 'hidden' // 滚动锁（对齐 PostOverlay / BookMindmap）
  await nextTick()
  fitCanvas()
})
watch(() => props.open, (v) => {
  if (!v) document.body.style.overflow = ''
})
onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})

// —— 可视化色板（与 BookMindmap 的 MM_COLORS 同一套柔和区分色，首色站点主题紫）——
// 全屏可视化工作台场景的既有豁免：每个一级合集取一色，其子树边/点统一用该色（DESIGN.md）
const MM_COLORS = ['#6c63ff', '#0ea5e9', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6']

// 深度 → 半径（根 0 / 一级：合集与独立组 / 文章叶子）。viewBox 固定 1800×1800，CSS 负责适配容器
const RADII = [0, 250, 460]

// ===== 折叠状态：初始全展开（两级结构，一屏看全首页文章）；「收起」= 折叠到一级 =====
const firstLevelIds = mapRoot.children.map((c) => c.id)
const collapsedIds = ref<Set<string>>(new Set())

function toggle(id: string) {
  const next = new Set(collapsedIds.value)
  if (next.has(id)) next.delete(id)
  else next.add(id)
  collapsedIds.value = next
}
function expandAll() { collapsedIds.value = new Set() }
function collapseAll() { collapsedIds.value = new Set(firstLevelIds) }

// ===== 径向布局（computed：折叠集一变整树重排）=====
interface LaidNode {
  id: string
  title: string
  url?: string
  external?: string
  depth: number
  x: number
  y: number
  color: string
  childCount: number
}
interface LaidEdge {
  id: string
  childId: string // 高亮判定用：边的子端在链路上才亮
  depth: number // 边的目标节点深度：1 = 根→分类（主干），2 = 分类→文章（支线）
  from: { x: number; y: number }
  to: { x: number; y: number }
  color: string
}

// 可见子树的叶子数（权重）：折叠节点自身按 1 计，防止大合集挤压小合集的扇区
function leafWeight(node: MapNode, collapsed: Set<string>): number {
  if (!node.children.length || collapsed.has(node.id)) return 1
  return node.children.reduce((s, c) => s + leafWeight(c, collapsed), 0)
}

const layout = computed(() => {
  const collapsed = collapsedIds.value
  const nodes: LaidNode[] = []
  const edges: LaidEdge[] = []
  const parentOf = new Map<string, string>()

  // 把 node 放进 [a0, a1) 扇区的中线角度上，children 按权重继续分角
  function place(node: MapNode, a0: number, a1: number, depth: number, color: string) {
    const mid = (a0 + a1) / 2
    const r = RADII[Math.min(depth, RADII.length - 1)]
    const x = r * Math.cos(mid)
    const y = r * Math.sin(mid)
    nodes.push({ id: node.id, title: node.title, url: node.url, external: node.external, depth, x, y, color, childCount: node.children.length })

    if (!node.children.length || collapsed.has(node.id)) return
    // 根的直接子节点（一级合集）按顺序各取一色；更深层继承所在合集的颜色
    const kids = node.children
    const weights = kids.map((c) => leafWeight(c, collapsed))
    const total = weights.reduce((s, w) => s + w, 0)
    let cur = a0
    kids.forEach((child, i) => {
      const span = (a1 - a0) * (weights[i] / total)
      const childColor = depth === 0 ? MM_COLORS[i % MM_COLORS.length] : color
      // place() 一进来就 push 自身，所以调用前的 nodes.length 就是 child 自己的索引——
      // 千万不能用 nodes[nodes.length - 1]：child 展开时递归会继续 push 子孙，
      // 回来后「最后一个」是子树末端的叶子，边就画歪了（展开的分类反而不连父）
      const childIdx = nodes.length
      place(child, cur, cur + span, depth + 1, childColor)
      parentOf.set(child.id, node.id)
      const placed = nodes[childIdx]
      edges.push({ id: `${node.id}→${child.id}`, childId: child.id, depth: depth + 1, from: { x, y }, to: { x: placed.x, y: placed.y }, color: childColor })
      cur += span
    })
  }

  place(mapRoot, -Math.PI / 2, Math.PI * 1.5, 0, MM_COLORS[0])
  return { nodes, edges, parentOf }
})

// ===== 悬停高亮：hoverId 沿 parentOf 上溯到根，得到链路上所有节点 id =====
const hoverId = ref('')
const highlightSet = computed(() => {
  if (!hoverId.value) return new Set<string>()
  const chain = new Set<string>()
  let cur: string | undefined = hoverId.value
  while (cur) {
    chain.add(cur)
    cur = layout.value.parentOf.get(cur)
  }
  return chain
})
function isHighlighted(n: LaidNode) { return highlightSet.value.has(n.id) }
function isEdgeHighlighted(e: LaidEdge) { return highlightSet.value.has(e.childId) }

// ===== 视图变换（缩放 + 平移），fit 即复位到初始全局视角 =====
const view = ref({ k: 1, tx: 0, ty: 0 })
function fitView() { view.value = { k: 1, tx: 0, ty: 0 } }

// 屏幕坐标 → viewBox 坐标（getScreenCTM 逆变换；只在客户端事件里调用）
function screenToSvg(svg: SVGSVGElement, clientX: number, clientY: number) {
  const ctm = svg.getScreenCTM()
  if (!ctm) return { x: 0, y: 0 }
  const pt = new DOMPoint(clientX, clientY).matrixTransform(ctm.inverse())
  return { x: pt.x, y: pt.y }
}

// 滚轮/触控板手势（macOS 地图类应用惯例）：
// - 双指捏合（Safari/Chrome 会以 ctrl+wheel 派发）→ 缩放，保持指针下的内容点不漂移
// - 双指滑动 / 鼠标滚轮（普通 wheel）→ 平移，内容跟随手指方向
function onWheel(e: WheelEvent) {
  const svg = e.currentTarget as SVGSVGElement
  if (e.ctrlKey) {
    // 捏合缩放：deltaY 已是细粒度小数（触控板），乘 8 补足缩放步长
    const m = screenToSvg(svg, e.clientX, e.clientY)
    const k2 = Math.min(3, Math.max(0.35, view.value.k * Math.exp(-e.deltaY * 0.008)))
    // 内容点 p（未变换坐标）满足 m = t + k·p → p = (m - t)/k；缩放后仍让 p 落在 m 上
    const px = (m.x - view.value.tx) / view.value.k
    const py = (m.y - view.value.ty) / view.value.k
    view.value = { k: k2, tx: m.x - k2 * px, ty: m.y - k2 * py }
  } else {
    // 平移：delta 像素换算成 viewBox 单位（逻辑宽取自动态 viewBox 的 baseVal）。
    // 方向取反——Mac 自然滚动下双指下滑 deltaY<0，取反后 ty 增大、内容向下，
    // 即「内容跟随手指」（手指往哪滑内容往哪走）；传统鼠标滚轮方向也恰好符合预期
    const rect = svg.getBoundingClientRect()
    const scale = (svg.viewBox.baseVal.width || 1400) / rect.width
    view.value = { ...view.value, tx: view.value.tx - e.deltaX * scale, ty: view.value.ty - e.deltaY * scale }
  }
}

// ===== 拖拽平移（pointer 事件统一鼠标/触摸）=====
const drag = ref<{ active: boolean; moved: boolean; startX: number; startY: number; baseTx: number; baseTy: number } | null>(null)
let suppressClick = false // 拖拽过就吞掉紧随的 click，防止「拖完误开文章」

function onPointerDown(e: PointerEvent) {
  drag.value = { active: true, moved: false, startX: e.clientX, startY: e.clientY, baseTx: view.value.tx, baseTy: view.value.ty }
}
function onPointerMove(e: PointerEvent) {
  if (!drag.value?.active) return
  const svg = e.currentTarget as SVGSVGElement
  // 位移换算成 viewBox 单位：两点都做屏幕→svg 变换取差，规避 letterbox/等比缩放误差
  const a = screenToSvg(svg, drag.value.startX, drag.value.startY)
  const b = screenToSvg(svg, e.clientX, e.clientY)
  view.value = { ...view.value, tx: drag.value.baseTx + (b.x - a.x), ty: drag.value.baseTy + (b.y - a.y) }
  if (Math.abs(e.clientX - drag.value.startX) + Math.abs(e.clientY - drag.value.startY) > 4) drag.value.moved = true
}
function onPointerUp() {
  if (drag.value?.moved) suppressClick = true
  drag.value = null
  // click 事件在 pointerup 之后同步触发，下一帧放开抑制标记
  requestAnimationFrame(() => { suppressClick = false })
}

// ===== 节点点击行为 =====
// 文章节点：浮层打开（与 PostLink 同款：preventDefault 拦下原生导航防页面跳转，
// 修饰键/非左键放行浏览器原生行为——中键/Cmd+点击新标签）
const openOverlay = inject<(path: string) => void>('openOverlay', () => {})
function openArticle(e: MouseEvent, n: LaidNode) {
  if (suppressClick) return
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  if (n.url) openOverlay(n.url)
}
// 分组/合集节点：切换折叠；外链叶子：新标签打开 GitHub
function onGroupClick(n: LaidNode) {
  if (suppressClick) return
  if (n.external) { window.open(n.external, '_blank', 'noopener'); return }
  if (n.childCount) toggle(n.id)
}

// ===== 渲染辅助 =====
function nodeRadius(n: LaidNode): number {
  if (n.depth === 0) return 34
  if (n.depth === 1) return 16
  return 8
}
function edgePath(e: LaidEdge): string {
  return `M ${e.from.x} ${e.from.y} L ${e.to.x} ${e.to.y}`
}
// 标签沿径向朝外偏移，避开圆点；锚点按左右半区选择，根节点放正下方
function labelX(n: LaidNode): number {
  if (n.depth === 0) return n.x
  return n.x + (n.x >= 0 ? nodeRadius(n) + 7 : -(nodeRadius(n) + 7))
}
function labelY(n: LaidNode): number {
  if (n.depth === 0) return n.y + nodeRadius(n) + 18
  return n.y + 4
}
function labelAnchor(n: LaidNode): string {
  if (n.depth === 0) return 'anchor-mid'
  return n.x >= 0 ? 'anchor-start' : 'anchor-end'
}
</script>

<template>
  <!-- 全屏浮层：fixed 铺满视口 + 玻璃底（海洋背景直接透底时节点小字不可读）。
       z-index 90 的层级逻辑：盖住常驻按钮(hamburger/地图钮 50)，但让右滑阅读浮层
       (PostOverlay 100)压在自己上面——在地图里点文章，浮层滑出可读，关掉浮层回到地图 -->
  <div v-if="open" class="post-map-layer glass-card">
    <!-- 星图画布：viewBox 由 fitCanvas() 动态写入（宽高比适配），g 承载缩放/平移变换 -->
    <svg
      ref="svgRef"
      class="star-canvas"
      viewBox="-700 -700 1400 1400"
      @wheel.prevent="onWheel"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointerleave="onPointerUp"
    >
      <g :transform="`translate(${view.tx} ${view.ty}) scale(${view.k})`">
        <!-- 边：父→子的轨道线；主干（根→分类）比支线（分类→文章）粗且深，层级关系一眼可读 -->
        <path
          v-for="e in layout.edges"
          :key="e.id"
          :d="edgePath(e)"
          class="edge"
          :class="[e.depth === 1 ? 'edge-main' : 'edge-branch', { 'edge-hi': isEdgeHighlighted(e), 'edge-dim': hoverId && !isEdgeHighlighted(e) }]"
          :stroke="e.color"
        />
        <!-- 节点：有子树的一律是「分组行为」（点击折叠↔展开，含合集——合集也是文章，
             但点击优先下钻而不是打开自身）；纯叶子渲染成真实 <a>（中键/修饰键可新标签） -->
        <template v-for="n in layout.nodes" :key="n.id">
          <a
            v-if="!n.childCount && (n.url || n.external)"
            :href="n.external || n.url"
            :target="n.external ? '_blank' : '_self'"
            :rel="n.external ? 'noopener' : undefined"
            class="node"
            @click="n.external ? undefined : openArticle($event, n)"
            @mouseenter="hoverId = n.id"
            @mouseleave="hoverId = ''"
          >
            <circle :cx="n.x" :cy="n.y" :r="nodeRadius(n)" :fill="n.color" class="dot" :class="{ 'dot-hi': isHighlighted(n), 'dot-dim': hoverId && !isHighlighted(n) }" />
            <text :x="labelX(n)" :y="labelY(n)" class="label" :class="[labelAnchor(n), { 'label-hi': isHighlighted(n) }]">{{ n.title }}</text>
          </a>
          <g
            v-else-if="n.childCount"
            class="node"
            @click="onGroupClick(n)"
            @mouseenter="hoverId = n.id"
            @mouseleave="hoverId = ''"
          >
            <circle
              :cx="n.x" :cy="n.y" :r="nodeRadius(n)"
              :fill="n.depth === 0 ? n.color : '#ffffff'"
              :stroke="n.color"
              :stroke-width="n.depth <= 1 ? 3 : 2"
              class="dot"
              :class="{ 'dot-hi': isHighlighted(n), 'dot-dim': hoverId && !isHighlighted(n) }"
            />
            <text :x="labelX(n)" :y="labelY(n)" class="label" :class="[labelAnchor(n), n.depth <= 1 ? 'label-strong' : '', { 'label-hi': isHighlighted(n) }]">{{ n.title }}</text>
            <!-- 折叠指示：有子节点且当前收起时，节点上方显示 ＋ -->
            <text v-if="collapsedIds.has(n.id)" :x="n.x" :y="n.y - nodeRadius(n) - 5" class="fold-hint">＋</text>
          </g>
        </template>
      </g>
    </svg>

    <!-- 工具条（对齐 BookMindmap 工作台范式）：操作胶囊组 + 分隔线 + 关闭钮 -->
    <div class="toolbar glass-card">
      <button class="tool-btn" @click="expandAll">展开全部</button>
      <button class="tool-btn" @click="collapseAll">收起</button>
      <button class="tool-btn" @click="fitView">适配屏宽</button>
      <span class="toolbar-divider" aria-hidden="true"></span>
      <button class="tool-btn tool-close" @click="emit('close')" title="关闭（Esc）" aria-label="关闭文章地图">
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
      </button>
    </div>

    <!-- 操作提示（含开关快捷键——无按钮入口时这是唯一的可发现性提示；小屏隐藏） -->
    <div class="hint glass-card">Ctrl+L 开关地图 · 点击分类展开 · 点击文章阅读 · 双指滑动平移 · 捏合缩放</div>
  </div>
</template>

<style scoped>
/* 全屏浮层层：fixed 铺满视口，glass-card 提供白底毛玻璃（全屏无圆角） */
.post-map-layer {
  position: fixed;
  inset: 0;
  z-index: 90; /* 盖过常驻按钮(50)，低于右滑阅读浮层(100)——地图内点文章时浮层压在地图上可读 */
  touch-action: none; /* 拖拽平移交给 pointer 事件，禁浏览器默认触摸滚动 */
  user-select: none;
}
.star-canvas {
  width: 100%;
  height: 100%;
  cursor: grab;
}
.star-canvas:active {
  cursor: grabbing;
}

/* —— 边：主干/支线分层 —— */
.edge {
  fill: none;
  transition: opacity 0.15s ease, stroke-width 0.15s ease;
}
.edge-main {
  stroke-width: 3;
  opacity: 0.65;
}
.edge-branch {
  stroke-width: 1.5;
  opacity: 0.4;
}
.edge-hi {
  stroke-width: 3;
  opacity: 1;
}
.edge-dim {
  opacity: 0.12;
}

/* —— 节点 —— */
.node {
  cursor: pointer;
}
.dot {
  transition: opacity 0.15s ease;
}
.dot-hi {
  stroke: #fff;
  stroke-width: 2;
}
.dot-dim {
  opacity: 0.3;
}

/* 标签：白描边护字（玻璃底上仍保持描边防与边线串色）；一级加粗深色，叶子次级灰 */
.label {
  font-size: 14px;
  fill: var(--c-text-secondary);
  paint-order: stroke;
  stroke: rgba(255, 255, 255, 0.85);
  stroke-width: 3px;
  stroke-linejoin: round;
  transition: fill 0.15s ease;
}
.label-strong {
  font-size: 17px;
  font-weight: 600;
  fill: var(--c-text-primary);
}
.label-hi {
  fill: var(--c-accent);
}
.anchor-start { text-anchor: start; }
.anchor-end { text-anchor: end; }
.anchor-mid { text-anchor: middle; }

/* 折叠角标 ＋ */
.fold-hint {
  font-size: 14px;
  font-weight: 700;
  fill: var(--c-accent);
  text-anchor: middle;
  paint-order: stroke;
  stroke: rgba(255, 255, 255, 0.9);
  stroke-width: 3px;
  stroke-linejoin: round;
}

/* —— 工具条：右上角玻璃胶囊组（操作 + 分隔线 + 关闭） —— */
.toolbar {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.3rem;
  border-radius: 9999px;
}
.tool-btn {
  border: none;
  background: none;
  padding: 0.3rem 0.8rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: color 0.15s ease, background-color 0.15s ease;
}
.tool-btn:hover {
  color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}
.toolbar-divider {
  width: 1px;
  height: 1rem;
  background: var(--c-border);
}
/* 关闭钮：图标 0.15s hover 旋转 90°（DESIGN.md 关闭钮范式），与文字钮同底不同 padding */
.tool-close {
  display: inline-flex;
  align-items: center;
  padding: 0.3rem;
}
.tool-close svg {
  width: 1rem;
  height: 1rem;
  transition: transform 0.15s ease, color 0.15s ease;
}
.tool-close:hover svg {
  transform: rotate(90deg);
}

/* —— 操作提示：左下角小玻璃条 —— */
.hint {
  position: absolute;
  left: 0.75rem;
  bottom: 0.75rem;
  padding: 0.4rem 0.9rem;
  border-radius: 9999px;
  font-size: 0.72rem;
  color: var(--c-text-muted);
}

@media (max-width: 640px) {
  .hint { display: none; }
}
</style>
