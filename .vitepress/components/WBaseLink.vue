<script lang="ts" setup>
const props = defineProps<{ preset:
  'author'
  | 'antfu' | 'vue' | 'i18n'
  | 'vite' | 'naive-ui' | 'unocss' | 'ts' | 'pinia' | 'vue-router' | 'vueuse' | 'axios' | 'iconify'
  | 'lodash-es' | 'nanoid' | 'lru-cache' | 'ua-parse-js' }>()

const urlMap: Record<string, string> = {
  'author': 'https://github.com/Zhaocl1997',
  'antfu': 'https://github.com/antfu',
  'vue': 'https://vuejs.org/',
  'i18n': 'https://vue-i18n.intlify.dev/',
  'vite': 'https://vitejs.dev/',
  'naive-ui': 'https://www.naiveui.com/',
  'unocss': 'https://unocss.dev/',
  'ts': 'https://www.typescriptlang.org/',
  'pinia': 'https://pinia.vuejs.org/',
  'vue-router': 'https://router.vuejs.org/',
  'vueuse': 'https://vueuse.org/',
  'axios': 'https://axios-http.com/',
  'iconify': 'https://iconify.design/',
  'lodash-es': 'https://lodash.com/',
  'nanoid': 'https://zelark.github.io/nano-id-cc/',
  'lru-cache': 'https://isaacs.github.io/node-lru-cache/',
  'ua-parser-js': 'https://uaparser.dev/',
}

const url = urlMap[props.preset]
</script>

<template>
  <a :href="url" target="_blank" rel="noopener">
    <slot />
  </a>
</template>
