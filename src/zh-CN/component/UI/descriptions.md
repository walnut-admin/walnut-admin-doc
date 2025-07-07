# 描述

基于 naive-ui 的[descriptions](https://www.naiveui.com/zh-CN/os-theme/components/descriptions)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
import type { ICompUIDescriptionsItem } from '@/components/UI/Descriptions'

defineOptions({
  name: 'DescriptionDemo',
  defaultView: false,
})

const descs: ICompUIDescriptionsItem[] = [
  {
    key: '0',
    type: 'tag',
    typeProps: {
      type: 'primary',
      round: true,
    },
    label: 'Tag Label 1',
    value: 'tag value 1',
  },
  {
    key: '1',
    type: 'tag',
    typeProps: {
      type: 'info',
      strong: true,
      size: 'large',
    },
    label: 'Tag Label 2',
    value: 'tag value 2',
  },

  {
    key: '2',
    type: 'link',
    typeProps: {
      type: 'error',
      link: 'https://www.bing.com',
      strong: true,
    },
    label: 'Link Label 1',
    value: 'click to bing.com',
  },
  {
    key: '3',
    type: 'link',
    typeProps: {
      type: 'warning',
      link: 'https://www.bing.com',
      strong: true,
    },
    label: 'Link Label 2',
    value: 'click to bing.com',
  },

  {
    key: '4',
    type: 'json',
    typeProps: {
      height: '100px',
      copy: false,
    },
    label: 'JSON label 1',
    value: JSON.stringify({
      v1: 'v1',
      v2: 'v2',
      v3: 'v3',
    }),
  },

  {
    key: '5',
    type: 'json',
    typeProps: {
      height: '100px',
    },
    label: 'JSON label 2',
    value: JSON.stringify({
      v1: 'v1',
      v2: 'v2',
      v3: 'v3',
    }),
  },

  {
    key: '6',
    type: 'dict',
    typeProps: {
      dictType: 'gbt_sex',
    },
    label: 'Dict label 1',
    value: '1',
  },
  {
    key: '7',
    type: 'dict',
    typeProps: {
      dictType: 'sys_shared_status',
    },
    label: 'Dict label 2',
    value: true,
    labelClass: 'text-red',
    contentClass: 'my-2',
  },

  {
    key: '8',
    label: 'Normal Label 1',
    value: 'normal value 1',
  },

  {
    key: '9',
    label: 'Normal Label 2',
    value: 'normal value 2',
    formatter(val, record) {
      return `${record['0']} / ${val}.2222`
    },
  },
]
</script>

<template>
  <WDemoCard title="Description Demo">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic Usage
        </WTitle>

        <WDescriptions
          :items="descs" size="small"
          label-placement="left"
          bordered
          :column="2"
          :label-style="{ width: '20%' }"
        />
      </n-list-item>
    </n-list>
  </WDemoCard>
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
