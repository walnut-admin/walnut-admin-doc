import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,

  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  },
} as Theme
