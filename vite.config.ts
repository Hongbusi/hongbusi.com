import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // https://github.com/antfu/unplugin-vue-components#configuration
    Components({
      dts: true,
      resolvers: [
        IconsResolver({
          componentPrefix: ''
        })
      ]
    }),
    // https://github.com/antfu/unplugin-icons#configuration
    Icons({
      defaultStyle: 'display: inline; vertical-align: sub;'
    })
  ]
})
