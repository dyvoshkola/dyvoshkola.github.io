import { createConfig } from '@yuriyapostol/dyvo-vitepress/config'
import type { ThemeConfig } from '@yuriyapostol/dyvo-vitepress/theme/config'

const siteUrl = 'https://dyvoshkola.github.io'
const siteLocale = 'uk-UA'

const themeConfig: ThemeConfig = {
  logo: {
    light: '/logo-light.svg',
    dark: '/logo-dark.svg',
    alt: 'Дивошкола'
  },
  siteTitle: false,
  outline: {
    level: [1, 4],
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
  comments: {
    enabled: true,
    repo: 'dyvoshkola/dyvoshkola-comments',
    repoId: 'R_kgDOS74Suw',
    category: 'Comments',
    categoryId: 'DIC_kwDOS74Su84C_PHE',
    mapping: 'specific',
    strict: '1',
    reactionsEnabled: '1',
    emitMetadata: '0',
    inputPosition: 'bottom'
  },
  contentTimeZone: 'Europe/Kyiv',
  news: {
    enabled: true,
    basePath: '/news/',
    labels: {
      emptyState: 'Поки що новин немає.',
      referenceDayLink: 'Всі новини за {label}',
      currentDayLink: 'Новини за {label}',
      nextDayLink: 'Новини за {label}',
      previousDayLink: 'Новини за {label}',
      referenceMonthLink: 'Всі новини {label}',
      currentMonthLink: 'Новини {label}',
      nextMonthLink: 'Новини {label}',
      previousMonthLink: 'Новини {label}',
      referenceYearLink: 'Всі новини {label} року',
      currentYearLink: 'Новини {label} року',
      nextYearLink: 'Новини {label} року',
      previousYearLink: 'Новини {label} року'
    }
  },
  nav: [
    {
      text: 'Дивошкола',
      activeMatch: '^/(|(index|team)(|\\.md|\\.html)|news(\\/.*)?)$',
      items: [
        { text: 'Стартова сторінка', link: '/index.html' },
        { text: 'Команда', link: '/team.html' },
        { text: 'Новини', link: '/news/', activeMatch: '^/news/' }
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
      {
        text: 'Дивошкола',
        items: [
          { text: 'Стартова сторінка', link: '/index.html' },
          { text: 'Команда', link: '/team.html' },
          { text: 'Новини', link: '/news/', activeMatch: '^/news(/.*)?$' }
        ]
      }
    ],
    '/knots/': [
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
}

export default createConfig({
  lang: siteLocale,
  title: 'Дивошкола',
  description: 'Дивошкола — відкритий до експериментів освітній проект про корисні знання і навички. Ми прагнемо щодня дивувати й допомагати творити дива через навчання та практику.',
  seo: {
    siteUrl,
    defaultOgImage: `${siteUrl}/logo-light.svg`,
    siteLocale,
    siteName: 'Дивошкола'
  },
  base: '/',
  themeConfig
})
