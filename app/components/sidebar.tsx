'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowTopRightIcon,
  BookmarkIcon,
  FileIcon,
  GitHubLogoIcon,
  HomeIcon,
  Pencil1Icon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn('pb-12', className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/">
              <Button
                className="w-full justify-start"
                variant={pathname === '/' ? 'secondary' : 'ghost'}
              >
                <HomeIcon className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Me
          </h2>
          <div className="space-y-1">
            <Link href="/posts">
              <Button
                className="w-full justify-start"
                variant={pathname === '/posts' ? 'secondary' : 'ghost'}
              >
                <Pencil1Icon className="mr-2 h-4 w-4" />
                Posts
              </Button>
            </Link>
            <Link href="/bookmarks">
              <Button
                className="w-full justify-start"
                variant={pathname === '/bookmarks' ? 'secondary' : 'ghost'}
              >
                <BookmarkIcon className="mr-2 h-4 w-4" />
                Bookmarks
              </Button>
            </Link>
            <Link
              href={siteConfig.links.docs}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" className="w-full justify-between items-center">
                <div className="flex items-center">
                  <FileIcon className="mr-2 h-4 w-4" />
                  Docs
                </div>
                <ArrowTopRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Projects
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
              </svg>
              Playlists
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Others
          </h2>
          <div className="space-y-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" className="w-full justify-between items-center">
                <div className="flex items-center">
                  <GitHubLogoIcon className="mr-2 h-4 w-4" />
                  GitHub
                </div>
                <ArrowTopRightIcon className="h-4 w-4" />
              </Button>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="ghost" className="w-full justify-between items-center">
                <div className="flex items-center">
                  <TwitterLogoIcon className="mr-2 h-4 w-4" />
                  Twitter
                </div>
                <ArrowTopRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
