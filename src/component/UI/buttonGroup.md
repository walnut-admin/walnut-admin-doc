# 按钮组

基于 naive-ui 的[button](https://www.naiveui.com/zh-CN/os-theme/components/button)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-button-group :groups="buttonGroups" />
</template>
```

## Props

| 名称   | 类型           | 默认值 | 说明                 |
| ------ | -------------- | ------ | -------------------- |
| groups | WButtonProps[] | []     | WButton 的 prop 数组 |

## Type

```ts
import type { ButtonGroupProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WButtonGroupProps extends ButtonGroupProps, ExtendProps {}
```
