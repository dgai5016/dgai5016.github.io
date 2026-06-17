<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vitepress'
import type { TutorialChapter } from '../posts.data'

defineProps<{
  mode?: 'inline' | 'sidebar'
  name: string
  order: number
  chapters: TutorialChapter[]
}>()

const route = useRoute()
const mobileOpen = ref(false)
const currentPath = computed(() => route.path.replace(/\.html$/, ''))
</script>

<template>
  <!-- Mobile: collapsible bar -->
  <div class="mobile-section">
    <button
      @click="mobileOpen = !mobileOpen"
      class="mobile-toggle"
    >
      <span class="toggle-label">{{ name }}（{{ order }}/{{ chapters.length }}）</span>
      <svg
        :class="['toggle-icon', mobileOpen ? 'toggle-icon--open' : '']"
        fill="none" viewBox="0 0 24 24" stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    <div v-if="mobileOpen" class="mobile-list">
      <a
        v-for="(ch, idx) in chapters"
        :key="ch.url"
        :href="ch.url"
        :class="[
          'mobile-link',
          ch.url === currentPath ? 'mobile-link--active' : 'mobile-link--default'
        ]"
      >
        {{ idx + 1 }}. {{ ch.title }}
      </a>
    </div>
  </div>

  <!-- Desktop: sidebar mode -->
  <nav v-if="mode === 'sidebar'">
    <div class="glass-card sidebar-card">
      <h4 class="sidebar-label">教程目录</h4>
      <p class="sidebar-title">{{ name }}</p>
      <div class="sidebar-list">
        <a
          v-for="(ch, idx) in chapters"
          :key="ch.url"
          :href="ch.url"
          :class="[
            'sidebar-link',
            ch.url === currentPath
              ? 'sidebar-link--active'
              : 'sidebar-link--default'
          ]"
        >
          {{ idx + 1 }}. {{ ch.title }}
        </a>
      </div>
    </div>
  </nav>

  <!-- Desktop: inline mode (fallback) -->
  <nav v-else class="inline-nav">
    <p class="inline-title">{{ name }}</p>
    <div class="inline-list">
      <a
        v-for="(ch, idx) in chapters"
        :key="ch.url"
        :href="ch.url"
        :class="[
          'inline-link',
          ch.url === currentPath
            ? 'inline-link--active'
            : 'inline-link--default'
        ]"
      >
        {{ idx + 1 }}. {{ ch.title }}
      </a>
    </div>
  </nav>
</template>

<style scoped>
/* Mobile section */
.mobile-section {
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .mobile-section {
    display: none;
  }
}

.mobile-toggle {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid var(--c-border);
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  background: none;
  cursor: pointer;
}

.toggle-label {
  font-weight: 500;
}

.toggle-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.15s ease;
}

.toggle-icon--open {
  transform: rotate(180deg);
}

.mobile-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-top: 0.5rem;
  padding-left: 0.75rem;
  border-left: 2px solid rgba(108, 99, 255, 0.2);
}

.mobile-link {
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.875rem;
  transition: color 0.15s ease;
  text-decoration: none;
}

.mobile-link--active {
  color: var(--c-accent);
  font-weight: 500;
  background: rgba(108, 99, 255, 0.05);
}

.mobile-link--default {
  color: var(--c-text-secondary);
}

.mobile-link--default:hover {
  color: var(--c-accent);
}

/* Sidebar mode */
.sidebar-card {
  border-radius: 0.75rem;
  padding: 1rem;
}

.sidebar-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-muted);
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
}

.sidebar-title {
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--c-text-primary);
  margin: 0 0 0.75rem 0;
}

.sidebar-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sidebar-link {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  transition: color 0.15s ease, background-color 0.15s ease;
  border-radius: 0.5rem;
  text-decoration: none;
}

.sidebar-link--active {
  color: var(--c-accent);
  font-weight: 500;
  background: rgba(108, 99, 255, 0.15);
}

.sidebar-link--default {
  color: var(--c-text-secondary);
}

.sidebar-link--default:hover {
  color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}

/* Inline mode */
.inline-nav {
  position: sticky;
  top: 6rem;
}

.inline-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--c-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
}

.inline-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding-left: 0.75rem;
  border-left: 2px solid var(--c-border);
}

.inline-link {
  padding: 0.375rem 0.75rem;
  border-radius: 0 0.25rem 0.25rem 0;
  font-size: 0.875rem;
  transition: color 0.15s ease;
  margin-left: -2px;
  border-left: 2px solid transparent;
  text-decoration: none;
}

.inline-link--active {
  color: var(--c-accent);
  font-weight: 500;
  border-left-color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}

.inline-link--default {
  color: var(--c-text-secondary);
}

.inline-link--default:hover {
  color: var(--c-accent);
}
</style>
