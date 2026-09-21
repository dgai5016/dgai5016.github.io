// 文章地图数据层：build 期用 fs + regex 读 posts/ 文章源码，自动构建「根 → 标签分类 → 文章」两层树。
// 零手工维护——发新文章星图自动长出来。
//
// 粒度约定（2026-09 与 dg 对齐）：只细化到「首页显示的文章」——
// 一级 = 文章的标签分类（本站约定每篇单标签），二级 = 该分类下的可见文章；
// 合集内部条目（教程子文章、译文页、开源库条目）与 hidden 文章不进图。
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export interface MapNode {
  id: string
  title: string
  url?: string // 站内路径（点击以浮层打开文章）
  children: MapNode[]
}

declare const data: MapNode
export { data }

// 双语文档库不是文章（与 posts.data.ts 同一排除规则，覆盖 mcp/ragflow/vector-db-101 三库）
const DOC_LIB_RE = /\/posts\/ai\/(mcp|ragflow|vector-db-101)\//
const DOCS_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// 遍历目录收全部 .md 的相对路径（POSIX 分隔符）
function walkMd(dir: string, out: string[] = []): string[] {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) walkMd(full, out)
    else if (name.endsWith('.md')) out.push(path.relative(DOCS_ROOT, full).split(path.sep).join('/'))
  }
  return out
}

// 从 md 源码提 frontmatter 字段（逐行 regex，不引 yaml 依赖）
function fm(source: string, key: string): string {
  const m = source.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))
  return m ? m[1].trim() : ''
}

// 相对路径 → 站内 url（posts/ai/x.md → /posts/ai/x）
function toUrl(rel: string): string {
  return '/' + rel.replace(/\.md$/, '')
}

// 读 frontmatter 标签，兼容两种写法（本站约定单标签；防御性兜底「未分类」）：
// 行式 `tags: [AI]` 与块式 `tags:` 换行后跟 `  - 论文翻译`
function fmTags(source: string): string[] {
  const inline = source.match(/^tags:\s*\[(.+)\]\s*$/m)
  if (inline) return inline[1].split(',').map((s) => s.trim()).filter(Boolean)
  const block = source.match(/^tags:\s*\n(?:\s+-\s+.+\n?)+/m)
  if (!block) return []
  return block[0].match(/-\s+(.+)/g)?.map((s) => s.replace(/^-\s+/, '').trim()).filter(Boolean) ?? []
}

const allMd = walkMd(DOCS_ROOT).filter((rel) => !DOC_LIB_RE.test('/' + rel))
interface Article { url: string; title: string; date: string; hidden: boolean; tag: string }
const articles: Article[] = []
for (const rel of allMd) {
  if (!rel.startsWith('posts/')) continue // 星图只收 posts/ 文章（译文页等内嵌内容不进图）
  const source = fs.readFileSync(path.join(DOCS_ROOT, rel), 'utf-8')
  articles.push({
    url: toUrl(rel),
    title: fm(source, 'title'),
    date: fm(source, 'date'),
    hidden: fm(source, 'hidden') === 'true',
    tag: fmTags(source)[0] || '未分类',
  })
}
const byDate = (a: Article, b: Article) => +new Date(b.date) - +new Date(a.date)

// 一级 = 标签分类（组内文章数多的分类扇区大、排前），二级 = 该分类下的可见文章（date 倒序）
const visible = articles.filter((a) => !a.hidden)
const byTag = new Map<string, Article[]>()
for (const a of visible) {
  if (!byTag.has(a.tag)) byTag.set(a.tag, [])
  byTag.get(a.tag)!.push(a)
}
const tags = Array.from(byTag.entries()).sort((x, y) => y[1].length - x[1].length)

export default {
  // dev 模式下监听源文件：改文章 / 发新文章后星图自动重载（相对本 data 文件的 glob）
  watch: ['../posts/**/*.md'],
  load() {
    return {
      id: 'root',
      title: "dg's Blog",
      children: tags.map(([tag, list]) => ({
        id: `tag:${tag}`,
        title: tag,
        children: list.sort(byDate).map((a) => ({ id: a.url, title: a.title, url: a.url, children: [] })),
      })),
    } satisfies MapNode
  },
}
