import rss from '@astrojs/rss'
import { getCollection } from 'astro:content'
import siteConfig from '~/config'

const { title, description } = siteConfig

export async function get(context) {
  const posts = await getCollection('posts')
  return rss({
    title,
    description,
    site: context.site,
    items: posts.map(post => ({
      ...post.data,
      link: `/posts/${post.slug}/`,
    })),
  })
}
