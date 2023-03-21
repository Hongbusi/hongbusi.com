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
    'bg-base': 'bg-$c-bg',
    'bg-card': 'bg-$c-bg-card',
    'text-base': 'text-$c-text',
    'text-secondary': 'text-$c-text-secondary',
    'border-base': 'border border-$c-border',
  },
  presets: [
    presetUno(),
    presetIcons({
      prefix: '',
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
      },
      collections: {
        i: FileSystemIconLoader('./assets/icons'),
      },
    }),
    presetAttributify(),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,600,800',
        mono: 'DM Mono',
      },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
