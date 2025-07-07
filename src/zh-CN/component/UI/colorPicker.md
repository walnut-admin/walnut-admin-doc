# 颜色选择器

基于 naive-ui 的[color-picker](https://www.naiveui.com/zh-CN/os-theme/components/color-picker)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="ts" setup>
import { ref } from 'vue'

const colorValue = ref('#ff0000')
</script>

<template>
  <WColorPicker v-model="colorValue" :eye-dropper="true" />
</template>
```

## Usage
```vue
<script lang="ts" setup>
import { ref } from 'vue'

const inputValue = ref('#ff0000')
const showValue = ref(false)

function onChooseColor(sRGB: string) {
  inputValue.value = sRGB
  showValue.value = false
}
</script>

<template>
  <WCompUIColorPicker v-model:value="inputValue" v-model:show="showValue" :eye-dropper="true">
    选择颜色
  </WCompUIColorPicker>
</template>
```

## Usage
```vue
<script lang="ts" setup>
import type { Recordable } from 'easy-fns-ts'

defineOptions({
  name: 'ColorPickerDemo',
  defaultView: false,
})

const state = reactive<Recordable>({})
</script>

<template>
  <WDemoCard title="Color Picker">
    <WJSON :value="state" height="80px" />

    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic Usage
        </WTitle>

        <WColorPicker v-model:value="state.color1" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Eyedropper support
        </WTitle>

        <WColorPicker v-model:value="state.color2" eye-dropper />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
|--|--|--|--|
| eye-dropper | boolean | - | 是否显示取色器按钮 |

## Type

```ts
import type { ColorPickerProps } from 'naive-ui'

interface ICompUIColorPickerProps extends /* @vue-ignore */ ColorPickerProps {
  eyeDropper?: boolean
}
```
