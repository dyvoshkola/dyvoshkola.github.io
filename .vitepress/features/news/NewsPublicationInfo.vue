<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useNewsConfig } from './config'
import { formatNewsPublishedDate, normalizeNewsStatuses } from './utils'

const props = defineProps<{
  publishedAt?: string
  status?: string
  statuses?: string[] | string
  showYear?: boolean | string
  inline?: boolean | string
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

const resolvedStatuses = computed(() => {
  const hasExplicitStatuses = props.statuses !== undefined || props.status !== undefined
  const explicitStatuses = [
    ...normalizeNewsStatuses(props.statuses),
    ...normalizeNewsStatuses(props.status)
  ]

  if (hasExplicitStatuses) {
    return explicitStatuses
  }

  return [
    ...normalizeNewsStatuses(frontmatter.value.statuses),
    ...normalizeNewsStatuses(frontmatter.value.status)
  ]
})

const showYear = computed(() => normalizeBoolean(props.showYear, false))
const inline = computed(() => normalizeBoolean(props.inline, false))

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

function statusClass(status: string) {
  return status.trim().toLowerCase() === 'оновлюється' ? 'news-meta-badge-updating' : ''
}
</script>

<template>
  <component
    :is="inline ? 'span' : 'div'"
    v-if="resolvedPublishedAt || resolvedStatuses.length"
    :class="['news-meta', { 'news-meta-inline': inline }]"
  >
    <time v-if="resolvedPublishedAt" class="news-meta-date" :datetime="resolvedPublishedAt">
      {{ formattedPublishedAt }}
    </time>
    <span
      v-for="status in resolvedStatuses"
      :key="status"
      class="news-meta-badge"
      :class="statusClass(status)"
    >
      {{ status }}
    </span>
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

.news-meta-date {
  color: var(--vp-c-text-2);
  white-space: nowrap;
}

.news-meta-badge {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  padding: 0.12rem 0.55rem;
  color: var(--vp-c-text-2);
  font-size: 0.8rem;
  line-height: 1.35;
}

.news-meta-badge-updating {
  border-color: color-mix(in srgb, #e0b24a 55%, var(--vp-c-divider));
  background: color-mix(in srgb, #f6d77a 22%, transparent);
  color: color-mix(in srgb, #9a6a00 78%, var(--vp-c-text-1));
}
</style>
