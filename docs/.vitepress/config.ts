import { defineConfig } from "vitepress";

const nav = [
  {
    text: "指南",
    activeMatch: `^/(guide)/`,
    items: [
      { text: "介绍", link: "/guide/introduction" },
      { text: "深入", link: "/guide/config" },
    ],
  },
  {
    text: "组件",
    activeMatch: `^/(component/UI|component/Extra)/`,
    items: [
      { text: "UI组件", link: "/component/UI/button" },
      { text: "其他组件", link: "/component/Extra/arrow" },
    ],
  },
  {
    text: "开发记录",
    link: "/record/daily",
    activeMatch: '"^/record/"',
  },
];

const sidebar = {
  "/guide/": [
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
  ],
  "/component/": [
    {
      text: "UI组件",
      children: [
        { text: "按钮", link: "/component/UI/button" },
        { text: "按钮组", link: "/component/UI/buttonGroup" },
        { text: "卡片", link: "/component/UI/card" },
        { text: "多选框", link: "/component/UI/checkbox" },
        { text: "日期选择器", link: "/component/UI/datePicker" },
        { text: "描述", link: "/component/UI/descriptions" },
        { text: "抽屉", link: "/component/UI/drawer" },
        { text: "动态标签", link: "/component/UI/dynamicTags" },
        { text: "表单", link: "/component/UI/form" },
        { text: "图标", link: "/component/UI/icon" },
        { text: "输入框", link: "/component/UI/input" },
        { text: "数字输入框", link: "/component/UI/inputNumber" },
        { text: "单选框", link: "/component/UI/radio" },
        { text: "下拉框", link: "/component/UI/select" },
        { text: "开关", link: "/component/UI/switch" },
        { text: "表格", link: "/component/UI/table" },
        { text: "时间选择器", link: "/component/UI/timePicker" },
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
  ],
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
};

export default defineConfig({
  lang: "zh-CN",
  title: "Walnut Admin",
  description: "Walnut Admin Docs",

  themeConfig: {
    docsDir: "docs",

    editLinks: true,
    editLinkText: "Edit this page on GitHub",
    lastUpdated: "Last Updated",

    nav,
    sidebar,
  },
});
