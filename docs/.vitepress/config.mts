import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'uk-UA',
  title: 'Дивошкола',
  description: 'Дивошкола — відкритий до експериментів освітній проект про корисні знання і навички. Ми прагнемо щодня дивувати й допомагати творити дива через навчання та практику.',

  base: '/',

  themeConfig: {
    nav: [
      { text: 'Головна', link: '/' },
    ],
    sidebar: [
      {
        text: 'Розділ 1',
        items: [
          { text: 'Приклад', link: '/example' },
        ]
      }
    ]
  }
})
