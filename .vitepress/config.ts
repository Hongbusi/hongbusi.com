import fs from 'fs';
import path from 'path';
import { defineConfigWithTheme } from 'vitepress';
import baseConfig from '@vue/theme/config';
import { headerPlugin } from './headerMdPlugin';
import type { Config } from '@vue/theme';
import { UserConfig } from 'vitepress';

const nav = [
  {
    text: '关于',
    activeMatch: `^/about/`,
    link: '/about/'
  }
];

export const sidebar = {};

export default defineConfigWithTheme<Config>({
  extends: baseConfig as () => UserConfig<Config>,

  lang: 'zh-CN',
  title: 'Hongbusi',
  description: "The more you know, the more you don't know.",
  srcDir: 'src',

  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(path.resolve(__dirname, './inlined-scripts/restorePreference.js'), 'utf-8')
    ]
  ],

  themeConfig: {
    nav,
    sidebar,

    // algolia: {
    //   indexName: 'vuejs',
    //   appId: 'ML0LEBN7FQ',
    //   apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
    //   searchParameters: {
    //     facetFilters: ['version:v3']
    //   }
    // },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Hongbusi' },
      { icon: 'twitter', link: 'https://twitter.com/Hongbusi' }
    ],

    editLink: {
      repo: 'Hongbusi/Hongbusi.github.io',
      text: 'Edit this page on GitHub'
    },

    footer: {
      copyright: `Copyright © 2019-${new Date().getFullYear()} Hongbusi`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/chunks/[name].[hash].js',
          manualChunks(id, ctx) {
            if (id.includes('gsap')) {
              return 'gsap'
            }
            if (id.includes('dynamics.js')) {
              return 'dynamics'
            }
            return moveToVendor(id, ctx)
          }
        }
      }
    },
    json: {
      stringify: true
    }
  },

  vue: {
    reactivityTransform: true
  }
})

const cache = new Map<string, boolean>()

/**
 * This is temporarily copied from Vite - which should be exported in a
 * future release.
 *
 * @TODO when this is exported by Vite, VitePress should ship a better
 * manual chunk strategy to split chunks for deps that are imported by
 * multiple pages but not all.
 */
function moveToVendor(id: string, { getModuleInfo }: any) {
  if (
    id.includes('node_modules') &&
    !/\.css($|\\?)/.test(id) &&
    staticImportedByEntry(id, getModuleInfo, cache)
  ) {
    return 'vendor'
  }
}

function staticImportedByEntry(
  id: string,
  getModuleInfo: any,
  cache: Map<string, boolean>,
  importStack: string[] = []
): boolean {
  if (cache.has(id)) {
    return cache.get(id) as boolean
  }
  if (importStack.includes(id)) {
    // circular deps!
    cache.set(id, false)
    return false
  }
  const mod = getModuleInfo(id)
  if (!mod) {
    cache.set(id, false)
    return false
  }

  if (mod.isEntry) {
    cache.set(id, true)
    return true
  }
  const someImporterIs = mod.importers.some((importer: string) =>
    staticImportedByEntry(
      importer,
      getModuleInfo,
      cache,
      importStack.concat(id)
    )
  )
  cache.set(id, someImporterIs)
  return someImporterIs
}
