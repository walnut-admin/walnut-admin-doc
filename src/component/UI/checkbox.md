# 多选框（组）

基于 naive-ui 的[checkbox](https://www.naiveui.com/zh-CN/os-theme/components/checkbox)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-checkbox v-model:value="checkboxValue" :options="checkboxOptions" />
</template>
```

## Props

| 名称    | 类型            | 默认值 | 说明                  |
| ------- | --------------- | ------ | --------------------- |
| options | CheckboxProps[] | []     | checkbox props 的数组 |

## Type

```ts
import type { CheckboxGroupProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WCheckboxProps extends CheckboxGroupProps, ExtendProps {}
```
