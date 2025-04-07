# 描述

基于 naive-ui 的[descriptions](https://www.naiveui.com/zh-CN/os-theme/components/descriptions)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-descriptions :items="descriptionsItem" />
</template>
```

## Props

| 名称  | 类型                | 默认值 | 说明         |
| ----- | ------------------- | ------ | ------------ |
| items | WDescriptionsItem[] | []     | 描述内容数组 |

## Type

```ts
import type {
  DescriptionItemProps,
  DescriptionProps,
  TagProps,
  TextProps,
} from 'naive-ui'

import { props } from './props'

// tag类型的描述
interface WDescTypeTag {
  type: 'tag'
  typeProps: TagProps
}

// 链接类型的描述
interface WDescTypeLink {
  type: 'link'
  typeProps: TextProps & {
    link: string
  }
}

// 描述的内容
interface WDescValue {
  value: StringOrNumber
}

export type WDescriptionsItem = DescriptionItemProps &
  Partial<WDescTypeTag | WDescTypeLink> &
  WDescValue

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WDescriptionProps extends DescriptionProps, ExtendProps {}
```
