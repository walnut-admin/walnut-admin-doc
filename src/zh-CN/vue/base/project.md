# <WPageTitle></WPageTitle>

## 一、配置方案的演变

### 1. 早期配置情况
- 采用 **[ESLint] + [Prettier] + [Husky] + [Lint staged] + Commit lint** 的组合方案。
- 存在问题：配置项繁多，导致整体流程复杂。
- 发现冗余：现代 [ESLint] 已内置诸多 [Prettier] 功能，无需单独安装；[Husky] 配置繁琐复杂，适合超大型多成员项目。

### 2. 现行简化方案（参考 <WBaseLink preset="antfu">antfu</WBaseLink> 大佬推荐）
- **核心工具精简**：仅保留 [ESLint]，弃用 [Husky]，改用更轻量化的 **[simple-git-hooks]**。
- 简化逻辑：原本通过 package.json 中 `pre-commit` 执行 [Lint staged]，再由 [Lint staged] 执行 `eslint --fix`。
- 暂缺配置：
  - 未使用 commit lint（因短期内项目由个人开发维护，后续若有社区参与，可能重新添加）。

## 二、当前 [ESLint] 配置文件详情
- 位置：项目根目录下的 <WFrontLink path="/eslint.config.mjs">`eslint.config.mjs`</WFrontLink>。
- 内容：
  - 包含一些对默认规则的 override（重写）。
  - 开启 <WBaseLink preset="unocss">unocss</WBaseLink> 的 [ESLint] 配置，涉及样式顺序等校验规则的设置。
- 优势：相比早期需安装一系列 [ESLint] 插件，采用 <WBaseLink preset="antfu">antfu</WBaseLink> 推荐的方案后，配置过程更简洁轻松。

[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[Husky]: https://typicode.github.io/husky/
[Lint staged]: https://github.com/okonet/lint-staged
[simple-git-hooks]: https://github.com/toplenboren/simple-git-hooks
