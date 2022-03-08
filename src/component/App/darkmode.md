# 暗色模式

两个图标的切换加一个 popselect，逻辑并没有写在组件中

:::info
无需引入，可直接使用
:::

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Usage

```vue
<template>
  <WAppDarkMode />
</template>
```

## Hook

:::info
下面的 hook 只在 app 初始化的时候执行了一次。
:::

逻辑也很简单：

- 从全局状态中取出 app 相关的部分

- 通过`usePreferredDark`的 vueuse 的函数获取系统偏好

- setIsDark 一是把 html 的 class 上加上`dark`（配合 windicss 的暗色模式部分），二是把全局的`isDark`设置为对应值

- 通过 watchEffect 监听并改变模式

```ts
export const useAppDarkMode = () => {
  const { app } = useAppState();

  const isSystemDark = usePreferredDark();

  const setIsDark = (dark: boolean) => {
    const root = document.querySelector("html");

    if (dark) {
      root?.classList.add(DarkModeConst.DARK);
      root?.classList.remove(DarkModeConst.LIGHT);

      app.value.isDark = true;
    } else {
      root?.classList.add(DarkModeConst.LIGHT);
      root?.classList.remove(DarkModeConst.DARK);

      app.value.isDark = false;
    }
  };

  watchEffect(() => {
    switch (app.value.darkMode) {
      case DarkModeConst.LIGHT:
        setIsDark(false);
        break;

      case DarkModeConst.DARK:
        setIsDark(true);
        break;

      case DarkModeConst.SYSTEM:
        setIsDark(unref(isSystemDark));
        break;

      default:
        break;
    }
  });
};
```
