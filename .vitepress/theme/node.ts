import type { UserConfig } from 'vitepress'
import type { Theme } from './composables/config/index'
import { getArticles } from './utils/node/theme'

/**
 * 获取主题的配置
 * @param config 主题配置
 */
export function getThemeConfig(config?: Partial<Theme.BlogConfig>) {
  // 文章数据
  const pagesData = getArticles(config)

  const extraConfig: any = {
    cleanUrls: true,
  }

  return {
    themeConfig: {
      blog: {
        pagesData,
        ...config,
      },
    },
    ...extraConfig,
  }
}

/**
 * defineConfig Helper
 */
export function defineConfig(config: UserConfig<Theme.Config>) {
  return config
}
