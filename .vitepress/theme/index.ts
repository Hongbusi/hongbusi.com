import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import '@unocss/reset/tailwind.css'
import 'uno.css'

import './styles/index.css'
import './styles/overrides.css'
import Layout from './Layout.vue'
import { withConfigProvider } from './composables/config/blog'

const theme: Theme = {
  ...DefaultTheme,
  Layout: withConfigProvider(Layout),
}

export default theme

export * from './composables/config/index'
