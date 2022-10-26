<script setup lang="ts">
useHead({
  meta: [
    { property: 'og:title', content: 'Hongbusi' },
    { name: 'description', content: 'Hongbusi\'s Portfolio' },
    { name: 'twitter:card', content: 'summary' },
    { name: 'twitter:creator', content: '@Hongbusi' }
  ]
})
</script>

<template>
  <main class="px-6 pb-10 mx-auto max-w-3xl">
    <Header />
    <router-view />
    <Footer />
  </main>
</template>
