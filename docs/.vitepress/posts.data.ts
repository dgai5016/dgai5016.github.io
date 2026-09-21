import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
  pin: boolean
  // 首页隐藏标记：教程子文章（如「学透 Transformer & MOE」的 37+1 个概念单篇）声明
  // hidden: true 后，仅在首页「浏览态」的文章流里被过滤掉；
  // 归档页、标签页、搜索（首页搜索框 / 命令面板）仍然收录——检索行为应能找到单篇
  hidden?: boolean
  cover?: string
  readingTime: string
}

declare const data: Post[]
export { data }

// 双语文档库（posts/ai/mcp、posts/ai/ragflow 下的 {en,zh,paired}/ 与 shared-context.md）
// 住在 posts/ 目录下但不是文章：srcExclude 已挡住路由，这里再挡住数据层，
// 防止上百个文档混进首页/归档/命令面板。url 兼容带/不带 .html 后缀两种形态
const DOC_LIB_RE = /^\/posts\/ai\/(mcp|ragflow|vector-db-101)\/(en|zh|paired)\/|^\/posts\/ai\/(mcp|ragflow|vector-db-101)\/shared-context(\.html)?$/

export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => !DOC_LIB_RE.test(url))
      .map(({ url, frontmatter, excerpt }) => {
        return {
          title: frontmatter.title || '',
          url,
          date: frontmatter.date || '',
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || excerpt || '',
          pin: frontmatter.pin || false,
          hidden: frontmatter.hidden || false,
          cover: frontmatter.cover,
          readingTime: frontmatter.readingTime || '',
        }
      })
      .sort((a, b) => {
        if (a.pin !== b.pin) return a.pin ? -1 : 1
        return +new Date(b.date) - +new Date(a.date)
      })
  },
})
