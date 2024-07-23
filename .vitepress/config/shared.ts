import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Walnut Admin',
  base: '/',
  lang: 'zh-CN',
  srcDir: 'src',
  assetsDir: 'public',

  rewrites: {
    'zh-CN/:rest*': ':rest*',
  },

  appearance: true,
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  sitemap: {
    hostname: 'https://walnut-admin-doc.netlify.app/',
  },

  themeConfig: {
    logo: { src: '/logo.png', width: 24, height: 24 },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Zhaocl1997/walnut-admin-doc' },
      { icon: 'discord', link: 'https://discord.gg/kfVuasVXs2' },
    ],
  },
})
