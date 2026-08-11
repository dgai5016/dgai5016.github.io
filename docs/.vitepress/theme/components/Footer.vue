<template>
  <footer class="footer">
    <div class="footer-inner glass-card">
      © 2026 dg · Powered by
      <a href="https://vitepress.dev" target="_blank" class="footer-link">VitePress</a>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--c-text-secondary);
}

.footer-inner {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
}

/* 桌面端左侧有 16rem sidebar，内容区整体偏右，
   把页脚胶囊左移 sidebar 宽度的一半，使其相对整个视口居中 */
@media (min-width: 1024px) {
  .footer-inner {
    position: relative;
    left: calc(-1 * 16rem / 2);
  }
}

.footer-link {
  color: var(--c-accent);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
