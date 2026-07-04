import type { DefaultTheme } from 'vitepress'
import type { CommentsThemeConfig } from '../features/comments/config'
import type { NewsThemeConfig } from '../features/news/config'

export type AppSidebarItem = Omit<DefaultTheme.SidebarItem, 'items'> & {
  activeMatch?: string
  items?: AppSidebarItem[]
}

export type AppSidebar =
  | AppSidebarItem[]
  | Record<string, AppSidebarItem[] | { items: AppSidebarItem[]; base: string }>

export type AppThemeConfig =
  Omit<DefaultTheme.Config, 'sidebar'> & {
    sidebar?: AppSidebar
  } & CommentsThemeConfig & NewsThemeConfig
