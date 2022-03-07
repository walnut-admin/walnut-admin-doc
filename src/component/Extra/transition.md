# 过渡

最基础的过渡组件，简单封装，配合了 animate.css

具体查看 `/@/const/transition.ts` 文件可以看到嵌入的 animate.css 的部分样式名称

:::info
无需引入，可直接使用
:::

## Props

| 名称     | 类型                       | 默认值                       | 说明                            |
| -------- | -------------------------- | ---------------------------- | ------------------------------- |
| name     | ValueOfTransitionNameConst | fade                         | 过渡名称                        |
| mode     | 'in-out' / 'out-in'        | out-in                       | vue 原生 transition 的 mode     |
| group    | boolean                    | false                        | 是否渲染为过渡组                |
| appear   | boolean                    | false                        | vue 原生 transition 的 appear   |
| duration | number/object              | '{ enter: 500, leave: 500 }' | vue 原生 transition 的 duration |

## Usage

```vue
<template>
  <w-transition name="fade-left" appear>
    <div v-show="show"></div>
  </w-transition>
</template>
```
