import { DefaultTheme } from "vitepress";

export const nav: DefaultTheme.NavItem[] = [
  {
    text: "指南",
    items: [
      {
        text: "介绍",
        link: "/guide/introduction",
        activeMatch: `^/(guide)/`,
      },
      { text: "深入", link: "/deep/config", activeMatch: `^/(deep)/` },
    ],
  },
  {
    text: "组件",
    items: [
      {
        text: "UI组件",
        link: "/component/UI/button",
        activeMatch: `^/(component/UI)/`,
      },
      {
        text: "其他组件",
        link: "/component/Extra/arrow",
        activeMatch: `^/(component/Extra)/`,
      },
      {
        text: "App级别组件",
        link: "/component/App/authorize",
        activeMatch: `^/(component/App)/`,
      },
    ],
  },
  {
    text: "记录",
    activeMatch: `^/(record)/`,
    link: "/record/daily",
  },
];
