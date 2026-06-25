import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import Comments from './components/Comments.vue'
import Layout from './components/Layout.vue'
import './custom.css'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Comments', Comments)
  },
  Layout
}

export default theme
