# 图片裁剪

采用的是[cropperjs](https://github.com/fengyuanchen/cropperjs/tree/v2)的 `v2` 版本，用法和 v1 区别还是挺大的。性能上感觉提升了不少。

:::info
无需引入，可直接使用
:::

## Usage

v-model 绑定了两个值：value 绑定的是通过 blob 把裁剪的部分临时生成的 blob url；src 绑定的就是原图片地址。内置了一系列方便裁剪的按钮，同时提供了裁剪部分图片下载的按钮。

```vue
<template>
  <w-cropper
    v-model:value="cropperValue"
    v-model:src="srcValue"
    alt="cropper-demo"
  ></w-cropper>
</template>
```

## Props

| 名称     | 类型    | 默认值 | 说明                             |
| -------- | ------- | ------ | -------------------------------- |
| src      | string  | -      | 原图片地址(双向绑定)             |
| alt      | string  | -      | 图片的 alt 属性                  |
| value    | string  | -      | 裁剪部分的临时图片地址(双向绑定) |
| disabled | boolean | false  | 禁用                             |
| center   | boolean | false  | 默认裁剪框居中                   |

## Type

```ts
interface InternalProps {
  src?: string;
  alt?: string;
  value?: string;
  disabled?: boolean;
  center?: boolean;
}

interface WCropperInst {
  // 获取裁剪部分的blob对象
  onGetCropperBlob: () => Promise<Blob>;
}
```

## TODO

- 圆形裁剪
- 功能按钮控制显隐
- 使用 naive 的 image 进行预览
- 通用：支持 cdn 用法，为那些需要减小打包体积的开发者
