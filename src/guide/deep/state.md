# 状态管理

项目目前采用的是 [pinia]，即新版的 vuex5。

## 进化史

项目从一开始到现在，经历了几次大的状态管理的变动。

- 第一阶段：[provide/inject](https://vuejs.org/guide/components/provide-inject.html#provide-inject)

最开始是使用的 vue 的 provide/inject API 实现了贯穿整个应用的状态管理。直接用 toRefs 和 reactive 在 ts 文件中声明需要的全局状态，定义好类型，通过泛型可以获得很好的智能提示。在 vue 组件内和 ts 文件中都可以使用，心智负担很小，变更也很灵活。缺点就是没有状态的追踪和定位，无法得知都在哪里变动了这些状态。

- 第二阶段：[vueuse] 的 [createGlobalState] 函数

在项目开发和优化的过程中，发现了[vueuse]这个很棒的包。类似于 react hooks，提供了很多开箱即用且比较常用的一些函数。在查阅文档时我就发现了[createGlobalState]这个函数，里面是利用了 effectScope API 实现的。有很好的 ts 支持，且在和持久化部分的结合更加方便，我就直接废弃了贯穿应用的 provide/inject，迁移到了[createGlobalState]这个函数。使用起来十分方便，也是在 vue 和 ts 中都可以直接使用。缺点还是如上，没有状态的追踪和定位。

- 第三阶段：[pinia]

在反复的思考后，还是采用了[pinia]方案。原因也很简单，为了更好的管理和追踪状态，同时随着项目一些边角功能变多，状态也是越来越多，[pinia]可以更好的分模块管理状态，就和原来的 vuex 一样。说实话使用起来和以上两种方案区别不大，无非就是个选择的问题。当然我也有一部分原因是想为项目融入 vue3 生态中一些主流的方案。

::: info 关于以上三种方案
在个人项目或者小项目中，以上三种方案都是很不错的选择。不是说 [pinia] 就一定是最好的方案，只不过本项目因为全局状态的数量有些多，为了方便管理，就采用了 [pinia]。如果有时间以上三种方案都可以尝试采用，同时别忘了尝试 ts 的支持，开发体验会很好。
:::

## 状态模块

本项目把状态分割得比较细致，目前是两个大方向，十二个状态模块。

:::info 关于使用
[pinia] 默认是可以直接在 vue 组件中使用的，但是在组件外使用需要把全局的 store 对象当参数传递进`defineStore`的 返回函数中。为了使用方便，即一个函数都可在 vue 和 ts 中使用，每个状态模块的最后简单封装了个函数：在有实例时（即`getCurrentInstance()`有值时），采用`defineStore`的返回函数；没有实例时采用 store 传递进函数的方法。
:::

## app-adapter

应用屏幕适配器，暴露两个状态

- `device`

:::info
底层是通过[vueuse]的[useBreakpoints](https://vueuse.org/core/usebreakpoints/)函数和[vueuse]内置的 [tailwindcss v2](https://tailwindcss.com/docs/breakpoints) 的断点。函数也支持自定义断点值，十分灵活。
:::

当前设备类型，即屏幕断点。值分别为 `mobile`（小于 640px）、`tablet`（640px 到 1024px）、`laptop`（1024px 到 1280px） 和 `desktop`（大于 1280px）。

- `isMobile`

方便一些地方的判断，就是一个 getter 判断 `device` 的值是否为 `mobile`

## app-dark

应用颜色方案，暴露两个状态

- `darkMode`

:::info
底层是通过[vueuse]的[usePreferredColorScheme](https://vueuse.org/core/usepreferredcolorscheme/)函数来判断用户偏好。
:::

当前主题模式类型。值分别为`light`、`dark` 和 `system`。

- `isDark`

方便一个地方的判断，就是一个 getter 判断 `darkMode` 的值是否为 `dark`

## app-key

应用密钥状态，暴露两个状态

:::info 关于密钥
第三方的密钥需谨慎管理，不要轻易上传到 github 或 gitee 这种公开代码托管平台。直接放在前台的配置中也有风险，所以项目最后是把密钥统一加密从后台接口取回，到前端再解密使用。
:::

- `baiduAK`

百度地图所需要的 AK，需要在百度开发者平台申请使用，需谨慎保管 AK。本项目是从接口取回 AK，且传输时进行了加密处理。

- `aliOSS`

阿里 OSS 直传时在前端初始化 OSS 实例所需要的配置，是一个 object。同上，config 从后台取回，且传输时进行了加密处理。

## app-locale

应用国际化状态，就暴露一个状态

- `locale`

当前语言环境，目前支持`en-US`和`zh-CN`。如若要做扩展需要语言管理的配合。

## app-lock

应用锁屏状态，暴露两个状态

- `lockMode`

锁屏模式，值分别为 `auto` 和 `manual`。

- `isLock`

## app-menu

## app-msg

## app-setting

## app-tab

## user-auth

## user-permission

## user-profile

<!-- links -->

[pinia]: https://pinia.vuejs.org/
[vueuse]: https://vueuse.org/
[createglobalstate]: https://vueuse.org/shared/createglobalstate/
