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
    localeConfigs: {

    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/Hongbusi/hongbusi.com/tree/main/',
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
    // Replace with your project's social card
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
          to: '/docs/topic/intro',
          label: '专题',
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
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://twitter.com/Hongbusi',
          label: 'Twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © 2020 - ${new Date().getFullYear()}, All in Hongbusi. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
