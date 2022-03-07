# 滚动条

在 naive 的 scrollbar 上又封装了一层，支持更多使用方法

:::info
无需引入，可直接使用
:::

## Props

| 名称       | 类型           | 默认值 | 说明           |
| ---------- | -------------- | ------ | -------------- |
| modelValue | number         | 0      | 滚动位置       |
| vertical   | boolean        | false  | 是否为横向滚动 |
| height     | string         | 0      | 容器高度       |
| width      | string         | 100%   | 容器宽度       |
| behavior   | ScrollBehavior | smooth | 原生滚动行为   |

## Usage

```vue
<template>
  <w-scrollbar ref="scrollRef" v-model="position" height="500px" :el-size="36">
    <div v-for="i in 100" :key="i" class="text-3xl">Horizontal-{{ i }}</div>
  </w-scrollbar>
</template>

<script lang="ts" setup>
const position = ref(0);
</script>
```

## Method

### scrollTo

naive 的 scrollTo 方法暴露

```ts
scrollRef.value?.scrollTo({ top: 800 });
```

### scrollToStart

滚动到顶部（vertical 下就是滚动到最左侧）

```ts
scrollRef.value?.scrollToStart();
```

### scrollToEnd

滚动到底部（vertical 下就是滚动到最右侧）

```ts
scrollRef.value?.scrollToEnd();
```

### scrollToIndex

因为 scrollbar 一般都是包裹 list 的，所以封装了一个按照索引滚动的方法

:::warning
在使用此方法时要注意 scrollbar 包裹的 list 的部分只能再有一层元素包裹。
因为是通过找到 container 的元素再获取目标元素的 offsetTop/offsetLeft 来实现滚动。
就是下面的逻辑，说实话很蠢，不过还是好用的

```ts
const node =
  scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]?.children[
    index
  ] ??
  scrollRef.value?.scrollbarInstRef?.containerRef?.children[0]?.children[0]
    ?.children[index];
```

:::

```ts
// 滚动到索引为40的元素
scrollRef.value?.scrollToIndex(40);
```
