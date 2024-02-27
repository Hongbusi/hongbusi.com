export const siteConfig = {
  name: '洪布斯',
  url: 'https://hongbusi.com',
  ogImage: 'https://hongubis.com/og.jpg',
  description: '知道的越多，不知道的越多。',
  links: {
    github: 'https://github.com/Hongbusi',
    twitter: 'https://twitter.com/Hongbusi',
  },
  footer: {
    links: [
      {
        title: '产品',
        items: [
          {
            label: 'Style Guide',
            url: 'docs/',
          },
          {
            label: 'Second Doc',
            url: 'docs/doc2/',
          },
        ],
      },
      {
        title: 'Community',
        items: [
          {
            label: 'Stack Overflow',
            url: 'https://stackoverflow.com/questions/tagged/docusaurus',
          },
          {
            label: 'Discord',
            url: 'https://discordapp.com/invite/docusaurus',
          },
          {
            label: 'Twitter',
            url: 'https://twitter.com/docusaurus',
          },
          {
            label: 'Twitter',
            url: 'https://twitter.com/docusaurus',
          },
        ],
      },
      {
        title: 'Docs',
        items: [
          {
            label: 'Style Guide',
            url: 'docs/',
          },
          {
            label: 'Second Doc',
            url: 'docs/doc2/',
          },
        ],
      },
      {
        title: '友情链接',
        items: [
          {
            label: 'Stack Overflow',
            url: 'https://stackoverflow.com/questions/tagged/docusaurus',
          },
          {
            label: 'Discord',
            url: 'https://discordapp.com/invite/docusaurus',
          },
          {
            label: 'Twitter',
            url: 'https://twitter.com/docusaurus',
          },
          {
            label: 'Twitter',
            url: 'https://twitter.com/docusaurus',
          },
        ],
      },
    ],
    copyright: `Copyright © 2020 - ${new Date().getFullYear()}, All in Hongbusi.`,
    record: '浙ICP备2022017304号-1',
    recordLink: 'https://beian.miit.gov.cn',
  },
}

export type SiteConfig = typeof siteConfig
