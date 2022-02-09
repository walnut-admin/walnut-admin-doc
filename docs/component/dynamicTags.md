# 日期选择器

基于 naive-ui 的[dynamic-tags](https://www.naiveui.com/zh-CN/os-theme/components/dynamic-tags)二次封装。

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

```ts
import type { DynamicTagsProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WDynamicTagsProps extends DynamicTagsProps, ExtendProps {}
```
