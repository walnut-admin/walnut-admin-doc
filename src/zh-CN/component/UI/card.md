# 卡片

基于 naive-ui 的[card](https://www.naiveui.com/zh-CN/os-theme/components/card)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
defineOptions({
  name: 'CardDemo',
  defaultView: false,
})

const show = ref(true)

function onRefresh() {
  show.value = false

  const id = setTimeout(() => {
    show.value = true
    clearTimeout(id)
  }, 1000)
}
</script>

<template>
  <WDemoCard title="Card">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Card
        </WTitle>

        <n-space>
          <WCard class="w-64">
            <template #header>
              title
            </template>

            <div>
              this is normal card
            </div>
          </WCard>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Card collapsed
        </WTitle>

        <n-space>
          <WCard header-preset="collapse" class="w-64">
            <template #header>
              title
            </template>

            <div>
              this is collapsed card
            </div>
          </WCard>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Card With Refresh
        </WTitle>

        <n-space>
          <WCard header-preset="refresh" class="w-64" @refresh="onRefresh">
            <template #header>
              title
            </template>

            <div v-show="show" class="w-64">
              this is refresh card
            </div>
          </WCard>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Card loading
        </WTitle>

        <n-space>
          <WCard header-preset="refresh" loading class="w-64">
            <template #header>
              title
            </template>

            <div>
              this is loading card
            </div>
          </WCard>
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>

<style lang="scss" scoped>

</style>
```

## Props

| 名称          | 类型                          | 默认值 | 说明                                      |
| ------------- | ----------------------------- | ------ | ----------------------------------------- |
| headerPreset  | 'collapse' \| 'refresh'       | -      | 头部预设类型（折叠或刷新）                |
| loading       | boolean                       | -      | 是否加载中                                |
| segmented     | -   | -      | 分割线配置，支持内容、底部、操作区域      |

## Type

```ts
import type { CardProps } from 'naive-ui'

interface ICompUICardProps extends /* @vue-ignore */ Omit<CardProps, 'segmented'> {
  headerPreset?: 'collapse' | 'refresh'
  loading?: boolean
  segmented?: boolean | {
    content?: boolean | 'soft'
    footer?: boolean | 'soft'
    action?: boolean | 'soft'
  }
}
```
