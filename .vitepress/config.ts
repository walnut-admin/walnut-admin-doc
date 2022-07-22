import { defineConfig } from "vitepress";

import { nav } from "./nav";
import { sidebar } from "./sidebar";

export default defineConfig({
  lang: "zh-CN",
  title: "Walnut Admin",
  titleTemplate: "Documentation",
  description: "Walnut Admin - Documentation",
  srcDir: "src",
  appearance: true,

  lastUpdated: true,

  themeConfig: {
    nav,
    sidebar,

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2020-present Zhaocl1997",
    },

    editLink: {
      pattern:
        "https://github.com/Zhaocl1997/walnut-admin-doc/tree/main/src/:path",
      text: "Edit this page on GitHub",
    },
  },
});
