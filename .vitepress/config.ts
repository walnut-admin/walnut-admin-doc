import { defineConfig } from "vitepress";

const nav = [
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
    text: "开发记录",
    activeMatch: `^/(record)/`,
    link: "/record/daily",
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
  ],
  "/deep/": [
    {
      text: "深入",
      children: [
        { text: "配置", link: "/deep/config" },
        { text: "菜单", link: "/deep/menu" },
        { text: "路由", link: "/deep/route" },
        { text: "权限", link: "/deep/permission" },
        { text: "选项卡", link: "/deep/tab" },
        { text: "图标", link: "/deep/icon" },
      ],
    },
  ],
  "/component/UI": [
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
  ],
  "/component/Extra": [
    {
      text: "其他组件",
      children: [
        { text: "箭头", link: "/component/Extra/arrow" },
        { text: "翻转卡片", link: "/component/Extra/flipper" },
        { text: "图标选择器", link: "/component/Extra/iconPicker" },
        { text: "JSON显示", link: "/component/Extra/JSON" },
        { text: "提示消息", link: "/component/Extra/message" },
        { text: "滚动条", link: "/component/Extra/scrollbar" },
        { text: "通用标题", link: "/component/Extra/title" },
        { text: "过渡", link: "/component/Extra/transition" },
        { text: "过渡下拉框", link: "/component/Extra/transitionSelect" },
      ],
    },
  ],
  "/component/App": [
    {
      text: "App级别组件",
      children: [
        { text: "权限组件", link: "/component/App/authorize" },
        { text: "暗色模式切换组件", link: "/component/App/darkmode" },
        { text: "全屏组件", link: "/component/App/fullscreen" },
        { text: "国际化切换组件", link: "/component/App/localepicker" },
        { text: "锁屏组件", link: "/component/App/lock" },
        { text: "应用设置组件", link: "/component/App/settings" },
      ],
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
  description: "Walnut Admin - Document",
  srcDir: "src",

  themeConfig: {
    nav,
    sidebar,
  },
});
