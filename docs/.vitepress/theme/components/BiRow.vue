<script setup lang="ts">
// BiRow：双语对照行（MCP 文档双栏阅读的核心排版单元）。
// 管线生成的配对 md 里，每一段英文/中文包裹成：
//   <BiRow><template #en>英文段</template><template #zh>中文段</template></BiRow>
// 本组件把两侧放进同一网格行的左右两格，实现逐段水平对齐。
// 插槽内容由 VitePress 在构建期编译（代码高亮/表格/公式全保真），这里只管布局。
</script>

<template>
  <div class="bi-row">
    <!-- 英文原文字格：vp-doc 提供正文排版（标题/代码块/表格样式） -->
    <div class="bi-cell bi-en vp-doc">
      <slot name="en" />
    </div>
    <!-- 中文译文格 -->
    <div class="bi-cell bi-zh vp-doc">
      <slot name="zh" />
    </div>
  </div>
</template>

<style scoped>
/* 左右两格等宽、顶部对齐：段落长短不一时保持起始线一致 */
.bi-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.75rem;
  align-items: start;
  padding: 0.9rem 0;
  border-bottom: 1px dashed rgba(108, 99, 255, 0.16); /* 行分隔线，区分段落对 */
}
.bi-row:last-child {
  border-bottom: none;
}
/* min-width:0 防止 grid 单元格被长代码行撑破布局 */
.bi-cell {
  min-width: 0;
  overflow-wrap: break-word;
}
/* 英文格整体略淡，突出中文译文为主阅读侧 */
.bi-en {
  opacity: 0.92;
}
</style>
