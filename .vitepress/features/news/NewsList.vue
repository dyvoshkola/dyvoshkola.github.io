<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useNewsConfig } from './config'

type NewsEntry = {
  title: string
  url: string
  filePath: string
  publishedAt: string
  importance: number
  tags: string[]
}

type PageDataLike = {
  title?: string
  frontmatter?: {
    title?: string
    publishedAt?: string
    importance?: number | string
    tags?: string[] | string
  }
  filePath?: string
}

const pages = import.meta.glob('../../../news/**/*.md', {
  eager: true,
  import: '__pageData'
}) as Record<string, PageDataLike>

const props = defineProps<{
  limit?: number | string
  fromDate?: string
  toDate?: string
  minImportance?: number | string
  sortBy?: string
  tags?: string[] | string
  exclude?: string[] | string
  excludeCurrent?: boolean | string
}>()

const newsConfig = useNewsConfig()
const { page } = useData()

function normalizeImportance(value: number | string | undefined) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value.trim())) {
    return Number(value.trim())
  }

  return 0
}

function normalizeTags(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((tag): tag is string => typeof tag === 'string')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((tag) => tag.trim().toLowerCase())
      .filter(Boolean)
  }

  return []
}

function normalizeStringList(value: string[] | string | undefined) {
  if (Array.isArray(value)) {
    return value
      .filter((item): item is string => typeof item === 'string')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }

  return []
}

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

function compareValues(a: number | string, b: number | string, locale: string) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a - b
  }

  return String(a).localeCompare(String(b), locale)
}

function sortItems(items: NewsEntry[], sortBy: string, locale: string) {
  const clauses = sortBy
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)

  if (!clauses.length) {
    return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
  }

  return [...items].sort((a, b) => {
    for (const clause of clauses) {
      const direction = clause.startsWith('-') ? -1 : 1
      const field = clause.replace(/^[-+]/, '')

      if (field !== 'publishedAt' && field !== 'importance' && field !== 'title') {
        continue
      }

      const result = compareValues(a[field], b[field], locale)

      if (result !== 0) {
        return result * direction
      }
    }

    return 0
  })
}

const allItems = computed(() => {
  return Object.values(pages)
    .map((page): NewsEntry | null => {
      const publishedAt = page.frontmatter?.publishedAt
      const filePath = page.filePath

      if (
        typeof publishedAt !== 'string' ||
        !publishedAt.trim() ||
        typeof filePath !== 'string' ||
        !filePath.trim()
      ) {
        return null
      }

      const title =
        typeof page.frontmatter?.title === 'string' && page.frontmatter.title.trim()
          ? page.frontmatter.title.trim()
          : typeof page.title === 'string' && page.title.trim()
            ? page.title.trim()
            : filePath

      return {
        title,
        url: `/${filePath
          .replace(/(^|\/)index\.md$/i, '$1')
          .replace(/\.md$/i, '.html')}`,
        filePath,
        publishedAt: publishedAt.trim(),
        importance: normalizeImportance(page.frontmatter?.importance),
        tags: normalizeTags(page.frontmatter?.tags)
      }
    })
    .filter((item): item is NewsEntry => item !== null)
})

function normalizeLimit(value: number | string | undefined) {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) {
    return value
  }

  if (typeof value === 'string' && /^\d+$/.test(value.trim())) {
    const parsed = Number(value.trim())

    if (parsed > 0) {
      return parsed
    }
  }

  return null
}

function isDateOnly(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value)
}

function matchesFromDate(item: NewsEntry, fromDate: string) {
  if (isDateOnly(fromDate)) {
    return item.publishedAt.slice(0, 10) >= fromDate
  }

  const fromTime = Date.parse(fromDate)
  const itemTime = Date.parse(item.publishedAt)

  return Number.isNaN(fromTime) || Number.isNaN(itemTime) || itemTime >= fromTime
}

function matchesToDate(item: NewsEntry, toDate: string) {
  if (isDateOnly(toDate)) {
    return item.publishedAt.slice(0, 10) <= toDate
  }

  const toTime = Date.parse(toDate)
  const itemTime = Date.parse(item.publishedAt)

  return Number.isNaN(toTime) || Number.isNaN(itemTime) || itemTime <= toTime
}

const items = computed(() => {
  const limit = normalizeLimit(props.limit)
  const minImportance = normalizeImportance(props.minImportance)
  const sortBy = props.sortBy ?? '-publishedAt'
  const locale = newsConfig.value.locale
  const requestedTags = normalizeTags(props.tags)
  const excludeCurrent = normalizeBoolean(props.excludeCurrent, true)
  const excludedItems = new Set(normalizeStringList(props.exclude))
  const currentFilePath = page.value.relativePath

  let filtered = allItems.value.filter((item) => {
    if (excludeCurrent && currentFilePath && item.filePath === currentFilePath) {
      return false
    }

    if (excludedItems.has(item.filePath) || excludedItems.has(item.url)) {
      return false
    }

    if (props.fromDate && !matchesFromDate(item, props.fromDate)) {
      return false
    }

    if (props.toDate && !matchesToDate(item, props.toDate)) {
      return false
    }

    if (item.importance < minImportance) {
      return false
    }

    if (requestedTags.length && !requestedTags.some((tag) => item.tags.includes(tag))) {
      return false
    }

    return true
  })

  filtered = sortItems(filtered, sortBy, locale)

  if (limit !== null) {
    filtered = filtered.slice(0, limit)
  }

  return filtered
})

const latestYear = computed(() => {
  const years = items.value
    .map((item) => Number(item.publishedAt.slice(0, 4)))
    .filter((year) => Number.isFinite(year))

  return years.length ? Math.max(...years) : null
})

function formatPublishedDate(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/)

  if (!match) {
    return value
  }

  const [, year, month, day] = match
  const date = new Date(value)
  const hasValidDate = !Number.isNaN(date.getTime())
  const fallbackDate = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)))
  const formatterDate = hasValidDate ? date : fallbackDate
  const datePart = new Intl.DateTimeFormat(newsConfig.value.locale, {
    day: 'numeric',
    month: 'long',
    ...(Number(year) === latestYear.value ? {} : { year: 'numeric' as const }),
    timeZone: newsConfig.value.contentTimeZone
  }).format(formatterDate)
  const timeParts = new Intl.DateTimeFormat(newsConfig.value.locale, {
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
    timeZone: newsConfig.value.contentTimeZone
  }).formatToParts(formatterDate)
  const hour = timeParts.find((part) => part.type === 'hour')?.value ?? '00'
  const minute = timeParts.find((part) => part.type === 'minute')?.value ?? '00'

  return `${datePart}, ${hour}:${minute}`
}
</script>

<template>
  <ul v-if="items.length" class="news-list">
    <li v-for="item in items" :key="item.url" class="news-list-item">
      <time class="news-date" :datetime="item.publishedAt">
        {{ formatPublishedDate(item.publishedAt) }}
      </time>
      <a :href="item.url" class="news-link">{{ item.title }}</a>
    </li>
  </ul>
  <p v-else>{{ newsConfig.labels.emptyState }}</p>
</template>

<style scoped>
.news-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.news-list-item {
  display: grid;
  grid-template-columns: max-content minmax(0, 1fr);
  column-gap: 0.75rem;
  align-items: baseline;
  padding: 0.4rem 0;
}

.news-link {
  min-width: 0;
  font-weight: 500;
}

.news-date {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  line-height: 1.5;
  white-space: nowrap;
}

@media (max-width: 640px) {
  .news-list-item {
    grid-template-columns: 1fr;
    row-gap: 0.15rem;
  }

  .news-link {
    grid-row: 2;
  }
}
</style>
