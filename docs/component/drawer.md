# 抽屉

基于 naive-ui 的[drawer](https://www.naiveui.com/zh-CN/os-theme/components/drawer)二次封装。

## Props

| 名称     | 类型     | 默认值  | 说明                                    |
| -------- | -------- | ------- | --------------------------------------- |
| closable | boolean  | false   | 覆盖默认的 true                         |
| title    | string   | 'title' | 抽屉的标题                              |
| loading  | boolean  | false   | default slot 外封了一层 spin 的 loading |
| on-yes   | function | -       | 确定按钮事件                            |
| on-no    | function | -       | 取消按钮事件                            |

## Type

```ts
import type { DrawerProps } from "naive-ui";

import { props } from "./props";

type ExtendProps = Partial<ExtractPropTypes<typeof props>>;

export interface WDrawertProps extends DrawerProps, ExtendProps {}
```
