import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    publishDate: z
      .string()
      .or(z.date())
      .transform(val => new Date(val)),
  }),
})

export const collections = { posts }
