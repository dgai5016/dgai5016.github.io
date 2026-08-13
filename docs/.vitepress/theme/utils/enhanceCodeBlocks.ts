// enhanceCodeBlocks.ts
// 给 .vp-doc 内每个代码块（div[class*=language-]）注入「全屏展开」按钮。
// 供 Layout（主文章页，route watch 重注入）与 PostOverlay（右滑预览层，bodyComp 加载后 nextTick 调用）共用。
// 按钮点击后的「展开成全屏」行为由 Layout 的 document 事件委托统一处理，本函数只负责生成按钮节点。
export function enhanceCodeBlocks(root: ParentNode = document): void {
  // SSR 守卫：构建期无 DOM，对齐 Layout.positionBackBtn 的 import.meta.env.SSR 范式
  if (import.meta.env.SSR) return
  const blocks = root.querySelectorAll<HTMLElement>('.vp-doc div[class*="language-"]')
  blocks.forEach((block) => {
    // 幂等：已注入过则跳过（路由/文章切换会重复扫描同一 DOM，避免按钮重复）
    if (block.querySelector('.code-expand-btn')) return
    // 防御：正常代码块都有 pre，没有则跳过
    if (!block.querySelector('pre')) return

    const btn = document.createElement('button')
    btn.className = 'code-expand-btn'
    btn.type = 'button'
    btn.title = '全屏展开'
    btn.setAttribute('aria-label', '全屏展开代码')
    // 四角向外「展开」图标，描边用 currentColor（颜色随按钮 color 变化）
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" ' +
      'd="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>'

    // 必须末尾追加：button.copy 与 span.lang 是相邻兄弟，vp-doc.css 用
    // `button.copy + span.lang` 实现「hover 时代码块右上角语言标签淡出给复制按钮让位」；
    // 若把展开按钮插在两者之间会破坏该相邻选择器。末尾追加则互不影响。
    block.appendChild(btn)
  })
}
