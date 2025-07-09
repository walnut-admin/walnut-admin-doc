<script setup>
import { useData, useRoute } from 'vitepress'
import { onMounted, ref, watch } from 'vue'

const { theme, page } = useData()
const route = useRoute()
const pageTitle = ref('')

// 从导航配置中查找匹配的标题
function findTitleInNav(navItems, path) {
  for (const item of navItems) {
    if (item.link && path.startsWith(item.link)) {
      return item.text
    }
    if (item.items) {
      const nestedTitle = findTitleInNav(item.items, path)
      if (nestedTitle)
        return nestedTitle
    }
  }
  return null
}

// 从侧边栏配置中查找匹配的标题
function findTitleInSidebar(sidebarItems, path) {
  for (const item of sidebarItems) {
    if (item.link && path.startsWith(item.link)) {
      return item.text
    }
    if (item.items) {
      const nestedTitle = findTitleInSidebar(item.items, path)
      if (nestedTitle)
        return nestedTitle
    }
  }
  return null
}

// 计算当前页面的标题
function getPageTitle() {
  const path = route.path
  const navItems = theme.value.nav || []
  const sidebar = theme.value.sidebar || {}

  // 优先从导航中查找
  const navTitle = findTitleInNav(navItems, path)
  if (navTitle)
    return navTitle

  // 然后从侧边栏查找
  const sidebarGroups = Object.values(sidebar)
  for (const group of sidebarGroups) {
    const sidebarTitle = findTitleInSidebar(group, path)
    if (sidebarTitle)
      return sidebarTitle
  }

  // 最后使用frontmatter或默认标题
  return page.value.title || '未设置标题'
}

// 初始化标题
onMounted(() => {
  pageTitle.value = getPageTitle()
})

// 监听路由变化，更新标题
watch(route, () => {
  pageTitle.value = getPageTitle()
})
</script>

<template>
  <h1 v-if="pageTitle">
    {{ pageTitle }}
  </h1>
  <h1 v-else>
    {{ $frontmatter.title || '未设置标题' }}
  </h1>
</template>
