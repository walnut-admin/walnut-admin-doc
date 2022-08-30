# 项目配置

## vscode

### snippets

在 [.vscode](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/.vscode) 的文件夹下的 [vue.code-snippets](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/.vscode/vue.code-snippets) 中，我写好了几个常用的代码片段。在工作区内可直接使用。

- `vue3-comp`
  适用于传统组件开发，默认 inheritAttrs 为 false，同时带有 props 和 emits
- `vue3-view`
  适用于普通的页面开发，上面的简化版本，script 只剩 component 和 setup，同时添加了 style 标签
- `vue3-tsx`
  适用于复杂逻辑页面/组件，没有 template，使用 tsx 开发
- `vue3-setup`
  适用于常见的组件开发，setup 语法糖，有两个 script 标签
- `w-form-basic`
  项目高度封装的 form 组件

### volar

:::tip
在开始之前，请先仔细阅读 [Use Take Over Mode instead of TS Plugin](https://github.com/johnsoncodehk/volar/discussions/471)。
:::

省流：使用 volar 的 take over 模式（下面就叫它接管模式了）而不是 [ts-plugin](https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-typescript-vue-plugin)。

简单来说，如果只是单纯使用 volar 而不使用接管模式的话，vscode 内置的 js/ts server 和 volar 会创建两个 service 实例。而且 ts-plugin 也会创建相应的实例，就结论来说就是会占用 CPU 资源。而使用接管模式只会有两个实例。

#### 开启接管模式的步骤

- 确保`Vue Language Features (volar)`在工作区中启用

- 在 vscode 中，`ctrl + shift + p`，输入`Extensions: Show Built-in Extensions`选中

- 拉到底，选中`TypeScript and JavaScript Language Features`，并禁用即可

## 环境变量

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
VITE_HOST = '127.0.0.1'

# 可以是任何的以 / 开头的字符串，目的就是为了在开发服务的配置里重写代理
VITE_PROXY_PREFIX = '/api'

# 真实的后台接口地址
VITE_API_TARGET = 'http://127.0.0.1:3000'

# 真实的后台接口地址的前缀，没有的话写空就行
VITE_API_PREFIX = '/dev-api/v1'

# 资源公共路径，需要以 / 开头和结尾
VITE_PUBLIC_PATH = '/'

# 持久化信息加密的key
VITE_PERSIST_CRYPTO_KEY = 'crypto-key'

# 持久化信息加密的iv
VITE_PERSIST_CRYPTO_IV = 'crypto-iv'

# 请求参数加密的key
VITE_REQUEST_CRYPTO_KEY = 'crypto-key'

# 请求参数加密的iv
VITE_REQUEST_CRYPTO_IV = 'crypto-iv'

# 响应数据加密的key
VITE_RESPONSE_CRYPTO_KEY = 'crypto-key'

# 响应数据加密的iv
VITE_RESPONSE_CRYPTO_IV = 'crypto-iv'

# axios请求超时时间，单位是秒，默认10秒
VITE_AXIOS_TIMEOUT_SECOND = 10

# axios的缓存机制保留时间，单位是秒，默认5秒
VITE_AXIOS_CACHE_MAXAGE = 5

# local/session/cookie的默认缓存时间，单位是毫秒，默认7天
VITE_APP_PERSIST_SECOND = 604800
```

### .env.production

:::warning
`staging` 的环境变量文件和 `production` 的一致
:::

生产环境配置

```sh
# ...
# 重复的就不再写一遍了

# 生产环境也可以通过nginx配置请求转发
VITE_PROXY_PREFIX = '/api'

# 优先级不如上面的，配置了上面的这个就会失效
VITE_API_TARGET = 'https://api.xxx.com'
```

<!-- ## 应用配置

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

- 下面是项目非持久化部分的配置。

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

        // 应用整体布局风格
        layout: AppLayoutModeConst.LEFT_MENU,

        // 是否开启鼠标离开页面就开启锁屏，默认false，主要用于一些安全性比较高的应用。
        pageLeaveLock: false,

        // user多久没有操作鼠标键盘（即不活跃状态）就开启锁屏，默认60秒
        // 此配置项不能动态设置且看到效果，所以AppSettings中是禁用的状态
        idleMS: 1000 * 60,
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
        // 通过url打开vscode并根据component字段打开对应的vue文件
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

    // 为用户提供的一些接口，暂无任何设计
    ForUsers: {},
  },
};
``` -->

## vite 插件

### [auto-import](https://github.com/antfu/unplugin-auto-import)

- 基本介绍

  - 按需自动引入 api，很好的 vite/ts 支持

  - 具体查看[auto-import.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/vite/plugin/auto-import.ts)

- 详细介绍

  - 基本的文件类型都做了支持，js/ts/jsx/tsx/vue/md

  - 开启了 dts，会自动生成 ts 文件，项目中只要是以上类型的文件中都可以直接使用。例如想要使用@vueuse/core 的 api 时，只需要输入 use，vscode 会自动识别并提供很好的提示

  - 默认预置了 `vue`/`vue-router`/`vue-i18n`/`@vuseuse/core` 的 api 自动引入

  - 同时添加了一系列的自定义 api 的支持，下面描述的 api 都可直接使用，无需引入

:::tip
下方以 `useApp` 或 `App` 为首出现的函数均是在原有的 **_api_** 上的二次封装，例如`useAppRouter`、`useAppI18n`等。主要目的就是为了统一一下函数入口，后续想做函数扩展方便进展。
:::

```json
// ...
// 以下目录内的所有内容都会自动引入，无需手动引入
{
  "dirs": [
    "src/const/**",
    "src/locales/**",
    "src/router",
    "src/store/modules/**",
    "src/hooks/**",
    "src/utils/**"
  ]
}
```

```json
// ...
// 下面是一些自定义的自动引入
{
  // form/table/CRUD组件的hook函数
  "/@/components/UI/Form": ["useForm"],
  "/@/components/UI/Table": ["useTable"],
  "/@/components/Advanced/CRUD": ["useCRUD"],

  // table preset columns
  "@/components/UI/Table/src/utils/presetColumns": [
    "WTablePresetOrderColumn",
    "WTablePresetStatusColumn",
    "WTablePresetCreatedAtColumn",
    "WTablePresetUpdatedAtColumn"
  ]
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
    Advanced: [
      "CRUD",
      "AIcon",
      "ApiSelect",
      "AreaCascader",
      "LocaleSelect",
      "RoleSelect",
    ],
    App: [
      "AppDarkMode",
      "AppFullScreen",
      "AppLocalePicker",
      "AppLock",
      "AppSearch",
      "AppSettings",
      "AppAuthorize",
    ],
    Extra: [
      "AbsImage",
      "Arrow",
      "DemoCard",
      "FlipClock",
      "Flipper",
      "IconPicker",
      "JSON",
      "Message",
      "QRCode",
      "Scrollbar",
      "Title",
      "Transition",
      "TransitionSelect",
      "Verify",
    ],
    UI: [
      "Button",
      "ButtonGroup",
      "Card",
      "Checkbox",
      "DatePicker",
      "Descriptions",
      "Drawer",
      "Dropdown",
      "DynamicTags",
      "Form",
      "Icon",
      "Input",
      "InputNumber",
      "Modal",
      "Radio",
      "Select",
      "Switch",
      "Table",
      "TimePicker",
      "Tree",
    ],
    Vendor: [
      "AvatarUpload",
      "CodeMirror",
      "Cropper",
      "Echarts",
      "LocationPicker",
      "OSSUpload",
      "SignPad",
      "Tinymce",
    ],
  };
  ```

### [UnoCSS](https://github.com/unocss/unocss)

- 基本介绍

  - antfu 的又一力作 插件，速度快，hmr 快，功能强大，没啥可说的了

- 详细介绍

  - 添加了`presetAttributify`预设，即支持`<div w:text-red-900></div>`这种属性的 css 类名写法

  - 添加了一个 `hstack` 和 `vstack`的快捷方式，这里可自行添加更多的 shortcuts

  ```json
  {
    "shortcuts": {
      "hstack": "flex flex-row flex-nowrap",
      "vstack": "flex flex-col flex-nowrap"
    }
  }
  ```

  - 为了配合 naive-ui 的使用，添加了颜色的扩展，使用方式为 `text-primary` 即 naive 的 primary 颜色

  ```json
  {
    "theme": {
      "colors": {
        // extend from naive-ui color
        "primary": "var(--primary-color)",
        "primaryHover": "var(--primary-color-hover)",

        "info": "var(--info-color)",
        "infoHover": "var(--info-color-hover)",

        "error": "var(--error-color)",
        "errorHover": "var(--error-color-hover)",

        "bodyColor": "var(--body-color)"
      }
    }
  }
  ```

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
  template: 'treemap', // 图标类型
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

  - 压缩插件，打包时可以生成 `gzip` 或 `brotli` 的压缩文件

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
