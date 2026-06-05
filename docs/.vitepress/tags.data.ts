import { createContentLoader } from 'vitepress'

export interface TagInfo {
  name: string
  count: number
}

declare const data: TagInfo[]
export { data }

export default createContentLoader('posts/**/*.md', {
  transform(raw): TagInfo[] {
    const tagMap = new Map<string, number>()
    for (const { frontmatter } of raw) {
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
