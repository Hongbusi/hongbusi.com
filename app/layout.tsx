import './globals.css'
import { Inter } from 'next/font/google'
import LocalFont from 'next/font/local'
import type { Metadata } from 'next'
import { Analytics } from '@/components/Analytics'

export const metadata: Metadata = {
  title: {
    default: 'Hongbusi',
    template: '%s | Hongbusi',
  },
  description: 'The more you know, the more you don’t know.',
  openGraph: {
    title: 'Hongbusi',
    description: 'The more you know, the more you don’t know.',
    url: 'https://hongbusi.com',
    siteName: 'hongbusi.com',
    images: [
      {
        url: 'https://chronark.com/og.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'zh-CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      'index': true,
      'follow': true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Hongbusi',
    card: 'summary_large_image',
  },
  icons: {
    shortcut: '/favicon.svg',
  },
}

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const calSans = LocalFont({
  src: '../public/fonts/CalSans-SemiBold.ttf',
  variable: '--font-calsans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(' ')}>
      <head>
        <Analytics />
      </head>
      <body className="bg-black">
        {children}
      </body>
    </html>
  )
}
