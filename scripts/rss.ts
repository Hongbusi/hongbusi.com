import { dirname } from 'path'
import fg from 'fast-glob'
import fs from 'fs-extra'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'
import type { FeedOptions, Item } from 'feed'
import { Feed } from 'feed'
import { slugify } from './slugify'

const DOMAIN = 'https://hongbusi.github.io'
const AUTHOR = {
  name: 'Hongbusi',
  email: 'coderhbs@gmail.com',
  link: DOMAIN
}
const markdown = MarkdownIt({
  html: true,
  breaks: true,
  linkify: true
})

async function run() {
  await buildBlogRSS()
  await buildNotesRSS()
}

async function buildBlogRSS() {
  const files = await fg('pages/posts/*.md')

  const options = {
    title: 'Hongbusi',
    description: 'Hongbusi\' Blog',
    id: 'https://hongbusi.github.io',
    link: 'https://hongbusi.github.io',
    copyright: 'Copyright © 2019-present Hongbusi',
    feedLinks: {
      json: 'https://hongbusi.github.io/feed.json',
      atom: 'https://hongbusi.github.io/feed.atom',
      rss: 'https://hongbusi.github.io/feed.xml'
    }
  }
  const posts: any[] = (
    await Promise.all(
      files.filter(i => !i.includes('index'))
        .map(async(i) => {
          const raw = await fs.readFile(i, 'utf-8')
          const { data, content } = matter(raw)

          if (data.lang !== 'en')
            return

          const html = markdown.render(content)
            .replace('src="/', `src="${DOMAIN}/`)

          if (data.image?.startsWith('/'))
            data.image = DOMAIN + data.image

          return {
            ...data,
            date: new Date(data.date),
            content: html,
            author: [AUTHOR],
            link: DOMAIN + i.replace(/^pages(.+)\.md$/, '$1')
          }
        })
    ))
    .filter(Boolean)

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))

  await writeFeed('feed', options, posts)
}

async function buildNotesRSS() {
  const raw = await fs.readFile('pages/notes.md', 'utf-8')

  const options = {
    title: 'Hongbusi\'s Notes',
    description: 'Hongbusi\'s Notes',
    id: 'https://hongbusi.github.io/notes',
    link: 'https://hongbusi.github.io/notes',
    copyright: 'CC BY-NC-SA 4.0 2021 © Anthony Fu',
    feedLinks: {
      json: 'https://hongbusi.github.io/notes/feed.json',
      atom: 'https://hongbusi.github.io/notes/feed.atom',
      rss: 'https://hongbusi.github.io/notes/feed.xml'
    }
  }
  const noteMatches = raw.matchAll(/<article>(.*?)<\/article>/gms)
  const notes = []

  for (const noteMatch of noteMatches) {
    const rawNote = noteMatch[1]
    const dateMatch = rawNote.match(/\n_(.+)_/)!
    const titleMatch = rawNote.match(/##\s*(.*)\n/)!
    const title = titleMatch[1]
    const date = new Date(dateMatch[1])
    const anchor = slugify(title)
    const rawContent = rawNote.slice(dateMatch.index).replace(/.*\n/, '').trim()
    const content = markdown.render(rawContent).replace('src="/', `src="${DOMAIN}/`)

    notes.push({
      title,
      date,
      content,
      link: `${DOMAIN}/notes#${anchor}`,
      lang: 'en',
      author: [AUTHOR]
    })
  }

  await writeFeed('notes/feed', options, notes)
}

async function writeFeed(name: string, options: FeedOptions, items: Item[]) {
  options.author = AUTHOR
  options.image = 'https://hongbusi.github.io/avatar.png'
  options.favicon = 'https://hongbusi.github.io/logo.png'

  const feed = new Feed(options)

  items.forEach(item => feed.addItem(item))
  // items.forEach(i=> console.log(i.title, i.date))

  await fs.ensureDir(dirname(`./dist/${name}`))
  await fs.writeFile(`./dist/${name}.xml`, feed.rss2(), 'utf-8')
  await fs.writeFile(`./dist/${name}.atom`, feed.atom1(), 'utf-8')
  await fs.writeFile(`./dist/${name}.json`, feed.json1(), 'utf-8')
}

run()
