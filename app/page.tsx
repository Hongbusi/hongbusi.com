import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

import { PostCard } from './posts/components/post-card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { allCoreContent, sortPosts } from '@/lib/contentlayer'

export default function IndexPage() {
  const posts = allCoreContent(sortPosts(allPosts))
  const recentPosts = posts.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight">
              Recent posts
            </h2>
            <p className="text-sm text-muted-foreground">
              Top picks for you. Updated daily.
            </p>
          </div>
          <Link href="/posts">
            <Button variant="secondary">See all</Button>
          </Link>
        </div>
        <Separator className="my-4" />
        <div className="relative">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {recentPosts.map(post => (
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
