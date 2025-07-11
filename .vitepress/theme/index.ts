import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import FrontLink from '../components/FrontLink.vue'
import PageTitle from '../components/PageTitle.vue'
import BaseLink from '../components/WBaseLink.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('WPageTitle', PageTitle)
    app.component('WFrontLink', FrontLink)
    app.component('WBaseLink', BaseLink)
  },
} satisfies Theme
