<script setup lang="ts">
// PostLink：站内文章链接，点击从右侧滑出覆盖层（不刷新页面）。
// 渲染【带 target 属性的真实 <a>】—— VitePress 按设计会跳过带 target 的链接
// （源码 link.hasAttribute('target') → 直接 return，不接管 SPA 跳转），
// 再由本组件 @click.prevent 打开覆盖层，彻底绕开与 VitePress 的事件注册顺序竞争。
// 仍是真实 <a href>：SEO / 中键新标签 / 右键复制链接 / 可访问性 都保留。
import { inject } from 'vue'

const props = defineProps<{ to: string }>() // 文章绝对路径，如 /posts/ai/neural-network

// 从 Layout 注入「打开覆盖层」方法（默认空函数兜底，防注入缺失时报错）
const openOverlay = inject<(path: string) => void>('openOverlay', () => {})

function onActivate(e: MouseEvent) {
  // 修饰键 / 非左键：放行，让浏览器原生在新标签打开真实文章
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  openOverlay(props.to.replace(/\.html$/, '').replace(/\/$/, ''))
}
</script>

<template>
  <a :href="to" target="_self" class="post-link" @click="onActivate">
    <slot />
  </a>
</template>

<style scoped>
/* 显示成正文里的内联链接 */
.post-link {
  color: var(--c-accent, #6c63ff);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
}
.post-link:hover {
  text-decoration: underline;
}
</style>
