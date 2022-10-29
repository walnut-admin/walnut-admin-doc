# 权限组件

最基础的用法即按照权限字符串数组中是否 includes 传进来的 value 做的 slot 渲染判断

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <w-app-authroize value="system:user:create">
    <div class="bg-red-800">test authorize</div>
  </w-app-authroize>
</template>
```

## Props

| 名称         | 类型                      | 默认值    | 说明                               |
| ------------ | ------------------------- | --------- | ---------------------------------- |
| value        | string                    | undefined | 权限字符串                         |
| preset       | 'null' \| 'tip' \| 'IPTC' | 'null'    | 权限预设类型                       |
| presetHeight | string                    | -         | 预设高度，在 preset 为非'null'时必穿 |
| presetWidth  | string                    | -         | 预设宽度，在 preset 为非'null'时必穿 |
