import { defineConfig } from 'vitepress'
import markdownItCjkFriendly from 'markdown-it-cjk-friendly'
import markdownItTexmath from 'markdown-it-texmath'
import katex from 'katex'

export default defineConfig({
  lang: 'zh-CN',
  title: "dg's Blog",
  description: '探索 AI 与编程的世界',

  // texmath 渲染公式时会用非标准的 <eq>/<eqn> 标签包裹公式，
  // 不在这里声明为自定义元素的话，Vue 会把它们当组件解析——
  // 运行时找不到该组件，公式就整体变成空节点（页面上凭空消失）
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag === 'eq' || tag === 'eqn',
      },
    },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6c63ff' }],
  ],

  themeConfig: {
    siteTitle: "dg's Blog",
    nav: [
      { text: '首页', link: '/' },
      { text: '归档', link: '/pages/archives' },
      { text: '书单', link: '/pages/books' }, // 书单页：按主题分抽屉展示书籍
      // { text: '关于', link: '/pages/about' }, // 暂时先不显示「关于」
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/dgai5016' },
    ],

    footer: {
      message: '© 2026 dg · Powered by VitePress',
    },
  },

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
    lineNumbers: true,
    headers: true,
    config(md) {
      // 让中文紧贴 ** / _ 时也能正确加粗/斜体（CommonMark 默认不认 CJK 为合法边界）
      md.use(markdownItCjkFriendly)
      // 数学公式渲染：行内 $...$、块级 $$...$$，由 KaTeX 驱动
      md.use(markdownItTexmath, { engine: katex, delimiters: 'dollars' })
    },
  },
})
