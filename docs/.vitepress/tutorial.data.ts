import { createContentLoader } from 'vitepress'
import { readFileSync, readdirSync, statSync } from 'fs'
import { resolve, join } from 'path'
import { load } from 'js-yaml'

export interface TutorialChapter {
  title: string
  url: string
}

interface TutorialItem {
  name: string
  order: number
  chapters: TutorialChapter[]
}

declare const data: TutorialItem[]
export { data }

// Load tutorial configs from YAML files
const tutorialDir = resolve(__dirname, '../posts/tutorial')
const tutorialMap: Record<string, { name: string; chapters: TutorialChapter[] }> = {}

try {
  const dirs = readdirSync(tutorialDir)
  for (const dir of dirs) {
    const dirPath = join(tutorialDir, dir)
    if (!statSync(dirPath).isDirectory()) continue
    const yamlPath = join(dirPath, 'tutorial.yaml')
    try {
      const content = readFileSync(yamlPath, 'utf-8')
      tutorialMap[dir] = load(content) as { name: string; chapters: TutorialChapter[] }
    } catch {}
  }
} catch {}

function findTutorialConfig(tutorialName: string) {
  if (!tutorialName) return undefined
  for (const config of Object.values(tutorialMap)) {
    if (config.name === tutorialName) return config
  }
  return undefined
}

export default createContentLoader('posts/tutorial/**/*.md', {
  transform(raw): TutorialItem[] {
    return raw
      .filter(({ frontmatter }) => frontmatter.tutorial)
      .map(({ frontmatter }) => {
        const config = findTutorialConfig(frontmatter.tutorial.name)
        return {
          name: frontmatter.tutorial.name,
          order: frontmatter.tutorial.order,
          chapters: config?.chapters || frontmatter.tutorial.chapters || [],
        }
      })
      .sort((a, b) => a.order - b.order)
  },
})
