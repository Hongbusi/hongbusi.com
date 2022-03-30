---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'bookmarks'
      link: 'https://hongbusi.github.io/bookmarks'
      desc: 'Bookmarks for Frontend Developers.'
    - name: 'vue-hbs-admin'
      link: 'https://hongbusi.github.io/vue-hbs-admin'
      desc: 'A vue management system. It is based on Vue3, Vite and TypeScript. It's fast!'

  Sites:
    - name: 'vue-hbs-admin'
      link: 'https://hongbusi.github.io/vue-hbs-admin'
      desc: 'A vue management system. It is based on Vue3, Vite and TypeScript. It's fast!'
    - name: 'bookmarks'
      link: 'https://hongbusi.github.io/bookmarks'
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
    - name: 'Create config'
      link: 'https://github.com/Hongbusi/create-config'
      desc: 'Quickly create project configurations.'
    - name: 'Create app'
      link: 'https://github.com/Hongbusi/create-app'
      desc: 'Quickly create projects through templates.'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
