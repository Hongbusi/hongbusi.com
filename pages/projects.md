---
title: Projects - Hongbusi
display: Projects
subtitle: List of projects that I am proud of.
description: List of projects that I am proud of.
projects:
  Latest:
    - name: 'Handle 汉兜'
      link: 'https://handle.antfu.me'
      desc: 'A Chinese Hanzi variation of Wordle'
      icon: 'i-carbon-scatter-matrix'

  Toys:
    - name: '1990 Script'
      link: 'https://github.com/antfu/1990-script'
      desc: 'Make your Github history back to 1990'
      icon: 'i-carbon-time'
---

<ListProjects :projects="frontmatter.projects"/>

<StarsRanking/>
