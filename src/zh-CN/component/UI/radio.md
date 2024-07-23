# 单选框

基于 naive-ui 的[radio](https://www.naiveui.com/zh-CN/os-theme/components/radio)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-radio v-model:value="radioValue" :options="radioOptions" />
</template>
```

## Props

| 名称    | 类型                              | 默认值 | 说明                                     |
| ------- | --------------------------------- | ------ | ---------------------------------------- |
| options | RadioProps & { label?: string }[] | []     | 渲染 radio 组的数组，外加了个 label 字段 |

## Type

```ts
import type { RadioGroupProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WRadioProps extends RadioGroupProps, ExtendProps {}
```
