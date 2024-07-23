# 配置

:::tip
下面的 [AppSettings]，有一部分是为开发者而设计的，有一部分也完全可以作为用户喜好配置，我没做具体区分，有需要的可以自行抽离状态和逻辑。
:::

- 应用的配置项，可以通过页面右下角的 [AppSettings] 组件实时改变查看效果。
- 同时提供了复制当前配置项的功能，只需要复制到[src/settings.json]中刷新页面即会生效。
- 目前这些配置项都是没有做持久化支持的，即修改完后刷新就会回到初始状态。
- 同时为了在[src/settings.json]中做更好的智能提示支持，项目采用了[typescript-json-schema]来通过定义好的 interface 生成`json.schema`到[.vscode/settings.json]中。这样可以直接在[src/settings.json]中获得很好的智能提示（在 IDE 是 VSCode 的情况下）。具体生成的相关逻辑可以查看[这里](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/build/generate/genJSONSchemas.ts)。

## 持久化

- 下面是项目中持久化部分的配置。

```js
const appStateStorage = {
  // 暗色模式、国际化和锁屏
  app: {
    isDark: false,
    darkMode: preferredColor.value,
    locale: preferredLanguages.value,
    isLock: false,
    lockMode: AppLockModeConst.AUTO,
  },

  // token
  token: '',

  // 记住密码，把账号密码存到local里了
  auth: {},
}
```

### 存储

在[useStorage][vueuse-usestorage]的基础上做了加密和超时的二次封装，在具体查看[src/utils/persistent/src/Storage](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/utils/persistent/src/Storage.ts)即可

### 加密

在 [crypto-js] 的基础上做了一下简单的二次封装，具体查看[src/utils/crypto](https://github.com/zhaocl1997/walnut-admin-client/blob/naive-ui/src/utils/crypto/crypto.ts)即可。

默认采用 aes 加密，mode 是 CBC，padding 是 Pkcs7（mode 和 padding 是什么，我也不清楚...，详细看 [crypto-js]的文档吧）。

## 国际化

### 介绍

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

:::info

国际化词条管理部分，后续还是要做词条分割管理，类似的把 form、table 相关的全都做适配和分割。

:::

本项目的国际化自定义了一套 key 的规则，下面具体讲一下。

### form 的相关规则

```js
`form:${表单的唯一标识，即key值}:${对应表单项的path}`
```

- 为了便于管理，项目封装好的 form 提供了一个`localeUniqueKey`的 prop 来统一填充国际化 key 的第二部分，同时自动获取 formProps 下的 path 字段填充到第三部分中。

- 同时为了更好的扩展一些边角化的信息，目前的想法有

  - `helpMsg` - 帮助信息，即 label 边会出现个小图标，鼠标移过会有 tooltip 提示的辅助信息
  - `PH` - placeholder 自定义占位信息（WIP）
  - `rule` - rule 自定义规则（WIP）

```ts
const [register] = useForm<SomeType>({
  // ...

  // 只需要提供下面的属性，schemas中的formProps里就不用写label字段了。
  // 同时在国际化管理菜单中，添加一条`form:user:userName`即可，在切换语言时会根据配置的不同语言的内容进而显示。
  localeUniqueKey: 'user',

  schemas: [
    {
      type: 'Base:Input',
      formProps: {
        path: 'userName',

        // 设置为true会显示提示小图标，同时需要在国际化管理菜单中添加一条`form:user:userName:helpMsg`的词条。
        labelHelpMessage: true,
      },
    },
  ],
})
```

### table 的相关规则

```js
`table:${表格的唯一标识，即key值}:${对应column的title}`
```

- 规则基本同上，后续如果有边角化处理信息的话会来补充文档的。

## 主题色

### 介绍

- 主题色的配置，主要是根据 naive-ui 提供好的 interface 来做的扩展，完整的详细配置请查看[这里](https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme)。

- 在全局设置中提供了六种配色的选项，分别是 primary、info、success、warning、error（前面五种配色，暗色模式下比亮色模式下颜色稍微浅一点）、bodyColor（默认的空白区域背景颜色，亮暗模式下不同）、invertedColor（头部、左侧、尾部的反转颜色，只在亮色模式下且开启头部、左侧、尾部反转效果时有效果）。每一种颜色都提供了 9 种有浅有深的配色的选项，可以通过实时的效果选择最想要的配色。

- 默认配色是 naive-ui 的配色，同时也是 9 个颜色选项中的中间一项。如果想要改变基本配色，直接修改`settings/theme.ts`里的颜色即可。

- 这个后续会做一个保存的功能，目前是刷新效果就没了。还有一种想法是把这种配置与后台联动，成为真正的个性化设置。

### 类型

```ts
// 主要是把naive内置的几种主要配色选项挑了出来
interface AppThemeColors {
  primaryColor: string
  infoColor: string
  successColor: string
  warningColor: string
  errorColor: string
  bodyColor: string
  invertedColor: string
}
```

## 暗色模式

### 基本介绍

- 项目的暗色模式主要是两部分组成，一是 naiveui 自带的暗色模式，再一个是通过 [tailwindcss] 的 `darkMode: 'class'`实现的。

- naive-ui 具体查看[这里](https://www.naiveui.com/zh-CN/os-theme/docs/customize-theme)。

- tailwindcss 主要是配合 naive-ui 的风格，在[tailwind.config.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/tailwind.config.ts)里，是通过 extend 的方式添加自定义的 tailwind 的 class，值就是 naive-ui 在全局定义的 css 变量，例如`--primary-color`等。另外一种不采用 tailwind 的 extend 的方式，就是在 css 文件里写一些内置好的 class，然后在 main 挂载 css 即可（不推荐）。

- 默认跟随系统配色，提供暗色/亮色/跟随系统三种选项。

- 有持久化支持，刷新页面也会保留模式。

### 详细介绍

```ts
const useAppDarkMode = () => {
  const { app, settings } = useAppState()

  const isSystemDark = usePreferredDark()

  // setDark同时在html的class中添加light/dark来配合tailwindcss的暗色模式
  const setIsDark = (dark: boolean) => {
    const root = document.querySelector('html')

    if (dark) {
      settings.value.ForDevelopers.themes = Object.assign(
        settings.value.ForDevelopers.themes,
        defaultTheme.dark
      )

      root?.classList.add(DarkModeConst.DARK)
      root?.classList.remove(DarkModeConst.LIGHT)

      app.value.isDark = true
    }
    else {
      settings.value.ForDevelopers.themes = Object.assign(
        settings.value.ForDevelopers.themes,
        defaultTheme.light
      )

      root?.classList.add(DarkModeConst.LIGHT)
      root?.classList.remove(DarkModeConst.DARK)

      app.value.isDark = false
    }
  }

  // 监听模式，进而决定是否设置暗色模式
  watchEffect(() => {
    switch (app.value.darkMode) {
      case DarkModeConst.LIGHT:
        setIsDark(false)
        break

      case DarkModeConst.DARK:
        setIsDark(true)
        break

      case DarkModeConst.SYSTEM:
        setIsDark(unref(isSystemDark))
        break

      default:
        break
    }
  })
}
```

<!-- link -->

[crypto-js]: https://cryptojs.gitbook.io/docs/
[vueuse-usestorage]: https://vueuse.org/core/usestorage/
[src/settings.json]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/settings.json
[typescript-json-schema]: https://github.com/YousefED/typescript-json-schema
[.vscode/settings.json]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/.vscode/settings.json
[appsettings]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/components/App/AppSettings/index.vue
[tailwindcss]: https://tailwindcss.com/docs
