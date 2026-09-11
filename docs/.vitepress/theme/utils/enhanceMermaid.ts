// enhanceMermaid：把 VitePress 渲染出的 ```mermaid 代码块在客户端画成 SVG 图。
// VitePress 默认不渲染 mermaid（只当代码块展示），MCP 官方文档里大量架构图/时序图
// 都是 mermaid，本工具扫描容器内的 .language-mermaid 块，调 mermaid.render 生成 SVG
// 并原位替换代码块。mermaid 包约 2MB，走动态 import——页面没有 mermaid 块就零加载。
// 与 enhanceCodeBlocks 同款使用方式：内容挂载后调用 enhanceMermaid(container)。

let mermaidMod: any = null // 单例：整个站点只 initialize 一次

async function getMermaid() {
  if (!mermaidMod) {
    mermaidMod = (await import('mermaid')).default
    mermaidMod.initialize({
      startOnLoad: false, // 手动控制渲染时机（内容是异步挂载的）
      // securityLevel 默认 strict，会对 SVG 做净化，内容全部来自本仓库文档，安全
      theme: 'default',
      // 关键：默认的 htmlLabels 用 foreignObject 嵌 HTML 画节点文字，在 Safari /
      // 特定字体度量下不随 viewBox 等比缩放，节点文字会被视口裁剪（底部截断）。
      // 改用原生 SVG <text>（随 viewBox 整体缩放，全浏览器一致）。
      // 注意 mermaid 12 里这是【根级】配置——旧的 flowchart.htmlLabels 已废弃，
      // 写在子层级会被静默忽略（这就是第一次修复没生效的原因）
      htmlLabels: false,
    })
  }
  return mermaidMod
}

export async function enhanceMermaid(container: HTMLElement | Document = document) {
  // VitePress 的围栏代码块结构：div.language-mermaid > pre > code
  const blocks = Array.from(
    container.querySelectorAll<HTMLElement>('div[class*="language-mermaid"]'),
  )
  if (!blocks.length) return // 没有 mermaid 图就不加载 mermaid 包

  const mermaid = await getMermaid()
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    const code = block.querySelector('code')
    // 防重复渲染（overlay 内切换文档/路由切换时同一块可能被扫到两次）
    if (!code || block.dataset.mermaidRendered) continue
    block.dataset.mermaidRendered = '1'
    try {
      const { svg } = await mermaid.render(
        'mmd-' + Date.now() + '-' + i, // SVG id 必须全页唯一
        code.textContent || '',
      )
      const wrap = document.createElement('div')
      wrap.className = 'mermaid-svg'
      wrap.title = '点击放大' // 提示可点击（Layout 的全局委托会唤起 ImageLightbox）
      wrap.innerHTML = svg
      // 整块替换：代码壳（pre/复制按钮/语言标签）不再需要
      block.replaceChildren(wrap)
    } catch {
      // 解析失败（语法错误等）：保留原代码块展示源码，不炸页面
      delete block.dataset.mermaidRendered
    }
  }
}
