// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'node_modules',
    '.vitepress/dist',
    '.vitepress/cache',
  ],
})
