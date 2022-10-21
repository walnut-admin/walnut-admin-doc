# 签名板

基于[signature_pad](https://github.com/szimek/signature_pad)的基础二次封装。用起来十分简单。

:::info
无需引入，可直接使用
:::

## Usage

做了一些比较有意思的封装，自定义添加画笔粗细、画笔颜色、撤回、清空、png 下载和 jpeg 下载。同时支持水印内容。

```vue
<template>
  <w-sign-pad ref="signPadRef" height="300px" width="800px"></w-sign-pad>
</template>

<script lang="ts" setup>
import type { WSignPadInst } from "@/components/Vendor/SignPad";

const signPadRef = ref<WSignPadInst>();
const image = ref();

const onGetSign = async () => {
  image.value = await signPadRef.value.getImage();
};
</script>
```

## Props

| 名称       | 类型    | 默认值 | 说明                                       |
| ---------- | ------- | ------ | ------------------------------------------ |
| options    | object  | -      | signature_pad 默认的配置项                 |
| disabled   | boolean | false  | 禁用                                       |
| height     | string  | 100%   | 高度                                       |
| width      | string  | 100%   | 宽度                                       |
| defaultUrl | string  | -      | 回显用的，图片地址（这种东西真的需要回显吗 |
| content    | string  | -      | 水印内容                                   |

## Type

```ts
import type { Options } from "signature_pad";

export interface WSignPadProps {
  options?: Options;
  height?: string;
  width?: string;
  disabled?: boolean;
  defaultUrl?: string;
  content?: string;
}

export interface WSignPadInst {
  save: (format?: string) => string;
  clear: () => void;
  isEmpty: () => boolean;
  undo: () => void;
  fromDataURL: (url: string) => void;
  getImage: (type?: string) => Promise<string>;
}
```

## TODO

- 水印：目前是在最外层始终都套了一个`n-watermark`实现的，同时带水印的保存是通过`html-to-image`实现的，负担有点大，需要优化
- 暗色模式：这种东西需要暗色模式支持吗？
- 通用：支持 cdn 用法，为那些需要减小打包体积的开发者
