# 权限组件

很简单的按照权限字符串数组中是否 includes 传进来的 value 做的 slot 渲染判断

:::info
无需引入，可直接使用
:::

## Props

| 名称  | 类型   | 默认值    | 说明       |
| ----- | ------ | --------- | ---------- |
| value | string | undefined | 权限字符串 |

## Usage

```vue
<template>
  <WAppAuthorize value="system:user:create">
    <div class="bg-red-800">test authorize</div>
  </WAppAuthorize>
</template>
```
