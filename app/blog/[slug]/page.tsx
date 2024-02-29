import { notFound } from 'next/navigation'
import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'

import '@/styles/mdx.css'
import { Mdx } from '@/components/mdx-components'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DashboardTableOfContents } from '@/components/toc'
import { getTableOfContents } from '@/lib/toc'
import { allCoreContent, sortPosts } from '@/lib/contentlayer'
import { PostsPager } from '@/components/pager'

interface Props {
  params: {
    slug: string
  }
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug

  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex(p => p.slug === slug)
  if (postIndex === -1)
    return notFound()

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find(p => p.slug === slug) as Blog

  const toc = await getTableOfContents(post.body.raw)

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-4xl font-bold tracking-tight')}>
            {post.title}
          </h1>
        </div>
        <div className="my-4">
          <time dateTime={post.date}>{post.date}</time>
          {` · ${post.readingTime.text}`}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={post.body.code} />
        </div>
        <PostsPager next={next} prev={prev} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 pt-4">
          <ScrollArea className="pb-10">
            <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
              <DashboardTableOfContents toc={toc} />
            </div>
          </ScrollArea>
        </div>
      </div>
    </main>
  )
}
