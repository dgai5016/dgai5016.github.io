<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, shallowRef, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Footer from './components/Footer.vue'
import PostMeta from './components/PostMeta.vue'
import TableOfContents from './components/TableOfContents.vue'

const { frontmatter } = useData()
const isPost = computed(() => frontmatter.value?.layout === 'post')

const CommentGiscus = shallowRef<any>(null)
onMounted(async () => {
  const mod = await import('./components/CommentGiscus.vue')
  CommentGiscus.value = mod.default
})
</script>

<template>
  <div class="min-h-screen bg-bg-dark text-text-dark dark flex">
    <!-- Left Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div class="flex-1 min-w-0">
      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <!-- Post detail page -->
        <article v-if="isPost" class="max-w-3xl mx-auto">
          <header class="mb-10">
            <h1 class="text-3xl sm:text-4xl font-bold mb-4">{{ frontmatter.title }}</h1>
            <PostMeta
              :date="frontmatter.date"
              :tags="frontmatter.tags"
              :category="frontmatter.category"
            />
          </header>

          <div class="flex gap-8">
            <div class="flex-1 min-w-0">
              <Content />
              <component :is="CommentGiscus" v-if="CommentGiscus" class="mt-12" />
            </div>
            <aside class="hidden lg:block w-56 shrink-0">
              <TableOfContents />
            </aside>
          </div>
        </article>

        <!-- Regular page -->
        <Content v-else />
      </main>
      <Footer />
    </div>
  </div>
</template>
