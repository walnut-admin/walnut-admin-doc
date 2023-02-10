# 通用标题

一个 naive 的 h4 加上之前的提示消息的组件，就组成了最基本的标题组件

naive 的 h4 组件的所有属性也都生效

:::info
无需引入，可直接使用
:::

## Props

| 名称        | 类型   | 默认值    | 说明                            |
| ----------- | ------ | --------- | ------------------------------- |
| helpMessage | string | undefined | 帮助消息，同消息组件的 msg 属性 |

## Usage

```vue
<template>
  <w-title help-message="This is a help message.">
    This is a title with a help message.
  </w-title>
</template>
```
