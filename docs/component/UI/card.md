# 卡片

基于 naive-ui 的[card](https://www.naiveui.com/zh-CN/os-theme/components/card)二次封装。

## Props

| 名称     | 类型    | 默认值 | 说明                 |
| -------- | ------- | ------ | -------------------- |
| collapse | boolean | false  | 卡片是否显示折叠图标 |

## Type

```ts
import type { CardProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WCardProps extends CardProps, ExtendProps {}
```
