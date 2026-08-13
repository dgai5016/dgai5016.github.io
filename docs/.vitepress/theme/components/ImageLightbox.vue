<script setup lang="ts">
// ImageLightbox.vue
// 文章配图的「点击放大」预览层：深色遮罩 + 居中大图 + 左右切换。
// 范式参考 PostOverlay.vue（遮罩 / Esc 关闭 / body 滚动锁 / <Transition> 进出动画）。
// 图片的「发现与收集」由 Layout.vue 的全局事件委托完成，本组件只负责展示与交互。
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean     // 是否打开（配合 v-model）
  images: string[]        // 图集 src 列表（来自 img.currentSrc，base64 SVG / 文件路径都兼容）
  index: number           // 初始打开那张的索引
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

// 当前显示的图片索引；每次打开时同步成传入的 index
const current = ref(0)
watch(() => props.modelValue, (open) => {
  if (open) current.value = props.index
})

// 关闭预览层
function close() {
  emit('update:modelValue', false)
}
// 上一张 / 下一张（到头循环）；单图时不切换
function prev() {
  if (props.images.length <= 1) return
  current.value = (current.value - 1 + props.images.length) % props.images.length
}
function next() {
  if (props.images.length <= 1) return
  current.value = (current.value + 1) % props.images.length
}

// 键盘交互：Esc 关闭，← → 切换（仅在打开时响应）
function onKey(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowLeft') prev()
  else if (e.key === 'ArrowRight') next()
}

// body 滚动锁：打开时「先记录原值再锁」，关闭时「还原成原值」。
// 用记录-还原而非直接置空，是为了和 PostOverlay 协同——若从右滑覆盖层（它已锁住 body）
// 里打开本组件，关闭时还原成它锁住的状态，不会误把覆盖层的滚动锁也解开。
let savedOverflow = ''
watch(() => props.modelValue, (open) => {
  if (typeof document === 'undefined') return
  if (open) {
    savedOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = savedOverflow
  }
})

onMounted(() => document.addEventListener('keydown', onKey))
onUnmounted(() => {
  document.removeEventListener('keydown', onKey)
  // 组件卸载时兜底还原 body 滚动，防止预览层意外销毁后页面被永久锁住
  if (typeof document !== 'undefined') document.body.style.overflow = savedOverflow
})
</script>

<template>
  <!-- 半透明遮罩 + 居中大图；点遮罩任意空白处关闭 -->
  <Transition name="lb-fade" appear>
    <div v-if="modelValue" class="lb-backdrop" @click="close">
      <!-- 大图：点图片本身不关闭（@click.stop），避免查看时误触 -->
      <Transition name="lb-swap" mode="out-in">
        <img :key="current" :src="images[current]" class="lb-image" @click.stop alt="" />
      </Transition>

      <!-- 右上角关闭按钮 -->
      <button class="lb-close" @click.stop="close" title="关闭（Esc）" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- 多图时才显示左右切换按钮和计数器 -->
      <button v-if="images.length > 1" class="lb-nav lb-prev" @click.stop="prev" title="上一张（←）" aria-label="上一张">‹</button>
      <button v-if="images.length > 1" class="lb-nav lb-next" @click.stop="next" title="下一张（→）" aria-label="下一张">›</button>
      <span v-if="images.length > 1" class="lb-counter">{{ current + 1 }} / {{ images.length }}</span>
    </div>
  </Transition>
</template>

<style scoped>
/* 遮罩：覆盖全屏、深色半透明；z-index 200 高于 PostOverlay 的 102，确保从覆盖层里打开也在最上层 */
.lb-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 18, 40, 0.82);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: zoom-out;
}

/* 大图：限制在视口内、完整显示不裁切 */
.lb-image {
  max-width: 92vw;
  max-height: 88vh;
  object-fit: contain;
  border-radius: 0.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  /* 图片区域不触发遮罩的「点空白关闭」，光标恢复默认 */
  cursor: default;
}

/* 右上角关闭按钮（圆形，参考 PostOverlay 的 .overlay-close） */
.lb-close {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 201;
  transition: color 0.15s, background 0.15s, transform 0.15s;
}
.lb-close:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.22);
  transform: rotate(90deg);
}

/* 左右切换按钮：垂直居中、贴两侧 */
.lb-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.75rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 201;
  transition: color 0.15s, background 0.15s;
}
.lb-nav:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.22);
}
.lb-prev { left: 1rem; }
.lb-next { right: 1rem; }

/* 底部居中的「当前 / 总数」计数器 */
.lb-counter {
  position: fixed;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: rgba(0, 0, 0, 0.4);
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.8rem;
  z-index: 201;
}

/* —— 过渡动画 —— */
/* 打开/关闭：遮罩淡入淡出，大图轻微缩放进场 */
.lb-fade-enter-from,
.lb-fade-leave-to {
  opacity: 0;
}
.lb-fade-enter-active,
.lb-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lb-fade-enter-active .lb-image,
.lb-fade-leave-active .lb-image {
  transition: transform 0.25s ease;
}
.lb-fade-enter-from .lb-image,
.lb-fade-leave-to .lb-image {
  transform: scale(0.96);
}

/* 切换图片：先淡出旧图、再淡入新图（out-in） */
.lb-swap-enter-from,
.lb-swap-leave-to {
  opacity: 0;
}
.lb-swap-enter-active,
.lb-swap-leave-active {
  transition: opacity 0.18s ease;
}

/* 移动端：缩小切换按钮、图片更贴近视口边缘，减少遮挡 */
@media (max-width: 640px) {
  .lb-nav { width: 2.5rem; height: 2.5rem; font-size: 1.5rem; }
  .lb-prev { left: 0.5rem; }
  .lb-next { right: 0.5rem; }
  .lb-image { max-width: 96vw; max-height: 84vh; }
}
</style>
