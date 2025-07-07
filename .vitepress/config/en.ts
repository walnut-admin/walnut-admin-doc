import type { DefaultTheme } from 'vitepress'
import type { SearchConfig } from 'vitepress-plugin-pagefind'
import { createRequire } from 'node:module'
import { defineConfig } from 'vitepress'

const require = createRequire(import.meta.url)
const pkg = require('../../package.json')

const nav: DefaultTheme.NavItem[] = [
  {
    text: 'Guide',
    activeMatch: '/guide/',
    items: [
      {
        text: 'Intro',
        link: '/guide/introduction',
      },
      { text: 'Deep', link: '/guide/deep/state' },
    ],
  },
  {
    text: 'Components',
    activeMatch: '/component/',
    items: [
      {
        text: 'UI Components',
        link: '/component/UI/button',
      },
      {
        text: 'Other Components',
        link: '/component/Extra/arrow',
      },
      {
        text: 'App Components',
        link: '/component/App/authorize',
      },
      {
        text: 'HOC Components',
        link: '/component/HOC/withValue',
      },
      {
        text: 'Advanced Components',
        link: '/component/Advanced/apiSelect',
      },
      {
        text: 'Vendor Components',
        link: '/component/Vendor/AvatarUpload',
      },
    ],
  },
  {
    text: 'Backend',
    activeMatch: '/nestjs/',
    items: [
      {
        text: 'Intro',
        link: '/nestjs/introduction',
      },
      {
        text: 'Cors',
        link: '/nestjs/cors',
      },
      {
        text: 'Database',
        link: '/nestjs/mongodb',
      },
    ],
  },
  {
    text: 'Record',
    activeMatch: '/record/',
    items: [
      {
        text: 'Daily Record',
        link: '/record/daily',
      },
      {
        text: 'Deploy Record',
        link: '/record/deploy',
      },
      {
        text: 'Docker Record',
        link: '/record/docker',
      },
    ],
  },
  {
    text: pkg.version,
    items: [
      {
        text: 'Changelog',
        link: 'https://github.com/Zhaocl1997/walnut-admin-client/blob/main/CHANGELOG.md',
      },
      {
        text: 'Contributing',
        link: 'https://github.com/Zhaocl1997/walnut-admin-client',
      },
    ],
  },
]

const sidebar: DefaultTheme.Sidebar = {
  '/en-US/guide/': {
    base: '/en-US',
    items: [
      {
        text: 'Intro',
        items: [
          { text: 'Intro', link: '/guide/introduction' },
          { text: 'Start', link: '/guide/start' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'lint', link: '/guide/lint' },
        ],
      },
      {
        text: 'Deep',
        items: [
          { text: 'State', link: '/guide/deep/state' },
          { text: 'Config', link: '/guide/deep/config' },
          { text: 'Menu', link: '/guide/deep/menu' },
          { text: 'Route', link: '/guide/deep/route' },
          { text: 'Permission', link: '/guide/deep/permission' },
          { text: 'Tab', link: '/guide/deep/tab' },
          { text: 'Icon', link: '/guide/deep/icon' },
        ],
      },
    ],
  },

  '/en-US/component/': {
    base: '/en-US',
    items: [
      {
        text: 'UI Components',
        collapsed: true,
        items: [
          { text: 'Button', link: '/component/UI/button' },
          { text: 'ButtonGroup', link: '/component/UI/buttonGroup' },
          { text: 'Card', link: '/component/UI/card' },
          { text: 'Checkbox', link: '/component/UI/checkbox' },
          { text: 'DatePicker', link: '/component/UI/datePicker' },
          { text: 'Descriptions', link: '/component/UI/descriptions' },
          { text: 'Drawer', link: '/component/UI/drawer' },
          { text: 'DynamicTags', link: '/component/UI/dynamicTags' },
          { text: 'Form', link: '/component/UI/form' },
          { text: 'Icon', link: '/component/UI/icon' },
          { text: 'Input', link: '/component/UI/input' },
          { text: 'InputNumber', link: '/component/UI/inputNumber' },
          { text: 'Radio', link: '/component/UI/radio' },
          { text: 'Select', link: '/component/UI/select' },
          { text: 'Switch', link: '/component/UI/switch' },
          { text: 'Table', link: '/component/UI/table' },
          { text: 'TimePicker', link: '/component/UI/timePicker' },
        ],
      },

      {
        text: 'Other Components',
        collapsed: true,
        items: [
          { text: 'Arraw', link: '/component/Extra/arrow' },
          { text: 'Flipper', link: '/component/Extra/flipper' },
          { text: 'IconPicker', link: '/component/Extra/iconPicker' },
          { text: 'JSON', link: '/component/Extra/JSON' },
          { text: 'Message', link: '/component/Extra/message' },
          { text: 'Scrollbar', link: '/component/Extra/scrollbar' },
          { text: 'Title', link: '/component/Extra/title' },
          { text: 'Transition', link: '/component/Extra/transition' },
          { text: 'TransitionSelect', link: '/component/Extra/transitionSelect' },
        ],
      },

      {
        text: 'App Components',
        collapsed: true,
        items: [
          { text: 'Authorize', link: '/component/App/authorize' },
          { text: 'DarkMode', link: '/component/App/darkmode' },
          { text: 'FullScreen', link: '/component/App/fullscreen' },
          { text: 'LocalePicker', link: '/component/App/localepicker' },
          { text: 'Lock', link: '/component/App/lock' },
          { text: 'Settings', link: '/component/App/settings' },
        ],
      },

      {
        text: 'HOC Components',
        collapsed: true,
        items: [{ text: 'WithValue', link: '/component/HOC/withValue' }],
      },

      {
        text: 'Advanced Components',
        collapsed: true,
        items: [
          {
            text: 'Api Select',
            link: '/component/Advanced/apiSelect',
          },
          {
            text: 'Api Area Cascader',
            link: '/component/Advanced/areaCascader',
          },
          {
            text: 'Api Locale Select',
            link: '/component/Advanced/localeSelect',
          },
        ],
      },

      {
        text: 'Vendor Components',
        collapsed: true,
        items: [
          {
            text: 'Avatar Upload(Cropper + OSS)',
            link: '/component/Vendor/AvatarUpload',
          },
          {
            text: 'Cropper',
            link: '/component/Vendor/Cropper',
          },
          {
            text: 'ECharts',
            link: '/component/Vendor/Echarts',
          },
          {
            text: 'Location Picker(China only)',
            link: '/component/Vendor/LocationPicker',
          },
          {
            text: 'Ali OSS Upload',
            link: '/component/Vendor/OSSUpload',
          },
          {
            text: 'Tinymce',
            link: '/component/Vendor/Tinymce',
          },
          {
            text: 'Signature Pad',
            link: '/component/Vendor/SignPad',
          },
          {
            text: 'Code Mirror',
            link: '/component/Vendor/CodeMirror',
          },
        ],
      },
    ],
  },

  '/en-US/nestjs/': {
    base: '/en-US',
    items: [
      {
        text: 'Backend',
        items: [
          {
            text: 'Intro',
            link: '/nestjs/introduction',
          },
          {
            text: 'Cors',
            link: '/nestjs/cors',
          },
          {
            text: 'Database',
            link: '/nestjs/mongodb',
          },
        ],
      },
    ],
  },

  '/en-US/record/': {
    base: '/en-US',
    items: [
      {
        text: 'Record',
        items: [
          {
            text: 'Daily Record',
            link: '/record/daily',
          },
          {
            text: 'Deploy Record',
            link: '/record/deploy',
          },
          {
            text: 'Docker Record',
            link: '/record/docker',
          },
        ],
      },
    ],
  },
}

export const search: { [key: string]: SearchConfig } = {
  'en-US': {

  },
}

export const en = defineConfig({
  lang: 'en-US',
  description: 'Walnut Admin Fullstack Back-End Management, still WIP...',

  themeConfig: {
    nav,
    sidebar,

    search: {
      provider: 'local',
    },

    editLink: {
      pattern: 'https://github.com/Zhaocl1997/walnut-admin-doc/tree/main/src/:path',
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: `Copyright © 2019-${new Date().getFullYear()} Zhaocl1997`,
    },

  },
})
