export const siteConfig = {
  name: '洪布斯',
  url: 'https://hongbusi.com',
  ogImage: 'https://hongubis.com/og.jpg',
  description: '知道的越多，不知道的越多。',
  links: {
    github: 'https://github.com/Hongbusi',
    twitter: 'https://twitter.com/Hongbusi',
  },
  nav: [
    { label: '博客', url: '/blog' },
    { label: '关于', url: '/about' },
  ],
  footer: {
    links: [
      {
        title: '产品',
        items: [
          { label: 'Blog', url: '/' },
        ],
      },
      {
        title: '社区',
        items: [
          { label: 'GitHub', url: 'https://github.com/Hongbusi' },
          { label: 'Twitter', url: 'https://twitter.com/Hongbusi' },
          { label: '掘金', url: 'https://juejin.cn/user/984809513428461' },
        ],
      },
      {
        title: '文档',
        items: [
          { label: 'Docs', url: 'https://docs.hongbusi.com' },
        ],
      },
      {
        title: '友情链接',
        items: [
          { label: '添加友链', url: 'https://github.com/Hongbusi/hongbusi.com/issues' },
        ],
      },
    ],
    copyright: `Copyright © 2020 - ${new Date().getFullYear()}, All in Hongbusi.`,
    record: '浙ICP备2022017304号-1',
    recordLink: 'https://beian.miit.gov.cn',
  },
}

export type SiteConfig = typeof siteConfig
