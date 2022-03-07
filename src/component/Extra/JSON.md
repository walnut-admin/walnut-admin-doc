# JSON 显示

上网找了个高亮不同类型数据的函数，简单处理了一下，就可以显示在页面上了

:::info
无需引入，可直接使用
:::

## Props

| 名称   | 类型         | 默认值    | 说明       |
| ------ | ------------ | --------- | ---------- |
| value  | object/array | undefined | 要显示的值 |
| height | string       | 100px     | 元素的高度 |
| width  | string       | 100%      | 元素的宽度 |

## Usage

```vue
<template>
  <w-JSON :value="value" />
</template>

<script>
const value = [
  { key1: "value1" },
  { key2: true },
  { key3: 999 },
  { key4: null },
];
</script>
```
