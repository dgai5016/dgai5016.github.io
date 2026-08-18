import { readFileSync } from 'fs'
import { basename, extname } from 'path'
import { load as parseYaml } from 'js-yaml'

// 阅读状态只支持「读完」：写了的书在页面上显示绿色胶囊，没写不显示任何状态
export type BookStatus = '读完'

// 单本书：书名 / 作者 / 阅读状态（可选，只有「读完」才显示）/ 豆瓣链接（可选，写了书名可点击跳转）
export interface Book {
  title: string
  author: string
  status?: BookStatus
  douban?: string
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

// 归一化单本书：字段缺失或类型不对时给兜底值，保证页面渲染永不崩
// status 只有恰好等于「读完」才保留；douban 必须是 http(s) 开头的字符串才有效
function normalizeBook(raw: any): Book {
  return {
    title: typeof raw?.title === 'string' && raw.title ? raw.title : '未命名书目',
    author: typeof raw?.author === 'string' ? raw.author : '',
    status: raw?.status === '读完' ? '读完' : undefined,
    douban:
      typeof raw?.douban === 'string' && raw.douban.startsWith('http') ? raw.douban : undefined,
  }
}

// 主题内排序：读完的排前面，未读完的排后面
// （sort 是稳定排序，两组内部各自保持 yaml 里的书写顺序）
function sortBooks(books: Book[]): Book[] {
  return books.sort((a, b) => Number(b.status === '读完') - Number(a.status === '读完'))
}

export default {
  // 监听 docs/books/ 下所有 yaml（相对本文件目录解析）；
  // dev 模式下增删改 yaml 会自动热更新，无需重启服务器
  watch: '../books/*.yaml',
  // files 是 VitePress 传入的匹配到的文件绝对路径列表；
  // 返回值会被插件直接序列化为该模块的 data 导出，所以这里返回数组本身
  async load(files: string[]): Promise<BookTopic[]> {
    const topics: BookTopic[] = []
    for (const file of files) {
      try {
        // 逐文件读取并用 js-yaml 解析（构建期在 Node 里运行）
        const raw: any = parseYaml(readFileSync(file, 'utf-8'))
        // 主题 id 取文件名（去掉扩展名），与显示名解耦、不会重复
        const id = basename(file, extname(file))
        topics.push({
          id,
          name: typeof raw?.name === 'string' && raw.name ? raw.name : id,
          order: typeof raw?.order === 'number' ? raw.order : 100,
          books: sortBooks(Array.isArray(raw?.books) ? raw.books.map(normalizeBook) : []),
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
