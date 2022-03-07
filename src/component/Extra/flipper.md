# 翻转卡片

一个有着正面背面的卡片，不知道有什么用

:::info
无需引入，可直接使用
:::

## Props

| 名称                     | 类型              | 默认值                     | 说明            |
| ------------------------ | ----------------- | -------------------------- | --------------- |
| width                    | string            | 100%                       | 卡片宽度        |
| height                   | string            | 100%                       | 卡片高度        |
| duration                 | string            | 500ms                      | 翻转时间        |
| transitionTimingFunction | string            | cubic-bezier(0.4, 0, 1, 1) | transition 函数 |
| trigger                  | 'click' , 'hover' | click                      | 翻转触发类型    |

## Usage

```vue
<template>
  <w-flipper trigger="hover" width="270px" height="300px">
    <template #front>
      <div class="abs-center">this is front</div>
    </template>

    <template #back>
      <div class="abs-center">this is back</div>
    </template>
  </w-flipper>
</template>
```
