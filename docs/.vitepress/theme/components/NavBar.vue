<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'

const { theme, site } = useData()
const nav = theme.value.nav || []
const mobileOpen = ref(false)

function toggleDark() {
  const html = document.documentElement
  const isDark = html.classList.contains('dark')
  html.classList.toggle('dark', !isDark)
  html.classList.toggle('light', isDark)
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="/" class="text-xl font-bold text-accent tracking-tight">
          dg's Blog
        </a>

        <!-- Desktop nav -->
        <nav class="hidden sm:flex items-center gap-6">
          <a
            v-for="item in nav"
            :key="item.link"
            :href="item.link"
            class="text-sm text-text-dark-muted hover:text-accent transition-colors"
          >
            {{ item.text }}
          </a>
          <button
            @click="toggleDark"
            class="p-2 rounded-lg hover:bg-bg-dark-surface transition-colors text-text-dark-muted"
            aria-label="Toggle dark mode"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </nav>

        <!-- Mobile hamburger -->
        <button
          @click="mobileOpen = !mobileOpen"
          class="sm:hidden p-2 rounded-lg hover:bg-bg-dark-surface text-text-dark-muted"
          aria-label="Menu"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="sm:hidden glass border-t border-white/5">
      <nav class="flex flex-col px-4 py-3 gap-3">
        <a
          v-for="item in nav"
          :key="item.link"
          :href="item.link"
          class="text-sm text-text-dark-muted hover:text-accent transition-colors py-1"
          @click="mobileOpen = false"
        >
          {{ item.text }}
        </a>
      </nav>
    </div>
  </header>
</template>
