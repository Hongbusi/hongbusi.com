<template>
  <header class="flex justify-between items-center py-8 mb-10">
    <NuxtLink class="inline-block w-10 h-10" to="/">
      <Logo />
    </NuxtLink>

    <nav class="flex space-x-4">
      <NuxtLink to="/posts" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Blog</span>
        <span class="i-article md:hidden" />
      </NuxtLink>
      <NuxtLink to="/projects" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Projects</span>
        <span class="i-lightbulb md:hidden" />
      </NuxtLink>
      <NuxtLink to="/essays" class="transition-color opacity-60 hover:opacity-100">
        <span class="lt-md:hidden">Essays</span>
        <span class="i-write md:hidden" />
      </NuxtLink>
    </nav>
  </header>
</template>
