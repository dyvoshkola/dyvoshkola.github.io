import type { Theme } from 'vitepress'
import {
  Comments,
  NewsArchiveLinks,
  NewsList,
  NewsMeta,
  NewsMetaAuthors,
  NewsMetaPublishedAt,
  NewsMetaStatuses,
  theme as DyvoTheme
} from '@yuriyapostol/dyvo-vitepress'
import { defineComponent, h } from 'vue'

const ThemeLayout = defineComponent({
  name: 'DyvoshkolaThemeLayout',
  setup(_, { slots }) {
    return () =>
      h(DyvoTheme.Layout!, null, {
        ...slots,
        'doc-after': () => [slots['doc-after']?.(), h(Comments)]
      })
  }
})

const theme: Theme = {
  extends: DyvoTheme,
  enhanceApp({ app }) {
    DyvoTheme.enhanceApp?.({ app })
    app.component('NewsArchiveLinks', NewsArchiveLinks)
    app.component('NewsList', NewsList)
    app.component('NewsMeta', NewsMeta)
    app.component('NewsMetaAuthors', NewsMetaAuthors)
    app.component('NewsMetaPublishedAt', NewsMetaPublishedAt)
    app.component('NewsMetaStatuses', NewsMetaStatuses)
  },
  Layout: ThemeLayout
}

export default theme
