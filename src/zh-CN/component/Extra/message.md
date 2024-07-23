# 提示消息

一个提示的小图标加上一个 tooltip 就组成了最简单的消息提示

:::info
无需引入，可直接使用
:::

## Props

| 名称 | 类型            | 默认值                        | 说明                                         |
| ---- | --------------- | ----------------------------- | -------------------------------------------- |
| msg  | string/string[] | undefined                     | 字符串或数组都可以，字符串想换行就加 \n 即可 |
| icon | string          | ant-design:info-circle-filled | 默认就是 antd 的一个消息图标                 |

## Usage

```vue
<template>
  <w-message :msg="['some message 1', 'some message 1']" />
</template>
```

```vue
<template>
  <w-message msg="some message 1 \\n some message 1" />
</template>
```
