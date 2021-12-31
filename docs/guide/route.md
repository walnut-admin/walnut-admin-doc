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
