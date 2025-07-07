# 简介

## 介绍

[Walnut Admin][walnut-admin-client] 是一个基于 [Vue3.0][vue3]、[Vite][vite]、 [Naive UI][naiveui]、[TypeScript][ts]、[Nest.js][nestjs] 的前后端分离的全栈解决方案，目标是为开发中大型项目提供开箱即用的解决方案。项目的重点是前端，所以本文档的重点也是偏向前端。其中前端包括二次封装组件、utils、hooks、动态菜单、权限校验、按钮级别权限控制等功能。项目会使用前端较新的技术栈，可以作为项目的启动模版，以帮助你快速搭建企业级中后台产品原型。也可以作为一个示例，用于学习 `vue3`、`vite`、`ts` 等主流技术。该项目会持续跟进最新技术，并将其应用在项目中。

## 文档

- 中文文档地址为 [wadlnut-admin-doc][doc]，采用 [vitepress][vitepress] 开发。如发现文档有误，欢迎提 pr 帮助我们改进。
- 英文文档暂时写，中文文档完成度暂时也很低。

## 所需知识

本项目需要一定前端基础知识，请确保掌握 Vue 的基础知识，以便能处理一些常见的问题。
建议在开发前先学一下以下内容，提前了解和学习这些知识，会对项目理解非常有帮助:

::: info 提示
以下部分文档没有国内加速，需自行挂梯子访问。
:::

前端知识：

- [Vue3][vue3]
- [Vite][vite]
- [TypeScript][ts]
- [Vue-router][vue-router]
- [Vue-i18n][vue-i18n]
- [Naive UI][naiveui]
- [Vueuse][vueuse]
- [Unocss][unocss]
- [Iconify][iconify]

后端知识：

- [TypeScript][ts]
- [Nest.js][nestjs]
- [mongodb]
- [Redis]

## 代码

- [walnut-admin-client][walnut-admin-client]

项目前端地址，也是 walnut-admin 的开源部分。

- [walnut-admin-server][walnut-admin-server]

项目后端地址，walnut-admin的私有仓库。

## vite 插件推荐

项目使用了数个[antfu][antfu]参与开发的各类 vite 插件，不用不知道，是真的很爽！

- [unplugin-auto-import][unplugin-auto-import] - 自动引入，再也不用 import 这儿 import 那儿啦！后续可能还会支持类型的自动引入（那就更爽了）。
- [unplugin-vue-components][unplugin-vue-components] - 组件的自动引入，同时支持类型优化，用过的都较好！
- [unplugin-icons][unplugin-icons] - 项目暂时还没引用，不过我也是用的 iconify 做的图标集，后续可能迁移。
- [vite-plugin-windicss][vite-plugin-windicss] - 再也不用写 css/scss/sass 啦！功能十分强大！
- [rollup-plugin-visualizer][rollup-plugin-visualizer] - rollup 的打包大小可视化插件，打完包哪里大一目了然！
- [vite-plugin-compression][vite-plugin-compression] - 打包压缩插件
- [vite-plugin-html][vite-plugin-html] - html 插件，主要用于生成 title

## 浏览器支持

**本地开发**推荐使用`Chrome 最新版`浏览器，**不支持**`Chrome 80`以下版本。

**生产环境**支持现代浏览器，不支持 IE。

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge                                                                                                                                                                                                            | last 2 versions                                                                                                                                                                                                   | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                               | last 2 versions                                                                                                                                                                                                                     | last 2 versions                                                                                                                                                                                           |

## 如何加入我们

- <a href="https://discord.gg/kfVuasVXs2" target='_blank'>discord 讨论</a>

- [Walnut Admin][walnut-admin-client] 还在持续更新中，本项目欢迎您的参与，共同维护，逐步完善，将项目做得更强。同时整个项目本着一切免费的原则，原则上不会收取任何费用及版权，可以放心使用。
- 如果你想加入我们，可以多提供一些好的建议或者提交 pr，我们会根据你的活跃度邀请你加入。

<!-- links -->

[author]: https://github.com/Zhaocl1997
[walnut-admin-client]: https://github.com/walnut-admin/walnut-admin-client
[walnut-admin-server]: https://github.com/walnut-admin/walnut-admin-server
[doc]: https://www.baidu.com
[antfu]: https://github.com/antfu
[vue3]: https://v3.cn.vuejs.org/
[vite]: https://cn.vitejs.dev/
[naiveui]: https://www.naiveui.com/zh-CN/dark
[mongodb]: https://www.mongodb.com/
[Redis]: https://redis.io/
[ts]: https://www.typescriptlang.org/
[vitepress]: https://vitepress.vuejs.org/
[vue-router]: https://next.router.vuejs.org/
[nestjs]: https://nestjs.com/
[vueuse]: https://vueuse.org/
[windicss]: https://windicss.org/
[unocss]: https://github.com/unocss/unocss
[iconify]: https://iconify.design/
[vue-i18n]: https://vue-i18n.intlify.dev/
[unplugin-auto-import]: https://github.com/antfu/unplugin-auto-import
[unplugin-vue-components]: https://github.com/antfu/unplugin-vue-components
[unplugin-icons]: https://github.com/antfu/unplugin-icons
[vite-plugin-windicss]: https://github.com/windicss/vite-plugin-windicss
[rollup-plugin-visualizer]: https://github.com/btd/rollup-plugin-visualizer
[vite-plugin-html]: https://github.com/anncwb/vite-plugin-html
[vite-plugin-compression]: https://github.com/anncwb/vite-plugin-compression
