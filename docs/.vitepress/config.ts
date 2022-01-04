import { defineConfig } from "vitepress";

export default defineConfig({
  lang: "zh-CN",
  title: "Walnut Admin",
  description: "Walnut Admin Docs",

  themeConfig: {
    docsDir: "docs",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav: [
      {
        text: "指南",
        link: "/",
        activeMatch: "^/$|^/guide/",
      },
      {
        text: "组件",
        link: "/config/basics",
        activeMatch: "^/config/",
      },
      {
        text: "开发记录",
        link: "/record/daily",
        activeMatch: '"^/record/"',
      },
      // {
      //   text: "Release Notes",
      //   link: "https://github.com/vuejs/vitepress/releases",
      // },
    ],

    sidebar: {
      "/guide/": getGuideSidebar(),
      "/config/": getConfigSidebar(),
      "/record/": [
        {
          text: "日常记录",
          link: "/record/daily",
        },
        {
          text: "部署记录",
          link: "/record/deploy",
        },
      ],
      // "/": getGuideSidebar(),
    },
  },
});

function getGuideSidebar() {
  return [
    {
      text: "介绍",
      children: [
        { text: "简介", link: "/guide/introduction" },
        { text: "开始", link: "/guide/start" },
        { text: "项目配置", link: "/guide/configuration" },
        { text: "项目规范", link: "/guide/lint" },
      ],
    },
    {
      text: "深入",
      children: [
        { text: "菜单", link: "/guide/menu" },
        { text: "路由", link: "/guide/route" },
        { text: "权限", link: "/guide/permission" },
        { text: "选项卡", link: "/guide/tab" },
      ],
    },
  ];
}

function getConfigSidebar() {
  return [
    {
      text: "App Config",
      children: [{ text: "Basics", link: "/config/basics" }],
    },
    {
      text: "Theme Config",
      children: [
        { text: "Homepage", link: "/config/homepage" },
        { text: "Algolia Search", link: "/config/algolia-search" },
        { text: "Carbon Ads", link: "/config/carbon-ads" },
      ],
    },
  ];
}
