import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Comments from './components/Comments.vue'
import NewsArchiveLinks from './components/NewsArchiveLinks.vue'
import Layout from './components/Layout.vue'
import NewsList from './components/NewsList.vue'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Comments', Comments)
    app.component('NewsArchiveLinks', NewsArchiveLinks)
    app.component('NewsList', NewsList)
  },
  Layout
}

export default theme
