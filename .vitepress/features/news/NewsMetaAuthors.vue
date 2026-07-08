<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

type NewsAuthor = {
  name: string
  github?: string
}

const props = defineProps<{
  authors?: Array<string | { name?: string; github?: string }> | string
}>()

const { frontmatter } = useData()

function normalizeAuthors(
  value: Array<string | { name?: string; github?: string }> | string | undefined
) {
  if (Array.isArray(value)) {
    return value
      .map((author): NewsAuthor | null => {
        if (typeof author === 'string') {
          const name = author.trim()

          return name ? { name } : null
        }

        if (!author || typeof author !== 'object') {
          return null
        }

        const name = typeof author.name === 'string' ? author.name.trim() : ''
        const github = typeof author.github === 'string' ? author.github.trim() : ''

        if (!name) {
          return null
        }

        return github ? { name, github } : { name }
      })
      .filter((author): author is NewsAuthor => author !== null)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((author) => author.trim())
      .filter(Boolean)
      .map((name) => ({ name }))
  }

  return []
}

const resolvedAuthors = computed(() => {
  if (props.authors !== undefined) {
    return normalizeAuthors(props.authors)
  }

  return normalizeAuthors(frontmatter.value.authors)
})

const authorLabel = computed(() => (resolvedAuthors.value.length > 1 ? 'Автори:' : 'Автор:'))

function authorUrl(author: NewsAuthor) {
  return author.github ? `https://github.com/${author.github}` : null
}
</script>

<template>
  <p v-if="resolvedAuthors.length" class="news-meta-authors">
    <span class="news-meta-authors-label">{{ authorLabel }}</span>
    <template v-for="(author, index) in resolvedAuthors" :key="`${author.name}-${author.github ?? index}`">
      <span v-if="index > 0" class="news-meta-authors-separator">, </span>
      <a
        v-if="authorUrl(author)"
        class="news-meta-authors-link"
        :href="authorUrl(author) ?? undefined"
      >
        {{ author.name }}
      </a>
      <span v-else>{{ author.name }}</span>
    </template>
  </p>
</template>

<style scoped>
.news-meta-authors {
  margin: 1.5rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.news-meta-authors-label {
  margin-right: 0.35rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.news-meta-authors-link {
  color: inherit;
}
</style>
