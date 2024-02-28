import { notFound } from 'next/navigation'
import { allBlogs } from 'contentlayer/generated'

import '@/styles/mdx.css'
import { Mdx } from '@/components/mdx-components'

interface Props {
  params: {
    slug: string
  }
}

export async function generateStaticParams(): Promise<Props['params'][]> {
  return allBlogs
    .filter(b => b.published)
    .map((b) => {
      return ({
        slug: b.slug,
      })
    })
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug
  const blog = allBlogs.find(b => b.slug === slug)

  if (!blog)
    notFound()

  return (
    <div className="container bg-zinc-50">
      <article className="py-12 mx-auto prose prose-zinc prose-quoteless">
        <Mdx code={blog.body.code} />
      </article>
    </div>
  )
}
