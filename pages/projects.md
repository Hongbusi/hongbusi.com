---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'vue-element-admin'
      link: 'https://github.com/Hongbusi/vue-element-admin'
      desc: 'A vue content management system.'
    - name: 'Daily reading'
      link: 'https://hongbusi.github.io/daily-reading'
      desc: 'Let others read high-quality content faster and more accurately.'
      icon: 'i-ep-reading'
    - name: 'Configs'
      link: 'https://github.com/Hongbusi/configs'
      desc: 'ESLint config & StyleLint config & Prettier config for my personal projects.'
      icon: 'i-carbon-cloud-satellite-config'

  Utils:
    - name: 'Create config'
      link: 'https://github.com/Hongbusi/create-config'
      desc: 'Quickly create project configurations.'
    - name: 'Create app'
      link: 'https://github.com/Hongbusi/create-app'
      desc: 'Quickly create projects through templates.'
    - name: 'Clock'
      link: 'https://hongbusi.github.io/clock'
      desc: 'A clock.'
      icon: 'i-bi-clock'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
