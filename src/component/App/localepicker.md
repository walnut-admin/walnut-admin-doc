# 国际化组件

一个图标加一个 popselect。主要逻辑就是掉后台语言列表的接口，渲染 popselect。切换的逻辑也是抽离出去了。

:::info
无需引入，可直接使用
:::

## Props

| 名称 | 类型 | 默认值 | 说明 |
| ---- | ---- | ------ | ---- |

## Usage

```vue
<template>
  <WAppLocalePicker />
</template>
```

## Hook

:::info
下面的 hook 只在 app 初始化的时候执行了一次。
:::

:::warning
本项目的国际化部分是扔到了后台来处理的，前台没有任何国际化信息的相关词条文件。
:::

```ts
import { AppI18nGetI18nMsg } from "/@/locales/backend";

/**
 * @link https://vue-i18n-next.intlify.dev/guide/advanced/lazy.html
 */
export const useAppLocale = () => {
  const { app } = useAppState();

  const loadLocaleMessages = async (locale: ValueOfLocaleConst) => {
    // Don't load again if has been loaded
    if (
      Object.keys(
        (AppI18n.global.messages as unknown as Ref<string[]>).value
      ).includes(locale)
    ) {
      return;
    }

    const backendMsg = await AppI18nGetI18nMsg(locale);

    AppI18n.global.setLocaleMessage(locale, backendMsg.data);

    return nextTick();
  };

  const setI18nLanguage = (locale: ValueOfLocaleConst) => {
    if (AppI18n.mode === "legacy") {
      AppI18n.global.locale = locale;
    } else {
      (AppI18n.global.locale as unknown as Ref<string>).value = locale;
    }

    /**
     * NOTE:
     * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
     * The following is an example for axios.
     *
     * axios.defaults.headers.common['Accept-Language'] = locale
     */
    document.querySelector("html")?.setAttribute("lang", locale);
  };

  watchEffect(async () => {
    await loadLocaleMessages(app.value.locale);
    setI18nLanguage(app.value.locale);
  });
};
```
