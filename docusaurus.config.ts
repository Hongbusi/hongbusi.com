import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

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
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 6,
          editUrl: 'https://github.com/Hongbusi/hongbusi.com/tree/main/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-35BBPD2YFB',
          anonymizeIP: true,
        }
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
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
          to: '/blog',
          label: '博客',
          position: 'left'
        },
        // {
        //   to: '/docs/intro',
        //   label: '文档',
        //   position: 'left'
        // },
        // {
        //   to: '/blog/tags',
        //   label: '标签',
        //   position: 'left'
        // },
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
      copyright: `Copyright © 2020 - ${new Date().getFullYear()} Hongbusi. <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">浙ICP备2022017304号-1</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
