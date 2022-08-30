# 开始

本篇章会帮助你从头启动项目

## 前言

::: tip 关于组件
项目虽然二次封装了一些组件，但是可能不能满足大部分的要求。所以，如果组件不满足你的要求，完全可以不用甚至删除代码自己写，不必坚持使用项目自带的组件。
:::

## 环境准备

本地环境需要安装[Node.js][node] 和 [Git][git]，npm 是 node 的配套，一般无需特意安装。

::: warning 注意

- [Node.js][node] 版本推荐 `16.x` 及以上。
  :::

## 工具配置

IDE 强烈推荐[vscode][vscode]，可以安装以下工具来大幅提高开发效率。

**推荐等级 A**

- [volar][volar] - vue3 + ts 必备插件

**推荐等级 B**

- [Iconify IntelliSense][iconify intellisense] - Icon 实时显示
- [UnoCSS IntelliSense][unocss intellisense] - windicss 的智能提示
- [I18n-ally][i18n-ally] - 国际化实时显示。

**推荐等级 C**

- [ESLint][eslint] - 脚本代码检查
- [Prettier][prettier] - 代码格式化
- [Stylelint][stylelint] - css 格式化
- [DotENV][dotenv] - .env 文件 高亮

**推荐等级 D**

- [auto-close-tag][auto-close-tag]
- [auto-complete-tag][auto-complete-tag]
- [auto-rename-tag][auto-rename-tag]

## 代码获取

::: warning 注意

注意存放代码的目录及所有父级目录不能存在中文、韩文、日文以及空格，否则安装依赖后启动会出错。

:::

```bash
# clone 代码
git clone https://github.com/Zhaocl1997/walnut-admin-client

```

## 安装

### 安装 Node.js

如果您电脑未安装[Node.js][node]，请安装它。

**验证**

```bash
# 出现相应npm版本即可
npm -v
# 出现相应node版本即可
node -v

```

如果你需要同时存在多个 node 版本，可以使用 [Nvm][nvm] 或者其他工具进行 Node.js 进行版本管理。

### 安装依赖

项目采用了[pnpm][pnpm]，所以第一步就是安装[pnpm][pnpm]

```bash
# 全局安装pnpm
npm i -g pnpm
```

在项目根目录下，打开命令窗口执行，耐心等待安装完成即可

```bash
# 安装依赖
pnpm i
```

::: tip 安装依赖时 husky 安装失败

请查看你的源码是否从 github 直接下载的，直接下载是没有 `.git` 文件夹的，而 `husky` 需要依赖 `git` 才能安装。此时需使用 `git init` 初始化项目，再尝试重新安装即可。

:::

## npm 脚本

```json
{
  // npm run dev 的 pre 钩子，用于生成项目的绝对路径，来实现选项卡devtools的在vscode中打开的功能
  "predev": "esno build/utils/genProjectPath.ts",
  // 开发环境
  "dev": "vite",
  // 提交代码时使用，因为项目配置了husky和commit-lint，所以说如果随意填写提交信息的话代码是替补上去的
  "commit": "git-cz",
  // npm install 的 pre 钩子，如果不是ci环境，安装husky
  "postinstall": "is-ci || husky install config/husky",
  // npm run build 的 pre 钩子，分别是清空dist（这步vite也会做，这里做不做都行）、清空vite的缓存、备份icon、全局扫描icon、打包icon
  "prebuild": "npm run clean:dist && npm run clean:cache && npm run icon:copy && npm run icon:list && npm run icon:bundle",
  // 生产环境
  "build": "vite build",
  // 预生产环境
  "build:stage": "esno build/stage.ts",
  // 还原icon
  "postbuild": "npm run icon:recovery",
  // 查看build产物是否正常可用
  "serve": "vite preview",
  // release新版本
  "release": "standard-version && git push --follow-tags origin naive-ui",
  // TODO 部署到服务器上
  "publish": "",
  // 生成变更日志
  "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
  // 通过husky会执行在暂存提交的代码里，其中包括eslint、prettier和stylelint
  "lint:staged": "lint-staged --config config/lintstaged/.lintstagedrc.js",
  // eslint
  "lint:eslint": "eslint --config config/eslint/.eslintrc.js --ignore-pattern config/eslint/.eslintignore --fix",
  // stylelint
  "lint:stylelint": "stylelint --config config/stylelint/.stylelintrc.js --fix",
  // prettier
  "lint:prettier": "prettier --config config/prettier/.prettierrc.js --write",
  // 通过vue-tsc进行的类型检查
  "types:check": "vue-tsc --noEmit",
  // 同上，只不过会把输出写道文件中方便查看
  "types:check:log": "esno build/types.ts",
  // 清空vite缓存
  "clean:cache": "rimraf node_modules/.vite",
  // 移除node_modules
  "clean:lib": "rimraf node_modules",
  // 移除dist
  "clean:dist": "rimraf dist",
  // 备份icon
  "icon:copy": "esno build/icon/index.ts --copy",
  // 全局扫描icon并写入文件
  "icon:list": "esno build/icon/list.ts",
  // 打包icon
  "icon:bundle": "esno build/icon/bundle.ts",
  // 还原icon
  "icon:recovery": "esno build/icon/index.ts --recovery",
  // 更新依赖检查（不会直接更新，只是列出哪些依赖有新版本。更新是个人选择问题）
  "update": "npm-check-updates"
}
```

## 目录说明

```bash
.
├─.vscode # vscode相关配置
├─build # 打包相关脚本
│  ├─icon # icon相关
│  ├─utils # 打包时的相关路径
│  └─vite # vite相关插件和代理配置
├─config # 开发时的相关工具配置
│  ├─commitlint # 校验commit信息格式
│  ├─czcustomizable # 自定义commit信息格式
│  ├─eslint
│  ├─husky
│  ├─lintstaged
│  ├─prettier
│  └─stylelint
├─env # 环境变量
├─public # 静态文件，例如图片和字体
├─report # 日志输出或报告等，暂时包括stats.html（打包大小可视化）、stage.log（阶段性打包日志输出）、tsc.log（ts类型检查日志输出）
├─src
│  ├─api # api存放处
│  ├─App # 应用全局配置，其中包括naiveui的provider、国际化和路由的setup以及全局错误捕获的setup
│  ├─assets
│  │  └─styles # 样式存放，因为用了windicss，项目中需要手写的class没有多少了，最主要的就是自定义的transition相关css
│  │      ├─abstracts
│  │      ├─base
│  │      ├─components
│  │      ├─layout
│  │      └─pages
│  ├─components # 组件
│  │  ├─Advanced # 封装的更厉害的一些组件
│  │  │  └─CRUD # crud组件，一行生成一个最简单的crud页面
│  │  ├─App # App 级别的组件
│  │  │  ├─AppAuthorize # 授权组件
│  │  │  ├─AppDarkMode # 暗色模式
│  │  │  ├─AppFullScreen # 全屏
│  │  │  ├─AppLocalePicker # 国际化
│  │  │  ├─AppLock # 锁屏
│  │  │  ├─AppSearch # 搜索
│  │  │  └─AppSettings # 应用相关的配置
│  │  ├─Extra # 一些非UI类的，奇奇怪怪的边角组件
│  │  │  ├─Arrow # 箭头
│  │  │  ├─DemoCard # 演示卡片
│  │  │  ├─Flipper # 翻转卡片
│  │  │  ├─IconPicker # 图标选择器
│  │  │  ├─JSON # JSON 显示组件
│  │  │  ├─Message # 一个icon带个tooltip的消息提示组件，在form或table中均有用到，所以简单封装了一下
│  │  │  ├─Scrollbar # 滚动条，在n-scrollbar上的二次封装
│  │  │  ├─Title # 标题，可以带消息提示的那种
│  │  │  └─Transition # vue的过渡，简单封装
│  │  ├─HOC # 高阶组件，目前只有WithValue一个，用tsx写的
│  │  └─UI # UI类的组件，都是在naive上的二次封装
│  ├─const # 原本的enum，后来全都改用ts的as const语法了
│  ├─core # 核心逻辑，主要是路由、菜单和选项卡的相关逻辑
│  ├─hooks # hooks，后面会有章节详细介绍
│  │  ├─component
│  │  └─core
│  ├─layout # 布局
│  │  ├─default # 默认布局
│  │  │  ├─TheAside
│  │  │  ├─TheContent
│  │  │  ├─TheHeader
│  │  │  ├─TheRedirect
│  │  │  └─TheTab
│  │  └─iframe # iframe布局
│  ├─locales # 国际化
│  ├─router # 路由
│  │  └─guard
│  ├─store # 状态
│  │  ├─actions
│  │  └─types
│  ├─utils # 工具
│  │  ├─axios # 请求的二封
│  │  │  └─src
│  │  ├─constant # 一些全局能用到的常量
│  │  ├─crypto # 加密
│  │  ├─factory # 工厂函数
│  │  ├─memory # 缓存
│  │  └─persistent # 持久化
│  │      └─src
│  └─views
└─types # 在此文件夹下的类型src下都可以直接使用，无需引入
```

<!-- links -->

[node]: http://nodejs.org/
[git]: https://git-scm.com/
[pnpm]: https://pnpm.io/zh/
[vscode]: https://code.visualstudio.com/
[nvm]: https://github.com/nvm-sh/nvm
[volar]: https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
[iconify intellisense]: https://marketplace.visualstudio.com/items?itemName=antfu.iconify
[unocss intellisense]: https://marketplace.visualstudio.com/items?itemName=antfu.unocss
[i18n-ally]: https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally
[eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[stylelint]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
[dotenv]: https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv
[auto-close-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
[auto-complete-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag
[auto-rename-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
