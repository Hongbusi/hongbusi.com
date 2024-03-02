import Link from 'next/link'
import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <b>Hongbusi</b>,
  project: {
    link: 'https://github.com/Hongbusi',
  },
  docsRepositoryBase: 'https://github.com/Hongbusi/hongbusi.com/tree/main',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Hongbusi',
      }
    }
  },
  head: function useHead() {
    const { title } = useConfig()
    const { route } = useRouter()
    const socialCard = route === '/' || !title
      ? 'https://nextra.site/og.jpeg'
      : `https://nextra.site/api/og?title=${title}`

    return (
      <>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content="Make beautiful websites with Next.js & MDX." />
        <meta name="og:description" content="Make beautiful websites with Next.js & MDX." />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={socialCard} />
        <meta name="twitter:site:domain" content="hongbusi.com" />
        <meta name="twitter:url" content="https://hongbusi.com" />
        <meta name="og:title" content={title ? `${title} – Hongbusi` : 'Hongbusi'} />
        <meta name="og:image" content={socialCard} />
        <meta name="apple-mobile-web-app-title" content="Hongbusi" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon-dark.svg" type="image/svg+xml" media="(prefers-color-scheme: dark)" />
        <link rel="icon" href="/favicon-dark.png" type="image/png" media="(prefers-color-scheme: dark)" />
      </>
    )
  },
  search: {
    placeholder: 'Search...',
  },
  editLink: {
    text: 'Edit this page on GitHub →',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  footer: {
    text: (
      <div className="flex-1 flex flex-col items-center text-sm text-foreground/70">
        <p>{`Copyright © 2020 - ${new Date().getFullYear()}, All in Hongbusi.`}</p>
        <p className="mt-2">
          <Link
            className="transition-colors hover:text-foreground"
            href="https://beian.miit.gov.cn"
            target="_blank"
            rel="noreferrer"
          >
            浙ICP备2022017304号-1
          </Link>
        </p>
      </div>
    ),
  },
}

export default config
