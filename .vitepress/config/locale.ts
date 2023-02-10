import type { DefaultTheme, LocaleConfig } from 'vitepress'

export const localeConfig: LocaleConfig<DefaultTheme.Config> = {
  'root': {
    label: '简体中文',
    lang: 'zh-CN',
    title: '核桃仁中后台模板',
    titleTemplate: '文档',
    description: '核桃仁中后台全栈模板文档，仍在编写中。。。',
  },
  'en-US': {
    label: 'English',
    lang: 'en-US',
    title: 'Walnut Admin',
    titleTemplate: 'Documentation',
    description: 'Walnut Admin Template, still WIP',
  },
}
