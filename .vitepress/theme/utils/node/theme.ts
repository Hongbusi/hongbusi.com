import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import glob from 'fast-glob'
import matter from 'gray-matter'
import type { Theme } from '../../composables/config/index'
import { formatDate } from '../client'

export function getPageRoute(filepath: string, srcDir: string) {
  let route = filepath.replace('.md', '')
  // 去除 srcDir 处理目录名
  // TODO：优化 路径处理，同VitePress 内部一致
  if (route.startsWith('./')) {
    route = route.replace(
      new RegExp(
        `^\\.\\/${path
          .join(srcDir, '/')
          .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`,
      ),
      '',
    )
  }
  else {
    route = route.replace(
      new RegExp(
        `^${path
          .join(srcDir, '/')
          .replace(new RegExp(`\\${path.sep}`, 'g'), '/')}`,
      ),
      '',
    )
  }
  return `/${route}`
}

export function getArticleMeta(filepath: string) {
  const fileContent = fs.readFileSync(filepath, 'utf-8')

  const { data: frontmatter } = matter(fileContent, {
    excerpt: true,
  })

  const meta: Partial<Theme.PageMeta> = {
    ...frontmatter,
  }

  if (meta.published) {
    meta.published = formatDate(meta.published)
  }

  return meta as Theme.PageMeta
}

export function getArticles(cfg?: Partial<Theme.BlogConfig>) {
  const srcDir = cfg?.srcDir || process.argv.slice(2)?.[1] || '.'
  const files = glob.sync(`${srcDir}/posts/*.md`, { ignore: ['node_modules'] })

  // 文章数据
  const pageData = files
    .map((filepath) => {
      const route = getPageRoute(filepath, srcDir)
      const meta = getArticleMeta(filepath)
      return {
        route,
        meta,
      }
    }).sort((a, b) => {
      if (a.meta.published && b.meta.published) {
        return new Date(b.meta.published).getTime() - new Date(a.meta.published).getTime()
      }
      return 0
    })

  return pageData as Theme.PageData[]
}
