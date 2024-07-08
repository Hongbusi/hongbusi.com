/* eslint-disable ts/no-namespace */
import type { DefaultTheme } from 'vitepress'

export namespace Theme {
  export interface PageMeta {
    title: string
    published: string
    description?: string
    image?: string
    tags: string[]
    category: string
    draft?: boolean
  }

  export interface PageData {
    route: string
    meta: PageMeta
  }

  export interface BackToTop {
    /**
     * 距离顶部多少距离出现
     * @default 450
     */
    top?: number

    /**
     * 设置展示图标，svg
     * @recommend https://iconbuddy.app/search?q=fire
     */
    icon?: string
  }

  export interface Footer {
    /**
     * 是否展示主题版本信息
     * @default true
     */
    version?: boolean
    /**
     * copyright
     */
    copyright?: string | {
      text: string
      link?: string
      icon?: boolean | string
    }
    /**
     * ICP 备案信息
     */
    icpRecord?: {
      text: string
      link: string
      icon?: boolean | string
    }
    /**
     * 公安备案信息
     */
    securityRecord?: {
      text: string
      link: string
      icon?: boolean | string
    }
  }

  export interface BlogConfig {
    srcDir?: string
    author?: string
    signature?: string
    pagesData: PageData[]

    /**
     * 设置解析 frontmatter 里 published 的时区
     * @default 8 => 'UTC+8'
     */
    timeZone?: number
    /**
     * 首页页脚
     */
    footer?: Footer
    /**
     * 回到顶部
     * @default true
     */
    backToTop?: boolean | BackToTop
    /**
     * 是否开启深色模式过渡动画
     * @reference https://vitepress.dev/zh/guide/extending-default-theme#on-appearance-toggle
     * @default true
     */
    darkTransition?: boolean
  }

  export interface Config extends DefaultTheme.Config {
    blog?: BlogConfig
  }
}
