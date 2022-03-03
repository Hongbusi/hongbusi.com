<script setup lang="ts">
defineProps<{ link: string }>()
</script>

<template>
  <span>
    <carbon-logo-github class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="link"
      target="_blank"
    >View source</a>
  </span>
</template>
