# <WPageTitle></WPageTitle>

## 一、UI库的选择
项目早期使用[Element Plus]，后因[Vue3] 作者尤雨溪（Evan You）推荐，切换为[Naive UI]。选择原因是[Naive UI]的设计理念前卫，符合现代组件库设计，相比[Element Plus]更贴合项目需求。

## 二、Naive UI的使用细节
### 1. 基础特性
- **自动引入**：借助[unplugin-vue-components]插件，原生组件（如`n-input`、`n-button`等）可直接在template中使用，无需手动引入；
- **TS支持**：使用组件时（如`n-input`、`n-button`），TypeScript可提供props自动提示（control+空格触发）。

### 2. 根节点结构与全局配置
项目根节点（`src/App`下）以`UI Provider`为核心，基于[Vue3]的`provide/inject`机制实现全局上下文，提供组件库的全局配置，包含以下关键部分：
- **核心provider**：`Config Provider`及一系列子provider，用于全局注入组件库配置；
- **功能支持**：处理亮色/暗色主题切换、国际化（locale）配置，以及为`n-code`组件提供 [highlight.js] 等。

### 3. 层级结构及作用
- **第一层**：`UI Provider`及下属的全局提示类provider（`loading bar provider`、`dialog provider`、`notification provider`、`message provider`等）；
- **第二层**：`Theme Provider`，通过[n-element]用于让Naive UI的CSS变量（如`primary color`、`secondary color`）在全局生效，配合[unocss]可通过预设class使用主题样式；
- **第三层**：`Message provider`，通过Naive UI的`useLoadingBar`、`useMessage`等hooks，将实例挂载到window，实现全局直接唤起。

[Element Plus]: https://element-plus.org/
[Naive UI]: https://www.naiveui.com/
[Vue]: https://vuejs.org/
[highlight.js]: https://highlightjs.org/
[unocss]: https://github.com/unocss/unocss
[unplugin-vue-components]: https://github.com/unplugin/unplugin-vue-components
[n-element]: https://www.naiveui.com/zh-CN/os-theme/components/element
