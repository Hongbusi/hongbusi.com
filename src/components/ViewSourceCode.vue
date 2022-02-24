<script setup lang="ts">
defineProps<{ link: string }>()
</script>

<template>
  <span>
    <bi-code-slash class="inline-block opacity-70" />
    <a
      class="opacity-50 ml-1"
      :href="link"
      target="_blank"
    >View source code</a>
  </span>
</template>
