# 过渡下拉框

就是一个选择过渡类型的下拉框，配合 naive select 的 group 类型

:::info
没做全局引用，不过嵌入到了 form 中，作为 type: 'Extend:TransitionSelect' 的表单项使用
:::

## Props

| 名称  | 类型   | 默认值    | 说明          |
| ----- | ------ | --------- | ------------- |
| value | string | undefined | v-model:value |

## Usage

```vue
<script lang="ts" setup>
import WTransitionSelect from '/@/components/Extra/TransitionSelect'

const transitionName = ref('')
</script>

<template>
  <WTransitionSelect v-model:value="transitionName" />
</template>
```
