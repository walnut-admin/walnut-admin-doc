# 路由

## 介绍

路由是根据 menu 生成数据，此处涉及到 vue-router 动态路由部分的相关知识。思路简单来说，就是通过 menu 构建 routes，最后通过[addRoute](https://next.router.vuejs.org/api/#addroute)添加到 router 实例中。

:::tip
说实话，本人对 router 的文档阅读还比较少，接触最多的 api 也就是 push/replace/beforeEach 等等。有时间需要仔细的好好的阅读一下 router 的文档，能学习到很多东西，为设计提供更多广角的思路。
:::

:::warning

- 多层嵌套的 keep-alive 部分还有问题

:::

### ts 类型

具体查看[types/vue-router.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/vue-router.d.ts)。

```ts
// 对应menu的一些字段，查看menu即可
interface RouteMeta {
  title?: string;
  icon?: string;
  cache?: boolean;
  affix?: boolean;
  url?: string;
  type?: ValueOfMenuTypeConst;
  component?: string;
}
```

## 相关函数

具体查看[src/core/route](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/src/core/route.ts)。

### buildCommonRoute

- 通过 menu 数组构建 vue-router 的标准结构

- 具体介绍

```ts
const buildCommonRoute = (node: AppMenu): AppTab => {
  return {
    path: node.path!,
    name: node.name!,
    // 下面的meta就对应自定义的RouteMeta字段
    // 实际上tab的结构和route一样，不过为了区分模块，会重命名一个AppTab出来
    meta: {
      title: node.title,
      icon: node.icon,
      cache: node.cache,
      url: node.url,
      affix: node.affix,
      type: node.type,
      component: node.component,
    },
  };
};
```

### resolveParentComponent

- 根据 name 生成对应目录的 component

- 具体介绍

```ts
const resolveParentComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...ParentComponent,
      name,
    });
  });
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
    });
  });
```

### resolveViewModules

- 根据菜单中的 component 字段和 vite 的 [import.meta.glob](https://cn.vitejs.dev/guide/features.html#glob-import) 的特性，生成对应的 vue 文件的 component

- 具体介绍

```ts
// 获取views文件夹下的所有vue文件模块
// 后续或许需要要加上tsx，ts，js，jsx的glob支持
const allViewModules = import.meta.glob("../views/**/*.vue");

const resolveViewModules = (component: string) => {
  const keys = Object.keys(allViewModules);

  // 根据component查找索引
  const index = keys.findIndex(
    (i) => i.replace("../views/", "").replace(".vue", "") === component
  );

  return allViewModules[keys[index]];
};
```

### buildKeepAliveRouteNameList

- 根据 menu 树结构数据去构建 keep-alive 的 name 数组

- 具体介绍

:::warning

- [嵌套路由的 keep-alive 的问题](https://github.com/vuejs/vue-router-next/issues/626)一直没解决，项目暂时不建议开启 keep-alive

- 嵌套路由的缓存同时需要父节点的 name 存在于数组中才会生效，这个问题我也是近期才发现的，记不太清 v2 的 router 是不是也有这个问题。

:::

```ts
const buildKeepAliveRouteNameList = (
  menus: AppMenu[],
  payload: AppMenu[]
): string[] => {
  const res: string[] = [];

  menus.map((i) => {
    if (i.cache) {
      // 利用一个findPath函数，在菜单树中查出路径，把name遍历出来，最后返回时去重即可
      const path = findPath<AppMenu>(payload, (n) => n._id === i._id);

      res.push(...(path as AppMenu[]).map((i) => i.name!));
    }
  });

  return [...new Set(res)];
};
```

### buildRoutes

- 核心函数，根据菜单数组构建路由表，通过 formatTree 函数构建

- 具体介绍

```ts
const buildRoutes = (payload: AppMenu[]) => {
  const routes = formatTree(payload, {
    format: (node: AppMenu): RouteRecordRaw | undefined => {
      // 处理目录菜单
      if (node.type === MenuTypeConst.CATALOG) {
        return {
          ...buildCommonRoute(node),
          component: resolveParentComponent(node.name!),
        };
      }

      // 处理正常菜单
      if (node.type === MenuTypeConst.MENU) {
        // 处理内链
        if (node.ternal === "internal") {
          return {
            ...buildCommonRoute(node),
            component: resolveIFrameComponent(node.name!),
          };
        }

        // ...
        // 外链的不需要处理
        // 只需要在layout的aside里的menu-click事件里做逻辑处理即可
        // ...

        // 最普通的页面
        return {
          ...buildCommonRoute(node),
          component: resolveViewModules(node.component),
        };
      }
    },
  });

  // 最后把404推进去
  routes.push(App404Route);

  return routes;
};
```
