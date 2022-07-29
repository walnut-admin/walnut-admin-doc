# 状态管理

项目最终采用的是 [pinia]，即新版的 vuex5。

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

本项目把状态分割得比较细致，目前是两个大方向：一大方向是 app 相关的状态，另一个是和用户相关的状态。app 相关模块有 9 个，用户相关模块有 3 个。一共 12 个模块。

:::info 关于 pinia 的使用
[pinia] 默认是可以直接在 vue 组件中使用的，但是在组件外使用需要把全局的 store 对象当参数传递进`defineStore`的 返回函数中。为了使用方便，即一个函数都可在 vue 和 ts 中使用，每个状态模块的最后简单封装了个函数：在有实例时（即`getCurrentInstance()`有值时），采用`defineStore`的返回函数；没有实例时采用 store 传递进函数的方法。
:::

## app-adapter

应用屏幕适配器，暴露两个状态

<details>
<summary>state</summary>

- `device`

:::info
底层是通过[vueuse]的[useBreakpoints](https://vueuse.org/core/usebreakpoints/)函数和[vueuse]内置的 [tailwindcss v2](https://tailwindcss.com/docs/breakpoints) 的断点。函数也支持自定义断点值，十分灵活。
:::

当前设备类型，即屏幕断点。值分别为：

1. `mobile`（小于 640px）
2. `tablet`（640px 到 1024px）
3. `laptop`（1024px 到 1280px）
4. `desktop`（大于 1280px）

</details>

<details>
<summary>getters</summary>

- `isMobile` 方便一些地方的判断，通过 getter 判断 `device` 的值是否为 `mobile`

</details>

<details>
<summary>actions</summary>

</details>

## app-dark

应用颜色方案，暴露两个状态

<details>
<summary>state</summary>

- `darkMode`

:::info
底层是通过[vueuse]的[usePreferredColorScheme](https://vueuse.org/core/usepreferredcolorscheme/)函数来判断用户偏好。
:::

当前主题模式类型。值分别为：

1. `light`
2. `dark`
3. `system`。

- `isDark`

方便一些地方的判断，就是一个 getter 判断 `darkMode` 的值是否为 `dark`

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

</details>

## app-key

应用密钥状态，暴露两个状态

:::warning 关于密钥
第三方的密钥需谨慎管理，不要轻易上传到 github 或 gitee 这种公开代码托管平台。直接放在前台的配置中也有风险，所以项目最后是把密钥统一加密从后台接口取回，到前端再解密使用。
:::

<details>
<summary>state</summary>

- `baiduAK`

百度地图所需要的 AK，需要在百度开发者平台申请使用，需谨慎保管 AK。本项目是从接口取回 AK，且传输时进行了加密处理。

- `aliOSS`

阿里 OSS 直传时在前端初始化 OSS 实例所需要的配置，是一个 object。同上，config 从后台取回，且传输时进行了加密处理。

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

</details>

## app-locale

应用国际化状态，就暴露一个状态

<details>
<summary>state</summary>

- `locale`

当前语言环境，目前支持`en-US`和`zh-CN`。如若要做扩展需要语言管理的配合。

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

</details>

## app-lock

应用锁屏状态，暴露两个状态

<details>
<summary>state</summary>

- `lockMode` 锁屏模式，值分别为 `auto` 和 `manual`。

- `isLock` 判断当前是否为锁屏状态

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

</details>

## app-menu

菜单状态管理，具体查看[菜单](/guide/deep/menu)

## app-msg

用于配合 naive 的 notification 和 message provider 的 placement 属性。这是 naive 的设计模式，如果想要改变 notification 或 message 的弹出位置，需要在对应的 provider 上传递 placement 属性

<details>
<summary>state</summary>

- `notiPlacement`
- `msgPlacement`

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

</details>

## app-setting

:::info
多种类型的布局设计还没做，这里后续还会有变动
:::

针对开发者而设计的应用配置，默认是从 [src/settings.json] 中读取的配置。绝大多数配置项目通过 [AppSettings](/component/App/settings) 组件实现了响应式的改变，方便开发者看到预期效果。

<details>
<summary>state</summary>

- `settings` 是一个大对象，包含了各种配置项目

</details>

<details>
<summary>getters</summary>

- `getMenuCollapseMode` 获取当前的折叠模式

- `getShowMenuCollpase` 获取是否开启菜单的折叠效果

- `getShowMenuCollapseButton` 获取菜单的折叠按钮显隐

- `getShowMenuCollapseIcon` 获取菜单的折叠图标显隐

- `getShowMenuCollapseBuiltIn` 获取菜单的内置折叠方式显隐，这里包括`bar` 和 `arrow-circle`两种模式（这个是 layout 组件的 sider 提供的）

- `getShowAside` 获取侧边栏是否显示

- `getShowNormalAside` 获取非手机模式下侧边栏是是否显示

- `getContentWidth` 获取主体容器宽度

</details>

<details>
<summary>actions</summary>

</details>

## app-tab

选项卡状态管理，具体查看[选项卡](/guide/deep/tab)

## user-auth

用户的认证相关状态

<details>
<summary>state</summary>

:::info
下面三个状态都做了持久化处理
:::

- `access_token` 请求 token

- `refresh_token` 刷新 token

- `remember` 存储账号密码

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

- `clearTokens` 清空两个 token

- `GetNewATWithRT` 根据刷新 token 获取新的请求 token

- `SignInWithPassword` 最普通的用账号密码登录

- `Signout` 登出，可选择是否掉后台接口

</details>

## user-permission

权限处理模块

<details>
<summary>state</summary>

- `permissions` 权限字符串数组

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

- `createPermissions` 从 menu 数组中抽取权限字符串

- `clearPermissions` 清空权限数组，用于登出

</details>

## user-profile

一些用户基本信息的状态

<details>
<summary>state</summary>

- `profile` 当前登录用户个人信息，是个object

</details>

<details>
<summary>getters</summary>

- `getDisplayName` 获取右上角显示名称

- `getNameFirstLetter` 获取用户名称的第一个字符

- `getAvatar` 获取用户头像地址

</details>

<details>
<summary>actions</summary>

- `getProfile` 调用接口获取当前登陆用户个人信息

- `clearProfile` 清空个人信息

</details>

<!-- links -->

[pinia]: https://pinia.vuejs.org/
[vueuse]: https://vueuse.org/
[createglobalstate]: https://vueuse.org/shared/createglobalstate/
[src/settings.json]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/settings.json
