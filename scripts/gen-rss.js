import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import matter from 'gray-matter'
import RSS from 'rss'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function generate() {
  const feed = new RSS({
    title: 'Hongbusi',
    site_url: 'https://hongbusi.com',
    feed_url: 'https://hongbusi.com/feed.xml',
  })

  const posts = await fs.readdir(path.join(__dirname, '..', 'pages', 'posts'))
  const allPosts = []
  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.'))
        return

      const content = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'posts', name),
      )
      const frontmatter = matter(content)

      allPosts.push({
        title: frontmatter.data.title,
        url: `/posts/${name.replace(/\.mdx?/, '')}`,
        date: frontmatter.data.date,
        description: frontmatter.data.description,
        categories: frontmatter.data.tag.split(', '),
        author: frontmatter.data.author,
      })
    }),
  )

  allPosts.sort((a, b) => new Date(b.date) - new Date(a.date))
  allPosts.forEach((post) => {
    feed.item(post)
  })
  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
