import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-c-bg dark:bg-c-bg-dark',
    'text-base': 'text-c-text dark:text-c-text-dark',
    'text-secondary': 'text-c-text-secondary dark:text-c-text-secondary-dark',
    'border-base': 'border border-c-border dark:border-c-border-dark',
  },
  presets: [
    presetUno(),
    presetAttributify,
    presetTypography(),
    presetIcons({
      prefix: '',
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        i: FileSystemIconLoader('./src/assets/icons'),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono',
      },
    }),
  ],
  theme: {
    colors: {
      c: {
        bg: '#fafafa',
        bgDark: '#050505',
        text: '#232323',
        textDark: '#f3f3f3',
        textSecondary: '#686868',
        textSecondaryDark: '#888',
        border: '#eee',
        borderDark: '#222',
      },
    },
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
