# 选项卡

## 介绍

:::tip
说实话，在写这个文档的时候，tab 相关的部分有了些不一样的想法。可能写文档也算一种复盘把，能重新捋一下当时的设计思路，并且从中发现一些设计可以优化甚至有问题的地方。
:::

tab 在中后台的模板，也算是一个比较重要的模块了。最初我使用 vue2 和 elementui 的时候，也自己实现过一套非常非常简单的 tab，没有右键菜单，没有排序，没有左右两侧功能按钮等等。后来工作中使用了若依的前后台分离的架子，开始初步了解了 tab 最基本的相关组件和逻辑。再后来接触了 vben，学习了不少 hook 设计思路上的知识。现在这个版本的 tab，可以算是一个最终版本的 beta 了。不仅涵盖了主流的 tab 功能，并且实现了横向滑轮滚动、滚动到最左/最右、当前选项卡定位、以及 devtools 的功能。我想后续如果再深入研究的话，可以实现更多有意思有实际用处的功能。

### ts 类型

具体查看[types/app.d.ts](https://github.com/Zhaocl1997/walnut-admin-client/blob/naive-ui/types/app.d.ts)。

```ts
// 和vue-router的基本结构一致，只不过没有了component字段
interface AppTab {
  name: string;
  path: string;
  // 下面和RouteMeta类型一致
  meta: {
    title?: string;
    icon?: string;
    cache?: boolean;
    affix?: boolean;
    url?: string;
    type?: ValueOfMenuTypeConst;
    component?: string;
  };
}
```

## 相关函数

### closeMultipleTabs

- 关闭多个选项卡，通用方法

- 具体介绍

```ts
// filter配合includes过滤掉不想要的选项卡，再重新赋值到tabs上
const closeMultipleTabs = (lists: string[]) => {
  tab.value.tabs = tab.value.tabs.filter((i) => !lists.includes(i.name));
};
```

### clearTabs

- 清空选项卡，用于登出

- 具体介绍

```ts
// 不仅要清空tabs，还要清空visitedTabs
const clearTabs = () => {
  tab.value.tabs.length = 0;
  tab.value.visitedTabs.clear();
};
```

### sortTabs

- 选项卡排序，即位置互换

- 具体介绍

```ts
// 通过新旧索引和splice实现最基本的元素位置互换
const sortTabs = (oldIndex: number, newIndex: number) => {
  const currentTab = tab.value.tabs[oldIndex];
  tab.value.tabs.splice(oldIndex, 1);
  tab.value.tabs.splice(newIndex, 0, currentTab);
};
```

### buildTabs

- 新建选项卡，在路由变化时通过 watchEffect 新建选项卡

- 具体介绍

```ts
// TODO 参数名写成paayload了
const buildTabs = (payload: AppTab, method: "push" | "unshift" = "push") => {
  // 重定向或404等类似的页面不需要添加到tab中
  if (nameBlackList.includes(payload.name)) return;

  // 查找索引
  const index = tab.value.tabs.findIndex((item) => item.name === payload.name);

  // 没找到
  if (index === -1) {
    const cached = tab.value.visitedTabs.get(SymbolKeyConst.TABS_KEY);

    // 在visitedTabs里寻找，如果没找到，才会push到tabs里
    // 此措施是为了防止相同页面多次访问，而导致的多次向tabs中添加出现的重复性错误
    if (!cached || (cached && !cached.includes(payload.name))) {
      tab.value.tabs[method](payload);
    }
  }

  // 每次调用新建选项卡的函数，都重新set visitedTabs
  tab.value.visitedTabs.set(
    SymbolKeyConst.TABS_KEY,
    tab.value.tabs.map((item) => item.name)
  );
};
```

### removeTabs

- 关闭选项卡，逻辑最复杂的函数，因为涉及到多种类型的关闭，即关闭左右和其他以及所有

- 具体介绍

```ts
// 四个入参
// name: 要关闭的tabName
// type: 关闭类型，即单个/左/右/其他/所有
// currentMouseTabName: 当前鼠标所在的tabName。仅用在单个关闭的逻辑里。
// currentRouteName: 当前所在页面的路由名称，用于关闭左右和其他的逻辑里。
const removeTabs = (
  name: string,
  type: ValueOfDeleteTabConst,
  currentMouseTabName: string,
  currentRouteName: string
) => {
  const index = tab.value.tabs.findIndex((item) => item.name === name);

  if (index === -1) return;

  switch (type) {
    case DeleteTabConst.TAB_SINGLE:
      {
        // 最简单的splice删除
        tab.value.tabs.splice(index, 1);

        // 如果关闭的是当前页面，即tabName和当前鼠标所在的tabName是相等的，需要做一些其他的逻辑处理
        // TODO 突然发现这里的currentMouseTabName参数多余了，貌似只要有currentRouteName就行了
        if (currentMouseTabName === name) {
          const next = tab.value.tabs[index];
          const previous = tab.value.tabs[index - 1];

          // 获取前一个和后一个选项卡，如果有next，就push到next，没有就push到previous
          useRouterPush({ name: next ? next.name : previous.name });
        }
      }
      break;

    case DeleteTabConst.TAB_LEFT:
      {
        const nameList: string[] = [];

        // 通过索引过滤出在左侧的并且没有affix的选项卡
        tab.value.tabs.map((item, i) => {
          if (i < index && !item.meta.affix) {
            nameList.push(item.name);
          }
        });

        // 这里如果左侧的nameList里有当前页面，需要push到当前事件触发的选项卡对应的页面
        if (nameList.includes(currentRouteName)) {
          useRouterPush({ name });
        }

        // 关闭多个选项卡
        closeMultipleTabs(nameList);
      }
      break;

    case DeleteTabConst.TAB_RIGHT:
      {
        // 逻辑与关闭左侧大致相同
        const nameList: string[] = [];

        tab.value.tabs.map((item, i) => {
          if (i > index && !item.meta.affix) {
            nameList.push(item.name);
          }
        });

        if (nameList.includes(currentRouteName)) {
          useRouterPush({ name });
        }

        closeMultipleTabs(nameList);
      }
      break;

    case DeleteTabConst.TAB_OTHER:
      {
        const nameList: string[] = [];

        tab.value.tabs.map((item) => {
          // 过滤出除了当前选项卡并且没有affix的tabs
          if (item.name !== name && !item.meta.affix) {
            nameList.push(item.name);
          }
        });

        // 如果当前选项卡与当前路由不匹配，需要push到当前的选项卡
        if (currentRouteName !== name) {
          useRouterPush({ name });
        }

        closeMultipleTabs(nameList);
      }
      break;

    case DeleteTabConst.TAB_ALL:
      {
        const nameList: string[] = [];

        tab.value.tabs.map((item) => {
          // 只要不是affix的，都关闭
          if (!item.meta.affix) {
            nameList.push(item.name);
          }
        });

        // push到indexMenuName即可
        useRouterPush({ name: menu.value.indexMenuName });

        closeMultipleTabs(nameList);
      }
      break;

    default:
      break;
  }
};
```
