import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
  pin: boolean
  cover?: string
  readingTime: string
}

declare const data: Post[]
export { data }

// MCP 双语文档库（posts/ai/mcp/{en,zh,paired}/ 与 shared-context.md）住在 posts/
// 目录下但不是文章：srcExclude 已挡住路由，这里再挡住数据层，
// 防止 72 个文档混进首页/归档/命令面板。url 兼容带/不带 .html 后缀两种形态
const MCP_DOC_RE = /^\/posts\/ai\/mcp\/(en|zh|paired)\/|^\/posts\/ai\/mcp\/shared-context(\.html)?$/

export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .filter(({ url }) => !MCP_DOC_RE.test(url))
      .map(({ url, frontmatter, excerpt }) => {
        return {
          title: frontmatter.title || '',
          url,
          date: frontmatter.date || '',
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || excerpt || '',
          pin: frontmatter.pin || false,
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
