import { createContentLoader } from 'vitepress'

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  category: string
  excerpt: string
  pin: boolean
  cover?: string
  readingTime: string
}

declare const data: Post[]
export { data }

export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => ({
        title: frontmatter.title || '',
        url,
        date: frontmatter.date || '',
        tags: frontmatter.tags || [],
        category: frontmatter.category || '',
        excerpt: excerpt || '',
        pin: frontmatter.pin || false,
        cover: frontmatter.cover,
        readingTime: frontmatter.readingTime || '',
      }))
      .sort((a, b) => {
        if (a.pin !== b.pin) return a.pin ? -1 : 1
        return +new Date(b.date) - +new Date(a.date)
      })
  },
})
