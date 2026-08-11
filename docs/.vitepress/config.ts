import { defineConfig } from 'vitepress'
import markdownItCjkFriendly from 'markdown-it-cjk-friendly'

export default defineConfig({
  lang: 'zh-CN',
  title: "dg's Blog",
  description: '探索 AI 与编程的世界',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6c63ff' }],
  ],

  themeConfig: {
    siteTitle: "dg's Blog",
    nav: [
      { text: '首页', link: '/' },
      { text: '教程', link: '/pages/tutorials' },
      { text: '归档', link: '/pages/archives' },
      { text: '关于', link: '/pages/about' },
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
    },
  },
})
