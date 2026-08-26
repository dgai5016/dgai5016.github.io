import { readFileSync, readdirSync } from 'fs'
import { basename, dirname, extname, join } from 'path'
import { load as parseYaml } from 'js-yaml'

// 阅读状态只支持「读完」：写了的书在页面上显示绿色胶囊，没写不显示任何状态
export type BookStatus = '读完'

// 难度等级（书单「由易到难」排序用）：简单 → 中等 → 困难，未分级排在最后
export type BookLevel = '简单' | '中等' | '困难'

// 挂在某本书下的单个文档（读书笔记 / 大纲等 markdown）
// url 形如 /books/<目录>/<文件名>.html，由 VitePress 把 md 编译成页面
export interface BookDoc {
  title: string // 显示名：取文档 frontmatter 的 title，兜底第一个 # 标题或文件名
  url: string // 站内链接，点击跳转到文档页面
}

// 单本书：书名 / 作者 / 阅读状态（可选，只有「读完」才显示）/ 京东商品页链接（可选） / 微信读书链接（可选）
// translator / publisher / pubDate / cover（均可选）：译者 / 出版社 / 出版时间（"YYYY-MM"）/ 封面图站点绝对路径（缺省显示通用兜底图）
// dir（可选）：这本书的专属文档目录名（docs/books/ 下的子目录），构建期扫描其中的 md 生成 docs 列表
export interface Book {
  title: string
  author: string
  level?: BookLevel // 难度等级（可选）：主题内按 入门→进阶→实战 排序；不写排在最后
  translator?: string // 译者（可选）：多人用「、」分隔，中文原创书没有
  publisher?: string // 出版社（可选）
  pubDate?: string // 出版时间（可选）：格式 "YYYY-MM" 或 "YYYY"，yaml 里必须带引号
  pages?: number // 页数（可选）：来自豆瓣/出版社信息，展示为「N 页」
  cover?: string // 封面图（可选）：站点绝对路径，如 /covers/books/xxx.jpg
  status?: BookStatus
  jd?: string // 京东商品页链接（可选）：买了跳京东；京东搜不到的书退回填豆瓣链接
  weread?: string // 微信读书链接（可选）：线上阅读入口，没上架微信读书的书不写
  dir?: string
  docs?: BookDoc[]
}

// 一个读书主题（对应 docs/books/ 下的一个 yaml 文件）
export interface BookTopic {
  id: string // 由文件名生成，作为抽屉开合状态的 key
  name: string // 主题显示名
  order: number // 排序权重，小的排前面
  books: Book[]
}

declare const data: BookTopic[]
export { data }

// 归一化出版时间：只接受 "YYYY-MM" 或 "YYYY" 字符串；
// yaml 里忘加引号时（如 2023-06-01）js-yaml 会把它解析成 Date 对象，这里兜底截回 "YYYY-MM"
function normalizePubDate(v: any): string | undefined {
  if (v instanceof Date) return v.toISOString().slice(0, 7)
  return typeof v === 'string' && /^\d{4}(-\d{2})?$/.test(v) ? v : undefined
}

// 归一化单本书：字段缺失或类型不对时给兜底值，保证页面渲染永不崩
// status 只有恰好等于「读完」才保留；jd 必须是 http(s) 开头的字符串才有效；
// translator / publisher 必须是非空字符串才保留；pubDate 见 normalizePubDate；
// cover 必须是「/」开头的站内绝对路径才保留（防误填外链或本地路径）；
// dir 必须是非空字符串才保留（作为 docs/books/ 下子目录名去扫描文档）
function normalizeBook(raw: any): Book {
  return {
    title: typeof raw?.title === 'string' && raw.title ? raw.title : '未命名书目',
    author: typeof raw?.author === 'string' ? raw.author : '',
    // 难度等级只认三个枚举值，写了别的当未分级（排在最后）
    level: raw?.level === '简单' || raw?.level === '中等' || raw?.level === '困难' ? raw.level : undefined,
    translator:
      typeof raw?.translator === 'string' && raw.translator ? raw.translator : undefined,
    publisher:
      typeof raw?.publisher === 'string' && raw.publisher ? raw.publisher : undefined,
    pubDate: normalizePubDate(raw?.pubDate),
    // 页数：只认数字（yaml 里数字或纯数字字符串都收，展示层拼「N 页」）
    pages: typeof raw?.pages === 'number' ? raw.pages
      : typeof raw?.pages === 'string' && /^\d+$/.test(raw.pages) ? Number(raw.pages) : undefined,
    cover: typeof raw?.cover === 'string' && raw.cover.startsWith('/') ? raw.cover : undefined,
    status: raw?.status === '读完' ? '读完' : undefined,
    jd: typeof raw?.jd === 'string' && raw.jd.startsWith('http') ? raw.jd : undefined,
    weread: typeof raw?.weread === 'string' && raw.weread.startsWith('http') ? raw.weread : undefined,
    dir: typeof raw?.dir === 'string' && raw.dir ? raw.dir : undefined,
  }
}

// 从 markdown 源文本里提取显示标题，三级兜底：
// 1) 开头 frontmatter 块（--- ... ---）里的 title: 值 —— 与 posts 的 frontmatter 惯例一致
// 2) 正文第一个 # 一级标题
// 3) 都没有就用文件名（去掉 .md 后缀）
function extractDocTitle(content: string, fileName: string): string {
  const fm = content.match(/^---\r?\n([\s\S]*?)\r?\n---/) // 只认文件最开头的 frontmatter 块
  if (fm) {
    const t = fm[1].match(/^title:\s*(.+)\s*$/m) // frontmatter 里的 title 行
    if (t) return t[1].trim().replace(/^["']|["']$/g, '') // 顺手剥掉两侧引号
  }
  const h1 = content.match(/^#\s+(.+)\s*$/m) // 正文里第一个一级标题
  if (h1) return h1[1].trim()
  return fileName.replace(/\.md$/, '')
}

// 扫描某本书的专属文档目录（dirName 位于 yaml 同级目录下），生成文档列表
// 目录不存在或没有 md 时返回空数组（页面上该书就不显示文档区），不让构建报错
function loadBookDocs(yamlFile: string, dirName: string): BookDoc[] {
  const dir = join(dirname(yamlFile), dirName)
  let files: string[]
  try {
    // 只要 md 文件；目录不存在会抛错，走 catch 返回空列表
    files = readdirSync(dir).filter((f) => f.endsWith('.md'))
  } catch {
    return []
  }
  // 按文件名升序排列：往目录里放文档的顺序对页面展示顺序可预期
  files.sort((a, b) => a.localeCompare(b, 'en'))
  return files.map((f) => ({
    title: extractDocTitle(readFileSync(join(dir, f), 'utf-8'), f),
    // 站内 URL：docs/ 是 VitePress 的 srcDir，md 会编译成同名 .html 页面
    url: `/books/${dirName}/${f.replace(/\.md$/, '')}.html`,
  }))
}

// 主题内排序：按难度「由易到难」（简单 → 中等 → 困难），未分级排在最后；
// 同级内部保持 yaml 里的书写顺序（sort 是稳定排序），想微调同级内顺序直接挪 yaml 行；
// 注意：阅读状态（读完）不影响排序——书单顺序是推荐阅读路径，读完只是状态标签
function sortBooks(books: Book[]): Book[] {
  const levelOrder = (lv?: BookLevel) => (lv === '简单' ? 0 : lv === '中等' ? 1 : lv === '困难' ? 2 : 3)
  return books.sort((a, b) => levelOrder(a.level) - levelOrder(b.level))
}

export default {
  // 监听 docs/books/ 下所有 yaml 和子目录里的 md 文档（相对本文件目录解析）；
  // dev 模式下增删改书单 yaml、往书的文档目录里放/删 md 都会自动热更新，无需重启服务器
  watch: ['../books/*.yaml', '../books/**/*.md'],
  // files 是 VitePress 传入的匹配到的文件绝对路径列表；
  // 返回值会被插件直接序列化为该模块的 data 导出，所以这里返回数组本身
  async load(files: string[]): Promise<BookTopic[]> {
    const topics: BookTopic[] = []
    for (const file of files) {
      // watch 同时匹配了 yaml 和书文档 md（为了 md 变更也能触发热更新），
      // 但 load 只解析 yaml 主题文件；md 由 loadBookDocs 单独扫描，这里直接跳过
      if (!file.endsWith('.yaml')) continue
      try {
        // 逐文件读取并用 js-yaml 解析（构建期在 Node 里运行）
        const raw: any = parseYaml(readFileSync(file, 'utf-8'))
        // 主题 id 取文件名（去掉扩展名），与显示名解耦、不会重复
        const id = basename(file, extname(file))
        topics.push({
          id,
          name: typeof raw?.name === 'string' && raw.name ? raw.name : id,
          order: typeof raw?.order === 'number' ? raw.order : 100,
          books: sortBooks(
            (Array.isArray(raw?.books) ? raw.books.map(normalizeBook) : []).map((book: Book) =>
              // 声明了 dir 的书：扫描该目录把文档列表挂上去；没声明的书保持原样
              book.dir ? { ...book, docs: loadBookDocs(file, book.dir) } : book,
            ),
          ),
        })
      } catch (e) {
        // 单个 yaml 写坏只跳过该主题并告警，不影响整体构建
        console.warn(`[books.data] 跳过无法解析的书单文件: ${file}`, e)
      }
    }
    // 排序：order 小的在前，相同 order 再按主题名中文排序
    topics.sort((a, b) => a.order - b.order || a.name.localeCompare(b.name, 'zh'))
    return topics
  },
}
