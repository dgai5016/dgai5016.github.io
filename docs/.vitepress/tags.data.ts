import { createContentLoader } from 'vitepress'

export interface TagInfo {
  name: string
  count: number
}

declare const data: TagInfo[]
export { data }

// 双语文档库不是文章，不参与标签统计（与 posts.data.ts 同一排除规则，覆盖 mcp/ragflow 两库）
const DOC_LIB_RE = /^\/posts\/ai\/(mcp|ragflow|vector-db-101)\/(en|zh|paired)\/|^\/posts\/ai\/(mcp|ragflow|vector-db-101)\/shared-context(\.html)?$/

export default createContentLoader('posts/**/*.md', {
  transform(raw): TagInfo[] {
    const tagMap = new Map<string, number>()
    for (const { url, frontmatter } of raw) {
      if (DOC_LIB_RE.test(url)) continue
      const tags: string[] = frontmatter.tags || []
      for (const tag of tags) {
        tagMap.set(tag, (tagMap.get(tag) || 0) + 1)
      }
    }
    return Array.from(tagMap.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  },
})
