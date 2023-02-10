# 输入框

基于 naive-ui 的[input](https://www.naiveui.com/zh-CN/os-theme/components/input)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-input v-model:value="inputValue" />
</template>
```

## Props

| 名称           | 类型                        | 默认值              | 说明                                                        |
| -------------- | --------------------------- | ------------------- | ----------------------------------------------------------- |
| blackList      | string[]                    | []                  | 黑名单，即不可输入的字符名单                                |
| suffix         | string                      | ''                  | prop 形式的 suffix（naive 默认提供的是 slot）               |
| prefix         | string                      | ''                  | prop 形式的 prefix                                          |
| suffixIcon     | string                      | ''                  | suffix 图标                                                 |
| prefixIcon     | string                      | ''                  | prefix 图标                                                 |
| helpMessage    | string                      | ''                  | 帮助信息                                                    |
| valueModifiers | trim, capitalize, uppercase | false, false, false | vue3 的修饰符，默认内置了去空格，首字母大写和全大写的修饰符 |

## Type

```ts
import type { InputProps } from 'naive-ui'

import { props } from './props'

type ExtendProps = Partial<ExtractPropTypes<typeof props>>

export interface WInputProps extends InputProps, ExtendProps {}
```
