import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: "dg's Blog",
  description: '探索 AI 与编程的世界',
  appearance: 'dark',

  head: [
    ['link', { rel: 'icon', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#6c63ff' }],
  ],

  themeConfig: {
    siteTitle: "dg's Blog",
    nav: [
      { text: '首页', link: '/' },
      { text: '分类', link: '/pages/categories' },
      { text: '标签', link: '/pages/tags' },
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
  },
})
