import { defineConfig } from 'vitepress'

import { localeConfig } from './locale'
import { themeConfig } from './themeConfig'
import { viteConfig } from './viteConfig'

export default defineConfig({
  base: '/',
  lang: 'zh-CN',
  srcDir: 'src',
  appearance: true,
  lastUpdated: true,
  ignoreDeadLinks: false,
  cleanUrls: true,

  locales: localeConfig,
  themeConfig,
  vite: viteConfig,
})
