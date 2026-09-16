import { defineConfig } from 'vitepress'
import markdownItCjkFriendly from 'markdown-it-cjk-friendly'
import markdownItTexmath from 'markdown-it-texmath'
import katex from 'katex'

export default defineConfig({
  lang: 'zh-CN',
  title: "dg's Blog",
  description: '探索 AI 与编程的世界',

  // 双语文档库（posts/ai/mcp、posts/ai/ragflow 下的 en/zh/paired 与 shared-context.md）
  // 不作为独立页面路由，只作为模块被 BilingualOverlay 懒加载——
  // 注意只排除文档子目录：posts/ai/<合集>/ 顶层的正常文章照常路由
  srcExclude: [
    'posts/ai/mcp/en/**',
    'posts/ai/mcp/zh/**',
    'posts/ai/mcp/paired/**',
    'posts/ai/mcp/shared-context.md',
    'posts/ai/ragflow/en/**',
    'posts/ai/ragflow/zh/**',
    'posts/ai/ragflow/paired/**',
    'posts/ai/ragflow/shared-context.md',
  ],

  // texmath 渲染公式时会用非标准的 <eq>/<eqn> 标签包裹公式，
  // 不在这里声明为自定义元素的话，Vue 会把它们当组件解析——
  // 运行时找不到该组件，公式就整体变成空节点（页面上凭空消失）
  // 同理：MCP 文档原文里的 Mintlify 私有组件（CodeGroup/Badge/Accordion 等）
  // 在配对 md 中原样保留，也必须声明为自定义元素——内容按原生 HTML 渲染，
  // 标签本身退化为无样式容器（代码块平铺、徽章显示文字），不炸渲染
  // RAGFlow（Docusaurus）侧同理：清洗脚本正常会拆掉 Tabs/TabItem/APITable 等壳，
  // 这里声明是防御——万一漏网也不至于让 Vue 构建失败
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) =>
          ['eq', 'eqn', 'CodeGroup', 'CodeGroupItem', 'Accordion', 'AccordionGroup', 'Badge', 'Tooltip', 'Info', 'Icon', 'Frame', 'Tabs', 'TabItem', 'APITable', 'TOCInline', 'BrowserWindow', 'CodeBlock'].includes(tag),
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
