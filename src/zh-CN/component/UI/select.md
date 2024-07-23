# 下拉框

基于 naive-ui 的[select](https://www.naiveui.com/zh-CN/os-theme/components/select)二次封装。

:::info
naive 本身的 select 已经很强大了，所以对于 select 的封装会变得十分抽象。
:::

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Type

`WithValueProp` 具体查看[高阶组件](/component/HOC/withValue)

```ts
import type { SelectProps } from 'naive-ui'
import type { WithValueProp } from '/@/components/HOC/WithValue'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WSelectProps extends SelectProps, ExtendProps, WithValueProp {}
```

## Export

select 的导出是套了层 WithValue 的高阶组件，这和其他基本的组件导出不一样。

```ts
import { WithValue } from '../../HOC/WithValue'
import WSelect from './src/index.vue'

const HOCSelect = WithValue(WSelect)

export * from './src/types'

export default HOCSelect
```
