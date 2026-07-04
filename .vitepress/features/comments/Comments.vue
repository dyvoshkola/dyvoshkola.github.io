<script setup lang="ts">
import Giscus from '@giscus/vue'
import { computed } from 'vue'
import { useData } from 'vitepress'
import lightThemeCss from './giscus-light-theme.css?raw'
import darkThemeCss from './giscus-dark-theme.css?raw'
import { useCommentsConfig } from './config'

const { frontmatter, page, isDark } = useData()
const commentsConfig = useCommentsConfig()
const lightThemeUrl = `data:text/css;charset=utf-8,${encodeURIComponent(lightThemeCss)}`
const darkThemeUrl = `data:text/css;charset=utf-8,${encodeURIComponent(darkThemeCss)}`

const fallbackId = computed(() => {
  const relativePath = page.value?.relativePath

  if (!relativePath) {
    return ''
  }

  return relativePath
    .replace(/\.md$/i, '')
    .replace(/\/+/g, ':')
    .replace(/:+/g, ':')
    .replace(/^:|:$/g, '')
    .toLowerCase()
})

const pageId = computed(() => {
  const frontmatterId = frontmatter.value?.id

  if (typeof frontmatterId === 'string') {
    const normalized = frontmatterId.trim()
    if (normalized) {
      return normalized
    }
  }

  return fallbackId.value
})

const commentsEnabled = computed(() => frontmatter.value?.comments !== false)

const giscusTheme = computed(() => {
  if (isDark.value) {
    return darkThemeUrl
  }

  return lightThemeUrl
})
</script>

<template>
  <div v-if="commentsEnabled && pageId" class="comments">
    <ClientOnly>
      <Giscus
        :key="`${pageId}:${giscusTheme}`"
        repo="dyvoshkola/dyvoshkola-comments"
        repo-id="R_kgDOS74Suw"
        category="Comments"
        category-id="DIC_kwDOS74Su84C_PHE"
        mapping="specific"
        strict="1"
        :term="pageId"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="bottom"
        :lang="commentsConfig.giscusLang"
        loading="lazy"
        crossorigin="anonymous"
        :theme="giscusTheme"
      />
    </ClientOnly>
  </div>
</template>

<style scoped>
.comments {
  margin-top: 48px;
}
</style>
