import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import '@/styles/globals.css'

import { Sidebar } from './components/sidebar'
import { Menu } from './components/menu'
import { siteConfig } from '@/config/site'
import { ThemeProvider } from '@/components/theme-provider'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ModeToggle } from '@/components/mode-toggle'
import { ScrollArea } from '@/components/ui/scroll-area'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: [
    '洪布斯',
    'Hongbusi',
    '洪布斯的博客',
    'Hongbusi\'s Blog',
  ],
  authors: [
    {
      name: 'Hongbusi',
      url: 'https://hongbusi.com',
    },
  ],
  creator: 'Hongbusi',
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: 'Hongbusi',
  },
  icons: {
    icon: '/favicon.svg',
  },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased md:overflow-hidden',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container flex justify-center items-center min-h-screen">
            <div className="rounded-[0.5rem] border bg-background shadow-md md:shadow-xl">
              <div className="flex justify-between items-center px-2 lg:px-4">
                <Menu />
                <ModeToggle />
              </div>

              <div className="border-t">
                <div className="rounded-[0.5rem] bg-background">
                  <div className="grid lg:grid-cols-5 ">
                    <Sidebar className="hidden lg:block" />
                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                      <ScrollArea className="lg:h-[666px] xl:h-[777px] 2xl:h-[888px]">
                        <div className="relative px-4 py-6 lg:px-8">
                          {children}
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  )
}
