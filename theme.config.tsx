import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import type { DocsThemeConfig } from 'nextra-theme-docs'
import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: <p className="font-bold text-xl">洪布斯</p>,
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
  editLink: {
    text: 'Edit this page →',
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
      <div className="flex-1">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="xl:col-span-1">
            <h6 className="text-foreground text-base">洪布斯</h6>
            <p className="mt-4 text-sm">知道的越多，不知道的越多。</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-4 xl:gap-8 xl:grid-cols-4 text-sm">
              <div className="xl:col-span-1">
                <h6 className="text-foreground text-base">找到我</h6>
                <ul className="text-sm">
                  <li className="mt-4 transition-colors text-foreground/60 hover:text-foreground">
                    <Link href="https://juejin.cn/user/984809513428461" target="_blank" rel="noreferrer">掘金</Link>
                  </li>
                  <li className="mt-4 transition-colors text-foreground/60 hover:text-foreground">
                    <Link href="https://github.com/Hongbusi" target="_blank" rel="noreferrer">GitHub</Link>
                  </li>
                  <li className="mt-4 transition-colors text-foreground/60 hover:text-foreground">
                    <Link href="https://twitter.com/Hongbusi" target="_blank" rel="noreferrer">Twitter</Link>
                  </li>
                </ul>
              </div>
              <div className="xl:col-span-1">
                <h6 className="text-foreground text-base">我的网站</h6>
                <ul className="text-sm">
                  <li className="mt-4 transition-colors text-foreground/60 hover:text-foreground">
                    <Link href="https://docs.hongbusi.com" target="_blank" rel="noreferrer">文档笔记</Link>
                  </li>
                </ul>
              </div>
              <div className="col-span-2">
                <h6 className="text-foreground text-base">二维码</h6>
                <p className="mt-4 text-sm">关注公众号「洪布斯」，第一时间收到最新推文。</p>
                <Image className="mt-4" src="/qr-code.png" alt="二维码" width={120} height={120} />
              </div>
            </div>
          </div>
        </div>

        <div className="my-12 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col items-center text-sm text-foreground/60">
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
      </div>
    ),
  },
}

export default config
