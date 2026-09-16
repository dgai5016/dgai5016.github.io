<script setup lang="ts">
// RagflowDocLink：《RAGFlow 学习地图》文章里的文档链接组件。
// 与 McpDocLink 同款套路：渲染带 target 的真实 <a>（绕开 VitePress 的 SPA 链接接管），
// 普通左键点击 preventDefault 后打开双语覆盖层；修饰键 / 中键 / 新标签放行原生行为，
// 落到官方英文原文——SEO / 右键复制链接 / 可访问性全部保留。
import { inject } from 'vue'

const props = defineProps<{ slug: string }>() // 文档标识，对应 ragflow-docs-manifest 里的 slug

// 从 Layout 注入「打开双栏覆盖层」方法（默认空函数兜底，防注入缺失时报错）；
// 与 McpDocLink 注入的是同一个 openBilingual——同一个浮层实例
const openBilingual = inject<(slug: string) => void>('openBilingual', () => {})

// 官方英文原文 URL：href 用它（中键/修饰键新标签打开的是原文，语义正确）
import { ragflowDocs } from '../ragflow-docs-manifest'
const meta = ragflowDocs.find((d) => d.slug === props.slug)

function onActivate(e: MouseEvent) {
  // 修饰键 / 非左键：放行原生行为（新标签打开官方原文）
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
  e.preventDefault()
  openBilingual(props.slug)
}
</script>

<template>
  <a v-if="meta" :href="meta.sourceUrl" target="_blank" rel="noopener noreferrer" class="rag-doc-link" @click="onActivate">
    <slot />
  </a>
  <!-- 清单里没有的 slug：退化为普通外链渲染，绝不静默丢链接 -->
  <a v-else :href="'https://ragflow.io/docs/' + slug" target="_blank" rel="noopener noreferrer" class="rag-doc-link">
    <slot />
  </a>
</template>

<style scoped>
/* 显示成正文里的内联链接（与 McpDocLink 一致） */
.rag-doc-link {
  color: var(--c-accent, #6c63ff);
  text-decoration: none;
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
}
.rag-doc-link:hover {
  text-decoration: underline;
}
</style>
