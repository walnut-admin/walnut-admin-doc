# 坐标选择器(TODO)

基于[baidu 地图](https://lbsyun.baidu.com/products/map)的二次封装。还有一些问题需要解决，不是很成熟，

:::info
无需引入，可直接使用
:::

## Usage

双向绑定的值是坐标

```vue
<template>
  <w-location-picker v-model:value="location" />
</template>
```

## Props

| 名称   | 类型   | 默认值 | 说明                             |
| ------ | ------ | ------ | -------------------------------- |
| value  | string | -      | 双向绑定的值，是坐标，某种格式的 |
| height | string | 50vh   | 高度                             |
| width  | string | 50vw   | 宽度                             |

## Type

## Form Usage

## TODO
