# 图标

图标目前采用的是 iconify 的 vue 组件，具体可查看[这里](/deep/icon)。

## 使用方式

`<w-icon />` 也是通过 component 自动引入的

```vue
<template>
  <w-icon icon="ant-design:home-outlined"></w-icon>
</template>
```

## Collections

默认使用了以下几种 collection

```ts
import antdIcons from "@iconify/json/json/ant-design.json";
import mdiIcons from "@iconify/json/json/mdi.json";
import simpleIcons from "@iconify/json/json/simple-icons.json";
import carbonIcons from "@iconify/json/json/carbon.json";
```

## 命名规则

规则很简单，即集合的前缀 + 图标的 key 值

```ts
/**
 * @description Generate icon list based on used collections
 */
export const genIconLists = (collections: Collection[]) => {
  const ret: string[] = [];
  collections.forEach((item) => {
    ret.push(...Object.keys(item.icons).map((key) => `${item.prefix}:${key}`));
  });
  return ret;
};
```
