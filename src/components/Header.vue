<template>
  <header class="flex justify-between items-center py-8 mb-10">
    <router-link
      class="inline-block w-10 h-10"
      to="/"
      focusable="false"
    >
      <Logo />
    </router-link>

    <nav class="flex space-x-4">
      <router-link to="/posts" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Blog</span>
        <ri-article-line class="md:hidden" />
      </router-link>
      <router-link to="/projects" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Projects</span>
        <ri-lightbulb-line class="md:hidden" />
      </router-link>
      <router-link to="/essays" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Essays</span>
        <jam-write class="md:hidden" />
      </router-link>
    </nav>
  </header>
</template>
