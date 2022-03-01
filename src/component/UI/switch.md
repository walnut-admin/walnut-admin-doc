# 开关

基于 naive-ui 的[switch](https://www.naiveui.com/zh-CN/os-theme/components/switch)二次封装。

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

```ts
import type { SwitchProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WSwitchProps extends SwitchProps, ExtendProps {}
```
