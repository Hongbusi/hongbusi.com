import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-base': 'bg-[var(--vp-c-bg-soft)]',
    'base-card': 'p-6 bg-[var(--vp-c-bg-soft)] border border-[var(--vp-c-bg-soft)] rounded-lg transition',
  },
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
