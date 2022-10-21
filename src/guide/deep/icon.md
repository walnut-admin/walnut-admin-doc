# 图标

## 介绍

项目没有采用 naive-ui 的图标，而是采用了[iconify](https://iconify.design/)的 [vue3](https://docs.iconify.design/icon-components/vue/) 的组件方案。（在采用 unocss 的时候试过更换为 uno 的纯 class 图标，但是效果并不理想。所以还是坚持用了 iconify）

## 原因

采用 iconify 的原因很简单：图标选择很多很广且 api 功能强大。配套的`@iconify/json-tools`、`@iconify/utils`和`@iconify/tools`提供的 api 都足以支撑图标功能的开发。且官网文档很详细，配套打包的代码官网都有现成的，想要二次扩展也很容易。

## 用法

:::info
图标根据官网示例添加了加载的效果，暂时想的是后续也支持在线使用图标，加载的效果就必不可少，
:::

```vue
// 图标集 - 冒号前是图标集的名称，即前缀。冒号后是图标的名称。
<template>
  <w-icon icon="ant-design:home-outlined" />
</template>
```

## 图标集

同时在开发环境下会整体安装[@iconify/json](https://icon-sets.iconify.design/)，大约有 100 多 M。但实际项目中暂时只引用了`ant-design`、`mdi`、`simple-icons`和`carbon`四类图标集，合约 20000 多图标。如还需添加新的图标集，则在[collections.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/components/UI/Icon/src/utils/collections.ts)文件中引入并添加到此文件导出的数组中即可。

:::info
文件导出的数组最后一项就是用户自定义的 svg 图标，切勿轻易移除。
:::

## 图标选择器

图标选择器为项目二封的组件，一般来说只有在配置菜单时采用得到。设计思路也很简单，通过 collections 的图标集生成一个 icon 的 list 数组，同时也添加了模糊搜索和分页的功能。默认一页 55 个图标。同时用户添加的自定义图标也会出现在图标选择器中。（因为默认在上面讲的数组最后一项，所以一般添加的自定义图标都在最后一页）

## 自定义图标

项目的根目录下有个`.svg`的文件夹，这里是存放自定义图标的地方。（去阿里的 iconfont 或其他地方下载的 svg 图标可以直接扔到此文件夹下）

:::warning
目前只支持以 svg 文件形式的自定义图标（复制粘贴 svg 很麻烦，能下载成文件就下载成 svg 文件吧）
:::

:::warning
同时`.svg`文件夹下也不支持嵌套文件夹形式的图标，暂时只能平级扔到`.svg`文件夹下
:::

:::info
svg 的文件名就是使用时的图标名，尽量不要用中文名的 svg 文件
:::

:::info
这个文件夹下的内容不回打包到最终产物中，所以可以尽情的添加 svg 文件
:::

### 添加完需要执行的命令

在`.svg`文件夹下添加完 svg 文件后，需要再起一个终端窗口，执行`npm run gen:icon:svg`命令来生成符合`@iconify/json`格式的 json 文件。

```bash
npm run gen:icon:svg
```

此命令执行[此文件](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/icon/generate/svg.ts)（此文件也是在官网的打包示例上二次改造的），通过 `iconify` 的一系列 api 把 svg 内容“清理”、“优化”。最后通过`fs`写到这个 [json](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/components/UI/Icon/src/utils/svg.json) 文件中。此命令执行完页面会热加载刷新（因为这个 json 文件也是项目中的一部分），然后在图标选择器的最后一页中就可以看到自定义图标了。

### 原理

原理很简单，就是把 svg 文件转化成 iconify 的规则 json 格式，然后就把这个 json 文件对待为一个新的图标集。这样处理的话后续的打包逻辑就可以服用了，无需再重新写一套自定义 svg 的打包逻辑。

### 用法

```vue
// 自定义图标 - `w-svg`是默认的自定义图标前缀，冒号后为svg的文件名称
<template>
  <w-icon icon="w-svg:svg-sample-1" />
</template>
```

## 打包

图标打包的逻辑，我处理的比较极端。同时也消耗了些精力才设计出现在这个打包模式。（好不好看你们个人，我感觉这个设计是有点蛇皮的操作）

### 原理

图标打包的原理，一切都是基于`iconify`的`addCollection`api。`iconify`的`vue3`图标只有在执行了这个 api 的情况下才会生效。所以只要在打包的时候只把用到的图标使用`addCollection`方法添加进去就 ok 了。

### 流程

- 执行`npm run build`会触发`prebuild`的 npm 钩子，会依次执行`npm run gen:icon:copy`、`npm run gen:icon:list`和`npm run gen:icon:bundle`，分别是

  - 复制`bundle.ts`和`list.ts`；
  - 通过`fasst-glob`扫描`src`下的所有`vue,ts,tsx`文件，通过`iconLists`来通量匹配符合的图标并把内容写到`list.ts`中，用作图标选择器的使用；
  - 通过上一步生成的`list.ts`文件中的数组和`iconify`提供好的 bundle 逻辑打包生成`list.ts`文件中匹配到的图标，并最后写入到`bundle.ts`中，即调用`addCollection`的地方来实现用多少图标打包多少图标。

- 执行打包流程

- 触发`postbuild`的 npm 钩子，执行`npm run gen:icon:recovery`来恢复`bundle.ts`和`list.ts`两个文件。

至此图标打包流程完成，控制台做了一些输出处理，可以看到图标打包执行到哪一步了。完成执行`npm run preview`打开图标选择器可以看到只有项目中使用到的图标做了打包处理。

:::info
因为项目的菜单表中也有图标的使用，为了完全实现按需打包，在和`bundle.ts`同级中有个`menu.ts`文件存放着菜单表中使用到的图标，这里是调用后台接口返回的，直接复制粘贴相应内容即可。
:::

## 离线用法

离线用法即上述所说的方法，项目中用到多少图标都打包进项目中，不会产生额外的请求（iconify 的图标在没有识别到的情况下会做网络请求，然后把图标缓存到 `localStorage` 中）。适合在内网环境下的项目。当然也是推荐的打包方法。

## 在线用法(WIP)

- ~~所有 iconify 的图标都会走网络请求，图标在加载出来之前会有一小段留白，效果并不好~~

  ***

  现已添加了骨架框加载的效果，不会有不好的留白效果了

- ~~请求完的 iconify 图标默认会把 svg 内容存储到 `localStorage` 中，在图标量巨大的情况下这并不理想。且 `localStorage` 有 5m 的存储上限，这么搞维护性很差。~~

  ***

  iconify 提供了一个不把请求到的图标缓存到 storage 里的 api，这个也完全可以避免

- 综上，图标的在线用法，也会是一个不错的选择。只不过图标选择器的 list 需要研究研究怎么处理一下。
