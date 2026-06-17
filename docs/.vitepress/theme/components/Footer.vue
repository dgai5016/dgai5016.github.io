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

.footer-link {
  color: var(--c-accent);
  text-decoration: none;
}

.footer-link:hover {
  text-decoration: underline;
}
</style>
