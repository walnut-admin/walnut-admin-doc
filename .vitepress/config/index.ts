import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

import { en, search as enSearch } from './en'
import { shared } from './shared'
import { zh, search as zhSearch } from './zh'

export default defineConfig({
  ...shared,
  locales: {
    'root': { label: '简体中文', ...zh },
    'en-US': { label: 'English', ...en },
  },
  vite: {
    server: {
      port: 8886,
    },

    plugins: [pagefindPlugin({
      locales: {
        ...zhSearch,
        ...enSearch,
      },
    })],
  },
})
