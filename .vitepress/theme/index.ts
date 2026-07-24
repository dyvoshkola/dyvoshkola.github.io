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

const DyvoThemeLayout = DyvoTheme.Layout as unknown as Parameters<typeof h>[0]

const ThemeLayout = defineComponent({
  name: 'DyvoshkolaThemeLayout',
  setup(_, { slots }) {
    return () =>
      h(DyvoThemeLayout, null, {
        ...slots,
        'doc-after': () => [slots['doc-after']?.(), h(Comments)]
      })
  }
})

const theme: Theme = {
  extends: DyvoTheme,
  enhanceApp(ctx) {
    DyvoTheme.enhanceApp?.(ctx)
    const { app } = ctx
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
