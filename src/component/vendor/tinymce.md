# 富文本编辑器

基于[tinymce](https://github.com/tinymce/tinymce)的基础二次封装。这款是一个功能比较强大的富文本，相对的打包体积也会更大一些。

:::info
无需引入，可直接使用
:::

## Usage

只做了最基本的封装，包括双向绑定、加载效果、懒加载、国际化、暗黑模式等。可自行优化调整封装组件以达到你想要的目的。

```vue
<template>
  <w-tinymce v-model:value="value"></w-tinymce>
</template>
```

## Props

| 名称     | 类型    | 默认值 | 说明                                       |
| -------- | ------- | ------ | ------------------------------------------ |
| value    | string  | -      | 双向绑定的值，只有在编辑器 blur 时才会触发 |
| disabled | boolean | false  | 禁用                                       |
| height   | string  | -      | 高度                                       |
| width    | string  | 100%   | 宽度                                       |

## Type

暂无

## Form Usage

富文本在表单中是经常使用的，所以封装进了[w-form](/component/UI/form)里。具体用法如下，很简单。

```ts
const formSchemas = [
  // ...
  {
    type: "Vendor:Tinymce",
    formProp: {
      label: "Tinymce",
      path: "formTinymce",
    },
  },
  // ...
];
```

## TODO

- 媒体：富文本内部的媒体上传，需要配合接口的那种
- 模板：富文本更好的模板实例，包括一些国际化等
- props: plugin/toolbar/menubar 或许也可以做成 prop，不过动态加载插件可能需要研究研究了
- 通用：支持 cdn 用法，为那些需要减小打包体积的开发者
