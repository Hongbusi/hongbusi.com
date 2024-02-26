import { themes as prismThemes } from 'prism-react-renderer'
import type { Config } from '@docusaurus/types'
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
  title: '洪布斯',
  tagline: '正在完善中...',
  favicon: 'img/favicon.svg',

  url: 'https://hongbusi.com',
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Hongbusi/hongbusi.com/tree/main/',
          showLastUpdateTime: true,
        },
        blog: {
          routeBasePath: '/posts',
          showReadingTime: true,
          blogSidebarTitle: '最近的文章',
          blogSidebarCount: 10,
          editUrl: 'https://github.com/Hongbusi/hongbusi.com/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-35BBPD2YFB',
          anonymizeIP: true,
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/social-card.jpg',
    navbar: {
      title: '洪布斯',
      logo: {
        alt: '',
        src: 'img/logo.svg',
        width: 40,
        height: 40,
      },
      items: [
        {
          to: '/docs/intro',
          label: '知识库',
          position: 'left',
        },
        {
          to: '/docs/columns/intro',
          label: '专栏',
          position: 'left',
        },
        {
          to: '/posts',
          label: '博客',
          position: 'left',
        },
        {
          to: '/about',
          label: '关于',
          position: 'right',
        },
        {
          href: 'https://github.com/Hongbusi',
          class: 'header-github-link',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          label: '本站源码',
          href: 'https://github.com/Hongbusi/hongbusi.com',
        },
        {
          label: 'Twitter',
          href: 'https://twitter.com/Hongbusi',
        },
        {
          label: '掘金',
          href: 'https://juejin.cn/user/984809513428461',
        },
      ],
      copyright: `Copyright © 2020 - ${new Date().getFullYear()}, All in Hongbusi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,
}

export default config
