import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import FrontLink from '../components/FrontLink.vue'
import PageTitle from '../components/PageTitle.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // register your custom global components
    app.component('WPageTitle', PageTitle)
    app.component('WFrontLink', FrontLink)
  },
} satisfies Theme
