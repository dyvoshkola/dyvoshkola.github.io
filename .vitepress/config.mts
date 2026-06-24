import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'uk-UA',
  title: 'Дивошкола',
  description: 'Дивошкола — відкритий до експериментів освітній проект про корисні знання і навички. Ми прагнемо щодня дивувати й допомагати творити дива через навчання та практику.',

  base: '/',

  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'Дивошкола'
    },
    siteTitle: false,
    outline: {
      level: [1, 2],
      label: 'На цій сторінці'
    },
    darkModeSwitchLabel: 'Тема',
    lightModeSwitchTitle: 'Перемкнути на світлу тему',
    darkModeSwitchTitle: 'Перемкнути на темну тему',
    sidebarMenuLabel: 'Меню розділу',
    returnToTopLabel: 'Повернутися догори',
    langMenuLabel: 'Змінити мову',
    skipToContentLabel: 'Перейти до вмісту',
    docFooter: {
      prev: false,
      next: false
    },
    notFound: {
      title: 'Сторінку не знайдено',
      quote: 'Схоже, тут немає того, що ви шукали.',
      linkLabel: 'Перейти на головну',
      linkText: 'На головну',
      code: '404'
    },

    nav: [
      {
        text: 'Дивошкола',
        activeMatch: '^/(|index(.md)?|team(.md)?)$',
        items: [
          { text: 'Про проект', link: '/index.html' },
          { text: 'Команда', link: '/team.html' }
        ]
      },
      {
        text: 'Вузли',
        activeMatch: '^/knots/', 
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
    ],
    sidebar: {
      '/': [
        { text: 'Про проект', link: '/index.html' },
        { text: 'Команда', link: '/team.html' }
      ],
      '/knots/': [
        { text: 'Вузли', link: '/knots/' },
        { text: 'Огляд категорій', link: '/knots/categories/' },
        { text: "З'єднувальні", link: '/knots/bends/'},
        { text: 'Схоплювальні', link: '/knots/hitches/' },
        { text: 'Петлі', link: '/knots/loops/' },
        { text: 'Стопорні', link: '/knots/stopper/' },
        { text: 'Рятувальні', link: '/knots/rescue/' },
        { text: 'Теорія вузлів', link: '/knots/theory/' }
      ]
    }
    /*sidebar: [
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
    ]*/
  }
})
