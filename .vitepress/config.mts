import { defineConfig } from 'vitepress'
import type { HeadConfig } from 'vitepress'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { toOpenGraphLocale } from './shared/i18n'
import type { AppThemeConfig } from './theme/config'

const siteUrl = 'https://dyvoshkola.github.io'
const defaultOgImage = `${siteUrl}/logo-light.svg`
const siteLocale = 'uk-UA'
const contentTimeZone = 'Europe/Kyiv'

function stripFrontmatter(source: string) {
  return source.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
}

function cleanupText(source: string) {
  return source
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<\/?[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFirstHeading(source: string) {
  const content = stripFrontmatter(source)
  const match = content.match(/^#\s+(.+)$/m)
  return match ? cleanupText(match[1]) : ''
}

function extractFirstParagraph(source: string) {
  const content = stripFrontmatter(source)
  const lines = content.split(/\r?\n/)
  const paragraph: string[] = []
  let inFence = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith('```')) {
      inFence = !inFence
      continue
    }

    if (inFence) {
      continue
    }

    if (!trimmed) {
      if (paragraph.length) {
        const text = cleanupText(paragraph.join(' '))
        if (text) {
          return text
        }
        paragraph.length = 0
      }
      continue
    }

    if (
      trimmed.startsWith('#') ||
      trimmed.startsWith(':::') ||
      trimmed.startsWith('>') ||
      trimmed.startsWith('- ') ||
      trimmed.startsWith('* ') ||
      trimmed.startsWith('|') ||
      trimmed.startsWith('<')
    ) {
      if (paragraph.length) {
        const text = cleanupText(paragraph.join(' '))
        if (text) {
          return text
        }
        paragraph.length = 0
      }
      continue
    }

    if (/^\d+\.\s/.test(trimmed)) {
      if (paragraph.length) {
        const text = cleanupText(paragraph.join(' '))
        if (text) {
          return text
        }
        paragraph.length = 0
      }
      continue
    }

    paragraph.push(trimmed)
  }

  return cleanupText(paragraph.join(' '))
}

function extractFallbackMetadata(filePath: string, srcDir: string) {
  try {
    const source = readFileSync(join(srcDir, filePath), 'utf8')

    return {
      title: extractFirstHeading(source),
      description: extractFirstParagraph(source)
    }
  } catch {
    return {
      title: '',
      description: ''
    }
  }
}

const themeConfig: AppThemeConfig = {
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
  contentTimeZone,
  news: {
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
        { text: 'Про проект', link: '/index.html' },
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
          { text: 'Про проект', link: '/index.html' },
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

export default defineConfig({
  lang: siteLocale,
  title: 'Дивошкола',
  description: 'Дивошкола — відкритий до експериментів освітній проект про корисні знання і навички. Ми прагнемо щодня дивувати й допомагати творити дива через навчання та практику.',
  transformPageData(pageData, ctx) {
    const frontmatter = pageData.frontmatter ?? {}
    const fallback = extractFallbackMetadata(pageData.filePath, ctx.siteConfig.srcDir)
    const title = typeof frontmatter.title === 'string' && frontmatter.title.trim()
      ? frontmatter.title.trim()
      : pageData.title || fallback.title
    const description = typeof frontmatter.description === 'string' && frontmatter.description.trim()
      ? frontmatter.description.trim()
      : fallback.description

    return {
      ...(title ? { title } : {}),
      ...(description ? { description } : {})
    }
  },
  transformHead({ pageData }) {
    const frontmatter = pageData.frontmatter ?? {}
    const head: HeadConfig[] = []
    const title = pageData.title
    const description = pageData.description
    const keywords = Array.isArray(frontmatter.keywords)
      ? frontmatter.keywords.join(', ')
      : typeof frontmatter.keywords === 'string'
        ? frontmatter.keywords.trim()
        : ''
    const robots = typeof frontmatter.robots === 'string' && frontmatter.robots.trim()
      ? frontmatter.robots.trim()
      : 'index,follow'
    const ogType = typeof frontmatter.ogType === 'string' && frontmatter.ogType.trim()
      ? frontmatter.ogType.trim()
      : 'website'
    const canonicalPath = typeof frontmatter.canonical === 'string' && frontmatter.canonical.trim()
      ? frontmatter.canonical.trim()
      : `/${pageData.filePath.replace(/(^|\/)index\.md$/i, '$1').replace(/\.md$/i, '.html')}`
    const canonicalUrl = new URL(canonicalPath, siteUrl).toString()
    const imagePath = typeof frontmatter.image === 'string' && frontmatter.image.trim()
      ? frontmatter.image.trim()
      : defaultOgImage
    const imageUrl = new URL(imagePath, siteUrl).toString()

    head.push(['link', { rel: 'canonical', href: canonicalUrl }])
    head.push(['meta', { name: 'robots', content: robots }])
    head.push(['meta', { property: 'og:site_name', content: 'Дивошкола' }])
    head.push(['meta', { property: 'og:locale', content: toOpenGraphLocale(siteLocale) }])
    head.push(['meta', { property: 'og:type', content: ogType }])
    head.push(['meta', { property: 'og:url', content: canonicalUrl }])
    head.push(['meta', { property: 'og:image', content: imageUrl }])
    head.push(['meta', { name: 'twitter:card', content: 'summary_large_image' }])
    head.push(['meta', { name: 'twitter:url', content: canonicalUrl }])
    head.push(['meta', { name: 'twitter:image', content: imageUrl }])

    if (title) {
      head.push(['meta', { property: 'og:title', content: title }])
      head.push(['meta', { name: 'twitter:title', content: title }])
    }

    if (description) {
      head.push([
        'meta',
        { property: 'og:description', content: description }
      ])
      head.push(['meta', { name: 'twitter:description', content: description }])
    }

    if (keywords) {
      head.push(['meta', { name: 'keywords', content: keywords }])
    }

    return head
  },

  base: '/',

  themeConfig
})
