<script setup lang="ts">
import { useData } from 'vitepress'
import { useRoute } from 'vitepress'
import { ref, inject, type Ref } from 'vue'

const { theme } = useData()
const route = useRoute()
const nav = theme.value.nav || []
const mobileOpen = ref(false)
const sourcePage = inject<Ref<string>>('sourcePage', ref('/'))

function isActive(link) {
  const path = route.path
  if (path.startsWith('/posts/')) {
    if (path.startsWith('/posts/tutorial/')) return link === '/pages/tutorials'
    if (sourcePage.value === '/pages/archives') return link === '/pages/archives'
    return link === '/'
  }
  return path === link
}
</script>

<template>
  <!-- Mobile toggle -->
  <button
    @click="mobileOpen = !mobileOpen"
    class="mobile-toggle glass"
    aria-label="Menu"
  >
    <svg class="toggle-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>

  <!-- Overlay -->
  <div
    v-if="mobileOpen"
    @click="mobileOpen = false"
    class="overlay"
  />

  <!-- Sidebar (desktop) -->
  <div class="desktop-sidebar-wrapper">
    <aside class="glass-sidebar desktop-sidebar">
      <!-- Profile -->
      <div class="profile-section">
        <div class="profile-row">
          <div class="avatar">
            d
          </div>
          <div>
            <h1 class="blog-title">dg's Blog</h1>
          </div>
        </div>
        <p class="profile-desc">探索 AI 与编程的世界</p>
      </div>

      <!-- Navigation -->
      <nav class="nav-section">
        <p class="section-label">导航</p>
        <ul class="nav-list">
          <li v-for="item in nav" :key="item.link">
            <a
              :href="item.link"
              :class="[
                'nav-link',
                isActive(item.link) ? 'nav-link--active' : 'nav-link--default'
              ]"
            >
              <span v-if="item.text === '首页'">
                <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
              </span>
              <span v-else-if="item.text === '教程'">
                <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              </span>
              <span v-else-if="item.text === '归档'">
                <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <span v-else>
                <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </span>
              {{ item.text }}
            </a>
          </li>
        </ul>
      </nav>

      <!-- Social links -->
      <div class="social-section">
        <p class="section-label">社交</p>
        <a
          href="https://github.com/dgai5016"
          target="_blank"
          class="social-link"
        >
          <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          GitHub
        </a>
      </div>
    </aside>
  </div>

  <!-- Mobile sidebar -->
  <aside
    :class="[
      'mobile-sidebar',
      'glass-sidebar',
      mobileOpen ? 'mobile-sidebar--open' : 'mobile-sidebar--closed'
    ]"
  >
    <!-- Profile -->
    <div class="profile-section">
      <div class="profile-row">
        <div class="avatar">
          d
        </div>
        <div>
          <h1 class="blog-title">dg's Blog</h1>
        </div>
      </div>
      <p class="profile-desc">探索 AI 与编程的世界</p>
    </div>

    <!-- Navigation -->
    <nav class="nav-section">
      <p class="section-label">导航</p>
      <ul class="nav-list">
        <li v-for="item in nav" :key="item.link">
          <a
            :href="item.link"
            :class="[
              'nav-link',
              isActive(item.link) ? 'nav-link--active' : 'nav-link--default'
            ]"
            @click="mobileOpen = false"
          >
            <span v-if="item.text === '首页'">
              <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
            </span>
            <span v-else-if="item.text === '教程'">
              <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </span>
            <span v-else-if="item.text === '标签'">
              <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
            </span>
            <span v-else-if="item.text === '归档'">
              <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </span>
            <span v-else>
              <svg class="nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </span>
            {{ item.text }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Social links -->
    <div class="mobile-social-section">
      <p class="section-label">社交</p>
      <a
        href="https://github.com/dgai5016"
        target="_blank"
        class="social-link"
      >
        <svg class="nav-icon" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        GitHub
      </a>
    </div>
  </aside>
</template>

<style scoped>
/* Mobile toggle button */
.mobile-toggle {
  display: block;
  position: fixed;
  top: 1rem;
  left: 1rem;
  z-index: 50;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  color: var(--c-text-secondary);
}

@media (min-width: 1024px) {
  .mobile-toggle {
    display: none;
  }
}

.toggle-icon {
  width: 1.25rem;
  height: 1.25rem;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 30;
}

@media (min-width: 1024px) {
  .overlay {
    display: none;
  }
}

/* Desktop sidebar */
.desktop-sidebar-wrapper {
  display: none;
  width: 16rem;
  flex-shrink: 0;
  padding-left: 1rem;
}

@media (min-width: 1024px) {
  .desktop-sidebar-wrapper {
    display: block;
  }
}

.desktop-sidebar {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  width: 14rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.048);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  max-height: calc(100vh - 2rem);
}

/* Profile section */
.profile-section {
  padding: 1.5rem;
  border-bottom: 1px solid var(--c-border);
}

.profile-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: var(--c-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.125rem;
}

.blog-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--c-accent);
  margin: 0;
}

.profile-desc {
  font-size: 0.75rem;
  color: var(--c-text-muted);
  margin: 0;
}

/* Nav section */
.nav-section {
  padding: 1rem;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-muted);
  letter-spacing: 0.05em;
  margin: 0 0 0.75rem 0;
}

.nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  transition: color 0.15s ease, background-color 0.15s ease;
  text-decoration: none;
}

.nav-link--active {
  color: var(--c-accent);
  font-weight: 500;
  background: rgba(108, 99, 255, 0.05);
}

.nav-link--default {
  color: var(--c-text-secondary);
}

.nav-link--default:hover {
  color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}

.nav-icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

/* Social section (desktop) */
.social-section {
  padding: 1rem;
  border-top: 1px solid var(--c-border);
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--c-text-secondary);
  text-decoration: none;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.social-link:hover {
  color: var(--c-accent);
  background: rgba(108, 99, 255, 0.05);
}

/* Mobile sidebar */
.mobile-sidebar {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  height: 100vh;
  height: 100dvh;
  width: 16rem;
  border-right: 1px solid var(--c-border);
  flex-direction: column;
  overflow-y: auto;
  transition: transform 0.2s ease;
}

@media (max-width: 1023px) {
  .mobile-sidebar {
    display: flex;
  }
}

.mobile-sidebar--open {
  transform: translateX(0);
}

.mobile-sidebar--closed {
  transform: translateX(-100%);
}

/* Mobile social section */
.mobile-social-section {
  margin-top: auto;
  padding: 1rem;
  border-top: 1px solid var(--c-border);
}
</style>
