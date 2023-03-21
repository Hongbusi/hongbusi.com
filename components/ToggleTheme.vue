<script setup lang='ts'>
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <span class="cursor-pointer i-moon dark:i-sun" title="Toggle Color Scheme" @click="toggleTheme" />
</template>
