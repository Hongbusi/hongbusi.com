'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Blog } from 'contentlayer/generated'

import { cn } from '@/lib/utils'

export interface PostSidebarNavProps {
  posts: Blog[]
}

export function PostSidebarNav({ posts }: PostSidebarNavProps) {
  const pathname = usePathname()

  return posts.length
    ? (
      <div className="w-full">
        <div className={cn('pb-4')}>
          <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
            最近更新
          </h4>
          {posts.map((post, index) => (
            <div key={index} className="grid grid-flow-row auto-rows-max text-sm">
              <Link
                key={index}
                href={post.slug}
                className={cn(
                  'group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline',
                  pathname === post.slug
                    ? 'font-medium text-foreground'
                    : 'text-muted-foreground',
                )}
              >
                {post.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
      )
    : null
}
