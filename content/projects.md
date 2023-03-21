---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'Translate'
      link: 'https://github.com/Hongbusi/translate'
      desc: 'Raycast Youdao Translate extension.'
    - name: 'Code Variable'
      link: 'https://github.com/Hongbusi/code-variable'
      desc: 'Generate available code variables.'

  Templates:
    - name: 'starter-vue'
      link: 'https://github.com/Hongbusi/starter-vue'
      desc: 'A template to quickly create a vue project.' 

  Sites:
    - name: 'Awesome Git Commit Messages'
      link: 'https://git.hongbusi.com'
      desc: 'A collection of git commit message examples to make your project commit history more readable.'
    - name: 'vue-hbs-admin'
      link: 'https://github.com/developer-plus/vue-hbs-admin'
      desc: 'A vue management system. It is based on Vue3, Vite and TypeScript.'

  VS Code Extensions:
    - name: 'Code Snippets'
      link: 'https://github.com/Hongbusi/code-snippets'
      desc: 'Code snippets for vscode.'

  Raycast Extensions:
    - name: 'Translate'
      link: 'https://github.com/Hongbusi/translate'
      desc: 'Raycast Youdao Translate extension.'
    - name: 'Code Variable'
      link: 'https://github.com/Hongbusi/code-variable'
      desc: 'Generate available code variables.'

  Utils:
    - name: 'Eslint Config'
      link: 'https://github.com/Hongbusi/es-config'
      desc: 'ESLint config for my personal projects.'
      icon: 'i-carbon-cloud-satellite-config'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
