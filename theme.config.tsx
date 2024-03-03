import type { NextraBlogTheme } from 'nextra-theme-blog'

const config: NextraBlogTheme = {
  darkMode: true,
  head: function useHead() {
    return (
      <>
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="The more you know, the more you don't know." />
        <meta name="og:description" content="The more you know, the more you don't know." />
        <meta name="twitter:site:domain" content="hongbusi.com" />
        <meta name="twitter:url" content="https://hongbusi.com" />
        <meta name="apple-mobile-web-app-title" content="Hongbusi" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </>
    )
  },
  footer: (
    <>
      <hr />
      <a
        href="https://twitter.com/Hongbusi"
        target="_blank"
        rel="noreferrer"
      >
        Twitter
      </a>
      {' · '}
      <a
        href="https://github.com/Hongbusi"
        target="_blank"
        rel="noreferrer"
      >
        GitHub
      </a>
      {' · '}
      <a
        href="mailto:hi@hongbusi.com"
        target="_blank"
        rel="noreferrer"
      >
        hi@hongbusi.com
      </a>
      {' · '}
      <a href="/feed.xml">RSS</a>

      <small className="block mt-24">
        <abbr
          className="cursor-help"
          title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
        >
          CC BY-NC 4.0
        </abbr>
        {` ${new Date().getFullYear()} © Hongbusi.`}
        <a
          className="float-right"
          href="https://beian.miit.gov.cn"
          target="_blank"
          rel="noreferrer"
        >
          浙ICP备2022017304号-1
        </a>
      </small>
    </>
  ),
}

export default config
