# 按钮

基于 naive-ui 的[button](https://www.naiveui.com/zh-CN/os-theme/components/button)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script setup lang="ts">
defineOptions({
  name: 'ButtonDemo',
  defaultView: false,
})

const value = ref(0)

const buttonRetryRef1 = shallowRef()
const buttonRetryRef2 = shallowRef()
const buttonRetryRef3 = shallowRef()

function onClick() {
  value.value++
}
</script>

<template>
  <WDemoCard :title="`Button: ${value}`">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Text in slot/prop
        </WTitle>

        <n-space>
          <WButton @click="onClick">
            Click(slot)
          </WButton>
          <WButton text-prop="Click(prop)" @click="onClick" />
          <WButton text-prop="loading" loading @click="onClick" />
          <WButton text-prop="disabled" disabled @click="onClick" />
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Icon(prop)
        </WTitle>

        <n-space>
          <WButton
            type="primary"
            icon="ant-design:home-outlined"
            @click="onClick"
          >
            Icon prop
          </WButton>
          <WButton
            type="primary"
            loading
            icon="ant-design:home-outlined"
            @click="onClick"
          >
            loading
          </WButton>
          <WButton
            type="primary"
            disabled
            icon="ant-design:home-outlined"
            @click="onClick"
          >
            disabled
          </WButton>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Debounece Button
        </WTitle>

        <n-space>
          <WButton type="warning" :debounce="500" @click="onClick">
            Debouned 500ms
          </WButton>

          <WButton type="warning" :debounce="500" loading @click="onClick">
            loading
          </WButton>

          <WButton type="warning" :debounce="500" disabled @click="onClick">
            disabled
          </WButton>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Confirm Button
        </WTitle>

        <n-space>
          <WButtonConfirm @confirm="onClick">
            Confirm Button
          </WButtonConfirm>

          <WButtonConfirm :button-props="{ type: 'error', loading: true }" :show-icon="false" @confirm="onClick">
            loading
          </WButtonConfirm>

          <WButtonConfirm :button-props="{ disabled: true }" @confirm="onClick">
            disabled
          </WButtonConfirm>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Retry Button
        </WTitle>

        <n-space>
          <WButtonRetry ref="buttonRetryRef1" @click="buttonRetryRef1.onStartCountdown()">
            Retry 60s
          </WButtonRetry>

          <WButtonRetry ref="buttonRetryRef2" :retry-seconds="30" @click="buttonRetryRef2.onStartCountdown()">
            Retry 30s
          </WButtonRetry>

          <WButtonRetry ref="buttonRetryRef3" retry-key="demo-button-retry" :retry-seconds="10" @click="buttonRetryRef3.onStartCountdown()">
            Retry with storage persistent
          </WButtonRetry>
        </n-space>
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Button Groups
        </WTitle>

        <WButtonGroup
          :groups="[
            { textProp: 'Button 1', onClick },
            { textProp: 'Button 2', onClick },
            { textProp: 'Button 3', onClick },
          ]"
        />

        <WButtonGroup
          vertical
          :groups="[
            { textProp: 'Button 1', onClick },
            { textProp: 'Button 2', onClick },
            { textProp: 'Button 3', onClick },
          ]"
        />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```

## Props

| 名称       | 类型    | 默认值 | 说明                                          |
| ---------- | ------- | ------ | --------------------------------------------- |
| icon       | string  | -      | 含有 icon 的按钮，直接传入图标的字符串即可    |
| textProp   | string  | -      | 按钮显示的文字，以 prop 形式传入              |
| debounce   | number  | 0      | 封装好的防抖(只针对 click 事件)，单位是毫秒   |
| auth       | string  | -      | 权限字符串                                    |

## Type

```ts
import type { ButtonProps } from 'naive-ui'
import type { VNodeChild } from 'vue'

interface ICompUIButtonProps extends /* @vue-ignore */ ButtonProps {
  icon?: string
  auth?: string
  title?: string
  textProp?: string | Fn<VNodeChild>
  debounce?: number
  onClick?: (e: MouseEvent) => void | Promise<void>
}
```
