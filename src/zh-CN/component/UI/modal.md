# 模态框组件

基于 naive-ui 的[modal](https://www.naiveui.com/zh-CN/os-theme/components/modal)二次封装。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <WModal
    v-model:show="modalVisible"
    :loading="isLoading"
    title="操作提示"
    help-message="确认执行此操作？"
    width="50%"
    height="auto"
    :fullscreen="true"
    :default-button="true"
    :segmented="true"
    :before-close="beforeClose"
    @yes="onYes"
    @no="onNo"
  >
    模态框内容
  </WModal>
</template>
```
## Props

| 名称 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| show | boolean | false | 控制模态框显示/隐藏 |
| loading | boolean | false | 是否显示加载状态 |
| title | string | - | 模态框标题 |
| help-message | string | - | 标题帮助提示信息 |
| width | string | '25%' | 模态框宽度（支持百分比/px） |
| height | string | 'auto' | 模态框高度（支持百分比/px） |
| fullscreen | boolean | true | 是否支持全屏 |
| default-button | boolean | true | 是否显示默认确认/取消按钮 |
| segmented | boolean | true | 是否显示分割线（soft风格） |
| before-close | function | - | 关闭前回调（返回false可阻止关闭） |

```ts
import type { ModalProps } from 'naive-ui'

export interface ICompUIModalProps extends /* @vue-ignore */ Omit<ModalProps, 'segmented'> {
  show?: boolean
  loading?: boolean
  title?: string
  helpMessage?: string
  width?: string
  height?: string
  fullscreen?: boolean
  defaultButton?: boolean
  segmented?: boolean
  beforeClose?: () => Promise<boolean>
}
```
