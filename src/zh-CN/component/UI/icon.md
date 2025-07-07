# 图标

基于 `@iconify/vue` 的二次封装图标组件。更多信息可查看[这里](/guide/deep/icon)。

:::info
无需引入，可直接使用
:::

## Usage
```vue
<template>
  <WIcon icon="mdi:home" color="#ff0000" size="24" />
</template>
```

## Usage
```vue
<script lang="ts" setup>
defineOptions({
  name: 'IconDemo',
  defaultView: false,
})

function onClick() {
  console.log('Demo', 'icon clicked')
}
</script>

<template>
  <WDemoCard title="Icon(iconify)">
    <n-list>
      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Base
        </WTitle>
        <WIcon icon="ant-design:home-outlined" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Custom SVG
        </WTitle>
        <WIcon icon="w-svg:svg-sample-1" height="24" />
        <WIcon icon="w-svg:svg-sample-2" height="24" />
        <WIcon icon="w-svg:svg-sample-3" height="24" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Color
        </WTitle>
        <WIcon icon="ant-design:home-outlined" color="red" />
        <WIcon icon="ant-design:home-outlined" color="green" />
        <WIcon icon="ant-design:home-outlined" color="blue" />
        <WIcon icon="ant-design:home-outlined" color="yellow" />
        <WIcon icon="ant-design:home-outlined" color="orange" />
        <WIcon icon="ant-design:home-outlined" color="indigo" />
        <WIcon icon="ant-design:home-outlined" color="violet" />
        <WIcon icon="ant-design:home-outlined" color="#409EFF" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Width / Height
        </WTitle>
        <WIcon icon="ant-design:home-outlined" width="40" />
        <WIcon icon="ant-design:home-outlined" height="80" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Flip
        </WTitle>
        <WIcon icon="ant-design:home-outlined" flip="horizontal" />
        <WIcon icon="ant-design:home-outlined" flip="vertical" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Rotate
        </WTitle>
        <WIcon icon="ant-design:home-outlined" :rotate="1" />
        <WIcon icon="ant-design:home-outlined" :rotate="2" />
        <WIcon icon="ant-design:home-outlined" :rotate="3" />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Horizontal shift
        </WTitle>

        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMinYMid meet"
          class="border border-red-900 border-solid border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMidYMid meet"
          class="border border-red-900 border-solid border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMaxYMid meet"
          class="border border-red-900 border-solid border-solid"
        />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Vertical shift
        </WTitle>
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMidYMin meet"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMidYMid meet"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMidYMax meet"
          class="border border-red-900 border-solid"
        />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Horizontal sliced icon
        </WTitle>
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMinYMid slice"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMidYMid slice"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="24"
          height="40"
          preserveAspectRatio="xMaxYMid slice"
          class="border border-red-900 border-solid"
        />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Vertical sliced icon
        </WTitle>
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMidYMin slice"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMidYMid slice"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMidYMax slice"
          class="border border-red-900 border-solid"
        />
      </n-list-item>

      <n-list-item>
        <WTitle prefix="bar" class="mb-2">
          Different way to achieve above effect
        </WTitle>
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMinYMin meet"
          class="border border-red-900 border-solid"
        />
        <WIcon
          icon="ant-design:home-outlined"
          width="40"
          height="24"
          preserveAspectRatio="xMinYMin slice"
          class="border border-red-900 border-solid"
        />
      </n-list-item>
    </n-list>
  </WDemoCard>
</template>
```

## Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| icon | string | - | 图标名称（格式：库名:图标名） |
| color | string | - | 图标颜色 |
| size | string | - | 图标尺寸 |
| icon | string | - | 图标的名称 |
| width | string | - | 图标的宽度 |
| height | string | - | 图标的高度 |
| inline | boolean | true | 是否内联显示 |

## Type

```ts
import type { IconProps } from '@iconify/vue'
import type { AllowedComponentProps } from 'vue'

interface ICompUIIconProps extends IconProps, AllowedComponentProps {}
```
