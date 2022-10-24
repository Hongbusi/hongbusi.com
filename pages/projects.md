---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'Weekly'
      link: 'https://github.com/developer-plus/weekly'
      desc: '记录每周值得分享的内容，周一发布。'
    - name: 'mini-unocss'
      link: 'https://github.com/developer-plus/mini-unocss'
      desc: '一个即时按需的原子 CSS 引擎，unocss 的 mini 版本。'

  Sites:
    - name: 'git-commit-message-example'
      link: 'https://git.hongbusi.com'
      desc: 'A collection of git commit message examples to make your project commit history more readable.'
    - name: 'vue-hbs-admin'
      link: 'https://github.com/developer-plus/vue-hbs-admin'
      desc: 'A vue management system. It is based on Vue3, Vite and TypeScript.'
    - name: 'Bookmarks'
      link: 'https://github.com/developer-plus/bookmarks'
      desc: 'Bookmarks for Frontend Developers.'
    - name: 'Daily reading'
      link: 'https://hongbusi.github.io/daily-reading'
      desc: 'Let others read high-quality content faster and more accurately.'
      icon: 'i-ep-reading'
    - name: 'Clock'
      link: 'https://hongbusi.github.io/clock'
      desc: 'A clock.'
      icon: 'i-carbon-time'

  VS Code Extensions:
    - name: 'Code Snippets'
      link: 'https://github.com/Hongbusi/code-snippets'
      desc: 'Code snippets for vscode.'

  Utils:
    - name: 'Configs'
      link: 'https://github.com/Hongbusi/configs'
      desc: 'ESLint config & StyleLint config & Prettier config for my personal projects.'
      icon: 'i-carbon-cloud-satellite-config'
    - name: 'Release'
      link: 'https://github.com/Hongbusi/release'
      desc: 'A command-line tool to quickly create releases.'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
