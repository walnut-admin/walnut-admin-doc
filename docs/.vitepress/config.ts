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
        link: "/component/button",
        activeMatch: "^/component/",
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
      "/component/": getComponentSidebar(),
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
        { text: "配置", link: "/guide/config" },
        { text: "菜单", link: "/guide/menu" },
        { text: "路由", link: "/guide/route" },
        { text: "权限", link: "/guide/permission" },
        { text: "选项卡", link: "/guide/tab" },
      ],
    },
  ];
}

function getComponentSidebar() {
  return [
    {
      text: "UI组件",
      children: [
        { text: "按钮", link: "/component/button" },
        { text: "按钮组", link: "/component/buttonGroup" },
        { text: "卡片", link: "/component/card" },
        { text: "多选框", link: "/component/checkbox" },
        { text: "日期选择器", link: "/component/datePicker" },
        { text: "描述", link: "/component/descriptions" },
        { text: "抽屉", link: "/component/drawer" },
        { text: "动态标签", link: "/component/dynamicTags" },
        { text: "表单", link: "/component/form" },
        { text: "图标", link: "/component/icon" },
        { text: "输入框", link: "/component/input" },
        { text: "数字输入框", link: "/component/inputNumber" },
        { text: "单选框", link: "/component/radio" },
        { text: "下拉框", link: "/component/select" },
        { text: "开关", link: "/component/switch" },
        { text: "表格", link: "/component/table" },
        { text: "时间选择器", link: "/component/timePicker" },
      ],
    },
    {
      text: "其他组件",
    },
    {
      text: "App相关组件",
    },
    {
      text: "高级组件",
    },
    {
      text: "第三方组件",
    },
    {
      text: "HOC",
    },
  ];
}
