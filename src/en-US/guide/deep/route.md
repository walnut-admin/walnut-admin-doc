# 路由

## 介绍

路由是根据 menu 生成数据，此处涉及到 vue-router 动态路由部分的相关知识。思路简单来说，就是通过 menu 构建 routes，最后通过[addRoute](https://next.router.vuejs.org/api/#addroute)添加到 router 实例中。

:::tip
说实话，本人对 router 的文档阅读还比较少，接触最多的 api 也就是 push/replace/beforeEach 等等。有时间需要仔细的好好的阅读一下 router 的文档，能学习到很多东西，为设计提供更多广角的思路。
:::

:::warning
现在的版本为了解决嵌套路由缓存会导致 setup 执行多次的问题，暂时把路由拍扁成一级然后挂载到根路由下的
:::

## ts 类型

具体查看[types/vue-router.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/vue-router.d.ts)。

```ts
// 对应menu的一些字段，查看menu即可
interface RouteMeta {
  title?: string
  icon?: string
  cache?: boolean
  affix?: boolean
  url?: string
  type?: ValueOfAppConstMenuType
  component?: string
  badge?: string
  menuActiveName?: string
  menuActiveSameTab?: boolean
}
```

## 功能点

- 完全动态的路由，就只有几个写死的路由

- 目前前端写死的路由：登录、隐私协议、服务条款、根路由、重定向、锁屏、404 和 500 页面，其中锁屏页面也可以配置成动态的，然后配个权限控制锁屏功能的显隐是完全可行的

- loadingbar

- 路由守卫

## 相关函数

具体查看[src/core/route](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/core/route.ts)。

### resolveParentComponent

- 根据 name 生成对应目录的 component

- 具体介绍

```ts
const resolveParentComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...ParentComponent,
      name,
    })
  })
```

### resolveIFrameComponent

- 根据 name 生成对应 iframe 的 component

- 具体介绍

```ts
const resolveIFrameComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...IFrameComponent,
      name,
    })
  })
```

### resolveViewModules

- 根据菜单中的 component 字段和 vite 的 [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import) 的特性，生成对应的 vue 文件的 component

- 具体介绍

```ts
// 获取views文件夹下的所有vue文件模块
// 后续或许需要要加上tsx，ts，js，jsx的glob支持
const allViewModules = import.meta.glob('../views/**/*.vue')

const resolveViewModules = (component: string) => {
  const keys = Object.keys(allViewModules)

  // 根据component查找索引
  const index = keys.findIndex(
    i => i.replace('../views/', '').replace('.vue', '') === component
  )

  return allViewModules[keys[index]]
}
```

### buildRoutes

- 核心函数，根据菜单数组构建路由表，通过 formatTree 函数构建

- 具体介绍

```ts
const buildRoutes = (payload: AppMenu[]) => {
  const appMenu = useAppStoreMenu()

  // 过滤掉元素菜单
  const filtered = payload.filter(i => i.type !== AppConstMenuType.ELEMENT)

  // 通过_id构建树
  const menuTree = arrToTree(filtered, { id: '_id' })

  // children[0]是我们想要的树结构菜单
  const menus = orderTree(menuTree)[0].children

  const routes = formatTree<AppSystemMenu, RouteRecordRaw>(menus!, {
    format: (node) => {
      // 处理目录菜单
      if (node.type === AppConstMenuType.CATALOG) {
        return {
          ...appMenu.createRouteByMenu(node),
          component: resolveParentComponent(node.name!),
        }
      }

      // 处理普通菜单
      if (node.type === AppConstMenuType.MENU) {
        // 单独处理一些内链菜单
        if (node.ternal === AppConstMenuTernal.INTERNAL) {
          return {
            ...appMenu.createRouteByMenu(node),
            component: resolveIFrameComponent(node.name!, node.cache),
          }
        }

        // 普通的视图
        return {
          ...appMenu.createRouteByMenu(node),
          component: resolveViewModules(node.component),
        }
      }
    },
  })

  // 本来应该是直接推入404然后返回的
  // 但是为了让页面缓存功能好使，暂时写了个函数又拍扁了路由（就是拍成只有两级的，不是原来嵌套的模式）
  // routes.push(App404Route)
  // return routes

  // TODO 999
  const _tempRoutes = _tempFlatNestedRoutes(routes)
  _tempRoutes.push(App404Route)
  return _tempRoutes
}

// TODO 999
/**
 * @link https://github.com/vuejs/vue-router-next/issues/626
 */
const _tempFlatNestedRoutes = (routes: RouteRecordRaw[]) => {
  const ret: RouteRecordRaw[] = []

  const tree = cloneDeep(routes)

  formatTree(tree, {
    format: (node) => {
      // 这里利用findPath函数，即寻找树状结构的路径
      const paths = findPath(
        tree,
        n => n.name === node.name
      ) as RouteRecordRaw[]

      // 只有菜单类型的需要处理
      if (node.meta?.type === AppConstMenuType.MENU) {
        // paths是一个数组，长度大于1，就代表是嵌套结构了
        if (paths.length > 1) {
          // 利用reduce把嵌套路由，拼接成单层路由
          const newNode = paths.reduce(
            (prev, next) =>
              ({
                name: next.name,
                path: prev.path.startsWith('/')
                  ? `${prev.path}/${next.path}`
                  : `/${prev.path}/${next.path}`,
                meta: next.meta,
                component: next.component,
              } as RouteRecordRaw)
          )

          ret.push(newNode)
        }
        else if (!node.children) {
          // 没有children的时候，给path前添加一个斜线
          ret.push({ ...node, path: `/${node.path}` })
        }
      }
    },
  })

  return ret
}
```
