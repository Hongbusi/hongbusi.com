import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface PostsPagerProps {
  prev?: { path: string, title: string }
  next?: { path: string, title: string }
}

export function PostsPager({ prev, next }: PostsPagerProps) {
  if (!prev && !next)
    return null

  return (
    <div className="flex flex-row items-center justify-between">
      {prev?.path && (
        <Link
          href={prev.path}
          className={buttonVariants({ variant: 'outline' })}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          {prev.title}
        </Link>
      )}
      {next?.path && (
        <Link
          href={next.path}
          className={cn(buttonVariants({ variant: 'outline' }), 'ml-auto')}
        >
          {next.title}
          <ChevronRightIcon className="ml-2 h-4 w-4" />
        </Link>
      )}
    </div>
  )
}
