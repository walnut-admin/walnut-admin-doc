# 代码编辑器

基于[vue-codemirror](https://github.com/surmon-china/vue-codemirror)的二次封装，目前使用的是 `v6` 版本。`vue-codemirror`帮助我们把[`codemirror`](https://codemirror.net/)和`vue`建立了一个很好的桥接。相信我，如果你打算单独使用`codemirror`，困难会不少的。`codemirror`的 api 设计的很大佬，文档也是很大佬，比较难于阅读。所以我更倾向于直接使用`vue-codemirror`。

前一阵开始用的时候发现`vue-codemirror`没把国际化的配置传递进`codemirror`，于是提了个[`pr`](https://github.com/surmon-china/vue-codemirror/pull/166)，一下就通过了。`vue-codemirror`的[作者](https://github.com/surmon-china)也算开源社区的牛人了，感兴趣的可以关注一下。

## Usage

做的也是十分简单的封装。说实话如果真有这种组件需求的业务，可能需要很多高度自定义的东西，so，这个组件只是个例子，完全可以在此基础上进行修改。

目前只添加了`javascript`的 language 支持，同时添加了一个自动补全的示例，这些具体都需要到`codeMirror`的官网文档进行查看。

```vue
<template>
  <w-code-mirror v-model:value="code"></w-code-mirror>
</template>
```

## Props

| 名称        | 类型    | 默认值 | 说明     |
| ----------- | ------- | ------ | -------- |
| value       | string  | -      | 双向绑定 |
| disabled    | boolean | false  | 禁用     |
| height      | string  | -      | 高度     |
| placeholder | string  | -      | 占位     |
| autofocus   | boolean | false  | 自动聚焦 |

## Type

## Form Usage

## TODO

- 通用：支持 cdn 用法，为那些需要减小打包体积的开发者
