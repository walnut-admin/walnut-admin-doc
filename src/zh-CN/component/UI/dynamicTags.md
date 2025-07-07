# 动态标签组件

基于 naive-ui 的[dynamic-tags](https://www.naiveui.com/zh-CN/os-theme/components/dynamic-tags)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
defineOptions({
  name: 'DynamicTagsDemo',
  defaultView: false,
})

const state = reactive({
  dynamicTag1: [],
  dynamicTag2: ['1', '2', '3', '4'],
})
</script>

<template>
  <WDemoCard title="Dynamic Tags">
    <WJSON :value="state" height="200px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <n-space vertical>
          <WDynamicTags v-model:value="state.dynamicTag1" />

          <WDynamicTags v-model:value="state.dynamicTag2" />
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| （继承自naive-ui DynamicTagsProps） | - | - | 支持naive-ui原生动态标签所有属性 |

## Type

```ts
import type { DynamicTagsProps } from 'naive-ui'

export interface ICompUIDynamicTagsProps extends /* @vue-ignore */ DynamicTagsProps { }
```
