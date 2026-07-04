import { useData } from 'vitepress'
import { computed } from 'vue'
import { normalizeSiteLocale } from '../../shared/i18n'

const GISCUS_LANGUAGE_BY_LOCALE: Record<string, string> = {
  'pt-BR': 'pt-BR',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW'
}

export type CommentsThemeConfig = {
  giscusLang?: string
}

function deriveGiscusLang(locale: string) {
  const normalized = normalizeSiteLocale(locale)

  if (GISCUS_LANGUAGE_BY_LOCALE[normalized]) {
    return GISCUS_LANGUAGE_BY_LOCALE[normalized]
  }

  const [language] = normalized.split('-')

  return language?.toLowerCase() || 'en'
}

export function useCommentsConfig() {
  const { site, theme } = useData<CommentsThemeConfig>()

  return computed(() => {
    const locale = normalizeSiteLocale(site.value.lang)

    return {
      giscusLang: theme.value.giscusLang?.trim() || deriveGiscusLang(locale)
    }
  })
}
