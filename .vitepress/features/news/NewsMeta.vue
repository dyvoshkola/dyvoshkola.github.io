<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useData } from 'vitepress'
import NewsMetaPublishedAt from './NewsMetaPublishedAt.vue'
import NewsMetaStatuses from './NewsMetaStatuses.vue'
import { normalizeNewsStatuses } from './utils'

const props = defineProps<{
  publishedAt?: string
  status?: string
  statuses?: string[] | string
  showYear?: boolean | string
  inline?: boolean | string
}>()

const { frontmatter } = useData()
const slots = useSlots()

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

const inline = computed(() => normalizeBoolean(props.inline, false))

const hasPublishedAt = computed(() => {
  if (typeof props.publishedAt === 'string' && props.publishedAt.trim()) {
    return true
  }

  return (
    typeof frontmatter.value.publishedAt === 'string' && Boolean(frontmatter.value.publishedAt.trim())
  )
})

const hasStatuses = computed(() => {
  const hasExplicitStatuses = props.statuses !== undefined || props.status !== undefined

  if (hasExplicitStatuses) {
    return (
      normalizeNewsStatuses(props.statuses).length > 0 || normalizeNewsStatuses(props.status).length > 0
    )
  }

  return (
    normalizeNewsStatuses(frontmatter.value.statuses).length > 0 ||
    normalizeNewsStatuses(frontmatter.value.status).length > 0
  )
})

const hasContent = computed(() => {
  if (slots.default) {
    return true
  }

  return hasPublishedAt.value || hasStatuses.value
})
</script>

<template>
  <component
    :is="inline ? 'span' : 'div'"
    v-if="hasContent"
    class="news-meta"
    :class="{ 'news-meta-inline': inline }"
  >
    <slot>
      <NewsMetaPublishedAt :published-at="publishedAt" :show-year="showYear" />
      <NewsMetaStatuses :status="status" :statuses="statuses" />
    </slot>
  </component>
</template>

<style scoped>
.news-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  align-items: center;
  margin: 0 0 0.75rem;
}

.news-meta-inline {
  margin: 0;
}
</style>
