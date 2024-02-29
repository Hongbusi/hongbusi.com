/* eslint-disable ts/ban-ts-comment */
// @ts-nocheck

import { writeFileSync } from 'node:fs'
import type { ComputedFields } from 'contentlayer/source-files'
import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import readingTime from 'reading-time'
import remarkGfm from 'remark-gfm'
import { slug } from 'github-slugger'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: doc => readingTime(doc.body.raw) },
  path: {
    type: 'string',
    resolve: doc => `/${doc._raw.flattenedPath}`,
  },
  slug: {
    type: 'string',
    resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount)
          tagCount[formattedTag] += 1
        else
          tagCount[formattedTag] = 1
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: './blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
    category: {
      type: 'string',
      required: true,
    },
    draft: {
      type: 'boolean',
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: './content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'github-dark',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0)
              node.children = [{ type: 'text', value: ' ' }]
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted')
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted']
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['subheading-anchor'],
            ariaLabel: 'Link to section',
          },
        },
      ],
    ],
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    createTagCount(allBlogs)
  },
})
