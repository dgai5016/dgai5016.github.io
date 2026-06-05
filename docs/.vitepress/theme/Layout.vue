<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref, onMounted, shallowRef } from 'vue'
import NavBar from './components/NavBar.vue'
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
  <div class="min-h-screen bg-bg-dark text-text-dark dark">
    <NavBar />
    <main class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <article v-if="isPost" class="max-w-4xl mx-auto">
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

      <Content v-else />
    </main>
    <Footer />
  </div>
</template>
