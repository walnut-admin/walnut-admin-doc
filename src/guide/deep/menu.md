# 菜单

## 介绍

菜单是项目的核心部分，后面介绍的路由和权限都是通过 menu 生成的，所以此 part 一定要仔细阅读。

:::tip
后续还会添加一些字段和功能，目前在脑海中的有：

- badge 即在左侧菜单名称后面显示类似 hot 或 new 的字眼

- params 即为此路由添加 params，在路由守卫中通过逻辑添加跳转此路由时带上设计好的 params，类似于一个写死的参数，但是不会显示在地址栏中

- transitionName 或许可以高度自定义此页面的切换动画

如果好的想法欢迎补充。

:::

## ts 类型

具体查看[types/app.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/app.d.ts)。

```ts
interface AppMenu extends BaseAppModel {
  // 父节点ID
  pid?: string;

  // 类型
  // 菜单/目录/元素
  // 元素必须指定下面的permission字段，通过AppAuthority的组件权限控制包裹的内容显隐
  type?: ValueOfMenuTypeConst;

  // route-path
  path?: string;

  // route-name
  name?: string;

  // route-component
  component?: any;

  // meta-标题
  title?: string;

  // meta-图标
  icon?: string;

  // meta-排序
  order?: number;

  // meta-普通/内链/外链
  ternal?: ValueOfMenuTernalConst;

  // meta-外链的地址
  url?: string;

  // meta-是否显示在左侧菜单里
  // 用于有权限访问但不在左侧菜单中显示的页面
  show?: boolean;

  // meta-是否keep-alive
  cache?: boolean;

  // meta-是否固定在tab中
  affix?: boolean;

  // meta-权限字段
  permission?: string;

  // 状态
  // 即开关，false指菜单禁用了
  status?: boolean;

  // 页面菜单激活name
  menuActiveName?: string;

  // 是否和menuActiveName的菜单同tab
  menuActiveSameTab?: boolean;
}
```

## 状态

<details>
<summary>state</summary>

- `collapse` 菜单折叠状态

- `showAside` 用于适配手机环境

- `menus` 菜单数组，是树状结构数据

- `keepAliveRouteNames` 用于缓存页面，是 name 的一个集合

- `indexMenuName` 本项目不指定首页，会用构建出的菜单树的第一项的 name 作为首页跳转的 name，所以在给角色配置菜单时要注意第一项（即排序在第一位的）的菜单一定要是 type 为`menu`的，否则首页跳转会出现问题

</details>

<details>
<summary>getters</summary>

</details>

<details>
<summary>actions</summary>

- `createRouteByMenu` 根据 menu 对象构建 route 对象

- `createMenus` 根据 menu 数组构建 menu 树状结构

- `clearMenus` 初始化所有菜单的状态

- `createKeepAliveRouteNames` 生成缓存页面的 name 集合

</details>

## 功能点

## 相关函数

具体查看[src/core/menu](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/core/menu.ts)。

### buildMenus

- 通过 menu 数组构建左侧菜单

- 具体介绍

```ts
const buildMenus = (payload: AppMenu[]) => {
  // 过滤出目录和菜单且可以显示在左侧菜单中的部分
  const filtered = payload
    .filter((i) => i.type !== MenuTypeConst.ELEMENT)
    .filter((i) => i.show);

  // 过滤出固定在tab中的菜单，排序，并且unshift到tab数组中
  filtered
    .filter((i) => i.affix)
    .sort((a, b) => b.order! - a.order!)
    .map((i) => buildTabs(buildCommonRoute(i), "unshift"));

  // 通过arrToTree函数构建左侧菜单，id标识字段是_id
  const menuTree = arrToTree(filtered, { id: "_id" });

  // orderTree默认通过order排序，menu设计的排序字段也是order，所以不需要第二个参数
  // 因为是根据一个根节点生成的数组，所以要取数组第一项的children，就是我们想要的拿到的菜单
  const menus = orderTree(menuTree)[0].children;

  return menus;
};
```
