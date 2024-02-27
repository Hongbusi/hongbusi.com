import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import '@/styles/globals.css'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { TailwindIndicator } from '@/components/tailwind-indicator'

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
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
          <TailwindIndicator />
          {/* <Analytics /> */}
          {/* <NewYorkToaster /> */}
          {/* <NewYorkSonner /> */}
        </ThemeProvider>
      </body>
    </html>
  )
}
