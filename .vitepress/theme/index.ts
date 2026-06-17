import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import { h } from 'vue'
import Comments from './components/Comments.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Comments', Comments)
  },
  Layout: () => {
    return DefaultTheme.Layout
      ? h(DefaultTheme.Layout, null, {
          'doc-after': () => h(Comments)
        })
      : null
  }
}

export default theme
