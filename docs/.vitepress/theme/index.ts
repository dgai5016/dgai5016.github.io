import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import PostLink from './components/PostLink.vue'
import McpDocLink from './components/McpDocLink.vue'
import RagflowDocLink from './components/RagflowDocLink.vue'
import VectorDbDocLink from './components/VectorDbDocLink.vue'
import BiRow from './components/BiRow.vue'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/utils.css'
// 图标 CSS 变量（复制按钮的 --vp-icon-copy / --vp-icon-copied 在此定义）。
// 缺了它，代码块右上角的复制按钮会变成没有图标的空白方框。
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import './style.css'
import 'katex/dist/katex.min.css'
import 'markdown-it-texmath/css/texmath.css'

export default {
  Layout,
  enhanceApp({ app }) {
    // 全局注册 PostLink，使 markdown 里可直接用 <PostLink to="...">文本</PostLink>
    app.component('PostLink', PostLink)
    // McpDocLink：学习地图文章里 <McpDocLink slug="...">文本</McpDocLink> 点击开双栏 overlay
    app.component('McpDocLink', McpDocLink)
    // RagflowDocLink：RAGFlow 学习地图文章里同款链接组件（与 McpDocLink 共用同一 overlay）
    app.component('RagflowDocLink', RagflowDocLink)
    // VectorDbDocLink：Vector Database 101 学习地图文章里同款链接组件（共用同一 overlay）
    app.component('VectorDbDocLink', VectorDbDocLink)
    // BiRow：配对 md（docs/mcp-docs/paired/）里直接使用，无需逐文件 import
    app.component('BiRow', BiRow)
  },
} satisfies Theme
