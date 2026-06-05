<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'

const { theme } = useData()
const nav = theme.value.nav || []
const mobileOpen = ref(false)
</script>

<template>
  <!-- Mobile toggle -->
  <button
    @click="mobileOpen = !mobileOpen"
    class="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg glass text-text-secondary"
    aria-label="Menu"
  >
    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Overlay -->
  <div
    v-if="mobileOpen"
    @click="mobileOpen = false"
    class="lg:hidden fixed inset-0 bg-black/30 z-30"
  />

  <!-- Sidebar -->
  <aside
    :class="[
      'fixed lg:sticky top-0 left-0 z-40 h-screen w-64 shrink-0',
      'glass-sidebar border-r border-border flex flex-col overflow-y-auto',
      'transition-transform lg:translate-x-0',
      mobileOpen ? 'translate-x-0' : '-translate-x-full'
    ]"
  >
    <!-- Profile -->
    <div class="p-6 border-b border-border">
      <div class="flex items-center gap-3 mb-2">
        <div class="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white font-bold text-lg">
          d
        </div>
        <div>
          <h1 class="text-lg font-bold text-accent">dg's Blog</h1>
        </div>
      </div>
      <p class="text-xs text-text-muted">探索 AI 与编程的世界</p>
    </div>

    <!-- Navigation -->
    <nav class="p-4">
      <p class="text-xs font-semibold uppercase text-text-muted tracking-wider mb-3">导航</p>
      <ul class="space-y-0.5">
        <li v-for="item in nav" :key="item.link">
          <a
            :href="item.link"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary
              hover:text-accent hover:bg-accent/5 transition-colors"
            @click="mobileOpen = false"
          >
            <span v-if="item.text === '首页'">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
            </span>
            <span v-else-if="item.text === '分类'">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </span>
            <span v-else-if="item.text === '标签'">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </span>
            <span v-else-if="item.text === '归档'">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
            <span v-else>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Social links -->
    <div class="p-4 border-t border-border">
      <p class="text-xs font-semibold uppercase text-text-muted tracking-wider mb-3">社交</p>
      <a
        href="https://github.com/dgai5016"
        target="_blank"
        class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-secondary
          hover:text-accent hover:bg-accent/5 transition-colors"
      >
        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </aside>
</template>
