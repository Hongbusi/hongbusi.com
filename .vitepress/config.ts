import { defineConfig } from 'vitepress'
import { getThemeConfig } from './theme/node'

const themeConfig = getThemeConfig({
  author: '洪布斯',
  signature: '知道的越多，不知道的越多。',
  footer: {
    version: true,
    copyright: {
      text: 'Copyright © 2021 - 2024 Hongbusi',
    },
    icpRecord: {
      text: '浙ICP备2022017304号',
      link: 'https://beian.miit.gov.cn',
    },
  },
})

export default defineConfig({
  extends: themeConfig,

  lang: 'zh-CN',
  title: '洪布斯',
  description: '知道的越多，不知道的越多。',

  themeConfig: {
    search: {
      provider: 'local',
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '标签', link: '/tags' },
      { text: '分类', link: '/categories' },
      { text: '友链', link: '/friends' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hongbusi' },
      { icon: 'twitter', link: 'https://x.com/Hongbusi' },
    ],
  },
})
