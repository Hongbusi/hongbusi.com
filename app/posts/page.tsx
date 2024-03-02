import { allPosts } from 'contentlayer/generated'

import { PostCard } from './components/post-card'
import { Separator } from '@/components/ui/separator'
import { allCoreContent, sortPosts } from '@/lib/contentlayer'

export default function PagesPage() {
  const posts = allCoreContent(sortPosts(allPosts))

  return (
    <div className="space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              All posts
            </h2>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {posts.map(post => (
              <PostCard
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
