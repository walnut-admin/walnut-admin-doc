# 开始

本篇章会帮助你从后台到前台启动项目。

## 环境准备

:::info
以下开发工具具体安装和验证的过程就省略了。有问题百度基本能解决。
:::

以下是必备软件

- 确保电脑中已有[git] 版本不要太老即可
- 确保电脑中已有[node] 版本推荐 `16.x` 及以上
- 确保电脑中已有[pnpm] 版本推荐 `7.x`
- 确保电脑中已有[mongodb] 版本 `6.x` windows 用户推荐直接在远端的（腾讯阿里都行）linux 服务器上安装数据库
- 确保电脑中已有[VSCode] 其他编辑器也可以，这里只是推荐
- 确保电脑中已有[Redis] 版本 `6.x` 或者 `7.x`均可，同样windows 用户推荐直接在远端的linux服务器安装redis

以下推荐软件

- 推荐node版本管理工具[nvm]
- 推荐数据库可视化软件[studio3t]
- 推荐接口调试软件[postman]
- 推荐 SSH 软件[xshell]

## VSCode 插件

以下是推荐 VSCode 插件

- [chinese] - 如果有需要的话
- [gitlens] - git辅助插件
- [todo tree] - 管理项目中的TODO
- [volar] - vue3 + ts 必备插件
- [Iconify IntelliSense] - Icon 实时显示
- [UnoCSS IntelliSense] - windicss 的智能提示
- [I18n-ally] - 国际化实时显示。
- [ESLint] - 脚本代码检查
- [Stylelint] - css 格式化
- [DotENV] - .env 文件 高亮
- [auto-close-tag] - 标签自动闭合
- [auto-complete-tag] - 标签自动补全
- [auto-rename-tag] - 标签自动重命名

## 代码获取

::: warning 注意
注意存放代码的目录及所有父级目录应该只有英文，且不要出现空格或者奇怪的符号。
:::

```bash
# clone 前端代码
git clone https://github.com/Zhaocl1997/walnut-admin-client

```

## 安装

### 安装依赖

::: tip 安装依赖时 husky 安装失败

请查看你的源码是否从 github 直接下载的，直接下载是没有 `.git` 文件夹的，而 `husky` 需要依赖 `git` 才能安装。此时需使用 `git init` 初始化项目，再尝试重新安装即可。

:::

<!-- links -->

[node]: http://nodejs.org/
[pnpm]: https://pnpm.io/
[git]: https://git-scm.com/
[pnpm]: https://pnpm.io/zh/
[vscode]: https://code.visualstudio.com/
[nvm]: https://github.com/nvm-sh/nvm
[mongodb]: https://www.mongodb.com/
[vscode]: https://code.visualstudio.com/
[Redis]: https://redis.io/
[studio3t]: https://studio3t.com/
[postman]: https://www.postman.com/
[xshell]: https://www.netsarang.com/en/xshell/
[volar]: https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar
[chinese]: https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-zh-hans
[gitlens]: https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens
[todo tree]: https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree
[Iconify IntelliSense]: https://marketplace.visualstudio.com/items?itemName=antfu.iconify
[Unocss Intellisense]: https://marketplace.visualstudio.com/items?itemName=antfu.unocss
[i18n-ally]: https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally
[eslint]: https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint
[prettier]: https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode
[stylelint]: https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint
[dotenv]: https://marketplace.visualstudio.com/items?itemName=mikestead.dotenv
[auto-close-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag
[auto-complete-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-complete-tag
[auto-rename-tag]: https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag
