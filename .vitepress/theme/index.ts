import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Comments from '../features/comments/Comments.vue'
import NewsArchiveLinks from '../features/news/NewsArchiveLinks.vue'
import NewsPublicationInfo from '../features/news/NewsPublicationInfo.vue'
import Layout from './components/Layout.vue'
import NewsList from '../features/news/NewsList.vue'
import { defineComponent, h } from 'vue'
import './custom.css'

const ThemeLayout = defineComponent({
  name: 'DyvoshkolaThemeLayout',
  setup(_, { slots }) {
    return () =>
      h(Layout, null, {
        ...slots,
        'doc-after': () => [slots['doc-after']?.(), h(Comments)]
      })
  }
})

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('NewsArchiveLinks', NewsArchiveLinks)
    app.component('NewsList', NewsList)
    app.component('NewsPublicationInfo', NewsPublicationInfo)
  },
  Layout: ThemeLayout
}

export default theme
