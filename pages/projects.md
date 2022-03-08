---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'Code Snippets'
      link: 'https://github.com/Hongbusi/code-snippets'
      desc: 'Code snippets for vscode.'
    - name: 'vue-element-admin'
      link: 'https://github.com/Hongbusi/vue-element-admin'
      desc: 'A vue content management system.'

  Sites:
    - name: 'Daily reading'
      link: 'https://hongbusi.github.io/daily-reading'
      desc: 'Let others read high-quality content faster and more accurately.'
      icon: 'i-ep-reading'

  VS Code Extensions:
    - name: 'Frontend Code Snippets'
      link: 'https://github.com/Hongbusi/code-snippets'
      desc: 'Frontend code snippets for vscode.'

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
    - name: 'Clock'
      link: 'https://hongbusi.github.io/clock'
      desc: 'A clock.'
      icon: 'i-carbon-time'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
