import Link from 'next/link'

import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'

export function SiteFooter() {
  return (
    <footer>
      <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container py-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <Link href="#" as="/" className="w-40">
              {siteConfig.name}
            </Link>
            <div className="flex items-center space-x-4">
              <a
                className="text-foreground/60 hover:text-foreground transition"
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                className="text-foreground/60 hover:text-foreground transition"
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <Icons.twitter className="h-4 w-4 fill-current" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {siteConfig.footer.links.map((segment) => {
                return (
                  <div key={`footer_${segment.title}`}>
                    <h6 className="text-foreground overwrite text-base">{segment.title}</h6>
                    <ul className="mt-4 space-y-2">
                      {segment.items.map(({ label, url }, idx) => {
                        const children = (
                          <div className="text-sm transition-colors text-foreground/60 hover:text-foreground">
                            {label}
                          </div>
                        )

                        return (
                          <li key={`${segment.title}_link_${idx}`}>
                            {url.startsWith('https')
                              ? (
                                <a
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {children}
                                </a>
                                )
                              : (
                                <Link
                                  href={url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {children}
                                </Link>
                                )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          <div className="flex flex-col text-foreground/60 text-sm text-center">
            <p className="pt-8">{siteConfig.footer.copyright}</p>
            {siteConfig.footer.record && (
              <p className="mt-2">
                <a
                  className="transition-colors hover:text-foreground"
                  href={siteConfig.footer.recordLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.footer.record}
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
