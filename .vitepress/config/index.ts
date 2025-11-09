import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs'

import { search as enSearch } from './en'
import { shared } from './shared'
import { zh, search as zhSearch } from './zh'

export default withMermaid(defineConfig({
  ...shared,
  // TODO
  ignoreDeadLinks: true,
  locales: {
    root: { label: '简体中文', ...zh },
    // 'en-US': { label: 'English', ...en },
  },
  markdown: {
    image: {
      lazyLoading: true,
    },
    config: (md) => {
      md.use(tabsMarkdownPlugin)
    },
  },
  vite: {
    server: {
      port: 8886,
      open: true,
    },

    plugins: [
      pagefindPlugin({
        locales: {
          ...zhSearch,
          ...enSearch,
        },
      }),
    ],
  },

  mermaid: {
    // Mermaid 配置选项
    theme: 'default',
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
    },
  },
  mermaidPlugin: {
    class: 'mermaid my-class', // set additional css classes for parent container
  },
}))
