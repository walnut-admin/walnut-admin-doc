# 图标按钮组件

基于 naive-ui 的二次封装图标按钮组件。

:::info
无需引入，可直接使用
:::

## Usage

```vue
<template>
  <WCompUIIconButton
    :icon-props="{ icon: 'ep:search' }"
    :button-props="{ type: 'primary' }"
    :tooltip="true"
    tooltip-msg="搜索"
    :confirm="true"
    confirm-msg="确定要搜索吗？"
    @confirm="onConfirm"
  />
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| iconProps | ICompUIIconProps | - | 图标属性 |
| buttonProps | ICompUIButtonProps | - | 按钮属性 |
| tooltip | boolean | false | 是否显示提示框 |
| tooltipMsg | string \| string[] | - | 提示框消息 |
| tooltipProps | TooltipProps | - | 提示框属性 |
| confirm | boolean | false | 是否显示确认框 |
| confirmMsg | string | 'app.base.confirm' | 确认框消息 |
| popConfirmProps | PopconfirmProps | - | 确认框属性 |

## Type

```ts
import type { PopconfirmProps, TooltipProps } from 'naive-ui'
import type { AllowedComponentProps } from 'vue'
import type { ICompUIButtonProps } from '../Button'
import type { ICompUIIconProps } from '../Icon'

export interface ICompUIIconButtonProps extends AllowedComponentProps {
  iconProps?: ICompUIIconProps
  buttonProps?: ICompUIButtonProps
  tooltip?: boolean
  tooltipMsg?: string | string[]
  tooltipProps?: TooltipProps
  confirm?: boolean
  confirmMsg?: string
  popConfirmProps?: PopconfirmProps
}
```
