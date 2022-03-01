# 箭头

很简单，一个箭头图标加可控状态。

:::info
无需引入，可直接使用
:::

## Props

| 名称   | 类型    | 默认值                   | 说明           |
| ------ | ------- | ------------------------ | -------------- |
| icon   | string  | ant-design:down-outlined | 箭头图标       |
| active | boolean | false                    | 可控的激活状态 |
| right  | boolean | false                    | 箭头朝向右     |
| left   | boolean | false                    | 箭头朝向左     |

## Usage

```vue
<template>
  <w-arrow :active="active" />
</template>
```
