import Link from 'next/link'
import Image from 'next/image'
import type { Post } from 'contentlayer/generated'
import dayjs from 'dayjs'

import { cn } from '@/lib/utils'

export function PostCard({ post }: { post: Post }) {
  const { title, slug, date, readingTime } = post

  return (
    <Link href={`/posts/${slug}`}>
      <div className={cn('space-y-3')}>
        <div className="relative overflow-hidden rounded-md aspect-[240/135] w-full">
          <Image
            src="https://cali.so/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fi81ys0da%2Fproduction%2F32474521221d861ecdc4ae4388ff348b50475cd3-1200x675.png&w=3840&q=75"
            alt={post.title}
            className=" object-cover transition-all hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
          />
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="font-medium leading-none truncate">{title}</h3>
          <p className="flex justify-between  items-center mt-2 text-xs">
            <span>{dayjs(date).format('YYYY/MM/DD')}</span>
            <span>{readingTime.text}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
