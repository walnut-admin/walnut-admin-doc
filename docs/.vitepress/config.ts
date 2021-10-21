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
      { text: "Guide", link: "/", activeMatch: "^/$|^/guide/" },
      {
        text: "Config Reference",
        link: "/config/basics",
        activeMatch: "^/config/",
      },
      {
        text: "Release Notes",
        link: "https://github.com/vuejs/vitepress/releases",
      },
    ],

    sidebar: {
      "/guide/": getGuideSidebar(),
      "/config/": getConfigSidebar(),
      "/": getGuideSidebar(),
    },
  },
});

function getGuideSidebar() {
  return [
    {
      text: "指南",
      children: [
        { text: "简介", link: "/guide/introduction" },
        { text: "开始", link: "/guide/start" },
        // { text: "Configuration", link: "/guide/configuration" },
        // { text: "Asset Handling", link: "/guide/assets" },
        // { text: "Markdown Extensions", link: "/guide/markdown" },
        // { text: "Using Vue in Markdown", link: "/guide/using-vue" },
        // { text: "Deploying", link: "/guide/deploy" },
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
