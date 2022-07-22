# 日期选择器

基于 naive-ui 的[date-picker](https://www.naiveui.com/zh-CN/os-theme/components/date-picker)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-date-picker v-model:value="dateValue" />
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

```ts
import type { DatePickerProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WDatePickerProps extends DatePickerProps, ExtendProps {}
```
