// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '@unocss/reset/tailwind.css',
    '~/styles/variable.css',
    '~/styles/global.css',
  ],
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/content',
  ],
  unocss: {
    preflight: true,
  },
  colorMode: {
    preference: 'dark',
    classSuffix: '',
  },
  content: {
    highlight: {
      theme: 'vitesse-dark',
    },
    markdown: {
      toc: {
        depth: 3,
      },
    },
    documentDriven: true,
  },
  app: {
    keepalive: true,
  },
})
