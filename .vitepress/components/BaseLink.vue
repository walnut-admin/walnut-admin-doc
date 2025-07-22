<script lang="ts" setup>
const props = defineProps<{ preset:
  'author'
  | 'antfu' | 'vue' | 'i18n'
  | 'vite' | 'naive-ui' | 'unocss' | 'ts' | 'pinia' | 'vue-router' | 'vueuse' | 'axios' | 'iconify'
  | 'lodash-es' | 'nanoid' | 'lru-cache' | 'ua-parse-js'
  | 'nestjs' | 'swc' | 'nestjs-i18n' | 'nestjs-jwt' | 'mongoose' | 'passport' | 'nestjs-passport'
  | 'nestjs-config' | 'nestjs-bull' | 'nestjs-cache' | 'keyv' | 'redis' | 'nestjs-axios'
  | 'express' | 'nestjs-socket' | 'nestjs-sse' | 'nestjs-swagger' | 'nestjs-throttler' | 'class-transformer' | 'class-validator'
  | 'nestjs-task' | 'nestjs-event' }>()

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

  'nestjs': 'https://nestjs.com/',
  'swc': 'https://swc.rs/',
  'nestjs-i18n': 'https://nestjs-i18n.com/',
  'nestjs-jwt': 'https://docs.nestjs.com/security/authentication#jwt-token',
  'mongoose': 'https://mongoosejs.com/',
  'passport': 'https://www.passportjs.org/',
  'nestjs-passport': 'https://docs.nestjs.com/recipes/passport',
  'nestjs-config': 'https://docs.nestjs.com/techniques/configuration',
  'nestjs-bull': 'https://docs.nestjs.com/techniques/queues',
  'nestjs-cache': 'https://docs.nestjs.com/techniques/caching',
  'keyv': 'https://keyv.org/',
  'redis': 'https://redis.io/',
  'nestjs-axios': 'https://docs.nestjs.com/techniques/http-module',
  'express': 'https://expressjs.com/',
  'nestjs-socket': 'https://docs.nestjs.com/websockets/gateways',
  'nestjs-sse': 'https://docs.nestjs.com/techniques/server-sent-events',
  'nestjs-swagger': 'https://docs.nestjs.com/openapi/introduction',
  'nestjs-throttler': 'https://docs.nestjs.com/security/rate-limiting',
  'class-transformer': 'https://github.com/typestack/class-transformer',
  'class-validator': 'https://github.com/typestack/class-validator',
  'nestjs-task': 'https://docs.nestjs.com/techniques/task-scheduling',
  'nestjs-event': 'https://docs.nestjs.com/techniques/events',
}

const url = urlMap[props.preset]
</script>

<template>
  <a :href="url" target="_blank" rel="noopener">
    <slot />
  </a>
</template>
