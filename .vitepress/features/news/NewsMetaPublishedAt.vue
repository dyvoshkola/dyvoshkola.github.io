<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useNewsConfig } from './config'
import { formatNewsPublishedDate } from './utils'

const props = defineProps<{
  publishedAt?: string
  showYear?: boolean | string
}>()

const { frontmatter } = useData()
const newsConfig = useNewsConfig()

function normalizeBoolean(value: boolean | string | undefined, fallback: boolean) {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase()

    if (normalized === 'true') {
      return true
    }

    if (normalized === 'false') {
      return false
    }
  }

  return fallback
}

const resolvedPublishedAt = computed(() => {
  if (typeof props.publishedAt === 'string' && props.publishedAt.trim()) {
    return props.publishedAt.trim()
  }

  if (typeof frontmatter.value.publishedAt === 'string' && frontmatter.value.publishedAt.trim()) {
    return frontmatter.value.publishedAt.trim()
  }

  return ''
})

const showYear = computed(() => normalizeBoolean(props.showYear, false))

const formattedPublishedAt = computed(() => {
  if (!resolvedPublishedAt.value) {
    return ''
  }

  return formatNewsPublishedDate(
    resolvedPublishedAt.value,
    newsConfig.value.locale,
    newsConfig.value.contentTimeZone,
    showYear.value
  )
})
</script>

<template>
  <time v-if="resolvedPublishedAt" class="news-meta-date" :datetime="resolvedPublishedAt">
    {{ formattedPublishedAt }}
  </time>
</template>

<style scoped>
.news-meta-date {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}
</style>
