# 下拉菜单组件

基于 naive-ui 的[dropdown](https://www.naiveui.com/zh-CN/os-theme/components/dropdown)二次封装。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<script lang="tsx" setup>
import type { DropdownMixedOption } from 'naive-ui/es/dropdown/src/interface'

import { useDropdown } from '@/components/UI/Dropdown'
// TODO 111
import WIcon from '@/components/UI/Icon'

defineOptions({
  name: 'DropdownDemo',
  defaultView: false,
})

const contextMenuOptions = computed((): DropdownMixedOption[] => [
  {
    key: '1',
    label: 'New York City',
    disabled: true,
  },
  {
    key: '2',
    label: 'Pairs',
  },
  {
    key: '3',
    label: 'London',
    icon: () => <WIcon icon="ant-design:question-circle-outlined"></WIcon>,
  },
  {
    key: '4',
    label: 'Tokyo',
  },
  {
    key: '5',
    label: 'Beijing',
  },
  {
    key: '6',
    label: 'Shanghai',
  },
])

const [registerDropdown, { openDropdown, closeDropdown }] = useDropdown({
  dropdownProps: {
    options: contextMenuOptions.value,
    onSelect: (key) => {
      console.log('DEMO', key)
      closeDropdown()
    },
  },
})

function onRightClick(e: MouseEvent) {
  e.preventDefault()
  openDropdown(e)
}
</script>

<template>
  <WDemoCard title="Dropdown">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Basic usage
        </WTitle>

        <WDropdown @hook="registerDropdown" />

        <n-space>
          <div class="h-64 w-64 bg-gray-6" @click="openDropdown">
            click to open dropdown
          </div>

          <div class="h-64 w-64 bg-gray-4" @click.right="onRightClick">
            right click to open dropdown
          </div>
        </n-space>
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| dropdown-props | DropdownProps | - | naive-ui下拉菜单属性 |
| dropdownProps | DropdownProps | - | naive-ui 的下拉菜单属性 |

## Type

```ts
import type { DropdownProps } from 'naive-ui'

interface ICompUIDropdownProps {
  dropdownProps?: DropdownProps
}

interface ICompUIDropdownInst {
  setProps: IHooksUseProps<ICompUIDropdownProps>['setProps']
  openDropdown: (e: MouseEvent) => void
  closeDropdown: () => void
}

export interface ICompUIDropdownInst {
  setProps: IHooksUseProps<ICompUIDropdownProps>['setProps']
  openDropdown: (e: MouseEvent) => void
  closeDropdown: () => void
}
```
