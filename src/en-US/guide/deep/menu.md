# 菜单

## 介绍

:::warning
菜单是项目的核心部分，后面介绍的路由和权限都是通过 menu 生成的，所以此章节一定要仔细阅读。
:::

:::tip
后续还会添加一些字段和功能，目前在脑海中的有：

- badge 即在左侧菜单名称后面显示类似 hot 或 new 的字眼

- params 和 query 获取都可以写一个死值塞到 meta 里

- transitionName 高度自定义菜单的切换动画

如果好的想法欢迎补充。

:::

## ts 类型

具体查看[types/app.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/app.d.ts)。

```ts
interface AppSystemMenu extends BaseAppModel {
  // 父节点ID
  pid?: string

  // 类型
  // 菜单/目录/元素
  // 元素必须指定下面的permission字段，通过AppAuthority的组件权限控制包裹的内容显隐
  type?: ValueOfMenuTypeConst

  // route-path
  path?: string

  // route-name
  name?: string

  // route-component
  component?: any

  // meta-标题
  title?: string

  // meta-图标
  icon?: string

  // meta-排序
  order?: number

  // meta-普通/内链/外链
  ternal?: ValueOfMenuTernalConst

  // meta-外链的地址
  url?: string

  // meta-是否显示在左侧菜单里
  // 用于有权限访问但不在左侧菜单中显示的页面
  show?: boolean

  // meta-是否keep-alive
  cache?: boolean

  // meta-是否固定在tab中
  affix?: boolean

  // meta-权限字段
  permission?: string

  // 状态
  // 即开关，false指菜单禁用了
  status?: boolean

  // 页面菜单激活name
  menuActiveName?: string

  // 是否和menuActiveName的菜单同tab
  menuActiveSameTab?: boolean

  // 还没设计的badge字段
  badge?: string
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

- `goIndex` 跳转首页

</details>

## 功能点

- 支持菜单、目录和元素级别的控制

- 支持海量自定义图标

- 支持排序

- 支持内链、外链的类型

- 支持控制菜单显隐

- 支持缓存菜单类型的页面

- 支持固定在 tab 中的菜单类型页面

- 支持元素级别的权限控制

- 支持菜单禁用

- 支持不显示在菜单中的页面出现菜单激活样式

- 支持不显示在菜单中的页面与上处绑定菜单同 tab 页面

- 支持自定义动画效果（TODO）

- 支持 badge 效果（TODO）

- 支持默认写死的 query 和 params（TODO）

## 相关函数

### AppCoreFn1

- app 核心函数，构建 route、menu、permission 等的关键操作

- 目前在两处用到，一是登陆成功后调用，二是路由守卫里调用

- 具体介绍

```ts
export async function AppCoreFn1() {
  const appMenu = useAppStoreMenu()
  const userPermission = useAppStoreUserPermission()

  const { addRoute, getRoutes } = AppRouter

  // 获取根路由
  const rootRoute
    = getRoutes()[getRoutes().findIndex(i => i.path === AppRootPath)]

  // 这里就是调接口取回当前用户的menu数组
  const res = await getPermissions()

  // 设置左侧菜单
  appMenu.setMenus(appMenu.createMenus(res)!)

  // 设置用户权限数组
  userPermission.setPermissions(userPermission.createPermissions(res))

  // 设置缓存页面的name集合
  appMenu.setKeepAliveRouteNames(appMenu.createKeepAliveRouteNames(res))

  // 设置首页路由的name
  appMenu.setIndexMenuName(appMenu.menus[0].name!)

  // 构建路由
  // 后面路由的章节会介绍这个函数
  const routes = buildRoutes(res)

  // 把构建好的路由挂载到根路由上
  routes.forEach((route) => {
    addRoute(AppRootName, route)
  })

  // 最后要设置根路由的重定向到首页
  rootRoute.redirect = {
    name: appMenu.indexMenuName,
  }
}
```
