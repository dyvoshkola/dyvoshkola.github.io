import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'uk-UA',
  title: 'Дивошкола',
  description: 'Дивошкола — відкритий до експериментів освітній проект про корисні знання і навички. Ми прагнемо щодня дивувати й допомагати творити дива через навчання та практику.',

  base: '/',

  themeConfig: {
    nav: [
      { text: 'Головна', link: '/' },
      { text: 'Команда', link: '/team' },
      { text: 'Вузли', link: '/knots/' }
    ],
    sidebar: [
      {
        text: 'Проєкт',
        items: [
          { text: 'Команда', link: '/team' }
        ]
      },
      {
        text: 'Вузли',
        items: [
          { text: 'Вступ', link: '/knots/' },
          { text: 'Огляд категорій', link: '/knots/categories/' },
          { text: "З'єднувальні", link: '/knots/bends/' },
          { text: 'Схоплювальні', link: '/knots/hitches/' },
          { text: 'Петлі', link: '/knots/loops/' },
          { text: 'Стопорні', link: '/knots/stopper/' },
          { text: 'Рятувальні', link: '/knots/rescue/' },
          { text: 'Теорія вузлів', link: '/knots/theory/' }
        ]
      }
    ]
  }
})
