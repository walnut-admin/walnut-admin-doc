import type { DefaultTheme } from 'vitepress'
import type { SearchConfig } from 'vitepress-plugin-pagefind'
import { createRequire } from 'node:module'
import { defineConfig } from 'vitepress'
import { chineseSearchOptimize } from 'vitepress-plugin-pagefind'

const require = createRequire(import.meta.url)
const _pkg = require('../../package.json')

const vueItems = [
  {
    text: '介绍',
    link: '/vue/introduction',
  },
  {
    text: '简化的项目配置',
    link: '/vue/base/project',
  },
  {
    text: 'naive-ui',
    link: '/vue/base/naive-ui',
  },
  {
    text: 'i18n',
    link: '/vue/base/i18n',
  },
  {
    text: 'vite插件',
    link: '/vue/base/plugin',
  },
  {
    text: '组件',
    link: '/vue/component/',
  },
  {
    text: 'axios',
    link: '/vue/base/axios',
  },
  {
    text: '图标icon',
    link: '/vue/base/icon',
  },
  {
    text: '路由router',
    link: '/vue/base/router',
  },
  {
    text: '第三方插件',
    link: '/vue/base/vendor',
  },
  {
    text: '安全加密',
    link: '/vue/base/crypto',
  },
  {
    text: 'hooks',
    link: '/vue/base/hooks',
  },
]

const nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    activeMatch: '/guide/',
    items: [
      {
        text: '介绍',
        link: '/guide/introduction',
      },
      // { text: '深入', link: '/guide/deep/state' },
    ],
  },
  {
    text: '包含内容',
    link: '/content',
  },
  {
    text: '前端',
    activeMatch: '/vue/',
    items: vueItems,
  },
  // {
  //   text: '组件',
  //   activeMatch: '/component/',
  //   items: [
  //     {
  //       text: 'UI组件',
  //       link: '/component/UI/button',
  //     },
  //     {
  //       text: '其他组件',
  //       link: '/component/Extra/arrow',
  //     },
  //     {
  //       text: 'App级别组件',
  //       link: '/component/App/authorize',
  //     },
  //     {
  //       text: '高阶组件',
  //       link: '/component/HOC/withValue',
  //     },
  //     {
  //       text: '进阶组件',
  //       link: '/component/Advanced/apiSelect',
  //     },
  //     {
  //       text: '第三方组件',
  //       link: '/component/Vendor/AvatarUpload',
  //     },
  //   ],
  // },
  // {
  //   text: '后台',
  //   activeMatch: '/nestjs/',
  //   items: [
  //     {
  //       text: '介绍',
  //       link: '/nestjs/introduction',
  //     },
  //     {
  //       text: '跨域',
  //       link: '/nestjs/cors',
  //     },
  //     {
  //       text: '数据库设计',
  //       link: '/nestjs/mongodb',
  //     },
  //   ],
  // },
  {
    text: '记录',
    activeMatch: '/record/',
    items: [
      {
        text: '日常记录',
        link: '/record/daily',
      },
      {
        text: '服务器记录',
        link: '/record/server',
      },
      {
        text: 'docker记录',
        link: '/record/docker',
      },
      {
        text: 'redis记录',
        link: '/record/redis',
      },
      {
        text: 'mongoDB记录',
        link: '/record/mongo',
      },
      {
        text: 'nginx记录',
        link: '/record/nginx',
      },
    ],
  },
  {
    text: '公告',
    items: [
      {
        text: '1.0.0',
        link: '/announcement/v1.0.0',
      },
    ],
  },
  {
    text: '支持',
    link: '/support',
  },
  // {
  //   text: pkg.version,
  //   items: [
  //     {
  //       text: '更新日志',
  //       link: 'https://github.com/Zhaocl1997/walnut-admin-client/blob/main/CHANGELOG.md',
  //     },
  //     {
  //       text: '参与贡献',
  //       link: 'https://github.com/Zhaocl1997/walnut-admin-client',
  //     },
  //   ],
  // },
]

const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '介绍',
      items: [
        { text: '简介', link: '/guide/introduction' },
        // { text: '开始', link: '/guide/start' },
        // { text: '项目配置', link: '/guide/configuration' },
        // { text: '项目规范', link: '/guide/lint' },
      ],
    },
    // {
    //   text: '深入',
    //   items: [
    //     { text: '状态', link: '/guide/deep/state' },
    //     { text: '配置', link: '/guide/deep/config' },
    //     { text: '菜单', link: '/guide/deep/menu' },
    //     { text: '路由', link: '/guide/deep/route' },
    //     { text: '权限', link: '/guide/deep/permission' },
    //     { text: '选项卡', link: '/guide/deep/tab' },
    //     { text: '图标', link: '/guide/deep/icon' },
    //   ],
    // },
  ],

  '/vue/': vueItems,

  // '/component/': [
  //   {
  //     text: 'UI组件',
  //     collapsed: true,
  //     items: [
  //       { text: '按钮', link: '/component/UI/button' },
  //       { text: '按钮组', link: '/component/UI/buttonGroup' },
  //       { text: '卡片', link: '/component/UI/card' },
  //       { text: '多选框', link: '/component/UI/checkbox' },
  //       { text: '日期选择器', link: '/component/UI/datePicker' },
  //       { text: '描述', link: '/component/UI/descriptions' },
  //       { text: '抽屉', link: '/component/UI/drawer' },
  //       { text: '动态标签', link: '/component/UI/dynamicTags' },
  //       { text: '表单', link: '/component/UI/form' },
  //       { text: '图标', link: '/component/UI/icon' },
  //       { text: '输入框', link: '/component/UI/input' },
  //       { text: '数字输入框', link: '/component/UI/inputNumber' },
  //       { text: '单选框', link: '/component/UI/radio' },
  //       { text: '下拉框', link: '/component/UI/select' },
  //       { text: '开关', link: '/component/UI/switch' },
  //       { text: '表格', link: '/component/UI/table' },
  //       { text: '时间选择器', link: '/component/UI/timePicker' },
  //     ],
  //   },

  //   {
  //     text: '其他组件',
  //     collapsed: true,
  //     items: [
  //       { text: '箭头', link: '/component/Extra/arrow' },
  //       { text: '翻转卡片', link: '/component/Extra/flipper' },
  //       { text: '图标选择器', link: '/component/Extra/iconPicker' },
  //       { text: 'JSON显示', link: '/component/Extra/JSON' },
  //       { text: '提示消息', link: '/component/Extra/message' },
  //       { text: '滚动条', link: '/component/Extra/scrollbar' },
  //       { text: '通用标题', link: '/component/Extra/title' },
  //       { text: '过渡', link: '/component/Extra/transition' },
  //       { text: '过渡下拉框', link: '/component/Extra/transitionSelect' },
  //     ],
  //   },

  //   {
  //     text: 'App级别组件',
  //     collapsed: true,
  //     items: [
  //       { text: '权限组件', link: '/component/App/authorize' },
  //       { text: '暗色模式切换组件', link: '/component/App/darkmode' },
  //       { text: '全屏组件', link: '/component/App/fullscreen' },
  //       { text: '国际化切换组件', link: '/component/App/localepicker' },
  //       { text: '锁屏组件', link: '/component/App/lock' },
  //       { text: '应用设置组件', link: '/component/App/settings' },
  //     ],
  //   },

  //   {
  //     text: '高阶组件',
  //     collapsed: true,
  //     items: [{ text: 'WithValue', link: '/component/HOC/withValue' }],
  //   },

  //   {
  //     text: '进阶组件',
  //     collapsed: true,
  //     items: [
  //       {
  //         text: '下拉框(接口)',
  //         link: '/component/Advanced/apiSelect',
  //       },
  //       {
  //         text: '省地市级联面板(接口)',
  //         link: '/component/Advanced/areaCascader',
  //       },
  //       {
  //         text: '国际化词条选择器(接口)',
  //         link: '/component/Advanced/localeSelect',
  //       },
  //     ],
  //   },

  //   {
  //     text: '第三方组件',
  //     collapsed: true,
  //     items: [
  //       {
  //         text: '头像裁剪上传(cropper + OSS)',
  //         link: '/component/Vendor/AvatarUpload',
  //       },
  //       {
  //         text: '图片裁剪(cropper)',
  //         link: '/component/Vendor/Cropper',
  //       },
  //       {
  //         text: '图表(echarts)',
  //         link: '/component/Vendor/Echarts',
  //       },
  //       {
  //         text: '地点选择(百度map)',
  //         link: '/component/Vendor/LocationPicker',
  //       },
  //       {
  //         text: '前端文件直传(OSSUpload)',
  //         link: '/component/Vendor/OSSUpload',
  //       },
  //       {
  //         text: '富文本(tinymce)',
  //         link: '/component/Vendor/Tinymce',
  //       },
  //       {
  //         text: '签名版(signature_pad)',
  //         link: '/component/Vendor/SignPad',
  //       },
  //       {
  //         text: '代码编辑(codeMirror)',
  //         link: '/component/Vendor/CodeMirror',
  //       },
  //     ],
  //   },
  // ],

  '/nestjs/': [
    {
      text: '后台',
      items: [
        {
          text: '介绍',
          link: '/nestjs/introduction',
        },
        {
          text: '跨域',
          link: '/nestjs/cors',
        },
        {
          text: '数据库设计',
          link: '/nestjs/mongodb',
        },
      ],
    },
  ],

  '/record/': [
    {
      text: '记录',
      items: [
        {
          text: '日常记录',
          link: '/record/daily',
        },
        {
          text: '服务器记录',
          link: '/record/server',
        },
        {
          text: 'docker记录',
          link: '/record/docker',
        },
        {
          text: 'redis记录',
          link: '/record/redis',
        },
        {
          text: 'mongoDB记录',
          link: '/record/mongo',
        },
        {
          text: 'nginx记录',
          link: '/record/nginx',
        },
      ],
    },
  ],
}

export const search: { [key: string]: SearchConfig } = {
  root: {
    btnPlaceholder: '搜索',
    placeholder: '搜索文档',
    emptyText: '空空如也',
    heading: '共: {{searchResult}} 条结果',
    // 搜索结果不展示最后修改日期日期
    showDate: false,
    customSearchQuery: chineseSearchOptimize,
  },
}

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '核桃仁中后台全栈模板文档，仍在编写中。。。',

  themeConfig: {
    nav,
    sidebar,

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/Zhaocl1997/walnut-admin-doc/tree/main/src/:path',
      text: '在 GitHub 上编辑此页面',
    },

    footer: {
      message: '基于 MIT 许可发布',
      copyright: `版权所有 © 2019-${new Date().getFullYear()} 赵成林`,
    },

    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

    outline: {
      label: '页面导航',
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium',
      },
    },

    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
  },
})
