import type { Blog } from 'contentlayer/generated'
import { allBlogs } from 'contentlayer/generated'

import { PostSidebarNav } from '@/components/sidebar-nav'
import { ScrollArea } from '@/components/ui/scroll-area'
import { allCoreContent, sortPosts } from '@/lib/contentlayer'

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function PostLayout({ children }: DocsLayoutProps) {
  const posts = allCoreContent(sortPosts(allBlogs))
  const recentPosts = posts.slice(0, 6) as Blog[]

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
      <aside className="fixed top-16 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
        <ScrollArea className="h-full py-6 pr-6 lg:py-8">
          <PostSidebarNav posts={recentPosts} />
        </ScrollArea>
      </aside>
      {children}
    </div>
  )
}
