<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
})

const baseUrl = 'https://github.com/walnut-admin/walnut-admin-client/blob/main'
const fullUrl = `${baseUrl}${props.path}`
</script>

<template>
  <a :href="fullUrl" target="_blank" rel="noopener">
    <slot />
  </a>
</template>
