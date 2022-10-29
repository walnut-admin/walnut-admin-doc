import { DefaultTheme } from "vitepress";

export const sidebar: DefaultTheme.Sidebar = {
  "/guide/": [
    {
      text: "介绍",
      items: [
        { text: "简介", link: "/guide/introduction" },
        { text: "开始", link: "/guide/start" },
        { text: "项目配置", link: "/guide/configuration" },
        { text: "项目规范", link: "/guide/lint" },
      ],
    },
    {
      text: "深入",
      items: [
        { text: "状态", link: "/guide/deep/state" },
        { text: "配置", link: "/guide/deep/config" },
        { text: "菜单", link: "/guide/deep/menu" },
        { text: "路由", link: "/guide/deep/route" },
        { text: "权限", link: "/guide/deep/permission" },
        { text: "选项卡", link: "/guide/deep/tab" },
        { text: "图标", link: "/guide/deep/icon" },
      ],
    },
  ],

  "/component/": [
    {
      text: "UI组件",
      collapsed: true,
      collapsible: true,
      items: [
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
      collapsed: true,
      collapsible: true,
      items: [
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

    {
      text: "App级别组件",
      collapsed: true,
      collapsible: true,
      items: [
        { text: "权限组件", link: "/component/App/authorize" },
        { text: "暗色模式切换组件", link: "/component/App/darkmode" },
        { text: "全屏组件", link: "/component/App/fullscreen" },
        { text: "国际化切换组件", link: "/component/App/localepicker" },
        { text: "锁屏组件", link: "/component/App/lock" },
        { text: "应用设置组件", link: "/component/App/settings" },
      ],
    },

    {
      text: "高阶组件",
      collapsed: true,
      collapsible: true,
      items: [{ text: "WithValue", link: "/component/HOC/withValue" }],
    },

    {
      text: "进阶组件",
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: "下拉框(接口)",
          link: "/component/Advanced/apiSelect",
        },
        {
          text: "省地市级联面板(接口)",
          link: "/component/Advanced/areaCascader",
        },
        {
          text: "国际化词条选择器(接口)",
          link: "/component/Advanced/localeSelect",
        },
      ],
    },

    {
      text: "第三方组件",
      collapsed: true,
      collapsible: true,
      items: [
        {
          text: "头像裁剪上传(cropper + OSS)",
          link: "/component/Vendor/AvatarUpload",
        },
        {
          text: "图片裁剪(cropper)",
          link: "/component/Vendor/Cropper",
        },
        {
          text: "图表(echarts)",
          link: "/component/Vendor/Echarts",
        },
        {
          text: "地点选择(百度map)",
          link: "/component/Vendor/LocationPicker",
        },
        {
          text: "前端文件直传(OSSUpload)",
          link: "/component/Vendor/OSSUpload",
        },
        {
          text: "富文本(tinymce)",
          link: "/component/Vendor/Tinymce",
        },
        {
          text: "签名版(signature_pad)",
          link: "/component/Vendor/SignPad",
        },
        {
          text: "代码编辑(codeMirror)",
          link: "/component/Vendor/CodeMirror",
        },
      ],
    },
  ],

  "/nestjs/": [
    {
      text: "后台",
      items: [
        {
          text: "介绍",
          link: "/nestjs/introduction",
        },
        {
          text: "跨域",
          link: "/nestjs/cors",
        },
      ],
    },
  ],

  "/record/": [
    {
      text: "记录",
      items: [
        {
          text: "日常记录",
          link: "/record/daily",
        },
        {
          text: "部署记录",
          link: "/record/deploy",
        },
        {
          text: "docker记录",
          link: "/record/docker",
        },
      ],
    },
  ],
};
