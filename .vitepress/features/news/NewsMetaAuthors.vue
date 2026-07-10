<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { normalizeBoolean, normalizeNewsAuthors, type NewsAuthor } from './utils'

const props = defineProps<{
  authors?: Array<string | { name?: string; github?: string }> | string
  showLabel?: boolean | string
}>()

const { frontmatter } = useData()

const resolvedAuthors = computed<NewsAuthor[]>(() => {
  if (props.authors !== undefined) {
    return normalizeNewsAuthors(props.authors)
  }

  return normalizeNewsAuthors(
    Array.isArray(frontmatter.value.authors) || typeof frontmatter.value.authors === 'string'
      ? frontmatter.value.authors
      : undefined
  )
})

const authorLabel = computed(() => (resolvedAuthors.value.length > 1 ? 'Автори:' : 'Автор:'))
const showLabel = computed(() => normalizeBoolean(props.showLabel, true))

function authorUrl(author: NewsAuthor) {
  return author.github ? `https://github.com/${author.github}` : null
}

function authorAvatarUrl(author: NewsAuthor) {
  return author.github ? `https://github.com/${author.github}.png?size=80` : null
}
</script>

<template>
  <div v-if="resolvedAuthors.length" class="news-meta-authors">
    <p v-if="showLabel" class="news-meta-authors-label">{{ authorLabel }}</p>
    <div class="news-meta-authors-list">
      <template v-for="(author, index) in resolvedAuthors" :key="`${author.name}-${author.github ?? index}`">
        <a
          v-if="authorUrl(author)"
          class="news-meta-author-card"
          :href="authorUrl(author) ?? undefined"
        >
          <img
            v-if="authorAvatarUrl(author)"
            class="news-meta-author-avatar"
            :src="authorAvatarUrl(author) ?? undefined"
            :alt="author.github ? `@${author.github}` : author.name"
          />
          <span class="news-meta-author-name">{{ author.name }}</span>
        </a>
        <span v-else class="news-meta-author-card news-meta-author-card-static">
          <span class="news-meta-author-name">{{ author.name }}</span>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.news-meta-authors {
  margin: 1.5rem 0 0;
}

.news-meta-authors-label {
  margin: 0 0 0.5rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.news-meta-authors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem 1rem;
}

.news-meta-author-card {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  /*color: inherit;*/
  font-size: 0.95rem;
}

.news-meta-author-card-static {
  color: var(--vp-c-text-2);
}

.news-meta-author-avatar {
  width: 30px;
  height: 30px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 50%;
  flex: 0 0 auto;
}

.news-meta-author-name {
  /*color: var(--vp-c-text-2);*/
}
</style>
