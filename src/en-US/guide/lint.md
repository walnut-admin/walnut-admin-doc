# 项目规范

## 介绍

::: tip 使用 lint 的好处

具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段。

遵循相应的代码规范有以下好处

- 较少 bug 错误率
- 高效的开发效率
- 更高的可读性

:::

项目内集成了以下几种代码校验方式

1. [eslint] 用于校验代码格式规范
2. [commitlint] 用于校验 git 提交信息规范
3. [stylelint] 用于校验 css/less 规范
4. [prettier] 代码格式化

::: warning
lint 不是必须的，但是很有必要，一个项目做大了以后或者参与人员过多后，就会出现各种风格迥异的代码，对后续的维护造成了一定的麻烦
:::

:::info
[eslint] 功能很强大，完全可以替代 [prettier]。但项目既然已经集成了 [prettier]，就不再剔除了。如果要开新项目的同学可以直接用 [eslint]。
:::

## ESLint

### 配置项

项目的 eslint 配置位于 config 文件夹下的 [eslint](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/config/eslint) 内，其中包括配置和忽略文件。可以根据团队自行修改代码规范。

### vscode 配合

推荐安装 vscode 的 eslint 插件，因为在`.vscode/settings.json`中默认配置了自定义好的 eslint 相关配置文件。开发体验会更加舒适。

### 相关插件

项目是 vue 项目，所以添加了[eslint-plugin-vue]。

因为因为项目使用了 ts，所以添加了两个插件[@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)和[@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint/tree/main/packages/parser)。

### 手动校验

执行`npm run lint:eslint`，然后查看控制台即可。

### 规则

如果有想要禁用的规则，只需要在 rules 下添加一条对应的规则名，然后值设置为 0 或 1 即可。

:::tip

- "off" 或 0 - 禁用规则
- "warn" 或 1 - 只是个警告，不会阻塞进程
- "error" 或 2 - 错误，会阻塞进程

:::

- 示例：

```json
{
  // 禁用不能使用any
  "@typescript-eslint/no-explicit-any": 0,
  // 禁用不能有未使用的变量
  "@typescript-eslint/no-unused-vars": 0
}
```

项目配置了多条规则，都是和 ts 相关的。具体查看[.eslintrc.js]。

:::tip

- 所有的 eslint 规则请查看[rules](https://eslint.org/docs/rules/)。
- 所有的 eslint-vue 规则请查看[rules-vue](https://eslint.vuejs.org/rules/)。
- 所有的 eslint-ts 规则请查看[rules-ts](https://typescript-eslint.io/rules/)。

:::

### 如何关闭

:::warning
强烈不推荐关闭 eslint 的校验
:::

在[config/lintstaged/.lintstagedrc.js][.lintstagedrc.js]中删除所有`npm run lint:eslint`即可。

## CommitLint

在一个团队中，每个人的 git 的 commit 信息都不一样，五花八门，没有一个机制很难保证规范化，如何才能规范化呢？可能你想到的是 git 的 hook 机制，去写 shell 脚本去实现。这当然可以，其实 JavaScript 有一个很好的工具可以实现这个模板，它就是 commitlint（用于校验 git 提交信息规范）。

### 配置项

项目的 commitlint 配置位于 config 文件夹下的 [commitlint](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/config/commitlint) 内，其中只包括了配置文件。

### 提交信息规范

- 参考[angular](https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-changelog-angular)的主流规范

  - `feat` 新功能
  - `fix` 修复 bug
  - `docs` 文档变更
  - `style` 样式变更
  - `refactor` 既不是修复 bug，也不是新功能，字面可以理解为重构
  - `perf` 性能优化
  - `chore` 依赖更新/脚手架配置修改等
  - `revert` 撤销修改
  - `wip` 开发中
  - `build` 构建相关
  - `types` 类型修改

### 示例

```bash
git commit -m 'feat(home): add home page'
```

### 规则

项目配置了一些 commitlint 的规则，具体查看[.commitlintrc.js]。

:::tip
所有的 commitlint 规则请查看[rules](https://commitlint.js.org/#/reference-rules)。
:::

### 如何关闭

在[config/husky/commit-msg](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/husky/commit-msg)中注释掉下面一行即可

```bash
# npx --no-install commitlint --config config/commitlint/.commitlintrc.js --verbose --edit $1
```

### 自定义 commit 格式

为了高度自定义 commit 的格式，项目采用了[cz-customizable]来实现。[cz-customizable]的配置文件请查看[.cz-config.js]。

- 示例

```json
{
  // 提交字数不超过100
  "subjectLimit": 100,

  // 提交的scope，即指`feat(button)`这样信息的括号中的内容，下面四个是项目默认提供的scope
  "scopes": [
    { "name": "dependencies" },
    { "name": "config" },
    { "name": "component" },
    { "name": "doc" }
  ]
}
```

:::warning
因为采用了高度自定义的 commit 校验，所以如果想要新添加或删除 commit 的 header 信息的话，需要同时修改两个文件已保证不会出错：

- 一是先修改[.cz-config.js]中的 types，添加或删除对应的信息；

- 二是修改[.commitlintrc.js]中的 rules 的`type-enum`中的第三个参数，添加或删除对应的 header。

此举是为了保障 commitlint 和 cz-customizable 的配置相同。当然后续我可以把这块的配置提到同一个文件中，以便修改。可以算是个 TODO 吧。
:::

## StyleLint

StyleLint 用于校验项目内部 css 的风格，加上编辑器的自动修复，可以很好的统一项目内部 css 风格。虽然但是，项目集中使用了 windicss，真正需要做样式校验的地方已经不多了。但用的少不代表就不用校验了，这是前端项目工程化很关键的一步。

### 配置项

项目的 stylelint 配置位于 config 文件夹下的 [stylelint](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/config/stylelint) 内，其中只包括了配置文件。

### vscode 配合

推荐安装 vscode 的 stylelint 插件，因为在`.vscode/settings.json`中默认配置了自定义好的 stylelint 相关配置文件。开发体验会更加舒适。

### 手动校验

执行`npm run lint:stylelint`，然后查看控制台即可。

### 规则

项目配置了一些 stylelint 的规则，具体查看[.stylelintrc.js]。

:::tip
所有的 stylelint 规则请查看[rules](https://stylelint.io/user-guide/rules/list)。
:::

### 如何关闭

在[config/lintstaged/.lintstagedrc.js][.lintstagedrc.js]中删除所有`npm run lint:stylelint`即可。

## Prettier

### 配置项

项目的 prettier 配置位于 config 文件夹下的 [prettier](https://github.com/Zhaocl1997/walnut-admin-client/tree/naive-ui/config/prettier) 内，其中包括配置和忽略文件。

### vscode 配合

推荐安装 vscode 的 prettier 插件，因为在`.vscode/settings.json`中默认配置了自定义好的 prettier 相关配置文件。开发体验会更加舒适。

### 手动校验

执行`npm run lint:prettier`，然后查看控制台即可。

### 规则

项目配置了一些 prettier 的规则，具体查看[.prettierrc.js]。

:::tip
所有的 prettier 规则请查看[rules](https://prettier.io/docs/en/options.html)。
:::

### 如何关闭

在[config/lintstaged/.lintstagedrc.js][.lintstagedrc.js]中删除所有`npm run lint:prettier`即可。

## Git Hook

git hook 一般结合各种 lint，在 git 提交代码的时候进行代码风格校验，如果校验没通过，则不会进行提交。需要开发者自行修改后再次进行提交。

### husky

有一个问题就是校验会校验全部代码，但是我们只想校验我们自己提交的代码，这个时候就可以使用 husky。

最有效的解决方案就是将 Lint 校验放到本地，常见做法是使用 husky 或者 pre-commit 在本地提交之前先做一次 Lint 校验。

项目在 `config/husky` 内部定义了相应的 hooks。

### 如何关闭

```bash
# 删除husky依赖即可
npm uninstall huksy
```

### 如何跳过检查

```bash
# 加上 --no-verify即可跳过git hook校验（--no-verify 简写为 -n）
git commit -m "xxx" --no-verify
```

### lint-staged

项目的 lint-staged 配置文件位于[config/lintstaged/.lintstagedrc.js][.lintstagedrc.js]

```js
module.exports = {
  // 对指定格式文件 在提交的时候执行相应的修复命令
  '*.{js,jsx,ts,tsx}': ['npm run lint:eslint', 'npm run lint:prettier'],
  '*.vue': ['npm run lint:prettier'],
  '*.{css,scss,less,styl}': ['npm run lint:prettier', 'npm run lint:stylelint'],
}
```

<!-- link -->

[eslint]: https://eslint.org/
[commitlint]: https://commitlint.js.org/
[stylelint]: https://stylelint.io/
[prettier]: https://prettier.io/
[husky]: https://typicode.github.io/husky/#/
[lint-staged]: https://github.com/okonet/lint-staged
[cz-customizable]: https://github.com/leoforfree/cz-customizable
[eslint-plugin-vue]: https://eslint.vuejs.org/
[.cz-config.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/czcustomizable/.cz-config.js
[.eslintrc.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/eslint/.eslintrc.js
[.commitlintrc.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/commitlint/.commitlintrc.js
[.lintstagedrc.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/lintstaged/.lintstagedrc.js
[.stylelintrc.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/stylelint/.stylelintrc.js
[.prettierrc.js]: https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/config/prettier/.prettierrc.js
