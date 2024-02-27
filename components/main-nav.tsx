'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'

export function MainNav() {
  const pathname = usePathname()

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-10 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-6 text-sm">
        {siteConfig.nav.map((segment, idx) => {
          return (
            <Link
              key={`${segment.url}_nav_${idx}`}
              href={segment.url}
              className={cn(
                'transition-colors hover:text-foreground',
                pathname === segment.url ? 'text-foreground' : 'text-foreground/60',
              )}
            >
              {segment.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
