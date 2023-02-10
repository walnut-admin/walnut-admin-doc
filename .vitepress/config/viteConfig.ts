import type { UserConfig } from 'vite'
import { SearchPlugin } from 'vitepress-plugin-search'

const Segment = require('segment')
const segment = new Segment()
segment.useDefault()

export const viteConfig: UserConfig = {
  server: {
    port: 8886,
    // open: true,
  },

  // https://github.com/emersonbottero/vitepress-plugin-mermaid/issues/33#issuecomment-1410538782
  // optimizeDeps: { include: ['moment-mini', '@braintree/sanitize-url'] },

  plugins: [
    SearchPlugin({
      // https://github.com/emersonbottero/vitepress-plugin-search/issues/11#issuecomment-1328150584
      // @ts-expect-error
      encode(str) {
        return segment.doSegment(str, { simple: true })
      },
      tokenize: 'forward',
    }),
  ],
}
