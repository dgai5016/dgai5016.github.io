import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
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
    // Register global components if needed
  },
} satisfies Theme
