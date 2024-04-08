export interface SiteConfig {
  title: string
  subtitle: string

  lang: string

  themeHue: number
  banner: {
    enable: boolean
    src: string
  }
}

export enum LinkPreset {
  Home = 0,
  Archive = 1,
  About = 2,
}

export interface NavBarLink {
  name: string
  url: string
  external?: boolean
}

export interface NavBarConfig {
  links: (NavBarLink | LinkPreset)[]
}

export interface ProfileConfig {
  avatar?: string
  name: string
  bio?: string
  links: {
    name: string
    url: string
    icon: string
  }[]
}

export interface LicenseConfig {
  enable: boolean
  name: string
  url: string
}
