import type { Theme } from 'vitepress'
import { useData } from 'vitepress'
import { createMermaidRenderer } from 'vitepress-mermaid-renderer'
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'
import DefaultTheme from 'vitepress/theme'
import { h, nextTick, watch } from 'vue'
import BaseLink from '../components/BaseLink.vue'
import FrontLink from '../components/FrontLink.vue'
import PageTitle from '../components/PageTitle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // tabs plugin
    enhanceAppWithTabs(app)
    // register your custom global components
    app.component('WPageTitle', PageTitle)
    app.component('WFrontLink', FrontLink)
    app.component('WBaseLink', BaseLink)
  },
  Layout: () => {
    const { isDark } = useData()

    const initMermaid = () => {
      createMermaidRenderer({
        theme: isDark.value ? 'dark' : 'forest',
      })
    }

    // initial mermaid setup
    nextTick(() => initMermaid())

    // on theme change, re-render mermaid charts
    watch(
      () => isDark.value,
      () => {
        initMermaid()
      },
    )

    return h(DefaultTheme.Layout)
  },
} satisfies Theme
