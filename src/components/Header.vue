

<template>
  <header class="flex justify-between items-center px-8 z-40">
    <router-link
      class="w-10 h-10 select-none outline-none"
      to="/"
    >
      <img src="/logo.png" alt="logo">
    </router-link>
    <nav class="nav py-10">
      <a href="https://hongbusi.github.io/daily-reading" target="_blank" title="DailyReading">
        <ri-article-line />
      </a>
      <a href="https://hongbusi.github.io/docs" target="_blank" title="Docs">
        <ri-sticky-note-line />
      </a>
      <a href="https://twitter.com/Hongbusi" target="_blank" title="Twitter">
        <feather-twitter />
      </a>
      <a href="https://github.com/Hongbusi" target="_blank" title="GitHub">
        <uil-github-alt />
      </a>

      <toggle-theme />
    </nav>
  </header>
</template>

<style scoped>
.nav a {
  @apply px-2 cursor-pointer no-underline text-inherit opacity-60 outline-none transition-opacity;
}

.nav a:hover {
  @apply opacity-100;
}
</style>
