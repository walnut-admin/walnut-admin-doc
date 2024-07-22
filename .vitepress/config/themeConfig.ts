import type { DefaultTheme } from 'vitepress'
import { nav } from './nav'
import { sidebar } from './sidebar'

export const themeConfig: DefaultTheme.Config = {
  nav,
  sidebar,

  footer: {
    message: 'Released under the MIT License.',
    copyright: 'Copyright © 2020-present Zhaocl1997',
  },

  editLink: {
    pattern:
            'https://github.com/Zhaocl1997/walnut-admin-doc/tree/main/src/:path',
    text: 'Edit this page on GitHub',
  },

  // docFooter: {
  //   prev: 'Pagina prior',
  //   next: 'Proxima pagina',
  // },
}
