import { createContentLoader } from 'vitepress'

export interface CategoryInfo {
  slug: string
  name: string
  count: number
}

declare const data: CategoryInfo[]
export { data }

const CATEGORY_NAMES: Record<string, string> = {
  ai: 'AI 学习',
  coding: '编程技术',
  project: '项目实战',
  tools: '工具效率',
  thoughts: '随笔',
}

export default createContentLoader('posts/**/*.md', {
  transform(raw): CategoryInfo[] {
    const catMap = new Map<string, number>()
    for (const { frontmatter } of raw) {
      const cat = frontmatter.category
      if (cat) {
        catMap.set(cat, (catMap.get(cat) || 0) + 1)
      }
    }
    return Array.from(catMap.entries())
      .map(([slug, count]) => ({
        slug,
        name: CATEGORY_NAMES[slug] || slug,
        count,
      }))
      .sort((a, b) => b.count - a.count)
  },
})
