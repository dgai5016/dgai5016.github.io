import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/utils.css'
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
