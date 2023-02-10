# 选项卡

## 介绍

:::tip
说实话，在写这个文档的时候，tab 相关的部分有了些不一样的想法。可能写文档也算一种复盘把，能重新捋一下当时的设计思路，并且从中发现一些设计可以优化甚至有问题的地方。
:::

tab 在中后台的模板，算是一个比较重要的模块了。最初我使用 vue2 和 elementui 的时候，也自己实现过一套非常非常简单的 tab，没有右键菜单，没有排序，没有左右两侧功能按钮等等。后来工作中使用了若依的前后台分离的架子，开始初步了解了 tab 最基本的相关组件和逻辑。再后来接触了 vben，学习了不少 hook 设计思路上的知识。现在这个版本的 tab，可以算是一个最终版本了。不仅涵盖了主流的 tab 功能，并且实现了横向滑轮滚动、滚动到最左/最右、当前选项卡定位、以及 devtools 的功能。我想后续如果再深入研究的话，可以实现更多有意思有实际用处的功能。

本项目的选项卡是根据 name 字段作为一标识的。同时扩展了`排序`、`拖拽`、`固定`、`定位`、`左右滑动`、`丰富的右键菜单`、`不同风格的选项卡`、`持久化支持`和`开发者工具`。同时为了适应一些场景，还做了`同选项卡详细页`和`带参选项卡`两种扩展功能。后面会详细介绍。

## ts 类型

具体查看[types/app.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/app.d.ts)。

```ts
// 对应路由对象的meta字段
interface RouteMeta {
  title?: string
  icon?: string
  cache?: boolean
  affix?: boolean
  url?: string
  type?: ValueOfMenuTypeConst
  component?: string
  badge?: string
  menuActiveName?: string
  menuActiveSameTab?: boolean
}

// 和route对象结构基本一致，只不过少了例如 component 字段等
interface AppTab {
  name: string
  path: string
  meta: RouteMeta
  query?: Recordable
  params?: Recordable
}
```

## 状态

<details>
<summary>state</summary>

- `tabs` 选项卡数组

- `visitedTabs` 访问过的选项卡数组缓存，用于新建选项卡时的逻辑处理问题

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

- `setTab` 通过索引重新给指定选项卡赋值

- `setTabs` 重新赋值整个 tabs

- `setVisitedTabs` 设置访问过的 tabs

- `createTabByRoute` 根据 route 对象构建 tab 对象

- `createTabs` 新建 tab，即往 tabs 数组中 push 或 unshift 新的选项卡。函数为了适应[menuActiveName](/guide/deep/menu#menuActiveName)配置项，内部多了两段处理相应逻辑的代码。函数最后会调用`setVisitedTabs`来设置访问过的 tabs

- `deleteTabsByNameList` 根据 name 集合 filter 掉不想要的 tab

- `deleteTabs` 根据 name 删除选项卡，包含`删除自己`、`删除其他`、`删除所有`、`删除右边`和`删除左边`

- `clearTabs` 清空状态，一般用于退出登录

- `changeTabOrder` 根据新旧索引改变选项卡顺序

- `sortTabs` 根据是否固定排序，用于固定了某个选项卡后把其位置提到最前面

- `goTab` 点击 tab 时的跳转函数，可带 params 参数或者 query 参数

- `initAffixedTabs` 初始化需要固定的选项卡。用于在构建好`菜单`后把默认`affix`的选项卡`unshift`到 tabs 数组中

- `leaveRoomForTabs` 实际就是个函数，不涉及到状态处理。用于电脑端选项卡过多时的美观

</details>

## 功能点

- 高度可配置。默认高度 32px

- 图标可配置。默认不显示，默认当前激活页面会有一个前缀的球作为标识

- 辅助性按钮可配置。默认显示。其中包括滚动到最左/右、定位（在选项卡溢出时可以到看效果）和刷新当前页面

- 右键菜单可配置。默认显示右键菜单

  - 刷新
  - 全屏
  - 关闭
  - 关闭左侧
  - 关闭右侧
  - 关闭其他
  - 关闭所有
  - 固定
  - 快照
  - 新窗口打开

- 拖拽可配置。默认可拖拽

- 开发者工具可配置。默认开启且只在开发环境下生效。此功能是为开发者而设计，方便快速定位当前页面的 vue 文件。

> 详细说明：鼠标悬停在 tab 上 2 秒中，就会显示一个 popover，里面有选项卡（即路由）的相关信息，同时提供了点击底部按钮即可在**VSCode**中打开当前页面对应的 vue 文件。此功能主要是本人亲身经历，在一些后台管理的项目中，随着项目的迭代和功能的增加，页面会越来越多，有时想找到当前页面对应的 vue 文件都要消耗一些精力，而有了此功能，只需要鼠标移到 tab 上，点击底部按钮即可帮助开发者迅速的定位到当前 vue 文件。

- 风格可配置。目前有 card（默认）、flex、round 三种样式。还可扩展和完善。

- 持久化支持可配置。默认支持
