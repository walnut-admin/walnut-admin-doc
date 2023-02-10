# 时间选择器

基于 naive-ui 的[time-picker](https://www.naiveui.com/zh-CN/os-theme/components/time-picker)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-time-picker v-model:value="timePickerValue" />
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

```ts
import type { TimePickerProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WTimePickerProps extends TimePickerProps, ExtendProps {}
```
