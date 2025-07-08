# 输入框组件

基于 naive-ui 的[input](https://www.naiveui.com/zh-CN/os-theme/components/input)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <WInput
    v-model="inputValue"
    :black-list="['!']"
    suffix="@example.com"
    prefix="用户："
    prefix-icon="mdi:account"
    suffix-icon="mdi:email"
    help-message="请输入有效邮箱"
    :copiable="true"
    :value-modifiers="{ trim: true }"
    @keyup-enter="(e) => console.log('回车键按下')"
  />
</template>
```
## Props

| 名称 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| blackList | string[] | [] | 黑名单，即不可输入的字符名单 |
| suffix | string | - | prop 形式的 suffix（naive 默认提供的是 slot） |
| prefix | string | - | prop 形式的 prefix |
| prefixClass | string | - | 前缀的类名 |
| suffixClass | string | - | 后缀的类名 |
| suffixIcon | string | - | suffix 图标 |
| prefixIcon | string | - | prefix 图标 |
| helpMessage | string | - | 帮助信息 |
| copiable | boolean | - | 是否可复制 |
| valueModifiers | object | - | vue3 的修饰符，默认内置了去空格，首字母大写和全大写的修饰符 |
| onKeyupEnter | function | - | 按下回车键时的回调函数 |

## Type

```ts
import type { InputProps } from 'naive-ui'

interface ICompUIInputProps extends /* @vue-ignore */ InputProps {
  blackList?: string[]
  suffix?: string
  prefix?: string
  prefixClass?: string
  suffixClass?: string
  suffixIcon?: string
  prefixIcon?: string
  helpMessage?: string
  copiable?: boolean
  valueModifiers?: {
    trim?: boolean
    capitalize?: boolean
    uppercase?: boolean
  }
  onKeyupEnter?: (e: KeyboardEvent) => void
}
```
