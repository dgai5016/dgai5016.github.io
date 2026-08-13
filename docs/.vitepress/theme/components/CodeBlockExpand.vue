<script setup lang="ts">
// CodeBlockExpand.vue
// 代码块「全屏展开」模态层：深色遮罩 + 居中代码舞台 + 右上角「换行开关 / 关闭」。
// 结构照搬 ImageLightbox.vue（遮罩 z-index:200 / Esc 关闭 / body 滚动锁记录-还原 / Transition 进出动画）。
// 代码内容由 Layout 的 document 事件委托克隆代码块后传入（codeHtml），本组件只负责展示与交互。
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  modelValue: boolean   // v-model 控制开合
  codeHtml: string      // 克隆得到的代码块 outerHTML（作者 markdown 编译产物，非用户输入 → v-html 安全）
  lang?: string         // 语言名（可选，取自代码块的 span.lang 文本，显示在舞台左上角）
}>()
const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

// 换行开关：false=保持代码原样（pre，舞台内 overflow 兜底横向滚动），true=自动换行（pre-wrap）
const wrap = ref(false)
// 每次打开都重置为「不换行」，避免上次的换行状态残留到新打开的代码块
watch(() => props.modelValue, (open) => {
  if (open) wrap.value = false
})

function close() {
  emit('update:modelValue', false)
}
function toggleWrap() {
  wrap.value = !wrap.value
}

// 键盘交互：Esc 关闭。
// stopImmediatePropagation 阻止同一 Esc 继续冒泡/触发 PostOverlay 等下层监听，防止「一次 Esc 连关两层」。
function onKey(e: KeyboardEvent) {
  if (!props.modelValue) return
  if (e.key === 'Escape') {
    close()
    e.stopImmediatePropagation()
  }
}

// body 滚动锁：记录-还原模式（与 ImageLightbox 完全一致）。
// 从 PostOverlay（它已把 body overflow 锁成 hidden）里打开本层时，记录到的 savedOverflow 是 'hidden'，
// 关闭时还原成 'hidden'——不会误把覆盖层的滚动锁也解开，三层模态栈式协同。
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
  // 组件卸载时兜底还原 body 滚动，防止模态意外销毁后页面被永久锁住
  if (typeof document !== 'undefined') document.body.style.overflow = savedOverflow
})
</script>

<template>
  <!-- 半透明遮罩 + 居中代码舞台；点遮罩任意空白处关闭 -->
  <Transition name="cb-fade" appear>
    <div v-if="modelValue" class="cb-backdrop" @click="close">
      <!-- 代码舞台：点代码本身不关闭（@click.stop），避免查看代码时误触关闭 -->
      <div class="cb-stage" :class="{ 'cb-wrap': wrap }" @click.stop>
        <!-- 左上角语言标签 -->
        <span v-if="lang" class="cb-lang">{{ lang }}</span>
        <!--
          代码渲染区：外层带 vp-doc 类，让 vp-doc.css 的代码布局/配色规则在本模态里重新生效
          （克隆保留了 div↔pre↔code 层级，后代选择器 .vp-doc [class*=language-] pre 才匹配得到）；
          v-html 注入克隆的代码块 outerHTML。
        -->
        <div class="vp-doc cb-code-scroll" v-html="codeHtml"></div>
      </div>

      <!-- 右上角：换行开关（放在关闭按钮左边） -->
      <button
        class="cb-btn cb-wrap-btn"
        :class="{ 'is-active': wrap }"
        @click.stop="toggleWrap"
        :title="wrap ? '取消自动换行' : '长行自动换行'"
        :aria-label="wrap ? '取消换行' : '自动换行'"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="20" height="20" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h10M4 18h16" />
        </svg>
      </button>

      <!-- 右上角：关闭 -->
      <button class="cb-btn cb-close" @click.stop="close" title="关闭（Esc）" aria-label="关闭">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" width="22" height="22" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>

<style scoped>
/* 遮罩：全屏深色半透明；z-index 200 与 ImageLightbox 同层，高于 PostOverlay(101)，确保从覆盖层里打开也在最上层 */
.cb-backdrop {
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

/* 代码舞台：限视口、背景对齐代码块底色、代码区可滚 */
.cb-stage {
  position: relative;
  width: 95vw;
  max-width: 1100px;
  height: 90vh;
  background: var(--vp-code-block-bg);
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  cursor: default;
  overflow: hidden;
}

/* 左上角语言标签 */
.cb-lang {
  position: absolute;
  top: 0.5rem;
  left: 0.85rem;
  z-index: 2;
  font-size: 12px;
  font-weight: 500;
  user-select: none;
  color: var(--vp-code-lang-color, var(--c-text-muted));
}

/* 代码滚动区：吃掉舞台剩余空间，横向/纵向均可滚 */
.cb-code-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 2.25rem 0 1rem;
}

/* 覆盖 vp-doc.css 里 div[language] 的负 margin / 圆角 / 背景，让克隆的代码块在舞台里干净铺满 */
.cb-code-scroll :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  background: transparent;
}

/* 换行开关开启：pre 和 code 都改成 pre-wrap。
   vp-doc.css 把 white-space:pre 同时设在 pre 和 code 上，故两者都要覆盖才能生效。 */
.cb-wrap :deep(div[class*='language-'] pre),
.cb-wrap :deep(div[class*='language-'] code) {
  white-space: pre-wrap !important;
  word-break: break-word;
  overflow-wrap: anywhere;
}

/* 右上角按钮组：圆形、半透明白底，仿 ImageLightbox .lb-close */
.cb-btn {
  position: fixed;
  top: 1rem;
  z-index: 201;
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
  transition: color 0.15s, background 0.15s, border-color 0.15s;
}
.cb-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.22);
}
.cb-close {
  right: 1rem;
}
.cb-wrap-btn {
  right: 4rem;            /* 关闭按钮 width2.5rem + right1rem + 缝0.5rem = 4rem，落在关闭按钮左边 */
}
/* 换行开关激活态：强调色高亮，提示当前处于自动换行模式 */
.cb-wrap-btn.is-active {
  color: #fff;
  background: rgba(108, 99, 255, 0.55);
  border-color: rgba(108, 99, 255, 0.8);
}

/* 打开/关闭：遮罩淡入淡出 */
.cb-fade-enter-from,
.cb-fade-leave-to {
  opacity: 0;
}
.cb-fade-enter-active,
.cb-fade-leave-active {
  transition: opacity 0.25s ease;
}

/* 移动端：舞台更贴近视口边缘，减少遮挡 */
@media (max-width: 640px) {
  .cb-stage {
    width: 96vw;
    height: 92vh;
  }
}
</style>
