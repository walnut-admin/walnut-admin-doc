# 全屏组件

两个图标的切换根据`isFullscreen`的切换

:::info
无需引入，可直接使用
:::

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Usage

```vue
<template>
  <WAppFullScreen />
</template>
```

## Hook

:::info
下面的 hook 只在 app 初始化的时候执行了一次。
:::

:::warning
逻辑还需要修改
:::

```ts
import { toggleLeftMenuLayout } from '/@/settings'

export function useAppFullScreen() {
  const { isFullscreen } = useFullscreen()

  watchEffect(() => {
    if (!isFullscreen.value)
      toggleLeftMenuLayout(true)
  })
}
```
