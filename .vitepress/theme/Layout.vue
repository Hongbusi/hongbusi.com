<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'

import { useDarkTransition } from './hooks/useDarkTransition'

const { Layout } = DefaultTheme

useDarkTransition()
</script>

<template>
  <Layout>
    <template #home-hero-before>
      <slot name="home-hero-before" />
      <div class="home">
        <HomePage />
      </div>
    </template>
    <template #layout-bottom>
      <Footer />
      <slot name="layout-bottom" />
    </template>
  </Layout>
</template>
