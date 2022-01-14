# 项目配置

## vscode 配置

### snippets

在 [.vscode](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/.vscode) 的文件夹下的 [vue.code-snippets](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/.vscode/vue.code-snippets) 中，我写好了几个常用的代码片段。

- vue3-comp
  最基本的组件文件格式，默认 inheritAttrs 为 false，同时带有 props 和 emits
- vue3-view
  上面的简化版本，script 只剩 component 和 setup，同时添加了 style 标签
- vue3-tsx
  没有 template，使用 tsx 开发
- vue3-setup
  setup 语法糖，有两个 script 标签

### volar

:::tip
在开始之前，请先仔细阅读[Use Take Over Mode instead of TS Plugin](https://github.com/johnsoncodehk/volar/discussions/471)。
:::

省流：使用 volar 的 take over 模式（下面就叫它接管模式了）而不是 [ts-plugin](https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-typescript-vue-plugin)。

简单来说，如果只是单纯使用 volar 而不使用接管模式的话，vscode 内置的 js/ts server 和 volar 会创建两个 service 实例。而且 ts-plugin 也会创建相应的实例，就结论来说就是会占用 CPU 资源。而使用接管模式只会有两个实例。

#### 开启接管模式的步骤

- 确保`Vue Language Features (volar)`在工作区中启用

- 在 vscode 中，`ctrl + shift + p`，输入`Extensions: Show Built-in Extensions`选中

- 拉到底，选中`TypeScript and JavaScript Language Features`，并禁用即可

## 环境变量配置

项目的环境变量配置位于[env]目录下的[.env]、[.env.development]、[.env.production]和[.env.staging]。其中[.env.staging]文件用途是模拟生产的阶段性打包，会借助一些 vite 插件和 rollup 插件处理一些相关打包逻辑。

更多相关环境变量的配置请查看[vite 关于 env 文档][vite-env]。

### .env

通用配置

```sh
# 网站标题
VITE_APP_TITLE = 'Walnut Admin'
```

### .env.development

开发环境配置

```sh
# 开发服务器的端口号
VITE_PORT = 3100

# 开发服务器的host
VITE_HOST = '192.168.1.111'

# 可以是任何的以 / 开头的字符串，目的就是为了在开发服务的配置里重写代理
VITE_PROXY_PREFIX = '/api'

# 真实的后台接口地址
VITE_API_TARGET = 'http://192.168.1.111:3000'

# 真实的后台接口地址的前缀，没有的话写空就行
VITE_API_PREFIX = '/dev-api/v1'

# 资源公共路径，需要以 / 开头和结尾
VITE_PUBLIC_PATH = '/'

# 加密的key
VITE_CRYRTO_KEY = 'crypto-key'

# 加密的iv
VITE_CRYRTO_IV = 'crypto-iv'

# axios请求超时时间，单位是秒，默认10秒
VITE_AXIOS_TIMEOUT = 10

# axios的缓存机制保留时间，单位是秒，默认5秒
VITE_AXIOS_CACHE_MAXAGE = 5

# local/session/cookie的默认缓存时间，单位是毫秒，默认7天
VITE_APP_CACHE_MAXAGE = 604800
```

### .env.production

生产环境配置

```sh
# 真实的后台接口地址
VITE_API_TARGET = 'http://47.102.43.200:8062'

# 真实的后台接口地址的前缀，没有的话写空就行
VITE_API_PREFIX = '/prod-api/v1'

# 资源公共路径，需要以 / 开头和结尾
VITE_PUBLIC_PATH = '/'

# 加密的key
VITE_CRYRTO_KEY = 'crypto-key'

# 加密的iv
VITE_CRYRTO_IV = 'crypto-iv'

# axios请求超时时间，单位是秒，默认10秒
VITE_AXIOS_TIMEOUT = 10

# axios的缓存机制保留时间，单位是秒，默认5秒
VITE_AXIOS_CACHE_MAXAGE = 5

# local/session/cookie的默认缓存时间，单位是毫秒，默认7天
VITE_APP_CACHE_MAXAGE = 604800
```

### .env.staging

预生产环境配置

```sh
# 修改node的环境变量
NODE_ENV=production

# 真实的后台接口地址
VITE_API_TARGET = 'http://192.168.1.222:3001'

# 真实的后台接口地址的前缀，没有的话写空就行
VITE_API_PREFIX = '/prod-api/v1'

# 资源公共路径，需要以 / 开头和结尾
VITE_PUBLIC_PATH = '/'

# 加密的key
VITE_CRYRTO_KEY = 'crypto-key'

# 加密的iv
VITE_CRYRTO_IV = 'crypto-iv'

# axios请求超时时间，单位是秒，默认10秒
VITE_AXIOS_TIMEOUT = 10

# axios的缓存机制保留时间，单位是秒，默认5秒
VITE_AXIOS_CACHE_MAXAGE = 5

# local/session/cookie的默认缓存时间，单位是毫秒，默认7天
VITE_APP_CACHE_MAXAGE = 604800
```

## 应用配置

### 具体说明

本项目并没有采用任何的状态管理库，而是采用了[vueuse]的[createGlobalState][vueuse-createglobalstate]函数。

::: info

- 最开始搭建这个架子的时候，采用也是 vuex。但后续观看 vue3 的文档发现了非常好用的 provide/inject，以及在 ts 的辅助下，context 的使用得十分顺手。

- 之后也看到了[pinia]这个包（已经是现在的 vuex5 了），但是并没有采用，因为在熟悉了 context 这个概念后，个人认为 vue3 的状态管理完全可以自己手撸。

- 在之后开始使用 [vueuse] 后，发现了[createGlobalState][vueuse-createglobalstate]函数，就果断采用了此种方案作为全局的状态管理。

- 最近又再考虑使用[pinia]了，为了 hmr，为了修改的统一管理和追踪管理，为了 devtool 的良好支持，后续应该还是要换成[pinia]的。

:::

本项目的全局状态分为两大类，一类是有 localeStorage 支持[useAppStateStorage][useappstatestorage]函数的和没有持久化支持的（即在内存中，刷新就会回到初始状态）[useAppStateMemory][useappstatememory]函数。

[useAppStateStorage][useappstatestorage]此函数的持久化也是在[vueuse]的[useStorage][vueuse-usestorage]基础上做的二次封装，主要就是添加了超时的逻辑和加密的逻辑。

::: info

- 一些其他的想法

- 想过把每一个属性都做成可配置的，一种是就在内存中，一种是本地持久化，还有一种就是需要后台接口配合的高度用户自定义配置，不过这想法确实有点离大谱了，想要真是实现的话，怕是要有一段过程。

:::

- 下面是非持久化部分的配置。

```js
const appStateMemory = {
  appMemo: {
    // 左侧菜单是否折叠
    collapse: false,

    // 设备类型
    // 具体查看 src/const/app.ts 里的 DevideConst
    device: "desktop",

    // 是否为手机，单独提出了是因为需要逻辑判断的地方不少
    isMobile: false,

    // 是否显示左侧菜单，用于手机情况下的逻辑判断，比下面的showMenu有更高优先级
    showAside: false,

    // 是否全屏
    isFullScreen: false,

    // 全屏的目标，这个需要改，逻辑有些愚蠢
    fullscreenTarget: "",
  },

  menu: {
    // 生成的左侧菜单
    menus: [],

    // keep-alive页面的name数组
    keepAliveRouteNames: [],

    // 登陆后跳转的菜单name，默认为menus数组中的第一项
    indexMenuName: "",

    // 权限数组，权限的关键
    permissions: [],
  },

  user: {
    // 一些用户信息，方便全局访问，例如用户名或者用户所属角色等等
    userInfo: {},
  },

  tab: {
    // tab选项卡
    tabs: [],

    // 访问过的tab，用于新建tab时的逻辑判断
    visitedTabs: new Map(),
  },

  settings: {
    // 为开发者提供的更为具体的全局配置
    ForDevelopers: {
      app: {
        // 是否显示左侧logo
        showLogo: true,

        // 是否显示左侧菜单
        showMenu: true,

        // 是否显示头部
        showHeader: true,

        // 是否显示tab选项卡
        showTabs: true,

        // 是否显示尾部
        showFooter: true,

        // 是否显示尾部
        fixLogo: true,

        // 是否固定头部
        fixHeader: true,

        // 是否显示切换页面时的动画
        showAnimation: true,

        // 切换页面时的动画类型
        animationName: "fade",

        // 是否通过keep-alive缓存页面
        keepAlive: true,
      },

      menu: {
        // 菜单是否显示折叠按钮
        showCollapse: true,

        // 菜单折叠的方式
        // 具体查看 src/const/app.ts 里的 MenuCollapseModeConst
        collapseMode: "bar",

        // 菜单没折叠时的宽度
        width: 240,

        // 菜单折叠时的宽度
        collapsedWidth: 64,

        // 菜单是否手风琴模式
        accordion: false,

        // 菜单折叠时图标大小
        collapsedIconSize: 24,

        // 菜单没折叠时图标大小
        iconSize: 26,

        // 菜单没折叠时的缩进
        indent: 16,

        // 菜单是否反转样式，naive-ui里layout-sider的自带api
        inverted: true,
      },

      header: {
        // 头部高度
        height: 48,

        // 头部是否显示面包屑
        showBreadcrumb: true,

        // 头部是否显示全屏
        showFullScreen: true,

        // 头部是否显示国际化配置
        showLocale: true,

        // 头部是否显示暗色模式配置
        showDarkMode: true,

        // 头部是否显示锁屏功能
        showLock: true,

        // 头部是否显示搜索功能
        showSearch: true,

        // 头部是否反转样式，naive-ui里layout-header的自带api
        inverted: true,
      },

      tab: {
        // 选项卡高度
        height: 32,

        // 选项卡是否显示图标
        showIcon: false,

        // 选项卡是否显示左右两边的工具图标
        showUtils: true,

        // 选项卡是否使用右键菜单
        contextMenu: true,

        // 选项卡是否可以排序
        sortable: false,

        // 选项卡样式风格
        // 具体查看 src/const/app.ts 里的 TabStyleModeConst
        styleMode: "card",

        // 选项卡是否开启开发者工具
        // 非开发环境不会显示此功能
        // 此功能是为了开发时快速寻找当前页面的vue文件而设计的
        // 通过一些奇淫技巧打开vscode并根据component字段打开对应的vue文件
        devtool: true,
      },

      breadcrumb: {
        // 面包屑是否显示图标
        showIcon: true,

        // 面包屑是否显示下拉框
        showDropdown: true,

        // 面包屑的分隔符
        separator: ">",
      },
    },

    // 为用户提供的一些接口，还没设计
    ForUsers: {},
  },
};
```

## 持久化配置

- 下面是持久化部分的配置。

```js
const appStateStorage = {
  // 暗色模式和国际化
  app: {
    isDark: false,
    darkMode: preferredColor.value,
    locale: preferredLanguages.value,
  },

  // token
  token: "",

  // 记住密码，把账号密码存到local里了
  auth: {},
};
```

### 加密配置

在 [crypto-js] 的基础上做了一下简单的二次封装，具体查看[src/utils/crypto](https://github.com/zhaocl1997/walnut-admin-client/blob/naive-ui/src/utils/crypto/crypto.ts)即可。

默认采用 aes 加密，mode 是 CBC，padding 是 Pkcs7（mode 和 padding 是什么，我也不清楚...，详细看 [crypto-js]的文档吧）

### 存储配置

在[useStorage][vueuse-usestorage]的基础上做了加密和超时的二次封装，在具体查看[src/utils/persistent/src/Storage](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/utils/persistent/src/Storage.ts)即可。

## 国际化配置

### 基本介绍

- naive-ui 的国际化详细查看[这里](https://www.naiveui.com/zh-CN/os-theme/docs/i18n)

- 项目一开始采用的是在前台 locale 文件夹中写死国际化信息，但后续发现随着项目文件变多，需要国际化的地方也越来越多，locale 下的信息越来越多。索性直接把国际化的部分移到了后台管理。具体查看[src/locales/backend](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/locales/backend.ts)即可。

- 坏处

  - 很难再和后台做脱离了
  - 系统管理里多了两个模块需要开发（语言管理和国际化词条管理）
  - 国际化词条数量多了后，或许需要做接口查询的词条分割
  - 需要很好的数据库设计，我现在的设计是一个词条一条数据，即例如登录字样，如果系统里有五种语言，那么登录这个词条就会在词条表里生成五条数据，对应语言表里的五种语言。在语言数量很多时查询的接口压力或许会很大（当然我这想的有点多了，一般不会有很多种的语言，除了像谷歌那种规模公司做的产品）。

- 好处

  - 再也不用在 locale 文件夹下找相应文件添加或修改国际化信息（而且是没有热加载的支持，需要手动刷新页面）
  - 可以通过一套自定义的规则管理所有的国际化词条（比如 form/table 等的国际化部分）
  - 页面可见的文字，且非入库的部分都可快速方便的添加和管理国际化词条
  - 方便后续的迭代开发和管理，以及分割词条的想法

### 详细介绍

本项目的国际化自定义了一套 key 的规则，下面具体讲一下。

#### form 的相关规则

```js
`form:${表单的唯一标识，即key值}:${对应表单项的path}`
```

- 为了便于管理，项目封装好的 form 提供了一个`localeUniqueKey`的 prop 来统一填充国际化 key 的第二部分，同时自动获取 formProps 下的 path 字段填充到第三部分中。

- 同时为了更好的扩展一些边角化的信息，目前的想法有

  - `helpMsg` - 帮助信息，即 label 边会出现个小图标，鼠标移过会有 tooltip 提示的辅助信息
  - `PH` - placeholder 自定义占位信息
  - `rule` - rule 自定义规则

暂时实现的只有`helpMsg`。

```ts
const [register] = useForm<SomeType>({
  // ...

  // 只需要提供下面的属性，schemas中的formProps里就不用写lable字段了。
  // 同时在国际化管理菜单中，添加一条`form:user:userName`即可，在切换语言时会根据配置的不同语言的内容进而显示。
  localeUniqueKey: "user",

  schemas: [
    {
      type: "Base:Input",
      formProps: {
        path: "userName",

        // 设置为true会显示提示小图标，同时需要在国际化管理菜单中添加一条`form:user:userName:helpMsg`的词条。
        labelHelpMessage: true,
      },
    },
  ],
});
```

#### table 的相关规则

```js
`table:${表格的唯一标识，即key值}:${对应column的title}`
```

- 规则基本同上，后续如果有边角化处理信息的话再加。

## 主题色配置

### 基本介绍

- 主题色的配置，主要是根据 naive-ui 提供好的 interface 来做的扩展，完整的详细配置请查看[这里](https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme)。

- 在全局设置中提供了四种主配色的选项（其实应该有五种，因为 primary 和 success 默认就是相同颜色），另外加一种暗色模式的主配色。每一种配色都提供了 9 种颜色逐渐变深的选项，可以通过实时的效果选择最想要的配色。

- 默认配色是 naive-ui 的配色，同时也是颜色选项中的默认第一项。如果想要改变基本配色，直接修改`settings/theme.ts`里的颜色即可。

- 这个后续会做一个保存的功能，目前是刷新效果就没了。还有一种想法是把这种配置与后台联动，成为真正的个性化设置。

### 详细介绍

```ts

```

## 暗色模式配置

### 基本介绍

- 项目的暗色模式主要是两部分组成，一是 naiveui 自带的暗色模式，再一个是通过 [tailwindcss] 的 `darkMode: 'class'`实现的。

- naive-ui 具体查看[这里](https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme)。

- tailwindcss 主要是配合 naive-ui 的风格，在[tailwind.config.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/tailwind.config.ts)里，是通过 extend 的方式添加自定义的 tailwind 的 class，值就是 naive-ui 在全局定义的 css 变量，例如`--primary-color`等。另外一种不采用 tailwind 的 extend 的方式，就是在 css 文件里写一些内置好的 class，然后在 main 挂载 css 即可。

- 默认跟随系统配色，提供暗色/亮色/跟随系统三种选项。

### 详细介绍

## 插件配置

### [auto-import](https://github.com/antfu/unplugin-auto-import)

- 基本介绍

  - 按需自动引入 api，很好的 vite/ts 支持

  - 具体查看[auto-import.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/auto-import.ts)

- 详细介绍

  - 基本的文件类型都做了支持，js/ts/jsx/tsx/vue/md

  - 开启了 dts，会自动生成 ts 文件，项目中只要是以上类型的文件中都可以直接使用。例如想要使用@vueuse/core 的 api 时，只需要输入 use，vscode 会自动识别并提供很好的提示

  - 默认预置了 vue/vue-router/vue-i18n/@vuseuse/core 的 api 自动引入

  - 同时添加了一系列的自定义 api 的支持，下面描述的 api 都可直接使用，无需引入

:::tip
下方以 `useApp` 或 `App` 为首出现的函数均是在原有的 **_api_** 上的二次封装，例如`useAppRouter`、`useAppI18n`等。主要目的就是为了统一一下函数入口，后续想做函数扩展方便进展。
:::

```json
// ...
{
  // 这些是原来的enum类型，换成as const语法后统一了命名并且修改文件夹名为const了
  "/@/const": [
    "DevideConst",
    "DarkModeConst",
    "LocaleConst",
    "MenuTypeConst",
    "MenuTernalConst",
    "PersistentKeysConst",
    "StorageTypeConst",
    "SymbolKeyConst",
    "TransitionNameConst",
    "DeleteTabConst",
    "MenuCollapseModeConst",
    "TabStyleModeConst"
  ],

  // 国际化的函数和实例，AppI18n的用处主要是在composition不支持的地方使用国际化函数
  "/@/locales": ["useAppI18n", "AppI18n"],

  // router相关的函数和实例
  "/@/router": ["AppRouter", "useAppRoute", "useAppRouter", "useRouterPush"],

  // 全局状态，任何地方都可以访问
  "/@/store": ["useAppState"],

  // vue3的provide和inject的二次封装，很好的ts支持，用于复杂组件的状态管理
  // 目前只有form/table/tab使用到了此函数
  "/@/hooks/core/useContext": ["useContext"],

  // 在useManualRefHistory上的二次封装，用于局部的状态管理，提供重置回初始状态的支持
  "/@/hooks/core/useState": ["useState"],

  // 在naive-ui的各种消息组件上的二次封装
  "/@/hooks/component/useMessage": [
    "useAppMessage",
    "useAppNotification",
    "useAppDialog",
    "useContinue",
    "useAppMsgSuccess",
    "useAppNotiError"
  ],

  // 封装的axios实例
  "/@/utils/axios": ["AppAxios"],

  // 封装的持久化实例
  "/@/utils/persistent": ["useAppStorage"],

  // form/table/CRUD组件的hook函数
  "/@/components/UI/Form": ["useForm"],
  "/@/components/UI/Table": ["useTable"],
  "/@/components/Advanced/CRUD": ["useCRUD"]
}
```

### [components](https://github.com/antfu/unplugin-vue-components)

- 基本介绍

  - 按需自动引入 vue 组件，很好的 vite/ts 支持

  - 具体查看[component.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/component.ts)

- 详细介绍

  - 基本的文件类型都做了支持，js/ts/jsx/tsx/vue/md

  - 默认目录就是 src 下的 components 文件夹

  - 开启了 dts，在 volar 的配合下有很好的 ts 支持

  - 默认 naive-ui 组件都可以直接在 vue 种使用，无需引入

  - 同时配置了很多自定义组件的引入

  ```js
  const comp = {
    // 究极封装CRUD组件，可直接使用
    Advanced: ["CRUD"],

    // app相关的组件，最常用的就是AppAuthorize
    App: [
      "AppDarkMode",
      "AppFullScreen",
      "AppLocalePicker",
      "AppLock",
      "AppSearch",
      "AppSettings",
      "AppAuthorize",
    ],

    // 一些其他类别的组件
    Extra: [
      "Arrow",
      "DemoCard",
      "Flipper",
      "IconPicker",
      "JSON",
      "Message",
      "Scrollbar",
      "Title",
      "Transition",
    ],

    // naive-ui上二次封装的组件
    UI: [
      "Button",
      "ButtonGroup",
      "Checkbox",
      "DatePicker",
      "Drawer",
      "DynamicTags",
      "Form",
      "Icon",
      "Input",
      "InputNumber",
      "Radio",
      "Select",
      "Switch",
      "Table",
      "TimePicker",
    ],
  };
  ```

### [windicss](https://github.com/windicss/vite-plugin-windicss)

- 基本介绍

  - vite 的 windicss 插件，速度有提升，hmr 支持很好，同时支持浏览器 devtools 开发

  - 具体查看[windicss.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/windicss.ts)

- 详细介绍

  - 后续再定是否换成 unocss，暂时还是 windicss

### [html](https://github.com/anncwb/vite-plugin-html)

- 基本介绍

  - ejs 支持

  - 具体查看[html.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/html.ts)

- 详细介绍

  - 暂时就是为了把 title 注入到 html 中

### [visualizer](https://github.com/btd/rollup-plugin-visualizer)

- 基本介绍

  - rollup 的打包可视化插件

  - 具体查看[visualizer.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/visualizer.ts)

- 详细介绍

```js
{
  filename: bundleSizeStatsLogPath, // 生成的可视化html文件存放路径
  title: `${title} Bundle Stats`, // 标题
  open: true, // 直接浏览器中打开
  template: 'sunburst', // 图标类型
  gzipSize: true, // gzip压缩后大小显示
  brotliSize: true, // brotli压缩后大小显示
}
```

### [legacy](https://github.com/vitejs/vite/tree/main/packages/plugin-legacy)

- 基本介绍

  - 官方插件，做兼容性的，为了支持那些不支持 esm 的浏览器

- 详细介绍

  - 暂无

### [compression](https://github.com/anncwb/vite-plugin-compression)

- 基本介绍

  - 压缩插件，打包时可以生成 gzip 或 brotli 的压缩文件

  - 具体查看[compression.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/compression.ts)

- 详细介绍

```json
{
  // brotli压缩，并且删除源文件
  "ext": ".br",
  "algorithm": "brotliCompress",
  "deleteOriginFile": true
}
```

<!-- links -->

[env]: https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/env
[.env]: https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/env/.env
[.env.development]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/env/.env.development
[.env.production]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/env/.env.production
[.env.staging]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/env/.env.staging
[vite-env]: https://cn.vitejs.dev/guide/env-and-mode.html#env-files
[vueuse]: https://vueuse.org/
[tailwindcss]: https://tailwindcss.com/docs
[pinia]: https://pinia.vuejs.org/
[vueuse-createglobalstate]: https://vueuse.org/shared/createglobalstate/
[vueuse-usestorage]: https://vueuse.org/core/usestorage/
[useappstatestorage]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/store/index.ts
[useappstatememory]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/store/index.ts
[crypto-js]: https://cryptojs.gitbook.io/docs/
