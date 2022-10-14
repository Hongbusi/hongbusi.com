<script setup lang="ts">
import { isDark } from '~/logics'
</script>

<template>
  <header class="header z-40">
    <router-link
      class="w-10 h-10 absolute lg:fixed m-6 select-none outline-none"
      to="/"
      focusable="false"
    >
      <Logo />
    </router-link>
    <nav class="nav">
      <div class="spacer" />
      <div class="right">
        <router-link to="/posts">
          <span class="lt-md:hidden">Blog</span>
          <ri-article-line class="md:hidden" />
        </router-link>
        <router-link to="/projects">
          <span class="lt-md:hidden">Projects</span>
          <ri-lightbulb-line class="md:hidden" />
        </router-link>
        <router-link to="/essays">
          <span class="lt-md:hidden">Essays</span>
          <jam-write class="md:hidden" />
        </router-link>
        <a href="https://twitter.com/Hongbusi" target="_blank" title="Twitter">
          <feather-twitter />
        </a>
        <a href="https://github.com/Hongbusi" target="_blank" title="GitHub">
          <uil-github-alt />
        </a>
        <toggle-theme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.header h1 {
  margin-bottom: 0;
}

.nav {
  padding: 2rem;
  width: 100%;
  display: grid;
  grid-template-columns: auto max-content;
  box-sizing: border-box;
}

.nav > * {
  margin: auto;
}

.nav img {
  margin-bottom: 0;
}

.nav a {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  opacity: 0.6;
  outline: none;
}

.nav a:hover {
  opacity: 1;
  text-decoration-color: inherit;
}

.nav .right {
  display: grid;
  grid-gap: 1.2rem;
  grid-auto-flow: column;
}

.nav .right > * {
  margin: auto;
}
</style>
