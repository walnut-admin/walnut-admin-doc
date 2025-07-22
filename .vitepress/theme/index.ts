import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import BaseLink from '../components/BaseLink.vue'
import FrontLink from '../components/FrontLink.vue'
import PageTitle from '../components/PageTitle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('WPageTitle', PageTitle)
    app.component('WFrontLink', FrontLink)
    app.component('WBaseLink', BaseLink)
  },
} satisfies Theme
