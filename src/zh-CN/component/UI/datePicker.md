# 日期选择器

基于 naive-ui 的[date-picker](https://www.naiveui.com/zh-CN/os-theme/components/date-picker)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
import type { Recordable } from 'easy-fns-ts'

defineOptions({
  name: 'DatePickerDemo',
  defaultView: false,
})

const state = reactive<Recordable>({})
</script>

<template>
  <WDemoCard title="Date Picker">
    <WJSON :value="state" height="80px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic Usage
        </WTitle>

        <WDatePicker v-model:value="state.color1" />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```
## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |
| （继承自naive-ui DatePickerProps） | - | - | 支持naive-ui原生日期选择器所有属性 |
| （继承自naive-ui DatePickerProps） | - | - | 支持naive-ui原生日期选择器所有属性 |

## Type

```ts
import type { DatePickerProps } from 'naive-ui'

export interface ICompUIDatePickerProps extends /* @vue-ignore */ DatePickerProps { }
```
```
