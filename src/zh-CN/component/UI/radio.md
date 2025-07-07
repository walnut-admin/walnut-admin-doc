```
# 单选框（组）

基于 naive-ui 的[radio](https://www.naiveui.com/zh-CN/os-theme/components/radio)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
import { ref } from 'vue'

const radioValue = ref('1')
const options = ref([
  { value: '1', label: '选项1' },
  { value: '2', label: '选项2', disabled: true },
  { value: '3', label: '选项3' }
])
</script>

<template>
  <!-- 默认单选框 -->
  <WCompUIRadio v-model="radioValue" :options="options" />
  <!-- 按钮式单选框 -->
  <WCompUIRadio v-model="radioValue" :options="options" :button="true" />
</template>
```
```

## Usage

```vue
<template>
  <w-radio v-model:value="radioValue" :options="radioOptions" />
</template>
```
## Props

| 名称 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| options | RadioProps[] | [] | 单选框选项数组（包含value、label等） |
| button | boolean | false | 是否显示为按钮式单选框 |
| （继承自naive-ui RadioGroupProps） | - | - | 支持naive-ui原生单选组所有属性 |
```
## Type

```ts
import type { WithValueProp } from '@/components/HOC/WithValue'
import type { RadioGroupProps, RadioProps } from 'naive-ui'

interface ICompUIRadioProps extends /* @vue-ignore */ RadioGroupProps, /* @vue-ignore */ Omit<WithValueProp, 'value' | 'multiple'> {
  options?: RadioProps[]
  button?: boolean
}
```
```
