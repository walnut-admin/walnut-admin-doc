# 路由

## 介绍

路由是根据 menu 生成数据，此处涉及到 vue-router 动态路由部分的相关知识。

:::warning

- 多层嵌套的 keep-alive 部分还有问题

:::

### ts 类型

具体查看[types/app.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/vue-router.d.ts)。

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

:::warning

这个函数后续会进行修改，因为还有几个很严重的问题没解决

- 嵌套路由下的 keep-alive 因为这个 ParentComponent 的问题会失效，应该是设计上的错误，还需要仔细研究一下

- parentView 后续得删掉，这个是为了做 id 判断用来全屏使用的，全屏那里逻辑有点愚蠢，也需要大改

:::

- 具体介绍

```ts
const resolveParentComponent = (name: string) => () =>
  new Promise((resolve) => {
    resolve({
      ...ParentComponent,
      name,
      parentView: true,
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
const resolveViewModules = (component: string) => {
  // 获取views文件夹下的所有vue文件模块
  // 后续或许需要要加上tsx，ts，js，jsx的glob支持
  const allViewModules = import.meta.glob("../views/**/*.vue");

  const keys = Object.keys(allViewModules);

  // 根据component查找索引
  const index = keys.findIndex(
    (i) => i.replace("../views/", "").replace(".vue", "") === component
  );

  return allViewModules[keys[index]];
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
