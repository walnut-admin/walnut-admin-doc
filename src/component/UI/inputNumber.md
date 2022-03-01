# 数字输入框

基于 naive-ui 的[input-number](https://www.naiveui.com/zh-CN/os-theme/components/input-number)二次封装。

## Props

| 名称   | 类型   | 默认值 | 说明                                          |
| ------ | ------ | ------ | --------------------------------------------- |
| suffix | string | ''     | prop 形式的 suffix（naive 默认提供的是 slot） |

## Type

```ts
import type { InputNumberProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WInputNumberProps extends InputNumberProps, ExtendProps {}
```
