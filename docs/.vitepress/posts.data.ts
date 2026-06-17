import { createContentLoader } from 'vitepress'
import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'
import { load } from 'js-yaml'

export interface TutorialChapter {
  title: string
  url: string
}

export interface Post {
  title: string
  url: string
  date: string
  tags: string[]
  excerpt: string
  pin: boolean
  cover?: string
  readingTime: string
  tutorial?: {
    name: string
    order: number
    chapters: TutorialChapter[]
  }
}

declare const data: Post[]
export { data }

// Load tutorial configs from YAML files
const tutorialDir = resolve(__dirname, '../posts/tutorial')
const tutorialConfigs: { name: string; chapters: TutorialChapter[] }[] = []

try {
  const dirs = readdirSync(tutorialDir)
  for (const dir of dirs) {
    const dirPath = join(tutorialDir, dir)
    if (!statSync(dirPath).isDirectory()) continue
    const yamlPath = join(dirPath, 'tutorial.yaml')
    try {
      const content = readFileSync(yamlPath, 'utf-8')
      tutorialConfigs.push(load(content) as { name: string; chapters: TutorialChapter[] })
    } catch {}
  }
} catch {}

function findTutorialChapters(tutorialName: string): TutorialChapter[] {
  if (!tutorialName) return []
  for (const config of tutorialConfigs) {
    if (config.name === tutorialName) return config.chapters
  }
  return []
}

export default createContentLoader('posts/**/*.md', {
  excerpt: true,
  transform(raw): Post[] {
    return raw
      .map(({ url, frontmatter, excerpt }) => {
        const tutorialFm = frontmatter.tutorial
        let tutorial: Post['tutorial'] = undefined

        if (tutorialFm) {
          tutorial = {
            name: tutorialFm.name,
            order: tutorialFm.order,
            chapters: tutorialFm.chapters || findTutorialChapters(tutorialFm.name),
          }
        }

        return {
          title: frontmatter.title || '',
          url,
          date: frontmatter.date || '',
          tags: frontmatter.tags || [],
          excerpt: frontmatter.excerpt || excerpt || '',
          pin: frontmatter.pin || false,
          cover: frontmatter.cover,
          readingTime: frontmatter.readingTime || '',
          tutorial,
        }
      })
      .sort((a, b) => {
        if (a.pin !== b.pin) return a.pin ? -1 : 1
        return +new Date(b.date) - +new Date(a.date)
      })
  },
})
