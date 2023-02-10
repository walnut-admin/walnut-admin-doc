# 图标

图标目前采用的是 iconify 的 vue 组件，更多信息可查看[这里](/guide/deep/icon)。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-icon icon="ant-design:home-outlined" />
</template>
```

## Props

| 名称   | 类型          | 默认值 | 说明       |
| ------ | ------------- | ------ | ---------- |
| icon   | string        | -      | 图标字符串 |
| height | string        | -      | 图标高度   |
| width  | string        | -      | 图标宽度   |
| color  | string        | -      | 图标配色   |
| flip   | string        | -      | 翻转       |
| align  | string        | -      | 排列       |
| rotate | string/number | -      | 旋转       |
| inline | boolean       | -      | 行内图标   |
| slice  | boolean       | -      | 裁剪       |
| hFlip  | boolean       | -      | 水平翻转   |
| vFlip  | boolean       | -      | 垂直翻转   |
| hAlign | boolean       | -      | 水平排列   |
| vAlign | boolean       | -      | 垂直排列   |
