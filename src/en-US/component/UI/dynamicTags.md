# 动态标签

基于 naive-ui 的[dynamic-tags](https://www.naiveui.com/zh-CN/os-theme/components/dynamic-tags)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-dynamic-tags v-model:value="dynamicTagsValue" />
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

```ts
import type { DynamicTagsProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDynamicTagsProps extends DynamicTagsProps, ExtendProps {}
```
