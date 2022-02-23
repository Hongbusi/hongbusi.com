import type { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

const config: UserConfig = {
  plugins: [
    vue(),

    AutoImport({
      imports: [
        'vue',
        'vue-router'
      ]
    }),

    Components({
      extensions: ['vue', 'md'],
      dts: true,
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
    })
  ]
}

export default config
